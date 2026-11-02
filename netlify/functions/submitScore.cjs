const admin = require('firebase-admin');

let initialized = false;
let db = null;

function initFirebase() {
    if (initialized) return;
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    db = admin.database();
    initialized = true;
}

exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);

        // Validate
        const name = (data.name || '').trim();
        if (!name || name.length > 20) {
            return { statusCode: 400, body: 'Invalid name' };
        }
        if (!Number.isInteger(data.waves) || data.waves < 1 || data.waves > 10000) {
            return { statusCode: 400, body: 'Invalid waves count' };
        }

        const entry = {
            name: name,
            waves: Math.floor(data.waves),
            kills: Math.max(0, Math.floor(data.kills || 0)),
            towers_built: Math.max(0, Math.floor(data.towers_built || 0)),
            towers_lost: Math.max(0, Math.floor(data.towers_lost || 0)),
            time_s: Math.max(0, Math.floor(data.time_s || 0)),
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now()
        };

        initFirebase();
        await db.ref('scores').push(entry);

        return { statusCode: 200, body: 'OK' };
    } catch (e) {
        console.error('submitScore error:', e);
        return { statusCode: 500, body: 'Internal error' };
    }
};
