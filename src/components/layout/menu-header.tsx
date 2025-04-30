'use client';

import { LucideShoppingCart, Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '../../contexts/DataContext';
import { useNav } from '@/contexts/NavContext';

export function MenuHeader() {
	const { mesaSelecionada, setMesaSelecionada, Mesas } = useData();
	const { setTab, Tab, setMobileMenu, setSearchItem } = useNav();

	return (
		<div className="bg-white p-4 flex flex-col md:flex-row items-center gap-3 border-b">
			{/* Botão flutuante para telas pequenas */}
			<div className="flex items-center justify-between md:justify-start gap-5 flex-1 w-full">
				<div className="flex flex-row gap-5">
					<div className="lg:hidden flex items-center shrink-0">
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
						{mesaSelecionada.products.length > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
								{mesaSelecionada.products.length}
							</span>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Select
						value={mesaSelecionada.mesaNome}
						onValueChange={(mesaNome) => setMesaSelecionada(Mesas.find((table) => table.mesaNome === mesaNome)!)}>
						<SelectTrigger>
							<SelectValue placeholder="Selecionar Mesa" />
						</SelectTrigger>
						<SelectContent>
							{Mesas.map((mesa) => (
								<SelectItem
									key={mesa.mesaNome}
									value={mesa.mesaNome}
									className="text-sm">
									{`${mesa.mesaNome}`}
									<span className="hidden sm:block"> - {mesa.clienteNome}</span>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			{Tab === 'Cardápio' && (
				<div className="flex-2 relative w-full">
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
			)}
		</div>
	);
}
