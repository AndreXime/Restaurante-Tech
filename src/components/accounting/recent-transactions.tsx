import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const transactions = [
  { id: "TX001", description: "Venda - Mesa 4", amount: 78.96, type: "entrada", date: "15/01/2025 14:30" },
  { id: "TX002", description: "Venda - Delivery", amount: 56.97, type: "entrada", date: "15/01/2025 13:45" },
  { id: "TX003", description: "Pagamento Fornecedor", amount: 345.67, type: "saída", date: "15/01/2025 11:20" },
  { id: "TX004", description: "Venda - Mesa 2", amount: 42.98, type: "entrada", date: "15/01/2025 10:15" },
  { id: "TX005", description: "Pagamento Funcionário", amount: 1200.0, type: "saída", date: "14/01/2025 17:00" },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className={`font-bold ${transaction.type === "entrada" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "entrada" ? "+" : "-"}R${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
