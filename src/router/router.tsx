import { createBrowserRouter, Navigate } from "react-router-dom"
import { Routes } from "./routes.ts"
import { Layout } from "@components/Layout/Layout.tsx"
import { ClassesSchedulePage } from "../ui/pages/ClassesSchedulePage.tsx"
import { HomePage } from "../ui/pages/HomePage.tsx"

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: Routes.MAIN,
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={Routes.HOME} /> },
      { path: Routes.CLASSES, element: <ClassesSchedulePage /> },
      { path: Routes.HOME, element: <HomePage /> },
    ],
  },
])
