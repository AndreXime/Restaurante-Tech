'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import NavContextType from '@/types/NavContextType';

const MobileContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [Tab, setTab] = useState('Cardápio');

	return (
		<MobileContext.Provider value={{ searchItem, setSearchItem, mobileMenu, setMobileMenu, Tab, setTab }}>
			{children}
		</MobileContext.Provider>
	);
}

export function useNav() {
	const context = useContext(MobileContext);
	if (context === undefined) {
		throw new Error('useTable must be used within a MobileProvider');
	}
	return context;
}
