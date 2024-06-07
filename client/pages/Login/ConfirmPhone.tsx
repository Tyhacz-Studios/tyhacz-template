import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { AuthLayout, AuthLayoutActions } from '../../layouts/Auth'
import { confirmPhoneLogin } from '../../requests/session'
import { confirmPhoneLoginValidation } from '../../../server/validation/session'
import { Input } from '../../components/Inputs/Input'
import { handleError } from '../../errors/handleError'

export const ConfirmPhone: React.FC = () => {
    const navigate = useNavigate()
    const loc = useLocation()

    const formik = useFormik({
        initialValues: {
            code: '',
            methodId: loc.state?.methodId || ''
        },
        validationSchema: confirmPhoneLoginValidation,
        onSubmit: async (values) => {
            try {
                const res = await confirmPhoneLogin(values)

                localStorage.setItem('auth-token', res.data.sessionJwt)

                toast.success('Welcome!')

                navigate('/app/dashboard')
            } catch (err) {
                handleError(err, 'Whoops, something went wrong logging you in. Please try again later.')
            }
        }
    })

    return (
        <AuthLayout>
            <h1>We sent you a confirmation code</h1>

            <form onSubmit={formik.handleSubmit}>
                <Input
                    label="Enter confirmation code"
                    name="code"
                    type="text"
                    formik={formik}
                />
                <AuthLayoutActions>
                    <button type="submit" className="primary" disabled={formik.isSubmitting}>
                        Log In
                    </button>
                </AuthLayoutActions>
            </form>
        </AuthLayout>
    )
}
