import React from 'react'
import { FormikContextType } from 'formik'
import './styles.css'

type Props = {
    name: string
    label: string
    required?: boolean
    placeholder?: string
    formik: FormikContextType<any>
}
export const TextArea: React.FC<Props> = ({
    name,
    label,
    required,
    placeholder,
    formik
}) => {
    return (
      <label htmlFor={name}>
          { label }
          <textarea
              name={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={required}
              placeholder={placeholder}
              value={formik.values[name]}
              rows={8}
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
