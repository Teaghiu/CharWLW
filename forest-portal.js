/* TeaGhiu · Menu gọn + mở khu rừng không tải lại hộp nhạc.
   Đặt sau script music-player-v4.js trong index/commands/isekai-guide. */
(() => {
  'use strict';
  if(document.getElementById('teaghiu-forest-menu'))return;
  const navbar=document.querySelector('.navbar-inner');
  if(!navbar)return;
  const css=document.createElement('style');
  css.textContent=`
    .navbar .nav-links,.navbar .nav-actions,.tabbar{display:none!important}
    .navbar-inner{justify-content:space-between}
    #teaghiu-forest-menu{margin-left:auto;flex:0 0 auto}
    #teaghiu-forest-overlay{position:fixed;inset:0;z-index:9900;background:#142d28}
    #teaghiu-forest-overlay[hidden]{display:none!important}
    #teaghiu-forest-overlay iframe{width:100%;height:100%;border:0;display:block}
    body.teaghiu-forest-open #teaghiu-greeting-host,
    body.teaghiu-forest-open #teaghiu-bento-host{display:none!important}
  `;
  document.head.appendChild(css);
  const host=document.createElement('div');host.id='teaghiu-forest-menu';
  const root=host.attachShadow({mode:'open'});
  root.innerHTML=`<style>
    :host{font-family:system-ui,sans-serif}button,a{font:inherit;cursor:pointer}
    .toggle{width:40px;height:38px;border:1px solid #9daccb55;background:#ffffff0c;color:var(--text,#e9edf6);border-radius:10px;font-size:22px}
    .panel{position:fixed;right:12px;top:65px;width:min(260px,calc(100vw - 24px));padding:10px;background:var(--panel,#191d2d);color:var(--text,#e9edf6);border:1px solid #8895b444;border-radius:15px;box-shadow:0 15px 45px #0004;z-index:9990;max-height:calc(100dvh - 90px);overflow:auto}
    [hidden]{display:none!important}.panel a,.panel button{display:block;width:100%;box-sizing:border-box;padding:11px;border:0;border-radius:8px;background:transparent;color:inherit;text-decoration:none;text-align:left;font-size:13px;line-height:1.5}.panel a:hover,.panel button:hover{background:#a4b1cf17}.forest{background:#748c6225!important;margin:5px 0}.sep{border-top:1px solid #8191ae33;margin:5px 0}
  </style><button class="toggle" aria-label="Mở điều hướng" aria-expanded="false">☰</button><nav class="panel" hidden aria-label="Điều hướng TeaGhiu"></nav>`;
  const toggle=root.querySelector('.toggle'),panel=root.querySelector('.panel');
  const sourceLinks=document.querySelectorAll('.navbar .nav-links a');
  sourceLinks.forEach(link=>{
    const a=link.cloneNode(true);a.removeAttribute('class');a.onclick=()=>closeMenu();panel.appendChild(a);
  });
  const forestButton=document.createElement('button');forestButton.textContent='📖 Cuốn sách khu rừng';forestButton.className='forest';forestButton.onclick=openForest;panel.appendChild(forestButton);
  const sep=document.createElement('div');sep.className='sep';panel.appendChild(sep);
  const musicButton=document.createElement('button');musicButton.textContent='🎵 Hộp nhạc';musicButton.onclick=()=>{closeMenu();openMusic();};panel.appendChild(musicButton);
  const themeButton=document.createElement('button');themeButton.textContent='☀️ / 🌙 Chuyển sáng tối';themeButton.onclick=()=>{document.getElementById('themeToggle')?.click();syncTheme();};panel.appendChild(themeButton);
  navbar.appendChild(host);
  function closeMenu(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}
  toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
  document.addEventListener('click',e=>{if(!e.composedPath().includes(host))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  let overlay=null,frame=null,oldOverflow='';
  function send(action,extra={}){if(frame)frame.contentWindow.postMessage({source:'teaghiu-portal',action,...extra},location.origin);}
  function syncTheme(){send('theme',{dark:!document.body.classList.contains('light')});}
  function openMusic(){const disc=document.getElementById('bgmDisc');if(disc)disc.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));}
  function openForest(){
    closeMenu();
    if(!overlay){overlay=document.createElement('section');overlay.id='teaghiu-forest-overlay';overlay.setAttribute('aria-label','Cuốn sách khu rừng');frame=document.createElement('iframe');frame.title='Cuốn sách khu rừng TeaGhiu';frame.src='khu-rung.html?embedded=1';frame.addEventListener('load',syncTheme);overlay.appendChild(frame);document.body.appendChild(overlay);}
    if(!document.body.classList.contains('teaghiu-forest-open'))oldOverflow=document.body.style.overflow;
    overlay.hidden=false;document.body.classList.add('teaghiu-forest-open');document.body.style.overflow='hidden';syncTheme();
  }
  function closeForest(){if(!overlay)return;send('pause');overlay.hidden=true;document.body.classList.remove('teaghiu-forest-open');document.body.style.overflow=oldOverflow;forestButton.focus({preventScroll:true});}
  window.addEventListener('message',e=>{
    if(!frame||e.source!==frame.contentWindow||e.origin!==location.origin||e.data?.source!=='teaghiu-forest')return;
    if(e.data.action==='music')openMusic();
    if(e.data.action==='close')closeForest();
    if(e.data.action==='theme'){document.getElementById('themeToggle')?.click();syncTheme();}
  });
})();
