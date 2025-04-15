import { Toaster } from "react-hot-toast"

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: { fontFamily: "Raleway, sans-serif" },
        success: { duration: 6000 },
        error: { duration: 10000 },
      }}
    />
  )
}
