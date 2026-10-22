import React, { useState } from 'react';
import { MapPin, Navigation, MessageCircle, AlertTriangle, ExternalLink, Compass, Bus, Info } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createLocationInquiryUrl } from '../utils/whatsapp';

export const MapSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'carte' | 'reperes'>('carte');

  const cityLandmarks = [
    {
      name: "Gare ferroviaire d’Antsirabe",
      desc: "Édifice colonial emblématique au bout de l'Avenue de l'Indépendance",
      type: "Monument & repère urbain"
    },
    {
      name: "Centre thermal d’Antsirabe (Ranovisy)",
      desc: "Sources thermo-minérales historiques de la « Ville d'Eau »",
      type: "Activité thermale"
    },
    {
      name: "Avenue de l’Indépendance",
      desc: "Grande artère arborée, circulation des pousse-pousse traditionnels",
      type: "Axe principal"
    },
    {
      name: "Lac Andraikiba",
      desc: "Lac volcanique situé à quelques kilomètres à l'ouest du centre",
      type: "Excursion naturelle"
    }
  ];

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
            <MapPin className="w-3.5 h-3.5 text-[#B55F38]" />
            <span>Localisation & Orientation</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
            Trouver l'établissement à Antsirabe
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D52] leading-relaxed">
            Antsirabe, troisième plus grande ville de Madagascar et réputée pour son climat tempéré d’altitude, 
            ses ateliers artisanaux et ses pousse-pousse.
          </p>

          {/* Strict factual disclaimer badge */}
          <div className="p-4 rounded-xl bg-[#FBF3EB] border border-[#ECD1BF] text-xs text-[#7A4B29] flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#B55F38] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#5A3114]">
                Précision déontologique sur l'adresse :
              </p>
              <p>
                L'adresse postale exacte n'étant pas renseignée dans les documents officiels publics, 
                aucune épingle GPS arbitraire n'est inventée ici. 
                L'itinéraire précis et les repères d'arrivée sont <strong>transmis directement par l'hôte sur WhatsApp</strong> lors de votre demande.
              </p>
            </div>
          </div>
        </div>

        {/* Map & Orientation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Map Container */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E8DFD3] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E8DFD3] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B55F38]" />
                <span className="text-xs font-bold text-[#2B1E16]">
                  Carte générale de la ville d’Antsirabe
                </span>
                <span className="text-[11px] text-[#7A6B60] hidden sm:inline">
                  (Vakinankaratra, Madagascar)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps/place/Antsirabe,+Madagascar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-white border border-[#DDD3C6] text-[#4A3B32] hover:bg-[#EFE8DD] transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-[#B55F38]" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded OpenStreetMap View of Antsirabe */}
            <div className="relative w-full h-[380px] sm:h-[450px] bg-[#E8DFD3]">
              <iframe
                title="Carte OpenStreetMap d'Antsirabe"
                className="w-full h-full border-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=47.0000%2C-19.8850%2C47.0600%2C-19.8450&amp;layer=mapnik"
                loading="lazy"
              />

              {/* Map Floating Guidance Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-white/95 backdrop-blur-xs border border-[#E8DFD3] shadow-lg text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#2B1E16]">
                  <MapPin className="w-4 h-4 text-[#1F7A44]" />
                  <span>Antsirabe Hôtel — Chez DEO</span>
                </div>
                <p className="text-[#6E5D52] text-[11px] leading-relaxed">
                  Localisation confirmée à Antsirabe. Pour obtenir les indications exactes (nom de rue, quartier, repère visible ou accueil à la gare routière) :
                </p>
                <a
                  href={createLocationInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#1F7A44] hover:bg-[#196538] text-white font-medium text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Demander l'itinéraire sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: City Highlights & Practical Arrival Tips */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Direct Location Inquiry Card */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C6] space-y-4">
              <h3 className="font-editorial text-base font-bold text-[#2B1E16] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#B55F38]" />
                <span>Repères d'accès à confirmer</span>
              </h3>
              <p className="text-xs text-[#6E5D52] leading-relaxed">
                Antsirabe se situe à environ 170 km au sud de la capitale Antananarivo via la RN7. 
                Les arrivées se font généralement par véhicule particulier, taxi-brousse régional ou navette touristique.
              </p>

              <div className="pt-2 border-t border-[#E8DFD3] space-y-3">
                <div className="text-[11px] font-semibold text-[#4A3B32] uppercase tracking-wider">
                  Repères urbains à proximité :
                </div>

                <div className="space-y-2.5">
                  {cityLandmarks.map((lm, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#E8DFD3] text-xs">
                      <div className="font-semibold text-[#2B1E16] flex items-center justify-between">
                        <span>{lm.name}</span>
                        <span className="text-[10px] text-[#8C7A6D] bg-[#F5EFE6] px-1.5 py-0.5 rounded">
                          {lm.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6E5D52] mt-0.5">
                        {lm.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <a
                  href={createLocationInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B1E16] hover:bg-[#4A3B32] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Contacter l'hôte pour l'arrivée</span>
                </a>
              </div>
            </div>

            {/* Quick Note about Antsirabe */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] text-xs space-y-1.5">
              <div className="font-semibold text-[#2B1E16] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#5A6B5C]" />
                <span>Bon à savoir pour votre séjour</span>
              </div>
              <p className="text-[11px] text-[#6E5D52] leading-relaxed">
                À ~1 500 m d'altitude, les nuits peuvent être fraîches à Antsirabe, en particulier pendant l'hiver austral (mai à septembre). 
                Prévoyez une laine pour vos soirées.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
