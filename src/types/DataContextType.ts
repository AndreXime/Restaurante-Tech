import { Dispatch, SetStateAction } from 'react';
import { TablesType, DeliveryType, ContabilidadeType, ConfigType, KitchenOrderType, CardapioType } from './types';

type DataContextType = {
	mesaSelecionada: TablesType;
	setMesaSelecionada: Dispatch<SetStateAction<TablesType>>;

	Mesas: TablesType[];
	setMesas: Dispatch<SetStateAction<TablesType[]>>;

	Contabilidade: ContabilidadeType;
	setContabilidade: Dispatch<SetStateAction<ContabilidadeType>>;

	Config: ConfigType;
	setConfig: Dispatch<SetStateAction<ConfigType>>;

	Cozinha: KitchenOrderType[];
	setCozinha: Dispatch<SetStateAction<KitchenOrderType[]>>;

	Entrega: DeliveryType[];
	setEntrega: Dispatch<SetStateAction<DeliveryType[]>>;

	Cardapio: CardapioType;
	setCardapio: Dispatch<SetStateAction<CardapioType>>;
};

export default DataContextType;
