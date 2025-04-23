"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RecycleIcon, ArrowLeft, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  quantidade: z.coerce.number().positive("A quantidade deve ser maior que zero"),
  tipo: z.string().min(1, "Selecione o tipo de resíduo"),
})

type User = {
  id: string
  name: string
  email: string
  turma: string
  curso: string
  semestre: string
  turno: string
  unidade: string
}

export default function RegistroPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/user")
        if (!response.ok) {
          throw new Error("Não autenticado")
        }
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        router.push("/login?callbackUrl=/registro")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidade: undefined,
      tipo: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setIsSubmitting(true)
    try {
      const entregaData = {
        ...values,
        turma: user.turma,
        curso: user.curso,
        semestre: user.semestre,
        turno: user.turno,
        unidade: user.unidade,
        userId: user.id,
      }

      const response = await fetch("/api/entregas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entregaData),
      })

      if (!response.ok) {
        throw new Error("Erro ao registrar entrega")
      }

      toast({
        title: "Entrega registrada com sucesso!",
        description: `${values.quantidade}kg de ${values.tipo} registrado para a turma ${user.turma}.`,
      })

      form.reset()
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      toast({
        title: "Erro ao registrar entrega",
        description: "Ocorreu um erro ao tentar registrar a entrega. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
          <p>Carregando...</p>
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
              <Button variant="outline" className="text-white border-white hover:bg-green-700" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Registro de Entrega de Resíduos</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para registrar a entrega de resíduos recicláveis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Informações do Usuário</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Nome:</span> {user.name}
                  </div>
                  <div>
                    <span className="font-semibold">Turma:</span> {user.turma}
                  </div>
                  <div>
                    <span className="font-semibold">Curso:</span> {user.curso}
                  </div>
                  <div>
                    <span className="font-semibold">Semestre:</span> {user.semestre}
                  </div>
                  <div>
                    <span className="font-semibold">Turno:</span> {user.turno}
                  </div>
                  <div>
                    <span className="font-semibold">Unidade:</span> {user.unidade}
                  </div>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>Informe o peso em quilogramas</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Resíduo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="aluminio">Alumínio</SelectItem>
                            <SelectItem value="vidro">Vidro</SelectItem>
                            <SelectItem value="pano">Pano</SelectItem>
                            <SelectItem value="pet">PET</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando..." : "Registrar Entrega"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
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
