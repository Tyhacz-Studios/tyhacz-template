import Express from 'express'

type PaginationParams = {
    skip: number
    limit: number
}
export const getPaginationQueries = (req: Express.Request): PaginationParams => {
    const limit = parseInt(req.query.limit as string) || undefined
    const skip = parseInt(req.query.skip as string) || 0

    return {
        limit,
        skip
    }
}
