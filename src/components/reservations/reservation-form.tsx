"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReservationForm() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nova Reserva</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Cliente</Label>
          <Input id="name" placeholder="Digite o nome completo" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" placeholder="(00) 00000-0000" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Horário</Label>
            <Input id="time" type="time" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guests">Número de Pessoas</Label>
            <Input id="guests" type="number" min="1" defaultValue="2" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="table">Mesa</Label>
            <Select>
              <SelectTrigger id="table">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Mesa 1</SelectItem>
                <SelectItem value="2">Mesa 2</SelectItem>
                <SelectItem value="3">Mesa 3</SelectItem>
                <SelectItem value="4">Mesa 4</SelectItem>
                <SelectItem value="5">Mesa 5</SelectItem>
                <SelectItem value="6">Mesa 6</SelectItem>
                <SelectItem value="7">Mesa 7</SelectItem>
                <SelectItem value="8">Mesa 8</SelectItem>
                <SelectItem value="9">Mesa 9</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <textarea
            id="notes"
            className="w-full min-h-[100px] p-2 border rounded-md"
            placeholder="Informações adicionais, preferências, etc."
          ></textarea>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-green-600 hover:bg-green-700">Confirmar Reserva</Button>
        </div>
      </div>
    </div>
  )
}
