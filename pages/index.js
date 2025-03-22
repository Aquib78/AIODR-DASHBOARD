'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('../pages/MapComponent'), {
  ssr: false,
  loading: () => <div className={styles.loadingMessage}>Loading map...</div>
});

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');

    const handleLoad = () => {
        setLoading(false);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save theme preference
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    return (
        <div className={`${styles.container} ${styles[theme]}`}>
            <header className={styles.header}>
                <h1>Streaming Dashboard</h1>
            </header>

            <button 
                className={styles.toggleButton} 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <div className={styles.content}>
                <section className={`${styles.stream} ${loading ? '' : styles['slide-up']}`}>
                    <h2 className={styles.h2}>Stream Window</h2>
                    {loading && <div className={styles.loadingMessage}>Loading video...</div>}
                    <iframe
                        className={styles.iframe}
                        src="http://192.168.169.47:5000/video_feed"
                        title="Live Video Stream"
                        allowFullScreen
                        loading="lazy"
                        onLoad={handleLoad}
                    ></iframe>
                </section>

                <section className={`${styles.liveLocation} ${loading ? '' : styles['slide-up']}`}>
                    <h2 className={styles.h2}>Live Location</h2>
                    <MapComponent />
                </section>
            </div>
            
            <section className={`${styles.externalContent} ${loading ? '' : styles['slide-up']}`}>
                <h2 className={styles.h2}>External Content</h2>
                {loading && <div className={styles.loadingMessage}>Loading external content...</div>}
                <iframe 
                    src="http://192.168.169.242" 
                    title="External Content" 
                    className={styles.iframe}
                    onLoad={handleLoad}
                ></iframe>
            </section>
        </div>
    );
}