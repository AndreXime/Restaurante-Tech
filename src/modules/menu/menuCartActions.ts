'use client';
import { encontrarMenorIdDisponivel } from '@/shared/lib/utils';
import { useNavStore } from '@/store/navStore';
import { showMessage } from '@/store/popupStore';
import { useDataStore } from '@/store/userStore';
import { RecordTransaction } from '../accounting/accountingActions';
import { sumTableTotalCost } from '@/shared/lib/numberUtils';

export async function CheckoutCurrentTable() {
    const { mesaSelecionadaId, setMesaSelecionadaId, setMesas, mesas } = useDataStore.getState();
    const { setActiveTab } = useNavStore.getState();

    const mesaAtual = mesas.find((mesa) => mesa.id == mesaSelecionadaId);

    if (!mesaAtual) return;

    const empty: TablesType = {
        ...mesaAtual,
        status: 'livre',
        guests: 0,
        products: { inCart: [], inKitchen: [], alreadyEaten: [] },
        usedAt: '',
        clienteNome: '',
        waiter: '',
    };

    RecordTransaction({
        description: 'Venda - ' + mesaAtual.mesaNome,
        amount: sumTableTotalCost(mesaAtual),
        date: new Date(),
        type: 'entrada',
    });

    setMesas((prev) => prev.map((table) => (table.id !== mesaAtual.id ? table : empty)));

    setMesaSelecionadaId(undefined);
    setActiveTab('Serviços de Mesa');
    showMessage('Pagamento realizado com sucesso, limpando mesa...');
}

export async function SendCurrentTableOrderKitchen(products: FoodCartType[]) {
    const { mesaSelecionadaId, mesas, setMesas, setCozinha, cozinha } = useDataStore.getState();

    const mesaAtual = mesas.find((mesa) => mesa.id == mesaSelecionadaId);

    if (!mesaAtual) return;

    const orderId = encontrarMenorIdDisponivel(cozinha);

    const orderItems = products.map((item) => {
        return {
            orderId: orderId,
            foodId: item.foodId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
        };
    });

    const novoPedido: KitchenOrderType = {
        id: orderId,
        type: 'table',
        ownerId: mesaAtual.id,
        ownerTable: mesaAtual.mesaNome,
        ownerName: mesaAtual.clienteNome,
        chef: 'João',
        createdAt: new Date().toISOString(),
        orderItems,
    };
    setCozinha((prev) => [...prev, novoPedido]);

    setMesas((prev) =>
        prev.map((mesa) => {
            if (mesa.id != mesaAtual.id) return mesa;

            return {
                ...mesa,
                products: {
                    inCart: [],
                    inKitchen: [...mesa.products.inKitchen, ...orderItems],
                    alreadyEaten: mesa.products.alreadyEaten,
                },
            };
        })
    );

    showMessage('Pedido enviado à cozinha');
}
