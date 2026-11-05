(() => {
  const topics = [{"title": "Use Panopto in Canvas", "detail": "Access course videos and embedded videos in pages or modules", "url": "panopto-canvas.html", "terms": "canvas panopto course videos student faculty instructor module embedded watch access"}, {"title": "Sign in to Canvas", "detail": "SUNet account, SSO, and Authenticator prompts", "url": "canvas-sign-in.html", "terms": "canvas login log in sign in sso password university sunet authenticator"}, {"title": "Record directly in Panopto", "detail": "Prepare a recording with microphone, camera, and screen", "url": "panopto-basics.html#direct-recording", "terms": "panopto capture record create video camera microphone"},{title:"Find your Zoom recordings in Panopto",detail:"Faculty and staff: My Folder → Zoom Recordings",url:"zoom-recordings-panopto.html",terms:"zoom recording transfer panopto destination folder staff faculty meeting video missing find"},{title:"Zoom Help",detail:"Zoom Basics, hosting, web portal, recordings, and captions",url:"zoom-help.html",terms:"meeting zoom help guides training"},{title:"Room Technology",detail:"Connections, Apple TV, displays, and room sound",url:"apple-tv.html",terms:"conference study room equipment technology airplay"},{title:"Resources & Support",detail:"Browse guides and contact the Help Desk",url:"resources.html",terms:"training resources downloads videos pdf support helpdesk"},{title: "Sign in to Shenandoah Panopto", detail: "Choose Canvas, complete SSO, and authorize if prompted", url: "panopto-basics.html#sign-in", terms: "login log in signin canvas single sign on authorize authorization account panopto"},{"title": "Connect your Mac to Apple TV", "detail": "Apple TV basics and troubleshooting", "url": "apple-tv.html#mac-tv", "terms": "airplay conference study room wireless screen"}, {"title": "Mirror or extend your Mac display", "detail": "Mac basics and troubleshooting", "url": "mac-basics.html#mirror", "terms": "desktop settings displays arrangement duplicate screen"}, {"title": "The TV only shows my wallpaper", "detail": "Apple TV basics and troubleshooting", "url": "apple-tv.html#wallpaper", "terms": "missing window blank desktop background screen"}, {"title": "Share your iPad screen with Apple TV", "detail": "iPad basics and troubleshooting", "url": "ipad-basics.html#ipad-tv", "terms": "mirror airplay connect study conference room"}, {"title": "Arrange displays and find a missing window", "detail": "Mac basics and troubleshooting", "url": "mac-basics.html#arrange", "terms": "extended desktop mouse cursor main display settings"}, {"title": "Choose where your sound plays", "detail": "Mac basics and troubleshooting", "url": "mac-basics.html#sound", "terms": "audio speakers volume apple tv silent"}, {"title": "Find a downloaded file on iPad", "detail": "iPad basics and troubleshooting", "url": "ipad-basics.html#ipad-files", "terms": "files downloads documents"}, {"title": "Plan your first Panopto recording", "detail": "Panopto basics and troubleshooting", "url": "panopto-basics.html#panopto", "terms": "record video upload lesson capture share"},
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
  form.innerHTML = '<label for="site-search-input">Search technology help</label><input id="site-search-input" type="search" placeholder="Search help—for example, audio, files, or recording" autocomplete="off"><button type="submit" aria-label="Search">⌕</button><div class="search-results" hidden></div>';
  wrap.append(form);
  band.append(wrap);
  header.after(band);

  document.querySelectorAll('details.guide').forEach(d => { if ('#'+d.id === location.hash) d.open=true; });
  window.addEventListener('hashchange', () => { const target=document.getElementById(location.hash.slice(1)); if(target?.matches('details')) {target.open=true;target.scrollIntoView();} });
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
