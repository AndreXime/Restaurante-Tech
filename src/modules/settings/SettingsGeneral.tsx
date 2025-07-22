import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { useDataStore } from '@/store/userStore';

export function GeneralSettings() {
    const generalData = useDataStore((state) => state.config.geralData);
    const setConfig = useDataStore((state) => state.setConfig);

    const handleChange = (key: keyof typeof generalData, value: string | number) => {
        setConfig((prev) => ({
            ...prev,
            geralData: {
                ...prev.geralData,
                [key]: value,
            },
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">
                Configurações Gerais{' '}
                <span className="font-normal text-sm text-gray-600 ml-3">Alterações são salvas automaticamente</span>
            </h2>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                    <Input
                        id="restaurant-name"
                        defaultValue={generalData.restaurantName}
                        onChange={(e) => handleChange('restaurantName', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                        id="address"
                        defaultValue={generalData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            defaultValue={generalData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={generalData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="tax-rate">Taxa de Serviço (%)</Label>
                        <Input
                            id="tax-rate"
                            type="number"
                            defaultValue={generalData.taxRate}
                            onChange={(e) => handleChange('taxRate', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Moeda</Label>
                        <Select
                            defaultValue={generalData.currency}
                            onValueChange={(val) => handleChange('currency', val)}
                        >
                            <SelectTrigger id="currency" className="w-full">
                                <SelectValue placeholder="Selecione a moeda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                                <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                                <SelectItem value="EUR">Euro (€)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2"></div>
            </div>
        </div>
    );
}
