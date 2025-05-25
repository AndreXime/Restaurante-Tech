'use client';
import { Template } from '@/fake-data/RestauranteTemplate';
import { StoreData, StoreNames } from '@/types/databaseType';
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

	public async salvarData<K extends StoreNames>(store: K, data: StoreData[K]): Promise<void> {
		const db = await this.getDb();
		await db.put(store, data, 'dados');
	}

	public async carregarClient(): Promise<Template> {
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

	public async carregarDemo(): Promise<Template> {
		const moduleImport = await import('@/fake-data/RestauranteTemplate');
		const { restauranteFake } = moduleImport;
		return restauranteFake;
	}
}

// Exporta um singleton para evitar abrir muitas conexões
export const localDatabase = new LocalDatabase();
