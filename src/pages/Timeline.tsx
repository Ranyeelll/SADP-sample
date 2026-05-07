import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Ornament } from '../components/Ornament';
const events = [
{
  year: '2011',
  title: 'Erection of the Parish',
  desc: 'The Archdiocese of Manila formally erects San Antonio de Padua Parish. The first Mass is celebrated in a modest chapel by the founding pastor.',
  image:
  '/founding-of-parish.jpg'
},
{
  year: '2012',
  title: 'Formation of Parish Organizations',
  desc: 'Parish lay ministries and pastoral councils are established. Prayer groups and Bible study circles begin meeting in homes throughout Batasan.'
},
{
  year: '2014',
  title: 'Expansion of Catechetical Programs',
  desc: 'The parish launches comprehensive religious education programs for children and adults, deepening faith formation in the community.'
},
{
  year: '2016',
  title: 'Establishment of Youth Ministry',
  desc: 'A dedicated youth ministry is launched, empowering young people to lead retreats and outreach missions across Metro Manila.'
},
{
  year: '2018',
  title: 'Opening of Adoration Chapel',
  desc: 'A perpetual adoration chapel is consecrated, providing a sacred space for contemplative prayer and intimate encounter with Christ.'
},
{
  year: '2019',
  title: 'Community Outreach Initiatives',
  desc: 'The parish establishes counseling, legal aid, and feeding programs serving the urban poor and marginalized in the parish boundaries.'
},
{
  year: '2020',
  title: 'Pandemic Ministry',
  desc: 'During the global pandemic, the parish broadcasts daily Mass online and organizes safe communion services, sustaining the community through unprecedented times.'
},
{
  year: '2023',
  title: 'Parish Renovations',
  desc: 'Major renovations and improvements to the church facilities are completed, enhancing the beauty and functionality of sacred spaces.'
},
{
  year: '2026',
  title: 'A Thriving Heritage',
  desc: 'Now serving thousands of faithful families, San Antonio de Padua Parish continues its mission of worship, formation, and compassionate service in Batasan Hills, Quezon City.',
  image:
  'https://images.unsplash.com/photo-1490127252417-7c393f993ee4?auto=format&fit=crop&w=900&q=80'
}];

export function Timeline() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Through the Years"
        title="Timeline of Events"
        subtitle="From 2011 to the present — milestones of faith and service."
      />
      

      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-24">
        <div className="relative">
          {/* Center spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {events.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={e.year + e.title}
                  initial={{
                    opacity: 0,
                    y: 30
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3
                  }}
                  transition={{
                    duration: 0.7
                  }}
                  className={`relative grid md:grid-cols-2 md:gap-12 items-center ${isLeft ? '' : 'md:[&>*:first-child]:order-2'}`}>
                  
                  {/* Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gold border-2 border-parchment shadow-[0_0_0_4px_rgba(200,164,93,0.2)]" />
                  </div>

                  {/* Card side */}
                  <div
                    className={`pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    
                    <div className="page-bg p-6 md:p-8 border border-brown/15 shadow-[0_14px_28px_-14px_rgba(62,42,28,0.3)]">
                      <p
                        className="font-display text-3xl md:text-4xl text-gold-dark mb-2"
                        style={{
                          fontWeight: 600
                        }}>
                        
                        {e.year}
                      </p>
                      <h3
                        className="font-display text-xl text-brown-dark mb-3"
                        style={{
                          fontWeight: 600
                        }}>
                        
                        {e.title}
                      </h3>
                      <p className="font-body text-[1.05rem] text-charcoal leading-relaxed">
                        {e.desc}
                      </p>
                    </div>
                  </div>

                  {/* Image side (desktop only when image exists) */}
                  <div
                    className={`hidden md:block ${isLeft ? '' : 'md:text-right'}`}>
                    
                    {e.image &&
                    <div
                      className={`aspect-[4/3] overflow-hidden border-4 border-parchment-light shadow-[0_14px_28px_-14px_rgba(62,42,28,0.3)] ${isLeft ? 'md:ml-12' : 'md:mr-12'}`}>
                      
                        <img
                        src={e.image}
                        alt={e.title}
                        className="w-full h-full object-cover" />
                      
                      </div>
                    }
                  </div>
                </motion.div>);

            })}
          </div>
        </div>

        <div className="text-gold mt-20 flex justify-center">
          <Ornament className="w-44 h-5" />
        </div>
        <p className="text-center font-cormorant italic text-brown/80 mt-4">
          "And the story continues, one Sunday at a time."
        </p>
      </div>
    </PageLayout>);

}