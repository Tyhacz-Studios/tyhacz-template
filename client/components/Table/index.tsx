import React from 'react'
import './styles.css'

export const Table: React.FC<{ children: any }> = ({ children }) => {
    return (
        <div className="table-container">
            <table>
                { children }
            </table>
        </div>
    )
}
