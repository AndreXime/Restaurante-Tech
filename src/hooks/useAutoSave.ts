import { useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { localDatabase } from '@/lib/localDatabase';

export default function useAutoSave() {
	const { Mesas, Contabilidade, Config, Cozinha, Entrega, Cardapio, mesaSelecionada, setMesas } = useData();

	useEffect(() => {
		const salvarMesas = async () => {
			await localDatabase.salvarData('mesas', Mesas);
		};
		salvarMesas();
	}, [Mesas]);

	useEffect(() => {
		const salvarContabilidade = async () => {
			await localDatabase.salvarData('contabilidade', Contabilidade);
		};
		salvarContabilidade();
	}, [Contabilidade]);

	useEffect(() => {
		const salvarConfig = async () => {
			await localDatabase.salvarData('config', Config);
		};
		salvarConfig();
	}, [Config]);

	useEffect(() => {
		const salvarCozinha = async () => {
			await localDatabase.salvarData('cozinha', Cozinha);
		};
		salvarCozinha();
	}, [Cozinha]);

	useEffect(() => {
		const salvarEntrega = async () => {
			await localDatabase.salvarData('entrega', Entrega);
		};
		salvarEntrega();
	}, [Entrega]);

	useEffect(() => {
		const salvarCardapio = async () => {
			await localDatabase.salvarData('cardapio', Cardapio);
		};
		salvarCardapio();
	}, [Cardapio]);

	useEffect(() => {
		const salvarMesaSelecionada = async () => {
			await localDatabase.salvarData('mesaSelecionada', mesaSelecionada);
		};

		// Sincroniza mesaSelecionada com Tables ao mudar
		setMesas((prevTables) =>
			prevTables.map((table) => (table.mesaNome === mesaSelecionada.mesaNome ? mesaSelecionada : table))
		);

		salvarMesaSelecionada();
	}, [mesaSelecionada]);
}
