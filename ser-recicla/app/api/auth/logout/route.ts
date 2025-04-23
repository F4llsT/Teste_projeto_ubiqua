import { type NextRequest, NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Remove auth cookie
    await removeAuthCookie()

    // Return success
    return NextResponse.json({ message: "Logout realizado com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
