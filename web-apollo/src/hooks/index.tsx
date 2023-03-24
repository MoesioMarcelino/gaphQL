import React, { ReactNode } from 'react'

import { BookProvider } from './books'

type Props = { children: ReactNode }

export function AppProvider({ children }: Props) {
  return <BookProvider>{children}</BookProvider>
}
