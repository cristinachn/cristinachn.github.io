/* Character: the supplied Minecraft skin rendered as a CSS 3D voxel model */
const SKIN=new URL('assets/skin.png',document.baseURI).href;  // resolved from the page, not the stylesheet
const S=14,ARM=3;
const stage=document.getElementById('stage'),tilt=document.getElementById('tilt'),rig=document.getElementById('rig'),model=document.getElementById('model');
model.style.setProperty('--skin','url('+SKIN+')');
const mk=(c,x=0,y=0)=>{const d=document.createElement('div');d.className=c;if(x||y)d.style.transform=`translate3d(${x*S}px,${y*S}px,0)`;return d};
function face(rw,rh,ru,rv,ew,eh,tf){
  const f=mk('fc'),sx=ew/rw,sy=eh/rh;
  f.style.cssText=`width:${ew*S}px;height:${eh*S}px;margin:${-eh*S/2}px 0 0 ${-ew*S/2}px;background-size:${64*S*sx}px ${64*S*sy}px;background-position:${-ru*S*sx}px ${-rv*S*sy}px;transform:${tf}`;
  return f;
}
function box(w,h,d,u,v,i){
  const W=w+2*i,H=h+2*i,D=d+2*i,b=mk('bx');
  b.append(
    face(w,h,u+d,v+d,W,H,`translateZ(${D/2*S}px)`),
    face(w,h,u+2*d+w,v+d,W,H,`rotateY(180deg) translateZ(${D/2*S}px)`),
    face(d,h,u,v+d,D,H,`rotateY(-90deg) translateZ(${W/2*S}px)`),
    face(d,h,u+d+w,v+d,D,H,`rotateY(90deg) translateZ(${W/2*S}px)`),
    face(w,d,u+d,v,W,D,`rotateX(90deg) translateZ(${H/2*S}px)`),
    face(w,d,u+d+w,v,W,D,`rotateX(-90deg) translateZ(${H/2*S}px)`));
  return b;
}
function part(w,h,d,base,over,infl,dy){
  const g=mk('bx',0,dy);g.append(box(w,h,d,base[0],base[1],0),box(w,h,d,over[0],over[1],infl));return g;
}
const hd=mk('hd'),swR=mk('sw sw-r'),swL=mk('sw sw-l');
const pv=(x,y,...kids)=>{const p=mk('pv',x,y);p.append(...kids);return p};
hd.append(part(8,8,8,[0,0],[32,0],.5,-4));
swR.append(part(ARM,12,4,[40,16],[40,32],.25,6));
swL.append(part(ARM,12,4,[32,48],[48,48],.25,6));
model.append(
  pv(0,-2,part(8,12,4,[16,16],[16,32],.25,0)),
  pv(-2,4,part(4,12,4,[0,16],[0,32],.25,6)),
  pv(2,4,part(4,12,4,[16,48],[0,48],.25,6)),
  pv(-(4+ARM/2),-8,swR),pv(4+ARM/2,-8,swL),pv(0,-8,hd));
function fit(){const H=innerWidth<640?340:430;rig.style.height=H+'px';model.style.transform=`scale(${H/(32*S)})`}
fit();addEventListener('resize',fit);

/* Cursor and touch tracking */
let idleT;
function aim(x,y){
  const r=stage.getBoundingClientRect(),px=r.left+r.width/2,py=r.top+r.height*.2;
  const dx=Math.max(-1,Math.min(1,(x-px)/(innerWidth/2))),dy=Math.max(-1,Math.min(1,(y-py)/(innerHeight/2)));
  stage.classList.remove('idle');
  tilt.style.transform=`rotateY(${dx*22}deg) rotateX(${-dy*5-4}deg)`;
  hd.style.transform=`rotateY(${dx*24}deg) rotateX(${-dy*18}deg)`;
  clearTimeout(idleT);idleT=setTimeout(rest,2800);
}
function rest(){tilt.style.transform='';hd.style.transform='';stage.classList.add('idle')}
if(!reduce){
  addEventListener('mousemove',e=>aim(e.clientX,e.clientY),{passive:true});
  addEventListener('touchstart',e=>aim(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  addEventListener('touchmove',e=>aim(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
}
