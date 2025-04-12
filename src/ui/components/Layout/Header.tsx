import { FC } from "react"
import IateLogo from "@assets/iate-logo.svg?react"
import Notifications from "@assets/notification.svg?react"
import User from "@assets/user.svg?react"

export const Header: FC = () => {
  return (
    <header className="h-[90px] flex items-center border-b-2 border-zinc-300 bg-zinc-50 box-content sticky top-0">
      <ul className="w-full flex justify-between flex-row px-8 *:inline-block">
        <li>
          <a className="flex flex-row items-center space-x-8" href="/home" aria-label="На главную">
            <IateLogo />
            <p className="font-raleway font-semibold text-2xl">Расписание занятий</p>
          </a>
        </li>
        <li className="flex basis-30 space-x-9">
          <a className="flex items-center" href="/announcements" aria-label="Открыть объявления">
            <Notifications />
          </a>
          <a className="flex items-center" href="/profile" aria-label="В профиль">
            <User />
          </a>
        </li>
      </ul>
    </header>
  )
}
