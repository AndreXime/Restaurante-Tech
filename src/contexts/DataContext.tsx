'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { restaurantVazio } from '@/fake-data/RestauranteTemplate';
import { carregarTudo } from '@/lib/localDatabase';
import DataContextType from '@/types/DataContextType';
import { CardapioType, ConfigType, ContabilidadeType, DeliveryType, KitchenOrderType, TablesType } from '@/types/types';
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
	const [Contabilidade, setContabilidade] = useState<ContabilidadeType>(restaurantVazio.contabilidade);
	const [Config, setConfig] = useState<ConfigType>(restaurantVazio.config);
	const [Cardapio, setCardapio] = useState<CardapioType>(restaurantVazio.cardapio);
	const [mesaSelecionada, setMesaSelecionada] = useState<TablesType>(restaurantVazio.mesaSelecionada);
	const [Mesas, setMesas] = useState<TablesType[]>([]);
	const [Cozinha, setCozinha] = useState<KitchenOrderType[]>([]);
	const [Entrega, setEntrega] = useState<DeliveryType[]>([]);

	const [loading, setLoading] = useState(true);

	// Recupera os valores do indexedDB ao iniciar o dashboard
	useEffect(() => {
		async function carregarDados() {
			try {
				const dados = await carregarTudo();
				// Se for undefined manter o valor padrao
				setMesas((prev) => dados.mesas ?? prev);
				setContabilidade((prev) => dados.contabilidade ?? prev);
				setConfig((prev) => dados.config ?? prev);
				setCozinha((prev) => dados.cozinha ?? prev);
				setEntrega((prev) => dados.entrega ?? prev);
				setCardapio((prev) => dados.cardapio ?? prev);
				setMesaSelecionada((prev) => dados.mesaSelecionada ?? prev);
			} catch (err) {
				throw Error('Erro carregando dados do IndexedDB' + err);
			} finally {
				setLoading(false);
			}
		}

		carregarDados();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<DataContext.Provider
			value={{
				mesaSelecionada,
				Mesas,
				Config,
				Entrega,
				Contabilidade,
				Cardapio,
				Cozinha,
				setMesaSelecionada,
				setMesas,
				setConfig,
				setCardapio,
				setContabilidade,
				setCozinha,
				setEntrega,
			}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error('useData must be used within a DataProvider');
	}
	return context;
}
