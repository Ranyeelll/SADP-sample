import crypto from 'node:crypto';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function applyApiSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

export function isAllowedOrigin(req) {
  const originHeader = req.headers.origin;

  if (!originHeader) {
    return true;
  }

  let origin;
  try {
    origin = new URL(originHeader);
  } catch {
    return false;
  }

  const forwardedHost = req.headers['x-forwarded-host'];
  const hostHeader = Array.isArray(forwardedHost) ? forwardedHost[0] : (forwardedHost || req.headers.host);

  if (!hostHeader) {
    return false;
  }

  const expectedHost = hostHeader.split(',')[0].trim().toLowerCase();
  return origin.host.toLowerCase() === expectedHost;
}

export function safeEqualText(left, right) {
  const leftBuffer = Buffer.from(left || '', 'utf8');
  const rightBuffer = Buffer.from(right || '', 'utf8');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function hasLengthInRange(value, minimum, maximum) {
  return value.length >= minimum && value.length <= maximum;
}

export function validateOfficeAccessCode(value) {
  const code = cleanText(value);

  if (!code) {
    return { valid: false, error: 'Please enter your access code.' };
  }

  if (!hasLengthInRange(code, 1, 128)) {
    return { valid: false, error: 'Access code is invalid.' };
  }

  return { valid: true, value: code };
}

export function validateContactPayload(body) {
  const name = cleanText(body?.name);
  const email = cleanText(body?.email).toLowerCase();
  const subject = cleanText(body?.subject);
  const message = cleanText(body?.message);

  if (!name || !email || !subject || !message) {
    return { valid: false, error: 'All fields are required.' };
  }

  if (!emailPattern.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!hasLengthInRange(name, 2, 120)) {
    return { valid: false, error: 'Name must be between 2 and 120 characters.' };
  }

  if (!hasLengthInRange(subject, 3, 180)) {
    return { valid: false, error: 'Subject must be between 3 and 180 characters.' };
  }

  if (!hasLengthInRange(message, 10, 5000)) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters.' };
  }

  return {
    valid: true,
    value: { name, email, subject, message },
  };
}