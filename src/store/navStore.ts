import { create } from 'zustand';

export type possibleTabs =
    | 'Serviços de Mesa'
    | 'Contabilidade'
    | 'Cardápio'
    | 'Cozinha'
    | 'Entregas'
    | 'Configurações'
    | 'Carrinho'
    | 'Criar Delivery/Retirada';

type NavState = {
    mobileMenu: boolean;
    searchItem: string;
    activeTab: possibleTabs;
    modoDelivery: boolean;
};

type NavActions = {
    toggleMobileMenu: () => void;
    setSearchItem: (item: string) => void;
    setActiveTab: (tab: possibleTabs, keepModoDelivery?: boolean) => void;
    resetNav: () => void;
};

const initialState: NavState = {
    mobileMenu: false,
    searchItem: '',
    activeTab: 'Cardápio',
    modoDelivery: false,
};

// Cria o store
export const useNavStore = create<NavState & NavActions>((set) => ({
    ...initialState,

    toggleMobileMenu: () => set((state) => ({ mobileMenu: !state.mobileMenu })),

    setSearchItem: (item) => set({ searchItem: item }),

    setActiveTab: (tab, keepModoDelivery = false) =>
        set(() => ({
            activeTab: tab,
            modoDelivery: keepModoDelivery,
        })),

    resetNav: () => set(initialState),
}));
