const greeting=document.querySelector('[data-greeting]');
if(greeting){
  const image=greeting.querySelector('img');
  const poster=image.getAttribute('src');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  let failed=false;
  function update(){
    const source=visible&&!document.hidden&&!motion.matches&&!failed
      ?'/assets/xiaoli-greeting.webp':poster;
    // The WebP contains its own rest and seamless loop; never reload it each cycle.
    if(image.getAttribute('src')!==source)image.src=source;
  }
  image.addEventListener('error',()=>{failed=true;update()});
  const observer=new IntersectionObserver(entries=>{
    visible=entries.some(entry=>entry.isIntersecting);
    update();
  },{threshold:.5});
  observer.observe(greeting);
  motion.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
}
