import { ClientDataType } from '@/types/ClientDataType';

export const restaurantVazio: ClientDataType = {
    cardapio: { categorias: [], pratos: [] },
    mesas: [],
    config: {
        geralData: { restaurantName: '', address: '', phone: '', email: '', taxRate: '', currency: '' },
        funcionarios: [],
    },
    entrega: [],
    contabilidade: {
        resumo: [
            {
                title: 'Vendas Totais',
                value: '0',
                change: '0%',
                trend: 'up',
            },
            {
                title: 'Pedidos',
                value: '0',
                change: '0%',
                trend: 'up',
            },
            {
                title: 'Valor Médio por Pedido',
                value: '0',
                change: '0%',
                trend: 'up',
            },
            {
                title: 'Vendas Totais',
                value: '0',
                change: '0%',
                trend: 'up',
            },
        ],

        transacoes: [],
    },
    cozinha: [],
    mesaSelecionada: {
        id: 0,
        guests: 0,
        status: 'livre',
        time: '',
        server: '',
        mesaNome: '',
        clienteNome: '',
        products: { done: [], processing: [], standby: [] },
    },
};
