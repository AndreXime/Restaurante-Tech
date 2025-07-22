import { useDataStore } from '@/store/userStore';

export function sumKitckenOrderCost(products: KitchenOrderType) {
    const taxRate = useDataStore.getState().config.geralData.taxRate;
    const productsStandby = products.orderItems;

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalStandby;
    const tax = subTotal * (taxRate / 100);

    return subTotal + tax;
}

export function sumTableTotalCost(mesa: TablesType) {
    const taxRate = useDataStore.getState().config.geralData.taxRate;

    const productsStandby = mesa.products.inCart || [];
    const productsProcessing = mesa.products.inKitchen || [];
    const productsDone = mesa.products.alreadyEaten || [];

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalProcessing = productsProcessing.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalDone = productsDone.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalDone + subtotalProcessing + subtotalStandby;
    const tax = subTotal * (taxRate / 100);

    return subTotal + tax;
}
