"use client"

import { Button, Card } from '@/components/ui'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaymentsPage() {
  const router = useRouter()
  const { user } = useAuthContext()

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
            Histórico de Pagamentos
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Visualize todos os seus pagamentos e recibos
          </p>
        </div>

        <Card className="p-6">
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.3' }}>
              💳
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Nenhum pagamento registrado
            </h3>
            <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
              Seus pagamentos aparecerão aqui após a conclusão dos serviços
            </p>
            <Button 
              variant="primary"
              onClick={() => router.push('/dashboard/client/appointments/new')}
            >
              Agendar um Corte
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
