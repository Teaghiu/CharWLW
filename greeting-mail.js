/* TeaGhiu · Hòm thư lời chào v1
 * Giờ Việt Nam: sáng [07:00,10:00), tối [21:00,23:00).
 * Thứ Hai dùng cặp 1 ... Chủ Nhật dùng cặp 7; tuần sau lặp lại.
 * Đọc xong: ẩn trong buổi đó trên cùng trình duyệt (localStorage).
 * Không có thông báo đẩy; chỉ chạy khi trang đang mở.
 */
(() => {
  'use strict';
  if (document.getElementById('teaghiu-greeting-host')) return;
  const host = document.createElement('div');
  host.id = 'teaghiu-greeting-host';
  const root = host.attachShadow({mode:'open'});
  const style = document.createElement('style');
  style.textContent = ":host{font-family:system-ui,-apple-system,sans-serif;color:#eee9ed}*{box-sizing:border-box}button{font:inherit;cursor:pointer}[hidden]{display:none!important}\n.widget{position:fixed;right:12px;top:58%;z-index:20;width:112px;transition:opacity .3s}.mailbox{position:relative;display:block;border:0;padding:0;background:transparent;width:112px;height:132px;color:#fff;touch-action:manipulation;-webkit-tap-highlight-color:transparent}.mailbox svg{width:112px;height:116px;overflow:visible;filter:drop-shadow(0 8px 9px #0005)}.hint{position:absolute;bottom:0;right:0;left:0;text-align:center;font-size:10px;color:#f8d9c5;white-space:nowrap}.mailbox:focus-visible{outline:2px solid #f7d5af;border-radius:12px}.mailbox.idle #bird{animation:breathe 2.6s ease-in-out infinite}.mailbox.idle #flag{animation:flag 3s ease-in-out infinite;transform-origin:94px 73px}.lid{transform-origin:41px 66px}.head{transform-origin:68px 36px}.envelope{opacity:0}.spark{opacity:0}.night .sky{opacity:1}.sky{opacity:0;transition:opacity .4s}.night .mailbox svg{filter:drop-shadow(0 0 12px #a1a4ff24)}.opening .head{animation:peck 1s ease-in-out 2}.opening .lid{animation:openlid 1s 1.4s forwards}.opening .envelope{animation:takeletter 1.2s 2.35s forwards}.opening #bird{animation:birdhop .65s 2.8s}.opening .spark{animation:twinkle .8s 2s 2}.night .opening .head{animation:nightpeck 1.2s ease-in-out 2}.night .opening .lid{animation:openlid 1s 1.9s forwards}.night .opening .envelope{animation:takeletter 1.1s 2.85s forwards}.night .opening #bird{animation:birdhop .8s 3.1s}.night .opening .spark{animation:twinkle 1s 2.5s 2}\n@keyframes breathe{50%{transform:translateY(-2px)}}@keyframes flag{50%{transform:rotate(-9deg)}}@keyframes peck{0%,100%{transform:rotate(0)}30%,60%{transform:rotate(22deg) translateY(3px)}}@keyframes nightpeck{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}55%,75%{transform:rotate(25deg) translateY(4px)}}@keyframes openlid{to{transform:rotate(82deg)}}@keyframes takeletter{0%{opacity:0;transform:translate(0,0)}15%{opacity:1}60%{opacity:1;transform:translate(11px,-22px) rotate(-12deg)}100%{opacity:1;transform:translate(27px,-36px) rotate(-18deg)}}@keyframes birdhop{50%{transform:translateY(-6px)}}@keyframes twinkle{50%{opacity:1}}\n.letter{position:fixed;right:16px;top:50%;transform:translateY(-42%) scale(.94);width:min(302px,calc(100vw - 32px));padding:25px 22px 18px;border-radius:5px 20px 20px 20px;background:#fbefd8;color:#43352e;box-shadow:0 20px 65px #0007;z-index:22;opacity:0;visibility:hidden;transition:opacity .4s,transform .4s;border:1px solid #e7d4b4;background-image:repeating-linear-gradient(transparent,transparent 28px,#a8753910 29px)}.letter.visible{opacity:1;visibility:visible;transform:translateY(-42%) scale(1)}.letter:before{content:'';position:absolute;left:12px;top:14px;bottom:14px;border-left:1px solid #db898945}.letter .close{position:absolute;right:9px;top:8px;border:0;background:transparent;color:#826c60;font-size:21px;width:30px;height:30px}.letter .stamp{font-size:9px;letter-spacing:1.7px;color:#9c685b;text-transform:uppercase}.letter h3{font:24px Georgia,serif;margin:12px 0 14px}.letter .message{font-size:14px;line-height:1.9;margin:0;color:#4b3c36;overflow-wrap:anywhere;white-space:pre-wrap}.signature{font:italic 17px Georgia,serif;text-align:right;margin:17px 0 4px;color:#ac6055}.letter-footer{display:flex;align-items:center;justify-content:space-between;margin-top:8px;border-top:1px dashed #c5aa8c;padding-top:10px}.letter-footer small{color:#947e6c;font-size:10px}.tinybird{width:56px;height:45px}.night .letter{background-color:#eeeafa;border-color:#ccc4df;background-image:repeating-linear-gradient(transparent,transparent 28px,#83739d12 29px)}.night .letter h3{color:#554468}.night .letter .stamp,.night .signature{color:#796397}.status{margin-top:12px;min-height:22px;color:#d0bea9;font-size:12px}.replay{margin-top:14px;border:1px solid #6b5960;color:#eed4bd;background:transparent;border-radius:12px;padding:9px 13px;font-size:12px} @media(prefers-reduced-motion:reduce){.mailbox.idle #bird,.mailbox.idle #flag{animation:none}.letter{transition:none}}\n\n@media(max-height:480px){.widget{top:30%}.letter{top:50%;max-height:calc(100dvh - 24px);overflow:auto;transform:translateY(-50%) scale(.94)}.letter.visible{transform:translateY(-50%) scale(1)}}";
  root.appendChild(style);
  const template = document.createElement('template');
  template.innerHTML = "<div id=\"phaseRoot\"><div id=\"widget\" class=\"widget\" hidden><button id=\"mailbox\" class=\"mailbox idle\" aria-label=\"Mở lá thư chào buổi sáng\"><svg viewBox=\"0 0 112 116\" role=\"img\" aria-label=\"Hòm thư đỏ và chim xám\"><g class=\"sky\"><path d=\"M22 6a10 10 0 1 0 12 14A10 10 0 0 1 22 6\" fill=\"#ecdca5\"/><path d=\"m89 7 2 4 4 1-4 2-2 4-1-4-4-2 4-1Z\" fill=\"#f5dc99\"/><circle cx=\"48\" cy=\"8\" r=\"1.4\" fill=\"#fff2ce\"/><circle cx=\"102\" cy=\"32\" r=\"1\" fill=\"#e6ddff\"/></g><ellipse cx=\"60\" cy=\"110\" rx=\"29\" ry=\"4\" fill=\"#0003\"/><path d=\"M58 82h9v27h-9z\" fill=\"#885849\"/><path d=\"M61 84h3v24h-3z\" fill=\"#b57c62\"/><path d=\"M28 49h47q23 0 23 22v14H28Z\" fill=\"#a92f3d\"/><path d=\"M39 49h36q23 0 23 22H39Z\" fill=\"#d24c55\"/><path d=\"M44 53h30q12 0 17 9\" fill=\"none\" stroke=\"#ed8584\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M28 69h70v16H28Z\" fill=\"#b13341\"/><path d=\"M31 71h11v12H31z\" fill=\"#442c35\"/><g class=\"lid\"><path d=\"M27 66h17v21H27Z\" fill=\"#e46766\" stroke=\"#983341\" stroke-width=\"1.5\"/><path d=\"M30 70h10\" stroke=\"#f2b0a2\" stroke-width=\"1.3\"/><circle cx=\"38\" cy=\"79\" r=\"1.6\" fill=\"#f2d8ad\"/></g><g id=\"flag\"><path d=\"M94 73V43\" stroke=\"#6f2433\" stroke-width=\"3\"/><path d=\"M94 44h-11v9h11\" fill=\"#ee9b70\"/></g><g class=\"envelope\"><rect x=\"27\" y=\"66\" width=\"22\" height=\"15\" rx=\"1.5\" fill=\"#fff1d7\" stroke=\"#c3a17f\"/><path d=\"m27 67 11 8 11-8\" fill=\"none\" stroke=\"#c3a17f\"/><circle cx=\"38\" cy=\"74\" r=\"2\" fill=\"#d16d75\"/></g><g id=\"bird\"><path d=\"m51 42-13 1 9-10\" fill=\"#7d808e\"/><ellipse cx=\"58\" cy=\"38\" rx=\"15\" ry=\"11\" fill=\"#9b9eab\"/><ellipse cx=\"58\" cy=\"41\" rx=\"9\" ry=\"7\" fill=\"#d3d3d9\"/><path d=\"M49 33q14-2 12 9-8 4-12-9\" fill=\"#818493\"/><path d=\"m56 48-2 4m9-4 1 4\" stroke=\"#b18b60\" stroke-width=\"2\" stroke-linecap=\"round\"/><g class=\"head\"><circle cx=\"69\" cy=\"29\" r=\"10\" fill=\"#a5a7b2\"/><path d=\"m76 33 11 3-10 3\" fill=\"#e1ba77\"/><path d=\"M65 25q3-3 7-1\" stroke=\"#565966\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"73\" cy=\"28\" r=\"2\" fill=\"#30313c\"/><circle cx=\"73.5\" cy=\"27.5\" r=\".6\" fill=\"#fff\"/><ellipse cx=\"75\" cy=\"32\" rx=\"2\" ry=\"1\" fill=\"#d7aeb8\"/></g></g><g class=\"spark\" fill=\"#f6d58d\"><path d=\"m20 39 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z\"/><path d=\"m91 25 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z\"/></g></svg><span class=\"hint\" id=\"hint\">Có thư cho cậu ♡</span></button></div>\n<aside id=\"letter\" class=\"letter\" aria-label=\"Lá thư từ TeaGhiu\" aria-hidden=\"true\"><button class=\"close\" id=\"close\" aria-label=\"Đóng lá thư\">×</button><div class=\"stamp\" id=\"stamp\">MỘT LÁ THƯ TỪ TEAGHIU</div><h3 id=\"heading\">Chào ngày mới ♡</h3><p class=\"message\" id=\"message\"></p><div class=\"signature\">Thương gửi, TeaGhiu</div><div class=\"letter-footer\"><small id=\"dayLabel\">Dành riêng cho cậu ♡</small><svg class=\"tinybird\" viewBox=\"0 0 65 45\" aria-hidden=\"true\"><path d=\"m18 31-13 3 10-12\" fill=\"#777b8c\"/><ellipse cx=\"29\" cy=\"27\" rx=\"17\" ry=\"12\" fill=\"#9b9daa\"/><ellipse cx=\"32\" cy=\"30\" rx=\"11\" ry=\"8\" fill=\"#d5d5de\"/><path d=\"M16 21q19-1 15 14-11 3-15-14\" fill=\"#818495\"/><circle cx=\"43\" cy=\"16\" r=\"11\" fill=\"#a6a8b5\"/><path d=\"m52 19 10 3-10 3\" fill=\"#d5ab70\"/><path d=\"M39 12q4-3 7-1\" fill=\"none\" stroke=\"#55586a\" stroke-width=\"1.4\"/><path d=\"M46 16q2 3 4 0\" fill=\"none\" stroke=\"#373846\" stroke-width=\"1.5\"/><ellipse cx=\"49\" cy=\"20\" rx=\"2.4\" ry=\"1.3\" fill=\"#dbb1c0\"/><path d=\"m26 39-2 4m14-4 2 4\" stroke=\"#b39170\" stroke-width=\"2\"/></svg></div></aside>\n</div>";
  root.appendChild(template.content.cloneNode(true));
  document.body.appendChild(host);

const greetings={morning:[
'Chào buổi sáng nhaaa! Hôm nay cũng phải thật vui vẻ đó nhé! (๑˃ᴗ˂)ﻭ ♡',
'Dậy chưa nèee? Chúc cậu một ngày suôn sẻ, gặp toàn chuyện tốt lành! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
'Morninggg~ Nhớ ăn sáng đầy đủ, đừng để chiếc bụng nhỏ biểu tình nha! (๑ᵔ⤙ᵔ๑) 🍞',
'Hôm nay cũng cố gắng vừa đủ thôi nhé, mệt thì cứ nghỉ một chút nè! (づ｡◕‿‿◕｡)づ ♡',
'Mặt trời lên rồi, mong nụ cười của cậu cũng sẽ rực rỡ như thế! ☀️ (˶ᵔ ᵕ ᵔ˶)',
'Chúc cậu mở mắt ra là gặp may, bước chân ra cửa là gặp niềm vui! (ﾉ´ヮ`)ﾉ*: ･ﾟ',
'Alo alo, gửi cậu một chút năng lượng tích cực đầu ngày đây! Nhận lấy nàooo! ♡٩(ˊᗜˋ*)و'],evening:[
'Tối rồi nè, hôm nay cậu thế nào? Có chuyện gì vui kể mình nghe với! (っ˘ω˘ς )',
'Chào buổi tối nha~ Mong mọi mệt mỏi hôm nay đều dịu xuống một chút. ( ˘͈ ᵕ ˘͈♡)',
'Cả ngày vất vả rồi, cậu làm tốt lắm! Giờ dành chút thời gian cho bản thân nhé. (๑•̀ㅂ•́)و✧',
'Tối nay nhớ ăn uống đầy đủ, giữ ấm và nghỉ ngơi thật tốt nha! (｡•̀ᴗ-)✧ ♡',
'Hôm nay có không vui cũng chẳng sao, ngày mai mình lại thử một lần nữa nhé! (づ๑•ᴗ•๑)づ♡',
'Đêm xuống rồi, gửi cậu một chiếc ôm thật mềm cùng lời chúc ngủ ngon nè! (つ≧▽≦)つ 🌙',
'Chúc cậu một buổi tối bình yên, ngủ thật ngon và mơ toàn những điều đáng yêu! (ᴗ˳ᴗ)ᶻ𝗓𐰁 ♡']};

  const $ = id => root.getElementById(id);
  const STORE = 'teaghiu_greeting_read_v1';
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone:'Asia/Ho_Chi_Minh', year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', hourCycle:'h23'
  });
  let slot = null, timer = null, state = 'hidden', returnFocus = null;
  let remembered = {}; // vẫn dùng được trong phiên nếu trình duyệt chặn lưu trữ

  function clock(now = new Date()) {
    const parts = Object.fromEntries(formatter.formatToParts(now).map(p => [p.type,p.value]));
    const date = parts.year+'-'+parts.month+'-'+parts.day;
    const hour = Number(parts.hour);
    const period = hour >= 7 && hour < 10 ? 'morning' : hour >= 21 && hour < 23 ? 'evening' : null;
    const weekday = new Date(Date.UTC(Number(parts.year),Number(parts.month)-1,Number(parts.day))).getUTCDay();
    return {date,period,index:(weekday+6)%7,key:date+'|'+period};
  }
  function readRecord() {
    try { const parsed = JSON.parse(localStorage.getItem(STORE) || '{}');
      if (parsed && typeof parsed === 'object') remembered = parsed;
    } catch(e) { /* lưu trữ bị chặn: dùng bộ nhớ phiên */ }
    return remembered;
  }
  function alreadyRead(current) {
    const record = readRecord();
    return record.date === current.date && record[current.period] === true;
  }
  function markRead(current) {
    const old = readRecord();
    remembered = old.date === current.date ? {...old} : {date:current.date};
    remembered[current.period] = true;
    try { localStorage.setItem(STORE,JSON.stringify(remembered)); } catch(e) {}
  }
  function hideAll() {
    clearTimeout(timer); timer = null;
    $('widget').hidden = true;
    $('letter').classList.remove('visible');
    $('letter').setAttribute('aria-hidden','true');
    $('mailbox').className = 'mailbox idle';
    $('mailbox').disabled = false;
    state = 'hidden';
    if (root.activeElement && returnFocus && returnFocus.isConnected) {
      returnFocus.focus({preventScroll:true});
    }
    returnFocus = null;
  }
  function sync() {
    const current = clock();
    if (!current.period) { hideAll(); slot = null; return; }
    if (slot && slot.key === current.key && (state === 'opening' || state === 'letter')) return;
    if (!slot || slot.key !== current.key) { hideAll(); slot = current; }
    if (alreadyRead(current)) { hideAll(); return; }
    $('phaseRoot').classList.toggle('night',current.period === 'evening');
    $('widget').hidden = false;
    $('mailbox').setAttribute('aria-label','Mở lời chào buổi '+(current.period === 'morning'?'sáng':'tối'));
    $('hint').textContent = 'Có thư cho cậu ♡';
    state = 'idle';
  }
  function showLetter(expectedKey) {
    const current = clock();
    if (!current.period || current.key !== expectedKey) { sync(); return; }
    slot = current;
    $('message').textContent = greetings[current.period][current.index];
    $('heading').textContent = current.period === 'morning' ? 'Chào ngày mới ♡' : 'Một tối bình yên ☾';
    $('stamp').textContent = 'MỘT LÁ THƯ TỪ TEAGHIU';
    $('dayLabel').textContent = 'Dành riêng cho cậu ♡';
    $('widget').hidden = true;
    $('letter').classList.add('visible');
    $('letter').setAttribute('aria-hidden','false');
    state = 'letter';
    markRead(current);
    $('close').focus({preventScroll:true});
  }
  $('mailbox').addEventListener('click', () => {
    // Kiểm tra lại giờ ngay khi bấm, kể cả khi tab vừa được đánh thức.
    sync();
    if (state !== 'idle' || !slot) return;
    returnFocus = document.activeElement === host ? null : document.activeElement;
    state = 'opening';
    $('mailbox').disabled = true;
    $('mailbox').className = 'mailbox opening';
    $('hint').textContent = slot.period === 'morning' ? 'Đợi chim một chút…' : 'Chim đang kéo thư…';
    const key = slot.key;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer = setTimeout(() => showLetter(key), reduced ? 120 : slot.period === 'morning' ? 3900 : 4500);
  });
  $('close').addEventListener('click', () => { hideAll(); sync(); });
  root.addEventListener('keydown', e => { if (e.key === 'Escape') { hideAll(); sync(); } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  window.addEventListener('pageshow',sync);
  window.addEventListener('storage', e => { if (e.key === STORE) sync(); });
  setInterval(sync,15000);
  sync();
})();
