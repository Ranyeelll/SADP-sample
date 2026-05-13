import { ensureMessagesTable, pool } from './db.js';

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const name = cleanText(req.body?.name);
  const email = cleanText(req.body?.email);
  const subject = cleanText(req.body?.subject);
  const message = cleanText(req.body?.message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await ensureMessagesTable();

    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message],
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to save the message.',
    });
  }
}