import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, User, Check } from 'lucide-react';
import { useDataStore } from '@/store/userStore';

export function OrderCard({ order }: { order: KitchenOrderType }) {
    async function ReadyOrder() {
        const setCozinha = useDataStore.getState().setCozinha;
        if (order.type == 'table') {
            const setMesas = useDataStore.getState().setMesas;
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
                            alreadyEaten: [...mesa.products.alreadyEaten, ...itemsDoPedido],
                        },
                    };
                })
            );
        } else {
            const setEntrega = useDataStore.getState().setEntrega;
            setEntrega((prev) =>
                prev.map((entrega) => {
                    if (entrega.kitchenOrderId !== order.id) return entrega;

                    return {
                        ...entrega,
                        startedAt: new Date().toISOString(), // Pedido pronto, pronto para despacho
                    };
                })
            );
        }
        setCozinha((prev) => prev.filter((coz) => coz.id != order.id));
    }

    const messages = {
        name: order.type == 'table' ? `${order.ownerName}` : `Para entregar`,
        customer: order.type == 'table' ? order.id : order.ownerName,
    };

    return (
        <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold">{messages.name}</h3>
                        <p className="text-sm text-gray-600">Pedido {messages.customer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600`}>
                        pendente
                    </span>
                </div>

                <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Cozinheiro: {order.chef}</span>
                    </div>
                </div>

                <div className="border-t border-b py-3 mb-3">
                    <h4 className="font-medium mb-2">Itens:</h4>
                    <ul className="space-y-2">
                        {order.orderItems.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>
                                    {item.quantity}x {item.title}
                                </span>
                                {item.notes && <span className="text-sm text-gray-500 italic">({item.notes})</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-2 mt-auto">
                    <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700" onClick={ReadyOrder}>
                        <Check className="h-4 w-4 mr-2" />
                        {order.type == 'table' ? 'Enviar para mesa' : 'Enviar para entrega'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
