"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type EstatisticasResumo = {
  totalReciclado: number
  porTipo: Record<string, number>
}

export function EstatisticasResumo() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasResumo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const META_TOTAL = 1000 // Meta em kg

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const response = await fetch("/api/estatisticas")
        if (!response.ok) {
          throw new Error("Erro ao buscar estatísticas")
        }
        const data = await response.json()
        setEstatisticas(data)
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEstatisticas()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!estatisticas) {
    return (
      <div className="text-center py-4">
        <p>Erro ao carregar estatísticas. Tente novamente mais tarde.</p>
      </div>
    )
  }

  const metaAtingida = (estatisticas.totalReciclado / META_TOTAL) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Reciclado</CardTitle>
          <CardDescription>Quantidade total de resíduos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{estatisticas.totalReciclado.toFixed(2)} kg</div>
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
          <CardTitle className="text-lg">Distribuição por Tipo</CardTitle>
          <CardDescription>Principais tipos de resíduos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {Object.entries(estatisticas.porTipo).map(([tipo, quantidade]) => (
              <div key={tipo} className="flex justify-between items-center">
                <span className="capitalize">{tipo}</span>
                <span className="font-medium">{quantidade.toFixed(1)} kg</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
