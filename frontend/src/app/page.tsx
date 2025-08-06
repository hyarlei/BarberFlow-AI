import { CalendarIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
              <span className="text-gradient">BarberFlow AI</span>
              <br />
              O Futuro da Barbearia
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo de automação para barbearias modernas com Inteligência Artificial.
              Gerencie agendamentos, clientes, pagamentos e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="btn-primary text-lg px-8 py-3"
              >
                Começar Agora
              </Link>
              <Link
                href="/auth/login"
                className="btn-secondary text-lg px-8 py-3"
              >
                Fazer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para modernizar sua barbearia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Agendamento Inteligente
              </h3>
              <p className="text-gray-600">
                Sistema de agendamento com IA que otimiza horários e reduz cancelamentos.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Gestão de Clientes
              </h3>
              <p className="text-gray-600">
                Perfis completos, histórico de serviços e recomendações personalizadas.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChartBarIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Analytics & Relatórios
              </h3>
              <p className="text-gray-600">
                Dashboards com métricas de negócio e análises preditivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-heading font-bold mb-4">BarberFlow AI</h3>
          <p className="text-gray-400 mb-6">
            © 2024 BarberFlow AI. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
              Documentação
            </Link>
            <Link href="/api/docs" className="text-gray-400 hover:text-white transition-colors">
              API
            </Link>
            <Link href="/health" className="text-gray-400 hover:text-white transition-colors">
              Status
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
