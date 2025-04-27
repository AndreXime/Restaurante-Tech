import { Card, CardContent } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function FinancialSummary() {
	const { Contabilidade } = useData();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{Contabilidade.resumo.map((item, index) => (
				<Card key={index}>
					<CardContent className="p-4">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm text-gray-500">{item.title}</p>
								<h3 className="text-2xl font-bold mt-1">{item.value}</h3>
							</div>
							<div className={`p-2 rounded-full ${item.color}`}>
								<item.icon className="h-5 w-5" />
							</div>
						</div>
						<div className="mt-2 flex items-center">
							{item.trend === 'up' ? (
								<TrendingUp className="h-4 w-4 text-green-600 mr-1" />
							) : (
								<TrendingDown className="h-4 w-4 text-red-600 mr-1" />
							)}
							<span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
								{item.change} em relação ao mês anterior
							</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
