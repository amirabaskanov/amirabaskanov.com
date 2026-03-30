'use client'

import React, { useEffect, useRef } from 'react'
import type { Map as LeafletMap } from 'leaflet'

// You can customize these coordinates for your location
const COORDINATES = {
  lat: 37.7946,
  lng: -122.3999,
  zoom: 9
}

const ZOOM_LIMITS = {
  min: COORDINATES.zoom - 2,
  max: COORDINATES.zoom + 2
}

interface Props {
  apiKey: string
}

export default function BentoItemMapLocation({ apiKey }: Props) {
  const mapRef = useRef<LeafletMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(linkElement)

    const initializeMap = async () => {
      const L = (await import('leaflet')).default
      const map = L.map(mapContainerRef.current!, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        attributionControl: false,
        minZoom: ZOOM_LIMITS.min,
        maxZoom: ZOOM_LIMITS.max
      }).setView([COORDINATES.lat, COORDINATES.lng], COORDINATES.zoom)

      L.tileLayer(`https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=${apiKey}`, {
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(map)

      // Create a custom div icon with ripple effect
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-inner"><div class="ripple"></div></div>',
        iconSize: [120, 120],
        iconAnchor: [60, 60]
      })

      // Add marker with custom icon
      const marker = L.marker([COORDINATES.lat, COORDINATES.lng], {
        icon: customIcon
      }).addTo(map)

      mapRef.current = map
      map.invalidateSize()

      // Initial zoom state
      window.dispatchEvent(new CustomEvent('map:zoom-update', { 
        detail: { 
          currentZoom: COORDINATES.zoom,
          minZoom: ZOOM_LIMITS.min,
          maxZoom: ZOOM_LIMITS.max
        }
      }))

      // Handle zoom events
      const handleZoomIn = () => {
        if (mapRef.current && mapRef.current.getZoom() < ZOOM_LIMITS.max) {
          mapRef.current.setZoom(mapRef.current.getZoom() + 1)
        }
      }

      const handleZoomOut = () => {
        if (mapRef.current && mapRef.current.getZoom() > ZOOM_LIMITS.min) {
          mapRef.current.setZoom(mapRef.current.getZoom() - 1)
        }
      }

      // Update zoom controls visibility on zoom change
      map.on('zoomend', () => {
        if (mapRef.current) {
          window.dispatchEvent(new CustomEvent('map:zoom-update', { 
            detail: { 
              currentZoom: mapRef.current.getZoom(),
              minZoom: ZOOM_LIMITS.min,
              maxZoom: ZOOM_LIMITS.max
            }
          }))
        }
      })

      window.addEventListener('map:zoom-in', handleZoomIn)
      window.addEventListener('map:zoom-out', handleZoomOut)

      return () => {
        window.removeEventListener('map:zoom-in', handleZoomIn)
        window.removeEventListener('map:zoom-out', handleZoomOut)
        map.off('zoomend')
      }
    }

    const timer = setTimeout(initializeMap, 0)

    return () => {
      clearTimeout(timer)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      document.head.removeChild(linkElement)
    }
  }, [apiKey])

  return (
    <div className="absolute inset-0 -m-6" style={{ zIndex: 0 }}>
      <style>{`
        .leaflet-container {
          background: transparent;
        }

        .custom-marker {
          background: transparent;
        }

        .marker-inner {
          position: relative;
          width: 50px;
          height: 50px;
          left: 35px;
          top: 35px;
          background-color: rgba(16, 185, 129, 0.6);
          border-radius: 50%;
        }

        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.7) 0%, rgba(16, 185, 129, 0.6) 50%, rgba(16, 185, 129, 0) 80%);
          border-radius: 50%;
          animation: ripple 1s infinite ease-out;
        }

        .ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(16, 185, 129, 1) 0%, rgba(16, 185, 129, 0.9) 50%, rgba(16, 185, 129, 0.0001) 80%);
          border-radius: 50%;
          animation: ripple 1s infinite ease-out 1s;
        }

        @keyframes ripple {
          0% {
            width: 50px;
            height: 50px;
            opacity: 0.6;
          }
          100% {
            width: 110px;
            height: 110px;
            opacity: 0;
          }
        }
      `}</style>
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-[32px] overflow-hidden"
      />
    </div>
  )
} 