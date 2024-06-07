import * as React from "react"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

// Auth
import { Login } from './pages/Login'
import { ConfirmPhone } from './pages/Login/ConfirmPhone'

// In-App
import { AppLayout } from './layouts/App'
import { Dashboard } from './pages/Dashboard'

// Users
import { Users } from './pages/Users'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/phone-confirm",
    element: <ConfirmPhone />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {

            path: "users",
            element: <Users />
        }
    ]
  }
])

export const Routes = () => {

    return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    )
}
