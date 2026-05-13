import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Flourish, Ornament } from '../components/Ornament';
const sections = [
{
  id: 'founding',
  title: 'Founding of the Parish',
  year: '2011',
  image:
  '/sadp-chapel-original.jpg',
  caption: 'San Antonio de Padua Chapel — then a sub-parish of Christ the King — the original chapel where the parish began, established by Decree 2011-276 on 13 June 2011.',
  body: [
  'The story of San Antonio de Padua Parish begins in Batasan, Quezon City — a growing community seeking a spiritual home. Families across the northern neighborhoods found themselves traveling long distances to attend Mass in distant parishes, and their faithful petitions reached the Diocese of Novaliches.',
  'Responding to this call, the Diocese of Novaliches erected San Antonio de Padua Parish by Decree 2011-276, signed by Most Rev. Antonio R. Tobias, DD, and given in Fairview, Quezon City on 13 June 2011. The parish was established under the patronage of Saint Anthony of Padua, the gentle Franciscan friar known to generations of Filipinos as the patron of the lost and the poor. Mass was first celebrated in a modest chapel, marking the beginning of a new chapter in the spiritual life of the community.',
  'The founding Parish Priest, together with a small council of lay leaders, set down the rhythms of parish life that endure to this day: daily Mass at dawn and in the evening, the weekly novena to San Antonio, and the careful instruction of children in the catechism. From this humble beginning, a community was born.'],

  pullQuote:
  '"In answer to the prayers of the faithful, a parish was born — and with it, a new home for the people of Batasan."'
},
{
  id: 'growth',
  title: 'Years of Growth & Building',
  year: '2012 — 2018',
  image:
  '/founding-of-parish.jpg',
  caption: 'The parish church under renovation and construction during its years of growth.',
  body: [
  'In the years following the parish\'s establishment in 2011, the small chapel could no longer accommodate the growing congregation of faithful. Recognizing this growth, the parish began planning for a permanent, more spacious church building to serve the community\'s sacramental and pastoral needs.',
  'During these formative years, the parish deepened its pastoral presence through the launch of lay ministries, Bible study circles, and prayer groups that took root in countless homes across Batasan. Catechetical programs expanded, the choir began to flourish, and community organizations such as the Knights of Columbus and Catholic Women\'s League found their home within the parish.',
  'The spirit of Vatican II animated our liturgy and pastoral approach, as the faithful grew in their understanding of the Church\'s mission and their role in building the Kingdom of God in their neighborhoods.']

},
{
  id: 'bayanihan',
  title: 'Bayanihan: Building the Church Together',
  year: '2014 — 2017',
  image: '/bayanihan-3.jpg',
  caption:
    'Parishioners and youth working side by side during the construction of the parish church — the spirit of Bayanihan in action.',
  body: [
    'As the parish outgrew its original chapel, the work of building a permanent church began — not by contract alone, but in the great Filipino spirit of Bayanihan. Fathers, mothers, youth, and children gave their Saturdays, their Sundays, and their evenings to dig, to haul, to mix, and to lift.',
    'The construction site became a second sanctuary. Volunteers carried sand and gravel by the bucketful, tied rebar in the heat of the sun, and poured concrete late into the night. Meals were shared on wooden planks, and prayers were lifted from scaffolding as the walls of the new church slowly rose.',
    'It is a story written not only in stone and steel, but in calloused hands, sun-burnt shoulders, and the joyful faces of young people who chose to build the house of God with their own strength. Every column, every beam, every tile of the parish church carries this offering — the Bayanihan of the people of San Antonio de Padua.'
  ],
  gallery: [
    {
      src: '/bayanihan-1.jpg',
      alt: 'Volunteers in "One Big Faith" shirts framing the new structure'
    },
    {
      src: '/bayanihan-2.jpg',
      alt: 'Youth volunteers carrying soil and preparing the foundation under the columns'
    },
    {
      src: '/bayanihan-3.jpg',
      alt: 'The parish church rising — cement bags stacked, scaffolding, and parishioners at work'
    },
    {
      src: '/bayanihan-4.jpg',
      alt: 'Interior renovation work below the altar, with the sanctuary already in use above'
    },
    {
      src: '/bayanihan-5.jpg',
      alt: 'Foundation pit with steel rebar prepared by volunteer crews'
    },
    {
      src: '/bayanihan-6.jpg',
      alt: 'A parishioner breaking ground with a pickaxe along the roadside'
    },
    {
      src: '/bayanihan-7.jpg',
      alt: 'Youth volunteers smiling together and clearing rubble inside the church'
    },
    {
      src: '/bayanihan-8.jpg',
      alt: 'Volunteers mixing and pouring concrete during construction'
    }
  ],
  pullQuote:
    '"They came with shovels and rosaries, with sweat and song — and together, brick by brick, they built a house for the Lord."'
},
{
  id: 'milestones',
  title: 'Recent Milestones & Service',
  year: '2018 — Present',
  image:
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1400&q=80',
  caption: 'The parish community in service and celebration.',
  body: [
  'As the parish matured, so too did its commitment to serving the broader community. The parish has responded generously in times of natural disaster, opening its doors as a relief center for neighbors in need, organizing aid, and providing comfort and solidarity to the suffering.',
  'In recent years, the parish has invested in renovations and improvements to its physical spaces, and established new pastoral initiatives — an adoration chapel for perpetual prayer, expanded youth ministry programs, and outreach clinics serving the urban poor of the parish boundaries.',
  'Through these initiatives, San Antonio de Padua continues to be a beacon of faith and service, a place where the Gospel is proclaimed, sacraments are celebrated, and Christ\'s love is made visible in concrete acts of mercy and community care.'],

  pullQuote:
  '"In every challenge and every season, the parish remains a sign of God\'s presence — caring for the lost, feeding the hungry, and walking with all who seek the light of Christ."'
},
{
  id: 'present',
  title: 'Present Parish Life',
  year: 'Today',
  image: "/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg",

  caption: 'The parish church today, Batasan Hills, Quezon City.',
  body: [
  'Today, in 2026, San Antonio de Padua Parish gathers a vibrant community of thousands of families. Masses are offered throughout the week — at dawn and in the evening for the working faithful — and on Sundays in both English and Filipino. The feast of San Antonio de Padua, celebrated on the thirteenth of June, remains the great gathering of the parochial year.',
  'Beyond the liturgy, the parish carries on a wide ministry of formation and outreach: basic ecclesial communities touching every neighborhood; pastoral programs supporting families; counseling and legal aid clinics; a thriving youth ministry; and outreach missions throughout Metro Manila.',
  'As we look toward the future, we are mindful that the history of this parish is not merely a record of buildings and dates, but the living testimony of countless souls who have encountered Christ\'s mercy here and answered His call to holiness and service. To them — and to the One whom they serve — this chronicle is humbly offered.']

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
        subtitle="The story of San Antonio de Padua, told in five movements."
      />
      

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

              {section.gallery && section.gallery.length > 0 &&
              <div className="mb-10">
                  <p className="font-display text-[10px] tracking-[0.4em] uppercase text-gold-dark text-center mb-4">
                    Bayanihan Gallery
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {section.gallery.map((g, gi) =>
                  <motion.div
                    key={gi}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: gi * 0.05 }}
                    className="aspect-[4/5] overflow-hidden border border-brown/15 bg-parchment-light shadow-[0_10px_22px_-12px_rgba(62,42,28,0.4)]">
                          <img
                            src={g.src}
                            alt={g.alt}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
                        </motion.div>
                  )}
                  </div>
                </div>
              }

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