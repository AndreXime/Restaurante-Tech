import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { useDataStore } from '@/store/userStore';
import { DeliveryOrderCard } from './DeliveryCard';
import { getDeliveryStatus } from './deliveryUtils';

export function DeliveryOrders() {
    const Entrega = useDataStore((state) => state.entrega);

    const pendingOrders = Entrega.filter((order) => getDeliveryStatus(order) == 'pendente');
    const inProgressOrders = Entrega.filter((order) => getDeliveryStatus(order) == 'em andamento');

    return (
        <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4 gap-2">
                <TabsTrigger value="pending" className="relative">
                    Pendentes
                    <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingOrders.length}
                    </span>
                </TabsTrigger>
                <TabsTrigger value="inProgress" className="relative">
                    Em Andamento
                    <span className="absolute -top-1 -right-3 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {inProgressOrders.length}
                    </span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pendingOrders.length == 0 && (
                    <h2 className="font-bold text-2xl text-center p-10 w-full col-span-full">
                        Nenhuma entrega pendente
                    </h2>
                )}

                {pendingOrders.map((order) => (
                    <DeliveryOrderCard key={order.id} order={order} status="pendente" />
                ))}
            </TabsContent>

            <TabsContent value="inProgress" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {inProgressOrders.length == 0 && (
                    <h2 className="font-bold text-2xl text-center p-10 w-full col-span-full">
                        Nenhuma entrega em andamento
                    </h2>
                )}

                {inProgressOrders.map((order) => (
                    <DeliveryOrderCard key={order.id} order={order} status="em andamento" />
                ))}
            </TabsContent>
        </Tabs>
    );
}
