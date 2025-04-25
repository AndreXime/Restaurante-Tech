'use client';

import { LucideShoppingCart, Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMenu } from '../../contexts/MenuContext';
import { useNav } from '@/contexts/NavContext';

export function MenuHeader() {
	const { selectedTable, setSelectedTable, setSearchItem, Tables } = useMenu();
	const { setTab, Tab, setMobileMenu } = useNav();

	return (
		<div className="bg-white p-4 flex items-center gap-5 border-b">
			{/* Botão flutuante para telas pequenas */}
			<div className="lg:hidden flex items-center">
				<button
					onClick={() => setMobileMenu(true)}
					className="rounded-full">
					<Menu
						size={25}
						className="w-full h-full"
					/>
				</button>
			</div>
			<div
				className="relative cursor-pointer"
				onClick={() => setTab(Tab == 'Cardápio' ? 'Carrinho' : 'Cardápio')}>
				<LucideShoppingCart className="w-6 h-6" />
				{selectedTable.products.length > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
						{selectedTable.products.length}
					</span>
				)}
			</div>
			<div className="flex items-center gap-2">
				<Select
					value={selectedTable.mesaNome}
					onValueChange={(mesaNome) => setSelectedTable(Tables.find((table) => table.mesaNome === mesaNome)!)}>
					<SelectTrigger>
						<SelectValue placeholder="Selecionar Mesa" />
					</SelectTrigger>
					<SelectContent>
						{Tables.map((mesa) => (
							<SelectItem
								key={mesa.mesaNome}
								value={mesa.mesaNome}>
								{`${mesa.mesaNome} - ${mesa.clienteNome}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex-1 relative">
				<Search
					size={20}
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				/>
				<Input
					type="text"
					placeholder="Buscar produto aqui..."
					className="pl-10 w-full text-sm"
					onChange={(e) => setSearchItem(e.target.value)}
				/>
			</div>
		</div>
	);
}
