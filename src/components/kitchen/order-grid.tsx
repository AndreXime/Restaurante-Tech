import { OrderCard } from './order-card';
import { useDataStore } from '@/store/userStore';
import { getPedidoStatus } from '@/lib/utils';

export function OrderGrid() {
    const Cozinha = useDataStore((state) => state.cozinha);

    const pendingOrders = Cozinha.filter((order) => getPedidoStatus(order) == 'pendente');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pendingOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido pendente</h2>}

            {pendingOrders.map((order, index) => (
                <OrderCard key={index} order={order} />
            ))}
        </div>
    );
}
