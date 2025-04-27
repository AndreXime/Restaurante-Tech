import { LucideIcon } from 'lucide-react';

/* Tipos Complexos que a empresa no geral possuem */

// Para o carrinho e Mesas
export interface TablesType {
	id: number;
	status: 'ocupada' | 'livre' | 'reservada';
	guests: number;
	time: string;
	server: string;
	mesaNome: string;
	clienteNome: string;
	products: FoodCartType[];
}

// Para o Cardapio
export interface CardapioType {
	categorias: CategoriesType[];
	pratos: FoodType[];
}

// Para configuração
export interface ConfigType {
	geralData: GeneralDataType;
	funcionarios: FuncionariosType[];
}

// Para contabilidade
export interface ContabilidadeType {
	resumo: ResumoAccountingType[];
	transacoes: TransactionsType[];
}

// Para Cozinha
export interface KitchenOrderType {
	id: string;
	table: string;
	items: number;
	time: string;
	status: 'pendente' | 'preparo' | 'pronto';
	server: string;
	orderItems: Array<{
		name: string;
		quantity: number;
		notes?: string;
	}>;
}

// Para Entregas
export interface DeliveryType {
	id: string;
	customer: string;
	address: string;
	phone: string;
	items: number;
	total: number;
	time: string;
	status: 'pendente' | 'em andamento' | 'entregue';
	deliveryPerson?: string;
}

/* Tipos auxiliares  */

export interface FoodType {
	id: number;
	image: string;
	title: string;
	price: number;
	discount?: number;
	category: string[];
	status: string;
	type: 'Veg' | 'Não Veg';
}

export interface FoodCartType {
	id: number;
	image: string;
	title: string;
	price: number;
	quantity: number;
}

export interface ResumoAccountingType {
	title: 'Vendas Totais' | 'Pedidos' | 'Valor Médio por Pedido' | 'Despesas';
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	color: string;
}

export interface TransactionsType {
	id: string;
	description: string;
	amount: number;
	type: 'entrada' | 'saída';
	date: string;
}

export interface CategoriesType {
	id: number;
	icon: LucideIcon;
	label: string;
	items: string;
}

export interface FuncionariosType {
	id: number;
	name: string;
	email: string;
	role: string;
	status: 'Ativo' | 'Inativo';
}

export interface GeneralDataType {
	restaurantName: string;
	address: string;
	phone: string;
	email: string;
	taxRate: string;
	currency: string;
}
