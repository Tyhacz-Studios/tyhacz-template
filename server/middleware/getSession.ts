import Express from 'express'
import Yup from 'yup'

export const validateBody = (
    validation: Yup.AnyObjectSchema
): Express.Handler =>
    async (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ): Promise<void> => {
        try {
            req.body = await validation.validate(req.body, { stripUnknown: true })
            next()
        } catch (err) {
            res.status(400).json({
                error: err.errors ? err.errors[0] : err.message
            }).end()
        }
    }
