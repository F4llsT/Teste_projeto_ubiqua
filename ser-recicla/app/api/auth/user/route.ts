import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Erro ao obter usuário:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
