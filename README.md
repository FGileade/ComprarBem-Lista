# CompraBem Lista — Identidade Visual & Design System Oficial

> **"Sua orientação aplicada às compras."**

Este repositório contém o ecossistema completo de identidade visual, ativos gráficos, especificações de design e diretrizes para o Progressive Web App (PWA) **CompraBem Lista**.

---

## 🎨 Paleta Cromática Oficial

| Papel | Nome | HEX | RGB | Uso Principal |
|---|---|---|---|---|
| **Institucional** | Verde Escuro | `#1F5A42` | `rgb(31, 90, 66)` | Fundos de destaque, splash screens, contraste máximo |
| **Principal** | Verde Primário | `#2F7D5A` | `rgb(47, 125, 90)` | Cor mestra da marca, botões de ação (CTA), links ativos |
| **Apoio / Frescor** | Verde Claro | `#DDF2E7` | `rgb(221, 242, 231)` | Tags de hortifrúti, badges e fundos de seleção |
| **Destaque** | Amarelo Âmbar | `#E7A93B` | `rgb(231, 169, 59)` | Acento da folha consciente, lembretes inteligentes |
| **Neutro / Canvas** | Fundo Claro | `#F7F9F6` | `rgb(247, 249, 246)` | Fundo da aplicação (evita ofuscamento de tela) |
| **Tipografia** | Texto Escuro | `#20302A` | `rgb(32, 48, 42)` | Títulos e textos de alta legibilidade (WCAG AAA) |
| **Metadados** | Cinza Secundário | `#667085` | `rgb(102, 112, 133)` | Pesos, gramaturas, datas e legendas |
| **Crítico / Erro** | Vermelho Alerta | `#D64545` | `rgb(214, 69, 69)` | Itens vencidos, esgotados e ações destrutivas |

---

## 🔤 Tipografia Oficial

- **Família Tipográfica**: **Nunito** (Google Fonts)
- **Pesos Utilizados**:
  - `ExtraBold 800 / Black 900`: Logotipo "CompraBem", números em destaque.
  - `Bold 700`: Títulos de seções, cabeçalhos de categorias.
  - `SemiBold 600`: Botões, badges, tags e rótulos de navegação.
  - `Regular 400`: Itens de listas, descrições, quantidades e observações da despensa.

---

## 📁 Estrutura de Ativos & Formatos

```
ComprarBemLista/
├── assets/
│   ├── svg/                      # Vetoriais puros (100% escaláveis)
│   │   ├── logo-comprabem-lista.svg
│   │   ├── logo-horizontal.svg
│   │   ├── logo-horizontal-sem-slogan.svg
│   │   ├── logo-vertical.svg
│   │   ├── logo-compacto.svg
│   │   ├── simbolo.svg
│   │   ├── simbolo-pwa-quadrado.svg
│   │   ├── simbolo-pwa-maskable.svg
│   │   ├── simbolo-pwa-circular.svg
│   │   ├── favicon.svg
│   │   ├── logo-mono-preto.svg
│   │   ├── logo-mono-branco.svg
│   │   ├── logo-mono-verde.svg
│   │   ├── logo-escala-cinza.svg
│   │   ├── splash-dark.svg
│   │   └── splash-light.svg
│   ├── icons/                    # Ícones em todos os 17 tamanhos exigidos (PNG + WebP)
│   │   ├── favicon.ico           # Multi-resolução (16, 32, 48px)
│   │   ├── icon-16x16.png (.webp)
│   │   ├── icon-24x24.png (.webp)
│   │   ├── icon-32x32.png (.webp)
│   │   ├── icon-48x48.png (.webp)
│   │   ├── icon-64x64.png (.webp)
│   │   ├── icon-72x72.png (.webp)
│   │   ├── icon-96x96.png (.webp)
│   │   ├── icon-128x128.png (.webp)
│   │   ├── icon-144x144.png (.webp)
│   │   ├── icon-152x152.png (.webp)
│   │   ├── icon-180x180.png (.webp)
│   │   ├── icon-192x192.png (.webp)
│   │   ├── icon-256x256.png (.webp)
│   │   ├── icon-384x384.png (.webp)
│   │   ├── icon-512x512.png (.webp)
│   │   ├── icon-1024x1024.png (.webp)
│   │   └── icon-2048x2048.png (.webp)
│   ├── logos/                    # PNGs e WebPs 2x HiDPI de todas as versões
│   ├── social/                   # Capa horizontal 1200x630, Post 1080x1080, Stories e Avatares
│   ├── splash/                   # Telas de abertura 1080x1920 (Dark & Light)
│   └── jpg/                      # JPEGs de alta fidelidade para apresentações e documentos
├── icons/                        # Ícones na raiz mapeados no manifest.json
├── CompraBem-Lista-Kit-Marca-Completo.zip  # Pacote completo com todos os assets
├── manifest.json                 # Manifesto PWA oficial validado pelo W3C
├── index.html                    # Manual interativo e central de visualização/download
└── generate-assets.js            # Script Node.js de build e renderização
```

---

## ⚡ Integração Google Stitch

As telas do projeto foram publicadas diretamente no **Google Stitch**:
- **ID do Projeto Stitch**: `projects/4486368252013266985`
- **Título**: CompraBem Visual Identity System
- **Design System**: *Fresh Market Harmony*
- **Telas Criadas**:
  1. `CompraBem Lista - Brand Identity & Design System Portal` (Desktop): Portal com exibição completa de diretrizes, tokens, variações, acessibilidade WCAG AAA e central de download.
  2. `CompraBem Lista - Mobile PWA App Interface` (Mobile): Tela funcional do app com categorias de feira/hortifrúti, checklist, badges de consumo consciente e navegação rápida.

---

## 🚀 Como Visualizar e Testar Localmente

Para abrir o manual interativo no seu navegador:

```bash
# Abrir o arquivo index.html no navegador padrão
start index.html
```

Para regerar todos os arquivos gráficos a qualquer momento:

```bash
node generate-assets.js
```
