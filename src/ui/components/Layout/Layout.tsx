import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header.tsx"
import { Footer } from "./Footer.tsx"

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className="mb-3 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
