import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=new URL('../',import.meta.url);
const animation=fileURLToPath(new URL('assets/xiaoli-greeting.webp',root));
execFileSync('ffmpeg',[
  '-hide_banner','-loglevel','error','-y',
  '-i',fileURLToPath(new URL('assets/welcome.mp4',root)),
  '-an','-vf','trim=start_frame=21:end_frame=85,setpts=PTS-STARTPTS,fps=24,scale=416:416:flags=lanczos,pad=480:480:32:32:color=0xe7e3e0',
  '-c:v','libwebp_anim','-quality','82','-compression_level','6','-loop','0',animation,
],{stdio:'inherit'});

const encoded=readFileSync(animation);
assert.equal(encoded.toString('ascii',0,4),'RIFF');
assert.equal(encoded.toString('ascii',8,12),'WEBP');
let first;
for(let offset=12;offset+8<=encoded.length;){
  const size=encoded.readUInt32LE(offset+4);
  assert(offset+8+size<=encoded.length,'Truncated WebP chunk');
  if(encoded.toString('ascii',offset,offset+4)==='ANMF'){
    first=Buffer.from(encoded.subarray(offset,offset+8+size+(size%2)));
    break;
  }
  offset+=8+size+(size%2);
}
assert(first,'Missing animation frame');
assert.equal(first.readUIntLE(8,3),0);
assert.equal(first.readUIntLE(11,3),0);
assert.equal(first.readUIntLE(14,3)+1,480);
assert.equal(first.readUIntLE(17,3)+1,480);

// Reuse the exact encoded first frame for rest and poster: no double hand or recompression seam.
const rest=Buffer.from(first);
rest.writeUIntLE(5000,20,3);
rest[23]=2; // Full-canvas replacement, without blending or disposal.
const loop=Buffer.concat([encoded,rest]);
loop.writeUInt32LE(loop.length-8,4);
writeFileSync(animation,loop);

const payload=first.subarray(24,8+first.readUInt32LE(4));
assert.equal(payload.toString('ascii',0,4),'VP8 ','Expected an opaque lossy keyframe');
const header=Buffer.alloc(12);
header.write('RIFF');header.writeUInt32LE(payload.length+4,4);header.write('WEBP',8);
writeFileSync(new URL('assets/xiaoli-greeting-poster.webp',root),Buffer.concat([header,payload]));
console.log(`Built Xiaoli loop: ${loop.length} bytes; original 24fps motion and a five-second rest.`);
