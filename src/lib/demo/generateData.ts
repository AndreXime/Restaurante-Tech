import { faker } from '@faker-js/faker/locale/pt_BR';
import { Coffee, UtensilsCrossed, ChefHat, Sandwich, GlassWater, Fish, Pizza, Soup, Grid } from 'lucide-react';
import { demoPratos } from './demoPratos';
import { ClientDataType } from '@/types/ClientDataType';

export default function gerarDadosRestauranteFake(): ClientDataType {
    const funcionarios = generateFuncionarios();
    const cardapio = generateCardapio();
    const mesas = generateMesas(9, funcionarios);
    const cozinha = generateKitchenOrders(mesas, cardapio);
    const entrega = generateDeliveries(20);
    const config = generateConfig(funcionarios);
    const contabilidade = generateContabilidade(50);
    const mesaSelecionada = mesas.filter((mesa) => mesa.status == 'ocupada')[0];

    return {
        cardapio,
        mesas,
        cozinha,
        entrega,
        config,
        contabilidade,
        mesaSelecionada,
    };
}

// Retorna um item aleatório de uma lista
const randomItem = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
};

// --- FUNÇÕES DE GERAÇÃO PARA CADA TIPO ---

const generateFuncionarios = (): FuncionariosType[] => {
    const funcionarios: FuncionariosType[] = [
        { id: 1, name: faker.person.fullName(), role: 'Administrador', status: 'Ativo' },
        { id: 2, name: faker.person.fullName(), role: 'Atendente', status: 'Ativo' },
        { id: 3, name: faker.person.fullName(), role: 'Cozinheiro', status: 'Ativo' },
        { id: 4, name: faker.person.fullName(), role: 'Entregador', status: 'Ativo' },
    ];
    //const roles: FuncionariosType['role'][] = ['Atendente', 'Cozinheiro', 'Entregador'];

    /*for (let i = 2; i <= count; i++) {
        funcionarios.push({
            id: i,
            name: faker.person.fullName(),
            role: randomItem(roles),
            status: faker.helpers.arrayElement(['Ativo', 'Inativo']),
        });
    }*/

    return funcionarios;
};

const generateCardapio = (): CardapioType => {
    const availableIcons = [Coffee, UtensilsCrossed, ChefHat, Sandwich, GlassWater, Fish, Pizza, Soup, Grid];

    const nomesCategorias = [...new Set(demoPratos.flatMap((p) => p.category))];

    const categorias: CategoriesType[] = nomesCategorias.map((catLabel, index) => ({
        id: index + 2, // ID começa em 2, pois 1 é reservado para "Todos"
        label: catLabel,
        items: '0 Itens',
        icon: randomItem(availableIcons),
    }));

    const pratos: FoodType[] = demoPratos.map((pratoDefinido, index) => ({
        id: index + 1,
        title: pratoDefinido.title,
        image: pratoDefinido.image,
        category: pratoDefinido.category,

        price: parseFloat(faker.commerce.price({ min: 15, max: 90 })),
        discount: faker.helpers.maybe(() => faker.number.int({ min: 5, max: 20 }), { probability: 0.3 }),
        status: 'Ativo',
    }));

    // Atualiza a contagem de itens para cada categoria
    categorias.forEach((cat) => {
        const count = pratos.filter((p) => p.category.includes(cat.label)).length;
        cat.items = `${count} ${count === 1 ? 'Item' : 'Itens'}`;
    });

    // Adiciona a categoria "Todos" no início da lista
    categorias.unshift({
        id: 1,
        label: 'Todos',
        items: `${pratos.length} Itens`,
        icon: Grid,
    });

    return { categorias, pratos };
};

const generateMesas = (count: number, funcionarios: FuncionariosType[]): TablesType[] => {
    const mesas: TablesType[] = [];
    const servidoresAtivos = funcionarios.filter((f) => f.status === 'Ativo').map((f) => f.name);

    for (let i = 1; i <= count; i++) {
        const status = faker.helpers.arrayElement(['ocupada', 'livre'] as const);
        const isLivre = status === 'livre';

        mesas.push({
            id: i,
            mesaNome: `Mesa ${i}`,
            status: status,
            guests: isLivre ? 0 : faker.number.int({ min: 1, max: 8 }),
            time: isLivre
                ? ''
                : new Date(
                      0,
                      0,
                      0,
                      faker.number.int({ min: 8, max: 21 }),
                      faker.number.int({ min: 0, max: 59 })
                  ).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            server: isLivre ? '' : randomItem(servidoresAtivos),
            clienteNome: isLivre ? '' : faker.person.fullName(),
            products: { standby: [], processing: [], done: [] },
        });
    }
    return mesas;
};

const generateKitchenOrders = (mesas: TablesType[], cardapio: CardapioType): KitchenOrderType[] => {
    const pedidosCozinha: KitchenOrderType[] = [];
    const mesasOcupadas = mesas.filter((m) => m.status === 'ocupada');
    let orderId = 1;

    for (const mesa of mesasOcupadas) {
        const orderItems = [];
        const numItems = faker.number.int({ min: 1, max: 4 });

        for (let i = 0; i < numItems; i++) {
            const prato = randomItem(cardapio.pratos);
            const quantity = faker.number.int({ min: 1, max: 2 });
            orderItems.push({
                name: prato.title,
                quantity: quantity,
                notes: faker.helpers.maybe(() => faker.lorem.sentence(3), { probability: 0.4 }),
            });
        }

        pedidosCozinha.push({
            id: String(orderId++).padStart(3, '0'),
            table: String(mesa.id),
            time: mesa.time,
            status: faker.helpers.arrayElement(['pendente', 'pronto'] as const),
            server: mesa.server,
            orderItems,
        });
    }
    return pedidosCozinha;
};

const generateDeliveries = (count: number): DeliveryType[] => {
    const deliveries: DeliveryType[] = [];
    for (let i = 1; i <= count; i++) {
        const status = faker.helpers.arrayElement(['pendente', 'em andamento', 'entregue'] as const);
        deliveries.push({
            id: `PED${String(i).padStart(3, '0')}`,
            customer: faker.person.fullName(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            items: faker.number.int({ min: 1, max: 7 }),
            total: parseFloat(faker.commerce.price({ min: 25, max: 250 })),
            time: faker.date.recent().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status,
            deliveryPerson: status !== 'pendente' ? `${faker.person.firstName()} Motoboy` : undefined,
        });
    }
    return deliveries;
};

const generateContabilidade = (count: number): ContabilidadeType => {
    const resumo: ResumoAccountingType[] = [
        {
            title: 'Vendas Totais',
            value: faker.finance.amount({ min: 10000, max: 20000, dec: 2 }),
            change: `+${faker.number.float({ min: 1, max: 15, fractionDigits: 1 })}%`,
            trend: 'up',
        },
        {
            title: 'Pedidos',
            value: faker.number.int({ min: 300, max: 900 }).toString(),
            change: `+${faker.number.float({ min: 1, max: 10, fractionDigits: 1 })}%`,
            trend: 'up',
        },
        {
            title: 'Valor Médio por Pedido',
            value: faker.finance.amount({ min: 25, max: 60, dec: 2 }),
            change: `+${faker.number.float({ min: 1, max: 5, fractionDigits: 1 })}%`,
            trend: 'up',
        },
        {
            title: 'Despesas',
            value: faker.finance.amount({ min: 4000, max: 9000, dec: 2 }),
            change: `-${faker.number.float({ min: 1, max: 5, fractionDigits: 1 })}%`,
            trend: 'down',
        },
    ];

    const transacoes: TransactionsType[] = [];
    for (let i = 1; i <= count; i++) {
        const type = faker.helpers.arrayElement(['entrada', 'saída'] as const);
        transacoes.push({
            id: `TX${String(i).padStart(3, '0')}`,
            description:
                type === 'entrada'
                    ? `Venda - Mesa ${faker.number.int({ min: 1, max: 10 })}`
                    : `Pagamento ${faker.commerce.department()}`,
            amount: parseFloat(faker.finance.amount({ min: 20, max: 1500 })),
            type,
            date: faker.date.recent().toLocaleString('pt-BR'),
        });
    }
    return { resumo, transacoes };
};

const generateConfig = (funcionarios: FuncionariosType[]): ConfigType => {
    const geralData: GeneralDataType = {
        restaurantName: `${faker.company.name()} Restaurante`,
        address: faker.location.streetAddress(true),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        taxRate: faker.number.int({ min: 5, max: 15 }).toString(),
        currency: 'BRL',
    };
    return { geralData, funcionarios };
};
