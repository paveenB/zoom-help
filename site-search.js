(() => {
  const topics = [
    { title: 'Zoom Basics', detail: 'Sign in with SSO, start or join, audio, video, chat, and screen sharing', url: 'zoom-workplace.html', terms: 'desktop workplace application microphone speaker camera meeting controls' },
    { title: 'Troubleshoot audio and video', detail: 'Choose the correct microphone, speaker, or camera and test your devices', url: 'zoom-workplace.html', terms: 'cannot hear muted no sound camera not working update' },
    { title: 'Zoom Web Portal', detail: 'Recordings, profile, personal link, meetings, and account settings', url: 'zoom-web-portal.html', terms: 'su.zoom.us browser alias settings cloud recording' },
    { title: 'Host and secure a meeting', detail: 'Waiting Room, passcodes, participants, sharing, and host tools', url: 'host-secure-meeting.html', terms: 'faculty staff security authenticated lock mute cohost alternative host' },
    { title: 'Recordings, captions, and transcripts', detail: 'Enable captions, record appropriately, and share meeting records', url: 'recordings-captions.html', terms: 'accessibility closed caption more cloud recording email viewers' },
    { title: 'Request a Zoom Pro license', detail: 'Open the Shenandoah TeamDynamix request form', url: 'resources.html', terms: 'pro licence licensed request form teamdynamix account' },
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
