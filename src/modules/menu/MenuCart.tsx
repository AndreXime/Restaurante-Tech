'use client';
import { CreditCard, QrCode, Banknote } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useDataStore } from '@/store/userStore';
import { getProductImage } from '@/shared/lib/utils';
import { CheckoutCurrentTable, SendCurrentTableOrderKitchen } from './menuActions';

export function Cart() {
    const mesas = useDataStore((state) => state.mesas);
    const mesaSelecionadaId = useDataStore((state) => state.mesaSelecionadaId);
    const taxRate = useDataStore((state) => state.config.geralData.taxRate);

    const mesaAtual = mesas.find((mesa) => mesa.id == mesaSelecionadaId);

    const productsStandby = mesaAtual?.products.inCart || [];
    const productsProcessing = mesaAtual?.products.inKitchen || [];
    const productsDone = mesaAtual?.products.alreadyEaten || [];

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalProcessing = productsProcessing.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalDone = productsDone.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalDone + subtotalProcessing + subtotalStandby;
    const tax = subTotal * (taxRate / 100);
    const total = subTotal + tax;

    return (
        <div className=" bg-white border-l flex flex-col h-full">
            <div className="p-4 border-b flex justify-between items-center">
                <div>
                    <div className="flex flex-col md:flex-row items-baseline justify-center gap-3">
                        <h2 className="text-xl font-bold">{mesaAtual?.mesaNome}</h2>
                        <span className="text-gray-500">Cliente: {mesaAtual?.clienteNome}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                {!mesaAtual && (
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
                                onClick={() => SendCurrentTableOrderKitchen(productsStandby)}
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
                        <span className="text-gray-600">Taxa de serviço: {taxRate}%</span>
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
                    onClick={CheckoutCurrentTable}
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
            <img
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
