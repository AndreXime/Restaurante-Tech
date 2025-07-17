import { useDataStore } from '@/store/userStore';

export function getProductImage(id: number) {
    const pratos = useDataStore.getState().cardapio.pratos;

    return pratos.find((prato) => prato.id === id)?.image;
}
