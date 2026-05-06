import React from 'react';
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
      className={`page-bg h-full w-full flex flex-col px-8 md:px-12 lg:px-16 py-10 md:py-12 ${side === 'left' ? 'page-edge-left' : 'page-edge-right'}`}>
      
      {isFirstOfChapter &&
      <div className="mb-6">
          <div className="text-gold-dark mb-3 flex justify-center">
            <Flourish className="w-20 h-4" />
          </div>
          <h2 className="font-display text-center text-brown-dark text-lg md:text-xl tracking-[0.15em] uppercase">
            {page.chapter}
          </h2>
          <div className="text-gold-dark mt-3 flex justify-center">
            <Flourish className="w-20 h-4 rotate-180" />
          </div>
        </div>
      }

      <div className="flex-1 overflow-hidden">
        <div className="font-body text-charcoal text-[1.1rem] md:text-[1.15rem] leading-[1.8] space-y-4 text-justify">
          {page.paragraphs.map((p, i) =>
          <p
            key={i}
            className={i === 0 && isFirstOfChapter ? 'drop-cap' : ''}>
            
              {p}
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-brown/10 flex items-center justify-center">
        <span className="font-display text-sm text-brown/80 tracking-[0.3em]">
          {romanNumerals[page.pageNumber] || page.pageNumber}
        </span>
      </div>
    </div>);

}