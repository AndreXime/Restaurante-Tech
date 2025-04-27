import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { PlusCircle, Edit, Trash } from 'lucide-react';

export function UserSettings() {
	const { Config } = useData();
	const Funcionarios = Config.funcionarios;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Funcionarios</h2>
				<Button className="bg-green-600 hover:bg-green-700">
					<PlusCircle className="h-4 w-4 mr-2" />
					Funcionarios
				</Button>
			</div>

			<div className="border rounded-md overflow-scroll">
				<table className="w-full">
					<thead>
						<tr className="bg-gray-100">
							<th className="text-left p-3">Nome</th>
							<th className="text-left p-3">E-mail</th>
							<th className="text-left p-3">Função</th>
							<th className="text-left p-3">Status</th>
							<th className="text-right p-3">Ações</th>
						</tr>
					</thead>
					<tbody>
						{Funcionarios.map((user) => (
							<tr
								key={user.id}
								className="border-t">
								<td className="p-3">{user.name}</td>
								<td className="p-3">{user.email}</td>
								<td className="p-3">{user.role}</td>
								<td className="p-3">
									<span
										className={`px-2 py-1 rounded-full text-xs ${
											user.status === 'Ativo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
										}`}>
										{user.status}
									</span>
								</td>
								<td className="p-3 text-right">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8">
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-red-500">
										<Trash className="h-4 w-4" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
