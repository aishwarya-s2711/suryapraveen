const fs = require('fs');

const css = `
/* ============================
   BESPOKE LUXURY THEME
============================ */
:root {
  --bg-deep: #0a0604;
  --bg-dark: #120a06;
  --bg-light: #f5f1eb;
  --ivory: #fffaef;
  --champagne: #f4e8d1;
  --antique-gold: #c39a58;
  --gold-highlight: #ebd298;
  --deep-maroon: #4a1515;
  --glass-bg: rgba(18, 10, 6, 0.7);
  --glass-border: rgba(195, 154, 88, 0.25);
  
  --font-serif: 'Cormorant Garamond', serif;
  --font-display: 'Playfair Display', serif;
  --font-sans: 'Montserrat', sans-serif;
  
  --trans-slow: all 1.8s cubic-bezier(0.2, 0.9, 0.3, 1);
  --trans-smooth: all 0.8s cubic-bezier(0.3, 1, 0.4, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; scroll-padding-top: 100px; }
body {
  font-family: var(--font-serif);
  background: var(--bg-deep);
  color: var(--ivory);
  overflow-x: hidden;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}
body.locked { overflow: hidden; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--antique-gold); border-radius: 3px; }

/* ============================
   TYPOGRAPHY
============================ */
h1, h2, h3, h4, h5 { font-family: var(--font-display); font-weight: 400; line-height: 1.2; }
.text-gold { color: var(--antique-gold); }
.text-italic { font-style: italic; }
.tracking-widest { letter-spacing: 0.3em; text-transform: uppercase; }

/* ============================
   CUSTOM CURSOR
============================ */
#cursor {
  position: fixed; width: 6px; height: 6px;
  background: var(--antique-gold); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}
#cursor-ring {
  position: fixed; width: 40px; height: 40px;
  border: 1px solid var(--antique-gold); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
}
.hover-state #cursor { width: 12px; height: 12px; background: var(--ivory); }
.hover-state #cursor-ring { transform: translate(-50%, -50%) scale(1.5); border-color: rgba(255,255,255,0.4); }

/* ============================
   LOADING SCREEN
============================ */
#loader {
  position: fixed; inset: 0; z-index: 10000;
  background: var(--bg-deep); display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  transition: opacity 1.5s var(--trans-slow);
}
#loader.hidden { opacity: 0; pointer-events: none; }
.loader-svg {
  width: 150px; height: 150px; margin-bottom: 2rem;
  animation: spin 30s linear infinite;
}
.loader-svg path {
  stroke: var(--antique-gold); stroke-width: 1; fill: none;
  stroke-dasharray: 800; stroke-dashoffset: 800;
  animation: drawLine 3s ease-in-out forwards;
}
@keyframes drawLine { to { stroke-dashoffset: 0; } }
@keyframes spin { to { transform: rotate(360deg); } }

.loader-text {
  font-family: var(--font-display); font-size: 2.5rem;
  color: var(--antique-gold); letter-spacing: 0.3em;
  text-shadow: 0 0 20px rgba(195,154,88,0.5);
}

/* ============================
   INVITATION CARD OVERLAY (3D)
============================ */
#invite-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: radial-gradient(circle at center, #1a100b 0%, #050302 100%);
  display: flex; align-items: center; justify-content: center;
  perspective: 2000px; padding: 2rem;
  transition: opacity 2s var(--trans-slow);
}
#invite-overlay.fade-out { opacity: 0; pointer-events: none; }

.card-container {
  position: relative; width: 100%; max-width: 500px; height: 700px;
  transform-style: preserve-3d;
  transition: transform 3s cubic-bezier(0.2, 0.9, 0.1, 1);
}
.card-container.open { transform: rotateY(-180deg) translateZ(100px) scale(0.95); }

/* Handmade paper texture for card panels */
.paper-texture {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.12; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.card-panel {
  position: absolute; inset: 0;
  background: var(--ivory);
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  border-radius: 4px; box-shadow: 0 40px 100px rgba(0,0,0,0.9);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 3rem 2rem;
  overflow: hidden;
}

/* Front Cover */
.card-cover {
  z-index: 2; transform-origin: left center;
  transition: transform 3s cubic-bezier(0.2, 0.9, 0.1, 1);
  border: 12px solid #fff; /* Outer white edge */
  box-shadow: inset 0 0 0 2px var(--antique-gold), 0 30px 60px rgba(0,0,0,0.8);
}
.card-container.open .card-cover { transform: rotateY(-165deg); }

.foil-border {
  position: absolute; inset: 20px;
  border: 1px solid var(--antique-gold);
  pointer-events: none;
}
.foil-corner {
  position: absolute; width: 50px; height: 50px;
  border: 2px solid var(--antique-gold);
}
.foil-corner.tl { top: 15px; left: 15px; border-right: none; border-bottom: none; }
.foil-corner.tr { top: 15px; right: 15px; border-left: none; border-bottom: none; }
.foil-corner.bl { bottom: 15px; left: 15px; border-right: none; border-top: none; }
.foil-corner.br { bottom: 15px; right: 15px; border-left: none; border-top: none; }

.card-title { font-family: var(--font-sans); font-size: 0.65rem; color: #7a5c2d; letter-spacing: 0.4em; text-transform: uppercase; margin-bottom: 2rem; }
.card-names-front { font-size: 2.8rem; color: var(--bg-deep); margin: 1rem 0; line-height: 1.1; font-weight: 500; }
.card-names-front em { font-family: var(--font-serif); font-style: italic; color: var(--antique-gold); font-size: 1.5rem; display: block; margin: 0.5rem 0; }
.card-date { font-family: var(--font-sans); font-size: 0.8rem; color: #7a5c2d; letter-spacing: 0.2em; margin-top: 2rem; }

.btn-premium {
  background: linear-gradient(135deg, #dfbc7a, #c39a58, #9c7336);
  color: #fff; border: none; padding: 1.2rem 3rem;
  font-family: var(--font-sans); font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase;
  border-radius: 4px; cursor: pointer; margin-top: 3rem;
  box-shadow: 0 10px 30px rgba(195,154,88,0.3);
  transition: var(--trans-smooth); position: relative; overflow: hidden;
}
.btn-premium::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
  transform: rotate(45deg) translateX(-100%); transition: transform 0.8s;
}
.btn-premium:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(195,154,88,0.5); }
.btn-premium:hover::after { transform: rotate(45deg) translateX(100%); }

/* Inside Card */
.card-interior {
  background: #fdfbf7; z-index: 1; transform: rotateY(0deg);
  border: 12px solid #fff;
  box-shadow: inset 0 0 0 1px var(--antique-gold);
}
.card-interior .card-names-front { font-size: 2.2rem; }
.card-interior p { color: #555; font-size: 1.1rem; font-style: italic; max-width: 80%; }

/* ============================
   NAVBAR
============================ */
header {
  position: fixed; top: 0; width: 100%; z-index: 1000;
  padding: 2rem 4rem; display: flex; justify-content: space-between; align-items: center;
  transition: var(--trans-smooth);
}
header.scrolled { padding: 1rem 4rem; background: rgba(10,6,4,0.9); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(195,154,88,0.1); }
.logo { font-family: var(--font-display); font-size: 1.5rem; color: var(--antique-gold); text-decoration: none; }
.nav-links { display: flex; gap: 3rem; list-style: none; }
.nav-links a { font-family: var(--font-sans); font-size: 0.7rem; color: var(--ivory); text-decoration: none; letter-spacing: 0.2em; text-transform: uppercase; transition: color 0.3s; }
.nav-links a:hover { color: var(--antique-gold); }

/* ============================
   LAYOUT & SECTIONS
============================ */
main { opacity: 0; transition: opacity 2s ease; }
.section-pad { padding: 8rem 2rem; position: relative; }
.container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }

/* Traditional SVGs */
.thoranam { position: absolute; top: 0; left: 0; width: 100%; height: 80px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cpath d='M0,0 Q10,40 20,0 Q30,45 40,0 Q50,40 60,0 Q70,45 80,0 Q90,40 100,0 Q110,45 120,0 Q130,40 140,0 Q150,45 160,0 Q170,40 180,0 Q190,45 200,0' fill='none' stroke='%23388e3c' stroke-width='3'/%3E%3Cpath d='M10,20 Q15,40 20,20 M30,25 Q35,45 40,25 M50,20 Q55,40 60,20 M70,25 Q75,45 80,25' fill='none' stroke='%238bc34a' stroke-width='2'/%3E%3C/svg%3E") repeat-x top left; background-size: auto 100%; opacity: 0.7; z-index: 10; pointer-events: none; }
.temple-bell { position: absolute; top: -10px; width: 50px; animation: sway 4s ease-in-out infinite alternate; transform-origin: top center; z-index: 9; }
.temple-bell.l { left: 15%; }
.temple-bell.r { right: 15%; animation-delay: -1s; }
@keyframes sway { 0% { transform: rotate(-6deg); } 100% { transform: rotate(6deg); } }

/* HERO */
#hero {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  text-align: center; position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: -5%; background: url('hero_bg.png') center/cover;
  filter: blur(2px) brightness(0.4); animation: cinematicZoom 30s linear infinite alternate; z-index: 0;
}
@keyframes cinematicZoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }

.hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
.hero-title { font-size: clamp(3rem, 8vw, 6rem); color: var(--ivory); margin: 1rem 0; line-height: 1; text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.hero-title em { color: var(--antique-gold); font-family: var(--font-serif); }
.hero-desc { font-size: 1.4rem; max-width: 600px; margin: 2rem auto; color: #ddd; font-style: italic; }

.btn-outline {
  display: inline-block; padding: 1rem 2.5rem; border: 1px solid var(--antique-gold); color: var(--antique-gold);
  font-family: var(--font-sans); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none;
  border-radius: 50px; transition: var(--trans-smooth); backdrop-filter: blur(5px);
}
.btn-outline:hover { background: var(--antique-gold); color: var(--bg-deep); }

/* EVENT DETAILS */
#event { background: var(--bg-dark); }
.section-title { font-size: clamp(2.5rem, 5vw, 4rem); color: var(--antique-gold); text-align: center; margin-bottom: 4rem; }

.event-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; }
.glass-card {
  background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border); padding: 3rem 2rem; text-align: center;
  position: relative; overflow: hidden; transition: var(--trans-smooth);
}
.glass-card:hover { transform: translateY(-10px); border-color: var(--antique-gold); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.glass-card h3 { font-size: 1.8rem; margin-bottom: 1rem; color: var(--ivory); }
.glass-card p { font-size: 1.1rem; color: #bbb; }

.kuthuvilakku { width: 50px; margin: 0 auto 1.5rem; filter: drop-shadow(0 5px 10px rgba(195,154,88,0.3)); }
.flame { transform-origin: bottom; animation: flicker 0.1s infinite alternate; }
@keyframes flicker { 0% { transform: scale(1) rotate(-1deg); } 100% { transform: scale(1.1) rotate(1deg); } }

/* CALENDAR SECTION */
#calendar-section {
  background: var(--bg-deep); position: relative;
}
.calendar-wrapper {
  max-width: 800px; margin: 0 auto; background: var(--ivory); color: var(--bg-deep);
  padding: 4rem; border-radius: 8px; box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  position: relative;
}
.cal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 1rem; margin-bottom: 2rem; }
.cal-header h3 { font-size: 2.5rem; color: var(--deep-maroon); font-family: var(--font-display); }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1rem; text-align: center; font-family: var(--font-sans); }
.cal-day-name { font-size: 0.7rem; font-weight: bold; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
.cal-date { font-size: 1.2rem; padding: 1rem 0; position: relative; color: #333; z-index: 2; }
.cal-date.empty { color: transparent; pointer-events: none; }
.cal-date.highlight { color: var(--deep-maroon); font-weight: bold; font-family: var(--font-serif); font-size: 1.6rem; }
.highlight-circle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 50px; height: 50px; z-index: -1;
}
.highlight-circle path {
  fill: none; stroke: var(--antique-gold); stroke-width: 2;
  stroke-dasharray: 200; stroke-dashoffset: 200; transition: stroke-dashoffset 2s ease-out;
}
.in-view .highlight-circle path { stroke-dashoffset: 0; }
.cal-action { text-align: center; margin-top: 3rem; }

/* GALLERY SECTION */
#gallery { background: var(--bg-dark); }
.masonry { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.gallery-item {
  position: relative; overflow: hidden; border: 4px solid var(--antique-gold); padding: 4px;
  background: var(--bg-deep); transition: var(--trans-smooth);
}
.gallery-item img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 3s cubic-bezier(0.2, 0.9, 0.1, 1); filter: grayscale(30%) sepia(20%);
}
.gallery-item:hover img { transform: scale(1.1); filter: grayscale(0%) sepia(0%); }

/* LOCATION MAP */
#location { position: relative; min-height: 80vh; display: flex; align-items: center; justify-content: flex-end; padding: 4rem; }
.map-bg { position: absolute; inset: 0; z-index: 0; filter: grayscale(40%) contrast(120%) sepia(30%); }
.map-bg iframe { width: 100%; height: 100%; border: none; }
.location-card {
  position: relative; z-index: 1; background: rgba(255, 250, 239, 0.95);
  padding: 4rem; max-width: 450px; color: var(--bg-deep); border-radius: 4px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6); border: 1px solid var(--antique-gold);
}
.location-card h3 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--deep-maroon); }
.location-card p { font-size: 1.1rem; color: #444; margin-bottom: 2rem; }

/* THANK YOU */
#thank-you { text-align: center; background: var(--bg-deep); overflow: hidden; }
.signature { width: 300px; margin: 3rem auto 0; }
.signature path { fill: none; stroke: var(--antique-gold); stroke-width: 1.5; stroke-dasharray: 1000; stroke-dashoffset: 1000; transition: stroke-dashoffset 4s ease-out; }
.in-view.signature path { stroke-dashoffset: 0; }

/* EFFECTS */
.reveal-up { opacity: 0; transform: translateY(50px); transition: opacity 1.5s var(--trans-slow), transform 1.5s var(--trans-slow); }
.reveal-up.in-view { opacity: 1; transform: translateY(0); }

.petal { position: fixed; z-index: 999; pointer-events: none; animation: fall linear infinite; }
@keyframes fall {
  0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(110vh) rotate(540deg) translateX(100px); opacity: 0; }
}

/* MUSIC BTN */
#music-btn {
  position: fixed; bottom: 2rem; right: 2rem; width: 60px; height: 60px;
  background: var(--antique-gold); border-radius: 50%; z-index: 9000;
  display: none; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5); border: 2px solid var(--ivory);
}
#music-btn.show { display: flex; }
#music-btn.playing { animation: spin 4s linear infinite; }
#music-btn svg { width: 24px; height: 24px; fill: var(--bg-deep); }

@media (max-width: 768px) {
  header { padding: 1.5rem 2rem; }
  .nav-links { display: none; }
  .hero-title { font-size: 3rem; }
  .calendar-wrapper { padding: 2rem; }
  .cal-header h3 { font-size: 1.8rem; }
  .cal-date { font-size: 1rem; padding: 0.5rem 0; }
  #location { padding: 2rem; justify-content: center; }
}
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Praveenkumar & Suryaprabha – Royal Wedding Reception</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  
  <style>${css}</style>
</head>
<body class="locked">

  <div id="cursor"></div>
  <div id="cursor-ring"></div>

  <!-- LOADER -->
  <div id="loader">
    <svg class="loader-svg" viewBox="0 0 100 100">
      <path d="M50,10 C60,30 80,40 90,50 C80,60 60,70 50,90 C40,70 20,60 10,50 C20,40 40,30 50,10 Z" />
    </svg>
    <div class="loader-text">P &amp; S</div>
  </div>

  <!-- 3D INVITATION OVERLAY -->
  <div id="invite-overlay">
    <div class="card-container" id="card">
      <!-- Front -->
      <div class="card-panel card-cover">
        <div class="paper-texture"></div>
        <div class="foil-border">
          <div class="foil-corner tl"></div><div class="foil-corner tr"></div>
          <div class="foil-corner bl"></div><div class="foil-corner br"></div>
        </div>
        
        <p class="card-title">🪔 Wedding Reception Invitation</p>
        <h2 class="card-names-front">R. Praveenkumar <em>❤️</em> C. Suryaprabha</h2>
        <p class="card-date">22 August 2026</p>
        <p style="margin-top: 1rem; font-family: var(--font-serif); font-style: italic; color: #555;">Cordially Invites You</p>
        
        <button class="btn-premium" id="open-btn">Open Invitation</button>
      </div>

      <!-- Inside -->
      <div class="card-panel card-interior">
        <div class="paper-texture"></div>
        <h2 class="card-names-front" style="color: var(--deep-maroon);">The Celebration</h2>
        <p style="margin: 2rem 0;">"Two souls, one beautiful journey. Join us as we celebrate the beginning of our forever."</p>
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--antique-gold)" stroke-width="1" stroke-dasharray="4 4" />
          <path d="M50,20 L60,40 L80,50 L60,60 L50,80 L40,60 L20,50 L40,40 Z" fill="var(--antique-gold)" opacity="0.5"/>
        </svg>
      </div>
    </div>
  </div>

  <header id="nav">
    <a href="#" class="logo">P &amp; S</a>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#event">Event</a></li>
      <li><a href="#calendar-section">Calendar</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#location">Venue</a></li>
    </ul>
  </header>

  <!-- BACKGROUND MUSIC -->
  <audio id="bg-music" loop>
    <source src="cinematic_indian_instrumental.mp3" type="audio/mpeg">
  </audio>
  <div id="music-btn" title="Toggle Music">
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
  </div>

  <main id="main">
    
    <!-- HERO -->
    <section id="hero">
      <div class="hero-bg"></div>
      <div class="thoranam"></div>
      
      <!-- Temple Bells -->
      <svg class="temple-bell l" viewBox="0 0 50 80">
        <path d="M25,10 C10,25 10,60 5,70 L45,70 C40,60 40,25 25,10 Z" fill="var(--antique-gold)" />
        <circle cx="25" cy="75" r="5" fill="#ffd700" />
      </svg>
      <svg class="temple-bell r" viewBox="0 0 50 80">
        <path d="M25,10 C10,25 10,60 5,70 L45,70 C40,60 40,25 25,10 Z" fill="var(--antique-gold)" />
        <circle cx="25" cy="75" r="5" fill="#ffd700" />
      </svg>

      <div class="hero-content" id="parallax-target">
        <p class="tracking-widest text-gold reveal-up" style="margin-bottom:1rem; font-size:0.8rem;">— Wedding Reception —</p>
        <h1 class="hero-title reveal-up">R. Praveenkumar<br><em>&amp;</em><br>C. Suryaprabha</h1>
        <p class="hero-desc reveal-up">"With hearts full of joy, we warmly invite you to celebrate our Wedding Reception and bless us with your gracious presence."</p>
      </div>
    </section>

    <!-- EVENT DETAILS -->
    <section id="event" class="section-pad">
      <div class="container">
        <h2 class="section-title reveal-up">The Details</h2>
        
        <div class="event-grid">
          <div class="glass-card reveal-up">
            <svg class="kuthuvilakku" viewBox="0 0 60 120">
              <path d="M25,110 L35,110 L40,120 L20,120 Z" fill="var(--antique-gold)" />
              <rect x="28" y="40" width="4" height="70" fill="var(--gold-highlight)" />
              <path d="M15,40 Q30,50 45,40 L40,30 L20,30 Z" fill="var(--antique-gold)" />
              <path d="M30,5 L35,25 L25,25 Z" fill="var(--gold-highlight)" />
              <path class="flame" d="M30,30 Q35,25 30,15 Q25,25 30,30 Z" fill="#ffeb3b" />
            </svg>
            <p class="tracking-widest" style="font-size:0.7rem; color:var(--antique-gold); margin-bottom:0.5rem;">Date</p>
            <h3>22 August 2026</h3>
            <p>Saturday Evening</p>
          </div>
          
          <div class="glass-card reveal-up" style="transition-delay: 0.2s;">
            <svg class="kuthuvilakku" viewBox="0 0 60 120">
              <path d="M25,110 L35,110 L40,120 L20,120 Z" fill="var(--antique-gold)" />
              <rect x="28" y="40" width="4" height="70" fill="var(--gold-highlight)" />
              <path d="M15,40 Q30,50 45,40 L40,30 L20,30 Z" fill="var(--antique-gold)" />
              <path d="M30,5 L35,25 L25,25 Z" fill="var(--gold-highlight)" />
              <path class="flame" d="M30,30 Q35,25 30,15 Q25,25 30,30 Z" fill="#ffeb3b" />
            </svg>
            <p class="tracking-widest" style="font-size:0.7rem; color:var(--antique-gold); margin-bottom:0.5rem;">Time</p>
            <h3>6:00 PM - 9:00 PM</h3>
            <p>Dinner to follow</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CALENDAR (SAVE THE DATE) -->
    <section id="calendar-section" class="section-pad">
      <div class="container reveal-up">
        <div class="calendar-wrapper">
          <div class="paper-texture"></div>
          <div class="cal-header">
            <h3>August 2026</h3>
            <p class="tracking-widest" style="color:var(--antique-gold); font-size:0.8rem;">Save The Date</p>
          </div>
          
          <div class="cal-grid">
            <!-- Days -->
            <div class="cal-day-name">Sun</div><div class="cal-day-name">Mon</div><div class="cal-day-name">Tue</div>
            <div class="cal-day-name">Wed</div><div class="cal-day-name">Thu</div><div class="cal-day-name">Fri</div><div class="cal-day-name">Sat</div>
            
            <!-- Dates (August 2026 starts on Saturday, so 6 empty slots) -->
            <div class="cal-date empty">-</div><div class="cal-date empty">-</div><div class="cal-date empty">-</div>
            <div class="cal-date empty">-</div><div class="cal-date empty">-</div><div class="cal-date empty">-</div>
            <div class="cal-date">1</div><div class="cal-date">2</div><div class="cal-date">3</div>
            <div class="cal-date">4</div><div class="cal-date">5</div><div class="cal-date">6</div>
            <div class="cal-date">7</div><div class="cal-date">8</div><div class="cal-date">9</div>
            <div class="cal-date">10</div><div class="cal-date">11</div><div class="cal-date">12</div>
            <div class="cal-date">13</div><div class="cal-date">14</div><div class="cal-date">15</div>
            <div class="cal-date">16</div><div class="cal-date">17</div><div class="cal-date">18</div>
            <div class="cal-date">19</div><div class="cal-date">20</div><div class="cal-date">21</div>
            
            <!-- Highlighted 22nd -->
            <div class="cal-date highlight">
              22
              <svg class="highlight-circle" viewBox="0 0 100 100">
                <path d="M50,10 A40,40 0 1,1 49.9,10" />
              </svg>
            </div>
            
            <div class="cal-date">23</div><div class="cal-date">24</div><div class="cal-date">25</div>
            <div class="cal-date">26</div><div class="cal-date">27</div><div class="cal-date">28</div>
            <div class="cal-date">29</div><div class="cal-date">30</div><div class="cal-date">31</div>
          </div>
          
          <div class="cal-action">
            <button id="add-calendar-btn" class="btn-outline" style="color:var(--deep-maroon); border-color:var(--deep-maroon);">+ Add to Calendar</button>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section id="gallery" class="section-pad">
      <div class="container">
        <h2 class="section-title reveal-up">Cherished Moments</h2>
        <div class="masonry">
          <div class="gallery-item reveal-up"><img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Indian Wedding Decor"></div>
          <div class="gallery-item reveal-up" style="transition-delay:0.2s;"><img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Jewelry"></div>
          <div class="gallery-item reveal-up" style="transition-delay:0.4s;"><img src="https://images.unsplash.com/photo-1590483866164-3e9a595304b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Traditional Setup"></div>
        </div>
      </div>
    </section>

    <!-- LOCATION / MAPS -->
    <section id="location">
      <div class="map-bg">
        <!-- Google Maps Embed -->
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.6917637500595!2d76.99342711531238!3d10.445963292546416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba836b2809fb0ab%3A0xc3c9a0937a075306!2sPollachi%20Main%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      
      <div class="location-card reveal-up">
        <h3>Yamuna Palace</h3>
        <p>319/1 Mullupadi Village<br>Pollachi Main Road<br>Mulluppadi, Tamil Nadu – 642109</p>
        <a href="https://www.google.com/maps/search/Yamuna+Palace+Mullupadi+Pollachi" target="_blank" class="btn-outline" style="color:var(--deep-maroon); border-color:var(--deep-maroon);">Open in Google Maps</a>
      </div>
    </section>

    <!-- THANK YOU -->
    <section id="thank-you" class="section-pad">
      <div class="container reveal-up">
        <h2 style="font-family:var(--font-serif); font-size:2rem; font-style:italic; margin-bottom:2rem; color:var(--champagne);">
          "Your presence would be the greatest gift we could receive.<br>Thank you for celebrating this beautiful evening with us."
        </h2>
        <p class="tracking-widest text-gold" style="font-size:0.8rem; margin-top:3rem;">With Love</p>
        
        <svg class="signature" viewBox="0 0 350 80">
          <path d="M 30,45 C 50,15 60,70 85,45 C 95,35 110,65 125,50 C 135,40 145,55 160,45" />
          <path d="M 175,45 C 180,40 185,50 190,45" />
          <path d="M 205,45 C 220,20 230,75 250,45 C 265,30 280,60 295,45 C 310,30 325,55 340,45" />
        </svg>
      </div>
    </section>

  </main>

  <script>
    /* CUSTOM CURSOR */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    window.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
      setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 50);
    });
    document.querySelectorAll('a, button, .btn-premium, .btn-outline, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hover-state'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hover-state'));
    });

    /* LOADER */
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2500);
    });

    /* 3D TILT & OPEN CARD */
    const overlay = document.getElementById('invite-overlay');
    const card = document.getElementById('card');
    const openBtn = document.getElementById('open-btn');
    const main = document.getElementById('main');
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let playing = false;

    overlay.addEventListener('mousemove', e => {
      if(!card.classList.contains('open')) {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        card.style.transform = \`rotateY(\${x}deg) rotateX(\${y}deg)\`;
      }
    });

    openBtn.addEventListener('click', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)'; // reset
      card.classList.add('open');
      
      // Falling Petals
      const emojis = ['🌸', '🌼', '🍃', '💮', '🪷'];
      for(let i=0; i<30; i++) {
        setTimeout(() => {
          const petal = document.createElement('div');
          petal.className = 'petal';
          petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          petal.style.left = Math.random() * 100 + 'vw';
          petal.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
          petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
          document.body.appendChild(petal);
        }, i * 200);
      }

      // Audio & Transition
      setTimeout(() => {
        overlay.classList.add('fade-out');
        document.body.classList.remove('locked');
        main.style.opacity = '1';
        musicBtn.classList.add('show');
        checkScroll();
      }, 2500);

      audio.volume = 0.4;
      audio.play().then(() => {
        playing = true;
        musicBtn.classList.add('playing');
      }).catch(err => console.log('Audio blocked'));
    });

    /* MUSIC TOGGLE */
    musicBtn.addEventListener('click', () => {
      if(playing) { audio.pause(); musicBtn.classList.remove('playing'); }
      else { audio.play(); musicBtn.classList.add('playing'); }
      playing = !playing;
    });

    /* PARALLAX & SCROLL EFFECTS */
    const parallaxTarget = document.getElementById('parallax-target');
    const nav = document.getElementById('nav');
    
    window.addEventListener('mousemove', e => {
      if(parallaxTarget) {
        const x = (window.innerWidth / 2 - e.clientX) * 0.02;
        const y = (window.innerHeight / 2 - e.clientY) * 0.02;
        parallaxTarget.style.transform = \`translate(\${x}px, \${y}px)\`;
      }
    });

    window.addEventListener('scroll', checkScroll);

    function checkScroll() {
      if(window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');

      document.querySelectorAll('.reveal-up, .calendar-wrapper, .signature').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight * 0.85) el.classList.add('in-view');
      });
    }

    /* ADD TO CALENDAR ICS */
    document.getElementById('add-calendar-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const ics = \`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Praveenkumar and Suryaprabha Wedding//EN
BEGIN:VEVENT
UID:reception-20260822
DTSTAMP:20260713T000000Z
DTSTART:20260822T123000Z
DTEND:20260822T153000Z
SUMMARY:Surya & Praveenkumar Wedding Reception
DESCRIPTION:You are cordially invited to our Wedding Reception!\\n\\nTime: 6:00 PM - 9:00 PM\\nVenue: Yamuna Palace, 319/1 Mullupadi Village, Pollachi Main Road, Tamil Nadu 642109\\n\\nWith Love,\\nR. Praveenkumar ❤️ C. Suryaprabha
LOCATION:Yamuna Palace, Pollachi, Tamil Nadu
BEGIN:VALARM
TRIGGER:-PT1440M
ACTION:DISPLAY
DESCRIPTION:Reminder: Surya & Praveenkumar Wedding Reception tomorrow!
END:VALARM
BEGIN:VALARM
TRIGGER:-PT120M
ACTION:DISPLAY
DESCRIPTION:Reminder: Surya & Praveenkumar Wedding Reception in 2 hours!
END:VALARM
END:VEVENT
END:VCALENDAR\`;
      
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Surya_Praveenkumar_Wedding.ics';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      const btn = e.target;
      const orig = btn.innerText;
      btn.innerText = 'Added! ✅';
      setTimeout(() => btn.innerText = orig, 3000);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
