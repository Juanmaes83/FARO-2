from pathlib import Path

p = Path('app.js')
s = p.read_text(encoding='utf-8')

old = """function wireForegroundStages(){const pairs=$$('.sec .fg').map(stage=>({section:stage.closest('.sec'),stage})).filter(p=>p.section);if(!pairs.length)return;const sky=$('#fg-sky'),ratios=new Map(pairs.map(p=>[p.section,0])),homes=new WeakMap(pairs.map(p=>[p.stage,p.section])),timers=new WeakMap();let current=null;
 const lift=stage=>{if(!sky||stage.parentNode===sky)return;sky.appendChild(stage);void stage.offsetWidth};
 const park=stage=>{const h=homes.get(stage);if(h&&stage.parentNode!==h)h.insertBefore(stage,h.firstChild)};
 const retire=stage=>{if(!stage||stage===current)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-active');if(REDUCE){park(stage);return}stage.classList.add('fg-retiring');timers.set(stage,setTimeout(()=>{stage.classList.remove('fg-retiring');park(stage)},820))};
 const activate=stage=>{if(!stage||stage===current)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-retiring');lift(stage);stage.classList.add('fg-active');const old=current;current=stage;retire(old)};
 const ob=new IntersectionObserver(es=>{es.forEach(e=>ratios.set(e.target,e.isIntersecting?e.intersectionRatio:0));let next=pairs[0];pairs.forEach(p=>{if((ratios.get(p.section)||0)>(ratios.get(next.section)||0))next=p});if((ratios.get(next.section)||0)>0)activate(next.stage)},{rootMargin:'-12% 0px -12% 0px',threshold:[0,.12,.32,.55]});pairs.forEach(p=>ob.observe(p.section));}
wireForegroundStages();"""

new = """function wireForegroundStages(){const pairs=$$('.sec .fg').map(stage=>({section:stage.closest('.sec'),stage})).filter(p=>p.section);if(!pairs.length)return;const sky=$('#fg-sky'),homes=new WeakMap(pairs.map(p=>[p.stage,p.section])),timers=new WeakMap();let current=null,ticking=false;
 const lift=stage=>{if(!sky||stage.parentNode===sky)return;sky.appendChild(stage);void stage.offsetWidth};
 const park=stage=>{const h=homes.get(stage);if(h&&stage.parentNode!==h)h.insertBefore(stage,h.firstChild)};
 const retire=stage=>{if(!stage)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-active');if(REDUCE){stage.classList.remove('fg-retiring');park(stage);return}stage.classList.add('fg-retiring');timers.set(stage,setTimeout(()=>{stage.classList.remove('fg-retiring');park(stage)},820))};
 const activate=stage=>{if(!stage||stage===current)return;clearTimeout(timers.get(stage));stage.classList.remove('fg-retiring');lift(stage);stage.classList.add('fg-active');const old=current;current=stage;if(old)retire(old)};
 const resolve=()=>{ticking=false;const mid=innerHeight*.47;let best=null,bd=1e9;for(const p of pairs){const r=p.section.getBoundingClientRect();const visible=r.bottom>0&&r.top<innerHeight;if(!visible)continue;const d=Math.abs(r.top+r.height*.44-mid);if(d<bd){bd=d;best=p}}if(best)activate(best.stage);else if(current){const old=current;current=null;retire(old)}};
 const requestResolve=()=>{if(ticking)return;ticking=true;requestAnimationFrame(resolve)};
 addEventListener('scroll',requestResolve,{passive:true});addEventListener('resize',requestResolve,{passive:true});resolve();}
wireForegroundStages();"""

if old not in s:
    raise SystemExit('Expected last-known-good foreground lifecycle block not found; refusing unsafe patch')

p.write_text(s.replace(old, new, 1), encoding='utf-8')
print('app.js foreground lifecycle replaced with navigation-aligned ownership')
