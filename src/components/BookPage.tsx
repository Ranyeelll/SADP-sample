import { Flourish } from './Ornament';
import type { BookPage as BookPageType } from '../data/bookContent';
const romanNumerals = [
'',
'I',
'II',
'III',
'IV',
'V',
'VI',
'VII',
'VIII',
'IX',
'X',
'XI',
'XII',
'XIII',
'XIV',
'XV',
'XVI',
'XVII',
'XVIII',
'XIX',
'XX'];

interface Props {
  page: BookPageType;
  side: 'left' | 'right';
  isFirstOfChapter?: boolean;
}
export function BookPageContent({ page, side, isFirstOfChapter }: Props) {
  return (
    <div
      className={`page-bg h-full w-full flex flex-col px-5 sm:px-7 md:px-10 lg:px-12 py-5 sm:py-6 md:py-8 ${side === 'left' ? 'page-edge-left' : 'page-edge-right'}`}>

      {isFirstOfChapter &&
      <div className="mb-2 sm:mb-3 flex-shrink-0">
          <div className="text-gold-dark mb-2 flex justify-center">
            <Flourish className="w-14 sm:w-16 h-3" />
          </div>
          <h2 className="font-display text-center text-brown-dark text-sm sm:text-base md:text-lg tracking-[0.12em] sm:tracking-[0.15em] uppercase leading-tight">
            {page.chapter}
          </h2>
          <div className="text-gold-dark mt-2 flex justify-center">
            <Flourish className="w-14 sm:w-16 h-3 rotate-180" />
          </div>
        </div>
      }

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {page.image &&
        <div className="mb-3 sm:mb-4 flex-shrink-0">
            <div className="overflow-hidden border border-brown/15 bg-parchment-light/60 shadow-[0_10px_22px_-12px_rgba(62,42,28,0.35)] flex items-center justify-center">
              <img
              src={page.image}
              alt={page.imageAlt || page.chapter}
              className="max-h-40 sm:max-h-48 md:max-h-56 w-auto max-w-full object-contain" />
            </div>
          </div>
        }
        <div className="font-body text-charcoal text-[0.92rem] sm:text-[0.98rem] md:text-[1.02rem] leading-[1.55] sm:leading-[1.6] md:leading-[1.65] space-y-2.5 sm:space-y-3 text-justify flex-1 min-h-0 overflow-y-auto thin-scroll pr-1">
          {page.paragraphs.map((p, i) =>
          <p
            key={i}
            className={i === 0 && isFirstOfChapter ? 'drop-cap' : ''}>

              {p}
            </p>
          )}
        </div>
      </div>

      <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-brown/10 flex items-center justify-center flex-shrink-0">
        <span className="font-display text-[10px] sm:text-xs text-brown/80 tracking-[0.24em] sm:tracking-[0.3em]">
          {romanNumerals[page.pageNumber] || page.pageNumber}
        </span>
      </div>
    </div>);

}