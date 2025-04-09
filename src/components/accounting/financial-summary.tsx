import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from "lucide-react"

export function FinancialSummary() {
  const summaryItems = [
    {
      title: "Vendas Totais",
      value: "R$12.456,78",
      change: "+12,5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pedidos",
      value: "345",
      change: "+8,2%",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Ticket Médio",
      value: "R$36,10",
      change: "+4,3%",
      trend: "up",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Despesas",
      value: "R$5.234,56",
      change: "-2,1%",
      trend: "down",
      icon: TrendingDown,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
              </div>
              <div className={`p-2 rounded-full ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              {item.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                {item.change} em relação ao mês anterior
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
