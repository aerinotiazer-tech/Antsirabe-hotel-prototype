import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, MessageCircle, ExternalLink, Compass, CheckCircle2, Copy, Check } from 'lucide-react';
import { HOTEL_CONTACT } from '../types/hotel';
import { createLocationInquiryUrl } from '../utils/whatsapp';

export const MapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copiedAddress, setCopiedAddress] = React.useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent duplicate init

    const hotelCoords: [number, number] = [HOTEL_CONTACT.coordinates.lat, HOTEL_CONTACT.coordinates.lng];

    // Initialisation de la carte centrée sur l'hôtel Chez DEO (zoom 16)
    const map = L.map(mapContainerRef.current, {
      center: hotelCoords,
      zoom: 16,
      scrollWheelZoom: false, // Prevents hijacking page scroll
    });

    mapInstanceRef.current = map;

    // Chargement des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom stylish hotel marker with warm terracotta copper accent
    const customIcon = L.divIcon({
      className: 'custom-hotel-pin',
      html: `
        <div style="position: relative; width: 38px; height: 38px; transform: translate(-50%, -100%);">
          <div style="
            background: #1F7A44;
            color: white;
            width: 38px;
            height: 38px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(31, 122, 68, 0.45);
            border: 2px solid #FAF7F2;
          ">
            <svg style="transform: rotate(45deg); width: 18px; height: 18px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path>
              <path d="M21 10H3"></path>
              <path d="M7 10v4"></path>
              <path d="M17 10v4"></path>
            </svg>
          </div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });

    // Ajout du marqueur de l'hôtel avec le popup officiel
    const marker = L.marker(hotelCoords, { icon: customIcon }).addTo(map);
    marker.bindPopup("<b>Antsirabe Hôtel - Chez DEO</b><br>Lot 1118 E 325 Mahazoarivo Nord").openPopup();

    // Enable scroll zoom on user click
    map.on('click', () => {
      map.scrollWheelZoom.enable();
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [HOTEL_CONTACT.coordinates.lat, HOTEL_CONTACT.coordinates.lng],
        16,
        { animate: true }
      );
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(`${HOTEL_CONTACT.name}, ${HOTEL_CONTACT.address}, Antsirabe, Madagascar`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DD] text-xs font-semibold uppercase tracking-wider text-[#7C6A5D]">
            <MapPin className="w-3.5 h-3.5 text-[#1F7A44]" />
            <span>Localisation Précise & Itinéraire</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1E16]">
            Trouver l'établissement à Antsirabe
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D52] leading-relaxed">
            L'hôtel se situe dans le quartier paisible de <strong>Mahazoarivo Nord</strong> à Antsirabe, 
            facilement accessible depuis la ville et les axes routiers principaux.
          </p>

          {/* Confirmed Address Highlight Banner */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#1F7A44] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#2B1E16] flex items-center gap-2">
                  <span>Adresse officielle confirmée :</span>
                  <span className="text-[10px] bg-[#E8F5E9] text-[#1F7A44] px-2 py-0.5 rounded-full font-semibold">
                    Validée
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#2B1E16] mt-0.5">
                  {HOTEL_CONTACT.address}, Antsirabe, Madagascar
                </p>
                <p className="text-[11px] text-[#7A6B60]">
                  Coordonnées GPS : {HOTEL_CONTACT.coordinates.lat}, {HOTEL_CONTACT.coordinates.lng} (Quartier {HOTEL_CONTACT.neighborhood})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD3C6] bg-[#FAF7F2] hover:bg-[#EFE8DD] text-xs font-medium text-[#4A3B32] transition-colors self-start sm:self-auto shrink-0"
              aria-label="Copier l'adresse exacte"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-semibold">Adresse copiée !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7A6B60]" />
                  <span>Copier l'adresse</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Map & Orientation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Leaflet OpenStreetMap Interactive Map */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E8DFD3] overflow-hidden shadow-xs">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-[#E8DFD3] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1F7A44]" />
                <span className="text-xs font-bold text-[#2B1E16]">
                  Carte interactive OpenStreetMap
                </span>
                <span className="text-[11px] text-[#7A6B60] hidden sm:inline">
                  • Zoom & déplacements actifs
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRecenter}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white border border-[#DDD3C6] text-[#4A3B32] hover:bg-[#EFE8DD] transition-colors"
                >
                  Recentrer sur l'Hôtel
                </button>
                <a
                  href={HOTEL_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-white border border-[#DDD3C6] text-[#4A3B32] hover:bg-[#EFE8DD] transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-[#1F7A44]" />
                  <span>Itinéraire Google Maps</span>
                </a>
              </div>
            </div>

            {/* Exact Leaflet Map Element as requested: id="map-osm" */}
            <div className="relative w-full">
              <div
                id="map-osm"
                ref={mapContainerRef}
                style={{ width: '100%', height: '450px' }}
                className="z-0"
              />

              {/* Floating guidance card on top of map */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-xl bg-white/95 backdrop-blur-xs border border-[#E8DFD3] shadow-lg text-xs space-y-2 z-10 pointer-events-auto">
                <div className="flex items-center gap-2 font-bold text-[#2B1E16]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1F7A44]"></span>
                  <span>Antsirabe Hôtel — Chez DEO</span>
                </div>
                <p className="text-[#5A4B40] text-[11px] leading-relaxed">
                  <strong>{HOTEL_CONTACT.address}</strong>. Cliquez sur le marqueur vert pour ouvrir l'étiquette ou recentrez à tout moment.
                </p>
                <a
                  href={createLocationInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#1F7A44] hover:bg-[#196538] text-white font-medium text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Demander les conseils d'arrivée sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Arrival Guidance & Landmarks */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Direct Location Card */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C6] space-y-4">
              <h3 className="font-editorial text-base font-bold text-[#2B1E16] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#1F7A44]" />
                <span>Comment rejoindre l'hôtel</span>
              </h3>
              <p className="text-xs text-[#6E5D52] leading-relaxed">
                Situé dans le secteur de <strong>Mahazoarivo Nord</strong>, l'hôtel bénéficie d'un environnement plus calme 
                que l'hyper-centre tout en restant rapidement accessible en taxi ou en pousse-pousse.
              </p>

              <div className="pt-2 border-t border-[#E8DFD3] space-y-2.5">
                <div className="text-[11px] font-semibold text-[#4A3B32] uppercase tracking-wider">
                  Accès conseillés :
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] text-xs space-y-1">
                  <div className="font-semibold text-[#2B1E16]">Depuis la Gare d'Antsirabe</div>
                  <div className="text-[11px] text-[#6E5D52]">
                    Comptez environ 5 à 10 minutes en voiture / taxi urbain pour rejoindre Mahazoarivo Nord.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#E8DFD3] text-xs space-y-1">
                  <div className="font-semibold text-[#2B1E16]">Depuis la Gare Routière (RN7)</div>
                  <div className="text-[11px] text-[#6E5D52]">
                    En arrivant de Tananarive par taxi-brousse, un taxi local vous dépose directement devant le portail.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={createLocationInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B1E16] hover:bg-[#4A3B32] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Préciser mon arrivée avec l'hôte</span>
                </a>
              </div>
            </div>

            {/* Quick Note about Antsirabe */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] text-xs space-y-1.5">
              <div className="font-semibold text-[#2B1E16] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#5A6B5C]" />
                <span>Repères d'Antsirabe</span>
              </div>
              <p className="text-[11px] text-[#6E5D52] leading-relaxed">
                Antsirabe est réputée pour ses sources thermales (Ranovisy), ses artisans de corne de zébu et de pousse-pousse miniatures, 
                ainsi que les lacs volcaniques Andraikiba et Tritriva.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
