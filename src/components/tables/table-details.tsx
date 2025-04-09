import { Button } from '@/components/ui/button';
import { CreditCard, QrCode, Banknote, Plus } from 'lucide-react';
import Image from 'next/image';

const orderItems = [
	{ title: 'Hambúrguer de Carne Original com Batatas (Não Veg)', price: 23.99, quantity: 1 },
	{ title: 'Suco de Laranja Fresco com Sementes de Manjericão Sem Açúcar (Veg)', price: 12.99, quantity: 1 },
];

export function TableDetails() {
	const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const tax = subtotal * 0.05;
	const total = subtotal + tax;

	return (
		<div className="w-[380px] bg-white border-l flex flex-col h-full">
			<div className="p-4 border-b">
				<div>
					<h2 className="text-xl font-bold">Mesa 4</h2>
					<p className="text-sm text-gray-500">Carlos Santos - 3 pessoas</p>
				</div>
			</div>
			<div className="p-4 border-b">
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-600">Tempo: 45 minutos</span>
					<Button
						variant="outline"
						size="sm"
						className="gap-1">
						<Plus className="h-4 w-4" />
						Adicionar Item
					</Button>
				</div>
			</div>
			<div className="flex-1 overflow-auto p-4">
				{orderItems.map((item, index) => (
					<div
						key={index}
						className="flex items-center gap-3 mb-4">
						<Image
							src="placeholder-food.png"
							alt={item.title}
							width={500}
							height={500}
							className="w-16 h-16 rounded-lg object-cover"
						/>
						<div className="flex-1">
							<h4 className="text-sm font-medium">{item.title}</h4>
							<div className="flex justify-between items-center mt-1">
								<span className="text-green-600 font-bold">R${item.price.toFixed(2)}</span>
								<span className="text-sm text-gray-500">{item.quantity}X</span>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="border-t p-4">
				<div className="space-y-2 mb-4">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Subtotal</span>
						<span>R${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Imposto 5%</span>
						<span>R${tax.toFixed(2)}</span>
					</div>
					<div className="flex justify-between font-bold">
						<span>Valor Total</span>
						<span>R${total.toFixed(2)}</span>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2 mb-4">
					<Button
						variant="outline"
						className="flex flex-col items-center py-2">
						<Banknote className="h-5 w-5 mb-1" />
						<span className="text-xs">Dinheiro</span>
					</Button>
					<Button
						variant="outline"
						className="flex flex-col items-center py-2">
						<CreditCard className="h-5 w-5 mb-1" />
						<span className="text-xs">Cartão</span>
					</Button>
					<Button
						variant="outline"
						className="flex flex-col items-center py-2">
						<QrCode className="h-5 w-5 mb-1" />
						<span className="text-xs">QR Code</span>
					</Button>
				</div>
				<Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">Fechar Conta</Button>
			</div>
		</div>
	);
}
