(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const ti=1600,Un=1600,J=40,qt=ti/J,Ke=Un/J,st=0,Kt=1,cl="menu",Ga="playing",yc="paused",Gf="victory",kf="defeat",Ho=1,dl=13,hl=14,Rs=26,Vf=27,Um=38,ws=19,es=36,si=19,Tn=2,Nn="core",Je="barracks",ke="turret",Xe="factory",Be="generator",on="helipad",Wt="wall",Qt={[Nn]:{hp:5e3,cost:0,size:3,buildTime:0,label:"Core",description:"Main base. Destroy the enemy core to win."},[Je]:{hp:400,cost:75,size:2,buildTime:5,produceUnit:"rifle",produceTime:16,label:"Barracks",description:"Produces Rifle infantry. Upgradeable.",levels:[{produceTime:16,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:13,hpMult:1.2,damageMult:1.15,speedMult:1,upgradeCost:100},{produceTime:10,hpMult:1.4,damageMult:1.3,speedMult:1,upgradeCost:200}],branches:{A:{name:"Assault Doctrine",desc:"Trains Assault units",cost:400,produceUnit:"assault",produceTime:12,hpMult:1.5,damageMult:1.4,speedMult:1},B:{name:"Rapid Deployment",desc:"Fast production + speed",cost:450,produceUnit:"rifle",produceTime:7,hpMult:1.3,damageMult:1.2,speedMult:1.25}}},[ke]:{hp:200,cost:120,size:1,buildTime:6,color:[0,255,255],label:"Pulse Turret",description:"Rapid-fire energy bolts. Upgradeable.",levels:[{damage:12,fireRate:.35,range:120,upgradeCost:0},{damage:20,fireRate:.28,range:135,upgradeCost:100},{damage:32,fireRate:.2,range:155,upgradeCost:200}],branches:{A:{name:"Overclock",desc:"Insane fire rate",cost:550,damage:28,fireRate:.09,range:160},B:{name:"Heavy Bolts",desc:"Splash on hit",cost:600,damage:55,fireRate:.25,range:165,splashRadius:50,splashDamage:25}}},[Xe]:{hp:600,cost:225,size:2,buildTime:8,produceUnit:"tank",produceTime:32,label:"Factory",description:"Produces Tank units. Upgradeable.",levels:[{produceTime:32,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:26,hpMult:1.15,damageMult:1.1,speedMult:1,upgradeCost:175},{produceTime:22,hpMult:1.3,damageMult:1.25,speedMult:1,upgradeCost:350}],branches:{A:{name:"Heavy Armor",desc:"Massive HP, slower build",cost:600,produceUnit:"tank",produceTime:28,hpMult:1.8,damageMult:1.2,speedMult:.85},B:{name:"Siege Cannons",desc:"High damage + range",cost:550,produceUnit:"tank",produceTime:22,hpMult:1.2,damageMult:1.6,speedMult:1,rangeMult:1.3}}}};Qt[Be]={hp:150,cost:60,size:1,buildTime:5,label:"Generator",description:"Increases energy income. Upgradeable.",incomeBonus:3,levels:[{incomeBonus:3,territoryMult:1,upgradeCost:0},{incomeBonus:5,territoryMult:1,upgradeCost:100},{incomeBonus:7,territoryMult:1,upgradeCost:200}],branches:{A:{name:"Overcharge",desc:"Maximum energy output",cost:500,incomeBonus:10,territoryMult:1},B:{name:"Capacitor Network",desc:"Income + 2x territory bonus",cost:425,incomeBonus:6,territoryMult:2}}};Qt[on]={hp:500,cost:300,size:2,buildTime:10,produceUnit:"helicopter",produceTime:40,label:"Helipad",description:"Produces Helicopters. Upgradeable.",levels:[{produceTime:40,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:34,hpMult:1.15,damageMult:1.15,speedMult:1,upgradeCost:200},{produceTime:28,hpMult:1.3,damageMult:1.3,speedMult:1,upgradeCost:400}],branches:{A:{name:"Gunship Bay",desc:"Heavy firepower helicopters",cost:600,produceUnit:"helicopter",produceTime:30,hpMult:1.2,damageMult:1.6,speedMult:1},B:{name:"Rapid Scramble",desc:"Fast production + speed",cost:550,produceUnit:"helicopter",produceTime:20,hpMult:1.1,damageMult:1.1,speedMult:1.15}}};Qt[Wt]={hp:120,cost:25,size:1,buildTime:3,label:"Wall",description:"Destructible barrier. Block and funnel enemies.",repairCost:10,repairTime:2,levels:[{hp:120,upgradeCost:0},{hp:250,upgradeCost:30},{hp:400,upgradeCost:60}]};const Wf=[Je,ke,Xe,Be,on,Wt],Ca="rifle",Pa="assault",Da="tank",pn="helicopter",Ia={[Ca]:{hp:50,speed:35,damage:8,range:120,fireRate:1,size:6,label:"Rifle"},[Pa]:{hp:160,speed:28,damage:14,range:100,fireRate:.8,size:8,label:"Assault"},[Da]:{hp:400,speed:16,damage:35,range:160,fireRate:.5,size:14,label:"Tank"},[pn]:{hp:700,speed:60,damage:4,range:130,fireRate:8,size:10,label:"Helicopter",isAir:!0}},ul=60,Nm=120,Fm=.6,Om=80,zh=400,Bm=2,Hh=500,zm=1.5,Es=10,la={barracks:4,turrets:4,factories:3,generators:6,helipads:2,walls:12},Yn={build:{barracks:4,turret:25,factory:45,generator:3,helipad:80,wall:35},shared:{turret:80,generator:70,wall:50},upgrade:{turret:40,barracks:30,factory:65,generator:35,helipad:100,wall:55}},Cl=600,Gh=1e3,Hm=.5,kh=.15,ui={rallyRow:9,minSize:3,minWaveStrength:500,turretPower:250,wallPower:80,cooldownAfterFailure:10,failureStrengthMult:.3,sizeGrow:2,sizeShrink:1,maxSize:10},Xf=29,qf=4,Yf=20,Gm=150,Vh=1.8,km=1.2,Vm=3,Wm=.3,Xm=.5,Sc=350,qm=500,zt={BG:263184,CYAN:65535,GOLD:16766720,RED:16724530,PLAYER:65535,ENEMY:16724530,FACTORY:16766720,HELIPAD:3342180,UNIT_PLAYER:65535,UNIT_ENEMY:16724530,PROJECTILE_PLAYER:65535,PROJECTILE_ENEMY:16724530,BUILD_VALID:65535,BUILD_INVALID:16724530},Ym=55,$m=1,Zm=5e3,jm=900,Km=500,Jm=.25,Qm=Math.PI/2.1,t0=200,e0=2400,n0=.06,i0=1710638,s0=.6,a0=12634367,r0=.9,o0=4210848,l0=.3,c0=1710654,d0=526352,h0=.4,u0=.22,f0=.12,p0=.7,$f=.15,Pl=3,Wh=37,Dl=2,Xh=37,Zr=3,qh=[{kind:"tesla_coil",cellsW:2,cellsD:2,heightMin:30,heightMax:55,weight:.12,hpCategory:"large"},{kind:"power_cell",cellsW:2,cellsD:2,heightMin:16,heightMax:32,weight:.12,hpCategory:"small"},{kind:"circuit_monolith",cellsW:2,cellsD:2,heightMin:14,heightMax:30,weight:.15,hpCategory:"small"},{kind:"capacitor_bank",cellsW:4,cellsD:2,heightMin:14,heightMax:28,weight:.1,hpCategory:"medium"},{kind:"relay_tower",cellsW:2,cellsD:2,heightMin:50,heightMax:85,weight:.1,hpCategory:"large"},{kind:"data_obelisk",cellsW:2,cellsD:2,heightMin:22,heightMax:42,weight:.1,hpCategory:"large"},{kind:"plasma_conduit",cellsW:4,cellsD:2,heightMin:10,heightMax:20,weight:.08,hpCategory:"medium"},{kind:"power_pylon",cellsW:2,cellsD:2,heightMin:60,heightMax:100,weight:.08,hpCategory:"large"},{kind:"transformer_stack",cellsW:2,cellsD:2,heightMin:20,heightMax:38,weight:.08,hpCategory:"medium"},{kind:"cable_rack",cellsW:6,cellsD:2,heightMin:15,heightMax:25,weight:.07,hpCategory:"medium"}],Yh=["#00ccff","#00ffaa","#ff00cc","#aa44ff","#00aaff"],$h=["#0a1628","#0c1a30","#0e1e38","#101828"],Zh=18,m0=30,_0=20,g0={1:8,2:14},x0=20,v0=.15,M0=.5,y0=350,S0={1:8,2:12},E0=18,b0=.12,w0=.4,T0={1:10,2:16},A0=22,R0=.12,C0=.45,P0={1:8,2:12},D0=16,I0=.15,L0=.4,U0={1:10,2:16},N0=22,F0=.12,O0=.45,B0={1:4,2:6},z0=0,H0=0,$e=0,gi=1,Hd=2,On=3,Fn=4,G0=2,k0=20,V0=80,Zf=160,jh=200,W0=1,Kh={rusher:{pushRatio:.7,upgradePriority:"damage"},turtle:{pushRatio:1.2,upgradePriority:"defense"},balanced:{pushRatio:.9,upgradePriority:"adaptive"}},Jh={rusher:["generator","barracks","barracks","generator","turret","barracks","factory","generator","turret","barracks","helipad","generator","turret","factory","turret","generator","helipad","generator"],turtle:["generator","barracks","turret","generator","turret","barracks","generator","factory","turret","wall","wall","wall","turret","generator","factory","barracks","helipad","generator"],balanced:["generator","barracks","generator","turret","barracks","factory","generator","turret","barracks","generator","turret","factory","helipad","turret","generator","barracks","helipad","generator"]},Qh={easy:{buildInterval:12,upgradeDelay:90,upgradeInterval:25,incomeMult:.8,startEnergy:500},normal:{buildInterval:8,upgradeDelay:50,upgradeInterval:15,incomeMult:1.2,startEnergy:600},hard:{buildInterval:5,upgradeDelay:30,upgradeInterval:10,incomeMult:1.8,startEnergy:750}},ka={easy:{aiIncomeMult:.8,playerStartEnergy:600,aiStartEnergy:500,label:"EASY"},normal:{aiIncomeMult:1.2,playerStartEnergy:500,aiStartEnergy:600,label:"NORMAL"},hard:{aiIncomeMult:1.8,playerStartEnergy:400,aiStartEnergy:750,label:"HARD"}},X0=6,tu=1.5,q0=5,Y0=150,$0=6,Z0=250,j0=40,jf=4,Kf=12,K0=3,J0=3,Ec={rifle:1,assault:2.5,tank:5,helicopter:0},ln="advance",Qs="defend",br="hold",ta="rally",ea="any",wr="units",Tr="buildings",Aa=Qs,Ra=ea,Q0=30,t_=8,e_=16777215,n_=65535,eu=6,i_=60,nu=750,iu=400,s_=60,su={any:{rifle:0,assault:0,tank:0,helicopter:0,turret:0,barracks:0,factory:0,generator:0,helipad:0,wall:0,core:0},units:{rifle:50,assault:50,tank:50,helicopter:50,turret:-30,barracks:-30,factory:-30,generator:-30,helipad:-30,wall:-30,core:-30},buildings:{rifle:-30,assault:-30,tank:-30,helicopter:-30,turret:50,barracks:50,factory:50,generator:50,helipad:50,wall:50,core:50},rally:{rifle:60,assault:60,tank:80,helicopter:40,turret:100,barracks:20,factory:20,generator:20,helipad:20,wall:20,core:20}},a_=100,r_=150,o_=.5,l_=25,c_=.5,na="horizontal",Go="vertical",Gd="corner_ne",kd="corner_nw",Vd="corner_se",Wd="corner_sw",Jf=.5,Va=2e4,d_=120,h_=3,au=250,Xd=120,mr=200,ca=60,da=2e3,ru=200,La=400,u_=180,f_=25e3;function se(n,t,e,i){const s=e-n,a=i-t;return Math.sqrt(s*s+a*a)}function yn(n,t,e){return{x:n*e+e/2,z:t*e+e/2}}function Ln(n,t,e){return{col:Math.floor(n/e),row:Math.floor(t/e)}}let p_=1;function zr(){return p_++}function m_(n,t){return n+Math.random()*(t-n)}function ou(n,t){return Math.floor(m_(n,t+1))}class qd{constructor(t){this.cellSize=t,this.cells=new Map,this._queryBuf=[]}_key(t,e){return t*73856093^e*19349663}clear(){this.cells.clear()}insert(t){const e=Math.floor(t.x/this.cellSize),i=Math.floor(t.z/this.cellSize),s=this._key(e,i);let a=this.cells.get(s);a||(a=[],this.cells.set(s,a)),a.push(t)}queryNear(t,e){const i=Math.floor(t/this.cellSize),s=Math.floor(e/this.cellSize);this._queryBuf.length=0;for(let a=-1;a<=1;a++)for(let r=-1;r<=1;r++){const o=this.cells.get(this._key(i+a,s+r));if(o)for(let d=0;d<o.length;d++)this._queryBuf.push(o[d])}return this._queryBuf}forEachNear(t,e,i){const s=Math.floor(t/this.cellSize),a=Math.floor(e/this.cellSize);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const d=this.cells.get(this._key(s+r,a+o));if(d)for(let c=0;c<d.length;c++)i(d[c])}}}let jn=[],bc={[st]:{barracks:0,factory:0,helipad:0},[Kt]:{barracks:0,factory:0,helipad:0}};function __(n){return n===Xe?"factory":n===on?"helipad":"barracks"}function g_(n){return n==="factory"?"Factory":n==="helipad"?"Helipad":"Barracks"}function Qf(n,t,e){const i=__(e);bc[t][i]++;const s=`${g_(i)} ${bc[t][i]}`,a={id:zr(),buildingId:n,team:t,buildingType:e,label:s,spawnStance:Aa,spawnTargetPriority:Ra,unitIds:new Set,rallyX:null,rallyZ:null};return jn.push(a),a}function wc(n,t){const e=jn.findIndex(i=>i.id===n);if(e!==-1){if(t){const i=t();for(let s=0;s<i.length;s++){const a=i[s];a.squadId===n&&(a.squadId=null)}}jn.splice(e,1)}}function Yd(n){for(let t=0;t<jn.length;t++)if(jn[t].buildingId===n)return jn[t];return null}function x_(n,t){if(!n||n.type===pn)return;const e=Yd(t);e&&(n.squadId=e.id,n.stance=e.spawnStance,n.targetPriority=e.spawnTargetPriority,e.unitIds.add(n.id))}function tp(n){if(!n||n.squadId==null)return;const t=fl(n.squadId);t&&t.unitIds.delete(n.id)}function v_(n,t){const e=fl(n);e&&(e.spawnStance=t)}function M_(n,t){const e=fl(n);e&&(e.spawnTargetPriority=t)}function Hr(n,t){if(!n||!n.alive)return;const e=n.stance!==t;n.stance=t,e&&(n.path=null,n.pathIndex=0,n._defendTargetId=null,n._wallTarget=null,t!==ln&&(n.rallyHold=!1,n._rallyAssigned=!1))}function $d(n,t){!n||!n.alive||(n.targetPriority=t)}function ep(n,t){for(let e=0;e<n.length;e++)Hr(n[e],t)}function np(n,t){for(let e=0;e<n.length;e++)$d(n[e],t)}function lu(n,t,e){for(let i=0;i<n.length;i++){const s=n[i];!s||!s.alive||(s.squadRallyX=t,s.squadRallyZ=e,Hr(s,ta))}}function y_(n,t,e){if(!e)return;const i=e();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===n&&a.type!==pn&&Hr(a,t)}}function S_(n,t,e){if(!e)return;const i=e();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===n&&a.type!==pn&&$d(a,t)}}function E_(n,t,e,i){if(!i)return;const s=i();for(let a=0;a<s.length;a++){const r=s[a];r.alive&&r.team===n&&r.type!==pn&&(r.squadRallyX=t,r.squadRallyZ=e,Hr(r,ta))}}function fl(n){for(let t=0;t<jn.length;t++)if(jn[t].id===n)return jn[t];return null}function cu(n){return jn.filter(t=>t.team===n)}function b_(n,t){if(!n||!t)return 0;let e=0;const i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===n.id&&e++;return e}function pl(n,t){if(!t)return[];const e=[],i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===n&&e.push(i[s]);return e}function w_(n){const t=n(),e=new Set;for(let i=0;i<t.length;i++)t[i].alive&&e.add(t[i].id);for(let i=0;i<jn.length;i++){const s=jn[i];for(const a of s.unitIds)e.has(a)||s.unitIds.delete(a)}}function T_(){jn=[],bc={[st]:{barracks:0,factory:0,helipad:0},[Kt]:{barracks:0,factory:0,helipad:0}}}const Zd="183",ss={ROTATE:0,DOLLY:1,PAN:2},Ua={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},A_=0,du=1,R_=2,bo=1,C_=2,_r=3,Ps=0,Bn=1,$n=2,Li=0,Oa=1,Tc=2,hu=3,uu=4,P_=5,Xs=100,D_=101,I_=102,L_=103,U_=104,N_=200,F_=201,O_=202,B_=203,Ac=204,Rc=205,z_=206,H_=207,G_=208,k_=209,V_=210,W_=211,X_=212,q_=213,Y_=214,Cc=0,Pc=1,Dc=2,Wa=3,Ic=4,Lc=5,Uc=6,Nc=7,ip=0,$_=1,Z_=2,Ui=0,sp=1,ap=2,rp=3,jd=4,op=5,lp=6,cp=7,dp=300,ia=301,Xa=302,Il=303,Ll=304,ml=306,Fc=1e3,ns=1001,Oc=1002,un=1003,j_=1004,jr=1005,Sn=1006,Ul=1007,Ys=1008,Zn=1009,hp=1010,up=1011,Ar=1012,Kd=1013,Bi=1014,Pi=1015,Kn=1016,Jd=1017,Qd=1018,Rr=1020,fp=35902,pp=35899,mp=1021,_p=1022,yi=1023,os=1026,$s=1027,gp=1028,th=1029,qa=1030,eh=1031,nh=1033,wo=33776,To=33777,Ao=33778,Ro=33779,Bc=35840,zc=35841,Hc=35842,Gc=35843,kc=36196,Vc=37492,Wc=37496,Xc=37488,qc=37489,Yc=37490,$c=37491,Zc=37808,jc=37809,Kc=37810,Jc=37811,Qc=37812,td=37813,ed=37814,nd=37815,id=37816,sd=37817,ad=37818,rd=37819,od=37820,ld=37821,cd=36492,dd=36494,hd=36495,ud=36283,fd=36284,pd=36285,md=36286,K_=3200,xp=0,J_=1,bs="",ei="srgb",Ya="srgb-linear",ko="linear",Me="srgb",ha=7680,fu=519,Q_=512,tg=513,eg=514,ih=515,ng=516,ig=517,sh=518,sg=519,pu=35044,mu="300 es",Di=2e3,Cr=2001;function ag(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Vo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function rg(){const n=Vo("canvas");return n.style.display="block",n}const _u={};function gu(...n){const t="THREE."+n.shift();console.log(t,...n)}function vp(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xt(...n){n=vp(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function fe(...n){n=vp(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Wo(...n){const t=n.join(" ");t in _u||(_u[t]=!0,Xt(...n))}function og(n,t,e){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}const lg={[Cc]:Pc,[Dc]:Uc,[Ic]:Nc,[Wa]:Lc,[Pc]:Cc,[Uc]:Dc,[Nc]:Ic,[Lc]:Wa};class sa{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Co=Math.PI/180,_d=180/Math.PI;function Gr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]).toLowerCase()}function ce(n,t,e){return Math.max(t,Math.min(e,n))}function cg(n,t){return(n%t+t)%t}function Nl(n,t,e){return(1-e)*n+e*t}function or(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Pn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const dg={DEG2RAD:Co};class Pt{constructor(t=0,e=0){Pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ce(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ds{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,a,r,o){let d=i[s+0],c=i[s+1],h=i[s+2],l=i[s+3],u=a[r+0],f=a[r+1],_=a[r+2],g=a[r+3];if(l!==g||d!==u||c!==f||h!==_){let m=d*u+c*f+h*_+l*g;m<0&&(u=-u,f=-f,_=-_,g=-g,m=-m);let p=1-o;if(m<.9995){const v=Math.acos(m),M=Math.sin(v);p=Math.sin(p*v)/M,o=Math.sin(o*v)/M,d=d*p+u*o,c=c*p+f*o,h=h*p+_*o,l=l*p+g*o}else{d=d*p+u*o,c=c*p+f*o,h=h*p+_*o,l=l*p+g*o;const v=1/Math.sqrt(d*d+c*c+h*h+l*l);d*=v,c*=v,h*=v,l*=v}}t[e]=d,t[e+1]=c,t[e+2]=h,t[e+3]=l}static multiplyQuaternionsFlat(t,e,i,s,a,r){const o=i[s],d=i[s+1],c=i[s+2],h=i[s+3],l=a[r],u=a[r+1],f=a[r+2],_=a[r+3];return t[e]=o*_+h*l+d*f-c*u,t[e+1]=d*_+h*u+c*l-o*f,t[e+2]=c*_+h*f+o*u-d*l,t[e+3]=h*_-o*l-d*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,d=Math.sin,c=o(i/2),h=o(s/2),l=o(a/2),u=d(i/2),f=d(s/2),_=d(a/2);switch(r){case"XYZ":this._x=u*h*l+c*f*_,this._y=c*f*l-u*h*_,this._z=c*h*_+u*f*l,this._w=c*h*l-u*f*_;break;case"YXZ":this._x=u*h*l+c*f*_,this._y=c*f*l-u*h*_,this._z=c*h*_-u*f*l,this._w=c*h*l+u*f*_;break;case"ZXY":this._x=u*h*l-c*f*_,this._y=c*f*l+u*h*_,this._z=c*h*_+u*f*l,this._w=c*h*l-u*f*_;break;case"ZYX":this._x=u*h*l-c*f*_,this._y=c*f*l+u*h*_,this._z=c*h*_-u*f*l,this._w=c*h*l+u*f*_;break;case"YZX":this._x=u*h*l+c*f*_,this._y=c*f*l+u*h*_,this._z=c*h*_-u*f*l,this._w=c*h*l-u*f*_;break;case"XZY":this._x=u*h*l-c*f*_,this._y=c*f*l-u*h*_,this._z=c*h*_+u*f*l,this._w=c*h*l+u*f*_;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],a=e[8],r=e[1],o=e[5],d=e[9],c=e[2],h=e[6],l=e[10],u=i+o+l;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-d)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>l){const f=2*Math.sqrt(1+i-o-l);this._w=(h-d)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>l){const f=2*Math.sqrt(1+o-i-l);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(d+h)/f}else{const f=2*Math.sqrt(1+l-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(d+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,a=t._z,r=t._w,o=e._x,d=e._y,c=e._z,h=e._w;return this._x=i*h+r*o+s*c-a*d,this._y=s*h+r*d+a*o-i*c,this._z=a*h+r*c+i*d-s*o,this._w=r*h-i*o-s*d-a*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let d=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);d=Math.sin(d*c)/h,e=Math.sin(e*c)/h,this._x=this._x*d+i*e,this._y=this._y*d+s*e,this._z=this._z*d+a*e,this._w=this._w*d+r*e,this._onChangeCallback()}else this._x=this._x*d+i*e,this._y=this._y*d+s*e,this._z=this._z*d+a*e,this._w=this._w*d+r*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*s,this.y=a[1]*e+a[4]*i+a[7]*s,this.z=a[2]*e+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*e+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*e+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*e+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,d=t.w,c=2*(r*s-o*i),h=2*(o*e-a*s),l=2*(a*i-r*e);return this.x=e+d*c+r*l-o*h,this.y=i+d*h+o*c-a*l,this.z=s+d*l+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s,this.y=a[1]*e+a[5]*i+a[9]*s,this.z=a[2]*e+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,a=t.z,r=e.x,o=e.y,d=e.z;return this.x=s*d-a*o,this.y=a*r-i*d,this.z=i*o-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Fl.copy(this).projectOnVector(t),this.sub(Fl)}reflect(t){return this.sub(Fl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ce(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fl=new F,xu=new Ds;class ne{constructor(t,e,i,s,a,r,o,d,c){ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,a,r,o,d,c)}set(t,e,i,s,a,r,o,d,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=a,h[5]=d,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,a=this.elements,r=i[0],o=i[3],d=i[6],c=i[1],h=i[4],l=i[7],u=i[2],f=i[5],_=i[8],g=s[0],m=s[3],p=s[6],v=s[1],M=s[4],y=s[7],T=s[2],b=s[5],A=s[8];return a[0]=r*g+o*v+d*T,a[3]=r*m+o*M+d*b,a[6]=r*p+o*y+d*A,a[1]=c*g+h*v+l*T,a[4]=c*m+h*M+l*b,a[7]=c*p+h*y+l*A,a[2]=u*g+f*v+_*T,a[5]=u*m+f*M+_*b,a[8]=u*p+f*y+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],d=t[6],c=t[7],h=t[8];return e*r*h-e*o*c-i*a*h+i*o*d+s*a*c-s*r*d}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],d=t[6],c=t[7],h=t[8],l=h*r-o*c,u=o*d-h*a,f=c*a-r*d,_=e*l+i*u+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=l*g,t[1]=(s*c-h*i)*g,t[2]=(o*i-s*r)*g,t[3]=u*g,t[4]=(h*e-s*d)*g,t[5]=(s*a-o*e)*g,t[6]=f*g,t[7]=(i*d-c*e)*g,t[8]=(r*e-i*a)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,a,r,o){const d=Math.cos(a),c=Math.sin(a);return this.set(i*d,i*c,-i*(d*r+c*o)+r+t,-s*c,s*d,-s*(-c*r+d*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ol.makeScale(t,e)),this}rotate(t){return this.premultiply(Ol.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ol.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ol=new ne,vu=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mu=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hg(){const n={enabled:!0,workingColorSpace:Ya,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===Me&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Me&&(s.r=Ba(s.r),s.g=Ba(s.g),s.b=Ba(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bs?ko:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Wo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Wo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ya]:{primaries:t,whitePoint:i,transfer:ko,toXYZ:vu,fromXYZ:Mu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:t,whitePoint:i,transfer:Me,toXYZ:vu,fromXYZ:Mu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),n}const pe=hg();function as(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ba(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ua;class ug{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ua===void 0&&(ua=Vo("canvas")),ua.width=t.width,ua.height=t.height;const s=ua.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ua}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Vo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=as(a[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(as(e[i]/255)*255):e[i]=as(e[i]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fg=0;class ah{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Gr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Bl(s[r].image)):a.push(Bl(s[r]))}else a=Bl(s);i.url=a}return e||(t.images[this.uuid]=i),i}}function Bl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ug.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}let pg=0;const zl=new F;class Rn extends sa{constructor(t=Rn.DEFAULT_IMAGE,e=Rn.DEFAULT_MAPPING,i=ns,s=ns,a=Sn,r=Ys,o=yi,d=Zn,c=Rn.DEFAULT_ANISOTROPY,h=bs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Gr(),this.name="",this.source=new ah(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=d,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(zl).x}get height(){return this.source.getSize(zl).y}get depth(){return this.source.getSize(zl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fc:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case Oc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fc:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case Oc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=dp;Rn.DEFAULT_ANISOTROPY=1;class Ge{constructor(t=0,e=0,i=0,s=1){Ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,a;const d=t.elements,c=d[0],h=d[4],l=d[8],u=d[1],f=d[5],_=d[9],g=d[2],m=d[6],p=d[10];if(Math.abs(h-u)<.01&&Math.abs(l-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(l+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,y=(f+1)/2,T=(p+1)/2,b=(h+u)/4,A=(l+g)/4,x=(_+m)/4;return M>y&&M>T?M<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(M),s=b/i,a=A/i):y>T?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=b/s,a=x/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=A/a,s=x/a),this.set(i,s,a,e),this}let v=Math.sqrt((m-_)*(m-_)+(l-g)*(l-g)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(l-g)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mg extends sa{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ge(0,0,t,e),this.scissorTest=!1,this.viewport=new Ge(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},a=new Rn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ah(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends mg{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Mp extends Rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _g extends Rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fe{constructor(t,e,i,s,a,r,o,d,c,h,l,u,f,_,g,m){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,a,r,o,d,c,h,l,u,f,_,g,m)}set(t,e,i,s,a,r,o,d,c,h,l,u,f,_,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=a,p[5]=r,p[9]=o,p[13]=d,p[2]=c,p[6]=h,p[10]=l,p[14]=u,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/fa.setFromMatrixColumn(t,0).length(),a=1/fa.setFromMatrixColumn(t,1).length(),r=1/fa.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),d=Math.cos(s),c=Math.sin(s),h=Math.cos(a),l=Math.sin(a);if(t.order==="XYZ"){const u=r*h,f=r*l,_=o*h,g=o*l;e[0]=d*h,e[4]=-d*l,e[8]=c,e[1]=f+_*c,e[5]=u-g*c,e[9]=-o*d,e[2]=g-u*c,e[6]=_+f*c,e[10]=r*d}else if(t.order==="YXZ"){const u=d*h,f=d*l,_=c*h,g=c*l;e[0]=u+g*o,e[4]=_*o-f,e[8]=r*c,e[1]=r*l,e[5]=r*h,e[9]=-o,e[2]=f*o-_,e[6]=g+u*o,e[10]=r*d}else if(t.order==="ZXY"){const u=d*h,f=d*l,_=c*h,g=c*l;e[0]=u-g*o,e[4]=-r*l,e[8]=_+f*o,e[1]=f+_*o,e[5]=r*h,e[9]=g-u*o,e[2]=-r*c,e[6]=o,e[10]=r*d}else if(t.order==="ZYX"){const u=r*h,f=r*l,_=o*h,g=o*l;e[0]=d*h,e[4]=_*c-f,e[8]=u*c+g,e[1]=d*l,e[5]=g*c+u,e[9]=f*c-_,e[2]=-c,e[6]=o*d,e[10]=r*d}else if(t.order==="YZX"){const u=r*d,f=r*c,_=o*d,g=o*c;e[0]=d*h,e[4]=g-u*l,e[8]=_*l+f,e[1]=l,e[5]=r*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*l+_,e[10]=u-g*l}else if(t.order==="XZY"){const u=r*d,f=r*c,_=o*d,g=o*c;e[0]=d*h,e[4]=-l,e[8]=c*h,e[1]=u*l+g,e[5]=r*h,e[9]=f*l-_,e[2]=_*l-f,e[6]=o*h,e[10]=g*l+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gg,t,xg)}lookAt(t,e,i){const s=this.elements;return kn.subVectors(t,e),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),us.crossVectors(i,kn),us.lengthSq()===0&&(Math.abs(i.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),us.crossVectors(i,kn)),us.normalize(),Kr.crossVectors(kn,us),s[0]=us.x,s[4]=Kr.x,s[8]=kn.x,s[1]=us.y,s[5]=Kr.y,s[9]=kn.y,s[2]=us.z,s[6]=Kr.z,s[10]=kn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,a=this.elements,r=i[0],o=i[4],d=i[8],c=i[12],h=i[1],l=i[5],u=i[9],f=i[13],_=i[2],g=i[6],m=i[10],p=i[14],v=i[3],M=i[7],y=i[11],T=i[15],b=s[0],A=s[4],x=s[8],S=s[12],I=s[1],P=s[5],N=s[9],L=s[13],k=s[2],B=s[6],V=s[10],H=s[14],et=s[3],tt=s[7],ht=s[11],ot=s[15];return a[0]=r*b+o*I+d*k+c*et,a[4]=r*A+o*P+d*B+c*tt,a[8]=r*x+o*N+d*V+c*ht,a[12]=r*S+o*L+d*H+c*ot,a[1]=h*b+l*I+u*k+f*et,a[5]=h*A+l*P+u*B+f*tt,a[9]=h*x+l*N+u*V+f*ht,a[13]=h*S+l*L+u*H+f*ot,a[2]=_*b+g*I+m*k+p*et,a[6]=_*A+g*P+m*B+p*tt,a[10]=_*x+g*N+m*V+p*ht,a[14]=_*S+g*L+m*H+p*ot,a[3]=v*b+M*I+y*k+T*et,a[7]=v*A+M*P+y*B+T*tt,a[11]=v*x+M*N+y*V+T*ht,a[15]=v*S+M*L+y*H+T*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],d=t[9],c=t[13],h=t[2],l=t[6],u=t[10],f=t[14],_=t[3],g=t[7],m=t[11],p=t[15],v=d*f-c*u,M=o*f-c*l,y=o*u-d*l,T=r*f-c*h,b=r*u-d*h,A=r*l-o*h;return e*(g*v-m*M+p*y)-i*(_*v-m*T+p*b)+s*(_*M-g*T+p*A)-a*(_*y-g*b+m*A)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],d=t[6],c=t[7],h=t[8],l=t[9],u=t[10],f=t[11],_=t[12],g=t[13],m=t[14],p=t[15],v=e*o-i*r,M=e*d-s*r,y=e*c-a*r,T=i*d-s*o,b=i*c-a*o,A=s*c-a*d,x=h*g-l*_,S=h*m-u*_,I=h*p-f*_,P=l*m-u*g,N=l*p-f*g,L=u*p-f*m,k=v*L-M*N+y*P+T*I-b*S+A*x;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/k;return t[0]=(o*L-d*N+c*P)*B,t[1]=(s*N-i*L-a*P)*B,t[2]=(g*A-m*b+p*T)*B,t[3]=(u*b-l*A-f*T)*B,t[4]=(d*I-r*L-c*S)*B,t[5]=(e*L-s*I+a*S)*B,t[6]=(m*y-_*A-p*M)*B,t[7]=(h*A-u*y+f*M)*B,t[8]=(r*N-o*I+c*x)*B,t[9]=(i*I-e*N-a*x)*B,t[10]=(_*b-g*y+p*v)*B,t[11]=(l*y-h*b-f*v)*B,t[12]=(o*S-r*P-d*x)*B,t[13]=(e*P-i*S+s*x)*B,t[14]=(g*M-_*T-m*v)*B,t[15]=(h*T-l*M+u*v)*B,this}scale(t){const e=this.elements,i=t.x,s=t.y,a=t.z;return e[0]*=i,e[4]*=s,e[8]*=a,e[1]*=i,e[5]*=s,e[9]*=a,e[2]*=i,e[6]*=s,e[10]*=a,e[3]*=i,e[7]*=s,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),a=1-i,r=t.x,o=t.y,d=t.z,c=a*r,h=a*o;return this.set(c*r+i,c*o-s*d,c*d+s*o,0,c*o+s*d,h*o+i,h*d-s*r,0,c*d-s*o,h*d+s*r,a*d*d+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,a=e._x,r=e._y,o=e._z,d=e._w,c=a+a,h=r+r,l=o+o,u=a*c,f=a*h,_=a*l,g=r*h,m=r*l,p=o*l,v=d*c,M=d*h,y=d*l,T=i.x,b=i.y,A=i.z;return s[0]=(1-(g+p))*T,s[1]=(f+y)*T,s[2]=(_-M)*T,s[3]=0,s[4]=(f-y)*b,s[5]=(1-(u+p))*b,s[6]=(m+v)*b,s[7]=0,s[8]=(_+M)*A,s[9]=(m-v)*A,s[10]=(1-(u+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const a=this.determinant();if(a===0)return i.set(1,1,1),e.identity(),this;let r=fa.set(s[0],s[1],s[2]).length();const o=fa.set(s[4],s[5],s[6]).length(),d=fa.set(s[8],s[9],s[10]).length();a<0&&(r=-r),oi.copy(this);const c=1/r,h=1/o,l=1/d;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=h,oi.elements[5]*=h,oi.elements[6]*=h,oi.elements[8]*=l,oi.elements[9]*=l,oi.elements[10]*=l,e.setFromRotationMatrix(oi),i.x=r,i.y=o,i.z=d,this}makePerspective(t,e,i,s,a,r,o=Di,d=!1){const c=this.elements,h=2*a/(e-t),l=2*a/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let _,g;if(d)_=a/(r-a),g=r*a/(r-a);else if(o===Di)_=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Cr)_=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=l,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,a,r,o=Di,d=!1){const c=this.elements,h=2/(e-t),l=2/(i-s),u=-(e+t)/(e-t),f=-(i+s)/(i-s);let _,g;if(d)_=1/(r-a),g=r/(r-a);else if(o===Di)_=-2/(r-a),g=-(r+a)/(r-a);else if(o===Cr)_=-1/(r-a),g=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=l,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fa=new F,oi=new Fe,gg=new F(0,0,0),xg=new F(1,1,1),us=new F,Kr=new F,kn=new F,yu=new Fe,Su=new Ds;class zi{constructor(t=0,e=0,i=0,s=zi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,a=s[0],r=s[4],o=s[8],d=s[1],c=s[5],h=s[9],l=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(d,c)):(this._y=Math.atan2(-l,a),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-l,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(d,a));break;case"ZYX":this._y=Math.asin(-ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(d,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-l,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ce(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return yu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Su.setFromEuler(this),this.setFromQuaternion(Su,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zi.DEFAULT_ORDER="XYZ";class rh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let vg=0;const Eu=new F,pa=new Ds,Xi=new Fe,Jr=new F,lr=new F,Mg=new F,yg=new Ds,bu=new F(1,0,0),wu=new F(0,1,0),Tu=new F(0,0,1),Au={type:"added"},Sg={type:"removed"},ma={type:"childadded",child:null},Hl={type:"childremoved",child:null};class rn extends sa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const t=new F,e=new zi,i=new Ds,s=new F(1,1,1);function a(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new ne}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pa.setFromAxisAngle(t,e),this.quaternion.multiply(pa),this}rotateOnWorldAxis(t,e){return pa.setFromAxisAngle(t,e),this.quaternion.premultiply(pa),this}rotateX(t){return this.rotateOnAxis(bu,t)}rotateY(t){return this.rotateOnAxis(wu,t)}rotateZ(t){return this.rotateOnAxis(Tu,t)}translateOnAxis(t,e){return Eu.copy(t).applyQuaternion(this.quaternion),this.position.add(Eu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bu,t)}translateY(t){return this.translateOnAxis(wu,t)}translateZ(t){return this.translateOnAxis(Tu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Jr.copy(t):Jr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(lr,Jr,this.up):Xi.lookAt(Jr,lr,this.up),this.quaternion.setFromRotationMatrix(Xi),s&&(Xi.extractRotation(s.matrixWorld),pa.setFromRotationMatrix(Xi),this.quaternion.premultiply(pa.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Au),ma.child=t,this.dispatchEvent(ma),ma.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sg),Hl.child=t,this.dispatchEvent(Hl),Hl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Au),ma.child=t,this.dispatchEvent(ma),ma.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,Mg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,yg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=e-a[0]*e-a[4]*i-a[8]*s,a[13]+=i-a[1]*e-a[5]*i-a[9]*s,a[14]+=s-a[2]*e-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,d){return o[d.uuid]===void 0&&(o[d.uuid]=d.toJSON(t)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const d=o.shapes;if(Array.isArray(d))for(let c=0,h=d.length;c<h;c++){const l=d[c];a(t.shapes,l)}else a(t.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let d=0,c=this.material.length;d<c;d++)o.push(a(t.materials,this.material[d]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const d=this.animations[o];s.animations.push(a(t.animations,d))}}if(e){const o=r(t.geometries),d=r(t.materials),c=r(t.textures),h=r(t.images),l=r(t.shapes),u=r(t.skeletons),f=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),d.length>0&&(i.materials=d),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),l.length>0&&(i.shapes=l),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){const d=[];for(const c in o){const h=o[c];delete h.metadata,d.push(h)}return d}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}rn.DEFAULT_UP=new F(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ye extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Eg={type:"move"};class Gl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,a=null,r=null;const o=this._targetRay,d=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],l=c.joints["thumb-tip"],u=h.position.distanceTo(l.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else d!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Eg)))}return o!==null&&(o.visible=s!==null),d!==null&&(d.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ye;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const yp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function kl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Bt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=i,pe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=pe.workingColorSpace){if(t=cg(t,1),e=ce(e,0,1),i=ce(i,0,1),e===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+e):i+e-i*e,r=2*i-a;this.r=kl(r,a,t+1/3),this.g=kl(r,a,t),this.b=kl(r,a,t-1/3)}return pe.colorSpaceToWorking(this,s),this}setStyle(t,e=ei){function i(a){a!==void 0&&parseFloat(a)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(a,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ei){const i=yp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}copyLinearToSRGB(t){return this.r=Ba(t.r),this.g=Ba(t.g),this.b=Ba(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ei){return pe.workingToColorSpace(xn.copy(this),t),Math.round(ce(xn.r*255,0,255))*65536+Math.round(ce(xn.g*255,0,255))*256+Math.round(ce(xn.b*255,0,255))}getHexString(t=ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.workingToColorSpace(xn.copy(this),e);const i=xn.r,s=xn.g,a=xn.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let d,c;const h=(o+r)/2;if(o===r)d=0,c=0;else{const l=r-o;switch(c=h<=.5?l/(r+o):l/(2-r-o),r){case i:d=(s-a)/l+(s<a?6:0);break;case s:d=(a-i)/l+2;break;case a:d=(i-s)/l+4;break}d/=6}return t.h=d,t.s=c,t.l=h,t}getRGB(t,e=pe.workingColorSpace){return pe.workingToColorSpace(xn.copy(this),e),t.r=xn.r,t.g=xn.g,t.b=xn.b,t}getStyle(t=ei){pe.workingToColorSpace(xn.copy(this),t);const e=xn.r,i=xn.g,s=xn.b;return t!==ei?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(fs),this.setHSL(fs.h+t,fs.s+e,fs.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(fs),t.getHSL(Qr);const i=Nl(fs.h,Qr.h,e),s=Nl(fs.s,Qr.s,e),a=Nl(fs.l,Qr.l,e);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*s,this.g=a[1]*e+a[4]*i+a[7]*s,this.b=a[2]*e+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new Bt;Bt.NAMES=yp;class oh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Bt(t),this.density=e}clone(){return new oh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class bg extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zi,this.environmentIntensity=1,this.environmentRotation=new zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const li=new F,qi=new F,Vl=new F,Yi=new F,_a=new F,ga=new F,Ru=new F,Wl=new F,Xl=new F,ql=new F,Yl=new Ge,$l=new Ge,Zl=new Ge;class vi{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),li.subVectors(t,e),s.cross(li);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,e,i,s,a){li.subVectors(s,e),qi.subVectors(i,e),Vl.subVectors(t,e);const r=li.dot(li),o=li.dot(qi),d=li.dot(Vl),c=qi.dot(qi),h=qi.dot(Vl),l=r*c-o*o;if(l===0)return a.set(0,0,0),null;const u=1/l,f=(c*d-o*h)*u,_=(r*h-o*d)*u;return a.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Yi)===null?!1:Yi.x>=0&&Yi.y>=0&&Yi.x+Yi.y<=1}static getInterpolation(t,e,i,s,a,r,o,d){return this.getBarycoord(t,e,i,s,Yi)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(a,Yi.x),d.addScaledVector(r,Yi.y),d.addScaledVector(o,Yi.z),d)}static getInterpolatedAttribute(t,e,i,s,a,r){return Yl.setScalar(0),$l.setScalar(0),Zl.setScalar(0),Yl.fromBufferAttribute(t,e),$l.fromBufferAttribute(t,i),Zl.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Yl,a.x),r.addScaledVector($l,a.y),r.addScaledVector(Zl,a.z),r}static isFrontFacing(t,e,i,s){return li.subVectors(i,e),qi.subVectors(t,e),li.cross(qi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),qi.subVectors(this.a,this.b),li.cross(qi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,a){return vi.getInterpolation(t,this.a,this.b,this.c,e,i,s,a)}containsPoint(t){return vi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,a=this.c;let r,o;_a.subVectors(s,i),ga.subVectors(a,i),Wl.subVectors(t,i);const d=_a.dot(Wl),c=ga.dot(Wl);if(d<=0&&c<=0)return e.copy(i);Xl.subVectors(t,s);const h=_a.dot(Xl),l=ga.dot(Xl);if(h>=0&&l<=h)return e.copy(s);const u=d*l-h*c;if(u<=0&&d>=0&&h<=0)return r=d/(d-h),e.copy(i).addScaledVector(_a,r);ql.subVectors(t,a);const f=_a.dot(ql),_=ga.dot(ql);if(_>=0&&f<=_)return e.copy(a);const g=f*c-d*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(ga,o);const m=h*_-f*l;if(m<=0&&l-h>=0&&f-_>=0)return Ru.subVectors(a,s),o=(l-h)/(l-h+(f-_)),e.copy(s).addScaledVector(Ru,o);const p=1/(m+g+u);return r=g*p,o=u*p,e.copy(i).addScaledVector(_a,r).addScaledVector(ga,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class kr{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ci):ci.fromBufferAttribute(a,r),ci.applyMatrix4(t.matrixWorld),this.expandByPoint(ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),to.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),to.copy(i.boundingBox)),to.applyMatrix4(t.matrixWorld),this.union(to)}const s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ci),ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cr),eo.subVectors(this.max,cr),xa.subVectors(t.a,cr),va.subVectors(t.b,cr),Ma.subVectors(t.c,cr),ps.subVectors(va,xa),ms.subVectors(Ma,va),Bs.subVectors(xa,Ma);let e=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Bs.z,Bs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Bs.z,0,-Bs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Bs.y,Bs.x,0];return!jl(e,xa,va,Ma,eo)||(e=[1,0,0,0,1,0,0,0,1],!jl(e,xa,va,Ma,eo))?!1:(no.crossVectors(ps,ms),e=[no.x,no.y,no.z],jl(e,xa,va,Ma,eo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const $i=[new F,new F,new F,new F,new F,new F,new F,new F],ci=new F,to=new kr,xa=new F,va=new F,Ma=new F,ps=new F,ms=new F,Bs=new F,cr=new F,eo=new F,no=new F,zs=new F;function jl(n,t,e,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){zs.fromArray(n,a);const o=s.x*Math.abs(zs.x)+s.y*Math.abs(zs.y)+s.z*Math.abs(zs.z),d=t.dot(zs),c=e.dot(zs),h=i.dot(zs);if(Math.max(-Math.max(d,c,h),Math.min(d,c,h))>o)return!1}return!0}const Ye=new F,io=new Pt;let wg=0;class Ni{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=pu,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)io.fromBufferAttribute(this,e),io.applyMatrix3(t),this.setXY(e,io.x,io.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=or(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Pn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=or(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=or(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=or(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=or(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Pn(e,this.array),i=Pn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Pn(e,this.array),i=Pn(i,this.array),s=Pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,a){return t*=this.itemSize,this.normalized&&(e=Pn(e,this.array),i=Pn(i,this.array),s=Pn(s,this.array),a=Pn(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==pu&&(t.usage=this.usage),t}}class Sp extends Ni{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ep extends Ni{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class _e extends Ni{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Tg=new kr,dr=new F,Kl=new F;class _l{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Tg.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;dr.subVectors(t,this.center);const e=dr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(dr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Kl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(dr.copy(t.center).add(Kl)),this.expandByPoint(dr.copy(t.center).sub(Kl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Ag=0;const Jn=new Fe,Jl=new rn,ya=new F,Vn=new kr,hr=new kr,sn=new F;class cn extends sa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=Gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ag(t)?Ep:Sp)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ne().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Jn.makeRotationFromQuaternion(t),this.applyMatrix4(Jn),this}rotateX(t){return Jn.makeRotationX(t),this.applyMatrix4(Jn),this}rotateY(t){return Jn.makeRotationY(t),this.applyMatrix4(Jn),this}rotateZ(t){return Jn.makeRotationZ(t),this.applyMatrix4(Jn),this}translate(t,e,i){return Jn.makeTranslation(t,e,i),this.applyMatrix4(Jn),this}scale(t,e,i){return Jn.makeScale(t,e,i),this.applyMatrix4(Jn),this}lookAt(t){return Jl.lookAt(t),Jl.updateMatrix(),this.applyMatrix4(Jl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ya).negate(),this.translate(ya.x,ya.y,ya.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,a=t.length;s<a;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new _e(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const a=t[s];e.setXYZ(s,a.x,a.y,a.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const a=e[i];Vn.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _l);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Vn.setFromBufferAttribute(t),e)for(let a=0,r=e.length;a<r;a++){const o=e[a];hr.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(Vn.min,hr.min),Vn.expandByPoint(sn),sn.addVectors(Vn.max,hr.max),Vn.expandByPoint(sn)):(Vn.expandByPoint(hr.min),Vn.expandByPoint(hr.max))}Vn.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)sn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(sn));if(e)for(let a=0,r=e.length;a<r;a++){const o=e[a],d=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)sn.fromBufferAttribute(o,c),d&&(ya.fromBufferAttribute(t,c),sn.add(ya)),s=Math.max(s,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ni(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],d=[];for(let x=0;x<i.count;x++)o[x]=new F,d[x]=new F;const c=new F,h=new F,l=new F,u=new Pt,f=new Pt,_=new Pt,g=new F,m=new F;function p(x,S,I){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,S),l.fromBufferAttribute(i,I),u.fromBufferAttribute(a,x),f.fromBufferAttribute(a,S),_.fromBufferAttribute(a,I),h.sub(c),l.sub(c),f.sub(u),_.sub(u);const P=1/(f.x*_.y-_.x*f.y);isFinite(P)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(l,-f.y).multiplyScalar(P),m.copy(l).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(P),o[x].add(g),o[S].add(g),o[I].add(g),d[x].add(m),d[S].add(m),d[I].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,S=v.length;x<S;++x){const I=v[x],P=I.start,N=I.count;for(let L=P,k=P+N;L<k;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const M=new F,y=new F,T=new F,b=new F;function A(x){T.fromBufferAttribute(s,x),b.copy(T);const S=o[x];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),y.crossVectors(b,S);const P=y.dot(d[x])<0?-1:1;r.setXYZW(x,M.x,M.y,M.z,P)}for(let x=0,S=v.length;x<S;++x){const I=v[x],P=I.start,N=I.count;for(let L=P,k=P+N;L<k;L+=3)A(t.getX(L+0)),A(t.getX(L+1)),A(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ni(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new F,a=new F,r=new F,o=new F,d=new F,c=new F,h=new F,l=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){const _=t.getX(u+0),g=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),r.fromBufferAttribute(e,m),h.subVectors(r,a),l.subVectors(s,a),h.cross(l),o.fromBufferAttribute(i,_),d.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(h),d.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,d.x,d.y,d.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),a.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,a),l.subVectors(s,a),h.cross(l),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)sn.fromBufferAttribute(t,e),sn.normalize(),t.setXYZ(e,sn.x,sn.y,sn.z)}toNonIndexed(){function t(o,d){const c=o.array,h=o.itemSize,l=o.normalized,u=new c.constructor(d.length*h);let f=0,_=0;for(let g=0,m=d.length;g<m;g++){o.isInterleavedBufferAttribute?f=d[g]*o.data.stride+o.offset:f=d[g]*h;for(let p=0;p<h;p++)u[_++]=c[f++]}return new Ni(u,h,l)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new cn,i=this.index.array,s=this.attributes;for(const o in s){const d=s[o],c=t(d,i);e.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const d=[],c=a[o];for(let h=0,l=c.length;h<l;h++){const u=c[h],f=t(u,i);d.push(f)}e.morphAttributes[o]=d}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,d=r.length;o<d;o++){const c=r[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const c in d)d[c]!==void 0&&(t[c]=d[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const d in i){const c=i[d];t.data.attributes[d]=c.toJSON(t.data)}const s={};let a=!1;for(const d in this.morphAttributes){const c=this.morphAttributes[d],h=[];for(let l=0,u=c.length;l<u;l++){const f=c[l];h.push(f.toJSON(t.data))}h.length>0&&(s[d]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const a=t.morphAttributes;for(const c in a){const h=[],l=a[c];for(let u=0,f=l.length;u<f;u++)h.push(l[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const l=r[c];this.addGroup(l.start,l.count,l.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const d=t.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Rg=0;class sr extends sa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=Gr(),this.name="",this.type="Material",this.blending=Oa,this.side=Ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ac,this.blendDst=Rc,this.blendEquation=Xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Wa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ha,this.stencilZFail=ha,this.stencilZPass=ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oa&&(i.blending=this.blending),this.side!==Ps&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ac&&(i.blendSrc=this.blendSrc),this.blendDst!==Rc&&(i.blendDst=this.blendDst),this.blendEquation!==Xs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Wa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ha&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ha&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ha&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const d=a[o];delete d.metadata,r.push(d)}return r}if(e){const a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Zi=new F,Ql=new F,so=new F,_s=new F,tc=new F,ao=new F,ec=new F;class gl{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zi.copy(this.origin).addScaledVector(this.direction,e),Zi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ql.copy(t).add(e).multiplyScalar(.5),so.copy(e).sub(t).normalize(),_s.copy(this.origin).sub(Ql);const a=t.distanceTo(e)*.5,r=-this.direction.dot(so),o=_s.dot(this.direction),d=-_s.dot(so),c=_s.lengthSq(),h=Math.abs(1-r*r);let l,u,f,_;if(h>0)if(l=r*d-o,u=r*o-d,_=a*h,l>=0)if(u>=-_)if(u<=_){const g=1/h;l*=g,u*=g,f=l*(l+r*u+2*o)+u*(r*l+u+2*d)+c}else u=a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*d)+c;else u=-a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*d)+c;else u<=-_?(l=Math.max(0,-(-r*a+o)),u=l>0?-a:Math.min(Math.max(-a,-d),a),f=-l*l+u*(u+2*d)+c):u<=_?(l=0,u=Math.min(Math.max(-a,-d),a),f=u*(u+2*d)+c):(l=Math.max(0,-(r*a+o)),u=l>0?a:Math.min(Math.max(-a,-d),a),f=-l*l+u*(u+2*d)+c);else u=r>0?-a:a,l=Math.max(0,-(r*u+o)),f=-l*l+u*(u+2*d)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,l),s&&s.copy(Ql).addScaledVector(so,u),f}intersectSphere(t,e){Zi.subVectors(t.center,this.origin);const i=Zi.dot(this.direction),s=Zi.dot(Zi)-i*i,a=t.radius*t.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,d=i+r;return d<0?null:o<0?this.at(d,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,a,r,o,d;const c=1/this.direction.x,h=1/this.direction.y,l=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(a=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(a=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),l>=0?(o=(t.min.z-u.z)*l,d=(t.max.z-u.z)*l):(o=(t.max.z-u.z)*l,d=(t.min.z-u.z)*l),i>d||o>s)||((o>i||i!==i)&&(i=o),(d<s||s!==s)&&(s=d),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Zi)!==null}intersectTriangle(t,e,i,s,a){tc.subVectors(e,t),ao.subVectors(i,t),ec.crossVectors(tc,ao);let r=this.direction.dot(ec),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;_s.subVectors(this.origin,t);const d=o*this.direction.dot(ao.crossVectors(_s,ao));if(d<0)return null;const c=o*this.direction.dot(tc.cross(_s));if(c<0||d+c>r)return null;const h=-o*_s.dot(ec);return h<0?null:this.at(h/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cn extends sr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zi,this.combine=ip,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Cu=new Fe,Hs=new gl,ro=new _l,Pu=new F,oo=new F,lo=new F,co=new F,nc=new F,ho=new F,Du=new F,uo=new F;class w extends rn{constructor(t=new cn,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(a&&o){ho.set(0,0,0);for(let d=0,c=a.length;d<c;d++){const h=o[d],l=a[d];h!==0&&(nc.fromBufferAttribute(l,t),r?ho.addScaledVector(nc,h):ho.addScaledVector(nc.sub(e),h))}e.add(ho)}return e}raycast(t,e){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(a),Hs.copy(t.ray).recast(t.near),!(ro.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(ro,Pu)===null||Hs.origin.distanceToSquared(Pu)>(t.far-t.near)**2))&&(Cu.copy(a).invert(),Hs.copy(t.ray).applyMatrix4(Cu),!(i.boundingBox!==null&&Hs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Hs)))}_computeIntersections(t,e,i){let s;const a=this.geometry,r=this.material,o=a.index,d=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,l=a.attributes.normal,u=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=u.length;_<g;_++){const m=u[_],p=r[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,T=M;y<T;y+=3){const b=o.getX(y),A=o.getX(y+1),x=o.getX(y+2);s=fo(this,p,t,i,c,h,l,b,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);s=fo(this,r,t,i,c,h,l,v,M,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(d!==void 0)if(Array.isArray(r))for(let _=0,g=u.length;_<g;_++){const m=u[_],p=r[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(d.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,T=M;y<T;y+=3){const b=y,A=y+1,x=y+2;s=fo(this,p,t,i,c,h,l,b,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(d.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=m,M=m+1,y=m+2;s=fo(this,r,t,i,c,h,l,v,M,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Cg(n,t,e,i,s,a,r,o){let d;if(t.side===Bn?d=i.intersectTriangle(r,a,s,!0,o):d=i.intersectTriangle(s,a,r,t.side===Ps,o),d===null)return null;uo.copy(o),uo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(uo);return c<e.near||c>e.far?null:{distance:c,point:uo.clone(),object:n}}function fo(n,t,e,i,s,a,r,o,d,c){n.getVertexPosition(o,oo),n.getVertexPosition(d,lo),n.getVertexPosition(c,co);const h=Cg(n,t,e,i,oo,lo,co,Du);if(h){const l=new F;vi.getBarycoord(Du,oo,lo,co,l),s&&(h.uv=vi.getInterpolatedAttribute(s,o,d,c,l,new Pt)),a&&(h.uv1=vi.getInterpolatedAttribute(a,o,d,c,l,new Pt)),r&&(h.normal=vi.getInterpolatedAttribute(r,o,d,c,l,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:d,c,normal:new F,materialIndex:0};vi.getNormal(oo,lo,co,u.normal),h.face=u,h.barycoord=l}return h}class Pg extends Rn{constructor(t=null,e=1,i=1,s,a,r,o,d,c=un,h=un,l,u){super(null,r,o,d,c,h,s,a,l,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ic=new F,Dg=new F,Ig=new ne;class Ti{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ic.subVectors(i,e).cross(Dg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ic),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Ig.getNormalMatrix(t),s=this.coplanarPoint(ic).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gs=new _l,Lg=new Pt(.5,.5),po=new F;class lh{constructor(t=new Ti,e=new Ti,i=new Ti,s=new Ti,a=new Ti,r=new Ti){this.planes=[t,e,i,s,a,r]}set(t,e,i,s,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Di,i=!1){const s=this.planes,a=t.elements,r=a[0],o=a[1],d=a[2],c=a[3],h=a[4],l=a[5],u=a[6],f=a[7],_=a[8],g=a[9],m=a[10],p=a[11],v=a[12],M=a[13],y=a[14],T=a[15];if(s[0].setComponents(c-r,f-h,p-_,T-v).normalize(),s[1].setComponents(c+r,f+h,p+_,T+v).normalize(),s[2].setComponents(c+o,f+l,p+g,T+M).normalize(),s[3].setComponents(c-o,f-l,p-g,T-M).normalize(),i)s[4].setComponents(d,u,m,y).normalize(),s[5].setComponents(c-d,f-u,p-m,T-y).normalize();else if(s[4].setComponents(c-d,f-u,p-m,T-y).normalize(),e===Di)s[5].setComponents(c+d,f+u,p+m,T+y).normalize();else if(e===Cr)s[5].setComponents(d,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gs)}intersectsSprite(t){Gs.center.set(0,0,0);const e=Lg.distanceTo(t.center);return Gs.radius=.7071067811865476+e,Gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gs)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(po.x=s.normal.x>0?t.max.x:t.min.x,po.y=s.normal.y>0?t.max.y:t.min.y,po.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(po)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bp extends sr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Xo=new F,qo=new F,Iu=new Fe,ur=new gl,mo=new _l,sc=new F,Lu=new F;class Ug extends rn{constructor(t=new cn,e=new bp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,a=e.count;s<a;s++)Xo.fromBufferAttribute(e,s-1),qo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Xo.distanceTo(qo);t.setAttribute("lineDistance",new _e(i,1))}else Xt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mo.copy(i.boundingSphere),mo.applyMatrix4(s),mo.radius+=a,t.ray.intersectsSphere(mo)===!1)return;Iu.copy(s).invert(),ur.copy(t.ray).applyMatrix4(Iu);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),d=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,r.start),_=Math.min(h.count,r.start+r.count);for(let g=f,m=_-1;g<m;g+=c){const p=h.getX(g),v=h.getX(g+1),M=_o(this,t,ur,d,p,v,g);M&&e.push(M)}if(this.isLineLoop){const g=h.getX(_-1),m=h.getX(f),p=_o(this,t,ur,d,g,m,_-1);p&&e.push(p)}}else{const f=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=f,m=_-1;g<m;g+=c){const p=_o(this,t,ur,d,g,g+1,g);p&&e.push(p)}if(this.isLineLoop){const g=_o(this,t,ur,d,_-1,f,_-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function _o(n,t,e,i,s,a,r){const o=n.geometry.attributes.position;if(Xo.fromBufferAttribute(o,s),qo.fromBufferAttribute(o,a),e.distanceSqToSegment(Xo,qo,sc,Lu)>i)return;sc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(sc);if(!(c<t.near||c>t.far))return{distance:c,point:Lu.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Uu=new F,Nu=new F;class Ng extends Ug{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,a=e.count;s<a;s+=2)Uu.fromBufferAttribute(e,s),Nu.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Uu.distanceTo(Nu);t.setAttribute("lineDistance",new _e(i,1))}else Xt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wp extends Rn{constructor(t=[],e=ia,i,s,a,r,o,d,c,h){super(t,e,i,s,a,r,o,d,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Pr extends Rn{constructor(t,e,i=Bi,s,a,r,o=un,d=un,c,h=os,l=1){if(h!==os&&h!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:l};super(u,s,a,r,o,d,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ah(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Fg extends Pr{constructor(t,e=Bi,i=ia,s,a,r=un,o=un,d,c=os){const h={width:t,height:t,depth:1},l=[h,h,h,h,h,h];super(t,t,e,i,s,a,r,o,d,c),this.image=l,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Tp extends Rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Y extends cn{constructor(t=1,e=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const d=[],c=[],h=[],l=[];let u=0,f=0;_("z","y","x",-1,-1,i,e,t,r,a,0),_("z","y","x",1,-1,i,e,-t,r,a,1),_("x","z","y",1,1,t,i,e,s,r,2),_("x","z","y",1,-1,t,i,-e,s,r,3),_("x","y","z",1,-1,t,e,i,s,a,4),_("x","y","z",-1,-1,t,e,-i,s,a,5),this.setIndex(d),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(l,2));function _(g,m,p,v,M,y,T,b,A,x,S){const I=y/A,P=T/x,N=y/2,L=T/2,k=b/2,B=A+1,V=x+1;let H=0,et=0;const tt=new F;for(let ht=0;ht<V;ht++){const ot=ht*P-L;for(let lt=0;lt<B;lt++){const Gt=lt*I-N;tt[g]=Gt*v,tt[m]=ot*M,tt[p]=k,c.push(tt.x,tt.y,tt.z),tt[g]=0,tt[m]=0,tt[p]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),l.push(lt/A),l.push(1-ht/x),H+=1}}for(let ht=0;ht<x;ht++)for(let ot=0;ot<A;ot++){const lt=u+ot+B*ht,Gt=u+ot+B*(ht+1),Se=u+(ot+1)+B*(ht+1),Ie=u+(ot+1)+B*ht;d.push(lt,Gt,Ie),d.push(Gt,Se,Ie),et+=6}o.addGroup(f,et,S),f+=et,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Y(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ch extends cn{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const a=[],r=[],o=[],d=[],c=new F,h=new Pt;r.push(0,0,0),o.push(0,0,1),d.push(.5,.5);for(let l=0,u=3;l<=e;l++,u+=3){const f=i+l/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(r[u]/t+1)/2,h.y=(r[u+1]/t+1)/2,d.push(h.x,h.y)}for(let l=1;l<=e;l++)a.push(l,l+1,0);this.setIndex(a),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(o,3)),this.setAttribute("uv",new _e(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ch(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Et extends cn{constructor(t=1,e=1,i=1,s=32,a=1,r=!1,o=0,d=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:d};const c=this;s=Math.floor(s),a=Math.floor(a);const h=[],l=[],u=[],f=[];let _=0;const g=[],m=i/2;let p=0;v(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(f,2));function v(){const y=new F,T=new F;let b=0;const A=(e-t)/i;for(let x=0;x<=a;x++){const S=[],I=x/a,P=I*(e-t)+t;for(let N=0;N<=s;N++){const L=N/s,k=L*d+o,B=Math.sin(k),V=Math.cos(k);T.x=P*B,T.y=-I*i+m,T.z=P*V,l.push(T.x,T.y,T.z),y.set(B,A,V).normalize(),u.push(y.x,y.y,y.z),f.push(L,1-I),S.push(_++)}g.push(S)}for(let x=0;x<s;x++)for(let S=0;S<a;S++){const I=g[S][x],P=g[S+1][x],N=g[S+1][x+1],L=g[S][x+1];(t>0||S!==0)&&(h.push(I,P,L),b+=3),(e>0||S!==a-1)&&(h.push(P,N,L),b+=3)}c.addGroup(p,b,0),p+=b}function M(y){const T=_,b=new Pt,A=new F;let x=0;const S=y===!0?t:e,I=y===!0?1:-1;for(let N=1;N<=s;N++)l.push(0,m*I,0),u.push(0,I,0),f.push(.5,.5),_++;const P=_;for(let N=0;N<=s;N++){const k=N/s*d+o,B=Math.cos(k),V=Math.sin(k);A.x=S*V,A.y=m*I,A.z=S*B,l.push(A.x,A.y,A.z),u.push(0,I,0),b.x=B*.5+.5,b.y=V*.5*I+.5,f.push(b.x,b.y),_++}for(let N=0;N<s;N++){const L=T+N,k=P+N;y===!0?h.push(k,k+1,L):h.push(k+1,k,L),x+=3}c.addGroup(p,x,y===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Et(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $a extends Et{constructor(t=1,e=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,e,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new $a(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xl extends cn{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const a=[],r=[];o(s),c(i),h(),this.setAttribute("position",new _e(a,3)),this.setAttribute("normal",new _e(a.slice(),3)),this.setAttribute("uv",new _e(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new F,y=new F,T=new F;for(let b=0;b<e.length;b+=3)f(e[b+0],M),f(e[b+1],y),f(e[b+2],T),d(M,y,T,v)}function d(v,M,y,T){const b=T+1,A=[];for(let x=0;x<=b;x++){A[x]=[];const S=v.clone().lerp(y,x/b),I=M.clone().lerp(y,x/b),P=b-x;for(let N=0;N<=P;N++)N===0&&x===b?A[x][N]=S:A[x][N]=S.clone().lerp(I,N/P)}for(let x=0;x<b;x++)for(let S=0;S<2*(b-x)-1;S++){const I=Math.floor(S/2);S%2===0?(u(A[x][I+1]),u(A[x+1][I]),u(A[x][I])):(u(A[x][I+1]),u(A[x+1][I+1]),u(A[x+1][I]))}}function c(v){const M=new F;for(let y=0;y<a.length;y+=3)M.x=a[y+0],M.y=a[y+1],M.z=a[y+2],M.normalize().multiplyScalar(v),a[y+0]=M.x,a[y+1]=M.y,a[y+2]=M.z}function h(){const v=new F;for(let M=0;M<a.length;M+=3){v.x=a[M+0],v.y=a[M+1],v.z=a[M+2];const y=m(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;r.push(y,1-T)}_(),l()}function l(){for(let v=0;v<r.length;v+=6){const M=r[v+0],y=r[v+2],T=r[v+4],b=Math.max(M,y,T),A=Math.min(M,y,T);b>.9&&A<.1&&(M<.2&&(r[v+0]+=1),y<.2&&(r[v+2]+=1),T<.2&&(r[v+4]+=1))}}function u(v){a.push(v.x,v.y,v.z)}function f(v,M){const y=v*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function _(){const v=new F,M=new F,y=new F,T=new F,b=new Pt,A=new Pt,x=new Pt;for(let S=0,I=0;S<a.length;S+=9,I+=6){v.set(a[S+0],a[S+1],a[S+2]),M.set(a[S+3],a[S+4],a[S+5]),y.set(a[S+6],a[S+7],a[S+8]),b.set(r[I+0],r[I+1]),A.set(r[I+2],r[I+3]),x.set(r[I+4],r[I+5]),T.copy(v).add(M).add(y).divideScalar(3);const P=m(T);g(b,I+0,v,P),g(A,I+2,M,P),g(x,I+4,y,P)}}function g(v,M,y,T){T<0&&v.x===1&&(r[M]=v.x-1),y.x===0&&y.z===0&&(r[M]=T/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xl(t.vertices,t.indices,t.radius,t.detail)}}class vl extends xl{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vl(t.radius,t.detail)}}class Za extends xl{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class Hi extends cn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const a=t/2,r=e/2,o=Math.floor(i),d=Math.floor(s),c=o+1,h=d+1,l=t/o,u=e/d,f=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const v=p*u-r;for(let M=0;M<c;M++){const y=M*l-a;_.push(y,-v,0),g.push(0,0,1),m.push(M/o),m.push(1-p/d)}}for(let p=0;p<d;p++)for(let v=0;v<o;v++){const M=v+c*p,y=v+c*(p+1),T=v+1+c*(p+1),b=v+1+c*p;f.push(M,y,b),f.push(y,T,b)}this.setIndex(f),this.setAttribute("position",new _e(_,3)),this.setAttribute("normal",new _e(g,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Yo extends cn{constructor(t=.5,e=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],d=[],c=[],h=[];let l=t;const u=(e-t)/s,f=new F,_=new Pt;for(let g=0;g<=s;g++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=l*Math.cos(p),f.y=l*Math.sin(p),d.push(f.x,f.y,f.z),c.push(0,0,1),_.x=(f.x/e+1)/2,_.y=(f.y/e+1)/2,h.push(_.x,_.y)}l+=u}for(let g=0;g<s;g++){const m=g*(i+1);for(let p=0;p<i;p++){const v=p+m,M=v,y=v+i+1,T=v+i+2,b=v+1;o.push(M,y,b),o.push(y,T,b)}}this.setIndex(o),this.setAttribute("position",new _e(d,3)),this.setAttribute("normal",new _e(c,3)),this.setAttribute("uv",new _e(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class wt extends cn{constructor(t=1,e=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const d=Math.min(r+o,Math.PI);let c=0;const h=[],l=new F,u=new F,f=[],_=[],g=[],m=[];for(let p=0;p<=i;p++){const v=[],M=p/i;let y=0;p===0&&r===0?y=.5/e:p===i&&d===Math.PI&&(y=-.5/e);for(let T=0;T<=e;T++){const b=T/e;l.x=-t*Math.cos(s+b*a)*Math.sin(r+M*o),l.y=t*Math.cos(r+M*o),l.z=t*Math.sin(s+b*a)*Math.sin(r+M*o),_.push(l.x,l.y,l.z),u.copy(l).normalize(),g.push(u.x,u.y,u.z),m.push(b+y,1-M),v.push(c++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<e;v++){const M=h[p][v+1],y=h[p][v],T=h[p+1][v],b=h[p+1][v+1];(p!==0||r>0)&&f.push(M,y,b),(p!==i-1||d<Math.PI)&&f.push(y,T,b)}this.setIndex(f),this.setAttribute("position",new _e(_,3)),this.setAttribute("normal",new _e(g,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class de extends cn{constructor(t=1,e=.4,i=12,s=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const d=[],c=[],h=[],l=[],u=new F,f=new F,_=new F;for(let g=0;g<=i;g++){const m=r+g/i*o;for(let p=0;p<=s;p++){const v=p/s*a;f.x=(t+e*Math.cos(m))*Math.cos(v),f.y=(t+e*Math.cos(m))*Math.sin(v),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),_.subVectors(f,u).normalize(),h.push(_.x,_.y,_.z),l.push(p/s),l.push(g/i)}}for(let g=1;g<=i;g++)for(let m=1;m<=s;m++){const p=(s+1)*g+m-1,v=(s+1)*(g-1)+m-1,M=(s+1)*(g-1)+m,y=(s+1)*g+m;d.push(p,v,y),d.push(v,M,y)}this.setIndex(d),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function ja(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function bn(n){const t={};for(let e=0;e<n.length;e++){const i=ja(n[e]);for(const s in i)t[s]=i[s]}return t}function Og(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ap(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const $o={clone:ja,merge:bn};var Bg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends sr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bg,this.fragmentShader=zg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ja(t.uniforms),this.uniformsGroups=Og(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Hg extends En{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rp extends sr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xp,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gg extends sr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=K_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class kg extends sr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class dh extends rn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Vg extends dh{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ac=new Fe,Fu=new F,Ou=new F;class Wg{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=Zn,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lh,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new Ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Fu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fu),Ou.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ou),e.updateMatrixWorld(),ac.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ac,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Cr||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ac)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const go=new F,xo=new Ds,bi=new F;class Cp extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=Di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(go,xo,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,xo,bi.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(go,xo,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,xo,bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new F,Bu=new Pt,zu=new Pt;class ii extends Cp{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_d*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Co*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _d*2*Math.atan(Math.tan(Co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gs.x,gs.y).multiplyScalar(-t/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-t/gs.z)}getViewSize(t,e){return this.getViewBounds(t,Bu,zu),e.subVectors(zu,Bu)}setViewOffset(t,e,i,s,a,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Co*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const d=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/d,e-=r.offsetY*i/c,s*=r.width/d,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ml extends Cp{constructor(t=-1,e=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-t,r=i+t,o=s+e,d=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,d=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Xg extends Wg{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hu extends dh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new Xg}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class qg extends dh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Sa=-90,Ea=1;class Yg extends rn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ii(Sa,Ea,t,e);s.layers=this.layers,this.add(s);const a=new ii(Sa,Ea,t,e);a.layers=this.layers,this.add(a);const r=new ii(Sa,Ea,t,e);r.layers=this.layers,this.add(r);const o=new ii(Sa,Ea,t,e);o.layers=this.layers,this.add(o);const d=new ii(Sa,Ea,t,e);d.layers=this.layers,this.add(d);const c=new ii(Sa,Ea,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,a,r,o,d]=e;for(const c of e)this.remove(c);if(t===Di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(t===Cr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,d,c,h]=this.children,l=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(l,u,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class $g extends ii{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Zg{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=jg.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function jg(){this._document.hidden===!1&&this.reset()}const Gu=new Fe;class Pp{constructor(t,e,i=0,s=1/0){this.ray=new gl(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new rh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Gu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gu),this}intersectObject(t,e=!0,i=[]){return gd(t,this,i,e),i.sort(ku),i}intersectObjects(t,e=!0,i=[]){for(let s=0,a=t.length;s<a;s++)gd(t[s],this,i,e);return i.sort(ku),i}}function ku(n,t){return n.distance-t.distance}function gd(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let r=0,o=a.length;r<o;r++)gd(a[r],t,e,!0)}}class Vu{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ce(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ce(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Kg extends sa{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Xt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Wu(n,t,e,i){const s=Jg(i);switch(e){case mp:return n*t;case gp:return n*t/s.components*s.byteLength;case th:return n*t/s.components*s.byteLength;case qa:return n*t*2/s.components*s.byteLength;case eh:return n*t*2/s.components*s.byteLength;case _p:return n*t*3/s.components*s.byteLength;case yi:return n*t*4/s.components*s.byteLength;case nh:return n*t*4/s.components*s.byteLength;case wo:case To:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ao:case Ro:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case zc:case Gc:return Math.max(n,16)*Math.max(t,8)/4;case Bc:case Hc:return Math.max(n,8)*Math.max(t,8)/2;case kc:case Vc:case Xc:case qc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wc:case Yc:case $c:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Kc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Jc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Qc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case td:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ed:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case nd:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case id:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case sd:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ad:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case rd:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case od:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ld:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case cd:case dd:case hd:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ud:case fd:return Math.ceil(n/4)*Math.ceil(t/4)*8;case pd:case md:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jg(n){switch(n){case Zn:case hp:return{byteLength:1,components:1};case Ar:case up:case Kn:return{byteLength:2,components:1};case Jd:case Qd:return{byteLength:2,components:4};case Bi:case Kd:case Pi:return{byteLength:4,components:1};case fp:case pp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zd}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zd);function Dp(){let n=null,t=!1,e=null,i=null;function s(a,r){e(a,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function Qg(n){const t=new WeakMap;function e(o,d){const c=o.array,h=o.usage,l=c.byteLength,u=n.createBuffer();n.bindBuffer(d,u),n.bufferData(d,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:l}}function i(o,d,c){const h=d.array,l=d.updateRanges;if(n.bindBuffer(c,o),l.length===0)n.bufferSubData(c,0,h);else{l.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<l.length;f++){const _=l[u],g=l[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++u,l[u]=g)}l.length=u+1;for(let f=0,_=l.length;f<_;f++){const g=l[f];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const d=t.get(o);d&&(n.deleteBuffer(d.buffer),t.delete(o))}function r(o,d){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,d));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,d),c.version=o.version}}return{get:s,remove:a,update:r}}var tx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ex=`#ifdef USE_ALPHAHASH
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
#endif`,nx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ix=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ax=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rx=`#ifdef USE_AOMAP
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
#endif`,ox=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lx=`#ifdef USE_BATCHING
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
#endif`,cx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ux=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,px=`#ifdef USE_BUMPMAP
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Sx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ex=`#define PI 3.141592653589793
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
} // validated`,bx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wx=`vec3 transformedNormal = objectNormal;
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
#endif`,Tx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Px="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ix=`#ifdef USE_ENVMAP
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
#endif`,Lx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fx=`#ifdef USE_ENVMAP
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
#endif`,Ox=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gx=`#ifdef USE_GRADIENTMAP
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
}`,kx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xx=`uniform bool receiveShadow;
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
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kx=`PhysicalMaterial material;
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
#endif`,Jx=`uniform sampler2D dfgLUT;
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
}`,Qx=`
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
#endif`,tv=`#if defined( RE_IndirectDiffuse )
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
#endif`,ev=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,iv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,av=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ov=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cv=`#if defined( USE_POINTS_UV )
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
#endif`,dv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mv=`#ifdef USE_MORPHTARGETS
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
#endif`,_v=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sv=`#ifdef USE_NORMALMAP
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
#endif`,Ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Av=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ov=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bv=`float getShadowMask() {
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
}`,zv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hv=`#ifdef USE_SKINNING
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
#endif`,Gv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kv=`#ifdef USE_SKINNING
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
#endif`,Vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yv=`#ifdef USE_TRANSMISSION
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
#endif`,$v=`#ifdef USE_TRANSMISSION
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
#endif`,Zv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tM=`uniform sampler2D t2D;
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
}`,eM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,iM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`#include <common>
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
}`,rM=`#if DEPTH_PACKING == 3200
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
}`,oM=`#define DISTANCE
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
}`,lM=`#define DISTANCE
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
}`,cM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hM=`uniform float scale;
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
}`,uM=`uniform vec3 diffuse;
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
}`,fM=`#include <common>
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
}`,pM=`uniform vec3 diffuse;
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
}`,mM=`#define LAMBERT
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
}`,_M=`#define LAMBERT
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
}`,gM=`#define MATCAP
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
}`,xM=`#define MATCAP
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
}`,vM=`#define NORMAL
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
}`,MM=`#define NORMAL
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
}`,yM=`#define PHONG
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
}`,SM=`#define PHONG
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
}`,EM=`#define STANDARD
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
}`,bM=`#define STANDARD
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
}`,wM=`#define TOON
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
}`,TM=`#define TOON
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
}`,AM=`uniform float size;
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
}`,RM=`uniform vec3 diffuse;
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
}`,CM=`#include <common>
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
}`,PM=`uniform vec3 color;
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
}`,DM=`uniform float rotation;
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
}`,IM=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:tx,alphahash_pars_fragment:ex,alphamap_fragment:nx,alphamap_pars_fragment:ix,alphatest_fragment:sx,alphatest_pars_fragment:ax,aomap_fragment:rx,aomap_pars_fragment:ox,batching_pars_vertex:lx,batching_vertex:cx,begin_vertex:dx,beginnormal_vertex:hx,bsdfs:ux,iridescence_fragment:fx,bumpmap_pars_fragment:px,clipping_planes_fragment:mx,clipping_planes_pars_fragment:_x,clipping_planes_pars_vertex:gx,clipping_planes_vertex:xx,color_fragment:vx,color_pars_fragment:Mx,color_pars_vertex:yx,color_vertex:Sx,common:Ex,cube_uv_reflection_fragment:bx,defaultnormal_vertex:wx,displacementmap_pars_vertex:Tx,displacementmap_vertex:Ax,emissivemap_fragment:Rx,emissivemap_pars_fragment:Cx,colorspace_fragment:Px,colorspace_pars_fragment:Dx,envmap_fragment:Ix,envmap_common_pars_fragment:Lx,envmap_pars_fragment:Ux,envmap_pars_vertex:Nx,envmap_physical_pars_fragment:qx,envmap_vertex:Fx,fog_vertex:Ox,fog_pars_vertex:Bx,fog_fragment:zx,fog_pars_fragment:Hx,gradientmap_pars_fragment:Gx,lightmap_pars_fragment:kx,lights_lambert_fragment:Vx,lights_lambert_pars_fragment:Wx,lights_pars_begin:Xx,lights_toon_fragment:Yx,lights_toon_pars_fragment:$x,lights_phong_fragment:Zx,lights_phong_pars_fragment:jx,lights_physical_fragment:Kx,lights_physical_pars_fragment:Jx,lights_fragment_begin:Qx,lights_fragment_maps:tv,lights_fragment_end:ev,logdepthbuf_fragment:nv,logdepthbuf_pars_fragment:iv,logdepthbuf_pars_vertex:sv,logdepthbuf_vertex:av,map_fragment:rv,map_pars_fragment:ov,map_particle_fragment:lv,map_particle_pars_fragment:cv,metalnessmap_fragment:dv,metalnessmap_pars_fragment:hv,morphinstance_vertex:uv,morphcolor_vertex:fv,morphnormal_vertex:pv,morphtarget_pars_vertex:mv,morphtarget_vertex:_v,normal_fragment_begin:gv,normal_fragment_maps:xv,normal_pars_fragment:vv,normal_pars_vertex:Mv,normal_vertex:yv,normalmap_pars_fragment:Sv,clearcoat_normal_fragment_begin:Ev,clearcoat_normal_fragment_maps:bv,clearcoat_pars_fragment:wv,iridescence_pars_fragment:Tv,opaque_fragment:Av,packing:Rv,premultiplied_alpha_fragment:Cv,project_vertex:Pv,dithering_fragment:Dv,dithering_pars_fragment:Iv,roughnessmap_fragment:Lv,roughnessmap_pars_fragment:Uv,shadowmap_pars_fragment:Nv,shadowmap_pars_vertex:Fv,shadowmap_vertex:Ov,shadowmask_pars_fragment:Bv,skinbase_vertex:zv,skinning_pars_vertex:Hv,skinning_vertex:Gv,skinnormal_vertex:kv,specularmap_fragment:Vv,specularmap_pars_fragment:Wv,tonemapping_fragment:Xv,tonemapping_pars_fragment:qv,transmission_fragment:Yv,transmission_pars_fragment:$v,uv_pars_fragment:Zv,uv_pars_vertex:jv,uv_vertex:Kv,worldpos_vertex:Jv,background_vert:Qv,background_frag:tM,backgroundCube_vert:eM,backgroundCube_frag:nM,cube_vert:iM,cube_frag:sM,depth_vert:aM,depth_frag:rM,distance_vert:oM,distance_frag:lM,equirect_vert:cM,equirect_frag:dM,linedashed_vert:hM,linedashed_frag:uM,meshbasic_vert:fM,meshbasic_frag:pM,meshlambert_vert:mM,meshlambert_frag:_M,meshmatcap_vert:gM,meshmatcap_frag:xM,meshnormal_vert:vM,meshnormal_frag:MM,meshphong_vert:yM,meshphong_frag:SM,meshphysical_vert:EM,meshphysical_frag:bM,meshtoon_vert:wM,meshtoon_frag:TM,points_vert:AM,points_frag:RM,shadow_vert:CM,shadow_frag:PM,sprite_vert:DM,sprite_frag:IM},_t={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},Ai={basic:{uniforms:bn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:bn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Bt(0)},envMapIntensity:{value:1}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:bn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:bn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:bn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Bt(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:bn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:bn([_t.points,_t.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:bn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:bn([_t.common,_t.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:bn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:bn([_t.sprite,_t.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distance:{uniforms:bn([_t.common,_t.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distance_vert,fragmentShader:ie.distance_frag},shadow:{uniforms:bn([_t.lights,_t.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Ai.physical={uniforms:bn([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};const vo={r:0,b:0,g:0},ks=new zi,LM=new Fe;function UM(n,t,e,i,s,a){const r=new Bt(0);let o=s===!0?0:1,d,c,h=null,l=0,u=null;function f(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const y=v.backgroundBlurriness>0;M=t.get(M,y)}return M}function _(v){let M=!1;const y=f(v);y===null?m(r,o):y&&y.isColor&&(m(y,1),M=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(v,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===ml)?(c===void 0&&(c=new w(new Y(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:ja(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ks.copy(M.backgroundRotation),ks.x*=-1,ks.y*=-1,ks.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ks.y*=-1,ks.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(LM.makeRotationFromEuler(ks)),c.material.toneMapped=pe.getTransfer(y.colorSpace)!==Me,(h!==y||l!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,l=y.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(d===void 0&&(d=new w(new Hi(2,2),new En({name:"BackgroundMaterial",uniforms:ja(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:Ps,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(d)),d.material.uniforms.t2D.value=y,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.toneMapped=pe.getTransfer(y.colorSpace)!==Me,y.matrixAutoUpdate===!0&&y.updateMatrix(),d.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||l!==y.version||u!==n.toneMapping)&&(d.material.needsUpdate=!0,h=y,l=y.version,u=n.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null))}function m(v,M){v.getRGB(vo,Ap(n)),e.buffers.color.setClear(vo.r,vo.g,vo.b,M,a)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,M=1){r.set(v),o=M,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:_,addToRenderList:g,dispose:p}}function NM(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,r=!1;function o(P,N,L,k,B){let V=!1;const H=l(P,k,L,N);a!==H&&(a=H,c(a.object)),V=f(P,k,L,B),V&&_(P,k,L,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(P,N,L,k),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function d(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function l(P,N,L,k){const B=k.wireframe===!0;let V=i[N.id];V===void 0&&(V={},i[N.id]=V);const H=P.isInstancedMesh===!0?P.id:0;let et=V[H];et===void 0&&(et={},V[H]=et);let tt=et[L.id];tt===void 0&&(tt={},et[L.id]=tt);let ht=tt[B];return ht===void 0&&(ht=u(d()),tt[B]=ht),ht}function u(P){const N=[],L=[],k=[];for(let B=0;B<e;B++)N[B]=0,L[B]=0,k[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:L,attributeDivisors:k,object:P,attributes:{},index:null}}function f(P,N,L,k){const B=a.attributes,V=N.attributes;let H=0;const et=L.getAttributes();for(const tt in et)if(et[tt].location>=0){const ot=B[tt];let lt=V[tt];if(lt===void 0&&(tt==="instanceMatrix"&&P.instanceMatrix&&(lt=P.instanceMatrix),tt==="instanceColor"&&P.instanceColor&&(lt=P.instanceColor)),ot===void 0||ot.attribute!==lt||lt&&ot.data!==lt.data)return!0;H++}return a.attributesNum!==H||a.index!==k}function _(P,N,L,k){const B={},V=N.attributes;let H=0;const et=L.getAttributes();for(const tt in et)if(et[tt].location>=0){let ot=V[tt];ot===void 0&&(tt==="instanceMatrix"&&P.instanceMatrix&&(ot=P.instanceMatrix),tt==="instanceColor"&&P.instanceColor&&(ot=P.instanceColor));const lt={};lt.attribute=ot,ot&&ot.data&&(lt.data=ot.data),B[tt]=lt,H++}a.attributes=B,a.attributesNum=H,a.index=k}function g(){const P=a.newAttributes;for(let N=0,L=P.length;N<L;N++)P[N]=0}function m(P){p(P,0)}function p(P,N){const L=a.newAttributes,k=a.enabledAttributes,B=a.attributeDivisors;L[P]=1,k[P]===0&&(n.enableVertexAttribArray(P),k[P]=1),B[P]!==N&&(n.vertexAttribDivisor(P,N),B[P]=N)}function v(){const P=a.newAttributes,N=a.enabledAttributes;for(let L=0,k=N.length;L<k;L++)N[L]!==P[L]&&(n.disableVertexAttribArray(L),N[L]=0)}function M(P,N,L,k,B,V,H){H===!0?n.vertexAttribIPointer(P,N,L,B,V):n.vertexAttribPointer(P,N,L,k,B,V)}function y(P,N,L,k){g();const B=k.attributes,V=L.getAttributes(),H=N.defaultAttributeValues;for(const et in V){const tt=V[et];if(tt.location>=0){let ht=B[et];if(ht===void 0&&(et==="instanceMatrix"&&P.instanceMatrix&&(ht=P.instanceMatrix),et==="instanceColor"&&P.instanceColor&&(ht=P.instanceColor)),ht!==void 0){const ot=ht.normalized,lt=ht.itemSize,Gt=t.get(ht);if(Gt===void 0)continue;const Se=Gt.buffer,Ie=Gt.type,Q=Gt.bytesPerElement,ut=Ie===n.INT||Ie===n.UNSIGNED_INT||ht.gpuType===Kd;if(ht.isInterleavedBufferAttribute){const mt=ht.data,ee=mt.stride,kt=ht.offset;if(mt.isInstancedInterleavedBuffer){for(let $t=0;$t<tt.locationSize;$t++)p(tt.location+$t,mt.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let $t=0;$t<tt.locationSize;$t++)m(tt.location+$t);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let $t=0;$t<tt.locationSize;$t++)M(tt.location+$t,lt/tt.locationSize,Ie,ot,ee*Q,(kt+lt/tt.locationSize*$t)*Q,ut)}else{if(ht.isInstancedBufferAttribute){for(let mt=0;mt<tt.locationSize;mt++)p(tt.location+mt,ht.meshPerAttribute);P.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let mt=0;mt<tt.locationSize;mt++)m(tt.location+mt);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let mt=0;mt<tt.locationSize;mt++)M(tt.location+mt,lt/tt.locationSize,Ie,ot,lt*Q,lt/tt.locationSize*mt*Q,ut)}}else if(H!==void 0){const ot=H[et];if(ot!==void 0)switch(ot.length){case 2:n.vertexAttrib2fv(tt.location,ot);break;case 3:n.vertexAttrib3fv(tt.location,ot);break;case 4:n.vertexAttrib4fv(tt.location,ot);break;default:n.vertexAttrib1fv(tt.location,ot)}}}}v()}function T(){S();for(const P in i){const N=i[P];for(const L in N){const k=N[L];for(const B in k){const V=k[B];for(const H in V)h(V[H].object),delete V[H];delete k[B]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;const N=i[P.id];for(const L in N){const k=N[L];for(const B in k){const V=k[B];for(const H in V)h(V[H].object),delete V[H];delete k[B]}}delete i[P.id]}function A(P){for(const N in i){const L=i[N];for(const k in L){const B=L[k];if(B[P.id]===void 0)continue;const V=B[P.id];for(const H in V)h(V[H].object),delete V[H];delete B[P.id]}}}function x(P){for(const N in i){const L=i[N],k=P.isInstancedMesh===!0?P.id:0,B=L[k];if(B!==void 0){for(const V in B){const H=B[V];for(const et in H)h(H[et].object),delete H[et];delete B[V]}delete L[k],Object.keys(L).length===0&&delete i[N]}}}function S(){I(),r=!0,a!==s&&(a=s,c(a.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:v}}function FM(n,t,e){let i;function s(c){i=c}function a(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function r(c,h,l){l!==0&&(n.drawArraysInstanced(i,c,h,l),e.update(h,i,l))}function o(c,h,l){if(l===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,l);let f=0;for(let _=0;_<l;_++)f+=h[_];e.update(f,i,1)}function d(c,h,l,u){if(l===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)r(c[_],h[_],u[_]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,l);let _=0;for(let g=0;g<l;g++)_+=h[g]*u[g];e.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=d}function OM(n,t,e,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(A){return!(A!==yi&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const x=A===Kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Zn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Pi&&!x)}function d(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=d(c);h!==c&&(Xt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const l=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:d,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:l,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,maxSamples:T,samples:b}}function BM(n){const t=this;let e=null,i=0,s=!1,a=!1;const r=new Ti,o=new ne,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(l,u){const f=l.length!==0||u||i!==0||s;return s=u,i=l.length,f},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(l,u){e=h(l,u,0)},this.setState=function(l,u,f){const _=l.clippingPlanes,g=l.clipIntersection,m=l.clipShadows,p=n.get(l);if(!s||_===null||_.length===0||a&&!m)a?h(null):c();else{const v=a?0:i,M=v*4;let y=p.clippingState||null;d.value=y,y=h(_,u,M,f);for(let T=0;T!==M;++T)y[T]=e[T];p.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){d.value!==e&&(d.value=e,d.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(l,u,f,_){const g=l!==null?l.length:0;let m=null;if(g!==0){if(m=d.value,_!==!0||m===null){const p=f+g*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,y=f;M!==g;++M,y+=4)r.copy(l[M]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}d.value=m,d.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}const Ts=4,Xu=[.125,.215,.35,.446,.526,.582],qs=20,zM=256,fr=new Ml,qu=new Bt;let rc=null,oc=0,lc=0,cc=!1;const HM=new F;class Yu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,a={}){const{size:r=256,position:o=HM}=a;rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(t,i,s,d,o),e>0&&this._blur(d,0,0,e),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(rc,oc,lc),this._renderer.xr.enabled=cc,t.scissorTest=!1,ba(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ia||t.mapping===Xa?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),lc=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:Kn,format:yi,colorSpace:Ya,depthBuffer:!1},s=$u(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$u(t,e,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=GM(a)),this._blurMaterial=VM(a,t,e),this._ggxMaterial=kM(a,t,e)}return s}_compileMaterial(t){const e=new w(new cn,t);this._renderer.compile(e,fr)}_sceneToCubeUV(t,e,i,s,a){const d=new ii(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,f=l.toneMapping;l.getClearColor(qu),l.toneMapping=Ui,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(s),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new w(new Y,new Cn({name:"PMREM.Background",side:Bn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,p=!0):(m.color.copy(qu),p=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(d.up.set(0,c[M],0),d.position.set(a.x,a.y,a.z),d.lookAt(a.x+h[M],a.y,a.z)):y===1?(d.up.set(0,0,c[M]),d.position.set(a.x,a.y,a.z),d.lookAt(a.x,a.y+h[M],a.z)):(d.up.set(0,c[M],0),d.position.set(a.x,a.y,a.z),d.lookAt(a.x,a.y,a.z+h[M]));const T=this._cubeSize;ba(s,y*T,M>2?T:0,T,T),l.setRenderTarget(s),p&&l.render(g,d),l.render(t,d)}l.toneMapping=f,l.autoClear=u,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ia||t.mapping===Xa;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=t;const d=this._cubeSize;ba(e,0,0,3*d,2*d),i.setRenderTarget(e),i.render(r,fr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const d=r.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),l=Math.sqrt(c*c-h*h),u=0+c*1.25,f=l*u,{_lodMax:_}=this,g=this._sizeLods[i],m=3*g*(i>_-Ts?i-_+Ts:0),p=4*(this._cubeSize-g);d.envMap.value=t.texture,d.roughness.value=f,d.mipInt.value=_-e,ba(a,m,p,3*g,2*g),s.setRenderTarget(a),s.render(o,fr),d.envMap.value=a.texture,d.roughness.value=0,d.mipInt.value=_-i,ba(t,m,p,3*g,2*g),s.setRenderTarget(t),s.render(o,fr)}_blur(t,e,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,e,i,s,a,r,o){const d=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const h=3,l=this._lodMeshes[s];l.material=c;const u=c.uniforms,f=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*qs-1),g=a/_,m=isFinite(a)?1+Math.floor(h*g):qs;m>qs&&Xt(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qs}`);const p=[];let v=0;for(let A=0;A<qs;++A){const x=A/g,S=Math.exp(-x*x/2);p.push(S),A===0?v+=S:A<m&&(v+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=_,u.mipInt.value=M-i;const y=this._sizeLods[s],T=3*y*(s>M-Ts?s-M+Ts:0),b=4*(this._cubeSize-y);ba(e,T,b,3*y,2*y),d.setRenderTarget(e),d.render(l,fr)}}function GM(n){const t=[],e=[],i=[];let s=n;const a=n-Ts+1+Xu.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let d=1/o;r>n-Ts?d=Xu[r-n+Ts-1]:r===0&&(d=0),e.push(d);const c=1/(o-2),h=-c,l=1+c,u=[h,h,l,h,l,l,h,h,l,l,h,l],f=6,_=6,g=3,m=2,p=1,v=new Float32Array(g*_*f),M=new Float32Array(m*_*f),y=new Float32Array(p*_*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,x=b>2?0:-1,S=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];v.set(S,g*_*b),M.set(u,m*_*b);const I=[b,b,b,b,b,b];y.set(I,p*_*b)}const T=new cn;T.setAttribute("position",new Ni(v,g)),T.setAttribute("uv",new Ni(M,m)),T.setAttribute("faceIndex",new Ni(y,p)),i.push(new w(T,null)),s>Ts&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function $u(n,t,e){const i=new zn(n,t,e);return i.texture.mapping=ml,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ba(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function kM(n,t,e){return new En({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zM,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function VM(n,t,e){const i=new Float32Array(qs),s=new F(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Zu(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function ju(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function yl(){return`

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
	`}class Ip extends zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new wp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Y(5,5,5),a=new En({name:"CubemapFromEquirect",uniforms:ja(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Bn,blending:Li});a.uniforms.tEquirect.value=e;const r=new w(s,a),o=e.minFilter;return e.minFilter===Ys&&(e.minFilter=Sn),new Yg(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(a)}}function WM(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?r(u):a(u)}function a(u){if(u&&u.isTexture){const f=u.mapping;if(f===Il||f===Ll)if(t.has(u)){const _=t.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const g=new Ip(_.height);return g.fromEquirectangularTexture(n,u),t.set(u,g),u.addEventListener("dispose",c),o(g.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const f=u.mapping,_=f===Il||f===Ll,g=f===ia||f===Xa;if(_||g){let m=e.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Yu(n)),m=_?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return _&&v&&v.height>0||g&&v&&d(v)?(i===null&&(i=new Yu(n)),m=_?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Il?u.mapping=ia:f===Ll&&(u.mapping=Xa),u}function d(u){let f=0;const _=6;for(let g=0;g<_;g++)u[g]!==void 0&&f++;return f===_}function c(u){const f=u.target;f.removeEventListener("dispose",c);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function l(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:l}}function XM(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Wo("WebGLRenderer: "+i+" extension not supported."),s}}}function qM(n,t,e,i){const s={},a=new WeakMap;function r(l){const u=l.target;u.index!==null&&t.remove(u.index);for(const _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",r),delete s[u.id];const f=a.get(u);f&&(t.remove(f),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(l,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,e.memory.geometries++),u}function d(l){const u=l.attributes;for(const f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(l){const u=[],f=l.index,_=l.attributes.position;let g=0;if(_===void 0)return;if(f!==null){const v=f.array;g=f.version;for(let M=0,y=v.length;M<y;M+=3){const T=v[M+0],b=v[M+1],A=v[M+2];u.push(T,b,b,A,A,T)}}else{const v=_.array;g=_.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const T=M+0,b=M+1,A=M+2;u.push(T,b,b,A,A,T)}}const m=new(_.count>=65535?Ep:Sp)(u,1);m.version=g;const p=a.get(l);p&&t.remove(p),a.set(l,m)}function h(l){const u=a.get(l);if(u){const f=l.index;f!==null&&u.version<f.version&&c(l)}else c(l);return a.get(l)}return{get:o,update:d,getWireframeAttribute:h}}function YM(n,t,e){let i;function s(u){i=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function d(u,f){n.drawElements(i,f,a,u*r),e.update(f,i,1)}function c(u,f,_){_!==0&&(n.drawElementsInstanced(i,f,a,u*r,_),e.update(f,i,_))}function h(u,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,u,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];e.update(m,i,1)}function l(u,f,_,g){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/r,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,a,u,0,g,0,_);let p=0;for(let v=0;v<_;v++)p+=f[v]*g[v];e.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=d,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=l}function $M(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=o*(a/3);break;case n.LINES:e.lines+=o*(a/2);break;case n.LINE_STRIP:e.lines+=o*(a-1);break;case n.LINE_LOOP:e.lines+=o*a;break;case n.POINTS:e.points+=o*a;break;default:fe("WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ZM(n,t,e){const i=new WeakMap,s=new Ge;function a(r,o,d){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==l){let I=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",I)};var f=I;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let T=o.attributes.position.count*y,b=1;T>t.maxTextureSize&&(b=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const A=new Float32Array(T*b*4*l),x=new Mp(A,T,b,l);x.type=Pi,x.needsUpdate=!0;const S=y*4;for(let P=0;P<l;P++){const N=p[P],L=v[P],k=M[P],B=T*b*4*P;for(let V=0;V<N.count;V++){const H=V*S;_===!0&&(s.fromBufferAttribute(N,V),A[B+H+0]=s.x,A[B+H+1]=s.y,A[B+H+2]=s.z,A[B+H+3]=0),g===!0&&(s.fromBufferAttribute(L,V),A[B+H+4]=s.x,A[B+H+5]=s.y,A[B+H+6]=s.z,A[B+H+7]=0),m===!0&&(s.fromBufferAttribute(k,V),A[B+H+8]=s.x,A[B+H+9]=s.y,A[B+H+10]=s.z,A[B+H+11]=k.itemSize===4?s.w:1)}}u={count:l,texture:x,size:new Pt(T,b)},i.set(o,u),o.addEventListener("dispose",I)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=o.morphTargetsRelative?1:1-_;d.getUniforms().setValue(n,"morphTargetBaseInfluence",g),d.getUniforms().setValue(n,"morphTargetInfluences",c)}d.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),d.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function jM(n,t,e,i,s){let a=new WeakMap;function r(c){const h=s.render.frame,l=c.geometry,u=t.get(c,l);if(a.get(u)!==h&&(t.update(u),a.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",d)===!1&&c.addEventListener("dispose",d),a.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;a.get(f)!==h&&(f.update(),a.set(f,h))}return u}function o(){a=new WeakMap}function d(c){const h=c.target;h.removeEventListener("dispose",d),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:o}}const KM={[sp]:"LINEAR_TONE_MAPPING",[ap]:"REINHARD_TONE_MAPPING",[rp]:"CINEON_TONE_MAPPING",[jd]:"ACES_FILMIC_TONE_MAPPING",[lp]:"AGX_TONE_MAPPING",[cp]:"NEUTRAL_TONE_MAPPING",[op]:"CUSTOM_TONE_MAPPING"};function JM(n,t,e,i,s){const a=new zn(t,e,{type:n,depthBuffer:i,stencilBuffer:s}),r=new zn(t,e,{type:Kn,depthBuffer:!1,stencilBuffer:!1}),o=new cn;o.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new _e([0,2,0,0,2,0],2));const d=new Hg({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new w(o,d),h=new Ml(-1,1,1,-1,0,1);let l=null,u=null,f=!1,_,g=null,m=[],p=!1;this.setSize=function(v,M){a.setSize(v,M),r.setSize(v,M);for(let y=0;y<m.length;y++){const T=m[y];T.setSize&&T.setSize(v,M)}},this.setEffects=function(v){m=v,p=m.length>0&&m[0].isRenderPass===!0;const M=a.width,y=a.height;for(let T=0;T<m.length;T++){const b=m[T];b.setSize&&b.setSize(M,y)}},this.begin=function(v,M){if(f||v.toneMapping===Ui&&m.length===0)return!1;if(g=M,M!==null){const y=M.width,T=M.height;(a.width!==y||a.height!==T)&&this.setSize(y,T)}return p===!1&&v.setRenderTarget(a),_=v.toneMapping,v.toneMapping=Ui,!0},this.hasRenderPass=function(){return p},this.end=function(v,M){v.toneMapping=_,f=!0;let y=a,T=r;for(let b=0;b<m.length;b++){const A=m[b];if(A.enabled!==!1&&(A.render(v,T,y,M),A.needsSwap!==!1)){const x=y;y=T,T=x}}if(l!==v.outputColorSpace||u!==v.toneMapping){l=v.outputColorSpace,u=v.toneMapping,d.defines={},pe.getTransfer(l)===Me&&(d.defines.SRGB_TRANSFER="");const b=KM[u];b&&(d.defines[b]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(g),v.render(c,h),g=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),d.dispose()}}const Lp=new Rn,xd=new Pr(1,1),Up=new Mp,Np=new _g,Fp=new wp,Ku=[],Ju=[],Qu=new Float32Array(16),tf=new Float32Array(9),ef=new Float32Array(4);function ar(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let a=Ku[s];if(a===void 0&&(a=new Float32Array(s),Ku[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=e,n[r].toArray(a,o)}return a}function Qe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function tn(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Sl(n,t){let e=Ju[t];e===void 0&&(e=new Int32Array(t),Ju[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function QM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ty(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2fv(this.addr,t),tn(e,t)}}function ey(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;n.uniform3fv(this.addr,t),tn(e,t)}}function ny(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4fv(this.addr,t),tn(e,t)}}function iy(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;ef.set(i),n.uniformMatrix2fv(this.addr,!1,ef),tn(e,i)}}function sy(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;tf.set(i),n.uniformMatrix3fv(this.addr,!1,tf),tn(e,i)}}function ay(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;Qu.set(i),n.uniformMatrix4fv(this.addr,!1,Qu),tn(e,i)}}function ry(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function oy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2iv(this.addr,t),tn(e,t)}}function ly(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;n.uniform3iv(this.addr,t),tn(e,t)}}function cy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4iv(this.addr,t),tn(e,t)}}function dy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2uiv(this.addr,t),tn(e,t)}}function uy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;n.uniform3uiv(this.addr,t),tn(e,t)}}function fy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4uiv(this.addr,t),tn(e,t)}}function py(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(xd.compareFunction=e.isReversedDepthBuffer()?sh:ih,a=xd):a=Lp,e.setTexture2D(t||a,s)}function my(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Np,s)}function _y(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Fp,s)}function gy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Up,s)}function xy(n){switch(n){case 5126:return QM;case 35664:return ty;case 35665:return ey;case 35666:return ny;case 35674:return iy;case 35675:return sy;case 35676:return ay;case 5124:case 35670:return ry;case 35667:case 35671:return oy;case 35668:case 35672:return ly;case 35669:case 35673:return cy;case 5125:return dy;case 36294:return hy;case 36295:return uy;case 36296:return fy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return gy}}function vy(n,t){n.uniform1fv(this.addr,t)}function My(n,t){const e=ar(t,this.size,2);n.uniform2fv(this.addr,e)}function yy(n,t){const e=ar(t,this.size,3);n.uniform3fv(this.addr,e)}function Sy(n,t){const e=ar(t,this.size,4);n.uniform4fv(this.addr,e)}function Ey(n,t){const e=ar(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function by(n,t){const e=ar(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function wy(n,t){const e=ar(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Ty(n,t){n.uniform1iv(this.addr,t)}function Ay(n,t){n.uniform2iv(this.addr,t)}function Ry(n,t){n.uniform3iv(this.addr,t)}function Cy(n,t){n.uniform4iv(this.addr,t)}function Py(n,t){n.uniform1uiv(this.addr,t)}function Dy(n,t){n.uniform2uiv(this.addr,t)}function Iy(n,t){n.uniform3uiv(this.addr,t)}function Ly(n,t){n.uniform4uiv(this.addr,t)}function Uy(n,t,e){const i=this.cache,s=t.length,a=Sl(e,s);Qe(i,a)||(n.uniform1iv(this.addr,a),tn(i,a));let r;this.type===n.SAMPLER_2D_SHADOW?r=xd:r=Lp;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||r,a[o])}function Ny(n,t,e){const i=this.cache,s=t.length,a=Sl(e,s);Qe(i,a)||(n.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||Np,a[r])}function Fy(n,t,e){const i=this.cache,s=t.length,a=Sl(e,s);Qe(i,a)||(n.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Fp,a[r])}function Oy(n,t,e){const i=this.cache,s=t.length,a=Sl(e,s);Qe(i,a)||(n.uniform1iv(this.addr,a),tn(i,a));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||Up,a[r])}function By(n){switch(n){case 5126:return vy;case 35664:return My;case 35665:return yy;case 35666:return Sy;case 35674:return Ey;case 35675:return by;case 35676:return wy;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return Ry;case 35669:case 35673:return Cy;case 5125:return Py;case 36294:return Dy;case 36295:return Iy;case 36296:return Ly;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return Ny;case 35680:case 36300:case 36308:case 36293:return Fy;case 36289:case 36303:case 36311:case 36292:return Oy}}class zy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xy(e.type)}}class Hy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=By(e.type)}}class Gy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(t,e[o.id],i)}}}const dc=/(\w+)(\])?(\[|\.)?/g;function nf(n,t){n.seq.push(t),n.map[t.id]=t}function ky(n,t,e){const i=n.name,s=i.length;for(dc.lastIndex=0;;){const a=dc.exec(i),r=dc.lastIndex;let o=a[1];const d=a[2]==="]",c=a[3];if(d&&(o=o|0),c===void 0||c==="["&&r+2===s){nf(e,c===void 0?new zy(o,n,t):new Hy(o,n,t));break}else{let l=e.map[o];l===void 0&&(l=new Gy(o),nf(e,l)),e=l}}}class Po{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(e,r),d=t.getUniformLocation(e,o.name);ky(o,d,this)}const s=[],a=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,e,i,s){const a=this.map[e];a!==void 0&&a.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let a=0,r=e.length;a!==r;++a){const o=e[a],d=i[o.id];d.needsUpdate!==!1&&o.setValue(t,d.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,a=t.length;s!==a;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function sf(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Vy=37297;let Wy=0;function Xy(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return i.join(`
`)}const af=new ne;function qy(n){pe._getMatrix(af,pe.workingColorSpace,n);const t=`mat3( ${af.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(n)){case ko:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function rf(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),a=(n.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+Xy(n.getShaderSource(t),o)}else return a}function Yy(n,t){const e=qy(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const $y={[sp]:"Linear",[ap]:"Reinhard",[rp]:"Cineon",[jd]:"ACESFilmic",[lp]:"AgX",[cp]:"Neutral",[op]:"Custom"};function Zy(n,t){const e=$y[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Mo=new F;function jy(){pe.getLuminanceCoefficients(Mo);const n=Mo.x.toFixed(4),t=Mo.y.toFixed(4),e=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ky(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function Jy(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Qy(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(t,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),e[r]={type:a.type,location:n.getAttribLocation(t,r),locationSize:o}}return e}function gr(n){return n!==""}function of(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tS=/^[ \t]*#include +<([\w\d./]+)>/gm;function vd(n){return n.replace(tS,nS)}const eS=new Map;function nS(n,t){let e=ie[t];if(e===void 0){const i=eS.get(t);if(i!==void 0)e=ie[i],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return vd(e)}const iS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cf(n){return n.replace(iS,sS)}function sS(n,t,e,i){let s="";for(let a=parseInt(t);a<parseInt(e);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function df(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const aS={[bo]:"SHADOWMAP_TYPE_PCF",[_r]:"SHADOWMAP_TYPE_VSM"};function rS(n){return aS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const oS={[ia]:"ENVMAP_TYPE_CUBE",[Xa]:"ENVMAP_TYPE_CUBE",[ml]:"ENVMAP_TYPE_CUBE_UV"};function lS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":oS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const cS={[Xa]:"ENVMAP_MODE_REFRACTION"};function dS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":cS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const hS={[ip]:"ENVMAP_BLENDING_MULTIPLY",[$_]:"ENVMAP_BLENDING_MIX",[Z_]:"ENVMAP_BLENDING_ADD"};function uS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":hS[n.combine]||"ENVMAP_BLENDING_NONE"}function fS(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function pS(n,t,e,i){const s=n.getContext(),a=e.defines;let r=e.vertexShader,o=e.fragmentShader;const d=rS(e),c=lS(e),h=dS(e),l=uS(e),u=fS(e),f=Ky(e),_=Jy(a),g=s.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(gr).join(`
`),p.length>0&&(p+=`
`)):(m=[df(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+d:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),p=[df(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+l:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+d:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ui?"#define TONE_MAPPING":"",e.toneMapping!==Ui?ie.tonemapping_pars_fragment:"",e.toneMapping!==Ui?Zy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,Yy("linearToOutputTexel",e.outputColorSpace),jy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gr).join(`
`)),r=vd(r),r=of(r,e),r=lf(r,e),o=vd(o),o=of(o,e),o=lf(o,e),r=cf(r),o=cf(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===mu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===mu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+r,y=v+p+o,T=sf(s,s.VERTEX_SHADER,M),b=sf(s,s.FRAGMENT_SHADER,y);s.attachShader(g,T),s.attachShader(g,b),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(P){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(g)||"",L=s.getShaderInfoLog(T)||"",k=s.getShaderInfoLog(b)||"",B=N.trim(),V=L.trim(),H=k.trim();let et=!0,tt=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,T,b);else{const ht=rf(s,T,"vertex"),ot=rf(s,b,"fragment");fe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+ht+`
`+ot)}else B!==""?Xt("WebGLProgram: Program Info Log:",B):(V===""||H==="")&&(tt=!1);tt&&(P.diagnostics={runnable:et,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(T),s.deleteShader(b),x=new Po(s,g),S=Qy(s,g)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(g,Vy)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wy++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=b,this}let mS=0;class _S{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new gS(t),e.set(t,i)),i}}class gS{constructor(t){this.id=mS++,this.code=t,this.usedTimes=0}}function xS(n,t,e,i,s,a){const r=new rh,o=new _S,d=new Set,c=[],h=new Map,l=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return d.add(x),x===0?"uv":`uv${x}`}function g(x,S,I,P,N){const L=P.fog,k=N.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=t.get(x.envMap||B,V),et=H&&H.mapping===ml?H.image.height:null,tt=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Xt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ht=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=ht!==void 0?ht.length:0;let lt=0;k.morphAttributes.position!==void 0&&(lt=1),k.morphAttributes.normal!==void 0&&(lt=2),k.morphAttributes.color!==void 0&&(lt=3);let Gt,Se,Ie,Q;if(tt){const ve=Ai[tt];Gt=ve.vertexShader,Se=ve.fragmentShader}else Gt=x.vertexShader,Se=x.fragmentShader,o.update(x),Ie=o.getVertexShaderID(x),Q=o.getFragmentShaderID(x);const ut=n.getRenderTarget(),mt=n.state.buffers.depth.getReversed(),ee=N.isInstancedMesh===!0,kt=N.isBatchedMesh===!0,$t=!!x.map,en=!!x.matcap,ue=!!H,xe=!!x.aoMap,Te=!!x.lightMap,re=!!x.bumpMap,Ve=!!x.normalMap,U=!!x.displacementMap,qe=!!x.emissiveMap,ge=!!x.metalnessMap,Ce=!!x.roughnessMap,Lt=x.anisotropy>0,C=x.clearcoat>0,E=x.dispersion>0,z=x.iridescence>0,K=x.sheen>0,it=x.transmission>0,j=Lt&&!!x.anisotropyMap,At=C&&!!x.clearcoatMap,ft=C&&!!x.clearcoatNormalMap,Ot=C&&!!x.clearcoatRoughnessMap,Vt=z&&!!x.iridescenceMap,at=z&&!!x.iridescenceThicknessMap,ct=K&&!!x.sheenColorMap,Rt=K&&!!x.sheenRoughnessMap,Dt=!!x.specularMap,yt=!!x.specularColorMap,oe=!!x.specularIntensityMap,O=it&&!!x.transmissionMap,pt=it&&!!x.thicknessMap,dt=!!x.gradientMap,bt=!!x.alphaMap,rt=x.alphaTest>0,Z=!!x.alphaHash,Ct=!!x.extensions;let Zt=Ui;x.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Zt=n.toneMapping);const Pe={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:Gt,fragmentShader:Se,defines:x.defines,customVertexShaderID:Ie,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:kt,batchingColor:kt&&N._colorsTexture!==null,instancing:ee,instancingColor:ee&&N.instanceColor!==null,instancingMorph:ee&&N.morphTexture!==null,outputColorSpace:ut===null?n.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Ya,alphaToCoverage:!!x.alphaToCoverage,map:$t,matcap:en,envMap:ue,envMapMode:ue&&H.mapping,envMapCubeUVHeight:et,aoMap:xe,lightMap:Te,bumpMap:re,normalMap:Ve,displacementMap:U,emissiveMap:qe,normalMapObjectSpace:Ve&&x.normalMapType===J_,normalMapTangentSpace:Ve&&x.normalMapType===xp,metalnessMap:ge,roughnessMap:Ce,anisotropy:Lt,anisotropyMap:j,clearcoat:C,clearcoatMap:At,clearcoatNormalMap:ft,clearcoatRoughnessMap:Ot,dispersion:E,iridescence:z,iridescenceMap:Vt,iridescenceThicknessMap:at,sheen:K,sheenColorMap:ct,sheenRoughnessMap:Rt,specularMap:Dt,specularColorMap:yt,specularIntensityMap:oe,transmission:it,transmissionMap:O,thicknessMap:pt,gradientMap:dt,opaque:x.transparent===!1&&x.blending===Oa&&x.alphaToCoverage===!1,alphaMap:bt,alphaTest:rt,alphaHash:Z,combine:x.combine,mapUv:$t&&_(x.map.channel),aoMapUv:xe&&_(x.aoMap.channel),lightMapUv:Te&&_(x.lightMap.channel),bumpMapUv:re&&_(x.bumpMap.channel),normalMapUv:Ve&&_(x.normalMap.channel),displacementMapUv:U&&_(x.displacementMap.channel),emissiveMapUv:qe&&_(x.emissiveMap.channel),metalnessMapUv:ge&&_(x.metalnessMap.channel),roughnessMapUv:Ce&&_(x.roughnessMap.channel),anisotropyMapUv:j&&_(x.anisotropyMap.channel),clearcoatMapUv:At&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ft&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ot&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(x.sheenRoughnessMap.channel),specularMapUv:Dt&&_(x.specularMap.channel),specularColorMapUv:yt&&_(x.specularColorMap.channel),specularIntensityMapUv:oe&&_(x.specularIntensityMap.channel),transmissionMapUv:O&&_(x.transmissionMap.channel),thicknessMapUv:pt&&_(x.thicknessMap.channel),alphaMapUv:bt&&_(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ve||Lt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!k.attributes.uv&&($t||bt),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||k.attributes.normal===void 0&&Ve===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:l,reversedDepthBuffer:mt,skinning:N.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Zt,decodeVideoTexture:$t&&x.map.isVideoTexture===!0&&pe.getTransfer(x.map.colorSpace)===Me,decodeVideoTextureEmissive:qe&&x.emissiveMap.isVideoTexture===!0&&pe.getTransfer(x.emissiveMap.colorSpace)===Me,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$n,flipSided:x.side===Bn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&x.extensions.multiDraw===!0||kt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Pe.vertexUv1s=d.has(1),Pe.vertexUv2s=d.has(2),Pe.vertexUv3s=d.has(3),d.clear(),Pe}function m(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)S.push(I),S.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(S,x),v(S,x),S.push(n.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function p(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function v(x,S){r.disableAll(),S.instancing&&r.enable(0),S.instancingColor&&r.enable(1),S.instancingMorph&&r.enable(2),S.matcap&&r.enable(3),S.envMap&&r.enable(4),S.normalMapObjectSpace&&r.enable(5),S.normalMapTangentSpace&&r.enable(6),S.clearcoat&&r.enable(7),S.iridescence&&r.enable(8),S.alphaTest&&r.enable(9),S.vertexColors&&r.enable(10),S.vertexAlphas&&r.enable(11),S.vertexUv1s&&r.enable(12),S.vertexUv2s&&r.enable(13),S.vertexUv3s&&r.enable(14),S.vertexTangents&&r.enable(15),S.anisotropy&&r.enable(16),S.alphaHash&&r.enable(17),S.batching&&r.enable(18),S.dispersion&&r.enable(19),S.batchingColor&&r.enable(20),S.gradientMap&&r.enable(21),x.push(r.mask),r.disableAll(),S.fog&&r.enable(0),S.useFog&&r.enable(1),S.flatShading&&r.enable(2),S.logarithmicDepthBuffer&&r.enable(3),S.reversedDepthBuffer&&r.enable(4),S.skinning&&r.enable(5),S.morphTargets&&r.enable(6),S.morphNormals&&r.enable(7),S.morphColors&&r.enable(8),S.premultipliedAlpha&&r.enable(9),S.shadowMapEnabled&&r.enable(10),S.doubleSided&&r.enable(11),S.flipSided&&r.enable(12),S.useDepthPacking&&r.enable(13),S.dithering&&r.enable(14),S.transmission&&r.enable(15),S.sheen&&r.enable(16),S.opaque&&r.enable(17),S.pointsUvs&&r.enable(18),S.decodeVideoTexture&&r.enable(19),S.decodeVideoTextureEmissive&&r.enable(20),S.alphaToCoverage&&r.enable(21),x.push(r.mask)}function M(x){const S=f[x.type];let I;if(S){const P=Ai[S];I=$o.clone(P.uniforms)}else I=x.uniforms;return I}function y(x,S){let I=h.get(S);return I!==void 0?++I.usedTimes:(I=new pS(n,S,x,s),c.push(I),h.set(S,I)),I}function T(x){if(--x.usedTimes===0){const S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:A}}function vS(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,d){n.get(r)[o]=d}function a(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:a}}function MS(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function hf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function uf(){const n=[];let t=0;const e=[],i=[],s=[];function a(){t=0,e.length=0,i.length=0,s.length=0}function r(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,_,g,m,p){let v=n[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:_,materialVariant:r(u),groupOrder:g,renderOrder:u.renderOrder,z:m,group:p},n[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=_,v.materialVariant=r(u),v.groupOrder=g,v.renderOrder=u.renderOrder,v.z=m,v.group=p),t++,v}function d(u,f,_,g,m,p){const v=o(u,f,_,g,m,p);_.transmission>0?i.push(v):_.transparent===!0?s.push(v):e.push(v)}function c(u,f,_,g,m,p){const v=o(u,f,_,g,m,p);_.transmission>0?i.unshift(v):_.transparent===!0?s.unshift(v):e.unshift(v)}function h(u,f){e.length>1&&e.sort(u||MS),i.length>1&&i.sort(f||hf),s.length>1&&s.sort(f||hf)}function l(){for(let u=t,f=n.length;u<f;u++){const _=n[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:a,push:d,unshift:c,finish:l,sort:h}}function yS(){let n=new WeakMap;function t(i,s){const a=n.get(i);let r;return a===void 0?(r=new uf,n.set(i,[r])):s>=a.length?(r=new uf,a.push(r)):r=a[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function SS(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Bt};break;case"SpotLight":e={position:new F,direction:new F,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function ES(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let bS=0;function wS(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function TS(n){const t=new SS,e=ES(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const s=new F,a=new Fe,r=new Fe;function o(c){let h=0,l=0,u=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,_=0,g=0,m=0,p=0,v=0,M=0,y=0,T=0,b=0,A=0;c.sort(wS);for(let S=0,I=c.length;S<I;S++){const P=c[S],N=P.color,L=P.intensity,k=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===qa?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=N.r*L,l+=N.g*L,u+=N.b*L;else if(P.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(P.sh.coefficients[V],L);A++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const H=P.shadow,et=e.get(P);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,i.directionalShadow[f]=et,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=P.shadow.matrix,v++}i.directional[f]=V,f++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(N).multiplyScalar(L),V.distance=k,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,i.spot[g]=V;const H=P.shadow;if(P.map&&(i.spotLightMap[T]=P.map,T++,H.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[g]=H.matrix,P.castShadow){const et=e.get(P);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,i.spotShadow[g]=et,i.spotShadowMap[g]=B,y++}g++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(N).multiplyScalar(L),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=V,m++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const H=P.shadow,et=e.get(P);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,et.shadowCameraNear=H.camera.near,et.shadowCameraFar=H.camera.far,i.pointShadow[_]=et,i.pointShadowMap[_]=B,i.pointShadowMatrix[_]=P.shadow.matrix,M++}i.point[_]=V,_++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(L),V.groundColor.copy(P.groundColor).multiplyScalar(L),i.hemi[p]=V,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_t.LTC_FLOAT_1,i.rectAreaLTC2=_t.LTC_FLOAT_2):(i.rectAreaLTC1=_t.LTC_HALF_1,i.rectAreaLTC2=_t.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=l,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==f||x.pointLength!==_||x.spotLength!==g||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==v||x.numPointShadows!==M||x.numSpotShadows!==y||x.numSpotMaps!==T||x.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,x.directionalLength=f,x.pointLength=_,x.spotLength=g,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=v,x.numPointShadows=M,x.numSpotShadows=y,x.numSpotMaps=T,x.numLightProbes=A,i.version=bS++)}function d(c,h){let l=0,u=0,f=0,_=0,g=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const M=c[p];if(M.isDirectionalLight){const y=i.directional[l];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),l++}else if(M.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(M.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(M.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:d,state:i}}function ff(n){const t=new TS(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function a(h){e.push(h)}function r(h){i.push(h)}function o(){t.setup(e)}function d(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:d,pushLight:a,pushShadow:r}}function AS(n){let t=new WeakMap;function e(s,a=0){const r=t.get(s);let o;return r===void 0?(o=new ff(n),t.set(s,[o])):a>=r.length?(o=new ff(n),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const RS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CS=`uniform sampler2D shadow_pass;
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
}`,PS=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],DS=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],pf=new Fe,pr=new F,hc=new F;function IS(n,t,e){let i=new lh;const s=new Pt,a=new Pt,r=new Ge,o=new Gg,d=new kg,c={},h=e.maxTextureSize,l={[Ps]:Bn,[Bn]:Ps,[$n]:$n},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:RS,fragmentShader:CS}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const _=new cn;_.setAttribute("position",new Ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new w(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bo;let p=this.type;this.render=function(b,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===C_&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=bo);const S=n.getRenderTarget(),I=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Li),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const L=p!==this.type;L&&A.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(B=>B.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,B=b.length;k<B;k++){const V=b[k],H=V.shadow;if(H===void 0){Xt("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const et=H.getFrameExtents();s.multiply(et),a.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/et.x),s.x=a.x*et.x,H.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/et.y),s.y=a.y*et.y,H.mapSize.y=a.y));const tt=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=tt,H.map===null||L===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===_r){if(V.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new zn(s.x,s.y,{format:qa,type:Kn,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new Pr(s.x,s.y,Pi),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=os,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=un,H.map.depthTexture.magFilter=un}else V.isPointLight?(H.map=new Ip(s.x),H.map.depthTexture=new Fg(s.x,Bi)):(H.map=new zn(s.x,s.y),H.map.depthTexture=new Pr(s.x,s.y,Bi)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=os,this.type===bo?(H.map.depthTexture.compareFunction=tt?sh:ih,H.map.depthTexture.minFilter=Sn,H.map.depthTexture.magFilter=Sn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=un,H.map.depthTexture.magFilter=un);H.camera.updateProjectionMatrix()}const ht=H.map.isWebGLCubeRenderTarget?6:1;for(let ot=0;ot<ht;ot++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,ot),n.clear();else{ot===0&&(n.setRenderTarget(H.map),n.clear());const lt=H.getViewport(ot);r.set(a.x*lt.x,a.y*lt.y,a.x*lt.z,a.y*lt.w),N.viewport(r)}if(V.isPointLight){const lt=H.camera,Gt=H.matrix,Se=V.distance||lt.far;Se!==lt.far&&(lt.far=Se,lt.updateProjectionMatrix()),pr.setFromMatrixPosition(V.matrixWorld),lt.position.copy(pr),hc.copy(lt.position),hc.add(PS[ot]),lt.up.copy(DS[ot]),lt.lookAt(hc),lt.updateMatrixWorld(),Gt.makeTranslation(-pr.x,-pr.y,-pr.z),pf.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),H._frustum.setFromProjectionMatrix(pf,lt.coordinateSystem,lt.reversedDepth)}else H.updateMatrices(V);i=H.getFrustum(),y(A,x,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===_r&&v(H,x),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(S,I,P)};function v(b,A){const x=t.update(g);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new zn(s.x,s.y,{format:qa,type:Kn})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,x,u,g,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,x,f,g,null)}function M(b,A,x,S){let I=null;const P=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)I=P;else if(I=x.isPointLight===!0?d:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const N=I.uuid,L=A.uuid;let k=c[N];k===void 0&&(k={},c[N]=k);let B=k[L];B===void 0&&(B=I.clone(),k[L]=B,A.addEventListener("dispose",T)),I=B}if(I.visible=A.visible,I.wireframe=A.wireframe,S===_r?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:l[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const N=n.properties.get(I);N.light=x}return I}function y(b,A,x,S,I){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===_r)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const L=t.update(b),k=b.material;if(Array.isArray(k)){const B=L.groups;for(let V=0,H=B.length;V<H;V++){const et=B[V],tt=k[et.materialIndex];if(tt&&tt.visible){const ht=M(b,tt,S,I);b.onBeforeShadow(n,b,A,x,L,ht,et),n.renderBufferDirect(x,null,L,ht,b,et),b.onAfterShadow(n,b,A,x,L,ht,et)}}}else if(k.visible){const B=M(b,k,S,I);b.onBeforeShadow(n,b,A,x,L,B,null),n.renderBufferDirect(x,null,L,B,b,null),b.onAfterShadow(n,b,A,x,L,B,null)}}const N=b.children;for(let L=0,k=N.length;L<k;L++)y(N[L],A,x,S,I)}function T(b){b.target.removeEventListener("dispose",T);for(const x in c){const S=c[x],I=b.target.uuid;I in S&&(S[I].dispose(),delete S[I])}}}function LS(n,t){function e(){let O=!1;const pt=new Ge;let dt=null;const bt=new Ge(0,0,0,0);return{setMask:function(rt){dt!==rt&&!O&&(n.colorMask(rt,rt,rt,rt),dt=rt)},setLocked:function(rt){O=rt},setClear:function(rt,Z,Ct,Zt,Pe){Pe===!0&&(rt*=Zt,Z*=Zt,Ct*=Zt),pt.set(rt,Z,Ct,Zt),bt.equals(pt)===!1&&(n.clearColor(rt,Z,Ct,Zt),bt.copy(pt))},reset:function(){O=!1,dt=null,bt.set(-1,0,0,0)}}}function i(){let O=!1,pt=!1,dt=null,bt=null,rt=null;return{setReversed:function(Z){if(pt!==Z){const Ct=t.get("EXT_clip_control");Z?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),pt=Z;const Zt=rt;rt=null,this.setClear(Zt)}},getReversed:function(){return pt},setTest:function(Z){Z?ut(n.DEPTH_TEST):mt(n.DEPTH_TEST)},setMask:function(Z){dt!==Z&&!O&&(n.depthMask(Z),dt=Z)},setFunc:function(Z){if(pt&&(Z=lg[Z]),bt!==Z){switch(Z){case Cc:n.depthFunc(n.NEVER);break;case Pc:n.depthFunc(n.ALWAYS);break;case Dc:n.depthFunc(n.LESS);break;case Wa:n.depthFunc(n.LEQUAL);break;case Ic:n.depthFunc(n.EQUAL);break;case Lc:n.depthFunc(n.GEQUAL);break;case Uc:n.depthFunc(n.GREATER);break;case Nc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}bt=Z}},setLocked:function(Z){O=Z},setClear:function(Z){rt!==Z&&(rt=Z,pt&&(Z=1-Z),n.clearDepth(Z))},reset:function(){O=!1,dt=null,bt=null,rt=null,pt=!1}}}function s(){let O=!1,pt=null,dt=null,bt=null,rt=null,Z=null,Ct=null,Zt=null,Pe=null;return{setTest:function(ve){O||(ve?ut(n.STENCIL_TEST):mt(n.STENCIL_TEST))},setMask:function(ve){pt!==ve&&!O&&(n.stencilMask(ve),pt=ve)},setFunc:function(ve,Vi,Wi){(dt!==ve||bt!==Vi||rt!==Wi)&&(n.stencilFunc(ve,Vi,Wi),dt=ve,bt=Vi,rt=Wi)},setOp:function(ve,Vi,Wi){(Z!==ve||Ct!==Vi||Zt!==Wi)&&(n.stencilOp(ve,Vi,Wi),Z=ve,Ct=Vi,Zt=Wi)},setLocked:function(ve){O=ve},setClear:function(ve){Pe!==ve&&(n.clearStencil(ve),Pe=ve)},reset:function(){O=!1,pt=null,dt=null,bt=null,rt=null,Z=null,Ct=null,Zt=null,Pe=null}}}const a=new e,r=new i,o=new s,d=new WeakMap,c=new WeakMap;let h={},l={},u=new WeakMap,f=[],_=null,g=!1,m=null,p=null,v=null,M=null,y=null,T=null,b=null,A=new Bt(0,0,0),x=0,S=!1,I=null,P=null,N=null,L=null,k=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,H=0;const et=n.getParameter(n.VERSION);et.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(et)[1]),V=H>=1):et.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),V=H>=2);let tt=null,ht={};const ot=n.getParameter(n.SCISSOR_BOX),lt=n.getParameter(n.VIEWPORT),Gt=new Ge().fromArray(ot),Se=new Ge().fromArray(lt);function Ie(O,pt,dt,bt){const rt=new Uint8Array(4),Z=n.createTexture();n.bindTexture(O,Z),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<dt;Ct++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(pt,0,n.RGBA,1,1,bt,0,n.RGBA,n.UNSIGNED_BYTE,rt):n.texImage2D(pt+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,rt);return Z}const Q={};Q[n.TEXTURE_2D]=Ie(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Ie(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Ie(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Ie(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ut(n.DEPTH_TEST),r.setFunc(Wa),re(!1),Ve(du),ut(n.CULL_FACE),xe(Li);function ut(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function mt(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function ee(O,pt){return l[O]!==pt?(n.bindFramebuffer(O,pt),l[O]=pt,O===n.DRAW_FRAMEBUFFER&&(l[n.FRAMEBUFFER]=pt),O===n.FRAMEBUFFER&&(l[n.DRAW_FRAMEBUFFER]=pt),!0):!1}function kt(O,pt){let dt=f,bt=!1;if(O){dt=u.get(pt),dt===void 0&&(dt=[],u.set(pt,dt));const rt=O.textures;if(dt.length!==rt.length||dt[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,Ct=rt.length;Z<Ct;Z++)dt[Z]=n.COLOR_ATTACHMENT0+Z;dt.length=rt.length,bt=!0}}else dt[0]!==n.BACK&&(dt[0]=n.BACK,bt=!0);bt&&n.drawBuffers(dt)}function $t(O){return _!==O?(n.useProgram(O),_=O,!0):!1}const en={[Xs]:n.FUNC_ADD,[D_]:n.FUNC_SUBTRACT,[I_]:n.FUNC_REVERSE_SUBTRACT};en[L_]=n.MIN,en[U_]=n.MAX;const ue={[N_]:n.ZERO,[F_]:n.ONE,[O_]:n.SRC_COLOR,[Ac]:n.SRC_ALPHA,[V_]:n.SRC_ALPHA_SATURATE,[G_]:n.DST_COLOR,[z_]:n.DST_ALPHA,[B_]:n.ONE_MINUS_SRC_COLOR,[Rc]:n.ONE_MINUS_SRC_ALPHA,[k_]:n.ONE_MINUS_DST_COLOR,[H_]:n.ONE_MINUS_DST_ALPHA,[W_]:n.CONSTANT_COLOR,[X_]:n.ONE_MINUS_CONSTANT_COLOR,[q_]:n.CONSTANT_ALPHA,[Y_]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(O,pt,dt,bt,rt,Z,Ct,Zt,Pe,ve){if(O===Li){g===!0&&(mt(n.BLEND),g=!1);return}if(g===!1&&(ut(n.BLEND),g=!0),O!==P_){if(O!==m||ve!==S){if((p!==Xs||y!==Xs)&&(n.blendEquation(n.FUNC_ADD),p=Xs,y=Xs),ve)switch(O){case Oa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tc:n.blendFunc(n.ONE,n.ONE);break;case hu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case uu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:fe("WebGLState: Invalid blending: ",O);break}else switch(O){case Oa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case hu:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uu:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",O);break}v=null,M=null,T=null,b=null,A.set(0,0,0),x=0,m=O,S=ve}return}rt=rt||pt,Z=Z||dt,Ct=Ct||bt,(pt!==p||rt!==y)&&(n.blendEquationSeparate(en[pt],en[rt]),p=pt,y=rt),(dt!==v||bt!==M||Z!==T||Ct!==b)&&(n.blendFuncSeparate(ue[dt],ue[bt],ue[Z],ue[Ct]),v=dt,M=bt,T=Z,b=Ct),(Zt.equals(A)===!1||Pe!==x)&&(n.blendColor(Zt.r,Zt.g,Zt.b,Pe),A.copy(Zt),x=Pe),m=O,S=!1}function Te(O,pt){O.side===$n?mt(n.CULL_FACE):ut(n.CULL_FACE);let dt=O.side===Bn;pt&&(dt=!dt),re(dt),O.blending===Oa&&O.transparent===!1?xe(Li):xe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),a.setMask(O.colorWrite);const bt=O.stencilWrite;o.setTest(bt),bt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),qe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ut(n.SAMPLE_ALPHA_TO_COVERAGE):mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function re(O){I!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),I=O)}function Ve(O){O!==A_?(ut(n.CULL_FACE),O!==P&&(O===du?n.cullFace(n.BACK):O===R_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):mt(n.CULL_FACE),P=O}function U(O){O!==N&&(V&&n.lineWidth(O),N=O)}function qe(O,pt,dt){O?(ut(n.POLYGON_OFFSET_FILL),(L!==pt||k!==dt)&&(L=pt,k=dt,r.getReversed()&&(pt=-pt),n.polygonOffset(pt,dt))):mt(n.POLYGON_OFFSET_FILL)}function ge(O){O?ut(n.SCISSOR_TEST):mt(n.SCISSOR_TEST)}function Ce(O){O===void 0&&(O=n.TEXTURE0+B-1),tt!==O&&(n.activeTexture(O),tt=O)}function Lt(O,pt,dt){dt===void 0&&(tt===null?dt=n.TEXTURE0+B-1:dt=tt);let bt=ht[dt];bt===void 0&&(bt={type:void 0,texture:void 0},ht[dt]=bt),(bt.type!==O||bt.texture!==pt)&&(tt!==dt&&(n.activeTexture(dt),tt=dt),n.bindTexture(O,pt||Q[O]),bt.type=O,bt.texture=pt)}function C(){const O=ht[tt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function E(){try{n.compressedTexImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function K(){try{n.texSubImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function it(){try{n.texSubImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function At(){try{n.compressedTexSubImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function ft(){try{n.texStorage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function Ot(){try{n.texStorage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function Vt(){try{n.texImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function at(){try{n.texImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function ct(O){Gt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Gt.copy(O))}function Rt(O){Se.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),Se.copy(O))}function Dt(O,pt){let dt=c.get(pt);dt===void 0&&(dt=new WeakMap,c.set(pt,dt));let bt=dt.get(O);bt===void 0&&(bt=n.getUniformBlockIndex(pt,O.name),dt.set(O,bt))}function yt(O,pt){const bt=c.get(pt).get(O);d.get(pt)!==bt&&(n.uniformBlockBinding(pt,bt,O.__bindingPointIndex),d.set(pt,bt))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},tt=null,ht={},l={},u=new WeakMap,f=[],_=null,g=!1,m=null,p=null,v=null,M=null,y=null,T=null,b=null,A=new Bt(0,0,0),x=0,S=!1,I=null,P=null,N=null,L=null,k=null,Gt.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:ut,disable:mt,bindFramebuffer:ee,drawBuffers:kt,useProgram:$t,setBlending:xe,setMaterial:Te,setFlipSided:re,setCullFace:Ve,setLineWidth:U,setPolygonOffset:qe,setScissorTest:ge,activeTexture:Ce,bindTexture:Lt,unbindTexture:C,compressedTexImage2D:E,compressedTexImage3D:z,texImage2D:Vt,texImage3D:at,updateUBOMapping:Dt,uniformBlockBinding:yt,texStorage2D:ft,texStorage3D:Ot,texSubImage2D:K,texSubImage3D:it,compressedTexSubImage2D:j,compressedTexSubImage3D:At,scissor:ct,viewport:Rt,reset:oe}}function US(n,t,e,i,s,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pt,h=new WeakMap;let l;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,E){return f?new OffscreenCanvas(C,E):Vo("canvas")}function g(C,E,z){let K=1;const it=Lt(C);if((it.width>z||it.height>z)&&(K=z/Math.max(it.width,it.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const j=Math.floor(K*it.width),At=Math.floor(K*it.height);l===void 0&&(l=_(j,At));const ft=E?_(j,At):l;return ft.width=j,ft.height=At,ft.getContext("2d").drawImage(C,0,0,j,At),Xt("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+j+"x"+At+")."),ft}else return"data"in C&&Xt("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(C,E,z,K,it=!1){if(C!==null){if(n[C]!==void 0)return n[C];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let j=E;if(E===n.RED&&(z===n.FLOAT&&(j=n.R32F),z===n.HALF_FLOAT&&(j=n.R16F),z===n.UNSIGNED_BYTE&&(j=n.R8)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.R8UI),z===n.UNSIGNED_SHORT&&(j=n.R16UI),z===n.UNSIGNED_INT&&(j=n.R32UI),z===n.BYTE&&(j=n.R8I),z===n.SHORT&&(j=n.R16I),z===n.INT&&(j=n.R32I)),E===n.RG&&(z===n.FLOAT&&(j=n.RG32F),z===n.HALF_FLOAT&&(j=n.RG16F),z===n.UNSIGNED_BYTE&&(j=n.RG8)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RG8UI),z===n.UNSIGNED_SHORT&&(j=n.RG16UI),z===n.UNSIGNED_INT&&(j=n.RG32UI),z===n.BYTE&&(j=n.RG8I),z===n.SHORT&&(j=n.RG16I),z===n.INT&&(j=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RGB8UI),z===n.UNSIGNED_SHORT&&(j=n.RGB16UI),z===n.UNSIGNED_INT&&(j=n.RGB32UI),z===n.BYTE&&(j=n.RGB8I),z===n.SHORT&&(j=n.RGB16I),z===n.INT&&(j=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),z===n.UNSIGNED_INT&&(j=n.RGBA32UI),z===n.BYTE&&(j=n.RGBA8I),z===n.SHORT&&(j=n.RGBA16I),z===n.INT&&(j=n.RGBA32I)),E===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),E===n.RGBA){const At=it?ko:pe.getTransfer(K);z===n.FLOAT&&(j=n.RGBA32F),z===n.HALF_FLOAT&&(j=n.RGBA16F),z===n.UNSIGNED_BYTE&&(j=At===Me?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(C,E){let z;return C?E===null||E===Bi||E===Rr?z=n.DEPTH24_STENCIL8:E===Pi?z=n.DEPTH32F_STENCIL8:E===Ar&&(z=n.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Bi||E===Rr?z=n.DEPTH_COMPONENT24:E===Pi?z=n.DEPTH_COMPONENT32F:E===Ar&&(z=n.DEPTH_COMPONENT16),z}function T(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==un&&C.minFilter!==Sn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function b(C){const E=C.target;E.removeEventListener("dispose",b),x(E),E.isVideoTexture&&h.delete(E)}function A(C){const E=C.target;E.removeEventListener("dispose",A),I(E)}function x(C){const E=i.get(C);if(E.__webglInit===void 0)return;const z=C.source,K=u.get(z);if(K){const it=K[E.__cacheKey];it.usedTimes--,it.usedTimes===0&&S(C),Object.keys(K).length===0&&u.delete(z)}i.remove(C)}function S(C){const E=i.get(C);n.deleteTexture(E.__webglTexture);const z=C.source,K=u.get(z);delete K[E.__cacheKey],r.memory.textures--}function I(C){const E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let it=0;it<E.__webglFramebuffer[K].length;it++)n.deleteFramebuffer(E.__webglFramebuffer[K][it]);else n.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)n.deleteFramebuffer(E.__webglFramebuffer[K]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=C.textures;for(let K=0,it=z.length;K<it;K++){const j=i.get(z[K]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),r.memory.textures--),i.remove(z[K])}i.remove(C)}let P=0;function N(){P=0}function L(){const C=P;return C>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),P+=1,C}function k(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function B(C,E){const z=i.get(C);if(C.isVideoTexture&&ge(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const K=C.image;if(K===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(z,C,E);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function V(C,E){const z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){Q(z,C,E);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function H(C,E){const z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){Q(z,C,E);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function et(C,E){const z=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){ut(z,C,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const tt={[Fc]:n.REPEAT,[ns]:n.CLAMP_TO_EDGE,[Oc]:n.MIRRORED_REPEAT},ht={[un]:n.NEAREST,[j_]:n.NEAREST_MIPMAP_NEAREST,[jr]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[Ul]:n.LINEAR_MIPMAP_NEAREST,[Ys]:n.LINEAR_MIPMAP_LINEAR},ot={[Q_]:n.NEVER,[sg]:n.ALWAYS,[tg]:n.LESS,[ih]:n.LEQUAL,[eg]:n.EQUAL,[sh]:n.GEQUAL,[ng]:n.GREATER,[ig]:n.NOTEQUAL};function lt(C,E){if(E.type===Pi&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Sn||E.magFilter===Ul||E.magFilter===jr||E.magFilter===Ys||E.minFilter===Sn||E.minFilter===Ul||E.minFilter===jr||E.minFilter===Ys)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,tt[E.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,tt[E.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,tt[E.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ht[E.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ht[E.minFilter]),E.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,ot[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===un||E.minFilter!==jr&&E.minFilter!==Ys||E.type===Pi&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Gt(C,E){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",b));const K=E.source;let it=u.get(K);it===void 0&&(it={},u.set(K,it));const j=k(E);if(j!==C.__cacheKey){it[j]===void 0&&(it[j]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,z=!0),it[j].usedTimes++;const At=it[C.__cacheKey];At!==void 0&&(it[C.__cacheKey].usedTimes--,At.usedTimes===0&&S(E)),C.__cacheKey=j,C.__webglTexture=it[j].texture}return z}function Se(C,E,z){return Math.floor(Math.floor(C/z)/E)}function Ie(C,E,z,K){const j=C.updateRanges;if(j.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,z,K,E.data);else{j.sort((at,ct)=>at.start-ct.start);let At=0;for(let at=1;at<j.length;at++){const ct=j[At],Rt=j[at],Dt=ct.start+ct.count,yt=Se(Rt.start,E.width,4),oe=Se(ct.start,E.width,4);Rt.start<=Dt+1&&yt===oe&&Se(Rt.start+Rt.count-1,E.width,4)===yt?ct.count=Math.max(ct.count,Rt.start+Rt.count-ct.start):(++At,j[At]=Rt)}j.length=At+1;const ft=n.getParameter(n.UNPACK_ROW_LENGTH),Ot=n.getParameter(n.UNPACK_SKIP_PIXELS),Vt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let at=0,ct=j.length;at<ct;at++){const Rt=j[at],Dt=Math.floor(Rt.start/4),yt=Math.ceil(Rt.count/4),oe=Dt%E.width,O=Math.floor(Dt/E.width),pt=yt,dt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,oe,O,pt,dt,z,K,E.data)}C.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ft),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ot),n.pixelStorei(n.UNPACK_SKIP_ROWS,Vt)}}function Q(C,E,z){let K=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=n.TEXTURE_3D);const it=Gt(C,E),j=E.source;e.bindTexture(K,C.__webglTexture,n.TEXTURE0+z);const At=i.get(j);if(j.version!==At.__version||it===!0){e.activeTexture(n.TEXTURE0+z);const ft=pe.getPrimaries(pe.workingColorSpace),Ot=E.colorSpace===bs?null:pe.getPrimaries(E.colorSpace),Vt=E.colorSpace===bs||ft===Ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let at=g(E.image,!1,s.maxTextureSize);at=Ce(E,at);const ct=a.convert(E.format,E.colorSpace),Rt=a.convert(E.type);let Dt=M(E.internalFormat,ct,Rt,E.colorSpace,E.isVideoTexture);lt(K,E);let yt;const oe=E.mipmaps,O=E.isVideoTexture!==!0,pt=At.__version===void 0||it===!0,dt=j.dataReady,bt=T(E,at);if(E.isDepthTexture)Dt=y(E.format===$s,E.type),pt&&(O?e.texStorage2D(n.TEXTURE_2D,1,Dt,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,Dt,at.width,at.height,0,ct,Rt,null));else if(E.isDataTexture)if(oe.length>0){O&&pt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,oe[0].width,oe[0].height);for(let rt=0,Z=oe.length;rt<Z;rt++)yt=oe[rt],O?dt&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,ct,Rt,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Dt,yt.width,yt.height,0,ct,Rt,yt.data);E.generateMipmaps=!1}else O?(pt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,at.width,at.height),dt&&Ie(E,at,ct,Rt)):e.texImage2D(n.TEXTURE_2D,0,Dt,at.width,at.height,0,ct,Rt,at.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){O&&pt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Dt,oe[0].width,oe[0].height,at.depth);for(let rt=0,Z=oe.length;rt<Z;rt++)if(yt=oe[rt],E.format!==yi)if(ct!==null)if(O){if(dt)if(E.layerUpdates.size>0){const Ct=Wu(yt.width,yt.height,E.format,E.type);for(const Zt of E.layerUpdates){const Pe=yt.data.subarray(Zt*Ct/yt.data.BYTES_PER_ELEMENT,(Zt+1)*Ct/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,Zt,yt.width,yt.height,1,ct,Pe)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,at.depth,ct,yt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Dt,yt.width,yt.height,at.depth,0,yt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?dt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,at.depth,ct,Rt,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Dt,yt.width,yt.height,at.depth,0,ct,Rt,yt.data)}else{O&&pt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,oe[0].width,oe[0].height);for(let rt=0,Z=oe.length;rt<Z;rt++)yt=oe[rt],E.format!==yi?ct!==null?O?dt&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,ct,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Dt,yt.width,yt.height,0,yt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?dt&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,ct,Rt,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Dt,yt.width,yt.height,0,ct,Rt,yt.data)}else if(E.isDataArrayTexture)if(O){if(pt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Dt,at.width,at.height,at.depth),dt)if(E.layerUpdates.size>0){const rt=Wu(at.width,at.height,E.format,E.type);for(const Z of E.layerUpdates){const Ct=at.data.subarray(Z*rt/at.data.BYTES_PER_ELEMENT,(Z+1)*rt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,at.width,at.height,1,ct,Rt,Ct)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,ct,Rt,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Dt,at.width,at.height,at.depth,0,ct,Rt,at.data);else if(E.isData3DTexture)O?(pt&&e.texStorage3D(n.TEXTURE_3D,bt,Dt,at.width,at.height,at.depth),dt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,ct,Rt,at.data)):e.texImage3D(n.TEXTURE_3D,0,Dt,at.width,at.height,at.depth,0,ct,Rt,at.data);else if(E.isFramebufferTexture){if(pt)if(O)e.texStorage2D(n.TEXTURE_2D,bt,Dt,at.width,at.height);else{let rt=at.width,Z=at.height;for(let Ct=0;Ct<bt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,Dt,rt,Z,0,ct,Rt,null),rt>>=1,Z>>=1}}else if(oe.length>0){if(O&&pt){const rt=Lt(oe[0]);e.texStorage2D(n.TEXTURE_2D,bt,Dt,rt.width,rt.height)}for(let rt=0,Z=oe.length;rt<Z;rt++)yt=oe[rt],O?dt&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,ct,Rt,yt):e.texImage2D(n.TEXTURE_2D,rt,Dt,ct,Rt,yt);E.generateMipmaps=!1}else if(O){if(pt){const rt=Lt(at);e.texStorage2D(n.TEXTURE_2D,bt,Dt,rt.width,rt.height)}dt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,Rt,at)}else e.texImage2D(n.TEXTURE_2D,0,Dt,ct,Rt,at);m(E)&&p(K),At.__version=j.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function ut(C,E,z){if(E.image.length!==6)return;const K=Gt(C,E),it=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+z);const j=i.get(it);if(it.version!==j.__version||K===!0){e.activeTexture(n.TEXTURE0+z);const At=pe.getPrimaries(pe.workingColorSpace),ft=E.colorSpace===bs?null:pe.getPrimaries(E.colorSpace),Ot=E.colorSpace===bs||At===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);const Vt=E.isCompressedTexture||E.image[0].isCompressedTexture,at=E.image[0]&&E.image[0].isDataTexture,ct=[];for(let Z=0;Z<6;Z++)!Vt&&!at?ct[Z]=g(E.image[Z],!0,s.maxCubemapSize):ct[Z]=at?E.image[Z].image:E.image[Z],ct[Z]=Ce(E,ct[Z]);const Rt=ct[0],Dt=a.convert(E.format,E.colorSpace),yt=a.convert(E.type),oe=M(E.internalFormat,Dt,yt,E.colorSpace),O=E.isVideoTexture!==!0,pt=j.__version===void 0||K===!0,dt=it.dataReady;let bt=T(E,Rt);lt(n.TEXTURE_CUBE_MAP,E);let rt;if(Vt){O&&pt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,oe,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){rt=ct[Z].mipmaps;for(let Ct=0;Ct<rt.length;Ct++){const Zt=rt[Ct];E.format!==yi?Dt!==null?O?dt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct,0,0,Zt.width,Zt.height,Dt,Zt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct,oe,Zt.width,Zt.height,0,Zt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct,0,0,Zt.width,Zt.height,Dt,yt,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct,oe,Zt.width,Zt.height,0,Dt,yt,Zt.data)}}}else{if(rt=E.mipmaps,O&&pt){rt.length>0&&bt++;const Z=Lt(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,oe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(at){O?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ct[Z].width,ct[Z].height,Dt,yt,ct[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,oe,ct[Z].width,ct[Z].height,0,Dt,yt,ct[Z].data);for(let Ct=0;Ct<rt.length;Ct++){const Pe=rt[Ct].image[Z].image;O?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct+1,0,0,Pe.width,Pe.height,Dt,yt,Pe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct+1,oe,Pe.width,Pe.height,0,Dt,yt,Pe.data)}}else{O?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Dt,yt,ct[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,oe,Dt,yt,ct[Z]);for(let Ct=0;Ct<rt.length;Ct++){const Zt=rt[Ct];O?dt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct+1,0,0,Dt,yt,Zt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ct+1,oe,Dt,yt,Zt.image[Z])}}}m(E)&&p(n.TEXTURE_CUBE_MAP),j.__version=it.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function mt(C,E,z,K,it,j){const At=a.convert(z.format,z.colorSpace),ft=a.convert(z.type),Ot=M(z.internalFormat,At,ft,z.colorSpace),Vt=i.get(E),at=i.get(z);if(at.__renderTarget=E,!Vt.__hasExternalTextures){const ct=Math.max(1,E.width>>j),Rt=Math.max(1,E.height>>j);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,j,Ot,ct,Rt,E.depth,0,At,ft,null):e.texImage2D(it,j,Ot,ct,Rt,0,At,ft,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),qe(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,it,at.__webglTexture,0,U(E)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,it,at.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(C,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,C),E.depthBuffer){const K=E.depthTexture,it=K&&K.isDepthTexture?K.type:null,j=y(E.stencilBuffer,it),At=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qe(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,U(E),j,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,U(E),j,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,j,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,At,n.RENDERBUFFER,C)}else{const K=E.textures;for(let it=0;it<K.length;it++){const j=K[it],At=a.convert(j.format,j.colorSpace),ft=a.convert(j.type),Ot=M(j.internalFormat,At,ft,j.colorSpace);qe(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,U(E),Ot,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,U(E),Ot,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Ot,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function kt(C,E,z){const K=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(E.depthTexture);if(it.__renderTarget=E,(!it.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K){if(it.__webglInit===void 0&&(it.__webglInit=!0,E.depthTexture.addEventListener("dispose",b)),it.__webglTexture===void 0){it.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),lt(n.TEXTURE_CUBE_MAP,E.depthTexture);const Vt=a.convert(E.depthTexture.format),at=a.convert(E.depthTexture.type);let ct;E.depthTexture.format===os?ct=n.DEPTH_COMPONENT24:E.depthTexture.format===$s&&(ct=n.DEPTH24_STENCIL8);for(let Rt=0;Rt<6;Rt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0,ct,E.width,E.height,0,Vt,at,null)}}else B(E.depthTexture,0);const j=it.__webglTexture,At=U(E),ft=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,Ot=E.depthTexture.format===$s?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===os)qe(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ot,ft,j,0,At):n.framebufferTexture2D(n.FRAMEBUFFER,Ot,ft,j,0);else if(E.depthTexture.format===$s)qe(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ot,ft,j,0,At):n.framebufferTexture2D(n.FRAMEBUFFER,Ot,ft,j,0);else throw new Error("Unknown depthTexture format")}function $t(C){const E=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const it=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",it)};K.addEventListener("dispose",it),E.__depthDisposeCallback=it}E.__boundDepthTexture=K}if(C.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let K=0;K<6;K++)kt(E.__webglFramebuffer[K],C,K);else{const K=C.texture.mipmaps;K&&K.length>0?kt(E.__webglFramebuffer[0],C,0):kt(E.__webglFramebuffer,C,0)}else if(z){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=n.createRenderbuffer(),ee(E.__webglDepthbuffer[K],C,!1);else{const it=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,j)}}else{const K=C.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),ee(E.__webglDepthbuffer,C,!1);else{const it=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,j)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function en(C,E,z){const K=i.get(C);E!==void 0&&mt(K.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&$t(C)}function ue(C){const E=C.texture,z=i.get(C),K=i.get(E);C.addEventListener("dispose",A);const it=C.textures,j=C.isWebGLCubeRenderTarget===!0,At=it.length>1;if(At||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=E.version,r.memory.textures++),j){z.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[ft]=[];for(let Ot=0;Ot<E.mipmaps.length;Ot++)z.__webglFramebuffer[ft][Ot]=n.createFramebuffer()}else z.__webglFramebuffer[ft]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let ft=0;ft<E.mipmaps.length;ft++)z.__webglFramebuffer[ft]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(At)for(let ft=0,Ot=it.length;ft<Ot;ft++){const Vt=i.get(it[ft]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=n.createTexture(),r.memory.textures++)}if(C.samples>0&&qe(C)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ft=0;ft<it.length;ft++){const Ot=it[ft];z.__webglColorRenderbuffer[ft]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ft]);const Vt=a.convert(Ot.format,Ot.colorSpace),at=a.convert(Ot.type),ct=M(Ot.internalFormat,Vt,at,Ot.colorSpace,C.isXRRenderTarget===!0),Rt=U(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,ct,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,z.__webglColorRenderbuffer[ft])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),ee(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),lt(n.TEXTURE_CUBE_MAP,E);for(let ft=0;ft<6;ft++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ot=0;Ot<E.mipmaps.length;Ot++)mt(z.__webglFramebuffer[ft][Ot],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,Ot);else mt(z.__webglFramebuffer[ft],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);m(E)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ft=0,Ot=it.length;ft<Ot;ft++){const Vt=it[ft],at=i.get(Vt);let ct=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ct=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,at.__webglTexture),lt(ct,Vt),mt(z.__webglFramebuffer,C,Vt,n.COLOR_ATTACHMENT0+ft,ct,0),m(Vt)&&p(ct)}e.unbindTexture()}else{let ft=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ft=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ft,K.__webglTexture),lt(ft,E),E.mipmaps&&E.mipmaps.length>0)for(let Ot=0;Ot<E.mipmaps.length;Ot++)mt(z.__webglFramebuffer[Ot],C,E,n.COLOR_ATTACHMENT0,ft,Ot);else mt(z.__webglFramebuffer,C,E,n.COLOR_ATTACHMENT0,ft,0);m(E)&&p(ft),e.unbindTexture()}C.depthBuffer&&$t(C)}function xe(C){const E=C.textures;for(let z=0,K=E.length;z<K;z++){const it=E[z];if(m(it)){const j=v(C),At=i.get(it).__webglTexture;e.bindTexture(j,At),p(j),e.unbindTexture()}}}const Te=[],re=[];function Ve(C){if(C.samples>0){if(qe(C)===!1){const E=C.textures,z=C.width,K=C.height;let it=n.COLOR_BUFFER_BIT;const j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,At=i.get(C),ft=E.length>1;if(ft)for(let Vt=0;Vt<E.length;Vt++)e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Vt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Vt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);const Ot=C.texture.mipmaps;Ot&&Ot.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Vt=0;Vt<E.length;Vt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),ft){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,At.__webglColorRenderbuffer[Vt]);const at=i.get(E[Vt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,at,0)}n.blitFramebuffer(0,0,z,K,0,0,z,K,it,n.NEAREST),d===!0&&(Te.length=0,re.length=0,Te.push(n.COLOR_ATTACHMENT0+Vt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Te.push(j),re.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ft)for(let Vt=0;Vt<E.length;Vt++){e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Vt,n.RENDERBUFFER,At.__webglColorRenderbuffer[Vt]);const at=i.get(E[Vt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Vt,n.TEXTURE_2D,at,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&d){const E=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function U(C){return Math.min(s.maxSamples,C.samples)}function qe(C){const E=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ge(C){const E=r.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function Ce(C,E){const z=C.colorSpace,K=C.format,it=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Ya&&z!==bs&&(pe.getTransfer(z)===Me?(K!==yi||it!==Zn)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",z)),E}function Lt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=H,this.setTextureCube=et,this.rebindTextures=en,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function NS(n,t){function e(i,s=bs){let a;const r=pe.getTransfer(s);if(i===Zn)return n.UNSIGNED_BYTE;if(i===Jd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===pp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hp)return n.BYTE;if(i===up)return n.SHORT;if(i===Ar)return n.UNSIGNED_SHORT;if(i===Kd)return n.INT;if(i===Bi)return n.UNSIGNED_INT;if(i===Pi)return n.FLOAT;if(i===Kn)return n.HALF_FLOAT;if(i===mp)return n.ALPHA;if(i===_p)return n.RGB;if(i===yi)return n.RGBA;if(i===os)return n.DEPTH_COMPONENT;if(i===$s)return n.DEPTH_STENCIL;if(i===gp)return n.RED;if(i===th)return n.RED_INTEGER;if(i===qa)return n.RG;if(i===eh)return n.RG_INTEGER;if(i===nh)return n.RGBA_INTEGER;if(i===wo||i===To||i===Ao||i===Ro)if(r===Me)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===wo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===To)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ao)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ro)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===wo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===To)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ao)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ro)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bc||i===zc||i===Hc||i===Gc)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Bc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Hc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===kc||i===Vc||i===Wc||i===Xc||i===qc||i===Yc||i===$c)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===kc||i===Vc)return r===Me?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Wc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xc)return a.COMPRESSED_R11_EAC;if(i===qc)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Yc)return a.COMPRESSED_RG11_EAC;if(i===$c)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zc||i===jc||i===Kc||i===Jc||i===Qc||i===td||i===ed||i===nd||i===id||i===sd||i===ad||i===rd||i===od||i===ld)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Zc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Kc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qc)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===td)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ed)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nd)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===id)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sd)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ad)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rd)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===od)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ld)return r===Me?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===cd||i===dd||i===hd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===cd)return r===Me?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===dd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ud||i===fd||i===pd||i===md)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===ud)return a.COMPRESSED_RED_RGTC1_EXT;if(i===fd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===md)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const FS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OS=`
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

}`;class BS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Tp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new En({vertexShader:FS,fragmentShader:OS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new w(new Hi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zS extends sa{constructor(t,e){super();const i=this;let s=null,a=1,r=null,o="local-floor",d=1,c=null,h=null,l=null,u=null,f=null,_=null;const g=typeof XRWebGLBinding<"u",m=new BS,p={},v=e.getContextAttributes();let M=null,y=null;const T=[],b=[],A=new Pt;let x=null;const S=new ii;S.viewport=new Ge;const I=new ii;I.viewport=new Ge;const P=[S,I],N=new $g;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ut=T[Q];return ut===void 0&&(ut=new Gl,T[Q]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(Q){let ut=T[Q];return ut===void 0&&(ut=new Gl,T[Q]=ut),ut.getGripSpace()},this.getHand=function(Q){let ut=T[Q];return ut===void 0&&(ut=new Gl,T[Q]=ut),ut.getHandSpace()};function B(Q){const ut=b.indexOf(Q.inputSource);if(ut===-1)return;const mt=T[ut];mt!==void 0&&(mt.update(Q.inputSource,Q.frame,c||r),mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",H);for(let Q=0;Q<T.length;Q++){const ut=b[Q];ut!==null&&(b[Q]=null,T[Q].disconnect(ut))}L=null,k=null,m.reset();for(const Q in p)delete p[Q];t.setRenderTarget(M),f=null,u=null,l=null,s=null,y=null,Ie.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){a=Q,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return l===null&&g&&(l=new XRWebGLBinding(s,e)),l},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,ee=null,kt=null;v.depth&&(kt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=v.stencil?$s:os,ee=v.stencil?Rr:Bi);const $t={colorFormat:e.RGBA8,depthFormat:kt,scaleFactor:a};l=this.getBinding(),u=l.createProjectionLayer($t),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new zn(u.textureWidth,u.textureHeight,{format:yi,type:Zn,depthTexture:new Pr(u.textureWidth,u.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new zn(f.framebufferWidth,f.framebufferHeight,{format:yi,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(d),c=null,r=await s.requestReferenceSpace(o),Ie.setContext(s),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Q){for(let ut=0;ut<Q.removed.length;ut++){const mt=Q.removed[ut],ee=b.indexOf(mt);ee>=0&&(b[ee]=null,T[ee].disconnect(mt))}for(let ut=0;ut<Q.added.length;ut++){const mt=Q.added[ut];let ee=b.indexOf(mt);if(ee===-1){for(let $t=0;$t<T.length;$t++)if($t>=b.length){b.push(mt),ee=$t;break}else if(b[$t]===null){b[$t]=mt,ee=$t;break}if(ee===-1)break}const kt=T[ee];kt&&kt.connect(mt)}}const et=new F,tt=new F;function ht(Q,ut,mt){et.setFromMatrixPosition(ut.matrixWorld),tt.setFromMatrixPosition(mt.matrixWorld);const ee=et.distanceTo(tt),kt=ut.projectionMatrix.elements,$t=mt.projectionMatrix.elements,en=kt[14]/(kt[10]-1),ue=kt[14]/(kt[10]+1),xe=(kt[9]+1)/kt[5],Te=(kt[9]-1)/kt[5],re=(kt[8]-1)/kt[0],Ve=($t[8]+1)/$t[0],U=en*re,qe=en*Ve,ge=ee/(-re+Ve),Ce=ge*-re;if(ut.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ce),Q.translateZ(ge),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),kt[10]===-1)Q.projectionMatrix.copy(ut.projectionMatrix),Q.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Lt=en+ge,C=ue+ge,E=U-Ce,z=qe+(ee-Ce),K=xe*ue/C*Lt,it=Te*ue/C*Lt;Q.projectionMatrix.makePerspective(E,z,K,it,Lt,C),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ot(Q,ut){ut===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ut.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ut=Q.near,mt=Q.far;m.texture!==null&&(m.depthNear>0&&(ut=m.depthNear),m.depthFar>0&&(mt=m.depthFar)),N.near=I.near=S.near=ut,N.far=I.far=S.far=mt,(L!==N.near||k!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),L=N.near,k=N.far),N.layers.mask=Q.layers.mask|6,S.layers.mask=N.layers.mask&-5,I.layers.mask=N.layers.mask&-3;const ee=Q.parent,kt=N.cameras;ot(N,ee);for(let $t=0;$t<kt.length;$t++)ot(kt[$t],ee);kt.length===2?ht(N,S,I):N.projectionMatrix.copy(S.projectionMatrix),lt(Q,N,ee)};function lt(Q,ut,mt){mt===null?Q.matrix.copy(ut.matrixWorld):(Q.matrix.copy(mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ut.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ut.projectionMatrix),Q.projectionMatrixInverse.copy(ut.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=_d*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&f===null))return d},this.setFoveation=function(Q){d=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(Q){return p[Q]};let Gt=null;function Se(Q,ut){if(h=ut.getViewerPose(c||r),_=ut,h!==null){const mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ee=!1;mt.length!==N.cameras.length&&(N.cameras.length=0,ee=!0);for(let ue=0;ue<mt.length;ue++){const xe=mt[ue];let Te=null;if(f!==null)Te=f.getViewport(xe);else{const Ve=l.getViewSubImage(u,xe);Te=Ve.viewport,ue===0&&(t.setRenderTargetTextures(y,Ve.colorTexture,Ve.depthStencilTexture),t.setRenderTarget(y))}let re=P[ue];re===void 0&&(re=new ii,re.layers.enable(ue),re.viewport=new Ge,P[ue]=re),re.matrix.fromArray(xe.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(xe.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(Te.x,Te.y,Te.width,Te.height),ue===0&&(N.matrix.copy(re.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),ee===!0&&N.cameras.push(re)}const kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){l=i.getBinding();const ue=l.getDepthInformation(mt[0]);ue&&ue.isValid&&ue.texture&&m.init(ue,s.renderState)}if(kt&&kt.includes("camera-access")&&g){t.state.unbindTexture(),l=i.getBinding();for(let ue=0;ue<mt.length;ue++){const xe=mt[ue].camera;if(xe){let Te=p[xe];Te||(Te=new Tp,p[xe]=Te);const re=l.getCameraImage(xe);Te.sourceTexture=re}}}}for(let mt=0;mt<T.length;mt++){const ee=b[mt],kt=T[mt];ee!==null&&kt!==void 0&&kt.update(ee,ut,c||r)}Gt&&Gt(Q,ut),ut.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ut}),_=null}const Ie=new Dp;Ie.setAnimationLoop(Se),this.setAnimationLoop=function(Q){Gt=Q},this.dispose=function(){}}}const Vs=new zi,HS=new Fe;function GS(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ap(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,M,y){p.isMeshBasicMaterial?a(m,p):p.isMeshLambertMaterial?(a(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(m,p),l(m,p)):p.isMeshPhongMaterial?(a(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(a(m,p),_(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),g(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?d(m,p,v,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,Vs.copy(y),Vs.x*=-1,Vs.y*=-1,Vs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Vs.y*=-1,Vs.z*=-1),m.envMapRotation.value.setFromMatrix4(HS.makeRotationFromEuler(Vs)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function d(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function l(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function kS(n,t,e,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(v,M){const y=M.program;i.uniformBlockBinding(v,y)}function c(v,M){let y=s[v.id];y===void 0&&(_(v),y=h(v),s[v.id]=y,v.addEventListener("dispose",m));const T=M.program;i.updateUBOMapping(v,T);const b=t.render.frame;a[v.id]!==b&&(u(v),a[v.id]=b)}function h(v){const M=l();v.__bindingPointIndex=M;const y=n.createBuffer(),T=v.__size,b=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,T,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,y),y}function l(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const M=s[v.id],y=v.uniforms,T=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let b=0,A=y.length;b<A;b++){const x=Array.isArray(y[b])?y[b]:[y[b]];for(let S=0,I=x.length;S<I;S++){const P=x[S];if(f(P,b,S,T)===!0){const N=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let B=0;B<L.length;B++){const V=L[B],H=g(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,N+k,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,k),k+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,M,y,T){const b=v.value,A=M+"_"+y;if(T[A]===void 0)return typeof b=="number"||typeof b=="boolean"?T[A]=b:T[A]=b.clone(),!0;{const x=T[A];if(typeof b=="number"||typeof b=="boolean"){if(x!==b)return T[A]=b,!0}else if(x.equals(b)===!1)return x.copy(b),!0}return!1}function _(v){const M=v.uniforms;let y=0;const T=16;for(let A=0,x=M.length;A<x;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let I=0,P=S.length;I<P;I++){const N=S[I],L=Array.isArray(N.value)?N.value:[N.value];for(let k=0,B=L.length;k<B;k++){const V=L[k],H=g(V),et=y%T,tt=et%H.boundary,ht=et+tt;y+=tt,ht!==0&&T-ht<H.storage&&(y+=T-ht),N.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=H.storage}}}const b=y%T;return b>0&&(y+=T-b),v.__size=y,v.__cache={},this}function g(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Xt("WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const y=r.indexOf(M.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function p(){for(const v in s)n.deleteBuffer(s[v]);r=[],s={},a={}}return{bind:d,update:c,dispose:p}}const VS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wi=null;function WS(){return wi===null&&(wi=new Pg(VS,16,16,qa,Kn),wi.name="DFG_LUT",wi.minFilter=Sn,wi.magFilter=Sn,wi.wrapS=ns,wi.wrapT=ns,wi.generateMipmaps=!1,wi.needsUpdate=!0),wi}class XS{constructor(t={}){const{canvas:e=rg(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:l=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Zn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;const g=f,m=new Set([nh,eh,th]),p=new Set([Zn,Bi,Ar,Rr,Jd,Qd]),v=new Uint32Array(4),M=new Int32Array(4);let y=null,T=null;const b=[],A=[];let x=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let I=!1;this._outputColorSpace=ei;let P=0,N=0,L=null,k=-1,B=null;const V=new Ge,H=new Ge;let et=null;const tt=new Bt(0);let ht=0,ot=e.width,lt=e.height,Gt=1,Se=null,Ie=null;const Q=new Ge(0,0,ot,lt),ut=new Ge(0,0,ot,lt);let mt=!1;const ee=new lh;let kt=!1,$t=!1;const en=new Fe,ue=new F,xe=new Ge,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function Ve(){return L===null?Gt:1}let U=i;function qe(R,G){return e.getContext(R,G)}try{const R={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:d,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:l};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zd}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",Pe,!1),U===null){const G="webgl2";if(U=qe(G,R),U===null)throw qe(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw fe("WebGLRenderer: "+R.message),R}let ge,Ce,Lt,C,E,z,K,it,j,At,ft,Ot,Vt,at,ct,Rt,Dt,yt,oe,O,pt,dt,bt;function rt(){ge=new XM(U),ge.init(),pt=new NS(U,ge),Ce=new OM(U,ge,t,pt),Lt=new LS(U,ge),Ce.reversedDepthBuffer&&u&&Lt.buffers.depth.setReversed(!0),C=new $M(U),E=new vS,z=new US(U,ge,Lt,E,Ce,pt,C),K=new WM(S),it=new Qg(U),dt=new NM(U,it),j=new qM(U,it,C,dt),At=new jM(U,j,it,dt,C),yt=new ZM(U,Ce,z),ct=new BM(E),ft=new xS(S,K,ge,Ce,dt,ct),Ot=new GS(S,E),Vt=new yS,at=new AS(ge),Dt=new UM(S,K,Lt,At,_,d),Rt=new IS(S,At,Ce),bt=new kS(U,C,Ce,Lt),oe=new FM(U,ge,C),O=new YM(U,ge,C),C.programs=ft.programs,S.capabilities=Ce,S.extensions=ge,S.properties=E,S.renderLists=Vt,S.shadowMap=Rt,S.state=Lt,S.info=C}rt(),g!==Zn&&(x=new JM(g,e.width,e.height,s,a));const Z=new zS(S,U);this.xr=Z,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=ge.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ge.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Gt},this.setPixelRatio=function(R){R!==void 0&&(Gt=R,this.setSize(ot,lt,!1))},this.getSize=function(R){return R.set(ot,lt)},this.setSize=function(R,G,q=!0){if(Z.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=R,lt=G,e.width=Math.floor(R*Gt),e.height=Math.floor(G*Gt),q===!0&&(e.style.width=R+"px",e.style.height=G+"px"),x!==null&&x.setSize(e.width,e.height),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(ot*Gt,lt*Gt).floor()},this.setDrawingBufferSize=function(R,G,q){ot=R,lt=G,Gt=q,e.width=Math.floor(R*q),e.height=Math.floor(G*q),this.setViewport(0,0,R,G)},this.setEffects=function(R){if(g===Zn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let G=0;G<R.length;G++)if(R[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(V)},this.getViewport=function(R){return R.copy(Q)},this.setViewport=function(R,G,q,X){R.isVector4?Q.set(R.x,R.y,R.z,R.w):Q.set(R,G,q,X),Lt.viewport(V.copy(Q).multiplyScalar(Gt).round())},this.getScissor=function(R){return R.copy(ut)},this.setScissor=function(R,G,q,X){R.isVector4?ut.set(R.x,R.y,R.z,R.w):ut.set(R,G,q,X),Lt.scissor(H.copy(ut).multiplyScalar(Gt).round())},this.getScissorTest=function(){return mt},this.setScissorTest=function(R){Lt.setScissorTest(mt=R)},this.setOpaqueSort=function(R){Se=R},this.setTransparentSort=function(R){Ie=R},this.getClearColor=function(R){return R.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(R=!0,G=!0,q=!0){let X=0;if(R){let W=!1;if(L!==null){const gt=L.texture.format;W=m.has(gt)}if(W){const gt=L.texture.type,St=p.has(gt),xt=Dt.getClearColor(),It=Dt.getClearAlpha(),Nt=xt.r,te=xt.g,le=xt.b;St?(v[0]=Nt,v[1]=te,v[2]=le,v[3]=It,U.clearBufferuiv(U.COLOR,0,v)):(M[0]=Nt,M[1]=te,M[2]=le,M[3]=It,U.clearBufferiv(U.COLOR,0,M))}else X|=U.COLOR_BUFFER_BIT}G&&(X|=U.DEPTH_BUFFER_BIT),q&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",Pe,!1),Dt.dispose(),Vt.dispose(),at.dispose(),E.dispose(),K.dispose(),At.dispose(),dt.dispose(),bt.dispose(),ft.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Dh),Z.removeEventListener("sessionend",Ih),Fs.stop()};function Ct(R){R.preventDefault(),gu("WebGLRenderer: Context Lost."),I=!0}function Zt(){gu("WebGLRenderer: Context Restored."),I=!1;const R=C.autoReset,G=Rt.enabled,q=Rt.autoUpdate,X=Rt.needsUpdate,W=Rt.type;rt(),C.autoReset=R,Rt.enabled=G,Rt.autoUpdate=q,Rt.needsUpdate=X,Rt.type=W}function Pe(R){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ve(R){const G=R.target;G.removeEventListener("dispose",ve),Vi(G)}function Vi(R){Wi(R),E.remove(R)}function Wi(R){const G=E.get(R).programs;G!==void 0&&(G.forEach(function(q){ft.releaseProgram(q)}),R.isShaderMaterial&&ft.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,q,X,W,gt){G===null&&(G=Te);const St=W.isMesh&&W.matrixWorld.determinant()<0,xt=Rm(R,G,q,X,W);Lt.setMaterial(X,St);let It=q.index,Nt=1;if(X.wireframe===!0){if(It=j.getWireframeAttribute(q),It===void 0)return;Nt=2}const te=q.drawRange,le=q.attributes.position;let Ft=te.start*Nt,Ee=(te.start+te.count)*Nt;gt!==null&&(Ft=Math.max(Ft,gt.start*Nt),Ee=Math.min(Ee,(gt.start+gt.count)*Nt)),It!==null?(Ft=Math.max(Ft,0),Ee=Math.min(Ee,It.count)):le!=null&&(Ft=Math.max(Ft,0),Ee=Math.min(Ee,le.count));const We=Ee-Ft;if(We<0||We===1/0)return;dt.setup(W,X,xt,q,It);let ze,be=oe;if(It!==null&&(ze=it.get(It),be=O,be.setIndex(ze)),W.isMesh)X.wireframe===!0?(Lt.setLineWidth(X.wireframeLinewidth*Ve()),be.setMode(U.LINES)):be.setMode(U.TRIANGLES);else if(W.isLine){let _n=X.linewidth;_n===void 0&&(_n=1),Lt.setLineWidth(_n*Ve()),W.isLineSegments?be.setMode(U.LINES):W.isLineLoop?be.setMode(U.LINE_LOOP):be.setMode(U.LINE_STRIP)}else W.isPoints?be.setMode(U.POINTS):W.isSprite&&be.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Wo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),be.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))be.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const _n=W._multiDrawStarts,Ut=W._multiDrawCounts,Gn=W._multiDrawCount,me=It?it.get(It).bytesPerElement:1,ri=E.get(X).currentProgram.getUniforms();for(let Ei=0;Ei<Gn;Ei++)ri.setValue(U,"_gl_DrawID",Ei),be.render(_n[Ei]/me,Ut[Ei])}else if(W.isInstancedMesh)be.renderInstances(Ft,We,W.count);else if(q.isInstancedBufferGeometry){const _n=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ut=Math.min(q.instanceCount,_n);be.renderInstances(Ft,We,Ut)}else be.render(Ft,We)};function Ph(R,G,q){R.transparent===!0&&R.side===$n&&R.forceSinglePass===!1?(R.side=Bn,R.needsUpdate=!0,$r(R,G,q),R.side=Ps,R.needsUpdate=!0,$r(R,G,q),R.side=$n):$r(R,G,q)}this.compile=function(R,G,q=null){q===null&&(q=R),T=at.get(q),T.init(G),A.push(T),q.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),R!==q&&R.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights();const X=new Set;return R.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const gt=W.material;if(gt)if(Array.isArray(gt))for(let St=0;St<gt.length;St++){const xt=gt[St];Ph(xt,q,W),X.add(xt)}else Ph(gt,q,W),X.add(gt)}),T=A.pop(),X},this.compileAsync=function(R,G,q=null){const X=this.compile(R,G,q);return new Promise(W=>{function gt(){if(X.forEach(function(St){E.get(St).currentProgram.isReady()&&X.delete(St)}),X.size===0){W(R);return}setTimeout(gt,10)}ge.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Al=null;function Am(R){Al&&Al(R)}function Dh(){Fs.stop()}function Ih(){Fs.start()}const Fs=new Dp;Fs.setAnimationLoop(Am),typeof self<"u"&&Fs.setContext(self),this.setAnimationLoop=function(R){Al=R,Z.setAnimationLoop(R),R===null?Fs.stop():Fs.start()},Z.addEventListener("sessionstart",Dh),Z.addEventListener("sessionend",Ih),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;const q=Z.enabled===!0&&Z.isPresenting===!0,X=x!==null&&(L===null||q)&&x.begin(S,L);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(G),G=Z.getCamera()),R.isScene===!0&&R.onBeforeRender(S,R,G,L),T=at.get(R,A.length),T.init(G),A.push(T),en.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ee.setFromProjectionMatrix(en,Di,G.reversedDepth),$t=this.localClippingEnabled,kt=ct.init(this.clippingPlanes,$t),y=Vt.get(R,b.length),y.init(),b.push(y),Z.enabled===!0&&Z.isPresenting===!0){const St=S.xr.getDepthSensingMesh();St!==null&&Rl(St,G,-1/0,S.sortObjects)}Rl(R,G,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(Se,Ie),re=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,re&&Dt.addToRenderList(y,R),this.info.render.frame++,kt===!0&&ct.beginShadows();const W=T.state.shadowsArray;if(Rt.render(W,R,G),kt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset(),(X&&x.hasRenderPass())===!1){const St=y.opaque,xt=y.transmissive;if(T.setupLights(),G.isArrayCamera){const It=G.cameras;if(xt.length>0)for(let Nt=0,te=It.length;Nt<te;Nt++){const le=It[Nt];Uh(St,xt,R,le)}re&&Dt.render(R);for(let Nt=0,te=It.length;Nt<te;Nt++){const le=It[Nt];Lh(y,R,le,le.viewport)}}else xt.length>0&&Uh(St,xt,R,G),re&&Dt.render(R),Lh(y,R,G)}L!==null&&N===0&&(z.updateMultisampleRenderTarget(L),z.updateRenderTargetMipmap(L)),X&&x.end(S),R.isScene===!0&&R.onAfterRender(S,R,G),dt.resetDefaultState(),k=-1,B=null,A.pop(),A.length>0?(T=A[A.length-1],kt===!0&&ct.setGlobalState(S.clippingPlanes,T.state.camera)):T=null,b.pop(),b.length>0?y=b[b.length-1]:y=null};function Rl(R,G,q,X){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)T.pushLight(R),R.castShadow&&T.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ee.intersectsSprite(R)){X&&xe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(en);const St=At.update(R),xt=R.material;xt.visible&&y.push(R,St,xt,q,xe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ee.intersectsObject(R))){const St=At.update(R),xt=R.material;if(X&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),xe.copy(R.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),xe.copy(St.boundingSphere.center)),xe.applyMatrix4(R.matrixWorld).applyMatrix4(en)),Array.isArray(xt)){const It=St.groups;for(let Nt=0,te=It.length;Nt<te;Nt++){const le=It[Nt],Ft=xt[le.materialIndex];Ft&&Ft.visible&&y.push(R,St,Ft,q,xe.z,le)}}else xt.visible&&y.push(R,St,xt,q,xe.z,null)}}const gt=R.children;for(let St=0,xt=gt.length;St<xt;St++)Rl(gt[St],G,q,X)}function Lh(R,G,q,X){const{opaque:W,transmissive:gt,transparent:St}=R;T.setupLightsView(q),kt===!0&&ct.setGlobalState(S.clippingPlanes,q),X&&Lt.viewport(V.copy(X)),W.length>0&&Yr(W,G,q),gt.length>0&&Yr(gt,G,q),St.length>0&&Yr(St,G,q),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Uh(R,G,q,X){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[X.id]===void 0){const Ft=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[X.id]=new zn(1,1,{generateMipmaps:!0,type:Ft?Kn:Zn,minFilter:Ys,samples:Math.max(4,Ce.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace})}const gt=T.state.transmissionRenderTarget[X.id],St=X.viewport||V;gt.setSize(St.z*S.transmissionResolutionScale,St.w*S.transmissionResolutionScale);const xt=S.getRenderTarget(),It=S.getActiveCubeFace(),Nt=S.getActiveMipmapLevel();S.setRenderTarget(gt),S.getClearColor(tt),ht=S.getClearAlpha(),ht<1&&S.setClearColor(16777215,.5),S.clear(),re&&Dt.render(q);const te=S.toneMapping;S.toneMapping=Ui;const le=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),T.setupLightsView(X),kt===!0&&ct.setGlobalState(S.clippingPlanes,X),Yr(R,q,X),z.updateMultisampleRenderTarget(gt),z.updateRenderTargetMipmap(gt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Ee=0,We=G.length;Ee<We;Ee++){const ze=G[Ee],{object:be,geometry:_n,material:Ut,group:Gn}=ze;if(Ut.side===$n&&be.layers.test(X.layers)){const me=Ut.side;Ut.side=Bn,Ut.needsUpdate=!0,Nh(be,q,X,_n,Ut,Gn),Ut.side=me,Ut.needsUpdate=!0,Ft=!0}}Ft===!0&&(z.updateMultisampleRenderTarget(gt),z.updateRenderTargetMipmap(gt))}S.setRenderTarget(xt,It,Nt),S.setClearColor(tt,ht),le!==void 0&&(X.viewport=le),S.toneMapping=te}function Yr(R,G,q){const X=G.isScene===!0?G.overrideMaterial:null;for(let W=0,gt=R.length;W<gt;W++){const St=R[W],{object:xt,geometry:It,group:Nt}=St;let te=St.material;te.allowOverride===!0&&X!==null&&(te=X),xt.layers.test(q.layers)&&Nh(xt,G,q,It,te,Nt)}}function Nh(R,G,q,X,W,gt){R.onBeforeRender(S,G,q,X,W,gt),R.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),W.onBeforeRender(S,G,q,X,R,gt),W.transparent===!0&&W.side===$n&&W.forceSinglePass===!1?(W.side=Bn,W.needsUpdate=!0,S.renderBufferDirect(q,G,X,W,R,gt),W.side=Ps,W.needsUpdate=!0,S.renderBufferDirect(q,G,X,W,R,gt),W.side=$n):S.renderBufferDirect(q,G,X,W,R,gt),R.onAfterRender(S,G,q,X,W,gt)}function $r(R,G,q){G.isScene!==!0&&(G=Te);const X=E.get(R),W=T.state.lights,gt=T.state.shadowsArray,St=W.state.version,xt=ft.getParameters(R,W.state,gt,G,q),It=ft.getProgramCacheKey(xt);let Nt=X.programs;X.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?G.environment:null,X.fog=G.fog;const te=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;X.envMap=K.get(R.envMap||X.environment,te),X.envMapRotation=X.environment!==null&&R.envMap===null?G.environmentRotation:R.envMapRotation,Nt===void 0&&(R.addEventListener("dispose",ve),Nt=new Map,X.programs=Nt);let le=Nt.get(It);if(le!==void 0){if(X.currentProgram===le&&X.lightsStateVersion===St)return Oh(R,xt),le}else xt.uniforms=ft.getUniforms(R),R.onBeforeCompile(xt,S),le=ft.acquireProgram(xt,It),Nt.set(It,le),X.uniforms=xt.uniforms;const Ft=X.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ft.clippingPlanes=ct.uniform),Oh(R,xt),X.needsLights=Pm(R),X.lightsStateVersion=St,X.needsLights&&(Ft.ambientLightColor.value=W.state.ambient,Ft.lightProbe.value=W.state.probe,Ft.directionalLights.value=W.state.directional,Ft.directionalLightShadows.value=W.state.directionalShadow,Ft.spotLights.value=W.state.spot,Ft.spotLightShadows.value=W.state.spotShadow,Ft.rectAreaLights.value=W.state.rectArea,Ft.ltc_1.value=W.state.rectAreaLTC1,Ft.ltc_2.value=W.state.rectAreaLTC2,Ft.pointLights.value=W.state.point,Ft.pointLightShadows.value=W.state.pointShadow,Ft.hemisphereLights.value=W.state.hemi,Ft.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ft.spotLightMatrix.value=W.state.spotLightMatrix,Ft.spotLightMap.value=W.state.spotLightMap,Ft.pointShadowMatrix.value=W.state.pointShadowMatrix),X.currentProgram=le,X.uniformsList=null,le}function Fh(R){if(R.uniformsList===null){const G=R.currentProgram.getUniforms();R.uniformsList=Po.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function Oh(R,G){const q=E.get(R);q.outputColorSpace=G.outputColorSpace,q.batching=G.batching,q.batchingColor=G.batchingColor,q.instancing=G.instancing,q.instancingColor=G.instancingColor,q.instancingMorph=G.instancingMorph,q.skinning=G.skinning,q.morphTargets=G.morphTargets,q.morphNormals=G.morphNormals,q.morphColors=G.morphColors,q.morphTargetsCount=G.morphTargetsCount,q.numClippingPlanes=G.numClippingPlanes,q.numIntersection=G.numClipIntersection,q.vertexAlphas=G.vertexAlphas,q.vertexTangents=G.vertexTangents,q.toneMapping=G.toneMapping}function Rm(R,G,q,X,W){G.isScene!==!0&&(G=Te),z.resetTextureUnits();const gt=G.fog,St=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?G.environment:null,xt=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ya,It=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Nt=K.get(X.envMap||St,It),te=X.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,le=!!q.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ft=!!q.morphAttributes.position,Ee=!!q.morphAttributes.normal,We=!!q.morphAttributes.color;let ze=Ui;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ze=S.toneMapping);const be=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,_n=be!==void 0?be.length:0,Ut=E.get(X),Gn=T.state.lights;if(kt===!0&&($t===!0||R!==B)){const nn=R===B&&X.id===k;ct.setState(X,R,nn)}let me=!1;X.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Gn.state.version||Ut.outputColorSpace!==xt||W.isBatchedMesh&&Ut.batching===!1||!W.isBatchedMesh&&Ut.batching===!0||W.isBatchedMesh&&Ut.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ut.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ut.instancing===!1||!W.isInstancedMesh&&Ut.instancing===!0||W.isSkinnedMesh&&Ut.skinning===!1||!W.isSkinnedMesh&&Ut.skinning===!0||W.isInstancedMesh&&Ut.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ut.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ut.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ut.instancingMorph===!1&&W.morphTexture!==null||Ut.envMap!==Nt||X.fog===!0&&Ut.fog!==gt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ct.numPlanes||Ut.numIntersection!==ct.numIntersection)||Ut.vertexAlphas!==te||Ut.vertexTangents!==le||Ut.morphTargets!==Ft||Ut.morphNormals!==Ee||Ut.morphColors!==We||Ut.toneMapping!==ze||Ut.morphTargetsCount!==_n)&&(me=!0):(me=!0,Ut.__version=X.version);let ri=Ut.currentProgram;me===!0&&(ri=$r(X,G,W));let Ei=!1,Os=!1,ra=!1;const Ae=ri.getUniforms(),dn=Ut.uniforms;if(Lt.useProgram(ri.program)&&(Ei=!0,Os=!0,ra=!0),X.id!==k&&(k=X.id,Os=!0),Ei||B!==R){Lt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ae.setValue(U,"projectionMatrix",R.projectionMatrix),Ae.setValue(U,"viewMatrix",R.matrixWorldInverse);const hs=Ae.map.cameraPosition;hs!==void 0&&hs.setValue(U,ue.setFromMatrixPosition(R.matrixWorld)),Ce.logarithmicDepthBuffer&&Ae.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ae.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),B!==R&&(B=R,Os=!0,ra=!0)}if(Ut.needsLights&&(Gn.state.directionalShadowMap.length>0&&Ae.setValue(U,"directionalShadowMap",Gn.state.directionalShadowMap,z),Gn.state.spotShadowMap.length>0&&Ae.setValue(U,"spotShadowMap",Gn.state.spotShadowMap,z),Gn.state.pointShadowMap.length>0&&Ae.setValue(U,"pointShadowMap",Gn.state.pointShadowMap,z)),W.isSkinnedMesh){Ae.setOptional(U,W,"bindMatrix"),Ae.setOptional(U,W,"bindMatrixInverse");const nn=W.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Ae.setValue(U,"boneTexture",nn.boneTexture,z))}W.isBatchedMesh&&(Ae.setOptional(U,W,"batchingTexture"),Ae.setValue(U,"batchingTexture",W._matricesTexture,z),Ae.setOptional(U,W,"batchingIdTexture"),Ae.setValue(U,"batchingIdTexture",W._indirectTexture,z),Ae.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&Ae.setValue(U,"batchingColorTexture",W._colorsTexture,z));const ds=q.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&yt.update(W,q,ri),(Os||Ut.receiveShadow!==W.receiveShadow)&&(Ut.receiveShadow=W.receiveShadow,Ae.setValue(U,"receiveShadow",W.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&G.environment!==null&&(dn.envMapIntensity.value=G.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=WS()),Os&&(Ae.setValue(U,"toneMappingExposure",S.toneMappingExposure),Ut.needsLights&&Cm(dn,ra),gt&&X.fog===!0&&Ot.refreshFogUniforms(dn,gt),Ot.refreshMaterialUniforms(dn,X,Gt,lt,T.state.transmissionRenderTarget[R.id]),Po.upload(U,Fh(Ut),dn,z)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Po.upload(U,Fh(Ut),dn,z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ae.setValue(U,"center",W.center),Ae.setValue(U,"modelViewMatrix",W.modelViewMatrix),Ae.setValue(U,"normalMatrix",W.normalMatrix),Ae.setValue(U,"modelMatrix",W.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const nn=X.uniformsGroups;for(let hs=0,oa=nn.length;hs<oa;hs++){const Bh=nn[hs];bt.update(Bh,ri),bt.bind(Bh,ri)}}return ri}function Cm(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function Pm(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,G,q){const X=E.get(R);X.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),E.get(R.texture).__webglTexture=G,E.get(R.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:q,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,G){const q=E.get(R);q.__webglFramebuffer=G,q.__useDefaultFramebuffer=G===void 0};const Dm=U.createFramebuffer();this.setRenderTarget=function(R,G=0,q=0){L=R,P=G,N=q;let X=null,W=!1,gt=!1;if(R){const xt=E.get(R);if(xt.__useDefaultFramebuffer!==void 0){Lt.bindFramebuffer(U.FRAMEBUFFER,xt.__webglFramebuffer),V.copy(R.viewport),H.copy(R.scissor),et=R.scissorTest,Lt.viewport(V),Lt.scissor(H),Lt.setScissorTest(et),k=-1;return}else if(xt.__webglFramebuffer===void 0)z.setupRenderTarget(R);else if(xt.__hasExternalTextures)z.rebindTextures(R,E.get(R.texture).__webglTexture,E.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const te=R.depthTexture;if(xt.__boundDepthTexture!==te){if(te!==null&&E.has(te)&&(R.width!==te.image.width||R.height!==te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(R)}}const It=R.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(gt=!0);const Nt=E.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Nt[G])?X=Nt[G][q]:X=Nt[G],W=!0):R.samples>0&&z.useMultisampledRTT(R)===!1?X=E.get(R).__webglMultisampledFramebuffer:Array.isArray(Nt)?X=Nt[q]:X=Nt,V.copy(R.viewport),H.copy(R.scissor),et=R.scissorTest}else V.copy(Q).multiplyScalar(Gt).floor(),H.copy(ut).multiplyScalar(Gt).floor(),et=mt;if(q!==0&&(X=Dm),Lt.bindFramebuffer(U.FRAMEBUFFER,X)&&Lt.drawBuffers(R,X),Lt.viewport(V),Lt.scissor(H),Lt.setScissorTest(et),W){const xt=E.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt.__webglTexture,q)}else if(gt){const xt=G;for(let It=0;It<R.textures.length;It++){const Nt=E.get(R.textures[It]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+It,Nt.__webglTexture,q,xt)}}else if(R!==null&&q!==0){const xt=E.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,xt.__webglTexture,q)}k=-1},this.readRenderTargetPixels=function(R,G,q,X,W,gt,St,xt=0){if(!(R&&R.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=E.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&St!==void 0&&(It=It[St]),It){Lt.bindFramebuffer(U.FRAMEBUFFER,It);try{const Nt=R.textures[xt],te=Nt.format,le=Nt.type;if(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+xt),!Ce.textureFormatReadable(te)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(le)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-X&&q>=0&&q<=R.height-W&&U.readPixels(G,q,X,W,pt.convert(te),pt.convert(le),gt)}finally{const Nt=L!==null?E.get(L).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(R,G,q,X,W,gt,St,xt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=E.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&St!==void 0&&(It=It[St]),It)if(G>=0&&G<=R.width-X&&q>=0&&q<=R.height-W){Lt.bindFramebuffer(U.FRAMEBUFFER,It);const Nt=R.textures[xt],te=Nt.format,le=Nt.type;if(R.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+xt),!Ce.textureFormatReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ft=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ft),U.bufferData(U.PIXEL_PACK_BUFFER,gt.byteLength,U.STREAM_READ),U.readPixels(G,q,X,W,pt.convert(te),pt.convert(le),0);const Ee=L!==null?E.get(L).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,Ee);const We=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await og(U,We,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ft),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,gt),U.deleteBuffer(Ft),U.deleteSync(We),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,G=null,q=0){const X=Math.pow(2,-q),W=Math.floor(R.image.width*X),gt=Math.floor(R.image.height*X),St=G!==null?G.x:0,xt=G!==null?G.y:0;z.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,St,xt,W,gt),Lt.unbindTexture()};const Im=U.createFramebuffer(),Lm=U.createFramebuffer();this.copyTextureToTexture=function(R,G,q=null,X=null,W=0,gt=0){let St,xt,It,Nt,te,le,Ft,Ee,We;const ze=R.isCompressedTexture?R.mipmaps[gt]:R.image;if(q!==null)St=q.max.x-q.min.x,xt=q.max.y-q.min.y,It=q.isBox3?q.max.z-q.min.z:1,Nt=q.min.x,te=q.min.y,le=q.isBox3?q.min.z:0;else{const dn=Math.pow(2,-W);St=Math.floor(ze.width*dn),xt=Math.floor(ze.height*dn),R.isDataArrayTexture?It=ze.depth:R.isData3DTexture?It=Math.floor(ze.depth*dn):It=1,Nt=0,te=0,le=0}X!==null?(Ft=X.x,Ee=X.y,We=X.z):(Ft=0,Ee=0,We=0);const be=pt.convert(G.format),_n=pt.convert(G.type);let Ut;G.isData3DTexture?(z.setTexture3D(G,0),Ut=U.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(z.setTexture2DArray(G,0),Ut=U.TEXTURE_2D_ARRAY):(z.setTexture2D(G,0),Ut=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);const Gn=U.getParameter(U.UNPACK_ROW_LENGTH),me=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ri=U.getParameter(U.UNPACK_SKIP_PIXELS),Ei=U.getParameter(U.UNPACK_SKIP_ROWS),Os=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ze.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ze.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Nt),U.pixelStorei(U.UNPACK_SKIP_ROWS,te),U.pixelStorei(U.UNPACK_SKIP_IMAGES,le);const ra=R.isDataArrayTexture||R.isData3DTexture,Ae=G.isDataArrayTexture||G.isData3DTexture;if(R.isDepthTexture){const dn=E.get(R),ds=E.get(G),nn=E.get(dn.__renderTarget),hs=E.get(ds.__renderTarget);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,nn.__webglFramebuffer),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,hs.__webglFramebuffer);for(let oa=0;oa<It;oa++)ra&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,E.get(R).__webglTexture,W,le+oa),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,E.get(G).__webglTexture,gt,We+oa)),U.blitFramebuffer(Nt,te,St,xt,Ft,Ee,St,xt,U.DEPTH_BUFFER_BIT,U.NEAREST);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||R.isRenderTargetTexture||E.has(R)){const dn=E.get(R),ds=E.get(G);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,Im),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Lm);for(let nn=0;nn<It;nn++)ra?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,dn.__webglTexture,W,le+nn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,dn.__webglTexture,W),Ae?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ds.__webglTexture,gt,We+nn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ds.__webglTexture,gt),W!==0?U.blitFramebuffer(Nt,te,St,xt,Ft,Ee,St,xt,U.COLOR_BUFFER_BIT,U.NEAREST):Ae?U.copyTexSubImage3D(Ut,gt,Ft,Ee,We+nn,Nt,te,St,xt):U.copyTexSubImage2D(Ut,gt,Ft,Ee,Nt,te,St,xt);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Ae?R.isDataTexture||R.isData3DTexture?U.texSubImage3D(Ut,gt,Ft,Ee,We,St,xt,It,be,_n,ze.data):G.isCompressedArrayTexture?U.compressedTexSubImage3D(Ut,gt,Ft,Ee,We,St,xt,It,be,ze.data):U.texSubImage3D(Ut,gt,Ft,Ee,We,St,xt,It,be,_n,ze):R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,gt,Ft,Ee,St,xt,be,_n,ze.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,gt,Ft,Ee,ze.width,ze.height,be,ze.data):U.texSubImage2D(U.TEXTURE_2D,gt,Ft,Ee,St,xt,be,_n,ze);U.pixelStorei(U.UNPACK_ROW_LENGTH,Gn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ri),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ei),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Os),gt===0&&G.generateMipmaps&&U.generateMipmap(Ut),Lt.unbindTexture()},this.initRenderTarget=function(R){E.get(R).__webglFramebuffer===void 0&&z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?z.setTextureCube(R,0):R.isData3DTexture?z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?z.setTexture2DArray(R,0):z.setTexture2D(R,0),Lt.unbindTexture()},this.resetState=function(){P=0,N=0,L=null,Lt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}}const mf={type:"change"},hh={type:"start"},Op={type:"end"},yo=new gl,_f=new Ti,qS=Math.cos(70*dg.DEG2RAD),Ze=new F,Dn=2*Math.PI,we={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uc=1e-6;class YS extends Kg{constructor(t,e=null){super(t,e),this.state=we.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ss.ROTATE,MIDDLE:ss.DOLLY,RIGHT:ss.PAN},this.touches={ONE:Ua.ROTATE,TWO:Ua.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Ds,this._lastTargetPosition=new F,this._quat=new Ds().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vu,this._sphericalDelta=new Vu,this._scale=1,this._panOffset=new F,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new F,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ZS.bind(this),this._onPointerDown=$S.bind(this),this._onPointerUp=jS.bind(this),this._onContextMenu=i1.bind(this),this._onMouseWheel=QS.bind(this),this._onKeyDown=t1.bind(this),this._onTouchStart=e1.bind(this),this._onTouchMove=n1.bind(this),this._onMouseDown=KS.bind(this),this._onMouseMove=JS.bind(this),this._interceptControlDown=s1.bind(this),this._interceptControlUp=a1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(mf),this.update(),this.state=we.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ze.copy(e).sub(this.target),Ze.applyQuaternion(this._quat),this._spherical.setFromVector3(Ze),this.autoRotate&&this.state===we.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Dn:i>Math.PI&&(i-=Dn),s<-Math.PI?s+=Dn:s>Math.PI&&(s-=Dn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Ze.setFromSpherical(this._spherical),Ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Ze.length();r=this._clampDistance(o*this._scale);const d=o-r;this.object.position.addScaledVector(this._dollyDirection,d),this.object.updateMatrixWorld(),a=!!d}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=d!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(yo.origin.copy(this.object.position),yo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yo.direction))<qS?this.object.lookAt(this.target):(_f.setFromNormalAndCoplanarPoint(this.object.up,this.target),yo.intersectPlane(_f,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>uc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uc||this._lastTargetPosition.distanceToSquared(this.target)>uc?(this.dispatchEvent(mf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Dn/60*this.autoRotateSpeed*t:Dn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ze.setFromMatrixColumn(e,0),Ze.multiplyScalar(-t),this._panOffset.add(Ze)}_panUp(t,e){this.screenSpacePanning===!0?Ze.setFromMatrixColumn(e,1):(Ze.setFromMatrixColumn(e,0),Ze.crossVectors(this.object.up,Ze)),Ze.multiplyScalar(t),this._panOffset.add(Ze)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ze.copy(s).sub(this.target);let a=Ze.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*e*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,a=e-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function $S(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ZS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function jS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Op),this.state=we.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function KS(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=we.DOLLY;break;case ss.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=we.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=we.ROTATE}break;case ss.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=we.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=we.PAN}break;default:this.state=we.NONE}this.state!==we.NONE&&this.dispatchEvent(hh)}function JS(n){switch(this.state){case we.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case we.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case we.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function QS(n){this.enabled===!1||this.enableZoom===!1||this.state!==we.NONE||(n.preventDefault(),this.dispatchEvent(hh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Op))}function t1(n){this.enabled!==!1&&this._handleKeyDown(n)}function e1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ua.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=we.TOUCH_ROTATE;break;case Ua.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=we.TOUCH_PAN;break;default:this.state=we.NONE}break;case 2:switch(this.touches.TWO){case Ua.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=we.TOUCH_DOLLY_PAN;break;case Ua.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=we.TOUCH_DOLLY_ROTATE;break;default:this.state=we.NONE}break;default:this.state=we.NONE}this.state!==we.NONE&&this.dispatchEvent(hh)}function n1(n){switch(this._trackPointer(n),this.state){case we.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case we.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case we.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case we.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=we.NONE}}function i1(n){this.enabled!==!1&&n.preventDefault()}function s1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function a1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Do={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Vr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const r1=new Ml(-1,1,1,-1,0,1);class o1 extends cn{constructor(){super(),this.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _e([0,2,0,0,2,0],2))}}const l1=new o1;class Bp{constructor(t){this._mesh=new w(l1,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,r1)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class c1 extends Vr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof En?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=$o.clone(t.uniforms),this.material=new En({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Bp(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class gf extends Vr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class d1 extends Vr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class h1{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Pt);this._width=i.width,this._height=i.height,e=new zn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new c1(Do),this.copyPass.material.blending=Li,this.timer=new Zg}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,a=this.passes.length;s<a;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),r.needsSwap){if(i){const o=this.renderer.getContext(),d=this.renderer.state.buffers.stencil;d.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),d.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}gf!==void 0&&(r instanceof gf?i=!0:r instanceof d1&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Pt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class u1 extends Vr{constructor(t,e,i=null,s=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Bt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let a,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const f1={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Bt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ka extends Vr{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Pt(t.x,t.y):new Pt(256,256),this.clearColor=new Bt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new zn(a,r,{type:Kn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const l=new zn(a,r,{type:Kn});l.texture.name="UnrealBloomPass.h"+h,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new zn(a,r,{type:Kn});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),a=Math.round(a/2),r=Math.round(r/2)}const o=f1;this.highPassUniforms=$o.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new En({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const d=[6,10,14,18,22];a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(d[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Pt(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=$o.clone(Do.uniforms),this.blendMaterial=new En({uniforms:this.copyUniforms,vertexShader:Do.vertexShader,fragmentShader:Do.fragmentShader,premultipliedAlpha:!0,blending:Tc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Bt,this._oldClearAlpha=1,this._basic=new Cn,this._fsQuad=new Bp(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,s),this.renderTargetsVertical[a].setSize(i,s),this.separableBlurMaterials[a].uniforms.invSize.value=new Pt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let d=0;d<this.nMips;d++)this._fsQuad.material=this.separableBlurMaterials[d],this.separableBlurMaterials[d].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[d].uniforms.direction.value=Ka.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[d]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[d].uniforms.colorTexture.value=this.renderTargetsHorizontal[d].texture,this.separableBlurMaterials[d].uniforms.direction.value=Ka.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[d]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[d];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=r}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new En({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Pt(.5,.5)},direction:{value:new Pt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new En({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ka.BlurDirectionX=new Pt(1,0);Ka.BlurDirectionY=new Pt(0,1);let fi,mi,Wn,Na,Qn;function Ht(n){const t=new Bt(n);return new Rp({color:t.clone().multiplyScalar(.25),metalness:.7,roughness:.35,emissive:t.clone().multiplyScalar(.05),emissiveIntensity:1})}function Jt(n){return new Cn({color:n})}function Mt(n,t=1){return new Cn({color:n,transparent:!0,opacity:t,side:$n})}function p1(n){fi=new bg,fi.background=new Bt(zt.BG),fi.fog=new oh(zt.BG,18e-5),mi=new ii(Ym,ti/Un,$m,Zm),mi.position.set(ti/2,jm,Un+Km),mi.lookAt(ti/2,0,Un/2),Wn=new XS({antialias:!0}),Wn.setPixelRatio(window.devicePixelRatio),Wn.toneMapping=jd,Wn.toneMappingExposure=1.1,Wn.setClearColor(new Bt(zt.BG)),n.appendChild(Wn.domElement);const t=n.clientWidth,e=n.clientHeight;Wn.setSize(t,e),mi.aspect=t/e,mi.updateProjectionMatrix(),Qn=new YS(mi,Wn.domElement),Qn.target.set(ti/2,0,Un/2),Qn.minPolarAngle=Jm,Qn.maxPolarAngle=Qm,Qn.minDistance=t0,Qn.maxDistance=e0,Qn.enableDamping=!0,Qn.dampingFactor=n0,Qn.panSpeed=1.2,Qn.mouseButtons={LEFT:ss.ROTATE,MIDDLE:ss.PAN,RIGHT:ss.PAN};const i=new qg(i0,s0);fi.add(i);const s=new Hu(a0,r0);s.position.set(ti*.7,500,-Un*.3),s.target.position.set(ti/2,0,Un/2),fi.add(s),fi.add(s.target);const a=new Hu(o0,l0);a.position.set(-ti*.3,300,Un*1.2),fi.add(a);const r=new Vg(c0,d0,h0);fi.add(r),Na=new h1(Wn),Na.addPass(new u1(fi,mi));const o=new Ka(new Pt(t,e),u0,f0,p0);return Na.addPass(o),window.addEventListener("resize",m1),{scene:fi,camera:mi,renderer:Wn,composer:Na,controls:Qn}}function m1(){const n=Wn.domElement.parentElement;if(!n)return;const t=n.clientWidth,e=n.clientHeight;mi.aspect=t/e,mi.updateProjectionMatrix(),Wn.setSize(t,e),Na.setSize(t,e)}function He(){return fi}function uh(){return mi}function _1(){return Na}function Zo(){return Qn}function g1(){return Wn}const fh=qt*Ke,Ri=new Float32Array(fh),Dr=new Int16Array(fh),As=new Uint8Array(fh),jo=new Map;let ph=0,Ja=0,Md=!1;function x1(n,t){Md=!0}function v1(n){n===void 0&&(n=1/60),Ja=0,ph+=n,Md&&(jo.clear(),Md=!1)}function zp(n){const t=jo.get(n);if(t){if(ph-t.time>G0){jo.delete(n);return}return t.path}}function Ko(n,t){t&&jo.set(n,{path:t,time:ph})}function Hp(){return Ja>=k0}function Jo(n,t,e,i){const s=Math.abs(n-e),a=Math.abs(t-i);return Math.max(s,a)+(Math.SQRT2-1)*Math.min(s,a)}const Gp=[{dc:0,dr:-1,cost:1},{dc:0,dr:1,cost:1},{dc:-1,dr:0,cost:1},{dc:1,dr:0,cost:1},{dc:-1,dr:-1,cost:Math.SQRT2},{dc:1,dr:-1,cost:Math.SQRT2},{dc:-1,dr:1,cost:Math.SQRT2},{dc:1,dr:1,cost:Math.SQRT2}];function kp(n,t){return[{col:n,row:t-1},{col:n,row:t+1},{col:n-1,row:t},{col:n+1,row:t}].filter(e=>e.col>=0&&e.col<qt&&e.row>=0&&e.row<Ke)}function Vp(n){const t=[];let e=n;for(;e!==-1;){const i=e%qt,s=(e-i)/qt;t.push({col:i,row:s}),e=Dr[e]}return t.reverse(),t}function M1(n,t,e,i,s){let a=Math.abs(e-n),r=Math.abs(i-t);const o=n<e?1:-1,d=t<i?1:-1;let c=a-r,h=n,l=t;for(;;){if(!s(h,l))return!1;if(h===e&&l===i)break;const u=2*c;let f=!1,_=!1;if(u>-r&&(c-=r,h+=o,f=!0),u<a&&(c+=a,l+=d,_=!0),f&&_&&(!s(h-o,l)||!s(h,l-d)))return!1}return!0}function y1(n,t){if(n<0||n>=qt||t<0||t>=Ke)return!1;const e=Ue(n,t);return e===$e||e===On}function xf(n){if(!n||n.length<=2)return n;const t=[n[0]];let e=0;for(;e<n.length-1;){let i=e+1;for(let s=n.length-1;s>e+1;s--)if(M1(n[e].col,n[e].row,n[s].col,n[s].row,y1)){i=s;break}t.push(n[i]),e=i}return t}function Io(n,t,e,i){if(n<0||n>=qt||t<0||t>=Ke||e<0||e>=qt||i<0||i>=Ke)return null;const s=`${n},${t},${e},${i}`,a=zp(s);if(a!==void 0)return a;if(Hp())return null;const r=Ue(e,i);if(r!==$e&&r!==On){const c=kp(e,i);let h=null;for(const u of c){const f=Ue(u.col,u.row);if(f===$e||f===On){Ja++;const _=vf(n,t,u.col,u.row);_&&(!h||_.length<h.length)&&(h=_)}}const l=h&&xf(h);return Ko(s,l),l}Ja++;const o=vf(n,t,e,i),d=o&&xf(o);return Ko(s,d),d}function vf(n,t,e,i){const s=t*qt+n,a=i*qt+e;if(s===a)return[{col:n,row:t}];Ri.fill(1/0),Dr.fill(-1),As.fill(0),Ri[s]=0;const r=Wp();for(r.push(s,Jo(n,t,e,i));r.size()>0;){const o=r.pop();if(As[o])continue;if(o===a)return Qo(r),Vp(o);As[o]=1;const d=o%qt,c=(o-d)/qt;for(let h=0;h<8;h++){const l=Gp[h],u=d+l.dc,f=c+l.dr;if(u<0||u>=qt||f<0||f>=Ke)continue;const _=Ue(u,f);if(_!==$e&&_!==On)continue;if(l.cost>1){const p=Ue(d+l.dc,c),v=Ue(d,c+l.dr);if(p!==$e&&p!==On||v!==$e&&v!==On)continue}const g=f*qt+u;if(As[g])continue;const m=Ri[o]+l.cost;if(m<Ri[g]){Dr[g]=o,Ri[g]=m;const p=m+Jo(u,f,e,i);r.push(g,p)}}}return Qo(r),null}function S1(n,t,e,i,s){if(n<0||n>=qt||t<0||t>=Ke||e<0||e>=qt||i<0||i>=Ke)return null;const a=`tw${n},${t},${e},${i}`,r=zp(a);if(r!==void 0)return r;if(Hp())return null;const o=Ue(e,i);if(!(o===$e||o===On||o===Fn)){const h=kp(e,i);let l=null;for(const u of h){const f=Ue(u.col,u.row);if(f===$e||f===On||f===Fn){Ja++;const _=Mf(n,t,u.col,u.row,s);_&&(!l||_.length<l.length)&&(l=_)}}return Ko(a,l),l}Ja++;const c=Mf(n,t,e,i,s);return Ko(a,c),c}function Mf(n,t,e,i,s){const a=t*qt+n,r=i*qt+e;if(a===r)return[{col:n,row:t}];Ri.fill(1/0),Dr.fill(-1),As.fill(0),Ri[a]=0;const o=Wp();for(o.push(a,Jo(n,t,e,i));o.size()>0;){const d=o.pop();if(As[d])continue;if(d===r)return Qo(o),Vp(d);As[d]=1;const c=d%qt,h=(d-c)/qt;for(let l=0;l<8;l++){const u=Gp[l],f=c+u.dc,_=h+u.dr;if(f<0||f>=qt||_<0||_>=Ke)continue;const g=Ue(f,_);if(g!==$e&&g!==On&&g!==Fn)continue;if(u.cost>1){const M=Ue(c+u.dc,h),y=Ue(c,h+u.dr);if(!(M===$e||M===On||M===Fn)||!(y===$e||y===On||y===Fn))continue}const m=_*qt+f;if(As[m])continue;let p=u.cost;g===Fn&&(p+=s?s(f,_):l_);const v=Ri[d]+p;if(v<Ri[m]){Dr[m]=d,Ri[m]=v;const M=v+Jo(f,_,e,i);o.push(m,M)}}}return Qo(o),null}class E1{constructor(){this._data=[]}size(){return this._data.length}reset(){this._data.length=0}push(t,e){this._data.push({key:t,f:e}),this._bubbleUp(this._data.length-1)}pop(){const t=this._data[0],e=this._data.pop();return this._data.length>0&&(this._data[0]=e,this._sinkDown(0)),t.key}_bubbleUp(t){for(;t>0;){const e=t-1>>1;if(this._data[t].f<this._data[e].f)[this._data[t],this._data[e]]=[this._data[e],this._data[t]],t=e;else break}}_sinkDown(t){const e=this._data.length;for(;;){let i=t;const s=2*t+1,a=2*t+2;if(s<e&&this._data[s].f<this._data[i].f&&(i=s),a<e&&this._data[a].f<this._data[i].f&&(i=a),i!==t)[this._data[t],this._data[i]]=[this._data[i],this._data[t]],t=i;else break}}}const yd=[];function Wp(){return yd.length>0?yd.pop():new E1}function Qo(n){n.reset(),yd.push(n)}let Gi=[],Sd=null;function b1(n){Sd=n}let Ed=[];function w1(){const n=Math.random();let t=0;for(const e of qh)if(t+=e.weight,n<t)return e;return qh[0]}function T1(n){const t=w1();let e=t.cellsW,i=t.cellsD;e!==i&&Math.random()<.5&&(e=t.cellsD,i=t.cellsW);for(let s=0;s<_0;s++){const a=Dl+Math.floor(Math.random()*(Xh-Dl-e+2)),r=Pl+Math.floor(Math.random()*(Wh-Pl-i+2));let o=!0;for(let h=0;h<e&&o;h++)for(let l=0;l<i&&o;l++){const u=a+h,f=r+l;(u<Dl||u>Xh||f<Pl||f>Wh||Gi[f][u]!==$e||Math.abs(u-ws)<=Zr&&Math.abs(f-es)<=Zr||Math.abs(u-si)<=Zr&&Math.abs(f-Tn)<=Zr)&&(o=!1)}if(!o)continue;for(let h=0;h<e;h++)for(let l=0;l<i;l++)Gi[r+l][a+h]=gi;const d=t.heightMin+Math.random()*(t.heightMax-t.heightMin),c=$h[Math.floor(Math.random()*$h.length)];return{id:`obs-${n}`,kind:t.kind,col:a,row:r,cellsW:e,cellsD:i,height:d,color:c,aabb:{min:{x:a*J,y:0,z:r*J},max:{x:(a+e)*J,y:d,z:(r+i)*J}}}}return null}function A1(n){for(let t=0;t<n.cellsW;t++)for(let e=0;e<n.cellsD;e++)Gi[n.row+e][n.col+t]=$e}function R1(){Gi=[];for(let e=0;e<Ke;e++)Gi[e]=new Array(qt).fill($e);Ed=[];const n=Zh+Math.floor(Math.random()*(m0-Zh+1));let t=0;for(let e=0;e<n;e++){const i=T1(t);if(!i)continue;Io(Math.floor(qt/2),es,Math.floor(qt/2),Tn)?(Ed.push(i),t++):A1(i)}}function Ue(n,t){return n<0||n>=qt||t<0||t>=Ke?gi:Gi[t][n]}function Xp(n,t,e){n<0||n>=qt||t<0||t>=Ke||Gi[t][n]!==e&&(Gi[t][n]=e,x1())}function tl(n,t,e,i){let s=!1;for(let a=t;a<t+e;a++)for(let r=n;r<n+e;r++){if(r<0||r>=qt||a<0||a>=Ke||!C1(a,i)||Gi[a][r]!==$e)return!1;a>=hl&&a<=Rs&&(s=!0)}return!(s&&Sd&&!Sd(n,t,e,i))}function C1(n,t){return t===st&&n>=Vf&&n<=Um||t===Kt&&n>=Ho&&n<=dl||n>=hl&&n<=Rs}function P1(){const n=[];for(let t=0;t<Ke;t++)for(let e=0;e<qt;e++)Gi[t][e]===gi&&n.push({col:e,row:t});return n}function D1(){return Ed}function I1(n){let t=0,e=0;for(const i of n)i.alive&&i.row>=hl&&i.row<=Rs&&(i.team===st?t++:i.team===Kt&&e++);return{player:t,enemy:e}}let Ws=null,ni=null,el=null,wa=null,ji=[],Ir=null;const he=new Y(1,1,1),Hn=new wt(.5,12,8),mn=new Et(.5,.5,1,16),Is=new de(.5,.06,8,24),qp=new Za(.5,0),L1=new vl(.5,0);new Hi(1,1);let bd=0;function U1(n,t,e,i,s,a,r){const o=Math.min(e,i)*.22,d=new w(mn.clone(),s);d.scale.set(o*2.8,3,o*2.8),d.position.y=1.5,n.add(d);const c=t*.45,h=new w(mn.clone(),s);h.scale.set(o*2,1.5,o*2),h.position.y=c,n.add(h);const l=new w(mn.clone(),s);l.scale.set(o*1.2,t*.85,o*1.2),l.position.y=t*.45,n.add(l);const u=4;for(let g=1;g<=u;g++){const m=t*.1+t*.75*(g/(u+1)),p=new w(Is.clone(),a);p.scale.set(o*1.6,o*1.6,o*1.6),p.rotation.x=Math.PI/2,p.position.y=m,n.add(p)}const f=new w(Hn.clone(),a);f.scale.set(o*2.2,o*2.2,o*2.2),f.position.y=t,n.add(f);const _=new w(Hn.clone(),r);_.scale.set(o*3.5,o*3.5,o*3.5),_.position.y=t,n.add(_);for(let g=0;g<4;g++){const m=Math.PI*2/4*g,p=new w(he.clone(),a);p.scale.set(o*.3,o*.2,o*2.5),p.position.set(Math.cos(m)*o*1.8,t+o*.5,Math.sin(m)*o*1.8),p.rotation.y=m,n.add(p)}}function N1(n,t,e,i,s,a,r){const o=Math.min(e,i)*.3,d=new w(mn.clone(),s);d.scale.set(o*2,t,o*2),d.position.y=t/2,n.add(d);const c=new w(mn.clone(),s);c.scale.set(o*2.3,1.5,o*2.3),c.position.y=t+.75,n.add(c);const h=new w(mn.clone(),s);h.scale.set(o*2.3,1.5,o*2.3),h.position.y=.75,n.add(h);const l=3;for(let _=0;_<l;_++){const g=t*.2+t*.6*(_/(l-1)),m=new w(Is.clone(),a);m.scale.set(o*2.4,o*2.4,o*2.4),m.rotation.x=Math.PI/2,m.position.y=g,n.add(m)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,m=new w(he.clone(),s);m.scale.set(o*.4,t*.3,2),m.position.set(Math.cos(g)*o*1.1,t*.5,Math.sin(g)*o*1.1),m.rotation.y=g,n.add(m)}const u=new w(Hn.clone(),a);u.scale.set(o*.7,o*.7,o*.7),u.position.set(o*1.1,t*.7,0),n.add(u);const f=new w(Hn.clone(),r);f.scale.set(o*1.2,o*1.2,o*1.2),f.position.set(o*1.1,t*.7,0),n.add(f)}function yf(n,t,e,i,s,a,r){const o=e*.55,d=i*.55,c=new w(he.clone(),s);c.scale.set(o*1.15,2.5,d*1.15),c.position.y=1.25,n.add(c);const h=new w(he.clone(),s);h.scale.set(o,t,d),h.position.y=2.5+t/2,n.add(h);for(let g=0;g<5;g++){const m=4+(t-4)*(g/5),p=new w(he.clone(),a);p.scale.set(o*.85,.4,.4),p.position.set(0,m,d/2+.3),n.add(p)}for(let g=0;g<3;g++){const m=-o*.3+o*.3*g,p=new w(he.clone(),a);p.scale.set(.4,t*.5,.4),p.position.set(m,t*.5+2.5,d/2+.3),n.add(p)}const l=new w(he.clone(),a);l.scale.set(o*.6,.4,.4),l.rotation.z=Math.PI/5,l.position.set(o*.15,t*.65+2.5,-d/2-.3),n.add(l);for(let g=-1;g<=1;g+=2){const m=new w(mn.clone(),a);m.scale.set(2,1.5,2),m.rotation.z=Math.PI/2,m.position.set(g*(o/2+.8),t*.4+2.5,0),n.add(m)}const u=new w(qp.clone(),a),f=Math.min(o,d)*.35;u.scale.set(f,f,f),u.position.y=t+3.5+f/2,n.add(u);const _=new w(Hn.clone(),r);_.scale.set(f*2,f*2,f*2),_.position.y=t+3.5+f/2,n.add(_)}function F1(n,t,e,i,s,a,r){const o=Math.max(e,i),d=Math.min(e,i),c=e>=i,h=new w(he.clone(),s);h.scale.set(e*.9,2,i*.9),h.position.y=1,n.add(h);const l=d*.25,u=o*.25;for(const m of[-1,1]){const p=c?m*u:0,v=c?0:m*u,M=new w(mn.clone(),s);M.scale.set(l*2,t,l*2),M.position.set(p,2+t/2,v),n.add(M);const y=new w(Is.clone(),r);y.scale.set(l*2.5,l*2.5,l*2.5),y.rotation.x=Math.PI/2,y.position.set(p,2+t*.6,v),n.add(y)}const f=new w(he.clone(),a);c?f.scale.set(u*2,1.5,2):f.scale.set(2,1.5,u*2),f.position.y=2+t*.75,n.add(f);const _=new w(he.clone(),a);c?_.scale.set(u*2,1.5,2):_.scale.set(2,1.5,u*2),_.position.y=2+t*.35,n.add(_);const g=4;for(let m=0;m<g;m++){const p=-.5+(m+.5)/g,v=new w(he.clone(),s);c?(v.scale.set(2,t*.5,d*.05),v.position.set(p*o*.8,2+t*.3,d*.45)):(v.scale.set(d*.05,t*.5,2),v.position.set(d*.45,2+t*.3,p*o*.8)),n.add(v)}for(const m of[-1,1]){const p=new w(Hn.clone(),a);p.scale.set(3,3,3);const v=c?m*u:0,M=c?0:m*u;p.position.set(v,2+t+2,M),n.add(p)}}function O1(n,t,e,i,s,a,r){const o=Math.min(e,i)*.15,d=new w(mn.clone(),s);d.scale.set(o*6,3,o*6),d.position.y=1.5,n.add(d);const c=new w(mn.clone(),s);c.scale.set(o*1.5,t,o*1.5),c.position.y=3+t/2,n.add(c);const h=[.3,.55,.8];for(const _ of h){const g=3+t*_,m=o*(5-_*2),p=new w(he.clone(),a);p.scale.set(m*2,1.2,1.2),p.position.y=g,n.add(p);const v=new w(he.clone(),a);v.scale.set(1.2,1.2,m*2),v.position.y=g,n.add(v)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,m=new w(he.clone(),s),p=Math.sqrt(t*t+o*4*(o*4));m.scale.set(.3,p,.3),m.position.set(Math.cos(g)*o*2,3+t/2,Math.sin(g)*o*2),m.rotation.z=Math.atan2(o*4,t)*(_<2?1:-1),m.rotation.y=g,n.add(m)}for(let _=0;_<2;_++){const g=new w(he.clone(),s);g.scale.set(.5,t*.12,.5),g.position.set((_-.5)*o*2,3+t+t*.06,0),n.add(g)}const l=new w(qp.clone(),a);l.scale.set(o*2,o*2,o*2),l.position.y=3+t*.9,n.add(l);const u=new w(Hn.clone(),a);u.scale.set(o*3.5,o*3.5,o*3.5),u.position.y=3+t+t*.05,n.add(u);const f=new w(Hn.clone(),r);f.scale.set(o*6,o*6,o*6),f.position.y=3+t+t*.05,n.add(f)}function B1(n,t,e,i,s,a,r){const o=e*.55,d=i*.55,c=4,h=t/c;let l=0;for(let p=0;p<c;p++){const v=1-p*.15,M=o*v,y=d*v,T=new w(he.clone(),s);if(T.scale.set(M,h*.85,y),T.position.y=l+h*.425,n.add(T),p>0){const b=new w(he.clone(),a);b.scale.set(M*1.05,.6,y*1.05),b.position.y=l,n.add(b)}if(p<c-1)for(let b=-1;b<=1;b+=2)for(let A=-1;A<=1;A+=2){const x=new w(he.clone(),a);x.scale.set(.6,h*.7,.6),x.position.set(b*M*.5,l+h*.4,A*y*.5),n.add(x)}l+=h}const u=new w(Is.clone(),r),f=Math.min(o,d)*.8;u.scale.set(f,f,f),u.rotation.x=Math.PI/2,u.position.y=t*.82,n.add(u);const _=Math.min(o,d)*.28,g=new w(L1.clone(),a);g.scale.set(_,_,_),g.position.y=t+_+2,n.add(g);const m=new w(Hn.clone(),r);m.scale.set(_*2,_*2,_*2),m.position.y=t+_+2,n.add(m)}function z1(n,t,e,i,s,a,r){const o=Math.max(e,i),d=Math.min(e,i),c=e>=i,h=Math.min(t*.4,d*.2),l=o*.35,u=t*.55;for(const m of[-1,1]){const p=c?m*l:0,v=c?0:m*l,M=new w(he.clone(),s);M.scale.set(d*.2,u,d*.2),M.position.set(p,u/2,v),n.add(M);const y=new w(he.clone(),a);y.scale.set(.8,u*.8,.8),y.rotation.z=m*.4,y.position.set(p*.5,u*.4,v*.5),n.add(y)}const f=new w(mn.clone(),s),_=l*2;c?(f.scale.set(h*2,_,h*2),f.rotation.z=Math.PI/2):(f.scale.set(h*2,_,h*2),f.rotation.x=Math.PI/2),f.position.y=u,n.add(f);for(const m of[-1,1]){const p=c?m*l*.8:0,v=c?0:m*l*.8,M=new w(Is.clone(),a);M.scale.set(h*3,h*3,h*3),c&&(M.rotation.y=Math.PI/2),M.position.set(p,u,v),n.add(M)}const g=new w(Is.clone(),a);g.scale.set(h*2.5,h*2.5,h*2.5),g.position.y=u,n.add(g);for(const m of[-1,1]){const p=c?m*l:0,v=c?0:m*l,M=new w(Hn.clone(),r);M.scale.set(h*2.5,h*2.5,h*2.5),M.position.set(p,u,v),n.add(M)}for(const m of[-1,1]){const p=c?m*l*.95:0,v=c?0:m*l*.95,M=new w(mn.clone(),s);M.scale.set(h*2.8,1.5,h*2.8),M.position.set(p,u,v),n.add(M)}}function H1(n,t,e,i,s,a,r){const o=Math.min(e,i),d=o*.32,c=o*.05,h=new w(mn.clone(),s);h.scale.set(o*.7,3,o*.7),h.position.y=1.5,n.add(h);for(let m=-1;m<=1;m+=2)for(let p=-1;p<=1;p+=2){const v=new w(he.clone(),s);v.scale.set(c*2,t,c*2),v.position.set(m*d,3+t/2,p*d),n.add(v)}const l=5;for(let m=0;m<l;m++){const p=3+t*(m+1)/(l+1);for(const v of[-1,1]){const M=new w(he.clone(),s);M.scale.set(d*2,1,1),M.position.set(0,p,v*d),n.add(M)}for(const v of[-1,1]){const M=new w(he.clone(),s);M.scale.set(1,1,d*2),M.position.set(v*d,p,0),n.add(M)}if(m%2===0){const v=new w(he.clone(),a);v.scale.set(.6,t/(l+1)*1.3,.6),v.rotation.z=.4,v.position.set(0,p,d),n.add(v);const M=new w(he.clone(),a);M.scale.set(.6,t/(l+1)*1.3,.6),M.rotation.z=-.4,M.position.set(0,p,-d),n.add(M)}}const u=3+t*.85;for(let m=0;m<4;m++){const p=Math.PI*2/4*m+Math.PI/4,v=o*.35,M=new w(he.clone(),a);M.scale.set(v,1.2,1.2),M.position.set(Math.cos(p)*v*.5,u,Math.sin(p)*v*.5),M.rotation.y=p,n.add(M);const y=new w(mn.clone(),s);y.scale.set(1.5,4,1.5),y.position.set(Math.cos(p)*v*.8,u-3,Math.sin(p)*v*.8),n.add(y)}const f=o*.12,_=new w(Hn.clone(),a);_.scale.set(f*2,f*2,f*2),_.position.y=3+t+f,n.add(_);const g=new w(Hn.clone(),r);g.scale.set(f*4,f*4,f*4),g.position.y=3+t+f,n.add(g)}function G1(n,t,e,i,s,a,r){const o=Math.min(e,i)*.28,d=3,c=t/d,h=new w(mn.clone(),s);h.scale.set(o*2.8,2,o*2.8),h.position.y=1,n.add(h);for(let _=0;_<d;_++){const g=2+_*c,m=new w(mn.clone(),s);m.scale.set(o*2,c*.75,o*2),m.position.y=g+c*.375,n.add(m);for(let p=0;p<6;p++){const v=Math.PI*2/6*p,M=new w(he.clone(),a);M.scale.set(o*.8,c*.5,1),M.position.set(Math.cos(v)*o*1.3,g+c*.4,Math.sin(v)*o*1.3),M.rotation.y=v,n.add(M)}if(_<d-1){const p=new w(Is.clone(),r);p.scale.set(o*2.6,o*2.6,o*2.6),p.rotation.x=Math.PI/2,p.position.y=g+c,n.add(p)}}const l=new w(mn.clone(),a);l.scale.set(o*.6,4,o*.6),l.position.y=2+t+2,n.add(l);const u=new w(Hn.clone(),a);u.scale.set(o*.8,o*.8,o*.8),u.position.y=2+t+4.5,n.add(u);const f=new w(Hn.clone(),r);f.scale.set(o*1.5,o*1.5,o*1.5),f.position.y=2+t+4.5,n.add(f)}function k1(n,t,e,i,s,a,r){const o=Math.max(e,i),d=Math.min(e,i),c=e>=i,h=2,l=o*.4,u=d*.3;for(const m of[-1,1])for(const p of[-1,1]){const v=c?m*l:p*u,M=c?p*u:m*l,y=new w(he.clone(),s);y.scale.set(h,t,h),y.position.set(v,t/2,M),n.add(y);const T=new w(Is.clone(),r);T.scale.set(h*2,h*2,h*2),T.rotation.x=Math.PI/2,T.position.set(v,t,M),n.add(T)}const f=new w(he.clone(),s);c?f.scale.set(l*2+h,2,d*.15):f.scale.set(d*.15,2,l*2+h),f.position.y=t+1,n.add(f);const _=new w(he.clone(),s);c?(_.scale.set(l*2+h,2,d*.15),_.position.set(0,t+1,u*.6),f.position.set(0,t+1,-u*.6)):(_.scale.set(d*.15,2,l*2+h),_.position.set(u*.6,t+1,0),f.position.set(-u*.6,t+1,0)),n.add(_);const g=3;for(let m=0;m<g;m++){const p=-1+2*m/(g-1),v=new w(he.clone(),a);c?(v.scale.set(l*1.8,1.2,1.2),v.position.set(0,t-1,p*u*.5)):(v.scale.set(1.2,1.2,l*1.8),v.position.set(p*u*.5,t-1,0)),n.add(v)}for(const m of[-1,0,1]){const p=new w(he.clone(),a);p.scale.set(2.5,2.5,2.5),c?p.position.set(m*l*.6,t-2,0):p.position.set(0,t-2,m*l*.6),n.add(p)}for(const m of[-1,1]){const p=new w(he.clone(),s);p.scale.set(c?l*1.6:.6,.6,c?.6:l*1.6),p.rotation.z=m*.35,p.position.set(0,t*.5,c?m*u:0),c||(p.position.x=m*u),n.add(p)}for(let m=0;m<2;m++){const p=new w(he.clone(),a);p.scale.set(c?l*1.5:.4,.4,c?.4:l*1.5);const v=t*.7+m*2;c?p.position.set(0,v,(m-.5)*u*.8):p.position.set((m-.5)*u*.8,v,0),n.add(p)}}function V1(n,t,e,i,s){const a=new ye;a.name="obstacle";const r=Yh[bd%Yh.length];bd++;const o=Ht(e);o.emissive=new Bt(e).multiplyScalar(.15),o.emissiveIntensity=1;const d=Jt(r),c=Mt(r,.12);switch(n){case"tesla_coil":U1(a,t,i,s,o,d,c);break;case"power_cell":N1(a,t,i,s,o,d,c);break;case"circuit_monolith":yf(a,t,i,s,o,d,c);break;case"capacitor_bank":F1(a,t,i,s,o,d,c);break;case"relay_tower":O1(a,t,i,s,o,d,c);break;case"data_obelisk":B1(a,t,i,s,o,d,c);break;case"plasma_conduit":z1(a,t,i,s,o,d,c);break;case"power_pylon":H1(a,t,i,s,o,d,c);break;case"transformer_stack":G1(a,t,i,s,o,d,c);break;case"cable_rack":k1(a,t,i,s,o,d,c);break;default:yf(a,t,i,s,o,d,c)}return a}function W1(n){Ir=n,Yp(),Ws&&n.remove(Ws),wa&&n.remove(wa),Ws=new ye,Ws.name="grid";const t=new Hi(ti+200,Un+200),e=new Rp({color:657962,metalness:0,roughness:.95,emissive:789544,emissiveIntensity:.7}),i=new w(t,e);i.rotation.x=-Math.PI/2,i.position.set(ti/2,-.5,Un/2),Ws.add(i);const s=[];for(let h=0;h<=qt;h++){const l=h*J;s.push(l,.1,0),s.push(l,.1,Un)}for(let h=0;h<=Ke;h++){const l=h*J;s.push(0,.1,l),s.push(ti,.1,l)}const a=new cn;a.setAttribute("position",new _e(s,3));const r=new bp({color:2763376,transparent:!0,opacity:.8}),o=new Ng(a,r);Ws.add(o),n.add(Ws),wa=new ye,wa.name="obstacles",bd=0;const d=D1();for(const h of d){const l=h.cellsW*J,u=h.cellsD*J,f=V1(h.kind,h.height,h.color,l,u),_=(h.aabb.min.x+h.aabb.max.x)/2,g=(h.aabb.min.z+h.aabb.max.z)/2;f.position.set(_,0,g),f.userData.idOffset=Math.random()*Math.PI*2,wa.add(f)}n.add(wa),el=Mt(zt.BUILD_VALID,.3);const c=new Hi(J,J);ni=new w(c,el),ni.rotation.x=-Math.PI/2,ni.position.y=.5,ni.visible=!1,n.add(ni)}function X1(n,t,e){if(!ni)return;if(e&&e.length>0){ni.visible=!1;const s=.2+.15*Math.sin(n*4);for(;ji.length<e.length;){const a=new Hi(J,J),r=new Cn({transparent:!0,depthWrite:!1,side:$n,opacity:.3}),o=new w(a,r);o.rotation.x=-Math.PI/2,o.visible=!1,Ir&&Ir.add(o),ji.push(o)}for(let a=0;a<e.length;a++){const r=e[a],o=ji[a],d=tl(r.col,r.row,1,st);o.position.set(r.col*J+J/2,.5,r.row*J+J/2),o.material.color.setHex(d?zt.BUILD_VALID:zt.BUILD_INVALID),o.material.opacity=s,o.visible=!0}for(let a=e.length;a<ji.length;a++)ji[a].visible=!1;return}for(let s=0;s<ji.length;s++)ji[s].visible=!1;if(t&&t.col!==void 0&&t.row!==void 0){const s=t.size||1,a=tl(t.col,t.row,s,st);ni.geometry.dispose(),ni.geometry=new Hi(J*s,J*s),ni.position.set(t.col*J+J*s/2,.5,t.row*J+J*s/2);const r=a?zt.BUILD_VALID:zt.BUILD_INVALID;el.color.setHex(r),el.opacity=.2+.15*Math.sin(n*4),ni.visible=!0}else ni.visible=!1}function Yp(){for(const n of ji)n.geometry.dispose(),n.material.dispose(),Ir&&Ir.remove(n);ji=[]}function Ne(n){return new Bt(Math.min(1,n.r+.3),Math.min(1,n.g+.3),Math.min(1,n.b+.3))}function ai(n){return n instanceof Bt?n:Array.isArray(n)?new Bt(n[0]/255,n[1]/255,n[2]/255):new Bt(n)}function Lr(n,t){const e=n.team===st?zt.PLAYER:zt.ENEMY,i=new ye;switch(n.type){case Nn:$1(i,e);break;case Je:Z1(i,n);break;case ke:J1(i,n);break;case Xe:sE(i,n);break;case Be:dE(i,n);break;case on:fE(i,n);break;case Wt:_E(i,n);break}i.position.set(n.x,0,n.z),i.userData.baseY=0,i.userData.idOffset=n.idOffset,t.add(i),n.mesh=i}function mh(n,t){Wr(n,t),Lr(n,t)}function q1(n){if(!n.mesh)return{x:n.x,y:20,z:n.z};const t=n.mesh.userData.model||n.mesh;if(t.userData.muzzleFlash){const e=new F;return t.userData.muzzleFlash.getWorldPosition(e),{x:e.x,y:e.y,z:e.z}}return{x:n.x,y:20,z:n.z}}const nt=new Y(1,1,1),Oe=new Et(.5,.5,1,16),Y1=new Et(.35,.5,1,12),ae=new wt(.5,14,10),fn=new de(.5,.06,8,28),rr=new Za(.5,0),El=new vl(.5,0),$p=new $a(.5,1,8),ki=new Hi(1,1),Zp=new Et(.5,.5,1,6);function $1(n,t){const e=ai(t),i=Ht(e),s=Jt(Ne(e)),a=Mt(e,.15),r=[],o=[],d=new w(nt.clone(),i);d.scale.set(110,8,110),d.position.y=4,n.add(d);const c=new w(nt.clone(),s);c.scale.set(112,1.5,112),c.position.y=8.5,n.add(c),r.push(c);const h=new w(nt.clone(),i);h.scale.set(85,16,85),h.position.y=17,n.add(h);const l=new w(nt.clone(),s);l.scale.set(87,1.2,87),l.position.y=25.5,n.add(l),r.push(l);const u=new w(nt.clone(),i);u.scale.set(60,12,60),u.position.y=32,n.add(u);for(let T=0;T<4;T++){const b=Math.PI/4+Math.PI/2*T,A=Math.cos(b)*46,x=Math.sin(b)*46,S=new w(Y1.clone(),i);S.scale.set(10,36,10),S.position.set(A,18,x),n.add(S);const I=new w(fn.clone(),s);I.scale.set(12,12,12),I.rotation.x=Math.PI/2,I.position.set(A,30,x),n.add(I),r.push(I);const P=new w($p.clone(),s);P.scale.set(5,14,5),P.position.set(A,44,x),n.add(P),r.push(P)}for(let T=0;T<6;T++){const b=Math.PI*2/6*T,A=new w(nt.clone(),i);A.scale.set(2,28,2),A.position.set(Math.cos(b)*18,27,Math.sin(b)*18),n.add(A)}for(const T of[18,30,42]){const b=new w(fn.clone(),i);b.scale.set(38,38,38),b.rotation.x=Math.PI/2,b.position.y=T,n.add(b)}const f=new w(ae.clone(),s);f.scale.set(20,20,20),f.position.y=32,n.add(f),r.push(f);const _=new w(ae.clone(),a);_.scale.set(30,30,30),_.position.y=32,n.add(_),o.push(_);const g=new w(fn.clone(),s);g.scale.set(50,50,50),g.rotation.x=Math.PI/3,g.rotation.z=Math.PI/6,g.position.y=38,n.add(g),r.push(g);const m=new w(fn.clone(),s);m.scale.set(50,50,50),m.rotation.x=-Math.PI/4,m.rotation.z=-Math.PI/5,m.position.y=38,n.add(m),r.push(m);for(let T=0;T<8;T++){const b=Math.PI*2/8*T,A=Math.cos(b)*44,x=Math.sin(b)*44,S=new w(nt.clone(),i);S.scale.set(6,14,2.5),S.position.set(A,17,x),S.rotation.y=-b,n.add(S)}for(let T=-1;T<=1;T+=2){const b=new w(nt.clone(),s);b.scale.set(58,1,1.2),b.position.set(0,38.5,T*22),n.add(b),r.push(b);const A=new w(nt.clone(),s);A.scale.set(1.2,1,44),A.position.set(T*22,38.5,0),n.add(A),r.push(A)}const p=new w(Oe.clone(),i);p.scale.set(3,16,3),p.position.y=50,n.add(p);const v=new w(rr.clone(),s);v.scale.set(6,6,6),v.position.y=60,n.add(v),r.push(v);const M=new w(ae.clone(),a);M.scale.set(12,12,12),M.position.y=60,n.add(M),o.push(M);const y=new w(ki.clone(),Mt(e,.1));y.scale.set(130,130,1),y.rotation.x=-Math.PI/2,y.position.y=.2,n.add(y),o.push(y),n.userData.accentParts=r,n.userData.glowParts=o,n.userData.orbitRings=[g,m]}function Z1(n,t){const e=t.team===st?zt.PLAYER:zt.ENEMY,i=ai(e);t.branch==="A"?j1(n,i):t.branch==="B"?K1(n,i):t.level>=2?_h(n,i):t.level>=1?Kp(n,i):jp(n,i),n.userData.isBarracks=!0}function jp(n,t){const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.15),a=[],r=[],o=new w(nt.clone(),e);o.scale.set(68,4,68),o.position.y=2,n.add(o);const d=new w(nt.clone(),i);d.scale.set(70,1,70),d.position.y=4.5,n.add(d),a.push(d);const c=new w(nt.clone(),e);c.scale.set(62,22,58),c.position.y=15,n.add(c);for(let M=-1;M<=1;M+=2){const y=new w(nt.clone(),e);y.scale.set(64,2.5,34),y.position.set(0,29,M*8),y.rotation.x=M*.22,n.add(y)}const h=new w(nt.clone(),i);h.scale.set(66,1.5,3),h.position.y=30.5,n.add(h),a.push(h);for(let M=-1;M<=1;M+=2){for(let T=0;T<3;T++){const b=-20+T*20,A=new w(nt.clone(),e);A.scale.set(4,18,2.5),A.position.set(b,15,M*30),n.add(A)}const y=new w(nt.clone(),i);y.scale.set(50,1.2,.8),y.position.set(0,22,M*30.5),n.add(y),a.push(y)}const l=new w(nt.clone(),e);l.scale.set(3,18,4),l.position.set(-18,13,-30),n.add(l);const u=new w(nt.clone(),e);u.scale.set(3,18,4),u.position.set(18,13,-30),n.add(u);const f=new w(nt.clone(),i);f.scale.set(40,2,3),f.position.set(0,23,-30),n.add(f),a.push(f);const _=new w(ki.clone(),Mt(Ne(t),.2));_.scale.set(32,16,1),_.position.set(0,13,-30.5),n.add(_),r.push(_);for(let M=-1;M<=1;M+=2)for(let y=-1;y<=1;y+=2){const T=new w(nt.clone(),e);T.scale.set(4,26,4),T.position.set(M*30,15,y*28),n.add(T)}const g=new w(Oe.clone(),e);g.scale.set(3,10,3),g.position.set(-20,36,-14),n.add(g);const m=new w(ae.clone(),i);m.scale.set(5,5,5),m.position.set(-20,42,-14),n.add(m),a.push(m);const p=new w(ae.clone(),s);p.scale.set(10,10,10),p.position.set(-20,42,-14),n.add(p),r.push(p);const v=new w(ki.clone(),Mt(t,.08));v.scale.set(80,80,1),v.rotation.x=-Math.PI/2,v.position.y=.15,n.add(v),r.push(v),n.userData.accentParts=a,n.userData.glowParts=r}function Kp(n,t){jp(n,t);const e=Ht(t),i=Jt(Ne(t)),s=n.userData.accentParts;n.userData.glowParts;const a=new w(Oe.clone(),e);a.scale.set(5,6,5),a.position.set(18,34,12),n.add(a);const r=new w(ae.clone(),e);r.scale.set(12,4,12),r.position.set(18,38,12),n.add(r);const o=new w(ae.clone(),i);o.scale.set(3,3,3),o.position.set(18,42,12),n.add(o),s.push(o);for(let c=0;c<3;c++){const h=-14+c*14,l=new w(nt.clone(),e);l.scale.set(6,6,2),l.position.set(h,10,30),n.add(l);const u=new w(nt.clone(),i);u.scale.set(4,4,.6),u.position.set(h,10,31.2),n.add(u),s.push(u)}const d=new w(fn.clone(),i);d.scale.set(42,42,42),d.rotation.x=Math.PI/2,d.position.y=26,n.add(d),s.push(d)}function _h(n,t){Kp(n,t);const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let h=-1;h<=1;h+=2){const l=new w(nt.clone(),e);l.scale.set(3,20,40),l.position.set(h*34,14,0),n.add(l)}const o=new w(Oe.clone(),e);o.scale.set(3,10,3),o.position.set(22,36,-14),n.add(o);const d=new w(ae.clone(),i);d.scale.set(5,5,5),d.position.set(22,42,-14),n.add(d),a.push(d);const c=new w(ae.clone(),s);c.scale.set(10,10,10),c.position.set(22,42,-14),n.add(c),r.push(c);for(let h=-1;h<=1;h+=2){const l=new w(nt.clone(),i);l.scale.set(60,.8,1),l.position.set(0,31,h*4),n.add(l),a.push(l)}}function j1(n,t){_h(n,t);const e=Jt(Ne(t)),i=Mt(t,.2),s=n.userData.accentParts,a=n.userData.glowParts,r=new w(nt.clone(),Ht(t));r.scale.set(5,20,5),r.position.set(-22,14,-30),n.add(r);const o=new w(nt.clone(),Ht(t));o.scale.set(5,20,5),o.position.set(22,14,-30),n.add(o);const d=new w(ki.clone(),i);d.scale.set(44,20,1),d.position.set(0,14,-31),n.add(d),a.push(d);for(let c=0;c<3;c++){const h=new w(Oe.clone(),e);h.scale.set(1,12,1),h.position.set(-16+c*16,38,0),n.add(h),s.push(h)}}function K1(n,t){_h(n,t);const e=Jt(Ne(t));Mt(t,.2);const i=n.userData.accentParts,s=n.userData.glowParts;for(let o=-1;o<=1;o+=2)for(let d=0;d<3;d++){const c=new w(nt.clone(),e);c.scale.set(58,.6,.6),c.position.set(0,10+d*5,o*31),n.add(c),i.push(c)}const a=new w(ki.clone(),Mt(Ne(t),.2));a.scale.set(28,14,1),a.position.set(0,12,30.5),n.add(a),s.push(a);const r=new w(fn.clone(),e);r.scale.set(24,24,24),r.rotation.x=Math.PI/2,r.position.y=32,n.add(r),i.push(r)}function J1(n,t){const e=t.team===st?zt.PLAYER:zt.ENEMY,i=ai(e),s=new ye;t.branch==="A"?nE(s,i):t.branch==="B"?iE(s,i):t.level>=2?eE(s,i):t.level>=1?tE(s,i):Q1(s,i),n.add(s),n.userData.model=s,n.userData.disc=s.userData.disc,n.userData.turretPivot=s.userData.turretPivot,n.userData.barrel=s.userData.barrel,n.userData.barrelY=s.userData.barrelY,n.userData.barrelDist=s.userData.barrelDist,n.userData.muzzleFlash=s.userData.muzzleFlash,n.userData.isPulseTurret=!0}function Q1(n,t){const e=new w(new Et(10,12,16,12),Ht(t));e.position.y=8,n.add(e);const i=new w(new Et(8,10,3,12),Ht(t));i.position.y=17.5,n.add(i);const s=new ye;s.position.y=18;const a=new w(new Et(1.5,1.5,10,6),Ht(t));a.rotation.z=Math.PI/2,a.position.set(9,0,0),s.add(a),n.add(s);const r=new Cn({color:new Bt(1,1,1)}),o=new w(new wt(2,8,6),r);o.position.set(14,0,0),o.visible=!1,s.add(o),n.userData.disc=null,n.userData.turretPivot=s,n.userData.barrel=a,n.userData.barrelY=18,n.userData.barrelDist=9,n.userData.muzzleFlash=o}function tE(n,t){const e=new w(new Et(11,13,22,12),Ht(t));e.position.y=11,n.add(e);const i=new w(new de(12,1.5,6,18),Ht(t));i.position.y=16,i.rotation.x=Math.PI/2,n.add(i);const s=new w(new Et(9,11,3,12),Ht(t));s.position.y=24,n.add(s);const a=new ye;a.position.y=25;const r=new w(new Et(1.5,1.5,14,6),Ht(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r),n.add(a);const o=new Cn({color:new Bt(1,1,1)}),d=new w(new wt(2,8,6),o);d.position.set(18,0,0),d.visible=!1,a.add(d),n.userData.disc=null,n.userData.turretPivot=a,n.userData.barrel=r,n.userData.barrelY=25,n.userData.barrelDist=11,n.userData.muzzleFlash=d}function eE(n,t){const e=new w(new Et(12,14,25,14),Ht(t));e.position.y=12.5,n.add(e);const i=new w(new de(13,2,6,20),Jt(Ne(t)));i.position.y=18,i.rotation.x=Math.PI/2,n.add(i);const s=new w(new Et(10,10,3,16),Ht(t));s.position.y=27,n.add(s);const a=new ye;a.position.y=28;const r=new w(new Et(1.5,1.5,14,6),Ht(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r);const o=new w(new Et(2.5,1.5,3,6),Jt(Ne(t)));o.rotation.z=Math.PI/2,o.position.set(19,0,0),a.add(o),n.add(a);const d=new Cn({color:new Bt(1,1,1)}),c=new w(new wt(2.5,8,6),d);c.position.set(21,0,0),c.visible=!1,a.add(c),n.userData.disc=s,n.userData.turretPivot=a,n.userData.barrel=r,n.userData.barrelY=28,n.userData.barrelDist=11,n.userData.muzzleFlash=c}function nE(n,t){const e=new w(new Et(8,11,35,12),Ht(t));e.position.y=17.5,n.add(e);for(let u=0;u<4;u++){const f=u/4*Math.PI*2,_=new w(new Y(1.2,18,6),Ht(t));_.position.set(Math.cos(f)*9,22,Math.sin(f)*9),_.rotation.y=-f,n.add(_)}const i=new w(new de(9,1.2,6,18),Jt(Ne(t)));i.position.y=32,i.rotation.x=Math.PI/2,n.add(i);const s=new w(new Et(7,7,2,14),Ht(t));s.position.y=34,n.add(s);const a=new w(new Et(11,11,3,16),Ht(t));a.position.y=38,n.add(a);const r=new ye;r.position.y=38;const o=[-1.8,1.8,0];let d=null;for(let u=0;u<3;u++){const f=new w(new Et(1,1,16,6),Jt(Ne(t)));f.rotation.z=Math.PI/2,f.position.set(12,o[u],0),r.add(f),u===2&&(d=f)}const c=new w(new de(2.5,.5,4,10),Jt(Ne(t)));c.position.set(20,0,0),c.rotation.y=Math.PI/2,r.add(c),n.add(r);const h=new Cn({color:new Bt(1,1,1)}),l=new w(new wt(2.5,8,6),h);l.position.set(22,0,0),l.visible=!1,r.add(l),n.userData.disc=a,n.userData.turretPivot=r,n.userData.barrel=d,n.userData.barrelY=38,n.userData.barrelDist=12,n.userData.muzzleFlash=l}function iE(n,t){const e=new w(new Et(13,14,28,14),Ht(t));e.position.y=14,n.add(e);for(let l=0;l<4;l++){const u=l/4*Math.PI*2+Math.PI/4,f=new w(new Y(4,22,2),Ht(t));f.position.set(Math.cos(u)*12,13,Math.sin(u)*12),f.rotation.y=-u,n.add(f)}const i=new w(new de(14,2.5,6,18),Ht(t));i.position.y=26,i.rotation.x=Math.PI/2,n.add(i);const s=new ye;s.position.y=28;const a=new w(new Et(10,12,8,12),Ht(t));a.position.y=4,s.add(a);for(let l=0;l<2;l++){const u=l===0?-1:1,f=new w(new Y(3,6,10),Ht(t));f.position.set(u*10,5,0),s.add(f)}const r=new w(new Et(3.5,4,22,8),Ht(t));r.rotation.z=Math.PI/2,r.position.set(16,6,0),s.add(r);const o=new w(new $a(6,6,8),Jt(Ne(t)));o.rotation.z=-Math.PI/2,o.position.set(28,6,0),s.add(o);const d=new w(new de(5,.8,6,14),new Cn({color:Ne(t),transparent:!0,opacity:.7}));d.position.set(24,6,0),d.rotation.y=Math.PI/2,s.add(d),n.add(s);const c=new Cn({color:new Bt(1,1,1)}),h=new w(new wt(3.5,8,6),c);h.position.set(30,6,0),h.visible=!1,s.add(h),n.userData.disc=null,n.userData.turretPivot=s,n.userData.barrel=r,n.userData.barrelY=34,n.userData.barrelDist=16,n.userData.muzzleFlash=h}function sE(n,t){const e=zt.FACTORY,i=ai(e);t.branch==="A"?aE(n,i):t.branch==="B"?rE(n,i):t.level>=2?gh(n,i):t.level>=1?Qp(n,i):Jp(n,i),n.userData.isFactory=!0}function Jp(n,t){const e=Ht(t),i=Jt(Ne(t));Mt(t,.15);const s=[],a=[],r=new w(nt.clone(),e);r.scale.set(76,5,76),r.position.y=2.5,n.add(r);const o=new w(nt.clone(),i);o.scale.set(78,1.2,78),o.position.y=5.5,n.add(o),s.push(o);const d=new w(nt.clone(),e);d.scale.set(70,18,68),d.position.y=14,n.add(d);const c=new w(nt.clone(),e);c.scale.set(56,14,54),c.position.y=30,n.add(c);const h=new w(nt.clone(),i);h.scale.set(72,1.5,70),h.position.y=23.5,n.add(h),s.push(h);const l=new w(nt.clone(),i);l.scale.set(58,1.2,56),l.position.y=37.5,n.add(l),s.push(l);for(let g=-1;g<=1;g+=2){const m=new w(Oe.clone(),e);m.scale.set(8,32,8),m.position.set(g*22,38,24),n.add(m);for(const M of[28,38,48]){const y=new w(fn.clone(),e);y.scale.set(12,12,12),y.rotation.x=Math.PI/2,y.position.set(g*22,M,24),n.add(y)}const p=new w(Oe.clone(),e);p.scale.set(11,3,11),p.position.set(g*22,55,24),n.add(p);const v=new w(ae.clone(),Mt(16752680,.2));v.scale.set(10,6,10),v.position.set(g*22,57,24),n.add(v),a.push(v)}const u=new w(nt.clone(),e);u.scale.set(40,2,30),u.position.set(0,6,-28),n.add(u);for(let g=-1;g<=1;g+=2){const m=new w(nt.clone(),i);m.scale.set(1.5,1,28),m.position.set(g*10,7.5,-28),n.add(m),s.push(m)}const f=new w(ki.clone(),Mt(Ne(t),.25));f.scale.set(24,10,1),f.position.set(0,16,-35),n.add(f),a.push(f);for(let g=-1;g<=1;g+=2)for(let m=-1;m<=1;m+=2){const p=new w(ae.clone(),i);p.scale.set(3,3,3),p.position.set(g*26,38,m*25),n.add(p),s.push(p)}const _=new w(ki.clone(),Mt(t,.08));_.scale.set(90,90,1),_.rotation.x=-Math.PI/2,_.position.y=.15,n.add(_),a.push(_),n.userData.accentParts=s,n.userData.glowParts=a}function Qp(n,t){Jp(n,t);const e=Ht(t),i=Jt(Ne(t)),s=n.userData.accentParts;for(let h=-1;h<=1;h+=2){const l=new w(nt.clone(),e);l.scale.set(4,36,4),l.position.set(h*24,24,-28),n.add(l)}const a=new w(nt.clone(),e);a.scale.set(52,4,5),a.position.set(0,44,-28),n.add(a);const r=new w(nt.clone(),i);r.scale.set(54,1,1.5),r.position.set(0,46.5,-28),n.add(r),s.push(r);const o=new w(nt.clone(),e);o.scale.set(10,5,6),o.position.set(0,41,-28),n.add(o);const d=new w(Oe.clone(),i);d.scale.set(1.5,14,1.5),d.position.set(0,32,-28),n.add(d),s.push(d);const c=new w(rr.clone(),i);c.scale.set(5,5,5),c.position.set(0,24,-28),n.add(c),s.push(c);for(let h=-1;h<=1;h+=2)for(let l=0;l<2;l++){const u=-10+l*20,f=new w(nt.clone(),e);f.scale.set(3,12,14),f.position.set(h*36,14,u),n.add(f);const _=new w(Oe.clone(),i);_.scale.set(3,1.5,3),_.rotation.z=Math.PI/2,_.position.set(h*37.5,16,u),n.add(_),s.push(_)}}function gh(n,t){Qp(n,t);const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let h=-1;h<=1;h+=2){const l=new w(Oe.clone(),e);l.scale.set(3,18,3),l.rotation.x=Math.PI/2,l.position.set(h*22,20,12),n.add(l);const u=new w(fn.clone(),i);u.scale.set(5,5,5),u.position.set(h*22,20,8),n.add(u),a.push(u)}const o=new w(Oe.clone(),e);o.scale.set(14,4,14),o.position.y=39,n.add(o);const d=new w(fn.clone(),i);d.scale.set(16,16,16),d.rotation.x=Math.PI/2,d.position.y=41.5,n.add(d),a.push(d);const c=new w(ae.clone(),s);c.scale.set(12,4,12),c.position.y=41.5,n.add(c),r.push(c)}function aE(n,t){gh(n,t);const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts;for(let d=-1;d<=1;d+=2){const c=new w(nt.clone(),e);c.scale.set(4,30,60),c.position.set(d*38,18,0),n.add(c);const h=new w(nt.clone(),e);h.scale.set(60,30,4),h.position.set(0,18,d*38),n.add(h)}for(let d=0;d<2;d++){const c=new w(nt.clone(),i);c.scale.set(70,1.5,1.5),c.rotation.y=Math.PI/4+d*Math.PI/2,c.position.y=38,n.add(c),a.push(c)}const o=new w(ki.clone(),s);o.scale.set(30,14,1),o.position.set(0,18,-36),n.add(o),r.push(o)}function rE(n,t){gh(n,t);const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts,o=new w(Oe.clone(),e);o.scale.set(2.5,22,2.5),o.position.set(0,52,0),n.add(o);const d=new w(rr.clone(),i);d.scale.set(5,5,5),d.position.set(0,64,0),n.add(d),a.push(d);const c=new w(ae.clone(),s);c.scale.set(10,10,10),c.position.set(0,64,0),n.add(c),r.push(c);for(let h=-1;h<=1;h+=2){const l=new w(Oe.clone(),e);l.scale.set(4,20,4),l.rotation.z=Math.PI/2,l.position.set(h*20,30,-32),n.add(l);const u=new w($p.clone(),i);u.scale.set(5,5,5),u.rotation.z=h*-Math.PI/2,u.position.set(h*32,30,-32),n.add(u),a.push(u)}}function oE(n,t){const e=.016666666666666666;for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0;if(a.position.y=a.userData.baseY,a.userData.isPulseTurret&&lE(a,s,n,e),(a.userData.isBarracks||a.userData.isFactory||a.userData.isHelipad)&&cE(a,s,n),a.userData.isGenerator){const c=a.userData.energyCore;if(c){const u=1+.12*Math.sin(n*3+r);c.scale.setScalar(8*u)}const h=a.userData.energyRing;h&&(h.rotation.y=n*1.2+r,h.rotation.x=Math.sin(n*.5+r)*.3);const l=a.userData.energyRing2;l&&(l.rotation.y=-n*.9+r+2)}if(a.userData.isWall){if(s.constructionState==="repairing"){const c=.3+.4*Math.sin(n*6),h=a.userData.glowParts;if(h)for(let l=0;l<h.length;l++)h[l].material.opacity=c}if(s.hp<s.maxHp*.5){const c=Math.random()>.85?.3:0,h=a.userData.glowParts;if(h&&!s.constructionState)for(let l=0;l<h.length;l++){const u=h[l].material;u.userData||(u.userData={}),u.userData.baseOpacity==null&&(u.userData.baseOpacity=u.opacity),u.opacity=u.userData.baseOpacity+c}}}if(a.userData.orbitRings){const c=a.userData.orbitRings;c[0]&&(c[0].rotation.y=n*.6+r),c[1]&&(c[1].rotation.y=-n*.45+r+1.5)}const o=a.userData.glowParts;if(o)for(let c=0;c<o.length;c++){const h=o[c].material;if(h.transparent){const l=h.userData?.baseOpacity??h.opacity;h.userData||(h.userData={}),h.userData.baseOpacity=l,h.opacity=l+.1*Math.sin(n*2.5+r)}}if(s.type===ke||s.type===Je||s.type===Xe||s.type===Be||s.type===on||s.type===Wt)if(s.constructionState==="building"){const c=s.constructionTimer/s.constructionDuration;a.scale.setScalar(.3+.7*c)}else a.scale.setScalar(1);else if(s.buildProgress<s.buildTime){const c=s.buildProgress/s.buildTime;a.scale.setScalar(.3+.7*c)}else a.scale.setScalar(1);if(s.hitFlashTimer&&s.hitFlashTimer>0){const c=s.hitFlashTimer/$f;yE(a,c),s.hitFlashTimer-=e,s.hitFlashTimer<0&&(s.hitFlashTimer=0)}}}function lE(n,t,e,i){if(n.userData.turretPivot&&t.targetX!==void 0&&t.targetZ!==void 0){const a=t.targetX-t.x,r=t.targetZ-t.z,o=Math.atan2(-r,a);let d=n.userData.turretPivot.rotation.y,c=o-d;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;n.userData.turretPivot.rotation.y=d+c*.15}n.userData.disc&&i&&(n.userData.disc.rotation.y+=i*1.5);const s=performance.now()-(t.lastFireTime||0);if(s<250){const a=n.userData.muzzleFlash;if(a){a.visible=s<120;const o=4*Math.max(0,1-s/120);a.scale.setScalar(o)}const r=n.userData.barrel;if(r){const o=t.branch==="A"?2:3.5,d=t.branch==="A"?100:200,c=o*Math.exp(-s*4/d),h=n.userData.barrelDist||9;r.position.x=h-c}}else{const a=n.userData.muzzleFlash;a&&(a.visible=!1);const r=n.userData.barrel;r&&(r.position.x=n.userData.barrelDist||9)}if(t.constructionState==="upgrading"||t.constructionState==="branching"){const a=.5+.3*Math.sin(e*4);n.traverse(r=>{r.isMesh&&r.material&&r.material.opacity!==void 0&&r.material.transparent&&(r.material.opacity=a*.5)})}}function cE(n,t,e){if(t.constructionState==="upgrading"||t.constructionState==="branching"){const i=.5+.3*Math.sin(e*4);n.traverse(s=>{s.isMesh&&s.material&&s.material.opacity!==void 0&&s.material.transparent&&(s.material.opacity=i*.5)})}}function Wr(n,t){n.mesh&&(t.remove(n.mesh),SE(n.mesh),n.mesh=null)}function dE(n,t){const e=ai(zt.GOLD);t.branch==="A"?hE(n,e):t.branch==="B"?uE(n,e):t.level>=2?xh(n,e):t.level>=1?em(n,e):tm(n,e),n.userData.isGenerator=!0}function tm(n,t){const e=Ht(t),i=Jt(t),s=Mt(t,.18),a=[],r=[],o=new w(Zp.clone(),e);o.scale.set(16,6,16),o.position.y=3,n.add(o);const d=new w(fn.clone(),i);d.scale.set(20,20,20),d.rotation.x=Math.PI/2,d.position.y=6.5,n.add(d),a.push(d);for(let f=0;f<3;f++){const _=Math.PI*2/3*f,g=Math.cos(_)*9,m=Math.sin(_)*9,p=new w(Oe.clone(),e);p.scale.set(2,12,2),p.position.set(g,12,m),n.add(p);const v=new w(ae.clone(),i);v.scale.set(3,3,3),v.position.set(g,19,m),n.add(v),a.push(v)}const c=new w(El.clone(),i);c.scale.set(8,8,8),c.position.y=22,n.add(c),a.push(c);const h=new w(ae.clone(),s);h.scale.set(13,13,13),h.position.y=22,n.add(h),r.push(h);const l=new w(fn.clone(),i);l.scale.set(18,18,18),l.position.y=22,n.add(l),a.push(l);const u=new w(fn.clone(),s);u.scale.set(15,15,15),u.position.y=22,u.rotation.x=Math.PI/3,n.add(u),r.push(u),n.userData.energyCore=c,n.userData.energyRing=l,n.userData.energyRing2=u,n.userData.coreGlow=h,n.userData.accentParts=a,n.userData.glowParts=r}function em(n,t){tm(n,t);const e=Ht(t),i=Jt(t),s=n.userData.accentParts;for(let r=0;r<3;r++){const o=Math.PI*2/3*r+Math.PI/3,d=Math.cos(o)*11,c=Math.sin(o)*11,h=new w(Oe.clone(),e);h.scale.set(1.8,14,1.8),h.position.set(d,13,c),n.add(h);const l=new w(ae.clone(),i);l.scale.set(2.5,2.5,2.5),l.position.set(d,21,c),n.add(l),s.push(l)}const a=new w(fn.clone(),i);a.scale.set(14,14,14),a.rotation.x=Math.PI/2,a.position.y=14,n.add(a),s.push(a)}function xh(n,t){em(n,t);const e=Ht(t),i=Jt(t),s=Mt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts,o=new w(Oe.clone(),e);o.scale.set(1.5,14,1.5),o.position.y=33,n.add(o);const d=new w(rr.clone(),i);d.scale.set(4,4,4),d.position.y=41,n.add(d),a.push(d);const c=new w(fn.clone(),i);c.scale.set(12,12,12),c.rotation.x=Math.PI/2,c.position.y=28,n.add(c),a.push(c);const h=new w(ae.clone(),s);h.scale.set(18,18,18),h.position.y=22,n.add(h),r.push(h)}function hE(n,t){xh(n,t);const e=Jt(t),i=Mt(t,.3),s=n.userData.accentParts,a=n.userData.glowParts,r=new w(El.clone(),e);r.scale.set(12,12,12),r.position.y=22,n.add(r),s.push(r),n.userData.energyCore=r;for(let d=0;d<6;d++){const c=Math.PI*2/6*d,h=Math.cos(c)*10,l=Math.sin(c)*10,u=new w(Oe.clone(),e);u.scale.set(.5,14,.5),u.rotation.z=Math.PI/2,u.rotation.y=-c,u.position.set(h*.5,20,l*.5),n.add(u),s.push(u)}const o=new w(ae.clone(),i);o.scale.set(24,24,24),o.position.y=22,n.add(o),a.push(o)}function uE(n,t){xh(n,t);const e=Ht(t),i=Jt(t),s=Mt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let d=0;d<4;d++){const c=Math.PI/4+Math.PI/2*d,h=Math.cos(c)*16,l=Math.sin(c)*16,u=new w(nt.clone(),e);u.scale.set(5,8,5),u.position.set(h,4,l),n.add(u);const f=new w(nt.clone(),i);f.scale.set(5.5,1,5.5),f.position.set(h,8.5,l),n.add(f),a.push(f);const _=new w(Oe.clone(),i);_.scale.set(.4,16,.4),_.rotation.z=Math.PI/2,_.rotation.y=-c,_.position.set(h*.5,6,l*.5),n.add(_),a.push(_)}const o=new w(fn.clone(),s);o.scale.set(30,30,30),o.rotation.x=Math.PI/2,o.position.y=.3,n.add(o),r.push(o)}function fE(n,t){const e=t.team===st?zt.PLAYER:zt.ENEMY,i=ai(e);t.branch==="A"?pE(n,i):t.branch==="B"?mE(n,i):t.level>=2?vh(n,i):t.level>=1?im(n,i):nm(n,i),n.userData.isHelipad=!0}function nm(n,t){const e=ai(zt.HELIPAD),i=Ht(t),s=Jt(e),a=Mt(e,.12),r=[],o=[],d=J*2,c=new w(nt.clone(),i);c.scale.set(d,3,d),c.position.y=1.5,n.add(c);const h=new w(nt.clone(),s);h.scale.set(d+2,.8,d+2),h.position.y=3.2,n.add(h),r.push(h);const l=new w(nt.clone(),i);l.scale.set(d*.75,1.5,d*.75),l.position.y=3.8,n.add(l);const u=4.8,f=3,_=.4,g=d*.35,m=d*.25,p=new w(nt.clone(),s);p.scale.set(f,_,g),p.position.set(-m/2,u,0),n.add(p),r.push(p);const v=new w(nt.clone(),s);v.scale.set(f,_,g),v.position.set(m/2,u,0),n.add(v),r.push(v);const M=new w(nt.clone(),s);M.scale.set(m+f,_,f),M.position.set(0,u,0),n.add(M),r.push(M);const y=new w(ki.clone(),Mt(e,.08));y.scale.set(m+f+6,g+6,1),y.rotation.x=-Math.PI/2,y.position.y=4.6,n.add(y),o.push(y);const T=d*.42,b=[[-T,5,-T],[T,5,-T],[-T,5,T],[T,5,T]];for(const[V,H,et]of b){const tt=new w(Oe.clone(),i);tt.scale.set(1.5,6,1.5),tt.position.set(V,3,et),n.add(tt);const ht=new w(ae.clone(),s);ht.scale.setScalar(3),ht.position.set(V,H+2,et),n.add(ht),r.push(ht);const ot=new w(ae.clone(),a);ot.scale.setScalar(5),ot.position.set(V,H+2,et),n.add(ot),o.push(ot)}const A=new w(fn.clone(),a);A.scale.set(d*.9,d*.9,d*.9),A.rotation.x=Math.PI/2,A.position.y=4,n.add(A),o.push(A);const x=Jt(e);for(let V=-1;V<=1;V+=2){const H=new w(nt.clone(),x);H.scale.set(d*.8,.5,.8),H.position.set(0,3,V*(d*.48)),n.add(H),r.push(H);const et=new w(nt.clone(),x);et.scale.set(.8,.5,d*.8),et.position.set(V*(d*.48),3,0),n.add(et),r.push(et)}const S=T-5,I=-T+5,P=new w(nt.clone(),i);P.scale.set(5,10,5),P.position.set(S,5,I),n.add(P);const N=new w(nt.clone(),s);N.scale.set(5.5,1,5.5),N.position.set(S,10.5,I),n.add(N),r.push(N);const L=new w(Oe.clone(),i);L.scale.set(.8,12,.8),L.position.set(S,17,I),n.add(L);const k=new w(ae.clone(),s);k.scale.setScalar(2),k.position.set(S,23.5,I),n.add(k),r.push(k);const B=new w(ae.clone(),Mt(e,.2));B.scale.setScalar(3.5),B.position.set(S,23.5,I),n.add(B),o.push(B),n.userData.accentParts=r,n.userData.glowParts=o}function im(n,t){nm(n,t);const e=ai(zt.HELIPAD),i=Ht(t),s=Jt(e),a=n.userData.accentParts,r=J*2,o=r*.42;for(let h=-1;h<=1;h+=2){const l=new w(Oe.clone(),i);l.scale.set(4,6,4),l.rotation.z=Math.PI/2,l.position.set(h*14,5,o-2),n.add(l);const u=new w(ae.clone(),s);u.scale.set(4,4,4),u.position.set(h*14+h*3,5,o-2),n.add(u),a.push(u)}const d=Jt(e);for(let h=-1;h<=1;h+=2){const l=new w(nt.clone(),d);l.scale.set(r*.5,.3,.6),l.position.set(0,4.9,h*(r*.2)),n.add(l),a.push(l)}const c=[[-o,-o],[o,-o],[-o,o],[o,o]];for(const[h,l]of c){const u=new w(Oe.clone(),i);u.scale.set(1.2,4,1.2),u.position.set(h,10,l),n.add(u);const f=new w(ae.clone(),s);f.scale.setScalar(2),f.position.set(h,12.5,l),n.add(f),a.push(f)}}function vh(n,t){im(n,t);const e=ai(zt.HELIPAD),i=Ht(t),s=Jt(e),a=Mt(e,.15),r=n.userData.accentParts,o=n.userData.glowParts,c=J*2*.42,h=c-5,l=-c+5,u=new w(Oe.clone(),i);u.scale.set(1,6,1),u.position.set(h,27,l),n.add(u);const f=new w(ae.clone(),i);f.scale.set(8,3,8),f.position.set(h,31,l),n.add(f);const _=new w(ae.clone(),s);_.scale.set(2,2,2),_.position.set(h,33,l),n.add(_),r.push(_);for(let g=-1;g<=1;g+=2)for(let m=-1;m<=1;m+=2){const p=new w(ae.clone(),s);p.scale.setScalar(1.5),p.position.set(g*18,5,m*18),n.add(p),r.push(p);const v=new w(ae.clone(),a);v.scale.setScalar(3),v.position.set(g*18,5,m*18),n.add(v),o.push(v)}for(let g=0;g<8;g++){const m=Math.PI*2/8*g,p=Math.cos(m)*(c+2),v=Math.sin(m)*(c+2),M=new w(nt.clone(),i);M.scale.set(1,8,1),M.position.set(p,4,v),n.add(M);const y=new w(ae.clone(),s);y.scale.setScalar(1.2),y.position.set(p,8.5,v),n.add(y),r.push(y)}}function pE(n,t){vh(n,t);const e=ai(zt.HELIPAD),i=Ht(t),s=Jt(e),a=Mt(e,.2),r=n.userData.accentParts,o=n.userData.glowParts,c=J*2*.42;for(let f=-1;f<=1;f+=2)for(let _=0;_<2;_++){const g=-12+_*24,m=new w(nt.clone(),i);m.scale.set(6,5,10),m.position.set(f*(c-8),2.5,g),n.add(m);const p=new w(nt.clone(),s);p.scale.set(6.5,.8,10.5),p.position.set(f*(c-8),5.5,g),n.add(p),r.push(p)}for(let f=-1;f<=1;f+=2){const _=new w(nt.clone(),i);_.scale.set(3,28,3),_.position.set(f*28,14,0),n.add(_)}const h=new w(nt.clone(),i);h.scale.set(60,3,4),h.position.set(0,29,0),n.add(h);const l=new w(nt.clone(),s);l.scale.set(62,.8,1),l.position.set(0,31,0),n.add(l),r.push(l);for(let f=0;f<3;f++){const _=-16+f*16,g=new w(nt.clone(),i);g.scale.set(4,3,4),g.position.set(_,1.5,c-10),n.add(g);const m=new w(nt.clone(),s);m.scale.set(2,.3,2),m.position.set(_,3.2,c-10),n.add(m),r.push(m)}const u=new w(ki.clone(),a);u.scale.set(50,50,1),u.rotation.x=-Math.PI/2,u.position.y=4.7,n.add(u),o.push(u)}function mE(n,t){vh(n,t);const e=ai(zt.HELIPAD),i=Ht(t),s=Jt(e),a=Mt(e,.18),r=n.userData.accentParts,o=n.userData.glowParts,d=J*2,c=d*.42;for(let l=-1;l<=1;l+=2)for(let u=0;u<3;u++){const f=new w(nt.clone(),s);f.scale.set(d*.7,.3,.5),f.position.set(0,4.9,l*(8+u*6)),n.add(f),r.push(f)}for(let l=-1;l<=1;l+=2){const u=new w(nt.clone(),i);u.scale.set(d*.85,2,3),u.position.set(0,3.5,l*22),n.add(u);const f=new w(nt.clone(),s);f.scale.set(d*.85,.5,1),f.position.set(0,4.8,l*22),n.add(f),r.push(f)}const h=[[0,-c],[0,c],[-c,0],[c,0]];for(const[l,u]of h){const f=new w(Oe.clone(),i);f.scale.set(1.5,14,1.5),f.position.set(l,7,u),n.add(f);const _=new w(ae.clone(),s);_.scale.setScalar(3),_.position.set(l,15,u),n.add(_),r.push(_);const g=new w(ae.clone(),a);g.scale.setScalar(5),g.position.set(l,15,u),n.add(g),o.push(g)}}function _E(n,t){const e=t.team===st?zt.PLAYER:zt.ENEMY,i=ai(e),s=t.orientation||na,a=t.level;s===na||s===Go?(a>=2?vE(n,i):a>=1?xE(n,i):gE(n,i),s===Go&&(n.rotation.y=Math.PI/2)):ME(n,i,a,s),n.userData.isWall=!0}function gE(n,t){const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.12),a=[],r=[],o=new w(nt.clone(),e);o.scale.set(35,25,8),o.position.y=12.5,n.add(o);const d=new w(nt.clone(),i);d.scale.set(36,1.5,9),d.position.y=25.5,n.add(d),a.push(d);const c=new w(nt.clone(),i);c.scale.set(36,1,9),c.position.y=.5,n.add(c),a.push(c);const h=new w(nt.clone(),s);h.scale.set(37,2,10),h.position.y=26,n.add(h),r.push(h);for(let l=-1;l<=1;l+=2){const u=new w(nt.clone(),e);u.scale.set(3,27,9),u.position.set(l*17,13.5,0),n.add(u);const f=new w(ae.clone(),i);f.scale.set(3.5,3.5,3.5),f.position.set(l*17,27.5,0),n.add(f),a.push(f)}n.userData.accentParts=a,n.userData.glowParts=r}function xE(n,t){const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.15),a=[],r=[],o=new w(nt.clone(),e);o.scale.set(35,35,10),o.position.y=17.5,n.add(o);const d=new w(nt.clone(),e);d.scale.set(4,33,12),d.position.y=17,n.add(d);const c=new w(nt.clone(),i);c.scale.set(36,1.5,11),c.position.y=35.5,n.add(c),a.push(c);const h=new w(nt.clone(),i);h.scale.set(34,.8,10.5),h.position.y=22,n.add(h),a.push(h);const l=new w(nt.clone(),i);l.scale.set(36,1,11),l.position.y=.5,n.add(l),a.push(l);const u=new w(nt.clone(),s);u.scale.set(37,2.5,12),u.position.y=36,n.add(u),r.push(u);for(let f=-1;f<=1;f+=2){const _=new w(nt.clone(),e);_.scale.set(3.5,37,11),_.position.set(f*17,18.5,0),n.add(_);const g=new w(rr.clone(),i);g.scale.set(4,4,4),g.position.set(f*17,38,0),n.add(g),a.push(g);const m=new w(ae.clone(),s);m.scale.set(6,6,6),m.position.set(f*17,38,0),n.add(m),r.push(m)}n.userData.accentParts=a,n.userData.glowParts=r}function vE(n,t){const e=Ht(t),i=Jt(Ne(t)),s=Mt(t,.18),a=[],r=[],o=new w(nt.clone(),e);o.scale.set(35,45,12),o.position.y=22.5,n.add(o);for(let m=-1;m<=1;m+=2){const p=new w(nt.clone(),e);p.scale.set(3,43,13),p.position.set(m*10,22,0),n.add(p)}const d=new w(Zp.clone(),e);d.scale.set(8,1.5,8),d.rotation.x=Math.PI/2,d.position.set(0,28,7),n.add(d);const c=new w(fn.clone(),i);c.scale.set(10,10,10),c.rotation.x=Math.PI/2,c.position.set(0,28,7.5),n.add(c),a.push(c);const h=new w(nt.clone(),i);h.scale.set(36,1.5,13),h.position.y=45.5,n.add(h),a.push(h);const l=new w(nt.clone(),i);l.scale.set(34,.8,12.5),l.position.y=43,n.add(l),a.push(l);const u=new w(nt.clone(),i);u.scale.set(34,.8,12.5),u.position.y=28,n.add(u),a.push(u);const f=new w(nt.clone(),i);f.scale.set(36,1.2,13),f.position.y=.6,n.add(f),a.push(f);const _=new w(nt.clone(),s);_.scale.set(37,3,14),_.position.y=46,n.add(_),r.push(_);for(let m=-1;m<=1;m+=2){const p=new w(nt.clone(),e);p.scale.set(4,47,13),p.position.set(m*17,23.5,0),n.add(p);const v=new w(El.clone(),i);v.scale.set(5,5,5),v.position.set(m*17,48,0),n.add(v),a.push(v);const M=new w(ae.clone(),s);M.scale.set(8,8,8),M.position.set(m*17,48,0),n.add(M),r.push(M);const y=new w(nt.clone(),i);y.scale.set(.5,40,.5),y.position.set(m*17,22,7),n.add(y),a.push(y)}const g=new w(ae.clone(),s);g.scale.set(10,10,4),g.position.set(0,28,8),n.add(g),r.push(g),n.userData.accentParts=a,n.userData.glowParts=r}function ME(n,t,e,i){const s=[.12,.15,.18][e]||.12,a=Ht(t),r=Jt(Ne(t)),o=Mt(t,s),d=[],c=[],h=[25,35,45][e]||25,l=[8,10,12][e]||8,u=18,f=h/2;let _,g;switch(i){case Gd:_=1,g=-1;break;case kd:_=-1,g=-1;break;case Vd:_=1,g=1;break;case Wd:_=-1,g=1;break;default:_=1,g=-1;break}const m=new w(nt.clone(),a);m.scale.set(u,h,l),m.position.set(_*(u/2),f,0),n.add(m);const p=new w(nt.clone(),a);p.scale.set(l,h,u),p.position.set(0,f,g*(u/2)),n.add(p);const v=new w(nt.clone(),a);v.scale.set(l,h,l),v.position.set(0,f,0),n.add(v);const M=new w(nt.clone(),r);M.scale.set(u+1,1.5,l+1),M.position.set(_*(u/2),h+.5,0),n.add(M),d.push(M);const y=new w(nt.clone(),r);y.scale.set(l+1,1.5,u+1),y.position.set(0,h+.5,g*(u/2)),n.add(y),d.push(y);const T=new w(nt.clone(),r);T.scale.set(l+1,1.5,l+1),T.position.set(0,h+.5,0),n.add(T),d.push(T);const b=new w(nt.clone(),r);b.scale.set(u+1,1,l+1),b.position.set(_*(u/2),.5,0),n.add(b),d.push(b);const A=new w(nt.clone(),r);A.scale.set(l+1,1,u+1),A.position.set(0,.5,g*(u/2)),n.add(A),d.push(A);const x=new w(nt.clone(),o);x.scale.set(u+2,2,l+2),x.position.set(_*(u/2),h+1,0),n.add(x),c.push(x);const S=new w(nt.clone(),o);S.scale.set(l+2,2,u+2),S.position.set(0,h+1,g*(u/2)),n.add(S),c.push(S);const I=new w(nt.clone(),a),P=[3,3.5,4][e]||3;I.scale.set(P,h+2,P),I.position.set(0,f+1,0),n.add(I);const N=[ae,rr,El][e]||ae,L=[3.5,4,5][e]||3.5,k=new w(N.clone(),r);if(k.scale.set(L,L,L),k.position.set(0,h+3,0),n.add(k),d.push(k),e>=1){const ot=[0,6,8][e]||6,lt=new w(ae.clone(),o);lt.scale.set(ot,ot,ot),lt.position.set(0,h+3,0),n.add(lt),c.push(lt)}const B=_*u,V=g*u,H=new w(nt.clone(),a);H.scale.set(P,h+2,l+1),H.position.set(B,f+1,0),n.add(H);const et=new w(N.clone(),r);et.scale.set(L,L,L),et.position.set(B,h+3,0),n.add(et),d.push(et);const tt=new w(nt.clone(),a);tt.scale.set(l+1,h+2,P),tt.position.set(0,f+1,V),n.add(tt);const ht=new w(N.clone(),r);if(ht.scale.set(L,L,L),ht.position.set(0,h+3,V),n.add(ht),d.push(ht),e>=1){const ot=[0,6,8][e]||6,lt=new w(ae.clone(),o);lt.scale.set(ot,ot,ot),lt.position.set(B,h+3,0),n.add(lt),c.push(lt);const Gt=new w(ae.clone(),o);Gt.scale.set(ot,ot,ot),Gt.position.set(0,h+3,V),n.add(Gt),c.push(Gt)}if(e>=2){const ot=new w(nt.clone(),r);ot.scale.set(u-2,.8,l+.5),ot.position.set(_*(u/2),h*.6,0),n.add(ot),d.push(ot);const lt=new w(nt.clone(),r);lt.scale.set(l+.5,.8,u-2),lt.position.set(0,h*.6,g*(u/2)),n.add(lt),d.push(lt);const Gt=new w(nt.clone(),a);Gt.scale.set(3,h-2,l+1),Gt.position.set(_*(u/2),f,0),n.add(Gt);const Se=new w(nt.clone(),a);Se.scale.set(l+1,h-2,3),Se.position.set(0,f,g*(u/2)),n.add(Se)}if(e===1){const ot=new w(nt.clone(),r);ot.scale.set(u-2,.8,l+.5),ot.position.set(_*(u/2),h*.6,0),n.add(ot),d.push(ot);const lt=new w(nt.clone(),r);lt.scale.set(l+.5,.8,u-2),lt.position.set(0,h*.6,g*(u/2)),n.add(lt),d.push(lt)}n.userData.accentParts=d,n.userData.glowParts=c}function yE(n,t){n.traverse(e=>{e.isMesh&&e.material.emissive&&e.material.emissive.setScalar(t)})}function SE(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}function EE(n,t){const e=n.team===st?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=n.team===Kt,s=new ye;switch(n.type){case Ca:wE(s,e,i);break;case Pa:TE(s,e,i);break;case Da:AE(s,e,i);break;case pn:DE(s,e,i),s.scale.setScalar(1.8);break}if(n.upgradeLevel>0||n.upgradeBranch){const _=n.upgradeBranch?3:n.upgradeLevel,g={[Ca]:8,[Pa]:10,[Da]:16}[n.type]||8;for(let m=0;m<_;m++){const p=new w(new de(g+m*1.5,.25,4,16),Mt(e,.2));p.rotation.x=Math.PI/2,p.position.y=-1+m*1.2,s.add(p),s.userData.glowParts||(s.userData.glowParts=[]),s.userData.glowParts.push(p)}}const a={[Ca]:12,[Pa]:15,[Da]:22,[pn]:16}[n.type]||12,r=new Yo(a-1.5,a,32),o=new Cn({color:e_,transparent:!0,opacity:.9,side:$n,depthWrite:!1}),d=new w(r,o);d.rotation.x=-Math.PI/2,d.visible=!1,s.add(d),s.userData._selectionRing=d;const c=a+3,h=new Yo(c-1.2,c,32),l=new Cn({color:n_,transparent:!0,opacity:.5,side:$n,depthWrite:!1}),u=new w(h,l);u.rotation.x=-Math.PI/2,u.visible=!1,s.add(u),s.userData._squadHighlightRing=u;const f={[Ca]:3,[Pa]:3,[Da]:2,[pn]:ul}[n.type]||10;s.position.set(n.x,f,n.z),s.userData.baseY=f,s.userData.idOffset=n.idOffset,s.userData.lastX=n.x,s.userData.lastZ=n.z,s.userData.smoothAngle=0,t.add(s),n.mesh=s}function bE(n,t,e){for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0,o=a.userData.unitType;a.position.x=s.x,a.position.z=s.z,a.position.y=a.userData.baseY;const d=s.x-a.userData.lastX,c=s.z-a.userData.lastZ,h=d*d+c*c;if(h>.01){const g=Math.atan2(d,c),m=a.userData.smoothAngle||0;let p=g-m;for(;p>Math.PI;)p-=Math.PI*2;for(;p<-Math.PI;)p+=Math.PI*2;const v=m+p*.12;a.rotation.y=v,a.userData.smoothAngle=v,o==="rifle"&&(a.rotation.x+=(-.06-a.rotation.x)*.1)}else if(s.targetX!==void 0&&s.targetZ!==void 0&&s.inCombat&&o!=="helicopter"){const g=s.targetX-s.x,m=s.targetZ-s.z,p=Math.atan2(g,m),v=a.userData.smoothAngle||0;let M=p-v;for(;M>Math.PI;)M-=Math.PI*2;for(;M<-Math.PI;)M+=Math.PI*2;const y=v+M*.15;a.rotation.y=y,a.userData.smoothAngle=y,a.rotation.z*=.92,a.rotation.x*=.92}else a.rotation.z*=.92,a.rotation.x*=.92;if(a.userData.lastX=s.x,a.userData.lastZ=s.z,o==="rifle")RE(a,s,n,r,h);else if(o==="assault")CE(a,s,n,r,h);else if(o==="tank")PE(a,s,n,r);else if(o==="helicopter"){IE(a,s,n,r,h);const g=a.userData.selectRing;if(g){const m=e!=null&&s.id===e;g.visible=m,m&&(g.material.opacity=.4+.2*Math.sin(n*5),g.rotation.z+=.02)}}const l=a.userData.glowParts;if(l){const g=s.inCombat?6:3,m=s.inCombat?.14:.07;for(let p=0;p<l.length;p++){const v=l[p].material;v.transparent&&(v.userData||(v.userData={}),v.userData.baseOp==null&&(v.userData.baseOp=v.opacity),v.opacity=v.userData.baseOp+m*Math.sin(n*g+r))}}a.userData.threatRing&&(a.userData.threatRing.rotation.y+=.025,a.userData.threatRing.rotation.z=.25*Math.sin(n*1.5+r));const u=s.hp/s.maxHp;if(u<.5){const g=(1-u*2)*.35;if(a.traverse(m=>{m.isMesh&&m.material.emissive&&(m.material.emissiveIntensity=1+g)}),u<.25&&l){const m=Math.random()>.82?.35:0;for(const p of l)p.material.opacity+=m}}const f=a.userData._selectionRing,_=a.userData._squadHighlightRing;f&&(f.visible=!!s.selected,f.position.y=-a.userData.baseY+.5,f.visible&&(f.material.opacity=.7+.2*Math.sin(n*5+r))),_&&(_.visible=!!s.squadHighlight,_.position.y=-a.userData.baseY+.3,_.visible&&(_.material.opacity=.35+.15*Math.sin(n*3+r))),s.hitFlashTimer>0&&(NE(a,s.hitFlashTimer/$f),s.hitFlashTimer-=1/60,s.hitFlashTimer<0&&(s.hitFlashTimer=0))}}function Mh(n,t){n.mesh&&(t.remove(n.mesh),FE(n.mesh),n.mesh=null)}function wE(n,t,e){const i=Ht(t),s=Jt(t),a=new ye;n.add(a),D(a,new Et(1,1.4,5,6),i,-2.2,3.5,0),D(a,new wt(1.2,6,4),s,-2.2,1.2,.3),D(a,new Et(1.3,.9,4.5,6),i,-2.2,-1.2,.5),D(a,new Y(1.4,3.5,.8),i,-2.2,-.8,1.4),D(a,new Y(2.2,1.2,3.5),i,-2.2,-3.2,.8),D(a,new Y(1.8,.25,3),s,-2.2,-2.6,.8);const r=D(a,new de(1.4,.25,4,8),Mt(t,.15),-2.2,-3,.8);r.rotation.x=Math.PI/2;const o=new ye;n.add(o),D(o,new Et(1,1.4,5,6),i,2.2,3.5,0),D(o,new wt(1.2,6,4),s,2.2,1.2,.3),D(o,new Et(1.3,.9,4.5,6),i,2.2,-1.2,.5),D(o,new Y(1.4,3.5,.8),i,2.2,-.8,1.4),D(o,new Y(2.2,1.2,3.5),i,2.2,-3.2,.8),D(o,new Y(1.8,.25,3),s,2.2,-2.6,.8);const d=D(o,new de(1.4,.25,4,8),Mt(t,.15),2.2,-3,.8);d.rotation.x=Math.PI/2,D(n,new Et(2.8,2.4,2,6),i,0,7,0);const c=D(n,new de(2.9,.3,4,12),s,0,6.2,0);c.rotation.x=Math.PI/2,D(n,new Y(7,6.5,5),i,0,11.5,0);const h=D(n,new Y(6,4,1.2),i,0,12,3);h.rotation.x=-.1;for(let b=0;b<2;b++)D(n,new Y(4,.2,.15),s,0,10.5+b*1.4,3.4);D(n,new Y(.8,4.5,4),i,-4,11.5,0),D(n,new Y(.8,4.5,4),i,4,11.5,0);const l=new ye;l.position.set(-5.5,14,0),n.add(l),D(l,new Y(3.5,2.5,4),i,0,0,0),D(l,new Y(3,.3,3.5),s,0,1.5,0);const u=new ye;u.position.set(5.5,14,0),n.add(u),D(u,new Y(3.5,2.5,4),i,0,0,0),D(u,new Y(3,.3,3.5),s,0,1.5,0),D(n,new wt(1.1,6,4),s,-5.5,12.5,.5),D(n,new Et(.8,1,4.5,6),i,-5.5,10,1).rotation.x=-.2,D(n,new wt(.8,6,4),i,-5.5,8,1.5),D(n,new wt(1.1,6,4),s,5.5,12.5,.5),D(n,new Et(.8,1,4.5,6),i,5.5,10,1).rotation.x=-.2,D(n,new wt(.8,6,4),i,5.5,8,1.5),D(n,new Y(1,1,3),i,2,9,-1),D(n,new Y(1.2,1.4,5),i,2,9,3);const f=D(n,new Et(.25,.3,8,4),i,2,9,9.5);f.rotation.x=-Math.PI/2,D(n,new Et(.5,.5,4,6),i,2,9,7).rotation.x=-Math.PI/2;const _=D(n,new wt(.5,6,4),s,2,9,13.5),g=D(n,new wt(1.2,6,4),Mt(t,.15),2,9,13.5);D(n,new Y(.6,2.2,1),s,2,7.8,2.5),D(n,new Et(1,1.4,1.5,6),i,0,15.5,.3);const m=D(n,new Y(3.5,3,3.8),i,0,17.5,.3);D(n,new Y(.8,1.2,3.5),i,0,19.3,.3);const p=D(n,new Y(3.6,1.1,.6),s,0,17.5,2.3);D(n,new Y(4,1.4,.3),Mt(t,.25),0,17.5,2.5),D(n,new Et(.15,.15,2.5,4),i,1.5,19.8,.3);const v=D(n,new wt(.35,6,4),s,1.5,21.2,.3);D(n,new Y(4.5,4,2.5),i,0,12,-3.5),D(n,new Y(3,.25,.2),s,0,13.5,-2.3),D(n,new Y(3,.25,.2),s,0,11.5,-2.3);const M=D(n,new wt(1,6,4),s,0,12,-2.5),y=D(n,new wt(1.8,6,4),Mt(t,.14),0,12,-2.5),T=D(n,new de(5,.5,4,14),s,0,.5,0);if(T.rotation.x=Math.PI/2,e){const b=D(n,new de(9,.35,6,18),s,0,10,0);b.rotation.x=Math.PI/4,n.userData.threatRing=b}n.userData.accentParts=[p,c,v,M,_,T],n.userData.glowParts=[r,d,y,g],n.userData.muzzleFlash=_,n.userData.muzzleGlow=g,n.userData.head=m,n.userData.lLegGrp=a,n.userData.rLegGrp=o,n.userData.lShoulder=l,n.userData.rShoulder=u,n.userData.unitType="rifle"}function TE(n,t,e){const i=Ht(t),s=Jt(t),a=new ye;n.add(a);const r=new Et(1.6,2.2,8,6);D(a,r,i,-4,6,0).rotation.z=.1,D(a,new wt(1.8,6,4),s,-4.5,3,.5),D(a,new Et(2,1.4,7,6),i,-4.5,-.5,1),D(a,new Y(2.2,5,1.2),i,-4.5,0,2.2),D(a,new Y(3.5,1.5,5.5),i,-4.5,-3.8,1.5),D(a,new Y(3,.3,4.5),s,-4.5,-3,1.5),D(a,new wt(1.2,6,4),s,-4.5,-2.8,1);const o=new ye;n.add(o),D(o,r,i,4,6,0).rotation.z=-.1,D(o,new wt(1.8,6,4),s,4.5,3,.5),D(o,new Et(2,1.4,7,6),i,4.5,-.5,1),D(o,new Y(2.2,5,1.2),i,4.5,0,2.2),D(o,new Y(3.5,1.5,5.5),i,4.5,-3.8,1.5),D(o,new Y(3,.3,4.5),s,4.5,-3,1.5),D(o,new wt(1.2,6,4),s,4.5,-2.8,1),D(n,new Et(4,3.5,3,8),i,0,11,0);const d=D(n,new de(4.2,.5,6,14),s,0,10,0);d.rotation.x=Math.PI/2,D(n,new Y(3,2.5,4),i,-5,10.5,0),D(n,new Y(3,2.5,4),i,5,10.5,0),D(n,new Y(11,10,7.5),i,0,18,0);const c=D(n,new Y(9,6,1.8),i,0,18.5,4.8);c.rotation.x=-.12,D(n,new Y(1.2,7,6),i,-6.5,18,0),D(n,new Y(1.2,7,6),i,6.5,18,0);const h=D(n,new wt(2.2,8,6),s,0,18,5),l=D(n,new wt(3.5,8,6),Mt(t,.18),0,18,5);for(let A=0;A<3;A++)D(n,new Y(6,.25,.2),s,0,15.5+A*1.5,5.2);const u=new ye;u.position.set(-9,21,0),u.rotation.z=-.15,n.add(u),D(u,new Y(5.5,4.5,6.5),i,0,0,0),D(u,new Y(4.5,.5,5.5),s,0,2.5,0),D(u,new Za(1.2),s,0,3.5,0),D(u,new Y(5,.3,.4),s,0,0,3.5);const f=new ye;f.position.set(9,21,0),f.rotation.z=.15,n.add(f),D(f,new Y(5.5,4.5,6.5),i,0,0,0),D(f,new Y(4.5,.5,5.5),s,0,2.5,0),D(f,new Za(1.2),s,0,3.5,0),D(f,new Y(5,.3,.4),s,0,0,3.5),D(n,new wt(1.8,6,4),s,-9,17,1),D(n,new Et(1.3,1.6,7,6),i,-9,14,2).rotation.x=-.25,D(n,new wt(1.3,6,4),i,-9,11,3.5),D(n,new Et(.8,1,7,4),i,-9,10,7.5).rotation.x=-Math.PI/2;const _=D(n,new $a(1.2,2.5,4),s,-9,10,11.5);_.rotation.x=-Math.PI/2,D(n,new wt(1.8,6,4),s,9,17,1),D(n,new Et(1.3,1.6,7,6),i,9,14,2).rotation.x=-.25,D(n,new wt(1.3,6,4),i,9,11,3.5),D(n,new Et(.8,1,7,4),i,9,10,7.5).rotation.x=-Math.PI/2;const g=D(n,new $a(1.2,2.5,4),s,9,10,11.5);g.rotation.x=-Math.PI/2,D(n,new Et(1.5,2,2,6),i,0,24,.5);const m=D(n,new Y(4.5,3.5,4.5),i,0,26.5,1),p=D(n,new Y(4,1.2,.8),s,0,27,3.5);D(n,new Y(4.5,1.6,.4),Mt(t,.2),0,27,3.8),D(n,new Y(1,2.5,3),i,0,29.5,1),D(n,new Et(.2,.2,4.5,4),i,2.5,29.5,1);const v=D(n,new wt(.5,6,4),s,2.5,32,1);D(n,new Y(7,7,4),i,0,18,-5.5),D(n,new Y(5,.3,.3),s,0,21,-3.5),D(n,new Y(5,.3,.3),s,0,19,-3.5),D(n,new Y(4,1,2.5),i,0,22.5,-5.5),D(n,new Et(1.2,1.2,2.5,6),i,-2.2,20.5,-8),D(n,new Et(1.2,1.2,2.5,6),i,2.2,20.5,-8);const M=D(n,new wt(1.4,6,4),s,-2.2,20.5,-9.5),y=D(n,new wt(1.4,6,4),s,2.2,20.5,-9.5),T=D(n,new de(2.8,.35,4,10),Mt(t,.18),-4.5,-3.5,1.5);T.rotation.x=Math.PI/2;const b=D(n,new de(2.8,.35,4,10),Mt(t,.18),4.5,-3.5,1.5);if(b.rotation.x=Math.PI/2,e){const A=D(n,new de(14,.4,6,22),s,0,16,0);A.rotation.x=Math.PI/4,n.userData.threatRing=A}n.userData.accentParts=[h,d,p,v,M,y,_,g],n.userData.glowParts=[l,T,b],n.userData.reactor=h,n.userData.reactorGlow=l,n.userData.head=m,n.userData.lLegGrp=a,n.userData.rLegGrp=o,n.userData.lShoulder=u,n.userData.rShoulder=f,n.userData.unitType="assault"}function AE(n,t,e){const i=Ht(t),s=Jt(t);D(n,new Y(22,5,28),i,0,5,0);const a=D(n,new Y(20,4.5,6),i,0,6.5,15);a.rotation.x=-.35,D(n,new Y(18,1.5,2),i,0,3.5,16),D(n,new Y(18,4,2.5),i,0,6,-15);const r=D(n,new Y(16,3,3),i,0,5,-16);r.rotation.x=.25,D(n,new Y(1.8,4,24),i,-12,4,0),D(n,new Y(1.8,4,24),i,12,4,0),D(n,new Y(.6,2,10),i,-12.5,5.5,3),D(n,new Y(.6,2,10),i,12.5,5.5,3),D(n,new Y(.6,2,8),i,-12.5,5.5,-6),D(n,new Y(.6,2,8),i,12.5,5.5,-6),D(n,new Y(.3,.6,22),s,-13,5,0),D(n,new Y(.3,.6,22),s,13,5,0),D(n,new Y(8,.8,6),i,-5,8,-6),D(n,new Y(8,.8,6),i,5,8,-6),D(n,new Y(18,.2,.4),s,0,7.7,5),D(n,new Y(18,.2,.4),s,0,7.7,-3);const o=new Et(2.8,3.2,3.5,6),d=[[-9,1.5,11],[9,1.5,11],[-9,1.5,-11],[9,1.5,-11]],c=[];for(const[L,k,B]of d){D(n,o,i,L,k,B);const V=D(n,new de(3,.4,4,10),s,L,k-.5,B);V.rotation.x=Math.PI/2,D(n,new wt(1.8,6,4),s,L,.5,B);const H=D(n,new de(3.5,.6,4,12),Mt(t,.2),L,0,B);H.rotation.x=Math.PI/2,c.push(H);const et=D(n,new de(4.5,.3,4,12),Mt(t,.08),L,-.3,B);et.rotation.x=Math.PI/2,c.push(et)}const h=D(n,new de(8,1,6,18),s,0,8.5,0);h.rotation.x=Math.PI/2,D(n,new Et(7,8,3,12),i,0,10,0);const l=new ye;l.position.y=11,n.add(l),D(l,new Y(12,5.5,14),i,0,3,0);const u=D(l,new Y(10,4,3.5),i,0,3.5,9);u.rotation.x=-.25,D(l,new Y(1.8,4.5,12),i,-7,3,0),D(l,new Y(1.8,4.5,12),i,7,3,0),D(l,new Et(2,2,.8,8),i,-3,6,-2),D(l,new Y(10,.2,.3),s,0,5.8,3),D(l,new Y(.3,.2,12),s,-5,5.8,0),D(l,new Y(.3,.2,12),s,5,5.8,0);const f=D(l,new Et(2,2.5,22,8),i,0,3.5,18);f.rotation.x=-Math.PI/2;const _=D(l,new Et(3.2,3.2,5,8),i,0,3.5,9);_.rotation.x=-Math.PI/2;const g=new de(2.6,.3,4,8),m=D(l,g,s,0,3.5,15);m.rotation.x=Math.PI/2;const p=D(l,g,s,0,3.5,20);p.rotation.x=Math.PI/2;const v=D(l,g,s,0,3.5,25);v.rotation.x=Math.PI/2;const M=D(l,new Et(3,2.2,3,8),s,0,3.5,30);M.rotation.x=-Math.PI/2;const y=D(l,new wt(2,6,4),s,0,3.5,32),T=D(l,new wt(4,6,4),Mt(t,.12),0,3.5,32);D(l,new Et(.5,.5,10,4),i,3,2,13).rotation.x=-Math.PI/2,D(l,new wt(.7,4,4),s,3,2,18);const b=D(l,new wt(2.2,8,6),s,0,7,-3),A=D(l,new wt(3.5,8,6),Mt(t,.15),0,7,-3);D(n,new Y(3.5,2.5,2.5),i,-6,6,-16.5),D(n,new Y(3.5,2.5,2.5),i,6,6,-16.5);const x=D(n,new wt(1.8,6,4),s,-6,6,-18),S=D(n,new wt(1.8,6,4),s,6,6,-18);D(n,new wt(2.8,6,4),Mt(t,.12),-6,6,-18),D(n,new wt(2.8,6,4),Mt(t,.12),6,6,-18);const I=D(n,new de(13,1,6,22),Mt(t,.07),0,.5,0);I.rotation.x=Math.PI/2;const P=D(n,new de(7,.6,4,14),Mt(t,.1),0,1,0);P.rotation.x=Math.PI/2;const N=D(n,new de(9,.6,6,18),s,0,9,0);if(N.rotation.x=Math.PI/2,e){const L=D(n,new de(17,.5,6,24),s,0,8,0);L.rotation.x=Math.PI/4,n.userData.threatRing=L}n.userData.accentParts=[h,M,y,b,N,x,S],n.userData.glowParts=[...c,A,T,I,P],n.userData.turretPivot=l,n.userData.cannon=f,n.userData.cannonBaseZ=18,n.userData.muzzleFlash=y,n.userData.muzzleGlow=T,n.userData.dome=b,n.userData.domeGlow=A,n.userData.conduit=N,n.userData.hoverGlows=c,n.userData.unitType="tank"}function RE(n,t,e,i,s){const a=n.userData.lLegGrp,r=n.userData.rLegGrp;if(a&&r)if(s>.05){const u=Math.sin(e*6+i)*1.8;a.position.z=u,r.position.z=-u,a.position.y=Math.max(0,Math.sin(e*6+i))*.5,r.position.y=Math.max(0,-Math.sin(e*6+i))*.5}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=n.userData.lShoulder,d=n.userData.rShoulder;if(o&&d&&s>.05){const u=Math.sin(e*6+i+1)*.04;o.rotation.x=u,d.rotation.x=-u}const c=n.userData.head;c&&(c.rotation.y=Math.sin(e*.5+i)*.2);const h=n.userData.muzzleFlash,l=n.userData.muzzleGlow;if(h){const u=t.fireCooldown>1/t.fireRate-.08;h.scale.setScalar(u?3:.5+.15*Math.sin(e*4+i)),l&&(l.material.opacity=u?.5:.08)}}function CE(n,t,e,i,s){const a=n.userData.lLegGrp,r=n.userData.rLegGrp;if(a&&r)if(s>.05){const u=Math.sin(e*5+i)*2.5;a.position.z=u,r.position.z=-u,a.position.y=Math.max(0,Math.sin(e*5+i))*.8,r.position.y=Math.max(0,-Math.sin(e*5+i))*.8}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=n.userData.lShoulder,d=n.userData.rShoulder;if(o&&d&&s>.05){const u=Math.sin(e*5+i+1)*.06;o.rotation.x=u,d.rotation.x=-u}const c=n.userData.head;c&&(c.rotation.y=Math.sin(e*.7+i)*.35);const h=n.userData.reactor;h&&h.scale.setScalar(.85+.15*Math.sin(e*4+i));const l=n.userData.reactorGlow;l&&(l.material.opacity=.12+.08*Math.sin(e*4+i))}function PE(n,t,e,i,s){const a=n.userData.turretPivot;if(a&&t.targetX!==void 0&&t.targetZ!==void 0){const g=Math.atan2(t.targetX-t.x,t.targetZ-t.z)-(n.userData.smoothAngle||0);let m=n.userData._turretAngle||0,p=g-m;for(;p>Math.PI;)p-=Math.PI*2;for(;p<-Math.PI;)p+=Math.PI*2;for(m+=p*.1;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;n.userData._turretAngle=m,a.rotation.y=m}const r=n.userData.conduit;r&&(r.rotation.z+=.012);const o=n.userData.hoverGlows;if(o)for(let _=0;_<o.length;_++){const g=_%4<2?0:Math.PI,m=o[_].material;m.userData||(m.userData={}),m.userData.baseOp==null&&(m.userData.baseOp=m.opacity),m.opacity=m.userData.baseOp+.08*Math.sin(e*3+i+g)}const d=n.userData.cannon,c=n.userData.cannonBaseZ||18;d&&(t.fireCooldown>1/t.fireRate-.12?d.position.z=c-3:d.position.z+=(c-d.position.z)*.08);const h=n.userData.muzzleFlash,l=n.userData.muzzleGlow;if(h){const _=t.fireCooldown>1/t.fireRate-.1;h.scale.setScalar(_?4:.4),l&&(l.material.opacity=_?.5:.05)}const u=n.userData.dome;if(u){const _=t.hp/t.maxHp;u.scale.setScalar(1+(1-_)*.6)}const f=n.userData.domeGlow;if(f){const _=t.hp/t.maxHp;f.material.opacity=.1+(1-_)*.25}}function DE(n,t,e){const i=Ht(t),s=Jt(t);D(n,new Y(5,4,16),i,0,0,0),D(n,new Y(2,1.5,12),i,0,2.5,-1),D(n,new Y(6,1,14),i,0,-2.2,0);const a=D(n,new Y(4.5,3,5),i,0,.5,9);a.rotation.x=-.2;const r=D(n,new Y(3.8,1.2,.6),s,0,1.5,11.2);D(n,new Y(4.2,1.6,.4),Mt(t,.2),0,1.5,11.5),D(n,new Y(3.5,1.5,3),i,0,-1.5,9.5);const o=new ye;o.position.set(0,-2.5,10),n.add(o),D(o,new Y(2,1,2),i,0,0,0);const d=D(o,new Et(.3,.3,6,4),i,-.6,0,3);d.rotation.x=-Math.PI/2;const c=D(o,new Et(.3,.3,6,4),i,.6,0,3);c.rotation.x=-Math.PI/2;const h=D(o,new wt(.5,6,4),s,-.6,0,6),l=D(o,new wt(.5,6,4),s,.6,0,6),u=D(o,new wt(1.5,6,4),Mt(t,.12),0,0,6);D(n,new Y(3,3,7),i,-5,0,-1),D(n,new Y(2.5,.3,6),s,-5,1.8,-1);const f=D(n,new wt(1,6,4),s,-5,0,-5),_=D(n,new wt(1.8,6,4),Mt(t,.18),-5,0,-5);D(n,new Y(3,3,7),i,5,0,-1),D(n,new Y(2.5,.3,6),s,5,1.8,-1);const g=D(n,new wt(1,6,4),s,5,0,-5),m=D(n,new wt(1.8,6,4),Mt(t,.18),5,0,-5);D(n,new Y(.3,2,5),s,-6.7,0,-1),D(n,new Y(.3,2,5),s,6.7,0,-1),D(n,new Y(2.5,2,10),i,0,.5,-13),D(n,new Y(1.5,1.5,5),i,0,.5,-19.5),D(n,new Y(.3,.3,12),s,0,1.8,-14),D(n,new Y(.5,5,3.5),i,0,4,-20.5),D(n,new Y(.3,4,.3),s,0,4,-19);const p=D(n,new wt(.4,6,4),s,0,6.8,-20.5);D(n,new Y(6,.5,2.5),i,0,1.5,-21),D(n,new Y(5,.2,2),s,0,2,-21);const v=D(n,new Et(2.5,2.5,.3,12),Mt(t,.15),.5,4,-22);v.rotation.z=Math.PI/2,D(n,new wt(.5,6,4),s,.5,4,-22),D(n,new Et(.8,1,3,6),i,0,4.5,0),D(n,new wt(1.2,6,4),s,0,6,0);const M=D(n,new Et(12,12,.3,24),Mt(t,.1),0,6.5,0),y=D(n,new Y(24,.15,1.2),s,0,6.5,0),T=D(n,new Y(1.2,.15,24),s,0,6.5,0),b=new ye;b.position.y=0,n.add(b),n.remove(M),n.remove(y),n.remove(T),M.position.set(0,6.5,0),y.position.set(0,6.5,0),T.position.set(0,6.5,0),b.add(M),b.add(y),b.add(T),D(n,new Et(.2,.2,1.5,4),i,-3,-3.5,4),D(n,new Et(.2,.2,1.5,4),i,-3,-3.5,-2),D(n,new Y(.4,.4,10),i,-3,-4.2,1),D(n,new Et(.2,.2,1.5,4),i,3,-3.5,4),D(n,new Et(.2,.2,1.5,4),i,3,-3.5,-2),D(n,new Y(.4,.4,10),i,3,-4.2,1);const A=D(n,new de(8,.5,4,14),Mt(t,.08),0,-4,0);if(A.rotation.x=Math.PI/2,e){const x=D(n,new de(12,.4,6,20),s,0,0,0);x.rotation.x=Math.PI/4,n.userData.threatRing=x}if(!e){const x=D(n,new de(14,.6,6,24),Mt(new Bt(.2,.6,1),.5),0,-3,0);x.rotation.x=Math.PI/2,x.visible=!1,n.userData.selectRing=x}n.userData.accentParts=[r,h,l,f,g,p],n.userData.glowParts=[u,_,m,A,M],n.userData.rotorGroup=b,n.userData.tailRotor=v,n.userData.gunPivot=o,n.userData.muzzleFlash=h,n.userData.muzzleFlash2=l,n.userData.muzzleGlow=u,n.userData.unitType="helicopter"}function IE(n,t,e,i,s){const a=n.userData.rotorGroup;a&&(a.rotation.y+=.4);const r=n.userData.tailRotor;r&&(r.rotation.x+=.5),n.position.y=n.userData.baseY+Math.sin(e*2+i)*2;const o=t.x-n.userData.lastX;if(t.z-n.userData.lastZ,s>.5){const u=-o*.008;n.rotation.z+=(u-n.rotation.z)*.08;const f=-.08;n.rotation.x+=(f-n.rotation.x)*.06}else n.rotation.z*=.92,n.rotation.x*=.92;const d=n.userData.gunPivot;if(d&&t.targetX!==void 0&&t.targetZ!==void 0){const u=t.targetX-t.x,f=t.targetZ-t.z,_=n.userData.smoothAngle||0,g=Math.cos(_),m=Math.sin(_),p=u*g-f*m,v=u*m+f*g,M=Math.atan2(p,v);let y=n.userData._gunAngle||0,T=M-y;for(;T>Math.PI;)T-=Math.PI*2;for(;T<-Math.PI;)T+=Math.PI*2;for(y+=T*.15;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;n.userData._gunAngle=y,d.rotation.y=y}const c=n.userData.muzzleFlash,h=n.userData.muzzleFlash2,l=n.userData.muzzleGlow;if(c){const u=t.fireCooldown>1/t.fireRate-.06,f=Math.floor(e*10)%2===0;c.scale.setScalar(u&&f?3:.5),h&&h.scale.setScalar(u&&!f?3:.5),l&&(l.material.opacity=u?.4:.06)}}function LE(n,t){const e=n===st?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=new ye;return UE(i,e),i.scale.setScalar(2.5),i.position.y=Xd,t.add(i),i}function sm(n,t){n&&(t.remove(n),n.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose&&e.material.dispose())}))}function UE(n,t,e){const i=Ht(t),s=Jt(t);D(n,new Y(6,4,28),i,0,0,0),D(n,new Y(3,2,22),i,0,3,-2),D(n,new Y(7,1.5,16),i,0,-2.5,0);const a=D(n,new Y(5,3.5,6),i,0,1,15);a.rotation.x=-.15,D(n,new Y(4,1.5,.6),s,0,2.5,17.5),D(n,new Y(4.5,1.8,.4),Mt(t,.25),0,2.5,17.8),D(n,new Y(3.5,2.5,4),i,0,0,18),D(n,new Y(18,.8,8),i,-12,0,-2),D(n,new Y(16,.3,6),s,-12,.6,-2),D(n,new wt(.6,6,4),s,-21,0,-2),D(n,new Y(18,.8,8),i,12,0,-2),D(n,new Y(16,.3,6),s,12,.6,-2),D(n,new wt(.6,6,4),s,21,0,-2),D(n,new Y(3,3,8),i,-8,-2,-1),D(n,new wt(1.2,6,4),s,-8,-2,-5.5),D(n,new wt(2,6,4),Mt(t,.2),-8,-2,-5.5),D(n,new Y(3,3,8),i,8,-2,-1),D(n,new wt(1.2,6,4),s,8,-2,-5.5),D(n,new wt(2,6,4),Mt(t,.2),8,-2,-5.5),D(n,new Y(2,2,8),i,0,1,-18),D(n,new Y(.6,6,4),i,0,5,-20),D(n,new Y(.3,5,.4),s,0,5,-18.5),D(n,new wt(.5,6,4),s,0,8.5,-20),D(n,new Y(8,.5,3),i,0,2,-20),D(n,new Y(7,.3,2.5),s,0,2.5,-20),D(n,new Y(5,.3,10),Mt(16768324,.15),0,-3.5,0),D(n,new Et(.8,.3,12,6),Mt(t,.1),-8,-2,-12),D(n,new Et(.8,.3,12,6),Mt(t,.1),8,-2,-12),n.userData.unitType="bomber"}function D(n,t,e,i,s,a){const r=new w(t,e);return i!==void 0&&r.position.set(i,s,a),n.add(r),r}function NE(n,t){n.traverse(e=>{e.isMesh&&e.material.emissive&&e.material.emissive.setScalar(t)})}function FE(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const di=new wt(1,8,6),OE=new Et(1,1,1,6),BE=new de(1,.2,4,10),Sf=new Map;function zE(n,t){const e=Math.round(t*20)/20,i=n*100+e;let s=Sf.get(i);return s||(s=new Cn({color:n,transparent:!0,opacity:e}),Sf.set(i,s)),s}function Ef(n,t){const e=n.team===st?zt.PROJECTILE_PLAYER:zt.PROJECTILE_ENEMY,i=new ye;n.homing?GE(i,n,e):HE(i,e),i.position.set(n.x,n.y,n.z),t.add(i),n.mesh=i}function HE(n,t){const e=new wt(1.2,8,6),i=new w(e,Jt(t));n.add(i);const s=new wt(2.5,8,6),a=new w(s,Mt(t,.25));n.add(a)}function GE(n,t,e){const i=Jt(e),s=Mt(e,.3),a=t.turretLevel||0,r=t.turretBranch;if(r==="A"){const c=new w(OE.clone(),i);c.scale.set(.6,4,.6),c.rotation.x=Math.PI/2,n.add(c);const h=new w(di.clone(),s);h.scale.setScalar(1.2),n.add(h),n.userData.trailCount=3}else if(r==="B"){const c=new w(di.clone(),i);c.scale.setScalar(2),n.add(c);const h=new w(di.clone(),s);h.scale.setScalar(3.5),n.add(h);const l=[];for(let u=0;u<2;u++){const f=new w(di.clone(),i.clone());f.scale.setScalar(.8),n.add(f),l.push(f)}n.userData.orbiters=l,n.userData.trailCount=8}else if(a>=2){const c=new w(di.clone(),i);c.scale.setScalar(1.2),n.add(c);const h=new w(BE.clone(),i.clone());h.scale.setScalar(2),n.add(h),n.userData.ring=h;const l=new w(di.clone(),s);l.scale.setScalar(2.5),n.add(l),n.userData.trailCount=6}else if(a>=1){const c=new w(di.clone(),i);c.scale.set(1,1,2.5),n.add(c);const h=new w(di.clone(),s);h.scale.set(1.5,1.5,3),n.add(h),n.userData.trailCount=5}else{const c=new w(di.clone(),i);c.scale.setScalar(1),n.add(c);const h=new w(di.clone(),s);h.scale.setScalar(2),n.add(h),n.userData.trailCount=4}const o=n.userData.trailCount||4,d=[];for(let c=0;c<o;c++){const h=.35*(1-c/o),l=new w(di.clone(),zE(e,h));l.scale.setScalar(.6*(1-c/o*.5)),l.visible=!1,n.add(l),d.push(l)}n.userData.trails=d}function kE(n,t){const e=n*1e3;for(let i=0;i<t.length;i++){const s=t[i];if(s.mesh&&(s.mesh.position.set(s.x,s.y,s.z),s.homing&&s.mesh.userData)){if(s.target&&s.target.alive){const a=s.target.x-s.x,r=s.target.z-s.z;s.mesh.rotation.y=Math.atan2(a,r)}if(s.mesh.userData.ring&&(s.mesh.userData.ring.rotation.z=e*.005),s.mesh.userData.orbiters){const a=e*.006,r=s.mesh.userData.orbiters;r[0]&&(r[0].position.x=Math.cos(a)*4,r[0].position.z=Math.sin(a)*4),r[1]&&(r[1].position.x=Math.cos(a+Math.PI)*4,r[1].position.z=Math.sin(a+Math.PI)*4)}if(s.mesh.userData.trails&&s.trail){const a=s.mesh.userData.trails;for(let r=0;r<a.length;r++){const o=s.trail.length-1-r;o>=0&&(a[r].visible=!0,a[r].position.set(s.trail[o][0]-s.x,0,s.trail[o][1]-s.z))}}}}}function am(n,t){n.mesh&&(t.remove(n.mesh),VE(n.mesh),n.mesh=null)}function VE(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const WE=200,XE=30,bf=new wt(1,6,4),wf=new Y(1,1,1);let pi=[],Ki=[];function qE(n){pi=[],Ki=[];for(let t=0;t<WE;t++){const e=Jt(zt.CYAN),i=new w(bf,e);i.visible=!1,n.add(i);const s=Mt(zt.CYAN,.4),a=new w(bf,s);a.scale.setScalar(2),i.add(a),pi.push({mesh:i,mat:e,glow:a,glowMat:s,inUse:!1})}for(let t=0;t<XE;t++){const e=Jt(zt.CYAN),i=new w(wf,e);i.visible=!1,n.add(i);const s=Mt(zt.CYAN,.3),a=new w(wf,s);a.scale.setScalar(1.6),i.add(a),Ki.push({mesh:i,mat:e,glow:a,glowMat:s,inUse:!1})}}function YE(n,t){for(let s=0;s<pi.length;s++)pi[s].inUse=!1;for(let s=0;s<Ki.length;s++)Ki[s].inUse=!1;let e=0,i=0;for(let s=0;s<t.length;s++){const a=t[s],r=1-a.life/a.maxLife;if(a.type==="wallBreak"){if(i>=Ki.length)continue;const h=Ki[i++];h.inUse=!0;const l=a.size*(1-r*.5),u=(1-r)*(1-r);h.mesh.visible=!0,h.mesh.position.set(a.x,a.y,a.z),h.mesh.scale.set(Math.max(l*.7,.1),Math.max(l*.5,.1),Math.max(l,.1));const f=(a.rotSpeed||0)*r*3;h.mesh.rotation.set(f*.7,f,f*.4),h.mat.color.set(a.color),h.glowMat.color.set(a.color),h.glowMat.opacity=u*.3;continue}if(a.type==="wallRepair"){if(e>=pi.length)continue;const h=pi[e++];h.inUse=!0;const l=Math.min(1,r*6),u=1-r,f=l*u,_=a.size*(.5+.5*l)*u;h.mesh.visible=!0,h.mesh.position.set(a.x,a.y,a.z),h.mesh.scale.setScalar(Math.max(_,.1)),h.mat.color.set(a.color),h.glowMat.color.set(a.color),h.glowMat.opacity=f*.5;continue}if(e>=pi.length)continue;const o=pi[e++];o.inUse=!0;const d=a.size*(1-r*.6),c=1-r;o.mesh.visible=!0,o.mesh.position.set(a.x,a.y,a.z),o.mesh.scale.setScalar(Math.max(d,.1)),o.mat.color.set(a.color),o.glowMat.color.set(a.color),o.glowMat.opacity=c*.4}for(let s=0;s<pi.length;s++)pi[s].inUse||(pi[s].mesh.visible=!1);for(let s=0;s<Ki.length;s++)Ki[s].inUse||(Ki[s].mesh.visible=!1)}const xr=[];let yh=null,Lo=0;function $E(n){yh=n,xr.length=0,Lo=0}function ZE(n,t,e,i){const a=new ye,r=new de(1,.8,8,32),o=Jt(e),d=new w(r,o);d.rotation.x=Math.PI/2,a.add(d);const c=new de(1,2.5,8,32),h=Mt(e,.4),l=new w(c,h);l.rotation.x=Math.PI/2,a.add(l);const u=new ch(1,32),f=Mt(16777215,.5),_=new w(u,f);_.rotation.x=-Math.PI/2,_.position.y=1,a.add(_),a.position.set(n,6,t),yh.add(a),xr.push({type:"airStrikeRing",group:a,ringMat:o,glowMat:h,discMat:f,targetRadius:i,life:1.2,maxLife:1.2})}function jE(n){const t=Lo>0?Math.min(n-Lo,.05):0;Lo=n;for(let e=xr.length-1;e>=0;e--){const i=xr[e];if(i.life-=t,i.life<=0){yh.remove(i.group),i.group.traverse(a=>{a.isMesh&&(a.geometry.dispose(),a.material.dispose())}),xr.splice(e,1);continue}const s=1-i.life/i.maxLife;if(i.type==="beam"){const a=1-s;i.outerMat.opacity=.15*a,i.innerMat.color.lerp(new Bt(16777215),s*.3)}if(i.type==="ring"){const a=1+s*(i.targetRadius-1);i.group.scale.set(a,1,a);const r=(1-s)*(1-s);i.glowMat.opacity=.3*r}if(i.type==="airStrikeRing"){const r=1+(1-(1-s)*(1-s))*(i.targetRadius-1);i.group.scale.set(r,1,r);const o=(1-s)*(1-s);if(i.glowMat.opacity=.4*o,i.discMat){i.discMat.opacity=.5*o*o;const d=i.group.children[2];d&&d.scale.set(r*.8,r*.8,1)}}}}const bl=[ke,Je,Xe,Be,on,Wt],Sh={[ke]:{times:g0,branchTime:x0,hpPerLevel:v0,hpBranch:M0},[Je]:{times:S0,branchTime:E0,hpPerLevel:b0,hpBranch:w0},[Xe]:{times:T0,branchTime:A0,hpPerLevel:R0,hpBranch:C0},[Be]:{times:P0,branchTime:D0,hpPerLevel:I0,hpBranch:L0},[on]:{times:U0,branchTime:N0,hpPerLevel:F0,hpBranch:O0},[Wt]:{times:B0,branchTime:0,hpPerLevel:z0,hpBranch:H0}};let Js=[],Ur=!0,wd=[],Uo=0;function nl(n,t,e,i){const s=Qt[n];if(!s)return null;const{x:a,z:r}=yn(t,e,J),o=(s.size-1)*J/2,d=bl.includes(n),c={id:zr(),type:n,col:t,row:e,team:i,hp:s.hp,maxHp:s.hp,x:a+o,z:r+o,buildProgress:0,buildTime:s.buildTime,producing:!1,produceTimer:0,alive:!0,fireCooldown:0,idOffset:Math.random()*Math.PI*2,level:0,branch:null,constructionState:d?"building":null,constructionTimer:0,constructionDuration:s.buildTime,fireTimer:0,target:null,angle:0,lastFireTime:0,totalDamage:0,kills:0,investedCost:s.cost,orientation:n===Wt?na:null,airStrikeCooldownUntil:0},h=n===Wt?Fn:Hd;for(let l=e;l<e+s.size;l++)for(let u=t;u<t+s.size;u++)Xp(u,l,h);return Js.push(c),Ur=!0,c}function rm(n){if(n.type!==ke)return null;const t=Qt[ke];return n.branch?t.branches[n.branch]:t.levels[n.level]}function om(n){if(n.type!==Je&&n.type!==Xe&&n.type!==on)return null;const t=Qt[n.type];return t.levels?n.branch?t.branches[n.branch]:t.levels[n.level]:null}function lm(n){if(n.type!==Be)return null;const t=Qt[Be];return t.levels?n.branch?t.branches[n.branch]:t.levels[n.level]:null}function cm(n){if(n.type===Wt)return Qt[Wt].levels[n.level].hp;const t=Sh[n.type];if(!t)return Qt[n.type].hp;const e=Qt[n.type].hp;return n.branch?Math.round(e*(1+t.hpPerLevel*2+t.hpBranch)):Math.round(e*(1+t.hpPerLevel*n.level))}function Xr(n){if(!bl.includes(n.type))return!1;const t=Qt[n.type];return t.levels?n.level<t.levels.length-1&&n.branch===null&&!n.constructionState:!1}function KE(n){return n.type===ke&&Xr(n)}function qr(n){if(!bl.includes(n.type)||n.type===Wt)return!1;const t=Qt[n.type];return!t.levels||!t.branches?!1:n.level>=t.levels.length-1&&n.branch===null&&!n.constructionState}function JE(n){return n.type===ke&&qr(n)}function Eh(n){return Xr(n)?Qt[n.type].levels[n.level+1].upgradeCost:1/0}function vr(n,t){if(!qr(n))return 1/0;const e=Qt[n.type].branches;return!e||!e[t]?1/0:e[t].cost}function bh(n){const t=Sh[n.type];t&&(n.constructionState="upgrading",n.constructionTimer=0,n.constructionDuration=t.times[n.level+1])}function QE(n){bh(n)}function wh(n,t){const e=Sh[n.type];e&&(n.constructionState="branching",n.constructionTimer=0,n.constructionDuration=e.branchTime,n._pendingBranchKey=t)}function tb(n,t){wh(n,t)}function dm(n){return n.type===Wt&&n.alive&&n.hp<n.maxHp&&!n.constructionState}function hm(n){return Qt[Wt].repairCost}function um(n){n.constructionState="repairing",n.constructionTimer=0,n.constructionDuration=Qt[Wt].repairTime}function fm(n,t){n.type!==Wt||!n.alive||(n.orientation=t,n._orientationChanged=!0)}function eb(n){if(!n.alive||n.team!==st)return 0;const t=Math.floor(n.investedCost*Jf);return Th(n),t}function il(n,t){return!(!n||!n.alive||n.type!==on||!n.branch||n.constructionState||t<n.airStrikeCooldownUntil)}function pm(n,t){n.airStrikeCooldownUntil=t+d_}function nb(n){n.level++;const t=n.maxHp;n.maxHp=cm(n),n.hp+=n.maxHp-t,n.investedCost+=Qt[n.type].levels[n.level].upgradeCost}function ib(n){n.branch=n._pendingBranchKey,n._pendingBranchKey=null;const t=n.maxHp;n.maxHp=cm(n),n.hp+=n.maxHp-t,n.investedCost+=Qt[n.type].branches[n.branch].cost}function sb(n,t,e){const i=[];for(let s=0;s<Js.length;s++){const a=Js[s];if(!a.alive)continue;const r=Qt[a.type],o=bl.includes(a.type);if(o&&a.constructionState){if(a.constructionTimer+=n,a.constructionState==="building"&&(a.buildProgress=a.constructionTimer),a.constructionTimer>=a.constructionDuration){const d=a.constructionState;d==="upgrading"?nb(a):d==="branching"?ib(a):d==="repairing"&&(a.hp=a.maxHp,a._justRepaired=!0),a.constructionState=null,d==="building"&&(a.buildProgress=a.buildTime),(d==="upgrading"||d==="branching"||d==="repairing")&&i.push(a)}continue}if(!o&&a.buildProgress<a.buildTime){a.buildProgress+=n,a.buildProgress>a.buildTime&&(a.buildProgress=a.buildTime);continue}if(r.produceUnit&&r.produceTime){const d=om(a),c=d?d.produceTime:r.produceTime,h=d&&d.produceUnit?d.produceUnit:r.produceUnit;if(a.produceTimer+=n,a.produceTimer>=c){a.produceTimer-=c;const l=a.team===st?-40:40;if(e&&e.createUnit){const u=d?{hpMult:d.hpMult||1,damageMult:d.damageMult||1,speedMult:d.speedMult||1,rangeMult:d.rangeMult||1,level:a.level,branch:a.branch}:null;e.createUnit(h,a.x,a.z+l,a.team,u,a.id)}}}}return i}function qn(){return Ur&&(wd=Js.filter(n=>n.alive),Ur=!1,Uo=0),Uo++,Uo%60===0&&(Js=Js.filter(n=>n.alive)),wd}function Th(n){n.alive=!1,Ur=!0;const t=Qt[n.type];if(t)for(let e=n.row;e<n.row+t.size;e++)for(let i=n.col;i<n.col+t.size;i++)Xp(i,e,$e);n.type===Wt&&(n._wallDestroyed=!0)}function ab(){Js=[],Ur=!0,wd=[],Uo=0}let De=[],Nr=!0,Td=[],No=0,xs=0;const fc=new qd(V0);function rb(n,t,e,i,s=null){const a=Ia[n];if(!a)return null;const r=s&&s.hpMult||1,o=s&&s.damageMult||1,d=s&&s.speedMult||1,c=s&&s.rangeMult||1,h=Math.round(a.hp*r),l=Math.round(a.damage*o),u=a.speed*d,f=Math.round(a.range*c),_={id:zr(),type:n,team:i,x:t,z:e,hp:h,maxHp:h,speed:u,damage:l,range:f,fireRate:a.fireRate,size:a.size,fireCooldown:0,path:null,pathIndex:0,targetId:null,alive:!0,inCombat:!1,rallyHold:!1,rallyX:0,rallyZ:0,_rallyAssigned:!1,_stuckTime:0,_lastProgressX:t,_lastProgressZ:e,idOffset:Math.random()*Math.PI*2,upgradeLevel:s&&s.level||0,upgradeBranch:s&&s.branch||null,stance:ln,targetPriority:"any",squadId:null,_defendTargetId:null,squadRallyX:null,squadRallyZ:null,_wallTarget:null,selected:!1,squadHighlight:!1};return n===pn&&(_.isAir=!0,_.orbitX=t,_.orbitZ=e,_.orbitAngle=Math.random()*Math.PI*2,_.flyHeight=ul,_.orbitRadius=Nm),De.push(_),Nr=!0,_}function ob(n,t){const e=t&&t.getUnits?t.getUnits():[],i=t&&t.getBuildings?t.getBuildings():[],s=t&&t.combatUnitHash,a=t&&t.combatBuildingHash,r=yn(ws,es,J),o=yn(si,Tn,J);let d=!1,c=!1;for(let h=0;h<e.length;h++){const l=e[h];if(l.alive&&(l.team===Kt?!d&&se(l.x,l.z,r.x,r.z)<=Sc&&(d=!0):!c&&se(l.x,l.z,o.x,o.z)<=Sc&&(c=!0),d&&c))break}for(let h=0;h<De.length;h++){const l=De[h];if(!l.alive||l.inCombat||l.isAir)continue;se(l.x,l.z,l._lastProgressX,l._lastProgressZ)>=Vm?(l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z):l.path&&l.pathIndex<l.path.length&&(l._stuckTime+=n)}for(let h=0;h<De.length;h++){const l=De[h];!l.alive||l.isAir||(l._prevX=l.x,l._prevZ=l.z)}for(let h=0;h<De.length;h++){const l=De[h];if(!l.alive)continue;if(l.isAir){l.fireCooldown>0&&(l.fireCooldown-=n,l.fireCooldown<0&&(l.fireCooldown=0)),lb(l,n);continue}if(l.fireCooldown>0&&(l.fireCooldown-=n,l.fireCooldown<0&&(l.fireCooldown=0)),l._stuckTime>=km&&l.id%4===xs%4){const m=Ln(l.x,l.z,J),p=3+Math.floor(Math.random()*3),v=Math.random()*Math.PI*2,M=Math.max(0,Math.min(qt-1,m.col+Math.round(Math.cos(v)*p))),y=Math.max(0,Math.min(Ke-1,m.row+Math.round(Math.sin(v)*p))),T=Ue(M,y);if((T===$e||T===On)&&t&&t.findPath){const b=t.findPath(m.col,m.row,M,y);b&&b.length>0&&(l.path=b,l.pathIndex=0)}l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z}{const m=l.team===st?Kt:st;let p=!1;if(s){const v=s.queryNear(l.x,l.z);for(let M=0;M<v.length;M++){const y=v[M];if(!(!y.alive||y.team!==m)&&se(l.x,l.z,y.x,y.z)<=l.range){p=!0;break}}}if(!p&&a){const v=a.queryNear(l.x,l.z);for(let M=0;M<v.length;M++){const y=v[M];if(!(!y.alive||y.team!==m)&&se(l.x,l.z,y.x,y.z)<=l.range){p=!0;break}}}if(l.inCombat=p,p&&l.stance!==ta)continue}const u=l.team===st?d:c,f=l.team===st?r:o;if(u&&l.stance===ln&&se(l.x,l.z,f.x,f.z)<=qm){l.rallyHold&&(l.rallyHold=!1);const p=l.team===st?ws:si,v=l.team===st?es:Tn,M=p+(l.id%5-2),y=v+(l.id%3-1),T=Math.max(0,Math.min(qt-1,M)),b=Math.max(0,Math.min(Ke-1,y));if(!l.path||l.pathIndex>=l.path.length||!l._defending){const A=Ln(l.x,l.z,J);if(t&&t.findPath){const x=t.findPath(A.col,A.row,T,b);x&&x.length>0&&(l.path=x,l.pathIndex=0)}}if(l._defending=!0,l.path&&l.pathIndex<l.path.length){const A=l.path[l.pathIndex],x=yn(A.col,A.row,J),S=x.x-l.x,I=x.z-l.z,P=Math.sqrt(S*S+I*I);if(P<J/2)l.pathIndex++;else{const N=l.speed*n,L=Math.min(N,P);l.x+=S/P*L,l.z+=I/P*L}}continue}if(l._defending&&!u&&(l._defending=!1,l.path=null,l.pathIndex=0),l.stance===br)continue;if(l.stance===Qs){const m=l.team===st?ws:si,p=l.team===st?es:Tn,v=l.team===st?r:o,M=l.team===st?Kt:st;let y=null,T=1/0;if(s){const b=s.queryNear(v.x,v.z);for(let A=0;A<b.length;A++){const x=b[A];if(!x.alive||x.team!==M||se(x.x,x.z,v.x,v.z)>nu)continue;const I=se(l.x,l.z,x.x,x.z);I<T&&(T=I,y=x)}}if(!y&&a){const b=a.queryNear(v.x,v.z);for(let A=0;A<b.length;A++){const x=b[A];if(!x.alive||x.team!==M||se(x.x,x.z,v.x,v.z)>nu)continue;const I=se(l.x,l.z,x.x,x.z);I<T&&(T=I,y=x)}}if(y){if((l._defendTargetId!==y.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const A=Ln(l.x,l.z,J),x=Ln(y.x,y.z,J);if(t&&t.findPath){const S=t.findPath(A.col,A.row,x.col,x.row);S&&S.length>0&&(l.path=S,l.pathIndex=0)}l._defendTargetId=y.id}}else{l._defendTargetId!==null&&(l.path=null,l.pathIndex=0,l._defendTargetId=null);const b=l.team===st?p-eu:p+eu,A=yn(m,b,J);if(se(l.x,l.z,A.x,A.z)<i_)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const S=Ln(l.x,l.z,J);if(t&&t.findPath){const I=t.findPath(S.col,S.row,m,b);I&&I.length>0&&(l.path=I,l.pathIndex=0)}}}if(l.path&&l.pathIndex<l.path.length){const b=l.path[l.pathIndex],A=yn(b.col,b.row,J),x=A.x-l.x,S=A.z-l.z,I=Math.sqrt(x*x+S*S);if(I<J/2)l.pathIndex++;else{const P=l.speed*n,N=Math.min(P,I);l.x+=x/I*N,l.z+=S/I*N}}continue}if(l.stance===ta&&l.squadRallyX!=null){const m=l.squadRallyX,p=l.squadRallyZ,v=l.team===st?Kt:st;let M=null,y=1/0;if(s){const T=s.queryNear(m,p);for(let b=0;b<T.length;b++){const A=T[b];if(!A.alive||A.team!==v||se(A.x,A.z,m,p)>iu)continue;const S=se(l.x,l.z,A.x,A.z);S<y&&(y=S,M=A)}}if(!M&&a){const T=a.queryNear(m,p);for(let b=0;b<T.length;b++){const A=T[b];if(!A.alive||A.team!==v||se(A.x,A.z,m,p)>iu)continue;const S=se(l.x,l.z,A.x,A.z);S<y&&(y=S,M=A)}}if(M){if((l._defendTargetId!==M.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const b=Ln(l.x,l.z,J),A=Ln(M.x,M.z,J);if(t&&t.findPath){const x=t.findPath(b.col,b.row,A.col,A.row);x&&x.length>0&&(l.path=x,l.pathIndex=0)}l._defendTargetId=M.id}}else{if(se(l.x,l.z,m,p)<s_){l._defendTargetId=null;continue}if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const b=Ln(l.x,l.z,J),A=Ln(m,p,J);if(t&&t.findPath){const x=t.findPath(b.col,b.row,A.col,A.row);x&&x.length>0&&(l.path=x,l.pathIndex=0)}l._defendTargetId=null}}if(l.path&&l.pathIndex<l.path.length){const T=l.path[l.pathIndex],b=yn(T.col,T.row,J),A=b.x-l.x,x=b.z-l.z,S=Math.sqrt(A*A+x*x);if(S<J/2)l.pathIndex++;else{const I=l.speed*n,P=Math.min(I,S);l.x+=A/S*P,l.z+=x/S*P}}continue}if(l.rallyHold){if(se(l.x,l.z,l.rallyX,l.rallyZ)<50)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const p=Ln(l.x,l.z,J),v=Ln(l.rallyX,l.rallyZ,J);if(t&&t.findPath){const M=t.findPath(p.col,p.row,v.col,v.row);M&&M.length>0&&(l.path=M,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const p=l.path[l.pathIndex],v=yn(p.col,p.row,J),M=v.x-l.x,y=v.z-l.z,T=Math.sqrt(M*M+y*y);if(T<J/2)l.pathIndex++;else{const b=l.speed*n,A=Math.min(b,T);l.x+=M/T*A,l.z+=y/T*A}}continue}const _=l.team===st?si:ws,g=l.team===st?Tn:es;if(l._wallTarget&&(!l._wallTarget.alive||l._wallTarget._wallDestroyed)&&(l._wallTarget=null,l.path=null,l.pathIndex=0),(!l.path||l.pathIndex>=l.path.length)&&l.id%4===xs%4){const m=Ln(l.x,l.z,J);if(t&&t.findPathThroughWalls){const p=t.findPathThroughWalls(m.col,m.row,_,g);if(p&&p.length>0){if(l._wallTarget=cb(p,i,l.team),l._wallTarget){const v=Ln(l._wallTarget.x,l._wallTarget.z,J),M=t.findPath?t.findPath(m.col,m.row,v.col,v.row):null;l.path=M&&M.length>0?M:p}else l.path=p;l.pathIndex=0}}else if(t&&t.findPath){const p=t.findPath(m.col,m.row,_,g);p&&p.length>0&&(l.path=p,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const m=l.path[l.pathIndex],p=yn(m.col,m.row,J),v=p.x-l.x,M=p.z-l.z,y=Math.sqrt(v*v+M*M);if(y<J/2)l.pathIndex++;else{const T=l.speed*n,b=Math.min(T,y);l.x+=v/y*b,l.z+=M/y*b}}}fc.clear();for(let h=0;h<De.length;h++)De[h].alive&&!De[h].isAir&&fc.insert(De[h]);for(let h=0;h<De.length;h++){const l=De[h];if(!l.alive||l.isAir)continue;const u=l.size*Vh,f=fc.queryNear(l.x,l.z);for(let _=0;_<f.length;_++){const g=f[_];if(g.id<=l.id)continue;const m=g.size*Vh,p=u+m,v=g.x-l.x,M=g.z-l.z,y=Math.sqrt(v*v+M*M);if(y<p&&y>.01){const T=p-y,b=Math.min(T,Gm*n),A=v/y,x=M/y,S=b*.5;l.x-=A*S,l.z-=x*S,g.x+=A*S,g.z+=x*S}else if(y<=.01){const T=Math.random()*Math.PI*2,b=2;l.x+=Math.cos(T)*b,l.z+=Math.sin(T)*b}}}for(let h=0;h<De.length;h++){const l=De[h];if(!l.alive||l.isAir)continue;l.x=Math.max(1,Math.min(l.x,qt*J-1)),l.z=Math.max(1,Math.min(l.z,Ke*J-1));const u=Math.floor(l.x/J),f=Math.floor(l.z/J),_=Ue(u,f);if(_!==$e&&_!==On){const g=Math.floor(l._prevX/J),m=Math.floor(l._prevZ/J),p=Ue(g,m);(p===$e||p===On)&&(l.x=l._prevX,l.z=l._prevZ)}}xs++}function Le(){return Nr&&(Td=De.filter(n=>n.alive),Nr=!1,No=0),No++,No%60===0&&(De=De.filter(n=>n.alive)),Td}function mm(n){n.alive=!1,Nr=!0}function lb(n,t){if(n.targetOrbitX!==void 0){const a=n.targetOrbitX-n.orbitX,r=n.targetOrbitZ-n.orbitZ,o=Math.sqrt(a*a+r*r);if(o>1){const d=j0*t;d>=o?(n.orbitX=n.targetOrbitX,n.orbitZ=n.targetOrbitZ):(n.orbitX+=a/o*d,n.orbitZ+=r/o*d)}}const e=n.orbitX-n.x,i=n.orbitZ-n.z,s=Math.sqrt(e*e+i*i);if(s>n.orbitRadius+20){const a=Om*t,r=Math.min(a,s);n.x+=e/s*r,n.z+=i/s*r,n._orbiting=!1}else n._orbiting||(n._orbiting=!0,n._curOrbitR=Math.max(s,5),n.orbitAngle=Math.atan2(n.z-n.orbitZ,n.x-n.orbitX)),n._curOrbitR+=(n.orbitRadius-n._curOrbitR)*Math.min(1,2*t),n.orbitAngle+=Fm*t,n.x=n.orbitX+Math.cos(n.orbitAngle)*n._curOrbitR,n.z=n.orbitZ+Math.sin(n.orbitAngle)*n._curOrbitR}function Ad(n,t,e){for(let i=0;i<De.length;i++)if(De[i].id===n&&De[i].alive&&De[i].isAir)return De[i].targetOrbitX=t,De[i].targetOrbitZ=e,!0;return!1}function Rd(){return De.filter(n=>n.alive&&n.isAir)}function cb(n,t,e){const i=e===st?Kt:st;for(let s=0;s<n.length;s++){const a=n[s];for(let r=0;r<t.length;r++){const o=t[r];if(!(!o.alive||o.type!==Wt||o.team!==i)&&o.col===a.col&&o.row===a.row)return o}}return null}function db(){De=[],Nr=!0,Td=[],No=0}let Cs=[],Qa=!0,Cd=[],Fo=0;function hb(n,t,e,i,s,a,r){const o=e-n,d=i-t,c=Math.sqrt(o*o+d*d);if(c===0)return null;const h=o/c*zh,l=d/c*zh,u={id:zr(),x:n,z:t,y:r??15,tx:e,tz:i,team:s,damage:a,vx:h,vz:l,life:Bm,alive:!0,homing:!1};return Cs.push(u),Qa=!0,u}function ub(n,t,e,i,s,a,r,o,d,c,h){const l={id:zr(),x:n,z:t,y:e||20,team:s,damage:a,alive:!0,homing:!0,target:i,speed:y0,trail:[],sourceBuilding:r,splashRadius:o||0,splashDamage:d||0,life:3,turretLevel:c||0,turretBranch:h||null};return Cs.push(l),Qa=!0,l}function fb(n){const t=[];for(let e=0;e<Cs.length;e++){const i=Cs[e];if(!i.alive){t.push(i);continue}if(i.homing){pb(i,n),i.alive||t.push(i);continue}i.x+=i.vx*n,i.z+=i.vz*n,i.life-=n;const s=i.tx-i.x,a=i.tz-i.z;if(s*s+a*a<100){i.alive=!1,t.push(i);continue}i.life<=0&&(i.alive=!1,t.push(i))}return t.length>0&&(Qa=!0),t}function pb(n,t){if(!n.target||!n.target.alive){n.splashRadius>0&&Tf(n),n.alive=!1;return}n.trail.push([n.x,n.z]),n.trail.length>6&&n.trail.shift();const e=n.target.x-n.x,i=n.target.z-n.z,s=Math.sqrt(e*e+i*i);if(s<n.speed*t+5){n.target.hp-=n.damage,n.sourceBuilding&&(n.sourceBuilding.totalDamage+=n.damage,n.target.hp<=0&&(n.sourceBuilding.kills+=1)),n.splashRadius>0&&Tf(n),n.hitTarget=!0,n.alive=!1;return}n.x+=e/s*n.speed*t,n.z+=i/s*n.speed*t,n.life-=t,n.life<=0&&(n.alive=!1)}function Tf(n){n.splashHit=!0,n.splashX=n.target?n.target.x:n.x,n.splashZ=n.target?n.target.z:n.z}function Pd(){return Qa&&(Cd=Cs.filter(n=>n.alive),Qa=!1,Fo=0),Fo++,Fo%60===0&&(Cs=Cs.filter(n=>n.alive)),Cd}function mb(){Cs=[],Qa=!0,Cd=[],Fo=0}const Ms=new qd(Zf),Fa=new qd(Zf);function Af(n,t,e){const i=(1-e/n.range)*Xm,a=(1-t.hp/t.maxHp)*Wm,r=n.stance===ta?"rally":n.targetPriority||ea,o=su[r]||su.any,d=t.type||"core",c=o[d]||0,h=n._wallTarget&&n._wallTarget===t?a_:0,l=n.stance===ta&&e<=n.range*o_?r_:0;return i+a+c+h+l}function _b(n,t){const e=t.getUnits(),i=t.getBuildings();Ms.clear(),Fa.clear();for(let r=0;r<e.length;r++)e[r].alive&&Ms.insert(e[r]);for(let r=0;r<i.length;r++)i[r].alive&&Fa.insert(i[r]);const s={[Ca]:12,[Pa]:10,[Da]:25,[pn]:29};for(let r=0;r<e.length;r++){const o=e[r];if(!o.alive)continue;if(o.fireCooldown>0&&!o.inCombat){o.targetX=void 0,o.targetZ=void 0;continue}const d=o.team===st?Kt:st;let c=null,h=-1/0;const l=Ms.queryNear(o.x,o.z);for(let f=0;f<l.length;f++){const _=l[f];if(!_.alive||_.team!==d)continue;const g=se(o.x,o.z,_.x,_.z);if(g>o.range)continue;const m=Af(o,_,g);m>h&&(h=m,c=_)}if(!(Ia[o.type]&&Ia[o.type].isAir)){const f=Fa.queryNear(o.x,o.z);for(let _=0;_<f.length;_++){const g=f[_];if(!g.alive||g.team!==d)continue;const m=se(o.x,o.z,g.x,g.z);if(m>o.range)continue;const p=Af(o,g,m);p>h&&(h=p,c=g)}}if(c?(o.targetX=c.x,o.targetZ=c.z):(o.targetX=void 0,o.targetZ=void 0),c&&o.fireCooldown<=0){o.fireCooldown=1/o.fireRate;const f=c.x-o.x,_=c.z-o.z,g=Math.sqrt(f*f+_*_)||1,m=s[o.type]||10,p=o.x+f/g*m,v=o.z+_/g*m,y=Ia[o.type]&&Ia[o.type].isAir?ul-5:void 0;t.createProjectile(p,v,c.x,c.z,o.team,o.damage,y)}}for(let r=0;r<i.length;r++){const o=i[r];if(!o.alive)continue;if(o.type===ke){vb(o,n,t);continue}const d=Qt[o.type];if(!d||!d.range||!d.damage||o.buildProgress<o.buildTime)continue;if(o.fireCooldown>0){o.fireCooldown-=n;continue}const c=o.team===st?Kt:st;let h=null,l=d.range;const u=Ms.queryNear(o.x,o.z);for(let f=0;f<u.length;f++){const _=u[f];if(!_.alive||_.team!==c)continue;const g=se(o.x,o.z,_.x,_.z);g<=l&&(l=g,h=_)}h&&(o.fireCooldown=1/d.fireRate,t.createProjectile(o.x,o.z,h.x,h.z,o.team,d.damage))}const a=t.getProjectiles?t.getProjectiles():[];for(let r=0;r<a.length;r++){const o=a[r];if(!o.alive||o.homing)continue;const d=o.team===st?Kt:st;let c=!1;const h=Ms.queryNear(o.x,o.z);for(let u=0;u<h.length;u++){const f=h[u];if(!f.alive||f.team!==d)continue;if(se(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hp<=0&&t.removeUnit(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1,c=!0;break}}if(c)continue;const l=Fa.queryNear(o.x,o.z);for(let u=0;u<l.length;u++){const f=l[u];if(!f.alive||f.team!==d)continue;if(se(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hp<=0&&t.removeBuilding(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1;break}}}for(let r=0;r<a.length;r++){const o=a[r];if(!(o.alive||!o.homing)&&(o.hitTarget&&o.target&&o.target.hp<=0&&o.target.alive&&t.removeUnit(o.target),o.splashHit&&o.splashRadius>0)){const d=o.team===st?Kt:st,c=Ms.queryNear(o.splashX,o.splashZ);for(let h=0;h<c.length;h++){const l=c[h];if(l===o.target||!l.alive||l.team!==d)continue;se(o.splashX,o.splashZ,l.x,l.z)<=o.splashRadius&&(l.hp-=o.splashDamage,o.sourceBuilding&&(o.sourceBuilding.totalDamage+=o.splashDamage),l.hp<=0&&t.removeUnit(l))}o.splashHit=!1}}}function gb(){return Ms}function xb(){return Fa}function vb(n,t,e){if(n.constructionState||n.buildProgress<n.buildTime)return;const i=rm(n);if(!i)return;n.fireTimer-=t;const s=n.team===st?Kt:st,a=i.range;let r=null,o=a;const d=Ms.queryNear(n.x,n.z);for(let h=0;h<d.length;h++){const l=d[h];if(!l.alive||l.team!==s)continue;const u=se(n.x,n.z,l.x,l.z);u<=o&&(o=u,r=l)}const c=Fa.queryNear(n.x,n.z);for(let h=0;h<c.length;h++){const l=c[h];if(!l.alive||l.team!==s||l===n)continue;const u=se(n.x,n.z,l.x,l.z);u<=o&&(o=u,r=l)}if(!r){n.target=null,n.targetX=void 0,n.targetZ=void 0;return}if(n.target=r,n.targetX=r.x,n.targetZ=r.z,n.fireTimer<=0&&(n.fireTimer=i.fireRate,n.lastFireTime=performance.now(),e.createHomingProjectile)){const h=e.getFirePoint?e.getFirePoint(n):{x:n.x,y:20,z:n.z};e.createHomingProjectile(h.x,h.z,h.y,r,n.team,i.damage,n,i.splashRadius||0,i.splashDamage||0,n.level,n.branch)}}let Ls={0:0,1:0},Zs={0:0,1:0},sl="normal",wl={[st]:{generators:0,territory:0,net:0},[Kt]:{generators:0,territory:0,net:0}};function Mb(n){sl=n;const t=ka[sl]||ka.normal;Ls[st]=t.playerStartEnergy||Hh,Ls[Kt]=t.aiStartEnergy||Hh,Zs[st]=0,Zs[Kt]=0,wl={[st]:{generators:0,territory:0,net:0},[Kt]:{generators:0,territory:0,net:0}}}function yb(n,t){const e=t?t.getBuildings():[],i=I1(e),s=ka[sl]||ka.normal;for(const a of[st,Kt]){let r=0,o=1;for(let l=0;l<e.length;l++){const u=e[l];if(u.alive&&u.team===a&&u.type===Be){const f=lm(u);f?(r+=f.incomeBonus,f.territoryMult>o&&(o=f.territoryMult)):r+=Qt[Be].incomeBonus}}a===Kt&&(r*=s.aiIncomeMult);const d=a===st?i.player:i.enemy,c=W0*d*o,h=r+c;if(wl[a]={generators:r,territory:c,net:h},Zs[a]+=h*n,Zs[a]>=1){const l=Math.floor(Zs[a]);Ls[a]+=l,Zs[a]-=l}}}function Mr(n){return Ls[n]}function tr(n,t){return Ls[n]<t?!1:(Ls[n]-=t,!0)}function Sb(n,t){Ls[n]+=t}function Rf(n){return wl[n]}function Eb(){Ls={0:0,1:0},Zs={0:0,1:0},sl="normal",wl={[st]:{generators:0,territory:0,net:0},[Kt]:{generators:0,territory:0,net:0}}}function Ah(){return{lastUpdate:0,playerBarracks:0,playerTurrets:0,playerFactories:0,playerGenerators:0,playerWalls:0,playerTotalUnits:0,playerHelicopters:0,playerArmyPower:0,aiArmyPower:0}}let Tt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",tempo:null,intel:Ah(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0},Mn={rallyStartTime:0,pushActive:!1},aa=0,er=null;function bb(n){const t=n,e=ka[t]||ka.normal,i=Qh[t]||Qh.normal,s=Object.keys(Kh),a=s[Math.floor(Math.random()*s.length)];Tt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:Kh[a],profileKey:a,difficulty:t,diffSettings:e,tempo:i,intel:Ah(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0},Mn={rallyStartTime:0,pushActive:!1}}function wb(n,t,e){if(aa=t,Ub(t,e),Ob(e),Fb(t,e),t-Tt.lastTick<zm)return;Tt.lastTick=t;const i=e.getBuildings(),s=e.getUnits();Db(t,i,s);const a=i.filter(h=>h.team===Kt&&h.alive),r=Lb(a,s);if(Bb(t,r,e),!(a.filter(h=>h.type===Je).length===0&&t>=Yn.build.barracks&&Oo(Je,a,e,t)||a.filter(h=>h.type===Xe).length===0&&t>=Yn.build.factory*.6&&Oo(Xe,a,e,t)||a.filter(h=>h.type===Be).length===0&&t>=10&&Oo(Be,a,e,t)))for(let h=0;h<X0;h++){const l=e.getEnergy(),u=e.getBuildings().filter(g=>g.team===Kt&&g.alive),f=Tb(t,l,u,e);if(!f||!Rb(f,u,e,t))break}}function Tb(n,t,e,i){const s=Tt.tempo,a=e.filter(c=>c.type===Wt&&c.alive&&c.hp/c.maxHp<c_&&!c.repairing).sort((c,h)=>c.hp/c.maxHp-h.hp/h.maxHp);for(let c=0;c<Math.min(a.length,J0);c++){const h=a[c];if(i.canRepairWall&&i.canRepairWall(h)){const l=i.getRepairCost?i.getRepairCost(h):Qt[Wt].repairCost;if(t>=l+Es)return{type:"repairWall",meta:{target:h}}}}if(n>=s.upgradeDelay&&n-Tt.lastUpgradeTime>=s.upgradeInterval){const c=Ab(n,t,e,i);if(c)return c}if(n-Tt.lastBuildTime<s.buildInterval)return null;const r=Jh[Tt.profileKey]||Jh.balanced,o={barracks:la.barracks,turret:la.turrets,factory:la.factories,generator:la.generators,helipad:la.helipads,wall:la.walls},d={barracks:Je,turret:ke,factory:Xe,generator:Be,helipad:on,wall:Wt};for(let c=0;c<r.length;c++){const h=(Tt.buildOrderIndex+c)%r.length,l=r[h],u=d[l];if(!u)continue;const f=Yn.build[l]||0;if(n<f)continue;const _=e.filter(p=>p.type===u).length,g=o[l]||4;if(_>=g)continue;const m=Qt[u].cost;if(!(t<m+Es))return Tt.buildOrderIndex=(h+1)%r.length,{type:"build",meta:{buildType:u}}}return null}function Ab(n,t,e,i){const s={[ke]:Yn.upgrade.turret,[Je]:Yn.upgrade.barracks,[Xe]:Yn.upgrade.factory,[Be]:Yn.upgrade.generator,[on]:Yn.upgrade.helipad,[Wt]:Yn.upgrade.wall};if(n>=s[ke]){const a=e.filter(r=>r.type===ke&&r.alive).sort((r,o)=>(o.totalDamage||0)-(r.totalDamage||0));for(const r of a){if(i.canUpgradeTurret&&i.canUpgradeTurret(r)){const o=i.getUpgradeCost(r);if(t>=o+Es)return{type:"upgradeTurret",meta:{target:r}}}if(i.canBranchTurret&&i.canBranchTurret(r)){const o=Cb(Tt.intel,e),d=i.getBranchCost(r,o);if(t>=d+Es)return{type:"branchTurret",meta:{target:r,branch:o}}}}}for(const a of[Je,Xe,Be,on]){const r=s[a]||0;if(n<r)continue;const o=e.filter(d=>d.type===a&&d.alive).sort((d,c)=>d.level-c.level);for(const d of o){if(i.canUpgradeBuilding&&i.canUpgradeBuilding(d)){const c=i.getUpgradeCost(d);if(t>=c+Es)return{type:"upgradeProduction",meta:{target:d}}}if(i.canBranchBuilding&&i.canBranchBuilding(d)){const c=Pb(a,Tt.intel,e,n),h=i.getBranchCost(d,c);if(t>=h+Es)return{type:"branchProduction",meta:{target:d,branch:c}}}}}if(n>=s[Wt]){const a=e.filter(r=>r.type===Wt&&r.alive).sort((r,o)=>r.level-o.level);for(const r of a)if(i.canUpgradeBuilding&&i.canUpgradeBuilding(r)){const o=i.getUpgradeCost(r);if(t>=o+Es)return{type:"upgradeWall",meta:{target:r}}}}return null}function Rb(n,t,e,i){switch(n.type){case"build":{const s=Oo(n.meta.buildType,t,e,i);return s&&(Tt.lastBuildTime=i),s}case"upgradeTurret":if(e.canUpgradeTurret(n.meta.target)){const s=e.getUpgradeCost(n.meta.target);if(e.spendEnergy(s))return e.startTurretUpgrade(n.meta.target),Tt.lastUpgradeTime=i,!0}return!1;case"branchTurret":if(e.canBranchTurret(n.meta.target)){const s=e.getBranchCost(n.meta.target,n.meta.branch);if(e.spendEnergy(s))return e.startTurretBranch(n.meta.target,n.meta.branch),Tt.lastUpgradeTime=i,!0}return!1;case"repairWall":if(e.canRepairWall&&e.canRepairWall(n.meta.target)){const s=e.getRepairCost?e.getRepairCost(n.meta.target):Qt[Wt].repairCost;if(e.spendEnergy(s))return e.startWallRepair(n.meta.target),!0}return!1;case"upgradeWall":case"upgradeProduction":if(e.canUpgradeBuilding&&e.canUpgradeBuilding(n.meta.target)){const s=e.getUpgradeCost(n.meta.target);if(e.spendEnergy(s))return e.startUpgrade(n.meta.target),Tt.lastUpgradeTime=i,!0}return!1;case"branchProduction":if(e.canBranchBuilding(n.meta.target)){const s=e.getBranchCost(n.meta.target,n.meta.branch);if(e.spendEnergy(s))return e.startBranch(n.meta.target,n.meta.branch),Tt.lastUpgradeTime=i,!0}return!1;default:return!1}}function Cb(n,t){const e=t.filter(i=>i.type===ke&&i.branch);if(e.length>0){const i=e.some(a=>a.branch==="A"),s=e.some(a=>a.branch==="B");if(i&&!s)return"B";if(s&&!i)return"A"}return n.playerTotalUnits>4||n.playerBarracks>=2?"B":(n.playerTanks>=2,"A")}function Pb(n,t,e,i){const s=e.filter(a=>a.type===n&&a.branch);if(s.length>0){const a=s.some(o=>o.branch==="A"),r=s.some(o=>o.branch==="B");if(a&&!r)return"B";if(r&&!a)return"A"}if(n===Je){const a=e.some(r=>r.type===Xe&&r.alive);return!a&&i>60?"A":a?"B":t.playerTanks>=2?"A":"B"}if(n===Be){const a=e.filter(r=>r.type===Be&&r.alive).length;return a<=1||t.playerGenerators>a?"A":"B"}return n===on?t.playerTurrets>=3?"B":t.playerTurrets<2&&t.playerTotalUnits>6?"A":"B":t.playerTotalUnits>6||i>150?"B":(t.playerTurrets>=3,"A")}function Db(n,t,e){const i=Tt.difficulty==="hard"?4:q0;if(n-Tt.intel.lastUpdate<i)return;Tt.intel.lastUpdate=n;const s=Tt.intel;s.playerBarracks=0,s.playerTurrets=0,s.playerFactories=0,s.playerGenerators=0,s.playerWalls=0,s.playerTotalUnits=0,s.playerHelicopters=0,s.playerTanks=0;let a=0,r=0;for(let o=0;o<t.length;o++){const d=t[o];d.team!==st||!d.alive||(d.type===Je?s.playerBarracks++:d.type===ke?s.playerTurrets++:d.type===Xe?s.playerFactories++:d.type===Be?s.playerGenerators++:d.type===Wt&&s.playerWalls++)}for(let o=0;o<e.length;o++){const d=e[o];if(d.alive){if(d.team===st){s.playerTotalUnits++,d.type==="tank"?s.playerTanks++:d.type===pn&&s.playerHelicopters++;const c=Ec[d.type]||1,h=d.type===pn?tu:1;a+=d.hp*c*h}else if(d.team===Kt){const c=Ec[d.type]||1,h=d.type===pn?tu:1;r+=d.hp*c*h}}}s.playerArmyPower=a,s.aiArmyPower=r}function Ib(n,t){aa=n,er=t.getUnits;const i=t.getUnits().filter(o=>o.alive&&o.team===st&&o.type!==pn&&(o.stance??ln)===ln),s=yn(Math.floor(qt/2),Xf,J);let a=0;for(const o of i)o.rallyHold&&a++;const r=Mn.rallyStartTime>0&&n-Mn.rallyStartTime>=Yf;if(a>=qf||a>0&&r){for(const o of i)o.rallyHold&&(o.rallyHold=!1,o.path=null,o.pathIndex=0);Mn.rallyStartTime=0,Mn.pushActive=!0}if(Mn.pushActive&&i.filter(d=>!d.rallyHold).length===0&&(Mn.pushActive=!1),!Mn.pushActive)for(const o of i)!o.rallyHold&&!o._rallyAssigned&&(o.rallyHold=!0,o.rallyX=s.x+(Math.random()-.5)*160,o.rallyZ=s.z+(Math.random()-.5)*120,o._rallyAssigned=!0,Mn.rallyStartTime===0&&(Mn.rallyStartTime=n))}function Lb(n,t){const e=yn(si,Tn,J);let i=0,s=0;for(let a=0;a<t.length;a++){const r=t[a];if(r.alive)if(r.team===st){const o=se(r.x,r.z,e.x,e.z);if(o<Cl)i+=r.hp;else if(o<Gh){const d=(o-Cl)/(Gh-Cl);i+=r.hp*(1-d*.7)}else r.z<e.z+200&&(i+=r.hp*.15)}else r.rallyHold?s+=r.hp*.3:s+=r.hp}return s<=0&&i>0?1:i<=0?0:Math.min(1,i/(s+i))}function Ub(n,t){const i=t.getUnits().filter(u=>u.alive&&u.team===Kt&&u.type!==pn&&(u.stance??ln)===ln),s=yn(Math.floor(qt/2),ui.rallyRow,J);let a=0,r=0;for(const u of i)if(u.rallyHold){a++;const f=Ec[u.type]||1;r+=u.hp*f}Tt._lastRallyUpdateTime=n;const o=Tt.intel,d=o.playerArmyPower+o.playerTurrets*ui.turretPower+o.playerWalls*ui.wallPower;let c=Math.max(ui.minWaveStrength,d*(Tt.profile.pushRatio||.9));Tt.consecutiveFailures>0&&(c*=1+Tt.consecutiveFailures*ui.failureStrengthMult);const h=n<Tt.pushCooldownUntil;if(a>=ui.minSize&&r>=c&&!h){for(const u of i)u.rallyHold&&(u.rallyHold=!1,u.path=null,u.pathIndex=0);Tt.rallyStartTime=0,Tt.pushActive=!0,Tt.pushStartTime=n,Tt._pushMarkedSuccess=!1,Tt.lastPushUnitCount=a}if(Tt.pushActive){const u=i.filter(_=>!_.rallyHold).length,f=n-Tt.pushStartTime;!Tt._pushMarkedSuccess&&u>0&&f>15&&(Tt._pushMarkedSuccess=!0,Tt.dynamicPushBonus=Math.max(0,Tt.dynamicPushBonus-ui.sizeShrink),Tt.consecutiveFailures=0),u===0&&(Tt.lastPushUnitCount>0&&!Tt._pushMarkedSuccess&&(Tt.dynamicPushBonus=Math.min(ui.maxSize,Tt.dynamicPushBonus+ui.sizeGrow),Tt.consecutiveFailures++,Tt.pushCooldownUntil=n+ui.cooldownAfterFailure),Tt.pushActive=!1,Tt.lastPushUnitCount=0,Tt._pushMarkedSuccess=!1)}if(!Tt.pushActive)for(const u of i)!u.rallyHold&&!u._rallyAssigned&&(u.rallyHold=!0,u.rallyX=s.x+(Math.random()-.5)*60,u.rallyZ=s.z+(Math.random()-.5)*60,u._rallyAssigned=!0,Tt.rallyStartTime===0&&(Tt.rallyStartTime=n))}function Nb(n){if(Tt.pushActive||n.type===pn||(n.stance??ln)!==ln)return;const t=yn(Math.floor(qt/2),ui.rallyRow,J);n.rallyHold=!0,n.rallyX=t.x+(Math.random()-.5)*60,n.rallyZ=t.z+(Math.random()-.5)*60,n._rallyAssigned=!0,Tt.rallyStartTime===0&&(Tt.rallyStartTime=aa)}function Fb(n,t){if(n<u_)return;const e=t.getEnergy();if(e<f_||e<Va+Es)return;const i=t.getBuildings();let s=null;for(let f=0;f<i.length;f++){const _=i[f];if(!(_.team!==Kt||!_.alive||_.type!==on)&&t.canAirStrike&&t.canAirStrike(_)){s=_;break}}if(!s)return;const r=t.getUnits().filter(f=>f.alive&&f.team===st),o=i.filter(f=>f.alive&&f.team===st);if(r.length===0&&o.length===0)return;let d=0,c=0,h=0;const l=yn(ws,es,J),u=pc(l.x,l.z,r,o);u>h&&(h=u,d=l.x,c=l.z);for(let f=0;f<Math.min(r.length,10);f++){const _=r[f],g=pc(_.x,_.z,r,o);g>h&&(h=g,d=_.x,c=_.z)}for(let f=0;f<Math.min(o.length,6);f++){const _=o[f],g=pc(_.x,_.z,r,o);g>h&&(h=g,d=_.x,c=_.z)}h<500||t.spendEnergy(Va)&&(t.markAirStrikeUsed(s),t.initiateAirStrike(Kt,d,c))}function pc(n,t,e,i){let s=0;const a=200;for(let r=0;r<e.length;r++){const o=e[r],d=se(o.x,o.z,n,t);d<a&&(s+=o.hp*(1-d/a))}for(let r=0;r<i.length;r++){const o=i[r],d=se(o.x,o.z,n,t);if(d<a){const c=o.type===Nn?5e3:o.hp*2;s+=c*(1-d/a)}}return s}function Ob(n){const t=n.getUnits(),e=[],i=[];for(let a=0;a<t.length;a++){const r=t[a];r.alive&&(r.team===Kt&&r.type===pn?e.push(r):r.team===st&&i.push(r))}if(e.length===0)return;if(i.length===0){const a=yn(Math.floor(qt/2),Xf,J);Pf(a.x,a.z,e,n);return}if(aa<Tt.heliRallyCommitUntil){const a=Cf(i);if(se(a.x,a.z,Tt.heliRallyX,Tt.heliRallyZ)<Z0)return}const s=Cf(i);Pf(s.x,s.z,e,n)}function Cf(n){let t=n[0],e=0;for(let i=0;i<n.length;i++){const s=n[i];let a=0;for(let r=0;r<n.length;r++){if(i===r)continue;se(s.x,s.z,n[r].x,n[r].z)<=Y0&&a++}a>e&&(e=a,t=s)}return{x:t.x,z:t.z}}function Pf(n,t,e,i){Tt.heliRallyX=n,Tt.heliRallyZ=t,Tt.heliRallyCommitUntil=aa+$0;for(const s of e)i.setHelicopterRally&&i.setHelicopterRally(s.id,n,t)}function Df(n,t,e,i,s){const r=Qt[n].size,o=(t+r/2)*J,d=(e+r/2)*J;let c=0;if(n===ke){if(s>=Yn.shared.turret){const _=Math.abs(e-Rs);c+=(10-_)*3}else{let f=1/0;for(const g of i)if((g.type===Je||g.type===Xe)&&g.alive){const m=se(o,d,g.x,g.z);m<f&&(f=m)}if(f<1/0){const g=J*K0;c+=Math.max(0,10-Math.abs(f-g)/J)}const _=Math.abs(e-Tn);c+=Math.min(_,8),c-=Math.max(0,_-8)*2}let l=1/0;for(const f of i)if(f.type===ke&&f.alive){const _=se(o,d,f.x,f.z);_<l&&(l=_)}l<1/0&&(c+=Math.min(l/J,8));const u=Math.abs(t-qt/2);c-=u*.5}else if(n===Wt){const h=jf,l=Kf;if(e>=h&&e<=l)c+=6;else{const b=Math.min(Math.abs(e-h),Math.abs(e-l));c-=b*1.5}const u=Qt[Nn].size,f=si+Math.floor(u/2),_=Tn+u;if(e===_||e===_+1){const b=Math.abs(t-f);b<=u+2&&(c+=14-b)}(t===si-1||t===si+u)&&e>=Tn&&e<=_&&(c+=10);let g=!1;for(const b of i){if(b.type===Wt||b.type===Nn)continue;const A=Math.round((b.x-J/2)/J),x=Math.round((b.z-J/2)/J),S=Qt[b.type]?Qt[b.type].size:1;if(t>=A-1&&t<=A+S&&e>=x-1&&e<=x+S){g=!0;break}}g&&(c-=6);let m=!1,p=!1,v=!1,M=!1;for(const b of i){if(b.type!==Wt)continue;const A=Math.round((b.x-J/2)/J),x=Math.round((b.z-J/2)/J);if(Math.abs(t-A)+Math.abs(e-x)===1&&(m=!0),x===e){const I=Math.abs(t-A);I<=2&&(v=!0),I===1&&(p=!0)}A===t&&Math.abs(e-x)===1&&(M=!0)}m&&(c+=5),p?c+=8:v&&(c+=6),M&&(c+=4);{let b=-1,A=!1,x=0;for(let S=0;S<=qt;S++){const I=S<qt?Ue(S,e):gi;if(I===gi||I===Hd){if(A){const P=S-b;if(P>=1&&P<=8&&t>=b&&t<S){const N=Math.max(5,18-P*2);x=Math.max(x,N)}A=!1}}else A||(b=S,A=!0)}c+=x}{let b=-1,A=-1;for(let x=e-1;x>=Math.max(0,e-6);x--)if(Ue(t,x)===gi){b=x;break}for(let x=e+1;x<=Math.min(Ke-1,e+6);x++)if(Ue(t,x)===gi){A=x;break}if(b>=0&&A>=0){const x=A-b-1;x>=1&&x<=6&&(c+=Math.max(3,12-x*2))}}{let b=!1,A=!1;if(t>0){const x=Ue(t-1,e);(x===gi||x===Fn)&&(b=!0)}if(t<qt-1){const x=Ue(t+1,e);(x===gi||x===Fn)&&(A=!0)}b&&A&&(c+=10)}const y=Math.floor(qt/2),T=Math.abs(t-y);T<=8&&(c+=Math.max(0,5-T*.5)),c+=Math.random()*3}else if(n===Be){const h=Math.max(0,8-Math.abs(e-Tn));c+=h*1.5,e>=hl&&e<=Rs&&(c+=8);let l=1/0;for(const f of i)if(f.type===Be&&f.alive){const _=se(o,d,f.x,f.z);_<l&&(l=_)}l<1/0&&(c+=Math.min(l/J,5));const u=Math.abs(t-qt/2);c-=u*.3}else{const h=Math.floor((Ho+dl)/2),l=Math.abs(e-h);c+=(10-l)*2;const u=Math.max(0,8-Math.abs(e-Tn));c+=u*.5;let f=1/0;for(const g of i)if(g.type===n&&g.alive){const m=se(o,d,g.x,g.z);m<f&&(f=m)}f<1/0&&(c+=Math.min(f/J,6));const _=Math.abs(t-qt/2);c-=_*.3}return c+=Math.random()*2,c}function Oo(n,t,e,i){const s=Qt[n],a=s.size;let r;n===ke&&i>=Yn.shared.turret||n===Be&&i>=Yn.shared.generator||n===Wt&&i>=Yn.shared.wall?r=Rs:r=dl;const o=[],d=n===Wt?50:30;for(let h=0;h<d;h++){const l=ou(2,qt-3-a+1),u=ou(Ho,r-a+1);if(e.isBuildable(l,u,a)){const f=Df(n,l,u,t,i);o.push({col:l,row:u,score:f})}}if(n===Wt){const h=new Set(o.map(_=>`${_.col},${_.row}`)),l=(_,g)=>{const m=`${_},${g}`;h.has(m)||g<Ho||g>r||_<1||_>=qt-1||e.isBuildable(_,g,1)&&(h.add(m),o.push({col:_,row:g,score:Df(n,_,g,t,i)}))},u=Qt[Nn].size,f=Tn+u;for(let _=si-2;_<=si+u+1;_++)for(let g=Tn;g<=f+1;g++)l(_,g);for(const _ of t){if(_.type!==Wt)continue;const g=Math.round((_.x-J/2)/J),m=Math.round((_.z-J/2)/J);for(const[p,v]of[[1,0],[-1,0],[0,1],[0,-1]])l(g+p,m+v)}for(let _=jf;_<=Math.min(Kf,r);_++){let g=-1,m=!1;for(let p=0;p<=qt;p++){const v=p<qt?Ue(p,_):gi;if(v===gi||v===Hd){if(m&&p-g<=8)for(let M=g;M<p;M++)l(M,_);m=!1}else v===$e&&(m||(g=p,m=!0))}}}if(o.length===0)return!1;o.sort((h,l)=>l.score-h.score);const c=o[0];return e.spendEnergy(s.cost)?(e.createBuilding(n,c.col,c.row),!0):!1}function Bb(n,t,e){const i=e.getSquads?.(Kt);if(!i||i.length===0)return;let s;if(t>Hm?s=i.length:t>kh?s=Math.max(1,Math.ceil(i.length*.5)):s=i.length>1?1:0,t>kh&&!Tt.pushActive){const r=e.getUnits?.();if(r){for(let o=0;o<r.length;o++){const d=r[o];!d.alive||d.team!==Kt||d.isAir||d.rallyHold&&(d.rallyHold=!1,d._rallyAssigned=!1,d.path=null,d.pathIndex=0)}Tt.rallyStartTime=0}}const a=[...i].sort((r,o)=>{const d=c=>c===Je?0:c===Xe?1:2;return d(r.buildingType)-d(o.buildingType)});for(let r=0;r<a.length;r++){const o=a[r],d=e.getUnitsBySquad?.(o.id)??[];if(r<s)e.setUnitsStance?.(d,Qs),e.setUnitsTargetPriority?.(d,wr);else{e.setUnitsStance?.(d,ln);const c=Tt.pushActive&&o.buildingType===Xe?Tr:ea;e.setUnitsTargetPriority?.(d,c)}}}function zb(){let n=0;if(er){const e=er();for(let i=0;i<e.length;i++){const s=e[i];s.alive&&s.team===st&&s.rallyHold&&(s.stance??ln)===ln&&n++}}const t=Mn.rallyStartTime>0?aa-Mn.rallyStartTime:0;return{holdingCount:n,pushSize:qf,rallyActive:!Mn.pushActive,timeRemaining:Math.max(0,Yf-t)}}function Hb(){if(!er)return;const n=er();for(let t=0;t<n.length;t++){const e=n[t];e.alive&&e.team===st&&e.rallyHold&&(e.stance??ln)===ln&&(e.rallyHold=!1,e.path=null,e.pathIndex=0)}Mn.rallyStartTime=0,Mn.pushActive=!0}function Gb(){Tt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",diffSettings:null,tempo:null,intel:Ah(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0},Mn={rallyStartTime:0,pushActive:!1},aa=0,er=null}let In=null,vt=null,$={},_i=null,xi=null,nr="",If=!1,So=0,mc=!1,_c=0;const is=200,vn=is/ti;let ts=null,za=null,Bo=!1;function kb(n,t){In=n,vt=t,In.innerHTML="";const e=Ta("ENERGY"),i=document.createElement("div");i.className="resource-display",i.innerHTML='<span>&#9889;</span> <span class="energy-value">100</span>',e.appendChild(i);const s=document.createElement("div");s.className="income-display",s.innerHTML='<span class="income-net">+0/s</span>',e.appendChild(s);const a=document.createElement("div");a.className="income-details",a.innerHTML=`
    <div class="income-row"><span>Generators</span><span class="income-val income-gen" id="inc-gen">+0</span></div>
    <div class="income-row"><span>Territory</span><span class="income-val" id="inc-terr">+0</span></div>
  `,e.appendChild(a),In.appendChild(e),$.energyValue=i.querySelector(".energy-value"),$.incomeNet=s.querySelector(".income-net"),$.incGen=a.querySelector("#inc-gen"),$.incTerr=a.querySelector("#inc-terr");const r=Ta("BASE STATUS"),o=Lf("YOUR BASE","2000 / 2000"),d=Uf();r.appendChild(o.container),r.appendChild(d.track),$.playerHpLabel=o.valueEl,$.playerHpFill=d.fill;const c=Lf("ENEMY BASE","2000 / 2000"),h=Uf();c.container.style.marginTop="8px",r.appendChild(c.container),r.appendChild(h.track),$.enemyHpLabel=c.valueEl,$.enemyHpFill=h.fill,In.appendChild(r);const l=Ta("BUILD");$.buildButtons={};for(const L of Wf){const k=Qt[L],B=document.createElement("button");B.className="build-btn",B.innerHTML=`<span>${k.label}</span><span class="cost">${k.cost} E</span>`,B.addEventListener("click",()=>{B.classList.contains("disabled")||(hn(),wn(),_i===L?(_i=null,B.classList.remove("selected")):(_i&&$.buildButtons[_i]&&$.buildButtons[_i].classList.remove("selected"),_i=L,B.classList.add("selected")),vt&&vt.onBuildSelect&&vt.onBuildSelect(_i))}),l.appendChild(B),$.buildButtons[L]=B}In.appendChild(l);const u=document.createElement("div");u.className="sidebar-section building-section hidden",u.innerHTML=`
    <div class="sidebar-title building-title">BUILDING</div>
    <div class="building-level"></div>
    <div class="building-stats"></div>
    <div class="building-tracker"></div>
    <div class="building-construction hidden">
      <div class="construction-label"></div>
      <div class="hp-bar-track"><div class="hp-bar-fill construction-fill" style="width:0%"></div></div>
    </div>
    <div class="building-actions"></div>
  `,In.appendChild(u),$.buildingSection=u,$.buildingTitle=u.querySelector(".building-title"),$.buildingLevel=u.querySelector(".building-level"),$.buildingStats=u.querySelector(".building-stats"),$.buildingTracker=u.querySelector(".building-tracker"),$.buildingConstruction=u.querySelector(".building-construction"),$.constructionLabel=u.querySelector(".construction-label"),$.constructionFill=u.querySelector(".construction-fill"),$.buildingActions=u.querySelector(".building-actions");const f=document.createElement("div");f.className="sidebar-section helicopter-section hidden",f.innerHTML=`
    <div class="sidebar-title heli-title">HELICOPTER</div>
    <div class="heli-hp-row">
      <span class="heli-hp-label">HP</span>
      <span class="heli-hp-value"></span>
    </div>
    <div class="hp-bar-track"><div class="hp-bar-fill heli-hp-fill hp-high" style="width:100%"></div></div>
    <div class="heli-rally-hint">CLICK MAP TO SET RALLY POINT</div>
    <button class="build-btn heli-deselect-btn">DESELECT</button>
  `,In.appendChild(f),$.heliSection=f,$.heliHpValue=f.querySelector(".heli-hp-value"),$.heliHpFill=f.querySelector(".heli-hp-fill"),f.querySelector(".heli-deselect-btn").addEventListener("click",()=>{wn(),vt&&vt.onHeliDeselect&&vt.onHeliDeselect()});const g=document.createElement("div");g.className="base-alert hidden",g.textContent="BASE UNDER ATTACK",r.insertBefore(g,o.container),$.baseAlert=g,$.playerHpTrack=d.track;const m=Ta("UNITS"),p=document.createElement("div");p.innerHTML=`
    <div class="unit-count"><span class="unit-count-label">Player Units</span><span class="unit-count-value" id="player-unit-count">0</span></div>
    <div class="unit-count"><span class="unit-count-label">Enemy Units</span><span class="unit-count-value" id="enemy-unit-count">0</span></div>
  `,m.appendChild(p),In.appendChild(m),$.playerUnitCount=p.querySelector("#player-unit-count"),$.enemyUnitCount=p.querySelector("#enemy-unit-count");const v=document.createElement("div");v.className="sidebar-section selection-command-bar hidden",v.innerHTML=`
    <div class="sidebar-title sel-cmd-title">0 UNITS SELECTED</div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">CMD</span>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${ln}">ADV</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${Qs}">DEF</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${br}">HOLD</button>
      <button class="sel-cmd-btn sel-cmd-btn--rally" data-sel="rally">RALLY</button>
    </div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">TGT</span>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${ea}">ANY</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${wr}">UNIT</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${Tr}">BLDG</button>
    </div>
    <button class="build-btn sel-deselect-btn">DESELECT</button>
  `,In.appendChild(v),$.selCmdSection=v,$.selCmdTitle=v.querySelector(".sel-cmd-title"),v.querySelectorAll('[data-sel="stance"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onSelectionStance&&vt.onSelectionStance(L.dataset.val)})}),v.querySelectorAll('[data-sel="rally"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onSelectionRallyClick&&vt.onSelectionRallyClick()})}),v.querySelectorAll('[data-sel="target"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onSelectionTarget&&vt.onSelectionTarget(L.dataset.val)})}),v.querySelector(".sel-deselect-btn").addEventListener("click",()=>{vt&&vt.onSelectionDeselect&&vt.onSelectionDeselect()});const M=document.createElement("div");M.className="sidebar-section squad-section hidden",M.innerHTML=`
    <div class="sidebar-title squad-title">SQUADS</div>
    <div class="squad-global-row">
      <div class="squad-global-group">
        <span class="squad-global-label">ALL</span>
        <button class="squad-global-btn" data-global="stance" data-val="${ln}">ADV</button>
        <button class="squad-global-btn" data-global="stance" data-val="${Qs}">DEF</button>
        <button class="squad-global-btn" data-global="stance" data-val="${br}">HOLD</button>
        <button class="squad-global-btn squad-global-btn--rally" data-global="rally" data-val="all">RALLY</button>
      </div>
      <div class="squad-global-group">
        <span class="squad-global-label">TGT</span>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${ea}">ANY</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${wr}">UNIT</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${Tr}">BLDG</button>
      </div>
    </div>
    <div class="squad-cards"></div>
  `,In.appendChild(M),$.squadSection=M,$.squadCards=M.querySelector(".squad-cards"),M.querySelectorAll('[data-global="stance"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onGlobalStance&&vt.onGlobalStance(L.dataset.val)})}),M.querySelectorAll('[data-global="target"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onGlobalTarget&&vt.onGlobalTarget(L.dataset.val)})}),M.querySelectorAll('[data-global="rally"]').forEach(L=>{L.addEventListener("click",()=>{vt&&vt.onGlobalRallyClick&&vt.onGlobalRallyClick()})});const y=document.createElement("div");y.className="selection-box hidden",document.body.appendChild(y),$.selBoxOverlay=y;const T=document.createElement("div");T.className="airstrike-overlay hidden",T.innerHTML=`
    <div class="airstrike-overlay-text">SELECT AIR STRIKE TARGET</div>
    <div class="airstrike-overlay-sub">Click on the map to designate target &bull; Right-click or ESC to cancel</div>
  `,document.body.appendChild(T),$.airStrikeOverlay=T;const b=document.createElement("div");b.className="sidebar-section rally-section hidden",b.innerHTML=`
    <div class="sidebar-title">RALLY</div>
    <div class="rally-count">0 / 3</div>
    <div class="hp-bar-track"><div class="hp-bar-fill rally-fill" style="width:0%"></div></div>
    <div class="rally-timer">Push in 0.0s</div>
    <button class="build-btn rally-push-btn">PUSH NOW</button>
  `,In.appendChild(b),$.rallySection=b,$.rallyCount=b.querySelector(".rally-count"),$.rallyFill=b.querySelector(".rally-fill"),$.rallyTimer=b.querySelector(".rally-timer"),b.querySelector(".rally-push-btn").addEventListener("click",()=>{vt&&vt.onPushNow&&vt.onPushNow()});const x=Ta("MAP"),S=document.createElement("canvas");S.className="minimap-canvas",S.width=is,S.height=is,x.appendChild(S),In.appendChild(x),$.minimapCanvas=S,$.minimapCtx=S.getContext("2d"),S.addEventListener("click",L=>{const k=S.getBoundingClientRect(),B=is/k.width,V=is/k.height,H=(L.clientX-k.left)*B,et=(L.clientY-k.top)*V,tt=H/vn,ht=et/vn;if(za!=null&&vt&&vt.onRallySet){vt.onRallySet(za,tt,ht),za=null;return}if(ts&&vt&&vt.onHelicopterRally){vt.onHelicopterRally(ts.id,tt,ht),wn(),vt.onHeliDeselect&&vt.onHeliDeselect();return}vt&&vt.onMinimapClick&&vt.onMinimapClick(tt,ht)});const I=Ta("INFO"),P=document.createElement("div");P.className="info-panel",P.textContent="Click a building type to place it.",I.appendChild(P),In.appendChild(I),$.infoPanel=P;const N=document.createElement("div");N.className="match-timer",N.textContent="00:00",In.appendChild(N),$.matchTimer=N}function Vb(n){if(!$.energyValue)return;if($.energyValue.textContent=Math.floor(n.energy),n.incomeBreakdown&&$.incomeNet){const i=n.incomeBreakdown,s=i.net>=0?"+":"";$.incomeNet.textContent=`${s}${i.net.toFixed(1)}/s`,$.incomeNet.className="income-net"+(i.net<=0?" income-low":""),$.incGen.textContent=i.generators>0?`+${i.generators.toFixed(1)}`:"+0",$.incTerr.textContent=i.territory>0?`+${i.territory.toFixed(1)}`:"+0"}let t=null,e=null;if(n.buildings)for(const i of n.buildings)i.type===Nn&&i.team===st&&(t=i),i.type===Nn&&i.team===Kt&&(e=i);if(t){const i=Qt[Nn],s=Math.max(0,t.hp/i.hp);$.playerHpFill.style.width=s*100+"%",$.playerHpFill.className="hp-bar-fill "+Dd(s),$.playerHpLabel.textContent=`${Math.ceil(t.hp)} / ${i.hp}`}if(e){const i=Qt[Nn],s=Math.max(0,e.hp/i.hp);$.enemyHpFill.style.width=s*100+"%",$.enemyHpFill.className="hp-bar-fill "+Dd(s),$.enemyHpLabel.textContent=`${Math.ceil(e.hp)} / ${i.hp}`}if(n.matchTime!=null){const i=Math.floor(n.matchTime),s=Math.floor(i/60),a=i%60;$.matchTimer.textContent=String(s).padStart(2,"0")+":"+String(a).padStart(2,"0")}for(const i of Wf){const s=Qt[i],a=$.buildButtons[i];a&&(n.energy<s.cost?a.classList.add("disabled"):a.classList.remove("disabled"))}if(n.units){let i=0,s=0;for(const a of n.units)a.team===st?i++:s++;$.playerUnitCount.textContent=i,$.enemyUnitCount.textContent=s}if($b(n),Yb(n),Zb(n),$.airStrikeOverlay){const i=Bo||n.airStrikePending;$.airStrikeOverlay.classList.toggle("hidden",!i),document.body.classList.toggle("airstrike-targeting",!!i),!n.airStrikePending&&Bo&&(Bo=!1)}jb(n.baseUnderAttack,n.dt||0),Kb(n),Jb(n),xi&&xm(xi,n.energy,n.squads,n.matchTime),ts&&ts.alive?_m(ts):ts&&!ts.alive&&(wn(),vt&&vt.onHeliDeselect&&vt.onHeliDeselect())}function Wb(n){n&&(ts=n,hn(),Ji(),$.heliSection.classList.remove("hidden"),_m(n))}function wn(){ts=null,$.heliSection&&$.heliSection.classList.add("hidden")}function _m(n){const t=Ia[n.type];if(!t)return;const e=n.maxHp||t.hp,i=Math.max(0,n.hp/e);$.heliHpValue.textContent=`${Math.ceil(n.hp)} / ${e}`,$.heliHpFill.style.width=i*100+"%",$.heliHpFill.className="hp-bar-fill "+Dd(i)}function gm(n){if(!n||n.team!==st){hn();return}if(!Qt[n.type]){hn();return}xi=n,Ji(),wn(),$.buildingSection.classList.remove("hidden"),xm(n,0)}function hn(){xi=null,nr="",$.buildingSection&&$.buildingSection.classList.add("hidden")}function al(){return xi}function xm(n,t,e,i){if(!n||!n.alive){hn();return}const s=Qt[n.type];if(n.type===Wt)$.buildingTitle.textContent=`WALL L${n.level}`;else{let r=s.label.toUpperCase();if(e&&(n.type===Je||n.type===Xe||n.type===on)){const o=e.find(d=>d.buildingId===n.id);o&&(r=o.label.toUpperCase())}$.buildingTitle.textContent=r}if(s.levels){let r=`Level ${n.level}`;if(n.type===Wt)r=s.description||"Destructible barrier";else if(n.branch){const o=s.branches[n.branch];r=`[${n.branch}] ${o.name}`}$.buildingLevel.textContent=r,$.buildingLevel.className="building-level"+(n.branch?" building-branched":"")}else $.buildingLevel.textContent=s.description||"",$.buildingLevel.className="building-level";let a="";if(n.type===ke){const r=rm(n);r&&(a+=`<div class="info-stat"><span>DMG</span><span class="info-stat-value">${r.damage}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.fireRate.toFixed(2)}s</span></div>`,a+=`<div class="info-stat"><span>RANGE</span><span class="info-stat-value">${r.range}</span></div>`,r.splashRadius&&(a+=`<div class="info-stat"><span>SPLASH</span><span class="info-stat-value">${r.splashRadius}px</span></div>`))}else if(n.type===Be){const r=lm(n);r&&(a+=`<div class="info-stat"><span>INCOME</span><span class="info-stat-value income-gen">+${r.incomeBonus}/s</span></div>`,r.territoryMult>1&&(a+=`<div class="info-stat"><span>TERRITORY MULT</span><span class="info-stat-value income-gen">x${r.territoryMult}</span></div>`))}else if(n.type===Wt)a+='<div class="info-stat"><span>TYPE</span><span class="info-stat-value">BARRIER</span></div>';else{const r=om(n);if(r){const o=r.produceUnit||s.produceUnit;a+=`<div class="info-stat"><span>UNIT</span><span class="info-stat-value">${o.toUpperCase()}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.produceTime.toFixed(1)}s</span></div>`,r.hpMult&&r.hpMult!==1&&(a+=`<div class="info-stat"><span>UNIT HP</span><span class="info-stat-value">+${Math.round((r.hpMult-1)*100)}%</span></div>`),r.damageMult&&r.damageMult!==1&&(a+=`<div class="info-stat"><span>UNIT DMG</span><span class="info-stat-value">+${Math.round((r.damageMult-1)*100)}%</span></div>`),r.speedMult&&r.speedMult!==1&&(a+=`<div class="info-stat"><span>UNIT SPD</span><span class="info-stat-value">+${Math.round((r.speedMult-1)*100)}%</span></div>`),r.rangeMult&&r.rangeMult!==1&&(a+=`<div class="info-stat"><span>UNIT RNG</span><span class="info-stat-value">+${Math.round((r.rangeMult-1)*100)}%</span></div>`)}}if(a+=`<div class="info-stat"><span>HP</span><span class="info-stat-value">${Math.ceil(n.hp)} / ${n.maxHp}</span></div>`,$.buildingStats.innerHTML=a,n.type===ke?$.buildingTracker.innerHTML=`<div class="info-stat"><span>Dmg dealt</span><span class="info-stat-value">${n.totalDamage}</span></div><div class="info-stat"><span>Kills</span><span class="info-stat-value">${n.kills}</span></div>`:$.buildingTracker.innerHTML="",s.levels)if(n.constructionState&&n.constructionState!=="building"){$.buildingConstruction.classList.remove("hidden");const r=Math.min(1,n.constructionTimer/n.constructionDuration),o=Math.max(0,n.constructionDuration-n.constructionTimer).toFixed(1);let d="UPGRADING",c="construction-upgrade";n.constructionState==="branching"?(d="BRANCHING",c="construction-branch"):n.constructionState==="repairing"&&(d="REPAIRING",c="construction-repair"),$.constructionLabel.textContent=`${d}... ${o}s`,$.constructionFill.style.width=r*100+"%",$.constructionFill.className="hp-bar-fill "+c,$.buildingActions.innerHTML="",nr=""}else $.buildingConstruction.classList.add("hidden"),Xb(n,t,i);else $.buildingConstruction.classList.add("hidden"),$.buildingActions.innerHTML="",nr=""}function Xb(n,t,e){const i=Xr(n),s=n.type!==Wt&&qr(n),a=i?Eh(n):0,r=i&&t>=a;let o=!1,d=!1;s&&(o=t>=vr(n,"A"),d=t>=vr(n,"B"));const c=n.type===Wt,h=c&&n.hp<n.maxHp&&!n.constructionState,l=c?Qt[Wt].repairCost||10:0,u=h&&t>=l,f=il(n,e||0),_=f&&t>=Va,g=n.airStrikeCooldownUntil&&e?Math.max(0,n.airStrikeCooldownUntil-e):0,m=`${n.id}:${n.level}:${n.branch}:${i}:${s}:${r}:${o}:${d}:${h}:${u}:${Math.ceil(n.hp)}:${n.orientation||""}:${f}:${_}:${Math.floor(g)}`;if(m===nr)return;nr=m;let p="";if(c){const v=[{key:na,label:"H"},{key:Go,label:"V"},{key:Gd,label:"NE"},{key:kd,label:"NW"},{key:Vd,label:"SE"},{key:Wd,label:"SW"}],M=n.orientation||na;p+='<div class="wall-orient-row">';for(const y of v){const T=M===y.key?" active":"";p+=`<button class="wall-orient-btn${T}" data-action="orient" data-orient="${y.key}">${y.label}</button>`}p+="</div>"}if(h&&(p+=`<button class="build-btn turret-action-btn repair-btn ${u?"":"disabled"}" data-action="repair">
      <span>REPAIR</span><span class="cost">${l} E</span>
    </button>`),i&&(p+=`<button class="build-btn turret-action-btn ${r?"":"disabled"}" data-action="upgrade">
      <span>UPGRADE TO L${n.level+1}</span><span class="cost">${a} E</span>
    </button>`),s){const v=Qt[n.type].branches;for(const M of["A","B"]){const y=v[M],T=vr(n,M),b=t>=T;p+=`<button class="build-btn turret-action-btn branch-btn ${b?"":"disabled"}" data-action="branch" data-key="${M}">
        <span class="br-key">[${M}]</span> <span>${y.name}</span>
        <span class="br-desc">${y.desc}</span>
        <span class="cost">${T} E</span>
      </button>`}}if(n.type===on&&n.branch&&(f?p+=`<button class="build-btn turret-action-btn airstrike-btn ${_?"":"disabled"}" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">${Va} E</span>
      </button>`:g>0&&(p+=`<button class="build-btn turret-action-btn airstrike-btn disabled" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">COOLDOWN ${Math.ceil(g)}s</span>
      </button>`)),c){const v=Math.floor((n.investedCost||0)*Jf);p+=`<button class="build-btn turret-action-btn demolish-btn" data-action="demolish">
      <span>DESTROY</span><span class="cost">REFUND ${v}E</span>
    </button>`}$.buildingActions.innerHTML=p,$.buildingActions.querySelectorAll('[data-action="orient"]').forEach(v=>{v.addEventListener("click",()=>{const M=v.getAttribute("data-orient");vt&&vt.onWallOrient&&vt.onWallOrient(xi,M)})}),$.buildingActions.querySelectorAll('[data-action="demolish"]').forEach(v=>{v.addEventListener("click",()=>{vt&&vt.onWallDemolish&&vt.onWallDemolish(xi),hn()})}),$.buildingActions.querySelectorAll('[data-action="repair"]').forEach(v=>{v.addEventListener("click",()=>{v.classList.contains("disabled")||vt&&vt.onWallRepair&&vt.onWallRepair(xi)})}),$.buildingActions.querySelectorAll('[data-action="upgrade"]').forEach(v=>{v.addEventListener("click",()=>{v.classList.contains("disabled")||vt&&vt.onBuildingUpgrade&&vt.onBuildingUpgrade(xi)})}),$.buildingActions.querySelectorAll('[data-action="branch"]').forEach(v=>{v.addEventListener("click",()=>{if(v.classList.contains("disabled"))return;const M=v.getAttribute("data-key");vt&&vt.onBuildingBranch&&vt.onBuildingBranch(xi,M)})}),$.buildingActions.querySelectorAll('[data-action="airstrike"]').forEach(v=>{v.addEventListener("click",()=>{v.classList.contains("disabled")||vt&&vt.onAirStrike&&vt.onAirStrike(xi)})})}function ys(n){za=n,zo=""}function qb(n){Bo=!0,nr=""}function Ji(){_i&&$.buildButtons[_i]&&$.buildButtons[_i].classList.remove("selected"),_i=null}function Ta(n){const t=document.createElement("div");t.className="sidebar-section";const e=document.createElement("div");return e.className="sidebar-title",e.textContent=n,t.appendChild(e),t}function Lf(n,t){const e=document.createElement("div");e.className="hp-label";const i=document.createElement("span");i.className="hp-label-name",i.textContent=n;const s=document.createElement("span");return s.className="hp-label-value",s.textContent=t,e.appendChild(i),e.appendChild(s),{container:e,valueEl:s}}function Uf(){const n=document.createElement("div");n.className="hp-bar-track";const t=document.createElement("div");return t.className="hp-bar-fill hp-high",t.style.width="100%",n.appendChild(t),{track:n,fill:t}}function Dd(n){return n>.5?"hp-high":n>.25?"hp-mid":"hp-low"}let zo="";function Yb(n){const t=n.squads;if(!t||t.length===0){$.squadSection&&!$.squadSection.classList.contains("hidden")&&$.squadSection.classList.add("hidden"),zo="";return}$.squadSection.classList.remove("hidden");const e=t.map(r=>`${r.id}:${r.spawnStance||Aa}:${r.spawnTargetPriority||Ra}:${r.unitCount}:${r.buildingAlive}`).join("|")+`|rp:${za||""}`;if(e===zo)return;zo=e;const i=t.every(r=>(r.spawnStance||Aa)===(t[0].spawnStance||Aa))?t[0].spawnStance||Aa:null,s=t.every(r=>(r.spawnTargetPriority||Ra)===(t[0].spawnTargetPriority||Ra))?t[0].spawnTargetPriority||Ra:null;$.squadSection.querySelectorAll('[data-global="stance"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===i)}),$.squadSection.querySelectorAll('[data-global="rally"]').forEach(r=>{const o=za==="all";r.classList.toggle("active",o),r.classList.toggle("pending",o)}),$.squadSection.querySelectorAll('[data-global="target"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===s)});let a="";for(const r of t){const o=r.buildingAlive?"":" squad-card--dead",d=r.spawnStance||Aa,c=r.spawnTargetPriority||Ra;a+=`<div class="squad-card${o}" data-squad="${r.id}">
      <div class="squad-card-header" data-squad-click="${r.id}">
        <span class="squad-label">${r.label}</span>
        <span class="squad-count">${r.unitCount}</span>
      </div>
      <div class="squad-spawn-row">
        <span class="squad-spawn-label">SPAWN</span>
        <button class="squad-spawn-btn${d===ln?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${ln}">ADV</button>
        <button class="squad-spawn-btn${d===Qs?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${Qs}">DEF</button>
        <button class="squad-spawn-btn${d===br?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${br}">HOLD</button>
        <span class="squad-cmd-sep"></span>
        <button class="squad-spawn-btn squad-spawn-btn--target${c===ea?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${ea}">ANY</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${c===wr?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${wr}">UNIT</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${c===Tr?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${Tr}">BLDG</button>
      </div>
    </div>`}$.squadCards.innerHTML=a,$.squadCards.querySelectorAll("[data-squad-click]").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.squadClick);vt&&vt.onSquadCardClick&&vt.onSquadCardClick(o)})}),$.squadCards.querySelectorAll('[data-spawn="stance"]').forEach(r=>{r.addEventListener("click",()=>{vt&&vt.onSpawnStanceChange&&vt.onSpawnStanceChange(Number(r.dataset.squadId),r.dataset.val)})}),$.squadCards.querySelectorAll('[data-spawn="target"]').forEach(r=>{r.addEventListener("click",()=>{vt&&vt.onSpawnTargetChange&&vt.onSpawnTargetChange(Number(r.dataset.squadId),r.dataset.val)})})}let gc="";function $b(n){const t=n.selectedUnitCount||0;if(t===0){$.selCmdSection&&!$.selCmdSection.classList.contains("hidden")&&$.selCmdSection.classList.add("hidden"),gc="";return}$.selCmdSection.classList.remove("hidden");const e=`${t}`;e!==gc&&(gc=e,$.selCmdTitle.textContent=`${t} UNIT${t!==1?"S":""} SELECTED`)}function Zb(n){const t=n.selectionBoxScreen;if(!t){$.selBoxOverlay&&!$.selBoxOverlay.classList.contains("hidden")&&$.selBoxOverlay.classList.add("hidden");return}$.selBoxOverlay.classList.remove("hidden"),$.selBoxOverlay.style.left=t.x1+"px",$.selBoxOverlay.style.top=t.y1+"px",$.selBoxOverlay.style.width=t.x2-t.x1+"px",$.selBoxOverlay.style.height=t.y2-t.y1+"px"}function jb(n,t){So>0&&(So-=t),n&&!If&&So<=0&&(mc=!0,_c=3,So=5,$.baseAlert.classList.remove("hidden"),$.playerHpTrack.classList.add("hp-bar-alert")),mc&&(_c-=t,(_c<=0||!n)&&(mc=!1,$.baseAlert.classList.add("hidden"),$.playerHpTrack.classList.remove("hp-bar-alert"))),If=!!n}function Kb(n){if(!(n.rallyActive&&n.rallyHoldingCount>0)){$.rallySection&&!$.rallySection.classList.contains("hidden")&&$.rallySection.classList.add("hidden");return}$.rallySection.classList.remove("hidden");const e=n.rallyHoldingCount||0,i=n.rallyPushSize||1,s=n.rallyTimeRemaining||0;$.rallyCount.textContent=`${e} / ${i}`,$.rallyFill.style.width=e/i*100+"%",$.rallyTimer.textContent=`Push in ${s.toFixed(1)}s`}function Jb(n){const t=$.minimapCtx;if(!t)return;if(t.fillStyle="#08081A",t.fillRect(0,0,is,is),n.obstacles){t.fillStyle="#505064";const s=J*vn;for(const a of n.obstacles)t.fillRect(a.col*s,a.row*s,s,s)}const e=Vf*J*vn,i=(dl+1)*J*vn;if(t.strokeStyle="rgba(0,255,255,0.25)",t.lineWidth=1,t.beginPath(),t.moveTo(0,e),t.lineTo(is,e),t.stroke(),t.strokeStyle="rgba(255,50,50,0.25)",t.beginPath(),t.moveTo(0,i),t.lineTo(is,i),t.stroke(),n.buildings)for(const s of n.buildings){if(!s.alive)continue;const a=Qt[s.type],r=(a?a.size:1)*J*vn;t.fillStyle=s.team===st?"#00ffff":"#ff3232",t.fillRect(s.col*J*vn,s.row*J*vn,r,r)}if(n.units)for(const s of n.units){if(!s.alive)continue;const a=s.team===st?"#00ffff":"#ff3232",r=s.x*vn,o=s.z*vn;s.isAir?(t.fillStyle=a,t.beginPath(),t.moveTo(r,o-3),t.lineTo(r-2.5,o+2),t.lineTo(r+2.5,o+2),t.closePath(),t.fill()):(t.fillStyle=a,t.beginPath(),t.arc(r,o,2,0,Math.PI*2),t.fill())}if(n.squads)for(const s of n.squads){if(s.stance!==ta||s.rallyX==null)continue;const a=s.rallyX*vn,r=s.rallyZ*vn;t.strokeStyle="#32ff64",t.lineWidth=1.5,t.beginPath(),t.moveTo(a,r-4),t.lineTo(a+4,r),t.lineTo(a,r+4),t.lineTo(a-4,r),t.closePath(),t.stroke()}if(n.cameraInfo){const s=n.cameraInfo;t.strokeStyle="rgba(255,255,255,0.5)",t.lineWidth=1;const a=(s.x-s.viewWidth/2)*vn,r=(s.z-s.viewHeight/2)*vn,o=s.viewWidth*vn,d=s.viewHeight*vn;t.strokeRect(a,r,o,d)}}let rl=null,Tl=null,Fr=null,yr=null,Re=null,Ii=null,Or=null,js=null,Id=null;const vm=new Ti(new F(0,1,0),0),Qb=new Ti(new F(0,1,0),-ul),xc=new F,vc=new F;let Si=null,Ld=null,Ud=null,rs=null,Nd=null,Fi=null,Fd=null,Us=!1,ol=null,ir=[],Od=null,Bd=null,An=null,Mi=null,ls=!1,cs=null;function tw(n,t,e){rl=n,Tl=t,cs=e||null,Fr=new Pp,yr=new Pt;const i=rl.domElement;i.addEventListener("mousemove",ew),i.addEventListener("mousedown",nw),i.addEventListener("mouseup",iw),i.addEventListener("contextmenu",rw),document.addEventListener("keydown",aw)}function ew(n){const t=rl.domElement.getBoundingClientRect();if(yr.x=(n.clientX-t.left)/t.width*2-1,yr.y=-((n.clientY-t.top)/t.height)*2+1,Fr.setFromCamera(yr,Tl),Fr.ray.intersectPlane(vm,xc)?Re=Ln(xc.x,xc.z,J):Re=null,Us&&ol&&Re&&(ir=sw(ol,Re)),An){Mi={x:n.clientX,y:n.clientY};const i=n.clientX-An.x,s=n.clientY-An.y;!ls&&Math.sqrt(i*i+s*s)>t_&&(ls=!0,cs&&(cs.enabled=!1))}}function nw(n){if(n.button===0){if(Ii===Wt&&Re){Us=!0,ol={col:Re.col,row:Re.row},ir=[{col:Re.col,row:Re.row}],cs&&(cs.enabled=!1);return}!Ii&&!Us&&rs==null&&Fi==null&&Si==null&&(An={x:n.clientX,y:n.clientY},Mi=null,ls=!1)}}function iw(n){if(n.button===0){if(Us){ir.length>0&&Od&&Od(ir),Rh();return}if(ls&&An&&Mi){const t=rl.domElement.getBoundingClientRect(),e=Nf(An.x,An.y,t),i=Nf(Mi.x,Mi.y,t);if(e&&i&&Bd){const s=Math.min(e.x,i.x),a=Math.min(e.z,i.z),r=Math.max(e.x,i.x),o=Math.max(e.z,i.z);Bd(s,a,r,o)}ll();return}if(ll(),Fi!=null&&Re){const t=Re.col*J+J/2,e=Re.row*J+J/2;Fd&&Fd(Fi,t,e),Fi=null;return}if(rs!=null&&Re){const t=Re.col*J+J/2,e=Re.row*J+J/2;Nd&&Nd(rs,t,e),rs=null;return}if(Si!=null&&Re){const t=Re.col*J+J/2,e=Re.row*J+J/2;Ld&&Ld(Si,t,e),Si=null;return}if(!Ii&&Ud&&(Fr.setFromCamera(yr,Tl),Fr.ray.intersectPlane(Qb,vc))){const e=Ud();for(const i of e)if(se(vc.x,vc.z,i.x,i.z)<35){Si=i.id,js&&js(-2,-2,0,0);return}}if(Ii&&Re&&Or)Or(Re.col,Re.row,Ii);else if(!Ii&&Re&&js){const t=Re.col*J+J/2,e=Re.row*J+J/2;js(Re.col,Re.row,t,e)}}}function sw(n,t){const e=[],i=t.col-n.col,s=t.row-n.row;if(Math.abs(i)>=Math.abs(s)){const a=Math.min(n.col,t.col),r=Math.max(n.col,t.col);for(let o=a;o<=r;o++)e.push({col:o,row:n.row})}else{const a=Math.min(n.row,t.row),r=Math.max(n.row,t.row);for(let o=a;o<=r;o++)e.push({col:n.col,row:o})}return e}function Rh(){Us=!1,ol=null,ir=[],cs&&(cs.enabled=!0)}function ll(){const n=ls;An=null,Mi=null,ls=!1,n&&cs&&(cs.enabled=!0)}function Nf(n,t,e){const i=new Pt((n-e.left)/e.width*2-1,-((t-e.top)/e.height)*2+1),s=new Pp;s.setFromCamera(i,Tl);const a=new F;return s.ray.intersectPlane(vm,a)?{x:a.x,z:a.z}:null}function aw(n){if((n.key==="h"||n.key==="H"||n.key==="Home")&&Id&&Id(),n.key==="Escape"){if(ls||An){ll();return}if(Us){Rh();return}if(Fi!=null){Fi=null;return}if(rs!=null){rs=null;return}Si!=null&&(Si=null)}}function rw(n){if(n.preventDefault(),ls||An){ll();return}if(Us){Rh();return}if(Fi!=null){Fi=null;return}if(rs!=null){rs=null;return}if(Si!=null){Si=null;return}Ii?(Ii=null,Or&&Or(-1,-1,null)):js&&js(-1,-1)}function ow(){return Re}function vs(n){Ii=n}function lw(){return Ii}function cw(n){Or=n}function dw(n){js=n}function hw(n){Id=n}function uw(n){Ld=n}function fw(n){Ud=n}function Qi(n){Si=n}function Sr(){return Si}function pw(n){Nd=n}function Ss(n){rs=n}function mw(n){Fd=n}function Mm(n){Fi=n}function _w(){return Fi}function gw(n){Od=n}function xw(){return ir}function vw(){return Us}function Mw(n){Bd=n}function yw(){return!ls||!An||!Mi?null:{x1:Math.min(An.x,Mi.x),y1:Math.min(An.y,Mi.y),x2:Math.max(An.x,Mi.x),y2:Math.max(An.y,Mi.y)}}const an=[];let Oi=0;function ym(){an.length=0,Oi=0}function Sw(){an.length=0}function Ew(){return an}function Ci(n,t,e,i){switch(i){case"explosion":Eo(n,t,e,8,12,60,.4,.7,3);break;case"bigExplosion":Eo(n,t,e,15,20,90,.5,1,5);break;case"hit":Eo(n,t,e,3,5,40,.2,.4,2);break;case"muzzleFlash":bw(n,t,e,1,2,.08,.15,4);break;case"wallBreak":ww(n,t,e);break;case"wallHit":Tw(n,t,e);break;case"wallRepair":Aw(n,t,e);break;case"airStrike":Rw(n,t,e);break;default:Eo(n,t,e,4,6,50,.3,.5,2)}}function Eo(n,t,e,i,s,a,r,o,d){const c=i+Math.floor(Math.random()*(s-i+1));for(let h=0;h<c;h++){const l=Math.random()*Math.PI*2,u=a*(.3+Math.random()*.7),f=r+Math.random()*(o-r);an.push({id:Oi++,x:n,y:10+Math.random()*10,z:t,vx:Math.cos(l)*u,vy:20+Math.random()*40,vz:Math.sin(l)*u,color:e,life:f,maxLife:f,size:d*(.6+Math.random()*.4),type:"burst"})}}function bw(n,t,e,i,s,a,r,o){const d=i+Math.floor(Math.random()*(s-i+1));for(let c=0;c<d;c++){const h=a+Math.random()*(r-a);an.push({id:Oi++,x:n+(Math.random()-.5)*4,y:12+Math.random()*6,z:t+(Math.random()-.5)*4,vx:0,vy:5,vz:0,color:e,life:h,maxLife:h,size:o*(.8+Math.random()*.4),type:"flash"})}}function ww(n,t,e){const i=8+Math.floor(Math.random()*5);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=40+Math.random()*50,o=.5+Math.random()*.3;an.push({id:Oi++,x:n+(Math.random()-.5)*20,y:8+Math.random()*16,z:t+(Math.random()-.5)*20,vx:Math.cos(a)*r,vy:30+Math.random()*50,vz:Math.sin(a)*r,color:e,life:o,maxLife:o,size:3.5+Math.random()*2.5,type:"wallBreak",rotSpeed:(Math.random()-.5)*10})}}function Tw(n,t,e){const i=2+Math.floor(Math.random()*2);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=25+Math.random()*30,o=.15+Math.random()*.1;an.push({id:Oi++,x:n+(Math.random()-.5)*8,y:10+Math.random()*10,z:t+(Math.random()-.5)*8,vx:Math.cos(a)*r,vy:15+Math.random()*25,vz:Math.sin(a)*r,color:e,life:o,maxLife:o,size:2+Math.random()*1.5,type:"wallHit"})}an.push({id:Oi++,x:n,y:14,z:t,vx:0,vy:3,vz:0,color:16777215,life:.12,maxLife:.12,size:5,type:"flash"})}function Aw(n,t,e){const i=6+Math.floor(Math.random()*3);for(let s=0;s<i;s++){const a=.3+Math.random()*.2;an.push({id:Oi++,x:n+(Math.random()-.5)*24,y:Math.random()*8,z:t+(Math.random()-.5)*24,vx:(Math.random()-.5)*10,vy:40+Math.random()*30,vz:(Math.random()-.5)*10,color:e,life:a,maxLife:a,size:2.5+Math.random()*1.5,type:"wallRepair"})}}function Rw(n,t,e){const i=25+Math.floor(Math.random()*10);for(let a=0;a<i;a++){const r=Math.random()*Math.PI*2,o=60+Math.random()*100,d=.6+Math.random()*.5;an.push({id:Oi++,x:n+(Math.random()-.5)*30,y:5+Math.random()*20,z:t+(Math.random()-.5)*30,vx:Math.cos(r)*o,vy:50+Math.random()*80,vz:Math.sin(r)*o,color:16777215,life:d,maxLife:d,size:5+Math.random()*4,type:"burst"})}const s=30+Math.floor(Math.random()*15);for(let a=0;a<s;a++){const r=Math.random()*Math.PI*2,o=80+Math.random()*140,d=.8+Math.random()*.7;an.push({id:Oi++,x:n+(Math.random()-.5)*60,y:10+Math.random()*30,z:t+(Math.random()-.5)*60,vx:Math.cos(r)*o,vy:30+Math.random()*60,vz:Math.sin(r)*o,color:e,life:d,maxLife:d,size:4+Math.random()*3,type:"wallBreak",rotSpeed:(Math.random()-.5)*12})}for(let a=0;a<5;a++)an.push({id:Oi++,x:n+(Math.random()-.5)*10,y:5+a*15,z:t+(Math.random()-.5)*10,vx:0,vy:60+Math.random()*40,vz:0,color:16768324,life:.3+Math.random()*.2,maxLife:.5,size:8+Math.random()*4,type:"flash"})}function Cw(n){let t=0;for(;t<an.length;){const e=an[t];if(e.life-=n,e.life<=0){an[t]=an[an.length-1],an.pop();continue}e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.type==="burst"?e.vy-=60*n:e.type==="wallBreak"?e.vy-=120*n:e.type==="wallHit"&&(e.vy-=80*n),e.y<0&&(e.y=0,e.vy=0),t++}}let Mc=null;function Pw(){return Mc||(Mc=new(window.AudioContext||window.webkitAudioContext)),Mc}function jt(n,t,e,i,s,a=0){const r=n.createOscillator(),o=n.createGain();r.type=i,r.frequency.value=t;const d=n.currentTime+a;o.gain.setValueAtTime(s,d),o.gain.exponentialRampToValueAtTime(.001,d+e),r.connect(o),o.connect(n.destination),r.start(d),r.stop(d+e+.01)}function hi(n,t,e,i,s="lowpass"){const a=n.sampleRate,r=Math.floor(a*t),o=n.createBuffer(1,r,a),d=o.getChannelData(0);for(let l=0;l<r;l++)d[l]=Math.random()*2-1;const c=n.createBufferSource();c.buffer=o;const h=n.createGain();if(h.gain.setValueAtTime(e,n.currentTime),h.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),i){const l=n.createBiquadFilter();l.type=s,l.frequency.value=i,c.connect(l),l.connect(h)}else c.connect(h);h.connect(n.destination),c.start()}function Yt(n){const t=Pw();switch(n){case"build":jt(t,440,.1,"sine",.3),jt(t,660,.1,"sine",.2,.1);break;case"build_generator":jt(t,220,.15,"sine",.25),jt(t,330,.12,"sine",.2,.1),jt(t,440,.15,"triangle",.25,.2),jt(t,660,.2,"sine",.15,.3);break;case"denied":jt(t,200,.15,"sawtooth",.3);break;case"shoot":hi(t,.05,.4,2e3,"bandpass");break;case"explosion":hi(t,.3,.5,500,"lowpass");break;case"bigExplosion":hi(t,.5,.7,300,"lowpass");break;case"hit":hi(t,.04,.25,3e3,"bandpass");break;case"victory":jt(t,523,.15,"sine",.3,0),jt(t,659,.15,"sine",.3,.15),jt(t,784,.15,"sine",.3,.3),jt(t,1047,.25,"sine",.35,.45);break;case"defeat":jt(t,440,.15,"sawtooth",.25,0),jt(t,370,.15,"sawtooth",.25,.15),jt(t,311,.2,"sawtooth",.25,.3),jt(t,247,.35,"sawtooth",.3,.5);break;case"select":jt(t,880,.06,"sine",.15);break;case"cancel":jt(t,330,.08,"triangle",.15);break;case"shoot_pulse":jt(t,880,.06,"sine",.6);break;case"upgrade":jt(t,523,.1,"sine",.25,0),jt(t,659,.1,"sine",.25,.1),jt(t,784,.12,"sine",.3,.2);break;case"baseAlert":jt(t,880,.08,"sawtooth",.4),jt(t,440,.12,"sawtooth",.35,.08);break;case"shoot_heli":hi(t,.04,.3,4e3,"highpass"),jt(t,1200,.03,"square",.15);break;case"heli_select":jt(t,660,.06,"sine",.2),jt(t,990,.08,"sine",.25,.06);break;case"heli_rally":jt(t,1320,.1,"sine",.2),jt(t,880,.06,"triangle",.15,.08);break;case"wall_build":hi(t,.08,.35,1200,"bandpass"),jt(t,180,.1,"square",.2,.03),jt(t,260,.06,"triangle",.15,.1);break;case"wall_repair":jt(t,330,.1,"sine",.2),jt(t,440,.1,"sine",.2,.08),jt(t,550,.12,"triangle",.15,.16);break;case"wall_break":hi(t,.4,.5,400,"lowpass"),jt(t,120,.15,"sawtooth",.3),jt(t,80,.25,"square",.2,.1);break;case"airstrike_incoming":jt(t,80,.8,"sawtooth",.15),jt(t,120,.6,"sawtooth",.2,.3),jt(t,180,.5,"sawtooth",.25,.6),hi(t,1.2,.2,600,"lowpass");break;case"airstrike_explosion":hi(t,1,.8,200,"lowpass"),jt(t,40,.8,"sine",.5),jt(t,60,.6,"sawtooth",.3,.05),hi(t,.5,.5,400,"lowpass"),jt(t,30,1,"sine",.3,.1);break;case"airstrike_confirm":jt(t,880,.08,"square",.3),jt(t,660,.08,"square",.25,.1),jt(t,440,.12,"square",.3,.2),hi(t,.15,.15,2e3,"bandpass");break}}let Br=cl,Ff=0,Xn=0,zd=!1,Sm=null,je=[],Er=[],Ha=[];const Dw=document.getElementById("menu-overlay"),Iw=document.getElementById("pause-overlay"),Lw=document.getElementById("victory-overlay"),Uw=document.getElementById("defeat-overlay");function Ns(n){Br=n,Dw.classList.toggle("hidden",n!==cl),Iw.classList.toggle("hidden",n!==yc),Lw.classList.toggle("hidden",n!==Gf),Uw.classList.toggle("hidden",n!==kf)}function Ch(){Em(),Nw(),Ns(Ga)}function Em(){const n=He();if(n){for(const t of qn())Wr(t,n);for(const t of Le())Mh(t,n);for(const t of Pd())am(t,n)}Xn=0,zd=!1,ab(),db(),mb(),Sw(),Eb(),Gb(),T_(),Yp(),je=[];for(const t of Ha)t.mesh&&n&&sm(t.mesh,n);Er=[],Ha=[],Mm(null),hn(),wn(),Qi(null),ys(null),Ss(null),ym(),R1()}function Nw(){const n=nl(Nn,ws,es,st);Lr(n,He());const t=nl(Nn,si,Tn,Kt);Lr(t,He()),W1(He()),Mb(window._selectedDifficulty||"normal"),bb(window._selectedDifficulty||"normal"),Sm=P1(),Ji(),vs(null)}function Of(n,t,e){if(!e)return!1;const i=Qt[e];if(!i)return!1;if(Mr(st)<i.cost||!tl(n,t,i.size,st))return Yt("denied"),!1;if(!tr(st,i.cost))return!1;const a=nl(e,n,t,st);return Lr(a,He()),(e===Je||e===Xe||e===on)&&Qf(a.id,st,e),Yt(e===Wt?"wall_build":e===Be?"build_generator":"build"),!0}function Bf(n,t){if(n<0||t<0){hn();return}const e=qn();for(const i of e){if(!i.alive||i.team!==st)continue;const s=Qt[i.type];if(s&&n>=i.col&&n<i.col+s.size&&t>=i.row&&t<i.row+s.size){s.levels?(gm(i),Yt("select")):hn();return}}hn()}function Fw(n){if(!n||!Xr(n))return;const t=Eh(n);if(!tr(st,t)){Yt("denied");return}bh(n),Yt("build")}function Ow(n,t){if(!n||!qr(n))return;const e=vr(n,t);if(!tr(st,e)){Yt("denied");return}wh(n,t),Yt("build")}function zf(n,t,e){if(n==="all")E_(st,t,e,Le);else if(n==="selection")lu(je,t,e);else{const i=pl(Number(n),Le);lu(i,t,e)}ys(null),Ss(null),Yt("heli_rally")}function Ks(){for(let t=0;t<je.length;t++)je[t].selected=!1;const n=Le();for(let t=0;t<n.length;t++)n[t].squadHighlight=!1;je=[]}function Bw(n){if(Ks(),!(!n||!n.alive||n.team!==st)&&(n.selected=!0,je=[n],n.squadId!=null)){const t=pl(n.squadId,Le);for(let i=0;i<t.length;i++)t[i].id!==n.id&&(t[i].squadHighlight=!0);const e=fl(n.squadId);if(e){const s=qn().find(a=>a.id===e.buildingId&&a.alive);s&&gm(s)}}}function zw(n,t,e,i){Ks();const s=Math.min(n,e),a=Math.max(n,e),r=Math.min(t,i),o=Math.max(t,i),d=Le(),c=[];for(let h=0;h<d.length;h++){const l=d[h];!l.alive||l.team!==st||l.isAir||l.x>=s&&l.x<=a&&l.z>=r&&l.z<=o&&(l.selected=!0,c.push(l))}je=c}function Hw(n){Ks();const t=pl(n,Le);for(let e=0;e<t.length;e++)t[e].selected=!0;je=t}function Gw(n,t){const e=Le();let i=null,s=Q0;for(let a=0;a<e.length;a++){const r=e[a];if(!r.alive||r.team!==st||r.isAir)continue;const o=se(n,t,r.x,r.z);o<s&&(s=o,i=r)}return i}function kw(n,t){const e=qn();for(const i of e)if(i.alive&&i.type===Wt&&i.col===n&&i.row===t)return i;return null}function Vw(n,t){const e=Ue(n-1,t)===Fn,i=Ue(n+1,t)===Fn,s=Ue(n,t-1)===Fn,a=Ue(n,t+1)===Fn,r=e||i,o=s||a;return r&&!o?na:o&&!r?Go:i&&a&&!e&&!s?Vd:e&&a&&!i&&!s?Wd:i&&s&&!e&&!a?Gd:e&&s&&!i&&!a?kd:r&&o?na:null}function bm(n){const t=new Set;for(const e of n){const i=`${e.col},${e.row}`;t.add(i);for(const[s,a]of[[-1,0],[1,0],[0,-1],[0,1]]){const r=e.col+s,o=e.row+a;Ue(r,o)===Fn&&t.add(`${r},${o}`)}}for(const e of t){const[i,s]=e.split(",").map(Number),a=kw(i,s);if(!a)continue;const r=Vw(i,s);r&&r!==a.orientation&&(fm(a,r),mh(a,He()))}}function wm(n,t,e){Er.push({team:n,targetX:t,targetZ:e,delayTimer:h_}),Yt("airstrike_confirm")}function Ww(n,t,e){const i=He(),s=n===st?Un+La:-La,a=n===st?-La:Un+La,r=t+(Math.random()-.5)*200,o=t-r,d=e-s,c=Math.sqrt(o*o+d*d),h=o/c,l=d/c,u=LE(n,i);u.position.set(r,Xd,s),u.rotation.y=Math.atan2(h,l),Ha.push({team:n,targetX:t,targetZ:e,bomberX:r,bomberZ:s,exitZ:a,dirX:h,dirZ:l,mesh:u,impacted:!1}),Yt("airstrike_incoming")}function Xw(n,t,e){const i=Le(),s=qn();for(let a=i.length-1;a>=0;a--){const r=i[a];if(!r.alive)continue;const o=se(r.x,r.z,t,e);if(o>mr)continue;let d;if(o<=ca)d=da;else{const c=(o-ca)/(mr-ca);d=da+(ru-da)*c}r.hp-=d,r.hp<=0&&(r.isAir&&Sr()===r.id&&(Qi(null),wn()),tp(r),mm(r),Mh(r,He()),Ci(r.x,r.z,r.team===st?zt.CYAN:zt.RED,"explosion"))}for(let a=s.length-1;a>=0;a--){const r=s[a];if(!r.alive)continue;const o=se(r.x,r.z,t,e);if(o>mr)continue;let d;if(o<=ca)d=da;else{const c=(o-ca)/(mr-ca);d=da+(ru-da)*c}if(r.hp-=d,r.hp<=0){const c=Yd(r.id);c&&wc(c.id,Le),Th(r),Wr(r,He()),r.type===Wt?Ci(r.x,r.z,r.team===st?zt.CYAN:zt.RED,"wallBreak"):Ci(r.x,r.z,r.team===st?zt.CYAN:zt.RED,"bigExplosion"),al()===r&&hn()}}}function qw(n){for(let t=Er.length-1;t>=0;t--){const e=Er[t];e.delayTimer-=n,e.delayTimer<=0&&(Ww(e.team,e.targetX,e.targetZ),Er.splice(t,1))}for(let t=Ha.length-1;t>=0;t--){const e=Ha[t],i=au*n;if(e.bomberX+=e.dirX*i,e.bomberZ+=e.dirZ*i,e.mesh&&(e.mesh.position.x=e.bomberX,e.mesh.position.z=e.bomberZ,e.mesh.position.y=Xd+Math.sin(Date.now()*.002)*3),!e.impacted&&se(e.bomberX,e.bomberZ,e.targetX,e.targetZ)<au*n*2){e.impacted=!0;const o=e.team===st?zt.CYAN:zt.RED;Xw(e.team,e.targetX,e.targetZ),Ci(e.targetX,e.targetZ,o,"airStrike"),ZE(e.targetX,e.targetZ,o,mr/10),Yt("airstrike_explosion")}const s=e.team===st&&e.bomberZ<-La,a=e.team===Kt&&e.bomberZ>Un+La;(s||a)&&(e.mesh&&sm(e.mesh,He()),Ha.splice(t,1))}}function Tm(n){requestAnimationFrame(Tm);const t=n/1e3,e=Math.min(t-Ff,.05);Ff=t;const i=Zo();if(i&&i.update(),Br===Ga){Xn+=e,v1(e),yb(e,{getBuildings:qn}),wb(e,Xn,{getEnergy:()=>Mr(Kt),spendEnergy:x=>tr(Kt,x),getBuildings:qn,getUnits:Le,createBuilding:(x,S,I)=>{const P=nl(x,S,I,Kt);return Lr(P,He()),(x===Je||x===Xe||x===on)&&Qf(P.id,Kt,x),x===Wt&&bm([{col:S,row:I}]),P},isBuildable:(x,S,I)=>tl(x,S,I,Kt),findPath:Io,canUpgradeTurret:KE,startTurretUpgrade:QE,canBranchTurret:JE,startTurretBranch:tb,canUpgradeBuilding:Xr,canBranchBuilding:qr,startUpgrade:bh,startBranch:wh,getUpgradeCost:Eh,getBranchCost:vr,getIncomeBreakdown:()=>Rf(Kt),setHelicopterRally:Ad,canRepairWall:dm,startWallRepair:um,getRepairCost:hm,canAirStrike:x=>il(x,Xn),initiateAirStrike:(x,S,I)=>wm(x,S,I),markAirStrikeUsed:x=>pm(x,Xn),getMatchTime:()=>Xn,getSquads:x=>cu(x),getUnitsBySquad:x=>pl(x,Le),setUnitStance:Hr,setUnitTargetPriority:$d,setUnitsStance:ep,setUnitsTargetPriority:np}),Ib(Xn,{getUnits:Le});const h=sb(e,Xn,{createUnit:(x,S,I,P,N,L)=>{const k=rb(x,S,I,P,N);return EE(k,He()),L!=null&&x_(k,L),P===Kt&&Nb(k),k},findPath:Io});for(const x of h)mh(x,He()),x.type===Wt&&x._justRepaired?(Ci(x.x,x.z,x.team===st?zt.CYAN:zt.RED,"wallRepair"),Yt("wall_repair"),x._justRepaired=!1):Yt("upgrade");_b(e,{getUnits:Le,getBuildings:qn,getProjectiles:Pd,getFirePoint:x=>q1(x),createProjectile:(x,S,I,P,N,L,k)=>{const B=hb(x,S,I,P,N,L,k);return B&&Ef(B,He()),B},createHomingProjectile:(x,S,I,P,N,L,k,B,V,H,et)=>{const tt=ub(x,S,I,P,N,L,k,B,V,H,et);return tt&&Ef(tt,He()),Yt("shoot_pulse"),tt},removeUnit:x=>{x.isAir&&Sr()===x.id&&(Qi(null),wn()),tp(x),mm(x),Mh(x,He()),Ci(x.x,x.z,x.team===st?zt.CYAN:zt.RED,"explosion"),Yt("explosion")},removeBuilding:x=>{const S=Yd(x.id);S&&wc(S.id,Le),Th(x),Wr(x,He()),x.type===Wt?(Ci(x.x,x.z,x.team===st?zt.CYAN:zt.RED,"wallBreak"),Yt("wall_break")):(Ci(x.x,x.z,x.team===st?zt.CYAN:zt.RED,"bigExplosion"),Yt("bigExplosion")),al()===x&&hn()},spawnParticle:Ci}),ob(e,{findPath:Io,findPathThroughWalls:S1,getBuildings:qn,getUnits:Le,combatUnitHash:gb(),combatBuildingHash:xb()});const l=fb(e);for(const x of l)am(x,He());Cw(e),qw(e);const u=qn(),f=u.find(x=>x.type===Nn&&x.team===st),_=u.find(x=>x.type===Nn&&x.team===Kt);!_||_.hp<=0?(Ns(Gf),Yt("victory")):(!f||f.hp<=0)&&(Ns(kf),Yt("defeat"));let g=!1;if(f&&f.alive){const x=Le();for(let S=0;S<x.length;S++){const I=x[S];if(I.alive&&I.team===Kt&&se(I.x,I.z,f.x,f.z)<Sc){g=!0;break}}}g&&!zd&&Yt("baseAlert"),zd=g,Xn%1<e&&w_(Le),je=je.filter(x=>x.alive);for(let x=0;x<je.length;x++)je[x].alive||(je[x].selected=!1);const m=cu(st),p=qn(),v=[];for(let x=0;x<m.length;x++){const S=m[x],I=p.find(P=>P.id===S.buildingId);if(!I||!I.alive){wc(S.id,Le);continue}v.push({id:S.id,buildingId:S.buildingId,label:S.label,buildingType:S.buildingType,spawnStance:S.spawnStance,spawnTargetPriority:S.spawnTargetPriority,unitCount:b_(S,Le),buildingAlive:!0,rallyX:S.rallyX,rallyZ:S.rallyZ})}const M=zb(),y=uh(),T=Zo();let b=null;if(y&&T){const x=y.position.distanceTo(T.target),S=y.fov*Math.PI/180,I=2*Math.tan(S/2)*x;b={x:T.target.x,z:T.target.z,viewWidth:I*y.aspect,viewHeight:I}}const A=Sr();A&&Rd().find(S=>S.id===A),Vb({energy:Mr(st),enemyEnergy:Mr(Kt),incomeBreakdown:Rf(st),buildings:u,units:Le(),matchTime:Xn,dt:e,baseUnderAttack:g,rallyActive:M.rallyActive,rallyHoldingCount:M.holdingCount,rallyPushSize:M.pushSize,rallyTimeRemaining:M.timeRemaining,obstacles:Sm,cameraInfo:b,squads:v,selectedUnitCount:je.length,selectionBoxScreen:yw(),airStrikePending:_w()!=null})}const s=qn(),a=Le(),r=Pd();oE(t,s),bE(t,a,Sr()),kE(t,r),YE(t,Ew()),jE(t);const o=ow();let d=null;if(o&&Br===Ga){const h=lw();if(h){const l=Qt[h];d={col:o.col,row:o.row,size:l?l.size:1}}}X1(t,d,vw()?xw():null);const c=_1();c&&c.render()}document.getElementById("btn-start").addEventListener("click",Ch);document.getElementById("btn-resume").addEventListener("click",()=>Ns(Ga));document.getElementById("btn-quit").addEventListener("click",()=>{Em(),Ns(cl)});document.getElementById("btn-restart-win").addEventListener("click",Ch);document.getElementById("btn-restart-lose").addEventListener("click",Ch);document.addEventListener("keydown",n=>{n.key==="Escape"&&(Br===Ga?Ns(yc):Br===yc&&Ns(Ga))});function Yw(){const n=document.getElementById("render-target");p1(n),tw(g1(),uh(),Zo()),b1((e,i,s,a)=>{const r=e*J+J*s/2,o=i*J+J*s/2,d=jh*jh;for(const c of Le()){if(c.team!==a||c.isAir)continue;const h=c.x-r,l=c.z-o;if(h*h+l*l<=d)return!0}return!1}),cw((e,i,s)=>{if(e<0||!s){Ji(),vs(null);return}Of(e,i,s)?(Ji(),vs(null)):(Bf(e,i),al()&&(Ji(),vs(null)))}),dw((e,i,s,a)=>{if(e===-2&&i===-2){const r=Sr();if(r){const d=Rd().find(c=>c.id===r);d&&(Ks(),hn(),Wb(d),Yt("heli_select"))}return}if(wn(),Qi(null),Bf(e,i),al()){Ks();return}if(s!=null&&a!=null){const r=Gw(s,a);if(r){Bw(r),Yt("select");return}}Ks(),hn()}),Mw((e,i,s,a)=>{wn(),Qi(null),hn(),zw(e,i,s,a),je.length>0&&Yt("select")}),uw((e,i,s)=>{Ad(e,i,s),wn(),Yt("heli_rally")}),fw(()=>Rd()),pw((e,i,s)=>{zf(e,i,s)}),mw((e,i,s)=>{const r=qn().find(o=>o.id===e&&o.alive);if(!r||!il(r,Xn)){Yt("denied");return}if(!tr(st,Va)){Yt("denied");return}pm(r,Xn),wm(st,i,s)}),gw(e=>{const i=[];for(const s of e)Of(s.col,s.row,Wt)&&i.push(s);i.length>0&&bm(i)}),kb(document.getElementById("sidebar"),{onBuildSelect:e=>{hn(),vs(e),ys(null),Ss(null),Yt(e?"select":"cancel")},onBuildingUpgrade:e=>{Fw(e)},onBuildingBranch:(e,i)=>{Ow(e,i)},onPushNow:()=>{Hb(),Yt("select")},onMinimapClick:(e,i)=>{Hf(e,i)},onHelicopterRally:(e,i,s)=>{Ad(e,i,s),Yt("heli_rally")},onHeliDeselect:()=>{Qi(null),wn()},onSpawnStanceChange:(e,i)=>{v_(Number(e),i),Yt("select")},onSpawnTargetChange:(e,i)=>{M_(Number(e),i),Yt("select")},onSelectionStance:e=>{je.length>0&&ep(je,e),ys(null),Ss(null),Yt("select")},onSelectionTarget:e=>{je.length>0&&np(je,e),Yt("select")},onSelectionDeselect:()=>{Ks()},onSelectionRallyClick:()=>{ys("selection"),Ss("selection"),Ji(),vs(null),Qi(null),wn(),Yt("select")},onSquadCardClick:e=>{Hw(Number(e)),Yt("select")},onGlobalStance:e=>{y_(st,e,Le),ys(null),Ss(null),Yt("select")},onGlobalTarget:e=>{S_(st,e,Le),Yt("select")},onGlobalRallyClick:()=>{ys("all"),Ss("all"),Ji(),vs(null),Qi(null),wn(),Yt("select")},onRallySet:(e,i,s)=>{zf(e,i,s)},onAirStrike:e=>{if(!(!e||!il(e,Xn))){if(Mr(st)<Va){Yt("denied");return}Mm(e.id),qb(),Ji(),vs(null),Qi(null),wn(),ys(null),Ss(null),Yt("airstrike_confirm")}},onWallRepair:e=>{if(!e||!dm(e))return;const i=hm();if(!tr(st,i)){Yt("denied");return}um(e),Yt("wall_repair")},onWallDemolish:e=>{if(!e||e.type!==Wt||!e.alive)return;const i=eb(e);i>0&&Sb(st,i),Wr(e,He()),Ci(e.x,e.z,zt.CYAN,"wallBreak"),Yt("wall_break"),hn()},onWallOrient:(e,i)=>{!e||e.type!==Wt||!e.alive||(fm(e,i),mh(e,He()),Yt("select"))}}),qE(He()),$E(He()),ym();const t=yn(ws,es,J);hw(()=>{Hf(t.x,t.z)}),Ns(cl),requestAnimationFrame(Tm)}function Hf(n,t){const e=uh(),i=Zo();if(!e||!i)return;const s=n-i.target.x,a=t-i.target.z;i.target.x=n,i.target.z=t,e.position.x+=s,e.position.z+=a}Yw();
