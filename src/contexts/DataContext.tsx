'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { carregarTudo, salvarData } from '@/lib/localDatabase';
import { TableContextType } from '@/types/TableContextType';
import { CardapioType, ConfigType, ContabilidadeType, DeliveryType, KitchenOrderType, TablesType } from '@/types/types';
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext<TableContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
	const [Mesas, setMesas] = useState<TablesType[]>([]);
	const [Contabilidade, setContabilidade] = useState<ContabilidadeType>({ resumo: [], transacoes: [] });
	const [Config, setConfig] = useState<ConfigType>({
		geralData: { restaurantName: '', address: '', phone: '', email: '', taxRate: '', currency: '' },
		funcionarios: [],
	});
	const [Cozinha, setCozinha] = useState<KitchenOrderType[]>([]);
	const [Entrega, setEntrega] = useState<DeliveryType[]>([]);
	const [Cardapio, setCardapio] = useState<CardapioType>({ categorias: [], pratos: [] });

	const [loading, setLoading] = useState(true);

	const [selectedTable, setSelectedTable] = useState<TablesType>({
		id: 0,
		guests: 0,
		status: 'livre',
		time: '',
		server: '',
		mesaNome: '',
		clienteNome: '',
		products: [],
	});

	// Recupera os valores do bd local ao montar o componente
	useEffect(() => {
		async function carregarDados() {
			try {
				const dados = await carregarTudo();
				// O operador ?? é usado porque pode retornar undefined e é melhor ter a estrutura vazia doq isso
				setMesas(dados.mesas ?? Mesas);
				setContabilidade(dados.contabilidade ?? Contabilidade);
				setConfig(dados.config ?? Config);
				setCozinha(dados.cozinha ?? Cozinha);
				setEntrega(dados.entrega ?? Entrega);
				setCardapio(dados.cardapio ?? Cardapio);
				setSelectedTable(dados.mesas[0] ?? selectedTable);
			} catch (err) {
				throw Error('Erro carregando dados do IndexedDB' + err);
			} finally {
				setLoading(false);
			}
		}

		carregarDados();
	}, []);

	// Sincroniza selectedTable com Tables ao mudar
	useEffect(() => {
		if (!selectedTable || !Mesas) return;

		setMesas(
			(prevTables) =>
				prevTables ? prevTables.map((table) => (table.mesaNome === selectedTable.mesaNome ? selectedTable : table)) : [] // Se prevTables for undefined, devolve um array vazio
		);
	}, [selectedTable]);

	// Salva os dados com qualquer alteração
	useEffect(() => {
		const salvarDados = async () => {
			if (Mesas) await salvarData('mesas', Mesas);
			if (Contabilidade) await salvarData('contabilidade', Contabilidade);
			if (Config) await salvarData('config', Config);
			if (Cozinha) await salvarData('cozinha', Cozinha);
			if (Entrega) await salvarData('entrega', Entrega);
			if (Cardapio) await salvarData('cardapio', Cardapio);
		};
		salvarDados();
	}, [Mesas, Contabilidade, Config, Cozinha, Entrega, Cardapio]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<DataContext.Provider
			value={{
				selectedTable,
				Mesas,
				Config,
				Entrega,
				Contabilidade,
				Cardapio,
				Cozinha,
				setSelectedTable,
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
		throw new Error('useTable must be used within a DataProvider');
	}
	return context;
}
