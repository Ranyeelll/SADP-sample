import { ensureMessagesTable, pool } from './db.js';
import { canUseOfficeAuth, hasValidOfficeSession } from './officeAuth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!canUseOfficeAuth()) {
    return res.status(500).json({ error: 'Office authentication is not configured.' });
  }

  if (!hasValidOfficeSession(req)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    await ensureMessagesTable();

    const result = await pool.query(
      `SELECT id, name, email, subject, message, created_at
       FROM messages
       ORDER BY created_at DESC, id DESC`,
    );

    return res.status(200).json({ messages: result.rows });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to load messages.',
    });
  }
}