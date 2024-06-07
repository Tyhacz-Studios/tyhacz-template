import { AxiosResponse } from 'axios'
import { $axios } from './axios'
import { UserType } from '../../server/models/User'

export const getSession = (): Promise<AxiosResponse<UserType>> => {
    return $axios.get('/session')
}

export const startPhoneLogin = (body: {
    phone: string
}): Promise<AxiosResponse<{ methodId: string }>> => {
    return $axios.post('/session/phone/start', body)
}

export const confirmPhoneLogin = (body: {
    code: string
    methodId: string
}): Promise<AxiosResponse<{ sessionJwt: string }>> => {
    return $axios.post('/session/phone/confirm', body)
}

export const startEmailLogin = (body: {
    email: string
}): Promise<AxiosResponse<{ methodId: string }>> => {
    return $axios.post('/session/email/start', body)
}

export const confirmEmailLogin = (body: {
    code: string
    methodId: string
}): Promise<AxiosResponse<{ sessionJwt: string }>> => {
    return $axios.post('/session/email/confirm', body)
}
