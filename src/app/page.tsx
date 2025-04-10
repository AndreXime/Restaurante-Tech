'use client';

import { CategoryFilter } from '../components/menu/category-filter';
import { FoodGrid } from '../components/menu/food-grid';
import { Cart } from '../components/menu/cart';
import { Header } from '../components/layout/menu-header';
import { MenuContext } from '@/contexts/MenuContext';
import { useState } from 'react';

export default function MenuPage() {
	const [switchTab, setswitchTab] = useState(true);

	return (
		<div className="flex flex-col h-full">
			<MenuContext
				setSwitchTab={setswitchTab}
				switchTab={switchTab}>
				<Header />
				<div className="flex-1 flex overflow-hidden p-2">
					<div className="flex-1 overflow-auto">
						{switchTab ? (
							<>
								<CategoryFilter />
								<FoodGrid />
							</>
						) : (
							<Cart />
						)}
					</div>
				</div>
			</MenuContext>
		</div>
	);
}
