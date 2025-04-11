import { FoodType, FuncionariosType, GeneralDataType } from '@/types/types';
import { foodItems } from './food';
import { categories } from './menu';

const generalData: GeneralDataType = {
	restaurantName: 'Chili Restaurante',
	address: 'Rua das Flores, 123 - São Paulo, SP',
	phone: '(11) 3456-7890',
	email: 'contato@chilirestaurante.com',
	taxRate: '5',
	currency: 'BRL',
};

const categoriesItems = categories;

const menuItems: FoodType[] = foodItems;

const users: FuncionariosType[] = [
	{ id: 1, name: 'Admin', email: 'admin@chilirestaurante.com', role: 'Administrador', status: 'Ativo' },
	{ id: 2, name: 'João Silva', email: 'joao@chilirestaurante.com', role: 'Gerente', status: 'Ativo' },
	{ id: 3, name: 'Maria Oliveira', email: 'maria@chilirestaurante.com', role: 'Atendente', status: 'Ativo' },
	{ id: 4, name: 'Carlos Santos', email: 'carlos@chilirestaurante.com', role: 'Cozinheiro', status: 'Ativo' },
	{ id: 5, name: 'Ana Pereira', email: 'ana@chilirestaurante.com', role: 'Entregador', status: 'Inativo' },
];

export { generalData, menuItems, categoriesItems, users };
