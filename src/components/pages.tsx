'use client';
import {
    Cart,
    DeliveryOrders,
    FinancialSummary,
    MenuGrid,
    MenuHeader,
    OrderGrid,
    RecentTransactions,
    SettingsTabs,
    SimpleHeader,
    TableGrid,
} from '@/components';
import { useNavStore } from '@/store/navStore';
import { DeliveryCart } from './delivery/deliveryCart';

export function TableServicePage() {
    return <TableGrid />;
}

export function DeliveryPage() {
    return <DeliveryOrders />;
}
export function KitchenPage() {
    return <OrderGrid />;
}

export function AccountingPage() {
    return (
        <>
            <FinancialSummary />
            <RecentTransactions />
        </>
    );
}

export function SettingsPage() {
    return <SettingsTabs />;
}

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
