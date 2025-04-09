import { TableGrid } from "../../components/tables/table-grid"
import { SimpleHeader } from "../../components/layout/simple-header"

export default function TableServicePage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Serviços de Mesa" />
      <div className="flex-1 flex overflow-hidden p-4">
        <div className="flex-1 overflow-auto">
          <TableGrid />
        </div>
      </div>
    </div>
  )
}
