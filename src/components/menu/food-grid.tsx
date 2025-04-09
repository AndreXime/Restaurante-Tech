import { FoodCard } from './food-card';
interface FoodType {
	image: string;
	title: string;
	price: number;
	discount?: number;
	type: 'Veg' | 'Não Veg';
}
const foodItems: FoodType[] = [
	{
		image: '/placeholder-food.png',
		title: 'Salada de Vegetais Saudável',
		price: 17.99,
		discount: 20,
		type: 'Veg',
	},
	{
		image: '/placeholder-food.png',
		title: 'Hambúrguer de Carne com Batatas',
		price: 23.99,
		type: 'Não Veg',
	},
	{
		image: '/placeholder-food.png',
		title: 'Tacos com Salsa e Frango Grelhado',
		price: 14.99,
		type: 'Não Veg',
	},
	{
		image: '/placeholder-food.png',
		title: 'Suco de Laranja Fresco com Sementes de Manjericão',
		price: 12.99,
		type: 'Veg',
	},
	{
		image: '/placeholder-food.png',
		title: 'Sushi de Carne com Atum e Outros',
		price: 9.99,
		type: 'Não Veg',
	},
	{
		image: '/placeholder-food.png',
		title: 'Hambúrguer Original com Batatas Fritas',
		price: 10.59,
		discount: 20,
		type: 'Veg',
	},
];

export function FoodGrid() {
	return (
		<div className="grid grid-cols-3 gap-4">
			{foodItems.map((item, index) => (
				<FoodCard
					key={index}
					{...item}
				/>
			))}
		</div>
	);
}
