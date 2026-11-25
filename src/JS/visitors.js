// Only the public site contributes to its shared daily counter.
if (location.origin === 'https://dozziny.github.io') {
    if (document.prerendering) {
        document.addEventListener('prerenderingchange', startCounter, { once: true });
    } else {
        startCounter();
    }
}

function startCounter() {
    const badge = document.getElementById('today-visitors');
    const number = badge?.querySelector('[data-count]');
    const dayLength = 24 * 60 * 60 * 1000;
    const seoulOffset = 9 * 60 * 60 * 1000;
    const dayKey = () => new Date(Date.now() + seoulOffset).toISOString().slice(0, 10);
    let entryDay = dayKey();
    let displayedDay;
    let midnightTimer;
    let revision = 0;

    function render(value) {
        if (!badge) return;
        badge.hidden = false;
        number.textContent = value === null ? '—' : value.toLocaleString('ko-KR');
        badge.title = value === null ? '오늘 방문 수 확인 중 · 한국 시간 기준' : '오늘 방문한 브라우저 수 · 한국 시간 기준';
        badge.setAttribute('aria-label', value === null ? '오늘 방문 수 확인 중' : '오늘 방문한 브라우저 ' + value + '개');
    }

    async function update(allowVisit) {
        const day = dayKey();
        const current = ++revision;
        if (displayedDay !== day) {
            displayedDay = day;
            render(null);
        }
        async function fetchValue(action) {
            const response = await fetch('https://abacus.jasoncameron.dev/' + action + '/dozziny.github.io/' + day, {
                cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', keepalive: true,
                signal: AbortSignal.timeout(10000)
            });
            const result = await response.json();
            const missingKey = action === 'get' && response.status === 404 && result.error === 'Key not found';
            const count = missingKey ? 0 : result.value;
            if ((!response.ok && !missingKey) || !Number.isSafeInteger(count) || count < 0) {
                throw new Error('Daily count unavailable');
            }
            return count;
        }
        async function requestCount() {
            if ((!allowVisit && !badge) || day !== dayKey()) return;
            // Check reachability before reserving the day so an outage can recover on reload.
            let count = await fetchValue('get');
            if (allowVisit && navigator.onLine && day === dayKey() && await reserveDay(day)) {
                count = await fetchValue('hit');
            }
            if (current === revision && day === dayKey()) render(count);
        }
        try {
            // Let a second tab read after the first tab finishes its increment.
            if (navigator.locks) await navigator.locks.request('dozziny-today', requestCount);
            else await requestCount();
        } catch {
            if (badge && current === revision && day === dayKey()) {
                render(null);
                badge.title = '오늘 방문 수를 불러오지 못했어요';
                badge.setAttribute('aria-label', badge.title);
            }
        }
    }

    function scheduleMidnight() {
        clearTimeout(midnightTimer);
        midnightTimer = setTimeout(() => {
            update(false);
            scheduleMidnight();
        }, dayLength - ((Date.now() + seoulOffset) % dayLength));
    }

    update(true);
    if (badge) scheduleMidnight();
    window.addEventListener('online', () => update(dayKey() === entryDay));
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            entryDay = dayKey();
            update(true);
        }
    });
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && badge) {
            update(false);
            scheduleMidnight();
        }
    });
}

// A read/write transaction makes the reservation once, even for simultaneous first visits.
// If the network response is lost, never replay a potentially successful increment.
function reserveDay(day) {
    return new Promise(resolve => {
        const open = indexedDB.open('dozziny-visits', 1);
        let blocked = false;
        open.onupgradeneeded = () => open.result.createObjectStore('visits');
        open.onerror = () => resolve(false);
        open.onblocked = () => { blocked = true; resolve(false); };
        open.onsuccess = () => {
            const db = open.result;
            if (blocked) { db.close(); return; }
            const transaction = db.transaction('visits', 'readwrite');
            const store = transaction.objectStore('visits');
            const lastDay = store.get('latest');
            let first = false;
            lastDay.onsuccess = () => {
                if (!lastDay.result || lastDay.result < day) {
                    store.put(day, 'latest');
                    first = true;
                }
            };
            transaction.oncomplete = () => { db.close(); resolve(first); };
            transaction.onabort = () => { db.close(); resolve(false); };
        };
    }).catch(() => false);
}
