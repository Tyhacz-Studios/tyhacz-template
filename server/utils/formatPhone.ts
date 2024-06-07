import parsePhoneNumber from 'libphonenumber-js'
import APIError from '../errors/apiError'

export const formatPhone = (inPhone: string): string => {
    const phone_number = parsePhoneNumber(inPhone, {
        defaultCountry: 'US',
        extract: true
    })

    if (!phone_number || !phone_number.isValid()) {
        throw new APIError({
            message: 'Invalid phone number'

        })
    }

    return phone_number.format('E.164')
}
