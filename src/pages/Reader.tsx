import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, ArrowLeft } from 'lucide-react';
import { sections, allPages } from '../data/bookContent';
import { ChapterSidebar } from '../components/ChapterSidebar';
import { BookPageContent } from '../components/BookPage';

// ---- Tunables for the page-flip animation ---------------------------------
const FLIP_DURATION = 0.85; // seconds
const FLIP_EASE: [number, number, number, number] = [0.42, 0.0, 0.2, 1];

// ---- Colophon (shown after the last real page on desktop) -----------------
function ColophonPage() {
  return (
    <div className="page-bg page-edge-right h-full w-full flex flex-col items-center justify-center px-10 text-center">
      <div className="text-gold-dark mb-6">
        <svg viewBox="0 0 120 30" className="w-24 h-5" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M5 15 C 25 5, 35 25, 55 15" strokeLinecap="round" />
          <path d="M115 15 C 95 25, 85 5, 65 15" strokeLinecap="round" />
          <circle cx="60" cy="15" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold-dark mb-4">Colophon</p>
      <p className="font-cormorant italic text-charcoal text-lg leading-relaxed max-w-sm mb-6">
        Here ends this brief chronicle of the Church &mdash; a pilgrim people, journeying always toward the city whose builder and maker is God.
      </p>
      <p className="font-display text-xs tracking-[0.3em] uppercase text-brown/70 mb-2">Deo Gratias</p>
      <p className="font-cormorant italic text-sm text-brown/70">San Antonio de Padua Parish</p>
    </div>
  );
}

// Renders either a real book page or the colophon when index is past the end.
function RenderPage({
  index,
  side,
  isFirstOfChapter,
}: {
  index: number;
  side: 'left' | 'right';
  isFirstOfChapter: boolean;
}) {
  const page = allPages[index];
  if (!page) return <ColophonPage />;
  return <BookPageContent page={page} side={side} isFirstOfChapter={isFirstOfChapter} />;
}

export function Reader() {
  const { section: sectionParam } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(0); // for mobile (single page)
  const [spreadIndex, setSpreadIndex] = useState(0); // for desktop (two pages)
  const [direction, setDirection] = useState<1 | -1>(1);
  // While a desktop flip animation is in-flight, this holds the direction.
  const [flipping, setFlipping] = useState<null | 1 | -1>(null);
  const flipLockRef = useRef(false);
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
      return;
    }
    if (flipLockRef.current) return;
    if (spreadIndex >= totalSpreads - 1) return;
    flipLockRef.current = true;
    setFlipping(1);
  }, [isMobile, totalPages, totalSpreads, spreadIndex]);
  const goPrev = useCallback(() => {
    setDirection(-1);
    if (isMobile) {
      setPageIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (flipLockRef.current) return;
    if (spreadIndex <= 0) return;
    flipLockRef.current = true;
    setFlipping(-1);
  }, [isMobile, spreadIndex]);

  const handleFlipComplete = useCallback((dir: 1 | -1) => {
    setSpreadIndex((i) => i + dir);
    setFlipping(null);
    requestAnimationFrame(() => {
      flipLockRef.current = false;
    });
  }, []);
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
  // Desktop spread page indices (used by the flipping overlay too).
  const leftIdx = spreadIndex * 2;
  const rightIdx = spreadIndex * 2 + 1;
  const nextLeftIdx = (spreadIndex + 1) * 2;
  const nextRightIdx = (spreadIndex + 1) * 2 + 1;
  const prevLeftIdx = (spreadIndex - 1) * 2;
  const prevRightIdx = (spreadIndex - 1) * 2 + 1;
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
          disabled={atStart || !!flipping}
          aria-label="Previous page"
          className={`absolute left-2 md:left-6 z-20 p-3 rounded-full transition-all ${atStart || flipping ? 'text-brown/20 cursor-not-allowed' : 'text-gold-dark hover:bg-brown/5 hover:text-brown-dark'}`}>
          
          <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
        </button>

        {/* Book */}
        <div
          className="w-full max-w-6xl mx-auto"
          style={{
            perspective: '2400px'
          }}>
          
          {isMobile ?
          // Mobile: single page, light 3D fade
          <div
            className="relative mx-auto book-shadow"
            style={{
              aspectRatio: '5/7',
              maxWidth: '92vw'
            }}>
            
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                key={pageIndex}
                custom={direction}
                initial={{
                  rotateY: direction === 1 ? 60 : -60,
                  opacity: 0
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1
                }}
                exit={{
                  rotateY: direction === 1 ? -60 : 60,
                  opacity: 0
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.32, 0.72, 0.25, 1]
                }}
                style={{
                  transformOrigin:
                  direction === 1 ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity'
                }}
                className="absolute inset-0">
                
                  <BookPageContent
                  page={allPages[pageIndex]}
                  side="right"
                  isFirstOfChapter={isFirstOfChapter(pageIndex)} />
                
                </motion.div>
              </AnimatePresence>
            </div> :

          // Desktop: two-page spread with a true flipping overlay
          <div
            className="relative mx-auto book-shadow flex"
            style={{
              aspectRatio: '10/7',
              maxWidth: 'min(92vw, 1100px)',
              transformStyle: 'preserve-3d'
            }}>

              {/* Left static half */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <RenderPage
                  index={flipping === -1 ? prevLeftIdx : leftIdx}
                  side="left"
                  isFirstOfChapter={isFirstOfChapter(flipping === -1 ? prevLeftIdx : leftIdx)} />
              </div>

              {/* Right static half */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <RenderPage
                  index={flipping === 1 ? nextRightIdx : rightIdx}
                  side="right"
                  isFirstOfChapter={isFirstOfChapter(flipping === 1 ? nextRightIdx : rightIdx)} />
              </div>

              {/* Spine shadow */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 z-10 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(62,42,28,0.0) 0%, rgba(62,42,28,0.35) 50%, rgba(62,42,28,0.0) 100%)'
                }} />

              {/* Flipping page overlay */}
              {flipping === 1 &&
                <motion.div
                  key={`flip-fwd-${spreadIndex}`}
                  className="absolute top-0 right-0 h-full w-1/2 z-30"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    willChange: 'transform'
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                  onAnimationComplete={() => handleFlipComplete(1)}>
                  {/* Front face: current right page */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}>
                    <RenderPage
                      index={rightIdx}
                      side="right"
                      isFirstOfChapter={isFirstOfChapter(rightIdx)} />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.35 }}
                      transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                      style={{
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.25), rgba(0,0,0,0) 60%)'
                      }} />
                  </div>
                  {/* Back face: next left page */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}>
                    <RenderPage
                      index={nextLeftIdx}
                      side="left"
                      isFirstOfChapter={isFirstOfChapter(nextLeftIdx)} />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0.35 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0) 60%)'
                      }} />
                  </div>
                </motion.div>
              }

              {flipping === -1 &&
                <motion.div
                  key={`flip-back-${spreadIndex}`}
                  className="absolute top-0 left-0 h-full w-1/2 z-30"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'right center',
                    willChange: 'transform'
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                  onAnimationComplete={() => handleFlipComplete(-1)}>
                  {/* Front face: current left page */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}>
                    <RenderPage
                      index={leftIdx}
                      side="left"
                      isFirstOfChapter={isFirstOfChapter(leftIdx)} />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.35 }}
                      transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0) 60%)'
                      }} />
                  </div>
                  {/* Back face: previous right page */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}>
                    <RenderPage
                      index={prevRightIdx}
                      side="right"
                      isFirstOfChapter={isFirstOfChapter(prevRightIdx)} />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0.35 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                      style={{
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.25), rgba(0,0,0,0) 60%)'
                      }} />
                  </div>
                </motion.div>
              }
            </div>
          }
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          disabled={atEnd || !!flipping}
          aria-label="Next page"
          className={`absolute right-2 md:right-6 z-20 p-3 rounded-full transition-all ${atEnd || flipping ? 'text-brown/20 cursor-not-allowed' : 'text-gold-dark hover:bg-brown/5 hover:text-brown-dark'}`}>
          
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