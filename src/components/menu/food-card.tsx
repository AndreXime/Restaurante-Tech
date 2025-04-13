import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useMenu } from '@/contexts/MenuContext';

interface FoodCardProps {
	id: number;
	image: string;
	title: string;
	price: number;
	discount?: number;
	type: 'Veg' | 'Não Veg';
}

export function FoodCard({ id, image, title, price, discount, type }: FoodCardProps) {
	const { cartItems, setCartItems } = useMenu();

	// Encontra o item pelo id para obter a quantidade atual
	const existingItem = cartItems.find((item) => item.id === id);
	const qtd = existingItem ? existingItem.quantity : 0;

	// Função para incrementar a quantidade
	const handleIncrease = () => {
		if (existingItem) {
			setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
		} else {
			setCartItems([...cartItems, { id, image, title, price, quantity: 1 }]);
		}
	};

	// Função para decrementar a quantidade
	const handleDecrease = () => {
		if (!existingItem) return;
		if (existingItem.quantity === 1) {
			// Remove o item caso a quantidade seja 1
			setCartItems(cartItems.filter((item) => item.id !== id));
		} else {
			// Diminui a quantidade
			setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)));
		}
	};

	return (
		<Card className="overflow-hidden pt-0 gap-4">
			<div className="relative">
				<Image
					src={image || '/placeholder.svg'}
					alt={title}
					width={500}
					height={500}
					className="w-full h-65 object-cover"
				/>
				{discount && (
					<div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-medium">
						{discount}% Off
					</div>
				)}
			</div>
			<div className="p-3 pb-0 h-full flex flex-col">
				<h3 className="text-sm font-medium mb-1">{title}</h3>
				<div className="flex justify-between items-center mb-2">
					<span className="text-green-600 font-bold">R${price.toFixed(2)}</span>
					<div className="flex items-center gap-1">
						<span className={`w-2 h-2 rounded-full ${type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></span>
						<span className="text-xs text-gray-500">{type}</span>
					</div>
				</div>
				<div className="flex items-center justify-between mt-2">
					<Button
						variant="outline"
						size="icon"
						className="rounded-full"
						onClick={handleDecrease}>
						<Minus className="h-4 w-4" />
					</Button>
					<span className="font-medium">{qtd}</span>
					<Button
						variant="outline"
						size="icon"
						className="rounded-full"
						onClick={handleIncrease}>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</Card>
	);
}
