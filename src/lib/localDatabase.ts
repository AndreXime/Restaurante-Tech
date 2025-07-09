'use client';
import { ClientDataType, ClientDataKeys } from '@/types/ClientDataType';
import { IDBPDatabase, openDB } from 'idb';

class LocalDatabase {
    private dbInstance: IDBPDatabase | null = null;

    private async getDb(): Promise<IDBPDatabase> {
        if (typeof window === 'undefined') {
            throw new Error('indexedDB só pode ser usado no client-side.');
        }
        if (this.dbInstance) return this.dbInstance;
        this.dbInstance = await openDB('empresa-db', 1, {
            upgrade(db) {
                db.createObjectStore('cardapio');
                db.createObjectStore('mesas');
                db.createObjectStore('config');
                db.createObjectStore('entrega');
                db.createObjectStore('contabilidade');
                db.createObjectStore('cozinha');
                db.createObjectStore('mesaSelecionada');
            },
        });
        return this.dbInstance;
    }

    public async salvarData<K extends ClientDataKeys>(store: K, data: ClientDataType[K]): Promise<void> {
        const db = await this.getDb();
        await db.put(store, data, 'dados');
    }

    public async carregarClient(): Promise<ClientDataType> {
        const db = await this.getDb();
        const [cardapio, mesas, config, entrega, contabilidade, cozinha, mesaSelecionada] = await Promise.all([
            db.get('cardapio', 'dados'),
            db.get('mesas', 'dados'),
            db.get('config', 'dados'),
            db.get('entrega', 'dados'),
            db.get('contabilidade', 'dados'),
            db.get('cozinha', 'dados'),
            db.get('mesaSelecionada', 'dados'),
        ]);

        return {
            cardapio,
            mesas,
            config,
            entrega,
            contabilidade,
            cozinha,
            mesaSelecionada,
        };
    }

    public async carregarDemo(): Promise<ClientDataType> {
        const gerarDadosRestauranteFake = (await import('@/lib/demo/generateData')).default;
        return gerarDadosRestauranteFake();
    }
}

// Exporta um singleton para evitar abrir muitas conexões
export const localDatabase = new LocalDatabase();
