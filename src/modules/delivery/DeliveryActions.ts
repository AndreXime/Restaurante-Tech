'use client';
import { restaurantVazio } from '@/shared/lib/dataState/restauranteVazio';
import { encontrarMenorIdDisponivel, getHours } from '@/shared/lib/utils';
import { useDataStore } from '@/store/userStore';
import { RecordTransaction } from '../accounting/accountingActions';

export async function SendDeliveryOrderToKitchen(products: FoodCartType[], total: number) {
    const { deliverySelecionado, setDeliverySelecionado, entrega, setEntrega, setCozinha, cozinha } =
        useDataStore.getState();

    const entregaId = encontrarMenorIdDisponivel(entrega);
    const cozinhaId = encontrarMenorIdDisponivel(cozinha);

    setCozinha((prev) => [
        ...prev,
        {
            id: cozinhaId,
            type: 'delivery',
            ownerId: entregaId,
            ownerTable: 'Delivery',
            ownerName: deliverySelecionado.customer || 'Desconhecido',
            chef: 'João',
            createdAt: new Date().toISOString(),
            startedAt: new Date().toISOString(),
            orderItems: products.map((item) => {
                return { foodId: item.foodId, title: item.title, price: item.price, quantity: item.quantity };
            }),
        },
    ]);
    setEntrega((prev) => [
        ...prev,
        {
            id: entregaId,
            kitchenOrderId: cozinhaId,
            customer: deliverySelecionado.customer,
            address: deliverySelecionado.address,
            phone: deliverySelecionado.phone,
            type: 'delivery',
            payments: {
                items: products.length,
                total,
                type: deliverySelecionado.payments.type,
            },
        },
    ]);
    setDeliverySelecionado(restaurantVazio.deliverySelecionado);
}

export async function SendTakeOutOrderToKitchen(products: FoodCartType[]) {
    const { deliverySelecionado, setDeliverySelecionado, setCozinha, cozinha } = useDataStore.getState();

    const cozinhaId = encontrarMenorIdDisponivel(cozinha);

    setCozinha((prev) => [
        ...prev,
        {
            id: cozinhaId,
            type: 'takeout',
            ownerId: 0,
            ownerTable: 'Retirada',
            ownerName: deliverySelecionado.customer || 'Desconhecido',
            chef: 'João',
            createdAt: new Date().toISOString(),
            startedAt: new Date().toISOString(),
            orderItems: products.map((item) => {
                return { foodId: item.foodId, title: item.title, price: item.price, quantity: item.quantity };
            }),
        },
    ]);

    setDeliverySelecionado(restaurantVazio.deliverySelecionado);
}

export async function StartingDelivery(deliveryId: number) {
    const { setEntrega } = useDataStore.getState();
    setEntrega((prev) =>
        prev.map((entrega) => {
            if (entrega.id != deliveryId) return entrega;
            return {
                ...entrega,
                deliveryPerson: 'Alexandre de Moraes',
                dispatchedAt: getHours(),
            };
        })
    );
}

export async function EndDelivery(deliveryId: number) {
    const { setEntrega } = useDataStore.getState();

    setEntrega((prev) =>
        prev.filter((entrega) => {
            if (entrega.id != deliveryId) return true;
            RecordTransaction({
                description: 'Venda - Delivery',
                amount: entrega.payments.total,
                type: 'entrada',
                date: new Date(),
            });
            return false;
        })
    );
}
