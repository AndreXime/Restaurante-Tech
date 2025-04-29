import { useData } from '@/contexts/DataContext';
import { TableCard } from './table-card';

export function TableGrid() {
	const { Mesas } = useData();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{Mesas.length == 0 && (
				<h2 className="col-span-full font-bold text-lg text-center">
					Não foi cadastrado nenhuma mesa, vá em configurações para cadastrar
				</h2>
			)}
			{Mesas.map((table) => (
				<TableCard
					key={table.id}
					{...table}
				/>
			))}
		</div>
	);
}
