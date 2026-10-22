/**
 * Utilitaires pour la génération de liens WhatsApp sécurisés et préremplis
 * Téléphone officiel : +261 34 66 350 74
 */

export const OFFICIAL_PHONE_NUMBER = "261346635074";

export interface BookingInquiryParams {
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: number;
  roomName?: string;
  customNote?: string;
}

/**
 * Construit le message prérempli WhatsApp
 */
export function buildWhatsAppMessage(params?: BookingInquiryParams): string {
  if (!params || (!params.checkInDate && !params.checkOutDate && !params.roomName && !params.guestsCount)) {
    return "Bonjour, je souhaite connaître les disponibilités et les tarifs d’Antsirabe Hôtel — Chez DEO. Pourriez-vous m’indiquer les options pour mes dates ?";
  }

  const parts: string[] = [
    "Bonjour,",
    "Je souhaite connaître les disponibilités et les tarifs d’Antsirabe Hôtel — Chez DEO."
  ];

  if (params.roomName) {
    parts.push(`Hébergement ciblé : ${params.roomName}.`);
  }

  const dateDetails: string[] = [];
  if (params.checkInDate) {
    dateDetails.push(`Arrivée souhaitée : ${params.checkInDate}`);
  }
  if (params.checkOutDate) {
    dateDetails.push(`Départ souhaité : ${params.checkOutDate}`);
  }
  if (dateDetails.length > 0) {
    parts.push(dateDetails.join(" | ") + ".");
  }

  if (params.guestsCount && params.guestsCount > 0) {
    parts.push(`Nombre de voyageur(s) : ${params.guestsCount}.`);
  }

  if (params.customNote && params.customNote.trim().length > 0) {
    parts.push(`Remarque : ${params.customNote.trim()}`);
  }

  parts.push("Pourriez-vous m’indiquer les options et disponibilités pour ces dates ? Merci.");

  return parts.join("\n");
}

/**
 * Génère l'URL WhatsApp wa.me avec le numéro officiel et le texte encodé
 */
export function createWhatsAppUrl(params?: BookingInquiryParams, phone = OFFICIAL_PHONE_NUMBER): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Lien spécifique pour demander l'adresse précise et l'itinéraire d'arrivée
 */
export function createLocationInquiryUrl(phone = OFFICIAL_PHONE_NUMBER): string {
  const message = "Bonjour, je prépare mon voyage à Antsirabe et souhaite séjourner chez Antsirabe Hôtel — Chez DEO. Pourriez-vous m’indiquer votre adresse exacte et les repères d’accès pour arriver facilement ?";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
