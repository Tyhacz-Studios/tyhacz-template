import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleError = (err: unknown, message: string) => {
    const error = (
        (err as AxiosError<{ error: string }>)?.response?.data?.error ||
        (err as Error)?.message
    )

    toast.error(error || message)
}
