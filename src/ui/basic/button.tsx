import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils.ts"

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "block"
  | "blockSm"

export type ButtonSize =
  | "default"
  | "thin"
  | "thinner"
  | "thinCircle"
  | "thinOval"
  | "sm"
  | "lg"
  | "icon"
  | "collapsed"

export type ButtonTextStyle = "italic" | "bold" | "semibold" | "default"

const buttonVariantSchema: {
  variant: Record<ButtonVariant, string>
  size: Record<ButtonSize, string>
  textStyle: Record<ButtonTextStyle, string>
} = {
  variant: {
    default: "bg-iateblue text-primary-foreground shadow-xs hover:bg-iateblue/90",
    destructive:
      "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline:
      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    link: "text-primary underline-offset-4 hover:underline",
    block: "bg-zinc-150 shadow-xs hover:bg-zinc-200 !text-wrap [&_svg]:!w-[26px] [&_svg]:!h-[26px]",
    blockSm:
      "bg-zinc-150 shadow-xs hover:bg-zinc-200 !text-wrap [&_svg]:!w-[19px] [&_svg]:!h-[19px]",
  },
  size: {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    thin: "h-9 px-2 py-1 has-[>svg]:px-3",
    thinner: "h-9 px-2 py-1 has-[>svg]:px-3 [&_svg]:!w-[12px] [&_svg]:!h-[12px] gap-px",
    thinCircle: "h-9 w-9 p-1 [&_svg]:!w-[24px] [&_svg]:!h-[24px]",
    thinOval: "h-9 w-18 p-1 [&_svg]:!w-[24px] [&_svg]:!h-[24px]",
    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
    icon: "size-9",
    collapsed: "h-[6px]",
  },
  textStyle: {
    italic: "italic",
    bold: "font-bold",
    semibold: "font-semibold",
    default: "font-normal",
  },
} as const

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 cursor-pointer disabled:pointer-default disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: buttonVariantSchema,
    defaultVariants: { variant: "default", size: "default", textStyle: "default" },
  }
)

export type ButtonCvaProps = VariantProps<typeof buttonVariants>

export interface ButtonVariants extends ButtonCvaProps {
  variant?: ButtonVariant
  size?: ButtonSize
  textStyle?: ButtonTextStyle
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn("font-raleway", buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
