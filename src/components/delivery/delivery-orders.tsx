import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeliveryOrderCard } from './delivery-order-card';
interface OrderType {
	id: string;
	customer: string;
	address: string;
	phone: string;
	items: number;
	total: number;
	time: string;
	status: 'pendente' | 'em andamento' | 'entregue';
	deliveryPerson?: string;
}
const pendingOrders: OrderType[] = [
	{
		id: 'PED001',
		customer: 'João Silva',
		address: 'Rua das Flores, 123',
		phone: '(11) 98765-4321',
		items: 3,
		total: 56.97,
		time: '15:30',
		status: 'pendente',
	},
	{
		id: 'PED002',
		customer: 'Maria Oliveira',
		address: 'Av. Paulista, 1000',
		phone: '(11) 91234-5678',
		items: 2,
		total: 42.98,
		time: '15:45',
		status: 'pendente',
	},
	{
		id: 'PED003',
		customer: 'Carlos Santos',
		address: 'Rua Augusta, 789',
		phone: '(11) 99876-5432',
		items: 4,
		total: 78.96,
		time: '16:00',
		status: 'pendente',
	},
];

const inProgressOrders: OrderType[] = [
	{
		id: 'PED004',
		customer: 'Ana Pereira',
		address: 'Rua Oscar Freire, 456',
		phone: '(11) 95555-4444',
		items: 2,
		total: 35.98,
		time: '15:15',
		status: 'em andamento',
		deliveryPerson: 'Pedro Motoboy',
	},
	{
		id: 'PED005',
		customer: 'Lucia Ferreira',
		address: 'Alameda Santos, 234',
		phone: '(11) 94444-3333',
		items: 3,
		total: 49.97,
		time: '15:00',
		status: 'em andamento',
		deliveryPerson: 'Carlos Motoboy',
	},
];

const completedOrders: OrderType[] = [
	{
		id: 'PED006',
		customer: 'Pedro Costa',
		address: 'Rua Consolação, 567',
		phone: '(11) 93333-2222',
		items: 1,
		total: 23.99,
		time: '14:30',
		status: 'entregue',
		deliveryPerson: 'Pedro Motoboy',
	},
	{
		id: 'PED007',
		customer: 'Fernanda Lima',
		address: 'Rua Haddock Lobo, 321',
		phone: '(11) 92222-1111',
		items: 5,
		total: 89.95,
		time: '14:00',
		status: 'entregue',
		deliveryPerson: 'Carlos Motoboy',
	},
];

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
