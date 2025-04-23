import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

const signupSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().optional(),
  curso: z.string().min(1, "Informe o curso"),
  semestre: z.string().min(1, "Selecione o semestre"),
  turma: z.string().min(1, "Informe a turma"),
  turno: z.string().min(1, "Selecione o turno"),
  unidade: z.string().min(1, "Selecione a unidade"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validationResult = signupSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ message: "Dados inválidos", errors: validationResult.error.format() }, { status: 400 })
    }

    const { name, email, password, phone, curso, semestre, turma, turno, unidade } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Este email já está em uso" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        curso,
        semestre,
        turma,
        turno,
        unidade,
      },
    })

    // Return success without exposing sensitive data
    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
