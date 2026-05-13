import { ensureMessagesTable, pool } from './db.js';
import { applyApiSecurityHeaders, isAllowedOrigin, validateContactPayload } from './security.js';

export default async function handler(req, res) {
  applyApiSecurityHeaders(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden.' });
  }

  const parsed = validateContactPayload(req.body);

  if (!parsed.valid) {
    return res.status(400).json({ error: parsed.error });
  }

  const { name, email, subject, message } = parsed.value;

  try {
    await ensureMessagesTable();

    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message],
    );

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Unable to save the message.' });
  }
}