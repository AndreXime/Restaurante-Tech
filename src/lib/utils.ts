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

export function encontrarMenorIdDisponivel<T extends { id: string | number }>(items: T[]): string {
    const usados = items.map((item) => Number(item.id));
    let i = 1;
    while (usados.includes(i)) i++;
    return String(i);
}
