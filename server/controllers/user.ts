import Express from 'express'
import { handleError } from '../errors/handleError'
import { User } from '../models/User'
import Stytch from '../services/stytch'

export const createUser = async (req: Express.Request, res: Express.Response) => {
    try {
        const { stytchUserId, phone } = await Stytch.createUser({
            phone: req.body.phone
        })

        const createdUser = await User.create({
            stytchUserId,
            phone,
            name: req.body.name
        })

        res.json(createdUser).status(201)
    } catch (err) {
        handleError(err, res)
    }
}

export const getUsers = async (_: Express.Request, res: Express.Response) => {
    try {
        const users = await User.find({}).lean()

        res.json(users).status(200)
    } catch (err) {
        handleError(err, res)
    }
}
