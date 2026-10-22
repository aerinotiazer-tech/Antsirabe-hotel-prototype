import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <aside 
      aria-label="Contact rapide WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
    >
      {/* Optional helper bubble for desktop discovery (hidden on small screens to prevent input obstruction) */}
      {!tooltipDismissed && (
        <div className="hidden sm:block relative bg-white border border-[#E8DFD3] text-[#2B1E16] text-xs py-2 px-3.5 rounded-2xl shadow-lg max-w-[210px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            type="button"
            onClick={() => setTooltipDismissed(true)}
            className="absolute -top-1.5 -left-1.5 p-0.5 rounded-full bg-[#EFE8DD] hover:bg-[#DDD3C6] text-[#7A6B60] transition-colors"
            aria-label="Fermer l'infobulle"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="font-semibold text-[#1F7A44] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A44]"></span>
            <span>Une question ?</span>
          </div>
          <p className="text-[11px] text-[#6E5D52] mt-0.5">
            Échangez avec Chez DEO sur WhatsApp
          </p>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={createWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3.5 rounded-full bg-[#1F7A44] hover:bg-[#196538] text-white shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
        aria-label={`Écrire sur WhatsApp à Antsirabe Hôtel au ${HOTEL_CONTACT.phoneDisplay}`}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-[#1F7A44]" />
        <span className="text-xs font-bold tracking-wide uppercase pr-1 hidden sm:inline">
          Disponibilités WhatsApp
        </span>
      </a>
    </aside>
  );
};
