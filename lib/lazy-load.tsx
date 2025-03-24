"use client"

import type React from "react"

import { Suspense, lazy } from "react"

type ComponentType<P = any> = React.ComponentType<P>

export function lazyLoad<T extends ComponentType>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <div className="min-h-[200px] w-full animate-pulse rounded-md bg-muted" />,
) {
  const LazyComponent = lazy(importFunc)

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

