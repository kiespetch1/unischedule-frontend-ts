import { cloneElement, FC, JSX, useState } from "react"

export interface ToggleProps {
  labelText: string
  firstIcon: JSX.Element
  secondIcon: JSX.Element
  firstText: string
  secondText: string
  setOppositeOption: () => void
}

export const Toggle: FC<ToggleProps> = ({
  labelText,
  firstIcon,
  secondIcon,
  firstText,
  secondText,
  setOppositeOption
}) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
    setOppositeOption()
  }

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="font-raleway text-base font-normal">{labelText}</div>
      <div className="toggle-outer border-iateblue box-border flex h-[47px] w-[316px] flex-row items-center justify-between rounded-[40px] border-2 bg-zinc-100 pl-[3px] pr-[3px]">
        <div className="w-0 overflow-visible">
          <div className={isToggled ? "switch-inner-toggled" : "switch-inner-untoggled"}></div>
        </div>
        <button className="toggle-inner z-20 flex h-[37px] w-[157px] cursor-pointer items-center justify-center space-x-3 rounded-[40px] transition duration-150 dark:bg-zinc-100" onClick={() => handleToggle()}>
          <span className={isToggled ? "animate-disable" : undefined}>
            {cloneElement(firstIcon, { width: "20px", height: "20px" })}
          </span>
          <span className="font-raleway text-lg text-neutral-900">{firstText}</span>
        </button>
        <button className="toggle-inner z-20 flex h-[37px] w-[157px] cursor-pointer items-center justify-center space-x-3 rounded-[40px] transition duration-150 dark:bg-zinc-100" onClick={() => handleToggle()}>
          <span className={isToggled ? undefined : "animate-disable"}>
            {cloneElement(secondIcon, { width: "20px", height: "20px" })}
          </span>
          <span className="font-raleway text-lg text-neutral-900">{secondText}</span>
        </button>
      </div>
    </div>
  )
}
