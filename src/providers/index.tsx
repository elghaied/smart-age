import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ToastProvider } from './Toast'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
