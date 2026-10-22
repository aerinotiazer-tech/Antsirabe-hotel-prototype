import React from 'react';
import { MessageCircle, Mail, Instagram, ExternalLink, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
            <Phone className="w-3.5 h-3.5 text-[#B55F38]" />
            <span>Contact Direct & Liens Officiels</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
            Échanger directement avec l'établissement
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D52] leading-relaxed">
            Pour réserver, demander un devis selon vos dates ou poser une question sur votre séjour, 
            privilégiez le contact direct par WhatsApp ou par email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Primary Channel: WhatsApp Direct Card */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#1F7A44]/10 via-[#FAF7F2] to-white border-2 border-[#1F7A44]/30 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F7A44] text-white text-xs font-bold uppercase tracking-wider">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Canal Recommandé
                </span>
                <span className="text-xs text-[#5A6B5C] font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Réponse sans intermédiaire
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#2B1E16]">
                  Réservation & Disponibilités WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4B40] mt-1 leading-relaxed">
                  Envoyez un message pour connaître immédiatement les disponibilités et les tarifs adaptés à votre période de passage à Antsirabe.
                </p>
              </div>

              {/* Number presentation */}
              <div className="p-4 rounded-xl bg-white border border-[#DDD3C6] space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B60]">
                  Numéro vérifié (Linktree officiel) :
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#1F7A44] tracking-wide font-mono">
                  {HOTEL_CONTACT.phoneDisplay}
                </div>
                <div className="text-[11px] text-[#7A6B60]">
                  Antsirabe, Madagascar (indicatif international +261)
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-xs text-[#6E5D52] italic">
                « Bonjour, je souhaite connaître les disponibilités et les tarifs d’Antsirabe Hôtel — Chez DEO. Pourriez-vous m’indiquer les options pour mes dates ? »
              </div>
            </div>

            <div className="pt-6">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Ouvrir la conversation WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Secondary & Official Links Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-editorial text-lg font-bold text-[#2B1E16]">
                Autres liens officiels vérifiés
              </h3>
              <p className="text-xs text-[#6E5D52] leading-relaxed">
                Retrouvez l’ensemble des points de contact publics répertoriés pour Antsirabe Hôtel — Chez DEO.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${HOTEL_CONTACT.email}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DFD3] hover:border-[#B55F38] group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#B55F38] group-hover:bg-[#B55F38] group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2B1E16]">Email officiel</div>
                      <div className="text-[11px] text-[#7A6B60]">{HOTEL_CONTACT.email}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#8C7A6D] group-hover:text-[#B55F38] transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href={HOTEL_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DFD3] hover:border-[#B55F38] group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2B1E16]">Page Instagram</div>
                      <div className="text-[11px] text-[#7A6B60]">@antsirabehotel</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#8C7A6D] group-hover:text-[#B55F38] transition-colors" />
                </a>

                {/* Linktree */}
                <a
                  href={HOTEL_CONTACT.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8DFD3] hover:border-[#B55F38] group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#43E660] group-hover:bg-[#43E660] group-hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4 text-[#2B1E16]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2B1E16]">Portail Linktree</div>
                      <div className="text-[11px] text-[#7A6B60]">linktr.ee/antsirabehotel</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#8C7A6D] group-hover:text-[#B55F38] transition-colors" />
                </a>
              </div>
            </div>

            {/* Note about absence of personal domain */}
            <div className="p-3.5 rounded-xl bg-[#EFE8DD] text-[11px] text-[#6E5D52] leading-relaxed">
              <strong className="text-[#2B1E16]">À propos du domaine web : </strong>
              L'établissement utilise actuellement Linktree pour centraliser ses liens officiels. 
              Cette proposition a vocation à devenir la vitrine officielle de l'hôtel.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
