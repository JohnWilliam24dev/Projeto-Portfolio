# Portfólio VTuber — Comissões

Site de portfólio com fluxo de pedido de comissão em 4 etapas + resumo.
React + Vite + Material UI.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Home em `/`, formulário em `/comissao`.

Para gerar a versão de produção:

```bash
npm run build   # gera a pasta dist/
npm run preview # serve o build localmente pra conferir
```

## Estrutura (por que está organizado assim)

O projeto segue separação de responsabilidades pra facilitar manutenção
solo — cada camada só conhece a de baixo, nunca a de cima:

```
src/
  domain/        Regras de negócio puras (preço, catálogo de modelos).
                  Sem React, sem UI. Fácil de testar isoladamente.
  services/       orderService.js — hoje só loga no console. Quando você
                  tiver um backend, troca SÓ o corpo dessa função.
  state/          Reducer + Context = fonte única de verdade do wizard.
  hooks/          API que os componentes usam (useCommissionForm,
                  usePriceSimulator) — esconde os detalhes do reducer.
  content/        Textos da home (nome, bio, listas). Editar aqui não
                  mexe em nenhum componente.
  theme/          Paleta de cores e tipografia (tokens centralizados).
  components/
    layout/       Peças reaproveitáveis de layout (fundo, divisor).
    home/         Seções da página inicial.
    form/         O wizard: steps, cabeçalho de progresso, popup de sucesso.
    common/       Peças reaproveitadas pelos steps (card, botões de nav).
```

Isso é o SOLID/Clean Code na prática: se amanhã o preço mudar, você mexe
só em `domain/pricing.js`. Se o backend chegar, só em
`services/orderService.js`. Se quiser mudar a cor ou fonte, só em
`theme/theme.js`. Nenhuma dessas mudanças deveria te obrigar a caçar
código espalhado pelos componentes.

## O que falta você preencher

Marquei com `// TODO` no código:

- **`src/content/profileContent.js`** — nome, tagline, bio, redes sociais
  e termos e condições. Os arquivos `Introdução.txt` e
  `termos_e_condições.txt` que você mandou vieram vazios, então usei
  placeholders.
- **Vídeos do carrossel** — `src/components/home/VideoCarousel.jsx`
  recebe uma prop `videos`. Coloque os arquivos em
  `src/assets/videos/` e importe-os em `HomePage.jsx`:

  ```jsx
  import demo1 from '../../assets/videos/demo1.mp4';
  // ...
  <VideoCarousel videos={[{ src: demo1, title: 'Nome do trabalho' }]} />
  ```

## Preços dos modelos

Definidos em `src/domain/modelTypes.js`:

| Modelo       | Preço base |
|--------------|-----------|
| Chibi 3D     | R$ 320,00 |
| Básico 3D    | R$ 490,00 |
| Médio 3D     | R$ 690,00 |

Adicionais (em `src/domain/pricing.js`): Acessórios +10% por unidade,
Expressões extras +5% por unidade — sobre o preço base do modelo
escolhido.

## Backend (próximo passo natural)

Quando quiser salvar os pedidos de verdade, edite só
`src/services/orderService.js` — a função `submitOrder` já recebe o
payload completo do formulário (nome, contato, modelo, adicionais,
notas e arquivo de referência) e só precisa trocar o `console.info`
por uma chamada de API de verdade. Nenhum componente de formulário
precisa mudar.

## Nielsen aplicado

- **Visibilidade do status do sistema**: stepper mostra em que etapa
  você está; botão de envio mostra "Enviando…" durante a submissão.
- **Controle e liberdade do usuário**: sempre dá pra voltar uma etapa.
- **Prevenção de erros / reconhecimento**: validação inline com
  mensagens claras antes de avançar.
- **Consistência**: mesmo padrão de card e botões em todos os steps.
- **Feedback**: popup verde de sucesso antes do redirecionamento pra
  home (com delay pra dar tempo de ler).
