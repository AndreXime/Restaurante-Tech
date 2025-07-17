import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useDataStore } from '@/store/userStore';
import { useNavStore } from '@/store/navStore';

export function FoodCard({ id, image, title, price, discount }: CardapioFoodType) {
    const mesaSelecionada = useDataStore((state) => state.mesaSelecionada);
    const setMesaSelecionada = useDataStore((state) => state.setMesaSelecionada);
    const deliverySelecionado = useDataStore((state) => state.deliverySelecionado);
    const setDeliverySelecionado = useDataStore((state) => state.setDeliverySelecionado);

    const modoDelivery = useNavStore((state) => state.modoDelivery);

    // Encontra o item pelo id para obter a quantidade atual
    const existingItem = modoDelivery
        ? deliverySelecionado.inCart.find((item) => item.foodId === id)
        : mesaSelecionada?.products.inCart.find((item) => item.foodId === id);
    const qtd = existingItem ? existingItem.quantity : 0;

    // Função para incrementar a quantidade
    const handleIncrease = () => {
        if (modoDelivery) {
            setDeliverySelecionado((prev) => {
                if (!prev) return prev;

                const existingItem = prev.inCart.find((item) => item.foodId === id);
                if (existingItem) {
                    return {
                        ...prev,
                        inCart: prev.inCart.map((item) =>
                            item.foodId === id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                }
                return {
                    ...prev,
                    inCart: [...prev.inCart, { foodId: id, title, price, quantity: 1 }],
                };
            });
        } else {
            setMesaSelecionada((prev) => {
                if (!prev) return prev;

                const existingItem = prev.products.inCart.find((item) => item.foodId === id);
                if (existingItem) {
                    return {
                        ...prev,
                        products: {
                            ...prev.products,
                            inCart: prev.products.inCart.map((item) =>
                                item.foodId === id ? { ...item, quantity: item.quantity + 1 } : item
                            ),
                        },
                    };
                }
                return {
                    ...prev,
                    products: {
                        ...prev.products,
                        inCart: [...prev.products.inCart, { foodId: id, title, price, quantity: 1 }],
                    },
                };
            });
        }
    };

    // Função para decrementar a quantidade
    const handleDecrease = () => {
        if (modoDelivery) {
            setDeliverySelecionado((prev) => {
                if (!prev) return prev;

                const existingItem = prev.inCart.find((item) => item.foodId === id);
                if (!existingItem) return prev;

                if (existingItem.quantity === 1) {
                    return {
                        ...prev,
                        inCart: prev.inCart.filter((item) => item.foodId !== id),
                    };
                } else {
                    return {
                        ...prev,
                        inCart: prev.inCart.map((item) =>
                            item.foodId === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                }
            });
        } else {
            setMesaSelecionada((prev) => {
                if (!prev) return prev;

                const existingItem = prev.products.inCart.find((item) => item.foodId === id);
                if (!existingItem) return prev;

                if (existingItem.quantity === 1) {
                    return {
                        ...prev,
                        products: {
                            ...prev.products,
                            inCart: prev.products.inCart.filter((item) => item.foodId !== id),
                        },
                    };
                } else {
                    return {
                        ...prev,
                        products: {
                            ...prev.products,
                            inCart: prev.products.inCart.map((item) =>
                                item.foodId === id ? { ...item, quantity: item.quantity - 1 } : item
                            ),
                        },
                    };
                }
            });
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
