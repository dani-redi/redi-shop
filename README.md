# redi-shop

Site da RediShop (redi.shop): home para vendedores e `/marcas` para marcas, migrado do Lovable para Vite + React 19 + TypeScript + Tailwind CSS v4.

## Scripts

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: type-check e build de produção (`dist/`)
- `npm run preview`: serve o build localmente
- `npm run lint`: ESLint
- `npm run format` / `npm run format:check`: Prettier (com ordenação de classes Tailwind)

## Estrutura

```
src/
├── app/            # App, router (rotas por idioma), providers
├── pages/          # home/ e brands/ (/marcas): compõem as sections na ordem
├── sections/       # uma pasta por seção (header, hero, brands-strip, signup-cta, …)
├── components/     # UI reutilizável (button, section-heading, phone-mockup, …)
├── features/       # funcionalidades com estado (waitlist, brand-contact)
├── i18n/           # i18next + traduções em locales/{pt-BR,en,es}/common.json
├── hooks/
├── config/         # site.ts (links, comissão máxima), locales.ts, pages.ts, seo.ts
├── styles/         # tokens.css (cores/sombras/fontes), fonts.css (@font-face), animações, base
└── assets/         # images/ (WebP) e fonts/ (WOFF2), importadas pelo Vite (com hash)
```

Os tokens de design ficam em `src/styles/tokens.css`: variáveis em `:root`, expostas como utilitários
via `@theme` (`bg-brand`, `text-hero-ink`, `shadow-card`, `font-hand`…).

As fontes (Plus Jakarta Sans e Caveat) são servidas pelo próprio site a partir de `src/assets/fonts/`
(declaradas em `src/styles/fonts.css`), sem Google Fonts: quando o domínio do Google é bloqueado, o
texto cai na fonte do sistema. O `index.html` faz preload do arquivo latin da Plus Jakarta Sans.

## Idiomas

- Rotas: `/` e `/marcas` (pt-BR), `/en` e `/en/marcas`, `/es` e `/es/marcas`. O idioma renderizado
  vem sempre da rota, e o seletor de idioma mantém a página atual.
- No primeiro acesso a uma página em pt-BR, o visitante é redirecionado para o idioma preferido: a escolha salva
  (`localStorage['redishop-locale']`, mesma chave do site Lovable) ou o idioma do navegador. Idiomas
  não suportados caem em inglês. Robôs de busca não são redirecionados.
- Textos: `src/i18n/locales/<idioma>/common.json`. As chaves são tipadas a partir do pt-BR.
- A comissão máxima vem de `siteConfig.maxCommission` e entra nos textos via `{{max}}`.

## SEO

O build gera um HTML por página e idioma (`index.html`, `marcas/index.html`, `en/index.html`,
`en/marcas/index.html`, `es/…`), cada um com title, description, Open Graph e hreflang próprios, porque robôs de redes sociais não
executam JS. Páginas em `src/config/pages.ts`, textos em `meta.<página>` das traduções, geração em
`vite-plugins/localized-html.ts`. No cliente, `components/seo` mantém o `<head>` em sincronia
ao trocar de idioma.

A hospedagem precisa:

1. servir o `index.html` de cada diretório (`/en`, `/marcas`, `/en/marcas`…);
2. fazer fallback para `index.html` em qualquer outra rota (SPA).

## Lista de espera

O modal (`src/features/waitlist`) envia um POST JSON para `VITE_WAITLIST_ENDPOINT` (ver `.env.example`)
com `name`, `email`, `whatsapp`, `sellerProfiles`, `locale` e UTMs. Resposta esperada:
`{ "duplicate": boolean }`. Sem a variável, o envio é simulado em dev e falha em produção.

## Contato de marcas

O formulário "Falar com um especialista" de `/marcas` (`src/features/brand-contact`) envia um POST JSON
para `VITE_BRAND_CONTACT_ENDPOINT` com `email`, `locale` e UTMs. Qualquer resposta 2xx é sucesso.
Sem a variável, o envio é simulado em dev e falha em produção. (No site Lovable o formulário não
enviava nada.)
