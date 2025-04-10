import { TableCard } from './table-card';
import { tables } from '@/fake-data/tables';

export function TableGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{tables.map((table) => (
				<TableCard
					key={table.id}
					{...table}
				/>
			))}
		</div>
	);
}
