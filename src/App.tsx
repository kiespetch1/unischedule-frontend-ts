import { RouterProvider } from "react-router-dom"
import { router } from "./router/router.tsx"
import { RootProvider } from "@/providers/RootProvider.tsx"

function App() {
  return (
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
  )
}

export default App
