import Link from "next/link"
import { RecycleIcon, ArrowLeft, Droplet, Trash2, Lightbulb, TreePine, Factory, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SobreReciclagemPage() {
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
          <h2 className="text-3xl font-bold mb-4">Sobre Reciclagem</h2>
          <p className="text-lg text-gray-600 max-w-4xl">
            A reciclagem é um processo de transformação de materiais usados em novos produtos para evitar o desperdício
            de recursos potencialmente úteis. Além de reduzir o consumo de matérias-primas, a reciclagem também diminui
            o uso de energia, a poluição do ar e da água, e as emissões de gases de efeito estufa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader className="bg-green-50">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-green-600" />
                <CardTitle>Por que reciclar?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <TreePine className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Preserva recursos naturais e reduz a extração de matérias-primas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Factory className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Economiza energia no processo de produção de novos materiais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Trash2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Reduz a quantidade de resíduos enviados para aterros sanitários</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplet className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Diminui a poluição do solo, da água e do ar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Contribui para a sustentabilidade e para um futuro mais verde</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-green-50">
              <div className="flex items-center gap-3">
                <RecycleIcon className="h-6 w-6 text-green-600" />
                <CardTitle>O que pode ser reciclado?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">No projeto Ser Recicla, coletamos os seguintes tipos de materiais recicláveis:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">Alumínio</h4>
                  <p className="text-sm">Latas de bebidas, papel alumínio, embalagens de alimentos</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">Vidro</h4>
                  <p className="text-sm">Garrafas, potes, frascos de perfumes e medicamentos</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">Pano</h4>
                  <p className="text-sm">Roupas, toalhas, lençóis, tecidos em geral</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-green-700">PET</h4>
                  <p className="text-sm">Garrafas de refrigerante, água, sucos e outros plásticos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Benefícios da Reciclagem por Material</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alumínio</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Economiza 95% da energia necessária para produzir alumínio a partir da matéria-prima</li>
                  <li>Pode ser reciclado infinitas vezes sem perder qualidade</li>
                  <li>Reduz a extração de bauxita, preservando áreas naturais</li>
                  <li>
                    Uma lata de alumínio reciclada economiza energia suficiente para manter uma TV ligada por 3 horas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vidro</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Economiza 30% da energia necessária para produzir vidro a partir da matéria-prima</li>
                  <li>Pode ser reciclado infinitas vezes sem perder qualidade</li>
                  <li>Reduz a extração de areia, um recurso natural limitado</li>
                  <li>Uma tonelada de vidro reciclado evita a extração de 1,3 tonelada de areia</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pano/Tecido</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Reduz o volume de resíduos têxteis em aterros sanitários</li>
                  <li>Economiza água e produtos químicos usados na produção de novos tecidos</li>
                  <li>Pode ser transformado em novos produtos ou doado para reutilização</li>
                  <li>A indústria têxtil é a segunda mais poluente do mundo, tornando a reciclagem essencial</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PET/Plástico</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Economiza até 70% da energia necessária para produzir plástico a partir do petróleo</li>
                  <li>Reduz a poluição dos oceanos, onde milhões de toneladas de plástico são despejadas anualmente</li>
                  <li>Uma garrafa PET pode levar mais de 400 anos para se decompor na natureza</li>
                  <li>O plástico reciclado pode ser transformado em fibras para roupas, carpetes e outros produtos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Como participar do Ser Recicla?</h3>
          <p className="mb-4">
            Participar do projeto Ser Recicla é simples e contribui significativamente para a sustentabilidade do nosso
            planeta e para o sucesso da COP 30 em Belém.
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li>Cadastre-se no sistema Ser Recicla</li>
            <li>Separe os materiais recicláveis (alumínio, vidro, pano e PET) em sua casa ou local de estudo</li>
            <li>Leve os materiais para os pontos de coleta nas unidades da Unama</li>
            <li>Registre sua entrega no sistema para contabilizar os pontos para sua turma</li>
            <li>Acompanhe o desempenho da sua turma no dashboard</li>
          </ol>
          <div className="flex justify-center">
            <Link href="/cadastro">
              <Button className="bg-green-600 hover:bg-green-700">Cadastre-se Agora</Button>
            </Link>
          </div>
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
