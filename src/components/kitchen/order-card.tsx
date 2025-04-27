import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, User, Check } from 'lucide-react';
import { KitchenOrderType } from '@/types/types';

export function OrderCard({ order }: { order: KitchenOrderType }) {
	const statusColors = {
		pendente: 'bg-yellow-100 text-yellow-600',
		preparo: 'bg-orange-100 text-orange-600',
		pronto: 'bg-green-100 text-green-600',
	};

	return (
		<Card className="h-full">
			<CardContent className="p-4 h-full flex flex-col">
				<div className="flex justify-between items-start mb-3">
					<div>
						<h3 className="text-lg font-bold">Mesa {order.table}</h3>
						<p className="text-sm text-gray-600">Pedido #{order.id}</p>
					</div>
					<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
						{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
					</span>
				</div>

				<div className="space-y-2 mb-3">
					<div className="flex items-center text-sm text-gray-600">
						<Clock className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>{order.time}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<User className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>Atendente: {order.server}</span>
					</div>
				</div>

				<div className="border-t border-b py-3 mb-3">
					<h4 className="font-medium mb-2">Itens:</h4>
					<ul className="space-y-2">
						{order.orderItems.map((item, index) => (
							<li
								key={index}
								className="flex justify-between">
								<span>
									{item.quantity}x {item.name}
								</span>
								{item.notes && <span className="text-sm text-gray-500 italic">({item.notes})</span>}
							</li>
						))}
					</ul>
				</div>

				<div className="flex gap-2 mt-auto">
					{order.status === 'pendente' && (
						<Button
							variant="default"
							className="flex-1 bg-orange-600 hover:bg-orange-700">
							Iniciar Preparo
						</Button>
					)}

					{order.status === 'preparo' && (
						<Button
							variant="default"
							className="flex-1 bg-green-600 hover:bg-green-700">
							<Check className="h-4 w-4 mr-2" />
							Marcar como Pronto
						</Button>
					)}

					{order.status === 'pronto' && (
						<Button
							variant="outline"
							className="flex-1"
							disabled>
							Pronto para Entrega
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
