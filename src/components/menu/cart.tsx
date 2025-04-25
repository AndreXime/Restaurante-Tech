'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, QrCode, Banknote, Edit2 } from 'lucide-react';
import { useMenu } from '../../contexts/MenuContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export function Cart() {
	const { selectedTable, setSelectedTable, setTables } = useMenu();
	const [tempCustomerName, setTempCustomerName] = useState(selectedTable.clienteNome);
	const [dialogOpen, setDialogOpen] = useState(false);

	const subtotal = selectedTable.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const tax = subtotal * 0.05;
	const total = subtotal + tax;

	const handleSaveCustomer = () => {
		setSelectedTable({ ...selectedTable, clienteNome: tempCustomerName });
		setTables((prev) =>
			prev.map((item) => (item.mesaNome === selectedTable.mesaNome ? { ...item, clienteNome: tempCustomerName } : item))
		);
		setDialogOpen(false);
	};

	return (
		<div className=" bg-white border-l flex flex-col h-full">
			<div className="p-4 border-b flex justify-between items-center">
				<div>
					<div className="flex items-baseline justify-center gap-3">
						<h2 className="text-xl font-bold">Mesa {selectedTable.mesaNome}</h2>
						<span className="text-gray-500 text-sm">Cliente: {selectedTable.clienteNome}</span>
					</div>
				</div>
				<Dialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							size="sm">
							<Edit2 className="h-4 w-4 mr-1" />
							Cliente
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Informações do Cliente</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="customer-name">Nome do Cliente</Label>
								<Input
									id="customer-name"
									value={tempCustomerName}
									onChange={(e) => setTempCustomerName(e.target.value)}
								/>
							</div>
							<Button
								onClick={handleSaveCustomer}
								className="w-full">
								Salvar
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="flex-1 overflow-auto p-4">
				{selectedTable.products.length == 0 && (
					<h2 className="text-xl font-bold text-center">Nenhum produto foi adicionado</h2>
				)}
				{selectedTable.products.map((item, index) => (
					<div
						key={index}
						className="flex items-center gap-3 mb-4">
						<Image
							src={item.image}
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
						className="flex-1 rounded-full">
						No Local
					</Button>
					<Button
						variant="outline"
						className="flex-1 rounded-full">
						Retirar
					</Button>
					<Button
						variant="outline"
						className="flex-1 rounded-full">
						Entrega
					</Button>
				</div>
				<div className="grid grid-cols-3 gap-2 mb-4">
					<Button
						variant="outline"
						className="flex flex-row items-center py-2">
						<Banknote className="h-5 w-5 mb-1" />
						<span className="text-xs">Dinheiro</span>
					</Button>
					<Button
						variant="outline"
						className="flex flex-row items-center py-2">
						<CreditCard className="h-5 w-5 mb-1" />
						<span className="text-xs">Cartão</span>
					</Button>
					<Button
						variant="outline"
						className="flex flex-row items-center py-2">
						<QrCode className="h-5 w-5 mb-1" />
						<span className="text-xs">QR Code</span>
					</Button>
				</div>
				<Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">Fazer Pedido</Button>
			</div>
		</div>
	);
}
