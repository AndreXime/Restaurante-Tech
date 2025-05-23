import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, User, HandPlatter } from 'lucide-react';
import { TablesType } from '@/types/types';

export function TableCard(mesa: TablesType) {
	const statusColors = {
		livre: 'bg-green-100 text-green-600',
		ocupada: 'bg-red-100 text-red-600',
		reservada: 'bg-yellow-100 text-yellow-600',
	};

	return (
		<Card
			key={mesa.id}
			className="overflow-hidden h-65">
			<CardContent className="p-4 h-full flex flex-col">
				<div className="flex justify-between items-center mb-3">
					<h3 className="text-lg font-bold">{mesa.mesaNome}</h3>
					<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[mesa.status]}`}>
						{mesa.status.charAt(0).toUpperCase() + mesa.status.slice(1)}
					</span>
				</div>

				{mesa.status !== 'livre' && (
					<div className="space-y-2 mb-3">
						<div className="flex items-center text-sm text-gray-600">
							<User className="h-4 w-4 mr-2" />
							<span>{mesa.clienteNome}</span>
						</div>
						<div className="flex items-center text-sm text-gray-600">
							<Users className="h-4 w-4 mr-2" />
							<span>{mesa.guests} pessoas</span>
						</div>
						{mesa.time && (
							<div className="flex items-center text-sm text-gray-600">
								<Clock className="h-4 w-4 mr-2" />
								<span>{mesa.time}</span>
							</div>
						)}
						{mesa.server && (
							<div className="flex items-center text-sm text-gray-600">
								<HandPlatter className="h-4 w-4 mr-2" />
								<span>{mesa.server}</span>
							</div>
						)}
					</div>
				)}

				<div className="flex gap-2 mt-auto">
					<Button
						variant={mesa.status === 'livre' ? 'default' : 'outline'}
						className="flex-1">
						{mesa.status === 'livre' ? 'Ocupar' : 'Ver Detalhes'}
					</Button>
					{mesa.status !== 'livre' && (
						<Button
							variant="outline"
							className="flex-1">
							Liberar
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
