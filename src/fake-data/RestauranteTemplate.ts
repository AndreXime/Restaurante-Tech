import type {
	DeliveryType,
	KitchenOrderType,
	TablesType,
	CardapioType,
	ConfigType,
	ContabilidadeType,
} from '@/types/types';
import { categories, foodItems } from './menu';
import { KitchenOrders } from './kitchen';
import { generalData, users } from './settings';
import { deliveryOrders } from './delivery';
import { summaryItems, transactions } from './accounting';
import { Mesas } from './tables';

export interface Template {
	cardapio: CardapioType;
	mesas: TablesType[];
	cozinha: KitchenOrderType[];
	entrega: DeliveryType[];
	config: ConfigType;
	contabilidade: ContabilidadeType;
	mesaSelecionada: TablesType;
}

export const restauranteFake: Template = {
	cardapio: { categorias: categories, pratos: foodItems },
	mesas: Mesas,
	config: { geralData: generalData, funcionarios: users },
	entrega: deliveryOrders,
	contabilidade: { resumo: summaryItems, transacoes: transactions },
	cozinha: KitchenOrders,
	mesaSelecionada: Mesas[0],
};

export const restaurantVazio: Template = {
	cardapio: { categorias: [], pratos: [] },
	mesas: [],
	config: {
		geralData: { restaurantName: '', address: '', phone: '', email: '', taxRate: '', currency: '' },
		funcionarios: [],
	},
	entrega: [],
	contabilidade: {
		resumo: [
			{
				title: 'Vendas Totais',
				value: '0',
				change: '0%',
				trend: 'up',
			},
			{
				title: 'Pedidos',
				value: '0',
				change: '0%',
				trend: 'up',
			},
			{
				title: 'Valor Médio por Pedido',
				value: '0',
				change: '0%',
				trend: 'up',
			},
			{
				title: 'Vendas Totais',
				value: '0',
				change: '0%',
				trend: 'up',
			},
		],

		transacoes: [],
	},
	cozinha: [],
	mesaSelecionada: {
		id: 0,
		guests: 0,
		status: 'livre',
		time: '',
		server: '',
		mesaNome: '',
		clienteNome: '',
		products: [],
	},
};
