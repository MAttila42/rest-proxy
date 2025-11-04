import process from 'node:process'

import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

interface ProxyPayload {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: string
}

const proxyToken = process.env.PROXY_TOKEN?.trim()
const port = Number(process.env.PORT ?? 3000) || 3000

new Elysia({ strictPath: false, aot: false })
  .use(cors())
  .post('/', async ({ body, headers, status }) => {
    if (proxyToken) {
      const authHeader = headers.authorization ?? headers.Authorization
      const suppliedToken = authHeader && authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.slice(7).trim()
        : authHeader?.trim()

      if (!suppliedToken)
        return status(401, { error: 'Missing authorization token.' })

      if (suppliedToken !== proxyToken)
        return status(403, { error: 'Invalid authorization token.' })
    }

    const payload = body as ProxyPayload
    if (!payload.url || payload.url.trim() === '') {
      return status(400, {
        error: 'Body must include a non-empty "url" string.',
      })
    }

    let response: Response
    try {
      response = await fetch(payload.url, {
        method: payload.method,
        headers: payload.headers,
        body: payload.body,
      })
    }
    catch (error) {
      return status(502, {
        error: 'Failed to reach target.',
        details: error instanceof Error ? error.message : String(error),
      })
    }

    const responseHeaders = new Headers(response.headers)
    responseHeaders.delete('content-length')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  })
  .get('/', 'Very simple selfhostable proxy service for REST requests. More info: https://github.com/MAttila42/rest-proxy')
  .listen(port)
