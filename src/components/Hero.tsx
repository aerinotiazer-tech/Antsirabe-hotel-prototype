import React, { useState } from 'react';
import { MessageCircle, Calendar, Users, ArrowRight, ShieldCheck, Check, Sparkles, MapPin } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { ScrollReactiveShowcase } from './ScrollReactiveShowcase';

export const Hero: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const whatsAppUrl = createWhatsAppUrl({
    checkInDate: checkIn || undefined,
    checkOutDate: checkOut || undefined,
    guestsCount: guests
  });

  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
      {/* Subtle organic background gradient accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#C28251]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -z-10 w-80 h-80 bg-[#5A6B5C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition & Short Path to WhatsApp */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context Badge with Confirmed Address */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DD] border border-[#DDD3C6] text-xs font-medium text-[#4A3B32]">
              <span className="w-2 h-2 rounded-full bg-[#1F7A44]"></span>
              <span className="font-semibold">{HOTEL_CONTACT.neighborhood}</span>
              <span className="text-[#8C7A6D]">•</span>
              <span>Antsirabe, Madagascar</span>
              <span className="text-[#8C7A6D] text-[10px] hidden sm:inline">• Contact direct WhatsApp</span>
            </div>

            {/* Proposed Main Headline */}
            <div className="space-y-2">
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1E16] leading-[1.15]">
                Votre séjour à Antsirabe commence ici
              </h1>
              <p className="text-xs text-[#8C7A6D] italic">
                (Proposition éditoriale pour la maquette — à valider par l’établissement)
              </p>
            </div>

            {/* Concise Pitch */}
            <p className="text-base sm:text-lg text-[#5A4B40] leading-relaxed max-w-2xl">
              Faites l'expérience d'une halte reposante à Antsirabe, dans le secteur paisible de <strong>Mahazoarivo Nord</strong>. 
              Chambres spacieuses avec parquets en bois franc de Madagascar, calme préservé et accueil convivial Chez DEO. 
              Pour vos dates, contactez directement l'équipe sans intermédiaire.
            </p>

            {/* Quick Action Block: WhatsApp Direct Booking Inquiries */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0EAE1]">
                <div>
                  <h3 className="text-sm font-semibold text-[#2B1E16]">
                    Préparer votre demande de disponibilité
                  </h3>
                  <p className="text-xs text-[#7A6B60]">
                    Sélecteur indicatif — transmet directement vos dates sur WhatsApp
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1F7A44] bg-[#E8F5E9] px-2.5 py-1 rounded-md">
                  <Check className="w-3 h-3" /> Réponse rapide
                </span>
              </div>

              {/* Date & Guest Input Helper (Client-side only, no fake server form) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="hero-checkin" className="block text-[11px] font-semibold text-[#5A4B40] mb-1">
                    Arrivée souhaitée
                  </label>
                  <div className="relative">
                    <input
                      id="hero-checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#DDD3C6] bg-[#FAF7F2] text-[#2B1E16] focus:outline-none focus:ring-2 focus:ring-[#1F7A44]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-checkout" className="block text-[11px] font-semibold text-[#5A4B40] mb-1">
                    Départ souhaité
                  </label>
                  <div className="relative">
                    <input
                      id="hero-checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#DDD3C6] bg-[#FAF7F2] text-[#2B1E16] focus:outline-none focus:ring-2 focus:ring-[#1F7A44]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-guests" className="block text-[11px] font-semibold text-[#5A4B40] mb-1">
                    Voyageurs
                  </label>
                  <select
                    id="hero-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#DDD3C6] bg-[#FAF7F2] text-[#2B1E16] focus:outline-none focus:ring-2 focus:ring-[#1F7A44]"
                  >
                    <option value={1}>1 voyageur (Solo)</option>
                    <option value={2}>2 voyageurs (Couple)</option>
                    <option value={3}>3 voyageurs (Triple)</option>
                    <option value={4}>4 voyageurs (Famille)</option>
                    <option value={5}>5+ voyageurs (Groupe)</option>
                  </select>
                </div>
              </div>

              {/* Main Call to Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Demander les disponibilités sur WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href="#chambres"
                  className="px-5 py-3.5 rounded-xl border border-[#DDD3C6] hover:bg-[#F5EFE6] text-[#4A3B32] font-semibold text-xs tracking-wider uppercase text-center transition-colors"
                >
                  Voir les chambres
                </a>
              </div>

              {/* Trust & Transparency Note */}
              <p className="text-[11px] text-[#7A6B60] flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A6B5C] shrink-0" />
                <span>
                  Numéro vérifié : <strong>{HOTEL_CONTACT.phoneDisplay}</strong> • Adresse : <strong>{HOTEL_CONTACT.address}</strong>
                </span>
              </p>
            </div>

            {/* Quick Micro-Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-xs font-bold text-[#2B1E16]">Mahazoarivo Nord</div>
                <div className="text-[11px] text-[#7A6B60]">Secteur calme</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-xs font-bold text-[#2B1E16]">Chez DEO</div>
                <div className="text-[11px] text-[#7A6B60]">Accueil convivial</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-xs font-bold text-[#2B1E16]">WhatsApp Direct</div>
                <div className="text-[11px] text-[#7A6B60]">Sans intermédiaire</div>
              </div>
            </div>

          </div>

          {/* Right Column: Scroll-Reactive Visual Showcase (Replacing 3D) */}
          <div className="lg:col-span-5 space-y-3">
            <ScrollReactiveShowcase />
          </div>

        </div>
      </div>
    </section>
  );
};
