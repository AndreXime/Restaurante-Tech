import { CategoriesType } from '@/types/types';
import { Grid, Coffee, UtensilsCrossed, ChefHat, Sandwich } from 'lucide-react';

const categories: CategoriesType[] = [
	{ id: 1, icon: Grid, label: 'Todos', items: '50 Itens' },
	{ id: 1, icon: ChefHat, label: 'Pratos Principais', items: '24 Itens' },
	{ id: 1, icon: Coffee, label: 'Massas', items: '16 Itens' },
	{ id: 1, icon: UtensilsCrossed, label: 'Saladas', items: '14 Itens' },
	{ id: 1, icon: Sandwich, label: 'Hambúrgueres', items: '13 Itens' },
	{ id: 1, icon: Sandwich, label: 'Suco', items: '13 Itens' },
];

export { categories };
