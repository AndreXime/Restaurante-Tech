import { SalesChart } from "../../components/accounting/sales-chart"
import { FinancialSummary } from "../../components/accounting/financial-summary"
import { RecentTransactions } from "../../components/accounting/recent-transactions"
import { SimpleHeader } from "../../components/layout/simple-header"

export default function AccountingPage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Contabilidade" />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <FinancialSummary />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SalesChart />
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
