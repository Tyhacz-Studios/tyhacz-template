import * as yup from 'yup'
import { phoneRegExp } from './helpers'

export const startPhoneLoginValidation = yup.object({
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid.').required('Phone is required.')
})

export const confirmPhoneLoginValidation = yup.object({
    code: yup.string().required('Confirmaton code is required.'),
    methodId: yup.string().required()
})

export const startEmailLoginValidation = yup.object({
    email: yup.string().email('Email is not valid').required('Email is required')
})

export const confirmEmailLoginValiation = yup.object({
    code: yup.string().required('Confirmaton code is required.'),
    methodId: yup.string().required()
})
