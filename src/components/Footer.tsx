import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Cross } from 'lucide-react';
import { Ornament } from './Ornament';
export function Footer() {
  return (
    <footer className="bg-brown-dark text-beige mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="text-gold flex justify-center mb-10">
          <Ornament className="w-48 h-6" />
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/parish-logo.png" 
                alt="San Antonio de Padua Parish Logo"
                className="w-10 h-10 rounded-full object-cover border border-gold/50"
              />
              <div className="leading-tight">
                <div className="font-display text-xs tracking-[0.25em] uppercase text-parchment-light">
                  San Antonio de Padua
                </div>
                <div className="font-cormorant italic text-sm text-beige/70">
                  Parish
                </div>
              </div>
            </div>
            <p className="font-cormorant italic text-sm leading-relaxed text-beige/90">
              A chronicle of faith, community, and tradition in the heart of
              Quezon City.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2 font-body text-[15px]">
              <li>
                <Link
                  to="/about"
                  className="hover:text-parchment-light transition-colors">
                  
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-parchment-light transition-colors">
                  
                  Parish History
                </Link>
              </li>
              <li>
                <Link
                  to="/timeline"
                  className="hover:text-parchment-light transition-colors">
                  
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  to="/flipbook"
                  className="hover:text-parchment-light transition-colors">
                  
                  Flipbook Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-parchment-light transition-colors">
                  
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Visit
            </h4>
            <ul className="space-y-3 font-body text-[15px] text-beige">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-gold flex-shrink-0" />
                <span>
                  Batasan Hills, Quezon City
                  <br />
                  Metro Manila, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+63 (2) 8123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>parish@sanantoniodepadua.ph</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Mass Schedule
            </h4>
            <ul className="space-y-2 font-body text-[15px] text-beige">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 text-gold flex-shrink-0" />
                <div>
                  <div>Sundays · 6:00, 8:00, 10:00 AM</div>
                  <div className="text-beige/80 text-sm">
                    5:00 PM Anticipated
                  </div>
                </div>
              </li>
              <li className="pl-6 text-beige/90 text-sm">
                Weekdays · 6:30 AM, 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-beige/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-cormorant italic text-sm text-beige/70">
            "Lumen gentium cum sit Christus" — Christ is the light of nations.
          </p>
          <p className="font-display text-[10px] tracking-[0.25em] uppercase text-beige/70">
            © {new Date().getFullYear()} · San Antonio de Padua Parish
          </p>
        </div>
      </div>
    </footer>);

}