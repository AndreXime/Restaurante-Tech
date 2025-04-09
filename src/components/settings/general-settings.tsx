import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Configurações Gerais</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
          <Input id="restaurant-name" defaultValue="Chili Restaurante" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" defaultValue="Rua das Flores, 123 - São Paulo, SP" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" defaultValue="(11) 3456-7890" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" defaultValue="contato@chilirestaurante.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-rate">Taxa de Imposto (%)</Label>
          <Input id="tax-rate" type="number" defaultValue="5" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Moeda</Label>
          <Select defaultValue="BRL">
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

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-print">Impressão Automática</Label>
          <Switch id="auto-print" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Modo Escuro</Label>
          <Switch id="dark-mode" />
        </div>

        <div className="pt-4">
          <Button className="bg-green-600 hover:bg-green-700">Salvar Alterações</Button>
        </div>
      </div>
    </div>
  )
}
