import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderCard } from './order-card';
interface OrderType {
	id: string;
	table: string;
	items: number;
	time: string;
	status: 'pendente' | 'preparo' | 'pronto';
	server: string;
	orderItems: Array<{
		name: string;
		quantity: number;
		notes?: string;
	}>;
}
const pendingOrders: OrderType[] = [
	{
		id: '001',
		table: '4',
		items: 3,
		time: '14:30',
		status: 'pendente',
		server: 'João Silva',
		orderItems: [
			{ name: 'Hambúrguer de Carne', quantity: 1, notes: 'Sem cebola' },
			{ name: 'Batatas Fritas', quantity: 1 },
			{ name: 'Refrigerante', quantity: 1 },
		],
	},
	{
		id: '002',
		table: '2',
		items: 2,
		time: '14:35',
		status: 'pendente',
		server: 'Maria Oliveira',
		orderItems: [
			{ name: 'Pizza Margherita', quantity: 1 },
			{ name: 'Água Mineral', quantity: 1 },
		],
	},
];

const inProgressOrders: OrderType[] = [
	{
		id: '003',
		table: '6',
		items: 4,
		time: '14:15',
		status: 'preparo',
		server: 'Carlos Santos',
		orderItems: [
			{ name: 'Filé Mignon', quantity: 2, notes: 'Ao ponto' },
			{ name: 'Salada Verde', quantity: 1 },
			{ name: 'Vinho Tinto', quantity: 1 },
		],
	},
	{
		id: '004',
		table: '1',
		items: 3,
		time: '14:20',
		status: 'preparo',
		server: 'Ana Pereira',
		orderItems: [
			{ name: 'Massa ao Molho Branco', quantity: 1 },
			{ name: 'Pão de Alho', quantity: 1 },
			{ name: 'Suco de Laranja', quantity: 1 },
		],
	},
];

const readyOrders: OrderType[] = [
	{
		id: '005',
		table: '3',
		items: 2,
		time: '14:00',
		status: 'pronto',
		server: 'Pedro Costa',
		orderItems: [
			{ name: 'Salada Caesar', quantity: 1 },
			{ name: 'Água com Gás', quantity: 1 },
		],
	},
];

export function OrderGrid() {
	return (
		<Tabs defaultValue="pending">
			<TabsList className="mb-4">
				<TabsTrigger
					value="pending"
					className="relative">
					Pendentes
					<span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{pendingOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger
					value="inProgress"
					className="relative">
					Em Preparo
					<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{inProgressOrders.length}
					</span>
				</TabsTrigger>
				<TabsTrigger value="ready">Prontos</TabsTrigger>
			</TabsList>

			<TabsContent value="pending">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
