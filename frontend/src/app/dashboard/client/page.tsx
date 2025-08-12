"use client"

import { Button, Card } from '@/components/ui'
import Link from 'next/link'

import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function ClientDashboard() {
  const { user, logout } = useAuthContext()
  const router = useRouter()
  
  // Função para lidar com o logout
  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }
  
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
          <Link href="/" style={{ textDecoration: 'none' }}>
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#b0b0b0' }}>👋 Olá, {user?.profile?.firstName || 'Cliente'}!</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sair</Button>
          </div>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #d4af37, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Painel do Cliente
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Gerencie seus agendamentos e perfil de forma inteligente
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem' 
        }}>
          <Card hover className="p-6">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📅
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Novo Agendamento
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Agende seu próximo corte com IA que sugere o melhor horário
              </p>
              <Button 
                variant="primary" 
                onClick={() => router.push('/dashboard/client/appointments/new')}
              >
                Agendar Agora
              </Button>
            </div>
          </Card>

          <Card hover className="p-6">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                👤
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Meu Perfil
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Atualize suas informações e preferências pessoais
              </p>
              <Button 
                variant="secondary"
                onClick={() => router.push('/dashboard/client/profile')}
              >
                Ver Perfil
              </Button>
            </div>
          </Card>

          <Card hover className="p-6">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📋
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Histórico
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Veja todos os seus agendamentos anteriores
              </p>
              <Button 
                variant="secondary"
                onClick={() => router.push('/dashboard/client/history')}
              >
                Ver Histórico
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Appointments */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            📅 Próximos Agendamentos
          </h3>
          
          <Card className="p-6">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.3' }}>
                📅
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Nenhum agendamento próximo
              </h4>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Que tal agendar seu próximo corte?
              </p>
              <Button 
                variant="primary"
                onClick={() => router.push('/dashboard/client/appointments/new')}
              >
                Fazer Agendamento
              </Button>
            </div>
          </Card>
        </div>

        {/* Payment History */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            💳 Histórico de Pagamentos
          </h3>
          
          <Card className="p-6">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.3' }}>
                💳
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Nenhum pagamento registrado
              </h4>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Seus pagamentos aparecerão aqui após os agendamentos
              </p>
              <Button 
                variant="secondary"
                onClick={() => router.push('/dashboard/client/payments')}
              >
                Ver Detalhes
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            🤖 Recomendações IA
          </h3>
          
          <Card className="p-6">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Melhor Horário
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Terças às 14h têm menos espera
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✂️</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Estilo Recomendado
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Corte degradê combinaria com você
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👑</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Barbeiro Ideal
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  João tem expertise no seu estilo
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
