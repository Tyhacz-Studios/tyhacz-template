import Express from 'express'
import Stytch from '../services/stytch'
import { handleError } from '../errors/handleError'

export const getSession = async (req: Express.Request, res: Express.Response) => {
    try {
        const session = await Stytch.getSessionFromRequest(req)
        
        if (!session) {
            return res.status(400).end()
        }

        res.json(session).status(200)
    } catch (err) {
        handleError(err, res)
    }
}

export const startPhoneLogin = async (req: Express.Request, res: Express.Response) => {
    try {
        const methodId = await Stytch.startPhoneLogin(req.body)
        res.json({
            methodId
        }).status(201)
    } catch (err) {
        handleError(err, res)
    }
}

export const confirmPhoneLogin = async (req: Express.Request, res: Express.Response) => {
    try {
        const sessionJwt = await Stytch.confirmPhoneLogin(req.body)

        res.json({
            sessionJwt
        }).status(201)
    } catch (err) {
        handleError(err, res)
    }
}

export const startEmailLogin = async (req: Express.Request, res: Express.Response) => {
    try {
        const methodId = await Stytch.startEmailLogin(req.body)
        res.json({
            methodId
        }).status(201)
    } catch (err) {
        handleError(err, res)
    }
}

export const confirmEmailLogin = async (req: Express.Request, res: Express.Response) => {
    try {
        const sessionJwt = await Stytch.confirmEmailLogin(req.body)

        res.json({
            sessionJwt
        }).status(201)
    } catch (err) {
        handleError(err, res)
    }
}
