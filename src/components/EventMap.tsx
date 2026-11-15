import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';

const VENUE_POSITION = { lat: 24.533568, lng: 72.834721 };
const VENUE_MAPS_URL = 'https://maps.app.goo.gl/xci1FQXozgPz2u698';
const VENUE_COORDINATES = '24.5336° N, 72.8347° E';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

function SimpleVenueMapContent() {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (status === APILoadingStatus.AUTH_FAILURE) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  }, [status]);

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5ECE4] px-6 text-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#FDF9F7] border border-[#8B7856] flex items-center justify-center">
          <MapPin size={20} className="text-[#BD374E]" />
        </div>
        <div>
          <p className="font-serif text-base text-[#2F504F] font-semibold">
            Wedding Celebration Location
          </p>
          <p className="font-mono text-xs text-[#8B7856] mt-0.5 tabular-nums">
            {VENUE_COORDINATES}
          </p>
        </div>
        <a
          href={VENUE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#1F3837] transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink size={12} />
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {(status === APILoadingStatus.NOT_LOADED || status === APILoadingStatus.LOADING) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5ECE4] z-10">
          <span className="font-serif italic text-sm text-[#2F504F]/75">Loading map…</span>
        </div>
      )}

      <GoogleMap
        style={{ width: '100%', height: '100%' }}
        defaultCenter={VENUE_POSITION}
        defaultZoom={15}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      >
        <AdvancedMarker
          ref={markerRef}
          position={VENUE_POSITION}
          title="Sheetal & Prakash Ji — Wedding Location"
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin
            background="#BD374E"
            borderColor="#8B1E33"
            glyphColor="#FDF9F7"
            scale={1.15}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={220}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-left">
              <p className="font-serif text-sm font-semibold text-[#2F504F]">
                Sheetal &amp; Prakash Ji
              </p>
              <p className="text-xs text-[#322F2A]/80 mt-0.5">
                Wedding Celebration Location
              </p>
              <a
                href={VENUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#BD374E] hover:underline mt-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default function EventMap() {
  return (
    <section
      id="event-map"
      aria-label="Wedding Venue Map and Directions"
      className="py-10 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto relative z-10"
    >
      {/* Clean Editorial Header */}
      <div className="text-center mb-7">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#8B7856]" />
          <span className="text-[#BD374E] text-[10px]">✦</span>
          <span className="font-cinzel text-xs tracking-[0.26em] uppercase text-[#8B7856] font-semibold">
            Location
          </span>
          <span className="text-[#BD374E] text-[10px]">✦</span>
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#8B7856]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#2F504F] font-normal tracking-wide">
          Venue &amp; Directions
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-[#322F2A]/80 mt-1">
          Tap the pin or get turn-by-turn directions to join our celebration
        </p>
      </div>

      {/* Simple Google Map Card */}
      <div className="max-w-lg mx-auto rounded-3xl border border-[#D3C5B0] bg-[#FDF9F7] shadow-[0_14px_36px_rgba(47,80,79,0.1)] overflow-hidden">
        {/* Map Viewport (explicit height per CF2) */}
        <div className="relative w-full h-[300px] sm:h-[340px] bg-[#F5ECE4]">
          {MAPS_API_KEY ? (
            <APIProvider apiKey={MAPS_API_KEY} libraries={['marker']}>
              <SimpleVenueMapContent />
            </APIProvider>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5ECE4] px-6 text-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#FDF9F7] border border-[#8B7856] flex items-center justify-center">
                <MapPin size={20} className="text-[#BD374E]" />
              </div>
              <div>
                <p className="font-serif text-base text-[#2F504F] font-semibold">
                  Wedding Celebration Location
                </p>
                <p className="font-mono text-xs text-[#8B7856] mt-0.5 tabular-nums">
                  {VENUE_COORDINATES}
                </p>
              </div>
              <a
                href={VENUE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#1F3837] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Clean Bottom Details & Get Directions Bar */}
        <div className="p-4 sm:p-5 bg-[#FDF9F7] border-t border-[#D3C5B0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#FBF5F2] border border-[#8B7856]/75 flex items-center justify-center shrink-0">
              <MapPin size={17} className="text-[#BD374E]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-lg text-[#2F504F] font-semibold leading-snug truncate">
                Wedding Celebration Venue
              </h3>
              <p className="font-mono text-xs text-[#8B7856] tabular-nums">
                {VENUE_COORDINATES}
              </p>
            </div>
          </div>

          <a
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow active:scale-95 shrink-0 whitespace-nowrap"
          >
            <Navigation size={14} className="text-[#D3C5B0]" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </section>
  );
}
