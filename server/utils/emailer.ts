import Mailgun from 'mailgun.js'
import formData from 'form-data'
import config from '../config'

const {
    MAILGUN_API_KEY,
    MAILGUN_FROM_DOMAIN,
    MAILGUN_FROM_EMAIL
} = config()

const mailgun = new Mailgun(formData)
const client = mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY
})

export const sendEmail = async (to: string, subject: string, body: string) => {
    const messageData = {
        from: MAILGUN_FROM_EMAIL,
        to,
        subject,
        html: body
    };

    try {
        await client.messages.create(MAILGUN_FROM_DOMAIN, messageData)
    } catch (error) {
        console.error('Error in sending email:', error);
    }
}
