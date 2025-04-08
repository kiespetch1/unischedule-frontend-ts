import { FC } from "react"

export const Footer: FC = () => {
  return (
    <footer className="w-full h-16 max-w-[1920px] flex flex-col items-center">
      <div className="w-4/5 h-px bg-zinc-300"></div>
      <div className="w-full flex flex-row justify-between items-center flex-1">
        <div className="flex flex-row justify-start items-center space-x-2 mx-auto">
          <span>2025</span>
          <span>UniSchedule - неофициальный информационный портал</span>
        </div>
        <div className="flex flex-row justify-start items-center space-x-2 mx-auto">
          <span>Поддержать проект</span>
          <span>Контакты</span>
        </div>
      </div>
    </footer>
  )
}
