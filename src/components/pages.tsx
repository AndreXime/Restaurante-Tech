import { DeliveryOrders, FinancialSummary, OrderGrid, RecentTransactions, SettingsTabs, TableGrid } from '@/components';

export function TableServicePage() {
	return (
		<div className="flex-1 flex overflow-hidden">
			<div className="flex-1 overflow-auto">
				<TableGrid />
			</div>
		</div>
	);
}

export function DeliveryPage() {
	return (
		<div className="flex-1 flex flex-col lg:flex-row gap-4">
			<div className="flex-1">
				<DeliveryOrders />
			</div>
		</div>
	);
}
export function KitchenPage() {
	return (
		<div className="flex-1 overflow-auto">
			<OrderGrid />
		</div>
	);
}

export function AccountingPage() {
	return (
		<div className="flex-1 overflow-auto space-y-4">
			<FinancialSummary />
			<div className="grid grid-cols-1">
				<RecentTransactions />
			</div>
		</div>
	);
}

export function SettingsPage() {
	return (
		<div className="flex-1 overflow-auto pt-2">
			<SettingsTabs />
		</div>
	);
}
