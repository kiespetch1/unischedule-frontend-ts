import { FC } from "react"
import Dot from "../Dot.tsx"

export const Footer: FC = () => {
  return (
    <footer className="w-full h-16 max-w-[1920px] flex flex-col items-center mt-auto">
      <div className="w-4/5 h-0.5 bg-zinc-200"></div>
      <div className="w-full flex flex-row justify-between items-center flex-1">
        <div className="flex flex-row justify-start items-center space-x-2 mx-auto">
          <span className="font-raleway text-neutral-500">2025</span>
          <Dot colorClass={"bg-neutral-500"} />
          <span className="font-raleway text-neutral-500">
            UniSchedule - неофициальный информационный портал
          </span>
        </div>
        <div className="flex flex-row justify-start items-center space-x-5 mx-auto">
          <a
            className="font-raleway text-neutral-500"
            href="https://yoomoney.ru/to/410017122242919">
            Поддержать проект
          </a>
          <a className="font-raleway text-neutral-500" href="https://t.me/kiespetchq">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  )
}
