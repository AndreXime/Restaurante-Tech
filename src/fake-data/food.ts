import { FoodType } from '@/types/types';

const foodItems: FoodType[] = [
	{
		id: 1,
		image: '/placeholder-food-1.png',
		title: 'Salada de Vegetais Saudável',
		price: 17.99,
		discount: 20,
		type: 'Veg',
		status: 'Ativo',
		category: ['Saladas'],
	},
	{
		id: 2,
		image: '/placeholder-food-2.png',
		title: 'Hambúrguer de Carne com Batatas',
		price: 23.99,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Hambúrgueres', 'Pratos Principais'],
	},
	{
		id: 3,
		image: '/placeholder-food-3.png',
		title: 'Tacos com Salsa e Frango Grelhado',
		price: 14.99,
		type: 'Não Veg',
		status: 'Ativo',
		category: ['Massas'],
	},
	{
		id: 4,
		image: '/placeholder-food-4.png',
		title: 'Suco de Laranja Fresco com Sementes de Manjericão',
		price: 12.99,
		type: 'Veg',
		status: 'Ativo',
		category: ['Suco'],
	},
];
export { foodItems };
