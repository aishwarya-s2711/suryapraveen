const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace the mixkit audio with a local reference to a cinematic instrumental
content = content.replace(
  '<source src="https://assets.mixkit.co/music/preview/mixkit-indian-traditional-music-2432.mp3" type="audio/mpeg" />',
  '<source src="cinematic_indian_instrumental.mp3" type="audio/mpeg" />'
);

fs.writeFileSync('index.html', content);
