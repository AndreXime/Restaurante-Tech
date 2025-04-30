import { FuncionariosType, GeneralDataType } from '@/types/types';

const generalData: GeneralDataType = {
	restaurantName: 'Chili Restaurante',
	address: 'Rua das Flores, 123 - São Paulo, SP',
	phone: '(11) 3456-7890',
	email: 'contato@chilirestaurante.com',
	taxRate: '5',
	currency: 'BRL',
};

const users: FuncionariosType[] = [
	{ id: 1, name: 'André', role: 'Administrador', status: 'Ativo' },
	{ id: 2, name: 'João Silva', role: 'Gerente', status: 'Ativo' },
	{ id: 3, name: 'Maria Oliveira', role: 'Atendente', status: 'Ativo' },
	{ id: 4, name: 'Carlos Santos', role: 'Cozinheiro', status: 'Ativo' },
	{ id: 5, name: 'Ana Pereira', role: 'Entregador', status: 'Inativo' },
];

export { generalData, users };
