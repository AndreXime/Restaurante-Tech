export function getDeliveryStatus({ startedAt, dispatchedAt }: { startedAt?: string; dispatchedAt?: string }) {
    if (!startedAt) return ''; // A'em andamentoinda está na cozinha
    if (dispatchedAt) return 'em andamento'; // Entregador já foi enviado
    return 'pendente'; // Esperando entregador
}
