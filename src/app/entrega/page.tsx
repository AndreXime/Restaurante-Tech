import { DeliveryOrders } from "../../components/delivery/delivery-orders"
import { DeliveryMap } from "../../components/delivery/delivery-map"
import { SimpleHeader } from "../../components/layout/simple-header"

export default function DeliveryPage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Entregas" />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <div className="flex-1">
          <DeliveryOrders />
        </div>
        <div className="w-full lg:w-[500px] bg-white border rounded-lg overflow-hidden">
          <DeliveryMap />
        </div>
      </div>
    </div>
  )
}
