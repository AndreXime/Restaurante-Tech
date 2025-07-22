import { useDataStore } from '@/store/userStore';
import { Card, CardContent } from '@/shared/ui';
import { parseNumberBR } from '@/shared/lib/utils';

export function EstastisticaSettings() {
    const { cardapio, mesas, config, contabilidade } = useDataStore((state) => ({
        cardapio: state.cardapio,
        mesas: state.mesas,
        config: state.config,
        entrega: state.entrega,
        cozinha: state.cozinha,
        contabilidade: state.contabilidade,
    }));

    const resumo = [
        {
            title: 'Quantidade de pratos totais',
            value: cardapio.pratos.length,
        },
        {
            title: 'Quantidade de categorias totais',
            value: cardapio.categorias.length,
        },
        {
            title: 'Quantidade de mesas',
            value: mesas.length,
        },
        {
            title: 'Quantidade de funcionarios',
            value: config.funcionarios.length,
        },
        {
            title: 'Saldo esperado',
            value:
                parseNumberBR(contabilidade.resumo.find((value) => value.title == 'Vendas Totais')?.value || '') -
                parseNumberBR(contabilidade.resumo.find((value) => value.title == 'Despesas')?.value || ''),
        },
    ];
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8">
                <h2 className="text-xl font-bold">Gerenciamento de Cardápio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {resumo.map((value) => (
                        <Card key={value.title}>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">{value.title}</p>
                                        <h3 className="text-2xl font-bold mt-1">{value.value}</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
