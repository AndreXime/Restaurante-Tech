'use client';

import { FoodCartType } from '@/types/types';
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
	type ReactNode,
	useEffect,
} from 'react';

type TableContextType = {
	selectedTable: string;
	setSelectedTable: (table: string) => void;
	customerName: string;
	setCustomerName: (name: string) => void;
	cartItems: FoodCartType[];
	setCartItems: Dispatch<SetStateAction<FoodCartType[]>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export function MenuContext({ children }: { children: ReactNode }) {
	const [selectedTable, setSelectedTable] = useState('1');
	const [customerName, setCustomerName] = useState('Floyd Miles');
	const [cartItems, setCartItems] = useState<FoodCartType[]>([]);

	// Recupera os valores do localStorage ao montar o componente
	useEffect(() => {
		const savedSelectedTable = localStorage.getItem('selectedTable');
		const savedCustomerName = localStorage.getItem('customerName');
		const savedCartItems = localStorage.getItem('cartItems');

		if (savedSelectedTable) setSelectedTable(savedSelectedTable);
		if (savedCustomerName) setCustomerName(savedCustomerName);
		if (savedCartItems) {
			try {
				setCartItems(JSON.parse(savedCartItems));
			} catch (error) {
				console.error('Erro ao parsear cartItems:', error);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedTable', selectedTable);
		localStorage.setItem('customerName', customerName);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [selectedTable, customerName, cartItems]);

	return (
		<TableContext.Provider
			value={{ selectedTable, setSelectedTable, customerName, setCustomerName, cartItems, setCartItems }}>
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
