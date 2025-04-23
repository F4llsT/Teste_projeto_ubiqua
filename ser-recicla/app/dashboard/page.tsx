"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { RecycleIcon, ArrowLeft, Download, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

type Entrega = {
  id: string
  quantidade: number
  tipo: string
  turma: string
  curso: string
  semestre: string
  turno: string
  unidade: string
  createdAt: string
  userId?: string
  user?: {
    id: string
    name: string
    email: string
  }
}

type User = {
  id: string
  name: string
  email: string
}

type DadosAgrupados = {
  porTipo: Record<string, number>
  porUnidade: Record<string, number>
  porTurma: Record<string, number>
  porCurso: Record<string, number>
  evolucaoSemanal: Record<string, number>
  evolucaoMensal: Record<string, number>
}

const tiposResiduos = {
  aluminio: "Alumínio",
  vidro: "Vidro",
  pano: "Pano",
  pet: "PET",
}

const unidades = {
  alcindo_cacela: "Unama Alcindo Cacela",
  ananindeua: "Unama Ananindeua",
  parque_shopping: "Unama Parque Shopping",
  santarem: "Unama Santarém",
  maraba: "Unama Marabá",
}

const cores = [
  "rgba(75, 192, 192, 0.6)",
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(255, 206, 86, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
]

export default function DashboardPage() {
  const router = useRouter()
  const [entregas, setEntregas] = useState<Entrega[]>([])
  const [dadosAgrupados, setDadosAgrupados] = useState<DadosAgrupados>({
    porTipo: {},
    porUnidade: {},
    porTurma: {},
    porCurso: {},
    evolucaoSemanal: {},
    evolucaoMensal: {},
  })
  const [filtroUnidade, setFiltroUnidade] = useState<string>("todas")
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [isLoading, setIsLoading] = useState(true)
  const [totalReciclado, setTotalReciclado] = useState(0)
  const [metaAtingida, setMetaAtingida] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  const META_TOTAL = 1000 // Meta em kg

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/entregas")
        if (!response.ok) {
          throw new Error("Erro ao buscar dados")
        }
        const data = await response.json()
        setEntregas(data)
        processarDados(data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const processarDados = (dados: Entrega[]) => {
    // Filtrar dados conforme seleção
    let dadosFiltrados = [...dados]

    if (filtroUnidade !== "todas") {
      dadosFiltrados = dadosFiltrados.filter((d) => d.unidade === filtroUnidade)
    }

    if (filtroTipo !== "todos") {
      dadosFiltrados = dadosFiltrados.filter((d) => d.tipo === filtroTipo)
    }

    // Agrupar por tipo
    const porTipo: Record<string, number> = {}
    dadosFiltrados.forEach((entrega) => {
      porTipo[entrega.tipo] = (porTipo[entrega.tipo] || 0) + entrega.quantidade
    })

    // Agrupar por unidade
    const porUnidade: Record<string, number> = {}
    dadosFiltrados.forEach((entrega) => {
      porUnidade[entrega.unidade] = (porUnidade[entrega.unidade] || 0) + entrega.quantidade
    })

    // Agrupar por turma
    const porTurma: Record<string, number> = {}
    dadosFiltrados.forEach((entrega) => {
      porTurma[entrega.turma] = (porTurma[entrega.turma] || 0) + entrega.quantidade
    })

    // Agrupar por curso
    const porCurso: Record<string, number> = {}
    dadosFiltrados.forEach((entrega) => {
      porCurso[entrega.curso] = (porCurso[entrega.curso] || 0) + entrega.quantidade
    })

    // Evolução semanal (simulada para demonstração)
    const evolucaoSemanal: Record<string, number> = {
      "Semana 1": 120,
      "Semana 2": 180,
      "Semana 3": 240,
      "Semana 4": 310,
    }

    // Evolução mensal (simulada para demonstração)
    const evolucaoMensal: Record<string, number> = {
      Jan: 300,
      Fev: 450,
      Mar: 600,
      Abr: 750,
      Mai: 900,
    }

    // Calcular total reciclado
    const total = dadosFiltrados.reduce((acc, entrega) => acc + entrega.quantidade, 0)
    setTotalReciclado(total)
    setMetaAtingida((total / META_TOTAL) * 100)

    setDadosAgrupados({
      porTipo,
      porUnidade,
      porTurma,
      porCurso,
      evolucaoSemanal,
      evolucaoMensal,
    })
  }

  useEffect(() => {
    if (entregas.length > 0) {
      processarDados(entregas)
    }
  }, [filtroUnidade, filtroTipo, entregas])

  const dadosGraficoTipos = {
    labels: Object.keys(dadosAgrupados.porTipo).map(
      (tipo) => tiposResiduos[tipo as keyof typeof tiposResiduos] || tipo,
    ),
    datasets: [
      {
        label: "Quantidade (kg)",
        data: Object.values(dadosAgrupados.porTipo),
        backgroundColor: cores,
        borderWidth: 1,
      },
    ],
  }

  const dadosGraficoUnidades = {
    labels: Object.keys(dadosAgrupados.porUnidade).map(
      (unidade) => unidades[unidade as keyof typeof unidades] || unidade,
    ),
    datasets: [
      {
        label: "Quantidade (kg)",
        data: Object.values(dadosAgrupados.porUnidade),
        backgroundColor: cores,
        borderWidth: 1,
      },
    ],
  }

  const dadosGraficoTurmas = {
    labels: Object.keys(dadosAgrupados.porTurma).slice(0, 5), // Limitar a 5 turmas para melhor visualização
    datasets: [
      {
        label: "Quantidade (kg)",
        data: Object.values(dadosAgrupados.porTurma).slice(0, 5),
        backgroundColor: cores,
        borderWidth: 1,
      },
    ],
  }

  const dadosEvolucaoSemanal = {
    labels: Object.keys(dadosAgrupados.evolucaoSemanal),
    datasets: [
      {
        label: "Quantidade (kg)",
        data: Object.values(dadosAgrupados.evolucaoSemanal),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const dadosEvolucaoMensal = {
    labels: Object.keys(dadosAgrupados.evolucaoMensal),
    datasets: [
      {
        label: "Quantidade (kg)",
        data: Object.values(dadosAgrupados.evolucaoMensal),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const exportarDados = () => {
    const csvContent = [
      ["ID", "Quantidade (kg)", "Tipo", "Turma", "Curso", "Semestre", "Turno", "Unidade", "Data", "Usuário"],
      ...entregas.map((e) => [
        e.id,
        e.quantidade,
        tiposResiduos[e.tipo as keyof typeof tiposResiduos] || e.tipo,
        e.turma,
        e.curso,
        e.semestre,
        e.turno,
        unidades[e.unidade as keyof typeof unidades] || e.unidade,
        new Date(e.createdAt).toLocaleDateString(),
        e.user?.name || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "dados_reciclagem.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-green-600 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <RecycleIcon className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Ser Recicla</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Carregando dashboard...</h2>
            <p>Aguarde enquanto carregamos os dados.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <RecycleIcon className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Ser Recicla</h1>
            </div>
            <nav className="flex gap-4">
              <Link href="/">
                <Button variant="outline" className="text-white border-white hover:bg-green-700">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              </Link>
              <Button variant="outline" className="text-white border-white hover:bg-green-700" onClick={exportarDados}>
                <Download className="mr-2 h-4 w-4" /> Exportar Dados
              </Button>
              {user && (
                <Button variant="outline" className="text-white border-white hover:bg-green-700" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {user && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium mb-2">Bem-vindo(a), {user.name}</h3>
            <p>Você está logado como {user.email}</p>
          </div>
        )}

        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Dashboard de Reciclagem</h2>
            <p className="text-gray-600">Visualize os dados de reciclagem em tempo real.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <Select value={filtroUnidade} onValueChange={setFiltroUnidade}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as unidades</SelectItem>
                  <SelectItem value="alcindo_cacela">Unama Alcindo Cacela</SelectItem>
                  <SelectItem value="ananindeua">Unama Ananindeua</SelectItem>
                  <SelectItem value="parque_shopping">Unama Parque Shopping</SelectItem>
                  <SelectItem value="santarem">Unama Santarém</SelectItem>
                  <SelectItem value="maraba">Unama Marabá</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="aluminio">Alumínio</SelectItem>
                  <SelectItem value="vidro">Vidro</SelectItem>
                  <SelectItem value="pano">Pano</SelectItem>
                  <SelectItem value="pet">PET</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Reciclado</CardTitle>
              <CardDescription>Quantidade total de resíduos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalReciclado.toFixed(2)} kg</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Meta de Reciclagem</CardTitle>
              <CardDescription>Progresso para meta de {META_TOTAL} kg</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{metaAtingida.toFixed(1)}%</span>
                  <span className="text-sm text-gray-500">{META_TOTAL} kg</span>
                </div>
                <Progress value={metaAtingida} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Entregas Registradas</CardTitle>
              <CardDescription>Total de registros no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{entregas.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="por-tipo" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="por-tipo">Por Tipo</TabsTrigger>
            <TabsTrigger value="por-unidade">Por Unidade</TabsTrigger>
            <TabsTrigger value="por-turma">Por Turma</TabsTrigger>
            <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          </TabsList>

          <TabsContent value="por-tipo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quantidade por Tipo de Resíduo</CardTitle>
                  <CardDescription>Distribuição em quilogramas (kg)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar
                      data={dadosGraficoTipos}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top" as const,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proporção por Tipo de Resíduo</CardTitle>
                  <CardDescription>Distribuição percentual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Pie
                      data={dadosGraficoTipos}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "right" as const,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="por-unidade">
            <Card>
              <CardHeader>
                <CardTitle>Quantidade por Unidade</CardTitle>
                <CardDescription>Comparativo entre unidades da Unama</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar
                    data={dadosGraficoUnidades}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="por-turma">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Turmas</CardTitle>
                <CardDescription>Turmas com maior quantidade de resíduos entregues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar
                    data={dadosGraficoTurmas}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evolucao">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução Semanal</CardTitle>
                  <CardDescription>Quantidade coletada por semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line
                      data={dadosEvolucaoSemanal}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evolução Mensal</CardTitle>
                  <CardDescription>Quantidade coletada por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line
                      data={dadosEvolucaoMensal}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
