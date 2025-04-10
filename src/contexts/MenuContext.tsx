'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type TableContextType = {
	selectedTable: string;
	setSelectedTable: (table: string) => void;
	customerName: string;
	setCustomerName: (name: string) => void;
	switchTab: boolean;
	setSwitchTab: (name: boolean) => void;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export function MenuContext({
	children,
	switchTab,
	setSwitchTab,
}: {
	children: ReactNode;
	switchTab: boolean;
	setSwitchTab: (name: boolean) => void;
}) {
	const [selectedTable, setSelectedTable] = useState('4');
	const [customerName, setCustomerName] = useState('Floyd Miles');

	return (
		<TableContext.Provider
			value={{ selectedTable, setSelectedTable, customerName, setCustomerName, switchTab, setSwitchTab }}>
			{children}
		</TableContext.Provider>
	);
}

export function useMenu() {
	const context = useContext(TableContext);
	if (context === undefined) {
		throw new Error('useTable must be used within a TableProvider');
	}
	return context;
}
