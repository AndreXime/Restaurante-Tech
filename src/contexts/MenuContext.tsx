'use client';

import { TablesType } from '@/types/types';
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
	type ReactNode,
	useEffect,
} from 'react';
import { Mesas } from '@/fake-data/menu';

type TableContextType = {
	selectedTable: TablesType;
	setSelectedTable: Dispatch<SetStateAction<TablesType>>;
	searchItem: string;
	setSearchItem: Dispatch<SetStateAction<string>>;
	Tables: TablesType[];
	setTables: Dispatch<SetStateAction<TablesType[]>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export function MenuContext({ children }: { children: ReactNode }) {
	const [searchItem, setSearchItem] = useState('');
	const [selectedTable, setSelectedTable] = useState(Mesas[0]);
	const [Tables, setTables] = useState(Mesas);

	// Recupera os valores do localStorage ao montar o componente
	useEffect(() => {
		const savedTables = localStorage.getItem('tables');

		if (savedTables) {
			try {
				setTables(JSON.parse(savedTables));
			} catch (error) {
				console.error('Erro ao parsear cartItems:', error);
			}
		}
	}, []);

	// Sincroniza selectedTable com Tables ao mudar
	useEffect(() => {
		setTables((prevTables) =>
			prevTables.map((table) => (table.mesaNome === selectedTable.mesaNome ? selectedTable : table))
		);
	}, [selectedTable]);

	// Salva tables com qualquer alteração
	useEffect(() => {
		localStorage.setItem('tables', JSON.stringify(Tables));
	}, [Tables]);

	return (
		<TableContext.Provider
			value={{
				selectedTable,
				setSelectedTable,
				searchItem,
				setSearchItem,
				Tables,
				setTables,
			}}>
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
