import dotenv from 'dotenv-safe'

export default () => {
    dotenv.config({
        example: './.env.example'
    })

    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),

        // stytch auth api
        STYTCH_PROJECT_ID: process.env.STYTCH_PROJECT_ID,
        STYTCH_SECRET: process.env.STYTCH_SECRET,

        // mongo
        MONGO_URI: process.env.MONGO_URI,

        // upload io
        BYTESCALE_API_KEY: process.env.BYTESCALE_API_KEY,

        // mailgun email sending
        MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
        MAILGUN_FROM_DOMAIN: process.env.MAILGUN_FROM_DOMAIN,
        MAILGUN_FROM_EMAIL: process.env.MAILGUN_FROM_EMAIL,

        // openai / chatgpt
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,

        // Stripe payments
        STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

        // twilio sms sending
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
        TWILIO_MESSAGE_SERVICE_ID: process.env.TWILIO_MESSAGE_SERVICE_ID,
    }
}
