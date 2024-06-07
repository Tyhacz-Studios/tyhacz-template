import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { Modal, ModalActions } from '../../components/Modal'
import { Input } from '../../components/Inputs/Input'
import { createUser } from '../../requests/users'
import { handleError } from '../../errors/handleError'

import { UserType } from '../../../server/models/User'
import { createUserValidation } from '../../../server/validation/user'

type Props = {
    show: boolean
    onClose: () => void
    onUserAdded: (newUser: UserType) => void
}

export const AddUser: React.FC<Props> = ({
    show,
    onClose,
    onUserAdded
}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: ''
        },
        validationSchema: createUserValidation,
        onSubmit: async (values) => {
            try {
                const res = await createUser(values)
                onUserAdded(res.data)
                toast.success(`${values.name} has been added and can now log in.`)
                onClose()
            } catch (err) {
                handleError(err, 'Something went wrong adding this user. Please try again later.')
            }
        }
    })

    useEffect(() => {
        if (!show) {
            formik.resetForm()
        }
    }, [show])

    const onRequestClose = () => {
        if (formik.isSubmitting) {
            return
        }

        onClose()
    }

    return (
        <Modal isOpen={show} onRequestClose={onRequestClose}>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="George Washington"
                    formik={formik}
                />

                <Input
                    type="text"
                    label="Phone Number"
                    name="phone"
                    formik={formik}
                />

                <ModalActions
                    onCancel={onRequestClose}
                    loading={formik.isSubmitting}
                    onSubmit={formik.handleSubmit}
                    submitText="Add User"
                />
            </form>
        </Modal>
    )
}

