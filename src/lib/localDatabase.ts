class IndexedDBService<T> {
	private static readonly DB_NAME = 'app_db';
	private static readonly DB_VERSION = 1;
	private db: IDBDatabase | null = null;

	async init(stores: { name: string; keyPath?: string; autoIncrement?: boolean }[]): Promise<void> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(IndexedDBService.DB_NAME, IndexedDBService.DB_VERSION);

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				for (const store of stores) {
					if (!db.objectStoreNames.contains(store.name)) {
						db.createObjectStore(store.name, {
							keyPath: store.keyPath ?? 'id',
							autoIncrement: store.autoIncrement ?? true,
						});
					}
				}
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onerror = () => reject(request.error);
		});
	}

	private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
		if (!this.db) throw new Error('DB not initialized');
		const tx = this.db.transaction(storeName, mode);
		return tx.objectStore(storeName);
	}

	async add(storeName: string, item: T): Promise<IDBValidKey> {
		return new Promise((resolve, reject) => {
			const store = this.getStore(storeName, 'readwrite');
			const request = store.add(item);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async get(storeName: string, key: IDBValidKey): Promise<T | undefined> {
		return new Promise((resolve, reject) => {
			const store = this.getStore(storeName);
			const request = store.get(key);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getAll(storeName: string): Promise<T[]> {
		return new Promise((resolve, reject) => {
			const store = this.getStore(storeName);
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async update(storeName: string, item: T): Promise<void> {
		return new Promise((resolve, reject) => {
			const store = this.getStore(storeName, 'readwrite');
			const request = store.put(item);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async delete(storeName: string, key: IDBValidKey): Promise<void> {
		return new Promise((resolve, reject) => {
			const store = this.getStore(storeName, 'readwrite');
			const request = store.delete(key);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
}

export default IndexedDBService;
