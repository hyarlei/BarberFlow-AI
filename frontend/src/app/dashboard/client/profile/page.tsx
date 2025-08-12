"use client"

import { Button, Card } from '@/components/ui'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ClientProfilePage() {
  const { user } = useAuthContext()
  const router = useRouter()

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '1rem 2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/dashboard/client" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>✂️</span>
              <h1 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0 
              }}>
                BarberFlow AI
              </h1>
            </div>
          </Link>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/dashboard/client')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #d4af37, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Meu Perfil
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <Card className="p-6">
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                👤
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h3>
              <p style={{ color: '#b0b0b0' }}>{user?.email}</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#d4af37'
              }}>
                Informações Pessoais
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Nome</p>
                  <p>{user?.profile?.firstName} {user?.profile?.lastName}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>E-mail</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Telefone</p>
                  <p>{user?.profile?.phone || 'Não informado'}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Data de Nascimento</p>
                  <p>{user?.profile?.birthDate || 'Não informada'}</p>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#d4af37'
              }}>
                Endereço
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Endereço</p>
                  <p>{user?.profile?.address || 'Não informado'}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Cidade</p>
                  <p>{user?.profile?.city || 'Não informada'}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>Estado</p>
                  <p>{user?.profile?.state || 'Não informado'}</p>
                </div>
                <div>
                  <p style={{ color: '#b0b0b0', marginBottom: '0.5rem' }}>CEP</p>
                  <p>{user?.profile?.zipCode || 'Não informado'}</p>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button 
                variant="primary"
                onClick={() => router.push('/dashboard/client/profile/edit')}
              >
                Editar Perfil
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
