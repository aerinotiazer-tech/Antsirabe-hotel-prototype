import React from 'react';
import { X, CheckCircle, Terminal, Globe, Shield, ExternalLink, Copy, Check } from 'lucide-react';

interface VercelDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployGuideModal: React.FC<VercelDeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-guide-title"
    >
      <div className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#2B1E16] text-[#FAF7F2] flex items-center justify-between border-b border-[#3E2C22]">
          <div>
            <h3 id="deploy-guide-title" className="font-editorial text-base sm:text-lg font-bold">
              Guide de Déploiement Vercel & Fiche de Validation
            </h3>
            <p className="text-[11px] text-[#D9CFC4]">
              Instructions concrètes pour mise en ligne Preview Vercel & retours hôtel
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Fermer le guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#4A3B32]">
          
          {/* Step 1: Déploiement Vercel en 3 étapes */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-[#2B1E16] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1F7A44]" />
              <span>1. Déploiement Vercel Preview (Zéro configuration)</span>
            </h4>
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] space-y-2">
              <p className="leading-relaxed">
                Le projet est une application web purement statique côté client : <strong>aucune variable secrète</strong>, 
                <strong>aucun serveur persistant</strong>, <strong>aucune base de données</strong> requise.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#5A4B40] pt-1">
                <li>Poussez le code sur votre dépôt GitHub (ex. <code>github.com/votre-compte/antsirabe-hotel</code>).</li>
                <li>Connectez-vous à <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#B55F38] underline font-medium">Vercel.com</a> et cliquez sur <strong>Add New Project</strong> &gt; <strong>Import Git Repository</strong>.</li>
                <li>Vercel détecte automatiquement le projet Vite React (Build command : <code>npm run build</code>, Output directory : <code>dist</code>). Cliquez sur <strong>Deploy</strong>.</li>
                <li>Votre URL de Preview Vercel (ex: <code>antsirabe-hotel.vercel.app</code>) est générée en moins de 60 secondes !</li>
              </ol>
            </div>
          </div>

          {/* Step 2: Commandes terminal */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-[#2B1E16] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#B55F38]" />
              <span>2. Commandes exactes d’exécution locale</span>
            </h4>
            <div className="bg-[#1A1410] text-[#EFE8DD] p-4 rounded-xl font-mono text-[11px] space-y-2 relative">
              <button
                type="button"
                onClick={() => copyToClipboard("npm install\nnpm run dev\nnpm run build", "cmd")}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedSection === "cmd" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <p className="text-[#8C7A6D]"># Installation des dépendances</p>
              <p className="text-green-400">npm install</p>
              <p className="text-[#8C7A6D]"># Lancement du serveur de développement local</p>
              <p className="text-green-400">npm run dev</p>
              <p className="text-[#8C7A6D]"># Compilation de production pour Vercel</p>
              <p className="text-green-400">npm run build</p>
            </div>
          </div>

          {/* Step 3: Éléments à faire valider par l'hôtel */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm font-bold text-[#2B1E16] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5A6B5C]" />
              <span>3. Liste des informations à demander / valider par Chez DEO</span>
            </h4>
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] space-y-2.5">
              <div className="text-[11px] font-semibold text-[#2B1E16]">
                Pour transformer cette maquette en site officiel définitif, demandez à l'établissement :
              </div>
              <ul className="space-y-2 text-[#5A4B40]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B55F38] shrink-0 mt-0.5" />
                  <span><strong>Tarifs officiels par nuitée</strong> : grille tarifaire des différentes chambres selon saisonnalité.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Adresse postale confirmée</strong> : Lot 1118 E 325 Mahazoarivo Nord (coordonnées GPS -19.8820, 47.0410 désormais intégrées sur la carte OpenStreetMap).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B55F38] shrink-0 mt-0.5" />
                  <span><strong>Horaires de check-in / check-out</strong> et politique d'arrivée tardive.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B55F38] shrink-0 mt-0.5" />
                  <span><strong>Prestations annexes</strong> : petit-déjeuner inclus ou en supplément, parking sécurisé, eau chaude permanente, Wi-Fi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B55F38] shrink-0 mt-0.5" />
                  <span><strong>Photographies extérieures</strong> : façade de l'hôtel, cour ou enseigne pour faciliter le repérage dans la rue.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD3] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2B1E16] hover:bg-[#4A3B32] text-white text-xs font-semibold"
          >
            Fermer le guide
          </button>
        </div>

      </div>
    </div>
  );
};
