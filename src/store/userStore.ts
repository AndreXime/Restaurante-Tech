'use client';

import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { restaurantVazio } from '@/lib/restauranteVazio';
import { localDatabase } from '@/lib/localDatabase';
import { ClientDataKeys } from '@/types/ClientDataType';
import { StoreState, StoreActions } from './userStoreType';

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
            'mesaSelecionada',
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
    persist(
        (set, get) => ({
            contabilidade: restaurantVazio.contabilidade,
            config: restaurantVazio.config,
            cardapio: restaurantVazio.cardapio,
            mesaSelecionada: undefined,
            deliverySelecionado: restaurantVazio.deliverySelecionado,
            mesas: [],
            cozinha: [],
            entrega: [],
            loading: true,
            isDemo: false,

            setContabilidade: (updater) =>
                set((state) => ({
                    contabilidade: typeof updater === 'function' ? updater(state.contabilidade) : updater,
                })),

            setConfig: (updater) =>
                set((state) => ({
                    config: typeof updater === 'function' ? updater(state.config) : updater,
                })),

            setCardapio: (updater) =>
                set((state) => ({
                    cardapio: typeof updater === 'function' ? updater(state.cardapio) : updater,
                })),

            setMesas: (updater) =>
                set((state) => ({
                    mesas: typeof updater === 'function' ? updater(state.mesas) : updater,
                })),

            setCozinha: (updater) =>
                set((state) => ({
                    cozinha: typeof updater === 'function' ? updater(state.cozinha) : updater,
                })),

            setEntrega: (updater) =>
                set((state) => ({
                    entrega: typeof updater === 'function' ? updater(state.entrega) : updater,
                })),

            setMesaSelecionada: (updater) =>
                set((state) => {
                    const novaMesa = typeof updater === 'function' ? updater(state.mesaSelecionada) : updater;

                    const mesasAtualizadas = novaMesa
                        ? state.mesas.map((mesa) => (mesa.id === novaMesa.id ? novaMesa : mesa))
                        : state.mesas;

                    return {
                        mesaSelecionada: novaMesa,
                        mesas: mesasAtualizadas,
                    };
                }),

            setDeliverySelecionado: (updater) =>
                set((state) => {
                    const novaEntrega = typeof updater === 'function' ? updater(state.deliverySelecionado) : updater;

                    return {
                        deliverySelecionado: novaEntrega,
                    };
                }),

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
                        mesaSelecionada: data.mesaSelecionada ?? get().mesaSelecionada,
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
    shallow
);
