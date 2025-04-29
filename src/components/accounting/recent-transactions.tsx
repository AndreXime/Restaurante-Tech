import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';

export function RecentTransactions() {
	const { Contabilidade } = useData();
	const Transacoes = Contabilidade.transacoes;

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Transações Recentes</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{Transacoes.length == 0 && (
						<h2 className="font-bold text-lg mb-4">Não foi registrado nenhuma transação no momento</h2>
					)}
					{Transacoes.map((transaction) => (
						<div
							key={transaction.id}
							className="flex justify-between items-center border-b pb-2">
							<div>
								<p className="font-medium">{transaction.description}</p>
								<p className="text-sm text-gray-500">{transaction.date}</p>
							</div>
							<div className={`font-bold ${transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
								{transaction.type === 'entrada' ? '+' : '-'}R${transaction.amount.toFixed(2)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
