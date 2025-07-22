export function mergeFoodItems(existing: FoodCartType[], incoming: FoodCartType[]): FoodCartType[] {
    const map = new Map<number, FoodCartType>();

    // Adiciona os existentes
    for (const item of existing) {
        map.set(item.foodId, { ...item });
    }

    // Mescla os novos
    for (const item of incoming) {
        if (map.has(item.foodId)) {
            const existingItem = map.get(item.foodId)!;
            map.set(item.foodId, {
                ...existingItem,
                quantity: existingItem.quantity + item.quantity,
            });
        } else {
            map.set(item.foodId, { ...item });
        }
    }

    return Array.from(map.values());
}
