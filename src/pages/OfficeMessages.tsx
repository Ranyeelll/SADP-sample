import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, RefreshCw, ShieldAlert, CalendarDays, User } from 'lucide-react';

type MessageRecord = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type OfficeLoginErrorResponse = {
  error?: string;
  retryAfterSeconds?: number;
};

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0');
  const seconds = String(safeSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function OfficeMessages() {
  const [inputCode, setInputCode] = useState('');
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState(0);
  const isLockoutActive = lockoutRemainingSeconds > 0;
  const LOCKOUT_STORAGE_KEY = 'sadp_office_lockout_until';

  const activateLockout = (seconds: number) => {
    const retryAfter = Math.max(1, Math.floor(seconds));
    const until = Date.now() + retryAfter * 1000;

    try {
      localStorage.setItem(LOCKOUT_STORAGE_KEY, String(until));
    } catch {
      // ignore storage errors
    }

    setLockoutRemainingSeconds(retryAfter);
    setFailedAttempts(3);
    setError(`Too many failed attempts. Try again in ${formatCountdown(retryAfter)}.`);
  };
  const lockoutModal =
    isLockoutActive && typeof document !== 'undefined'
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" aria-hidden="true" />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="office-lockout-title"
              aria-describedby="office-lockout-description"
              className="relative w-full max-w-md border border-red-200 bg-[#fff9f3] p-6 md:p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)]"
            >
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-red-700 mb-3">
                Security Notice
              </p>
              <h2 id="office-lockout-title" className="font-display text-2xl text-brown-dark mb-3">
                Try again later
              </h2>
              <p id="office-lockout-description" className="font-body text-charcoal leading-relaxed mb-5">
                Too many failed attempts were detected. Please wait before entering the office access code again.
              </p>
              <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-red-900 text-center">
                <span className="font-display text-[11px] tracking-[0.3em] uppercase block mb-1">
                  Remaining time
                </span>
                <span className="font-display text-3xl tracking-[0.2em] text-red-800">
                  {formatCountdown(lockoutRemainingSeconds)}
                </span>
              </div>
              <p className="mt-4 text-center font-cormorant italic text-charcoal">
                You can try again when the timer reaches zero.
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  // Load persisted lockout expiry on mount so countdown survives reloads
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
      if (!raw) return;
      const until = Number(raw);
      if (!Number.isFinite(until)) return;
      const secs = Math.max(0, Math.ceil((until - Date.now()) / 1000));
      if (secs > 0) setLockoutRemainingSeconds(secs);
      else localStorage.removeItem(LOCKOUT_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (!isLockoutActive) {
      try {
        localStorage.removeItem(LOCKOUT_STORAGE_KEY);
      } catch {}
      return;
    }

    const intervalId = window.setInterval(() => {
      setLockoutRemainingSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isLockoutActive, lockoutRemainingSeconds]);

  useEffect(() => {
    if (!isLockoutActive) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLockoutActive]);

  const formattedMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        displayDate: new Date(message.created_at).toLocaleString(),
      })),
    [messages],
  );

  const loadMessages = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/messages', { credentials: 'include' });

      if (response.status === 401) {
        setIsAuthenticated(false);
        setMessages([]);
        return;
      }

      if (!response.ok) {
        throw new Error('Unable to load messages.');
      }

      const data = (await response.json()) as { messages: MessageRecord[] };
      setIsAuthenticated(true);
      setMessages(data.messages ?? []);
    } catch (loadError) {
      setMessages([]);
      setError(loadError instanceof Error ? loadError.message : 'Unable to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, []);

  const login = async () => {
    if (lockoutRemainingSeconds > 0) {
      setError(`Too many failed attempts. Try again in ${formatCountdown(lockoutRemainingSeconds)}.`);
      return;
    }

    const code = inputCode.trim();

    if (!code) {
      setError('Enter the office access code to continue.');
      return;
    }

    setAuthenticating(true);
    setError('');

    try {
      const response = await fetch('/api/office-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });

      if (response.status === 401) {
        setFailedAttempts((currentAttempts) => {
          const nextAttempts = currentAttempts + 1;

          if (nextAttempts >= 3) {
            activateLockout(3 * 60);
          } else {
            setError('Invalid office access code.');
          }

          return nextAttempts;
        });
        return;
      }

      if (response.status === 429) {
        // Prefer explicit JSON field, but fall back to Retry-After header if needed.
        // If neither is present, still show the modal using the known 3-minute lockout window.
        const data = (await response.json().catch(() => ({}))) as OfficeLoginErrorResponse;
        let retryAfter = Number(data.retryAfterSeconds || 0);

        if (!retryAfter) {
          const header = response.headers.get('Retry-After');
          retryAfter = header ? Number(header) : 0;
        }

        if (!retryAfter) {
          retryAfter = 3 * 60;
        }

        if (retryAfter > 0) {
          activateLockout(retryAfter);
          return;
        }

        throw new Error('Too many failed attempts. Please try again later.');
      }

      if (!response.ok) {
        throw new Error('Unable to verify access right now.');
      }

      setInputCode('');
      setLockoutRemainingSeconds(0);
      setFailedAttempts(0);
      try {
        localStorage.removeItem('sadp_office_lockout_until');
      } catch {}
      await loadMessages();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to verify access right now.');
    } finally {
      setAuthenticating(false);
    }
  };

  const logout = async () => {
    await fetch('/api/office-logout', {
      method: 'POST',
      credentials: 'include',
    });

    setIsAuthenticated(false);
    setMessages([]);
    setError('');
    setFailedAttempts(0);
  };

  return (
    <div className="min-h-screen bg-[#f4ecd9] text-brown-dark">
      {lockoutModal}

      <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 md:py-8">
        <div className="flex items-center justify-between border-b border-brown/10 pb-4">
          <div>
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-1">
              Parish Office
            </p>
            <h1 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase">
              Message Inbox
            </h1>
          </div>
          <div className="text-right">
            <p className="font-cormorant italic text-sm text-brown/75">Secure staff-only portal</p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto pt-10 md:pt-14 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="page-bg border border-brown/15 p-6 md:p-8"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-2">
                  Office Access
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-brown-dark" style={{ fontWeight: 600 }}>
                  Review incoming messages
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:min-w-[280px]">
                  <Lock className="w-4 h-4 text-brown/55 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    type="password"
                    placeholder="Office access code"
                    disabled={isAuthenticated || authenticating || isLockoutActive}
                    className="w-full bg-parchment/70 border border-brown/20 px-10 py-3 font-body text-charcoal placeholder:text-brown/40 focus:outline-none focus:border-gold"
                  />
                </div>
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => void logout()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brown-dark text-parchment-light font-display tracking-[0.25em] text-xs uppercase border border-gold/60 hover:bg-brown transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-gold" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void login()}
                    disabled={authenticating || isLockoutActive}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brown-dark text-parchment-light font-display tracking-[0.25em] text-xs uppercase border border-gold/60 hover:bg-brown transition-colors disabled:opacity-70"
                  >
                    <ShieldAlert className="w-4 h-4 text-gold" />
                    {authenticating
                      ? 'Checking...'
                      : isLockoutActive
                        ? `Try Again ${formatCountdown(lockoutRemainingSeconds)}`
                        : 'Open Inbox'}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-brown/80">
              <p className="font-body">Access is protected by a secure server session and expires automatically.</p>
              <button
                type="button"
                onClick={() => void loadMessages()}
                disabled={!isAuthenticated}
                className="inline-flex items-center gap-2 font-display tracking-[0.2em] uppercase text-[11px] text-brown-dark hover:text-gold-dark transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {error ? (
              <div className="mt-5 rounded border border-red-300/80 bg-red-50 px-4 py-3 text-red-900 font-body text-sm leading-relaxed">
                {error}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {loading ? (
              <div className="page-bg border border-brown/15 p-8 text-center font-cormorant italic text-charcoal">
                Loading messages...
              </div>
            ) : !isAuthenticated ? (
              <div className="page-bg border border-brown/15 p-10 text-center">
                <Lock className="w-8 h-8 text-gold-dark mx-auto mb-3" />
                <h3 className="font-display text-2xl text-brown-dark mb-2" style={{ fontWeight: 600 }}>
                  Office sign-in required
                </h3>
                <p className="font-cormorant italic text-charcoal">
                  Enter the office access code to view submitted messages.
                </p>
              </div>
            ) : formattedMessages.length ? (
              formattedMessages.map((message) => (
                <article key={message.id} className="page-bg border border-brown/15 p-6 md:p-7 shadow-[0_10px_30px_-20px_rgba(62,42,28,0.35)]">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4 pb-4 border-b border-brown/10">
                    <div>
                      <p className="font-display text-[11px] tracking-[0.35em] uppercase text-gold-dark mb-2">
                        New Message
                      </p>
                      <h3 className="font-display text-2xl text-brown-dark" style={{ fontWeight: 600 }}>
                        {message.subject}
                      </h3>
                    </div>

                    <div className="font-body text-sm text-brown/80 space-y-2">
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gold-dark" />
                        {message.name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold-dark" />
                        {message.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gold-dark" />
                        {message.displayDate}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-charcoal leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </article>
              ))
            ) : (
              <div className="page-bg border border-brown/15 p-10 text-center">
                <Mail className="w-8 h-8 text-gold-dark mx-auto mb-3" />
                <h3 className="font-display text-2xl text-brown-dark mb-2" style={{ fontWeight: 600 }}>
                  No messages yet
                </h3>
                <p className="font-cormorant italic text-charcoal">
                  Once people submit the contact form, their messages will appear here.
                </p>
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}