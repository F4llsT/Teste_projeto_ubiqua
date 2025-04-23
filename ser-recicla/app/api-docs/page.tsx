"use client"

import { useState } from "react"
import Link from "next/link"
import { RecycleIcon, ArrowLeft, Code, Server, Database, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiDocsPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
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
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Documentação da API</h2>
          <p className="text-gray-600 max-w-3xl">
            Esta documentação descreve os endpoints disponíveis na API RESTful do Sistema de Aquisição de Dados do
            Projeto Ser Recicla. Utilize estes endpoints para integrar outros sistemas com nossa plataforma.
          </p>
        </div>

        <Tabs defaultValue="endpoints" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="models">Modelos de Dados</TabsTrigger>
            <TabsTrigger value="examples">Exemplos</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-600" />
                    <CardTitle>GET /api/entregas</CardTitle>
                  </div>
                  <CardDescription>Retorna todas as entregas de resíduos registradas</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Parâmetros de Query (opcionais)</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">tipo</code> - Filtrar por tipo de
                          resíduo
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">unidade</code> - Filtrar por unidade
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">turma</code> - Filtrar por turma
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">curso</code> - Filtrar por curso
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Resposta</h4>
                      <div className="relative">
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                          {`[
  {
    "id": "1",
    "quantidade": 2.5,
    "tipo": "aluminio",
    "turma": "SI2023",
    "curso": "Sistemas de Informação",
    "semestre": "3",
    "turno": "noturno",
    "unidade": "alcindo_cacela",
    "createdAt": "2025-01-15T14:30:00Z"
  },
  ...
]`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            copyToClipboard(
                              `[
  {
    "id": "1",
    "quantidade": 2.5,
    "tipo": "aluminio",
    "turma": "SI2023",
    "curso": "Sistemas de Informação",
    "semestre": "3",
    "turno": "noturno",
    "unidade": "alcindo_cacela",
    "createdAt": "2025-01-15T14:30:00Z"
  }
]`,
                              "get-entregas",
                            )
                          }
                        >
                          {copied === "get-entregas" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-600" />
                    <CardTitle>POST /api/entregas</CardTitle>
                  </div>
                  <CardDescription>Registra uma nova entrega de resíduos</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Corpo da Requisição</h4>
                      <div className="relative">
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                          {`{
  "quantidade": 2.5,
  "tipo": "aluminio",
  "turma": "SI2023",
  "curso": "Sistemas de Informação",
  "semestre": "3",
  "turno": "noturno",
  "unidade": "alcindo_cacela"
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "quantidade": 2.5,
  "tipo": "aluminio",
  "turma": "SI2023",
  "curso": "Sistemas de Informação",
  "semestre": "3",
  "turno": "noturno",
  "unidade": "alcindo_cacela"
}`,
                              "post-entregas-body",
                            )
                          }
                        >
                          {copied === "post-entregas-body" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Resposta</h4>
                      <div className="relative">
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                          {`{
  "id": "123",
  "quantidade": 2.5,
  "tipo": "aluminio",
  "turma": "SI2023",
  "curso": "Sistemas de Informação",
  "semestre": "3",
  "turno": "noturno",
  "unidade": "alcindo_cacela",
  "createdAt": "2025-01-15T14:30:00Z"
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "id": "123",
  "quantidade": 2.5,
  "tipo": "aluminio",
  "turma": "SI2023",
  "curso": "Sistemas de Informação",
  "semestre": "3",
  "turno": "noturno",
  "unidade": "alcindo_cacela",
  "createdAt": "2025-01-15T14:30:00Z"
}`,
                              "post-entregas-response",
                            )
                          }
                        >
                          {copied === "post-entregas-response" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-600" />
                    <CardTitle>GET /api/estatisticas</CardTitle>
                  </div>
                  <CardDescription>Retorna estatísticas agregadas sobre as entregas</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Parâmetros de Query (opcionais)</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">unidade</code> - Filtrar por unidade
                        </li>
                        <li>
                          <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">periodo</code> - Período de tempo
                          (semanal, mensal, total)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Resposta</h4>
                      <div className="relative">
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                          {`{
  "totalReciclado": 1250.75,
  "porTipo": {
    "aluminio": 450.25,
    "vidro": 320.5,
    "pano": 180.0,
    "pet": 300.0
  },
  "porUnidade": {
    "alcindo_cacela": 520.5,
    "ananindeua": 380.25,
    "parque_shopping": 350.0
  },
  "topTurmas": [
    { "turma": "SI2023", "quantidade": 180.5 },
    { "turma": "ENG2022", "quantidade": 150.25 },
    { "turma": "DIR2024", "quantidade": 120.0 }
  ]
}`}
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            copyToClipboard(
                              `{
  "totalReciclado": 1250.75,
  "porTipo": {
    "aluminio": 450.25,
    "vidro": 320.5,
    "pano": 180.0,
    "pet": 300.0
  },
  "porUnidade": {
    "alcindo_cacela": 520.5,
    "ananindeua": 380.25,
    "parque_shopping": 350.0
  },
  "topTurmas": [
    { "turma": "SI2023", "quantidade": 180.5 },
    { "turma": "ENG2022", "quantidade": 150.25 },
    { "turma": "DIR2024", "quantidade": 120.0 }
  ]
}`,
                              "get-estatisticas",
                            )
                          }
                        >
                          {copied === "get-estatisticas" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-600" />
                  <CardTitle>Modelo de Dados</CardTitle>
                </div>
                <CardDescription>Estrutura dos dados utilizados na API</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Entrega</h4>
                    <div className="relative">
                      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                        {`{
  "id": string,           // Identificador único da entrega
  "quantidade": number,   // Quantidade em kg (número decimal)
  "tipo": string,         // Tipo de resíduo: "aluminio", "vidro", "pano", "pet"
  "turma": string,        // Identificador da turma
  "curso": string,        // Nome do curso
  "semestre": string,     // Semestre (1-10)
  "turno": string,        // Turno: "matutino", "vespertino", "noturno", "integral"
  "unidade": string,      // Unidade: "alcindo_cacela", "ananindeua", "parque_shopping", etc.
  "createdAt": string     // Data e hora de registro (formato ISO)
}`}
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            `{
  "id": string,           // Identificador único da entrega
  "quantidade": number,   // Quantidade em kg (número decimal)
  "tipo": string,         // Tipo de resíduo: "aluminio", "vidro", "pano", "pet"
  "turma": string,        // Identificador da turma
  "curso": string,        // Nome do curso
  "semestre": string,     // Semestre (1-10)
  "turno": string,        // Turno: "matutino", "vespertino", "noturno", "integral"
  "unidade": string,      // Unidade: "alcindo_cacela", "ananindeua", "parque_shopping", etc.
  "createdAt": string     // Data e hora de registro (formato ISO)
}`,
                            "model-entrega",
                          )
                        }
                      >
                        {copied === "model-entrega" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Estatísticas</h4>
                    <div className="relative">
                      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                        {`{
  "totalReciclado": number,       // Total em kg de resíduos reciclados
  "porTipo": {                    // Quantidade por tipo de resíduo
    "aluminio": number,
    "vidro": number,
    "pano": number,
    "pet": number
  },
  "porUnidade": {                 // Quantidade por unidade
    [unidade: string]: number
  },
  "topTurmas": [                  // Top turmas com mais entregas
    {
      "turma": string,
      "quantidade": number
    }
  ]
}`}
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            `{
  "totalReciclado": number,       // Total em kg de resíduos reciclados
  "porTipo": {                    // Quantidade por tipo de resíduo
    "aluminio": number,
    "vidro": number,
    "pano": number,
    "pet": number
  },
  "porUnidade": {                 // Quantidade por unidade
    [unidade: string]: number
  },
  "topTurmas": [                  // Top turmas com mais entregas
    {
      "turma": string,
      "quantidade": number
    }
  ]
}`,
                            "model-estatisticas",
                          )
                        }
                      >
                        {copied === "model-estatisticas" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-600" />
                    <CardTitle>Exemplo de Requisição com JavaScript</CardTitle>
                  </div>
                  <CardDescription>Utilizando fetch para consumir a API</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative">
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                      {`// Exemplo de registro de uma nova entrega
async function registrarEntrega() {
  const dados = {
    quantidade: 2.5,
    tipo: "aluminio",
    turma: "SI2023",
    curso: "Sistemas de Informação",
    semestre: "3",
    turno: "noturno",
    unidade: "alcindo_cacela"
  };

  try {
    const response = await fetch('https://api.serrecicla.unama.br/api/entregas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar entrega');
    }

    const resultado = await response.json();
    console.log('Entrega registrada com sucesso:', resultado);
    return resultado;
  } catch (error) {
    console.error('Falha ao registrar entrega:', error);
    throw error;
  }
}`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          `// Exemplo de registro de uma nova entrega
async function registrarEntrega() {
  const dados = {
    quantidade: 2.5,
    tipo: "aluminio",
    turma: "SI2023",
    curso: "Sistemas de Informação",
    semestre: "3",
    turno: "noturno",
    unidade: "alcindo_cacela"
  };

  try {
    const response = await fetch('https://api.serrecicla.unama.br/api/entregas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error('Erro ao registrar entrega');
    }

    const resultado = await response.json();
    console.log('Entrega registrada com sucesso:', resultado);
    return resultado;
  } catch (error) {
    console.error('Falha ao registrar entrega:', error);
    throw error;
  }
}`,
                          "example-js",
                        )
                      }
                    >
                      {copied === "example-js" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-600" />
                    <CardTitle>Exemplo de Requisição com Python</CardTitle>
                  </div>
                  <CardDescription>Utilizando requests para consumir a API</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative">
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                      {`# Exemplo de obtenção de estatísticas
import requests

def obter_estatisticas(unidade=None, periodo=None):
    url = 'https://api.serrecicla.unama.br/api/estatisticas'
    
    params = {}
    if unidade:
        params['unidade'] = unidade
    if periodo:
        params['periodo'] = periodo
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Lança exceção para erros HTTP
        
        dados = response.json()
        print(f"Total reciclado: {dados['totalReciclado']} kg")
        
        # Exibir dados por tipo de resíduo
        print("\\nQuantidade por tipo de resíduo:")
        for tipo, quantidade in dados['porTipo'].items():
            print(f"  {tipo}: {quantidade} kg")
        
        return dados
    except requests.exceptions.RequestException as e:
        print(f"Erro ao obter estatísticas: {e}")
        return None`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          `# Exemplo de obtenção de estatísticas
import requests

def obter_estatisticas(unidade=None, periodo=None):
    url = 'https://api.serrecicla.unama.br/api/estatisticas'
    
    params = {}
    if unidade:
        params['unidade'] = unidade
    if periodo:
        params['periodo'] = periodo
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Lança exceção para erros HTTP
        
        dados = response.json()
        print(f"Total reciclado: {dados['totalReciclado']} kg")
        
        # Exibir dados por tipo de resíduo
        print("\\nQuantidade por tipo de resíduo:")
        for tipo, quantidade in dados['porTipo'].items():
            print(f"  {tipo}: {quantidade} kg")
        
        return dados
    except requests.exceptions.RequestException as e:
        print(f"Erro ao obter estatísticas: {e}")
        return None`,
                          "example-python",
                        )
                      }
                    >
                      {copied === "example-python" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Autenticação</h3>
          <p className="mb-4">
            Para ambientes de produção, a API utiliza autenticação via token JWT. Para obter um token de acesso, entre
            em contato com a equipe de desenvolvimento.
          </p>
          <p>
            Para incluir o token de autenticação, adicione o cabeçalho{" "}
            <code className="text-sm bg-white px-1 py-0.5 rounded">Authorization: Bearer seu_token</code> às suas
            requisições.
          </p>
        </div>
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
