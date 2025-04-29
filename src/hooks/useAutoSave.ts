import { useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { salvarData } from '@/lib/localDatabase';

export default function useAutoSave() {
	const { Mesas, Contabilidade, Config, Cozinha, Entrega, Cardapio, mesaSelecionada, setMesas } = useData();

	useEffect(() => {
		const salvarMesas = async () => {
			await salvarData('mesas', Mesas);
		};
		salvarMesas();
	}, [Mesas]);

	useEffect(() => {
		const salvarContabilidade = async () => {
			await salvarData('contabilidade', Contabilidade);
		};
		salvarContabilidade();
	}, [Contabilidade]);

	useEffect(() => {
		const salvarConfig = async () => {
			await salvarData('config', Config);
		};
		salvarConfig();
	}, [Config]);

	useEffect(() => {
		const salvarCozinha = async () => {
			await salvarData('cozinha', Cozinha);
		};
		salvarCozinha();
	}, [Cozinha]);

	useEffect(() => {
		const salvarEntrega = async () => {
			await salvarData('entrega', Entrega);
		};
		salvarEntrega();
	}, [Entrega]);

	useEffect(() => {
		const salvarCardapio = async () => {
			await salvarData('cardapio', Cardapio);
		};
		salvarCardapio();
	}, [Cardapio]);

	useEffect(() => {
		const salvarMesaSelecionada = async () => {
			await salvarData('mesaSelecionada', mesaSelecionada);
		};

		// Sincroniza mesaSelecionada com Tables ao mudar
		setMesas((prevTables) =>
			prevTables.map((table) => (table.mesaNome === mesaSelecionada.mesaNome ? mesaSelecionada : table))
		);

		salvarMesaSelecionada();
	}, [mesaSelecionada]);
}
