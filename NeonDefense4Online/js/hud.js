// ═══════════════════════════════════════════════════════════════
//  N E O N   D E F E N S E — hud.js
//  HTML sidebar UI: resources, towers, upgrades, research, messages
// ═══════════════════════════════════════════════════════════════

import { TowerType, TOWER_DATA, TOWER_TYPES_ORDERED, RESEARCH_TRACKS,
         RESEARCH_TREE, getAvailableNodes, isTrackComplete, getTrackProgress,
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

        for (const trackKey of Object.keys(RESEARCH_TREE)) {
            const track = RESEARCH_TREE[trackKey];

            // Track container
            const trackEl = document.createElement('div');
            trackEl.className = 'research-track';
            trackEl.dataset.track = trackKey;

            // Track header: icon + name + progress
            const header = document.createElement('div');
            header.className = 'rt-header';
            header.innerHTML = `
                <span class="rt-icon">${track.icon}</span>
                <span class="rt-name">${track.name}</span>
                <span class="rt-progress" id="rt-prog-${trackKey}">0/4</span>
            `;
            trackEl.appendChild(header);

            // Completed nodes display
            const completedEl = document.createElement('div');
            completedEl.className = 'rt-completed';
            completedEl.id = `rt-completed-${trackKey}`;
            trackEl.appendChild(completedEl);

            // Available actions container — uses event delegation
            const actionsEl = document.createElement('div');
            actionsEl.className = 'rt-actions';
            actionsEl.id = `rt-actions-${trackKey}`;
            actionsEl.addEventListener('click', (e) => {
                const btn = e.target.closest('.rt-btn');
                if (!btn || btn.classList.contains('disabled')) return;
                const nodeId = btn.dataset.node;
                if (nodeId && this.callbacks.onResearch) this.callbacks.onResearch(nodeId);
            });
            // Tooltip delegation for research buttons
            actionsEl.addEventListener('mouseenter', (e) => {
                const btn = e.target.closest('.rt-btn');
                if (btn && btn.dataset.node) this._showResearchTooltip(e, btn.dataset.node);
            }, true);
            actionsEl.addEventListener('mouseleave', (e) => {
                const btn = e.target.closest('.rt-btn');
                if (btn) this._hideTooltip();
            }, true);
            trackEl.appendChild(actionsEl);

            // Tooltip delegation for completed chips
            completedEl.addEventListener('mouseenter', (e) => {
                const chip = e.target.closest('.rt-chip');
                if (chip && chip.dataset.node) this._showResearchTooltip(e, chip.dataset.node);
            }, true);
            completedEl.addEventListener('mouseleave', (e) => {
                const chip = e.target.closest('.rt-chip');
                if (chip) this._hideTooltip();
            }, true);

            container.appendChild(trackEl);
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
        this._showTooltipAt(e.currentTarget, `
            <div class="tt-title" style="color:rgb(${data.color.join(',')})">${data.name}</div>
            <div class="tt-desc">${data.description}</div>
            <div class="tt-stat">Damage: ${lvl0.damage}</div>
            <div class="tt-stat">Fire Rate: ${lvl0.fire_rate}s</div>
            <div class="tt-stat">Range: ${lvl0.range}</div>
            <div class="tt-stat">HP: ${data.hp}</div>
            <div class="tt-stat">Build Time: ${BUILD_TIMES[tt]}s</div>
            ${tt === TowerType.RAIL ? '<div class="tt-note">Click to aim after placing</div>' : ''}
        `);
    }

    _showResearchTooltip(e, nodeId) {
        const tips = this._getResearchTooltips();
        const tipData = tips[nodeId];
        if (!tipData) return;
        this._showTooltipAt(e.currentTarget, `
            <div class="tt-title" style="color:${tipData.color || 'var(--cyan)'}">${tipData.name}</div>
            <div class="tt-desc">${tipData.summary}</div>
            <div class="tt-note">${tipData.detail}</div>
        `);
    }

    _showTooltipAt(anchor, html) {
        let tip = document.getElementById('hud-tooltip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'hud-tooltip';
            tip.className = 'hud-tooltip';
            document.body.appendChild(tip);
        }
        tip.innerHTML = html;
        const rect = anchor.getBoundingClientRect();
        tip.style.display = 'block';
        tip.style.left = (rect.left - tip.offsetWidth - 8) + 'px';
        tip.style.top = rect.top + 'px';
        if (parseFloat(tip.style.left) < 0) {
            tip.style.left = (rect.right + 8) + 'px';
        }
        // Keep within viewport vertically
        const tipRect = tip.getBoundingClientRect();
        if (tipRect.bottom > window.innerHeight) {
            tip.style.top = Math.max(0, window.innerHeight - tipRect.height - 8) + 'px';
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
            // Find node name
            let nodeName = g.researchInProgress;
            for (const tk of Object.keys(RESEARCH_TREE)) {
                const track = RESEARCH_TREE[tk];
                for (const t of track.tiers) { if (t.id === g.researchInProgress) nodeName = t.name; }
                for (const bk of ['A', 'B']) {
                    const b = track.branches[bk];
                    if (b.id === g.researchInProgress) nodeName = b.name;
                    for (const ck of ['1', '2']) {
                        if (b.children[ck].id === g.researchInProgress) nodeName = b.children[ck].name;
                    }
                }
            }
            if (progText) progText.textContent = `${nodeName} — ${timeLeft.toFixed(1)}s`;
        } else {
            if (progContainer) progContainer.classList.add('hidden');
        }

        // Update each track
        const researching = g.researchInProgress !== null;

        for (const trackKey of Object.keys(RESEARCH_TREE)) {
            const track = RESEARCH_TREE[trackKey];
            const progress = getTrackProgress(trackKey, g.research);

            // Progress display
            const progEl = document.getElementById(`rt-prog-${trackKey}`);
            if (progEl) progEl.textContent = `${progress.done}/${progress.max}`;

            // Completed nodes
            const completedEl = document.getElementById(`rt-completed-${trackKey}`);
            if (completedEl) {
                let chips = '';
                // Show tier completions
                for (const t of track.tiers) {
                    if (g.research[t.id]) {
                        chips += `<span class="rt-chip" data-node="${t.id}" title="${t.desc}">${t.name}</span>`;
                    }
                }
                // Show branch completion
                for (const bk of ['A', 'B']) {
                    const b = track.branches[bk];
                    if (g.research[b.id]) {
                        chips += `<span class="rt-chip rt-chip-branch" data-node="${b.id}" title="${b.desc}">${b.name}</span>`;
                    }
                    for (const ck of ['1', '2']) {
                        if (g.research[b.children[ck].id]) {
                            chips += `<span class="rt-chip rt-chip-final" data-node="${b.children[ck].id}" title="${b.children[ck].desc}">${b.children[ck].name}</span>`;
                        }
                    }
                }
                if (completedEl._lastHtml !== chips) {
                    completedEl.innerHTML = chips;
                    completedEl._lastHtml = chips;
                }
            }

            // Available actions — only update DOM when content changes
            const actionsEl = document.getElementById(`rt-actions-${trackKey}`);
            if (actionsEl) {
                const available = getAvailableNodes(trackKey, g.research);
                let html = '';

                if (available.length === 0) {
                    if (progress.done > 0) {
                        html = '<span class="rt-complete">✓ COMPLETE</span>';
                    }
                } else if (available.length === 1) {
                    // Single next upgrade
                    const node = available[0];
                    const cost = g.getResearchCost ? g.getResearchCost(node.id) : node.cost;
                    const isActive = g.researchInProgress === node.id;
                    const canBuy = cost !== null && g.gold >= cost && !researching;
                    const cls = isActive ? 'rt-btn active-research' : canBuy ? 'rt-btn' : 'rt-btn disabled';
                    html = `<button class="${cls}" data-node="${node.id}" title="${node.desc}">
                        <span class="rt-btn-name">${node.name}</span>
                        <span class="rt-btn-desc">${node.desc}</span>
                        <span class="rt-btn-cost ${isActive ? 'researching' : canBuy ? 'affordable' : 'unaffordable'}">${isActive ? '⏳' : cost !== null ? cost + 'g' : 'MAX'}</span>
                    </button>`;
                } else {
                    // Branch choice — show 2 buttons with a "CHOOSE:" label
                    html = '<div class="rt-choice-label">CHOOSE SPECIALIZATION:</div><div class="rt-choice-row">';
                    for (const node of available) {
                        const cost = g.getResearchCost ? g.getResearchCost(node.id) : node.cost;
                        const isActive = g.researchInProgress === node.id;
                        const canBuy = cost !== null && g.gold >= cost && !researching;
                        const cls = isActive ? 'rt-btn rt-btn-choice active-research' : canBuy ? 'rt-btn rt-btn-choice' : 'rt-btn rt-btn-choice disabled';
                        // Build capstone preview from children
                        let capstonePrev = '';
                        if (node.children) {
                            const c1 = node.children['1'];
                            const c2 = node.children['2'];
                            capstonePrev = `<span class="rt-btn-unlocks">Unlocks: ${c1.name} / ${c2.name}</span>`;
                        }
                        // Show immediate effect (before the →) as desc
                        const immediateDesc = node.desc.includes('→') ? node.desc.split('→')[0].trim() : node.desc;
                        html += `<button class="${cls}" data-node="${node.id}" title="${node.desc}">
                            <span class="rt-btn-name">${node.name}</span>
                            <span class="rt-btn-desc">${immediateDesc}</span>
                            ${capstonePrev}
                            <span class="rt-btn-cost ${isActive ? 'researching' : canBuy ? 'affordable' : 'unaffordable'}">${isActive ? '⏳' : cost !== null ? cost + 'g' : ''}</span>
                        </button>`;
                    }
                    html += '</div>';
                }
                // Only touch DOM when content actually changed
                if (actionsEl._lastHtml !== html) {
                    actionsEl.innerHTML = html;
                    actionsEl._lastHtml = html;
                }
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
            actionsHtml += `<button class="tp-btn tp-btn-sell" data-action="sell">SELL (+${t.sellValue(mods.sell_refund || 0.60)}g)</button>`;
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

    _getResearchTooltips() {
        return {
            // ── Damage Track ──
            dmg_1: { name: 'Weapons I', summary: '+8% tower damage', detail: 'Applies to all tower types multiplicatively.', color: 'rgb(255,0,255)' },
            dmg_2: { name: 'Weapons II', summary: '+8% tower damage', detail: 'Stacks with Weapons I for +16% total.', color: 'rgb(255,0,255)' },
            dmg_A: { name: 'Precision', summary: '+10% damage', detail: 'Stacks additively with Weapons I/II.', color: 'rgb(255,0,255)' },
            dmg_A1: { name: 'Armor Piercing', summary: 'Ignore 50% enemy armor', detail: 'Effective armor is halved before damage reduction. Strongest vs Tanks, Armored, and Bosses.', color: 'rgb(255,0,255)' },
            dmg_A2: { name: 'Critical Systems', summary: '10% chance for double damage', detail: 'Each hit rolls independently. Works with all towers including AoE and chain hits.', color: 'rgb(255,0,255)' },
            dmg_B: { name: 'Overload', summary: '+10% damage', detail: 'Stacks additively with Weapons I/II.', color: 'rgb(255,0,255)' },
            dmg_B1: { name: 'Controlled Damage', summary: '+25% damage vs controlled enemies', detail: 'Triggers when enemy has ANY control: slow, vulnerability, DoT, or freeze.', color: 'rgb(255,0,255)' },
            dmg_B2: { name: 'Overdrive', summary: '+15% fire rate', detail: 'Reduces fire interval for all towers. Stacks multiplicatively with tower upgrades.', color: 'rgb(255,0,255)' },
            // ── Range Track ──
            rng_1: { name: 'Sensors I', summary: '+6% tower range', detail: 'Applies to all tower types.', color: 'rgb(50,255,100)' },
            rng_2: { name: 'Sensors II', summary: '+6% tower range', detail: 'Stacks with Sensors I for +12% total.', color: 'rgb(50,255,100)' },
            rng_A: { name: 'Long Optics', summary: '+8% range', detail: 'Stacks additively with Sensors I/II.', color: 'rgb(50,255,100)' },
            rng_A1: { name: 'Phase Scanner', summary: 'Phased enemies take normal damage', detail: 'Neutralizes phase damage reduction entirely. Phased enemies no longer resist attacks.', color: 'rgb(50,255,100)' },
            rng_A2: { name: 'Overwatch', summary: '+20% damage beyond 75% range', detail: 'Applies to ALL towers. Rewards long-range placement. Calculated per hit.', color: 'rgb(50,255,100)' },
            rng_B: { name: 'Wide Spectrum', summary: '+8% range', detail: 'Stacks additively with Sensors I/II.', color: 'rgb(50,255,100)' },
            rng_B1: { name: 'Field Amplifier', summary: 'Cryo/Nova/Tesla AoE +25%', detail: 'Increases effective radius of area towers. Does not affect Pulse or Rail.', color: 'rgb(50,255,100)' },
            rng_B2: { name: 'Proximity Boost', summary: '+25% damage within half range', detail: 'Applies to ALL towers. Rewards close-range placement.', color: 'rgb(50,255,100)' },
            // ── Control Track ──
            ctl_1: { name: 'Disruption I', summary: '+10% slow/vuln/DoT', detail: 'Strengthens all control effects by 10%.', color: 'rgb(150,220,255)' },
            ctl_2: { name: 'Disruption II', summary: '+10% slow/vuln/DoT', detail: 'Stacks with Disruption I for +20% total.', color: 'rgb(150,220,255)' },
            ctl_A: { name: 'Permafrost', summary: '+12% slow/vuln/DoT', detail: 'Stacks with Disruption I/II.', color: 'rgb(150,220,255)' },
            ctl_A1: { name: 'Deep Freeze', summary: 'Slow effects last 50% longer', detail: 'Affects Cryo tower slow duration. Enemies stay slowed much longer.', color: 'rgb(150,220,255)' },
            ctl_A2: { name: 'Shatter', summary: '+40% damage vs enemies below 30% HP', detail: 'Execute bonus. Helps finish off tough enemies faster.', color: 'rgb(150,220,255)' },
            ctl_B: { name: 'Corruption', summary: '+12% slow/vuln/DoT', detail: 'Stacks with Disruption I/II.', color: 'rgb(150,220,255)' },
            ctl_B1: { name: 'Cascade', summary: 'DoT +60%, tick +30%, spreads on kill', detail: 'When a DoT-affected enemy dies, DoT spreads to nearby enemies within 80px radius.', color: 'rgb(150,220,255)' },
            ctl_B2: { name: 'Suppression Field', summary: 'Controlled enemies deal 30% less to towers', detail: 'Enemies under slow, DoT, or vulnerability deal reduced damage to your towers.', color: 'rgb(150,220,255)' },
            // ── Fortify Track ──
            frt_1: { name: 'Reinforce I', summary: '+12% tower HP', detail: 'All towers gain 12% more max HP. Existing towers heal the difference.', color: 'rgb(0,255,255)' },
            frt_2: { name: 'Reinforce II', summary: '+12% tower HP', detail: 'Stacks with Reinforce I for +24% total.', color: 'rgb(0,255,255)' },
            frt_A: { name: 'Hardened', summary: '+15% tower HP', detail: 'Stacks with Reinforce I/II.', color: 'rgb(0,255,255)' },
            frt_A1: { name: 'Reactive Armor', summary: 'Towers take 40% less sapper damage', detail: 'Reduces all damage from Sapper enemy projectiles.', color: 'rgb(0,255,255)' },
            frt_A2: { name: 'Auto-Repair', summary: 'Towers regen 1.5% max HP/sec', detail: 'Passive regeneration. Towers slowly heal without spending gold.', color: 'rgb(0,255,255)' },
            frt_B: { name: 'Efficiency', summary: '+15% tower HP', detail: 'Stacks with Reinforce I/II.', color: 'rgb(0,255,255)' },
            frt_B1: { name: 'Emergency Overhaul', summary: '75% refund on tower destruction', detail: 'Destroyed towers refund 75% of invested gold. Rebuilding the same tower type within 30s builds 50% faster.', color: 'rgb(0,255,255)' },
            frt_B2: { name: 'Active Construction', summary: 'Towers fire at 50% while building', detail: 'Towers can attack during construction, upgrade, and branching at 50% damage effectiveness.', color: 'rgb(0,255,255)' },
        };
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
