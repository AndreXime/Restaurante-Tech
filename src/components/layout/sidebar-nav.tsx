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
	X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMobile } from '@/contexts/MobileContext';

const navItems = [
	{ icon: Menu, label: 'Cardápio', path: '/' },
	{ icon: TableBar, label: 'Serviços de Mesa', path: '/servicos-mesa' },
	{ icon: ChefHat, label: 'Cozinha', path: '/cozinha' },
	{ icon: CalendarRange, label: 'Reservas', path: '/reservas' },
	{ icon: Truck, label: 'Entrega', path: '/entrega' },
	{ icon: Calculator, label: 'Contabilidade', path: '/contabilidade' },
	{ icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export function SidebarNav() {
	const pathname = usePathname();
	const { mobileMenu, setMobileMenu } = useMobile();

	return (
		<>
			<div className="hidden lg:block w-60 p-4 border-r h-screen">
				<div className="flex items-center gap-2 mb-8">
					<CookingPot className="w-8 h-8" />
					<span className="font-semibold">Restaurante Tech</span>
				</div>
				<nav className="space-y-2">
					{navItems.map((item, index) => (
						<Link
							key={index}
							href={item.path}>
							<Button
								variant="ghost"
								className={`w-full justify-start hover:bg-green-200 ${
									pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-600'
								}`}>
								<item.icon className="mr-2 h-4 w-4" />
								{item.label}
							</Button>
						</Link>
					))}
					<Button
						variant="ghost"
						className="w-full justify-start mt-auto text-gray-600 hover:bg-green-200">
						<LogOut className="mr-2 h-4 w-4" />
						Sair
					</Button>
				</nav>
			</div>

			{/* Sidebar overlay para telas pequenas */}
			{mobileMenu && (
				<div className="fixed inset-0 z-50 ">
					<div
						className="absolute top-0 left-0 w-full h-full bg-white p-4"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex justify-between flex-row w-full mb-8">
							<div className="flex items-center gap-2 ">
								<CookingPot className="w-8 h-8" />
								<span className="font-semibold">Restaurante Tech</span>
							</div>
							<X
								className="w-8 h-8"
								onClick={() => setMobileMenu(false)}
							/>
						</div>
						<nav className="space-y-2 flex flex-col h-full">
							{navItems.map((item, index) => (
								<Link
									key={index}
									href={item.path}>
									<Button
										onClick={() => setMobileMenu(false)}
										variant="ghost"
										className={`w-full justify-start hover:bg-green-200 ${
											pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-600'
										}`}>
										<item.icon className="mr-2 h-4 w-4" />
										{item.label}
									</Button>
								</Link>
							))}
							<Button
								variant="ghost"
								className="w-full justify-start mt-auto text-gray-600 hover:bg-green-200">
								<LogOut className="mr-2 h-4 w-4" />
								Sair
							</Button>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}
