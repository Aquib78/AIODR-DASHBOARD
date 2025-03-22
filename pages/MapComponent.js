'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

export default function MapComponent() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // This code runs only on the client
        if (typeof window !== 'undefined') {
            // Import Leaflet dynamically
            const L = require('leaflet');
            
            // Import Leaflet CSS
            import('leaflet/dist/leaflet.css');

            // Initialize the map only if it hasn't been initialized yet
            if (!mapRef.current && mapContainerRef.current) {
                // Set the new coordinates for the map
                const coordinates = [13.115056, 77.634781];
                
                // Initialize the map
                mapRef.current = L.map(mapContainerRef.current).setView(coordinates, 13);
                
                // Add OpenStreetMap tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapRef.current);
                
                // Add a marker at the new coordinates
                L.marker(coordinates).addTo(mapRef.current)
                    .bindPopup('Your Location')
                    .openPopup();
            }
        }
        
        // Cleanup function to remove the map on component unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return <div ref={mapContainerRef} className={styles.map}></div>;
}