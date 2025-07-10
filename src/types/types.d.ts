import { LucideIcon } from 'lucide-react';

declare global {
    // Para Mesas
    interface TablesType {
        id: number;
        status: 'ocupada' | 'livre';
        guests: number;
        time: string;
        server: string;
        hidden?: boolean;
        mesaNome: string;
        clienteNome: string;
        products: {
            standby: FoodCartType[];
            processing: FoodCartType[];
            done: FoodCartType[];
        };
    }

    // Para Cozinha
    interface KitchenOrderType {
        id: string;
        table: string; // Atributo mesaNome que é unico de TablesType
        time: string;
        clientName?: string;
        server: string;
        orderItems: Array<{
            name: string;
            quantity: number;
            notes?: string;
        }>;

        // Dados extras para delivery
        isDelivery?: true;
        deliveryAddress?: string;
        deliveryPhone?: string;
        paymentMethod?: string;

        createdAt: string; // pedido enviado pra cozinha
        startedAt?: string; // cozinha começou a preparar
        endedAt?: string; // cozinha terminou
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
        deliveryPerson?: string;

        createdAt: string; // delivery criado (após endedAt da cozinha)
        dispatchedAt?: string; // saiu pra entrega
        deliveredAt?: string; // entregue com sucesso
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
