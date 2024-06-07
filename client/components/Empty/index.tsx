import React from 'react'
import './styles.css'

type Props = {
    children: any
}

export const Empty: React.FC<Props> = ({ children }) => {
    return (
        <div className="empty-text">
            { children }
        </div>
    )
}

