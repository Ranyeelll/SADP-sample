import crypto from 'node:crypto';
import { safeEqualText } from './security.js';

const sessionCookieName = 'sadp_office_session';
const officeAccessToken = process.env.OFFICE_ACCESS_TOKEN;
const sessionSecret = process.env.OFFICE_SESSION_SECRET;
const sessionLifetimeHours = Number(process.env.OFFICE_SESSION_HOURS || '12');

function isValidSessionLifetimeHours(value) {
  return Number.isFinite(value) && value > 0 && value <= 168;
}

function getSecretBuffer() {
  return Buffer.from(sessionSecret || '', 'utf8');
}

function parseCookies(headerValue) {
  const cookieHeader = typeof headerValue === 'string' ? headerValue : '';
  const parts = cookieHeader.split(';');
  const cookies = {};

  for (const part of parts) {
    const [rawKey, ...rawValue] = part.trim().split('=');
    if (!rawKey) {
      continue;
    }

    cookies[rawKey] = decodeURIComponent(rawValue.join('='));
  }

  return cookies;
}

function signValue(value) {
  return crypto
    .createHmac('sha256', getSecretBuffer())
    .update(value)
    .digest('base64url');
}

function serializeCookie(value, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === 'production';
  const attributes = [
    `${sessionCookieName}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAgeSeconds}`,
  ];

  if (secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
}

export function getOfficeAccessToken() {
  return officeAccessToken;
}

export function canUseOfficeAuth() {
  return Boolean(
    officeAccessToken &&
      sessionSecret &&
      sessionSecret.length >= 32 &&
      sessionSecret !== officeAccessToken &&
      isValidSessionLifetimeHours(sessionLifetimeHours),
  );
}

export function createOfficeSessionCookie() {
  if (!canUseOfficeAuth()) {
    throw new Error('Office authentication is not configured.');
  }

  const maxAgeSeconds = Math.max(1, Math.floor(sessionLifetimeHours * 60 * 60));
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const payload = String(expiresAt);
  const signature = signValue(payload);
  const token = `${payload}.${signature}`;

  return serializeCookie(token, maxAgeSeconds);
}

export function clearOfficeSessionCookie() {
  return serializeCookie('', 0);
}

export function hasValidOfficeSession(req) {
  if (!canUseOfficeAuth()) {
    return false;
  }

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[sessionCookieName];

  if (!token) {
    return false;
  }

  const [rawExpiry, providedSignature] = token.split('.');

  if (!rawExpiry || !providedSignature) {
    return false;
  }

  const expectedSignature = signValue(rawExpiry);

  if (!safeEqualText(providedSignature, expectedSignature)) {
    return false;
  }

  const expiryTimestamp = Number(rawExpiry);

  if (!Number.isFinite(expiryTimestamp)) {
    return false;
  }

  return Date.now() < expiryTimestamp;
}