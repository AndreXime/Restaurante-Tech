import { DeliveryOrders, FinancialSummary, OrderGrid, RecentTransactions, SettingsTabs, TableGrid } from '@/components';

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
