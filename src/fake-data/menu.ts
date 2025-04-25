import { CategoriesType, FoodCartType, FoodType, TablesType } from '@/types/types';
import { Grid, Coffee, UtensilsCrossed, ChefHat, Sandwich, GlassWater, Fish, Pizza, Soup } from 'lucide-react';

export const categories: CategoriesType[] = [
	{ id: 1, icon: Grid, label: 'Todos', items: '10 Itens' }, // Todos (contando todos os itens)
	{ id: 2, icon: ChefHat, label: 'Pratos Principais', items: '2 Itens' }, // 3 Pratos Principais
	{ id: 3, icon: Coffee, label: 'Massas', items: '2 Itens' }, // 2 Massas
	{ id: 4, icon: UtensilsCrossed, label: 'Saladas', items: '1 Item' }, // 1 Salada
	{ id: 5, icon: Sandwich, label: 'Hambúrgueres', items: '1 Item' }, // 1 Hambúrguer
	{ id: 6, icon: GlassWater, label: 'Suco', items: '1 Item' }, // 1 Suco
	{ id: 7, icon: Fish, label: 'Frutos do mar', items: '1 Item' }, // 1 Fruto do mar
	{ id: 8, icon: Pizza, label: 'Pizzas', items: '1 Item' }, // 1 Pizza
	{ id: 9, icon: Soup, label: 'Sopas', items: '1 Item' }, // 1 Sopa
];

export const Mesas: TablesType[] = [
	{ mesaNome: 'Mesa 1', clienteNome: 'Miles', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 2', clienteNome: 'Andrea', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 3', clienteNome: 'Rasputin', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 4', clienteNome: 'Livre', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 5', clienteNome: 'Livre', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 6', clienteNome: 'Livre', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 7', clienteNome: 'Livre', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 8', clienteNome: 'Livre', products: [] as FoodCartType[] },
	{ mesaNome: 'Mesa 9', clienteNome: 'Elon musk', products: [] as FoodCartType[] },
];

export const foodItems: FoodType[] = [
	{
		id: 1,
		image: '/salada.png',
		title: 'Salada de Vegetais Saudável',
		price: 17.99,
		discount: 20,
		type: 'Veg',
		status: 'Ativo',
		category: ['Saladas'],
	},
	{
		id: 2,
		image: '/hamburguer-batata.png',
		title: 'Hambúrguer de Carne com Batatas',
		price: 23.99,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Hambúrgueres', 'Pratos Principais'],
	},
	{
		id: 3,
		image: '/tacos-frango.png',
		title: 'Tacos com Salsa e Frango Grelhado',
		price: 14.99,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Massas'],
	},
	{
		id: 4,
		image: '/suco-laranja.png',
		title: 'Suco de Laranja Fresco com Sementes de Manjericão',
		price: 12.99,
		type: 'Veg',
		status: 'Ativo',
		category: ['Suco'],
	},
	{
		id: 5,
		image: '/pizza.png',
		title: 'Pizza Margherita',
		price: 29.99,
		type: 'Veg',
		status: 'Ativo',
		category: ['Pizzas'],
	},
	{
		id: 6,
		image: '/bife.png',
		title: 'Bife com arroz',
		price: 25.5,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Pratos Principais'],
	},
	{
		id: 7,
		image: '/smoothie-morango.png',
		title: 'Smoothie de Morango com Banana',
		price: 15.75,
		type: 'Veg',
		status: 'Ativo',
		category: ['Bebidas'],
	},
	{
		id: 8,
		image: '/camarao.png',
		title: 'Camarão com pão',
		price: 27.8,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Frutos do mar'],
	},
	{
		id: 9,
		image: '/macarrao.png',
		title: 'Macarrao com almodengas',
		price: 19.4,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Massas'],
	},
	{
		id: 10,
		image: '/sopa-legumes.png',
		title: 'Sopa de Legumes Natural',
		price: 13.6,
		type: 'Veg',
		status: 'Ativo',
		category: ['Sopas'],
	},
];
