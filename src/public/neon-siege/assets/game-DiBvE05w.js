(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const ii=1600,Hn=1600,Z=40,qt=ii/Z,Qe=Hn/Z,nt=0,kt=1,Ml="menu",ka="playing",Dc="paused",np="victory",ip="defeat",Yo=1,yl=13,Va=14,Ni=26,sp=27,Km=38,As=19,rs=36,oi=19,Ln=2,bn="core",Ce="barracks",xe="turret",ve="factory",we="generator",tn="helipad",ne="wall",ie={[bn]:{hp:5e3,cost:0,size:3,buildTime:0,label:"Core",description:"Main base. Destroy the enemy core to win."},[Ce]:{hp:400,cost:75,size:2,buildTime:5,produceUnit:"rifle",produceTime:16,label:"Barracks",description:"Produces Rifle infantry. Upgradeable.",levels:[{produceTime:16,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:13,hpMult:1.2,damageMult:1.15,speedMult:1,upgradeCost:100},{produceTime:10,hpMult:1.4,damageMult:1.3,speedMult:1,upgradeCost:200}],branches:{A:{name:"Assault Doctrine",desc:"Trains Assault units",cost:400,produceUnit:"assault",produceTime:12,hpMult:1.5,damageMult:1.4,speedMult:1},B:{name:"Rapid Deployment",desc:"Fast production + speed",cost:450,produceUnit:"rifle",produceTime:7,hpMult:1.3,damageMult:1.2,speedMult:1.25}}},[xe]:{hp:200,cost:120,size:1,buildTime:6,color:[0,255,255],label:"Pulse Turret",description:"Rapid-fire energy bolts. Upgradeable.",levels:[{damage:12,fireRate:.35,range:120,upgradeCost:0},{damage:20,fireRate:.28,range:135,upgradeCost:100},{damage:32,fireRate:.2,range:155,upgradeCost:200}],branches:{A:{name:"Overclock",desc:"Insane fire rate",cost:550,damage:28,fireRate:.09,range:160},B:{name:"Heavy Bolts",desc:"Splash on hit",cost:600,damage:55,fireRate:.25,range:165,splashRadius:50,splashDamage:25}}},[ve]:{hp:600,cost:225,size:2,buildTime:8,produceUnit:"tank",produceTime:32,label:"Factory",description:"Produces Tank units. Upgradeable.",levels:[{produceTime:32,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:26,hpMult:1.15,damageMult:1.1,speedMult:1,upgradeCost:175},{produceTime:22,hpMult:1.3,damageMult:1.25,speedMult:1,upgradeCost:350}],branches:{A:{name:"Heavy Armor",desc:"Massive HP, slower build",cost:600,produceUnit:"tank",produceTime:28,hpMult:1.8,damageMult:1.2,speedMult:.85},B:{name:"Siege Cannons",desc:"High damage + range",cost:550,produceUnit:"tank",produceTime:22,hpMult:1.2,damageMult:1.6,speedMult:1,rangeMult:1.3}}}};ie[we]={hp:150,cost:60,size:1,buildTime:5,label:"Generator",description:"Increases energy income. Upgradeable.",incomeBonus:3,levels:[{incomeBonus:3,territoryMult:1,upgradeCost:0},{incomeBonus:5,territoryMult:1,upgradeCost:100},{incomeBonus:7,territoryMult:1,upgradeCost:200}],branches:{A:{name:"Overcharge",desc:"Maximum energy output",cost:500,incomeBonus:10,territoryMult:1},B:{name:"Capacitor Network",desc:"Income + 2x territory bonus",cost:425,incomeBonus:6,territoryMult:2}}};ie[tn]={hp:500,cost:300,size:2,buildTime:10,produceUnit:"helicopter",produceTime:40,label:"Helipad",description:"Produces Helicopters. Upgradeable.",levels:[{produceTime:40,hpMult:1,damageMult:1,speedMult:1,upgradeCost:0},{produceTime:34,hpMult:1.15,damageMult:1.15,speedMult:1,upgradeCost:200},{produceTime:28,hpMult:1.3,damageMult:1.3,speedMult:1,upgradeCost:400}],branches:{A:{name:"Gunship Bay",desc:"Heavy firepower helicopters",cost:600,produceUnit:"helicopter",produceTime:30,hpMult:1.2,damageMult:1.6,speedMult:1},B:{name:"Rapid Scramble",desc:"Fast production + speed",cost:550,produceUnit:"helicopter",produceTime:20,hpMult:1.1,damageMult:1.1,speedMult:1.15}}};ie[ne]={hp:120,cost:25,size:1,buildTime:3,label:"Wall",description:"Destructible barrier. Block and funnel enemies.",repairCost:10,repairTime:2,levels:[{hp:120,upgradeCost:0},{hp:250,upgradeCost:30},{hp:400,upgradeCost:60}]};const ap=[Ce,xe,ve,we,tn,ne],Rs="rifle",Ia="assault",js="tank",gn="helicopter",Wa="medic",Xa="engineer",$o={[Rs]:{hp:50,speed:35,damage:8,range:120,fireRate:1,size:6,label:"Rifle"},[Ia]:{hp:160,speed:28,damage:14,range:100,fireRate:.8,size:8,label:"Assault"},[js]:{hp:400,speed:16,damage:35,range:160,fireRate:.5,size:14,label:"Tank"},[gn]:{hp:700,speed:60,damage:4,range:240,fireRate:8,size:10,label:"Helicopter",isAir:!0},[Wa]:{hp:60,speed:42,damage:0,range:80,fireRate:0,size:6,label:"Medic",isSupport:!0,healRate:8,healRange:80,healTargets:["rifle","assault"]},[Xa]:{hp:200,speed:22,damage:0,range:100,fireRate:0,size:10,label:"Engineer",isSupport:!0,healRate:15,healRange:100,healTargets:["tank"]}},Sl=60,Jm=120,Qm=.6,t0=80,Ju=400,e0=2,Qu=500,n0=1.5,jn=10,Dn={barracks:4,turrets:4,factories:3,generators:6,helipads:2,walls:12},In={build:{barracks:4,turret:25,factory:45,generator:3,helipad:80,wall:35},shared:{turret:80,generator:70,wall:50},upgrade:{turret:40,barracks:30,factory:65,generator:35,helipad:100,wall:55}},zl=600,th=1e3,i0=.5,eh=.15,mi={rallyRow:9,minSize:3,minWaveStrength:500,turretPower:250,wallPower:80,cooldownAfterFailure:10,failureStrengthMult:.3,sizeGrow:2,sizeShrink:1,maxSize:10},rp=29,op=4,lp=20,s0=150,nh=1.8,a0=1.2,r0=3,o0=.3,l0=.5,Ic=350,c0=500,zt={BG:263184,CYAN:65535,GOLD:16766720,RED:16724530,PLAYER:65535,ENEMY:16724530,FACTORY:16766720,HELIPAD:3342180,UNIT_PLAYER:65535,UNIT_ENEMY:16724530,PROJECTILE_PLAYER:65535,PROJECTILE_ENEMY:16724530,BUILD_VALID:65535,BUILD_INVALID:16724530},d0=55,u0=1,h0=5e3,f0=900,p0=500,m0=.25,_0=Math.PI/2.1,g0=200,x0=2400,v0=.06,M0=1710638,y0=.6,S0=12634367,E0=.9,w0=4210848,b0=.3,T0=1710654,A0=526352,R0=.4,C0=.22,P0=.12,D0=.7,Oa=.15,Hl=3,ih=37,Gl=2,sh=37,no=3,ah=[{kind:"tesla_coil",cellsW:2,cellsD:2,heightMin:30,heightMax:55,weight:.12,hpCategory:"large"},{kind:"power_cell",cellsW:2,cellsD:2,heightMin:16,heightMax:32,weight:.12,hpCategory:"small"},{kind:"circuit_monolith",cellsW:2,cellsD:2,heightMin:14,heightMax:30,weight:.15,hpCategory:"small"},{kind:"capacitor_bank",cellsW:4,cellsD:2,heightMin:14,heightMax:28,weight:.1,hpCategory:"medium"},{kind:"relay_tower",cellsW:2,cellsD:2,heightMin:50,heightMax:85,weight:.1,hpCategory:"large"},{kind:"data_obelisk",cellsW:2,cellsD:2,heightMin:22,heightMax:42,weight:.1,hpCategory:"large"},{kind:"plasma_conduit",cellsW:4,cellsD:2,heightMin:10,heightMax:20,weight:.08,hpCategory:"medium"},{kind:"power_pylon",cellsW:2,cellsD:2,heightMin:60,heightMax:100,weight:.08,hpCategory:"large"},{kind:"transformer_stack",cellsW:2,cellsD:2,heightMin:20,heightMax:38,weight:.08,hpCategory:"medium"},{kind:"cable_rack",cellsW:6,cellsD:2,heightMin:15,heightMax:25,weight:.07,hpCategory:"medium"}],rh=["#00ccff","#00ffaa","#ff00cc","#aa44ff","#00aaff"],oh=["#0a1628","#0c1a30","#0e1e38","#101828"],lh=18,I0=30,L0=20,U0={1:8,2:14},N0=20,F0=.15,O0=.5,B0=350,z0={1:8,2:12},H0=18,G0=.12,k0=.4,V0={1:10,2:16},W0=22,X0=.12,q0=.45,Y0={1:8,2:12},$0=16,Z0=.15,j0=.4,K0={1:10,2:16},J0=22,Q0=.12,t_=.45,e_={1:4,2:6},n_=0,i_=0,je=0,Mi=1,Kd=2,kn=3,Gn=4,s_=2,a_=20,r_=80,cp=160,ch=200,o_=1,dh={rusher:{pushRatio:.7,upgradePriority:"damage"},turtle:{pushRatio:1.2,upgradePriority:"defense"},balanced:{pushRatio:.9,upgradePriority:"adaptive"}},uh={rusher:["generator","barracks","barracks","generator","turret","barracks","factory","generator","turret","barracks","helipad","generator","turret","factory","wall","wall","turret","generator","helipad","generator"],turtle:["generator","barracks","turret","generator","turret","barracks","generator","factory","turret","wall","wall","wall","turret","generator","factory","wall","wall","barracks","helipad","generator"],balanced:["generator","barracks","generator","turret","barracks","factory","generator","turret","wall","wall","wall","barracks","generator","turret","factory","wall","helipad","turret","generator","barracks","helipad","generator"]},hh={easy:{buildInterval:12,upgradeDelay:90,upgradeInterval:25,incomeMult:.8,startEnergy:500},normal:{buildInterval:8,upgradeDelay:50,upgradeInterval:15,incomeMult:1.2,startEnergy:600},hard:{buildInterval:5,upgradeDelay:30,upgradeInterval:10,incomeMult:1.8,startEnergy:750}},qa={easy:{aiIncomeMult:.8,playerStartEnergy:600,aiStartEnergy:500,label:"EASY"},normal:{aiIncomeMult:1.2,playerStartEnergy:500,aiStartEnergy:600,label:"NORMAL"},hard:{aiIncomeMult:1.8,playerStartEnergy:400,aiStartEnergy:750,label:"HARD"}},l_=6,fh=1.5,c_=5,d_=150,u_=6,h_=250,f_=40,dp=4,up=12,p_=3,m_=.4,__=3,g_=90,x_=2,Lc={rifle:1,assault:2.5,tank:5,helicopter:0,medic:0,engineer:0},dn="advance",ia="defend",Rr="hold",sa="rally",aa="any",Cr="units",Ya="buildings",Pa=ia,Da=aa,v_=30,M_=8,y_=16777215,S_=65535,ph=6,E_=60,mh=750,_h=400,w_=60,gh={any:{rifle:0,assault:0,tank:0,helicopter:0,medic:20,engineer:20,turret:0,barracks:0,factory:0,generator:0,helipad:0,wall:0,core:0},units:{rifle:50,assault:50,tank:50,helicopter:50,medic:70,engineer:70,turret:-30,barracks:-30,factory:-30,generator:-30,helipad:-30,wall:-30,core:-30},buildings:{rifle:-30,assault:-30,tank:-30,helicopter:-30,medic:-10,engineer:-10,turret:50,barracks:50,factory:50,generator:50,helipad:50,wall:50,core:50},rally:{rifle:60,assault:60,tank:80,helicopter:40,medic:80,engineer:80,turret:100,barracks:20,factory:20,generator:20,helipad:20,wall:20,core:20}},b_=100,T_=150,A_=.5,R_=25,ra="horizontal",Zo="vertical",Jd="corner_ne",Qd="corner_nw",tu="corner_se",eu="corner_sw",C_=.15,P_=4,D_=5,hp=.5,$a=2e4,I_=120,L_=3,xh=250,nu=120,vr=140,ha=40,fa=2e3,vh=80,La=400,U_=180,N_=25e3,F_=1.5,fp=3,O_=3,B_=2,z_=3,H_=3,Mh=7,G_=3,k_=2,V_=90,W_=["turret","generator"],X_=120,Pr=150,q_=45,Dr=250,Y_=60,$_=90,Z_=3,j_=120,K_=2,pp=3342180,mp=16766720;function Qt(n,t,e,i){const s=e-n,a=i-t;return Math.sqrt(s*s+a*a)}function fn(n,t,e){return{x:n*e+e/2,z:t*e+e/2}}function on(n,t,e){return{col:Math.floor(n/e),row:Math.floor(t/e)}}let J_=1;function qr(){return J_++}function Q_(n,t){return n+Math.random()*(t-n)}function yh(n,t){return Math.floor(Q_(n,t+1))}class iu{constructor(t){this.cellSize=t,this.cells=new Map,this._queryBuf=[]}_key(t,e){return t*73856093^e*19349663}clear(){this.cells.clear()}insert(t){const e=Math.floor(t.x/this.cellSize),i=Math.floor(t.z/this.cellSize),s=this._key(e,i);let a=this.cells.get(s);a||(a=[],this.cells.set(s,a)),a.push(t)}queryNear(t,e){const i=Math.floor(t/this.cellSize),s=Math.floor(e/this.cellSize);this._queryBuf.length=0;for(let a=-1;a<=1;a++)for(let r=-1;r<=1;r++){const o=this.cells.get(this._key(i+a,s+r));if(o)for(let c=0;c<o.length;c++)this._queryBuf.push(o[c])}return this._queryBuf}forEachNear(t,e,i){const s=Math.floor(t/this.cellSize),a=Math.floor(e/this.cellSize);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const c=this.cells.get(this._key(s+r,a+o));if(c)for(let d=0;d<c.length;d++)i(c[d])}}}let Qn=[],Uc={[nt]:{barracks:0,factory:0,helipad:0},[kt]:{barracks:0,factory:0,helipad:0}};function tg(n){return n===ve?"factory":n===tn?"helipad":"barracks"}function eg(n){return n==="factory"?"Factory":n==="helipad"?"Helipad":"Barracks"}function _p(n,t,e){const i=tg(e);Uc[t][i]++;const s=`${eg(i)} ${Uc[t][i]}`,a={id:qr(),buildingId:n,team:t,buildingType:e,label:s,spawnStance:Pa,spawnTargetPriority:Da,unitIds:new Set,rallyX:null,rallyZ:null};return Qn.push(a),a}function Nc(n,t){const e=Qn.findIndex(i=>i.id===n);if(e!==-1){if(t){const i=t();for(let s=0;s<i.length;s++){const a=i[s];a.squadId===n&&(a.squadId=null)}}Qn.splice(e,1)}}function su(n){for(let t=0;t<Qn.length;t++)if(Qn[t].buildingId===n)return Qn[t];return null}function ng(n,t){if(!n||n.type===gn)return;const e=su(t);e&&(n.squadId=e.id,n.stance=e.spawnStance,n.targetPriority=e.spawnTargetPriority,e.unitIds.add(n.id))}function gp(n){if(!n||n.squadId==null)return;const t=El(n.squadId);t&&t.unitIds.delete(n.id)}function ig(n,t){const e=El(n);e&&(e.spawnStance=t)}function sg(n,t){const e=El(n);e&&(e.spawnTargetPriority=t)}function Yr(n,t){if(!n||!n.alive)return;const e=n.stance!==t;n.stance=t,e&&(n.path=null,n.pathIndex=0,n._defendTargetId=null,n._wallTarget=null,t!==dn&&(n.rallyHold=!1,n._rallyAssigned=!1))}function au(n,t){!n||!n.alive||(n.targetPriority=t)}function xp(n,t){for(let e=0;e<n.length;e++)Yr(n[e],t)}function vp(n,t){for(let e=0;e<n.length;e++)au(n[e],t)}function Sh(n,t,e){for(let i=0;i<n.length;i++){const s=n[i];!s||!s.alive||(s.squadRallyX=t,s.squadRallyZ=e,Yr(s,sa))}}function ag(n,t,e){if(!e)return;const i=e();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===n&&a.type!==gn&&Yr(a,t)}}function rg(n,t,e){if(!e)return;const i=e();for(let s=0;s<i.length;s++){const a=i[s];a.alive&&a.team===n&&a.type!==gn&&au(a,t)}}function og(n,t,e,i){if(!i)return;const s=i();for(let a=0;a<s.length;a++){const r=s[a];r.alive&&r.team===n&&r.type!==gn&&(r.squadRallyX=t,r.squadRallyZ=e,Yr(r,sa))}}function El(n){for(let t=0;t<Qn.length;t++)if(Qn[t].id===n)return Qn[t];return null}function Eh(n){return Qn.filter(t=>t.team===n)}function lg(n,t){if(!n||!t)return 0;let e=0;const i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===n.id&&e++;return e}function wl(n,t){if(!t)return[];const e=[],i=t();for(let s=0;s<i.length;s++)i[s].alive&&i[s].squadId===n&&e.push(i[s]);return e}function cg(n){const t=n(),e=new Set;for(let i=0;i<t.length;i++)t[i].alive&&e.add(t[i].id);for(let i=0;i<Qn.length;i++){const s=Qn[i];for(const a of s.unitIds)e.has(a)||s.unitIds.delete(a)}}function dg(){Qn=[],Uc={[nt]:{barracks:0,factory:0,helipad:0},[kt]:{barracks:0,factory:0,helipad:0}}}const ru="183",ds={ROTATE:0,DOLLY:1,PAN:2},Ua={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ug=0,wh=1,hg=2,Do=1,fg=2,Mr=3,Is=0,Vn=1,Kn=2,Fi=0,Ba=1,Fc=2,bh=3,Th=4,pg=5,$s=100,mg=101,_g=102,gg=103,xg=104,vg=200,Mg=201,yg=202,Sg=203,Oc=204,Bc=205,Eg=206,wg=207,bg=208,Tg=209,Ag=210,Rg=211,Cg=212,Pg=213,Dg=214,zc=0,Hc=1,Gc=2,Za=3,kc=4,Vc=5,Wc=6,Xc=7,Mp=0,Ig=1,Lg=2,Oi=0,yp=1,Sp=2,Ep=3,ou=4,wp=5,bp=6,Tp=7,Ap=300,oa=301,ja=302,kl=303,Vl=304,bl=306,qc=1e3,os=1001,Yc=1002,mn=1003,Ug=1004,io=1005,Tn=1006,Wl=1007,Ks=1008,Jn=1009,Rp=1010,Cp=1011,Ir=1012,lu=1013,Gi=1014,Ii=1015,ti=1016,cu=1017,du=1018,Lr=1020,Pp=35902,Dp=35899,Ip=1021,Lp=1022,Ei=1023,fs=1026,Js=1027,Up=1028,uu=1029,Ka=1030,hu=1031,fu=1033,Io=33776,Lo=33777,Uo=33778,No=33779,$c=35840,Zc=35841,jc=35842,Kc=35843,Jc=36196,Qc=37492,td=37496,ed=37488,nd=37489,id=37490,sd=37491,ad=37808,rd=37809,od=37810,ld=37811,cd=37812,dd=37813,ud=37814,hd=37815,fd=37816,pd=37817,md=37818,_d=37819,gd=37820,xd=37821,vd=36492,Md=36494,yd=36495,Sd=36283,Ed=36284,wd=36285,bd=36286,Ng=3200,Np=0,Fg=1,Ts="",si="srgb",Ja="srgb-linear",jo="linear",Se="srgb",pa=7680,Ah=519,Og=512,Bg=513,zg=514,pu=515,Hg=516,Gg=517,mu=518,kg=519,Rh=35044,Ch="300 es",Li=2e3,Ur=2001;function Vg(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ko(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Wg(){const n=Ko("canvas");return n.style.display="block",n}const Ph={};function Dh(...n){const t="THREE."+n.shift();console.log(t,...n)}function Fp(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function $t(...n){n=Fp(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function fe(...n){n=Fp(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Jo(...n){const t=n.join(" ");t in Ph||(Ph[t]=!0,$t(...n))}function Xg(n,t,e){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}const qg={[zc]:Hc,[Gc]:Wc,[kc]:Xc,[Za]:Vc,[Hc]:zc,[Wc]:Gc,[Xc]:kc,[Vc]:Za};class la{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}}const Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fo=Math.PI/180,Td=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[t&255]+Mn[t>>8&255]+"-"+Mn[t>>16&15|64]+Mn[t>>24&255]+"-"+Mn[e&63|128]+Mn[e>>8&255]+"-"+Mn[e>>16&255]+Mn[e>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function de(n,t,e){return Math.max(t,Math.min(e,n))}function Yg(n,t){return(n%t+t)%t}function Xl(n,t,e){return(1-e)*n+e*t}function ur(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Fn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const $g={DEG2RAD:Fo};class Pt{constructor(t=0,e=0){Pt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(de(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ls{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,a,r,o){let c=i[s+0],d=i[s+1],u=i[s+2],l=i[s+3],h=a[r+0],f=a[r+1],_=a[r+2],g=a[r+3];if(l!==g||c!==h||d!==f||u!==_){let p=c*h+d*f+u*_+l*g;p<0&&(h=-h,f=-f,_=-_,g=-g,p=-p);let m=1-o;if(p<.9995){const v=Math.acos(p),M=Math.sin(v);m=Math.sin(m*v)/M,o=Math.sin(o*v)/M,c=c*m+h*o,d=d*m+f*o,u=u*m+_*o,l=l*m+g*o}else{c=c*m+h*o,d=d*m+f*o,u=u*m+_*o,l=l*m+g*o;const v=1/Math.sqrt(c*c+d*d+u*u+l*l);c*=v,d*=v,u*=v,l*=v}}t[e]=c,t[e+1]=d,t[e+2]=u,t[e+3]=l}static multiplyQuaternionsFlat(t,e,i,s,a,r){const o=i[s],c=i[s+1],d=i[s+2],u=i[s+3],l=a[r],h=a[r+1],f=a[r+2],_=a[r+3];return t[e]=o*_+u*l+c*f-d*h,t[e+1]=c*_+u*h+d*l-o*f,t[e+2]=d*_+u*f+o*h-c*l,t[e+3]=u*_-o*l-c*h-d*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,c=Math.sin,d=o(i/2),u=o(s/2),l=o(a/2),h=c(i/2),f=c(s/2),_=c(a/2);switch(r){case"XYZ":this._x=h*u*l+d*f*_,this._y=d*f*l-h*u*_,this._z=d*u*_+h*f*l,this._w=d*u*l-h*f*_;break;case"YXZ":this._x=h*u*l+d*f*_,this._y=d*f*l-h*u*_,this._z=d*u*_-h*f*l,this._w=d*u*l+h*f*_;break;case"ZXY":this._x=h*u*l-d*f*_,this._y=d*f*l+h*u*_,this._z=d*u*_+h*f*l,this._w=d*u*l-h*f*_;break;case"ZYX":this._x=h*u*l-d*f*_,this._y=d*f*l+h*u*_,this._z=d*u*_-h*f*l,this._w=d*u*l+h*f*_;break;case"YZX":this._x=h*u*l+d*f*_,this._y=d*f*l+h*u*_,this._z=d*u*_-h*f*l,this._w=d*u*l-h*f*_;break;case"XZY":this._x=h*u*l-d*f*_,this._y=d*f*l-h*u*_,this._z=d*u*_+h*f*l,this._w=d*u*l+h*f*_;break;default:$t("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],a=e[8],r=e[1],o=e[5],c=e[9],d=e[2],u=e[6],l=e[10],h=i+o+l;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(a-d)*f,this._z=(r-s)*f}else if(i>o&&i>l){const f=2*Math.sqrt(1+i-o-l);this._w=(u-c)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+d)/f}else if(o>l){const f=2*Math.sqrt(1+o-i-l);this._w=(a-d)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+l-i-o);this._w=(r-s)/f,this._x=(a+d)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(de(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,a=t._z,r=t._w,o=e._x,c=e._y,d=e._z,u=e._w;return this._x=i*u+r*o+s*d-a*c,this._y=s*u+r*c+a*o-i*d,this._z=a*u+r*d+i*c-s*o,this._w=r*u-i*o-s*c-a*d,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let c=1-e;if(o<.9995){const d=Math.acos(o),u=Math.sin(d);c=Math.sin(c*d)/u,e=Math.sin(e*d)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+a*e,this._w=this._w*c+r*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+a*e,this._w=this._w*c+r*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ih.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ih.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*s,this.y=a[1]*e+a[4]*i+a[7]*s,this.z=a[2]*e+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*e+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*e+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*e+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,c=t.w,d=2*(r*s-o*i),u=2*(o*e-a*s),l=2*(a*i-r*e);return this.x=e+c*d+r*l-o*u,this.y=i+c*u+o*d-a*l,this.z=s+c*l+a*u-r*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s,this.y=a[1]*e+a[5]*i+a[9]*s,this.z=a[2]*e+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,a=t.z,r=e.x,o=e.y,c=e.z;return this.x=s*c-a*o,this.y=a*r-i*c,this.z=i*o-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ql.copy(this).projectOnVector(t),this.sub(ql)}reflect(t){return this.sub(ql.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(de(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ql=new F,Ih=new Ls;class ee{constructor(t,e,i,s,a,r,o,c,d){ee.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,a,r,o,c,d)}set(t,e,i,s,a,r,o,c,d){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=a,u[5]=c,u[6]=i,u[7]=r,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,a=this.elements,r=i[0],o=i[3],c=i[6],d=i[1],u=i[4],l=i[7],h=i[2],f=i[5],_=i[8],g=s[0],p=s[3],m=s[6],v=s[1],M=s[4],y=s[7],T=s[2],w=s[5],A=s[8];return a[0]=r*g+o*v+c*T,a[3]=r*p+o*M+c*w,a[6]=r*m+o*y+c*A,a[1]=d*g+u*v+l*T,a[4]=d*p+u*M+l*w,a[7]=d*m+u*y+l*A,a[2]=h*g+f*v+_*T,a[5]=h*p+f*M+_*w,a[8]=h*m+f*y+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],d=t[7],u=t[8];return e*r*u-e*o*d-i*a*u+i*o*c+s*a*d-s*r*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],d=t[7],u=t[8],l=u*r-o*d,h=o*c-u*a,f=d*a-r*c,_=e*l+i*h+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=l*g,t[1]=(s*d-u*i)*g,t[2]=(o*i-s*r)*g,t[3]=h*g,t[4]=(u*e-s*c)*g,t[5]=(s*a-o*e)*g,t[6]=f*g,t[7]=(i*c-d*e)*g,t[8]=(r*e-i*a)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,a,r,o){const c=Math.cos(a),d=Math.sin(a);return this.set(i*c,i*d,-i*(c*r+d*o)+r+t,-s*d,s*c,-s*(-d*r+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Yl.makeScale(t,e)),this}rotate(t){return this.premultiply(Yl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yl=new ee,Lh=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uh=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zg(){const n={enabled:!0,workingColorSpace:Ja,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===Se&&(s.r=us(s.r),s.g=us(s.g),s.b=us(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Se&&(s.r=za(s.r),s.g=za(s.g),s.b=za(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ts?jo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Jo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Jo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ja]:{primaries:t,whitePoint:i,transfer:jo,toXYZ:Lh,fromXYZ:Uh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:si},outputColorSpaceConfig:{drawingBufferColorSpace:si}},[si]:{primaries:t,whitePoint:i,transfer:Se,toXYZ:Lh,fromXYZ:Uh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:si}}}),n}const pe=Zg();function us(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function za(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ma;class jg{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ma===void 0&&(ma=Ko("canvas")),ma.width=t.width,ma.height=t.height;const s=ma.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ma}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ko("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=us(a[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(us(e[i]/255)*255):e[i]=us(e[i]);return{data:e,width:t.width,height:t.height}}else return $t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kg=0;class _u{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=$r(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push($l(s[r].image)):a.push($l(s[r]))}else a=$l(s);i.url=a}return e||(t.images[this.uuid]=i),i}}function $l(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:($t("Texture: Unable to serialize Texture."),{})}let Jg=0;const Zl=new F;class Un extends la{constructor(t=Un.DEFAULT_IMAGE,e=Un.DEFAULT_MAPPING,i=os,s=os,a=Tn,r=Ks,o=Ei,c=Jn,d=Un.DEFAULT_ANISOTROPY,u=Ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=$r(),this.name="",this.source=new _u(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=d,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){$t(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){$t(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ap)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qc:t.x=t.x-Math.floor(t.x);break;case os:t.x=t.x<0?0:1;break;case Yc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qc:t.y=t.y-Math.floor(t.y);break;case os:t.y=t.y<0?0:1;break;case Yc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Un.DEFAULT_IMAGE=null;Un.DEFAULT_MAPPING=Ap;Un.DEFAULT_ANISOTROPY=1;class We{constructor(t=0,e=0,i=0,s=1){We.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,a;const c=t.elements,d=c[0],u=c[4],l=c[8],h=c[1],f=c[5],_=c[9],g=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(l-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(l+g)<.1&&Math.abs(_+p)<.1&&Math.abs(d+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(d+1)/2,y=(f+1)/2,T=(m+1)/2,w=(u+h)/4,A=(l+g)/4,x=(_+p)/4;return M>y&&M>T?M<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(M),s=w/i,a=A/i):y>T?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=w/s,a=x/s):T<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(T),i=A/a,s=x/a),this.set(i,s,a,e),this}let v=Math.sqrt((p-_)*(p-_)+(l-g)*(l-g)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(l-g)/v,this.z=(h-u)/v,this.w=Math.acos((d+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=de(this.x,t.x,e.x),this.y=de(this.y,t.y,e.y),this.z=de(this.z,t.z,e.z),this.w=de(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=de(this.x,t,e),this.y=de(this.y,t,e),this.z=de(this.z,t,e),this.w=de(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(de(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qg extends la{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new We(0,0,t,e),this.scissorTest=!1,this.viewport=new We(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},a=new Un(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new _u(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Qg{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Op extends Un{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class tx extends Un{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ge{constructor(t,e,i,s,a,r,o,c,d,u,l,h,f,_,g,p){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,a,r,o,c,d,u,l,h,f,_,g,p)}set(t,e,i,s,a,r,o,c,d,u,l,h,f,_,g,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=a,m[5]=r,m[9]=o,m[13]=c,m[2]=d,m[6]=u,m[10]=l,m[14]=h,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,i=t.elements,s=1/_a.setFromMatrixColumn(t,0).length(),a=1/_a.setFromMatrixColumn(t,1).length(),r=1/_a.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),c=Math.cos(s),d=Math.sin(s),u=Math.cos(a),l=Math.sin(a);if(t.order==="XYZ"){const h=r*u,f=r*l,_=o*u,g=o*l;e[0]=c*u,e[4]=-c*l,e[8]=d,e[1]=f+_*d,e[5]=h-g*d,e[9]=-o*c,e[2]=g-h*d,e[6]=_+f*d,e[10]=r*c}else if(t.order==="YXZ"){const h=c*u,f=c*l,_=d*u,g=d*l;e[0]=h+g*o,e[4]=_*o-f,e[8]=r*d,e[1]=r*l,e[5]=r*u,e[9]=-o,e[2]=f*o-_,e[6]=g+h*o,e[10]=r*c}else if(t.order==="ZXY"){const h=c*u,f=c*l,_=d*u,g=d*l;e[0]=h-g*o,e[4]=-r*l,e[8]=_+f*o,e[1]=f+_*o,e[5]=r*u,e[9]=g-h*o,e[2]=-r*d,e[6]=o,e[10]=r*c}else if(t.order==="ZYX"){const h=r*u,f=r*l,_=o*u,g=o*l;e[0]=c*u,e[4]=_*d-f,e[8]=h*d+g,e[1]=c*l,e[5]=g*d+h,e[9]=f*d-_,e[2]=-d,e[6]=o*c,e[10]=r*c}else if(t.order==="YZX"){const h=r*c,f=r*d,_=o*c,g=o*d;e[0]=c*u,e[4]=g-h*l,e[8]=_*l+f,e[1]=l,e[5]=r*u,e[9]=-o*u,e[2]=-d*u,e[6]=f*l+_,e[10]=h-g*l}else if(t.order==="XZY"){const h=r*c,f=r*d,_=o*c,g=o*d;e[0]=c*u,e[4]=-l,e[8]=d*u,e[1]=h*l+g,e[5]=r*u,e[9]=f*l-_,e[2]=_*l-f,e[6]=o*u,e[10]=g*l+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ex,t,nx)}lookAt(t,e,i){const s=this.elements;return Yn.subVectors(t,e),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),_s.crossVectors(i,Yn),_s.lengthSq()===0&&(Math.abs(i.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),_s.crossVectors(i,Yn)),_s.normalize(),so.crossVectors(Yn,_s),s[0]=_s.x,s[4]=so.x,s[8]=Yn.x,s[1]=_s.y,s[5]=so.y,s[9]=Yn.y,s[2]=_s.z,s[6]=so.z,s[10]=Yn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,a=this.elements,r=i[0],o=i[4],c=i[8],d=i[12],u=i[1],l=i[5],h=i[9],f=i[13],_=i[2],g=i[6],p=i[10],m=i[14],v=i[3],M=i[7],y=i[11],T=i[15],w=s[0],A=s[4],x=s[8],S=s[12],I=s[1],C=s[5],U=s[9],L=s[13],k=s[2],B=s[6],V=s[10],H=s[14],et=s[3],tt=s[7],ht=s[11],lt=s[15];return a[0]=r*w+o*I+c*k+d*et,a[4]=r*A+o*C+c*B+d*tt,a[8]=r*x+o*U+c*V+d*ht,a[12]=r*S+o*L+c*H+d*lt,a[1]=u*w+l*I+h*k+f*et,a[5]=u*A+l*C+h*B+f*tt,a[9]=u*x+l*U+h*V+f*ht,a[13]=u*S+l*L+h*H+f*lt,a[2]=_*w+g*I+p*k+m*et,a[6]=_*A+g*C+p*B+m*tt,a[10]=_*x+g*U+p*V+m*ht,a[14]=_*S+g*L+p*H+m*lt,a[3]=v*w+M*I+y*k+T*et,a[7]=v*A+M*C+y*B+T*tt,a[11]=v*x+M*U+y*V+T*ht,a[15]=v*S+M*L+y*H+T*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],c=t[9],d=t[13],u=t[2],l=t[6],h=t[10],f=t[14],_=t[3],g=t[7],p=t[11],m=t[15],v=c*f-d*h,M=o*f-d*l,y=o*h-c*l,T=r*f-d*u,w=r*h-c*u,A=r*l-o*u;return e*(g*v-p*M+m*y)-i*(_*v-p*T+m*w)+s*(_*M-g*T+m*A)-a*(_*y-g*w+p*A)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],c=t[6],d=t[7],u=t[8],l=t[9],h=t[10],f=t[11],_=t[12],g=t[13],p=t[14],m=t[15],v=e*o-i*r,M=e*c-s*r,y=e*d-a*r,T=i*c-s*o,w=i*d-a*o,A=s*d-a*c,x=u*g-l*_,S=u*p-h*_,I=u*m-f*_,C=l*p-h*g,U=l*m-f*g,L=h*m-f*p,k=v*L-M*U+y*C+T*I-w*S+A*x;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/k;return t[0]=(o*L-c*U+d*C)*B,t[1]=(s*U-i*L-a*C)*B,t[2]=(g*A-p*w+m*T)*B,t[3]=(h*w-l*A-f*T)*B,t[4]=(c*I-r*L-d*S)*B,t[5]=(e*L-s*I+a*S)*B,t[6]=(p*y-_*A-m*M)*B,t[7]=(u*A-h*y+f*M)*B,t[8]=(r*U-o*I+d*x)*B,t[9]=(i*I-e*U-a*x)*B,t[10]=(_*w-g*y+m*v)*B,t[11]=(l*y-u*w-f*v)*B,t[12]=(o*S-r*C-c*x)*B,t[13]=(e*C-i*S+s*x)*B,t[14]=(g*M-_*T-p*v)*B,t[15]=(u*T-l*M+h*v)*B,this}scale(t){const e=this.elements,i=t.x,s=t.y,a=t.z;return e[0]*=i,e[4]*=s,e[8]*=a,e[1]*=i,e[5]*=s,e[9]*=a,e[2]*=i,e[6]*=s,e[10]*=a,e[3]*=i,e[7]*=s,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),a=1-i,r=t.x,o=t.y,c=t.z,d=a*r,u=a*o;return this.set(d*r+i,d*o-s*c,d*c+s*o,0,d*o+s*c,u*o+i,u*c-s*r,0,d*c-s*o,u*c+s*r,a*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,a=e._x,r=e._y,o=e._z,c=e._w,d=a+a,u=r+r,l=o+o,h=a*d,f=a*u,_=a*l,g=r*u,p=r*l,m=o*l,v=c*d,M=c*u,y=c*l,T=i.x,w=i.y,A=i.z;return s[0]=(1-(g+m))*T,s[1]=(f+y)*T,s[2]=(_-M)*T,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(h+m))*w,s[6]=(p+v)*w,s[7]=0,s[8]=(_+M)*A,s[9]=(p-v)*A,s[10]=(1-(h+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const a=this.determinant();if(a===0)return i.set(1,1,1),e.identity(),this;let r=_a.set(s[0],s[1],s[2]).length();const o=_a.set(s[4],s[5],s[6]).length(),c=_a.set(s[8],s[9],s[10]).length();a<0&&(r=-r),di.copy(this);const d=1/r,u=1/o,l=1/c;return di.elements[0]*=d,di.elements[1]*=d,di.elements[2]*=d,di.elements[4]*=u,di.elements[5]*=u,di.elements[6]*=u,di.elements[8]*=l,di.elements[9]*=l,di.elements[10]*=l,e.setFromRotationMatrix(di),i.x=r,i.y=o,i.z=c,this}makePerspective(t,e,i,s,a,r,o=Li,c=!1){const d=this.elements,u=2*a/(e-t),l=2*a/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let _,g;if(c)_=a/(r-a),g=r*a/(r-a);else if(o===Li)_=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Ur)_=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return d[0]=u,d[4]=0,d[8]=h,d[12]=0,d[1]=0,d[5]=l,d[9]=f,d[13]=0,d[2]=0,d[6]=0,d[10]=_,d[14]=g,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,e,i,s,a,r,o=Li,c=!1){const d=this.elements,u=2/(e-t),l=2/(i-s),h=-(e+t)/(e-t),f=-(i+s)/(i-s);let _,g;if(c)_=1/(r-a),g=r/(r-a);else if(o===Li)_=-2/(r-a),g=-(r+a)/(r-a);else if(o===Ur)_=-1/(r-a),g=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return d[0]=u,d[4]=0,d[8]=0,d[12]=h,d[1]=0,d[5]=l,d[9]=0,d[13]=f,d[2]=0,d[6]=0,d[10]=_,d[14]=g,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const _a=new F,di=new Ge,ex=new F(0,0,0),nx=new F(1,1,1),_s=new F,so=new F,Yn=new F,Nh=new Ge,Fh=new Ls;class ki{constructor(t=0,e=0,i=0,s=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,a=s[0],r=s[4],o=s[8],c=s[1],d=s[5],u=s[9],l=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(de(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,d),this._z=0);break;case"YXZ":this._x=Math.asin(-de(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-l,a),this._z=0);break;case"ZXY":this._x=Math.asin(de(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-l,f),this._z=Math.atan2(-r,d)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-de(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,d));break;case"YZX":this._z=Math.asin(de(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-l,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-de(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,d),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:$t("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Nh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fh.setFromEuler(this),this.setFromQuaternion(Fh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class gu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ix=0;const Oh=new F,ga=new Ls,$i=new Ge,ao=new F,hr=new F,sx=new F,ax=new Ls,Bh=new F(1,0,0),zh=new F(0,1,0),Hh=new F(0,0,1),Gh={type:"added"},rx={type:"removed"},xa={type:"childadded",child:null},jl={type:"childremoved",child:null};class cn extends la{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const t=new F,e=new ki,i=new Ls,s=new F(1,1,1);function a(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new ee}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ga.setFromAxisAngle(t,e),this.quaternion.multiply(ga),this}rotateOnWorldAxis(t,e){return ga.setFromAxisAngle(t,e),this.quaternion.premultiply(ga),this}rotateX(t){return this.rotateOnAxis(Bh,t)}rotateY(t){return this.rotateOnAxis(zh,t)}rotateZ(t){return this.rotateOnAxis(Hh,t)}translateOnAxis(t,e){return Oh.copy(t).applyQuaternion(this.quaternion),this.position.add(Oh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bh,t)}translateY(t){return this.translateOnAxis(zh,t)}translateZ(t){return this.translateOnAxis(Hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($i.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ao.copy(t):ao.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$i.lookAt(hr,ao,this.up):$i.lookAt(ao,hr,this.up),this.quaternion.setFromRotationMatrix($i),s&&($i.extractRotation(s.matrixWorld),ga.setFromRotationMatrix($i),this.quaternion.premultiply(ga.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gh),xa.child=t,this.dispatchEvent(xa),xa.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rx),jl.child=t,this.dispatchEvent(jl),jl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$i.multiply(t.parent.matrixWorld)),t.applyMatrix4($i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gh),xa.child=t,this.dispatchEvent(xa),xa.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,t,sx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,ax,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=e-a[0]*e-a[4]*i-a[8]*s,a[13]+=i-a[1]*e-a[5]*i-a[9]*s,a[14]+=s-a[2]*e-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let d=0,u=c.length;d<u;d++){const l=c[d];a(t.shapes,l)}else a(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,d=this.material.length;c<d;c++)o.push(a(t.materials,this.material[c]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(t.animations,c))}}if(e){const o=r(t.geometries),c=r(t.materials),d=r(t.textures),u=r(t.images),l=r(t.shapes),h=r(t.skeletons),f=r(t.animations),_=r(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),l.length>0&&(i.shapes=l),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){const c=[];for(const d in o){const u=o[d];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}cn.DEFAULT_UP=new F(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ee extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ox={type:"move"};class Kl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){r=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,i),m=this._getHandJoint(d,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=d.joints["index-finger-tip"],l=d.joints["thumb-tip"],h=u.position.distanceTo(l.position),f=.02,_=.005;d.inputState.pinching&&h>f+_?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&h<=f-_&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ox)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),d!==null&&(d.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ee;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gs={h:0,s:0,l:0},ro={h:0,s:0,l:0};function Jl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ht{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=si){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=i,pe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=pe.workingColorSpace){if(t=Yg(t,1),e=de(e,0,1),i=de(i,0,1),e===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+e):i+e-i*e,r=2*i-a;this.r=Jl(r,a,t+1/3),this.g=Jl(r,a,t),this.b=Jl(r,a,t-1/3)}return pe.colorSpaceToWorking(this,s),this}setStyle(t,e=si){function i(a){a!==void 0&&parseFloat(a)<1&&$t("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:$t("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(a,16),e);$t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=si){const i=Bp[t.toLowerCase()];return i!==void 0?this.setHex(i,e):$t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=us(t.r),this.g=us(t.g),this.b=us(t.b),this}copyLinearToSRGB(t){return this.r=za(t.r),this.g=za(t.g),this.b=za(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=si){return pe.workingToColorSpace(yn.copy(this),t),Math.round(de(yn.r*255,0,255))*65536+Math.round(de(yn.g*255,0,255))*256+Math.round(de(yn.b*255,0,255))}getHexString(t=si){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.workingToColorSpace(yn.copy(this),e);const i=yn.r,s=yn.g,a=yn.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let c,d;const u=(o+r)/2;if(o===r)c=0,d=0;else{const l=r-o;switch(d=u<=.5?l/(r+o):l/(2-r-o),r){case i:c=(s-a)/l+(s<a?6:0);break;case s:c=(a-i)/l+2;break;case a:c=(i-s)/l+4;break}c/=6}return t.h=c,t.s=d,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.workingToColorSpace(yn.copy(this),e),t.r=yn.r,t.g=yn.g,t.b=yn.b,t}getStyle(t=si){pe.workingToColorSpace(yn.copy(this),t);const e=yn.r,i=yn.g,s=yn.b;return t!==si?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(gs),this.setHSL(gs.h+t,gs.s+e,gs.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(gs),t.getHSL(ro);const i=Xl(gs.h,ro.h,e),s=Xl(gs.s,ro.s,e),a=Xl(gs.l,ro.l,e);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*s,this.g=a[1]*e+a[4]*i+a[7]*s,this.b=a[2]*e+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new Ht;Ht.NAMES=Bp;class xu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ht(t),this.density=e}clone(){return new xu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class lx extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const ui=new F,Zi=new F,Ql=new F,ji=new F,va=new F,Ma=new F,kh=new F,tc=new F,ec=new F,nc=new F,ic=new We,sc=new We,ac=new We;class yi{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),ui.subVectors(t,e),s.cross(ui);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,e,i,s,a){ui.subVectors(s,e),Zi.subVectors(i,e),Ql.subVectors(t,e);const r=ui.dot(ui),o=ui.dot(Zi),c=ui.dot(Ql),d=Zi.dot(Zi),u=Zi.dot(Ql),l=r*d-o*o;if(l===0)return a.set(0,0,0),null;const h=1/l,f=(d*c-o*u)*h,_=(r*u-o*c)*h;return a.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(t,e,i,s,a,r,o,c){return this.getBarycoord(t,e,i,s,ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,ji.x),c.addScaledVector(r,ji.y),c.addScaledVector(o,ji.z),c)}static getInterpolatedAttribute(t,e,i,s,a,r){return ic.setScalar(0),sc.setScalar(0),ac.setScalar(0),ic.fromBufferAttribute(t,e),sc.fromBufferAttribute(t,i),ac.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(ic,a.x),r.addScaledVector(sc,a.y),r.addScaledVector(ac,a.z),r}static isFrontFacing(t,e,i,s){return ui.subVectors(i,e),Zi.subVectors(t,e),ui.cross(Zi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ui.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),ui.cross(Zi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return yi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return yi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,a){return yi.getInterpolation(t,this.a,this.b,this.c,e,i,s,a)}containsPoint(t){return yi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return yi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,a=this.c;let r,o;va.subVectors(s,i),Ma.subVectors(a,i),tc.subVectors(t,i);const c=va.dot(tc),d=Ma.dot(tc);if(c<=0&&d<=0)return e.copy(i);ec.subVectors(t,s);const u=va.dot(ec),l=Ma.dot(ec);if(u>=0&&l<=u)return e.copy(s);const h=c*l-u*d;if(h<=0&&c>=0&&u<=0)return r=c/(c-u),e.copy(i).addScaledVector(va,r);nc.subVectors(t,a);const f=va.dot(nc),_=Ma.dot(nc);if(_>=0&&f<=_)return e.copy(a);const g=f*d-c*_;if(g<=0&&d>=0&&_<=0)return o=d/(d-_),e.copy(i).addScaledVector(Ma,o);const p=u*_-f*l;if(p<=0&&l-u>=0&&f-_>=0)return kh.subVectors(a,s),o=(l-u)/(l-u+(f-_)),e.copy(s).addScaledVector(kh,o);const m=1/(p+g+h);return r=g*m,o=h*m,e.copy(i).addScaledVector(va,r).addScaledVector(Ma,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Zr{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(hi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(hi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=hi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,hi):hi.fromBufferAttribute(a,r),hi.applyMatrix4(t.matrixWorld),this.expandByPoint(hi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),oo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),oo.copy(i.boundingBox)),oo.applyMatrix4(t.matrixWorld),this.union(oo)}const s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hi),hi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fr),lo.subVectors(this.max,fr),ya.subVectors(t.a,fr),Sa.subVectors(t.b,fr),Ea.subVectors(t.c,fr),xs.subVectors(Sa,ya),vs.subVectors(Ea,Sa),Gs.subVectors(ya,Ea);let e=[0,-xs.z,xs.y,0,-vs.z,vs.y,0,-Gs.z,Gs.y,xs.z,0,-xs.x,vs.z,0,-vs.x,Gs.z,0,-Gs.x,-xs.y,xs.x,0,-vs.y,vs.x,0,-Gs.y,Gs.x,0];return!rc(e,ya,Sa,Ea,lo)||(e=[1,0,0,0,1,0,0,0,1],!rc(e,ya,Sa,Ea,lo))?!1:(co.crossVectors(xs,vs),e=[co.x,co.y,co.z],rc(e,ya,Sa,Ea,lo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ki=[new F,new F,new F,new F,new F,new F,new F,new F],hi=new F,oo=new Zr,ya=new F,Sa=new F,Ea=new F,xs=new F,vs=new F,Gs=new F,fr=new F,lo=new F,co=new F,ks=new F;function rc(n,t,e,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){ks.fromArray(n,a);const o=s.x*Math.abs(ks.x)+s.y*Math.abs(ks.y)+s.z*Math.abs(ks.z),c=t.dot(ks),d=e.dot(ks),u=i.dot(ks);if(Math.max(-Math.max(c,d,u),Math.min(c,d,u))>o)return!1}return!0}const Ze=new F,uo=new Pt;let cx=0;class Bi{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Rh,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)uo.fromBufferAttribute(this,e),uo.applyMatrix3(t),this.setXY(e,uo.x,uo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix3(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix4(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyNormalMatrix(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.transformDirection(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ur(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Fn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ur(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ur(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ur(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ur(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Fn(e,this.array),i=Fn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Fn(e,this.array),i=Fn(i,this.array),s=Fn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,a){return t*=this.itemSize,this.normalized&&(e=Fn(e,this.array),i=Fn(i,this.array),s=Fn(s,this.array),a=Fn(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rh&&(t.usage=this.usage),t}}class zp extends Bi{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Hp extends Bi{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class _e extends Bi{constructor(t,e,i){super(new Float32Array(t),e,i)}}const dx=new Zr,pr=new F,oc=new F;class Tl{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):dx.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;pr.subVectors(t,this.center);const e=pr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(pr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(pr.copy(t.center).add(oc)),this.expandByPoint(pr.copy(t.center).sub(oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ux=0;const ei=new Ge,lc=new cn,wa=new F,$n=new Zr,mr=new Zr,rn=new F;class un extends la{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ux++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vg(t)?Hp:zp)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new ee().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ei.makeRotationFromQuaternion(t),this.applyMatrix4(ei),this}rotateX(t){return ei.makeRotationX(t),this.applyMatrix4(ei),this}rotateY(t){return ei.makeRotationY(t),this.applyMatrix4(ei),this}rotateZ(t){return ei.makeRotationZ(t),this.applyMatrix4(ei),this}translate(t,e,i){return ei.makeTranslation(t,e,i),this.applyMatrix4(ei),this}scale(t,e,i){return ei.makeScale(t,e,i),this.applyMatrix4(ei),this}lookAt(t){return lc.lookAt(t),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wa).negate(),this.translate(wa.x,wa.y,wa.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,a=t.length;s<a;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new _e(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const a=t[s];e.setXYZ(s,a.x,a.y,a.z||0)}t.length>e.count&&$t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const a=e[i];$n.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if($n.setFromBufferAttribute(t),e)for(let a=0,r=e.length;a<r;a++){const o=e[a];mr.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors($n.min,mr.min),$n.expandByPoint(rn),rn.addVectors($n.max,mr.max),$n.expandByPoint(rn)):($n.expandByPoint(mr.min),$n.expandByPoint(mr.max))}$n.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)rn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(rn));if(e)for(let a=0,r=e.length;a<r;a++){const o=e[a],c=this.morphTargetsRelative;for(let d=0,u=o.count;d<u;d++)rn.fromBufferAttribute(o,d),c&&(wa.fromBufferAttribute(t,d),rn.add(wa)),s=Math.max(s,i.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bi(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new F,c[x]=new F;const d=new F,u=new F,l=new F,h=new Pt,f=new Pt,_=new Pt,g=new F,p=new F;function m(x,S,I){d.fromBufferAttribute(i,x),u.fromBufferAttribute(i,S),l.fromBufferAttribute(i,I),h.fromBufferAttribute(a,x),f.fromBufferAttribute(a,S),_.fromBufferAttribute(a,I),u.sub(d),l.sub(d),f.sub(h),_.sub(h);const C=1/(f.x*_.y-_.x*f.y);isFinite(C)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(l,-f.y).multiplyScalar(C),p.copy(l).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(C),o[x].add(g),o[S].add(g),o[I].add(g),c[x].add(p),c[S].add(p),c[I].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,S=v.length;x<S;++x){const I=v[x],C=I.start,U=I.count;for(let L=C,k=C+U;L<k;L+=3)m(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const M=new F,y=new F,T=new F,w=new F;function A(x){T.fromBufferAttribute(s,x),w.copy(T);const S=o[x];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),y.crossVectors(w,S);const C=y.dot(c[x])<0?-1:1;r.setXYZW(x,M.x,M.y,M.z,C)}for(let x=0,S=v.length;x<S;++x){const I=v[x],C=I.start,U=I.count;for(let L=C,k=C+U;L<k;L+=3)A(t.getX(L+0)),A(t.getX(L+1)),A(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bi(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new F,a=new F,r=new F,o=new F,c=new F,d=new F,u=new F,l=new F;if(t)for(let h=0,f=t.count;h<f;h+=3){const _=t.getX(h+0),g=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),r.fromBufferAttribute(e,p),u.subVectors(r,a),l.subVectors(s,a),u.cross(l),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),d.fromBufferAttribute(i,p),o.add(u),c.add(u),d.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,d.x,d.y,d.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),a.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,a),l.subVectors(s,a),u.cross(l),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)rn.fromBufferAttribute(t,e),rn.normalize(),t.setXYZ(e,rn.x,rn.y,rn.z)}toNonIndexed(){function t(o,c){const d=o.array,u=o.itemSize,l=o.normalized,h=new d.constructor(c.length*u);let f=0,_=0;for(let g=0,p=c.length;g<p;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*u;for(let m=0;m<u;m++)h[_++]=d[f++]}return new Bi(h,u,l)}if(this.index===null)return $t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new un,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],d=t(c,i);e.setAttribute(o,d)}const a=this.morphAttributes;for(const o in a){const c=[],d=a[o];for(let u=0,l=d.length;u<l;u++){const h=d[u],f=t(h,i);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const d=r[o];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(t[d]=c[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const d=i[c];t.data.attributes[c]=d.toJSON(t.data)}const s={};let a=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],u=[];for(let l=0,h=d.length;l<h;l++){const f=d[l];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(e))}const a=t.morphAttributes;for(const d in a){const u=[],l=a[d];for(let h=0,f=l.length;h<f;h++)u.push(l[h].clone(e));this.morphAttributes[d]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let d=0,u=r.length;d<u;d++){const l=r[d];this.addGroup(l.start,l.count,l.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let hx=0;class lr extends la{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hx++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=Ba,this.side=Is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=Bc,this.blendEquation=$s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=Za,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pa,this.stencilZFail=pa,this.stencilZPass=pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){$t(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){$t(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ba&&(i.blending=this.blending),this.side!==Is&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Oc&&(i.blendSrc=this.blendSrc),this.blendDst!==Bc&&(i.blendDst=this.blendDst),this.blendEquation!==$s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Za&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ah&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pa&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pa&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pa&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(e){const a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ji=new F,cc=new F,ho=new F,Ms=new F,dc=new F,fo=new F,uc=new F;class Al{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ji)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ji.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ji.copy(this.origin).addScaledVector(this.direction,e),Ji.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){cc.copy(t).add(e).multiplyScalar(.5),ho.copy(e).sub(t).normalize(),Ms.copy(this.origin).sub(cc);const a=t.distanceTo(e)*.5,r=-this.direction.dot(ho),o=Ms.dot(this.direction),c=-Ms.dot(ho),d=Ms.lengthSq(),u=Math.abs(1-r*r);let l,h,f,_;if(u>0)if(l=r*c-o,h=r*o-c,_=a*u,l>=0)if(h>=-_)if(h<=_){const g=1/u;l*=g,h*=g,f=l*(l+r*h+2*o)+h*(r*l+h+2*c)+d}else h=a,l=Math.max(0,-(r*h+o)),f=-l*l+h*(h+2*c)+d;else h=-a,l=Math.max(0,-(r*h+o)),f=-l*l+h*(h+2*c)+d;else h<=-_?(l=Math.max(0,-(-r*a+o)),h=l>0?-a:Math.min(Math.max(-a,-c),a),f=-l*l+h*(h+2*c)+d):h<=_?(l=0,h=Math.min(Math.max(-a,-c),a),f=h*(h+2*c)+d):(l=Math.max(0,-(r*a+o)),h=l>0?a:Math.min(Math.max(-a,-c),a),f=-l*l+h*(h+2*c)+d);else h=r>0?-a:a,l=Math.max(0,-(r*h+o)),f=-l*l+h*(h+2*c)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,l),s&&s.copy(cc).addScaledVector(ho,h),f}intersectSphere(t,e){Ji.subVectors(t.center,this.origin);const i=Ji.dot(this.direction),s=Ji.dot(Ji)-i*i,a=t.radius*t.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,c=i+r;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,a,r,o,c;const d=1/this.direction.x,u=1/this.direction.y,l=1/this.direction.z,h=this.origin;return d>=0?(i=(t.min.x-h.x)*d,s=(t.max.x-h.x)*d):(i=(t.max.x-h.x)*d,s=(t.min.x-h.x)*d),u>=0?(a=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(a=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),l>=0?(o=(t.min.z-h.z)*l,c=(t.max.z-h.z)*l):(o=(t.max.z-h.z)*l,c=(t.min.z-h.z)*l),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ji)!==null}intersectTriangle(t,e,i,s,a){dc.subVectors(e,t),fo.subVectors(i,t),uc.crossVectors(dc,fo);let r=this.direction.dot(uc),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ms.subVectors(this.origin,t);const c=o*this.direction.dot(fo.crossVectors(Ms,fo));if(c<0)return null;const d=o*this.direction.dot(dc.cross(Ms));if(d<0||c+d>r)return null;const u=-o*Ms.dot(uc);return u<0?null:this.at(u/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nn extends lr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Mp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Vh=new Ge,Vs=new Al,po=new Tl,Wh=new F,mo=new F,_o=new F,go=new F,hc=new F,xo=new F,Xh=new F,vo=new F;class b extends cn{constructor(t=new un,e=new Nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(a&&o){xo.set(0,0,0);for(let c=0,d=a.length;c<d;c++){const u=o[c],l=a[c];u!==0&&(hc.fromBufferAttribute(l,t),r?xo.addScaledVector(hc,u):xo.addScaledVector(hc.sub(e),u))}e.add(xo)}return e}raycast(t,e){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),po.copy(i.boundingSphere),po.applyMatrix4(a),Vs.copy(t.ray).recast(t.near),!(po.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(po,Wh)===null||Vs.origin.distanceToSquared(Wh)>(t.far-t.near)**2))&&(Vh.copy(a).invert(),Vs.copy(t.ray).applyMatrix4(Vh),!(i.boundingBox!==null&&Vs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Vs)))}_computeIntersections(t,e,i){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,d=a.attributes.uv,u=a.attributes.uv1,l=a.attributes.normal,h=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=h.length;_<g;_++){const p=h[_],m=r[p.materialIndex],v=Math.max(p.start,f.start),M=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,T=M;y<T;y+=3){const w=o.getX(y),A=o.getX(y+1),x=o.getX(y+2);s=Mo(this,m,t,i,d,u,l,w,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const v=o.getX(p),M=o.getX(p+1),y=o.getX(p+2);s=Mo(this,r,t,i,d,u,l,v,M,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let _=0,g=h.length;_<g;_++){const p=h[_],m=r[p.materialIndex],v=Math.max(p.start,f.start),M=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let y=v,T=M;y<T;y+=3){const w=y,A=y+1,x=y+2;s=Mo(this,m,t,i,d,u,l,w,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const v=p,M=p+1,y=p+2;s=Mo(this,r,t,i,d,u,l,v,M,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function fx(n,t,e,i,s,a,r,o){let c;if(t.side===Vn?c=i.intersectTriangle(r,a,s,!0,o):c=i.intersectTriangle(s,a,r,t.side===Is,o),c===null)return null;vo.copy(o),vo.applyMatrix4(n.matrixWorld);const d=e.ray.origin.distanceTo(vo);return d<e.near||d>e.far?null:{distance:d,point:vo.clone(),object:n}}function Mo(n,t,e,i,s,a,r,o,c,d){n.getVertexPosition(o,mo),n.getVertexPosition(c,_o),n.getVertexPosition(d,go);const u=fx(n,t,e,i,mo,_o,go,Xh);if(u){const l=new F;yi.getBarycoord(Xh,mo,_o,go,l),s&&(u.uv=yi.getInterpolatedAttribute(s,o,c,d,l,new Pt)),a&&(u.uv1=yi.getInterpolatedAttribute(a,o,c,d,l,new Pt)),r&&(u.normal=yi.getInterpolatedAttribute(r,o,c,d,l,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:d,normal:new F,materialIndex:0};yi.getNormal(mo,_o,go,h.normal),u.face=h,u.barycoord=l}return u}class px extends Un{constructor(t=null,e=1,i=1,s,a,r,o,c,d=mn,u=mn,l,h){super(null,r,o,c,d,u,s,a,l,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fc=new F,mx=new F,_x=new ee;class Ri{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=fc.subVectors(i,e).cross(mx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||_x.getNormalMatrix(t),s=this.coplanarPoint(fc).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ws=new Tl,gx=new Pt(.5,.5),yo=new F;class vu{constructor(t=new Ri,e=new Ri,i=new Ri,s=new Ri,a=new Ri,r=new Ri){this.planes=[t,e,i,s,a,r]}set(t,e,i,s,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Li,i=!1){const s=this.planes,a=t.elements,r=a[0],o=a[1],c=a[2],d=a[3],u=a[4],l=a[5],h=a[6],f=a[7],_=a[8],g=a[9],p=a[10],m=a[11],v=a[12],M=a[13],y=a[14],T=a[15];if(s[0].setComponents(d-r,f-u,m-_,T-v).normalize(),s[1].setComponents(d+r,f+u,m+_,T+v).normalize(),s[2].setComponents(d+o,f+l,m+g,T+M).normalize(),s[3].setComponents(d-o,f-l,m-g,T-M).normalize(),i)s[4].setComponents(c,h,p,y).normalize(),s[5].setComponents(d-c,f-h,m-p,T-y).normalize();else if(s[4].setComponents(d-c,f-h,m-p,T-y).normalize(),e===Li)s[5].setComponents(d+c,f+h,m+p,T+y).normalize();else if(e===Ur)s[5].setComponents(c,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ws.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ws.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ws)}intersectsSprite(t){Ws.center.set(0,0,0);const e=gx.distanceTo(t.center);return Ws.radius=.7071067811865476+e,Ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ws)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(yo.x=s.normal.x>0?t.max.x:t.min.x,yo.y=s.normal.y>0?t.max.y:t.min.y,yo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(yo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Gp extends lr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qo=new F,tl=new F,qh=new Ge,_r=new Al,So=new Tl,pc=new F,Yh=new F;class xx extends cn{constructor(t=new un,e=new Gp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,a=e.count;s<a;s++)Qo.fromBufferAttribute(e,s-1),tl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Qo.distanceTo(tl);t.setAttribute("lineDistance",new _e(i,1))}else $t("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),So.copy(i.boundingSphere),So.applyMatrix4(s),So.radius+=a,t.ray.intersectsSphere(So)===!1)return;qh.copy(s).invert(),_r.copy(t.ray).applyMatrix4(qh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,d=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=f,p=_-1;g<p;g+=d){const m=u.getX(g),v=u.getX(g+1),M=Eo(this,t,_r,c,m,v,g);M&&e.push(M)}if(this.isLineLoop){const g=u.getX(_-1),p=u.getX(f),m=Eo(this,t,_r,c,g,p,_-1);m&&e.push(m)}}else{const f=Math.max(0,r.start),_=Math.min(h.count,r.start+r.count);for(let g=f,p=_-1;g<p;g+=d){const m=Eo(this,t,_r,c,g,g+1,g);m&&e.push(m)}if(this.isLineLoop){const g=Eo(this,t,_r,c,_-1,f,_-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Eo(n,t,e,i,s,a,r){const o=n.geometry.attributes.position;if(Qo.fromBufferAttribute(o,s),tl.fromBufferAttribute(o,a),e.distanceSqToSegment(Qo,tl,pc,Yh)>i)return;pc.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(pc);if(!(d<t.near||d>t.far))return{distance:d,point:Yh.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const $h=new F,Zh=new F;class vx extends xx{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,a=e.count;s<a;s+=2)$h.fromBufferAttribute(e,s),Zh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+$h.distanceTo(Zh);t.setAttribute("lineDistance",new _e(i,1))}else $t("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kp extends Un{constructor(t=[],e=oa,i,s,a,r,o,c,d,u){super(t,e,i,s,a,r,o,c,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nr extends Un{constructor(t,e,i=Gi,s,a,r,o=mn,c=mn,d,u=fs,l=1){if(u!==fs&&u!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:l};super(h,s,a,r,o,c,u,i,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new _u(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Mx extends Nr{constructor(t,e=Gi,i=oa,s,a,r=mn,o=mn,c,d=fs){const u={width:t,height:t,depth:1},l=[u,u,u,u,u,u];super(t,t,e,i,s,a,r,o,c,d),this.image=l,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Vp extends Un{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class q extends un{constructor(t=1,e=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],d=[],u=[],l=[];let h=0,f=0;_("z","y","x",-1,-1,i,e,t,r,a,0),_("z","y","x",1,-1,i,e,-t,r,a,1),_("x","z","y",1,1,t,i,e,s,r,2),_("x","z","y",1,-1,t,i,-e,s,r,3),_("x","y","z",1,-1,t,e,i,s,a,4),_("x","y","z",-1,-1,t,e,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new _e(d,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(l,2));function _(g,p,m,v,M,y,T,w,A,x,S){const I=y/A,C=T/x,U=y/2,L=T/2,k=w/2,B=A+1,V=x+1;let H=0,et=0;const tt=new F;for(let ht=0;ht<V;ht++){const lt=ht*C-L;for(let ct=0;ct<B;ct++){const Wt=ct*I-U;tt[g]=Wt*v,tt[p]=lt*M,tt[m]=k,d.push(tt.x,tt.y,tt.z),tt[g]=0,tt[p]=0,tt[m]=w>0?1:-1,u.push(tt.x,tt.y,tt.z),l.push(ct/A),l.push(1-ht/x),H+=1}}for(let ht=0;ht<x;ht++)for(let lt=0;lt<A;lt++){const ct=h+lt+B*ht,Wt=h+lt+B*(ht+1),be=h+(lt+1)+B*(ht+1),Fe=h+(lt+1)+B*ht;c.push(ct,Wt,Fe),c.push(Wt,be,Fe),et+=6}o.addGroup(f,et,S),f+=et,h+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new q(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Mu extends un{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const a=[],r=[],o=[],c=[],d=new F,u=new Pt;r.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let l=0,h=3;l<=e;l++,h+=3){const f=i+l/e*s;d.x=t*Math.cos(f),d.y=t*Math.sin(f),r.push(d.x,d.y,d.z),o.push(0,0,1),u.x=(r[h]/t+1)/2,u.y=(r[h+1]/t+1)/2,c.push(u.x,u.y)}for(let l=1;l<=e;l++)a.push(l,l+1,0);this.setIndex(a),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(o,3)),this.setAttribute("uv",new _e(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Et extends un{constructor(t=1,e=1,i=1,s=32,a=1,r=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:c};const d=this;s=Math.floor(s),a=Math.floor(a);const u=[],l=[],h=[],f=[];let _=0;const g=[],p=i/2;let m=0;v(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(f,2));function v(){const y=new F,T=new F;let w=0;const A=(e-t)/i;for(let x=0;x<=a;x++){const S=[],I=x/a,C=I*(e-t)+t;for(let U=0;U<=s;U++){const L=U/s,k=L*c+o,B=Math.sin(k),V=Math.cos(k);T.x=C*B,T.y=-I*i+p,T.z=C*V,l.push(T.x,T.y,T.z),y.set(B,A,V).normalize(),h.push(y.x,y.y,y.z),f.push(L,1-I),S.push(_++)}g.push(S)}for(let x=0;x<s;x++)for(let S=0;S<a;S++){const I=g[S][x],C=g[S+1][x],U=g[S+1][x+1],L=g[S][x+1];(t>0||S!==0)&&(u.push(I,C,L),w+=3),(e>0||S!==a-1)&&(u.push(C,U,L),w+=3)}d.addGroup(m,w,0),m+=w}function M(y){const T=_,w=new Pt,A=new F;let x=0;const S=y===!0?t:e,I=y===!0?1:-1;for(let U=1;U<=s;U++)l.push(0,p*I,0),h.push(0,I,0),f.push(.5,.5),_++;const C=_;for(let U=0;U<=s;U++){const k=U/s*c+o,B=Math.cos(k),V=Math.sin(k);A.x=S*V,A.y=p*I,A.z=S*B,l.push(A.x,A.y,A.z),h.push(0,I,0),w.x=B*.5+.5,w.y=V*.5*I+.5,f.push(w.x,w.y),_++}for(let U=0;U<s;U++){const L=T+U,k=C+U;y===!0?u.push(k,k+1,L):u.push(k+1,k,L),x+=3}d.addGroup(m,x,y===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Et(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qa extends Et{constructor(t=1,e=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,e,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new Qa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rl extends un{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const a=[],r=[];o(s),d(i),u(),this.setAttribute("position",new _e(a,3)),this.setAttribute("normal",new _e(a.slice(),3)),this.setAttribute("uv",new _e(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new F,y=new F,T=new F;for(let w=0;w<e.length;w+=3)f(e[w+0],M),f(e[w+1],y),f(e[w+2],T),c(M,y,T,v)}function c(v,M,y,T){const w=T+1,A=[];for(let x=0;x<=w;x++){A[x]=[];const S=v.clone().lerp(y,x/w),I=M.clone().lerp(y,x/w),C=w-x;for(let U=0;U<=C;U++)U===0&&x===w?A[x][U]=S:A[x][U]=S.clone().lerp(I,U/C)}for(let x=0;x<w;x++)for(let S=0;S<2*(w-x)-1;S++){const I=Math.floor(S/2);S%2===0?(h(A[x][I+1]),h(A[x+1][I]),h(A[x][I])):(h(A[x][I+1]),h(A[x+1][I+1]),h(A[x+1][I]))}}function d(v){const M=new F;for(let y=0;y<a.length;y+=3)M.x=a[y+0],M.y=a[y+1],M.z=a[y+2],M.normalize().multiplyScalar(v),a[y+0]=M.x,a[y+1]=M.y,a[y+2]=M.z}function u(){const v=new F;for(let M=0;M<a.length;M+=3){v.x=a[M+0],v.y=a[M+1],v.z=a[M+2];const y=p(v)/2/Math.PI+.5,T=m(v)/Math.PI+.5;r.push(y,1-T)}_(),l()}function l(){for(let v=0;v<r.length;v+=6){const M=r[v+0],y=r[v+2],T=r[v+4],w=Math.max(M,y,T),A=Math.min(M,y,T);w>.9&&A<.1&&(M<.2&&(r[v+0]+=1),y<.2&&(r[v+2]+=1),T<.2&&(r[v+4]+=1))}}function h(v){a.push(v.x,v.y,v.z)}function f(v,M){const y=v*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function _(){const v=new F,M=new F,y=new F,T=new F,w=new Pt,A=new Pt,x=new Pt;for(let S=0,I=0;S<a.length;S+=9,I+=6){v.set(a[S+0],a[S+1],a[S+2]),M.set(a[S+3],a[S+4],a[S+5]),y.set(a[S+6],a[S+7],a[S+8]),w.set(r[I+0],r[I+1]),A.set(r[I+2],r[I+3]),x.set(r[I+4],r[I+5]),T.copy(v).add(M).add(y).divideScalar(3);const C=p(T);g(w,I+0,v,C),g(A,I+2,M,C),g(x,I+4,y,C)}}function g(v,M,y,T){T<0&&v.x===1&&(r[M]=v.x-1),y.x===0&&y.z===0&&(r[M]=T/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rl(t.vertices,t.indices,t.radius,t.detail)}}class Cl extends Rl{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Cl(t.radius,t.detail)}}class tr extends Rl{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new tr(t.radius,t.detail)}}class Vi extends un{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const a=t/2,r=e/2,o=Math.floor(i),c=Math.floor(s),d=o+1,u=c+1,l=t/o,h=e/c,f=[],_=[],g=[],p=[];for(let m=0;m<u;m++){const v=m*h-r;for(let M=0;M<d;M++){const y=M*l-a;_.push(y,-v,0),g.push(0,0,1),p.push(M/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){const M=v+d*m,y=v+d*(m+1),T=v+1+d*(m+1),w=v+1+d*m;f.push(M,y,w),f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new _e(_,3)),this.setAttribute("normal",new _e(g,3)),this.setAttribute("uv",new _e(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.width,t.height,t.widthSegments,t.heightSegments)}}class el extends un{constructor(t=.5,e=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],d=[],u=[];let l=t;const h=(e-t)/s,f=new F,_=new Pt;for(let g=0;g<=s;g++){for(let p=0;p<=i;p++){const m=a+p/i*r;f.x=l*Math.cos(m),f.y=l*Math.sin(m),c.push(f.x,f.y,f.z),d.push(0,0,1),_.x=(f.x/e+1)/2,_.y=(f.y/e+1)/2,u.push(_.x,_.y)}l+=h}for(let g=0;g<s;g++){const p=g*(i+1);for(let m=0;m<i;m++){const v=m+p,M=v,y=v+i+1,T=v+i+2,w=v+1;o.push(M,y,w),o.push(y,T,w)}}this.setIndex(o),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(d,3)),this.setAttribute("uv",new _e(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Tt extends un{constructor(t=1,e=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(r+o,Math.PI);let d=0;const u=[],l=new F,h=new F,f=[],_=[],g=[],p=[];for(let m=0;m<=i;m++){const v=[],M=m/i;let y=0;m===0&&r===0?y=.5/e:m===i&&c===Math.PI&&(y=-.5/e);for(let T=0;T<=e;T++){const w=T/e;l.x=-t*Math.cos(s+w*a)*Math.sin(r+M*o),l.y=t*Math.cos(r+M*o),l.z=t*Math.sin(s+w*a)*Math.sin(r+M*o),_.push(l.x,l.y,l.z),h.copy(l).normalize(),g.push(h.x,h.y,h.z),p.push(w+y,1-M),v.push(d++)}u.push(v)}for(let m=0;m<i;m++)for(let v=0;v<e;v++){const M=u[m][v+1],y=u[m][v],T=u[m+1][v],w=u[m+1][v+1];(m!==0||r>0)&&f.push(M,y,w),(m!==i-1||c<Math.PI)&&f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new _e(_,3)),this.setAttribute("normal",new _e(g,3)),this.setAttribute("uv",new _e(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ae extends un{constructor(t=1,e=.4,i=12,s=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const c=[],d=[],u=[],l=[],h=new F,f=new F,_=new F;for(let g=0;g<=i;g++){const p=r+g/i*o;for(let m=0;m<=s;m++){const v=m/s*a;f.x=(t+e*Math.cos(p))*Math.cos(v),f.y=(t+e*Math.cos(p))*Math.sin(v),f.z=e*Math.sin(p),d.push(f.x,f.y,f.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),_.subVectors(f,h).normalize(),u.push(_.x,_.y,_.z),l.push(m/s),l.push(g/i)}}for(let g=1;g<=i;g++)for(let p=1;p<=s;p++){const m=(s+1)*g+p-1,v=(s+1)*(g-1)+p-1,M=(s+1)*(g-1)+p,y=(s+1)*g+p;c.push(m,v,y),c.push(v,M,y)}this.setIndex(c),this.setAttribute("position",new _e(d,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ae(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function er(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?($t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Rn(n){const t={};for(let e=0;e<n.length;e++){const i=er(n[e]);for(const s in i)t[s]=i[s]}return t}function yx(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Wp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const nl={clone:er,merge:Rn};var Sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ex=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends lr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sx,this.fragmentShader=Ex,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=er(t.uniforms),this.uniformsGroups=yx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class wx extends An{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xp extends lr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Np,this.normalScale=new Pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bx extends lr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ng,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tx extends lr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class yu extends cn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Ax extends yu{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const mc=new Ge,jh=new F,Kh=new F;class Rx{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pt(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vu,this._frameExtents=new Pt(1,1),this._viewportCount=1,this._viewports=[new We(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;jh.setFromMatrixPosition(t.matrixWorld),e.position.copy(jh),Kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kh),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ur||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const wo=new F,bo=new Ls,Ti=new F;class qp extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(wo,bo,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,bo,Ti.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(wo,bo,Ti),Ti.x===1&&Ti.y===1&&Ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,bo,Ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ys=new F,Jh=new Pt,Qh=new Pt;class ri extends qp{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Td*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Td*2*Math.atan(Math.tan(Fo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ys.x,ys.y).multiplyScalar(-t/ys.z),ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ys.x,ys.y).multiplyScalar(-t/ys.z)}getViewSize(t,e){return this.getViewBounds(t,Jh,Qh),e.subVectors(Qh,Jh)}setViewOffset(t,e,i,s,a,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,d=r.fullHeight;a+=r.offsetX*s/c,e-=r.offsetY*i/d,s*=r.width/c,i*=r.height/d}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Pl extends qp{constructor(t=-1,e=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-t,r=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,r=a+d*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Cx extends Rx{constructor(){super(new Pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tf extends yu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new Cx}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Px extends yu{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ba=-90,Ta=1;class Dx extends cn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ri(ba,Ta,t,e);s.layers=this.layers,this.add(s);const a=new ri(ba,Ta,t,e);a.layers=this.layers,this.add(a);const r=new ri(ba,Ta,t,e);r.layers=this.layers,this.add(r);const o=new ri(ba,Ta,t,e);o.layers=this.layers,this.add(o);const c=new ri(ba,Ta,t,e);c.layers=this.layers,this.add(c);const d=new ri(ba,Ta,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,a,r,o,c]=e;for(const d of e)this.remove(d);if(t===Li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ur)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,d,u]=this.children,l=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(l,h,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ix extends ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Lx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Ux.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ux(){this._document.hidden===!1&&this.reset()}const ef=new Ge;class Yp{constructor(t,e,i=0,s=1/0){this.ray=new Al(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new gu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ef.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ef),this}intersectObject(t,e=!0,i=[]){return Ad(t,this,i,e),i.sort(nf),i}intersectObjects(t,e=!0,i=[]){for(let s=0,a=t.length;s<a;s++)Ad(t[s],this,i,e);return i.sort(nf),i}}function nf(n,t){return n.distance-t.distance}function Ad(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let r=0,o=a.length;r<o;r++)Ad(a[r],t,e,!0)}}class sf{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=de(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(de(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Nx extends la{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){$t("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function af(n,t,e,i){const s=Fx(i);switch(e){case Ip:return n*t;case Up:return n*t/s.components*s.byteLength;case uu:return n*t/s.components*s.byteLength;case Ka:return n*t*2/s.components*s.byteLength;case hu:return n*t*2/s.components*s.byteLength;case Lp:return n*t*3/s.components*s.byteLength;case Ei:return n*t*4/s.components*s.byteLength;case fu:return n*t*4/s.components*s.byteLength;case Io:case Lo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Uo:case No:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zc:case Kc:return Math.max(n,16)*Math.max(t,8)/4;case $c:case jc:return Math.max(n,8)*Math.max(t,8)/2;case Jc:case Qc:case ed:case nd:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case td:case id:case sd:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ad:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rd:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case od:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ld:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case cd:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case dd:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ud:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case hd:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fd:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pd:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case md:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case _d:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case gd:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case xd:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case vd:case Md:case yd:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Sd:case Ed:return Math.ceil(n/4)*Math.ceil(t/4)*8;case wd:case bd:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fx(n){switch(n){case Jn:case Rp:return{byteLength:1,components:1};case Ir:case Cp:case ti:return{byteLength:2,components:1};case cu:case du:return{byteLength:2,components:4};case Gi:case lu:case Ii:return{byteLength:4,components:1};case Pp:case Dp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ru}}));typeof window<"u"&&(window.__THREE__?$t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ru);function $p(){let n=null,t=!1,e=null,i=null;function s(a,r){e(a,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function Ox(n){const t=new WeakMap;function e(o,c){const d=o.array,u=o.usage,l=d.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,d,u),o.onUploadCallback();let f;if(d instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)f=n.HALF_FLOAT;else if(d instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)f=n.SHORT;else if(d instanceof Uint32Array)f=n.UNSIGNED_INT;else if(d instanceof Int32Array)f=n.INT;else if(d instanceof Int8Array)f=n.BYTE;else if(d instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:h,type:f,bytesPerElement:d.BYTES_PER_ELEMENT,version:o.version,size:l}}function i(o,c,d){const u=c.array,l=c.updateRanges;if(n.bindBuffer(d,o),l.length===0)n.bufferSubData(d,0,u);else{l.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<l.length;f++){const _=l[h],g=l[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,l[h]=g)}l.length=h+1;for(let f=0,_=l.length;f<_;f++){const g=l[f];n.bufferSubData(d,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const d=t.get(o);if(d===void 0)t.set(o,e(o,c));else if(d.version<o.version){if(d.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,o,c),d.version=o.version}}return{get:s,remove:a,update:r}}var Bx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zx=`#ifdef USE_ALPHAHASH
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
#endif`,Hx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wx=`#ifdef USE_AOMAP
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
#endif`,Xx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qx=`#ifdef USE_BATCHING
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
#endif`,Yx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$x=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kx=`#ifdef USE_IRIDESCENCE
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
#endif`,Jx=`#ifdef USE_BUMPMAP
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
#endif`,Qx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ev=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,av=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ov=`#define PI 3.141592653589793
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
} // validated`,lv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cv=`vec3 transformedNormal = objectNormal;
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
#endif`,dv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pv="gl_FragColor = linearToOutputTexel( gl_FragColor );",mv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_v=`#ifdef USE_ENVMAP
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
#endif`,gv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xv=`#ifdef USE_ENVMAP
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
#endif`,vv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mv=`#ifdef USE_ENVMAP
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
#endif`,yv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ev=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bv=`#ifdef USE_GRADIENTMAP
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
}`,Tv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Av=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cv=`uniform bool receiveShadow;
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
#endif`,Pv=`#ifdef USE_ENVMAP
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
#endif`,Dv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Iv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nv=`PhysicalMaterial material;
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
#endif`,Fv=`uniform sampler2D dfgLUT;
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
}`,Ov=`
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
#endif`,Bv=`#if defined( RE_IndirectDiffuse )
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
#endif`,zv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yv=`#if defined( USE_POINTS_UV )
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
#endif`,$v=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qv=`#ifdef USE_MORPHTARGETS
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
#endif`,tM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,iM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rM=`#ifdef USE_NORMALMAP
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
#endif`,oM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_M=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,SM=`float getShadowMask() {
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
}`,EM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wM=`#ifdef USE_SKINNING
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
#endif`,bM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TM=`#ifdef USE_SKINNING
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
#endif`,AM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,RM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,CM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,DM=`#ifdef USE_TRANSMISSION
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
#endif`,IM=`#ifdef USE_TRANSMISSION
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
#endif`,LM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,FM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const OM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,BM=`uniform sampler2D t2D;
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
}`,zM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VM=`#include <common>
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
}`,WM=`#if DEPTH_PACKING == 3200
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
}`,XM=`#define DISTANCE
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
}`,qM=`#define DISTANCE
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
}`,YM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$M=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZM=`uniform float scale;
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
}`,jM=`uniform vec3 diffuse;
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
}`,KM=`#include <common>
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
}`,JM=`uniform vec3 diffuse;
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
}`,QM=`#define LAMBERT
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
}`,ty=`#define LAMBERT
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
}`,ey=`#define MATCAP
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
}`,ny=`#define MATCAP
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
}`,iy=`#define NORMAL
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
}`,sy=`#define NORMAL
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
}`,ay=`#define PHONG
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
}`,ry=`#define PHONG
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
}`,oy=`#define STANDARD
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
}`,ly=`#define STANDARD
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
}`,cy=`#define TOON
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
}`,dy=`#define TOON
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
}`,uy=`uniform float size;
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
}`,hy=`uniform vec3 diffuse;
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
}`,fy=`#include <common>
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
}`,py=`uniform vec3 color;
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
}`,my=`uniform float rotation;
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
}`,_y=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:Bx,alphahash_pars_fragment:zx,alphamap_fragment:Hx,alphamap_pars_fragment:Gx,alphatest_fragment:kx,alphatest_pars_fragment:Vx,aomap_fragment:Wx,aomap_pars_fragment:Xx,batching_pars_vertex:qx,batching_vertex:Yx,begin_vertex:$x,beginnormal_vertex:Zx,bsdfs:jx,iridescence_fragment:Kx,bumpmap_pars_fragment:Jx,clipping_planes_fragment:Qx,clipping_planes_pars_fragment:tv,clipping_planes_pars_vertex:ev,clipping_planes_vertex:nv,color_fragment:iv,color_pars_fragment:sv,color_pars_vertex:av,color_vertex:rv,common:ov,cube_uv_reflection_fragment:lv,defaultnormal_vertex:cv,displacementmap_pars_vertex:dv,displacementmap_vertex:uv,emissivemap_fragment:hv,emissivemap_pars_fragment:fv,colorspace_fragment:pv,colorspace_pars_fragment:mv,envmap_fragment:_v,envmap_common_pars_fragment:gv,envmap_pars_fragment:xv,envmap_pars_vertex:vv,envmap_physical_pars_fragment:Pv,envmap_vertex:Mv,fog_vertex:yv,fog_pars_vertex:Sv,fog_fragment:Ev,fog_pars_fragment:wv,gradientmap_pars_fragment:bv,lightmap_pars_fragment:Tv,lights_lambert_fragment:Av,lights_lambert_pars_fragment:Rv,lights_pars_begin:Cv,lights_toon_fragment:Dv,lights_toon_pars_fragment:Iv,lights_phong_fragment:Lv,lights_phong_pars_fragment:Uv,lights_physical_fragment:Nv,lights_physical_pars_fragment:Fv,lights_fragment_begin:Ov,lights_fragment_maps:Bv,lights_fragment_end:zv,logdepthbuf_fragment:Hv,logdepthbuf_pars_fragment:Gv,logdepthbuf_pars_vertex:kv,logdepthbuf_vertex:Vv,map_fragment:Wv,map_pars_fragment:Xv,map_particle_fragment:qv,map_particle_pars_fragment:Yv,metalnessmap_fragment:$v,metalnessmap_pars_fragment:Zv,morphinstance_vertex:jv,morphcolor_vertex:Kv,morphnormal_vertex:Jv,morphtarget_pars_vertex:Qv,morphtarget_vertex:tM,normal_fragment_begin:eM,normal_fragment_maps:nM,normal_pars_fragment:iM,normal_pars_vertex:sM,normal_vertex:aM,normalmap_pars_fragment:rM,clearcoat_normal_fragment_begin:oM,clearcoat_normal_fragment_maps:lM,clearcoat_pars_fragment:cM,iridescence_pars_fragment:dM,opaque_fragment:uM,packing:hM,premultiplied_alpha_fragment:fM,project_vertex:pM,dithering_fragment:mM,dithering_pars_fragment:_M,roughnessmap_fragment:gM,roughnessmap_pars_fragment:xM,shadowmap_pars_fragment:vM,shadowmap_pars_vertex:MM,shadowmap_vertex:yM,shadowmask_pars_fragment:SM,skinbase_vertex:EM,skinning_pars_vertex:wM,skinning_vertex:bM,skinnormal_vertex:TM,specularmap_fragment:AM,specularmap_pars_fragment:RM,tonemapping_fragment:CM,tonemapping_pars_fragment:PM,transmission_fragment:DM,transmission_pars_fragment:IM,uv_pars_fragment:LM,uv_pars_vertex:UM,uv_vertex:NM,worldpos_vertex:FM,background_vert:OM,background_frag:BM,backgroundCube_vert:zM,backgroundCube_frag:HM,cube_vert:GM,cube_frag:kM,depth_vert:VM,depth_frag:WM,distance_vert:XM,distance_frag:qM,equirect_vert:YM,equirect_frag:$M,linedashed_vert:ZM,linedashed_frag:jM,meshbasic_vert:KM,meshbasic_frag:JM,meshlambert_vert:QM,meshlambert_frag:ty,meshmatcap_vert:ey,meshmatcap_frag:ny,meshnormal_vert:iy,meshnormal_frag:sy,meshphong_vert:ay,meshphong_frag:ry,meshphysical_vert:oy,meshphysical_frag:ly,meshtoon_vert:cy,meshtoon_frag:dy,points_vert:uy,points_frag:hy,shadow_vert:fy,shadow_frag:py,sprite_vert:my,sprite_frag:_y},xt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},Ci={basic:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ht(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:Rn([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:Rn([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:Rn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:Rn([xt.points,xt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:Rn([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:Rn([xt.common,xt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:Rn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:Rn([xt.sprite,xt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:Rn([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:Rn([xt.lights,xt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Ci.physical={uniforms:Rn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const To={r:0,b:0,g:0},Xs=new ki,gy=new Ge;function xy(n,t,e,i,s,a){const r=new Ht(0);let o=s===!0?0:1,c,d,u=null,l=0,h=null;function f(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const y=v.backgroundBlurriness>0;M=t.get(M,y)}return M}function _(v){let M=!1;const y=f(v);y===null?p(r,o):y&&y.isColor&&(p(y,1),M=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(v,M){const y=f(M);y&&(y.isCubeTexture||y.mapping===bl)?(d===void 0&&(d=new b(new q(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:er(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),Xs.copy(M.backgroundRotation),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(gy.makeRotationFromEuler(Xs)),d.material.toneMapped=pe.getTransfer(y.colorSpace)!==Se,(u!==y||l!==y.version||h!==n.toneMapping)&&(d.material.needsUpdate=!0,u=y,l=y.version,h=n.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new b(new Vi(2,2),new An({name:"BackgroundMaterial",uniforms:er(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Is,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=pe.getTransfer(y.colorSpace)!==Se,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||l!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,l=y.version,h=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,M){v.getRGB(To,Wp(n)),e.buffers.color.setClear(To.r,To.g,To.b,M,a)}function m(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,M=1){r.set(v),o=M,p(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(r,o)},render:_,addToRenderList:g,dispose:m}}function vy(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let a=s,r=!1;function o(C,U,L,k,B){let V=!1;const H=l(C,k,L,U);a!==H&&(a=H,d(a.object)),V=f(C,k,L,B),V&&_(C,k,L,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(C,U,L,k),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return n.createVertexArray()}function d(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function l(C,U,L,k){const B=k.wireframe===!0;let V=i[U.id];V===void 0&&(V={},i[U.id]=V);const H=C.isInstancedMesh===!0?C.id:0;let et=V[H];et===void 0&&(et={},V[H]=et);let tt=et[L.id];tt===void 0&&(tt={},et[L.id]=tt);let ht=tt[B];return ht===void 0&&(ht=h(c()),tt[B]=ht),ht}function h(C){const U=[],L=[],k=[];for(let B=0;B<e;B++)U[B]=0,L[B]=0,k[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:L,attributeDivisors:k,object:C,attributes:{},index:null}}function f(C,U,L,k){const B=a.attributes,V=U.attributes;let H=0;const et=L.getAttributes();for(const tt in et)if(et[tt].location>=0){const lt=B[tt];let ct=V[tt];if(ct===void 0&&(tt==="instanceMatrix"&&C.instanceMatrix&&(ct=C.instanceMatrix),tt==="instanceColor"&&C.instanceColor&&(ct=C.instanceColor)),lt===void 0||lt.attribute!==ct||ct&&lt.data!==ct.data)return!0;H++}return a.attributesNum!==H||a.index!==k}function _(C,U,L,k){const B={},V=U.attributes;let H=0;const et=L.getAttributes();for(const tt in et)if(et[tt].location>=0){let lt=V[tt];lt===void 0&&(tt==="instanceMatrix"&&C.instanceMatrix&&(lt=C.instanceMatrix),tt==="instanceColor"&&C.instanceColor&&(lt=C.instanceColor));const ct={};ct.attribute=lt,lt&&lt.data&&(ct.data=lt.data),B[tt]=ct,H++}a.attributes=B,a.attributesNum=H,a.index=k}function g(){const C=a.newAttributes;for(let U=0,L=C.length;U<L;U++)C[U]=0}function p(C){m(C,0)}function m(C,U){const L=a.newAttributes,k=a.enabledAttributes,B=a.attributeDivisors;L[C]=1,k[C]===0&&(n.enableVertexAttribArray(C),k[C]=1),B[C]!==U&&(n.vertexAttribDivisor(C,U),B[C]=U)}function v(){const C=a.newAttributes,U=a.enabledAttributes;for(let L=0,k=U.length;L<k;L++)U[L]!==C[L]&&(n.disableVertexAttribArray(L),U[L]=0)}function M(C,U,L,k,B,V,H){H===!0?n.vertexAttribIPointer(C,U,L,B,V):n.vertexAttribPointer(C,U,L,k,B,V)}function y(C,U,L,k){g();const B=k.attributes,V=L.getAttributes(),H=U.defaultAttributeValues;for(const et in V){const tt=V[et];if(tt.location>=0){let ht=B[et];if(ht===void 0&&(et==="instanceMatrix"&&C.instanceMatrix&&(ht=C.instanceMatrix),et==="instanceColor"&&C.instanceColor&&(ht=C.instanceColor)),ht!==void 0){const lt=ht.normalized,ct=ht.itemSize,Wt=t.get(ht);if(Wt===void 0)continue;const be=Wt.buffer,Fe=Wt.type,Q=Wt.bytesPerElement,ft=Fe===n.INT||Fe===n.UNSIGNED_INT||ht.gpuType===lu;if(ht.isInterleavedBufferAttribute){const gt=ht.data,te=gt.stride,Xt=ht.offset;if(gt.isInstancedInterleavedBuffer){for(let Zt=0;Zt<tt.locationSize;Zt++)m(tt.location+Zt,gt.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let Zt=0;Zt<tt.locationSize;Zt++)p(tt.location+Zt);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Zt=0;Zt<tt.locationSize;Zt++)M(tt.location+Zt,ct/tt.locationSize,Fe,lt,te*Q,(Xt+ct/tt.locationSize*Zt)*Q,ft)}else{if(ht.isInstancedBufferAttribute){for(let gt=0;gt<tt.locationSize;gt++)m(tt.location+gt,ht.meshPerAttribute);C.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let gt=0;gt<tt.locationSize;gt++)p(tt.location+gt);n.bindBuffer(n.ARRAY_BUFFER,be);for(let gt=0;gt<tt.locationSize;gt++)M(tt.location+gt,ct/tt.locationSize,Fe,lt,ct*Q,ct/tt.locationSize*gt*Q,ft)}}else if(H!==void 0){const lt=H[et];if(lt!==void 0)switch(lt.length){case 2:n.vertexAttrib2fv(tt.location,lt);break;case 3:n.vertexAttrib3fv(tt.location,lt);break;case 4:n.vertexAttrib4fv(tt.location,lt);break;default:n.vertexAttrib1fv(tt.location,lt)}}}}v()}function T(){S();for(const C in i){const U=i[C];for(const L in U){const k=U[L];for(const B in k){const V=k[B];for(const H in V)u(V[H].object),delete V[H];delete k[B]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;const U=i[C.id];for(const L in U){const k=U[L];for(const B in k){const V=k[B];for(const H in V)u(V[H].object),delete V[H];delete k[B]}}delete i[C.id]}function A(C){for(const U in i){const L=i[U];for(const k in L){const B=L[k];if(B[C.id]===void 0)continue;const V=B[C.id];for(const H in V)u(V[H].object),delete V[H];delete B[C.id]}}}function x(C){for(const U in i){const L=i[U],k=C.isInstancedMesh===!0?C.id:0,B=L[k];if(B!==void 0){for(const V in B){const H=B[V];for(const et in H)u(H[et].object),delete H[et];delete B[V]}delete L[k],Object.keys(L).length===0&&delete i[U]}}}function S(){I(),r=!0,a!==s&&(a=s,d(a.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:p,disableUnusedAttributes:v}}function My(n,t,e){let i;function s(d){i=d}function a(d,u){n.drawArrays(i,d,u),e.update(u,i,1)}function r(d,u,l){l!==0&&(n.drawArraysInstanced(i,d,u,l),e.update(u,i,l))}function o(d,u,l){if(l===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,u,0,l);let f=0;for(let _=0;_<l;_++)f+=u[_];e.update(f,i,1)}function c(d,u,l,h){if(l===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<d.length;_++)r(d[_],u[_],h[_]);else{f.multiDrawArraysInstancedWEBGL(i,d,0,u,0,h,0,l);let _=0;for(let g=0;g<l;g++)_+=u[g]*h[g];e.update(_,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function yy(n,t,e,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(A){return!(A!==Ei&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const x=A===ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Jn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ii&&!x)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=e.precision!==void 0?e.precision:"highp";const u=c(d);u!==d&&($t("WebGLRenderer:",d,"not supported, using",u,"instead."),d=u);const l=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:d,logarithmicDepthBuffer:l,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,maxSamples:T,samples:w}}function Sy(n){const t=this;let e=null,i=0,s=!1,a=!1;const r=new Ri,o=new ee,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(l,h){const f=l.length!==0||h||i!==0||s;return s=h,i=l.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(l,h){e=u(l,h,0)},this.setState=function(l,h,f){const _=l.clippingPlanes,g=l.clipIntersection,p=l.clipShadows,m=n.get(l);if(!s||_===null||_.length===0||a&&!p)a?u(null):d();else{const v=a?0:i,M=v*4;let y=m.clippingState||null;c.value=y,y=u(_,h,M,f);for(let T=0;T!==M;++T)y[T]=e[T];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function d(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(l,h,f,_){const g=l!==null?l.length:0;let p=null;if(g!==0){if(p=c.value,_!==!0||p===null){const m=f+g*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,y=f;M!==g;++M,y+=4)r.copy(l[M]).applyMatrix4(v,o),r.normal.toArray(p,y),p[y+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}const Cs=4,rf=[.125,.215,.35,.446,.526,.582],Zs=20,Ey=256,gr=new Pl,of=new Ht;let _c=null,gc=0,xc=0,vc=!1;const wy=new F;class lf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,a={}){const{size:r=256,position:o=wy}=a;_c=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(_c,gc,xc),this._renderer.xr.enabled=vc,t.scissorTest=!1,Aa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===oa||t.mapping===ja?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_c=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:ti,format:Ei,colorSpace:Ja,depthBuffer:!1},s=cf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cf(t,e,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=by(a)),this._blurMaterial=Ay(a,t,e),this._ggxMaterial=Ty(a,t,e)}return s}_compileMaterial(t){const e=new b(new un,t);this._renderer.compile(e,gr)}_sceneToCubeUV(t,e,i,s,a){const c=new ri(90,1,e,i),d=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,f=l.toneMapping;l.getClearColor(of),l.toneMapping=Oi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(s),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new b(new q,new Nn({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,p=g.material;let m=!1;const v=t.background;v?v.isColor&&(p.color.copy(v),t.background=null,m=!0):(p.color.copy(of),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(c.up.set(0,d[M],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[M],a.y,a.z)):y===1?(c.up.set(0,0,d[M]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[M],a.z)):(c.up.set(0,d[M],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[M]));const T=this._cubeSize;Aa(s,y*T,M>2?T:0,T,T),l.setRenderTarget(s),m&&l.render(g,c),l.render(t,c)}l.toneMapping=f,l.autoClear=h,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===oa||t.mapping===ja;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=uf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=df());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=t;const c=this._cubeSize;Aa(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(r,gr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const c=r.uniforms,d=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),l=Math.sqrt(d*d-u*u),h=0+d*1.25,f=l*h,{_lodMax:_}=this,g=this._sizeLods[i],p=3*g*(i>_-Cs?i-_+Cs:0),m=4*(this._cubeSize-g);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=_-e,Aa(a,p,m,3*g,2*g),s.setRenderTarget(a),s.render(o,gr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=_-i,Aa(t,p,m,3*g,2*g),s.setRenderTarget(t),s.render(o,gr)}_blur(t,e,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,e,i,s,a,r,o){const c=this._renderer,d=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const u=3,l=this._lodMeshes[s];l.material=d;const h=d.uniforms,f=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*Zs-1),g=a/_,p=isFinite(a)?1+Math.floor(u*g):Zs;p>Zs&&$t(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zs}`);const m=[];let v=0;for(let A=0;A<Zs;++A){const x=A/g,S=Math.exp(-x*x/2);m.push(S),A===0?v+=S:A<p&&(v+=2*S)}for(let A=0;A<m.length;A++)m[A]=m[A]/v;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:M}=this;h.dTheta.value=_,h.mipInt.value=M-i;const y=this._sizeLods[s],T=3*y*(s>M-Cs?s-M+Cs:0),w=4*(this._cubeSize-y);Aa(e,T,w,3*y,2*y),c.setRenderTarget(e),c.render(l,gr)}}function by(n){const t=[],e=[],i=[];let s=n;const a=n-Cs+1+rf.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let c=1/o;r>n-Cs?c=rf[r-n+Cs-1]:r===0&&(c=0),e.push(c);const d=1/(o-2),u=-d,l=1+d,h=[u,u,l,u,l,l,u,u,l,l,u,l],f=6,_=6,g=3,p=2,m=1,v=new Float32Array(g*_*f),M=new Float32Array(p*_*f),y=new Float32Array(m*_*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,x=w>2?0:-1,S=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];v.set(S,g*_*w),M.set(h,p*_*w);const I=[w,w,w,w,w,w];y.set(I,m*_*w)}const T=new un;T.setAttribute("position",new Bi(v,g)),T.setAttribute("uv",new Bi(M,p)),T.setAttribute("faceIndex",new Bi(y,m)),i.push(new b(T,null)),s>Cs&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function cf(n,t,e){const i=new Wn(n,t,e);return i.texture.mapping=bl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Aa(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Ty(n,t,e){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ey,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Ay(n,t,e){const i=new Float32Array(Zs),s=new F(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function df(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function uf(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Dl(){return`

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
	`}class Zp extends Wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new q(5,5,5),a=new An({name:"CubemapFromEquirect",uniforms:er(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Vn,blending:Fi});a.uniforms.tEquirect.value=e;const r=new b(s,a),o=e.minFilter;return e.minFilter===Ks&&(e.minFilter=Tn),new Dx(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(a)}}function Ry(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,f=!1){return h==null?null:f?r(h):a(h)}function a(h){if(h&&h.isTexture){const f=h.mapping;if(f===kl||f===Vl)if(t.has(h)){const _=t.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const g=new Zp(_.height);return g.fromEquirectangularTexture(n,h),t.set(h,g),h.addEventListener("dispose",d),o(g.texture,h.mapping)}else return null}}return h}function r(h){if(h&&h.isTexture){const f=h.mapping,_=f===kl||f===Vl,g=f===oa||f===ja;if(_||g){let p=e.get(h);const m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new lf(n)),p=_?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{const v=h.image;return _&&v&&v.height>0||g&&v&&c(v)?(i===null&&(i=new lf(n)),p=_?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,f){return f===kl?h.mapping=oa:f===Vl&&(h.mapping=ja),h}function c(h){let f=0;const _=6;for(let g=0;g<_;g++)h[g]!==void 0&&f++;return f===_}function d(h){const f=h.target;f.removeEventListener("dispose",d);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function l(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:l}}function Cy(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Jo("WebGLRenderer: "+i+" extension not supported."),s}}}function Py(n,t,e,i){const s={},a=new WeakMap;function r(l){const h=l.target;h.index!==null&&t.remove(h.index);for(const _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",r),delete s[h.id];const f=a.get(h);f&&(t.remove(f),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(l,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,e.memory.geometries++),h}function c(l){const h=l.attributes;for(const f in h)t.update(h[f],n.ARRAY_BUFFER)}function d(l){const h=[],f=l.index,_=l.attributes.position;let g=0;if(_===void 0)return;if(f!==null){const v=f.array;g=f.version;for(let M=0,y=v.length;M<y;M+=3){const T=v[M+0],w=v[M+1],A=v[M+2];h.push(T,w,w,A,A,T)}}else{const v=_.array;g=_.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const T=M+0,w=M+1,A=M+2;h.push(T,w,w,A,A,T)}}const p=new(_.count>=65535?Hp:zp)(h,1);p.version=g;const m=a.get(l);m&&t.remove(m),a.set(l,p)}function u(l){const h=a.get(l);if(h){const f=l.index;f!==null&&h.version<f.version&&d(l)}else d(l);return a.get(l)}return{get:o,update:c,getWireframeAttribute:u}}function Dy(n,t,e){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function c(h,f){n.drawElements(i,f,a,h*r),e.update(f,i,1)}function d(h,f,_){_!==0&&(n.drawElementsInstanced(i,f,a,h*r,_),e.update(f,i,_))}function u(h,f,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,h,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];e.update(p,i,1)}function l(h,f,_,g){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)d(h[m]/r,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,a,h,0,g,0,_);let m=0;for(let v=0;v<_;v++)m+=f[v]*g[v];e.update(m,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=d,this.renderMultiDraw=u,this.renderMultiDrawInstances=l}function Iy(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=o*(a/3);break;case n.LINES:e.lines+=o*(a/2);break;case n.LINE_STRIP:e.lines+=o*(a-1);break;case n.LINE_LOOP:e.lines+=o*a;break;case n.POINTS:e.points+=o*a;break;default:fe("WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Ly(n,t,e){const i=new WeakMap,s=new We;function a(r,o,c){const d=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==l){let I=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",I)};var f=I;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let T=o.attributes.position.count*y,w=1;T>t.maxTextureSize&&(w=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const A=new Float32Array(T*w*4*l),x=new Op(A,T,w,l);x.type=Ii,x.needsUpdate=!0;const S=y*4;for(let C=0;C<l;C++){const U=m[C],L=v[C],k=M[C],B=T*w*4*C;for(let V=0;V<U.count;V++){const H=V*S;_===!0&&(s.fromBufferAttribute(U,V),A[B+H+0]=s.x,A[B+H+1]=s.y,A[B+H+2]=s.z,A[B+H+3]=0),g===!0&&(s.fromBufferAttribute(L,V),A[B+H+4]=s.x,A[B+H+5]=s.y,A[B+H+6]=s.z,A[B+H+7]=0),p===!0&&(s.fromBufferAttribute(k,V),A[B+H+8]=s.x,A[B+H+9]=s.y,A[B+H+10]=s.z,A[B+H+11]=k.itemSize===4?s.w:1)}}h={count:l,texture:x,size:new Pt(T,w)},i.set(o,h),o.addEventListener("dispose",I)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let _=0;for(let p=0;p<d.length;p++)_+=d[p];const g=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",d)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Uy(n,t,e,i,s){let a=new WeakMap;function r(d){const u=s.render.frame,l=d.geometry,h=t.get(d,l);if(a.get(h)!==u&&(t.update(h),a.set(h,u)),d.isInstancedMesh&&(d.hasEventListener("dispose",c)===!1&&d.addEventListener("dispose",c),a.get(d)!==u&&(e.update(d.instanceMatrix,n.ARRAY_BUFFER),d.instanceColor!==null&&e.update(d.instanceColor,n.ARRAY_BUFFER),a.set(d,u))),d.isSkinnedMesh){const f=d.skeleton;a.get(f)!==u&&(f.update(),a.set(f,u))}return h}function o(){a=new WeakMap}function c(d){const u=d.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:r,dispose:o}}const Ny={[yp]:"LINEAR_TONE_MAPPING",[Sp]:"REINHARD_TONE_MAPPING",[Ep]:"CINEON_TONE_MAPPING",[ou]:"ACES_FILMIC_TONE_MAPPING",[bp]:"AGX_TONE_MAPPING",[Tp]:"NEUTRAL_TONE_MAPPING",[wp]:"CUSTOM_TONE_MAPPING"};function Fy(n,t,e,i,s){const a=new Wn(t,e,{type:n,depthBuffer:i,stencilBuffer:s}),r=new Wn(t,e,{type:ti,depthBuffer:!1,stencilBuffer:!1}),o=new un;o.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new _e([0,2,0,0,2,0],2));const c=new wx({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new b(o,c),u=new Pl(-1,1,1,-1,0,1);let l=null,h=null,f=!1,_,g=null,p=[],m=!1;this.setSize=function(v,M){a.setSize(v,M),r.setSize(v,M);for(let y=0;y<p.length;y++){const T=p[y];T.setSize&&T.setSize(v,M)}},this.setEffects=function(v){p=v,m=p.length>0&&p[0].isRenderPass===!0;const M=a.width,y=a.height;for(let T=0;T<p.length;T++){const w=p[T];w.setSize&&w.setSize(M,y)}},this.begin=function(v,M){if(f||v.toneMapping===Oi&&p.length===0)return!1;if(g=M,M!==null){const y=M.width,T=M.height;(a.width!==y||a.height!==T)&&this.setSize(y,T)}return m===!1&&v.setRenderTarget(a),_=v.toneMapping,v.toneMapping=Oi,!0},this.hasRenderPass=function(){return m},this.end=function(v,M){v.toneMapping=_,f=!0;let y=a,T=r;for(let w=0;w<p.length;w++){const A=p[w];if(A.enabled!==!1&&(A.render(v,T,y,M),A.needsSwap!==!1)){const x=y;y=T,T=x}}if(l!==v.outputColorSpace||h!==v.toneMapping){l=v.outputColorSpace,h=v.toneMapping,c.defines={},pe.getTransfer(l)===Se&&(c.defines.SRGB_TRANSFER="");const w=Ny[h];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(g),v.render(d,u),g=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),r.dispose(),o.dispose(),c.dispose()}}const jp=new Un,Rd=new Nr(1,1),Kp=new Op,Jp=new tx,Qp=new kp,hf=[],ff=[],pf=new Float32Array(16),mf=new Float32Array(9),_f=new Float32Array(4);function cr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let a=hf[s];if(a===void 0&&(a=new Float32Array(s),hf[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=e,n[r].toArray(a,o)}return a}function en(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function nn(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Il(n,t){let e=ff[t];e===void 0&&(e=new Int32Array(t),ff[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Oy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function By(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2fv(this.addr,t),nn(e,t)}}function zy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(en(e,t))return;n.uniform3fv(this.addr,t),nn(e,t)}}function Hy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4fv(this.addr,t),nn(e,t)}}function Gy(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;_f.set(i),n.uniformMatrix2fv(this.addr,!1,_f),nn(e,i)}}function ky(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;mf.set(i),n.uniformMatrix3fv(this.addr,!1,mf),nn(e,i)}}function Vy(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;pf.set(i),n.uniformMatrix4fv(this.addr,!1,pf),nn(e,i)}}function Wy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Xy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2iv(this.addr,t),nn(e,t)}}function qy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;n.uniform3iv(this.addr,t),nn(e,t)}}function Yy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4iv(this.addr,t),nn(e,t)}}function $y(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Zy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2uiv(this.addr,t),nn(e,t)}}function jy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;n.uniform3uiv(this.addr,t),nn(e,t)}}function Ky(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4uiv(this.addr,t),nn(e,t)}}function Jy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(Rd.compareFunction=e.isReversedDepthBuffer()?mu:pu,a=Rd):a=jp,e.setTexture2D(t||a,s)}function Qy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Jp,s)}function tS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Qp,s)}function eS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Kp,s)}function nS(n){switch(n){case 5126:return Oy;case 35664:return By;case 35665:return zy;case 35666:return Hy;case 35674:return Gy;case 35675:return ky;case 35676:return Vy;case 5124:case 35670:return Wy;case 35667:case 35671:return Xy;case 35668:case 35672:return qy;case 35669:case 35673:return Yy;case 5125:return $y;case 36294:return Zy;case 36295:return jy;case 36296:return Ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Jy;case 35679:case 36299:case 36307:return Qy;case 35680:case 36300:case 36308:case 36293:return tS;case 36289:case 36303:case 36311:case 36292:return eS}}function iS(n,t){n.uniform1fv(this.addr,t)}function sS(n,t){const e=cr(t,this.size,2);n.uniform2fv(this.addr,e)}function aS(n,t){const e=cr(t,this.size,3);n.uniform3fv(this.addr,e)}function rS(n,t){const e=cr(t,this.size,4);n.uniform4fv(this.addr,e)}function oS(n,t){const e=cr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function lS(n,t){const e=cr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function cS(n,t){const e=cr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function dS(n,t){n.uniform1iv(this.addr,t)}function uS(n,t){n.uniform2iv(this.addr,t)}function hS(n,t){n.uniform3iv(this.addr,t)}function fS(n,t){n.uniform4iv(this.addr,t)}function pS(n,t){n.uniform1uiv(this.addr,t)}function mS(n,t){n.uniform2uiv(this.addr,t)}function _S(n,t){n.uniform3uiv(this.addr,t)}function gS(n,t){n.uniform4uiv(this.addr,t)}function xS(n,t,e){const i=this.cache,s=t.length,a=Il(e,s);en(i,a)||(n.uniform1iv(this.addr,a),nn(i,a));let r;this.type===n.SAMPLER_2D_SHADOW?r=Rd:r=jp;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||r,a[o])}function vS(n,t,e){const i=this.cache,s=t.length,a=Il(e,s);en(i,a)||(n.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||Jp,a[r])}function MS(n,t,e){const i=this.cache,s=t.length,a=Il(e,s);en(i,a)||(n.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Qp,a[r])}function yS(n,t,e){const i=this.cache,s=t.length,a=Il(e,s);en(i,a)||(n.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||Kp,a[r])}function SS(n){switch(n){case 5126:return iS;case 35664:return sS;case 35665:return aS;case 35666:return rS;case 35674:return oS;case 35675:return lS;case 35676:return cS;case 5124:case 35670:return dS;case 35667:case 35671:return uS;case 35668:case 35672:return hS;case 35669:case 35673:return fS;case 5125:return pS;case 36294:return mS;case 36295:return _S;case 36296:return gS;case 35678:case 36198:case 36298:case 36306:case 35682:return xS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return MS;case 36289:case 36303:case 36311:case 36292:return yS}}class ES{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=nS(e.type)}}class wS{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=SS(e.type)}}class bS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(t,e[o.id],i)}}}const Mc=/(\w+)(\])?(\[|\.)?/g;function gf(n,t){n.seq.push(t),n.map[t.id]=t}function TS(n,t,e){const i=n.name,s=i.length;for(Mc.lastIndex=0;;){const a=Mc.exec(i),r=Mc.lastIndex;let o=a[1];const c=a[2]==="]",d=a[3];if(c&&(o=o|0),d===void 0||d==="["&&r+2===s){gf(e,d===void 0?new ES(o,n,t):new wS(o,n,t));break}else{let l=e.map[o];l===void 0&&(l=new bS(o),gf(e,l)),e=l}}}class Oo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(e,r),c=t.getUniformLocation(e,o.name);TS(o,c,this)}const s=[],a=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,e,i,s){const a=this.map[e];a!==void 0&&a.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let a=0,r=e.length;a!==r;++a){const o=e[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,a=t.length;s!==a;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function xf(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const AS=37297;let RS=0;function CS(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return i.join(`
`)}const vf=new ee;function PS(n){pe._getMatrix(vf,pe.workingColorSpace,n);const t=`mat3( ${vf.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(n)){case jo:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return $t("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Mf(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),a=(n.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+CS(n.getShaderSource(t),o)}else return a}function DS(n,t){const e=PS(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const IS={[yp]:"Linear",[Sp]:"Reinhard",[Ep]:"Cineon",[ou]:"ACESFilmic",[bp]:"AgX",[Tp]:"Neutral",[wp]:"Custom"};function LS(n,t){const e=IS[t];return e===void 0?($t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ao=new F;function US(){pe.getLuminanceCoefficients(Ao);const n=Ao.x.toFixed(4),t=Ao.y.toFixed(4),e=Ao.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function FS(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function OS(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(t,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),e[r]={type:a.type,location:n.getAttribLocation(t,r),locationSize:o}}return e}function yr(n){return n!==""}function yf(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const BS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cd(n){return n.replace(BS,HS)}const zS=new Map;function HS(n,t){let e=se[t];if(e===void 0){const i=zS.get(t);if(i!==void 0)e=se[i],$t('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Cd(e)}const GS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ef(n){return n.replace(GS,kS)}function kS(n,t,e,i){let s="";for(let a=parseInt(t);a<parseInt(e);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function wf(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}const VS={[Do]:"SHADOWMAP_TYPE_PCF",[Mr]:"SHADOWMAP_TYPE_VSM"};function WS(n){return VS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const XS={[oa]:"ENVMAP_TYPE_CUBE",[ja]:"ENVMAP_TYPE_CUBE",[bl]:"ENVMAP_TYPE_CUBE_UV"};function qS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":XS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const YS={[ja]:"ENVMAP_MODE_REFRACTION"};function $S(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":YS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ZS={[Mp]:"ENVMAP_BLENDING_MULTIPLY",[Ig]:"ENVMAP_BLENDING_MIX",[Lg]:"ENVMAP_BLENDING_ADD"};function jS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ZS[n.combine]||"ENVMAP_BLENDING_NONE"}function KS(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function JS(n,t,e,i){const s=n.getContext(),a=e.defines;let r=e.vertexShader,o=e.fragmentShader;const c=WS(e),d=qS(e),u=$S(e),l=jS(e),h=KS(e),f=NS(e),_=FS(a),g=s.createProgram();let p,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(yr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(yr).join(`
`),m.length>0&&(m+=`
`)):(p=[wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),m=[wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",e.envMap?"#define "+l:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?se.tonemapping_pars_fragment:"",e.toneMapping!==Oi?LS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,DS("linearToOutputTexel",e.outputColorSpace),US(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(yr).join(`
`)),r=Cd(r),r=yf(r,e),r=Sf(r,e),o=Cd(o),o=yf(o,e),o=Sf(o,e),r=Ef(r),o=Ef(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Ch?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ch?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=v+p+r,y=v+m+o,T=xf(s,s.VERTEX_SHADER,M),w=xf(s,s.FRAGMENT_SHADER,y);s.attachShader(g,T),s.attachShader(g,w),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(C){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(g)||"",L=s.getShaderInfoLog(T)||"",k=s.getShaderInfoLog(w)||"",B=U.trim(),V=L.trim(),H=k.trim();let et=!0,tt=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,T,w);else{const ht=Mf(s,T,"vertex"),lt=Mf(s,w,"fragment");fe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ht+`
`+lt)}else B!==""?$t("WebGLProgram: Program Info Log:",B):(V===""||H==="")&&(tt=!1);tt&&(C.diagnostics={runnable:et,programLog:B,vertexShader:{log:V,prefix:p},fragmentShader:{log:H,prefix:m}})}s.deleteShader(T),s.deleteShader(w),x=new Oo(s,g),S=OS(s,g)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(g,AS)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=RS++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=w,this}let QS=0;class t1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new e1(t),e.set(t,i)),i}}class e1{constructor(t){this.id=QS++,this.code=t,this.usedTimes=0}}function n1(n,t,e,i,s,a){const r=new gu,o=new t1,c=new Set,d=[],u=new Map,l=i.logarithmicDepthBuffer;let h=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,S,I,C,U){const L=C.fog,k=U.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=t.get(x.envMap||B,V),et=H&&H.mapping===bl?H.image.height:null,tt=f[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&$t("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const ht=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,lt=ht!==void 0?ht.length:0;let ct=0;k.morphAttributes.position!==void 0&&(ct=1),k.morphAttributes.normal!==void 0&&(ct=2),k.morphAttributes.color!==void 0&&(ct=3);let Wt,be,Fe,Q;if(tt){const ye=Ci[tt];Wt=ye.vertexShader,be=ye.fragmentShader}else Wt=x.vertexShader,be=x.fragmentShader,o.update(x),Fe=o.getVertexShaderID(x),Q=o.getFragmentShaderID(x);const ft=n.getRenderTarget(),gt=n.state.buffers.depth.getReversed(),te=U.isInstancedMesh===!0,Xt=U.isBatchedMesh===!0,Zt=!!x.map,sn=!!x.matcap,he=!!H,Me=!!x.aoMap,Pe=!!x.lightMap,oe=!!x.bumpMap,Xe=!!x.normalMap,N=!!x.displacementMap,$e=!!x.emissiveMap,ge=!!x.metalnessMap,Le=!!x.roughnessMap,Lt=x.anisotropy>0,P=x.clearcoat>0,E=x.dispersion>0,z=x.iridescence>0,J=x.sheen>0,st=x.transmission>0,K=Lt&&!!x.anisotropyMap,At=P&&!!x.clearcoatMap,pt=P&&!!x.clearcoatNormalMap,Bt=P&&!!x.clearcoatRoughnessMap,Yt=z&&!!x.iridescenceMap,at=z&&!!x.iridescenceThicknessMap,dt=J&&!!x.sheenColorMap,Rt=J&&!!x.sheenRoughnessMap,Dt=!!x.specularMap,St=!!x.specularColorMap,le=!!x.specularIntensityMap,O=st&&!!x.transmissionMap,mt=st&&!!x.thicknessMap,ut=!!x.gradientMap,bt=!!x.alphaMap,ot=x.alphaTest>0,j=!!x.alphaHash,Ct=!!x.extensions;let jt=Oi;x.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(jt=n.toneMapping);const Ue={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:Wt,fragmentShader:be,defines:x.defines,customVertexShaderID:Fe,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Xt,batchingColor:Xt&&U._colorsTexture!==null,instancing:te,instancingColor:te&&U.instanceColor!==null,instancingMorph:te&&U.morphTexture!==null,outputColorSpace:ft===null?n.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Ja,alphaToCoverage:!!x.alphaToCoverage,map:Zt,matcap:sn,envMap:he,envMapMode:he&&H.mapping,envMapCubeUVHeight:et,aoMap:Me,lightMap:Pe,bumpMap:oe,normalMap:Xe,displacementMap:N,emissiveMap:$e,normalMapObjectSpace:Xe&&x.normalMapType===Fg,normalMapTangentSpace:Xe&&x.normalMapType===Np,metalnessMap:ge,roughnessMap:Le,anisotropy:Lt,anisotropyMap:K,clearcoat:P,clearcoatMap:At,clearcoatNormalMap:pt,clearcoatRoughnessMap:Bt,dispersion:E,iridescence:z,iridescenceMap:Yt,iridescenceThicknessMap:at,sheen:J,sheenColorMap:dt,sheenRoughnessMap:Rt,specularMap:Dt,specularColorMap:St,specularIntensityMap:le,transmission:st,transmissionMap:O,thicknessMap:mt,gradientMap:ut,opaque:x.transparent===!1&&x.blending===Ba&&x.alphaToCoverage===!1,alphaMap:bt,alphaTest:ot,alphaHash:j,combine:x.combine,mapUv:Zt&&_(x.map.channel),aoMapUv:Me&&_(x.aoMap.channel),lightMapUv:Pe&&_(x.lightMap.channel),bumpMapUv:oe&&_(x.bumpMap.channel),normalMapUv:Xe&&_(x.normalMap.channel),displacementMapUv:N&&_(x.displacementMap.channel),emissiveMapUv:$e&&_(x.emissiveMap.channel),metalnessMapUv:ge&&_(x.metalnessMap.channel),roughnessMapUv:Le&&_(x.roughnessMap.channel),anisotropyMapUv:K&&_(x.anisotropyMap.channel),clearcoatMapUv:At&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:pt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Bt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Yt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(x.sheenRoughnessMap.channel),specularMapUv:Dt&&_(x.specularMap.channel),specularColorMapUv:St&&_(x.specularColorMap.channel),specularIntensityMapUv:le&&_(x.specularIntensityMap.channel),transmissionMapUv:O&&_(x.transmissionMap.channel),thicknessMapUv:mt&&_(x.thicknessMap.channel),alphaMapUv:bt&&_(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Xe||Lt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Zt||bt),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||k.attributes.normal===void 0&&Xe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:l,reversedDepthBuffer:gt,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:ct,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:jt,decodeVideoTexture:Zt&&x.map.isVideoTexture===!0&&pe.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:$e&&x.emissiveMap.isVideoTexture===!0&&pe.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Kn,flipSided:x.side===Vn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&x.extensions.multiDraw===!0||Xt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)S.push(I),S.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(m(S,x),v(S,x),S.push(n.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function m(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function v(x,S){r.disableAll(),S.instancing&&r.enable(0),S.instancingColor&&r.enable(1),S.instancingMorph&&r.enable(2),S.matcap&&r.enable(3),S.envMap&&r.enable(4),S.normalMapObjectSpace&&r.enable(5),S.normalMapTangentSpace&&r.enable(6),S.clearcoat&&r.enable(7),S.iridescence&&r.enable(8),S.alphaTest&&r.enable(9),S.vertexColors&&r.enable(10),S.vertexAlphas&&r.enable(11),S.vertexUv1s&&r.enable(12),S.vertexUv2s&&r.enable(13),S.vertexUv3s&&r.enable(14),S.vertexTangents&&r.enable(15),S.anisotropy&&r.enable(16),S.alphaHash&&r.enable(17),S.batching&&r.enable(18),S.dispersion&&r.enable(19),S.batchingColor&&r.enable(20),S.gradientMap&&r.enable(21),x.push(r.mask),r.disableAll(),S.fog&&r.enable(0),S.useFog&&r.enable(1),S.flatShading&&r.enable(2),S.logarithmicDepthBuffer&&r.enable(3),S.reversedDepthBuffer&&r.enable(4),S.skinning&&r.enable(5),S.morphTargets&&r.enable(6),S.morphNormals&&r.enable(7),S.morphColors&&r.enable(8),S.premultipliedAlpha&&r.enable(9),S.shadowMapEnabled&&r.enable(10),S.doubleSided&&r.enable(11),S.flipSided&&r.enable(12),S.useDepthPacking&&r.enable(13),S.dithering&&r.enable(14),S.transmission&&r.enable(15),S.sheen&&r.enable(16),S.opaque&&r.enable(17),S.pointsUvs&&r.enable(18),S.decodeVideoTexture&&r.enable(19),S.decodeVideoTextureEmissive&&r.enable(20),S.alphaToCoverage&&r.enable(21),x.push(r.mask)}function M(x){const S=f[x.type];let I;if(S){const C=Ci[S];I=nl.clone(C.uniforms)}else I=x.uniforms;return I}function y(x,S){let I=u.get(S);return I!==void 0?++I.usedTimes:(I=new JS(n,S,x,s),d.push(I),u.set(S,I)),I}function T(x){if(--x.usedTimes===0){const S=d.indexOf(x);d[S]=d[d.length-1],d.pop(),u.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:y,releaseProgram:T,releaseShaderCache:w,programs:d,dispose:A}}function i1(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,c){n.get(r)[o]=c}function a(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:a}}function s1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function bf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Tf(){const n=[];let t=0;const e=[],i=[],s=[];function a(){t=0,e.length=0,i.length=0,s.length=0}function r(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,_,g,p,m){let v=n[t];return v===void 0?(v={id:h.id,object:h,geometry:f,material:_,materialVariant:r(h),groupOrder:g,renderOrder:h.renderOrder,z:p,group:m},n[t]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=_,v.materialVariant=r(h),v.groupOrder=g,v.renderOrder=h.renderOrder,v.z=p,v.group=m),t++,v}function c(h,f,_,g,p,m){const v=o(h,f,_,g,p,m);_.transmission>0?i.push(v):_.transparent===!0?s.push(v):e.push(v)}function d(h,f,_,g,p,m){const v=o(h,f,_,g,p,m);_.transmission>0?i.unshift(v):_.transparent===!0?s.unshift(v):e.unshift(v)}function u(h,f){e.length>1&&e.sort(h||s1),i.length>1&&i.sort(f||bf),s.length>1&&s.sort(f||bf)}function l(){for(let h=t,f=n.length;h<f;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:a,push:c,unshift:d,finish:l,sort:u}}function a1(){let n=new WeakMap;function t(i,s){const a=n.get(i);let r;return a===void 0?(r=new Tf,n.set(i,[r])):s>=a.length?(r=new Tf,a.push(r)):r=a[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function r1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Ht};break;case"SpotLight":e={position:new F,direction:new F,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function o1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let l1=0;function c1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function d1(n){const t=new r1,e=o1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new F);const s=new F,a=new Ge,r=new Ge;function o(d){let u=0,l=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,v=0,M=0,y=0,T=0,w=0,A=0;d.sort(c1);for(let S=0,I=d.length;S<I;S++){const C=d[S],U=C.color,L=C.intensity,k=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ka?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=U.r*L,l+=U.g*L,h+=U.b*L;else if(C.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(C.sh.coefficients[V],L);A++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const H=C.shadow,et=e.get(C);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,i.directionalShadow[f]=et,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=C.shadow.matrix,v++}i.directional[f]=V,f++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(U).multiplyScalar(L),V.distance=k,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,i.spot[g]=V;const H=C.shadow;if(C.map&&(i.spotLightMap[T]=C.map,T++,H.updateMatrices(C),C.castShadow&&w++),i.spotLightMatrix[g]=H.matrix,C.castShadow){const et=e.get(C);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,i.spotShadow[g]=et,i.spotShadowMap[g]=B,y++}g++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(U).multiplyScalar(L),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=V,p++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const H=C.shadow,et=e.get(C);et.shadowIntensity=H.intensity,et.shadowBias=H.bias,et.shadowNormalBias=H.normalBias,et.shadowRadius=H.radius,et.shadowMapSize=H.mapSize,et.shadowCameraNear=H.camera.near,et.shadowCameraFar=H.camera.far,i.pointShadow[_]=et,i.pointShadowMap[_]=B,i.pointShadowMatrix[_]=C.shadow.matrix,M++}i.point[_]=V,_++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(L),V.groundColor.copy(C.groundColor).multiplyScalar(L),i.hemi[m]=V,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=l,i.ambient[2]=h;const x=i.hash;(x.directionalLength!==f||x.pointLength!==_||x.spotLength!==g||x.rectAreaLength!==p||x.hemiLength!==m||x.numDirectionalShadows!==v||x.numPointShadows!==M||x.numSpotShadows!==y||x.numSpotMaps!==T||x.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=p,i.point.length=_,i.hemi.length=m,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+T-w,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,x.directionalLength=f,x.pointLength=_,x.spotLength=g,x.rectAreaLength=p,x.hemiLength=m,x.numDirectionalShadows=v,x.numPointShadows=M,x.numSpotShadows=y,x.numSpotMaps=T,x.numLightProbes=A,i.version=l1++)}function c(d,u){let l=0,h=0,f=0,_=0,g=0;const p=u.matrixWorldInverse;for(let m=0,v=d.length;m<v;m++){const M=d[m];if(M.isDirectionalLight){const y=i.directional[l];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),l++}else if(M.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(M.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),r.identity(),a.copy(M.matrixWorld),a.premultiply(p),r.extractRotation(a),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(M.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),h++}else if(M.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:i}}function Af(n){const t=new d1(n),e=[],i=[];function s(u){d.camera=u,e.length=0,i.length=0}function a(u){e.push(u)}function r(u){i.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:d,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:r}}function u1(n){let t=new WeakMap;function e(s,a=0){const r=t.get(s);let o;return r===void 0?(o=new Af(n),t.set(s,[o])):a>=r.length?(o=new Af(n),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const h1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f1=`uniform sampler2D shadow_pass;
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
}`,p1=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],m1=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Rf=new Ge,xr=new F,yc=new F;function _1(n,t,e){let i=new vu;const s=new Pt,a=new Pt,r=new We,o=new bx,c=new Tx,d={},u=e.maxTextureSize,l={[Is]:Vn,[Vn]:Is,[Kn]:Kn},h=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:h1,fragmentShader:f1}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new un;_.setAttribute("position",new Bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new b(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let m=this.type;this.render=function(w,A,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===fg&&($t("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Do);const S=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Fi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=m!==this.type;L&&A.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(B=>B.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,B=w.length;k<B;k++){const V=w[k],H=V.shadow;if(H===void 0){$t("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const et=H.getFrameExtents();s.multiply(et),a.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/et.x),s.x=a.x*et.x,H.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/et.y),s.y=a.y*et.y,H.mapSize.y=a.y));const tt=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=tt,H.map===null||L===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Mr){if(V.isPointLight){$t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Wn(s.x,s.y,{format:Ka,type:ti,minFilter:Tn,magFilter:Tn,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new Nr(s.x,s.y,Ii),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=fs,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=mn,H.map.depthTexture.magFilter=mn}else V.isPointLight?(H.map=new Zp(s.x),H.map.depthTexture=new Mx(s.x,Gi)):(H.map=new Wn(s.x,s.y),H.map.depthTexture=new Nr(s.x,s.y,Gi)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=fs,this.type===Do?(H.map.depthTexture.compareFunction=tt?mu:pu,H.map.depthTexture.minFilter=Tn,H.map.depthTexture.magFilter=Tn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=mn,H.map.depthTexture.magFilter=mn);H.camera.updateProjectionMatrix()}const ht=H.map.isWebGLCubeRenderTarget?6:1;for(let lt=0;lt<ht;lt++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,lt),n.clear();else{lt===0&&(n.setRenderTarget(H.map),n.clear());const ct=H.getViewport(lt);r.set(a.x*ct.x,a.y*ct.y,a.x*ct.z,a.y*ct.w),U.viewport(r)}if(V.isPointLight){const ct=H.camera,Wt=H.matrix,be=V.distance||ct.far;be!==ct.far&&(ct.far=be,ct.updateProjectionMatrix()),xr.setFromMatrixPosition(V.matrixWorld),ct.position.copy(xr),yc.copy(ct.position),yc.add(p1[lt]),ct.up.copy(m1[lt]),ct.lookAt(yc),ct.updateMatrixWorld(),Wt.makeTranslation(-xr.x,-xr.y,-xr.z),Rf.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Rf,ct.coordinateSystem,ct.reversedDepth)}else H.updateMatrices(V);i=H.getFrustum(),y(A,x,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===Mr&&v(H,x),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(S,I,C)};function v(w,A){const x=t.update(g);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Wn(s.x,s.y,{format:Ka,type:ti})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,x,h,g,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,x,f,g,null)}function M(w,A,x,S){let I=null;const C=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)I=C;else if(I=x.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=I.uuid,L=A.uuid;let k=d[U];k===void 0&&(k={},d[U]=k);let B=k[L];B===void 0&&(B=I.clone(),k[L]=B,A.addEventListener("dispose",T)),I=B}if(I.visible=A.visible,I.wireframe=A.wireframe,S===Mr?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:l[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const U=n.properties.get(I);U.light=x}return I}function y(w,A,x,S,I){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===Mr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const L=t.update(w),k=w.material;if(Array.isArray(k)){const B=L.groups;for(let V=0,H=B.length;V<H;V++){const et=B[V],tt=k[et.materialIndex];if(tt&&tt.visible){const ht=M(w,tt,S,I);w.onBeforeShadow(n,w,A,x,L,ht,et),n.renderBufferDirect(x,null,L,ht,w,et),w.onAfterShadow(n,w,A,x,L,ht,et)}}}else if(k.visible){const B=M(w,k,S,I);w.onBeforeShadow(n,w,A,x,L,B,null),n.renderBufferDirect(x,null,L,B,w,null),w.onAfterShadow(n,w,A,x,L,B,null)}}const U=w.children;for(let L=0,k=U.length;L<k;L++)y(U[L],A,x,S,I)}function T(w){w.target.removeEventListener("dispose",T);for(const x in d){const S=d[x],I=w.target.uuid;I in S&&(S[I].dispose(),delete S[I])}}}function g1(n,t){function e(){let O=!1;const mt=new We;let ut=null;const bt=new We(0,0,0,0);return{setMask:function(ot){ut!==ot&&!O&&(n.colorMask(ot,ot,ot,ot),ut=ot)},setLocked:function(ot){O=ot},setClear:function(ot,j,Ct,jt,Ue){Ue===!0&&(ot*=jt,j*=jt,Ct*=jt),mt.set(ot,j,Ct,jt),bt.equals(mt)===!1&&(n.clearColor(ot,j,Ct,jt),bt.copy(mt))},reset:function(){O=!1,ut=null,bt.set(-1,0,0,0)}}}function i(){let O=!1,mt=!1,ut=null,bt=null,ot=null;return{setReversed:function(j){if(mt!==j){const Ct=t.get("EXT_clip_control");j?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),mt=j;const jt=ot;ot=null,this.setClear(jt)}},getReversed:function(){return mt},setTest:function(j){j?ft(n.DEPTH_TEST):gt(n.DEPTH_TEST)},setMask:function(j){ut!==j&&!O&&(n.depthMask(j),ut=j)},setFunc:function(j){if(mt&&(j=qg[j]),bt!==j){switch(j){case zc:n.depthFunc(n.NEVER);break;case Hc:n.depthFunc(n.ALWAYS);break;case Gc:n.depthFunc(n.LESS);break;case Za:n.depthFunc(n.LEQUAL);break;case kc:n.depthFunc(n.EQUAL);break;case Vc:n.depthFunc(n.GEQUAL);break;case Wc:n.depthFunc(n.GREATER);break;case Xc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}bt=j}},setLocked:function(j){O=j},setClear:function(j){ot!==j&&(ot=j,mt&&(j=1-j),n.clearDepth(j))},reset:function(){O=!1,ut=null,bt=null,ot=null,mt=!1}}}function s(){let O=!1,mt=null,ut=null,bt=null,ot=null,j=null,Ct=null,jt=null,Ue=null;return{setTest:function(ye){O||(ye?ft(n.STENCIL_TEST):gt(n.STENCIL_TEST))},setMask:function(ye){mt!==ye&&!O&&(n.stencilMask(ye),mt=ye)},setFunc:function(ye,qi,Yi){(ut!==ye||bt!==qi||ot!==Yi)&&(n.stencilFunc(ye,qi,Yi),ut=ye,bt=qi,ot=Yi)},setOp:function(ye,qi,Yi){(j!==ye||Ct!==qi||jt!==Yi)&&(n.stencilOp(ye,qi,Yi),j=ye,Ct=qi,jt=Yi)},setLocked:function(ye){O=ye},setClear:function(ye){Ue!==ye&&(n.clearStencil(ye),Ue=ye)},reset:function(){O=!1,mt=null,ut=null,bt=null,ot=null,j=null,Ct=null,jt=null,Ue=null}}}const a=new e,r=new i,o=new s,c=new WeakMap,d=new WeakMap;let u={},l={},h=new WeakMap,f=[],_=null,g=!1,p=null,m=null,v=null,M=null,y=null,T=null,w=null,A=new Ht(0,0,0),x=0,S=!1,I=null,C=null,U=null,L=null,k=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,H=0;const et=n.getParameter(n.VERSION);et.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(et)[1]),V=H>=1):et.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),V=H>=2);let tt=null,ht={};const lt=n.getParameter(n.SCISSOR_BOX),ct=n.getParameter(n.VIEWPORT),Wt=new We().fromArray(lt),be=new We().fromArray(ct);function Fe(O,mt,ut,bt){const ot=new Uint8Array(4),j=n.createTexture();n.bindTexture(O,j),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<ut;Ct++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(mt,0,n.RGBA,1,1,bt,0,n.RGBA,n.UNSIGNED_BYTE,ot):n.texImage2D(mt+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ot);return j}const Q={};Q[n.TEXTURE_2D]=Fe(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ft(n.DEPTH_TEST),r.setFunc(Za),oe(!1),Xe(wh),ft(n.CULL_FACE),Me(Fi);function ft(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function gt(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function te(O,mt){return l[O]!==mt?(n.bindFramebuffer(O,mt),l[O]=mt,O===n.DRAW_FRAMEBUFFER&&(l[n.FRAMEBUFFER]=mt),O===n.FRAMEBUFFER&&(l[n.DRAW_FRAMEBUFFER]=mt),!0):!1}function Xt(O,mt){let ut=f,bt=!1;if(O){ut=h.get(mt),ut===void 0&&(ut=[],h.set(mt,ut));const ot=O.textures;if(ut.length!==ot.length||ut[0]!==n.COLOR_ATTACHMENT0){for(let j=0,Ct=ot.length;j<Ct;j++)ut[j]=n.COLOR_ATTACHMENT0+j;ut.length=ot.length,bt=!0}}else ut[0]!==n.BACK&&(ut[0]=n.BACK,bt=!0);bt&&n.drawBuffers(ut)}function Zt(O){return _!==O?(n.useProgram(O),_=O,!0):!1}const sn={[$s]:n.FUNC_ADD,[mg]:n.FUNC_SUBTRACT,[_g]:n.FUNC_REVERSE_SUBTRACT};sn[gg]=n.MIN,sn[xg]=n.MAX;const he={[vg]:n.ZERO,[Mg]:n.ONE,[yg]:n.SRC_COLOR,[Oc]:n.SRC_ALPHA,[Ag]:n.SRC_ALPHA_SATURATE,[bg]:n.DST_COLOR,[Eg]:n.DST_ALPHA,[Sg]:n.ONE_MINUS_SRC_COLOR,[Bc]:n.ONE_MINUS_SRC_ALPHA,[Tg]:n.ONE_MINUS_DST_COLOR,[wg]:n.ONE_MINUS_DST_ALPHA,[Rg]:n.CONSTANT_COLOR,[Cg]:n.ONE_MINUS_CONSTANT_COLOR,[Pg]:n.CONSTANT_ALPHA,[Dg]:n.ONE_MINUS_CONSTANT_ALPHA};function Me(O,mt,ut,bt,ot,j,Ct,jt,Ue,ye){if(O===Fi){g===!0&&(gt(n.BLEND),g=!1);return}if(g===!1&&(ft(n.BLEND),g=!0),O!==pg){if(O!==p||ye!==S){if((m!==$s||y!==$s)&&(n.blendEquation(n.FUNC_ADD),m=$s,y=$s),ye)switch(O){case Ba:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFunc(n.ONE,n.ONE);break;case bh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Th:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:fe("WebGLState: Invalid blending: ",O);break}else switch(O){case Ba:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case bh:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Th:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",O);break}v=null,M=null,T=null,w=null,A.set(0,0,0),x=0,p=O,S=ye}return}ot=ot||mt,j=j||ut,Ct=Ct||bt,(mt!==m||ot!==y)&&(n.blendEquationSeparate(sn[mt],sn[ot]),m=mt,y=ot),(ut!==v||bt!==M||j!==T||Ct!==w)&&(n.blendFuncSeparate(he[ut],he[bt],he[j],he[Ct]),v=ut,M=bt,T=j,w=Ct),(jt.equals(A)===!1||Ue!==x)&&(n.blendColor(jt.r,jt.g,jt.b,Ue),A.copy(jt),x=Ue),p=O,S=!1}function Pe(O,mt){O.side===Kn?gt(n.CULL_FACE):ft(n.CULL_FACE);let ut=O.side===Vn;mt&&(ut=!ut),oe(ut),O.blending===Ba&&O.transparent===!1?Me(Fi):Me(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),a.setMask(O.colorWrite);const bt=O.stencilWrite;o.setTest(bt),bt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),$e(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):gt(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(O){I!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),I=O)}function Xe(O){O!==ug?(ft(n.CULL_FACE),O!==C&&(O===wh?n.cullFace(n.BACK):O===hg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):gt(n.CULL_FACE),C=O}function N(O){O!==U&&(V&&n.lineWidth(O),U=O)}function $e(O,mt,ut){O?(ft(n.POLYGON_OFFSET_FILL),(L!==mt||k!==ut)&&(L=mt,k=ut,r.getReversed()&&(mt=-mt),n.polygonOffset(mt,ut))):gt(n.POLYGON_OFFSET_FILL)}function ge(O){O?ft(n.SCISSOR_TEST):gt(n.SCISSOR_TEST)}function Le(O){O===void 0&&(O=n.TEXTURE0+B-1),tt!==O&&(n.activeTexture(O),tt=O)}function Lt(O,mt,ut){ut===void 0&&(tt===null?ut=n.TEXTURE0+B-1:ut=tt);let bt=ht[ut];bt===void 0&&(bt={type:void 0,texture:void 0},ht[ut]=bt),(bt.type!==O||bt.texture!==mt)&&(tt!==ut&&(n.activeTexture(ut),tt=ut),n.bindTexture(O,mt||Q[O]),bt.type=O,bt.texture=mt)}function P(){const O=ht[tt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function E(){try{n.compressedTexImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function J(){try{n.texSubImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function st(){try{n.texSubImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function At(){try{n.compressedTexSubImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function pt(){try{n.texStorage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function Bt(){try{n.texStorage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function Yt(){try{n.texImage2D(...arguments)}catch(O){fe("WebGLState:",O)}}function at(){try{n.texImage3D(...arguments)}catch(O){fe("WebGLState:",O)}}function dt(O){Wt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Wt.copy(O))}function Rt(O){be.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),be.copy(O))}function Dt(O,mt){let ut=d.get(mt);ut===void 0&&(ut=new WeakMap,d.set(mt,ut));let bt=ut.get(O);bt===void 0&&(bt=n.getUniformBlockIndex(mt,O.name),ut.set(O,bt))}function St(O,mt){const bt=d.get(mt).get(O);c.get(mt)!==bt&&(n.uniformBlockBinding(mt,bt,O.__bindingPointIndex),c.set(mt,bt))}function le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},tt=null,ht={},l={},h=new WeakMap,f=[],_=null,g=!1,p=null,m=null,v=null,M=null,y=null,T=null,w=null,A=new Ht(0,0,0),x=0,S=!1,I=null,C=null,U=null,L=null,k=null,Wt.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:ft,disable:gt,bindFramebuffer:te,drawBuffers:Xt,useProgram:Zt,setBlending:Me,setMaterial:Pe,setFlipSided:oe,setCullFace:Xe,setLineWidth:N,setPolygonOffset:$e,setScissorTest:ge,activeTexture:Le,bindTexture:Lt,unbindTexture:P,compressedTexImage2D:E,compressedTexImage3D:z,texImage2D:Yt,texImage3D:at,updateUBOMapping:Dt,uniformBlockBinding:St,texStorage2D:pt,texStorage3D:Bt,texSubImage2D:J,texSubImage3D:st,compressedTexSubImage2D:K,compressedTexSubImage3D:At,scissor:dt,viewport:Rt,reset:le}}function x1(n,t,e,i,s,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Pt,u=new WeakMap;let l;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,E){return f?new OffscreenCanvas(P,E):Ko("canvas")}function g(P,E,z){let J=1;const st=Lt(P);if((st.width>z||st.height>z)&&(J=z/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(J*st.width),At=Math.floor(J*st.height);l===void 0&&(l=_(K,At));const pt=E?_(K,At):l;return pt.width=K,pt.height=At,pt.getContext("2d").drawImage(P,0,0,K,At),$t("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+K+"x"+At+")."),pt}else return"data"in P&&$t("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){n.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(P,E,z,J,st=!1){if(P!==null){if(n[P]!==void 0)return n[P];$t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=E;if(E===n.RED&&(z===n.FLOAT&&(K=n.R32F),z===n.HALF_FLOAT&&(K=n.R16F),z===n.UNSIGNED_BYTE&&(K=n.R8)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.R8UI),z===n.UNSIGNED_SHORT&&(K=n.R16UI),z===n.UNSIGNED_INT&&(K=n.R32UI),z===n.BYTE&&(K=n.R8I),z===n.SHORT&&(K=n.R16I),z===n.INT&&(K=n.R32I)),E===n.RG&&(z===n.FLOAT&&(K=n.RG32F),z===n.HALF_FLOAT&&(K=n.RG16F),z===n.UNSIGNED_BYTE&&(K=n.RG8)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RG8UI),z===n.UNSIGNED_SHORT&&(K=n.RG16UI),z===n.UNSIGNED_INT&&(K=n.RG32UI),z===n.BYTE&&(K=n.RG8I),z===n.SHORT&&(K=n.RG16I),z===n.INT&&(K=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGB8UI),z===n.UNSIGNED_SHORT&&(K=n.RGB16UI),z===n.UNSIGNED_INT&&(K=n.RGB32UI),z===n.BYTE&&(K=n.RGB8I),z===n.SHORT&&(K=n.RGB16I),z===n.INT&&(K=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),z===n.UNSIGNED_INT&&(K=n.RGBA32UI),z===n.BYTE&&(K=n.RGBA8I),z===n.SHORT&&(K=n.RGBA16I),z===n.INT&&(K=n.RGBA32I)),E===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),E===n.RGBA){const At=st?jo:pe.getTransfer(J);z===n.FLOAT&&(K=n.RGBA32F),z===n.HALF_FLOAT&&(K=n.RGBA16F),z===n.UNSIGNED_BYTE&&(K=At===Se?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(P,E){let z;return P?E===null||E===Gi||E===Lr?z=n.DEPTH24_STENCIL8:E===Ii?z=n.DEPTH32F_STENCIL8:E===Ir&&(z=n.DEPTH24_STENCIL8,$t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Gi||E===Lr?z=n.DEPTH_COMPONENT24:E===Ii?z=n.DEPTH_COMPONENT32F:E===Ir&&(z=n.DEPTH_COMPONENT16),z}function T(P,E){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==mn&&P.minFilter!==Tn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function w(P){const E=P.target;E.removeEventListener("dispose",w),x(E),E.isVideoTexture&&u.delete(E)}function A(P){const E=P.target;E.removeEventListener("dispose",A),I(E)}function x(P){const E=i.get(P);if(E.__webglInit===void 0)return;const z=P.source,J=h.get(z);if(J){const st=J[E.__cacheKey];st.usedTimes--,st.usedTimes===0&&S(P),Object.keys(J).length===0&&h.delete(z)}i.remove(P)}function S(P){const E=i.get(P);n.deleteTexture(E.__webglTexture);const z=P.source,J=h.get(z);delete J[E.__cacheKey],r.memory.textures--}function I(P){const E=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let st=0;st<E.__webglFramebuffer[J].length;st++)n.deleteFramebuffer(E.__webglFramebuffer[J][st]);else n.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)n.deleteFramebuffer(E.__webglFramebuffer[J]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=P.textures;for(let J=0,st=z.length;J<st;J++){const K=i.get(z[J]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),r.memory.textures--),i.remove(z[J])}i.remove(P)}let C=0;function U(){C=0}function L(){const P=C;return P>=s.maxTextures&&$t("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),C+=1,P}function k(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function B(P,E){const z=i.get(P);if(P.isVideoTexture&&ge(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const J=P.image;if(J===null)$t("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)$t("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(z,P,E);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function V(P,E){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Q(z,P,E);return}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function H(P,E){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){Q(z,P,E);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function et(P,E){const z=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&z.__version!==P.version){ft(z,P,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const tt={[qc]:n.REPEAT,[os]:n.CLAMP_TO_EDGE,[Yc]:n.MIRRORED_REPEAT},ht={[mn]:n.NEAREST,[Ug]:n.NEAREST_MIPMAP_NEAREST,[io]:n.NEAREST_MIPMAP_LINEAR,[Tn]:n.LINEAR,[Wl]:n.LINEAR_MIPMAP_NEAREST,[Ks]:n.LINEAR_MIPMAP_LINEAR},lt={[Og]:n.NEVER,[kg]:n.ALWAYS,[Bg]:n.LESS,[pu]:n.LEQUAL,[zg]:n.EQUAL,[mu]:n.GEQUAL,[Hg]:n.GREATER,[Gg]:n.NOTEQUAL};function ct(P,E){if(E.type===Ii&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Tn||E.magFilter===Wl||E.magFilter===io||E.magFilter===Ks||E.minFilter===Tn||E.minFilter===Wl||E.minFilter===io||E.minFilter===Ks)&&$t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,tt[E.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,tt[E.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,tt[E.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,ht[E.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,ht[E.minFilter]),E.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,lt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===mn||E.minFilter!==io&&E.minFilter!==Ks||E.type===Ii&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Wt(P,E){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",w));const J=E.source;let st=h.get(J);st===void 0&&(st={},h.set(J,st));const K=k(E);if(K!==P.__cacheKey){st[K]===void 0&&(st[K]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,z=!0),st[K].usedTimes++;const At=st[P.__cacheKey];At!==void 0&&(st[P.__cacheKey].usedTimes--,At.usedTimes===0&&S(E)),P.__cacheKey=K,P.__webglTexture=st[K].texture}return z}function be(P,E,z){return Math.floor(Math.floor(P/z)/E)}function Fe(P,E,z,J){const K=P.updateRanges;if(K.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,z,J,E.data);else{K.sort((at,dt)=>at.start-dt.start);let At=0;for(let at=1;at<K.length;at++){const dt=K[At],Rt=K[at],Dt=dt.start+dt.count,St=be(Rt.start,E.width,4),le=be(dt.start,E.width,4);Rt.start<=Dt+1&&St===le&&be(Rt.start+Rt.count-1,E.width,4)===St?dt.count=Math.max(dt.count,Rt.start+Rt.count-dt.start):(++At,K[At]=Rt)}K.length=At+1;const pt=n.getParameter(n.UNPACK_ROW_LENGTH),Bt=n.getParameter(n.UNPACK_SKIP_PIXELS),Yt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let at=0,dt=K.length;at<dt;at++){const Rt=K[at],Dt=Math.floor(Rt.start/4),St=Math.ceil(Rt.count/4),le=Dt%E.width,O=Math.floor(Dt/E.width),mt=St,ut=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,le),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,le,O,mt,ut,z,J,E.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,pt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Bt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Yt)}}function Q(P,E,z){let J=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=n.TEXTURE_3D);const st=Wt(P,E),K=E.source;e.bindTexture(J,P.__webglTexture,n.TEXTURE0+z);const At=i.get(K);if(K.version!==At.__version||st===!0){e.activeTexture(n.TEXTURE0+z);const pt=pe.getPrimaries(pe.workingColorSpace),Bt=E.colorSpace===Ts?null:pe.getPrimaries(E.colorSpace),Yt=E.colorSpace===Ts||pt===Bt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let at=g(E.image,!1,s.maxTextureSize);at=Le(E,at);const dt=a.convert(E.format,E.colorSpace),Rt=a.convert(E.type);let Dt=M(E.internalFormat,dt,Rt,E.colorSpace,E.isVideoTexture);ct(J,E);let St;const le=E.mipmaps,O=E.isVideoTexture!==!0,mt=At.__version===void 0||st===!0,ut=K.dataReady,bt=T(E,at);if(E.isDepthTexture)Dt=y(E.format===Js,E.type),mt&&(O?e.texStorage2D(n.TEXTURE_2D,1,Dt,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,Dt,at.width,at.height,0,dt,Rt,null));else if(E.isDataTexture)if(le.length>0){O&&mt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,le[0].width,le[0].height);for(let ot=0,j=le.length;ot<j;ot++)St=le[ot],O?ut&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,St.width,St.height,dt,Rt,St.data):e.texImage2D(n.TEXTURE_2D,ot,Dt,St.width,St.height,0,dt,Rt,St.data);E.generateMipmaps=!1}else O?(mt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,at.width,at.height),ut&&Fe(E,at,dt,Rt)):e.texImage2D(n.TEXTURE_2D,0,Dt,at.width,at.height,0,dt,Rt,at.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){O&&mt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Dt,le[0].width,le[0].height,at.depth);for(let ot=0,j=le.length;ot<j;ot++)if(St=le[ot],E.format!==Ei)if(dt!==null)if(O){if(ut)if(E.layerUpdates.size>0){const Ct=af(St.width,St.height,E.format,E.type);for(const jt of E.layerUpdates){const Ue=St.data.subarray(jt*Ct/St.data.BYTES_PER_ELEMENT,(jt+1)*Ct/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,jt,St.width,St.height,1,dt,Ue)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,St.width,St.height,at.depth,dt,St.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,Dt,St.width,St.height,at.depth,0,St.data,0,0);else $t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ut&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,St.width,St.height,at.depth,dt,Rt,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,Dt,St.width,St.height,at.depth,0,dt,Rt,St.data)}else{O&&mt&&e.texStorage2D(n.TEXTURE_2D,bt,Dt,le[0].width,le[0].height);for(let ot=0,j=le.length;ot<j;ot++)St=le[ot],E.format!==Ei?dt!==null?O?ut&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,St.width,St.height,dt,St.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,Dt,St.width,St.height,0,St.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ut&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,St.width,St.height,dt,Rt,St.data):e.texImage2D(n.TEXTURE_2D,ot,Dt,St.width,St.height,0,dt,Rt,St.data)}else if(E.isDataArrayTexture)if(O){if(mt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Dt,at.width,at.height,at.depth),ut)if(E.layerUpdates.size>0){const ot=af(at.width,at.height,E.format,E.type);for(const j of E.layerUpdates){const Ct=at.data.subarray(j*ot/at.data.BYTES_PER_ELEMENT,(j+1)*ot/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,at.width,at.height,1,dt,Rt,Ct)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,dt,Rt,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Dt,at.width,at.height,at.depth,0,dt,Rt,at.data);else if(E.isData3DTexture)O?(mt&&e.texStorage3D(n.TEXTURE_3D,bt,Dt,at.width,at.height,at.depth),ut&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,dt,Rt,at.data)):e.texImage3D(n.TEXTURE_3D,0,Dt,at.width,at.height,at.depth,0,dt,Rt,at.data);else if(E.isFramebufferTexture){if(mt)if(O)e.texStorage2D(n.TEXTURE_2D,bt,Dt,at.width,at.height);else{let ot=at.width,j=at.height;for(let Ct=0;Ct<bt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,Dt,ot,j,0,dt,Rt,null),ot>>=1,j>>=1}}else if(le.length>0){if(O&&mt){const ot=Lt(le[0]);e.texStorage2D(n.TEXTURE_2D,bt,Dt,ot.width,ot.height)}for(let ot=0,j=le.length;ot<j;ot++)St=le[ot],O?ut&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,dt,Rt,St):e.texImage2D(n.TEXTURE_2D,ot,Dt,dt,Rt,St);E.generateMipmaps=!1}else if(O){if(mt){const ot=Lt(at);e.texStorage2D(n.TEXTURE_2D,bt,Dt,ot.width,ot.height)}ut&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Rt,at)}else e.texImage2D(n.TEXTURE_2D,0,Dt,dt,Rt,at);p(E)&&m(J),At.__version=K.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ft(P,E,z){if(E.image.length!==6)return;const J=Wt(P,E),st=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+z);const K=i.get(st);if(st.version!==K.__version||J===!0){e.activeTexture(n.TEXTURE0+z);const At=pe.getPrimaries(pe.workingColorSpace),pt=E.colorSpace===Ts?null:pe.getPrimaries(E.colorSpace),Bt=E.colorSpace===Ts||At===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt);const Yt=E.isCompressedTexture||E.image[0].isCompressedTexture,at=E.image[0]&&E.image[0].isDataTexture,dt=[];for(let j=0;j<6;j++)!Yt&&!at?dt[j]=g(E.image[j],!0,s.maxCubemapSize):dt[j]=at?E.image[j].image:E.image[j],dt[j]=Le(E,dt[j]);const Rt=dt[0],Dt=a.convert(E.format,E.colorSpace),St=a.convert(E.type),le=M(E.internalFormat,Dt,St,E.colorSpace),O=E.isVideoTexture!==!0,mt=K.__version===void 0||J===!0,ut=st.dataReady;let bt=T(E,Rt);ct(n.TEXTURE_CUBE_MAP,E);let ot;if(Yt){O&&mt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,le,Rt.width,Rt.height);for(let j=0;j<6;j++){ot=dt[j].mipmaps;for(let Ct=0;Ct<ot.length;Ct++){const jt=ot[Ct];E.format!==Ei?Dt!==null?O?ut&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,jt.width,jt.height,Dt,jt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,le,jt.width,jt.height,0,jt.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,jt.width,jt.height,Dt,St,jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,le,jt.width,jt.height,0,Dt,St,jt.data)}}}else{if(ot=E.mipmaps,O&&mt){ot.length>0&&bt++;const j=Lt(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,le,j.width,j.height)}for(let j=0;j<6;j++)if(at){O?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,dt[j].width,dt[j].height,Dt,St,dt[j].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,le,dt[j].width,dt[j].height,0,Dt,St,dt[j].data);for(let Ct=0;Ct<ot.length;Ct++){const Ue=ot[Ct].image[j].image;O?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Ue.width,Ue.height,Dt,St,Ue.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,le,Ue.width,Ue.height,0,Dt,St,Ue.data)}}else{O?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Dt,St,dt[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,le,Dt,St,dt[j]);for(let Ct=0;Ct<ot.length;Ct++){const jt=ot[Ct];O?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Dt,St,jt.image[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,le,Dt,St,jt.image[j])}}}p(E)&&m(n.TEXTURE_CUBE_MAP),K.__version=st.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function gt(P,E,z,J,st,K){const At=a.convert(z.format,z.colorSpace),pt=a.convert(z.type),Bt=M(z.internalFormat,At,pt,z.colorSpace),Yt=i.get(E),at=i.get(z);if(at.__renderTarget=E,!Yt.__hasExternalTextures){const dt=Math.max(1,E.width>>K),Rt=Math.max(1,E.height>>K);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,K,Bt,dt,Rt,E.depth,0,At,pt,null):e.texImage2D(st,K,Bt,dt,Rt,0,At,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),$e(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,st,at.__webglTexture,0,N(E)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,st,at.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function te(P,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,P),E.depthBuffer){const J=E.depthTexture,st=J&&J.isDepthTexture?J.type:null,K=y(E.stencilBuffer,st),At=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;$e(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,N(E),K,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,N(E),K,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,K,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,At,n.RENDERBUFFER,P)}else{const J=E.textures;for(let st=0;st<J.length;st++){const K=J[st],At=a.convert(K.format,K.colorSpace),pt=a.convert(K.type),Bt=M(K.internalFormat,At,pt,K.colorSpace);$e(E)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,N(E),Bt,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,N(E),Bt,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Bt,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Xt(P,E,z){const J=E.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const st=i.get(E.depthTexture);if(st.__renderTarget=E,(!st.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J){if(st.__webglInit===void 0&&(st.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),st.__webglTexture===void 0){st.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,st.__webglTexture),ct(n.TEXTURE_CUBE_MAP,E.depthTexture);const Yt=a.convert(E.depthTexture.format),at=a.convert(E.depthTexture.type);let dt;E.depthTexture.format===fs?dt=n.DEPTH_COMPONENT24:E.depthTexture.format===Js&&(dt=n.DEPTH24_STENCIL8);for(let Rt=0;Rt<6;Rt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0,dt,E.width,E.height,0,Yt,at,null)}}else B(E.depthTexture,0);const K=st.__webglTexture,At=N(E),pt=J?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,Bt=E.depthTexture.format===Js?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(E.depthTexture.format===fs)$e(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Bt,pt,K,0,At):n.framebufferTexture2D(n.FRAMEBUFFER,Bt,pt,K,0);else if(E.depthTexture.format===Js)$e(E)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Bt,pt,K,0,At):n.framebufferTexture2D(n.FRAMEBUFFER,Bt,pt,K,0);else throw new Error("Unknown depthTexture format")}function Zt(P){const E=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const J=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const st=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),E.__depthDisposeCallback=st}E.__boundDepthTexture=J}if(P.depthTexture&&!E.__autoAllocateDepthBuffer)if(z)for(let J=0;J<6;J++)Xt(E.__webglFramebuffer[J],P,J);else{const J=P.texture.mipmaps;J&&J.length>0?Xt(E.__webglFramebuffer[0],P,0):Xt(E.__webglFramebuffer,P,0)}else if(z){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=n.createRenderbuffer(),te(E.__webglDepthbuffer[J],P,!1);else{const st=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,K)}}else{const J=P.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),te(E.__webglDepthbuffer,P,!1);else{const st=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,K)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function sn(P,E,z){const J=i.get(P);E!==void 0&&gt(J.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Zt(P)}function he(P){const E=P.texture,z=i.get(P),J=i.get(E);P.addEventListener("dispose",A);const st=P.textures,K=P.isWebGLCubeRenderTarget===!0,At=st.length>1;if(At||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=E.version,r.memory.textures++),K){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let Bt=0;Bt<E.mipmaps.length;Bt++)z.__webglFramebuffer[pt][Bt]=n.createFramebuffer()}else z.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<E.mipmaps.length;pt++)z.__webglFramebuffer[pt]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(At)for(let pt=0,Bt=st.length;pt<Bt;pt++){const Yt=i.get(st[pt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&$e(P)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<st.length;pt++){const Bt=st[pt];z.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);const Yt=a.convert(Bt.format,Bt.colorSpace),at=a.convert(Bt.type),dt=M(Bt.internalFormat,Yt,at,Bt.colorSpace,P.isXRRenderTarget===!0),Rt=N(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,dt,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),te(z.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),ct(n.TEXTURE_CUBE_MAP,E);for(let pt=0;pt<6;pt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Bt=0;Bt<E.mipmaps.length;Bt++)gt(z.__webglFramebuffer[pt][Bt],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Bt);else gt(z.__webglFramebuffer[pt],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);p(E)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let pt=0,Bt=st.length;pt<Bt;pt++){const Yt=st[pt],at=i.get(Yt);let dt=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(dt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,at.__webglTexture),ct(dt,Yt),gt(z.__webglFramebuffer,P,Yt,n.COLOR_ATTACHMENT0+pt,dt,0),p(Yt)&&m(dt)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,J.__webglTexture),ct(pt,E),E.mipmaps&&E.mipmaps.length>0)for(let Bt=0;Bt<E.mipmaps.length;Bt++)gt(z.__webglFramebuffer[Bt],P,E,n.COLOR_ATTACHMENT0,pt,Bt);else gt(z.__webglFramebuffer,P,E,n.COLOR_ATTACHMENT0,pt,0);p(E)&&m(pt),e.unbindTexture()}P.depthBuffer&&Zt(P)}function Me(P){const E=P.textures;for(let z=0,J=E.length;z<J;z++){const st=E[z];if(p(st)){const K=v(P),At=i.get(st).__webglTexture;e.bindTexture(K,At),m(K),e.unbindTexture()}}}const Pe=[],oe=[];function Xe(P){if(P.samples>0){if($e(P)===!1){const E=P.textures,z=P.width,J=P.height;let st=n.COLOR_BUFFER_BIT;const K=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,At=i.get(P),pt=E.length>1;if(pt)for(let Yt=0;Yt<E.length;Yt++)e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);const Bt=P.texture.mipmaps;Bt&&Bt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Yt=0;Yt<E.length;Yt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,At.__webglColorRenderbuffer[Yt]);const at=i.get(E[Yt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,at,0)}n.blitFramebuffer(0,0,z,J,0,0,z,J,st,n.NEAREST),c===!0&&(Pe.length=0,oe.length=0,Pe.push(n.COLOR_ATTACHMENT0+Yt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Pe.push(K),oe.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let Yt=0;Yt<E.length;Yt++){e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.RENDERBUFFER,At.__webglColorRenderbuffer[Yt]);const at=i.get(E[Yt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.TEXTURE_2D,at,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const E=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function N(P){return Math.min(s.maxSamples,P.samples)}function $e(P){const E=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ge(P){const E=r.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function Le(P,E){const z=P.colorSpace,J=P.format,st=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==Ja&&z!==Ts&&(pe.getTransfer(z)===Se?(J!==Ei||st!==Jn)&&$t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",z)),E}function Lt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(d.width=P.naturalWidth||P.width,d.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(d.width=P.displayWidth,d.height=P.displayHeight):(d.width=P.width,d.height=P.height),d}this.allocateTextureUnit=L,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=H,this.setTextureCube=et,this.rebindTextures=sn,this.setupRenderTarget=he,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function v1(n,t){function e(i,s=Ts){let a;const r=pe.getTransfer(s);if(i===Jn)return n.UNSIGNED_BYTE;if(i===cu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===du)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Dp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Rp)return n.BYTE;if(i===Cp)return n.SHORT;if(i===Ir)return n.UNSIGNED_SHORT;if(i===lu)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===Ii)return n.FLOAT;if(i===ti)return n.HALF_FLOAT;if(i===Ip)return n.ALPHA;if(i===Lp)return n.RGB;if(i===Ei)return n.RGBA;if(i===fs)return n.DEPTH_COMPONENT;if(i===Js)return n.DEPTH_STENCIL;if(i===Up)return n.RED;if(i===uu)return n.RED_INTEGER;if(i===Ka)return n.RG;if(i===hu)return n.RG_INTEGER;if(i===fu)return n.RGBA_INTEGER;if(i===Io||i===Lo||i===Uo||i===No)if(r===Se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Io)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===No)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Io)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Lo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Uo)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===No)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$c||i===Zc||i===jc||i===Kc)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===$c)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Kc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Jc||i===Qc||i===td||i===ed||i===nd||i===id||i===sd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Jc||i===Qc)return r===Se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===td)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===ed)return a.COMPRESSED_R11_EAC;if(i===nd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===id)return a.COMPRESSED_RG11_EAC;if(i===sd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ad||i===rd||i===od||i===ld||i===cd||i===dd||i===ud||i===hd||i===fd||i===pd||i===md||i===_d||i===gd||i===xd)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===ad)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===od)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ld)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===dd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ud)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===md)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_d)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===vd||i===Md||i===yd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===vd)return r===Se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Md)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===yd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sd||i===Ed||i===wd||i===bd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===Sd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Ed)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===bd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const M1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y1=`
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

}`;class S1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Vp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new An({vertexShader:M1,fragmentShader:y1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new b(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E1 extends la{constructor(t,e){super();const i=this;let s=null,a=1,r=null,o="local-floor",c=1,d=null,u=null,l=null,h=null,f=null,_=null;const g=typeof XRWebGLBinding<"u",p=new S1,m={},v=e.getContextAttributes();let M=null,y=null;const T=[],w=[],A=new Pt;let x=null;const S=new ri;S.viewport=new We;const I=new ri;I.viewport=new We;const C=[S,I],U=new Ix;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ft=T[Q];return ft===void 0&&(ft=new Kl,T[Q]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(Q){let ft=T[Q];return ft===void 0&&(ft=new Kl,T[Q]=ft),ft.getGripSpace()},this.getHand=function(Q){let ft=T[Q];return ft===void 0&&(ft=new Kl,T[Q]=ft),ft.getHandSpace()};function B(Q){const ft=w.indexOf(Q.inputSource);if(ft===-1)return;const gt=T[ft];gt!==void 0&&(gt.update(Q.inputSource,Q.frame,d||r),gt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",H);for(let Q=0;Q<T.length;Q++){const ft=w[Q];ft!==null&&(w[Q]=null,T[Q].disconnect(ft))}L=null,k=null,p.reset();for(const Q in m)delete m[Q];t.setRenderTarget(M),f=null,h=null,l=null,s=null,y=null,Fe.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){a=Q,i.isPresenting===!0&&$t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&$t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||r},this.setReferenceSpace=function(Q){d=Q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return l===null&&g&&(l=new XRWebGLBinding(s,e)),l},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,te=null,Xt=null;v.depth&&(Xt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=v.stencil?Js:fs,te=v.stencil?Lr:Gi);const Zt={colorFormat:e.RGBA8,depthFormat:Xt,scaleFactor:a};l=this.getBinding(),h=l.createProjectionLayer(Zt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new Wn(h.textureWidth,h.textureHeight,{format:Ei,type:Jn,depthTexture:new Nr(h.textureWidth,h.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const gt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,e,gt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Wn(f.framebufferWidth,f.framebufferHeight,{format:Ei,type:Jn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),d=null,r=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H(Q){for(let ft=0;ft<Q.removed.length;ft++){const gt=Q.removed[ft],te=w.indexOf(gt);te>=0&&(w[te]=null,T[te].disconnect(gt))}for(let ft=0;ft<Q.added.length;ft++){const gt=Q.added[ft];let te=w.indexOf(gt);if(te===-1){for(let Zt=0;Zt<T.length;Zt++)if(Zt>=w.length){w.push(gt),te=Zt;break}else if(w[Zt]===null){w[Zt]=gt,te=Zt;break}if(te===-1)break}const Xt=T[te];Xt&&Xt.connect(gt)}}const et=new F,tt=new F;function ht(Q,ft,gt){et.setFromMatrixPosition(ft.matrixWorld),tt.setFromMatrixPosition(gt.matrixWorld);const te=et.distanceTo(tt),Xt=ft.projectionMatrix.elements,Zt=gt.projectionMatrix.elements,sn=Xt[14]/(Xt[10]-1),he=Xt[14]/(Xt[10]+1),Me=(Xt[9]+1)/Xt[5],Pe=(Xt[9]-1)/Xt[5],oe=(Xt[8]-1)/Xt[0],Xe=(Zt[8]+1)/Zt[0],N=sn*oe,$e=sn*Xe,ge=te/(-oe+Xe),Le=ge*-oe;if(ft.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Le),Q.translateZ(ge),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Xt[10]===-1)Q.projectionMatrix.copy(ft.projectionMatrix),Q.projectionMatrixInverse.copy(ft.projectionMatrixInverse);else{const Lt=sn+ge,P=he+ge,E=N-Le,z=$e+(te-Le),J=Me*he/P*Lt,st=Pe*he/P*Lt;Q.projectionMatrix.makePerspective(E,z,J,st,Lt,P),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function lt(Q,ft){ft===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ft.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ft=Q.near,gt=Q.far;p.texture!==null&&(p.depthNear>0&&(ft=p.depthNear),p.depthFar>0&&(gt=p.depthFar)),U.near=I.near=S.near=ft,U.far=I.far=S.far=gt,(L!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),L=U.near,k=U.far),U.layers.mask=Q.layers.mask|6,S.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;const te=Q.parent,Xt=U.cameras;lt(U,te);for(let Zt=0;Zt<Xt.length;Zt++)lt(Xt[Zt],te);Xt.length===2?ht(U,S,I):U.projectionMatrix.copy(S.projectionMatrix),ct(Q,U,te)};function ct(Q,ft,gt){gt===null?Q.matrix.copy(ft.matrixWorld):(Q.matrix.copy(gt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ft.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ft.projectionMatrix),Q.projectionMatrixInverse.copy(ft.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Td*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(Q){c=Q,h!==null&&(h.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(Q){return m[Q]};let Wt=null;function be(Q,ft){if(u=ft.getViewerPose(d||r),_=ft,u!==null){const gt=u.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let te=!1;gt.length!==U.cameras.length&&(U.cameras.length=0,te=!0);for(let he=0;he<gt.length;he++){const Me=gt[he];let Pe=null;if(f!==null)Pe=f.getViewport(Me);else{const Xe=l.getViewSubImage(h,Me);Pe=Xe.viewport,he===0&&(t.setRenderTargetTextures(y,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(y))}let oe=C[he];oe===void 0&&(oe=new ri,oe.layers.enable(he),oe.viewport=new We,C[he]=oe),oe.matrix.fromArray(Me.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(Me.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),he===0&&(U.matrix.copy(oe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),te===!0&&U.cameras.push(oe)}const Xt=s.enabledFeatures;if(Xt&&Xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){l=i.getBinding();const he=l.getDepthInformation(gt[0]);he&&he.isValid&&he.texture&&p.init(he,s.renderState)}if(Xt&&Xt.includes("camera-access")&&g){t.state.unbindTexture(),l=i.getBinding();for(let he=0;he<gt.length;he++){const Me=gt[he].camera;if(Me){let Pe=m[Me];Pe||(Pe=new Vp,m[Me]=Pe);const oe=l.getCameraImage(Me);Pe.sourceTexture=oe}}}}for(let gt=0;gt<T.length;gt++){const te=w[gt],Xt=T[gt];te!==null&&Xt!==void 0&&Xt.update(te,ft,d||r)}Wt&&Wt(Q,ft),ft.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ft}),_=null}const Fe=new $p;Fe.setAnimationLoop(be),this.setAnimationLoop=function(Q){Wt=Q},this.dispose=function(){}}}const qs=new ki,w1=new Ge;function b1(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Wp(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,v,M,y){m.isMeshBasicMaterial?a(p,m):m.isMeshLambertMaterial?(a(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(p,m),l(p,m)):m.isMeshPhongMaterial?(a(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(a(p,m),_(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),g(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(r(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,v,M):m.isSpriteMaterial?d(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Vn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Vn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=t.get(m),M=v.envMap,y=v.envMapRotation;M&&(p.envMap.value=M,qs.copy(y),qs.x*=-1,qs.y*=-1,qs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),p.envMapRotation.value.setFromMatrix4(w1.makeRotationFromEuler(qs)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function r(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,v,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=M*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function d(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function l(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Vn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const v=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function T1(n,t,e,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const y=M.program;i.uniformBlockBinding(v,y)}function d(v,M){let y=s[v.id];y===void 0&&(_(v),y=u(v),s[v.id]=y,v.addEventListener("dispose",p));const T=M.program;i.updateUBOMapping(v,T);const w=t.render.frame;a[v.id]!==w&&(h(v),a[v.id]=w)}function u(v){const M=l();v.__bindingPointIndex=M;const y=n.createBuffer(),T=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,T,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,y),y}function l(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const M=s[v.id],y=v.uniforms,T=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,A=y.length;w<A;w++){const x=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,I=x.length;S<I;S++){const C=x[S];if(f(C,w,S,T)===!0){const U=C.__offset,L=Array.isArray(C.value)?C.value:[C.value];let k=0;for(let B=0;B<L.length;B++){const V=L[B],H=g(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,U+k,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,k),k+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,M,y,T){const w=v.value,A=M+"_"+y;if(T[A]===void 0)return typeof w=="number"||typeof w=="boolean"?T[A]=w:T[A]=w.clone(),!0;{const x=T[A];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return T[A]=w,!0}else if(x.equals(w)===!1)return x.copy(w),!0}return!1}function _(v){const M=v.uniforms;let y=0;const T=16;for(let A=0,x=M.length;A<x;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let I=0,C=S.length;I<C;I++){const U=S[I],L=Array.isArray(U.value)?U.value:[U.value];for(let k=0,B=L.length;k<B;k++){const V=L[k],H=g(V),et=y%T,tt=et%H.boundary,ht=et+tt;y+=tt,ht!==0&&T-ht<H.storage&&(y+=T-ht),U.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=H.storage}}}const w=y%T;return w>0&&(y+=T-w),v.__size=y,v.__cache={},this}function g(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?$t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):$t("WebGLRenderer: Unsupported uniform value type.",v),M}function p(v){const M=v.target;M.removeEventListener("dispose",p);const y=r.indexOf(M.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function m(){for(const v in s)n.deleteBuffer(s[v]);r=[],s={},a={}}return{bind:c,update:d,dispose:m}}const A1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ai=null;function R1(){return Ai===null&&(Ai=new px(A1,16,16,Ka,ti),Ai.name="DFG_LUT",Ai.minFilter=Tn,Ai.magFilter=Tn,Ai.wrapS=os,Ai.wrapT=os,Ai.generateMipmaps=!1,Ai.needsUpdate=!0),Ai}class C1{constructor(t={}){const{canvas:e=Wg(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:l=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Jn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;const g=f,p=new Set([fu,hu,uu]),m=new Set([Jn,Gi,Ir,Lr,cu,du]),v=new Uint32Array(4),M=new Int32Array(4);let y=null,T=null;const w=[],A=[];let x=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let I=!1;this._outputColorSpace=si;let C=0,U=0,L=null,k=-1,B=null;const V=new We,H=new We;let et=null;const tt=new Ht(0);let ht=0,lt=e.width,ct=e.height,Wt=1,be=null,Fe=null;const Q=new We(0,0,lt,ct),ft=new We(0,0,lt,ct);let gt=!1;const te=new vu;let Xt=!1,Zt=!1;const sn=new Ge,he=new F,Me=new We,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let oe=!1;function Xe(){return L===null?Wt:1}let N=i;function $e(R,G){return e.getContext(R,G)}try{const R={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:l};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ru}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",Ue,!1),N===null){const G="webgl2";if(N=$e(G,R),N===null)throw $e(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw fe("WebGLRenderer: "+R.message),R}let ge,Le,Lt,P,E,z,J,st,K,At,pt,Bt,Yt,at,dt,Rt,Dt,St,le,O,mt,ut,bt;function ot(){ge=new Cy(N),ge.init(),mt=new v1(N,ge),Le=new yy(N,ge,t,mt),Lt=new g1(N,ge),Le.reversedDepthBuffer&&h&&Lt.buffers.depth.setReversed(!0),P=new Iy(N),E=new i1,z=new x1(N,ge,Lt,E,Le,mt,P),J=new Ry(S),st=new Ox(N),ut=new vy(N,st),K=new Py(N,st,P,ut),At=new Uy(N,K,st,ut,P),St=new Ly(N,Le,z),dt=new Sy(E),pt=new n1(S,J,ge,Le,ut,dt),Bt=new b1(S,E),Yt=new a1,at=new u1(ge),Dt=new xy(S,J,Lt,At,_,c),Rt=new _1(S,At,Le),bt=new T1(N,P,Le,Lt),le=new My(N,ge,P),O=new Dy(N,ge,P),P.programs=pt.programs,S.capabilities=Le,S.extensions=ge,S.properties=E,S.renderLists=Yt,S.shadowMap=Rt,S.state=Lt,S.info=P}ot(),g!==Jn&&(x=new Fy(g,e.width,e.height,s,a));const j=new E1(S,N);this.xr=j,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const R=ge.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ge.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Wt},this.setPixelRatio=function(R){R!==void 0&&(Wt=R,this.setSize(lt,ct,!1))},this.getSize=function(R){return R.set(lt,ct)},this.setSize=function(R,G,Y=!0){if(j.isPresenting){$t("WebGLRenderer: Can't change size while VR device is presenting.");return}lt=R,ct=G,e.width=Math.floor(R*Wt),e.height=Math.floor(G*Wt),Y===!0&&(e.style.width=R+"px",e.style.height=G+"px"),x!==null&&x.setSize(e.width,e.height),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(lt*Wt,ct*Wt).floor()},this.setDrawingBufferSize=function(R,G,Y){lt=R,ct=G,Wt=Y,e.width=Math.floor(R*Y),e.height=Math.floor(G*Y),this.setViewport(0,0,R,G)},this.setEffects=function(R){if(g===Jn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let G=0;G<R.length;G++)if(R[G].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(V)},this.getViewport=function(R){return R.copy(Q)},this.setViewport=function(R,G,Y,X){R.isVector4?Q.set(R.x,R.y,R.z,R.w):Q.set(R,G,Y,X),Lt.viewport(V.copy(Q).multiplyScalar(Wt).round())},this.getScissor=function(R){return R.copy(ft)},this.setScissor=function(R,G,Y,X){R.isVector4?ft.set(R.x,R.y,R.z,R.w):ft.set(R,G,Y,X),Lt.scissor(H.copy(ft).multiplyScalar(Wt).round())},this.getScissorTest=function(){return gt},this.setScissorTest=function(R){Lt.setScissorTest(gt=R)},this.setOpaqueSort=function(R){be=R},this.setTransparentSort=function(R){Fe=R},this.getClearColor=function(R){return R.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor(...arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha(...arguments)},this.clear=function(R=!0,G=!0,Y=!0){let X=0;if(R){let W=!1;if(L!==null){const vt=L.texture.format;W=p.has(vt)}if(W){const vt=L.texture.type,wt=m.has(vt),Mt=Dt.getClearColor(),It=Dt.getClearAlpha(),Nt=Mt.r,Jt=Mt.g,ce=Mt.b;wt?(v[0]=Nt,v[1]=Jt,v[2]=ce,v[3]=It,N.clearBufferuiv(N.COLOR,0,v)):(M[0]=Nt,M[1]=Jt,M[2]=ce,M[3]=It,N.clearBufferiv(N.COLOR,0,M))}else X|=N.COLOR_BUFFER_BIT}G&&(X|=N.DEPTH_BUFFER_BIT),Y&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Ue,!1),Dt.dispose(),Yt.dispose(),at.dispose(),E.dispose(),J.dispose(),At.dispose(),ut.dispose(),bt.dispose(),pt.dispose(),j.dispose(),j.removeEventListener("sessionstart",Wu),j.removeEventListener("sessionend",Xu),zs.stop()};function Ct(R){R.preventDefault(),Dh("WebGLRenderer: Context Lost."),I=!0}function jt(){Dh("WebGLRenderer: Context Restored."),I=!1;const R=P.autoReset,G=Rt.enabled,Y=Rt.autoUpdate,X=Rt.needsUpdate,W=Rt.type;ot(),P.autoReset=R,Rt.enabled=G,Rt.autoUpdate=Y,Rt.needsUpdate=X,Rt.type=W}function Ue(R){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ye(R){const G=R.target;G.removeEventListener("dispose",ye),qi(G)}function qi(R){Yi(R),E.remove(R)}function Yi(R){const G=E.get(R).programs;G!==void 0&&(G.forEach(function(Y){pt.releaseProgram(Y)}),R.isShaderMaterial&&pt.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,Y,X,W,vt){G===null&&(G=Pe);const wt=W.isMesh&&W.matrixWorld.determinant()<0,Mt=Xm(R,G,Y,X,W);Lt.setMaterial(X,wt);let It=Y.index,Nt=1;if(X.wireframe===!0){if(It=K.getWireframeAttribute(Y),It===void 0)return;Nt=2}const Jt=Y.drawRange,ce=Y.attributes.position;let Ot=Jt.start*Nt,Te=(Jt.start+Jt.count)*Nt;vt!==null&&(Ot=Math.max(Ot,vt.start*Nt),Te=Math.min(Te,(vt.start+vt.count)*Nt)),It!==null?(Ot=Math.max(Ot,0),Te=Math.min(Te,It.count)):ce!=null&&(Ot=Math.max(Ot,0),Te=Math.min(Te,ce.count));const qe=Te-Ot;if(qe<0||qe===1/0)return;ut.setup(W,X,Mt,Y,It);let Ve,Ae=le;if(It!==null&&(Ve=st.get(It),Ae=O,Ae.setIndex(Ve)),W.isMesh)X.wireframe===!0?(Lt.setLineWidth(X.wireframeLinewidth*Xe()),Ae.setMode(N.LINES)):Ae.setMode(N.TRIANGLES);else if(W.isLine){let vn=X.linewidth;vn===void 0&&(vn=1),Lt.setLineWidth(vn*Xe()),W.isLineSegments?Ae.setMode(N.LINES):W.isLineLoop?Ae.setMode(N.LINE_LOOP):Ae.setMode(N.LINE_STRIP)}else W.isPoints?Ae.setMode(N.POINTS):W.isSprite&&Ae.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Jo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ae.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))Ae.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const vn=W._multiDrawStarts,Ut=W._multiDrawCounts,qn=W._multiDrawCount,me=It?st.get(It).bytesPerElement:1,ci=E.get(X).currentProgram.getUniforms();for(let bi=0;bi<qn;bi++)ci.setValue(N,"_gl_DrawID",bi),Ae.render(vn[bi]/me,Ut[bi])}else if(W.isInstancedMesh)Ae.renderInstances(Ot,qe,W.count);else if(Y.isInstancedBufferGeometry){const vn=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ut=Math.min(Y.instanceCount,vn);Ae.renderInstances(Ot,qe,Ut)}else Ae.render(Ot,qe)};function Vu(R,G,Y){R.transparent===!0&&R.side===Kn&&R.forceSinglePass===!1?(R.side=Vn,R.needsUpdate=!0,eo(R,G,Y),R.side=Is,R.needsUpdate=!0,eo(R,G,Y),R.side=Kn):eo(R,G,Y)}this.compile=function(R,G,Y=null){Y===null&&(Y=R),T=at.get(Y),T.init(G),A.push(T),Y.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),R!==Y&&R.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights();const X=new Set;return R.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const vt=W.material;if(vt)if(Array.isArray(vt))for(let wt=0;wt<vt.length;wt++){const Mt=vt[wt];Vu(Mt,Y,W),X.add(Mt)}else Vu(vt,Y,W),X.add(vt)}),T=A.pop(),X},this.compileAsync=function(R,G,Y=null){const X=this.compile(R,G,Y);return new Promise(W=>{function vt(){if(X.forEach(function(wt){E.get(wt).currentProgram.isReady()&&X.delete(wt)}),X.size===0){W(R);return}setTimeout(vt,10)}ge.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Ol=null;function Wm(R){Ol&&Ol(R)}function Wu(){zs.stop()}function Xu(){zs.start()}const zs=new $p;zs.setAnimationLoop(Wm),typeof self<"u"&&zs.setContext(self),this.setAnimationLoop=function(R){Ol=R,j.setAnimationLoop(R),R===null?zs.stop():zs.start()},j.addEventListener("sessionstart",Wu),j.addEventListener("sessionend",Xu),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;const Y=j.enabled===!0&&j.isPresenting===!0,X=x!==null&&(L===null||Y)&&x.begin(S,L);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(G),G=j.getCamera()),R.isScene===!0&&R.onBeforeRender(S,R,G,L),T=at.get(R,A.length),T.init(G),A.push(T),sn.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),te.setFromProjectionMatrix(sn,Li,G.reversedDepth),Zt=this.localClippingEnabled,Xt=dt.init(this.clippingPlanes,Zt),y=Yt.get(R,w.length),y.init(),w.push(y),j.enabled===!0&&j.isPresenting===!0){const wt=S.xr.getDepthSensingMesh();wt!==null&&Bl(wt,G,-1/0,S.sortObjects)}Bl(R,G,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(be,Fe),oe=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,oe&&Dt.addToRenderList(y,R),this.info.render.frame++,Xt===!0&&dt.beginShadows();const W=T.state.shadowsArray;if(Rt.render(W,R,G),Xt===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(X&&x.hasRenderPass())===!1){const wt=y.opaque,Mt=y.transmissive;if(T.setupLights(),G.isArrayCamera){const It=G.cameras;if(Mt.length>0)for(let Nt=0,Jt=It.length;Nt<Jt;Nt++){const ce=It[Nt];Yu(wt,Mt,R,ce)}oe&&Dt.render(R);for(let Nt=0,Jt=It.length;Nt<Jt;Nt++){const ce=It[Nt];qu(y,R,ce,ce.viewport)}}else Mt.length>0&&Yu(wt,Mt,R,G),oe&&Dt.render(R),qu(y,R,G)}L!==null&&U===0&&(z.updateMultisampleRenderTarget(L),z.updateRenderTargetMipmap(L)),X&&x.end(S),R.isScene===!0&&R.onAfterRender(S,R,G),ut.resetDefaultState(),k=-1,B=null,A.pop(),A.length>0?(T=A[A.length-1],Xt===!0&&dt.setGlobalState(S.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?y=w[w.length-1]:y=null};function Bl(R,G,Y,X){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)T.pushLight(R),R.castShadow&&T.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||te.intersectsSprite(R)){X&&Me.setFromMatrixPosition(R.matrixWorld).applyMatrix4(sn);const wt=At.update(R),Mt=R.material;Mt.visible&&y.push(R,wt,Mt,Y,Me.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||te.intersectsObject(R))){const wt=At.update(R),Mt=R.material;if(X&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Me.copy(R.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Me.copy(wt.boundingSphere.center)),Me.applyMatrix4(R.matrixWorld).applyMatrix4(sn)),Array.isArray(Mt)){const It=wt.groups;for(let Nt=0,Jt=It.length;Nt<Jt;Nt++){const ce=It[Nt],Ot=Mt[ce.materialIndex];Ot&&Ot.visible&&y.push(R,wt,Ot,Y,Me.z,ce)}}else Mt.visible&&y.push(R,wt,Mt,Y,Me.z,null)}}const vt=R.children;for(let wt=0,Mt=vt.length;wt<Mt;wt++)Bl(vt[wt],G,Y,X)}function qu(R,G,Y,X){const{opaque:W,transmissive:vt,transparent:wt}=R;T.setupLightsView(Y),Xt===!0&&dt.setGlobalState(S.clippingPlanes,Y),X&&Lt.viewport(V.copy(X)),W.length>0&&to(W,G,Y),vt.length>0&&to(vt,G,Y),wt.length>0&&to(wt,G,Y),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Yu(R,G,Y,X){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[X.id]===void 0){const Ot=ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[X.id]=new Wn(1,1,{generateMipmaps:!0,type:Ot?ti:Jn,minFilter:Ks,samples:Math.max(4,Le.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace})}const vt=T.state.transmissionRenderTarget[X.id],wt=X.viewport||V;vt.setSize(wt.z*S.transmissionResolutionScale,wt.w*S.transmissionResolutionScale);const Mt=S.getRenderTarget(),It=S.getActiveCubeFace(),Nt=S.getActiveMipmapLevel();S.setRenderTarget(vt),S.getClearColor(tt),ht=S.getClearAlpha(),ht<1&&S.setClearColor(16777215,.5),S.clear(),oe&&Dt.render(Y);const Jt=S.toneMapping;S.toneMapping=Oi;const ce=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),T.setupLightsView(X),Xt===!0&&dt.setGlobalState(S.clippingPlanes,X),to(R,Y,X),z.updateMultisampleRenderTarget(vt),z.updateRenderTargetMipmap(vt),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Te=0,qe=G.length;Te<qe;Te++){const Ve=G[Te],{object:Ae,geometry:vn,material:Ut,group:qn}=Ve;if(Ut.side===Kn&&Ae.layers.test(X.layers)){const me=Ut.side;Ut.side=Vn,Ut.needsUpdate=!0,$u(Ae,Y,X,vn,Ut,qn),Ut.side=me,Ut.needsUpdate=!0,Ot=!0}}Ot===!0&&(z.updateMultisampleRenderTarget(vt),z.updateRenderTargetMipmap(vt))}S.setRenderTarget(Mt,It,Nt),S.setClearColor(tt,ht),ce!==void 0&&(X.viewport=ce),S.toneMapping=Jt}function to(R,G,Y){const X=G.isScene===!0?G.overrideMaterial:null;for(let W=0,vt=R.length;W<vt;W++){const wt=R[W],{object:Mt,geometry:It,group:Nt}=wt;let Jt=wt.material;Jt.allowOverride===!0&&X!==null&&(Jt=X),Mt.layers.test(Y.layers)&&$u(Mt,G,Y,It,Jt,Nt)}}function $u(R,G,Y,X,W,vt){R.onBeforeRender(S,G,Y,X,W,vt),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),W.onBeforeRender(S,G,Y,X,R,vt),W.transparent===!0&&W.side===Kn&&W.forceSinglePass===!1?(W.side=Vn,W.needsUpdate=!0,S.renderBufferDirect(Y,G,X,W,R,vt),W.side=Is,W.needsUpdate=!0,S.renderBufferDirect(Y,G,X,W,R,vt),W.side=Kn):S.renderBufferDirect(Y,G,X,W,R,vt),R.onAfterRender(S,G,Y,X,W,vt)}function eo(R,G,Y){G.isScene!==!0&&(G=Pe);const X=E.get(R),W=T.state.lights,vt=T.state.shadowsArray,wt=W.state.version,Mt=pt.getParameters(R,W.state,vt,G,Y),It=pt.getProgramCacheKey(Mt);let Nt=X.programs;X.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?G.environment:null,X.fog=G.fog;const Jt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;X.envMap=J.get(R.envMap||X.environment,Jt),X.envMapRotation=X.environment!==null&&R.envMap===null?G.environmentRotation:R.envMapRotation,Nt===void 0&&(R.addEventListener("dispose",ye),Nt=new Map,X.programs=Nt);let ce=Nt.get(It);if(ce!==void 0){if(X.currentProgram===ce&&X.lightsStateVersion===wt)return ju(R,Mt),ce}else Mt.uniforms=pt.getUniforms(R),R.onBeforeCompile(Mt,S),ce=pt.acquireProgram(Mt,It),Nt.set(It,ce),X.uniforms=Mt.uniforms;const Ot=X.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ot.clippingPlanes=dt.uniform),ju(R,Mt),X.needsLights=Ym(R),X.lightsStateVersion=wt,X.needsLights&&(Ot.ambientLightColor.value=W.state.ambient,Ot.lightProbe.value=W.state.probe,Ot.directionalLights.value=W.state.directional,Ot.directionalLightShadows.value=W.state.directionalShadow,Ot.spotLights.value=W.state.spot,Ot.spotLightShadows.value=W.state.spotShadow,Ot.rectAreaLights.value=W.state.rectArea,Ot.ltc_1.value=W.state.rectAreaLTC1,Ot.ltc_2.value=W.state.rectAreaLTC2,Ot.pointLights.value=W.state.point,Ot.pointLightShadows.value=W.state.pointShadow,Ot.hemisphereLights.value=W.state.hemi,Ot.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ot.spotLightMatrix.value=W.state.spotLightMatrix,Ot.spotLightMap.value=W.state.spotLightMap,Ot.pointShadowMatrix.value=W.state.pointShadowMatrix),X.currentProgram=ce,X.uniformsList=null,ce}function Zu(R){if(R.uniformsList===null){const G=R.currentProgram.getUniforms();R.uniformsList=Oo.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function ju(R,G){const Y=E.get(R);Y.outputColorSpace=G.outputColorSpace,Y.batching=G.batching,Y.batchingColor=G.batchingColor,Y.instancing=G.instancing,Y.instancingColor=G.instancingColor,Y.instancingMorph=G.instancingMorph,Y.skinning=G.skinning,Y.morphTargets=G.morphTargets,Y.morphNormals=G.morphNormals,Y.morphColors=G.morphColors,Y.morphTargetsCount=G.morphTargetsCount,Y.numClippingPlanes=G.numClippingPlanes,Y.numIntersection=G.numClipIntersection,Y.vertexAlphas=G.vertexAlphas,Y.vertexTangents=G.vertexTangents,Y.toneMapping=G.toneMapping}function Xm(R,G,Y,X,W){G.isScene!==!0&&(G=Pe),z.resetTextureUnits();const vt=G.fog,wt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?G.environment:null,Mt=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ja,It=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Nt=J.get(X.envMap||wt,It),Jt=X.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,ce=!!Y.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ot=!!Y.morphAttributes.position,Te=!!Y.morphAttributes.normal,qe=!!Y.morphAttributes.color;let Ve=Oi;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ve=S.toneMapping);const Ae=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,vn=Ae!==void 0?Ae.length:0,Ut=E.get(X),qn=T.state.lights;if(Xt===!0&&(Zt===!0||R!==B)){const an=R===B&&X.id===k;dt.setState(X,R,an)}let me=!1;X.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==qn.state.version||Ut.outputColorSpace!==Mt||W.isBatchedMesh&&Ut.batching===!1||!W.isBatchedMesh&&Ut.batching===!0||W.isBatchedMesh&&Ut.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ut.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ut.instancing===!1||!W.isInstancedMesh&&Ut.instancing===!0||W.isSkinnedMesh&&Ut.skinning===!1||!W.isSkinnedMesh&&Ut.skinning===!0||W.isInstancedMesh&&Ut.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ut.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ut.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ut.instancingMorph===!1&&W.morphTexture!==null||Ut.envMap!==Nt||X.fog===!0&&Ut.fog!==vt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==dt.numPlanes||Ut.numIntersection!==dt.numIntersection)||Ut.vertexAlphas!==Jt||Ut.vertexTangents!==ce||Ut.morphTargets!==Ot||Ut.morphNormals!==Te||Ut.morphColors!==qe||Ut.toneMapping!==Ve||Ut.morphTargetsCount!==vn)&&(me=!0):(me=!0,Ut.__version=X.version);let ci=Ut.currentProgram;me===!0&&(ci=eo(X,G,W));let bi=!1,Hs=!1,da=!1;const De=ci.getUniforms(),hn=Ut.uniforms;if(Lt.useProgram(ci.program)&&(bi=!0,Hs=!0,da=!0),X.id!==k&&(k=X.id,Hs=!0),bi||B!==R){Lt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),De.setValue(N,"projectionMatrix",R.projectionMatrix),De.setValue(N,"viewMatrix",R.matrixWorldInverse);const ms=De.map.cameraPosition;ms!==void 0&&ms.setValue(N,he.setFromMatrixPosition(R.matrixWorld)),Le.logarithmicDepthBuffer&&De.setValue(N,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&De.setValue(N,"isOrthographic",R.isOrthographicCamera===!0),B!==R&&(B=R,Hs=!0,da=!0)}if(Ut.needsLights&&(qn.state.directionalShadowMap.length>0&&De.setValue(N,"directionalShadowMap",qn.state.directionalShadowMap,z),qn.state.spotShadowMap.length>0&&De.setValue(N,"spotShadowMap",qn.state.spotShadowMap,z),qn.state.pointShadowMap.length>0&&De.setValue(N,"pointShadowMap",qn.state.pointShadowMap,z)),W.isSkinnedMesh){De.setOptional(N,W,"bindMatrix"),De.setOptional(N,W,"bindMatrixInverse");const an=W.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),De.setValue(N,"boneTexture",an.boneTexture,z))}W.isBatchedMesh&&(De.setOptional(N,W,"batchingTexture"),De.setValue(N,"batchingTexture",W._matricesTexture,z),De.setOptional(N,W,"batchingIdTexture"),De.setValue(N,"batchingIdTexture",W._indirectTexture,z),De.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&De.setValue(N,"batchingColorTexture",W._colorsTexture,z));const ps=Y.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&St.update(W,Y,ci),(Hs||Ut.receiveShadow!==W.receiveShadow)&&(Ut.receiveShadow=W.receiveShadow,De.setValue(N,"receiveShadow",W.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&G.environment!==null&&(hn.envMapIntensity.value=G.environmentIntensity),hn.dfgLUT!==void 0&&(hn.dfgLUT.value=R1()),Hs&&(De.setValue(N,"toneMappingExposure",S.toneMappingExposure),Ut.needsLights&&qm(hn,da),vt&&X.fog===!0&&Bt.refreshFogUniforms(hn,vt),Bt.refreshMaterialUniforms(hn,X,Wt,ct,T.state.transmissionRenderTarget[R.id]),Oo.upload(N,Zu(Ut),hn,z)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Oo.upload(N,Zu(Ut),hn,z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&De.setValue(N,"center",W.center),De.setValue(N,"modelViewMatrix",W.modelViewMatrix),De.setValue(N,"normalMatrix",W.normalMatrix),De.setValue(N,"modelMatrix",W.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const an=X.uniformsGroups;for(let ms=0,ua=an.length;ms<ua;ms++){const Ku=an[ms];bt.update(Ku,ci),bt.bind(Ku,ci)}}return ci}function qm(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function Ym(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,G,Y){const X=E.get(R);X.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),E.get(R.texture).__webglTexture=G,E.get(R.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:Y,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,G){const Y=E.get(R);Y.__webglFramebuffer=G,Y.__useDefaultFramebuffer=G===void 0};const $m=N.createFramebuffer();this.setRenderTarget=function(R,G=0,Y=0){L=R,C=G,U=Y;let X=null,W=!1,vt=!1;if(R){const Mt=E.get(R);if(Mt.__useDefaultFramebuffer!==void 0){Lt.bindFramebuffer(N.FRAMEBUFFER,Mt.__webglFramebuffer),V.copy(R.viewport),H.copy(R.scissor),et=R.scissorTest,Lt.viewport(V),Lt.scissor(H),Lt.setScissorTest(et),k=-1;return}else if(Mt.__webglFramebuffer===void 0)z.setupRenderTarget(R);else if(Mt.__hasExternalTextures)z.rebindTextures(R,E.get(R.texture).__webglTexture,E.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Jt=R.depthTexture;if(Mt.__boundDepthTexture!==Jt){if(Jt!==null&&E.has(Jt)&&(R.width!==Jt.image.width||R.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(R)}}const It=R.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(vt=!0);const Nt=E.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Nt[G])?X=Nt[G][Y]:X=Nt[G],W=!0):R.samples>0&&z.useMultisampledRTT(R)===!1?X=E.get(R).__webglMultisampledFramebuffer:Array.isArray(Nt)?X=Nt[Y]:X=Nt,V.copy(R.viewport),H.copy(R.scissor),et=R.scissorTest}else V.copy(Q).multiplyScalar(Wt).floor(),H.copy(ft).multiplyScalar(Wt).floor(),et=gt;if(Y!==0&&(X=$m),Lt.bindFramebuffer(N.FRAMEBUFFER,X)&&Lt.drawBuffers(R,X),Lt.viewport(V),Lt.scissor(H),Lt.setScissorTest(et),W){const Mt=E.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+G,Mt.__webglTexture,Y)}else if(vt){const Mt=G;for(let It=0;It<R.textures.length;It++){const Nt=E.get(R.textures[It]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+It,Nt.__webglTexture,Y,Mt)}}else if(R!==null&&Y!==0){const Mt=E.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mt.__webglTexture,Y)}k=-1},this.readRenderTargetPixels=function(R,G,Y,X,W,vt,wt,Mt=0){if(!(R&&R.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=E.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(It=It[wt]),It){Lt.bindFramebuffer(N.FRAMEBUFFER,It);try{const Nt=R.textures[Mt],Jt=Nt.format,ce=Nt.type;if(R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Mt),!Le.textureFormatReadable(Jt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(ce)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-X&&Y>=0&&Y<=R.height-W&&N.readPixels(G,Y,X,W,mt.convert(Jt),mt.convert(ce),vt)}finally{const Nt=L!==null?E.get(L).__webglFramebuffer:null;Lt.bindFramebuffer(N.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(R,G,Y,X,W,vt,wt,Mt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=E.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(It=It[wt]),It)if(G>=0&&G<=R.width-X&&Y>=0&&Y<=R.height-W){Lt.bindFramebuffer(N.FRAMEBUFFER,It);const Nt=R.textures[Mt],Jt=Nt.format,ce=Nt.type;if(R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Mt),!Le.textureFormatReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ot=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ot),N.bufferData(N.PIXEL_PACK_BUFFER,vt.byteLength,N.STREAM_READ),N.readPixels(G,Y,X,W,mt.convert(Jt),mt.convert(ce),0);const Te=L!==null?E.get(L).__webglFramebuffer:null;Lt.bindFramebuffer(N.FRAMEBUFFER,Te);const qe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Xg(N,qe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ot),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,vt),N.deleteBuffer(Ot),N.deleteSync(qe),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,G=null,Y=0){const X=Math.pow(2,-Y),W=Math.floor(R.image.width*X),vt=Math.floor(R.image.height*X),wt=G!==null?G.x:0,Mt=G!==null?G.y:0;z.setTexture2D(R,0),N.copyTexSubImage2D(N.TEXTURE_2D,Y,0,0,wt,Mt,W,vt),Lt.unbindTexture()};const Zm=N.createFramebuffer(),jm=N.createFramebuffer();this.copyTextureToTexture=function(R,G,Y=null,X=null,W=0,vt=0){let wt,Mt,It,Nt,Jt,ce,Ot,Te,qe;const Ve=R.isCompressedTexture?R.mipmaps[vt]:R.image;if(Y!==null)wt=Y.max.x-Y.min.x,Mt=Y.max.y-Y.min.y,It=Y.isBox3?Y.max.z-Y.min.z:1,Nt=Y.min.x,Jt=Y.min.y,ce=Y.isBox3?Y.min.z:0;else{const hn=Math.pow(2,-W);wt=Math.floor(Ve.width*hn),Mt=Math.floor(Ve.height*hn),R.isDataArrayTexture?It=Ve.depth:R.isData3DTexture?It=Math.floor(Ve.depth*hn):It=1,Nt=0,Jt=0,ce=0}X!==null?(Ot=X.x,Te=X.y,qe=X.z):(Ot=0,Te=0,qe=0);const Ae=mt.convert(G.format),vn=mt.convert(G.type);let Ut;G.isData3DTexture?(z.setTexture3D(G,0),Ut=N.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(z.setTexture2DArray(G,0),Ut=N.TEXTURE_2D_ARRAY):(z.setTexture2D(G,0),Ut=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,G.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,G.unpackAlignment);const qn=N.getParameter(N.UNPACK_ROW_LENGTH),me=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ci=N.getParameter(N.UNPACK_SKIP_PIXELS),bi=N.getParameter(N.UNPACK_SKIP_ROWS),Hs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ve.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ve.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Nt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Jt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ce);const da=R.isDataArrayTexture||R.isData3DTexture,De=G.isDataArrayTexture||G.isData3DTexture;if(R.isDepthTexture){const hn=E.get(R),ps=E.get(G),an=E.get(hn.__renderTarget),ms=E.get(ps.__renderTarget);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,an.__webglFramebuffer),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,ms.__webglFramebuffer);for(let ua=0;ua<It;ua++)da&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(R).__webglTexture,W,ce+ua),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,E.get(G).__webglTexture,vt,qe+ua)),N.blitFramebuffer(Nt,Jt,wt,Mt,Ot,Te,wt,Mt,N.DEPTH_BUFFER_BIT,N.NEAREST);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(W!==0||R.isRenderTargetTexture||E.has(R)){const hn=E.get(R),ps=E.get(G);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,Zm),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,jm);for(let an=0;an<It;an++)da?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,hn.__webglTexture,W,ce+an):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,hn.__webglTexture,W),De?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ps.__webglTexture,vt,qe+an):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ps.__webglTexture,vt),W!==0?N.blitFramebuffer(Nt,Jt,wt,Mt,Ot,Te,wt,Mt,N.COLOR_BUFFER_BIT,N.NEAREST):De?N.copyTexSubImage3D(Ut,vt,Ot,Te,qe+an,Nt,Jt,wt,Mt):N.copyTexSubImage2D(Ut,vt,Ot,Te,Nt,Jt,wt,Mt);Lt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else De?R.isDataTexture||R.isData3DTexture?N.texSubImage3D(Ut,vt,Ot,Te,qe,wt,Mt,It,Ae,vn,Ve.data):G.isCompressedArrayTexture?N.compressedTexSubImage3D(Ut,vt,Ot,Te,qe,wt,Mt,It,Ae,Ve.data):N.texSubImage3D(Ut,vt,Ot,Te,qe,wt,Mt,It,Ae,vn,Ve):R.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,vt,Ot,Te,wt,Mt,Ae,vn,Ve.data):R.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,vt,Ot,Te,Ve.width,Ve.height,Ae,Ve.data):N.texSubImage2D(N.TEXTURE_2D,vt,Ot,Te,wt,Mt,Ae,vn,Ve);N.pixelStorei(N.UNPACK_ROW_LENGTH,qn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,me),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ci),N.pixelStorei(N.UNPACK_SKIP_ROWS,bi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Hs),vt===0&&G.generateMipmaps&&N.generateMipmap(Ut),Lt.unbindTexture()},this.initRenderTarget=function(R){E.get(R).__webglFramebuffer===void 0&&z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?z.setTextureCube(R,0):R.isData3DTexture?z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?z.setTexture2DArray(R,0):z.setTexture2D(R,0),Lt.unbindTexture()},this.resetState=function(){C=0,U=0,L=null,Lt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}}const Cf={type:"change"},Su={type:"start"},tm={type:"end"},Ro=new Al,Pf=new Ri,P1=Math.cos(70*$g.DEG2RAD),Ke=new F,On=2*Math.PI,Re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sc=1e-6;class D1 extends Nx{constructor(t,e=null){super(t,e),this.state=Re.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ds.ROTATE,MIDDLE:ds.DOLLY,RIGHT:ds.PAN},this.touches={ONE:Ua.ROTATE,TWO:Ua.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Ls,this._lastTargetPosition=new F,this._quat=new Ls().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new sf,this._sphericalDelta=new sf,this._scale=1,this._panOffset=new F,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new F,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=L1.bind(this),this._onPointerDown=I1.bind(this),this._onPointerUp=U1.bind(this),this._onContextMenu=G1.bind(this),this._onMouseWheel=O1.bind(this),this._onKeyDown=B1.bind(this),this._onTouchStart=z1.bind(this),this._onTouchMove=H1.bind(this),this._onMouseDown=N1.bind(this),this._onMouseMove=F1.bind(this),this._interceptControlDown=k1.bind(this),this._interceptControlUp=V1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Cf),this.update(),this.state=Re.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ke.copy(e).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===Re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=On:i>Math.PI&&(i-=On),s<-Math.PI?s+=On:s>Math.PI&&(s-=On),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Ke.length();r=this._clampDistance(o*this._scale);const c=o-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),a=!!c}else if(this.object.isOrthographicCamera){const o=new F(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=c!==this.object.zoom;const d=new F(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(o),this.object.updateMatrixWorld(),r=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Ro.origin.copy(this.object.position),Ro.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ro.direction))<P1?this.object.lookAt(this.target):(Pf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ro.intersectPlane(Pf,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Sc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sc||this._lastTargetPosition.distanceToSquared(this.target)>Sc?(this.dispatchEvent(Cf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?On/60*this.autoRotateSpeed*t:On/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ke.setFromMatrixColumn(e,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,e){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(e,1):(Ke.setFromMatrixColumn(e,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ke.copy(s).sub(this.target);let a=Ke.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/i.clientHeight,this.object.matrix),this._panUp(2*e*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,a=e-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(On*this._rotateDelta.x/e.clientHeight),this._rotateUp(On*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(On*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-On*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(On*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-On*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),a=.5*(t.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(On*this._rotateDelta.x/e.clientHeight),this._rotateUp(On*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function I1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function L1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function U1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tm),this.state=Re.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function N1(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ds.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Re.DOLLY;break;case ds.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Re.ROTATE}break;case ds.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Re.PAN}break;default:this.state=Re.NONE}this.state!==Re.NONE&&this.dispatchEvent(Su)}function F1(n){switch(this.state){case Re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function O1(n){this.enabled===!1||this.enableZoom===!1||this.state!==Re.NONE||(n.preventDefault(),this.dispatchEvent(Su),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(tm))}function B1(n){this.enabled!==!1&&this._handleKeyDown(n)}function z1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ua.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Re.TOUCH_ROTATE;break;case Ua.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Re.TOUCH_PAN;break;default:this.state=Re.NONE}break;case 2:switch(this.touches.TWO){case Ua.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Re.TOUCH_DOLLY_PAN;break;case Ua.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Re.TOUCH_DOLLY_ROTATE;break;default:this.state=Re.NONE}break;default:this.state=Re.NONE}this.state!==Re.NONE&&this.dispatchEvent(Su)}function H1(n){switch(this._trackPointer(n),this.state){case Re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Re.NONE}}function G1(n){this.enabled!==!1&&n.preventDefault()}function k1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function V1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Bo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class jr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const W1=new Pl(-1,1,1,-1,0,1);class X1 extends un{constructor(){super(),this.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _e([0,2,0,0,2,0],2))}}const q1=new X1;class em{constructor(t){this._mesh=new b(q1,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,W1)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Y1 extends jr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof An?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=nl.clone(t.uniforms),this.material=new An({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new em(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Df extends jr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class $1 extends jr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Z1{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Pt);this._width=i.width,this._height=i.height,e=new Wn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ti}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Y1(Bo),this.copyPass.material.blending=Fi,this.timer=new Lx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,a=this.passes.length;s<a;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),r.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Df!==void 0&&(r instanceof Df?i=!0:r instanceof $1&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Pt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class j1 extends jr{constructor(t,e,i=null,s=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ht}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let a,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const K1={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ht(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class nr extends jr{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Pt(t.x,t.y):new Pt(256,256),this.clearColor=new Ht(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Wn(a,r,{type:ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const l=new Wn(a,r,{type:ti});l.texture.name="UnrealBloomPass.h"+u,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const h=new Wn(a,r,{type:ti});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),a=Math.round(a/2),r=Math.round(r/2)}const o=K1;this.highPassUniforms=nl.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new An({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Pt(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=nl.clone(Bo.uniforms),this.blendMaterial=new An({uniforms:this.copyUniforms,vertexShader:Bo.vertexShader,fragmentShader:Bo.fragmentShader,premultipliedAlpha:!0,blending:Fc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ht,this._oldClearAlpha=1,this._basic=new Nn,this._fsQuad=new em(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,s),this.renderTargetsVertical[a].setSize(i,s),this.separableBlurMaterials[a].uniforms.invSize.value=new Pt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=nr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=nr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=r}_getSeparableBlurMaterial(t){const e=[],i=t/3;for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new An({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Pt(.5,.5)},direction:{value:new Pt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new An({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}nr.BlurDirectionX=new Pt(1,0);nr.BlurDirectionY=new Pt(0,1);let _i,xi,Zn,Na,ni;function Ft(n){const t=new Ht(n);return new Xp({color:t.clone().multiplyScalar(.25),metalness:.7,roughness:.35,emissive:t.clone().multiplyScalar(.05),emissiveIntensity:1})}function Vt(n){return new Nn({color:n})}function yt(n,t=1){return new Nn({color:n,transparent:!0,opacity:t,side:Kn})}function J1(n){_i=new lx,_i.background=new Ht(zt.BG),_i.fog=new xu(zt.BG,18e-5),xi=new ri(d0,ii/Hn,u0,h0),xi.position.set(ii/2,f0,Hn+p0),xi.lookAt(ii/2,0,Hn/2),Zn=new C1({antialias:!0}),Zn.setPixelRatio(window.devicePixelRatio),Zn.toneMapping=ou,Zn.toneMappingExposure=1.1,Zn.setClearColor(new Ht(zt.BG)),n.appendChild(Zn.domElement);const t=n.clientWidth,e=n.clientHeight;Zn.setSize(t,e),xi.aspect=t/e,xi.updateProjectionMatrix(),ni=new D1(xi,Zn.domElement),ni.target.set(ii/2,0,Hn/2),ni.minPolarAngle=m0,ni.maxPolarAngle=_0,ni.minDistance=g0,ni.maxDistance=x0,ni.enableDamping=!0,ni.dampingFactor=v0,ni.panSpeed=1.2,ni.mouseButtons={LEFT:ds.ROTATE,MIDDLE:ds.PAN,RIGHT:ds.PAN};const i=new Px(M0,y0);_i.add(i);const s=new tf(S0,E0);s.position.set(ii*.7,500,-Hn*.3),s.target.position.set(ii/2,0,Hn/2),_i.add(s),_i.add(s.target);const a=new tf(w0,b0);a.position.set(-ii*.3,300,Hn*1.2),_i.add(a);const r=new Ax(T0,A0,R0);_i.add(r),Na=new Z1(Zn),Na.addPass(new j1(_i,xi));const o=new nr(new Pt(t,e),C0,P0,D0);return Na.addPass(o),window.addEventListener("resize",Q1),{scene:_i,camera:xi,renderer:Zn,composer:Na,controls:ni}}function Q1(){const n=Zn.domElement.parentElement;if(!n)return;const t=n.clientWidth,e=n.clientHeight;xi.aspect=t/e,xi.updateProjectionMatrix(),Zn.setSize(t,e),Na.setSize(t,e)}function Be(){return _i}function Eu(){return xi}function tE(){return Na}function il(){return ni}function eE(){return Zn}const wu=qt*Qe,Pi=new Float32Array(wu),Fr=new Int16Array(wu),Ps=new Uint8Array(wu),sl=new Map;let bu=0,ir=0,Pd=!1;function nE(n,t){Pd=!0}function iE(n){n===void 0&&(n=1/60),ir=0,bu+=n,Pd&&(sl.clear(),Pd=!1)}function nm(n){const t=sl.get(n);if(t){if(bu-t.time>s_){sl.delete(n);return}return t.path}}function al(n,t){t&&sl.set(n,{path:t,time:bu})}function im(){return ir>=a_}function rl(n,t,e,i){const s=Math.abs(n-e),a=Math.abs(t-i);return Math.max(s,a)+(Math.SQRT2-1)*Math.min(s,a)}const sm=[{dc:0,dr:-1,cost:1},{dc:0,dr:1,cost:1},{dc:-1,dr:0,cost:1},{dc:1,dr:0,cost:1},{dc:-1,dr:-1,cost:Math.SQRT2},{dc:1,dr:-1,cost:Math.SQRT2},{dc:-1,dr:1,cost:Math.SQRT2},{dc:1,dr:1,cost:Math.SQRT2}];function am(n,t){return[{col:n,row:t-1},{col:n,row:t+1},{col:n-1,row:t},{col:n+1,row:t}].filter(e=>e.col>=0&&e.col<qt&&e.row>=0&&e.row<Qe)}function rm(n){const t=[];let e=n;for(;e!==-1;){const i=e%qt,s=(e-i)/qt;t.push({col:i,row:s}),e=Fr[e]}return t.reverse(),t}function sE(n,t,e,i,s){let a=Math.abs(e-n),r=Math.abs(i-t);const o=n<e?1:-1,c=t<i?1:-1;let d=a-r,u=n,l=t;for(;;){if(!s(u,l))return!1;if(u===e&&l===i)break;const h=2*d;let f=!1,_=!1;if(h>-r&&(d-=r,u+=o,f=!0),h<a&&(d+=a,l+=c,_=!0),f&&_&&(!s(u-o,l)||!s(u,l-c)))return!1}return!0}function aE(n,t){if(n<0||n>=qt||t<0||t>=Qe)return!1;const e=ze(n,t);return e===je||e===kn}function If(n){if(!n||n.length<=2)return n;const t=[n[0]];let e=0;for(;e<n.length-1;){let i=e+1;for(let s=n.length-1;s>e+1;s--)if(sE(n[e].col,n[e].row,n[s].col,n[s].row,aE)){i=s;break}t.push(n[i]),e=i}return t}function zo(n,t,e,i){if(n<0||n>=qt||t<0||t>=Qe||e<0||e>=qt||i<0||i>=Qe)return null;const s=`${n},${t},${e},${i}`,a=nm(s);if(a!==void 0)return a;if(im())return null;const r=ze(e,i);if(r!==je&&r!==kn){const d=am(e,i);let u=null;for(const h of d){const f=ze(h.col,h.row);if(f===je||f===kn){ir++;const _=Lf(n,t,h.col,h.row);_&&(!u||_.length<u.length)&&(u=_)}}const l=u&&If(u);return al(s,l),l}ir++;const o=Lf(n,t,e,i),c=o&&If(o);return al(s,c),c}function Lf(n,t,e,i){const s=t*qt+n,a=i*qt+e;if(s===a)return[{col:n,row:t}];Pi.fill(1/0),Fr.fill(-1),Ps.fill(0),Pi[s]=0;const r=om();for(r.push(s,rl(n,t,e,i));r.size()>0;){const o=r.pop();if(Ps[o])continue;if(o===a)return ol(r),rm(o);Ps[o]=1;const c=o%qt,d=(o-c)/qt;for(let u=0;u<8;u++){const l=sm[u],h=c+l.dc,f=d+l.dr;if(h<0||h>=qt||f<0||f>=Qe)continue;const _=ze(h,f);if(_!==je&&_!==kn)continue;if(l.cost>1){const m=ze(c+l.dc,d),v=ze(c,d+l.dr);if(m!==je&&m!==kn||v!==je&&v!==kn)continue}const g=f*qt+h;if(Ps[g])continue;const p=Pi[o]+l.cost;if(p<Pi[g]){Fr[g]=o,Pi[g]=p;const m=p+rl(h,f,e,i);r.push(g,m)}}}return ol(r),null}function rE(n,t,e,i,s){if(n<0||n>=qt||t<0||t>=Qe||e<0||e>=qt||i<0||i>=Qe)return null;const a=`tw${n},${t},${e},${i}`,r=nm(a);if(r!==void 0)return r;if(im())return null;const o=ze(e,i);if(!(o===je||o===kn||o===Gn)){const u=am(e,i);let l=null;for(const h of u){const f=ze(h.col,h.row);if(f===je||f===kn||f===Gn){ir++;const _=Uf(n,t,h.col,h.row,s);_&&(!l||_.length<l.length)&&(l=_)}}return al(a,l),l}ir++;const d=Uf(n,t,e,i,s);return al(a,d),d}function Uf(n,t,e,i,s){const a=t*qt+n,r=i*qt+e;if(a===r)return[{col:n,row:t}];Pi.fill(1/0),Fr.fill(-1),Ps.fill(0),Pi[a]=0;const o=om();for(o.push(a,rl(n,t,e,i));o.size()>0;){const c=o.pop();if(Ps[c])continue;if(c===r)return ol(o),rm(c);Ps[c]=1;const d=c%qt,u=(c-d)/qt;for(let l=0;l<8;l++){const h=sm[l],f=d+h.dc,_=u+h.dr;if(f<0||f>=qt||_<0||_>=Qe)continue;const g=ze(f,_);if(g!==je&&g!==kn&&g!==Gn)continue;if(h.cost>1){const M=ze(d+h.dc,u),y=ze(d,u+h.dr);if(!(M===je||M===kn||M===Gn)||!(y===je||y===kn||y===Gn))continue}const p=_*qt+f;if(Ps[p])continue;let m=h.cost;g===Gn&&(m+=s?s(f,_):R_);const v=Pi[c]+m;if(v<Pi[p]){Fr[p]=c,Pi[p]=v;const M=v+rl(f,_,e,i);o.push(p,M)}}}return ol(o),null}class oE{constructor(){this._data=[]}size(){return this._data.length}reset(){this._data.length=0}push(t,e){this._data.push({key:t,f:e}),this._bubbleUp(this._data.length-1)}pop(){const t=this._data[0],e=this._data.pop();return this._data.length>0&&(this._data[0]=e,this._sinkDown(0)),t.key}_bubbleUp(t){for(;t>0;){const e=t-1>>1;if(this._data[t].f<this._data[e].f)[this._data[t],this._data[e]]=[this._data[e],this._data[t]],t=e;else break}}_sinkDown(t){const e=this._data.length;for(;;){let i=t;const s=2*t+1,a=2*t+2;if(s<e&&this._data[s].f<this._data[i].f&&(i=s),a<e&&this._data[a].f<this._data[i].f&&(i=a),i!==t)[this._data[t],this._data[i]]=[this._data[i],this._data[t]],t=i;else break}}}const Dd=[];function om(){return Dd.length>0?Dd.pop():new oE}function ol(n){n.reset(),Dd.push(n)}let Wi=[],Id=null;function lE(n){Id=n}let Ld=[];function cE(){const n=Math.random();let t=0;for(const e of ah)if(t+=e.weight,n<t)return e;return ah[0]}function dE(n){const t=cE();let e=t.cellsW,i=t.cellsD;e!==i&&Math.random()<.5&&(e=t.cellsD,i=t.cellsW);for(let s=0;s<L0;s++){const a=Gl+Math.floor(Math.random()*(sh-Gl-e+2)),r=Hl+Math.floor(Math.random()*(ih-Hl-i+2));let o=!0;for(let u=0;u<e&&o;u++)for(let l=0;l<i&&o;l++){const h=a+u,f=r+l;(h<Gl||h>sh||f<Hl||f>ih||Wi[f][h]!==je||Math.abs(h-As)<=no&&Math.abs(f-rs)<=no||Math.abs(h-oi)<=no&&Math.abs(f-Ln)<=no)&&(o=!1)}if(!o)continue;for(let u=0;u<e;u++)for(let l=0;l<i;l++)Wi[r+l][a+u]=Mi;const c=t.heightMin+Math.random()*(t.heightMax-t.heightMin),d=oh[Math.floor(Math.random()*oh.length)];return{id:`obs-${n}`,kind:t.kind,col:a,row:r,cellsW:e,cellsD:i,height:c,color:d,aabb:{min:{x:a*Z,y:0,z:r*Z},max:{x:(a+e)*Z,y:c,z:(r+i)*Z}}}}return null}function uE(n){for(let t=0;t<n.cellsW;t++)for(let e=0;e<n.cellsD;e++)Wi[n.row+e][n.col+t]=je}function hE(){Wi=[];for(let e=0;e<Qe;e++)Wi[e]=new Array(qt).fill(je);Ld=[];const n=lh+Math.floor(Math.random()*(I0-lh+1));let t=0;for(let e=0;e<n;e++){const i=dE(t);if(!i)continue;zo(Math.floor(qt/2),rs,Math.floor(qt/2),Ln)?(Ld.push(i),t++):uE(i)}}function ze(n,t){return n<0||n>=qt||t<0||t>=Qe?Mi:Wi[t][n]}function lm(n,t,e){n<0||n>=qt||t<0||t>=Qe||Wi[t][n]!==e&&(Wi[t][n]=e,nE())}function ll(n,t,e,i){let s=!1;for(let a=t;a<t+e;a++)for(let r=n;r<n+e;r++){if(r<0||r>=qt||a<0||a>=Qe||!fE(a,i)||Wi[a][r]!==je)return!1;a>=Va&&a<=Ni&&(s=!0)}return!(s&&Id&&!Id(n,t,e,i))}function fE(n,t){return t===nt&&n>=sp&&n<=Km||t===kt&&n>=Yo&&n<=yl||n>=Va&&n<=Ni}function pE(){const n=[];for(let t=0;t<Qe;t++)for(let e=0;e<qt;e++)Wi[t][e]===Mi&&n.push({col:e,row:t});return n}function mE(){return Ld}function _E(n){let t=0,e=0;for(const i of n)i.alive&&i.row>=Va&&i.row<=Ni&&(i.team===nt?t++:i.team===kt&&e++);return{player:t,enemy:e}}let Ys=null,ai=null,cl=null,Ra=null,ts=[],Or=null;const ue=new q(1,1,1),Xn=new Tt(.5,12,8),xn=new Et(.5,.5,1,16),Us=new ae(.5,.06,8,24),cm=new tr(.5,0),gE=new Cl(.5,0);new Vi(1,1);let Ud=0;function xE(n,t,e,i,s,a,r){const o=Math.min(e,i)*.22,c=new b(xn.clone(),s);c.scale.set(o*2.8,3,o*2.8),c.position.y=1.5,n.add(c);const d=t*.45,u=new b(xn.clone(),s);u.scale.set(o*2,1.5,o*2),u.position.y=d,n.add(u);const l=new b(xn.clone(),s);l.scale.set(o*1.2,t*.85,o*1.2),l.position.y=t*.45,n.add(l);const h=4;for(let g=1;g<=h;g++){const p=t*.1+t*.75*(g/(h+1)),m=new b(Us.clone(),a);m.scale.set(o*1.6,o*1.6,o*1.6),m.rotation.x=Math.PI/2,m.position.y=p,n.add(m)}const f=new b(Xn.clone(),a);f.scale.set(o*2.2,o*2.2,o*2.2),f.position.y=t,n.add(f);const _=new b(Xn.clone(),r);_.scale.set(o*3.5,o*3.5,o*3.5),_.position.y=t,n.add(_);for(let g=0;g<4;g++){const p=Math.PI*2/4*g,m=new b(ue.clone(),a);m.scale.set(o*.3,o*.2,o*2.5),m.position.set(Math.cos(p)*o*1.8,t+o*.5,Math.sin(p)*o*1.8),m.rotation.y=p,n.add(m)}}function vE(n,t,e,i,s,a,r){const o=Math.min(e,i)*.3,c=new b(xn.clone(),s);c.scale.set(o*2,t,o*2),c.position.y=t/2,n.add(c);const d=new b(xn.clone(),s);d.scale.set(o*2.3,1.5,o*2.3),d.position.y=t+.75,n.add(d);const u=new b(xn.clone(),s);u.scale.set(o*2.3,1.5,o*2.3),u.position.y=.75,n.add(u);const l=3;for(let _=0;_<l;_++){const g=t*.2+t*.6*(_/(l-1)),p=new b(Us.clone(),a);p.scale.set(o*2.4,o*2.4,o*2.4),p.rotation.x=Math.PI/2,p.position.y=g,n.add(p)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,p=new b(ue.clone(),s);p.scale.set(o*.4,t*.3,2),p.position.set(Math.cos(g)*o*1.1,t*.5,Math.sin(g)*o*1.1),p.rotation.y=g,n.add(p)}const h=new b(Xn.clone(),a);h.scale.set(o*.7,o*.7,o*.7),h.position.set(o*1.1,t*.7,0),n.add(h);const f=new b(Xn.clone(),r);f.scale.set(o*1.2,o*1.2,o*1.2),f.position.set(o*1.1,t*.7,0),n.add(f)}function Nf(n,t,e,i,s,a,r){const o=e*.55,c=i*.55,d=new b(ue.clone(),s);d.scale.set(o*1.15,2.5,c*1.15),d.position.y=1.25,n.add(d);const u=new b(ue.clone(),s);u.scale.set(o,t,c),u.position.y=2.5+t/2,n.add(u);for(let g=0;g<5;g++){const p=4+(t-4)*(g/5),m=new b(ue.clone(),a);m.scale.set(o*.85,.4,.4),m.position.set(0,p,c/2+.3),n.add(m)}for(let g=0;g<3;g++){const p=-o*.3+o*.3*g,m=new b(ue.clone(),a);m.scale.set(.4,t*.5,.4),m.position.set(p,t*.5+2.5,c/2+.3),n.add(m)}const l=new b(ue.clone(),a);l.scale.set(o*.6,.4,.4),l.rotation.z=Math.PI/5,l.position.set(o*.15,t*.65+2.5,-c/2-.3),n.add(l);for(let g=-1;g<=1;g+=2){const p=new b(xn.clone(),a);p.scale.set(2,1.5,2),p.rotation.z=Math.PI/2,p.position.set(g*(o/2+.8),t*.4+2.5,0),n.add(p)}const h=new b(cm.clone(),a),f=Math.min(o,c)*.35;h.scale.set(f,f,f),h.position.y=t+3.5+f/2,n.add(h);const _=new b(Xn.clone(),r);_.scale.set(f*2,f*2,f*2),_.position.y=t+3.5+f/2,n.add(_)}function ME(n,t,e,i,s,a,r){const o=Math.max(e,i),c=Math.min(e,i),d=e>=i,u=new b(ue.clone(),s);u.scale.set(e*.9,2,i*.9),u.position.y=1,n.add(u);const l=c*.25,h=o*.25;for(const p of[-1,1]){const m=d?p*h:0,v=d?0:p*h,M=new b(xn.clone(),s);M.scale.set(l*2,t,l*2),M.position.set(m,2+t/2,v),n.add(M);const y=new b(Us.clone(),r);y.scale.set(l*2.5,l*2.5,l*2.5),y.rotation.x=Math.PI/2,y.position.set(m,2+t*.6,v),n.add(y)}const f=new b(ue.clone(),a);d?f.scale.set(h*2,1.5,2):f.scale.set(2,1.5,h*2),f.position.y=2+t*.75,n.add(f);const _=new b(ue.clone(),a);d?_.scale.set(h*2,1.5,2):_.scale.set(2,1.5,h*2),_.position.y=2+t*.35,n.add(_);const g=4;for(let p=0;p<g;p++){const m=-.5+(p+.5)/g,v=new b(ue.clone(),s);d?(v.scale.set(2,t*.5,c*.05),v.position.set(m*o*.8,2+t*.3,c*.45)):(v.scale.set(c*.05,t*.5,2),v.position.set(c*.45,2+t*.3,m*o*.8)),n.add(v)}for(const p of[-1,1]){const m=new b(Xn.clone(),a);m.scale.set(3,3,3);const v=d?p*h:0,M=d?0:p*h;m.position.set(v,2+t+2,M),n.add(m)}}function yE(n,t,e,i,s,a,r){const o=Math.min(e,i)*.15,c=new b(xn.clone(),s);c.scale.set(o*6,3,o*6),c.position.y=1.5,n.add(c);const d=new b(xn.clone(),s);d.scale.set(o*1.5,t,o*1.5),d.position.y=3+t/2,n.add(d);const u=[.3,.55,.8];for(const _ of u){const g=3+t*_,p=o*(5-_*2),m=new b(ue.clone(),a);m.scale.set(p*2,1.2,1.2),m.position.y=g,n.add(m);const v=new b(ue.clone(),a);v.scale.set(1.2,1.2,p*2),v.position.y=g,n.add(v)}for(let _=0;_<4;_++){const g=Math.PI*2/4*_+Math.PI/4,p=new b(ue.clone(),s),m=Math.sqrt(t*t+o*4*(o*4));p.scale.set(.3,m,.3),p.position.set(Math.cos(g)*o*2,3+t/2,Math.sin(g)*o*2),p.rotation.z=Math.atan2(o*4,t)*(_<2?1:-1),p.rotation.y=g,n.add(p)}for(let _=0;_<2;_++){const g=new b(ue.clone(),s);g.scale.set(.5,t*.12,.5),g.position.set((_-.5)*o*2,3+t+t*.06,0),n.add(g)}const l=new b(cm.clone(),a);l.scale.set(o*2,o*2,o*2),l.position.y=3+t*.9,n.add(l);const h=new b(Xn.clone(),a);h.scale.set(o*3.5,o*3.5,o*3.5),h.position.y=3+t+t*.05,n.add(h);const f=new b(Xn.clone(),r);f.scale.set(o*6,o*6,o*6),f.position.y=3+t+t*.05,n.add(f)}function SE(n,t,e,i,s,a,r){const o=e*.55,c=i*.55,d=4,u=t/d;let l=0;for(let m=0;m<d;m++){const v=1-m*.15,M=o*v,y=c*v,T=new b(ue.clone(),s);if(T.scale.set(M,u*.85,y),T.position.y=l+u*.425,n.add(T),m>0){const w=new b(ue.clone(),a);w.scale.set(M*1.05,.6,y*1.05),w.position.y=l,n.add(w)}if(m<d-1)for(let w=-1;w<=1;w+=2)for(let A=-1;A<=1;A+=2){const x=new b(ue.clone(),a);x.scale.set(.6,u*.7,.6),x.position.set(w*M*.5,l+u*.4,A*y*.5),n.add(x)}l+=u}const h=new b(Us.clone(),r),f=Math.min(o,c)*.8;h.scale.set(f,f,f),h.rotation.x=Math.PI/2,h.position.y=t*.82,n.add(h);const _=Math.min(o,c)*.28,g=new b(gE.clone(),a);g.scale.set(_,_,_),g.position.y=t+_+2,n.add(g);const p=new b(Xn.clone(),r);p.scale.set(_*2,_*2,_*2),p.position.y=t+_+2,n.add(p)}function EE(n,t,e,i,s,a,r){const o=Math.max(e,i),c=Math.min(e,i),d=e>=i,u=Math.min(t*.4,c*.2),l=o*.35,h=t*.55;for(const p of[-1,1]){const m=d?p*l:0,v=d?0:p*l,M=new b(ue.clone(),s);M.scale.set(c*.2,h,c*.2),M.position.set(m,h/2,v),n.add(M);const y=new b(ue.clone(),a);y.scale.set(.8,h*.8,.8),y.rotation.z=p*.4,y.position.set(m*.5,h*.4,v*.5),n.add(y)}const f=new b(xn.clone(),s),_=l*2;d?(f.scale.set(u*2,_,u*2),f.rotation.z=Math.PI/2):(f.scale.set(u*2,_,u*2),f.rotation.x=Math.PI/2),f.position.y=h,n.add(f);for(const p of[-1,1]){const m=d?p*l*.8:0,v=d?0:p*l*.8,M=new b(Us.clone(),a);M.scale.set(u*3,u*3,u*3),d&&(M.rotation.y=Math.PI/2),M.position.set(m,h,v),n.add(M)}const g=new b(Us.clone(),a);g.scale.set(u*2.5,u*2.5,u*2.5),g.position.y=h,n.add(g);for(const p of[-1,1]){const m=d?p*l:0,v=d?0:p*l,M=new b(Xn.clone(),r);M.scale.set(u*2.5,u*2.5,u*2.5),M.position.set(m,h,v),n.add(M)}for(const p of[-1,1]){const m=d?p*l*.95:0,v=d?0:p*l*.95,M=new b(xn.clone(),s);M.scale.set(u*2.8,1.5,u*2.8),M.position.set(m,h,v),n.add(M)}}function wE(n,t,e,i,s,a,r){const o=Math.min(e,i),c=o*.32,d=o*.05,u=new b(xn.clone(),s);u.scale.set(o*.7,3,o*.7),u.position.y=1.5,n.add(u);for(let p=-1;p<=1;p+=2)for(let m=-1;m<=1;m+=2){const v=new b(ue.clone(),s);v.scale.set(d*2,t,d*2),v.position.set(p*c,3+t/2,m*c),n.add(v)}const l=5;for(let p=0;p<l;p++){const m=3+t*(p+1)/(l+1);for(const v of[-1,1]){const M=new b(ue.clone(),s);M.scale.set(c*2,1,1),M.position.set(0,m,v*c),n.add(M)}for(const v of[-1,1]){const M=new b(ue.clone(),s);M.scale.set(1,1,c*2),M.position.set(v*c,m,0),n.add(M)}if(p%2===0){const v=new b(ue.clone(),a);v.scale.set(.6,t/(l+1)*1.3,.6),v.rotation.z=.4,v.position.set(0,m,c),n.add(v);const M=new b(ue.clone(),a);M.scale.set(.6,t/(l+1)*1.3,.6),M.rotation.z=-.4,M.position.set(0,m,-c),n.add(M)}}const h=3+t*.85;for(let p=0;p<4;p++){const m=Math.PI*2/4*p+Math.PI/4,v=o*.35,M=new b(ue.clone(),a);M.scale.set(v,1.2,1.2),M.position.set(Math.cos(m)*v*.5,h,Math.sin(m)*v*.5),M.rotation.y=m,n.add(M);const y=new b(xn.clone(),s);y.scale.set(1.5,4,1.5),y.position.set(Math.cos(m)*v*.8,h-3,Math.sin(m)*v*.8),n.add(y)}const f=o*.12,_=new b(Xn.clone(),a);_.scale.set(f*2,f*2,f*2),_.position.y=3+t+f,n.add(_);const g=new b(Xn.clone(),r);g.scale.set(f*4,f*4,f*4),g.position.y=3+t+f,n.add(g)}function bE(n,t,e,i,s,a,r){const o=Math.min(e,i)*.28,c=3,d=t/c,u=new b(xn.clone(),s);u.scale.set(o*2.8,2,o*2.8),u.position.y=1,n.add(u);for(let _=0;_<c;_++){const g=2+_*d,p=new b(xn.clone(),s);p.scale.set(o*2,d*.75,o*2),p.position.y=g+d*.375,n.add(p);for(let m=0;m<6;m++){const v=Math.PI*2/6*m,M=new b(ue.clone(),a);M.scale.set(o*.8,d*.5,1),M.position.set(Math.cos(v)*o*1.3,g+d*.4,Math.sin(v)*o*1.3),M.rotation.y=v,n.add(M)}if(_<c-1){const m=new b(Us.clone(),r);m.scale.set(o*2.6,o*2.6,o*2.6),m.rotation.x=Math.PI/2,m.position.y=g+d,n.add(m)}}const l=new b(xn.clone(),a);l.scale.set(o*.6,4,o*.6),l.position.y=2+t+2,n.add(l);const h=new b(Xn.clone(),a);h.scale.set(o*.8,o*.8,o*.8),h.position.y=2+t+4.5,n.add(h);const f=new b(Xn.clone(),r);f.scale.set(o*1.5,o*1.5,o*1.5),f.position.y=2+t+4.5,n.add(f)}function TE(n,t,e,i,s,a,r){const o=Math.max(e,i),c=Math.min(e,i),d=e>=i,u=2,l=o*.4,h=c*.3;for(const p of[-1,1])for(const m of[-1,1]){const v=d?p*l:m*h,M=d?m*h:p*l,y=new b(ue.clone(),s);y.scale.set(u,t,u),y.position.set(v,t/2,M),n.add(y);const T=new b(Us.clone(),r);T.scale.set(u*2,u*2,u*2),T.rotation.x=Math.PI/2,T.position.set(v,t,M),n.add(T)}const f=new b(ue.clone(),s);d?f.scale.set(l*2+u,2,c*.15):f.scale.set(c*.15,2,l*2+u),f.position.y=t+1,n.add(f);const _=new b(ue.clone(),s);d?(_.scale.set(l*2+u,2,c*.15),_.position.set(0,t+1,h*.6),f.position.set(0,t+1,-h*.6)):(_.scale.set(c*.15,2,l*2+u),_.position.set(h*.6,t+1,0),f.position.set(-h*.6,t+1,0)),n.add(_);const g=3;for(let p=0;p<g;p++){const m=-1+2*p/(g-1),v=new b(ue.clone(),a);d?(v.scale.set(l*1.8,1.2,1.2),v.position.set(0,t-1,m*h*.5)):(v.scale.set(1.2,1.2,l*1.8),v.position.set(m*h*.5,t-1,0)),n.add(v)}for(const p of[-1,0,1]){const m=new b(ue.clone(),a);m.scale.set(2.5,2.5,2.5),d?m.position.set(p*l*.6,t-2,0):m.position.set(0,t-2,p*l*.6),n.add(m)}for(const p of[-1,1]){const m=new b(ue.clone(),s);m.scale.set(d?l*1.6:.6,.6,d?.6:l*1.6),m.rotation.z=p*.35,m.position.set(0,t*.5,d?p*h:0),d||(m.position.x=p*h),n.add(m)}for(let p=0;p<2;p++){const m=new b(ue.clone(),a);m.scale.set(d?l*1.5:.4,.4,d?.4:l*1.5);const v=t*.7+p*2;d?m.position.set(0,v,(p-.5)*h*.8):m.position.set((p-.5)*h*.8,v,0),n.add(m)}}function AE(n,t,e,i,s){const a=new Ee;a.name="obstacle";const r=rh[Ud%rh.length];Ud++;const o=Ft(e);o.emissive=new Ht(e).multiplyScalar(.15),o.emissiveIntensity=1;const c=Vt(r),d=yt(r,.12);switch(n){case"tesla_coil":xE(a,t,i,s,o,c,d);break;case"power_cell":vE(a,t,i,s,o,c,d);break;case"circuit_monolith":Nf(a,t,i,s,o,c,d);break;case"capacitor_bank":ME(a,t,i,s,o,c,d);break;case"relay_tower":yE(a,t,i,s,o,c,d);break;case"data_obelisk":SE(a,t,i,s,o,c,d);break;case"plasma_conduit":EE(a,t,i,s,o,c,d);break;case"power_pylon":wE(a,t,i,s,o,c,d);break;case"transformer_stack":bE(a,t,i,s,o,c,d);break;case"cable_rack":TE(a,t,i,s,o,c,d);break;default:Nf(a,t,i,s,o,c,d)}return a}function RE(n){Or=n,dm(),Ys&&n.remove(Ys),Ra&&n.remove(Ra),Ys=new Ee,Ys.name="grid";const t=new Vi(ii+200,Hn+200),e=new Xp({color:657962,metalness:0,roughness:.95,emissive:789544,emissiveIntensity:.7}),i=new b(t,e);i.rotation.x=-Math.PI/2,i.position.set(ii/2,-.5,Hn/2),Ys.add(i);const s=[];for(let u=0;u<=qt;u++){const l=u*Z;s.push(l,.1,0),s.push(l,.1,Hn)}for(let u=0;u<=Qe;u++){const l=u*Z;s.push(0,.1,l),s.push(ii,.1,l)}const a=new un;a.setAttribute("position",new _e(s,3));const r=new Gp({color:2763376,transparent:!0,opacity:.8}),o=new vx(a,r);Ys.add(o),n.add(Ys),Ra=new Ee,Ra.name="obstacles",Ud=0;const c=mE();for(const u of c){const l=u.cellsW*Z,h=u.cellsD*Z,f=AE(u.kind,u.height,u.color,l,h),_=(u.aabb.min.x+u.aabb.max.x)/2,g=(u.aabb.min.z+u.aabb.max.z)/2;f.position.set(_,0,g),f.userData.idOffset=Math.random()*Math.PI*2,Ra.add(f)}n.add(Ra),cl=yt(zt.BUILD_VALID,.3);const d=new Vi(Z,Z);ai=new b(d,cl),ai.rotation.x=-Math.PI/2,ai.position.y=.5,ai.visible=!1,n.add(ai)}function CE(n,t,e){if(!ai)return;if(e&&e.length>0){ai.visible=!1;const s=.2+.15*Math.sin(n*4);for(;ts.length<e.length;){const a=new Vi(Z,Z),r=new Nn({transparent:!0,depthWrite:!1,side:Kn,opacity:.3}),o=new b(a,r);o.rotation.x=-Math.PI/2,o.visible=!1,Or&&Or.add(o),ts.push(o)}for(let a=0;a<e.length;a++){const r=e[a],o=ts[a],c=ll(r.col,r.row,1,nt);o.position.set(r.col*Z+Z/2,.5,r.row*Z+Z/2),o.material.color.setHex(c?zt.BUILD_VALID:zt.BUILD_INVALID),o.material.opacity=s,o.visible=!0}for(let a=e.length;a<ts.length;a++)ts[a].visible=!1;return}for(let s=0;s<ts.length;s++)ts[s].visible=!1;if(t&&t.col!==void 0&&t.row!==void 0){const s=t.size||1,a=ll(t.col,t.row,s,nt);ai.geometry.dispose(),ai.geometry=new Vi(Z*s,Z*s),ai.position.set(t.col*Z+Z*s/2,.5,t.row*Z+Z*s/2);const r=a?zt.BUILD_VALID:zt.BUILD_INVALID;cl.color.setHex(r),cl.opacity=.2+.15*Math.sin(n*4),ai.visible=!0}else ai.visible=!1}function dm(){for(const n of ts)n.geometry.dispose(),n.material.dispose(),Or&&Or.remove(n);ts=[]}function He(n){return new Ht(Math.min(1,n.r+.3),Math.min(1,n.g+.3),Math.min(1,n.b+.3))}function li(n){return n instanceof Ht?n:Array.isArray(n)?new Ht(n[0]/255,n[1]/255,n[2]/255):new Ht(n)}function Br(n,t){const e=n.team===nt?zt.PLAYER:zt.ENEMY,i=new Ee;switch(n.type){case bn:IE(i,e);break;case Ce:LE(i,n);break;case xe:FE(i,n);break;case ve:kE(i,n);break;case we:$E(i,n);break;case tn:KE(i,n);break;case ne:tw(i,n);break}i.position.set(n.x,0,n.z),i.userData.baseY=0,i.userData.idOffset=n.idOffset,t.add(i),n.mesh=i}function Tu(n,t){Kr(n,t),Br(n,t)}function PE(n){if(!n.mesh)return{x:n.x,y:20,z:n.z};const t=n.mesh.userData.model||n.mesh;if(t.userData.muzzleFlash){const e=new F;return t.userData.muzzleFlash.getWorldPosition(e),{x:e.x,y:e.y,z:e.z}}return{x:n.x,y:20,z:n.z}}const it=new q(1,1,1),ke=new Et(.5,.5,1,16),DE=new Et(.35,.5,1,12),re=new Tt(.5,14,10),_n=new ae(.5,.06,8,28),dr=new tr(.5,0),Ll=new Cl(.5,0),um=new Qa(.5,1,8),Xi=new Vi(1,1),hm=new Et(.5,.5,1,6);function IE(n,t){const e=li(t),i=Ft(e),s=Vt(He(e)),a=yt(e,.15),r=[],o=[],c=new b(it.clone(),i);c.scale.set(110,8,110),c.position.y=4,n.add(c);const d=new b(it.clone(),s);d.scale.set(112,1.5,112),d.position.y=8.5,n.add(d),r.push(d);const u=new b(it.clone(),i);u.scale.set(85,16,85),u.position.y=17,n.add(u);const l=new b(it.clone(),s);l.scale.set(87,1.2,87),l.position.y=25.5,n.add(l),r.push(l);const h=new b(it.clone(),i);h.scale.set(60,12,60),h.position.y=32,n.add(h);for(let T=0;T<4;T++){const w=Math.PI/4+Math.PI/2*T,A=Math.cos(w)*46,x=Math.sin(w)*46,S=new b(DE.clone(),i);S.scale.set(10,36,10),S.position.set(A,18,x),n.add(S);const I=new b(_n.clone(),s);I.scale.set(12,12,12),I.rotation.x=Math.PI/2,I.position.set(A,30,x),n.add(I),r.push(I);const C=new b(um.clone(),s);C.scale.set(5,14,5),C.position.set(A,44,x),n.add(C),r.push(C)}for(let T=0;T<6;T++){const w=Math.PI*2/6*T,A=new b(it.clone(),i);A.scale.set(2,28,2),A.position.set(Math.cos(w)*18,27,Math.sin(w)*18),n.add(A)}for(const T of[18,30,42]){const w=new b(_n.clone(),i);w.scale.set(38,38,38),w.rotation.x=Math.PI/2,w.position.y=T,n.add(w)}const f=new b(re.clone(),s);f.scale.set(20,20,20),f.position.y=32,n.add(f),r.push(f);const _=new b(re.clone(),a);_.scale.set(30,30,30),_.position.y=32,n.add(_),o.push(_);const g=new b(_n.clone(),s);g.scale.set(50,50,50),g.rotation.x=Math.PI/3,g.rotation.z=Math.PI/6,g.position.y=38,n.add(g),r.push(g);const p=new b(_n.clone(),s);p.scale.set(50,50,50),p.rotation.x=-Math.PI/4,p.rotation.z=-Math.PI/5,p.position.y=38,n.add(p),r.push(p);for(let T=0;T<8;T++){const w=Math.PI*2/8*T,A=Math.cos(w)*44,x=Math.sin(w)*44,S=new b(it.clone(),i);S.scale.set(6,14,2.5),S.position.set(A,17,x),S.rotation.y=-w,n.add(S)}for(let T=-1;T<=1;T+=2){const w=new b(it.clone(),s);w.scale.set(58,1,1.2),w.position.set(0,38.5,T*22),n.add(w),r.push(w);const A=new b(it.clone(),s);A.scale.set(1.2,1,44),A.position.set(T*22,38.5,0),n.add(A),r.push(A)}const m=new b(ke.clone(),i);m.scale.set(3,16,3),m.position.y=50,n.add(m);const v=new b(dr.clone(),s);v.scale.set(6,6,6),v.position.y=60,n.add(v),r.push(v);const M=new b(re.clone(),a);M.scale.set(12,12,12),M.position.y=60,n.add(M),o.push(M);const y=new b(Xi.clone(),yt(e,.1));y.scale.set(130,130,1),y.rotation.x=-Math.PI/2,y.position.y=.2,n.add(y),o.push(y),n.userData.accentParts=r,n.userData.glowParts=o,n.userData.orbitRings=[g,p]}function LE(n,t){const e=t.team===nt?zt.PLAYER:zt.ENEMY,i=li(e);t.branch==="A"?UE(n,i):t.branch==="B"?NE(n,i):t.level>=2?Au(n,i):t.level>=1?pm(n,i):fm(n,i),n.userData.isBarracks=!0}function fm(n,t){const e=Ft(t),i=Vt(He(t)),s=yt(t,.15),a=[],r=[],o=new b(it.clone(),e);o.scale.set(68,4,68),o.position.y=2,n.add(o);const c=new b(it.clone(),i);c.scale.set(70,1,70),c.position.y=4.5,n.add(c),a.push(c);const d=new b(it.clone(),e);d.scale.set(62,22,58),d.position.y=15,n.add(d);for(let M=-1;M<=1;M+=2){const y=new b(it.clone(),e);y.scale.set(64,2.5,34),y.position.set(0,29,M*8),y.rotation.x=M*.22,n.add(y)}const u=new b(it.clone(),i);u.scale.set(66,1.5,3),u.position.y=30.5,n.add(u),a.push(u);for(let M=-1;M<=1;M+=2){for(let T=0;T<3;T++){const w=-20+T*20,A=new b(it.clone(),e);A.scale.set(4,18,2.5),A.position.set(w,15,M*30),n.add(A)}const y=new b(it.clone(),i);y.scale.set(50,1.2,.8),y.position.set(0,22,M*30.5),n.add(y),a.push(y)}const l=new b(it.clone(),e);l.scale.set(3,18,4),l.position.set(-18,13,-30),n.add(l);const h=new b(it.clone(),e);h.scale.set(3,18,4),h.position.set(18,13,-30),n.add(h);const f=new b(it.clone(),i);f.scale.set(40,2,3),f.position.set(0,23,-30),n.add(f),a.push(f);const _=new b(Xi.clone(),yt(He(t),.2));_.scale.set(32,16,1),_.position.set(0,13,-30.5),n.add(_),r.push(_);for(let M=-1;M<=1;M+=2)for(let y=-1;y<=1;y+=2){const T=new b(it.clone(),e);T.scale.set(4,26,4),T.position.set(M*30,15,y*28),n.add(T)}const g=new b(ke.clone(),e);g.scale.set(3,10,3),g.position.set(-20,36,-14),n.add(g);const p=new b(re.clone(),i);p.scale.set(5,5,5),p.position.set(-20,42,-14),n.add(p),a.push(p);const m=new b(re.clone(),s);m.scale.set(10,10,10),m.position.set(-20,42,-14),n.add(m),r.push(m);const v=new b(Xi.clone(),yt(t,.08));v.scale.set(80,80,1),v.rotation.x=-Math.PI/2,v.position.y=.15,n.add(v),r.push(v),n.userData.accentParts=a,n.userData.glowParts=r}function pm(n,t){fm(n,t);const e=Ft(t),i=Vt(He(t)),s=n.userData.accentParts;n.userData.glowParts;const a=new b(ke.clone(),e);a.scale.set(5,6,5),a.position.set(18,34,12),n.add(a);const r=new b(re.clone(),e);r.scale.set(12,4,12),r.position.set(18,38,12),n.add(r);const o=new b(re.clone(),i);o.scale.set(3,3,3),o.position.set(18,42,12),n.add(o),s.push(o);for(let d=0;d<3;d++){const u=-14+d*14,l=new b(it.clone(),e);l.scale.set(6,6,2),l.position.set(u,10,30),n.add(l);const h=new b(it.clone(),i);h.scale.set(4,4,.6),h.position.set(u,10,31.2),n.add(h),s.push(h)}const c=new b(_n.clone(),i);c.scale.set(42,42,42),c.rotation.x=Math.PI/2,c.position.y=26,n.add(c),s.push(c)}function Au(n,t){pm(n,t);const e=Ft(t),i=Vt(He(t)),s=yt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let u=-1;u<=1;u+=2){const l=new b(it.clone(),e);l.scale.set(3,20,40),l.position.set(u*34,14,0),n.add(l)}const o=new b(ke.clone(),e);o.scale.set(3,10,3),o.position.set(22,36,-14),n.add(o);const c=new b(re.clone(),i);c.scale.set(5,5,5),c.position.set(22,42,-14),n.add(c),a.push(c);const d=new b(re.clone(),s);d.scale.set(10,10,10),d.position.set(22,42,-14),n.add(d),r.push(d);for(let u=-1;u<=1;u+=2){const l=new b(it.clone(),i);l.scale.set(60,.8,1),l.position.set(0,31,u*4),n.add(l),a.push(l)}}function UE(n,t){Au(n,t);const e=Vt(He(t)),i=yt(t,.2),s=n.userData.accentParts,a=n.userData.glowParts,r=new b(it.clone(),Ft(t));r.scale.set(5,20,5),r.position.set(-22,14,-30),n.add(r);const o=new b(it.clone(),Ft(t));o.scale.set(5,20,5),o.position.set(22,14,-30),n.add(o);const c=new b(Xi.clone(),i);c.scale.set(44,20,1),c.position.set(0,14,-31),n.add(c),a.push(c);for(let d=0;d<3;d++){const u=new b(ke.clone(),e);u.scale.set(1,12,1),u.position.set(-16+d*16,38,0),n.add(u),s.push(u)}}function NE(n,t){Au(n,t);const e=Vt(He(t));yt(t,.2);const i=n.userData.accentParts,s=n.userData.glowParts;for(let o=-1;o<=1;o+=2)for(let c=0;c<3;c++){const d=new b(it.clone(),e);d.scale.set(58,.6,.6),d.position.set(0,10+c*5,o*31),n.add(d),i.push(d)}const a=new b(Xi.clone(),yt(He(t),.2));a.scale.set(28,14,1),a.position.set(0,12,30.5),n.add(a),s.push(a);const r=new b(_n.clone(),e);r.scale.set(24,24,24),r.rotation.x=Math.PI/2,r.position.y=32,n.add(r),i.push(r)}function FE(n,t){const e=t.team===nt?zt.PLAYER:zt.ENEMY,i=li(e),s=new Ee;t.branch==="A"?HE(s,i):t.branch==="B"?GE(s,i):t.level>=2?zE(s,i):t.level>=1?BE(s,i):OE(s,i),n.add(s),n.userData.model=s,n.userData.disc=s.userData.disc,n.userData.turretPivot=s.userData.turretPivot,n.userData.barrel=s.userData.barrel,n.userData.barrelY=s.userData.barrelY,n.userData.barrelDist=s.userData.barrelDist,n.userData.muzzleFlash=s.userData.muzzleFlash,n.userData.isPulseTurret=!0}function OE(n,t){const e=new b(new Et(10,12,16,12),Ft(t));e.position.y=8,n.add(e);const i=new b(new Et(8,10,3,12),Ft(t));i.position.y=17.5,n.add(i);const s=new Ee;s.position.y=18;const a=new b(new Et(1.5,1.5,10,6),Ft(t));a.rotation.z=Math.PI/2,a.position.set(9,0,0),s.add(a),n.add(s);const r=new Nn({color:new Ht(1,1,1)}),o=new b(new Tt(2,8,6),r);o.position.set(14,0,0),o.visible=!1,s.add(o),n.userData.disc=null,n.userData.turretPivot=s,n.userData.barrel=a,n.userData.barrelY=18,n.userData.barrelDist=9,n.userData.muzzleFlash=o}function BE(n,t){const e=new b(new Et(11,13,22,12),Ft(t));e.position.y=11,n.add(e);const i=new b(new ae(12,1.5,6,18),Ft(t));i.position.y=16,i.rotation.x=Math.PI/2,n.add(i);const s=new b(new Et(9,11,3,12),Ft(t));s.position.y=24,n.add(s);const a=new Ee;a.position.y=25;const r=new b(new Et(1.5,1.5,14,6),Ft(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r),n.add(a);const o=new Nn({color:new Ht(1,1,1)}),c=new b(new Tt(2,8,6),o);c.position.set(18,0,0),c.visible=!1,a.add(c),n.userData.disc=null,n.userData.turretPivot=a,n.userData.barrel=r,n.userData.barrelY=25,n.userData.barrelDist=11,n.userData.muzzleFlash=c}function zE(n,t){const e=new b(new Et(12,14,25,14),Ft(t));e.position.y=12.5,n.add(e);const i=new b(new ae(13,2,6,20),Vt(He(t)));i.position.y=18,i.rotation.x=Math.PI/2,n.add(i);const s=new b(new Et(10,10,3,16),Ft(t));s.position.y=27,n.add(s);const a=new Ee;a.position.y=28;const r=new b(new Et(1.5,1.5,14,6),Ft(t));r.rotation.z=Math.PI/2,r.position.set(11,0,0),a.add(r);const o=new b(new Et(2.5,1.5,3,6),Vt(He(t)));o.rotation.z=Math.PI/2,o.position.set(19,0,0),a.add(o),n.add(a);const c=new Nn({color:new Ht(1,1,1)}),d=new b(new Tt(2.5,8,6),c);d.position.set(21,0,0),d.visible=!1,a.add(d),n.userData.disc=s,n.userData.turretPivot=a,n.userData.barrel=r,n.userData.barrelY=28,n.userData.barrelDist=11,n.userData.muzzleFlash=d}function HE(n,t){const e=new b(new Et(8,11,35,12),Ft(t));e.position.y=17.5,n.add(e);for(let h=0;h<4;h++){const f=h/4*Math.PI*2,_=new b(new q(1.2,18,6),Ft(t));_.position.set(Math.cos(f)*9,22,Math.sin(f)*9),_.rotation.y=-f,n.add(_)}const i=new b(new ae(9,1.2,6,18),Vt(He(t)));i.position.y=32,i.rotation.x=Math.PI/2,n.add(i);const s=new b(new Et(7,7,2,14),Ft(t));s.position.y=34,n.add(s);const a=new b(new Et(11,11,3,16),Ft(t));a.position.y=38,n.add(a);const r=new Ee;r.position.y=38;const o=[-1.8,1.8,0];let c=null;for(let h=0;h<3;h++){const f=new b(new Et(1,1,16,6),Vt(He(t)));f.rotation.z=Math.PI/2,f.position.set(12,o[h],0),r.add(f),h===2&&(c=f)}const d=new b(new ae(2.5,.5,4,10),Vt(He(t)));d.position.set(20,0,0),d.rotation.y=Math.PI/2,r.add(d),n.add(r);const u=new Nn({color:new Ht(1,1,1)}),l=new b(new Tt(2.5,8,6),u);l.position.set(22,0,0),l.visible=!1,r.add(l),n.userData.disc=a,n.userData.turretPivot=r,n.userData.barrel=c,n.userData.barrelY=38,n.userData.barrelDist=12,n.userData.muzzleFlash=l}function GE(n,t){const e=new b(new Et(13,14,28,14),Ft(t));e.position.y=14,n.add(e);for(let l=0;l<4;l++){const h=l/4*Math.PI*2+Math.PI/4,f=new b(new q(4,22,2),Ft(t));f.position.set(Math.cos(h)*12,13,Math.sin(h)*12),f.rotation.y=-h,n.add(f)}const i=new b(new ae(14,2.5,6,18),Ft(t));i.position.y=26,i.rotation.x=Math.PI/2,n.add(i);const s=new Ee;s.position.y=28;const a=new b(new Et(10,12,8,12),Ft(t));a.position.y=4,s.add(a);for(let l=0;l<2;l++){const h=l===0?-1:1,f=new b(new q(3,6,10),Ft(t));f.position.set(h*10,5,0),s.add(f)}const r=new b(new Et(3.5,4,22,8),Ft(t));r.rotation.z=Math.PI/2,r.position.set(16,6,0),s.add(r);const o=new b(new Qa(6,6,8),Vt(He(t)));o.rotation.z=-Math.PI/2,o.position.set(28,6,0),s.add(o);const c=new b(new ae(5,.8,6,14),new Nn({color:He(t),transparent:!0,opacity:.7}));c.position.set(24,6,0),c.rotation.y=Math.PI/2,s.add(c),n.add(s);const d=new Nn({color:new Ht(1,1,1)}),u=new b(new Tt(3.5,8,6),d);u.position.set(30,6,0),u.visible=!1,s.add(u),n.userData.disc=null,n.userData.turretPivot=s,n.userData.barrel=r,n.userData.barrelY=34,n.userData.barrelDist=16,n.userData.muzzleFlash=u}function kE(n,t){const e=zt.FACTORY,i=li(e);t.branch==="A"?VE(n,i):t.branch==="B"?WE(n,i):t.level>=2?Ru(n,i):t.level>=1?_m(n,i):mm(n,i),n.userData.isFactory=!0}function mm(n,t){const e=Ft(t),i=Vt(He(t));yt(t,.15);const s=[],a=[],r=new b(it.clone(),e);r.scale.set(76,5,76),r.position.y=2.5,n.add(r);const o=new b(it.clone(),i);o.scale.set(78,1.2,78),o.position.y=5.5,n.add(o),s.push(o);const c=new b(it.clone(),e);c.scale.set(70,18,68),c.position.y=14,n.add(c);const d=new b(it.clone(),e);d.scale.set(56,14,54),d.position.y=30,n.add(d);const u=new b(it.clone(),i);u.scale.set(72,1.5,70),u.position.y=23.5,n.add(u),s.push(u);const l=new b(it.clone(),i);l.scale.set(58,1.2,56),l.position.y=37.5,n.add(l),s.push(l);for(let g=-1;g<=1;g+=2){const p=new b(ke.clone(),e);p.scale.set(8,32,8),p.position.set(g*22,38,24),n.add(p);for(const M of[28,38,48]){const y=new b(_n.clone(),e);y.scale.set(12,12,12),y.rotation.x=Math.PI/2,y.position.set(g*22,M,24),n.add(y)}const m=new b(ke.clone(),e);m.scale.set(11,3,11),m.position.set(g*22,55,24),n.add(m);const v=new b(re.clone(),yt(16752680,.2));v.scale.set(10,6,10),v.position.set(g*22,57,24),n.add(v),a.push(v)}const h=new b(it.clone(),e);h.scale.set(40,2,30),h.position.set(0,6,-28),n.add(h);for(let g=-1;g<=1;g+=2){const p=new b(it.clone(),i);p.scale.set(1.5,1,28),p.position.set(g*10,7.5,-28),n.add(p),s.push(p)}const f=new b(Xi.clone(),yt(He(t),.25));f.scale.set(24,10,1),f.position.set(0,16,-35),n.add(f),a.push(f);for(let g=-1;g<=1;g+=2)for(let p=-1;p<=1;p+=2){const m=new b(re.clone(),i);m.scale.set(3,3,3),m.position.set(g*26,38,p*25),n.add(m),s.push(m)}const _=new b(Xi.clone(),yt(t,.08));_.scale.set(90,90,1),_.rotation.x=-Math.PI/2,_.position.y=.15,n.add(_),a.push(_),n.userData.accentParts=s,n.userData.glowParts=a}function _m(n,t){mm(n,t);const e=Ft(t),i=Vt(He(t)),s=n.userData.accentParts;for(let u=-1;u<=1;u+=2){const l=new b(it.clone(),e);l.scale.set(4,36,4),l.position.set(u*24,24,-28),n.add(l)}const a=new b(it.clone(),e);a.scale.set(52,4,5),a.position.set(0,44,-28),n.add(a);const r=new b(it.clone(),i);r.scale.set(54,1,1.5),r.position.set(0,46.5,-28),n.add(r),s.push(r);const o=new b(it.clone(),e);o.scale.set(10,5,6),o.position.set(0,41,-28),n.add(o);const c=new b(ke.clone(),i);c.scale.set(1.5,14,1.5),c.position.set(0,32,-28),n.add(c),s.push(c);const d=new b(dr.clone(),i);d.scale.set(5,5,5),d.position.set(0,24,-28),n.add(d),s.push(d);for(let u=-1;u<=1;u+=2)for(let l=0;l<2;l++){const h=-10+l*20,f=new b(it.clone(),e);f.scale.set(3,12,14),f.position.set(u*36,14,h),n.add(f);const _=new b(ke.clone(),i);_.scale.set(3,1.5,3),_.rotation.z=Math.PI/2,_.position.set(u*37.5,16,h),n.add(_),s.push(_)}}function Ru(n,t){_m(n,t);const e=Ft(t),i=Vt(He(t)),s=yt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let u=-1;u<=1;u+=2){const l=new b(ke.clone(),e);l.scale.set(3,18,3),l.rotation.x=Math.PI/2,l.position.set(u*22,20,12),n.add(l);const h=new b(_n.clone(),i);h.scale.set(5,5,5),h.position.set(u*22,20,8),n.add(h),a.push(h)}const o=new b(ke.clone(),e);o.scale.set(14,4,14),o.position.y=39,n.add(o);const c=new b(_n.clone(),i);c.scale.set(16,16,16),c.rotation.x=Math.PI/2,c.position.y=41.5,n.add(c),a.push(c);const d=new b(re.clone(),s);d.scale.set(12,4,12),d.position.y=41.5,n.add(d),r.push(d)}function VE(n,t){Ru(n,t);const e=Ft(t),i=Vt(He(t)),s=yt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts;for(let c=-1;c<=1;c+=2){const d=new b(it.clone(),e);d.scale.set(4,30,60),d.position.set(c*38,18,0),n.add(d);const u=new b(it.clone(),e);u.scale.set(60,30,4),u.position.set(0,18,c*38),n.add(u)}for(let c=0;c<2;c++){const d=new b(it.clone(),i);d.scale.set(70,1.5,1.5),d.rotation.y=Math.PI/4+c*Math.PI/2,d.position.y=38,n.add(d),a.push(d)}const o=new b(Xi.clone(),s);o.scale.set(30,14,1),o.position.set(0,18,-36),n.add(o),r.push(o)}function WE(n,t){Ru(n,t);const e=Ft(t),i=Vt(He(t)),s=yt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts,o=new b(ke.clone(),e);o.scale.set(2.5,22,2.5),o.position.set(0,52,0),n.add(o);const c=new b(dr.clone(),i);c.scale.set(5,5,5),c.position.set(0,64,0),n.add(c),a.push(c);const d=new b(re.clone(),s);d.scale.set(10,10,10),d.position.set(0,64,0),n.add(d),r.push(d);for(let u=-1;u<=1;u+=2){const l=new b(ke.clone(),e);l.scale.set(4,20,4),l.rotation.z=Math.PI/2,l.position.set(u*20,30,-32),n.add(l);const h=new b(um.clone(),i);h.scale.set(5,5,5),h.rotation.z=u*-Math.PI/2,h.position.set(u*32,30,-32),n.add(h),a.push(h)}}function XE(n,t){const e=.016666666666666666;for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0;if(a.position.y=a.userData.baseY,a.userData.isPulseTurret&&qE(a,s,n,e),(a.userData.isBarracks||a.userData.isFactory||a.userData.isHelipad)&&YE(a,s,n),a.userData.isGenerator){const d=a.userData.energyCore;if(d){const h=1+.12*Math.sin(n*3+r);d.scale.setScalar(8*h)}const u=a.userData.energyRing;u&&(u.rotation.y=n*1.2+r,u.rotation.x=Math.sin(n*.5+r)*.3);const l=a.userData.energyRing2;l&&(l.rotation.y=-n*.9+r+2)}if(a.userData.isWall){if(s.constructionState==="repairing"){const d=.3+.4*Math.sin(n*6),u=a.userData.glowParts;if(u)for(let l=0;l<u.length;l++)u[l].material.opacity=d}if(s.hp<s.maxHp*.5){const d=Math.random()>.85?.3:0,u=a.userData.glowParts;if(u&&!s.constructionState)for(let l=0;l<u.length;l++){const h=u[l].material;h.userData||(h.userData={}),h.userData.baseOpacity==null&&(h.userData.baseOpacity=h.opacity),h.opacity=h.userData.baseOpacity+d}}}if(a.userData.orbitRings){const d=a.userData.orbitRings;d[0]&&(d[0].rotation.y=n*.6+r),d[1]&&(d[1].rotation.y=-n*.45+r+1.5)}const o=a.userData.glowParts;if(o)for(let d=0;d<o.length;d++){const u=o[d].material;if(u.transparent){const l=u.userData?.baseOpacity??u.opacity;u.userData||(u.userData={}),u.userData.baseOpacity=l,u.opacity=l+.1*Math.sin(n*2.5+r)}}if(s.type===xe||s.type===Ce||s.type===ve||s.type===we||s.type===tn||s.type===ne)if(s.constructionState==="building"){const d=s.constructionTimer/s.constructionDuration;a.scale.setScalar(.3+.7*d)}else a.scale.setScalar(1);else if(s.buildProgress<s.buildTime){const d=s.buildProgress/s.buildTime;a.scale.setScalar(.3+.7*d)}else a.scale.setScalar(1);if(s.hitFlashTimer&&s.hitFlashTimer>0){const d=s.hitFlashTimer/Oa;Ff(a,d),s.hitFlashTimer-=e,s.hitFlashTimer<0&&(s.hitFlashTimer=0)}else Ff(a,0)}}function qE(n,t,e,i){if(n.userData.turretPivot&&t.targetX!==void 0&&t.targetZ!==void 0){const a=t.targetX-t.x,r=t.targetZ-t.z,o=Math.atan2(-r,a);let c=n.userData.turretPivot.rotation.y,d=o-c;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;n.userData.turretPivot.rotation.y=c+d*.15}n.userData.disc&&i&&(n.userData.disc.rotation.y+=i*1.5);const s=performance.now()-(t.lastFireTime||0);if(s<250){const a=n.userData.muzzleFlash;if(a){a.visible=s<120;const o=4*Math.max(0,1-s/120);a.scale.setScalar(o)}const r=n.userData.barrel;if(r){const o=t.branch==="A"?2:3.5,c=t.branch==="A"?100:200,d=o*Math.exp(-s*4/c),u=n.userData.barrelDist||9;r.position.x=u-d}}else{const a=n.userData.muzzleFlash;a&&(a.visible=!1);const r=n.userData.barrel;r&&(r.position.x=n.userData.barrelDist||9)}if(t.constructionState==="upgrading"||t.constructionState==="branching"){const a=.5+.3*Math.sin(e*4);n.traverse(r=>{r.isMesh&&r.material&&r.material.opacity!==void 0&&r.material.transparent&&(r.material.opacity=a*.5)})}}function YE(n,t,e){if(t.constructionState==="upgrading"||t.constructionState==="branching"){const i=.5+.3*Math.sin(e*4);n.traverse(s=>{s.isMesh&&s.material&&s.material.opacity!==void 0&&s.material.transparent&&(s.material.opacity=i*.5)})}}function Kr(n,t){n.mesh&&(t.remove(n.mesh),aw(n.mesh),n.mesh=null)}function $E(n,t){const e=li(zt.GOLD);t.branch==="A"?ZE(n,e):t.branch==="B"?jE(n,e):t.level>=2?Cu(n,e):t.level>=1?xm(n,e):gm(n,e),n.userData.isGenerator=!0}function gm(n,t){const e=Ft(t),i=Vt(t),s=yt(t,.18),a=[],r=[],o=new b(hm.clone(),e);o.scale.set(16,6,16),o.position.y=3,n.add(o);const c=new b(_n.clone(),i);c.scale.set(20,20,20),c.rotation.x=Math.PI/2,c.position.y=6.5,n.add(c),a.push(c);for(let f=0;f<3;f++){const _=Math.PI*2/3*f,g=Math.cos(_)*9,p=Math.sin(_)*9,m=new b(ke.clone(),e);m.scale.set(2,12,2),m.position.set(g,12,p),n.add(m);const v=new b(re.clone(),i);v.scale.set(3,3,3),v.position.set(g,19,p),n.add(v),a.push(v)}const d=new b(Ll.clone(),i);d.scale.set(8,8,8),d.position.y=22,n.add(d),a.push(d);const u=new b(re.clone(),s);u.scale.set(13,13,13),u.position.y=22,n.add(u),r.push(u);const l=new b(_n.clone(),i);l.scale.set(18,18,18),l.position.y=22,n.add(l),a.push(l);const h=new b(_n.clone(),s);h.scale.set(15,15,15),h.position.y=22,h.rotation.x=Math.PI/3,n.add(h),r.push(h),n.userData.energyCore=d,n.userData.energyRing=l,n.userData.energyRing2=h,n.userData.coreGlow=u,n.userData.accentParts=a,n.userData.glowParts=r}function xm(n,t){gm(n,t);const e=Ft(t),i=Vt(t),s=n.userData.accentParts;for(let r=0;r<3;r++){const o=Math.PI*2/3*r+Math.PI/3,c=Math.cos(o)*11,d=Math.sin(o)*11,u=new b(ke.clone(),e);u.scale.set(1.8,14,1.8),u.position.set(c,13,d),n.add(u);const l=new b(re.clone(),i);l.scale.set(2.5,2.5,2.5),l.position.set(c,21,d),n.add(l),s.push(l)}const a=new b(_n.clone(),i);a.scale.set(14,14,14),a.rotation.x=Math.PI/2,a.position.y=14,n.add(a),s.push(a)}function Cu(n,t){xm(n,t);const e=Ft(t),i=Vt(t),s=yt(t,.2),a=n.userData.accentParts,r=n.userData.glowParts,o=new b(ke.clone(),e);o.scale.set(1.5,14,1.5),o.position.y=33,n.add(o);const c=new b(dr.clone(),i);c.scale.set(4,4,4),c.position.y=41,n.add(c),a.push(c);const d=new b(_n.clone(),i);d.scale.set(12,12,12),d.rotation.x=Math.PI/2,d.position.y=28,n.add(d),a.push(d);const u=new b(re.clone(),s);u.scale.set(18,18,18),u.position.y=22,n.add(u),r.push(u)}function ZE(n,t){Cu(n,t);const e=Vt(t),i=yt(t,.3),s=n.userData.accentParts,a=n.userData.glowParts,r=new b(Ll.clone(),e);r.scale.set(12,12,12),r.position.y=22,n.add(r),s.push(r),n.userData.energyCore=r;for(let c=0;c<6;c++){const d=Math.PI*2/6*c,u=Math.cos(d)*10,l=Math.sin(d)*10,h=new b(ke.clone(),e);h.scale.set(.5,14,.5),h.rotation.z=Math.PI/2,h.rotation.y=-d,h.position.set(u*.5,20,l*.5),n.add(h),s.push(h)}const o=new b(re.clone(),i);o.scale.set(24,24,24),o.position.y=22,n.add(o),a.push(o)}function jE(n,t){Cu(n,t);const e=Ft(t),i=Vt(t),s=yt(t,.15),a=n.userData.accentParts,r=n.userData.glowParts;for(let c=0;c<4;c++){const d=Math.PI/4+Math.PI/2*c,u=Math.cos(d)*16,l=Math.sin(d)*16,h=new b(it.clone(),e);h.scale.set(5,8,5),h.position.set(u,4,l),n.add(h);const f=new b(it.clone(),i);f.scale.set(5.5,1,5.5),f.position.set(u,8.5,l),n.add(f),a.push(f);const _=new b(ke.clone(),i);_.scale.set(.4,16,.4),_.rotation.z=Math.PI/2,_.rotation.y=-d,_.position.set(u*.5,6,l*.5),n.add(_),a.push(_)}const o=new b(_n.clone(),s);o.scale.set(30,30,30),o.rotation.x=Math.PI/2,o.position.y=.3,n.add(o),r.push(o)}function KE(n,t){const e=t.team===nt?zt.PLAYER:zt.ENEMY,i=li(e);t.branch==="A"?JE(n,i):t.branch==="B"?QE(n,i):t.level>=2?Pu(n,i):t.level>=1?Mm(n,i):vm(n,i),n.userData.isHelipad=!0}function vm(n,t){const e=li(zt.HELIPAD),i=Ft(t),s=Vt(e),a=yt(e,.12),r=[],o=[],c=Z*2,d=new b(it.clone(),i);d.scale.set(c,3,c),d.position.y=1.5,n.add(d);const u=new b(it.clone(),s);u.scale.set(c+2,.8,c+2),u.position.y=3.2,n.add(u),r.push(u);const l=new b(it.clone(),i);l.scale.set(c*.75,1.5,c*.75),l.position.y=3.8,n.add(l);const h=4.8,f=3,_=.4,g=c*.35,p=c*.25,m=new b(it.clone(),s);m.scale.set(f,_,g),m.position.set(-p/2,h,0),n.add(m),r.push(m);const v=new b(it.clone(),s);v.scale.set(f,_,g),v.position.set(p/2,h,0),n.add(v),r.push(v);const M=new b(it.clone(),s);M.scale.set(p+f,_,f),M.position.set(0,h,0),n.add(M),r.push(M);const y=new b(Xi.clone(),yt(e,.08));y.scale.set(p+f+6,g+6,1),y.rotation.x=-Math.PI/2,y.position.y=4.6,n.add(y),o.push(y);const T=c*.42,w=[[-T,5,-T],[T,5,-T],[-T,5,T],[T,5,T]];for(const[V,H,et]of w){const tt=new b(ke.clone(),i);tt.scale.set(1.5,6,1.5),tt.position.set(V,3,et),n.add(tt);const ht=new b(re.clone(),s);ht.scale.setScalar(3),ht.position.set(V,H+2,et),n.add(ht),r.push(ht);const lt=new b(re.clone(),a);lt.scale.setScalar(5),lt.position.set(V,H+2,et),n.add(lt),o.push(lt)}const A=new b(_n.clone(),a);A.scale.set(c*.9,c*.9,c*.9),A.rotation.x=Math.PI/2,A.position.y=4,n.add(A),o.push(A);const x=Vt(e);for(let V=-1;V<=1;V+=2){const H=new b(it.clone(),x);H.scale.set(c*.8,.5,.8),H.position.set(0,3,V*(c*.48)),n.add(H),r.push(H);const et=new b(it.clone(),x);et.scale.set(.8,.5,c*.8),et.position.set(V*(c*.48),3,0),n.add(et),r.push(et)}const S=T-5,I=-T+5,C=new b(it.clone(),i);C.scale.set(5,10,5),C.position.set(S,5,I),n.add(C);const U=new b(it.clone(),s);U.scale.set(5.5,1,5.5),U.position.set(S,10.5,I),n.add(U),r.push(U);const L=new b(ke.clone(),i);L.scale.set(.8,12,.8),L.position.set(S,17,I),n.add(L);const k=new b(re.clone(),s);k.scale.setScalar(2),k.position.set(S,23.5,I),n.add(k),r.push(k);const B=new b(re.clone(),yt(e,.2));B.scale.setScalar(3.5),B.position.set(S,23.5,I),n.add(B),o.push(B),n.userData.accentParts=r,n.userData.glowParts=o}function Mm(n,t){vm(n,t);const e=li(zt.HELIPAD),i=Ft(t),s=Vt(e),a=n.userData.accentParts,r=Z*2,o=r*.42;for(let u=-1;u<=1;u+=2){const l=new b(ke.clone(),i);l.scale.set(4,6,4),l.rotation.z=Math.PI/2,l.position.set(u*14,5,o-2),n.add(l);const h=new b(re.clone(),s);h.scale.set(4,4,4),h.position.set(u*14+u*3,5,o-2),n.add(h),a.push(h)}const c=Vt(e);for(let u=-1;u<=1;u+=2){const l=new b(it.clone(),c);l.scale.set(r*.5,.3,.6),l.position.set(0,4.9,u*(r*.2)),n.add(l),a.push(l)}const d=[[-o,-o],[o,-o],[-o,o],[o,o]];for(const[u,l]of d){const h=new b(ke.clone(),i);h.scale.set(1.2,4,1.2),h.position.set(u,10,l),n.add(h);const f=new b(re.clone(),s);f.scale.setScalar(2),f.position.set(u,12.5,l),n.add(f),a.push(f)}}function Pu(n,t){Mm(n,t);const e=li(zt.HELIPAD),i=Ft(t),s=Vt(e),a=yt(e,.15),r=n.userData.accentParts,o=n.userData.glowParts,d=Z*2*.42,u=d-5,l=-d+5,h=new b(ke.clone(),i);h.scale.set(1,6,1),h.position.set(u,27,l),n.add(h);const f=new b(re.clone(),i);f.scale.set(8,3,8),f.position.set(u,31,l),n.add(f);const _=new b(re.clone(),s);_.scale.set(2,2,2),_.position.set(u,33,l),n.add(_),r.push(_);for(let g=-1;g<=1;g+=2)for(let p=-1;p<=1;p+=2){const m=new b(re.clone(),s);m.scale.setScalar(1.5),m.position.set(g*18,5,p*18),n.add(m),r.push(m);const v=new b(re.clone(),a);v.scale.setScalar(3),v.position.set(g*18,5,p*18),n.add(v),o.push(v)}for(let g=0;g<8;g++){const p=Math.PI*2/8*g,m=Math.cos(p)*(d+2),v=Math.sin(p)*(d+2),M=new b(it.clone(),i);M.scale.set(1,8,1),M.position.set(m,4,v),n.add(M);const y=new b(re.clone(),s);y.scale.setScalar(1.2),y.position.set(m,8.5,v),n.add(y),r.push(y)}}function JE(n,t){Pu(n,t);const e=li(zt.HELIPAD),i=Ft(t),s=Vt(e),a=yt(e,.2),r=n.userData.accentParts,o=n.userData.glowParts,d=Z*2*.42;for(let f=-1;f<=1;f+=2)for(let _=0;_<2;_++){const g=-12+_*24,p=new b(it.clone(),i);p.scale.set(6,5,10),p.position.set(f*(d-8),2.5,g),n.add(p);const m=new b(it.clone(),s);m.scale.set(6.5,.8,10.5),m.position.set(f*(d-8),5.5,g),n.add(m),r.push(m)}for(let f=-1;f<=1;f+=2){const _=new b(it.clone(),i);_.scale.set(3,28,3),_.position.set(f*28,14,0),n.add(_)}const u=new b(it.clone(),i);u.scale.set(60,3,4),u.position.set(0,29,0),n.add(u);const l=new b(it.clone(),s);l.scale.set(62,.8,1),l.position.set(0,31,0),n.add(l),r.push(l);for(let f=0;f<3;f++){const _=-16+f*16,g=new b(it.clone(),i);g.scale.set(4,3,4),g.position.set(_,1.5,d-10),n.add(g);const p=new b(it.clone(),s);p.scale.set(2,.3,2),p.position.set(_,3.2,d-10),n.add(p),r.push(p)}const h=new b(Xi.clone(),a);h.scale.set(50,50,1),h.rotation.x=-Math.PI/2,h.position.y=4.7,n.add(h),o.push(h)}function QE(n,t){Pu(n,t);const e=li(zt.HELIPAD),i=Ft(t),s=Vt(e),a=yt(e,.18),r=n.userData.accentParts,o=n.userData.glowParts,c=Z*2,d=c*.42;for(let l=-1;l<=1;l+=2)for(let h=0;h<3;h++){const f=new b(it.clone(),s);f.scale.set(c*.7,.3,.5),f.position.set(0,4.9,l*(8+h*6)),n.add(f),r.push(f)}for(let l=-1;l<=1;l+=2){const h=new b(it.clone(),i);h.scale.set(c*.85,2,3),h.position.set(0,3.5,l*22),n.add(h);const f=new b(it.clone(),s);f.scale.set(c*.85,.5,1),f.position.set(0,4.8,l*22),n.add(f),r.push(f)}const u=[[0,-d],[0,d],[-d,0],[d,0]];for(const[l,h]of u){const f=new b(ke.clone(),i);f.scale.set(1.5,14,1.5),f.position.set(l,7,h),n.add(f);const _=new b(re.clone(),s);_.scale.setScalar(3),_.position.set(l,15,h),n.add(_),r.push(_);const g=new b(re.clone(),a);g.scale.setScalar(5),g.position.set(l,15,h),n.add(g),o.push(g)}}function tw(n,t){const e=t.team===nt?zt.PLAYER:zt.ENEMY,i=li(e),s=t.orientation||ra,a=t.level;s===ra||s===Zo?(a>=2?iw(n,i):a>=1?nw(n,i):ew(n,i),s===Zo&&(n.rotation.y=Math.PI/2)):sw(n,i,a,s),n.userData.isWall=!0}function ew(n,t){const e=Ft(t),i=Vt(He(t)),s=yt(t,.12),a=[],r=[],o=new b(it.clone(),e);o.scale.set(35,25,8),o.position.y=12.5,n.add(o);const c=new b(it.clone(),i);c.scale.set(36,1.5,9),c.position.y=25.5,n.add(c),a.push(c);const d=new b(it.clone(),i);d.scale.set(36,1,9),d.position.y=.5,n.add(d),a.push(d);const u=new b(it.clone(),s);u.scale.set(37,2,10),u.position.y=26,n.add(u),r.push(u);for(let l=-1;l<=1;l+=2){const h=new b(it.clone(),e);h.scale.set(3,27,9),h.position.set(l*17,13.5,0),n.add(h);const f=new b(re.clone(),i);f.scale.set(3.5,3.5,3.5),f.position.set(l*17,27.5,0),n.add(f),a.push(f)}n.userData.accentParts=a,n.userData.glowParts=r}function nw(n,t){const e=Ft(t),i=Vt(He(t)),s=yt(t,.15),a=[],r=[],o=new b(it.clone(),e);o.scale.set(35,35,10),o.position.y=17.5,n.add(o);const c=new b(it.clone(),e);c.scale.set(4,33,12),c.position.y=17,n.add(c);const d=new b(it.clone(),i);d.scale.set(36,1.5,11),d.position.y=35.5,n.add(d),a.push(d);const u=new b(it.clone(),i);u.scale.set(34,.8,10.5),u.position.y=22,n.add(u),a.push(u);const l=new b(it.clone(),i);l.scale.set(36,1,11),l.position.y=.5,n.add(l),a.push(l);const h=new b(it.clone(),s);h.scale.set(37,2.5,12),h.position.y=36,n.add(h),r.push(h);for(let f=-1;f<=1;f+=2){const _=new b(it.clone(),e);_.scale.set(3.5,37,11),_.position.set(f*17,18.5,0),n.add(_);const g=new b(dr.clone(),i);g.scale.set(4,4,4),g.position.set(f*17,38,0),n.add(g),a.push(g);const p=new b(re.clone(),s);p.scale.set(6,6,6),p.position.set(f*17,38,0),n.add(p),r.push(p)}n.userData.accentParts=a,n.userData.glowParts=r}function iw(n,t){const e=Ft(t),i=Vt(He(t)),s=yt(t,.18),a=[],r=[],o=new b(it.clone(),e);o.scale.set(35,45,12),o.position.y=22.5,n.add(o);for(let p=-1;p<=1;p+=2){const m=new b(it.clone(),e);m.scale.set(3,43,13),m.position.set(p*10,22,0),n.add(m)}const c=new b(hm.clone(),e);c.scale.set(8,1.5,8),c.rotation.x=Math.PI/2,c.position.set(0,28,7),n.add(c);const d=new b(_n.clone(),i);d.scale.set(10,10,10),d.rotation.x=Math.PI/2,d.position.set(0,28,7.5),n.add(d),a.push(d);const u=new b(it.clone(),i);u.scale.set(36,1.5,13),u.position.y=45.5,n.add(u),a.push(u);const l=new b(it.clone(),i);l.scale.set(34,.8,12.5),l.position.y=43,n.add(l),a.push(l);const h=new b(it.clone(),i);h.scale.set(34,.8,12.5),h.position.y=28,n.add(h),a.push(h);const f=new b(it.clone(),i);f.scale.set(36,1.2,13),f.position.y=.6,n.add(f),a.push(f);const _=new b(it.clone(),s);_.scale.set(37,3,14),_.position.y=46,n.add(_),r.push(_);for(let p=-1;p<=1;p+=2){const m=new b(it.clone(),e);m.scale.set(4,47,13),m.position.set(p*17,23.5,0),n.add(m);const v=new b(Ll.clone(),i);v.scale.set(5,5,5),v.position.set(p*17,48,0),n.add(v),a.push(v);const M=new b(re.clone(),s);M.scale.set(8,8,8),M.position.set(p*17,48,0),n.add(M),r.push(M);const y=new b(it.clone(),i);y.scale.set(.5,40,.5),y.position.set(p*17,22,7),n.add(y),a.push(y)}const g=new b(re.clone(),s);g.scale.set(10,10,4),g.position.set(0,28,8),n.add(g),r.push(g),n.userData.accentParts=a,n.userData.glowParts=r}function sw(n,t,e,i){const s=[.12,.15,.18][e]||.12,a=Ft(t),r=Vt(He(t)),o=yt(t,s),c=[],d=[],u=[25,35,45][e]||25,l=[8,10,12][e]||8,h=18,f=u/2;let _,g;switch(i){case Jd:_=1,g=-1;break;case Qd:_=-1,g=-1;break;case tu:_=1,g=1;break;case eu:_=-1,g=1;break;default:_=1,g=-1;break}const p=new b(it.clone(),a);p.scale.set(h,u,l),p.position.set(_*(h/2),f,0),n.add(p);const m=new b(it.clone(),a);m.scale.set(l,u,h),m.position.set(0,f,g*(h/2)),n.add(m);const v=new b(it.clone(),a);v.scale.set(l,u,l),v.position.set(0,f,0),n.add(v);const M=new b(it.clone(),r);M.scale.set(h+1,1.5,l+1),M.position.set(_*(h/2),u+.5,0),n.add(M),c.push(M);const y=new b(it.clone(),r);y.scale.set(l+1,1.5,h+1),y.position.set(0,u+.5,g*(h/2)),n.add(y),c.push(y);const T=new b(it.clone(),r);T.scale.set(l+1,1.5,l+1),T.position.set(0,u+.5,0),n.add(T),c.push(T);const w=new b(it.clone(),r);w.scale.set(h+1,1,l+1),w.position.set(_*(h/2),.5,0),n.add(w),c.push(w);const A=new b(it.clone(),r);A.scale.set(l+1,1,h+1),A.position.set(0,.5,g*(h/2)),n.add(A),c.push(A);const x=new b(it.clone(),o);x.scale.set(h+2,2,l+2),x.position.set(_*(h/2),u+1,0),n.add(x),d.push(x);const S=new b(it.clone(),o);S.scale.set(l+2,2,h+2),S.position.set(0,u+1,g*(h/2)),n.add(S),d.push(S);const I=new b(it.clone(),a),C=[3,3.5,4][e]||3;I.scale.set(C,u+2,C),I.position.set(0,f+1,0),n.add(I);const U=[re,dr,Ll][e]||re,L=[3.5,4,5][e]||3.5,k=new b(U.clone(),r);if(k.scale.set(L,L,L),k.position.set(0,u+3,0),n.add(k),c.push(k),e>=1){const lt=[0,6,8][e]||6,ct=new b(re.clone(),o);ct.scale.set(lt,lt,lt),ct.position.set(0,u+3,0),n.add(ct),d.push(ct)}const B=_*h,V=g*h,H=new b(it.clone(),a);H.scale.set(C,u+2,l+1),H.position.set(B,f+1,0),n.add(H);const et=new b(U.clone(),r);et.scale.set(L,L,L),et.position.set(B,u+3,0),n.add(et),c.push(et);const tt=new b(it.clone(),a);tt.scale.set(l+1,u+2,C),tt.position.set(0,f+1,V),n.add(tt);const ht=new b(U.clone(),r);if(ht.scale.set(L,L,L),ht.position.set(0,u+3,V),n.add(ht),c.push(ht),e>=1){const lt=[0,6,8][e]||6,ct=new b(re.clone(),o);ct.scale.set(lt,lt,lt),ct.position.set(B,u+3,0),n.add(ct),d.push(ct);const Wt=new b(re.clone(),o);Wt.scale.set(lt,lt,lt),Wt.position.set(0,u+3,V),n.add(Wt),d.push(Wt)}if(e>=2){const lt=new b(it.clone(),r);lt.scale.set(h-2,.8,l+.5),lt.position.set(_*(h/2),u*.6,0),n.add(lt),c.push(lt);const ct=new b(it.clone(),r);ct.scale.set(l+.5,.8,h-2),ct.position.set(0,u*.6,g*(h/2)),n.add(ct),c.push(ct);const Wt=new b(it.clone(),a);Wt.scale.set(3,u-2,l+1),Wt.position.set(_*(h/2),f,0),n.add(Wt);const be=new b(it.clone(),a);be.scale.set(l+1,u-2,3),be.position.set(0,f,g*(h/2)),n.add(be)}if(e===1){const lt=new b(it.clone(),r);lt.scale.set(h-2,.8,l+.5),lt.position.set(_*(h/2),u*.6,0),n.add(lt),c.push(lt);const ct=new b(it.clone(),r);ct.scale.set(l+.5,.8,h-2),ct.position.set(0,u*.6,g*(h/2)),n.add(ct),c.push(ct)}n.userData.accentParts=c,n.userData.glowParts=d}function Ff(n,t){n.traverse(e=>{e.isMesh&&e.material.emissive&&e.material.emissive.setScalar(t)})}function aw(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}function dl(n,t){const e=n.team===nt?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=n.team===kt,s=new Ee;switch(n.type){case Rs:ow(s,e,i);break;case Ia:lw(s,e,i);break;case js:cw(s,e,i);break;case gn:fw(s,e,i),s.scale.setScalar(1.8);break;case Wa:gw(s,i);break;case Xa:xw(s,i);break}if(n.upgradeLevel>0||n.upgradeBranch){const _=n.upgradeBranch?3:n.upgradeLevel,g={[Rs]:8,[Ia]:10,[js]:16}[n.type]||8;for(let p=0;p<_;p++){const m=new b(new ae(g+p*1.5,.25,4,16),yt(e,.2));m.rotation.x=Math.PI/2,m.position.y=-1+p*1.2,s.add(m),s.userData.glowParts||(s.userData.glowParts=[]),s.userData.glowParts.push(m)}}const a={[Rs]:12,[Ia]:15,[js]:22,[gn]:16,[Wa]:10,[Xa]:14}[n.type]||12,r=new el(a-1.5,a,32),o=new Nn({color:y_,transparent:!0,opacity:.9,side:Kn,depthWrite:!1}),c=new b(r,o);c.rotation.x=-Math.PI/2,c.visible=!1,s.add(c),s.userData._selectionRing=c;const d=a+3,u=new el(d-1.2,d,32),l=new Nn({color:S_,transparent:!0,opacity:.5,side:Kn,depthWrite:!1}),h=new b(u,l);h.rotation.x=-Math.PI/2,h.visible=!1,s.add(h),s.userData._squadHighlightRing=h;const f={[Rs]:3,[Ia]:3,[js]:2,[gn]:Sl}[n.type]||10;s.position.set(n.x,f,n.z),s.userData.baseY=f,s.userData.idOffset=n.idOffset,s.userData.lastX=n.x,s.userData.lastZ=n.z,s.userData.smoothAngle=0,t.add(s),n.mesh=s}function rw(n,t,e){for(let i=0;i<t.length;i++){const s=t[i];if(!s.mesh)continue;const a=s.mesh,r=a.userData.idOffset||0,o=a.userData.unitType;a.position.x=s.x,a.position.z=s.z,a.position.y=a.userData.baseY;const c=s.x-a.userData.lastX,d=s.z-a.userData.lastZ,u=c*c+d*d;if(u>.01){const g=Math.atan2(c,d),p=a.userData.smoothAngle||0;let m=g-p;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;const v=p+m*.12;a.rotation.y=v,a.userData.smoothAngle=v,o==="rifle"&&(a.rotation.x+=(-.06-a.rotation.x)*.1)}else if(s.targetX!==void 0&&s.targetZ!==void 0&&s.inCombat&&o!=="helicopter"){const g=s.targetX-s.x,p=s.targetZ-s.z,m=Math.atan2(g,p),v=a.userData.smoothAngle||0;let M=m-v;for(;M>Math.PI;)M-=Math.PI*2;for(;M<-Math.PI;)M+=Math.PI*2;const y=v+M*.15;a.rotation.y=y,a.userData.smoothAngle=y,a.rotation.z*=.92,a.rotation.x*=.92}else a.rotation.z*=.92,a.rotation.x*=.92;if(a.userData.lastX=s.x,a.userData.lastZ=s.z,o==="rifle")dw(a,s,n,r,u);else if(o==="assault")uw(a,s,n,r,u);else if(o==="tank")hw(a,s,n,r);else if(o==="medic"||o==="engineer")vw(a,s,n,r);else if(o==="helicopter"){pw(a,s,n,r,u);const g=a.userData.selectRing;if(g){const p=e!=null&&s.id===e;g.visible=p,p&&(g.material.opacity=.4+.2*Math.sin(n*5),g.rotation.z+=.02)}}const l=a.userData.glowParts;if(l){const g=s.inCombat?6:3,p=s.inCombat?.14:.07;for(let m=0;m<l.length;m++){const v=l[m].material;v.transparent&&(v.userData||(v.userData={}),v.userData.baseOp==null&&(v.userData.baseOp=v.opacity),v.opacity=v.userData.baseOp+p*Math.sin(n*g+r))}}a.userData.threatRing&&(a.userData.threatRing.rotation.y+=.025,a.userData.threatRing.rotation.z=.25*Math.sin(n*1.5+r));const h=s.hp/s.maxHp;if(h<.5){const g=(1-h*2)*.35;if(a.traverse(p=>{p.isMesh&&p.material.emissive&&(p.material.emissiveIntensity=1+g)}),h<.25&&l){const p=Math.random()>.82?.35:0;for(const m of l){const v=m.material.userData?.baseOp??m.material.opacity;m.material.opacity=v+p}}}else a.traverse(g=>{g.isMesh&&g.material.emissive&&(g.material.emissiveIntensity=1)});const f=a.userData._selectionRing,_=a.userData._squadHighlightRing;f&&(f.visible=!!s.selected,f.position.y=-a.userData.baseY+.5,f.visible&&(f.material.opacity=.7+.2*Math.sin(n*5+r))),_&&(_.visible=!!s.squadHighlight,_.position.y=-a.userData.baseY+.3,_.visible&&(_.material.opacity=.35+.15*Math.sin(n*3+r))),s.hitFlashTimer>0?(Of(a,s.hitFlashTimer/Oa),s.hitFlashTimer-=1/60,s.hitFlashTimer<0&&(s.hitFlashTimer=0)):Of(a,0)}}function Du(n,t){n.mesh&&(t.remove(n.mesh),Mw(n.mesh),n.mesh=null)}function ow(n,t,e){const i=Ft(t),s=Vt(t),a=new Ee;n.add(a),D(a,new Et(1,1.4,5,6),i,-2.2,3.5,0),D(a,new Tt(1.2,6,4),s,-2.2,1.2,.3),D(a,new Et(1.3,.9,4.5,6),i,-2.2,-1.2,.5),D(a,new q(1.4,3.5,.8),i,-2.2,-.8,1.4),D(a,new q(2.2,1.2,3.5),i,-2.2,-3.2,.8),D(a,new q(1.8,.25,3),s,-2.2,-2.6,.8);const r=D(a,new ae(1.4,.25,4,8),yt(t,.15),-2.2,-3,.8);r.rotation.x=Math.PI/2;const o=new Ee;n.add(o),D(o,new Et(1,1.4,5,6),i,2.2,3.5,0),D(o,new Tt(1.2,6,4),s,2.2,1.2,.3),D(o,new Et(1.3,.9,4.5,6),i,2.2,-1.2,.5),D(o,new q(1.4,3.5,.8),i,2.2,-.8,1.4),D(o,new q(2.2,1.2,3.5),i,2.2,-3.2,.8),D(o,new q(1.8,.25,3),s,2.2,-2.6,.8);const c=D(o,new ae(1.4,.25,4,8),yt(t,.15),2.2,-3,.8);c.rotation.x=Math.PI/2,D(n,new Et(2.8,2.4,2,6),i,0,7,0);const d=D(n,new ae(2.9,.3,4,12),s,0,6.2,0);d.rotation.x=Math.PI/2,D(n,new q(7,6.5,5),i,0,11.5,0);const u=D(n,new q(6,4,1.2),i,0,12,3);u.rotation.x=-.1;for(let w=0;w<2;w++)D(n,new q(4,.2,.15),s,0,10.5+w*1.4,3.4);D(n,new q(.8,4.5,4),i,-4,11.5,0),D(n,new q(.8,4.5,4),i,4,11.5,0);const l=new Ee;l.position.set(-5.5,14,0),n.add(l),D(l,new q(3.5,2.5,4),i,0,0,0),D(l,new q(3,.3,3.5),s,0,1.5,0);const h=new Ee;h.position.set(5.5,14,0),n.add(h),D(h,new q(3.5,2.5,4),i,0,0,0),D(h,new q(3,.3,3.5),s,0,1.5,0),D(n,new Tt(1.1,6,4),s,-5.5,12.5,.5),D(n,new Et(.8,1,4.5,6),i,-5.5,10,1).rotation.x=-.2,D(n,new Tt(.8,6,4),i,-5.5,8,1.5),D(n,new Tt(1.1,6,4),s,5.5,12.5,.5),D(n,new Et(.8,1,4.5,6),i,5.5,10,1).rotation.x=-.2,D(n,new Tt(.8,6,4),i,5.5,8,1.5),D(n,new q(1,1,3),i,2,9,-1),D(n,new q(1.2,1.4,5),i,2,9,3);const f=D(n,new Et(.25,.3,8,4),i,2,9,9.5);f.rotation.x=-Math.PI/2,D(n,new Et(.5,.5,4,6),i,2,9,7).rotation.x=-Math.PI/2;const _=D(n,new Tt(.5,6,4),s,2,9,13.5),g=D(n,new Tt(1.2,6,4),yt(t,.15),2,9,13.5);D(n,new q(.6,2.2,1),s,2,7.8,2.5),D(n,new Et(1,1.4,1.5,6),i,0,15.5,.3);const p=D(n,new q(3.5,3,3.8),i,0,17.5,.3);D(n,new q(.8,1.2,3.5),i,0,19.3,.3);const m=D(n,new q(3.6,1.1,.6),s,0,17.5,2.3);D(n,new q(4,1.4,.3),yt(t,.25),0,17.5,2.5),D(n,new Et(.15,.15,2.5,4),i,1.5,19.8,.3);const v=D(n,new Tt(.35,6,4),s,1.5,21.2,.3);D(n,new q(4.5,4,2.5),i,0,12,-3.5),D(n,new q(3,.25,.2),s,0,13.5,-2.3),D(n,new q(3,.25,.2),s,0,11.5,-2.3);const M=D(n,new Tt(1,6,4),s,0,12,-2.5),y=D(n,new Tt(1.8,6,4),yt(t,.14),0,12,-2.5),T=D(n,new ae(5,.5,4,14),s,0,.5,0);if(T.rotation.x=Math.PI/2,e){const w=D(n,new ae(9,.35,6,18),s,0,10,0);w.rotation.x=Math.PI/4,n.userData.threatRing=w}n.userData.accentParts=[m,d,v,M,_,T],n.userData.glowParts=[r,c,y,g],n.userData.muzzleFlash=_,n.userData.muzzleGlow=g,n.userData.head=p,n.userData.lLegGrp=a,n.userData.rLegGrp=o,n.userData.lShoulder=l,n.userData.rShoulder=h,n.userData.unitType="rifle"}function lw(n,t,e){const i=Ft(t),s=Vt(t),a=new Ee;n.add(a);const r=new Et(1.6,2.2,8,6);D(a,r,i,-4,6,0).rotation.z=.1,D(a,new Tt(1.8,6,4),s,-4.5,3,.5),D(a,new Et(2,1.4,7,6),i,-4.5,-.5,1),D(a,new q(2.2,5,1.2),i,-4.5,0,2.2),D(a,new q(3.5,1.5,5.5),i,-4.5,-3.8,1.5),D(a,new q(3,.3,4.5),s,-4.5,-3,1.5),D(a,new Tt(1.2,6,4),s,-4.5,-2.8,1);const o=new Ee;n.add(o),D(o,r,i,4,6,0).rotation.z=-.1,D(o,new Tt(1.8,6,4),s,4.5,3,.5),D(o,new Et(2,1.4,7,6),i,4.5,-.5,1),D(o,new q(2.2,5,1.2),i,4.5,0,2.2),D(o,new q(3.5,1.5,5.5),i,4.5,-3.8,1.5),D(o,new q(3,.3,4.5),s,4.5,-3,1.5),D(o,new Tt(1.2,6,4),s,4.5,-2.8,1),D(n,new Et(4,3.5,3,8),i,0,11,0);const c=D(n,new ae(4.2,.5,6,14),s,0,10,0);c.rotation.x=Math.PI/2,D(n,new q(3,2.5,4),i,-5,10.5,0),D(n,new q(3,2.5,4),i,5,10.5,0),D(n,new q(11,10,7.5),i,0,18,0);const d=D(n,new q(9,6,1.8),i,0,18.5,4.8);d.rotation.x=-.12,D(n,new q(1.2,7,6),i,-6.5,18,0),D(n,new q(1.2,7,6),i,6.5,18,0);const u=D(n,new Tt(2.2,8,6),s,0,18,5),l=D(n,new Tt(3.5,8,6),yt(t,.18),0,18,5);for(let A=0;A<3;A++)D(n,new q(6,.25,.2),s,0,15.5+A*1.5,5.2);const h=new Ee;h.position.set(-9,21,0),h.rotation.z=-.15,n.add(h),D(h,new q(5.5,4.5,6.5),i,0,0,0),D(h,new q(4.5,.5,5.5),s,0,2.5,0),D(h,new tr(1.2),s,0,3.5,0),D(h,new q(5,.3,.4),s,0,0,3.5);const f=new Ee;f.position.set(9,21,0),f.rotation.z=.15,n.add(f),D(f,new q(5.5,4.5,6.5),i,0,0,0),D(f,new q(4.5,.5,5.5),s,0,2.5,0),D(f,new tr(1.2),s,0,3.5,0),D(f,new q(5,.3,.4),s,0,0,3.5),D(n,new Tt(1.8,6,4),s,-9,17,1),D(n,new Et(1.3,1.6,7,6),i,-9,14,2).rotation.x=-.25,D(n,new Tt(1.3,6,4),i,-9,11,3.5),D(n,new Et(.8,1,7,4),i,-9,10,7.5).rotation.x=-Math.PI/2;const _=D(n,new Qa(1.2,2.5,4),s,-9,10,11.5);_.rotation.x=-Math.PI/2,D(n,new Tt(1.8,6,4),s,9,17,1),D(n,new Et(1.3,1.6,7,6),i,9,14,2).rotation.x=-.25,D(n,new Tt(1.3,6,4),i,9,11,3.5),D(n,new Et(.8,1,7,4),i,9,10,7.5).rotation.x=-Math.PI/2;const g=D(n,new Qa(1.2,2.5,4),s,9,10,11.5);g.rotation.x=-Math.PI/2,D(n,new Et(1.5,2,2,6),i,0,24,.5);const p=D(n,new q(4.5,3.5,4.5),i,0,26.5,1),m=D(n,new q(4,1.2,.8),s,0,27,3.5);D(n,new q(4.5,1.6,.4),yt(t,.2),0,27,3.8),D(n,new q(1,2.5,3),i,0,29.5,1),D(n,new Et(.2,.2,4.5,4),i,2.5,29.5,1);const v=D(n,new Tt(.5,6,4),s,2.5,32,1);D(n,new q(7,7,4),i,0,18,-5.5),D(n,new q(5,.3,.3),s,0,21,-3.5),D(n,new q(5,.3,.3),s,0,19,-3.5),D(n,new q(4,1,2.5),i,0,22.5,-5.5),D(n,new Et(1.2,1.2,2.5,6),i,-2.2,20.5,-8),D(n,new Et(1.2,1.2,2.5,6),i,2.2,20.5,-8);const M=D(n,new Tt(1.4,6,4),s,-2.2,20.5,-9.5),y=D(n,new Tt(1.4,6,4),s,2.2,20.5,-9.5),T=D(n,new ae(2.8,.35,4,10),yt(t,.18),-4.5,-3.5,1.5);T.rotation.x=Math.PI/2;const w=D(n,new ae(2.8,.35,4,10),yt(t,.18),4.5,-3.5,1.5);if(w.rotation.x=Math.PI/2,e){const A=D(n,new ae(14,.4,6,22),s,0,16,0);A.rotation.x=Math.PI/4,n.userData.threatRing=A}n.userData.accentParts=[u,c,m,v,M,y,_,g],n.userData.glowParts=[l,T,w],n.userData.reactor=u,n.userData.reactorGlow=l,n.userData.head=p,n.userData.lLegGrp=a,n.userData.rLegGrp=o,n.userData.lShoulder=h,n.userData.rShoulder=f,n.userData.unitType="assault"}function cw(n,t,e){const i=Ft(t),s=Vt(t);D(n,new q(22,5,28),i,0,5,0);const a=D(n,new q(20,4.5,6),i,0,6.5,15);a.rotation.x=-.35,D(n,new q(18,1.5,2),i,0,3.5,16),D(n,new q(18,4,2.5),i,0,6,-15);const r=D(n,new q(16,3,3),i,0,5,-16);r.rotation.x=.25,D(n,new q(1.8,4,24),i,-12,4,0),D(n,new q(1.8,4,24),i,12,4,0),D(n,new q(.6,2,10),i,-12.5,5.5,3),D(n,new q(.6,2,10),i,12.5,5.5,3),D(n,new q(.6,2,8),i,-12.5,5.5,-6),D(n,new q(.6,2,8),i,12.5,5.5,-6),D(n,new q(.3,.6,22),s,-13,5,0),D(n,new q(.3,.6,22),s,13,5,0),D(n,new q(8,.8,6),i,-5,8,-6),D(n,new q(8,.8,6),i,5,8,-6),D(n,new q(18,.2,.4),s,0,7.7,5),D(n,new q(18,.2,.4),s,0,7.7,-3);const o=new Et(2.8,3.2,3.5,6),c=[[-9,1.5,11],[9,1.5,11],[-9,1.5,-11],[9,1.5,-11]],d=[];for(const[L,k,B]of c){D(n,o,i,L,k,B);const V=D(n,new ae(3,.4,4,10),s,L,k-.5,B);V.rotation.x=Math.PI/2,D(n,new Tt(1.8,6,4),s,L,.5,B);const H=D(n,new ae(3.5,.6,4,12),yt(t,.2),L,0,B);H.rotation.x=Math.PI/2,d.push(H);const et=D(n,new ae(4.5,.3,4,12),yt(t,.08),L,-.3,B);et.rotation.x=Math.PI/2,d.push(et)}const u=D(n,new ae(8,1,6,18),s,0,8.5,0);u.rotation.x=Math.PI/2,D(n,new Et(7,8,3,12),i,0,10,0);const l=new Ee;l.position.y=11,n.add(l),D(l,new q(12,5.5,14),i,0,3,0);const h=D(l,new q(10,4,3.5),i,0,3.5,9);h.rotation.x=-.25,D(l,new q(1.8,4.5,12),i,-7,3,0),D(l,new q(1.8,4.5,12),i,7,3,0),D(l,new Et(2,2,.8,8),i,-3,6,-2),D(l,new q(10,.2,.3),s,0,5.8,3),D(l,new q(.3,.2,12),s,-5,5.8,0),D(l,new q(.3,.2,12),s,5,5.8,0);const f=D(l,new Et(2,2.5,22,8),i,0,3.5,18);f.rotation.x=-Math.PI/2;const _=D(l,new Et(3.2,3.2,5,8),i,0,3.5,9);_.rotation.x=-Math.PI/2;const g=new ae(2.6,.3,4,8),p=D(l,g,s,0,3.5,15);p.rotation.x=Math.PI/2;const m=D(l,g,s,0,3.5,20);m.rotation.x=Math.PI/2;const v=D(l,g,s,0,3.5,25);v.rotation.x=Math.PI/2;const M=D(l,new Et(3,2.2,3,8),s,0,3.5,30);M.rotation.x=-Math.PI/2;const y=D(l,new Tt(2,6,4),s,0,3.5,32),T=D(l,new Tt(4,6,4),yt(t,.12),0,3.5,32);D(l,new Et(.5,.5,10,4),i,3,2,13).rotation.x=-Math.PI/2,D(l,new Tt(.7,4,4),s,3,2,18);const w=D(l,new Tt(2.2,8,6),s,0,7,-3),A=D(l,new Tt(3.5,8,6),yt(t,.15),0,7,-3);D(n,new q(3.5,2.5,2.5),i,-6,6,-16.5),D(n,new q(3.5,2.5,2.5),i,6,6,-16.5);const x=D(n,new Tt(1.8,6,4),s,-6,6,-18),S=D(n,new Tt(1.8,6,4),s,6,6,-18);D(n,new Tt(2.8,6,4),yt(t,.12),-6,6,-18),D(n,new Tt(2.8,6,4),yt(t,.12),6,6,-18);const I=D(n,new ae(13,1,6,22),yt(t,.07),0,.5,0);I.rotation.x=Math.PI/2;const C=D(n,new ae(7,.6,4,14),yt(t,.1),0,1,0);C.rotation.x=Math.PI/2;const U=D(n,new ae(9,.6,6,18),s,0,9,0);if(U.rotation.x=Math.PI/2,e){const L=D(n,new ae(17,.5,6,24),s,0,8,0);L.rotation.x=Math.PI/4,n.userData.threatRing=L}n.userData.accentParts=[u,M,y,w,U,x,S],n.userData.glowParts=[...d,A,T,I,C],n.userData.turretPivot=l,n.userData.cannon=f,n.userData.cannonBaseZ=18,n.userData.muzzleFlash=y,n.userData.muzzleGlow=T,n.userData.dome=w,n.userData.domeGlow=A,n.userData.conduit=U,n.userData.hoverGlows=d,n.userData.unitType="tank"}function dw(n,t,e,i,s){const a=n.userData.lLegGrp,r=n.userData.rLegGrp;if(a&&r)if(s>.05){const h=Math.sin(e*6+i)*1.8;a.position.z=h,r.position.z=-h,a.position.y=Math.max(0,Math.sin(e*6+i))*.5,r.position.y=Math.max(0,-Math.sin(e*6+i))*.5}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=n.userData.lShoulder,c=n.userData.rShoulder;if(o&&c&&s>.05){const h=Math.sin(e*6+i+1)*.04;o.rotation.x=h,c.rotation.x=-h}const d=n.userData.head;d&&(d.rotation.y=Math.sin(e*.5+i)*.2);const u=n.userData.muzzleFlash,l=n.userData.muzzleGlow;if(u){const h=t.fireCooldown>1/t.fireRate-.08;u.scale.setScalar(h?3:.5+.15*Math.sin(e*4+i)),l&&(l.material.opacity=h?.5:.08)}}function uw(n,t,e,i,s){const a=n.userData.lLegGrp,r=n.userData.rLegGrp;if(a&&r)if(s>.05){const h=Math.sin(e*5+i)*2.5;a.position.z=h,r.position.z=-h,a.position.y=Math.max(0,Math.sin(e*5+i))*.8,r.position.y=Math.max(0,-Math.sin(e*5+i))*.8}else a.position.z*=.9,r.position.z*=.9,a.position.y*=.9,r.position.y*=.9;const o=n.userData.lShoulder,c=n.userData.rShoulder;if(o&&c&&s>.05){const h=Math.sin(e*5+i+1)*.06;o.rotation.x=h,c.rotation.x=-h}const d=n.userData.head;d&&(d.rotation.y=Math.sin(e*.7+i)*.35);const u=n.userData.reactor;u&&u.scale.setScalar(.85+.15*Math.sin(e*4+i));const l=n.userData.reactorGlow;l&&(l.material.opacity=.12+.08*Math.sin(e*4+i))}function hw(n,t,e,i,s){const a=n.userData.turretPivot;if(a&&t.targetX!==void 0&&t.targetZ!==void 0){const g=Math.atan2(t.targetX-t.x,t.targetZ-t.z)-(n.userData.smoothAngle||0);let p=n.userData._turretAngle||0,m=g-p;for(;m>Math.PI;)m-=Math.PI*2;for(;m<-Math.PI;)m+=Math.PI*2;for(p+=m*.1;p>Math.PI;)p-=Math.PI*2;for(;p<-Math.PI;)p+=Math.PI*2;n.userData._turretAngle=p,a.rotation.y=p}const r=n.userData.conduit;r&&(r.rotation.z+=.012);const o=n.userData.hoverGlows;if(o)for(let _=0;_<o.length;_++){const g=_%4<2?0:Math.PI,p=o[_].material;p.userData||(p.userData={}),p.userData.baseOp==null&&(p.userData.baseOp=p.opacity),p.opacity=p.userData.baseOp+.08*Math.sin(e*3+i+g)}const c=n.userData.cannon,d=n.userData.cannonBaseZ||18;c&&(t.fireCooldown>1/t.fireRate-.12?c.position.z=d-3:c.position.z+=(d-c.position.z)*.08);const u=n.userData.muzzleFlash,l=n.userData.muzzleGlow;if(u){const _=t.fireCooldown>1/t.fireRate-.1;u.scale.setScalar(_?4:.4),l&&(l.material.opacity=_?.5:.05)}const h=n.userData.dome;if(h){const _=t.hp/t.maxHp;h.scale.setScalar(1+(1-_)*.6)}const f=n.userData.domeGlow;if(f){const _=t.hp/t.maxHp;f.material.opacity=.1+(1-_)*.25}}function fw(n,t,e){const i=Ft(t),s=Vt(t);D(n,new q(5,4,16),i,0,0,0),D(n,new q(2,1.5,12),i,0,2.5,-1),D(n,new q(6,1,14),i,0,-2.2,0);const a=D(n,new q(4.5,3,5),i,0,.5,9);a.rotation.x=-.2;const r=D(n,new q(3.8,1.2,.6),s,0,1.5,11.2);D(n,new q(4.2,1.6,.4),yt(t,.2),0,1.5,11.5),D(n,new q(3.5,1.5,3),i,0,-1.5,9.5);const o=new Ee;o.position.set(0,-2.5,10),n.add(o),D(o,new q(2,1,2),i,0,0,0);const c=D(o,new Et(.3,.3,6,4),i,-.6,0,3);c.rotation.x=-Math.PI/2;const d=D(o,new Et(.3,.3,6,4),i,.6,0,3);d.rotation.x=-Math.PI/2;const u=D(o,new Tt(.5,6,4),s,-.6,0,6),l=D(o,new Tt(.5,6,4),s,.6,0,6),h=D(o,new Tt(1.5,6,4),yt(t,.12),0,0,6);D(n,new q(3,3,7),i,-5,0,-1),D(n,new q(2.5,.3,6),s,-5,1.8,-1);const f=D(n,new Tt(1,6,4),s,-5,0,-5),_=D(n,new Tt(1.8,6,4),yt(t,.18),-5,0,-5);D(n,new q(3,3,7),i,5,0,-1),D(n,new q(2.5,.3,6),s,5,1.8,-1);const g=D(n,new Tt(1,6,4),s,5,0,-5),p=D(n,new Tt(1.8,6,4),yt(t,.18),5,0,-5);D(n,new q(.3,2,5),s,-6.7,0,-1),D(n,new q(.3,2,5),s,6.7,0,-1),D(n,new q(2.5,2,10),i,0,.5,-13),D(n,new q(1.5,1.5,5),i,0,.5,-19.5),D(n,new q(.3,.3,12),s,0,1.8,-14),D(n,new q(.5,5,3.5),i,0,4,-20.5),D(n,new q(.3,4,.3),s,0,4,-19);const m=D(n,new Tt(.4,6,4),s,0,6.8,-20.5);D(n,new q(6,.5,2.5),i,0,1.5,-21),D(n,new q(5,.2,2),s,0,2,-21);const v=D(n,new Et(2.5,2.5,.3,12),yt(t,.15),.5,4,-22);v.rotation.z=Math.PI/2,D(n,new Tt(.5,6,4),s,.5,4,-22),D(n,new Et(.8,1,3,6),i,0,4.5,0),D(n,new Tt(1.2,6,4),s,0,6,0);const M=D(n,new Et(12,12,.3,24),yt(t,.1),0,6.5,0),y=D(n,new q(24,.15,1.2),s,0,6.5,0),T=D(n,new q(1.2,.15,24),s,0,6.5,0),w=new Ee;w.position.y=0,n.add(w),n.remove(M),n.remove(y),n.remove(T),M.position.set(0,6.5,0),y.position.set(0,6.5,0),T.position.set(0,6.5,0),w.add(M),w.add(y),w.add(T),D(n,new Et(.2,.2,1.5,4),i,-3,-3.5,4),D(n,new Et(.2,.2,1.5,4),i,-3,-3.5,-2),D(n,new q(.4,.4,10),i,-3,-4.2,1),D(n,new Et(.2,.2,1.5,4),i,3,-3.5,4),D(n,new Et(.2,.2,1.5,4),i,3,-3.5,-2),D(n,new q(.4,.4,10),i,3,-4.2,1);const A=D(n,new ae(8,.5,4,14),yt(t,.08),0,-4,0);if(A.rotation.x=Math.PI/2,e){const x=D(n,new ae(12,.4,6,20),s,0,0,0);x.rotation.x=Math.PI/4,n.userData.threatRing=x}if(!e){const x=D(n,new ae(14,.6,6,24),yt(new Ht(.2,.6,1),.5),0,-3,0);x.rotation.x=Math.PI/2,x.visible=!1,n.userData.selectRing=x}n.userData.accentParts=[r,u,l,f,g,m],n.userData.glowParts=[h,_,p,A,M],n.userData.rotorGroup=w,n.userData.tailRotor=v,n.userData.gunPivot=o,n.userData.muzzleFlash=u,n.userData.muzzleFlash2=l,n.userData.muzzleGlow=h,n.userData.unitType="helicopter"}function pw(n,t,e,i,s){const a=n.userData.rotorGroup;a&&(a.rotation.y+=.4);const r=n.userData.tailRotor;r&&(r.rotation.x+=.5),n.position.y=n.userData.baseY+Math.sin(e*2+i)*2;const o=t.x-n.userData.lastX;if(t.z-n.userData.lastZ,s>.5){const h=-o*.008;n.rotation.z+=(h-n.rotation.z)*.08;const f=-.08;n.rotation.x+=(f-n.rotation.x)*.06}else n.rotation.z*=.92,n.rotation.x*=.92;const c=n.userData.gunPivot;if(c&&t.targetX!==void 0&&t.targetZ!==void 0){const h=t.targetX-t.x,f=t.targetZ-t.z,_=n.userData.smoothAngle||0,g=Math.cos(_),p=Math.sin(_),m=h*g-f*p,v=h*p+f*g,M=Math.atan2(m,v);let y=n.userData._gunAngle||0,T=M-y;for(;T>Math.PI;)T-=Math.PI*2;for(;T<-Math.PI;)T+=Math.PI*2;for(y+=T*.15;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;n.userData._gunAngle=y,c.rotation.y=y}const d=n.userData.muzzleFlash,u=n.userData.muzzleFlash2,l=n.userData.muzzleGlow;if(d){const h=t.fireCooldown>1/t.fireRate-.06,f=Math.floor(e*10)%2===0;d.scale.setScalar(h&&f?3:.5),u&&u.scale.setScalar(h&&!f?3:.5),l&&(l.material.opacity=h?.4:.06)}}function mw(n,t){const e=n===nt?zt.UNIT_PLAYER:zt.UNIT_ENEMY,i=new Ee;return _w(i,e),i.scale.setScalar(2.5),i.position.y=nu,t.add(i),i}function ym(n,t){n&&(t.remove(n),n.traverse(e=>{e.isMesh&&(e.geometry.dispose(),e.material.dispose&&e.material.dispose())}))}function _w(n,t,e){const i=Ft(t),s=Vt(t);D(n,new q(6,4,28),i,0,0,0),D(n,new q(3,2,22),i,0,3,-2),D(n,new q(7,1.5,16),i,0,-2.5,0);const a=D(n,new q(5,3.5,6),i,0,1,15);a.rotation.x=-.15,D(n,new q(4,1.5,.6),s,0,2.5,17.5),D(n,new q(4.5,1.8,.4),yt(t,.25),0,2.5,17.8),D(n,new q(3.5,2.5,4),i,0,0,18),D(n,new q(18,.8,8),i,-12,0,-2),D(n,new q(16,.3,6),s,-12,.6,-2),D(n,new Tt(.6,6,4),s,-21,0,-2),D(n,new q(18,.8,8),i,12,0,-2),D(n,new q(16,.3,6),s,12,.6,-2),D(n,new Tt(.6,6,4),s,21,0,-2),D(n,new q(3,3,8),i,-8,-2,-1),D(n,new Tt(1.2,6,4),s,-8,-2,-5.5),D(n,new Tt(2,6,4),yt(t,.2),-8,-2,-5.5),D(n,new q(3,3,8),i,8,-2,-1),D(n,new Tt(1.2,6,4),s,8,-2,-5.5),D(n,new Tt(2,6,4),yt(t,.2),8,-2,-5.5),D(n,new q(2,2,8),i,0,1,-18),D(n,new q(.6,6,4),i,0,5,-20),D(n,new q(.3,5,.4),s,0,5,-18.5),D(n,new Tt(.5,6,4),s,0,8.5,-20),D(n,new q(8,.5,3),i,0,2,-20),D(n,new q(7,.3,2.5),s,0,2.5,-20),D(n,new q(5,.3,10),yt(16768324,.15),0,-3.5,0),D(n,new Et(.8,.3,12,6),yt(t,.1),-8,-2,-12),D(n,new Et(.8,.3,12,6),yt(t,.1),8,-2,-12),n.userData.unitType="bomber"}function D(n,t,e,i,s,a){const r=new b(t,e);return i!==void 0&&r.position.set(i,s,a),n.add(r),r}function Of(n,t){n.traverse(e=>{e.isMesh&&e.material.emissive&&e.material.emissive.setScalar(t)})}function gw(n,t){const e=pp;n.userData.unitType="medic",n.userData.baseY=4,n.userData.glowParts=[],D(n,new q(6,7,6),Ft(e),0,3.5,0),D(n,new Tt(3.5,8,6),Ft(e),0,9,0),D(n,new q(6,1.2,1.2),Vt(e),0,6,3.5),D(n,new q(1.2,6,1.2),Vt(e),0,6,3.5);const i=new b(new ae(8,.6,6,16),yt(e,.25));if(i.rotation.x=Math.PI/2,i.position.y=10,n.add(i),n.userData.glowParts.push(i),D(n,new q(4,5,3),Ft(e),0,4,-4),t){const s=new b(new ae(10,.5,4,16),Vt(zt.RED));s.rotation.x=Math.PI/2,s.position.y=1,n.add(s),n.userData.threatRing=s}}function xw(n,t){const e=mp;n.userData.unitType="engineer",n.userData.baseY=4,n.userData.glowParts=[],D(n,new q(10,8,10),Ft(e),0,4,0),D(n,new q(6,5,6),Ft(e),0,10.5,0);const i=new b(new ae(6,1.2,3,8),Vt(e));i.rotation.x=Math.PI/2,i.position.set(0,6,5.5),n.add(i),n.userData.gearMesh=i;const s=new b(new ae(12,.8,6,16),yt(e,.2));if(s.rotation.x=Math.PI/2,s.position.y=1,n.add(s),n.userData.glowParts.push(s),D(n,new q(2,8,2),Vt(e),6,6,3),D(n,new q(4,3,5),Ft(e),7,8,0),D(n,new q(4,3,5),Ft(e),-7,8,0),t){const a=new b(new ae(14,.5,4,16),Vt(zt.RED));a.rotation.x=Math.PI/2,a.position.y=1,n.add(a),n.userData.threatRing=a}}function vw(n,t,e,i){n.position.y=n.userData.baseY+Math.sin(e*3+i)*1.5,n.userData.gearMesh&&(n.userData.gearMesh.rotation.z+=.03);let s=n.userData._healBeam;if(t._healing&&t._healTargetX!==void 0){const a=t._healTargetX-t.x,r=t._healTargetZ-t.z,o=Math.sqrt(a*a+r*r);if(o>1){if(!s){const c=t.type==="medic"?pp:mp,d=new Et(.5,.5,1,4);d.rotateZ(Math.PI/2);const u=yt(c,.5+.2*Math.sin(e*8));s=new b(d,u),n.add(s),n.userData._healBeam=s}s.visible=!0,s.position.set(a/2,6,r/2),s.scale.set(o,1,1),s.lookAt(new F(a,6,r)),s.material.opacity=.4+.2*Math.sin(e*8)}}else s&&(s.visible=!1)}function Mw(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const fi=new Tt(1,8,6),yw=new Et(1,1,1,6),Sw=new ae(1,.2,4,10),Bf=new Map;function Ew(n,t){const e=Math.round(t*20)/20,i=n*100+e;let s=Bf.get(i);return s||(s=new Nn({color:n,transparent:!0,opacity:e}),Bf.set(i,s)),s}function zf(n,t){const e=n.team===nt?zt.PROJECTILE_PLAYER:zt.PROJECTILE_ENEMY,i=new Ee;n.homing?bw(i,n,e):ww(i,e),i.position.set(n.x,n.y,n.z),t.add(i),n.mesh=i}function ww(n,t){const e=new Tt(1.2,8,6),i=new b(e,Vt(t));n.add(i);const s=new Tt(2.5,8,6),a=new b(s,yt(t,.25));n.add(a)}function bw(n,t,e){const i=Vt(e),s=yt(e,.3),a=t.turretLevel||0,r=t.turretBranch;if(r==="A"){const d=new b(yw.clone(),i);d.scale.set(.6,4,.6),d.rotation.x=Math.PI/2,n.add(d);const u=new b(fi.clone(),s);u.scale.setScalar(1.2),n.add(u),n.userData.trailCount=3}else if(r==="B"){const d=new b(fi.clone(),i);d.scale.setScalar(2),n.add(d);const u=new b(fi.clone(),s);u.scale.setScalar(3.5),n.add(u);const l=[];for(let h=0;h<2;h++){const f=new b(fi.clone(),i.clone());f.scale.setScalar(.8),n.add(f),l.push(f)}n.userData.orbiters=l,n.userData.trailCount=8}else if(a>=2){const d=new b(fi.clone(),i);d.scale.setScalar(1.2),n.add(d);const u=new b(Sw.clone(),i.clone());u.scale.setScalar(2),n.add(u),n.userData.ring=u;const l=new b(fi.clone(),s);l.scale.setScalar(2.5),n.add(l),n.userData.trailCount=6}else if(a>=1){const d=new b(fi.clone(),i);d.scale.set(1,1,2.5),n.add(d);const u=new b(fi.clone(),s);u.scale.set(1.5,1.5,3),n.add(u),n.userData.trailCount=5}else{const d=new b(fi.clone(),i);d.scale.setScalar(1),n.add(d);const u=new b(fi.clone(),s);u.scale.setScalar(2),n.add(u),n.userData.trailCount=4}const o=n.userData.trailCount||4,c=[];for(let d=0;d<o;d++){const u=.35*(1-d/o),l=new b(fi.clone(),Ew(e,u));l.scale.setScalar(.6*(1-d/o*.5)),l.visible=!1,n.add(l),c.push(l)}n.userData.trails=c}function Tw(n,t){const e=n*1e3;for(let i=0;i<t.length;i++){const s=t[i];if(s.mesh&&(s.mesh.position.set(s.x,s.y,s.z),s.homing&&s.mesh.userData)){if(s.target&&s.target.alive){const a=s.target.x-s.x,r=s.target.z-s.z;s.mesh.rotation.y=Math.atan2(a,r)}if(s.mesh.userData.ring&&(s.mesh.userData.ring.rotation.z=e*.005),s.mesh.userData.orbiters){const a=e*.006,r=s.mesh.userData.orbiters;r[0]&&(r[0].position.x=Math.cos(a)*4,r[0].position.z=Math.sin(a)*4),r[1]&&(r[1].position.x=Math.cos(a+Math.PI)*4,r[1].position.z=Math.sin(a+Math.PI)*4)}if(s.mesh.userData.trails&&s.trail){const a=s.mesh.userData.trails,r=-(s.mesh.rotation.y||0),o=Math.cos(r),c=Math.sin(r);for(let d=0;d<a.length;d++){const u=s.trail.length-1-d;if(u>=0){a[d].visible=!0;const l=s.trail[u][0]-s.x,h=s.trail[u][1]-s.y,f=s.trail[u][2]-s.z;a[d].position.set(l*o-f*c,h,l*c+f*o)}}}}}}function Sm(n,t){n.mesh&&(t.remove(n.mesh),Aw(n.mesh),n.mesh=null)}function Aw(n){n.traverse(t=>{t.isMesh&&(t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose())})}const Rw=200,Cw=30,Hf=new Tt(1,6,4),Gf=new q(1,1,1);let gi=[],es=[];function Pw(n){gi=[],es=[];for(let t=0;t<Rw;t++){const e=Vt(zt.CYAN),i=new b(Hf,e);i.visible=!1,n.add(i);const s=yt(zt.CYAN,.4),a=new b(Hf,s);a.scale.setScalar(2),i.add(a),gi.push({mesh:i,mat:e,glow:a,glowMat:s,inUse:!1})}for(let t=0;t<Cw;t++){const e=Vt(zt.CYAN),i=new b(Gf,e);i.visible=!1,n.add(i);const s=yt(zt.CYAN,.3),a=new b(Gf,s);a.scale.setScalar(1.6),i.add(a),es.push({mesh:i,mat:e,glow:a,glowMat:s,inUse:!1})}}function Dw(n,t){for(let s=0;s<gi.length;s++)gi[s].inUse=!1;for(let s=0;s<es.length;s++)es[s].inUse=!1;let e=0,i=0;for(let s=0;s<t.length;s++){const a=t[s],r=1-a.life/a.maxLife;if(a.type==="wallBreak"){if(i>=es.length)continue;const u=es[i++];u.inUse=!0;const l=a.size*(1-r*.5),h=(1-r)*(1-r);u.mesh.visible=!0,u.mesh.position.set(a.x,a.y,a.z),u.mesh.scale.set(Math.max(l*.7,.1),Math.max(l*.5,.1),Math.max(l,.1));const f=(a.rotSpeed||0)*r*3;u.mesh.rotation.set(f*.7,f,f*.4),u.mat.color.set(a.color),u.glowMat.color.set(a.color),u.glowMat.opacity=h*.3;continue}if(a.type==="wallRepair"){if(e>=gi.length)continue;const u=gi[e++];u.inUse=!0;const l=Math.min(1,r*6),h=1-r,f=l*h,_=a.size*(.5+.5*l)*h;u.mesh.visible=!0,u.mesh.position.set(a.x,a.y,a.z),u.mesh.scale.setScalar(Math.max(_,.1)),u.mat.color.set(a.color),u.glowMat.color.set(a.color),u.glowMat.opacity=f*.5;continue}if(e>=gi.length)continue;const o=gi[e++];o.inUse=!0;const c=a.size*(1-r*.6),d=1-r;o.mesh.visible=!0,o.mesh.position.set(a.x,a.y,a.z),o.mesh.scale.setScalar(Math.max(c,.1)),o.mat.color.set(a.color),o.glowMat.color.set(a.color),o.glowMat.opacity=d*.4}for(let s=0;s<gi.length;s++)gi[s].inUse||(gi[s].mesh.visible=!1);for(let s=0;s<es.length;s++)es[s].inUse||(es[s].mesh.visible=!1)}const Sr=[];let Iu=null,Ho=0;function Iw(n){Iu=n,Sr.length=0,Ho=0}function Lw(n,t,e,i){const a=new Ee,r=new ae(1,.8,8,32),o=Vt(e),c=new b(r,o);c.rotation.x=Math.PI/2,a.add(c);const d=new ae(1,2.5,8,32),u=yt(e,.4),l=new b(d,u);l.rotation.x=Math.PI/2,a.add(l);const h=new Mu(1,32),f=yt(16777215,.5),_=new b(h,f);_.rotation.x=-Math.PI/2,_.position.y=1,a.add(_),a.position.set(n,6,t),Iu.add(a),Sr.push({type:"airStrikeRing",group:a,ringMat:o,glowMat:u,discMat:f,targetRadius:i,life:1.2,maxLife:1.2})}function Uw(n){const t=Ho>0?Math.min(n-Ho,.05):0;Ho=n;for(let e=Sr.length-1;e>=0;e--){const i=Sr[e];if(i.life-=t,i.life<=0){Iu.remove(i.group),i.group.traverse(a=>{a.isMesh&&(a.geometry.dispose(),a.material.dispose())}),Sr.splice(e,1);continue}const s=1-i.life/i.maxLife;if(i.type==="beam"){const a=1-s;i.outerMat.opacity=.15*a,i.innerMat.color.lerp(new Ht(16777215),s*.3)}if(i.type==="ring"){const a=1+s*(i.targetRadius-1);i.group.scale.set(a,1,a);const r=(1-s)*(1-s);i.glowMat.opacity=.3*r}if(i.type==="airStrikeRing"){const r=1+(1-(1-s)*(1-s))*(i.targetRadius-1);i.group.scale.set(r,1,r);const o=(1-s)*(1-s);if(i.glowMat.opacity=.4*o,i.discMat){i.discMat.opacity=.5*o*o;const c=i.group.children[2];c&&c.scale.set(r*.8,r*.8,1)}}}}const Ul=[xe,Ce,ve,we,tn,ne],Lu={[xe]:{times:U0,branchTime:N0,hpPerLevel:F0,hpBranch:O0},[Ce]:{times:z0,branchTime:H0,hpPerLevel:G0,hpBranch:k0},[ve]:{times:V0,branchTime:W0,hpPerLevel:X0,hpBranch:q0},[we]:{times:Y0,branchTime:$0,hpPerLevel:Z0,hpBranch:j0},[tn]:{times:K0,branchTime:J0,hpPerLevel:Q0,hpBranch:t_},[ne]:{times:e_,branchTime:0,hpPerLevel:n_,hpBranch:i_}};let na=[],zr=!0,Nd=[],Go=0;function ul(n,t,e,i){const s=ie[n];if(!s)return null;const{x:a,z:r}=fn(t,e,Z),o=(s.size-1)*Z/2,c=Ul.includes(n),d={id:qr(),type:n,col:t,row:e,team:i,hp:s.hp,maxHp:s.hp,x:a+o,z:r+o,buildProgress:0,buildTime:s.buildTime,producing:!1,produceTimer:0,alive:!0,fireCooldown:0,idOffset:Math.random()*Math.PI*2,level:0,branch:null,constructionState:c?"building":null,constructionTimer:0,constructionDuration:s.buildTime,fireTimer:0,target:null,angle:0,lastFireTime:0,totalDamage:0,kills:0,investedCost:s.cost,orientation:n===ne?ra:null,airStrikeCooldownUntil:0,supportCooldownUntil:0,_activeSupportUnitId:null},u=n===ne?Gn:Kd;for(let l=e;l<e+s.size;l++)for(let h=t;h<t+s.size;h++)lm(h,l,u);return na.push(d),zr=!0,d}function Em(n){if(n.type!==xe)return null;const t=ie[xe];return n.branch?t.branches[n.branch]:t.levels[n.level]}function wm(n){if(n.type!==Ce&&n.type!==ve&&n.type!==tn)return null;const t=ie[n.type];return t.levels?n.branch?t.branches[n.branch]:t.levels[n.level]:null}function bm(n){if(n.type!==we)return null;const t=ie[we];return t.levels?n.branch?t.branches[n.branch]:t.levels[n.level]:null}function Tm(n){if(n.type===ne)return ie[ne].levels[n.level].hp;const t=Lu[n.type];if(!t)return ie[n.type].hp;const e=ie[n.type].hp;return n.branch?Math.round(e*(1+t.hpPerLevel*2+t.hpBranch)):Math.round(e*(1+t.hpPerLevel*n.level))}function Jr(n){if(!Ul.includes(n.type))return!1;const t=ie[n.type];return t.levels?n.level<t.levels.length-1&&n.branch===null&&!n.constructionState&&!n._repairing:!1}function Nw(n){return n.type===xe&&Jr(n)}function Qr(n){if(!Ul.includes(n.type)||n.type===ne)return!1;const t=ie[n.type];return!t.levels||!t.branches?!1:n.level>=t.levels.length-1&&n.branch===null&&!n.constructionState&&!n._repairing}function Fw(n){return n.type===xe&&Qr(n)}function Uu(n){return Jr(n)?ie[n.type].levels[n.level+1].upgradeCost:1/0}function Er(n,t){if(!Qr(n))return 1/0;const e=ie[n.type].branches;return!e||!e[t]?1/0:e[t].cost}function Nu(n){const t=Lu[n.type];t&&(n.constructionState="upgrading",n.constructionTimer=0,n.constructionDuration=t.times[n.level+1])}function Ow(n){Nu(n)}function Fu(n,t){const e=Lu[n.type];e&&(n.constructionState="branching",n.constructionTimer=0,n.constructionDuration=e.branchTime,n._pendingBranchKey=t)}function Bw(n,t){Fu(n,t)}function zw(n){return Hr(n)}function Hw(n){return Gr(n)}function Gw(n){hl(n)}function Hr(n){return!(!n||!n.alive||n.type===bn||n.hp>=n.maxHp||n.constructionState||n._repairing)}function Gr(n){if(!n)return 0;const t=n.maxHp-n.hp;return t<=0?0:Math.max(D_,Math.ceil(C_*t))}function hl(n){n._repairing=!0,n._repairTimer=0,n._repairDuration=P_,n._repairStartHp=n.hp,n._repairTargetHp=n.maxHp}function Am(n,t){n.type!==ne||!n.alive||(n.orientation=t,n._orientationChanged=!0)}function kw(n){if(!n.alive||n.team!==nt)return 0;const t=Math.floor(n.investedCost*hp);return zu(n),t}function fl(n,t){return!(!n||!n.alive||n.type!==tn||!n.branch||n.constructionState||t<n.airStrikeCooldownUntil)}function Rm(n,t){n.airStrikeCooldownUntil=t+I_}function Ou(n,t){return!(!n||!n.alive||n.type!==Ce||!n.branch||n.constructionState||n._activeSupportUnitId!=null||t<n.supportCooldownUntil)}function Cm(n,t,e){n._activeSupportUnitId=e,n.supportCooldownUntil=t+q_}function Bu(n,t){return!(!n||!n.alive||n.type!==ve||!n.branch||n.constructionState||n._activeSupportUnitId!=null||t<n.supportCooldownUntil)}function Pm(n,t,e){n._activeSupportUnitId=e,n.supportCooldownUntil=t+Y_}function Dm(n){n&&(n._activeSupportUnitId=null)}function Vw(n){n.level++;const t=n.maxHp;n.maxHp=Tm(n),n.hp+=n.maxHp-t,n.investedCost+=ie[n.type].levels[n.level].upgradeCost}function Ww(n){n.branch=n._pendingBranchKey,n._pendingBranchKey=null;const t=n.maxHp;n.maxHp=Tm(n),n.hp+=n.maxHp-t,n.investedCost+=ie[n.type].branches[n.branch].cost}function Xw(n,t,e){const i=[];for(let s=0;s<na.length;s++){const a=na[s];if(!a.alive)continue;const r=ie[a.type],o=Ul.includes(a.type);if(o&&a.constructionState){if(a.constructionTimer+=n,a.constructionState==="building"&&(a.buildProgress=a.constructionTimer),a.constructionTimer>=a.constructionDuration){const c=a.constructionState;c==="upgrading"?Vw(a):c==="branching"?Ww(a):c==="repairing"&&(a.hp=a.maxHp,a._justRepaired=!0),a.constructionState=null,c==="building"&&(a.buildProgress=a.buildTime),(c==="upgrading"||c==="branching"||c==="repairing")&&i.push(a)}continue}if(!o&&a.buildProgress<a.buildTime){a.buildProgress+=n,a.buildProgress>a.buildTime&&(a.buildProgress=a.buildTime);continue}if(a._repairing){a._repairTimer+=n;const c=Math.min(a._repairTimer/a._repairDuration,1);a.hp=a._repairStartHp+(a._repairTargetHp-a._repairStartHp)*c,c>=1&&(a.hp=a._repairTargetHp,a._repairing=!1,a._justRepaired=!0,i.push(a))}if(r.produceUnit&&r.produceTime){const c=wm(a),d=c?c.produceTime:r.produceTime,u=c&&c.produceUnit?c.produceUnit:r.produceUnit;if(a.produceTimer+=n,a.produceTimer>=d){a.produceTimer-=d;const l=a.team===nt?-40:40;if(e&&e.createUnit){const h=c?{hpMult:c.hpMult||1,damageMult:c.damageMult||1,speedMult:c.speedMult||1,rangeMult:c.rangeMult||1,level:a.level,branch:a.branch}:null;e.createUnit(u,a.x,a.z+l,a.team,h,a.id)}}}}return i}function Cn(){return zr&&(Nd=na.filter(n=>n.alive),zr=!1,Go=0),Go++,Go%60===0&&(na=na.filter(n=>n.alive)),Nd}function zu(n){n.alive=!1,zr=!0;const t=ie[n.type];if(t)for(let e=n.row;e<n.row+t.size;e++)for(let i=n.col;i<n.col+t.size;i++)lm(i,e,je);n.type===ne&&(n._wallDestroyed=!0)}function qw(){na=[],zr=!0,Nd=[],Go=0}let Ne=[],kr=!0,Fd=[],ko=0,Qi=0;const Ec=new iu(r_);function pl(n,t,e,i,s=null){const a=$o[n];if(!a)return null;const r=s&&s.hpMult||1,o=s&&s.damageMult||1,c=s&&s.speedMult||1,d=s&&s.rangeMult||1,u=Math.round(a.hp*r),l=Math.round(a.damage*o),h=a.speed*c,f=Math.round(a.range*d),_={id:qr(),type:n,team:i,x:t,z:e,hp:u,maxHp:u,speed:h,damage:l,range:f,fireRate:a.fireRate,size:a.size,fireCooldown:0,path:null,pathIndex:0,targetId:null,alive:!0,inCombat:!1,rallyHold:!1,rallyX:0,rallyZ:0,_rallyAssigned:!1,_stuckTime:0,_lastProgressX:t,_lastProgressZ:e,idOffset:Math.random()*Math.PI*2,upgradeLevel:s&&s.level||0,upgradeBranch:s&&s.branch||null,stance:dn,targetPriority:"any",squadId:null,_defendTargetId:null,squadRallyX:null,squadRallyZ:null,_wallTarget:null,selected:!1,squadHighlight:!1,isSupport:!!a.isSupport,healRate:a.healRate||0,healRange:a.healRange||0,healTargets:a.healTargets||null,_healTargetId:null,_parentBuildingId:null,_healing:!1};return n===gn&&(_.isAir=!0,_.orbitX=t,_.orbitZ=e,_.orbitAngle=Math.random()*Math.PI*2,_.flyHeight=Sl,_.orbitRadius=Jm),Ne.push(_),kr=!0,_}function Yw(n,t){const e=t&&t.getUnits?t.getUnits():[],i=t&&t.getBuildings?t.getBuildings():[],s=t&&t.combatUnitHash,a=t&&t.combatBuildingHash,r=fn(As,rs,Z),o=fn(oi,Ln,Z);let c=!1,d=!1;for(let u=0;u<e.length;u++){const l=e[u];if(l.alive&&(l.team===kt?!c&&Qt(l.x,l.z,r.x,r.z)<=Ic&&(c=!0):!d&&Qt(l.x,l.z,o.x,o.z)<=Ic&&(d=!0),c&&d))break}for(let u=0;u<Ne.length;u++){const l=Ne[u];if(!l.alive||l.inCombat||l.isAir)continue;Qt(l.x,l.z,l._lastProgressX,l._lastProgressZ)>=r0?(l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z):l.path&&l.pathIndex<l.path.length&&(l._stuckTime+=n)}for(let u=0;u<Ne.length;u++){const l=Ne[u];!l.alive||l.isAir||(l._prevX=l.x,l._prevZ=l.z)}for(let u=0;u<Ne.length;u++){const l=Ne[u];if(!l.alive)continue;if(l.isAir){l.fireCooldown>0&&(l.fireCooldown-=n,l.fireCooldown<0&&(l.fireCooldown=0)),Zw(l,n);continue}if(l.isSupport){$w(l,n,e,t);continue}if(l.fireCooldown>0&&(l.fireCooldown-=n,l.fireCooldown<0&&(l.fireCooldown=0)),l._stuckTime>=a0&&l.id%4===Qi%4){const p=on(l.x,l.z,Z),m=3+Math.floor(Math.random()*3),v=Math.random()*Math.PI*2,M=Math.max(0,Math.min(qt-1,p.col+Math.round(Math.cos(v)*m))),y=Math.max(0,Math.min(Qe-1,p.row+Math.round(Math.sin(v)*m))),T=ze(M,y);if((T===je||T===kn)&&t&&t.findPath){const w=t.findPath(p.col,p.row,M,y);w&&w.length>0&&(l.path=w,l.pathIndex=0)}l._stuckTime=0,l._lastProgressX=l.x,l._lastProgressZ=l.z}{const p=l.team===nt?kt:nt;let m=!1;if(s){const v=s.queryNear(l.x,l.z);for(let M=0;M<v.length;M++){const y=v[M];if(!(!y.alive||y.team!==p)&&Qt(l.x,l.z,y.x,y.z)<=l.range){m=!0;break}}}if(!m&&a){const v=a.queryNear(l.x,l.z);for(let M=0;M<v.length;M++){const y=v[M];if(!(!y.alive||y.team!==p)&&Qt(l.x,l.z,y.x,y.z)<=l.range){m=!0;break}}}if(l.inCombat=m,m&&l.stance!==sa)continue}const h=l.team===nt?c:d,f=l.team===nt?r:o;if(h&&l.stance===dn&&Qt(l.x,l.z,f.x,f.z)<=c0){l.rallyHold&&(l.rallyHold=!1);const m=l.team===nt?As:oi,v=l.team===nt?rs:Ln,M=m+(l.id%5-2),y=v+(l.id%3-1),T=Math.max(0,Math.min(qt-1,M)),w=Math.max(0,Math.min(Qe-1,y));if(!l.path||l.pathIndex>=l.path.length||!l._defending){const A=on(l.x,l.z,Z);if(t&&t.findPath){const x=t.findPath(A.col,A.row,T,w);x&&x.length>0&&(l.path=x,l.pathIndex=0)}}if(l._defending=!0,l.path&&l.pathIndex<l.path.length){const A=l.path[l.pathIndex],x=fn(A.col,A.row,Z),S=x.x-l.x,I=x.z-l.z,C=Math.sqrt(S*S+I*I);if(C<Z/2)l.pathIndex++;else{const U=l.speed*n,L=Math.min(U,C);l.x+=S/C*L,l.z+=I/C*L}}continue}if(l._defending&&!h&&(l._defending=!1,l.path=null,l.pathIndex=0),l.stance===Rr)continue;if(l.stance===ia){const p=l.team===nt?As:oi,m=l.team===nt?rs:Ln,v=l.team===nt?r:o,M=l.team===nt?kt:nt;let y=null,T=1/0;if(s){const w=s.queryNear(v.x,v.z);for(let A=0;A<w.length;A++){const x=w[A];if(!x.alive||x.team!==M||Qt(x.x,x.z,v.x,v.z)>mh)continue;const I=Qt(l.x,l.z,x.x,x.z);I<T&&(T=I,y=x)}}if(!y&&a){const w=a.queryNear(v.x,v.z);for(let A=0;A<w.length;A++){const x=w[A];if(!x.alive||x.team!==M||Qt(x.x,x.z,v.x,v.z)>mh)continue;const I=Qt(l.x,l.z,x.x,x.z);I<T&&(T=I,y=x)}}if(y){if((l._defendTargetId!==y.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const A=on(l.x,l.z,Z),x=on(y.x,y.z,Z);if(t&&t.findPath){const S=t.findPath(A.col,A.row,x.col,x.row);S&&S.length>0&&(l.path=S,l.pathIndex=0)}l._defendTargetId=y.id}}else{l._defendTargetId!==null&&(l.path=null,l.pathIndex=0,l._defendTargetId=null);const w=l.team===nt?m-ph:m+ph,A=fn(p,w,Z);if(Qt(l.x,l.z,A.x,A.z)<E_)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const S=on(l.x,l.z,Z);if(t&&t.findPath){const I=t.findPath(S.col,S.row,p,w);I&&I.length>0&&(l.path=I,l.pathIndex=0)}}}if(l.path&&l.pathIndex<l.path.length){const w=l.path[l.pathIndex],A=fn(w.col,w.row,Z),x=A.x-l.x,S=A.z-l.z,I=Math.sqrt(x*x+S*S);if(I<Z/2)l.pathIndex++;else{const C=l.speed*n,U=Math.min(C,I);l.x+=x/I*U,l.z+=S/I*U}}continue}if(l.stance===sa&&l.squadRallyX!=null){const p=l.squadRallyX,m=l.squadRallyZ,v=l.team===nt?kt:nt;let M=null,y=1/0;if(s){const T=s.queryNear(p,m);for(let w=0;w<T.length;w++){const A=T[w];if(!A.alive||A.team!==v||Qt(A.x,A.z,p,m)>_h)continue;const S=Qt(l.x,l.z,A.x,A.z);S<y&&(y=S,M=A)}}if(!M&&a){const T=a.queryNear(p,m);for(let w=0;w<T.length;w++){const A=T[w];if(!A.alive||A.team!==v||Qt(A.x,A.z,p,m)>_h)continue;const S=Qt(l.x,l.z,A.x,A.z);S<y&&(y=S,M=A)}}if(M){if((l._defendTargetId!==M.id||!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const w=on(l.x,l.z,Z),A=on(M.x,M.z,Z);if(t&&t.findPath){const x=t.findPath(w.col,w.row,A.col,A.row);x&&x.length>0&&(l.path=x,l.pathIndex=0)}l._defendTargetId=M.id}}else{if(Qt(l.x,l.z,p,m)<w_){l._defendTargetId=null;continue}if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const w=on(l.x,l.z,Z),A=on(p,m,Z);if(t&&t.findPath){const x=t.findPath(w.col,w.row,A.col,A.row);x&&x.length>0&&(l.path=x,l.pathIndex=0)}l._defendTargetId=null}}if(l.path&&l.pathIndex<l.path.length){const T=l.path[l.pathIndex],w=fn(T.col,T.row,Z),A=w.x-l.x,x=w.z-l.z,S=Math.sqrt(A*A+x*x);if(S<Z/2)l.pathIndex++;else{const I=l.speed*n,C=Math.min(I,S);l.x+=A/S*C,l.z+=x/S*C}}continue}if(l.rallyHold){if(Qt(l.x,l.z,l.rallyX,l.rallyZ)<50)continue;if((!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const m=on(l.x,l.z,Z),v=on(l.rallyX,l.rallyZ,Z);if(t&&t.findPath){const M=t.findPath(m.col,m.row,v.col,v.row);M&&M.length>0&&(l.path=M,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const m=l.path[l.pathIndex],v=fn(m.col,m.row,Z),M=v.x-l.x,y=v.z-l.z,T=Math.sqrt(M*M+y*y);if(T<Z/2)l.pathIndex++;else{const w=l.speed*n,A=Math.min(w,T);l.x+=M/T*A,l.z+=y/T*A}}continue}const _=l.team===nt?oi:As,g=l.team===nt?Ln:rs;if(l._wallTarget&&(!l._wallTarget.alive||l._wallTarget._wallDestroyed)&&(l._wallTarget=null,l.path=null,l.pathIndex=0),(!l.path||l.pathIndex>=l.path.length)&&l.id%4===Qi%4){const p=on(l.x,l.z,Z);if(t&&t.findPathThroughWalls){const m=t.findPathThroughWalls(p.col,p.row,_,g);if(m&&m.length>0){if(l._wallTarget=jw(m,i,l.team),l._wallTarget){const v=on(l._wallTarget.x,l._wallTarget.z,Z),M=t.findPath?t.findPath(p.col,p.row,v.col,v.row):null;l.path=M&&M.length>0?M:m}else l.path=m;l.pathIndex=0}}else if(t&&t.findPath){const m=t.findPath(p.col,p.row,_,g);m&&m.length>0&&(l.path=m,l.pathIndex=0)}}if(l.path&&l.pathIndex<l.path.length){const p=l.path[l.pathIndex],m=fn(p.col,p.row,Z),v=m.x-l.x,M=m.z-l.z,y=Math.sqrt(v*v+M*M);if(y<Z/2)l.pathIndex++;else{const T=l.speed*n,w=Math.min(T,y);l.x+=v/y*w,l.z+=M/y*w}}}Ec.clear();for(let u=0;u<Ne.length;u++)Ne[u].alive&&!Ne[u].isAir&&Ec.insert(Ne[u]);for(let u=0;u<Ne.length;u++){const l=Ne[u];if(!l.alive||l.isAir)continue;const h=l.size*nh,f=Ec.queryNear(l.x,l.z);for(let _=0;_<f.length;_++){const g=f[_];if(g.id<=l.id)continue;const p=g.size*nh,m=h+p,v=g.x-l.x,M=g.z-l.z,y=Math.sqrt(v*v+M*M);if(y<m&&y>.01){const T=m-y,w=Math.min(T,s0*n),A=v/y,x=M/y,S=w*.5;l.x-=A*S,l.z-=x*S,g.x+=A*S,g.z+=x*S}else if(y<=.01){const T=Math.random()*Math.PI*2,w=2;l.x+=Math.cos(T)*w,l.z+=Math.sin(T)*w}}}for(let u=0;u<Ne.length;u++){const l=Ne[u];if(!l.alive||l.isAir)continue;l.x=Math.max(1,Math.min(l.x,qt*Z-1)),l.z=Math.max(1,Math.min(l.z,Qe*Z-1));const h=Math.floor(l.x/Z),f=Math.floor(l.z/Z),_=ze(h,f);if(_!==je&&_!==kn){const g=Math.floor(l._prevX/Z),p=Math.floor(l._prevZ/Z),m=ze(g,p);(m===je||m===kn)&&(l.x=l._prevX,l.z=l._prevZ)}}Qi++}function Oe(){return kr&&(Fd=Ne.filter(n=>n.alive),kr=!1,ko=0),ko++,ko%60===0&&(Ne=Ne.filter(n=>n.alive)),Fd}function Im(n){n.alive=!1,kr=!0}function $w(n,t,e,i){n._healing=!1;let s=null,a=0;const r=n.id%4===Qi%4;if(n._healTargetId!=null){let o=!1;for(let c=0;c<e.length;c++){const d=e[c];if(d.id===n._healTargetId&&d.alive&&d.hp<d.maxHp){o=!0,s=d,a=d.maxHp-d.hp;break}}o||(n._healTargetId=null)}if(r){for(let o=0;o<e.length;o++){const c=e[o];if(!c.alive||c.team!==n.team||c.isSupport||c.hp>=c.maxHp||!n.healTargets||!n.healTargets.includes(c.type))continue;const d=c.maxHp-c.hp;d>a&&(a=d,s=c)}s&&(n._healTargetId=s.id)}if(s){if(Qt(n.x,n.z,s.x,s.z)<=n.healRange){n._healing=!0,n._healTargetX=s.x,n._healTargetZ=s.z;const c=n.healRate*t;s.hp=Math.min(s.maxHp,s.hp+c)}else if(r&&i&&i.findPath){const c=on(n.x,n.z,Z),d=on(s.x,s.z,Z),u=i.findPath(c.col,c.row,d.col,d.row);u&&u.length>0&&(n.path=u,n.pathIndex=0)}}else if(n._healTargetId=null,r&&i&&i.findPath){let o=null,c=1/0;for(let d=0;d<e.length;d++){const u=e[d];if(!u.alive||u.team!==n.team||u.isSupport||u.isAir||!n.healTargets||!n.healTargets.includes(u.type))continue;const l=Qt(n.x,n.z,u.x,u.z);l<c&&(c=l,o=u)}if(o&&c>60){const d=on(n.x,n.z,Z),u=on(o.x,o.z,Z),l=i.findPath(d.col,d.row,u.col,u.row);l&&l.length>0&&(n.path=l,n.pathIndex=0)}}if(n.path&&n.pathIndex<n.path.length&&!n._healing){const o=n.path[n.pathIndex],c=fn(o.col,o.row,Z),d=c.x-n.x,u=c.z-n.z,l=Math.sqrt(d*d+u*u);if(l<Z/2)n.pathIndex++;else{const h=n.speed*t,f=Math.min(h,l);n.x+=d/l*f,n.z+=u/l*f}}}function Zw(n,t){if(n.targetOrbitX!==void 0){const a=n.targetOrbitX-n.orbitX,r=n.targetOrbitZ-n.orbitZ,o=Math.sqrt(a*a+r*r);if(o>1){const c=f_*t;c>=o?(n.orbitX=n.targetOrbitX,n.orbitZ=n.targetOrbitZ):(n.orbitX+=a/o*c,n.orbitZ+=r/o*c)}}const e=n.orbitX-n.x,i=n.orbitZ-n.z,s=Math.sqrt(e*e+i*i);if(s>n.orbitRadius+20){const a=t0*t,r=Math.min(a,s);n.x+=e/s*r,n.z+=i/s*r,n._orbiting=!1}else n._orbiting||(n._orbiting=!0,n._curOrbitR=Math.max(s,5),n.orbitAngle=Math.atan2(n.z-n.orbitZ,n.x-n.orbitX)),n._curOrbitR+=(n.orbitRadius-n._curOrbitR)*Math.min(1,2*t),n.orbitAngle+=Qm*t,n.x=n.orbitX+Math.cos(n.orbitAngle)*n._curOrbitR,n.z=n.orbitZ+Math.sin(n.orbitAngle)*n._curOrbitR}function Od(n,t,e){for(let i=0;i<Ne.length;i++)if(Ne[i].id===n&&Ne[i].alive&&Ne[i].isAir)return Ne[i].targetOrbitX=t,Ne[i].targetOrbitZ=e,!0;return!1}function Bd(){return Ne.filter(n=>n.alive&&n.isAir)}function jw(n,t,e){const i=e===nt?kt:nt;for(let s=0;s<n.length;s++){const a=n[s];for(let r=0;r<t.length;r++){const o=t[r];if(!(!o.alive||o.type!==ne||o.team!==i)&&o.col===a.col&&o.row===a.row)return o}}return null}function Kw(){Ne=[],kr=!0,Fd=[],ko=0}let Ds=[],sr=!0,zd=[],Vo=0;function Jw(n,t,e,i,s,a,r){const o=e-n,c=i-t,d=Math.sqrt(o*o+c*c);if(d===0)return null;const u=o/d*Ju,l=c/d*Ju,h={id:qr(),x:n,z:t,y:r??15,tx:e,tz:i,team:s,damage:a,vx:u,vz:l,life:e0,alive:!0,homing:!1};return Ds.push(h),sr=!0,h}function Qw(n,t,e,i,s,a,r,o,c,d,u){const l={id:qr(),x:n,z:t,y:e||20,team:s,damage:a,alive:!0,homing:!0,target:i,speed:B0,trail:[],sourceBuilding:r,splashRadius:o||0,splashDamage:c||0,life:3,turretLevel:d||0,turretBranch:u||null};return Ds.push(l),sr=!0,l}function tb(n){const t=[];for(let e=0;e<Ds.length;e++){const i=Ds[e];if(!i.alive){t.push(i);continue}if(i.homing){eb(i,n),i.alive||t.push(i);continue}i.x+=i.vx*n,i.z+=i.vz*n,i.life-=n;const s=i.tx-i.x,a=i.tz-i.z;if(s*s+a*a<100){i.alive=!1,t.push(i);continue}i.life<=0&&(i.alive=!1,t.push(i))}return t.length>0&&(sr=!0),t}function eb(n,t){if(!n.target||!n.target.alive){n.splashRadius>0&&kf(n),n.alive=!1;return}n.trail.push([n.x,n.y,n.z]),n.trail.length>6&&n.trail.shift();const e=n.target.x-n.x,i=n.target.z-n.z,s=Math.sqrt(e*e+i*i);if(s<n.speed*t+5){n.target.hp-=n.damage,n.target.hitFlashTimer=Oa,n.sourceBuilding&&(n.sourceBuilding.totalDamage+=n.damage,n.target.hp<=0&&(n.sourceBuilding.kills+=1)),n.splashRadius>0&&kf(n),n.hitTarget=!0,n.alive=!1;return}n.x+=e/s*n.speed*t,n.z+=i/s*n.speed*t,n.life-=t,n.life<=0&&(n.alive=!1)}function kf(n){n.splashHit=!0,n.splashX=n.target?n.target.x:n.x,n.splashZ=n.target?n.target.z:n.z}function Hd(){return sr&&(zd=Ds.filter(n=>n.alive),sr=!1,Vo=0),Vo++,Vo%60===0&&(Ds=Ds.filter(n=>n.alive)),zd}function nb(){Ds=[],sr=!0,zd=[],Vo=0}const Es=new iu(cp),Fa=new iu(cp);function Vf(n,t,e){const i=(1-e/n.range)*l0,a=(1-t.hp/t.maxHp)*o0,r=n.stance===sa?"rally":n.targetPriority||aa,o=gh[r]||gh.any,c=t.type||"core",d=o[c]||0,u=n._wallTarget&&n._wallTarget===t?b_:0,l=n.stance===sa&&e<=n.range*A_?T_:0;return i+a+d+u+l}function ib(n,t){const e=t.getUnits(),i=t.getBuildings();Es.clear(),Fa.clear();for(let r=0;r<e.length;r++)e[r].alive&&Es.insert(e[r]);for(let r=0;r<i.length;r++)i[r].alive&&Fa.insert(i[r]);const s={[Rs]:12,[Ia]:10,[js]:25,[gn]:29};for(let r=0;r<e.length;r++){const o=e[r];if(!o.alive||o.isSupport)continue;if(o.fireCooldown>0&&!o.inCombat){o.targetX=void 0,o.targetZ=void 0;continue}const c=o.team===nt?kt:nt;let d=null,u=-1/0;const l=Es.queryNear(o.x,o.z);for(let f=0;f<l.length;f++){const _=l[f];if(!_.alive||_.team!==c)continue;const g=Qt(o.x,o.z,_.x,_.z);if(g>o.range)continue;const p=Vf(o,_,g);p>u&&(u=p,d=_)}const h=Fa.queryNear(o.x,o.z);for(let f=0;f<h.length;f++){const _=h[f];if(!_.alive||_.team!==c)continue;const g=Qt(o.x,o.z,_.x,_.z);if(g>o.range)continue;const p=Vf(o,_,g);p>u&&(u=p,d=_)}if(d?(o.targetX=d.x,o.targetZ=d.z):(o.targetX=void 0,o.targetZ=void 0),d&&o.fireCooldown<=0){o.fireCooldown=1/o.fireRate;const f=d.x-o.x,_=d.z-o.z,g=Math.sqrt(f*f+_*_)||1,p=s[o.type]||10,m=o.x+f/g*p,v=o.z+_/g*p,y=$o[o.type]&&$o[o.type].isAir?Sl-5:void 0;t.createProjectile(m,v,d.x,d.z,o.team,o.damage,y)}}for(let r=0;r<i.length;r++){const o=i[r];if(!o.alive)continue;if(o.type===xe){rb(o,n,t);continue}const c=ie[o.type];if(!c||!c.range||!c.damage||o.buildProgress<o.buildTime)continue;if(o.fireCooldown>0){o.fireCooldown-=n;continue}const d=o.team===nt?kt:nt;let u=null,l=c.range;const h=Es.queryNear(o.x,o.z);for(let f=0;f<h.length;f++){const _=h[f];if(!_.alive||_.team!==d)continue;const g=Qt(o.x,o.z,_.x,_.z);g<=l&&(l=g,u=_)}u&&(o.fireCooldown=1/c.fireRate,t.createProjectile(o.x,o.z,u.x,u.z,o.team,c.damage))}const a=t.getProjectiles?t.getProjectiles():[];for(let r=0;r<a.length;r++){const o=a[r];if(!o.alive||o.homing)continue;const c=o.team===nt?kt:nt;let d=!1;const u=Es.queryNear(o.x,o.z);for(let h=0;h<u.length;h++){const f=u[h];if(!f.alive||f.team!==c)continue;if(Qt(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hitFlashTimer=Oa,f.hp<=0&&t.removeUnit(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1,d=!0;break}}if(d)continue;const l=Fa.queryNear(o.x,o.z);for(let h=0;h<l.length;h++){const f=l[h];if(!f.alive||f.team!==c)continue;if(Qt(o.x,o.z,f.x,f.z)<15){f.hp-=o.damage,f.hitFlashTimer=Oa,f.hp<=0&&t.removeBuilding(f),t.removeProjectile?t.removeProjectile(o):o.alive=!1;break}}}for(let r=0;r<a.length;r++){const o=a[r];if(!(o.alive||!o.homing)&&(o.hitTarget&&o.target&&o.target.hp<=0&&o.target.alive&&t.removeUnit(o.target),o.splashHit&&o.splashRadius>0)){const c=o.team===nt?kt:nt,d=Es.queryNear(o.splashX,o.splashZ);for(let u=0;u<d.length;u++){const l=d[u];if(l===o.target||!l.alive||l.team!==c)continue;Qt(o.splashX,o.splashZ,l.x,l.z)<=o.splashRadius&&(l.hp-=o.splashDamage,l.hitFlashTimer=Oa,o.sourceBuilding&&(o.sourceBuilding.totalDamage+=o.splashDamage),l.hp<=0&&t.removeUnit(l))}o.splashHit=!1}}}function sb(){return Es}function ab(){return Fa}function rb(n,t,e){if(n.constructionState||n.buildProgress<n.buildTime)return;const i=Em(n);if(!i)return;n.fireTimer-=t;const s=n.team===nt?kt:nt,a=i.range;let r=null,o=a;const c=Es.queryNear(n.x,n.z);for(let u=0;u<c.length;u++){const l=c[u];if(!l.alive||l.team!==s)continue;const h=Qt(n.x,n.z,l.x,l.z);h<=o&&(o=h,r=l)}const d=Fa.queryNear(n.x,n.z);for(let u=0;u<d.length;u++){const l=d[u];if(!l.alive||l.team!==s||l===n)continue;const h=Qt(n.x,n.z,l.x,l.z);h<=o&&(o=h,r=l)}if(!r){n.target=null,n.targetX=void 0,n.targetZ=void 0;return}if(n.target=r,n.targetX=r.x,n.targetZ=r.z,n.fireTimer<=0&&(n.fireTimer=i.fireRate,n.lastFireTime=performance.now(),e.createHomingProjectile)){const u=e.getFirePoint?e.getFirePoint(n):{x:n.x,y:20,z:n.z};e.createHomingProjectile(u.x,u.z,u.y,r,n.team,i.damage,n,i.splashRadius||0,i.splashDamage||0,n.level,n.branch)}}let Ns={0:0,1:0},Qs={0:0,1:0},ml="normal",Nl={[nt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}};function ob(n){ml=n;const t=qa[ml]||qa.normal;Ns[nt]=t.playerStartEnergy||Qu,Ns[kt]=t.aiStartEnergy||Qu,Qs[nt]=0,Qs[kt]=0,Nl={[nt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}}}function lb(n,t){const e=t?t.getBuildings():[],i=_E(e),s=qa[ml]||qa.normal;for(const a of[nt,kt]){let r=0,o=1;for(let l=0;l<e.length;l++){const h=e[l];if(h.alive&&h.team===a&&h.type===we){const f=bm(h);f?(r+=f.incomeBonus,f.territoryMult>o&&(o=f.territoryMult)):r+=ie[we].incomeBonus}}a===kt&&(r*=s.aiIncomeMult);const c=a===nt?i.player:i.enemy,d=o_*c*o,u=r+d;if(Nl[a]={generators:r,territory:d,net:u},Qs[a]+=u*n,Qs[a]>=1){const l=Math.floor(Qs[a]);Ns[a]+=l,Qs[a]-=l}}}function wr(n){return Ns[n]}function ss(n,t){return Ns[n]<t?!1:(Ns[n]-=t,!0)}function cb(n,t){Ns[n]+=t}function Wf(n){return Nl[n]}function db(){Ns={0:0,1:0},Qs={0:0,1:0},ml="normal",Nl={[nt]:{generators:0,territory:0,net:0},[kt]:{generators:0,territory:0,net:0}}}function Hu(){return{lastUpdate:0,playerBarracks:0,playerTurrets:0,playerFactories:0,playerGenerators:0,playerWalls:0,playerTotalUnits:0,playerHelicopters:0,playerArmyPower:0,aiArmyPower:0}}let rt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",tempo:null,intel:Hu(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1,_repairAttempts:{}},En={rallyStartTime:0,pushActive:!1},ca=0,ar=null;function ub(n){const t=n,e=qa[t]||qa.normal,i=hh[t]||hh.normal,s=Object.keys(dh),a=s[Math.floor(Math.random()*s.length)];rt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:dh[a],profileKey:a,difficulty:t,diffSettings:e,tempo:i,intel:Hu(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1,_repairAttempts:{}},En={rallyStartTime:0,pushActive:!1}}function hb(n,t,e){if(ca=t,yb(t,e),bb(e),Eb(t,e),wb(t,e),t-rt.lastTick<n0)return;rt.lastTick=t;const i=e.getBuildings(),s=e.getUnits();xb(t,i,s);const a=i.filter(u=>u.team===kt&&u.alive),r=Mb(a,s);if(Tb(t,r,e),!(a.filter(u=>u.type===Ce).length===0&&t>=In.build.barracks&&Wo(Ce,a,e,t)||a.filter(u=>u.type===ve).length===0&&t>=In.build.factory*.6&&Wo(ve,a,e,t)||a.filter(u=>u.type===we).length===0&&t>=10&&Wo(we,a,e,t))){Ib(t,a,e);for(let u=0;u<l_;u++){const l=e.getEnergy(),h=e.getBuildings().filter(g=>g.team===kt&&g.alive),f=fb(t,l,h,e);if(!f||!mb(f,h,e,t))break}}}function fb(n,t,e,i){const s=rt.tempo;for(const h in rt._repairAttempts)n-rt._repairAttempts[h].firstTime>g_&&delete rt._repairAttempts[h];const a=e.filter(h=>{if(h.type===bn||!h.alive||h._repairing||h.constructionState||h.hp/h.maxHp>=m_)return!1;const f=rt._repairAttempts[h.id];return!(f&&f.count>=__)}),r=h=>{const f=h.hp/h.maxHp;let _=1;h.type===xe?_=3:h.type===we?_=2.5:h.type===ve?_=2:h.type===Ce?_=1.5:h.type===tn&&(_=2);const g=1+(h.level||0)*.3+(h.branch?.5:0);return(1-f)*_*g};a.sort((h,f)=>r(f)-r(h));const o=jn*x_;for(const h of a)if(i.canRepairBuilding&&i.canRepairBuilding(h)){const f=i.getRepairCostForBuilding(h);if(t>=f+o)return{type:"repairBuilding",meta:{target:h}}}if(n>=s.upgradeDelay&&n-rt.lastUpgradeTime>=s.upgradeInterval){const h=pb(n,t,e,i);if(h)return h}const c=Ab(n,t,e);if(c)return{type:"build",meta:{buildType:c}};if(n-rt.lastBuildTime>=s.buildInterval&&rt._urgentBuildQueue.length>0){const h=Cb(n,t,e);if(h)return h}if(n-rt.lastBuildTime<s.buildInterval)return null;const d=uh[rt.profileKey]||uh.balanced,u={barracks:Dn.barracks,turret:Dn.turrets,factory:Dn.factories,generator:Dn.generators,helipad:Dn.helipads,wall:Dn.walls},l={barracks:Ce,turret:xe,factory:ve,generator:we,helipad:tn,wall:ne};for(let h=0;h<d.length;h++){const f=(rt.buildOrderIndex+h)%d.length,_=d[f],g=l[_];if(!g)continue;const p=In.build[_]||0;if(n<p)continue;const m=e.filter(y=>y.type===g).length,v=u[_]||4;if(m>=v)continue;const M=ie[g].cost;if(!(t<M+jn))return rt.buildOrderIndex=(f+1)%d.length,{type:"build",meta:{buildType:g}}}return null}function pb(n,t,e,i){const s={[xe]:In.upgrade.turret,[Ce]:In.upgrade.barracks,[ve]:In.upgrade.factory,[we]:In.upgrade.generator,[tn]:In.upgrade.helipad,[ne]:In.upgrade.wall};if(n>=s[xe]){const a=e.filter(r=>r.type===xe&&r.alive).sort((r,o)=>(o.totalDamage||0)-(r.totalDamage||0));for(const r of a){if(i.canUpgradeTurret&&i.canUpgradeTurret(r)){const o=i.getUpgradeCost(r);if(t>=o+jn)return{type:"upgradeTurret",meta:{target:r}}}if(i.canBranchTurret&&i.canBranchTurret(r)){const o=_b(rt.intel,e),c=i.getBranchCost(r,o);if(t>=c+jn)return{type:"branchTurret",meta:{target:r,branch:o}}}}}for(const a of[Ce,ve,we,tn]){const r=s[a]||0;if(n<r)continue;const o=e.filter(c=>c.type===a&&c.alive).sort((c,d)=>c.level-d.level);for(const c of o){if(i.canUpgradeBuilding&&i.canUpgradeBuilding(c)){const d=i.getUpgradeCost(c);if(t>=d+jn)return{type:"upgradeProduction",meta:{target:c}}}if(i.canBranchBuilding&&i.canBranchBuilding(c)){const d=gb(a,rt.intel,e,n),u=i.getBranchCost(c,d);if(t>=u+jn)return{type:"branchProduction",meta:{target:c,branch:d}}}}}if(n>=s[ne]){const a=e.filter(r=>r.type===ne&&r.alive).sort((r,o)=>r.level-o.level);for(const r of a)if(i.canUpgradeBuilding&&i.canUpgradeBuilding(r)){const o=i.getUpgradeCost(r);if(t>=o+jn)return{type:"upgradeWall",meta:{target:r}}}}return null}function mb(n,t,e,i){switch(n.type){case"build":{const s=Wo(n.meta.buildType,t,e,i);return s&&(rt.lastBuildTime=i),s}case"upgradeTurret":if(e.canUpgradeTurret(n.meta.target)){const s=e.getUpgradeCost(n.meta.target);if(e.spendEnergy(s))return e.startTurretUpgrade(n.meta.target),rt.lastUpgradeTime=i,!0}return!1;case"branchTurret":if(e.canBranchTurret(n.meta.target)){const s=e.getBranchCost(n.meta.target,n.meta.branch);if(e.spendEnergy(s))return e.startTurretBranch(n.meta.target,n.meta.branch),rt.lastUpgradeTime=i,!0}return!1;case"repairWall":case"repairBuilding":{const s=n.meta.target;if(!(e.canRepairBuilding?e.canRepairBuilding(s):e.canRepairWall&&e.canRepairWall(s)))return!1;const r=e.getRepairCostForBuilding?e.getRepairCostForBuilding(s):e.getRepairCost?e.getRepairCost(s):0;return e.spendEnergy(r)?(e.startBuildingRepair?e.startBuildingRepair(s):e.startWallRepair&&e.startWallRepair(s),rt._repairAttempts[s.id]||(rt._repairAttempts[s.id]={count:0,firstTime:i}),rt._repairAttempts[s.id].count++,!0):!1}case"upgradeWall":case"upgradeProduction":if(e.canUpgradeBuilding&&e.canUpgradeBuilding(n.meta.target)){const s=e.getUpgradeCost(n.meta.target);if(e.spendEnergy(s))return e.startUpgrade(n.meta.target),rt.lastUpgradeTime=i,!0}return!1;case"branchProduction":if(e.canBranchBuilding(n.meta.target)){const s=e.getBranchCost(n.meta.target,n.meta.branch);if(e.spendEnergy(s))return e.startBranch(n.meta.target,n.meta.branch),rt.lastUpgradeTime=i,!0}return!1;default:return!1}}function _b(n,t){const e=t.filter(i=>i.type===xe&&i.branch);if(e.length>0){const i=e.some(a=>a.branch==="A"),s=e.some(a=>a.branch==="B");if(i&&!s)return"B";if(s&&!i)return"A"}return n.playerTotalUnits>4||n.playerBarracks>=2?"B":(n.playerTanks>=2,"A")}function gb(n,t,e,i){const s=e.filter(a=>a.type===n&&a.branch);if(s.length>0){const a=s.some(o=>o.branch==="A"),r=s.some(o=>o.branch==="B");if(a&&!r)return"B";if(r&&!a)return"A"}if(n===Ce){const a=e.some(r=>r.type===ve&&r.alive);return!a&&i>60?"A":a?"B":t.playerTanks>=2?"A":"B"}if(n===we){const a=e.filter(r=>r.type===we&&r.alive).length;return a<=1||t.playerGenerators>a?"A":"B"}return n===tn?t.playerTurrets>=3?"B":t.playerTurrets<2&&t.playerTotalUnits>6?"A":"B":t.playerTotalUnits>6||i>150?"B":(t.playerTurrets>=3,"A")}function xb(n,t,e){const i=rt.difficulty==="hard"?4:c_;if(n-rt.intel.lastUpdate<i)return;rt.intel.lastUpdate=n;const s=rt.intel;s.playerBarracks=0,s.playerTurrets=0,s.playerFactories=0,s.playerGenerators=0,s.playerWalls=0,s.playerTotalUnits=0,s.playerHelicopters=0,s.playerTanks=0;let a=0,r=0;for(let o=0;o<t.length;o++){const c=t[o];c.team!==nt||!c.alive||(c.type===Ce?s.playerBarracks++:c.type===xe?s.playerTurrets++:c.type===ve?s.playerFactories++:c.type===we?s.playerGenerators++:c.type===ne&&s.playerWalls++)}for(let o=0;o<e.length;o++){const c=e[o];if(c.alive){if(c.team===nt){s.playerTotalUnits++,c.type==="tank"?s.playerTanks++:c.type===gn&&s.playerHelicopters++;const d=Lc[c.type]||1,u=c.type===gn?fh:1;a+=c.hp*d*u}else if(c.team===kt){const d=Lc[c.type]||1,u=c.type===gn?fh:1;r+=c.hp*d*u}}}s.playerArmyPower=a,s.aiArmyPower=r,Rb(t)}function vb(n,t){ca=n,ar=t.getUnits;const i=t.getUnits().filter(o=>o.alive&&o.team===nt&&o.type!==gn&&!o.isSupport&&(o.stance??dn)===dn),s=fn(Math.floor(qt/2),rp,Z);let a=0;for(const o of i)o.rallyHold&&a++;const r=En.rallyStartTime>0&&n-En.rallyStartTime>=lp;if(a>=op||a>0&&r){for(const o of i)o.rallyHold&&(o.rallyHold=!1,o.path=null,o.pathIndex=0);En.rallyStartTime=0,En.pushActive=!0}if(En.pushActive&&i.filter(c=>!c.rallyHold).length===0&&(En.pushActive=!1),!En.pushActive)for(const o of i)!o.rallyHold&&!o._rallyAssigned&&(o.rallyHold=!0,o.rallyX=s.x+(Math.random()-.5)*160,o.rallyZ=s.z+(Math.random()-.5)*120,o._rallyAssigned=!0,En.rallyStartTime===0&&(En.rallyStartTime=n))}function Mb(n,t){const e=fn(oi,Ln,Z);let i=0,s=0;for(let a=0;a<t.length;a++){const r=t[a];if(r.alive)if(r.team===nt){const o=Qt(r.x,r.z,e.x,e.z);if(o<zl)i+=r.hp;else if(o<th){const c=(o-zl)/(th-zl);i+=r.hp*(1-c*.7)}else r.z<e.z+200&&(i+=r.hp*.15)}else r.rallyHold?s+=r.hp*.3:s+=r.hp}return s<=0&&i>0?1:i<=0?0:Math.min(1,i/(s+i))}function yb(n,t){const i=t.getUnits().filter(h=>h.alive&&h.team===kt&&h.type!==gn&&!h.isSupport&&(h.stance??dn)===dn),s=fn(Math.floor(qt/2),mi.rallyRow,Z);let a=0,r=0;for(const h of i)if(h.rallyHold){a++;const f=Lc[h.type]||1;r+=h.hp*f}rt._lastRallyUpdateTime=n;const o=rt.intel,c=o.playerArmyPower+o.playerTurrets*mi.turretPower+o.playerWalls*mi.wallPower;let d=Math.max(mi.minWaveStrength,c*(rt.profile.pushRatio||.9));rt.consecutiveFailures>0&&(d*=1+rt.consecutiveFailures*mi.failureStrengthMult);const u=n<rt.pushCooldownUntil;if(a>=mi.minSize&&r>=d&&!u){Db(n,i,t);for(const h of i)h.rallyHold&&(h.rallyHold=!1,h.path=null,h.pathIndex=0);rt.rallyStartTime=0,rt.pushActive=!0,rt.pushStartTime=n,rt._pushMarkedSuccess=!1,rt._forwardBuildAttempted=!1,rt.lastPushUnitCount=a}if(rt.pushActive){const h=i.filter(_=>!_.rallyHold).length,f=n-rt.pushStartTime;!rt._pushMarkedSuccess&&h>0&&f>15&&(rt._pushMarkedSuccess=!0,rt.dynamicPushBonus=Math.max(0,rt.dynamicPushBonus-mi.sizeShrink),rt.consecutiveFailures=0,rt._forwardBuildAttempted||(rt._attemptForwardBuild=!0)),h===0&&(rt.lastPushUnitCount>0&&!rt._pushMarkedSuccess&&(rt.dynamicPushBonus=Math.min(mi.maxSize,rt.dynamicPushBonus+mi.sizeGrow),rt.consecutiveFailures++,rt.pushCooldownUntil=n+mi.cooldownAfterFailure),rt.pushActive=!1,rt.lastPushUnitCount=0,rt._pushMarkedSuccess=!1)}if(!rt.pushActive){Pb(n,t);const h=rt._flankOffsetX*Z;for(const f of i)!f.rallyHold&&!f._rallyAssigned&&(f.rallyHold=!0,f.rallyX=s.x+h+(Math.random()-.5)*60,f.rallyZ=s.z+(Math.random()-.5)*60,f._rallyAssigned=!0,rt.rallyStartTime===0&&(rt.rallyStartTime=n))}}function Sb(n){if(rt.pushActive||n.type===gn||n.isSupport||(n.stance??dn)!==dn)return;const t=fn(Math.floor(qt/2),mi.rallyRow,Z),e=rt._flankOffsetX*Z;n.rallyHold=!0,n.rallyX=t.x+e+(Math.random()-.5)*60,n.rallyZ=t.z+(Math.random()-.5)*60,n._rallyAssigned=!0,rt.rallyStartTime===0&&(rt.rallyStartTime=ca)}function Eb(n,t){if(n<U_)return;const e=t.getEnergy();if(e<N_||e<$a+jn)return;const i=t.getBuildings();let s=null;for(let f=0;f<i.length;f++){const _=i[f];if(!(_.team!==kt||!_.alive||_.type!==tn)&&t.canAirStrike&&t.canAirStrike(_)){s=_;break}}if(!s)return;const r=t.getUnits().filter(f=>f.alive&&f.team===nt),o=i.filter(f=>f.alive&&f.team===nt);if(r.length===0&&o.length===0)return;let c=0,d=0,u=0;const l=fn(As,rs,Z),h=wc(l.x,l.z,r,o);h>u&&(u=h,c=l.x,d=l.z);for(let f=0;f<Math.min(r.length,10);f++){const _=r[f],g=wc(_.x,_.z,r,o);g>u&&(u=g,c=_.x,d=_.z)}for(let f=0;f<Math.min(o.length,6);f++){const _=o[f],g=wc(_.x,_.z,r,o);g>u&&(u=g,c=_.x,d=_.z)}u<500||t.spendEnergy($a)&&(t.markAirStrikeUsed(s),t.initiateAirStrike(kt,c,d))}function wc(n,t,e,i){let s=0;const a=140;for(let r=0;r<e.length;r++){const o=e[r],c=Qt(o.x,o.z,n,t);c<a&&(s+=o.hp*(1-c/a))}for(let r=0;r<i.length;r++){const o=i[r],c=Qt(o.x,o.z,n,t);if(c<a){const d=o.type===bn?5e3:o.hp*2;s+=d*(1-c/a)}}return s}function wb(n,t){const e=t.getEnergy(),i=t.getBuildings(),s=t.getUnits();if(n>=$_&&e>=Pr+jn){let a=0;for(let r=0;r<s.length;r++){const o=s[r];!o.alive||o.team!==kt||(o.type===Rs||o.type==="assault")&&o.hp<o.maxHp&&a++}if(a>=Z_)for(let r=0;r<i.length;r++){const o=i[r];if(!(o.team!==kt||o.type!==Ce)&&t.canSpawnMedic&&t.canSpawnMedic(o)){t.spendEnergy(Pr)&&t.spawnSupportUnit(Wa,o);break}}}if(n>=j_&&e>=Dr+jn){let a=0;for(let r=0;r<s.length;r++){const o=s[r];!o.alive||o.team!==kt||o.type===js&&o.hp<o.maxHp&&a++}if(a>=K_)for(let r=0;r<i.length;r++){const o=i[r];if(!(o.team!==kt||o.type!==ve)&&t.canSpawnEngineer&&t.canSpawnEngineer(o)){t.spendEnergy(Dr)&&t.spawnSupportUnit(Xa,o);break}}}}function bb(n){const t=n.getUnits(),e=[],i=[];for(let a=0;a<t.length;a++){const r=t[a];r.alive&&(r.team===kt&&r.type===gn?e.push(r):r.team===nt&&i.push(r))}if(e.length===0)return;if(i.length===0){const a=fn(Math.floor(qt/2),rp,Z);qf(a.x,a.z,e,n);return}if(ca<rt.heliRallyCommitUntil){const a=Xf(i);if(Qt(a.x,a.z,rt.heliRallyX,rt.heliRallyZ)<h_)return}const s=Xf(i);qf(s.x,s.z,e,n)}function Xf(n){let t=n[0],e=0;for(let i=0;i<n.length;i++){const s=n[i];let a=0;for(let r=0;r<n.length;r++){if(i===r)continue;Qt(s.x,s.z,n[r].x,n[r].z)<=d_&&a++}a>e&&(e=a,t=s)}return{x:t.x,z:t.z}}function qf(n,t,e,i){rt.heliRallyX=n,rt.heliRallyZ=t,rt.heliRallyCommitUntil=ca+u_;for(const s of e)i.setHelicopterRally&&i.setHelicopterRally(s.id,n,t)}function Gd(n,t,e,i,s){const r=ie[n].size,o=(t+r/2)*Z,c=(e+r/2)*Z;let d=0;if(n===xe){if(s>=In.shared.turret){const _=Math.abs(e-Ni);d+=(10-_)*3}else{let f=1/0;for(const g of i)if((g.type===Ce||g.type===ve)&&g.alive){const p=Qt(o,c,g.x,g.z);p<f&&(f=p)}if(f<1/0){const g=Z*p_;d+=Math.max(0,10-Math.abs(f-g)/Z)}const _=Math.abs(e-Ln);d+=Math.min(_,8),d-=Math.max(0,_-8)*2}let l=1/0;for(const f of i)if(f.type===xe&&f.alive){const _=Qt(o,c,f.x,f.z);_<l&&(l=_)}l<1/0&&(d+=Math.min(l/Z,8));const h=Math.abs(t-qt/2);d-=h*.5}else if(n===ne){const u=dp,l=up;if(e>=u&&e<=l)d+=6;else{const w=Math.min(Math.abs(e-u),Math.abs(e-l));d-=w*1.5}const h=ie[bn].size,f=oi+Math.floor(h/2),_=Ln+h;if(e===_||e===_+1){const w=Math.abs(t-f);w<=h+2&&(d+=14-w)}(t===oi-1||t===oi+h)&&e>=Ln&&e<=_&&(d+=10);let g=!1;for(const w of i){if(w.type===ne||w.type===bn)continue;const A=Math.round((w.x-Z/2)/Z),x=Math.round((w.z-Z/2)/Z),S=ie[w.type]?ie[w.type].size:1;if(t>=A-1&&t<=A+S&&e>=x-1&&e<=x+S){g=!0;break}}g&&(d-=6);let p=!1,m=!1,v=!1,M=!1;for(const w of i){if(w.type!==ne)continue;const A=Math.round((w.x-Z/2)/Z),x=Math.round((w.z-Z/2)/Z);if(Math.abs(t-A)+Math.abs(e-x)===1&&(p=!0),x===e){const I=Math.abs(t-A);I<=2&&(v=!0),I===1&&(m=!0)}A===t&&Math.abs(e-x)===1&&(M=!0)}p&&(d+=5),m?d+=8:v&&(d+=6),M&&(d+=4);{let w=-1,A=!1,x=0;for(let S=0;S<=qt;S++){const I=S<qt?ze(S,e):Mi;if(I===Mi||I===Kd){if(A){const C=S-w;if(C>=1&&C<=8&&t>=w&&t<S){const U=Math.max(5,18-C*2);x=Math.max(x,U)}A=!1}}else A||(w=S,A=!0)}d+=x}{let w=-1,A=-1;for(let x=e-1;x>=Math.max(0,e-6);x--)if(ze(t,x)===Mi){w=x;break}for(let x=e+1;x<=Math.min(Qe-1,e+6);x++)if(ze(t,x)===Mi){A=x;break}if(w>=0&&A>=0){const x=A-w-1;x>=1&&x<=6&&(d+=Math.max(3,12-x*2))}}{let w=!1,A=!1;if(t>0){const x=ze(t-1,e);(x===Mi||x===Gn)&&(w=!0)}if(t<qt-1){const x=ze(t+1,e);(x===Mi||x===Gn)&&(A=!0)}w&&A&&(d+=10)}const y=Math.floor(qt/2),T=Math.abs(t-y);T<=8&&(d+=Math.max(0,5-T*.5)),d+=Math.random()*3}else if(n===we){const u=Math.max(0,8-Math.abs(e-Ln));d+=u*1.5,e>=Va&&e<=Ni&&(d+=8);let l=1/0;for(const f of i)if(f.type===we&&f.alive){const _=Qt(o,c,f.x,f.z);_<l&&(l=_)}l<1/0&&(d+=Math.min(l/Z,5));const h=Math.abs(t-qt/2);d-=h*.3}else{const u=Math.floor((Yo+yl)/2),l=Math.abs(e-u);d+=(10-l)*2;const h=Math.max(0,8-Math.abs(e-Ln));d+=h*.5;let f=1/0;for(const g of i)if(g.type===n&&g.alive){const p=Qt(o,c,g.x,g.z);p<f&&(f=p)}f<1/0&&(d+=Math.min(f/Z,6));const _=Math.abs(t-qt/2);d-=_*.3}return d+=Math.random()*2,d}function Wo(n,t,e,i){const s=ie[n],a=s.size;let r;n===xe&&i>=In.shared.turret||n===we&&i>=In.shared.generator||n===ne&&i>=In.shared.wall?r=Ni:r=yl;const o=[],c=n===ne?50:30;for(let u=0;u<c;u++){const l=yh(2,qt-3-a+1),h=yh(Yo,r-a+1);if(e.isBuildable(l,h,a)){const f=Gd(n,l,h,t,i);o.push({col:l,row:h,score:f})}}if(n===ne){const u=new Set(o.map(_=>`${_.col},${_.row}`)),l=(_,g)=>{const p=`${_},${g}`;u.has(p)||g<Yo||g>r||_<1||_>=qt-1||e.isBuildable(_,g,1)&&(u.add(p),o.push({col:_,row:g,score:Gd(n,_,g,t,i)}))},h=ie[bn].size,f=Ln+h;for(let _=oi-2;_<=oi+h+1;_++)for(let g=Ln;g<=f+1;g++)l(_,g);for(const _ of t){if(_.type!==ne)continue;const g=Math.round((_.x-Z/2)/Z),p=Math.round((_.z-Z/2)/Z);for(const[m,v]of[[1,0],[-1,0],[0,1],[0,-1]])l(g+m,p+v)}for(let _=dp;_<=Math.min(up,r);_++){let g=-1,p=!1;for(let m=0;m<=qt;m++){const v=m<qt?ze(m,_):Mi;if(v===Mi||v===Kd){if(p&&m-g<=8)for(let M=g;M<m;M++)l(M,_);p=!1}else v===je&&(p||(g=m,p=!0))}}}if(o.length===0)return!1;o.sort((u,l)=>l.score-u.score);const d=o[0];return e.spendEnergy(s.cost)?(e.createBuilding(n,d.col,d.row),!0):!1}function Tb(n,t,e){const i=e.getSquads?.(kt);if(!i||i.length===0)return;let s;if(t>i0?s=i.length:t>eh?s=Math.max(1,Math.ceil(i.length*.5)):s=i.length>1?1:0,t>eh&&!rt.pushActive){const r=e.getUnits?.();if(r){for(let o=0;o<r.length;o++){const c=r[o];!c.alive||c.team!==kt||c.isAir||c.rallyHold&&(c.rallyHold=!1,c._rallyAssigned=!1,c.path=null,c.pathIndex=0)}rt.rallyStartTime=0}}const a=[...i].sort((r,o)=>{const c=d=>d===Ce?0:d===ve?1:2;return c(r.buildingType)-c(o.buildingType)});for(let r=0;r<a.length;r++){const o=a[r],c=e.getUnitsBySquad?.(o.id)??[];if(r<s)e.setUnitsStance?.(c,ia),e.setUnitsTargetPriority?.(c,Cr);else{e.setUnitsStance?.(c,dn);const d=rt.pushActive&&o.buildingType===ve?Ya:aa;e.setUnitsTargetPriority?.(c,d)}}}function Ab(n,t,e){const i=rt.intel,s={barracks:Ce,turret:xe,factory:ve,generator:we},a={barracks:Dn.barracks,turret:Dn.turrets,factory:Dn.factories,generator:Dn.generators},r=u=>{const l=s[u],h=In.build[u]||0;if(n<h||e.filter(g=>g.type===l).length>=(a[u]||4))return null;const _=ie[l].cost;return t<_+jn?null:l},o=e.filter(u=>u.type===Ce).length;if(i.playerArmyPower>i.aiArmyPower*F_&&i.playerBarracks>o){const u=r("barracks");if(u)return u}const c=e.filter(u=>u.type===ve).length;if(i.playerTurrets>=fp&&c<2){const u=r("factory");if(u)return u}const d=e.filter(u=>u.type===xe).length;if(i.playerTotalUnits>6&&d<2){const u=r("turret");if(u)return u}return null}function Rb(n){const t=rt.intel,e=n.filter(r=>r.team===kt&&r.alive),i=[],s=e.filter(r=>r.type===ve).length;e.filter(r=>r.type===Ce).length,e.filter(r=>r.type===xe).length;const a=e.filter(r=>r.type===we).length;t.playerTurrets>=fp&&s<2&&i.push("factory"),t.playerTurrets===0&&t.playerBarracks>=O_&&(i.includes("turret")||i.push("turret")),t.playerArmyPower>t.aiArmyPower*B_&&(i.includes("barracks")||i.push("barracks")),a===0&&(i.includes("generator")||i.push("generator")),rt._urgentBuildQueue=i.slice(0,z_)}function Cb(n,t,e){const i={barracks:Ce,turret:xe,factory:ve,generator:we},s={barracks:Dn.barracks,turret:Dn.turrets,factory:Dn.factories,generator:Dn.generators};for(let a=0;a<rt._urgentBuildQueue.length;a++){const r=rt._urgentBuildQueue[a],o=i[r];if(!o)continue;const c=In.build[r]||0;if(n<c||e.filter(l=>l.type===o).length>=(s[r]||4))continue;const u=ie[o].cost;if(!(t<u+jn))return rt._urgentBuildQueue.splice(a,1),{type:"build",meta:{buildType:o}}}return null}function Pb(n,t){if(n-rt._lastFlankScanTime<H_)return;rt._lastFlankScanTime=n;const e=t.getBuildings(),i=qt/2*Z;let s=0,a=0;for(let r=0;r<e.length;r++){const o=e[r];if(o.team!==nt||!o.alive||o.type!==xe&&o.type!==ne)continue;const c=o.type===xe?3:1;o.x<i?s+=c:a+=c}if(s===a)rt._flankOffsetX=0;else if(s<a){const r=a>0?1-s/a:1;rt._flankOffsetX=-Math.round(Mh*Math.min(r,1))}else{const r=s>0?1-a/s:1;rt._flankOffsetX=Math.round(Mh*Math.min(r,1))}}function Db(n,t,e){if(n<V_||rt.intel.playerGenerators<G_)return;const s=e.getBuildings(),a=[];for(let c=0;c<s.length;c++){const d=s[c];d.team===nt&&d.alive&&d.type===we&&a.push(d)}if(a.length===0)return;a.sort((c,d)=>c.z-d.z);const r=a[0];let o=0;for(const c of t){if(o>=k_)break;c.type===Rs&&c.rallyHold&&(c.rallyHold=!1,c.path=null,c.pathIndex=0,c.targetPriority=Ya,c._harassTarget=!0,c.rallyX=r.x,c.rallyZ=r.z,o++)}}function Ib(n,t,e){if(!rt._attemptForwardBuild||n<X_)return;rt._attemptForwardBuild=!1,rt._forwardBuildAttempted=!0;const i=e.getUnits(),s=Va*Z,a=Ni*Z,r=[];for(let u=0;u<i.length;u++){const l=i[u];!l.alive||l.team!==kt||l.isAir||l.z>=s&&l.z<=a&&r.push(l)}if(r.length<2)return;let o=0,c=0;for(const u of r)o+=u.x,c+=u.z;o/=r.length,c/=r.length;const d={turret:xe,generator:we};for(const u of W_){const l=d[u];if(!l)continue;const h=ie[l];if(e.getEnergy()<h.cost+jn)continue;const _=t.filter(w=>w.type===l).length,g=u==="turret"?"turrets":u+"s";if(_>=(Dn[g]||4))continue;const p=Math.round(o/Z),m=Math.round(c/Z),v=h.size;let M=-1,y=-1,T=-1/0;for(let w=-4;w<=4;w++)for(let A=-4;A<=4;A++){const x=p+A,S=m+w;if(S<Va||S>Ni-v+1||x<1||x>=qt-1-v+1||!e.isBuildable(x,S,v))continue;const I=Gd(l,x,S,t,n);I>T&&(T=I,M=x,y=S)}if(M>=0&&e.spendEnergy(h.cost)){e.createBuilding(l,M,y);return}}}function Lb(){let n=0;if(ar){const e=ar();for(let i=0;i<e.length;i++){const s=e[i];s.alive&&s.team===nt&&s.rallyHold&&(s.stance??dn)===dn&&n++}}const t=En.rallyStartTime>0?ca-En.rallyStartTime:0;return{holdingCount:n,pushSize:op,rallyActive:!En.pushActive,timeRemaining:Math.max(0,lp-t)}}function Ub(){if(!ar)return;const n=ar();for(let t=0;t<n.length;t++){const e=n[t];e.alive&&e.team===nt&&e.rallyHold&&(e.stance??dn)===dn&&(e.rallyHold=!1,e.path=null,e.pathIndex=0)}En.rallyStartTime=0,En.pushActive=!0}function Nb(){rt={lastTick:0,rallyStartTime:0,pushActive:!1,profile:null,profileKey:null,difficulty:"normal",diffSettings:null,tempo:null,intel:Hu(),buildOrderIndex:0,lastBuildTime:0,lastUpgradeTime:0,lastPushUnitCount:0,dynamicPushBonus:0,consecutiveFailures:0,pushStartTime:0,pushCooldownUntil:0,_pushMarkedSuccess:!1,_lastRallyUpdateTime:0,heliRallyX:0,heliRallyZ:0,heliRallyCommitUntil:0,_urgentBuildQueue:[],_lastFlankScanTime:0,_flankOffsetX:0,_attemptForwardBuild:!1,_forwardBuildAttempted:!1},En={rallyStartTime:0,pushActive:!1},ca=0,ar=null}let Bn=null,_t=null,$={},vi=null,zn=null,rr="",Yf=!1,Co=0,bc=!1,Tc=0;const ls=200,Sn=ls/ii;let as=null,Ha=null,Xo=!1;function Fb(n,t){Bn=n,_t=t,Bn.innerHTML="";const e=Ca("ENERGY"),i=document.createElement("div");i.className="resource-display",i.innerHTML='<span>&#9889;</span> <span class="energy-value">100</span>',e.appendChild(i);const s=document.createElement("div");s.className="income-display",s.innerHTML='<span class="income-net">+0/s</span>',e.appendChild(s);const a=document.createElement("div");a.className="income-details",a.innerHTML=`
    <div class="income-row"><span>Generators</span><span class="income-val income-gen" id="inc-gen">+0</span></div>
    <div class="income-row"><span>Territory</span><span class="income-val" id="inc-terr">+0</span></div>
  `,e.appendChild(a),Bn.appendChild(e),$.energyValue=i.querySelector(".energy-value"),$.incomeNet=s.querySelector(".income-net"),$.incGen=a.querySelector("#inc-gen"),$.incTerr=a.querySelector("#inc-terr");const r=Ca("BASE STATUS"),o=$f("YOUR BASE","2000 / 2000"),c=Zf();r.appendChild(o.container),r.appendChild(c.track),$.playerHpLabel=o.valueEl,$.playerHpFill=c.fill;const d=$f("ENEMY BASE","2000 / 2000"),u=Zf();d.container.style.marginTop="8px",r.appendChild(d.container),r.appendChild(u.track),$.enemyHpLabel=d.valueEl,$.enemyHpFill=u.fill,Bn.appendChild(r);const l=Ca("BUILD");$.buildButtons={};for(const L of ap){const k=ie[L],B=document.createElement("button");B.className="build-btn",B.innerHTML=`<span>${k.label}</span><span class="cost">${k.cost} E</span>`,B.addEventListener("click",()=>{B.classList.contains("disabled")||(pn(),Pn(),vi===L?(vi=null,B.classList.remove("selected")):(vi&&$.buildButtons[vi]&&$.buildButtons[vi].classList.remove("selected"),vi=L,B.classList.add("selected")),_t&&_t.onBuildSelect&&_t.onBuildSelect(vi))}),l.appendChild(B),$.buildButtons[L]=B}Bn.appendChild(l);const h=document.createElement("div");h.className="sidebar-section building-section hidden",h.innerHTML=`
    <div class="sidebar-title building-title">BUILDING</div>
    <div class="building-level"></div>
    <div class="building-stats"></div>
    <div class="building-tracker"></div>
    <div class="building-construction hidden">
      <div class="construction-label"></div>
      <div class="hp-bar-track"><div class="hp-bar-fill construction-fill" style="width:0%"></div></div>
    </div>
    <div class="building-actions"></div>
  `,Bn.appendChild(h),$.buildingSection=h,$.buildingTitle=h.querySelector(".building-title"),$.buildingLevel=h.querySelector(".building-level"),$.buildingStats=h.querySelector(".building-stats"),$.buildingTracker=h.querySelector(".building-tracker"),$.buildingConstruction=h.querySelector(".building-construction"),$.constructionLabel=h.querySelector(".construction-label"),$.constructionFill=h.querySelector(".construction-fill"),$.buildingActions=h.querySelector(".building-actions");const f=document.createElement("div");f.className="sidebar-section helicopter-section hidden",f.innerHTML=`
    <div class="sidebar-title heli-title">HELICOPTER</div>
    <div class="heli-hp-row">
      <span class="heli-hp-label">HP</span>
      <span class="heli-hp-value"></span>
    </div>
    <div class="hp-bar-track"><div class="hp-bar-fill heli-hp-fill hp-high" style="width:100%"></div></div>
    <div class="heli-rally-hint">CLICK MAP TO SET RALLY POINT</div>
    <button class="build-btn heli-deselect-btn">DESELECT</button>
  `,Bn.appendChild(f),$.heliSection=f,$.heliHpValue=f.querySelector(".heli-hp-value"),$.heliHpFill=f.querySelector(".heli-hp-fill"),f.querySelector(".heli-deselect-btn").addEventListener("click",()=>{Pn(),_t&&_t.onHeliDeselect&&_t.onHeliDeselect()});const g=document.createElement("div");g.className="base-alert hidden",g.textContent="BASE UNDER ATTACK",r.insertBefore(g,o.container),$.baseAlert=g,$.playerHpTrack=c.track;const p=Ca("UNITS"),m=document.createElement("div");m.innerHTML=`
    <div class="unit-count"><span class="unit-count-label">Player Units</span><span class="unit-count-value" id="player-unit-count">0</span></div>
    <div class="unit-count"><span class="unit-count-label">Enemy Units</span><span class="unit-count-value" id="enemy-unit-count">0</span></div>
  `,p.appendChild(m),Bn.appendChild(p),$.playerUnitCount=m.querySelector("#player-unit-count"),$.enemyUnitCount=m.querySelector("#enemy-unit-count");const v=document.createElement("div");v.className="sidebar-section selection-command-bar hidden",v.innerHTML=`
    <div class="sidebar-title sel-cmd-title">0 UNITS SELECTED</div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">CMD</span>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${dn}">ADV</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${ia}">DEF</button>
      <button class="sel-cmd-btn" data-sel="stance" data-val="${Rr}">HOLD</button>
      <button class="sel-cmd-btn sel-cmd-btn--rally" data-sel="rally">RALLY</button>
    </div>
    <div class="sel-cmd-row">
      <span class="sel-cmd-label">TGT</span>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${aa}">ANY</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${Cr}">UNIT</button>
      <button class="sel-cmd-btn sel-cmd-btn--target" data-sel="target" data-val="${Ya}">BLDG</button>
    </div>
    <button class="build-btn sel-deselect-btn">DESELECT</button>
  `,Bn.appendChild(v),$.selCmdSection=v,$.selCmdTitle=v.querySelector(".sel-cmd-title"),v.querySelectorAll('[data-sel="stance"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onSelectionStance&&_t.onSelectionStance(L.dataset.val)})}),v.querySelectorAll('[data-sel="rally"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onSelectionRallyClick&&_t.onSelectionRallyClick()})}),v.querySelectorAll('[data-sel="target"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onSelectionTarget&&_t.onSelectionTarget(L.dataset.val)})}),v.querySelector(".sel-deselect-btn").addEventListener("click",()=>{_t&&_t.onSelectionDeselect&&_t.onSelectionDeselect()});const M=document.createElement("div");M.className="sidebar-section squad-section hidden",M.innerHTML=`
    <div class="sidebar-title squad-title">SQUADS</div>
    <div class="squad-global-row">
      <div class="squad-global-group">
        <span class="squad-global-label">ALL</span>
        <button class="squad-global-btn" data-global="stance" data-val="${dn}">ADV</button>
        <button class="squad-global-btn" data-global="stance" data-val="${ia}">DEF</button>
        <button class="squad-global-btn" data-global="stance" data-val="${Rr}">HOLD</button>
        <button class="squad-global-btn squad-global-btn--rally" data-global="rally" data-val="all">RALLY</button>
      </div>
      <div class="squad-global-group">
        <span class="squad-global-label">TGT</span>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${aa}">ANY</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${Cr}">UNIT</button>
        <button class="squad-global-btn squad-global-btn--target" data-global="target" data-val="${Ya}">BLDG</button>
      </div>
    </div>
    <div class="squad-cards"></div>
  `,Bn.appendChild(M),$.squadSection=M,$.squadCards=M.querySelector(".squad-cards"),M.querySelectorAll('[data-global="stance"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onGlobalStance&&_t.onGlobalStance(L.dataset.val)})}),M.querySelectorAll('[data-global="target"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onGlobalTarget&&_t.onGlobalTarget(L.dataset.val)})}),M.querySelectorAll('[data-global="rally"]').forEach(L=>{L.addEventListener("click",()=>{_t&&_t.onGlobalRallyClick&&_t.onGlobalRallyClick()})});const y=document.createElement("div");y.className="selection-box hidden",document.body.appendChild(y),$.selBoxOverlay=y;const T=document.createElement("div");T.className="airstrike-overlay hidden",T.innerHTML=`
    <div class="airstrike-overlay-text">SELECT AIR STRIKE TARGET</div>
    <div class="airstrike-overlay-sub">Click on the map to designate target &bull; Right-click or ESC to cancel</div>
  `,document.body.appendChild(T),$.airStrikeOverlay=T;const w=document.createElement("div");w.className="sidebar-section rally-section hidden",w.innerHTML=`
    <div class="sidebar-title">RALLY</div>
    <div class="rally-count">0 / 3</div>
    <div class="hp-bar-track"><div class="hp-bar-fill rally-fill" style="width:0%"></div></div>
    <div class="rally-timer">Push in 0.0s</div>
    <button class="build-btn rally-push-btn">PUSH NOW</button>
  `,Bn.appendChild(w),$.rallySection=w,$.rallyCount=w.querySelector(".rally-count"),$.rallyFill=w.querySelector(".rally-fill"),$.rallyTimer=w.querySelector(".rally-timer"),w.querySelector(".rally-push-btn").addEventListener("click",()=>{_t&&_t.onPushNow&&_t.onPushNow()});const x=Ca("MAP"),S=document.createElement("canvas");S.className="minimap-canvas",S.width=ls,S.height=ls,x.appendChild(S),Bn.appendChild(x),$.minimapCanvas=S,$.minimapCtx=S.getContext("2d"),S.addEventListener("click",L=>{const k=S.getBoundingClientRect(),B=ls/k.width,V=ls/k.height,H=(L.clientX-k.left)*B,et=(L.clientY-k.top)*V,tt=H/Sn,ht=et/Sn;if(Ha!=null&&_t&&_t.onRallySet){_t.onRallySet(Ha,tt,ht),Ha=null;return}if(as&&_t&&_t.onHelicopterRally){_t.onHelicopterRally(as.id,tt,ht),Pn(),_t.onHeliDeselect&&_t.onHeliDeselect();return}_t&&_t.onMinimapClick&&_t.onMinimapClick(tt,ht)});const I=Ca("INFO"),C=document.createElement("div");C.className="info-panel",C.textContent="Click a building type to place it.",I.appendChild(C),Bn.appendChild(I),$.infoPanel=C;const U=document.createElement("div");U.className="match-timer",U.textContent="00:00",Bn.appendChild(U),$.matchTimer=U}function Ob(n){if(!$.energyValue)return;if($.energyValue.textContent=Math.floor(n.energy),n.incomeBreakdown&&$.incomeNet){const i=n.incomeBreakdown,s=i.net>=0?"+":"";$.incomeNet.textContent=`${s}${i.net.toFixed(1)}/s`,$.incomeNet.className="income-net"+(i.net<=0?" income-low":""),$.incGen.textContent=i.generators>0?`+${i.generators.toFixed(1)}`:"+0",$.incTerr.textContent=i.territory>0?`+${i.territory.toFixed(1)}`:"+0"}let t=null,e=null;if(n.buildings)for(const i of n.buildings)i.type===bn&&i.team===nt&&(t=i),i.type===bn&&i.team===kt&&(e=i);if(t){const i=ie[bn],s=Math.max(0,t.hp/i.hp);$.playerHpFill.style.width=s*100+"%",$.playerHpFill.className="hp-bar-fill "+kd(s),$.playerHpLabel.textContent=`${Math.ceil(t.hp)} / ${i.hp}`}if(e){const i=ie[bn],s=Math.max(0,e.hp/i.hp);$.enemyHpFill.style.width=s*100+"%",$.enemyHpFill.className="hp-bar-fill "+kd(s),$.enemyHpLabel.textContent=`${Math.ceil(e.hp)} / ${i.hp}`}if(n.matchTime!=null){const i=Math.floor(n.matchTime),s=Math.floor(i/60),a=i%60;$.matchTimer.textContent=String(s).padStart(2,"0")+":"+String(a).padStart(2,"0")}for(const i of ap){const s=ie[i],a=$.buildButtons[i];a&&(n.energy<s.cost?a.classList.add("disabled"):a.classList.remove("disabled"))}if(n.units){let i=0,s=0;for(const a of n.units)a.team===nt?i++:s++;$.playerUnitCount.textContent=i,$.enemyUnitCount.textContent=s}if(kb(n),Gb(n),Vb(n),$.airStrikeOverlay){const i=Xo||n.airStrikePending;$.airStrikeOverlay.classList.toggle("hidden",!i),document.body.classList.toggle("airstrike-targeting",!!i),!n.airStrikePending&&Xo&&(Xo=!1)}Wb(n.baseUnderAttack,n.dt||0),Xb(n),qb(n),zn&&Nm(zn,n.energy,n.squads,n.matchTime),as&&as.alive?Lm(as):as&&!as.alive&&(Pn(),_t&&_t.onHeliDeselect&&_t.onHeliDeselect())}function Bb(n){n&&(as=n,pn(),ns(),$.heliSection.classList.remove("hidden"),Lm(n))}function Pn(){as=null,$.heliSection&&$.heliSection.classList.add("hidden")}function Lm(n){const t=$o[n.type];if(!t)return;const e=n.maxHp||t.hp,i=Math.max(0,n.hp/e);$.heliHpValue.textContent=`${Math.ceil(n.hp)} / ${e}`,$.heliHpFill.style.width=i*100+"%",$.heliHpFill.className="hp-bar-fill "+kd(i)}function Um(n){if(!n||n.team!==nt){pn();return}if(!ie[n.type]){pn();return}zn=n,ns(),Pn(),$.buildingSection.classList.remove("hidden"),Nm(n,0)}function pn(){zn=null,rr="",$.buildingSection&&$.buildingSection.classList.add("hidden")}function _l(){return zn}function Nm(n,t,e,i){if(!n||!n.alive){pn();return}const s=ie[n.type];if(n.type===ne)$.buildingTitle.textContent=`WALL L${n.level}`;else{let r=s.label.toUpperCase();if(e&&(n.type===Ce||n.type===ve||n.type===tn)){const o=e.find(c=>c.buildingId===n.id);o&&(r=o.label.toUpperCase())}$.buildingTitle.textContent=r}if(s.levels){let r=`Level ${n.level}`;if(n.type===ne)r=s.description||"Destructible barrier";else if(n.branch){const o=s.branches[n.branch];r=`[${n.branch}] ${o.name}`}$.buildingLevel.textContent=r,$.buildingLevel.className="building-level"+(n.branch?" building-branched":"")}else $.buildingLevel.textContent=s.description||"",$.buildingLevel.className="building-level";let a="";if(n.type===xe){const r=Em(n);r&&(a+=`<div class="info-stat"><span>DMG</span><span class="info-stat-value">${r.damage}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.fireRate.toFixed(2)}s</span></div>`,a+=`<div class="info-stat"><span>RANGE</span><span class="info-stat-value">${r.range}</span></div>`,r.splashRadius&&(a+=`<div class="info-stat"><span>SPLASH</span><span class="info-stat-value">${r.splashRadius}px</span></div>`))}else if(n.type===we){const r=bm(n);r&&(a+=`<div class="info-stat"><span>INCOME</span><span class="info-stat-value income-gen">+${r.incomeBonus}/s</span></div>`,r.territoryMult>1&&(a+=`<div class="info-stat"><span>TERRITORY MULT</span><span class="info-stat-value income-gen">x${r.territoryMult}</span></div>`))}else if(n.type===ne)a+='<div class="info-stat"><span>TYPE</span><span class="info-stat-value">BARRIER</span></div>';else{const r=wm(n);if(r){const o=r.produceUnit||s.produceUnit;a+=`<div class="info-stat"><span>UNIT</span><span class="info-stat-value">${o.toUpperCase()}</span></div>`,a+=`<div class="info-stat"><span>RATE</span><span class="info-stat-value">${r.produceTime.toFixed(1)}s</span></div>`,r.hpMult&&r.hpMult!==1&&(a+=`<div class="info-stat"><span>UNIT HP</span><span class="info-stat-value">+${Math.round((r.hpMult-1)*100)}%</span></div>`),r.damageMult&&r.damageMult!==1&&(a+=`<div class="info-stat"><span>UNIT DMG</span><span class="info-stat-value">+${Math.round((r.damageMult-1)*100)}%</span></div>`),r.speedMult&&r.speedMult!==1&&(a+=`<div class="info-stat"><span>UNIT SPD</span><span class="info-stat-value">+${Math.round((r.speedMult-1)*100)}%</span></div>`),r.rangeMult&&r.rangeMult!==1&&(a+=`<div class="info-stat"><span>UNIT RNG</span><span class="info-stat-value">+${Math.round((r.rangeMult-1)*100)}%</span></div>`)}}if(a+=`<div class="info-stat"><span>HP</span><span class="info-stat-value">${Math.ceil(n.hp)} / ${n.maxHp}</span></div>`,$.buildingStats.innerHTML=a,n.type===xe?$.buildingTracker.innerHTML=`<div class="info-stat"><span>Dmg dealt</span><span class="info-stat-value">${n.totalDamage}</span></div><div class="info-stat"><span>Kills</span><span class="info-stat-value">${n.kills}</span></div>`:$.buildingTracker.innerHTML="",s.levels)if(n.constructionState&&n.constructionState!=="building"){$.buildingConstruction.classList.remove("hidden");const r=Math.min(1,n.constructionTimer/n.constructionDuration),o=Math.max(0,n.constructionDuration-n.constructionTimer).toFixed(1);let c="UPGRADING",d="construction-upgrade";n.constructionState==="branching"?(c="BRANCHING",d="construction-branch"):n.constructionState==="repairing"&&(c="REPAIRING",d="construction-repair"),$.constructionLabel.textContent=`${c}... ${o}s`,$.constructionFill.style.width=r*100+"%",$.constructionFill.className="hp-bar-fill "+d,$.buildingActions.innerHTML="",rr=""}else $.buildingConstruction.classList.add("hidden"),zb(n,t,i);else $.buildingConstruction.classList.add("hidden"),$.buildingActions.innerHTML="",rr=""}function zb(n,t,e){const i=Jr(n),s=n.type!==ne&&Qr(n),a=i?Uu(n):0,r=i&&t>=a;let o=!1,c=!1;s&&(o=t>=Er(n,"A"),c=t>=Er(n,"B"));const d=n.type===ne,u=Hr(n),l=u?Gr(n):0,h=u&&t>=l,f=!!n._repairing,_=fl(n,e||0),g=_&&t>=$a,p=n.airStrikeCooldownUntil&&e?Math.max(0,n.airStrikeCooldownUntil-e):0,m=Ou(n,e||0),v=m&&t>=Pr,M=n.supportCooldownUntil&&e?Math.max(0,n.supportCooldownUntil-e):0,y=n.type===Ce&&n._activeSupportUnitId!=null,T=Bu(n,e||0),w=T&&t>=Dr,A=n.supportCooldownUntil&&e?Math.max(0,n.supportCooldownUntil-e):0,x=n.type===ve&&n._activeSupportUnitId!=null,S=`${n.id}:${n.level}:${n.branch}:${i}:${s}:${r}:${o}:${c}:${u}:${h}:${f}:${Math.ceil(n.hp)}:${n.orientation||""}:${_}:${g}:${Math.floor(p)}:${m}:${v}:${y}:${Math.floor(M)}:${T}:${w}:${x}:${Math.floor(A)}`;if(S===rr)return;rr=S;let I="";if(d){const C=[{key:ra,label:"H"},{key:Zo,label:"V"},{key:Jd,label:"NE"},{key:Qd,label:"NW"},{key:tu,label:"SE"},{key:eu,label:"SW"}],U=n.orientation||ra;I+='<div class="wall-orient-row">';for(const L of C){const k=U===L.key?" active":"";I+=`<button class="wall-orient-btn${k}" data-action="orient" data-orient="${L.key}">${L.label}</button>`}I+="</div>"}if(u&&(I+=`<button class="build-btn turret-action-btn repair-btn ${h?"":"disabled"}" data-action="repair">
      <span>REPAIR</span><span class="cost">${l} E</span>
    </button>`),f){const C=Math.min((n._repairTimer||0)/(n._repairDuration||1),1)*100;I+=`<div class="repair-progress-row">
      <span class="repair-progress-label">REPAIRING...</span>
      <div class="hp-bar-track repair-track"><div class="hp-bar-fill construction-repair" style="width:${C.toFixed(0)}%"></div></div>
    </div>`}if(i&&(I+=`<button class="build-btn turret-action-btn ${r?"":"disabled"}" data-action="upgrade">
      <span>UPGRADE TO L${n.level+1}</span><span class="cost">${a} E</span>
    </button>`),s){const C=ie[n.type].branches;for(const U of["A","B"]){const L=C[U],k=Er(n,U),B=t>=k;I+=`<button class="build-btn turret-action-btn branch-btn ${B?"":"disabled"}" data-action="branch" data-key="${U}">
        <span class="br-key">[${U}]</span> <span>${L.name}</span>
        <span class="br-desc">${L.desc}</span>
        <span class="cost">${k} E</span>
      </button>`}}if(n.type===tn&&n.branch&&(_?I+=`<button class="build-btn turret-action-btn airstrike-btn ${g?"":"disabled"}" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">${$a} E</span>
      </button>`:p>0&&(I+=`<button class="build-btn turret-action-btn airstrike-btn disabled" data-action="airstrike">
        <span>AIR STRIKE</span><span class="cost">COOLDOWN ${Math.ceil(p)}s</span>
      </button>`)),n.type===Ce&&n.branch&&(y?I+=`<button class="build-btn turret-action-btn medic-btn disabled" data-action="medic">
        <span>MEDIC ACTIVE</span>
      </button>`:m?I+=`<button class="build-btn turret-action-btn medic-btn ${v?"":"disabled"}" data-action="medic">
        <span>SPAWN MEDIC</span><span class="cost">${Pr} E</span>
      </button>`:M>0&&(I+=`<button class="build-btn turret-action-btn medic-btn disabled" data-action="medic">
        <span>SPAWN MEDIC</span><span class="cost">COOLDOWN ${Math.ceil(M)}s</span>
      </button>`)),n.type===ve&&n.branch&&(x?I+=`<button class="build-btn turret-action-btn engineer-btn disabled" data-action="engineer">
        <span>ENGINEER ACTIVE</span>
      </button>`:T?I+=`<button class="build-btn turret-action-btn engineer-btn ${w?"":"disabled"}" data-action="engineer">
        <span>SPAWN ENGINEER</span><span class="cost">${Dr} E</span>
      </button>`:A>0&&(I+=`<button class="build-btn turret-action-btn engineer-btn disabled" data-action="engineer">
        <span>SPAWN ENGINEER</span><span class="cost">COOLDOWN ${Math.ceil(A)}s</span>
      </button>`)),d){const C=Math.floor((n.investedCost||0)*hp);I+=`<button class="build-btn turret-action-btn demolish-btn" data-action="demolish">
      <span>DESTROY</span><span class="cost">REFUND ${C}E</span>
    </button>`}$.buildingActions.innerHTML=I,$.buildingActions.querySelectorAll('[data-action="orient"]').forEach(C=>{C.addEventListener("click",()=>{const U=C.getAttribute("data-orient");_t&&_t.onWallOrient&&_t.onWallOrient(zn,U)})}),$.buildingActions.querySelectorAll('[data-action="demolish"]').forEach(C=>{C.addEventListener("click",()=>{_t&&_t.onWallDemolish&&_t.onWallDemolish(zn),pn()})}),$.buildingActions.querySelectorAll('[data-action="repair"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||(_t&&_t.onBuildingRepair?_t.onBuildingRepair(zn):_t&&_t.onWallRepair&&_t.onWallRepair(zn))})}),$.buildingActions.querySelectorAll('[data-action="upgrade"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||_t&&_t.onBuildingUpgrade&&_t.onBuildingUpgrade(zn)})}),$.buildingActions.querySelectorAll('[data-action="branch"]').forEach(C=>{C.addEventListener("click",()=>{if(C.classList.contains("disabled"))return;const U=C.getAttribute("data-key");_t&&_t.onBuildingBranch&&_t.onBuildingBranch(zn,U)})}),$.buildingActions.querySelectorAll('[data-action="airstrike"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||_t&&_t.onAirStrike&&_t.onAirStrike(zn)})}),$.buildingActions.querySelectorAll('[data-action="medic"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||_t&&_t.onSpawnMedic&&_t.onSpawnMedic(zn)})}),$.buildingActions.querySelectorAll('[data-action="engineer"]').forEach(C=>{C.addEventListener("click",()=>{C.classList.contains("disabled")||_t&&_t.onSpawnEngineer&&_t.onSpawnEngineer(zn)})})}function ws(n){Ha=n,qo=""}function Hb(n){Xo=!0,rr=""}function ns(){vi&&$.buildButtons[vi]&&$.buildButtons[vi].classList.remove("selected"),vi=null}function Ca(n){const t=document.createElement("div");t.className="sidebar-section";const e=document.createElement("div");return e.className="sidebar-title",e.textContent=n,t.appendChild(e),t}function $f(n,t){const e=document.createElement("div");e.className="hp-label";const i=document.createElement("span");i.className="hp-label-name",i.textContent=n;const s=document.createElement("span");return s.className="hp-label-value",s.textContent=t,e.appendChild(i),e.appendChild(s),{container:e,valueEl:s}}function Zf(){const n=document.createElement("div");n.className="hp-bar-track";const t=document.createElement("div");return t.className="hp-bar-fill hp-high",t.style.width="100%",n.appendChild(t),{track:n,fill:t}}function kd(n){return n>.5?"hp-high":n>.25?"hp-mid":"hp-low"}let qo="";function Gb(n){const t=n.squads;if(!t||t.length===0){$.squadSection&&!$.squadSection.classList.contains("hidden")&&$.squadSection.classList.add("hidden"),qo="";return}$.squadSection.classList.remove("hidden");const e=t.map(r=>`${r.id}:${r.spawnStance||Pa}:${r.spawnTargetPriority||Da}:${r.unitCount}:${r.buildingAlive}`).join("|")+`|rp:${Ha||""}`;if(e===qo)return;qo=e;const i=t.every(r=>(r.spawnStance||Pa)===(t[0].spawnStance||Pa))?t[0].spawnStance||Pa:null,s=t.every(r=>(r.spawnTargetPriority||Da)===(t[0].spawnTargetPriority||Da))?t[0].spawnTargetPriority||Da:null;$.squadSection.querySelectorAll('[data-global="stance"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===i)}),$.squadSection.querySelectorAll('[data-global="rally"]').forEach(r=>{const o=Ha==="all";r.classList.toggle("active",o),r.classList.toggle("pending",o)}),$.squadSection.querySelectorAll('[data-global="target"]').forEach(r=>{r.classList.toggle("active",r.dataset.val===s)});let a="";for(const r of t){const o=r.buildingAlive?"":" squad-card--dead",c=r.spawnStance||Pa,d=r.spawnTargetPriority||Da;a+=`<div class="squad-card${o}" data-squad="${r.id}">
      <div class="squad-card-header" data-squad-click="${r.id}">
        <span class="squad-label">${r.label}</span>
        <span class="squad-count">${r.unitCount}</span>
      </div>
      <div class="squad-spawn-row">
        <span class="squad-spawn-label">SPAWN</span>
        <button class="squad-spawn-btn${c===dn?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${dn}">ADV</button>
        <button class="squad-spawn-btn${c===ia?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${ia}">DEF</button>
        <button class="squad-spawn-btn${c===Rr?" active":""}" data-squad-id="${r.id}" data-spawn="stance" data-val="${Rr}">HOLD</button>
        <span class="squad-cmd-sep"></span>
        <button class="squad-spawn-btn squad-spawn-btn--target${d===aa?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${aa}">ANY</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${d===Cr?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${Cr}">UNIT</button>
        <button class="squad-spawn-btn squad-spawn-btn--target${d===Ya?" active":""}" data-squad-id="${r.id}" data-spawn="target" data-val="${Ya}">BLDG</button>
      </div>
    </div>`}$.squadCards.innerHTML=a,$.squadCards.querySelectorAll("[data-squad-click]").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.squadClick);_t&&_t.onSquadCardClick&&_t.onSquadCardClick(o)})}),$.squadCards.querySelectorAll('[data-spawn="stance"]').forEach(r=>{r.addEventListener("click",()=>{_t&&_t.onSpawnStanceChange&&_t.onSpawnStanceChange(Number(r.dataset.squadId),r.dataset.val)})}),$.squadCards.querySelectorAll('[data-spawn="target"]').forEach(r=>{r.addEventListener("click",()=>{_t&&_t.onSpawnTargetChange&&_t.onSpawnTargetChange(Number(r.dataset.squadId),r.dataset.val)})})}let Ac="";function kb(n){const t=n.selectedUnitCount||0;if(t===0){$.selCmdSection&&!$.selCmdSection.classList.contains("hidden")&&$.selCmdSection.classList.add("hidden"),Ac="";return}$.selCmdSection.classList.remove("hidden");const e=`${t}`;e!==Ac&&(Ac=e,$.selCmdTitle.textContent=`${t} UNIT${t!==1?"S":""} SELECTED`)}function Vb(n){const t=n.selectionBoxScreen;if(!t){$.selBoxOverlay&&!$.selBoxOverlay.classList.contains("hidden")&&$.selBoxOverlay.classList.add("hidden");return}$.selBoxOverlay.classList.remove("hidden"),$.selBoxOverlay.style.left=t.x1+"px",$.selBoxOverlay.style.top=t.y1+"px",$.selBoxOverlay.style.width=t.x2-t.x1+"px",$.selBoxOverlay.style.height=t.y2-t.y1+"px"}function Wb(n,t){Co>0&&(Co-=t),n&&!Yf&&Co<=0&&(bc=!0,Tc=3,Co=5,$.baseAlert.classList.remove("hidden"),$.playerHpTrack.classList.add("hp-bar-alert")),bc&&(Tc-=t,(Tc<=0||!n)&&(bc=!1,$.baseAlert.classList.add("hidden"),$.playerHpTrack.classList.remove("hp-bar-alert"))),Yf=!!n}function Xb(n){if(!(n.rallyActive&&n.rallyHoldingCount>0)){$.rallySection&&!$.rallySection.classList.contains("hidden")&&$.rallySection.classList.add("hidden");return}$.rallySection.classList.remove("hidden");const e=n.rallyHoldingCount||0,i=n.rallyPushSize||1,s=n.rallyTimeRemaining||0;$.rallyCount.textContent=`${e} / ${i}`,$.rallyFill.style.width=e/i*100+"%",$.rallyTimer.textContent=`Push in ${s.toFixed(1)}s`}function qb(n){const t=$.minimapCtx;if(!t)return;if(t.fillStyle="#08081A",t.fillRect(0,0,ls,ls),n.obstacles){t.fillStyle="#505064";const s=Z*Sn;for(const a of n.obstacles)t.fillRect(a.col*s,a.row*s,s,s)}const e=sp*Z*Sn,i=(yl+1)*Z*Sn;if(t.strokeStyle="rgba(0,255,255,0.25)",t.lineWidth=1,t.beginPath(),t.moveTo(0,e),t.lineTo(ls,e),t.stroke(),t.strokeStyle="rgba(255,50,50,0.25)",t.beginPath(),t.moveTo(0,i),t.lineTo(ls,i),t.stroke(),n.buildings)for(const s of n.buildings){if(!s.alive)continue;const a=ie[s.type],r=(a?a.size:1)*Z*Sn;t.fillStyle=s.team===nt?"#00ffff":"#ff3232",t.fillRect(s.col*Z*Sn,s.row*Z*Sn,r,r)}if(n.units)for(const s of n.units){if(!s.alive)continue;const a=s.team===nt?"#00ffff":"#ff3232",r=s.x*Sn,o=s.z*Sn;s.isAir?(t.fillStyle=a,t.beginPath(),t.moveTo(r,o-3),t.lineTo(r-2.5,o+2),t.lineTo(r+2.5,o+2),t.closePath(),t.fill()):(t.fillStyle=a,t.beginPath(),t.arc(r,o,2,0,Math.PI*2),t.fill())}if(n.squads)for(const s of n.squads){if(s.stance!==sa||s.rallyX==null)continue;const a=s.rallyX*Sn,r=s.rallyZ*Sn;t.strokeStyle="#32ff64",t.lineWidth=1.5,t.beginPath(),t.moveTo(a,r-4),t.lineTo(a+4,r),t.lineTo(a,r+4),t.lineTo(a-4,r),t.closePath(),t.stroke()}if(n.cameraInfo){const s=n.cameraInfo;t.strokeStyle="rgba(255,255,255,0.5)",t.lineWidth=1;const a=(s.x-s.viewWidth/2)*Sn,r=(s.z-s.viewHeight/2)*Sn,o=s.viewWidth*Sn,c=s.viewHeight*Sn;t.strokeRect(a,r,o,c)}}let gl=null,Fl=null,Vr=null,br=null,Ie=null,Ui=null,Wr=null,ta=null,Vd=null;const Fm=new Ri(new F(0,1,0),0),Yb=new Ri(new F(0,1,0),-Sl),Rc=new F,Cc=new F;let wi=null,Wd=null,Xd=null,hs=null,qd=null,zi=null,Yd=null,Fs=!1,xl=null,or=[],$d=null,Zd=null,wn=null,Si=null,Os=!1,cs=null;function $b(n,t,e){gl=n,Fl=t,cs=e||null,Vr=new Yp,br=new Pt;const i=gl.domElement;i.addEventListener("mousemove",Zb),i.addEventListener("mousedown",jb),i.addEventListener("mouseup",Kb),i.addEventListener("contextmenu",tT),document.addEventListener("keydown",Qb)}function Zb(n){const t=gl.domElement.getBoundingClientRect();if(br.x=(n.clientX-t.left)/t.width*2-1,br.y=-((n.clientY-t.top)/t.height)*2+1,Vr.setFromCamera(br,Fl),Vr.ray.intersectPlane(Fm,Rc)?Ie=on(Rc.x,Rc.z,Z):Ie=null,Fs&&xl&&Ie&&(or=Jb(xl,Ie)),wn){Si={x:n.clientX,y:n.clientY};const i=n.clientX-wn.x,s=n.clientY-wn.y;!Os&&Math.sqrt(i*i+s*s)>M_&&(Os=!0)}}function jb(n){if(n.button===0){if(Ui===ne&&Ie){Fs=!0,xl={col:Ie.col,row:Ie.row},or=[{col:Ie.col,row:Ie.row}],cs&&(cs.enabled=!1);return}n.shiftKey&&!Ui&&!Fs&&hs==null&&zi==null&&wi==null&&(wn={x:n.clientX,y:n.clientY},Si=null,Os=!1,cs&&(cs.enabled=!1))}}function Kb(n){if(n.button===0){if(Fs){or.length>0&&$d&&$d(or),Gu();return}if(Os&&wn&&Si){const t=gl.domElement.getBoundingClientRect(),e=jf(wn.x,wn.y,t),i=jf(Si.x,Si.y,t);if(e&&i&&Zd){const s=Math.min(e.x,i.x),a=Math.min(e.z,i.z),r=Math.max(e.x,i.x),o=Math.max(e.z,i.z);Zd(s,a,r,o)}vl();return}if(vl(),zi!=null&&Ie){const t=Ie.col*Z+Z/2,e=Ie.row*Z+Z/2;Yd&&Yd(zi,t,e),zi=null;return}if(hs!=null&&Ie){const t=Ie.col*Z+Z/2,e=Ie.row*Z+Z/2;qd&&qd(hs,t,e),hs=null;return}if(wi!=null&&Ie){const t=Ie.col*Z+Z/2,e=Ie.row*Z+Z/2;Wd&&Wd(wi,t,e),wi=null;return}if(!Ui&&Xd&&(Vr.setFromCamera(br,Fl),Vr.ray.intersectPlane(Yb,Cc))){const e=Xd();for(const i of e)if(Qt(Cc.x,Cc.z,i.x,i.z)<35){wi=i.id,ta&&ta(-2,-2,0,0);return}}if(Ui&&Ie&&Wr)Wr(Ie.col,Ie.row,Ui);else if(!Ui&&Ie&&ta){const t=Ie.col*Z+Z/2,e=Ie.row*Z+Z/2;ta(Ie.col,Ie.row,t,e)}}}function Jb(n,t){const e=[],i=t.col-n.col,s=t.row-n.row;if(Math.abs(i)>=Math.abs(s)){const a=Math.min(n.col,t.col),r=Math.max(n.col,t.col);for(let o=a;o<=r;o++)e.push({col:o,row:n.row})}else{const a=Math.min(n.row,t.row),r=Math.max(n.row,t.row);for(let o=a;o<=r;o++)e.push({col:n.col,row:o})}return e}function Gu(){Fs=!1,xl=null,or=[],cs&&(cs.enabled=!0)}function vl(){const n=wn!=null;wn=null,Si=null,Os=!1,n&&cs&&(cs.enabled=!0)}function jf(n,t,e){const i=new Pt((n-e.left)/e.width*2-1,-((t-e.top)/e.height)*2+1),s=new Yp;s.setFromCamera(i,Fl);const a=new F;return s.ray.intersectPlane(Fm,a)?{x:a.x,z:a.z}:null}function Qb(n){if((n.key==="h"||n.key==="H"||n.key==="Home")&&Vd&&Vd(),n.key==="Escape"){if(Os||wn){vl();return}if(Fs){Gu();return}if(zi!=null){zi=null;return}if(hs!=null){hs=null;return}wi!=null&&(wi=null)}}function tT(n){if(n.preventDefault(),Os||wn){vl();return}if(Fs){Gu();return}if(zi!=null){zi=null;return}if(hs!=null){hs=null;return}if(wi!=null){wi=null;return}Ui?(Ui=null,Wr&&Wr(-1,-1,null)):ta&&ta(-1,-1)}function eT(){return Ie}function Ss(n){Ui=n}function nT(){return Ui}function iT(n){Wr=n}function sT(n){ta=n}function aT(n){Vd=n}function rT(n){Wd=n}function oT(n){Xd=n}function is(n){wi=n}function Tr(){return wi}function lT(n){qd=n}function bs(n){hs=n}function cT(n){Yd=n}function Om(n){zi=n}function dT(){return zi}function uT(n){$d=n}function hT(){return or}function fT(){return Fs}function pT(n){Zd=n}function mT(){return!Os||!wn||!Si?null:{x1:Math.min(wn.x,Si.x),y1:Math.min(wn.y,Si.y),x2:Math.max(wn.x,Si.x),y2:Math.max(wn.y,Si.y)}}const ln=[];let Hi=0;function Bm(){ln.length=0,Hi=0}function _T(){ln.length=0}function gT(){return ln}function Di(n,t,e,i){switch(i){case"explosion":Po(n,t,e,8,12,60,.4,.7,3);break;case"bigExplosion":Po(n,t,e,15,20,90,.5,1,5);break;case"hit":Po(n,t,e,3,5,40,.2,.4,2);break;case"muzzleFlash":xT(n,t,e,1,2,.08,.15,4);break;case"wallBreak":vT(n,t,e);break;case"wallHit":MT(n,t,e);break;case"wallRepair":yT(n,t,e);break;case"airStrike":ST(n,t,e);break;default:Po(n,t,e,4,6,50,.3,.5,2)}}function Po(n,t,e,i,s,a,r,o,c){const d=i+Math.floor(Math.random()*(s-i+1));for(let u=0;u<d;u++){const l=Math.random()*Math.PI*2,h=a*(.3+Math.random()*.7),f=r+Math.random()*(o-r);ln.push({id:Hi++,x:n,y:10+Math.random()*10,z:t,vx:Math.cos(l)*h,vy:20+Math.random()*40,vz:Math.sin(l)*h,color:e,life:f,maxLife:f,size:c*(.6+Math.random()*.4),type:"burst"})}}function xT(n,t,e,i,s,a,r,o){const c=i+Math.floor(Math.random()*(s-i+1));for(let d=0;d<c;d++){const u=a+Math.random()*(r-a);ln.push({id:Hi++,x:n+(Math.random()-.5)*4,y:12+Math.random()*6,z:t+(Math.random()-.5)*4,vx:0,vy:5,vz:0,color:e,life:u,maxLife:u,size:o*(.8+Math.random()*.4),type:"flash"})}}function vT(n,t,e){const i=8+Math.floor(Math.random()*5);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=40+Math.random()*50,o=.5+Math.random()*.3;ln.push({id:Hi++,x:n+(Math.random()-.5)*20,y:8+Math.random()*16,z:t+(Math.random()-.5)*20,vx:Math.cos(a)*r,vy:30+Math.random()*50,vz:Math.sin(a)*r,color:e,life:o,maxLife:o,size:3.5+Math.random()*2.5,type:"wallBreak",rotSpeed:(Math.random()-.5)*10})}}function MT(n,t,e){const i=2+Math.floor(Math.random()*2);for(let s=0;s<i;s++){const a=Math.random()*Math.PI*2,r=25+Math.random()*30,o=.15+Math.random()*.1;ln.push({id:Hi++,x:n+(Math.random()-.5)*8,y:10+Math.random()*10,z:t+(Math.random()-.5)*8,vx:Math.cos(a)*r,vy:15+Math.random()*25,vz:Math.sin(a)*r,color:e,life:o,maxLife:o,size:2+Math.random()*1.5,type:"wallHit"})}ln.push({id:Hi++,x:n,y:14,z:t,vx:0,vy:3,vz:0,color:16777215,life:.12,maxLife:.12,size:5,type:"flash"})}function yT(n,t,e){const i=6+Math.floor(Math.random()*3);for(let s=0;s<i;s++){const a=.3+Math.random()*.2;ln.push({id:Hi++,x:n+(Math.random()-.5)*24,y:Math.random()*8,z:t+(Math.random()-.5)*24,vx:(Math.random()-.5)*10,vy:40+Math.random()*30,vz:(Math.random()-.5)*10,color:e,life:a,maxLife:a,size:2.5+Math.random()*1.5,type:"wallRepair"})}}function ST(n,t,e){const i=25+Math.floor(Math.random()*10);for(let a=0;a<i;a++){const r=Math.random()*Math.PI*2,o=60+Math.random()*100,c=.6+Math.random()*.5;ln.push({id:Hi++,x:n+(Math.random()-.5)*30,y:5+Math.random()*20,z:t+(Math.random()-.5)*30,vx:Math.cos(r)*o,vy:50+Math.random()*80,vz:Math.sin(r)*o,color:16777215,life:c,maxLife:c,size:5+Math.random()*4,type:"burst"})}const s=30+Math.floor(Math.random()*15);for(let a=0;a<s;a++){const r=Math.random()*Math.PI*2,o=80+Math.random()*140,c=.8+Math.random()*.7;ln.push({id:Hi++,x:n+(Math.random()-.5)*60,y:10+Math.random()*30,z:t+(Math.random()-.5)*60,vx:Math.cos(r)*o,vy:30+Math.random()*60,vz:Math.sin(r)*o,color:e,life:c,maxLife:c,size:4+Math.random()*3,type:"wallBreak",rotSpeed:(Math.random()-.5)*12})}for(let a=0;a<5;a++)ln.push({id:Hi++,x:n+(Math.random()-.5)*10,y:5+a*15,z:t+(Math.random()-.5)*10,vx:0,vy:60+Math.random()*40,vz:0,color:16768324,life:.3+Math.random()*.2,maxLife:.5,size:8+Math.random()*4,type:"flash"})}function ET(n){let t=0;for(;t<ln.length;){const e=ln[t];if(e.life-=n,e.life<=0){ln[t]=ln[ln.length-1],ln.pop();continue}e.x+=e.vx*n,e.y+=e.vy*n,e.z+=e.vz*n,e.type==="burst"?e.vy-=60*n:e.type==="wallBreak"?e.vy-=120*n:e.type==="wallHit"&&(e.vy-=80*n),e.y<0&&(e.y=0,e.vy=0),t++}}let Pc=null;function wT(){return Pc||(Pc=new(window.AudioContext||window.webkitAudioContext)),Pc}function Kt(n,t,e,i,s,a=0){const r=n.createOscillator(),o=n.createGain();r.type=i,r.frequency.value=t;const c=n.currentTime+a;o.gain.setValueAtTime(s,c),o.gain.exponentialRampToValueAtTime(.001,c+e),r.connect(o),o.connect(n.destination),r.start(c),r.stop(c+e+.01)}function pi(n,t,e,i,s="lowpass"){const a=n.sampleRate,r=Math.floor(a*t),o=n.createBuffer(1,r,a),c=o.getChannelData(0);for(let l=0;l<r;l++)c[l]=Math.random()*2-1;const d=n.createBufferSource();d.buffer=o;const u=n.createGain();if(u.gain.setValueAtTime(e,n.currentTime),u.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),i){const l=n.createBiquadFilter();l.type=s,l.frequency.value=i,d.connect(l),l.connect(u)}else d.connect(u);u.connect(n.destination),d.start()}function Gt(n){const t=wT();switch(n){case"build":Kt(t,440,.1,"sine",.3),Kt(t,660,.1,"sine",.2,.1);break;case"build_generator":Kt(t,220,.15,"sine",.25),Kt(t,330,.12,"sine",.2,.1),Kt(t,440,.15,"triangle",.25,.2),Kt(t,660,.2,"sine",.15,.3);break;case"denied":Kt(t,200,.15,"sawtooth",.3);break;case"shoot":pi(t,.05,.4,2e3,"bandpass");break;case"explosion":pi(t,.3,.5,500,"lowpass");break;case"bigExplosion":pi(t,.5,.7,300,"lowpass");break;case"hit":pi(t,.04,.25,3e3,"bandpass");break;case"victory":Kt(t,523,.15,"sine",.3,0),Kt(t,659,.15,"sine",.3,.15),Kt(t,784,.15,"sine",.3,.3),Kt(t,1047,.25,"sine",.35,.45);break;case"defeat":Kt(t,440,.15,"sawtooth",.25,0),Kt(t,370,.15,"sawtooth",.25,.15),Kt(t,311,.2,"sawtooth",.25,.3),Kt(t,247,.35,"sawtooth",.3,.5);break;case"select":Kt(t,880,.06,"sine",.15);break;case"cancel":Kt(t,330,.08,"triangle",.15);break;case"shoot_pulse":Kt(t,880,.06,"sine",.6);break;case"upgrade":Kt(t,523,.1,"sine",.25,0),Kt(t,659,.1,"sine",.25,.1),Kt(t,784,.12,"sine",.3,.2);break;case"baseAlert":Kt(t,880,.08,"sawtooth",.4),Kt(t,440,.12,"sawtooth",.35,.08);break;case"shoot_heli":pi(t,.04,.3,4e3,"highpass"),Kt(t,1200,.03,"square",.15);break;case"heli_select":Kt(t,660,.06,"sine",.2),Kt(t,990,.08,"sine",.25,.06);break;case"heli_rally":Kt(t,1320,.1,"sine",.2),Kt(t,880,.06,"triangle",.15,.08);break;case"wall_build":pi(t,.08,.35,1200,"bandpass"),Kt(t,180,.1,"square",.2,.03),Kt(t,260,.06,"triangle",.15,.1);break;case"wall_repair":Kt(t,330,.1,"sine",.2),Kt(t,440,.1,"sine",.2,.08),Kt(t,550,.12,"triangle",.15,.16);break;case"wall_break":pi(t,.4,.5,400,"lowpass"),Kt(t,120,.15,"sawtooth",.3),Kt(t,80,.25,"square",.2,.1);break;case"airstrike_incoming":Kt(t,80,.8,"sawtooth",.15),Kt(t,120,.6,"sawtooth",.2,.3),Kt(t,180,.5,"sawtooth",.25,.6),pi(t,1.2,.2,600,"lowpass");break;case"airstrike_explosion":pi(t,1,.8,200,"lowpass"),Kt(t,40,.8,"sine",.5),Kt(t,60,.6,"sawtooth",.3,.05),pi(t,.5,.5,400,"lowpass"),Kt(t,30,1,"sine",.3,.1);break;case"airstrike_confirm":Kt(t,880,.08,"square",.3),Kt(t,660,.08,"square",.25,.1),Kt(t,440,.12,"square",.3,.2),pi(t,.15,.15,2e3,"bandpass");break}}let Xr=Ml,Kf=0,Ye=0,jd=!1,zm=null,Je=[],Ar=[],Ga=[];const bT=document.getElementById("menu-overlay"),TT=document.getElementById("pause-overlay"),AT=document.getElementById("victory-overlay"),RT=document.getElementById("defeat-overlay");function Bs(n){Xr=n,bT.classList.toggle("hidden",n!==Ml),TT.classList.toggle("hidden",n!==Dc),AT.classList.toggle("hidden",n!==np),RT.classList.toggle("hidden",n!==ip)}function ku(){Hm(),CT(),Bs(ka)}function Hm(){const n=Be();if(n){for(const t of Cn())Kr(t,n);for(const t of Oe())Du(t,n);for(const t of Hd())Sm(t,n)}Ye=0,jd=!1,qw(),Kw(),nb(),_T(),db(),Nb(),dg(),dm(),Je=[];for(const t of Ga)t.mesh&&n&&ym(t.mesh,n);Ar=[],Ga=[],Om(null),pn(),Pn(),is(null),ws(null),bs(null),Bm(),hE()}function CT(){const n=ul(bn,As,rs,nt);Br(n,Be());const t=ul(bn,oi,Ln,kt);Br(t,Be()),RE(Be()),ob(window._selectedDifficulty||"normal"),ub(window._selectedDifficulty||"normal"),zm=pE(),ns(),Ss(null)}function Jf(n,t,e){if(!e)return!1;const i=ie[e];if(!i)return!1;if(wr(nt)<i.cost||!ll(n,t,i.size,nt))return Gt("denied"),!1;if(!ss(nt,i.cost))return!1;const a=ul(e,n,t,nt);return Br(a,Be()),(e===Ce||e===ve||e===tn)&&_p(a.id,nt,e),Gt(e===ne?"wall_build":e===we?"build_generator":"build"),!0}function Qf(n,t){if(n<0||t<0){pn();return}const e=Cn();for(const i of e){if(!i.alive||i.team!==nt)continue;const s=ie[i.type];if(s&&n>=i.col&&n<i.col+s.size&&t>=i.row&&t<i.row+s.size){s.levels?(Um(i),Gt("select")):pn();return}}pn()}function PT(n){if(!n||!Jr(n))return;const t=Uu(n);if(!ss(nt,t)){Gt("denied");return}Nu(n),Gt("build")}function DT(n,t){if(!n||!Qr(n))return;const e=Er(n,t);if(!ss(nt,e)){Gt("denied");return}Fu(n,t),Gt("build")}function tp(n,t,e){if(n==="all")og(nt,t,e,Oe);else if(n==="selection")Sh(Je,t,e);else{const i=wl(Number(n),Oe);Sh(i,t,e)}ws(null),bs(null),Gt("heli_rally")}function ea(){for(let t=0;t<Je.length;t++)Je[t].selected=!1;const n=Oe();for(let t=0;t<n.length;t++)n[t].squadHighlight=!1;Je=[]}function IT(n){if(ea(),!(!n||!n.alive||n.team!==nt)&&(n.selected=!0,Je=[n],n.squadId!=null)){const t=wl(n.squadId,Oe);for(let i=0;i<t.length;i++)t[i].id!==n.id&&(t[i].squadHighlight=!0);const e=El(n.squadId);if(e){const s=Cn().find(a=>a.id===e.buildingId&&a.alive);s&&Um(s)}}}function LT(n,t,e,i){ea();const s=Math.min(n,e),a=Math.max(n,e),r=Math.min(t,i),o=Math.max(t,i),c=Oe(),d=[];for(let u=0;u<c.length;u++){const l=c[u];!l.alive||l.team!==nt||l.isAir||l.x>=s&&l.x<=a&&l.z>=r&&l.z<=o&&(l.selected=!0,d.push(l))}Je=d}function UT(n){ea();const t=wl(n,Oe);for(let e=0;e<t.length;e++)t[e].selected=!0;Je=t}function NT(n,t){const e=Oe();let i=null,s=v_;for(let a=0;a<e.length;a++){const r=e[a];if(!r.alive||r.team!==nt||r.isAir)continue;const o=Qt(n,t,r.x,r.z);o<s&&(s=o,i=r)}return i}function FT(n,t){const e=Cn();for(const i of e)if(i.alive&&i.type===ne&&i.col===n&&i.row===t)return i;return null}function OT(n,t){const e=ze(n-1,t)===Gn,i=ze(n+1,t)===Gn,s=ze(n,t-1)===Gn,a=ze(n,t+1)===Gn,r=e||i,o=s||a;return r&&!o?ra:o&&!r?Zo:i&&a&&!e&&!s?tu:e&&a&&!i&&!s?eu:i&&s&&!e&&!a?Jd:e&&s&&!i&&!a?Qd:r&&o?ra:null}function Gm(n){const t=new Set;for(const e of n){const i=`${e.col},${e.row}`;t.add(i);for(const[s,a]of[[-1,0],[1,0],[0,-1],[0,1]]){const r=e.col+s,o=e.row+a;ze(r,o)===Gn&&t.add(`${r},${o}`)}}for(const e of t){const[i,s]=e.split(",").map(Number),a=FT(i,s);if(!a)continue;const r=OT(i,s);r&&r!==a.orientation&&(Am(a,r),Tu(a,Be()))}}function km(n,t,e){Ar.push({team:n,targetX:t,targetZ:e,delayTimer:L_}),Gt("airstrike_confirm")}function BT(n,t,e){const i=Be(),s=n===nt?Hn+La:-La,a=n===nt?-La:Hn+La,r=t+(Math.random()-.5)*200,o=t-r,c=e-s,d=Math.sqrt(o*o+c*c),u=o/d,l=c/d,h=mw(n,i);h.position.set(r,nu,s),h.rotation.y=Math.atan2(u,l),Ga.push({team:n,targetX:t,targetZ:e,bomberX:r,bomberZ:s,exitZ:a,dirX:u,dirZ:l,mesh:h,impacted:!1}),Gt("airstrike_incoming")}function zT(n,t,e){const i=Oe(),s=Cn();for(let a=i.length-1;a>=0;a--){const r=i[a];if(!r.alive)continue;const o=Qt(r.x,r.z,t,e);if(o>vr)continue;let c;if(o<=ha)c=fa;else{const d=(o-ha)/(vr-ha);c=fa+(vh-fa)*d}if(r.hp-=c,r.hp<=0){if(r.isAir&&Tr()===r.id&&(is(null),Pn()),r.isSupport&&r._parentBuildingId!=null){const d=Cn().find(u=>u.id===r._parentBuildingId&&u.alive);d&&Dm(d)}gp(r),Im(r),Du(r,Be()),Di(r.x,r.z,r.team===nt?zt.CYAN:zt.RED,"explosion")}}for(let a=s.length-1;a>=0;a--){const r=s[a];if(!r.alive)continue;const o=Qt(r.x,r.z,t,e);if(o>vr)continue;let c;if(o<=ha)c=fa;else{const d=(o-ha)/(vr-ha);c=fa+(vh-fa)*d}if(r.hp-=c,r.hp<=0){const d=su(r.id);d&&Nc(d.id,Oe),zu(r),Kr(r,Be()),r.type===ne?Di(r.x,r.z,r.team===nt?zt.CYAN:zt.RED,"wallBreak"):Di(r.x,r.z,r.team===nt?zt.CYAN:zt.RED,"bigExplosion"),_l()===r&&pn()}}}function HT(n){for(let t=Ar.length-1;t>=0;t--){const e=Ar[t];e.delayTimer-=n,e.delayTimer<=0&&(BT(e.team,e.targetX,e.targetZ),Ar.splice(t,1))}for(let t=Ga.length-1;t>=0;t--){const e=Ga[t],i=xh*n;if(e.bomberX+=e.dirX*i,e.bomberZ+=e.dirZ*i,e.mesh&&(e.mesh.position.x=e.bomberX,e.mesh.position.z=e.bomberZ,e.mesh.position.y=nu+Math.sin(Date.now()*.002)*3),!e.impacted&&Qt(e.bomberX,e.bomberZ,e.targetX,e.targetZ)<xh*n*2){e.impacted=!0;const o=e.team===nt?zt.CYAN:zt.RED;zT(e.team,e.targetX,e.targetZ),Di(e.targetX,e.targetZ,o,"airStrike"),Lw(e.targetX,e.targetZ,o,vr/10),Gt("airstrike_explosion")}const s=e.team===nt&&e.bomberZ<-La,a=e.team===kt&&e.bomberZ>Hn+La;(s||a)&&(e.mesh&&ym(e.mesh,Be()),Ga.splice(t,1))}}function Vm(n){requestAnimationFrame(Vm);const t=n/1e3,e=Math.min(t-Kf,.05);Kf=t;const i=il();if(i&&i.update(),Xr===ka){Ye+=e,iE(e),lb(e,{getBuildings:Cn}),hb(e,Ye,{getEnergy:()=>wr(kt),spendEnergy:x=>ss(kt,x),getBuildings:Cn,getUnits:Oe,createBuilding:(x,S,I)=>{const C=ul(x,S,I,kt);return Br(C,Be()),(x===Ce||x===ve||x===tn)&&_p(C.id,kt,x),x===ne&&Gm([{col:S,row:I}]),C},isBuildable:(x,S,I)=>ll(x,S,I,kt),findPath:zo,canUpgradeTurret:Nw,startTurretUpgrade:Ow,canBranchTurret:Fw,startTurretBranch:Bw,canUpgradeBuilding:Jr,canBranchBuilding:Qr,startUpgrade:Nu,startBranch:Fu,getUpgradeCost:Uu,getBranchCost:Er,getIncomeBreakdown:()=>Wf(kt),setHelicopterRally:Od,canRepairWall:zw,startWallRepair:Gw,getRepairCost:Hw,canRepairBuilding:Hr,getRepairCostForBuilding:Gr,startBuildingRepair:hl,canAirStrike:x=>fl(x,Ye),initiateAirStrike:(x,S,I)=>km(x,S,I),markAirStrikeUsed:x=>Rm(x,Ye),getMatchTime:()=>Ye,getSquads:x=>Eh(x),getUnitsBySquad:x=>wl(x,Oe),setUnitStance:Yr,setUnitTargetPriority:au,setUnitsStance:xp,setUnitsTargetPriority:vp,canSpawnMedic:x=>Ou(x,Ye),canSpawnEngineer:x=>Bu(x,Ye),spawnSupportUnit:(x,S)=>{const I=S.team===nt?-40:40,C=pl(x,S.x,S.z+I,S.team);return C._parentBuildingId=S.id,dl(C,Be()),x===Wa?Cm(S,Ye,C.id):x===Xa&&Pm(S,Ye,C.id),C}}),vb(Ye,{getUnits:Oe});const u=Xw(e,Ye,{createUnit:(x,S,I,C,U,L)=>{const k=pl(x,S,I,C,U);return dl(k,Be()),L!=null&&ng(k,L),C===kt&&Sb(k),k},findPath:zo});for(const x of u)x._justRepaired?(Di(x.x,x.z,x.team===nt?zt.CYAN:zt.RED,"wallRepair"),Gt("wall_repair"),x._justRepaired=!1):(Tu(x,Be()),Gt("upgrade"));ib(e,{getUnits:Oe,getBuildings:Cn,getProjectiles:Hd,getFirePoint:x=>PE(x),createProjectile:(x,S,I,C,U,L,k)=>{const B=Jw(x,S,I,C,U,L,k);return B&&zf(B,Be()),B},createHomingProjectile:(x,S,I,C,U,L,k,B,V,H,et)=>{const tt=Qw(x,S,I,C,U,L,k,B,V,H,et);return tt&&zf(tt,Be()),Gt("shoot_pulse"),tt},removeUnit:x=>{if(x.isAir&&Tr()===x.id&&(is(null),Pn()),x.isSupport&&x._parentBuildingId!=null){const S=Cn().find(I=>I.id===x._parentBuildingId&&I.alive);S&&Dm(S)}gp(x),Im(x),Du(x,Be()),Di(x.x,x.z,x.team===nt?zt.CYAN:zt.RED,"explosion"),Gt("explosion")},removeBuilding:x=>{const S=su(x.id);S&&Nc(S.id,Oe),zu(x),Kr(x,Be()),x.type===ne?(Di(x.x,x.z,x.team===nt?zt.CYAN:zt.RED,"wallBreak"),Gt("wall_break")):(Di(x.x,x.z,x.team===nt?zt.CYAN:zt.RED,"bigExplosion"),Gt("bigExplosion")),_l()===x&&pn()},spawnParticle:Di}),Yw(e,{findPath:zo,findPathThroughWalls:rE,getBuildings:Cn,getUnits:Oe,combatUnitHash:sb(),combatBuildingHash:ab()});const l=tb(e);for(const x of l)Sm(x,Be());ET(e),HT(e);const h=Cn(),f=h.find(x=>x.type===bn&&x.team===nt),_=h.find(x=>x.type===bn&&x.team===kt);!_||_.hp<=0?(Bs(np),Gt("victory")):(!f||f.hp<=0)&&(Bs(ip),Gt("defeat"));let g=!1;if(f&&f.alive){const x=Oe();for(let S=0;S<x.length;S++){const I=x[S];if(I.alive&&I.team===kt&&Qt(I.x,I.z,f.x,f.z)<Ic){g=!0;break}}}g&&!jd&&Gt("baseAlert"),jd=g,Ye%1<e&&cg(Oe),Je=Je.filter(x=>x.alive);for(let x=0;x<Je.length;x++)Je[x].alive||(Je[x].selected=!1);const p=Eh(nt),m=Cn(),v=[];for(let x=0;x<p.length;x++){const S=p[x],I=m.find(C=>C.id===S.buildingId);if(!I||!I.alive){Nc(S.id,Oe);continue}v.push({id:S.id,buildingId:S.buildingId,label:S.label,buildingType:S.buildingType,spawnStance:S.spawnStance,spawnTargetPriority:S.spawnTargetPriority,unitCount:lg(S,Oe),buildingAlive:!0,rallyX:S.rallyX,rallyZ:S.rallyZ})}const M=Lb(),y=Eu(),T=il();let w=null;if(y&&T){const x=y.position.distanceTo(T.target),S=y.fov*Math.PI/180,I=2*Math.tan(S/2)*x;w={x:T.target.x,z:T.target.z,viewWidth:I*y.aspect,viewHeight:I}}const A=Tr();A&&Bd().find(S=>S.id===A),Ob({energy:wr(nt),enemyEnergy:wr(kt),incomeBreakdown:Wf(nt),buildings:h,units:Oe(),matchTime:Ye,dt:e,baseUnderAttack:g,rallyActive:M.rallyActive,rallyHoldingCount:M.holdingCount,rallyPushSize:M.pushSize,rallyTimeRemaining:M.timeRemaining,obstacles:zm,cameraInfo:w,squads:v,selectedUnitCount:Je.length,selectionBoxScreen:mT(),airStrikePending:dT()!=null})}const s=Cn(),a=Oe(),r=Hd();XE(t,s),rw(t,a,Tr()),Tw(t,r),Dw(t,gT()),Uw(t);const o=eT();let c=null;if(o&&Xr===ka){const u=nT();if(u){const l=ie[u];c={col:o.col,row:o.row,size:l?l.size:1}}}CE(t,c,fT()?hT():null);const d=tE();d&&d.render()}document.getElementById("btn-start").addEventListener("click",ku);document.getElementById("btn-resume").addEventListener("click",()=>Bs(ka));document.getElementById("btn-quit").addEventListener("click",()=>{Hm(),Bs(Ml)});document.getElementById("btn-restart-win").addEventListener("click",ku);document.getElementById("btn-restart-lose").addEventListener("click",ku);document.addEventListener("keydown",n=>{n.key==="Escape"&&(Xr===ka?Bs(Dc):Xr===Dc&&Bs(ka))});function GT(){const n=document.getElementById("render-target");J1(n),$b(eE(),Eu(),il()),lE((e,i,s,a)=>{const r=e*Z+Z*s/2,o=i*Z+Z*s/2,c=ch*ch;for(const d of Oe()){if(d.team!==a||d.isAir)continue;const u=d.x-r,l=d.z-o;if(u*u+l*l<=c)return!0}return!1}),iT((e,i,s)=>{if(e<0||!s){ns(),Ss(null);return}Jf(e,i,s)?(ns(),Ss(null)):(Qf(e,i),_l()&&(ns(),Ss(null)))}),sT((e,i,s,a)=>{if(e===-2&&i===-2){const r=Tr();if(r){const c=Bd().find(d=>d.id===r);c&&(ea(),pn(),Bb(c),Gt("heli_select"))}return}if(Pn(),is(null),Qf(e,i),_l()){ea();return}if(s!=null&&a!=null){const r=NT(s,a);if(r){IT(r),Gt("select");return}}ea(),pn()}),pT((e,i,s,a)=>{Pn(),is(null),pn(),LT(e,i,s,a),Je.length>0&&Gt("select")}),rT((e,i,s)=>{Od(e,i,s),Pn(),Gt("heli_rally")}),oT(()=>Bd()),lT((e,i,s)=>{tp(e,i,s)}),cT((e,i,s)=>{const r=Cn().find(o=>o.id===e&&o.alive);if(!r||!fl(r,Ye)){Gt("denied");return}if(!ss(nt,$a)){Gt("denied");return}Rm(r,Ye),km(nt,i,s)}),uT(e=>{const i=[];for(const s of e)Jf(s.col,s.row,ne)&&i.push(s);i.length>0&&Gm(i)}),Fb(document.getElementById("sidebar"),{onBuildSelect:e=>{pn(),Ss(e),ws(null),bs(null),Gt(e?"select":"cancel")},onBuildingUpgrade:e=>{PT(e)},onBuildingBranch:(e,i)=>{DT(e,i)},onPushNow:()=>{Ub(),Gt("select")},onMinimapClick:(e,i)=>{ep(e,i)},onHelicopterRally:(e,i,s)=>{Od(e,i,s),Gt("heli_rally")},onHeliDeselect:()=>{is(null),Pn()},onSpawnStanceChange:(e,i)=>{ig(Number(e),i),Gt("select")},onSpawnTargetChange:(e,i)=>{sg(Number(e),i),Gt("select")},onSelectionStance:e=>{Je.length>0&&xp(Je,e),ws(null),bs(null),Gt("select")},onSelectionTarget:e=>{Je.length>0&&vp(Je,e),Gt("select")},onSelectionDeselect:()=>{ea()},onSelectionRallyClick:()=>{ws("selection"),bs("selection"),ns(),Ss(null),is(null),Pn(),Gt("select")},onSquadCardClick:e=>{UT(Number(e)),Gt("select")},onGlobalStance:e=>{ag(nt,e,Oe),ws(null),bs(null),Gt("select")},onGlobalTarget:e=>{rg(nt,e,Oe),Gt("select")},onGlobalRallyClick:()=>{ws("all"),bs("all"),ns(),Ss(null),is(null),Pn(),Gt("select")},onRallySet:(e,i,s)=>{tp(e,i,s)},onAirStrike:e=>{if(!(!e||!fl(e,Ye))){if(wr(nt)<$a){Gt("denied");return}Om(e.id),Hb(),ns(),Ss(null),is(null),Pn(),ws(null),bs(null),Gt("airstrike_confirm")}},onSpawnMedic:e=>{if(!e||!Ou(e,Ye))return;if(!ss(nt,Pr)){Gt("denied");return}const i=e.team===nt?-40:40,s=pl(Wa,e.x,e.z+i,e.team);s._parentBuildingId=e.id,dl(s,Be()),Cm(e,Ye,s.id),Gt("select")},onSpawnEngineer:e=>{if(!e||!Bu(e,Ye))return;if(!ss(nt,Dr)){Gt("denied");return}const i=e.team===nt?-40:40,s=pl(Xa,e.x,e.z+i,e.team);s._parentBuildingId=e.id,dl(s,Be()),Pm(e,Ye,s.id),Gt("select")},onWallRepair:e=>{if(!e||!Hr(e))return;const i=Gr(e);if(!ss(nt,i)){Gt("denied");return}hl(e),Gt("wall_repair")},onBuildingRepair:e=>{if(!e||!Hr(e))return;const i=Gr(e);if(!ss(nt,i)){Gt("denied");return}hl(e),Gt("wall_repair")},onWallDemolish:e=>{if(!e||e.type!==ne||!e.alive)return;const i=kw(e);i>0&&cb(nt,i),Kr(e,Be()),Di(e.x,e.z,zt.CYAN,"wallBreak"),Gt("wall_break"),pn()},onWallOrient:(e,i)=>{!e||e.type!==ne||!e.alive||(Am(e,i),Tu(e,Be()),Gt("select"))}}),Pw(Be()),Iw(Be()),Bm();const t=fn(As,rs,Z);aT(()=>{ep(t.x,t.z)}),Bs(Ml),requestAnimationFrame(Vm)}function ep(n,t){const e=Eu(),i=il();if(!e||!i)return;const s=n-i.target.x,a=t-i.target.z;i.target.x=n,i.target.z=t,e.position.x+=s,e.position.z+=a}GT();
