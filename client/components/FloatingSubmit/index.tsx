import React from 'react'
import { toast } from 'react-toastify'
import { FormikContextType } from 'formik'
import { Link } from 'react-router-dom'

import './styles.css'

type Props = {
    backHref: string
    backText: string
    submitText: string
    formik: FormikContextType<any>
}

export const FloatingSubmit: React.FC<Props> = ({
    backHref,
    backText,
    submitText,
    formik
}) => {
    const linkClick = (e: React.MouseEvent) => {
        if (formik.isSubmitting) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
    }

    const onResetForm = (e: React.MouseEvent) => {
        formik.handleReset(e)
        toast.info('Form reset.')

        const form = document.getElementsByTagName('form')

        if (form.length) {
            form[0].scrollTo(0,0)
        }
    }

    return (
        <div className="floating-submit">
            <Link to={backHref} onClick={linkClick} aria-disabled={formik.isSubmitting}>
                {backText}
            </Link>
            <button type="reset" className="secondary" disabled={formik.isSubmitting} onClick={onResetForm}>
                Clear Form
            </button>
            <button type="submit" className="primary" disabled={formik.isSubmitting}>
                {submitText}
            </button>
        </div>
    )
}
