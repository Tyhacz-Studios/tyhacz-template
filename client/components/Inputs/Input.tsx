import React from 'react'
import { FormikContextType } from 'formik'
import './styles.css'

type Props = {
    name: string
    label: string
    type: 'tel' | 'text' | 'date' | 'number' | 'email' | 'password'
    required?: boolean
    placeholder?: string
    disabled?: boolean
    min?: number
    formik: FormikContextType<any>
    value?: string
}
export const Input: React.FC<Props> = ({
    name,
    label,
    type,
    required,
    placeholder,
    disabled,
    min,
    formik,
    value
}) => {
    return (
      <label htmlFor={name}>
          { label }
          <input
              type={type}
              name={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={required}
              placeholder={placeholder}
              value={formik.values[name] ?? value}
              disabled={disabled}
              min={min}
          />
          <sub className="error">
             {formik.touched[name] && formik.errors[name]
                ? formik.errors[name].toString()
                : ''
              }
          </sub>
      </label>
    )
}
