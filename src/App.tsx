/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

type SceneState = 'intro-play' | 'intro-blvd' | 'intro-clock' | 'intro-image-1' | 'intro-image-2' | 'intro-image-3' | 'main-app';

export default function App() {
  const [scene, setScene] = useState<SceneState>('intro-play');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable text selection globally via JS events for full coverage
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('selectstart', handleSelectStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Handle high-speed clock ticking for Scene 3 (KC3)
  useEffect(() => {
    if (scene !== 'intro-clock') return;

    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 16); // ~60fps high speed update

    return () => clearInterval(interval);
  }, [scene]);

  // Handle automatic transitions between scenes (Custom sequence timing)
  useEffect(() => {
    if (scene === 'intro-play') {
      const t = setTimeout(() => {
        setScene('intro-blvd');
      }, 500); // 0.5s for KC1 ("phát")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 800); // 2.0s for KC3 (clock ticks) to be easily visible
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-1') {
      const t = setTimeout(() => {
        setScene('intro-image-2');
      }, 500); // 0.5s for KC4 (tinted background #89CC04)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-2') {
      const t = setTimeout(() => {
        setScene('intro-image-3');
      }, 500); // 0.5s for KC5 (tinted background #C54EAA)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-3') {
      const t = setTimeout(() => {
        setScene('main-app');
      }, 500); // 0.5s for KC6 (tinted background #8375B3)
      return () => clearTimeout(t);
    }
  }, [scene]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none" id="main-container">
      
      {/* KC1: Start Screen ("phát") */}
      {scene === 'intro-play' && (
        <div 
          id="scene-play"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 select-none"
        >
          <div
            id="intro-phat-text"
            className="font-phat text-[clamp(1rem,3.2vw,1.4rem)] text-white/90 uppercase select-none tracking-[-0.12em]"
          >
            phát
          </div>
        </div>
      )}

      {/* KC2: BLVD Hollow / Stretched Text Screen */}
      {scene === 'intro-blvd' && (
        <div 
          id="scene-blvd"
          className="absolute inset-0 flex items-center justify-center bg-black z-40 overflow-hidden select-none w-full h-full"
        >
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full" 
            preserveAspectRatio="none"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-archivo font-black select-none pointer-events-none"
              fontSize="110"
              fill="none"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="3.2"
            >
              BLVD
            </text>
          </svg>
        </div>
      )}

      {/* KC3: High-frequency live ticking clock */}
      {scene === 'intro-clock' && (
        <div 
          id="scene-clock"
          className="absolute inset-0 flex items-center justify-center bg-black z-30 select-none"
        >
          <div 
            id="clock-display"
            className="font-archivo font-normal text-[clamp(1.4rem,4.2vw,3.8rem)] text-white/95 tracking-[0.05em] select-none pointer-events-none tabular-nums"
          >
            {timeStr}
          </div>
        </div>
      )}

      {/* KC4: Background Image with #89CC04 tint */}
      {scene === 'intro-image-1' && (
        <div 
          id="scene-intro-image-1"
          className="absolute inset-0 flex items-center justify-center bg-black z-20 select-none"
        >
          {/* Background Image */}
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            alt="Intro Background Reference 1"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC5: Background Image with #C54EAA tint */}
      {scene === 'intro-image-2' && (
        <div 
          id="scene-intro-image-2"
          className="absolute inset-0 flex items-center justify-center bg-black z-15 select-none"
        >
          {/* Background Image */}
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            alt="Intro Background Reference 2"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #C54EAA Tint Overlays */}
          <div className="absolute inset-0 bg-[#C54EAA] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#C54EAA]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC6: Background Image with #8375B3 tint */}
      {scene === 'intro-image-3' && (
        <div 
          id="scene-intro-image-3"
          className="absolute inset-0 flex items-center justify-center bg-black z-10 select-none"
        >
          {/* Background Image */}
          <img
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            alt="Intro Background Reference 3"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #8375B3 Tint Overlays */}
          <div className="absolute inset-0 bg-[#8375B3] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#8375B3]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* Main App Screen (Background Image & Interactive Interface Layouts) */}
      {scene === 'main-app' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background Image */}
          <img
            id="reference-image"
            src="https://i.ibb.co/vy4ykmw/vespertine.png"
            alt="Vespertine Design Reference"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />

          {/* Landscape Layout (Visible only in landscape / horizontal viewports) */}
          <div 
            id="safezone-overlay-landscape" 
            className="hidden landscape:flex absolute inset-0 flex-col justify-between p-[6.5%] pointer-events-none"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start w-full">
              <button 
                id="btn-contact-landscape" 
                className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
              >
                contact
              </button>
              
              <button 
                id="btn-history-landscape" 
                className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
              >
                his-tory
              </button>
            </div>

            {/* Bottom Row */}
            <div className="relative flex justify-between items-baseline w-full">
              <button 
                id="btn-info-landscape" 
                className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
              >
                info
              </button>

              {/* Centered Logo aligned with bottom baseline */}
              <div 
                id="logo-container"
                className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-end justify-center pointer-events-auto"
              >
                <h1 
                  id="logo-text-landscape"
                  className="font-archivo text-white font-black text-[clamp(2rem,7.6vw,9.125rem)] leading-[0.85] tracking-tighter select-none whitespace-nowrap"
                >
                  Boulevard1st
                </h1>
              </div>

              <button 
                id="btn-archive-landscape" 
                className="pointer-events-auto text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.2rem,4.8vw,5.75rem)] leading-none cursor-pointer tracking-tight select-none"
              >
                archive
              </button>
            </div>
          </div>

          {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
          <div 
            id="safezone-overlay-portrait" 
            className="hidden portrait:flex absolute inset-0 flex-col items-center justify-end pb-[18vh] p-[6%] pointer-events-none"
          >
            <div className="w-fit flex flex-col items-stretch gap-2.5 pointer-events-auto">
              {/* Top Row */}
              <div className="flex justify-between items-end w-full">
                <button 
                  id="btn-contact-portrait" 
                  className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight select-none"
                >
                  contact
                </button>
                <button 
                  id="btn-history-portrait" 
                  className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight select-none"
                >
                  his-tory
                </button>
              </div>

              {/* Centered Logo */}
              <div className="flex items-center justify-center w-full">
                <h1 
                  id="logo-text-portrait"
                  className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-[0.8] tracking-tighter select-none whitespace-nowrap"
                >
                  Boulevard1st
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-start w-full">
                <button 
                  id="btn-info-portrait" 
                  className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight select-none"
                >
                  info
                </button>
                <button 
                  id="btn-archive-portrait" 
                  className="text-white/90 hover:text-white hover-italic-transition font-archivo-narrow font-extralight text-[clamp(1.4rem,5.5vw,3rem)] leading-none cursor-pointer tracking-tight select-none"
                >
                  archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
