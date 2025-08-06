"use client"

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        fontSize: '20rem',
        opacity: '0.03',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        💎
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        fontSize: '15rem',
        opacity: '0.03',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        ⚡
      </div>

      {/* Register Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        border: '2px solid rgba(212, 175, 55, 0.3)',
        padding: '3rem',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>✂️</span>
              <h1 style={{ 
                fontSize: '2rem', 
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
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '700', 
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Junte-se à Elite!
          </h2>
          <p style={{ color: '#b0b0b0', fontSize: '1.1rem' }}>
            Crie sua conta e revolucione seu negócio
          </p>
        </div>

        {/* Form */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Name Field */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#d4af37',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              👤 Nome Completo
            </label>
            <input
              type="text"
              placeholder="João Silva"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                outline: 'none'
              }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#d4af37',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              📧 E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                outline: 'none'
              }}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#d4af37',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              📱 Telefone
            </label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                outline: 'none'
              }}
            />
          </div>

          {/* Password Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#d4af37',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                🔐 Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#d4af37',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                🔄 Confirmar
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#d4af37',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              💼 Tipo de Negócio
            </label>
            <select
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '15px',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                outline: 'none'
              }}
            >
              <option style={{ background: '#1a1a2e', color: '#ffffff' }} value="">Selecione...</option>
              <option style={{ background: '#1a1a2e', color: '#ffffff' }} value="barbershop">🔥 Barbearia Premium</option>
              <option style={{ background: '#1a1a2e', color: '#ffffff' }} value="salon">💅 Salão de Beleza</option>
              <option style={{ background: '#1a1a2e', color: '#ffffff' }} value="independent">🚀 Profissional Autônomo</option>
              <option style={{ background: '#1a1a2e', color: '#ffffff' }} value="franchise">🏆 Franquia</option>
            </select>
          </div>

          {/* Terms & Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b0b0b0', fontSize: '0.9rem' }}>
              <input type="checkbox" required />
              Concordo com os <a href="#" style={{ color: '#d4af37' }}>Termos de Uso</a> e <a href="#" style={{ color: '#d4af37' }}>Política de Privacidade</a>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b0b0b0', fontSize: '0.9rem' }}>
              <input type="checkbox" />
              Quero receber dicas e novidades por e-mail
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(45deg, #d4af37, #ffd700)',
              color: '#000',
              fontWeight: '700',
              padding: '1rem 2rem',
              borderRadius: '20px',
              fontSize: '1.1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s ease',
              marginTop: '1rem'
            }}
          >
            🚀 Criar Conta Premium
          </button>

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            margin: '1rem 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212, 175, 55, 0.3)' }}></div>
            <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212, 175, 55, 0.3)' }}></div>
          </div>

          {/* Social Registration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              type="button"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontWeight: '600',
                padding: '0.8rem',
                borderRadius: '15px',
                fontSize: '0.9rem',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              🔥 Google
            </button>
            <button
              type="button"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontWeight: '600',
                padding: '0.8rem',
                borderRadius: '15px',
                fontSize: '0.9rem',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              📱 Apple
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1.5rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>
            Já tem uma conta?
          </p>
          <Link
            href="/auth/login"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#d4af37',
              fontWeight: '600',
              padding: '0.8rem 2rem',
              borderRadius: '20px',
              fontSize: '1rem',
              textDecoration: 'none',
              border: '2px solid rgba(212, 175, 55, 0.5)',
              backdropFilter: 'blur(10px)',
              display: 'inline-block'
            }}
          >
            🔑 Fazer Login
          </Link>
        </div>
      </div>
    </div>
  )
}
