'use client';

import { CreditCard, QrCode, Banknote } from 'lucide-react';
import { Button, Input, Label } from '@/components/ui';
import Image from 'next/image';
import { useDataStore } from '@/store/userStore';
import { encontrarMenorIdDisponivel } from '@/lib/utils';
import { useNavStore } from '@/store/navStore';
import { getProductImage } from '@/lib/getProductImage';
import { restaurantVazio } from '@/lib/restauranteVazio';

export function DeliveryCart() {
    const deliverySelecionado = useDataStore((state) => state.deliverySelecionado);
    const setDeliverySelecionado = useDataStore((state) => state.setDeliverySelecionado);
    const entrega = useDataStore((state) => state.entrega);

    const setActiveTab = useNavStore((state) => state.setActiveTab);

    const setCozinha = useDataStore((state) => state.setCozinha);
    const cozinha = useDataStore((state) => state.cozinha);

    const productsStandby = deliverySelecionado?.inCart || [];
    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalStandby;
    const tax = subTotal * 0.05;
    const total = subTotal + tax;

    async function EnviarCozinha() {
        const newId = encontrarMenorIdDisponivel(entrega);

        const novoPedido: KitchenOrderType = {
            id: encontrarMenorIdDisponivel(cozinha),
            type: 'delivery',
            ownerId: newId,
            ownerName: deliverySelecionado?.customer || 'Desconhecido',
            chef: 'João',
            createdAt: new Date().toISOString(),
            startedAt: new Date().toISOString(),
            orderItems: productsStandby.map((item) => {
                return { foodId: item.foodId, title: item.title, price: item.price, quantity: item.quantity };
            }),
        };
        setCozinha((prev) => [...prev, novoPedido]);
        setDeliverySelecionado(restaurantVazio.deliverySelecionado);
    }

    return (
        <div className="bg-white border-l flex flex-col h-full">
            <div className="flex-1 overflow-auto p-6 min-h-[500px]">
                {!deliverySelecionado && (
                    <h2 className="font-bold text-2xl text-center p-10 w-full col-span-full">
                        Nenhuma mesa valida ocupada foi selecionada
                    </h2>
                )}
                <div className="space-y-4">
                    {productsStandby.length != 0 ? (
                        <div className="w-full">
                            <h2 className="text-xl font-bold pb-4">Esperando confirmação da ordem</h2>
                            {productsStandby.map((item, index) => (
                                <CartItem key={index} {...item} />
                            ))}
                        </div>
                    ) : (
                        <button
                            onClick={() => setActiveTab('Cardápio', true)}
                            className="text-indigo-600 font-bold text-2xl text-center p-4 w-full cursor-pointer"
                        >
                            Clique para ir no Cardápio no modo delivery
                        </button>
                    )}
                </div>
            </div>
            <div className="border-t p-4">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>R${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Imposto 5%</span>
                        <span>R${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Valor Total</span>
                        <span>R${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-1 gap-4 pb-5 border-t p-4">
                    <div className="flex justify-start items-start flex-col">
                        <h3 className="font-bold pb-4">Infomações do cliente</h3>
                        <div className="gap-4 grid md:grid-cols-4 w-full">
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="customer-name">Nome do Cliente</Label>
                                <Input
                                    id="customer-name"
                                    defaultValue={deliverySelecionado?.customer}
                                    onChange={(e) =>
                                        setDeliverySelecionado((prev) => {
                                            return { ...prev, clienteNome: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="server">Telefone</Label>
                                <Input
                                    id="server"
                                    defaultValue={deliverySelecionado?.phone}
                                    onChange={(e) =>
                                        setDeliverySelecionado((prev) => {
                                            return { ...prev, phone: e.target.value };
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2 w-full col-span-full md:col-span-2">
                                <Label htmlFor="server">Endereco</Label>
                                <Input
                                    id="server"
                                    defaultValue={deliverySelecionado?.address}
                                    onChange={(e) =>
                                        setDeliverySelecionado((prev) => {
                                            return { ...prev, endereco: e.target.value };
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col col-span-full">
                        <h3 className="font-bold pb-4">Tipo de recibemento</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-2">
                            <Button
                                size={'lg'}
                                variant="outline"
                                className={`flex flex-row items-center py-2 w-full ${
                                    deliverySelecionado?.type == 'takeout' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setDeliverySelecionado((prev) => {
                                        if (!prev) return prev;
                                        return { ...prev, type: 'takeout' };
                                    })
                                }
                            >
                                <Banknote className="h-5 w-5" />
                                <span>Retirar</span>
                            </Button>
                            <Button
                                size={'lg'}
                                variant="outline"
                                className={`flex flex-row items-center py-2 w-full ${
                                    deliverySelecionado?.type == 'delivery' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setDeliverySelecionado((prev) => {
                                        if (!prev) return prev;
                                        return { ...prev, type: 'delivery' };
                                    })
                                }
                            >
                                <CreditCard className="h-5 w-5" />
                                <span>Entregar</span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <h3 className="font-bold text-center pb-3">Metodo de pagamento</h3>
                        <div className="grid md:grid-cols-3 gap-2 mb-4">
                            <Button
                                variant="outline"
                                className={`flex flex-row items-center py-2  ${
                                    deliverySelecionado?.payments.type == 'dinheiro' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setDeliverySelecionado((prev) => {
                                        if (!prev) return prev;

                                        return { ...prev, pagamento: 'Dinheiro' };
                                    })
                                }
                            >
                                <Banknote className="h-5 w-5" />
                                <span>Dinheiro</span>
                            </Button>
                            <Button
                                variant="outline"
                                className={`flex flex-row items-center py-2  ${
                                    deliverySelecionado?.payments.type == 'cartao' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setDeliverySelecionado((prev) => {
                                        if (!prev) return prev;

                                        return { ...prev, pagamento: 'Cartao' };
                                    })
                                }
                            >
                                <CreditCard className="h-5 w-5" />
                                <span>Cartão</span>
                            </Button>
                            <Button
                                variant="outline"
                                className={`flex flex-row items-center py-2  ${
                                    deliverySelecionado?.payments.type == 'pix' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setDeliverySelecionado((prev) => {
                                        if (!prev) return prev;

                                        return { ...prev, pagamento: 'Pix' };
                                    })
                                }
                            >
                                <QrCode className="h-5 w-5" />
                                <span>Pix</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-bold"
                    onClick={EnviarCozinha}
                >
                    Fechar pedido e enviar para cozinha
                </Button>
            </div>
        </div>
    );
}

function CartItem(item: FoodCartType) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <Image
                src={getProductImage(item.foodId) || ''}
                alt={item.title}
                width={500}
                height={500}
                className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-green-600 font-bold">R${item.price.toFixed(2)}</span>
                    <span>{item.quantity}X</span>
                </div>
            </div>
        </div>
    );
}
