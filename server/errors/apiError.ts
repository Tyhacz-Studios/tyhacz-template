export default class APIError extends Error {
    message: string

    statusCode: number = 500

    err: Error

    constructor (params: { message: string; statusCode?: number; err?: Error }) {
        super()
        console.error(params)

        this.message = params.message

        if (params.statusCode) {
            this.statusCode = params.statusCode
        }

        if (params.err) {
            this.err = params.err
        }
    }
}
