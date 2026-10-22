import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppMessage,
  createWhatsAppUrl,
  createLocationInquiryUrl,
  OFFICIAL_PHONE_NUMBER
} from './whatsapp';

test('buildWhatsAppMessage returns default text when no parameters provided', () => {
  const msg = buildWhatsAppMessage();
  assert.equal(
    msg,
    "Bonjour, je souhaite connaître les disponibilités et les tarifs d’Antsirabe Hôtel — Chez DEO. Pourriez-vous m’indiquer les options pour mes dates ?"
  );
});

test('createWhatsAppUrl creates valid wa.me link with official phone number', () => {
  const url = createWhatsAppUrl();
  assert.ok(url.startsWith(`https://wa.me/${OFFICIAL_PHONE_NUMBER}?text=`));
  assert.ok(url.includes(encodeURIComponent("Antsirabe Hôtel — Chez DEO")));
});

test('buildWhatsAppMessage incorporates room name, dates and guests', () => {
  const msg = buildWhatsAppMessage({
    roomName: "Grande Chambre Familiale",
    checkInDate: "2026-11-10",
    checkOutDate: "2026-11-14",
    guestsCount: 3,
    customNote: "Arrivée vers 15h"
  });

  assert.ok(msg.includes("Grande Chambre Familiale"));
  assert.ok(msg.includes("Arrivée souhaitée : 2026-11-10"));
  assert.ok(msg.includes("Départ souhaité : 2026-11-14"));
  assert.ok(msg.includes("Nombre de voyageur(s) : 3"));
  assert.ok(msg.includes("Arrivée vers 15h"));
});

test('createLocationInquiryUrl generates itinerary question for Antsirabe', () => {
  const url = createLocationInquiryUrl();
  assert.ok(url.startsWith(`https://wa.me/${OFFICIAL_PHONE_NUMBER}?text=`));
  assert.ok(decodeURIComponent(url).includes("Lot 1118 E 325 Mahazoarivo Nord"));
});
