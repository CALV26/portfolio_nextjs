"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * A ThemeProvider component that wraps its children with the NextThemesProvider
 * to provide theme-related functionality.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the provider.
 * @returns {JSX.Element} The NextThemesProvider component wrapping the children.
 */
export function ThemeProvider({
  children,
  ...props
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}