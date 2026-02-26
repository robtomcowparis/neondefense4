// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — hud.js
//  HTML sidebar UI: resources, towers, upgrades, research, messages
// ═══════════════════════════════════════════════════════════════

import { TowerType, TOWER_DATA, TOWER_TYPES_ORDERED, RESEARCH_TRACKS,
         BUILD_TIMES, ENEMY_DATA, EnemyType } from './config.js';

// ─── Message Queue ───────────────────────────────────────────
const messageQueue = [];
const MAX_MESSAGES = 4;
const MESSAGE_DURATION = 3500;

export function showHUDMessage(text, type = 'info') {
    messageQueue.push({ text, type, time: Date.now() });
    if (messageQueue.length > MAX_MESSAGES * 2) {
        messageQueue.splice(0, messageQueue.length - MAX_MESSAGES);
    }
    _renderMessages();
}

function _renderMessages() {
    const container = document.getElementById('messageArea');
    if (!container) return;
    const now = Date.now();
    // Filter active messages
    const active = messageQueue.filter(m => now - m.time < MESSAGE_DURATION);
    const recent = active.slice(-MAX_MESSAGES);
    container.innerHTML = '';
    for (const msg of recent) {
        const el = document.createElement('div');
        el.className = `hud-message hud-msg-${msg.type}`;
        const age = now - msg.time;
        if (age > MESSAGE_DURATION - 600) {
            el.style.opacity = Math.max(0, 1 - (age - (MESSAGE_DURATION - 600)) / 600);
        }
        el.textContent = msg.text;
        container.appendChild(el);
    }
}

// ─── HUD Class ───────────────────────────────────────────────
export class HUD {
    constructor(gameRef, callbacks) {
        this.game = gameRef;
        this.callbacks = callbacks; // { onSelectTowerType, onSendEarly, onClickTower, ... }
        this._lastState = {};
        this._buildSidebar();
        this._messageInterval = setInterval(() => _renderMessages(), 500);
    }

    _buildSidebar() {
        const sb = document.getElementById('sidebar');
        if (!sb) return;
        sb.innerHTML = `
            <div class="sb-header">
                <div class="sb-title">NEON DEFENSE</div>
                <div class="sb-controls">
                    <button id="btnMute" class="sb-icon-btn" title="Toggle Sound">🔊</button>
                    <span id="speedIndicator" class="speed-badge hidden">▶▶ 2×</span>
                </div>
            </div>
            <div class="sb-resources">
                <div class="res-row">
                    <span class="res-label">WAVE</span>
                    <span id="resWave" class="res-value res-wave">0</span>
                    <span id="resWaveStatus" class="res-status"></span>
                </div>
                <div class="res-row">
                    <span class="res-label">GOLD</span>
                    <span id="resGold" class="res-value res-gold">1000</span>
                    <span id="goldDelta" class="gold-delta"></span>
                </div>
                <div class="res-row">
                    <span class="res-label">LIVES</span>
                    <span id="resLives" class="res-value res-lives">30</span>
                </div>
            </div>
            <div id="waveControl" class="sb-wave-control">
                <div id="waveCountdownBar" class="wave-cd-bar">
                    <div id="waveCountdownFill" class="wave-cd-fill"></div>
                    <span id="waveCountdownText" class="wave-cd-text"></span>
                </div>
                <button id="btnSendEarly" class="btn-send-early hidden">
                    SEND WAVE <span id="earlyBonus" class="early-bonus"></span>
                </button>
            </div>
            <div class="sb-section">
                <div class="sb-section-title">RESEARCH</div>
                <div id="researchProgress" class="research-progress hidden">
                    <div id="resPrgFill" class="res-prg-fill"></div>
                    <span id="resPrgText" class="res-prg-text"></span>
                </div>
                <div id="researchTracks" class="research-tracks"></div>
            </div>
            <div class="sb-section">
                <div class="sb-section-title">TOWERS</div>
                <div id="towerButtons" class="tower-buttons"></div>
            </div>
            <div class="sb-section sb-tower-panel">
                <div id="towerPanel" class="tower-panel">
                    <div class="tower-panel-empty">Select or place a tower</div>
                </div>
            </div>
            <div id="messageArea" class="message-area"></div>
        `;

        this._panelFingerprint = '';
        this._buildResearchButtons();
        this._buildTowerButtons();
        this._bindEvents();
        this._bindTowerPanelDelegation();
    }

    /** Event delegation for tower panel buttons — survives innerHTML rebuilds */
    _bindTowerPanelDelegation() {
        const panel = document.getElementById('towerPanel');
        if (!panel) return;
        panel.addEventListener('click', (e) => {
            const btn = e.target.closest('.tp-btn');
            if (!btn || btn.classList.contains('disabled')) return;
            const action = btn.dataset.action;
            if (action && this.callbacks.onTowerAction) {
                this.callbacks.onTowerAction(action, btn.dataset.key);
            }
            e.stopPropagation();
        });
    }

    _buildResearchButtons() {
        const container = document.getElementById('researchTracks');
        if (!container) return;
        container.innerHTML = '';
        for (const track of Object.keys(RESEARCH_TRACKS)) {
            const info = RESEARCH_TRACKS[track];
            const el = document.createElement('button');
            el.className = 'research-btn';
            el.dataset.track = track;
            el.innerHTML = `
                <span class="rk-name">${track}</span>
                <span class="rk-level" id="rk-lvl-${track}">0/${info.max_level}</span>
                <span class="rk-cost" id="rk-cost-${track}"></span>
            `;
            el.addEventListener('click', () => {
                if (this.callbacks.onResearch) this.callbacks.onResearch(track);
            });
            container.appendChild(el);
        }
    }

    _buildTowerButtons() {
        const container = document.getElementById('towerButtons');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < TOWER_TYPES_ORDERED.length; i++) {
            const tt = TOWER_TYPES_ORDERED[i];
            const data = TOWER_DATA[tt];
            const el = document.createElement('button');
            el.className = 'tower-btn';
            el.dataset.type = tt;
            const r = data.color[0], g = data.color[1], b = data.color[2];
            el.style.setProperty('--tw-color', `rgb(${r},${g},${b})`);
            el.style.setProperty('--tw-glow', `rgba(${r},${g},${b},0.4)`);
            el.innerHTML = `
                <div class="tw-header">
                    <span class="tw-hotkey">${i + 1}</span>
                    <span class="tw-name">${data.name}</span>
                    <span class="tw-cost" id="tw-cost-${tt}"></span>
                </div>
                <div class="tw-desc">${data.description}</div>
            `;
            el.addEventListener('click', () => {
                if (this.callbacks.onSelectTowerType) this.callbacks.onSelectTowerType(tt);
            });
            el.addEventListener('mouseenter', (e) => {
                if (!('ontouchstart' in window) || window.innerWidth > 1024) this._showTowerTooltip(e, tt);
            });
            el.addEventListener('mouseleave', () => this._hideTooltip());
            container.appendChild(el);
        }
    }

    _showTowerTooltip(e, tt) {
        const data = TOWER_DATA[tt];
        const lvl0 = data.levels[0];
        let tip = document.getElementById('hud-tooltip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'hud-tooltip';
            tip.className = 'hud-tooltip';
            document.body.appendChild(tip);
        }
        tip.innerHTML = `
            <div class="tt-title" style="color:rgb(${data.color.join(',')})">${data.name}</div>
            <div class="tt-desc">${data.description}</div>
            <div class="tt-stat">Damage: ${lvl0.damage}</div>
            <div class="tt-stat">Fire Rate: ${lvl0.fire_rate}s</div>
            <div class="tt-stat">Range: ${lvl0.range}</div>
            <div class="tt-stat">HP: ${data.hp}</div>
            <div class="tt-stat">Build Time: ${BUILD_TIMES[tt]}s</div>
            ${tt === TowerType.RAIL ? '<div class="tt-note">Click to aim after placing</div>' : ''}
        `;
        const rect = e.currentTarget.getBoundingClientRect();
        tip.style.display = 'block';
        tip.style.left = (rect.left - tip.offsetWidth - 8) + 'px';
        tip.style.top = rect.top + 'px';
        // Keep on screen
        if (parseFloat(tip.style.left) < 0) {
            tip.style.left = (rect.right + 8) + 'px';
        }
    }

    _hideTooltip() {
        const tip = document.getElementById('hud-tooltip');
        if (tip) tip.style.display = 'none';
    }

    _bindEvents() {
        const btnSend = document.getElementById('btnSendEarly');
        if (btnSend) {
            btnSend.addEventListener('click', () => {
                if (this.callbacks.onSendEarly) this.callbacks.onSendEarly();
            });
        }
        const btnMute = document.getElementById('btnMute');
        if (btnMute) {
            btnMute.addEventListener('click', () => {
                if (this.callbacks.onToggleMute) {
                    const muted = this.callbacks.onToggleMute();
                    btnMute.textContent = muted ? '🔇' : '🔊';
                }
            });
        }
    }

    // ─── Per-frame update ────────────────────────────────────
    update() {
        const g = this.game;
        if (!g.waveMgr) return;

        // Resources
        _setText('resWave', g.waveMgr.currentWave);
        _setText('resGold', g.gold);
        _setText('resLives', g.lives);

        // Lives color
        const livesEl = document.getElementById('resLives');
        if (livesEl) {
            livesEl.classList.toggle('critical', g.lives <= 5);
            livesEl.classList.toggle('warning', g.lives > 5 && g.lives <= 15);
        }

        // Speed indicator
        const speedEl = document.getElementById('speedIndicator');
        if (speedEl) {
            speedEl.classList.toggle('hidden', g.speedMult <= 1.5);
        }

        // Wave status
        const statusEl = document.getElementById('resWaveStatus');
        if (statusEl) {
            if (g.waveMgr.spawning) {
                statusEl.textContent = 'In progress';
                statusEl.className = 'res-status active';
            } else if (g.waveMgr.countdownActive) {
                statusEl.textContent = 'Preparing';
                statusEl.className = 'res-status preparing';
            } else if (g.waveMgr.waveActive) {
                statusEl.textContent = 'Clearing';
                statusEl.className = 'res-status active';
            } else {
                statusEl.textContent = '';
                statusEl.className = 'res-status';
            }
        }

        // Wave control
        this._updateWaveControl();

        // Research
        this._updateResearch();

        // Tower buttons — update costs and affordability
        this._updateTowerButtons();

        // Tower info panel
        this._updateTowerPanel();
    }

    _updateWaveControl() {
        const g = this.game;
        const cdBar = document.getElementById('waveCountdownBar');
        const cdFill = document.getElementById('waveCountdownFill');
        const cdText = document.getElementById('waveCountdownText');
        const btnSend = document.getElementById('btnSendEarly');
        const earlyBonus = document.getElementById('earlyBonus');

        if (g.waveMgr.countdownActive && g.waveMgr.waveCountdown > 0 && !g.waveMgr.spawning) {
            if (cdBar) cdBar.classList.remove('hidden');
            if (btnSend) btnSend.classList.remove('hidden');
            // Determine max countdown for progress bar
            let maxCd = 18;
            if (g.waveMgr.currentWave === 0) maxCd = 18;
            else if (g.waveMgr.currentWave <= 1) maxCd = 15;
            else if (g.waveMgr.currentWave <= 2) maxCd = 10;
            else maxCd = 3;
            const pct = Math.max(0, (g.waveMgr.waveCountdown / maxCd) * 100);
            if (cdFill) cdFill.style.width = pct + '%';
            if (cdText) cdText.textContent = `Next wave: ${g.waveMgr.waveCountdown.toFixed(1)}s`;
            const bonus = Math.round(g.waveMgr.waveCountdown * 3);
            if (earlyBonus) earlyBonus.textContent = `(+${bonus}g)`;
        } else {
            if (cdBar) cdBar.classList.add('hidden');
            if (btnSend) btnSend.classList.add('hidden');
        }
    }

    _updateResearch() {
        const g = this.game;
        const progContainer = document.getElementById('researchProgress');
        const progFill = document.getElementById('resPrgFill');
        const progText = document.getElementById('resPrgText');

        if (g.researchInProgress) {
            if (progContainer) progContainer.classList.remove('hidden');
            const pct = g.researchDuration > 0 ? Math.min(100, (g.researchTimer / g.researchDuration) * 100) : 0;
            const timeLeft = Math.max(0, g.researchDuration - g.researchTimer);
            if (progFill) progFill.style.width = pct + '%';
            const targetLvl = (g.research[g.researchInProgress] || 0) + 1;
            if (progText) progText.textContent = `${g.researchInProgress} Lv.${targetLvl} — ${timeLeft.toFixed(1)}s`;
        } else {
            if (progContainer) progContainer.classList.add('hidden');
        }

        // Update research buttons
        const costMult = g.costMultiplier ? g.costMultiplier() : 1;
        for (const track of Object.keys(RESEARCH_TRACKS)) {
            const info = RESEARCH_TRACKS[track];
            const lvl = g.research[track] || 0;
            const lvlEl = document.getElementById(`rk-lvl-${track}`);
            const costEl = document.getElementById(`rk-cost-${track}`);
            if (lvlEl) lvlEl.textContent = `${lvl}/${info.max_level}`;

            const cost = g.getResearchCost ? g.getResearchCost(track) : null;
            const researching = g.researchInProgress !== null;
            const isThis = g.researchInProgress === track;

            if (costEl) {
                if (isThis) {
                    costEl.textContent = '⏳';
                    costEl.className = 'rk-cost researching';
                } else if (cost === null) {
                    costEl.textContent = 'MAX';
                    costEl.className = 'rk-cost maxed';
                } else {
                    costEl.textContent = `${cost}g`;
                    costEl.className = 'rk-cost' + (g.gold >= cost && !researching ? ' affordable' : ' unaffordable');
                }
            }

            // Button disabled state
            const btn = document.querySelector(`.research-btn[data-track="${track}"]`);
            if (btn) {
                const canBuy = cost !== null && g.gold >= cost && !researching;
                btn.classList.toggle('disabled', !canBuy);
                btn.classList.toggle('active-research', isThis);
            }
        }
    }

    _updateTowerButtons() {
        const g = this.game;
        const costMult = g.costMultiplier ? g.costMultiplier() : 1;

        for (const tt of TOWER_TYPES_ORDERED) {
            const data = TOWER_DATA[tt];
            const cost = Math.round(data.cost * costMult);
            const costEl = document.getElementById(`tw-cost-${tt}`);
            if (costEl) costEl.textContent = `${cost}g`;

            const btn = document.querySelector(`.tower-btn[data-type="${tt}"]`);
            if (btn) {
                btn.classList.toggle('unaffordable', g.gold < cost);
                btn.classList.toggle('selected', g.selectedTowerType === tt);
            }
        }
    }

    _updateTowerPanel() {
        const g = this.game;
        const panel = document.getElementById('towerPanel');
        if (!panel) return;

        if (g.selectedTower) {
            this._renderSelectedTower(panel, g.selectedTower);
        } else if (g.selectedTowerType) {
            const newFp = 'build-' + g.selectedTowerType;
            if (this._panelFingerprint === newFp) return;
            this._panelFingerprint = newFp;
            const data = TOWER_DATA[g.selectedTowerType];
            const bt = BUILD_TIMES[g.selectedTowerType] || 8;
            const isMobile = window.innerWidth <= 1024;
            const hint = g.selectedTowerType === TowerType.RAIL
                ? (isMobile ? 'Tap to place, then tap to aim.' : 'Place, then click to aim.')
                : (isMobile ? 'Tap a tile to place.' : 'Click a tile to place.');
            panel.innerHTML = `
                <div class="tp-header" style="--tw-color:rgb(${data.color.join(',')})">
                    <span class="tp-name">Build: ${data.name}</span>
                </div>
                <div class="tp-desc">${data.description}</div>
                <div class="tp-stat">HP: ${data.hp} &nbsp;|&nbsp; Build: ${bt}s</div>
                <div class="tp-hint">${hint}</div>
            `;
        } else {
            if (this._panelFingerprint !== 'empty') {
                this._panelFingerprint = 'empty';
                const emptyText = window.innerWidth <= 1024 ? 'Tap a tower above to build' : 'Select or place a tower';
                panel.innerHTML = `<div class="tower-panel-empty">${emptyText}</div>`;
            }
        }
    }

    /** Build a compact fingerprint of tower state that changes when we need a full re-render */
    _towerFingerprint(t) {
        const g = this.game;
        const mods = g.globalMods ? g.globalMods() : { fortify_mult: 1 };
        const fortifyMult = mods.fortify_mult;
        const maxHp = t.getMaxHp(fortifyMult);
        const costMult = g.costMultiplier ? g.costMultiplier() : 1;

        // Track affordability of each action (not raw gold — avoids re-render every kill)
        const canAffordUpgrade = t.canUpgrade() && g.gold >= t.upgradeCost(costMult);
        const canAffordRepair = t.hp < maxHp && g.gold >= t.repairCost(fortifyMult);
        const canAffordBranchA = t.canBranch() && t.data.branches.A && g.gold >= t.branchCost('A', costMult);
        const canAffordBranchB = t.canBranch() && t.data.branches.B && g.gold >= t.branchCost('B', costMult);
        const canAffordShield = t.canBuyShield() && g.gold >= t.shieldCost(costMult);

        return [
            t.col, t.row,  // tower identity
            t.type, t.level, t.branch,
            t.constructionState,
            t.canUpgrade(), t.canBranch(),
            t.hp < maxHp,
            t.fixedAngle !== null,
            t.shieldActive, t.shieldHp > 0,
            canAffordUpgrade, canAffordRepair, canAffordBranchA, canAffordBranchB, canAffordShield,
        ].join('|');
    }

    _renderSelectedTower(panel, t) {
        const g = this.game;
        const mods = g.globalMods ? g.globalMods() : { damage_mult: 1, range_mult: 1, control_mult: 1, fortify_mult: 1 };
        const fortifyMult = mods.fortify_mult;
        const maxHp = t.getMaxHp(fortifyMult);
        const hpRatio = t.hpRatio(fortifyMult);
        const costMult = g.costMultiplier ? g.costMultiplier() : 1;

        // ── Fast-path: only update dynamic values if structure hasn't changed ──
        const fp = this._towerFingerprint(t);
        if (fp === this._panelFingerprint) {
            // Structure same — just update numbers that change every frame
            this._patchTowerPanel(panel, t, mods, fortifyMult, maxHp, hpRatio, costMult);
            return;
        }
        this._panelFingerprint = fp;

        // ── Full re-render ──
        const hpClass = hpRatio > 0.5 ? 'hp-good' : hpRatio > 0.25 ? 'hp-warn' : 'hp-crit';

        let statsExtra = '';
        const stats = t.stats;
        if (stats.pierce) statsExtra += `Pierce: ${stats.pierce} &nbsp;`;
        if (stats.chains) statsExtra += `Chains: ${stats.chains} &nbsp;`;
        if (stats.slow_factor) statsExtra += `Slow: ${Math.round((1 - stats.slow_factor) * 100)}% &nbsp;`;
        if (stats.splash_radius) statsExtra += `Splash: ${stats.splash_radius}px &nbsp;`;
        if (stats.dot_damage) statsExtra += `DoT: ${stats.dot_damage}/s &nbsp;`;
        if (stats.vulnerability && stats.vulnerability > 1) statsExtra += `Vuln: +${Math.round((stats.vulnerability - 1) * 100)}% &nbsp;`;

        let actionsHtml = '';

        if (t.isConstructing) {
            const prog = t.constructionProgress;
            const stateLabels = { building: 'BUILDING', upgrading: 'UPGRADING', branching: 'SPECIALIZING', repairing: 'REPAIRING', shielding: 'SHIELDING' };
            const label = stateLabels[t.constructionState] || 'WORKING';
            const timeLeft = Math.max(0, t.constructionDuration - t.constructionTimer);
            actionsHtml = `
                <div class="tp-progress">
                    <div class="tp-prg-fill tp-prg-${t.constructionState}" style="width:${Math.round(prog * 100)}%"></div>
                    <span class="tp-prg-label">${label}... ${timeLeft.toFixed(1)}s — ${Math.round(prog * 100)}%</span>
                </div>
            `;
        } else {
            // Repair
            if (t.hp < maxHp) {
                const rc = t.repairCost(fortifyMult);
                const canRepair = g.gold >= rc;
                actionsHtml += `<button class="tp-btn tp-btn-repair ${canRepair ? '' : 'disabled'}" data-action="repair">REPAIR (${rc}g)</button>`;
            }
            // Upgrade
            if (t.canUpgrade()) {
                const uc = t.upgradeCost(costMult);
                const canUp = g.gold >= uc;
                actionsHtml += `<button class="tp-btn tp-btn-upgrade ${canUp ? '' : 'disabled'}" data-action="upgrade">UPGRADE (${uc}g)</button>`;
            } else if (t.canBranch()) {
                const branches = t.data.branches;
                actionsHtml += '<div class="tp-branches">';
                for (const key of ['A', 'B']) {
                    if (!branches[key]) continue;
                    const bd = branches[key];
                    const bc = t.branchCost(key, costMult);
                    const canBranch = g.gold >= bc;
                    actionsHtml += `
                        <button class="tp-btn tp-btn-branch ${canBranch ? '' : 'disabled'}" data-action="branch" data-key="${key}">
                            <span class="br-key">[${key}]</span> ${bd.name}
                            <span class="br-desc">${bd.desc}</span>
                            <span class="br-cost">${bc}g</span>
                        </button>
                    `;
                }
                actionsHtml += '</div>';
            } else {
                const label = t.branch ? `BRANCH: ${t.name}` : 'MAX LEVEL';
                actionsHtml += `<div class="tp-maxed">${label}</div>`;
            }

            // Shield (available after branching, consumable — buy anytime)
            if (t.canBuyShield()) {
                const sc = t.shieldCost(costMult);
                const canShield = g.gold >= sc;
                actionsHtml += `<button class="tp-btn tp-btn-shield ${canShield ? '' : 'disabled'}" data-action="shield">BUY SHIELD (${sc}g)</button>`;
            }

            // Rail set direction
            if (t.type === TowerType.RAIL && t.constructionState !== 'building') {
                const dirLabel = t.fixedAngle === null ? 'SET DIRECTION' : 'RE-AIM';
                actionsHtml += `<button class="tp-btn tp-btn-aim" data-action="aim">${dirLabel}</button>`;
            }

            // Sell
            actionsHtml += `<button class="tp-btn tp-btn-sell" data-action="sell">SELL (+${t.sellValue()}g)</button>`;
        }

        // Stats row
        const dmg = Math.round(t.effectiveDamage(mods));
        const rng = t.effectiveRange(mods);

        panel.innerHTML = `
            <div class="tp-header" style="--tw-color:rgb(${t.color.join(',')})">
                <span class="tp-name">${t.name}</span>
                <span class="tp-level">Lv.${t.level} ${t.branch ? `[${t.branch}]` : ''}</span>
            </div>
            <div class="tp-stats" data-id="tp-stats">
                Dmg: ${dmg} &nbsp; Rate: ${t.fireRate.toFixed(2)}s &nbsp; Rng: ${rng}
            </div>
            ${statsExtra ? `<div class="tp-stats-extra">${statsExtra}</div>` : ''}
            <div class="tp-hp ${hpClass}" data-id="tp-hp">
                <span class="tp-hp-text" data-id="tp-hp-text">HP: ${t.hp}/${maxHp}</span>
                <div class="tp-hp-bar">
                    <div class="tp-hp-fill" data-id="tp-hp-fill" style="width:${Math.round(hpRatio * 100)}%"></div>
                </div>
            </div>
            ${t.shieldActive && t.shieldHp > 0 ? `
            <div class="tp-shield" data-id="tp-shield">
                <span class="tp-shield-text" data-id="tp-shield-text">🛡 Shield: ${t.shieldHp}/${t.shieldMaxHp}</span>
                <div class="tp-shield-bar">
                    <div class="tp-shield-fill" data-id="tp-shield-fill" style="width:${Math.round((t.shieldHp / t.shieldMaxHp) * 100)}%"></div>
                </div>
            </div>` : ''}
            <div class="tp-tracker" data-id="tp-tracker">Dmg dealt: ${t.totalDamage} &nbsp; Kills: ${t.kills}</div>
            <div class="tp-actions">${actionsHtml}</div>
        `;

        // Event delegation: bind once on panel, use data-action to route
        // (replaces per-button listeners that broke on innerHTML rebuild)
    }

    /** Patch only the dynamic text/values without replacing DOM structure */
    _patchTowerPanel(panel, t, mods, fortifyMult, maxHp, hpRatio, costMult) {
        // Stats line
        const statsEl = panel.querySelector('[data-id="tp-stats"]');
        if (statsEl) {
            const dmg = Math.round(t.effectiveDamage(mods));
            const rng = t.effectiveRange(mods);
            statsEl.innerHTML = `Dmg: ${dmg} &nbsp; Rate: ${t.fireRate.toFixed(2)}s &nbsp; Rng: ${rng}`;
        }
        // HP
        const hpClass = hpRatio > 0.5 ? 'hp-good' : hpRatio > 0.25 ? 'hp-warn' : 'hp-crit';
        const hpEl = panel.querySelector('[data-id="tp-hp"]');
        if (hpEl) hpEl.className = `tp-hp ${hpClass}`;
        const hpText = panel.querySelector('[data-id="tp-hp-text"]');
        if (hpText) hpText.textContent = `HP: ${t.hp}/${maxHp}`;
        const hpFill = panel.querySelector('[data-id="tp-hp-fill"]');
        if (hpFill) hpFill.style.width = Math.round(hpRatio * 100) + '%';
        // Tracker
        const tracker = panel.querySelector('[data-id="tp-tracker"]');
        if (tracker) tracker.innerHTML = `Dmg dealt: ${t.totalDamage} &nbsp; Kills: ${t.kills}`;
        // Shield HP
        const shieldText = panel.querySelector('[data-id="tp-shield-text"]');
        const shieldFill = panel.querySelector('[data-id="tp-shield-fill"]');
        if (shieldText && t.shieldActive) {
            shieldText.textContent = `🛡 Shield: ${t.shieldHp}/${t.shieldMaxHp}`;
        }
        if (shieldFill && t.shieldActive && t.shieldMaxHp > 0) {
            shieldFill.style.width = Math.round((t.shieldHp / t.shieldMaxHp) * 100) + '%';
        }
        // Construction progress bar (updates every frame during construction)
        const prgFill = panel.querySelector('.tp-prg-fill');
        const prgLabel = panel.querySelector('.tp-prg-label');
        if (prgFill && prgLabel && t.isConstructing) {
            const prog = t.constructionProgress;
            const timeLeft = Math.max(0, t.constructionDuration - t.constructionTimer);
            const stateLabels = { building: 'BUILDING', upgrading: 'UPGRADING', branching: 'SPECIALIZING', repairing: 'REPAIRING', shielding: 'SHIELDING' };
            const label = stateLabels[t.constructionState] || 'WORKING';
            prgFill.style.width = Math.round(prog * 100) + '%';
            prgLabel.textContent = `${label}... ${timeLeft.toFixed(1)}s — ${Math.round(prog * 100)}%`;
        }
    }

    showGoldDelta(amount) {
        const el = document.getElementById('goldDelta');
        if (!el) return;
        el.textContent = amount > 0 ? `+${amount}` : `${amount}`;
        el.className = 'gold-delta ' + (amount > 0 ? 'positive' : 'negative');
        clearTimeout(this._goldDeltaTimeout);
        this._goldDeltaTimeout = setTimeout(() => {
            el.className = 'gold-delta';
            el.textContent = '';
        }, 1200);
    }

    destroy() {
        clearInterval(this._messageInterval);
    }
}

// ─── Helpers ─────────────────────────────────────────────────
function _setText(id, value) {
    const el = document.getElementById(id);
    if (el && el.textContent !== String(value)) el.textContent = value;
}
