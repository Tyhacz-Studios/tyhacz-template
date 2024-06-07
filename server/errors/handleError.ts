import Express from 'express'
import { StytchError } from 'stytch'
import APIError from './apiError'

export const handleError = (err: unknown, res: Express.Response) => {
    const error = (err as StytchError)?.error_message || (err as Error)?.message
    const statusCode = (err as APIError)?.statusCode || 500

    return res.status(statusCode).json({ error }).end()
}
