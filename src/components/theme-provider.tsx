"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type NextThemesProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = false,
  disableTransitionOnChange = false,
  ...props
}: NextThemesProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}