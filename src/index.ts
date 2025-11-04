import type { Env } from 'bun'
import type { Context } from 'elysia'
import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

const app = new Elysia({ strictPath: false, aot: false })
  .use(cors())
  .get('/', 'Very simple selfhostable proxy service for REST requests. More info: https://github.com/MAttila42/rest-proxy')

export default {
  async fetch(
    request: Request,
    _env: Env,
    _ctx: Context,
  ): Promise<Response> {
    return await app.fetch(request)
  },
}
