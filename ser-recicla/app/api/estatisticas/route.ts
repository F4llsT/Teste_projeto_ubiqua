import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parâmetros de filtro
    const unidade = searchParams.get("unidade")
    const periodo = searchParams.get("periodo") || "total" // total, mensal, semanal

    // Construir filtros baseados nos parâmetros
    const filtros: any = {}

    if (unidade) {
      filtros.unidade = unidade
    }

    // Filtro de período
    if (periodo !== "total") {
      const hoje = new Date()
      const dataInicio = new Date()

      if (periodo === "semanal") {
        // Últimos 7 dias
        dataInicio.setDate(hoje.getDate() - 7)
      } else if (periodo === "mensal") {
        // Últimos 30 dias
        dataInicio.setDate(hoje.getDate() - 30)
      }

      filtros.createdAt = {
        gte: dataInicio,
      }
    }

    // Buscar todas as entregas com os filtros aplicados
    const entregas = await prisma.entrega.findMany({
      where: filtros,
    })

    // Calcular estatísticas

    // Total reciclado
    const totalReciclado = entregas.reduce((total, entrega) => total + entrega.quantidade, 0)

    // Quantidade por tipo de resíduo
    const porTipo: Record<string, number> = {}
    entregas.forEach((entrega) => {
      porTipo[entrega.tipo] = (porTipo[entrega.tipo] || 0) + entrega.quantidade
    })

    // Quantidade por unidade
    const porUnidade: Record<string, number> = {}
    entregas.forEach((entrega) => {
      porUnidade[entrega.unidade] = (porUnidade[entrega.unidade] || 0) + entrega.quantidade
    })

    // Top turmas
    const porTurma: Record<string, number> = {}
    entregas.forEach((entrega) => {
      porTurma[entrega.turma] = (porTurma[entrega.turma] || 0) + entrega.quantidade
    })

    // Ordenar turmas por quantidade e pegar as top 5
    const topTurmas = Object.entries(porTurma)
      .map(([turma, quantidade]) => ({ turma, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5)

    return NextResponse.json({
      totalReciclado,
      porTipo,
      porUnidade,
      topTurmas,
    })
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 })
  }
}
