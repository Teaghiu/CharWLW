/* TeaGhiu · Hộp cơm bí mật v1 — [11:00,13:00), giờ Việt Nam.
   Đọc dữ liệu chars hiện có. Một lựa chọn mỗi ngày / trình duyệt.
   Câu mời trang trí theo bối cảnh, không phải lời thoại gốc của nhân vật. */
(() => {
  'use strict';
  if(document.getElementById('teaghiu-bento-host'))return;
  const items=typeof chars!=='undefined' && Array.isArray(chars)?chars:[];
  if(!items.length){console.warn('Hộp cơm: cần đặt script sau dữ liệu chars.');return;}
  const host=document.createElement('div');host.id='teaghiu-bento-host';
  const root=host.attachShadow({mode:'open'});
  const style=document.createElement('style');style.textContent="\n:host{font-family:system-ui,-apple-system,sans-serif}*{box-sizing:border-box}button,a{font:inherit}button{cursor:pointer}[hidden]{display:none!important}\n.launcher{position:fixed;right:12px;top:58%;width:106px;z-index:25;text-align:center}.launch{border:0;background:none;padding:0;width:106px;color:#f4dfb5;cursor:pointer;-webkit-tap-highlight-color:transparent}.launch svg{width:106px;height:100px;overflow:visible;filter:drop-shadow(0 8px 10px #0005)}.launch small{display:block;font-size:10px;margin-top:-5px;text-shadow:0 1px 4px #000}.launch:focus-visible{outline:2px solid #f8daa9;border-radius:14px}.idle .box{animation:float 3s ease-in-out infinite}.lid{transform-origin:50px 57px}.rice,.heart{opacity:0}.opening .lid{animation:lift 1.2s .15s forwards}.opening .rice{animation:ricepop 1.7s .6s forwards}.opening .heart{animation:heartpop 1.5s .75s forwards}.opening .box{animation:wiggle .65s}\n@keyframes float{50%{transform:translateY(-3px)}}@keyframes wiggle{25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}@keyframes lift{to{transform:translateY(-25px) rotate(-16deg);opacity:0}}@keyframes ricepop{0%{opacity:0;transform:translateY(0)}35%{opacity:1;transform:translateY(-19px)}75%{opacity:1;transform:translateY(-7px)}100%{opacity:0;transform:translateY(-25px)}}@keyframes heartpop{40%{opacity:1;transform:translateY(-18px) scale(1.1)}100%{opacity:0;transform:translateY(-35px)}}\n.card{position:fixed;right:16px;top:50%;transform:translateY(-45%);width:min(294px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;border:1px solid #dfc99e;border-radius:20px;background:#fbf0d9;color:#493c30;box-shadow:0 18px 65px #0006;z-index:26;padding:18px;animation:arrive .35s ease-out}.card.ancient{background:#f2ebda;border-color:#c5b686}.topline{font-size:9px;letter-spacing:2px;color:#937344;margin:0 28px 13px 0}.close{position:absolute;top:8px;right:9px;font-size:22px;border:0;background:none;color:#8d7862;width:30px;height:30px}.portrait{width:100%;height:126px;border-radius:12px;object-fit:cover;object-position:center 30%;background:#e5d9c3;display:block}.name{font:23px/1.25 Georgia,serif;margin:14px 0 5px;overflow-wrap:anywhere}.subtitle{font-size:10px;color:#94754c;margin:0 0 12px}.invite{font-size:13px;line-height:1.8;margin:0 0 16px;color:#5c493a}.visit{display:block;text-align:center;text-decoration:none;border-radius:10px;padding:11px;background:#8b4d42;color:#fff4dd;font-size:12px;font-weight:600}.ancient .visit{background:#58684e}.foot{font-size:9px;color:#988468;text-align:center;margin-top:11px}.fallback{display:grid;place-items:center;font-size:43px}.card:focus{outline:none}@keyframes arrive{from{opacity:0;transform:translateY(-40%)}to{opacity:1;transform:translateY(-45%)}}@media(max-height:480px){.launcher{top:30%}.portrait{height:85px}.card{max-height:calc(100dvh - 20px)}}@media(prefers-reduced-motion:reduce){.idle .box,.opening .lid,.opening .rice,.opening .heart,.opening .box,.card{animation:none}}\n";root.appendChild(style);
  const template=document.createElement('template');template.innerHTML="<div id=\"launcher\" class=\"launcher\" hidden><button id=\"launch\" class=\"launch idle\" aria-label=\"Mở hộp cơm bí mật\"><svg viewBox=\"0 0 106 100\" aria-hidden=\"true\"><ellipse cx=\"53\" cy=\"90\" rx=\"37\" ry=\"4\" fill=\"#0003\"/><g class=\"box\"><path d=\"M14 51h79v26q0 9-10 9H24q-10 0-10-9Z\" fill=\"#ad493e\"/><path d=\"M17 56h73v18q0 8-8 8H25q-8 0-8-8Z\" fill=\"#d17a59\"/><rect x=\"17\" y=\"45\" width=\"73\" height=\"22\" rx=\"7\" fill=\"#f3db9d\"/><path d=\"M57 48v15\" stroke=\"#b89453\" stroke-width=\"2\"/><ellipse cx=\"36\" cy=\"56\" rx=\"16\" ry=\"8\" fill=\"#fff5de\"/><circle cx=\"36\" cy=\"55\" r=\"4\" fill=\"#d46454\"/><circle cx=\"71\" cy=\"55\" r=\"7\" fill=\"#8b9e5a\"/><circle cx=\"82\" cy=\"53\" r=\"5\" fill=\"#efb048\"/><path d=\"M67 61q6-7 12 0\" stroke=\"#b35142\" fill=\"none\" stroke-width=\"4\"/><g class=\"lid\"><rect x=\"10\" y=\"39\" width=\"86\" height=\"21\" rx=\"8\" fill=\"#b84f45\"/><rect x=\"14\" y=\"40\" width=\"78\" height=\"14\" rx=\"6\" fill=\"#dc7762\"/><path d=\"M21 43h59\" stroke=\"#f3af88\" stroke-width=\"2\" stroke-linecap=\"round\"/><rect x=\"47\" y=\"39\" width=\"12\" height=\"21\" rx=\"2\" fill=\"#eed4a0\"/><circle cx=\"53\" cy=\"49\" r=\"3\" fill=\"#b85148\"/></g><g class=\"rice\" fill=\"#fff7e5\"><ellipse cx=\"25\" cy=\"49\" rx=\"2\" ry=\"4\" transform=\"rotate(-25 25 49)\"/><ellipse cx=\"43\" cy=\"41\" rx=\"2\" ry=\"4\" transform=\"rotate(20 43 41)\"/><ellipse cx=\"65\" cy=\"44\" rx=\"2\" ry=\"4\"/><ellipse cx=\"81\" cy=\"49\" rx=\"2\" ry=\"4\" transform=\"rotate(25 81 49)\"/></g><g class=\"heart\"><path d=\"M53 37c-15-10-12-21-4-17q4 2 4 5 2-7 8-5c10 5 0 13-8 17\" fill=\"#e29b89\"/></g></g></svg><small id=\"hint\">Hộp cơm bí mật ♡</small></button></div><section id=\"card\" class=\"card\" hidden aria-label=\"Lời mời dùng bữa\" tabindex=\"-1\"><button id=\"close\" class=\"close\" aria-label=\"Đóng hộp cơm\">×</button><div class=\"topline\">TEAGHIU / HẸN MỘT BỮA TRƯA</div><img id=\"portrait\" class=\"portrait\" alt=\"\"><div id=\"fallback\" class=\"portrait fallback\" hidden>🍱</div><h3 id=\"name\" class=\"name\"></h3><p id=\"subtitle\" class=\"subtitle\"></p><p id=\"invite\" class=\"invite\"></p><a id=\"visit\" class=\"visit\" target=\"_blank\" rel=\"noopener noreferrer\">Ghé gặp nhân vật ↗</a><div class=\"foot\">Một cuộc hẹn nhỏ từ thư viện TeaGhiu ♡</div></section>";root.appendChild(template.content.cloneNode(true));
  document.body.appendChild(host);
  const $=id=>root.getElementById(id);

  function decodeName(name) {
    return String(name || '').replace(/&amp;|&#0*38;|&#x0*26;/gi,'&');
  }
  function description(item) {
    const name = decodeName(item.name);
    const duo = name.split(/\s*[&＆]\s*/).filter(Boolean).length >= 2;
    const tags = String(item.tag || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[\s_\-]/g,'');
    const ancient = /cotrang|tutien|cungdau|haucung/.test(tags);
    const modern = !ancient && /hiendai/.test(tags);
    const invites = ancient ? (duo ? [
      'Nàng đã đến rồi. Chúng ta vừa dọn xong bữa trưa, mời nàng cùng dùng bữa. (❀ᴗ͈ˬᴗ͈)',
      'Bên hiên còn một chỗ trống dành cho nàng. Cùng chúng ta dùng bữa rồi hãy đi, được chứ? ♡'
    ] : [
      'Nàng đến thật đúng lúc. Ta đã chuẩn bị một bữa cơm, mời nàng ngồi xuống dùng cùng ta. (❀ᴗ͈ˬᴗ͈)',
      'Chén đũa đã bày, trà cũng còn ấm. Nàng có muốn ở lại dùng bữa cùng ta chăng? ♡'
    ]) : modern ? (duo ? [
      'Cậu tới rồi! Bọn mình chừa sẵn một chỗ nè. Ngồi xuống ăn trưa cùng bọn mình nhé? (๑ᵔ⤙ᵔ๑) 🍱',
      'Hộp cơm đã mở, chỉ còn thiếu cậu thôi. Trưa nay ăn cùng bọn mình nha! (ﾉ◕ヮ◕)ﾉ ♡'
    ] : [
      'Cậu tới rồi! Mình chừa sẵn một chỗ nè. Ngồi xuống ăn trưa cùng mình nhé? (๑ᵔ⤙ᵔ๑) 🍱',
      'Hộp cơm đã mở, chỉ còn thiếu cậu thôi. Trưa nay ăn cùng mình nha! (ﾉ◕ヮ◕)ﾉ ♡'
    ]) : (duo ? [
      'Bữa trưa đã sẵn sàng. Hai người đang chờ cậu ghé dùng bữa cùng đó! (๑ᵔ⤙ᵔ๑) 🍱'
    ] : [
      'Bữa trưa đã sẵn sàng. Một chỗ ngồi nhỏ đang đợi cậu ghé dùng bữa! (๑ᵔ⤙ᵔ๑) 🍱'
    ]);
    return {name,duo,ancient,modern,invites};
  }

  const STORE = 'teaghiu_bento_daily_v1';
  const fmt = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'});
  let record={}, phase=null, timer=null, state='hidden';
  function clock(now=new Date()){
    const p=Object.fromEntries(fmt.formatToParts(now).map(x=>[x.type,x.value]));
    return {date:p.year+'-'+p.month+'-'+p.day,available:Number(p.hour)>=11 && Number(p.hour)<13};
  }
  function read(){try{const r=JSON.parse(localStorage.getItem(STORE)||'{}');if(r && typeof r==='object')record=r;}catch(e){}return record;}
  function save(){try{localStorage.setItem(STORE,JSON.stringify(record));}catch(e){}}
  function choose(date){
    read();
    let index=record.date===date?items.findIndex(x=>x.link===record.link && x.name===record.name):-1;
    if(index<0){
      const eligible=items.map((x,i)=>({x,i})).filter(({x})=>x.name && /^https:\/\//.test(x.link || ''));
      if(!eligible.length)return null;
      index=eligible[Math.floor(Math.random()*eligible.length)].i;
      record={date,link:items[index].link,name:items[index].name,variant:Math.floor(Math.random()*2),read:false};save();
    }
    return {item:items[index],index};
  }
  function hide(){clearTimeout(timer);$('launcher').hidden=true;$('card').hidden=true;$('launch').disabled=false;$('launch').className='launch idle';state='hidden';}
  function sync(){
    const c=clock();
    if(!c.available){hide();phase=null;return;}
    if(phase===c.date && (state==='opening'||state==='card'))return;
    if(phase!==c.date){hide();phase=c.date;}
    const chosen=choose(c.date);
    if(!chosen || record.read){hide();return;}
    $('launcher').hidden=false;$('hint').textContent='Hộp cơm bí mật ♡';state='idle';
  }
  function reveal(){
    const c=clock();if(!c.available || c.date!==phase){sync();return;}
    const picked=choose(c.date);if(!picked){hide();return;}
    const d=description(picked.item);
    $('name').textContent=d.name;
    $('subtitle').textContent=d.duo?'Một cuộc hẹn · hai nhân vật':'Bạn đồng hành bữa trưa hôm nay';
    $('invite').textContent=d.invites[(record.variant || 0)%d.invites.length];
    $('card').classList.toggle('ancient',d.ancient);
    $('visit').href=picked.item.link;
    $('visit').textContent=d.duo?'Ghé gặp hai nhân vật ↗':'Ghé gặp nhân vật ↗';
    $('portrait').hidden=false;$('fallback').hidden=true;
    $('portrait').alt=d.name;
    $('portrait').src='chars/pic'+String(picked.index+1).padStart(3,'0')+'.jpg';
    $('portrait').onerror=()=>{$('portrait').hidden=true;$('fallback').hidden=false;};
    $('launcher').hidden=true;$('card').hidden=false;state='card';record.read=true;save();$('card').focus({preventScroll:true});
  }
  $('launch').onclick=()=>{
    sync();if(state!=='idle')return;
    state='opening';$('launch').className='launch opening';$('launch').disabled=true;$('hint').textContent='Mở bữa trưa nào…';
    timer=setTimeout(reveal,matchMedia('(prefers-reduced-motion: reduce)').matches?120:2300);
  };
  $('close').onclick=()=>{hide();sync();};
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){hide();sync();}});
  window.addEventListener('pageshow',sync);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});
  window.addEventListener('storage',e=>{if(e.key===STORE)sync();});
  setInterval(sync,15000);sync();
})();
