import React from 'react'
import './styles.css'

type Props = {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    name: string
    label: string
    checked: boolean
    defaultChecked?: boolean
}

export const Checkbox: React.FC<Props> = ({
    onChange,
    name,
    label,
    checked
}) => {
    return (
        <label htmlFor={name} className="checkbox-label">
            { label }
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
        </label>
    )
}

