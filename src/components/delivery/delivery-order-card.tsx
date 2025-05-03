import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Package, User } from 'lucide-react';
import { DeliveryType } from '@/types/types';

export function DeliveryOrderCard({ order }: { order: DeliveryType }) {
	const statusColors = {
		pendente: 'bg-red-100 text-red-600',
		'em andamento': 'bg-yellow-100 text-yellow-600',
		entregue: 'bg-green-100 text-green-600',
	};

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex justify-between items-start mb-3">
					<div>
						<h3 className="text-lg font-bold">{order.id}</h3>
						<p className="text-sm text-gray-600">{order.customer}</p>
					</div>
					<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
						{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
					</span>
				</div>

				<div className="space-y-2 mb-3">
					<div className="flex items-center text-sm text-gray-600">
						<MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>{order.address}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<Phone className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>{order.phone}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<Clock className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>Horário: {order.time}</span>
					</div>
					<div className="flex items-center text-sm text-gray-600">
						<Package className="h-4 w-4 mr-2 flex-shrink-0" />
						<span>
							{order.items} itens - R${order.total.toFixed(2)}
						</span>
					</div>
					{order.deliveryPerson && (
						<div className="flex items-center text-sm text-gray-600">
							<User className="h-4 w-4 mr-2 flex-shrink-0" />
							<span>Entregador: {order.deliveryPerson}</span>
						</div>
					)}
				</div>

				<div className="flex gap-2 flex-wrap">
					{order.status === 'pendente' && (
						<>
							<Button
								variant="default"
								className="flex-1 bg-green-600 hover:bg-green-700">
								Atribuir Entregador
							</Button>
							<Button
								variant="outline"
								className="flex-1">
								Ver Detalhes
							</Button>
						</>
					)}

					{order.status === 'em andamento' && (
						<>
							<Button
								variant="default"
								className="flex-1 bg-green-600 hover:bg-green-700">
								Confirmar Entrega
							</Button>
							<Button
								variant="outline"
								className="flex-1">
								Ver Detalhes
							</Button>
						</>
					)}

					{order.status === 'entregue' && (
						<Button
							variant="outline"
							className="flex-1">
							Ver Detalhes
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
