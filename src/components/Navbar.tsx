import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cross } from 'lucide-react';
const links = [
{
  to: '/',
  label: 'Home'
},
{
  to: '/history',
  label: 'History'
},
{
  to: '/timeline',
  label: 'Timeline'
},
{
  to: '/flipbook',
  label: 'Flipbook'
},
{
  to: '/contact',
  label: 'Contact'
}];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-parchment/95 backdrop-blur border-b border-brown/15 shadow-[0_2px_12px_-6px_rgba(62,42,28,0.25)]' : 'bg-parchment/80 backdrop-blur-sm border-b border-transparent'}`}>
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brown-dark border border-gold/60 flex items-center justify-center text-gold group-hover:bg-brown transition-colors">
            <Cross className="w-4 h-4" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[11px] md:text-xs tracking-[0.3em] uppercase text-brown-dark">
              San Antonio de Padua
            </div>
            <div className="font-cormorant italic text-xs md:text-sm text-brown/70 -mt-0.5">
              Parish · Quezon City
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
            `relative px-4 py-2 font-display text-[11px] tracking-[0.28em] uppercase transition-colors ${isActive ? 'text-brown-dark' : 'text-brown/70 hover:text-brown-dark'}`
            }>
            
              {({ isActive }) =>
            <>
                  {l.label}
                  <span
                className={`absolute left-4 right-4 -bottom-0.5 h-[2px] transition-all duration-300 ${isActive ? 'bg-gold opacity-100' : 'bg-gold opacity-0'}`} />
              
                </>
            }
            </NavLink>
          )}
        </nav>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden p-2 text-brown-dark">
          
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-brown-dark/40 z-50 md:hidden" />
          
            <motion.div
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'tween',
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-parchment z-50 md:hidden flex flex-col border-l-2 border-gold/40">
            
              <div className="flex items-center justify-between px-5 h-20 border-b border-brown/15">
                <span className="font-display text-xs tracking-[0.3em] uppercase text-brown-dark">
                  Menu
                </span>
                <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-brown-dark">
                
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col px-2 py-6">
                {links.map((l) =>
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                `px-5 py-4 font-display tracking-[0.25em] uppercase text-sm border-l-2 transition-colors ${isActive ? 'border-gold text-brown-dark bg-gold/10' : 'border-transparent text-brown/70 hover:text-brown-dark hover:bg-brown/5'}`
                }>
                
                    {l.label}
                  </NavLink>
              )}
              </nav>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </header>);

}