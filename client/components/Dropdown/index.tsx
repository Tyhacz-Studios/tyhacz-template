import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

type Props = {
    items: {
        label: string
        onClick?: () => void
        href?: string
    }[]
}

export const Dropdown: React.FC<Props> = ({
    items
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }, [dropdownRef])

    const handleEscapeKeyPress = useCallback((event: KeyboardEvent) => {
        if (isOpen && event.key === 'Escape') {
            setIsOpen(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside, isOpen])

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeKeyPress)

        return () => {
            document.removeEventListener("keydown", handleEscapeKeyPress)
        }
    }, [handleEscapeKeyPress])

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="secondary"
            >
                Actions
                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.5 6L12.1292 0.75H0.870835L6.5 6Z" fill="#10086D"/> </svg>
            </button>
            {isOpen && (
                <ul tabIndex={-1} role="listbox">
                    {items.map(item => (
                        <li 
                            key={item.label} 
                            role="option"
                        >
                            {!!item.href
                                ? <Link to={item.href}>{item.label}</Link>
                                : <button type="button" onClick={item.onClick}>{item.label}</button>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

