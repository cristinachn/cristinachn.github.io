/* Night sky: a sparse field of twinkling square stars. The home page uses a photo with its own sky, so nothing is drawn there. */
const cv=document.getElementById('sky'),cx=cv.getContext('2d');let W,H,stars=[];
const home=document.body.dataset.page==='home';
function setup(){
  const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
  stars=home?[]:Array.from({length:Math.min(60,Math.round(W*H/22000))},()=>({x:Math.random()*W,y:Math.random()*H*.85,s:Math.random()<.15?3:Math.random()<.5?2:1,p:Math.random()*6.28,v:.4+Math.random()*1.2}));
}
function frame(t){
  cx.clearRect(0,0,W,H);t=t/1000;
  for(const s of stars){cx.globalAlpha=reduce?.7:.35+.65*Math.abs(Math.sin(t*s.v+s.p));cx.fillStyle='#e8ecff';cx.fillRect(s.x|0,s.y|0,s.s,s.s)}
  if(!reduce&&!home)requestAnimationFrame(frame);
}
setup();requestAnimationFrame(frame);
addEventListener('resize',()=>{setup();if(reduce||home)requestAnimationFrame(frame)});
