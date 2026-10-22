import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, BedDouble, Bath, MessageCircle, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface ShowcaseSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge: string;
  features: string[];
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-1',
    tag: 'Authenticité & Matière',
    title: 'Parquets traditionnels en bois franc',
    subtitle: 'La chaleur des essences locales à Madagascar',
    description: 'Chaque chambre bénéficie d’un plancher en lattes de bois ciré et lustré, apportant une atmosphère chaleureuse et feutrée idéale pour les soirées fraîches des Hauts-Plateaux.',
    imageSrc: '/images/antsirabe/room-warm-yellow-desk.jpeg',
    imageAlt: 'Chambre avec parquet traditionnel en bois franc, bureau et lit double',
    badge: 'Photo réelle de l’établissement',
    features: ['Bois franc ciré', 'Ambiance feutrée', 'Mobilier en bois massif']
  },
  {
    id: 'slide-2',
    tag: 'Espaces & Volumes',
    title: 'Chambres spacieuses modulables',
    subtitle: 'Du voyageur solo aux séjours en famille',
    description: 'De grandes pièces aérées accueillant jusqu’à trois couchages individuels ou familiaux, avec de larges fenêtres ouvrant sur la lumière d’Antsirabe.',
    imageSrc: '/images/antsirabe/room-triple-wood-floor.jpeg',
    imageAlt: 'Grande chambre spacieuse avec 3 lits confortables et parquet lustré',
    badge: 'Photo réelle de l’établissement',
    features: ['Grand volume aéré', 'Jusqu’à 3 couchages', 'Lumière naturelle traversante']
  },
  {
    id: 'slide-3',
    tag: 'Confort Privatif',
    title: 'Salles d’eau privatives avec douche',
    subtitle: 'Faïence azur et intimité préservée',
    description: 'Espace sanitaire attenant avec douche à l’italienne carrelée, colonne de douche haute pression et vasque sur pied pour vous ressourcer après la route.',
    imageSrc: '/images/antsirabe/bathroom-blue-tile-shower.jpeg',
    imageAlt: 'Salle d’eau avec douche à l’italienne carrelée en faïence bleue',
    badge: 'Photo réelle de l’établissement',
    features: ['Douche à l’italienne', 'Carrelage mosaïque', 'Sanitaires privatifs']
  },
  {
    id: 'slide-4',
    tag: 'Quartier Paisible',
    title: 'Mahazoarivo Nord, au calme',
    subtitle: 'Lot 1118 E 325 • Antsirabe',
    description: 'Une situation sereine à l’écart du tumulte de la gare, tout en restant à quelques minutes en pousse-pousse ou en taxi des ateliers et des avenues emblématiques.',
    imageSrc: '/images/antsirabe/room-rose-wood-double.jpeg',
    imageAlt: 'Chambre lumineuse avec mur d’accent rose terracotta et vue extérieure',
    badge: 'Adresse confirmée',
    features: ['Environnement tranquille', 'Accès direct RN7', 'Stationnement facile']
  }
];

interface ScrollReactiveShowcaseProps {
  className?: string;
}

export const ScrollReactiveShowcase: React.FC<ScrollReactiveShowcaseProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  // Auto-advance gently if user is not actively interacting
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 6000);
    autoplayTimerRef.current = timer;

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, []);

  // Update progress bar
  useEffect(() => {
    setScrollProgress(((activeIndex + 1) / SHOWCASE_SLIDES.length) * 100);
  }, [activeIndex]);

  const activeSlide = SHOWCASE_SLIDES[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-white border border-[#E8DFD3] overflow-hidden shadow-sm flex flex-col ${className}`}
      aria-label="Présentation interactive scroll-réactive d'Antsirabe Hôtel Chez DEO"
    >
      {/* Top Header Bar with Progress Indicator */}
      <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border-b border-[#E8DFD3] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B55F38]" />
          <span className="text-xs font-bold text-[#2B1E16] uppercase tracking-wider">
            Découverte interactive Chez DEO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#7A6B60]">
            0{activeIndex + 1} / 0{SHOWCASE_SLIDES.length}
          </span>
          {/* Progress Pill Bar */}
          <div className="w-16 sm:w-24 h-1.5 bg-[#E8DFD3] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1F7A44] transition-all duration-300 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative aspect-[16/11] sm:aspect-[16/10] bg-[#2B1E16] overflow-hidden">
        {/* Dynamic Image with Smooth Crossfade */}
        <img
          key={activeSlide.id}
          src={activeSlide.imageSrc}
          alt={activeSlide.imageAlt}
          className="w-full h-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

        {/* Floating Top Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium border border-white/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#43E660]" />
            <span>{activeSlide.badge}</span>
          </span>
        </div>

        {/* Content Overlay pinned at the bottom */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-2 z-10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#D49B6A]">
            {activeSlide.tag}
          </div>
          <h3 className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug">
            {activeSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#EFE8DD] leading-relaxed line-clamp-2 max-w-xl">
            {activeSlide.description}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {activeSlide.features.map((feat, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white border border-white/10"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Scroll-Reactive Steps Selector */}
      <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#E8DFD3] grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SHOWCASE_SLIDES.map((slide, idx) => {
          const isCurrent = activeIndex === idx;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#1F7A44] shadow-xs ring-1 ring-[#1F7A44]'
                  : 'bg-[#F5EFE6] border-transparent hover:bg-white text-[#6E5D52]'
              }`}
              aria-label={`Afficher ${slide.title}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-[#1F7A44]' : 'text-[#8C7A6D]'}`}>
                  0{idx + 1}
                </span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A44]" />}
              </div>
              <div className={`font-semibold text-[11px] line-clamp-1 ${isCurrent ? 'text-[#2B1E16]' : 'text-[#5A4B40]'}`}>
                {slide.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="px-4 py-3 bg-white border-t border-[#E8DFD3] flex items-center justify-between gap-3 text-xs">
        <span className="text-[11px] text-[#6E5D52] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1F7A44]" />
          <span>Vérifié pour Antsirabe Hôtel — Chez DEO</span>
        </span>

        <a
          href={createWhatsAppUrl({ customNote: `Demande de renseignement sur : ${activeSlide.title}` })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-[#1F7A44] hover:text-[#196538] transition-colors"
        >
          <span>En savoir plus sur WhatsApp</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
