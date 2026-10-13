/* Night sky: square stars and fireflies */
const cv=document.getElementById('sky'),cx=cv.getContext('2d');let W,H,stars=[],flies=[];
function setup(){
  const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
  stars=Array.from({length:Math.round(W*H/7000)},()=>({x:Math.random()*W,y:Math.random()*H*.85,s:Math.random()<.15?3:Math.random()<.5?2:1,p:Math.random()*6.28,v:.4+Math.random()*1.2}));
  flies=Array.from({length:Math.min(34,Math.round(W/45))},()=>({x:Math.random()*W,y:H*.35+Math.random()*H*.65,a:Math.random()*6.28,sp:.15+Math.random()*.3,p:Math.random()*6.28,c:Math.random()<.2?'127,214,230':'255,179,71'}));
}
function frame(t){
  cx.clearRect(0,0,W,H);t=t/1000;
  for(const s of stars){cx.globalAlpha=reduce?.7:.35+.65*Math.abs(Math.sin(t*s.v+s.p));cx.fillStyle='#e8ecff';cx.fillRect(s.x|0,s.y|0,s.s,s.s)}
  for(const f of flies){
    if(!reduce){f.a+=(Math.random()-.5)*.12;f.x+=Math.cos(f.a)*f.sp;f.y+=Math.sin(f.a)*f.sp-.03;
      if(f.x<-10)f.x=W+10;if(f.x>W+10)f.x=-10;if(f.y<H*.25)f.y=H+10;if(f.y>H+10)f.y=H*.3}
    const g=.35+.65*Math.abs(Math.sin(t*.9+f.p)),r=22;
    const gr=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,r);gr.addColorStop(0,`rgba(${f.c},${.55*g})`);gr.addColorStop(1,`rgba(${f.c},0)`);
    cx.globalAlpha=1;cx.fillStyle=gr;cx.fillRect(f.x-r,f.y-r,r*2,r*2);
    cx.fillStyle=`rgba(${f.c},${g})`;cx.fillRect(f.x-1,f.y-1,3,3);
  }
  if(!reduce)requestAnimationFrame(frame);
}
setup();requestAnimationFrame(frame);
addEventListener('resize',()=>{setup();if(reduce)requestAnimationFrame(frame)});
