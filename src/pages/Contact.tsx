import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Cross } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { PageHero } from '../components/PageHero';
import { Ornament, Flourish } from '../components/Ornament';
const massSchedule = [
{
  day: 'Sunday',
  times: '6:00 · 8:00 · 10:00 AM · 5:00 PM'
},
{
  day: 'Saturday Anticipated',
  times: '5:00 PM'
},
{
  day: 'Weekdays',
  times: '6:30 AM · 6:00 PM'
},
{
  day: 'Holy Days',
  times: 'As announced'
}];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageLayout>
      <PageHero
        eyebrow="Reach the Parish"
        title="Contact & Visit"
        subtitle="Whether for the sacraments, an inquiry, or simply a quiet visit — our doors are open."
      />
      

      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-20">
          {/* Info */}
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
              Parish Office
            </p>
            <h2
              className="font-display text-2xl md:text-3xl text-brown-dark mb-6"
              style={{
                fontWeight: 600
              }}>
              
              San Antonio de Padua Parish
            </h2>
            <div className="text-gold-dark mb-8">
              <Flourish className="w-20 h-4" />
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-1">
                    Address
                  </p>
                  <p className="font-body text-charcoal leading-relaxed">
                    Batasan Hills
                    <br />
                    Quezon City, Metro Manila 1126
                    <br />
                    Philippines
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-1">
                    Telephone
                  </p>
                  <p className="font-body text-charcoal">+63 (2) 8123 4567</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-1">
                    Email
                  </p>
                  <p className="font-body text-charcoal">
                    parish@sanantoniodepadua.ph
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brown-dark/5 border border-gold/40 flex items-center justify-center text-gold-dark flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-brown/80 mb-1">
                    Office Hours
                  </p>
                  <p className="font-body text-charcoal leading-relaxed">
                    Mon — Fri · 8:00 AM to 5:00 PM
                    <br />
                    Sat · 8:00 AM to 12:00 NN
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Visual + Mass schedule */}
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
            className="space-y-8">
            
            {/* Stylized "map" / facade card */}
            <div className="relative aspect-[4/3] overflow-hidden border-4 border-parchment-light shadow-[0_18px_36px_-14px_rgba(62,42,28,0.35)]">
              <img
                src="/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg"
                alt="San Antonio de Padua Parish facade"
                className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-brown-dark/30" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-parchment-light">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="font-display text-[10px] tracking-[0.3em] uppercase">
                    Batasan Hills · Quezon City
                  </span>
                </div>
                <span className="font-cormorant italic text-sm text-gold/90">
                  View Location
                </span>
              </div>
            </div>

            {/* Mass schedule table */}
            <div className="page-bg p-7 border border-brown/15">
              <div className="flex items-center gap-3 mb-5">
                <Cross className="w-4 h-4 text-gold-dark" strokeWidth={2.2} />
                <p className="font-display text-[11px] tracking-[0.35em] uppercase text-gold-dark">
                  Mass Schedule
                </p>
              </div>
              <ul className="divide-y divide-brown/10">
                {massSchedule.map((m) =>
                <li
                  key={m.day}
                  className="py-3 flex items-baseline justify-between gap-4">
                  
                    <span className="font-display text-sm text-brown-dark tracking-wide">
                      {m.day}
                    </span>
                    <span className="font-cormorant italic text-charcoal text-right">
                      {m.times}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Contact form */}
        <div className="text-gold flex justify-center mb-10">
          <Ornament className="w-40 h-5" />
        </div>

        <motion.div
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
            amount: 0.3
          }}
          transition={{
            duration: 0.7
          }}
          className="max-w-2xl mx-auto text-center">
          
          <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold-dark mb-3">
            Send a Message
          </p>
          <h2
            className="font-display text-3xl md:text-4xl text-brown-dark mb-4"
            style={{
              fontWeight: 600
            }}>
            
            Write to the Parish
          </h2>
          <p className="font-cormorant italic text-charcoal/90 mb-10">
            For sacramental requests, parish ministry inquiries, or general
            correspondence.
          </p>

          {submitted ?
          <div className="page-bg border border-gold/40 p-10 text-center">
              <Cross className="w-6 h-6 text-gold-dark mx-auto mb-3" />
              <h3
              className="font-display text-2xl text-brown-dark mb-2"
              style={{
                fontWeight: 600
              }}>
              
                Thank you
              </h3>
              <p className="font-cormorant italic text-charcoal">
                Your message has been received. The parish office will respond
                shortly.
              </p>
            </div> :

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="page-bg border border-brown/15 p-7 md:p-10 text-left space-y-5">
            
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" id="name" required />
                <Field label="Email" id="email" type="email" required />
              </div>
              <Field label="Subject" id="subject" required />
              <Field label="Message" id="message" textarea required />

              <div className="pt-2">
                <button
                type="submit"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-brown-dark border border-gold/60 text-parchment-light font-display tracking-[0.25em] text-xs uppercase hover:bg-brown transition-colors">
                
                  <Send className="w-4 h-4 text-gold" />
                  Send Message
                </button>
              </div>
            </form>
          }
        </motion.div>
      </section>
    </PageLayout>);

}
interface FieldProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}
function Field({ label, id, type = 'text', required, textarea }: FieldProps) {
  const cls =
  'w-full bg-parchment/60 border border-brown/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 px-4 py-3 font-body text-charcoal placeholder:text-brown/40 transition-colors';
  return (
    <label htmlFor={id} className="block">
      <span className="block font-display text-[10px] tracking-[0.3em] uppercase text-brown/85 mb-2">
        {label}
      </span>
      {textarea ?
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        className={cls} /> :


      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className={cls} />

      }
    </label>);

}