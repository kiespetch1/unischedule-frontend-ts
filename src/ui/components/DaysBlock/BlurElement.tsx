import { FC } from "react"

interface BlurElementProps {
  isActive?: boolean
}

export const BlurElement: FC<BlurElementProps> = ({ isActive = true }) => {
  if (!isActive) return null

  return (
    <div className="animate-fade-in-scale-200 fixed bottom-0 left-0 right-0 top-[196px] z-10 bg-[linear-gradient(180deg,rgba(241,241,241,0)_0%,rgba(244,244,244,0.6375)_2.84%,rgba(247,247,247,0.75)_100%)] backdrop-blur-md" />
  )
}
