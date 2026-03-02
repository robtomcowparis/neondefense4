// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — leaderboard.js
//  Global leaderboard (Firebase read) + secure submission (Netlify Function write)
// ═══════════════════════════════════════════════════════════════

// Firebase project config (public; used for READ ONLY from client)
const firebaseConfig = {
    apiKey: "AIzaSyC0fmWyajtcWHlixaUiL2wYEJ7RK-U4RBA",
    authDomain: "neondefense4.firebaseapp.com",
    databaseURL: "https://neondefense4-default-rtdb.firebaseio.com",
    projectId: "neondefense4",
    storageBucket: "neondefense4.firebasestorage.app",
    messagingSenderId: "254182583729",
    appId: "1:254182583729:web:eef93cc4419b6d394b6190"
};

let db = null;
let firebaseAvailable = false;
let leaderboardData = [];
let leaderboardListeners = [];
let lastPlayerName = '';

// Where the client submits scores (server-side validation + write)
const SUBMIT_ENDPOINT = '/.netlify/functions/submitScore';

// ─── Init ────────────────────────────────────────────────────
export async function initLeaderboard() {
    // Load cached name
    try { lastPlayerName = localStorage.getItem('neonDefenseName') || ''; } catch {}

    // Check if Firebase config is set
    if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
        console.log('Leaderboard: Firebase not configured, using local scores only.');
        _loadLocalScores();
        return;
    }

    try {
        // Dynamic import from CDN (READ ONLY on client)
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const { getDatabase, ref, query, orderByChild, limitToLast, onValue } =
            await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js');

        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        firebaseAvailable = true;

        // Listen for top scores
        const scoresRef = query(ref(db, 'scores'), orderByChild('waves'), limitToLast(25));
        onValue(scoresRef, (snapshot) => {
            const entries = [];
            snapshot.forEach(child => {
                entries.push({ key: child.key, ...child.val() });
            });
            // Sort descending by waves, then kills
            entries.sort((a, b) => (b.waves - a.waves) || (b.kills - a.kills));
            leaderboardData = entries.slice(0, 25);
            _notifyListeners();
        }, (err) => {
            console.warn('Leaderboard listener error:', err);
        });
    } catch (e) {
        console.warn('Leaderboard: Firebase init failed, using local scores.', e);
        _loadLocalScores();
    }
}

// ─── Submit Score ────────────────────────────────────────────
export async function submitScore(scoreData) {
    const name = (scoreData.name || '').trim();
    if (!name || name.length > 20 || scoreData.waves < 1) return false;

    // Save name for next time
    try { localStorage.setItem('neonDefenseName', name); } catch {}
    lastPlayerName = name;

    // Normalize & package
    const entry = {
        name: name,
        waves: Math.floor(scoreData.waves),
        kills: Math.floor(scoreData.kills || 0),
        towers_built: Math.floor(scoreData.towers_built || 0),
        towers_lost: Math.floor(scoreData.towers_lost || 0),
        time_s: Math.floor(scoreData.time_s || 0)
        // date/timestamp are added server-side (authoritative)
    };

    // Save locally always (offline fallback)
    _saveLocalScore({
        ...entry,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
    });

    // Submit to server (Netlify Function) — this is what prevents direct spoofing
    try {
        const res = await fetch(SUBMIT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });

        if (res.ok) return true;

        const msg = await res.text().catch(() => '');
        console.warn('Leaderboard: server rejected score:', msg);
    } catch (e) {
        console.warn('Leaderboard: failed to submit score to server:', e);
    }

    return false;
}

// ─── Getters ─────────────────────────────────────────────────
export function getLeaderboard() {
    return leaderboardData;
}

export function isAvailable() {
    return firebaseAvailable || leaderboardData.length > 0;
}

export function getLastPlayerName() {
    return lastPlayerName;
}

// ─── Listeners ───────────────────────────────────────────────
export function onLeaderboardUpdate(fn) {
    leaderboardListeners.push(fn);
}

function _notifyListeners() {
    for (const fn of leaderboardListeners) fn(leaderboardData);
}

// ─── Local fallback ──────────────────────────────────────────
function _loadLocalScores() {
    try {
        const data = localStorage.getItem('neonDefenseHighscores');
        if (data) {
            leaderboardData = JSON.parse(data);
            leaderboardData.sort((a, b) => (b.waves - a.waves) || (b.kills - a.kills));
            leaderboardData = leaderboardData.slice(0, 25);
        }
    } catch {}
    _notifyListeners();
}

function _saveLocalScore(entry) {
    try {
        const data = localStorage.getItem('neonDefenseHighscores');
        const scores = data ? JSON.parse(data) : [];
        scores.push(entry);
        scores.sort((a, b) => (b.waves - a.waves) || (b.kills - a.kills));
        const top = scores.slice(0, 25);
        localStorage.setItem('neonDefenseHighscores', JSON.stringify(top));
        if (!firebaseAvailable) {
            leaderboardData = top;
            _notifyListeners();
        }
    } catch {}
}
