import { FC } from "react"
import Dot from "../Dot.tsx"

export const Footer: FC = () => {
  return (
    <footer className="mt-auto flex h-16 w-full max-w-[1920px] flex-col items-center">
      <div className="h-0.5 w-4/5 bg-zinc-200"></div>
      <div className="flex w-full flex-1 flex-row items-center justify-between">
        <div className="mx-auto flex flex-row items-center justify-start gap-2">
          <span className="font-raleway text-neutral-500">2025</span>
          <Dot colorClass={"bg-neutral-500"} />
          <span className="font-raleway text-neutral-500">
            UniSchedule - неофициальный информационный портал
          </span>
        </div>
        <div className="mx-auto flex flex-row items-center justify-start gap-5">
          <a
            href="https://yoomoney.ru/to/410017122242919"
            className="font-raleway text-neutral-500">
            Поддержать проект
          </a>
          <a href="https://t.me/kiespetchq" className="font-raleway text-neutral-500">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  )
}
