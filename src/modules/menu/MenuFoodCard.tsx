'use client';
import { Card, Button } from '@/shared/ui';
import { Minus, Plus } from 'lucide-react';
import { useDataStore } from '@/store/userStore';
import { useNavStore } from '@/store/navStore';
type Props = {
    itemCurrent: CardapioFoodType;
    carrinho: FoodCartType[] | undefined;
    mesaAtual: TablesType | undefined;
};
export function FoodCard({ itemCurrent, carrinho, mesaAtual }: Props) {
    const setMesas = useDataStore((state) => state.setMesas);
    const setDeliverySelecionado = useDataStore((state) => state.setDeliverySelecionado);

    const modoDelivery = useNavStore((state) => state.modoDelivery);

    // Encontra o item pelo id para obter a quantidade atual
    const existingItem = carrinho?.find((item) => item.foodId === itemCurrent.id);
    const qtd = existingItem ? existingItem.quantity : 0;

    const handleIncrease = () => {
        if (modoDelivery) {
            setDeliverySelecionado((prev) => {
                if (!prev) return prev;

                const existingItem = prev.inCart.find((item) => item.foodId === itemCurrent.id);
                if (existingItem) {
                    return {
                        ...prev,
                        inCart: prev.inCart.map((item) =>
                            item.foodId === itemCurrent.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                }
                return {
                    ...prev,
                    inCart: [
                        ...prev.inCart,
                        { foodId: itemCurrent.id, title: itemCurrent.title, price: itemCurrent.price, quantity: 1 },
                    ],
                };
            });
        } else {
            setMesas((prev) =>
                prev.map((mesa) => {
                    if (mesa.id != mesaAtual?.id) return mesa;

                    const existingItem = mesa.products.inCart.find((item) => item.foodId === itemCurrent.id);
                    if (existingItem) {
                        return {
                            ...mesa,
                            products: {
                                ...mesa.products,
                                inCart: mesa.products.inCart.map((item) =>
                                    item.foodId === itemCurrent.id ? { ...item, quantity: item.quantity + 1 } : item
                                ),
                            },
                        };
                    }
                    return {
                        ...mesa,
                        products: {
                            ...mesa.products,
                            inCart: [
                                ...mesa.products.inCart,
                                {
                                    foodId: itemCurrent.id,
                                    title: itemCurrent.title,
                                    price: itemCurrent.price,
                                    quantity: 1,
                                },
                            ],
                        },
                    };
                })
            );
        }
    };

    const handleDecrease = () => {
        if (modoDelivery) {
            setDeliverySelecionado((prev) => {
                if (!prev) return prev;

                const existingItem = prev.inCart.find((item) => item.foodId === itemCurrent.id);
                if (!existingItem) return prev;

                if (existingItem.quantity === 1) {
                    return {
                        ...prev,
                        inCart: prev.inCart.filter((item) => item.foodId !== itemCurrent.id),
                    };
                } else {
                    return {
                        ...prev,
                        inCart: prev.inCart.map((item) =>
                            item.foodId === itemCurrent.id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                }
            });
        } else {
            setMesas((prev) =>
                prev.map((mesa) => {
                    if (mesa.id != mesaAtual?.id) return mesa;

                    const existingItem = mesa.products.inCart.find((item) => item.foodId === itemCurrent.id);
                    if (!existingItem) return mesa;

                    if (existingItem.quantity === 1) {
                        return {
                            ...mesa,
                            products: {
                                ...mesa.products,
                                inCart: mesa.products.inCart.filter((item) => item.foodId !== itemCurrent.id),
                            },
                        };
                    } else {
                        return {
                            ...mesa,
                            products: {
                                ...mesa.products,
                                inCart: mesa.products.inCart.map((item) =>
                                    item.foodId === itemCurrent.id ? { ...item, quantity: item.quantity - 1 } : item
                                ),
                            },
                        };
                    }
                })
            );
        }
    };

    return (
        <Card className="overflow-hidden pt-0 gap-4">
            <div className="relative">
                <img
                    src={itemCurrent.imageURL || '/placeholder.svg'}
                    alt={itemCurrent.title}
                    width={500}
                    height={500}
                    className="w-full h-65 object-cover"
                />
                {itemCurrent.discount && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-medium">
                        {itemCurrent.discount}% de desconto
                    </div>
                )}
            </div>
            <div className="p-3 pb-0 h-full flex flex-col">
                <h3 className="text-sm font-medium mb-1">{itemCurrent.title}</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600 font-bold">R${itemCurrent.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleDecrease}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">{qtd}</span>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={handleIncrease}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
