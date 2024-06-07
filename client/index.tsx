import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createRoot } from "react-dom/client"
import { Routes } from "./Routes"
import { AuthProvider } from './contexts/AuthUserContext'
import './globals.css'

const container = document.getElementById("app")
if (!container) {
    throw Error('No #app in document.')
}
const root = createRoot(container)
root.render(
    <AuthProvider>
        <ToastContainer position="top-right" />
        <Routes />
    </AuthProvider>
)
