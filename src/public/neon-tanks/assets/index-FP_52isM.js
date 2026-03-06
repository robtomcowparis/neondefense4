(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jl="160",wm=0,Ru=1,Em=2,gh=1,Tm=2,ii=3,Fi=0,cn=1,On=2,ui=0,us=1,va=2,Cu=3,Pu=4,Am=5,ts=100,Rm=101,Cm=102,Lu=103,Du=104,Pm=200,Lm=201,Dm=202,Im=203,rl=204,al=205,Um=206,Nm=207,zm=208,Om=209,Fm=210,Bm=211,km=212,Hm=213,Vm=214,Gm=0,Wm=1,Xm=2,Ma=3,qm=4,Ym=5,jm=6,$m=7,_h=0,Km=1,Zm=2,zi=0,Jm=1,Qm=2,e0=3,xh=4,t0=5,n0=6,vh=300,co=301,lo=302,cl=303,ll=304,$a=306,ul=1e3,Fn=1001,dl=1002,nn=1003,Iu=1004,uc=1005,Tn=1006,i0=1007,Qo=1008,Oi=1009,s0=1010,o0=1011,Ql=1012,Mh=1013,Li=1014,Di=1015,di=1016,yh=1017,bh=1018,ds=1020,r0=1021,Bn=1023,a0=1024,c0=1025,fs=1026,uo=1027,l0=1028,Sh=1029,u0=1030,wh=1031,Eh=1033,dc=33776,fc=33777,hc=33778,pc=33779,Uu=35840,Nu=35841,zu=35842,Ou=35843,Th=36196,Fu=37492,Bu=37496,ku=37808,Hu=37809,Vu=37810,Gu=37811,Wu=37812,Xu=37813,qu=37814,Yu=37815,ju=37816,$u=37817,Ku=37818,Zu=37819,Ju=37820,Qu=37821,mc=36492,ed=36494,td=36495,d0=36283,nd=36284,id=36285,sd=36286,Ah=3e3,hs=3001,f0=3200,h0=3201,Rh=0,p0=1,Pn="",kt="srgb",hi="srgb-linear",eu="display-p3",Ka="display-p3-linear",ya="linear",ct="srgb",ba="rec709",Sa="p3",bs=7680,od=519,m0=512,g0=513,_0=514,Ch=515,x0=516,v0=517,M0=518,y0=519,rd=35044,ad="300 es",fl=1035,ci=2e3,wa=2001;class _o{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const o=s.indexOf(t);o!==-1&&s.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let o=0,a=s.length;o<a;o++)s[o].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cd=1234567;const Qs=Math.PI/180,er=180/Math.PI;function xo(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function sn(n,e,t){return Math.max(e,Math.min(t,n))}function tu(n,e){return(n%e+e)%e}function b0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function S0(n,e,t){return n!==e?(t-n)/(e-n):0}function ko(n,e,t){return(1-t)*n+t*e}function w0(n,e,t,i){return ko(n,e,1-Math.exp(-t*i))}function E0(n,e=1){return e-Math.abs(tu(n,e*2)-e)}function T0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function A0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function R0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function C0(n,e){return n+Math.random()*(e-n)}function P0(n){return n*(.5-Math.random())}function L0(n){n!==void 0&&(cd=n);let e=cd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function D0(n){return n*Qs}function I0(n){return n*er}function hl(n){return(n&n-1)===0&&n!==0}function U0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ea(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function N0(n,e,t,i,s){const o=Math.cos,a=Math.sin,r=o(t/2),c=a(t/2),l=o((e+i)/2),u=a((e+i)/2),d=o((e-i)/2),f=a((e-i)/2),p=o((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(r*u,c*d,c*f,r*l);break;case"YZY":n.set(c*f,r*u,c*d,r*l);break;case"ZXZ":n.set(c*d,c*f,r*u,r*l);break;case"XZX":n.set(r*u,c*g,c*p,r*l);break;case"YXY":n.set(c*p,r*u,c*g,r*l);break;case"ZYZ":n.set(c*g,c*p,r*u,r*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Jt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const wi={DEG2RAD:Qs,RAD2DEG:er,generateUUID:xo,clamp:sn,euclideanModulo:tu,mapLinear:b0,inverseLerp:S0,lerp:ko,damp:w0,pingpong:E0,smoothstep:T0,smootherstep:A0,randInt:R0,randFloat:C0,randFloatSpread:P0,seededRandom:L0,degToRad:D0,radToDeg:I0,isPowerOfTwo:hl,ceilPowerOfTwo:U0,floorPowerOfTwo:Ea,setQuaternionFromProperEuler:N0,normalize:Jt,denormalize:Bs};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(sn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*i-a*s+e.x,this.y=o*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,i,s,o,a,r,c,l){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,o,a,r,c,l)}set(e,t,i,s,o,a,r,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=r,u[3]=t,u[4]=o,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,o=this.elements,a=i[0],r=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],_=s[0],m=s[3],h=s[6],v=s[1],x=s[4],M=s[7],b=s[2],y=s[5],w=s[8];return o[0]=a*_+r*v+c*b,o[3]=a*m+r*x+c*y,o[6]=a*h+r*M+c*w,o[1]=l*_+u*v+d*b,o[4]=l*m+u*x+d*y,o[7]=l*h+u*M+d*w,o[2]=f*_+p*v+g*b,o[5]=f*m+p*x+g*y,o[8]=f*h+p*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],o=e[3],a=e[4],r=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*r*l-i*o*u+i*r*c+s*o*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],o=e[3],a=e[4],r=e[5],c=e[6],l=e[7],u=e[8],d=u*a-r*l,f=r*c-u*o,p=l*o-a*c,g=t*d+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*l-u*i)*_,e[2]=(r*i-s*a)*_,e[3]=f*_,e[4]=(u*t-s*c)*_,e[5]=(s*o-r*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*o)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,o,a,r){const c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*a+l*r)+a+e,-s*l,s*c,-s*(-l*a+c*r)+r+t,0,0,1),this}scale(e,t){return this.premultiply(gc.makeScale(e,t)),this}rotate(e){return this.premultiply(gc.makeRotation(-e)),this}translate(e,t){return this.premultiply(gc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gc=new Xe;function Ph(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ta(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function z0(){const n=Ta("canvas");return n.style.display="block",n}const ld={};function Ho(n){n in ld||(ld[n]=!0,console.warn(n))}const ud=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),dd=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),hr={[hi]:{transfer:ya,primaries:ba,toReference:n=>n,fromReference:n=>n},[kt]:{transfer:ct,primaries:ba,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ka]:{transfer:ya,primaries:Sa,toReference:n=>n.applyMatrix3(dd),fromReference:n=>n.applyMatrix3(ud)},[eu]:{transfer:ct,primaries:Sa,toReference:n=>n.convertSRGBToLinear().applyMatrix3(dd),fromReference:n=>n.applyMatrix3(ud).convertLinearToSRGB()}},O0=new Set([hi,Ka]),Qe={enabled:!0,_workingColorSpace:hi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!O0.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=hr[e].toReference,s=hr[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return hr[n].primaries},getTransfer:function(n){return n===Pn?ya:hr[n].transfer}};function eo(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function _c(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ss;class Lh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ss===void 0&&(Ss=Ta("canvas")),Ss.width=e.width,Ss.height=e.height;const i=Ss.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ss}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ta("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),o=s.data;for(let a=0;a<o.length;a++)o[a]=eo(o[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(eo(t[i]/255)*255):t[i]=eo(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let F0=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=xo(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let a=0,r=s.length;a<r;a++)s[a].isDataTexture?o.push(xc(s[a].image)):o.push(xc(s[a]))}else o=xc(s);i.url=o}return t||(e.images[this.uuid]=i),i}}function xc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Lh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let B0=0;class vn extends _o{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,i=Fn,s=Fn,o=Tn,a=Qo,r=Bn,c=Oi,l=vn.DEFAULT_ANISOTROPY,u=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=xo(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=l,this.format=r,this.internalFormat=null,this.type=c,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ho("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===hs?kt:Pn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ul:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case dl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ul:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case dl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ho("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===kt?hs:Ah}set encoding(e){Ho("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===hs?kt:Pn}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=vh;vn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,i=0,s=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*o,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*o,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*o,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,o;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,M=(p+1)/2,b=(h+1)/2,y=(u+f)/4,w=(d+_)/4,P=(g+m)/4;return x>M&&x>b?x<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(x),s=y/i,o=w/i):M>b?M<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(M),i=y/s,o=P/s):b<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(b),i=w/o,s=P/o),this.set(i,s,o,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-_)/v,this.z=(f-u)/v,this.w=Math.acos((l+p+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class k0 extends _o{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Ho("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===hs?kt:Pn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new vn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Dh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends k0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ih extends vn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class H0 extends vn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,o,a,r){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3];const f=o[a+0],p=o[a+1],g=o[a+2],_=o[a+3];if(r===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(r===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==f||l!==p||u!==g){let m=1-r;const h=c*f+l*p+u*g+d*_,v=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const b=Math.sqrt(x),y=Math.atan2(b,h*v);m=Math.sin(m*y)/b,r=Math.sin(r*y)/b}const M=r*v;if(c=c*m+f*M,l=l*m+p*M,u=u*m+g*M,d=d*m+_*M,m===1-r){const b=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=b,l*=b,u*=b,d*=b}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,o,a){const r=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=o[a],f=o[a+1],p=o[a+2],g=o[a+3];return e[t]=r*g+u*d+c*p-l*f,e[t+1]=c*g+u*f+l*d-r*p,e[t+2]=l*g+u*p+r*f-c*d,e[t+3]=u*g-r*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,o=e._z,a=e._order,r=Math.cos,c=Math.sin,l=r(i/2),u=r(s/2),d=r(o/2),f=c(i/2),p=c(s/2),g=c(o/2);switch(a){case"XYZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d+f*p*g;break;case"YZX":this._x=f*u*d+l*p*g,this._y=l*p*d+f*u*g,this._z=l*u*g-f*p*d,this._w=l*u*d-f*p*g;break;case"XZY":this._x=f*u*d-l*p*g,this._y=l*p*d-f*u*g,this._z=l*u*g+f*p*d,this._w=l*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],o=t[8],a=t[1],r=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+r+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(o-l)*p,this._z=(a-s)*p}else if(i>r&&i>d){const p=2*Math.sqrt(1+i-r-d);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(o+l)/p}else if(r>d){const p=2*Math.sqrt(1+r-i-d);this._w=(o-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-r);this._w=(a-s)/p,this._x=(o+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(sn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,o=e._z,a=e._w,r=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*r+s*l-o*c,this._y=s*u+a*c+o*r-i*l,this._z=o*u+a*l+i*c-s*r,this._w=a*u-i*r-s*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,o=this._z,a=this._w;let r=a*e._w+i*e._x+s*e._y+o*e._z;if(r<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,r=-r):this.copy(e),r>=1)return this._w=a,this._x=i,this._y=s,this._z=o,this;const c=1-r*r;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*o+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,r),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*d+this._w*f,this._x=i*d+this._x*f,this._y=s*d+this._y*f,this._z=o*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(o),i*Math.cos(o),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*s,this.y=o[1]*t+o[4]*i+o[7]*s,this.z=o[2]*t+o[5]*i+o[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,o=e.elements,a=1/(o[3]*t+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*s+o[12])*a,this.y=(o[1]*t+o[5]*i+o[9]*s+o[13])*a,this.z=(o[2]*t+o[6]*i+o[10]*s+o[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,o=e.x,a=e.y,r=e.z,c=e.w,l=2*(a*s-r*i),u=2*(r*t-o*s),d=2*(o*i-a*t);return this.x=t+c*l+a*d-r*u,this.y=i+c*u+r*l-o*d,this.z=s+c*d+o*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s,this.y=o[1]*t+o[5]*i+o[9]*s,this.z=o[2]*t+o[6]*i+o[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,o=e.z,a=t.x,r=t.y,c=t.z;return this.x=s*c-o*r,this.y=o*a-i*c,this.z=i*r-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vc.copy(this).projectOnVector(e),this.sub(vc)}reflect(e){return this.sub(vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(sn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vc=new U,fd=new sr;class or{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let a=0,r=o.count;a<r;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(o,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pr.copy(i.boundingBox)),pr.applyMatrix4(e.matrixWorld),this.union(pr)}const s=e.children;for(let o=0,a=s.length;o<a;o++)this.expandByObject(s[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Eo),mr.subVectors(this.max,Eo),ws.subVectors(e.a,Eo),Es.subVectors(e.b,Eo),Ts.subVectors(e.c,Eo),pi.subVectors(Es,ws),mi.subVectors(Ts,Es),qi.subVectors(ws,Ts);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-qi.z,qi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,qi.z,0,-qi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-qi.y,qi.x,0];return!Mc(t,ws,Es,Ts,mr)||(t=[1,0,0,0,1,0,0,0,1],!Mc(t,ws,Es,Ts,mr))?!1:(gr.crossVectors(pi,mi),t=[gr.x,gr.y,gr.z],Mc(t,ws,Es,Ts,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Jn=[new U,new U,new U,new U,new U,new U,new U,new U],Ln=new U,pr=new or,ws=new U,Es=new U,Ts=new U,pi=new U,mi=new U,qi=new U,Eo=new U,mr=new U,gr=new U,Yi=new U;function Mc(n,e,t,i,s){for(let o=0,a=n.length-3;o<=a;o+=3){Yi.fromArray(n,o);const r=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),c=e.dot(Yi),l=t.dot(Yi),u=i.dot(Yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>r)return!1}return!0}const V0=new or,To=new U,yc=new U;class rr{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):V0.setFromPoints(e).getCenter(i);let s=0;for(let o=0,a=e.length;o<a;o++)s=Math.max(s,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;To.subVectors(e,this.center);const t=To.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(To,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(To.copy(e.center).add(yc)),this.expandByPoint(To.copy(e.center).sub(yc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new U,bc=new U,_r=new U,gi=new U,Sc=new U,xr=new U,wc=new U;class Za{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){bc.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(bc);const o=e.distanceTo(t)*.5,a=-this.direction.dot(_r),r=gi.dot(this.direction),c=-gi.dot(_r),l=gi.lengthSq(),u=Math.abs(1-a*a);let d,f,p,g;if(u>0)if(d=a*c-r,f=a*r-c,g=o*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,p=d*(d+a*f+2*r)+f*(a*d+f+2*c)+l}else f=o,d=Math.max(0,-(a*f+r)),p=-d*d+f*(f+2*c)+l;else f=-o,d=Math.max(0,-(a*f+r)),p=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*o+r)),f=d>0?-o:Math.min(Math.max(-o,-c),o),p=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-o,-c),o),p=f*(f+2*c)+l):(d=Math.max(0,-(a*o+r)),f=d>0?o:Math.min(Math.max(-o,-c),o),p=-d*d+f*(f+2*c)+l);else f=a>0?-o:o,d=Math.max(0,-(a*f+r)),p=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(bc).addScaledVector(_r,f),p}intersectSphere(e,t){Qn.subVectors(e.center,this.origin);const i=Qn.dot(this.direction),s=Qn.dot(Qn)-i*i,o=e.radius*e.radius;if(s>o)return null;const a=Math.sqrt(o-s),r=i-a,c=i+a;return c<0?null:r<0?this.at(c,t):this.at(r,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,o,a,r,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(o=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||o>s||((o>i||isNaN(i))&&(i=o),(a<s||isNaN(s))&&(s=a),d>=0?(r=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(r=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||r>s)||((r>i||i!==i)&&(i=r),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,i,s,o){Sc.subVectors(t,e),xr.subVectors(i,e),wc.crossVectors(Sc,xr);let a=this.direction.dot(wc),r;if(a>0){if(s)return null;r=1}else if(a<0)r=-1,a=-a;else return null;gi.subVectors(this.origin,e);const c=r*this.direction.dot(xr.crossVectors(gi,xr));if(c<0)return null;const l=r*this.direction.dot(Sc.cross(gi));if(l<0||c+l>a)return null;const u=-r*gi.dot(wc);return u<0?null:this.at(u/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,t,i,s,o,a,r,c,l,u,d,f,p,g,_,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,o,a,r,c,l,u,d,f,p,g,_,m)}set(e,t,i,s,o,a,r,c,l,u,d,f,p,g,_,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=s,h[1]=o,h[5]=a,h[9]=r,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),o=1/As.setFromMatrixColumn(e,1).length(),a=1/As.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,o=e.z,a=Math.cos(i),r=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){const f=a*u,p=a*d,g=r*u,_=r*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=f-_*l,t[9]=-r*c,t[2]=_-f*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,p=c*d,g=l*u,_=l*d;t[0]=f+_*r,t[4]=g*r-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-r,t[2]=p*r-g,t[6]=_+f*r,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,p=c*d,g=l*u,_=l*d;t[0]=f-_*r,t[4]=-a*d,t[8]=g+p*r,t[1]=p+g*r,t[5]=a*u,t[9]=_-f*r,t[2]=-a*l,t[6]=r,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,p=a*d,g=r*u,_=r*d;t[0]=c*u,t[4]=g*l-p,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=p*l-g,t[2]=-l,t[6]=r*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,p=a*l,g=r*c,_=r*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+p,t[1]=d,t[5]=a*u,t[9]=-r*u,t[2]=-l*u,t[6]=p*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=a*c,p=a*l,g=r*c,_=r*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=a*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=r*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G0,e,W0)}lookAt(e,t,i){const s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),_i.crossVectors(i,hn),_i.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),_i.crossVectors(i,hn)),_i.normalize(),vr.crossVectors(hn,_i),s[0]=_i.x,s[4]=vr.x,s[8]=hn.x,s[1]=_i.y,s[5]=vr.y,s[9]=hn.y,s[2]=_i.z,s[6]=vr.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,o=this.elements,a=i[0],r=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],h=i[14],v=i[3],x=i[7],M=i[11],b=i[15],y=s[0],w=s[4],P=s[8],S=s[12],T=s[1],N=s[5],F=s[9],$=s[13],D=s[2],B=s[6],X=s[10],k=s[14],z=s[3],j=s[7],K=s[11],te=s[15];return o[0]=a*y+r*T+c*D+l*z,o[4]=a*w+r*N+c*B+l*j,o[8]=a*P+r*F+c*X+l*K,o[12]=a*S+r*$+c*k+l*te,o[1]=u*y+d*T+f*D+p*z,o[5]=u*w+d*N+f*B+p*j,o[9]=u*P+d*F+f*X+p*K,o[13]=u*S+d*$+f*k+p*te,o[2]=g*y+_*T+m*D+h*z,o[6]=g*w+_*N+m*B+h*j,o[10]=g*P+_*F+m*X+h*K,o[14]=g*S+_*$+m*k+h*te,o[3]=v*y+x*T+M*D+b*z,o[7]=v*w+x*N+M*B+b*j,o[11]=v*P+x*F+M*X+b*K,o[15]=v*S+x*$+M*k+b*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],o=e[12],a=e[1],r=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],h=e[15];return g*(+o*c*d-s*l*d-o*r*f+i*l*f+s*r*p-i*c*p)+_*(+t*c*p-t*l*f+o*a*f-s*a*p+s*l*u-o*c*u)+m*(+t*l*d-t*r*p-o*a*d+i*a*p+o*r*u-i*l*u)+h*(-s*r*u-t*c*d+t*r*f+s*a*d-i*a*f+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],o=e[3],a=e[4],r=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],h=e[15],v=d*m*l-_*f*l+_*c*p-r*m*p-d*c*h+r*f*h,x=g*f*l-u*m*l-g*c*p+a*m*p+u*c*h-a*f*h,M=u*_*l-g*d*l+g*r*p-a*_*p-u*r*h+a*d*h,b=g*d*c-u*_*c-g*r*f+a*_*f+u*r*m-a*d*m,y=t*v+i*x+s*M+o*b;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/y;return e[0]=v*w,e[1]=(_*f*o-d*m*o-_*s*p+i*m*p+d*s*h-i*f*h)*w,e[2]=(r*m*o-_*c*o+_*s*l-i*m*l-r*s*h+i*c*h)*w,e[3]=(d*c*o-r*f*o-d*s*l+i*f*l+r*s*p-i*c*p)*w,e[4]=x*w,e[5]=(u*m*o-g*f*o+g*s*p-t*m*p-u*s*h+t*f*h)*w,e[6]=(g*c*o-a*m*o-g*s*l+t*m*l+a*s*h-t*c*h)*w,e[7]=(a*f*o-u*c*o+u*s*l-t*f*l-a*s*p+t*c*p)*w,e[8]=M*w,e[9]=(g*d*o-u*_*o-g*i*p+t*_*p+u*i*h-t*d*h)*w,e[10]=(a*_*o-g*r*o+g*i*l-t*_*l-a*i*h+t*r*h)*w,e[11]=(u*r*o-a*d*o-u*i*l+t*d*l+a*i*p-t*r*p)*w,e[12]=b*w,e[13]=(u*_*s-g*d*s+g*i*f-t*_*f-u*i*m+t*d*m)*w,e[14]=(g*r*s-a*_*s-g*i*c+t*_*c+a*i*m-t*r*m)*w,e[15]=(a*d*s-u*r*s+u*i*c-t*d*c-a*i*f+t*r*f)*w,this}scale(e){const t=this.elements,i=e.x,s=e.y,o=e.z;return t[0]*=i,t[4]*=s,t[8]*=o,t[1]*=i,t[5]*=s,t[9]*=o,t[2]*=i,t[6]*=s,t[10]*=o,t[3]*=i,t[7]*=s,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),o=1-i,a=e.x,r=e.y,c=e.z,l=o*a,u=o*r;return this.set(l*a+i,l*r-s*c,l*c+s*r,0,l*r+s*c,u*r+i,u*c-s*a,0,l*c-s*r,u*c+s*a,o*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,o,a){return this.set(1,i,o,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,o=t._x,a=t._y,r=t._z,c=t._w,l=o+o,u=a+a,d=r+r,f=o*l,p=o*u,g=o*d,_=a*u,m=a*d,h=r*d,v=c*l,x=c*u,M=c*d,b=i.x,y=i.y,w=i.z;return s[0]=(1-(_+h))*b,s[1]=(p+M)*b,s[2]=(g-x)*b,s[3]=0,s[4]=(p-M)*y,s[5]=(1-(f+h))*y,s[6]=(m+v)*y,s[7]=0,s[8]=(g+x)*w,s[9]=(m-v)*w,s[10]=(1-(f+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let o=As.set(s[0],s[1],s[2]).length();const a=As.set(s[4],s[5],s[6]).length(),r=As.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),e.x=s[12],e.y=s[13],e.z=s[14],Dn.copy(this);const l=1/o,u=1/a,d=1/r;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=u,Dn.elements[5]*=u,Dn.elements[6]*=u,Dn.elements[8]*=d,Dn.elements[9]*=d,Dn.elements[10]*=d,t.setFromRotationMatrix(Dn),i.x=o,i.y=a,i.z=r,this}makePerspective(e,t,i,s,o,a,r=ci){const c=this.elements,l=2*o/(t-e),u=2*o/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s);let p,g;if(r===ci)p=-(a+o)/(a-o),g=-2*a*o/(a-o);else if(r===wa)p=-a/(a-o),g=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,o,a,r=ci){const c=this.elements,l=1/(t-e),u=1/(i-s),d=1/(a-o),f=(t+e)*l,p=(i+s)*u;let g,_;if(r===ci)g=(a+o)*d,_=-2*d;else if(r===wa)g=o*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const As=new U,Dn=new Mt,G0=new U(0,0,0),W0=new U(1,1,1),_i=new U,vr=new U,hn=new U,hd=new Mt,pd=new sr;class Ja{constructor(e=0,t=0,i=0,s=Ja.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,o=s[0],a=s[4],r=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(sn(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-sn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(r,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(sn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-sn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(sn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(r,p));break;case"XZY":this._z=Math.asin(-sn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(r,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pd.setFromEuler(this),this.setFromQuaternion(pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ja.DEFAULT_ORDER="XYZ";class nu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let X0=0;const md=new U,Rs=new sr,ei=new Mt,Mr=new U,Ao=new U,q0=new U,Y0=new sr,gd=new U(1,0,0),_d=new U(0,1,0),xd=new U(0,0,1),j0={type:"added"},$0={type:"removed"};class Et extends _o{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=xo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new U,t=new Ja,i=new sr,s=new U(1,1,1);function o(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Xe}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(gd,e)}rotateY(e){return this.rotateOnAxis(_d,e)}rotateZ(e){return this.rotateOnAxis(xd,e)}translateOnAxis(e,t){return md.copy(e).applyQuaternion(this.quaternion),this.position.add(md.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gd,e)}translateY(e){return this.translateOnAxis(_d,e)}translateZ(e){return this.translateOnAxis(xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Mr.copy(e):Mr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(Ao,Mr,this.up):ei.lookAt(Mr,Ao,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(ei),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(j0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,e,q0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,Y0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const o=t[i];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++){const r=s[o];r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const c=r.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let c=0,l=this.material.length;c<l;c++)r.push(o(e.materials,this.material[c]));s.material=r}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let r=0;r<this.children.length;r++)s.children.push(this.children[r].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let r=0;r<this.animations.length;r++){const c=this.animations[r];s.animations.push(o(e.animations,c))}}if(t){const r=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);r.length>0&&(i.geometries=r),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(r){const c=[];for(const l in r){const u=r[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Et.DEFAULT_UP=new U(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new U,ti=new U,Ec=new U,ni=new U,Cs=new U,Ps=new U,vd=new U,Tc=new U,Ac=new U,Rc=new U;let yr=!1;class An{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),In.subVectors(e,t),s.cross(In);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(e,t,i,s,o){In.subVectors(s,t),ti.subVectors(i,t),Ec.subVectors(e,t);const a=In.dot(In),r=In.dot(ti),c=In.dot(Ec),l=ti.dot(ti),u=ti.dot(Ec),d=a*l-r*r;if(d===0)return o.set(0,0,0),null;const f=1/d,p=(l*c-r*u)*f,g=(a*u-r*c)*f;return o.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getUV(e,t,i,s,o,a,r,c){return yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yr=!0),this.getInterpolation(e,t,i,s,o,a,r,c)}static getInterpolation(e,t,i,s,o,a,r,c){return this.getBarycoord(e,t,i,s,ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,ni.x),c.addScaledVector(a,ni.y),c.addScaledVector(r,ni.z),c)}static isFrontFacing(e,t,i,s){return In.subVectors(i,t),ti.subVectors(e,t),In.cross(ti).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),In.cross(ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,o){return yr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),yr=!0),An.getInterpolation(e,this.a,this.b,this.c,t,i,s,o)}getInterpolation(e,t,i,s,o){return An.getInterpolation(e,this.a,this.b,this.c,t,i,s,o)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,o=this.c;let a,r;Cs.subVectors(s,i),Ps.subVectors(o,i),Tc.subVectors(e,i);const c=Cs.dot(Tc),l=Ps.dot(Tc);if(c<=0&&l<=0)return t.copy(i);Ac.subVectors(e,s);const u=Cs.dot(Ac),d=Ps.dot(Ac);if(u>=0&&d<=u)return t.copy(s);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(Cs,a);Rc.subVectors(e,o);const p=Cs.dot(Rc),g=Ps.dot(Rc);if(g>=0&&p<=g)return t.copy(o);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return r=l/(l-g),t.copy(i).addScaledVector(Ps,r);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return vd.subVectors(o,s),r=(d-u)/(d-u+(p-g)),t.copy(s).addScaledVector(vd,r);const h=1/(m+_+f);return a=_*h,r=f*h,t.copy(i).addScaledVector(Cs,a).addScaledVector(Ps,r)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},br={h:0,s:0,l:0};function Cc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class be{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=tu(e,1),t=sn(t,0,1),i=sn(i,0,1),t===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+t):i+t-i*t,a=2*i-o;this.r=Cc(a,o,e+1/3),this.g=Cc(a,o,e),this.b=Cc(a,o,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=kt){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const a=s[1],r=s[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=s[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=Uh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}copyLinearToSRGB(e){return this.r=_c(e.r),this.g=_c(e.g),this.b=_c(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Qe.fromWorkingColorSpace(Wt.copy(this),e),Math.round(sn(Wt.r*255,0,255))*65536+Math.round(sn(Wt.g*255,0,255))*256+Math.round(sn(Wt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Wt.copy(this),t);const i=Wt.r,s=Wt.g,o=Wt.b,a=Math.max(i,s,o),r=Math.min(i,s,o);let c,l;const u=(r+a)/2;if(r===a)c=0,l=0;else{const d=a-r;switch(l=u<=.5?d/(a+r):d/(2-a-r),a){case i:c=(s-o)/d+(s<o?6:0);break;case s:c=(o-i)/d+2;break;case o:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=kt){Qe.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,s=Wt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(br);const i=ko(xi.h,br.h,t),s=ko(xi.s,br.s,t),o=ko(xi.l,br.l,t);return this.setHSL(i,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*s,this.g=o[1]*t+o[4]*i+o[7]*s,this.b=o[2]*t+o[5]*i+o[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new be;be.NAMES=Uh;let K0=0;class ys extends _o{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=xo(),this.name="",this.type="Material",this.blending=us,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=al,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Ma,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=od,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rl&&(i.blendSrc=this.blendSrc),this.blendDst!==al&&(i.blendDst=this.blendDst),this.blendEquation!==ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ma&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==od&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const a=[];for(const r in o){const c=o[r];delete c.metadata,a.push(c)}return a}if(t){const o=s(e.textures),a=s(e.images);o.length>0&&(i.textures=o),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vt extends ys{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new U,Sr=new Te;class wt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=rd,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Di,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Sr.fromBufferAttribute(this,t),Sr.applyMatrix3(e),this.setXY(t,Sr.x,Sr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Bs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Jt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),i=Jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),i=Jt(i,this.array),s=Jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,o){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),i=Jt(i,this.array),s=Jt(s,this.array),o=Jt(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==rd&&(e.usage=this.usage),e}}class Nh extends wt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zh extends wt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class it extends wt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Z0=0;const Sn=new Mt,Pc=new Et,Ls=new U,pn=new or,Ro=new or,It=new U;class Tt extends _o{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Z0++}),this.uuid=xo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ph(e)?zh:Nh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new Xe().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,i){return Sn.makeTranslation(e,t,i),this.applyMatrix4(Sn),this}scale(e,t,i){return Sn.makeScale(e,t,i),this.applyMatrix4(Sn),this}lookAt(e){return Pc.lookAt(e),Pc.updateMatrix(),this.applyMatrix4(Pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new it(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new or);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const o=t[i];pn.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){const r=t[o];Ro.setFromBufferAttribute(r),this.morphTargetsRelative?(It.addVectors(pn.min,Ro.min),pn.expandByPoint(It),It.addVectors(pn.max,Ro.max),pn.expandByPoint(It)):(pn.expandByPoint(Ro.min),pn.expandByPoint(Ro.max))}pn.getCenter(i);let s=0;for(let o=0,a=e.count;o<a;o++)It.fromBufferAttribute(e,o),s=Math.max(s,i.distanceToSquared(It));if(t)for(let o=0,a=t.length;o<a;o++){const r=t[o],c=this.morphTargetsRelative;for(let l=0,u=r.count;l<u;l++)It.fromBufferAttribute(r,l),c&&(Ls.fromBufferAttribute(e,l),It.add(Ls)),s=Math.max(s,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,o=t.normal.array,a=t.uv.array,r=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*r),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let T=0;T<r;T++)l[T]=new U,u[T]=new U;const d=new U,f=new U,p=new U,g=new Te,_=new Te,m=new Te,h=new U,v=new U;function x(T,N,F){d.fromArray(s,T*3),f.fromArray(s,N*3),p.fromArray(s,F*3),g.fromArray(a,T*2),_.fromArray(a,N*2),m.fromArray(a,F*2),f.sub(d),p.sub(d),_.sub(g),m.sub(g);const $=1/(_.x*m.y-m.x*_.y);isFinite($)&&(h.copy(f).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar($),v.copy(p).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar($),l[T].add(h),l[N].add(h),l[F].add(h),u[T].add(v),u[N].add(v),u[F].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let T=0,N=M.length;T<N;++T){const F=M[T],$=F.start,D=F.count;for(let B=$,X=$+D;B<X;B+=3)x(i[B+0],i[B+1],i[B+2])}const b=new U,y=new U,w=new U,P=new U;function S(T){w.fromArray(o,T*3),P.copy(w);const N=l[T];b.copy(N),b.sub(w.multiplyScalar(w.dot(N))).normalize(),y.crossVectors(P,N);const $=y.dot(u[T])<0?-1:1;c[T*4]=b.x,c[T*4+1]=b.y,c[T*4+2]=b.z,c[T*4+3]=$}for(let T=0,N=M.length;T<N;++T){const F=M[T],$=F.start,D=F.count;for(let B=$,X=$+D;B<X;B+=3)S(i[B+0]),S(i[B+1]),S(i[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new U,o=new U,a=new U,r=new U,c=new U,l=new U,u=new U,d=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,o),d.subVectors(s,o),u.cross(d),r.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),r.add(u),c.add(u),l.add(u),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,o),d.subVectors(s,o),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(r,c){const l=r.array,u=r.itemSize,d=r.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){r.isInterleavedBufferAttribute?p=c[_]*r.data.stride+r.offset:p=c[_]*u;for(let h=0;h<u;h++)f[g++]=l[p++]}return new wt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const r in s){const c=s[r],l=e(c,i);t.setAttribute(r,l)}const o=this.morphAttributes;for(const r in o){const c=[],l=o[r];for(let u=0,d=l.length;u<d;u++){const f=l[u],p=e(f,i);c.push(p)}t.morphAttributes[r]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let r=0,c=a.length;r<c;r++){const l=a[r];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,o=!0)}o&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const r=this.boundingSphere;return r!==null&&(e.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const o=e.morphAttributes;for(const l in o){const u=[],d=o[l];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const r=e.boundingBox;r!==null&&(this.boundingBox=r.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Md=new Mt,ji=new Za,wr=new rr,yd=new U,Ds=new U,Is=new U,Us=new U,Lc=new U,Er=new U,Tr=new Te,Ar=new Te,Rr=new Te,bd=new U,Sd=new U,wd=new U,Cr=new U,Pr=new U;class L extends Et{constructor(e=new Tt,t=new vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=s.length;o<a;o++){const r=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const r=this.morphTargetInfluences;if(o&&r){Er.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const u=r[c],d=o[c];u!==0&&(Lc.fromBufferAttribute(d,e),a?Er.addScaledVector(Lc,u):Er.addScaledVector(Lc.sub(t),u))}t.add(Er)}return t}raycast(e,t){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wr.copy(i.boundingSphere),wr.applyMatrix4(o),ji.copy(e.ray).recast(e.near),!(wr.containsPoint(ji.origin)===!1&&(ji.intersectSphere(wr,yd)===null||ji.origin.distanceToSquared(yd)>(e.far-e.near)**2))&&(Md.copy(o).invert(),ji.copy(e.ray).applyMatrix4(Md),!(i.boundingBox!==null&&ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,i){let s;const o=this.geometry,a=this.material,r=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,p=o.drawRange;if(r!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=a[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(r.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,b=x;M<b;M+=3){const y=r.getX(M),w=r.getX(M+1),P=r.getX(M+2);s=Lr(this,h,e,i,l,u,d,y,w,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(r.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const v=r.getX(m),x=r.getX(m+1),M=r.getX(m+2);s=Lr(this,a,e,i,l,u,d,v,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],h=a[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,b=x;M<b;M+=3){const y=M,w=M+1,P=M+2;s=Lr(this,h,e,i,l,u,d,y,w,P),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,h=_;m<h;m+=3){const v=m,x=m+1,M=m+2;s=Lr(this,a,e,i,l,u,d,v,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function J0(n,e,t,i,s,o,a,r){let c;if(e.side===cn?c=i.intersectTriangle(a,o,s,!0,r):c=i.intersectTriangle(s,o,a,e.side===Fi,r),c===null)return null;Pr.copy(r),Pr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Pr);return l<t.near||l>t.far?null:{distance:l,point:Pr.clone(),object:n}}function Lr(n,e,t,i,s,o,a,r,c,l){n.getVertexPosition(r,Ds),n.getVertexPosition(c,Is),n.getVertexPosition(l,Us);const u=J0(n,e,t,i,Ds,Is,Us,Cr);if(u){s&&(Tr.fromBufferAttribute(s,r),Ar.fromBufferAttribute(s,c),Rr.fromBufferAttribute(s,l),u.uv=An.getInterpolation(Cr,Ds,Is,Us,Tr,Ar,Rr,new Te)),o&&(Tr.fromBufferAttribute(o,r),Ar.fromBufferAttribute(o,c),Rr.fromBufferAttribute(o,l),u.uv1=An.getInterpolation(Cr,Ds,Is,Us,Tr,Ar,Rr,new Te),u.uv2=u.uv1),a&&(bd.fromBufferAttribute(a,r),Sd.fromBufferAttribute(a,c),wd.fromBufferAttribute(a,l),u.normal=An.getInterpolation(Cr,Ds,Is,Us,bd,Sd,wd,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:r,b:c,c:l,normal:new U,materialIndex:0};An.getNormal(Ds,Is,Us,d.normal),u.face=d}return u}class fi extends Tt{constructor(e=1,t=1,i=1,s=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:o,depthSegments:a};const r=this;s=Math.floor(s),o=Math.floor(o),a=Math.floor(a);const c=[],l=[],u=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,a,o,0),g("z","y","x",1,-1,i,t,-e,a,o,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,o,4),g("x","y","z",-1,-1,e,t,-i,s,o,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(d,2));function g(_,m,h,v,x,M,b,y,w,P,S){const T=M/w,N=b/P,F=M/2,$=b/2,D=y/2,B=w+1,X=P+1;let k=0,z=0;const j=new U;for(let K=0;K<X;K++){const te=K*N-$;for(let ee=0;ee<B;ee++){const Y=ee*T-F;j[_]=Y*v,j[m]=te*x,j[h]=D,l.push(j.x,j.y,j.z),j[_]=0,j[m]=0,j[h]=y>0?1:-1,u.push(j.x,j.y,j.z),d.push(ee/w),d.push(1-K/P),k+=1}}for(let K=0;K<P;K++)for(let te=0;te<w;te++){const ee=f+te+B*K,Y=f+te+B*(K+1),Z=f+(te+1)+B*(K+1),de=f+(te+1)+B*K;c.push(ee,Y,de),c.push(Y,Z,de),z+=6}r.addGroup(p,z,S),p+=z,f+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=fo(n[t]);for(const s in i)e[s]=i[s]}return e}function Q0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Oh(n){return n.getRenderTarget()===null?n.outputColorSpace:Qe.workingColorSpace}const Aa={clone:fo,merge:Qt};var eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends ys{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eg,this.fragmentShader=tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fo(e.uniforms),this.uniformsGroups=Q0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Fh extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Rn extends Fh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return er*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,o=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;o+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const r=this.filmOffset;r!==0&&(o+=e*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ns=-90,zs=1;class ng extends Et{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rn(Ns,zs,e,t);s.layers=this.layers,this.add(s);const o=new Rn(Ns,zs,e,t);o.layers=this.layers,this.add(o);const a=new Rn(Ns,zs,e,t);a.layers=this.layers,this.add(a);const r=new Rn(Ns,zs,e,t);r.layers=this.layers,this.add(r);const c=new Rn(Ns,zs,e,t);c.layers=this.layers,this.add(c);const l=new Rn(Ns,zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,o,a,r,c]=t;for(const l of t)this.remove(l);if(e===ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,a,r,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,o),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,r),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Bh extends vn{constructor(e,t,i,s,o,a,r,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:co,super(e,t,i,s,o,a,r,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ig extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Ho("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===hs?kt:Pn),this.texture=new Bh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Tn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fi(5,5,5),o=new xn({name:"CubemapFromEquirect",uniforms:fo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:ui});o.uniforms.tEquirect.value=t;const a=new L(s,o),r=t.minFilter;return t.minFilter===Qo&&(t.minFilter=Tn),new ng(1,10,this).update(e,a),t.minFilter=r,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(o)}}const Dc=new U,sg=new U,og=new Xe;class yi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Dc.subVectors(i,t).cross(sg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Dc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||og.getNormalMatrix(e),s=this.coplanarPoint(Dc).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new rr,Dr=new U;class iu{constructor(e=new yi,t=new yi,i=new yi,s=new yi,o=new yi,a=new yi){this.planes=[e,t,i,s,o,a]}set(e,t,i,s,o,a){const r=this.planes;return r[0].copy(e),r[1].copy(t),r[2].copy(i),r[3].copy(s),r[4].copy(o),r[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ci){const i=this.planes,s=e.elements,o=s[0],a=s[1],r=s[2],c=s[3],l=s[4],u=s[5],d=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],h=s[12],v=s[13],x=s[14],M=s[15];if(i[0].setComponents(c-o,f-l,m-p,M-h).normalize(),i[1].setComponents(c+o,f+l,m+p,M+h).normalize(),i[2].setComponents(c+a,f+u,m+g,M+v).normalize(),i[3].setComponents(c-a,f-u,m-g,M-v).normalize(),i[4].setComponents(c-r,f-d,m-_,M-x).normalize(),t===ci)i[5].setComponents(c+r,f+d,m+_,M+x).normalize();else if(t===wa)i[5].setComponents(r,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Dr.x=s.normal.x>0?e.max.x:e.min.x,Dr.y=s.normal.y>0?e.max.y:e.min.y,Dr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kh(){let n=null,e=!1,t=null,i=null;function s(o,a){t(o,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function rg(n,e){const t=e.isWebGL2,i=new WeakMap;function s(l,u){const d=l.array,f=l.usage,p=d.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,d,f),l.onUploadCallback();let _;if(d instanceof Float32Array)_=n.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=n.SHORT;else if(d instanceof Uint32Array)_=n.UNSIGNED_INT;else if(d instanceof Int32Array)_=n.INT;else if(d instanceof Int8Array)_=n.BYTE;else if(d instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:p}}function o(l,u,d){const f=u.array,p=u._updateRange,g=u.updateRanges;if(n.bindBuffer(d,l),p.count===-1&&g.length===0&&n.bufferSubData(d,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const h=g[_];t?n.bufferSubData(d,h.start*f.BYTES_PER_ELEMENT,f,h.start,h.count):n.bufferSubData(d,h.start*f.BYTES_PER_ELEMENT,f.subarray(h.start,h.start+h.count))}u.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);u&&(n.deleteBuffer(u.buffer),i.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=i.get(l);if(d===void 0)i.set(l,s(l,u));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,l,u),d.version=l.version}}return{get:a,remove:r,update:c}}class vo extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const o=e/2,a=t/2,r=Math.floor(i),c=Math.floor(s),l=r+1,u=c+1,d=e/r,f=t/c,p=[],g=[],_=[],m=[];for(let h=0;h<u;h++){const v=h*f-a;for(let x=0;x<l;x++){const M=x*d-o;g.push(M,-v,0),_.push(0,0,1),m.push(x/r),m.push(1-h/c)}}for(let h=0;h<c;h++)for(let v=0;v<r;v++){const x=v+l*h,M=v+l*(h+1),b=v+1+l*(h+1),y=v+1+l*h;p.push(x,M,y),p.push(M,b,y)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vo(e.width,e.height,e.widthSegments,e.heightSegments)}}var ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cg=`#ifdef USE_ALPHAHASH
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
#endif`,lg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,fg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hg=`#ifdef USE_AOMAP
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
#endif`,pg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mg=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,gg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mg=`#ifdef USE_IRIDESCENCE
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
#endif`,yg=`#ifdef USE_BUMPMAP
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
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pg=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,Lg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dg=`vec3 transformedNormal = objectNormal;
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
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Og="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fg=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Bg=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jg=`#ifdef USE_GRADIENTMAP
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
}`,$g=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qg=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,e_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,t_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,r_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,a_=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,c_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,l_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,d_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,h_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,p_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,__=`#if defined( USE_POINTS_UV )
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
#endif`,x_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,M_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,y_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,b_=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,S_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,w_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,T_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C_=`#ifdef USE_NORMALMAP
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
#endif`,P_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,z_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,F_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,k_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,G_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,W_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,X_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,q_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Y_=`#ifdef USE_SKINNING
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
#endif`,j_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$_=`#ifdef USE_SKINNING
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
#endif`,K_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q_=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ex=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tx=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ox=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ax=`uniform sampler2D t2D;
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
}`,cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`#include <common>
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
}`,hx=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,px=`#define DISTANCE
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
}`,mx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_x=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mx=`#include <common>
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
}`,yx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,bx=`#define LAMBERT
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
}`,Sx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,wx=`#define MATCAP
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
}`,Ex=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Tx=`#define NORMAL
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
}`,Ax=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rx=`#define PHONG
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
}`,Cx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Px=`#define STANDARD
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
}`,Lx=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,Dx=`#define TOON
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
}`,Ix=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ux=`uniform float size;
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
}`,Nx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,zx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Ox=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Fx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Bx=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Be={alphahash_fragment:ag,alphahash_pars_fragment:cg,alphamap_fragment:lg,alphamap_pars_fragment:ug,alphatest_fragment:dg,alphatest_pars_fragment:fg,aomap_fragment:hg,aomap_pars_fragment:pg,batching_pars_vertex:mg,batching_vertex:gg,begin_vertex:_g,beginnormal_vertex:xg,bsdfs:vg,iridescence_fragment:Mg,bumpmap_pars_fragment:yg,clipping_planes_fragment:bg,clipping_planes_pars_fragment:Sg,clipping_planes_pars_vertex:wg,clipping_planes_vertex:Eg,color_fragment:Tg,color_pars_fragment:Ag,color_pars_vertex:Rg,color_vertex:Cg,common:Pg,cube_uv_reflection_fragment:Lg,defaultnormal_vertex:Dg,displacementmap_pars_vertex:Ig,displacementmap_vertex:Ug,emissivemap_fragment:Ng,emissivemap_pars_fragment:zg,colorspace_fragment:Og,colorspace_pars_fragment:Fg,envmap_fragment:Bg,envmap_common_pars_fragment:kg,envmap_pars_fragment:Hg,envmap_pars_vertex:Vg,envmap_physical_pars_fragment:e_,envmap_vertex:Gg,fog_vertex:Wg,fog_pars_vertex:Xg,fog_fragment:qg,fog_pars_fragment:Yg,gradientmap_pars_fragment:jg,lightmap_fragment:$g,lightmap_pars_fragment:Kg,lights_lambert_fragment:Zg,lights_lambert_pars_fragment:Jg,lights_pars_begin:Qg,lights_toon_fragment:t_,lights_toon_pars_fragment:n_,lights_phong_fragment:i_,lights_phong_pars_fragment:s_,lights_physical_fragment:o_,lights_physical_pars_fragment:r_,lights_fragment_begin:a_,lights_fragment_maps:c_,lights_fragment_end:l_,logdepthbuf_fragment:u_,logdepthbuf_pars_fragment:d_,logdepthbuf_pars_vertex:f_,logdepthbuf_vertex:h_,map_fragment:p_,map_pars_fragment:m_,map_particle_fragment:g_,map_particle_pars_fragment:__,metalnessmap_fragment:x_,metalnessmap_pars_fragment:v_,morphcolor_vertex:M_,morphnormal_vertex:y_,morphtarget_pars_vertex:b_,morphtarget_vertex:S_,normal_fragment_begin:w_,normal_fragment_maps:E_,normal_pars_fragment:T_,normal_pars_vertex:A_,normal_vertex:R_,normalmap_pars_fragment:C_,clearcoat_normal_fragment_begin:P_,clearcoat_normal_fragment_maps:L_,clearcoat_pars_fragment:D_,iridescence_pars_fragment:I_,opaque_fragment:U_,packing:N_,premultiplied_alpha_fragment:z_,project_vertex:O_,dithering_fragment:F_,dithering_pars_fragment:B_,roughnessmap_fragment:k_,roughnessmap_pars_fragment:H_,shadowmap_pars_fragment:V_,shadowmap_pars_vertex:G_,shadowmap_vertex:W_,shadowmask_pars_fragment:X_,skinbase_vertex:q_,skinning_pars_vertex:Y_,skinning_vertex:j_,skinnormal_vertex:$_,specularmap_fragment:K_,specularmap_pars_fragment:Z_,tonemapping_fragment:J_,tonemapping_pars_fragment:Q_,transmission_fragment:ex,transmission_pars_fragment:tx,uv_pars_fragment:nx,uv_pars_vertex:ix,uv_vertex:sx,worldpos_vertex:ox,background_vert:rx,background_frag:ax,backgroundCube_vert:cx,backgroundCube_frag:lx,cube_vert:ux,cube_frag:dx,depth_vert:fx,depth_frag:hx,distanceRGBA_vert:px,distanceRGBA_frag:mx,equirect_vert:gx,equirect_frag:_x,linedashed_vert:xx,linedashed_frag:vx,meshbasic_vert:Mx,meshbasic_frag:yx,meshlambert_vert:bx,meshlambert_frag:Sx,meshmatcap_vert:wx,meshmatcap_frag:Ex,meshnormal_vert:Tx,meshnormal_frag:Ax,meshphong_vert:Rx,meshphong_frag:Cx,meshphysical_vert:Px,meshphysical_frag:Lx,meshtoon_vert:Dx,meshtoon_frag:Ix,points_vert:Ux,points_frag:Nx,shadow_vert:zx,shadow_frag:Ox,sprite_vert:Fx,sprite_frag:Bx},ae={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Yn={basic:{uniforms:Qt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Qt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new be(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Qt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Qt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Qt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new be(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Qt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Qt([ae.points,ae.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Qt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Qt([ae.common,ae.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Qt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Qt([ae.sprite,ae.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Qt([ae.common,ae.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Qt([ae.lights,ae.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Yn.physical={uniforms:Qt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Ir={r:0,b:0,g:0};function kx(n,e,t,i,s,o,a){const r=new be(0);let c=o===!0?0:1,l,u,d=null,f=0,p=null;function g(m,h){let v=!1,x=h.isScene===!0?h.background:null;x&&x.isTexture&&(x=(h.backgroundBlurriness>0?t:e).get(x)),x===null?_(r,c):x&&x.isColor&&(_(x,1),v=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===$a)?(u===void 0&&(u=new L(new fi(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:fo(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,y,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,u.material.toneMapped=Qe.getTransfer(x.colorSpace)!==ct,(d!==x||f!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=x,f=x.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new L(new vo(2,2),new xn({name:"BackgroundMaterial",uniforms:fo(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(x.colorSpace)!==ct,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=x,f=x.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,h){m.getRGB(Ir,Oh(n)),i.buffers.color.setClear(Ir.r,Ir.g,Ir.b,h,a)}return{getClearColor:function(){return r},setClearColor:function(m,h=1){r.set(m),c=h,_(r,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(r,c)},render:g}}function Hx(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),o=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||o!==null,r={},c=m(null);let l=c,u=!1;function d(D,B,X,k,z){let j=!1;if(a){const K=_(k,X,B);l!==K&&(l=K,p(l.object)),j=h(D,k,X,z),j&&v(D,k,X,z)}else{const K=B.wireframe===!0;(l.geometry!==k.id||l.program!==X.id||l.wireframe!==K)&&(l.geometry=k.id,l.program=X.id,l.wireframe=K,j=!0)}z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(j||u)&&(u=!1,P(D,B,X,k),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function f(){return i.isWebGL2?n.createVertexArray():o.createVertexArrayOES()}function p(D){return i.isWebGL2?n.bindVertexArray(D):o.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):o.deleteVertexArrayOES(D)}function _(D,B,X){const k=X.wireframe===!0;let z=r[D.id];z===void 0&&(z={},r[D.id]=z);let j=z[B.id];j===void 0&&(j={},z[B.id]=j);let K=j[k];return K===void 0&&(K=m(f()),j[k]=K),K}function m(D){const B=[],X=[],k=[];for(let z=0;z<s;z++)B[z]=0,X[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:X,attributeDivisors:k,object:D,attributes:{},index:null}}function h(D,B,X,k){const z=l.attributes,j=B.attributes;let K=0;const te=X.getAttributes();for(const ee in te)if(te[ee].location>=0){const Z=z[ee];let de=j[ee];if(de===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),Z===void 0||Z.attribute!==de||de&&Z.data!==de.data)return!0;K++}return l.attributesNum!==K||l.index!==k}function v(D,B,X,k){const z={},j=B.attributes;let K=0;const te=X.getAttributes();for(const ee in te)if(te[ee].location>=0){let Z=j[ee];Z===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor));const de={};de.attribute=Z,Z&&Z.data&&(de.data=Z.data),z[ee]=de,K++}l.attributes=z,l.attributesNum=K,l.index=k}function x(){const D=l.newAttributes;for(let B=0,X=D.length;B<X;B++)D[B]=0}function M(D){b(D,0)}function b(D,B){const X=l.newAttributes,k=l.enabledAttributes,z=l.attributeDivisors;X[D]=1,k[D]===0&&(n.enableVertexAttribArray(D),k[D]=1),z[D]!==B&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),z[D]=B)}function y(){const D=l.newAttributes,B=l.enabledAttributes;for(let X=0,k=B.length;X<k;X++)B[X]!==D[X]&&(n.disableVertexAttribArray(X),B[X]=0)}function w(D,B,X,k,z,j,K){K===!0?n.vertexAttribIPointer(D,B,X,z,j):n.vertexAttribPointer(D,B,X,k,z,j)}function P(D,B,X,k){if(i.isWebGL2===!1&&(D.isInstancedMesh||k.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const z=k.attributes,j=X.getAttributes(),K=B.defaultAttributeValues;for(const te in j){const ee=j[te];if(ee.location>=0){let Y=z[te];if(Y===void 0&&(te==="instanceMatrix"&&D.instanceMatrix&&(Y=D.instanceMatrix),te==="instanceColor"&&D.instanceColor&&(Y=D.instanceColor)),Y!==void 0){const Z=Y.normalized,de=Y.itemSize,Me=t.get(Y);if(Me===void 0)continue;const xe=Me.buffer,Ue=Me.type,Oe=Me.bytesPerElement,Re=i.isWebGL2===!0&&(Ue===n.INT||Ue===n.UNSIGNED_INT||Y.gpuType===Mh);if(Y.isInterleavedBufferAttribute){const je=Y.data,H=je.stride,jt=Y.offset;if(je.isInstancedInterleavedBuffer){for(let Se=0;Se<ee.locationSize;Se++)b(ee.location+Se,je.meshPerAttribute);D.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=je.meshPerAttribute*je.count)}else for(let Se=0;Se<ee.locationSize;Se++)M(ee.location+Se);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let Se=0;Se<ee.locationSize;Se++)w(ee.location+Se,de/ee.locationSize,Ue,Z,H*Oe,(jt+de/ee.locationSize*Se)*Oe,Re)}else{if(Y.isInstancedBufferAttribute){for(let je=0;je<ee.locationSize;je++)b(ee.location+je,Y.meshPerAttribute);D.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let je=0;je<ee.locationSize;je++)M(ee.location+je);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let je=0;je<ee.locationSize;je++)w(ee.location+je,de/ee.locationSize,Ue,Z,de*Oe,de/ee.locationSize*je*Oe,Re)}}else if(K!==void 0){const Z=K[te];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(ee.location,Z);break;case 3:n.vertexAttrib3fv(ee.location,Z);break;case 4:n.vertexAttrib4fv(ee.location,Z);break;default:n.vertexAttrib1fv(ee.location,Z)}}}}y()}function S(){F();for(const D in r){const B=r[D];for(const X in B){const k=B[X];for(const z in k)g(k[z].object),delete k[z];delete B[X]}delete r[D]}}function T(D){if(r[D.id]===void 0)return;const B=r[D.id];for(const X in B){const k=B[X];for(const z in k)g(k[z].object),delete k[z];delete B[X]}delete r[D.id]}function N(D){for(const B in r){const X=r[B];if(X[D.id]===void 0)continue;const k=X[D.id];for(const z in k)g(k[z].object),delete k[z];delete X[D.id]}}function F(){$(),u=!0,l!==c&&(l=c,p(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:F,resetDefaultState:$,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:M,disableUnusedAttributes:y}}function Vx(n,e,t,i){const s=i.isWebGL2;let o;function a(u){o=u}function r(u,d){n.drawArrays(o,u,d),t.update(d,o,1)}function c(u,d,f){if(f===0)return;let p,g;if(s)p=n,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](o,u,d,f),t.update(d,o,f)}function l(u,d,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(u[g],d[g]);else{p.multiDrawArraysWEBGL(o,u,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];t.update(g,o,1)}}this.setMode=a,this.render=r,this.renderInstances=c,this.renderMultiDraw=l}function Gx(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let r=t.precision!==void 0?t.precision:"highp";const c=o(r);c!==r&&(console.warn("THREE.WebGLRenderer:",r,"not supported, using",c,"instead."),r=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),h=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,M=a||e.has("OES_texture_float"),b=x&&M,y=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:o,precision:r,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:h,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:b,maxSamples:y}}function Wx(n){const e=this;let t=null,i=0,s=!1,o=!1;const a=new yi,r=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||s;return s=f,i=d.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!s||g===null||g.length===0||o&&!m)o?u(null):l();else{const v=o?0:i,x=v*4;let M=h.clippingState||null;c.value=M,M=u(g,f,x,p);for(let b=0;b!==x;++b)M[b]=t[b];h.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const h=p+_*4,v=f.matrixWorldInverse;r.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let x=0,M=p;x!==_;++x,M+=4)a.copy(d[x]).applyMatrix4(v,r),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Xx(n){let e=new WeakMap;function t(a,r){return r===cl?a.mapping=co:r===ll&&(a.mapping=lo),a}function i(a){if(a&&a.isTexture){const r=a.mapping;if(r===cl||r===ll)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new ig(c.height/2);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const r=a.target;r.removeEventListener("dispose",s);const c=e.get(r);c!==void 0&&(e.delete(r),c.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}class su extends Fh{constructor(e=-1,t=1,i=1,s=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-e,a=i+e,r=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,a=o+l*this.view.width,r-=u*this.view.offsetY,c=r-u*this.view.height}this.projectionMatrix.makeOrthographic(o,a,r,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Vs=4,Ed=[.125,.215,.35,.446,.526,.582],ns=20,Ic=new su,Td=new be;let Uc=null,Nc=0,zc=0;const Zi=(1+Math.sqrt(5))/2,Os=1/Zi,Ad=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Zi,Os),new U(0,Zi,-Os),new U(Os,0,Zi),new U(-Os,0,Zi),new U(Zi,Os,0),new U(-Zi,Os,0)];class Rd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Uc=this._renderer.getRenderTarget(),Nc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,s,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ld(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uc,Nc,zc),e.scissorTest=!1,Ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===co||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uc=this._renderer.getRenderTarget(),Nc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:di,format:Bn,colorSpace:hi,depthBuffer:!1},s=Cd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cd(e,t,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qx(o)),this._blurMaterial=Yx(o,e,t)}return s}_compileMaterial(e){const t=new L(this._lodPlanes[0],e);this._renderer.compile(t,Ic)}_sceneToCubeUV(e,t,i,s){const r=new Rn(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Td),u.toneMapping=zi,u.autoClear=!1;const p=new vt({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new L(new fi,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Td),_=!0);for(let h=0;h<6;h++){const v=h%3;v===0?(r.up.set(0,c[h],0),r.lookAt(l[h],0,0)):v===1?(r.up.set(0,0,c[h]),r.lookAt(0,l[h],0)):(r.up.set(0,c[h],0),r.lookAt(0,0,l[h]));const x=this._cubeSize;Ur(s,v*x,h>2?x:0,x,x),u.setRenderTarget(s),_&&u.render(g,r),u.render(e,r)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===co||e.mapping===lo;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ld()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pd());const o=s?this._cubemapMaterial:this._equirectMaterial,a=new L(this._lodPlanes[0],o),r=o.uniforms;r.envMap.value=e;const c=this._cubeSize;Ur(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Ic)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ad[(s-1)%Ad.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,s,o){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",o),this._halfBlur(a,e,i,i,s,"longitudinal",o)}_halfBlur(e,t,i,s,o,a,r){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new L(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*ns-1),_=o/g,m=isFinite(o)?1+Math.floor(u*_):ns;m>ns&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ns}`);const h=[];let v=0;for(let w=0;w<ns;++w){const P=w/_,S=Math.exp(-P*P/2);h.push(S),w===0?v+=S:w<m&&(v+=2*S)}for(let w=0;w<h.length;w++)h[w]=h[w]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=a==="latitudinal",r&&(f.poleAxis.value=r);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const M=this._sizeLods[s],b=3*M*(s>x-Vs?s-x+Vs:0),y=4*(this._cubeSize-M);Ur(t,b,y,3*M,2*M),c.setRenderTarget(t),c.render(d,Ic)}}function qx(n){const e=[],t=[],i=[];let s=n;const o=n-Vs+1+Ed.length;for(let a=0;a<o;a++){const r=Math.pow(2,s);t.push(r);let c=1/r;a>n-Vs?c=Ed[a-n+Vs-1]:a===0&&(c=0),i.push(c);const l=1/(r-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,h=1,v=new Float32Array(_*g*p),x=new Float32Array(m*g*p),M=new Float32Array(h*g*p);for(let y=0;y<p;y++){const w=y%3*2/3-1,P=y>2?0:-1,S=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];v.set(S,_*g*y),x.set(f,m*g*y);const T=[y,y,y,y,y,y];M.set(T,h*g*y)}const b=new Tt;b.setAttribute("position",new wt(v,_)),b.setAttribute("uv",new wt(x,m)),b.setAttribute("faceIndex",new wt(M,h)),e.push(b),s>Vs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Cd(n,e,t){const i=new kn(n,e,t);return i.texture.mapping=$a,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Yx(n,e,t){const i=new Float32Array(ns),s=new U(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ou(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Pd(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ou(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Ld(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function ou(){return`

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
	`}function jx(n){let e=new WeakMap,t=null;function i(r){if(r&&r.isTexture){const c=r.mapping,l=c===cl||c===ll,u=c===co||c===lo;if(l||u)if(r.isRenderTargetTexture&&r.needsPMREMUpdate===!0){r.needsPMREMUpdate=!1;let d=e.get(r);return t===null&&(t=new Rd(n)),d=l?t.fromEquirectangular(r,d):t.fromCubemap(r,d),e.set(r,d),d.texture}else{if(e.has(r))return e.get(r).texture;{const d=r.image;if(l&&d&&d.height>0||u&&d&&s(d)){t===null&&(t=new Rd(n));const f=l?t.fromEquirectangular(r):t.fromCubemap(r);return e.set(r,f),r.addEventListener("dispose",o),f.texture}else return null}}}return r}function s(r){let c=0;const l=6;for(let u=0;u<l;u++)r[u]!==void 0&&c++;return c===l}function o(r){const c=r.target;c.removeEventListener("dispose",o);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function $x(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Kx(n,e,t,i){const s={},o=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,h=_.length;m<h;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=o.get(f);p&&(e.remove(p),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function r(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const _=p[g];for(let m=0,h=_.length;m<h;m++)e.update(_[m],n.ARRAY_BUFFER)}}function l(d){const f=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,M=v.length;x<M;x+=3){const b=v[x+0],y=v[x+1],w=v[x+2];f.push(b,y,y,w,w,b)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){const b=x+0,y=x+1,w=x+2;f.push(b,y,y,w,w,b)}}else return;const m=new(Ph(f)?zh:Nh)(f,1);m.version=_;const h=o.get(d);h&&e.remove(h),o.set(d,m)}function u(d){const f=o.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&l(d)}else l(d);return o.get(d)}return{get:r,update:c,getWireframeAttribute:u}}function Zx(n,e,t,i){const s=i.isWebGL2;let o;function a(p){o=p}let r,c;function l(p){r=p.type,c=p.bytesPerElement}function u(p,g){n.drawElements(o,g,r,p*c),t.update(g,o,1)}function d(p,g,_){if(_===0)return;let m,h;if(s)m=n,h="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),h="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[h](o,g,r,p*c,_),t.update(g,o,_)}function f(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<_;h++)this.render(p[h]/c,g[h]);else{m.multiDrawElementsWEBGL(o,g,0,r,p,0,_);let h=0;for(let v=0;v<_;v++)h+=g[v];t.update(h,o,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function Jx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,r){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=r*(o/3);break;case n.LINES:t.lines+=r*(o/2);break;case n.LINE_STRIP:t.lines+=r*(o-1);break;case n.LINE_LOOP:t.lines+=r*o;break;case n.POINTS:t.points+=r*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Qx(n,e){return n[0]-e[0]}function ev(n,e){return Math.abs(e[1])-Math.abs(n[1])}function tv(n,e,t){const i={},s=new Float32Array(8),o=new WeakMap,a=new Ft,r=[];for(let l=0;l<8;l++)r[l]=[l,0];function c(l,u,d){const f=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=o.get(u);if(m===void 0||m.count!==_){let B=function(){$.dispose(),o.delete(u),u.removeEventListener("dispose",B)};var p=B;m!==void 0&&m.texture.dispose();const x=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,y=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],P=u.morphAttributes.color||[];let S=0;x===!0&&(S=1),M===!0&&(S=2),b===!0&&(S=3);let T=u.attributes.position.count*S,N=1;T>e.maxTextureSize&&(N=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const F=new Float32Array(T*N*4*_),$=new Ih(F,T,N,_);$.type=Di,$.needsUpdate=!0;const D=S*4;for(let X=0;X<_;X++){const k=y[X],z=w[X],j=P[X],K=T*N*4*X;for(let te=0;te<k.count;te++){const ee=te*D;x===!0&&(a.fromBufferAttribute(k,te),F[K+ee+0]=a.x,F[K+ee+1]=a.y,F[K+ee+2]=a.z,F[K+ee+3]=0),M===!0&&(a.fromBufferAttribute(z,te),F[K+ee+4]=a.x,F[K+ee+5]=a.y,F[K+ee+6]=a.z,F[K+ee+7]=0),b===!0&&(a.fromBufferAttribute(j,te),F[K+ee+8]=a.x,F[K+ee+9]=a.y,F[K+ee+10]=a.z,F[K+ee+11]=j.itemSize===4?a.w:1)}}m={count:_,texture:$,size:new Te(T,N)},o.set(u,m),u.addEventListener("dispose",B)}let h=0;for(let x=0;x<f.length;x++)h+=f[x];const v=u.morphTargetsRelative?1:1-h;d.getUniforms().setValue(n,"morphTargetBaseInfluence",v),d.getUniforms().setValue(n,"morphTargetInfluences",f),d.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=i[u.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];i[u.id]=_}for(let M=0;M<g;M++){const b=_[M];b[0]=M,b[1]=f[M]}_.sort(ev);for(let M=0;M<8;M++)M<g&&_[M][1]?(r[M][0]=_[M][0],r[M][1]=_[M][1]):(r[M][0]=Number.MAX_SAFE_INTEGER,r[M][1]=0);r.sort(Qx);const m=u.morphAttributes.position,h=u.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const b=r[M],y=b[0],w=b[1];y!==Number.MAX_SAFE_INTEGER&&w?(m&&u.getAttribute("morphTarget"+M)!==m[y]&&u.setAttribute("morphTarget"+M,m[y]),h&&u.getAttribute("morphNormal"+M)!==h[y]&&u.setAttribute("morphNormal"+M,h[y]),s[M]=w,v+=w):(m&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),h&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),s[M]=0)}const x=u.morphTargetsRelative?1:1-v;d.getUniforms().setValue(n,"morphTargetBaseInfluence",x),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function nv(n,e,t,i){let s=new WeakMap;function o(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function a(){s=new WeakMap}function r(c){const l=c.target;l.removeEventListener("dispose",r),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:a}}class Hh extends vn{constructor(e,t,i,s,o,a,r,c,l,u){if(u=u!==void 0?u:fs,u!==fs&&u!==uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===fs&&(i=Li),i===void 0&&u===uo&&(i=ds),super(null,s,o,a,r,c,u,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=r!==void 0?r:nn,this.minFilter=c!==void 0?c:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Vh=new vn,Gh=new Hh(1,1);Gh.compareFunction=Ch;const Wh=new Ih,Xh=new H0,qh=new Bh,Dd=[],Id=[],Ud=new Float32Array(16),Nd=new Float32Array(9),zd=new Float32Array(4);function Mo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let o=Dd[s];if(o===void 0&&(o=new Float32Array(s),Dd[s]=o),e!==0){i.toArray(o,0);for(let a=1,r=0;a!==e;++a)r+=t,n[a].toArray(o,r)}return o}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Qa(n,e){let t=Id[e];t===void 0&&(t=new Int32Array(e),Id[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function iv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function sv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function av(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;zd.set(i),n.uniformMatrix2fv(this.addr,!1,zd),Pt(t,i)}}function cv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Nd.set(i),n.uniformMatrix3fv(this.addr,!1,Nd),Pt(t,i)}}function lv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,i))return;Ud.set(i),n.uniformMatrix4fv(this.addr,!1,Ud),Pt(t,i)}}function uv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function hv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function pv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function gv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function _v(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function xv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const o=this.type===n.SAMPLER_2D_SHADOW?Gh:Vh;t.setTexture2D(e||o,s)}function vv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Xh,s)}function Mv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||qh,s)}function yv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Wh,s)}function bv(n){switch(n){case 5126:return iv;case 35664:return sv;case 35665:return ov;case 35666:return rv;case 35674:return av;case 35675:return cv;case 35676:return lv;case 5124:case 35670:return uv;case 35667:case 35671:return dv;case 35668:case 35672:return fv;case 35669:case 35673:return hv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return _v;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return vv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return yv}}function Sv(n,e){n.uniform1fv(this.addr,e)}function wv(n,e){const t=Mo(e,this.size,2);n.uniform2fv(this.addr,t)}function Ev(n,e){const t=Mo(e,this.size,3);n.uniform3fv(this.addr,t)}function Tv(n,e){const t=Mo(e,this.size,4);n.uniform4fv(this.addr,t)}function Av(n,e){const t=Mo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Rv(n,e){const t=Mo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Cv(n,e){const t=Mo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Pv(n,e){n.uniform1iv(this.addr,e)}function Lv(n,e){n.uniform2iv(this.addr,e)}function Dv(n,e){n.uniform3iv(this.addr,e)}function Iv(n,e){n.uniform4iv(this.addr,e)}function Uv(n,e){n.uniform1uiv(this.addr,e)}function Nv(n,e){n.uniform2uiv(this.addr,e)}function zv(n,e){n.uniform3uiv(this.addr,e)}function Ov(n,e){n.uniform4uiv(this.addr,e)}function Fv(n,e,t){const i=this.cache,s=e.length,o=Qa(t,s);Ct(i,o)||(n.uniform1iv(this.addr,o),Pt(i,o));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Vh,o[a])}function Bv(n,e,t){const i=this.cache,s=e.length,o=Qa(t,s);Ct(i,o)||(n.uniform1iv(this.addr,o),Pt(i,o));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Xh,o[a])}function kv(n,e,t){const i=this.cache,s=e.length,o=Qa(t,s);Ct(i,o)||(n.uniform1iv(this.addr,o),Pt(i,o));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||qh,o[a])}function Hv(n,e,t){const i=this.cache,s=e.length,o=Qa(t,s);Ct(i,o)||(n.uniform1iv(this.addr,o),Pt(i,o));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Wh,o[a])}function Vv(n){switch(n){case 5126:return Sv;case 35664:return wv;case 35665:return Ev;case 35666:return Tv;case 35674:return Av;case 35675:return Rv;case 35676:return Cv;case 5124:case 35670:return Pv;case 35667:case 35671:return Lv;case 35668:case 35672:return Dv;case 35669:case 35673:return Iv;case 5125:return Uv;case 36294:return Nv;case 36295:return zv;case 36296:return Ov;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Bv;case 35680:case 36300:case 36308:case 36293:return kv;case 36289:case 36303:case 36311:case 36292:return Hv}}class Gv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=bv(t.type)}}class Wv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vv(t.type)}}class Xv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let o=0,a=s.length;o!==a;++o){const r=s[o];r.setValue(e,t[r.id],i)}}}const Oc=/(\w+)(\])?(\[|\.)?/g;function Od(n,e){n.seq.push(e),n.map[e.id]=e}function qv(n,e,t){const i=n.name,s=i.length;for(Oc.lastIndex=0;;){const o=Oc.exec(i),a=Oc.lastIndex;let r=o[1];const c=o[2]==="]",l=o[3];if(c&&(r=r|0),l===void 0||l==="["&&a+2===s){Od(t,l===void 0?new Gv(r,n,e):new Wv(r,n,e));break}else{let d=t.map[r];d===void 0&&(d=new Xv(r),Od(t,d)),t=d}}}class Qr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),a=e.getUniformLocation(t,o.name);qv(o,a,this)}}setValue(e,t,i,s){const o=this.map[t];o!==void 0&&o.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let o=0,a=t.length;o!==a;++o){const r=t[o],c=i[r.id];c.needsUpdate!==!1&&r.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,o=e.length;s!==o;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Fd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Yv=37297;let jv=0;function $v(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let a=s;a<o;a++){const r=a+1;i.push(`${r===e?">":" "} ${r}: ${t[a]}`)}return i.join(`
`)}function Kv(n){const e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(n);let i;switch(e===t?i="":e===Sa&&t===ba?i="LinearDisplayP3ToLinearSRGB":e===ba&&t===Sa&&(i="LinearSRGBToLinearDisplayP3"),n){case hi:case Ka:return[i,"LinearTransferOETF"];case kt:case eu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Bd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+$v(n.getShaderSource(e),a)}else return s}function Zv(n,e){const t=Kv(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Jv(n,e){let t;switch(e){case Jm:t="Linear";break;case Qm:t="Reinhard";break;case e0:t="OptimizedCineon";break;case xh:t="ACESFilmic";break;case n0:t="AgX";break;case t0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Qv(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Gs).join(`
`)}function eM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Gs).join(`
`)}function tM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function nM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(e,s),a=o.name;let r=1;o.type===n.FLOAT_MAT2&&(r=2),o.type===n.FLOAT_MAT3&&(r=3),o.type===n.FLOAT_MAT4&&(r=4),t[a]={type:o.type,location:n.getAttribLocation(e,a),locationSize:r}}return t}function Gs(n){return n!==""}function kd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iM=/^[ \t]*#include +<([\w\d./]+)>/gm;function pl(n){return n.replace(iM,oM)}const sM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function oM(n,e){let t=Be[e];if(t===void 0){const i=sM.get(e);if(i!==void 0)t=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return pl(t)}const rM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(n){return n.replace(rM,aM)}function aM(n,e,t,i){let s="";for(let o=parseInt(e);o<parseInt(t);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Gd(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ii&&(e="SHADOWMAP_TYPE_VSM"),e}function lM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case co:case lo:e="ENVMAP_TYPE_CUBE";break;case $a:e="ENVMAP_TYPE_CUBE_UV";break}return e}function uM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function dM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _h:e="ENVMAP_BLENDING_MULTIPLY";break;case Km:e="ENVMAP_BLENDING_MIX";break;case Zm:e="ENVMAP_BLENDING_ADD";break}return e}function fM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function hM(n,e,t,i){const s=n.getContext(),o=t.defines;let a=t.vertexShader,r=t.fragmentShader;const c=cM(t),l=lM(t),u=uM(t),d=dM(t),f=fM(t),p=t.isWebGL2?"":Qv(t),g=eM(t),_=tM(o),m=s.createProgram();let h,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Gs).join(`
`),h.length>0&&(h+=`
`),v=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Gs).join(`
`),v.length>0&&(v+=`
`)):(h=[Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),v=[p,Gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zi?"#define TONE_MAPPING":"",t.toneMapping!==zi?Be.tonemapping_pars_fragment:"",t.toneMapping!==zi?Jv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,Zv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gs).join(`
`)),a=pl(a),a=kd(a,t),a=Hd(a,t),r=pl(r),r=kd(r,t),r=Hd(r,t),a=Vd(a),r=Vd(r),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,h=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=x+h+a,b=x+v+r,y=Fd(s,s.VERTEX_SHADER,M),w=Fd(s,s.FRAGMENT_SHADER,b);s.attachShader(m,y),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function P(F){if(n.debug.checkShaderErrors){const $=s.getProgramInfoLog(m).trim(),D=s.getShaderInfoLog(y).trim(),B=s.getShaderInfoLog(w).trim();let X=!0,k=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,y,w);else{const z=Bd(s,y,"vertex"),j=Bd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+z+`
`+j)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(D===""||B==="")&&(k=!1);k&&(F.diagnostics={runnable:X,programLog:$,vertexShader:{log:D,prefix:h},fragmentShader:{log:B,prefix:v}})}s.deleteShader(y),s.deleteShader(w),S=new Qr(s,m),T=nM(s,m)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(m,Yv)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jv++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=y,this.fragmentShader=w,this}let pM=0;class mM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new gM(e),t.set(e,i)),i}}class gM{constructor(e){this.id=pM++,this.code=e,this.usedTimes=0}}function _M(n,e,t,i,s,o,a){const r=new nu,c=new mM,l=[],u=s.isWebGL2,d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,T,N,F,$){const D=F.fog,B=$.geometry,X=S.isMeshStandardMaterial?F.environment:null,k=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),z=k&&k.mapping===$a?k.image.height:null,j=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const K=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,te=K!==void 0?K.length:0;let ee=0;B.morphAttributes.position!==void 0&&(ee=1),B.morphAttributes.normal!==void 0&&(ee=2),B.morphAttributes.color!==void 0&&(ee=3);let Y,Z,de,Me;if(j){const $t=Yn[j];Y=$t.vertexShader,Z=$t.fragmentShader}else Y=S.vertexShader,Z=S.fragmentShader,c.update(S),de=c.getVertexShaderID(S),Me=c.getFragmentShaderID(S);const xe=n.getRenderTarget(),Ue=$.isInstancedMesh===!0,Oe=$.isBatchedMesh===!0,Re=!!S.map,je=!!S.matcap,H=!!k,jt=!!S.aoMap,Se=!!S.lightMap,De=!!S.bumpMap,me=!!S.normalMap,ft=!!S.displacementMap,ke=!!S.emissiveMap,R=!!S.metalnessMap,E=!!S.roughnessMap,G=S.anisotropy>0,se=S.clearcoat>0,ie=S.iridescence>0,oe=S.sheen>0,ge=S.transmission>0,ue=G&&!!S.anisotropyMap,he=se&&!!S.clearcoatMap,Ae=se&&!!S.clearcoatNormalMap,He=se&&!!S.clearcoatRoughnessMap,ne=ie&&!!S.iridescenceMap,Je=ie&&!!S.iridescenceThicknessMap,qe=oe&&!!S.sheenColorMap,Le=oe&&!!S.sheenRoughnessMap,ye=!!S.specularMap,pe=!!S.specularColorMap,Fe=!!S.specularIntensityMap,Ze=ge&&!!S.transmissionMap,gt=ge&&!!S.thicknessMap,Ge=!!S.gradientMap,re=!!S.alphaMap,I=S.alphaTest>0,ce=!!S.alphaHash,le=!!S.extensions,Ce=!!B.attributes.uv1,we=!!B.attributes.uv2,st=!!B.attributes.uv3;let ot=zi;return S.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(ot=n.toneMapping),{isWebGL2:u,shaderID:j,shaderType:S.type,shaderName:S.name,vertexShader:Y,fragmentShader:Z,defines:S.defines,customVertexShaderID:de,customFragmentShaderID:Me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Oe,instancing:Ue,instancingColor:Ue&&$.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?n.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:hi,map:Re,matcap:je,envMap:H,envMapMode:H&&k.mapping,envMapCubeUVHeight:z,aoMap:jt,lightMap:Se,bumpMap:De,normalMap:me,displacementMap:f&&ft,emissiveMap:ke,normalMapObjectSpace:me&&S.normalMapType===p0,normalMapTangentSpace:me&&S.normalMapType===Rh,metalnessMap:R,roughnessMap:E,anisotropy:G,anisotropyMap:ue,clearcoat:se,clearcoatMap:he,clearcoatNormalMap:Ae,clearcoatRoughnessMap:He,iridescence:ie,iridescenceMap:ne,iridescenceThicknessMap:Je,sheen:oe,sheenColorMap:qe,sheenRoughnessMap:Le,specularMap:ye,specularColorMap:pe,specularIntensityMap:Fe,transmission:ge,transmissionMap:Ze,thicknessMap:gt,gradientMap:Ge,opaque:S.transparent===!1&&S.blending===us,alphaMap:re,alphaTest:I,alphaHash:ce,combine:S.combine,mapUv:Re&&_(S.map.channel),aoMapUv:jt&&_(S.aoMap.channel),lightMapUv:Se&&_(S.lightMap.channel),bumpMapUv:De&&_(S.bumpMap.channel),normalMapUv:me&&_(S.normalMap.channel),displacementMapUv:ft&&_(S.displacementMap.channel),emissiveMapUv:ke&&_(S.emissiveMap.channel),metalnessMapUv:R&&_(S.metalnessMap.channel),roughnessMapUv:E&&_(S.roughnessMap.channel),anisotropyMapUv:ue&&_(S.anisotropyMap.channel),clearcoatMapUv:he&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Le&&_(S.sheenRoughnessMap.channel),specularMapUv:ye&&_(S.specularMap.channel),specularColorMapUv:pe&&_(S.specularColorMap.channel),specularIntensityMapUv:Fe&&_(S.specularIntensityMap.channel),transmissionMapUv:Ze&&_(S.transmissionMap.channel),thicknessMapUv:gt&&_(S.thicknessMap.channel),alphaMapUv:re&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(me||G),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ce,vertexUv2s:we,vertexUv3s:st,pointsUvs:$.isPoints===!0&&!!B.attributes.uv&&(Re||re),fog:!!D,useFog:S.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:$.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ee,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ot,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Re&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===ct,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===On,flipSided:S.side===cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:le&&S.extensions.derivatives===!0,extensionFragDepth:le&&S.extensions.fragDepth===!0,extensionDrawBuffers:le&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function h(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)T.push(N),T.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(v(T,S),x(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function v(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function x(S,T){r.disableAll(),T.isWebGL2&&r.enable(0),T.supportsVertexTextures&&r.enable(1),T.instancing&&r.enable(2),T.instancingColor&&r.enable(3),T.matcap&&r.enable(4),T.envMap&&r.enable(5),T.normalMapObjectSpace&&r.enable(6),T.normalMapTangentSpace&&r.enable(7),T.clearcoat&&r.enable(8),T.iridescence&&r.enable(9),T.alphaTest&&r.enable(10),T.vertexColors&&r.enable(11),T.vertexAlphas&&r.enable(12),T.vertexUv1s&&r.enable(13),T.vertexUv2s&&r.enable(14),T.vertexUv3s&&r.enable(15),T.vertexTangents&&r.enable(16),T.anisotropy&&r.enable(17),T.alphaHash&&r.enable(18),T.batching&&r.enable(19),S.push(r.mask),r.disableAll(),T.fog&&r.enable(0),T.useFog&&r.enable(1),T.flatShading&&r.enable(2),T.logarithmicDepthBuffer&&r.enable(3),T.skinning&&r.enable(4),T.morphTargets&&r.enable(5),T.morphNormals&&r.enable(6),T.morphColors&&r.enable(7),T.premultipliedAlpha&&r.enable(8),T.shadowMapEnabled&&r.enable(9),T.useLegacyLights&&r.enable(10),T.doubleSided&&r.enable(11),T.flipSided&&r.enable(12),T.useDepthPacking&&r.enable(13),T.dithering&&r.enable(14),T.transmission&&r.enable(15),T.sheen&&r.enable(16),T.opaque&&r.enable(17),T.pointsUvs&&r.enable(18),T.decodeVideoTexture&&r.enable(19),S.push(r.mask)}function M(S){const T=g[S.type];let N;if(T){const F=Yn[T];N=Aa.clone(F.uniforms)}else N=S.uniforms;return N}function b(S,T){let N;for(let F=0,$=l.length;F<$;F++){const D=l[F];if(D.cacheKey===T){N=D,++N.usedTimes;break}}return N===void 0&&(N=new hM(n,T,S,o),l.push(N)),N}function y(S){if(--S.usedTimes===0){const T=l.indexOf(S);l[T]=l[l.length-1],l.pop(),S.destroy()}}function w(S){c.remove(S)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:M,acquireProgram:b,releaseProgram:y,releaseShaderCache:w,programs:l,dispose:P}}function xM(){let n=new WeakMap;function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function t(o){n.delete(o)}function i(o,a,r){n.get(o)[a]=r}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function vM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Wd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Xd(){const n=[];let e=0;const t=[],i=[],s=[];function o(){e=0,t.length=0,i.length=0,s.length=0}function a(d,f,p,g,_,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=m),e++,h}function r(d,f,p,g,_,m){const h=a(d,f,p,g,_,m);p.transmission>0?i.push(h):p.transparent===!0?s.push(h):t.push(h)}function c(d,f,p,g,_,m){const h=a(d,f,p,g,_,m);p.transmission>0?i.unshift(h):p.transparent===!0?s.unshift(h):t.unshift(h)}function l(d,f){t.length>1&&t.sort(d||vM),i.length>1&&i.sort(f||Wd),s.length>1&&s.sort(f||Wd)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:o,push:r,unshift:c,finish:u,sort:l}}function MM(){let n=new WeakMap;function e(i,s){const o=n.get(i);let a;return o===void 0?(a=new Xd,n.set(i,[a])):s>=o.length?(a=new Xd,o.push(a)):a=o[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function yM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new be};break;case"SpotLight":t={position:new U,direction:new U,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function bM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let SM=0;function wM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function EM(n,e){const t=new yM,i=bM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new U);const o=new U,a=new Mt,r=new Mt;function c(u,d){let f=0,p=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let _=0,m=0,h=0,v=0,x=0,M=0,b=0,y=0,w=0,P=0,S=0;u.sort(wM);const T=d===!0?Math.PI:1;for(let F=0,$=u.length;F<$;F++){const D=u[F],B=D.color,X=D.intensity,k=D.distance,z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=B.r*X*T,p+=B.g*X*T,g+=B.b*X*T;else if(D.isLightProbe){for(let j=0;j<9;j++)s.probe[j].addScaledVector(D.sh.coefficients[j],X);S++}else if(D.isDirectionalLight){const j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){const K=D.shadow,te=i.get(D);te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,s.directionalShadow[_]=te,s.directionalShadowMap[_]=z,s.directionalShadowMatrix[_]=D.shadow.matrix,M++}s.directional[_]=j,_++}else if(D.isSpotLight){const j=t.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(B).multiplyScalar(X*T),j.distance=k,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,s.spot[h]=j;const K=D.shadow;if(D.map&&(s.spotLightMap[w]=D.map,w++,K.updateMatrices(D),D.castShadow&&P++),s.spotLightMatrix[h]=K.matrix,D.castShadow){const te=i.get(D);te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,s.spotShadow[h]=te,s.spotShadowMap[h]=z,y++}h++}else if(D.isRectAreaLight){const j=t.get(D);j.color.copy(B).multiplyScalar(X),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),s.rectArea[v]=j,v++}else if(D.isPointLight){const j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*T),j.distance=D.distance,j.decay=D.decay,D.castShadow){const K=D.shadow,te=i.get(D);te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,te.shadowCameraNear=K.camera.near,te.shadowCameraFar=K.camera.far,s.pointShadow[m]=te,s.pointShadowMap[m]=z,s.pointShadowMatrix[m]=D.shadow.matrix,b++}s.point[m]=j,m++}else if(D.isHemisphereLight){const j=t.get(D);j.skyColor.copy(D.color).multiplyScalar(X*T),j.groundColor.copy(D.groundColor).multiplyScalar(X*T),s.hemi[x]=j,x++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ae.LTC_FLOAT_1,s.rectAreaLTC2=ae.LTC_FLOAT_2):(s.rectAreaLTC1=ae.LTC_HALF_1,s.rectAreaLTC2=ae.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ae.LTC_FLOAT_1,s.rectAreaLTC2=ae.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ae.LTC_HALF_1,s.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=g;const N=s.hash;(N.directionalLength!==_||N.pointLength!==m||N.spotLength!==h||N.rectAreaLength!==v||N.hemiLength!==x||N.numDirectionalShadows!==M||N.numPointShadows!==b||N.numSpotShadows!==y||N.numSpotMaps!==w||N.numLightProbes!==S)&&(s.directional.length=_,s.spot.length=h,s.rectArea.length=v,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=b,s.pointShadowMap.length=b,s.spotShadow.length=y,s.spotShadowMap.length=y,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=b,s.spotLightMatrix.length=y+w-P,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=S,N.directionalLength=_,N.pointLength=m,N.spotLength=h,N.rectAreaLength=v,N.hemiLength=x,N.numDirectionalShadows=M,N.numPointShadows=b,N.numSpotShadows=y,N.numSpotMaps=w,N.numLightProbes=S,s.version=SM++)}function l(u,d){let f=0,p=0,g=0,_=0,m=0;const h=d.matrixWorldInverse;for(let v=0,x=u.length;v<x;v++){const M=u[v];if(M.isDirectionalLight){const b=s.directional[f];b.direction.setFromMatrixPosition(M.matrixWorld),o.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(o),b.direction.transformDirection(h),f++}else if(M.isSpotLight){const b=s.spot[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(h),b.direction.setFromMatrixPosition(M.matrixWorld),o.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(o),b.direction.transformDirection(h),g++}else if(M.isRectAreaLight){const b=s.rectArea[_];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(h),r.identity(),a.copy(M.matrixWorld),a.premultiply(h),r.extractRotation(a),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(r),b.halfHeight.applyMatrix4(r),_++}else if(M.isPointLight){const b=s.point[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(h),p++}else if(M.isHemisphereLight){const b=s.hemi[m];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(h),m++}}}return{setup:c,setupView:l,state:s}}function qd(n,e){const t=new EM(n,e),i=[],s=[];function o(){i.length=0,s.length=0}function a(d){i.push(d)}function r(d){s.push(d)}function c(d){t.setup(i,d)}function l(d){t.setupView(i,d)}return{init:o,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:r}}function TM(n,e){let t=new WeakMap;function i(o,a=0){const r=t.get(o);let c;return r===void 0?(c=new qd(n,e),t.set(o,[c])):a>=r.length?(c=new qd(n,e),r.push(c)):c=r[a],c}function s(){t=new WeakMap}return{get:i,dispose:s}}class AM extends ys{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=f0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class RM extends ys{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const CM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function LM(n,e,t){let i=new iu;const s=new Te,o=new Te,a=new Ft,r=new AM({depthPacking:h0}),c=new RM,l={},u=t.maxTextureSize,d={[Fi]:cn,[cn]:Fi,[On]:On},f=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:CM,fragmentShader:PM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new L(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gh;let h=this.type;this.render=function(y,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const S=n.getRenderTarget(),T=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),F=n.state;F.setBlending(ui),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const $=h!==ii&&this.type===ii,D=h===ii&&this.type!==ii;for(let B=0,X=y.length;B<X;B++){const k=y[B],z=k.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const j=z.getFrameExtents();if(s.multiply(j),o.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/j.x),s.x=o.x*j.x,z.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/j.y),s.y=o.y*j.y,z.mapSize.y=o.y)),z.map===null||$===!0||D===!0){const te=this.type!==ii?{minFilter:nn,magFilter:nn}:{};z.map!==null&&z.map.dispose(),z.map=new kn(s.x,s.y,te),z.map.texture.name=k.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const K=z.getViewportCount();for(let te=0;te<K;te++){const ee=z.getViewport(te);a.set(o.x*ee.x,o.y*ee.y,o.x*ee.z,o.y*ee.w),F.viewport(a),z.updateMatrices(k,te),i=z.getFrustum(),M(w,P,z.camera,k,this.type)}z.isPointLightShadow!==!0&&this.type===ii&&v(z,P),z.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(S,T,N)};function v(y,w){const P=e.update(_);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new kn(s.x,s.y)),f.uniforms.shadow_pass.value=y.map.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(w,null,P,f,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(w,null,P,p,_,null)}function x(y,w,P,S){let T=null;const N=P.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(N!==void 0)T=N;else if(T=P.isPointLight===!0?c:r,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const F=T.uuid,$=w.uuid;let D=l[F];D===void 0&&(D={},l[F]=D);let B=D[$];B===void 0&&(B=T.clone(),D[$]=B,w.addEventListener("dispose",b)),T=B}if(T.visible=w.visible,T.wireframe=w.wireframe,S===ii?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:d[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,P.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const F=n.properties.get(T);F.light=P}return T}function M(y,w,P,S,T){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&T===ii)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,y.matrixWorld);const $=e.update(y),D=y.material;if(Array.isArray(D)){const B=$.groups;for(let X=0,k=B.length;X<k;X++){const z=B[X],j=D[z.materialIndex];if(j&&j.visible){const K=x(y,j,S,T);y.onBeforeShadow(n,y,w,P,$,K,z),n.renderBufferDirect(P,null,$,K,y,z),y.onAfterShadow(n,y,w,P,$,K,z)}}}else if(D.visible){const B=x(y,D,S,T);y.onBeforeShadow(n,y,w,P,$,B,null),n.renderBufferDirect(P,null,$,B,y,null),y.onAfterShadow(n,y,w,P,$,B,null)}}const F=y.children;for(let $=0,D=F.length;$<D;$++)M(F[$],w,P,S,T)}function b(y){y.target.removeEventListener("dispose",b);for(const P in l){const S=l[P],T=y.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}function DM(n,e,t){const i=t.isWebGL2;function s(){let I=!1;const ce=new Ft;let le=null;const Ce=new Ft(0,0,0,0);return{setMask:function(we){le!==we&&!I&&(n.colorMask(we,we,we,we),le=we)},setLocked:function(we){I=we},setClear:function(we,st,ot,Lt,$t){$t===!0&&(we*=Lt,st*=Lt,ot*=Lt),ce.set(we,st,ot,Lt),Ce.equals(ce)===!1&&(n.clearColor(we,st,ot,Lt),Ce.copy(ce))},reset:function(){I=!1,le=null,Ce.set(-1,0,0,0)}}}function o(){let I=!1,ce=null,le=null,Ce=null;return{setTest:function(we){we?Oe(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(we){ce!==we&&!I&&(n.depthMask(we),ce=we)},setFunc:function(we){if(le!==we){switch(we){case Gm:n.depthFunc(n.NEVER);break;case Wm:n.depthFunc(n.ALWAYS);break;case Xm:n.depthFunc(n.LESS);break;case Ma:n.depthFunc(n.LEQUAL);break;case qm:n.depthFunc(n.EQUAL);break;case Ym:n.depthFunc(n.GEQUAL);break;case jm:n.depthFunc(n.GREATER);break;case $m:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=we}},setLocked:function(we){I=we},setClear:function(we){Ce!==we&&(n.clearDepth(we),Ce=we)},reset:function(){I=!1,ce=null,le=null,Ce=null}}}function a(){let I=!1,ce=null,le=null,Ce=null,we=null,st=null,ot=null,Lt=null,$t=null;return{setTest:function(rt){I||(rt?Oe(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(rt){ce!==rt&&!I&&(n.stencilMask(rt),ce=rt)},setFunc:function(rt,Kt,Wn){(le!==rt||Ce!==Kt||we!==Wn)&&(n.stencilFunc(rt,Kt,Wn),le=rt,Ce=Kt,we=Wn)},setOp:function(rt,Kt,Wn){(st!==rt||ot!==Kt||Lt!==Wn)&&(n.stencilOp(rt,Kt,Wn),st=rt,ot=Kt,Lt=Wn)},setLocked:function(rt){I=rt},setClear:function(rt){$t!==rt&&(n.clearStencil(rt),$t=rt)},reset:function(){I=!1,ce=null,le=null,Ce=null,we=null,st=null,ot=null,Lt=null,$t=null}}}const r=new s,c=new o,l=new a,u=new WeakMap,d=new WeakMap;let f={},p={},g=new WeakMap,_=[],m=null,h=!1,v=null,x=null,M=null,b=null,y=null,w=null,P=null,S=new be(0,0,0),T=0,N=!1,F=null,$=null,D=null,B=null,X=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,j=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=j>=1):K.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=j>=2);let te=null,ee={};const Y=n.getParameter(n.SCISSOR_BOX),Z=n.getParameter(n.VIEWPORT),de=new Ft().fromArray(Y),Me=new Ft().fromArray(Z);function xe(I,ce,le,Ce){const we=new Uint8Array(4),st=n.createTexture();n.bindTexture(I,st),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ot=0;ot<le;ot++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(ce,0,n.RGBA,1,1,Ce,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(ce+ot,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return st}const Ue={};Ue[n.TEXTURE_2D]=xe(n.TEXTURE_2D,n.TEXTURE_2D,1),Ue[n.TEXTURE_CUBE_MAP]=xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ue[n.TEXTURE_2D_ARRAY]=xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ue[n.TEXTURE_3D]=xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),r.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Oe(n.DEPTH_TEST),c.setFunc(Ma),ke(!1),R(Ru),Oe(n.CULL_FACE),me(ui);function Oe(I){f[I]!==!0&&(n.enable(I),f[I]=!0)}function Re(I){f[I]!==!1&&(n.disable(I),f[I]=!1)}function je(I,ce){return p[I]!==ce?(n.bindFramebuffer(I,ce),p[I]=ce,i&&(I===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ce),I===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ce)),!0):!1}function H(I,ce){let le=_,Ce=!1;if(I)if(le=g.get(ce),le===void 0&&(le=[],g.set(ce,le)),I.isWebGLMultipleRenderTargets){const we=I.texture;if(le.length!==we.length||le[0]!==n.COLOR_ATTACHMENT0){for(let st=0,ot=we.length;st<ot;st++)le[st]=n.COLOR_ATTACHMENT0+st;le.length=we.length,Ce=!0}}else le[0]!==n.COLOR_ATTACHMENT0&&(le[0]=n.COLOR_ATTACHMENT0,Ce=!0);else le[0]!==n.BACK&&(le[0]=n.BACK,Ce=!0);Ce&&(t.isWebGL2?n.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function jt(I){return m!==I?(n.useProgram(I),m=I,!0):!1}const Se={[ts]:n.FUNC_ADD,[Rm]:n.FUNC_SUBTRACT,[Cm]:n.FUNC_REVERSE_SUBTRACT};if(i)Se[Lu]=n.MIN,Se[Du]=n.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Se[Lu]=I.MIN_EXT,Se[Du]=I.MAX_EXT)}const De={[Pm]:n.ZERO,[Lm]:n.ONE,[Dm]:n.SRC_COLOR,[rl]:n.SRC_ALPHA,[Fm]:n.SRC_ALPHA_SATURATE,[zm]:n.DST_COLOR,[Um]:n.DST_ALPHA,[Im]:n.ONE_MINUS_SRC_COLOR,[al]:n.ONE_MINUS_SRC_ALPHA,[Om]:n.ONE_MINUS_DST_COLOR,[Nm]:n.ONE_MINUS_DST_ALPHA,[Bm]:n.CONSTANT_COLOR,[km]:n.ONE_MINUS_CONSTANT_COLOR,[Hm]:n.CONSTANT_ALPHA,[Vm]:n.ONE_MINUS_CONSTANT_ALPHA};function me(I,ce,le,Ce,we,st,ot,Lt,$t,rt){if(I===ui){h===!0&&(Re(n.BLEND),h=!1);return}if(h===!1&&(Oe(n.BLEND),h=!0),I!==Am){if(I!==v||rt!==N){if((x!==ts||y!==ts)&&(n.blendEquation(n.FUNC_ADD),x=ts,y=ts),rt)switch(I){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case va:n.blendFunc(n.ONE,n.ONE);break;case Cu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case va:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Cu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,b=null,w=null,P=null,S.set(0,0,0),T=0,v=I,N=rt}return}we=we||ce,st=st||le,ot=ot||Ce,(ce!==x||we!==y)&&(n.blendEquationSeparate(Se[ce],Se[we]),x=ce,y=we),(le!==M||Ce!==b||st!==w||ot!==P)&&(n.blendFuncSeparate(De[le],De[Ce],De[st],De[ot]),M=le,b=Ce,w=st,P=ot),(Lt.equals(S)===!1||$t!==T)&&(n.blendColor(Lt.r,Lt.g,Lt.b,$t),S.copy(Lt),T=$t),v=I,N=!1}function ft(I,ce){I.side===On?Re(n.CULL_FACE):Oe(n.CULL_FACE);let le=I.side===cn;ce&&(le=!le),ke(le),I.blending===us&&I.transparent===!1?me(ui):me(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),r.setMask(I.colorWrite);const Ce=I.stencilWrite;l.setTest(Ce),Ce&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),G(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Oe(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function ke(I){F!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),F=I)}function R(I){I!==wm?(Oe(n.CULL_FACE),I!==$&&(I===Ru?n.cullFace(n.BACK):I===Em?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),$=I}function E(I){I!==D&&(z&&n.lineWidth(I),D=I)}function G(I,ce,le){I?(Oe(n.POLYGON_OFFSET_FILL),(B!==ce||X!==le)&&(n.polygonOffset(ce,le),B=ce,X=le)):Re(n.POLYGON_OFFSET_FILL)}function se(I){I?Oe(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function ie(I){I===void 0&&(I=n.TEXTURE0+k-1),te!==I&&(n.activeTexture(I),te=I)}function oe(I,ce,le){le===void 0&&(te===null?le=n.TEXTURE0+k-1:le=te);let Ce=ee[le];Ce===void 0&&(Ce={type:void 0,texture:void 0},ee[le]=Ce),(Ce.type!==I||Ce.texture!==ce)&&(te!==le&&(n.activeTexture(le),te=le),n.bindTexture(I,ce||Ue[I]),Ce.type=I,Ce.texture=ce)}function ge(){const I=ee[te];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ue(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function He(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Je(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qe(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ye(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Fe(I){de.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),de.copy(I))}function Ze(I){Me.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Me.copy(I))}function gt(I,ce){let le=d.get(ce);le===void 0&&(le=new WeakMap,d.set(ce,le));let Ce=le.get(I);Ce===void 0&&(Ce=n.getUniformBlockIndex(ce,I.name),le.set(I,Ce))}function Ge(I,ce){const Ce=d.get(ce).get(I);u.get(ce)!==Ce&&(n.uniformBlockBinding(ce,Ce,I.__bindingPointIndex),u.set(ce,Ce))}function re(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},te=null,ee={},p={},g=new WeakMap,_=[],m=null,h=!1,v=null,x=null,M=null,b=null,y=null,w=null,P=null,S=new be(0,0,0),T=0,N=!1,F=null,$=null,D=null,B=null,X=null,de.set(0,0,n.canvas.width,n.canvas.height),Me.set(0,0,n.canvas.width,n.canvas.height),r.reset(),c.reset(),l.reset()}return{buffers:{color:r,depth:c,stencil:l},enable:Oe,disable:Re,bindFramebuffer:je,drawBuffers:H,useProgram:jt,setBlending:me,setMaterial:ft,setFlipSided:ke,setCullFace:R,setLineWidth:E,setPolygonOffset:G,setScissorTest:se,activeTexture:ie,bindTexture:oe,unbindTexture:ge,compressedTexImage2D:ue,compressedTexImage3D:he,texImage2D:ye,texImage3D:pe,updateUBOMapping:gt,uniformBlockBinding:Ge,texStorage2D:qe,texStorage3D:Le,texSubImage2D:Ae,texSubImage3D:He,compressedTexSubImage2D:ne,compressedTexSubImage3D:Je,scissor:Fe,viewport:Ze,reset:re}}function IM(n,e,t,i,s,o,a){const r=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,E){return p?new OffscreenCanvas(R,E):Ta("canvas")}function _(R,E,G,se){let ie=1;if((R.width>se||R.height>se)&&(ie=se/Math.max(R.width,R.height)),ie<1||E===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const oe=E?Ea:Math.floor,ge=oe(ie*R.width),ue=oe(ie*R.height);d===void 0&&(d=g(ge,ue));const he=G?g(ge,ue):d;return he.width=ge,he.height=ue,he.getContext("2d").drawImage(R,0,0,ge,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+ge+"x"+ue+")."),he}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return hl(R.width)&&hl(R.height)}function h(R){return r?!1:R.wrapS!==Fn||R.wrapT!==Fn||R.minFilter!==nn&&R.minFilter!==Tn}function v(R,E){return R.generateMipmaps&&E&&R.minFilter!==nn&&R.minFilter!==Tn}function x(R){n.generateMipmap(R)}function M(R,E,G,se,ie=!1){if(r===!1)return E;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let oe=E;if(E===n.RED&&(G===n.FLOAT&&(oe=n.R32F),G===n.HALF_FLOAT&&(oe=n.R16F),G===n.UNSIGNED_BYTE&&(oe=n.R8)),E===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.R8UI),G===n.UNSIGNED_SHORT&&(oe=n.R16UI),G===n.UNSIGNED_INT&&(oe=n.R32UI),G===n.BYTE&&(oe=n.R8I),G===n.SHORT&&(oe=n.R16I),G===n.INT&&(oe=n.R32I)),E===n.RG&&(G===n.FLOAT&&(oe=n.RG32F),G===n.HALF_FLOAT&&(oe=n.RG16F),G===n.UNSIGNED_BYTE&&(oe=n.RG8)),E===n.RGBA){const ge=ie?ya:Qe.getTransfer(se);G===n.FLOAT&&(oe=n.RGBA32F),G===n.HALF_FLOAT&&(oe=n.RGBA16F),G===n.UNSIGNED_BYTE&&(oe=ge===ct?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function b(R,E,G){return v(R,G)===!0||R.isFramebufferTexture&&R.minFilter!==nn&&R.minFilter!==Tn?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function y(R){return R===nn||R===Iu||R===uc?n.NEAREST:n.LINEAR}function w(R){const E=R.target;E.removeEventListener("dispose",w),S(E),E.isVideoTexture&&u.delete(E)}function P(R){const E=R.target;E.removeEventListener("dispose",P),N(E)}function S(R){const E=i.get(R);if(E.__webglInit===void 0)return;const G=R.source,se=f.get(G);if(se){const ie=se[E.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&T(R),Object.keys(se).length===0&&f.delete(G)}i.remove(R)}function T(R){const E=i.get(R);n.deleteTexture(E.__webglTexture);const G=R.source,se=f.get(G);delete se[E.__cacheKey],a.memory.textures--}function N(R){const E=R.texture,G=i.get(R),se=i.get(E);if(se.__webglTexture!==void 0&&(n.deleteTexture(se.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(G.__webglFramebuffer[ie]))for(let oe=0;oe<G.__webglFramebuffer[ie].length;oe++)n.deleteFramebuffer(G.__webglFramebuffer[ie][oe]);else n.deleteFramebuffer(G.__webglFramebuffer[ie]);G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer[ie])}else{if(Array.isArray(G.__webglFramebuffer))for(let ie=0;ie<G.__webglFramebuffer.length;ie++)n.deleteFramebuffer(G.__webglFramebuffer[ie]);else n.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&n.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let ie=0;ie<G.__webglColorRenderbuffer.length;ie++)G.__webglColorRenderbuffer[ie]&&n.deleteRenderbuffer(G.__webglColorRenderbuffer[ie]);G.__webglDepthRenderbuffer&&n.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ie=0,oe=E.length;ie<oe;ie++){const ge=i.get(E[ie]);ge.__webglTexture&&(n.deleteTexture(ge.__webglTexture),a.memory.textures--),i.remove(E[ie])}i.remove(E),i.remove(R)}let F=0;function $(){F=0}function D(){const R=F;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),F+=1,R}function B(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function X(R,E){const G=i.get(R);if(R.isVideoTexture&&ft(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(G,R,E);return}}t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+E)}function k(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){de(G,R,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+E)}function z(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){de(G,R,E);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+E)}function j(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Me(G,R,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+E)}const K={[ul]:n.REPEAT,[Fn]:n.CLAMP_TO_EDGE,[dl]:n.MIRRORED_REPEAT},te={[nn]:n.NEAREST,[Iu]:n.NEAREST_MIPMAP_NEAREST,[uc]:n.NEAREST_MIPMAP_LINEAR,[Tn]:n.LINEAR,[i0]:n.LINEAR_MIPMAP_NEAREST,[Qo]:n.LINEAR_MIPMAP_LINEAR},ee={[m0]:n.NEVER,[y0]:n.ALWAYS,[g0]:n.LESS,[Ch]:n.LEQUAL,[_0]:n.EQUAL,[M0]:n.GEQUAL,[x0]:n.GREATER,[v0]:n.NOTEQUAL};function Y(R,E,G){if(G?(n.texParameteri(R,n.TEXTURE_WRAP_S,K[E.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,K[E.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,K[E.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,te[E.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,te[E.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(E.wrapS!==Fn||E.wrapT!==Fn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,y(E.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,y(E.minFilter)),E.minFilter!==nn&&E.minFilter!==Tn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ee[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===nn||E.minFilter!==uc&&E.minFilter!==Qo||E.type===Di&&e.has("OES_texture_float_linear")===!1||r===!1&&E.type===di&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(n.texParameterf(R,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function Z(R,E){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",w));const se=E.source;let ie=f.get(se);ie===void 0&&(ie={},f.set(se,ie));const oe=B(E);if(oe!==R.__cacheKey){ie[oe]===void 0&&(ie[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ie[oe].usedTimes++;const ge=ie[R.__cacheKey];ge!==void 0&&(ie[R.__cacheKey].usedTimes--,ge.usedTimes===0&&T(E)),R.__cacheKey=oe,R.__webglTexture=ie[oe].texture}return G}function de(R,E,G){let se=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=n.TEXTURE_3D);const ie=Z(R,E),oe=E.source;t.bindTexture(se,R.__webglTexture,n.TEXTURE0+G);const ge=i.get(oe);if(oe.version!==ge.__version||ie===!0){t.activeTexture(n.TEXTURE0+G);const ue=Qe.getPrimaries(Qe.workingColorSpace),he=E.colorSpace===Pn?null:Qe.getPrimaries(E.colorSpace),Ae=E.colorSpace===Pn||ue===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const He=h(E)&&m(E.image)===!1;let ne=_(E.image,He,!1,s.maxTextureSize);ne=ke(E,ne);const Je=m(ne)||r,qe=o.convert(E.format,E.colorSpace);let Le=o.convert(E.type),ye=M(E.internalFormat,qe,Le,E.colorSpace,E.isVideoTexture);Y(se,E,Je);let pe;const Fe=E.mipmaps,Ze=r&&E.isVideoTexture!==!0&&ye!==Th,gt=ge.__version===void 0||ie===!0,Ge=b(E,ne,Je);if(E.isDepthTexture)ye=n.DEPTH_COMPONENT,r?E.type===Di?ye=n.DEPTH_COMPONENT32F:E.type===Li?ye=n.DEPTH_COMPONENT24:E.type===ds?ye=n.DEPTH24_STENCIL8:ye=n.DEPTH_COMPONENT16:E.type===Di&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===fs&&ye===n.DEPTH_COMPONENT&&E.type!==Ql&&E.type!==Li&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Li,Le=o.convert(E.type)),E.format===uo&&ye===n.DEPTH_COMPONENT&&(ye=n.DEPTH_STENCIL,E.type!==ds&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=ds,Le=o.convert(E.type))),gt&&(Ze?t.texStorage2D(n.TEXTURE_2D,1,ye,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ye,ne.width,ne.height,0,qe,Le,null));else if(E.isDataTexture)if(Fe.length>0&&Je){Ze&&gt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let re=0,I=Fe.length;re<I;re++)pe=Fe[re],Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,qe,Le,pe.data):t.texImage2D(n.TEXTURE_2D,re,ye,pe.width,pe.height,0,qe,Le,pe.data);E.generateMipmaps=!1}else Ze?(gt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,qe,Le,ne.data)):t.texImage2D(n.TEXTURE_2D,0,ye,ne.width,ne.height,0,qe,Le,ne.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ze&&gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,Fe[0].width,Fe[0].height,ne.depth);for(let re=0,I=Fe.length;re<I;re++)pe=Fe[re],E.format!==Bn?qe!==null?Ze?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ne.depth,qe,pe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,ye,pe.width,pe.height,ne.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ne.depth,qe,Le,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,ye,pe.width,pe.height,ne.depth,0,qe,Le,pe.data)}else{Ze&&gt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let re=0,I=Fe.length;re<I;re++)pe=Fe[re],E.format!==Bn?qe!==null?Ze?t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,qe,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,qe,Le,pe.data):t.texImage2D(n.TEXTURE_2D,re,ye,pe.width,pe.height,0,qe,Le,pe.data)}else if(E.isDataArrayTexture)Ze?(gt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,ye,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,qe,Le,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ye,ne.width,ne.height,ne.depth,0,qe,Le,ne.data);else if(E.isData3DTexture)Ze?(gt&&t.texStorage3D(n.TEXTURE_3D,Ge,ye,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,qe,Le,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ye,ne.width,ne.height,ne.depth,0,qe,Le,ne.data);else if(E.isFramebufferTexture){if(gt)if(Ze)t.texStorage2D(n.TEXTURE_2D,Ge,ye,ne.width,ne.height);else{let re=ne.width,I=ne.height;for(let ce=0;ce<Ge;ce++)t.texImage2D(n.TEXTURE_2D,ce,ye,re,I,0,qe,Le,null),re>>=1,I>>=1}}else if(Fe.length>0&&Je){Ze&&gt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let re=0,I=Fe.length;re<I;re++)pe=Fe[re],Ze?t.texSubImage2D(n.TEXTURE_2D,re,0,0,qe,Le,pe):t.texImage2D(n.TEXTURE_2D,re,ye,qe,Le,pe);E.generateMipmaps=!1}else Ze?(gt&&t.texStorage2D(n.TEXTURE_2D,Ge,ye,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,qe,Le,ne)):t.texImage2D(n.TEXTURE_2D,0,ye,qe,Le,ne);v(E,Je)&&x(se),ge.__version=oe.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Me(R,E,G){if(E.image.length!==6)return;const se=Z(R,E),ie=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+G);const oe=i.get(ie);if(ie.version!==oe.__version||se===!0){t.activeTexture(n.TEXTURE0+G);const ge=Qe.getPrimaries(Qe.workingColorSpace),ue=E.colorSpace===Pn?null:Qe.getPrimaries(E.colorSpace),he=E.colorSpace===Pn||ge===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ae=E.isCompressedTexture||E.image[0].isCompressedTexture,He=E.image[0]&&E.image[0].isDataTexture,ne=[];for(let re=0;re<6;re++)!Ae&&!He?ne[re]=_(E.image[re],!1,!0,s.maxCubemapSize):ne[re]=He?E.image[re].image:E.image[re],ne[re]=ke(E,ne[re]);const Je=ne[0],qe=m(Je)||r,Le=o.convert(E.format,E.colorSpace),ye=o.convert(E.type),pe=M(E.internalFormat,Le,ye,E.colorSpace),Fe=r&&E.isVideoTexture!==!0,Ze=oe.__version===void 0||se===!0;let gt=b(E,Je,qe);Y(n.TEXTURE_CUBE_MAP,E,qe);let Ge;if(Ae){Fe&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,gt,pe,Je.width,Je.height);for(let re=0;re<6;re++){Ge=ne[re].mipmaps;for(let I=0;I<Ge.length;I++){const ce=Ge[I];E.format!==Bn?Le!==null?Fe?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,0,0,ce.width,ce.height,Le,ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,pe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,0,0,ce.width,ce.height,Le,ye,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I,pe,ce.width,ce.height,0,Le,ye,ce.data)}}}else{Ge=E.mipmaps,Fe&&Ze&&(Ge.length>0&&gt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,gt,pe,ne[0].width,ne[0].height));for(let re=0;re<6;re++)if(He){Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,ne[re].width,ne[re].height,Le,ye,ne[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,pe,ne[re].width,ne[re].height,0,Le,ye,ne[re].data);for(let I=0;I<Ge.length;I++){const le=Ge[I].image[re].image;Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,0,0,le.width,le.height,Le,ye,le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,pe,le.width,le.height,0,Le,ye,le.data)}}else{Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Le,ye,ne[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,pe,Le,ye,ne[re]);for(let I=0;I<Ge.length;I++){const ce=Ge[I];Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,0,0,Le,ye,ce.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,I+1,pe,Le,ye,ce.image[re])}}}v(E,qe)&&x(n.TEXTURE_CUBE_MAP),oe.__version=ie.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function xe(R,E,G,se,ie,oe){const ge=o.convert(G.format,G.colorSpace),ue=o.convert(G.type),he=M(G.internalFormat,ge,ue,G.colorSpace);if(!i.get(E).__hasExternalTextures){const He=Math.max(1,E.width>>oe),ne=Math.max(1,E.height>>oe);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,oe,he,He,ne,E.depth,0,ge,ue,null):t.texImage2D(ie,oe,he,He,ne,0,ge,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),me(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,ie,i.get(G).__webglTexture,0,De(E)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,ie,i.get(G).__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(R,E,G){if(n.bindRenderbuffer(n.RENDERBUFFER,R),E.depthBuffer&&!E.stencilBuffer){let se=r===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(G||me(E)){const ie=E.depthTexture;ie&&ie.isDepthTexture&&(ie.type===Di?se=n.DEPTH_COMPONENT32F:ie.type===Li&&(se=n.DEPTH_COMPONENT24));const oe=De(E);me(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,se,E.width,E.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,se,E.width,E.height)}else n.renderbufferStorage(n.RENDERBUFFER,se,E.width,E.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(E.depthBuffer&&E.stencilBuffer){const se=De(E);G&&me(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,n.DEPTH24_STENCIL8,E.width,E.height):me(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,n.DEPTH24_STENCIL8,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const se=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ie=0;ie<se.length;ie++){const oe=se[ie],ge=o.convert(oe.format,oe.colorSpace),ue=o.convert(oe.type),he=M(oe.internalFormat,ge,ue,oe.colorSpace),Ae=De(E);G&&me(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,he,E.width,E.height):me(E)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,he,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,he,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Oe(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),X(E.depthTexture,0);const se=i.get(E.depthTexture).__webglTexture,ie=De(E);if(E.depthTexture.format===fs)me(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(E.depthTexture.format===uo)me(E)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Re(R){const E=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Oe(E.__webglFramebuffer,R)}else if(G){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]=n.createRenderbuffer(),Ue(E.__webglDepthbuffer[se],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=n.createRenderbuffer(),Ue(E.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(R,E,G){const se=i.get(R);E!==void 0&&xe(se.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Re(R)}function H(R){const E=R.texture,G=i.get(R),se=i.get(E);R.addEventListener("dispose",P),R.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=E.version,a.memory.textures++);const ie=R.isWebGLCubeRenderTarget===!0,oe=R.isWebGLMultipleRenderTargets===!0,ge=m(R)||r;if(ie){G.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(r&&E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[ue]=[];for(let he=0;he<E.mipmaps.length;he++)G.__webglFramebuffer[ue][he]=n.createFramebuffer()}else G.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(r&&E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let ue=0;ue<E.mipmaps.length;ue++)G.__webglFramebuffer[ue]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(oe)if(s.drawBuffers){const ue=R.texture;for(let he=0,Ae=ue.length;he<Ae;he++){const He=i.get(ue[he]);He.__webglTexture===void 0&&(He.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(r&&R.samples>0&&me(R)===!1){const ue=oe?E:[E];G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let he=0;he<ue.length;he++){const Ae=ue[he];G.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[he]);const He=o.convert(Ae.format,Ae.colorSpace),ne=o.convert(Ae.type),Je=M(Ae.internalFormat,He,ne,Ae.colorSpace,R.isXRRenderTarget===!0),qe=De(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,qe,Je,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,G.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),Ue(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Y(n.TEXTURE_CUBE_MAP,E,ge);for(let ue=0;ue<6;ue++)if(r&&E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)xe(G.__webglFramebuffer[ue][he],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,he);else xe(G.__webglFramebuffer[ue],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);v(E,ge)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){const ue=R.texture;for(let he=0,Ae=ue.length;he<Ae;he++){const He=ue[he],ne=i.get(He);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),Y(n.TEXTURE_2D,He,ge),xe(G.__webglFramebuffer,R,He,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),v(He,ge)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(r?ue=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,se.__webglTexture),Y(ue,E,ge),r&&E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)xe(G.__webglFramebuffer[he],R,E,n.COLOR_ATTACHMENT0,ue,he);else xe(G.__webglFramebuffer,R,E,n.COLOR_ATTACHMENT0,ue,0);v(E,ge)&&x(ue),t.unbindTexture()}R.depthBuffer&&Re(R)}function jt(R){const E=m(R)||r,G=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let se=0,ie=G.length;se<ie;se++){const oe=G[se];if(v(oe,E)){const ge=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ue=i.get(oe).__webglTexture;t.bindTexture(ge,ue),x(ge),t.unbindTexture()}}}function Se(R){if(r&&R.samples>0&&me(R)===!1){const E=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],G=R.width,se=R.height;let ie=n.COLOR_BUFFER_BIT;const oe=[],ge=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(R),he=R.isWebGLMultipleRenderTargets===!0;if(he)for(let Ae=0;Ae<E.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Ae=0;Ae<E.length;Ae++){oe.push(n.COLOR_ATTACHMENT0+Ae),R.depthBuffer&&oe.push(ge);const He=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(He===!1&&(R.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[Ae]),He===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ge]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ge])),he){const ne=i.get(E[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,G,se,0,0,G,se,ie,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let Ae=0;Ae<E.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,ue.__webglColorRenderbuffer[Ae]);const He=i.get(E[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,He,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function De(R){return Math.min(s.maxSamples,R.samples)}function me(R){const E=i.get(R);return r&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ft(R){const E=a.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function ke(R,E){const G=R.colorSpace,se=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===fl||G!==hi&&G!==Pn&&(Qe.getTransfer(G)===ct?r===!1?e.has("EXT_sRGB")===!0&&se===Bn?(R.format=fl,R.minFilter=Tn,R.generateMipmaps=!1):E=Lh.sRGBToLinear(E):(se!==Bn||ie!==Oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}this.allocateTextureUnit=D,this.resetTextureUnits=$,this.setTexture2D=X,this.setTexture2DArray=k,this.setTexture3D=z,this.setTextureCube=j,this.rebindTextures=je,this.setupRenderTarget=H,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=me}function UM(n,e,t){const i=t.isWebGL2;function s(o,a=Pn){let r;const c=Qe.getTransfer(a);if(o===Oi)return n.UNSIGNED_BYTE;if(o===yh)return n.UNSIGNED_SHORT_4_4_4_4;if(o===bh)return n.UNSIGNED_SHORT_5_5_5_1;if(o===s0)return n.BYTE;if(o===o0)return n.SHORT;if(o===Ql)return n.UNSIGNED_SHORT;if(o===Mh)return n.INT;if(o===Li)return n.UNSIGNED_INT;if(o===Di)return n.FLOAT;if(o===di)return i?n.HALF_FLOAT:(r=e.get("OES_texture_half_float"),r!==null?r.HALF_FLOAT_OES:null);if(o===r0)return n.ALPHA;if(o===Bn)return n.RGBA;if(o===a0)return n.LUMINANCE;if(o===c0)return n.LUMINANCE_ALPHA;if(o===fs)return n.DEPTH_COMPONENT;if(o===uo)return n.DEPTH_STENCIL;if(o===fl)return r=e.get("EXT_sRGB"),r!==null?r.SRGB_ALPHA_EXT:null;if(o===l0)return n.RED;if(o===Sh)return n.RED_INTEGER;if(o===u0)return n.RG;if(o===wh)return n.RG_INTEGER;if(o===Eh)return n.RGBA_INTEGER;if(o===dc||o===fc||o===hc||o===pc)if(c===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(o===dc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===fc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===hc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===pc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(o===dc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===fc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===hc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===pc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===Uu||o===Nu||o===zu||o===Ou)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(o===Uu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Nu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===zu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Ou)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Th)return r=e.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Fu||o===Bu)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(o===Fu)return c===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(o===Bu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===ku||o===Hu||o===Vu||o===Gu||o===Wu||o===Xu||o===qu||o===Yu||o===ju||o===$u||o===Ku||o===Zu||o===Ju||o===Qu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(o===ku)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Hu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Vu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Gu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Wu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Xu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===qu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Yu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===ju)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===$u)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Ku)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Zu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Ju)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Qu)return c===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===mc||o===ed||o===td)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(o===mc)return c===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===ed)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===td)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===d0||o===nd||o===id||o===sd)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(o===mc)return r.COMPRESSED_RED_RGTC1_EXT;if(o===nd)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===id)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===sd)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===ds?i?n.UNSIGNED_INT_24_8:(r=e.get("WEBGL_depth_texture"),r!==null?r.UNSIGNED_INT_24_8_WEBGL:null):n[o]!==void 0?n[o]:null}return{convert:s}}class NM extends Rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qt extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zM={type:"move"};class Fc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,o=null,a=null;const r=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),h=this._getHandJoint(l,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(r.matrix.fromArray(s.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,s.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(s.linearVelocity)):r.hasLinearVelocity=!1,s.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(s.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(zM)))}return r!==null&&(r.visible=s!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new qt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class OM extends _o{constructor(e,t){super();const i=this;let s=null,o=1,a=null,r="local-floor",c=1,l=null,u=null,d=null,f=null,p=null,g=null;const _=t.getContextAttributes();let m=null,h=null;const v=[],x=[],M=new Te;let b=null;const y=new Rn;y.layers.enable(1),y.viewport=new Ft;const w=new Rn;w.layers.enable(2),w.viewport=new Ft;const P=[y,w],S=new NM;S.layers.enable(1),S.layers.enable(2);let T=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=v[Y];return Z===void 0&&(Z=new Fc,v[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=v[Y];return Z===void 0&&(Z=new Fc,v[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=v[Y];return Z===void 0&&(Z=new Fc,v[Y]=Z),Z.getHandSpace()};function F(Y){const Z=x.indexOf(Y.inputSource);if(Z===-1)return;const de=v[Z];de!==void 0&&(de.update(Y.inputSource,Y.frame,l||a),de.dispatchEvent({type:Y.type,data:Y.inputSource}))}function $(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",D);for(let Y=0;Y<v.length;Y++){const Z=x[Y];Z!==null&&(x[Y]=null,v[Y].disconnect(Z))}T=null,N=null,e.setRenderTarget(m),p=null,f=null,d=null,s=null,h=null,ee.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",$),s.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(M),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),h=new kn(p.framebufferWidth,p.framebufferHeight,{format:Bn,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,de=null,Me=null;_.depth&&(Me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?uo:fs,de=_.stencil?ds:Li);const xe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:o};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),h=new kn(f.textureWidth,f.textureHeight,{format:Bn,type:Oi,depthTexture:new Hh(f.textureWidth,f.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ue=e.properties.get(h);Ue.__ignoreDepthValues=f.ignoreDepthValues}h.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(r),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(Y){for(let Z=0;Z<Y.removed.length;Z++){const de=Y.removed[Z],Me=x.indexOf(de);Me>=0&&(x[Me]=null,v[Me].disconnect(de))}for(let Z=0;Z<Y.added.length;Z++){const de=Y.added[Z];let Me=x.indexOf(de);if(Me===-1){for(let Ue=0;Ue<v.length;Ue++)if(Ue>=x.length){x.push(de),Me=Ue;break}else if(x[Ue]===null){x[Ue]=de,Me=Ue;break}if(Me===-1)break}const xe=v[Me];xe&&xe.connect(de)}}const B=new U,X=new U;function k(Y,Z,de){B.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const Me=B.distanceTo(X),xe=Z.projectionMatrix.elements,Ue=de.projectionMatrix.elements,Oe=xe[14]/(xe[10]-1),Re=xe[14]/(xe[10]+1),je=(xe[9]+1)/xe[5],H=(xe[9]-1)/xe[5],jt=(xe[8]-1)/xe[0],Se=(Ue[8]+1)/Ue[0],De=Oe*jt,me=Oe*Se,ft=Me/(-jt+Se),ke=ft*-jt;Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ke),Y.translateZ(ft),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const R=Oe+ft,E=Re+ft,G=De-ke,se=me+(Me-ke),ie=je*Re/E*R,oe=H*Re/E*R;Y.projectionMatrix.makePerspective(G,se,ie,oe,R,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function z(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;S.near=w.near=y.near=Y.near,S.far=w.far=y.far=Y.far,(T!==S.near||N!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,N=S.far);const Z=Y.parent,de=S.cameras;z(S,Z);for(let Me=0;Me<de.length;Me++)z(de[Me],Z);de.length===2?k(S,y,w):S.projectionMatrix.copy(y.projectionMatrix),j(Y,S,Z)};function j(Y,Z,de){de===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(de.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=er*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let K=null;function te(Y,Z){if(u=Z.getViewerPose(l||a),g=Z,u!==null){const de=u.views;p!==null&&(e.setRenderTargetFramebuffer(h,p.framebuffer),e.setRenderTarget(h));let Me=!1;de.length!==S.cameras.length&&(S.cameras.length=0,Me=!0);for(let xe=0;xe<de.length;xe++){const Ue=de[xe];let Oe=null;if(p!==null)Oe=p.getViewport(Ue);else{const je=d.getViewSubImage(f,Ue);Oe=je.viewport,xe===0&&(e.setRenderTargetTextures(h,je.colorTexture,f.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(h))}let Re=P[xe];Re===void 0&&(Re=new Rn,Re.layers.enable(xe),Re.viewport=new Ft,P[xe]=Re),Re.matrix.fromArray(Ue.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(Ue.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),xe===0&&(S.matrix.copy(Re.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),Me===!0&&S.cameras.push(Re)}}for(let de=0;de<v.length;de++){const Me=x[de],xe=v[de];Me!==null&&xe!==void 0&&xe.update(Me,Z,l||a)}K&&K(Y,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const ee=new kh;ee.setAnimationLoop(te),this.setAnimationLoop=function(Y){K=Y},this.dispose=function(){}}}function FM(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Oh(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,v,x,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?o(m,h):h.isMeshToonMaterial?(o(m,h),d(m,h)):h.isMeshPhongMaterial?(o(m,h),u(m,h)):h.isMeshStandardMaterial?(o(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,M)):h.isMeshMatcapMaterial?(o(m,h),g(m,h)):h.isMeshDepthMaterial?o(m,h):h.isMeshDistanceMaterial?(o(m,h),_(m,h)):h.isMeshNormalMaterial?o(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&r(m,h)):h.isPointsMaterial?c(m,h,v,x):h.isSpriteMaterial?l(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function o(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===cn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===cn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=e.get(h).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap){m.lightMap.value=h.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=h.lightMapIntensity*x,t(h.lightMap,m.lightMapTransform)}h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function r(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function c(m,h,v,x){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=x*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function l(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),e.get(h).envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===cn&&m.clearcoatNormalScale.value.negate())),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const v=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function BM(n,e,t,i){let s={},o={},a=[];const r=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,x){const M=x.program;i.uniformBlockBinding(v,M)}function l(v,x){let M=s[v.id];M===void 0&&(g(v),M=u(v),s[v.id]=M,v.addEventListener("dispose",m));const b=x.program;i.updateUBOMapping(v,b);const y=e.render.frame;o[v.id]!==y&&(f(v),o[v.id]=y)}function u(v){const x=d();v.__bindingPointIndex=x;const M=n.createBuffer(),b=v.__size,y=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,b,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,M),M}function d(){for(let v=0;v<r;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const x=s[v.id],M=v.uniforms,b=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let y=0,w=M.length;y<w;y++){const P=Array.isArray(M[y])?M[y]:[M[y]];for(let S=0,T=P.length;S<T;S++){const N=P[S];if(p(N,y,S,b)===!0){const F=N.__offset,$=Array.isArray(N.value)?N.value:[N.value];let D=0;for(let B=0;B<$.length;B++){const X=$[B],k=_(X);typeof X=="number"||typeof X=="boolean"?(N.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,F+D,N.__data)):X.isMatrix3?(N.__data[0]=X.elements[0],N.__data[1]=X.elements[1],N.__data[2]=X.elements[2],N.__data[3]=0,N.__data[4]=X.elements[3],N.__data[5]=X.elements[4],N.__data[6]=X.elements[5],N.__data[7]=0,N.__data[8]=X.elements[6],N.__data[9]=X.elements[7],N.__data[10]=X.elements[8],N.__data[11]=0):(X.toArray(N.__data,D),D+=k.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,x,M,b){const y=v.value,w=x+"_"+M;if(b[w]===void 0)return typeof y=="number"||typeof y=="boolean"?b[w]=y:b[w]=y.clone(),!0;{const P=b[w];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return b[w]=y,!0}else if(P.equals(y)===!1)return P.copy(y),!0}return!1}function g(v){const x=v.uniforms;let M=0;const b=16;for(let w=0,P=x.length;w<P;w++){const S=Array.isArray(x[w])?x[w]:[x[w]];for(let T=0,N=S.length;T<N;T++){const F=S[T],$=Array.isArray(F.value)?F.value:[F.value];for(let D=0,B=$.length;D<B;D++){const X=$[D],k=_(X),z=M%b;z!==0&&b-z<k.boundary&&(M+=b-z),F.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=k.storage}}}const y=M%b;return y>0&&(M+=b-y),v.__size=M,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete o[x.id]}function h(){for(const v in s)n.deleteBuffer(s[v]);a=[],s={},o={}}return{bind:c,update:l,dispose:h}}class Yh{constructor(e={}){const{canvas:t=z0(),context:i=null,depth:s=!0,stencil:o=!0,alpha:a=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const h=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this._useLegacyLights=!1,this.toneMapping=zi,this.toneMappingExposure=1;const x=this;let M=!1,b=0,y=0,w=null,P=-1,S=null;const T=new Ft,N=new Ft;let F=null;const $=new be(0);let D=0,B=t.width,X=t.height,k=1,z=null,j=null;const K=new Ft(0,0,B,X),te=new Ft(0,0,B,X);let ee=!1;const Y=new iu;let Z=!1,de=!1,Me=null;const xe=new Mt,Ue=new Te,Oe=new U,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function je(){return w===null?k:1}let H=i;function jt(A,O){for(let W=0;W<A.length;W++){const q=A[W],V=t.getContext(q,O);if(V!==null)return V}return null}try{const A={alpha:!0,depth:s,stencil:o,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jl}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ce,!1),H===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),H=jt(O,A),H===null)throw jt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Se,De,me,ft,ke,R,E,G,se,ie,oe,ge,ue,he,Ae,He,ne,Je,qe,Le,ye,pe,Fe,Ze;function gt(){Se=new $x(H),De=new Gx(H,Se,e),Se.init(De),pe=new UM(H,Se,De),me=new DM(H,Se,De),ft=new Jx(H),ke=new xM,R=new IM(H,Se,me,ke,De,pe,ft),E=new Xx(x),G=new jx(x),se=new rg(H,De),Fe=new Hx(H,Se,se,De),ie=new Kx(H,se,ft,Fe),oe=new nv(H,ie,se,ft),qe=new tv(H,De,R),He=new Wx(ke),ge=new _M(x,E,G,Se,De,Fe,He),ue=new FM(x,ke),he=new MM,Ae=new TM(Se,De),Je=new kx(x,E,G,me,oe,f,c),ne=new LM(x,oe,De),Ze=new BM(H,ft,De,me),Le=new Vx(H,Se,ft,De),ye=new Zx(H,Se,ft,De),ft.programs=ge.programs,x.capabilities=De,x.extensions=Se,x.properties=ke,x.renderLists=he,x.shadowMap=ne,x.state=me,x.info=ft}gt();const Ge=new OM(x,H);this.xr=Ge,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=Se.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Se.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(A){A!==void 0&&(k=A,this.setSize(B,X,!1))},this.getSize=function(A){return A.set(B,X)},this.setSize=function(A,O,W=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,X=O,t.width=Math.floor(A*k),t.height=Math.floor(O*k),W===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(B*k,X*k).floor()},this.setDrawingBufferSize=function(A,O,W){B=A,X=O,k=W,t.width=Math.floor(A*W),t.height=Math.floor(O*W),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,O,W,q){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,O,W,q),me.viewport(T.copy(K).multiplyScalar(k).floor())},this.getScissor=function(A){return A.copy(te)},this.setScissor=function(A,O,W,q){A.isVector4?te.set(A.x,A.y,A.z,A.w):te.set(A,O,W,q),me.scissor(N.copy(te).multiplyScalar(k).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(A){me.setScissorTest(ee=A)},this.setOpaqueSort=function(A){z=A},this.setTransparentSort=function(A){j=A},this.getClearColor=function(A){return A.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(A=!0,O=!0,W=!0){let q=0;if(A){let V=!1;if(w!==null){const fe=w.texture.format;V=fe===Eh||fe===wh||fe===Sh}if(V){const fe=w.texture.type,_e=fe===Oi||fe===Li||fe===Ql||fe===ds||fe===yh||fe===bh,Ee=Je.getClearColor(),Pe=Je.getClearAlpha(),Ve=Ee.r,Ie=Ee.g,Ne=Ee.b;_e?(p[0]=Ve,p[1]=Ie,p[2]=Ne,p[3]=Pe,H.clearBufferuiv(H.COLOR,0,p)):(g[0]=Ve,g[1]=Ie,g[2]=Ne,g[3]=Pe,H.clearBufferiv(H.COLOR,0,g))}else q|=H.COLOR_BUFFER_BIT}O&&(q|=H.DEPTH_BUFFER_BIT),W&&(q|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),he.dispose(),Ae.dispose(),ke.dispose(),E.dispose(),G.dispose(),oe.dispose(),Fe.dispose(),Ze.dispose(),ge.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",$t),Ge.removeEventListener("sessionend",rt),Me&&(Me.dispose(),Me=null),Kt.stop()};function re(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=ft.autoReset,O=ne.enabled,W=ne.autoUpdate,q=ne.needsUpdate,V=ne.type;gt(),ft.autoReset=A,ne.enabled=O,ne.autoUpdate=W,ne.needsUpdate=q,ne.type=V}function ce(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function le(A){const O=A.target;O.removeEventListener("dispose",le),Ce(O)}function Ce(A){we(A),ke.remove(A)}function we(A){const O=ke.get(A).programs;O!==void 0&&(O.forEach(function(W){ge.releaseProgram(W)}),A.isShaderMaterial&&ge.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,W,q,V,fe){O===null&&(O=Re);const _e=V.isMesh&&V.matrixWorld.determinant()<0,Ee=Mm(A,O,W,q,V);me.setMaterial(q,_e);let Pe=W.index,Ve=1;if(q.wireframe===!0){if(Pe=ie.getWireframeAttribute(W),Pe===void 0)return;Ve=2}const Ie=W.drawRange,Ne=W.attributes.position;let xt=Ie.start*Ve,fn=(Ie.start+Ie.count)*Ve;fe!==null&&(xt=Math.max(xt,fe.start*Ve),fn=Math.min(fn,(fe.start+fe.count)*Ve)),Pe!==null?(xt=Math.max(xt,0),fn=Math.min(fn,Pe.count)):Ne!=null&&(xt=Math.max(xt,0),fn=Math.min(fn,Ne.count));const Dt=fn-xt;if(Dt<0||Dt===1/0)return;Fe.setup(V,q,Ee,W,Pe);let Zn,ht=Le;if(Pe!==null&&(Zn=se.get(Pe),ht=ye,ht.setIndex(Zn)),V.isMesh)q.wireframe===!0?(me.setLineWidth(q.wireframeLinewidth*je()),ht.setMode(H.LINES)):ht.setMode(H.TRIANGLES);else if(V.isLine){let We=q.linewidth;We===void 0&&(We=1),me.setLineWidth(We*je()),V.isLineSegments?ht.setMode(H.LINES):V.isLineLoop?ht.setMode(H.LINE_LOOP):ht.setMode(H.LINE_STRIP)}else V.isPoints?ht.setMode(H.POINTS):V.isSprite&&ht.setMode(H.TRIANGLES);if(V.isBatchedMesh)ht.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)ht.renderInstances(xt,Dt,V.count);else if(W.isInstancedBufferGeometry){const We=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,rc=Math.min(W.instanceCount,We);ht.renderInstances(xt,Dt,rc)}else ht.render(xt,Dt)};function st(A,O,W){A.transparent===!0&&A.side===On&&A.forceSinglePass===!1?(A.side=cn,A.needsUpdate=!0,fr(A,O,W),A.side=Fi,A.needsUpdate=!0,fr(A,O,W),A.side=On):fr(A,O,W)}this.compile=function(A,O,W=null){W===null&&(W=A),m=Ae.get(W),m.init(),v.push(m),W.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),A!==W&&A.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(x._useLegacyLights);const q=new Set;return A.traverse(function(V){const fe=V.material;if(fe)if(Array.isArray(fe))for(let _e=0;_e<fe.length;_e++){const Ee=fe[_e];st(Ee,W,V),q.add(Ee)}else st(fe,W,V),q.add(fe)}),v.pop(),m=null,q},this.compileAsync=function(A,O,W=null){const q=this.compile(A,O,W);return new Promise(V=>{function fe(){if(q.forEach(function(_e){ke.get(_e).currentProgram.isReady()&&q.delete(_e)}),q.size===0){V(A);return}setTimeout(fe,10)}Se.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ot=null;function Lt(A){ot&&ot(A)}function $t(){Kt.stop()}function rt(){Kt.start()}const Kt=new kh;Kt.setAnimationLoop(Lt),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(A){ot=A,Ge.setAnimationLoop(A),A===null?Kt.stop():Kt.start()},Ge.addEventListener("sessionstart",$t),Ge.addEventListener("sessionend",rt),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(O),O=Ge.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,O,w),m=Ae.get(A,v.length),m.init(),v.push(m),xe.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(xe),de=this.localClippingEnabled,Z=He.init(this.clippingPlanes,de),_=he.get(A,h.length),_.init(),h.push(_),Wn(A,O,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(z,j),this.info.render.frame++,Z===!0&&He.beginShadows();const W=m.state.shadowsArray;if(ne.render(W,A,O),Z===!0&&He.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,A),m.setupLights(x._useLegacyLights),O.isArrayCamera){const q=O.cameras;for(let V=0,fe=q.length;V<fe;V++){const _e=q[V];bu(_,A,_e,_e.viewport)}}else bu(_,A,O);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(x,A,O),Fe.resetDefaultState(),P=-1,S=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,h.pop(),h.length>0?_=h[h.length-1]:_=null};function Wn(A,O,W,q){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){q&&Oe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(xe);const _e=oe.update(A),Ee=A.material;Ee.visible&&_.push(A,_e,Ee,W,Oe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const _e=oe.update(A),Ee=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Oe.copy(A.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Oe.copy(_e.boundingSphere.center)),Oe.applyMatrix4(A.matrixWorld).applyMatrix4(xe)),Array.isArray(Ee)){const Pe=_e.groups;for(let Ve=0,Ie=Pe.length;Ve<Ie;Ve++){const Ne=Pe[Ve],xt=Ee[Ne.materialIndex];xt&&xt.visible&&_.push(A,_e,xt,W,Oe.z,Ne)}}else Ee.visible&&_.push(A,_e,Ee,W,Oe.z,null)}}const fe=A.children;for(let _e=0,Ee=fe.length;_e<Ee;_e++)Wn(fe[_e],O,W,q)}function bu(A,O,W,q){const V=A.opaque,fe=A.transmissive,_e=A.transparent;m.setupLightsView(W),Z===!0&&He.setGlobalState(x.clippingPlanes,W),fe.length>0&&vm(V,fe,O,W),q&&me.viewport(T.copy(q)),V.length>0&&dr(V,O,W),fe.length>0&&dr(fe,O,W),_e.length>0&&dr(_e,O,W),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function vm(A,O,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const fe=De.isWebGL2;Me===null&&(Me=new kn(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?di:Oi,minFilter:Qo,samples:fe?4:0})),x.getDrawingBufferSize(Ue),fe?Me.setSize(Ue.x,Ue.y):Me.setSize(Ea(Ue.x),Ea(Ue.y));const _e=x.getRenderTarget();x.setRenderTarget(Me),x.getClearColor($),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const Ee=x.toneMapping;x.toneMapping=zi,dr(A,W,q),R.updateMultisampleRenderTarget(Me),R.updateRenderTargetMipmap(Me);let Pe=!1;for(let Ve=0,Ie=O.length;Ve<Ie;Ve++){const Ne=O[Ve],xt=Ne.object,fn=Ne.geometry,Dt=Ne.material,Zn=Ne.group;if(Dt.side===On&&xt.layers.test(q.layers)){const ht=Dt.side;Dt.side=cn,Dt.needsUpdate=!0,Su(xt,W,q,fn,Dt,Zn),Dt.side=ht,Dt.needsUpdate=!0,Pe=!0}}Pe===!0&&(R.updateMultisampleRenderTarget(Me),R.updateRenderTargetMipmap(Me)),x.setRenderTarget(_e),x.setClearColor($,D),x.toneMapping=Ee}function dr(A,O,W){const q=O.isScene===!0?O.overrideMaterial:null;for(let V=0,fe=A.length;V<fe;V++){const _e=A[V],Ee=_e.object,Pe=_e.geometry,Ve=q===null?_e.material:q,Ie=_e.group;Ee.layers.test(W.layers)&&Su(Ee,O,W,Pe,Ve,Ie)}}function Su(A,O,W,q,V,fe){A.onBeforeRender(x,O,W,q,V,fe),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(x,O,W,q,A,fe),V.transparent===!0&&V.side===On&&V.forceSinglePass===!1?(V.side=cn,V.needsUpdate=!0,x.renderBufferDirect(W,O,q,V,A,fe),V.side=Fi,V.needsUpdate=!0,x.renderBufferDirect(W,O,q,V,A,fe),V.side=On):x.renderBufferDirect(W,O,q,V,A,fe),A.onAfterRender(x,O,W,q,V,fe)}function fr(A,O,W){O.isScene!==!0&&(O=Re);const q=ke.get(A),V=m.state.lights,fe=m.state.shadowsArray,_e=V.state.version,Ee=ge.getParameters(A,V.state,fe,O,W),Pe=ge.getProgramCacheKey(Ee);let Ve=q.programs;q.environment=A.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(A.isMeshStandardMaterial?G:E).get(A.envMap||q.environment),Ve===void 0&&(A.addEventListener("dispose",le),Ve=new Map,q.programs=Ve);let Ie=Ve.get(Pe);if(Ie!==void 0){if(q.currentProgram===Ie&&q.lightsStateVersion===_e)return Eu(A,Ee),Ie}else Ee.uniforms=ge.getUniforms(A),A.onBuild(W,Ee,x),A.onBeforeCompile(Ee,x),Ie=ge.acquireProgram(Ee,Pe),Ve.set(Pe,Ie),q.uniforms=Ee.uniforms;const Ne=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ne.clippingPlanes=He.uniform),Eu(A,Ee),q.needsLights=bm(A),q.lightsStateVersion=_e,q.needsLights&&(Ne.ambientLightColor.value=V.state.ambient,Ne.lightProbe.value=V.state.probe,Ne.directionalLights.value=V.state.directional,Ne.directionalLightShadows.value=V.state.directionalShadow,Ne.spotLights.value=V.state.spot,Ne.spotLightShadows.value=V.state.spotShadow,Ne.rectAreaLights.value=V.state.rectArea,Ne.ltc_1.value=V.state.rectAreaLTC1,Ne.ltc_2.value=V.state.rectAreaLTC2,Ne.pointLights.value=V.state.point,Ne.pointLightShadows.value=V.state.pointShadow,Ne.hemisphereLights.value=V.state.hemi,Ne.directionalShadowMap.value=V.state.directionalShadowMap,Ne.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ne.spotShadowMap.value=V.state.spotShadowMap,Ne.spotLightMatrix.value=V.state.spotLightMatrix,Ne.spotLightMap.value=V.state.spotLightMap,Ne.pointShadowMap.value=V.state.pointShadowMap,Ne.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Ie,q.uniformsList=null,Ie}function wu(A){if(A.uniformsList===null){const O=A.currentProgram.getUniforms();A.uniformsList=Qr.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function Eu(A,O){const W=ke.get(A);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Mm(A,O,W,q,V){O.isScene!==!0&&(O=Re),R.resetTextureUnits();const fe=O.fog,_e=q.isMeshStandardMaterial?O.environment:null,Ee=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:hi,Pe=(q.isMeshStandardMaterial?G:E).get(q.envMap||_e),Ve=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ie=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ne=!!W.morphAttributes.position,xt=!!W.morphAttributes.normal,fn=!!W.morphAttributes.color;let Dt=zi;q.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Dt=x.toneMapping);const Zn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ht=Zn!==void 0?Zn.length:0,We=ke.get(q),rc=m.state.lights;if(Z===!0&&(de===!0||A!==S)){const bn=A===S&&q.id===P;He.setState(q,A,bn)}let _t=!1;q.version===We.__version?(We.needsLights&&We.lightsStateVersion!==rc.state.version||We.outputColorSpace!==Ee||V.isBatchedMesh&&We.batching===!1||!V.isBatchedMesh&&We.batching===!0||V.isInstancedMesh&&We.instancing===!1||!V.isInstancedMesh&&We.instancing===!0||V.isSkinnedMesh&&We.skinning===!1||!V.isSkinnedMesh&&We.skinning===!0||V.isInstancedMesh&&We.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&We.instancingColor===!1&&V.instanceColor!==null||We.envMap!==Pe||q.fog===!0&&We.fog!==fe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==He.numPlanes||We.numIntersection!==He.numIntersection)||We.vertexAlphas!==Ve||We.vertexTangents!==Ie||We.morphTargets!==Ne||We.morphNormals!==xt||We.morphColors!==fn||We.toneMapping!==Dt||De.isWebGL2===!0&&We.morphTargetsCount!==ht)&&(_t=!0):(_t=!0,We.__version=q.version);let Wi=We.currentProgram;_t===!0&&(Wi=fr(q,O,V));let Tu=!1,wo=!1,ac=!1;const Vt=Wi.getUniforms(),Xi=We.uniforms;if(me.useProgram(Wi.program)&&(Tu=!0,wo=!0,ac=!0),q.id!==P&&(P=q.id,wo=!0),Tu||S!==A){Vt.setValue(H,"projectionMatrix",A.projectionMatrix),Vt.setValue(H,"viewMatrix",A.matrixWorldInverse);const bn=Vt.map.cameraPosition;bn!==void 0&&bn.setValue(H,Oe.setFromMatrixPosition(A.matrixWorld)),De.logarithmicDepthBuffer&&Vt.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Vt.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,wo=!0,ac=!0)}if(V.isSkinnedMesh){Vt.setOptional(H,V,"bindMatrix"),Vt.setOptional(H,V,"bindMatrixInverse");const bn=V.skeleton;bn&&(De.floatVertexTextures?(bn.boneTexture===null&&bn.computeBoneTexture(),Vt.setValue(H,"boneTexture",bn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(Vt.setOptional(H,V,"batchingTexture"),Vt.setValue(H,"batchingTexture",V._matricesTexture,R));const cc=W.morphAttributes;if((cc.position!==void 0||cc.normal!==void 0||cc.color!==void 0&&De.isWebGL2===!0)&&qe.update(V,W,Wi),(wo||We.receiveShadow!==V.receiveShadow)&&(We.receiveShadow=V.receiveShadow,Vt.setValue(H,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Xi.envMap.value=Pe,Xi.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),wo&&(Vt.setValue(H,"toneMappingExposure",x.toneMappingExposure),We.needsLights&&ym(Xi,ac),fe&&q.fog===!0&&ue.refreshFogUniforms(Xi,fe),ue.refreshMaterialUniforms(Xi,q,k,X,Me),Qr.upload(H,wu(We),Xi,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Qr.upload(H,wu(We),Xi,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Vt.setValue(H,"center",V.center),Vt.setValue(H,"modelViewMatrix",V.modelViewMatrix),Vt.setValue(H,"normalMatrix",V.normalMatrix),Vt.setValue(H,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const bn=q.uniformsGroups;for(let lc=0,Sm=bn.length;lc<Sm;lc++)if(De.isWebGL2){const Au=bn[lc];Ze.update(Au,Wi),Ze.bind(Au,Wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Wi}function ym(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function bm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,O,W){ke.get(A.texture).__webglTexture=O,ke.get(A.depthTexture).__webglTexture=W;const q=ke.get(A);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,O){const W=ke.get(A);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(A,O=0,W=0){w=A,b=O,y=W;let q=!0,V=null,fe=!1,_e=!1;if(A){const Pe=ke.get(A);Pe.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(H.FRAMEBUFFER,null),q=!1):Pe.__webglFramebuffer===void 0?R.setupRenderTarget(A):Pe.__hasExternalTextures&&R.rebindTextures(A,ke.get(A.texture).__webglTexture,ke.get(A.depthTexture).__webglTexture);const Ve=A.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(_e=!0);const Ie=ke.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ie[O])?V=Ie[O][W]:V=Ie[O],fe=!0):De.isWebGL2&&A.samples>0&&R.useMultisampledRTT(A)===!1?V=ke.get(A).__webglMultisampledFramebuffer:Array.isArray(Ie)?V=Ie[W]:V=Ie,T.copy(A.viewport),N.copy(A.scissor),F=A.scissorTest}else T.copy(K).multiplyScalar(k).floor(),N.copy(te).multiplyScalar(k).floor(),F=ee;if(me.bindFramebuffer(H.FRAMEBUFFER,V)&&De.drawBuffers&&q&&me.drawBuffers(A,V),me.viewport(T),me.scissor(N),me.setScissorTest(F),fe){const Pe=ke.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pe.__webglTexture,W)}else if(_e){const Pe=ke.get(A.texture),Ve=O||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Pe.__webglTexture,W||0,Ve)}P=-1},this.readRenderTargetPixels=function(A,O,W,q,V,fe,_e){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=ke.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_e!==void 0&&(Ee=Ee[_e]),Ee){me.bindFramebuffer(H.FRAMEBUFFER,Ee);try{const Pe=A.texture,Ve=Pe.format,Ie=Pe.type;if(Ve!==Bn&&pe.convert(Ve)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ne=Ie===di&&(Se.has("EXT_color_buffer_half_float")||De.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Ie!==Oi&&pe.convert(Ie)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Di&&(De.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-q&&W>=0&&W<=A.height-V&&H.readPixels(O,W,q,V,pe.convert(Ve),pe.convert(Ie),fe)}finally{const Pe=w!==null?ke.get(w).__webglFramebuffer:null;me.bindFramebuffer(H.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(A,O,W=0){const q=Math.pow(2,-W),V=Math.floor(O.image.width*q),fe=Math.floor(O.image.height*q);R.setTexture2D(O,0),H.copyTexSubImage2D(H.TEXTURE_2D,W,0,0,A.x,A.y,V,fe),me.unbindTexture()},this.copyTextureToTexture=function(A,O,W,q=0){const V=O.image.width,fe=O.image.height,_e=pe.convert(W.format),Ee=pe.convert(W.type);R.setTexture2D(W,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment),O.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,q,A.x,A.y,V,fe,_e,Ee,O.image.data):O.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,q,A.x,A.y,O.mipmaps[0].width,O.mipmaps[0].height,_e,O.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,q,A.x,A.y,_e,Ee,O.image),q===0&&W.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(A,O,W,q,V=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=A.max.x-A.min.x+1,_e=A.max.y-A.min.y+1,Ee=A.max.z-A.min.z+1,Pe=pe.convert(q.format),Ve=pe.convert(q.type);let Ie;if(q.isData3DTexture)R.setTexture3D(q,0),Ie=H.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)R.setTexture2DArray(q,0),Ie=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);const Ne=H.getParameter(H.UNPACK_ROW_LENGTH),xt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),fn=H.getParameter(H.UNPACK_SKIP_PIXELS),Dt=H.getParameter(H.UNPACK_SKIP_ROWS),Zn=H.getParameter(H.UNPACK_SKIP_IMAGES),ht=W.isCompressedTexture?W.mipmaps[V]:W.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,ht.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ht.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,A.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,A.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,A.min.z),W.isDataTexture||W.isData3DTexture?H.texSubImage3D(Ie,V,O.x,O.y,O.z,fe,_e,Ee,Pe,Ve,ht.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Ie,V,O.x,O.y,O.z,fe,_e,Ee,Pe,ht.data)):H.texSubImage3D(Ie,V,O.x,O.y,O.z,fe,_e,Ee,Pe,Ve,ht),H.pixelStorei(H.UNPACK_ROW_LENGTH,Ne),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,xt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,fn),H.pixelStorei(H.UNPACK_SKIP_ROWS,Dt),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Zn),V===0&&q.generateMipmaps&&H.generateMipmap(Ie),me.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),me.unbindTexture()},this.resetState=function(){b=0,y=0,w=null,me.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===eu?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===Ka?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===kt?hs:Ah}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===hs?kt:hi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class kM extends Yh{}kM.prototype.isWebGL1Renderer=!0;class HM extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class ru extends ys{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Yd=new U,jd=new U,$d=new Mt,Bc=new Za,Nr=new rr;class jh extends Et{constructor(e=new Tt,t=new ru){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,o=t.count;s<o;s++)Yd.fromBufferAttribute(t,s-1),jd.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Yd.distanceTo(jd);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,o=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere),Nr.applyMatrix4(s),Nr.radius+=o,e.ray.intersectsSphere(Nr)===!1)return;$d.copy(s).invert(),Bc.copy(e.ray).applyMatrix4($d);const r=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=new U,u=new U,d=new U,f=new U,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const h=Math.max(0,a.start),v=Math.min(g.count,a.start+a.count);for(let x=h,M=v-1;x<M;x+=p){const b=g.getX(x),y=g.getX(x+1);if(l.fromBufferAttribute(m,b),u.fromBufferAttribute(m,y),Bc.distanceSqToSegment(l,u,f,d)>c)continue;f.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(f);P<e.near||P>e.far||t.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const h=Math.max(0,a.start),v=Math.min(m.count,a.start+a.count);for(let x=h,M=v-1;x<M;x+=p){if(l.fromBufferAttribute(m,x),u.fromBufferAttribute(m,x+1),Bc.distanceSqToSegment(l,u,f,d)>c)continue;f.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(f);y<e.near||y>e.far||t.push({distance:y,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=s.length;o<a;o++){const r=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}}const Kd=new U,Zd=new U;class VM extends jh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,o=t.count;s<o;s+=2)Kd.fromBufferAttribute(t,s),Zd.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Kd.distanceTo(Zd);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ml extends ys{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jd=new Mt,gl=new Za,zr=new rr,Or=new U;class Qd extends Et{constructor(e=new Tt,t=new ml){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,o=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(s),zr.radius+=o,e.ray.intersectsSphere(zr)===!1)return;Jd.copy(s).invert(),gl.copy(e.ray).applyMatrix4(Jd);const r=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=i.index,d=i.attributes.position;if(l!==null){const f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,_=p;g<_;g++){const m=l.getX(g);Or.fromBufferAttribute(d,m),ef(Or,m,c,s,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=f,_=p;g<_;g++)Or.fromBufferAttribute(d,g),ef(Or,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=s.length;o<a;o++){const r=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=o}}}}}function ef(n,e,t,i,s,o,a){const r=gl.distanceSqToPoint(n);if(r<t){const c=new U;gl.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;o.push({distance:l,distanceToRay:Math.sqrt(r),point:c,index:e,face:null,object:a})}}class ar extends Tt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const o=[],a=[],r=[],c=[],l=new U,u=new Te;a.push(0,0,0),r.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=i+d/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),r.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(r,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ec extends Tt{constructor(e=1,t=1,i=1,s=32,o=1,a=!1,r=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:o,openEnded:a,thetaStart:r,thetaLength:c};const l=this;s=Math.floor(s),o=Math.floor(o);const u=[],d=[],f=[],p=[];let g=0;const _=[],m=i/2;let h=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function v(){const M=new U,b=new U;let y=0;const w=(t-e)/i;for(let P=0;P<=o;P++){const S=[],T=P/o,N=T*(t-e)+e;for(let F=0;F<=s;F++){const $=F/s,D=$*c+r,B=Math.sin(D),X=Math.cos(D);b.x=N*B,b.y=-T*i+m,b.z=N*X,d.push(b.x,b.y,b.z),M.set(B,w,X).normalize(),f.push(M.x,M.y,M.z),p.push($,1-T),S.push(g++)}_.push(S)}for(let P=0;P<s;P++)for(let S=0;S<o;S++){const T=_[S][P],N=_[S+1][P],F=_[S+1][P+1],$=_[S][P+1];u.push(T,N,$),u.push(N,F,$),y+=6}l.addGroup(h,y,0),h+=y}function x(M){const b=g,y=new Te,w=new U;let P=0;const S=M===!0?e:t,T=M===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*T,0),f.push(0,T,0),p.push(.5,.5),g++;const N=g;for(let F=0;F<=s;F++){const D=F/s*c+r,B=Math.cos(D),X=Math.sin(D);w.x=S*X,w.y=m*T,w.z=S*B,d.push(w.x,w.y,w.z),f.push(0,T,0),y.x=B*.5+.5,y.y=X*.5*T+.5,p.push(y.x,y.y),g++}for(let F=0;F<s;F++){const $=b+F,D=N+F;M===!0?u.push(D,D+1,$):u.push(D+1,D,$),P+=3}l.addGroup(h,P,M===!0?1:2),h+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class tc extends Tt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const o=[],a=[];r(s),l(i),u(),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(o.slice(),3)),this.setAttribute("uv",new it(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function r(v){const x=new U,M=new U,b=new U;for(let y=0;y<t.length;y+=3)p(t[y+0],x),p(t[y+1],M),p(t[y+2],b),c(x,M,b,v)}function c(v,x,M,b){const y=b+1,w=[];for(let P=0;P<=y;P++){w[P]=[];const S=v.clone().lerp(M,P/y),T=x.clone().lerp(M,P/y),N=y-P;for(let F=0;F<=N;F++)F===0&&P===y?w[P][F]=S:w[P][F]=S.clone().lerp(T,F/N)}for(let P=0;P<y;P++)for(let S=0;S<2*(y-P)-1;S++){const T=Math.floor(S/2);S%2===0?(f(w[P][T+1]),f(w[P+1][T]),f(w[P][T])):(f(w[P][T+1]),f(w[P+1][T+1]),f(w[P+1][T]))}}function l(v){const x=new U;for(let M=0;M<o.length;M+=3)x.x=o[M+0],x.y=o[M+1],x.z=o[M+2],x.normalize().multiplyScalar(v),o[M+0]=x.x,o[M+1]=x.y,o[M+2]=x.z}function u(){const v=new U;for(let x=0;x<o.length;x+=3){v.x=o[x+0],v.y=o[x+1],v.z=o[x+2];const M=m(v)/2/Math.PI+.5,b=h(v)/Math.PI+.5;a.push(M,1-b)}g(),d()}function d(){for(let v=0;v<a.length;v+=6){const x=a[v+0],M=a[v+2],b=a[v+4],y=Math.max(x,M,b),w=Math.min(x,M,b);y>.9&&w<.1&&(x<.2&&(a[v+0]+=1),M<.2&&(a[v+2]+=1),b<.2&&(a[v+4]+=1))}}function f(v){o.push(v.x,v.y,v.z)}function p(v,x){const M=v*3;x.x=e[M+0],x.y=e[M+1],x.z=e[M+2]}function g(){const v=new U,x=new U,M=new U,b=new U,y=new Te,w=new Te,P=new Te;for(let S=0,T=0;S<o.length;S+=9,T+=6){v.set(o[S+0],o[S+1],o[S+2]),x.set(o[S+3],o[S+4],o[S+5]),M.set(o[S+6],o[S+7],o[S+8]),y.set(a[T+0],a[T+1]),w.set(a[T+2],a[T+3]),P.set(a[T+4],a[T+5]),b.copy(v).add(x).add(M).divideScalar(3);const N=m(b);_(y,T+0,v,N),_(w,T+2,x,N),_(P,T+4,M,N)}}function _(v,x,M,b){b<0&&v.x===1&&(a[x]=v.x-1),M.x===0&&M.z===0&&(a[x]=b/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function h(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tc(e.vertices,e.indices,e.radius,e.details)}}const Fr=new U,Br=new U,kc=new U,kr=new An;class GM extends Tt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),o=Math.cos(Qs*t),a=e.getIndex(),r=e.getAttribute("position"),c=a?a.count:r.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),f={},p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:h}=kr;if(_.fromBufferAttribute(r,l[0]),m.fromBufferAttribute(r,l[1]),h.fromBufferAttribute(r,l[2]),kr.getNormal(kc),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){const x=(v+1)%3,M=d[v],b=d[x],y=kr[u[v]],w=kr[u[x]],P=`${M}_${b}`,S=`${b}_${M}`;S in f&&f[S]?(kc.dot(f[S].normal)<=o&&(p.push(y.x,y.y,y.z),p.push(w.x,w.y,w.z)),f[S]=null):P in f||(f[P]={index0:l[v],index1:l[x],normal:kc.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];Fr.fromBufferAttribute(r,_),Br.fromBufferAttribute(r,m),p.push(Fr.x,Fr.y,Fr.z),p.push(Br.x,Br.y,Br.z)}this.setAttribute("position",new it(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class au extends tc{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new au(e.radius,e.detail)}}class cu extends tc{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new cu(e.radius,e.detail)}}class nc extends Tt{constructor(e=1,t=32,i=16,s=0,o=Math.PI*2,a=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:o,thetaStart:a,thetaLength:r},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+r,Math.PI);let l=0;const u=[],d=new U,f=new U,p=[],g=[],_=[],m=[];for(let h=0;h<=i;h++){const v=[],x=h/i;let M=0;h===0&&a===0?M=.5/t:h===i&&c===Math.PI&&(M=-.5/t);for(let b=0;b<=t;b++){const y=b/t;d.x=-e*Math.cos(s+y*o)*Math.sin(a+x*r),d.y=e*Math.cos(a+x*r),d.z=e*Math.sin(s+y*o)*Math.sin(a+x*r),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(y+M,1-x),v.push(l++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<t;v++){const x=u[h][v+1],M=u[h][v],b=u[h+1][v],y=u[h+1][v+1];(h!==0||a>0)&&p.push(x,M,y),(h!==i-1||c<Math.PI)&&p.push(M,b,y)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Kn extends Tt{constructor(e=1,t=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const a=[],r=[],c=[],l=[],u=new U,d=new U,f=new U;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*o,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),r.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,h=(s+1)*(p-1)+g,v=(s+1)*p+g;a.push(_,m,v),a.push(m,h,v)}this.setIndex(a),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class $h extends ys{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rh,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lu extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class WM extends lu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Hc=new Mt,tf=new U,nf=new U;class XM{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new iu,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;tf.setFromMatrixPosition(e.matrixWorld),t.position.copy(tf),nf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nf),t.updateMatrixWorld(),Hc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Hc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qM extends XM{constructor(){super(new su(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sf extends lu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new qM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class YM extends lu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class jM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=of(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=of();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function of(){return(typeof performance>"u"?Date:performance).now()}class $M{constructor(e,t,i=0,s=1/0){this.ray=new Za(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new nu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return _l(e,this,i,t),i.sort(rf),i}intersectObjects(e,t=!0,i=[]){for(let s=0,o=e.length;s<o;s++)_l(e[s],this,i,t);return i.sort(rf),i}}function rf(n,e){return n.distance-e.distance}function _l(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)_l(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jl);const Kh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class cr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const KM=new su(-1,1,1,-1,0,1);class ZM extends Tt{constructor(){super(),this.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new it([0,2,0,0,2,0],2))}}const JM=new ZM;class Zh{constructor(e){this._mesh=new L(JM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,KM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class QM extends cr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof xn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Aa.clone(e.uniforms),this.material=new xn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Zh(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class af extends cr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),o.buffers.stencil.setClear(r),o.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,4294967295),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class ey extends cr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ty{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Te);this._width=i.width,this._height=i.height,t=new kn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:di}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new QM(Kh),this.copyPass.material.blending=ui,this.clock=new jM}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,o=this.passes.length;s<o;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}af!==void 0&&(a instanceof af?i=!0:a instanceof ey&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ny extends cr{constructor(e,t,i=null,s=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new be}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let o,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const iy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new be(0)},defaultOpacity:{value:0}},vertexShader:`

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

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ho extends cr{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Te(e.x,e.y):new Te(256,256),this.clearColor=new be(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new kn(o,a,{type:di}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const f=new kn(o,a,{type:di});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new kn(o,a,{type:di});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),o=Math.round(o/2),a=Math.round(a/2)}const r=iy;this.highPassUniforms=Aa.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new xn({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];o=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Te(1/o,1/a),o=Math.round(o/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Kh;this.copyUniforms=Aa.clone(u.uniforms),this.blendMaterial=new xn({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:va,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new be,this.oldClearAlpha=1,this.basic=new vt,this.fsQuad=new Zh(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(i,s),this.renderTargetsVertical[o].setSize(i,s),this.separableBlurMaterials[o].uniforms.invSize.value=new Te(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,o){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=ho.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ho.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),r=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new xn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Te(.5,.5)},direction:{value:new Te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new xn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ho.BlurDirectionX=new Te(1,0);ho.BlurDirectionY=new Te(0,1);function Ii(n){return new be(n)}function Ke(n="#0a0a1a",e={}){return new $h({color:Ii(n),metalness:e.metalness??.7,roughness:e.roughness??.55,emissive:Ii(e.emissive??n),emissiveIntensity:e.emissiveIntensity??.08,...e.extra})}function ve(n="#00ffff",e={}){return new vt({color:Ii(n),...e.extra})}function Yt(n="#00ffff",e={}){return new vt({color:Ii(n),transparent:!0,opacity:e.opacity??.18,depthWrite:!1,side:On,...e.extra})}const J=new fi(1,1,1),$e=new nc(.5,12,8),ze=new ec(.5,.5,1,16),et=new Kn(.5,.06,8,24),Ra=new cu(.5,0),Jh=new au(.5,0);function Qh(n,e,t,i,s){const o=new qt;o.name=n;const a=new L(J.clone(),Ke("#141438",{emissive:"#1a1a44",emissiveIntensity:.2,metalness:.8,roughness:.4}));a.scale.set(10,4,14),a.position.y=3,a.name="hull",o.add(a);const r=new L(J.clone(),Ke("#181848",{emissive:"#1e1e50",emissiveIntensity:.15,metalness:.85,roughness:.35}));r.scale.set(9,1.2,12),r.position.y=5.3,o.add(r);const c=new L(J.clone(),Ke("#161640",{emissive:"#1c1c4c",emissiveIntensity:.18,metalness:.85,roughness:.3}));c.scale.set(9.5,2.5,4),c.position.set(0,4.2,8),c.rotation.x=-.25,o.add(c);const l=new L(J.clone(),Ke("#121232",{emissive:"#161640",emissiveIntensity:.12,metalness:.7,roughness:.5}));l.scale.set(8,1.5,4),l.position.set(0,5,-6.5),o.add(l);for(const k of[-1,1]){const z=new L(J.clone(),Ke("#0a0a22",{emissive:"#0f0f30",emissiveIntensity:.1}));z.scale.set(2.5,.8,1.5),z.position.set(k*2.2,5.6,-7.5),o.add(z);const j=new L(J.clone(),ve("#ff6622"));j.scale.set(2,.3,1),j.position.set(k*2.2,5.2,-7.8),o.add(j)}const u=ve(e);for(const k of[-1,1]){const z=new L(J.clone(),u);z.scale.set(.25,.25,14.4),z.position.set(k*5,5.15,0),o.add(z)}const d=new L(J.clone(),ve(e));d.scale.set(10.2,.25,.25),d.position.set(0,5.15,7.1),o.add(d);const f=new L(J.clone(),ve(i));f.scale.set(10.2,.25,.25),f.position.set(0,5.15,-7.1),o.add(f);for(const k of[-1,1]){const z=new L(J.clone(),ve(t));z.scale.set(.2,.2,14.4),z.position.set(k*5.15,3,0),o.add(z)}for(const k of[-1,1]){const z=new L(J.clone(),ve(i));z.scale.set(.2,.2,14.4),z.position.set(k*5.1,1.05,0),o.add(z)}const p=new L(J.clone(),ve(e));p.scale.set(.3,.15,12),p.position.set(0,5.95,0),o.add(p);for(const k of[-1,1]){const z=new L(J.clone(),ve(s));z.scale.set(.2,.2,4),z.position.set(k*2.2,5,8.5),z.rotation.y=k*.3,o.add(z)}for(const k of[-1,1]){const z=new L(J.clone(),Ke("#121235",{emissive:"#161642",emissiveIntensity:.15,metalness:.75,roughness:.45}));z.scale.set(1.2,3.2,13),z.position.set(k*6.2,2.2,0),o.add(z);const j=new L(J.clone(),ve(t));j.scale.set(.15,.15,13.2),j.position.set(k*6.85,2.5,0),o.add(j)}for(const k of[-1,1]){const z=new L(J.clone(),Ke("#0a0a1e",{emissive:"#0e0e28",emissiveIntensity:.08,metalness:.9,roughness:.6}));z.scale.set(2.2,2.8,15.5),z.position.set(k*7,1.5,0),o.add(z);for(let te=-6;te<=6;te++){const ee=new L(J.clone(),Ke("#080818",{emissive:"#0c0c24",emissiveIntensity:.05}));ee.scale.set(2.4,.4,.6),ee.position.set(k*7,.08,te*1.2),o.add(ee)}const j=new L(J.clone(),ve(i));j.scale.set(.15,.15,15.6),j.position.set(k*8.15,2.9,0),o.add(j);const K=new L(J.clone(),ve(i));K.scale.set(.15,.15,15.6),K.position.set(k*8.15,.15,0),o.add(K);for(const te of[6.5,-6.5]){const ee=new L(ze.clone(),Ke("#10102c",{metalness:.9,roughness:.3}));ee.scale.set(2,.8,2),ee.rotation.z=Math.PI/2,ee.position.set(k*7,1.5,te),o.add(ee);const Y=new L(et.clone(),ve(e));Y.scale.set(2.2,2.2,2.2),Y.position.set(k*7.5,1.5,te),Y.rotation.y=Math.PI/2,o.add(Y)}}for(const k of[-1,1]){const z=new L(J.clone(),ve(s));z.scale.set(1.2,.6,.3),z.position.set(k*3.5,4.5,7.2),o.add(z);const j=new L(J.clone(),Yt(e,{opacity:.12}));j.scale.set(2,1.2,.8),j.position.set(k*3.5,4.5,7.5),o.add(j)}for(const k of[-1,1]){const z=new L(J.clone(),ve("#ff2244"));z.scale.set(1,.5,.25),z.position.set(k*3.5,4.5,-7.2),o.add(z)}const g=new qt;g.name="turretPivot",g.position.set(0,5.5,0);const _=new L(ze.clone(),Ke("#10102e",{emissive:"#141438",emissiveIntensity:.15,metalness:.85,roughness:.3}));_.scale.set(7.5,.8,7.5),_.position.y=.4,g.add(_);const m=new L(ze.clone(),Ke("#141440",{emissive:"#1a1a50",emissiveIntensity:.2,metalness:.85,roughness:.35}));m.scale.set(6,3,6),m.position.y=1.8,m.name="turretBody",g.add(m);const h=new L(ze.clone(),Ke("#161644",{emissive:"#1c1c50",emissiveIntensity:.18,metalness:.8,roughness:.4}));h.scale.set(5,.6,5),h.position.y=3.5,g.add(h);const v=new L(ze.clone(),Ke("#121238",{emissive:"#161644",emissiveIntensity:.15,metalness:.9,roughness:.3}));v.scale.set(1.8,.5,1.8),v.position.set(-1,3.9,-.8),g.add(v);const x=new L(et.clone(),ve(e));x.scale.set(2,2,2),x.rotation.x=Math.PI/2,x.position.set(-1,4.2,-.8),g.add(x);const M=new L(et.clone(),ve(e));M.scale.set(8,8,8),M.position.y=.8,M.rotation.x=Math.PI/2,g.add(M);const b=new L(et.clone(),ve(t));b.scale.set(6,6,6),b.position.y=3.3,b.rotation.x=Math.PI/2,g.add(b);for(let k=0;k<4;k++){const z=k/4*Math.PI*2+Math.PI/4,j=new L(J.clone(),ve(i));j.scale.set(.15,2.6,.15),j.position.set(Math.sin(z)*3.05,1.8,Math.cos(z)*3.05),g.add(j)}for(const k of[-1,1]){const z=new L(J.clone(),Ke("#121236",{emissive:"#161644",emissiveIntensity:.15,metalness:.8,roughness:.4}));z.scale.set(2,2,4),z.position.set(k*3.8,1.8,1.5),z.rotation.y=k*.15,g.add(z);const j=new L(J.clone(),ve(t));j.scale.set(.15,.15,4.2),j.position.set(k*4.8,2.2,1.5),g.add(j)}const y=new qt;y.name="barrelPivot",y.position.set(0,2.5,0);const w=new L(ze.clone(),Ke("#0e0e2c",{emissive:"#141438",emissiveIntensity:.15,metalness:.9,roughness:.25}));w.scale.set(1.3,13,1.3),w.rotation.x=Math.PI/2,w.position.z=7.5,w.name="barrel",y.add(w);const P=new L(ze.clone(),Ke("#10102e",{emissive:"#161640",emissiveIntensity:.15,metalness:.85,roughness:.3}));P.scale.set(1.8,4,1.8),P.rotation.x=Math.PI/2,P.position.z=2.5,y.add(P);for(const k of[2,5,9,12]){const z=new L(et.clone(),ve(e));z.scale.set(1.8,1.8,1.8),z.position.z=k,y.add(z)}const S=new L(J.clone(),ve(t));S.scale.set(.12,.12,12),S.position.set(0,.7,7),y.add(S);const T=new L(ze.clone(),Ke("#121234",{emissive:"#181848",emissiveIntensity:.2,metalness:.9,roughness:.2}));T.scale.set(1.8,1.5,1.8),T.rotation.x=Math.PI/2,T.position.z=13.5,y.add(T);const N=new L(et.clone(),ve(s));N.scale.set(2.2,2.2,2.2),N.position.z=14,y.add(N);const F=new L(new ar(.6,12),ve(s));F.position.z=14.3,y.add(F);const $=new Et;$.name="muzzle",$.position.z=14,y.add($),g.add(y),o.add(g);const D=new L(J.clone(),ve(i));D.scale.set(.1,5,.1),D.position.set(3.5,8.5,-4),o.add(D);const B=new L($e.clone(),ve(e));B.scale.set(.5,.5,.5),B.position.set(3.5,11.2,-4),o.add(B);const X=new L(new vo(12,16),Yt(e,{opacity:.06}));return X.rotation.x=-Math.PI/2,X.position.set(0,.05,0),o.add(X),o.scale.set(1.5,1.5,1.5),o}function sy(){return Qh("playerTank","#00ffff","#00e5ff","#0088aa","#aaffff")}function oy(n="#ff3366",e=1){const t=new be(n),i="#"+t.clone().multiplyScalar(.9).getHexString(),s="#"+t.clone().multiplyScalar(.55).getHexString(),o="#"+t.clone().lerp(new be("#ffffff"),.65).getHexString();return Qh("enemyTank",n,i,s,o)}const cf=["#00ccff","#00ffaa","#ff00cc","#aa44ff","#00aaff"];let lf=0;const yo=new vo(1,1);function ry(n="tesla_coil",e=12,t="#0a1628",i=38,s=38){const o=new qt;o.name="obstacle";const a=cf[lf%cf.length];lf++;const r=Ke(t,{emissive:t,emissiveIntensity:.15}),c=ve(a),l=Yt(a,{opacity:.12});switch(n){case"tesla_coil":ay(o,e,i,s,r,c,l);break;case"power_cell":cy(o,e,i,s,r,c,l);break;case"circuit_monolith":uf(o,e,i,s,r,c,l);break;case"capacitor_bank":ly(o,e,i,s,r,c,l);break;case"relay_tower":uy(o,e,i,s,r,c,l);break;case"data_obelisk":dy(o,e,i,s,r,c,l);break;case"plasma_conduit":fy(o,e,i,s,r,c,l);break;case"power_pylon":hy(o,e,i,s,r,c,l);break;case"transformer_stack":py(o,e,i,s,r,c,l);break;case"cable_rack":my(o,e,i,s,r,c,l);break;default:uf(o,e,i,s,r,c,l)}const u=new L(yo.clone(),Yt(a,{opacity:.1}));return u.scale.set(i*1.15,s*1.15,1),u.rotation.x=-Math.PI/2,u.position.y=.15,o.add(u),o}function ay(n,e,t,i,s,o,a){const r=Math.min(t,i)*.35,c=new L(ze.clone(),s);c.scale.set(r*1.4,2,r*1.4),c.position.y=1,n.add(c);for(let x=0;x<4;x++){const M=x/4*Math.PI*2,b=new L(J.clone(),s);b.scale.set(3,2,2),b.position.set(Math.cos(M)*(r*1.2),1.5,Math.sin(M)*(r*1.2)),b.rotation.y=M,n.add(b)}const l=new L(ze.clone(),s);l.scale.set(r,e*.6,r),l.position.y=2+e*.3,n.add(l);const u=new L(ze.clone(),s);u.scale.set(r*.7,e*.4,r*.7),u.position.y=2+e*.6+e*.2,n.add(u);const d=2+e*.6,f=new L(ze.clone(),s);f.scale.set(r*1.3,.5,r*1.3),f.position.y=d,n.add(f);const p=new L(et.clone(),o);p.scale.set(r*1.35,r*1.35,r*1.35),p.position.y=d+.3,p.rotation.x=Math.PI/2,n.add(p);const g=Math.min(5,Math.max(3,Math.floor(e/6)));for(let x=0;x<g;x++){const M=(x+1)/(g+1),b=2+M*e,y=r*(1.1-M*.3),w=new L(et.clone(),o);if(w.scale.set(y,y,y),w.position.y=b,w.rotation.x=Math.PI/2,n.add(w),x>0){const S=2+x/(g+1)*e,T=b-S;for(const N of[-1,1]){const F=new L(J.clone(),o);F.scale.set(.2,T,.2),F.position.set(N*y*.45,(b+S)/2,0),n.add(F)}}}const _=new L($e.clone(),o),m=Math.max(1.5,r*.5);_.scale.set(m*2,m*2,m*2),_.position.y=e+2,n.add(_);const h=new L($e.clone(),a);h.scale.set(m*4,m*4,m*4),h.position.y=e+2,n.add(h);const v=[0,Math.PI*.7,Math.PI*1.4];for(const x of v){const M=new L(J.clone(),o),b=m*3;M.scale.set(.3,.3,b),M.position.set(Math.cos(x)*b*.4,e+2+Math.sin(x*.5)*m*.5,Math.sin(x)*b*.4),M.rotation.y=x,M.rotation.x=-.4+x*.2,n.add(M)}for(let x=0;x<4;x++){const M=x/4*Math.PI*2,b=r*.48,y=new L(J.clone(),o);y.scale.set(.4,e,.4),y.position.set(Math.cos(M)*b,2+e/2,Math.sin(M)*b),n.add(y)}}function cy(n,e,t,i,s,o,a){const r=Math.min(t,i)*.4,c=new L(ze.clone(),s);c.scale.set(r,e,r),c.position.y=e/2,n.add(c);const l=new L(ze.clone(),s);l.scale.set(r*1.15,1.5,r*1.15),l.position.y=e+.5,n.add(l);const u=new L(ze.clone(),s);u.scale.set(r*.4,2,r*.4),u.position.y=e+2.5,n.add(u);const d=new L(et.clone(),o);d.scale.set(r*.5,r*.5,r*.5),d.position.y=e+3.5,d.rotation.x=Math.PI/2,n.add(d);const f=new L(ze.clone(),s);f.scale.set(r*1.15,1.5,r*1.15),f.position.y=.75,n.add(f);const p=Math.min(4,Math.max(3,Math.floor(e/5)));for(let h=0;h<p;h++){const v=(h+1)/(p+1),x=new L(et.clone(),o),M=r*1.05;x.scale.set(M,M,M),x.position.y=v*e,x.rotation.x=Math.PI/2,n.add(x)}for(let h=0;h<4;h++){const v=h/4*Math.PI*2,x=new L(J.clone(),o);x.scale.set(1,.4,2),x.position.set(Math.cos(v)*(r*.52),e*.3,Math.sin(v)*(r*.52)),x.rotation.y=v,n.add(x)}const g=new L($e.clone(),o);g.scale.set(1.6,1.6,1.6),g.position.set(r*.52,e*.7,0),n.add(g);const _=new L($e.clone(),a);_.scale.set(3,3,3),_.position.set(r*.55,e*.7,0),n.add(_);for(const h of[-1,1]){const v=new L(J.clone(),o);v.scale.set(.3,.3,3),v.position.set(h*r*.4,.5,0),v.rotation.x=h*.7,n.add(v)}for(const h of[-1,1]){const v=new L(J.clone(),o);v.scale.set(.4,e+1,.4),v.position.set(h*r*.5,e/2,0),n.add(v)}const m=new L(yo.clone(),a);m.scale.set(r*2.5,r*2.5,1),m.rotation.x=-Math.PI/2,m.position.y=.1,n.add(m)}function uf(n,e,t,i,s,o,a){const r=t-2,c=i-2,l=new L(J.clone(),s);l.scale.set(r+2,2,c+2),l.position.y=1,n.add(l);for(const v of[-1,1]){const x=new L(J.clone(),o);x.scale.set(r+2.2,.2,.2),x.position.set(0,2.05,v*(c+2)/2),n.add(x);const M=new L(J.clone(),o);M.scale.set(.2,.2,c+2.2),M.position.set(v*(r+2)/2,2.05,0),n.add(M)}const u=new L(J.clone(),s);u.scale.set(r,e,c),u.position.y=2+e/2,n.add(u);const d=t/2,f=i/2,p=[[-d,-f],[d,-f],[d,f],[-d,f]];for(const[v,x]of p){const M=new L(J.clone(),o);M.scale.set(.5,e+.4,.5),M.position.set(v,2+e/2,x),n.add(M)}const g=Ke("#060614",{emissive:"#080820",emissiveIntensity:.05});for(const v of[-f+.35,f-.35]){const x=new L(J.clone(),g);x.scale.set(r*.95,e*.3,.3),x.position.set(0,2+e*.5,v),n.add(x);for(const M of[.35,.5,.65]){const b=new L(J.clone(),o);b.scale.set(r*.8,.2,.2),b.position.set(0,2+e*M,v+(v>0?.15:-.15)),n.add(b)}}for(const v of[-d+.3,d-.3])for(const x of[.4,.7]){const M=new L(ze.clone(),o);M.scale.set(1,.8,1),M.rotation.z=Math.PI/2,M.position.set(v+(v>0?.4:-.4),2+x*e,0),n.add(M)}const _=[.2,.45,.7,.9];for(const v of[-f+.3,f-.3]){for(let x=0;x<_.length;x++){const M=x%2===0?-r*.05:r*.08,b=new L(J.clone(),o);b.scale.set(r*.85,.35,.35),b.position.set(M,2+_[x]*e,v),n.add(b)}for(const x of[[-.3,.2,.2,.6],[.1,.5,.3,.85]]){const M=r*(x[0]+x[2])*.5,b=e*(x[1]+x[3])*.5,y=Math.sqrt((r*(x[2]-x[0]))**2+(e*(x[3]-x[1]))**2),w=Math.atan2(e*(x[3]-x[1]),r*(x[2]-x[0])),P=new L(J.clone(),o);P.scale.set(y,.25,.25),P.position.set(M,2+b,v),P.rotation.z=w,n.add(P)}}for(const v of[-d+.3,d-.3])for(let x=0;x<3;x++){const M=[.25,.55,.8][x],b=new L(J.clone(),o);b.scale.set(.35,.35,c*.8),b.position.set(v,2+M*e,x%2===0?c*.05:-c*.03),n.add(b)}for(const v of[-f+.3,f-.3])for(const x of[-r*.2,r*.25]){const M=new L(J.clone(),o);M.scale.set(.35,e*.5,.35),M.position.set(x,2+e*.45,v),n.add(M)}const m=new L(Ra.clone(),o);m.scale.set(2.5,2.5,2.5),m.position.y=2+e+1.5,n.add(m);const h=new L($e.clone(),a);h.scale.set(4,4,4),h.position.y=2+e+1.5,n.add(h)}function ly(n,e,t,i,s,o,a){const r=Math.max(t,i),c=Math.min(t,i),l=r*.25,u=c*.35,d=t>=i,f=new L(J.clone(),s);f.scale.set(r-2,1.5,c-2),f.position.y=.75,n.add(f);const p=new L(J.clone(),s);p.scale.set(4,2,3),p.position.y=.5,n.add(p);const g=new L(J.clone(),o);g.scale.set(4.2,.15,.15),g.position.set(0,1.55,1.5),n.add(g);const _=new L(J.clone(),o);_.scale.set(4.2,.15,.15),_.position.set(0,1.55,-1.5),n.add(_);for(const v of[-1,1]){const x=d?v*l:0,M=d?0:v*l,b=new L(ze.clone(),s);b.scale.set(u,e,u),b.position.set(x,e/2+1.5,M),n.add(b);for(const y of[.15,.5,.85]){const w=new L(et.clone(),o);w.scale.set(u*1.1,u*1.1,u*1.1),w.rotation.x=Math.PI/2,w.position.set(x,1.5+y*e,M),n.add(w)}for(const y of[.25,.5,.75,1]){const w=e*.08,P=new L(J.clone(),o);d?(P.scale.set(.3,w,u*.6+u),P.position.set(x,1.5+y*e,M)):(P.scale.set(u*.6+u,w,.3),P.position.set(x,1.5+y*e,M)),n.add(P)}for(const y of[-1,1]){const w=new L($e.clone(),a);w.scale.set(1.2,1.2,1.2),d?w.position.set(x+y*u*.3,1.5+e+.5,M):w.position.set(x,1.5+e+.5,M+y*u*.3),n.add(w)}}const m=3;for(let v=0;v<m;v++){const x=(v+1)/(m+1),M=new L(J.clone(),o);d?M.scale.set(l*2,.8,.8):M.scale.set(.8,.8,l*2),M.position.set(0,1.5+x*e,0),n.add(M);for(const b of[-1,1]){const y=new L($e.clone(),o);y.scale.set(1,1,1),d?y.position.set(b*l,1.5+x*e,0):y.position.set(0,1.5+x*e,b*l),n.add(y)}}const h=new L(yo.clone(),a);h.scale.set(r*1.1,c*1.1,1),h.rotation.x=-Math.PI/2,h.position.y=.1,n.add(h)}function uy(n,e,t,i,s,o,a){const r=Math.min(t,i)*.18,c=r*3,l=new L(ze.clone(),s);l.scale.set(c,2.5,c),l.position.y=1.25,n.add(l);for(let w=0;w<4;w++){const P=w/4*Math.PI*2+Math.PI/4,S=new L(J.clone(),s);S.scale.set(2,2,2),S.position.set(Math.cos(P)*c*.9,1,Math.sin(P)*c*.9),n.add(S)}const u=new L(ze.clone(),s);u.scale.set(r,e-2.5,r),u.position.y=2.5+(e-2.5)/2,n.add(u);const d=2.5+(e-2.5)*.5,f=new L(ze.clone(),s);f.scale.set(r*2.5,.8,r*2.5),f.position.y=d,n.add(f);const p=new L(et.clone(),o);p.scale.set(r*2.6,r*2.6,r*2.6),p.position.y=d+.5,p.rotation.x=Math.PI/2,n.add(p);const g=Math.min(6,Math.max(4,Math.floor(e/7)));for(let w=0;w<g;w++){const P=(w+1)/(g+1),S=new L(et.clone(),o),T=r*(1.3-P*.3);S.scale.set(T,T,T),S.position.y=2.5+P*(e-2.5),S.rotation.x=Math.PI/2,n.add(S)}const _=[{frac:.4,lenMul:.7},{frac:.65,lenMul:.85},{frac:.85,lenMul:1}],m=r*5;for(const w of _){const P=2.5+(e-2.5)*w.frac,S=m*w.lenMul,T=new L(J.clone(),o);T.scale.set(S,.5,.5),T.position.y=P,n.add(T);const N=new L(J.clone(),o);N.scale.set(.5,.5,S),N.position.y=P,n.add(N)}const h=2.5+(e-2.5)*.4,v=m*.7,x=[[1,0],[-1,0],[0,1],[0,-1]];for(const[w,P]of x){const S=w*v/2,T=P*v/2,N=w*c*.9,F=P*c*.9,$=Math.sqrt((S-N)**2+(h-2)**2+(T-F)**2),D=new L(J.clone(),o);D.scale.set(.2,$,.2),D.position.set((S+N)/2,(h+2)/2,(T+F)/2);const B=Math.atan2(S-N,T-F),X=Math.atan2(h-2,Math.sqrt((S-N)**2+(T-F)**2));D.rotation.set(0,0,-X),D.rotation.y=B,n.add(D)}const M=new L(Ra.clone(),o);M.scale.set(3,3,3),M.position.y=e+1.5,n.add(M);const b=[0,Math.PI*.67,Math.PI*1.33];for(const w of b){const P=new L(J.clone(),o);P.scale.set(.2,5,.2),P.position.set(Math.cos(w)*.8,e+5,Math.sin(w)*.8),P.rotation.z=Math.cos(w)*.08,P.rotation.x=Math.sin(w)*.08,n.add(P);const S=new L($e.clone(),a);S.scale.set(.8,.8,.8),S.position.set(Math.cos(w)*.8,e+7.5,Math.sin(w)*.8),n.add(S)}const y=new L($e.clone(),a);y.scale.set(14,14,14),y.position.y=e+1.5,n.add(y);for(const w of[-1,1]){const P=new L(J.clone(),o);P.scale.set(.3,e-2.5,.3),P.position.set(w*r*.5,2.5+(e-2.5)/2,0),n.add(P)}}function dy(n,e,t,i,s,o,a){const r=t-4,c=i-4,l=e>30?[{frac:.25,widthScale:1},{frac:.25,widthScale:.88},{frac:.25,widthScale:.75},{frac:.25,widthScale:.62}]:[{frac:.33,widthScale:1},{frac:.33,widthScale:.85},{frac:.34,widthScale:.7}];let u=0;for(const M of l){const b=e*M.frac,y=r*M.widthScale,w=c*M.widthScale,P=new L(J.clone(),s);P.scale.set(y,b,w),P.position.y=u+b/2,n.add(P),u+=b}const d=Math.min(7,Math.max(5,Math.floor(e/3))),f=r/2,p=c/2;for(let M=0;M<d;M++){const b=(M+1)/(d+1),y=b*e,w=1-b*.3,P=new L(J.clone(),o);P.scale.set(r*w+1,.35,c*w+1),P.position.y=y,n.add(P)}const g=[[-f,-p],[f,-p],[f,p],[-f,p]];for(const[M,b]of g){const y=new L(J.clone(),o);y.scale.set(.5,e,.5),y.position.set(M*.85,e/2,b*.85),n.add(y)}for(const M of[{x:0,z:p*.86},{x:0,z:-p*.86},{x:f*.86,z:0},{x:-f*.86,z:0}]){const b=new L(J.clone(),o);b.scale.set(.3,e,.3),b.position.set(M.x,e/2,M.z),n.add(b)}for(const[M,b]of g){const y=new L(ze.clone(),o);y.scale.set(.8,1.5,.8),y.position.set(M*.85,.75,b*.85),y.rotation.z=M>0?.25:-.25,y.rotation.x=b>0?-.25:.25,n.add(y)}const _=new L(et.clone(),o),m=r*.6;_.scale.set(m,m,m),_.position.y=e*.9,_.rotation.x=Math.PI/2+.26,n.add(_);const h=new L(Jh.clone(),o);h.scale.set(2.5,2.5,2.5),h.position.y=e+3,n.add(h);const v=new L(et.clone(),o);v.scale.set(3,3,3),v.position.y=e+3,v.rotation.x=Math.PI/2,n.add(v);const x=new L($e.clone(),a);x.scale.set(5,5,5),x.position.y=e+3,n.add(x)}function fy(n,e,t,i,s,o,a){const r=Math.max(t,i),c=Math.min(t,i),l=Math.min(e*.4,c*.3),u=r-4,d=e*.55,f=t>=i,p=new L(ze.clone(),s);f?(p.scale.set(l,u,l),p.rotation.z=Math.PI/2):(p.scale.set(l,u,l),p.rotation.x=Math.PI/2),p.position.y=d,n.add(p);const g=[-u/2,0,u/2];for(const b of g){const y=new L(et.clone(),o);y.scale.set(l*1.3,l*1.3,l*1.3),f?(y.position.set(b,d,0),y.rotation.y=Math.PI/2):y.position.set(0,d,b),n.add(y)}const _=new L(et.clone(),o),m=l*.7;_.scale.set(m,m,m),_.position.y=d,f?(_.rotation.y=Math.PI/2,_.rotation.z=Math.PI/2):(_.rotation.x=Math.PI/2,_.rotation.z=Math.PI/2),n.add(_);for(const b of[.25,.75]){const y=(b-.5)*u,w=new L(ze.clone(),s);w.scale.set(1,1.5,1),f?w.position.set(y,d+l*.5+.75,0):w.position.set(0,d+l*.5+.75,y),n.add(w);const P=new L($e.clone(),o);P.scale.set(1.2,1.2,1.2),f?P.position.set(y,d+l*.5+1.6,0):P.position.set(0,d+l*.5+1.6,y),n.add(P)}const h=new L($e.clone(),Yt(o.color.getHexString?"#"+o.color.getHexString():"#00ffff",{opacity:.08}));h.scale.set(l,l,l),h.position.y=d-l*.7,n.add(h);const v=[-u*.3,u*.3];for(const b of v){const y=new L(J.clone(),s);y.scale.set(1.5,d,1.5),f?y.position.set(b,d/2,0):y.position.set(0,d/2,b),n.add(y);const w=new L(et.clone(),o);w.scale.set(1.8,1.8,1.8),w.rotation.x=Math.PI/2,f?w.position.set(b,d*.5,0):w.position.set(0,d*.5,b),n.add(w);const P=new L(J.clone(),o),S=Math.sqrt(d*d*.25+4);P.scale.set(.25,S,.25);const T=Math.atan2(2,d*.5);f?(P.position.set(b+1,d*.4,0),P.rotation.z=T):(P.position.set(0,d*.4,b+1),P.rotation.x=-T),n.add(P)}const x=new L(J.clone(),o);f?(x.scale.set(u,.4,.4),x.position.set(0,d+l*.5,0)):(x.scale.set(.4,.4,u),x.position.set(0,d+l*.5,0)),n.add(x);for(const b of[-1,1]){const y=new L(ze.clone(),s);y.scale.set(l*1.3,1.5,l*1.3);const w=new L(et.clone(),o);w.scale.set(l*1.35,l*1.35,l*1.35),f?(y.position.set(b*u/2,d,0),y.rotation.z=Math.PI/2,w.position.set(b*(u/2+.5),d,0),w.rotation.y=Math.PI/2):(y.position.set(0,d,b*u/2),y.rotation.x=Math.PI/2,w.position.set(0,d,b*(u/2+.5))),n.add(y),n.add(w)}const M=new L(yo.clone(),a);M.scale.set(r*1.1,c*1.1,1),M.rotation.x=-Math.PI/2,M.position.y=.1,n.add(M)}function hy(n,e,t,i,s,o,a){const r=Math.min(t,i),c=new L(ze.clone(),s);c.scale.set(r*.4,3,r*.4),c.position.y=1.5,n.add(c);const l=r*.35,u=l*.8,d=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[h,v]of d){const x=h*l/2,M=v*l/2,b=h*u/2,y=v*u/2,w=new L(J.clone(),s);w.scale.set(.8,e,.8),w.position.set((x+b)/2,e/2,(M+y)/2),n.add(w);const P=new L(J.clone(),o);P.scale.set(.2,e,.2),P.position.set((x+b)/2,e/2,(M+y)/2),n.add(P)}const f=Math.max(5,Math.floor(e/(e*.15)));for(let h=1;h<=f;h++){const v=h/(f+1),x=v*e,M=l+(u-l)*v,b=M/2,y=[{x:0,z:-b,sx:M,sz:.3},{x:0,z:b,sx:M,sz:.3},{x:-b,z:0,sx:.3,sz:M},{x:b,z:0,sx:.3,sz:M}];for(const D of y){const B=new L(J.clone(),o);B.scale.set(D.sx,.3,D.sz),B.position.set(D.x,x,D.z),n.add(B)}const w=(h-1)/(f+1),P=w*e,T=(l+(u-l)*w)/2,N=x-P,F=Math.sqrt(N*N+M*M*.5),$=h%2===0?[[-1,-1,1,1],[1,-1,-1,1]]:[[-1,1,1,-1],[1,1,-1,-1]];for(const[D,B,X,k]of $){const z=D*T,j=B*T,K=X*b,te=k*b,ee=new L(J.clone(),o);ee.scale.set(.3,F,.3),ee.position.set((z+K)/2,(P+x)/2,(j+te)/2);const Y=Math.atan2(K-z,N),Z=Math.atan2(te-j,N);ee.rotation.set(-Z,0,Y),n.add(ee)}}const p=[.7,.9];for(const h of p){const v=h*e,x=r*.8,M=new L(J.clone(),o);M.scale.set(x,.5,.5),M.position.y=v,n.add(M);const b=new L(J.clone(),o);b.scale.set(.5,.5,x),b.position.y=v,n.add(b);const y=[[x/2,0],[-x/2,0],[0,x/2],[0,-x/2]];for(const[w,P]of y){const S=new L(ze.clone(),s);S.scale.set(.6,2,.6),S.position.set(w,v-1.5,P),n.add(S);const T=new L($e.clone(),o);T.scale.set(1,1,1),T.position.set(w,v-2.5,P),n.add(T)}}const g=new L($e.clone(),o);g.scale.set(4,4,4),g.position.y=e+2,n.add(g);const _=new L($e.clone(),a);_.scale.set(16,16,16),_.position.y=e+2,n.add(_);const m=new L(yo.clone(),a);m.scale.set(r*1.5,r*1.5,1),m.rotation.x=-Math.PI/2,m.position.y=.15,n.add(m)}function py(n,e,t,i,s,o,a){const r=Math.min(t,i),c=new L(J.clone(),s);c.scale.set(t-2,2,i-2),c.position.y=1,n.add(c);const l=e<28?2:3,u=2,d=(l-1)*u,f=(e-2-d)/l,p=r*.35;let g=2;for(let M=0;M<l;M++){const b=new L(ze.clone(),s);b.scale.set(p,f,p),b.position.y=g+f/2,n.add(b);for(const y of[0,1]){const w=new L(et.clone(),o);w.scale.set(p*1.1,p*1.1,p*1.1),w.rotation.x=Math.PI/2,w.position.y=g+y*f,n.add(w)}for(let y=0;y<6;y++){const w=y/6*Math.PI*2,P=new L(J.clone(),o),S=f*.6;P.scale.set(r*.25,S,.3),P.position.set(Math.cos(w)*(p*.5+r*.12),g+f*.5,Math.sin(w)*(p*.5+r*.12)),P.rotation.y=w,n.add(P)}if(g+=f,M<l-1){const y=new L(ze.clone(),s);y.scale.set(p*.5,.5,p*.5),y.position.y=g+u/2,n.add(y);const w=new L(et.clone(),o);w.scale.set(p*.6,p*.6,p*.6),w.rotation.x=Math.PI/2,w.position.y=g+u/2,n.add(w),g+=u}}const _=3,m=new L(ze.clone(),s);m.scale.set(r*.15,_,r*.15),m.position.y=g+_/2,n.add(m);const h=new L($e.clone(),o);h.scale.set(2.4,2.4,2.4),h.position.y=g+_+.5,n.add(h);const v=new L($e.clone(),a);v.scale.set(6,6,6),v.position.y=g+_+.5,n.add(v);for(const M of[-1,1]){const b=new L(J.clone(),s);b.scale.set(2,1,3),b.position.set(M*(p*.5+1.5),2+e*.4,0),n.add(b);const y=new L(J.clone(),o);y.scale.set(2.2,.15,.15),y.position.set(M*(p*.5+1.5),2+e*.4+.6,0),n.add(y)}const x=new L(yo.clone(),a);x.scale.set(t*1.1,i*1.1,1),x.rotation.x=-Math.PI/2,x.position.y=.15,n.add(x)}function my(n,e,t,i,s,o,a){const r=Math.max(t,i),c=Math.min(t,i),l=t>=i,u=e,d=r*.4,f=c*.2;for(const v of[-1,1])for(const x of[-1,1]){const M=l?v*d:x*f,b=l?x*f:v*d,y=new L(J.clone(),s);y.scale.set(1.5,u,1.5),y.position.set(M,u/2,b),n.add(y);for(const w of[.25,.75]){const P=new L(et.clone(),o);P.scale.set(1.8,1.8,1.8),P.rotation.x=Math.PI/2,P.position.set(M,u*w,b),n.add(P)}}for(const v of[-1,1]){const x=l?v*d:-f,M=l?-f:v*d,b=l?v*d:f,y=l?f:v*d,w=Math.sqrt((b-x)**2+(u*.4)**2+(y-M)**2),P=new L(J.clone(),o);P.scale.set(.3,w,.3),P.position.set((x+b)/2,u*.5,(M+y)/2);const S=Math.atan2(Math.sqrt((b-x)**2+(y-M)**2),u*.4);l?P.rotation.x=S:P.rotation.z=S,n.add(P)}const p=r-4,g=c*.5,_=new L(J.clone(),s);l?_.scale.set(p,2,g):_.scale.set(g,2,p),_.position.y=e-1,n.add(_);const m=Math.min(4,Math.max(3,Math.floor(c/10)));for(let v=0;v<m;v++){const x=(v+.5)/m-.5,M=new L(J.clone(),o);l?(M.scale.set(p-2,.5,.5),M.position.set(0,e,x*g*.8)):(M.scale.set(.5,.5,p-2),M.position.set(x*g*.8,e,0)),n.add(M)}for(const v of[-1,1]){const x=new L(J.clone(),s);x.scale.set(2,1.5,2),l?x.position.set(v*(p/2-1),e-.5,0):x.position.set(0,e-.5,v*(p/2-1)),n.add(x);const M=new L(J.clone(),o);l?(M.scale.set(2.2,.15,2.2),M.position.set(v*(p/2-1),e+.25,0)):(M.scale.set(2.2,.15,2.2),M.position.set(0,e+.25,v*(p/2-1))),n.add(M)}for(const v of[.3,.7]){const x=new L(J.clone(),o);l?(x.scale.set(p*.15,.3,.3),x.position.set((v-.5)*p,e-3,0)):(x.scale.set(.3,.3,p*.15),x.position.set(0,e-3,(v-.5)*p)),n.add(x)}const h=new L(J.clone(),a);l?h.scale.set(p,.3,g*.5):h.scale.set(g*.5,.3,p),h.position.y=e-2.2,n.add(h)}const gy={sabot_ammo:"#00ffff",heavy_ammo:"#ff44ff",mine_pack:"#ffaa00",health_pack:"#00ff66"};function _y(n="sabot_ammo"){const e=new qt;e.name="powerup";const t=gy[n]||"#ffffff";if(n==="health_pack"){const i=ve(t),s=new L(J.clone(),i);s.scale.set(6,1.5,1.5),s.position.y=6,s.name="shape",e.add(s);const o=new L(J.clone(),i);o.scale.set(1.5,1.5,6),o.position.y=6,e.add(o);const a=new L($e.clone(),Yt(t,{opacity:.15}));a.scale.set(8,8,8),a.position.y=6,a.name="glow",e.add(a);const r=new L(et.clone(),ve(t));r.scale.set(5,5,5),r.position.y=6,r.name="ring",e.add(r)}else{let i;n==="sabot_ammo"?i=new L(Ra.clone(),ve(t)):n==="mine_pack"?i=new L(Ra.clone(),ve(t)):i=new L(Jh.clone(),ve(t)),i.scale.set(4,4,4),i.position.y=6,i.name="shape",e.add(i);const s=new L($e.clone(),Yt(t,{opacity:.15}));s.scale.set(8,8,8),s.position.y=6,s.name="glow",e.add(s);const o=new L(et.clone(),ve(t));o.scale.set(5,5,5),o.position.y=6,o.name="ring",e.add(o)}return e}function xy(){const n=new qt;n.name="mine";const e=new L(ze.clone(),Ke("#0a1628",{emissive:"#0e1e38",emissiveIntensity:.15}));e.scale.set(5,1,5),e.position.y=.5,n.add(e);const t="#ffaa00";for(let s=0;s<4;s++){const o=new L(et.clone(),ve(t)),a=1.2+s*.8;o.scale.set(a,a,a),o.rotation.x=Math.PI/2,o.position.y=1.05,o.name=`accentRing${s}`,n.add(o)}const i=new L(new ar(1.5,16),ve(t));return i.rotation.x=-Math.PI/2,i.position.y=1.1,i.name="topDisc",n.add(i),n}const vy={he:"#00ffff",sabot:"#ffaa00",heavy:"#ff44ff"};function My(n="he"){const e=new qt;e.name="projectile";const t=vy[n]||"#ffffff",i=yy[n]||"#888888",s=n==="heavy"?2:n==="sabot"?1.2:1.5,o=new L($e.clone(),ve(t));o.scale.setScalar(s),o.name="core",e.add(o);const a=new L($e.clone(),new vt({color:16777215,depthWrite:!1}));a.scale.setScalar(s*.45),e.add(a);const r=new L($e.clone(),Yt(t,{opacity:.2}));r.scale.setScalar(s*3),r.name="halo",e.add(r);const c=new L(J.clone(),new vt({color:Ii(t),transparent:!0,opacity:.6,depthWrite:!1}));c.scale.set(s*.3,s*.3,s*4),c.position.z=-s*2,c.name="trail",e.add(c);const l=new L(J.clone(),new vt({color:Ii(i),transparent:!0,opacity:.25,depthWrite:!1}));if(l.scale.set(s*.15,s*.15,s*7),l.position.z=-s*5,e.add(l),n==="sabot")for(const u of[-1,1]){const d=new L(J.clone(),new vt({color:Ii("#ffdd66"),transparent:!0,opacity:.35,depthWrite:!1}));d.scale.set(.1,.1,s*5),d.position.set(u*s*.5,0,-s*3),e.add(d)}if(n==="heavy"){const u=new L(new Kn(.5,.08,8,16),new vt({color:Ii("#ff66ff"),transparent:!0,opacity:.7,depthWrite:!1}));u.scale.setScalar(s*1.5),u.name="projRing",e.add(u)}return e}const yy={he:"#006688",sabot:"#885500",heavy:"#882288"};function by(n,e=18){const t=new qt;t.name="explosion",t.position.set(n.x,n.y,n.z);const i=new L($e.clone(),new vt({color:16777215,transparent:!0,opacity:1,depthWrite:!1}));i.scale.set(2,2,2),i.name="core",t.add(i);const s=new L(new Kn(1,.15,8,32),new vt({color:16737792,transparent:!0,opacity:.9,depthWrite:!1}));s.rotation.x=Math.PI/2,s.name="ring",t.add(s);const o=new L($e.clone(),Yt("#ff4400",{opacity:.3}));return o.scale.set(4,4,4),o.name="outerGlow",t.add(o),t.userData.maxRadius=e,t.userData.t=0,t}function Sy(n){const e=new qt;e.name="muzzleFlash",e.position.set(n.x,n.y,n.z);const t=new L($e.clone(),new vt({color:16777215,transparent:!0,opacity:1,depthWrite:!1}));t.scale.set(4,4,4),t.name="flash",e.add(t);const i=new L($e.clone(),new vt({color:16746530,transparent:!0,opacity:.9,depthWrite:!1}));i.scale.set(6,6,6),i.name="fireball",e.add(i);const s=new L($e.clone(),Yt("#ffaa00",{opacity:.35}));s.scale.set(10,10,10),s.name="glow",e.add(s);const o=new L(new Kn(.5,.12,8,24),new vt({color:16763972,transparent:!0,opacity:.8,depthWrite:!1}));o.rotation.x=Math.PI/2,o.scale.set(3,3,3),o.name="shockRing",e.add(o);for(let a=0;a<6;a++){const r=a/6*Math.PI*2,c=new L(J.clone(),new vt({color:16768358,transparent:!0,opacity:.7,depthWrite:!1}));c.scale.set(.3,.3,5),c.position.set(Math.cos(r)*2,Math.sin(r)*2,0),c.lookAt(Math.cos(r)*10,Math.sin(r)*10,0),c.name=`spike${a}`,e.add(c)}return e.userData.t=0,e}function wy(){const e=new Float32Array(900),t=new Tt;t.setAttribute("position",new wt(e,3)),t.setDrawRange(0,0);const i=new ru({color:65535,transparent:!0,opacity:.5,depthWrite:!1}),s=new jh(t,i);return s.name="aimAssistLine",s.frustumCulled=!1,s}function Ey(){const n=new qt;n.name="landingMarker";const e=new L(new Kn(3,.15,8,32),ve("#00ffff"));e.rotation.x=Math.PI/2,e.position.y=.3,n.add(e);const t=new L(new ar(3,24),Yt("#00ffff",{opacity:.12}));return t.rotation.x=-Math.PI/2,t.position.y=.2,n.add(t),n}const ic={firepower:"#ff00ff",armor:"#00ffff",mobility:"#32ff64",systems:"#ffd700"},xl=new Kn(.5,.08,8,24),Ty=new nc(1,16,16);function Ay(n){const e=[];n.traverse(t=>{t.userData&&t.userData.upgradeVisual&&e.push(t)});for(const t of e)if(t.parent&&t.parent.remove(t),t.geometry&&t.geometry.dispose(),t.material)if(Array.isArray(t.material))for(const i of t.material)i.dispose();else t.material.dispose()}function Ye(n){return n.userData.upgradeVisual=!0,n}function Ry(n,e,t){if(!n||!e||!e.tracks)return;Ay(n);const i=e.tracks,s=n.getObjectByName("turretPivot"),o=s==null?void 0:s.getObjectByName("barrelPivot");i.firepower&&i.firepower.tier>=1&&Cy(o||n,i.firepower),i.armor&&i.armor.tier>=1&&Py(n,i.armor),i.mobility&&i.mobility.tier>=1&&Ly(n,i.mobility),i.systems&&i.systems.tier>=1&&Dy(n,s||n,o,i.systems)}function Cy(n,e){const t=ic.firepower;if(e.tier>=1){const i=Ye(new L(xl.clone(),ve(t)));i.scale.set(2,2,2),i.position.z=13,n.add(i)}if(e.tier>=2){const i=Ye(new L(xl.clone(),ve(t)));i.scale.set(2,2,2),i.position.z=8,n.add(i);const s=Ye(new L(ze.clone(),Ke("#1a0a2a",{emissive:"#2a0a3a",emissiveIntensity:.2})));s.scale.set(1.8,4,1.8),s.rotation.x=Math.PI/2,s.position.z=3,n.add(s)}if(e.branch==="a"){for(const s of[-.6,.6]){const o=Ye(new L(ze.clone(),ve(t)));o.scale.set(.5,3,.5),o.rotation.x=Math.PI/2,o.position.set(s,0,14.5),n.add(o)}const i=Ye(new L($e.clone(),Yt(t,{opacity:.15})));i.scale.set(3,3,3),i.position.z=14.5,n.add(i)}if(e.branch==="b"){const i=Ye(new L(ze.clone(),Ke("#1a0828",{emissive:"#2a0a3a",emissiveIntensity:.25})));i.scale.set(2.2,10,2.2),i.rotation.x=Math.PI/2,i.position.z=8,n.add(i);const s=Ye(new L(new ec(1.5,.8,2.5,12),ve(t)));s.rotation.x=Math.PI/2,s.position.z=14.5,n.add(s);const o=Ye(new L(ze.clone(),Yt(t,{opacity:.12})));o.scale.set(2.8,12,2.8),o.rotation.x=Math.PI/2,o.position.z=8,n.add(o)}}function Py(n,e){const t=ic.armor;if(e.tier>=1)for(const i of[-1,1])for(const s of[-3,3]){const o=Ye(new L(J.clone(),Ke("#0a2838",{emissive:"#0e3448",emissiveIntensity:.2})));o.scale.set(.6,2,3),o.position.set(i*5.6,4,s),n.add(o);const a=Ye(new L(J.clone(),ve(t)));a.scale.set(.15,.15,3.2),a.position.set(i*5.95,5.1,s),n.add(a)}if(e.tier>=2){for(const o of[-1,1]){const a=Ye(new L(J.clone(),Ke("#0a2838",{emissive:"#0e3448",emissiveIntensity:.2})));a.scale.set(.8,2.5,4),a.position.set(o*5.8,3.5,0),n.add(a);const r=Ye(new L(J.clone(),ve(t)));r.scale.set(.15,.15,4.2),r.position.set(o*6.2,4.8,0),n.add(r)}const i=Ye(new L(J.clone(),Ke("#0a2838",{emissive:"#0e3448",emissiveIntensity:.25})));i.scale.set(8,1.5,3),i.position.set(0,3.5,8.5),i.rotation.x=-.35,n.add(i);const s=Ye(new L(J.clone(),ve(t)));s.scale.set(8.2,.15,.15),s.position.set(0,4.3,9.5),n.add(s)}if(e.branch==="a"){for(const o of[-1,1]){const a=Ye(new L(J.clone(),Ke("#0a2838",{emissive:"#0e3448",emissiveIntensity:.25})));a.scale.set(1.2,4,12),a.position.set(o*6.5,3,0),n.add(a);const r=Ye(new L(J.clone(),ve(t)));r.scale.set(.2,.2,12.2),r.position.set(o*7.1,5.1,0),n.add(r)}const i=Ye(new L(J.clone(),Ke("#0a2838",{emissive:"#0e3448",emissiveIntensity:.25})));i.scale.set(10,3,1),i.position.set(0,3,-7.8),n.add(i);const s=Ye(new L(J.clone(),ve(t)));s.scale.set(10.2,.2,.2),s.position.set(0,4.6,-8.2),n.add(s)}if(e.branch==="b"){const i=new vt({color:new be(t),transparent:!0,opacity:.15,depthWrite:!1,side:On}),s=Ye(new L(Ty.clone(),i));s.scale.set(10,10,10),s.position.y=4,s.name="shieldBubble",n.add(s)}}function Ly(n,e){const t=ic.mobility;if(e.tier>=1){const i=Ye(new L(J.clone(),Yt(t,{opacity:.15})));i.scale.set(8,2,4),i.position.set(0,4.5,-6),n.add(i)}if(e.tier>=2)for(const i of[-1,1]){const s=Ye(new L(ze.clone(),Ke("#0a280a",{emissive:"#0e380e",emissiveIntensity:.3})));s.scale.set(1.2,2.5,1.2),s.rotation.x=Math.PI/2,s.position.set(i*2.5,4,-8),n.add(s);const o=Ye(new L(et.clone(),ve(t)));o.scale.set(1.4,1.4,1.4),o.position.set(i*2.5,4,-9.2),n.add(o)}if(e.branch==="a")for(const i of[-1,1]){const s=Ye(new L(ze.clone(),Ke("#0a280a",{emissive:"#0e380e",emissiveIntensity:.35})));s.scale.set(2,4,2),s.rotation.x=Math.PI/2,s.position.set(i*3,3.5,-8.5),n.add(s);const o=Ye(new L(et.clone(),ve(t)));o.scale.set(2.5,2.5,2.5),o.position.set(i*3,3.5,-10.5),n.add(o);const a=Ye(new L($e.clone(),Yt(t,{opacity:.2})));a.scale.set(3,3,3),a.position.set(i*3,3.5,-10.5),a.name="afterburnerFlame",n.add(a)}if(e.branch==="b"){const i=n.getObjectByName("hull");if(i&&i.geometry){const s=new GM(i.geometry),o=new ru({color:new be(t),transparent:!0,opacity:.6}),a=Ye(new VM(s,o));a.name="ghostDriveWireframe",a.scale.copy(i.scale),a.position.copy(i.position),n.add(a)}}}function Dy(n,e,t,i){const s=ic.systems;if(i.tier>=1){const o=Ye(new L(ze.clone(),ve(s)));o.scale.set(.15,3,.15),o.position.set(1.5,5,-1.5),e.add(o);const a=Ye(new L($e.clone(),ve(s)));a.scale.set(.5,.5,.5),a.position.set(1.5,6.6,-1.5),e.add(a)}if(i.tier>=2){const o=Ye(new L(ze.clone(),Ke("#282010",{emissive:"#3a3018",emissiveIntensity:.25})));o.scale.set(2,.3,2),o.position.set(-1.5,4.2,-1.5),e.add(o);const a=Ye(new L(et.clone(),ve(s)));a.scale.set(2.2,2.2,2.2),a.rotation.x=Math.PI/2,a.position.set(-1.5,4.4,-1.5),e.add(a);const r=Ye(new L(xl.clone(),ve(s)));r.scale.set(8,8,8),r.rotation.x=Math.PI/2,r.position.y=.2,e.add(r)}if(i.branch==="a"&&t){const o=Ye(new L(ze.clone(),ve(s)));o.scale.set(.2,8,.2),o.rotation.x=Math.PI/2,o.position.z=18,t.add(o);const a=Ye(new L($e.clone(),Yt(s,{opacity:.15})));a.scale.set(2,2,2),a.position.z=22,t.add(a)}if(i.branch==="b"){const o=Ye(new L(ze.clone(),Ke("#282010",{emissive:"#3a3018",emissiveIntensity:.2})));o.scale.set(.6,4,.6),o.rotation.x=-.6,o.position.set(0,4.5,-7.5),n.add(o);const a=Ye(new L($e.clone(),ve(s)));a.scale.set(1,1,1),a.position.set(0,5,-7.5),n.add(a);for(const r of[-1,1]){const c=Ye(new L(J.clone(),ve(s)));c.scale.set(.15,1.5,3),c.position.set(r*5.3,3,-4),n.add(c)}}}function Iy(n,e,t){const i=n.getObjectByName("shieldBubble");if(!i)return;if(!e||!e.active){i.material.opacity=0;return}const s=e.hp/e.hpMax;e.hp<=0?e.rechargeTimer>0?i.material.opacity=0:(i.userData._rechargePhase=(i.userData._rechargePhase||0)+t*2,i.material.opacity=.05+.05*Math.sin(i.userData._rechargePhase)):s>=1?(i.material.opacity=.15,i.userData._rechargePhase=0):i.material.opacity=.08+.07*s,i.userData._hitFlashTimer>0&&(i.userData._hitFlashTimer-=t,i.material.opacity=.4)}const Hr=new WeakMap;function Uy(n,e){if(!n.userData._ghostDriveActive)return;n.userData._ghostDriveTime=(n.userData._ghostDriveTime||0)+e;const t=n.userData._ghostDriveTime,i=.45+.1*Math.sin(t*Math.PI);n.traverse(o=>{o.isMesh&&(o.userData.upgradeVisual||o.name!=="shieldBubble"&&o.material&&o.material.isMeshStandardMaterial&&(o.material.opacity=i))});const s=n.getObjectByName("ghostDriveWireframe");s&&s.material&&(s.material.opacity=.4+.3*Math.sin(t*Math.PI*1.5))}function Ny(n,e){n.userData._ghostDriveActive!==e&&(n.userData._ghostDriveActive=e,n.traverse(t=>{if(t.isMesh&&!t.userData.upgradeVisual&&t.name!=="shieldBubble"&&t.material){if(e)t.material.isMeshStandardMaterial&&(Hr.has(t.material)||Hr.set(t.material,{transparent:t.material.transparent,opacity:t.material.opacity,depthWrite:t.material.depthWrite}),t.material.transparent=!0,t.material.opacity=.5,t.material.depthWrite=!1,t.material.needsUpdate=!0);else if(t.material.isMeshStandardMaterial){const i=Hr.get(t.material);i&&(t.material.transparent=i.transparent,t.material.opacity=i.opacity,t.material.depthWrite=i.depthWrite,t.material.needsUpdate=!0,Hr.delete(t.material))}}}))}const nt=2048,zy=30,ea=new Float32Array(nt),is=new Float32Array(nt),ta=new Float32Array(nt),vl=new Float32Array(nt),ks=new Float32Array(nt),Ml=new Float32Array(nt),yl=new Float32Array(nt),bl=new Float32Array(nt),Sl=new Float32Array(nt),Ws=new Float32Array(nt),Ca=new Float32Array(nt),ss=new Float32Array(nt),ep=new Float32Array(nt),Xs=new Float32Array(nt),Co=0,Un=1,na=2,Hs=4,Zt=0,ia=1,tp=new Uint8Array(nt),np=new Uint8Array(nt);let Vc=0,qs,Ys,Pa,ai,Vr,js,$s,La,Ei,Gr;function Oy(n){ss.fill(0),Ws.fill(0),Ca.fill(0),Xs.fill(0),is.fill(-200),qs=new Float32Array(nt*3),Ys=new Float32Array(nt*4),Pa=new Float32Array(nt),ai=new Tt,ai.setAttribute("position",new wt(qs,3)),ai.setAttribute("color",new wt(Ys,4)),ai.setAttribute("size",new wt(Pa,1));const e=new ml({size:1.5,vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:va});Vr=new Qd(ai,e),Vr.frustumCulled=!1,Vr.name="particleSystem_additive",n.add(Vr),js=new Float32Array(nt*3),$s=new Float32Array(nt*4),La=new Float32Array(nt),Ei=new Tt,Ei.setAttribute("position",new wt(js,3)),Ei.setAttribute("color",new wt($s,4)),Ei.setAttribute("size",new wt(La,1));const t=new ml({size:1.5,vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:us});Gr=new Qd(Ei,t),Gr.frustumCulled=!1,Gr.name="particleSystem_normal",n.add(Gr)}function Fy(n){const e=Vc;return Vc=(Vc+n)%nt,e}const Wr=new be,By={explosion:{count:[30,50],color:"#ff6622",colorVar:.15,speed:[18,40],lifetime:[.5,.7],size:[1,3],flags:Un|Hs,blend:Zt,spread:1,upBias:.5},sparks:{count:[10,20],color:"#ffffaa",colorVar:.1,speed:[30,55],lifetime:[.2,.3],size:[.4,1.2],flags:Un,blend:Zt,spread:.8,upBias:.3},smoke:{count:[5,10],color:"#333333",colorVar:.05,speed:[3,8],lifetime:[1,1.5],size:[2,4],flags:na,blend:ia,spread:.4,upBias:1},muzzleFlash:{count:[8,12],color:"#ffdd66",colorVar:.12,speed:[20,40],lifetime:[.15,.25],size:[.8,2.5],flags:Un,blend:Zt,spread:.5,upBias:.2,cone:!0},powerupSparkle:{count:[5,8],color:"#ffffff",colorVar:.2,speed:[4,10],lifetime:[.5,.8],size:[.6,1.5],flags:Co,blend:Zt,spread:.3,upBias:.8},destructionDebris:{count:[20,30],color:"#ffaa44",colorVar:.1,speed:[15,35],lifetime:[.5,.8],size:[.8,2.5],flags:Un|Hs,blend:Zt,spread:1,upBias:.6},tankDamageSmoke:{count:[3,5],color:"#222222",colorVar:.03,speed:[2,5],lifetime:[1.5,2],size:[1.5,3],flags:na,blend:ia,spread:.2,upBias:1},sabotTrail:{count:[3,5],color:"#00ffff",colorVar:.05,speed:[1,3],lifetime:[.12,.2],size:[.4,1],flags:Co,blend:Zt,spread:.1,upBias:0},heTrail:{count:[2,4],color:"#ff6622",colorVar:.15,speed:[2,5],lifetime:[.15,.25],size:[.5,1.2],flags:Co,blend:Zt,spread:.15,upBias:.2},heavyTrail:{count:[3,5],color:"#ff00ff",colorVar:.1,speed:[1,3],lifetime:[.3,.5],size:[1,2.5],flags:na,blend:ia,spread:.2,upBias:.3},heExplosion:{count:[25,40],color:"#ff8833",colorVar:.12,speed:[15,35],lifetime:[.4,.6],size:[1,2.8],flags:Un|Hs,blend:Zt,spread:1,upBias:.5},sabotImpact:{count:[15,25],color:"#00ffff",colorVar:.1,speed:[25,50],lifetime:[.15,.25],size:[.3,.8],flags:Un,blend:Zt,spread:.7,upBias:.3},heavyExplosion:{count:[40,60],color:"#ff44ff",colorVar:.15,speed:[12,30],lifetime:[.6,.9],size:[1.5,4],flags:Un|Hs,blend:Zt,spread:1,upBias:.4},ricochetSparks:{count:[12,20],color:"#ffffaa",colorVar:.1,speed:[20,45],lifetime:[.1,.2],size:[.3,.8],flags:Un,blend:Zt,spread:.6,upBias:.4},stormSparks:{count:[3,6],color:"#00aaff",colorVar:.15,speed:[5,18],lifetime:[.2,.5],size:[.4,1.2],flags:Un,blend:Zt,spread:.6,upBias:.5},stormDamageCrackle:{count:[4,8],color:"#33bbff",colorVar:.1,speed:[8,20],lifetime:[.12,.25],size:[.3,.9],flags:Co,blend:Zt,spread:1,upBias:.5},eliminationBurst:{count:[60,80],color:"#ff4400",colorVar:.2,speed:[20,60],lifetime:[.6,1],size:[1.2,4],flags:Un|Hs,blend:Zt,spread:1,upBias:.6},upgradePurchase:{count:[20,30],color:"#ffffff",colorVar:.1,speed:[10,25],lifetime:[.4,.7],size:[.8,2],flags:Co,blend:Zt,spread:.8,upBias:.7}};function mt(n,e,t={}){const i=By[n];if(!i)return;const s=t.count??qy(i.count[0],i.count[1]),o=t.color||i.color;Wr.set(o);const a=t.speed?t.speed/((i.speed[0]+i.speed[1])*.5):1,r=t.radius?t.radius/18:1,c=Fy(s);for(let l=0;l<s;l++){const u=(c+l)%nt;ea[u]=e.x+(Math.random()-.5)*2,is[u]=(e.y??0)+(Math.random()-.5)*2,ta[u]=e.z+(Math.random()-.5)*2;let d,f,p;if(i.cone&&t.direction){const M=(Math.random()-.5)*i.spread,b=(Math.random()-.5)*i.spread,y=(Math.random()-.5)*i.spread;d=t.direction.x+M,f=t.direction.y+b,p=t.direction.z+y;const w=Math.sqrt(d*d+f*f+p*p)||1;d/=w,f/=w,p/=w}else{const M=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1)*i.spread;d=Math.sin(b)*Math.cos(M),f=Math.abs(Math.cos(b))*i.upBias+Math.sin(b)*Math.sin(M)*(1-i.upBias),p=Math.sin(b)*Math.sin(M);const y=Math.sqrt(d*d+f*f+p*p)||1;d/=y,f/=y,p/=y,f=Math.abs(f)*i.upBias+f*(1-i.upBias)}const g=(i.speed[0]+Math.random()*(i.speed[1]-i.speed[0]))*a*r;vl[u]=d*g,ks[u]=f*g+3*i.upBias,Ml[u]=p*g;const _=(Math.random()-.5)*i.colorVar*2,m=(Math.random()-.5)*i.colorVar*2,h=(Math.random()-.5)*i.colorVar*2;yl[u]=Math.max(0,Math.min(1,Wr.r+_)),bl[u]=Math.max(0,Math.min(1,Wr.g+m)),Sl[u]=Math.max(0,Math.min(1,Wr.b+h));const v=i.size[0]+Math.random()*(i.size[1]-i.size[0]);Ws[u]=v,Ca[u]=v;const x=i.lifetime[0]+Math.random()*(i.lifetime[1]-i.lifetime[0]);ss[u]=x,ep[u]=x,Xs[u]=1,tp[u]=i.flags,np[u]=i.blend}}function ky(n,e){mt("muzzleFlash",n,{direction:e})}function df(n){mt("stormDamageCrackle",n)}function ff(n){mt("eliminationBurst",n,{radius:24}),mt("sparks",n,{radius:24,color:"#ffaa00"}),mt("smoke",n,{})}function Hy(n,e){mt("upgradePurchase",n,{color:e})}function Vy(n,e){e==="he"?mt("heTrail",n):e==="sabot"?mt("sabotTrail",n):e==="heavy"&&mt("heavyTrail",n)}function wl(n,e,t){const i={radius:t||18};e==="sabot"?(mt("sabotImpact",n,i),mt("sparks",n,{radius:t||8})):e==="heavy"?(mt("heavyExplosion",n,i),mt("smoke",n,{radius:t||28})):(mt("heExplosion",n,i),mt("sparks",n,i),mt("smoke",n,{}))}function Gy(n){mt("ricochetSparks",n)}function Wy(n,e){mt("powerupSparkle",n,{color:e,count:8})}function Xy(n){if(!ai)return;let e=0,t=0;for(let i=0;i<nt;i++){if(ss[i]<=0)continue;if(ss[i]-=n,ss[i]<=0){ss[i]=0;continue}const s=tp[i];s&Un&&(ks[i]-=zy*n),ea[i]+=vl[i]*n,is[i]+=ks[i]*n,ta[i]+=Ml[i]*n,is[i]<.1&&(is[i]=.1,s&Hs?(ks[i]*=-.25,vl[i]*=.7,Ml[i]*=.7):ks[i]=Math.max(0,ks[i]));const o=ss[i]/ep[i];if(s&na){const a=1+(1-o)*2;Ws[i]=Ca[i]*a,Xs[i]=o*.6}else Ws[i]=Ca[i]*o,Xs[i]=o;if(np[i]===ia){const a=t*3,r=t*4;js[a]=ea[i],js[a+1]=is[i],js[a+2]=ta[i],$s[r]=yl[i],$s[r+1]=bl[i],$s[r+2]=Sl[i],$s[r+3]=Xs[i],La[t]=Ws[i],t++}else{const a=e*3,r=e*4;qs[a]=ea[i],qs[a+1]=is[i],qs[a+2]=ta[i],Ys[r]=yl[i],Ys[r+1]=bl[i],Ys[r+2]=Sl[i],Ys[r+3]=Xs[i],Pa[e]=Ws[i],e++}}for(let i=e;i<nt;i++)Pa[i]=0,qs[i*3+1]=-200;for(let i=t;i<nt;i++)La[i]=0,js[i*3+1]=-200;ai.attributes.position.needsUpdate=!0,ai.attributes.color.needsUpdate=!0,ai.attributes.size.needsUpdate=!0,Ei.attributes.position.needsUpdate=!0,Ei.attributes.color.needsUpdate=!0,Ei.attributes.size.needsUpdate=!0}function qy(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Yy(n,e){const t=n.userData.maxRadius||18,i=n.userData.weaponType||"he",o=Math.min(e*(i==="sabot"?1.5:i==="heavy"?.7:1),1),a=n.getObjectByName("core");if(a){const l=wi.lerp(2,t*.3,o);a.scale.setScalar(l),a.material.opacity=Math.max(0,1-o*1.5)}const r=n.getObjectByName("ring");if(r){const l=wi.lerp(1,t,o);r.scale.setScalar(l),r.material.opacity=Math.max(0,.9-o)}const c=n.getObjectByName("outerGlow");if(c){const l=wi.lerp(4,t*1.2,o);c.scale.setScalar(l),c.material.opacity=Math.max(0,.3-o*.4)}}function jy(n,e){const t=n.getObjectByName("flash");if(t){const a=wi.lerp(4,.5,e);t.scale.setScalar(a),t.material.opacity=Math.max(0,1-e*2.5)}const i=n.getObjectByName("fireball");if(i){const a=wi.lerp(5,9,e);i.scale.setScalar(a),i.material.opacity=Math.max(0,.9-e*1.4)}const s=n.getObjectByName("glow");if(s){const a=wi.lerp(8,14,e);s.scale.setScalar(a),s.material.opacity=Math.max(0,.35-e*.45)}const o=n.getObjectByName("shockRing");if(o){const a=wi.lerp(2,12,e);o.scale.setScalar(a),o.material.opacity=Math.max(0,.8-e*1.2)}for(let a=0;a<6;a++){const r=n.getObjectByName(`spike${a}`);if(r){const c=wi.lerp(5,10,e);r.scale.z=c,r.material.opacity=Math.max(0,.7-e*1)}}}function $y(n,e,t){const i=n.getObjectByName("shape");i&&(i.rotation.y+=t*1.5,i.rotation.x+=t*.4);const s=n.getObjectByName("ring");s&&(s.rotation.z+=t*2,s.rotation.x=Math.sin(e*2)*.3+Math.PI/2);const o=6+Math.sin(e)*1.5;i&&(i.position.y=o);const a=n.getObjectByName("glow");a&&(a.position.y=o),s&&(s.position.y=o)}const Ky=new be(16777215),sa=new WeakMap;function Zy(n,e){n.traverse(t=>{if(!t.isMesh||!t.material||!t.material.color)return;sa.has(t.material)||sa.set(t.material,t.material.color.clone());const i=sa.get(t.material);t.material.color.copy(i).lerp(Ky,e)})}function Jy(n){n.traverse(e=>{if(!e.isMesh||!e.material)return;const t=sa.get(e.material);t&&e.material.color.copy(t)})}const hf=new be("#ffaa00"),pf=new be("#553300");function Qy(n,e,t){n.traverse(i=>{if(!(!i.isMesh||!i.material)&&i.material.color&&i.material.isMeshBasicMaterial)if(e){const s=.5+.5*Math.sin(t*(2*Math.PI/.8));i.material.color.copy(pf).lerp(hf,.5+.5*s)}else i.material.color.copy(pf).lerp(hf,.3)})}const mf=64,eb="#00aaff";function tb(){const n=new qt;n.name="stormRingMesh";const e=new Kn(1,.04,8,mf),t=new vt({color:new be(eb),transparent:!0,opacity:.85,depthWrite:!1}),i=new L(e,t);i.name="groundRing",i.rotation.x=Math.PI/2,i.position.y=.5,n.add(i);const s=new Kn(1,.12,8,mf),o=new vt({color:new be("#55ddff"),transparent:!0,opacity:.3,depthWrite:!1}),a=new L(s,o);return a.name="groundGlow",a.rotation.x=Math.PI/2,a.position.y=.5,n.add(a),n.userData.pulseTime=0,n}function nb(n,e,t){if(!n||!e)return;n.position.set(e.center.x,0,e.center.z);const i=Math.max(e.radius,1);n.scale.set(i,1,i),n.userData.pulseTime=(n.userData.pulseTime||0)+t;const s=n.userData.pulseTime,o=n.getObjectByName("groundRing");o&&(o.material.opacity=.7+.2*Math.sin(s*2));const a=n.getObjectByName("groundGlow");a&&(a.material.opacity=.2+.15*Math.sin(s*1.5+1))}function ib(){const n=document.createElement("div");return n.id="stormFogOverlay",n.style.cssText=["position:fixed","top:0","left:0","width:100%","height:100%","pointer-events:none","z-index:50","opacity:0","transition:opacity 0.4s ease","background:radial-gradient(ellipse at center,transparent 40%,rgba(180,20,20,0.55) 100%)"].join(";"),document.body.appendChild(n),{element:n,_animTime:0,_visible:!1}}function sb(n,e,t){if(!(!n||!n.element))if(e){n._animTime=(n._animTime||0)+t;const i=.6+.4*Math.abs(Math.sin(n._animTime*2.5));n.element.style.opacity=String(i),n._visible=!0}else n.element.style.opacity="0",n._animTime=0,n._visible=!1}const Da=1920,Ia=1440,Xr=40,gf=48,_f=36,ob=.55,rb=.25,ab=.45,cb=300,qr=.035,lb=30;let Nt,Ti,si,Ks;const ln=new Map;let Ai=null,Ri=null,xf=null,os=null,Ua=null;function ub(){Nt=new HM,Nt.background=new be("#040410"),Ti=new Rn(55,window.innerWidth/window.innerHeight,.1,5e3),Ti.position.set(0,55,110),Ti.lookAt(0,0,0),si=new Yh({antialias:!0}),si.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),si.setSize(window.innerWidth,window.innerHeight),si.toneMapping=xh,si.toneMappingExposure=1.4,document.body.appendChild(si.domElement);const n=new YM(2763342,1.2);Nt.add(n);const e=new sf(13687039,1.4);e.position.set(120,200,80),Nt.add(e);const t=new sf(8947916,.6);t.position.set(-80,100,-60),Nt.add(t);const i=new WM(3359846,1381680,.8);Nt.add(i),Ks=new ty(si);const s=new ny(Nt,Ti);Ks.addPass(s);const o=new ho(new Te(window.innerWidth,window.innerHeight),ob,rb,ab);Ks.addPass(o),xf=Sb(),Nt.add(xf);const a=wb();return Nt.add(a),Ai=wy(),Ai.visible=!1,Nt.add(Ai),Ri=Ey(),Ri.visible=!1,Nt.add(Ri),Oy(Nt),window.addEventListener("resize",Rb),{scene:Nt,camera:Ti,renderer:si,composer:Ks}}function Gi(n,e){ln.has(n)&&rs(n),ln.set(n,e),Nt.add(e)}function rs(n){const e=ln.get(n);e&&(Nt.remove(e),ip(e),ln.delete(n))}function db(){for(const[,n]of ln)Nt.remove(n),ip(n);ln.clear()}function ip(n){n.traverse(e=>{if(e.geometry&&e.geometry.dispose(),e.material)if(Array.isArray(e.material))for(const t of e.material)t.dispose();else e.material.dispose()})}function sp(n){var t;const{entities:e}=n;if(vf(e.player),e.enemies){for(const i of e.enemies)if(vf(i),i.render&&i.render.hitFlash>0){const s=ln.get(i.render.rootId);s&&Zy(s,Math.min(1,i.render.hitFlash*3))}else if(i.render){const s=ln.get(i.render.rootId);s&&Jy(s)}}if(e.projectiles)for(const i of e.projectiles){if(!i.alive)continue;const s=ln.get((t=i.render)==null?void 0:t.rootId);if(s){s.position.set(i.pos.x,i.pos.y,i.pos.z);const o=i.vel.x,a=i.vel.y,r=i.vel.z;Math.sqrt(o*o+a*a+r*r)>.1&&s.lookAt(i.pos.x+o,i.pos.y+a,i.pos.z+r);const l=s.getObjectByName("projRing");if(l&&(l.rotation.z+=n.runtime.dt*8),Vy(i.pos,i.weapon||"he"),i.weapon==="he"&&i.chargeRatio>0){const u=s.getObjectByName("halo");if(u){const d=.2+.15*Math.sin(n.runtime.now*12);u.material.opacity=d+i.chargeRatio*.2,u.scale.setScalar((1+i.chargeRatio*.5)*4.5)}}}}}const fb={firepower:"#ff00ff",armor:"#00ffff",mobility:"#32ff64",systems:"#ffd700"};function vf(n){var o;if(!n||!n.render)return;const e=ln.get(n.render.rootId);if(!e)return;const t=n.transform;e.position.set(t.pos.x,0,t.pos.z),e.rotation.y=t.yaw;const i=e.getObjectByName("turretPivot");i&&n.turret&&(i.rotation.y=n.turret.yaw);const s=e.getObjectByName("barrelPivot");if(s&&n.turret&&(s.rotation.x=-n.turret.pitch),n.upgrades&&n.upgrades.visualDirty){n.render.color,Ry(e,n.upgrades);const a={x:t.pos.x,y:8,z:t.pos.z};let r="#ffffff";const c=n.upgrades.tracks;if(c)for(const u of["firepower","armor","mobility","systems"])c[u]&&c[u].tier>0&&(r=fb[u]);Hy(a,r);const l=((o=c==null?void 0:c.mobility)==null?void 0:o.branch)==="b";Ny(e,l),n.upgrades.visualDirty=!1}}function op(n,e){var i;const{entities:t}=n;if(t.effects)for(const s of t.effects){if(!s.alive)continue;const o=ln.get((i=s.render)==null?void 0:i.rootId);o&&(s.type==="explosion"?Yy(o,s.t):s.type==="muzzleFlash"&&jy(o,s.t))}if(n.entities&&n.entities.mines)for(const s of n.entities.mines){if(!s.alive)continue;const o=ln.get(s.id);o&&Qy(o,s.armed,n.runtime.now)}if(n.world&&n.world.powerups)for(const s of n.world.powerups){if(!s.active)continue;const o=ln.get(s.id);if(!o)continue;const a=o.userData.isLoot?6:3;if(s.render.bobPhase=(s.render.bobPhase||0)+e*a,$y(o,s.render.bobPhase,e),o.userData.isLoot){const r=.6+.4*Math.sin(s.render.bobPhase*4);o.traverse(c=>{c.isMesh&&c.material&&c.material.transparent&&(c.userData._baseOpacity===void 0&&(c.userData._baseOpacity=c.material.opacity),c.material.opacity=c.userData._baseOpacity*r)})}}hb(t,e),Xy(e)}function hb(n,e){const t=[];if(n.player&&t.push(n.player),n.enemies)for(const i of n.enemies)t.push(i);for(const i of t){if(!i.render||!i.upgrades)continue;const s=ln.get(i.render.rootId);if(!s)continue;const o=i.upgrades.modifiers;o&&o.shield&&Iy(s,o.shield,e),o&&o.ghostDrive&&Uy(s,e)}}function pb(n){var y,w;const e=(y=n.entities)==null?void 0:y.player;if(!e||!e.turret){Ai&&(Ai.visible=!1),Ri&&(Ri.visible=!1);return}const t=21,i=12,s=e.transform.yaw+e.turret.yaw,o=e.turret.pitch,a=Math.cos(o),r=Math.sin(s)*a,c=Math.sin(o),l=Math.cos(s)*a,u=((w=e.combat)==null?void 0:w.activeWeapon)||"he",d=mb(u),f=e.transform.pos,p=Ai.geometry.getAttribute("position");let g=f.x+r*t,_=f.y+i+c*t,m=f.z+l*t,h=r*d,v=c*d,x=l*d,M=0,b=null;for(let P=0;P<cb;P++){p.setXYZ(P,g,_,m),M++;const S=g,T=_,N=m;if(v-=lb*qr,g+=h*qr,_+=v*qr,m+=x*qr,_<=0&&T>0){const F=T/(T-_),$=S+(g-S)*F,D=N+(m-N)*F;b={x:$,y:.1,z:D},p.setXYZ(M,$,.1,D),M++;break}}Ai.geometry.setDrawRange(0,M),p.needsUpdate=!0,Ai.visible=!0,b?(Ri.position.set(b.x,.1,b.z),Ri.visible=!0):Ri.visible=!1,e.sensors&&e.sensors.aim&&(e.sensors.aim.impactPos=b,e.sensors.aim.valid=!!b)}function mb(n){switch(n){case"sabot":return 320;case"heavy":return 180;default:return 220}}function uu(n){Ks.render()}function gb(n){const e=sy(),t=n.render.rootId;return Gi(t,e),e}function _b(n){var o,a;const e=((o=n.render)==null?void 0:o.color)||"#ff3366",t=((a=n.ai)==null?void 0:a.tier)||1,i=oy(e,t),s=n.render.rootId;return Gi(s,i),i}function xb(n){var r,c;const e=n.aabb,t=e.max.x-e.min.x,i=e.max.z-e.min.z,s=ry(n.kind,((r=n.render)==null?void 0:r.height)||12,((c=n.render)==null?void 0:c.color)||"#ff00aa",t,i),o=(e.min.x+e.max.x)/2,a=(e.min.z+e.max.z)/2;return s.position.set(o,0,a),Gi(n.id,s),s}function rp(n){const e=_y(n.type);return e.position.set(n.pos.x,0,n.pos.z),n.isLoot&&(e.scale.setScalar(.5),e.userData.isLoot=!0),Gi(n.id,e),e}function vb(n){const e=My(n.weapon);return e.position.set(n.pos.x,n.pos.y,n.pos.z),Gi(n.render.rootId,e),e}function Mb(n){var s,o;const e=((s=n.render)==null?void 0:s.splashRadius)||18,t=((o=n.render)==null?void 0:o.weaponType)||"he",i=by(n.pos,e);return i.userData.weaponType=t,Gi(n.render.rootId,i),wl(n.pos,t,e),i}function yb(n){const e=Sy(n.pos);return Gi(n.render.rootId,e),ky(n.pos),e}function bb(n){const e=xy();e.position.set(n.pos.x,0,n.pos.z);const t=n.id;return Gi(t,e),e}function lr(){return Ti}function Sb(){const n=new vo(Da,Ia),e=new $h({color:789544,metalness:.3,roughness:.75,emissive:394776,emissiveIntensity:.5}),t=new L(n,e);return t.rotation.x=-Math.PI/2,t.position.set(Da/2,0,Ia/2),t.name="ground",t}function wb(){const n=new qt;n.name="neonGrid";const e=new vt({color:2774408,transparent:!0,opacity:.55}),t=.3,i=.15,s=.08,o=[];for(let f=0;f<=gf;f++){const p=f*Xr,g=new fi(t,i,Ia);g.translate(p,s,Ia/2),o.push(g)}for(let f=0;f<=_f;f++){const p=f*Xr,g=new fi(Da,i,t);g.translate(Da/2,s,p),o.push(g)}const a=Mf(o),r=new L(a,e);r.name="gridLines",n.add(r);const c=new vt({color:4491451,transparent:!0,opacity:.7}),l=[];for(let f=0;f<=gf;f++)for(let p=0;p<=_f;p++){const g=new fi(1,.2,1);g.translate(f*Xr,.12,p*Xr),l.push(g)}const u=Mf(l),d=new L(u,c);return d.name="gridDots",n.add(d),n}function Mf(n){let e=0,t=0;for(const l of n)e+=l.attributes.position.count,t+=l.index?l.index.count:l.attributes.position.count;const i=new Float32Array(e*3),s=new Float32Array(e*3),o=new Uint32Array(t);let a=0,r=0;for(const l of n){const u=l.attributes.position,d=l.attributes.normal;for(let f=0;f<u.count;f++)i[(a+f)*3]=u.getX(f),i[(a+f)*3+1]=u.getY(f),i[(a+f)*3+2]=u.getZ(f),d&&(s[(a+f)*3]=d.getX(f),s[(a+f)*3+1]=d.getY(f),s[(a+f)*3+2]=d.getZ(f));if(l.index){for(let f=0;f<l.index.count;f++)o[r+f]=l.index.getX(f)+a;r+=l.index.count}else{for(let f=0;f<u.count;f++)o[r+f]=a+f;r+=u.count}a+=u.count,l.dispose()}const c=new Tt;return c.setAttribute("position",new wt(i,3)),c.setAttribute("normal",new wt(s,3)),c.setIndex(new wt(o,1)),c}function Eb(){return os&&Nt.remove(os),os=tb(),Nt.add(os),os}function ap(n,e){!os||!n||nb(os,n,e)}function Tb(){return Ua=ib(),Ua}function Ab(n,e){Ua&&sb(Ua,n,e)}function Rb(){const n=window.innerWidth,e=window.innerHeight;Ti.aspect=n/e,Ti.updateProjectionMatrix(),si.setSize(n,e),Ks.setSize(n,e)}const Ki={MAX_SPEED_FWD:90,MAX_SPEED_REV:50,ACCEL_FWD:180,ACCEL_REV:130,LINEAR_DAMPING:4,LATERAL_DAMPING:10,MAX_TURN_RATE:3.8,TURN_ACCEL:16,ANGULAR_DAMPING:7};function Na(n,e,t,i,s){const{transform:o,physics:a}=n;t!==0&&(a.yawVel+=t*i.TURN_ACCEL*s),a.yawVel-=a.yawVel*i.ANGULAR_DAMPING*s,a.yawVel>i.MAX_TURN_RATE&&(a.yawVel=i.MAX_TURN_RATE),a.yawVel<-i.MAX_TURN_RATE&&(a.yawVel=-i.MAX_TURN_RATE),o.yaw+=a.yawVel*s,o.yaw=Math.atan2(Math.sin(o.yaw),Math.cos(o.yaw));const r=Math.sin(o.yaw),c=Math.cos(o.yaw),l=c,u=-r;e>0?(a.vel.x+=r*i.ACCEL_FWD*e*s,a.vel.z+=c*i.ACCEL_FWD*e*s):e<0&&(a.vel.x+=r*i.ACCEL_REV*e*s,a.vel.z+=c*i.ACCEL_REV*e*s);const d=a.vel.x*r+a.vel.z*c,f=a.vel.x*l+a.vel.z*u,p=d-d*i.LINEAR_DAMPING*s,g=f-f*i.LATERAL_DAMPING*s;a.vel.x=r*p+l*g,a.vel.z=c*p+u*g;const _=e>=0?i.MAX_SPEED_FWD:i.MAX_SPEED_REV,m=a.vel.x*a.vel.x+a.vel.z*a.vel.z;if(m>_*_){const h=_/Math.sqrt(m);a.vel.x*=h,a.vel.z*=h}o.pos.x+=a.vel.x*s,o.pos.z+=a.vel.z*s,o.pos.y=0}function El(n,e=1920,t=1440){const i=n.transform.pos;i.x<0&&(i.x=0,n.physics.vel.x=0),i.x>e&&(i.x=e,n.physics.vel.x=0),i.z<0&&(i.z=0,n.physics.vel.z=0),i.z>t&&(i.z=t,n.physics.vel.z=0)}const Hn={he:{id:"he",name:"Standard HE",muzzleV:220,damageDirect:34,splashRadius:18,cooldown:.55,projRadius:.6,maxAge:8,infinite:!0,ricochet:!1,maxBounces:0,charge:{enabled:!0,minTime:0,maxTime:2,overchargeTime:2.5,damageMult:[1,1.8],splashMult:[1,1.5],velocityMult:[1,1.15]}},sabot:{id:"sabot",name:"Sabot",muzzleV:320,damageDirect:52,splashRadius:8,cooldown:.75,projRadius:.4,maxAge:6,infinite:!1,ricochet:!0,maxBounces:1,charge:{enabled:!1}},heavy:{id:"heavy",name:"Heavy Splash",muzzleV:180,damageDirect:26,splashRadius:28,cooldown:.95,projRadius:.8,maxAge:10,infinite:!1,ricochet:!1,maxBounces:0,charge:{enabled:!1}}},Cn={armDelay:1.5,triggerRadius:12,damageDirect:45,splashRadius:20,maxActive:5,cooldown:.8,ownerImmunity:3};let mn=null,Vo={},Tl=null,Al=!1,Rl=null;const cp=[{id:"he",label:"HE",hotkey:"1",color:"#00ffff",iconType:"circle",infinite:!0},{id:"sabot",label:"SAB",hotkey:"2",color:"#00ffff",iconType:"diamond",infinite:!1},{id:"heavy",label:"HVY",hotkey:"3",color:"#ff00ff",iconType:"hexagon",infinite:!1}],Cb={id:"mine",label:"MINE",hotkey:"Q",color:"#ffaa00",iconType:"triangle",infinite:!1};function Pb(){mn&&mn.parentNode&&mn.parentNode.removeChild(mn),Ub(),mn=document.createElement("div"),mn.className="ammo-bar",mn.addEventListener("mouseenter",()=>{Al=!0}),mn.addEventListener("mouseleave",()=>{Al=!1}),Vo={};for(const i of cp){const s=yf(i);mn.appendChild(s.el),Vo[i.id]=s}const n=document.createElement("div");n.className="ammo-separator",mn.appendChild(n);const e=yf(Cb);mn.appendChild(e.el),Vo.mine=e;const t=document.getElementById("ui");t&&t.appendChild(mn),Rl=null}function Lb(n,e){var a;if(!mn||!n)return;const t=n.activeWeapon||"he",i=n.ammo||{},s=n.cooldown||{};for(const r of cp){const c=Vo[r.id];if(!c)continue;const l=t===r.id,u=r.infinite?1/0:i[r.id]||0,d=!r.infinite&&u<=0,f=s[r.id]||0,p=(a=n.weapons)==null?void 0:a[r.id],g=(p==null?void 0:p.cooldown)||1,_=f>0?Math.min(1,f/g):0;c.el.classList.toggle("ammo-card-active",l),c.el.classList.toggle("ammo-card-empty",d),c.countEl.textContent=r.infinite?"∞":String(u),c.cooldownEl.style.height=_*100+"%",c.cooldownEl.style.display=_>0?"block":"none",l&&Rl!==t&&(c.el.classList.remove("ammo-card-flash"),c.el.offsetWidth,c.el.classList.add("ammo-card-flash"))}const o=Vo.mine;if(o){const r=i.mine||0,c=s.mine||0,u=c>0?Math.min(1,c/.8):0;o.el.classList.toggle("ammo-card-empty",r<=0),o.countEl.textContent=String(r),o.cooldownEl.style.height=u*100+"%",o.cooldownEl.style.display=u>0?"block":"none"}Rl=t}function Db(n){Tl=n}function lp(){return Al}function yf(n){const e=document.createElement("div");e.className="ammo-card",e.style.setProperty("--card-color",n.color);const t=document.createElement("span");t.className="ammo-hotkey",t.textContent=n.hotkey,e.appendChild(t);const i=document.createElement("div");i.className="ammo-icon",i.innerHTML=Ib(n.iconType,n.color),e.appendChild(i);const s=document.createElement("div");s.className="ammo-label",s.textContent=n.label,e.appendChild(s);const o=document.createElement("div");o.className="ammo-count",o.textContent=n.infinite?"∞":"0",e.appendChild(o);const a=document.createElement("div");return a.className="ammo-cooldown",a.style.display="none",e.appendChild(a),e.addEventListener("click",r=>{r.stopPropagation(),!e.classList.contains("ammo-card-empty")&&Tl&&Tl(n.id)}),{el:e,countEl:o,cooldownEl:a}}function Ib(n,e){switch(n){case"circle":return`<svg width="22" height="22" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="none" stroke="${e}" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="${e}" opacity="0.6"/>
      </svg>`;case"diamond":return`<svg width="22" height="22" viewBox="0 0 24 24">
        <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="${e}" stroke-width="2"/>
        <polygon points="12,7 17,12 12,17 7,12" fill="${e}" opacity="0.6"/>
      </svg>`;case"hexagon":return`<svg width="22" height="22" viewBox="0 0 24 24">
        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="${e}" stroke-width="2"/>
        <polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" fill="${e}" opacity="0.6"/>
      </svg>`;case"triangle":return`<svg width="22" height="22" viewBox="0 0 24 24">
        <polygon points="12,3 22,21 2,21" fill="none" stroke="${e}" stroke-width="2"/>
        <polygon points="12,9 17,19 7,19" fill="${e}" opacity="0.6"/>
      </svg>`;default:return""}}let bf=!1;function Ub(){if(bf)return;bf=!0;const n=document.createElement("style");n.textContent=`
.ammo-bar {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-60%);
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
  z-index: 20;
  font-family: 'Consolas', 'Courier New', monospace;
  padding: 6px 10px;
  background: rgba(8, 8, 26, 0.7);
  border: 1px solid rgba(0, 180, 200, 0.15);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.ammo-separator {
  width: 12px;
}

.ammo-card {
  position: relative;
  width: 70px;
  height: 60px;
  background: rgba(10, 10, 30, 0.8);
  border: 1px solid rgba(100, 120, 180, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  user-select: none;
}

.ammo-card:hover:not(.ammo-card-empty) {
  border-color: var(--card-color);
  box-shadow: 0 0 8px color-mix(in srgb, var(--card-color) 30%, transparent);
}

.ammo-card-active {
  border-color: var(--card-color) !important;
  box-shadow: 0 0 12px color-mix(in srgb, var(--card-color) 50%, transparent),
              inset 0 0 8px color-mix(in srgb, var(--card-color) 15%, transparent) !important;
  transform: scale(1.05);
}

.ammo-card-empty {
  opacity: 0.3;
  cursor: default;
}

.ammo-card-flash {
  animation: ammo-flash 0.3s ease-out;
}

@keyframes ammo-flash {
  0%   { box-shadow: 0 0 20px var(--card-color); }
  100% { box-shadow: 0 0 12px color-mix(in srgb, var(--card-color) 50%, transparent); }
}

.ammo-hotkey {
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 9px;
  color: #606080;
  letter-spacing: 0;
}

.ammo-icon {
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ammo-label {
  font-size: 9px;
  color: #c8c8dc;
  letter-spacing: 1px;
  line-height: 1;
}

.ammo-count {
  font-size: 13px;
  font-weight: bold;
  color: #e8e8f0;
  line-height: 1;
}

.ammo-cooldown {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(4, 4, 20, 0.65);
  pointer-events: none;
  transition: height 0.05s linear;
}
`,document.head.appendChild(n)}const du={kill:100,powerup:15,obstacleDestroy:10},Bi={firepower:{id:"firepower",name:"Firepower",color:"#ff00ff",nodes:{tier1:{name:"Hardened Rounds",type:"tier1",cost:100,description:"+12% projectile damage",effects:{damageMultiplier:1.12}},tier2:{name:"Advanced Munitions",type:"tier2",cost:200,description:"+12% damage, +15% splash radius",effects:{damageMultiplier:1.12,splashMultiplier:1.15},requires:"tier1"},branchA:{name:"Rapid Salvo",type:"branchA",cost:350,description:"+35% fire rate, -10% damage",effects:{fireRateMultiplier:1.35,damageMultiplier:.9},requires:"tier2"},branchB:{name:"Devastator",type:"branchB",cost:350,description:"+40% damage, +30% splash radius, -20% fire rate",effects:{damageMultiplier:1.4,splashMultiplier:1.3,fireRateMultiplier:.8},requires:"tier2"}}},armor:{id:"armor",name:"Armor",color:"#00ffff",nodes:{tier1:{name:"Reactive Plating",type:"tier1",cost:100,description:"+15 max HP, +8% damage reduction",effects:{maxHpBonus:15,damageReduction:.08}},tier2:{name:"Composite Armor",type:"tier2",cost:200,description:"+15 max HP, +8% damage reduction",effects:{maxHpBonus:15,damageReduction:.08},requires:"tier1"},branchA:{name:"Fortress",type:"branchA",cost:350,description:"+30 max HP, +12% damage reduction, -10% move speed",effects:{maxHpBonus:30,damageReduction:.12,speedMultiplier:.9},requires:"tier2"},branchB:{name:"Regenerator",type:"branchB",cost:350,description:"+2 HP/sec regen, energy shield (30 HP)",effects:{hpRegen:2,shield:!0},requires:"tier2"}}},mobility:{id:"mobility",name:"Mobility",color:"#32ff64",nodes:{tier1:{name:"Tuned Drivetrain",type:"tier1",cost:100,description:"+12% move speed, +12% turn rate",effects:{speedMultiplier:1.12,turnRateMultiplier:1.12}},tier2:{name:"Boost Thrusters",type:"tier2",cost:200,description:"+12% move speed, +12% turn rate",effects:{speedMultiplier:1.12,turnRateMultiplier:1.12},requires:"tier1"},branchA:{name:"Afterburner",type:"branchA",cost:350,description:"Boost grants +60% speed",effects:{boostSpeedMultiplier:1.6},requires:"tier2"},branchB:{name:"Ghost Drive",type:"branchB",cost:350,description:"+15% speed, hull 50% transparent, AI detection -20%",effects:{speedMultiplier:1.15,ghostDrive:!0,aiDetectionReduction:.2},requires:"tier2"}}},systems:{id:"systems",name:"Systems",color:"#ffd700",nodes:{tier1:{name:"Enhanced Sensors",type:"tier1",cost:100,description:"+20% turret rotation speed",effects:{turretSpeedMultiplier:1.2}},tier2:{name:"Advanced Targeting",type:"tier2",cost:200,description:"+20% turret rotation, +10% projectile velocity",effects:{turretSpeedMultiplier:1.2,projectileVelMultiplier:1.1},requires:"tier1"},branchA:{name:"Precision Strike",type:"branchA",cost:350,description:"+15% projectile velocity, lock-on glow",effects:{projectileVelMultiplier:1.15},requires:"tier2"},branchB:{name:"Combat Engineer",type:"branchB",cost:350,description:"+3 mine capacity, +30% mine damage, +40% trigger radius, -30% cooldown",effects:{mineCapacityBonus:3,mineDamageMultiplier:1.3,mineTriggerRadiusMultiplier:1.4,mineCooldownMultiplier:.7},requires:"tier2"}}}};function up(){return{damageMultiplier:1,fireRateMultiplier:1,splashMultiplier:1,maxHpBonus:0,damageReduction:0,hpRegen:0,speedMultiplier:1,turnRateMultiplier:1,turretSpeedMultiplier:1,projectileVelMultiplier:1,mineCapacityBonus:0,mineDamageMultiplier:1,mineTriggerRadiusMultiplier:1,mineCooldownMultiplier:1,shield:null,ghostDrive:!1,aiDetectionReduction:0}}function dp(){return{scrap:0,tracks:{firepower:{tier:0,branch:null},armor:{tier:0,branch:null},mobility:{tier:0,branch:null},systems:{tier:0,branch:null}},modifiers:up(),visualDirty:!1}}function fp(n,e){const t=Bi[n];if(!t)return 1/0;const i=t.nodes[e];return i?i.cost:1/0}function hp(n,e,t){const i=Bi[e];if(!i)return!1;const s=i.nodes[t];if(!s)return!1;const o=n.tracks[e];if(!o||n.scrap<s.cost)return!1;switch(t){case"tier1":return o.tier===0;case"tier2":return o.tier===1;case"branchA":return o.tier===2&&o.branch===null;case"branchB":return o.tier===2&&o.branch===null;default:return!1}}function fu(n,e,t){if(!hp(n,e,t))return{success:!1,newModifiers:null};const i=fp(e,t);n.scrap-=i;const s=n.tracks[e];switch(t){case"tier1":s.tier=1;break;case"tier2":s.tier=2;break;case"branchA":s.branch="a";break;case"branchB":s.branch="b";break}const o=zb(n);return n.modifiers=o,n.visualDirty=!0,{success:!0,newModifiers:o}}function Nb(n){const e=[];for(const t of Object.keys(Bi)){const i=Bi[t];for(const s of Object.keys(i.nodes))if(hp(n,t,s)){const o=i.nodes[s];e.push({trackId:t,nodeType:s,cost:o.cost,name:o.name,description:o.description})}}return e}function zb(n){const e=up();for(const t of Object.keys(Bi)){const i=Bi[t],s=n.tracks[t];if(!s)continue;const o=[];s.tier>=1&&o.push(i.nodes.tier1),s.tier>=2&&o.push(i.nodes.tier2),s.branch==="a"&&o.push(i.nodes.branchA),s.branch==="b"&&o.push(i.nodes.branchB);for(const a of o){const r=a.effects;r&&(r.damageMultiplier!==void 0&&(e.damageMultiplier*=r.damageMultiplier),r.fireRateMultiplier!==void 0&&(e.fireRateMultiplier*=r.fireRateMultiplier),r.splashMultiplier!==void 0&&(e.splashMultiplier*=r.splashMultiplier),r.speedMultiplier!==void 0&&(e.speedMultiplier*=r.speedMultiplier),r.turnRateMultiplier!==void 0&&(e.turnRateMultiplier*=r.turnRateMultiplier),r.turretSpeedMultiplier!==void 0&&(e.turretSpeedMultiplier*=r.turretSpeedMultiplier),r.projectileVelMultiplier!==void 0&&(e.projectileVelMultiplier*=r.projectileVelMultiplier),r.mineDamageMultiplier!==void 0&&(e.mineDamageMultiplier*=r.mineDamageMultiplier),r.mineTriggerRadiusMultiplier!==void 0&&(e.mineTriggerRadiusMultiplier*=r.mineTriggerRadiusMultiplier),r.mineCooldownMultiplier!==void 0&&(e.mineCooldownMultiplier*=r.mineCooldownMultiplier),r.maxHpBonus!==void 0&&(e.maxHpBonus+=r.maxHpBonus),r.damageReduction!==void 0&&(e.damageReduction+=r.damageReduction),r.hpRegen!==void 0&&(e.hpRegen+=r.hpRegen),r.mineCapacityBonus!==void 0&&(e.mineCapacityBonus+=r.mineCapacityBonus),r.aiDetectionReduction!==void 0&&(e.aiDetectionReduction+=r.aiDetectionReduction),r.ghostDrive&&(e.ghostDrive=!0),r.shield&&(e.shield=Ob()))}}return e}function Ob(){return{hp:30,hpMax:30,rechargeTimer:0,cooldown:15,rechargeRate:5,active:!0}}function pp(n,e){if(!n||!n.active||n.hp<=0)return e;if(n.hp>=e)return n.hp-=e,n.hp<=0&&(n.hp=0,n.active=!1,n.rechargeTimer=n.cooldown),0;const t=e-n.hp;return n.hp=0,n.active=!1,n.rechargeTimer=n.cooldown,t}function Fb(n,e){if(n&&!n.active){if(n.rechargeTimer>0){n.rechargeTimer-=e,n.rechargeTimer<0&&(n.rechargeTimer=0);return}n.hp+=n.rechargeRate*e,n.hp>=n.hpMax&&(n.hp=n.hpMax,n.active=!0)}}function mp(n,e){!n.upgrades||!n.upgrades.modifiers||!n.upgrades.modifiers.shield||Fb(n.upgrades.modifiers.shield,e)}let St=null,Zs=null,Cl={},Ci=!0,_s=null,Ot=null,en=null,Pl="",Ll=!1,bi=null,Dl=null;const gp=["firepower","armor","mobility","systems"],Bb={firepower:"⚡",armor:"⛨",mobility:"⮚",systems:"☉"};function kb(){St&&St.parentNode&&St.parentNode.removeChild(St),en&&en.parentNode&&en.parentNode.removeChild(en);const n=document.getElementById("ui");n&&n.querySelectorAll(".upgrade-panel, .up-sidebar").forEach(l=>l.remove()),jb(),St=document.createElement("div"),St.className="up-sidebar up-sidebar-open",Ci=!0,Ot=null,Cl={};const e=document.createElement("div");e.className="up-header";const t=document.createElement("span");t.className="up-title",t.textContent="UPGRADES",e.appendChild(t);const i=document.createElement("span");i.className="up-tab-hint",i.textContent="TAB",e.appendChild(i),St.appendChild(e);const s=document.createElement("div");s.className="up-scrap-row";const o=document.createElement("span");o.className="up-scrap-icon",o.textContent="⬣",s.appendChild(o),Zs=document.createElement("span"),Zs.className="up-scrap-value",Zs.textContent="0",s.appendChild(Zs);const a=document.createElement("span");a.className="up-scrap-label",a.textContent="SCRAP",s.appendChild(a),St.appendChild(s);const r=document.createElement("div");r.className="up-cards";for(const l of gp){const u=Bi[l];if(!u)continue;const d=Wb(l,u);r.appendChild(d.el),Cl[l]=d}St.appendChild(r),en=document.createElement("button"),en.className="up-toggle-btn",en.textContent="⬣",en.title="Upgrades (Tab)",en.style.display="none",en.addEventListener("click",l=>{l.stopPropagation(),_p()}),St.addEventListener("mouseenter",()=>{Ll=!0}),St.addEventListener("mouseleave",()=>{Ll=!1}),bi=document.createElement("button"),bi.className="up-back-btn",bi.textContent="← BACK",bi.style.display="none",bi.addEventListener("click",l=>{l.stopPropagation(),Dl&&Dl()}),St.appendChild(bi);const c=document.getElementById("ui");c&&(c.appendChild(St),c.appendChild(en))}function Hb(n,e){if(!St)return;const t=e||0;if(Zs&&(Zs.textContent=String(t)),!n)return;const i=n.tracks,s=`${t}|${i.firepower.tier},${i.firepower.branch}|${i.armor.tier},${i.armor.branch}|${i.mobility.tier},${i.mobility.branch}|${i.systems.tier},${i.systems.branch}|${Ot?Ot.trackId+Ot.nodeType:""}`;if(s!==Pl){Pl=s;for(const o of gp){const a=Cl[o];if(!a)continue;const r=Bi[o],c=n.tracks[o];if(!c)continue;Xb(a,c,r);const l=qb(c),u=l===null;if(a.buttonArea.innerHTML="",u){const d=document.createElement("div");d.className="up-complete",d.textContent="✓ MAXED",a.buttonArea.appendChild(d)}else if(l==="branchChoice"){const d=document.createElement("div");d.className="up-branch-row";const f=r.nodes.branchA,p=r.nodes.branchB,g=Gc(f.name,f.cost,f.description,t>=f.cost,"#ffd700",()=>wf(o,"branchA")),_=Gc(p.name,p.cost,p.description,t>=p.cost,"#ffd700",()=>wf(o,"branchB"));if(d.appendChild(g),d.appendChild(_),a.buttonArea.appendChild(d),Ot&&Ot.trackId===o){const m=Yb();a.buttonArea.appendChild(m)}}else{const d=r.nodes[l],f=t>=d.cost,p=Gc(d.name,d.cost,d.description,f,r.color,()=>{_s&&_s(o,l)});p.style.width="100%",a.buttonArea.appendChild(p)}}}}function Vb(n){_s=n}function _p(){Ci=!Ci,St&&(St.classList.toggle("up-sidebar-open",Ci),St.classList.toggle("up-sidebar-closed",!Ci)),en&&(en.style.display=Ci?"none":"flex"),Ot=null}function Sf(){St&&(Ci=!1,St.classList.remove("up-sidebar-open"),St.classList.add("up-sidebar-closed"),en&&(en.style.display="flex"),Ot=null)}function xp(){return Ll&&Ci}function Gb(){Dl=null,bi&&(bi.style.display="none")}function Wb(n,e){const t=document.createElement("div");t.className="up-card";const i=document.createElement("div");i.className="up-color-bar",i.style.backgroundColor=e.color,t.appendChild(i);const s=document.createElement("div");s.className="up-card-content";const o=document.createElement("div");o.className="up-card-header";const a=document.createElement("span");a.className="up-card-icon",a.style.color=e.color,a.style.textShadow=`0 0 6px ${e.color}`,a.textContent=Bb[n]||"◆",o.appendChild(a);const r=document.createElement("span");r.className="up-card-name",r.style.color=e.color,r.textContent=e.name.toUpperCase(),o.appendChild(r);const c=document.createElement("span");c.className="up-card-counter",c.textContent="0/3",o.appendChild(c),s.appendChild(o);const l=document.createElement("div");l.className="up-pills",s.appendChild(l);const u=document.createElement("div");return u.className="up-btn-area",s.appendChild(u),t.appendChild(s),{el:t,pillsRow:l,buttonArea:u,counter:c}}function Xb(n,e,t){n.pillsRow.innerHTML="";let i=0;if(e.tier>=1){const s=Yr(t.nodes.tier1.name,t.color,"tier");n.pillsRow.appendChild(s),i++}if(e.tier>=2){const s=Yr(t.nodes.tier2.name,t.color,"tier");n.pillsRow.appendChild(s),i++}if(e.branch==="a"){const s=Yr(t.nodes.branchA.name,"#ffd700","branch");n.pillsRow.appendChild(s),i++}else if(e.branch==="b"){const s=Yr(t.nodes.branchB.name,"#ffd700","branch");n.pillsRow.appendChild(s),i++}n.counter.textContent=`${i}/3`}function Yr(n,e,t){const i=document.createElement("span");return i.className="up-pill",i.textContent=n,t==="branch"?(i.style.backgroundColor="rgba(255, 215, 0, 0.15)",i.style.borderColor="rgba(255, 215, 0, 0.4)",i.style.color="#ffd700"):(i.style.backgroundColor=`color-mix(in srgb, ${e} 15%, transparent)`,i.style.borderColor=`color-mix(in srgb, ${e} 40%, transparent)`,i.style.color=e),i}function qb(n){return n.tier===0?"tier1":n.tier===1?"tier2":n.tier===2&&n.branch===null?"branchChoice":null}function Gc(n,e,t,i,s,o){const a=document.createElement("button");a.className="up-buy"+(i?" up-buy-afford":" up-buy-locked"),a.style.setProperty("--buy-color",s);const r=document.createElement("div");r.className="up-buy-name",r.textContent=n,a.appendChild(r);const c=document.createElement("div");c.className="up-buy-desc",c.textContent=t,a.appendChild(c);const l=document.createElement("div");return l.className="up-buy-cost",i?(l.textContent=`⬣ ${e}`,l.style.color="#ffd700"):(l.textContent=`⬣ ${e} (need ${e} scrap)`,l.style.color="#606080"),a.appendChild(l),a.addEventListener("click",u=>{u.stopPropagation(),i?(o(),Pl=""):(a.classList.add("up-buy-denied"),setTimeout(()=>a.classList.remove("up-buy-denied"),400))}),a}function Yb(n){const e=document.createElement("div");e.className="up-confirm";const t=document.createElement("div");t.className="up-confirm-text",t.textContent="Permanent choice. Confirm?",e.appendChild(t);const i=document.createElement("div");i.className="up-confirm-row";const s=document.createElement("button");s.className="up-confirm-yes",s.textContent="CONFIRM",s.addEventListener("click",a=>{a.stopPropagation(),_s&&Ot&&_s(Ot.trackId,Ot.nodeType),Ot=null}),i.appendChild(s);const o=document.createElement("button");return o.className="up-confirm-no",o.textContent="CANCEL",o.addEventListener("click",a=>{a.stopPropagation(),Ot=null}),i.appendChild(o),e.appendChild(i),e}function wf(n,e){Ot&&Ot.trackId===n&&Ot.nodeType===e?(_s&&_s(n,e),Ot=null):Ot={trackId:n,nodeType:e}}let Ef=!1;function jb(){if(Ef)return;Ef=!0;const n=document.createElement("style");n.textContent=`
/* ── Upgrade Sidebar ── */
.up-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: rgba(8, 8, 26, 0.94);
  border-left: 1px solid rgba(0, 180, 200, 0.2);
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 30;
  font-family: 'Consolas', 'Courier New', monospace;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,255,255,0.15) transparent;
  transition: transform 0.25s ease, opacity 0.25s ease;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
}

.up-sidebar-open {
  transform: translateX(0);
  opacity: 1;
}

.up-sidebar-closed {
  transform: translateX(100%);
  opacity: 0;
  pointer-events: none;
}

/* Toggle button (shows when collapsed) */
.up-toggle-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(8, 8, 26, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  color: #ffd700;
  font-size: 22px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 31;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.up-toggle-btn:hover {
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
}

/* Back button (interstitial upgrade mode, inside sidebar) */
.up-back-btn {
  margin: auto 16px 16px 16px;
  padding: 12px 0;
  width: calc(100% - 32px);
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #00ffff;
  background: rgba(0, 40, 60, 0.85);
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 4px;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.up-back-btn:hover {
  background: rgba(0, 80, 120, 0.85);
  border-color: rgba(0, 255, 255, 0.7);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.3);
}

/* ── Header ── */
.up-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px 10px 16px;
  border-bottom: 1px solid rgba(0, 180, 200, 0.12);
}

.up-title {
  font-size: 16px;
  font-weight: bold;
  color: #e8e8f0;
  letter-spacing: 4px;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.25);
}

.up-tab-hint {
  font-size: 9px;
  color: #404060;
  letter-spacing: 1px;
  padding: 2px 6px;
  border: 1px solid rgba(100, 120, 180, 0.15);
  border-radius: 2px;
}

/* ── Scrap row ── */
.up-scrap-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 180, 200, 0.08);
  background: rgba(4, 4, 16, 0.4);
}

.up-scrap-icon {
  color: #ffd700;
  font-size: 18px;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
}

.up-scrap-value {
  font-size: 22px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
  letter-spacing: 2px;
}

.up-scrap-label {
  font-size: 10px;
  color: #606080;
  letter-spacing: 2px;
}

/* ── Cards container ── */
.up-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px;
  overflow-y: auto;
}

/* ── Track card ── */
.up-card {
  display: flex;
  background: #0c0c22;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(100, 120, 180, 0.1);
  transition: border-color 0.2s;
}
.up-card:hover {
  border-color: rgba(100, 120, 180, 0.2);
}

.up-color-bar {
  width: 4px;
  flex-shrink: 0;
}

.up-card-content {
  flex: 1;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Card header */
.up-card-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.up-card-icon {
  font-size: 14px;
}

.up-card-name {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
  flex: 1;
  text-shadow: 0 0 4px currentColor;
}

.up-card-counter {
  font-size: 10px;
  color: #606080;
  letter-spacing: 1px;
}

/* Progress pills */
.up-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-height: 14px;
}

.up-pill {
  font-size: 8px;
  font-weight: bold;
  letter-spacing: 0.5px;
  padding: 1px 6px;
  border-radius: 8px;
  border: 1px solid;
  white-space: nowrap;
}

/* Button area */
.up-btn-area {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Buy button */
.up-buy {
  background: #10102a;
  border: 1px solid rgba(100, 120, 180, 0.15);
  border-radius: 3px;
  padding: 6px 8px;
  cursor: pointer;
  text-align: left;
  font-family: 'Consolas', 'Courier New', monospace;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.15s;
  flex: 1;
  min-width: 0;
}

.up-buy-afford:hover {
  border-color: var(--buy-color, #00ffff);
  box-shadow: 0 0 8px color-mix(in srgb, var(--buy-color, #00ffff) 25%, transparent);
  background: rgba(16, 16, 42, 0.9);
}

.up-buy-locked {
  opacity: 0.35;
  cursor: default;
}

.up-buy-name {
  font-size: 10px;
  font-weight: bold;
  color: #e8e8f0;
  letter-spacing: 0.5px;
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.up-buy-desc {
  font-size: 8px;
  color: #7777aa;
  line-height: 1.3;
  margin-bottom: 3px;
}

.up-buy-cost {
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Branch row */
.up-branch-row {
  display: flex;
  gap: 5px;
}

/* Complete badge */
.up-complete {
  font-size: 10px;
  font-weight: bold;
  color: #00ff88;
  letter-spacing: 2px;
  text-align: center;
  padding: 4px 0;
  text-shadow: 0 0 6px rgba(0, 255, 136, 0.4);
}

/* Confirmation dialog */
.up-confirm {
  position: absolute;
  inset: 0;
  background: rgba(4, 4, 20, 0.96);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 3px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  z-index: 2;
}

.up-confirm-text {
  font-size: 10px;
  color: #ffd700;
  text-align: center;
  letter-spacing: 1px;
}

.up-confirm-row {
  display: flex;
  gap: 10px;
}

.up-confirm-yes,
.up-confirm-no {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 14px;
  border-radius: 3px;
  cursor: pointer;
  letter-spacing: 1px;
  border: 1px solid;
  transition: background 0.15s;
}

.up-confirm-yes {
  background: rgba(0, 80, 40, 0.5);
  border-color: rgba(0, 255, 100, 0.4);
  color: #00ff66;
}
.up-confirm-yes:hover {
  background: rgba(0, 120, 60, 0.6);
}

.up-confirm-no {
  background: rgba(80, 20, 20, 0.5);
  border-color: rgba(255, 100, 100, 0.3);
  color: #ff6666;
}
.up-confirm-no:hover {
  background: rgba(120, 30, 30, 0.6);
}

/* Denied flash (can't afford) */
.up-buy-denied {
  animation: up-denied-flash 0.4s ease-out;
}
@keyframes up-denied-flash {
  0%   { border-color: #ff3333; box-shadow: 0 0 10px rgba(255,50,50,0.4); }
  100% { border-color: rgba(100,120,180,0.15); box-shadow: none; }
}
`,document.head.appendChild(n)}const Wc=-.4363,jr=.7854,Tf=4,$b=30,Af=new $M,Xc=new Te,Kb=new yi(new U(0,1,0),0),Po=new U;function Zb(n,e){var u,d,f,p;const t=n.entities.player;if(!t)return;const i=lr();if(!i)return;const s=t.turret,o=t.transform.pos,a=t.transform.yaw;if(lp()||xp()){const g=t.upgrades?t.upgrades.modifiers:null,_=g&&g.turretSpeedMultiplier||1,m=Tf*_;let h=Math.atan2(Math.sin(-s.yaw),Math.cos(-s.yaw));const v=m*e;Math.abs(h)<v?s.yaw=0:s.yaw+=Math.sign(h)*v;const x=1.5*e;Math.abs(s.pitch)<x?s.pitch=0:s.pitch-=Math.sign(s.pitch)*x;return}if(Xc.x=n.input.mouseX/window.innerWidth*2-1,Xc.y=-(n.input.mouseY/window.innerHeight)*2+1,Af.setFromCamera(Xc,i),Af.ray.intersectPlane(Kb,Po)){n.input._aimGroundX=Po.x,n.input._aimGroundZ=Po.z;const g=Po.x-o.x,_=Po.z-o.z,m=Math.sqrt(g*g+_*_);if(m>1){const h=Math.atan2(g,_),v=Math.atan2(Math.sin(h-a),Math.cos(h-a)),x=t.upgrades?t.upgrades.modifiers:null,M=x&&x.turretSpeedMultiplier||1,b=Tf*M,y=Math.atan2(Math.sin(v-s.yaw),Math.cos(v-s.yaw)),w=b*e;Math.abs(y)<w?s.yaw=v:s.yaw+=Math.sign(y)*w,s.yaw=Math.atan2(Math.sin(s.yaw),Math.cos(s.yaw));const P=((u=t.combat)==null?void 0:u.activeWeapon)||"he",S=Hn[P],T=S?S.muzzleV:220,N=x&&x.projectileVelMultiplier||1,F=T*N,$=$b*m/(F*F);let D;$>=1?D=jr:$<=0?D=0:D=.5*Math.asin($),s.pitch=Math.max(Wc,Math.min(jr,D))}}const l=n.input.keysDown;if(l.has("ArrowUp")&&(s.pitch+=1.5*e,s.pitch>jr&&(s.pitch=jr)),l.has("ArrowDown")&&(s.pitch-=1.5*e,s.pitch<Wc&&(s.pitch=Wc)),t.charge){const g=((p=(f=Hn[(d=t.combat)==null?void 0:d.activeWeapon])==null?void 0:f.charge)==null?void 0:p.maxTime)||2;t.charge._visualRatio=t.charge.active?Math.min(t.charge.time/g,1):0}}const vp="neonTanks_settings",qc={masterVolume:.8,sfxVolume:.8,ambientVolume:.6,controlScheme:"arcade"};let Ui=null;function Mp(){try{const n=localStorage.getItem(vp);if(n){const e=JSON.parse(n);Ui={...qc,...e}}else Ui={...qc}}catch{Ui={...qc}}return Ui}function Lo(n){Ui={...n};try{localStorage.setItem(vp,JSON.stringify(Ui))}catch{}}function Si(){return Ui||Mp()}function Jb(n){n.input={keysDown:new Set,keysPressed:new Set,mouseX:window.innerWidth/2,mouseY:window.innerHeight/2,mouseDown:!1,mousePressed:!1,_mouseWasDown:!1},window.addEventListener("keydown",e=>{n.input.keysDown.has(e.code)||n.input.keysPressed.add(e.code),n.input.keysDown.add(e.code)}),window.addEventListener("keyup",e=>{n.input.keysDown.delete(e.code)}),window.addEventListener("mousemove",e=>{n.input.mouseX=e.clientX,n.input.mouseY=e.clientY}),window.addEventListener("mousedown",e=>{e.button===0&&(n.input.mouseDown=!0,n.input._mouseWasDown||(n.input.mousePressed=!0),n.input._mouseWasDown=!0)}),window.addEventListener("mouseup",e=>{e.button===0&&(n.input.mouseDown=!1,n.input._mouseWasDown=!1)})}function Il(n){n.input.keysPressed.clear(),n.input.mousePressed=!1}function Qb(n){return{id:"player",transform:{pos:{x:n.x,y:n.y,z:n.z},yaw:0},physics:{vel:{x:0,y:0,z:0},yawVel:0},turret:{yaw:0,pitch:0},combat:{hp:160,hpMax:160,activeWeapon:"he",ammo:{he:null,sabot:0,heavy:0,mine:0},cooldown:{fire:0,mine:0},lastDamageFrom:null},charge:{active:!1,time:0,weapon:null,_fireChargeRatio:0,_visualRatio:0},sensors:{aim:{impactPos:null,valid:!1}},render:{rootId:"player"}}}function e1(n,e){const t=n.entities.player;if(!t)return;const i=n.input.keysDown,s=Si().controlScheme||"arcade",o=t.upgrades?t.upgrades.modifiers:null,a=o?o.speedMultiplier:1,r=o?o.turnRateMultiplier:1,c=i.has("ShiftLeft")||i.has("ShiftRight"),l=2,u=o&&o.boostSpeedMultiplier?o.boostSpeedMultiplier:1,d=c?l*u:1,f={...Ki,MAX_SPEED_FWD:Ki.MAX_SPEED_FWD*a*d,MAX_SPEED_REV:Ki.MAX_SPEED_REV*a*d,ACCEL_FWD:Ki.ACCEL_FWD*a*d,ACCEL_REV:Ki.ACCEL_REV*a*d,MAX_TURN_RATE:Ki.MAX_TURN_RATE*r,TURN_ACCEL:Ki.TURN_ACCEL*r};if(s==="driver"){let h=0,v=0;if(i.has("KeyW")&&(h+=1),i.has("KeyS")&&(h-=1),i.has("KeyA")&&(v-=1),i.has("KeyD")&&(v+=1),n.input._aimGroundX!==void 0){const $=n.input._aimGroundX-t.transform.pos.x,D=n.input._aimGroundZ-t.transform.pos.z;if(Math.sqrt($*$+D*D)>5){const X=Math.atan2($,D);let k=X-t.transform.yaw;k=Math.atan2(Math.sin(k),Math.cos(k));const z=f.MAX_TURN_RATE*e;Math.abs(k)<z?(t.transform.yaw=X,t.physics.yawVel=0):(t.transform.yaw+=Math.sign(k)*z,t.physics.yawVel=Math.sign(k)*f.MAX_TURN_RATE*.5),t.transform.yaw=Math.atan2(Math.sin(t.transform.yaw),Math.cos(t.transform.yaw))}}const x=Math.sin(t.transform.yaw),M=Math.cos(t.transform.yaw),b=M,y=-x;if(h>0?(t.physics.vel.x+=x*f.ACCEL_FWD*h*e,t.physics.vel.z+=M*f.ACCEL_FWD*h*e):h<0&&(t.physics.vel.x+=x*f.ACCEL_REV*h*e,t.physics.vel.z+=M*f.ACCEL_REV*h*e),v!==0){const $=f.ACCEL_FWD*.7;t.physics.vel.x+=b*$*v*e,t.physics.vel.z+=y*$*v*e}const w=t.physics.vel.x*x+t.physics.vel.z*M,P=t.physics.vel.x*b+t.physics.vel.z*y,S=w-w*f.LINEAR_DAMPING*e,T=P-P*(v!==0?f.LINEAR_DAMPING:f.LATERAL_DAMPING)*e;t.physics.vel.x=x*S+b*T,t.physics.vel.z=M*S+y*T;const N=f.MAX_SPEED_FWD,F=t.physics.vel.x*t.physics.vel.x+t.physics.vel.z*t.physics.vel.z;if(F>N*N){const $=N/Math.sqrt(F);t.physics.vel.x*=$,t.physics.vel.z*=$}t.transform.pos.x+=t.physics.vel.x*e,t.transform.pos.z+=t.physics.vel.z*e,t.transform.pos.y=0,El(t,n.config.MAP_W,n.config.MAP_H)}else{let h=0,v=0;i.has("KeyW")&&(h+=1),i.has("KeyS")&&(h-=1),i.has("KeyA")&&(v-=1),i.has("KeyD")&&(v+=1),Na(t,h,v,f,e),El(t,n.config.MAP_W,n.config.MAP_H)}Zb(n,e),t.combat.cooldown.fire>0&&(t.combat.cooldown.fire-=e,t.combat.cooldown.fire<0&&(t.combat.cooldown.fire=0)),t.combat.cooldown.mine>0&&(t.combat.cooldown.mine-=e,t.combat.cooldown.mine<0&&(t.combat.cooldown.mine=0)),o&&o.hpRegen>0&&t.combat.hp>0&&(t.combat.hp=Math.min(t.combat.hp+o.hpRegen*e,t.combat.hpMax)),t.upgrades&&mp(t,e);const p=t.charge,g=t.combat.activeWeapon,_=Hn[g],m=n.input.mouseOverUI;if(_&&_.charge&&_.charge.enabled){if(n.input.mouseDown&&!m){if(p.active?p.time+=e:(p.active=!0,p.time=0,p.weapon=g),p.time>=_.charge.overchargeTime){const h=Math.min(p.time/_.charge.maxTime,1);p._fireChargeRatio=h,p._forcefire=!0,p.active=!1,p.time=0}}else if(p.active)if(m)p.active=!1,p.time=0,p._fireChargeRatio=0;else{const h=Math.min(p.time/_.charge.maxTime,1);p._fireChargeRatio=h,p._forcefire=!0,p.active=!1,p.time=0}}else p.active&&(p.active=!1,p.time=0,p._fireChargeRatio=0);if(o&&o.maxHpBonus>0){const h=160+o.maxHpBonus;t.combat.hpMax!==h&&(t.combat.hpMax=h)}}const oa=[],t1=25;function Go(n,e){const t=Math.random()*Math.PI*2;oa.push({intensity:n,duration:e,elapsed:0,dirX:Math.cos(t),dirY:.6,dirZ:Math.sin(t)})}function n1(n){let e=0,t=0,i=0;for(let s=oa.length-1;s>=0;s--){const o=oa[s];if(o.elapsed+=n,o.elapsed>=o.duration){oa.splice(s,1);continue}const a=o.elapsed,r=o.intensity*Math.sin(a*t1)*Math.exp(-8*a);e+=r*o.dirX,t+=r*o.dirY,i+=r*o.dirZ}return{x:e,y:t,z:i}}const i1=55,Rf=110,Cf=35,s1=.16,Pf=8;function o1(n,e,t){if(!e)return;const i=e.transform.pos,s=e.transform.yaw,o=s+e.turret.yaw,a=.45;let r=o-s;r=r-Math.round(r/(Math.PI*2))*(Math.PI*2);const c=s+r*a,l=i.x-Math.sin(c)*Rf,u=i.y+i1,d=i.z-Math.cos(c)*Rf,f=1-Math.pow(1-s1,t*60);n.position.x+=(l-n.position.x)*f,n.position.y+=(u-n.position.y)*f,n.position.z+=(d-n.position.z)*f,n.position.y<Pf&&(n.position.y=Pf);const p=n1(t);n.position.x+=p.x,n.position.y+=p.y,n.position.z+=p.z;const g=i.x+Math.sin(s)*Cf,_=i.y+5,m=i.z+Math.cos(s)*Cf;n.lookAt(g,_,m)}const r1=90;let Mi=null,Wo=null,ra=null,Xo=null,aa=0,Yc=0,qo=null;const ca=[],a1=2.5,jc=1.5;function c1(){Mi=document.createElement("div"),Object.assign(Mi.style,{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"1000"}),Wo=document.createElement("div"),Object.assign(Wo.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"radial-gradient(ellipse at center, transparent 50%, rgba(255,20,20,0.6) 100%)",opacity:"0"}),ra=document.createElement("div"),Object.assign(ra.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"repeating-conic-gradient(rgba(255,255,255,0.06) 0deg 2deg, transparent 2deg 10deg)",opacity:"0"}),Xo=document.createElement("div"),Object.assign(Xo.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"#fff",opacity:"0"}),qo=document.createElement("div"),Object.assign(qo.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none"}),Mi.appendChild(Wo),Mi.appendChild(ra),Mi.appendChild(Xo),Mi.appendChild(qo),document.body.appendChild(Mi)}function l1(){aa=.1}function u1(n){if(!qo)return;const e=document.createElement("div"),t=n;Object.assign(e.style,{position:"absolute",width:"60px",height:"60px",pointerEvents:"none"}),e.innerHTML=`<div style="
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(255,30,30,0.9), rgba(255,30,30,0) 70%);
    clip-path: polygon(30% 0%, 70% 0%, 55% 100%, 45% 100%);
  "></div>`;const i=window.innerWidth/2,s=window.innerHeight/2,o=window.innerWidth*.42,a=window.innerHeight*.42,r=i+Math.sin(t)*o-30,c=s-Math.cos(t)*a-30;e.style.left=r+"px",e.style.top=c+"px";const l=t*180/Math.PI+180;e.style.transform=`rotate(${l}deg)`,qo.appendChild(e),ca.push({el:e,timer:0,duration:a1})}function d1(n,e){if(!Mi||!n)return;const t=n.combat.hp/n.combat.hpMax;if(t<.3){Yc+=e*4;const r=.3+.3*Math.sin(Yc),c=(1-t/.3)*r;Wo.style.opacity=String(Math.min(c,.8))}else Wo.style.opacity="0",Yc=0;const i=n.physics.vel,s=Math.sqrt(i.x*i.x+i.z*i.z),o=Math.min(s/r1,1),a=o>.7?(o-.7)/.3*.3:0;if(ra.style.opacity=String(a),aa>0){aa-=e;const r=.4*Math.max(aa/.1,0);Xo.style.opacity=String(r)}else Xo.style.opacity="0";for(let r=ca.length-1;r>=0;r--){const c=ca[r];if(c.timer+=e,c.timer>=c.duration){c.el.parentNode&&c.el.parentNode.removeChild(c.el),ca.splice(r,1);continue}let l=1;c.timer>jc&&(l=1-(c.timer-jc)/(c.duration-jc)),c.el.style.opacity=String(Math.max(0,l))}}const yp=30,f1=300,$c=21,h1=12,p1=9,m1=12;let g1=0,_1=0;function bp(n,e,t,i){const s=Hn[e],o=`proj-${g1++}`;return{id:o,owner:n,weapon:e,pos:{x:t.x,y:t.y,z:t.z},vel:{x:i.x,y:i.y,z:i.z},radius:s.projRadius,damageDirect:s.damageDirect,splashRadius:s.splashRadius,alive:!0,age:0,maxAge:s.maxAge,bounceCount:0,chargeRatio:0,render:{rootId:o,trailId:`${o}-trail`}}}function x1(n){var h,v;const e=n.entities.player;if(!e)return!1;const t=e.combat;if(t.cooldown.fire>0)return!1;const i=t.activeWeapon,s=Hn[i];if(t.ammo[i]!==null){if(t.ammo[i]<=0)return!1;t.ammo[i]-=1}const o=e.upgrades?e.upgrades.modifiers:null,a=o?o.fireRateMultiplier:1,r=o?o.projectileVelMultiplier:1,c=o?o.damageMultiplier:1,l=o?o.splashMultiplier:1,u=((h=e.charge)==null?void 0:h._fireChargeRatio)||0;e.charge&&(e.charge._fireChargeRatio=0);let d=1,f=1,p=1;if((v=s.charge)!=null&&v.enabled&&u>0){const x=s.charge;d=x.damageMult[0]+(x.damageMult[1]-x.damageMult[0])*u,f=x.splashMult[0]+(x.splashMult[1]-x.splashMult[0])*u,p=x.velocityMult[0]+(x.velocityMult[1]-x.velocityMult[0])*u}t.cooldown.fire=s.cooldown/a;const{muzzlePos:g,muzzleVel:_}=Sp(e,s.muzzleV*r*p),m=bp("player",i,g,_);return m.damageDirect=Math.round(s.damageDirect*c*d),m.splashRadius=s.splashRadius*l*f,m.chargeRatio=u,n.entities.projectiles.push(m),n.entities.effects.push(Tp("muzzleFlash",g,.3)),!0}function Sp(n,e){const i=n.transform.yaw+n.turret.yaw,s=n.turret.pitch,o=Math.cos(s),a=Math.sin(i)*o,r=Math.sin(s),c=Math.cos(i)*o,l=n.transform.pos,u={x:l.x+a*$c,y:l.y+h1+r*$c,z:l.z+c*$c},d={x:a*e,y:r*e,z:c*e};return{muzzlePos:u,muzzleVel:d}}function v1(n,e){const t=n.entities.projectiles;for(let i=t.length-1;i>=0;i--){const s=t[i];if(!s.alive)continue;if(s.age+=e,s.age>=s.maxAge){s.alive=!1;continue}const o=s.pos.x,a=s.pos.y,r=s.pos.z;if(s.vel.y-=yp*e,s.pos.x+=s.vel.x*e,s.pos.y+=s.vel.y*e,s.pos.z+=s.vel.z*e,s.pos.y<=0){if(a>0){const c=a/(a-s.pos.y);s.pos.x=o+(s.pos.x-o)*c,s.pos.y=0,s.pos.z=r+(s.pos.z-r)*c}Nl(n,s);continue}if(n.world&&n.world.obstacles){let c=!1;for(const l of n.world.obstacles)if(M1(s.pos,s.radius,l)){const u=Hn[s.weapon];if(u.ricochet&&s.bounceCount<u.maxBounces&&y1(s,l)){c=!1;break}Nl(n,s),c=!0;break}if(c)continue}w1(n,s)}n.entities.projectiles=t.filter(i=>i.alive)}function Ul(n,e,t){return n.x+t>=e.min.x&&n.x-t<=e.max.x&&n.y+t>=e.min.y&&n.y-t<=e.max.y&&n.z+t>=e.min.z&&n.z-t<=e.max.z}function wp(n,e,t){if(n.y+t<e.yMin||n.y-t>e.yMax)return!1;const i=n.x-e.cx,s=n.z-e.cz,o=e.radius+t;return i*i+s*s<=o*o}function M1(n,e,t){if(t.hitShapes){for(const i of t.hitShapes)if(i.type==="cylinder"){if(wp(n,i,e))return!0}else if(Ul(n,i,e))return!0;return!1}return Ul(n,t.aabb,e)}function y1(n,e){let t=null,i=1/0;if(e.hitShapes){for(const d of e.hitShapes)if(d.type==="cylinder"){if(wp(n.pos,d,n.radius)){const f=n.pos.x-d.cx,p=n.pos.z-d.cz,g=Math.sqrt(f*f+p*p);g>.001&&(t={x:f/g,y:0,z:p/g},i=d.radius+n.radius-g);break}}else if(Ul(n.pos,d,n.radius)){const f=Lf(n,d);t=f.normal,i=f.minPen;break}}else if(e.aabb){const d=Lf(n,e.aabb);t=d.normal,i=d.minPen}if(!t)return!1;const s=Math.sqrt(n.vel.x*n.vel.x+n.vel.y*n.vel.y+n.vel.z*n.vel.z);if(s<.001)return!1;const o=n.vel.x/s,a=n.vel.y/s,r=n.vel.z/s,c=o*t.x+a*t.y+r*t.z;if(Math.acos(Math.min(1,Math.abs(c)))<=Math.PI/4)return!1;const u=n.vel.x*t.x+n.vel.y*t.y+n.vel.z*t.z;return n.vel.x-=2*u*t.x,n.vel.y-=2*u*t.y,n.vel.z-=2*u*t.z,n.vel.x*=.6,n.vel.y*=.6,n.vel.z*=.6,n.pos.x+=t.x*(i+1),n.pos.y+=t.y*(i+1),n.pos.z+=t.z*(i+1),n.bounceCount++,n._ricochetEvent={x:n.pos.x,y:n.pos.y,z:n.pos.z},!0}function Lf(n,e){const t=n.pos.x+n.radius-e.min.x,i=e.max.x-(n.pos.x-n.radius),s=n.pos.z+n.radius-e.min.z,o=e.max.z-(n.pos.z-n.radius),a=e.max.y-(n.pos.y-n.radius),r=n.pos.y+n.radius-e.min.y,c=[{pen:t,normal:{x:-1,y:0,z:0}},{pen:i,normal:{x:1,y:0,z:0}},{pen:s,normal:{x:0,y:0,z:-1}},{pen:o,normal:{x:0,y:0,z:1}},{pen:a,normal:{x:0,y:1,z:0}},{pen:r,normal:{x:0,y:-1,z:0}}];let l=1/0,u={x:0,y:1,z:0};for(const d of c)d.pen>0&&d.pen<l&&(l=d.pen,u=d.normal);return{normal:u,minPen:l}}function b1(n){const e=[];for(const t of n)t._ricochetEvent&&(e.push({pos:{...t._ricochetEvent},weapon:t.weapon}),t._ricochetEvent=null);return e}function S1(n){const e=n.entities.projectiles,t=n.entities.mines;if(!t||t.length===0)return;const i=3,s=i*i;for(const o of e)if(o.alive)for(let a=t.length-1;a>=0;a--){const r=t[a];if(!r.alive||!r.armed||r.owner===o.owner&&r.age<3)continue;const c=o.pos.x-r.pos.x,l=o.pos.z-r.pos.z;if(!(o.pos.y-(r.pos.y||0)>5)&&c*c+l*l<=s){o.alive=!1,r._triggeredByProjectile=!0,r._triggerProjectileOwner=o.owner;break}}}function w1(n,e){var o,a;const t=[],i=n.entities.player;if(i&&i.combat.hp>0&&e.owner!=="player"&&t.push(i),n.entities.enemies)for(const r of n.entities.enemies)r.combat.hp>0&&r.id!==e.owner&&t.push(r);const s=e.radius;for(const r of t){const c=r.transform.pos,l=e.pos.x-c.x,u=e.pos.z-c.z,d=p1+s;if(l*l+u*u<=d*d&&e.pos.y+s>=0&&e.pos.y-s<=m1){const f=((a=(o=n.run)==null?void 0:o.mutatorOverrides)==null?void 0:a.damageMult)||1;return Ep(r,Math.round(e.damageDirect*f),e.owner,e.bounceCount),Nl(n,e,r.id),!0}}return!1}function Nl(n,e,t=null){e.alive=!1;const i=Tp("explosion",{...e.pos},.4);i.render.weaponType=e.weapon,i.render.splashRadius=e.splashRadius,n.entities.effects.push(i),E1(n,e,t)}function E1(n,e,t=null){var c,l;const i=[],s=n.entities.player;if(s&&s.combat.hp>0&&e.owner!=="player"&&s.id!==t&&i.push(s),n.entities.enemies)for(const u of n.entities.enemies)u.combat.hp>0&&u.id!==e.owner&&u.id!==t&&i.push(u);const o=e.splashRadius,a=o*o,r=((l=(c=n.run)==null?void 0:c.mutatorOverrides)==null?void 0:l.damageMult)||1;for(const u of i){const d=u.transform.pos,f=e.pos.x-d.x,p=e.pos.z-d.z,g=f*f+p*p;if(g<a){const m=1-Math.sqrt(g)/o,h=Math.round(e.damageDirect*m*r);h>0&&Ep(u,h,e.owner)}}}function Ep(n,e,t,i=0){const s=n.upgrades?n.upgrades.modifiers:null;let o=e;s&&s.shield&&(o=pp(s.shield,o)),s&&s.damageReduction>0&&(o=Math.round(o*(1-s.damageReduction))),n.combat.hp-=o,n.combat.hp<0&&(n.combat.hp=0),t&&(n.combat.lastDamageFrom=t,n.combat.lastDamageBounceCount=i),n.render&&n.render.hitFlash!==void 0&&(n.render.hitFlash=.2)}function Tp(n,e,t){const i=`fx-${_1++}`;return{id:i,type:n,pos:{x:e.x,y:e.y,z:e.z},t:0,duration:t,alive:!0,render:{rootId:i}}}function T1(n,e){const t=n.entities.effects;for(const i of t)i.alive&&(i.t+=e/i.duration,i.t>=1&&(i.alive=!1));n.entities.effects=t.filter(i=>i.alive)}function A1(n){const e=n.entities.player;if(!e)return;const t=Hn[e.combat.activeWeapon],i=e.upgrades?e.upgrades.modifiers:null,s=i?i.projectileVelMultiplier:1,{muzzlePos:o,muzzleVel:a}=Sp(e,t.muzzleV*s),r=[];let c=o.x,l=o.y,u=o.z,d=a.x,f=a.y,p=a.z;const g=.035;let _=null;for(let m=0;m<=f1;m++){if(r.push({x:c,y:l,z:u}),m>0&&l<=0){const h=r[r.length-2];if(h.y>0){const v=h.y/(h.y-l);_={x:h.x+(c-h.x)*v,y:0,z:h.z+(u-h.z)*v},r[r.length-1]={..._}}else _={x:c,y:0,z:u};break}f-=yp*g,c+=d*g,l+=f*g,u+=p*g}e.sensors.aim={impactPos:_,valid:_!==null,trajectoryPoints:r}}let Ap=0;function Rp(n){const e=n.entities.player;if(!e||e.combat.ammo.mine<=0||e.combat.cooldown.mine>0)return null;const t=e.upgrades?e.upgrades.modifiers:null,i=t?t.mineCooldownMultiplier:1;t&&t.mineCapacityBonus,e.combat.ammo.mine--,e.combat.cooldown.mine=Cn.cooldown*i;const s=e.transform.yaw,o={x:e.transform.pos.x-Math.sin(s)*8,y:0,z:e.transform.pos.z-Math.cos(s)*8},a={id:`mine-${Ap++}`,owner:"player",pos:o,armed:!1,armTimer:Cn.armDelay,alive:!0,age:0};return n.entities.mines.push(a),a}function R1(n,e,t,i){const s={id:`mine-${Ap++}`,owner:e,pos:{x:t.x,y:0,z:t.z},armed:!1,armTimer:Cn.armDelay,alive:!0,age:0},a=Cn.maxActive+0,r=n.entities.mines,c=r.filter(l=>l.owner===e);if(c.length>=a){const l=c[0],u=r.indexOf(l);u!==-1&&r.splice(u,1)}return r.push(s),s}function C1(n,e){const t=n.entities.mines;if(!t)return[];const i=[],s=Pp(n);for(let o=t.length-1;o>=0;o--){const a=t[o];if(!a.alive){t.splice(o,1);continue}if(a.age+=e,!a.armed){a.armTimer-=e,a.armTimer<=0&&(a.armed=!0,i.push({type:"armed",pos:a.pos}));continue}const r=Lp(n,a.owner),c=r&&r.upgrades?r.upgrades.modifiers:null,l=c?c.mineTriggerRadiusMultiplier:1,u=Cn.triggerRadius*l;for(const d of s){if(d.combat.hp<=0||a.owner===d.id&&a.age<Cn.ownerImmunity)continue;const f=d.transform.pos.x-a.pos.x,p=d.transform.pos.z-a.pos.z;if(Math.sqrt(f*f+p*p)<=u){const _=Cp(n,a);i.push(..._);break}}}return i}function Cp(n,e,t){var p,g;e.alive=!1;const i=[],s=Pp(n),o=Lp(n,e.owner),a=o&&o.upgrades?o.upgrades.modifiers:null,r=a?a.mineDamageMultiplier:1,c=((g=(p=n.run)==null?void 0:p.mutatorOverrides)==null?void 0:g.damageMult)||1,l=Cn.damageDirect*r*c;for(const _ of s){if(_.combat.hp<=0)continue;const m=_.transform.pos.x-e.pos.x,h=_.transform.pos.z-e.pos.z,v=Math.sqrt(m*m+h*h);if(v<Cn.splashRadius){const x=Math.max(0,1-v/Cn.splashRadius);let M=Math.round(l*x);if(M>0){const b=_.upgrades?_.upgrades.modifiers:null;b&&b.shield&&(M=pp(b.shield,M)),b&&b.damageReduction>0&&(M=Math.round(M*(1-b.damageReduction))),_.combat.hp-=M,_.combat.hp<0&&(_.combat.hp=0),_.combat.lastDamageFrom=e.owner,_.render&&_.render.hitFlash!==void 0&&(_.render.hitFlash=.2)}}}const u=n.entities.mines;for(let _=u.length-1;_>=0;_--){const m=u[_];if(m===e||!m.alive||!m.armed)continue;const h=m.pos.x-e.pos.x,v=m.pos.z-e.pos.z;h*h+v*v<Cn.splashRadius*Cn.splashRadius&&(m._triggeredByProjectile=!0,m._triggerProjectileOwner=e.owner)}const d=`fx-mine-${e.id}-${Date.now()}`;n.entities.effects.push({id:d,type:"explosion",pos:{x:e.pos.x,y:1,z:e.pos.z},t:0,duration:.5,alive:!0,render:{rootId:d,splashRadius:Cn.splashRadius}}),i.push({type:"exploded",pos:e.pos,damage:Math.round(l)});const f=n.entities.mines.indexOf(e);return f!==-1&&n.entities.mines.splice(f,1),i}function P1(n){const e=n.entities.mines;if(!e)return[];const t=[];for(let i=e.length-1;i>=0;i--){const s=e[i];if(!s._triggeredByProjectile||!s.alive)continue;s._triggeredByProjectile=!1;const o=Cp(n,s);t.push(...o)}return t}function Pp(n){const e=[];return n.entities.player&&e.push(n.entities.player),n.entities.enemies&&e.push(...n.entities.enemies),e}function Lp(n,e){return e==="player"?n.entities.player:n.entities.enemies&&n.entities.enemies.find(t=>t.id===e)||null}const L1=1920,D1=1440,zl=L1/2,Ol=D1/2,Df=.3,Fl=10,ps=[{pause:30,shrinkDuration:0,endRadius:1200,damage:3},{pause:30,shrinkDuration:20,endRadius:800,damage:5},{pause:20,shrinkDuration:18,endRadius:500,damage:8},{pause:15,shrinkDuration:15,endRadius:250,damage:15},{pause:10,shrinkDuration:12,endRadius:80,damage:28},{pause:8,shrinkDuration:10,endRadius:0,damage:55}];function I1(){return{center:{x:zl,z:Ol},radius:1200,targetCenter:{x:zl,z:Ol},targetRadius:1200,phase:0,phaseState:"waiting",timer:ps[0].pause,damagePerSecond:ps[0].damage,warningActive:!1}}function U1(n){return{x:n.x+(zl-n.x)*Df,z:n.z+(Ol-n.z)*Df}}function N1(n,e,t){var s,o;const i=e*(((o=(s=n.run)==null?void 0:s.mutatorOverrides)==null?void 0:o.stormSpeedMult)||1);if(t.timer-=i,t.phaseState==="waiting")t.warningActive=t.timer<=Fl,t.timer<=0&&(t.phase=1,If(t));else if(t.phaseState==="paused")t.warningActive=t.timer<=Fl,t.timer<=0&&z1(t);else if(t.phaseState==="shrinking"){t.warningActive=!1;const a=ps[t.phase];if(a.shrinkDuration>0){const r=Math.max(0,1-t.timer/a.shrinkDuration);t.radius=t._shrinkStartRadius+(t.targetRadius-t._shrinkStartRadius)*r,t.center.x=t._shrinkStartCenter.x+(t.targetCenter.x-t._shrinkStartCenter.x)*r,t.center.z=t._shrinkStartCenter.z+(t.targetCenter.z-t._shrinkStartCenter.z)*r}t.timer<=0&&(t.radius=t.targetRadius,t.center.x=t.targetCenter.x,t.center.z=t.targetCenter.z,t.phase<ps.length-1?(t.phase+=1,If(t)):(t.phaseState="shrinking",t.timer=0,t.damagePerSecond=ps[t.phase].damage))}}function If(n){const e=ps[n.phase];n.phaseState="paused",n.timer=e.pause,n.damagePerSecond=e.damage,n.warningActive=n.timer<=Fl}function z1(n){const e=ps[n.phase];n._shrinkStartRadius=n.radius,n._shrinkStartCenter={x:n.center.x,z:n.center.z},n.targetRadius=e.endRadius,n.targetCenter=U1(n.center),n.phaseState="shrinking",n.timer=e.shrinkDuration,n.warningActive=!1}function xs(n,e){const t=n.x-e.center.x,i=n.z-e.center.z;return t*t+i*i<=e.radius*e.radius}function O1(n){return n.damagePerSecond}const ki=1920,Hi=1440,Ht=40,tt=ki/Ht,ut=Hi/Ht;function Uf(n,e){const t=Math.floor(n/Ht),i=Math.floor(e/Ht);return{c:Math.max(0,Math.min(tt-1,t)),r:Math.max(0,Math.min(ut-1,i))}}function Vn(n,e){return{x:n*Ht+Ht/2,y:0,z:e*Ht+Ht/2}}function hu(n,e,t){return e<0||e>=tt||t<0||t>=ut?!0:n.blocked[t][e]}function Dp(n,e,t,i){e<0||e>=tt||t<0||t>=ut||(n.blocked[t][e]=i)}function Ip(){const n=[];for(let e=0;e<ut;e++)n.push(new Array(tt).fill(!1));return{cell:Ht,cols:tt,rows:ut,blocked:n}}const Nf={1:{min:140,max:175},2:{min:175,max:225},3:{min:215,max:280}},zf=[{kind:"tesla_coil",cellsW:1,cellsD:1,heightMin:30,heightMax:55,weight:.12,hpCategory:"large"},{kind:"power_cell",cellsW:1,cellsD:1,heightMin:16,heightMax:32,weight:.12,hpCategory:"small"},{kind:"circuit_monolith",cellsW:1,cellsD:1,heightMin:14,heightMax:30,weight:.15,hpCategory:"small"},{kind:"capacitor_bank",cellsW:2,cellsD:1,heightMin:14,heightMax:28,weight:.1,hpCategory:"medium"},{kind:"relay_tower",cellsW:1,cellsD:1,heightMin:50,heightMax:85,weight:.1,hpCategory:"large"},{kind:"data_obelisk",cellsW:1,cellsD:1,heightMin:22,heightMax:42,weight:.1,hpCategory:"large"},{kind:"plasma_conduit",cellsW:2,cellsD:1,heightMin:10,heightMax:20,weight:.08,hpCategory:"medium"},{kind:"power_pylon",cellsW:1,cellsD:1,heightMin:60,heightMax:100,weight:.08,hpCategory:"large"},{kind:"transformer_stack",cellsW:1,cellsD:1,heightMin:20,heightMax:38,weight:.08,hpCategory:"medium"},{kind:"cable_rack",cellsW:3,cellsD:1,heightMin:15,heightMax:25,weight:.07,hpCategory:"medium"}],F1=["#0a1628","#0c1a30","#0e1e38","#101828"],B1=["#1a2840","#1c2a44","#1e2c48","#202e4c"],k1={small:60,medium:100,large:150};function H1(n,e,t){const i=(t.min.x+t.max.x)/2,s=(t.min.z+t.max.z)/2,o=t.max.x-t.min.x,a=t.max.z-t.min.z,r=Math.min(o,a);switch(n){case"tesla_coil":{const c=r*.35;return[{type:"cylinder",cx:i,cz:s,radius:c*1.4,yMin:0,yMax:3},{type:"cylinder",cx:i,cz:s,radius:c,yMin:3,yMax:e+3}]}case"power_cell":{const c=r*.4*1.15;return[{type:"cylinder",cx:i,cz:s,radius:c,yMin:0,yMax:e+2}]}case"circuit_monolith":{const c=(o-2)/2,l=(a-2)/2;return[{type:"box",min:{x:i-c,y:0,z:s-l},max:{x:i+c,y:e+2,z:s+l}}]}case"capacitor_bank":{const c=Math.max(o,a),l=Math.min(o,a),u=l*.35,d=c*.25,f=o>=a,p=(c-2)/2,g=(l-2)/2,_=[{type:"box",min:{x:i-p,y:0,z:s-g},max:{x:i+p,y:1.5,z:s+g}}];for(const m of[-1,1]){const h=i+(f?m*d:0),v=s+(f?0:m*d);_.push({type:"cylinder",cx:h,cz:v,radius:u,yMin:1.5,yMax:e+1.5})}return _}case"relay_tower":{const c=r*.18;return[{type:"cylinder",cx:i,cz:s,radius:c*3,yMin:0,yMax:2.5},{type:"cylinder",cx:i,cz:s,radius:c,yMin:2.5,yMax:e+3}]}case"data_obelisk":{const c=(o-4)/2,l=(a-4)/2;return[{type:"box",min:{x:i-c,y:0,z:s-l},max:{x:i+c,y:e+4,z:s+l}}]}case"plasma_conduit":{const c=Math.max(o,a),l=Math.min(o,a),u=o>=a,d=Math.min(e*.4,l*.3),f=c-4,p=f*.3,g=[];for(const _ of[-1,1]){const m=u?i+_*p:i,h=u?s:s+_*p;g.push({type:"box",min:{x:m-1,y:0,z:h-1},max:{x:m+1,y:e*.55,z:h+1}})}return u?g.push({type:"box",min:{x:i-f/2,y:e*.55-d,z:s-d},max:{x:i+f/2,y:e*.55+d,z:s+d}}):g.push({type:"box",min:{x:i-d,y:e*.55-d,z:s-f/2},max:{x:i+d,y:e*.55+d,z:s+f/2}}),g}case"power_pylon":{const c=r*.4,l=r*.35;return[{type:"cylinder",cx:i,cz:s,radius:c,yMin:0,yMax:3},{type:"cylinder",cx:i,cz:s,radius:l*.5+1,yMin:3,yMax:e}]}case"transformer_stack":{const c=r*.38;return[{type:"cylinder",cx:i,cz:s,radius:c*1.2,yMin:0,yMax:3},{type:"cylinder",cx:i,cz:s,radius:c,yMin:3,yMax:e+2}]}case"cable_rack":{const c=Math.max(o,a),l=Math.min(o,a),u=o>=a,d=c*.4,f=l*.2,p=[];for(const g of[-1,1])for(const _ of[-1,1]){const m=i+(u?g*d:_*f),h=s+(u?_*f:g*d);p.push({type:"box",min:{x:m-1.2,y:0,z:h-1.2},max:{x:m+1.2,y:e,z:h+1.2}})}return p}default:return[{type:"box",min:{...t.min},max:{...t.max}}]}}function V1(n){const e=n();let t=0;for(const i of zf)if(t+=i.weight,e<t)return i;return zf[0]}function G1(n,e,t,i=0){const s=Nf[e]||Nf[1],o=Math.floor(t()*(s.max-s.min+1))+s.min,a=[];let r=0;const c=new Set;for(let l=0;l<o;l++){const u=W1(n,t,c,r,i);u&&(a.push(u),r++)}return a}function W1(n,e,t,i,s){const o=V1(e);let a=o.cellsW,r=o.cellsD;(o.kind==="capacitor_bank"||o.kind==="plasma_conduit"||o.kind==="cable_rack")&&e()<.5&&(a=o.cellsD,r=o.cellsW);for(let c=0;c<15;c++){const l=Math.floor(e()*(tt-a)),u=Math.floor(e()*(ut-r));let d=!0;const f=[];for(let b=0;b<a&&d;b++)for(let y=0;y<r&&d;y++){const w=`${l+b},${u+y}`;(t.has(w)||n.blocked[u+y][l+b])&&(d=!1),f.push({c:l+b,r:u+y,key:w})}if(!d)continue;for(const b of f)t.add(b.key),Dp(n,b.c,b.r,!0);const p=o.heightMin+e()*(o.heightMax-o.heightMin),g=e()<s,_=g?B1:F1,m=_[Math.floor(e()*_.length)],h={x:l*Ht,y:0,z:u*Ht},v={x:(l+a)*Ht,y:p,z:(u+r)*Ht},x=g?k1[o.hpCategory]:0,M={min:h,max:v};return{id:`obs-${i}`,kind:o.kind,cell:{c:l,r:u},cellsW:a,cellsD:r,destructible:g,hp:x,hpMax:x,aabb:M,hitShapes:H1(o.kind,p,M),render:{color:m,height:p}}}return null}const Of=25,X1=35,q1=40,Ff=18,$r={sabot_loot:"#00ffff",heavy_loot:"#ff00ff",mine_loot:"#ffaa00",scrap_loot:"#ffd700"},Bl=[{type:"sabot_ammo",amount:8,color:"#00ffff",weight:.25},{type:"heavy_ammo",amount:5,color:"#ff00ff",weight:.25},{type:"mine_pack",amount:3,color:"#ffaa00",weight:.2},{type:"health_pack",amount:40,color:"#00ff66",weight:.3}];let pu=0,kl=null,Up=!1;function Y1(n){kl=n}function j1(n){Up=!!n}function $1(n){const e=n();let t=0;for(const i of Bl)if(t+=i.weight,e<t)return i;return Bl[0]}function K1(n,e,t,i){const s=Math.floor(i()*(X1-Of+1))+Of,o=new Set;for(let d=0;d<ut;d++)for(let f=0;f<tt;f++)hu(n,f,d)&&o.add(`${f},${d}`);const a=3,r=4,c=[];for(let d=0;d<ut;d++)for(let f=0;f<tt;f++){if(o.has(`${f},${d}`))continue;const p=Math.abs(f-t.c),g=Math.abs(d-t.r);p<=a&&g<=a||c.push({c:f,r:d})}if(c.length===0)return[];for(let d=c.length-1;d>0;d--){const f=Math.floor(i()*(d+1));[c[d],c[f]]=[c[f],c[d]]}const l=[],u=new Set;for(const d of c){if(l.length>=s)break;let f=!1;for(const m of l){const h=Math.abs(d.c-m.cell.c),v=Math.abs(d.r-m.cell.r);if(h<r&&v<r){f=!0;break}}if(f)continue;const p=`${d.c},${d.r}`;if(u.has(p))continue;u.add(p);const g=$1(i),_=Vn(d.c,d.r);l.push({id:`pu-${pu++}`,type:g.type,cell:{c:d.c,r:d.r},pos:_,amount:g.amount,active:!0,render:{color:g.color,bobPhase:i()*Math.PI*2}})}return l}function Z1(n,e){if(!n.world||!n.world.powerups)return;const t=n.world.powerups;for(const f of t)f.isLoot&&f.active&&(f.lootTimer-=e,f.lootTimer<=0&&(f.active=!1));if(typeof n._powerupRespawnTimer!="number"&&(n._powerupRespawnTimer=0),n._powerupRespawnTimer+=e,n._powerupRespawnTimer<Ff)return;n._powerupRespawnTimer-=Ff;const i=n.world.powerups,s=i.filter(f=>f.active);if(s.length>=q1)return;const o=n.world.grid;if(!o)return;const a=new Set;for(const f of s)f.cell&&a.add(`${f.cell.c},${f.cell.r}`);const r=[];for(let f=0;f<ut;f++)for(let p=0;p<tt;p++){if(hu(o,p,f))continue;const g=`${p},${f}`;if(!a.has(g)){if(n.stormRing&&n.stormRing.radius>0){const _=Vn(p,f),m=_.x-n.stormRing.center.x,h=_.z-n.stormRing.center.z;if(m*m+h*h>n.stormRing.radius*n.stormRing.radius)continue}r.push({c:p,r:f})}}if(r.length===0)return;const c=Math.floor(Math.random()*r.length),l=r[c],u=Vn(l.c,l.r),d=J1();i.push({id:`pu-${pu++}`,type:d.type,cell:{c:l.c,r:l.r},pos:u,amount:d.amount,active:!0,render:{color:d.color,bobPhase:Math.random()*Math.PI*2}})}function J1(){const n=kl==="no_sabot"?"sabot_ammo":kl==="no_heavy"?"heavy_ammo":null;let e=Bl;n&&(e=e.filter(a=>a.type!==n));let t=0;const i=e.map(a=>{const r=Up&&a.type==="mine_pack"?a.weight*2:a.weight;return t+=r,r}),s=Math.random()*t;let o=0;for(let a=0;a<e.length;a++)if(o+=i[a],s<o)return e[a];return e[0]}function Q1(n,e,t){const i=[];if(e.ammo.sabot>0){const o=Math.min(e.ammo.sabot,8);i.push(Kr(n,12,"sabot_loot",o,$r.sabot_loot))}if(e.ammo.heavy>0){const o=Math.min(e.ammo.heavy,5);i.push(Kr(n,12,"heavy_loot",o,$r.heavy_loot))}if(e.ammo.mine>0){const o=Math.min(e.ammo.mine,3);i.push(Kr(n,12,"mine_loot",o,$r.mine_loot))}if(t&&t.scrap>20){const o=Math.floor(t.scrap*.5);i.push(Kr(n,12,"scrap_loot",o,$r.scrap_loot))}return i.slice(0,3)}function Kr(n,e,t,i,s){const o=Math.random()*Math.PI*2,a=Math.random()*e,r={x:n.x+Math.cos(o)*a,y:0,z:n.z+Math.sin(o)*a};return{id:`loot-${pu++}`,type:t,cell:null,pos:r,amount:i,active:!0,isLoot:!0,lootTimer:30,render:{color:s,bobPhase:Math.random()*Math.PI*2,isLoot:!0}}}const Zr=3,eS=10,tS=10,nS=.7,iS=20,Kc=11,sS=.3,Np=["regular","regular","regular","regular","regular","veteran","veteran","veteran","veteran","elite","elite"];function zp(n){let e=n|0;return function(){e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function mu(n,e){for(let t=n.length-1;t>0;t--){const i=Math.floor(e()*(t+1));[n[t],n[i]]=[n[i],n[t]]}}function oS(n,e={}){const{obstacleDensityMult:t=1,powerupSpawnMult:i=1,skillDistribution:s=null,weaponRestriction:o=null}=e,a=t<.7?1:t>1.2?3:2;for(let r=0;r<iS;r++){const c=n+r,l=zp(c),u=Ip(),d=G1(u,a,l,sS),f=rS(u,l);if(!f)continue;aS(u,f);const p=cS(u,f.c,f.r),g=lS(u);if(g===0||p/g<nS)continue;const m=uS(u,f,Kc,l);if(m.length<Kc)continue;const h=s&&s.length===Kc?[...s]:[...Np];mu(h,l);let v=K1(u,d,f,l);if(i<1&&v.length>0){const b=Math.max(1,Math.round(v.length*i));for(let y=v.length-1;y>0;y--){const w=Math.floor(l()*(y+1));[v[y],v[w]]=[v[w],v[y]]}v=v.slice(0,b)}if(o){const b=o==="no_sabot"?"sabot_ammo":o==="no_heavy"?"heavy_ammo":null;b&&(v=v.filter(y=>y.type!==b))}const x=Vn(f.c,f.r);return{worldState:{bounds:{w:ki,h:Hi},grid:u,nav:{version:0},obstacles:d,powerups:v},playerSpawn:{cell:f,pos:x},enemySpawns:m.map((b,y)=>({cell:b,pos:Vn(b.c,b.r),skill:h[y]}))}}return dS()}function rS(n,e){const t=Math.floor(tt/2),i=Math.floor(ut/2);for(let s=0;s<=5;s++){const o=[];for(let a=-s;a<=s;a++)for(let r=-s;r<=s;r++){const c=t+a,l=i+r;hu(n,c,l)||o.push({c,r:l})}if(o.length>0)return o[Math.floor(e()*o.length)]}return null}function aS(n,e){for(let t=-Zr;t<=Zr;t++)for(let i=-Zr;i<=Zr;i++){const s=e.c+t,o=e.r+i;s>=0&&s<tt&&o>=0&&o<ut&&(n.blocked[o][s]=!1)}}function cS(n,e,t){const i=new Set,s=[{c:e,r:t}];i.add(`${e},${t}`);const o=[[-1,0],[1,0],[0,-1],[0,1]];for(;s.length>0;){const{c:a,r}=s.shift();for(const[c,l]of o){const u=a+c,d=r+l,f=`${u},${d}`;u>=0&&u<tt&&d>=0&&d<ut&&!i.has(f)&&!n.blocked[d][u]&&(i.add(f),s.push({c:u,r:d}))}}return i.size}function lS(n){let e=0;for(let t=0;t<ut;t++)for(let i=0;i<tt;i++)n.blocked[t][i]||e++;return e}function uS(n,e,t,i){const s=[];for(let a=0;a<ut;a++)for(let r=0;r<tt;r++){if(n.blocked[a][r])continue;const c=r-e.c,l=a-e.r,u=Math.sqrt(c*c+l*l);u<eS||s.push({c:r,r:a,distFromPlayer:u})}if(s.length===0)return[];mu(s,i);const o=[];for(const a of s){if(o.length>=t)break;let r=!1;for(const c of o)if(Math.sqrt((a.c-c.c)**2+(a.r-c.r)**2)<tS){r=!0;break}r||o.push({c:a.c,r:a.r})}return o}function dS(){const n=zp(42),e=Ip(),t={c:Math.floor(tt/2),r:Math.floor(ut/2)},i=Math.floor(tt/2),s=Math.floor(ut/2),o=[{c:3,r:3},{c:tt-4,r:3},{c:3,r:ut-4},{c:tt-4,r:ut-4},{c:i,r:3},{c:i,r:ut-4},{c:3,r:s},{c:tt-4,r:s},{c:i,r:s+5},{c:Math.floor(tt/4),r:s},{c:Math.floor(tt*3/4),r:s}],a=[...Np];return mu(a,n),{worldState:{bounds:{w:ki,h:Hi},grid:e,nav:{version:0},obstacles:[],powerups:[]},playerSpawn:{cell:t,pos:Vn(t.c,t.r)},enemySpawns:o.map((r,c)=>({cell:r,pos:Vn(r.c,r.r),skill:a[c]}))}}let gu=[];function fS(n,e,t){if(!n.destructible||n.hp<=0)return{destroyed:!1,obstacle:n};if(n.hp-=e,n.hp<=0){n.hp=0;const i=t.world.obstacles.indexOf(n);i!==-1&&t.world.obstacles.splice(i,1);for(let s=0;s<n.cellsW;s++)for(let o=0;o<n.cellsD;o++)Dp(t.world.grid,n.cell.c+s,n.cell.r+o,!1);return t.world.nav&&t.world.nav.version++,gu.push(n),{destroyed:!0,obstacle:n}}return{destroyed:!1,obstacle:n}}function hS(){return gu}function pS(){gu=[]}function mS(n,e,t){if(n.c===e.c&&n.r===e.r)return[{c:n.c,r:n.r}];let i=e;if(Uo(i.c,i.r,t)&&(i=_S(i,t),!i))return[];const s=new xS,o=new Map,a=new Map,r=new Map,c=Ni(n.c,n.r),l=Ni(i.c,i.r);a.set(c,0),r.set(c,Bf(n.c,n.r,i.c,i.r)),s.push({c:n.c,r:n.r,f:r.get(c)});const u=new Set,d=[{dc:-1,dr:0,cost:1},{dc:1,dr:0,cost:1},{dc:0,dr:-1,cost:1},{dc:0,dr:1,cost:1},{dc:-1,dr:-1,cost:1.414},{dc:1,dr:-1,cost:1.414},{dc:-1,dr:1,cost:1.414},{dc:1,dr:1,cost:1.414}];let f=0;const p=2e3;for(;s.size()>0&&f<p;){f++;const g=s.pop(),_=Ni(g.c,g.r);if(_===l)return gS(o,g);u.add(_);for(const m of d){const h=g.c+m.dc,v=g.r+m.dr;if(h<0||h>=tt||v<0||v>=ut||Uo(h,v,t)||m.dc!==0&&m.dr!==0&&(Uo(g.c+m.dc,g.r,t)||Uo(g.c,g.r+m.dr,t)))continue;const x=Ni(h,v);if(u.has(x))continue;const M=a.get(_)+m.cost,b=a.get(x);if(b===void 0||M<b){o.set(x,{c:g.c,r:g.r}),a.set(x,M);const y=M+Bf(h,v,i.c,i.r);r.set(x,y),s.push({c:h,r:v,f:y})}}}return[]}function Uo(n,e,t){return n<0||n>=tt||e<0||e>=ut?!0:t.blocked[e][n]}function Ni(n,e){return e<<8|n}function Bf(n,e,t,i){const s=Math.abs(n-t),o=Math.abs(e-i);return Math.max(s,o)+.414*Math.min(s,o)}function gS(n,e){const t=[{c:e.c,r:e.r}];let i=Ni(e.c,e.r);for(;n.has(i);){const s=n.get(i);t.push({c:s.c,r:s.r}),i=Ni(s.c,s.r)}return t.reverse(),t}function _S(n,e){const t=new Set,i=[{c:n.c,r:n.r}];for(t.add(Ni(n.c,n.r));i.length>0;){const{c:s,r:o}=i.shift();if(!Uo(s,o,e))return{c:s,r:o};for(const[a,r]of[[-1,0],[1,0],[0,-1],[0,1]]){const c=s+a,l=o+r;if(c<0||c>=tt||l<0||l>=ut)continue;const u=Ni(c,l);t.has(u)||(t.add(u),i.push({c,r:l}))}}return null}class xS{constructor(){this._data=[]}size(){return this._data.length}push(e){this._data.push(e),this._bubbleUp(this._data.length-1)}pop(){const e=this._data[0],t=this._data.pop();return this._data.length>0&&(this._data[0]=t,this._sinkDown(0)),e}_bubbleUp(e){for(;e>0;){const t=e-1>>1;if(this._data[e].f<this._data[t].f)[this._data[e],this._data[t]]=[this._data[t],this._data[e]],e=t;else break}}_sinkDown(e){const t=this._data.length;for(;;){let i=e;const s=2*e+1,o=2*e+2;if(s<t&&this._data[s].f<this._data[i].f&&(i=s),o<t&&this._data[o].f<this._data[i].f&&(i=o),i===e)break;[this._data[e],this._data[i]]=[this._data[i],this._data[e]],e=i}}}const tr=280,za=Math.PI*(130/180);function vS(n,e,t,i){const s=t.x-n.x,o=t.z-n.z,a=Math.sqrt(s*s+o*o);if(a>tr)return!1;if(a<.001)return!0;const r=Math.atan2(s,o),c=Math.atan2(Math.sin(r-e),Math.cos(r-e));if(Math.abs(c)>za/2)return!1;const l=Math.abs(c)/(za/2);if(l>.6){const u=1-(l-.6)/.4,d=tr*(.4+.6*u);if(a>d)return!1}return!Op(n.x,n.z,t.x,t.z,i)}function MS(n,e,t){const i=t||[];t&&(t.length=0);const s=e.world.obstacles,o=n.transform.pos,a=n.transform.yaw;let r=!1;const c=e.entities.player;if(c&&c.combat.hp>0){const u=kf(c);Hf(o,a,c.transform.pos,s,u)&&(i.push(c),!r&&c.physics&&c.physics.vel&&(n.ai._lastSeenVelocity={x:c.physics.vel.x,z:c.physics.vel.z},r=!0))}const l=e.entities.enemies;if(l)for(const u of l){if(u===n||u.combat.hp<=0)continue;const d=kf(u);Hf(o,a,u.transform.pos,s,d)&&(i.push(u),!r&&u.physics&&u.physics.vel&&(n.ai._lastSeenVelocity={x:u.physics.vel.x,z:u.physics.vel.z},r=!0))}return i}function kf(n){return n.upgrades&&n.upgrades.modifiers&&n.upgrades.modifiers.aiDetectionReduction>0?tr*(1-n.upgrades.modifiers.aiDetectionReduction):tr}function Hf(n,e,t,i,s){const o=t.x-n.x,a=t.z-n.z,r=Math.sqrt(o*o+a*a);if(r>s)return!1;if(r<.001)return!0;const c=Math.atan2(o,a),l=Math.atan2(Math.sin(c-e),Math.cos(c-e));if(Math.abs(l)>za/2)return!1;const u=Math.abs(l)/(za/2);if(u>.6){const d=1-(u-.6)/.4,f=s*(.4+.6*d);if(r>f)return!1}return!Op(n.x,n.z,t.x,t.z,i)}function Op(n,e,t,i,s){const o=t-n,a=i-e;if(Math.sqrt(o*o+a*a)<.001)return!1;const c=o!==0?1/o:1e12,l=a!==0?1/a:1e12;for(const u of s){const{min:d,max:f}=u.aabb;let p=(d.x-n)*c,g=(f.x-n)*c;if(p>g){const x=p;p=g,g=x}let _=(d.z-e)*l,m=(f.z-e)*l;if(_>m){const x=_;_=m,m=x}const h=Math.max(p,_),v=Math.min(g,m);if(h<v&&v>0&&h<1)return!0}return!1}const yS=150;function Fp(n,e,t=null){const i=e.entities.enemies;if(i)for(const s of i){if(s.combat.hp<=0||s.id===t||s.ai.state==="CHASE"||s.ai.state==="ATTACK"||s.ai.state==="FLEE_STORM")continue;const o=s.transform.pos.x-n.x,a=s.transform.pos.z-n.z,r=Math.sqrt(o*o+a*a);if(r<=yS){const c=s.ai.skill||"regular";if((c==="elite"||c==="veteran"&&Math.random()<.5)&&r>30){const u=Math.atan2(n.x-s.transform.pos.x,n.z-s.transform.pos.z),d=Math.random()<.5?1:-1,f=u+d*(Math.PI/3+Math.random()*(Math.PI/6)),p=80;s.ai.lastSeenTargetPos={x:n.x+Math.sin(f)*p,y:0,z:n.z+Math.cos(f)*p}}else s.ai.lastSeenTargetPos={x:n.x,y:0,z:n.z};(s.ai.state==="PATROL"||s.ai.state==="RETREAT"||s.ai.state==="SEEK_POWERUP")&&(s.ai.state="INVESTIGATE",s.ai.stateTime=0,s.ai.waypoint=null,s.ai.path=[],s.ai.pathIndex=0)}}}function bS(n,e,t,i){const s=i||[];if(i&&(i.length=0),!e||e.length===0)return s;const o=t*t;for(const a of e){if(!a.alive||!a.armed)continue;const r=a.pos.x-n.x,c=a.pos.z-n.z;r*r+c*c<=o&&s.push(a)}return s}const Bp=80,SS=150,Vf=.4;function kp(n){function e(t,i){return t+Math.random()*(i-t)}return n==="elite"?{aggression:e(.4,1),patience:e(.1,.8),caution:e(.1,.9),opportunism:e(.5,1)}:n==="veteran"?{aggression:e(.3,.9),patience:e(.2,.8),caution:e(.2,.9),opportunism:e(.3,.9)}:{aggression:e(.35,.75),patience:e(.3,.7),caution:e(.3,.7),opportunism:e(.35,.65)}}function Hl(n,e){return{fightStartTime:0,myHpAtStart:n.combat.hp,targetHpAtStart:e.combat.hp,myHpNow:n.combat.hp,targetHpNow:e.combat.hp,thirdPartyVisible:!1,lastAssessmentTime:0,stalemateScore:0,timer:0}}function wS(n,e,t,i,s){if(n.timer+=s,n.fightStartTime+=s,n.myHpNow=e.combat.hp,n.targetHpNow=t.combat.hp,n.lastAssessmentTime+=s,n.lastAssessmentTime>=1.5){n.lastAssessmentTime=0;const o=new Set([e.id,t.id]);n.thirdPartyVisible=i.some(l=>!o.has(l.id));const a=n.myHpAtStart-n.myHpNow,r=n.targetHpAtStart-n.targetHpNow;a+r<5&&n.timer>3?n.stalemateScore=Math.min(1,n.stalemateScore+.15):n.stalemateScore=Math.max(0,n.stalemateScore-.1)}}function ES(n,e,t){let i=n.myHpNow,s=n.myHpAtStart;if(t&&t.upgrades&&t.upgrades.modifiers&&t.upgrades.modifiers.shield){const f=t.upgrades.modifiers.shield;f.active&&f.hp>0?(i+=f.hp,s+=f.hpMax):f.active||(i*=.85)}const o=i/Math.max(1,s);n.targetHpNow/Math.max(1,n.targetHpAtStart);const a=s-i,r=n.targetHpAtStart-n.targetHpNow;if(t&&t.ai&&t.ai.skill==="elite"&&o<.15||o<.2)return"retreat";const c=4+(e.patience||.5)*6;if(n.timer>c&&a/Math.max(1,s)<Vf&&r/Math.max(1,n.targetHpAtStart)<Vf||n.thirdPartyVisible&&n.timer>3)return"disengage";if(a/Math.max(1,s)/(r/Math.max(1,n.targetHpAtStart)+.001)>2)return"kite";const u=n.targetHpNow/Math.max(1,n.targetHpAtStart),d=(e.aggression||.5)>.6?.4:.3;return u<d&&o>.5?"press":"continue"}function TS(n,e,t,i,s){const o=n.ai.skill||"regular",a=n.ai.personality||kp(o);let r=n.combat.hp;if(n.upgrades&&n.upgrades.modifiers&&n.upgrades.modifiers.shield){const g=n.upgrades.modifiers.shield;g&&g.active&&g.hp>0&&(r+=g.hp)}const c=r/Math.max(1,n.combat.hpMax+(n.upgrades&&n.upgrades.modifiers&&n.upgrades.modifiers.maxHpBonus||0)),l=e.combat.hp/Math.max(1,e.combat.hpMax);if(e.transform.pos.x-n.transform.pos.x,e.transform.pos.z-n.transform.pos.z,t.thirdPartyVisible)return o==="elite"?"strafe":o==="veteran"?"disengage":"kite";if(c<.35)return"kite";const u=t.myHpAtStart-t.myHpNow,d=t.targetHpAtStart-t.targetHpNow;if(u/Math.max(1,t.myHpAtStart)/(d/Math.max(1,t.targetHpAtStart)+.001)>2||c<l*.7)return"kite";const p=4+(a.patience||.5)*6;return t.stalemateScore>.6||t.timer>p?"disengage":l<.3&&c>.5?"press":(o==="veteran"||o==="elite")&&c>.7&&n.combat.ammo.mine>0&&(a.caution||0)>.4&&Oa(n.transform.pos,e.transform.pos,s,60)?"bait":(a.caution||0)>.5&&Oa(n.transform.pos,e.transform.pos,s,Bp)?"peek":"strafe"}function Vl(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=t.world.obstacles||[],r=o.x-s.x,c=o.z-s.z,l=Math.sqrt(r*r+c*c),u=n.combat.activeWeapon||"he",d=u==="sabot"?200:u==="heavy"?130:165;n.ai._strafe||(n.ai._strafe={direction:Math.random()<.5?1:-1,timer:0,flipInterval:2+Math.random()*2,lastHp:n.combat.hp,oscillatePhase:Math.random()*Math.PI*2});const f=n.ai._strafe;f.timer+=i,f.oscillatePhase+=i*1.2,n.combat.hp<f.lastHp&&(f.direction=-f.direction,f.timer=0,f.flipInterval=2+Math.random()*2),f.lastHp=n.combat.hp,f.timer>=f.flipInterval&&(f.direction=-f.direction,f.timer=0,f.flipInterval=2+Math.random()*2);const p=Math.atan2(r,c),g=d+Math.sin(f.oscillatePhase)*20;let _=null;for(let m=0;m<5;m++){const h=f.direction*(.8+m*.25),v=o.x-Math.sin(p+h)*g,x=o.z-Math.cos(p+h)*g;if(!Fa({x:v,z:x},a)){_={x:v,y:0,z:x};break}}if(!_)if(l>g+20)_={x:o.x,y:0,z:o.z};else if(l<g-20){const m=l||1;_={x:s.x-r/m*30,y:0,z:s.z-c/m*30}}else _={x:s.x,y:0,z:s.z};return{waypoint:_,shouldFire:!0,shouldDeployMine:!1}}function AS(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=t.world.obstacles||[];n.ai._peek||(n.ai._peek={phase:"approach",timer:0,cover:null,hidePos:null,peekPos:null,side:Math.random()<.5?1:-1});const r=n.ai._peek;if(r.timer+=i,r.cover&&(r.cover.hp!==void 0&&r.cover.hp<=0||!r.cover.aabb)&&(r.cover=null,r.phase="approach",r.timer=0),!r.cover||r.timer>8){const u=FS(s,o,a,Bp);if(u)r.cover=u.obstacle,r.hidePos=u.hidePos,r.peekPos=Xf(r.hidePos,o,u.obstacle,r.side),r.phase="approach",r.timer=0;else return Vl(n,e,t,i)}let c=null,l=!1;switch(r.phase){case"approach":{c=r.hidePos,un(s,r.hidePos)<20&&(r.phase="peek",r.timer=0);break}case"peek":{c=r.peekPos,un(s,r.peekPos)<15&&(r.phase="fire",r.timer=0);break}case"fire":{c=r.peekPos,l=!0;const u=n.ai.skill||"regular",d=u==="veteran"||u==="elite"?.8+Math.random()*.4:.5+Math.random()*.3;r.timer>d&&(r.phase="hide",r.timer=0,r.side=-r.side,r.cover&&(r.peekPos=Xf(r.hidePos,o,r.cover,r.side)));break}case"hide":{c=r.hidePos,un(s,r.hidePos)<20&&(r.phase="wait",r.timer=0);break}case"wait":{c=r.hidePos;const u=.5+Math.random()*1;r.timer>u&&(r.phase="peek",r.timer=0);break}}return{waypoint:c,shouldFire:l,shouldDeployMine:!1}}function RS(n,e,t,i){var x;const s=n.transform.pos,o=e.transform.pos,r=(n.ai.personality||{}).aggression||.6,c=t.world.obstacles||[],l=(x=e.physics)==null?void 0:x.vel;let u=o.x,d=o.z;l&&(u+=l.x*.3,d+=l.z*.3);let f={x:u,y:0,z:d};if(Fa(f,c)){const M=u-s.x,b=d-s.z,y=Math.sqrt(M*M+b*b)||1;for(const w of[.5,-.5]){const P=Math.cos(w),S=Math.sin(w),T=M/y*P-b/y*S,N=M/y*S+b/y*P,F={x:s.x+T*y*.7,z:s.z+N*y*.7};if(!Fa(F,c)){f={x:F.x,y:0,z:F.z};break}}}const p=un(s,o),g=n.ai.skill||"regular",_=g==="elite"||g==="veteran"?120:80,h=r>(g==="elite"||g==="veteran"?.4:.6)&&n.combat.ammo.mine>0&&n.combat.cooldown.mine<=0&&p<_;return e.combat.hp/Math.max(1,e.combat.hpMax)<.2?n.ai._pressBoost=!0:n.ai._pressBoost=!1,{waypoint:f,shouldFire:!0,shouldDeployMine:h}}function CS(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=o.x-s.x,r=o.z-s.z,c=Math.sqrt(a*a+r*r),l=t.world.obstacles||[],u=n.ai.personality||{},d=c||1,f=-a/d,p=-r/d;let g=null;const _=Hp(s,o,l,80);if(_&&(g=_),!g){const h=[0,.5,-.5,1,-1];for(const v of h){const x=Math.cos(v),M=Math.sin(v),b=f*x-p*M,y=f*M+p*x,w=s.x+b*60,P=s.z+y*60;if(!Fa({x:w,z:P},l)){g={x:w,y:0,z:P};break}}}if(!g&&(u.caution||0)>.6){const m=Oa(s,o,l,80);if(m){const h=sc(s,o,m);h&&(g=h)}}return g||(g={x:s.x+f*60,y:0,z:s.z+p*60}),{waypoint:g,shouldFire:!0,shouldDeployMine:!1}}function PS(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=t.world.obstacles||[];if(!n.ai._disengage||!n.ai._disengage.coverPos){const l=Hp(s,o,a);n.ai._disengage={coverPos:l,losBreakTime:0}}const r=n.ai._disengage;if(!r.coverPos){const l=o.x-s.x,u=o.z-s.z,d=Math.sqrt(l*l+u*u)||1;return{waypoint:{x:s.x-l/d*100,y:0,z:s.z-u/d*100},shouldFire:!1,shouldDeployMine:!1}}return un(s,r.coverPos)<25&&(r.losBreakTime+=i,r.losBreakTime>1.5)?(n.ai._disengage=null,{waypoint:null,shouldFire:!1,shouldDeployMine:!1,disengageComplete:!0}):{waypoint:r.coverPos,shouldFire:!1,shouldDeployMine:!1}}function LS(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=t.world.obstacles||[];if(!n.ai._bait){const c=Oa(s,o,a,60);if(!c)return{waypoint:null,shouldFire:!0,shouldDeployMine:!1,disengageComplete:!0};const l=sc(s,o,c);n.ai._bait={phase:"retreat",timer:0,totalTimer:0,cover:c,hidePos:l||{x:s.x,y:0,z:s.z},mineDeployed:!1}}const r=n.ai._bait;if(r.timer+=i,r.totalTimer+=i,r.totalTimer>6)return n.ai._bait=null,{waypoint:null,shouldFire:!0,shouldDeployMine:!1,disengageComplete:!0};switch(r.phase){case"retreat":return un(s,r.hidePos)<20&&(r.phase="mine",r.timer=0),{waypoint:r.hidePos,shouldFire:!0,shouldDeployMine:!1};case"mine":{const c=o.x-s.x,l=o.z-s.z,u=Math.sqrt(c*c+l*l)||1,d={x:s.x+c/u*15,y:0,z:s.z+l/u*15};return r.phase="wait",r.timer=0,{waypoint:d,shouldFire:!1,shouldDeployMine:!0}}case"wait":return r.timer>.5+Math.random()*.5&&(r.phase="reengage",r.timer=0),{waypoint:r.hidePos,shouldFire:!1,shouldDeployMine:!1};case"reengage":return r.timer>3||un(s,o)<40?(n.ai._bait=null,{waypoint:{x:o.x,y:0,z:o.z},shouldFire:!0,shouldDeployMine:!1,disengageComplete:!0}):{waypoint:{x:o.x,y:0,z:o.z},shouldFire:!0,shouldDeployMine:!1}}return n.ai._bait=null,{waypoint:null,shouldFire:!0,shouldDeployMine:!1,disengageComplete:!0}}function Hp(n,e,t,i){const s=i||SS,o=un(n,e);let a=null,r=-1/0;for(const c of t){if(!c.aabb)continue;const l=bo(c),u=un(n,l);if(u>s)continue;const d=sc(n,e,c);if(!d||!Wp(d,e,c))continue;const f=un(d,e),g=(f>o?50:0)+f*.1-u*.2;g>r&&(r=g,a=d)}return a}function Vp(n,e,t){if(!e||e.targetRadius==null)return null;const i=e.phaseState;if(i!=="waiting"&&i!=="warning")return null;const s=t==="elite"?20:t==="veteran"?15:8;if(e.timer>s)return null;const o=n.x-e.targetCenter.x,a=n.z-e.targetCenter.z,r=Math.sqrt(o*o+a*a),c=e.targetRadius*.7;if(r<=c)return null;const l=r||1;return{x:e.targetCenter.x+o/l*c,y:0,z:e.targetCenter.z+a/l*c}}function DS(n,e,t,i){const s=n.transform.pos,o=e.transform.pos,a=o.x-s.x,r=o.z-s.z,c=Math.sqrt(a*a+r*r),l=n.ai.personality||{},u=e.upgrades&&e.upgrades.modifiers&&e.upgrades.modifiers.damageReduction||0;let d=50;e.combat.hp<30&&(d+=20),c<100&&(d+=10);const f=n.ai.skill||"regular",p=n.ai._lastWeaponFired||null;f==="elite"&&p==="sabot"&&c<120&&(d+=25);let g=-1/0;if(n.combat.ammo.sabot>0){if(g=40,c>150&&(g+=30),u>.1&&(g+=15),c<80&&(g-=20),g+=10*(l.caution||0),n.combat.ammo.sabot<=2){const m=qf(e,t,n);e.combat.hp>=40&&m<2&&(g=-1/0)}f==="elite"&&p==="heavy"&&c<160&&(g+=20)}let _=-1/0;if(n.combat.ammo.heavy>0){if(_=35,n.combat.ammo.heavy<=2){const h=qf(e,t,n);e.combat.hp>=40&&h<2&&(_=-1/0)}let m=0;for(const h of t){if(h.id===n.id||h.id===e.id||h.combat.hp<=0)continue;const v=h.transform.pos.x-o.x,x=h.transform.pos.z-o.z;Math.sqrt(v*v+x*x)<40&&m++}m>=2&&(_+=25),c>=80&&c<=180&&(_+=15),c<50&&(_-=25),c>200&&(_-=15),_+=10*(l.aggression||0)}return g>d&&g>_?"sabot":_>d&&_>g?"heavy":"he"}const Gf=30,IS=20,Wf=25,US=.5;function Gp(n,e,t){const i=n.ai.skill||"regular";if(!e||e.length===0)return null;if(n.ai._dodgeCooldown||(n.ai._dodgeCooldown=0),n.ai._dodgeCooldown-=t,n.ai._dodgeCooldown>0)return n.ai._dodgeTarget||null;const s=n.transform.pos,o=i==="elite"?.85:i==="veteran"?.6:.4;for(const a of e){if(!a||a.ownerId===n.id||a.hp!==void 0&&a.hp<=0)continue;const r=a.pos||a.transform&&a.transform.pos,c=a.vel||a.physics&&a.physics.vel;if(!r||!c)continue;const l=c.y*c.y+2*Gf*r.y;if(l<0)continue;const u=(c.y+Math.sqrt(l))/Gf;if(u<0||u>3)continue;const d=r.x+c.x*u,f=r.z+c.z*u,p=d-s.x,g=f-s.z;if(Math.sqrt(p*p+g*g)>IS)continue;n.ai._dodgeRolls||(n.ai._dodgeRolls=new Map);const m=a.id||a;if(n.ai._dodgeRolls.has(m)||n.ai._dodgeRolls.set(m,Math.random()),n.ai._dodgeRolls.get(m)>o)continue;const v=Math.sqrt(c.x*c.x+c.z*c.z);if(v<.1)continue;const x=-c.z/v,M=c.x/v,y=x*p+M*g>=0?-1:1,w={x:s.x+y*x*Wf,y:0,z:s.z+y*M*Wf};return n.ai._dodgeTarget=w,n.ai._dodgeCooldown=US,n.ai._dodgeRolls.size>20&&n.ai._dodgeRolls.clear(),w}return n.ai._dodgeTarget=null,null}function NS(n,e,t){const i=n.ai.skill;return n.combat.activeWeapon!=="he"?{charge:!1,duration:0}:i==="elite"&&t>=80&&t<=180?{charge:!0,duration:1+Math.random()*.5}:i==="veteran"&&t>=100&&t<=160&&Math.random()<.3?{charge:!0,duration:.8+Math.random()*.4}:{charge:!1,duration:0}}function un(n,e){const t=e.x-n.x,i=e.z-n.z;return Math.sqrt(t*t+i*i)}function bo(n){return{x:(n.aabb.min.x+n.aabb.max.x)/2,z:(n.aabb.min.z+n.aabb.max.z)/2}}function sc(n,e,t){const i=bo(t),s=(t.aabb.max.x-t.aabb.min.x)/2,o=(t.aabb.max.z-t.aabb.min.z)/2,a=Math.max(s,o),r=i.x-e.x,c=i.z-e.z,l=Math.sqrt(r*r+c*c);if(l<.001)return null;const u=a+12;return{x:i.x+r/l*u,y:0,z:i.z+c/l*u}}function zS(n,e,t){const i=bo(t),s=(t.aabb.max.x-t.aabb.min.x)/2,o=(t.aabb.max.z-t.aabb.min.z)/2,a=e.x-i.x,r=e.z-i.z,c=Math.sqrt(a*a+r*r);if(c<.001)return null;const l=r/c,u=-a/c,d={x:i.x+l*(s+8),y:0,z:i.z+u*(o+8)},f={x:i.x-l*(s+8),y:0,z:i.z-u*(o+8)},p=un(n,d),g=un(n,f);return p<g?d:f}function Wp(n,e,t){return t.aabb?OS(n.x,n.z,e.x,e.z,t.aabb):!1}function OS(n,e,t,i,s){const o=t-n,a=i-e;if(Math.sqrt(o*o+a*a)<.001)return!1;const c=o!==0?1/o:1e12,l=a!==0?1/a:1e12;let u=(s.min.x-n)*c,d=(s.max.x-n)*c;if(u>d){const m=u;u=d,d=m}let f=(s.min.z-e)*l,p=(s.max.z-e)*l;if(f>p){const m=f;f=p,p=m}const g=Math.max(u,f),_=Math.min(d,p);return g<_&&_>0&&g<1}function Oa(n,e,t,i){let s=null,o=1/0;for(const a of t){if(!a.aabb)continue;const r=bo(a),c=un(n,r);(c>i||c<o)&&c<=i&&(o=c,s=a)}return s}function FS(n,e,t,i){let s=null,o=1/0;for(const a of t){if(!a.aabb)continue;const r=bo(a),c=un(n,r);if(c>i)continue;const l=sc(n,e,a);l&&Wp(l,e,a)&&c<o&&(o=c,s={obstacle:a,hidePos:l,peekPos:zS(l,e,a)})}return s}function Fa(n,e,t=8){for(const i of e)if(i.aabb&&n.x>=i.aabb.min.x-t&&n.x<=i.aabb.max.x+t&&n.z>=i.aabb.min.z-t&&n.z<=i.aabb.max.z+t)return!0;return!1}function Xf(n,e,t,i){const s=bo(t),o=(t.aabb.max.x-t.aabb.min.x)/2,a=(t.aabb.max.z-t.aabb.min.z)/2,r=e.x-s.x,c=e.z-s.z,l=Math.sqrt(r*r+c*c);if(l<.001)return n;const u=c/l,d=-r/l;return{x:s.x+i*u*(o+8),y:0,z:s.z+i*d*(a+8)}}function qf(n,e,t){let i=0;const s=n.transform.pos;for(const o of e){if(o.id===t.id||o.id===n.id||o.combat.hp<=0)continue;const a=o.transform.pos.x-s.x,r=o.transform.pos.z-s.z;Math.sqrt(a*a+r*r)<40&&i++}return i}const ms=new Map;function Xp(n){ms.set(n,(ms.get(n)||0)+1)}function _u(n){const e=(ms.get(n)||1)-1;e<=0?ms.delete(n):ms.set(n,e)}function BS(n){return ms.get(n)||0}function kS(){ms.clear()}const vi={MAX_SPEED_FWD:60,MAX_SPEED_REV:35,ACCEL_FWD:120,ACCEL_REV:90,LINEAR_DAMPING:4,LATERAL_DAMPING:10,MAX_TURN_RATE:2.8,TURN_ACCEL:12,ANGULAR_DAMPING:7},HS=220,to=21,qp=12,Yf=30,VS=25,GS=40,WS=8,Yp=1.5,Ba=2,jp=4,XS=3,qS=8,YS={regular:"#ff8800",veteran:"#ff00ff",elite:"#ffdd00"},jf={regular:.55,veteran:.8,elite:1},jS={regular:.025,veteran:.01,elite:.004},$S={regular:.018,veteran:.007,elite:.003},$p={regular:.18,veteran:.12,elite:.06},KS=1.5,ZS=5,JS=5,En=["firepower","armor","mobility","systems"],QS=["Viper","Specter","Ironclad","Phantom","Havoc","Reaper","Sentinel","Rogue","Tempest","Warden","Apex","Ember","Stalker","Titan","Eclipse","Voltage","Raptor","Dagger","Ghost","Fury"];let Gl=new Set;function ew(){for(const n of QS)if(!Gl.has(n))return Gl.add(n),n;return"Tank-"+Math.floor(Math.random()*100)}function tw(){Gl=new Set}function nw(n,e,t,i,s=0,o=null){const a=kp(i),r=dp(),c={id:n,name:ew(),transform:{pos:{x:e.x,y:0,z:e.z},yaw:Math.random()*Math.PI*2},physics:{vel:{x:0,y:0,z:0},yawVel:0},turret:{yaw:0,pitch:0},combat:{hp:160,hpMax:160,weapon:"he",activeWeapon:"he",ammo:{he:null,sabot:0,heavy:0,mine:0},cooldown:{fire:0,mine:0},lastDamageFrom:null},upgrades:r,ai:{skill:i,personality:a,state:"PATROL",stateTime:0,target:null,lastSeenTargetPos:null,waypoint:null,path:[],pathIndex:0,engagement:null,powerupTargetId:null,_strafe:null,_peek:null,_disengage:null,_pendingMines:!1,_pathTimer:0,_targetRevalTimer:0,_targetRevalInterval:Ba+Math.random()*(jp-Ba),_boosting:!1,_countermineTimer:0,_upgradeTimer:0,_chargeTimer:0,_visibleTanksBuffer:[],_nearbyMinesBuffer:[]},render:{rootId:n,color:YS[i]||"#ff8800",bobPhase:Math.random()*Math.PI*2,hitFlash:0}};return iw(c,i,a),s>0&&sw(c,s,a),o!=null&&o.extraMines&&(c.combat.ammo.mine=3),c}function iw(n,e,t){if(e==="regular"){const s=En[Math.floor(Math.random()*En.length)];pt(n,s,"tier1"),n.combat.ammo.sabot=4,n.combat.ammo.heavy=2}if(e==="veteran"){const s=[...En].sort(()=>Math.random()-.5),o=s[0],a=s[1];pt(n,o,"tier1"),pt(n,o,"tier2"),pt(n,a,"tier1"),n.combat.ammo.sabot=6,n.combat.ammo.heavy=3,n.combat.ammo.mine=2}if(e==="elite"){const s=[...En].sort(()=>Math.random()-.5),o=s[0],a=s[1];pt(n,o,"tier1"),pt(n,o,"tier2"),pt(n,a,"tier1"),pt(n,a,"tier2"),pt(n,o,xu(o,t)),n.combat.ammo.sabot=8,n.combat.ammo.heavy=5,n.combat.ammo.mine=3}const i=n.upgrades.modifiers;i&&i.maxHpBonus>0&&(n.combat.hpMax=160+i.maxHpBonus,n.combat.hp=n.combat.hpMax),n.upgrades.visualDirty=!0}function sw(n,e,t){const i=u=>{var d;return((d=n.upgrades.tracks[u])==null?void 0:d.tier)||0},s=u=>{var d;return((d=n.upgrades.tracks[u])==null?void 0:d.branch)||null},o=u=>En.filter(d=>i(d)>=u),a=u=>En.filter(d=>i(d)<u),r=()=>En.filter(u=>i(u)>=2&&!s(u)),c=u=>xu(u,t);if(e>=1){const u=a(1);if(u.length>0){const d=u[Math.floor(Math.random()*u.length)];pt(n,d,"tier1")}}if(e>=2){const u=En.filter(d=>i(d)===1);if(u.length>0){const d=u[Math.floor(Math.random()*u.length)];pt(n,d,"tier2")}else{const d=a(2);if(d.length>0){const f=d[Math.floor(Math.random()*d.length)];pt(n,f,"tier1"),pt(n,f,"tier2")}}}if(e>=3){for(let d=0;d<8&&o(1).length<2;d++){const f=a(1);if(f.length===0)break;pt(n,f[Math.floor(Math.random()*f.length)],"tier1")}const u=En.filter(d=>i(d)===1);if(u.length>0){const d=u[Math.floor(Math.random()*u.length)];pt(n,d,"tier2")}}if(e>=4){for(let d=0;d<8&&o(2).length<2;d++){const f=En.filter(p=>i(p)===1);if(f.length>0)pt(n,f[0],"tier2");else{const p=a(1);if(p.length===0)break;const g=p[Math.floor(Math.random()*p.length)];pt(n,g,"tier1"),pt(n,g,"tier2")}}const u=r();if(u.length>0){const d=u[Math.floor(Math.random()*u.length)];pt(n,d,c(d))}}if(e>=5){for(let d=0;d<8&&o(2).length<3;d++){const f=En.filter(p=>i(p)===1);if(f.length>0)pt(n,f[0],"tier2");else{const p=a(1);if(p.length===0)break;const g=p[Math.floor(Math.random()*p.length)];pt(n,g,"tier1"),pt(n,g,"tier2")}}const u=r();for(let d=0;d<2&&d<u.length;d++)pt(n,u[d],c(u[d]))}const l=n.upgrades.modifiers;l&&l.maxHpBonus>0&&(n.combat.hpMax=160+l.maxHpBonus,n.combat.hp=n.combat.hpMax),n.upgrades.visualDirty=!0}function pt(n,e,t){const i=fp(e,t);n.upgrades.scrap=i,fu(n.upgrades,e,t),n.upgrades.scrap=0}function ow(n,e){const t=n.ai;if(t._upgradeTimer+=e,t._upgradeTimer<JS||(t._upgradeTimer=0,t.state==="ATTACK"||t.state==="CHASE"))return;const i=Nb(n.upgrades);if(i.length===0)return;const s=t.personality;let o;s.aggression>.6?o="firepower":s.caution>.6?o="armor":s.aggression>.5&&s.caution<.4?o="mobility":o="systems";const a=i.filter(c=>c.cost<=n.upgrades.scrap);if(a.length===0)return;let r=rw(a,o);if(r||(r=a.sort((c,l)=>c.cost-l.cost)[0]),r){let c=r.nodeType;(c==="branchA"||c==="branchB")&&(c=xu(r.trackId,s));const l=fu(n.upgrades,r.trackId,c);if(l&&l.success){n.upgrades.visualDirty=!0;const u=n.upgrades.modifiers;u.maxHpBonus>0&&(n.combat.hpMax=160+u.maxHpBonus)}}}function rw(n,e,t){const i=n.filter(s=>s.trackId===e);return i.length>0?(i.sort((s,o)=>s.cost-o.cost),i[0]):null}function xu(n,e){switch(n){case"firepower":return e.aggression>.6?"branchB":"branchA";case"armor":return e.caution>.6?"branchA":"branchB";case"mobility":return e.aggression>.5?"branchA":"branchB";case"systems":return e.caution>.5?"branchA":"branchB";default:return"branchA"}}function aw(n,e){for(const t of n.entities.enemies)t.combat.hp<=0||cw(t,n,e)}function cw(n,e,t){var d,f;const i=n.ai;i.stateTime+=t,n.combat.cooldown.fire=Math.max(0,n.combat.cooldown.fire-t),n.combat.cooldown.mine=Math.max(0,n.combat.cooldown.mine-t),i._countermineTimer=Math.max(0,i._countermineTimer-t),i._stuckPos||(i._stuckPos={x:n.transform.pos.x,z:n.transform.pos.z}),i._stuckTimer=(i._stuckTimer||0)+t,i._stuckTimer>KS&&(rn(n.transform.pos,i._stuckPos)<ZS&&i.state!=="ATTACK"&&(i.path=[],i._pathTimer=Yp+1,i.waypoint&&(i.waypoint.x+=(Math.random()-.5)*40,i.waypoint.z+=(Math.random()-.5)*40)),i._stuckPos={x:n.transform.pos.x,z:n.transform.pos.z},i._stuckTimer=0);const s=n.combat.activeWeapon;s!=="he"&&n.combat.ammo[s]!==null&&n.combat.ammo[s]<=0&&(n.combat.activeWeapon="he",n.combat.weapon="he");const o=n.upgrades?n.upgrades.modifiers:null,a=((f=(d=e.run)==null?void 0:d.mutatorOverrides)==null?void 0:f.hpRegenAll)||0,r=(o&&o.hpRegen?o.hpRegen:0)+a;r>0&&n.combat.hp>0&&n.combat.hp<n.combat.hpMax&&(n.combat.hp=Math.min(n.combat.hpMax,n.combat.hp+r*t)),n.upgrades&&ow(n,t);const c=MS(n,e,i._visibleTanksBuffer);i.target&&i.target.combat.hp<=0&&((i.state==="ATTACK"||i.state==="CHASE")&&_u(i.target.id),i.target=null,i.engagement=null,Mu(i));const l=i.skill==="veteran"||i.skill==="elite"?GS:VS,u=bS(n.transform.pos,e.entities.mines,l,i._nearbyMinesBuffer);switch(e.stormRing&&!xs(n.transform.pos,e.stormRing)&&i.state!=="FLEE_STORM"&&dt(i,"FLEE_STORM"),i._boosting=gw(n,e),i.state){case"PATROL":lw(n,e,t,c);break;case"INVESTIGATE":uw(n,e,t,c);break;case"CHASE":dw(n,e,t,c);break;case"ATTACK":fw(n,e,t,c);break;case"RETREAT":hw(n,e,t,c);break;case"SEEK_POWERUP":pw(n,e,t,c);break;case"FLEE_STORM":mw(n,e,t);break}u.length>0&&xw(n,u,e,t),El(n)}function lw(n,e,t,i,s){const o=n.ai;if(i.length>0){o.target=vu(n,i),o.lastSeenTargetPos={...o.target.transform.pos},o._lastSeenVelocity=o.target.physics?{x:o.target.physics.vel.x,z:o.target.physics.vel.z}:null,dt(o,"CHASE");return}if(e.stormRing){const a=Vp(n.transform.pos,e.stormRing,o.skill);if(a){o.waypoint=a,o.path=[],o.pathIndex=0,Vi(n,e,t);return}}if(n.combat.hp<n.combat.hpMax*.6&&mo(n,e,"health_pack")){dt(o,"SEEK_POWERUP");return}if(o.stateTime>2){const a=mo(n,e,null);if(a&&rn(n.transform.pos,a.pos)<120){dt(o,"SEEK_POWERUP");return}}(!o.waypoint||rn(n.transform.pos,o.waypoint)<30)&&(o.waypoint=Ew(n,e),o.path=[],o.pathIndex=0),Vi(n,e,t),(o.skill==="veteran"||o.skill==="elite")&&o.stateTime>3&&ww(n.transform.pos,e.world.obstacles,Jp(e))>.7&&Math.random()<.1*t&&(o.waypoint={x:n.transform.pos.x,y:0,z:n.transform.pos.z})}function uw(n,e,t,i){const s=n.ai;if(i.length>0){s.target=vu(n,i),s.lastSeenTargetPos={...s.target.transform.pos},s._lastSeenVelocity=s.target.physics?{x:s.target.physics.vel.x,z:s.target.physics.vel.z}:null,dt(s,"CHASE");return}if(!s.lastSeenTargetPos){dt(s,"PATROL");return}let o=s.lastSeenTargetPos;if(s._lastSeenVelocity){const a=s.lastSeenTargetPos.x+s._lastSeenVelocity.x*2,r=s.lastSeenTargetPos.z+s._lastSeenVelocity.z*2;o={x:Math.max(0,Math.min(ki,a)),y:0,z:Math.max(0,Math.min(Hi,r))}}s.waypoint=o,Vi(n,e,t),(rn(n.transform.pos,o)<40||s.stateTime>XS)&&dt(s,"PATROL")}function dw(n,e,t,i){const s=n.ai,o=s.target&&i.includes(s.target);if(!s.target||s.target.combat.hp<=0){dt(s,"PATROL");return}if(o){s.lastSeenTargetPos={...s.target.transform.pos},s._lastSeenVelocity=s.target.physics?{x:s.target.physics.vel.x,z:s.target.physics.vel.z}:null;const a=rn(n.transform.pos,s.target.transform.pos),r=vS(n.transform.pos,n.transform.yaw,s.target.transform.pos,e.world.obstacles);if(a<HS&&r){dt(s,"ATTACK"),s.engagement=Hl(n,s.target);return}if(!em(n.transform.pos,s.target.transform.pos,e.world.obstacles)){const c=Gp(n,e.entities.projectiles,t);c?po(n,c,t,e.world.obstacles):po(n,s.target.transform.pos,t,e.world.obstacles),nr(n,s.target.transform.pos,t);return}}else if(s.stateTime>3){dt(s,"INVESTIGATE");return}if(e.stormRing&&!xs(n.transform.pos,e.stormRing)){dt(s,"FLEE_STORM");return}s.waypoint=s.lastSeenTargetPos,Vi(n,e,t),nr(n,s.target.transform.pos,t)}function fw(n,e,t,i,s){var p,g;const o=n.ai,a=o.target;if(!a||a.combat.hp<=0){dt(o,"PATROL");return}if(o.engagement&&wS(o.engagement,n,a,i,t),o._targetRevalTimer+=t,o._targetRevalTimer>=o._targetRevalInterval){o._targetRevalTimer=0,o._targetRevalInterval=Ba+Math.random()*(jp-Ba);const _=_w(n,i,a);_&&_!==a&&(_u(a.id),Xp(_.id),o.target=_,o.engagement=Hl(n,_),Mu(o))}if(o.engagement&&ES(o.engagement,o.personality,n)==="retreat"){dt(o,"RETREAT");return}const r=TS(n,a,o.engagement||Hl(n,a),i,e.world.obstacles);r==="kite"||r==="disengage"||r==="press"&&o.personality.aggression>.6?o._boosting=!0:o._boosting=!1;let c;switch(r){case"strafe":c=Vl(n,a,e,t);break;case"peek":c=AS(n,a,e,t);break;case"press":c=RS(n,a,e);break;case"kite":c=CS(n,a,e);break;case"disengage":c=PS(n,a,e,t);break;case"bait":c=LS(n,a,e,t);break;default:c=Vl(n,a,e,t);break}const l=Gp(n,e.entities.projectiles,t);l?po(n,l,t,e.world.obstacles):c.waypoint?po(n,c.waypoint,t,e.world.obstacles):Na(n,0,0,Kp(n),t),nr(n,a.transform.pos,t);const u=$p[o.skill]||.18,d=(o._aimError||0)<u;if(c.shouldFire&&d&&n.combat.cooldown.fire<=0){let _=DS(n,a,i,e.world.obstacles);const m=(g=(p=e.run)==null?void 0:p.mutatorOverrides)==null?void 0:g.weaponRestriction;if(m==="no_sabot"&&_==="sabot"&&(_="he"),m==="no_heavy"&&_==="heavy"&&(_="he"),n.combat.activeWeapon=_,n.combat.weapon=_,_==="he"){const h=NS(n,a,rn(n.transform.pos,a.transform.pos));h&&h.charge?(o._chargeTimer||(o._chargeTimer=0),o._chargeTimer+=t,o._chargeTimer>=h.duration&&(la(n,a,e,o._chargeTimer),o._chargeTimer=0)):(o._chargeTimer=0,la(n,a,e))}else o._chargeTimer=0,la(n,a,e)}else c.shouldFire||(o._chargeTimer=0);if(c.shouldDeployMine&&n.combat.ammo.mine>0&&n.combat.cooldown.mine<=0&&Zp(n,e),c.disengageComplete){n.combat.hp<n.combat.hpMax*.6&&mo(n,e,"health_pack")?dt(o,"SEEK_POWERUP"):dt(o,"PATROL");return}!i.includes(a)&&o.stateTime>3&&(o.lastSeenTargetPos={...a.transform.pos},o._lastSeenVelocity=a.physics?{x:a.physics.vel.x,z:a.physics.vel.z}:null,dt(o,"INVESTIGATE"))}function hw(n,e,t,i){const s=n.ai;if(!s.waypoint&&s.target){const o=Mw(n,s.target.transform.pos,e.world.obstacles);if(o)s.waypoint=o;else{const a=s.target.transform.pos.x-n.transform.pos.x,r=s.target.transform.pos.z-n.transform.pos.z,c=Math.sqrt(a*a+r*r)||1;let l=-a/c,u=-r/c,d=1/0,f=0,p=0;for(const m of e.entities.enemies){if(m===n||m.combat.hp<=0||m.combat.hp/m.combat.hpMax<.6)continue;const h=m.transform.pos.x-n.transform.pos.x,v=m.transform.pos.z-n.transform.pos.z,x=Math.sqrt(h*h+v*v);x<200&&x<d&&(d=x,f=h/x,p=v/x)}if(d<200){l=l*.7+f*.3,u=u*.7+p*.3;const m=Math.sqrt(l*l+u*u)||1;l/=m,u/=m}const g=e.world.obstacles;let _=!1;for(const m of[0,.5,-.5,1,-1]){const h=Math.cos(m),v=Math.sin(m),x=l*h-u*v,M=l*v+u*h,b={x:n.transform.pos.x+x*80,z:n.transform.pos.z+M*80};if(!Aw(b,g)){s.waypoint={x:b.x,y:0,z:b.z},_=!0;break}}_||(s.waypoint={x:n.transform.pos.x+l*80,y:0,z:n.transform.pos.z+u*80})}}if(Vi(n,e,t),s.target&&i.includes(s.target)&&n.combat.cooldown.fire<=0){nr(n,s.target.transform.pos,t);const o=$p[s.skill]||.18;(s._aimError||0)<o*1.5&&la(n,s.target,e)}if(n.combat.ammo.mine>0&&n.combat.cooldown.mine<=0&&(s._retreatMineTimer||(s._retreatMineTimer=0),s._retreatMineTimer+=t,s._retreatMineTimer>=1.5&&(Math.sqrt(n.physics.vel.x**2+n.physics.vel.z**2)>10&&Zp(n,e),s._retreatMineTimer=0)),n.combat.hp<n.combat.hpMax*.3&&mo(n,e,"health_pack")){dt(s,"SEEK_POWERUP");return}if(s.waypoint&&rn(n.transform.pos,s.waypoint)<25||s.stateTime>4){if(n.combat.hp>n.combat.hpMax*.5&&s.target&&s.target.combat.hp>0&&rn(n.transform.pos,s.target.transform.pos)<200){dt(s,"CHASE");return}n.combat.hp<n.combat.hpMax*.5&&mo(n,e,"health_pack")?dt(s,"SEEK_POWERUP"):dt(s,"PATROL")}}function pw(n,e,t,i){const s=n.ai,o=n.combat.hp<n.combat.hpMax*.6?"health_pack":null,a=mo(n,e,o);if(!a){dt(s,"PATROL");return}if(e.stormRing){const r=Vp(n.transform.pos,e.stormRing,s.skill);if(r){s.powerupTargetId=null,s.waypoint=r,s.path=[],s.pathIndex=0,Vi(n,e,t);return}}if(s.powerupTargetId=a.id,s.waypoint={x:a.pos.x,y:0,z:a.pos.z},Vi(n,e,t),!a.active||s.stateTime>qS){s.powerupTargetId=null,dt(s,"PATROL");return}i.length>0&&n.combat.hp>n.combat.hpMax*.4&&(s.target=vu(n,i),dt(s,"CHASE"))}function mw(n,e,t,i){const s=n.ai,o=e.stormRing;if(!o||xs(n.transform.pos,o)){dt(s,"PATROL");return}const a=n.transform.pos,r=o.center.x-a.x,c=o.center.z-a.z,l=Math.sqrt(r*r+c*c),u=o.radius*.8;let d,f;if(l<=u){dt(s,"PATROL");return}if(l>.1){const p=l-u,g=r/l,_=c/l;d=a.x+g*p,f=a.z+_*p}else d=o.center.x,f=o.center.z;s.waypoint={x:d,y:0,z:f},Vi(n,e,t)}function Vi(n,e,t){const i=n.ai;if(!i.waypoint)return;if(isNaN(i.waypoint.x)||isNaN(i.waypoint.z)){i.waypoint=null,i.path=[];return}const s=e.world.obstacles;if(i._pathTimer+=t,i.path.length===0||i._pathTimer>Yp){i._pathTimer=0;const a=Uf(n.transform.pos.x,n.transform.pos.z),r=Uf(i.waypoint.x,i.waypoint.z);i.path=mS(a,r,e.world.grid),i.pathIndex=0}let o=i.waypoint;if(i.path.length>0&&i.pathIndex<i.path.length){const a=Math.min(i.pathIndex+5,i.path.length-1);let r=i.pathIndex;for(let l=a;l>i.pathIndex;l--){const u=Vn(i.path[l].c,i.path[l].r);if(!em(n.transform.pos,u,s)){r=l;break}}const c=i.path[r];o=Vn(c.c,c.r),rn(n.transform.pos,o)<Ht*.7&&(i.pathIndex=r+1)}po(n,o,t,s)}function gw(n,e){const t=n.ai;t.skill;const i=t.state;if(i==="FLEE_STORM")return!0;if(i==="RETREAT"){if(n.combat.hp/n.combat.hpMax<.5)return!0;if(t.target){const o=t.target.transform.pos,a=n.transform.pos;if((o.x-a.x)**2+(o.z-a.z)**2<100*100)return!0}return t.personality.caution>.6?!0:!(t.personality.caution<.3)}if(i==="PATROL"){if(t.waypoint){const s=n.transform.pos,o=t.waypoint.x-s.x,a=t.waypoint.z-s.z,r=Math.atan2(o,a),c=no(r-n.transform.yaw),l=Math.sqrt(n.physics.vel.x**2+n.physics.vel.z**2);if(Math.abs(c)<.3&&l>30){let u=!1;const d=e.entities.enemies;for(let f=0;f<d.length;f++){const p=d[f];if(p===n||p.combat.hp<=0)continue;if((p.transform.pos.x-s.x)**2+(p.transform.pos.z-s.z)**2<150*150){u=!0;break}}if(e.entities.player&&e.entities.player.combat.hp>0){const f=e.entities.player.transform.pos;(f.x-s.x)**2+(f.z-s.z)**2<150*150&&(u=!0)}if(!u)return!0}}return!1}if(i==="INVESTIGATE")return!0;if(i==="CHASE"){if(t.target){const s=t.target.transform.pos,o=n.transform.pos;if((s.x-o.x)**2+(s.z-o.z)**2>80*80)return!0}return!1}return i==="SEEK_POWERUP"?n.combat.hp/n.combat.hpMax<.5:!1}function Kp(n){const e=n.upgrades?n.upgrades.modifiers:null,t=n.ai&&n.ai._boosting,i=2,s=e&&e.boostSpeedMultiplier?e.boostSpeedMultiplier:1,o=t?i*s:1,a=(e?e.speedMultiplier:1)*o,r=e?e.turnRateMultiplier:1;return a===1&&r===1?vi:{...vi,MAX_SPEED_FWD:vi.MAX_SPEED_FWD*a,MAX_SPEED_REV:vi.MAX_SPEED_REV*a,ACCEL_FWD:vi.ACCEL_FWD*a,ACCEL_REV:vi.ACCEL_REV*a,MAX_TURN_RATE:vi.MAX_TURN_RATE*r,TURN_ACCEL:vi.TURN_ACCEL*r}}function po(n,e,t,i){const s=n.transform.pos,o=e.x-s.x,a=e.z-s.z,r=Math.sqrt(o*o+a*a),c=Kp(n);if(r<5){Na(n,0,0,c,t);return}let l=Math.atan2(o,a);if(i){const g=Tw(n,i);g&&(l=Rw(l,Math.atan2(g.x,g.z),g.weight))}const u=no(l-n.transform.yaw),d=Math.max(-1,Math.min(1,u*3)),f=Math.abs(u);let p;f<.4?p=1:f<Math.PI*.5?p=1-(f-.4)/(Math.PI*.5-.4)*.7:f<Math.PI*.75?p=0:p=-.3,Na(n,p,d,c,t)}function nr(n,e,t){var F;const i=n.ai,s=n.transform.pos,o=Hn[n.combat.activeWeapon],a=n.upgrades&&n.upgrades.modifiers?n.upgrades.modifiers.projectileVelMultiplier:1,r=o.muzzleV*a;let c=e;if(i.target&&jf[i.skill]>0){const $=jf[i.skill],D=(F=i.target.physics)==null?void 0:F.vel;if(D&&(D.x!==0||D.z!==0)){let B=e.x,X=e.z;for(let k=0;k<2;k++){const z=B-s.x,j=X-s.z,K=Math.sqrt(z*z+j*j),te=Yf*K/(r*r),ee=te<=1?.5*Math.asin(te):.785,Y=Math.cos(ee),Z=Y>.01?K/(r*Y):K/r;B=e.x+D.x*Z*$,X=e.z+D.z*Z*$}c={x:B,y:e.y||0,z:X}}}const l=c.x-s.x,u=c.z-s.z,d=Math.sqrt(l*l+u*u),f=Math.atan2(l,u);let p=no(f-n.transform.yaw);const g=Math.sqrt(n.physics.vel.x**2+n.physics.vel.z**2),_=jS[i.skill]||.05,m=($S[i.skill]||.03)*Math.min(1,g/60),h=_+m,v=typeof n.id=="string"?(n.id.charCodeAt(n.id.length-1)||0)*7.3:(n.id||0)*7.3,x=performance.now()*.001+v,M=Math.sin(x*1.7)*.6+Math.sin(x*3.1)*.4;p+=M*h;const b=n.upgrades&&n.upgrades.modifiers?n.upgrades.modifiers.turretSpeedMultiplier:1,y=(i.skill==="elite"?6:i.skill==="veteran"?5:3.5)*b,w=no(p-n.turret.yaw);n.turret.yaw+=w*Math.min(1,y*t);const P=Yf*d/(r*r),S=P<=1?.5*Math.asin(P):.785,T=Math.sin(x*2.3)*h*.4;n.turret.pitch=Math.max(-.087,Math.min(.785,S+T));const N=n.transform.yaw+n.turret.yaw;i._aimError=Math.abs(no(f-N))}function la(n,e,t,i){if(n.combat.cooldown.fire>0)return;const s=n.combat.activeWeapon,o=Hn[s];if(!o.infinite){if(n.combat.ammo[s]<=0)return;n.combat.ammo[s]--}const a=n.transform.yaw+n.turret.yaw,r=n.turret.pitch,c=Math.cos(r),l=Math.sin(a)*c,u=Math.sin(r),d=Math.cos(a)*c,f={x:n.transform.pos.x+l*to,y:qp+u*to,z:n.transform.pos.z+d*to},p=n.upgrades?n.upgrades.modifiers:null,g=p?p.projectileVelMultiplier:1,_=o.muzzleV*g,m={x:l*_,y:u*_,z:d*_},h={ownerId:n.id,weapon:s,pos:f,vel:m};i&&i>0&&s==="he"&&(h.chargeRatio=Math.min(1,i/2)),t._pendingProjectiles.push(h);const v=p?p.fireRateMultiplier:1;n.combat.cooldown.fire=o.cooldown/v,n.combat.cooldown.fire*=.85+Math.random()*.3}function Zp(n,e){const t=n.transform.pos.x-Math.sin(n.transform.yaw)*15,i=n.transform.pos.z-Math.cos(n.transform.yaw)*15;e._pendingMines.push({ownerId:n.id,pos:{x:t,y:0,z:i}}),n.combat.ammo.mine--;const s=n.upgrades&&n.upgrades.modifiers?n.upgrades.modifiers.mineCooldownMultiplier:1;n.combat.cooldown.mine=.8*s}function Wl(n){if(!n.upgrades||!n.upgrades.tracks)return 0;let e=0;for(const t of En){const i=n.upgrades.tracks[t];i&&(e+=i.tier+(i.branch?1:0))}return e}function vu(n,e){if(e.length===0)return null;if(e.length===1)return e[0];let t=null,i=-1/0;for(const s of e){if(s.combat.hp<=0)continue;const o=rn(n.transform.pos,s.transform.pos),a=s.combat.hp/s.combat.hpMax;let r=0;n.combat.lastDamageFrom===s.id&&(r+=80),a<.3&&(r+=30),r+=(1-o/tr)*20,r+=(1-a)*(n.ai.personality.opportunism||.5)*15,s.ai||(r+=12);const c=Wl(s);n.ai.skill==="elite"?r+=c*5:c>0&&(r*=1/(1+c*.1));const l=BS(s.id);a<.5?r+=l*10:r-=l*15,r>i&&(i=r,t=s)}return t||e[0]}function _w(n,e,t){if(e.length<=1)return t;const i=n.ai.personality.opportunism||.5,s=rn(n.transform.pos,t.transform.pos),o=Wl(t),a=1/Math.max(1,t.combat.hp)*(1/Math.max(1,s))*i*(1/(1+o*.1));if(t.combat.hp<t.combat.hpMax*.2)return t;for(const r of e){if(r===t||r.combat.hp<=0)continue;const c=rn(n.transform.pos,r.transform.pos),l=Wl(r);if(1/Math.max(1,r.combat.hp)*(1/Math.max(1,c))*i*(1/(1+l*.1))>a*2)return r}return t}function xw(n,e,t,i){let s=0,o=0;for(const a of e){const r=n.transform.pos.x-a.pos.x,c=n.transform.pos.z-a.pos.z,l=Math.sqrt(r*r+c*c)||1;s+=r/l*2,o+=c/l*2}if(s!==0||o!==0){const a={x:n.transform.pos.x+s*30,z:n.transform.pos.z+o*30};po(n,a,i*.5)}if((n.ai.skill==="veteran"||n.ai.skill==="elite")&&n.ai._countermineTimer<=0){for(const a of e)if(rn(n.transform.pos,a.pos)>20&&n.combat.cooldown.fire<=0){nr(n,a.pos,i),vw(n,a.pos,t),n.ai._countermineTimer=WS;break}}}function vw(n,e,t){if(n.combat.cooldown.fire>0)return;const i=Hn.he,s=n.transform.yaw+n.turret.yaw,o=n.turret.pitch,a=Math.cos(o),r=Math.sin(s)*a,c=Math.sin(o),l=Math.cos(s)*a,u={x:n.transform.pos.x+r*to,y:qp+c*to,z:n.transform.pos.z+l*to};t._pendingProjectiles.push({ownerId:n.id,weapon:"he",pos:u,vel:{x:r*i.muzzleV,y:c*i.muzzleV,z:l*i.muzzleV}}),n.combat.cooldown.fire=i.cooldown}function Mw(n,e,t){let i=null,s=1/0;const o=n.transform.pos;for(const a of t){const r=a.aabb,c=(r.min.x+r.max.x)/2,l=(r.min.z+r.max.z)/2,u=c-e.x,d=l-e.z,f=Math.sqrt(u*u+d*d);if(f<1)continue;const p=(r.max.x-r.min.x)/2,g=(r.max.z-r.min.z)/2,_=Math.max(p,g)+Ht*.6,m={x:c+u/f*_,y:0,z:l+d/f*_};if(m.x<0||m.x>ki||m.z<0||m.z>Hi||!yw(e,m,r))continue;const h=Math.sqrt((m.x-o.x)**2+(m.z-o.z)**2);h<s&&(s=h,i=m)}return i}function yw(n,e,t){const i=e.x-n.x,s=e.z-n.z;if(Math.abs(i)<.001&&Math.abs(s)<.001)return!1;const o=i!==0?1/i:1e12,a=s!==0?1/s:1e12;let r=(t.min.x-n.x)*o,c=(t.max.x-n.x)*o;if(r>c){const p=r;r=c,c=p}let l=(t.min.z-n.z)*a,u=(t.max.z-n.z)*a;if(l>u){const p=l;l=u,u=p}const d=Math.max(r,l),f=Math.min(c,u);return d<f&&f>0&&d<1}const bw=ki/2,Sw=Hi/2;function ww(n,e,t){let s=0;for(const d of e){const f=d.aabb,p=(f.min.x+f.max.x)/2,g=(f.min.z+f.max.z)/2,_=p-n.x,m=g-n.z;Math.sqrt(_*_+m*m)<=40&&s++}const o=s===0?0:s<=3?.8+(s-1)*.1:Math.max(.2,1-(s-3)*.15),a=Math.sqrt((n.x-bw)**2+(n.z-Sw)**2),r=Math.max(0,1-a/500),c=100,l=(n.x<c?(c-n.x)/c:0)+(n.z<c?(c-n.z)/c:0)+(n.x>ki-c?(n.x-(ki-c))/c:0)+(n.z>Hi-c?(n.z-(Hi-c))/c:0),u=Math.max(0,1-l);return o*.4+r*.35+u*.25}function dt(n,e){const t=n.state,i=t==="ATTACK"||t==="CHASE",s=e==="ATTACK"||e==="CHASE";i&&n.target&&_u(n.target.id),s&&n.target&&Xp(n.target.id),n.state=e,n.stateTime=0,n.waypoint=null,n.path=[],n.pathIndex=0,n._pathTimer=0,Mu(n)}function Mu(n){n._strafe=null,n._peek=null,n._disengage=null,n._pendingMines=!1}function rn(n,e){const t=e.x-n.x,i=e.z-n.z;return Math.sqrt(t*t+i*i)}function no(n){return Math.atan2(Math.sin(n),Math.cos(n))}function Ew(n,e){const t=e.world.grid,i=e.stormRing,o=Jp(e).length<5;for(let a=0;a<30;a++){let r,c;if(o&&i&&Math.random()<.7){const u=i.radius*.5,d=Math.random()*Math.PI*2,f=Math.random()*u,p=i.center.x+Math.cos(d)*f,g=i.center.z+Math.sin(d)*f;r=Math.max(0,Math.min(tt-1,Math.floor(p/Ht))),c=Math.max(0,Math.min(ut-1,Math.floor(g/Ht)))}else r=Math.floor(Math.random()*tt),c=Math.floor(Math.random()*ut);if(t.blocked[c][r])continue;const l=Vn(r,c);if(!(i&&a<20&&!xs(l,i))&&!(rn(n.transform.pos,l)<60))return l}return Vn(Math.floor(tt/2),Math.floor(ut/2))}function mo(n,e,t){if(!e.world||!e.world.powerups)return null;let i=null,s=1/0;for(const o of e.world.powerups){if(!o.active||t&&o.type!==t)continue;const a=rn(n.transform.pos,o.pos);a<s&&(s=a,i=o)}return i}function Jp(n){const e=[];n.entities.player&&n.entities.player.combat.hp>0&&e.push(n.entities.player);for(const t of n.entities.enemies)t.combat.hp>0&&e.push(t);return e}function Tw(n,e){if(!e||e.length===0)return null;const t=n.transform.pos,i=n.transform.yaw,s=n.physics.vel,o=Math.sqrt(s.x*s.x+s.z*s.z);if(o<3)return null;const a=22+o*.35,r=[0,-.44,.44,-.87,.87];let c=0,l=0,u=0;for(const f of r){const p=i+f,g=t.x+Math.sin(p)*a,_=t.z+Math.cos(p)*a;let m=1,h=null;for(const v of e){if(!v.aabb)continue;const x=(v.aabb.min.x+v.aabb.max.x)*.5,M=(v.aabb.min.z+v.aabb.max.z)*.5;if((x-t.x)**2+(M-t.z)**2>(a+40)*(a+40))continue;const y=Qp(t.x,t.z,g,_,v.aabb);y!==null&&y<m&&(m=y,h=v)}if(h){const v=1-m;v>u&&(u=v);const x=(h.aabb.min.x+h.aabb.max.x)*.5,M=(h.aabb.min.z+h.aabb.max.z)*.5,b=t.x-x,y=t.z-M,w=Math.sqrt(b*b+y*y)||1;c+=b/w*v,l+=y/w*v}}if(u<.05)return null;const d=Math.sqrt(c*c+l*l);return d<.01?null:{x:c/d,z:l/d,weight:Math.min(.85,u*1.2)}}function Qp(n,e,t,i,s){const o=t-n,a=i-e,r=o!==0?1/o:1e12,c=a!==0?1/a:1e12;let l=(s.min.x-n)*r,u=(s.max.x-n)*r;if(l>u){const _=l;l=u,u=_}let d=(s.min.z-e)*c,f=(s.max.z-e)*c;if(d>f){const _=d;d=f,f=_}const p=Math.max(l,d),g=Math.min(u,f);return p<g&&g>0&&p<1?Math.max(0,p):null}function em(n,e,t){if(!t)return!1;for(const i of t)if(i.aabb&&Qp(n.x,n.z,e.x,e.z,i.aabb)!==null)return!0;return!1}function Aw(n,e,t){if(!e)return!1;t=t||6;for(const i of e)if(i.aabb&&n.x>=i.aabb.min.x-t&&n.x<=i.aabb.max.x+t&&n.z>=i.aabb.min.z-t&&n.z<=i.aabb.max.z+t)return!0;return!1}function Rw(n,e,t){const i=no(e-n);return n+i*t}function Cw(n){n.entities.projectiles&&(n.entities.projectiles=n.entities.projectiles.filter(e=>e.alive)),n.entities.effects&&(n.entities.effects=n.entities.effects.filter(e=>e.alive))}function Pw(n){return n.entities.enemies?n.entities.enemies.filter(e=>e.combat.hp>0).length:0}function Lw(n){return!n.entities.player||n.entities.player.combat.hp<=0}const as=7;function $f(n,e,t){const i=Math.max(t.min.x,Math.min(n.x,t.max.x)),s=Math.max(t.min.z,Math.min(n.z,t.max.z)),o=n.x-i,a=n.z-s,r=o*o+a*a;if(r>=e*e)return null;const c=Math.sqrt(r);if(c<.001){const u=n.x-t.min.x,d=t.max.x-n.x,f=n.z-t.min.z,p=t.max.z-n.z,g=Math.min(u,d,f,p);return g===u?{x:-(u+e),z:0}:g===d?{x:d+e,z:0}:g===f?{x:0,z:-(f+e)}:{x:0,z:p+e}}const l=e-c;return{x:o/c*l,z:a/c*l}}function Dw(n,e,t){const i=n.x-t.cx,s=n.z-t.cz,o=i*i+s*s,a=e+t.radius;if(o>=a*a)return null;const r=Math.sqrt(o);if(r<.001)return{x:a,z:0};const c=a-r;return{x:i/r*c,z:s/r*c}}function Kf(n,e){if(!e||e.length===0)return;const t=n.transform.pos;for(const i of e){const s=(i.aabb.min.x+i.aabb.max.x)*.5,o=(i.aabb.min.z+i.aabb.max.z)*.5,a=(i.aabb.max.x-i.aabb.min.x)*.5+as,r=(i.aabb.max.z-i.aabb.min.z)*.5+as;if(Math.abs(t.x-s)>a||Math.abs(t.z-o)>r)continue;let c=null;if(i.hitShapes&&i.hitShapes.length>0){let l=null,u=0;for(const d of i.hitShapes){let f;if(d.type==="cylinder"?f=Dw(t,as,d):f=$f(t,as,d),f){const p=f.x*f.x+f.z*f.z;p>u&&(u=p,l=f)}}c=l}else c=$f(t,as,i.aabb);c&&(t.x+=c.x,t.z+=c.z,c.x!==0&&(n.physics.vel.x=0),c.z!==0&&(n.physics.vel.z=0))}}function Zf(n,e,t){const i=n.transform.pos,s=n.physics.vel,o=as;i.x-o<0&&(i.x=o,s.x=Math.max(s.x,0)),i.x+o>e&&(i.x=e-o,s.x=Math.min(s.x,0)),i.z-o<0&&(i.z=o,s.z=Math.max(s.z,0)),i.z+o>t&&(i.z=t-o,s.z=Math.min(s.z,0))}function Jf(n,e){if(!n||!e)return;const t=n.transform.pos,i=20*20;for(const s of e){if(!s.active)continue;const o=t.x-s.pos.x,a=t.z-s.pos.z;if(o*o+a*a<=i){const c=n.combat.ammo;s.type==="sabot_ammo"?c&&(c.sabot=(c.sabot||0)+s.amount):s.type==="heavy_ammo"?c&&(c.heavy=(c.heavy||0)+s.amount):s.type==="mine_pack"?c&&(c.mine=(c.mine||0)+s.amount):s.type==="health_pack"?n.combat.hp=Math.min(n.combat.hp+s.amount,n.combat.hpMax):s.type==="sabot_loot"?c&&(c.sabot=(c.sabot||0)+s.amount):s.type==="heavy_loot"?c&&(c.heavy=(c.heavy||0)+s.amount):s.type==="mine_loot"?c&&(c.mine=(c.mine||0)+s.amount):s.type==="scrap_loot"&&n.upgrades&&(n.upgrades.scrap+=s.amount),s.active=!1}}}function Iw(n){if(!n||n.length<2)return;const e=as*2,t=e*e;for(let i=0;i<n.length;i++)for(let s=i+1;s<n.length;s++){const o=n[i],a=n[s],r=o.transform.pos.x-a.transform.pos.x,c=o.transform.pos.z-a.transform.pos.z,l=r*r+c*c;if(l>=t)continue;const u=Math.sqrt(l);let d,f;u<.001?(d=1,f=0):(d=r/u,f=c/u);const g=(e-u)*.5;o.transform.pos.x+=d*g,o.transform.pos.z+=f*g,a.transform.pos.x-=d*g,a.transform.pos.z-=f*g;const _=o.physics.vel.x*d+o.physics.vel.z*f,m=a.physics.vel.x*d+a.physics.vel.z*f,h=(_+m)*.5;o.physics.vel.x+=(h-_)*d,o.physics.vel.z+=(h-_)*f,a.physics.vel.x+=(h-m)*d,a.physics.vel.z+=(h-m)*f}}function Uw(n,e){const t=n.world?n.world.obstacles:null,i=n.config.MAP_W,s=n.config.MAP_H,o=n.entities.player;o&&o.combat.hp>0&&(Kf(o,t),Zf(o,i,s));const a=n.entities.enemies;if(a)for(const c of a)c.combat.hp<=0||(Kf(c,t),Zf(c,i,s));const r=[];if(o&&o.combat.hp>0&&r.push(o),a)for(const c of a)c.combat.hp>0&&r.push(c);if(Iw(r),n.world&&n.world.powerups&&(o&&o.combat.hp>0&&Jf(o,n.world.powerups),a))for(const c of a)c.combat.hp<=0||Jf(c,n.world.powerups)}const tm=1920,nm=1440,$n=40,ka=tm/$n,im=nm/$n,Qf=16,sm="rgba(4, 4, 16, 0.75)",Zc=120,Nw="rgba(4, 4, 16, 0.70)",zw=280,ua={he:"#00ffff",sabot:"#ff8800",heavy:"#ff00ff"};let oi=null,Xl=null,Rt=280,dn=1,Mn=1,Ha=!1,oc=new Set,vs=0,eh=!1;function Ow(n){Rt=280,oc=new Set,Ha=!1,vs=0,oi=document.createElement("canvas"),oi.width=Rt,oi.height=Rt,oi.style.cssText=`
    position: fixed;
    top: ${Qf}px;
    right: ${280+Qf}px;
    width: ${Rt}px;
    height: ${Rt}px;
    border: 2px solid ${ua.he};
    background: ${sm};
    pointer-events: none;
    image-rendering: pixelated;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.15);
  `;const e=document.getElementById("ui");e&&e.appendChild(oi),Xl=oi.getContext("2d"),dn=Rt/tm,Mn=Rt/nm,eh||(window.addEventListener("keydown",Fw),eh=!0)}function Fw(n){n.code==="KeyM"&&Bw()}function Bw(){Ha=!Ha}function kw(){oc=new Set}function Hw(n,e){if(!Xl)return;vs+=e;const t=Xl,i=n.world,s=n.entities,o=s==null?void 0:s.player;o&&Vw(o.transform.pos),Ww(o);const a=Ha&&o?-o.transform.yaw:0;t.clearRect(0,0,Rt,Rt),t.fillStyle=sm,t.fillRect(0,0,Rt,Rt),t.save(),a!==0&&(t.translate(Rt/2,Rt/2),t.rotate(a),t.translate(-Rt/2,-Rt/2)),qw(t,i),Gw(t),Xw(t,n.stormRing),Yw(t,i),$w(t,s),Kw(t,s),Zw(t,s),Jw(t,s),Qw(t,o),t.restore(),t.strokeStyle=om(o),t.lineWidth=2,t.strokeRect(1,1,Rt-2,Rt-2)}function Vw(n){const e=Math.ceil(Zc/$n),t=Math.floor(n.x/$n),i=Math.floor(n.z/$n);for(let s=-e;s<=e;s++)for(let o=-e;o<=e;o++){const a=i+s,r=t+o;if(a<0||a>=im||r<0||r>=ka)continue;const c=(r+.5)*$n,l=(a+.5)*$n,u=c-n.x,d=l-n.z;u*u+d*d<=Zc*Zc&&oc.add(a*ka+r)}}function Gw(n){n.fillStyle=Nw;const e=$n*dn,t=$n*Mn;for(let i=0;i<im;i++)for(let s=0;s<ka;s++)oc.has(i*ka+s)||n.fillRect(s*e,i*t,e,t)}function om(n){if(!n||!n.combat)return ua.he;const e=n.combat.activeWeapon||"he";return ua[e]||ua.he}function Ww(n){if(!oi)return;const e=om(n);oi.style.borderColor=e,oi.style.boxShadow=`0 0 12px ${e}44`}function Xw(n,e){if(!e||e.radius==null)return;const t=e.center.x*dn,i=e.center.z*Mn,s=(dn+Mn)*.5,o=e.radius*s;n.save(),n.beginPath(),n.rect(0,0,Rt,Rt),n.arc(t,i,Math.max(o,0),0,Math.PI*2,!0),n.fillStyle="rgba(160, 15, 0, 0.22)",n.fill("evenodd"),n.restore();const a=.5+.5*Math.sin(vs*3.5),r=e.warningActive||!1;n.save(),n.globalAlpha=.18+a*.12,n.strokeStyle=r?"#ff4400":"#00aaff",n.lineWidth=4,n.beginPath(),n.arc(t,i,o+2,0,Math.PI*2),n.stroke(),n.globalAlpha=1,n.strokeStyle=r?"#ff6633":"#00aaff",n.lineWidth=1.5,n.globalAlpha=.7+a*.3,n.beginPath(),n.arc(t,i,o,0,Math.PI*2),n.stroke(),n.globalAlpha=1;const c=16,l=.12,u=vs*.8;n.strokeStyle="#ffffff",n.lineWidth=1,n.globalAlpha=.25+a*.2;for(let d=0;d<c;d++){const f=d/c*Math.PI*2+u;n.beginPath(),n.arc(t,i,o,f,f+l),n.stroke()}n.globalAlpha=1,n.restore()}function qw(n,e){var i;if(!e||!e.obstacles)return;const t=((i=e.grid)==null?void 0:i.cell)||$n;for(const s of e.obstacles){if(s.destructible&&s.hp>0)n.fillStyle="rgba(80, 60, 30, 0.6)";else{if(s.destructible&&s.hp<=0)continue;n.fillStyle="rgba(40, 40, 80, 0.6)"}const o=s.cell.c*t*dn,a=s.cell.r*t*Mn,r=t*dn,c=t*Mn;n.fillRect(o,a,r,c)}}function Yw(n,e){if(!(!e||!e.powerups))for(const t of e.powerups){if(!t.active)continue;const i=t.pos.x*dn,s=t.pos.z*Mn,o=2+1.2*Math.sin(vs*4),a=jw(t.type);n.fillStyle=a,n.beginPath(),n.arc(i,s,o,0,Math.PI*2),n.fill();const r=.2+.15*Math.sin(vs*4);n.globalAlpha=r,n.strokeStyle=a,n.lineWidth=1,n.beginPath(),n.arc(i,s,o+2,0,Math.PI*2),n.stroke(),n.globalAlpha=1}}function jw(n){switch(n){case"sabot_ammo":return"#00ffff";case"heavy_ammo":return"#ff44ff";case"mine_pack":return"#ffaa00";case"health_pack":return"#00ff66";default:return"#ffffff"}}function $w(n,e){var t;if(!(!e||!e.enemies))for(const i of e.enemies){if(i.combat&&i.combat.hp<=0)continue;const s=i.transform.pos.x*dn,o=i.transform.pos.z*Mn,r=(((t=i.ai)==null?void 0:t.visionRange)||zw)*dn;n.strokeStyle="rgba(255, 40, 40, 0.12)",n.lineWidth=1,n.beginPath(),n.arc(s,o,r,0,Math.PI*2),n.stroke(),n.fillStyle="rgba(255, 40, 40, 0.03)",n.beginPath(),n.arc(s,o,r,0,Math.PI*2),n.fill()}}function Kw(n,e){var t;if(!(!e||!e.enemies))for(const i of e.enemies){if(i.combat&&i.combat.hp<=0)continue;const s=i.transform.pos.x*dn,o=i.transform.pos.z*Mn,a=((t=i.render)==null?void 0:t.color)||"#ff3344";n.fillStyle=a,n.beginPath(),n.arc(s,o,3,0,Math.PI*2),n.fill(),n.globalAlpha=.3,n.strokeStyle=a,n.lineWidth=1,n.beginPath(),n.arc(s,o,5,0,Math.PI*2),n.stroke(),n.globalAlpha=1}}function Zw(n,e){if(!(!e||!e.mines))for(const t of e.mines){if(!t.alive)continue;const i=t.pos.x*dn,s=t.pos.z*Mn,o=3;let a=1;t.armed?a=.5+.5*Math.sin(vs*(2*Math.PI/.8)):a=.5,n.save(),n.translate(i,s),n.rotate(Math.PI/4),n.fillStyle=`rgba(255, 170, 0, ${a})`,n.fillRect(-o/2,-o/2,o,o),n.restore()}}function Jw(n,e){if(!(!e||!e.projectiles))for(const t of e.projectiles){if(!t.alive)continue;const i=t.pos.x*dn,s=t.pos.z*Mn;if(n.fillStyle="#ffffff",n.beginPath(),n.arc(i,s,1.5,0,Math.PI*2),n.fill(),t.vel){const o=t.vel.x*dn,a=t.vel.z*Mn,r=Math.sqrt(o*o+a*a);if(r>.5){const c=Math.min(r*.06,6),l=o/r,u=a/r;n.strokeStyle="rgba(255, 255, 255, 0.5)",n.lineWidth=1,n.beginPath(),n.moveTo(i,s),n.lineTo(i-l*c,s-u*c),n.stroke()}}}}function Qw(n,e){if(!e)return;const t=e.transform.pos.x*dn,i=e.transform.pos.z*Mn,s=e.transform.yaw,o=6;n.fillStyle="#00ffff",n.beginPath();const a=t+Math.sin(s)*o,r=i+Math.cos(s)*o,c=t+Math.sin(s+2.5)*o*.55,l=i+Math.cos(s+2.5)*o*.55,u=t+Math.sin(s-2.5)*o*.55,d=i+Math.cos(s-2.5)*o*.55;n.moveTo(a,r),n.lineTo(c,l),n.lineTo(u,d),n.closePath(),n.fill(),n.fillStyle="#00ffff",n.beginPath(),n.arc(t,i,2.5,0,Math.PI*2),n.fill(),n.strokeStyle="rgba(0, 255, 255, 0.35)",n.lineWidth=1,n.beginPath(),n.arc(t,i,6,0,Math.PI*2),n.stroke()}let gn=null,Yo=null,da=null,Nn=null,jo=null,$o=null,Va=0,Ga=13,qn=null,Xt=null,li=null,go=null,on=null,Jc=null,Pi=null,ql=null,Ko=null,cs=null,Qc=0,el=0,th=0,Wa=null,gs=[],zn=null,ri=0,Xa=0;const rm=5;let qa=null,Zo=[];function eE(){if(gn=document.getElementById("ui"),!gn)return;gn.innerHTML="",Va=0;const n=document.createElement("style");n.textContent=pE,gn.appendChild(n);const e=at("div","hud-bottom-left"),t=at("div","hud-hp-wrap");Yo=at("div","hud-hp-fill"),da=at("span","hud-hp-text"),da.textContent="160 / 160",t.appendChild(Yo),t.appendChild(da),e.appendChild(t),gn.appendChild(e);const i=at("div","hud-top-center"),s=at("div","hud-alive-row");Nn=at("span","hud-alive-label"),Nn.textContent="ALIVE: "+Ga+"/"+Ga,s.appendChild(Nn),jo=at("span","hud-kill-count"),jo.textContent="KILLS: 0",s.appendChild(jo),$o=at("span","hud-scrap-count"),$o.textContent="SCRAP: 0",s.appendChild($o),i.appendChild(s),qn=at("div","hud-storm-timer"),qn.textContent="",i.appendChild(qn),gn.appendChild(i),Pi=at("div","hud-round-display"),Pi.style.display="none",ql=at("div","hud-round-number"),Pi.appendChild(ql),Ko=at("div","hud-round-mutators"),Pi.appendChild(Ko),gn.appendChild(Pi),Xt=at("div","hud-overlay"),Xt.style.display="none",li=at("div","hud-overlay-text"),Xt.appendChild(li),go=at("div","hud-overlay-sub"),Xt.appendChild(go),on=at("button","hud-overlay-btn"),on.textContent="PLAY AGAIN",on.style.display="none",Xt.appendChild(on),gn.appendChild(Xt),cs=at("div","hud-fps"),cs.textContent="60 FPS",cs.style.display="none",gn.appendChild(cs),Wa=at("div","hud-kill-feed"),gs=[],gn.appendChild(Wa),zn=at("div","hud-combo"),zn.style.display="none",ri=0,Xa=0,gn.appendChild(zn),qa=at("div","hud-damage-container"),Zo=[],gn.appendChild(qa)}function tE(n,e){var i,s,o;if(!gn)return;const t=(i=n.entities)==null?void 0:i.player;if(n.ui,(s=n.runtime)!=null&&s.now,t&&t.combat){const a=Math.max(0,t.combat.hp),r=t.combat.hpMax||160,c=Math.max(0,Math.min(1,a/r));Yo.style.width=c*100+"%",Yo.style.backgroundColor=rh(c),Yo.style.boxShadow=`0 0 8px ${rh(c)}`,da.textContent=`${Math.ceil(a)} / ${r}`}if(t&&t.combat&&Lb(t.combat),t&&t.upgrades&&$o&&($o.textContent=`SCRAP: ${t.upgrades.scrap||0}`),t&&t.upgrades&&Hb(t.upgrades,t.upgrades.scrap||0),n.entities){const a=n.entities.enemies||[];Ga=a.length+1;let r=0;t&&t.combat&&t.combat.hp>0&&r++;for(const c of a)c.combat&&c.combat.hp>0&&r++;nE(r)}if((o=n.runtime)!=null&&o.debug){cs.style.display="block",Qc++;const a=performance.now();a-el>=500&&(th=Math.round(Qc/((a-el)/1e3)),Qc=0,el=a),cs.textContent=`${th} FPS`}else cs.style.display="none";oE(),aE(),fE()}function nE(n){Nn&&(Nn.textContent=`ALIVE: ${n}/${Ga}`,n<=2?(Nn.style.color="#ff3333",Nn.style.textShadow="0 0 8px rgba(255, 50, 50, 0.7)"):n<=4?(Nn.style.color="#ff8800",Nn.style.textShadow="0 0 6px rgba(255, 130, 0, 0.5)"):(Nn.style.color="#00ffff",Nn.style.textShadow="0 0 6px rgba(0, 255, 255, 0.4)"))}function iE(n,e){qn&&(e?(qn.textContent=`STORM CLOSING IN: ${Math.ceil(n)}s`,qn.className="hud-storm-timer hud-storm-warning"):n>0?(qn.textContent=`STORM: ${Math.ceil(n)}s`,qn.className="hud-storm-timer"):(qn.textContent="",qn.className="hud-storm-timer"))}const sE=5,nh=4;function ih(n,e,t,i,s){if(!Wa)return;const o=at("div","hud-kill-entry"),a=at("span","hud-kill-attacker");a.textContent=n||"Unknown",a.style.color=t||"#ff3344",a.style.textShadow=`0 0 6px ${t||"#ff3344"}`,o.appendChild(a);const r=at("span","hud-kill-sep");r.textContent=" eliminated ",o.appendChild(r);const c=at("span","hud-kill-victim");for(c.textContent=e||"Unknown",c.style.color=i||"#aaaaaa",c.style.textShadow=`0 0 4px ${i||"#aaaaaa"}`,o.appendChild(c),Wa.appendChild(o),gs.push({el:o,spawnTime:performance.now()/1e3});gs.length>sE;){const l=gs.shift();l.el.parentNode&&l.el.parentNode.removeChild(l.el)}}function oE(n){const e=performance.now()/1e3;for(let t=gs.length-1;t>=0;t--){const i=gs[t],s=e-i.spawnTime;if(s>nh)i.el.parentNode&&i.el.parentNode.removeChild(i.el),gs.splice(t,1);else{const o=nh-1;s>o&&(i.el.style.opacity=String(1-(s-o)))}}}function Yl(){return Va}function rE(){const n=performance.now()/1e3;return ri>0&&n-Xa>rm&&(ri=0),ri++,Va++,Xa=n,jo&&(jo.textContent=`KILLS: ${Va}`),ri>=2&&zn&&(zn.style.display="block",zn.textContent=`x${ri}!`,zn.classList.remove("hud-combo-pop"),zn.offsetWidth,zn.classList.add("hud-combo-pop")),ri}function aE(n){if(ri===0)return;performance.now()/1e3-Xa>rm&&(ri=0,zn&&(zn.style.display="none"))}function cE(n,e){if(!Xt)return;Xt.style.display="flex",Xt.className="hud-overlay hud-overlay-victory",e?li.textContent=`ROUND ${e} COMPLETE`:li.textContent="VICTORY",li.style.color="#00ffff",li.style.textShadow="0 0 20px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4)";const t=Math.floor((n.survivalTime||0)/60),i=Math.floor((n.survivalTime||0)%60),s=`${t}:${String(i).padStart(2,"0")}`;go.innerHTML=`Kills: ${n.kills||0} &nbsp;|&nbsp; Damage: ${Math.round(n.damageDealt||0)} &nbsp;|&nbsp; Time: ${s}`,go.style.display="block",e?(on.textContent="CONTINUE",on.style.display="block"):(on.textContent="PLAY AGAIN",on.style.display="block")}function yu(){Xt&&(Xt.style.display="none"),on&&(on.style.display="none")}function lE(n,e){if(Pi){if(!n){Pi.style.display="none";return}Pi.style.display="flex",ql.textContent=`ROUND ${n}`,e&&e.length>0?(Ko.innerHTML=e.map(t=>`<span style="color:${t.color};text-shadow:0 0 4px ${t.color}">${t.name}</span>`).join(' <span style="color:#334455">|</span> '),Ko.style.display="block"):Ko.style.display="none"}}function uE(n){Xt&&(Xt.style.display="flex",Xt.className="hud-overlay hud-overlay-runend",li.textContent="RUN OVER",li.style.color="#ff6644",li.style.textShadow="0 0 20px rgba(255, 100, 68, 0.6), 0 0 40px rgba(255, 100, 68, 0.3)",go.innerHTML=`Survived <span style="color:#00ffff;font-size:22px;font-weight:bold">${n.roundsCompleted||0}</span> rounds &nbsp;|&nbsp; Kills: ${n.kills||0} &nbsp;|&nbsp; Damage: ${Math.round(n.damageDealt||0)}<br><span style="color:#ffd700;font-size:14px;margin-top:6px;display:inline-block">Total scrap: ${n.totalScrapEarned||0} &nbsp;|&nbsp; Best round: ${n.bestRound||0}</span>`,go.style.display="block",on.textContent="MAIN MENU",on.style.display="block")}const dE=1,sh={normal:"#ffffff",critical:"#ffdd00",player:"#ff3333"};function oh(n,e,t,i){if(!qa)return;const s=sh[i]||sh.normal,o=at("div","hud-damage-num");o.textContent=Math.round(t),o.style.left=n+"px",o.style.top=e+"px",o.style.color=s,o.style.textShadow=`0 0 6px ${s}`,i==="critical"&&(o.style.fontSize="22px",o.style.fontWeight="bold"),qa.appendChild(o),Zo.push({el:o,spawnTime:performance.now()/1e3})}function fE(n){const e=performance.now()/1e3;for(let t=Zo.length-1;t>=0;t--){const i=Zo[t];e-i.spawnTime>dE&&(i.el.parentNode&&i.el.parentNode.removeChild(i.el),Zo.splice(t,1))}}function at(n,e){const t=document.createElement(n);return e&&(t.className=e),t}function hE(n){Jc=n,on&&(on.onclick=e=>{e.stopPropagation(),Xt&&(Xt.style.display="none",on.style.display="none"),Jc&&Jc()})}function rh(n){return n>.6?"#00ff88":n>.3?"#ffcc00":"#ff3333"}const pE=`
/* HUD container children inherit pointer-events:none from #ui */

.hud-bottom-left {
  position: absolute;
  bottom: 24px;
  left: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Consolas', 'Courier New', monospace;
  color: #aaccff;
  font-size: 13px;
}

/* Health bar */
.hud-hp-wrap {
  position: relative;
  width: 220px;
  height: 18px;
  background: rgba(10, 10, 30, 0.7);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
}
.hud-hp-fill {
  height: 100%;
  width: 100%;
  background: #00ff88;
  transition: width 0.15s ease, background-color 0.3s ease;
  box-shadow: 0 0 8px #00ff88;
}
.hud-hp-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #ffffff;
  text-shadow: 0 0 4px rgba(0,0,0,0.9);
  letter-spacing: 1px;
}

/* Scrap counter (top-center row) */
.hud-scrap-count {
  font-size: 15px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.4);
  letter-spacing: 2px;
  background: rgba(4, 4, 16, 0.6);
  padding: 4px 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 3px;
}

/* Top-center: alive + kill count + storm timer */
.hud-top-center {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: 'Consolas', 'Courier New', monospace;
  pointer-events: none;
}

.hud-alive-row {
  display: flex;
  gap: 20px;
  align-items: center;
}

.hud-alive-label {
  font-size: 15px;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
  letter-spacing: 2px;
  background: rgba(4, 4, 16, 0.6);
  padding: 4px 10px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 3px;
}

.hud-kill-count {
  font-size: 15px;
  font-weight: bold;
  color: #ff4466;
  text-shadow: 0 0 6px rgba(255, 50, 80, 0.4);
  letter-spacing: 2px;
  background: rgba(4, 4, 16, 0.6);
  padding: 4px 10px;
  border: 1px solid rgba(255, 50, 80, 0.2);
  border-radius: 3px;
}

/* Storm timer */
.hud-storm-timer {
  font-size: 13px;
  font-weight: bold;
  color: #00aaff;
  letter-spacing: 2px;
  text-shadow: 0 0 6px rgba(0, 170, 255, 0.5);
  min-height: 20px;
  text-align: center;
}
.hud-storm-warning {
  font-size: 15px;
  color: #ff4400;
  text-shadow: 0 0 10px rgba(255, 68, 0, 0.8), 0 0 20px rgba(255, 68, 0, 0.4);
  animation: storm-pulse 0.5s ease-in-out infinite alternate;
}
@keyframes storm-pulse {
  0%   { opacity: 0.8; }
  100% { opacity: 1.0; }
}

/* Center overlay (elimination / victory) */
.hud-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: rgba(4, 4, 16, 0.75);
}
.hud-overlay-text {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 52px;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3);
  letter-spacing: 6px;
  text-transform: uppercase;
  text-align: center;
}
.hud-overlay-sub {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 18px;
  color: #aaccff;
  text-shadow: 0 0 8px rgba(100, 150, 255, 0.4);
  letter-spacing: 2px;
  text-align: center;
  display: none;
}
.hud-overlay-btn {
  pointer-events: auto;
  cursor: pointer;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 16px;
  font-weight: bold;
  color: #00ffff;
  background: rgba(0, 40, 60, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 4px;
  padding: 10px 32px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
  transition: background 0.2s, border-color 0.2s;
  margin-top: 8px;
}
.hud-overlay-btn:hover {
  background: rgba(0, 80, 120, 0.7);
  border-color: rgba(0, 255, 255, 0.7);
}

/* Victory overlay extra glow */
.hud-overlay-victory {
  background: rgba(0, 10, 20, 0.8);
}

/* Run end overlay */
.hud-overlay-runend {
  background: rgba(15, 5, 5, 0.85);
}

/* Round display (roguelite mode) */
.hud-round-display {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: 'Consolas', 'Courier New', monospace;
  pointer-events: none;
}
.hud-round-number {
  font-size: 13px;
  font-weight: bold;
  color: #00ffff;
  letter-spacing: 3px;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
}
.hud-round-mutators {
  font-size: 10px;
  letter-spacing: 1px;
}

/* FPS counter */
.hud-fps {
  position: absolute;
  top: 58px;
  left: 16px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 11px;
  color: #446688;
}

/* Kill feed */
.hud-kill-feed {
  position: absolute;
  bottom: 120px;
  right: 300px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  font-family: 'Consolas', 'Courier New', monospace;
}
.hud-kill-entry {
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1px;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: rgba(4, 4, 16, 0.6);
  padding: 3px 8px;
  border-radius: 3px;
  border-left: 2px solid rgba(255, 100, 100, 0.4);
}
.hud-kill-attacker {
  font-weight: bold;
}
.hud-kill-sep {
  color: #667788;
  font-weight: normal;
}
.hud-kill-victim {
  font-weight: normal;
}

/* Combo counter */
.hud-combo {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 36px;
  font-weight: bold;
  color: #ffdd00;
  text-shadow: 0 0 12px rgba(255, 220, 0, 0.6), 0 0 24px rgba(255, 220, 0, 0.3);
  letter-spacing: 2px;
}
.hud-combo-pop {
  animation: combo-scale 0.35s ease-out;
}
@keyframes combo-scale {
  0%   { transform: translateY(-50%) scale(1.6); opacity: 0.7; }
  50%  { transform: translateY(-50%) scale(1.1); opacity: 1; }
  100% { transform: translateY(-50%) scale(1.0); opacity: 1; }
}

/* Damage numbers container */
.hud-damage-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.hud-damage-num {
  position: absolute;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  pointer-events: none;
  animation: damage-float 1s ease-out forwards;
  white-space: nowrap;
}
@keyframes damage-float {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  30%  { opacity: 1; transform: translateY(-20px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
}
`;function mE(n){eE(),Pb(),kb(),Ow()}function gE(n,e){tE(n),Hw(n,e)}let Q,Js,Bt,Ms,Ji,Jr;const jl=[];function _E(){Q=new(window.AudioContext||window.webkitAudioContext),Js=Q.createGain(),Js.connect(Q.destination),Bt=Q.createGain(),Bt.connect(Js),Ms=Q.createGain(),Ms.connect(Js),Ji=Q.listener;for(let n=0;n<24;n++)jl.push(am())}function xE(n){Js&&Js.gain.setValueAtTime(Math.max(0,Math.min(1,n)),Q.currentTime)}function vE(n){Bt&&Bt.gain.setValueAtTime(Math.max(0,Math.min(1,n)),Q.currentTime)}function ME(n){Ms&&Ms.gain.setValueAtTime(Math.max(0,Math.min(1,n)),Q.currentTime)}function yE(n,e,t){Ji&&(Ji.positionX?(Ji.positionX.value=n,Ji.positionY.value=e,Ji.positionZ.value=t):Ji.setPosition(n,e,t))}function am(){const n=Q.createPanner();return n.panningModel="HRTF",n.distanceModel="inverse",n.refDistance=20,n.maxDistance=500,n.rolloffFactor=1.2,n._free=!0,n}function yn(){let n=jl.find(e=>e._free);return n||(n=am(),jl.push(n)),n._free=!1,n}function cm(n){n.disconnect(),n._free=!0}function Gn(n,e){setTimeout(()=>cm(n),(e+.1)*1e3)}function an(n,e){e&&(n.positionX?(n.positionX.value=e.x||0,n.positionY.value=e.y||0,n.positionZ.value=e.z||0):n.setPosition(e.x||0,e.y||0,e.z||0))}function So(){if(!Jr){const e=Q.sampleRate*2;Jr=Q.createBuffer(1,e,Q.sampleRate);const t=Jr.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1}const n=Q.createBufferSource();return n.buffer=Jr,n}function bE(n,e){const t=Q.currentTime,i=(e==null?void 0:e.weapon)||"he",s={he:220,sabot:400,heavy:120},o=s[i]||220,a=i==="heavy"?.35:.2,r=So(),c=Q.createBiquadFilter(),l=Q.createGain();c.type="bandpass",c.frequency.value=o*4,c.Q.value=1.5,l.gain.setValueAtTime(.7,t),l.gain.exponentialRampToValueAtTime(.001,t+a);const u=Q.createOscillator(),d=Q.createGain();u.frequency.setValueAtTime(o,t),u.frequency.exponentialRampToValueAtTime(o*.3,t+a),d.gain.setValueAtTime(.5,t),d.gain.exponentialRampToValueAtTime(.001,t+a);const f=yn();an(f,n),r.connect(c),c.connect(l),l.connect(f),u.connect(d),d.connect(f),f.connect(Bt),r.start(t),r.stop(t+a),u.start(t),u.stop(t+a),Gn(f,a)}function SE(n,e){const t=Q.currentTime,i=(e==null?void 0:e.radius)||18,s=Math.min(1,i/20),o=.6+i*.015,a=So(),r=Q.createBiquadFilter(),c=Q.createGain();r.type="lowpass",r.frequency.setValueAtTime(2e3,t),r.frequency.exponentialRampToValueAtTime(100,t+o),c.gain.setValueAtTime(s,t),c.gain.exponentialRampToValueAtTime(.001,t+o);const l=Q.createOscillator(),u=Q.createGain();l.frequency.setValueAtTime(100,t),l.frequency.exponentialRampToValueAtTime(20,t+o),u.gain.setValueAtTime(s*.8,t),u.gain.exponentialRampToValueAtTime(.001,t+o);const d=yn();an(d,n),a.connect(r),r.connect(c),c.connect(d),l.connect(u),u.connect(d),d.connect(Bt),a.start(t),a.stop(t+o+.05),l.start(t),l.stop(t+o+.05),Gn(d,o+.1)}function wE(n){const e=Q.currentTime,t=.5,i=Q.createOscillator(),s=Q.createGain();i.frequency.setValueAtTime(1800,e),i.frequency.exponentialRampToValueAtTime(600,e+t),s.gain.setValueAtTime(.15,e),s.gain.exponentialRampToValueAtTime(.001,e+t);const o=yn();an(o,n),i.connect(s),s.connect(o),o.connect(Bt),i.start(e),i.stop(e+t),Gn(o,t)}function EE(n){const e=Q.currentTime,t=[261.6,329.6,392,523.3],i=.08,s=yn();an(s,n),t.forEach((o,a)=>{const r=Q.createOscillator(),c=Q.createGain();r.type="square",r.frequency.value=o,c.gain.setValueAtTime(0,e+a*i),c.gain.linearRampToValueAtTime(.25,e+a*i+.01),c.gain.exponentialRampToValueAtTime(.001,e+a*i+i+.05),r.connect(c),c.connect(s),r.start(e+a*i),r.stop(e+a*i+i+.06)}),s.connect(Bt),Gn(s,t.length*i+.15)}function TE(n){const e=Q.currentTime,t=yn();an(t,n);for(let i=0;i<3;i++){const s=Q.createOscillator(),o=Q.createGain();s.type="square",s.frequency.value=880,o.gain.setValueAtTime(0,e+i*.1),o.gain.linearRampToValueAtTime(.2,e+i*.1+.01),o.gain.linearRampToValueAtTime(0,e+i*.1+.06),s.connect(o),o.connect(t),s.start(e+i*.1),s.stop(e+i*.1+.07)}t.connect(Bt),Gn(t,.4)}function Ya(n,e,t,i){const s=Q.currentTime;n.forEach((o,a)=>{const r=i?a*.08:0,c=Q.createOscillator(),l=Q.createGain(),u=Q.createBiquadFilter();c.type="sawtooth",c.frequency.value=o,u.type="lowpass",u.frequency.value=3e3,l.gain.setValueAtTime(0,s+r),l.gain.linearRampToValueAtTime(t,s+r+.05),l.gain.exponentialRampToValueAtTime(.001,s+r+e),c.connect(u),u.connect(l),l.connect(Bt),c.start(s+r),c.stop(s+r+e+.05)})}function AE(){Ya([261.6,329.6,392],.6,.2,!0),setTimeout(()=>Ya([392,493.9,587.3],.9,.25,!0),650)}function RE(){Ya([493.9,392,293.7],1,.2,!1),setTimeout(()=>Ya([329.6,261.6,196],1.2,.2,!1),500)}function CE(){const n=Q.currentTime,e=Q.createOscillator(),t=Q.createGain();e.frequency.value=1200,t.gain.setValueAtTime(.15,n),t.gain.exponentialRampToValueAtTime(.001,n+.04),e.connect(t),t.connect(Bt),e.start(n),e.stop(n+.05)}let Fs=null;function PE(n,e){const t=(e==null?void 0:e.speed)||0;if(Fs){const l=40+Math.abs(t)*1.5;Fs.o1.frequency.setTargetAtTime(l,Q.currentTime,.1),Fs.o2.frequency.setTargetAtTime(l*1.5,Q.currentTime,.1),Fs.g.gain.setTargetAtTime(.04+Math.abs(t)*.003,Q.currentTime,.1),an(Fs.pan,n);return}const i=Q.currentTime,s=Q.createOscillator(),o=Q.createOscillator();s.type="sawtooth",s.frequency.value=40,o.type="triangle",o.frequency.value=60;const a=Q.createBiquadFilter();a.type="lowpass",a.frequency.value=200;const r=Q.createGain();r.gain.value=.04;const c=yn();an(c,n),s.connect(a),o.connect(a),a.connect(r),r.connect(c),c.connect(Ms),s.start(i),o.start(i),Fs={o1:s,o2:o,g:r,pan:c}}function LE(n){const e=Q.currentTime,t=.2,i=So(),s=Q.createBiquadFilter(),o=Q.createGain();s.type="bandpass",s.frequency.value=800,s.Q.value=2,o.gain.setValueAtTime(.4,e),o.gain.exponentialRampToValueAtTime(.001,e+t);const a=Q.createOscillator(),r=Q.createGain();a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(120,e+t),r.gain.setValueAtTime(.3,e),r.gain.exponentialRampToValueAtTime(.001,e+t);const c=yn();an(c,n),i.connect(s),s.connect(o),o.connect(c),a.connect(r),r.connect(c),c.connect(Bt),i.start(e),i.stop(e+t),a.start(e),a.stop(e+t),Gn(c,t)}function DE(n){const e=Q.currentTime,t=.3,i=Q.createOscillator(),s=Q.createGain();i.type="sine",i.frequency.setValueAtTime(600,e),i.frequency.exponentialRampToValueAtTime(2400,e+t),s.gain.setValueAtTime(.25,e),s.gain.exponentialRampToValueAtTime(.001,e+t);const o=yn();an(o,n),i.connect(s),s.connect(o),o.connect(Bt),i.start(e),i.stop(e+t),Gn(o,t)}function IE(n){const e=Q.currentTime,t=.6,i=So(),s=Q.createBiquadFilter(),o=Q.createGain();s.type="lowpass",s.frequency.setValueAtTime(3e3,e),s.frequency.exponentialRampToValueAtTime(150,e+t),o.gain.setValueAtTime(.9,e),o.gain.exponentialRampToValueAtTime(.001,e+t);const a=Q.createOscillator(),r=Q.createGain();a.frequency.setValueAtTime(180,e),a.frequency.exponentialRampToValueAtTime(30,e+t),r.gain.setValueAtTime(.7,e),r.gain.exponentialRampToValueAtTime(.001,e+t);const c=yn();an(c,n),i.connect(s),s.connect(o),o.connect(c),a.connect(r),r.connect(c),c.connect(Bt),i.start(e),i.stop(e+t+.05),a.start(e),a.stop(e+t+.05),Gn(c,t+.1)}function UE(n){const e=Q.currentTime,t=.1,i=[523.3,659.3,784],s=yn();an(s,n),i.forEach((o,a)=>{const r=Q.createOscillator(),c=Q.createGain();r.type="sine",r.frequency.value=o,c.gain.setValueAtTime(0,e+a*t),c.gain.linearRampToValueAtTime(.3,e+a*t+.02),c.gain.exponentialRampToValueAtTime(.001,e+a*t+t+.1),r.connect(c),c.connect(s),r.start(e+a*t),r.stop(e+a*t+t+.12)}),s.connect(Bt),Gn(s,i.length*t+.2)}let jn=null;function NE(n,e){const t=(e==null?void 0:e.ringRadius)??800,i=(e==null?void 0:e.ringCenter)??{x:0,z:0},s=(e==null?void 0:e.playerPos)??n,o=((s==null?void 0:s.x)??0)-i.x,a=((s==null?void 0:s.z)??0)-i.z,r=Math.sqrt(o*o+a*a),c=t-r,l=Math.max(0,1-Math.abs(c)/100),u=c<0?.4:0,d=Math.min(1,.08+l*.35+u);if(jn){jn.drone1.frequency.setTargetAtTime(42,Q.currentTime,.3),jn.drone2.frequency.setTargetAtTime(57,Q.currentTime,.3),jn.masterGv.gain.setTargetAtTime(d,Q.currentTime,.2),an(jn.pan,n);return}const f=Q.currentTime,p=Q.createOscillator(),g=Q.createOscillator();p.type="sawtooth",p.frequency.value=42,g.type="sine",g.frequency.value=57;const _=Q.createBiquadFilter();_.type="lowpass",_.frequency.value=300;const m=Q.createGain();m.gain.value=.6;const h=So();h.loop=!0;const v=Q.createBiquadFilter();v.type="bandpass",v.frequency.value=4e3,v.Q.value=.8;const x=Q.createGain();x.gain.value=.25;const M=Q.createGain();M.gain.value=d;const b=yn();an(b,n),p.connect(_),g.connect(_),_.connect(m),m.connect(M),h.connect(v),v.connect(x),x.connect(M),M.connect(b),b.connect(Ms),p.start(f),g.start(f),h.start(f),jn={drone1:p,drone2:g,crackleNoise:h,masterGv:M,pan:b}}function ir(){if(!jn)return;jn.masterGv.gain.setTargetAtTime(0,Q.currentTime,.3);const n=jn;jn=null,setTimeout(()=>{try{n.drone1.stop(),n.drone2.stop(),n.crackleNoise.stop()}catch{}cm(n.pan)},500)}function zE(n){const e=Q.currentTime,t=.15,i=So(),s=Q.createBiquadFilter(),o=Q.createGain();s.type="highpass",s.frequency.value=3e3,o.gain.setValueAtTime(.7,e),o.gain.exponentialRampToValueAtTime(.001,e+t);const a=Q.createOscillator(),r=Q.createGain();a.type="square",a.frequency.setValueAtTime(1800,e),a.frequency.exponentialRampToValueAtTime(300,e+t),r.gain.setValueAtTime(.5,e),r.gain.exponentialRampToValueAtTime(.001,e+t);const c=yn();an(c,n),i.connect(s),s.connect(o),o.connect(c),a.connect(r),r.connect(c),c.connect(Bt),i.start(e),i.stop(e+t+.02),a.start(e),a.stop(e+t+.02),Gn(c,t+.05)}function OE(){const n=Q.currentTime,e=2,t=Q.createOscillator(),i=Q.createGain();t.type="sawtooth",t.frequency.setValueAtTime(55,n),t.frequency.linearRampToValueAtTime(45,n+e),i.gain.setValueAtTime(0,n),i.gain.linearRampToValueAtTime(.4,n+.05),i.gain.setValueAtTime(.4,n+e-.3),i.gain.exponentialRampToValueAtTime(.001,n+e);const s=Q.createOscillator(),o=Q.createGain();s.type="sine",s.frequency.setValueAtTime(110,n),s.frequency.linearRampToValueAtTime(90,n+e),o.gain.setValueAtTime(0,n),o.gain.linearRampToValueAtTime(.2,n+.08),o.gain.setValueAtTime(.2,n+e-.3),o.gain.exponentialRampToValueAtTime(.001,n+e);const a=Q.createBiquadFilter();a.type="lowpass",a.frequency.value=600,t.connect(a),s.connect(a),a.connect(Ms),t.start(n),t.stop(n+e+.05),s.start(n),s.stop(n+e+.05)}function FE(n){const e=Q.currentTime,t=Q.createOscillator(),i=Q.createGain();t.type="sine",t.frequency.setValueAtTime(120,e),t.frequency.exponentialRampToValueAtTime(30,e+.5),i.gain.setValueAtTime(.6,e),i.gain.exponentialRampToValueAtTime(.001,e+.5),t.connect(i),i.connect(Bt),t.start(e),t.stop(e+.55);const s=[220,261.6,311.1],o=yn();an(o,n),s.forEach((a,r)=>{const c=Q.createOscillator(),l=Q.createGain(),u=r*.03;c.type="sawtooth",c.frequency.value=a;const d=Q.createBiquadFilter();d.type="lowpass",d.frequency.value=2e3,l.gain.setValueAtTime(0,e+u),l.gain.linearRampToValueAtTime(.3,e+u+.03),l.gain.exponentialRampToValueAtTime(.001,e+u+.8),c.connect(d),d.connect(l),l.connect(o),c.start(e+u),c.stop(e+u+.85)}),o.connect(Bt),Gn(o,1)}function lt(n,e,t){if(Q)switch(Q.state==="suspended"&&Q.resume(),n){case"fire":bE(e,t);break;case"explosion":SE(e,t);break;case"whistle":wE(e);break;case"powerup":EE(e);break;case"alert":TE(e);break;case"victory":AE();break;case"defeat":RE();break;case"click":CE();break;case"engine":PE(e,t);break;case"mine_place":LE(e);break;case"mine_arm":DE(e);break;case"mine_explode":IE(e);break;case"health_pickup":UE(e);break;case"storm_ambient":NE(e,t);break;case"storm_damage":zE(e);break;case"storm_warning":OE();break;case"elimination":FE(e);break}}let Ut=null,$l=null,fa=null,ha=null,pa=null,ls=null,ma=null,io=null,so=null,oo=null,Do=null;function BE(){const n=document.getElementById("interstitial-overlay");n&&n.remove(),VE(),Ut=document.createElement("div"),Ut.id="interstitial-overlay",Ut.style.display="none",fa=document.createElement("div"),fa.className="intst-title",Ut.appendChild(fa),ha=document.createElement("div"),ha.className="intst-stats",Ut.appendChild(ha),pa=document.createElement("div"),pa.className="intst-scrap",Ut.appendChild(pa),ls=document.createElement("div"),ls.className="intst-bonus",Ut.appendChild(ls);const e=document.createElement("div");e.className="intst-divider",Ut.appendChild(e),ma=document.createElement("div"),ma.className="intst-next-header",Ut.appendChild(ma),io=document.createElement("div"),io.className="intst-difficulty",Ut.appendChild(io),so=document.createElement("div"),so.className="intst-mutators",Ut.appendChild(so),oo=document.createElement("div"),oo.className="intst-next-bonus",Ut.appendChild(oo);const t=document.createElement("div");t.className="intst-btn-row",Do=document.createElement("button"),Do.className="intst-btn intst-btn-ready",Do.textContent="READY",Do.addEventListener("click",i=>{i.stopPropagation(),$l&&$l()}),t.appendChild(Do),Ut.appendChild(t),document.body.appendChild(Ut)}function kE(n){if(!Ut)return;fa.textContent=`ROUND ${n.round} COMPLETE`;const e=Math.floor((n.roundStats.timeSurvived||0)/60),t=Math.floor((n.roundStats.timeSurvived||0)%60),i=`${e}:${String(t).padStart(2,"0")}`;ha.innerHTML=`<span class="intst-stat">KILLS <span class="intst-stat-val">${n.roundStats.kills||0}</span></span><span class="intst-stat">DAMAGE <span class="intst-stat-val">${Math.round(n.roundStats.damageDealt||0)}</span></span><span class="intst-stat">TIME <span class="intst-stat-val">${i}</span></span>`;const s=n.scrapBreakdown;if(pa.innerHTML=`<div class="intst-scrap-line intst-scrap-earned">Earned this round: <span>${s.earned}</span></div><div class="intst-scrap-line intst-scrap-carry">Carryover (50%): <span>${s.carryover}</span></div><div class="intst-scrap-line intst-scrap-bonus">Round bonus: <span>+${s.bonus}</span></div><div class="intst-scrap-line intst-scrap-total">Total scrap: <span>${s.total}</span></div>`,n.bonusObjective){const c=n.bonusObjective;c.completed?ls.innerHTML=`<span class="intst-bonus-label">BONUS:</span> ${c.description} <span class="intst-bonus-pass">COMPLETED +${c.scrapReward}</span>`:ls.innerHTML=`<span class="intst-bonus-label">BONUS:</span> ${c.description} <span class="intst-bonus-fail">FAILED</span>`,ls.style.display="block"}else ls.style.display="none";const o=n.nextRound;ma.textContent=`ROUND ${o.number}`,io.innerHTML="";const a=document.createElement("span");a.className="intst-diff-label",a.textContent="DIFFICULTY",io.appendChild(a);const r=document.createElement("div");r.className="intst-diff-bar";for(let c=0;c<10;c++){const l=document.createElement("span");if(l.className="intst-diff-sq",c<o.difficulty){const u=c/9,d=Math.round(50+205*u),f=Math.round(255-200*u),p=Math.round(100-80*u);l.style.backgroundColor=`rgb(${d},${f},${p})`,l.style.boxShadow=`0 0 4px rgb(${d},${f},${p})`}r.appendChild(l)}if(io.appendChild(r),so.innerHTML="",o.mutators&&o.mutators.length>0){const c=document.createElement("span");c.className="intst-mut-label",c.textContent="MUTATORS",so.appendChild(c);const l=document.createElement("div");l.className="intst-mut-row";for(const u of o.mutators){const d=document.createElement("span");d.className="intst-mut-pill",d.textContent=u.name,d.style.color=u.color,d.style.borderColor=u.color,d.title=u.description,l.appendChild(d)}so.appendChild(l)}o.bonusObjective?(oo.innerHTML=`<span class="intst-bonus-label">BONUS OBJECTIVE:</span> ${o.bonusObjective.description} <span class="intst-bonus-reward">(+${o.bonusObjective.scrapReward})</span>`,oo.style.display="block"):oo.style.display="none",Ut.style.display="flex"}function ah(){Ut&&(Ut.style.display="none")}function HE(n){$l=n}let ch=!1;function VE(){if(ch)return;ch=!0;const n=document.createElement("style");n.textContent=`
/* ── Interstitial Overlay ── */
#interstitial-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 10, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: 'Consolas', 'Courier New', monospace;
  pointer-events: auto;
}

/* Title */
.intst-title {
  font-size: 42px;
  font-weight: bold;
  color: #00ffff;
  letter-spacing: 6px;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.25);
  text-transform: uppercase;
  margin-bottom: 4px;
}

/* Stats row */
.intst-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 8px;
}
.intst-stat {
  font-size: 13px;
  color: #7788aa;
  letter-spacing: 2px;
}
.intst-stat-val {
  color: #ccddff;
  font-weight: bold;
  margin-left: 6px;
  text-shadow: 0 0 4px rgba(150, 200, 255, 0.3);
}

/* Scrap breakdown */
.intst-scrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 24px;
  background: rgba(20, 20, 40, 0.6);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 4px;
  min-width: 300px;
}
.intst-scrap-line {
  font-size: 14px;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
}
.intst-scrap-earned {
  color: #ffd700;
}
.intst-scrap-carry {
  color: #b8a040;
}
.intst-scrap-bonus {
  color: #ffe060;
}
.intst-scrap-total {
  font-size: 18px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding-top: 6px;
  margin-top: 4px;
}
.intst-scrap-total span {
  font-size: 20px;
}

/* Bonus objective result */
.intst-bonus {
  font-size: 14px;
  color: #aabbcc;
  letter-spacing: 1px;
}
.intst-bonus-label {
  color: #8899aa;
  font-weight: bold;
}
.intst-bonus-pass {
  color: #00ff66;
  font-weight: bold;
  text-shadow: 0 0 6px rgba(0, 255, 102, 0.4);
}
.intst-bonus-fail {
  color: #883333;
  font-weight: bold;
}

/* Divider */
.intst-divider {
  width: 400px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.25), transparent);
  margin: 8px 0;
}

/* Next round header */
.intst-next-header {
  font-size: 28px;
  font-weight: bold;
  color: #00ffff;
  letter-spacing: 4px;
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
}

/* Difficulty bar */
.intst-difficulty {
  display: flex;
  align-items: center;
  gap: 12px;
}
.intst-diff-label {
  font-size: 11px;
  color: #667788;
  letter-spacing: 2px;
}
.intst-diff-bar {
  display: flex;
  gap: 4px;
}
.intst-diff-sq {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: rgba(40, 40, 60, 0.6);
  border: 1px solid rgba(100, 120, 140, 0.2);
}

/* Mutators */
.intst-mutators {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.intst-mut-label {
  font-size: 11px;
  color: #667788;
  letter-spacing: 2px;
}
.intst-mut-row {
  display: flex;
  gap: 10px;
}
.intst-mut-pill {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 4px 14px;
  border-radius: 12px;
  border: 1px solid;
  background: rgba(20, 20, 40, 0.6);
  text-shadow: 0 0 6px currentColor;
}

/* Next bonus objective */
.intst-next-bonus {
  font-size: 13px;
  color: #8899aa;
  letter-spacing: 1px;
}
.intst-bonus-reward {
  color: #ffd700;
  font-weight: bold;
}

/* Button row */
.intst-btn-row {
  display: flex;
  gap: 20px;
  margin-top: 12px;
}

.intst-btn {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 3px;
  padding: 12px 36px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.intst-btn-ready {
  color: #00ffff;
  background: rgba(0, 40, 60, 0.6);
  border: 2px solid rgba(0, 255, 255, 0.5);
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
  min-width: 200px;
  animation: intst-ready-pulse 1.5s ease-in-out infinite alternate;
}
.intst-btn-ready:hover {
  background: rgba(0, 80, 120, 0.7);
  border-color: rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 16px rgba(0, 255, 255, 0.3);
}

@keyframes intst-ready-pulse {
  0%   { border-color: rgba(0, 255, 255, 0.35); }
  100% { border-color: rgba(0, 255, 255, 0.8); box-shadow: 0 0 12px rgba(0, 255, 255, 0.2); }
}
`,document.head.appendChild(n)}const lm=[["regular","regular","regular","regular","regular","veteran","veteran","veteran","elite"],["regular","regular","regular","regular","veteran","veteran","veteran","elite","elite"],["regular","regular","regular","veteran","veteran","veteran","veteran","elite","elite"],["regular","regular","veteran","veteran","veteran","veteran","elite","elite","elite"],["regular","veteran","veteran","veteran","veteran","elite","elite","elite","elite"],["veteran","veteran","veteran","veteran","elite","elite","elite","elite","elite"],["veteran","veteran","elite","elite","elite","elite","elite","elite","elite"]],GE=[0,0,1,2,3,4,4,5],WE=[{id:"dense_cover",name:"Dense Cover",description:"+40% obstacles",color:"#88ff88",apply:n=>{n.obstacleDensityMult=1.4}},{id:"open_field",name:"Open Field",description:"-40% obstacles",color:"#ff8888",apply:n=>{n.obstacleDensityMult=.6}},{id:"scrap_rush",name:"Scrap Rush",description:"2x scrap from all sources",color:"#ffd700",apply:n=>{n.scrapMult=2}},{id:"storm_surge",name:"Storm Surge",description:"Storm phases 25% faster",color:"#00aaff",apply:n=>{n.stormSpeedMult=1.25}},{id:"mine_field",name:"Mine Field",description:"AI start with mines, extra mine powerups",color:"#ffaa00",apply:n=>{n.extraMines=!0}},{id:"heavy_ordnance",name:"Heavy Ordnance",description:"No sabot ammo spawns",color:"#ff00ff",apply:n=>{n.weaponRestriction="no_sabot"}},{id:"marksman",name:"Marksman",description:"No heavy ammo spawns",color:"#00ffff",apply:n=>{n.weaponRestriction="no_heavy"}},{id:"famine",name:"Famine",description:"50% fewer powerups",color:"#884400",apply:n=>{n.powerupSpawnMult=.5}},{id:"glass_cannon",name:"Glass Cannon",description:"All tanks deal and take +30% damage",color:"#ff4444",apply:n=>{n.damageMult=1.3,n.damageDealtMult=1.3}},{id:"regen_arena",name:"Regen Arena",description:"All tanks regenerate 1 HP/s",color:"#00ff66",apply:n=>{n.hpRegenAll=1}}],XE=[["dense_cover","open_field"],["heavy_ordnance","marksman"]],lh=[{id:"first_blood",description:"Get the first kill",scrapReward:50},{id:"untouched",description:"Win without dropping below 80% HP",scrapReward:100},{id:"ricochet_kill",description:"Kill with a sabot ricochet",scrapReward:75},{id:"mine_sweep",description:"Destroy 3+ enemy mines",scrapReward:50},{id:"speed_demon",description:"Win before storm phase 3",scrapReward:75}];function um(){return{obstacleDensityMult:1,powerupSpawnMult:1,scrapMult:1,stormSpeedMult:1,damageMult:1,damageDealtMult:1,hpRegenAll:0,extraMines:!1,weaponRestriction:null}}function dm(){return{round:1,active:!0,phase:"playing",carryover:{upgrades:null,scrap:0,ammo:{sabot:0,heavy:0},mines:0},config:{skillDistribution:[...lm[0]],aiUpgradeTier:0,mutators:[],bonusObjective:null},mutatorOverrides:um(),roundStats:{kills:0,damageDealt:0,timeSurvived:0,scrapEarned:0,bonusCompleted:!1},totalStats:{kills:0,damageDealt:0,roundsCompleted:0,totalScrapEarned:0,bestRound:0}}}function fm(n){return 150+(n-1)*50}function qE(n){const e=n.round,t=Math.min(e,7)-1;n.config.skillDistribution=[...lm[t]],n.config.aiUpgradeTier=GE[Math.min(e,7)]}function YE(n,e){for(const[t,i]of XE)if(n===t&&e===i||n===i&&e===t)return!0;return!1}function jE(n){const e=n.round;if(n.mutatorOverrides=um(),e<2){n.config.mutators=[];return}const t=e>=4?2:1,i=[...WE],s=[];for(let o=0;o<t&&i.length>0;o++){const a=Math.floor(Math.random()*i.length),r=i[a];let c=!1;for(const l of s)if(YE(r.id,l.id)){c=!0;break}if(c){i.splice(a,1),o--;continue}s.push(r),i.splice(a,1)}for(const o of s)o.apply(n.mutatorOverrides);n.config.mutators=s}function $E(n){const e=Math.floor(Math.random()*lh.length);n.config.bonusObjective={...lh[e]}}function hm(n){const e={scrap:n.scrap,tracks:{},modifiers:{...n.modifiers},visualDirty:!0};for(const t of Object.keys(n.tracks))e.tracks[t]={...n.tracks[t]};return n.modifiers.shield&&(e.modifiers.shield={...n.modifiers.shield}),e}function KE(n,e){n.totalStats.kills+=n.roundStats.kills,n.totalStats.damageDealt+=n.roundStats.damageDealt,n.totalStats.roundsCompleted+=1,n.totalStats.totalScrapEarned+=n.roundStats.scrapEarned;const t=e.upgrades,i=e.combat,s=fm(n.round);return n.carryover.upgrades=hm(t),n.carryover.scrap=Math.floor(t.scrap*.5)+s,n.carryover.ammo={sabot:i.ammo.sabot,heavy:i.ammo.heavy},n.carryover.mines=i.mines||0,n.round+=1,qE(n),jE(n),$E(n),n.roundStats={kills:0,damageDealt:0,timeSurvived:0,scrapEarned:0,bonusCompleted:!1},n.phase="interstitial",n}function ZE(){return{sabot:4,heavy:3,mines:2}}function JE(n,e){const t=e.upgrades,i=e.combat;n.carryover.upgrades=hm(t),n.carryover.scrap=t.scrap,n.carryover.ammo={sabot:i.ammo.sabot,heavy:i.ammo.heavy},n.carryover.mines=i.mines||0}function QE(n,e){const t=e.carryover;if(!t.upgrades)return;n.upgrades.tracks={};for(const o of Object.keys(t.upgrades.tracks))n.upgrades.tracks[o]={...t.upgrades.tracks[o]};n.upgrades.modifiers={...t.upgrades.modifiers},t.upgrades.modifiers.shield&&(n.upgrades.modifiers.shield={...t.upgrades.modifiers.shield}),n.upgrades.scrap=t.scrap,n.upgrades.visualDirty=!0;const i=160+n.upgrades.modifiers.maxHpBonus;if(n.combat.hpMax=i,n.combat.hp=i,n.upgrades.modifiers.shield){const o=n.upgrades.modifiers.shield;o.hp=o.hpMax,o.active=!0,o.rechargeTimer=0}const s=ZE();n.combat.ammo.sabot=Math.min(t.ammo.sabot+s.sabot,16),n.combat.ammo.heavy=Math.min(t.ammo.heavy+s.heavy,10),n.combat.mines=Math.min((t.mines||0)+s.mines,5)}const pm="neonTanks_bestRound";function eT(n){try{const e=ur();n>e&&localStorage.setItem(pm,String(n))}catch{}}function ur(){try{const n=localStorage.getItem(pm);return n&&parseInt(n,10)||0}catch{return 0}}let At=null,Kl=null,No=null,zo=null,Qi=null,ro=null,es=null;const tT=`
#main-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, rgba(4,4,16,0.75) 0%, rgba(4,4,16,0.92) 70%);
  font-family: 'Segoe UI', 'Consolas', monospace;
  transition: opacity 0.4s ease;
  pointer-events: auto;
}
#main-menu-overlay.mm-hidden {
  opacity: 0;
  pointer-events: none;
}

.mm-title {
  font-size: 72px;
  font-weight: 900;
  letter-spacing: 8px;
  color: #00ffff;
  text-shadow:
    0 0 10px rgba(0,255,255,0.8),
    0 0 30px rgba(0,255,255,0.5),
    0 0 60px rgba(0,255,255,0.3),
    0 0 100px rgba(0,255,255,0.15);
  margin-bottom: 4px;
  user-select: none;
  animation: mm-title-pulse 3s ease-in-out infinite;
}
@keyframes mm-title-pulse {
  0%, 100% { text-shadow: 0 0 10px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.3); }
  50% { text-shadow: 0 0 15px rgba(0,255,255,1), 0 0 40px rgba(0,255,255,0.7), 0 0 80px rgba(0,255,255,0.4), 0 0 120px rgba(0,255,255,0.2); }
}

.mm-subtitle {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 12px;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.6), 0 0 30px rgba(255,0,255,0.3);
  margin-bottom: 40px;
  user-select: none;
}

.mm-best-round {
  font-size: 14px;
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255,215,0,0.4);
  margin-bottom: 24px;
  letter-spacing: 2px;
  user-select: none;
}

.mm-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  min-width: 260px;
}

.mm-btn {
  width: 260px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 3px;
  border: 2px solid #00ffff;
  background: rgba(0,255,255,0.06);
  color: #00ffff;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  text-shadow: 0 0 6px rgba(0,255,255,0.4);
  box-shadow: 0 0 8px rgba(0,255,255,0.15), inset 0 0 8px rgba(0,255,255,0.05);
}
.mm-btn:hover {
  background: rgba(0,255,255,0.15);
  box-shadow: 0 0 20px rgba(0,255,255,0.3), inset 0 0 15px rgba(0,255,255,0.1);
  transform: scale(1.03);
}
.mm-btn:active {
  transform: scale(0.98);
}
.mm-btn-primary {
  border-color: #00ffff;
  font-size: 22px;
  padding: 16px 0;
}
.mm-btn-secondary {
  border-color: #445566;
  color: #88aacc;
  background: rgba(68,85,102,0.06);
  text-shadow: none;
  box-shadow: 0 0 6px rgba(68,85,102,0.1);
  font-size: 15px;
  padding: 12px 0;
}
.mm-btn-secondary:hover {
  border-color: #88aacc;
  color: #bbddee;
  background: rgba(68,85,102,0.15);
  box-shadow: 0 0 12px rgba(136,170,204,0.2);
}

/* Settings panel */
.mm-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 320px;
  max-width: 400px;
}

.mm-panel-title {
  font-size: 24px;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);
  letter-spacing: 4px;
  margin-bottom: 8px;
  user-select: none;
}

.mm-slider-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}
.mm-slider-label {
  font-size: 14px;
  color: #88aacc;
  letter-spacing: 1px;
  min-width: 110px;
  user-select: none;
}
.mm-slider-value {
  font-size: 14px;
  color: #00ffff;
  min-width: 36px;
  text-align: right;
  user-select: none;
}
.mm-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: #1a2233;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.mm-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00ffff;
  box-shadow: 0 0 6px rgba(0,255,255,0.5);
  cursor: pointer;
}
.mm-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00ffff;
  box-shadow: 0 0 6px rgba(0,255,255,0.5);
  cursor: pointer;
  border: none;
}

/* Control scheme toggle */
.mm-scheme-toggle {
  display: flex;
  width: 100%;
  border: 1px solid #334455;
  border-radius: 4px;
  overflow: hidden;
}
.mm-scheme-opt {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 1px;
  color: #667788;
  background: rgba(20,30,40,0.6);
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  user-select: none;
}
.mm-scheme-opt.active {
  color: #00ffff;
  background: rgba(0,255,255,0.1);
  text-shadow: 0 0 6px rgba(0,255,255,0.4);
}
.mm-scheme-opt:hover:not(.active) {
  color: #99bbcc;
  background: rgba(40,60,80,0.4);
}

.mm-scheme-desc {
  font-size: 12px;
  color: #556677;
  text-align: center;
  line-height: 1.5;
  user-select: none;
  min-height: 36px;
}

/* Controls panel */
.mm-controls-grid {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 6px 16px;
  width: 100%;
  max-width: 340px;
}
.mm-key {
  font-size: 13px;
  font-weight: 700;
  color: #ffd700;
  text-align: right;
  padding: 2px 0;
  user-select: none;
}
.mm-action {
  font-size: 13px;
  color: #88aacc;
  padding: 2px 0;
  user-select: none;
}

.mm-section-label {
  grid-column: 1 / -1;
  font-size: 11px;
  color: #445566;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid #1a2233;
  user-select: none;
}

.mm-version {
  position: absolute;
  bottom: 16px;
  right: 20px;
  font-size: 11px;
  color: #334455;
  letter-spacing: 1px;
  user-select: none;
}
`;function nT(){const n=document.getElementById("main-menu-overlay");if(n&&n.remove(),!document.getElementById("main-menu-styles")){const r=document.createElement("style");r.id="main-menu-styles",r.textContent=tT,document.head.appendChild(r)}At=document.createElement("div"),At.id="main-menu-overlay";const e=document.createElement("div");e.className="mm-title",e.textContent="NEON TANKS",At.appendChild(e);const t=document.createElement("div");t.className="mm-subtitle",t.textContent="BATTLE ROYALE",At.appendChild(t),ro=document.createElement("div"),ro.className="mm-best-round",At.appendChild(ro),Qi=document.createElement("div"),Qi.className="mm-buttons";const i=Jo("START RUN","mm-btn mm-btn-primary",()=>{Kl&&Kl()}),s=Jo("SETTINGS","mm-btn mm-btn-secondary",()=>ao("settings")),o=Jo("CONTROLS","mm-btn mm-btn-secondary",()=>ao("controls"));Qi.appendChild(i),Qi.appendChild(s),Qi.appendChild(o),At.appendChild(Qi),No=rT(),No.style.display="none",At.appendChild(No),zo=aT(),zo.style.display="none",At.appendChild(zo);const a=document.createElement("div");a.className="mm-version",a.textContent="v1.0",At.appendChild(a),document.body.appendChild(At),window.addEventListener("keydown",r=>{r.code==="Escape"&&At&&At.style.display!=="none"&&!At.classList.contains("mm-hidden")&&(No.style.display!=="none"||zo.style.display!=="none")&&ao("main")})}function Zl(){if(!At)return;At.style.display="flex",At.classList.remove("mm-hidden"),ao("main"),oT();const n=document.querySelector("canvas");n&&(n.style.cursor="default")}function iT(n){if(!At){n&&n();return}At.classList.add("mm-hidden");const e=document.querySelector("canvas");e&&(e.style.cursor="crosshair"),setTimeout(()=>{At.style.display="none",n&&n()},400)}function sT({onStart:n,onVolumeChange:e}){Kl=n||null,es=e||null}function ao(n){Qi.style.display=n==="main"?"flex":"none",No.style.display=n==="settings"?"flex":"none",zo.style.display=n==="controls"?"flex":"none",n==="controls"&&cT()}function oT(){const n=ur();n>0?(ro.textContent=`BEST ROUND: ${n}`,ro.style.display="block"):ro.style.display="none"}function rT(){const n=document.createElement("div");n.className="mm-panel";const e=document.createElement("div");e.className="mm-panel-title",e.textContent="SETTINGS",n.appendChild(e);const t=Si();il(n,"Master",t.masterVolume,l=>{const u=Si();u.masterVolume=l,Lo(u),es&&es(u)}),il(n,"SFX",t.sfxVolume,l=>{const u=Si();u.sfxVolume=l,Lo(u),es&&es(u)}),il(n,"Ambient",t.ambientVolume,l=>{const u=Si();u.ambientVolume=l,Lo(u),es&&es(u)});const i=document.createElement("div");i.className="mm-slider-label",i.style.textAlign="center",i.style.width="100%",i.style.marginTop="12px",i.textContent="CONTROL SCHEME",n.appendChild(i);const s=document.createElement("div");s.className="mm-scheme-toggle";const o=document.createElement("button");o.className="mm-scheme-opt"+(t.controlScheme==="arcade"?" active":""),o.textContent="ARCADE TANK";const a=document.createElement("button");a.className="mm-scheme-opt"+(t.controlScheme==="driver"?" active":""),a.textContent="DRIVER";const r=document.createElement("div");r.className="mm-scheme-desc",r.textContent=tl(t.controlScheme),o.addEventListener("click",()=>{const l=Si();l.controlScheme="arcade",Lo(l),o.classList.add("active"),a.classList.remove("active"),r.textContent=tl("arcade")}),a.addEventListener("click",()=>{const l=Si();l.controlScheme="driver",Lo(l),o.classList.remove("active"),a.classList.add("active"),r.textContent=tl("driver")}),s.appendChild(o),s.appendChild(a),n.appendChild(s),n.appendChild(r);const c=Jo("BACK","mm-btn mm-btn-secondary",()=>ao("main"));return c.style.marginTop="12px",n.appendChild(c),n}function tl(n){return n==="driver"?"W/S forward/reverse, A/D strafe. Hull faces movement direction.":"W/S forward/reverse, A/D rotate hull. Classic tank controls."}let bt=null;function aT(){const n=document.createElement("div");n.className="mm-panel";const e=document.createElement("div");e.className="mm-panel-title",e.textContent="CONTROLS",n.appendChild(e),bt=document.createElement("div"),bt.className="mm-controls-grid",n.appendChild(bt);const t=Jo("BACK","mm-btn mm-btn-secondary",()=>ao("main"));return t.style.marginTop="12px",n.appendChild(t),n}function cT(){if(!bt)return;const n=Si().controlScheme;bt.innerHTML="",nl(bt,"Movement"),n==="driver"?(wn(bt,"W / S","Forward / Reverse"),wn(bt,"A / D","Strafe Left / Right"),wn(bt,"","Hull faces move direction")):(wn(bt,"W / S","Forward / Reverse"),wn(bt,"A / D","Rotate Hull")),wn(bt,"Shift","Boost"),nl(bt,"Combat"),wn(bt,"Mouse","Aim Turret"),wn(bt,"L-Click","Fire (hold to charge HE)"),wn(bt,"1 / 2 / 3","HE / Sabot / Heavy"),wn(bt,"Q","Deploy Mine"),nl(bt,"Interface"),wn(bt,"Tab","Upgrade Panel"),wn(bt,"Arrow Keys","Fine-tune Turret")}function nl(n,e){const t=document.createElement("div");t.className="mm-section-label",t.textContent=e,n.appendChild(t)}function wn(n,e,t){const i=document.createElement("div");i.className="mm-key",i.textContent=e,n.appendChild(i);const s=document.createElement("div");s.className="mm-action",s.textContent=t,n.appendChild(s)}function Jo(n,e,t){const i=document.createElement("button");return i.className=e,i.textContent=n,i.addEventListener("click",t),i}function il(n,e,t,i){const s=document.createElement("div");s.className="mm-slider-row";const o=document.createElement("div");o.className="mm-slider-label",o.textContent=e;const a=document.createElement("input");a.className="mm-slider",a.type="range",a.min="0",a.max="100",a.value=String(Math.round(t*100));const r=document.createElement("div");r.className="mm-slider-value",r.textContent=a.value,a.addEventListener("input",()=>{r.textContent=a.value,i(parseInt(a.value)/100)}),s.appendChild(o),s.appendChild(a),s.appendChild(r),n.appendChild(s)}const uh=1,dh=16,Io=12,lT=4,C={config:{MAP_W:1920,MAP_H:1440,GRID_CELL:40,GRAVITY:30},runtime:{now:0,dt:0,paused:!1,debug:!1},run:null,match:{status:"menu",seed:Date.now(),startTime:0,playerDamageDealt:0},input:{keysDown:new Set,keysPressed:new Set},world:null,stormRing:null,entities:{player:null,enemies:[],projectiles:[],effects:[],mines:[]},ui:{hud:{message:null}}},_n=new Set,Oo=new Set,Fo=new Set,Bo=new Set;let ga=0;const ja=new Map;let _a=0,xa=!1,Xn=0,tn=null;function fh(n){xE(n.masterVolume),vE(n.sfxVolume),ME(n.ambientVolume)}function uT(){ub(),Eb(),Tb(),Jb(C),mE(),_E(),c1(),BE();const n=Mp();fh(n),nT(),sT({onStart:()=>{iT(()=>{dT()})},onVolumeChange:i=>fh(i)}),Zl(),C.run=dm(),C.run.totalStats.bestRound=ur(),HE(()=>{ah(),Sf(),Gb(),mh()}),hE(()=>{C.match.status==="defeat"?(yu(),ir(),Zl(),C.match.status="menu"):C.match.status==="victory"?xm():C.match.status==="interstitial"&&(ah(),Sf(),mh())}),Db(i=>{const s=C.entities.player;if(!(!s||s.combat.hp<=0)){if(i==="mine"){const o=Rp(C);o&&lt("mine_place",o.pos);return}(i==="he"||s.combat.ammo[i]>0)&&(s.combat.activeWeapon=i,lt("click"))}}),Vb((i,s)=>{const o=C.entities.player;if(!o||!o.upgrades)return;const a=fu(o.upgrades,i,s);if(a.success){o.upgrades.modifiers=a.newModifiers,o.upgrades.visualDirty=!0,lt("click");const r=160+o.upgrades.modifiers.maxHpBonus;r>o.combat.hpMax&&(o.combat.hp+=r-o.combat.hpMax,o.combat.hpMax=r)}});let e=performance.now();function t(i){const s=Math.min((i-e)/1e3,.05);e=i,C.runtime.dt=s,C.runtime.now+=s,C.runtime.paused||pT(s),requestAnimationFrame(t)}requestAnimationFrame(t)}function dT(){gm(!0),C.match.status="flyover",Xn=0,mm()}function mm(){tn&&(tn.remove(),tn=null),tn=document.createElement("div"),tn.style.cssText="position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:90;pointer-events:none;font-family:Segoe UI,Consolas,monospace;transition:opacity 0.6s ease;";const n=document.createElement("div");n.style.cssText="font-size:56px;font-weight:900;letter-spacing:6px;color:#00ffff;opacity:0;text-shadow:0 0 20px rgba(0,255,255,0.8),0 0 60px rgba(0,255,255,0.3);transition:opacity 0.8s ease;",n.textContent=`ROUND ${C.run.round}`,tn.appendChild(n);const e=C.run.config.mutators||[];if(e.length>0){const i=document.createElement("div");i.style.cssText="font-size:18px;margin-top:8px;letter-spacing:2px;opacity:0;transition:opacity 0.8s ease;",i.innerHTML=e.map(s=>`<span style="color:${s.color};text-shadow:0 0 6px ${s.color}">${s.name}</span>`).join(' <span style="color:#334455">|</span> '),tn.appendChild(i)}const t=document.createElement("div");t.style.cssText="position:absolute;bottom:40px;font-size:13px;color:#445566;letter-spacing:2px;opacity:0;transition:opacity 0.5s ease;",t.textContent="CLICK TO SKIP",tn.appendChild(t),document.body.appendChild(tn),setTimeout(()=>{if(!tn)return;const i=tn.children;for(let s=0;s<i.length;s++)i[s].style.opacity="1"},4e3)}function fT(){if(tn){tn.style.opacity="0";const n=tn;tn=null,setTimeout(()=>n.remove(),600)}}function hT(n){if(Xn+=n,(C.input.mousePressed||C.input.keysPressed.size>0)&&(Xn<Io?Xn=Io:Xn=dh),Xn>=dh){C.match.status="playing",fT(),Il(C);return}const e=lr(),t=C.config.MAP_W/2,i=C.config.MAP_H/2,s=1100,o=500,a=20,r=C.entities.player,l=(r?Math.atan2(r.transform.pos.x-t,r.transform.pos.z-i):0)+Math.PI;if(Xn<Io){const u=Xn/Io,d=l+u*Math.PI*2;e.position.set(t+Math.sin(d)*s,o,i+Math.cos(d)*s),e.lookAt(t,a,i)}else{const u=(Xn-Io)/lT,d=u*u*(3-2*u),f=l+Math.PI*2,p=t+Math.sin(f)*s,g=o,_=i+Math.cos(f)*s;if(r){const m=r.transform.pos,h=r.transform.yaw,v=m.x-Math.sin(h)*110,x=55,M=m.z-Math.cos(h)*110;e.position.set(p+(v-p)*d,g+(x-g)*d,_+(M-_)*d);const b=m.x+Math.sin(h)*35,y=m.y+5,w=m.z+Math.cos(h)*35;e.lookAt(t+(b-t)*d,a+(y-a)*d,i+(w-i)*d)}}sp(C),op(C,n),C.stormRing&&ap(C.stormRing,n),uu(),Il(C)}function gm(n=!0){db(),_n.clear(),Oo.clear(),Fo.clear(),Bo.clear(),ir(),tw(),kS(),n?(C.run=dm(),C.run.totalStats.bestRound=ur()):C.run.phase="playing",C.match.status="playing",C.match.seed=Date.now(),C.match.startTime=0,C.match.playerDamageDealt=0;const e={obstacleDensityMult:C.run.mutatorOverrides.obstacleDensityMult,powerupSpawnMult:C.run.mutatorOverrides.powerupSpawnMult,skillDistribution:C.run.config.skillDistribution,weaponRestriction:C.run.mutatorOverrides.weaponRestriction},t=oS(C.match.seed,e);C.world=t.worldState,C.stormRing=I1(),_a=0,xa=!1,C.entities.player=Qb(t.playerSpawn.pos),C.entities.player.upgrades=dp(),n?C.entities.player.upgrades.scrap=200:QE(C.entities.player,C.run);const i=C.run.config.aiUpgradeTier||0,s=C.run.mutatorOverrides||null;C.entities.enemies=t.enemySpawns.map((o,a)=>nw(`enemy-${a}`,o.pos,a,o.skill,i,s)),C.entities.projectiles=[],C.entities.effects=[],C.entities.mines=[],C._pendingProjectiles=[],C._pendingMines=[],C.ui.hud.message=null,Y1(C.run.mutatorOverrides.weaponRestriction||null),j1(C.run.mutatorOverrides.extraMines||!1),lE(C.run.round,C.run.config.mutators),C.run._playerDroppedBelow80=!1,C.run.roundStats._firstBloodPlayer=!1,C.run.roundStats._ricochetKill=!1,C.run.roundStats._minesDestroyed=0,C.run._firstKillHappened=!1,kw(),ga=C.entities.player.combat.hp,ja.clear();for(const o of C.entities.enemies)ja.set(o.id,o.combat.hp);for(const o of C.world.obstacles)xb(o),_n.add(o.id);for(const o of C.world.powerups)rp(o),_n.add(o.id);gb(C.entities.player),_n.add(C.entities.player.render.rootId);for(const o of C.entities.enemies)_b(o),_n.add(o.render.rootId)}function zt(n){const e=performance.now();if(zt._prev){const t=e-zt._prev;t>50&&console.warn(`[FREEZE] ${zt._label} took ${t.toFixed(1)}ms`)}zt._prev=e,zt._label=n}zt._prev=0;zt._label="";function pT(n){var c,l,u,d,f,p,g;const e=C.match.status;if(e==="menu"){mT(n);return}if(e==="flyover"){hT(n);return}if(e==="interstitial"){ol(n);return}if(e==="victory"||e==="defeat"){ET(),ol(n);return}zt("start"),C.match.startTime+=n;const t=C.entities.player?C.entities.player.combat.hp:0;if(C.stormRing){if(N1(C,n,C.stormRing),C.stormRing.warningActive&&!xa&&(lt("storm_warning"),xa=!0),C.stormRing.warningActive||(xa=!1),iE(C.stormRing.timer,C.stormRing.warningActive),_a+=n,_a>=uh){_a-=uh;const _=O1(C.stormRing),m=C.entities.player;m&&m.combat.hp>0&&!xs(m.transform.pos,C.stormRing)&&(m.combat.hp-=_,m.combat.lastDamageFrom="__storm__",df(m.transform.pos),lt("storm_damage",m.transform.pos));for(const h of C.entities.enemies)h.combat.hp<=0||xs(h.transform.pos,C.stormRing)||(h.combat.hp-=_,h.combat.lastDamageFrom||(h.combat.lastDamageFrom="__storm__"),df(h.transform.pos))}if(C.entities.player&&C.entities.player.combat.hp>0){const _=C.entities.player.transform.pos,m=_.x-C.stormRing.center.x,h=_.z-C.stormRing.center.z,v=Math.sqrt(m*m+h*h),x=v>.1?{x:m/v,z:h/v}:{x:1,z:0},M={x:C.stormRing.center.x+x.x*C.stormRing.radius,y:10,z:C.stormRing.center.z+x.z*C.stormRing.radius};lt("storm_ambient",M,{ringRadius:C.stormRing.radius,ringCenter:C.stormRing.center,playerPos:_})}}zt("storm"),C.input.mouseOverUI=lp()||xp(),e1(C,n);const i=((l=(c=C.run)==null?void 0:c.mutatorOverrides)==null?void 0:l.hpRegenAll)||0;if(i>0){const _=C.entities.player;_&&_.combat.hp>0&&(_.combat.hp=Math.min(_.combat.hp+i*n,_.combat.hpMax));for(const m of C.entities.enemies)m.combat.hp>0&&(m.combat.hp=Math.min(m.combat.hp+i*n,m.combat.hpMax))}for(const _ of C.entities.enemies)_.combat.hp<=0||_.upgrades&&mp(_,n);if(C.input.keysPressed.has("KeyQ")){const _=Rp(C);_&&lt("mine_place",_.pos)}const s=C1(C,n);for(const _ of s)_.type==="armed"?lt("mine_arm",_.pos):_.type==="exploded"&&(lt("mine_explode",_.pos),wl(_.pos,"he",20),Go(.5,.2));zt("player"),aw(C,n),zt("enemyAI"),_T(),xT();{const _=C.input.mouseOverUI,m=C.entities.player;let h=!1;m&&m.charge&&m.charge._forcefire&&(m.charge._forcefire=!1,h=!0);const v=m?m.combat.activeWeapon:"he",x=(d=(u=Hn[v])==null?void 0:u.charge)==null?void 0:d.enabled;if(!h&&!x&&C.input.mousePressed&&!_&&(h=!0),!h&&C.input.keysPressed.has("Space")&&(h=!0),h&&m&&m.combat.hp>0&&x1(C)){const b=m.combat.activeWeapon,y=m.transform.yaw+m.turret.yaw,w=Math.cos(m.turret.pitch),P={x:m.transform.pos.x+Math.sin(y)*w*21,y:12+Math.sin(m.turret.pitch)*21,z:m.transform.pos.z+Math.cos(y)*w*21};lt("fire",P,{weapon:b}),Go(.3+(b==="heavy"?.2:0),.15),Fp(P,C)}}if(ST(),zt("enemyProj+Mines"),v1(C,n),S1(C),C.run&&C.entities.mines)for(const _ of C.entities.mines)_._triggeredByProjectile&&_.alive&&_.owner!=="player"&&_._triggerProjectileOwner==="player"&&(C.run.roundStats._minesDestroyed=(C.run.roundStats._minesDestroyed||0)+1);const o=P1(C);for(const _ of o)lt("mine_explode",_.pos),wl(_.pos,"he",20),Go(.5,.2);const a=b1(C.entities.projectiles);for(const _ of a)Gy(_.pos),lt("ricochet",_.pos);vT(C);const r=new Set;if(C.world&&C.world.powerups)for(const _ of C.world.powerups)_.active&&r.add(_.id);if(zt("projectiles+mines"),Uw(C),C.world&&C.world.powerups)for(const _ of C.world.powerups)!_.active&&r.has(_.id)&&(_.type==="health_pack"?lt("health_pickup",_.pos):lt("powerup",_.pos),_.isLoot?Wy({x:_.pos.x,y:6,z:_.pos.z},((f=_.render)==null?void 0:f.color)||"#ffffff"):mt("powerupSparkle",{x:_.pos.x,y:6,z:_.pos.z}));if(Z1(C,n),MT(C),zt("collisions+powerups"),yT(C,t),C.world&&C.world.powerups){for(const _ of C.world.powerups)if(!_.active&&r.has(_.id)){const m=_m(_.pos,C);if(m&&m.upgrades){const h=((g=(p=C.run)==null?void 0:p.mutatorOverrides)==null?void 0:g.scrapMult)||1,v=Math.round(du.powerup*h);m.upgrades.scrap+=v,C.run&&m===C.entities.player&&(C.run.roundStats.scrapEarned+=v)}}}for(const _ of C.entities.enemies)_.combat.hp<=0||_.ai.state==="CHASE"&&_.ai.stateTime<n*2&&lt("alert",_.transform.pos);if(T1(C,n),A1(C),zt("damageEvents+scrap"),Cw(C),gT(),C.entities.player&&d1(C.entities.player,n),C.entities.player){const _=C.entities.player,m=_.physics.vel,h=Math.sqrt(m.x*m.x+m.z*m.z);lt("engine",_.transform.pos,{speed:h}),yE(_.transform.pos.x,_.transform.pos.y+10,_.transform.pos.z)}wT(),pS(),zt("cleanup+sync+fx"),ol(n),zt("render"),Il(C),zt._prev=0}let sl=0;function mT(n){sl+=n*.15;const e=lr(),t=C.config.MAP_W/2,i=C.config.MAP_H/2,s=600;e.position.set(t+Math.cos(sl)*s,350,i+Math.sin(sl)*s),e.lookAt(t,0,i),uu()}function ol(n){if(sp(C),op(C,n),pb(C),C.stormRing){ap(C.stormRing,n);const e=C.entities.player,t=e&&e.combat.hp>0&&!xs(e.transform.pos,C.stormRing);Ab(!!t,n)}o1(lr(),C.entities.player,n),gE(C,n),uu()}function gT(){for(const t of C.entities.projectiles)t.alive&&!Oo.has(t.render.rootId)&&(vb(t),Oo.add(t.render.rootId));const n=new Set;for(const t of C.entities.projectiles)t.alive&&n.add(t.render.rootId);for(const t of Oo)n.has(t)||(rs(t),Oo.delete(t));for(const t of C.entities.effects)t.alive&&!Bo.has(t.render.rootId)&&(t.type==="explosion"?Mb(t):t.type==="muzzleFlash"&&yb(t),Bo.add(t.render.rootId));const e=new Set;for(const t of C.entities.effects)t.alive&&e.add(t.render.rootId);for(const t of Bo)e.has(t)||(rs(t),Bo.delete(t));if(C.entities.mines){for(const i of C.entities.mines)i.alive&&!Fo.has(i.id)&&(bb(i),Fo.add(i.id));const t=new Set;for(const i of C.entities.mines)i.alive&&t.add(i.id);for(const i of Fo)t.has(i)||(rs(i),Fo.delete(i))}for(const t of C.entities.enemies)t.combat.hp<=0&&_n.has(t.render.rootId)&&(rs(t.render.rootId),_n.delete(t.render.rootId));if(C.world&&C.world.powerups)for(const t of C.world.powerups)t.active&&!_n.has(t.id)&&(rp(t),_n.add(t.id)),!t.active&&_n.has(t.id)&&(rs(t.id),_n.delete(t.id))}function _T(){if(!(!C._pendingProjectiles||C._pendingProjectiles.length===0)){for(const n of C._pendingProjectiles){const e=bp(n.ownerId,n.weapon,n.pos,n.vel);C.entities.projectiles.push(e);const t=`fx-emz-${C.runtime.now.toFixed(3)}-${Math.random().toString(36).slice(2,6)}`;C.entities.effects.push({id:t,type:"muzzleFlash",pos:{x:n.pos.x,y:n.pos.y,z:n.pos.z},t:0,duration:.3,alive:!0,render:{rootId:t}}),lt("fire",n.pos,{weapon:n.weapon}),Fp(n.pos,C,n.ownerId)}C._pendingProjectiles=[]}}function xT(){if(!(!C._pendingMines||C._pendingMines.length===0)){for(const n of C._pendingMines){const e=R1(C,n.ownerId,n.pos);e&&lt("mine_place",e.pos)}C._pendingMines=[]}}function vT(n){var e;if(!(!n.world||!n.world.obstacles))for(const t of n.entities.effects){if(t.type!=="explosion"||t._obstacleProcessed)continue;t._obstacleProcessed=!0;const i=((e=t.render)==null?void 0:e.splashRadius)||18,s=34;for(let o=n.world.obstacles.length-1;o>=0;o--){const a=n.world.obstacles[o];if(!a.destructible||a.hp<=0)continue;const r=(a.aabb.min.x+a.aabb.max.x)/2,c=(a.aabb.min.z+a.aabb.max.z)/2,l=t.pos.x-r,u=t.pos.z-c,d=Math.sqrt(l*l+u*u),f=i+10;if(d<f){const p=Math.max(0,1-d/f),g=Math.round(s*p);g>0&&fS(a,g,n)}}if(lt("explosion",t.pos,{radius:i}),n.entities.player){const o=t.pos.x-n.entities.player.transform.pos.x,a=t.pos.z-n.entities.player.transform.pos.z,r=Math.sqrt(o*o+a*a);if(r<200){const c=Math.max(.1,1-r/200);Go(c,.25)}}}}function MT(n){var t,i,s;const e=hS();for(const o of e){const a=(o.aabb.min.x+o.aabb.max.x)/2,r=o.aabb.max.y/2,c=(o.aabb.min.z+o.aabb.max.z)/2,l={x:a,y:r,z:c};mt("destructionDebris",l,{color:((t=o.render)==null?void 0:t.color)||"#ffaa44"}),mt("smoke",l);const u=_m(l,n);if(u&&u.upgrades){const d=((s=(i=n.run)==null?void 0:i.mutatorOverrides)==null?void 0:s.scrapMult)||1,f=Math.round(du.obstacleDestroy*d);u.upgrades.scrap+=f,n.run&&u===n.entities.player&&(n.run.roundStats.scrapEarned+=f)}lt("explosion",l,{radius:12}),_n.has(o.id)&&(rs(o.id),_n.delete(o.id))}}function yT(n,e){var o,a,r;const t=n.entities.player,i=lr();if(t&&t.combat.hp<e){const c=e-t.combat.hp;l1(),Go(.8,.3);const l=t.combat.lastDamageFrom;if(l&&l!=="__storm__"){const u=hh(l,n);if(u&&u.combat.hp>0){const d=u.transform.pos.x-t.transform.pos.x,f=u.transform.pos.z-t.transform.pos.z,g=Math.atan2(d,f)-t.transform.yaw;u1(g)}}oh(window.innerWidth/2+(Math.random()-.5)*80,window.innerHeight/2-40,c,"player"),n.run&&t.combat.hp<t.combat.hpMax*.8&&(n.run._playerDroppedBelow80=!0)}t&&(ga=t.combat.hp);const s=[...n.entities.enemies];for(const c of s){const l=ja.get(c.id)??c.combat.hpMax,u=c.combat.hp;if(u<l&&u>0){const d=l-u;c.combat.lastDamageFrom==="player"&&(n.match.playerDamageDealt+=d);const f=bT(c.transform.pos,i);if(f){const p=d>50?"critical":"normal";oh(f.x+(Math.random()-.5)*40,f.y-20,d,p)}}if(u<=0&&l>0){c.combat.lastDamageFrom==="player"&&(n.match.playerDamageDealt+=l);const d=c.combat.lastDamageFrom||"__storm__";if(d!=="__storm__"){const m=hh(d,n);if(m&&m.upgrades){const h=((a=(o=n.run)==null?void 0:o.mutatorOverrides)==null?void 0:a.scrapMult)||1,v=Math.round(du.kill*h);m.upgrades.scrap+=v,n.run&&m===n.entities.player&&(n.run.roundStats.scrapEarned+=v)}}const f=c.combat.lastDamageFrom||"__storm__",p=ph(f,n),g=c.name||c.id,_=((r=c.render)==null?void 0:r.color)||"#aaaaaa";if(ih(p.name,g,p.color,_),lt("elimination",c.transform.pos),n.run&&!n.run._firstKillHappened&&(n.run._firstKillHappened=!0,f==="player"&&(n.run.roundStats._firstBloodPlayer=!0)),f==="player"&&(rE(),n.run&&(n.run.roundStats.kills++,c.combat.lastDamageBounceCount>0&&(n.run.roundStats._ricochetKill=!0))),c.combat&&n.world&&n.world.powerups){const m=Q1(c.transform.pos,c.combat,c.upgrades);n.world.powerups.push(...m)}ff(c.transform.pos),mt("explosion",c.transform.pos,{radius:12}),mt("smoke",c.transform.pos)}ja.set(c.id,u)}if(t&&t.combat.hp<=0&&ga>0){const c=t.combat.lastDamageFrom||"__storm__",l=ph(c,n);ih(l.name,"Player",l.color,"#00ffff"),lt("elimination",t.transform.pos),ff(t.transform.pos)}t&&(ga=t.combat.hp)}function _m(n,e){let t=null,i=1/0;const s=25*25,o=e.entities.player;if(o&&o.combat.hp>0){const a=n.x-o.transform.pos.x,r=n.z-o.transform.pos.z,c=a*a+r*r;c<s&&c<i&&(i=c,t=o)}for(const a of e.entities.enemies){if(a.combat.hp<=0)continue;const r=n.x-a.transform.pos.x,c=n.z-a.transform.pos.z,l=r*r+c*c;l<s&&l<i&&(i=l,t=a)}return t}function hh(n,e){if(n==="player")return e.entities.player;for(const t of e.entities.enemies)if(t.id===n)return t;return null}function ph(n,e){var t;if(n==="__storm__")return{name:"The Storm",color:"#00aaff"};if(n==="player")return{name:"Player",color:"#00ffff"};for(const i of e.entities.enemies)if(i.id===n)return{name:i.name||i.id,color:((t=i.render)==null?void 0:t.color)||"#ff3344"};return{name:n,color:"#ff3344"}}function bT(n,e){if(!e)return null;const t=n.x,i=(n.y||0)+6,s=n.z,o={x:t,y:i,z:s},a=new Float32Array(4),c=e.projectionMatrix.clone().multiply(e.matrixWorldInverse).elements;if(a[0]=c[0]*o.x+c[4]*o.y+c[8]*o.z+c[12],a[1]=c[1]*o.x+c[5]*o.y+c[9]*o.z+c[13],a[3]=c[3]*o.x+c[7]*o.y+c[11]*o.z+c[15],a[3]<=0)return null;const l=a[0]/a[3],u=a[1]/a[3];return{x:(l*.5+.5)*window.innerWidth,y:(-u*.5+.5)*window.innerHeight}}function ST(){const n=C.entities.player;if(!n)return;const e=n.combat.activeWeapon;C.input.keysPressed.has("Digit1")?n.combat.activeWeapon="he":C.input.keysPressed.has("Digit2")&&n.combat.ammo.sabot>0?n.combat.activeWeapon="sabot":C.input.keysPressed.has("Digit3")&&n.combat.ammo.heavy>0&&(n.combat.activeWeapon="heavy"),n.combat.activeWeapon!==e&&lt("click");const t=n.combat.activeWeapon;t!=="he"&&n.combat.ammo[t]<=0&&(n.combat.activeWeapon="he")}function wT(){if(C.match.status!=="playing")return;if(Lw(C)){C.match.status="defeat",ir(),lt("defeat"),C.run.roundStats.timeSurvived=C.match.startTime,C.run.roundStats.damageDealt=C.match.playerDamageDealt,C.run.totalStats.kills+=C.run.roundStats.kills,C.run.totalStats.damageDealt+=C.run.roundStats.damageDealt,C.run.totalStats.totalScrapEarned+=C.run.roundStats.scrapEarned,C.run.active=!1,eT(C.run.totalStats.roundsCompleted),uE({roundsCompleted:C.run.totalStats.roundsCompleted,kills:C.run.totalStats.kills,damageDealt:C.run.totalStats.damageDealt,totalScrapEarned:C.run.totalStats.totalScrapEarned,bestRound:Math.max(C.run.totalStats.roundsCompleted,ur())});return}Pw(C)===0&&(C.match.status="victory",ir(),lt("victory"),C.run.roundStats.timeSurvived=C.match.startTime,C.run.roundStats.damageDealt=C.match.playerDamageDealt,C.run.roundStats.kills=Yl(),TT(),cE({kills:Yl(),damageDealt:C.match.playerDamageDealt,survivalTime:C.match.startTime},C.run.round),setTimeout(()=>{C.match.status==="victory"&&xm()},1500))}function mh(){const n=C.entities.player;n&&C.run&&JE(C.run,n),gm(!1),C.match.status="flyover",Xn=0,mm()}function xm(){var d;if(C.match.status!=="victory")return;const n=C.entities.player,e=C.run.round,t=C.run.roundStats.scrapEarned,i=C.run.roundStats.bonusCompleted||!1,s=C.run.config.bonusObjective,o=Yl(),a=C.match.playerDamageDealt,r=C.match.startTime,c=fm(e),l=Math.floor((((d=n.upgrades)==null?void 0:d.scrap)||0)*.5);KE(C.run,n),n.upgrades.scrap=C.run.carryover.scrap;const u={round:e,roundStats:{kills:o,damageDealt:a,timeSurvived:r,scrapEarned:t,bonusCompleted:i},scrapBreakdown:{earned:t,carryover:l,bonus:c,total:C.run.carryover.scrap},bonusObjective:s?{description:s.description,scrapReward:s.scrapReward,completed:i}:null,nextRound:{number:C.run.round,difficulty:Math.min(C.run.round,10),mutators:(C.run.config.mutators||[]).map(f=>({name:f.name,description:f.description,color:f.color})),bonusObjective:C.run.config.bonusObjective?{description:C.run.config.bonusObjective.description,scrapReward:C.run.config.bonusObjective.scrapReward}:null}};C.match.status="interstitial",yu(),kE(u)}function ET(){C.input.keysPressed.has("KeyR")&&C.match.status==="defeat"&&(yu(),ir(),Zl(),C.match.status="menu")}function TT(){if(!C.run)return;const n=C.run.config.bonusObjective;if(!n)return;let e=!1;switch(n.id){case"first_blood":e=!!C.run.roundStats._firstBloodPlayer;break;case"untouched":e=!C.run._playerDroppedBelow80;break;case"ricochet_kill":e=!!C.run.roundStats._ricochetKill;break;case"mine_sweep":e=(C.run.roundStats._minesDestroyed||0)>=3;break;case"speed_demon":e=C.stormRing&&C.stormRing.phase<3;break}if(C.run.roundStats.bonusCompleted=e,e){C.run.roundStats.scrapEarned+=n.scrapReward;const t=C.entities.player;t&&t.upgrades&&(t.upgrades.scrap+=n.scrapReward)}}window.addEventListener("keydown",n=>{n.code==="KeyP"&&(C.runtime.debug=!C.runtime.debug),n.code==="Tab"&&(n.preventDefault(),(C.match.status==="playing"||C.match.status==="interstitial")&&_p())});uT();
