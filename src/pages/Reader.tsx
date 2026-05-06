import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, ArrowLeft } from 'lucide-react';
import { sections, allPages } from '../data/bookContent';
import { ChapterSidebar } from '../components/ChapterSidebar';
import { BookPageContent } from '../components/BookPage';
export function Reader() {
  const { section: sectionParam } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // for mobile (single page)
  const [spreadIndex, setSpreadIndex] = useState(0); // for desktop (two pages)
  const [direction, setDirection] = useState<1 | -1>(1);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Jump to section if param provided
  useEffect(() => {
    if (sectionParam) {
      const idx = allPages.findIndex((p) => p.sectionId === sectionParam);
      if (idx >= 0) {
        setPageIndex(idx);
        setSpreadIndex(Math.floor(idx / 2));
      }
    }
  }, [sectionParam]);
  const totalPages = allPages.length;
  const totalSpreads = Math.ceil(totalPages / 2);
  const currentPage = isMobile ? allPages[pageIndex] : allPages[spreadIndex * 2];
  const currentSectionId = currentPage?.sectionId || sections[0].id;
  const currentSection = sections.find((s) => s.id === currentSectionId)!;
  const goNext = useCallback(() => {
    setDirection(1);
    if (isMobile) {
      setPageIndex((i) => Math.min(i + 1, totalPages - 1));
    } else {
      setSpreadIndex((i) => Math.min(i + 1, totalSpreads - 1));
    }
  }, [isMobile, totalPages, totalSpreads]);
  const goPrev = useCallback(() => {
    setDirection(-1);
    if (isMobile) {
      setPageIndex((i) => Math.max(i - 1, 0));
    } else {
      setSpreadIndex((i) => Math.max(i - 1, 0));
    }
  }, [isMobile]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);
  const jumpToSection = (sectionId: string) => {
    const idx = allPages.findIndex((p) => p.sectionId === sectionId);
    if (idx < 0) return;
    setDirection(idx > (isMobile ? pageIndex : spreadIndex * 2) ? 1 : -1);
    setPageIndex(idx);
    setSpreadIndex(Math.floor(idx / 2));
    navigate(`/flipbook/read/${sectionId}`, {
      replace: true
    });
  };
  const atStart = isMobile ? pageIndex === 0 : spreadIndex === 0;
  const atEnd = isMobile ?
  pageIndex === totalPages - 1 :
  spreadIndex === totalSpreads - 1;
  // For desktop, get left+right pages
  const leftPage = !isMobile ? allPages[spreadIndex * 2] : null;
  const rightPage = !isMobile ? allPages[spreadIndex * 2 + 1] : null;
  // Determine if a page is the first of a chapter
  const isFirstOfChapter = (idx: number) => {
    if (idx === 0) return true;
    const prev = allPages[idx - 1];
    const curr = allPages[idx];
    return prev?.chapter !== curr?.chapter;
  };
  return (
    <div className="parchment-bg min-h-screen w-full flex flex-col">
      {/* Top Bar */}
      <header className="relative z-30 px-3 md:px-8 py-4 flex items-center justify-between border-b border-brown/15 gap-2">
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            to="/flipbook"
            aria-label="Back to Archive"
            className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-2 border border-brown/20 hover:border-gold/60 hover:bg-gold/10 text-brown-dark transition-all rounded-sm">
            
            <ArrowLeft className="w-4 h-4 text-gold-dark" />
            <span className="font-display text-[10px] tracking-[0.25em] uppercase">
              Back
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open chapters"
            className="p-2 text-brown-dark hover:text-gold-dark transition-colors">
            
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center px-2">
          <p className="font-display text-[10px] md:text-xs tracking-[0.35em] uppercase text-brown/60">
            {currentSection.title}
          </p>
          <p className="font-cormorant italic text-xs md:text-sm text-brown-dark mt-0.5 truncate max-w-[60vw] md:max-w-none">
            {currentPage?.chapter}
          </p>
        </div>

        <div className="font-display text-xs tracking-[0.25em] text-brown/60 hidden sm:block">
          {isMobile ?
          `${pageIndex + 1} / ${totalPages}` :
          `${spreadIndex + 1} / ${totalSpreads}`}
        </div>
        <div className="w-9 sm:hidden" />
      </header>

      {/* Reader */}
      <main className="flex-1 flex items-center justify-center relative px-2 md:px-8 py-6 md:py-10">
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          disabled={atStart}
          aria-label="Previous page"
          className={`absolute left-2 md:left-6 z-20 p-3 rounded-full transition-all ${atStart ? 'text-brown/20 cursor-not-allowed' : 'text-gold-dark hover:bg-brown/5 hover:text-brown-dark'}`}>
          
          <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
        </button>

        {/* Book */}
        <div
          className="w-full max-w-6xl mx-auto"
          style={{
            perspective: '2400px'
          }}>
          
          {isMobile ?
          // Mobile: single page
          <div
            className="relative mx-auto book-shadow"
            style={{
              aspectRatio: '5/7',
              maxWidth: '92vw'
            }}>
            
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                key={pageIndex}
                custom={direction}
                initial={{
                  rotateY: direction === 1 ? 90 : -90,
                  opacity: 0
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1
                }}
                exit={{
                  rotateY: direction === 1 ? -90 : 90,
                  opacity: 0
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.45, 0.05, 0.25, 1]
                }}
                style={{
                  transformOrigin:
                  direction === 1 ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d'
                }}
                className="absolute inset-0">
                
                  <BookPageContent
                  page={allPages[pageIndex]}
                  side="right"
                  isFirstOfChapter={isFirstOfChapter(pageIndex)} />
                
                </motion.div>
              </AnimatePresence>
            </div> :

          // Desktop: two-page spread
          <div
            className="relative mx-auto book-shadow flex"
            style={{
              aspectRatio: '10/7',
              maxWidth: 'min(92vw, 1100px)'
            }}>
            
              {/* Spine shadow */}
              <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 z-10 pointer-events-none"
              style={{
                background:
                'linear-gradient(to right, rgba(62,42,28,0.0) 0%, rgba(62,42,28,0.35) 50%, rgba(62,42,28,0.0) 100%)'
              }} />
            

              <div className="w-1/2 h-full relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                  key={`L-${spreadIndex}`}
                  initial={{
                    rotateY: direction === -1 ? -100 : 0,
                    opacity: direction === -1 ? 0.4 : 1
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1
                  }}
                  exit={{
                    rotateY: direction === 1 ? 0 : -100,
                    opacity: direction === 1 ? 1 : 0.4
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.45, 0.05, 0.25, 1]
                  }}
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  className="absolute inset-0">
                  
                    {leftPage &&
                  <BookPageContent
                    page={leftPage}
                    side="left"
                    isFirstOfChapter={isFirstOfChapter(spreadIndex * 2)} />

                  }
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-1/2 h-full relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                  key={`R-${spreadIndex}`}
                  initial={{
                    rotateY: direction === 1 ? 100 : 0,
                    opacity: direction === 1 ? 0.4 : 1
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1
                  }}
                  exit={{
                    rotateY: direction === -1 ? 0 : 100,
                    opacity: direction === -1 ? 1 : 0.4
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.45, 0.05, 0.25, 1]
                  }}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  className="absolute inset-0">
                  
                    {rightPage ?
                  <BookPageContent
                    page={rightPage}
                    side="right"
                    isFirstOfChapter={isFirstOfChapter(spreadIndex * 2 + 1)} /> :


                  <div className="page-bg page-edge-right h-full w-full flex flex-col items-center justify-center px-10 text-center">
                        <div className="text-gold-dark mb-6">
                          <svg
                        viewBox="0 0 120 30"
                        className="w-24 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2">
                        
                            <path
                          d="M5 15 C 25 5, 35 25, 55 15"
                          strokeLinecap="round" />
                        
                            <path
                          d="M115 15 C 95 25, 85 5, 65 15"
                          strokeLinecap="round" />
                        
                            <circle
                          cx="60"
                          cy="15"
                          r="2.5"
                          fill="currentColor"
                          stroke="none" />
                        
                          </svg>
                        </div>
                        <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold-dark mb-4">
                          Colophon
                        </p>
                        <p className="font-cormorant italic text-charcoal text-lg leading-relaxed max-w-sm mb-6">
                          Here ends this brief chronicle of the Church — a
                          pilgrim people, journeying always toward the city
                          whose builder and maker is God.
                        </p>
                        <p className="font-display text-xs tracking-[0.3em] uppercase text-brown/70 mb-2">
                          Deo Gratias
                        </p>
                        <p className="font-cormorant italic text-sm text-brown/70">
                          San Antonio de Padua Parish
                        </p>
                      </div>
                  }
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          }
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          disabled={atEnd}
          aria-label="Next page"
          className={`absolute right-2 md:right-6 z-20 p-3 rounded-full transition-all ${atEnd ? 'text-brown/20 cursor-not-allowed' : 'text-gold-dark hover:bg-brown/5 hover:text-brown-dark'}`}>
          
          <ChevronRight className="w-7 h-7 md:w-9 md:h-9" />
        </button>
      </main>

      {/* Bottom progress */}
      <footer className="px-6 py-4 border-t border-brown/15 flex items-center justify-center gap-2">
        {sections.map((s) => {
          const active = s.id === currentSectionId;
          return (
            <button
              key={s.id}
              onClick={() => jumpToSection(s.id)}
              className="group flex items-center gap-2"
              aria-label={`Jump to ${s.title}`}>
              
              <span
                className={`block h-[2px] transition-all duration-500 ${active ? 'w-10 bg-gold' : 'w-6 bg-brown/25 group-hover:bg-brown/50'}`} />
              
              <span
                className={`hidden md:inline font-display text-[10px] tracking-[0.25em] uppercase transition-colors ${active ? 'text-brown-dark' : 'text-brown/40 group-hover:text-brown/70'}`}>
                
                {s.title}
              </span>
            </button>);

        })}
      </footer>

      <ChapterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentSectionId={currentSectionId}
        onSelect={jumpToSection} />
      
    </div>);

}