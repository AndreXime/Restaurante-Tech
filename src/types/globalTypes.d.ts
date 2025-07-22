// Para Mesas
interface TablesType {
    id: number;
    status: 'ocupada' | 'livre';
    mesaNome: string;
    clienteNome: string;

    usedAt: string;
    guests: number;
    waiter: string;
    hidden?: boolean;

    products: {
        inCart: FoodCartType[];
        inKitchen: FoodCartType[];
        alreadyEaten: FoodCartType[];
    };
}

// Para Cozinha
interface KitchenOrderType {
    id: number;
    type: 'table' | 'delivery' | 'takeout';
    ownerId: number;
    ownerName: string; // nome do client
    ownerTable: string;

    chef: string;
    orderItems: FoodCartType[];

    createdAt: string; // pedido enviado pra cozinha
    startedAt?: string; // cozinha começou a preparar
    endedAt?: string; // cozinha terminou
}

// Para Entregas
interface DeliveryType {
    id: number;
    kitchenOrderId?: number; // único pedido enviado à cozinha

    customer?: string;
    address?: string;
    phone?: string;

    payments: {
        items: number;
        total: number;
        type: 'dinheiro' | 'cartao' | 'pix';
    };

    deliveryPerson?: string;

    startedAt?: string; // delivery criado (após endedAt da cozinha)
    dispatchedAt?: string; // saiu pra entrega
    deliveredAt?: string; // entregue com sucesso
}

// Para o Cardapio
interface CardapioType {
    categorias: CategoriesType[];
    pratos: CardapioFoodType[];
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

interface CardapioFoodType {
    id: number;
    imageBlob: Blob;
    imageURL: string;
    title: string;
    price: number;
    discount?: number;
    category: string[];
    status: string;
}

interface FoodCartType {
    foodId: number;
    orderId?: number;
    title: string;
    price: number;
    quantity: number;
    notes?: string;
}
