import { createBrowserRouter, Navigate } from "react-router-dom"
import { Routes } from "./routes.ts"
import { Layout } from "../ui/components/Layout/Layout.tsx"
import { SchedulePage } from "../ui/SchedulePage.tsx"
import { HomePage } from "../ui/HomePage.tsx"

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={Routes.HOME} /> },
      { path: Routes.CLASSES, element: <SchedulePage /> },
      { path: Routes.HOME, element: <HomePage /> },
    ],
  },
])
