"use client"

import { Button, Card } from '@/components/ui'
import { useAuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewAppointmentPage() {
  const router = useRouter()
  const { user } = useAuthContext()
  
  // Estados para o formulário
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedBarber, setSelectedBarber] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [aiRecommendation, setAiRecommendation] = useState<any>(null)
  const [showAiRecommendation, setShowAiRecommendation] = useState(false)
  
  // Dados mockados para os selects
  const services = [
    { id: '1', name: 'Corte de Cabelo', price: 50, duration: '30min' },
    { id: '2', name: 'Barba', price: 30, duration: '20min' },
    { id: '3', name: 'Corte e Barba', price: 70, duration: '45min' },
    { id: '4', name: 'Corte Degradê', price: 55, duration: '35min' },
    { id: '5', name: 'Coloração', price: 80, duration: '60min' },
  ]
  
  const barbers = [
    { id: '1', name: 'André Silva', rating: 4.9, speciality: 'Degradê' },
    { id: '2', name: 'Bruno Oliveira', rating: 4.8, speciality: 'Barba' },
    { id: '3', name: 'Carlos Mendes', rating: 4.7, speciality: 'Coloração' },
    { id: '4', name: 'Daniel Santos', rating: 4.9, speciality: 'Cortes Clássicos' },
  ]
  
  // Horários disponíveis com base na data selecionada
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]
  
  // Função para gerar uma recomendação da IA
  const getAiRecommendation = () => {
    setLoading(true)
    // Simulando uma chamada para a API de IA
    setTimeout(() => {
      setAiRecommendation({
        recommendedDate: '2025-08-15',
        recommendedTime: '14:30',
        recommendedBarber: '1', // ID do André Silva
        reason: 'Com base no seu histórico, você prefere cortes nas sextas-feiras à tarde. O André tem especialidade em degradê, que combina com seu formato de rosto.',
        waitTime: 'Baixo tempo de espera nesse horário'
      })
      setShowAiRecommendation(true)
      setLoading(false)
    }, 1500)
  }
  
  // Função para aplicar a recomendação da IA
  const applyAiRecommendation = () => {
    if (aiRecommendation) {
      setSelectedDate(aiRecommendation.recommendedDate)
      setSelectedTime(aiRecommendation.recommendedTime)
      setSelectedBarber(aiRecommendation.recommendedBarber)
      setShowAiRecommendation(false)
      setStep(2)
    }
  }
  
  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (step === 1 && selectedService) {
      setStep(2)
    } else if (step === 2 && selectedDate && selectedTime && selectedBarber) {
      // Simulando o envio do formulário
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setStep(3)
      }, 1000)
    }
  }
  
  // Função para voltar à etapa anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }
  
  // Função para finalizar o agendamento
  const finishAppointment = () => {
    router.push('/dashboard/client')
  }
  
  // Encontre o serviço e barbeiro selecionados (para exibir detalhes)
  const selectedServiceObj = services.find(s => s.id === selectedService)
  const selectedBarberObj = barbers.find(b => b.id === selectedBarber)

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
            Novo Agendamento
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>
            Agende seu próximo corte com assistência de IA
          </p>
        </div>

        {/* Indicador de progresso */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            maxWidth: '600px',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: step >= 1 ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                color: step >= 1 ? '#000' : '#fff',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: step >= 1 ? '#d4af37' : '#b0b0b0' 
              }}>
                Serviço
              </div>
            </div>

            <div style={{ 
              flex: 1, 
              height: '2px', 
              backgroundColor: step >= 2 ? '#d4af37' : 'rgba(255, 255, 255, 0.1)' 
            }}></div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: step >= 2 ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                color: step >= 2 ? '#000' : '#fff',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: step >= 2 ? '#d4af37' : '#b0b0b0' 
              }}>
                Data e Barbeiro
              </div>
            </div>

            <div style={{ 
              flex: 1, 
              height: '2px', 
              backgroundColor: step >= 3 ? '#d4af37' : 'rgba(255, 255, 255, 0.1)' 
            }}></div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: step >= 3 ? '#d4af37' : 'rgba(255, 255, 255, 0.1)',
                color: step >= 3 ? '#000' : '#fff',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: step >= 3 ? '#d4af37' : '#b0b0b0' 
              }}>
                Confirmação
              </div>
            </div>
          </div>
        </div>

        {/* Etapa 1: Seleção de Serviço */}
        {step === 1 && (
          <Card className="p-6">
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Escolha o Serviço
              </h3>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    style={{ 
                      padding: '1.5rem', 
                      borderRadius: '0.5rem', 
                      border: `2px solid ${selectedService === service.id ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'}`,
                      cursor: 'pointer',
                      backgroundColor: selectedService === service.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{service.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b0b0b0', fontSize: '0.9rem' }}>
                      <span>R$ {service.price.toFixed(2)}</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <Button 
                  variant="secondary"
                  onClick={() => getAiRecommendation()}
                  disabled={loading}
                >
                  {loading ? 'Analisando...' : '🤖 Sugestão IA'}
                </Button>
                <Button 
                  variant="primary"
                  onClick={nextStep}
                  disabled={!selectedService}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Etapa 2: Seleção de Data, Hora e Barbeiro */}
        {step === 2 && (
          <Card className="p-6">
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Escolha a Data, Horário e Barbeiro
              </h3>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                {/* Coluna 1: Data e Hora */}
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0' }}>
                      Data
                    </label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.25rem',
                        color: 'white',
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0' }}>
                      Horário
                    </label>
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '0.5rem'
                    }}>
                      {availableTimes.map((time) => (
                        <div
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          style={{
                            padding: '0.5rem',
                            textAlign: 'center',
                            borderRadius: '0.25rem',
                            border: `1px solid ${selectedTime === time ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'}`,
                            backgroundColor: selectedTime === time ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                          }}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Seleção de Barbeiro */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#b0b0b0' }}>
                    Barbeiro
                  </label>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1rem'
                  }}>
                    {barbers.map((barber) => (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          border: `1px solid ${selectedBarber === barber.id ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'}`,
                          backgroundColor: selectedBarber === barber.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <div style={{ 
                          width: '50px', 
                          height: '50px', 
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          👤
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{barber.name}</div>
                          <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                            <span>⭐ {barber.rating}</span> • <span>{barber.speciality}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <Button 
                  variant="outline"
                  onClick={prevStep}
                >
                  Voltar
                </Button>
                <Button 
                  variant="primary"
                  onClick={nextStep}
                  disabled={!selectedDate || !selectedTime || !selectedBarber}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Etapa 3: Confirmação */}
        {step === 3 && (
          <Card className="p-6">
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem', color: '#d4af37' }}>✅</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                Agendamento Confirmado!
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                Seu agendamento foi realizado com sucesso.
              </p>

              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  marginBottom: '1rem',
                  color: '#d4af37',
                  textAlign: 'center'
                }}>
                  Detalhes do Agendamento
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Serviço</p>
                    <p>{selectedServiceObj?.name}</p>
                  </div>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Preço</p>
                    <p>R$ {selectedServiceObj?.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Data</p>
                    <p>{new Date(selectedDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Horário</p>
                    <p>{selectedTime}</p>
                  </div>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Duração</p>
                    <p>{selectedServiceObj?.duration}</p>
                  </div>
                  <div>
                    <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Barbeiro</p>
                    <p>{selectedBarberObj?.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ marginBottom: '2rem', color: '#b0b0b0' }}>
                  Você receberá um lembrete por email 1 hora antes do seu agendamento. 
                  Caso precise cancelar, faça com pelo menos 4 horas de antecedência.
                </p>
                <Button 
                  variant="primary"
                  onClick={finishAppointment}
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Modal de Recomendação IA */}
        {showAiRecommendation && (
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
          }}>
            <Card className="p-4 max-w-[500px] w-full">
              <div style={{ padding: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1.5rem',
                  color: '#d4af37',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  <span style={{ fontSize: '2rem' }}>🤖</span>
                  <h3>Recomendação IA</h3>
                </div>

                <p style={{ marginBottom: '1.5rem', color: '#b0b0b0' }}>
                  {aiRecommendation?.reason}
                </p>

                <div style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid #d4af37',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Data Sugerida</p>
                      <p>{new Date(aiRecommendation?.recommendedDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Horário Sugerido</p>
                      <p>{aiRecommendation?.recommendedTime}</p>
                    </div>
                    <div>
                      <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Barbeiro Recomendado</p>
                      <p>{barbers.find(b => b.id === aiRecommendation?.recommendedBarber)?.name}</p>
                    </div>
                    <div>
                      <p style={{ color: '#b0b0b0', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Tempo de Espera</p>
                      <p>{aiRecommendation?.waitTime}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <Button 
                    variant="outline"
                    onClick={() => setShowAiRecommendation(false)}
                    style={{ flex: 1 }}
                  >
                    Ignorar
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={applyAiRecommendation}
                    style={{ flex: 1 }}
                  >
                    Aplicar Sugestão
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
