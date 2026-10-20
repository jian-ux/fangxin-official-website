import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const client=await readFile(new URL('../client.js',import.meta.url),'utf8');
const playerCode=client.slice(client.indexOf("document.querySelectorAll('.film-player')"),client.indexOf('const examples='));
// Exercise the real controller, including browser playback refusal and media errors.
for(const rejected of [false,true]){
  const events={},cover={hidden:true,addEventListener:(name,fn)=>{events['cover-'+name]=fn}};
  const video={controls:true,focused:false,play:()=>rejected?Promise.reject(Error('Blocked')):Promise.resolve(),focus(){this.focused=true},addEventListener:(name,fn)=>{events[name]=fn}};
  const player={querySelector:selector=>selector==='video'?video:cover};
  runInNewContext(playerCode,{document:{querySelectorAll:()=>[player]}});
  assert.equal(cover.hidden,false);
  assert.equal(video.controls,false);
  events['cover-click']();
  await Promise.resolve();
  assert(cover.hidden&&video.controls&&video.focused,'Playback and refusal must retain accessible native controls');
  cover.hidden=false;video.controls=false;
  events.error();
  assert(cover.hidden&&video.controls,'Media errors must not leave an unusable overlay');
}
console.log('PASS: film covers support playback, rejected playback, focus and native error fallback.');
