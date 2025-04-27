import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeliveryOrderCard } from './delivery-order-card';
import { useData } from '@/contexts/DataContext';

export function DeliveryOrders() {
	const { Entrega } = useData();

	const pendingOrders = Entrega.filter((order) => order.status == 'pendente');
	const inProgressOrders = Entrega.filter((order) => order.status == 'em andamento');
	const completedOrders = Entrega.filter((order) => order.status == 'entregue');

	return (
		<Tabs defaultValue="pending">
			<TabsList className="mb-4">
				<TabsTrigger
					value="pending"
					className="relative">
					Pendentes
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{pendingOrders.length ?? 0}
					</span>
				</TabsTrigger>
				<TabsTrigger
					value="inProgress"
					className="relative">
					Em Andamento
					<span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{inProgressOrders.length ?? 0}
					</span>
				</TabsTrigger>
				<TabsTrigger value="completed">Entregues</TabsTrigger>
			</TabsList>

			<TabsContent
				value="pending"
				className="grid grid-cols-2 gap-4">
				{pendingOrders?.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>

			<TabsContent
				value="inProgress"
				className="grid grid-cols-2 gap-4">
				{inProgressOrders?.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>

			<TabsContent
				value="completed"
				className="grid grid-cols-2 gap-4">
				{completedOrders?.map((order) => (
					<DeliveryOrderCard
						key={order.id}
						order={order}
					/>
				))}
			</TabsContent>
		</Tabs>
	);
}
