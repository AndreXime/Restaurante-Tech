'use client';

import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage, StateStorage, devtools } from 'zustand/middleware';
import { restaurantVazio } from '@/shared/lib/dataState/restauranteVazio';
import { localDatabase } from '@/shared/lib/dataState/localDatabase';
import { ClientDataKeys } from '@/types/ClientDataType';
import { StoreState, StoreActions } from '@/types/userStoreType';
import { CalculateResumo } from '@/modules/accounting/accountingActions';

const indexedDBStorage: StateStorage = {
    getItem: async (): Promise<string | null> => {
        const data = await localDatabase.carregarClient();
        return JSON.stringify({ state: data });
    },
    setItem: async (_name: string, value: string): Promise<void> => {
        const { state } = JSON.parse(value) as { state: StoreState };

        if (state.isDemo) {
            return;
        }

        const keysToSave: ClientDataKeys[] = [
            'cardapio',
            'mesas',
            'config',
            'entrega',
            'contabilidade',
            'cozinha',
            'mesaSelecionadaId',
            'deliverySelecionado',
        ];

        for (const key of keysToSave) {
            if (state[key] !== undefined) {
                await localDatabase.salvarData(key, state[key]);
            }
        }
    },
    removeItem: (): void | Promise<void> => {},
};

export const useDataStore = createWithEqualityFn<StoreState & StoreActions>()(
    devtools(
        persist(
            (set, get) => ({
                ...restaurantVazio,
                loading: true,
                isDemo: false,

                setContabilidade: (updater) =>
                    set((state) => {
                        const updated = typeof updater === 'function' ? updater(state.contabilidade) : updater;

                        const newResumo = CalculateResumo(updated.transacoes);

                        return {
                            contabilidade: {
                                ...updated,
                                resumo: newResumo,
                            },
                        };
                    }),

                setConfig: (updater) =>
                    set((state) => ({
                        config: typeof updater === 'function' ? updater(state.config) : updater,
                    })),

                setCardapio: (updater) =>
                    set((state) => ({
                        cardapio: typeof updater === 'function' ? updater(state.cardapio) : updater,
                    })),

                setCozinha: (updater) =>
                    set((state) => ({
                        cozinha: typeof updater === 'function' ? updater(state.cozinha) : updater,
                    })),

                setEntrega: (updater) =>
                    set((state) => ({
                        entrega: typeof updater === 'function' ? updater(state.entrega) : updater,
                    })),

                setMesas: (updater) =>
                    set((state) => ({
                        mesas: typeof updater === 'function' ? updater(state.mesas) : updater,
                    })),

                setMesaSelecionadaId: (updater) =>
                    set((state) => ({
                        mesaSelecionadaId: typeof updater === 'function' ? updater(state.mesaSelecionadaId) : updater,
                    })),

                setDeliverySelecionado: (updater) =>
                    set((state) => ({
                        deliverySelecionado:
                            typeof updater === 'function' ? updater(state.deliverySelecionado) : updater,
                    })),

                loadInitialData: async (demo = false) => {
                    set({ loading: true, isDemo: demo });
                    try {
                        const data = demo ? await localDatabase.carregarDemo() : await localDatabase.carregarClient();

                        set({
                            mesas: data.mesas ?? get().mesas,
                            contabilidade: data.contabilidade ?? get().contabilidade,
                            config: data.config ?? get().config,
                            cozinha: data.cozinha ?? get().cozinha,
                            entrega: data.entrega ?? get().entrega,
                            cardapio: data.cardapio ?? get().cardapio,
                            mesaSelecionadaId: data.mesaSelecionadaId ?? get().mesaSelecionadaId,
                            deliverySelecionado: data.deliverySelecionado ?? get().deliverySelecionado,
                        });
                    } catch (error) {
                        console.error('Zustand - Erro carregando dados:', error);
                    } finally {
                        set({ loading: false });
                    }
                },
            }),

            {
                name: 'restaurante-storage',
                storage: createJSONStorage(() => indexedDBStorage),
            }
        ),
        { name: 'useDataStore' } // nome visível no Redux DevTools
    ),

    shallow
);
