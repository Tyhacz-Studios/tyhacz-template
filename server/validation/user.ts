import * as yup from 'yup'
import { phoneRegExp } from './helpers'

export const createUserValidation = yup.object({
    name: yup.string().required('A name is required.'),
    phone: yup.string().matches(phoneRegExp, 'Invalid phone number.').required('Phone is required.')
})
