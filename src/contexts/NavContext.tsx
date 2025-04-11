'use client';

import { createContext, type Dispatch, type SetStateAction, useContext, useState, type ReactNode } from 'react';

type NavContextType = {
	mobileMenu: boolean;
	setMobileMenu: Dispatch<SetStateAction<boolean>>;
	Tab: string;
	setTab: Dispatch<SetStateAction<string>>;
};

const MobileContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [Tab, setTab] = useState('Cardápio');

	return <MobileContext.Provider value={{ mobileMenu, setMobileMenu, Tab, setTab }}>{children}</MobileContext.Provider>;
}

export function useNav() {
	const context = useContext(MobileContext);
	if (context === undefined) {
		throw new Error('useTable must be used within a MobileProvider');
	}
	return context;
}
