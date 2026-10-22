import React, { useState } from 'react';
import { MessageCircle, Menu, X, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Chambres', href: '#chambres' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Carte & Accès', href: '#localisation' },
    { label: 'Infos & Tarifs', href: '#infos' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3]">
      {/* Top Banner Notice (Explicitly required by brief) */}
      <div className="bg-[#2B1E16] text-[#EFE8DD] text-[11px] sm:text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-[#D49B6A] shrink-0" />
        <span>
          <strong className="font-semibold text-white">Maquette de démonstration</strong> — contenu, tarifs et visuels à valider par l'établissement.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Hotel Title */}
          <a href="#" className="flex flex-col group">
            <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#2B1E16] group-hover:text-[#B55F38] transition-colors">
              Antsirabe Hôtel
            </span>
            <span className="text-[11px] tracking-widest uppercase font-medium text-[#7C6A5D] flex items-center gap-1.5">
              <span>Chez DEO</span>
              <span className="w-1 h-1 rounded-full bg-[#B55F38]"></span>
              <span className="flex items-center text-[#5A6B5C]">
                <MapPin className="w-2.5 h-2.5 inline mr-0.5" /> Antsirabe, Madagascar
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#4A3B32] hover:text-[#B55F38] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#B55F38] after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F7A44] hover:bg-[#196538] text-white text-xs font-semibold tracking-wide uppercase shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              aria-label="Contacter Antsirabe Hôtel Chez DEO directement sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2B1E16] hover:bg-[#EFE8DD] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFD3] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#2B1E16] hover:bg-[#EFE8DD] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E8DFD3]">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1F7A44] text-white text-sm font-semibold tracking-wide shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Demande WhatsApp ({HOTEL_CONTACT.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
