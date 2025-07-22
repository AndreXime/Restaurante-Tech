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
    date: Date;
}

interface CategoriesType {
    id: number;
    icon: string;
    label: string;
    qtdItems: number;
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
    taxRate: number;
    currency: string;
}
