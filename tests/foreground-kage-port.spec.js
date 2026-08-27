const {test,expect}=require('@playwright/test');
const fs=require('fs');
test.setTimeout(120000);

function out(){fs.mkdirSync('qa-artifacts/block1',{recursive:true})}
async function ready(page){
  await page.goto('/storytelling.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__FARO_QA__?.ready===true,null,{timeout:45000});
  await page.waitForTimeout(500);
}
async function own(page,id){
  await page.evaluate(id=>{
    const e=document.getElementById(id);
    if(!e)return;
    const r=e.getBoundingClientRect();
    const top=scrollY+r.top+(r.height-innerHeight)/2;
    scrollTo(0,Math.max(0,top));
  },id);
  await page.waitForFunction(id=>document.querySelector(`#fg-sky [data-fg="${id}"].fg-active`)!==null,id,{timeout:5000});
  await page.waitForTimeout(350);
}
async function overflowAudit(page){
  return page.evaluate(()=>({
    sw:document.documentElement.scrollWidth,
    cw:document.documentElement.clientWidth,
    offenders:[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,id:el.id,cls:el.className?.toString?.()||'',l:Math.round(r.left),r:Math.round(r.right),w:Math.round(r.width)}}).filter(x=>x.w>0&&(x.r>innerWidth+1||x.l<-1)).slice(0,25)
  }));
}

test('desktop: real alpha Coast stage owns the fixed Kage near-plane',async({page})=>{
  out();
  await page.setViewportSize({width:1440,height:1000});
  await ready(page);
  await own(page,'coast');
  const q=await page.evaluate(()=>{const sky=document.querySelector('#fg-sky'),stage=sky?.querySelector('[data-fg="coast"]');return{active:stage?.classList.contains('fg-active'),parent:stage?.parentElement?.id,imgs:[...stage?.querySelectorAll('img')||[]].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0,op:getComputedStyle(i).opacity})),fixed:stage?getComputedStyle(stage).position:null,skyOverflow:sky?getComputedStyle(sky).overflow:null}});
  await page.screenshot({path:'qa-artifacts/block1/coast-desktop.png',fullPage:false});
  fs.writeFileSync('qa-artifacts/block1/coast-desktop.json',JSON.stringify(q,null,2));
  expect(q.active).toBeTruthy();
  expect(q.parent).toBe('fg-sky');
  expect(q.fixed).toBe('fixed');
  expect(q.skyOverflow).toBe('visible');
  expect(q.imgs.length).toBe(3);
  expect(q.imgs.every(i=>i.ok&&i.op==='1')).toBeTruthy();
});

test('foreground retires and ownership passes without duplication',async({page})=>{
  out();
  await page.setViewportSize({width:1440,height:1000});
  await ready(page);
  await own(page,'coast');
  await own(page,'keeper');
  const q=await page.evaluate(()=>({active:[...document.querySelectorAll('#fg-sky .fg-active')].map(x=>x.dataset.fg),retiring:[...document.querySelectorAll('#fg-sky .fg-retiring')].map(x=>x.dataset.fg),allActive:document.querySelectorAll('.fg-active').length}));
  await page.screenshot({path:'qa-artifacts/block1/keeper-transfer-desktop.png',fullPage:false});
  fs.writeFileSync('qa-artifacts/block1/keeper-transfer.json',JSON.stringify(q,null,2));
  expect(q.active).toEqual(['keeper']);
  expect(q.allActive).toBe(1);
});

test('mobile: one or two anchors remain and no horizontal overflow',async({page})=>{
  out();
  await page.setViewportSize({width:390,height:844});
  await ready(page);
  await own(page,'coast');
  const q=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,visible:[...document.querySelectorAll('#fg-sky [data-fg="coast"] .fg-el')].filter(e=>getComputedStyle(e).display!=='none').length}));
  const audit=await overflowAudit(page);
  await page.screenshot({path:'qa-artifacts/block1/coast-mobile.png',fullPage:false});
  fs.writeFileSync('qa-artifacts/block1/coast-mobile.json',JSON.stringify({q,audit},null,2));
  expect(q.sw).toBeLessThanOrEqual(q.cw+1);
  expect(q.visible).toBeGreaterThanOrEqual(1);
  expect(q.visible).toBeLessThanOrEqual(2);
});
