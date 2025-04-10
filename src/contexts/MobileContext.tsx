'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type TableContextType = {
	mobileMenu: boolean;
	setMobileMenu: (name: boolean) => void;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
	const [mobileMenu, setMobileMenu] = useState(false);

	return <TableContext.Provider value={{ mobileMenu, setMobileMenu }}>{children}</TableContext.Provider>;
}

export function useMobile() {
	const context = useContext(TableContext);
	if (context === undefined) {
		throw new Error('useTable must be used within a TableProvider');
	}
	return context;
}
