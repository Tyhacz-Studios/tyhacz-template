import twilio from 'twilio'
import config from '../config'

const {
    TWILIO_AUTH_TOKEN,
    TWILIO_ACCOUNT_SID,
    TWILIO_MESSAGE_SERVICE_ID,
    TWILIO_PHONE_NUMBER
} = config()

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

/**
 * Sends a text message using Twilio's messaging service.
 * 
 * @param to - The destination phone number.
 * @param from - The Twilio phone number sending the message.
 * @param body - The message body.
 */
export const sendTextMessage = async (to: string, body: string): Promise<void> => {
    try {
        await client.messages.create({
            from: TWILIO_PHONE_NUMBER,
            messagingServiceSid: TWILIO_MESSAGE_SERVICE_ID,
            to,
            body
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
