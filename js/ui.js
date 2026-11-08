/* Shared setup, menu and copy email. Loaded first because other scripts use `reduce`. */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(window.lucide)lucide.createIcons();

/* Menu */
const mb=document.getElementById('menuBtn'),mn=document.getElementById('menu');
mb.onclick=()=>{const o=mn.classList.toggle('hidden');mb.setAttribute('aria-expanded',String(!o))};
mn.querySelectorAll('a').forEach(a=>a.onclick=()=>{mn.classList.add('hidden');mb.setAttribute('aria-expanded','false')});

/* Copy email + toast */
const toast=document.getElementById('toast'),tmsg=toast.querySelector('span');let tt;
function show(m){tmsg.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200)}
const cm=document.getElementById('copyMail');
if(cm)cm.onclick=async e=>{
  const v=e.currentTarget.dataset.email;
  try{await navigator.clipboard.writeText(v);show('Email copied to clipboard')}
  catch(_){const t=document.createElement('textarea');t.value=v;document.body.appendChild(t);t.select();
    try{document.execCommand('copy');show('Email copied to clipboard')}catch(__){show('Copy failed. Use '+v)}t.remove()}
};

/* Contents highlight on project pages */
const tocLinks=[...document.querySelectorAll('.toc a')];
if(tocLinks.length&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)tocLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-25% 0px -65% 0px'});
  tocLinks.forEach(a=>{const t=document.querySelector(a.getAttribute('href'));if(t)io.observe(t)});
}
