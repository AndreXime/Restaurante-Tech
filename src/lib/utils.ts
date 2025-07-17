import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseNumberBR(valor: string): number {
    return Number(valor.replace(/\./g, '').replace(',', '.'));
}

export function getHours() {
    return new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function encontrarMenorIdDisponivel<T extends { id: string | number }>(items: T[]): number {
    const usados = items.map((item) => Number(item.id));
    let i = 1;
    while (usados.includes(i)) i++;
    return i;
}

export function getDeliveryStatus({ startedAt }: { startedAt?: string }): 'pendente' | 'em andamento' {
    if (startedAt) return 'em andamento';
    return 'pendente';
}

export function sumTotalCost(mesa: TablesType) {
    const productsStandby = mesa.products.inCart || [];
    const productsProcessing = mesa.products.inKitchen || [];
    const productsDone = mesa.products.alreadyEaten || [];

    const subtotalStandby = productsStandby.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalProcessing = productsProcessing.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const subtotalDone = productsDone.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const subTotal = subtotalDone + subtotalProcessing + subtotalStandby;
    const tax = subTotal * 0.05;

    return 'R$' + (subTotal + tax).toFixed(2).replace('.', ',');
}
