import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookMarked } from 'lucide-react';
import { sections } from '../data/bookContent';
import { Flourish } from './Ornament';
interface Props {
  open: boolean;
  onClose: () => void;
  currentSectionId: string;
  onSelect: (sectionId: string) => void;
}
export function ChapterSidebar({
  open,
  onClose,
  currentSectionId,
  onSelect
}: Props) {
  return (
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
          onClick={onClose}
          className="fixed inset-0 bg-brown-dark/40 backdrop-blur-[2px] z-40" />
        
          <motion.aside
          initial={{
            x: '-100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '-100%'
          }}
          transition={{
            type: 'tween',
            duration: 0.4,
            ease: [0.32, 0.72, 0, 1]
          }}
          className="parchment-bg fixed left-0 top-0 bottom-0 w-[88%] max-w-sm z-50 border-r-2 border-gold/40 flex flex-col">
          
            <div className="flex items-center justify-between px-6 py-5 border-b border-brown/15">
              <div className="flex items-center gap-2 text-brown-dark">
                <BookMarked className="w-5 h-5 text-gold-dark" />
                <span className="font-display tracking-[0.25em] uppercase text-xs">
                  Table of Contents
                </span>
              </div>
              <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="text-brown hover:text-brown-dark p-1">
              
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto thin-scroll px-6 py-8">
              <div className="text-gold-dark mb-6 flex justify-center">
                <Flourish className="w-24 h-5" />
              </div>

              <h2 className="font-display text-2xl text-brown-dark text-center mb-2">
                History of the Church
              </h2>
              <p className="font-cormorant italic text-center text-brown/70 text-sm mb-10">
                Eight chapters across four eras
              </p>

              <ul className="space-y-1">
                {sections.map((section, idx) => {
                const active = section.id === currentSectionId;
                return (
                  <li key={section.id}>
                      <button
                      onClick={() => {
                        onSelect(section.id);
                        onClose();
                      }}
                      className={`w-full text-left group px-4 py-4 border-l-2 transition-all duration-300 ${active ? 'border-gold bg-gold/10' : 'border-transparent hover:border-gold/50 hover:bg-brown/5'}`}>
                      
                        <div className="flex items-baseline gap-3">
                          <span
                          className={`font-display text-xs tracking-[0.3em] ${active ? 'text-gold-dark' : 'text-brown/50'}`}>
                          
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <div
                            className={`font-display text-lg leading-tight ${active ? 'text-brown-dark' : 'text-brown'}`}>
                            
                              {section.title}
                            </div>
                            <div className="font-cormorant italic text-sm text-brown/60 mt-0.5">
                              {section.dates}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>);

              })}
              </ul>
            </div>

            <div className="px-6 py-4 border-t border-brown/15 text-center">
              <p className="font-cormorant italic text-xs text-brown/60">
                "Lumen gentium cum sit Christus"
              </p>
            </div>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}