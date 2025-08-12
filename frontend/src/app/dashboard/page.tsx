"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthContext()

  useEffect(() => {
    // Aguarda o carregamento das informações de autenticação
    if (!isLoading) {
      if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para o login
        router.push('/auth/login')
      } else {
        // Redireciona com base no papel do usuário
        if (user?.role === 'CLIENT') {
          router.push('/dashboard/client')
        } else if (user?.role === 'BARBER') {
          router.push('/dashboard/barber')
        } else if (user?.role === 'ADMIN') {
          router.push('/dashboard/admin')
        } else {
          // Caso o papel não seja reconhecido, redireciona para a página inicial
          router.push('/')
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  // Enquanto estiver carregando, exibe um indicador de carregamento
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✂️</div>
      <h1 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        background: 'linear-gradient(45deg, #d4af37, #ffd700)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem'
      }}>
        BarberFlow AI
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}>
        <div style={{
          border: '3px solid #d4af37',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ marginTop: '1rem', color: '#b0b0b0' }}>Redirecionando para o seu dashboard...</p>
      </div>
    </div>
  )
}
