/**
 * Types & Données de Référence — Antsirabe Hôtel — Chez DEO
 * Source de vérité : classeur du 22/10/2026.
 */

export interface RoomItem {
  id: string;
  name: string;
  shortDesc: string;
  visualDetails: string[];
  imageSrc: string;
  imageAlt: string;
  priceNote: string;
  statusBadge: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'chambre' | 'salle_de_bain' | 'detail';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'reservation' | 'sejour' | 'localisation';
}

export const HOTEL_CONTACT = {
  name: "Antsirabe Hôtel — Chez DEO",
  location: "Antsirabe, Madagascar",
  altitude: "~1 500 mètres (Hauts-Plateaux)",
  phoneDisplay: "+261 34 66 350 74",
  phoneDigits: "261346635074",
  email: "antsirabehotel@gmail.com",
  linktree: "https://linktr.ee/antsirabehotel",
  instagram: "https://www.instagram.com/antsirabehotel/",
  demoDisclaimer: "Maquette de démonstration — contenu, tarifs et visuels à valider par l’établissement."
};
