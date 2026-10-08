(() => {
  const topics = [
    { title: 'Zoom Basics', detail: 'Sign in with SSO, start or join, audio, video, chat, and screen sharing', url: 'zoom-workplace.html', terms: 'desktop workplace application microphone speaker camera meeting controls' },
    { title: 'Troubleshoot audio and video', detail: 'Choose the correct microphone, speaker, or camera and test your devices', url: 'zoom-workplace.html', terms: 'cannot hear muted no sound camera not working update' },
    { title: 'Zoom Web Portal', detail: 'Recordings, profile, personal link, meetings, and account settings', url: 'zoom-web-portal.html', terms: 'su.zoom.us browser alias settings cloud recording' },
    { title: 'Host and secure a meeting', detail: 'Waiting Room, passcodes, participants, sharing, and host tools', url: 'host-secure-meeting.html', terms: 'faculty staff security authenticated lock mute cohost alternative host' },
    { title: 'Recordings, captions, and transcripts', detail: 'Enable captions, record appropriately, and share meeting records', url: 'recordings-captions.html', terms: 'accessibility closed caption more cloud recording email viewers' },
    { title: 'Request a Zoom Pro license', detail: 'Open the Shenandoah TeamDynamix request form', url: 'resources.html', terms: 'pro licence licensed request form teamdynamix account' },
    { title: 'Schedule a Zoom Room', detail: 'Use Google Calendar, a new meeting ID, or your personal Zoom link', url: 'schedule-zoom-room.html', terms: 'calendar add-on plugin reserve invite room' },
    { title: 'Find a Zoom Room', detail: 'Browse Loudoun and Winchester rooms by site or area, building, type, or controls', url: 'room-directory.html', terms: 'location inventory list conference classroom site area downtown building room loudoun scholar plaza winchester valley health medical campus hpb 2001' },
    { title: 'Choose Room Controls', detail: 'Identify the room interface in front of you', url: 'rooms.html', terms: 'touch panel conference classroom qsys device' },
    { title: 'Connect and present from a Mac', detail: 'Use the room computer, USB-C or HDMI, or Apple TV', url: 'connect-present.html', terms: 'laptop projector television airplay screen mirroring wired lectern source' },
    { title: 'Mirror or extend a Mac display', detail: 'Choose between showing the same screen or using a second desktop', url: 'connect-present.html#display-mode', terms: 'full screen background wallpaper presentation notes projector television displays' },
    { title: 'Choose room audio and video devices', detail: 'Select the correct Zoom microphone, speaker, and camera from a laptop', url: 'connect-present.html#zoom-devices', terms: 'usb conferencing hdmi sound output test mic speaker camera laptop' },
    { title: 'Show content in a Zoom Room', detail: 'Use Share or Share Content even for an entirely local audience', url: 'connect-present.html#local-or-zoom', terms: 'display presentation room only local class projector television' },
    { title: 'Share through the Zoom app', detail: 'Select the detected Room or enter the displayed sharing key', url: 'connect-present.html', terms: 'room code sharing key proximity mirror power point presenter notes desktop client' },
    { title: 'Logitech Tap conference room', detail: 'Use New Meeting, Join, Share, and conference-room controls', url: 'logitech-tap.html', terms: 'rally bar tap ip conference' },
    { title: 'Integrated Zoom Room', detail: 'Use the Zoom interface and Room Controls device selector', url: 'integrated-zoom-room.html', terms: 'room controls symbol select device source' },
    { title: 'Classroom touch panel', detail: 'Use the separate classroom room-control screen', url: 'classroom-touch-panel.html', terms: 'classroom controls device selection' },
    { title: 'Printable PDF guides', detail: 'View, download, or print Zoom and room-control quick starts', url: 'resources.html', terms: 'resources print download handout one page two sided' },
    { title: 'Zoom training', detail: 'Planned Zoom Basics, hosting, and Zoom Room training', url: 'resources.html#training', terms: 'workshop class guided learn course' },
    { title: 'Need help or support', detail: 'Find support information and assistance', url: 'resources.html#support', terms: 'contact assistance problem service desk' },
    { title: 'Download Zoom Workplace', detail: 'Get Zoom for a computer, iPhone, iPad, or Android device', url: 'zoom-workplace.html', terms: 'install client application app update mobile phone tablet ios ipad google play app store' }
  ];

  const header = document.querySelector('.header');
  if (!header) return;

  const band = document.createElement('div');
  band.className = 'search-band';
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const form = document.createElement('form');
  form.className = 'site-search';
  form.setAttribute('role', 'search');
  form.innerHTML = '<label for="site-search-input">Search Zoom help</label><input id="site-search-input" type="search" placeholder="Search help" autocomplete="off"><button type="submit" aria-label="Search">⌕</button><div class="search-results" hidden></div>';
  wrap.append(form);
  band.append(wrap);
  header.after(band);

  const input = form.querySelector('input');
  const results = form.querySelector('.search-results');

  function matches(query) {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return topics.filter(topic => {
      const text = `${topic.title} ${topic.detail} ${topic.terms}`.toLowerCase();
      return words.every(word => text.includes(word));
    }).slice(0, 7);
  }

  function render() {
    const found = matches(input.value);
    if (!input.value.trim()) {
      results.hidden = true;
      results.innerHTML = '';
      return;
    }
    results.innerHTML = found.length
      ? found.map(item => `<a href="${item.url}"><strong>${item.title}</strong><span>${item.detail}</span></a>`).join('')
      : '<div class="search-empty">No matching help topics found.</div>';
    results.hidden = false;
  }

  input.addEventListener('input', render);
  input.addEventListener('focus', render);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const first = matches(input.value)[0];
    if (first) window.location.href = first.url;
  });
  document.addEventListener('click', event => {
    if (!form.contains(event.target)) results.hidden = true;
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      results.hidden = true;
      input.blur();
    }
  });
})();
