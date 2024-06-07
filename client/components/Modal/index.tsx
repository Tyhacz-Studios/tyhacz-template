import React from 'react'
import ReactModal from 'react-modal'
import './styles.css'

type Props = {
    isOpen: boolean
    onRequestClose: () => void
    children: any
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    innerWidth: '300px',
    maxWidth: '500px'
  }
}

export const Modal: React.FC<Props> = ({
    isOpen,
    onRequestClose,
    children
}) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            { children }
        </ReactModal>
    )
}

export const ModalActions: React.FC<{
    onCancel: () => void
    onSubmit: () => void
    loading?: boolean
    submitText?: string
}> = ({
    onCancel,
    onSubmit,
    loading,
    submitText
}) => {
    return (
        <div className="modal-actions">
            <button className="secondary" type="button" onClick={onCancel} disabled={loading}>
                Close
            </button>
            <button className="primary" type="button" onClick={onSubmit} disabled={loading}>
                { submitText || 'Submit' }
            </button>
        </div>
    )
}
