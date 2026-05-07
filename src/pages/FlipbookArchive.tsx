import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ScrollText } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Flourish, Ornament } from '../components/Ornament';
import { sections } from '../data/bookContent';
export function FlipbookArchive() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Optional Reading Module"
        title="Flipbook Archive"
        subtitle="A parish story of San Antonio de Padua — turn each page as you would a printed book."
      />
      

      {/* Closed book preview */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8
            }}
            className="flex justify-center">
            
            {/* Stylized closed book */}
            <div
              className="relative"
              style={{
                perspective: '1600px'
              }}>
              
              <div
                className="relative w-[260px] h-[360px] md:w-[300px] md:h-[420px]"
                style={{
                  transform: 'rotateY(-22deg) rotateX(4deg)',
                  transformStyle: 'preserve-3d'
                }}>
                
                {/* Pages edge */}
                <div className="absolute inset-y-2 -right-2 w-3 bg-gradient-to-r from-parchment-light to-beige border-y border-brown/20" />
                {/* Cover */}
                <div
                    className="absolute inset-0 border border-gold/40 flex flex-col items-center justify-center text-center px-8"
                  style={{
                    background:
                    'linear-gradient(135deg, #5A3E2B 0%, #3E2A1C 60%, #5A3E2B 100%)',
                    boxShadow:
                    '0 30px 60px -15px rgba(62,42,28,0.55), inset 0 0 40px rgba(0,0,0,0.4)'
                  }}>
                  
                  <div className="text-gold mb-6">
                    <Ornament className="w-32 h-5" />
                  </div>
                  <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-3">
                    A Sacred Chronicle
                  </p>
                  <h3
                    className="font-display text-gold text-2xl md:text-3xl leading-tight"
                    style={{
                      fontWeight: 600,
                      textShadow: '0 1px 8px rgba(0,0,0,0.25)'
                    }}>
                    
                    San Antonio de Padua
                  </h3>
                  <div className="text-gold/80 mt-6 mb-6">
                    <Flourish className="w-20 h-4" />
                  </div>
                  <p className="font-cormorant italic text-parchment-light/70 text-sm">
                    A story of parish beginnings, service, and faith
                  </p>
                </div>
              </div>
              {/* Shadow on ground */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-brown-dark/30 blur-2xl rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.8,
              delay: 0.1
            }}>
            
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-4">
              The Archive
            </p>
            <h2
              className="font-display text-3xl md:text-4xl text-brown-dark mb-5 leading-tight"
              style={{
                fontWeight: 600
              }}>
              
              Read it as you would a printed book.
            </h2>
            <div className="font-body text-[1.1rem] text-charcoal leading-[1.8] space-y-4 mb-8">
              <p>
                The Flipbook Archive gathers a parish chronicle of San Antonio
                de Padua Parish — from its founding in 2011 through its growth
                in prayer, service, and community life — presented in the form
                of a digital manuscript.
              </p>
              <p>
                Four chapters across the life of the parish invite slow,
                contemplative reading: pages turn as they would in a hardbound
                volume, with drop caps, ornaments, and roman-numeral
                pagination preserved.
              </p>
            </div>

            <Link
              to="/flipbook/read"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-brown-dark border border-gold/60 text-parchment-light font-display tracking-[0.25em] text-xs uppercase hover:bg-brown transition-colors shadow-[0_8px_24px_-8px_rgba(62,42,28,0.5)]">
              
              <BookOpen className="w-4 h-4 text-gold" />
              Open the Archive
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chapter listing */}
      <section className="px-6 md:px-8 py-16 md:py-20 bg-beige/40 border-y border-brown/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <ScrollText className="w-6 h-6 text-gold-dark mx-auto mb-4" />
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
              Contents
            </p>
            <h2
              className="font-display text-3xl md:text-4xl text-brown-dark"
              style={{
                fontWeight: 600
              }}>
              
              Four Chapters, One Parish Story
            </h2>
            <div className="text-gold mt-5 flex justify-center">
              <Flourish className="w-24 h-4" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {sections.map((s, i) =>
            <motion.div
              key={s.id}
              initial={{
                opacity: 0,
                y: 16
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.3
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.05
              }}>
              
                <Link
                to={`/flipbook/read/${s.id}`}
                className="group flex items-center gap-5 page-bg p-5 md:p-6 border border-brown/15 hover:border-gold/60 transition-all duration-300 hover:shadow-[0_14px_28px_-14px_rgba(62,42,28,0.3)]">
                
                  <div
                  className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 border border-gold/40 bg-brown-dark/5 flex items-center justify-center font-display text-gold-dark text-lg"
                  style={{
                    fontWeight: 600
                  }}>
                  
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                    className="font-display text-lg md:text-xl text-brown-dark"
                    style={{
                      fontWeight: 600
                    }}>
                    
                      {s.title}
                    </h3>
                    <p className="font-cormorant italic text-brown/80 text-sm md:text-base">
                      {s.dates} · {s.pages.length}{' '}
                      {s.pages.length === 1 ? 'page' : 'pages'}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gold-dark/60 group-hover:text-gold-dark group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>);

}