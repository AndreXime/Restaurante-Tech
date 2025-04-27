import { ResumoAccountingType, TransactionsType } from '@/types/types';
import { DollarSign, ShoppingBag, TrendingDown } from 'lucide-react';

const summaryItems: ResumoAccountingType[] = [
	{
		title: 'Vendas Totais',
		value: 'R$12.456,78',
		change: '+12,5%',
		trend: 'up',
		icon: DollarSign,
		color: 'bg-green-100 text-green-600',
	},
	{
		title: 'Pedidos',
		value: '345',
		change: '+8,2%',
		trend: 'up',
		icon: ShoppingBag,
		color: 'bg-blue-100 text-blue-600',
	},
	{
		title: 'Valor Médio por Pedido',
		value: 'R$36,10',
		change: '+4,3%',
		trend: 'up',
		icon: DollarSign,
		color: 'bg-purple-100 text-purple-600',
	},
	{
		title: 'Despesas',
		value: 'R$5.234,56',
		change: '-2,1%',
		trend: 'down',
		icon: TrendingDown,
		color: 'bg-orange-100 text-orange-600',
	},
];

const transactions: TransactionsType[] = [
	{ id: 'TX001', description: 'Venda - Mesa 4', amount: 78.96, type: 'entrada', date: '15/01/2025 14:30' },
	{ id: 'TX002', description: 'Venda - Delivery', amount: 56.97, type: 'entrada', date: '15/01/2025 13:45' },
	{ id: 'TX003', description: 'Pagamento Fornecedor', amount: 345.67, type: 'saída', date: '15/01/2025 11:20' },
	{ id: 'TX004', description: 'Venda - Mesa 2', amount: 42.98, type: 'entrada', date: '15/01/2025 10:15' },
	{ id: 'TX005', description: 'Pagamento Funcionário', amount: 1200.0, type: 'saída', date: '14/01/2025 17:00' },
];

export { summaryItems, transactions };
