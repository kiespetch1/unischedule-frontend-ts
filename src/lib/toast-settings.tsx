import Info from "@assets/info.svg?react"

export const getWarningToastSettings = () => {
  return {
    icon: (
      <>
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-yellow-300">
          <Info color="#fff" />
        </div>
      </>
    ),
  }
}
