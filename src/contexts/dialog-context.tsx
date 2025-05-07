import { createContext, useContext, useState, ReactNode, FC } from "react"

interface DialogContextProps {
  isAnnouncementsOpen: boolean
  openAnnouncements: () => void
  closeAnnouncements: () => void
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined)

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAnnouncementsOpen, setAnnouncementsOpen] = useState(false)

  const openAnnouncements = () => setAnnouncementsOpen(true)
  const closeAnnouncements = () => setAnnouncementsOpen(false)

  return (
    <DialogContext.Provider
      value={{
        isAnnouncementsOpen,
        openAnnouncements,
        closeAnnouncements
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
