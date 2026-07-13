const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace the audio tag
const audioRegex = /<!-- BACKGROUND MUSIC -->\s*<audio id="bg-music" loop>\s*<source src="cinematic_indian_instrumental.mp3" type="audio\/mpeg">\s*<\/audio>/;
const youtubeDiv = `<!-- BACKGROUND MUSIC -->
  <div id="youtube-audio" style="position: absolute; width: 0; height: 0; pointer-events: none; opacity: 0; border: none;"></div>`;
content = content.replace(audioRegex, youtubeDiv);

// 2. Add YouTube API JS right after <script>
const scriptStartRegex = /<script>/;
const ytApiJs = `<script>
    /* YOUTUBE AUDIO SETUP */
    let ytPlayer;
    let isYtReady = false;
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    function onYouTubeIframeAPIReady() {
      ytPlayer = new YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: 'nDeGKa1dh2w',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'disablekb': 1,
          'loop': 1,
          'playlist': 'nDeGKa1dh2w',
          'playsinline': 1
        },
        events: {
          'onReady': () => isYtReady = true
        }
      });
    }`;
content = content.replace(scriptStartRegex, ytApiJs);

// 3. Replace the audio playing logic inside openBtn click listener
// and the audio element declaration
content = content.replace("const audio = document.getElementById('bg-music');", "");

const oldPlayLogic = `      audio.volume = 0.4;
      audio.play().then(() => {
        playing = true;
        musicBtn.classList.add('playing');
      }).catch(err => console.log('Audio blocked'));`;

const newPlayLogic = `      if (isYtReady && ytPlayer && ytPlayer.playVideo) {
        ytPlayer.setVolume(60);
        ytPlayer.playVideo();
        playing = true;
        musicBtn.classList.add('playing');
      }`;
content = content.replace(oldPlayLogic, newPlayLogic);

const oldToggleLogic = `    /* MUSIC TOGGLE */
    musicBtn.addEventListener('click', () => {
      if(playing) { audio.pause(); musicBtn.classList.remove('playing'); }
      else { audio.play(); musicBtn.classList.add('playing'); }
      playing = !playing;
    });`;

const newToggleLogic = `    /* MUSIC TOGGLE */
    musicBtn.addEventListener('click', () => {
      if (!isYtReady || !ytPlayer || !ytPlayer.playVideo) return;
      if (playing) { 
        ytPlayer.pauseVideo(); 
        musicBtn.classList.remove('playing'); 
      } else { 
        ytPlayer.playVideo(); 
        musicBtn.classList.add('playing'); 
      }
      playing = !playing;
    });`;
content = content.replace(oldToggleLogic, newToggleLogic);

fs.writeFileSync('index.html', content);
