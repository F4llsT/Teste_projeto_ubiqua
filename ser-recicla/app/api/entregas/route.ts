import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { randomUUID } from "crypto"
import { getAuthUser } from "@/lib/auth"

// Schema de validação para criação de entrega
const entregaSchema = z.object({
  quantidade: z.number().positive("A quantidade deve ser maior que zero"),
  tipo: z.enum(["aluminio", "vidro", "pano", "pet"], {
    errorMap: () => ({ message: "Tipo de resíduo inválido" }),
  }),
  turma: z.string().min(1, "Informe a turma"),
  curso: z.string().min(1, "Informe o curso"),
  semestre: z.string().min(1, "Selecione o semestre"),
  turno: z.enum(["matutino", "vespertino", "noturno", "integral"], {
    errorMap: () => ({ message: "Turno inválido" }),
  }),
  unidade: z.string().min(1, "Selecione a unidade"),
  userId: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Construir filtros baseados nos parâmetros da query
    const filtros: any = {}

    const tipo = searchParams.get("tipo")
    if (tipo) filtros.tipo = tipo

    const unidade = searchParams.get("unidade")
    if (unidade) filtros.unidade = unidade

    const turma = searchParams.get("turma")
    if (turma) filtros.turma = turma

    const curso = searchParams.get("curso")
    if (curso) filtros.curso = curso

    const userId = searchParams.get("userId")
    if (userId) filtros.userId = userId

    // Buscar entregas com os filtros aplicados
    const entregas = await prisma.entrega.findMany({
      where: filtros,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(entregas)
  } catch (error) {
    console.error("Erro ao buscar entregas:", error)
    return NextResponse.json({ error: "Erro ao buscar entregas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await getAuthUser(request)

    // Validar dados de entrada
    const validacao = entregaSchema.safeParse(body)

    if (!validacao.success) {
      return NextResponse.json({ error: "Dados inválidos", detalhes: validacao.error.format() }, { status: 400 })
    }

    const dados = validacao.data

    // Verificar se o usuário está autenticado
    if (!user && !dados.userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 })
    }

    // Usar o ID do usuário autenticado se não for fornecido no corpo
    const userId = dados.userId || user?.id

    // Criar nova entrega no banco de dados
    const novaEntrega = await prisma.entrega.create({
      data: {
        id: randomUUID(),
        quantidade: dados.quantidade,
        tipo: dados.tipo,
        turma: dados.turma,
        curso: dados.curso,
        semestre: dados.semestre,
        turno: dados.turno,
        unidade: dados.unidade,
        userId: userId,
      },
    })

    return NextResponse.json(novaEntrega, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar entrega:", error)
    return NextResponse.json({ error: "Erro ao processar a requisição" }, { status: 500 })
  }
}
