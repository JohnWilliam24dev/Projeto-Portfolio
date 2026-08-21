# Portfólio VTuber — Comissões

Site de portfólio com fluxo de pedido de comissão em 4 etapas + resumo.
React + Vite + Material UI.

## Como rodar

```bash
cd vtuber-portfolio
npm install
npm run dev
```

Abre em `http://localhost:5173`. Home em `/`, formulário em `/comissao`,
termos em `/termos`.

Para gerar a versão de produção:

```bash
npm run build   # gera a pasta dist/
npm run preview # serve o build localmente pra conferir
```

## Estrutura

Arquitetura feature-based: cada capacidade do produto é dona de sua
própria pasta (páginas, componentes, hooks, estado, validação e
serviços), em vez de organizar por tipo técnico.

```text
src/
├── core/            Transversal à aplicação
│   ├── config/      Tokens de tema (cor, tipografia)
│   ├── layouts/      Fundo de página, divisor decorativo
│   └── routes/       Definição das rotas
├── features/
│   ├── home/         Página inicial e suas seções
│   ├── terms/         Página de termos e condições
│   └── commission-request/  Wizard de pedido de comissão
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── state/
│       ├── validation/
│       └── services/
├── shared/
│   └── utils/         Código reutilizado entre features (ex.: conteúdo do perfil)
└── domain/           Regras de negócio puras (preço, catálogo de modelos).
                      Sem React, sem UI — testável isoladamente.
```

Regras completas da arquitetura ficam fora do README pra não virar
documento morto — quando existirem, entram como documentos próprios e
são linkados aqui.
