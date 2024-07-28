import { parsePhoneNumber } from 'awesome-phonenumber'
import APIError from '../errors/apiError'

export const formatPhone = (inPhone: string): string => {
    const pn = parsePhoneNumber(inPhone, { regionCode: 'US' })


    if (!pn.valid) {
        throw new APIError({
            message: 'Invalid phone number'
        })
    }

    return pn.number.e164
}
