export function DeliveryMap() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Mapa de Entregas</h2>
        <p className="text-sm text-gray-600">Visualize todas as entregas em tempo real</p>
      </div>
      <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Mapa de entregas seria exibido aqui</p>
          <p className="text-sm text-gray-400">Integração com serviço de mapas</p>
        </div>
      </div>
    </div>
  )
}
