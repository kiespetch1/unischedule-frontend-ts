import { FC, useEffect, useRef, RefObject } from "react"

interface BlurElementProps {
  isActive?: boolean
  containerRef?: RefObject<HTMLElement>
}

export const BlurElement: FC<BlurElementProps> = ({ isActive = true, containerRef }) => {
  const blurRef = useRef<HTMLDivElement>(null)

  const keyValue = isActive ? "active-blur" : "inactive-blur"

  useEffect(() => {
    if (!isActive || !blurRef.current) return

    const updateElement = () => {
      if (!blurRef.current) return

      const container = containerRef?.current || document.body

      const containerHeight = container.scrollHeight

      if (containerHeight > 196) {
        blurRef.current.style.height = `${containerHeight - 196}px`
      } else {
        blurRef.current.style.height = "100vh"
      }
    }

    updateElement()

    let resizeTimeout: number | null = null
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      resizeTimeout = window.setTimeout(() => {
        updateElement()
      }, 200)
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })

    const targetElement = containerRef?.current || document.body
    resizeObserver.observe(targetElement)

    window.addEventListener("resize", handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
    }
  }, [isActive, containerRef])

  if (!isActive) return null

  return (
    <div
      key={keyValue}
      ref={blurRef}
      className="animate-fade-in-scale-200 absolute left-0 right-0 top-[196px] z-10 bg-[linear-gradient(180deg,rgba(241,241,241,0)_0%,rgba(244,244,244,0.6375)_2.84%,rgba(247,247,247,0.75)_100%)] backdrop-blur-md"
      style={{ height: "100vh" }}
    />
  )
}
