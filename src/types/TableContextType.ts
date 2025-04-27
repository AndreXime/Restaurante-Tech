import { Dispatch, SetStateAction } from 'react';
import { TablesType, DeliveryType, ContabilidadeType, ConfigType, KitchenOrderType, CardapioType } from './types';

export type TableContextType = {
	selectedTable: TablesType; // Pode se no início
	setSelectedTable: Dispatch<SetStateAction<TablesType>>; // Ajuste no setState para permiti

	Mesas: TablesType[]; // Pode se até carregar os dados
	setMesas: Dispatch<SetStateAction<TablesType[]>>;

	Contabilidade: ContabilidadeType; // Pode se até carregar os dados
	setContabilidade: Dispatch<SetStateAction<ContabilidadeType>>;

	Config: ConfigType; // Pode se até carregar os dados
	setConfig: Dispatch<SetStateAction<ConfigType>>;

	Cozinha: KitchenOrderType[]; // Pode se até carregar os dados
	setCozinha: Dispatch<SetStateAction<KitchenOrderType[]>>;

	Entrega: DeliveryType[]; // Pode se até carregar os dados
	setEntrega: Dispatch<SetStateAction<DeliveryType[]>>;

	Cardapio: CardapioType; // Pode se até carregar os dados
	setCardapio: Dispatch<SetStateAction<CardapioType>>;
};
