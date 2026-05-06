import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Ornament } from './Ornament';
interface Crumb {
  label: string;
  to?: string;
}
interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}
export function PageHero({ eyebrow, title, subtitle, crumbs }: Props) {
  return (
    <section className="relative px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
      {crumbs && crumbs.length > 0 &&
      <nav className="flex items-center justify-center gap-1.5 mb-8 font-display text-[10px] tracking-[0.28em] uppercase text-brown/80">
          {crumbs.map((c, i) =>
        <Fragment key={i}>
              {c.to ?
          <Link
            to={c.to}
            className="hover:text-brown-dark transition-colors">
            
                  {c.label}
                </Link> :

          <span className="text-brown-dark">{c.label}</span>
          }
              {i < crumbs.length - 1 &&
          <ChevronRight className="w-3 h-3 text-brown/40" />
          }
            </Fragment>
        )}
        </nav>
      }

      {eyebrow &&
      <p className="font-display text-[11px] md:text-xs tracking-[0.4em] uppercase text-gold-dark mb-4">
          {eyebrow}
        </p>
      }

      <h1
        className="font-display text-4xl md:text-6xl text-brown-dark leading-tight"
        style={{
          fontWeight: 600,
          textShadow: '0 1px 8px rgba(0,0,0,0.08)'
        }}>
        
        {title}
      </h1>

      {subtitle &&
      <p className="font-cormorant italic text-xl md:text-2xl text-charcoal/90 mt-5 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      }

      <div className="text-gold mt-8 flex justify-center">
        <Ornament className="w-40 h-5" />
      </div>
    </section>);

}