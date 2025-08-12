"use client"

import { Button, Card } from '@/components/ui'
import { useAuthContext } from '@/context/AuthContext'
import { appointmentService } from '@/services'
import { Appointment, AppointmentStatus } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AppointmentHistoryPage() {
  const router = useRouter()
  const { user } = useAuthContext()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    console.log('useEffect chamado, usuário:', user)
    if (user?.id) {
      loadAppointmentHistory()
    }
  }, [currentPage, user?.id])

  const loadAppointmentHistory = async () => {
    try {
      setLoading(true)
      
      console.log('🚀 Iniciando busca de agendamentos...')
      console.log('👤 Usuário logado:', user)
      
      // Teste 1: Buscar agendamentos deste usuário específico
      const params1 = {
        page: currentPage,
        limit: 10,
        userId: user?.id
      }
      
      console.log('=== TESTE 1: Busca com userId ===')
      console.log('📋 Parâmetros da busca:', params1)
      
      try {
        const response1 = await appointmentService.getAppointments(params1)
        console.log('✅ Resposta com userId (sucesso):', response1)
        console.log('📊 Dados retornados:', response1.data)
        console.log('📈 Meta dados:', response1.meta)
        
        // Usar o resultado do teste 1 (com filtro)
        setAppointments(response1.data)
        setTotalPages(response1.meta.totalPages)
      } catch (err1) {
        console.error('❌ Erro no TESTE 1:', err1)
        throw err1
      }
      
      // Teste 2: Buscar TODOS os agendamentos (sem filtro)
      const params2 = {
        page: 1,
        limit: 20
      }
      
      console.log('=== TESTE 2: Busca SEM filtros ===')
      console.log('📋 Parâmetros da busca:', params2)
      
      try {
        const response2 = await appointmentService.getAppointments(params2)
        console.log('✅ Resposta sem filtros (sucesso):', response2)
        console.log('🌍 Total de agendamentos no sistema:', response2.data.length)
        
        if (response2.data.length > 0) {
          console.log('📝 Exemplo de agendamento:', response2.data[0])
          console.log('👥 Usuários nos agendamentos:', response2.data.map(a => a.users?.map(u => `${u.userId} (${u.user?.profile?.firstName || 'Sem nome'})`)))
          console.log('🆔 Seu ID para comparação:', user?.id)
          
          // Verificar se existe algum agendamento com seu ID
          const meusAgendamentos = response2.data.filter(a => 
            a.users?.some(u => u.userId === user?.id)
          )
          console.log('🔍 Seus agendamentos encontrados na busca geral:', meusAgendamentos)
        } else {
          console.log('📭 Nenhum agendamento encontrado no sistema')
        }
      } catch (err2) {
        console.error('❌ Erro no TESTE 2:', err2)
        // Não quebrar aqui, pois o TESTE 1 pode ter funcionado
      }
      
    } catch (err: any) {
      console.error('💥 Erro geral detalhado:', err)
      console.error('🔍 Tipo do erro:', typeof err)
      console.error('📚 Stack trace:', err.stack)
      console.error('📝 Mensagem do erro:', err.message)
      setError('Erro ao carregar histórico de agendamentos: ' + err.message)
    } finally {
      setLoading(false)
      console.log('🏁 Busca finalizada')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return '#22c55e'
      case AppointmentStatus.CANCELLED:
        return '#ef4444'
      case AppointmentStatus.SCHEDULED:
        return '#3b82f6'
      case AppointmentStatus.CONFIRMED:
        return '#8b5cf6'
      case AppointmentStatus.IN_PROGRESS:
        return '#f59e0b'
      case AppointmentStatus.NO_SHOW:
        return '#6b7280'
      default:
        return '#6b7280'
    }
  }

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return 'Concluído'
      case AppointmentStatus.CANCELLED:
        return 'Cancelado'
      case AppointmentStatus.SCHEDULED:
        return 'Agendado'
      case AppointmentStatus.CONFIRMED:
        return 'Confirmado'
      case AppointmentStatus.IN_PROGRESS:
        return 'Em Andamento'
      case AppointmentStatus.NO_SHOW:
        return 'Não Compareceu'
      default:
        return status
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff'
    }}>
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
            Histórico de Agendamentos
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Visualize todos os seus agendamentos
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            color: '#ff6b6b',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Debug Info */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60a5fa',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          <strong>🔍 Debug Info:</strong><br />
          📋 Usuário ID: {user?.id}<br />
          📊 Total de agendamentos encontrados: {appointments.length}<br />
          📈 Status dos agendamentos: {appointments.map(a => a.status).join(', ') || 'Nenhum'}<br />
          ⏳ Carregando: {loading ? 'Sim' : 'Não'}<br />
          🔄 Página atual: {currentPage}<br />
          📄 Total de páginas: {totalPages}<br />
          <br />
          <strong>💡 Dica:</strong> Abra o Console do navegador (F12) para ver logs detalhados!
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#b0b0b0' }}>Carregando histórico...</p>
          </div>
        ) : appointments.length === 0 ? (
          <Card className="p-6">
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: '0.3' }}>
                📋
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Nenhum agendamento encontrado
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                Você ainda não tem agendamentos. Que tal fazer o seu primeiro corte?
              </p>
              <Button 
                variant="primary"
                onClick={() => router.push('/dashboard/client/appointments/new')}
              >
                Agendar um Corte
              </Button>
            </div>
          </Card>
        ) : (
          <div>
            <div style={{ 
              display: 'grid', 
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
            }}>
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="p-6">
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '15px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    padding: '1.5rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>✂️</span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                          Agendamento #{appointment.id.slice(-6)}
                        </h3>
                      </div>
                      <span style={{
                        background: getStatusColor(appointment.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: '#d4af37', fontWeight: '600', marginBottom: '0.25rem' }}>
                        📅 Data e Hora
                      </p>
                      <p style={{ color: '#ffffff' }}>
                        {formatDate(appointment.scheduledFor)}
                      </p>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: '#d4af37', fontWeight: '600', marginBottom: '0.25rem' }}>
                        👨‍💼 Barbeiro
                      </p>
                      <p style={{ color: '#ffffff' }}>
                        {appointment.barber?.profile?.firstName} {appointment.barber?.profile?.lastName}
                      </p>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: '#d4af37', fontWeight: '600', marginBottom: '0.5rem' }}>
                        💼 Serviços
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {appointment.service?.map((service) => (
                          <span 
                            key={service.id}
                            style={{
                              background: 'rgba(212, 175, 55, 0.2)',
                              color: '#d4af37',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '15px',
                              fontSize: '0.9rem'
                            }}
                          >
                            {service.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: '#d4af37', fontWeight: '600', marginBottom: '0.25rem' }}>
                        💰 Valor Total
                      </p>
                      <p style={{ 
                        color: '#22c55e', 
                        fontSize: '1.2rem', 
                        fontWeight: '700' 
                      }}>
                        {formatCurrency(appointment.totalPrice)}
                      </p>
                    </div>

                    {appointment.notes && (
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ color: '#d4af37', fontWeight: '600', marginBottom: '0.25rem' }}>
                          📝 Observações
                        </p>
                        <p style={{ 
                          color: '#b0b0b0',
                          fontSize: '0.9rem',
                          fontStyle: 'italic'
                        }}>
                          {appointment.notes}
                        </p>
                      </div>
                    )}

                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                      <div style={{ flex: 1 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push('/dashboard/client/appointments/new')}
                        >
                          Agendar Novamente
                        </Button>
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => router.push(`/dashboard/client/appointments/${appointment.id}`)}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '2rem',
                padding: '1rem'
              }}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ← Anterior
                </Button>
                
                <span style={{ color: '#b0b0b0' }}>
                  Página {currentPage} de {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próxima →
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
