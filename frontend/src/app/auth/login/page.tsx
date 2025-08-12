"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuthContext()
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const result = await login(email, password)
      
      if (result.success) {
        router.push('/dashboard')
      } else {
        setErrorMessage(result.error || 'Falha ao fazer login. Verifique suas credenciais.')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        left: '10%',
        fontSize: '20rem',
        opacity: '0.03',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        ✂️
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        fontSize: '15rem',
        opacity: '0.03',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        👑
      </div>

      {/* Login Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        border: '2px solid rgba(212, 175, 55, 0.3)',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
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
            Bem-vindo de volta!
          </h2>
          <p style={{ color: '#b0b0b0', fontSize: '1.1rem' }}>
            Entre na sua conta e domine o mercado
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            color: '#ff6b6b',
            padding: '0.8rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

          {/* Password Field */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          {/* Remember & Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b0b0b0' }}>
              <input type="checkbox" />
              Lembrar de mim
            </label>
            <a href="#" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.9rem' }}>
              Esqueceu a senha?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting 
                ? 'rgba(212, 175, 55, 0.7)' 
                : 'linear-gradient(45deg, #d4af37, #ffd700)',
              color: '#000',
              fontWeight: '700',
              padding: '1rem 2rem',
              borderRadius: '20px',
              fontSize: '1.1rem',
              border: 'none',
              cursor: isSubmitting ? 'default' : 'pointer',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isSubmitting ? 'Entrando...' : '🚀 Entrar na Conta'}
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

          {/* Social Login */}
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

        {/* Sign Up Link */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1.5rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>
            Ainda não tem uma conta?
          </p>
          <Link
            href="/auth/register"
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
            ✨ Criar Conta Grátis
          </Link>
        </div>
      </div>
    </div>
  )
}
