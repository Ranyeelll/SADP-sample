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
const devSessionCookie = 'sadp_office_session=dev-session; Path=/; HttpOnly; SameSite=Strict; Max-Age=43200'
const clearDevSessionCookie = 'sadp_office_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
const maxFailedAttempts = 5
const lockoutWindowMs = 15 * 60 * 1000
const loginAttempts = new Map<string, { attempts: number; lockedUntil: number }>()

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

function getClientIp(req: IncomingMessage) {
  const forwarded = req.headers['x-forwarded-for']
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return value?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
}

function hasDevSession(req: IncomingMessage) {
  const cookieHeader = typeof req.headers.cookie === 'string' ? req.headers.cookie : ''
  return cookieHeader.includes('sadp_office_session=dev-session')
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
          if (!hasDevSession(req)) {
            json(res, 401, { error: 'Unauthorized.' })
            return
          }

          json(res, 200, { messages: devMessages })
          return
        }

        if (req.method === 'POST' && url === '/api/office-login') {
          const ip = getClientIp(req)
          const now = Date.now()
          const entry = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0 }

          if (entry.lockedUntil && now < entry.lockedUntil) {
            json(res, 429, { error: 'Too many failed attempts. Please try again later.' })
            return
          }

          try {
            const bodyText = await collectBody(req)
            const body = bodyText ? JSON.parse(bodyText) as { code?: string } : {}
            const code = typeof body.code === 'string' ? body.code.trim() : ''

            if (!code || code !== officeAccessToken) {
              entry.attempts += 1

              if (entry.attempts >= maxFailedAttempts) {
                entry.lockedUntil = now + lockoutWindowMs
              }

              loginAttempts.set(ip, entry)
              json(res, 401, { error: 'Invalid office access code.' })
              return
            }

            loginAttempts.delete(ip)
            res.setHeader('Set-Cookie', devSessionCookie)
            json(res, 200, { ok: true, mode: 'dev-cookie-session' })
          } catch {
            json(res, 400, { error: 'Invalid request body.' })
          }

          return
        }

        if (req.method === 'POST' && url === '/api/office-logout') {
          res.setHeader('Set-Cookie', clearDevSessionCookie)
          json(res, 200, { ok: true })
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
