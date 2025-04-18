'use client';

import { Cart, MenuGrid, MenuHeader, SimpleHeader } from '@/components';
import { TableServicePage, KitchenPage, DeliveryPage, SettingsPage, AccountingPage } from '@/components/pages';
import { MenuContext } from '@/contexts/MenuContext';
import { useNav } from '@/contexts/NavContext';

export default function MenuPage() {
	const { Tab } = useNav();

	return (
		<div className="flex flex-col h-full">
			{Tab == 'Cardápio' || Tab == 'Carrinho' ? (
				<MenuContext>
					<MenuHeader />
					<div className="flex-1 flex overflow-hidden p-3">
						<div className="flex-1 overflow-auto">{Tab == 'Cardápio' ? <MenuGrid /> : <Cart />}</div>
					</div>
				</MenuContext>
			) : (
				<div className="flex flex-col h-full">
					<SimpleHeader title={Tab} />
					<div className="flex-1 flex overflow-hidden p-4">
						<div className="flex-1 overflow-auto">
							{Tab == 'Serviços de Mesa' && <TableServicePage />}
							{Tab == 'Contabilidade' && <AccountingPage />}
							{Tab == 'Cozinha' && <KitchenPage />}
							{Tab == 'Entregas' && <DeliveryPage />}
							{Tab == 'Configurações' && <SettingsPage />}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
