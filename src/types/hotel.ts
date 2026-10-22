/**
 * Types & Données de Référence — Antsirabe Hôtel — Chez DEO
 * Source de vérité : classeur du 22/10/2026 + adresse confirmée Lot 1118 E 325 Mahazoarivo Nord (-19.8820, 47.0410).
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
  address: "Lot 1118 E 325 Mahazoarivo Nord",
  fullAddress: "Lot 1118 E 325 Mahazoarivo Nord, Antsirabe, Madagascar",
  neighborhood: "Mahazoarivo Nord",
  coordinates: {
    lat: -19.8820,
    lng: 47.0410,
    zoom: 16
  },
  altitude: "~1 500 mètres (Hauts-Plateaux)",
  phoneDisplay: "+261 34 66 350 74",
  phoneDigits: "261346635074",
  email: "antsirabehotel@gmail.com",
  linktree: "https://linktr.ee/antsirabehotel",
  instagram: "https://www.instagram.com/antsirabehotel/",
  googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=-19.8820,47.0410",
  openStreetMapUrl: "https://www.openstreetmap.org/?mlat=-19.8820&mlon=47.0410#map=16/-19.8820/47.0410",
  demoDisclaimer: "Maquette de démonstration — contenu, tarifs et visuels à valider par l’établissement."
};
