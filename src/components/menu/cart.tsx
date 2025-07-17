'use client';

import { CreditCard, QrCode, Banknote } from 'lucide-react';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { useDataStore } from '@/store/userStore';
import { encontrarMenorIdDisponivel } from '@/lib/utils';
import { getProductImage } from '@/lib/getProductImage';
import { useNavStore } from '@/store/navStore';

export function Cart() {
    const mesaSelecionada = useDataStore((state) => state.mesaSelecionada);
    const setMesaSelecionada = useDataStore((state) => state.setMesaSelecionada);

    const setCozinha = useDataStore((state) => state.setCozinha);
    const cozinha = useDataStore((state) => state.cozinha);

    const productsStandby = mesaSelecionada?.products.inCart || [];
    const productsProcessing = mesaSelecionada?.products.inKitchen || [];
    const productsDone = mesaSelecionada?.products.alreadyEaten || [];

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalProcessing = productsProcessing.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalDone = productsDone.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalDone + subtotalProcessing + subtotalStandby;
    const tax = subTotal * 0.05;
    const total = subTotal + tax;

    async function EnviarCozinha() {
        const orderId = encontrarMenorIdDisponivel(cozinha);
        const novoPedido: KitchenOrderType = {
            id: orderId,
            type: 'table',
            ownerId: mesaSelecionada?.id || -1,
            ownerName: mesaSelecionada?.mesaNome || '',
            chef: 'João',
            createdAt: new Date().toISOString(),
            orderItems: productsStandby.map((item) => {
                return {
                    orderId: orderId,
                    foodId: item.foodId,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                };
            }),
        };
        setCozinha((prev) => [...prev, novoPedido]);
        setMesaSelecionada((prev) => {
            if (!prev) return prev;
            prev.products.inKitchen.push(...productsStandby);

            return {
                ...prev,
                products: {
                    inCart: [],
                    inKitchen: prev.products.inKitchen,
                    alreadyEaten: prev.products.alreadyEaten,
                },
            };
        });
    }

    async function LiberarMesa() {
        if (!mesaSelecionada) return;
        const setMesas = useDataStore.getState().setMesas;
        const setActiveTab = useNavStore.getState().setActiveTab;

        const empty: TablesType = {
            ...mesaSelecionada,
            status: 'livre',
            guests: 0,
            products: { inCart: [], inKitchen: [], alreadyEaten: [] },
            usedAt: '',
            clienteNome: '',
            waiter: '',
        };

        setMesas((prev) => prev.map((table) => (table.id !== mesaSelecionada.id ? table : empty)));

        setMesaSelecionada(undefined);
        setActiveTab('Serviços de Mesa');
    }

    return (
        <div className=" bg-white border-l flex flex-col h-full">
            <div className="p-4 border-b flex justify-between items-center">
                <div>
                    <div className="flex flex-col md:flex-row items-baseline justify-center gap-3">
                        <h2 className="text-xl font-bold">{mesaSelecionada?.mesaNome}</h2>
                        <span className="text-gray-500">Cliente: {mesaSelecionada?.clienteNome}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                {!mesaSelecionada && (
                    <h2 className="text-xl font-bold text-center">Nenhuma mesa valida ocupada foi selecionada</h2>
                )}
                <div className="space-y-4">
                    {productsStandby.length != 0 ? (
                        <div className="w-full">
                            <h2 className="text-xl font-bold pb-4">Esperando confirmação da ordem</h2>
                            {productsStandby.map((item, index) => (
                                <CartItem key={index} {...item} />
                            ))}
                            <Button
                                className=" bg-green-600 hover:bg-green-700 text-white h-12 px-26"
                                onClick={EnviarCozinha}
                            >
                                Enviar pedido para cozinha
                            </Button>
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold pb-4">Nenhum item no carrinho</h2>
                    )}
                    <div className="h-1 bg-zinc-200 my-6" />
                    {productsProcessing.length != 0 ? (
                        <div>
                            <h2 className="text-xl font-bold pb-4">Sendo preparado na cozinha</h2>
                            {productsProcessing.map((item, index) => (
                                <CartItem key={index} {...item} />
                            ))}
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold pb-4">Nenhum item sendo preparado na cozinha</h2>
                    )}
                    <div className="h-1 bg-zinc-200 my-6" />
                    {productsDone.length != 0 ? (
                        <div>
                            <h2 className="text-xl font-bold pb-4">Já foi consumido</h2>
                            {productsDone.map((item, index) => (
                                <CartItem key={index} {...item} />
                            ))}
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold pb-4">Nenhum item foi consumido</h2>
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

                <h3 className="font-bold text-center pb-3">Metodo de pagamento</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button variant="outline" className="flex flex-row items-center py-2">
                        <Banknote className="h-5 w-5 mb-1" />
                        <span className="text-xs">Dinheiro</span>
                    </Button>
                    <Button variant="outline" className="flex flex-row items-center py-2">
                        <CreditCard className="h-5 w-5 mb-1" />
                        <span className="text-xs">Cartão</span>
                    </Button>
                    <Button variant="outline" className="flex flex-row items-center py-2">
                        <QrCode className="h-5 w-5 mb-1" />
                        <span className="text-xs">QR Code</span>
                    </Button>
                </div>
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 mt-0 font-bold"
                    onClick={LiberarMesa}
                    disabled={productsProcessing.length > 0 || productsStandby.length > 0}
                >
                    Fechar conta e liberar mesa
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
