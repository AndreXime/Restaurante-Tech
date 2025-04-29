import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderCard } from './order-card';
import { useData } from '@/contexts/DataContext';

export function OrderGrid() {
	const { Cozinha } = useData();

	const pendingOrders = Cozinha.filter((order) => order.status == 'pendente');
	const inProgressOrders = Cozinha.filter((order) => order.status == 'preparo');
	const readyOrders = Cozinha.filter((order) => order.status == 'pronto');

	return (
		<Tabs defaultValue="pending">
			<TabsList className="mb-4 gap-2">
				<TabsTrigger
					value="pending"
					className="relative">
					Pendentes
					<span className="absolute -top-1 -right-3 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{pendingOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger
					value="inProgress"
					className="relative">
					Em Preparo
					<span className="absolute -top-1 -right-3 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{inProgressOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger value="ready">Prontos</TabsTrigger>
			</TabsList>

			<TabsContent value="pending">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{pendingOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido pendente</h2>}
					{pendingOrders.map((order, index) => (
						<OrderCard
							key={index}
							order={order}
						/>
					))}
				</div>
			</TabsContent>

			<TabsContent value="inProgress">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{inProgressOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido em andamento</h2>}

					{inProgressOrders.map((order, index) => (
						<OrderCard
							key={index}
							order={order}
						/>
					))}
				</div>
			</TabsContent>

			<TabsContent value="ready">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{readyOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido pronto</h2>}

					{readyOrders.map((order, index) => (
						<OrderCard
							key={index}
							order={order}
						/>
					))}
				</div>
			</TabsContent>
		</Tabs>
	);
}
