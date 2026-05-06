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
    <section className="relative px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 md:pt-24 pb-8 sm:pb-10 md:pb-16 text-center">
      {crumbs && crumbs.length > 0 &&
      <nav className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 mb-6 sm:mb-8 font-display text-[9px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brown/80 max-w-3xl mx-auto">
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
      <p className="font-display text-[10px] md:text-xs tracking-[0.34em] sm:tracking-[0.4em] uppercase text-gold-dark mb-3 sm:mb-4 px-2">
          {eyebrow}
        </p>
      }

      <h1
        className="font-display text-3xl sm:text-4xl md:text-6xl text-brown-dark leading-[1.08] sm:leading-tight max-w-4xl mx-auto"
        style={{
          fontWeight: 600
        }}>
        
        {title}
      </h1>

      {subtitle &&
      <p className="font-cormorant italic text-lg sm:text-xl md:text-2xl text-charcoal/90 mt-4 sm:mt-5 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
          {subtitle}
        </p>
      }

      <div className="text-gold mt-6 sm:mt-8 flex justify-center">
        <Ornament className="w-28 sm:w-40 h-5" />
      </div>
    </section>);

}