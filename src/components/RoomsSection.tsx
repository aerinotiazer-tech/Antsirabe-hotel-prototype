import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, AlertCircle, Info, ExternalLink, BedDouble, Bath, Maximize2 } from 'lucide-react';
import { RoomItem } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'room-1',
    name: 'Chambre avec Lit Double & Bureau',
    shortDesc: 'Espace chaleureux avec plancher en bois franc ciré, grand lit double avec habillage floral et coin bureau.',
    visualDetails: [
      'Grand lit double habillé',
      'Parquet en bois ciré traditionnel',
      'Bureau de travail & chaise en bois',
      'Porte-manteau / valet en bois',
      'Accès direct vers la salle d’eau privative'
    ],
    imageSrc: '/images/antsirabe/room-warm-yellow-desk.jpeg',
    imageAlt: 'Vue de la chambre aux murs jaunes avec parquet en bois, lit double et bureau en bois',
    priceNote: 'Tarif à confirmer par l’établissement',
    statusBadge: 'Détails à confirmer par l’établissement'
  },
  {
    id: 'room-2',
    name: 'Chambre Confort (Grand Lit & Lit Simple)',
    shortDesc: 'Configuration modulable avec deux couchages distincts dans un cadre aux murs bleus apaisants.',
    visualDetails: [
      '1 lit double + 1 lit simple séparé',
      'Parquet en bois franc verni',
      'Fenêtre avec voilage et doubles rideaux',
      'Tables de chevet et étagères murales',
      'Ouverture vers salle d’eau privative'
    ],
    imageSrc: '/images/antsirabe/room-blue-double-single.jpeg',
    imageAlt: 'Chambre aux murs bleus avec un lit double et un lit simple sur plancher bois',
    priceNote: 'Tarif à confirmer par l’établissement',
    statusBadge: 'Détails à confirmer par l’établissement'
  },
  {
    id: 'room-3',
    name: 'Grande Chambre Multi-Couchages',
    shortDesc: 'Vaste pièce lumineuse avec triple couchage, idéale pour les séjours en famille ou entre compagnons de route.',
    visualDetails: [
      'Disposition avec trois couchages confortables',
      'Très grand volume avec plancher lustré',
      'Plusieurs fenêtres avec double vitrage / rideaux',
      'Table d’appoint et assises en bois',
      'Espace de rangement mural'
    ],
    imageSrc: '/images/antsirabe/room-triple-wood-floor.jpeg',
    imageAlt: 'Grande chambre avec trois lits confortables et sol en bois franc à Antsirabe',
    priceNote: 'Tarif à confirmer par l’établissement',
    statusBadge: 'Détails à confirmer par l’établissement'
  },
  {
    id: 'room-4',
    name: 'Chambre Lumineuse aux Tons Terracotta',
    shortDesc: 'Atmosphère intimiste avec mur d’accent terracotta, huisseries en bois sculpté et parquet massif.',
    visualDetails: [
      'Lit double avec tête de lit blanche',
      'Mur chaleureux terracotta / rose',
      'Fenêtres à battants en bois avec vue extérieure',
      'Liseuses murales de chevet',
      'Sol en lattes de bois franc de Madagascar'
    ],
    imageSrc: '/images/antsirabe/room-rose-wood-double.jpeg',
    imageAlt: 'Chambre chaleureuse avec mur terracotta, parquet massif et grand lit double',
    priceNote: 'Tarif à confirmer par l’établissement',
    statusBadge: 'Détails à confirmer par l’établissement'
  },
  {
    id: 'room-5',
    name: 'Salle d’Eau Privative avec Douche',
    shortDesc: 'Espace sanitaire privatif avec carrelage faïence azur, douche à l’italienne et vasque avec miroir.',
    visualDetails: [
      'Douche avec receveur carrelé et colonne de douche',
      'Lavabo sur pied avec robinet mitigeur et miroir en bois',
      'Faïence murale et sol carrelé mosaïque bleue',
      'Sanitaires privatifs avec douchette d’hygiène',
      'Fenêtre d’aération naturelle'
    ],
    imageSrc: '/images/antsirabe/bathroom-blue-tile-shower.jpeg',
    imageAlt: 'Salle de bain carrelée en bleu avec douche à l’italienne et vasque',
    priceNote: 'Inclus selon la chambre attribuée',
    statusBadge: 'Détails à confirmer par l’établissement'
  }
];

export const RoomsSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<RoomItem | null>(null);

  return (
    <section id="chambres" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
            <BedDouble className="w-3.5 h-3.5 text-[#B55F38]" />
            <span>Hébergement & Confort</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
            Les chambres et espaces de séjour
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D52] leading-relaxed">
            Photographies réelles transmises par l'établissement. Par respect de l'exactitude, les catégories officielles, 
            les numéros de chambre et les tarifs ne sont pas inventés et restent à confirmer directement avec l’hôte.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#B55F38] bg-[#F7ECE4] border border-[#ECD1BF] px-3.5 py-1.5 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Mention stricte : Toutes les cartes ci-dessous affichent « Détails à confirmer par l'établissement ».</span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS_DATA.map((room) => {
            const roomWhatsAppUrl = createWhatsAppUrl({ roomName: room.name });

            return (
              <article 
                key={room.id}
                className="group flex flex-col rounded-2xl bg-white border border-[#E8DFD3] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Photo Header with Badge and Zoom Overlay */}
                <div className="relative aspect-[4/3] bg-[#E8DFD3] overflow-hidden">
                  <img
                    src={room.imageSrc}
                    alt={room.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2B1E16]/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
                      <Info className="w-3 h-3 text-[#D4AF37]" />
                      <span>{room.statusBadge}</span>
                    </span>
                  </div>

                  {/* Zoom button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(room)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#2B1E16] shadow-sm transition-transform hover:scale-110"
                    aria-label={`Agrandir la photo de ${room.name}`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-editorial text-lg font-bold text-[#2B1E16] leading-snug">
                        {room.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#6E5D52] leading-relaxed">
                      {room.shortDesc}
                    </p>

                    {/* Factual Visible Checklist */}
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6D] mb-2">
                        Éléments visibles sur la photo :
                      </div>
                      <ul className="space-y-1.5">
                        {room.visualDetails.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[#4A3B32]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5A6B5C] shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price note & WhatsApp Action */}
                  <div className="pt-4 border-t border-[#F0EAE1] space-y-3">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-[#8C7A6D]">Tarif du séjour :</span>
                      <span className="font-semibold text-[#B55F38]">Sur demande WhatsApp</span>
                    </div>

                    <a
                      href={roomWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#1F7A44] text-[#2B1E16] hover:text-white border border-[#DDD3C6] hover:border-[#1F7A44] text-xs font-semibold tracking-wide transition-all duration-150"
                    >
                      <MessageCircle className="w-4 h-4 text-[#1F7A44] group-hover:text-white" />
                      <span>Renseignements sur WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Transparent Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EFE8DD]/70 border border-[#DDD3C6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#2B1E16]">
              Vous avez une configuration ou un besoin particulier ?
            </h4>
            <p className="text-xs text-[#6E5D52]">
              Voyage en groupe, séjour prolongé à Antsirabe, ou arrivée tardive : 
              l'hôte Chez DEO vous répond directement par message.
            </p>
          </div>

          <a
            href={createWhatsAppUrl({ customNote: "Demande pour besoin particulier ou séjour prolongé" })}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white text-xs font-semibold tracking-wide shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Poser une question à l'hôte</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#2B1E16] text-white flex items-center justify-between">
              <div>
                <h3 id="modal-title" className="font-editorial text-sm sm:text-base font-semibold">
                  {selectedPhoto.name}
                </h3>
                <p className="text-[11px] text-[#D9CFC4]">Photo réelle de l'établissement</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Fermer ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-black flex items-center justify-center p-2">
              <img
                src={selectedPhoto.imageSrc}
                alt={selectedPhoto.imageAlt}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#6E5D52]">
                <strong className="text-[#2B1E16]">Statut : </strong> 
                Photo transmise le 22/10/2026 • Détails et tarifs exacts à confirmer par l’établissement.
              </div>
              <a
                href={createWhatsAppUrl({ roomName: selectedPhoto.name })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Demander cette chambre sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
