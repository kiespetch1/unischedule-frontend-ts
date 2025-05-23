import { FC, useState } from "react"
import IateLogo from "@assets/iate-logo.svg?react"
import User from "@assets/user.svg?react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { LoginForm } from "@/components/login-form.tsx"
import { useDialog } from "@/contexts/dialog-context.tsx"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { UserPanel } from "./UserPanel"
import { AnnouncementsPopover } from "@components/Layout/Announcements/AnnouncementsPopover.tsx"

export const Header: FC = () => {
  const { isAnnouncementsOpen, openAnnouncements, closeAnnouncements } = useDialog()
  const [isLoginOpen, setLoginOpen] = useState(false)
  const { authState } = useAuth()

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
          <AnnouncementsPopover
            groupId={"340cb1cf-b29f-4d21-b0b5-6a5f68e26647"}
            groupName="ИВТ-Б21"
            open={isAnnouncementsOpen}
            closeAnnouncements={closeAnnouncements}
            openAnnouncements={openAnnouncements}
          />

          <DialogWrapper
            headless={!authState.isAuthenticated}
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
            {authState.isAuthenticated ? (
              <UserPanel userData={authState.userData} onLogout={() => setLoginOpen(false)} />
            ) : (
              <LoginForm />
            )}
          </DialogWrapper>
        </li>
      </ul>
    </header>
  )
}
