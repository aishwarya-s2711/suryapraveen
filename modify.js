const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const cssAdditions = `
    /* --- SOUTH INDIAN TRADITIONAL ELEMENTS --- */
    .texture-overlay {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.15;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .temple-bell {
      position: absolute; top: -10px; width: 45px; height: 75px;
      transform-origin: top center;
      animation: bellSway 4s ease-in-out infinite alternate;
      z-index: 100;
    }
    .temple-bell.left { left: 10%; }
    .temple-bell.right { right: 10%; animation-delay: 1s; }
    @keyframes bellSway {
      0% { transform: rotate(-8deg); }
      100% { transform: rotate(8deg); }
    }

    .thoranam {
      position: absolute; top: -5px; left: 0; width: 100%; height: 60px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cpath d='M0,0 Q10,40 20,0 Q30,45 40,0 Q50,40 60,0 Q70,45 80,0 Q90,40 100,0 Q110,45 120,0 Q130,40 140,0 Q150,45 160,0 Q170,40 180,0 Q190,45 200,0' fill='none' stroke='%234caf50' stroke-width='4'/%3E%3Cpath d='M10,20 Q15,40 20,20 M30,25 Q35,45 40,25 M50,20 Q55,40 60,20 M70,25 Q75,45 80,25' fill='none' stroke='%238bc34a' stroke-width='3'/%3E%3C/svg%3E") repeat-x top left;
      background-size: contain; z-index: 90; opacity: 0.9;
    }

    .kuthuvilakku {
      width: 70px; height: 140px;
      margin: 0 auto;
      filter: drop-shadow(0 10px 15px rgba(223, 186, 107, 0.4));
    }
    .flame {
      transform-origin: bottom center;
      animation: flicker 0.15s ease-in-out infinite alternate;
    }
    @keyframes flicker {
      0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
      100% { transform: scale(1.1) rotate(2deg); opacity: 1; }
    }

    .banana-leaf {
      position: absolute; width: 150px; height: 220px;
      opacity: 0.25; z-index: 1; pointer-events: none;
    }
    .banana-leaf.left { bottom: -20px; left: -30px; transform: rotate(15deg); }
    .banana-leaf.right { bottom: -20px; right: -30px; transform: scaleX(-1) rotate(15deg); }

    .kolam-divider {
      width: 100%; max-width: 250px; margin: 3rem auto;
    }
    .kolam-divider path {
      stroke: var(--gold); stroke-width: 1.2; fill: none;
      stroke-dasharray: 800; stroke-dashoffset: 800;
      transition: stroke-dashoffset 3s ease-out;
    }
    .kolam-divider.drawn path { stroke-dashoffset: 0; }
    
    /* Improve Card Opening fold */
    .card-3d-wrapper {
      perspective-origin: left center;
    }
    .card-cover {
      transform-origin: left center;
      transition: transform 2.5s cubic-bezier(0.25, 1, 0.3, 1);
    }
    .card-3d-wrapper.open .card-cover { 
      transform: rotateY(-160deg); 
    }
</style>`;
content = content.replace('</style>', cssAdditions);

content = content.replace('<div class="card-panel card-cover">', '<div class="card-panel card-cover">\n      <div class="texture-overlay"></div>');
content = content.replace('<div class="card-panel card-interior">', '<div class="card-panel card-interior">\n      <div class="texture-overlay"></div>');

const heroAdditions = `
  <section id="hero">
    <div class="thoranam"></div>
    
    <svg class="temple-bell left" viewBox="0 0 50 80">
      <path d="M25,5 C10,20 10,50 5,60 L45,60 C40,50 40,20 25,5 Z" fill="url(#goldGradient)" />
      <circle cx="25" cy="65" r="5" fill="#dfba6b" />
      <path d="M20,0 L30,0 L25,5 Z" fill="#b8860b" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cda851" />
          <stop offset="50%" stop-color="#dfba6b" />
          <stop offset="100%" stop-color="#b8860b" />
        </linearGradient>
      </defs>
    </svg>
    <svg class="temple-bell right" viewBox="0 0 50 80">
      <path d="M25,5 C10,20 10,50 5,60 L45,60 C40,50 40,20 25,5 Z" fill="url(#goldGradient)" />
      <circle cx="25" cy="65" r="5" fill="#dfba6b" />
      <path d="M20,0 L30,0 L25,5 Z" fill="#b8860b" />
    </svg>
`;
content = content.replace('<section id="hero">', heroAdditions);

const kolamSvgEvent = `
      <div class="kolam-divider reveal-up" id="divider-event">
        <svg viewBox="0 0 100 100">
          <path d="M50,10 C60,30 80,40 90,50 C80,60 60,70 50,90 C40,70 20,60 10,50 C20,40 40,30 50,10 Z M30,30 Q50,50 70,30 M30,70 Q50,50 70,70" />
          <circle cx="50" cy="50" r="4" fill="var(--gold)" />
          <circle cx="20" cy="50" r="2" fill="var(--gold)" />
          <circle cx="80" cy="50" r="2" fill="var(--gold)" />
          <circle cx="50" cy="20" r="2" fill="var(--gold)" />
          <circle cx="50" cy="80" r="2" fill="var(--gold)" />
        </svg>
      </div>
`;
content = content.replace(/<div class="drawing-divider" id="divider-event">[\s\S]*?<\/div>/, kolamSvgEvent);

const kolamSvgCountdown = `
      <div class="kolam-divider reveal-up" id="divider-countdown">
        <svg viewBox="0 0 100 100">
          <path d="M10,50 A40,40 0 1,1 90,50 A40,40 0 1,1 10,50 M30,50 A20,20 0 1,1 70,50 A20,20 0 1,1 30,50" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke-dasharray="4 4" />
        </svg>
      </div>
`;
content = content.replace(/<div class="drawing-divider" id="divider-countdown">[\s\S]*?<\/div>/, kolamSvgCountdown);

const kuthuSvg = `
      <div class="reveal-up" style="display:flex; justify-content:center; margin-bottom: 2rem;">
        <svg class="kuthuvilakku" viewBox="0 0 60 120">
          <path d="M25,110 L35,110 L40,120 L20,120 Z" fill="#b8860b" />
          <rect x="28" y="40" width="4" height="70" fill="#dfba6b" />
          <path d="M15,40 Q30,50 45,40 L40,30 L20,30 Z" fill="#cda851" />
          <path d="M30,5 L35,25 L25,25 Z" fill="#dfba6b" />
          <path class="flame" d="M30,30 Q35,25 30,15 Q25,25 30,30 Z" fill="#ffeb3b" />
          <path class="flame" d="M15,38 Q18,34 15,30 Q12,34 15,38 Z" fill="#ffeb3b" />
          <path class="flame" d="M45,38 Q48,34 45,30 Q42,34 45,38 Z" fill="#ffeb3b" />
        </svg>
      </div>
`;
content = content.replace('<div class="event-grid">', kuthuSvg + '\n      <div class="event-grid">');

const bananaLeaves = `
  <!-- EVENT DETAILS -->
  <section id="event-details">
    <svg class="banana-leaf left" viewBox="0 0 100 200"><path d="M50,190 C10,150 0,80 50,10 C100,80 90,150 50,190 Z" fill="#2e7d32"/><path d="M50,190 L50,10" stroke="#1b5e20" stroke-width="2"/></svg>
    <svg class="banana-leaf right" viewBox="0 0 100 200"><path d="M50,190 C10,150 0,80 50,10 C100,80 90,150 50,190 Z" fill="#2e7d32"/><path d="M50,190 L50,10" stroke="#1b5e20" stroke-width="2"/></svg>
`;
content = content.replace('<!-- EVENT DETAILS -->\n  <section id="event-details">', bananaLeaves);

const jsTilt = `
  /* ---- MOUSE TILT FOR CARD ---- */
  const overlayBox = document.getElementById('invitation-overlay');
  overlayBox.addEventListener('mousemove', function(e) {
    if(!cardWrapper.classList.contains('open')) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      cardWrapper.style.transform = \`rotateY(\${xAxis}deg) rotateX(\${yAxis}deg)\`;
    }
  });
  overlayBox.addEventListener('mouseleave', function() {
    if(!cardWrapper.classList.contains('open')) {
      cardWrapper.style.transform = \`rotateY(0deg) rotateX(0deg)\`;
    }
  });

  /* ---- MOUSE PARALLAX EFFECT ---- */
`;
content = content.replace('/* ---- MOUSE PARALLAX EFFECT ---- */', jsTilt);

const jsOpen = `
  /* ---- 3D BOOKLET ACTIONS ---- */
  openBtn.addEventListener('click', function() {
    cardWrapper.style.transform = 'rotateY(0deg) rotateX(0deg)'; // reset tilt
    cardWrapper.classList.add('open');
`;
content = content.replace("openBtn.addEventListener('click', function() {", jsOpen);

content = content.replace("const petals = ['🌸', '🪷', '🌼', '🌺'];", "const petals = ['🌸', '🍃', '🌼', '🌺', '💮'];");
content = content.replace("const dividers = document.querySelectorAll('.drawing-divider');", "const dividers = document.querySelectorAll('.drawing-divider, .kolam-divider');");

fs.writeFileSync('index.html', content);
