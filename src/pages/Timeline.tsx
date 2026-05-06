import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Ornament } from '../components/Ornament';
const events = [
{
  year: '1952',
  title: 'Erection of the Parish',
  desc: 'The Archdiocese of Manila formally erects San Antonio de Padua Parish, with the first Mass celebrated in a wooden chapel by the founding pastor.',
  image:
  'https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=900&q=80'
},
{
  year: '1958',
  title: 'First Parish School',
  desc: 'A small catechetical school opens beside the chapel, educating the first generation of children in the parish in the Christian doctrine.'
},
{
  year: '1965',
  title: 'Groundbreaking of the Church',
  desc: 'After more than a decade of fundraising, ground is broken for a permanent church to replace the original chapel, with the cornerstone blessed by the Archbishop.',
  image:
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80'
},
{
  year: '1968',
  title: 'Solemn Blessing of the Church',
  desc: 'The completed church is solemnly dedicated. Hundreds walk in procession from the old chapel to the new sanctuary carrying the image of San Antonio.'
},
{
  year: '1977',
  title: 'Silver Jubilee',
  desc: 'The parish celebrates twenty-five years of life with a thanksgiving Mass, a fluvial procession, and the planting of memorial trees in the churchyard.'
},
{
  year: '1990',
  title: 'Earthquake Relief',
  desc: 'In the wake of the Luzon earthquake, the parish hall is converted into a relief center, organizing aid for the affected provinces of Central Luzon.'
},
{
  year: '2002',
  title: 'Golden Jubilee',
  desc: 'A year of festivities marks fifty years of grace. A commemorative volume is published, gathering the recollections of long-time parishioners.',
  image:
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=900&q=80'
},
{
  year: '2008',
  title: 'Restoration and Adoration Chapel',
  desc: 'A major renovation restores the roof and narra interiors. A new perpetual adoration chapel is consecrated beside the sanctuary.'
},
{
  year: '2020',
  title: 'A Year Without Public Worship',
  desc: 'During the global pandemic, the parish broadcasts daily Mass online and organizes drive-through communion, sustaining the community in unprecedented times.'
},
{
  year: 'Today',
  title: 'A Living Heritage',
  desc: 'Now serving more than ten thousand registered families, the parish continues its mission of worship, formation, and outreach in the heart of Quezon City.',
  image:
  'https://images.unsplash.com/photo-1490127252417-7c393f993ee4?auto=format&fit=crop&w=900&q=80'
}];

export function Timeline() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Through the Years"
        title="Timeline of Events"
        subtitle="Seventy years of faith, walked one milestone at a time."
        crumbs={[
        {
          label: 'Home',
          to: '/'
        },
        {
          label: 'Timeline'
        }]
        } />
      

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