import { Button, Card, CardContent } from '@/shared/ui';
import { Clock, User, Check } from 'lucide-react';
import { MakeDeliveryOrderReady, MakeTableOrderReady, MakeTakeOutOrderReady } from './kitchenActions';
import { formatarHoraMinuto } from '@/shared/lib/utils';

export function OrderCard({ order }: { order: KitchenOrderType }) {
    const orderTypeHandlers = {
        table: MakeTableOrderReady,
        delivery: MakeDeliveryOrderReady,
        takeout: MakeTakeOutOrderReady,
    };

    const makeOrderReady = orderTypeHandlers[order.type];

    return (
        <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold">Pedido {order.ownerTable}</h3>
                        <p className="text-sm text-gray-600">Cliente: {order.ownerName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600`}>
                        pendente
                    </span>
                </div>

                <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{formatarHoraMinuto(order.createdAt)}</span>
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
                    <Button
                        variant="default"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => makeOrderReady(order)}
                    >
                        <Check className="h-4 w-4 mr-2" />
                        Marcar como pronto
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
