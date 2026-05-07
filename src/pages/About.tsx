import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Lightbulb } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Flourish } from '../components/Ornament';

export function About() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Know Us"
        title="About Our Parish"
        subtitle="A community rooted in faith, led by compassionate shepherds."
      />

      {/* Established year banner */}
      {(() => {
        const establishedYear = 2011;
        const parishAge = new Date().getFullYear() - establishedYear;
        return (
          <div className="max-w-6xl mx-auto px-6 md:px-8 mt-6 mb-10 text-center">
            <p className="font-display text-[11px] tracking-[0.25em] uppercase text-brown/70">
              Established {establishedYear} · {parishAge} {parishAge === 1 ? 'year' : 'years'} as a Parish
            </p>
            <p className="font-body text-sm text-brown/60 mt-2">
              Note: the parish was canonically erected by Decree 2011-276 on 13 June 2011 by Most Rev. Antonio R. Tobias, DD, for the Diocese of Novaliches. Fiesta materials may reference the "15th" celebration.
            </p>
          </div>
        );
      })()}

      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-20">
          <motion.div
            initial={{
              opacity: 0,
              x: -16
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.7
            }}
            className="page-bg p-8 md:p-10 border border-brown/15">
            <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
              Our Identity
            </p>
            <h2
              className="font-display text-2xl md:text-3xl text-brown-dark mb-6"
              style={{
                fontWeight: 600
              }}>
              Mission & Vision
            </h2>
            <div className="text-gold-dark mb-8">
              <Flourish className="w-20 h-4" />
            </div>
            <div className="space-y-5">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-2">
                  Our Mission
                </p>
                <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                  To be a welcoming community of faith where the Gospel is proclaimed, sacraments are celebrated, and all are invited to encounter the living Christ and grow in holiness.
                </p>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-2">
                  Our Vision
                </p>
                <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                  A parish alive in the Spirit, marked by authentic prayer, joyful service, and a profound commitment to the poor and marginalized of our community.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 16
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.7
            }}
            className="space-y-6">
            {[
              {
                icon: Heart,
                title: 'Rooted in Faith',
                desc: 'We gather each week to worship, receive the sacraments, and strengthen our bonds as the body of Christ.'
              },
              {
                icon: Users,
                title: 'Community First',
                desc: 'Our parish is a family united by love of Christ and commitment to one another through joy and sorrow.'
              },
              {
                icon: Lightbulb,
                title: 'Formation & Growth',
                desc: 'We invest in the spiritual development of our members through prayer groups, Bible studies, and pastoral care.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 16
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15
                }}
                className="page-bg p-6 border border-brown/15 flex gap-4">
                <div className="w-9 h-9 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark flex-shrink-0 mt-1">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-[11px] tracking-[0.3em] uppercase text-brown-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="font-cormorant italic text-charcoal text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Parish Leadership */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.7
          }}
          className="py-16 border-t border-b border-brown/15">
          <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
            Parish Leadership
          </p>
          <h2
            className="font-display text-3xl md:text-4xl text-brown-dark mb-4"
            style={{
              fontWeight: 600
            }}>
            Meet Our Parish Priest
          </h2>
          <div className="text-gold-dark mb-12">
            <Flourish className="w-20 h-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8
              }}
              className="relative aspect-[3/4] overflow-hidden border-4 border-parchment-light shadow-[0_18px_36px_-14px_rgba(62,42,28,0.35)]">
              <img
                src="/roro-vasquez.jpg"
                alt="Rev. Fr. Rodrigo O. Vasquez"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-[12px] tracking-[0.3em] uppercase text-parchment-light">
                  Presiding Shepherd
                </p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{
                opacity: 0,
                x: 16
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.7,
                delay: 0.2
              }}
              className="space-y-6">
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-brown-dark mb-2" style={{ fontWeight: 600 }}>
                  Rev. Fr. Rodrigo O. Vasquez
                </h3>
                <p className="font-cormorant italic text-lg text-gold-dark mb-4">
                  Parish Priest, San Antonio de Padua Parish
                </p>
                <div className="text-gold-dark mb-4">
                  <Flourish className="w-12 h-3" />
                </div>
              </div>

              <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                Rev. Fr. Rodrigo "Roro" O. Vasquez has devoted his life to shepherding our parish community with compassion, wisdom, and deep pastoral care. Known affectionately as "Roro" by parishioners of all ages, Fr. Rodrigo brings warmth and spiritual depth to every aspect of our parish life.
              </p>

              <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                His ministry is characterized by a profound commitment to celebrating the sacraments with reverence, preaching the Gospel with clarity, and accompanying the faithful through all the seasons of their lives. Whether in the confessional, at the bedside of the sick, or leading our community in prayer, Fr. Rodrigo embodies the heart of a true shepherd.
              </p>

              <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                Under his guidance, our parish continues to grow in holiness and service, reaching out to the poor, strengthening families, and fostering a spirit of genuine Christian community. He welcomes all to encounter Christ's mercy and grace through the life and sacraments of our parish.
              </p>

              <div className="pt-4 border-t border-brown/15">
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-3">
                  How to Connect
                </p>
                <p className="font-body text-charcoal mb-1">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-brown-dark">Confessions:</span> By appointment or during scheduled times
                </p>
                <p className="font-body text-charcoal">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-brown-dark">Visits:</span> Contact the parish office to arrange a meeting
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Parish Projects */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.7
          }}
          className="py-16 border-t border-b border-brown/15">
          <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
            Parish Projects
          </p>
          <h2
            className="font-display text-3xl md:text-4xl text-brown-dark mb-4"
            style={{
              fontWeight: 600
            }}>
            Tinapay de San Antonio
          </h2>
          <div className="text-gold-dark mb-8">
            <Flourish className="w-20 h-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] overflow-hidden border-4 border-parchment-light shadow-[0_18px_36px_-14px_rgba(62,42,28,0.35)]">
              <img
                src="/tinapay-project.jpg"
                alt="Tinapay de San Antonio - parish bakery project"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-2">Livelihood Project</p>
              <h3 className="font-display text-2xl text-brown-dark mb-2" style={{ fontWeight: 600 }}>
                Delicious, Hot and Freshly-Baked
              </h3>
              <p className="font-cormorant italic text-charcoal leading-relaxed text-lg">
                "Tinapay de San Antonio" is a parish-run bakery project that provides freshly baked bread to the community and supports our outreach programs. Available every Tuesdays and Fridays — contact the parish office to order or volunteer.
              </p>

              <ul className="font-body text-charcoal list-disc pl-5">
                <li>Availability: Tuesdays and Fridays</li>
                <li>Orders & inquiries: parish office / see Contact page</li>
                <li>Proceeds support parish outreach and formation programs</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </section>
    </PageLayout>
  );
}
