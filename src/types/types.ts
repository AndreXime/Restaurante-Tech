import { LucideIcon } from 'lucide-react';

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
export interface TablesType {
	mesaNome: string;
	clienteNome: string;
	products: FoodCartType[];
}

export interface FoodCartType {
	id: number;
	image: string;
	title: string;
	price: number;
	quantity: number;
}

export interface OrderType {
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

export interface AccountingType {
	title: string;
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
export interface ReservationsType {
	date: string;
	time: string;
	name: string;
	guests: number;
	table: string;
}

export interface TableType {
	id: number;
	number: string;
	status: 'ocupada' | 'livre' | 'reservada';
	guests: number;
	time: string;
	server: string;
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
