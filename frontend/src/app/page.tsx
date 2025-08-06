export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'rgba(0, 0, 0, 0.9)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #d4af37', 
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>✂️</span>
            <h1 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #d4af37, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0 
            }}>
              BarberFlow AI
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a 
              href="/auth/login" 
              style={{ 
                color: '#d4af37', 
                textDecoration: 'none', 
                padding: '0.7rem 1.5rem', 
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '2px solid #d4af37',
                transition: 'all 0.3s ease'
              }}
            >
              Login
            </a>
            <a 
              href="/auth/register" 
              style={{ 
                background: 'linear-gradient(45deg, #d4af37, #ffd700)', 
                color: '#000', 
                textDecoration: 'none', 
                padding: '0.7rem 1.5rem', 
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
              }}
            >
              Começar Agora
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 1rem' }}>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '15rem',
            opacity: '0.05',
            zIndex: 1,
            pointerEvents: 'none'
          }}>
            ✂️
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
              fontWeight: '900', 
              marginBottom: '2rem',
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              <span style={{ 
                background: 'linear-gradient(45deg, #d4af37, #ffd700, #b8860b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>
                BarberFlow AI
              </span>
              <span style={{ 
                color: '#ffffff',
                fontSize: '0.7em',
                display: 'block',
                marginTop: '0.5rem'
              }}>
                O Futuro da Barbearia
              </span>
            </h1>
            
            <p style={{ 
              fontSize: '1.3rem', 
              color: '#b0b0b0', 
              marginBottom: '3rem', 
              maxWidth: '50rem', 
              margin: '0 auto 3rem auto',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              Sistema completo de automação para barbearias modernas com <span style={{ color: '#d4af37' }}>Inteligência Artificial</span>. 
              Gerencie agendamentos, clientes, pagamentos e transforme seu negócio.
            </p>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: '1.5rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/auth/register"
                style={{
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  color: '#000',
                  fontWeight: '700',
                  padding: '1rem 3rem',
                  borderRadius: '30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                🚀 Começar Agora
              </a>
              <a
                href="/auth/login"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontWeight: '600',
                  padding: '1rem 3rem',
                  borderRadius: '30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(212, 175, 55, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                ✂️ Fazer Login
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ marginTop: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #d4af37, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Funcionalidades Exclusivas
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#b0b0b0' }}>
              Tudo que você precisa para dominar o mercado de barbearia
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {/* Feature 1 - Agendamento */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              padding: '2.5rem', 
              borderRadius: '20px', 
              border: '1px solid rgba(212, 175, 55, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  fontSize: '2rem',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
                }}>
                  📅
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#d4af37', 
                  marginBottom: '1rem' 
                }}>
                  Agendamento Inteligente
                </h3>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  IA avançada que otimiza horários, previne cancelamentos e maximiza sua agenda. 
                  <strong style={{ color: '#d4af37' }}>Aumento de 40% na eficiência</strong>.
                </p>
              </div>
            </div>

            {/* Feature 2 - Gestão */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              padding: '2.5rem', 
              borderRadius: '20px', 
              border: '1px solid rgba(212, 175, 55, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  fontSize: '2rem',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
                }}>
                  �
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#d4af37', 
                  marginBottom: '1rem' 
                }}>
                  Gestão VIP de Clientes
                </h3>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  Perfis detalhados, histórico completo e recomendações personalizadas. 
                  <strong style={{ color: '#d4af37' }}>Fidelização garantida</strong>.
                </p>
              </div>
            </div>

            {/* Feature 3 - Analytics */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
              padding: '2.5rem', 
              borderRadius: '20px', 
              border: '1px solid rgba(212, 175, 55, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem auto',
                  fontSize: '2rem',
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
                }}>
                  📊
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#d4af37', 
                  marginBottom: '1rem' 
                }}>
                  Analytics Profissionais
                </h3>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  Dashboards em tempo real, análises preditivas e relatórios avançados. 
                  <strong style={{ color: '#d4af37' }}>Decisões baseadas em dados</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          marginTop: '8rem',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)',
          borderRadius: '30px',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '3rem',
            color: '#d4af37'
          }}>
            🎯 Explore os Painéis
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <a href="/dashboard/client" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#d4af37' }}>
                  Painel do Cliente
                </h3>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Agendamento, perfil, histórico
                </p>
              </div>
            </a>

            <a href="/dashboard/barber" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✂️</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#d4af37' }}>
                  Painel do Barbeiro
                </h3>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Agenda, portfólio, clientes
                </p>
              </div>
            </a>

            <a href="/dashboard/admin" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#d4af37' }}>
                  Painel Admin
                </h3>
                <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Dashboard, gestão, relatórios
                </p>
              </div>
            </a>
          </div>

          <h2 style={{ 
            textAlign: 'center',
            fontSize: '2rem', 
            fontWeight: '800', 
            marginBottom: '3rem',
            color: '#d4af37'
          }}>
            Números que Impressionam
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '3rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37', marginBottom: '0.5rem' }}>
                500+
              </div>
              <div style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>Barbearias Ativas</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37', marginBottom: '0.5rem' }}>
                50K+
              </div>
              <div style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>Agendamentos/Mês</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37', marginBottom: '0.5rem' }}>
                98%
              </div>
              <div style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>Satisfação</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#d4af37', marginBottom: '0.5rem' }}>
                40%
              </div>
              <div style={{ fontSize: '1.2rem', color: '#b0b0b0' }}>Aumento de Receita</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
        padding: '3rem 0', 
        marginTop: '6rem',
        borderTop: '2px solid #d4af37'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          textAlign: 'center' 
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>✂️</span>
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                BarberFlow AI
              </h3>
            </div>
            <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1.1rem' }}>
              © 2024 BarberFlow AI. Revolucionando barbearias com tecnologia de ponta.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <a href="/docs" style={{ 
              color: '#d4af37', 
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>
              📚 Documentação
            </a>
            <a href="/api/docs" style={{ 
              color: '#d4af37', 
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              ⚡ API
            </a>
            <a href="/health" style={{ 
              color: '#d4af37', 
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              💚 Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}