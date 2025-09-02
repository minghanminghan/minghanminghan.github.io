'use client'

import { createContext, useState, useContext, ReactNode } from 'react'
import { routeOptions } from '@/constants/routes'

interface ViewContextType {
  active: routeOptions
  setActive: (newView: routeOptions) => void
}

const ViewContext = createContext<ViewContextType | null>(null)

export function ViewProvider ({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<routeOptions>('Home')

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