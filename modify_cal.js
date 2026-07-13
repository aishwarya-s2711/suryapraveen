const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace the Save the Date link with a button
content = content.replace(
  '<a href="#event-details" class="btn-gold">Save the Date</a>',
  '<button id="save-date-btn" class="btn-gold">Save the Date</button>'
);

// Add the JS logic at the end of the script, before })();
const jsLogic = `
  /* ---- SAVE THE DATE CALENDAR LOGIC ---- */
  const saveDateBtn = document.getElementById('save-date-btn');
  if (saveDateBtn) {
    saveDateBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const icsContent = \`BEGIN:VCALENDAR
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
      
      // Create blob and download
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Surya_Praveenkumar_Wedding.ics';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Optional: Add a tiny ripple or success state
      const originalText = saveDateBtn.innerHTML;
      saveDateBtn.innerHTML = 'Saved! ✅';
      setTimeout(() => {
        saveDateBtn.innerHTML = originalText;
      }, 3000);
    });
  }
`;

content = content.replace('})();\n</script>', jsLogic + '\n})();\n</script>');

fs.writeFileSync('index.html', content);
