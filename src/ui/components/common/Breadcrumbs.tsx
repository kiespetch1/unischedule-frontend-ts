import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/basic/breadcrumb.tsx"
import { Fragment, ReactNode } from "react"

export interface BreadcrumbLevel {
  title: ReactNode
  onClick?: () => void
}

interface BreadcrumbsProps {
  levels: BreadcrumbLevel[]
  visibleCount?: number
}

/**
 * Компонент для упрощенного отображения крошек.
 * Передается полный список уровней, при необходимости можно
 * ограничить количество отображаемых уровней через `visibleCount`.
 * Показываются первые уровни в переданном порядке,
 * при этом последний отображаемый уровень некликабельный.
 */
export function Breadcrumbs({ levels, visibleCount = levels.length }: BreadcrumbsProps) {
  const shown = levels.slice(0, visibleCount)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {shown.map((level, index) => {
          const isLast = index === shown.length - 1
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{level.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink onClick={level.onClick}>{level.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {isLast ? null : <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
