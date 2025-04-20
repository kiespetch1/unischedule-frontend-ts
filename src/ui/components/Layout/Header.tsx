import { FC } from "react"
import IateLogo from "@assets/iate-logo.svg?react"
import Notifications from "@assets/notification.svg?react"
import User from "@assets/user.svg?react"

export const Header: FC = () => {
  return (
    <header className="z-100 sticky top-0 mb-6 box-content flex h-[90px] items-center border-b-2 border-zinc-300 bg-zinc-100">
      <ul className="flex w-full flex-row justify-between px-8 *:flex">
        <li>
          <a className="flex flex-row items-center space-x-8" href="/home" aria-label="На главную">
            <IateLogo />
            <p className="font-raleway text-2xl font-semibold">Расписание занятий</p>
          </a>
        </li>
        <li className="flex flex-row space-x-9">
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
