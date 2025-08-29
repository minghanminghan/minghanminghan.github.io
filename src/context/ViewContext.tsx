'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

export const Views = ['Home', 'Projects', 'Resume'] as const

export type ViewOptions = typeof Views[number]

interface ViewContextType {
  active: ViewOptions
  setActive: (newView: ViewOptions) => void
}

const ViewContext = createContext<ViewContextType | null>(null)

export function ViewProvider ({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ViewOptions>('Home')

  const toggleView = (newView: ViewOptions) => {
    setActive(newView)
  }

  return (
    <ViewContext.Provider value={{ active, setActive }}>
      {children}
    </ViewContext.Provider>
  )
}

export const useViewContext = () => {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error('useView must be used within a ViewProvider')
  }
  return context
}