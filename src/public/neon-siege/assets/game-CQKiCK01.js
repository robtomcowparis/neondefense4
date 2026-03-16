(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const Hn=1600,wn=1600,Z=40,Vt=Hn/Z,je=wn/Z,tt=0,kt=1,Ml="menu",Wa="playing",Lc="paused",rp="victory",op="defeat",$o=1,yl=13,Xa=14,Fi=26,lp=27,e0=38,As=19,Ii=36,li=19,bn=2,Rn="core",Ce="barracks",Me="turret",ye="factory",oe="generator",tn="helipad",ie="wall",se={[Rn]:{hp:5e3,cost:0,size:3,buildTime:0,label:"Core",description:"Main base. Destroy the enemy core to win."},[Ce]:{hp:400,cost:75,size:2,buildTime:5,produceUnit:"rifle",produceTime:16,label:"Barracks",description:"Produces Rifle infantry. Upgradeable.",levels:[{produceTime:16,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:13,hpMult:1.2,damageMult:1.15,speedMult:1,upgradeCost:100},{produceTime:10,hpMult:1.4,damageMult:1.3,speedMult:1,upgradeCost:200}],branches:{A:{name:"Assault Doctrine",desc:"Trains Assault units",cost:400,produceUnit:"assault",produceTime:12,hpMult:1.5,damageMult:1.4,speedMult:1},B:{name:"Rapid Deployment",desc:"Fast production + speed",cost:450,produceUnit:"rifle",produceTime:7,hpMult:1.3,damageMult:1.2,speedMult:1.25}}},[Me]:{hp:200,cost:120,size:1,buildTime:6,color:[0,255,255],label:"Pulse Turret",description:"Rapid-fire energy bolts. Upgradeable.",levels:[{damage:12,fireRate:.35,range:120,upgradeCost:0},{damage:20,fireRate:.28,range:135,upgradeCost:100},{damage:32,fireRate:.2,range:155,upgradeCost:200}],branches:{A:{name:"Overclock",desc:"Insane fire rate",cost:550,damage:28,fireRate:.09,range:160},B:{name:"Heavy Bolts",desc:"Splash on hit",cost:600,damage:55,fireRate:.25,range:165,splashRadius:50,splashDamage:25}}},[ye]:{hp:600,cost:225,size:2,buildTime:8,produceUnit:"tank",produceTime:32,label:"Factory",description:"Produces Tank units. Upgradeable.",levels:[{produceTime:32,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:26,hpMult:1.15,damageMult:1.1,speedMult:1,upgradeCost:175},{produceTime:22,hpMult:1.3,damageMult:1.25,speedMult:1,upgradeCost:350}],branches:{A:{name:"Heavy Armor",desc:"Massive HP, slower build",cost:600,produceUnit:"tank",produceTime:28,hpMult:1.8,damageMult:1.2,speedMult:.85},B:{name:"Siege Cannons",desc:"High damage + range",cost:550,produceUnit:"tank",produceTime:22,hpMult:1.2,damageMult:1.6,speedMult:1,rangeMult:1.3}}}},n0=60,i0=50;se[oe]={hp:150,cost:60,size:1,buildTime:5,label:"Generator",description:"Increases energy income. Upgradeable.",incomeBonus:3,levels:[{incomeBonus:3,territoryMult:1,upgradeCost:0},{incomeBonus:6,territoryMult:1,upgradeCost:100},{incomeBonus:9,territoryMult:1,upgradeCost:200}],branches:{A:{name:"Overcharge",desc:"Maximum energy output",cost:500,incomeBonus:13,territoryMult:1},B:{name:"Capacitor Network",desc:"Income + 2x territory bonus",cost:425,incomeBonus:7,territoryMult:2}}};function Uc(e){return n0+e*i0}se[tn]={hp:500,cost:300,size:2,buildTime:10,produceUnit:"helicopter",produceTime:40,label:"Helipad",description:"Produces Helicopters. Upgradeable.",levels:[{produceTime:40,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:34,hpMult:1.15,damageMult:1.15,speedMult:1,upgradeCost:200},{produceTime:28,hpMult:1.3,damageMult:1.3,speedMult:1,upgradeCost:400}],branches:{A:{name:"Gunship Bay",desc:"Heavy firepower helicopters",cost:600,produceUnit:"helicopter",produceTime:30,hpMult:1.2,damageMult:1.6,speedMult:1},B:{name:"Rapid Scramble",desc:"Fast production + speed",cost:550,produceUnit:"helicopter",produceTime:20,hpMult:1.1,damageMult:1.1,speedMult:1.15}}};se[ie]={hp:120,cost:25,size:1,buildTime:3,label:"Wall",description:"Destructible barrier. Block and funnel enemies.",repairCost:10,repairTime:2,levels:[{hp:120,upgradeCost:0},{hp:250,upgradeCost:30},{hp:400,upgradeCost:60}]};const cp=[Ce,Me,ye,oe,tn,ie],Rs="rifle",Ua="assault",js="tank",xn="helicopter",na="medic",ia="engineer",Zo={[Rs]:{hp:50,speed:35,damage:8,range:120,fireRate:1,size:6,label:"Rifle"},[Ua]:{hp:160,speed:28,damage:14,range:100,fireRate:.8,size:8,label:"Assault"},[js]:{hp:400,speed:16,damage:35,range:160,fireRate:.5,size:14,label:"Tank"},[xn]:{hp:700,speed:60,damage:4,range:240,fireRate:8,size:10,label:"Helicopter",isAir:!0},[na]:{hp:60,speed:42,damage:0,range:80,fireRate:0,size:6,label:"Medic",isSupport:!0,healRate:8,healRange:80,healTargets:["rifle","assault"]},[ia]:{hp:200,speed:22,damage:0,range:100,fireRate:0,size:10,label:"Engineer",isSupport:!0,healRate:15,healRange:100,healTargets:["tank"]}},Sl=60,s0=120,a0=.6,r0=80,eu=400,o0=2,nu=500,l0=1.5,Jn=10,Ln={barracks:4,turrets:4,factories:3,generators:6,helipads:2,walls:12},Un={build:{barracks:4,turret:25,factory:45,generator:3,helipad:80,wall:35},shared:{turret:80,generator:70,wall:50},upgrade:{turret:40,barracks:30,factory:65,generator:35,helipad:100,wall:55}},zl=600,iu=1e3,c0=.5,su=.15,_i={rallyRow:9,minSize:3,minWaveStrength:500,turretPower:250,wallPower:80,cooldownAfterFailure:10,failureStrengthMult:.3,sizeGrow:2,sizeShrink:1,maxSize:10},dp=29,hp=4,up=20,d0=150,au=1.8,h0=1.2,u0=3,f0=.3,p0=.5,Nc=350,m0=500,zt={BG:263184,CYAN:65535,GOLD:16766720,RED:16724530,PLAYER:65535,ENEMY:16724530,FACTORY:16766720,HELIPAD:3342180,UNIT_PLAYER:65535,UNIT_ENEMY:16724530,PROJECTILE_PLAYER:65535,PROJECTILE_ENEMY:16724530,BUILD_VALID:65535,BUILD_INVALID:16724530},_0=55,g0=1,x0=5e3,v0=900,M0=500,y0=.25,S0=Math.PI/2.1,E0=200,w0=2400,T0=.06,b0=1710638,A0=.75,R0=12634367,C0=1.1,P0=4210848,D0=.45,I0=1710654,L0=526352,U0=.5,N0=4491468,F0=.5,O0=.3,B0=.14,z0=.68,H0=.4,G0=.12,za=.15,Hl=3,ru=37,Gl=2,ou=37,io=3,lu=[{kind:"tesla_coil",cellsW:2,cellsD:2,heightMin:30,heightMax:55,weight:.12,hpCategory:"large"},{kind:"power_cell",cellsW:2,cellsD:2,heightMin:16,heightMax:32,weight:.12,hpCategory:"small"},{kind:"circuit_monolith",cellsW:2,cellsD:2,heightMin:14,heightMax:30,weight:.15,hpCategory:"small"},{kind:"capacitor_bank",cellsW:4,cellsD:2,heightMin:14,heightMax:28,weight:.1,hpCategory:"medium"},{kind:"relay_tower",cellsW:2,cellsD:2,heightMin:50,heightMax:85,weight:.1,hpCategory:"large"},{kind:"data_obelisk",cellsW:2,cellsD:2,heightMin:22,heightMax:42,weight:.1,hpCategory:"large"},{kind:"plasma_conduit",cellsW:4,cellsD:2,heightMin:10,heightMax:20,weight:.08,hpCategory:"medium"},{kind:"power_pylon",cellsW:2,cellsD:2,heightMin:60,heightMax:100,weight:.08,hpCategory:"large"},{kind:"transformer_stack",cellsW:2,cellsD:2,heightMin:20,heightMax:38,weight:.08,hpCategory:"medium"},{kind:"cable_rack",cellsW:6,cellsD:2,heightMin:15,heightMax:25,weight:.07,hpCategory:"medium"}],cu=["#00ccff","#00ffaa","#ff00cc","#aa44ff","#00aaff"],du=["#1a2a48","#1e3050","#223858","#1c2840"],hu=18,k0=30,V0=20,W0={1:8,2:14},X0=20,q0=.15,Y0=.5,$0=350,Z0={1:8,2:12},j0=18,K0=.12,J0=.4,Q0={1:10,2:16},t_=22,e_=.12,n_=.45,i_={1:8,2:12},s_=16,a_=.15,r_=.4,o_={1:10,2:16},l_=22,c_=.12,d_=.45,h_={1:4,2:6},u_=0,f_=0,Ke=0,Mi=1,th=2,Vn=3,kn=4,p_=2,m_=20,__=80,fp=160,uu=200,g_=1,fu={rusher:{pushRatio:.7,upgradePriority:"damage"},turtle:{pushRatio:1.2,upgradePriority:"defense"},balanced:{pushRatio:.9,upgradePriority:"adaptive"}},pu={rusher:["generator","barracks","barracks","generator","turret","barracks","factory","generator","turret","barracks","helipad","generator","turret","factory","wall","wall","turret","generator","helipad","generator"],turtle:["generator","barracks","turret","generator","turret","barracks","generator","factory","turret","wall","wall","wall","turret","generator","factory","wall","wall","barracks","helipad","generator"],balanced:["generator","barracks","generator","turret","barracks","factory","generator","turret","wall","wall","wall","barracks","generator","turret","factory","wall","helipad","turret","generator","barracks","helipad","generator"]},mu={easy:{buildInterval:12,upgradeDelay:90,upgradeInterval:25,incomeMult:.8,startEnergy:500},normal:{buildInterval:8,upgradeDelay:50,upgradeInterval:15,incomeMult:1.2,startEnergy:600},hard:{buildInterval:5,upgradeDelay:30,upgradeInterval:10,incomeMult:1.8,startEnergy:750}},qa={easy:{aiIncomeMult:.8,playerStartEnergy:600,aiStartEnergy:500,label:"EASY"},normal:{aiIncomeMult:1.2,playerStartEnergy:500,aiStartEnergy:600,label:"NORMAL"},hard:{aiIncomeMult:1.8,playerStartEnergy:400,aiStartEnergy:750,label:"HARD"}},x_=6,_u=1.5,v_=5,M_=150,y_=6,S_=250,E_=40,pp=4,mp=12,w_=3,T_=.4,b_=3,A_=90,R_=2,Fc={rifle:1,assault:2.5,tank:5,helicopter:0,medic:0,engineer:0},dn="advance",aa="defend",Cr="hold",ra="rally",oa="any",Pr="units",Ya="buildings",Ia=aa,La=oa,C_=30,P_=8,D_=16777215,I_=65535,gu=6,L_=60,xu=750,vu=400,U_=60,Mu={any:{rifle:0,assault:0,tank:0,helicopter:0,medic:20,engineer:20,turret:0,barracks:0,factory:0,generator:0,helipad:0,wall:0,core:0},units:{rifle:50,assault:50,tank:50,helicopter:50,medic:70,engineer:70,turret:-30,barracks:-30,factory:-30,generator:-30,helipad:-30,wall:-30,core:-30},buildings:{rifle:-30,assault:-30,tank:-30,helicopter:-30,medic:-10,engineer:-10,turret:50,barracks:50,factory:50,generator:50,helipad:50,wall:50,core:50},rally:{rifle:60,assault:60,tank:80,helicopter:40,medic:80,engineer:80,turret:100,barracks:20,factory:20,generator:20,helipad:20,wall:20,core:20}},N_=100,F_=150,O_=.5,B_=25,la="horizontal",jo="vertical",eh="corner_ne",nh="corner_nw",ih="corner_se",sh="corner_sw",z_=.15,H_=4,G_=5,_p=.5,$a=2e4,k_=120,V_=3,yu=250,ah=120,Mr=140,pa=40,ma=2e3,Su=80,Na=400,W_=180,X_=25e3,q_=1.5,gp=3,Y_=3,$_=2,Z_=3,j_=3,Eu=7,K_=3,J_=2,Q_=90,tg=["turret","generator"],eg=120,Dr=150,ng=45,Ir=250,ig=60,sg=90,ag=3,rg=120,og=2,xp=3342180,vp=16766720;function jt(e,t,n,i){const s=n-e,a=i-t;return Math.sqrt(s*s+a*a)}function pn(e,t,n){return{x:e*n+n/2,z:t*n+n/2}}function on(e,t,n){return{col:Math.floor(e/n),row:Math.floor(t/n)}}let lg=1;function Yr(){return lg++}function cg(e,t){return e+Math.random()*(t-e)}function wu(e,t){return Math.floor(cg(e,t+1))}class rh{constructor(t){this.cellSize=t,this.cells=new Map,this._queryBuf=[]}_key(t,n){return t*73856093^n*19349663}clear(){this.cells.clear()}insert(t){const n=Math.floor(t.x/this.cellSize),i=Math.floor(t.z/this.cellSize),s=this._key(n,i);let a=this.cells.get(s);a||(a=[],this.cells.set(s,a)),a.push(t)}queryNear(t,n){const i=Math.floor(t/this.cellSize),s=Math.floor(n/this.cellSize);this._queryBuf.length=0;for(let a=-1;a<=1;a++)for(let r=-1;r<=1;r++){const o=this.cells.get(this._key(i+a,s+r));if(o)for(let c=0;c<o.length;c++)this._queryBuf.push(o[c])}return this._queryBuf}forEachNear(t,n,i){const s=Math.floor(t/this.cellSize),a=Math.floor(n/this.cellSize);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const c=this.cells.get(this._key(s+r,a+o));if(c)for(let h=0;h<c.length;h++)i(c[h])}}}let ei=[],Oc={[tt]:{barracks:0,factory:0,helipad:0},[kt]:{barracks:0,factory:0,helipad:0}};function dg(e){return e===ye?"factory":e===tn?"helipad":"barracks"}function hg(e){return e==="factory"?"Factory":e==="helipad"?"Helipad":"Barracks"}function Mp(e,t,n){const i=dg(n);Oc[t][i]++;const s=`${hg(i)} ${Oc[t][i]}`,a={id:Yr(),buildingId:e,team:t,buildingType:n,label:s,spawnStance:Ia,spawnTargetPriority:La,unitIds:new Set,rallyX:null,rallyZ:null};return ei.push(a),a}function Bc(e,t){const n=ei.findIndex(i=>i.id===e);if(n!==-1){if(t){const i=t();for(let s=0;s<i.length;s++){const a=i[s];a.squadId===e&&(a.squadId=null)}}ei.splice(n,1)}}function oh(e){for(let t=0;t<ei.length;t++)if(ei[t].buildingId===e)return ei[t];return null}function ug(e,t){if(!e||e.type===xn)return;const n=oh(t);n&&(e.squadId=n.id,e.stance=n.spawnStance,e.targetPriority=n.spawnTargetPriority,n.unitIds.add(e.id))}function yp(e){if(!e||e.squadId==null)return;const t=El(e.squadId);t&&t.unitIds.delete(e.id)}function fg(e,t){const n=El(e);n&&(n.spawnStance=t)}function pg(e,t){const n=El(e);n&&(n.spawnTargetPriority=t)}function $r(e,t){if(!e||!e.alive)return;const n=e.stance!==t;e.stance=t,n&&(e.path=null,e.pathIndex=0,e._defendTargetId=null,e._wallTarget=null,t!==dn&&(e.rallyHold=!1,e._rallyAssigned=!1))}function lh(e,t){!e||!e.alive||(e.targetPriority=t)}function Sp(e,t){for(let n=0;n<e.length;n++)$r(e[n],t)}function Ep(e,t){for(let n=0;n<e.length;n++)lh(e[n],t)}function Tu(e,t,n){for(let i=0;i<e.length;i++){const s=e[i];!s||!s.alive||(s.squadRallyX=t,s.squadRallyZ=n,$r(s,ra))}}function mg(e,t,n){if(!n)return;const i=n();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===e&&a.type!==xn&&$r(a,t)}}function _g(e,t,n){if(!n)return;const i=n();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===e&&a.type!==xn&&lh(a,t)}}function gg(e,t,n,i){if(!i)return;const s=i();for(let a=0;a<s.length;a++){const r=s[a];r.alive&&r.team===e&&r.type!==xn&&(r.squadRallyX=t,r.squadRallyZ=n,$r(r,ra))}}function El(e){for(let t=0;t<ei.length;t++)if(ei[t].id===e)return ei[t];return null}function bu(e){return ei.filter(t=>t.team===e)}function xg(e,t){if(!e||!t)return 0;let n=0;const i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===e.id&&n++;return n}function wl(e,t){if(!t)return[];const n=[],i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===e&&n.push(i[s]);return n}function vg(e){const t=e(),n=new Set;for(let i=0;i<t.length;i++)t[i].alive&&n.add(t[i].id);for(let i=0;i<ei.length;i++){const s=ei[i];for(const a of s.unitIds)n.has(a)||s.unitIds.delete(a)}}function Mg(){ei=[],Oc={[tt]:{barracks:0,factory:0,helipad:0},[kt]:{barracks:0,factory:0,helipad:0}}}const ch="183",ds={ROTATE:0,DOLLY:1,PAN:2},Fa={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yg=0,Au=1,Sg=2,Io=1,Eg=2,yr=3,Is=0,Wn=1,Qn=2,Oi=0,Ha=1,zc=2,Ru=3,Cu=4,wg=5,$s=100,Tg=101,bg=102,Ag=103,Rg=104,Cg=200,Pg=201,Dg=202,Ig=203,Hc=204,Gc=205,Lg=206,Ug=207,Ng=208,Fg=209,Og=210,Bg=211,zg=212,Hg=213,Gg=214,kc=0,Vc=1,Wc=2,Za=3,Xc=4,qc=5,Yc=6,$c=7,wp=0,kg=1,Vg=2,Bi=0,Tp=1,bp=2,Ap=3,dh=4,Rp=5,Cp=6,Pp=7,Dp=300,ca=301,ja=302,kl=303,Vl=304,Tl=306,Zc=1e3,os=1001,jc=1002,_n=1003,Wg=1004,so=1005,Cn=1006,Wl=1007,Ks=1008,ti=1009,Ip=1010,Lp=1011,Lr=1012,hh=1013,ki=1014,Li=1015,ni=1016,uh=1017,fh=1018,Ur=1020,Up=35902,Np=35899,Fp=1021,Op=1022,Ei=1023,fs=1026,Js=1027,Bp=1028,ph=1029,Ka=1030,mh=1031,_h=1033,Lo=33776,Uo=33777,No=33778,Fo=33779,Kc=35840,Jc=35841,Qc=35842,td=35843,ed=36196,nd=37492,id=37496,sd=37488,ad=37489,rd=37490,od=37491,ld=37808,cd=37809,dd=37810,hd=37811,ud=37812,fd=37813,pd=37814,md=37815,_d=37816,gd=37817,xd=37818,vd=37819,Md=37820,yd=37821,Sd=36492,Ed=36494,wd=36495,Td=36283,bd=36284,Ad=36285,Rd=36286,Xg=3200,zp=0,qg=1,bs="",ai="srgb",Ja="srgb-linear",Ko="linear",we="srgb",_a=7680,Pu=519,Yg=512,$g=513,Zg=514,gh=515,jg=516,Kg=517,xh=518,Jg=519,Du=35044,Iu="300 es",Ui=2e3,Nr=2001;function Qg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Jo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function tx(){const e=Jo("canvas");return e.style.display="block",e}const Lu={};function Uu(...e){const t="THREE."+e.shift();console.log(t,...e)}function Hp(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function $t(...e){e=Hp(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function me(...e){e=Hp(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qo(...e){const t=e.join(" ");t in Lu||(Lu[t]=!0,$t(...e))}function ex(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}const nx={[kc]:Vc,[Wc]:Yc,[Xc]:$c,[Za]:qc,[Vc]:kc,[Yc]:Wc,[$c]:Xc,[qc]:Za};class da{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oo=Math.PI/180,Cd=180/Math.PI;function Zr(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yn[e&255]+yn[e>>8&255]+yn[e>>16&255]+yn[e>>24&255]+"-"+yn[t&255]+yn[t>>8&255]+"-"+yn[t>>16&15|64]+yn[t>>24&255]+"-"+yn[n&63|128]+yn[n>>8&255]+"-"+yn[n>>16&255]+yn[n>>24&255]+yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]).toLowerCase()}function he(e,t,n){return Math.max(t,Math.min(n,e))}function ix(e,t){return(e%t+t)%t}function Xl(e,t,n){return(1-n)*e+n*t}function ur(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function On(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const sx={DEG2RAD:Oo};class Pt{constructor(t=0,n=0){Pt.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=he(this.x,t.x,n.x),this.y=he(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=he(this.x,t,n),this.y=he(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(he(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(he(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ls{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let c=i[s+0],h=i[s+1],d=i[s+2],l=i[s+3],u=a[r+0],f=a[r+1],_=a[r+2],g=a[r+3];if(l!==g||c!==u||h!==f||d!==_){let p=c*u+h*f+d*_+l*g;p<0&&(u=-u,f=-f,_=-_,g=-g,p=-p);let m=1-o;if(p<.9995){const x=Math.acos(p),M=Math.sin(x);m=Math.sin(m*x)/M,o=Math.sin(o*x)/M,c=c*m+u*o,h=h*m+f*o,d=d*m+_*o,l=l*m+g*o}else{c=c*m+u*o,h=h*m+f*o,d=d*m+_*o,l=l*m+g*o;const x=1/Math.sqrt(c*c+h*h+d*d+l*l);c*=x,h*=x,d*=x,l*=x}}t[n]=c,t[n+1]=h,t[n+2]=d,t[n+3]=l}static multiplyQuaternionsFlat(t,n,i,s,a,r){const o=i[s],c=i[s+1],h=i[s+2],d=i[s+3],l=a[r],u=a[r+1],f=a[r+2],_=a[r+3];return t[n]=o*_+d*l+c*f-h*u,t[n+1]=c*_+d*u+h*l-o*f,t[n+2]=h*_+d*f+o*u-c*l,t[n+3]=d*_-o*l-c*u-h*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,c=Math.sin,h=o(i/2),d=o(s/2),l=o(a/2),u=c(i/2),f=c(s/2),_=c(a/2);switch(r){case"XYZ":this._x=u*d*l+h*f*_,this._y=h*f*l-u*d*_,this._z=h*d*_+u*f*l,this._w=h*d*l-u*f*_;break;case"YXZ":this._x=u*d*l+h*f*_,this._y=h*f*l-u*d*_,this._z=h*d*_-u*f*l,this._w=h*d*l+u*f*_;break;case"ZXY":this._x=u*d*l-h*f*_,this._y=h*f*l+u*d*_,this._z=h*d*_+u*f*l,this._w=h*d*l-u*f*_;break;case"ZYX":this._x=u*d*l-h*f*_,this._y=h*f*l+u*d*_,this._z=h*d*_-u*f*l,this._w=h*d*l+u*f*_;break;case"YZX":this._x=u*d*l+h*f*_,this._y=h*f*l+u*d*_,this._z=h*d*_-u*f*l,this._w=h*d*l-u*f*_;break;case"XZY":this._x=u*d*l-h*f*_,this._y=h*f*l-u*d*_,this._z=h*d*_+u*f*l,this._w=h*d*l+u*f*_;break;default:$t("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],c=n[9],h=n[2],d=n[6],l=n[10],u=i+o+l;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(a-h)*f,this._z=(r-s)*f}else if(i>o&&i>l){const f=2*Math.sqrt(1+i-o-l);this._w=(d-c)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+h)/f}else if(o>l){const f=2*Math.sqrt(1+o-i-l);this._w=(a-h)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(c+d)/f}else{const f=2*Math.sqrt(1+l-i-o);this._w=(r-s)/f,this._x=(a+h)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,c=n._y,h=n._z,d=n._w;return this._x=i*d+r*o+s*h-a*c,this._y=s*d+r*c+a*o-i*h,this._z=a*d+r*h+i*c-s*o,this._w=r*d-i*o-s*c-a*h,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let c=1-n;if(o<.9995){const h=Math.acos(o),d=Math.sin(h);c=Math.sin(c*h)/d,n=Math.sin(n*h)/d,this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+a*n,this._w=this._w*c+r*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+a*n,this._w=this._w*c+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,n=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Nu.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Nu.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,c=t.w,h=2*(r*s-o*i),d=2*(o*n-a*s),l=2*(a*i-r*n);return this.x=n+c*h+r*l-o*d,this.y=i+c*d+o*h-a*l,this.z=s+c*l+a*d-r*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=he(this.x,t.x,n.x),this.y=he(this.y,t.y,n.y),this.z=he(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=he(this.x,t,n),this.y=he(this.y,t,n),this.z=he(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(he(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,c=n.z;return this.x=s*c-a*o,this.y=a*r-i*c,this.z=i*o-s*r,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ql.copy(this).projectOnVector(t),this.sub(ql)}reflect(t){return this.sub(ql.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(he(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ql=new F,Nu=new Ls;class ne{constructor(t,n,i,s,a,r,o,c,h){ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,c,h)}set(t,n,i,s,a,r,o,c,h){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=n,d[4]=a,d[5]=c,d[6]=i,d[7]=r,d[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],c=i[6],h=i[1],d=i[4],l=i[7],u=i[2],f=i[5],_=i[8],g=s[0],p=s[3],m=s[6],x=s[1],M=s[4],y=s[7],b=s[2],E=s[5],A=s[8];return a[0]=r*g+o*x+c*b,a[3]=r*p+o*M+c*E,a[6]=r*m+o*y+c*A,a[1]=h*g+d*x+l*b,a[4]=h*p+d*M+l*E,a[7]=h*m+d*y+l*A,a[2]=u*g+f*x+_*b,a[5]=u*p+f*M+_*E,a[8]=u*m+f*y+_*A,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],h=t[7],d=t[8];return n*r*d-n*o*h-i*a*d+i*o*c+s*a*h-s*r*c}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],h=t[7],d=t[8],l=d*r-o*h,u=o*c-d*a,f=h*a-r*c,_=n*l+i*u+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=l*g,t[1]=(s*h-d*i)*g,t[2]=(o*i-s*r)*g,t[3]=u*g,t[4]=(d*n-s*c)*g,t[5]=(s*a-o*n)*g,t[6]=f*g,t[7]=(i*c-h*n)*g,t[8]=(r*n-i*a)*g,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){const c=Math.cos(a),h=Math.sin(a);return this.set(i*c,i*h,-i*(c*r+h*o)+r+t,-s*h,s*c,-s*(-h*r+c*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Yl.makeScale(t,n)),this}rotate(t){return this.premultiply(Yl.makeRotation(-t)),this}translate(t,n){return this.premultiply(Yl.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yl=new ne,Fu=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ou=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ax(){const e={enabled:!0,workingColorSpace:Ja,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===we&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===we&&(s.r=Ga(s.r),s.g=Ga(s.g),s.b=Ga(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bs?Ko:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Qo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Qo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Ja]:{primaries:t,whitePoint:i,transfer:Ko,toXYZ:Fu,fromXYZ:Ou,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ai},outputColorSpaceConfig:{drawingBufferColorSpace:ai}},[ai]:{primaries:t,whitePoint:i,transfer:we,toXYZ:Fu,fromXYZ:Ou,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ai}}}),e}const _e=ax();function hs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ga(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let ga;class rx{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ga===void 0&&(ga=Jo("canvas")),ga.width=t.width,ga.height=t.height;const s=ga.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ga}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Jo("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=hs(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(hs(n[i]/255)*255):n[i]=hs(n[i]);return{data:n,width:t.width,height:t.height}}else return $t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ox=0;class vh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ox++}),this.uuid=Zr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push($l(s[r].image)):a.push($l(s[r]))}else a=$l(s);i.url=a}return n||(t.images[this.uuid]=i),i}}function $l(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?rx.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:($t("Texture: Unable to serialize Texture."),{})}let lx=0;const Zl=new F;class Nn extends da{constructor(t=Nn.DEFAULT_IMAGE,n=Nn.DEFAULT_MAPPING,i=os,s=os,a=Cn,r=Ks,o=Ei,c=ti,h=Nn.DEFAULT_ANISOTROPY,d=bs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lx++}),this.uuid=Zr(),this.name="",this.source=new vh(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){$t(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){$t(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zc:t.x=t.x-Math.floor(t.x);break;case os:t.x=t.x<0?0:1;break;case jc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zc:t.y=t.y-Math.floor(t.y);break;case os:t.y=t.y<0?0:1;break;case jc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Nn.DEFAULT_IMAGE=null;Nn.DEFAULT_MAPPING=Dp;Nn.DEFAULT_ANISOTROPY=1;class We{constructor(t=0,n=0,i=0,s=1){We.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a;const c=t.elements,h=c[0],d=c[4],l=c[8],u=c[1],f=c[5],_=c[9],g=c[2],p=c[6],m=c[10];if(Math.abs(d-u)<.01&&Math.abs(l-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(d+u)<.1&&Math.abs(l+g)<.1&&Math.abs(_+p)<.1&&Math.abs(h+f+m-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(h+1)/2,y=(f+1)/2,b=(m+1)/2,E=(d+u)/4,A=(l+g)/4,v=(_+p)/4;return M>y&&M>b?M<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(M),s=E/i,a=A/i):y>b?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=E/s,a=v/s):b<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(b),i=A/a,s=v/a),this.set(i,s,a,n),this}let x=Math.sqrt((p-_)*(p-_)+(l-g)*(l-g)+(u-d)*(u-d));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(l-g)/x,this.z=(u-d)/x,this.w=Math.acos((h+f+m-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=he(this.x,t.x,n.x),this.y=he(this.y,t.y,n.y),this.z=he(this.z,t.z,n.z),this.w=he(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=he(this.x,t,n),this.y=he(this.y,t,n),this.z=he(this.z,t,n),this.w=he(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(he(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cx extends da{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new We(0,0,t,n),this.scissorTest=!1,this.viewport=new We(0,0,t,n),this.textures=[];const s={width:t,height:n,depth:i.depth},a=new Nn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},t.textures[n].image);this.textures[n].source=new vh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends cx{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Gp extends Nn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class dx extends Nn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ge{constructor(t,n,i,s,a,r,o,c,h,d,l,u,f,_,g,p){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,c,h,d,l,u,f,_,g,p)}set(t,n,i,s,a,r,o,c,h,d,l,u,f,_,g,p){const m=this.elements;return m[0]=t,m[4]=n,m[8]=i,m[12]=s,m[1]=a,m[5]=r,m[9]=o,m[13]=c,m[2]=h,m[6]=d,m[10]=l,m[14]=u,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,s=1/xa.setFromMatrixColumn(t,0).length(),a=1/xa.setFromMatrixColumn(t,1).length(),r=1/xa.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),c=Math.cos(s),h=Math.sin(s),d=Math.cos(a),l=Math.sin(a);if(t.order==="XYZ"){const u=r*d,f=r*l,_=o*d,g=o*l;n[0]=c*d,n[4]=-c*l,n[8]=h,n[1]=f+_*h,n[5]=u-g*h,n[9]=-o*c,n[2]=g-u*h,n[6]=_+f*h,n[10]=r*c}else if(t.order==="YXZ"){const u=c*d,f=c*l,_=h*d,g=h*l;n[0]=u+g*o,n[4]=_*o-f,n[8]=r*h,n[1]=r*l,n[5]=r*d,n[9]=-o,n[2]=f*o-_,n[6]=g+u*o,n[10]=r*c}else if(t.order==="ZXY"){const u=c*d,f=c*l,_=h*d,g=h*l;n[0]=u-g*o,n[4]=-r*l,n[8]=_+f*o,n[1]=f+_*o,n[5]=r*d,n[9]=g-u*o,n[2]=-r*h,n[6]=o,n[10]=r*c}else if(t.order==="ZYX"){const u=r*d,f=r*l,_=o*d,g=o*l;n[0]=c*d,n[4]=_*h-f,n[8]=u*h+g,n[1]=c*l,n[5]=g*h+u,n[9]=f*h-_,n[2]=-h,n[6]=o*c,n[10]=r*c}else if(t.order==="YZX"){const u=r*c,f=r*h,_=o*c,g=o*h;n[0]=c*d,n[4]=g-u*l,n[8]=_*l+f,n[1]=l,n[5]=r*d,n[9]=-o*d,n[2]=-h*d,n[6]=f*l+_,n[10]=u-g*l}else if(t.order==="XZY"){const u=r*c,f=r*h,_=o*c,g=o*h;n[0]=c*d,n[4]=-l,n[8]=h*d,n[1]=u*l+g,n[5]=r*d,n[9]=f*l-_,n[2]=_*l-f,n[6]=o*d,n[10]=g*l+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hx,t,ux)}lookAt(t,n,i){const s=this.elements;return $n.subVectors(t,n),$n.lengthSq()===0&&($n.z=1),$n.normalize(),_s.crossVectors(i,$n),_s.lengthSq()===0&&(Math.abs(i.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),_s.crossVectors(i,$n)),_s.normalize(),ao.crossVectors($n,_s),s[0]=_s.x,s[4]=ao.x,s[8]=$n.x,s[1]=_s.y,s[5]=ao.y,s[9]=$n.y,s[2]=_s.z,s[6]=ao.z,s[10]=$n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],c=i[8],h=i[12],d=i[1],l=i[5],u=i[9],f=i[13],_=i[2],g=i[6],p=i[10],m=i[14],x=i[3],M=i[7],y=i[11],b=i[15],E=s[0],A=s[4],v=s[8],w=s[12],D=s[1],C=s[5],L=s[9],U=s[13],V=s[2],B=s[6],W=s[10],G=s[14],et=s[3],nt=s[7],pt=s[11],at=s[15];return a[0]=r*E+o*D+c*V+h*et,a[4]=r*A+o*C+c*B+h*nt,a[8]=r*v+o*L+c*W+h*pt,a[12]=r*w+o*U+c*G+h*at,a[1]=d*E+l*D+u*V+f*et,a[5]=d*A+l*C+u*B+f*nt,a[9]=d*v+l*L+u*W+f*pt,a[13]=d*w+l*U+u*G+f*at,a[2]=_*E+g*D+p*V+m*et,a[6]=_*A+g*C+p*B+m*nt,a[10]=_*v+g*L+p*W+m*pt,a[14]=_*w+g*U+p*G+m*at,a[3]=x*E+M*D+y*V+b*et,a[7]=x*A+M*C+y*B+b*nt,a[11]=x*v+M*L+y*W+b*pt,a[15]=x*w+M*U+y*G+b*at,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],c=t[9],h=t[13],d=t[2],l=t[6],u=t[10],f=t[14],_=t[3],g=t[7],p=t[11],m=t[15],x=c*f-h*u,M=o*f-h*l,y=o*u-c*l,b=r*f-h*d,E=r*u-c*d,A=r*l-o*d;return n*(g*x-p*M+m*y)-i*(_*x-p*b+m*E)+s*(_*M-g*b+m*A)-a*(_*y-g*E+p*A)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],h=t[7],d=t[8],l=t[9],u=t[10],f=t[11],_=t[12],g=t[13],p=t[14],m=t[15],x=n*o-i*r,M=n*c-s*r,y=n*h-a*r,b=i*c-s*o,E=i*h-a*o,A=s*h-a*c,v=d*g-l*_,w=d*p-u*_,D=d*m-f*_,C=l*p-u*g,L=l*m-f*g,U=u*m-f*p,V=x*U-M*L+y*C+b*D-E*w+A*v;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/V;return t[0]=(o*U-c*L+h*C)*B,t[1]=(s*L-i*U-a*C)*B,t[2]=(g*A-p*E+m*b)*B,t[3]=(u*E-l*A-f*b)*B,t[4]=(c*D-r*U-h*w)*B,t[5]=(n*U-s*D+a*w)*B,t[6]=(p*y-_*A-m*M)*B,t[7]=(d*A-u*y+f*M)*B,t[8]=(r*L-o*D+h*v)*B,t[9]=(i*D-n*L-a*v)*B,t[10]=(_*E-g*y+m*x)*B,t[11]=(l*y-d*E-f*x)*B,t[12]=(o*w-r*C-c*v)*B,t[13]=(n*C-i*w+s*v)*B,t[14]=(g*M-_*b-p*x)*B,t[15]=(d*b-l*M+u*x)*B,this}scale(t){const n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,c=t.z,h=a*r,d=a*o;return this.set(h*r+i,h*o-s*c,h*c+s*o,0,h*o+s*c,d*o+i,d*c-s*r,0,h*c-s*o,d*c+s*r,a*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,a=n._x,r=n._y,o=n._z,c=n._w,h=a+a,d=r+r,l=o+o,u=a*h,f=a*d,_=a*l,g=r*d,p=r*l,m=o*l,x=c*h,M=c*d,y=c*l,b=i.x,E=i.y,A=i.z;return s[0]=(1-(g+m))*b,s[1]=(f+y)*b,s[2]=(_-M)*b,s[3]=0,s[4]=(f-y)*E,s[5]=(1-(u+m))*E,s[6]=(p+x)*E,s[7]=0,s[8]=(_+M)*A,s[9]=(p-x)*A,s[10]=(1-(u+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const a=this.determinant();if(a===0)return i.set(1,1,1),n.identity(),this;let r=xa.set(s[0],s[1],s[2]).length();const o=xa.set(s[4],s[5],s[6]).length(),c=xa.set(s[8],s[9],s[10]).length();a<0&&(r=-r),hi.copy(this);const h=1/r,d=1/o,l=1/c;return hi.elements[0]*=h,hi.elements[1]*=h,hi.elements[2]*=h,hi.elements[4]*=d,hi.elements[5]*=d,hi.elements[6]*=d,hi.elements[8]*=l,hi.elements[9]*=l,hi.elements[10]*=l,n.setFromRotationMatrix(hi),i.x=r,i.y=o,i.z=c,this}makePerspective(t,n,i,s,a,r,o=Ui,c=!1){const h=this.elements,d=2*a/(n-t),l=2*a/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s);let _,g;if(c)_=a/(r-a),g=r*a/(r-a);else if(o===Ui)_=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Nr)_=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=d,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=l,h[9]=f,h[13]=0,h[2]=0,h[6]=0,h[10]=_,h[14]=g,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Ui,c=!1){const h=this.elements,d=2/(n-t),l=2/(i-s),u=-(n+t)/(n-t),f=-(i+s)/(i-s);let _,g;if(c)_=1/(r-a),g=r/(r-a);else if(o===Ui)_=-2/(r-a),g=-(r+a)/(r-a);else if(o===Nr)_=-1/(r-a),g=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=d,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=l,h[9]=0,h[13]=f,h[2]=0,h[6]=0,h[10]=_,h[14]=g,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const xa=new F,hi=new Ge,hx=new F(0,0,0),ux=new F(1,1,1),_s=new F,ao=new F,$n=new F,Bu=new Ge,zu=new Ls;class Vi{constructor(t=0,n=0,i=0,s=Vi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,a=s[0],r=s[4],o=s[8],c=s[1],h=s[5],d=s[9],l=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-he(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-l,a),this._z=0);break;case"ZXY":this._x=Math.asin(he(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-l,f),this._z=Math.atan2(-r,h)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-he(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,h));break;case"YZX":this._z=Math.asin(he(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,h),this._y=Math.atan2(-l,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-he(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:$t("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Bu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bu,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return zu.setFromEuler(this),this.setFromQuaternion(zu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vi.DEFAULT_ORDER="XYZ";class Mh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fx=0;const Hu=new F,va=new Ls,Zi=new Ge,ro=new F,fr=new F,px=new F,mx=new Ls,Gu=new F(1,0,0),ku=new F(0,1,0),Vu=new F(0,0,1),Wu={type:"added"},_x={type:"removed"},Ma={type:"childadded",child:null},jl={type:"childremoved",child:null};class cn extends da{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fx++}),this.uuid=Zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const t=new F,n=new Vi,i=new Ls,s=new F(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new ne}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return va.setFromAxisAngle(t,n),this.quaternion.multiply(va),this}rotateOnWorldAxis(t,n){return va.setFromAxisAngle(t,n),this.quaternion.premultiply(va),this}rotateX(t){return this.rotateOnAxis(Gu,t)}rotateY(t){return this.rotateOnAxis(ku,t)}rotateZ(t){return this.rotateOnAxis(Vu,t)}translateOnAxis(t,n){return Hu.copy(t).applyQuaternion(this.quaternion),this.position.add(Hu.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Gu,t)}translateY(t){return this.translateOnAxis(ku,t)}translateZ(t){return this.translateOnAxis(Vu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?ro.copy(t):ro.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zi.lookAt(fr,ro,this.up):Zi.lookAt(ro,fr,this.up),this.quaternion.setFromRotationMatrix(Zi),s&&(Zi.extractRotation(s.matrixWorld),va.setFromRotationMatrix(Zi),this.quaternion.premultiply(va.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(me("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wu),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null):me("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(_x),jl.child=t,this.dispatchEvent(jl),jl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wu),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,t,px),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,mx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let h=0,d=c.length;h<d;h++){const l=c[h];a(t.shapes,l)}else a(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,h=this.material.length;c<h;c++)o.push(a(t.materials,this.material[c]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(t.animations,c))}}if(n){const o=r(t.geometries),c=r(t.materials),h=r(t.textures),d=r(t.images),l=r(t.shapes),u=r(t.skeletons),f=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),d.length>0&&(i.images=d),l.length>0&&(i.shapes=l),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){const c=[];for(const h in o){const d=o[h];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}cn.DEFAULT_UP=new F(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fe extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gx={type:"move"};class Kl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,h=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(h&&t.hand){r=!0;for(const g of t.hand.values()){const p=n.getJointPose(g,i),m=this._getHandJoint(h,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const d=h.joints["index-finger-tip"],l=h.joints["thumb-tip"],u=d.position.distanceTo(l.position),f=.02,_=.005;h.inputState.pinching&&u>f+_?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&u<=f-_&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gx)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),h!==null&&(h.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new fe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gs={h:0,s:0,l:0},oo={h:0,s:0,l:0};function Jl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Ft{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=_e.workingColorSpace){return this.r=t,this.g=n,this.b=i,_e.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=_e.workingColorSpace){if(t=ix(t,1),n=he(n,0,1),i=he(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=Jl(r,a,t+1/3),this.g=Jl(r,a,t),this.b=Jl(r,a,t-1/3)}return _e.colorSpaceToWorking(this,s),this}setStyle(t,n=ai){function i(a){a!==void 0&&parseFloat(a)<1&&$t("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:$t("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);$t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ai){const i=kp[t.toLowerCase()];return i!==void 0?this.setHex(i,n):$t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}copyLinearToSRGB(t){return this.r=Ga(t.r),this.g=Ga(t.g),this.b=Ga(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ai){return _e.workingToColorSpace(Sn.copy(this),t),Math.round(he(Sn.r*255,0,255))*65536+Math.round(he(Sn.g*255,0,255))*256+Math.round(he(Sn.b*255,0,255))}getHexString(t=ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=_e.workingColorSpace){_e.workingToColorSpace(Sn.copy(this),n);const i=Sn.r,s=Sn.g,a=Sn.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let c,h;const d=(o+r)/2;if(o===r)c=0,h=0;else{const l=r-o;switch(h=d<=.5?l/(r+o):l/(2-r-o),r){case i:c=(s-a)/l+(s<a?6:0);break;case s:c=(a-i)/l+2;break;case a:c=(i-s)/l+4;break}c/=6}return t.h=c,t.s=h,t.l=d,t}getRGB(t,n=_e.workingColorSpace){return _e.workingToColorSpace(Sn.copy(this),n),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=ai){_e.workingToColorSpace(Sn.copy(this),t);const n=Sn.r,i=Sn.g,s=Sn.b;return t!==ai?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(gs),this.setHSL(gs.h+t,gs.s+n,gs.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(gs),t.getHSL(oo);const i=Xl(gs.h,oo.h,n),s=Xl(gs.s,oo.s,n),a=Xl(gs.l,oo.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new Ft;Ft.NAMES=kp;class yh{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=n}clone(){return new yh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xx extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ui=new F,ji=new F,Ql=new F,Ki=new F,ya=new F,Sa=new F,Xu=new F,tc=new F,ec=new F,nc=new F,ic=new We,sc=new We,ac=new We;class yi{constructor(t=new F,n=new F,i=new F){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),ui.subVectors(t,n),s.cross(ui);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){ui.subVectors(s,n),ji.subVectors(i,n),Ql.subVectors(t,n);const r=ui.dot(ui),o=ui.dot(ji),c=ui.dot(Ql),h=ji.dot(ji),d=ji.dot(Ql),l=r*h-o*o;if(l===0)return a.set(0,0,0),null;const u=1/l,f=(h*c-o*d)*u,_=(r*d-o*c)*u;return a.set(1-f-_,_,f)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getInterpolation(t,n,i,s,a,r,o,c){return this.getBarycoord(t,n,i,s,Ki)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Ki.x),c.addScaledVector(r,Ki.y),c.addScaledVector(o,Ki.z),c)}static getInterpolatedAttribute(t,n,i,s,a,r){return ic.setScalar(0),sc.setScalar(0),ac.setScalar(0),ic.fromBufferAttribute(t,n),sc.fromBufferAttribute(t,i),ac.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(ic,a.x),r.addScaledVector(sc,a.y),r.addScaledVector(ac,a.z),r}static isFrontFacing(t,n,i,s){return ui.subVectors(i,n),ji.subVectors(t,n),ui.cross(ji).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ui.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),ui.cross(ji).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return yi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return yi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return yi.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return yi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return yi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,a=this.c;let r,o;ya.subVectors(s,i),Sa.subVectors(a,i),tc.subVectors(t,i);const c=ya.dot(tc),h=Sa.dot(tc);if(c<=0&&h<=0)return n.copy(i);ec.subVectors(t,s);const d=ya.dot(ec),l=Sa.dot(ec);if(d>=0&&l<=d)return n.copy(s);const u=c*l-d*h;if(u<=0&&c>=0&&d<=0)return r=c/(c-d),n.copy(i).addScaledVector(ya,r);nc.subVectors(t,a);const f=ya.dot(nc),_=Sa.dot(nc);if(_>=0&&f<=_)return n.copy(a);const g=f*h-c*_;if(g<=0&&h>=0&&_<=0)return o=h/(h-_),n.copy(i).addScaledVector(Sa,o);const p=d*_-f*l;if(p<=0&&l-d>=0&&f-_>=0)return Xu.subVectors(a,s),o=(l-d)/(l-d+(f-_)),n.copy(s).addScaledVector(Xu,o);const m=1/(p+g+u);return r=g*m,o=u*m,n.copy(i).addScaledVector(ya,r).addScaledVector(Sa,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class jr{constructor(t=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(fi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(fi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=fi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,fi):fi.fromBufferAttribute(a,r),fi.applyMatrix4(t.matrixWorld),this.expandByPoint(fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),lo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),lo.copy(i.boundingBox)),lo.applyMatrix4(t.matrixWorld),this.union(lo)}const s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fi),fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pr),co.subVectors(this.max,pr),Ea.subVectors(t.a,pr),wa.subVectors(t.b,pr),Ta.subVectors(t.c,pr),xs.subVectors(wa,Ea),vs.subVectors(Ta,wa),Gs.subVectors(Ea,Ta);let n=[0,-xs.z,xs.y,0,-vs.z,vs.y,0,-Gs.z,Gs.y,xs.z,0,-xs.x,vs.z,0,-vs.x,Gs.z,0,-Gs.x,-xs.y,xs.x,0,-vs.y,vs.x,0,-Gs.y,Gs.x,0];return!rc(n,Ea,wa,Ta,co)||(n=[1,0,0,0,1,0,0,0,1],!rc(n,Ea,wa,Ta,co))?!1:(ho.crossVectors(xs,vs),n=[ho.x,ho.y,ho.z],rc(n,Ea,wa,Ta,co))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ji),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ji=[new F,new F,new F,new F,new F,new F,new F,new F],fi=new F,lo=new jr,Ea=new F,wa=new F,Ta=new F,xs=new F,vs=new F,Gs=new F,pr=new F,co=new F,ho=new F,ks=new F;function rc(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){ks.fromArray(e,a);const o=s.x*Math.abs(ks.x)+s.y*Math.abs(ks.y)+s.z*Math.abs(ks.z),c=t.dot(ks),h=n.dot(ks),d=i.dot(ks);if(Math.max(-Math.max(c,h,d),Math.min(c,h,d))>o)return!1}return!0}const Ze=new F,uo=new Pt;let vx=0;class zi{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vx++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Du,this.updateRanges=[],this.gpuType=Li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)uo.fromBufferAttribute(this,n),uo.applyMatrix3(t),this.setXY(n,uo.x,uo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ze.fromBufferAttribute(this,n),Ze.applyMatrix3(t),this.setXYZ(n,Ze.x,Ze.y,Ze.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ze.fromBufferAttribute(this,n),Ze.applyMatrix4(t),this.setXYZ(n,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ze.fromBufferAttribute(this,n),Ze.applyNormalMatrix(t),this.setXYZ(n,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ze.fromBufferAttribute(this,n),Ze.transformDirection(t),this.setXYZ(n,Ze.x,Ze.y,Ze.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ur(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=On(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ur(n,this.array)),n}setX(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ur(n,this.array)),n}setY(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ur(n,this.array)),n}setZ(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ur(n,this.array)),n}setW(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),i=On(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),i=On(i,this.array),s=On(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),i=On(i,this.array),s=On(s,this.array),a=On(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Du&&(t.usage=this.usage),t}}class Vp extends zi{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Wp extends zi{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class xe extends zi{constructor(t,n,i){super(new Float32Array(t),n,i)}}const Mx=new jr,mr=new F,oc=new F;class bl{constructor(t=new F,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):Mx.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mr.subVectors(t,this.center);const n=mr.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(mr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mr.copy(t.center).add(oc)),this.expandByPoint(mr.copy(t.center).sub(oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let yx=0;const ii=new Ge,lc=new cn,ba=new F,Zn=new jr,_r=new jr,rn=new F;class hn extends da{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yx++}),this.uuid=Zr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qg(t)?Wp:Vp)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ne().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ii.makeRotationFromQuaternion(t),this.applyMatrix4(ii),this}rotateX(t){return ii.makeRotationX(t),this.applyMatrix4(ii),this}rotateY(t){return ii.makeRotationY(t),this.applyMatrix4(ii),this}rotateZ(t){return ii.makeRotationZ(t),this.applyMatrix4(ii),this}translate(t,n,i){return ii.makeTranslation(t,n,i),this.applyMatrix4(ii),this}scale(t,n,i){return ii.makeScale(t,n,i),this.applyMatrix4(ii),this}lookAt(t){return lc.lookAt(t),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ba).negate(),this.translate(ba.x,ba.y,ba.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,a=t.length;s<a;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new xe(i,3))}else{const i=Math.min(t.length,n.count);for(let s=0;s<i;s++){const a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&$t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){me("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const a=n[i];Zn.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&me('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){me("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Zn.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){const o=n[a];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Zn.min,_r.min),Zn.expandByPoint(rn),rn.addVectors(Zn.max,_r.max),Zn.expandByPoint(rn)):(Zn.expandByPoint(_r.min),Zn.expandByPoint(_r.max))}Zn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)rn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(rn));if(n)for(let a=0,r=n.length;a<r;a++){const o=n[a],c=this.morphTargetsRelative;for(let h=0,d=o.count;h<d;h++)rn.fromBufferAttribute(o,h),c&&(ba.fromBufferAttribute(t,h),rn.add(ba)),s=Math.max(s,i.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&me('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){me("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zi(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new F,c[v]=new F;const h=new F,d=new F,l=new F,u=new Pt,f=new Pt,_=new Pt,g=new F,p=new F;function m(v,w,D){h.fromBufferAttribute(i,v),d.fromBufferAttribute(i,w),l.fromBufferAttribute(i,D),u.fromBufferAttribute(a,v),f.fromBufferAttribute(a,w),_.fromBufferAttribute(a,D),d.sub(h),l.sub(h),f.sub(u),_.sub(u);const C=1/(f.x*_.y-_.x*f.y);isFinite(C)&&(g.copy(d).multiplyScalar(_.y).addScaledVector(l,-f.y).multiplyScalar(C),p.copy(l).multiplyScalar(f.x).addScaledVector(d,-_.x).multiplyScalar(C),o[v].add(g),o[w].add(g),o[D].add(g),c[v].add(p),c[w].add(p),c[D].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let v=0,w=x.length;v<w;++v){const D=x[v],C=D.start,L=D.count;for(let U=C,V=C+L;U<V;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const M=new F,y=new F,b=new F,E=new F;function A(v){b.fromBufferAttribute(s,v),E.copy(b);const w=o[v];M.copy(w),M.sub(b.multiplyScalar(b.dot(w))).normalize(),y.crossVectors(E,w);const C=y.dot(c[v])<0?-1:1;r.setXYZW(v,M.x,M.y,M.z,C)}for(let v=0,w=x.length;v<w;++v){const D=x[v],C=D.start,L=D.count;for(let U=C,V=C+L;U<V;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new zi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new F,a=new F,r=new F,o=new F,c=new F,h=new F,d=new F,l=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){const _=t.getX(u+0),g=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,g),r.fromBufferAttribute(n,p),d.subVectors(r,a),l.subVectors(s,a),d.cross(l),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),h.fromBufferAttribute(i,p),o.add(d),c.add(d),h.add(d),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,h.x,h.y,h.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,a),l.subVectors(s,a),d.cross(l),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)rn.fromBufferAttribute(t,n),rn.normalize(),t.setXYZ(n,rn.x,rn.y,rn.z)}toNonIndexed(){function t(o,c){const h=o.array,d=o.itemSize,l=o.normalized,u=new h.constructor(c.length*d);let f=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*d;for(let m=0;m<d;m++)u[_++]=h[f++]}return new zi(u,d,l)}if(this.index===null)return $t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new hn,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],h=t(c,i);n.setAttribute(o,h)}const a=this.morphAttributes;for(const o in a){const c=[],h=a[o];for(let d=0,l=h.length;d<l;d++){const u=h[d],f=t(u,i);c.push(f)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const h=r[o];n.addGroup(h.start,h.count,h.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const h=i[c];t.data.attributes[c]=h.toJSON(t.data)}const s={};let a=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],d=[];for(let l=0,u=h.length;l<u;l++){const f=h[l];d.push(f.toJSON(t.data))}d.length>0&&(s[c]=d,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const h in s){const d=s[h];this.setAttribute(h,d.clone(n))}const a=t.morphAttributes;for(const h in a){const d=[],l=a[h];for(let u=0,f=l.length;u<f;u++)d.push(l[u].clone(n));this.morphAttributes[h]=d}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let h=0,d=r.length;h<d;h++){const l=r[h];this.addGroup(l.start,l.count,l.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sx=0;class cr extends da{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=Zr(),this.name="",this.type="Material",this.blending=Ha,this.side=Is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hc,this.blendDst=Gc,this.blendEquation=$s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Za,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_a,this.stencilZFail=_a,this.stencilZPass=_a,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){$t(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){$t(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ha&&(i.blending=this.blending),this.side!==Is&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hc&&(i.blendSrc=this.blendSrc),this.blendDst!==Gc&&(i.blendDst=this.blendDst),this.blendEquation!==$s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Za&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_a&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_a&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_a&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(n){const a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Qi=new F,cc=new F,fo=new F,Ms=new F,dc=new F,po=new F,hc=new F;class Al{constructor(t=new F,n=new F(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Qi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Qi.copy(this.origin).addScaledVector(this.direction,n),Qi.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){cc.copy(t).add(n).multiplyScalar(.5),fo.copy(n).sub(t).normalize(),Ms.copy(this.origin).sub(cc);const a=t.distanceTo(n)*.5,r=-this.direction.dot(fo),o=Ms.dot(this.direction),c=-Ms.dot(fo),h=Ms.lengthSq(),d=Math.abs(1-r*r);let l,u,f,_;if(d>0)if(l=r*c-o,u=r*o-c,_=a*d,l>=0)if(u>=-_)if(u<=_){const g=1/d;l*=g,u*=g,f=l*(l+r*u+2*o)+u*(r*l+u+2*c)+h}else u=a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*c)+h;else u=-a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*c)+h;else u<=-_?(l=Math.max(0,-(-r*a+o)),u=l>0?-a:Math.min(Math.max(-a,-c),a),f=-l*l+u*(u+2*c)+h):u<=_?(l=0,u=Math.min(Math.max(-a,-c),a),f=u*(u+2*c)+h):(l=Math.max(0,-(r*a+o)),u=l>0?a:Math.min(Math.max(-a,-c),a),f=-l*l+u*(u+2*c)+h);else u=r>0?-a:a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,l),s&&s.copy(cc).addScaledVector(fo,u),f}intersectSphere(t,n){Qi.subVectors(t.center,this.origin);const i=Qi.dot(this.direction),s=Qi.dot(Qi)-i*i,a=t.radius*t.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,c=i+r;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,c;const h=1/this.direction.x,d=1/this.direction.y,l=1/this.direction.z,u=this.origin;return h>=0?(i=(t.min.x-u.x)*h,s=(t.max.x-u.x)*h):(i=(t.max.x-u.x)*h,s=(t.min.x-u.x)*h),d>=0?(a=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(a=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),l>=0?(o=(t.min.z-u.z)*l,c=(t.max.z-u.z)*l):(o=(t.max.z-u.z)*l,c=(t.min.z-u.z)*l),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Qi)!==null}intersectTriangle(t,n,i,s,a){dc.subVectors(n,t),po.subVectors(i,t),hc.crossVectors(dc,po);let r=this.direction.dot(hc),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ms.subVectors(this.origin,t);const c=o*this.direction.dot(po.crossVectors(Ms,po));if(c<0)return null;const h=o*this.direction.dot(dc.cross(Ms));if(h<0||c+h>r)return null;const d=-o*Ms.dot(hc);return d<0?null:this.at(d/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fn extends cr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=wp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const qu=new Ge,Vs=new Al,mo=new bl,Yu=new F,_o=new F,go=new F,xo=new F,uc=new F,vo=new F,$u=new F,Mo=new F;class T extends cn{constructor(t=new hn,n=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(a&&o){vo.set(0,0,0);for(let c=0,h=a.length;c<h;c++){const d=o[c],l=a[c];d!==0&&(uc.fromBufferAttribute(l,t),r?vo.addScaledVector(uc,d):vo.addScaledVector(uc.sub(n),d))}n.add(vo)}return n}raycast(t,n){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mo.copy(i.boundingSphere),mo.applyMatrix4(a),Vs.copy(t.ray).recast(t.near),!(mo.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(mo,Yu)===null||Vs.origin.distanceToSquared(Yu)>(t.far-t.near)**2))&&(qu.copy(a).invert(),Vs.copy(t.ray).applyMatrix4(qu),!(i.boundingBox!==null&&Vs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Vs)))}_computeIntersections(t,n,i){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,h=a.attributes.uv,d=a.attributes.uv1,l=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=u.length;_<g;_++){const p=u[_],m=r[p.materialIndex],x=Math.max(p.start,f.start),M=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,b=M;y<b;y+=3){const E=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);s=yo(this,m,t,i,h,d,l,E,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=o.getX(p),M=o.getX(p+1),y=o.getX(p+2);s=yo(this,r,t,i,h,d,l,x,M,y),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let _=0,g=u.length;_<g;_++){const p=u[_],m=r[p.materialIndex],x=Math.max(p.start,f.start),M=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let y=x,b=M;y<b;y+=3){const E=y,A=y+1,v=y+2;s=yo(this,m,t,i,h,d,l,E,A,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const x=p,M=p+1,y=p+2;s=yo(this,r,t,i,h,d,l,x,M,y),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}}}function Ex(e,t,n,i,s,a,r,o){let c;if(t.side===Wn?c=i.intersectTriangle(r,a,s,!0,o):c=i.intersectTriangle(s,a,r,t.side===Is,o),c===null)return null;Mo.copy(o),Mo.applyMatrix4(e.matrixWorld);const h=n.ray.origin.distanceTo(Mo);return h<n.near||h>n.far?null:{distance:h,point:Mo.clone(),object:e}}function yo(e,t,n,i,s,a,r,o,c,h){e.getVertexPosition(o,_o),e.getVertexPosition(c,go),e.getVertexPosition(h,xo);const d=Ex(e,t,n,i,_o,go,xo,$u);if(d){const l=new F;yi.getBarycoord($u,_o,go,xo,l),s&&(d.uv=yi.getInterpolatedAttribute(s,o,c,h,l,new Pt)),a&&(d.uv1=yi.getInterpolatedAttribute(a,o,c,h,l,new Pt)),r&&(d.normal=yi.getInterpolatedAttribute(r,o,c,h,l,new F),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:h,normal:new F,materialIndex:0};yi.getNormal(_o,go,xo,u.normal),d.face=u,d.barycoord=l}return d}class wx extends Nn{constructor(t=null,n=1,i=1,s,a,r,o,c,h=_n,d=_n,l,u){super(null,r,o,c,h,d,s,a,l,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fc=new F,Tx=new F,bx=new ne;class Ri{constructor(t=new F(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=fc.subVectors(i,n).cross(Tx.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(fc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||bx.getNormalMatrix(t),s=this.coplanarPoint(fc).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ws=new bl,Ax=new Pt(.5,.5),So=new F;class Sh{constructor(t=new Ri,n=new Ri,i=new Ri,s=new Ri,a=new Ri,r=new Ri){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Ui,i=!1){const s=this.planes,a=t.elements,r=a[0],o=a[1],c=a[2],h=a[3],d=a[4],l=a[5],u=a[6],f=a[7],_=a[8],g=a[9],p=a[10],m=a[11],x=a[12],M=a[13],y=a[14],b=a[15];if(s[0].setComponents(h-r,f-d,m-_,b-x).normalize(),s[1].setComponents(h+r,f+d,m+_,b+x).normalize(),s[2].setComponents(h+o,f+l,m+g,b+M).normalize(),s[3].setComponents(h-o,f-l,m-g,b-M).normalize(),i)s[4].setComponents(c,u,p,y).normalize(),s[5].setComponents(h-c,f-u,m-p,b-y).normalize();else if(s[4].setComponents(h-c,f-u,m-p,b-y).normalize(),n===Ui)s[5].setComponents(h+c,f+u,m+p,b+y).normalize();else if(n===Nr)s[5].setComponents(c,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ws)}intersectsSprite(t){Ws.center.set(0,0,0);const n=Ax.distanceTo(t.center);return Ws.radius=.7071067811865476+n,Ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ws)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(So.x=s.normal.x>0?t.max.x:t.min.x,So.y=s.normal.y>0?t.max.y:t.min.y,So.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(So)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xp extends cr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tl=new F,el=new F,Zu=new Ge,gr=new Al,Eo=new bl,pc=new F,ju=new F;class Rx extends cn{constructor(t=new hn,n=new Xp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,a=n.count;s<a;s++)tl.fromBufferAttribute(n,s-1),el.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=tl.distanceTo(el);t.setAttribute("lineDistance",new xe(i,1))}else $t("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Eo.copy(i.boundingSphere),Eo.applyMatrix4(s),Eo.radius+=a,t.ray.intersectsSphere(Eo)===!1)return;Zu.copy(s).invert(),gr.copy(t.ray).applyMatrix4(Zu);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,h=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const f=Math.max(0,r.start),_=Math.min(d.count,r.start+r.count);for(let g=f,p=_-1;g<p;g+=h){const m=d.getX(g),x=d.getX(g+1),M=wo(this,t,gr,c,m,x,g);M&&n.push(M)}if(this.isLineLoop){const g=d.getX(_-1),p=d.getX(f),m=wo(this,t,gr,c,g,p,_-1);m&&n.push(m)}}else{const f=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=f,p=_-1;g<p;g+=h){const m=wo(this,t,gr,c,g,g+1,g);m&&n.push(m)}if(this.isLineLoop){const g=wo(this,t,gr,c,_-1,f,_-1);g&&n.push(g)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function wo(e,t,n,i,s,a,r){const o=e.geometry.attributes.position;if(tl.fromBufferAttribute(o,s),el.fromBufferAttribute(o,a),n.distanceSqToSegment(tl,el,pc,ju)>i)return;pc.applyMatrix4(e.matrixWorld);const h=t.ray.origin.distanceTo(pc);if(!(h<t.near||h>t.far))return{distance:h,point:ju.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}const Ku=new F,Ju=new F;class Cx extends Rx{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,a=n.count;s<a;s+=2)Ku.fromBufferAttribute(n,s),Ju.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ku.distanceTo(Ju);t.setAttribute("lineDistance",new xe(i,1))}else $t("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qp extends Nn{constructor(t=[],n=ca,i,s,a,r,o,c,h,d){super(t,n,i,s,a,r,o,c,h,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fr extends Nn{constructor(t,n,i=ki,s,a,r,o=_n,c=_n,h,d=fs,l=1){if(d!==fs&&d!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:n,depth:l};super(u,s,a,r,o,c,d,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new vh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Px extends Fr{constructor(t,n=ki,i=ca,s,a,r=_n,o=_n,c,h=fs){const d={width:t,height:t,depth:1},l=[d,d,d,d,d,d];super(t,t,n,i,s,a,r,o,c,h),this.image=l,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Yp extends Nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class z extends hn{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],h=[],d=[],l=[];let u=0,f=0;_("z","y","x",-1,-1,i,n,t,r,a,0),_("z","y","x",1,-1,i,n,-t,r,a,1),_("x","z","y",1,1,t,i,n,s,r,2),_("x","z","y",1,-1,t,i,-n,s,r,3),_("x","y","z",1,-1,t,n,i,s,a,4),_("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new xe(h,3)),this.setAttribute("normal",new xe(d,3)),this.setAttribute("uv",new xe(l,2));function _(g,p,m,x,M,y,b,E,A,v,w){const D=y/A,C=b/v,L=y/2,U=b/2,V=E/2,B=A+1,W=v+1;let G=0,et=0;const nt=new F;for(let pt=0;pt<W;pt++){const at=pt*C-U;for(let dt=0;dt<B;dt++){const Wt=dt*D-L;nt[g]=Wt*x,nt[p]=at*M,nt[m]=V,h.push(nt.x,nt.y,nt.z),nt[g]=0,nt[p]=0,nt[m]=E>0?1:-1,d.push(nt.x,nt.y,nt.z),l.push(dt/A),l.push(1-pt/v),G+=1}}for(let pt=0;pt<v;pt++)for(let at=0;at<A;at++){const dt=u+at+B*pt,Wt=u+at+B*(pt+1),Te=u+(at+1)+B*(pt+1),Fe=u+(at+1)+B*pt;c.push(dt,Wt,Fe),c.push(Wt,Te,Fe),et+=6}o.addGroup(f,et,w),f+=et,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new z(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Eh extends hn{constructor(t=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);const a=[],r=[],o=[],c=[],h=new F,d=new Pt;r.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let l=0,u=3;l<=n;l++,u+=3){const f=i+l/n*s;h.x=t*Math.cos(f),h.y=t*Math.sin(f),r.push(h.x,h.y,h.z),o.push(0,0,1),d.x=(r[u]/t+1)/2,d.y=(r[u+1]/t+1)/2,c.push(d.x,d.y)}for(let l=1;l<=n;l++)a.push(l,l+1,0);this.setIndex(a),this.setAttribute("position",new xe(r,3)),this.setAttribute("normal",new xe(o,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ht extends hn{constructor(t=1,n=1,i=1,s=32,a=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:c};const h=this;s=Math.floor(s),a=Math.floor(a);const d=[],l=[],u=[],f=[];let _=0;const g=[],p=i/2;let m=0;x(),r===!1&&(t>0&&M(!0),n>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new xe(l,3)),this.setAttribute("normal",new xe(u,3)),this.setAttribute("uv",new xe(f,2));function x(){const y=new F,b=new F;let E=0;const A=(n-t)/i;for(let v=0;v<=a;v++){const w=[],D=v/a,C=D*(n-t)+t;for(let L=0;L<=s;L++){const U=L/s,V=U*c+o,B=Math.sin(V),W=Math.cos(V);b.x=C*B,b.y=-D*i+p,b.z=C*W,l.push(b.x,b.y,b.z),y.set(B,A,W).normalize(),u.push(y.x,y.y,y.z),f.push(U,1-D),w.push(_++)}g.push(w)}for(let v=0;v<s;v++)for(let w=0;w<a;w++){const D=g[w][v],C=g[w+1][v],L=g[w+1][v+1],U=g[w][v+1];(t>0||w!==0)&&(d.push(D,C,U),E+=3),(n>0||w!==a-1)&&(d.push(C,L,U),E+=3)}h.addGroup(m,E,0),m+=E}function M(y){const b=_,E=new Pt,A=new F;let v=0;const w=y===!0?t:n,D=y===!0?1:-1;for(let L=1;L<=s;L++)l.push(0,p*D,0),u.push(0,D,0),f.push(.5,.5),_++;const C=_;for(let L=0;L<=s;L++){const V=L/s*c+o,B=Math.cos(V),W=Math.sin(V);A.x=w*W,A.y=p*D,A.z=w*B,l.push(A.x,A.y,A.z),u.push(0,D,0),E.x=B*.5+.5,E.y=W*.5*D+.5,f.push(E.x,E.y),_++}for(let L=0;L<s;L++){const U=b+L,V=C+L;y===!0?d.push(V,V+1,U):d.push(V+1,V,U),v+=3}h.addGroup(m,v,y===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ht(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qa extends ht{constructor(t=1,n=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,n,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new Qa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rl extends hn{constructor(t=[],n=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:s};const a=[],r=[];o(s),h(i),d(),this.setAttribute("position",new xe(a,3)),this.setAttribute("normal",new xe(a.slice(),3)),this.setAttribute("uv",new xe(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new F,y=new F,b=new F;for(let E=0;E<n.length;E+=3)f(n[E+0],M),f(n[E+1],y),f(n[E+2],b),c(M,y,b,x)}function c(x,M,y,b){const E=b+1,A=[];for(let v=0;v<=E;v++){A[v]=[];const w=x.clone().lerp(y,v/E),D=M.clone().lerp(y,v/E),C=E-v;for(let L=0;L<=C;L++)L===0&&v===E?A[v][L]=w:A[v][L]=w.clone().lerp(D,L/C)}for(let v=0;v<E;v++)for(let w=0;w<2*(E-v)-1;w++){const D=Math.floor(w/2);w%2===0?(u(A[v][D+1]),u(A[v+1][D]),u(A[v][D])):(u(A[v][D+1]),u(A[v+1][D+1]),u(A[v+1][D]))}}function h(x){const M=new F;for(let y=0;y<a.length;y+=3)M.x=a[y+0],M.y=a[y+1],M.z=a[y+2],M.normalize().multiplyScalar(x),a[y+0]=M.x,a[y+1]=M.y,a[y+2]=M.z}function d(){const x=new F;for(let M=0;M<a.length;M+=3){x.x=a[M+0],x.y=a[M+1],x.z=a[M+2];const y=p(x)/2/Math.PI+.5,b=m(x)/Math.PI+.5;r.push(y,1-b)}_(),l()}function l(){for(let x=0;x<r.length;x+=6){const M=r[x+0],y=r[x+2],b=r[x+4],E=Math.max(M,y,b),A=Math.min(M,y,b);E>.9&&A<.1&&(M<.2&&(r[x+0]+=1),y<.2&&(r[x+2]+=1),b<.2&&(r[x+4]+=1))}}function u(x){a.push(x.x,x.y,x.z)}function f(x,M){const y=x*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function _(){const x=new F,M=new F,y=new F,b=new F,E=new Pt,A=new Pt,v=new Pt;for(let w=0,D=0;w<a.length;w+=9,D+=6){x.set(a[w+0],a[w+1],a[w+2]),M.set(a[w+3],a[w+4],a[w+5]),y.set(a[w+6],a[w+7],a[w+8]),E.set(r[D+0],r[D+1]),A.set(r[D+2],r[D+3]),v.set(r[D+4],r[D+5]),b.copy(x).add(M).add(y).divideScalar(3);const C=p(b);g(E,D+0,x,C),g(A,D+2,M,C),g(v,D+4,y,C)}}function g(x,M,y,b){b<0&&x.x===1&&(r[M]=x.x-1),y.x===0&&y.z===0&&(r[M]=b/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rl(t.vertices,t.indices,t.radius,t.detail)}}class Cl extends Rl{constructor(t=1,n=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Cl(t.radius,t.detail)}}class tr extends Rl{constructor(t=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new tr(t.radius,t.detail)}}class Wi extends hn{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const a=t/2,r=n/2,o=Math.floor(i),c=Math.floor(s),h=o+1,d=c+1,l=t/o,u=n/c,f=[],_=[],g=[],p=[];for(let m=0;m<d;m++){const x=m*u-r;for(let M=0;M<h;M++){const y=M*l-a;_.push(y,-x,0),g.push(0,0,1),p.push(M/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<o;x++){const M=x+h*m,y=x+h*(m+1),b=x+1+h*(m+1),E=x+1+h*m;f.push(M,y,E),f.push(y,b,E)}this.setIndex(f),this.setAttribute("position",new xe(_,3)),this.setAttribute("normal",new xe(g,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.widthSegments,t.heightSegments)}}class er extends hn{constructor(t=.5,n=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],h=[],d=[];let l=t;const u=(n-t)/s,f=new F,_=new Pt;for(let g=0;g<=s;g++){for(let p=0;p<=i;p++){const m=a+p/i*r;f.x=l*Math.cos(m),f.y=l*Math.sin(m),c.push(f.x,f.y,f.z),h.push(0,0,1),_.x=(f.x/n+1)/2,_.y=(f.y/n+1)/2,d.push(_.x,_.y)}l+=u}for(let g=0;g<s;g++){const p=g*(i+1);for(let m=0;m<i;m++){const x=m+p,M=x,y=x+i+1,b=x+i+2,E=x+1;o.push(M,y,E),o.push(y,b,E)}}this.setIndex(o),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new er(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ct extends hn{constructor(t=1,n=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(r+o,Math.PI);let h=0;const d=[],l=new F,u=new F,f=[],_=[],g=[],p=[];for(let m=0;m<=i;m++){const x=[],M=m/i;let y=0;m===0&&r===0?y=.5/n:m===i&&c===Math.PI&&(y=-.5/n);for(let b=0;b<=n;b++){const E=b/n;l.x=-t*Math.cos(s+E*a)*Math.sin(r+M*o),l.y=t*Math.cos(r+M*o),l.z=t*Math.sin(s+E*a)*Math.sin(r+M*o),_.push(l.x,l.y,l.z),u.copy(l).normalize(),g.push(u.x,u.y,u.z),p.push(E+y,1-M),x.push(h++)}d.push(x)}for(let m=0;m<i;m++)for(let x=0;x<n;x++){const M=d[m][x+1],y=d[m][x],b=d[m+1][x],E=d[m+1][x+1];(m!==0||r>0)&&f.push(M,y,E),(m!==i-1||c<Math.PI)&&f.push(y,b,E)}this.setIndex(f),this.setAttribute("position",new xe(_,3)),this.setAttribute("normal",new xe(g,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ct(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Qt extends hn{constructor(t=1,n=.4,i=12,s=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const c=[],h=[],d=[],l=[],u=new F,f=new F,_=new F;for(let g=0;g<=i;g++){const p=r+g/i*o;for(let m=0;m<=s;m++){const x=m/s*a;f.x=(t+n*Math.cos(p))*Math.cos(x),f.y=(t+n*Math.cos(p))*Math.sin(x),f.z=n*Math.sin(p),h.push(f.x,f.y,f.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),_.subVectors(f,u).normalize(),d.push(_.x,_.y,_.z),l.push(m/s),l.push(g/i)}}for(let g=1;g<=i;g++)for(let p=1;p<=s;p++){const m=(s+1)*g+p-1,x=(s+1)*(g-1)+p-1,M=(s+1)*(g-1)+p,y=(s+1)*g+p;c.push(m,x,y),c.push(x,M,y)}this.setIndex(c),this.setAttribute("position",new xe(h,3)),this.setAttribute("normal",new xe(d,3)),this.setAttribute("uv",new xe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qt(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function nr(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?($t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function Dn(e){const t={};for(let n=0;n<e.length;n++){const i=nr(e[n]);for(const s in i)t[s]=i[s]}return t}function Dx(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function $p(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const nl={clone:nr,merge:Dn};var Ix=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends cr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ix,this.fragmentShader=Lx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=nr(t.uniforms),this.uniformsGroups=Dx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Ux extends Pn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Zp extends cr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zp,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nx extends cr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Fx extends cr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class wh extends cn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class Ox extends wh{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const mc=new Ge,Qu=new F,tf=new F;class Bx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=ti,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sh,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new We(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;Qu.setFromMatrixPosition(t.matrixWorld),n.position.copy(Qu),tf.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(tf),n.updateMatrixWorld(),mc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===Nr||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const To=new F,bo=new Ls,bi=new F;class jp extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(To,bo,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,bo,bi.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(To,bo,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,bo,bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ys=new F,ef=new Pt,nf=new Pt;class oi extends jp{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Cd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Oo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cd*2*Math.atan(Math.tan(Oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ys.x,ys.y).multiplyScalar(-t/ys.z),ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ys.x,ys.y).multiplyScalar(-t/ys.z)}getViewSize(t,n){return this.getViewBounds(t,ef,nf),n.subVectors(nf,ef)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Oo*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,h=r.fullHeight;a+=r.offsetX*s/c,n-=r.offsetY*i/h,s*=r.width/c,i*=r.height/h}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Pl extends jp{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-t,r=i+t,o=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=h*this.view.offsetX,r=a+h*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class zx extends Bx{constructor(){super(new Pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _c extends wh{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new zx}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class Hx extends wh{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const Aa=-90,Ra=1;class Gx extends cn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new oi(Aa,Ra,t,n);s.layers=this.layers,this.add(s);const a=new oi(Aa,Ra,t,n);a.layers=this.layers,this.add(a);const r=new oi(Aa,Ra,t,n);r.layers=this.layers,this.add(r);const o=new oi(Aa,Ra,t,n);o.layers=this.layers,this.add(o);const c=new oi(Aa,Ra,t,n);c.layers=this.layers,this.add(c);const h=new oi(Aa,Ra,t,n);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,c]=n;for(const h of n)this.remove(h);if(t===Ui)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Nr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of n)this.add(h),h.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,h,d]=this.children,l=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(l,u,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class kx extends oi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Vx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Wx.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Wx(){this._document.hidden===!1&&this.reset()}const sf=new Ge;class Kp{constructor(t,n,i=0,s=1/0){this.ray=new Al(t,n),this.near=i,this.far=s,this.camera=null,this.layers=new Mh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):me("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return sf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sf),this}intersectObject(t,n=!0,i=[]){return Pd(t,this,i,n),i.sort(af),i}intersectObjects(t,n=!0,i=[]){for(let s=0,a=t.length;s<a;s++)Pd(t[s],this,i,n);return i.sort(af),i}}function af(e,t){return e.distance-t.distance}function Pd(e,t,n,i){let s=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(s=!1),s===!0&&i===!0){const a=e.children;for(let r=0,o=a.length;r<o;r++)Pd(a[r],t,n,!0)}}class rf{constructor(t=1,n=0,i=0){this.radius=t,this.phi=n,this.theta=i}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=he(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(he(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Xx extends da{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){$t("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function of(e,t,n,i){const s=qx(i);switch(n){case Fp:return e*t;case Bp:return e*t/s.components*s.byteLength;case ph:return e*t/s.components*s.byteLength;case Ka:return e*t*2/s.components*s.byteLength;case mh:return e*t*2/s.components*s.byteLength;case Op:return e*t*3/s.components*s.byteLength;case Ei:return e*t*4/s.components*s.byteLength;case _h:return e*t*4/s.components*s.byteLength;case Lo:case Uo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case No:case Fo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Jc:case td:return Math.max(e,16)*Math.max(t,8)/4;case Kc:case Qc:return Math.max(e,8)*Math.max(t,8)/2;case ed:case nd:case sd:case ad:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case id:case rd:case od:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ld:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case dd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case hd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ud:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case fd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case pd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case md:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _d:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case gd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case vd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Md:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case yd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Sd:case Ed:case wd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Td:case bd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ad:case Rd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function qx(e){switch(e){case ti:case Ip:return{byteLength:1,components:1};case Lr:case Lp:case ni:return{byteLength:2,components:1};case uh:case fh:return{byteLength:2,components:4};case ki:case hh:case Li:return{byteLength:4,components:1};case Up:case Np:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ch}}));typeof window<"u"&&(window.__THREE__?$t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ch);function Jp(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function Yx(e){const t=new WeakMap;function n(o,c){const h=o.array,d=o.usage,l=h.byteLength,u=e.createBuffer();e.bindBuffer(c,u),e.bufferData(c,h,d),o.onUploadCallback();let f;if(h instanceof Float32Array)f=e.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)f=e.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=e.HALF_FLOAT:f=e.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=e.SHORT;else if(h instanceof Uint32Array)f=e.UNSIGNED_INT;else if(h instanceof Int32Array)f=e.INT;else if(h instanceof Int8Array)f=e.BYTE;else if(h instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:l}}function i(o,c,h){const d=c.array,l=c.updateRanges;if(e.bindBuffer(h,o),l.length===0)e.bufferSubData(h,0,d);else{l.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<l.length;f++){const _=l[u],g=l[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++u,l[u]=g)}l.length=u+1;for(let f=0,_=l.length;f<_;f++){const g=l[f];e.bufferSubData(h,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,n(o,c));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,c),h.version=o.version}}return{get:s,remove:a,update:r}}var $x=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,jx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ev=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,iv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,av=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ov=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_v=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,gv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Mv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ev=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Iv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ov=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$v=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,iM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,uM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_M=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,MM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,SM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,EM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,TM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,AM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,CM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,PM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,IM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,LM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,NM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,FM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,OM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,BM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,GM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,VM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const YM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$M=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ty=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ey=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ny=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ry=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,oy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ly=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,uy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,py=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,my=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_y=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,My=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ey=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ty=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,by=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ae={alphahash_fragment:$x,alphahash_pars_fragment:Zx,alphamap_fragment:jx,alphamap_pars_fragment:Kx,alphatest_fragment:Jx,alphatest_pars_fragment:Qx,aomap_fragment:tv,aomap_pars_fragment:ev,batching_pars_vertex:nv,batching_vertex:iv,begin_vertex:sv,beginnormal_vertex:av,bsdfs:rv,iridescence_fragment:ov,bumpmap_pars_fragment:lv,clipping_planes_fragment:cv,clipping_planes_pars_fragment:dv,clipping_planes_pars_vertex:hv,clipping_planes_vertex:uv,color_fragment:fv,color_pars_fragment:pv,color_pars_vertex:mv,color_vertex:_v,common:gv,cube_uv_reflection_fragment:xv,defaultnormal_vertex:vv,displacementmap_pars_vertex:Mv,displacementmap_vertex:yv,emissivemap_fragment:Sv,emissivemap_pars_fragment:Ev,colorspace_fragment:wv,colorspace_pars_fragment:Tv,envmap_fragment:bv,envmap_common_pars_fragment:Av,envmap_pars_fragment:Rv,envmap_pars_vertex:Cv,envmap_physical_pars_fragment:Hv,envmap_vertex:Pv,fog_vertex:Dv,fog_pars_vertex:Iv,fog_fragment:Lv,fog_pars_fragment:Uv,gradientmap_pars_fragment:Nv,lightmap_pars_fragment:Fv,lights_lambert_fragment:Ov,lights_lambert_pars_fragment:Bv,lights_pars_begin:zv,lights_toon_fragment:Gv,lights_toon_pars_fragment:kv,lights_phong_fragment:Vv,lights_phong_pars_fragment:Wv,lights_physical_fragment:Xv,lights_physical_pars_fragment:qv,lights_fragment_begin:Yv,lights_fragment_maps:$v,lights_fragment_end:Zv,logdepthbuf_fragment:jv,logdepthbuf_pars_fragment:Kv,logdepthbuf_pars_vertex:Jv,logdepthbuf_vertex:Qv,map_fragment:tM,map_pars_fragment:eM,map_particle_fragment:nM,map_particle_pars_fragment:iM,metalnessmap_fragment:sM,metalnessmap_pars_fragment:aM,morphinstance_vertex:rM,morphcolor_vertex:oM,morphnormal_vertex:lM,morphtarget_pars_vertex:cM,morphtarget_vertex:dM,normal_fragment_begin:hM,normal_fragment_maps:uM,normal_pars_fragment:fM,normal_pars_vertex:pM,normal_vertex:mM,normalmap_pars_fragment:_M,clearcoat_normal_fragment_begin:gM,clearcoat_normal_fragment_maps:xM,clearcoat_pars_fragment:vM,iridescence_pars_fragment:MM,opaque_fragment:yM,packing:SM,premultiplied_alpha_fragment:EM,project_vertex:wM,dithering_fragment:TM,dithering_pars_fragment:bM,roughnessmap_fragment:AM,roughnessmap_pars_fragment:RM,shadowmap_pars_fragment:CM,shadowmap_pars_vertex:PM,shadowmap_vertex:DM,shadowmask_pars_fragment:IM,skinbase_vertex:LM,skinning_pars_vertex:UM,skinning_vertex:NM,skinnormal_vertex:FM,specularmap_fragment:OM,specularmap_pars_fragment:BM,tonemapping_fragment:zM,tonemapping_pars_fragment:HM,transmission_fragment:GM,transmission_pars_fragment:kM,uv_pars_fragment:VM,uv_pars_vertex:WM,uv_vertex:XM,worldpos_vertex:qM,background_vert:YM,background_frag:$M,backgroundCube_vert:ZM,backgroundCube_frag:jM,cube_vert:KM,cube_frag:JM,depth_vert:QM,depth_frag:ty,distance_vert:ey,distance_frag:ny,equirect_vert:iy,equirect_frag:sy,linedashed_vert:ay,linedashed_frag:ry,meshbasic_vert:oy,meshbasic_frag:ly,meshlambert_vert:cy,meshlambert_frag:dy,meshmatcap_vert:hy,meshmatcap_frag:uy,meshnormal_vert:fy,meshnormal_frag:py,meshphong_vert:my,meshphong_frag:_y,meshphysical_vert:gy,meshphysical_frag:xy,meshtoon_vert:vy,meshtoon_frag:My,points_vert:yy,points_frag:Sy,shadow_vert:Ey,shadow_frag:wy,sprite_vert:Ty,sprite_frag:by},yt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},Ci={basic:{uniforms:Dn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:Dn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:Dn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:Dn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:Dn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:Dn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:Dn([yt.points,yt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:Dn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:Dn([yt.common,yt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:Dn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:Dn([yt.sprite,yt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distance:{uniforms:Dn([yt.common,yt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distance_vert,fragmentShader:ae.distance_frag},shadow:{uniforms:Dn([yt.lights,yt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};Ci.physical={uniforms:Dn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};const Ao={r:0,b:0,g:0},Xs=new Vi,Ay=new Ge;function Ry(e,t,n,i,s,a){const r=new Ft(0);let o=s===!0?0:1,c,h,d=null,l=0,u=null;function f(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const y=x.backgroundBlurriness>0;M=t.get(M,y)}return M}function _(x){let M=!1;const y=f(x);y===null?p(r,o):y&&y.isColor&&(p(y,1),M=!0);const b=e.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(x,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===Tl)?(h===void 0&&(h=new T(new z(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:nr(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Xs.copy(M.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ay.makeRotationFromEuler(Xs)),h.material.toneMapped=_e.getTransfer(y.colorSpace)!==we,(d!==y||l!==y.version||u!==e.toneMapping)&&(h.material.needsUpdate=!0,d=y,l=y.version,u=e.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new T(new Wi(2,2),new Pn({name:"BackgroundMaterial",uniforms:nr(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Is,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=_e.getTransfer(y.colorSpace)!==we,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||l!==y.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=y,l=y.version,u=e.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,M){x.getRGB(Ao,$p(e)),n.buffers.color.setClear(Ao.r,Ao.g,Ao.b,M,a)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,M=1){r.set(x),o=M,p(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(r,o)},render:_,addToRenderList:g,dispose:m}}function Cy(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,r=!1;function o(C,L,U,V,B){let W=!1;const G=l(C,V,U,L);a!==G&&(a=G,h(a.object)),W=f(C,V,U,B),W&&_(C,V,U,B),B!==null&&t.update(B,e.ELEMENT_ARRAY_BUFFER),(W||r)&&(r=!1,y(C,L,U,V),B!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return e.createVertexArray()}function h(C){return e.bindVertexArray(C)}function d(C){return e.deleteVertexArray(C)}function l(C,L,U,V){const B=V.wireframe===!0;let W=i[L.id];W===void 0&&(W={},i[L.id]=W);const G=C.isInstancedMesh===!0?C.id:0;let et=W[G];et===void 0&&(et={},W[G]=et);let nt=et[U.id];nt===void 0&&(nt={},et[U.id]=nt);let pt=nt[B];return pt===void 0&&(pt=u(c()),nt[B]=pt),pt}function u(C){const L=[],U=[],V=[];for(let B=0;B<n;B++)L[B]=0,U[B]=0,V[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:V,object:C,attributes:{},index:null}}function f(C,L,U,V){const B=a.attributes,W=L.attributes;let G=0;const et=U.getAttributes();for(const nt in et)if(et[nt].location>=0){const at=B[nt];let dt=W[nt];if(dt===void 0&&(nt==="instanceMatrix"&&C.instanceMatrix&&(dt=C.instanceMatrix),nt==="instanceColor"&&C.instanceColor&&(dt=C.instanceColor)),at===void 0||at.attribute!==dt||dt&&at.data!==dt.data)return!0;G++}return a.attributesNum!==G||a.index!==V}function _(C,L,U,V){const B={},W=L.attributes;let G=0;const et=U.getAttributes();for(const nt in et)if(et[nt].location>=0){let at=W[nt];at===void 0&&(nt==="instanceMatrix"&&C.instanceMatrix&&(at=C.instanceMatrix),nt==="instanceColor"&&C.instanceColor&&(at=C.instanceColor));const dt={};dt.attribute=at,at&&at.data&&(dt.data=at.data),B[nt]=dt,G++}a.attributes=B,a.attributesNum=G,a.index=V}function g(){const C=a.newAttributes;for(let L=0,U=C.length;L<U;L++)C[L]=0}function p(C){m(C,0)}function m(C,L){const U=a.newAttributes,V=a.enabledAttributes,B=a.attributeDivisors;U[C]=1,V[C]===0&&(e.enableVertexAttribArray(C),V[C]=1),B[C]!==L&&(e.vertexAttribDivisor(C,L),B[C]=L)}function x(){const C=a.newAttributes,L=a.enabledAttributes;for(let U=0,V=L.length;U<V;U++)L[U]!==C[U]&&(e.disableVertexAttribArray(U),L[U]=0)}function M(C,L,U,V,B,W,G){G===!0?e.vertexAttribIPointer(C,L,U,B,W):e.vertexAttribPointer(C,L,U,V,B,W)}function y(C,L,U,V){g();const B=V.attributes,W=U.getAttributes(),G=L.defaultAttributeValues;for(const et in W){const nt=W[et];if(nt.location>=0){let pt=B[et];if(pt===void 0&&(et==="instanceMatrix"&&C.instanceMatrix&&(pt=C.instanceMatrix),et==="instanceColor"&&C.instanceColor&&(pt=C.instanceColor)),pt!==void 0){const at=pt.normalized,dt=pt.itemSize,Wt=t.get(pt);if(Wt===void 0)continue;const Te=Wt.buffer,Fe=Wt.type,Q=Wt.bytesPerElement,mt=Fe===e.INT||Fe===e.UNSIGNED_INT||pt.gpuType===hh;if(pt.isInterleavedBufferAttribute){const Mt=pt.data,ee=Mt.stride,Xt=pt.offset;if(Mt.isInstancedInterleavedBuffer){for(let Zt=0;Zt<nt.locationSize;Zt++)m(nt.location+Zt,Mt.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Zt=0;Zt<nt.locationSize;Zt++)p(nt.location+Zt);e.bindBuffer(e.ARRAY_BUFFER,Te);for(let Zt=0;Zt<nt.locationSize;Zt++)M(nt.location+Zt,dt/nt.locationSize,Fe,at,ee*Q,(Xt+dt/nt.locationSize*Zt)*Q,mt)}else{if(pt.isInstancedBufferAttribute){for(let Mt=0;Mt<nt.locationSize;Mt++)m(nt.location+Mt,pt.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Mt=0;Mt<nt.locationSize;Mt++)p(nt.location+Mt);e.bindBuffer(e.ARRAY_BUFFER,Te);for(let Mt=0;Mt<nt.locationSize;Mt++)M(nt.location+Mt,dt/nt.locationSize,Fe,at,dt*Q,dt/nt.locationSize*Mt*Q,mt)}}else if(G!==void 0){const at=G[et];if(at!==void 0)switch(at.length){case 2:e.vertexAttrib2fv(nt.location,at);break;case 3:e.vertexAttrib3fv(nt.location,at);break;case 4:e.vertexAttrib4fv(nt.location,at);break;default:e.vertexAttrib1fv(nt.location,at)}}}}x()}function b(){w();for(const C in i){const L=i[C];for(const U in L){const V=L[U];for(const B in V){const W=V[B];for(const G in W)d(W[G].object),delete W[G];delete V[B]}}delete i[C]}}function E(C){if(i[C.id]===void 0)return;const L=i[C.id];for(const U in L){const V=L[U];for(const B in V){const W=V[B];for(const G in W)d(W[G].object),delete W[G];delete V[B]}}delete i[C.id]}function A(C){for(const L in i){const U=i[L];for(const V in U){const B=U[V];if(B[C.id]===void 0)continue;const W=B[C.id];for(const G in W)d(W[G].object),delete W[G];delete B[C.id]}}}function v(C){for(const L in i){const U=i[L],V=C.isInstancedMesh===!0?C.id:0,B=U[V];if(B!==void 0){for(const W in B){const G=B[W];for(const et in G)d(G[et].object),delete G[et];delete B[W]}delete U[V],Object.keys(U).length===0&&delete i[L]}}}function w(){D(),r=!0,a!==s&&(a=s,h(a.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:D,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function Py(e,t,n){let i;function s(h){i=h}function a(h,d){e.drawArrays(i,h,d),n.update(d,i,1)}function r(h,d,l){l!==0&&(e.drawArraysInstanced(i,h,d,l),n.update(d,i,l))}function o(h,d,l){if(l===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,d,0,l);let f=0;for(let _=0;_<l;_++)f+=d[_];n.update(f,i,1)}function c(h,d,l,u){if(l===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<h.length;_++)r(h[_],d[_],u[_]);else{f.multiDrawArraysInstancedWEBGL(i,h,0,d,0,u,0,l);let _=0;for(let g=0;g<l;g++)_+=d[g]*u[g];n.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Dy(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(A){return!(A!==Ei&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===ni&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==ti&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Li&&!v)}function c(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=n.precision!==void 0?n.precision:"highp";const d=c(h);d!==h&&($t("WebGLRenderer:",h,"not supported, using",d,"instead."),h=d);const l=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),m=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),b=e.getParameter(e.MAX_SAMPLES),E=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:l,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,maxSamples:b,samples:E}}function Iy(e){const t=this;let n=null,i=0,s=!1,a=!1;const r=new Ri,o=new ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(l,u){const f=l.length!==0||u||i!==0||s;return s=u,i=l.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(l,u){n=d(l,u,0)},this.setState=function(l,u,f){const _=l.clippingPlanes,g=l.clipIntersection,p=l.clipShadows,m=e.get(l);if(!s||_===null||_.length===0||a&&!p)a?d(null):h();else{const x=a?0:i,M=x*4;let y=m.clippingState||null;c.value=y,y=d(_,u,M,f);for(let b=0;b!==M;++b)y[b]=n[b];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function h(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(l,u,f,_){const g=l!==null?l.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const m=f+g*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,y=f;M!==g;++M,y+=4)r.copy(l[M]).applyMatrix4(x,o),r.normal.toArray(p,y),p[y+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}const Cs=4,lf=[.125,.215,.35,.446,.526,.582],Zs=20,Ly=256,xr=new Pl,cf=new Ft;let gc=null,xc=0,vc=0,Mc=!1;const Uy=new F;class df{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){const{size:r=256,position:o=Uy}=a;gc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ff(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gc,xc,vc),this._renderer.xr.enabled=Mc,t.scissorTest=!1,Ca(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ca||t.mapping===ja?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:ni,format:Ei,colorSpace:Ja,depthBuffer:!1},s=hf(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hf(t,n,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ny(a)),this._blurMaterial=Oy(a,t,n),this._ggxMaterial=Fy(a,t,n)}return s}_compileMaterial(t){const n=new T(new hn,t);this._renderer.compile(n,xr)}_sceneToCubeUV(t,n,i,s,a){const c=new oi(90,1,n,i),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(cf),l.toneMapping=Bi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(s),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new T(new z,new Fn({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,p=g.material;let m=!1;const x=t.background;x?x.isColor&&(p.color.copy(x),t.background=null,m=!0):(p.color.copy(cf),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(c.up.set(0,h[M],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+d[M],a.y,a.z)):y===1?(c.up.set(0,0,h[M]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+d[M],a.z)):(c.up.set(0,h[M],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+d[M]));const b=this._cubeSize;Ca(s,y*b,M>2?b:0,b,b),l.setRenderTarget(s),m&&l.render(g,c),l.render(t,c)}l.toneMapping=f,l.autoClear=u,t.background=x}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===ca||t.mapping===ja;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ff()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uf());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=t;const c=this._cubeSize;Ca(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(r,xr)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const c=r.uniforms,h=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),l=Math.sqrt(h*h-d*d),u=0+h*1.25,f=l*u,{_lodMax:_}=this,g=this._sizeLods[i],p=3*g*(i>_-Cs?i-_+Cs:0),m=4*(this._cubeSize-g);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=_-n,Ca(a,p,m,3*g,2*g),s.setRenderTarget(a),s.render(o,xr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=_-i,Ca(t,p,m,3*g,2*g),s.setRenderTarget(t),s.render(o,xr)}_blur(t,n,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){const c=this._renderer,h=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&me("blur direction must be either latitudinal or longitudinal!");const d=3,l=this._lodMeshes[s];l.material=h;const u=h.uniforms,f=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Zs-1),g=a/_,p=isFinite(a)?1+Math.floor(d*g):Zs;p>Zs&&$t(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zs}`);const m=[];let x=0;for(let A=0;A<Zs;++A){const v=A/g,w=Math.exp(-v*v/2);m.push(w),A===0?x+=w:A<p&&(x+=2*w)}for(let A=0;A<m.length;A++)m[A]=m[A]/x;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=_,u.mipInt.value=M-i;const y=this._sizeLods[s],b=3*y*(s>M-Cs?s-M+Cs:0),E=4*(this._cubeSize-y);Ca(n,b,E,3*y,2*y),c.setRenderTarget(n),c.render(l,xr)}}function Ny(e){const t=[],n=[],i=[];let s=e;const a=e-Cs+1+lf.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let c=1/o;r>e-Cs?c=lf[r-e+Cs-1]:r===0&&(c=0),n.push(c);const h=1/(o-2),d=-h,l=1+h,u=[d,d,l,d,l,l,d,d,l,l,d,l],f=6,_=6,g=3,p=2,m=1,x=new Float32Array(g*_*f),M=new Float32Array(p*_*f),y=new Float32Array(m*_*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,v=E>2?0:-1,w=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];x.set(w,g*_*E),M.set(u,p*_*E);const D=[E,E,E,E,E,E];y.set(D,m*_*E)}const b=new hn;b.setAttribute("position",new zi(x,g)),b.setAttribute("uv",new zi(M,p)),b.setAttribute("faceIndex",new zi(y,m)),i.push(new T(b,null)),s>Cs&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function hf(e,t,n){const i=new Xn(e,t,n);return i.texture.mapping=Tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ca(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function Fy(e,t,n){return new Pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ly,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Oy(e,t,n){const i=new Float32Array(Zs),s=new F(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function uf(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function ff(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Dl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Qp extends Xn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new qp(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new z(5,5,5),a=new Pn({name:"CubemapFromEquirect",uniforms:nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wn,blending:Oi});a.uniforms.tEquirect.value=n;const r=new T(s,a),o=n.minFilter;return n.minFilter===Ks&&(n.minFilter=Cn),new Gx(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}}function By(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){const f=u.mapping;if(f===kl||f===Vl)if(t.has(u)){const _=t.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const g=new Qp(_.height);return g.fromEquirectangularTexture(e,u),t.set(u,g),u.addEventListener("dispose",h),o(g.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const f=u.mapping,_=f===kl||f===Vl,g=f===ca||f===ja;if(_||g){let p=n.get(u);const m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new df(e)),p=_?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),p.texture;if(p!==void 0)return p.texture;{const x=u.image;return _&&x&&x.height>0||g&&x&&c(x)?(i===null&&(i=new df(e)),p=_?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),u.addEventListener("dispose",d),p.texture):null}}}return u}function o(u,f){return f===kl?u.mapping=ca:f===Vl&&(u.mapping=ja),u}function c(u){let f=0;const _=6;for(let g=0;g<_;g++)u[g]!==void 0&&f++;return f===_}function h(u){const f=u.target;f.removeEventListener("dispose",h);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function d(u){const f=u.target;f.removeEventListener("dispose",d);const _=n.get(f);_!==void 0&&(n.delete(f),_.dispose())}function l(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:l}}function zy(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Qo("WebGLRenderer: "+i+" extension not supported."),s}}}function Hy(e,t,n,i){const s={},a=new WeakMap;function r(l){const u=l.target;u.index!==null&&t.remove(u.index);for(const _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",r),delete s[u.id];const f=a.get(u);f&&(t.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(l,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function c(l){const u=l.attributes;for(const f in u)t.update(u[f],e.ARRAY_BUFFER)}function h(l){const u=[],f=l.index,_=l.attributes.position;let g=0;if(_===void 0)return;if(f!==null){const x=f.array;g=f.version;for(let M=0,y=x.length;M<y;M+=3){const b=x[M+0],E=x[M+1],A=x[M+2];u.push(b,E,E,A,A,b)}}else{const x=_.array;g=_.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const b=M+0,E=M+1,A=M+2;u.push(b,E,E,A,A,b)}}const p=new(_.count>=65535?Wp:Vp)(u,1);p.version=g;const m=a.get(l);m&&t.remove(m),a.set(l,p)}function d(l){const u=a.get(l);if(u){const f=l.index;f!==null&&u.version<f.version&&h(l)}else h(l);return a.get(l)}return{get:o,update:c,getWireframeAttribute:d}}function Gy(e,t,n){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function c(u,f){e.drawElements(i,f,a,u*r),n.update(f,i,1)}function h(u,f,_){_!==0&&(e.drawElementsInstanced(i,f,a,u*r,_),n.update(f,i,_))}function d(u,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];n.update(p,i,1)}function l(u,f,_,g){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)h(u[m]/r,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,g,0,_);let m=0;for(let x=0;x<_;x++)m+=f[x]*g[x];n.update(m,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=l}function ky(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:me("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Vy(e,t,n){const i=new WeakMap,s=new We;function a(r,o,c){const h=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==l){let D=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var f=D;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let b=o.attributes.position.count*y,E=1;b>t.maxTextureSize&&(E=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const A=new Float32Array(b*E*4*l),v=new Gp(A,b,E,l);v.type=Li,v.needsUpdate=!0;const w=y*4;for(let C=0;C<l;C++){const L=m[C],U=x[C],V=M[C],B=b*E*4*C;for(let W=0;W<L.count;W++){const G=W*w;_===!0&&(s.fromBufferAttribute(L,W),A[B+G+0]=s.x,A[B+G+1]=s.y,A[B+G+2]=s.z,A[B+G+3]=0),g===!0&&(s.fromBufferAttribute(U,W),A[B+G+4]=s.x,A[B+G+5]=s.y,A[B+G+6]=s.z,A[B+G+7]=0),p===!0&&(s.fromBufferAttribute(V,W),A[B+G+8]=s.x,A[B+G+9]=s.y,A[B+G+10]=s.z,A[B+G+11]=V.itemSize===4?s.w:1)}}u={count:l,texture:v,size:new Pt(b,E)},i.set(o,u),o.addEventListener("dispose",D)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let _=0;for(let p=0;p<h.length;p++)_+=h[p];const g=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(e,"morphTargetBaseInfluence",g),c.getUniforms().setValue(e,"morphTargetInfluences",h)}c.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function Wy(e,t,n,i,s){let a=new WeakMap;function r(h){const d=s.render.frame,l=h.geometry,u=t.get(h,l);if(a.get(u)!==d&&(t.update(u),a.set(u,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),a.get(h)!==d&&(n.update(h.instanceMatrix,e.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,e.ARRAY_BUFFER),a.set(h,d))),h.isSkinnedMesh){const f=h.skeleton;a.get(f)!==d&&(f.update(),a.set(f,d))}return u}function o(){a=new WeakMap}function c(h){const d=h.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const Xy={[Tp]:"LINEAR_TONE_MAPPING",[bp]:"REINHARD_TONE_MAPPING",[Ap]:"CINEON_TONE_MAPPING",[dh]:"ACES_FILMIC_TONE_MAPPING",[Cp]:"AGX_TONE_MAPPING",[Pp]:"NEUTRAL_TONE_MAPPING",[Rp]:"CUSTOM_TONE_MAPPING"};function qy(e,t,n,i,s){const a=new Xn(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),r=new Xn(t,n,{type:ni,depthBuffer:!1,stencilBuffer:!1}),o=new hn;o.setAttribute("position",new xe([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new xe([0,2,0,0,2,0],2));const c=new Ux({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new T(o,c),d=new Pl(-1,1,1,-1,0,1);let l=null,u=null,f=!1,_,g=null,p=[],m=!1;this.setSize=function(x,M){a.setSize(x,M),r.setSize(x,M);for(let y=0;y<p.length;y++){const b=p[y];b.setSize&&b.setSize(x,M)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const M=a.width,y=a.height;for(let b=0;b<p.length;b++){const E=p[b];E.setSize&&E.setSize(M,y)}},this.begin=function(x,M){if(f||x.toneMapping===Bi&&p.length===0)return!1;if(g=M,M!==null){const y=M.width,b=M.height;(a.width!==y||a.height!==b)&&this.setSize(y,b)}return m===!1&&x.setRenderTarget(a),_=x.toneMapping,x.toneMapping=Bi,!0},this.hasRenderPass=function(){return m},this.end=function(x,M){x.toneMapping=_,f=!0;let y=a,b=r;for(let E=0;E<p.length;E++){const A=p[E];if(A.enabled!==!1&&(A.render(x,b,y,M),A.needsSwap!==!1)){const v=y;y=b,b=v}}if(l!==x.outputColorSpace||u!==x.toneMapping){l=x.outputColorSpace,u=x.toneMapping,c.defines={},_e.getTransfer(l)===we&&(c.defines.SRGB_TRANSFER="");const E=Xy[u];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(g),x.render(h,d),g=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),c.dispose()}}const tm=new Nn,Dd=new Fr(1,1),em=new Gp,nm=new dx,im=new qp,pf=[],mf=[],_f=new Float32Array(16),gf=new Float32Array(9),xf=new Float32Array(4);function dr(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let a=pf[s];if(a===void 0&&(a=new Float32Array(s),pf[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function en(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function nn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Il(e,t){let n=mf[t];n===void 0&&(n=new Int32Array(t),mf[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Yy(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function $y(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2fv(this.addr,t),nn(n,t)}}function Zy(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(en(n,t))return;e.uniform3fv(this.addr,t),nn(n,t)}}function jy(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4fv(this.addr,t),nn(n,t)}}function Ky(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;xf.set(i),e.uniformMatrix2fv(this.addr,!1,xf),nn(n,i)}}function Jy(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;gf.set(i),e.uniformMatrix3fv(this.addr,!1,gf),nn(n,i)}}function Qy(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;_f.set(i),e.uniformMatrix4fv(this.addr,!1,_f),nn(n,i)}}function tS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function eS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2iv(this.addr,t),nn(n,t)}}function nS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(en(n,t))return;e.uniform3iv(this.addr,t),nn(n,t)}}function iS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4iv(this.addr,t),nn(n,t)}}function sS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function aS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2uiv(this.addr,t),nn(n,t)}}function rS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(en(n,t))return;e.uniform3uiv(this.addr,t),nn(n,t)}}function oS(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4uiv(this.addr,t),nn(n,t)}}function lS(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(Dd.compareFunction=n.isReversedDepthBuffer()?xh:gh,a=Dd):a=tm,n.setTexture2D(t||a,s)}function cS(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||nm,s)}function dS(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||im,s)}function hS(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||em,s)}function uS(e){switch(e){case 5126:return Yy;case 35664:return $y;case 35665:return Zy;case 35666:return jy;case 35674:return Ky;case 35675:return Jy;case 35676:return Qy;case 5124:case 35670:return tS;case 35667:case 35671:return eS;case 35668:case 35672:return nS;case 35669:case 35673:return iS;case 5125:return sS;case 36294:return aS;case 36295:return rS;case 36296:return oS;case 35678:case 36198:case 36298:case 36306:case 35682:return lS;case 35679:case 36299:case 36307:return cS;case 35680:case 36300:case 36308:case 36293:return dS;case 36289:case 36303:case 36311:case 36292:return hS}}function fS(e,t){e.uniform1fv(this.addr,t)}function pS(e,t){const n=dr(t,this.size,2);e.uniform2fv(this.addr,n)}function mS(e,t){const n=dr(t,this.size,3);e.uniform3fv(this.addr,n)}function _S(e,t){const n=dr(t,this.size,4);e.uniform4fv(this.addr,n)}function gS(e,t){const n=dr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function xS(e,t){const n=dr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function vS(e,t){const n=dr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function MS(e,t){e.uniform1iv(this.addr,t)}function yS(e,t){e.uniform2iv(this.addr,t)}function SS(e,t){e.uniform3iv(this.addr,t)}function ES(e,t){e.uniform4iv(this.addr,t)}function wS(e,t){e.uniform1uiv(this.addr,t)}function TS(e,t){e.uniform2uiv(this.addr,t)}function bS(e,t){e.uniform3uiv(this.addr,t)}function AS(e,t){e.uniform4uiv(this.addr,t)}function RS(e,t,n){const i=this.cache,s=t.length,a=Il(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=Dd:r=tm;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function CS(e,t,n){const i=this.cache,s=t.length,a=Il(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||nm,a[r])}function PS(e,t,n){const i=this.cache,s=t.length,a=Il(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||im,a[r])}function DS(e,t,n){const i=this.cache,s=t.length,a=Il(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||em,a[r])}function IS(e){switch(e){case 5126:return fS;case 35664:return pS;case 35665:return mS;case 35666:return _S;case 35674:return gS;case 35675:return xS;case 35676:return vS;case 5124:case 35670:return MS;case 35667:case 35671:return yS;case 35668:case 35672:return SS;case 35669:case 35673:return ES;case 5125:return wS;case 36294:return TS;case 36295:return bS;case 36296:return AS;case 35678:case 36198:case 36298:case 36306:case 35682:return RS;case 35679:case 36299:case 36307:return CS;case 35680:case 36300:case 36308:case 36293:return PS;case 36289:case 36303:case 36311:case 36292:return DS}}class LS{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=uS(n.type)}}class US{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=IS(n.type)}}class NS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(t,n[o.id],i)}}}const yc=/(\w+)(\])?(\[|\.)?/g;function vf(e,t){e.seq.push(t),e.map[t.id]=t}function FS(e,t,n){const i=e.name,s=i.length;for(yc.lastIndex=0;;){const a=yc.exec(i),r=yc.lastIndex;let o=a[1];const c=a[2]==="]",h=a[3];if(c&&(o=o|0),h===void 0||h==="["&&r+2===s){vf(n,h===void 0?new LS(o,e,t):new US(o,e,t));break}else{let l=n.map[o];l===void 0&&(l=new NS(o),vf(n,l)),n=l}}}class Bo{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(n,r),c=t.getUniformLocation(n,o.name);FS(o,c,this)}const s=[],a=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){const a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){const o=n[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,a=t.length;s!==a;++s){const r=t[s];r.id in n&&i.push(r)}return i}}function Mf(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const OS=37297;let BS=0;function zS(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const yf=new ne;function HS(e){_e._getMatrix(yf,_e.workingColorSpace,e);const t=`mat3( ${yf.elements.map(n=>n.toFixed(4))} )`;switch(_e.getTransfer(e)){case Ko:return[t,"LinearTransferOETF"];case we:return[t,"sRGBTransferOETF"];default:return $t("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Sf(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+zS(e.getShaderSource(t),o)}else return a}function GS(e,t){const n=HS(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const kS={[Tp]:"Linear",[bp]:"Reinhard",[Ap]:"Cineon",[dh]:"ACESFilmic",[Cp]:"AgX",[Pp]:"Neutral",[Rp]:"Custom"};function VS(e,t){const n=kS[t];return n===void 0?($t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ro=new F;function WS(){_e.getLuminanceCoefficients(Ro);const e=Ro.x.toFixed(4),t=Ro.y.toFixed(4),n=Ro.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XS(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function qS(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function YS(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=e.getActiveAttrib(t,s),r=a.name;let o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function Sr(e){return e!==""}function Ef(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const $S=/^[ \t]*#include +<([\w\d./]+)>/gm;function Id(e){return e.replace($S,jS)}const ZS=new Map;function jS(e,t){let n=ae[t];if(n===void 0){const i=ZS.get(t);if(i!==void 0)n=ae[i],$t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Id(n)}const KS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tf(e){return e.replace(KS,JS)}function JS(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function bf(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const QS={[Io]:"SHADOWMAP_TYPE_PCF",[yr]:"SHADOWMAP_TYPE_VSM"};function t1(e){return QS[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const e1={[ca]:"ENVMAP_TYPE_CUBE",[ja]:"ENVMAP_TYPE_CUBE",[Tl]:"ENVMAP_TYPE_CUBE_UV"};function n1(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":e1[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const i1={[ja]:"ENVMAP_MODE_REFRACTION"};function s1(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":i1[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a1={[wp]:"ENVMAP_BLENDING_MULTIPLY",[kg]:"ENVMAP_BLENDING_MIX",[Vg]:"ENVMAP_BLENDING_ADD"};function r1(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":a1[e.combine]||"ENVMAP_BLENDING_NONE"}function o1(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function l1(e,t,n,i){const s=e.getContext(),a=n.defines;let r=n.vertexShader,o=n.fragmentShader;const c=t1(n),h=n1(n),d=s1(n),l=r1(n),u=o1(n),f=XS(n),_=qS(a),g=s.createProgram();let p,m,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Sr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Sr).join(`
`),m.length>0&&(m+=`
`)):(p=[bf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),m=[bf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",n.envMap?"#define "+l:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Bi?"#define TONE_MAPPING":"",n.toneMapping!==Bi?ae.tonemapping_pars_fragment:"",n.toneMapping!==Bi?VS("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,GS("linearToOutputTexel",n.outputColorSpace),WS(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Sr).join(`
`)),r=Id(r),r=Ef(r,n),r=wf(r,n),o=Id(o),o=Ef(o,n),o=wf(o,n),r=Tf(r),o=Tf(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",n.glslVersion===Iu?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Iu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=x+p+r,y=x+m+o,b=Mf(s,s.VERTEX_SHADER,M),E=Mf(s,s.FRAGMENT_SHADER,y);s.attachShader(g,b),s.attachShader(g,E),n.index0AttributeName!==void 0?s.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(C){if(e.debug.checkShaderErrors){const L=s.getProgramInfoLog(g)||"",U=s.getShaderInfoLog(b)||"",V=s.getShaderInfoLog(E)||"",B=L.trim(),W=U.trim(),G=V.trim();let et=!0,nt=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(et=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,g,b,E);else{const pt=Sf(s,b,"vertex"),at=Sf(s,E,"fragment");me("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+pt+`
`+at)}else B!==""?$t("WebGLProgram: Program Info Log:",B):(W===""||G==="")&&(nt=!1);nt&&(C.diagnostics={runnable:et,programLog:B,vertexShader:{log:W,prefix:p},fragmentShader:{log:G,prefix:m}})}s.deleteShader(b),s.deleteShader(E),v=new Bo(s,g),w=YS(s,g)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(g,OS)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=BS++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=E,this}let c1=0;class d1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new h1(t),n.set(t,i)),i}}class h1{constructor(t){this.id=c1++,this.code=t,this.usedTimes=0}}function u1(e,t,n,i,s,a){const r=new Mh,o=new d1,c=new Set,h=[],d=new Map,l=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function g(v,w,D,C,L){const U=C.fog,V=L.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,G=t.get(v.envMap||B,W),et=G&&G.mapping===Tl?G.image.height:null,nt=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&$t("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const pt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,at=pt!==void 0?pt.length:0;let dt=0;V.morphAttributes.position!==void 0&&(dt=1),V.morphAttributes.normal!==void 0&&(dt=2),V.morphAttributes.color!==void 0&&(dt=3);let Wt,Te,Fe,Q;if(nt){const Ee=Ci[nt];Wt=Ee.vertexShader,Te=Ee.fragmentShader}else Wt=v.vertexShader,Te=v.fragmentShader,o.update(v),Fe=o.getVertexShaderID(v),Q=o.getFragmentShaderID(v);const mt=e.getRenderTarget(),Mt=e.state.buffers.depth.getReversed(),ee=L.isInstancedMesh===!0,Xt=L.isBatchedMesh===!0,Zt=!!v.map,sn=!!v.matcap,pe=!!G,Se=!!v.aoMap,Pe=!!v.lightMap,le=!!v.bumpMap,Xe=!!v.normalMap,N=!!v.displacementMap,$e=!!v.emissiveMap,ve=!!v.metalnessMap,Le=!!v.roughnessMap,Lt=v.anisotropy>0,I=v.clearcoat>0,S=v.dispersion>0,H=v.iridescence>0,J=v.sheen>0,st=v.transmission>0,K=Lt&&!!v.anisotropyMap,At=I&&!!v.clearcoatMap,gt=I&&!!v.clearcoatNormalMap,Bt=I&&!!v.clearcoatRoughnessMap,Yt=H&&!!v.iridescenceMap,rt=H&&!!v.iridescenceThicknessMap,ut=J&&!!v.sheenColorMap,Rt=J&&!!v.sheenRoughnessMap,Dt=!!v.specularMap,wt=!!v.specularColorMap,ce=!!v.specularIntensityMap,O=st&&!!v.transmissionMap,xt=st&&!!v.thicknessMap,ft=!!v.gradientMap,bt=!!v.alphaMap,lt=v.alphaTest>0,j=!!v.alphaHash,Ct=!!v.extensions;let Kt=Bi;v.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Kt=e.toneMapping);const Ue={shaderID:nt,shaderType:v.type,shaderName:v.name,vertexShader:Wt,fragmentShader:Te,defines:v.defines,customVertexShaderID:Fe,customFragmentShaderID:Q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Xt,batchingColor:Xt&&L._colorsTexture!==null,instancing:ee,instancingColor:ee&&L.instanceColor!==null,instancingMorph:ee&&L.morphTexture!==null,outputColorSpace:mt===null?e.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Ja,alphaToCoverage:!!v.alphaToCoverage,map:Zt,matcap:sn,envMap:pe,envMapMode:pe&&G.mapping,envMapCubeUVHeight:et,aoMap:Se,lightMap:Pe,bumpMap:le,normalMap:Xe,displacementMap:N,emissiveMap:$e,normalMapObjectSpace:Xe&&v.normalMapType===qg,normalMapTangentSpace:Xe&&v.normalMapType===zp,metalnessMap:ve,roughnessMap:Le,anisotropy:Lt,anisotropyMap:K,clearcoat:I,clearcoatMap:At,clearcoatNormalMap:gt,clearcoatRoughnessMap:Bt,dispersion:S,iridescence:H,iridescenceMap:Yt,iridescenceThicknessMap:rt,sheen:J,sheenColorMap:ut,sheenRoughnessMap:Rt,specularMap:Dt,specularColorMap:wt,specularIntensityMap:ce,transmission:st,transmissionMap:O,thicknessMap:xt,gradientMap:ft,opaque:v.transparent===!1&&v.blending===Ha&&v.alphaToCoverage===!1,alphaMap:bt,alphaTest:lt,alphaHash:j,combine:v.combine,mapUv:Zt&&_(v.map.channel),aoMapUv:Se&&_(v.aoMap.channel),lightMapUv:Pe&&_(v.lightMap.channel),bumpMapUv:le&&_(v.bumpMap.channel),normalMapUv:Xe&&_(v.normalMap.channel),displacementMapUv:N&&_(v.displacementMap.channel),emissiveMapUv:$e&&_(v.emissiveMap.channel),metalnessMapUv:ve&&_(v.metalnessMap.channel),roughnessMapUv:Le&&_(v.roughnessMap.channel),anisotropyMapUv:K&&_(v.anisotropyMap.channel),clearcoatMapUv:At&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:gt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Bt&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Yt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(v.sheenRoughnessMap.channel),specularMapUv:Dt&&_(v.specularMap.channel),specularColorMapUv:wt&&_(v.specularColorMap.channel),specularIntensityMapUv:ce&&_(v.specularIntensityMap.channel),transmissionMapUv:O&&_(v.transmissionMap.channel),thicknessMapUv:xt&&_(v.thicknessMap.channel),alphaMapUv:bt&&_(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Xe||Lt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(Zt||bt),fog:!!U,useFog:v.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&Xe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:l,reversedDepthBuffer:Mt,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:dt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Zt&&v.map.isVideoTexture===!0&&_e.getTransfer(v.map.colorSpace)===we,decodeVideoTextureEmissive:$e&&v.emissiveMap.isVideoTexture===!0&&_e.getTransfer(v.emissiveMap.colorSpace)===we,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qn,flipSided:v.side===Wn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ct&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&v.extensions.multiDraw===!0||Xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)w.push(D),w.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(m(w,v),x(w,v),w.push(e.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function m(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function x(v,w){r.disableAll(),w.instancing&&r.enable(0),w.instancingColor&&r.enable(1),w.instancingMorph&&r.enable(2),w.matcap&&r.enable(3),w.envMap&&r.enable(4),w.normalMapObjectSpace&&r.enable(5),w.normalMapTangentSpace&&r.enable(6),w.clearcoat&&r.enable(7),w.iridescence&&r.enable(8),w.alphaTest&&r.enable(9),w.vertexColors&&r.enable(10),w.vertexAlphas&&r.enable(11),w.vertexUv1s&&r.enable(12),w.vertexUv2s&&r.enable(13),w.vertexUv3s&&r.enable(14),w.vertexTangents&&r.enable(15),w.anisotropy&&r.enable(16),w.alphaHash&&r.enable(17),w.batching&&r.enable(18),w.dispersion&&r.enable(19),w.batchingColor&&r.enable(20),w.gradientMap&&r.enable(21),v.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reversedDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.decodeVideoTextureEmissive&&r.enable(20),w.alphaToCoverage&&r.enable(21),v.push(r.mask)}function M(v){const w=f[v.type];let D;if(w){const C=Ci[w];D=nl.clone(C.uniforms)}else D=v.uniforms;return D}function y(v,w){let D=d.get(w);return D!==void 0?++D.usedTimes:(D=new l1(e,w,v,s),h.push(D),d.set(w,D)),D}function b(v){if(--v.usedTimes===0){const w=h.indexOf(v);h[w]=h[h.length-1],h.pop(),d.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:y,releaseProgram:b,releaseShaderCache:E,programs:h,dispose:A}}function f1(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,c){e.get(r)[o]=c}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function p1(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Af(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Rf(){const e=[];let t=0;const n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,_,g,p,m){let x=e[t];return x===void 0?(x={id:u.id,object:u,geometry:f,material:_,materialVariant:r(u),groupOrder:g,renderOrder:u.renderOrder,z:p,group:m},e[t]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=_,x.materialVariant=r(u),x.groupOrder=g,x.renderOrder=u.renderOrder,x.z=p,x.group=m),t++,x}function c(u,f,_,g,p,m){const x=o(u,f,_,g,p,m);_.transmission>0?i.push(x):_.transparent===!0?s.push(x):n.push(x)}function h(u,f,_,g,p,m){const x=o(u,f,_,g,p,m);_.transmission>0?i.unshift(x):_.transparent===!0?s.unshift(x):n.unshift(x)}function d(u,f){n.length>1&&n.sort(u||p1),i.length>1&&i.sort(f||Af),s.length>1&&s.sort(f||Af)}function l(){for(let u=t,f=e.length;u<f;u++){const _=e[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:c,unshift:h,finish:l,sort:d}}function m1(){let e=new WeakMap;function t(i,s){const a=e.get(i);let r;return a===void 0?(r=new Rf,e.set(i,[r])):s>=a.length?(r=new Rf,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function _1(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new F,color:new Ft};break;case"SpotLight":n={position:new F,direction:new F,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":n={color:new Ft,position:new F,halfWidth:new F,halfHeight:new F};break}return e[t.id]=n,n}}}function g1(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let x1=0;function v1(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function M1(e){const t=new _1,n=g1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new F);const s=new F,a=new Ge,r=new Ge;function o(h){let d=0,l=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,x=0,M=0,y=0,b=0,E=0,A=0;h.sort(v1);for(let w=0,D=h.length;w<D;w++){const C=h[w],L=C.color,U=C.intensity,V=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ka?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)d+=L.r*U,l+=L.g*U,u+=L.b*U;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],U);A++}else if(C.isDirectionalLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const G=C.shadow,et=n.get(C);et.shadowIntensity=G.intensity,et.shadowBias=G.bias,et.shadowNormalBias=G.normalBias,et.shadowRadius=G.radius,et.shadowMapSize=G.mapSize,i.directionalShadow[f]=et,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=C.shadow.matrix,x++}i.directional[f]=W,f++}else if(C.isSpotLight){const W=t.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(L).multiplyScalar(U),W.distance=V,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[g]=W;const G=C.shadow;if(C.map&&(i.spotLightMap[b]=C.map,b++,G.updateMatrices(C),C.castShadow&&E++),i.spotLightMatrix[g]=G.matrix,C.castShadow){const et=n.get(C);et.shadowIntensity=G.intensity,et.shadowBias=G.bias,et.shadowNormalBias=G.normalBias,et.shadowRadius=G.radius,et.shadowMapSize=G.mapSize,i.spotShadow[g]=et,i.spotShadowMap[g]=B,y++}g++}else if(C.isRectAreaLight){const W=t.get(C);W.color.copy(L).multiplyScalar(U),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=W,p++}else if(C.isPointLight){const W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){const G=C.shadow,et=n.get(C);et.shadowIntensity=G.intensity,et.shadowBias=G.bias,et.shadowNormalBias=G.normalBias,et.shadowRadius=G.radius,et.shadowMapSize=G.mapSize,et.shadowCameraNear=G.camera.near,et.shadowCameraFar=G.camera.far,i.pointShadow[_]=et,i.pointShadowMap[_]=B,i.pointShadowMatrix[_]=C.shadow.matrix,M++}i.point[_]=W,_++}else if(C.isHemisphereLight){const W=t.get(C);W.skyColor.copy(C.color).multiplyScalar(U),W.groundColor.copy(C.groundColor).multiplyScalar(U),i.hemi[m]=W,m++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=l,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==_||v.spotLength!==g||v.rectAreaLength!==p||v.hemiLength!==m||v.numDirectionalShadows!==x||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==b||v.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=p,i.point.length=_,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+b-E,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=A,v.directionalLength=f,v.pointLength=_,v.spotLength=g,v.rectAreaLength=p,v.hemiLength=m,v.numDirectionalShadows=x,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=b,v.numLightProbes=A,i.version=x1++)}function c(h,d){let l=0,u=0,f=0,_=0,g=0;const p=d.matrixWorldInverse;for(let m=0,x=h.length;m<x;m++){const M=h[m];if(M.isDirectionalLight){const y=i.directional[l];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),l++}else if(M.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(M.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),r.identity(),a.copy(M.matrixWorld),a.premultiply(p),r.extractRotation(a),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(M.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),u++}else if(M.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:i}}function Cf(e){const t=new M1(e),n=[],i=[];function s(d){h.camera=d,n.length=0,i.length=0}function a(d){n.push(d)}function r(d){i.push(d)}function o(){t.setup(n)}function c(d){t.setupView(n,d)}const h={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:r}}function y1(e){let t=new WeakMap;function n(s,a=0){const r=t.get(s);let o;return r===void 0?(o=new Cf(e),t.set(s,[o])):a>=r.length?(o=new Cf(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const S1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,w1=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],T1=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Pf=new Ge,vr=new F,Sc=new F;function b1(e,t,n){let i=new Sh;const s=new Pt,a=new Pt,r=new We,o=new Nx,c=new Fx,h={},d=n.maxTextureSize,l={[Is]:Wn,[Wn]:Is,[Qn]:Qn},u=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:S1,fragmentShader:E1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const _=new hn;_.setAttribute("position",new zi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new T(_,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Io;let m=this.type;this.render=function(E,A,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Eg&&($t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Io);const w=e.getRenderTarget(),D=e.getActiveCubeFace(),C=e.getActiveMipmapLevel(),L=e.state;L.setBlending(Oi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=m!==this.type;U&&A.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(B=>B.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,B=E.length;V<B;V++){const W=E[V],G=W.shadow;if(G===void 0){$t("WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const et=G.getFrameExtents();s.multiply(et),a.copy(G.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/et.x),s.x=a.x*et.x,G.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/et.y),s.y=a.y*et.y,G.mapSize.y=a.y));const nt=e.state.buffers.depth.getReversed();if(G.camera._reversedDepth=nt,G.map===null||U===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===yr){if(W.isPointLight){$t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Xn(s.x,s.y,{format:Ka,type:ni,minFilter:Cn,magFilter:Cn,generateMipmaps:!1}),G.map.texture.name=W.name+".shadowMap",G.map.depthTexture=new Fr(s.x,s.y,Li),G.map.depthTexture.name=W.name+".shadowMapDepth",G.map.depthTexture.format=fs,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=_n,G.map.depthTexture.magFilter=_n}else W.isPointLight?(G.map=new Qp(s.x),G.map.depthTexture=new Px(s.x,ki)):(G.map=new Xn(s.x,s.y),G.map.depthTexture=new Fr(s.x,s.y,ki)),G.map.depthTexture.name=W.name+".shadowMap",G.map.depthTexture.format=fs,this.type===Io?(G.map.depthTexture.compareFunction=nt?xh:gh,G.map.depthTexture.minFilter=Cn,G.map.depthTexture.magFilter=Cn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=_n,G.map.depthTexture.magFilter=_n);G.camera.updateProjectionMatrix()}const pt=G.map.isWebGLCubeRenderTarget?6:1;for(let at=0;at<pt;at++){if(G.map.isWebGLCubeRenderTarget)e.setRenderTarget(G.map,at),e.clear();else{at===0&&(e.setRenderTarget(G.map),e.clear());const dt=G.getViewport(at);r.set(a.x*dt.x,a.y*dt.y,a.x*dt.z,a.y*dt.w),L.viewport(r)}if(W.isPointLight){const dt=G.camera,Wt=G.matrix,Te=W.distance||dt.far;Te!==dt.far&&(dt.far=Te,dt.updateProjectionMatrix()),vr.setFromMatrixPosition(W.matrixWorld),dt.position.copy(vr),Sc.copy(dt.position),Sc.add(w1[at]),dt.up.copy(T1[at]),dt.lookAt(Sc),dt.updateMatrixWorld(),Wt.makeTranslation(-vr.x,-vr.y,-vr.z),Pf.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Pf,dt.coordinateSystem,dt.reversedDepth)}else G.updateMatrices(W);i=G.getFrustum(),y(A,v,G.camera,W,this.type)}G.isPointLightShadow!==!0&&this.type===yr&&x(G,v),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,e.setRenderTarget(w,D,C)};function x(E,A){const v=t.update(g);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Xn(s.x,s.y,{format:Ka,type:ni})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,e.setRenderTarget(E.mapPass),e.clear(),e.renderBufferDirect(A,null,v,u,g,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,e.setRenderTarget(E.map),e.clear(),e.renderBufferDirect(A,null,v,f,g,null)}function M(E,A,v,w){let D=null;const C=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)D=C;else if(D=v.isPointLight===!0?c:o,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=D.uuid,U=A.uuid;let V=h[L];V===void 0&&(V={},h[L]=V);let B=V[U];B===void 0&&(B=D.clone(),V[U]=B,A.addEventListener("dispose",b)),D=B}if(D.visible=A.visible,D.wireframe=A.wireframe,w===yr?D.side=A.shadowSide!==null?A.shadowSide:A.side:D.side=A.shadowSide!==null?A.shadowSide:l[A.side],D.alphaMap=A.alphaMap,D.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,D.map=A.map,D.clipShadows=A.clipShadows,D.clippingPlanes=A.clippingPlanes,D.clipIntersection=A.clipIntersection,D.displacementMap=A.displacementMap,D.displacementScale=A.displacementScale,D.displacementBias=A.displacementBias,D.wireframeLinewidth=A.wireframeLinewidth,D.linewidth=A.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const L=e.properties.get(D);L.light=v}return D}function y(E,A,v,w,D){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===yr)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const U=t.update(E),V=E.material;if(Array.isArray(V)){const B=U.groups;for(let W=0,G=B.length;W<G;W++){const et=B[W],nt=V[et.materialIndex];if(nt&&nt.visible){const pt=M(E,nt,w,D);E.onBeforeShadow(e,E,A,v,U,pt,et),e.renderBufferDirect(v,null,U,pt,E,et),E.onAfterShadow(e,E,A,v,U,pt,et)}}}else if(V.visible){const B=M(E,V,w,D);E.onBeforeShadow(e,E,A,v,U,B,null),e.renderBufferDirect(v,null,U,B,E,null),E.onAfterShadow(e,E,A,v,U,B,null)}}const L=E.children;for(let U=0,V=L.length;U<V;U++)y(L[U],A,v,w,D)}function b(E){E.target.removeEventListener("dispose",b);for(const v in h){const w=h[v],D=E.target.uuid;D in w&&(w[D].dispose(),delete w[D])}}}function A1(e,t){function n(){let O=!1;const xt=new We;let ft=null;const bt=new We(0,0,0,0);return{setMask:function(lt){ft!==lt&&!O&&(e.colorMask(lt,lt,lt,lt),ft=lt)},setLocked:function(lt){O=lt},setClear:function(lt,j,Ct,Kt,Ue){Ue===!0&&(lt*=Kt,j*=Kt,Ct*=Kt),xt.set(lt,j,Ct,Kt),bt.equals(xt)===!1&&(e.clearColor(lt,j,Ct,Kt),bt.copy(xt))},reset:function(){O=!1,ft=null,bt.set(-1,0,0,0)}}}function i(){let O=!1,xt=!1,ft=null,bt=null,lt=null;return{setReversed:function(j){if(xt!==j){const Ct=t.get("EXT_clip_control");j?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),xt=j;const Kt=lt;lt=null,this.setClear(Kt)}},getReversed:function(){return xt},setTest:function(j){j?mt(e.DEPTH_TEST):Mt(e.DEPTH_TEST)},setMask:function(j){ft!==j&&!O&&(e.depthMask(j),ft=j)},setFunc:function(j){if(xt&&(j=nx[j]),bt!==j){switch(j){case kc:e.depthFunc(e.NEVER);break;case Vc:e.depthFunc(e.ALWAYS);break;case Wc:e.depthFunc(e.LESS);break;case Za:e.depthFunc(e.LEQUAL);break;case Xc:e.depthFunc(e.EQUAL);break;case qc:e.depthFunc(e.GEQUAL);break;case Yc:e.depthFunc(e.GREATER);break;case $c:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}bt=j}},setLocked:function(j){O=j},setClear:function(j){lt!==j&&(lt=j,xt&&(j=1-j),e.clearDepth(j))},reset:function(){O=!1,ft=null,bt=null,lt=null,xt=!1}}}function s(){let O=!1,xt=null,ft=null,bt=null,lt=null,j=null,Ct=null,Kt=null,Ue=null;return{setTest:function(Ee){O||(Ee?mt(e.STENCIL_TEST):Mt(e.STENCIL_TEST))},setMask:function(Ee){xt!==Ee&&!O&&(e.stencilMask(Ee),xt=Ee)},setFunc:function(Ee,Yi,$i){(ft!==Ee||bt!==Yi||lt!==$i)&&(e.stencilFunc(Ee,Yi,$i),ft=Ee,bt=Yi,lt=$i)},setOp:function(Ee,Yi,$i){(j!==Ee||Ct!==Yi||Kt!==$i)&&(e.stencilOp(Ee,Yi,$i),j=Ee,Ct=Yi,Kt=$i)},setLocked:function(Ee){O=Ee},setClear:function(Ee){Ue!==Ee&&(e.clearStencil(Ee),Ue=Ee)},reset:function(){O=!1,xt=null,ft=null,bt=null,lt=null,j=null,Ct=null,Kt=null,Ue=null}}}const a=new n,r=new i,o=new s,c=new WeakMap,h=new WeakMap;let d={},l={},u=new WeakMap,f=[],_=null,g=!1,p=null,m=null,x=null,M=null,y=null,b=null,E=null,A=new Ft(0,0,0),v=0,w=!1,D=null,C=null,L=null,U=null,V=null;const B=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,G=0;const et=e.getParameter(e.VERSION);et.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(et)[1]),W=G>=1):et.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),W=G>=2);let nt=null,pt={};const at=e.getParameter(e.SCISSOR_BOX),dt=e.getParameter(e.VIEWPORT),Wt=new We().fromArray(at),Te=new We().fromArray(dt);function Fe(O,xt,ft,bt){const lt=new Uint8Array(4),j=e.createTexture();e.bindTexture(O,j),e.texParameteri(O,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(O,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ct=0;Ct<ft;Ct++)O===e.TEXTURE_3D||O===e.TEXTURE_2D_ARRAY?e.texImage3D(xt,0,e.RGBA,1,1,bt,0,e.RGBA,e.UNSIGNED_BYTE,lt):e.texImage2D(xt+Ct,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,lt);return j}const Q={};Q[e.TEXTURE_2D]=Fe(e.TEXTURE_2D,e.TEXTURE_2D,1),Q[e.TEXTURE_CUBE_MAP]=Fe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[e.TEXTURE_2D_ARRAY]=Fe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Q[e.TEXTURE_3D]=Fe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),mt(e.DEPTH_TEST),r.setFunc(Za),le(!1),Xe(Au),mt(e.CULL_FACE),Se(Oi);function mt(O){d[O]!==!0&&(e.enable(O),d[O]=!0)}function Mt(O){d[O]!==!1&&(e.disable(O),d[O]=!1)}function ee(O,xt){return l[O]!==xt?(e.bindFramebuffer(O,xt),l[O]=xt,O===e.DRAW_FRAMEBUFFER&&(l[e.FRAMEBUFFER]=xt),O===e.FRAMEBUFFER&&(l[e.DRAW_FRAMEBUFFER]=xt),!0):!1}function Xt(O,xt){let ft=f,bt=!1;if(O){ft=u.get(xt),ft===void 0&&(ft=[],u.set(xt,ft));const lt=O.textures;if(ft.length!==lt.length||ft[0]!==e.COLOR_ATTACHMENT0){for(let j=0,Ct=lt.length;j<Ct;j++)ft[j]=e.COLOR_ATTACHMENT0+j;ft.length=lt.length,bt=!0}}else ft[0]!==e.BACK&&(ft[0]=e.BACK,bt=!0);bt&&e.drawBuffers(ft)}function Zt(O){return _!==O?(e.useProgram(O),_=O,!0):!1}const sn={[$s]:e.FUNC_ADD,[Tg]:e.FUNC_SUBTRACT,[bg]:e.FUNC_REVERSE_SUBTRACT};sn[Ag]=e.MIN,sn[Rg]=e.MAX;const pe={[Cg]:e.ZERO,[Pg]:e.ONE,[Dg]:e.SRC_COLOR,[Hc]:e.SRC_ALPHA,[Og]:e.SRC_ALPHA_SATURATE,[Ng]:e.DST_COLOR,[Lg]:e.DST_ALPHA,[Ig]:e.ONE_MINUS_SRC_COLOR,[Gc]:e.ONE_MINUS_SRC_ALPHA,[Fg]:e.ONE_MINUS_DST_COLOR,[Ug]:e.ONE_MINUS_DST_ALPHA,[Bg]:e.CONSTANT_COLOR,[zg]:e.ONE_MINUS_CONSTANT_COLOR,[Hg]:e.CONSTANT_ALPHA,[Gg]:e.ONE_MINUS_CONSTANT_ALPHA};function Se(O,xt,ft,bt,lt,j,Ct,Kt,Ue,Ee){if(O===Oi){g===!0&&(Mt(e.BLEND),g=!1);return}if(g===!1&&(mt(e.BLEND),g=!0),O!==wg){if(O!==p||Ee!==w){if((m!==$s||y!==$s)&&(e.blendEquation(e.FUNC_ADD),m=$s,y=$s),Ee)switch(O){case Ha:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFunc(e.ONE,e.ONE);break;case Ru:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Cu:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:me("WebGLState: Invalid blending: ",O);break}else switch(O){case Ha:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ru:me("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cu:me("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:me("WebGLState: Invalid blending: ",O);break}x=null,M=null,b=null,E=null,A.set(0,0,0),v=0,p=O,w=Ee}return}lt=lt||xt,j=j||ft,Ct=Ct||bt,(xt!==m||lt!==y)&&(e.blendEquationSeparate(sn[xt],sn[lt]),m=xt,y=lt),(ft!==x||bt!==M||j!==b||Ct!==E)&&(e.blendFuncSeparate(pe[ft],pe[bt],pe[j],pe[Ct]),x=ft,M=bt,b=j,E=Ct),(Kt.equals(A)===!1||Ue!==v)&&(e.blendColor(Kt.r,Kt.g,Kt.b,Ue),A.copy(Kt),v=Ue),p=O,w=!1}function Pe(O,xt){O.side===Qn?Mt(e.CULL_FACE):mt(e.CULL_FACE);let ft=O.side===Wn;xt&&(ft=!ft),le(ft),O.blending===Ha&&O.transparent===!1?Se(Oi):Se(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),a.setMask(O.colorWrite);const bt=O.stencilWrite;o.setTest(bt),bt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),$e(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?mt(e.SAMPLE_ALPHA_TO_COVERAGE):Mt(e.SAMPLE_ALPHA_TO_COVERAGE)}function le(O){D!==O&&(O?e.frontFace(e.CW):e.frontFace(e.CCW),D=O)}function Xe(O){O!==yg?(mt(e.CULL_FACE),O!==C&&(O===Au?e.cullFace(e.BACK):O===Sg?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Mt(e.CULL_FACE),C=O}function N(O){O!==L&&(W&&e.lineWidth(O),L=O)}function $e(O,xt,ft){O?(mt(e.POLYGON_OFFSET_FILL),(U!==xt||V!==ft)&&(U=xt,V=ft,r.getReversed()&&(xt=-xt),e.polygonOffset(xt,ft))):Mt(e.POLYGON_OFFSET_FILL)}function ve(O){O?mt(e.SCISSOR_TEST):Mt(e.SCISSOR_TEST)}function Le(O){O===void 0&&(O=e.TEXTURE0+B-1),nt!==O&&(e.activeTexture(O),nt=O)}function Lt(O,xt,ft){ft===void 0&&(nt===null?ft=e.TEXTURE0+B-1:ft=nt);let bt=pt[ft];bt===void 0&&(bt={type:void 0,texture:void 0},pt[ft]=bt),(bt.type!==O||bt.texture!==xt)&&(nt!==ft&&(e.activeTexture(ft),nt=ft),e.bindTexture(O,xt||Q[O]),bt.type=O,bt.texture=xt)}function I(){const O=pt[nt];O!==void 0&&O.type!==void 0&&(e.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function S(){try{e.compressedTexImage2D(...arguments)}catch(O){me("WebGLState:",O)}}function H(){try{e.compressedTexImage3D(...arguments)}catch(O){me("WebGLState:",O)}}function J(){try{e.texSubImage2D(...arguments)}catch(O){me("WebGLState:",O)}}function st(){try{e.texSubImage3D(...arguments)}catch(O){me("WebGLState:",O)}}function K(){try{e.compressedTexSubImage2D(...arguments)}catch(O){me("WebGLState:",O)}}function At(){try{e.compressedTexSubImage3D(...arguments)}catch(O){me("WebGLState:",O)}}function gt(){try{e.texStorage2D(...arguments)}catch(O){me("WebGLState:",O)}}function Bt(){try{e.texStorage3D(...arguments)}catch(O){me("WebGLState:",O)}}function Yt(){try{e.texImage2D(...arguments)}catch(O){me("WebGLState:",O)}}function rt(){try{e.texImage3D(...arguments)}catch(O){me("WebGLState:",O)}}function ut(O){Wt.equals(O)===!1&&(e.scissor(O.x,O.y,O.z,O.w),Wt.copy(O))}function Rt(O){Te.equals(O)===!1&&(e.viewport(O.x,O.y,O.z,O.w),Te.copy(O))}function Dt(O,xt){let ft=h.get(xt);ft===void 0&&(ft=new WeakMap,h.set(xt,ft));let bt=ft.get(O);bt===void 0&&(bt=e.getUniformBlockIndex(xt,O.name),ft.set(O,bt))}function wt(O,xt){const bt=h.get(xt).get(O);c.get(xt)!==bt&&(e.uniformBlockBinding(xt,bt,O.__bindingPointIndex),c.set(xt,bt))}function ce(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),d={},nt=null,pt={},l={},u=new WeakMap,f=[],_=null,g=!1,p=null,m=null,x=null,M=null,y=null,b=null,E=null,A=new Ft(0,0,0),v=0,w=!1,D=null,C=null,L=null,U=null,V=null,Wt.set(0,0,e.canvas.width,e.canvas.height),Te.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:mt,disable:Mt,bindFramebuffer:ee,drawBuffers:Xt,useProgram:Zt,setBlending:Se,setMaterial:Pe,setFlipSided:le,setCullFace:Xe,setLineWidth:N,setPolygonOffset:$e,setScissorTest:ve,activeTexture:Le,bindTexture:Lt,unbindTexture:I,compressedTexImage2D:S,compressedTexImage3D:H,texImage2D:Yt,texImage3D:rt,updateUBOMapping:Dt,uniformBlockBinding:wt,texStorage2D:gt,texStorage3D:Bt,texSubImage2D:J,texSubImage3D:st,compressedTexSubImage2D:K,compressedTexSubImage3D:At,scissor:ut,viewport:Rt,reset:ce}}function R1(e,t,n,i,s,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Pt,d=new WeakMap;let l;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,S){return f?new OffscreenCanvas(I,S):Jo("canvas")}function g(I,S,H){let J=1;const st=Lt(I);if((st.width>H||st.height>H)&&(J=H/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const K=Math.floor(J*st.width),At=Math.floor(J*st.height);l===void 0&&(l=_(K,At));const gt=S?_(K,At):l;return gt.width=K,gt.height=At,gt.getContext("2d").drawImage(I,0,0,K,At),$t("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+K+"x"+At+")."),gt}else return"data"in I&&$t("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),I;return I}function p(I){return I.generateMipmaps}function m(I){e.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?e.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(I,S,H,J,st=!1){if(I!==null){if(e[I]!==void 0)return e[I];$t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let K=S;if(S===e.RED&&(H===e.FLOAT&&(K=e.R32F),H===e.HALF_FLOAT&&(K=e.R16F),H===e.UNSIGNED_BYTE&&(K=e.R8)),S===e.RED_INTEGER&&(H===e.UNSIGNED_BYTE&&(K=e.R8UI),H===e.UNSIGNED_SHORT&&(K=e.R16UI),H===e.UNSIGNED_INT&&(K=e.R32UI),H===e.BYTE&&(K=e.R8I),H===e.SHORT&&(K=e.R16I),H===e.INT&&(K=e.R32I)),S===e.RG&&(H===e.FLOAT&&(K=e.RG32F),H===e.HALF_FLOAT&&(K=e.RG16F),H===e.UNSIGNED_BYTE&&(K=e.RG8)),S===e.RG_INTEGER&&(H===e.UNSIGNED_BYTE&&(K=e.RG8UI),H===e.UNSIGNED_SHORT&&(K=e.RG16UI),H===e.UNSIGNED_INT&&(K=e.RG32UI),H===e.BYTE&&(K=e.RG8I),H===e.SHORT&&(K=e.RG16I),H===e.INT&&(K=e.RG32I)),S===e.RGB_INTEGER&&(H===e.UNSIGNED_BYTE&&(K=e.RGB8UI),H===e.UNSIGNED_SHORT&&(K=e.RGB16UI),H===e.UNSIGNED_INT&&(K=e.RGB32UI),H===e.BYTE&&(K=e.RGB8I),H===e.SHORT&&(K=e.RGB16I),H===e.INT&&(K=e.RGB32I)),S===e.RGBA_INTEGER&&(H===e.UNSIGNED_BYTE&&(K=e.RGBA8UI),H===e.UNSIGNED_SHORT&&(K=e.RGBA16UI),H===e.UNSIGNED_INT&&(K=e.RGBA32UI),H===e.BYTE&&(K=e.RGBA8I),H===e.SHORT&&(K=e.RGBA16I),H===e.INT&&(K=e.RGBA32I)),S===e.RGB&&(H===e.UNSIGNED_INT_5_9_9_9_REV&&(K=e.RGB9_E5),H===e.UNSIGNED_INT_10F_11F_11F_REV&&(K=e.R11F_G11F_B10F)),S===e.RGBA){const At=st?Ko:_e.getTransfer(J);H===e.FLOAT&&(K=e.RGBA32F),H===e.HALF_FLOAT&&(K=e.RGBA16F),H===e.UNSIGNED_BYTE&&(K=At===we?e.SRGB8_ALPHA8:e.RGBA8),H===e.UNSIGNED_SHORT_4_4_4_4&&(K=e.RGBA4),H===e.UNSIGNED_SHORT_5_5_5_1&&(K=e.RGB5_A1)}return(K===e.R16F||K===e.R32F||K===e.RG16F||K===e.RG32F||K===e.RGBA16F||K===e.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(I,S){let H;return I?S===null||S===ki||S===Ur?H=e.DEPTH24_STENCIL8:S===Li?H=e.DEPTH32F_STENCIL8:S===Lr&&(H=e.DEPTH24_STENCIL8,$t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ki||S===Ur?H=e.DEPTH_COMPONENT24:S===Li?H=e.DEPTH_COMPONENT32F:S===Lr&&(H=e.DEPTH_COMPONENT16),H}function b(I,S){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==_n&&I.minFilter!==Cn?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function E(I){const S=I.target;S.removeEventListener("dispose",E),v(S),S.isVideoTexture&&d.delete(S)}function A(I){const S=I.target;S.removeEventListener("dispose",A),D(S)}function v(I){const S=i.get(I);if(S.__webglInit===void 0)return;const H=I.source,J=u.get(H);if(J){const st=J[S.__cacheKey];st.usedTimes--,st.usedTimes===0&&w(I),Object.keys(J).length===0&&u.delete(H)}i.remove(I)}function w(I){const S=i.get(I);e.deleteTexture(S.__webglTexture);const H=I.source,J=u.get(H);delete J[S.__cacheKey],r.memory.textures--}function D(I){const S=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(S.__webglFramebuffer[J]))for(let st=0;st<S.__webglFramebuffer[J].length;st++)e.deleteFramebuffer(S.__webglFramebuffer[J][st]);else e.deleteFramebuffer(S.__webglFramebuffer[J]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[J])}else{if(Array.isArray(S.__webglFramebuffer))for(let J=0;J<S.__webglFramebuffer.length;J++)e.deleteFramebuffer(S.__webglFramebuffer[J]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let J=0;J<S.__webglColorRenderbuffer.length;J++)S.__webglColorRenderbuffer[J]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[J]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const H=I.textures;for(let J=0,st=H.length;J<st;J++){const K=i.get(H[J]);K.__webglTexture&&(e.deleteTexture(K.__webglTexture),r.memory.textures--),i.remove(H[J])}i.remove(I)}let C=0;function L(){C=0}function U(){const I=C;return I>=s.maxTextures&&$t("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),C+=1,I}function V(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function B(I,S){const H=i.get(I);if(I.isVideoTexture&&ve(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&H.__version!==I.version){const J=I.image;if(J===null)$t("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)$t("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(H,I,S);return}}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,H.__webglTexture,e.TEXTURE0+S)}function W(I,S){const H=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){Q(H,I,S);return}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,H.__webglTexture,e.TEXTURE0+S)}function G(I,S){const H=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){Q(H,I,S);return}n.bindTexture(e.TEXTURE_3D,H.__webglTexture,e.TEXTURE0+S)}function et(I,S){const H=i.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&H.__version!==I.version){mt(H,I,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,H.__webglTexture,e.TEXTURE0+S)}const nt={[Zc]:e.REPEAT,[os]:e.CLAMP_TO_EDGE,[jc]:e.MIRRORED_REPEAT},pt={[_n]:e.NEAREST,[Wg]:e.NEAREST_MIPMAP_NEAREST,[so]:e.NEAREST_MIPMAP_LINEAR,[Cn]:e.LINEAR,[Wl]:e.LINEAR_MIPMAP_NEAREST,[Ks]:e.LINEAR_MIPMAP_LINEAR},at={[Yg]:e.NEVER,[Jg]:e.ALWAYS,[$g]:e.LESS,[gh]:e.LEQUAL,[Zg]:e.EQUAL,[xh]:e.GEQUAL,[jg]:e.GREATER,[Kg]:e.NOTEQUAL};function dt(I,S){if(S.type===Li&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Cn||S.magFilter===Wl||S.magFilter===so||S.magFilter===Ks||S.minFilter===Cn||S.minFilter===Wl||S.minFilter===so||S.minFilter===Ks)&&$t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(I,e.TEXTURE_WRAP_S,nt[S.wrapS]),e.texParameteri(I,e.TEXTURE_WRAP_T,nt[S.wrapT]),(I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY)&&e.texParameteri(I,e.TEXTURE_WRAP_R,nt[S.wrapR]),e.texParameteri(I,e.TEXTURE_MAG_FILTER,pt[S.magFilter]),e.texParameteri(I,e.TEXTURE_MIN_FILTER,pt[S.minFilter]),S.compareFunction&&(e.texParameteri(I,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(I,e.TEXTURE_COMPARE_FUNC,at[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===_n||S.minFilter!==so&&S.minFilter!==Ks||S.type===Li&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");e.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Wt(I,S){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",E));const J=S.source;let st=u.get(J);st===void 0&&(st={},u.set(J,st));const K=V(S);if(K!==I.__cacheKey){st[K]===void 0&&(st[K]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,H=!0),st[K].usedTimes++;const At=st[I.__cacheKey];At!==void 0&&(st[I.__cacheKey].usedTimes--,At.usedTimes===0&&w(S)),I.__cacheKey=K,I.__webglTexture=st[K].texture}return H}function Te(I,S,H){return Math.floor(Math.floor(I/H)/S)}function Fe(I,S,H,J){const K=I.updateRanges;if(K.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,H,J,S.data);else{K.sort((rt,ut)=>rt.start-ut.start);let At=0;for(let rt=1;rt<K.length;rt++){const ut=K[At],Rt=K[rt],Dt=ut.start+ut.count,wt=Te(Rt.start,S.width,4),ce=Te(ut.start,S.width,4);Rt.start<=Dt+1&&wt===ce&&Te(Rt.start+Rt.count-1,S.width,4)===wt?ut.count=Math.max(ut.count,Rt.start+Rt.count-ut.start):(++At,K[At]=Rt)}K.length=At+1;const gt=e.getParameter(e.UNPACK_ROW_LENGTH),Bt=e.getParameter(e.UNPACK_SKIP_PIXELS),Yt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let rt=0,ut=K.length;rt<ut;rt++){const Rt=K[rt],Dt=Math.floor(Rt.start/4),wt=Math.ceil(Rt.count/4),ce=Dt%S.width,O=Math.floor(Dt/S.width),xt=wt,ft=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,ce),e.pixelStorei(e.UNPACK_SKIP_ROWS,O),n.texSubImage2D(e.TEXTURE_2D,0,ce,O,xt,ft,H,J,S.data)}I.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,gt),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Yt)}}function Q(I,S,H){let J=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(J=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(J=e.TEXTURE_3D);const st=Wt(I,S),K=S.source;n.bindTexture(J,I.__webglTexture,e.TEXTURE0+H);const At=i.get(K);if(K.version!==At.__version||st===!0){n.activeTexture(e.TEXTURE0+H);const gt=_e.getPrimaries(_e.workingColorSpace),Bt=S.colorSpace===bs?null:_e.getPrimaries(S.colorSpace),Yt=S.colorSpace===bs||gt===Bt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let rt=g(S.image,!1,s.maxTextureSize);rt=Le(S,rt);const ut=a.convert(S.format,S.colorSpace),Rt=a.convert(S.type);let Dt=M(S.internalFormat,ut,Rt,S.colorSpace,S.isVideoTexture);dt(J,S);let wt;const ce=S.mipmaps,O=S.isVideoTexture!==!0,xt=At.__version===void 0||st===!0,ft=K.dataReady,bt=b(S,rt);if(S.isDepthTexture)Dt=y(S.format===Js,S.type),xt&&(O?n.texStorage2D(e.TEXTURE_2D,1,Dt,rt.width,rt.height):n.texImage2D(e.TEXTURE_2D,0,Dt,rt.width,rt.height,0,ut,Rt,null));else if(S.isDataTexture)if(ce.length>0){O&&xt&&n.texStorage2D(e.TEXTURE_2D,bt,Dt,ce[0].width,ce[0].height);for(let lt=0,j=ce.length;lt<j;lt++)wt=ce[lt],O?ft&&n.texSubImage2D(e.TEXTURE_2D,lt,0,0,wt.width,wt.height,ut,Rt,wt.data):n.texImage2D(e.TEXTURE_2D,lt,Dt,wt.width,wt.height,0,ut,Rt,wt.data);S.generateMipmaps=!1}else O?(xt&&n.texStorage2D(e.TEXTURE_2D,bt,Dt,rt.width,rt.height),ft&&Fe(S,rt,ut,Rt)):n.texImage2D(e.TEXTURE_2D,0,Dt,rt.width,rt.height,0,ut,Rt,rt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){O&&xt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,bt,Dt,ce[0].width,ce[0].height,rt.depth);for(let lt=0,j=ce.length;lt<j;lt++)if(wt=ce[lt],S.format!==Ei)if(ut!==null)if(O){if(ft)if(S.layerUpdates.size>0){const Ct=of(wt.width,wt.height,S.format,S.type);for(const Kt of S.layerUpdates){const Ue=wt.data.subarray(Kt*Ct/wt.data.BYTES_PER_ELEMENT,(Kt+1)*Ct/wt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,lt,0,0,Kt,wt.width,wt.height,1,ut,Ue)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,lt,0,0,0,wt.width,wt.height,rt.depth,ut,wt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,lt,Dt,wt.width,wt.height,rt.depth,0,wt.data,0,0);else $t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ft&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,lt,0,0,0,wt.width,wt.height,rt.depth,ut,Rt,wt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,lt,Dt,wt.width,wt.height,rt.depth,0,ut,Rt,wt.data)}else{O&&xt&&n.texStorage2D(e.TEXTURE_2D,bt,Dt,ce[0].width,ce[0].height);for(let lt=0,j=ce.length;lt<j;lt++)wt=ce[lt],S.format!==Ei?ut!==null?O?ft&&n.compressedTexSubImage2D(e.TEXTURE_2D,lt,0,0,wt.width,wt.height,ut,wt.data):n.compressedTexImage2D(e.TEXTURE_2D,lt,Dt,wt.width,wt.height,0,wt.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ft&&n.texSubImage2D(e.TEXTURE_2D,lt,0,0,wt.width,wt.height,ut,Rt,wt.data):n.texImage2D(e.TEXTURE_2D,lt,Dt,wt.width,wt.height,0,ut,Rt,wt.data)}else if(S.isDataArrayTexture)if(O){if(xt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,bt,Dt,rt.width,rt.height,rt.depth),ft)if(S.layerUpdates.size>0){const lt=of(rt.width,rt.height,S.format,S.type);for(const j of S.layerUpdates){const Ct=rt.data.subarray(j*lt/rt.data.BYTES_PER_ELEMENT,(j+1)*lt/rt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,j,rt.width,rt.height,1,ut,Rt,Ct)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,ut,Rt,rt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Dt,rt.width,rt.height,rt.depth,0,ut,Rt,rt.data);else if(S.isData3DTexture)O?(xt&&n.texStorage3D(e.TEXTURE_3D,bt,Dt,rt.width,rt.height,rt.depth),ft&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,ut,Rt,rt.data)):n.texImage3D(e.TEXTURE_3D,0,Dt,rt.width,rt.height,rt.depth,0,ut,Rt,rt.data);else if(S.isFramebufferTexture){if(xt)if(O)n.texStorage2D(e.TEXTURE_2D,bt,Dt,rt.width,rt.height);else{let lt=rt.width,j=rt.height;for(let Ct=0;Ct<bt;Ct++)n.texImage2D(e.TEXTURE_2D,Ct,Dt,lt,j,0,ut,Rt,null),lt>>=1,j>>=1}}else if(ce.length>0){if(O&&xt){const lt=Lt(ce[0]);n.texStorage2D(e.TEXTURE_2D,bt,Dt,lt.width,lt.height)}for(let lt=0,j=ce.length;lt<j;lt++)wt=ce[lt],O?ft&&n.texSubImage2D(e.TEXTURE_2D,lt,0,0,ut,Rt,wt):n.texImage2D(e.TEXTURE_2D,lt,Dt,ut,Rt,wt);S.generateMipmaps=!1}else if(O){if(xt){const lt=Lt(rt);n.texStorage2D(e.TEXTURE_2D,bt,Dt,lt.width,lt.height)}ft&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ut,Rt,rt)}else n.texImage2D(e.TEXTURE_2D,0,Dt,ut,Rt,rt);p(S)&&m(J),At.__version=K.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function mt(I,S,H){if(S.image.length!==6)return;const J=Wt(I,S),st=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+H);const K=i.get(st);if(st.version!==K.__version||J===!0){n.activeTexture(e.TEXTURE0+H);const At=_e.getPrimaries(_e.workingColorSpace),gt=S.colorSpace===bs?null:_e.getPrimaries(S.colorSpace),Bt=S.colorSpace===bs||At===gt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt);const Yt=S.isCompressedTexture||S.image[0].isCompressedTexture,rt=S.image[0]&&S.image[0].isDataTexture,ut=[];for(let j=0;j<6;j++)!Yt&&!rt?ut[j]=g(S.image[j],!0,s.maxCubemapSize):ut[j]=rt?S.image[j].image:S.image[j],ut[j]=Le(S,ut[j]);const Rt=ut[0],Dt=a.convert(S.format,S.colorSpace),wt=a.convert(S.type),ce=M(S.internalFormat,Dt,wt,S.colorSpace),O=S.isVideoTexture!==!0,xt=K.__version===void 0||J===!0,ft=st.dataReady;let bt=b(S,Rt);dt(e.TEXTURE_CUBE_MAP,S);let lt;if(Yt){O&&xt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,bt,ce,Rt.width,Rt.height);for(let j=0;j<6;j++){lt=ut[j].mipmaps;for(let Ct=0;Ct<lt.length;Ct++){const Kt=lt[Ct];S.format!==Ei?Dt!==null?O?ft&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Kt.width,Kt.height,Dt,Kt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,ce,Kt.width,Kt.height,0,Kt.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ft&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Kt.width,Kt.height,Dt,wt,Kt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,ce,Kt.width,Kt.height,0,Dt,wt,Kt.data)}}}else{if(lt=S.mipmaps,O&&xt){lt.length>0&&bt++;const j=Lt(ut[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,bt,ce,j.width,j.height)}for(let j=0;j<6;j++)if(rt){O?ft&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ut[j].width,ut[j].height,Dt,wt,ut[j].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ce,ut[j].width,ut[j].height,0,Dt,wt,ut[j].data);for(let Ct=0;Ct<lt.length;Ct++){const Ue=lt[Ct].image[j].image;O?ft&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Ue.width,Ue.height,Dt,wt,Ue.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,ce,Ue.width,Ue.height,0,Dt,wt,Ue.data)}}else{O?ft&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Dt,wt,ut[j]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,ce,Dt,wt,ut[j]);for(let Ct=0;Ct<lt.length;Ct++){const Kt=lt[Ct];O?ft&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Dt,wt,Kt.image[j]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,ce,Dt,wt,Kt.image[j])}}}p(S)&&m(e.TEXTURE_CUBE_MAP),K.__version=st.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function Mt(I,S,H,J,st,K){const At=a.convert(H.format,H.colorSpace),gt=a.convert(H.type),Bt=M(H.internalFormat,At,gt,H.colorSpace),Yt=i.get(S),rt=i.get(H);if(rt.__renderTarget=S,!Yt.__hasExternalTextures){const ut=Math.max(1,S.width>>K),Rt=Math.max(1,S.height>>K);st===e.TEXTURE_3D||st===e.TEXTURE_2D_ARRAY?n.texImage3D(st,K,Bt,ut,Rt,S.depth,0,At,gt,null):n.texImage2D(st,K,Bt,ut,Rt,0,At,gt,null)}n.bindFramebuffer(e.FRAMEBUFFER,I),$e(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,st,rt.__webglTexture,0,N(S)):(st===e.TEXTURE_2D||st>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,J,st,rt.__webglTexture,K),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ee(I,S,H){if(e.bindRenderbuffer(e.RENDERBUFFER,I),S.depthBuffer){const J=S.depthTexture,st=J&&J.isDepthTexture?J.type:null,K=y(S.stencilBuffer,st),At=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;$e(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,N(S),K,S.width,S.height):H?e.renderbufferStorageMultisample(e.RENDERBUFFER,N(S),K,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,K,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,At,e.RENDERBUFFER,I)}else{const J=S.textures;for(let st=0;st<J.length;st++){const K=J[st],At=a.convert(K.format,K.colorSpace),gt=a.convert(K.type),Bt=M(K.internalFormat,At,gt,K.colorSpace);$e(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,N(S),Bt,S.width,S.height):H?e.renderbufferStorageMultisample(e.RENDERBUFFER,N(S),Bt,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,Bt,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Xt(I,S,H){const J=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const st=i.get(S.depthTexture);if(st.__renderTarget=S,(!st.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J){if(st.__webglInit===void 0&&(st.__webglInit=!0,S.depthTexture.addEventListener("dispose",E)),st.__webglTexture===void 0){st.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,st.__webglTexture),dt(e.TEXTURE_CUBE_MAP,S.depthTexture);const Yt=a.convert(S.depthTexture.format),rt=a.convert(S.depthTexture.type);let ut;S.depthTexture.format===fs?ut=e.DEPTH_COMPONENT24:S.depthTexture.format===Js&&(ut=e.DEPTH24_STENCIL8);for(let Rt=0;Rt<6;Rt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0,ut,S.width,S.height,0,Yt,rt,null)}}else B(S.depthTexture,0);const K=st.__webglTexture,At=N(S),gt=J?e.TEXTURE_CUBE_MAP_POSITIVE_X+H:e.TEXTURE_2D,Bt=S.depthTexture.format===Js?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(S.depthTexture.format===fs)$e(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Bt,gt,K,0,At):e.framebufferTexture2D(e.FRAMEBUFFER,Bt,gt,K,0);else if(S.depthTexture.format===Js)$e(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Bt,gt,K,0,At):e.framebufferTexture2D(e.FRAMEBUFFER,Bt,gt,K,0);else throw new Error("Unknown depthTexture format")}function Zt(I){const S=i.get(I),H=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){const J=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),J){const st=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),S.__depthDisposeCallback=st}S.__boundDepthTexture=J}if(I.depthTexture&&!S.__autoAllocateDepthBuffer)if(H)for(let J=0;J<6;J++)Xt(S.__webglFramebuffer[J],I,J);else{const J=I.texture.mipmaps;J&&J.length>0?Xt(S.__webglFramebuffer[0],I,0):Xt(S.__webglFramebuffer,I,0)}else if(H){S.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[J]),S.__webglDepthbuffer[J]===void 0)S.__webglDepthbuffer[J]=e.createRenderbuffer(),ee(S.__webglDepthbuffer[J],I,!1);else{const st=I.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[J];e.bindRenderbuffer(e.RENDERBUFFER,K),e.framebufferRenderbuffer(e.FRAMEBUFFER,st,e.RENDERBUFFER,K)}}else{const J=I.texture.mipmaps;if(J&&J.length>0?n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),ee(S.__webglDepthbuffer,I,!1);else{const st=I.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,K),e.framebufferRenderbuffer(e.FRAMEBUFFER,st,e.RENDERBUFFER,K)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function sn(I,S,H){const J=i.get(I);S!==void 0&&Mt(J.__webglFramebuffer,I,I.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),H!==void 0&&Zt(I)}function pe(I){const S=I.texture,H=i.get(I),J=i.get(S);I.addEventListener("dispose",A);const st=I.textures,K=I.isWebGLCubeRenderTarget===!0,At=st.length>1;if(At||(J.__webglTexture===void 0&&(J.__webglTexture=e.createTexture()),J.__version=S.version,r.memory.textures++),K){H.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[gt]=[];for(let Bt=0;Bt<S.mipmaps.length;Bt++)H.__webglFramebuffer[gt][Bt]=e.createFramebuffer()}else H.__webglFramebuffer[gt]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let gt=0;gt<S.mipmaps.length;gt++)H.__webglFramebuffer[gt]=e.createFramebuffer()}else H.__webglFramebuffer=e.createFramebuffer();if(At)for(let gt=0,Bt=st.length;gt<Bt;gt++){const Yt=i.get(st[gt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=e.createTexture(),r.memory.textures++)}if(I.samples>0&&$e(I)===!1){H.__webglMultisampledFramebuffer=e.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let gt=0;gt<st.length;gt++){const Bt=st[gt];H.__webglColorRenderbuffer[gt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,H.__webglColorRenderbuffer[gt]);const Yt=a.convert(Bt.format,Bt.colorSpace),rt=a.convert(Bt.type),ut=M(Bt.internalFormat,Yt,rt,Bt.colorSpace,I.isXRRenderTarget===!0),Rt=N(I);e.renderbufferStorageMultisample(e.RENDERBUFFER,Rt,ut,I.width,I.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+gt,e.RENDERBUFFER,H.__webglColorRenderbuffer[gt])}e.bindRenderbuffer(e.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=e.createRenderbuffer(),ee(H.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(K){n.bindTexture(e.TEXTURE_CUBE_MAP,J.__webglTexture),dt(e.TEXTURE_CUBE_MAP,S);for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Bt=0;Bt<S.mipmaps.length;Bt++)Mt(H.__webglFramebuffer[gt][Bt],I,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Bt);else Mt(H.__webglFramebuffer[gt],I,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);p(S)&&m(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(At){for(let gt=0,Bt=st.length;gt<Bt;gt++){const Yt=st[gt],rt=i.get(Yt);let ut=e.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ut=I.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ut,rt.__webglTexture),dt(ut,Yt),Mt(H.__webglFramebuffer,I,Yt,e.COLOR_ATTACHMENT0+gt,ut,0),p(Yt)&&m(ut)}n.unbindTexture()}else{let gt=e.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(gt=I.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(gt,J.__webglTexture),dt(gt,S),S.mipmaps&&S.mipmaps.length>0)for(let Bt=0;Bt<S.mipmaps.length;Bt++)Mt(H.__webglFramebuffer[Bt],I,S,e.COLOR_ATTACHMENT0,gt,Bt);else Mt(H.__webglFramebuffer,I,S,e.COLOR_ATTACHMENT0,gt,0);p(S)&&m(gt),n.unbindTexture()}I.depthBuffer&&Zt(I)}function Se(I){const S=I.textures;for(let H=0,J=S.length;H<J;H++){const st=S[H];if(p(st)){const K=x(I),At=i.get(st).__webglTexture;n.bindTexture(K,At),m(K),n.unbindTexture()}}}const Pe=[],le=[];function Xe(I){if(I.samples>0){if($e(I)===!1){const S=I.textures,H=I.width,J=I.height;let st=e.COLOR_BUFFER_BIT;const K=I.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,At=i.get(I),gt=S.length>1;if(gt)for(let Yt=0;Yt<S.length;Yt++)n.bindFramebuffer(e.FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Yt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,At.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Yt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);const Bt=I.texture.mipmaps;Bt&&Bt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Yt=0;Yt<S.length;Yt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(st|=e.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(st|=e.STENCIL_BUFFER_BIT)),gt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,At.__webglColorRenderbuffer[Yt]);const rt=i.get(S[Yt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,rt,0)}e.blitFramebuffer(0,0,H,J,0,0,H,J,st,e.NEAREST),c===!0&&(Pe.length=0,le.length=0,Pe.push(e.COLOR_ATTACHMENT0+Yt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Pe.push(K),le.push(K),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,le)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Pe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),gt)for(let Yt=0;Yt<S.length;Yt++){n.bindFramebuffer(e.FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Yt,e.RENDERBUFFER,At.__webglColorRenderbuffer[Yt]);const rt=i.get(S[Yt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,At.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Yt,e.TEXTURE_2D,rt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const S=I.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function N(I){return Math.min(s.maxSamples,I.samples)}function $e(I){const S=i.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ve(I){const S=r.render.frame;d.get(I)!==S&&(d.set(I,S),I.update())}function Le(I,S){const H=I.colorSpace,J=I.format,st=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==Ja&&H!==bs&&(_e.getTransfer(H)===we?(J!==Ei||st!==ti)&&$t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):me("WebGLTextures: Unsupported texture color space:",H)),S}function Lt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(h.width=I.naturalWidth||I.width,h.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(h.width=I.displayWidth,h.height=I.displayHeight):(h.width=I.width,h.height=I.height),h}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=W,this.setTexture3D=G,this.setTextureCube=et,this.rebindTextures=sn,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function C1(e,t){function n(i,s=bs){let a;const r=_e.getTransfer(s);if(i===ti)return e.UNSIGNED_BYTE;if(i===uh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===fh)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Up)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Np)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ip)return e.BYTE;if(i===Lp)return e.SHORT;if(i===Lr)return e.UNSIGNED_SHORT;if(i===hh)return e.INT;if(i===ki)return e.UNSIGNED_INT;if(i===Li)return e.FLOAT;if(i===ni)return e.HALF_FLOAT;if(i===Fp)return e.ALPHA;if(i===Op)return e.RGB;if(i===Ei)return e.RGBA;if(i===fs)return e.DEPTH_COMPONENT;if(i===Js)return e.DEPTH_STENCIL;if(i===Bp)return e.RED;if(i===ph)return e.RED_INTEGER;if(i===Ka)return e.RG;if(i===mh)return e.RG_INTEGER;if(i===_h)return e.RGBA_INTEGER;if(i===Lo||i===Uo||i===No||i===Fo)if(r===we)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Lo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===No)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Lo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Uo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===No)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Kc||i===Jc||i===Qc||i===td)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Kc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Jc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===td)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ed||i===nd||i===id||i===sd||i===ad||i===rd||i===od)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===ed||i===nd)return r===we?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===id)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===sd)return a.COMPRESSED_R11_EAC;if(i===ad)return a.COMPRESSED_SIGNED_R11_EAC;if(i===rd)return a.COMPRESSED_RG11_EAC;if(i===od)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ld||i===cd||i===dd||i===hd||i===ud||i===fd||i===pd||i===md||i===_d||i===gd||i===xd||i===vd||i===Md||i===yd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===ld)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ud)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===md)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_d)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Md)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yd)return r===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sd||i===Ed||i===wd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===Sd)return r===we?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ed)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Td||i===bd||i===Ad||i===Rd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Td)return a.COMPRESSED_RED_RGTC1_EXT;if(i===bd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ad)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ur?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const P1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class I1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new Yp(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Pn({vertexShader:P1,fragmentShader:D1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new T(new Wi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class L1 extends da{constructor(t,n){super();const i=this;let s=null,a=1,r=null,o="local-floor",c=1,h=null,d=null,l=null,u=null,f=null,_=null;const g=typeof XRWebGLBinding<"u",p=new I1,m={},x=n.getContextAttributes();let M=null,y=null;const b=[],E=[],A=new Pt;let v=null;const w=new oi;w.viewport=new We;const D=new oi;D.viewport=new We;const C=[w,D],L=new kx;let U=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let mt=b[Q];return mt===void 0&&(mt=new Kl,b[Q]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(Q){let mt=b[Q];return mt===void 0&&(mt=new Kl,b[Q]=mt),mt.getGripSpace()},this.getHand=function(Q){let mt=b[Q];return mt===void 0&&(mt=new Kl,b[Q]=mt),mt.getHandSpace()};function B(Q){const mt=E.indexOf(Q.inputSource);if(mt===-1)return;const Mt=b[mt];Mt!==void 0&&(Mt.update(Q.inputSource,Q.frame,h||r),Mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",G);for(let Q=0;Q<b.length;Q++){const mt=E[Q];mt!==null&&(E[Q]=null,b[Q].disconnect(mt))}U=null,V=null,p.reset();for(const Q in m)delete m[Q];t.setRenderTarget(M),f=null,u=null,l=null,s=null,y=null,Fe.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){a=Q,i.isPresenting===!0&&$t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&$t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||r},this.setReferenceSpace=function(Q){h=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return l===null&&g&&(l=new XRWebGLBinding(s,n)),l},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",G),x.xrCompatible!==!0&&await n.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,ee=null,Xt=null;x.depth&&(Xt=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Mt=x.stencil?Js:fs,ee=x.stencil?Ur:ki);const Zt={colorFormat:n.RGBA8,depthFormat:Xt,scaleFactor:a};l=this.getBinding(),u=l.createProjectionLayer(Zt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Xn(u.textureWidth,u.textureHeight,{format:Ei,type:ti,depthTexture:new Fr(u.textureWidth,u.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const Mt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,n,Mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xn(f.framebufferWidth,f.framebufferHeight,{format:Ei,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),h=null,r=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function G(Q){for(let mt=0;mt<Q.removed.length;mt++){const Mt=Q.removed[mt],ee=E.indexOf(Mt);ee>=0&&(E[ee]=null,b[ee].disconnect(Mt))}for(let mt=0;mt<Q.added.length;mt++){const Mt=Q.added[mt];let ee=E.indexOf(Mt);if(ee===-1){for(let Zt=0;Zt<b.length;Zt++)if(Zt>=E.length){E.push(Mt),ee=Zt;break}else if(E[Zt]===null){E[Zt]=Mt,ee=Zt;break}if(ee===-1)break}const Xt=b[ee];Xt&&Xt.connect(Mt)}}const et=new F,nt=new F;function pt(Q,mt,Mt){et.setFromMatrixPosition(mt.matrixWorld),nt.setFromMatrixPosition(Mt.matrixWorld);const ee=et.distanceTo(nt),Xt=mt.projectionMatrix.elements,Zt=Mt.projectionMatrix.elements,sn=Xt[14]/(Xt[10]-1),pe=Xt[14]/(Xt[10]+1),Se=(Xt[9]+1)/Xt[5],Pe=(Xt[9]-1)/Xt[5],le=(Xt[8]-1)/Xt[0],Xe=(Zt[8]+1)/Zt[0],N=sn*le,$e=sn*Xe,ve=ee/(-le+Xe),Le=ve*-le;if(mt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Le),Q.translateZ(ve),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Xt[10]===-1)Q.projectionMatrix.copy(mt.projectionMatrix),Q.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const Lt=sn+ve,I=pe+ve,S=N-Le,H=$e+(ee-Le),J=Se*pe/I*Lt,st=Pe*pe/I*Lt;Q.projectionMatrix.makePerspective(S,H,J,st,Lt,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function at(Q,mt){mt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(mt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let mt=Q.near,Mt=Q.far;p.texture!==null&&(p.depthNear>0&&(mt=p.depthNear),p.depthFar>0&&(Mt=p.depthFar)),L.near=D.near=w.near=mt,L.far=D.far=w.far=Mt,(U!==L.near||V!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),U=L.near,V=L.far),L.layers.mask=Q.layers.mask|6,w.layers.mask=L.layers.mask&-5,D.layers.mask=L.layers.mask&-3;const ee=Q.parent,Xt=L.cameras;at(L,ee);for(let Zt=0;Zt<Xt.length;Zt++)at(Xt[Zt],ee);Xt.length===2?pt(L,w,D):L.projectionMatrix.copy(w.projectionMatrix),dt(Q,L,ee)};function dt(Q,mt,Mt){Mt===null?Q.matrix.copy(mt.matrixWorld):(Q.matrix.copy(Mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(mt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(mt.projectionMatrix),Q.projectionMatrixInverse.copy(mt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Cd*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Q){c=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(Q){return m[Q]};let Wt=null;function Te(Q,mt){if(d=mt.getViewerPose(h||r),_=mt,d!==null){const Mt=d.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ee=!1;Mt.length!==L.cameras.length&&(L.cameras.length=0,ee=!0);for(let pe=0;pe<Mt.length;pe++){const Se=Mt[pe];let Pe=null;if(f!==null)Pe=f.getViewport(Se);else{const Xe=l.getViewSubImage(u,Se);Pe=Xe.viewport,pe===0&&(t.setRenderTargetTextures(y,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(y))}let le=C[pe];le===void 0&&(le=new oi,le.layers.enable(pe),le.viewport=new We,C[pe]=le),le.matrix.fromArray(Se.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Se.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),pe===0&&(L.matrix.copy(le.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),ee===!0&&L.cameras.push(le)}const Xt=s.enabledFeatures;if(Xt&&Xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){l=i.getBinding();const pe=l.getDepthInformation(Mt[0]);pe&&pe.isValid&&pe.texture&&p.init(pe,s.renderState)}if(Xt&&Xt.includes("camera-access")&&g){t.state.unbindTexture(),l=i.getBinding();for(let pe=0;pe<Mt.length;pe++){const Se=Mt[pe].camera;if(Se){let Pe=m[Se];Pe||(Pe=new Yp,m[Se]=Pe);const le=l.getCameraImage(Se);Pe.sourceTexture=le}}}}for(let Mt=0;Mt<b.length;Mt++){const ee=E[Mt],Xt=b[Mt];ee!==null&&Xt!==void 0&&Xt.update(ee,mt,h||r)}Wt&&Wt(Q,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),_=null}const Fe=new Jp;Fe.setAnimationLoop(Te),this.setAnimationLoop=function(Q){Wt=Q},this.dispose=function(){}}}const qs=new Vi,U1=new Ge;function N1(e,t){function n(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,$p(e)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,M,y){m.isMeshBasicMaterial?a(p,m):m.isMeshLambertMaterial?(a(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(p,m),l(p,m)):m.isMeshPhongMaterial?(a(p,m),d(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(a(p,m),_(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),g(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(r(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,x,M):m.isSpriteMaterial?h(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,n(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,n(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Wn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,n(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Wn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,n(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,n(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,n(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),M=x.envMap,y=x.envMapRotation;M&&(p.envMap.value=M,qs.copy(y),qs.x*=-1,qs.y*=-1,qs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),p.envMapRotation.value.setFromMatrix4(U1.makeRotationFromEuler(qs)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,n(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,n(m.aoMap,p.aoMapTransform))}function r(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,n(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=M*.5,m.map&&(p.map.value=m.map,n(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,n(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function l(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,n(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,n(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,n(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,n(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,n(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,n(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,n(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Wn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,n(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,n(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,n(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,n(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,n(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,n(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,n(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function F1(e,t,n,i){let s={},a={},r=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const y=M.program;i.uniformBlockBinding(x,y)}function h(x,M){let y=s[x.id];y===void 0&&(_(x),y=d(x),s[x.id]=y,x.addEventListener("dispose",p));const b=M.program;i.updateUBOMapping(x,b);const E=t.render.frame;a[x.id]!==E&&(u(x),a[x.id]=E)}function d(x){const M=l();x.__bindingPointIndex=M;const y=e.createBuffer(),b=x.__size,E=x.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,b,E),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,y),y}function l(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return me("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=s[x.id],y=x.uniforms,b=x.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let E=0,A=y.length;E<A;E++){const v=Array.isArray(y[E])?y[E]:[y[E]];for(let w=0,D=v.length;w<D;w++){const C=v[w];if(f(C,E,w,b)===!0){const L=C.__offset,U=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let B=0;B<U.length;B++){const W=U[B],G=g(W);typeof W=="number"||typeof W=="boolean"?(C.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,L+V,C.__data)):W.isMatrix3?(C.__data[0]=W.elements[0],C.__data[1]=W.elements[1],C.__data[2]=W.elements[2],C.__data[3]=0,C.__data[4]=W.elements[3],C.__data[5]=W.elements[4],C.__data[6]=W.elements[5],C.__data[7]=0,C.__data[8]=W.elements[6],C.__data[9]=W.elements[7],C.__data[10]=W.elements[8],C.__data[11]=0):(W.toArray(C.__data,V),V+=G.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,L,C.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(x,M,y,b){const E=x.value,A=M+"_"+y;if(b[A]===void 0)return typeof E=="number"||typeof E=="boolean"?b[A]=E:b[A]=E.clone(),!0;{const v=b[A];if(typeof E=="number"||typeof E=="boolean"){if(v!==E)return b[A]=E,!0}else if(v.equals(E)===!1)return v.copy(E),!0}return!1}function _(x){const M=x.uniforms;let y=0;const b=16;for(let A=0,v=M.length;A<v;A++){const w=Array.isArray(M[A])?M[A]:[M[A]];for(let D=0,C=w.length;D<C;D++){const L=w[D],U=Array.isArray(L.value)?L.value:[L.value];for(let V=0,B=U.length;V<B;V++){const W=U[V],G=g(W),et=y%b,nt=et%G.boundary,pt=et+nt;y+=nt,pt!==0&&b-pt<G.storage&&(y+=b-pt),L.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=G.storage}}}const E=y%b;return E>0&&(y+=b-E),x.__size=y,x.__cache={},this}function g(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?$t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):$t("WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const y=r.indexOf(M.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function m(){for(const x in s)e.deleteBuffer(s[x]);r=[],s={},a={}}return{bind:c,update:h,dispose:m}}const O1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ai=null;function B1(){return Ai===null&&(Ai=new wx(O1,16,16,Ka,ni),Ai.name="DFG_LUT",Ai.minFilter=Cn,Ai.magFilter=Cn,Ai.wrapS=os,Ai.wrapT=os,Ai.generateMipmaps=!1,Ai.needsUpdate=!0),Ai}class z1{constructor(t={}){const{canvas:n=tx(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:l=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ti}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;const g=f,p=new Set([_h,mh,ph]),m=new Set([ti,ki,Lr,Ur,uh,fh]),x=new Uint32Array(4),M=new Int32Array(4);let y=null,b=null;const E=[],A=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let D=!1;this._outputColorSpace=ai;let C=0,L=0,U=null,V=-1,B=null;const W=new We,G=new We;let et=null;const nt=new Ft(0);let pt=0,at=n.width,dt=n.height,Wt=1,Te=null,Fe=null;const Q=new We(0,0,at,dt),mt=new We(0,0,at,dt);let Mt=!1;const ee=new Sh;let Xt=!1,Zt=!1;const sn=new Ge,pe=new F,Se=new We,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function Xe(){return U===null?Wt:1}let N=i;function $e(P,k){return n.getContext(P,k)}try{const P={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:d,failIfMajorPerformanceCaveat:l};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ch}`),n.addEventListener("webglcontextlost",Ct,!1),n.addEventListener("webglcontextrestored",Kt,!1),n.addEventListener("webglcontextcreationerror",Ue,!1),N===null){const k="webgl2";if(N=$e(k,P),N===null)throw $e(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw me("WebGLRenderer: "+P.message),P}let ve,Le,Lt,I,S,H,J,st,K,At,gt,Bt,Yt,rt,ut,Rt,Dt,wt,ce,O,xt,ft,bt;function lt(){ve=new zy(N),ve.init(),xt=new C1(N,ve),Le=new Dy(N,ve,t,xt),Lt=new A1(N,ve),Le.reversedDepthBuffer&&u&&Lt.buffers.depth.setReversed(!0),I=new ky(N),S=new f1,H=new R1(N,ve,Lt,S,Le,xt,I),J=new By(w),st=new Yx(N),ft=new Cy(N,st),K=new Hy(N,st,I,ft),At=new Wy(N,K,st,ft,I),wt=new Vy(N,Le,H),ut=new Iy(S),gt=new u1(w,J,ve,Le,ft,ut),Bt=new N1(w,S),Yt=new m1,rt=new y1(ve),Dt=new Ry(w,J,Lt,At,_,c),Rt=new b1(w,At,Le),bt=new F1(N,I,Le,Lt),ce=new Py(N,ve,I),O=new Gy(N,ve,I),I.programs=gt.programs,w.capabilities=Le,w.extensions=ve,w.properties=S,w.renderLists=Yt,w.shadowMap=Rt,w.state=Lt,w.info=I}lt(),g!==ti&&(v=new qy(g,n.width,n.height,s,a));const j=new L1(w,N);this.xr=j,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const P=ve.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ve.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Wt},this.setPixelRatio=function(P){P!==void 0&&(Wt=P,this.setSize(at,dt,!1))},this.getSize=function(P){return P.set(at,dt)},this.setSize=function(P,k,Y=!0){if(j.isPresenting){$t("WebGLRenderer: Can't change size while VR device is presenting.");return}at=P,dt=k,n.width=Math.floor(P*Wt),n.height=Math.floor(k*Wt),Y===!0&&(n.style.width=P+"px",n.style.height=k+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,P,k)},this.getDrawingBufferSize=function(P){return P.set(at*Wt,dt*Wt).floor()},this.setDrawingBufferSize=function(P,k,Y){at=P,dt=k,Wt=Y,n.width=Math.floor(P*Y),n.height=Math.floor(k*Y),this.setViewport(0,0,P,k)},this.setEffects=function(P){if(g===ti){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let k=0;k<P.length;k++)if(P[k].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(W)},this.getViewport=function(P){return P.copy(Q)},this.setViewport=function(P,k,Y,q){P.isVector4?Q.set(P.x,P.y,P.z,P.w):Q.set(P,k,Y,q),Lt.viewport(W.copy(Q).multiplyScalar(Wt).round())},this.getScissor=function(P){return P.copy(mt)},this.setScissor=function(P,k,Y,q){P.isVector4?mt.set(P.x,P.y,P.z,P.w):mt.set(P,k,Y,q),Lt.scissor(G.copy(mt).multiplyScalar(Wt).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(P){Lt.setScissorTest(Mt=P)},this.setOpaqueSort=function(P){Te=P},this.setTransparentSort=function(P){Fe=P},this.getClearColor=function(P){return P.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(P=!0,k=!0,Y=!0){let q=0;if(P){let X=!1;if(U!==null){const St=U.texture.format;X=p.has(St)}if(X){const St=U.texture.type,Tt=m.has(St),Et=Dt.getClearColor(),It=Dt.getClearAlpha(),Nt=Et.r,te=Et.g,de=Et.b;Tt?(x[0]=Nt,x[1]=te,x[2]=de,x[3]=It,N.clearBufferuiv(N.COLOR,0,x)):(M[0]=Nt,M[1]=te,M[2]=de,M[3]=It,N.clearBufferiv(N.COLOR,0,M))}else q|=N.COLOR_BUFFER_BIT}k&&(q|=N.DEPTH_BUFFER_BIT),Y&&(q|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&N.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Ct,!1),n.removeEventListener("webglcontextrestored",Kt,!1),n.removeEventListener("webglcontextcreationerror",Ue,!1),Dt.dispose(),Yt.dispose(),rt.dispose(),S.dispose(),J.dispose(),At.dispose(),ft.dispose(),bt.dispose(),gt.dispose(),j.dispose(),j.removeEventListener("sessionstart",Yh),j.removeEventListener("sessionend",$h),zs.stop()};function Ct(P){P.preventDefault(),Uu("WebGLRenderer: Context Lost."),D=!0}function Kt(){Uu("WebGLRenderer: Context Restored."),D=!1;const P=I.autoReset,k=Rt.enabled,Y=Rt.autoUpdate,q=Rt.needsUpdate,X=Rt.type;lt(),I.autoReset=P,Rt.enabled=k,Rt.autoUpdate=Y,Rt.needsUpdate=q,Rt.type=X}function Ue(P){me("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Ee(P){const k=P.target;k.removeEventListener("dispose",Ee),Yi(k)}function Yi(P){$i(P),S.remove(P)}function $i(P){const k=S.get(P).programs;k!==void 0&&(k.forEach(function(Y){gt.releaseProgram(Y)}),P.isShaderMaterial&&gt.releaseShaderCache(P))}this.renderBufferDirect=function(P,k,Y,q,X,St){k===null&&(k=Pe);const Tt=X.isMesh&&X.matrixWorld.determinant()<0,Et=Zm(P,k,Y,q,X);Lt.setMaterial(q,Tt);let It=Y.index,Nt=1;if(q.wireframe===!0){if(It=K.getWireframeAttribute(Y),It===void 0)return;Nt=2}const te=Y.drawRange,de=Y.attributes.position;let Ot=te.start*Nt,be=(te.start+te.count)*Nt;St!==null&&(Ot=Math.max(Ot,St.start*Nt),be=Math.min(be,(St.start+St.count)*Nt)),It!==null?(Ot=Math.max(Ot,0),be=Math.min(be,It.count)):de!=null&&(Ot=Math.max(Ot,0),be=Math.min(be,de.count));const qe=be-Ot;if(qe<0||qe===1/0)return;ft.setup(X,q,Et,Y,It);let Ve,Ae=ce;if(It!==null&&(Ve=st.get(It),Ae=O,Ae.setIndex(Ve)),X.isMesh)q.wireframe===!0?(Lt.setLineWidth(q.wireframeLinewidth*Xe()),Ae.setMode(N.LINES)):Ae.setMode(N.TRIANGLES);else if(X.isLine){let Mn=q.linewidth;Mn===void 0&&(Mn=1),Lt.setLineWidth(Mn*Xe()),X.isLineSegments?Ae.setMode(N.LINES):X.isLineLoop?Ae.setMode(N.LINE_LOOP):Ae.setMode(N.LINE_STRIP)}else X.isPoints?Ae.setMode(N.POINTS):X.isSprite&&Ae.setMode(N.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Qo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ae.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(ve.get("WEBGL_multi_draw"))Ae.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Mn=X._multiDrawStarts,Ut=X._multiDrawCounts,Yn=X._multiDrawCount,ge=It?st.get(It).bytesPerElement:1,di=S.get(q).currentProgram.getUniforms();for(let Ti=0;Ti<Yn;Ti++)di.setValue(N,"_gl_DrawID",Ti),Ae.render(Mn[Ti]/ge,Ut[Ti])}else if(X.isInstancedMesh)Ae.renderInstances(Ot,qe,X.count);else if(Y.isInstancedBufferGeometry){const Mn=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ut=Math.min(Y.instanceCount,Mn);Ae.renderInstances(Ot,qe,Ut)}else Ae.render(Ot,qe)};function qh(P,k,Y){P.transparent===!0&&P.side===Qn&&P.forceSinglePass===!1?(P.side=Wn,P.needsUpdate=!0,no(P,k,Y),P.side=Is,P.needsUpdate=!0,no(P,k,Y),P.side=Qn):no(P,k,Y)}this.compile=function(P,k,Y=null){Y===null&&(Y=P),b=rt.get(Y),b.init(k),A.push(b),Y.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),P!==Y&&P.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),b.setupLights();const q=new Set;return P.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const St=X.material;if(St)if(Array.isArray(St))for(let Tt=0;Tt<St.length;Tt++){const Et=St[Tt];qh(Et,Y,X),q.add(Et)}else qh(St,Y,X),q.add(St)}),b=A.pop(),q},this.compileAsync=function(P,k,Y=null){const q=this.compile(P,k,Y);return new Promise(X=>{function St(){if(q.forEach(function(Tt){S.get(Tt).currentProgram.isReady()&&q.delete(Tt)}),q.size===0){X(P);return}setTimeout(St,10)}ve.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Ol=null;function $m(P){Ol&&Ol(P)}function Yh(){zs.stop()}function $h(){zs.start()}const zs=new Jp;zs.setAnimationLoop($m),typeof self<"u"&&zs.setContext(self),this.setAnimationLoop=function(P){Ol=P,j.setAnimationLoop(P),P===null?zs.stop():zs.start()},j.addEventListener("sessionstart",Yh),j.addEventListener("sessionend",$h),this.render=function(P,k){if(k!==void 0&&k.isCamera!==!0){me("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;const Y=j.enabled===!0&&j.isPresenting===!0,q=v!==null&&(U===null||Y)&&v.begin(w,U);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(k),k=j.getCamera()),P.isScene===!0&&P.onBeforeRender(w,P,k,U),b=rt.get(P,A.length),b.init(k),A.push(b),sn.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ee.setFromProjectionMatrix(sn,Ui,k.reversedDepth),Zt=this.localClippingEnabled,Xt=ut.init(this.clippingPlanes,Zt),y=Yt.get(P,E.length),y.init(),E.push(y),j.enabled===!0&&j.isPresenting===!0){const Tt=w.xr.getDepthSensingMesh();Tt!==null&&Bl(Tt,k,-1/0,w.sortObjects)}Bl(P,k,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(Te,Fe),le=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,le&&Dt.addToRenderList(y,P),this.info.render.frame++,Xt===!0&&ut.beginShadows();const X=b.state.shadowsArray;if(Rt.render(X,P,k),Xt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset(),(q&&v.hasRenderPass())===!1){const Tt=y.opaque,Et=y.transmissive;if(b.setupLights(),k.isArrayCamera){const It=k.cameras;if(Et.length>0)for(let Nt=0,te=It.length;Nt<te;Nt++){const de=It[Nt];jh(Tt,Et,P,de)}le&&Dt.render(P);for(let Nt=0,te=It.length;Nt<te;Nt++){const de=It[Nt];Zh(y,P,de,de.viewport)}}else Et.length>0&&jh(Tt,Et,P,k),le&&Dt.render(P),Zh(y,P,k)}U!==null&&L===0&&(H.updateMultisampleRenderTarget(U),H.updateRenderTargetMipmap(U)),q&&v.end(w),P.isScene===!0&&P.onAfterRender(w,P,k),ft.resetDefaultState(),V=-1,B=null,A.pop(),A.length>0?(b=A[A.length-1],Xt===!0&&ut.setGlobalState(w.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?y=E[E.length-1]:y=null};function Bl(P,k,Y,q){if(P.visible===!1)return;if(P.layers.test(k.layers)){if(P.isGroup)Y=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(k);else if(P.isLight)b.pushLight(P),P.castShadow&&b.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||ee.intersectsSprite(P)){q&&Se.setFromMatrixPosition(P.matrixWorld).applyMatrix4(sn);const Tt=At.update(P),Et=P.material;Et.visible&&y.push(P,Tt,Et,Y,Se.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||ee.intersectsObject(P))){const Tt=At.update(P),Et=P.material;if(q&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Se.copy(P.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Se.copy(Tt.boundingSphere.center)),Se.applyMatrix4(P.matrixWorld).applyMatrix4(sn)),Array.isArray(Et)){const It=Tt.groups;for(let Nt=0,te=It.length;Nt<te;Nt++){const de=It[Nt],Ot=Et[de.materialIndex];Ot&&Ot.visible&&y.push(P,Tt,Ot,Y,Se.z,de)}}else Et.visible&&y.push(P,Tt,Et,Y,Se.z,null)}}const St=P.children;for(let Tt=0,Et=St.length;Tt<Et;Tt++)Bl(St[Tt],k,Y,q)}function Zh(P,k,Y,q){const{opaque:X,transmissive:St,transparent:Tt}=P;b.setupLightsView(Y),Xt===!0&&ut.setGlobalState(w.clippingPlanes,Y),q&&Lt.viewport(W.copy(q)),X.length>0&&eo(X,k,Y),St.length>0&&eo(St,k,Y),Tt.length>0&&eo(Tt,k,Y),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function jh(P,k,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[q.id]===void 0){const Ot=ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[q.id]=new Xn(1,1,{generateMipmaps:!0,type:Ot?ni:ti,minFilter:Ks,samples:Math.max(4,Le.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:_e.workingColorSpace})}const St=b.state.transmissionRenderTarget[q.id],Tt=q.viewport||W;St.setSize(Tt.z*w.transmissionResolutionScale,Tt.w*w.transmissionResolutionScale);const Et=w.getRenderTarget(),It=w.getActiveCubeFace(),Nt=w.getActiveMipmapLevel();w.setRenderTarget(St),w.getClearColor(nt),pt=w.getClearAlpha(),pt<1&&w.setClearColor(16777215,.5),w.clear(),le&&Dt.render(Y);const te=w.toneMapping;w.toneMapping=Bi;const de=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),b.setupLightsView(q),Xt===!0&&ut.setGlobalState(w.clippingPlanes,q),eo(P,Y,q),H.updateMultisampleRenderTarget(St),H.updateRenderTargetMipmap(St),ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let be=0,qe=k.length;be<qe;be++){const Ve=k[be],{object:Ae,geometry:Mn,material:Ut,group:Yn}=Ve;if(Ut.side===Qn&&Ae.layers.test(q.layers)){const ge=Ut.side;Ut.side=Wn,Ut.needsUpdate=!0,Kh(Ae,Y,q,Mn,Ut,Yn),Ut.side=ge,Ut.needsUpdate=!0,Ot=!0}}Ot===!0&&(H.updateMultisampleRenderTarget(St),H.updateRenderTargetMipmap(St))}w.setRenderTarget(Et,It,Nt),w.setClearColor(nt,pt),de!==void 0&&(q.viewport=de),w.toneMapping=te}function eo(P,k,Y){const q=k.isScene===!0?k.overrideMaterial:null;for(let X=0,St=P.length;X<St;X++){const Tt=P[X],{object:Et,geometry:It,group:Nt}=Tt;let te=Tt.material;te.allowOverride===!0&&q!==null&&(te=q),Et.layers.test(Y.layers)&&Kh(Et,k,Y,It,te,Nt)}}function Kh(P,k,Y,q,X,St){P.onBeforeRender(w,k,Y,q,X,St),P.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),X.onBeforeRender(w,k,Y,q,P,St),X.transparent===!0&&X.side===Qn&&X.forceSinglePass===!1?(X.side=Wn,X.needsUpdate=!0,w.renderBufferDirect(Y,k,q,X,P,St),X.side=Is,X.needsUpdate=!0,w.renderBufferDirect(Y,k,q,X,P,St),X.side=Qn):w.renderBufferDirect(Y,k,q,X,P,St),P.onAfterRender(w,k,Y,q,X,St)}function no(P,k,Y){k.isScene!==!0&&(k=Pe);const q=S.get(P),X=b.state.lights,St=b.state.shadowsArray,Tt=X.state.version,Et=gt.getParameters(P,X.state,St,k,Y),It=gt.getProgramCacheKey(Et);let Nt=q.programs;q.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;const te=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;q.envMap=J.get(P.envMap||q.environment,te),q.envMapRotation=q.environment!==null&&P.envMap===null?k.environmentRotation:P.envMapRotation,Nt===void 0&&(P.addEventListener("dispose",Ee),Nt=new Map,q.programs=Nt);let de=Nt.get(It);if(de!==void 0){if(q.currentProgram===de&&q.lightsStateVersion===Tt)return Qh(P,Et),de}else Et.uniforms=gt.getUniforms(P),P.onBeforeCompile(Et,w),de=gt.acquireProgram(Et,It),Nt.set(It,de),q.uniforms=Et.uniforms;const Ot=q.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ot.clippingPlanes=ut.uniform),Qh(P,Et),q.needsLights=Km(P),q.lightsStateVersion=Tt,q.needsLights&&(Ot.ambientLightColor.value=X.state.ambient,Ot.lightProbe.value=X.state.probe,Ot.directionalLights.value=X.state.directional,Ot.directionalLightShadows.value=X.state.directionalShadow,Ot.spotLights.value=X.state.spot,Ot.spotLightShadows.value=X.state.spotShadow,Ot.rectAreaLights.value=X.state.rectArea,Ot.ltc_1.value=X.state.rectAreaLTC1,Ot.ltc_2.value=X.state.rectAreaLTC2,Ot.pointLights.value=X.state.point,Ot.pointLightShadows.value=X.state.pointShadow,Ot.hemisphereLights.value=X.state.hemi,Ot.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ot.spotLightMatrix.value=X.state.spotLightMatrix,Ot.spotLightMap.value=X.state.spotLightMap,Ot.pointShadowMatrix.value=X.state.pointShadowMatrix),q.currentProgram=de,q.uniformsList=null,de}function Jh(P){if(P.uniformsList===null){const k=P.currentProgram.getUniforms();P.uniformsList=Bo.seqWithValue(k.seq,P.uniforms)}return P.uniformsList}function Qh(P,k){const Y=S.get(P);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function Zm(P,k,Y,q,X){k.isScene!==!0&&(k=Pe),H.resetTextureUnits();const St=k.fog,Tt=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,Et=U===null?w.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ja,It=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Nt=J.get(q.envMap||Tt,It),te=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,de=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ot=!!Y.morphAttributes.position,be=!!Y.morphAttributes.normal,qe=!!Y.morphAttributes.color;let Ve=Bi;q.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Ve=w.toneMapping);const Ae=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Mn=Ae!==void 0?Ae.length:0,Ut=S.get(q),Yn=b.state.lights;if(Xt===!0&&(Zt===!0||P!==B)){const an=P===B&&q.id===V;ut.setState(q,P,an)}let ge=!1;q.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Yn.state.version||Ut.outputColorSpace!==Et||X.isBatchedMesh&&Ut.batching===!1||!X.isBatchedMesh&&Ut.batching===!0||X.isBatchedMesh&&Ut.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ut.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ut.instancing===!1||!X.isInstancedMesh&&Ut.instancing===!0||X.isSkinnedMesh&&Ut.skinning===!1||!X.isSkinnedMesh&&Ut.skinning===!0||X.isInstancedMesh&&Ut.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ut.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ut.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ut.instancingMorph===!1&&X.morphTexture!==null||Ut.envMap!==Nt||q.fog===!0&&Ut.fog!==St||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ut.numPlanes||Ut.numIntersection!==ut.numIntersection)||Ut.vertexAlphas!==te||Ut.vertexTangents!==de||Ut.morphTargets!==Ot||Ut.morphNormals!==be||Ut.morphColors!==qe||Ut.toneMapping!==Ve||Ut.morphTargetsCount!==Mn)&&(ge=!0):(ge=!0,Ut.__version=q.version);let di=Ut.currentProgram;ge===!0&&(di=no(q,k,X));let Ti=!1,Hs=!1,ua=!1;const De=di.getUniforms(),un=Ut.uniforms;if(Lt.useProgram(di.program)&&(Ti=!0,Hs=!0,ua=!0),q.id!==V&&(V=q.id,Hs=!0),Ti||B!==P){Lt.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),De.setValue(N,"projectionMatrix",P.projectionMatrix),De.setValue(N,"viewMatrix",P.matrixWorldInverse);const ms=De.map.cameraPosition;ms!==void 0&&ms.setValue(N,pe.setFromMatrixPosition(P.matrixWorld)),Le.logarithmicDepthBuffer&&De.setValue(N,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&De.setValue(N,"isOrthographic",P.isOrthographicCamera===!0),B!==P&&(B=P,Hs=!0,ua=!0)}if(Ut.needsLights&&(Yn.state.directionalShadowMap.length>0&&De.setValue(N,"directionalShadowMap",Yn.state.directionalShadowMap,H),Yn.state.spotShadowMap.length>0&&De.setValue(N,"spotShadowMap",Yn.state.spotShadowMap,H),Yn.state.pointShadowMap.length>0&&De.setValue(N,"pointShadowMap",Yn.state.pointShadowMap,H)),X.isSkinnedMesh){De.setOptional(N,X,"bindMatrix"),De.setOptional(N,X,"bindMatrixInverse");const an=X.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),De.setValue(N,"boneTexture",an.boneTexture,H))}X.isBatchedMesh&&(De.setOptional(N,X,"batchingTexture"),De.setValue(N,"batchingTexture",X._matricesTexture,H),De.setOptional(N,X,"batchingIdTexture"),De.setValue(N,"batchingIdTexture",X._indirectTexture,H),De.setOptional(N,X,"batchingColorTexture"),X._colorsTexture!==null&&De.setValue(N,"batchingColorTexture",X._colorsTexture,H));const ps=Y.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&wt.update(X,Y,di),(Hs||Ut.receiveShadow!==X.receiveShadow)&&(Ut.receiveShadow=X.receiveShadow,De.setValue(N,"receiveShadow",X.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(un.envMapIntensity.value=k.environmentIntensity),un.dfgLUT!==void 0&&(un.dfgLUT.value=B1()),Hs&&(De.setValue(N,"toneMappingExposure",w.toneMappingExposure),Ut.needsLights&&jm(un,ua),St&&q.fog===!0&&Bt.refreshFogUniforms(un,St),Bt.refreshMaterialUniforms(un,q,Wt,dt,b.state.transmissionRenderTarget[P.id]),Bo.upload(N,Jh(Ut),un,H)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Bo.upload(N,Jh(Ut),un,H),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&De.setValue(N,"center",X.center),De.setValue(N,"modelViewMatrix",X.modelViewMatrix),De.setValue(N,"normalMatrix",X.normalMatrix),De.setValue(N,"modelMatrix",X.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const an=q.uniformsGroups;for(let ms=0,fa=an.length;ms<fa;ms++){const tu=an[ms];bt.update(tu,di),bt.bind(tu,di)}}return di}function jm(P,k){P.ambientLightColor.needsUpdate=k,P.lightProbe.needsUpdate=k,P.directionalLights.needsUpdate=k,P.directionalLightShadows.needsUpdate=k,P.pointLights.needsUpdate=k,P.pointLightShadows.needsUpdate=k,P.spotLights.needsUpdate=k,P.spotLightShadows.needsUpdate=k,P.rectAreaLights.needsUpdate=k,P.hemisphereLights.needsUpdate=k}function Km(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(P,k,Y){const q=S.get(P);q.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),S.get(P.texture).__webglTexture=k,S.get(P.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Y,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,k){const Y=S.get(P);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0};const Jm=N.createFramebuffer();this.setRenderTarget=function(P,k=0,Y=0){U=P,C=k,L=Y;let q=null,X=!1,St=!1;if(P){const Et=S.get(P);if(Et.__useDefaultFramebuffer!==void 0){Lt.bindFramebuffer(N.FRAMEBUFFER,Et.__webglFramebuffer),W.copy(P.viewport),G.copy(P.scissor),et=P.scissorTest,Lt.viewport(W),Lt.scissor(G),Lt.setScissorTest(et),V=-1;return}else if(Et.__webglFramebuffer===void 0)H.setupRenderTarget(P);else if(Et.__hasExternalTextures)H.rebindTextures(P,S.get(P.texture).__webglTexture,S.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const te=P.depthTexture;if(Et.__boundDepthTexture!==te){if(te!==null&&S.has(te)&&(P.width!==te.image.width||P.height!==te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(P)}}const It=P.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(St=!0);const Nt=S.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Nt[k])?q=Nt[k][Y]:q=Nt[k],X=!0):P.samples>0&&H.useMultisampledRTT(P)===!1?q=S.get(P).__webglMultisampledFramebuffer:Array.isArray(Nt)?q=Nt[Y]:q=Nt,W.copy(P.viewport),G.copy(P.scissor),et=P.scissorTest}else W.copy(Q).multiplyScalar(Wt).floor(),G.copy(mt).multiplyScalar(Wt).floor(),et=Mt;if(Y!==0&&(q=Jm),Lt.bindFramebuffer(N.FRAMEBUFFER,q)&&Lt.drawBuffers(P,q),Lt.viewport(W),Lt.scissor(G),Lt.setScissorTest(et),X){const Et=S.get(P.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Et.__webglTexture,Y)}else if(St){const Et=k;for(let It=0;It<P.textures.length;It++){const Nt=S.get(P.textures[It]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+It,Nt.__webglTexture,Y,Et)}}else if(P!==null&&Y!==0){const Et=S.get(P.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Et.__webglTexture,Y)}V=-1},this.readRenderTargetPixels=function(P,k,Y,q,X,St,Tt,Et=0){if(!(P&&P.isWebGLRenderTarget)){me("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=S.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Tt!==void 0&&(It=It[Tt]),It){Lt.bindFramebuffer(N.FRAMEBUFFER,It);try{const Nt=P.textures[Et],te=Nt.format,de=Nt.type;if(P.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Et),!Le.textureFormatReadable(te)){me("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(de)){me("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=P.width-q&&Y>=0&&Y<=P.height-X&&N.readPixels(k,Y,q,X,xt.convert(te),xt.convert(de),St)}finally{const Nt=U!==null?S.get(U).__webglFramebuffer:null;Lt.bindFramebuffer(N.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(P,k,Y,q,X,St,Tt,Et=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=S.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Tt!==void 0&&(It=It[Tt]),It)if(k>=0&&k<=P.width-q&&Y>=0&&Y<=P.height-X){Lt.bindFramebuffer(N.FRAMEBUFFER,It);const Nt=P.textures[Et],te=Nt.format,de=Nt.type;if(P.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Et),!Le.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(de))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ot=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ot),N.bufferData(N.PIXEL_PACK_BUFFER,St.byteLength,N.STREAM_READ),N.readPixels(k,Y,q,X,xt.convert(te),xt.convert(de),0);const be=U!==null?S.get(U).__webglFramebuffer:null;Lt.bindFramebuffer(N.FRAMEBUFFER,be);const qe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ex(N,qe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ot),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,St),N.deleteBuffer(Ot),N.deleteSync(qe),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,k=null,Y=0){const q=Math.pow(2,-Y),X=Math.floor(P.image.width*q),St=Math.floor(P.image.height*q),Tt=k!==null?k.x:0,Et=k!==null?k.y:0;H.setTexture2D(P,0),N.copyTexSubImage2D(N.TEXTURE_2D,Y,0,0,Tt,Et,X,St),Lt.unbindTexture()};const Qm=N.createFramebuffer(),t0=N.createFramebuffer();this.copyTextureToTexture=function(P,k,Y=null,q=null,X=0,St=0){let Tt,Et,It,Nt,te,de,Ot,be,qe;const Ve=P.isCompressedTexture?P.mipmaps[St]:P.image;if(Y!==null)Tt=Y.max.x-Y.min.x,Et=Y.max.y-Y.min.y,It=Y.isBox3?Y.max.z-Y.min.z:1,Nt=Y.min.x,te=Y.min.y,de=Y.isBox3?Y.min.z:0;else{const un=Math.pow(2,-X);Tt=Math.floor(Ve.width*un),Et=Math.floor(Ve.height*un),P.isDataArrayTexture?It=Ve.depth:P.isData3DTexture?It=Math.floor(Ve.depth*un):It=1,Nt=0,te=0,de=0}q!==null?(Ot=q.x,be=q.y,qe=q.z):(Ot=0,be=0,qe=0);const Ae=xt.convert(k.format),Mn=xt.convert(k.type);let Ut;k.isData3DTexture?(H.setTexture3D(k,0),Ut=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(H.setTexture2DArray(k,0),Ut=N.TEXTURE_2D_ARRAY):(H.setTexture2D(k,0),Ut=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const Yn=N.getParameter(N.UNPACK_ROW_LENGTH),ge=N.getParameter(N.UNPACK_IMAGE_HEIGHT),di=N.getParameter(N.UNPACK_SKIP_PIXELS),Ti=N.getParameter(N.UNPACK_SKIP_ROWS),Hs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ve.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ve.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Nt),N.pixelStorei(N.UNPACK_SKIP_ROWS,te),N.pixelStorei(N.UNPACK_SKIP_IMAGES,de);const ua=P.isDataArrayTexture||P.isData3DTexture,De=k.isDataArrayTexture||k.isData3DTexture;if(P.isDepthTexture){const un=S.get(P),ps=S.get(k),an=S.get(un.__renderTarget),ms=S.get(ps.__renderTarget);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,an.__webglFramebuffer),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,ms.__webglFramebuffer);for(let fa=0;fa<It;fa++)ua&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(P).__webglTexture,X,de+fa),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,S.get(k).__webglTexture,St,qe+fa)),N.blitFramebuffer(Nt,te,Tt,Et,Ot,be,Tt,Et,N.DEPTH_BUFFER_BIT,N.NEAREST);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(X!==0||P.isRenderTargetTexture||S.has(P)){const un=S.get(P),ps=S.get(k);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,Qm),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,t0);for(let an=0;an<It;an++)ua?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,un.__webglTexture,X,de+an):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,un.__webglTexture,X),De?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ps.__webglTexture,St,qe+an):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ps.__webglTexture,St),X!==0?N.blitFramebuffer(Nt,te,Tt,Et,Ot,be,Tt,Et,N.COLOR_BUFFER_BIT,N.NEAREST):De?N.copyTexSubImage3D(Ut,St,Ot,be,qe+an,Nt,te,Tt,Et):N.copyTexSubImage2D(Ut,St,Ot,be,Nt,te,Tt,Et);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else De?P.isDataTexture||P.isData3DTexture?N.texSubImage3D(Ut,St,Ot,be,qe,Tt,Et,It,Ae,Mn,Ve.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(Ut,St,Ot,be,qe,Tt,Et,It,Ae,Ve.data):N.texSubImage3D(Ut,St,Ot,be,qe,Tt,Et,It,Ae,Mn,Ve):P.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,St,Ot,be,Tt,Et,Ae,Mn,Ve.data):P.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,St,Ot,be,Ve.width,Ve.height,Ae,Ve.data):N.texSubImage2D(N.TEXTURE_2D,St,Ot,be,Tt,Et,Ae,Mn,Ve);N.pixelStorei(N.UNPACK_ROW_LENGTH,Yn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ge),N.pixelStorei(N.UNPACK_SKIP_PIXELS,di),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ti),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Hs),St===0&&k.generateMipmaps&&N.generateMipmap(Ut),Lt.unbindTexture()},this.initRenderTarget=function(P){S.get(P).__webglFramebuffer===void 0&&H.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?H.setTextureCube(P,0):P.isData3DTexture?H.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?H.setTexture2DArray(P,0):H.setTexture2D(P,0),Lt.unbindTexture()},this.resetState=function(){C=0,L=0,U=null,Lt.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=_e._getDrawingBufferColorSpace(t),n.unpackColorSpace=_e._getUnpackColorSpace()}}const Df={type:"change"},Th={type:"start"},sm={type:"end"},Co=new Al,If=new Ri,H1=Math.cos(70*sx.DEG2RAD),Je=new F,Bn=2*Math.PI,Re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ec=1e-6;class G1 extends Xx{constructor(t,n=null){super(t,n),this.state=Re.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ds.ROTATE,MIDDLE:ds.DOLLY,RIGHT:ds.PAN},this.touches={ONE:Fa.ROTATE,TWO:Fa.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Ls,this._lastTargetPosition=new F,this._quat=new Ls().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rf,this._sphericalDelta=new rf,this._scale=1,this._panOffset=new F,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new F,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=V1.bind(this),this._onPointerDown=k1.bind(this),this._onPointerUp=W1.bind(this),this._onContextMenu=K1.bind(this),this._onMouseWheel=Y1.bind(this),this._onKeyDown=$1.bind(this),this._onTouchStart=Z1.bind(this),this._onTouchMove=j1.bind(this),this._onMouseDown=X1.bind(this),this._onMouseMove=q1.bind(this),this._interceptControlDown=J1.bind(this),this._interceptControlUp=Q1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Df),this.update(),this.state=Re.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;Je.copy(n).sub(this.target),Je.applyQuaternion(this._quat),this._spherical.setFromVector3(Je),this.autoRotate&&this.state===Re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Bn:i>Math.PI&&(i-=Bn),s<-Math.PI?s+=Bn:s>Math.PI&&(s-=Bn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Je.setFromSpherical(this._spherical),Je.applyQuaternion(this._quatInverse),n.copy(this.target).add(Je),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Je.length();r=this._clampDistance(o*this._scale);const c=o-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),a=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=c!==this.object.zoom;const h=new F(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),r=Je.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Co.origin.copy(this.object.position),Co.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Co.direction))<H1?this.object.lookAt(this.target):(If.setFromNormalAndCoplanarPoint(this.object.up,this.target),Co.intersectPlane(If,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Ec||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ec||this._lastTargetPosition.distanceToSquared(this.target)>Ec?(this.dispatchEvent(Df),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Bn/60*this.autoRotateSpeed*t:Bn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Je.setFromMatrixColumn(n,0),Je.multiplyScalar(-t),this._panOffset.add(Je)}_panUp(t,n){this.screenSpacePanning===!0?Je.setFromMatrixColumn(n,1):(Je.setFromMatrixColumn(n,0),Je.crossVectors(this.object.up,Je)),Je.multiplyScalar(t),this._panOffset.add(Je)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Je.copy(s).sub(this.target);let a=Je.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*n*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,a=n-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/n.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,s=t.pageY-n.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+n.x)*.5,o=(t.pageY+n.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Pt,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function k1(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function V1(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function W1(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sm),this.state=Re.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function X1(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ds.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=Re.DOLLY;break;case ds.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Re.ROTATE}break;case ds.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=Re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=Re.PAN}break;default:this.state=Re.NONE}this.state!==Re.NONE&&this.dispatchEvent(Th)}function q1(e){switch(this.state){case Re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Y1(e){this.enabled===!1||this.enableZoom===!1||this.state!==Re.NONE||(e.preventDefault(),this.dispatchEvent(Th),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(sm))}function $1(e){this.enabled!==!1&&this._handleKeyDown(e)}function Z1(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Fa.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Re.TOUCH_ROTATE;break;case Fa.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Re.TOUCH_PAN;break;default:this.state=Re.NONE}break;case 2:switch(this.touches.TWO){case Fa.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Re.TOUCH_DOLLY_PAN;break;case Fa.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Re.TOUCH_DOLLY_ROTATE;break;default:this.state=Re.NONE}break;default:this.state=Re.NONE}this.state!==Re.NONE&&this.dispatchEvent(Th)}function j1(e){switch(this._trackPointer(e),this.state){case Re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Re.NONE}}function K1(e){this.enabled!==!1&&e.preventDefault()}function J1(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Q1(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const zo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Kr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const tE=new Pl(-1,1,1,-1,0,1);class eE extends hn{constructor(){super(),this.setAttribute("position",new xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xe([0,2,0,0,2,0],2))}}const nE=new eE;class am{constructor(t){this._mesh=new T(nE,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,tE)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class iE extends Kr{constructor(t,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,t instanceof Pn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=nl.clone(t.uniforms),this.material=new Pn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new am(this.material)}render(t,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Lf extends Kr{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,i){const s=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class sE extends Kr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class aE{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const i=t.getSize(new Pt);this._width=i.width,this._height=i.height,n=new Xn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ni}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new iE(zo),this.copyPass.material.blending=Oi,this.timer=new Vx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let s=0,a=this.passes.length;s<a;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),r.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Lf!==void 0&&(r instanceof Lf?i=!0:r instanceof sE&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new Pt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class rE extends Kr{constructor(t,n,i=null,s=null,a=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ft}render(t,n,i){const s=t.autoClear;t.autoClear=!1;let a,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const oE={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ft(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ir extends Kr{constructor(t,n=1,i,s){super(),this.strength=n,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Pt(t.x,t.y):new Pt(256,256),this.clearColor=new Ft(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Xn(a,r,{type:ni}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const l=new Xn(a,r,{type:ni});l.texture.name="UnrealBloomPass.h"+d,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new Xn(a,r,{type:ni});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),a=Math.round(a/2),r=Math.round(r/2)}const o=oE;this.highPassUniforms=nl.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pn({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Pt(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=nl.clone(zo.uniforms),this.blendMaterial=new Pn({uniforms:this.copyUniforms,vertexShader:zo.vertexShader,fragmentShader:zo.fragmentShader,premultipliedAlpha:!0,blending:zc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ft,this._oldClearAlpha=1,this._basic=new Fn,this._fsQuad=new am(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,n){let i=Math.round(t/2),s=Math.round(n/2);this.renderTargetBright.setSize(i,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,s),this.renderTargetsVertical[a].setSize(i,s),this.separableBlurMaterials[a].uniforms.invSize.value=new Pt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,n,i,s,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=r}_getSeparableBlurMaterial(t){const n=[],i=t/3;for(let s=0;s<t;s++)n.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new Pn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Pt(.5,.5)},direction:{value:new Pt(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Pn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}ir.BlurDirectionX=new Pt(1,0);ir.BlurDirectionY=new Pt(0,1);let jn,xi,Kn,Oa,si;function Gt(e){const t=new Ft(e),n=t.clone().multiplyScalar(G0),i=new Zp({color:t.clone().multiplyScalar(H0),metalness:.7,roughness:.35,emissive:n,emissiveIntensity:1});return i.userData._origEmissive=n.clone(),i}function qt(e){return new Fn({color:e})}function _t(e,t=1){return new Fn({color:e,transparent:!0,opacity:t,side:Qn})}function lE(e){jn=new xx,jn.background=new Ft(zt.BG),jn.fog=new yh(zt.BG,18e-5),xi=new oi(_0,Hn/wn,g0,x0),xi.position.set(Hn/2,v0,wn+M0),xi.lookAt(Hn/2,0,wn/2),Kn=new z1({antialias:!0}),Kn.setPixelRatio(window.devicePixelRatio),Kn.toneMapping=dh,Kn.toneMappingExposure=1.1,Kn.setClearColor(new Ft(zt.BG)),e.appendChild(Kn.domElement);const t=e.clientWidth,n=e.clientHeight;Kn.setSize(t,n),xi.aspect=t/n,xi.updateProjectionMatrix(),si=new G1(xi,Kn.domElement),si.target.set(Hn/2,0,wn/2),si.minPolarAngle=y0,si.maxPolarAngle=S0,si.minDistance=E0,si.maxDistance=w0,si.enableDamping=!0,si.dampingFactor=T0,si.panSpeed=1.2,si.mouseButtons={LEFT:ds.ROTATE,MIDDLE:ds.PAN,RIGHT:ds.PAN};const i=new Hx(b0,A0);jn.add(i);const s=new _c(R0,C0);s.position.set(Hn*.7,500,-wn*.3),s.target.position.set(Hn/2,0,wn/2),jn.add(s),jn.add(s.target);const a=new _c(P0,D0);a.position.set(-Hn*.3,300,wn*1.2),jn.add(a);const r=new Ox(I0,L0,U0);jn.add(r);const o=new _c(N0,F0);o.position.set(-Hn*.5,400,wn*1.5),o.target.position.set(Hn/2,0,wn/2),jn.add(o),jn.add(o.target),Oa=new aE(Kn),Oa.addPass(new rE(jn,xi));const c=new ir(new Pt(t,n),O0,B0,z0);return Oa.addPass(c),window.addEventListener("resize",cE),{scene:jn,camera:xi,renderer:Kn,composer:Oa,controls:si}}function cE(){const e=Kn.domElement.parentElement;if(!e)return;const t=e.clientWidth,n=e.clientHeight;xi.aspect=t/n,xi.updateProjectionMatrix(),Kn.setSize(t,n),Oa.setSize(t,n)}function Be(){return jn}function bh(){return xi}function dE(){return Oa}function il(){return si}function hE(){return Kn}const Ah=Vt*je,Pi=new Float32Array(Ah),Or=new Int16Array(Ah),Ps=new Uint8Array(Ah),sl=new Map;let Rh=0,sr=0,Ld=!1;function uE(e,t){Ld=!0}function fE(e){e===void 0&&(e=1/60),sr=0,Rh+=e,Ld&&(sl.clear(),Ld=!1)}function rm(e){const t=sl.get(e);if(t){if(Rh-t.time>p_){sl.delete(e);return}return t.path}}function al(e,t){t&&sl.set(e,{path:t,time:Rh})}function om(){return sr>=m_}function rl(e,t,n,i){const s=Math.abs(e-n),a=Math.abs(t-i);return Math.max(s,a)+(Math.SQRT2-1)*Math.min(s,a)}const lm=[{dc:0,dr:-1,cost:1},{dc:0,dr:1,cost:1},{dc:-1,dr:0,cost:1},{dc:1,dr:0,cost:1},{dc:-1,dr:-1,cost:Math.SQRT2},{dc:1,dr:-1,cost:Math.SQRT2},{dc:-1,dr:1,cost:Math.SQRT2},{dc:1,dr:1,cost:Math.SQRT2}];function cm(e,t){return[{col:e,row:t-1},{col:e,row:t+1},{col:e-1,row:t},{col:e+1,row:t}].filter(n=>n.col>=0&&n.col<Vt&&n.row>=0&&n.row<je)}function dm(e){const t=[];let n=e;for(;n!==-1;){const i=n%Vt,s=(n-i)/Vt;t.push({col:i,row:s}),n=Or[n]}return t.reverse(),t}function pE(e,t,n,i,s){let a=Math.abs(n-e),r=Math.abs(i-t);const o=e<n?1:-1,c=t<i?1:-1;let h=a-r,d=e,l=t;for(;;){if(!s(d,l))return!1;if(d===n&&l===i)break;const u=2*h;let f=!1,_=!1;if(u>-r&&(h-=r,d+=o,f=!0),u<a&&(h+=a,l+=c,_=!0),f&&_&&(!s(d-o,l)||!s(d,l-c)))return!1}return!0}function mE(e,t){if(e<0||e>=Vt||t<0||t>=je)return!1;const n=ze(e,t);return n===Ke||n===Vn}function Uf(e){if(!e||e.length<=2)return e;const t=[e[0]];let n=0;for(;n<e.length-1;){let i=n+1;for(let s=e.length-1;s>n+1;s--)if(pE(e[n].col,e[n].row,e[s].col,e[s].row,mE)){i=s;break}t.push(e[i]),n=i}return t}function Ho(e,t,n,i){if(e<0||e>=Vt||t<0||t>=je||n<0||n>=Vt||i<0||i>=je)return null;const s=`${e},${t},${n},${i}`,a=rm(s);if(a!==void 0)return a;if(om())return null;const r=ze(n,i);if(r!==Ke&&r!==Vn){const h=cm(n,i);let d=null;for(const u of h){const f=ze(u.col,u.row);if(f===Ke||f===Vn){sr++;const _=Nf(e,t,u.col,u.row);_&&(!d||_.length<d.length)&&(d=_)}}const l=d&&Uf(d);return al(s,l),l}sr++;const o=Nf(e,t,n,i),c=o&&Uf(o);return al(s,c),c}function Nf(e,t,n,i){const s=t*Vt+e,a=i*Vt+n;if(s===a)return[{col:e,row:t}];Pi.fill(1/0),Or.fill(-1),Ps.fill(0),Pi[s]=0;const r=hm();for(r.push(s,rl(e,t,n,i));r.size()>0;){const o=r.pop();if(Ps[o])continue;if(o===a)return ol(r),dm(o);Ps[o]=1;const c=o%Vt,h=(o-c)/Vt;for(let d=0;d<8;d++){const l=lm[d],u=c+l.dc,f=h+l.dr;if(u<0||u>=Vt||f<0||f>=je)continue;const _=ze(u,f);if(_!==Ke&&_!==Vn)continue;if(l.cost>1){const m=ze(c+l.dc,h),x=ze(c,h+l.dr);if(m!==Ke&&m!==Vn||x!==Ke&&x!==Vn)continue}const g=f*Vt+u;if(Ps[g])continue;const p=Pi[o]+l.cost;if(p<Pi[g]){Or[g]=o,Pi[g]=p;const m=p+rl(u,f,n,i);r.push(g,m)}}}return ol(r),null}function _E(e,t,n,i,s){if(e<0||e>=Vt||t<0||t>=je||n<0||n>=Vt||i<0||i>=je)return null;const a=`tw${e},${t},${n},${i}`,r=rm(a);if(r!==void 0)return r;if(om())return null;const o=ze(n,i);if(!(o===Ke||o===Vn||o===kn)){const d=cm(n,i);let l=null;for(const u of d){const f=ze(u.col,u.row);if(f===Ke||f===Vn||f===kn){sr++;const _=Ff(e,t,u.col,u.row,s);_&&(!l||_.length<l.length)&&(l=_)}}return al(a,l),l}sr++;const h=Ff(e,t,n,i,s);return al(a,h),h}function Ff(e,t,n,i,s){const a=t*Vt+e,r=i*Vt+n;if(a===r)return[{col:e,row:t}];Pi.fill(1/0),Or.fill(-1),Ps.fill(0),Pi[a]=0;const o=hm();for(o.push(a,rl(e,t,n,i));o.size()>0;){const c=o.pop();if(Ps[c])continue;if(c===r)return ol(o),dm(c);Ps[c]=1;const h=c%Vt,d=(c-h)/Vt;for(let l=0;l<8;l++){const u=lm[l],f=h+u.dc,_=d+u.dr;if(f<0||f>=Vt||_<0||_>=je)continue;const g=ze(f,_);if(g!==Ke&&g!==Vn&&g!==kn)continue;if(u.cost>1){const M=ze(h+u.dc,d),y=ze(h,d+u.dr);if(!(M===Ke||M===Vn||M===kn)||!(y===Ke||y===Vn||y===kn))continue}const p=_*Vt+f;if(Ps[p])continue;let m=u.cost;g===kn&&(m+=s?s(f,_):B_);const x=Pi[c]+m;if(x<Pi[p]){Or[p]=c,Pi[p]=x;const M=x+rl(f,_,n,i);o.push(p,M)}}}return ol(o),null}class gE{constructor(){this._data=[]}size(){return this._data.length}reset(){this._data.length=0}push(t,n){this._data.push({key:t,f:n}),this._bubbleUp(this._data.length-1)}pop(){const t=this._data[0],n=this._data.pop();return this._data.length>0&&(this._data[0]=n,this._sinkDown(0)),t.key}_bubbleUp(t){for(;t>0;){const n=t-1>>1;if(this._data[t].f<this._data[n].f)[this._data[t],this._data[n]]=[this._data[n],this._data[t]],t=n;else break}}_sinkDown(t){const n=this._data.length;for(;;){let i=t;const s=2*t+1,a=2*t+2;if(s<n&&this._data[s].f<this._data[i].f&&(i=s),a<n&&this._data[a].f<this._data[i].f&&(i=a),i!==t)[this._data[t],this._data[i]]=[this._data[i],this._data[t]],t=i;else break}}}const Ud=[];function hm(){return Ud.length>0?Ud.pop():new gE}function ol(e){e.reset(),Ud.push(e)}let Xi=[],Nd=null;function xE(e){Nd=e}let Fd=[];function vE(){const e=Math.random();let t=0;for(const n of lu)if(t+=n.weight,e<t)return n;return lu[0]}function ME(e){const t=vE();let n=t.cellsW,i=t.cellsD;n!==i&&Math.random()<.5&&(n=t.cellsD,i=t.cellsW);for(let s=0;s<V0;s++){const a=Gl+Math.floor(Math.random()*(ou-Gl-n+2)),r=Hl+Math.floor(Math.random()*(ru-Hl-i+2));let o=!0;for(let d=0;d<n&&o;d++)for(let l=0;l<i&&o;l++){const u=a+d,f=r+l;(u<Gl||u>ou||f<Hl||f>ru||Xi[f][u]!==Ke||Math.abs(u-As)<=io&&Math.abs(f-Ii)<=io||Math.abs(u-li)<=io&&Math.abs(f-bn)<=io)&&(o=!1)}if(!o)continue;for(let d=0;d<n;d++)for(let l=0;l<i;l++)Xi[r+l][a+d]=Mi;const c=t.heightMin+Math.random()*(t.heightMax-t.heightMin),h=du[Math.floor(Math.random()*du.length)];return{id:`obs-${e}`,kind:t.kind,col:a,row:r,cellsW:n,cellsD:i,height:c,color:h,aabb:{min:{x:a*Z,y:0,z:r*Z},max:{x:(a+n)*Z,y:c,z:(r+i)*Z}}}}return null}function yE(e){for(let t=0;t<e.cellsW;t++)for(let n=0;n<e.cellsD;n++)Xi[e.row+n][e.col+t]=Ke}function SE(){Xi=[];for(let n=0;n<je;n++)Xi[n]=new Array(Vt).fill(Ke);Fd=[];const e=hu+Math.floor(Math.random()*(k0-hu+1));let t=0;for(let n=0;n<e;n++){const i=ME(t);if(!i)continue;Ho(Math.floor(Vt/2),Ii,Math.floor(Vt/2),bn)?(Fd.push(i),t++):yE(i)}}function ze(e,t){return e<0||e>=Vt||t<0||t>=je?Mi:Xi[t][e]}function um(e,t,n){e<0||e>=Vt||t<0||t>=je||Xi[t][e]!==n&&(Xi[t][e]=n,uE())}function ll(e,t,n,i){let s=!1;for(let a=t;a<t+n;a++)for(let r=e;r<e+n;r++){if(r<0||r>=Vt||a<0||a>=je||!EE(a,i)||Xi[a][r]!==Ke)return!1;a>=Xa&&a<=Fi&&(s=!0)}return!(s&&Nd&&!Nd(e,t,n,i))}function EE(e,t){return t===tt&&e>=lp&&e<=e0||t===kt&&e>=$o&&e<=yl||e>=Xa&&e<=Fi}function wE(){const e=[];for(let t=0;t<je;t++)for(let n=0;n<Vt;n++)Xi[t][n]===Mi&&e.push({col:n,row:t});return e}function TE(){return Fd}function bE(e){let t=0,n=0;for(const i of e)i.alive&&i.row>=Xa&&i.row<=Fi&&(i.team===tt?t++:i.team===kt&&n++);return{player:t,enemy:n}}let Ys=null,ri=null,cl=null,Pa=null,es=[],Br=null;const ue=new z(1,1,1),qn=new ct(.5,12,8),vn=new ht(.5,.5,1,16),Us=new Qt(.5,.06,8,24),fm=new tr(.5,0),AE=new Cl(.5,0);new Wi(1,1);let Od=0;function RE(e,t,n,i,s,a,r){const o=Math.min(n,i)*.22,c=new T(vn.clone(),s);c.scale.set(o*2.8,3,o*2.8),c.position.y=1.5,e.add(c);const h=t*.45,d=new T(vn.clone(),s);d.scale.set(o*2,1.5,o*2),d.position.y=h,e.add(d);const l=new T(vn.clone(),s);l.scale.set(o*1.2,t*.85,o*1.2),l.position.y=t*.45,e.add(l);const u=4;for(let g=1;g<=u;g++){const p=t*.1+t*.75*(g/(u+1)),m=new T(Us.clone(),a);m.scale.set(o*1.6,o*1.6,o*1.6),m.rotation.x=Math.PI/2,m.position.y=p,e.add(m)}const f=new T(qn.clone(),a);f.scale.set(o*2.2,o*2.2,o*2.2),f.position.y=t,e.add(f);const _=new T(qn.clone(),r);_.scale.set(o*3.5,o*3.5,o*3.5),_.position.y=t,e.add(_);for(let g=0;g<4;g++){const p=Math.PI*2/4*g,m=new T(ue.clone(),a);m.scale.set(o*.3,o*.2,o*2.5),m.position.set(Math.cos(p)*o*1.8,t+o*.5,Math.sin(p)*o*1.8),m.rotation.y=p,e.add(m)}}function CE(e,t,n,i,s,a,r){const o=Math.min(n,i)*.3,c=new T(vn.clone(),s);c.scale.set(o*2,t,o*2),c.position.y=t/2,e.add(c);const h=new T(vn.clone(),s);h.scale.set(o*2.3,1.5,o*2.3),h.position.y=t+.75,e.add(h);const d=new T(vn.clone(),s);d.scale.set(o*2.3,1.5,o*2.3),d.position.y=.75,e.add(d);const l=3;for(let _=0;_<l;_++){const g=t*.2+t*.6*(_/(l-1)),p=new T(Us.clone(),a);p.scale.set(o*2.4,o*2.4,o*2.4),p.rotation.x=Math.PI/2,p.position.y=g,e.add(p)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,p=new T(ue.clone(),s);p.scale.set(o*.4,t*.3,2),p.position.set(Math.cos(g)*o*1.1,t*.5,Math.sin(g)*o*1.1),p.rotation.y=g,e.add(p)}const u=new T(qn.clone(),a);u.scale.set(o*.7,o*.7,o*.7),u.position.set(o*1.1,t*.7,0),e.add(u);const f=new T(qn.clone(),r);f.scale.set(o*1.2,o*1.2,o*1.2),f.position.set(o*1.1,t*.7,0),e.add(f)}function Of(e,t,n,i,s,a,r){const o=n*.55,c=i*.55,h=new T(ue.clone(),s);h.scale.set(o*1.15,2.5,c*1.15),h.position.y=1.25,e.add(h);const d=new T(ue.clone(),s);d.scale.set(o,t,c),d.position.y=2.5+t/2,e.add(d);for(let g=0;g<5;g++){const p=4+(t-4)*(g/5),m=new T(ue.clone(),a);m.scale.set(o*.85,.4,.4),m.position.set(0,p,c/2+.3),e.add(m)}for(let g=0;g<3;g++){const p=-o*.3+o*.3*g,m=new T(ue.clone(),a);m.scale.set(.4,t*.5,.4),m.position.set(p,t*.5+2.5,c/2+.3),e.add(m)}const l=new T(ue.clone(),a);l.scale.set(o*.6,.4,.4),l.rotation.z=Math.PI/5,l.position.set(o*.15,t*.65+2.5,-c/2-.3),e.add(l);for(let g=-1;g<=1;g+=2){const p=new T(vn.clone(),a);p.scale.set(2,1.5,2),p.rotation.z=Math.PI/2,p.position.set(g*(o/2+.8),t*.4+2.5,0),e.add(p)}const u=new T(fm.clone(),a),f=Math.min(o,c)*.35;u.scale.set(f,f,f),u.position.y=t+3.5+f/2,e.add(u);const _=new T(qn.clone(),r);_.scale.set(f*2,f*2,f*2),_.position.y=t+3.5+f/2,e.add(_)}function PE(e,t,n,i,s,a,r){const o=Math.max(n,i),c=Math.min(n,i),h=n>=i,d=new T(ue.clone(),s);d.scale.set(n*.9,2,i*.9),d.position.y=1,e.add(d);const l=c*.25,u=o*.25;for(const p of[-1,1]){const m=h?p*u:0,x=h?0:p*u,M=new T(vn.clone(),s);M.scale.set(l*2,t,l*2),M.position.set(m,2+t/2,x),e.add(M);const y=new T(Us.clone(),r);y.scale.set(l*2.5,l*2.5,l*2.5),y.rotation.x=Math.PI/2,y.position.set(m,2+t*.6,x),e.add(y)}const f=new T(ue.clone(),a);h?f.scale.set(u*2,1.5,2):f.scale.set(2,1.5,u*2),f.position.y=2+t*.75,e.add(f);const _=new T(ue.clone(),a);h?_.scale.set(u*2,1.5,2):_.scale.set(2,1.5,u*2),_.position.y=2+t*.35,e.add(_);const g=4;for(let p=0;p<g;p++){const m=-.5+(p+.5)/g,x=new T(ue.clone(),s);h?(x.scale.set(2,t*.5,c*.05),x.position.set(m*o*.8,2+t*.3,c*.45)):(x.scale.set(c*.05,t*.5,2),x.position.set(c*.45,2+t*.3,m*o*.8)),e.add(x)}for(const p of[-1,1]){const m=new T(qn.clone(),a);m.scale.set(3,3,3);const x=h?p*u:0,M=h?0:p*u;m.position.set(x,2+t+2,M),e.add(m)}}function DE(e,t,n,i,s,a,r){const o=Math.min(n,i)*.15,c=new T(vn.clone(),s);c.scale.set(o*6,3,o*6),c.position.y=1.5,e.add(c);const h=new T(vn.clone(),s);h.scale.set(o*1.5,t,o*1.5),h.position.y=3+t/2,e.add(h);const d=[.3,.55,.8];for(const _ of d){const g=3+t*_,p=o*(5-_*2),m=new T(ue.clone(),a);m.scale.set(p*2,1.2,1.2),m.position.y=g,e.add(m);const x=new T(ue.clone(),a);x.scale.set(1.2,1.2,p*2),x.position.y=g,e.add(x)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,p=new T(ue.clone(),s),m=Math.sqrt(t*t+o*4*(o*4));p.scale.set(.3,m,.3),p.position.set(Math.cos(g)*o*2,3+t/2,Math.sin(g)*o*2),p.rotation.z=Math.atan2(o*4,t)*(_<2?1:-1),p.rotation.y=g,e.add(p)}for(let _=0;_<2;_++){const g=new T(ue.clone(),s);g.scale.set(.5,t*.12,.5),g.position.set((_-.5)*o*2,3+t+t*.06,0),e.add(g)}const l=new T(fm.clone(),a);l.scale.set(o*2,o*2,o*2),l.position.y=3+t*.9,e.add(l);const u=new T(qn.clone(),a);u.scale.set(o*3.5,o*3.5,o*3.5),u.position.y=3+t+t*.05,e.add(u);const f=new T(qn.clone(),r);f.scale.set(o*6,o*6,o*6),f.position.y=3+t+t*.05,e.add(f)}function IE(e,t,n,i,s,a,r){const o=n*.55,c=i*.55,h=4,d=t/h;let l=0;for(let m=0;m<h;m++){const x=1-m*.15,M=o*x,y=c*x,b=new T(ue.clone(),s);if(b.scale.set(M,d*.85,y),b.position.y=l+d*.425,e.add(b),m>0){const E=new T(ue.clone(),a);E.scale.set(M*1.05,.6,y*1.05),E.position.y=l,e.add(E)}if(m<h-1)for(let E=-1;E<=1;E+=2)for(let A=-1;A<=1;A+=2){const v=new T(ue.clone(),a);v.scale.set(.6,d*.7,.6),v.position.set(E*M*.5,l+d*.4,A*y*.5),e.add(v)}l+=d}const u=new T(Us.clone(),r),f=Math.min(o,c)*.8;u.scale.set(f,f,f),u.rotation.x=Math.PI/2,u.position.y=t*.82,e.add(u);const _=Math.min(o,c)*.28,g=new T(AE.clone(),a);g.scale.set(_,_,_),g.position.y=t+_+2,e.add(g);const p=new T(qn.clone(),r);p.scale.set(_*2,_*2,_*2),p.position.y=t+_+2,e.add(p)}function LE(e,t,n,i,s,a,r){const o=Math.max(n,i),c=Math.min(n,i),h=n>=i,d=Math.min(t*.4,c*.2),l=o*.35,u=t*.55;for(const p of[-1,1]){const m=h?p*l:0,x=h?0:p*l,M=new T(ue.clone(),s);M.scale.set(c*.2,u,c*.2),M.position.set(m,u/2,x),e.add(M);const y=new T(ue.clone(),a);y.scale.set(.8,u*.8,.8),y.rotation.z=p*.4,y.position.set(m*.5,u*.4,x*.5),e.add(y)}const f=new T(vn.clone(),s),_=l*2;h?(f.scale.set(d*2,_,d*2),f.rotation.z=Math.PI/2):(f.scale.set(d*2,_,d*2),f.rotation.x=Math.PI/2),f.position.y=u,e.add(f);for(const p of[-1,1]){const m=h?p*l*.8:0,x=h?0:p*l*.8,M=new T(Us.clone(),a);M.scale.set(d*3,d*3,d*3),h&&(M.rotation.y=Math.PI/2),M.position.set(m,u,x),e.add(M)}const g=new T(Us.clone(),a);g.scale.set(d*2.5,d*2.5,d*2.5),g.position.y=u,e.add(g);for(const p of[-1,1]){const m=h?p*l:0,x=h?0:p*l,M=new T(qn.clone(),r);M.scale.set(d*2.5,d*2.5,d*2.5),M.position.set(m,u,x),e.add(M)}for(const p of[-1,1]){const m=h?p*l*.95:0,x=h?0:p*l*.95,M=new T(vn.clone(),s);M.scale.set(d*2.8,1.5,d*2.8),M.position.set(m,u,x),e.add(M)}}function UE(e,t,n,i,s,a,r){const o=Math.min(n,i),c=o*.32,h=o*.05,d=new T(vn.clone(),s);d.scale.set(o*.7,3,o*.7),d.position.y=1.5,e.add(d);for(let p=-1;p<=1;p+=2)for(let m=-1;m<=1;m+=2){const x=new T(ue.clone(),s);x.scale.set(h*2,t,h*2),x.position.set(p*c,3+t/2,m*c),e.add(x)}const l=5;for(let p=0;p<l;p++){const m=3+t*(p+1)/(l+1);for(const x of[-1,1]){const M=new T(ue.clone(),s);M.scale.set(c*2,1,1),M.position.set(0,m,x*c),e.add(M)}for(const x of[-1,1]){const M=new T(ue.clone(),s);M.scale.set(1,1,c*2),M.position.set(x*c,m,0),e.add(M)}if(p%2===0){const x=new T(ue.clone(),a);x.scale.set(.6,t/(l+1)*1.3,.6),x.rotation.z=.4,x.position.set(0,m,c),e.add(x);const M=new T(ue.clone(),a);M.scale.set(.6,t/(l+1)*1.3,.6),M.rotation.z=-.4,M.position.set(0,m,-c),e.add(M)}}const u=3+t*.85;for(let p=0;p<4;p++){const m=Math.PI*2/4*p+Math.PI/4,x=o*.35,M=new T(ue.clone(),a);M.scale.set(x,1.2,1.2),M.position.set(Math.cos(m)*x*.5,u,Math.sin(m)*x*.5),M.rotation.y=m,e.add(M);const y=new T(vn.clone(),s);y.scale.set(1.5,4,1.5),y.position.set(Math.cos(m)*x*.8,u-3,Math.sin(m)*x*.8),e.add(y)}const f=o*.12,_=new T(qn.clone(),a);_.scale.set(f*2,f*2,f*2),_.position.y=3+t+f,e.add(_);const g=new T(qn.clone(),r);g.scale.set(f*4,f*4,f*4),g.position.y=3+t+f,e.add(g)}function NE(e,t,n,i,s,a,r){const o=Math.min(n,i)*.28,c=3,h=t/c,d=new T(vn.clone(),s);d.scale.set(o*2.8,2,o*2.8),d.position.y=1,e.add(d);for(let _=0;_<c;_++){const g=2+_*h,p=new T(vn.clone(),s);p.scale.set(o*2,h*.75,o*2),p.position.y=g+h*.375,e.add(p);for(let m=0;m<6;m++){const x=Math.PI*2/6*m,M=new T(ue.clone(),a);M.scale.set(o*.8,h*.5,1),M.position.set(Math.cos(x)*o*1.3,g+h*.4,Math.sin(x)*o*1.3),M.rotation.y=x,e.add(M)}if(_<c-1){const m=new T(Us.clone(),r);m.scale.set(o*2.6,o*2.6,o*2.6),m.rotation.x=Math.PI/2,m.position.y=g+h,e.add(m)}}const l=new T(vn.clone(),a);l.scale.set(o*.6,4,o*.6),l.position.y=2+t+2,e.add(l);const u=new T(qn.clone(),a);u.scale.set(o*.8,o*.8,o*.8),u.position.y=2+t+4.5,e.add(u);const f=new T(qn.clone(),r);f.scale.set(o*1.5,o*1.5,o*1.5),f.position.y=2+t+4.5,e.add(f)}function FE(e,t,n,i,s,a,r){const o=Math.max(n,i),c=Math.min(n,i),h=n>=i,d=2,l=o*.4,u=c*.3;for(const p of[-1,1])for(const m of[-1,1]){const x=h?p*l:m*u,M=h?m*u:p*l,y=new T(ue.clone(),s);y.scale.set(d,t,d),y.position.set(x,t/2,M),e.add(y);const b=new T(Us.clone(),r);b.scale.set(d*2,d*2,d*2),b.rotation.x=Math.PI/2,b.position.set(x,t,M),e.add(b)}const f=new T(ue.clone(),s);h?f.scale.set(l*2+d,2,c*.15):f.scale.set(c*.15,2,l*2+d),f.position.y=t+1,e.add(f);const _=new T(ue.clone(),s);h?(_.scale.set(l*2+d,2,c*.15),_.position.set(0,t+1,u*.6),f.position.set(0,t+1,-u*.6)):(_.scale.set(c*.15,2,l*2+d),_.position.set(u*.6,t+1,0),f.position.set(-u*.6,t+1,0)),e.add(_);const g=3;for(let p=0;p<g;p++){const m=-1+2*p/(g-1),x=new T(ue.clone(),a);h?(x.scale.set(l*1.8,1.2,1.2),x.position.set(0,t-1,m*u*.5)):(x.scale.set(1.2,1.2,l*1.8),x.position.set(m*u*.5,t-1,0)),e.add(x)}for(const p of[-1,0,1]){const m=new T(ue.clone(),a);m.scale.set(2.5,2.5,2.5),h?m.position.set(p*l*.6,t-2,0):m.position.set(0,t-2,p*l*.6),e.add(m)}for(const p of[-1,1]){const m=new T(ue.clone(),s);m.scale.set(h?l*1.6:.6,.6,h?.6:l*1.6),m.rotation.z=p*.35,m.position.set(0,t*.5,h?p*u:0),h||(m.position.x=p*u),e.add(m)}for(let p=0;p<2;p++){const m=new T(ue.clone(),a);m.scale.set(h?l*1.5:.4,.4,h?.4:l*1.5);const x=t*.7+p*2;h?m.position.set(0,x,(p-.5)*u*.8):m.position.set((p-.5)*u*.8,x,0),e.add(m)}}function OE(e,t,n,i,s){const a=new fe;a.name="obstacle";const r=cu[Od%cu.length];Od++;const o=Gt(n),c=new Ft(n).multiplyScalar(.2);o.emissive=c.clone(),o.emissiveIntensity=1,o.userData._origEmissive=c.clone();const h=qt(r),d=_t(r,.12);switch(e){case"tesla_coil":RE(a,t,i,s,o,h,d);break;case"power_cell":CE(a,t,i,s,o,h,d);break;case"circuit_monolith":Of(a,t,i,s,o,h,d);break;case"capacitor_bank":PE(a,t,i,s,o,h,d);break;case"relay_tower":DE(a,t,i,s,o,h,d);break;case"data_obelisk":IE(a,t,i,s,o,h,d);break;case"plasma_conduit":LE(a,t,i,s,o,h,d);break;case"power_pylon":UE(a,t,i,s,o,h,d);break;case"transformer_stack":NE(a,t,i,s,o,h,d);break;case"cable_rack":FE(a,t,i,s,o,h,d);break;default:Of(a,t,i,s,o,h,d)}return a}function BE(e){Br=e,pm(),Ys&&e.remove(Ys),Pa&&e.remove(Pa),Ys=new fe,Ys.name="grid";const t=new Wi(Hn+200,wn+200),n=new Zp({color:657962,metalness:0,roughness:.95,emissive:789544,emissiveIntensity:.7}),i=new T(t,n);i.rotation.x=-Math.PI/2,i.position.set(Hn/2,-.5,wn/2),Ys.add(i);const s=[];for(let d=0;d<=Vt;d++){const l=d*Z;s.push(l,.1,0),s.push(l,.1,wn)}for(let d=0;d<=je;d++){const l=d*Z;s.push(0,.1,l),s.push(Hn,.1,l)}const a=new hn;a.setAttribute("position",new xe(s,3));const r=new Xp({color:2763376,transparent:!0,opacity:.8}),o=new Cx(a,r);Ys.add(o),e.add(Ys),Pa=new fe,Pa.name="obstacles",Od=0;const c=TE();for(const d of c){const l=d.cellsW*Z,u=d.cellsD*Z,f=OE(d.kind,d.height,d.color,l,u),_=(d.aabb.min.x+d.aabb.max.x)/2,g=(d.aabb.min.z+d.aabb.max.z)/2;f.position.set(_,0,g),f.userData.idOffset=Math.random()*Math.PI*2,Pa.add(f)}e.add(Pa),cl=_t(zt.BUILD_VALID,.3);const h=new Wi(Z,Z);ri=new T(h,cl),ri.rotation.x=-Math.PI/2,ri.position.y=.5,ri.visible=!1,e.add(ri)}function zE(e,t,n){if(!ri)return;if(n&&n.length>0){ri.visible=!1;const s=.2+.15*Math.sin(e*4);for(;es.length<n.length;){const a=new Wi(Z,Z),r=new Fn({transparent:!0,depthWrite:!1,side:Qn,opacity:.3}),o=new T(a,r);o.rotation.x=-Math.PI/2,o.visible=!1,Br&&Br.add(o),es.push(o)}for(let a=0;a<n.length;a++){const r=n[a],o=es[a],c=ll(r.col,r.row,1,tt);o.position.set(r.col*Z+Z/2,.5,r.row*Z+Z/2),o.material.color.setHex(c?zt.BUILD_VALID:zt.BUILD_INVALID),o.material.opacity=s,o.visible=!0}for(let a=n.length;a<es.length;a++)es[a].visible=!1;return}for(let s=0;s<es.length;s++)es[s].visible=!1;if(t&&t.col!==void 0&&t.row!==void 0){const s=t.size||1,a=ll(t.col,t.row,s,tt);ri.geometry.dispose(),ri.geometry=new Wi(Z*s,Z*s),ri.position.set(t.col*Z+Z*s/2,.5,t.row*Z+Z*s/2);const r=a?zt.BUILD_VALID:zt.BUILD_INVALID;cl.color.setHex(r),cl.opacity=.2+.15*Math.sin(e*4),ri.visible=!0}else ri.visible=!1}function pm(){for(const e of es)e.geometry.dispose(),e.material.dispose(),Br&&Br.remove(e);es=[]}function He(e){return new Ft(Math.min(1,e.r+.3),Math.min(1,e.g+.3),Math.min(1,e.b+.3))}function ci(e){return e instanceof Ft?e:Array.isArray(e)?new Ft(e[0]/255,e[1]/255,e[2]/255):new Ft(e)}function zr(e,t){const n=e.team===tt?zt.PLAYER:zt.ENEMY,i=new fe;switch(e.type){case Rn:kE(i,n);break;case Ce:VE(i,e);break;case Me:qE(i,e);break;case ye:JE(i,e);break;case oe:sw(i,e);break;case tn:ow(i,e);break;case ie:dw(i,e);break}i.position.set(e.x,0,e.z),i.userData.baseY=0,i.userData.idOffset=e.idOffset,t.add(i),e.mesh=i}function Ch(e,t){Jr(e,t),zr(e,t)}function HE(e){if(!e.mesh)return{x:e.x,y:20,z:e.z};const t=e.mesh.userData.model||e.mesh;if(t.userData.muzzleFlash){const n=new F;return t.userData.muzzleFlash.getWorldPosition(n),{x:n.x,y:n.y,z:n.z}}return{x:e.x,y:20,z:e.z}}const it=new z(1,1,1),ke=new ht(.5,.5,1,16),GE=new ht(.35,.5,1,12),re=new ct(.5,14,10),gn=new Qt(.5,.06,8,28),hr=new tr(.5,0),Ll=new Cl(.5,0),mm=new Qa(.5,1,8),qi=new Wi(1,1),_m=new ht(.5,.5,1,6);function kE(e,t){const n=ci(t),i=Gt(n),s=qt(He(n)),a=_t(n,.15),r=[],o=[],c=new T(it.clone(),i);c.scale.set(110,8,110),c.position.y=4,e.add(c);const h=new T(it.clone(),s);h.scale.set(112,1.5,112),h.position.y=8.5,e.add(h),r.push(h);const d=new T(it.clone(),i);d.scale.set(85,16,85),d.position.y=17,e.add(d);const l=new T(it.clone(),s);l.scale.set(87,1.2,87),l.position.y=25.5,e.add(l),r.push(l);const u=new T(it.clone(),i);u.scale.set(60,12,60),u.position.y=32,e.add(u);for(let b=0;b<4;b++){const E=Math.PI/4+Math.PI/2*b,A=Math.cos(E)*46,v=Math.sin(E)*46,w=new T(GE.clone(),i);w.scale.set(10,36,10),w.position.set(A,18,v),e.add(w);const D=new T(gn.clone(),s);D.scale.set(12,12,12),D.rotation.x=Math.PI/2,D.position.set(A,30,v),e.add(D),r.push(D);const C=new T(mm.clone(),s);C.scale.set(5,14,5),C.position.set(A,44,v),e.add(C),r.push(C)}for(let b=0;b<6;b++){const E=Math.PI*2/6*b,A=new T(it.clone(),i);A.scale.set(2,28,2),A.position.set(Math.cos(E)*18,27,Math.sin(E)*18),e.add(A)}for(const b of[18,30,42]){const E=new T(gn.clone(),i);E.scale.set(38,38,38),E.rotation.x=Math.PI/2,E.position.y=b,e.add(E)}const f=new T(re.clone(),s);f.scale.set(20,20,20),f.position.y=32,e.add(f),r.push(f);const _=new T(re.clone(),a);_.scale.set(30,30,30),_.position.y=32,e.add(_),o.push(_);const g=new T(gn.clone(),s);g.scale.set(50,50,50),g.rotation.x=Math.PI/3,g.rotation.z=Math.PI/6,g.position.y=38,e.add(g),r.push(g);const p=new T(gn.clone(),s);p.scale.set(50,50,50),p.rotation.x=-Math.PI/4,p.rotation.z=-Math.PI/5,p.position.y=38,e.add(p),r.push(p);for(let b=0;b<8;b++){const E=Math.PI*2/8*b,A=Math.cos(E)*44,v=Math.sin(E)*44,w=new T(it.clone(),i);w.scale.set(6,14,2.5),w.position.set(A,17,v),w.rotation.y=-E,e.add(w)}for(let b=-1;b<=1;b+=2){const E=new T(it.clone(),s);E.scale.set(58,1,1.2),E.position.set(0,38.5,b*22),e.add(E),r.push(E);const A=new T(it.clone(),s);A.scale.set(1.2,1,44),A.position.set(b*22,38.5,0),e.add(A),r.push(A)}const m=new T(ke.clone(),i);m.scale.set(3,16,3),m.position.y=50,e.add(m);const x=new T(hr.clone(),s);x.scale.set(6,6,6),x.position.y=60,e.add(x),r.push(x);const M=new T(re.clone(),a);M.scale.set(12,12,12),M.position.y=60,e.add(M),o.push(M);const y=new T(qi.clone(),_t(n,.1));y.scale.set(130,130,1),y.rotation.x=-Math.PI/2,y.position.y=.2,e.add(y),o.push(y),e.userData.accentParts=r,e.userData.glowParts=o,e.userData.orbitRings=[g,p]}function VE(e,t){const n=t.team===tt?zt.PLAYER:zt.ENEMY,i=ci(n);t.branch==="A"?WE(e,i):t.branch==="B"?XE(e,i):t.level>=2?Ph(e,i):t.level>=1?xm(e,i):gm(e,i),e.userData.isBarracks=!0}function gm(e,t){const n=Gt(t),i=qt(He(t)),s=_t(t,.15),a=[],r=[],o=new T(it.clone(),n);o.scale.set(68,4,68),o.position.y=2,e.add(o);const c=new T(it.clone(),i);c.scale.set(70,1,70),c.position.y=4.5,e.add(c),a.push(c);const h=new T(it.clone(),n);h.scale.set(62,22,58),h.position.y=15,e.add(h);for(let M=-1;M<=1;M+=2){const y=new T(it.clone(),n);y.scale.set(64,2.5,34),y.position.set(0,29,M*8),y.rotation.x=M*.22,e.add(y)}const d=new T(it.clone(),i);d.scale.set(66,1.5,3),d.position.y=30.5,e.add(d),a.push(d);for(let M=-1;M<=1;M+=2){for(let b=0;b<3;b++){const E=-20+b*20,A=new T(it.clone(),n);A.scale.set(4,18,2.5),A.position.set(E,15,M*30),e.add(A)}const y=new T(it.clone(),i);y.scale.set(50,1.2,.8),y.position.set(0,22,M*30.5),e.add(y),a.push(y)}const l=new T(it.clone(),n);l.scale.set(3,18,4),l.position.set(-18,13,-30),e.add(l);const u=new T(it.clone(),n);u.scale.set(3,18,4),u.position.set(18,13,-30),e.add(u);const f=new T(it.clone(),i);f.scale.set(40,2,3),f.position.set(0,23,-30),e.add(f),a.push(f);const _=new T(qi.clone(),_t(He(t),.2));_.scale.set(32,16,1),_.position.set(0,13,-30.5),e.add(_),r.push(_);for(let M=-1;M<=1;M+=2)for(let y=-1;y<=1;y+=2){const b=new T(it.clone(),n);b.scale.set(4,26,4),b.position.set(M*30,15,y*28),e.add(b)}const g=new T(ke.clone(),n);g.scale.set(3,10,3),g.position.set(-20,36,-14),e.add(g);const p=new T(re.clone(),i);p.scale.set(5,5,5),p.position.set(-20,42,-14),e.add(p),a.push(p);const m=new T(re.clone(),s);m.scale.set(10,10,10),m.position.set(-20,42,-14),e.add(m),r.push(m);const x=new T(qi.clone(),_t(t,.08));x.scale.set(80,80,1),x.rotation.x=-Math.PI/2,x.position.y=.15,e.add(x),r.push(x),e.userData.accentParts=a,e.userData.glowParts=r}function xm(e,t){gm(e,t);const n=Gt(t),i=qt(He(t)),s=e.userData.accentParts;e.userData.glowParts;const a=new T(ke.clone(),n);a.scale.set(5,6,5),a.position.set(18,34,12),e.add(a);const r=new T(re.clone(),n);r.scale.set(12,4,12),r.position.set(18,38,12),e.add(r);const o=new T(re.clone(),i);o.scale.set(3,3,3),o.position.set(18,42,12),e.add(o),s.push(o);for(let h=0;h<3;h++){const d=-14+h*14,l=new T(it.clone(),n);l.scale.set(6,6,2),l.position.set(d,10,30),e.add(l);const u=new T(it.clone(),i);u.scale.set(4,4,.6),u.position.set(d,10,31.2),e.add(u),s.push(u)}const c=new T(gn.clone(),i);c.scale.set(42,42,42),c.rotation.x=Math.PI/2,c.position.y=26,e.add(c),s.push(c)}function Ph(e,t){xm(e,t);const n=Gt(t),i=qt(He(t)),s=_t(t,.15),a=e.userData.accentParts,r=e.userData.glowParts;for(let d=-1;d<=1;d+=2){const l=new T(it.clone(),n);l.scale.set(3,20,40),l.position.set(d*34,14,0),e.add(l)}const o=new T(ke.clone(),n);o.scale.set(3,10,3),o.position.set(22,36,-14),e.add(o);const c=new T(re.clone(),i);c.scale.set(5,5,5),c.position.set(22,42,-14),e.add(c),a.push(c);const h=new T(re.clone(),s);h.scale.set(10,10,10),h.position.set(22,42,-14),e.add(h),r.push(h);for(let d=-1;d<=1;d+=2){const l=new T(it.clone(),i);l.scale.set(60,.8,1),l.position.set(0,31,d*4),e.add(l),a.push(l)}}function WE(e,t){Ph(e,t);const n=qt(He(t)),i=_t(t,.2),s=e.userData.accentParts,a=e.userData.glowParts,r=new T(it.clone(),Gt(t));r.scale.set(5,20,5),r.position.set(-22,14,-30),e.add(r);const o=new T(it.clone(),Gt(t));o.scale.set(5,20,5),o.position.set(22,14,-30),e.add(o);const c=new T(qi.clone(),i);c.scale.set(44,20,1),c.position.set(0,14,-31),e.add(c),a.push(c);for(let h=0;h<3;h++){const d=new T(ke.clone(),n);d.scale.set(1,12,1),d.position.set(-16+h*16,38,0),e.add(d),s.push(d)}}function XE(e,t){Ph(e,t);const n=qt(He(t));_t(t,.2);const i=e.userData.accentParts,s=e.userData.glowParts;for(let o=-1;o<=1;o+=2)for(let c=0;c<3;c++){const h=new T(it.clone(),n);h.scale.set(58,.6,.6),h.position.set(0,10+c*5,o*31),e.add(h),i.push(h)}const a=new T(qi.clone(),_t(He(t),.2));a.scale.set(28,14,1),a.position.set(0,12,30.5),e.add(a),s.push(a);const r=new T(gn.clone(),n);r.scale.set(24,24,24),r.rotation.x=Math.PI/2,r.position.y=32,e.add(r),i.push(r)}function qE(e,t){const n=t.team===tt?zt.PLAYER:zt.ENEMY,i=ci(n),s=new fe;t.branch==="A"?jE(s,i):t.branch==="B"?KE(s,i):t.level>=2?ZE(s,i):t.level>=1?$E(s,i):YE(s,i),e.add(s),e.userData.model=s,e.userData.disc=s.userData.disc,e.userData.turretPivot=s.userData.turretPivot,e.userData.barrel=s.userData.barrel,e.userData.barrelY=s.userData.barrelY,e.userData.barrelDist=s.userData.barrelDist,e.userData.muzzleFlash=s.userData.muzzleFlash,e.userData.isPulseTurret=!0}function YE(e,t){const n=new T(new ht(10,12,16,12),Gt(t));n.position.y=8,e.add(n);const i=new T(new ht(8,10,3,12),Gt(t));i.position.y=17.5,e.add(i);const s=new fe;s.position.y=18;const a=new T(new ht(1.5,1.5,10,6),Gt(t));a.rotation.z=Math.PI/2,a.position.set(9,0,0),s.add(a),e.add(s);const r=new Fn({color:new Ft(1,1,1)}),o=new T(new ct(2,8,6),r);o.position.set(14,0,0),o.visible=!1,s.add(o),e.userData.disc=null,e.userData.turretPivot=s,e.userData.barrel=a,e.userData.barrelY=18,e.userData.barrelDist=9,e.userData.muzzleFlash=o}function $E(e,t){const n=new T(new ht(11,13,22,12),Gt(t));n.position.y=11,e.add(n);const i=new T(new Qt(12,1.5,6,18),Gt(t));i.position.y=16,i.rotation.x=Math.PI/2,e.add(i);const s=new T(new ht(9,11,3,12),Gt(t));s.position.y=24,e.add(s);const a=new fe;a.position.y=25;const r=new T(new ht(1.5,1.5,14,6),Gt(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r),e.add(a);const o=new Fn({color:new Ft(1,1,1)}),c=new T(new ct(2,8,6),o);c.position.set(18,0,0),c.visible=!1,a.add(c),e.userData.disc=null,e.userData.turretPivot=a,e.userData.barrel=r,e.userData.barrelY=25,e.userData.barrelDist=11,e.userData.muzzleFlash=c}function ZE(e,t){const n=new T(new ht(12,14,25,14),Gt(t));n.position.y=12.5,e.add(n);const i=new T(new Qt(13,2,6,20),qt(He(t)));i.position.y=18,i.rotation.x=Math.PI/2,e.add(i);const s=new T(new ht(10,10,3,16),Gt(t));s.position.y=27,e.add(s);const a=new fe;a.position.y=28;const r=new T(new ht(1.5,1.5,14,6),Gt(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r);const o=new T(new ht(2.5,1.5,3,6),qt(He(t)));o.rotation.z=Math.PI/2,o.position.set(19,0,0),a.add(o),e.add(a);const c=new Fn({color:new Ft(1,1,1)}),h=new T(new ct(2.5,8,6),c);h.position.set(21,0,0),h.visible=!1,a.add(h),e.userData.disc=s,e.userData.turretPivot=a,e.userData.barrel=r,e.userData.barrelY=28,e.userData.barrelDist=11,e.userData.muzzleFlash=h}function jE(e,t){const n=new T(new ht(8,11,35,12),Gt(t));n.position.y=17.5,e.add(n);for(let u=0;u<4;u++){const f=u/4*Math.PI*2,_=new T(new z(1.2,18,6),Gt(t));_.position.set(Math.cos(f)*9,22,Math.sin(f)*9),_.rotation.y=-f,e.add(_)}const i=new T(new Qt(9,1.2,6,18),qt(He(t)));i.position.y=32,i.rotation.x=Math.PI/2,e.add(i);const s=new T(new ht(7,7,2,14),Gt(t));s.position.y=34,e.add(s);const a=new T(new ht(11,11,3,16),Gt(t));a.position.y=38,e.add(a);const r=new fe;r.position.y=38;const o=[-1.8,1.8,0];let c=null;for(let u=0;u<3;u++){const f=new T(new ht(1,1,16,6),qt(He(t)));f.rotation.z=Math.PI/2,f.position.set(12,o[u],0),r.add(f),u===2&&(c=f)}const h=new T(new Qt(2.5,.5,4,10),qt(He(t)));h.position.set(20,0,0),h.rotation.y=Math.PI/2,r.add(h),e.add(r);const d=new Fn({color:new Ft(1,1,1)}),l=new T(new ct(2.5,8,6),d);l.position.set(22,0,0),l.visible=!1,r.add(l),e.userData.disc=a,e.userData.turretPivot=r,e.userData.barrel=c,e.userData.barrelY=38,e.userData.barrelDist=12,e.userData.muzzleFlash=l}function KE(e,t){const n=new T(new ht(13,14,28,14),Gt(t));n.position.y=14,e.add(n);for(let l=0;l<4;l++){const u=l/4*Math.PI*2+Math.PI/4,f=new T(new z(4,22,2),Gt(t));f.position.set(Math.cos(u)*12,13,Math.sin(u)*12),f.rotation.y=-u,e.add(f)}const i=new T(new Qt(14,2.5,6,18),Gt(t));i.position.y=26,i.rotation.x=Math.PI/2,e.add(i);const s=new fe;s.position.y=28;const a=new T(new ht(10,12,8,12),Gt(t));a.position.y=4,s.add(a);for(let l=0;l<2;l++){const u=l===0?-1:1,f=new T(new z(3,6,10),Gt(t));f.position.set(u*10,5,0),s.add(f)}const r=new T(new ht(3.5,4,22,8),Gt(t));r.rotation.z=Math.PI/2,r.position.set(16,6,0),s.add(r);const o=new T(new Qa(6,6,8),qt(He(t)));o.rotation.z=-Math.PI/2,o.position.set(28,6,0),s.add(o);const c=new T(new Qt(5,.8,6,14),new Fn({color:He(t),transparent:!0,opacity:.7}));c.position.set(24,6,0),c.rotation.y=Math.PI/2,s.add(c),e.add(s);const h=new Fn({color:new Ft(1,1,1)}),d=new T(new ct(3.5,8,6),h);d.position.set(30,6,0),d.visible=!1,s.add(d),e.userData.disc=null,e.userData.turretPivot=s,e.userData.barrel=r,e.userData.barrelY=34,e.userData.barrelDist=16,e.userData.muzzleFlash=d}function JE(e,t){const n=zt.FACTORY,i=ci(n);t.branch==="A"?QE(e,i):t.branch==="B"?tw(e,i):t.level>=2?Dh(e,i):t.level>=1?Mm(e,i):vm(e,i),e.userData.isFactory=!0}function vm(e,t){const n=Gt(t),i=qt(He(t));_t(t,.15);const s=[],a=[],r=new T(it.clone(),n);r.scale.set(76,5,76),r.position.y=2.5,e.add(r);const o=new T(it.clone(),i);o.scale.set(78,1.2,78),o.position.y=5.5,e.add(o),s.push(o);const c=new T(it.clone(),n);c.scale.set(70,18,68),c.position.y=14,e.add(c);const h=new T(it.clone(),n);h.scale.set(56,14,54),h.position.y=30,e.add(h);const d=new T(it.clone(),i);d.scale.set(72,1.5,70),d.position.y=23.5,e.add(d),s.push(d);const l=new T(it.clone(),i);l.scale.set(58,1.2,56),l.position.y=37.5,e.add(l),s.push(l);for(let g=-1;g<=1;g+=2){const p=new T(ke.clone(),n);p.scale.set(8,32,8),p.position.set(g*22,38,24),e.add(p);for(const M of[28,38,48]){const y=new T(gn.clone(),n);y.scale.set(12,12,12),y.rotation.x=Math.PI/2,y.position.set(g*22,M,24),e.add(y)}const m=new T(ke.clone(),n);m.scale.set(11,3,11),m.position.set(g*22,55,24),e.add(m);const x=new T(re.clone(),_t(16752680,.2));x.scale.set(10,6,10),x.position.set(g*22,57,24),e.add(x),a.push(x)}const u=new T(it.clone(),n);u.scale.set(40,2,30),u.position.set(0,6,-28),e.add(u);for(let g=-1;g<=1;g+=2){const p=new T(it.clone(),i);p.scale.set(1.5,1,28),p.position.set(g*10,7.5,-28),e.add(p),s.push(p)}const f=new T(qi.clone(),_t(He(t),.25));f.scale.set(24,10,1),f.position.set(0,16,-35),e.add(f),a.push(f);for(let g=-1;g<=1;g+=2)for(let p=-1;p<=1;p+=2){const m=new T(re.clone(),i);m.scale.set(3,3,3),m.position.set(g*26,38,p*25),e.add(m),s.push(m)}const _=new T(qi.clone(),_t(t,.08));_.scale.set(90,90,1),_.rotation.x=-Math.PI/2,_.position.y=.15,e.add(_),a.push(_),e.userData.accentParts=s,e.userData.glowParts=a}function Mm(e,t){vm(e,t);const n=Gt(t),i=qt(He(t)),s=e.userData.accentParts;for(let d=-1;d<=1;d+=2){const l=new T(it.clone(),n);l.scale.set(4,36,4),l.position.set(d*24,24,-28),e.add(l)}const a=new T(it.clone(),n);a.scale.set(52,4,5),a.position.set(0,44,-28),e.add(a);const r=new T(it.clone(),i);r.scale.set(54,1,1.5),r.position.set(0,46.5,-28),e.add(r),s.push(r);const o=new T(it.clone(),n);o.scale.set(10,5,6),o.position.set(0,41,-28),e.add(o);const c=new T(ke.clone(),i);c.scale.set(1.5,14,1.5),c.position.set(0,32,-28),e.add(c),s.push(c);const h=new T(hr.clone(),i);h.scale.set(5,5,5),h.position.set(0,24,-28),e.add(h),s.push(h);for(let d=-1;d<=1;d+=2)for(let l=0;l<2;l++){const u=-10+l*20,f=new T(it.clone(),n);f.scale.set(3,12,14),f.position.set(d*36,14,u),e.add(f);const _=new T(ke.clone(),i);_.scale.set(3,1.5,3),_.rotation.z=Math.PI/2,_.position.set(d*37.5,16,u),e.add(_),s.push(_)}}function Dh(e,t){Mm(e,t);const n=Gt(t),i=qt(He(t)),s=_t(t,.15),a=e.userData.accentParts,r=e.userData.glowParts;for(let d=-1;d<=1;d+=2){const l=new T(ke.clone(),n);l.scale.set(3,18,3),l.rotation.x=Math.PI/2,l.position.set(d*22,20,12),e.add(l);const u=new T(gn.clone(),i);u.scale.set(5,5,5),u.position.set(d*22,20,8),e.add(u),a.push(u)}const o=new T(ke.clone(),n);o.scale.set(14,4,14),o.position.y=39,e.add(o);const c=new T(gn.clone(),i);c.scale.set(16,16,16),c.rotation.x=Math.PI/2,c.position.y=41.5,e.add(c),a.push(c);const h=new T(re.clone(),s);h.scale.set(12,4,12),h.position.y=41.5,e.add(h),r.push(h)}function QE(e,t){Dh(e,t);const n=Gt(t),i=qt(He(t)),s=_t(t,.2),a=e.userData.accentParts,r=e.userData.glowParts;for(let c=-1;c<=1;c+=2){const h=new T(it.clone(),n);h.scale.set(4,30,60),h.position.set(c*38,18,0),e.add(h);const d=new T(it.clone(),n);d.scale.set(60,30,4),d.position.set(0,18,c*38),e.add(d)}for(let c=0;c<2;c++){const h=new T(it.clone(),i);h.scale.set(70,1.5,1.5),h.rotation.y=Math.PI/4+c*Math.PI/2,h.position.y=38,e.add(h),a.push(h)}const o=new T(qi.clone(),s);o.scale.set(30,14,1),o.position.set(0,18,-36),e.add(o),r.push(o)}function tw(e,t){Dh(e,t);const n=Gt(t),i=qt(He(t)),s=_t(t,.2),a=e.userData.accentParts,r=e.userData.glowParts,o=new T(ke.clone(),n);o.scale.set(2.5,22,2.5),o.position.set(0,52,0),e.add(o);const c=new T(hr.clone(),i);c.scale.set(5,5,5),c.position.set(0,64,0),e.add(c),a.push(c);const h=new T(re.clone(),s);h.scale.set(10,10,10),h.position.set(0,64,0),e.add(h),r.push(h);for(let d=-1;d<=1;d+=2){const l=new T(ke.clone(),n);l.scale.set(4,20,4),l.rotation.z=Math.PI/2,l.position.set(d*20,30,-32),e.add(l);const u=new T(mm.clone(),i);u.scale.set(5,5,5),u.rotation.z=d*-Math.PI/2,u.position.set(d*32,30,-32),e.add(u),a.push(u)}}function ew(e,t){const n=.016666666666666666;for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0;if(a.position.y=a.userData.baseY,a.userData.isPulseTurret&&nw(a,s,e,n),(a.userData.isBarracks||a.userData.isFactory||a.userData.isHelipad)&&iw(a,s,e),a.userData.isGenerator){const d=a.userData.energyCore;if(d){const f=1+.12*Math.sin(e*3+r);d.scale.setScalar(8*f)}const l=a.userData.energyRing;l&&(l.rotation.y=e*1.2+r,l.rotation.x=Math.sin(e*.5+r)*.3);const u=a.userData.energyRing2;u&&(u.rotation.y=-e*.9+r+2)}if(a.userData.isWall){if(s.constructionState==="repairing"){const d=.3+.4*Math.sin(e*6),l=a.userData.glowParts;if(l)for(let u=0;u<l.length;u++)l[u].material.opacity=d}if(s.hp<s.maxHp*.5){const d=Math.random()>.85?.3:0,l=a.userData.glowParts;if(l&&!s.constructionState)for(let u=0;u<l.length;u++){const f=l[u].material;f.userData||(f.userData={}),f.userData.baseOpacity==null&&(f.userData.baseOpacity=f.opacity),f.opacity=f.userData.baseOpacity+d}}}if(a.userData.orbitRings){const d=a.userData.orbitRings;d[0]&&(d[0].rotation.y=e*.6+r),d[1]&&(d[1].rotation.y=-e*.45+r+1.5)}const o=a.userData.glowParts;if(o)for(let d=0;d<o.length;d++){const l=o[d].material;if(l.transparent){const u=l.userData?.baseOpacity??l.opacity;l.userData||(l.userData={}),l.userData.baseOpacity=u,l.opacity=u+.1*Math.sin(e*2.5+r)}}if(s.type===Me||s.type===Ce||s.type===ye||s.type===oe||s.type===tn||s.type===ie)if(s.constructionState==="building"){const d=s.constructionTimer/s.constructionDuration;a.scale.setScalar(.3+.7*d)}else a.scale.setScalar(1);else if(s.buildProgress<s.buildTime){const d=s.buildProgress/s.buildTime;a.scale.setScalar(.3+.7*d)}else a.scale.setScalar(1);const h=s.hp/s.maxHp;if(h<.5){const d=1-h*2,l=new Ft(.8,.2,0);a.traverse(u=>{if(u.isMesh&&u.material.emissive){const f=u.material.userData?._origEmissive;f&&(u.material.emissive.copy(f).lerp(l,d*.5),u.material.emissiveIntensity=1+d*.5)}})}else a.traverse(d=>{if(d.isMesh&&d.material.emissive){const l=d.material.userData?._origEmissive;l&&d.material.emissive.copy(l),d.material.emissiveIntensity=1}});if(s.hitFlashTimer&&s.hitFlashTimer>0){const d=s.hitFlashTimer/za;_w(a,d),s.hitFlashTimer-=n,s.hitFlashTimer<0&&(s.hitFlashTimer=0)}}}function nw(e,t,n,i){if(e.userData.turretPivot&&t.targetX!==void 0&&t.targetZ!==void 0){const a=t.targetX-t.x,r=t.targetZ-t.z,o=Math.atan2(-r,a);let c=e.userData.turretPivot.rotation.y,h=o-c;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;e.userData.turretPivot.rotation.y=c+h*.15}e.userData.disc&&i&&(e.userData.disc.rotation.y+=i*1.5);const s=performance.now()-(t.lastFireTime||0);if(s<250){const a=e.userData.muzzleFlash;if(a){a.visible=s<120;const o=4*Math.max(0,1-s/120);a.scale.setScalar(o)}const r=e.userData.barrel;if(r){const o=t.branch==="A"?2:3.5,c=t.branch==="A"?100:200,h=o*Math.exp(-s*4/c),d=e.userData.barrelDist||9;r.position.x=d-h}}else{const a=e.userData.muzzleFlash;a&&(a.visible=!1);const r=e.userData.barrel;r&&(r.position.x=e.userData.barrelDist||9)}if(t.constructionState==="upgrading"||t.constructionState==="branching"){const a=.5+.3*Math.sin(n*4);e.traverse(r=>{r.isMesh&&r.material&&r.material.opacity!==void 0&&r.material.transparent&&(r.material.opacity=a*.5)})}}function iw(e,t,n){if(t.constructionState==="upgrading"||t.constructionState==="branching"){const i=.5+.3*Math.sin(n*4);e.traverse(s=>{s.isMesh&&s.material&&s.material.opacity!==void 0&&s.material.transparent&&(s.material.opacity=i*.5)})}}function Jr(e,t){e.mesh&&(t.remove(e.mesh),gw(e.mesh),e.mesh=null)}function sw(e,t){const n=ci(zt.GOLD);t.branch==="A"?aw(e,n):t.branch==="B"?rw(e,n):t.level>=2?Ih(e,n):t.level>=1?Sm(e,n):ym(e,n),e.userData.isGenerator=!0}function ym(e,t){const n=Gt(t),i=qt(t),s=_t(t,.18),a=[],r=[],o=new T(_m.clone(),n);o.scale.set(16,6,16),o.position.y=3,e.add(o);const c=new T(gn.clone(),i);c.scale.set(20,20,20),c.rotation.x=Math.PI/2,c.position.y=6.5,e.add(c),a.push(c);for(let f=0;f<3;f++){const _=Math.PI*2/3*f,g=Math.cos(_)*9,p=Math.sin(_)*9,m=new T(ke.clone(),n);m.scale.set(2,12,2),m.position.set(g,12,p),e.add(m);const x=new T(re.clone(),i);x.scale.set(3,3,3),x.position.set(g,19,p),e.add(x),a.push(x)}const h=new T(Ll.clone(),i);h.scale.set(8,8,8),h.position.y=22,e.add(h),a.push(h);const d=new T(re.clone(),s);d.scale.set(13,13,13),d.position.y=22,e.add(d),r.push(d);const l=new T(gn.clone(),i);l.scale.set(18,18,18),l.position.y=22,e.add(l),a.push(l);const u=new T(gn.clone(),s);u.scale.set(15,15,15),u.position.y=22,u.rotation.x=Math.PI/3,e.add(u),r.push(u),e.userData.energyCore=h,e.userData.energyRing=l,e.userData.energyRing2=u,e.userData.coreGlow=d,e.userData.accentParts=a,e.userData.glowParts=r}function Sm(e,t){ym(e,t);const n=Gt(t),i=qt(t),s=e.userData.accentParts;for(let r=0;r<3;r++){const o=Math.PI*2/3*r+Math.PI/3,c=Math.cos(o)*11,h=Math.sin(o)*11,d=new T(ke.clone(),n);d.scale.set(1.8,14,1.8),d.position.set(c,13,h),e.add(d);const l=new T(re.clone(),i);l.scale.set(2.5,2.5,2.5),l.position.set(c,21,h),e.add(l),s.push(l)}const a=new T(gn.clone(),i);a.scale.set(14,14,14),a.rotation.x=Math.PI/2,a.position.y=14,e.add(a),s.push(a)}function Ih(e,t){Sm(e,t);const n=Gt(t),i=qt(t),s=_t(t,.2),a=e.userData.accentParts,r=e.userData.glowParts,o=new T(ke.clone(),n);o.scale.set(1.5,14,1.5),o.position.y=33,e.add(o);const c=new T(hr.clone(),i);c.scale.set(4,4,4),c.position.y=41,e.add(c),a.push(c);const h=new T(gn.clone(),i);h.scale.set(12,12,12),h.rotation.x=Math.PI/2,h.position.y=28,e.add(h),a.push(h);const d=new T(re.clone(),s);d.scale.set(18,18,18),d.position.y=22,e.add(d),r.push(d)}function aw(e,t){Ih(e,t);const n=qt(t),i=_t(t,.3),s=e.userData.accentParts,a=e.userData.glowParts,r=new T(Ll.clone(),n);r.scale.set(12,12,12),r.position.y=22,e.add(r),s.push(r),e.userData.energyCore=r;for(let c=0;c<6;c++){const h=Math.PI*2/6*c,d=Math.cos(h)*10,l=Math.sin(h)*10,u=new T(ke.clone(),n);u.scale.set(.5,14,.5),u.rotation.z=Math.PI/2,u.rotation.y=-h,u.position.set(d*.5,20,l*.5),e.add(u),s.push(u)}const o=new T(re.clone(),i);o.scale.set(24,24,24),o.position.y=22,e.add(o),a.push(o)}function rw(e,t){Ih(e,t);const n=Gt(t),i=qt(t),s=_t(t,.15),a=e.userData.accentParts,r=e.userData.glowParts;for(let c=0;c<4;c++){const h=Math.PI/4+Math.PI/2*c,d=Math.cos(h)*16,l=Math.sin(h)*16,u=new T(it.clone(),n);u.scale.set(5,8,5),u.position.set(d,4,l),e.add(u);const f=new T(it.clone(),i);f.scale.set(5.5,1,5.5),f.position.set(d,8.5,l),e.add(f),a.push(f);const _=new T(ke.clone(),i);_.scale.set(.4,16,.4),_.rotation.z=Math.PI/2,_.rotation.y=-h,_.position.set(d*.5,6,l*.5),e.add(_),a.push(_)}const o=new T(gn.clone(),s);o.scale.set(30,30,30),o.rotation.x=Math.PI/2,o.position.y=.3,e.add(o),r.push(o)}function ow(e,t){const n=t.team===tt?zt.PLAYER:zt.ENEMY,i=ci(n);t.branch==="A"?lw(e,i):t.branch==="B"?cw(e,i):t.level>=2?Lh(e,i):t.level>=1?wm(e,i):Em(e,i),e.userData.isHelipad=!0}function Em(e,t){const n=ci(zt.HELIPAD),i=Gt(t),s=qt(n),a=_t(n,.12),r=[],o=[],c=Z*2,h=new T(it.clone(),i);h.scale.set(c,3,c),h.position.y=1.5,e.add(h);const d=new T(it.clone(),s);d.scale.set(c+2,.8,c+2),d.position.y=3.2,e.add(d),r.push(d);const l=new T(it.clone(),i);l.scale.set(c*.75,1.5,c*.75),l.position.y=3.8,e.add(l);const u=4.8,f=3,_=.4,g=c*.35,p=c*.25,m=new T(it.clone(),s);m.scale.set(f,_,g),m.position.set(-p/2,u,0),e.add(m),r.push(m);const x=new T(it.clone(),s);x.scale.set(f,_,g),x.position.set(p/2,u,0),e.add(x),r.push(x);const M=new T(it.clone(),s);M.scale.set(p+f,_,f),M.position.set(0,u,0),e.add(M),r.push(M);const y=new T(qi.clone(),_t(n,.08));y.scale.set(p+f+6,g+6,1),y.rotation.x=-Math.PI/2,y.position.y=4.6,e.add(y),o.push(y);const b=c*.42,E=[[-b,5,-b],[b,5,-b],[-b,5,b],[b,5,b]];for(const[W,G,et]of E){const nt=new T(ke.clone(),i);nt.scale.set(1.5,6,1.5),nt.position.set(W,3,et),e.add(nt);const pt=new T(re.clone(),s);pt.scale.setScalar(3),pt.position.set(W,G+2,et),e.add(pt),r.push(pt);const at=new T(re.clone(),a);at.scale.setScalar(5),at.position.set(W,G+2,et),e.add(at),o.push(at)}const A=new T(gn.clone(),a);A.scale.set(c*.9,c*.9,c*.9),A.rotation.x=Math.PI/2,A.position.y=4,e.add(A),o.push(A);const v=qt(n);for(let W=-1;W<=1;W+=2){const G=new T(it.clone(),v);G.scale.set(c*.8,.5,.8),G.position.set(0,3,W*(c*.48)),e.add(G),r.push(G);const et=new T(it.clone(),v);et.scale.set(.8,.5,c*.8),et.position.set(W*(c*.48),3,0),e.add(et),r.push(et)}const w=b-5,D=-b+5,C=new T(it.clone(),i);C.scale.set(5,10,5),C.position.set(w,5,D),e.add(C);const L=new T(it.clone(),s);L.scale.set(5.5,1,5.5),L.position.set(w,10.5,D),e.add(L),r.push(L);const U=new T(ke.clone(),i);U.scale.set(.8,12,.8),U.position.set(w,17,D),e.add(U);const V=new T(re.clone(),s);V.scale.setScalar(2),V.position.set(w,23.5,D),e.add(V),r.push(V);const B=new T(re.clone(),_t(n,.2));B.scale.setScalar(3.5),B.position.set(w,23.5,D),e.add(B),o.push(B),e.userData.accentParts=r,e.userData.glowParts=o}function wm(e,t){Em(e,t);const n=ci(zt.HELIPAD),i=Gt(t),s=qt(n),a=e.userData.accentParts,r=Z*2,o=r*.42;for(let d=-1;d<=1;d+=2){const l=new T(ke.clone(),i);l.scale.set(4,6,4),l.rotation.z=Math.PI/2,l.position.set(d*14,5,o-2),e.add(l);const u=new T(re.clone(),s);u.scale.set(4,4,4),u.position.set(d*14+d*3,5,o-2),e.add(u),a.push(u)}const c=qt(n);for(let d=-1;d<=1;d+=2){const l=new T(it.clone(),c);l.scale.set(r*.5,.3,.6),l.position.set(0,4.9,d*(r*.2)),e.add(l),a.push(l)}const h=[[-o,-o],[o,-o],[-o,o],[o,o]];for(const[d,l]of h){const u=new T(ke.clone(),i);u.scale.set(1.2,4,1.2),u.position.set(d,10,l),e.add(u);const f=new T(re.clone(),s);f.scale.setScalar(2),f.position.set(d,12.5,l),e.add(f),a.push(f)}}function Lh(e,t){wm(e,t);const n=ci(zt.HELIPAD),i=Gt(t),s=qt(n),a=_t(n,.15),r=e.userData.accentParts,o=e.userData.glowParts,h=Z*2*.42,d=h-5,l=-h+5,u=new T(ke.clone(),i);u.scale.set(1,6,1),u.position.set(d,27,l),e.add(u);const f=new T(re.clone(),i);f.scale.set(8,3,8),f.position.set(d,31,l),e.add(f);const _=new T(re.clone(),s);_.scale.set(2,2,2),_.position.set(d,33,l),e.add(_),r.push(_);for(let g=-1;g<=1;g+=2)for(let p=-1;p<=1;p+=2){const m=new T(re.clone(),s);m.scale.setScalar(1.5),m.position.set(g*18,5,p*18),e.add(m),r.push(m);const x=new T(re.clone(),a);x.scale.setScalar(3),x.position.set(g*18,5,p*18),e.add(x),o.push(x)}for(let g=0;g<8;g++){const p=Math.PI*2/8*g,m=Math.cos(p)*(h+2),x=Math.sin(p)*(h+2),M=new T(it.clone(),i);M.scale.set(1,8,1),M.position.set(m,4,x),e.add(M);const y=new T(re.clone(),s);y.scale.setScalar(1.2),y.position.set(m,8.5,x),e.add(y),r.push(y)}}function lw(e,t){Lh(e,t);const n=ci(zt.HELIPAD),i=Gt(t),s=qt(n),a=_t(n,.2),r=e.userData.accentParts,o=e.userData.glowParts,h=Z*2*.42;for(let f=-1;f<=1;f+=2)for(let _=0;_<2;_++){const g=-12+_*24,p=new T(it.clone(),i);p.scale.set(6,5,10),p.position.set(f*(h-8),2.5,g),e.add(p);const m=new T(it.clone(),s);m.scale.set(6.5,.8,10.5),m.position.set(f*(h-8),5.5,g),e.add(m),r.push(m)}for(let f=-1;f<=1;f+=2){const _=new T(it.clone(),i);_.scale.set(3,28,3),_.position.set(f*28,14,0),e.add(_)}const d=new T(it.clone(),i);d.scale.set(60,3,4),d.position.set(0,29,0),e.add(d);const l=new T(it.clone(),s);l.scale.set(62,.8,1),l.position.set(0,31,0),e.add(l),r.push(l);for(let f=0;f<3;f++){const _=-16+f*16,g=new T(it.clone(),i);g.scale.set(4,3,4),g.position.set(_,1.5,h-10),e.add(g);const p=new T(it.clone(),s);p.scale.set(2,.3,2),p.position.set(_,3.2,h-10),e.add(p),r.push(p)}const u=new T(qi.clone(),a);u.scale.set(50,50,1),u.rotation.x=-Math.PI/2,u.position.y=4.7,e.add(u),o.push(u)}function cw(e,t){Lh(e,t);const n=ci(zt.HELIPAD),i=Gt(t),s=qt(n),a=_t(n,.18),r=e.userData.accentParts,o=e.userData.glowParts,c=Z*2,h=c*.42;for(let l=-1;l<=1;l+=2)for(let u=0;u<3;u++){const f=new T(it.clone(),s);f.scale.set(c*.7,.3,.5),f.position.set(0,4.9,l*(8+u*6)),e.add(f),r.push(f)}for(let l=-1;l<=1;l+=2){const u=new T(it.clone(),i);u.scale.set(c*.85,2,3),u.position.set(0,3.5,l*22),e.add(u);const f=new T(it.clone(),s);f.scale.set(c*.85,.5,1),f.position.set(0,4.8,l*22),e.add(f),r.push(f)}const d=[[0,-h],[0,h],[-h,0],[h,0]];for(const[l,u]of d){const f=new T(ke.clone(),i);f.scale.set(1.5,14,1.5),f.position.set(l,7,u),e.add(f);const _=new T(re.clone(),s);_.scale.setScalar(3),_.position.set(l,15,u),e.add(_),r.push(_);const g=new T(re.clone(),a);g.scale.setScalar(5),g.position.set(l,15,u),e.add(g),o.push(g)}}function dw(e,t){const n=t.team===tt?zt.PLAYER:zt.ENEMY,i=ci(n),s=t.orientation||la,a=t.level;s===la||s===jo?(a>=2?fw(e,i):a>=1?uw(e,i):hw(e,i),s===jo&&(e.rotation.y=Math.PI/2)):pw(e,i,a,s),e.userData.isWall=!0}function hw(e,t){const n=Gt(t),i=qt(He(t)),s=_t(t,.12),a=[],r=[],o=new T(it.clone(),n);o.scale.set(35,25,8),o.position.y=12.5,e.add(o);const c=new T(it.clone(),i);c.scale.set(36,1.5,9),c.position.y=25.5,e.add(c),a.push(c);const h=new T(it.clone(),i);h.scale.set(36,1,9),h.position.y=.5,e.add(h),a.push(h);const d=new T(it.clone(),s);d.scale.set(37,2,10),d.position.y=26,e.add(d),r.push(d);for(let l=-1;l<=1;l+=2){const u=new T(it.clone(),n);u.scale.set(3,27,9),u.position.set(l*17,13.5,0),e.add(u);const f=new T(re.clone(),i);f.scale.set(3.5,3.5,3.5),f.position.set(l*17,27.5,0),e.add(f),a.push(f)}e.userData.accentParts=a,e.userData.glowParts=r}function uw(e,t){const n=Gt(t),i=qt(He(t)),s=_t(t,.15),a=[],r=[],o=new T(it.clone(),n);o.scale.set(35,35,10),o.position.y=17.5,e.add(o);const c=new T(it.clone(),n);c.scale.set(4,33,12),c.position.y=17,e.add(c);const h=new T(it.clone(),i);h.scale.set(36,1.5,11),h.position.y=35.5,e.add(h),a.push(h);const d=new T(it.clone(),i);d.scale.set(34,.8,10.5),d.position.y=22,e.add(d),a.push(d);const l=new T(it.clone(),i);l.scale.set(36,1,11),l.position.y=.5,e.add(l),a.push(l);const u=new T(it.clone(),s);u.scale.set(37,2.5,12),u.position.y=36,e.add(u),r.push(u);for(let f=-1;f<=1;f+=2){const _=new T(it.clone(),n);_.scale.set(3.5,37,11),_.position.set(f*17,18.5,0),e.add(_);const g=new T(hr.clone(),i);g.scale.set(4,4,4),g.position.set(f*17,38,0),e.add(g),a.push(g);const p=new T(re.clone(),s);p.scale.set(6,6,6),p.position.set(f*17,38,0),e.add(p),r.push(p)}e.userData.accentParts=a,e.userData.glowParts=r}function fw(e,t){const n=Gt(t),i=qt(He(t)),s=_t(t,.18),a=[],r=[],o=new T(it.clone(),n);o.scale.set(35,45,12),o.position.y=22.5,e.add(o);for(let p=-1;p<=1;p+=2){const m=new T(it.clone(),n);m.scale.set(3,43,13),m.position.set(p*10,22,0),e.add(m)}const c=new T(_m.clone(),n);c.scale.set(8,1.5,8),c.rotation.x=Math.PI/2,c.position.set(0,28,7),e.add(c);const h=new T(gn.clone(),i);h.scale.set(10,10,10),h.rotation.x=Math.PI/2,h.position.set(0,28,7.5),e.add(h),a.push(h);const d=new T(it.clone(),i);d.scale.set(36,1.5,13),d.position.y=45.5,e.add(d),a.push(d);const l=new T(it.clone(),i);l.scale.set(34,.8,12.5),l.position.y=43,e.add(l),a.push(l);const u=new T(it.clone(),i);u.scale.set(34,.8,12.5),u.position.y=28,e.add(u),a.push(u);const f=new T(it.clone(),i);f.scale.set(36,1.2,13),f.position.y=.6,e.add(f),a.push(f);const _=new T(it.clone(),s);_.scale.set(37,3,14),_.position.y=46,e.add(_),r.push(_);for(let p=-1;p<=1;p+=2){const m=new T(it.clone(),n);m.scale.set(4,47,13),m.position.set(p*17,23.5,0),e.add(m);const x=new T(Ll.clone(),i);x.scale.set(5,5,5),x.position.set(p*17,48,0),e.add(x),a.push(x);const M=new T(re.clone(),s);M.scale.set(8,8,8),M.position.set(p*17,48,0),e.add(M),r.push(M);const y=new T(it.clone(),i);y.scale.set(.5,40,.5),y.position.set(p*17,22,7),e.add(y),a.push(y)}const g=new T(re.clone(),s);g.scale.set(10,10,4),g.position.set(0,28,8),e.add(g),r.push(g),e.userData.accentParts=a,e.userData.glowParts=r}function pw(e,t,n,i){const s=[.12,.15,.18][n]||.12,a=Gt(t),r=qt(He(t)),o=_t(t,s),c=[],h=[],d=[25,35,45][n]||25,l=[8,10,12][n]||8,u=18,f=d/2;let _,g;switch(i){case eh:_=1,g=-1;break;case nh:_=-1,g=-1;break;case ih:_=1,g=1;break;case sh:_=-1,g=1;break;default:_=1,g=-1;break}const p=new T(it.clone(),a);p.scale.set(u,d,l),p.position.set(_*(u/2),f,0),e.add(p);const m=new T(it.clone(),a);m.scale.set(l,d,u),m.position.set(0,f,g*(u/2)),e.add(m);const x=new T(it.clone(),a);x.scale.set(l,d,l),x.position.set(0,f,0),e.add(x);const M=new T(it.clone(),r);M.scale.set(u+1,1.5,l+1),M.position.set(_*(u/2),d+.5,0),e.add(M),c.push(M);const y=new T(it.clone(),r);y.scale.set(l+1,1.5,u+1),y.position.set(0,d+.5,g*(u/2)),e.add(y),c.push(y);const b=new T(it.clone(),r);b.scale.set(l+1,1.5,l+1),b.position.set(0,d+.5,0),e.add(b),c.push(b);const E=new T(it.clone(),r);E.scale.set(u+1,1,l+1),E.position.set(_*(u/2),.5,0),e.add(E),c.push(E);const A=new T(it.clone(),r);A.scale.set(l+1,1,u+1),A.position.set(0,.5,g*(u/2)),e.add(A),c.push(A);const v=new T(it.clone(),o);v.scale.set(u+2,2,l+2),v.position.set(_*(u/2),d+1,0),e.add(v),h.push(v);const w=new T(it.clone(),o);w.scale.set(l+2,2,u+2),w.position.set(0,d+1,g*(u/2)),e.add(w),h.push(w);const D=new T(it.clone(),a),C=[3,3.5,4][n]||3;D.scale.set(C,d+2,C),D.position.set(0,f+1,0),e.add(D);const L=[re,hr,Ll][n]||re,U=[3.5,4,5][n]||3.5,V=new T(L.clone(),r);if(V.scale.set(U,U,U),V.position.set(0,d+3,0),e.add(V),c.push(V),n>=1){const at=[0,6,8][n]||6,dt=new T(re.clone(),o);dt.scale.set(at,at,at),dt.position.set(0,d+3,0),e.add(dt),h.push(dt)}const B=_*u,W=g*u,G=new T(it.clone(),a);G.scale.set(C,d+2,l+1),G.position.set(B,f+1,0),e.add(G);const et=new T(L.clone(),r);et.scale.set(U,U,U),et.position.set(B,d+3,0),e.add(et),c.push(et);const nt=new T(it.clone(),a);nt.scale.set(l+1,d+2,C),nt.position.set(0,f+1,W),e.add(nt);const pt=new T(L.clone(),r);if(pt.scale.set(U,U,U),pt.position.set(0,d+3,W),e.add(pt),c.push(pt),n>=1){const at=[0,6,8][n]||6,dt=new T(re.clone(),o);dt.scale.set(at,at,at),dt.position.set(B,d+3,0),e.add(dt),h.push(dt);const Wt=new T(re.clone(),o);Wt.scale.set(at,at,at),Wt.position.set(0,d+3,W),e.add(Wt),h.push(Wt)}if(n>=2){const at=new T(it.clone(),r);at.scale.set(u-2,.8,l+.5),at.position.set(_*(u/2),d*.6,0),e.add(at),c.push(at);const dt=new T(it.clone(),r);dt.scale.set(l+.5,.8,u-2),dt.position.set(0,d*.6,g*(u/2)),e.add(dt),c.push(dt);const Wt=new T(it.clone(),a);Wt.scale.set(3,d-2,l+1),Wt.position.set(_*(u/2),f,0),e.add(Wt);const Te=new T(it.clone(),a);Te.scale.set(l+1,d-2,3),Te.position.set(0,f,g*(u/2)),e.add(Te)}if(n===1){const at=new T(it.clone(),r);at.scale.set(u-2,.8,l+.5),at.position.set(_*(u/2),d*.6,0),e.add(at),c.push(at);const dt=new T(it.clone(),r);dt.scale.set(l+.5,.8,u-2),dt.position.set(0,d*.6,g*(u/2)),e.add(dt),c.push(dt)}e.userData.accentParts=c,e.userData.glowParts=h}const mw=new Ft(1,1,1);function _w(e,t){e.traverse(n=>{if(n.isMesh&&n.material.emissive){const i=n.material.userData?._origEmissive;i&&n.material.emissive.copy(i).lerp(mw,t)}})}function gw(e){e.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}function dl(e,t){const n=e.team===tt?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=e.team===kt,s=new fe;switch(e.type){case Rs:vw(s,n,i);break;case Ua:Mw(s,n,i);break;case js:yw(s,n,i);break;case xn:Tw(s,n,i),s.scale.setScalar(1.8);break;case na:Pw(s,i);break;case ia:Dw(s,i);break}if(e.upgradeLevel>0||e.upgradeBranch){const _=e.upgradeBranch?3:e.upgradeLevel,g={[Rs]:8,[Ua]:10,[js]:16}[e.type]||8;for(let p=0;p<_;p++){const m=new T(new Qt(g+p*1.5,.25,4,16),_t(n,.2));m.rotation.x=Math.PI/2,m.position.y=-1+p*1.2,s.add(m),s.userData.glowParts||(s.userData.glowParts=[]),s.userData.glowParts.push(m)}}const a={[Rs]:12,[Ua]:15,[js]:22,[xn]:16,[na]:10,[ia]:14}[e.type]||12,r=new er(a-1.5,a,32),o=new Fn({color:D_,transparent:!0,opacity:.9,side:Qn,depthWrite:!1}),c=new T(r,o);c.rotation.x=-Math.PI/2,c.visible=!1,s.add(c),s.userData._selectionRing=c;const h=a+3,d=new er(h-1.2,h,32),l=new Fn({color:I_,transparent:!0,opacity:.5,side:Qn,depthWrite:!1}),u=new T(d,l);u.rotation.x=-Math.PI/2,u.visible=!1,s.add(u),s.userData._squadHighlightRing=u;const f={[Rs]:3,[Ua]:3,[js]:2,[xn]:Sl,[na]:3,[ia]:2}[e.type]||10;s.position.set(e.x,f,e.z),s.userData.baseY=f,s.userData.idOffset=e.idOffset,s.userData.lastX=e.x,s.userData.lastZ=e.z,s.userData.smoothAngle=0,t.add(s),e.mesh=s}function xw(e,t,n){for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0,o=a.userData.unitType;a.position.x=s.x,a.position.z=s.z,a.position.y=a.userData.baseY;const c=s.x-a.userData.lastX,h=s.z-a.userData.lastZ,d=c*c+h*h;if(d>.01){const g=Math.atan2(c,h),p=a.userData.smoothAngle||0;let m=g-p;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;const x=p+m*.12;a.rotation.y=x,a.userData.smoothAngle=x,o==="rifle"&&(a.rotation.x+=(-.06-a.rotation.x)*.1)}else if(s.targetX!==void 0&&s.targetZ!==void 0&&s.inCombat&&o!=="helicopter"){const g=s.targetX-s.x,p=s.targetZ-s.z,m=Math.atan2(g,p),x=a.userData.smoothAngle||0;let M=m-x;for(;M>Math.PI;)M-=Math.PI*2;for(;M<-Math.PI;)M+=Math.PI*2;const y=x+M*.15;a.rotation.y=y,a.userData.smoothAngle=y,a.rotation.z*=.92,a.rotation.x*=.92}else a.rotation.z*=.92,a.rotation.x*=.92;if(a.userData.lastX=s.x,a.userData.lastZ=s.z,o==="rifle")Sw(a,s,e,r,d);else if(o==="assault")Ew(a,s,e,r,d);else if(o==="tank")ww(a,s,e,r);else if(o==="medic"||o==="engineer")Lw(a,s,e,r);else if(o==="helicopter"){bw(a,s,e,r,d);const g=a.userData.selectRing;if(g){const p=n!=null&&s.id===n;g.visible=p,p&&(g.material.opacity=.4+.2*Math.sin(e*5),g.rotation.z+=.02)}}const l=a.userData.glowParts;if(l){const g=s.inCombat?6:3,p=s.inCombat?.14:.07;for(let m=0;m<l.length;m++){const x=l[m].material;x.transparent&&(x.userData||(x.userData={}),x.userData.baseOp==null&&(x.userData.baseOp=x.opacity),x.opacity=x.userData.baseOp+p*Math.sin(e*g+r))}}a.userData.threatRing&&(a.userData.threatRing.rotation.y+=.025,a.userData.threatRing.rotation.z=.25*Math.sin(e*1.5+r));const u=s.hp/s.maxHp;if(u<.5){const g=1-u*2,p=new Ft(.8,.2,0);if(a.traverse(m=>{if(m.isMesh&&m.material.emissive){const x=m.material.userData?._origEmissive;x&&(m.material.emissive.copy(x).lerp(p,g*.5),m.material.emissiveIntensity=1+g*.5)}}),u<.25&&l){const m=Math.random()>.82?.35:0;for(const x of l){const M=x.material.userData?.baseOp??x.material.opacity;x.material.opacity=M+m}}}else a.traverse(g=>{if(g.isMesh&&g.material.emissive){const p=g.material.userData?._origEmissive;p&&g.material.emissive.copy(p),g.material.emissiveIntensity=1}});const f=a.userData._selectionRing,_=a.userData._squadHighlightRing;f&&(f.visible=!!s.selected,f.position.y=-a.userData.baseY+.5,f.visible&&(f.material.opacity=.7+.2*Math.sin(e*5+r))),_&&(_.visible=!!s.squadHighlight,_.position.y=-a.userData.baseY+.3,_.visible&&(_.material.opacity=.35+.15*Math.sin(e*3+r))),s.hitFlashTimer>0?(Bf(a,s.hitFlashTimer/za),s.hitFlashTimer-=1/60,s.hitFlashTimer<0&&(s.hitFlashTimer=0)):Bf(a,0)}}function Uh(e,t){e.mesh&&(t.remove(e.mesh),Nw(e.mesh),e.mesh=null)}function vw(e,t,n){const i=Gt(t),s=qt(t),a=new fe;e.add(a),R(a,new ht(1,1.4,5,6),i,-2.2,3.5,0),R(a,new ct(1.2,6,4),s,-2.2,1.2,.3),R(a,new ht(1.3,.9,4.5,6),i,-2.2,-1.2,.5),R(a,new z(1.4,3.5,.8),i,-2.2,-.8,1.4),R(a,new z(2.2,1.2,3.5),i,-2.2,-3.2,.8),R(a,new z(1.8,.25,3),s,-2.2,-2.6,.8);const r=R(a,new Qt(1.4,.25,4,8),_t(t,.15),-2.2,-3,.8);r.rotation.x=Math.PI/2;const o=new fe;e.add(o),R(o,new ht(1,1.4,5,6),i,2.2,3.5,0),R(o,new ct(1.2,6,4),s,2.2,1.2,.3),R(o,new ht(1.3,.9,4.5,6),i,2.2,-1.2,.5),R(o,new z(1.4,3.5,.8),i,2.2,-.8,1.4),R(o,new z(2.2,1.2,3.5),i,2.2,-3.2,.8),R(o,new z(1.8,.25,3),s,2.2,-2.6,.8);const c=R(o,new Qt(1.4,.25,4,8),_t(t,.15),2.2,-3,.8);c.rotation.x=Math.PI/2,R(e,new ht(2.8,2.4,2,6),i,0,7,0);const h=R(e,new Qt(2.9,.3,4,12),s,0,6.2,0);h.rotation.x=Math.PI/2,R(e,new z(7,6.5,5),i,0,11.5,0);const d=R(e,new z(6,4,1.2),i,0,12,3);d.rotation.x=-.1;for(let E=0;E<2;E++)R(e,new z(4,.2,.15),s,0,10.5+E*1.4,3.4);R(e,new z(.8,4.5,4),i,-4,11.5,0),R(e,new z(.8,4.5,4),i,4,11.5,0);const l=new fe;l.position.set(-5.5,14,0),e.add(l),R(l,new z(3.5,2.5,4),i,0,0,0),R(l,new z(3,.3,3.5),s,0,1.5,0);const u=new fe;u.position.set(5.5,14,0),e.add(u),R(u,new z(3.5,2.5,4),i,0,0,0),R(u,new z(3,.3,3.5),s,0,1.5,0),R(e,new ct(1.1,6,4),s,-5.5,12.5,.5),R(e,new ht(.8,1,4.5,6),i,-5.5,10,1).rotation.x=-.2,R(e,new ct(.8,6,4),i,-5.5,8,1.5),R(e,new ct(1.1,6,4),s,5.5,12.5,.5),R(e,new ht(.8,1,4.5,6),i,5.5,10,1).rotation.x=-.2,R(e,new ct(.8,6,4),i,5.5,8,1.5),R(e,new z(1,1,3),i,2,9,-1),R(e,new z(1.2,1.4,5),i,2,9,3);const f=R(e,new ht(.25,.3,8,4),i,2,9,9.5);f.rotation.x=-Math.PI/2,R(e,new ht(.5,.5,4,6),i,2,9,7).rotation.x=-Math.PI/2;const _=R(e,new ct(.5,6,4),s,2,9,13.5),g=R(e,new ct(1.2,6,4),_t(t,.15),2,9,13.5);R(e,new z(.6,2.2,1),s,2,7.8,2.5),R(e,new ht(1,1.4,1.5,6),i,0,15.5,.3);const p=R(e,new z(3.5,3,3.8),i,0,17.5,.3);R(e,new z(.8,1.2,3.5),i,0,19.3,.3);const m=R(e,new z(3.6,1.1,.6),s,0,17.5,2.3);R(e,new z(4,1.4,.3),_t(t,.25),0,17.5,2.5),R(e,new ht(.15,.15,2.5,4),i,1.5,19.8,.3);const x=R(e,new ct(.35,6,4),s,1.5,21.2,.3);R(e,new z(4.5,4,2.5),i,0,12,-3.5),R(e,new z(3,.25,.2),s,0,13.5,-2.3),R(e,new z(3,.25,.2),s,0,11.5,-2.3);const M=R(e,new ct(1,6,4),s,0,12,-2.5),y=R(e,new ct(1.8,6,4),_t(t,.14),0,12,-2.5),b=R(e,new Qt(5,.5,4,14),s,0,.5,0);if(b.rotation.x=Math.PI/2,n){const E=R(e,new Qt(9,.35,6,18),s,0,10,0);E.rotation.x=Math.PI/4,e.userData.threatRing=E}e.userData.accentParts=[m,h,x,M,_,b],e.userData.glowParts=[r,c,y,g],e.userData.muzzleFlash=_,e.userData.muzzleGlow=g,e.userData.head=p,e.userData.lLegGrp=a,e.userData.rLegGrp=o,e.userData.lShoulder=l,e.userData.rShoulder=u,e.userData.unitType="rifle"}function Mw(e,t,n){const i=Gt(t),s=qt(t),a=new fe;e.add(a);const r=new ht(1.6,2.2,8,6);R(a,r,i,-4,6,0).rotation.z=.1,R(a,new ct(1.8,6,4),s,-4.5,3,.5),R(a,new ht(2,1.4,7,6),i,-4.5,-.5,1),R(a,new z(2.2,5,1.2),i,-4.5,0,2.2),R(a,new z(3.5,1.5,5.5),i,-4.5,-3.8,1.5),R(a,new z(3,.3,4.5),s,-4.5,-3,1.5),R(a,new ct(1.2,6,4),s,-4.5,-2.8,1);const o=new fe;e.add(o),R(o,r,i,4,6,0).rotation.z=-.1,R(o,new ct(1.8,6,4),s,4.5,3,.5),R(o,new ht(2,1.4,7,6),i,4.5,-.5,1),R(o,new z(2.2,5,1.2),i,4.5,0,2.2),R(o,new z(3.5,1.5,5.5),i,4.5,-3.8,1.5),R(o,new z(3,.3,4.5),s,4.5,-3,1.5),R(o,new ct(1.2,6,4),s,4.5,-2.8,1),R(e,new ht(4,3.5,3,8),i,0,11,0);const c=R(e,new Qt(4.2,.5,6,14),s,0,10,0);c.rotation.x=Math.PI/2,R(e,new z(3,2.5,4),i,-5,10.5,0),R(e,new z(3,2.5,4),i,5,10.5,0),R(e,new z(11,10,7.5),i,0,18,0);const h=R(e,new z(9,6,1.8),i,0,18.5,4.8);h.rotation.x=-.12,R(e,new z(1.2,7,6),i,-6.5,18,0),R(e,new z(1.2,7,6),i,6.5,18,0);const d=R(e,new ct(2.2,8,6),s,0,18,5),l=R(e,new ct(3.5,8,6),_t(t,.18),0,18,5);for(let A=0;A<3;A++)R(e,new z(6,.25,.2),s,0,15.5+A*1.5,5.2);const u=new fe;u.position.set(-9,21,0),u.rotation.z=-.15,e.add(u),R(u,new z(5.5,4.5,6.5),i,0,0,0),R(u,new z(4.5,.5,5.5),s,0,2.5,0),R(u,new tr(1.2),s,0,3.5,0),R(u,new z(5,.3,.4),s,0,0,3.5);const f=new fe;f.position.set(9,21,0),f.rotation.z=.15,e.add(f),R(f,new z(5.5,4.5,6.5),i,0,0,0),R(f,new z(4.5,.5,5.5),s,0,2.5,0),R(f,new tr(1.2),s,0,3.5,0),R(f,new z(5,.3,.4),s,0,0,3.5),R(e,new ct(1.8,6,4),s,-9,17,1),R(e,new ht(1.3,1.6,7,6),i,-9,14,2).rotation.x=-.25,R(e,new ct(1.3,6,4),i,-9,11,3.5),R(e,new ht(.8,1,7,4),i,-9,10,7.5).rotation.x=-Math.PI/2;const _=R(e,new Qa(1.2,2.5,4),s,-9,10,11.5);_.rotation.x=-Math.PI/2,R(e,new ct(1.8,6,4),s,9,17,1),R(e,new ht(1.3,1.6,7,6),i,9,14,2).rotation.x=-.25,R(e,new ct(1.3,6,4),i,9,11,3.5),R(e,new ht(.8,1,7,4),i,9,10,7.5).rotation.x=-Math.PI/2;const g=R(e,new Qa(1.2,2.5,4),s,9,10,11.5);g.rotation.x=-Math.PI/2,R(e,new ht(1.5,2,2,6),i,0,24,.5);const p=R(e,new z(4.5,3.5,4.5),i,0,26.5,1),m=R(e,new z(4,1.2,.8),s,0,27,3.5);R(e,new z(4.5,1.6,.4),_t(t,.2),0,27,3.8),R(e,new z(1,2.5,3),i,0,29.5,1),R(e,new ht(.2,.2,4.5,4),i,2.5,29.5,1);const x=R(e,new ct(.5,6,4),s,2.5,32,1);R(e,new z(7,7,4),i,0,18,-5.5),R(e,new z(5,.3,.3),s,0,21,-3.5),R(e,new z(5,.3,.3),s,0,19,-3.5),R(e,new z(4,1,2.5),i,0,22.5,-5.5),R(e,new ht(1.2,1.2,2.5,6),i,-2.2,20.5,-8),R(e,new ht(1.2,1.2,2.5,6),i,2.2,20.5,-8);const M=R(e,new ct(1.4,6,4),s,-2.2,20.5,-9.5),y=R(e,new ct(1.4,6,4),s,2.2,20.5,-9.5),b=R(e,new Qt(2.8,.35,4,10),_t(t,.18),-4.5,-3.5,1.5);b.rotation.x=Math.PI/2;const E=R(e,new Qt(2.8,.35,4,10),_t(t,.18),4.5,-3.5,1.5);if(E.rotation.x=Math.PI/2,n){const A=R(e,new Qt(14,.4,6,22),s,0,16,0);A.rotation.x=Math.PI/4,e.userData.threatRing=A}e.userData.accentParts=[d,c,m,x,M,y,_,g],e.userData.glowParts=[l,b,E],e.userData.reactor=d,e.userData.reactorGlow=l,e.userData.head=p,e.userData.lLegGrp=a,e.userData.rLegGrp=o,e.userData.lShoulder=u,e.userData.rShoulder=f,e.userData.unitType="assault"}function yw(e,t,n){const i=Gt(t),s=qt(t);R(e,new z(22,5,28),i,0,5,0);const a=R(e,new z(20,4.5,6),i,0,6.5,15);a.rotation.x=-.35,R(e,new z(18,1.5,2),i,0,3.5,16),R(e,new z(18,4,2.5),i,0,6,-15);const r=R(e,new z(16,3,3),i,0,5,-16);r.rotation.x=.25,R(e,new z(1.8,4,24),i,-12,4,0),R(e,new z(1.8,4,24),i,12,4,0),R(e,new z(.6,2,10),i,-12.5,5.5,3),R(e,new z(.6,2,10),i,12.5,5.5,3),R(e,new z(.6,2,8),i,-12.5,5.5,-6),R(e,new z(.6,2,8),i,12.5,5.5,-6),R(e,new z(.3,.6,22),s,-13,5,0),R(e,new z(.3,.6,22),s,13,5,0),R(e,new z(8,.8,6),i,-5,8,-6),R(e,new z(8,.8,6),i,5,8,-6),R(e,new z(18,.2,.4),s,0,7.7,5),R(e,new z(18,.2,.4),s,0,7.7,-3);const o=new ht(2.8,3.2,3.5,6),c=[[-9,1.5,11],[9,1.5,11],[-9,1.5,-11],[9,1.5,-11]],h=[];for(const[U,V,B]of c){R(e,o,i,U,V,B);const W=R(e,new Qt(3,.4,4,10),s,U,V-.5,B);W.rotation.x=Math.PI/2,R(e,new ct(1.8,6,4),s,U,.5,B);const G=R(e,new Qt(3.5,.6,4,12),_t(t,.2),U,0,B);G.rotation.x=Math.PI/2,h.push(G);const et=R(e,new Qt(4.5,.3,4,12),_t(t,.08),U,-.3,B);et.rotation.x=Math.PI/2,h.push(et)}const d=R(e,new Qt(8,1,6,18),s,0,8.5,0);d.rotation.x=Math.PI/2,R(e,new ht(7,8,3,12),i,0,10,0);const l=new fe;l.position.y=11,e.add(l),R(l,new z(12,5.5,14),i,0,3,0);const u=R(l,new z(10,4,3.5),i,0,3.5,9);u.rotation.x=-.25,R(l,new z(1.8,4.5,12),i,-7,3,0),R(l,new z(1.8,4.5,12),i,7,3,0),R(l,new ht(2,2,.8,8),i,-3,6,-2),R(l,new z(10,.2,.3),s,0,5.8,3),R(l,new z(.3,.2,12),s,-5,5.8,0),R(l,new z(.3,.2,12),s,5,5.8,0);const f=R(l,new ht(2,2.5,22,8),i,0,3.5,18);f.rotation.x=-Math.PI/2;const _=R(l,new ht(3.2,3.2,5,8),i,0,3.5,9);_.rotation.x=-Math.PI/2;const g=new Qt(2.6,.3,4,8),p=R(l,g,s,0,3.5,15);p.rotation.x=Math.PI/2;const m=R(l,g,s,0,3.5,20);m.rotation.x=Math.PI/2;const x=R(l,g,s,0,3.5,25);x.rotation.x=Math.PI/2;const M=R(l,new ht(3,2.2,3,8),s,0,3.5,30);M.rotation.x=-Math.PI/2;const y=R(l,new ct(2,6,4),s,0,3.5,32),b=R(l,new ct(4,6,4),_t(t,.12),0,3.5,32);R(l,new ht(.5,.5,10,4),i,3,2,13).rotation.x=-Math.PI/2,R(l,new ct(.7,4,4),s,3,2,18);const E=R(l,new ct(2.2,8,6),s,0,7,-3),A=R(l,new ct(3.5,8,6),_t(t,.15),0,7,-3);R(e,new z(3.5,2.5,2.5),i,-6,6,-16.5),R(e,new z(3.5,2.5,2.5),i,6,6,-16.5);const v=R(e,new ct(1.8,6,4),s,-6,6,-18),w=R(e,new ct(1.8,6,4),s,6,6,-18);R(e,new ct(2.8,6,4),_t(t,.12),-6,6,-18),R(e,new ct(2.8,6,4),_t(t,.12),6,6,-18);const D=R(e,new Qt(13,1,6,22),_t(t,.07),0,.5,0);D.rotation.x=Math.PI/2;const C=R(e,new Qt(7,.6,4,14),_t(t,.1),0,1,0);C.rotation.x=Math.PI/2;const L=R(e,new Qt(9,.6,6,18),s,0,9,0);if(L.rotation.x=Math.PI/2,n){const U=R(e,new Qt(17,.5,6,24),s,0,8,0);U.rotation.x=Math.PI/4,e.userData.threatRing=U}e.userData.accentParts=[d,M,y,E,L,v,w],e.userData.glowParts=[...h,A,b,D,C],e.userData.turretPivot=l,e.userData.cannon=f,e.userData.cannonBaseZ=18,e.userData.muzzleFlash=y,e.userData.muzzleGlow=b,e.userData.dome=E,e.userData.domeGlow=A,e.userData.conduit=L,e.userData.hoverGlows=h,e.userData.unitType="tank"}function Sw(e,t,n,i,s){const a=e.userData.lLegGrp,r=e.userData.rLegGrp;if(a&&r)if(s>.05){const u=Math.sin(n*6+i)*1.8;a.position.z=u,r.position.z=-u,a.position.y=Math.max(0,Math.sin(n*6+i))*.5,r.position.y=Math.max(0,-Math.sin(n*6+i))*.5}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=e.userData.lShoulder,c=e.userData.rShoulder;if(o&&c&&s>.05){const u=Math.sin(n*6+i+1)*.04;o.rotation.x=u,c.rotation.x=-u}const h=e.userData.head;h&&(h.rotation.y=Math.sin(n*.5+i)*.2);const d=e.userData.muzzleFlash,l=e.userData.muzzleGlow;if(d){const u=t.fireCooldown>1/t.fireRate-.08;d.scale.setScalar(u?3:.5+.15*Math.sin(n*4+i)),l&&(l.material.opacity=u?.5:.08)}}function Ew(e,t,n,i,s){const a=e.userData.lLegGrp,r=e.userData.rLegGrp;if(a&&r)if(s>.05){const u=Math.sin(n*5+i)*2.5;a.position.z=u,r.position.z=-u,a.position.y=Math.max(0,Math.sin(n*5+i))*.8,r.position.y=Math.max(0,-Math.sin(n*5+i))*.8}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=e.userData.lShoulder,c=e.userData.rShoulder;if(o&&c&&s>.05){const u=Math.sin(n*5+i+1)*.06;o.rotation.x=u,c.rotation.x=-u}const h=e.userData.head;h&&(h.rotation.y=Math.sin(n*.7+i)*.35);const d=e.userData.reactor;d&&d.scale.setScalar(.85+.15*Math.sin(n*4+i));const l=e.userData.reactorGlow;l&&(l.material.opacity=.12+.08*Math.sin(n*4+i))}function ww(e,t,n,i,s){const a=e.userData.turretPivot;if(a&&t.targetX!==void 0&&t.targetZ!==void 0){const g=Math.atan2(t.targetX-t.x,t.targetZ-t.z)-(e.userData.smoothAngle||0);let p=e.userData._turretAngle||0,m=g-p;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;for(p+=m*.1;p>Math.PI;)p-=Math.PI*2;for(;p<-Math.PI;)p+=Math.PI*2;e.userData._turretAngle=p,a.rotation.y=p}const r=e.userData.conduit;r&&(r.rotation.z+=.012);const o=e.userData.hoverGlows;if(o)for(let _=0;_<o.length;_++){const g=_%4<2?0:Math.PI,p=o[_].material;p.userData||(p.userData={}),p.userData.baseOp==null&&(p.userData.baseOp=p.opacity),p.opacity=p.userData.baseOp+.08*Math.sin(n*3+i+g)}const c=e.userData.cannon,h=e.userData.cannonBaseZ||18;c&&(t.fireCooldown>1/t.fireRate-.12?c.position.z=h-3:c.position.z+=(h-c.position.z)*.08);const d=e.userData.muzzleFlash,l=e.userData.muzzleGlow;if(d){const _=t.fireCooldown>1/t.fireRate-.1;d.scale.setScalar(_?4:.4),l&&(l.material.opacity=_?.5:.05)}const u=e.userData.dome;if(u){const _=t.hp/t.maxHp;u.scale.setScalar(1+(1-_)*.6)}const f=e.userData.domeGlow;if(f){const _=t.hp/t.maxHp;f.material.opacity=.1+(1-_)*.25}}function Tw(e,t,n){const i=Gt(t),s=qt(t);R(e,new z(5,4,16),i,0,0,0),R(e,new z(2,1.5,12),i,0,2.5,-1),R(e,new z(6,1,14),i,0,-2.2,0);const a=R(e,new z(4.5,3,5),i,0,.5,9);a.rotation.x=-.2;const r=R(e,new z(3.8,1.2,.6),s,0,1.5,11.2);R(e,new z(4.2,1.6,.4),_t(t,.2),0,1.5,11.5),R(e,new z(3.5,1.5,3),i,0,-1.5,9.5);const o=new fe;o.position.set(0,-2.5,10),e.add(o),R(o,new z(2,1,2),i,0,0,0);const c=R(o,new ht(.3,.3,6,4),i,-.6,0,3);c.rotation.x=-Math.PI/2;const h=R(o,new ht(.3,.3,6,4),i,.6,0,3);h.rotation.x=-Math.PI/2;const d=R(o,new ct(.5,6,4),s,-.6,0,6),l=R(o,new ct(.5,6,4),s,.6,0,6),u=R(o,new ct(1.5,6,4),_t(t,.12),0,0,6);R(e,new z(3,3,7),i,-5,0,-1),R(e,new z(2.5,.3,6),s,-5,1.8,-1);const f=R(e,new ct(1,6,4),s,-5,0,-5),_=R(e,new ct(1.8,6,4),_t(t,.18),-5,0,-5);R(e,new z(3,3,7),i,5,0,-1),R(e,new z(2.5,.3,6),s,5,1.8,-1);const g=R(e,new ct(1,6,4),s,5,0,-5),p=R(e,new ct(1.8,6,4),_t(t,.18),5,0,-5);R(e,new z(.3,2,5),s,-6.7,0,-1),R(e,new z(.3,2,5),s,6.7,0,-1),R(e,new z(2.5,2,10),i,0,.5,-13),R(e,new z(1.5,1.5,5),i,0,.5,-19.5),R(e,new z(.3,.3,12),s,0,1.8,-14),R(e,new z(.5,5,3.5),i,0,4,-20.5),R(e,new z(.3,4,.3),s,0,4,-19);const m=R(e,new ct(.4,6,4),s,0,6.8,-20.5);R(e,new z(6,.5,2.5),i,0,1.5,-21),R(e,new z(5,.2,2),s,0,2,-21);const x=R(e,new ht(2.5,2.5,.3,12),_t(t,.15),.5,4,-22);x.rotation.z=Math.PI/2,R(e,new ct(.5,6,4),s,.5,4,-22),R(e,new ht(.8,1,3,6),i,0,4.5,0),R(e,new ct(1.2,6,4),s,0,6,0);const M=R(e,new ht(12,12,.3,24),_t(t,.1),0,6.5,0),y=R(e,new z(24,.15,1.2),s,0,6.5,0),b=R(e,new z(1.2,.15,24),s,0,6.5,0),E=new fe;E.position.y=0,e.add(E),e.remove(M),e.remove(y),e.remove(b),M.position.set(0,6.5,0),y.position.set(0,6.5,0),b.position.set(0,6.5,0),E.add(M),E.add(y),E.add(b),R(e,new ht(.2,.2,1.5,4),i,-3,-3.5,4),R(e,new ht(.2,.2,1.5,4),i,-3,-3.5,-2),R(e,new z(.4,.4,10),i,-3,-4.2,1),R(e,new ht(.2,.2,1.5,4),i,3,-3.5,4),R(e,new ht(.2,.2,1.5,4),i,3,-3.5,-2),R(e,new z(.4,.4,10),i,3,-4.2,1);const A=R(e,new Qt(8,.5,4,14),_t(t,.08),0,-4,0);if(A.rotation.x=Math.PI/2,n){const v=R(e,new Qt(12,.4,6,20),s,0,0,0);v.rotation.x=Math.PI/4,e.userData.threatRing=v}if(!n){const v=R(e,new Qt(14,.6,6,24),_t(new Ft(.2,.6,1),.5),0,-3,0);v.rotation.x=Math.PI/2,v.visible=!1,e.userData.selectRing=v}e.userData.accentParts=[r,d,l,f,g,m],e.userData.glowParts=[u,_,p,A,M],e.userData.rotorGroup=E,e.userData.tailRotor=x,e.userData.gunPivot=o,e.userData.muzzleFlash=d,e.userData.muzzleFlash2=l,e.userData.muzzleGlow=u,e.userData.unitType="helicopter"}function bw(e,t,n,i,s){const a=e.userData.rotorGroup;a&&(a.rotation.y+=.4);const r=e.userData.tailRotor;r&&(r.rotation.x+=.5),e.position.y=e.userData.baseY+Math.sin(n*2+i)*2;const o=t.x-e.userData.lastX;if(t.z-e.userData.lastZ,s>.5){const u=-o*.008;e.rotation.z+=(u-e.rotation.z)*.08;const f=-.08;e.rotation.x+=(f-e.rotation.x)*.06}else e.rotation.z*=.92,e.rotation.x*=.92;const c=e.userData.gunPivot;if(c&&t.targetX!==void 0&&t.targetZ!==void 0){const u=t.targetX-t.x,f=t.targetZ-t.z,_=e.userData.smoothAngle||0,g=Math.cos(_),p=Math.sin(_),m=u*g-f*p,x=u*p+f*g,M=Math.atan2(m,x);let y=e.userData._gunAngle||0,b=M-y;for(;b>Math.PI;)b-=Math.PI*2;for(;b<-Math.PI;)b+=Math.PI*2;for(y+=b*.15;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;e.userData._gunAngle=y,c.rotation.y=y}const h=e.userData.muzzleFlash,d=e.userData.muzzleFlash2,l=e.userData.muzzleGlow;if(h){const u=t.fireCooldown>1/t.fireRate-.06,f=Math.floor(n*10)%2===0;h.scale.setScalar(u&&f?3:.5),d&&d.scale.setScalar(u&&!f?3:.5),l&&(l.material.opacity=u?.4:.06)}}function Aw(e,t){const n=e===tt?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=new fe;return Rw(i,n),i.scale.setScalar(2.5),i.position.y=ah,t.add(i),i}function Tm(e,t){e&&(t.remove(e),e.traverse(n=>{n.isMesh&&(n.geometry.dispose(),n.material.dispose&&n.material.dispose())}))}function Rw(e,t,n){const i=Gt(t),s=qt(t);R(e,new z(6,4,28),i,0,0,0),R(e,new z(3,2,22),i,0,3,-2),R(e,new z(7,1.5,16),i,0,-2.5,0);const a=R(e,new z(5,3.5,6),i,0,1,15);a.rotation.x=-.15,R(e,new z(4,1.5,.6),s,0,2.5,17.5),R(e,new z(4.5,1.8,.4),_t(t,.25),0,2.5,17.8),R(e,new z(3.5,2.5,4),i,0,0,18),R(e,new z(18,.8,8),i,-12,0,-2),R(e,new z(16,.3,6),s,-12,.6,-2),R(e,new ct(.6,6,4),s,-21,0,-2),R(e,new z(18,.8,8),i,12,0,-2),R(e,new z(16,.3,6),s,12,.6,-2),R(e,new ct(.6,6,4),s,21,0,-2),R(e,new z(3,3,8),i,-8,-2,-1),R(e,new ct(1.2,6,4),s,-8,-2,-5.5),R(e,new ct(2,6,4),_t(t,.2),-8,-2,-5.5),R(e,new z(3,3,8),i,8,-2,-1),R(e,new ct(1.2,6,4),s,8,-2,-5.5),R(e,new ct(2,6,4),_t(t,.2),8,-2,-5.5),R(e,new z(2,2,8),i,0,1,-18),R(e,new z(.6,6,4),i,0,5,-20),R(e,new z(.3,5,.4),s,0,5,-18.5),R(e,new ct(.5,6,4),s,0,8.5,-20),R(e,new z(8,.5,3),i,0,2,-20),R(e,new z(7,.3,2.5),s,0,2.5,-20),R(e,new z(5,.3,10),_t(16768324,.15),0,-3.5,0),R(e,new ht(.8,.3,12,6),_t(t,.1),-8,-2,-12),R(e,new ht(.8,.3,12,6),_t(t,.1),8,-2,-12),e.userData.unitType="bomber"}function R(e,t,n,i,s,a){const r=new T(t,n);return i!==void 0&&r.position.set(i,s,a),e.add(r),r}const Cw=new Ft(1,1,1);function Bf(e,t){e.traverse(n=>{if(n.isMesh&&n.material.emissive){const i=n.material.userData?._origEmissive;i&&n.material.emissive.copy(i).lerp(Cw,t)}})}function Pw(e,t){const n=xp,i=Gt(n),s=qt(n);e.userData.unitType="medic",e.userData.baseY=3,e.userData.glowParts=[];const a=new fe;e.add(a),R(a,new ht(.9,1.2,4.5,6),i,-1.8,3,0),R(a,new ct(1,6,4),s,-1.8,1,.2),R(a,new ht(1.1,.8,4,6),i,-1.8,-1,.3),R(a,new z(2,1,3),i,-1.8,-3,.5),R(a,new z(1.6,.2,2.5),s,-1.8,-2.5,.5),e.userData._lLeg=a;const r=new fe;e.add(r),R(r,new ht(.9,1.2,4.5,6),i,1.8,3,0),R(r,new ct(1,6,4),s,1.8,1,.2),R(r,new ht(1.1,.8,4,6),i,1.8,-1,.3),R(r,new z(2,1,3),i,1.8,-3,.5),R(r,new z(1.6,.2,2.5),s,1.8,-2.5,.5),e.userData._rLeg=r,R(e,new ht(2.5,2.2,1.8,6),i,0,6,0);const o=R(e,new Qt(2.6,.25,4,12),s,0,5.3,0);o.rotation.x=Math.PI/2,R(e,new z(6,5.5,4.5),i,0,10,0);const c=R(e,new z(5.5,3.5,1),i,0,10.5,2.8);c.rotation.x=-.08,R(e,new z(4.5,1.2,.4),s,0,10.5,3.5),R(e,new z(1.2,4.5,.4),s,0,10.5,3.5);const h=R(e,new z(5.5,5.5,.15),_t(n,.18),0,10.5,3.3);e.userData.glowParts.push(h),R(e,new z(.7,4,3.5),i,-3.5,10,0),R(e,new z(.7,4,3.5),i,3.5,10,0),R(e,new z(3,2,3.5),i,-5,12.5,0),R(e,new z(2.5,.25,3),s,-5,13.7,0),R(e,new z(3,2,3.5),i,5,12.5,0),R(e,new z(1.8,.3,.3),s,5,13.2,1.8),R(e,new z(.3,1.8,.3),s,5,13.2,1.8),R(e,new ct(1,6,4),s,-5,11,.5),R(e,new ht(.7,.9,4,6),i,-5,8.8,1).rotation.x=-.15,R(e,new ct(.7,6,4),i,-5,7,1.2);const d=R(e,new ht(.3,.3,5,4),i,-4.5,7,4.5);d.rotation.x=-Math.PI/2;const l=R(e,new ct(.6,6,4),s,-4.5,7,7),u=R(e,new ct(1.2,6,4),_t(n,.2),-4.5,7,7);e.userData.glowParts.push(u),e.userData._injectorTip=l,R(e,new ct(1,6,4),s,5,11,.5),R(e,new ht(.7,.9,4,6),i,5,8.8,1).rotation.x=-.15,R(e,new ct(.7,6,4),i,5,7,1.2),R(e,new ht(.9,1.2,1.2,6),i,0,13.5,.2),R(e,new z(3.2,2.8,3.5),i,0,16,.2),R(e,new z(.7,1,3.2),i,0,17.6,.2),R(e,new z(3.3,.9,.5),s,0,16,2.2);const f=R(e,new z(3.6,1.2,.25),_t(n,.22),0,16,2.4);e.userData.glowParts.push(f),R(e,new ht(.12,.12,2.2,4),i,1.3,18.2,.2),R(e,new ct(.3,6,4),s,1.3,19.5,.2),R(e,new z(4.5,3.5,2.5),i,0,10.5,-3.5),R(e,new z(2.5,.5,.2),s,0,10.5,-2.3),R(e,new z(.5,2.5,.2),s,0,10.5,-2.3),R(e,new z(3.5,.15,.15),s,0,12,-2.3),R(e,new z(3.5,.15,.15),s,0,9,-2.3),R(e,new ht(.3,.3,2,4),s,-1.5,10.5,-2.5),R(e,new ht(.3,.3,2,4),s,1.5,10.5,-2.5);const _=new fe;_.position.set(0,22,0),e.add(_),R(_,new z(3.5,.8,.8),s,0,0,0),R(_,new z(.8,3.5,.8),s,0,0,0);const g=R(_,new ct(2.5,8,6),_t(n,.15),0,0,0);e.userData.glowParts.push(g),e.userData._drone=_;const p=R(e,new Qt(5.5,.5,4,14),s,0,.5,0);p.rotation.x=Math.PI/2;const m=new T(new er(0,1,32),_t(n,.06));if(m.rotation.x=-Math.PI/2,m.position.y=.3,m.visible=!1,e.add(m),e.userData._rangeCircle=m,t){const x=new T(new Qt(8,.5,4,16),qt(zt.RED));x.rotation.x=Math.PI/2,x.position.y=1,e.add(x),e.userData.threatRing=x}}function Dw(e,t){const n=vp,i=Gt(n),s=qt(n);e.userData.unitType="engineer",e.userData.baseY=2,e.userData.glowParts=[];const a=new fe;e.add(a),R(a,new ht(1.5,1.8,4.5,6),i,-3,3,0),R(a,new ct(1.3,6,4),s,-3,1,.2),R(a,new ht(1.6,1.2,4,6),i,-3,-1,.3),R(a,new z(3,1.5,4),i,-3,-3,.5),R(a,new z(2.5,.25,3.5),s,-3,-2.3,.5),e.userData._lLeg=a;const r=new fe;e.add(r),R(r,new ht(1.5,1.8,4.5,6),i,3,3,0),R(r,new ct(1.3,6,4),s,3,1,.2),R(r,new ht(1.6,1.2,4,6),i,3,-1,.3),R(r,new z(3,1.5,4),i,3,-3,.5),R(r,new z(2.5,.25,3.5),s,3,-2.3,.5),e.userData._rLeg=r,R(e,new ht(3.5,3,2,6),i,0,6,0);const o=R(e,new Qt(3.6,.35,4,12),s,0,5.2,0);o.rotation.x=Math.PI/2,R(e,new z(9,6,6),i,0,10.5,0),R(e,new z(8,4.5,1.2),i,0,11,3.5);const c=new T(new Qt(3,.8,3,8),s);c.rotation.x=Math.PI/2,c.position.set(0,11,4.3),e.add(c),e.userData.gearMesh=c,R(e,new ct(1.2,6,4),s,0,11,4.5);const h=R(e,new ct(3.5,8,6),_t(n,.12),0,11,4.2);e.userData.glowParts.push(h),R(e,new z(1,5,5),i,-5,10.5,0),R(e,new z(1,5,5),i,5,10.5,0),R(e,new z(.2,4,.3),s,-5.5,10.5,2),R(e,new z(.2,4,.3),s,5.5,10.5,2),R(e,new z(4.5,2.5,4.5),i,-7,13,0),R(e,new z(4,.3,4),s,-7,14.5,0),R(e,new z(4.5,2.5,4.5),i,7,13,0),R(e,new z(4,.3,4),s,7,14.5,0),R(e,new ct(1.3,6,4),s,-7,11.5,.5),R(e,new ht(1,1.2,4.5,6),i,-7,9,1).rotation.x=-.15,R(e,new ct(.9,6,4),i,-7,7,1.2),R(e,new z(1.5,1.5,4),i,-6.5,7,4);const d=R(e,new ct(.8,6,4),s,-6.5,7,6.5),l=R(e,new ct(1.5,6,4),_t(n,.2),-6.5,7,6.5);e.userData.glowParts.push(l),e.userData._weldTip=d,R(e,new ct(1.3,6,4),s,7,11.5,.5),R(e,new ht(1,1.2,4.5,6),i,7,9,1).rotation.x=-.15,R(e,new ct(.9,6,4),i,7,7,1.2),R(e,new ht(1.2,1.5,1.5,6),i,0,14.5,.2),R(e,new z(4.5,3.5,4.5),i,0,17,.2),R(e,new z(4.6,1.5,.5),s,0,17,2.6);const u=R(e,new z(5,1.8,.25),_t(n,.2),0,17,2.8);e.userData.glowParts.push(u),R(e,new ht(.15,.15,2.5,4),i,-1.8,19.5,.2),R(e,new ct(.35,6,4),s,-1.8,21,.2),R(e,new z(6,4.5,3),i,0,11,-4),R(e,new z(1.5,.3,.3),s,-1.5,13,-2.6),R(e,new z(1.5,.3,.3),s,1.5,13,-2.6),R(e,new z(1.5,.3,.3),s,-1.5,11.5,-2.6),R(e,new z(1.5,.3,.3),s,1.5,11.5,-2.6),R(e,new ct(1.2,6,4),s,0,11,-2.8);const f=R(e,new ct(2,6,4),_t(n,.14),0,11,-2.8);e.userData.glowParts.push(f);const _=R(e,new Qt(8,.6,4,14),s,0,.5,0);_.rotation.x=Math.PI/2;const g=new T(new er(0,1,32),_t(n,.06));if(g.rotation.x=-Math.PI/2,g.position.y=.3,g.visible=!1,e.add(g),e.userData._rangeCircle=g,t){const p=new T(new Qt(12,.5,4,16),qt(zt.RED));p.rotation.x=Math.PI/2,p.position.y=1,e.add(p),e.userData.threatRing=p}}const Iw=8;function Lw(e,t,n,i){const s=e.userData.unitType==="medic";e.position.y=e.userData.baseY+Math.sin(n*3+i)*1.2;const a=t.x-(e.userData.lastX||t.x),r=t.z-(e.userData.lastZ||t.z),o=a*a+r*r>.01;if(e.userData._lLeg&&e.userData._rLeg)if(o){const c=n*6+i;e.userData._lLeg.rotation.x=Math.sin(c)*.25,e.userData._rLeg.rotation.x=Math.sin(c+Math.PI)*.25}else e.userData._lLeg.rotation.x*=.85,e.userData._rLeg.rotation.x*=.85;if(e.userData.gearMesh){const c=t._healing?.08:.02;e.userData.gearMesh.rotation.z+=c}if(e.userData._drone){const c=e.userData._drone,h=t._healing?4:2,d=t._healing?3:5,l=n*h+i;c.position.x=Math.cos(l)*d,c.position.z=Math.sin(l)*d,c.position.y=22+Math.sin(n*2+i)*1,c.rotation.y=l}if(e.userData._rangeCircle){const c=e.userData._rangeCircle;if(c.visible=t._healing,c.visible){const h=t.healRange||80;c.scale.set(h,h,1),c.material.opacity=.03+.02*Math.sin(n*2+i)}}Uw(e,t,n,i,s)}function Uw(e,t,n,i,s){const a=s?xp:vp;if(!e.userData._healParticles){const c=[];for(let d=0;d<Iw;d++){const l=d%2===0?.8:1.4,u=d%2===0?qt(a):_t(a,.35),f=new T(new ct(l,6,4),u);f.visible=!1,e.add(f),c.push(f)}e.userData._healParticles=c;const h=new T(new Qt(3,.4,4,12),_t(a,.3));h.rotation.x=Math.PI/2,h.visible=!1,e.add(h),e.userData._healImpactRing=h}const r=e.userData._healParticles,o=e.userData._healImpactRing;if(t._healing&&t._healTargetX!==void 0){const c=t._healTargetX-t.x,h=t._healTargetZ-t.z;if(Math.sqrt(c*c+h*h)>1){for(let f=0;f<r.length;f++){const _=r[f];_.visible=!0;const p=(f+1)/(r.length+1);_.position.set(c*p,7+Math.sin(n*6+f*1.2+i)*1.5-7*p+4*p,h*p);const m=.7+.5*Math.sin(n*8+f*.8+i);_.scale.setScalar(m),_.material.transparent&&(_.material.opacity=.2+.2*Math.sin(n*6+f*1))}o.visible=!0,o.position.set(c,4,h),o.material.opacity=.2+.15*Math.sin(n*5+i),o.rotation.z=n*2;const u=.8+.3*Math.sin(n*4);o.scale.setScalar(u)}}else{for(let c=0;c<r.length;c++)r[c].visible=!1;o&&(o.visible=!1)}}function Nw(e){e.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const pi=new ct(1,8,6),Fw=new ht(1,1,1,6),Ow=new Qt(1,.2,4,10),zf=new Map;function Bw(e,t){const n=Math.round(t*20)/20,i=e*100+n;let s=zf.get(i);return s||(s=new Fn({color:e,transparent:!0,opacity:n}),zf.set(i,s)),s}function Hf(e,t){const n=e.team===tt?zt.PROJECTILE_PLAYER:zt.PROJECTILE_ENEMY,i=new fe;e.homing?Hw(i,e,n):zw(i,n),i.position.set(e.x,e.y,e.z),t.add(i),e.mesh=i}function zw(e,t){const n=new ct(1.2,8,6),i=new T(n,qt(t));e.add(i);const s=new ct(2.5,8,6),a=new T(s,_t(t,.25));e.add(a)}function Hw(e,t,n){const i=qt(n),s=_t(n,.3),a=t.turretLevel||0,r=t.turretBranch;if(r==="A"){const h=new T(Fw.clone(),i);h.scale.set(.6,4,.6),h.rotation.x=Math.PI/2,e.add(h);const d=new T(pi.clone(),s);d.scale.setScalar(1.2),e.add(d),e.userData.trailCount=3}else if(r==="B"){const h=new T(pi.clone(),i);h.scale.setScalar(2),e.add(h);const d=new T(pi.clone(),s);d.scale.setScalar(3.5),e.add(d);const l=[];for(let u=0;u<2;u++){const f=new T(pi.clone(),i.clone());f.scale.setScalar(.8),e.add(f),l.push(f)}e.userData.orbiters=l,e.userData.trailCount=8}else if(a>=2){const h=new T(pi.clone(),i);h.scale.setScalar(1.2),e.add(h);const d=new T(Ow.clone(),i.clone());d.scale.setScalar(2),e.add(d),e.userData.ring=d;const l=new T(pi.clone(),s);l.scale.setScalar(2.5),e.add(l),e.userData.trailCount=6}else if(a>=1){const h=new T(pi.clone(),i);h.scale.set(1,1,2.5),e.add(h);const d=new T(pi.clone(),s);d.scale.set(1.5,1.5,3),e.add(d),e.userData.trailCount=5}else{const h=new T(pi.clone(),i);h.scale.setScalar(1),e.add(h);const d=new T(pi.clone(),s);d.scale.setScalar(2),e.add(d),e.userData.trailCount=4}const o=e.userData.trailCount||4,c=[];for(let h=0;h<o;h++){const d=.35*(1-h/o),l=new T(pi.clone(),Bw(n,d));l.scale.setScalar(.6*(1-h/o*.5)),l.visible=!1,e.add(l),c.push(l)}e.userData.trails=c}function Gw(e,t){const n=e*1e3;for(let i=0;i<t.length;i++){const s=t[i];if(s.mesh&&(s.mesh.position.set(s.x,s.y,s.z),s.homing&&s.mesh.userData)){if(s.target&&s.target.alive){const a=s.target.x-s.x,r=s.target.z-s.z;s.mesh.rotation.y=Math.atan2(a,r)}if(s.mesh.userData.ring&&(s.mesh.userData.ring.rotation.z=n*.005),s.mesh.userData.orbiters){const a=n*.006,r=s.mesh.userData.orbiters;r[0]&&(r[0].position.x=Math.cos(a)*4,r[0].position.z=Math.sin(a)*4),r[1]&&(r[1].position.x=Math.cos(a+Math.PI)*4,r[1].position.z=Math.sin(a+Math.PI)*4)}if(s.mesh.userData.trails&&s.trail){const a=s.mesh.userData.trails,r=-(s.mesh.rotation.y||0),o=Math.cos(r),c=Math.sin(r);for(let h=0;h<a.length;h++){const d=s.trail.length-1-h;if(d>=0){a[h].visible=!0;const l=s.trail[d][0]-s.x,u=s.trail[d][1]-s.y,f=s.trail[d][2]-s.z;a[h].position.set(l*o-f*c,u,l*c+f*o)}}}}}}function bm(e,t){e.mesh&&(t.remove(e.mesh),kw(e.mesh),e.mesh=null)}function kw(e){e.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const Vw=200,Ww=30,Gf=new ct(1,6,4),kf=new z(1,1,1);let gi=[],ns=[];function Xw(e){gi=[],ns=[];for(let t=0;t<Vw;t++){const n=qt(zt.CYAN),i=new T(Gf,n);i.visible=!1,e.add(i);const s=_t(zt.CYAN,.4),a=new T(Gf,s);a.scale.setScalar(2),i.add(a),gi.push({mesh:i,mat:n,glow:a,glowMat:s,inUse:!1})}for(let t=0;t<Ww;t++){const n=qt(zt.CYAN),i=new T(kf,n);i.visible=!1,e.add(i);const s=_t(zt.CYAN,.3),a=new T(kf,s);a.scale.setScalar(1.6),i.add(a),ns.push({mesh:i,mat:n,glow:a,glowMat:s,inUse:!1})}}function qw(e,t){for(let s=0;s<gi.length;s++)gi[s].inUse=!1;for(let s=0;s<ns.length;s++)ns[s].inUse=!1;let n=0,i=0;for(let s=0;s<t.length;s++){const a=t[s],r=1-a.life/a.maxLife;if(a.type==="wallBreak"){if(i>=ns.length)continue;const d=ns[i++];d.inUse=!0;const l=a.size*(1-r*.5),u=(1-r)*(1-r);d.mesh.visible=!0,d.mesh.position.set(a.x,a.y,a.z),d.mesh.scale.set(Math.max(l*.7,.1),Math.max(l*.5,.1),Math.max(l,.1));const f=(a.rotSpeed||0)*r*3;d.mesh.rotation.set(f*.7,f,f*.4),d.mat.color.set(a.color),d.glowMat.color.set(a.color),d.glowMat.opacity=u*.3;continue}if(a.type==="wallRepair"){if(n>=gi.length)continue;const d=gi[n++];d.inUse=!0;const l=Math.min(1,r*6),u=1-r,f=l*u,_=a.size*(.5+.5*l)*u;d.mesh.visible=!0,d.mesh.position.set(a.x,a.y,a.z),d.mesh.scale.setScalar(Math.max(_,.1)),d.mat.color.set(a.color),d.glowMat.color.set(a.color),d.glowMat.opacity=f*.5;continue}if(n>=gi.length)continue;const o=gi[n++];o.inUse=!0;const c=a.size*(1-r*.6),h=1-r;o.mesh.visible=!0,o.mesh.position.set(a.x,a.y,a.z),o.mesh.scale.setScalar(Math.max(c,.1)),o.mat.color.set(a.color),o.glowMat.color.set(a.color),o.glowMat.opacity=h*.4}for(let s=0;s<gi.length;s++)gi[s].inUse||(gi[s].mesh.visible=!1);for(let s=0;s<ns.length;s++)ns[s].inUse||(ns[s].mesh.visible=!1)}const Er=[];let Nh=null,Go=0;function Yw(e){Nh=e,Er.length=0,Go=0}function $w(e,t,n,i){const a=new fe,r=new Qt(1,.8,8,32),o=qt(n),c=new T(r,o);c.rotation.x=Math.PI/2,a.add(c);const h=new Qt(1,2.5,8,32),d=_t(n,.4),l=new T(h,d);l.rotation.x=Math.PI/2,a.add(l);const u=new Eh(1,32),f=_t(16777215,.5),_=new T(u,f);_.rotation.x=-Math.PI/2,_.position.y=1,a.add(_),a.position.set(e,6,t),Nh.add(a),Er.push({type:"airStrikeRing",group:a,ringMat:o,glowMat:d,discMat:f,targetRadius:i,life:1.2,maxLife:1.2})}function Zw(e){const t=Go>0?Math.min(e-Go,.05):0;Go=e;for(let n=Er.length-1;n>=0;n--){const i=Er[n];if(i.life-=t,i.life<=0){Nh.remove(i.group),i.group.traverse(a=>{a.isMesh&&(a.geometry.dispose(),a.material.dispose())}),Er.splice(n,1);continue}const s=1-i.life/i.maxLife;if(i.type==="beam"){const a=1-s;i.outerMat.opacity=.15*a,i.innerMat.color.lerp(new Ft(16777215),s*.3)}if(i.type==="ring"){const a=1+s*(i.targetRadius-1);i.group.scale.set(a,1,a);const r=(1-s)*(1-s);i.glowMat.opacity=.3*r}if(i.type==="airStrikeRing"){const r=1+(1-(1-s)*(1-s))*(i.targetRadius-1);i.group.scale.set(r,1,r);const o=(1-s)*(1-s);if(i.glowMat.opacity=.4*o,i.discMat){i.discMat.opacity=.5*o*o;const c=i.group.children[2];c&&c.scale.set(r*.8,r*.8,1)}}}}const Ul=[Me,Ce,ye,oe,tn,ie],Fh={[Me]:{times:W0,branchTime:X0,hpPerLevel:q0,hpBranch:Y0},[Ce]:{times:Z0,branchTime:j0,hpPerLevel:K0,hpBranch:J0},[ye]:{times:Q0,branchTime:t_,hpPerLevel:e_,hpBranch:n_},[oe]:{times:i_,branchTime:s_,hpPerLevel:a_,hpBranch:r_},[tn]:{times:o_,branchTime:l_,hpPerLevel:c_,hpBranch:d_},[ie]:{times:h_,branchTime:0,hpPerLevel:u_,hpBranch:f_}};let sa=[],Hr=!0,Bd=[],ko=0;function hl(e,t,n,i,s){const a=se[e];if(!a)return null;const{x:r,z:o}=pn(t,n,Z),c=(a.size-1)*Z/2,h=Ul.includes(e),d={id:Yr(),type:e,col:t,row:n,team:i,hp:a.hp,maxHp:a.hp,x:r+c,z:o+c,buildProgress:0,buildTime:a.buildTime,producing:!1,produceTimer:0,alive:!0,fireCooldown:0,idOffset:Math.random()*Math.PI*2,level:0,branch:null,constructionState:h?"building":null,constructionTimer:0,constructionDuration:a.buildTime,fireTimer:0,target:null,angle:0,lastFireTime:0,totalDamage:0,kills:0,investedCost:s??a.cost,orientation:e===ie?la:null,airStrikeCooldownUntil:0,supportCooldownUntil:0,_activeSupportUnitId:null},l=e===ie?kn:th;for(let u=n;u<n+a.size;u++)for(let f=t;f<t+a.size;f++)um(f,u,l);return sa.push(d),Hr=!0,d}function Am(e){if(e.type!==Me)return null;const t=se[Me];return e.branch?t.branches[e.branch]:t.levels[e.level]}function Rm(e){if(e.type!==Ce&&e.type!==ye&&e.type!==tn)return null;const t=se[e.type];return t.levels?e.branch?t.branches[e.branch]:t.levels[e.level]:null}function Cm(e){if(e.type!==oe)return null;const t=se[oe];return t.levels?e.branch?t.branches[e.branch]:t.levels[e.level]:null}function Pm(e){if(e.type===ie)return se[ie].levels[e.level].hp;const t=Fh[e.type];if(!t)return se[e.type].hp;const n=se[e.type].hp;return e.branch?Math.round(n*(1+t.hpPerLevel*2+t.hpBranch)):Math.round(n*(1+t.hpPerLevel*e.level))}function Qr(e){if(!Ul.includes(e.type))return!1;const t=se[e.type];return t.levels?e.level<t.levels.length-1&&e.branch===null&&!e.constructionState&&!e._repairing:!1}function jw(e){return e.type===Me&&Qr(e)}function to(e){if(!Ul.includes(e.type)||e.type===ie)return!1;const t=se[e.type];return!t.levels||!t.branches?!1:e.level>=t.levels.length-1&&e.branch===null&&!e.constructionState&&!e._repairing}function Kw(e){return e.type===Me&&to(e)}function Oh(e){return Qr(e)?se[e.type].levels[e.level+1].upgradeCost:1/0}function wr(e,t){if(!to(e))return 1/0;const n=se[e.type].branches;return!n||!n[t]?1/0:n[t].cost}function Bh(e){const t=Fh[e.type];t&&(e.constructionState="upgrading",e.constructionTimer=0,e.constructionDuration=t.times[e.level+1])}function Jw(e){Bh(e)}function zh(e,t){const n=Fh[e.type];n&&(e.constructionState="branching",e.constructionTimer=0,e.constructionDuration=n.branchTime,e._pendingBranchKey=t)}function Qw(e,t){zh(e,t)}function tT(e){return Gr(e)}function eT(e){return kr(e)}function nT(e){ul(e)}function Gr(e){return!(!e||!e.alive||e.type===Rn||e.hp>=e.maxHp||e.constructionState||e._repairing)}function kr(e){if(!e)return 0;const t=e.maxHp-e.hp;return t<=0?0:Math.max(G_,Math.ceil(z_*t))}function ul(e){e._repairing=!0,e._repairTimer=0,e._repairDuration=H_,e._repairStartHp=e.hp,e._repairTargetHp=e.maxHp}function Dm(e,t){e.type!==ie||!e.alive||(e.orientation=t,e._orientationChanged=!0)}function iT(e){if(!e.alive||e.team!==tt)return 0;const t=Math.floor(e.investedCost*_p);return kh(e),t}function fl(e,t){return!(!e||!e.alive||e.type!==tn||!e.branch||e.constructionState||t<e.airStrikeCooldownUntil)}function Im(e,t){e.airStrikeCooldownUntil=t+k_}function Hh(e,t){return!(!e||!e.alive||e.type!==Ce||!e.branch||e.constructionState||e._activeSupportUnitId!=null||t<e.supportCooldownUntil)}function Lm(e,t,n){e._activeSupportUnitId=n,e.supportCooldownUntil=t+ng}function Gh(e,t){return!(!e||!e.alive||e.type!==ye||!e.branch||e.constructionState||e._activeSupportUnitId!=null||t<e.supportCooldownUntil)}function Um(e,t,n){e._activeSupportUnitId=n,e.supportCooldownUntil=t+ig}function Nm(e){e&&(e._activeSupportUnitId=null)}function sT(e){e.level++;const t=e.maxHp;e.maxHp=Pm(e),e.hp+=e.maxHp-t,e.investedCost+=se[e.type].levels[e.level].upgradeCost}function aT(e){e.branch=e._pendingBranchKey,e._pendingBranchKey=null;const t=e.maxHp;e.maxHp=Pm(e),e.hp+=e.maxHp-t,e.investedCost+=se[e.type].branches[e.branch].cost}function rT(e,t,n){const i=[];for(let s=0;s<sa.length;s++){const a=sa[s];if(!a.alive)continue;const r=se[a.type],o=Ul.includes(a.type);if(o&&a.constructionState){if(a.constructionTimer+=e,a.constructionState==="building"&&(a.buildProgress=a.constructionTimer),a.constructionTimer>=a.constructionDuration){const c=a.constructionState;c==="upgrading"?sT(a):c==="branching"?aT(a):c==="repairing"&&(a.hp=a.maxHp,a._justRepaired=!0),a.constructionState=null,c==="building"&&(a.buildProgress=a.buildTime),(c==="upgrading"||c==="branching"||c==="repairing")&&i.push(a)}continue}if(!o&&a.buildProgress<a.buildTime){a.buildProgress+=e,a.buildProgress>a.buildTime&&(a.buildProgress=a.buildTime);continue}if(a._repairing){a._repairTimer+=e;const c=Math.min(a._repairTimer/a._repairDuration,1);a.hp=a._repairStartHp+(a._repairTargetHp-a._repairStartHp)*c,c>=1&&(a.hp=a._repairTargetHp,a._repairing=!1,a._justRepaired=!0,i.push(a))}if(r.produceUnit&&r.produceTime){const c=Rm(a),h=c?c.produceTime:r.produceTime,d=c&&c.produceUnit?c.produceUnit:r.produceUnit;if(a.produceTimer+=e,a.produceTimer>=h){a.produceTimer-=h;const l=a.team===tt?-40:40;if(n&&n.createUnit){const u=c?{hpMult:c.hpMult||1,damageMult:c.damageMult||1,speedMult:c.speedMult||1,rangeMult:c.rangeMult||1,level:a.level,branch:a.branch}:null;n.createUnit(d,a.x,a.z+l,a.team,u,a.id)}}}}return i}function fn(){return Hr&&(Bd=sa.filter(e=>e.alive),Hr=!1,ko=0),ko++,ko%60===0&&(sa=sa.filter(e=>e.alive)),Bd}function kh(e){e.alive=!1,Hr=!0;const t=se[e.type];if(t)for(let n=e.row;n<e.row+t.size;n++)for(let i=e.col;i<e.col+t.size;i++)um(i,n,Ke);e.type===ie&&(e._wallDestroyed=!0)}function oT(){sa=[],Hr=!0,Bd=[],ko=0}let Ne=[],Vr=!0,zd=[],Vo=0,ts=0;const wc=new rh(__);function pl(e,t,n,i,s=null){const a=Zo[e];if(!a)return null;const r=s&&s.hpMult||1,o=s&&s.damageMult||1,c=s&&s.speedMult||1,h=s&&s.rangeMult||1,d=Math.round(a.hp*r),l=Math.round(a.damage*o),u=a.speed*c,f=Math.round(a.range*h),_={id:Yr(),type:e,team:i,x:t,z:n,hp:d,maxHp:d,speed:u,damage:l,range:f,fireRate:a.fireRate,size:a.size,fireCooldown:0,path:null,pathIndex:0,targetId:null,alive:!0,inCombat:!1,rallyHold:!1,rallyX:0,rallyZ:0,_rallyAssigned:!1,_stuckTime:0,_lastProgressX:t,_lastProgressZ:n,idOffset:Math.random()*Math.PI*2,upgradeLevel:s&&s.level||0,upgradeBranch:s&&s.branch||null,stance:dn,targetPriority:"any",squadId:null,_defendTargetId:null,squadRallyX:null,squadRallyZ:null,_wallTarget:null,selected:!1,squadHighlight:!1,isSupport:!!a.isSupport,healRate:a.healRate||0,healRange:a.healRange||0,healTargets:a.healTargets||null,_healTargetId:null,_parentBuildingId:null,_healing:!1};return e===xn&&(_.isAir=!0,_.orbitX=t,_.orbitZ=n,_.orbitAngle=Math.random()*Math.PI*2,_.flyHeight=Sl,_.orbitRadius=s0),Ne.push(_),Vr=!0,_}function lT(e,t){const n=t&&t.getUnits?t.getUnits():[],i=t&&t.getBuildings?t.getBuildings():[],s=t&&t.combatUnitHash,a=t&&t.combatBuildingHash,r=pn(As,Ii,Z),o=pn(li,bn,Z);let c=!1,h=!1;for(let d=0;d<n.length;d++){const l=n[d];if(l.alive&&(l.team===kt?!c&&jt(l.x,l.z,r.x,r.z)<=Nc&&(c=!0):!h&&jt(l.x,l.z,o.x,o.z)<=Nc&&(h=!0),c&&h))break}for(let d=0;d<Ne.length;d++){const l=Ne[d];if(!l.alive||l.inCombat||l.isAir)continue;jt(l.x,l.z,l._lastProgressX,l._lastProgressZ)>=u0?(l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z):l.path&&l.pathIndex<l.path.length&&(l._stuckTime+=e)}for(let d=0;d<Ne.length;d++){const l=Ne[d];!l.alive||l.isAir||(l._prevX=l.x,l._prevZ=l.z)}for(let d=0;d<Ne.length;d++){const l=Ne[d];if(!l.alive)continue;if(l.isAir){l.fireCooldown>0&&(l.fireCooldown-=e,l.fireCooldown<0&&(l.fireCooldown=0)),hT(l,e);continue}if(l.isSupport){dT(l,e,n,t);continue}if(l.fireCooldown>0&&(l.fireCooldown-=e,l.fireCooldown<0&&(l.fireCooldown=0)),l._stuckTime>=h0&&l.id%4===ts%4){const p=on(l.x,l.z,Z),m=3+Math.floor(Math.random()*3),x=Math.random()*Math.PI*2,M=Math.max(0,Math.min(Vt-1,p.col+Math.round(Math.cos(x)*m))),y=Math.max(0,Math.min(je-1,p.row+Math.round(Math.sin(x)*m))),b=ze(M,y);if((b===Ke||b===Vn)&&t&&t.findPath){const E=t.findPath(p.col,p.row,M,y);E&&E.length>0&&(l.path=E,l.pathIndex=0)}l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z}{const p=l.team===tt?kt:tt;let m=!1;if(s){const x=s.queryNear(l.x,l.z);for(let M=0;M<x.length;M++){const y=x[M];if(!(!y.alive||y.team!==p)&&jt(l.x,l.z,y.x,y.z)<=l.range){m=!0;break}}}if(!m&&a){const x=a.queryNear(l.x,l.z);for(let M=0;M<x.length;M++){const y=x[M];if(!(!y.alive||y.team!==p)&&jt(l.x,l.z,y.x,y.z)<=l.range){m=!0;break}}}if(l.inCombat=m,m&&l.stance!==ra)continue}const u=l.team===tt?c:h,f=l.team===tt?r:o;if(u&&l.stance===dn&&jt(l.x,l.z,f.x,f.z)<=m0){l.rallyHold&&(l.rallyHold=!1);const m=l.team===tt?As:li,x=l.team===tt?Ii:bn,M=m+(l.id%5-2),y=x+(l.id%3-1),b=Math.max(0,Math.min(Vt-1,M)),E=Math.max(0,Math.min(je-1,y));if(!l.path||l.pathIndex>=l.path.length||!l._defending){const A=on(l.x,l.z,Z);if(t&&t.findPath){const v=t.findPath(A.col,A.row,b,E);v&&v.length>0&&(l.path=v,l.pathIndex=0)}}if(l._defending=!0,l.path&&l.pathIndex<l.path.length){const A=l.path[l.pathIndex],v=pn(A.col,A.row,Z),w=v.x-l.x,D=v.z-l.z,C=Math.sqrt(w*w+D*D);if(C<Z/2)l.pathIndex++;else{const L=l.speed*e,U=Math.min(L,C);l.x+=w/C*U,l.z+=D/C*U}}continue}if(l._defending&&!u&&(l._defending=!1,l.path=null,l.pathIndex=0),l.stance===Cr)continue;if(l.stance===aa){const p=l.team===tt?As:li,m=l.team===tt?Ii:bn,x=l.team===tt?r:o,M=l.team===tt?kt:tt;let y=null,b=1/0;if(s){const E=s.queryNear(x.x,x.z);for(let A=0;A<E.length;A++){const v=E[A];if(!v.alive||v.team!==M||jt(v.x,v.z,x.x,x.z)>xu)continue;const D=jt(l.x,l.z,v.x,v.z);D<b&&(b=D,y=v)}}if(!y&&a){const E=a.queryNear(x.x,x.z);for(let A=0;A<E.length;A++){const v=E[A];if(!v.alive||v.team!==M||jt(v.x,v.z,x.x,x.z)>xu)continue;const D=jt(l.x,l.z,v.x,v.z);D<b&&(b=D,y=v)}}if(y){if((l._defendTargetId!==y.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const A=on(l.x,l.z,Z),v=on(y.x,y.z,Z);if(t&&t.findPath){const w=t.findPath(A.col,A.row,v.col,v.row);w&&w.length>0&&(l.path=w,l.pathIndex=0)}l._defendTargetId=y.id}}else{l._defendTargetId!==null&&(l.path=null,l.pathIndex=0,l._defendTargetId=null);const E=l.team===tt?m-gu:m+gu,A=pn(p,E,Z);if(jt(l.x,l.z,A.x,A.z)<L_)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const w=on(l.x,l.z,Z);if(t&&t.findPath){const D=t.findPath(w.col,w.row,p,E);D&&D.length>0&&(l.path=D,l.pathIndex=0)}}}if(l.path&&l.pathIndex<l.path.length){const E=l.path[l.pathIndex],A=pn(E.col,E.row,Z),v=A.x-l.x,w=A.z-l.z,D=Math.sqrt(v*v+w*w);if(D<Z/2)l.pathIndex++;else{const C=l.speed*e,L=Math.min(C,D);l.x+=v/D*L,l.z+=w/D*L}}continue}if(l.stance===ra&&l.squadRallyX!=null){const p=l.squadRallyX,m=l.squadRallyZ,x=l.team===tt?kt:tt;let M=null,y=1/0;if(s){const b=s.queryNear(p,m);for(let E=0;E<b.length;E++){const A=b[E];if(!A.alive||A.team!==x||jt(A.x,A.z,p,m)>vu)continue;const w=jt(l.x,l.z,A.x,A.z);w<y&&(y=w,M=A)}}if(!M&&a){const b=a.queryNear(p,m);for(let E=0;E<b.length;E++){const A=b[E];if(!A.alive||A.team!==x||jt(A.x,A.z,p,m)>vu)continue;const w=jt(l.x,l.z,A.x,A.z);w<y&&(y=w,M=A)}}if(M){if((l._defendTargetId!==M.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const E=on(l.x,l.z,Z),A=on(M.x,M.z,Z);if(t&&t.findPath){const v=t.findPath(E.col,E.row,A.col,A.row);v&&v.length>0&&(l.path=v,l.pathIndex=0)}l._defendTargetId=M.id}}else{if(jt(l.x,l.z,p,m)<U_){l._defendTargetId=null;continue}if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const E=on(l.x,l.z,Z),A=on(p,m,Z);if(t&&t.findPath){const v=t.findPath(E.col,E.row,A.col,A.row);v&&v.length>0&&(l.path=v,l.pathIndex=0)}l._defendTargetId=null}}if(l.path&&l.pathIndex<l.path.length){const b=l.path[l.pathIndex],E=pn(b.col,b.row,Z),A=E.x-l.x,v=E.z-l.z,w=Math.sqrt(A*A+v*v);if(w<Z/2)l.pathIndex++;else{const D=l.speed*e,C=Math.min(D,w);l.x+=A/w*C,l.z+=v/w*C}}continue}if(l.rallyHold){if(jt(l.x,l.z,l.rallyX,l.rallyZ)<50)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const m=on(l.x,l.z,Z),x=on(l.rallyX,l.rallyZ,Z);if(t&&t.findPath){const M=t.findPath(m.col,m.row,x.col,x.row);M&&M.length>0&&(l.path=M,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const m=l.path[l.pathIndex],x=pn(m.col,m.row,Z),M=x.x-l.x,y=x.z-l.z,b=Math.sqrt(M*M+y*y);if(b<Z/2)l.pathIndex++;else{const E=l.speed*e,A=Math.min(E,b);l.x+=M/b*A,l.z+=y/b*A}}continue}const _=l.team===tt?li:As,g=l.team===tt?bn:Ii;if(l._wallTarget&&(!l._wallTarget.alive||l._wallTarget._wallDestroyed)&&(l._wallTarget=null,l.path=null,l.pathIndex=0),(!l.path||l.pathIndex>=l.path.length)&&l.id%4===ts%4){const p=on(l.x,l.z,Z);if(t&&t.findPathThroughWalls){const m=t.findPathThroughWalls(p.col,p.row,_,g);if(m&&m.length>0){if(l._wallTarget=uT(m,i,l.team),l._wallTarget){const x=on(l._wallTarget.x,l._wallTarget.z,Z),M=t.findPath?t.findPath(p.col,p.row,x.col,x.row):null;l.path=M&&M.length>0?M:m}else l.path=m;l.pathIndex=0}}else if(t&&t.findPath){const m=t.findPath(p.col,p.row,_,g);m&&m.length>0&&(l.path=m,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const p=l.path[l.pathIndex],m=pn(p.col,p.row,Z),x=m.x-l.x,M=m.z-l.z,y=Math.sqrt(x*x+M*M);if(y<Z/2)l.pathIndex++;else{const b=l.speed*e,E=Math.min(b,y);l.x+=x/y*E,l.z+=M/y*E}}}wc.clear();for(let d=0;d<Ne.length;d++)Ne[d].alive&&!Ne[d].isAir&&wc.insert(Ne[d]);for(let d=0;d<Ne.length;d++){const l=Ne[d];if(!l.alive||l.isAir)continue;const u=l.size*au,f=wc.queryNear(l.x,l.z);for(let _=0;_<f.length;_++){const g=f[_];if(g.id<=l.id)continue;const p=g.size*au,m=u+p,x=g.x-l.x,M=g.z-l.z,y=Math.sqrt(x*x+M*M);if(y<m&&y>.01){const b=m-y,E=Math.min(b,d0*e),A=x/y,v=M/y,w=E*.5;l.x-=A*w,l.z-=v*w,g.x+=A*w,g.z+=v*w}else if(y<=.01){const b=Math.random()*Math.PI*2,E=2;l.x+=Math.cos(b)*E,l.z+=Math.sin(b)*E}}}for(let d=0;d<Ne.length;d++){const l=Ne[d];if(!l.alive||l.isAir)continue;l.x=Math.max(1,Math.min(l.x,Vt*Z-1)),l.z=Math.max(1,Math.min(l.z,je*Z-1));const u=Math.floor(l.x/Z),f=Math.floor(l.z/Z),_=ze(u,f);if(_!==Ke&&_!==Vn){const g=Math.floor(l._prevX/Z),p=Math.floor(l._prevZ/Z),m=ze(g,p);(m===Ke||m===Vn)&&(l.x=l._prevX,l.z=l._prevZ)}}ts++}function Oe(){return Vr&&(zd=Ne.filter(e=>e.alive),Vr=!1,Vo=0),Vo++,Vo%60===0&&(Ne=Ne.filter(e=>e.alive)),zd}function Fm(e){e.alive=!1,Vr=!0}const cT=1.35,Tc=40,Vf=25,Wf=30,Xf=8;function dT(e,t,n,i){e._supportLastPathX===void 0&&(e._supportLastPathX=0,e._supportLastPathZ=0,e._supportFollowId=null);const s=e._healing;e._healing=!1;let a=null,r=0;const o=e.id%Xf===ts%Xf;if(e._healTargetId!=null){let c=!1;for(let h=0;h<n.length;h++){const d=n[h];if(d.id===e._healTargetId&&d.alive&&d.hp<d.maxHp){c=!0,a=d,r=d.maxHp-d.hp;break}}c||(e._healTargetId=null,e.path=null,e.pathIndex=0)}if(o){let c=a;for(let h=0;h<n.length;h++){const d=n[h];if(!d.alive||d.team!==e.team||d.isSupport||d.hp>=d.maxHp||!e.healTargets||!e.healTargets.includes(d.type))continue;const l=d.maxHp-d.hp;l>r&&(r=l,a=d)}a&&a!==c&&(e._healTargetId=a.id,e.path=null,e.pathIndex=0)}if(a){const c=jt(e.x,e.z,a.x,a.z),h=s?e.healRange*cT:e.healRange;if(c<=h){e._healing=!0,e._healTargetX=a.x,e._healTargetZ=a.z;const d=e.healRate*t;a.hp=Math.min(a.maxHp,a.hp+d),e.path=null,e.pathIndex=0}else if(o&&i&&i.findPath){const d=jt(e._supportLastPathX,e._supportLastPathZ,a.x,a.z);if(!e.path||e.pathIndex>=e.path.length||d>Vf){const u=on(e.x,e.z,Z),f=on(a.x,a.z,Z),_=i.findPath(u.col,u.row,f.col,f.row);_&&_.length>0&&(e.path=_,e.pathIndex=0,e._supportLastPathX=a.x,e._supportLastPathZ=a.z)}}}else if(e._healTargetId=null,o&&i&&i.findPath){let c=0,h=0,d=0,l=1/0;for(let u=0;u<n.length;u++){const f=n[u];if(!f.alive||f.team!==e.team||f.isSupport||f.isAir||!e.healTargets||!e.healTargets.includes(f.type))continue;const _=jt(e.x,e.z,f.x,f.z);_<l&&(l=_),_<300&&(c+=f.x,h+=f.z,d++)}if(d>0&&l>Tc){const u=c/d,f=h/d,g=(e.team===tt?Ii:bn)*Z,p=0,m=g-f,x=Math.abs(m)||1,M=u+p/x*Tc*.5,y=f+m/x*Tc*.5,b=jt(e._supportLastPathX,e._supportLastPathZ,M,y);if(!e.path||e.pathIndex>=e.path.length||b>Vf*2){const A=on(e.x,e.z,Z),v=on(M,y,Z);v.col=Math.max(0,Math.min(Vt-1,v.col)),v.row=Math.max(0,Math.min(je-1,v.row));const w=i.findPath(A.col,A.row,v.col,v.row);w&&w.length>0&&(e.path=w,e.pathIndex=0,e._supportLastPathX=M,e._supportLastPathZ=y)}}}if(e.path&&e.pathIndex<e.path.length&&!e._healing){const c=e.path[e.pathIndex],h=pn(c.col,c.row,Z),d=h.x-e.x,l=h.z-e.z,u=Math.sqrt(d*d+l*l);if(u<Z/2)e.pathIndex++;else{let f=e.speed*t;if(a){const g=jt(e.x,e.z,a.x,a.z),p=g<Wf?.4+.6*(g/Wf):1;f*=p}const _=Math.min(f,u);e.x+=d/u*_,e.z+=l/u*_}}}function hT(e,t){if(e.targetOrbitX!==void 0){const a=e.targetOrbitX-e.orbitX,r=e.targetOrbitZ-e.orbitZ,o=Math.sqrt(a*a+r*r);if(o>1){const c=E_*t;c>=o?(e.orbitX=e.targetOrbitX,e.orbitZ=e.targetOrbitZ):(e.orbitX+=a/o*c,e.orbitZ+=r/o*c)}}const n=e.orbitX-e.x,i=e.orbitZ-e.z,s=Math.sqrt(n*n+i*i);if(s>e.orbitRadius+20){const a=r0*t,r=Math.min(a,s);e.x+=n/s*r,e.z+=i/s*r,e._orbiting=!1}else e._orbiting||(e._orbiting=!0,e._curOrbitR=Math.max(s,5),e.orbitAngle=Math.atan2(e.z-e.orbitZ,e.x-e.orbitX)),e._curOrbitR+=(e.orbitRadius-e._curOrbitR)*Math.min(1,2*t),e.orbitAngle+=a0*t,e.x=e.orbitX+Math.cos(e.orbitAngle)*e._curOrbitR,e.z=e.orbitZ+Math.sin(e.orbitAngle)*e._curOrbitR}function Hd(e,t,n){for(let i=0;i<Ne.length;i++)if(Ne[i].id===e&&Ne[i].alive&&Ne[i].isAir)return Ne[i].targetOrbitX=t,Ne[i].targetOrbitZ=n,!0;return!1}function Gd(){return Ne.filter(e=>e.alive&&e.isAir)}function uT(e,t,n){const i=n===tt?kt:tt;for(let s=0;s<e.length;s++){const a=e[s];for(let r=0;r<t.length;r++){const o=t[r];if(!(!o.alive||o.type!==ie||o.team!==i)&&o.col===a.col&&o.row===a.row)return o}}return null}function fT(){Ne=[],Vr=!0,zd=[],Vo=0}let Ds=[],ar=!0,kd=[],Wo=0;function pT(e,t,n,i,s,a,r){const o=n-e,c=i-t,h=Math.sqrt(o*o+c*c);if(h===0)return null;const d=o/h*eu,l=c/h*eu,u={id:Yr(),x:e,z:t,y:r??15,tx:n,tz:i,team:s,damage:a,vx:d,vz:l,life:o0,alive:!0,homing:!1};return Ds.push(u),ar=!0,u}function mT(e,t,n,i,s,a,r,o,c,h,d){const l={id:Yr(),x:e,z:t,y:n||20,team:s,damage:a,alive:!0,homing:!0,target:i,speed:$0,trail:[],sourceBuilding:r,splashRadius:o||0,splashDamage:c||0,life:3,turretLevel:h||0,turretBranch:d||null};return Ds.push(l),ar=!0,l}function _T(e){const t=[];for(let n=0;n<Ds.length;n++){const i=Ds[n];if(!i.alive){t.push(i);continue}if(i.homing){gT(i,e),i.alive||t.push(i);continue}i.x+=i.vx*e,i.z+=i.vz*e,i.life-=e;const s=i.tx-i.x,a=i.tz-i.z;if(s*s+a*a<100){i.alive=!1,t.push(i);continue}i.life<=0&&(i.alive=!1,t.push(i))}return t.length>0&&(ar=!0),t}function gT(e,t){if(!e.target||!e.target.alive){e.splashRadius>0&&qf(e),e.alive=!1;return}e.trail.push([e.x,e.y,e.z]),e.trail.length>6&&e.trail.shift();const n=e.target.x-e.x,i=e.target.z-e.z,s=Math.sqrt(n*n+i*i);if(s<e.speed*t+5){e.target.hp-=e.damage,e.target.hitFlashTimer=za,e.sourceBuilding&&(e.sourceBuilding.totalDamage+=e.damage,e.target.hp<=0&&(e.sourceBuilding.kills+=1)),e.splashRadius>0&&qf(e),e.hitTarget=!0,e.alive=!1;return}e.x+=n/s*e.speed*t,e.z+=i/s*e.speed*t,e.life-=t,e.life<=0&&(e.alive=!1)}function qf(e){e.splashHit=!0,e.splashX=e.target?e.target.x:e.x,e.splashZ=e.target?e.target.z:e.z}function Vd(){return ar&&(kd=Ds.filter(e=>e.alive),ar=!1,Wo=0),Wo++,Wo%60===0&&(Ds=Ds.filter(e=>e.alive)),kd}function xT(){Ds=[],ar=!0,kd=[],Wo=0}const Es=new rh(fp),Ba=new rh(fp);function Yf(e,t,n){const i=(1-n/e.range)*p0,a=(1-t.hp/t.maxHp)*f0,r=e.stance===ra?"rally":e.targetPriority||oa,o=Mu[r]||Mu.any,c=t.type||"core",h=o[c]||0,d=e._wallTarget&&e._wallTarget===t?N_:0,l=e.stance===ra&&n<=e.range*O_?F_:0;return i+a+h+d+l}function vT(e,t){const n=t.getUnits(),i=t.getBuildings();Es.clear(),Ba.clear();for(let r=0;r<n.length;r++)n[r].alive&&Es.insert(n[r]);for(let r=0;r<i.length;r++)i[r].alive&&Ba.insert(i[r]);const s={[Rs]:12,[Ua]:10,[js]:25,[xn]:29};for(let r=0;r<n.length;r++){const o=n[r];if(!o.alive||o.isSupport)continue;if(o.fireCooldown>0&&!o.inCombat){o.targetX=void 0,o.targetZ=void 0;continue}const c=o.team===tt?kt:tt;let h=null,d=-1/0;const l=Es.queryNear(o.x,o.z);for(let f=0;f<l.length;f++){const _=l[f];if(!_.alive||_.team!==c)continue;const g=jt(o.x,o.z,_.x,_.z);if(g>o.range)continue;const p=Yf(o,_,g);p>d&&(d=p,h=_)}const u=Ba.queryNear(o.x,o.z);for(let f=0;f<u.length;f++){const _=u[f];if(!_.alive||_.team!==c)continue;const g=jt(o.x,o.z,_.x,_.z);if(g>o.range)continue;const p=Yf(o,_,g);p>d&&(d=p,h=_)}if(h?(o.targetX=h.x,o.targetZ=h.z):(o.targetX=void 0,o.targetZ=void 0),h&&o.fireCooldown<=0){o.fireCooldown=1/o.fireRate;const f=h.x-o.x,_=h.z-o.z,g=Math.sqrt(f*f+_*_)||1,p=s[o.type]||10,m=o.x+f/g*p,x=o.z+_/g*p,y=Zo[o.type]&&Zo[o.type].isAir?Sl-5:void 0;t.createProjectile(m,x,h.x,h.z,o.team,o.damage,y)}}for(let r=0;r<i.length;r++){const o=i[r];if(!o.alive)continue;if(o.type===Me){ST(o,e,t);continue}const c=se[o.type];if(!c||!c.range||!c.damage||o.buildProgress<o.buildTime)continue;if(o.fireCooldown>0){o.fireCooldown-=e;continue}const h=o.team===tt?kt:tt;let d=null,l=c.range;const u=Es.queryNear(o.x,o.z);for(let f=0;f<u.length;f++){const _=u[f];if(!_.alive||_.team!==h)continue;const g=jt(o.x,o.z,_.x,_.z);g<=l&&(l=g,d=_)}d&&(o.fireCooldown=1/c.fireRate,t.createProjectile(o.x,o.z,d.x,d.z,o.team,c.damage))}const a=t.getProjectiles?t.getProjectiles():[];for(let r=0;r<a.length;r++){const o=a[r];if(!o.alive||o.homing)continue;const c=o.team===tt?kt:tt;let h=!1;const d=Es.queryNear(o.x,o.z);for(let u=0;u<d.length;u++){const f=d[u];if(!f.alive||f.team!==c)continue;if(jt(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hitFlashTimer=za,f.hp<=0&&t.removeUnit(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1,h=!0;break}}if(h)continue;const l=Ba.queryNear(o.x,o.z);for(let u=0;u<l.length;u++){const f=l[u];if(!f.alive||f.team!==c)continue;if(jt(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hitFlashTimer=za,f.hp<=0&&t.removeBuilding(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1;break}}}for(let r=0;r<a.length;r++){const o=a[r];if(!(o.alive||!o.homing)&&(o.hitTarget&&o.target&&o.target.hp<=0&&o.target.alive&&t.removeUnit(o.target),o.splashHit&&o.splashRadius>0)){const c=o.team===tt?kt:tt,h=Es.queryNear(o.splashX,o.splashZ);for(let d=0;d<h.length;d++){const l=h[d];if(l===o.target||!l.alive||l.team!==c)continue;jt(o.splashX,o.splashZ,l.x,l.z)<=o.splashRadius&&(l.hp-=o.splashDamage,l.hitFlashTimer=za,o.sourceBuilding&&(o.sourceBuilding.totalDamage+=o.splashDamage),l.hp<=0&&t.removeUnit(l))}o.splashHit=!1}}}function MT(){return Es}function yT(){return Ba}function ST(e,t,n){if(e.constructionState||e.buildProgress<e.buildTime)return;const i=Am(e);if(!i)return;e.fireTimer-=t;const s=e.team===tt?kt:tt,a=i.range;let r=null,o=a;const c=Es.queryNear(e.x,e.z);for(let d=0;d<c.length;d++){const l=c[d];if(!l.alive||l.team!==s)continue;const u=jt(e.x,e.z,l.x,l.z);u<=o&&(o=u,r=l)}const h=Ba.queryNear(e.x,e.z);for(let d=0;d<h.length;d++){const l=h[d];if(!l.alive||l.team!==s||l===e)continue;const u=jt(e.x,e.z,l.x,l.z);u<=o&&(o=u,r=l)}if(!r){e.target=null,e.targetX=void 0,e.targetZ=void 0;return}if(e.target=r,e.targetX=r.x,e.targetZ=r.z,e.fireTimer<=0&&(e.fireTimer=i.fireRate,e.lastFireTime=performance.now(),n.createHomingProjectile)){const d=n.getFirePoint?n.getFirePoint(e):{x:e.x,y:20,z:e.z};n.createHomingProjectile(d.x,d.z,d.y,r,e.team,i.damage,e,i.splashRadius||0,i.splashDamage||0,e.level,e.branch)}}let Ns={0:0,1:0},Qs={0:0,1:0},ml="normal",Nl={[tt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}};function ET(e){ml=e;const t=qa[ml]||qa.normal;Ns[tt]=t.playerStartEnergy||nu,Ns[kt]=t.aiStartEnergy||nu,Qs[tt]=0,Qs[kt]=0,Nl={[tt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}}}function wT(e,t){const n=t?t.getBuildings():[],i=bE(n),s=qa[ml]||qa.normal;for(const a of[tt,kt]){let r=0,o=1;for(let l=0;l<n.length;l++){const u=n[l];if(u.alive&&u.team===a&&u.type===oe){const f=Cm(u);f?(r+=f.incomeBonus,f.territoryMult>o&&(o=f.territoryMult)):r+=se[oe].incomeBonus}}a===kt&&(r*=s.aiIncomeMult);const c=a===tt?i.player:i.enemy,h=g_*c*o,d=r+h;if(Nl[a]={generators:r,territory:h,net:d},Qs[a]+=d*e,Qs[a]>=1){const l=Math.floor(Qs[a]);Ns[a]+=l,Qs[a]-=l}}}function Tr(e){return Ns[e]}function as(e,t){return Ns[e]<t?!1:(Ns[e]-=t,!0)}function TT(e,t){Ns[e]+=t}function $f(e){return Nl[e]}function bT(){Ns={0:0,1:0},Qs={0:0,1:0},ml="normal",Nl={[tt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}}}function Vh(){return{lastUpdate:0,playerBarracks:0,playerTurrets:0,playerFactories:0,playerGenerators:0,playerWalls:0,playerTotalUnits:0,playerHelicopters:0,playerArmyPower:0,aiArmyPower:0}}let ot={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",tempo:null,intel:Vh(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1,_repairAttempts:{}},Tn={rallyStartTime:0,pushActive:!1},ha=0,rr=null;function AT(e){const t=e,n=qa[t]||qa.normal,i=mu[t]||mu.normal,s=Object.keys(fu),a=s[Math.floor(Math.random()*s.length)];ot={lastTick:0,rallyStartTime:0,pushActive:!1,profile:fu[a],profileKey:a,difficulty:t,diffSettings:n,tempo:i,intel:Vh(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1,_repairAttempts:{}},Tn={rallyStartTime:0,pushActive:!1}}function RT(e,t,n){if(ha=t,OT(t,n),GT(n),zT(t,n),HT(t,n),t-ot.lastTick<l0)return;ot.lastTick=t;const i=n.getBuildings(),s=n.getUnits();UT(t,i,s);const a=i.filter(d=>d.team===kt&&d.alive),r=FT(a,s);if(kT(t,r,n),!(a.filter(d=>d.type===Ce).length===0&&t>=Un.build.barracks&&Xo(Ce,a,n,t)||a.filter(d=>d.type===ye).length===0&&t>=Un.build.factory*.6&&Xo(ye,a,n,t)||a.filter(d=>d.type===oe).length===0&&t>=10&&Xo(oe,a,n,t))){$T(t,a,n);for(let d=0;d<x_;d++){const l=n.getEnergy(),u=n.getBuildings().filter(g=>g.team===kt&&g.alive),f=CT(t,l,u,n);if(!f||!DT(f,u,n,t))break}}}function CT(e,t,n,i){const s=ot.tempo;for(const u in ot._repairAttempts)e-ot._repairAttempts[u].firstTime>A_&&delete ot._repairAttempts[u];const a=n.filter(u=>{if(u.type===Rn||!u.alive||u._repairing||u.constructionState||u.hp/u.maxHp>=T_)return!1;const f=ot._repairAttempts[u.id];return!(f&&f.count>=b_)}),r=u=>{const f=u.hp/u.maxHp;let _=1;u.type===Me?_=3:u.type===oe?_=2.5:u.type===ye?_=2:u.type===Ce?_=1.5:u.type===tn&&(_=2);const g=1+(u.level||0)*.3+(u.branch?.5:0);return(1-f)*_*g};a.sort((u,f)=>r(f)-r(u));const o=Jn*R_;for(const u of a)if(i.canRepairBuilding&&i.canRepairBuilding(u)){const f=i.getRepairCostForBuilding(u);if(t>=f+o)return{type:"repairBuilding",meta:{target:u}}}if(e>=s.upgradeDelay&&e-ot.lastUpgradeTime>=s.upgradeInterval){const u=PT(e,t,n,i);if(u)return u}const c=VT(e,t,n);if(c)return{type:"build",meta:{buildType:c}};if(e-ot.lastBuildTime>=s.buildInterval&&ot._urgentBuildQueue.length>0){const u=XT(e,t,n);if(u)return u}if(e-ot.lastBuildTime<s.buildInterval)return null;const h=pu[ot.profileKey]||pu.balanced,d={barracks:Ln.barracks,turret:Ln.turrets,factory:Ln.factories,generator:Ln.generators,helipad:Ln.helipads,wall:Ln.walls},l={barracks:Ce,turret:Me,factory:ye,generator:oe,helipad:tn,wall:ie};for(let u=0;u<h.length;u++){const f=(ot.buildOrderIndex+u)%h.length,_=h[f],g=l[_];if(!g)continue;const p=Un.build[_]||0;if(e<p)continue;const m=n.filter(y=>y.type===g).length,x=d[_]||4;if(m>=x)continue;const M=g===oe&&i.getGeneratorCost?i.getGeneratorCost():se[g].cost;if(!(t<M+Jn))return ot.buildOrderIndex=(f+1)%h.length,{type:"build",meta:{buildType:g,cost:M}}}return null}function PT(e,t,n,i){const s={[Me]:Un.upgrade.turret,[Ce]:Un.upgrade.barracks,[ye]:Un.upgrade.factory,[oe]:Un.upgrade.generator,[tn]:Un.upgrade.helipad,[ie]:Un.upgrade.wall};if(e>=s[Me]){const a=n.filter(r=>r.type===Me&&r.alive).sort((r,o)=>(o.totalDamage||0)-(r.totalDamage||0));for(const r of a){if(i.canUpgradeTurret&&i.canUpgradeTurret(r)){const o=i.getUpgradeCost(r);if(t>=o+Jn)return{type:"upgradeTurret",meta:{target:r}}}if(i.canBranchTurret&&i.canBranchTurret(r)){const o=IT(ot.intel,n),c=i.getBranchCost(r,o);if(t>=c+Jn)return{type:"branchTurret",meta:{target:r,branch:o}}}}}for(const a of[Ce,ye,oe,tn]){const r=s[a]||0;if(e<r)continue;const o=n.filter(c=>c.type===a&&c.alive).sort((c,h)=>c.level-h.level);for(const c of o){if(i.canUpgradeBuilding&&i.canUpgradeBuilding(c)){const h=i.getUpgradeCost(c);if(t>=h+Jn)return{type:"upgradeProduction",meta:{target:c}}}if(i.canBranchBuilding&&i.canBranchBuilding(c)){const h=LT(a,ot.intel,n,e),d=i.getBranchCost(c,h);if(t>=d+Jn)return{type:"branchProduction",meta:{target:c,branch:h}}}}}if(e>=s[ie]){const a=n.filter(r=>r.type===ie&&r.alive).sort((r,o)=>r.level-o.level);for(const r of a)if(i.canUpgradeBuilding&&i.canUpgradeBuilding(r)){const o=i.getUpgradeCost(r);if(t>=o+Jn)return{type:"upgradeWall",meta:{target:r}}}}return null}function DT(e,t,n,i){switch(e.type){case"build":{const s=Xo(e.meta.buildType,t,n,i);return s&&(ot.lastBuildTime=i),s}case"upgradeTurret":if(n.canUpgradeTurret(e.meta.target)){const s=n.getUpgradeCost(e.meta.target);if(n.spendEnergy(s))return n.startTurretUpgrade(e.meta.target),ot.lastUpgradeTime=i,!0}return!1;case"branchTurret":if(n.canBranchTurret(e.meta.target)){const s=n.getBranchCost(e.meta.target,e.meta.branch);if(n.spendEnergy(s))return n.startTurretBranch(e.meta.target,e.meta.branch),ot.lastUpgradeTime=i,!0}return!1;case"repairWall":case"repairBuilding":{const s=e.meta.target;if(!(n.canRepairBuilding?n.canRepairBuilding(s):n.canRepairWall&&n.canRepairWall(s)))return!1;const r=n.getRepairCostForBuilding?n.getRepairCostForBuilding(s):n.getRepairCost?n.getRepairCost(s):0;return n.spendEnergy(r)?(n.startBuildingRepair?n.startBuildingRepair(s):n.startWallRepair&&n.startWallRepair(s),ot._repairAttempts[s.id]||(ot._repairAttempts[s.id]={count:0,firstTime:i}),ot._repairAttempts[s.id].count++,!0):!1}case"upgradeWall":case"upgradeProduction":if(n.canUpgradeBuilding&&n.canUpgradeBuilding(e.meta.target)){const s=n.getUpgradeCost(e.meta.target);if(n.spendEnergy(s))return n.startUpgrade(e.meta.target),ot.lastUpgradeTime=i,!0}return!1;case"branchProduction":if(n.canBranchBuilding(e.meta.target)){const s=n.getBranchCost(e.meta.target,e.meta.branch);if(n.spendEnergy(s))return n.startBranch(e.meta.target,e.meta.branch),ot.lastUpgradeTime=i,!0}return!1;default:return!1}}function IT(e,t){const n=t.filter(i=>i.type===Me&&i.branch);if(n.length>0){const i=n.some(a=>a.branch==="A"),s=n.some(a=>a.branch==="B");if(i&&!s)return"B";if(s&&!i)return"A"}return e.playerTotalUnits>4||e.playerBarracks>=2?"B":(e.playerTanks>=2,"A")}function LT(e,t,n,i){const s=n.filter(a=>a.type===e&&a.branch);if(s.length>0){const a=s.some(o=>o.branch==="A"),r=s.some(o=>o.branch==="B");if(a&&!r)return"B";if(r&&!a)return"A"}if(e===Ce){const a=n.some(r=>r.type===ye&&r.alive);return!a&&i>60?"A":a?"B":t.playerTanks>=2?"A":"B"}if(e===oe){const a=n.filter(r=>r.type===oe&&r.alive).length;return a<=1||t.playerGenerators>a?"A":"B"}return e===tn?t.playerTurrets>=3?"B":t.playerTurrets<2&&t.playerTotalUnits>6?"A":"B":t.playerTotalUnits>6||i>150?"B":(t.playerTurrets>=3,"A")}function UT(e,t,n){const i=ot.difficulty==="hard"?4:v_;if(e-ot.intel.lastUpdate<i)return;ot.intel.lastUpdate=e;const s=ot.intel;s.playerBarracks=0,s.playerTurrets=0,s.playerFactories=0,s.playerGenerators=0,s.playerWalls=0,s.playerTotalUnits=0,s.playerHelicopters=0,s.playerTanks=0;let a=0,r=0;for(let o=0;o<t.length;o++){const c=t[o];c.team!==tt||!c.alive||(c.type===Ce?s.playerBarracks++:c.type===Me?s.playerTurrets++:c.type===ye?s.playerFactories++:c.type===oe?s.playerGenerators++:c.type===ie&&s.playerWalls++)}for(let o=0;o<n.length;o++){const c=n[o];if(c.alive){if(c.team===tt){s.playerTotalUnits++,c.type==="tank"?s.playerTanks++:c.type===xn&&s.playerHelicopters++;const h=Fc[c.type]||1,d=c.type===xn?_u:1;a+=c.hp*h*d}else if(c.team===kt){const h=Fc[c.type]||1,d=c.type===xn?_u:1;r+=c.hp*h*d}}}s.playerArmyPower=a,s.aiArmyPower=r,WT(t)}function NT(e,t){ha=e,rr=t.getUnits;const i=t.getUnits().filter(o=>o.alive&&o.team===tt&&o.type!==xn&&!o.isSupport&&(o.stance??dn)===dn),s=pn(Math.floor(Vt/2),dp,Z);let a=0;for(const o of i)o.rallyHold&&a++;const r=Tn.rallyStartTime>0&&e-Tn.rallyStartTime>=up;if(a>=hp||a>0&&r){for(const o of i)o.rallyHold&&(o.rallyHold=!1,o.path=null,o.pathIndex=0);Tn.rallyStartTime=0,Tn.pushActive=!0}if(Tn.pushActive&&i.filter(c=>!c.rallyHold).length===0&&(Tn.pushActive=!1),!Tn.pushActive)for(const o of i)!o.rallyHold&&!o._rallyAssigned&&(o.rallyHold=!0,o.rallyX=s.x+(Math.random()-.5)*160,o.rallyZ=s.z+(Math.random()-.5)*120,o._rallyAssigned=!0,Tn.rallyStartTime===0&&(Tn.rallyStartTime=e))}function FT(e,t){const n=pn(li,bn,Z);let i=0,s=0;for(let a=0;a<t.length;a++){const r=t[a];if(r.alive)if(r.team===tt){const o=jt(r.x,r.z,n.x,n.z);if(o<zl)i+=r.hp;else if(o<iu){const c=(o-zl)/(iu-zl);i+=r.hp*(1-c*.7)}else r.z<n.z+200&&(i+=r.hp*.15)}else r.rallyHold?s+=r.hp*.3:s+=r.hp}return s<=0&&i>0?1:i<=0?0:Math.min(1,i/(s+i))}function OT(e,t){const i=t.getUnits().filter(u=>u.alive&&u.team===kt&&u.type!==xn&&!u.isSupport&&(u.stance??dn)===dn),s=pn(Math.floor(Vt/2),_i.rallyRow,Z);let a=0,r=0;for(const u of i)if(u.rallyHold){a++;const f=Fc[u.type]||1;r+=u.hp*f}ot._lastRallyUpdateTime=e;const o=ot.intel,c=o.playerArmyPower+o.playerTurrets*_i.turretPower+o.playerWalls*_i.wallPower;let h=Math.max(_i.minWaveStrength,c*(ot.profile.pushRatio||.9));ot.consecutiveFailures>0&&(h*=1+ot.consecutiveFailures*_i.failureStrengthMult);const d=e<ot.pushCooldownUntil;if(a>=_i.minSize&&r>=h&&!d){YT(e,i,t);for(const u of i)u.rallyHold&&(u.rallyHold=!1,u.path=null,u.pathIndex=0);ot.rallyStartTime=0,ot.pushActive=!0,ot.pushStartTime=e,ot._pushMarkedSuccess=!1,ot._forwardBuildAttempted=!1,ot.lastPushUnitCount=a}if(ot.pushActive){const u=i.filter(_=>!_.rallyHold).length,f=e-ot.pushStartTime;!ot._pushMarkedSuccess&&u>0&&f>15&&(ot._pushMarkedSuccess=!0,ot.dynamicPushBonus=Math.max(0,ot.dynamicPushBonus-_i.sizeShrink),ot.consecutiveFailures=0,ot._forwardBuildAttempted||(ot._attemptForwardBuild=!0)),u===0&&(ot.lastPushUnitCount>0&&!ot._pushMarkedSuccess&&(ot.dynamicPushBonus=Math.min(_i.maxSize,ot.dynamicPushBonus+_i.sizeGrow),ot.consecutiveFailures++,ot.pushCooldownUntil=e+_i.cooldownAfterFailure),ot.pushActive=!1,ot.lastPushUnitCount=0,ot._pushMarkedSuccess=!1)}if(!ot.pushActive){qT(e,t);const u=ot._flankOffsetX*Z;for(const f of i)!f.rallyHold&&!f._rallyAssigned&&(f.rallyHold=!0,f.rallyX=s.x+u+(Math.random()-.5)*60,f.rallyZ=s.z+(Math.random()-.5)*60,f._rallyAssigned=!0,ot.rallyStartTime===0&&(ot.rallyStartTime=e))}}function BT(e){if(ot.pushActive||e.type===xn||e.isSupport||(e.stance??dn)!==dn)return;const t=pn(Math.floor(Vt/2),_i.rallyRow,Z),n=ot._flankOffsetX*Z;e.rallyHold=!0,e.rallyX=t.x+n+(Math.random()-.5)*60,e.rallyZ=t.z+(Math.random()-.5)*60,e._rallyAssigned=!0,ot.rallyStartTime===0&&(ot.rallyStartTime=ha)}function zT(e,t){if(e<W_)return;const n=t.getEnergy();if(n<X_||n<$a+Jn)return;const i=t.getBuildings();let s=null;for(let f=0;f<i.length;f++){const _=i[f];if(!(_.team!==kt||!_.alive||_.type!==tn)&&t.canAirStrike&&t.canAirStrike(_)){s=_;break}}if(!s)return;const r=t.getUnits().filter(f=>f.alive&&f.team===tt),o=i.filter(f=>f.alive&&f.team===tt);if(r.length===0&&o.length===0)return;let c=0,h=0,d=0;const l=pn(As,Ii,Z),u=bc(l.x,l.z,r,o);u>d&&(d=u,c=l.x,h=l.z);for(let f=0;f<Math.min(r.length,10);f++){const _=r[f],g=bc(_.x,_.z,r,o);g>d&&(d=g,c=_.x,h=_.z)}for(let f=0;f<Math.min(o.length,6);f++){const _=o[f],g=bc(_.x,_.z,r,o);g>d&&(d=g,c=_.x,h=_.z)}d<500||t.spendEnergy($a)&&(t.markAirStrikeUsed(s),t.initiateAirStrike(kt,c,h))}function bc(e,t,n,i){let s=0;const a=140;for(let r=0;r<n.length;r++){const o=n[r],c=jt(o.x,o.z,e,t);c<a&&(s+=o.hp*(1-c/a))}for(let r=0;r<i.length;r++){const o=i[r],c=jt(o.x,o.z,e,t);if(c<a){const h=o.type===Rn?5e3:o.hp*2;s+=h*(1-c/a)}}return s}function HT(e,t){const n=t.getEnergy(),i=t.getBuildings(),s=t.getUnits();if(e>=sg&&n>=Dr+Jn){let a=0;for(let r=0;r<s.length;r++){const o=s[r];!o.alive||o.team!==kt||(o.type===Rs||o.type==="assault")&&o.hp<o.maxHp&&a++}if(a>=ag)for(let r=0;r<i.length;r++){const o=i[r];if(!(o.team!==kt||o.type!==Ce)&&t.canSpawnMedic&&t.canSpawnMedic(o)){t.spendEnergy(Dr)&&t.spawnSupportUnit(na,o);break}}}if(e>=rg&&n>=Ir+Jn){let a=0;for(let r=0;r<s.length;r++){const o=s[r];!o.alive||o.team!==kt||o.type===js&&o.hp<o.maxHp&&a++}if(a>=og)for(let r=0;r<i.length;r++){const o=i[r];if(!(o.team!==kt||o.type!==ye)&&t.canSpawnEngineer&&t.canSpawnEngineer(o)){t.spendEnergy(Ir)&&t.spawnSupportUnit(ia,o);break}}}}function GT(e){const t=e.getUnits(),n=[],i=[];for(let a=0;a<t.length;a++){const r=t[a];r.alive&&(r.team===kt&&r.type===xn?n.push(r):r.team===tt&&i.push(r))}if(n.length===0)return;if(i.length===0){const a=pn(Math.floor(Vt/2),dp,Z);jf(a.x,a.z,n,e);return}if(ha<ot.heliRallyCommitUntil){const a=Zf(i);if(jt(a.x,a.z,ot.heliRallyX,ot.heliRallyZ)<S_)return}const s=Zf(i);jf(s.x,s.z,n,e)}function Zf(e){let t=e[0],n=0;for(let i=0;i<e.length;i++){const s=e[i];let a=0;for(let r=0;r<e.length;r++){if(i===r)continue;jt(s.x,s.z,e[r].x,e[r].z)<=M_&&a++}a>n&&(n=a,t=s)}return{x:t.x,z:t.z}}function jf(e,t,n,i){ot.heliRallyX=e,ot.heliRallyZ=t,ot.heliRallyCommitUntil=ha+y_;for(const s of n)i.setHelicopterRally&&i.setHelicopterRally(s.id,e,t)}function Wd(e,t,n,i,s){const r=se[e].size,o=(t+r/2)*Z,c=(n+r/2)*Z;let h=0;if(e===Me){if(s>=Un.shared.turret){const _=Math.abs(n-Fi);h+=(10-_)*3}else{let f=1/0;for(const g of i)if((g.type===Ce||g.type===ye)&&g.alive){const p=jt(o,c,g.x,g.z);p<f&&(f=p)}if(f<1/0){const g=Z*w_;h+=Math.max(0,10-Math.abs(f-g)/Z)}const _=Math.abs(n-bn);h+=Math.min(_,8),h-=Math.max(0,_-8)*2}let l=1/0;for(const f of i)if(f.type===Me&&f.alive){const _=jt(o,c,f.x,f.z);_<l&&(l=_)}l<1/0&&(h+=Math.min(l/Z,8));const u=Math.abs(t-Vt/2);h-=u*.5}else if(e===ie){const d=pp,l=mp;if(n>=d&&n<=l)h+=6;else{const E=Math.min(Math.abs(n-d),Math.abs(n-l));h-=E*1.5}const u=se[Rn].size,f=li+Math.floor(u/2),_=bn+u;if(n===_||n===_+1){const E=Math.abs(t-f);E<=u+2&&(h+=14-E)}(t===li-1||t===li+u)&&n>=bn&&n<=_&&(h+=10);let g=!1;for(const E of i){if(E.type===ie||E.type===Rn)continue;const A=Math.round((E.x-Z/2)/Z),v=Math.round((E.z-Z/2)/Z),w=se[E.type]?se[E.type].size:1;if(t>=A-1&&t<=A+w&&n>=v-1&&n<=v+w){g=!0;break}}g&&(h-=6);let p=!1,m=!1,x=!1,M=!1;for(const E of i){if(E.type!==ie)continue;const A=Math.round((E.x-Z/2)/Z),v=Math.round((E.z-Z/2)/Z);if(Math.abs(t-A)+Math.abs(n-v)===1&&(p=!0),v===n){const D=Math.abs(t-A);D<=2&&(x=!0),D===1&&(m=!0)}A===t&&Math.abs(n-v)===1&&(M=!0)}p&&(h+=5),m?h+=8:x&&(h+=6),M&&(h+=4);{let E=-1,A=!1,v=0;for(let w=0;w<=Vt;w++){const D=w<Vt?ze(w,n):Mi;if(D===Mi||D===th){if(A){const C=w-E;if(C>=1&&C<=8&&t>=E&&t<w){const L=Math.max(5,18-C*2);v=Math.max(v,L)}A=!1}}else A||(E=w,A=!0)}h+=v}{let E=-1,A=-1;for(let v=n-1;v>=Math.max(0,n-6);v--)if(ze(t,v)===Mi){E=v;break}for(let v=n+1;v<=Math.min(je-1,n+6);v++)if(ze(t,v)===Mi){A=v;break}if(E>=0&&A>=0){const v=A-E-1;v>=1&&v<=6&&(h+=Math.max(3,12-v*2))}}{let E=!1,A=!1;if(t>0){const v=ze(t-1,n);(v===Mi||v===kn)&&(E=!0)}if(t<Vt-1){const v=ze(t+1,n);(v===Mi||v===kn)&&(A=!0)}E&&A&&(h+=10)}const y=Math.floor(Vt/2),b=Math.abs(t-y);b<=8&&(h+=Math.max(0,5-b*.5)),h+=Math.random()*3}else if(e===oe){const d=Math.max(0,8-Math.abs(n-bn));h+=d*1.5,n>=Xa&&n<=Fi&&(h+=8);let l=1/0;for(const f of i)if(f.type===oe&&f.alive){const _=jt(o,c,f.x,f.z);_<l&&(l=_)}l<1/0&&(h+=Math.min(l/Z,5));const u=Math.abs(t-Vt/2);h-=u*.3}else{const d=Math.floor(($o+yl)/2),l=Math.abs(n-d);h+=(10-l)*2;const u=Math.max(0,8-Math.abs(n-bn));h+=u*.5;let f=1/0;for(const g of i)if(g.type===e&&g.alive){const p=jt(o,c,g.x,g.z);p<f&&(f=p)}f<1/0&&(h+=Math.min(f/Z,6));const _=Math.abs(t-Vt/2);h-=_*.3}return h+=Math.random()*2,h}function Xo(e,t,n,i){const s=se[e],a=s.size;let r;e===Me&&i>=Un.shared.turret||e===oe&&i>=Un.shared.generator||e===ie&&i>=Un.shared.wall?r=Fi:r=yl;const o=[],c=e===ie?50:30;for(let l=0;l<c;l++){const u=wu(2,Vt-3-a+1),f=wu($o,r-a+1);if(n.isBuildable(u,f,a)){const _=Wd(e,u,f,t,i);o.push({col:u,row:f,score:_})}}if(e===ie){const l=new Set(o.map(g=>`${g.col},${g.row}`)),u=(g,p)=>{const m=`${g},${p}`;l.has(m)||p<$o||p>r||g<1||g>=Vt-1||n.isBuildable(g,p,1)&&(l.add(m),o.push({col:g,row:p,score:Wd(e,g,p,t,i)}))},f=se[Rn].size,_=bn+f;for(let g=li-2;g<=li+f+1;g++)for(let p=bn;p<=_+1;p++)u(g,p);for(const g of t){if(g.type!==ie)continue;const p=Math.round((g.x-Z/2)/Z),m=Math.round((g.z-Z/2)/Z);for(const[x,M]of[[1,0],[-1,0],[0,1],[0,-1]])u(p+x,m+M)}for(let g=pp;g<=Math.min(mp,r);g++){let p=-1,m=!1;for(let x=0;x<=Vt;x++){const M=x<Vt?ze(x,g):Mi;if(M===Mi||M===th){if(m&&x-p<=8)for(let y=p;y<x;y++)u(y,g);m=!1}else M===Ke&&(m||(p=x,m=!0))}}}if(o.length===0)return!1;o.sort((l,u)=>u.score-l.score);const h=o[0],d=e===oe&&n.getGeneratorCost?n.getGeneratorCost():s.cost;return n.spendEnergy(d)?(n.createBuilding(e,h.col,h.row,d),!0):!1}function kT(e,t,n){const i=n.getSquads?.(kt);if(!i||i.length===0)return;let s;if(t>c0?s=i.length:t>su?s=Math.max(1,Math.ceil(i.length*.5)):s=i.length>1?1:0,t>su&&!ot.pushActive){const r=n.getUnits?.();if(r){for(let o=0;o<r.length;o++){const c=r[o];!c.alive||c.team!==kt||c.isAir||c.rallyHold&&(c.rallyHold=!1,c._rallyAssigned=!1,c.path=null,c.pathIndex=0)}ot.rallyStartTime=0}}const a=[...i].sort((r,o)=>{const c=h=>h===Ce?0:h===ye?1:2;return c(r.buildingType)-c(o.buildingType)});for(let r=0;r<a.length;r++){const o=a[r],c=n.getUnitsBySquad?.(o.id)??[];if(r<s)n.setUnitsStance?.(c,aa),n.setUnitsTargetPriority?.(c,Pr);else{n.setUnitsStance?.(c,dn);const h=ot.pushActive&&o.buildingType===ye?Ya:oa;n.setUnitsTargetPriority?.(c,h)}}}function VT(e,t,n){const i=ot.intel,s={barracks:Ce,turret:Me,factory:ye,generator:oe},a={barracks:Ln.barracks,turret:Ln.turrets,factory:Ln.factories,generator:Ln.generators},r=d=>{const l=s[d],u=Un.build[d]||0;if(e<u||n.filter(g=>g.type===l).length>=(a[d]||4))return null;const _=l===oe&&callbacks.getGeneratorCost?callbacks.getGeneratorCost():se[l].cost;return t<_+Jn?null:l},o=n.filter(d=>d.type===Ce).length;if(i.playerArmyPower>i.aiArmyPower*q_&&i.playerBarracks>o){const d=r("barracks");if(d)return d}const c=n.filter(d=>d.type===ye).length;if(i.playerTurrets>=gp&&c<2){const d=r("factory");if(d)return d}const h=n.filter(d=>d.type===Me).length;if(i.playerTotalUnits>6&&h<2){const d=r("turret");if(d)return d}return null}function WT(e){const t=ot.intel,n=e.filter(r=>r.team===kt&&r.alive),i=[],s=n.filter(r=>r.type===ye).length;n.filter(r=>r.type===Ce).length,n.filter(r=>r.type===Me).length;const a=n.filter(r=>r.type===oe).length;t.playerTurrets>=gp&&s<2&&i.push("factory"),t.playerTurrets===0&&t.playerBarracks>=Y_&&(i.includes("turret")||i.push("turret")),t.playerArmyPower>t.aiArmyPower*$_&&(i.includes("barracks")||i.push("barracks")),a===0&&(i.includes("generator")||i.push("generator")),ot._urgentBuildQueue=i.slice(0,Z_)}function XT(e,t,n){const i={barracks:Ce,turret:Me,factory:ye,generator:oe},s={barracks:Ln.barracks,turret:Ln.turrets,factory:Ln.factories,generator:Ln.generators};for(let a=0;a<ot._urgentBuildQueue.length;a++){const r=ot._urgentBuildQueue[a],o=i[r];if(!o)continue;const c=Un.build[r]||0;if(e<c||n.filter(l=>l.type===o).length>=(s[r]||4))continue;const d=o===oe&&callbacks.getGeneratorCost?callbacks.getGeneratorCost():se[o].cost;if(!(t<d+Jn))return ot._urgentBuildQueue.splice(a,1),{type:"build",meta:{buildType:o,cost:d}}}return null}function qT(e,t){if(e-ot._lastFlankScanTime<j_)return;ot._lastFlankScanTime=e;const n=t.getBuildings(),i=Vt/2*Z;let s=0,a=0;for(let r=0;r<n.length;r++){const o=n[r];if(o.team!==tt||!o.alive||o.type!==Me&&o.type!==ie)continue;const c=o.type===Me?3:1;o.x<i?s+=c:a+=c}if(s===a)ot._flankOffsetX=0;else if(s<a){const r=a>0?1-s/a:1;ot._flankOffsetX=-Math.round(Eu*Math.min(r,1))}else{const r=s>0?1-a/s:1;ot._flankOffsetX=Math.round(Eu*Math.min(r,1))}}function YT(e,t,n){if(e<Q_||ot.intel.playerGenerators<K_)return;const s=n.getBuildings(),a=[];for(let c=0;c<s.length;c++){const h=s[c];h.team===tt&&h.alive&&h.type===oe&&a.push(h)}if(a.length===0)return;a.sort((c,h)=>c.z-h.z);const r=a[0];let o=0;for(const c of t){if(o>=J_)break;c.type===Rs&&c.rallyHold&&(c.rallyHold=!1,c.path=null,c.pathIndex=0,c.targetPriority=Ya,c._harassTarget=!0,c.rallyX=r.x,c.rallyZ=r.z,o++)}}function $T(e,t,n){if(!ot._attemptForwardBuild||e<eg)return;ot._attemptForwardBuild=!1,ot._forwardBuildAttempted=!0;const i=n.getUnits(),s=Xa*Z,a=Fi*Z,r=[];for(let d=0;d<i.length;d++){const l=i[d];!l.alive||l.team!==kt||l.isAir||l.z>=s&&l.z<=a&&r.push(l)}if(r.length<2)return;let o=0,c=0;for(const d of r)o+=d.x,c+=d.z;o/=r.length,c/=r.length;const h={turret:Me,generator:oe};for(const d of tg){const l=h[d];if(!l)continue;const u=se[l],f=n.getEnergy(),_=l===oe&&n.getGeneratorCost?n.getGeneratorCost():u.cost;if(f<_+Jn)continue;const g=t.filter(A=>A.type===l).length,p=d==="turret"?"turrets":d+"s";if(g>=(Ln[p]||4))continue;const m=Math.round(o/Z),x=Math.round(c/Z),M=u.size;let y=-1,b=-1,E=-1/0;for(let A=-4;A<=4;A++)for(let v=-4;v<=4;v++){const w=m+v,D=x+A;if(D<Xa||D>Fi-M+1||w<1||w>=Vt-1-M+1||!n.isBuildable(w,D,M))continue;const C=Wd(l,w,D,t,e);C>E&&(E=C,y=w,b=D)}if(y>=0&&n.spendEnergy(_)){n.createBuilding(l,y,b,_);return}}}function ZT(){let e=0;if(rr){const n=rr();for(let i=0;i<n.length;i++){const s=n[i];s.alive&&s.team===tt&&s.rallyHold&&(s.stance??dn)===dn&&e++}}const t=Tn.rallyStartTime>0?ha-Tn.rallyStartTime:0;return{holdingCount:e,pushSize:hp,rallyActive:!Tn.pushActive,timeRemaining:Math.max(0,up-t)}}function jT(){if(!rr)return;const e=rr();for(let t=0;t<e.length;t++){const n=e[t];n.alive&&n.team===tt&&n.rallyHold&&(n.stance??dn)===dn&&(n.rallyHold=!1,n.path=null,n.pathIndex=0)}Tn.rallyStartTime=0,Tn.pushActive=!0}function KT(){ot={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",diffSettings:null,tempo:null,intel:Vh(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1},Tn={rallyStartTime:0,pushActive:!1},ha=0,rr=null}let zn=null,vt=null,$={},vi=null,Gn=null,or="",Kf=!1,Po=0,Ac=!1,Rc=0;const ls=200,En=ls/Hn;let rs=null,ka=null,qo=!1;function JT(e,t){zn=e,vt=t,zn.innerHTML="";const n=Da("ENERGY"),i=document.createElement("div");i.className="resource-display",i.innerHTML='<span>&#9889;</span> <span class="energy-value">100</span>',n.appendChild(i);const s=document.createElement("div");s.className="income-display",s.innerHTML='<span class="income-net">+0/s</span>',n.appendChild(s);const a=document.createElement("div");a.className="income-details",a.innerHTML=`
    <div class="income-row"><span>Generators</span><span class="income-val income-gen" id="inc-gen">+0</span></div>
    <div class="income-row"><span>Territory</span><span class="income-val" id="inc-terr">+0</span></div>
  `,n.appendChild(a),zn.appendChild(n),$.energyValue=i.querySelector(".energy-value"),$.incomeNet=s.querySelector(".income-net"),$.incGen=a.querySelector("#inc-gen"),$.incTerr=a.querySelector("#inc-terr");const r=Da("BASE STATUS"),o=Jf("YOUR BASE","2000 / 2000"),c=Qf();r.appendChild(o.container),r.appendChild(c.track),$.playerHpLabel=o.valueEl,$.playerHpFill=c.fill;const h=Jf("ENEMY BASE","2000 / 2000"),d=Qf();h.container.style.marginTop="8px",r.appendChild(h.container),r.appendChild(d.track),$.enemyHpLabel=h.valueEl,$.enemyHpFill=d.fill,zn.appendChild(r);const l=Da("BUILD");$.buildButtons={};for(const U of cp){const V=se[U],B=document.createElement("button");B.className="build-btn",B.innerHTML=`<span>${V.label}</span><span class="cost">${V.cost} E</span>`,B.addEventListener("click",()=>{B.classList.contains("disabled")||(mn(),In(),vi===U?(vi=null,B.classList.remove("selected")):(vi&&$.buildButtons[vi]&&$.buildButtons[vi].classList.remove("selected"),vi=U,B.classList.add("selected")),vt&&vt.onBuildSelect&&vt.onBuildSelect(vi))}),l.appendChild(B),$.buildButtons[U]=B}zn.appendChild(l);const u=document.createElement("div");u.className="sidebar-section building-section hidden",u.innerHTML=`
    <div class="sidebar-title building-title">BUILDING</div>
    <div class="building-level"></div>
    <div class="building-stats"></div>
    <div class="building-tracker"></div>
    <div class="building-construction hidden">
      <div class="construction-label"></div>
      <div class="hp-bar-track"><div class="hp-bar-fill construction-fill" style="width:0%"></div></div>
    </div>
    <div class="building-actions"></div>
  `,zn.appendChild(u),$.buildingSection=u,$.buildingTitle=u.querySelector(".building-title"),$.buildingLevel=u.querySelector(".building-level"),$.buildingStats=u.querySelector(".building-stats"),$.buildingTracker=u.querySelector(".building-tracker"),$.buildingConstruction=u.querySelector(".building-construction"),$.constructionLabel=u.querySelector(".construction-label"),$.constructionFill=u.querySelector(".construction-fill"),$.buildingActions=u.querySelector(".building-actions");const f=document.createElement("div");f.className="sidebar-section helicopter-section hidden",f.innerHTML=`
    <div class="sidebar-title heli-title">HELICOPTER</div>
    <div class="heli-hp-row">
      <span class="heli-hp-label">HP</span>
      <span class="heli-hp-value"></span>
    </div>
    <div class="hp-bar-track"><div class="hp-bar-fill heli-hp-fill hp-high" style="width:100%"></div></div>
    <div class="heli-rally-hint">CLICK MAP TO SET RALLY POINT</div>
    <button class="build-btn heli-deselect-btn">DESELECT</button>
  `,zn.appendChild(f),$.heliSection=f,$.heliHpValue=f.querySelector(".heli-hp-value"),$.heliHpFill=f.querySelector(".heli-hp-fill"),f.querySelector(".heli-deselect-btn").addEventListener("click",()=>{In(),vt&&vt.onHeliDeselect&&vt.onHeliDeselect()});const g=document.createElement("div");g.className="base-alert hidden",g.textContent="BASE UNDER ATTACK",r.insertBefore(g,o.container),$.baseAlert=g,$.playerHpTrack=c.track;const p=Da("UNITS"),m=document.createElement("div");m.innerHTML=`
    <div class="unit-count"><span class="unit-count-label">Player Units</span><span class="unit-count-value" id="player-unit-count">0</span></div>
    <div class="unit-count"><span class="unit-count-label">Enemy Units</span><span class="unit-count-value" id="enemy-unit-count">0</span></div>
  `,p.appendChild(m),zn.appendChild(p),$.playerUnitCount=m.querySelector("#player-unit-count"),$.enemyUnitCount=m.querySelector("#enemy-unit-count");const x=document.createElement("div");x.className="sidebar-section selection-command-bar hidden",x.innerHTML=`
    <div class="sidebar-title sel-cmd-title">0 UNITS SELECTED</div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">CMD</span>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${dn}">ADV</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${aa}">DEF</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${Cr}">HOLD</button>
      <button class="sel-cmd-btn sel-cmd-btn--rally" data-sel="rally">RALLY</button>
    </div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">TGT</span>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${oa}">ANY</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${Pr}">UNIT</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${Ya}">BLDG</button>
    </div>
    <button class="build-btn sel-deselect-btn">DESELECT</button>
  `,zn.appendChild(x),$.selCmdSection=x,$.selCmdTitle=x.querySelector(".sel-cmd-title"),x.querySelectorAll('[data-sel="stance"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onSelectionStance&&vt.onSelectionStance(U.dataset.val)})}),x.querySelectorAll('[data-sel="rally"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onSelectionRallyClick&&vt.onSelectionRallyClick()})}),x.querySelectorAll('[data-sel="target"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onSelectionTarget&&vt.onSelectionTarget(U.dataset.val)})}),x.querySelector(".sel-deselect-btn").addEventListener("click",()=>{vt&&vt.onSelectionDeselect&&vt.onSelectionDeselect()});const M=document.createElement("div");M.className="sidebar-section squad-section hidden",M.innerHTML=`
    <div class="sidebar-title squad-title">SQUADS</div>
    <div class="squad-global-row">
      <div class="squad-global-group">
        <span class="squad-global-label">ALL</span>
        <button class="squad-global-btn" data-global="stance" data-val="${dn}">ADV</button>
        <button class="squad-global-btn" data-global="stance" data-val="${aa}">DEF</button>
        <button class="squad-global-btn" data-global="stance" data-val="${Cr}">HOLD</button>
        <button class="squad-global-btn squad-global-btn--rally" data-global="rally" data-val="all">RALLY</button>
      </div>
      <div class="squad-global-group">
        <span class="squad-global-label">TGT</span>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${oa}">ANY</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${Pr}">UNIT</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${Ya}">BLDG</button>
      </div>
    </div>
    <div class="squad-cards"></div>
  `,zn.appendChild(M),$.squadSection=M,$.squadCards=M.querySelector(".squad-cards"),M.querySelectorAll('[data-global="stance"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onGlobalStance&&vt.onGlobalStance(U.dataset.val)})}),M.querySelectorAll('[data-global="target"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onGlobalTarget&&vt.onGlobalTarget(U.dataset.val)})}),M.querySelectorAll('[data-global="rally"]').forEach(U=>{U.addEventListener("click",()=>{vt&&vt.onGlobalRallyClick&&vt.onGlobalRallyClick()})});const y=document.createElement("div");y.className="selection-box hidden",document.body.appendChild(y),$.selBoxOverlay=y;const b=document.createElement("div");b.className="airstrike-overlay hidden",b.innerHTML=`
    <div class="airstrike-overlay-text">SELECT AIR STRIKE TARGET</div>
    <div class="airstrike-overlay-sub">Click on the map to designate target &bull; Right-click or ESC to cancel</div>
  `,document.body.appendChild(b),$.airStrikeOverlay=b;const E=document.createElement("div");E.className="sidebar-section rally-section hidden",E.innerHTML=`
    <div class="sidebar-title">RALLY</div>
    <div class="rally-count">0 / 3</div>
    <div class="hp-bar-track"><div class="hp-bar-fill rally-fill" style="width:0%"></div></div>
    <div class="rally-timer">Push in 0.0s</div>
    <button class="build-btn rally-push-btn">PUSH NOW</button>
  `,zn.appendChild(E),$.rallySection=E,$.rallyCount=E.querySelector(".rally-count"),$.rallyFill=E.querySelector(".rally-fill"),$.rallyTimer=E.querySelector(".rally-timer"),E.querySelector(".rally-push-btn").addEventListener("click",()=>{vt&&vt.onPushNow&&vt.onPushNow()});const v=Da("MAP"),w=document.createElement("canvas");w.className="minimap-canvas",w.width=ls,w.height=ls,v.appendChild(w),zn.appendChild(v),$.minimapCanvas=w,$.minimapCtx=w.getContext("2d"),w.addEventListener("click",U=>{const V=w.getBoundingClientRect(),B=ls/V.width,W=ls/V.height,G=(U.clientX-V.left)*B,et=(U.clientY-V.top)*W,nt=G/En,pt=et/En;if(ka!=null&&vt&&vt.onRallySet){vt.onRallySet(ka,nt,pt),ka=null;return}if(rs&&vt&&vt.onHelicopterRally){vt.onHelicopterRally(rs.id,nt,pt),In(),vt.onHeliDeselect&&vt.onHeliDeselect();return}vt&&vt.onMinimapClick&&vt.onMinimapClick(nt,pt)});const D=Da("INFO"),C=document.createElement("div");C.className="info-panel",C.textContent="Click a building type to place it.",D.appendChild(C),zn.appendChild(D),$.infoPanel=C;const L=document.createElement("div");L.className="match-timer",L.textContent="00:00",zn.appendChild(L),$.matchTimer=L}function QT(e){if(!$.energyValue)return;if($.energyValue.textContent=Math.floor(e.energy),e.incomeBreakdown&&$.incomeNet){const i=e.incomeBreakdown,s=i.net>=0?"+":"";$.incomeNet.textContent=`${s}${i.net.toFixed(1)}/s`,$.incomeNet.className="income-net"+(i.net<=0?" income-low":""),$.incGen.textContent=i.generators>0?`+${i.generators.toFixed(1)}`:"+0",$.incTerr.textContent=i.territory>0?`+${i.territory.toFixed(1)}`:"+0"}let t=null,n=null;if(e.buildings)for(const i of e.buildings)i.type===Rn&&i.team===tt&&(t=i),i.type===Rn&&i.team===kt&&(n=i);if(t){const i=se[Rn],s=Math.max(0,t.hp/i.hp);$.playerHpFill.style.width=s*100+"%",$.playerHpFill.className="hp-bar-fill "+Xd(s),$.playerHpLabel.textContent=`${Math.ceil(t.hp)} / ${i.hp}`}if(n){const i=se[Rn],s=Math.max(0,n.hp/i.hp);$.enemyHpFill.style.width=s*100+"%",$.enemyHpFill.className="hp-bar-fill "+Xd(s),$.enemyHpLabel.textContent=`${Math.ceil(n.hp)} / ${i.hp}`}if(e.matchTime!=null){const i=Math.floor(e.matchTime),s=Math.floor(i/60),a=i%60;$.matchTimer.textContent=String(s).padStart(2,"0")+":"+String(a).padStart(2,"0")}for(const i of cp){const s=$.buildButtons[i];if(!s)continue;const a=i===oe&&e.generatorCost!=null?e.generatorCost:se[i].cost;if(i===oe){const r=s.querySelector(".cost");r&&(r.textContent=a+" E")}e.energy<a?s.classList.add("disabled"):s.classList.remove("disabled")}if(e.units){let i=0,s=0;for(const a of e.units)a.team===tt?i++:s++;$.playerUnitCount.textContent=i,$.enemyUnitCount.textContent=s}if(sb(e),ib(e),ab(e),$.airStrikeOverlay){const i=qo||e.airStrikePending;$.airStrikeOverlay.classList.toggle("hidden",!i),document.body.classList.toggle("airstrike-targeting",!!i),!e.airStrikePending&&qo&&(qo=!1)}rb(e.baseUnderAttack,e.dt||0),ob(e),lb(e),Gn&&zm(Gn,e.energy,e.squads,e.matchTime),rs&&rs.alive?Om(rs):rs&&!rs.alive&&(In(),vt&&vt.onHeliDeselect&&vt.onHeliDeselect())}function tb(e){e&&(rs=e,mn(),is(),$.heliSection.classList.remove("hidden"),Om(e))}function In(){rs=null,$.heliSection&&$.heliSection.classList.add("hidden")}function Om(e){const t=Zo[e.type];if(!t)return;const n=e.maxHp||t.hp,i=Math.max(0,e.hp/n);$.heliHpValue.textContent=`${Math.ceil(e.hp)} / ${n}`,$.heliHpFill.style.width=i*100+"%",$.heliHpFill.className="hp-bar-fill "+Xd(i)}function Bm(e){if(!e||e.team!==tt){mn();return}if(!se[e.type]){mn();return}Gn=e,is(),In(),$.buildingSection.classList.remove("hidden"),zm(e,0)}function mn(){Gn=null,or="",$.buildingSection&&$.buildingSection.classList.add("hidden")}function _l(){return Gn}function zm(e,t,n,i){if(!e||!e.alive){mn();return}const s=se[e.type];if(e.type===ie)$.buildingTitle.textContent=`WALL L${e.level}`;else{let r=s.label.toUpperCase();if(n&&(e.type===Ce||e.type===ye||e.type===tn)){const o=n.find(c=>c.buildingId===e.id);o&&(r=o.label.toUpperCase())}$.buildingTitle.textContent=r}if(s.levels){let r=`Level ${e.level}`;if(e.type===ie)r=s.description||"Destructible barrier";else if(e.branch){const o=s.branches[e.branch];r=`[${e.branch}] ${o.name}`}$.buildingLevel.textContent=r,$.buildingLevel.className="building-level"+(e.branch?" building-branched":"")}else $.buildingLevel.textContent=s.description||"",$.buildingLevel.className="building-level";let a="";if(e.type===Me){const r=Am(e);r&&(a+=`<div class="info-stat"><span>DMG</span><span class="info-stat-value">${r.damage}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.fireRate.toFixed(2)}s</span></div>`,a+=`<div class="info-stat"><span>RANGE</span><span class="info-stat-value">${r.range}</span></div>`,r.splashRadius&&(a+=`<div class="info-stat"><span>SPLASH</span><span class="info-stat-value">${r.splashRadius}px</span></div>`))}else if(e.type===oe){const r=Cm(e);r&&(a+=`<div class="info-stat"><span>INCOME</span><span class="info-stat-value income-gen">+${r.incomeBonus}/s</span></div>`,r.territoryMult>1&&(a+=`<div class="info-stat"><span>TERRITORY MULT</span><span class="info-stat-value income-gen">x${r.territoryMult}</span></div>`))}else if(e.type===ie)a+='<div class="info-stat"><span>TYPE</span><span class="info-stat-value">BARRIER</span></div>';else{const r=Rm(e);if(r){const o=r.produceUnit||s.produceUnit;a+=`<div class="info-stat"><span>UNIT</span><span class="info-stat-value">${o.toUpperCase()}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.produceTime.toFixed(1)}s</span></div>`,r.hpMult&&r.hpMult!==1&&(a+=`<div class="info-stat"><span>UNIT HP</span><span class="info-stat-value">+${Math.round((r.hpMult-1)*100)}%</span></div>`),r.damageMult&&r.damageMult!==1&&(a+=`<div class="info-stat"><span>UNIT DMG</span><span class="info-stat-value">+${Math.round((r.damageMult-1)*100)}%</span></div>`),r.speedMult&&r.speedMult!==1&&(a+=`<div class="info-stat"><span>UNIT SPD</span><span class="info-stat-value">+${Math.round((r.speedMult-1)*100)}%</span></div>`),r.rangeMult&&r.rangeMult!==1&&(a+=`<div class="info-stat"><span>UNIT RNG</span><span class="info-stat-value">+${Math.round((r.rangeMult-1)*100)}%</span></div>`)}}if(a+=`<div class="info-stat"><span>HP</span><span class="info-stat-value">${Math.ceil(e.hp)} / ${e.maxHp}</span></div>`,$.buildingStats.innerHTML=a,e.type===Me?$.buildingTracker.innerHTML=`<div class="info-stat"><span>Dmg dealt</span><span class="info-stat-value">${e.totalDamage}</span></div><div class="info-stat"><span>Kills</span><span class="info-stat-value">${e.kills}</span></div>`:$.buildingTracker.innerHTML="",s.levels)if(e.constructionState&&e.constructionState!=="building"){$.buildingConstruction.classList.remove("hidden");const r=Math.min(1,e.constructionTimer/e.constructionDuration),o=Math.max(0,e.constructionDuration-e.constructionTimer).toFixed(1);let c="UPGRADING",h="construction-upgrade";e.constructionState==="branching"?(c="BRANCHING",h="construction-branch"):e.constructionState==="repairing"&&(c="REPAIRING",h="construction-repair"),$.constructionLabel.textContent=`${c}... ${o}s`,$.constructionFill.style.width=r*100+"%",$.constructionFill.className="hp-bar-fill "+h,$.buildingActions.innerHTML="",or=""}else $.buildingConstruction.classList.add("hidden"),eb(e,t,i);else $.buildingConstruction.classList.add("hidden"),$.buildingActions.innerHTML="",or=""}function eb(e,t,n){const i=Qr(e),s=e.type!==ie&&to(e),a=i?Oh(e):0,r=i&&t>=a;let o=!1,c=!1;s&&(o=t>=wr(e,"A"),c=t>=wr(e,"B"));const h=e.type===ie,d=Gr(e),l=d?kr(e):0,u=d&&t>=l,f=!!e._repairing,_=fl(e,n||0),g=_&&t>=$a,p=e.airStrikeCooldownUntil&&n?Math.max(0,e.airStrikeCooldownUntil-n):0,m=Hh(e,n||0),x=m&&t>=Dr,M=e.supportCooldownUntil&&n?Math.max(0,e.supportCooldownUntil-n):0,y=e.type===Ce&&e._activeSupportUnitId!=null,b=Gh(e,n||0),E=b&&t>=Ir,A=e.supportCooldownUntil&&n?Math.max(0,e.supportCooldownUntil-n):0,v=e.type===ye&&e._activeSupportUnitId!=null,w=`${e.id}:${e.level}:${e.branch}:${i}:${s}:${r}:${o}:${c}:${d}:${u}:${f}:${Math.ceil(e.hp)}:${e.orientation||""}:${_}:${g}:${Math.floor(p)}:${m}:${x}:${y}:${Math.floor(M)}:${b}:${E}:${v}:${Math.floor(A)}`;if(w===or)return;or=w;let D="";if(h){const C=[{key:la,label:"H"},{key:jo,label:"V"},{key:eh,label:"NE"},{key:nh,label:"NW"},{key:ih,label:"SE"},{key:sh,label:"SW"}],L=e.orientation||la;D+='<div class="wall-orient-row">';for(const U of C){const V=L===U.key?" active":"";D+=`<button class="wall-orient-btn${V}" data-action="orient" data-orient="${U.key}">${U.label}</button>`}D+="</div>"}if(d&&(D+=`<button class="build-btn turret-action-btn repair-btn ${u?"":"disabled"}" data-action="repair">
      <span>REPAIR</span><span class="cost">${l} E</span>
    </button>`),f){const C=Math.min((e._repairTimer||0)/(e._repairDuration||1),1)*100;D+=`<div class="repair-progress-row">
      <span class="repair-progress-label">REPAIRING...</span>
      <div class="hp-bar-track repair-track"><div class="hp-bar-fill construction-repair" style="width:${C.toFixed(0)}%"></div></div>
    </div>`}if(i&&(D+=`<button class="build-btn turret-action-btn ${r?"":"disabled"}" data-action="upgrade">
      <span>UPGRADE TO L${e.level+1}</span><span class="cost">${a} E</span>
    </button>`),s){const C=se[e.type].branches;for(const L of["A","B"]){const U=C[L],V=wr(e,L),B=t>=V;D+=`<button class="build-btn turret-action-btn branch-btn ${B?"":"disabled"}" data-action="branch" data-key="${L}">
        <span class="br-key">[${L}]</span> <span>${U.name}</span>
        <span class="br-desc">${U.desc}</span>
        <span class="cost">${V} E</span>
      </button>`}}if(e.type===tn&&e.branch&&(_?D+=`<button class="build-btn turret-action-btn airstrike-btn ${g?"":"disabled"}" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">${$a} E</span>
      </button>`:p>0&&(D+=`<button class="build-btn turret-action-btn airstrike-btn disabled" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">COOLDOWN ${Math.ceil(p)}s</span>
      </button>`)),e.type===Ce&&e.branch&&(y?D+=`<button class="build-btn turret-action-btn medic-btn disabled" data-action="medic">
        <span>MEDIC ACTIVE</span>
      </button>`:m?D+=`<button class="build-btn turret-action-btn medic-btn ${x?"":"disabled"}" data-action="medic">
        <span>SPAWN MEDIC</span><span class="cost">${Dr} E</span>
      </button>`:M>0&&(D+=`<button class="build-btn turret-action-btn medic-btn disabled" data-action="medic">
        <span>SPAWN MEDIC</span><span class="cost">COOLDOWN ${Math.ceil(M)}s</span>
      </button>`)),e.type===ye&&e.branch&&(v?D+=`<button class="build-btn turret-action-btn engineer-btn disabled" data-action="engineer">
        <span>ENGINEER ACTIVE</span>
      </button>`:b?D+=`<button class="build-btn turret-action-btn engineer-btn ${E?"":"disabled"}" data-action="engineer">
        <span>SPAWN ENGINEER</span><span class="cost">${Ir} E</span>
      </button>`:A>0&&(D+=`<button class="build-btn turret-action-btn engineer-btn disabled" data-action="engineer">
        <span>SPAWN ENGINEER</span><span class="cost">COOLDOWN ${Math.ceil(A)}s</span>
      </button>`)),h){const C=Math.floor((e.investedCost||0)*_p);D+=`<button class="build-btn turret-action-btn demolish-btn" data-action="demolish">
      <span>DESTROY</span><span class="cost">REFUND ${C}E</span>
    </button>`}$.buildingActions.innerHTML=D,$.buildingActions.querySelectorAll('[data-action="orient"]').forEach(C=>{C.addEventListener("click",()=>{const L=C.getAttribute("data-orient");vt&&vt.onWallOrient&&vt.onWallOrient(Gn,L)})}),$.buildingActions.querySelectorAll('[data-action="demolish"]').forEach(C=>{C.addEventListener("click",()=>{vt&&vt.onWallDemolish&&vt.onWallDemolish(Gn),mn()})}),$.buildingActions.querySelectorAll('[data-action="repair"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||(vt&&vt.onBuildingRepair?vt.onBuildingRepair(Gn):vt&&vt.onWallRepair&&vt.onWallRepair(Gn))})}),$.buildingActions.querySelectorAll('[data-action="upgrade"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||vt&&vt.onBuildingUpgrade&&vt.onBuildingUpgrade(Gn)})}),$.buildingActions.querySelectorAll('[data-action="branch"]').forEach(C=>{C.addEventListener("click",()=>{if(C.classList.contains("disabled"))return;const L=C.getAttribute("data-key");vt&&vt.onBuildingBranch&&vt.onBuildingBranch(Gn,L)})}),$.buildingActions.querySelectorAll('[data-action="airstrike"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||vt&&vt.onAirStrike&&vt.onAirStrike(Gn)})}),$.buildingActions.querySelectorAll('[data-action="medic"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||vt&&vt.onSpawnMedic&&vt.onSpawnMedic(Gn)})}),$.buildingActions.querySelectorAll('[data-action="engineer"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||vt&&vt.onSpawnEngineer&&vt.onSpawnEngineer(Gn)})})}function ws(e){ka=e,Yo=""}function nb(e){qo=!0,or=""}function is(){vi&&$.buildButtons[vi]&&$.buildButtons[vi].classList.remove("selected"),vi=null}function Da(e){const t=document.createElement("div");t.className="sidebar-section";const n=document.createElement("div");return n.className="sidebar-title",n.textContent=e,t.appendChild(n),t}function Jf(e,t){const n=document.createElement("div");n.className="hp-label";const i=document.createElement("span");i.className="hp-label-name",i.textContent=e;const s=document.createElement("span");return s.className="hp-label-value",s.textContent=t,n.appendChild(i),n.appendChild(s),{container:n,valueEl:s}}function Qf(){const e=document.createElement("div");e.className="hp-bar-track";const t=document.createElement("div");return t.className="hp-bar-fill hp-high",t.style.width="100%",e.appendChild(t),{track:e,fill:t}}function Xd(e){return e>.5?"hp-high":e>.25?"hp-mid":"hp-low"}let Yo="";function ib(e){const t=e.squads;if(!t||t.length===0){$.squadSection&&!$.squadSection.classList.contains("hidden")&&$.squadSection.classList.add("hidden"),Yo="";return}$.squadSection.classList.remove("hidden");const n=t.map(r=>`${r.id}:${r.spawnStance||Ia}:${r.spawnTargetPriority||La}:${r.unitCount}:${r.buildingAlive}`).join("|")+`|rp:${ka||""}`;if(n===Yo)return;Yo=n;const i=t.every(r=>(r.spawnStance||Ia)===(t[0].spawnStance||Ia))?t[0].spawnStance||Ia:null,s=t.every(r=>(r.spawnTargetPriority||La)===(t[0].spawnTargetPriority||La))?t[0].spawnTargetPriority||La:null;$.squadSection.querySelectorAll('[data-global="stance"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===i)}),$.squadSection.querySelectorAll('[data-global="rally"]').forEach(r=>{const o=ka==="all";r.classList.toggle("active",o),r.classList.toggle("pending",o)}),$.squadSection.querySelectorAll('[data-global="target"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===s)});let a="";for(const r of t){const o=r.buildingAlive?"":" squad-card--dead",c=r.spawnStance||Ia,h=r.spawnTargetPriority||La;a+=`<div class="squad-card${o}" data-squad="${r.id}">
      <div class="squad-card-header" data-squad-click="${r.id}">
        <span class="squad-label">${r.label}</span>
        <span class="squad-count">${r.unitCount}</span>
      </div>
      <div class="squad-spawn-row">
        <span class="squad-spawn-label">SPAWN</span>
        <button class="squad-spawn-btn${c===dn?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${dn}">ADV</button>
        <button class="squad-spawn-btn${c===aa?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${aa}">DEF</button>
        <button class="squad-spawn-btn${c===Cr?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${Cr}">HOLD</button>
        <span class="squad-cmd-sep"></span>
        <button class="squad-spawn-btn squad-spawn-btn--target${h===oa?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${oa}">ANY</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${h===Pr?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${Pr}">UNIT</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${h===Ya?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${Ya}">BLDG</button>
      </div>
    </div>`}$.squadCards.innerHTML=a,$.squadCards.querySelectorAll("[data-squad-click]").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.squadClick);vt&&vt.onSquadCardClick&&vt.onSquadCardClick(o)})}),$.squadCards.querySelectorAll('[data-spawn="stance"]').forEach(r=>{r.addEventListener("click",()=>{vt&&vt.onSpawnStanceChange&&vt.onSpawnStanceChange(Number(r.dataset.squadId),r.dataset.val)})}),$.squadCards.querySelectorAll('[data-spawn="target"]').forEach(r=>{r.addEventListener("click",()=>{vt&&vt.onSpawnTargetChange&&vt.onSpawnTargetChange(Number(r.dataset.squadId),r.dataset.val)})})}let Cc="";function sb(e){const t=e.selectedUnitCount||0;if(t===0){$.selCmdSection&&!$.selCmdSection.classList.contains("hidden")&&$.selCmdSection.classList.add("hidden"),Cc="";return}$.selCmdSection.classList.remove("hidden");const n=`${t}`;n!==Cc&&(Cc=n,$.selCmdTitle.textContent=`${t} UNIT${t!==1?"S":""} SELECTED`)}function ab(e){const t=e.selectionBoxScreen;if(!t){$.selBoxOverlay&&!$.selBoxOverlay.classList.contains("hidden")&&$.selBoxOverlay.classList.add("hidden");return}$.selBoxOverlay.classList.remove("hidden"),$.selBoxOverlay.style.left=t.x1+"px",$.selBoxOverlay.style.top=t.y1+"px",$.selBoxOverlay.style.width=t.x2-t.x1+"px",$.selBoxOverlay.style.height=t.y2-t.y1+"px"}function rb(e,t){Po>0&&(Po-=t),e&&!Kf&&Po<=0&&(Ac=!0,Rc=3,Po=5,$.baseAlert.classList.remove("hidden"),$.playerHpTrack.classList.add("hp-bar-alert")),Ac&&(Rc-=t,(Rc<=0||!e)&&(Ac=!1,$.baseAlert.classList.add("hidden"),$.playerHpTrack.classList.remove("hp-bar-alert"))),Kf=!!e}function ob(e){if(!(e.rallyActive&&e.rallyHoldingCount>0)){$.rallySection&&!$.rallySection.classList.contains("hidden")&&$.rallySection.classList.add("hidden");return}$.rallySection.classList.remove("hidden");const n=e.rallyHoldingCount||0,i=e.rallyPushSize||1,s=e.rallyTimeRemaining||0;$.rallyCount.textContent=`${n} / ${i}`,$.rallyFill.style.width=n/i*100+"%",$.rallyTimer.textContent=`Push in ${s.toFixed(1)}s`}function lb(e){const t=$.minimapCtx;if(!t)return;if(t.fillStyle="#08081A",t.fillRect(0,0,ls,ls),e.obstacles){t.fillStyle="#505064";const s=Z*En;for(const a of e.obstacles)t.fillRect(a.col*s,a.row*s,s,s)}const n=lp*Z*En,i=(yl+1)*Z*En;if(t.strokeStyle="rgba(0,255,255,0.25)",t.lineWidth=1,t.beginPath(),t.moveTo(0,n),t.lineTo(ls,n),t.stroke(),t.strokeStyle="rgba(255,50,50,0.25)",t.beginPath(),t.moveTo(0,i),t.lineTo(ls,i),t.stroke(),e.buildings)for(const s of e.buildings){if(!s.alive)continue;const a=se[s.type],r=(a?a.size:1)*Z*En;t.fillStyle=s.team===tt?"#00ffff":"#ff3232",t.fillRect(s.col*Z*En,s.row*Z*En,r,r)}if(e.units)for(const s of e.units){if(!s.alive)continue;const a=s.team===tt?"#00ffff":"#ff3232",r=s.x*En,o=s.z*En;s.isAir?(t.fillStyle=a,t.beginPath(),t.moveTo(r,o-3),t.lineTo(r-2.5,o+2),t.lineTo(r+2.5,o+2),t.closePath(),t.fill()):(t.fillStyle=a,t.beginPath(),t.arc(r,o,2,0,Math.PI*2),t.fill())}if(e.squads)for(const s of e.squads){if(s.stance!==ra||s.rallyX==null)continue;const a=s.rallyX*En,r=s.rallyZ*En;t.strokeStyle="#32ff64",t.lineWidth=1.5,t.beginPath(),t.moveTo(a,r-4),t.lineTo(a+4,r),t.lineTo(a,r+4),t.lineTo(a-4,r),t.closePath(),t.stroke()}if(e.cameraInfo){const s=e.cameraInfo;t.strokeStyle="rgba(255,255,255,0.5)",t.lineWidth=1;const a=(s.x-s.viewWidth/2)*En,r=(s.z-s.viewHeight/2)*En,o=s.viewWidth*En,c=s.viewHeight*En;t.strokeRect(a,r,o,c)}}let gl=null,Fl=null,Wr=null,br=null,Ie=null,Ni=null,Xr=null,ta=null,qd=null;const Hm=new Ri(new F(0,1,0),0),cb=new Ri(new F(0,1,0),-Sl),Pc=new F,Dc=new F;let wi=null,Yd=null,$d=null,us=null,Zd=null,Hi=null,jd=null,Fs=!1,xl=null,lr=[],Kd=null,Jd=null,An=null,Si=null,Os=!1,cs=null;function db(e,t,n){gl=e,Fl=t,cs=n||null,Wr=new Kp,br=new Pt;const i=gl.domElement;i.addEventListener("mousemove",hb),i.addEventListener("mousedown",ub),i.addEventListener("mouseup",fb),i.addEventListener("contextmenu",_b),document.addEventListener("keydown",mb)}function hb(e){const t=gl.domElement.getBoundingClientRect();if(br.x=(e.clientX-t.left)/t.width*2-1,br.y=-((e.clientY-t.top)/t.height)*2+1,Wr.setFromCamera(br,Fl),Wr.ray.intersectPlane(Hm,Pc)?Ie=on(Pc.x,Pc.z,Z):Ie=null,Fs&&xl&&Ie&&(lr=pb(xl,Ie)),An){Si={x:e.clientX,y:e.clientY};const i=e.clientX-An.x,s=e.clientY-An.y;!Os&&Math.sqrt(i*i+s*s)>P_&&(Os=!0)}}function ub(e){if(e.button===0){if(Ni===ie&&Ie){Fs=!0,xl={col:Ie.col,row:Ie.row},lr=[{col:Ie.col,row:Ie.row}],cs&&(cs.enabled=!1);return}e.shiftKey&&!Ni&&!Fs&&us==null&&Hi==null&&wi==null&&(An={x:e.clientX,y:e.clientY},Si=null,Os=!1,cs&&(cs.enabled=!1))}}function fb(e){if(e.button===0){if(Fs){lr.length>0&&Kd&&Kd(lr),Wh();return}if(Os&&An&&Si){const t=gl.domElement.getBoundingClientRect(),n=tp(An.x,An.y,t),i=tp(Si.x,Si.y,t);if(n&&i&&Jd){const s=Math.min(n.x,i.x),a=Math.min(n.z,i.z),r=Math.max(n.x,i.x),o=Math.max(n.z,i.z);Jd(s,a,r,o)}vl();return}if(vl(),Hi!=null&&Ie){const t=Ie.col*Z+Z/2,n=Ie.row*Z+Z/2;jd&&jd(Hi,t,n),Hi=null;return}if(us!=null&&Ie){const t=Ie.col*Z+Z/2,n=Ie.row*Z+Z/2;Zd&&Zd(us,t,n),us=null;return}if(wi!=null&&Ie){const t=Ie.col*Z+Z/2,n=Ie.row*Z+Z/2;Yd&&Yd(wi,t,n),wi=null;return}if(!Ni&&$d&&(Wr.setFromCamera(br,Fl),Wr.ray.intersectPlane(cb,Dc))){const n=$d();for(const i of n)if(jt(Dc.x,Dc.z,i.x,i.z)<35){wi=i.id,ta&&ta(-2,-2,0,0);return}}if(Ni&&Ie&&Xr)Xr(Ie.col,Ie.row,Ni);else if(!Ni&&Ie&&ta){const t=Ie.col*Z+Z/2,n=Ie.row*Z+Z/2;ta(Ie.col,Ie.row,t,n)}}}function pb(e,t){const n=[],i=t.col-e.col,s=t.row-e.row;if(Math.abs(i)>=Math.abs(s)){const a=Math.min(e.col,t.col),r=Math.max(e.col,t.col);for(let o=a;o<=r;o++)n.push({col:o,row:e.row})}else{const a=Math.min(e.row,t.row),r=Math.max(e.row,t.row);for(let o=a;o<=r;o++)n.push({col:e.col,row:o})}return n}function Wh(){Fs=!1,xl=null,lr=[],cs&&(cs.enabled=!0)}function vl(){const e=An!=null;An=null,Si=null,Os=!1,e&&cs&&(cs.enabled=!0)}function tp(e,t,n){const i=new Pt((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),s=new Kp;s.setFromCamera(i,Fl);const a=new F;return s.ray.intersectPlane(Hm,a)?{x:a.x,z:a.z}:null}function mb(e){if((e.key==="h"||e.key==="H"||e.key==="Home")&&qd&&qd(),e.key==="Escape"){if(Os||An){vl();return}if(Fs){Wh();return}if(Hi!=null){Hi=null;return}if(us!=null){us=null;return}wi!=null&&(wi=null)}}function _b(e){if(e.preventDefault(),Os||An){vl();return}if(Fs){Wh();return}if(Hi!=null){Hi=null;return}if(us!=null){us=null;return}if(wi!=null){wi=null;return}Ni?(Ni=null,Xr&&Xr(-1,-1,null)):ta&&ta(-1,-1)}function gb(){return Ie}function Ss(e){Ni=e}function xb(){return Ni}function vb(e){Xr=e}function Mb(e){ta=e}function yb(e){qd=e}function Sb(e){Yd=e}function Eb(e){$d=e}function ss(e){wi=e}function Ar(){return wi}function wb(e){Zd=e}function Ts(e){us=e}function Tb(e){jd=e}function Gm(e){Hi=e}function bb(){return Hi}function Ab(e){Kd=e}function Rb(){return lr}function Cb(){return Fs}function Pb(e){Jd=e}function Db(){return!Os||!An||!Si?null:{x1:Math.min(An.x,Si.x),y1:Math.min(An.y,Si.y),x2:Math.max(An.x,Si.x),y2:Math.max(An.y,Si.y)}}const ln=[];let Gi=0;function km(){ln.length=0,Gi=0}function Ib(){ln.length=0}function Lb(){return ln}function Di(e,t,n,i){switch(i){case"explosion":Do(e,t,n,8,12,60,.4,.7,3);break;case"bigExplosion":Do(e,t,n,15,20,90,.5,1,5);break;case"hit":Do(e,t,n,3,5,40,.2,.4,2);break;case"muzzleFlash":Ub(e,t,n,1,2,.08,.15,4);break;case"wallBreak":Nb(e,t,n);break;case"wallHit":Fb(e,t,n);break;case"wallRepair":Ob(e,t,n);break;case"airStrike":Bb(e,t,n);break;default:Do(e,t,n,4,6,50,.3,.5,2)}}function Do(e,t,n,i,s,a,r,o,c){const h=i+Math.floor(Math.random()*(s-i+1));for(let d=0;d<h;d++){const l=Math.random()*Math.PI*2,u=a*(.3+Math.random()*.7),f=r+Math.random()*(o-r);ln.push({id:Gi++,x:e,y:10+Math.random()*10,z:t,vx:Math.cos(l)*u,vy:20+Math.random()*40,vz:Math.sin(l)*u,color:n,life:f,maxLife:f,size:c*(.6+Math.random()*.4),type:"burst"})}}function Ub(e,t,n,i,s,a,r,o){const c=i+Math.floor(Math.random()*(s-i+1));for(let h=0;h<c;h++){const d=a+Math.random()*(r-a);ln.push({id:Gi++,x:e+(Math.random()-.5)*4,y:12+Math.random()*6,z:t+(Math.random()-.5)*4,vx:0,vy:5,vz:0,color:n,life:d,maxLife:d,size:o*(.8+Math.random()*.4),type:"flash"})}}function Nb(e,t,n){const i=8+Math.floor(Math.random()*5);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=40+Math.random()*50,o=.5+Math.random()*.3;ln.push({id:Gi++,x:e+(Math.random()-.5)*20,y:8+Math.random()*16,z:t+(Math.random()-.5)*20,vx:Math.cos(a)*r,vy:30+Math.random()*50,vz:Math.sin(a)*r,color:n,life:o,maxLife:o,size:3.5+Math.random()*2.5,type:"wallBreak",rotSpeed:(Math.random()-.5)*10})}}function Fb(e,t,n){const i=2+Math.floor(Math.random()*2);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=25+Math.random()*30,o=.15+Math.random()*.1;ln.push({id:Gi++,x:e+(Math.random()-.5)*8,y:10+Math.random()*10,z:t+(Math.random()-.5)*8,vx:Math.cos(a)*r,vy:15+Math.random()*25,vz:Math.sin(a)*r,color:n,life:o,maxLife:o,size:2+Math.random()*1.5,type:"wallHit"})}ln.push({id:Gi++,x:e,y:14,z:t,vx:0,vy:3,vz:0,color:16777215,life:.12,maxLife:.12,size:5,type:"flash"})}function Ob(e,t,n){const i=6+Math.floor(Math.random()*3);for(let s=0;s<i;s++){const a=.3+Math.random()*.2;ln.push({id:Gi++,x:e+(Math.random()-.5)*24,y:Math.random()*8,z:t+(Math.random()-.5)*24,vx:(Math.random()-.5)*10,vy:40+Math.random()*30,vz:(Math.random()-.5)*10,color:n,life:a,maxLife:a,size:2.5+Math.random()*1.5,type:"wallRepair"})}}function Bb(e,t,n){const i=25+Math.floor(Math.random()*10);for(let a=0;a<i;a++){const r=Math.random()*Math.PI*2,o=60+Math.random()*100,c=.6+Math.random()*.5;ln.push({id:Gi++,x:e+(Math.random()-.5)*30,y:5+Math.random()*20,z:t+(Math.random()-.5)*30,vx:Math.cos(r)*o,vy:50+Math.random()*80,vz:Math.sin(r)*o,color:16777215,life:c,maxLife:c,size:5+Math.random()*4,type:"burst"})}const s=30+Math.floor(Math.random()*15);for(let a=0;a<s;a++){const r=Math.random()*Math.PI*2,o=80+Math.random()*140,c=.8+Math.random()*.7;ln.push({id:Gi++,x:e+(Math.random()-.5)*60,y:10+Math.random()*30,z:t+(Math.random()-.5)*60,vx:Math.cos(r)*o,vy:30+Math.random()*60,vz:Math.sin(r)*o,color:n,life:c,maxLife:c,size:4+Math.random()*3,type:"wallBreak",rotSpeed:(Math.random()-.5)*12})}for(let a=0;a<5;a++)ln.push({id:Gi++,x:e+(Math.random()-.5)*10,y:5+a*15,z:t+(Math.random()-.5)*10,vx:0,vy:60+Math.random()*40,vz:0,color:16768324,life:.3+Math.random()*.2,maxLife:.5,size:8+Math.random()*4,type:"flash"})}function zb(e){let t=0;for(;t<ln.length;){const n=ln[t];if(n.life-=e,n.life<=0){ln[t]=ln[ln.length-1],ln.pop();continue}n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.type==="burst"?n.vy-=60*e:n.type==="wallBreak"?n.vy-=120*e:n.type==="wallHit"&&(n.vy-=80*e),n.y<0&&(n.y=0,n.vy=0),t++}}let Ic=null;function Hb(){return Ic||(Ic=new(window.AudioContext||window.webkitAudioContext)),Ic}function Jt(e,t,n,i,s,a=0){const r=e.createOscillator(),o=e.createGain();r.type=i,r.frequency.value=t;const c=e.currentTime+a;o.gain.setValueAtTime(s,c),o.gain.exponentialRampToValueAtTime(.001,c+n),r.connect(o),o.connect(e.destination),r.start(c),r.stop(c+n+.01)}function mi(e,t,n,i,s="lowpass"){const a=e.sampleRate,r=Math.floor(a*t),o=e.createBuffer(1,r,a),c=o.getChannelData(0);for(let l=0;l<r;l++)c[l]=Math.random()*2-1;const h=e.createBufferSource();h.buffer=o;const d=e.createGain();if(d.gain.setValueAtTime(n,e.currentTime),d.gain.exponentialRampToValueAtTime(.001,e.currentTime+t),i){const l=e.createBiquadFilter();l.type=s,l.frequency.value=i,h.connect(l),l.connect(d)}else h.connect(d);d.connect(e.destination),h.start()}function Ht(e){const t=Hb();switch(e){case"build":Jt(t,440,.1,"sine",.3),Jt(t,660,.1,"sine",.2,.1);break;case"build_generator":Jt(t,220,.15,"sine",.25),Jt(t,330,.12,"sine",.2,.1),Jt(t,440,.15,"triangle",.25,.2),Jt(t,660,.2,"sine",.15,.3);break;case"denied":Jt(t,200,.15,"sawtooth",.3);break;case"shoot":mi(t,.05,.4,2e3,"bandpass");break;case"explosion":mi(t,.3,.5,500,"lowpass");break;case"bigExplosion":mi(t,.5,.7,300,"lowpass");break;case"hit":mi(t,.04,.25,3e3,"bandpass");break;case"victory":Jt(t,523,.15,"sine",.3,0),Jt(t,659,.15,"sine",.3,.15),Jt(t,784,.15,"sine",.3,.3),Jt(t,1047,.25,"sine",.35,.45);break;case"defeat":Jt(t,440,.15,"sawtooth",.25,0),Jt(t,370,.15,"sawtooth",.25,.15),Jt(t,311,.2,"sawtooth",.25,.3),Jt(t,247,.35,"sawtooth",.3,.5);break;case"select":Jt(t,880,.06,"sine",.15);break;case"cancel":Jt(t,330,.08,"triangle",.15);break;case"shoot_pulse":Jt(t,880,.06,"sine",.6);break;case"upgrade":Jt(t,523,.1,"sine",.25,0),Jt(t,659,.1,"sine",.25,.1),Jt(t,784,.12,"sine",.3,.2);break;case"baseAlert":Jt(t,880,.08,"sawtooth",.4),Jt(t,440,.12,"sawtooth",.35,.08);break;case"shoot_heli":mi(t,.04,.3,4e3,"highpass"),Jt(t,1200,.03,"square",.15);break;case"heli_select":Jt(t,660,.06,"sine",.2),Jt(t,990,.08,"sine",.25,.06);break;case"heli_rally":Jt(t,1320,.1,"sine",.2),Jt(t,880,.06,"triangle",.15,.08);break;case"wall_build":mi(t,.08,.35,1200,"bandpass"),Jt(t,180,.1,"square",.2,.03),Jt(t,260,.06,"triangle",.15,.1);break;case"wall_repair":Jt(t,330,.1,"sine",.2),Jt(t,440,.1,"sine",.2,.08),Jt(t,550,.12,"triangle",.15,.16);break;case"wall_break":mi(t,.4,.5,400,"lowpass"),Jt(t,120,.15,"sawtooth",.3),Jt(t,80,.25,"square",.2,.1);break;case"airstrike_incoming":Jt(t,80,.8,"sawtooth",.15),Jt(t,120,.6,"sawtooth",.2,.3),Jt(t,180,.5,"sawtooth",.25,.6),mi(t,1.2,.2,600,"lowpass");break;case"airstrike_explosion":mi(t,1,.8,200,"lowpass"),Jt(t,40,.8,"sine",.5),Jt(t,60,.6,"sawtooth",.3,.05),mi(t,.5,.5,400,"lowpass"),Jt(t,30,1,"sine",.3,.1);break;case"airstrike_confirm":Jt(t,880,.08,"square",.3),Jt(t,660,.08,"square",.25,.1),Jt(t,440,.12,"square",.3,.2),mi(t,.15,.15,2e3,"bandpass");break}}let qr=Ml,ep=0,Ye=0,Qd=!1,Vm=null,Qe=[],Rr=[],Va=[];const Gb=document.getElementById("menu-overlay"),kb=document.getElementById("pause-overlay"),Vb=document.getElementById("victory-overlay"),Wb=document.getElementById("defeat-overlay");function Bs(e){qr=e,Gb.classList.toggle("hidden",e!==Ml),kb.classList.toggle("hidden",e!==Lc),Vb.classList.toggle("hidden",e!==rp),Wb.classList.toggle("hidden",e!==op)}function Xh(){Wm(),Xb(),Bs(Wa)}function Wm(){const e=Be();if(e){for(const t of fn())Jr(t,e);for(const t of Oe())Uh(t,e);for(const t of Vd())bm(t,e)}Ye=0,Qd=!1,oT(),fT(),xT(),Ib(),bT(),KT(),Mg(),pm(),Qe=[];for(const t of Va)t.mesh&&e&&Tm(t.mesh,e);Rr=[],Va=[],Gm(null),mn(),In(),ss(null),ws(null),Ts(null),km(),SE()}function Xb(){const e=hl(Rn,As,Ii,tt);zr(e,Be());const t=hl(Rn,li,bn,kt);zr(t,Be()),BE(Be()),ET(window._selectedDifficulty||"normal"),AT(window._selectedDifficulty||"normal"),Vm=wE(),is(),Ss(null)}function np(e,t,n){if(!n)return!1;const i=se[n];if(!i)return!1;let s=i.cost;if(n===oe){const o=fn().filter(c=>c.alive&&c.team===tt&&c.type===oe).length;s=Uc(o)}if(Tr(tt)<s||!ll(e,t,i.size,tt))return Ht("denied"),!1;if(!as(tt,s))return!1;const r=hl(n,e,t,tt,s);return zr(r,Be()),(n===Ce||n===ye||n===tn)&&Mp(r.id,tt,n),Ht(n===ie?"wall_build":n===oe?"build_generator":"build"),!0}function ip(e,t){if(e<0||t<0){mn();return}const n=fn();for(const i of n){if(!i.alive||i.team!==tt)continue;const s=se[i.type];if(s&&e>=i.col&&e<i.col+s.size&&t>=i.row&&t<i.row+s.size){s.levels?(Bm(i),Ht("select")):mn();return}}mn()}function qb(e){if(!e||!Qr(e))return;const t=Oh(e);if(!as(tt,t)){Ht("denied");return}Bh(e),Ht("build")}function Yb(e,t){if(!e||!to(e))return;const n=wr(e,t);if(!as(tt,n)){Ht("denied");return}zh(e,t),Ht("build")}function sp(e,t,n){if(e==="all")gg(tt,t,n,Oe);else if(e==="selection")Tu(Qe,t,n);else{const i=wl(Number(e),Oe);Tu(i,t,n)}ws(null),Ts(null),Ht("heli_rally")}function ea(){for(let t=0;t<Qe.length;t++)Qe[t].selected=!1;const e=Oe();for(let t=0;t<e.length;t++)e[t].squadHighlight=!1;Qe=[]}function $b(e){if(ea(),!(!e||!e.alive||e.team!==tt)&&(e.selected=!0,Qe=[e],e.squadId!=null)){const t=wl(e.squadId,Oe);for(let i=0;i<t.length;i++)t[i].id!==e.id&&(t[i].squadHighlight=!0);const n=El(e.squadId);if(n){const s=fn().find(a=>a.id===n.buildingId&&a.alive);s&&Bm(s)}}}function Zb(e,t,n,i){ea();const s=Math.min(e,n),a=Math.max(e,n),r=Math.min(t,i),o=Math.max(t,i),c=Oe(),h=[];for(let d=0;d<c.length;d++){const l=c[d];!l.alive||l.team!==tt||l.isAir||l.x>=s&&l.x<=a&&l.z>=r&&l.z<=o&&(l.selected=!0,h.push(l))}Qe=h}function jb(e){ea();const t=wl(e,Oe);for(let n=0;n<t.length;n++)t[n].selected=!0;Qe=t}function Kb(e,t){const n=Oe();let i=null,s=C_;for(let a=0;a<n.length;a++){const r=n[a];if(!r.alive||r.team!==tt||r.isAir)continue;const o=jt(e,t,r.x,r.z);o<s&&(s=o,i=r)}return i}function Jb(e,t){const n=fn();for(const i of n)if(i.alive&&i.type===ie&&i.col===e&&i.row===t)return i;return null}function Qb(e,t){const n=ze(e-1,t)===kn,i=ze(e+1,t)===kn,s=ze(e,t-1)===kn,a=ze(e,t+1)===kn,r=n||i,o=s||a;return r&&!o?la:o&&!r?jo:i&&a&&!n&&!s?ih:n&&a&&!i&&!s?sh:i&&s&&!n&&!a?eh:n&&s&&!i&&!a?nh:r&&o?la:null}function Xm(e){const t=new Set;for(const n of e){const i=`${n.col},${n.row}`;t.add(i);for(const[s,a]of[[-1,0],[1,0],[0,-1],[0,1]]){const r=n.col+s,o=n.row+a;ze(r,o)===kn&&t.add(`${r},${o}`)}}for(const n of t){const[i,s]=n.split(",").map(Number),a=Jb(i,s);if(!a)continue;const r=Qb(i,s);r&&r!==a.orientation&&(Dm(a,r),Ch(a,Be()))}}function qm(e,t,n){Rr.push({team:e,targetX:t,targetZ:n,delayTimer:V_}),Ht("airstrike_confirm")}function t2(e,t,n){const i=Be(),s=e===tt?wn+Na:-Na,a=e===tt?-Na:wn+Na,r=t+(Math.random()-.5)*200,o=t-r,c=n-s,h=Math.sqrt(o*o+c*c),d=o/h,l=c/h,u=Aw(e,i);u.position.set(r,ah,s),u.rotation.y=Math.atan2(d,l),Va.push({team:e,targetX:t,targetZ:n,bomberX:r,bomberZ:s,exitZ:a,dirX:d,dirZ:l,mesh:u,impacted:!1}),Ht("airstrike_incoming")}function e2(e,t,n){const i=Oe(),s=fn();for(let a=i.length-1;a>=0;a--){const r=i[a];if(!r.alive)continue;const o=jt(r.x,r.z,t,n);if(o>Mr)continue;let c;if(o<=pa)c=ma;else{const h=(o-pa)/(Mr-pa);c=ma+(Su-ma)*h}if(r.hp-=c,r.hp<=0){if(r.isAir&&Ar()===r.id&&(ss(null),In()),r.isSupport&&r._parentBuildingId!=null){const h=fn().find(d=>d.id===r._parentBuildingId&&d.alive);h&&Nm(h)}yp(r),Fm(r),Uh(r,Be()),Di(r.x,r.z,r.team===tt?zt.CYAN:zt.RED,"explosion")}}for(let a=s.length-1;a>=0;a--){const r=s[a];if(!r.alive)continue;const o=jt(r.x,r.z,t,n);if(o>Mr)continue;let c;if(o<=pa)c=ma;else{const h=(o-pa)/(Mr-pa);c=ma+(Su-ma)*h}if(r.hp-=c,r.hp<=0){const h=oh(r.id);h&&Bc(h.id,Oe),kh(r),Jr(r,Be()),r.type===ie?Di(r.x,r.z,r.team===tt?zt.CYAN:zt.RED,"wallBreak"):Di(r.x,r.z,r.team===tt?zt.CYAN:zt.RED,"bigExplosion"),_l()===r&&mn()}}}function n2(e){for(let t=Rr.length-1;t>=0;t--){const n=Rr[t];n.delayTimer-=e,n.delayTimer<=0&&(t2(n.team,n.targetX,n.targetZ),Rr.splice(t,1))}for(let t=Va.length-1;t>=0;t--){const n=Va[t],i=yu*e;if(n.bomberX+=n.dirX*i,n.bomberZ+=n.dirZ*i,n.mesh&&(n.mesh.position.x=n.bomberX,n.mesh.position.z=n.bomberZ,n.mesh.position.y=ah+Math.sin(Date.now()*.002)*3),!n.impacted&&jt(n.bomberX,n.bomberZ,n.targetX,n.targetZ)<yu*e*2){n.impacted=!0;const o=n.team===tt?zt.CYAN:zt.RED;e2(n.team,n.targetX,n.targetZ),Di(n.targetX,n.targetZ,o,"airStrike"),$w(n.targetX,n.targetZ,o,Mr/10),Ht("airstrike_explosion")}const s=n.team===tt&&n.bomberZ<-Na,a=n.team===kt&&n.bomberZ>wn+Na;(s||a)&&(n.mesh&&Tm(n.mesh,Be()),Va.splice(t,1))}}function Ym(e){requestAnimationFrame(Ym);const t=e/1e3,n=Math.min(t-ep,.05);ep=t;const i=il();if(i&&i.update(),qr===Wa){Ye+=n,fE(n),wT(n,{getBuildings:fn}),RT(n,Ye,{getEnergy:()=>Tr(kt),spendEnergy:D=>as(kt,D),getBuildings:fn,getUnits:Oe,getGeneratorCost:()=>{const D=fn().filter(C=>C.alive&&C.team===kt&&C.type===oe).length;return Uc(D)},createBuilding:(D,C,L,U)=>{const V=hl(D,C,L,kt,U);return zr(V,Be()),(D===Ce||D===ye||D===tn)&&Mp(V.id,kt,D),D===ie&&Xm([{col:C,row:L}]),V},isBuildable:(D,C,L)=>ll(D,C,L,kt),findPath:Ho,canUpgradeTurret:jw,startTurretUpgrade:Jw,canBranchTurret:Kw,startTurretBranch:Qw,canUpgradeBuilding:Qr,canBranchBuilding:to,startUpgrade:Bh,startBranch:zh,getUpgradeCost:Oh,getBranchCost:wr,getIncomeBreakdown:()=>$f(kt),setHelicopterRally:Hd,canRepairWall:tT,startWallRepair:nT,getRepairCost:eT,canRepairBuilding:Gr,getRepairCostForBuilding:kr,startBuildingRepair:ul,canAirStrike:D=>fl(D,Ye),initiateAirStrike:(D,C,L)=>qm(D,C,L),markAirStrikeUsed:D=>Im(D,Ye),getMatchTime:()=>Ye,getSquads:D=>bu(D),getUnitsBySquad:D=>wl(D,Oe),setUnitStance:$r,setUnitTargetPriority:lh,setUnitsStance:Sp,setUnitsTargetPriority:Ep,canSpawnMedic:D=>Hh(D,Ye),canSpawnEngineer:D=>Gh(D,Ye),spawnSupportUnit:(D,C)=>{const L=C.team===tt?-40:40,U=pl(D,C.x,C.z+L,C.team);return U._parentBuildingId=C.id,dl(U,Be()),D===na?Lm(C,Ye,U.id):D===ia&&Um(C,Ye,U.id),U}}),NT(Ye,{getUnits:Oe});const d=rT(n,Ye,{createUnit:(D,C,L,U,V,B)=>{const W=pl(D,C,L,U,V);return dl(W,Be()),B!=null&&ug(W,B),U===kt&&BT(W),W},findPath:Ho});for(const D of d)D._justRepaired?(Di(D.x,D.z,D.team===tt?zt.CYAN:zt.RED,"wallRepair"),Ht("wall_repair"),D._justRepaired=!1):(Ch(D,Be()),Ht("upgrade"));vT(n,{getUnits:Oe,getBuildings:fn,getProjectiles:Vd,getFirePoint:D=>HE(D),createProjectile:(D,C,L,U,V,B,W)=>{const G=pT(D,C,L,U,V,B,W);return G&&Hf(G,Be()),G},createHomingProjectile:(D,C,L,U,V,B,W,G,et,nt,pt)=>{const at=mT(D,C,L,U,V,B,W,G,et,nt,pt);return at&&Hf(at,Be()),Ht("shoot_pulse"),at},removeUnit:D=>{if(D.isAir&&Ar()===D.id&&(ss(null),In()),D.isSupport&&D._parentBuildingId!=null){const C=fn().find(L=>L.id===D._parentBuildingId&&L.alive);C&&Nm(C)}yp(D),Fm(D),Uh(D,Be()),Di(D.x,D.z,D.team===tt?zt.CYAN:zt.RED,"explosion"),Ht("explosion")},removeBuilding:D=>{const C=oh(D.id);C&&Bc(C.id,Oe),kh(D),Jr(D,Be()),D.type===ie?(Di(D.x,D.z,D.team===tt?zt.CYAN:zt.RED,"wallBreak"),Ht("wall_break")):(Di(D.x,D.z,D.team===tt?zt.CYAN:zt.RED,"bigExplosion"),Ht("bigExplosion")),_l()===D&&mn()},spawnParticle:Di}),lT(n,{findPath:Ho,findPathThroughWalls:_E,getBuildings:fn,getUnits:Oe,combatUnitHash:MT(),combatBuildingHash:yT()});const l=_T(n);for(const D of l)bm(D,Be());zb(n),n2(n);const u=fn(),f=u.find(D=>D.type===Rn&&D.team===tt),_=u.find(D=>D.type===Rn&&D.team===kt);!_||_.hp<=0?(Bs(rp),Ht("victory")):(!f||f.hp<=0)&&(Bs(op),Ht("defeat"));let g=!1;if(f&&f.alive){const D=Oe();for(let C=0;C<D.length;C++){const L=D[C];if(L.alive&&L.team===kt&&jt(L.x,L.z,f.x,f.z)<Nc){g=!0;break}}}g&&!Qd&&Ht("baseAlert"),Qd=g,Ye%1<n&&vg(Oe),Qe=Qe.filter(D=>D.alive);for(let D=0;D<Qe.length;D++)Qe[D].alive||(Qe[D].selected=!1);const p=bu(tt),m=fn(),x=[];for(let D=0;D<p.length;D++){const C=p[D],L=m.find(U=>U.id===C.buildingId);if(!L||!L.alive){Bc(C.id,Oe);continue}x.push({id:C.id,buildingId:C.buildingId,label:C.label,buildingType:C.buildingType,spawnStance:C.spawnStance,spawnTargetPriority:C.spawnTargetPriority,unitCount:xg(C,Oe),buildingAlive:!0,rallyX:C.rallyX,rallyZ:C.rallyZ})}const M=ZT(),y=bh(),b=il();let E=null;if(y&&b){const D=y.position.distanceTo(b.target),C=y.fov*Math.PI/180,L=2*Math.tan(C/2)*D;E={x:b.target.x,z:b.target.z,viewWidth:L*y.aspect,viewHeight:L}}const A=Ar();A&&Gd().find(C=>C.id===A);const v=u.filter(D=>D.alive&&D.team===tt&&D.type===oe).length,w=Uc(v);QT({energy:Tr(tt),enemyEnergy:Tr(kt),incomeBreakdown:$f(tt),buildings:u,generatorCost:w,units:Oe(),matchTime:Ye,dt:n,baseUnderAttack:g,rallyActive:M.rallyActive,rallyHoldingCount:M.holdingCount,rallyPushSize:M.pushSize,rallyTimeRemaining:M.timeRemaining,obstacles:Vm,cameraInfo:E,squads:x,selectedUnitCount:Qe.length,selectionBoxScreen:Db(),airStrikePending:bb()!=null})}const s=fn(),a=Oe(),r=Vd();ew(t,s),xw(t,a,Ar()),Gw(t,r),qw(t,Lb()),Zw(t);const o=gb();let c=null;if(o&&qr===Wa){const d=xb();if(d){const l=se[d];c={col:o.col,row:o.row,size:l?l.size:1}}}zE(t,c,Cb()?Rb():null);const h=dE();h&&h.render()}document.getElementById("btn-start").addEventListener("click",Xh);document.getElementById("btn-resume").addEventListener("click",()=>Bs(Wa));document.getElementById("btn-quit").addEventListener("click",()=>{Wm(),Bs(Ml)});document.getElementById("btn-restart-win").addEventListener("click",Xh);document.getElementById("btn-restart-lose").addEventListener("click",Xh);document.addEventListener("keydown",e=>{e.key==="Escape"&&(qr===Wa?Bs(Lc):qr===Lc&&Bs(Wa))});function i2(){const e=document.getElementById("render-target");lE(e),db(hE(),bh(),il()),xE((n,i,s,a)=>{const r=n*Z+Z*s/2,o=i*Z+Z*s/2,c=uu*uu;for(const h of Oe()){if(h.team!==a||h.isAir)continue;const d=h.x-r,l=h.z-o;if(d*d+l*l<=c)return!0}return!1}),vb((n,i,s)=>{if(n<0||!s){is(),Ss(null);return}np(n,i,s)?(is(),Ss(null)):(ip(n,i),_l()&&(is(),Ss(null)))}),Mb((n,i,s,a)=>{if(n===-2&&i===-2){const r=Ar();if(r){const c=Gd().find(h=>h.id===r);c&&(ea(),mn(),tb(c),Ht("heli_select"))}return}if(In(),ss(null),ip(n,i),_l()){ea();return}if(s!=null&&a!=null){const r=Kb(s,a);if(r){$b(r),Ht("select");return}}ea(),mn()}),Pb((n,i,s,a)=>{In(),ss(null),mn(),Zb(n,i,s,a),Qe.length>0&&Ht("select")}),Sb((n,i,s)=>{Hd(n,i,s),In(),Ht("heli_rally")}),Eb(()=>Gd()),wb((n,i,s)=>{sp(n,i,s)}),Tb((n,i,s)=>{const r=fn().find(o=>o.id===n&&o.alive);if(!r||!fl(r,Ye)){Ht("denied");return}if(!as(tt,$a)){Ht("denied");return}Im(r,Ye),qm(tt,i,s)}),Ab(n=>{const i=[];for(const s of n)np(s.col,s.row,ie)&&i.push(s);i.length>0&&Xm(i)}),JT(document.getElementById("sidebar"),{onBuildSelect:n=>{mn(),Ss(n),ws(null),Ts(null),Ht(n?"select":"cancel")},onBuildingUpgrade:n=>{qb(n)},onBuildingBranch:(n,i)=>{Yb(n,i)},onPushNow:()=>{jT(),Ht("select")},onMinimapClick:(n,i)=>{ap(n,i)},onHelicopterRally:(n,i,s)=>{Hd(n,i,s),Ht("heli_rally")},onHeliDeselect:()=>{ss(null),In()},onSpawnStanceChange:(n,i)=>{fg(Number(n),i),Ht("select")},onSpawnTargetChange:(n,i)=>{pg(Number(n),i),Ht("select")},onSelectionStance:n=>{Qe.length>0&&Sp(Qe,n),ws(null),Ts(null),Ht("select")},onSelectionTarget:n=>{Qe.length>0&&Ep(Qe,n),Ht("select")},onSelectionDeselect:()=>{ea()},onSelectionRallyClick:()=>{ws("selection"),Ts("selection"),is(),Ss(null),ss(null),In(),Ht("select")},onSquadCardClick:n=>{jb(Number(n)),Ht("select")},onGlobalStance:n=>{mg(tt,n,Oe),ws(null),Ts(null),Ht("select")},onGlobalTarget:n=>{_g(tt,n,Oe),Ht("select")},onGlobalRallyClick:()=>{ws("all"),Ts("all"),is(),Ss(null),ss(null),In(),Ht("select")},onRallySet:(n,i,s)=>{sp(n,i,s)},onAirStrike:n=>{if(!(!n||!fl(n,Ye))){if(Tr(tt)<$a){Ht("denied");return}Gm(n.id),nb(),is(),Ss(null),ss(null),In(),ws(null),Ts(null),Ht("airstrike_confirm")}},onSpawnMedic:n=>{if(!n||!Hh(n,Ye))return;if(!as(tt,Dr)){Ht("denied");return}const i=n.team===tt?-40:40,s=pl(na,n.x,n.z+i,n.team);s._parentBuildingId=n.id,dl(s,Be()),Lm(n,Ye,s.id),Ht("select")},onSpawnEngineer:n=>{if(!n||!Gh(n,Ye))return;if(!as(tt,Ir)){Ht("denied");return}const i=n.team===tt?-40:40,s=pl(ia,n.x,n.z+i,n.team);s._parentBuildingId=n.id,dl(s,Be()),Um(n,Ye,s.id),Ht("select")},onWallRepair:n=>{if(!n||!Gr(n))return;const i=kr(n);if(!as(tt,i)){Ht("denied");return}ul(n),Ht("wall_repair")},onBuildingRepair:n=>{if(!n||!Gr(n))return;const i=kr(n);if(!as(tt,i)){Ht("denied");return}ul(n),Ht("wall_repair")},onWallDemolish:n=>{if(!n||n.type!==ie||!n.alive)return;const i=iT(n);i>0&&TT(tt,i),Jr(n,Be()),Di(n.x,n.z,zt.CYAN,"wallBreak"),Ht("wall_break"),mn()},onWallOrient:(n,i)=>{!n||n.type!==ie||!n.alive||(Dm(n,i),Ch(n,Be()),Ht("select"))}}),Xw(Be()),Yw(Be()),km();const t=pn(As,Ii,Z);yb(()=>{ap(t.x,t.z)}),Bs(Ml),requestAnimationFrame(Ym)}function ap(e,t){const n=bh(),i=il();if(!n||!i)return;const s=e-i.target.x,a=t-i.target.z;i.target.x=e,i.target.z=t,n.position.x+=s,n.position.z+=a}i2();
