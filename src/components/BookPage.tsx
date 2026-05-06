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
      className={`page-bg h-full w-full flex flex-col px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 ${side === 'left' ? 'page-edge-left' : 'page-edge-right'}`}>
      
      {isFirstOfChapter &&
      <div className="mb-4 sm:mb-6">
          <div className="text-gold-dark mb-3 flex justify-center">
            <Flourish className="w-16 sm:w-20 h-4" />
          </div>
          <h2 className="font-display text-center text-brown-dark text-base sm:text-lg md:text-xl tracking-[0.12em] sm:tracking-[0.15em] uppercase">
            {page.chapter}
          </h2>
          <div className="text-gold-dark mt-3 flex justify-center">
            <Flourish className="w-16 sm:w-20 h-4 rotate-180" />
          </div>
        </div>
      }

      <div className="flex-1 overflow-hidden">
        <div className="font-body text-charcoal text-[1rem] sm:text-[1.05rem] md:text-[1.15rem] leading-[1.75] sm:leading-[1.8] space-y-3 sm:space-y-4 text-justify">
          {page.paragraphs.map((p, i) =>
          <p
            key={i}
            className={i === 0 && isFirstOfChapter ? 'drop-cap' : ''}>
            
              {p}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 sm:pt-6 mt-3 sm:mt-4 border-t border-brown/10 flex items-center justify-center">
        <span className="font-display text-[10px] sm:text-sm text-brown/80 tracking-[0.24em] sm:tracking-[0.3em]">
          {romanNumerals[page.pageNumber] || page.pageNumber}
        </span>
      </div>
    </div>);

}