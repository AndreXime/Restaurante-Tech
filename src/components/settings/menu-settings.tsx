import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: 1, name: "Café da Manhã", items: 19 },
  { id: 2, name: "Sopas", items: 8 },
  { id: 3, name: "Massas", items: 14 },
  { id: 4, name: "Pratos Principais", items: 27 },
  { id: 5, name: "Hambúrgueres", items: 13 },
  { id: 6, name: "Bebidas", items: 22 },
  { id: 7, name: "Sobremesas", items: 15 },
]

const menuItems = [
  { id: 1, name: "Hambúrguer de Carne", category: "Hambúrgueres", price: 23.99, status: "Ativo" },
  { id: 2, name: "Suco de Laranja", category: "Bebidas", price: 12.99, status: "Ativo" },
  { id: 3, name: "Salada de Vegetais", category: "Pratos Principais", price: 17.99, status: "Ativo" },
  { id: 4, name: "Tacos com Frango", category: "Pratos Principais", price: 14.99, status: "Ativo" },
  { id: 5, name: "Sushi de Carne", category: "Pratos Principais", price: 9.99, status: "Inativo" },
]

export function MenuSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gerenciamento de Cardápio</h2>
      </div>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Itens</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="pt-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Item
            </Button>
          </div>

          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3">Nome</th>
                  <th className="text-left p-3">Categoria</th>
                  <th className="text-left p-3">Preço</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">R${item.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Ativo" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="pt-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </div>

          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3">Nome</th>
                  <th className="text-left p-3">Itens</th>
                  <th className="text-right p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t">
                    <td className="p-3">{category.name}</td>
                    <td className="p-3">{category.items}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
