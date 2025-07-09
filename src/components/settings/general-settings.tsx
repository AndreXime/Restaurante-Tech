import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataStore } from '@/store/userStore';

export function GeneralSettings() {
    const config = useDataStore((state) => state.config);
    const generalData = config.geralData;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Configurações Gerais</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                    <Input id="restaurant-name" defaultValue={generalData.restaurantName} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" defaultValue={generalData.address} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue={generalData.phone} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" defaultValue={generalData.email} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tax-rate">Taxa de Imposto (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue={generalData.taxRate} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select defaultValue={generalData.currency}>
                        <SelectTrigger id="currency">
                            <SelectValue placeholder="Selecione a moeda" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                            <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4">
                    <Button className="bg-green-600 hover:bg-green-700">Salvar Alterações</Button>
                </div>
            </div>
        </div>
    );
}
