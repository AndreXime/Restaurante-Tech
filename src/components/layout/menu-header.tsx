'use client';

import { LucideShoppingCart, Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMenu } from '../../contexts/MenuContext';
import { useMobile } from '@/contexts/MobileContext';
import { cartItems } from '@/fake-data/cartItems';

export function Header() {
	const { selectedTable, setSelectedTable, setSwitchTab, switchTab } = useMenu();
	const { setMobileMenu } = useMobile();

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
				onClick={() => setSwitchTab(!switchTab)}>
				<LucideShoppingCart className="w-6 h-6" />
				{cartItems.length > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
						{cartItems.length}
					</span>
				)}
			</div>
			<div className="flex items-center gap-2">
				<Select
					value={selectedTable}
					onValueChange={setSelectedTable}>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Selecionar Mesa" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Mesa 1</SelectItem>
						<SelectItem value="2">Mesa 2</SelectItem>
						<SelectItem value="3">Mesa 3</SelectItem>
						<SelectItem value="4">Mesa 4</SelectItem>
						<SelectItem value="5">Mesa 5</SelectItem>
						<SelectItem value="6">Mesa 6</SelectItem>
						<SelectItem value="7">Mesa 7</SelectItem>
						<SelectItem value="8">Mesa 8</SelectItem>
						<SelectItem value="9">Mesa 9</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex-1 relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				<Input
					type="text"
					placeholder="Buscar produto aqui..."
					className="pl-10 w-full"
				/>
			</div>
		</div>
	);
}
