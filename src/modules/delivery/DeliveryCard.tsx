import { Button, Card, CardContent } from '@/shared/ui';
import { MapPin, Phone, Clock, Package, User } from 'lucide-react';
import { StartingDelivery, EndDelivery } from './DeliveryActions';

const statusMap = {
    pendente: {
        color: 'bg-red-100 text-red-600',
        action: StartingDelivery,
    },
    'em andamento': {
        color: 'bg-yellow-100 text-yellow-600',
        action: EndDelivery,
    },
};

export function DeliveryOrderCard({ order, status }: { order: DeliveryType; status: 'pendente' | 'em andamento' }) {
    const { color, action } = statusMap[status];

    const buttonAction = () => action(order.id);

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold">{order.customer}</h3>
                        <p className="text-sm text-gray-600">Pedido: {order.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>
                </div>

                <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{order.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{order.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Horário: {order.startedAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Package className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                            {order.payments.items} itens - R${order.payments.total.toFixed(2)}
                        </span>
                    </div>
                    {status == 'em andamento' && (
                        <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Entregador: {order.deliveryPerson}</span>
                        </div>
                    )}
                </div>

                <div className="flex">
                    {status === 'pendente' && (
                        <>
                            <Button
                                variant="default"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={buttonAction}
                            >
                                Atribuir Entregador
                            </Button>
                        </>
                    )}

                    {status === 'em andamento' && (
                        <>
                            <Button
                                variant="default"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={buttonAction}
                            >
                                Confirmar Entrega
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
