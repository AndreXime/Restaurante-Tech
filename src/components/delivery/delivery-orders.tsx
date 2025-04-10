import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeliveryOrderCard } from './delivery-order-card';
import { completedOrders, inProgressOrders, pendingOrders } from '@/fake-data/delivery';

export function DeliveryOrders() {
	return (
		<Tabs defaultValue="pending">
			<TabsList className="mb-4">
				<TabsTrigger
					value="pending"
					className="relative">
					Pendentes
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{pendingOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger
					value="inProgress"
					className="relative">
					Em Andamento
					<span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{inProgressOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger value="completed">Entregues</TabsTrigger>
			</TabsList>

			<TabsContent
				value="pending"
				className="space-y-4">
				{pendingOrders.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>

			<TabsContent
				value="inProgress"
				className="space-y-4">
				{inProgressOrders.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>

			<TabsContent
				value="completed"
				className="space-y-4">
				{completedOrders.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>
		</Tabs>
	);
}
