'use client';

import { CreditCard, QrCode, Banknote } from 'lucide-react';
import { Button, Input, Label } from '@/components/ui';
import Image from 'next/image';
import { useDataStore } from '@/store/userStore';
import { encontrarMenorIdDisponivel, getHours } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useNavStore } from '@/store/navStore';

export function DeliveryCart() {
    const mesaSelecionada = useDataStore((state) => state.mesaSelecionada);
    const setMesaSelecionada = useDataStore((state) => state.setMesaSelecionada);
    const mesas = useDataStore((state) => state.mesas);
    const setActiveTab = useNavStore((state) => state.setActiveTab);

    const [tempCustomer, setTempCustomer] = useState({
        clienteNome: '',
        type: '',
        endereco: '',
        pagamento: '',
        phone: '',
    });

    const setCozinha = useDataStore((state) => state.setCozinha);
    const cozinha = useDataStore((state) => state.cozinha);

    useEffect(() => {
        const mesaVirtual = mesas.find((m) => m.id === -1);
        if (mesaVirtual) {
            setMesaSelecionada({ ...mesaVirtual });
            setTempCustomer({ ...tempCustomer, clienteNome: mesaVirtual.clienteNome || 'Desconhecido' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setMesaSelecionada((prev) => {
            if (!prev) return prev;
            return { ...prev, clienteNome: tempCustomer.clienteNome };
        });
    }, [tempCustomer, setMesaSelecionada]);

    const productsStandby = mesaSelecionada?.products.standby || [];

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalStandby;
    const tax = subTotal * 0.05;
    const total = subTotal + tax;

    async function EnviarCozinha() {
        const novoPedido: KitchenOrderType = {
            id: encontrarMenorIdDisponivel(cozinha),
            table: 'Delivery',
            isDelivery: true,
            clientName: tempCustomer.clienteNome,
            deliveryAddress: tempCustomer.endereco,
            deliveryPhone: tempCustomer.endereco,
            paymentMethod: tempCustomer.type,
            time: getHours(),
            server: 'João',
            createdAt: new Date().toISOString(),
            startedAt: new Date().toISOString(),
            orderItems: productsStandby.map((item) => {
                return { name: item.title, quantity: item.quantity };
            }),
        };
        setCozinha((prev) => [...prev, novoPedido]);
        setMesaSelecionada((prev) => {
            if (!prev) return prev;
            return { ...prev, clienteNome: '', products: { ...prev.products, standby: [] } };
        });
    }

    return (
        <div className="bg-white border-l flex flex-col h-full">
            <div className="flex-1 overflow-auto p-6 min-h-[500px]">
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
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold pb-4">
                            Selecione{' '}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => {
                                    setActiveTab('Cardápio');
                                }}
                            >
                                Delivery
                            </span>{' '}
                            no cardapio para adicionar ao carrinho
                        </h2>
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
                                    value={tempCustomer.clienteNome}
                                    onChange={(e) => setTempCustomer({ ...tempCustomer, clienteNome: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 col-span-full md:col-span-1">
                                <Label htmlFor="server">Telefone</Label>
                                <Input
                                    id="server"
                                    value={tempCustomer.phone}
                                    onChange={(e) => setTempCustomer({ ...tempCustomer, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 w-full col-span-full md:col-span-2">
                                <Label htmlFor="server">Endereco</Label>
                                <Input
                                    id="server"
                                    value={tempCustomer.endereco}
                                    onChange={(e) => setTempCustomer({ ...tempCustomer, endereco: e.target.value })}
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
                                    tempCustomer.type == 'Retirar' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setTempCustomer((prev) => {
                                        return { ...prev, type: 'Retirar' };
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
                                    tempCustomer.type == 'Entregar' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setTempCustomer((prev) => {
                                        return { ...prev, type: 'Entregar' };
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
                                    tempCustomer.pagamento == 'Dinheiro' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setTempCustomer((prev) => {
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
                                    tempCustomer.pagamento == 'Cartao' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setTempCustomer((prev) => {
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
                                    tempCustomer.pagamento == 'Pix' &&
                                    'bg-green-600 hover:bg-green-600 hover:text-white text-white'
                                }`}
                                onClick={() =>
                                    setTempCustomer((prev) => {
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
                src={item.image}
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
