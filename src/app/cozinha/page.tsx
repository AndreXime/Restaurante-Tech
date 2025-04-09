import { SimpleHeader } from "../../components/layout/simple-header"
import { OrderGrid } from "../../components/kitchen/order-grid"

export default function KitchenPage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Cozinha" />
      <div className="flex-1 overflow-auto p-4">
        <OrderGrid />
      </div>
    </div>
  )
}
