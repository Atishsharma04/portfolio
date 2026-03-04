/* MATRIX */
(function(){
  const c=document.getElementById('matrixCanvas'),ctx=c.getContext('2d');
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);
  const chars='01アイウエオカキクケコABCDEFGHIJ{}[]<>/\\=+-*#@!?';
  const fs=13;let drops=[];
  function init(){const cols=Math.floor(c.width/fs);drops=Array(cols).fill(1)}
  init();
  function draw(){
    ctx.fillStyle='rgba(6,10,6,0.05)';ctx.fillRect(0,0,c.width,c.height);
    ctx.font=fs+'px monospace';
    drops.forEach((d,i)=>{
      ctx.fillStyle=d*fs<c.height*.25?'#00ff41':'#004411';
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*fs,d*fs);
      if(d*fs>c.height&&Math.random()>.975)drops[i]=0;
      drops[i]++;
    });
  }
  const iv=setInterval(draw,48);
  window._killMatrix=()=>clearInterval(iv);
})();

/* BOOT */
const LOGS=[
  {t:0,   k:'ok',  ts:'[00:00:01]',b:'[  OK  ]',m:'Kernel: <em>portfolio-linux 6.1.0</em> booting...'},
  {t:220, k:'ok',  ts:'[00:00:01]',b:'[  OK  ]',m:'Mounting: <em>/home/atish/</em> — OK'},
  {t:420, k:'ok',  ts:'[00:00:02]',b:'[  OK  ]',m:'Loading profile: <em>atish_sharma.json</em>'},
  {t:600, k:'ok',  ts:'[00:00:02]',b:'[  OK  ]',m:'Skills module: <em>8 technologies</em> loaded'},
  {t:780, k:'info',ts:'[00:00:03]',b:'[ INFO ]',m:'Runtime: <em>Python 3.11</em> · <em>Node 20</em> · <em>React 18</em>'},
  {t:960, k:'ok',  ts:'[00:00:03]',b:'[  OK  ]',m:'ML libs: <em>scikit-learn · pandas · numpy</em> ready'},
  {t:1140,k:'ok',  ts:'[00:00:04]',b:'[  OK  ]',m:'Projects: <em>3 repositories</em> indexed'},
  {t:1300,k:'warn',ts:'[00:00:04]',b:'[ WARN ]',m:'Caffeine buffer critical — performance may <em>increase</em>'},
  {t:1460,k:'ok',  ts:'[00:00:05]',b:'[  OK  ]',m:'Education: <em>B.Tech CSE</em> @ JNGEC Mandi (2022–2026)'},
  {t:1620,k:'ok',  ts:'[00:00:05]',b:'[  OK  ]',m:'Contact: <em>email · github · linkedin</em> online'},
  {t:1800,k:'ok',  ts:'[00:00:06]',b:'[  OK  ]',m:'Status: <em style="color:var(--green)">● AVAILABLE FOR HIRE</em>'},
  {t:1980,k:'ok',  ts:'[00:00:06]',b:'[  OK  ]',m:'All systems nominal — <em>portfolio.service started</em>'},
];

const bootLog=document.getElementById('bootLog');
const bootFill=document.getElementById('bootFill');
const bootPct=document.getElementById('bootPct');
const bootTyped=document.getElementById('bootTyped');
let prog=0;

LOGS.forEach(({t,k,ts,b,m})=>{
  setTimeout(()=>{
    const d=document.createElement('div');
    d.className=`blog-line ${k}`;
    d.innerHTML=`<span class="blog-ts">${ts}</span><span class="blog-badge">${b}</span><span class="blog-msg">${m}</span>`;
    bootLog.appendChild(d);
    bootLog.scrollTop=bootLog.scrollHeight;
  },t);
});

const pTick=setInterval(()=>{
  prog=Math.min(100,prog+Math.random()*2+0.3);
  bootFill.style.width=prog+'%';
  bootPct.textContent=Math.floor(prog)+'%';
  if(prog>=100){clearInterval(pTick);bootPct.textContent='100%';setTimeout(()=>typeCmd('exec ./portfolio.sh',launch),300);}
},62);

function typeCmd(txt,cb){
  let i=0;const ti=setInterval(()=>{
    bootTyped.textContent=txt.slice(0,++i);
    if(i>=txt.length){clearInterval(ti);if(cb)setTimeout(cb,500);}
  },50);
}

function launch(){
  const boot=document.getElementById('boot');
  boot.style.transition='opacity .8s ease';
  boot.style.opacity='0';

  setTimeout(()=>{

    boot.style.display='none';

    window._killMatrix && window._killMatrix();

    document.getElementById('mainNav').classList.add('show');

    initSkillBars();

    /* SHOW DEV CARD AFTER LOAD */
    const devCard=document.querySelector('.dev3d-wrapper');

    if(devCard){
      devCard.style.display='block';
    }

  },800);
}

/* CARD VISIBILITY ON SCROLL */

const devCard = document.querySelector(".dev3d-wrapper");
const hero = document.getElementById("hero");

window.addEventListener("scroll", () => {

const heroRect = hero.getBoundingClientRect();

// if(heroRect.bottom > 200){
// devCard.style.display = "block";
// }else{
// devCard.style.display = "none";
// }
if(heroRect.bottom > 455){
devCard.style.opacity = "1";
}else{
devCard.style.opacity = "0";
}

});

/* CARD FLIP ON DOUBLE CLICK */

const flipCard = document.getElementById("devCard");

if(flipCard){

flipCard.addEventListener("dblclick", ()=>{

flipCard.classList.toggle("flip");

});

}
/* CURSOR */
const curDot=document.getElementById('curDot');
const curRing=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;curDot.style.left=mx+'px';curDot.style.top=my+'px';});
(function animR(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;curRing.style.left=rx+'px';curRing.style.top=ry+'px';requestAnimationFrame(animR);})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{curRing.style.width='46px';curRing.style.height='46px'});
  el.addEventListener('mouseleave',()=>{curRing.style.width='30px';curRing.style.height='30px'});
});

/* SCROLL REVEAL */
const obs=new IntersectionObserver(es=>{
  es.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('v'),i*85);});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* SKILL BARS */
function initSkillBars(){
  const skObs=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.sk-bar-fill').forEach(b=>setTimeout(()=>{b.style.width=b.dataset.w+'%'},120));
        skObs.unobserve(e.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('#skills').forEach(el=>skObs.observe(el));
}

/* CONTACT BG */
(function(){
  const bg=document.getElementById('contactBg');
  const lines=['const dev=new Developer("Atish Sharma");','dev.skills=["Python","React","Next.js","MySQL"];',
    'def train_model(X,y): return clf.fit(X,y)','SELECT * FROM opportunities WHERE open=true;',
    'git commit -m "feat: hire atish sharma"','npm install @atish/portfolio --save-dev',
    'console.log("available for work ✓");','import pandas as pd; df.describe()',
    'export default function Portfolio(){return <Hero/>}','while(true){learn();build();ship();}',
    'curl -X POST /api/hire -d "candidate=atish"','atish@portfolio:~$ sudo make me_a_job'];
  let txt='';
  for(let r=0;r<20;r++){let line='';while(line.length<110)line+=lines[Math.floor(Math.random()*lines.length)]+'   ';txt+=line.slice(0,110)+'\n';}
  bg.textContent=txt;
})();

/* NAV ACTIVE */
window.addEventListener('scroll',()=>{
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* TERMINAL TYPING */

const terminalLines=[
"whoami",
"Full-Stack Developer",
"AI/ML Engineer",
"Open to internships"
];

let lineIndex=0;
let charIndex=0;

const terminal=document.getElementById("terminalText");

function typeTerminal(){

if(!terminal) return;

if(charIndex < terminalLines[lineIndex].length){

terminal.textContent += terminalLines[lineIndex][charIndex];
charIndex++;

setTimeout(typeTerminal,50);

}else{

setTimeout(()=>{
terminal.textContent="";
charIndex=0;
lineIndex=(lineIndex+1)%terminalLines.length;
typeTerminal();
},1500);

}

}

typeTerminal();


/* 3D CARD HOVER */

const card=document.getElementById("devCard");

if(card){

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const centerX=rect.width/2;
const centerY=rect.height/2;

const rotateX=-(y-centerY)/10;
const rotateY=(x-centerX)/10;

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0deg) rotateY(0deg)";

});

}
const buttons = document.querySelectorAll(".dev3d-btn");
const cursorDot = document.getElementById("curDot");
const cursorRing = document.getElementById("curRing");

buttons.forEach(btn => {

btn.addEventListener("mouseenter", () => {

cursorDot.style.display = "none";
cursorRing.style.display = "none";
document.body.style.cursor = "pointer";

});

btn.addEventListener("mouseleave", () => {

cursorDot.style.display = "block";
cursorRing.style.display = "block";
document.body.style.cursor = "none";

});

});