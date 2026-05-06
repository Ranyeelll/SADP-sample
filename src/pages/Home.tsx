import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ScrollText, Clock, ArrowRight, Cross } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Ornament, Flourish } from '../components/Ornament';
const HERO_IMG = "/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg";

const WELCOME_IMG = "/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg";

const features = [
{
  icon: ScrollText,
  title: 'Parish History',
  desc: 'A structured chronicle of the founding, growth, and present life of our parish.',
  to: '/history',
  cta: 'Read the History'
},
{
  icon: Clock,
  title: 'Timeline of Events',
  desc: 'Walk through the milestones that have shaped our community across the decades.',
  to: '/timeline',
  cta: 'View Timeline'
},
{
  icon: BookOpen,
  title: 'Flipbook Archive',
  desc: 'An immersive digital book gathering compiled historical documents of the Church.',
  to: '/flipbook',
  cta: 'Open Archive'
}];

export function Home() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMG})`
          }} />
        
        <div className="absolute inset-0 bg-brown-dark/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(43,27,15,0.6) 100%)'
          }} />
        

        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
          className="relative z-10 text-center px-6 max-w-4xl">
          
          <div className="text-gold/90 mb-6 flex justify-center">
            <Ornament className="w-44 h-5" />
          </div>
          <p className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-5">
            Quezon City · Est. 1952
          </p>
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl text-parchment-light leading-[1.05]"
            style={{
              fontWeight: 600
            }}>
            
            San Antonio de Padua
            <span className="block font-cormorant italic font-normal text-gold mt-2 text-3xl md:text-5xl">
              Parish History
            </span>
          </h1>
          <p className="font-cormorant italic text-lg md:text-2xl text-parchment-light/95 mt-6 max-w-2xl mx-auto leading-relaxed">
            A chronicle of faith, community, and tradition.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/history"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-brown-dark border border-gold/60 text-parchment-light font-display tracking-[0.25em] text-xs uppercase hover:bg-brown transition-colors shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
              
              Explore History
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/flipbook"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-gold/80 text-gold font-display tracking-[0.25em] text-xs uppercase hover:bg-gold/10 transition-colors">
              
              <BookOpen className="w-4 h-4" />
              Open Flipbook Archive
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Welcome */}
      <section className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.4
            }}
            transition={{
              duration: 0.8
            }}>
            
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-4">
              Welcome
            </p>
            <h2
              className="font-display text-3xl md:text-4xl text-brown-dark leading-tight mb-5"
              style={{
                fontWeight: 600
              }}>
              
              A Parish Rooted in Faith and Heritage
            </h2>
            <div className="text-gold-dark mb-6">
              <Flourish className="w-24 h-4" />
            </div>
            <div className="font-body text-[1.1rem] text-charcoal leading-[1.8] space-y-4">
              <p>
                For more than seven decades, San Antonio de Padua Parish has
                stood as a beacon of devotion in Quezon City — a place where
                generations of families have gathered to worship, to mourn, to
                celebrate, and to grow in the life of grace.
              </p>
              <p>
                This site is a humble chronicle of that long journey: the
                founding of our community, the building of our church, and the
                countless lives quietly shaped by the sacraments within her
                walls.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.4
            }}
            transition={{
              duration: 0.8
            }}
            className="relative">
            
            <div className="aspect-[4/5] overflow-hidden border-8 border-parchment-light shadow-[0_24px_48px_-16px_rgba(62,42,28,0.4)]">
              <img
                src={WELCOME_IMG}
                alt="Parish interior"
                className="w-full h-full object-cover" />
              
            </div>
            <div className="absolute -bottom-5 -left-5 bg-brown-dark text-parchment-light px-6 py-4 border border-gold/40 hidden md:block">
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-gold">
                Since
              </p>
              <p className="font-display text-2xl mt-1">1952</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured cards */}
      <section className="px-6 md:px-8 py-20 md:py-24 bg-beige/40 border-y border-brown/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
              Discover
            </p>
            <h2
              className="font-display text-3xl md:text-4xl text-brown-dark"
              style={{
                fontWeight: 600
              }}>
              
              Pathways into our Heritage
            </h2>
            <div className="text-gold mt-5 flex justify-center">
              <Ornament className="w-32 h-5" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) =>
            <motion.div
              key={f.title}
              initial={{
                opacity: 0,
                y: 24
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
                duration: 0.7,
                delay: i * 0.1
              }}>
              
                <Link
                to={f.to}
                className="group block h-full page-bg p-8 border border-brown/15 hover:border-gold/60 transition-all duration-300 hover:shadow-[0_18px_36px_-12px_rgba(62,42,28,0.3)]">
                
                  <div className="w-12 h-12 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark mb-5 group-hover:bg-gold/10 transition-colors">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3
                  className="font-display text-xl text-brown-dark mb-3"
                  style={{
                    fontWeight: 600
                  }}>
                  
                    {f.title}
                  </h3>
                  <p className="font-body text-[1.05rem] text-charcoal leading-relaxed mb-5">
                    {f.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.25em] uppercase text-gold-dark group-hover:gap-2.5 transition-all">
                    {f.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Heritage quote */}
      <section className="px-6 md:px-8 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <div className="text-gold flex justify-center mb-8">
          <Cross className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-6">
          A Heritage of Faith
        </p>
        <blockquote className="font-cormorant italic text-2xl md:text-4xl text-brown-dark leading-snug">
          "We are surrounded by so great a cloud of witnesses — let us run with
          patience the race that is set before us."
        </blockquote>
        <p className="font-display text-xs tracking-[0.3em] uppercase text-brown/50 mt-6">
          Hebrews 12:1
        </p>
        <div className="text-gold mt-10 flex justify-center">
          <Ornament className="w-44 h-5" />
        </div>
      </section>
    </PageLayout>);

}