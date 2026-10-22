import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { GallerySection } from './components/GallerySection';
import { MapSection } from './components/MapSection';
import { PracticalInfoSection } from './components/PracticalInfoSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VercelDeployGuideModal } from './components/VercelDeployGuideModal';

export default function App() {
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E]">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <RoomsSection />
        <GallerySection />
        <MapSection />
        <PracticalInfoSection />
        <ContactSection />
      </main>

      {/* Persistent Floating WhatsApp Direct CTA */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onOpenDeployGuide={() => setIsDeployGuideOpen(true)} />

      {/* Modal with Vercel Deploy & Hotel Validation Guide */}
      <VercelDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
