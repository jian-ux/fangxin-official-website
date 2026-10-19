import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const code=await readFile(new URL('../xiaoli-greeting.js',import.meta.url),'utf8');
for(const reduced of [false,true]){
  const events={};let enter,source='/assets/xiaoli-greeting-poster.webp',writes=0;
  const image={getAttribute:()=>source,get src(){return source},set src(value){writes++;source=value},addEventListener:(key,fn)=>{events[key]=fn}};
  const motion={matches:reduced,addEventListener:(key,fn)=>{events.motion=fn}};
  const root={querySelector:()=>image};
  const document={hidden:false,querySelector:()=>root,addEventListener:(key,fn)=>{events.visibility=fn}};
  runInNewContext(code,{document,matchMedia:()=>motion,IntersectionObserver:class{constructor(fn){enter=fn}observe(){}}});
  assert.equal(writes,0);
  enter([{isIntersecting:true}]);
  if(reduced){assert.equal(writes,0);continue}
  assert.equal(source,'/assets/xiaoli-greeting.webp');assert.equal(writes,1);
  for(let i=0;i<5;i++){enter([{isIntersecting:true}]);events.visibility()}
  assert.equal(writes,1,'Visible playback must keep one image source, with no reload per cycle');
  document.hidden=true;events.visibility();assert.equal(source,'/assets/xiaoli-greeting-poster.webp');
  document.hidden=false;events.visibility();assert.equal(source,'/assets/xiaoli-greeting.webp');
  enter([{isIntersecting:false}]);assert.equal(source,'/assets/xiaoli-greeting-poster.webp');
  enter([{isIntersecting:true}]);motion.matches=true;events.motion();assert.equal(source,'/assets/xiaoli-greeting-poster.webp');
  motion.matches=false;events.motion();assert.equal(source,'/assets/xiaoli-greeting.webp');
  events.error();assert.equal(source,'/assets/xiaoli-greeting-poster.webp');
  const failedWrites=writes;events.error();events.visibility();assert.equal(writes,failedWrites,'Image failure must not cause a retry loop');
}
const webp=await readFile(new URL('../assets/xiaoli-greeting.webp',import.meta.url));
assert.equal(webp.toString('ascii',12,16),'VP8X');
let frames=0,loops,duration=0,rest=0,firstFrame,lastFrame;
for(let offset=12;offset+8<=webp.length;){
  const type=webp.toString('ascii',offset,offset+4),size=webp.readUInt32LE(offset+4);
  if(type==='ANIM')loops=webp.readUInt16LE(offset+12);
  if(type==='ANMF'){
    frames++;const ms=webp.readUIntLE(offset+20,3);duration+=ms;rest=Math.max(rest,ms);
    const frame=webp.subarray(offset,offset+8+size);firstFrame??=frame;lastFrame=frame;
  }
  offset+=8+size+(size%2);
}
assert.equal(loops,0,'Auto wave loops inside the image, without JavaScript replay');
assert(frames>=60&&duration>=7600&&duration<=7800,'Preserve the source wave and smooth return');
assert(rest>=4900&&rest<=5100,'Rest five seconds between greetings');
assert.equal(lastFrame.readUIntLE(20,3),5000,'The final frame is the five-second rest');
assert.equal(lastFrame[23],2,'Rest replaces the full image without blending or disposal');
assert(firstFrame.subarray(24).equals(lastFrame.subarray(24)),'First and resting frame must use identical encoded image data');
const poster=await readFile(new URL('../assets/xiaoli-greeting-poster.webp',import.meta.url));
assert(poster.subarray(12).equals(firstFrame.subarray(24)),'Poster must use the same encoded first frame');
for(const lang of ['zh','en','ru']){
  const html=await readFile(new URL(`../dist/${lang}/xiaoli/index.html`,import.meta.url),'utf8');
  assert(html.includes('<div class="greeting-avatar"><img'),'Automatic greeting is not a click control');
  const greeting={zh:'Hi，我是小黎',en:"Hi, I'm Xiaoli",ru:'Привет, я Сяоли'}[lang];
  assert.equal((html.match(/class="greeting-letter"/g)||[]).length,Array.from(greeting).length,'Each character gets its own reveal without changing layout');
  assert(html.includes('class="sr-only"')&&html.includes('animation-delay:200ms'),'Keep accessible text and stagger the reveal');
}
console.log('PASS: automatic wave, identical first/rest/poster data, five-second rest, stable source, visibility/reduced-motion handling and failure fallback.');
