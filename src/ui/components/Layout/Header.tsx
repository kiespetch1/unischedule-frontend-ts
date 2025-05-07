import { FC, useState } from "react"
import IateLogo from "@assets/iate-logo.svg?react"
import Notifications from "@assets/notification.svg?react"
import User from "@assets/user.svg?react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { LoginForm } from "@/components/login-form.tsx"
import { useDialog } from "@/contexts/dialog-context.tsx"

export const Header: FC = () => {
  const { isAnnouncementsOpen, openAnnouncements, closeAnnouncements } = useDialog()
  const [isLoginOpen, setLoginOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 mb-6 box-content flex h-[90px] items-center border-b-2 border-zinc-300 bg-zinc-100">
      <ul className="flex w-full flex-row justify-between px-8 *:flex *:items-center">
        <li>
          <a href="/home" className="flex flex-row items-center gap-8" aria-label="На главную">
            <IateLogo />
            <p className="font-raleway text-2xl font-semibold">Расписание занятий</p>
          </a>
        </li>
        <li className="flex-row gap-9">
          <DialogWrapper
            title="Объявления группы"
            description="Объявления"
            open={isAnnouncementsOpen}
            onOpenChange={open => !open && closeAnnouncements()}
            trigger={
              <a
                href="#"
                className="hover:bg-zinc-150 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-xl transition-colors duration-300"
                aria-label="Открыть объявления"
                onClick={e => {
                  e.preventDefault()
                  openAnnouncements()
                }}>
                <Notifications />
              </a>
            }
          />

          <DialogWrapper
            headless={true}
            open={isLoginOpen}
            onOpenChange={setLoginOpen}
            showCloseButton={false}
            trigger={
              <a
                href="#"
                className="hover:bg-zinc-150 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-xl transition-colors duration-300"
                aria-label="В профиль">
                <User />
              </a>
            }>
            <LoginForm onSuccess={() => setLoginOpen(false)} />
          </DialogWrapper>
        </li>
      </ul>
    </header>
  )
}
