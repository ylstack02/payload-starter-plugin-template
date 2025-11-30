'use client'

import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface RouteGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function RouteGuard({ children, fallback }: RouteGuardProps) {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify', {
          credentials: 'include',
        })

        if (!response.ok) {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  return <>{children || fallback}</>
}
