"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Entrega = {
  id: string
  quantidade: number
  tipo: string
  turma: string
  curso: string
  unidade: string
  createdAt: string
  user?: {
    name: string
  }
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

export function UltimasEntregas() {
  const [entregas, setEntregas] = useState<Entrega[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await fetch("/api/entregas")
        if (!response.ok) {
          throw new Error("Erro ao buscar entregas")
        }
        const data = await response.json()
        setEntregas(data.slice(0, 5)) // Pegar apenas as 5 últimas entregas
      } catch (error) {
        console.error("Erro ao carregar entregas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntregas()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Últimas Entregas</CardTitle>
          <CardDescription>Entregas mais recentes registradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <p>Carregando...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (entregas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Últimas Entregas</CardTitle>
          <CardDescription>Entregas mais recentes registradas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p>Nenhuma entrega registrada ainda.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas Entregas</CardTitle>
        <CardDescription>Entregas mais recentes registradas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Usuário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entregas.map((entrega) => (
              <TableRow key={entrega.id}>
                <TableCell>{new Date(entrega.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{tiposResiduos[entrega.tipo as keyof typeof tiposResiduos] || entrega.tipo}</TableCell>
                <TableCell>{entrega.quantidade.toFixed(2)} kg</TableCell>
                <TableCell>{entrega.turma}</TableCell>
                <TableCell>{unidades[entrega.unidade as keyof typeof unidades] || entrega.unidade}</TableCell>
                <TableCell>{entrega.user?.name || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
