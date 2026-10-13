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
document.getElementById('copyMail').onclick=async e=>{
  const v=e.currentTarget.dataset.email;
  try{await navigator.clipboard.writeText(v);show('Email copied to clipboard')}
  catch(_){const t=document.createElement('textarea');t.value=v;document.body.appendChild(t);t.select();
    try{document.execCommand('copy');show('Email copied to clipboard')}catch(__){show('Copy failed. Use '+v)}t.remove()}
};
