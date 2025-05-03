'use client';

import { Cart, MenuGrid, MenuHeader, SimpleHeader } from '@/components';
import { TableServicePage, KitchenPage, DeliveryPage, SettingsPage, AccountingPage } from '@/components/pages';
import { useNav } from '@/contexts/NavContext';
import useAutoSave from '@/hooks/useAutoSave';

export default function MenuPage() {
	const { Tab } = useNav();

	// Habilita salvamento automatico
	useAutoSave();

	const ActiveTab = () => {
		switch (Tab) {
			case 'Serviços de Mesa':
				return <TableServicePage />;
			case 'Contabilidade':
				return <AccountingPage />;
			case 'Cozinha':
				return <KitchenPage />;
			case 'Entregas':
				return <DeliveryPage />;
			case 'Configurações':
				return <SettingsPage />;
			case 'Cardápio':
				return <MenuGrid />;
			default:
				return <Cart />;
		}
	};

	return (
		<div className="flex-1 flex flex-col overflow-hidden">
			{Tab == 'Cardápio' || Tab == 'Carrinho' ? <MenuHeader /> : <SimpleHeader title={Tab} />}
			<div className="flex-1 flex flex-col overflow-auto space-y-4 p-3">
				<ActiveTab />
			</div>
		</div>
	);
}
