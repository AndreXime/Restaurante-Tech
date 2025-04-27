import { Template } from '@/fake-data/RestauranteTemplate';

// Todas as stores possíveis
export type StoreNames = keyof Template;

// Mapear store para o tipo certo
export type StoreData = {
	cardapio: Template['cardapio'];
	mesas: Template['mesas'];
	config: Template['config'];
	entrega: Template['entrega'];
	contabilidade: Template['contabilidade'];
	cozinha: Template['cozinha'];
};
