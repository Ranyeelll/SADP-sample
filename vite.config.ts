import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'

type DevMessage = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

const devMessages: DevMessage[] = []
const officeAccessToken = process.env.OFFICE_ACCESS_TOKEN ?? 'SADP-OFFICE'

function collectBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []

    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function json(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function sadpDevApiPlugin(): Plugin {
  return {
    name: 'sadp-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]

        if (!url) {
          next()
          return
        }

        if (req.method === 'POST' && url === '/api/contact') {
          try {
            const bodyText = await collectBody(req)
            const body = bodyText ? JSON.parse(bodyText) as Partial<DevMessage> : {}
            const name = typeof body.name === 'string' ? body.name.trim() : ''
            const email = typeof body.email === 'string' ? body.email.trim() : ''
            const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
            const message = typeof body.message === 'string' ? body.message.trim() : ''

            if (!name || !email || !subject || !message) {
              json(res, 400, { error: 'All fields are required.' })
              return
            }

            devMessages.unshift({
              id: Date.now(),
              name,
              email,
              subject,
              message,
              created_at: new Date().toISOString(),
            })

            json(res, 200, { ok: true, mode: 'dev-memory' })
          } catch {
            json(res, 400, { error: 'Invalid request body.' })
          }

          return
        }

        if (req.method === 'GET' && url === '/api/messages') {
          const providedToken = req.headers['x-office-token']
          const tokenValue = Array.isArray(providedToken) ? providedToken[0] : providedToken

          if (tokenValue !== officeAccessToken) {
            json(res, 401, { error: 'Unauthorized.' })
            return
          }

          json(res, 200, { messages: devMessages })
          return
        }

        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sadpDevApiPlugin()],
})
