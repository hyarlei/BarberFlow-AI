"use client"

import { Button, Card } from '@/components/ui'
import Link from 'next/link'

export default function AdminDashboard() {
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
            <span style={{ color: '#b0b0b0' }}>👑 Admin Dashboard</span>
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
            Dashboard Administrativo
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Controle total da sua barbearia com análises em tempo real
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem' 
        }}>
          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#d4af37' }}>R$ 12.450</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Faturamento Mensal</p>
              <p style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.3rem' }}>+18% vs mês anterior</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
              <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#d4af37' }}>324</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Agendamentos/Mês</p>
              <p style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.3rem' }}>+12% vs mês anterior</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
              <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#d4af37' }}>1.247</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Total de Clientes</p>
              <p style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.3rem' }}>+8% novos clientes</p>
            </div>
          </Card>

          <Card className="p-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <h4 style={{ fontSize: '2rem', fontWeight: '700', color: '#d4af37' }}>4.8</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Satisfação Média</p>
              <p style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.3rem' }}>+0.3 vs mês anterior</p>
            </div>
          </Card>
        </div>

        {/* Management Sections */}
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
                📊
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Dashboard Analytics
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Relatórios detalhados de vendas, clientes e performance
              </p>
              <Button variant="primary">Ver Relatórios</Button>
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
                Gestão de Usuários
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Gerencie barbeiros, clientes e permissões
              </p>
              <Button variant="secondary">Gerenciar Usuários</Button>
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
                💳
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                PDV & Financeiro
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem' }}>
                Ponto de venda e controle financeiro completo
              </p>
              <Button variant="primary">Abrir PDV</Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            📈 Atividade Recente
          </h3>
          
          <Card className="p-6">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  <div style={{ fontSize: '1.5rem' }}>💰</div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Pagamento Recebido</h4>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>João Martins - Corte + Barba</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#22c55e' }}>+R$ 45,00</p>
                  <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>há 5 min</p>
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
                  <div style={{ fontSize: '1.5rem' }}>📅</div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Novo Agendamento</h4>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Maria Silva agendou para amanhã 14h</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#d4af37' }}>R$ 35,00</p>
                  <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>há 12 min</p>
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
                  <div style={{ fontSize: '1.5rem' }}>⭐</div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Nova Avaliação</h4>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Pedro Santos deu 5 estrelas</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#fbbf24' }}>⭐⭐⭐⭐⭐</p>
                  <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>há 25 min</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI & Analytics Insights */}
        <div>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#d4af37' 
          }}>
            🤖 Insights Inteligentes
          </h3>
          
          <Card className="p-6">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Oportunidade de Crescimento
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Expandir horários das 18h-20h pode gerar +R$ 2.500/mês
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Marketing Recomendado
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Campanha para clientes inativos pode recuperar 23%
                </p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Previsão de Demanda
                </h4>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Final de semana será 40% mais movimentado
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
