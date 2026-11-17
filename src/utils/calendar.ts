const VENUE_MAPS_URL = 'https://maps.app.goo.gl/xci1FQXozgPz2u698';

export const GOOGLE_CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  'Sheetal & Prakash Ji — The Wedding'
)}&dates=20261205/20261206&details=${encodeURIComponent(
  `Join us in celebrating the wedding of Sheetal & Prakash Ji!\n\nCelebrations:\n• 03 Dec 2026: Haldi, Mehendi & Sangeet\n• 04 Dec 2026: Bindoli\n• 05 Dec 2026: The Wedding (Shubh Vivah)\n\nVenue Location: ${VENUE_MAPS_URL}`
)}&location=${encodeURIComponent(VENUE_MAPS_URL)}`;

export function downloadWeddingIcs(filename = 'sheetal_prakash_wedding.ics') {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sheetal and Prakash Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:sheetal-prakash-wedding-20261205@wedding',
    'DTSTAMP:20261116T000000Z',
    'DTSTART;VALUE=DATE:20261205',
    'DTEND;VALUE=DATE:20261206',
    'SUMMARY:Sheetal & Prakash Ji — The Wedding',
    `LOCATION:${VENUE_MAPS_URL}`,
    `DESCRIPTION:Join us in celebrating the wedding of Sheetal & Prakash Ji! Celebrations: 03 Dec 2026 (Haldi\\, Mehendi & Sangeet)\\, 04 Dec 2026 (Bindoli)\\, 05 Dec 2026 (The Wedding). Location: ${VENUE_MAPS_URL}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    "DESCRIPTION:Reminder: Sheetal & Prakash Ji's Wedding is tomorrow!",
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
