import OpenAi from 'openai';
import config from '../config'

const { OPENAI_API_KEY } = config()

const openai = new OpenAi({
    apiKey: OPENAI_API_KEY,
});

export const askChatGpt = async (
    prompt: string
): Promise<unknown> => {
    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: prompt
                    },

                    // send images to chatgpt, but better to use gpt-4-vision-preview model
                    // {
                    //     type: 'image_url',
                    //     image_url: {
                    //         url: imageUrl
                    //     }
                    // }
                ]
            }
        ]
    })

    try {
        const response = res.choices[0].message.content
        console.log('Response from OpenAI:', prompt, response)
        return response
    } catch (err) {
        return null
    }
}
