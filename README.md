# 🦸‍♂️🦹‍♀️ SuperHero Villain Quiz

Aplicação web interativa em **Angular 17+ (Standalone)** que descobre se você é mais **Herói**, **Vilão** ou **Anti-herói** a partir de um questionário rápido, com **timer**, **streak**, **power-ups** e **ranking** — visual moderno e transições suaves.

> ✅ Feito para jogar em grupo, projetado para portfólio e simples de publicar (GitHub Pages / Vercel).

---

## 👀 Preview
- **Demo**: _(adicione o link quando publicar)_
- **Screenshots**: Start • Quiz (HUD) • Resultado • Ranking

---

## ✨ Principais Recursos

- **Jogo imersivo**
  - Timer regressivo por pergunta com HUD: **tempo restante**, **streak 🔥**, **score** e **perfil atual** (Herói/Vilão/Anti-herói).
  - **Power-ups**: Congelar tempo, Pular pergunta, **Double** (pontuação dobrada).
  - **Dificuldades**: Fácil, Médio, Difícil e **Misto**.
  - **Categorias**: ética, decisões, liderança, tecnologia (configuráveis).

- **Pontuação inteligente**
  - Alinhamento: Herói `+1`, Vilão `−1`, Neutro `0`.
  - Fórmula: `pontos = base × multiplicador_velocidade × (1 + 0.1 × streak) × (double?)`.
  - Velocidade recompensa respostas rápidas (até 2×). Streak até +50%.

- **Resultados justos**
  - Perfil calculado por **maioria das respostas não-neutras** (dinâmico para qualquer quantidade de perguntas).
  - Resultado com imagem, descrição, estatísticas e **detalhes por pergunta**.

- **Leaderboard**
  - Salva no `localStorage` o Top 20 com **perfil**, **nível**, **pontos**, **streak**, **vidas**, **quando**.
  - Retrocompatível (recalcula perfil quando necessário).

- **UX & A11y**
  - Design responsivo, tema dark, foco visível, rolagem suave, componentes reutilizáveis.

---

## 🧪 Como Jogar

1. **Configurar partida**: escolha **Categoria**, **Dificuldade** e **Tempo** por pergunta.
2. **Responder**: acompanhe o **tempo**, **streak** e **score** no topo.
3. **Usar power-ups** estrategicamente.
4. **Finalizar**: veja seu **Perfil** (Herói, Vilão, Anti-herói), compartilhe e entre no **Ranking**.

> Dica: neutras (0) não mudam a moral, mas tornam mais difícil atingir extremos.

---

## 🧮 Regras de Pontuação & Perfil

- **Vidas**: perde 1 vida se o tempo **zerar** sem resposta (penalidade configurável).
- **Streak**: +10% por acerto consecutivo (máx. 5 → +50%).
- **Perfil final (dinâmico)**
  - `n = respostas não-neutras`
  - `t = ceil(n/2)`
  - `moralScore ≥ t` → **Herói**
  - `moralScore ≤ −t` → **Vilão**
  - Caso contrário → **Anti-herói**

---

## 🛠️ Tech Stack

- **Angular 17+** (Standalone, `@if/@for`), **TypeScript + Signals**
- **SCSS** modular • **Angular Router**
- **LocalStorage** (ranking)
- Builder moderno (Vite/Angular)

---

## 📦 Instalação & Uso

```bash
# 1) Dependências
npm install

# 2) Dev server
npm run start
# http://localhost:4200

# 3) Build de produção
npm run build

# 4) Preview do build (opcional)
npm run preview
