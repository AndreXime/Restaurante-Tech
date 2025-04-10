interface TableType {
	id: number;
	number: string;
	status: 'ocupada' | 'livre' | 'reservada';
	guests: number;
	time: string;
	server: string;
}

const tables: TableType[] = [
	{ id: 1, number: 'Mesa 1', status: 'ocupada', guests: 4, time: '14:30', server: 'João Silva' },
	{ id: 2, number: 'Mesa 2', status: 'livre', guests: 0, time: '', server: '' },
	{ id: 3, number: 'Mesa 3', status: 'reservada', guests: 2, time: '15:00', server: 'Maria Oliveira' },
	{ id: 4, number: 'Mesa 4', status: 'ocupada', guests: 3, time: '13:45', server: 'Carlos Santos' },
	{ id: 5, number: 'Mesa 5', status: 'livre', guests: 0, time: '', server: '' },
	{ id: 6, number: 'Mesa 6', status: 'ocupada', guests: 6, time: '14:15', server: 'Ana Pereira' },
	{ id: 7, number: 'Mesa 7', status: 'livre', guests: 0, time: '', server: '' },
	{ id: 8, number: 'Mesa 8', status: 'reservada', guests: 4, time: '16:30', server: 'Pedro Costa' },
	{ id: 9, number: 'Mesa 9', status: 'ocupada', guests: 2, time: '13:30', server: 'Lucia Ferreira' },
];

export { tables };
