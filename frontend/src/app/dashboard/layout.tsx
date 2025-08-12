"use client"

import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isLoading, isAuthenticated, router])

  // Enquanto está carregando, não exibe nada
  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✂️</div>
          <h2>Carregando...</h2>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado e não estiver carregando, não renderiza nada
  // Isso evita um flash de conteúdo antes do redirecionamento
  if (!isAuthenticated) {
    return null
  }

  // Se estiver autenticado, renderiza o conteúdo
  return <>{children}</>
}
