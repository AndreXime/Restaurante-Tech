export interface ClientDataType {
    cardapio: CardapioType;
    mesas: TablesType[];
    cozinha: KitchenOrderType[];
    entrega: DeliveryType[];
    config: ConfigType;
    contabilidade: ContabilidadeType;
    mesaSelecionada: TablesType | undefined;
}

export type ClientDataKeys = keyof ClientDataType;
