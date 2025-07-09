import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderCard } from './order-card';
import { useDataStore } from '@/store/userStore';

export function OrderGrid() {
    const Cozinha = useDataStore((state) => state.cozinha);

    const pendingOrders = Cozinha.filter((order) => order.status == 'pendente');
    const readyOrders = Cozinha.filter((order) => order.status == 'pronto');

    return (
        <Tabs defaultValue="pending">
            <TabsList className="mb-4 gap-5">
                <TabsTrigger value="pending" className="relative px-5">
                    Pendentes
                    <span className="absolute -top-1 -right-3 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingOrders.length}
                    </span>
                </TabsTrigger>
                <TabsTrigger value="ready" className="relative px-5">
                    Prontos
                    <span className="absolute -top-1 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {readyOrders.length}
                    </span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {pendingOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido pendente</h2>}
                    {pendingOrders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="ready">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {readyOrders.length == 0 && <h2 className="font-bold text-lg ml-2">Nenhum pedido pronto</h2>}

                    {readyOrders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
