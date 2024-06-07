import * as yup from 'yup'

export const createSearchValidation = yup.object({
    keywords: yup.array().of(yup.string()).required(),
    city: yup.string().required()
})
