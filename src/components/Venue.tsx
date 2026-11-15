import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Venue() {
  const [showMapModal, setShowMapModal] = useState(false);

  const venueDetails = {
    name: "The Royal Aravali Resort",
    location: "Mount Abu, Rajasthan",
    fullAddress: "Sunset Road, Near Nakki Lake Valley, Mount Abu, Rajasthan 307501",
    googleMapsUrl: "https://maps.google.com/?q=Mount+Abu+Rajasthan",
  };

  return (
    <section id="venue" className="py-8 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
          <span className="text-[#BD374E] text-xs">✦</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2F504F] font-normal">
            Venue
          </h2>
          <span className="text-[#BD374E] text-xs">✦</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
        </div>
      </div>

      {/* Panoramic Frame Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#8B7856] bg-[#FDF9F7] shadow-[0_14px_34px_rgba(47,80,79,0.1)] group">
        {/* Panoramic Photograph */}
        <div className="relative h-[280px] sm:h-[360px] md:h-[400px] w-full overflow-hidden">
          <img
            src="/src/assets/images/royal_resort_venue_1794068456787.jpg"
            alt="The Royal Aravali Resort"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F3837]/55 via-transparent to-[#1F3837]/15 pointer-events-none" />
        </div>

        {/* Bottom Details Bar */}
        <div className="p-3.5 sm:p-4 bg-[#FBF5F2] border-t border-[#D3C5B0] flex flex-row items-center justify-between gap-2">
          <div
            onClick={() => setShowMapModal(true)}
            className="flex items-center gap-2 sm:gap-2.5 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#FDF9F7] border border-[#8B7856] flex items-center justify-center shrink-0">
              <MapPin size={15} className="text-[#BD374E]" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base text-[#2F504F] font-semibold leading-tight">
                {venueDetails.name}
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#8B7856] font-medium">
                {venueDetails.location}
              </p>
            </div>
          </div>

          <div className="flex items-center shrink-0 gap-2">
            <a
              href={venueDetails.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#8B7856] bg-[#FDF9F7] hover:bg-[#F3EAE3] text-[#2F504F] text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>View on Map</span>
              <Navigation size={12} className="text-[#BD374E]" />
            </a>
          </div>
        </div>
      </div>

      {/* Map Directions Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMapModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3837]/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#FDF9F7] border-2 border-[#8B7856] rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowMapModal(false)}
                className="absolute top-4 right-4 text-[#2F504F]/70 hover:text-[#2F504F] p-1.5 rounded-full hover:bg-[#F3EAE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-[#BD374E]" size={26} />
                <div>
                  <h4 className="font-serif text-2xl text-[#2F504F] font-semibold">{venueDetails.name}</h4>
                  <p className="text-xs text-[#8B7856] font-cinzel uppercase tracking-wider">{venueDetails.location}</p>
                </div>
              </div>

              <div className="p-4 bg-[#FBF5F2] rounded-xl border border-[#D3C5B0] text-sm text-[#322F2A] mb-6 space-y-2">
                <p><strong>Address:</strong> {venueDetails.fullAddress}</p>
                <p><strong>Nearest Airport:</strong> Udaipur Airport (UDR) - ~2.5 hrs scenic drive</p>
                <p><strong>Nearest Railway:</strong> Abu Road Station (ABR) - ~45 mins drive</p>
                <p className="text-xs text-[#322F2A]/70 italic mt-2">Valet parking and warm hospitality welcome will be ready upon your arrival.</p>
              </div>

              <div className="flex justify-end gap-3">
                <a
                  href={venueDetails.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#1F3837] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
