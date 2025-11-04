import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

new Elysia({ strictPath: false, aot: false })
  .use(cors())
  .get('/', 'Very simple selfhostable proxy service for REST requests. More info: https://github.com/MAttila42/rest-proxy')
  .listen(3000)
