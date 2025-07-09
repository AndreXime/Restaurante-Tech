import { create } from 'zustand';

export type possibleTabs =
    | 'Serviços de Mesa'
    | 'Contabilidade'
    | 'Cardápio'
    | 'Cozinha'
    | 'Entregas'
    | 'Configurações'
    | 'Carrinho';

type NavState = {
    mobileMenu: boolean;
    searchItem: string;
    activeTab: possibleTabs;
};

type NavActions = {
    toggleMobileMenu: () => void;
    setSearchItem: (item: string) => void;
    setActiveTab: (tab: possibleTabs) => void;
    resetNav: () => void;
};

const initialState: NavState = {
    mobileMenu: false,
    searchItem: '',
    activeTab: 'Cardápio',
};

// Cria o store
export const useNavStore = create<NavState & NavActions>((set) => ({
    ...initialState,

    toggleMobileMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),

    setSearchItem: (item) => set({ searchItem: item }),

    setActiveTab: (tab) => set({ activeTab: tab }),

    resetNav: () => set(initialState),
}));
