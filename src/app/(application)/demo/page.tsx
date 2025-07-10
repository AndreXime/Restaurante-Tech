'use client';

import { Cart, MenuGrid, MenuHeader, SimpleHeader } from '@/components';
import { DeliveryCart } from '@/components/delivery/deliveryCart';
import { TableServicePage, KitchenPage, DeliveryPage, SettingsPage, AccountingPage } from '@/components/pages';
import { useNavStore } from '@/store/navStore';

export default function MenuPage() {
    const activeTab = useNavStore((state) => state.activeTab);

    const ActiveTab = () => {
        switch (activeTab) {
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
            case 'Criar Delivery/Retirada':
                return <DeliveryCart />;
            default:
                return <Cart />;
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab == 'Cardápio' || activeTab == 'Carrinho' ? <MenuHeader /> : <SimpleHeader title={activeTab} />}
            <div className="flex-1 flex flex-col overflow-auto space-y-4 p-3">
                <ActiveTab />
            </div>
        </div>
    );
}
