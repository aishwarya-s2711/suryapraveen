const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. ADD QUOTES SECTION
// We'll insert it right after the COUNTDOWN section and before EVENT & LOCATION
const quotesHtml = `
    <!-- QUOTES -->
    <section id="quotes" class="section-pad">
      <div class="container reveal">
        <svg viewBox="0 0 100 50" style="width:100px; margin-bottom:2rem; opacity:0.5;">
          <path d="M20,40 Q50,-10 80,40" fill="none" stroke="var(--gold-dark)" stroke-width="1"/>
          <circle cx="50" cy="20" r="2" fill="var(--gold)"/>
        </svg>
        <blockquote style="font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: var(--gold-light); line-height: 1.8; max-width: 800px; margin: 0 auto;">
          "Anbum aranum udaithaayin ilvaazhkkai<br>Panbum payanum adhu."<br>
          <span style="display:block; font-family: var(--font-sans); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-top: 2rem; color: #888;">— Thirukkural (Love & Virtue)</span>
        </blockquote>
        <blockquote style="font-family: var(--font-serif); font-size: 1.5rem; font-style: italic; color: #ccc; line-height: 1.8; max-width: 700px; margin: 4rem auto 0;">
          "Two souls with but a single thought, two hearts that beat as one."
        </blockquote>
      </div>
    </section>
`;
content = content.replace('    <!-- EVENT & LOCATION -->', quotesHtml + '    <!-- EVENT & LOCATION -->');

// 2. UPDATE MUSIC WIDGET UI
const oldMusicWidget = `<div id="music-widget">
    <div class="vinyl-record" id="vinyl-btn"></div>
    <div class="music-controls">
      <button class="music-btn" id="vol-down">-</button>
      <span class="tracking-ultra" style="font-size:0.5rem; color:#888;">Vol</span>
      <button class="music-btn" id="vol-up">+</button>
    </div>
  </div>`;

const newMusicWidget = `<div id="music-widget">
    <div class="vinyl-record" id="vinyl-btn" title="Click to Spin/Pause"></div>
    <div class="music-controls">
      <button class="music-btn" id="play-pause-btn" title="Play/Pause">⏸</button>
      <button class="music-btn" id="mute-btn" title="Mute/Unmute">🔊</button>
      <input type="range" id="vol-slider" min="0" max="100" value="60" title="Volume">
    </div>
  </div>`;
content = content.replace(oldMusicWidget, newMusicWidget);

// 3. ADD CSS FOR SLIDER
const oldCss = `/* MUSIC PLAYER */`;
const newCss = `/* MUSIC PLAYER */
#vol-slider { width: 80px; accent-color: var(--gold); cursor: pointer; }
.music-btn { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; }`;
content = content.replace(oldCss, newCss);

// 4. UPDATE JS (YT PLAYER, FADE IN/OUT, SESSION STORAGE)
const jsStartStr = `/* ==================================
       YOUTUBE AUDIO SETUP
    ================================== */`;

const oldJsRegex = /\/\* ==================================\n       YOUTUBE AUDIO SETUP.*?(?=\/\* ==================================\n       COUNTDOWN TIMER LOGIC)/s;

const newJs = `/* ==================================
       YOUTUBE AUDIO SETUP
    ================================== */
    let ytPlayer;
    let isYtReady = false;
    let playing = false;
    let currentVol = parseInt(sessionStorage.getItem('ps_music_vol')) || 60;
    let isMuted = sessionStorage.getItem('ps_music_muted') === 'true';
    let fadeInterval;
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    function onYouTubeIframeAPIReady() {
      ytPlayer = new YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: 'h9toiopKXEQ', // Updated YouTube Shorts ID
        playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'loop': 1, 'playlist': 'h9toiopKXEQ', 'playsinline': 1 },
        events: { 'onReady': onPlayerReady }
      });
    }

    function onPlayerReady() {
      isYtReady = true;
      document.getElementById('vol-slider').value = currentVol;
      updateMuteIcon();
    }

    function fadeAudio(targetVolume, durationMs, callback) {
      clearInterval(fadeInterval);
      if (!isYtReady) return;
      
      let startVol = ytPlayer.getVolume();
      let steps = 20;
      let stepTime = durationMs / steps;
      let volDiff = targetVolume - startVol;
      let stepVol = volDiff / steps;
      let currentStep = 0;

      if (targetVolume > 0 && ytPlayer.getPlayerState() !== 1) {
         ytPlayer.setVolume(0);
         ytPlayer.playVideo();
      }

      fadeInterval = setInterval(() => {
        currentStep++;
        let newVol = Math.max(0, Math.min(100, startVol + (stepVol * currentStep)));
        ytPlayer.setVolume(newVol);
        
        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          ytPlayer.setVolume(targetVolume);
          if (targetVolume === 0 && ytPlayer.getPlayerState() === 1 && !isMuted) {
            ytPlayer.pauseVideo();
          }
          if (callback) callback();
        }
      }, stepTime);
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
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volSlider = document.getElementById('vol-slider');

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
          setTimeout(() => { p.style.transform = \`translateY(110vh) rotate(\${Math.random() * 720}deg) translateX(\${(Math.random()-0.5)*200}px)\`; }, 50);
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

      // Play Audio with Fade In
      if (isYtReady) {
        if (isMuted) { ytPlayer.setVolume(0); ytPlayer.playVideo(); }
        else { fadeAudio(currentVol, 2500); }
        playing = true;
        vinylBtn.classList.add('spinning');
        playPauseBtn.innerText = '⏸';
      }
    });

    /* ==================================
       MUSIC CONTROLS
    ================================== */
    function togglePlay() {
      if (!isYtReady) return;
      if (playing) { 
        fadeAudio(0, 1500, () => ytPlayer.pauseVideo());
        vinylBtn.classList.remove('spinning');
        playPauseBtn.innerText = '▶';
      } else { 
        if(isMuted) { ytPlayer.setVolume(0); ytPlayer.playVideo(); }
        else { fadeAudio(currentVol, 1500); }
        vinylBtn.classList.add('spinning');
        playPauseBtn.innerText = '⏸';
      }
      playing = !playing;
    }

    vinylBtn.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', togglePlay);

    function updateMuteIcon() {
      muteBtn.innerText = isMuted ? '🔇' : '🔊';
    }

    muteBtn.addEventListener('click', () => {
      if (!isYtReady) return;
      isMuted = !isMuted;
      sessionStorage.setItem('ps_music_muted', isMuted);
      updateMuteIcon();
      
      if(playing) {
        if (isMuted) fadeAudio(0, 1000);
        else fadeAudio(currentVol, 1000);
      }
    });

    volSlider.addEventListener('input', (e) => {
      currentVol = parseInt(e.target.value);
      sessionStorage.setItem('ps_music_vol', currentVol);
      if (playing && !isMuted && isYtReady) ytPlayer.setVolume(currentVol);
    });

    `;
    
content = content.replace(oldJsRegex, newJs);

fs.writeFileSync('index.html', content);
