# Restaurante Tech - PDV Client-Side

**Restaurante Tech** é um sistema de PDV para restaurantes totalmente client-side, utilizando **IndexedDB** como armazenamento local. Ideal para estabelecimentos que desejam simplicidade, performance offline e controle total no navegador.

## Módulos

- **Cardápio**: cadastro e edição de produtos, categorias e preços
- **Mesas**: abertura, acompanhamento e fechamento de pedidos por mesa
- **Entregas**: gestão de pedidos para entrega ou retirada
- **Cozinha**: painel de produção com status dos pedidos
- **Contabilidade**: resumo de vendas, fechamento de caixa e relatórios
- **Configurações**: personalização do sistema (dados do restaurante, moeda, modo de operação, etc.)

## Funcionalidades

- Armazenamento 100% local com IndexedDB
- Funciona offline
- Interface responsiva e leve
- Suporte a múltiplos dispositivos
- Modo **demo** para testes sem persistência

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Radix UI |
| Estado | Zustand |
| Persistência | IndexedDB (`idb`) |
| Qualidade | ESLint, TypeScript |

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Na tela inicial, escolha:

- **Demonstração** (`/demo`) — dados fictícios, alterações não são salvas
- **Aplicação real** (`/app`) — dashboard limpo com persistência local

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # servir build
npm run lint    # ESLint
```

## Modo demo

A rota `/demo` carrega dados simulados via `AppRoot demo`. Use para explorar o sistema sem afetar o banco IndexedDB da aplicação real. Ideal para testes e demonstrações.

## Estrutura

```text
restaurante-tech/
├── src/
│   ├── app/              # rotas Next.js (/, /demo, /app)
│   ├── modules/          # cardápio, mesas, cozinha, entregas, etc.
│   ├── shared/           # UI, componentes e lib (IndexedDB, demo)
│   └── store/            # Zustand (userStore, navStore, popupStore)
└── public/               # ícones e assets estáticos
```
