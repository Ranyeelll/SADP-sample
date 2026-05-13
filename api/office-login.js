import {
  canUseOfficeAuth,
  createOfficeSessionCookie,
  getOfficeAccessToken,
} from './officeAuth.js';
import { applyApiSecurityHeaders, isAllowedOrigin, safeEqualText } from './security.js';

const maxFailedAttempts = 3;
const lockoutWindowMs = 10 * 60 * 1000;

const globalLimiter = globalThis;
globalLimiter.__sadpOfficeLimiter = globalLimiter.__sadpOfficeLimiter || new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
}

function readLimiterEntry(ip) {
  const now = Date.now();
  const entry = globalLimiter.__sadpOfficeLimiter.get(ip) || {
    attempts: 0,
    lockedUntil: 0,
  };

  if (entry.lockedUntil && now > entry.lockedUntil) {
    entry.attempts = 0;
    entry.lockedUntil = 0;
  }

  return entry;
}

export default async function handler(req, res) {
  applyApiSecurityHeaders(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  if (!canUseOfficeAuth()) {
    return res.status(500).json({ error: 'Office authentication is unavailable.' });
  }

  const ip = getClientIp(req);
  const entry = readLimiterEntry(ip);
  const now = Date.now();

  if (entry.lockedUntil && now < entry.lockedUntil) {
    return res.status(429).json({ error: 'Too many failed attempts. Please try again later.' });
  }

  const code = typeof req.body?.code === 'string' ? req.body.code.trim() : '';
  const officeCode = getOfficeAccessToken();

  if (!code || !safeEqualText(code, officeCode)) {
    entry.attempts += 1;

    if (entry.attempts >= maxFailedAttempts) {
      entry.lockedUntil = now + lockoutWindowMs;
    }

    globalLimiter.__sadpOfficeLimiter.set(ip, entry);
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  globalLimiter.__sadpOfficeLimiter.delete(ip);
  res.setHeader('Set-Cookie', createOfficeSessionCookie());
  return res.status(200).json({ ok: true });
}