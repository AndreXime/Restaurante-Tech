export interface ClientDataType {
    cardapio: CardapioType;
    mesas: TablesType[];
    cozinha: KitchenOrderType[];
    entrega: DeliveryType[];
    config: ConfigType;
    contabilidade: ContabilidadeType;
    mesaSelecionada: TablesType | undefined;
    // Não pode ser undefined, mas pode ser valores vazios pois ele é o unico, n tem outros para selecionar;
    deliverySelecionado: Omit<DeliveryType, 'id'>;
}

export type ClientDataKeys = keyof ClientDataType;
