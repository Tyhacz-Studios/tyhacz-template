import Express from 'express'
import * as stytch from 'stytch'
import config from '../config'
import { formatPhone } from '../utils/formatPhone'
import { User } from '../models/User'

class StytchApi {
    private client: stytch.Client

    constructor () {
        const { NODE_ENV, STYTCH_SECRET, STYTCH_PROJECT_ID } = config()

        if (!STYTCH_SECRET || !STYTCH_PROJECT_ID) {
            throw new Error('Stytch secret or project id not set')
        }

        this.client = new stytch.Client({
            project_id: STYTCH_PROJECT_ID,
            secret: STYTCH_SECRET,
            env: stytch.envs[NODE_ENV === 'production' ? 'live' : 'test']
        })
    }

    createUser = async (body: { phone?: string, email?: string }) => {
        const newUserData: stytch.UsersCreateRequest = {}

        if (body.phone) {
            const phone_number = formatPhone(body.phone)
            newUserData.phone_number = phone_number
        }

        if (body.email) {
            newUserData.email = body.email
        }

        const res = await this.client.users.create(newUserData)

        return {
            stytchUserId: res.user_id,
            phone: body.phone,
            email: body.email
        }
    }

    startPhoneLogin = async (body: { phone: string }): Promise<string> => {
        const phone_number = formatPhone(body.phone)

        const res = await this.client.otps.sms.loginOrCreate({
            phone_number
        })

        return res.phone_id
    }

    startEmailLogin = async (body: { email: string }): Promise<string> => {
        const res = await this.client.otps.email.loginOrCreate({
            email: body.email
        })

        return res.email_id
    }

    confirmEmailLogin = async (body: {
        code: string
        methodId: string
    }) => {
        const res = await this.client.otps.authenticate({
            code: body.code,
            method_id: body.methodId,
            session_duration_minutes: 60 * 24 * 7 // week,
        })

        const user = await User.findOne({
            stytchUserId: res.user_id,
        })

        if (user) {
            await User.updateOne({
                stytchUserId: res.user_id
            }, {
                $set: {
                    lastLogin: new Date()
                }
            })

            return res.session_jwt
        }

        await User.create({
            stytchUserId: res.user_id,
            name: 'Unnamed',
            lastLogin: new Date(),
            email: res.user.emails[0].email
        })

        return res.session_jwt
    }

    confirmPhoneLogin = async (body: {
        code: string
        methodId: string
    }) => {
        const res = await this.client.otps.authenticate({
            code: body.code,
            method_id: body.methodId,
            session_duration_minutes: 60 * 24 * 7 // week,
        })

        const user = await User.findOne({
            stytchUserId: res.user_id,
        })

        if (user) {
            await User.updateOne({
                stytchUserId: res.user_id
            }, {
                $set: {
                    lastLogin: new Date()
                }
            })

            return res.session_jwt
        }

        await User.create({
            stytchUserId: res.user_id,
            name: 'Unnamed',
            lastLogin: new Date(),
            phone: res.user.phone_numbers[0].phone_number
        })

        return res.session_jwt
    }

    getSessionFromRequest = async (req: Express.Request) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return null
        }

        const sessionJwt = authHeader.split('Bearer ')[1]

        if (!sessionJwt) {
            return null
        }

        try {
            const res = await this.client.sessions.authenticateJwt({
                session_jwt: sessionJwt
            })

            const user = await User.findOne({
                stytchUserId: res.session.user_id
            }).lean()

            return user
        } catch (err) {
            return null
        }
    }
}

export default new StytchApi()
