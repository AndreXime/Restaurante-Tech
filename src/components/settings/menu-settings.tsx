import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';

export function MenuSettings() {
	const { Cardapio } = useData();
	const menuItems = Cardapio.pratos;
	const categories = Cardapio.categorias;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Gerenciamento de Cardápio</h2>
			</div>

			<Tabs defaultValue="items">
				<div className="flex justify-between">
					<TabsList>
						<TabsTrigger value="items">Itens</TabsTrigger>
						<TabsTrigger value="categories">Categorias</TabsTrigger>
					</TabsList>
					<div className="flex justify-end mb-4">
						<Button className="bg-green-600 hover:bg-green-700">
							<PlusCircle className="h-4 w-4 mr-2" />
							Novo Item
						</Button>
					</div>
				</div>

				<TabsContent
					value="items"
					className="pt-4">
					<div className="border rounded-md overflow-scroll">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-100">
									<th className="text-left p-3">Nome</th>
									<th className="text-left p-3">Categoria</th>
									<th className="text-left p-3">Preço</th>
									<th className="text-left p-3">Status</th>
									<th className="text-right p-3">Ações</th>
								</tr>
							</thead>
							<tbody>
								{menuItems.map((item) => (
									<tr
										key={item.id}
										className="border-t">
										<td className="p-3">{item.title}</td>
										<td className="p-3">{item.category}</td>
										<td className="p-3">R${item.price.toFixed(2)}</td>
										<td className="p-3">
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													item.status === 'Ativo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
												}`}>
												{item.status}
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
				</TabsContent>

				<TabsContent
					value="categories"
					className="pt-4">
					<div className="flex justify-end mb-4">
						<Button className="bg-green-600 hover:bg-green-700">
							<PlusCircle className="h-4 w-4 mr-2" />
							Nova Categoria
						</Button>
					</div>

					<div className="border rounded-md">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-100">
									<th className="text-left p-3">Nome</th>
									<th className="text-left p-3">Itens</th>
									<th className="text-right p-3">Ações</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category) => (
									<tr
										key={category.id}
										className="border-t">
										<td className="p-3">{category.label}</td>
										<td className="p-3">{category.items}</td>
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
				</TabsContent>
			</Tabs>
		</div>
	);
}
