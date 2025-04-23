"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RecycleIcon, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserType = {
  id: string
  name: string
  email: string
}

export function NavBar() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

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

  return (
    <header className="bg-green-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <RecycleIcon className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Ser Recicla</h1>
            </Link>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/sobre-reciclagem">
              <Button variant="outline" className="text-white border-white hover:bg-green-700">
                Sobre Reciclagem
              </Button>
            </Link>

            {isLoading ? (
              <div className="h-10 w-24 bg-green-500 rounded animate-pulse"></div>
            ) : user ? (
              <>
                <Link href="/registro">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Registrar Entrega
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-white border-white hover:bg-green-700">
                      <User className="h-4 w-4 mr-2" />
                      {user.name.split(" ")[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/registro")}>Registrar Entrega</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Login
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button className="bg-white text-green-600 hover:bg-gray-100">Cadastrar</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
