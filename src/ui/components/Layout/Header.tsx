import { FC, useState } from "react"
import IateLogo from "@assets/iate-logo.svg?react"
import { User } from "lucide-react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { LoginForm } from "@components/common/login-form.tsx"
import { useDialog } from "@/contexts/dialog-context.tsx"
import { useAuth } from "@/features/auth/context/auth-context.tsx"
import { UserPanel } from "./UserPanel"
import { AnnouncementsPopover } from "@components/Layout/Announcements/AnnouncementsPopover.tsx"
import { useLocation } from "react-router-dom"
import { useGetGroupById } from "@/features/classes-schedule/groups/hooks/use-group-query.ts"

export const Header: FC = () => {
  const { isAnnouncementsOpen, openAnnouncements, closeAnnouncements } = useDialog()
  const [isLoginOpen, setLoginOpen] = useState(false)
  const { authState } = useAuth()

  const location = useLocation()
  const currentGroupId = location.pathname.split("/")[2]
  const { data: currentGroup } = useGetGroupById({ id: currentGroupId })
  const { data: userGroup } = useGetGroupById({
    id: authState.userData ? authState.userData!.group_id : currentGroupId,
  })

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
            groupName={authState.isAuthenticated ? userGroup?.name : currentGroup?.name}
            open={isAnnouncementsOpen}
            onClose={closeAnnouncements}
            onOpen={openAnnouncements}
          />
          <DialogWrapper
            headless={!authState.isAuthenticated}
            open={isLoginOpen}
            onOpenChange={setLoginOpen}
            showCloseButton={false}
            className="max-w-md"
            trigger={
              <a
                href="#"
                className="hover:bg-zinc-150 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-xl transition-colors duration-300"
                aria-label="В профиль">
                <User width={34} height={34} />
              </a>
            }>
            {authState.isAuthenticated ? (
              <UserPanel userData={authState.userData} onClose={() => setLoginOpen(false)} />
            ) : (
              <LoginForm />
            )}
          </DialogWrapper>
        </li>
      </ul>
    </header>
  )
}
