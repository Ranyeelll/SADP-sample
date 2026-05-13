import { clearOfficeSessionCookie } from './officeAuth.js';
import { applyApiSecurityHeaders, isAllowedOrigin } from './security.js';

export default async function handler(req, res) {
  applyApiSecurityHeaders(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  res.setHeader('Set-Cookie', clearOfficeSessionCookie());
  return res.status(200).json({ ok: true });
}