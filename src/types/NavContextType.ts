import { type Dispatch, type SetStateAction } from 'react';

type NavContextType = {
	mobileMenu: boolean;
	setMobileMenu: Dispatch<SetStateAction<boolean>>;
	Tab: string;
	setTab: Dispatch<SetStateAction<string>>;
	searchItem: string;
	setSearchItem: Dispatch<SetStateAction<string>>;
};

export default NavContextType;
