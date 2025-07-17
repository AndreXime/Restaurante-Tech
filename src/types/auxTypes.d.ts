import type { LucideIcon } from 'lucide-react';

declare global {
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
