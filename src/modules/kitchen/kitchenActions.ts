import { showMessage } from '@/store/popupStore';
import { useDataStore } from '@/store/userStore';
import { RecordTransaction } from '../accounting/accountingActions';
import { sumKitckenOrderCost } from '@/shared/lib/numberUtils';
import { mergeFoodItems } from './kitchenUtils';

export function MakeTableOrderReady(order: KitchenOrderType) {
    const { setCozinha, setMesas } = useDataStore.getState();

    setMesas((prev) =>
        prev.map((mesa) => {
            if (mesa.id !== order.ownerId) return mesa;

            // separa os itens do pedido atual
            const itemsDoPedido = mesa.products.inKitchen.filter((item) => item.orderId === order.id);

            // mantém os outros
            const restantes = mesa.products.inKitchen.filter((item) => item.orderId !== order.id);

            return {
                ...mesa,
                products: {
                    ...mesa.products,
                    inKitchen: restantes,
                    alreadyEaten: mergeFoodItems(mesa.products.alreadyEaten, itemsDoPedido),
                },
            };
        })
    );

    setCozinha((prev) => prev.filter((coz) => coz.id != order.id));
    showMessage('Pedido foi enviado para a mesa');
}

export function MakeDeliveryOrderReady(order: KitchenOrderType) {
    const { setCozinha, setEntrega } = useDataStore.getState();
    setEntrega((prev) =>
        prev.map((entrega) => {
            if (entrega.kitchenOrderId !== order.id) return entrega;

            return {
                ...entrega,
                startedAt: new Date().toISOString(), // Pedido pronto, pronto para despacho
            };
        })
    );
    setCozinha((prev) => prev.filter((coz) => coz.id != order.id));
    showMessage('Pedido pronto para entrega, aguardando entregador...');
}

export function MakeTakeOutOrderReady(order: KitchenOrderType) {
    const { setCozinha } = useDataStore.getState();

    RecordTransaction({
        description: 'Venda - Retirada',
        amount: sumKitckenOrderCost(order),
        date: new Date(),
        type: 'entrada',
    });

    setCozinha((prev) => prev.filter((coz) => coz.id != order.id));
    showMessage('Enviando pedido para o cliente fazer retirada');
}
