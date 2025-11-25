AI-based job website that scrapes career pages of companies.
This is a small project to explore the Cloudflare Workers platform. It goes all in on the Cloudflare offerings: workers for the backend, Browser rendering for scraper,Cloudflare AI Search for semantic search.

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
