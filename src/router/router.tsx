import { createBrowserRouter, Navigate } from "react-router-dom"
import { Routes } from "./routes.ts"
import { Layout } from "@components/Layout/Layout.tsx"
import { ClassesSchedulePage, HomePage, SettingsPage } from "@/router/pages.ts"

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={Routes.HOME} /> },
      { path: Routes.CLASSES, element: <ClassesSchedulePage /> },
      { path: Routes.HOME, element: <HomePage /> },
      { path: Routes.SETTINGS, element: <SettingsPage /> },
    ],
  },
])
