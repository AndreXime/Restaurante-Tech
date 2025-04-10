interface FoodType {
	image: string;
	title: string;
	price: number;
	discount?: number;
	type: 'Veg' | 'Não Veg';
}
const foodItems: FoodType[] = [
	{
		image: '/placeholder-food-1.png',
		title: 'Salada de Vegetais Saudável',
		price: 17.99,
		discount: 20,
		type: 'Veg',
	},
	{
		image: '/placeholder-food-2.png',
		title: 'Hambúrguer de Carne com Batatas',
		price: 23.99,
		type: 'Não Veg',
	},
	{
		image: '/placeholder-food-3.png',
		title: 'Tacos com Salsa e Frango Grelhado',
		price: 14.99,
		type: 'Não Veg',
	},
	{
		image: '/placeholder-food-4.png',
		title: 'Suco de Laranja Fresco com Sementes de Manjericão',
		price: 12.99,
		type: 'Veg',
	},
];
export { foodItems };
