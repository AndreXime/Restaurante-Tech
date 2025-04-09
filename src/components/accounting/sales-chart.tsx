import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Vendas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Gráfico de vendas seria exibido aqui</p>
            <p className="text-sm text-gray-400">Integração com biblioteca de gráficos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
