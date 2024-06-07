import React from 'react'
import { FormikContextType } from 'formik'

type Props = {
    options: { value: string, label: string }[]
    label: string
    name: string
    formik: FormikContextType<any>
}

export const DataList: React.FC<Props> = ({
    options,
    label,
    name,
    formik
}) => {
    return (
        <label htmlFor={name}>
            {label}
            <input
                list={`${name}-list`}
                id={name}
                name={name}
                type="search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
            />
            <sub className="error">
                {formik.touched[name] && formik.errors[name]
                    ? formik.errors[name].toString()
                    : ''
                }
            </sub>
            <datalist id={`${name}-list`}>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </datalist>
        </label>
    )
}

