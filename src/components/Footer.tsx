import React, { useState } from 'react';
import { AlertCircle, ExternalLink, Heart, Shield, Code, ChevronRight, FileText } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';

interface FooterProps {
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  return (
    <footer className="bg-[#2B1E16] text-[#FAF7F2] pt-14 pb-12 border-t border-[#3E2C22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-white tracking-tight">
              Antsirabe Hôtel
            </h3>
            <div className="text-xs text-[#D49B6A] uppercase tracking-wider font-medium">
              Chez DEO • Antsirabe, Madagascar
            </div>
            <p className="text-xs text-[#D9CFC4] leading-relaxed">
              Proposition de site vitrine haut de gamme et épuré. Conçu pour remplacer avantageusement 
              le point d’entrée Linktree par une immersion fluide et un contact WhatsApp direct.
            </p>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D9CFC4]">
              <li>
                <a href="#chambres" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#B55F38]" /> Chambres & Espaces
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#B55F38]" /> Galerie Photographique
                </a>
              </li>
              <li>
                <a href="#localisation" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#B55F38]" /> Carte & Localisation
                </a>
              </li>
              <li>
                <a href="#infos" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#B55F38]" /> Informations & FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#B55F38]" /> Contact Direct WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Liens Officiels & Données Vérifiées */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Sources Officielles
            </h4>
            <ul className="space-y-2 text-xs text-[#D9CFC4]">
              <li>
                <span className="text-[#8C7A6D]">WhatsApp : </span>
                <span className="font-mono text-white">{HOTEL_CONTACT.phoneDisplay}</span>
              </li>
              <li>
                <span className="text-[#8C7A6D]">Email : </span>
                <a href={`mailto:${HOTEL_CONTACT.email}`} className="hover:underline text-white">
                  {HOTEL_CONTACT.email}
                </a>
              </li>
              <li>
                <a 
                  href={HOTEL_CONTACT.linktree} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Linktree officiel</span>
                  <ExternalLink className="w-3 h-3 text-[#8C7A6D]" />
                </a>
              </li>
              <li>
                <a 
                  href={HOTEL_CONTACT.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram @antsirabehotel</span>
                  <ExternalLink className="w-3 h-3 text-[#8C7A6D]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Guide Déploiement Vercel */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Déploiement Vercel
            </h4>
            <p className="text-xs text-[#D9CFC4] leading-relaxed">
              Ce projet est 100% autonome : zéro backend requis, zéro clé secrète, compatible build Vercel instantané.
            </p>
            <button
              type="button"
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/10"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Guide Vercel & Validation</span>
            </button>
          </div>

        </div>

        {/* Mandatory Transparency Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#3E2C22] border border-[#523C2F] text-xs text-[#D9CFC4] space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Mention légale & éthique du prototype</span>
          </div>
          <p className="leading-relaxed">
            {HOTEL_CONTACT.demoDisclaimer} 
            Cette maquette a été élaborée à partir des éléments publics vérifiés le 22/10/2026. 
            Aucun formulaire trompeur, aucun paiement en ligne ni simulation de fausse disponibilité temps réel n'y figure.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#3E2C22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A69485]">
          <div>
            © {new Date().getFullYear()} Antsirabe Hôtel — Chez DEO. Prototype conceptuel.
          </div>
          <div className="flex items-center gap-4">
            <span>Antsirabe, Région Vakinankaratra, Madagascar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
