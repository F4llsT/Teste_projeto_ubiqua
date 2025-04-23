import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecycleIcon, BarChart3Icon, BookOpen, FileText } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Projeto Ser Recicla</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma iniciativa para a COP 30 em Belém que une educação, tecnologia e responsabilidade ambiental.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RecycleIcon className="h-5 w-5 mr-2 text-green-600" />
                Registrar Entregas
              </CardTitle>
              <CardDescription>Registre as entregas de resíduos recicláveis feitas pelos alunos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Registre facilmente a quantidade e tipo de resíduos entregues por turma, curso e unidade.
              </p>
              <Link href="/registro">
                <Button className="w-full bg-green-600 hover:bg-green-700">Acessar Formulário</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3Icon className="h-5 w-5 mr-2 text-green-600" />
                Dashboard
              </CardTitle>
              <CardDescription>Visualize os dados de reciclagem em tempo real.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Acompanhe o progresso das turmas, compare unidades e visualize metas atingidas.</p>
              <Link href="/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">Ver Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                Sobre Reciclagem
              </CardTitle>
              <CardDescription>Aprenda sobre os benefícios da reciclagem.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Conheça os tipos de resíduos recicláveis e os benefícios da reciclagem para o meio ambiente.
              </p>
              <Link href="/sobre-reciclagem">
                <Button className="w-full bg-green-600 hover:bg-green-700">Saiba Mais</Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Documentação da API
              </CardTitle>
              <CardDescription>Integre outros sistemas com nossa plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Acesse a documentação completa da nossa API RESTful para integrar outros sistemas com a plataforma Ser
                Recicla.
              </p>
              <Link href="/api-docs">
                <Button className="w-full bg-green-600 hover:bg-green-700">Ver Documentação</Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
          <p className="mb-4">
            O projeto Ser Recicla é uma iniciativa que visa fomentar a participação das turmas da Unama na entrega de
            materiais recicláveis — como alumínio, vidro, pano e PET — por meio de um sistema digital que incentive e
            registre essas ações de forma transparente, funcional e escalável.
          </p>
          <p>
            Em 2025, Belém será sede da COP 30 (Conferência das Partes da ONU sobre o Clima), colocando nossa cidade e
            instituição no centro das atenções globais sobre mudanças climáticas, exigindo ações concretas e inovadoras
            em prol da sustentabilidade.
          </p>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Projeto Ser Recicla - Unama</p>
          <p className="text-sm mt-2">Desenvolvido para a Semana Ubíqua</p>
        </div>
      </footer>
    </div>
  )
}
