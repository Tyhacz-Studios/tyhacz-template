import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthUserContext'
import './styles.css'

export const AppLayout: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false)
    const { authUser, loading } = useAuth()

    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    const checkAuth = useCallback(async () => {
        if (!loading && !authUser) {
            toast.error('Your session has expired. Logging you out...')
            setTimeout(() => logout(), 2000)
        }
    }, [authUser, loading])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    return (
        <div className="app-layout">
            <header>
                <button className="mobile-toggle-nav" onClick={toggleNav}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.25 24.0833H29.75M4.25 17H29.75M4.25 9.91663H29.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                </button>
                <img src="/assets/logo.png" height={45} />
                <div className="clear-fix"></div>
                <button onClick={logout}>
                    Log Out
                </button>
            </header>
            <nav className={navOpen ? 'mobile-nav-open' : ''}>
                <NavLink to="/app/dashboard">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 3V8H15V4.71094L9 10.7109L6 7.71094L0.726562 12.9766L0.0234375 12.2734L6 6.28906L9 9.28906L14.2891 4H11V3H16Z" fill="black"/> </svg>
                    <span>Dashboard</span>
                </NavLink>
                { authUser?.superAdmin && (<NavLink to="/app/users">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_84_1044)"> <path d="M12.6667 11.3334V12.6667H4.66667V11.3334C4.66667 11.3334 4.66667 8.66671 8.66667 8.66671C12.6667 8.66671 12.6667 11.3334 12.6667 11.3334ZM10.6667 5.33337C10.6667 4.93781 10.5494 4.55113 10.3296 4.22223C10.1098 3.89334 9.79749 3.63699 9.43203 3.48562C9.06658 3.33424 8.66445 3.29463 8.27649 3.3718C7.88852 3.44897 7.53216 3.63946 7.25245 3.91916C6.97275 4.19887 6.78227 4.55523 6.7051 4.94319C6.62793 5.33116 6.66753 5.73329 6.81891 6.09874C6.97028 6.46419 7.22663 6.77655 7.55553 6.99631C7.88442 7.21608 8.2711 7.33337 8.66667 7.33337C9.1971 7.33337 9.70581 7.12266 10.0809 6.74759C10.456 6.37252 10.6667 5.86381 10.6667 5.33337ZM12.8 8.70671C13.1644 9.04291 13.4582 9.44833 13.6643 9.89932C13.8703 10.3503 13.9844 10.8378 14 11.3334V12.6667H16V11.3334C16 11.3334 16 9.03338 12.8 8.70671ZM12 3.33337C11.7986 3.3335 11.5984 3.36498 11.4067 3.42671C11.7967 3.98602 12.0058 4.6515 12.0058 5.33337C12.0058 6.01525 11.7967 6.68073 11.4067 7.24004C11.5984 7.30177 11.7986 7.33325 12 7.33337C12.5304 7.33337 13.0391 7.12266 13.4142 6.74759C13.7893 6.37252 14 5.86381 14 5.33337C14 4.80294 13.7893 4.29423 13.4142 3.91916C13.0391 3.54409 12.5304 3.33337 12 3.33337ZM5.33333 6.66671H3.33333V4.66671H2V6.66671H0V8.00004H2V10H3.33333V8.00004H5.33333V6.66671Z" fill="#636184"/> </g> <defs> <clipPath id="clip0_84_1044"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>
                    <span>Super Admin</span>
                </NavLink>)}
            </nav>
            <div className="app-content" onClick={() => setNavOpen(false)}>
                <Outlet />
            </div>
        </div>
    )
}
