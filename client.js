import {isMiniCodeExpired} from './mini-code.js';
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu()});
document.querySelector('[data-language]').addEventListener('change',event=>{location.assign(event.target.value+location.hash)});
let opener;
const mini=document.querySelector('#mini');
function updateMiniCode(){
  if(!mini.dataset.expiresAt)return;
  const expired=isMiniCodeExpired(mini.dataset.expiresAt);
  mini.querySelector('[data-mini-active]').hidden=expired;
  mini.querySelector('[data-mini-expired]').hidden=!expired;
}
updateMiniCode();
document.addEventListener('visibilitychange',updateMiniCode);
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{
  updateMiniCode();
  opener=button;closeMenu();const dialog=document.getElementById(button.dataset.open);dialog.showModal();document.body.classList.add('dialog-open');
  const video=dialog.querySelector('video');if(video&&!video.getAttribute('src')){video.src=video.dataset.src;video.load()}
}));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const focusable=[...dialog.querySelectorAll('button,a[href],video[controls],[tabindex="0"]')].filter(el=>el.checkVisibility()&&!el.disabled);
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
  dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();document.body.classList.remove('dialog-open');opener?.focus()});
});
const video=document.querySelector('video');
const error=document.querySelector('.video-error');
video.addEventListener('error',()=>{error.hidden=false});
video.addEventListener('loadeddata',()=>{error.hidden=true});
document.querySelector('[data-retry]').addEventListener('click',()=>{error.hidden=true;video.load()});

const examples=[...document.querySelectorAll('[data-example]')];
function selectExample(button){
  examples.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected});
  history.replaceState(null,'','#'+button.getAttribute('aria-controls'));
}
const initialExample=examples.find(button=>'#'+button.getAttribute('aria-controls')===location.hash);
if(initialExample)selectExample(initialExample);
examples.forEach((button,index)=>{
  button.addEventListener('click',()=>selectExample(button));
  button.addEventListener('keydown',event=>{
    const next=event.key==='Home'?0:event.key==='End'?examples.length-1:['ArrowDown','ArrowRight'].includes(event.key)?(index+1)%examples.length:['ArrowUp','ArrowLeft'].includes(event.key)?(index+examples.length-1)%examples.length:null;
    if(next===null)return;
    event.preventDefault();selectExample(examples[next]);examples[next].focus();
  });
});
