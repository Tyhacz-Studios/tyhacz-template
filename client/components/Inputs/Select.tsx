import React from 'react'
import { FormikContextType } from 'formik'
import './styles.css'

type Props = {
    name: string
    label: string
    required?: boolean
    placeholder?: string
    options: { value: string, label: string }[]
    formik: FormikContextType<any>
    disabled?: boolean
    value?: string
}
export const Select: React.FC<Props> = ({
    name,
    label,
    required,
    placeholder,
    options,
    formik,
    disabled,
    value: currentValue
}) => {
    if (!formik) {
        console.log({ name, label })
    }
    const value = formik.values[name] ?? currentValue

    return (
      <label htmlFor={name}>
          { label }
          <select
              name={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={required}
              value={value}
              disabled={disabled}
          >
              { placeholder?.length > 0 && (
                  <option value="" disabled selected={!value || value === ""}>{placeholder}</option>
              )}
              {
                  options.map((option) => (
                      <option key={option.value} value={option.value} selected={value === option.value}>
                          { option.label }
                      </option>

                  ))
              }
          </select>
          <sub className="error">
             {formik.touched[name] && formik.errors[name]
                ? formik.errors[name].toString()
                : ''
              }
          </sub>
      </label>
    )
}
