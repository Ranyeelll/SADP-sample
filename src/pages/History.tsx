import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Flourish, Ornament } from '../components/Ornament';
const sections = [
{
  id: 'founding',
  title: 'Founding of the Parish',
  year: '1952',
  image:
  'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1400&q=80',
  caption: 'The original wooden chapel, c. early 1950s.',
  body: [
  'The story of San Antonio de Padua Parish begins in the rolling hills of what would become Batasan, Quezon City — once a quiet tapestry of cogon fields and unpaved roads on the northern edge of the young capital. As families resettled in the area and new neighborhoods rose, the faithful found themselves without a parish of their own, walking long distances each Sunday to attend Mass in the older churches of the city.',
  'Responding to repeated petitions from the community, the Archdiocese of Manila erected the parish in 1952 under the patronage of Saint Anthony of Padua, the gentle Franciscan friar known to generations of Filipinos as the patron of the lost and the poor. Mass was first celebrated in a modest wooden chapel that stood where the present rectory garden now lies.',
  'The founding pastor, together with a small council of lay leaders, set down the rhythms of parish life that endure to this day: daily Mass at dawn, the evening Angelus, the weekly novena to San Antonio, and the careful instruction of children in the catechism.'],

  pullQuote:
  '"From a wooden chapel in the cogon fields, a parish was born — and with it, a new home for the faithful of the north."'
},
{
  id: 'growth',
  title: 'Growth of the Community',
  year: '1960s — 1980s',
  image:
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1400&q=80',
  caption: 'The present church, completed in 1968.',
  body: [
  'As the surrounding subdivisions filled with families, the small chapel could no longer hold the growing congregation. In 1965, ground was broken for a permanent church, designed in a restrained modern style softened with traditional Spanish-Filipino accents — narra wood pews, a coffered ceiling, and a retablo of carved hardwood crowned by an image of the patron saint.',
  'The new church was solemnly blessed in 1968 by the Most Reverend Archbishop, with hundreds of parishioners walking in procession from the old chapel to the new sanctuary. In the years that followed, the parish responded faithfully to the renewing spirit of the Second Vatican Council: the liturgy was celebrated in the vernacular, lay ministries flourished, and Bible study circles took root in countless homes across the parish.',
  "Catechetical schools, choirs, the Knights of Columbus, the Catholic Women's League, and the Couples for Christ all found a home within the parish, weaving the threads of devotion and service into the daily life of the community."]

},
{
  id: 'milestones',
  title: 'Key Milestones',
  year: '1990s — 2010s',
  image:
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1400&q=80',
  caption: 'Golden jubilee celebration, 2002.',
  body: [
  'The closing decades of the twentieth century and the dawn of the new millennium brought both joy and trial. The parish marked its silver jubilee in 1977 and its golden jubilee in 2002 with solemn Masses of thanksgiving, processions, and a published commemorative volume gathering the recollections of long-time parishioners.',
  "A major renovation in 2008 restored the church's aging roof, refinished the narra interiors, and added a small adoration chapel beside the sanctuary — a quiet place that has since become beloved by the parish, never empty even in the early hours of the morning.",
  'The parish also responded generously in times of national distress: the 1990 earthquake, Typhoon Ondoy in 2009, and the typhoons of more recent memory each saw the parish hall transformed into a relief center, with parishioners packing food and clothing late into the night for neighbors in need.'],

  pullQuote:
  '"In every flood and every tremor, the doors of the parish opened wider — never narrower — for those in need."'
},
{
  id: 'present',
  title: 'Present Parish Life',
  year: 'Today',
  image: "/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg",

  caption: 'The parish church today, Batasan Hills, Quezon City.',
  body: [
  'Today the parish gathers a vibrant community of more than ten thousand registered families. Six Masses are offered each Sunday, in both English and Filipino, and weekday Masses continue at dawn and in the early evening. The feast of San Antonio de Padua, celebrated on the thirteenth of June, remains the great gathering of the parochial year.',
  'Beyond the liturgy, the parish carries on a wide ministry of formation and outreach: a basic ecclesial community network that touches every street; a tuition assistance program for children of the urban poor; a counseling and legal aid clinic; and a thriving youth ministry whose members lead retreats and outreach missions throughout Metro Manila.',
  'As we look toward the next chapter, we are mindful that the history of this parish is not only a record of buildings and dates, but the living testimony of countless souls who, in the words of the Apostle, have run with patience the race that was set before them. To them — and to the One whom they served — this chronicle is humbly offered.']

}];

export function History() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const onScroll = () => {
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el)
        return {
          id: s.id,
          top: Infinity
        };
        return {
          id: s.id,
          top: Math.abs(el.getBoundingClientRect().top - 120)
        };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <PageLayout>
      <PageHero
        eyebrow="Chapter One"
        title="Parish History"
        subtitle="The story of San Antonio de Padua, told in four movements."
        crumbs={[
        {
          label: 'Home',
          to: '/'
        },
        {
          label: 'History'
        }]
        } />
      

      <div className="max-w-6xl mx-auto px-6 md:px-8 pb-24 grid lg:grid-cols-[220px_1fr] gap-12">
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/50 mb-4">
              On this page
            </p>
            <ul className="space-y-1">
              {sections.map((s) =>
              <li key={s.id}>
                  <a
                  href={`#${s.id}`}
                  className={`block px-3 py-2 border-l-2 font-display text-[11px] tracking-[0.2em] uppercase transition-all ${active === s.id ? 'border-gold text-brown-dark bg-gold/10' : 'border-brown/15 text-brown/80 hover:text-brown-dark hover:border-gold/50'}`}>
                  
                    {s.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <article className="space-y-20">
          {sections.map((section, idx) =>
          <motion.section
            key={section.id}
            id={section.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              amount: 0.15
            }}
            transition={{
              duration: 0.7
            }}
            className="scroll-mt-28">
            
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display text-[11px] tracking-[0.3em] uppercase text-gold-dark">
                  {section.year}
                </span>
                <span className="h-px bg-brown/20 flex-1" />
              </div>

              <h2
              className="font-display text-3xl md:text-4xl text-brown-dark mb-5"
              style={{
                fontWeight: 600
              }}>
              
                {section.title}
              </h2>

              <div className="text-gold-dark mb-6">
                <Flourish className="w-20 h-4" />
              </div>

              <figure className="mb-8">
                <div className="aspect-[16/9] overflow-hidden border-4 border-parchment-light shadow-[0_18px_36px_-14px_rgba(62,42,28,0.35)]">
                  <img
                  src={section.image}
                  alt={section.caption}
                  className="w-full h-full object-cover" />
                
                </div>
                <figcaption className="font-cormorant italic text-sm text-brown/80 mt-3 text-center">
                  {section.caption}
                </figcaption>
              </figure>

              <div className="font-body text-[1.15rem] md:text-[1.2rem] text-charcoal leading-[1.85] space-y-5">
                {section.body.map((p, i) =>
              <p key={i} className={i === 0 ? 'drop-cap' : ''}>
                    {p}
                  </p>
              )}
              </div>

              {section.pullQuote &&
            <blockquote className="my-10 pl-6 border-l-4 border-gold">
                  <p className="font-cormorant italic text-xl md:text-2xl text-brown-dark leading-snug">
                    {section.pullQuote}
                  </p>
                </blockquote>
            }

              {idx < sections.length - 1 &&
            <div className="text-gold mt-16 flex justify-center">
                  <Ornament className="w-32 h-5" />
                </div>
            }
            </motion.section>
          )}
        </article>
      </div>
    </PageLayout>);

}