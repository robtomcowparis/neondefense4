// ============================================================
// sound.js — Procedural audio via Web Audio API
// ============================================================

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(ctx, freq, duration, type, volume, delay = 0) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = ctx.currentTime + delay;
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.01);
}

function playNoise(ctx, duration, volume, filterFreq, filterType = 'lowpass') {
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  if (filterFreq) {
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    source.connect(filter);
    filter.connect(gain);
  } else {
    source.connect(gain);
  }

  gain.connect(ctx.destination);
  source.start();
}

export function playSound(name) {
  const ctx = getCtx();

  switch (name) {
    case 'build':
      playTone(ctx, 440, 0.1, 'sine', 0.3);
      playTone(ctx, 660, 0.1, 'sine', 0.2, 0.1);
      break;

    case 'build_generator':
      // Ascending electric hum — warm power-up feel
      playTone(ctx, 220, 0.15, 'sine', 0.25);
      playTone(ctx, 330, 0.12, 'sine', 0.2, 0.1);
      playTone(ctx, 440, 0.15, 'triangle', 0.25, 0.2);
      playTone(ctx, 660, 0.2, 'sine', 0.15, 0.3);
      break;

    case 'denied':
      playTone(ctx, 200, 0.15, 'sawtooth', 0.3);
      break;

    case 'shoot':
      playNoise(ctx, 0.05, 0.4, 2000, 'bandpass');
      break;

    case 'explosion':
      playNoise(ctx, 0.3, 0.5, 500, 'lowpass');
      break;

    case 'bigExplosion':
      playNoise(ctx, 0.5, 0.7, 300, 'lowpass');
      break;

    case 'hit':
      playNoise(ctx, 0.04, 0.25, 3000, 'bandpass');
      break;

    case 'victory':
      // Ascending C-E-G-C
      playTone(ctx, 523, 0.15, 'sine', 0.3, 0);
      playTone(ctx, 659, 0.15, 'sine', 0.3, 0.15);
      playTone(ctx, 784, 0.15, 'sine', 0.3, 0.30);
      playTone(ctx, 1047, 0.25, 'sine', 0.35, 0.45);
      break;

    case 'defeat':
      // Descending
      playTone(ctx, 440, 0.15, 'sawtooth', 0.25, 0);
      playTone(ctx, 370, 0.15, 'sawtooth', 0.25, 0.15);
      playTone(ctx, 311, 0.2, 'sawtooth', 0.25, 0.30);
      playTone(ctx, 247, 0.35, 'sawtooth', 0.3, 0.50);
      break;

    case 'select':
      playTone(ctx, 880, 0.06, 'sine', 0.15);
      break;

    case 'cancel':
      playTone(ctx, 330, 0.08, 'triangle', 0.15);
      break;

    case 'shoot_pulse':
      playTone(ctx, 880, 0.06, 'sine', 0.6);
      break;

    case 'upgrade':
      playTone(ctx, 523, 0.1, 'sine', 0.25, 0);
      playTone(ctx, 659, 0.1, 'sine', 0.25, 0.1);
      playTone(ctx, 784, 0.12, 'sine', 0.3, 0.2);
      break;

    case 'baseAlert':
      playTone(ctx, 880, 0.08, 'sawtooth', 0.4);
      playTone(ctx, 440, 0.12, 'sawtooth', 0.35, 0.08);
      break;

    case 'shoot_heli':
      // Very short high-pitched rapid fire burst (minigun)
      playNoise(ctx, 0.04, 0.3, 4000, 'highpass');
      playTone(ctx, 1200, 0.03, 'square', 0.15);
      break;

    case 'heli_select':
      // Short confirmation chirp
      playTone(ctx, 660, 0.06, 'sine', 0.2);
      playTone(ctx, 990, 0.08, 'sine', 0.25, 0.06);
      break;

    case 'heli_rally':
      // Short ping when setting rally point
      playTone(ctx, 1320, 0.1, 'sine', 0.2);
      playTone(ctx, 880, 0.06, 'triangle', 0.15, 0.08);
      break;

    case 'wall_build':
      // Short metallic clank/construction sound
      playNoise(ctx, 0.08, 0.35, 1200, 'bandpass');
      playTone(ctx, 180, 0.1, 'square', 0.2, 0.03);
      playTone(ctx, 260, 0.06, 'triangle', 0.15, 0.1);
      break;

    case 'wall_repair':
      // Softer build sound with ascending tone (restoration feel)
      playTone(ctx, 330, 0.1, 'sine', 0.2);
      playTone(ctx, 440, 0.1, 'sine', 0.2, 0.08);
      playTone(ctx, 550, 0.12, 'triangle', 0.15, 0.16);
      break;

    case 'wall_break':
      // Heavy metallic crash/shatter
      playNoise(ctx, 0.4, 0.5, 400, 'lowpass');
      playTone(ctx, 120, 0.15, 'sawtooth', 0.3);
      playTone(ctx, 80, 0.25, 'square', 0.2, 0.1);
      break;

    case 'airstrike_incoming':
      // Distant jet engine approaching — rising pitch
      playTone(ctx, 80, 0.8, 'sawtooth', 0.15);
      playTone(ctx, 120, 0.6, 'sawtooth', 0.2, 0.3);
      playTone(ctx, 180, 0.5, 'sawtooth', 0.25, 0.6);
      playNoise(ctx, 1.2, 0.2, 600, 'lowpass');
      break;

    case 'airstrike_explosion':
      // Massive low-frequency explosion with rumble
      playNoise(ctx, 1.0, 0.8, 200, 'lowpass');
      playTone(ctx, 40, 0.8, 'sine', 0.5);
      playTone(ctx, 60, 0.6, 'sawtooth', 0.3, 0.05);
      playNoise(ctx, 0.5, 0.5, 400, 'lowpass');
      playTone(ctx, 30, 1.0, 'sine', 0.3, 0.1);
      break;

    case 'airstrike_confirm':
      // Dramatic confirmation — descending authority tone
      playTone(ctx, 880, 0.08, 'square', 0.3);
      playTone(ctx, 660, 0.08, 'square', 0.25, 0.1);
      playTone(ctx, 440, 0.12, 'square', 0.3, 0.2);
      playNoise(ctx, 0.15, 0.15, 2000, 'bandpass');
      break;
  }
}
