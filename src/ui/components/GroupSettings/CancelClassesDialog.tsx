import { FC, useState } from "react"
import { DialogWrapper } from "@components/common/DialogWrapper.tsx"
import { Button } from "@/ui/basic/button.tsx"
import { ScrollArea } from "@/ui/basic/scroll-area"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import { WeekModel, DayOfWeek } from "@/features/classes-schedule/types/classes-types.ts"
import { SelectableDayCard } from "./SelectableDayCard.tsx"
import { getPluralForm, getRussianDayName } from "@/utils/formatters.ts"
import { ArrowLeft, CalendarMinus, CalendarX } from "lucide-react"
import { useCancelClassesByDays } from "@/features/classes-schedule/classes/hooks/use-cancel-class.ts"
import { useCancelAllClassesByDaysName } from "@/features/classes-schedule/groups/hooks/use-cancel-all-classes-by-days-name"

interface CancelClassesDialogProps {
  mode: "group" | "global"
  weeks?: WeekModel[]
  groupId?: string
}

const weekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
]

export const CancelClassesDialog: FC<CancelClassesDialogProps> = ({ mode, weeks, groupId }) => {
  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [evenDays, setEvenDays] = useState<DayOfWeek[]>([])
  const [oddDays, setOddDays] = useState<DayOfWeek[]>([])
  const [loading, setLoading] = useState(false)

  const { mutateAsync: cancelByIds } = useCancelClassesByDays({
    dayIds: selectedIds,
    groupId: groupId ?? "",
  })
  const { mutateAsync: cancelByNames } = useCancelAllClassesByDaysName({
    even: evenDays,
    odd: oddDays,
  })

  const handleConfirm = async () => {
    setLoading(true)
    if (mode === "group") {
      await cancelByIds()
      setSelectedIds([])
    } else {
      await cancelByNames()
      setEvenDays([])
      setOddDays([])
    }
    setLoading(false)
    setOpen(false)
  }

  const disableConfirm =
    mode === "group"
      ? selectedIds.length === 0 || loading
      : (evenDays.length === 0 && oddDays.length === 0) || loading

  if (mode === "group") {
    return (
      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        trigger={
          <Button variant="destructive">
            <CalendarX className="mr-2 h-4 w-4" />
            Отменить пары для указанных дней
          </Button>
        }>
        <div className="flex flex-col gap-2">
          <div className="font-raleway text-base/6 font-semibold">
            Отменить пары для указанных дней
          </div>
          <div className="font-raleway text-muted-foreground text-sm font-normal">
            Выберите дни для отмены
          </div>
          <div className="flex max-h-[calc(80vh-100px)] flex-col">
            <ScrollArea className="w-full overflow-auto">
              <div className="flex flex-col gap-3 pb-4 pr-4">
                {weeks?.map(week => (
                  <div key={week.id} className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <span className="font-raleway text-sm">
                        {week.type == "even" ? "Четная неделя" : "Нечетная неделя"}
                        {week.subgroup === "first"
                          ? ", первая подгруппа"
                          : week.subgroup === "second"
                            ? ", вторая подгруппа"
                            : null}
                      </span>
                      {week.type == "even" ? (
                        <EvenWeek width="20px" height="20px" />
                      ) : (
                        <OddWeek width="20px" height="20px" />
                      )}
                      {week.subgroup === "first" && <FirstGroup width="20px" height="20px" />}
                      {week.subgroup === "second" && <SecondGroup width="20px" height="20px" />}
                    </div>
                    <div className="flex flex-row flex-wrap gap-2">
                      {week.days.map(day => (
                        <SelectableDayCard
                          key={day.id}
                          value={day.id}
                          label={getRussianDayName(day.day_of_week) || ""}
                          info={`${day.classes?.length ?? 0} ${getPluralForm(
                            day.classes?.length ?? 0,
                            ["пара", "пары", "пар"]
                          )}`}
                          setList={setSelectedIds}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 flex flex-row items-center justify-end gap-2 pt-2">
              <Button onClick={() => setOpen(false)} disabled={loading}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться
              </Button>
              <Button variant="destructive" disabled={disableConfirm} onClick={handleConfirm}>
                <CalendarMinus className="mr-2 h-4 w-4" />
                Отменить выбранные пары
              </Button>
            </div>
          </div>
        </div>
      </DialogWrapper>
    )
  }

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      showCloseButton={false}
      trigger={
        <Button variant="destructive">
          <CalendarX className="mr-2 h-4 w-4" />
          Отменить пары для всех групп на указанный период
        </Button>
      }>
      <div className="flex flex-col gap-2">
        <div className="font-raleway text-base/6 font-semibold">
          Отменить пары для всех групп на указанный период
        </div>
        <div className="font-raleway text-muted-foreground text-sm font-normal">
          Выберите период, в течение которого будут отменены пары для всех групп.
        </div>
        <div className="flex max-h-[calc(80vh-100px)] flex-col">
          <ScrollArea className="w-full overflow-auto">
            <div className="flex flex-col gap-3 pb-4 pr-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <span className="font-raleway text-sm">Четная неделя</span>
                  <EvenWeek width="20px" height="20px" />
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {weekDays.map(day => (
                    <SelectableDayCard
                      key={`even-${day}`}
                      value={day}
                      label={getRussianDayName(day) || ""}
                      setList={setEvenDays}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <span className="font-raleway text-sm">Нечетная неделя</span>
                  <OddWeek width="20px" height="20px" />
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {weekDays.map(day => (
                    <SelectableDayCard
                      key={`odd-${day}`}
                      value={day}
                      label={getRussianDayName(day) || ""}
                      setList={setOddDays}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="mt-4 flex flex-row items-center justify-end gap-2 pt-2">
            <Button onClick={() => setOpen(false)} disabled={loading}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться
            </Button>
            <Button variant="destructive" disabled={disableConfirm} onClick={handleConfirm}>
              <CalendarMinus className="mr-2 h-4 w-4" />
              Отменить выбранные пары
            </Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  )
}
