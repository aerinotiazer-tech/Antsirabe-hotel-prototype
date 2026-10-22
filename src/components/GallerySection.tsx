import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle, MessageCircle } from 'lucide-react';
import { GalleryPhoto } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/images/antsirabe/room-warm-yellow-desk.jpeg',
    title: 'Chambre avec bureau et lit double',
    caption: 'Sol en parquet de bois franc, lit double avec jeté fleuri, bureau en bois et porte ouvrant sur la salle de bain privative.',
    category: 'chambre'
  },
  {
    id: 'gal-2',
    src: '/images/antsirabe/bathroom-blue-tile-shower.jpeg',
    title: 'Salle d’eau avec douche et mosaïque bleue',
    caption: 'Douche à l’italienne carrelée avec colonne de douche, lavabo, miroir à encadrement bois et carrelage azuré.',
    category: 'salle_de_bain'
  },
  {
    id: 'gal-3',
    src: '/images/antsirabe/room-triple-wood-floor.jpeg',
    title: 'Grande chambre avec plancher en bois franc',
    caption: 'Vue longitudinale montrant trois lits distincts disposés sur un parquet en lattes de bois ciré, éclairé par des fenêtres avec rideaux.',
    category: 'chambre'
  },
  {
    id: 'gal-4',
    src: '/images/antsirabe/room-rose-wood-double.jpeg',
    title: 'Chambre avec mur terracotta et lit double',
    caption: 'Chambre spacieuse avec grand lit double, chevet blanc, mur rose terracotta et fenêtres en bois donnant sur l’extérieur.',
    category: 'chambre'
  },
  {
    id: 'gal-5',
    src: '/images/antsirabe/room-blue-double-single.jpeg',
    title: 'Chambre aux tons bleus et parquet',
    caption: 'Chambre combinant un grand lit et un lit simple d’appoint, parquet ciré et accès vers la salle d’eau.',
    category: 'chambre'
  }
];

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'chambre' | 'salle_de_bain'>('all');

  const filteredPhotos = filter === 'all' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(p => p.category === filter);

  const activePhoto = selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_PHOTOS.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-white border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
              <Camera className="w-3.5 h-3.5 text-[#B55F38]" />
              <span>Galerie Authentique</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
              Aperçu des espaces intérieurs
            </h2>
            <p className="text-sm sm:text-base text-[#6E5D52]">
              Uniquement des clichés réels issus des pièces de l'hôtel. Pas d'image générique non vérifiée.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E8DFD3]">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6E5D52] hover:text-[#2B1E16]'
              }`}
            >
              Toutes les vues ({GALLERY_PHOTOS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('chambre')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'chambre'
                  ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6E5D52] hover:text-[#2B1E16]'
              }`}
            >
              Chambres
            </button>
            <button
              type="button"
              onClick={() => setFilter('salle_de_bain')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'salle_de_bain'
                  ? 'bg-[#2B1E16] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6E5D52] hover:text-[#2B1E16]'
              }`}
            >
              Salles d'eau
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const originalIndex = GALLERY_PHOTOS.findIndex(p => p.id === photo.id);

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(originalIndex)}
                className="group relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8DFD3] cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 bg-white border-t border-[#F0EAE1] space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-sm font-semibold text-[#2B1E16]">
                      {photo.title}
                    </h3>
                    <span className="p-1 rounded-md text-[#8C7A6D] group-hover:text-[#B55F38] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E5D52] line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Overlay */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-5xl w-full bg-[#1A1410] rounded-2xl overflow-hidden border border-[#3E2C22] shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Top Bar */}
            <div className="p-4 bg-[#2B1E16] text-[#FAF7F2] flex items-center justify-between border-b border-[#3E2C22]">
              <div>
                <h3 className="font-editorial text-sm sm:text-base font-bold">
                  {activePhoto.title}
                </h3>
                <p className="text-[11px] text-[#D9CFC4]">
                  Photo {selectedPhotoIndex! + 1} sur {GALLERY_PHOTOS.length} • Visuel authentique
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Fermer la vue agrandie"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Stage with Next / Prev */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px]">
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="max-h-[68vh] max-w-full object-contain"
              />

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-all"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-all"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption & WhatsApp Trigger */}
            <div className="p-4 bg-[#2B1E16] border-t border-[#3E2C22] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-[#D9CFC4] text-xs max-w-2xl">
                {activePhoto.caption}
              </p>

              <a
                href={createWhatsAppUrl({ customNote: `Renseignement concernant : ${activePhoto.title}` })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F7A44] hover:bg-[#196538] text-white font-semibold text-xs shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Poser une question sur WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
