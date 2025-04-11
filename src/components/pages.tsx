import {
	DeliveryMap,
	DeliveryOrders,
	FinancialSummary,
	OrderGrid,
	RecentTransactions,
	ReservationCalendar,
	ReservationForm,
	SalesChart,
	SettingsTabs,
	TableGrid,
} from '@/components';

export function TableServicePage() {
	return (
		<div className="flex-1 flex overflow-hidden p-4">
			<div className="flex-1 overflow-auto">
				<TableGrid />
			</div>
		</div>
	);
}

export function ReservationsPage() {
	return (
		<div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
			<div className="flex-1 overflow-auto">
				<ReservationCalendar />
			</div>
			<div className="w-full lg:w-[380px] bg-white border rounded-lg">
				<ReservationForm />
			</div>
		</div>
	);
}

export function DeliveryPage() {
	return (
		<div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
			<div className="flex-1">
				<DeliveryOrders />
			</div>
			<div className="w-full lg:w-[500px] bg-white border rounded-lg overflow-hidden">
				<DeliveryMap />
			</div>
		</div>
	);
}
export function KitchenPage() {
	return (
		<div className="flex-1 overflow-auto p-4">
			<OrderGrid />
		</div>
	);
}

export function AccountingPage() {
	return (
		<div className="flex-1 overflow-auto p-4 space-y-4">
			<FinancialSummary />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<SalesChart />
				<RecentTransactions />
			</div>
		</div>
	);
}

export function SettingsPage() {
	return (
		<div className="flex-1 overflow-auto p-4">
			<SettingsTabs />
		</div>
	);
}
