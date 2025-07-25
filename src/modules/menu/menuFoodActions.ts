import { useNavStore } from '@/store/navStore';
import { useDataStore } from '@/store/userStore';

export function handleIncrease(foodData: CardapioFoodType, mesaId: number | undefined) {
    const modoDelivery = useNavStore.getState().modoDelivery;

    if (modoDelivery) {
        const setDeliverySelecionado = useDataStore.getState().setDeliverySelecionado;
        setDeliverySelecionado((prev) => {
            if (!prev) return prev;

            const existingItem = prev.inCart.find((item) => item.foodId === foodData.id);
            if (existingItem) {
                return {
                    ...prev,
                    inCart: prev.inCart.map((item) =>
                        item.foodId === foodData.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return {
                ...prev,
                inCart: [
                    ...prev.inCart,
                    { foodId: foodData.id, title: foodData.title, price: foodData.price, quantity: 1 },
                ],
            };
        });
    } else {
        const setMesas = useDataStore.getState().setMesas;
        setMesas((prev) =>
            prev.map((mesa) => {
                if (mesa.id != mesaId) return mesa;

                const existingItem = mesa.products.inCart.find((item) => item.foodId === foodData.id);
                if (existingItem) {
                    return {
                        ...mesa,
                        products: {
                            ...mesa.products,
                            inCart: mesa.products.inCart.map((item) =>
                                item.foodId === foodData.id ? { ...item, quantity: item.quantity + 1 } : item
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
                                foodId: foodData.id,
                                title: foodData.title,
                                price: foodData.price,
                                quantity: 1,
                            },
                        ],
                    },
                };
            })
        );
    }
}

export function handleDecrease(foodData: CardapioFoodType, mesaId: number | undefined) {
    const modoDelivery = useNavStore.getState().modoDelivery;

    if (modoDelivery) {
        const setDeliverySelecionado = useDataStore.getState().setDeliverySelecionado;
        setDeliverySelecionado((prev) => {
            if (!prev) return prev;

            const existingItem = prev.inCart.find((item) => item.foodId === foodData.id);
            if (!existingItem) return prev;

            if (existingItem.quantity === 1) {
                return {
                    ...prev,
                    inCart: prev.inCart.filter((item) => item.foodId !== foodData.id),
                };
            } else {
                return {
                    ...prev,
                    inCart: prev.inCart.map((item) =>
                        item.foodId === foodData.id ? { ...item, quantity: item.quantity - 1 } : item
                    ),
                };
            }
        });
    } else {
        const setMesas = useDataStore.getState().setMesas;
        setMesas((prev) =>
            prev.map((mesa) => {
                if (mesa.id != mesaId) return mesa;

                const existingItem = mesa.products.inCart.find((item) => item.foodId === foodData.id);
                if (!existingItem) return mesa;

                if (existingItem.quantity === 1) {
                    return {
                        ...mesa,
                        products: {
                            ...mesa.products,
                            inCart: mesa.products.inCart.filter((item) => item.foodId !== foodData.id),
                        },
                    };
                } else {
                    return {
                        ...mesa,
                        products: {
                            ...mesa.products,
                            inCart: mesa.products.inCart.map((item) =>
                                item.foodId === foodData.id ? { ...item, quantity: item.quantity - 1 } : item
                            ),
                        },
                    };
                }
            })
        );
    }
}
