import { foodItems } from '@/fake-data/food';
import { FoodCard } from './food-card';

export function FoodGrid() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			{foodItems.map((item, index) => (
				<FoodCard
					key={index}
					{...item}
				/>
			))}
		</div>
	);
}
