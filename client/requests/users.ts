import { AxiosResponse } from 'axios'
import { $axios } from './axios'
import { UserType } from '../../server/models/User'

export const createUser = (body: {
    name: string
    phone: string
}): Promise<AxiosResponse<UserType>> => {
    return $axios.post('/user', body)
}

export const getUsers = (): Promise<AxiosResponse<UserType[]>> => {
    return $axios.get('/user')
}
