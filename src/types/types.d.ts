import { LucideIcon } from 'lucide-react';

declare global {
    interface TablesType {
        id: number;
        status: 'ocupada' | 'livre';
        guests: number;
        time: string;
        server: string;
        mesaNome: string;
        clienteNome: string;
        products: {
            standby: FoodCartType[];
            processing: FoodCartType[];
            done: FoodCartType[];
        };
    }

    // Para o Cardapio
    interface CardapioType {
        categorias: CategoriesType[];
        pratos: FoodType[];
    }

    // Para configuração
    interface ConfigType {
        geralData: GeneralDataType;
        funcionarios: FuncionariosType[];
    }

    // Para contabilidade
    interface ContabilidadeType {
        resumo: ResumoAccountingType[];
        transacoes: TransactionsType[];
    }

    // Para Cozinha
    interface KitchenOrderType {
        id: string;
        table: string;
        time: string;
        status: 'pendente' | 'pronto';
        server: string;
        orderItems: Array<{
            name: string;
            quantity: number;
            notes?: string;
        }>;
    }

    // Para Entregas
    interface DeliveryType {
        id: string;
        customer: string;
        address: string;
        phone: string;
        items: number;
        total: number;
        time: string;
        status: 'pendente' | 'em andamento' | 'entregue';
        deliveryPerson?: string;
    }

    /* Tipos auxiliares  */

    interface FoodType {
        id: number;
        image: string;
        title: string;
        price: number;
        discount?: number;
        category: string[];
        status: string;
    }

    interface FoodCartType {
        id: number;
        image: string;
        title: string;
        price: number;
        quantity: number;
    }

    interface ResumoAccountingType {
        title: 'Vendas Totais' | 'Pedidos' | 'Valor Médio por Pedido' | 'Despesas';
        value: string;
        change: string;
        trend: 'up' | 'down';
    }

    interface TransactionsType {
        id: string;
        description: string;
        amount: number;
        type: 'entrada' | 'saída';
        date: string;
    }

    interface CategoriesType {
        id: number;
        icon: LucideIcon;
        label: string;
        items: string;
    }

    interface FuncionariosType {
        id: number;
        name: string;
        role: string;
        status: 'Ativo' | 'Inativo';
    }

    interface GeneralDataType {
        restaurantName: string;
        address: string;
        phone: string;
        email: string;
        taxRate: string;
        currency: string;
    }
}
