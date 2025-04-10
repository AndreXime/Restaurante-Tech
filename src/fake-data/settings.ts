const generalData = {
	restaurantName: 'Chili Restaurante',
	address: 'Rua das Flores, 123 - São Paulo, SP',
	phone: '(11) 3456-7890',
	email: 'contato@chilirestaurante.com',
	taxRate: '5',
	currency: 'BRL',
};

const categories = [
	{ id: 1, name: 'Café da Manhã', items: 19 },
	{ id: 2, name: 'Sopas', items: 8 },
	{ id: 3, name: 'Massas', items: 14 },
	{ id: 4, name: 'Pratos Principais', items: 27 },
	{ id: 5, name: 'Hambúrgueres', items: 13 },
	{ id: 6, name: 'Bebidas', items: 22 },
	{ id: 7, name: 'Sobremesas', items: 15 },
];

const menuItems = [
	{ id: 1, name: 'Hambúrguer de Carne', category: 'Hambúrgueres', price: 23.99, status: 'Ativo' },
	{ id: 2, name: 'Suco de Laranja', category: 'Bebidas', price: 12.99, status: 'Ativo' },
	{ id: 3, name: 'Salada de Vegetais', category: 'Pratos Principais', price: 17.99, status: 'Ativo' },
	{ id: 4, name: 'Tacos com Frango', category: 'Pratos Principais', price: 14.99, status: 'Ativo' },
	{ id: 5, name: 'Sushi de Carne', category: 'Pratos Principais', price: 9.99, status: 'Inativo' },
];

const users = [
	{ id: 1, name: 'Admin', email: 'admin@chilirestaurante.com', role: 'Administrador', status: 'Ativo' },
	{ id: 2, name: 'João Silva', email: 'joao@chilirestaurante.com', role: 'Gerente', status: 'Ativo' },
	{ id: 3, name: 'Maria Oliveira', email: 'maria@chilirestaurante.com', role: 'Atendente', status: 'Ativo' },
	{ id: 4, name: 'Carlos Santos', email: 'carlos@chilirestaurante.com', role: 'Cozinheiro', status: 'Ativo' },
	{ id: 5, name: 'Ana Pereira', email: 'ana@chilirestaurante.com', role: 'Entregador', status: 'Inativo' },
];

export { generalData, menuItems, categories, users };
