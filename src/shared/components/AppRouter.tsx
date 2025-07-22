'use client';

import { useNavStore } from '@/store/navStore';
import { DeliveryCart } from '../../modules/delivery/DeliveryCart';
import { FinancialSummary } from '@/modules/accounting/AccountingSummary';
import { RecentTransactions } from '@/modules/accounting/AccountingTransactions';
import { DeliveryOrders } from '@/modules/delivery/DeliveryOrders';
import { OrderGrid } from '@/modules/kitchen/KitchenOrders';
import { Cart } from '@/modules/menu/MenuCart';
import { MenuGrid } from '@/modules/menu/MenuGrid';
import { SettingsTabs } from '@/modules/settings/SettingsTabs';
import { TableGrid } from '@/modules/tables/TableOrders';
import { MenuHeader } from '@/shared/components/MenuHeader';
import { SimpleHeader } from '@/shared/components/SimpleHeader';
import { Popup } from './PopupStack';
import HowToUse from '@/modules/howtouse/howtouse';

export default function MenuPage() {
    const activeTab = useNavStore((state) => state.activeTab);

    const ActiveTab = tabComponents[activeTab] || Cart;
    const isMenu = activeTab === 'Cardápio' || activeTab === 'Carrinho';

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {isMenu ? <MenuHeader /> : <SimpleHeader title={activeTab} />}
            <div className="flex-1 flex flex-col overflow-auto space-y-4 p-3">
                <ActiveTab />
            </div>
            <Popup />
        </div>
    );
}

const tabComponents: Record<string, React.ComponentType> = {
    'Serviços de Mesa': () => <TableGrid />,
    Contabilidade: () => (
        <>
            <FinancialSummary />
            <RecentTransactions />
        </>
    ),
    Cozinha: () => <OrderGrid />,
    Entregas: () => <DeliveryOrders />,
    Configurações: () => <SettingsTabs />,
    Cardápio: () => <MenuGrid />,
    'Criar Delivery/Retirada': () => <DeliveryCart />,
    Carrinho: () => <Cart />,
    'Como usar?': () => <HowToUse />,
};
