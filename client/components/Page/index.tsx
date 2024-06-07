import React, { useMemo } from 'react'
import './styles.css'

type Props = {
    children: any
}
export const Page: React.FC<Props> = ({ children }) => {
    return (
        <div className="app-page">
            { children }
        </div>
    )
}

export const FormPage: React.FC<{
    children: any
    sections: { href: string, title: string }[]
}> = ({ children, sections }) => {
    return (
        <div className="app-page form-page">
            <div className="form-page-side-nav">
                {
                    sections.map((section) => (
                        <a key={section.href} href={section.href}>
                            {section.title}
                        </a>
                    ))
                }
            </div>
            { children }
        </div>
    )
}

export const Section: React.FC<{ title: string, children: any }> = ({ title, children }) => {
    const id = useMemo(() => {
        return title.toLowerCase().replaceAll(' ', '-')
    }, [title])

    return (
        <div className="app-page-section" id={id}>
            <h2>{title}</h2>
            { children }
        </div>
    )
}

export const FormSection: React.FC<{ title: string, children: any }> = ({ title, children }) => {
    const id = useMemo(() => {
        return title.toLowerCase().replaceAll(' ', '-')
    }, [title])

    return (
        <div className="app-page-section" id={id}>
            <h2>{title}</h2>
            <div className="form-section">
                { children }
            </div>
        </div>
    )
}

export const SectionActions: React.FC<{ children: any }> = ({ children }) => {
    return (
        <div className="section-actions">
            { children }
        </div>
    )
}

export const Card: React.FC<{ children: any, title: string }> = ({ children, title }) => {
    return (
        <div className="app-card">
            <h2>{title}</h2>
            { children }
        </div>
    )
}
