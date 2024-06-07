import React, { useEffect } from 'react'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { AuthLayout, AuthLayoutActions } from '../../layouts/Auth'
import { startPhoneLogin } from '../../requests/session'
import { startPhoneLoginValidation } from '../../../server/validation/session'
import { Input } from '../../components/Inputs/Input'
import { handleError } from '../../errors/handleError'
import { getSession } from '../../requests/session'

export const Login: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getSession()
                navigate('/app/dashboard')
            } catch (err) {
                //
            }
        }
        window.addEventListener('focus', checkAuth)

        checkAuth()

        return () => {
            window.removeEventListener('focus', checkAuth)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: startPhoneLoginValidation,
        onSubmit: async (values) => {
            try {
                const res = await startPhoneLogin(values)

                toast.success('We sent you a confirmation code')

                navigate('/phone-confirm', {
                    state: {
                        methodId: res.data.methodId
                    }
                })
            } catch (err) {
                handleError(err, 'Whoops, something went wrong logging you in. Please try again later.')
            }
        }
    })

    return (
        <AuthLayout>
            <h1>Welcome</h1>

            <form onSubmit={formik.handleSubmit}>
                <Input
                    label="Enter your phone number"
                    name="phone"
                    type="tel"
                    formik={formik}
                />
                <AuthLayoutActions>
                    <button type="submit" className="primary" disabled={formik.isSubmitting}>
                        Next
                    </button>
                </AuthLayoutActions>
            </form>
        </AuthLayout>
    )
}
