import { useData } from '@/contexts/DataContext';
import { Card, CardContent } from '../ui/card';
import { parseNumberBR } from '@/lib/utils';

export function EstastisticaSettings() {
	const { Cardapio, Mesas, Config, Entrega, Cozinha, Contabilidade } = useData();
	const resumo = [
		{
			title: 'Quantidade de pratos totais',
			value: Cardapio.pratos.length,
		},
		{
			title: 'Quantidade de categorias totais',
			value: Cardapio.categorias.length,
		},
		{
			title: 'Quantidade de mesas',
			value: Mesas.length,
		},
		{
			title: 'Quantidade de funcionarios',
			value: Config.funcionarios.length,
		},
		{
			title: 'Entregas concluidas',
			value: Entrega.filter((value) => value.status == 'entregue').length,
		},
		{
			title: 'Pratos concluidas pela cozinha',
			value: Cozinha.filter((value) => value.status == 'pronto').length,
		},
		{
			title: 'Saldo esperado',
			value:
				parseNumberBR(Contabilidade.resumo.find((value) => value.title == 'Vendas Totais')?.value || '') -
				parseNumberBR(Contabilidade.resumo.find((value) => value.title == 'Despesas')?.value || ''),
		},
	];
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-8">
				<h2 className="text-xl font-bold">Gerenciamento de Cardápio</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{resumo.map((value) => (
						<Card key={value.title}>
							<CardContent className="p-4">
								<div className="flex justify-between items-start">
									<div>
										<p className="text-sm text-gray-500">{value.title}</p>
										<h3 className="text-2xl font-bold mt-1">{value.value}</h3>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
