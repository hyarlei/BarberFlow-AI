"use client"

import { Button, Card } from '@/components/ui'
import Link from 'next/link'

export default function BarberDashboard() {
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
            <span style={{ color: '#b0b0b0' }}>✂️ Olá, Barbeiro!</span>
            <Link href="/auth/login" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">Sair</Button>
            </Link>
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
            Painel do Barbeiro
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Gerencie sua agenda e clientes com inteligência artificial
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem' 
        }}>
          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d4af37' }}>8</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Agendamentos Hoje</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d4af37' }}>R$ 1.240</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Faturamento Hoje</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d4af37' }}>4.9</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Avaliação Média</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
              <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d4af37' }}>156</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Total Clientes</p>
            </div>
          </Card>
        </div>

        {/* Main Actions */}
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
                Minha Agenda
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Visualize e gerencie todos os seus agendamentos
              </p>
              <Button variant="primary">Ver Agenda</Button>
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
                🎨
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Meu Portfólio
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Gerencie fotos dos seus trabalhos e especializações
              </p>
              <Button variant="secondary">Editar Portfólio</Button>
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
                👥
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Histórico de Clientes
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Acesse o histórico completo dos seus clientes
              </p>
              <Button variant="secondary">Ver Clientes</Button>
            </div>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            📅 Agenda de Hoje
          </h3>
          
          <Card className="p-6">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Appointment Item */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(212, 175, 55, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>
                    JM
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.2rem' }}>João Martins</h4>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Corte + Barba</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#d4af37' }}>09:00</p>
                  <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>R$ 45,00</p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(212, 175, 55, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>
                    PS
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Pedro Silva</h4>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Corte Social</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#d4af37' }}>10:30</p>
                  <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>R$ 30,00</p>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Button variant="secondary">Ver Agenda Completa</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            🤖 Insights da IA
          </h3>
          
          <Card className="p-6">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Tendência de Crescimento
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  +15% de agendamentos esta semana
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏰</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Horário Peak
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Sábados 14h-17h são mais movimentados
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Serviço Popular
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  "Corte + Barba" é o mais solicitado
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
