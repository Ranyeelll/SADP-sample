import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, RefreshCw, ShieldAlert, CalendarDays, User } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';

type MessageRecord = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export function OfficeMessages() {
  const [inputCode, setInputCode] = useState('');
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        throw new Error('Invalid office access code.');
      }

      if (response.status === 429) {
        throw new Error('Too many failed attempts. Please try again later.');
      }

      if (!response.ok) {
        throw new Error('Unable to verify access right now.');
      }

      setInputCode('');
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
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Parish Office"
        title="Message Inbox"
        subtitle="A private view for the parish office to review incoming contact form messages."
      />

      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20 space-y-8">
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
                  disabled={isAuthenticated || authenticating}
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
                  disabled={authenticating}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brown-dark text-parchment-light font-display tracking-[0.25em] text-xs uppercase border border-gold/60 hover:bg-brown transition-colors disabled:opacity-70"
                >
                  <ShieldAlert className="w-4 h-4 text-gold" />
                  {authenticating ? 'Checking...' : 'Open Inbox'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-sm text-brown/80">
            <p className="font-body">Access is now protected by a secure server session and expires automatically.</p>
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
    </PageLayout>
  );
}