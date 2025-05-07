import { FC } from "react"
import clsx from "clsx"
import Dot from "@components/Dot.tsx"
import FirstGroup from "@assets/first-group.svg?react"
import SecondGroup from "@assets/second-group.svg?react"
import EvenWeek from "@assets/even-week.svg?react"
import OddWeek from "@assets/odd-week.svg?react"
import {
  ClassModel,
  ClassType,
  Subgroup,
  WeekType,
} from "@/features/classes-schedule/types/classes-types.ts"
import { getErrorMessages, trimEndChars, trimStartChars } from "@/utils/formatters.ts"
import { TooltipWrapper } from "@components/common/TooltipWrapper.tsx"
import {
  getRussianClassTypeName,
  getRussianLocationTypeName,
} from "@components/DaysBlock/formatters.ts"
import { formOptions, useForm } from "@tanstack/react-form"
import { defaultClass, defaultClassEdit, defaultId } from "@/utils/default-entities.ts"
import { classDefaultSchema } from "@/utils/zod-schemas.ts"
import {
  ClassEditModel,
  toClassCreateModel,
  toClassEditModel,
  toClassEditModelFlat,
} from "@/features/classes-schedule/dto/edit-class-model.ts"
import { Input } from "@/components/ui/input.tsx"
import { Combobox } from "@/components/ui/combobox"
import { ClassFeaturesPopover } from "@components/DaysBlock/Class/ClassFeaturesPopover.tsx"
import { ZodType } from "zod"
import { ClassTypeOptions } from "@components/DaysBlock/Class/combobox-options.ts"
import { TeacherPicker } from "@components/DaysBlock/Class/TeacherPicker.tsx"
import { LocationPicker } from "@components/DaysBlock/Class/LocationPicker.tsx"
import {
  useCreateClass,
  useDeleteClass,
  useUpdateClass,
} from "@/features/classes-schedule/classes/hooks/use-class-query.ts"
import { ClassSideButtons } from "@components/DaysBlock/Class/ClassSideButtons.tsx"

export interface ClassProps {
  isFirst?: boolean
  isWeekend: boolean
  editing?: boolean
  data?: ClassModel
  clickable?: boolean
  onClick?: () => void
  onActiveChange?: (index: number | undefined) => void
  groupId?: string
  dayId?: string
  onUnsavedDelete?: () => void
}

export const Class: FC<ClassProps> = ({
  isFirst = false,
  editing = false,
  clickable = false,
  isWeekend,
  data,
  onClick,
  onActiveChange,
  groupId = "",
  dayId = "",
  onUnsavedDelete = () => {},
}) => {
  const baseBlockClass =
    "flex flex-row items-center justify-between py-1 mb-[6px] w-[600px] h-[133px] rounded-b-sm"
  const baseBlockFinalClass = clsx(
    baseBlockClass,
    !isFirst ? "rounded-t-sm" : "",
    editing ? "bg-zinc-200 px-3" : "bg-zinc-120 px-8",
    clickable ? "cursor-pointer" : "cursor-default"
  )

  const classData: ClassModel = data ?? defaultClass
  const { mutateAsync: createClass } = useCreateClass({ group_id: groupId })
  const { mutateAsync: updateClass } = useUpdateClass({ classData, group_id: groupId })
  const { mutateAsync: deleteClass } = useDeleteClass({ classData, group_id: groupId })
  const handleClassDelete = () => {
    if (classData.id === defaultId) {
      onUnsavedDelete()
    } else {
      deleteClass()
    }
  }

  const classFormOptions = formOptions({
    defaultValues: classData ? toClassEditModel(classData) : defaultClassEdit,
    validators: {
      onChange: classDefaultSchema as ZodType<ClassEditModel>,
      onChangeAsyncDebounceMs: 400,
    },
    canSubmitWhenInvalid: false,
  })

  const classForm = useForm({
    ...classFormOptions,
    onSubmit: async ({ value }) => {
      if (value.is_new) {
        await createClass(toClassCreateModel(value, dayId))
      } else {
        await updateClass(toClassEditModelFlat(value))
      }

      if (onActiveChange) {
        onActiveChange(undefined)
      }
    },
  })

  if (editing) {
    return (
      <form
        className="relative"
        onSubmit={e => {
          e.preventDefault()
          classForm.handleSubmit(e)
        }}>
        <div className={baseBlockFinalClass}>
          <div className="box-content flex h-full flex-col items-start justify-evenly">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-1">
                <classForm.Field name="started_at">
                  {field => {
                    const { errors, isTouched } = field.state.meta
                    return (
                      <TooltipWrapper
                        isOpen={isTouched && errors.length > 0}
                        message={getErrorMessages(errors)}
                        delayDuration={0}>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={e => field.setValue(e.target.value)}
                          aria-invalid={isTouched && errors.length > 0}
                          type="class-time"
                          placeholder="09:00"
                          required
                        />
                      </TooltipWrapper>
                    )
                  }}
                </classForm.Field>
                <span className="font-raleway text-2xl font-semibold">-</span>
                <classForm.Field name="finished_at">
                  {field => {
                    const { errors, isTouched } = field.state.meta
                    return (
                      <TooltipWrapper
                        isOpen={isTouched && errors.length > 0}
                        message={getErrorMessages(errors)}
                        delayDuration={0}>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={e => field.setValue(e.target.value)}
                          aria-invalid={isTouched && errors.length > 0}
                          type="class-time"
                          className="text-2xl font-semibold"
                          placeholder="10:45"
                          required
                        />
                      </TooltipWrapper>
                    )
                  }}
                </classForm.Field>
              </div>
              <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
              <classForm.Field name="type">
                {field => {
                  return (
                    <Combobox<ClassType>
                      options={ClassTypeOptions}
                      value={field.state.value}
                      onChange={value => field.setValue(value)}
                      useSearch={false}
                      className="font-raleway text-lg font-normal"
                      widthClass="w-[148px]"
                    />
                  )
                }}
              </classForm.Field>
              <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
              <classForm.Field name="features">
                {field => {
                  return (
                    <ClassFeaturesPopover
                      weekType={field.state.value.week_type}
                      subgroup={field.state.value.subgroup}
                      onWeekTypeChange={wt =>
                        field.setValue({ ...field.state.value, week_type: wt })
                      }
                      onSubgroupChange={sg =>
                        field.setValue({ ...field.state.value, subgroup: sg })
                      }
                    />
                  )
                }}
              </classForm.Field>
            </div>
            <classForm.Field name="name">
              {field => {
                const { errors, isTouched } = field.state.meta
                return (
                  <TooltipWrapper
                    isOpen={isTouched && errors.length > 0}
                    message={getErrorMessages(errors)}
                    delayDuration={0}>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={e => field.setValue(e.target.value)}
                      aria-invalid={isTouched && errors.length > 0}
                      type={field.name}
                      placeholder="Ядерная физика"
                      autoComplete="off"
                      required
                    />
                  </TooltipWrapper>
                )
              }}
            </classForm.Field>
            <classForm.Field name="teacher_id">
              {field => {
                return (
                  <TeacherPicker
                    value={field.state.value}
                    onChange={field.setValue}
                    className="text-sm font-normal"
                  />
                )
              }}
            </classForm.Field>
          </div>
          <div className="flex h-3/5 flex-col items-center justify-evenly">
            <classForm.Field name="location_id">
              {fieldApi => {
                return (
                  <LocationPicker
                    value={fieldApi.state.value}
                    onChange={fieldApi.setValue}
                    className="text-sm font-normal"
                  />
                )
              }}
            </classForm.Field>
          </div>
        </div>
        <ClassSideButtons onClassDelete={handleClassDelete} />
      </form>
    )
  }

  const getIrlLocationTooltipMessage = (locationName: string) => {
    const building = trimStartChars(locationName, 1)
    const floor = locationName.substring(2, 3)

    return `${building} корпус, ${floor} этаж`
  }

  if (isWeekend) {
    return (
      <div className={baseBlockFinalClass}>
        <span className="font-raleway w-full text-center text-3xl font-normal">Выходной день</span>
      </div>
    )
  }

  return (
    <div className={baseBlockFinalClass} onClick={onClick}>
      <div className="box-content flex h-full flex-col items-start justify-evenly">
        <div className="flex flex-row items-center gap-4">
          <span className="font-raleway text-2xl font-semibold">
            {trimEndChars(classData.started_at, 3)} - {trimEndChars(classData.finished_at, 3)}
          </span>
          <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
          <span className="font-raleway text-lg font-normal">
            {getRussianClassTypeName(classData.type)}
          </span>
          <IconsSection weekType={classData.week_type} subgroup={classData.subgroup} />
        </div>
        <span className="font-raleway text-lg/5 font-normal">{classData.name}</span>
        <TooltipWrapper
          message={classData.teacher.full_name}
          disabled={!classData.teacher.full_name}>
          <span className="font-raleway pt-px text-sm font-normal">{classData.teacher.name}</span>
        </TooltipWrapper>
      </div>
      <div className="flex h-3/5 flex-col items-center justify-evenly">
        <span className="font-raleway text-lg font-normal">
          {getRussianLocationTypeName(classData.location.type)}
        </span>
        <TooltipWrapper
          message={getIrlLocationTooltipMessage(classData.location.name)}
          disabled={classData.location.name.length !== 5}>
          <span className="font-raleway text-lg font-bold">{classData.location.name}</span>
        </TooltipWrapper>
      </div>
    </div>
  )
}

interface IconsSectionProps {
  weekType: WeekType
  subgroup: Subgroup
}

const IconsSection: FC<IconsSectionProps> = ({ weekType, subgroup }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-4">
      {(weekType !== "every" || subgroup !== "none") && (
        <Dot sizeClass={"w-1 h-1"} colorClass={"bg-black"} />
      )}
      {weekType === "even" && (
        <>
          <TooltipWrapper message="Четная неделя">
            <EvenWeek width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {weekType === "odd" && (
        <>
          <TooltipWrapper message="Нечетная неделя">
            <OddWeek width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {subgroup === "first" && (
        <>
          <TooltipWrapper message="Первая подгруппа">
            <FirstGroup width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
      {subgroup === "second" && (
        <>
          <TooltipWrapper message="Вторая подгруппа">
            <SecondGroup width="25px" height="25px" />
          </TooltipWrapper>
        </>
      )}
    </div>
  )
}
