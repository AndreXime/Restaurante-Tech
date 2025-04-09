'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTable } from '../../contexts/table-context';

export function Header() {
	const { selectedTable, setSelectedTable } = useTable();

	return (
		<div className="bg-white p-4 flex items-center gap-4 border-b">
			<div className="flex items-center gap-2">
				<Select
					value={selectedTable}
					onValueChange={setSelectedTable}>
					<SelectTrigger className="w-[140px]">
						<SelectValue placeholder="Selecionar Mesa" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Mesa 1</SelectItem>
						<SelectItem value="2">Mesa 2</SelectItem>
						<SelectItem value="3">Mesa 3</SelectItem>
						<SelectItem value="4">Mesa 4</SelectItem>
						<SelectItem value="5">Mesa 5</SelectItem>
						<SelectItem value="6">Mesa 6</SelectItem>
						<SelectItem value="7">Mesa 7</SelectItem>
						<SelectItem value="8">Mesa 8</SelectItem>
						<SelectItem value="9">Mesa 9</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex-1 relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				<Input
					type="text"
					placeholder="Buscar produto aqui..."
					className="pl-10 w-full"
				/>
			</div>
		</div>
	);
}
