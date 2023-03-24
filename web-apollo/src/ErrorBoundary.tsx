import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const fallbackRender = ({ resetErrorBoundary }: FallbackProps) => {
    resetErrorBoundary()
    return <h2>Something wrong happened!</h2>
  }

  const onErrorCallback = (error: Error, info: { componentStack: string }) => {
    console.error({ component: info.componentStack, error })
  }

  return (
    <ReactErrorBoundary onError={onErrorCallback} fallbackRender={fallbackRender}>
      {children}
    </ReactErrorBoundary>
  )
}
