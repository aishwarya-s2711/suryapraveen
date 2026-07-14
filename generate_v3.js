const fs = require('fs');

const css = `
/* ============================
   ULTRA-PREMIUM LUXURY THEME
============================ */
:root {
  --bg-core: #050302;
  --bg-deep: #0a0604;
  --ivory: #fffaef;
  --gold: #d4af37;
  --gold-light: #ebd298;
  --gold-dark: #8c6a1e;
  --maroon: #2a0808;
  
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Montserrat', sans-serif;
  
  --trans-slow: all 2s cubic-bezier(0.2, 0.9, 0.3, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; scroll-padding-top: 100px; }
body {
  font-family: var(--font-sans);
  background: var(--bg-core);
  color: #ccc;
  overflow-x: hidden;
  line-height: 2;
  -webkit-font-smoothing: antialiased;
}
body.locked { overflow: hidden; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-core); }
::-webkit-scrollbar-thumb { background: var(--gold-dark); }

h1, h2, h3, h4, h5 { font-family: var(--font-serif); font-weight: 400; color: var(--ivory); }
.text-gold { color: var(--gold); }
.tracking-ultra { letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.65rem; color: var(--gold-light); }

/* ============================
   CANVAS PARTICLES
============================ */
#particle-canvas {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.6;
}

/* ============================
   LOADER & INVITATION CARD (3D)
============================ */
#loader {
  position: fixed; inset: 0; z-index: 10000; background: var(--bg-core);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: opacity 1.5s ease;
}
#loader.hidden { opacity: 0; pointer-events: none; }
.loader-svg { width: 100px; height: 100px; animation: pulse 3s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.05); } }

#invite-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: radial-gradient(circle at center, rgba(42,8,8,0.95) 0%, rgba(5,3,2,0.98) 100%);
  display: flex; align-items: center; justify-content: center; perspective: 2500px;
  transition: opacity 2s var(--trans-slow);
}
#invite-overlay.fade-out { opacity: 0; pointer-events: none; }

.card-container {
  position: relative; width: 100%; max-width: 460px; height: 680px;
  transform-style: preserve-3d; transition: transform 3s cubic-bezier(0.2, 0.9, 0.1, 1);
  box-shadow: 0 50px 150px rgba(0,0,0,0.9);
}
.card-container.open { transform: rotateY(-180deg) translateZ(150px) scale(0.9); }

.card-panel {
  position: absolute; inset: 0; backface-visibility: hidden; border-radius: 2px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 4rem 2rem; overflow: hidden;
}

.paper-texture {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.15; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.card-cover {
  z-index: 2; transform-origin: left center; background: var(--ivory);
  transition: transform 3s cubic-bezier(0.2, 0.9, 0.1, 1);
  border: 10px solid #fff; box-shadow: inset 0 0 0 1px var(--gold-dark);
}
.card-container.open .card-cover { transform: rotateY(-165deg); }

.foil-decor {
  position: absolute; width: 80px; height: 80px; border: 1px solid var(--gold); opacity: 0.4;
}
.foil-decor.tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
.foil-decor.br { bottom: 20px; right: 20px; border-left: none; border-top: none; }

.cover-title { font-family: var(--font-serif); font-size: 2.8rem; color: var(--maroon); line-height: 1.1; margin: 2rem 0; }
.cover-title span { font-size: 1.2rem; display: block; font-style: italic; color: var(--gold-dark); margin: 1rem 0; }

.btn-luxury {
  background: transparent; color: var(--maroon); border: 1px solid var(--gold-dark);
  padding: 1rem 3rem; font-family: var(--font-sans); font-size: 0.65rem; letter-spacing: 0.3em;
  text-transform: uppercase; cursor: pointer; transition: all 0.5s ease;
  position: relative; overflow: hidden; margin-top: 3rem;
}
.btn-luxury:hover { background: var(--gold-dark); color: #fff; transform: translateY(-2px); }

.card-interior { background: var(--bg-core); z-index: 1; transform: rotateY(0deg); border: 2px solid var(--gold-dark); }

/* ============================
   LAYOUT & SECTIONS
============================ */
main { opacity: 0; transition: opacity 2s ease; position: relative; z-index: 2; }
.section-pad { padding: 15rem 2rem; position: relative; display: flex; flex-direction: column; align-items: center; }
.container { max-width: 1000px; margin: 0 auto; text-align: center; }

/* HERO */
#hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; }
.hero-names { font-size: clamp(3.5rem, 8vw, 7rem); line-height: 1; margin: 2rem 0; text-shadow: 0 10px 40px rgba(212,175,55,0.2); }
.glowing-heart {
  display: inline-block; font-size: 1.5rem; margin: 0 1.5rem; color: var(--gold);
  animation: heartbeat 2s infinite ease-in-out;
}
@keyframes heartbeat { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px var(--gold)); } 50% { transform: scale(1.3); filter: drop-shadow(0 0 20px var(--gold)); } }
.hero-glass-desc {
  margin: 4rem auto 0; max-width: 500px; padding: 2rem;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.1); backdrop-filter: blur(10px);
}

/* COUNTDOWN SECTION */
.countdown-grid {
  display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 4rem;
}
.cd-box {
  background: rgba(212,175,55,0.03); border: 1px solid rgba(212,175,55,0.2);
  padding: 2.5rem 2rem; width: 140px; text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
}
.cd-num { font-family: var(--font-serif); font-size: 3rem; color: var(--gold); line-height: 1; margin-bottom: 0.5rem; }
.cd-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: #888; }

/* EVENT & CALENDAR */
.premium-card {
  background: #0f0a07; border: 1px solid rgba(212,175,55,0.15); padding: 5rem 3rem;
  max-width: 800px; margin: 0 auto; position: relative;
  box-shadow: 0 30px 60px rgba(0,0,0,0.8);
}
.floral-arch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 150px; opacity: 0.5; }

/* LOCATION MAP */
.map-wrapper { margin-top: 4rem; position: relative; border-radius: 4px; overflow: hidden; border: 1px solid rgba(212,175,55,0.2); }
.map-wrapper iframe { width: 100%; height: 400px; border: none; filter: grayscale(50%) contrast(110%) sepia(20%); }

/* THANK YOU */
.grand-kuthuvilakku { width: 120px; opacity: 0.8; margin-bottom: 3rem; filter: drop-shadow(0 0 20px rgba(212,175,55,0.2)); }
.signature-svg { width: 300px; margin: 4rem auto; stroke: var(--gold); stroke-width: 1; fill: none; stroke-dasharray: 1000; stroke-dashoffset: 1000; transition: stroke-dashoffset 4s ease; }
.in-view .signature-svg { stroke-dashoffset: 0; }

/* REVEAL ANIMATIONS */
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 2s var(--trans-slow), transform 2s var(--trans-slow); }
.reveal.in-view { opacity: 1; transform: translateY(0); }

/* MUSIC PLAYER */
#music-widget {
  position: fixed; bottom: 3rem; right: 3rem; display: flex; align-items: center; gap: 1rem;
  background: rgba(10,6,4,0.8); backdrop-filter: blur(10px); border: 1px solid rgba(212,175,55,0.2);
  padding: 0.5rem 1.5rem 0.5rem 0.5rem; border-radius: 50px; z-index: 9000;
  opacity: 0; pointer-events: none; transition: opacity 1s;
}
#music-widget.show { opacity: 1; pointer-events: all; }
.vinyl-record {
  width: 40px; height: 40px; background: #111; border-radius: 50%; border: 2px solid #333;
  display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
}
.vinyl-record::after { content:''; width: 10px; height: 10px; background: var(--gold); border-radius: 50%; }
.vinyl-record.spinning { animation: spin 3s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
.music-controls { display: flex; align-items: center; gap: 1rem; }
.music-btn { background: none; border: none; color: var(--gold); cursor: pointer; font-size: 1rem; }
.music-btn:hover { color: #fff; }

@media (max-width: 768px) {
  .section-pad { padding: 8rem 1.5rem; }
  .hero-names { font-size: 2.5rem; }
  .glowing-heart { display: block; margin: 1rem 0; }
  .cd-box { width: 100px; padding: 1.5rem 1rem; }
  .cd-num { font-size: 2rem; }
  .premium-card { padding: 3rem 1.5rem; }
  #music-widget { bottom: 1.5rem; right: 1.5rem; padding: 0.5rem; }
  .music-controls { display: none; } /* Hide volume on mobile to save space */
}
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>R. Praveenkumar & C. Suryaprabha – Ultra Luxury Wedding</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400&display=swap" rel="stylesheet">
  
  <style>${css}</style>
</head>
<body class="locked">

  <!-- CANVAS BACKGROUND -->
  <canvas id="particle-canvas"></canvas>

  <!-- LOADER -->
  <div id="loader">
    <svg class="loader-svg" viewBox="0 0 100 100">
      <path d="M50,20 Q60,40 50,60 Q40,40 50,20" fill="none" stroke="var(--gold)" stroke-width="1"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="var(--gold)" stroke-width="0.5" stroke-dasharray="2 4"/>
    </svg>
    <p class="tracking-ultra" style="margin-top:2rem;">The Royal Union</p>
  </div>

  <!-- YOUTUBE AUDIO -->
  <div id="youtube-audio" style="position: absolute; width:0; height:0; opacity:0; pointer-events:none;"></div>

  <!-- 3D INVITATION OVERLAY -->
  <div id="invite-overlay">
    <div class="card-container" id="card">
      <div class="card-panel card-cover">
        <div class="paper-texture"></div>
        <div class="foil-decor tl"></div>
        <div class="foil-decor br"></div>
        
        <p class="tracking-ultra" style="color:var(--gold-dark); margin-bottom:2rem;">Wedding Reception</p>
        <h2 class="cover-title">R. Praveenkumar <span>❤️</span> C. Suryaprabha</h2>
        <p class="tracking-ultra" style="color:#777; margin-top:2rem;">22 August 2026</p>
        
        <button class="btn-luxury" id="open-btn">Open Invitation</button>
      </div>
      <div class="card-panel card-interior">
        <div class="paper-texture"></div>
        <svg width="60" height="60" viewBox="0 0 100 100" style="margin-bottom:2rem;">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--gold-dark)" stroke-width="1" stroke-dasharray="4 4" />
          <path d="M50,20 L60,40 L80,50 L60,60 L50,80 L40,60 L20,50 L40,40 Z" fill="var(--gold-dark)" opacity="0.3"/>
        </svg>
        <p style="font-family:var(--font-serif); font-size:1.2rem; font-style:italic; max-width:80%; line-height:2;">
          "Two souls, one beautiful journey. Join us as we celebrate the beginning of our forever."
        </p>
      </div>
    </div>
  </div>

  <!-- MUSIC WIDGET -->
  <div id="music-widget">
    <div class="vinyl-record" id="vinyl-btn"></div>
    <div class="music-controls">
      <button class="music-btn" id="vol-down">-</button>
      <span class="tracking-ultra" style="font-size:0.5rem; color:#888;">Vol</span>
      <button class="music-btn" id="vol-up">+</button>
    </div>
  </div>

  <main id="main">
    
    <!-- HERO -->
    <section id="hero" class="section-pad" style="padding-top: 0;">
      <div class="container" style="margin-top: 10vh;">
        <p class="tracking-ultra reveal">Cordially Invites You</p>
        <h1 class="hero-names reveal" style="transition-delay:0.2s;">
          Praveenkumar <span class="glowing-heart">❤️</span> Suryaprabha
        </h1>
        <div class="hero-glass-desc reveal" style="transition-delay:0.4s;">
          <p>"With hearts full of joy, we warmly invite you to celebrate our Wedding Reception and bless us with your gracious presence."</p>
        </div>
      </div>
    </section>

    <!-- COUNTDOWN -->
    <section id="countdown" class="section-pad">
      <div class="container reveal">
        <h2 style="font-size: 2rem; margin-bottom: 2rem; color:var(--gold);">The Wait Is Almost Over</h2>
        <div class="countdown-grid">
          <div class="cd-box">
            <div class="cd-num" id="cd-days">00</div>
            <div class="cd-label">Days</div>
          </div>
          <div class="cd-box">
            <div class="cd-num" id="cd-hours">00</div>
            <div class="cd-label">Hours</div>
          </div>
          <div class="cd-box">
            <div class="cd-num" id="cd-mins">00</div>
            <div class="cd-label">Minutes</div>
          </div>
          <div class="cd-box">
            <div class="cd-num" id="cd-secs">00</div>
            <div class="cd-label">Seconds</div>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENT & LOCATION -->
    <section id="event" class="section-pad">
      <div class="container reveal">
        <div class="premium-card">
          <svg class="floral-arch" viewBox="0 0 100 50">
            <path d="M10,50 Q50,-10 90,50" fill="none" stroke="var(--gold-dark)" stroke-width="1"/>
            <circle cx="50" cy="20" r="3" fill="var(--gold)"/>
          </svg>
          
          <h2 style="font-size:2.5rem; margin-bottom: 4rem; color:var(--ivory);">The Wedding Reception</h2>
          
          <div style="margin-bottom: 3rem;">
            <p class="tracking-ultra">Date & Time</p>
            <h3 style="font-size:1.8rem; margin:1rem 0; color:var(--gold);">22 August 2026</h3>
            <p>6:00 PM – 9:00 PM</p>
            <button id="add-calendar-btn" class="btn-luxury" style="margin-top:2rem;">Add to Google Calendar</button>
          </div>
          
          <hr style="border:0; height:1px; background:linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent); margin:4rem 0;">
          
          <div>
            <p class="tracking-ultra">Venue</p>
            <h3 style="font-size:1.8rem; margin:1rem 0; color:var(--gold);">Yamuna Palace</h3>
            <p>319/1 Mullupadi Village, Pollachi Main Road<br>Tamil Nadu – 642109</p>
            
            <div class="map-wrapper">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.6917637500595!2d76.99342711531238!3d10.445963292546416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba836b2809fb0ab%3A0xc3c9a0937a075306!2sPollachi%20Main%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            
            <button onclick="window.open('https://www.google.com/maps/search/Yamuna+Palace+Mullupadi+Pollachi', '_blank')" class="btn-luxury" style="margin-top:2rem;">Open in Maps</button>
          </div>
        </div>
      </div>
    </section>

    <!-- THANK YOU -->
    <section id="thank-you" class="section-pad">
      <div class="container reveal">
        <svg class="grand-kuthuvilakku" viewBox="0 0 100 200">
          <!-- Base -->
          <path d="M20,190 L80,190 L85,200 L15,200 Z" fill="var(--gold-dark)"/>
          <path d="M30,180 L70,180 L80,190 L20,190 Z" fill="var(--gold)"/>
          <!-- Stem -->
          <rect x="46" y="80" width="8" height="100" fill="var(--gold-light)"/>
          <!-- Top bowl -->
          <path d="M25,80 Q50,100 75,80 L65,70 L35,70 Z" fill="var(--gold)"/>
          <!-- Flames -->
          <path d="M50,50 Q55,40 50,20 Q45,40 50,50 Z" fill="#fff9c4"/>
          <path d="M25,65 Q30,60 25,50 Q20,60 25,65 Z" fill="#fff9c4"/>
          <path d="M75,65 Q80,60 75,50 Q70,60 75,65 Z" fill="#fff9c4"/>
        </svg>
        
        <h2 style="font-size:2.5rem; line-height:1.5; color:var(--ivory);">
          "Your presence would be the greatest gift we could receive. Thank you for celebrating this beautiful evening with us."
        </h2>
        <p class="tracking-ultra" style="margin-top:4rem;">With Love</p>
        
        <svg class="signature-svg" viewBox="0 0 350 80">
          <path d="M 30,45 C 50,15 60,70 85,45 C 95,35 110,65 125,50 C 135,40 145,55 160,45" />
          <path d="M 175,45 C 180,40 185,50 190,45" />
          <path d="M 205,45 C 220,20 230,75 250,45 C 265,30 280,60 295,45 C 310,30 325,55 340,45" />
        </svg>
      </div>
    </section>

  </main>

  <!-- YOUTUBE API & SCRIPTS -->
  <script>
    /* ==================================
       YOUTUBE AUDIO SETUP
    ================================== */
    let ytPlayer;
    let isYtReady = false;
    let playing = false;
    let currentVol = 60;
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    function onYouTubeIframeAPIReady() {
      ytPlayer = new YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: 'nDeGKa1dh2w',
        playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'loop': 1, 'playlist': 'nDeGKa1dh2w', 'playsinline': 1 },
        events: { 'onReady': () => isYtReady = true }
      });
    }

    /* ==================================
       LOADER & 3D INVITATION LOGIC
    ================================== */
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2000);
    });

    const overlay = document.getElementById('invite-overlay');
    const card = document.getElementById('card');
    const openBtn = document.getElementById('open-btn');
    const main = document.getElementById('main');
    const musicWidget = document.getElementById('music-widget');
    const vinylBtn = document.getElementById('vinyl-btn');

    overlay.addEventListener('mousemove', e => {
      if(!card.classList.contains('open')) {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        card.style.transform = \`rotateY(\${x}deg) rotateX(\${y}deg)\`;
      }
    });

    openBtn.addEventListener('click', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      card.classList.add('open');
      
      // Floating petals
      const emojis = ['🌸', '🌼', '🍃'];
      for(let i=0; i<40; i++) {
        setTimeout(() => {
          const p = document.createElement('div');
          p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          p.style.position = 'fixed';
          p.style.left = Math.random() * 100 + 'vw';
          p.style.top = '-10vh';
          p.style.zIndex = 9999;
          p.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
          p.style.transition = 'all 8s linear';
          document.body.appendChild(p);
          
          setTimeout(() => {
            p.style.transform = \`translateY(110vh) rotate(\${Math.random() * 720}deg) translateX(\${(Math.random()-0.5)*200}px)\`;
          }, 50);
          setTimeout(() => p.remove(), 8000);
        }, i * 150);
      }

      setTimeout(() => {
        overlay.classList.add('fade-out');
        document.body.classList.remove('locked');
        main.style.opacity = '1';
        musicWidget.classList.add('show');
        checkScroll();
      }, 3000);

      // Play Audio
      if (isYtReady && ytPlayer && ytPlayer.playVideo) {
        ytPlayer.setVolume(currentVol);
        ytPlayer.playVideo();
        playing = true;
        vinylBtn.classList.add('spinning');
      }
    });

    /* ==================================
       MUSIC CONTROLS
    ================================== */
    vinylBtn.addEventListener('click', () => {
      if (!isYtReady || !ytPlayer || !ytPlayer.playVideo) return;
      if (playing) { ytPlayer.pauseVideo(); vinylBtn.classList.remove('spinning'); } 
      else { ytPlayer.playVideo(); vinylBtn.classList.add('spinning'); }
      playing = !playing;
    });

    document.getElementById('vol-up').addEventListener('click', () => {
      if (isYtReady && currentVol < 100) { currentVol += 10; ytPlayer.setVolume(currentVol); }
    });
    document.getElementById('vol-down').addEventListener('click', () => {
      if (isYtReady && currentVol > 0) { currentVol -= 10; ytPlayer.setVolume(currentVol); }
    });

    /* ==================================
       COUNTDOWN TIMER LOGIC
    ================================== */
    const targetDate = new Date("Aug 22, 2026 18:00:00").getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const dist = targetDate - now;
      if (dist < 0) return;
      
      const d = Math.floor(dist / (1000 * 60 * 60 * 24));
      const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((dist % (1000 * 60)) / 1000);
      
      document.getElementById("cd-days").innerText = d < 10 ? "0"+d : d;
      document.getElementById("cd-hours").innerText = h < 10 ? "0"+h : h;
      document.getElementById("cd-mins").innerText = m < 10 ? "0"+m : m;
      document.getElementById("cd-secs").innerText = s < 10 ? "0"+s : s;
    }, 1000);

    /* ==================================
       SCROLL REVEAL LOGIC
    ================================== */
    window.addEventListener('scroll', checkScroll);
    function checkScroll() {
      document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('in-view');
      });
    }

    /* ==================================
       GOOGLE CALENDAR BUTTON
    ================================== */
    document.getElementById('add-calendar-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Surya+%26+Praveenkumar+Wedding+Reception&dates=20260822T123000Z/20260822T153000Z&details=You+are+cordially+invited+to+our+Wedding+Reception!%0A%0AWith+Love,%0AR.+Praveenkumar+%E2%9D%A4%EF%B8%8F+C.+Suryaprabha&location=Yamuna+Palace,+319/1+Mullupadi+Village,+Pollachi+Main+Road,+Tamil+Nadu';
      window.open(url, '_blank');
    });

    /* ==================================
       HTML5 CANVAS GOLDEN PARTICLES
    ================================== */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = \`rgba(212, 175, 55, \${this.opacity})\`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
