import type { Env } from 'bun'
import type { Context } from 'elysia'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

const app = new Elysia({ strictPath: false, aot: false })
  .use(cors())
  .get('/', 'This is the backend API for the MCSR PB Display extension. No content here.')

export default {
  async fetch(
    request: Request,
    _env: Env,
    _ctx: Context,
  ): Promise<Response> {
    return await app.fetch(request)
  },
}
