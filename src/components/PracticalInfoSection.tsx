import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle, Clock, CreditCard, ShieldCheck, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const PracticalInfoSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const factsTable = [
    {
      label: "Nom de l'établissement",
      value: "Antsirabe Hôtel — Chez DEO",
      status: "Confirmé (Source officielle)"
    },
    {
      label: "Localisation",
      value: "Antsirabe, Madagascar (Hauts-Plateaux)",
      status: "Confirmé (Adresse précise sur WhatsApp)"
    },
    {
      label: "Contact WhatsApp",
      value: "+261 34 66 350 74",
      status: "Confirmé (Lien officiel Linktree)"
    },
    {
      label: "Email de contact",
      value: "antsirabehotel@gmail.com",
      status: "Confirmé (Canal public officiel)"
    },
    {
      label: "Tarifs des nuitées",
      value: "À confirmer par l’établissement",
      status: "Sur demande directe WhatsApp"
    },
    {
      label: "Heures d'arrivée / départ",
      value: "À confirmer par l’établissement",
      status: "À convenir selon vos horaires de trajet"
    },
    {
      label: "Modes de règlement acceptés",
      value: "À confirmer par l’établissement (sur place / mobile money)",
      status: "Aucun paiement en ligne sur ce site"
    },
    {
      label: "Restauration & Petit-déjeuner",
      value: "À confirmer par l’établissement",
      status: "Précisions disponibles par message"
    }
  ];

  const faqs = [
    {
      q: "Comment réserver une chambre ou vérifier les disponibilités ?",
      a: "La réservation s’effectue sans intermédiaire en contactant l'équipe directement par WhatsApp (+261 34 66 350 74) ou par email. Indiquez simplement vos dates d’arrivée et de départ souhaitées, ainsi que le nombre de personnes."
    },
    {
      q: "Quels sont les tarifs par nuitée ?",
      a: "Les tarifs ne sont pas fixés sur cette maquette car ils dépendent de la saisonnalité, de la durée du séjour et du type de chambre sélectionné. Ils vous seront communiqués instantanément par WhatsApp par l'hôte."
    },
    {
      q: "Comment obtenir l'adresse exacte et l'itinéraire d'accès ?",
      a: "Pour garantir une arrivée sereine à Antsirabe (en provenance de la capitale ou du Sud), l'hôte vous transmet les coordonnées et les repères routiers les plus simples dès votre prise de contact."
    },
    {
      q: "Y a-t-il un paiement sécurisé ou des arrhes à verser en ligne ?",
      a: "Non. Ce site est un espace de présentation et de contact direct. Aucun paiement, ni carte bancaire, ni transaction n'est effectué en ligne. Les modalités de confirmation ou de règlement sont convenues de gré à gré avec l’établissement."
    },
    {
      q: "Puis-je séjourner en groupe ou en famille ?",
      a: "Oui, les chambres visibles disposent de plusieurs agencements (jusqu’à trois couchages par pièce). Précisez la composition de votre groupe dans votre message pour que l'hôte vous réserve la solution la plus spacieuse."
    }
  ];

  return (
    <section id="infos" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
            <HelpCircle className="w-3.5 h-3.5 text-[#B55F38]" />
            <span>Transparence & Informations</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
            Informations pratiques & Questions fréquentes
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D52] leading-relaxed">
            Pour vous éviter des questions répétitives et vous offrir une visibilité immédiate, voici la synthèse 
            des éléments confirmés et de ceux à valider directement avec l'hôte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Facts Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DFD3] overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E8DFD3] flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#2B1E16]">
                    Tableau de synthèse de l'établissement
                  </h3>
                  <p className="text-xs text-[#7A6B60]">
                    Séparation stricte : faits vérifiés vs données à confirmer
                  </p>
                </div>
                <span className="text-[11px] font-medium text-[#5A6B5C] bg-[#EAF2EB] px-2.5 py-1 rounded-full">
                  Vérifié 22/10/2026
                </span>
              </div>

              <div className="divide-y divide-[#F0EAE1] text-xs">
                {factsTable.map((row, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-[#FAF7F2]/60 transition-colors">
                    <span className="font-medium text-[#7A6B60]">
                      {row.label}
                    </span>
                    <div className="text-right sm:text-right flex flex-col items-start sm:items-end">
                      <span className="font-semibold text-[#2B1E16]">
                        {row.value}
                      </span>
                      <span className="text-[10px] text-[#B55F38]">
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Respectful Note on Google Review without fake score or quotes */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2B1E16]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Retours & Avis clients</span>
              </div>
              <p className="text-xs text-[#6E5D52] leading-relaxed">
                Une communication récente de l'établissement a remercié chaleureusement ses visiteurs pour un retour 5 étoiles sur Google. 
                Conformément à notre charte de déontologie, aucun score global moyen ni témoignage inventé n'est affiché ici. 
                Pour partager votre impression après séjour ou poser des questions, contactez directement l'équipe.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-editorial text-base font-bold text-[#2B1E16] mb-2">
              Foire aux questions utiles
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div 
                    key={idx}
                    className="rounded-xl bg-white border border-[#E8DFD3] overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[#2B1E16] hover:bg-[#FAF7F2] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#7A6B60] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#5A4B40] leading-relaxed border-t border-[#F0EAE1] bg-[#FAF7F2]/50 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Quick WhatsApp Helper */}
            <div className="p-5 rounded-2xl bg-[#2B1E16] text-[#FAF7F2] space-y-3 mt-6">
              <h4 className="font-editorial text-sm font-bold text-[#EFE8DD]">
                Une autre question en tête ?
              </h4>
              <p className="text-xs text-[#D9CFC4] leading-relaxed">
                L’équipe d'Antsirabe Hôtel — Chez DEO répond rapidement sur WhatsApp pour toute précision sur votre trajet, vos bagages ou la météo locale.
              </p>
              <a
                href={createWhatsAppUrl({ customNote: "Bonjour, j'ai une question pratique avant de préparer mon séjour." })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white text-xs font-semibold tracking-wide transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Poser ma question sur WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
