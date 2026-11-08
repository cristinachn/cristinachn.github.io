/* Renders the parts shared by every page: sky layers, header, footer and toast.
   Each page declares data-root ("" for the site root, "../" inside /projects) and data-page ("home" or "project").
   Edit navigation links or footer text here once and every page updates. */
(function(){
  const b=document.body,root=b.dataset.root||'',home=b.dataset.page==='home';
  const base=home?'':root+'index.html';
  const links=[['experience','Experience'],['education','Education'],['projects','Projects'],['toolkit','Toolkit'],['interests','Interests']];
  const desk=links.map(([id,t])=>`<a class="hover:text-white" href="${base}#${id}">${t}</a>`).join('');
  const mob=links.map(([id,t])=>`<a href="${base}#${id}">${t}</a>`).join('');

  b.insertAdjacentHTML('afterbegin',(home?'<div class="photo-bg" aria-hidden="true"></div>':'')+'<canvas id="sky" aria-hidden="true"></canvas><div class="atmos" aria-hidden="true"></div><div class="moon" aria-hidden="true"></div>');

  const header=document.createElement('header');
  header.className='sticky top-0 z-50 glass';
  header.innerHTML=`
  <nav class="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between" aria-label="Main">
    <a href="${base}#top" class="font-bold tracking-tight text-lg flex items-center gap-2"><span class="w-3 h-3 bg-[#ffb347] shadow-[0_0_12px_2px_rgba(255,179,71,.7)]"></span>Cristina Chen</a>
    <div class="hidden md:flex gap-6 text-sm text-[#a9b5cb]">${desk}</div>
    <div class="flex items-center gap-2">
      <a href="${base}#contact" class="btn btn-amber !py-2">Get in touch</a>
      <button id="menuBtn" class="md:hidden btn btn-ghost !p-2" aria-label="Open menu" aria-expanded="false"><i data-lucide="menu" class="w-5 h-5"></i></button>
    </div>
  </nav>
  <div id="menu" class="hidden md:hidden border-t border-[color:var(--line)] px-5 py-3 grid gap-3 text-sm">${mob}</div>`;
  document.getElementById('site-header').replaceWith(header);

  const footer=document.createElement('footer');
  footer.className='max-w-6xl mx-auto px-5 py-10 text-sm text-[#8d99b0] flex flex-wrap justify-between gap-2';
  footer.innerHTML='<span>&copy; 2026 Cristina Chen</span><span>Built under a Minecraft night sky.</span>';
  document.getElementById('site-footer').replaceWith(footer);

  b.insertAdjacentHTML('beforeend','<div id="toast" class="glass rounded px-4 py-2 text-sm flex items-center gap-2" role="status" aria-live="polite"><i data-lucide="check" class="w-4 h-4 text-[#ffb347]"></i><span>Email copied to clipboard</span></div>');
})();
