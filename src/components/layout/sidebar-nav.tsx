'use client';

import {
	Menu,
	TableIcon as TableBar,
	CalendarRange,
	Truck,
	Calculator,
	Settings,
	LogOut,
	ChefHat,
	CookingPot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
	{ icon: Menu, label: 'Cardápio', path: '/', color: 'text-green-600' },
	{ icon: TableBar, label: 'Serviços de Mesa', path: '/servicos-mesa', color: 'text-gray-600' },
	{ icon: ChefHat, label: 'Cozinha', path: '/cozinha', color: 'text-gray-600' },
	{ icon: CalendarRange, label: 'Reservas', path: '/reservas', color: 'text-gray-600' },
	{ icon: Truck, label: 'Entrega', path: '/entrega', color: 'text-gray-600' },
	{ icon: Calculator, label: 'Contabilidade', path: '/contabilidade', color: 'text-gray-600' },
	{ icon: Settings, label: 'Configurações', path: '/configuracoes', color: 'text-gray-600' },
];

export function SidebarNav() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="w-64 p-4 border-r h-screen">
			<div className="flex items-center gap-2 mb-8">
				<CookingPot className="w-8 h-8" />
				<span className="font-semibold">Restaurante Tech</span>
			</div>
			<nav className="space-y-2">
				{navItems.map((item, index) => {
					const isActive = pathname === item.path;
					return (
						<Button
							key={index}
							variant="ghost"
							className={`w-full justify-start hover:bg-green-200 ${
								isActive ? 'bg-green-50 text-green-600' : item.color
							}`}
							onClick={() => router.push(item.path)}>
							<item.icon className="mr-2 h-4 w-4" />
							{item.label}
						</Button>
					);
				})}
				<Button
					variant="ghost"
					className="w-full justify-start mt-auto text-gray-600 hover:bg-green-200">
					<LogOut className="mr-2 h-4 w-4" />
					Sair
				</Button>
			</nav>
		</div>
	);
}
