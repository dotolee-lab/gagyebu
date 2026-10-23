// 앱(PWA)용 서비스 워커 — 화면 파일만 저장해 두고, 데이터(Supabase)는 항상 인터넷에서 새로 받아요.
// 화면 파일을 고친 뒤 바로 반영이 안 되면 아래 버전 숫자를 하나 올려주세요.
const CACHE = 'dotori-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // 같은 사이트 파일만
  // 항상 인터넷 먼저 → 안 되면(오프라인) 저장해 둔 화면
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request)));
});
