import React from "react"

interface DotProps {
  colorClass?: string
  sizeClass?: string
  className?: string
}

const Dot: React.FC<DotProps> = ({
  colorClass = "bg-neutral-500",
  sizeClass = "w-1 h-1",
  className = "",
}) => {
  return <span className={`${colorClass} ${sizeClass} rounded-full inline-block ${className}`} />
}

export default Dot
