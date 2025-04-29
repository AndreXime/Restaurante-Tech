import { ResumoAccountingType, TransactionsType } from '@/types/types';

const summaryItems: ResumoAccountingType[] = [
	{
		title: 'Vendas Totais',
		value: 'R$12.456,78',
		change: '+12,5%',
		trend: 'up',
	},
	{
		title: 'Pedidos',
		value: '345',
		change: '+8,2%',
		trend: 'up',
	},
	{
		title: 'Valor Médio por Pedido',
		value: 'R$36,10',
		change: '+4,3%',
		trend: 'up',
	},
	{
		title: 'Despesas',
		value: 'R$5.234,56',
		change: '-2,1%',
		trend: 'down',
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
