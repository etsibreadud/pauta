# Pauta

Pauta é um MVP web (Next.js + Supabase) para monitorar pautas de agências regulatórias brasileiras, pontuar relevância e gerar rascunhos de e-mail. O foco é uma experiência minimalista, Gen Z-friendly e em português do Brasil.

## Funcionalidades

- Monitoramento de pautas por agência (ANATEL, ANEEL, ANP, ANVISA) com adaptadores plugáveis.
- Normalização de itens de agenda em um schema comum.
- Pontuação de relevância baseada em palavras-chave e temas prioritários.
- Geração de e-mail digest com itens relevantes.
- Upload de documentos (PDF/DOCX) para análise e rascunho de atualização.
- Controles de privacidade e consentimento explícito para uso de IA.

> **Nota**: As fontes atuais estão em modo demonstrativo (seed). O adaptador está preparado para fontes reais.

## Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Supabase (Auth, Postgres, Storage)

## Rodando localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
3. Configure o Supabase:
   - Crie um projeto Supabase.
   - Atualize `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - (Opcional) Defina `SUPABASE_SERVICE_ROLE_KEY` para uploads server-side.
4. Rode as migrações SQL:
   ```bash
   supabase db reset
   # ou execute supabase/migrations/001_init.sql manualmente
   ```
5. Rode o seed demo:
   ```bash
   supabase db seed
   # ou execute supabase/seed.sql manualmente
   ```
6. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Estrutura de pastas

```
app/                 # Rotas e páginas
components/          # Componentes de UI
lib/                 # Lógica de domínio (adapters, scoring, utils)
supabase/            # Migrações e seed
```

## Adaptadores

Os adaptadores seguem a interface `AgencySourceAdapter` (`lib/adapters/types.ts`). Para adicionar novas fontes:

1. Crie um arquivo em `lib/adapters/`.
2. Implemente `fetchAgenda` com parsing resiliente.
3. Registre o adapter em `lib/adapters/registry.ts`.

## Observações de privacidade

- Conteúdo de usuários só é enviado para IA com consentimento explícito.
- Com consentimento desligado, o app usa heurísticas baseadas em palavras-chave.
- A tela de Settings permite controlar retenção e exclusão de dados.

## Licença

MVP demonstrativo para fins de prototipagem.
