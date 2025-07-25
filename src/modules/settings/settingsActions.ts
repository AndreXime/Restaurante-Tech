import { useDataStore } from '@/store/userStore';

export function removeFuncionario(funcionarioId: number) {
    const setConfig = useDataStore.getState().setConfig;
    setConfig((prev) => ({
        ...prev,
        funcionarios: prev.funcionarios.filter((funcionario) => funcionario.id !== funcionarioId),
    }));
}

export function removeProduto(produtoId: number) {
    const setCardapio = useDataStore.getState().setCardapio;
    setCardapio((prev) => ({
        ...prev,
        pratos: prev.pratos.filter((prato) => prato.id !== produtoId),
    }));
}

export function removeCategoria(categoriaId: number) {
    const setCardapio = useDataStore.getState().setCardapio;
    setCardapio((prev) => ({
        ...prev,
        categorias: prev.categorias.filter((prato) => prato.id !== categoriaId),
    }));
}

export function removeMesa(mesaId: number) {
    const setCardapio = useDataStore.getState().setMesas;
    setCardapio((prev) => ({
        ...prev.filter((mesa) => mesa.id !== mesaId),
    }));
}

export function createFuncionario(data: FuncionariosType) {
    const setConfig = useDataStore.getState().setConfig;
    setConfig((prev) => ({
        ...prev,
        funcionarios: [data, ...prev.funcionarios],
    }));
}

export function createProduto(data: CardapioFoodType) {
    const setCardapio = useDataStore.getState().setCardapio;
    setCardapio((prev) => ({
        ...prev,
        pratos: [data, ...prev.pratos],
    }));
}

export function createCategoria(data: CategoriesType) {
    const setCardapio = useDataStore.getState().setCardapio;
    setCardapio((prev) => ({
        ...prev,
        categorias: [data, ...prev.categorias],
    }));
}
