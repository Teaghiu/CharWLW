/* ============================================================
   TeaGhiu · music-player.js  —  HỘP NHẠC (bản 11/10/2026)
   ------------------------------------------------------------
   Có gì mới so với bản cũ:
   1. ĐĨA TRÒN KÉO ĐƯỢC như nút Home ảo của iPhone (lên/xuống/trái/phải),
      tự hít vào mép gần nhất, nhớ vị trí cho lần sau.
   2. PANEL mới theo bố cục hộp nhạc: đĩa than quay, tên bài, badge trạng thái,
      thẻ playlist, thanh âm lượng + 4 nút nhanh (Tắt tiếng/30/60/100%),
      thanh tiến độ bấm tua được, nút "Tự chuyển bài", 4 nút điều khiển,
      playlist đánh số chạm là phát.
   3. THANH "NOW PLAYING" nhỏ ở đáy: chỉ hiện khi đang phát, có ⏮ ⏸ ⏭ + mở
      playlist; bấm ✕ để ẩn (lần sau bấm Phát sẽ hiện lại).
   4. Báo đúng trạng thái phát/dừng, chạy được trên cả 3 trang
      (index / commands / isekai-guide) — file này tự chèn CSS, không cần sửa style.css.
   ============================================================ */

(function () {
  "use strict";

  /* =========================================================
     1. PLAYLIST — đặt các file MP3 ngay trong thư mục web
     ========================================================= */
  var playlist = [
    { title: "呓语 (Whisper)",                 src: "whisper.mp3",          sub: "Nhẹ như hơi thở · bài mặc định" },
    { title: "你是不是也喜欢我 (Nữ sinh)",     src: "xihuan-wo.mp3",        sub: "Trong veo tuổi học trò" },
    { title: "烟波辞 (Lovers in River Mist)",  src: "river-mist.mp3",       sub: "Khói sương cổ trang" },
    { title: "七夕雨 (Qixi Festival Rain)",    src: "qixi-rain.mp3",        sub: "Mưa đêm Ngưu Lang – Chức Nữ" },
    { title: "Love Spanning Millennia",        src: "millennia-dance.mp3",  sub: "Vượt ngàn năm để gặp lại" },
    { title: "Sword of Coming Safety",         src: "sword-safety.mp3",     sub: "Kiếm ý thanh tao" },
    { title: "Moonlit Lanterns",               src: "moonlit-lanterns.mp3", sub: "Đèn hoa dưới ánh trăng" },
    { title: "上海雨巷 (Shanghai Rain Alley)", src: "shanghai.mp3",         sub: "Ngõ mưa Thượng Hải" },
    { title: "海浪低语 (Ocean Waves)",         src: "ocean-waves.mp3",      sub: "Sóng biển thì thầm" },
    { title: "上海夜色 (Shanghai Night)",      src: "shanghai-01.mp3",      sub: "Đêm Thượng Hải lên đèn" },
    { title: "远方节拍 (Afro Pop)",            src: "afro-pop.mp3",         sub: "Nhịp trống phương xa" },
    { title: "春日咖啡 (Coffee Spring)",       src: "coffee-spring.mp3",    sub: "Cà phê một sáng xuân" },
    { title: "双耳幻境 (Binaural Dream)",      src: "binaural.mp3",         sub: "Không gian hai tai · thư giãn sâu" },
    { title: "山巅 (Mountain Podium)",         src: "mountain-podium.mp3",  sub: "Gió thổi trên đỉnh núi" },
    { title: "疏光眠 (Shu Guang Mian)",        src: "shugmian.mp3",         sub: "Ánh sáng thưa · dễ ngủ" },
    { title: "瞬息 (Transient)",               src: "transient.mp3",        sub: "Chỉ trong khoảnh khắc" },
    { title: "山间静思 (Mountain Study)",      src: "mountain-study.mp3",   sub: "Tĩnh tâm giữa núi rừng" },
    { title: "孤独患者", src: "gudu-huanzhe.mp3", sub: "Trần Dịch Tấn" },
    { title: "不用说抱歉", src: "buyong-shuobaoqian.mp3", sub: "Không cần nói xin lỗi" },
    { title: "h3R3 - 不再需要你", src: "h3R3-buzaixuyaoni.mp3", sub: "Không còn cần em nữa" },
    { title: "最后的借口", src: "zuihoude-jiekou.mp3", sub: "Lời viện cớ cuối cùng - h3R3" },
    { title: "忘不掉你", src: "wangbudiaoni.mp3", sub: "Người không thể quên - h3R3" },
    { title: "xiangweixiaosan", src: "xiangweixiaosan.mp3", sub: "Hương vị tiêu tán - Cao Húc, h3R3" },
    { title: "亲爱的", src: "qinaide.mp3", sub: "Em thân yêu - h3R3" },
    { title: "vết gỉ", src: "vet-gi.mp3", sub: "Vết gỉ - h3R3" },
    { title: "先说谎的人", src: "xianshuohuangderen.mp3", sub: "Người nói dối trước - h3R3" },
    { title: "回到你身边", src: "huidaonishibian.mp3", sub: "Trở về bên cạnh bạn - h3R3" },
    { title: "一生所爱 x 爱以为常", src: "yishensuoai-aiyiweichang.mp3", sub: "Mashup Nhất Sinh Đích Ái x Yêu Như Thói Quen" },
    { title: "瞬", src: "shun.mp3", sub: "Thuấn - Trịnh Nhuận Trạch" },
    { title: "沉溺", src: "chenni.mp3", sub: "Trầm Nịch - Trâu Phái Phái, Pank" },
    { title: "安静的稻草人", src: "anjingde-daocaoren.mp3", sub: "Người rơm lặng lẽ - Daven Wu" },
    { title: "Hỷ cát đông kỳ", src: "hy-cat-dong-ky.mp3", sub: "Hỷ Sắc / Hỷ Hỉ" },
    { title: "美人鱼", src: "meirenyu.mp3", sub: "Mỹ Nhân Ngư - Lâm Tuấn Kiệt" },
    { title: "Dập tắt", src: "dap-tat.mp3", sub: "Nhạc Trung" },
    { title: "Âm thanh của nỗi nhớ anh", src: "am-thanh-noi-nho-anh.mp3", sub: "Deng..." },
    { title: "苦生恨", src: "kushenhen.mp3", sub: "Khổ Sinh Hận - Lưu Niên" },
    { title: "雨是神的烟花", src: "yushishendeyanhua.mp3", sub: "Mưa là pháo hoa của thần linh" }
  ];

  /* =========================================================
     2. ĐỌC TRẠNG THÁI ĐÃ LƯU
     ========================================================= */
  function ls(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var currentIndex = parseInt(ls("bgm_idx", "0"), 10);
  if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= playlist.length) currentIndex = 0;

  var isRepeatOne = ls("bgm_repeat", "false") === "true";
  var isShuffle = ls("bgm_shuffle", "true") !== "false";   // mặc định BẬT ngẫu nhiên như bản cũ
  var isAutoNext = ls("bgm_auto", "true") !== "false";     // tự chuyển bài khi hết
  var isMuted = ls("bgm_muted", "false") === "true";

  var savedVolume = parseFloat(ls("bgm_volume", "0.4"));
  if (isNaN(savedVolume)) savedVolume = 0.4;
  savedVolume = Math.max(0, Math.min(1, savedVolume));

  var barHidden = ls("bgm_bar_off", "false") === "true";

  /* =========================================================
     3. THẺ AUDIO
     ========================================================= */
  var audio = new Audio();
  audio.preload = "none";               // chỉ tải khi người dùng bấm Phát — tránh khung nhạc đen của Chrome hiện sẵn khi vừa mở trang
  audio.volume = savedVolume;
  audio.muted = isMuted;

  var seeking = false;

  function loadTrack(idx, autoplay) {
    if (idx < 0 || idx >= playlist.length) idx = 0;
    currentIndex = idx;
    lsSet("bgm_idx", String(currentIndex));
    audio.src = "music/" + playlist[currentIndex].src;
    if (autoplay) audio.play().catch(function () {});
    updateUI();
  }

  /* =========================================================
     4. CSS (tự chèn — dùng chung cho cả 3 trang)
     ========================================================= */
  var css = document.createElement("style");
  css.textContent = [
    ":root{--bgm-lift:0px}",
    "html.bgm-bar-on{--bgm-lift:66px}",


    /* ---------- ĐĨA TRÒN NỔI (kéo được) ---------- */
    ".bgm-dock.hide{display:none}",
    ".bgm-dock{position:fixed;z-index:9994;right:14px;bottom:calc(92px + var(--bgm-lift) + env(safe-area-inset-bottom,0px));width:56px;height:56px;touch-action:none}",
    ".bgm-disc{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;cursor:pointer;",
    "  background:radial-gradient(circle at 32% 28%,rgba(167,139,250,.95),rgba(34,211,238,.85) 62%,rgba(244,114,182,.9));",
    "  border:2px solid rgba(255,255,255,.35);box-shadow:0 10px 26px rgba(0,0,0,.5),0 0 0 6px rgba(167,139,250,.10);",
    "  color:#07111a;font-size:24px;line-height:1;-webkit-user-select:none;user-select:none;",
    "  -webkit-tap-highlight-color:transparent;transition:transform .18s ease,box-shadow .18s ease}",
    ".bgm-disc:active{transform:scale(.94)}",
    ".bgm-disc .bgm-ico{display:block;transform:translateY(1px)}",
    ".bgm-dock.playing .bgm-disc{animation:bgm-pulse 2.4s ease-in-out infinite}",
    ".bgm-dock.playing .bgm-ico{animation:bgm-spin 4.5s linear infinite}",
    "@keyframes bgm-spin{to{transform:rotate(360deg)}}",
    "@keyframes bgm-pulse{0%,100%{box-shadow:0 10px 26px rgba(0,0,0,.5),0 0 0 6px rgba(167,139,250,.10)}50%{box-shadow:0 10px 30px rgba(0,0,0,.55),0 0 0 12px rgba(34,211,238,.10)}}",
    ".bgm-hint{position:absolute;top:-8px;left:50%;transform:translate(-50%,-100%);white-space:nowrap;",
    "  background:rgba(20,22,35,.96);border:1px solid rgba(255,255,255,.16);color:#f4f6ff;",
    "  font:600 11px/1 'Inter',system-ui,sans-serif;padding:7px 10px;border-radius:999px;box-shadow:0 8px 20px rgba(0,0,0,.45);",
    "  opacity:0;pointer-events:none;transition:opacity .25s ease}",
    ".bgm-hint.show{opacity:1}",

    /* ---------- THANH NOW PLAYING ---------- */
    ".bgm-bar{position:fixed;z-index:9991;left:50%;transform:translate(-50%,140%);",
    "  bottom:calc(16px + env(safe-area-inset-bottom,0px));width:min(560px,calc(100vw - 24px));",
    "  display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:999px;",
    "  background:rgba(14,16,28,.92);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);",
    "  box-shadow:0 14px 40px rgba(0,0,0,.55);transition:transform .32s cubic-bezier(.2,.9,.3,1),opacity .32s ease;opacity:0}",
    ".bgm-bar.on{transform:translate(-50%,0);opacity:1}",
    ".bgm-bar-art{width:38px;height:38px;flex:0 0 38px;border-radius:50%;display:grid;place-items:center;font-size:18px;",
    "  background:conic-gradient(from 210deg,#a78bfa,#22d3ee,#f472b6,#a78bfa);color:#07111a}",
    ".bgm-bar.on .bgm-bar-art{animation:bgm-spin 5.5s linear infinite}",
    ".bgm-bar-prog{position:absolute;left:14px;right:14px;bottom:3px;height:2px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}",
    ".bgm-bar-prog::after{content:'';display:block;height:100%;width:var(--bgm-p,0%);border-radius:99px;background:linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)}",
    ".bgm-bar-txt{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px;cursor:pointer}",
    ".bgm-bar-txt b{font:700 13px/1.25 'Inter',system-ui,sans-serif;color:#f4f6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".bgm-bar-txt small{font:500 10.5px/1.2 'Inter',system-ui,sans-serif;color:rgba(244,246,255,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".bgm-bar-btn{flex:0 0 auto;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);",
    "  color:#f4f6ff;font-size:14px;display:grid;place-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .18s ease,transform .12s ease}",
    ".bgm-bar-btn:active{transform:scale(.92)}",
    ".bgm-bar-btn.main{width:42px;height:42px;font-size:16px;color:#07111a;border-color:transparent;background:linear-gradient(135deg,#a78bfa,#22d3ee)}",
    ".bgm-bar-btn.ghost{background:transparent;border-color:transparent;color:rgba(244,246,255,.55);width:30px}",

    /* ---------- NỀN MỜ + PANEL ---------- */
    ".bgm-scrim{position:fixed;inset:0;z-index:9992;background:rgba(5,6,12,.62);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .28s ease}",
    ".bgm-scrim.on{opacity:1;pointer-events:auto}",
    ".bgm-sheet{position:fixed;z-index:9993;left:50%;transform:translate(-50%,105%);",
    "  bottom:0;width:min(460px,100vw);max-height:90vh;overflow-y:auto;-webkit-overflow-scrolling:touch;",
    "  background:linear-gradient(180deg,rgba(20,22,36,.98),rgba(11,12,22,.99));",
    "  border:1px solid rgba(255,255,255,.14);border-bottom:none;border-radius:26px 26px 0 0;",
    "  box-shadow:0 -20px 60px rgba(0,0,0,.6);padding:14px 16px calc(18px + env(safe-area-inset-bottom,0px));",
    "  transition:transform .34s cubic-bezier(.2,.9,.3,1);color:#f4f6ff;font-family:'Inter',system-ui,-apple-system,sans-serif}",
    ".bgm-sheet.on{transform:translate(-50%,0)}",
    "@media (min-width:901px){.bgm-sheet{bottom:50%;transform:translate(-50%,50%) scale(.94);opacity:0;pointer-events:none;border-radius:26px;border-bottom:1px solid rgba(255,255,255,.14);max-height:86vh}",
    "  .bgm-sheet.on{transform:translate(-50%,50%) scale(1);opacity:1;pointer-events:auto}}",

    ".bgm-grip{position:relative;width:44px;height:4px;border-radius:99px;background:rgba(255,255,255,.22);margin:6px auto 12px}",
    ".bgm-topbar{position:sticky;top:0;z-index:6;margin:0 -6px;padding:2px 6px 0;",
    "  background:linear-gradient(180deg,rgba(20,22,36,.99) 70%,rgba(20,22,36,.90));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}",
    ".bgm-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:10px;border-bottom:1px dashed rgba(255,255,255,.16)}",
    ".bgm-head h3{margin:0;font:800 12.5px/1.3 'Inter',sans-serif;letter-spacing:.14em;text-transform:uppercase;",
    "  background:linear-gradient(135deg,#a78bfa,#22d3ee 55%,#f472b6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}",
    ".bgm-x{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#f4f6ff;font-size:15px;display:grid;place-items:center;cursor:pointer}",

    /* đĩa than */
    ".bgm-hero{text-align:center;padding:16px 0 6px}",
    ".bgm-vinyl{width:104px;height:104px;margin:0 auto 12px;border-radius:50%;position:relative;display:grid;place-items:center;",
    "  background:radial-gradient(circle,#2a2246 18%,#171a2e 19%,#0e1020 60%,#1c1836 100%);",
    "  border:1px solid rgba(255,255,255,.16);box-shadow:0 14px 34px rgba(0,0,0,.55),inset 0 0 0 6px rgba(255,255,255,.03)}",
    ".bgm-vinyl::after{content:'';position:absolute;inset:10px;border-radius:50%;background:conic-gradient(from 0deg,rgba(167,139,250,.30),rgba(34,211,238,.24),rgba(244,114,182,.30),rgba(167,139,250,.30))}",
    ".bgm-vinyl span{position:relative;z-index:1;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:17px;",
    "  background:linear-gradient(135deg,#a78bfa,#22d3ee);color:#07111a;box-shadow:0 6px 16px rgba(0,0,0,.45)}",
    ".bgm-sheet.playing .bgm-vinyl{animation:bgm-spin 7s linear infinite}",
    ".bgm-hero h4{margin:0;font:800 19px/1.3 'Inter',sans-serif;color:#f4f6ff;word-break:break-word}",
    ".bgm-hero p{margin:6px 0 0;font:italic 500 12.5px/1.6 'Inter',sans-serif;color:rgba(244,246,255,.66)}",
    ".bgm-badge{display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:7px 14px;border-radius:999px;",
    "  background:rgba(34,211,238,.10);border:1px solid rgba(34,211,238,.30);color:#a5f3fc;font:600 11.5px/1 'Inter',sans-serif}",
    ".bgm-badge.paused{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.16);color:rgba(244,246,255,.7)}",
    ".bgm-dot{width:7px;height:7px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}",

    /* thẻ playlist */
    ".bgm-card{margin-top:16px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10)}",
    ".bgm-card-row{display:flex;align-items:center;gap:10px}",
    ".bgm-card-row b{flex:1 1 auto;min-width:0;font:700 13.5px/1.4 'Inter',sans-serif;color:#f4f6ff}",
    ".bgm-tag{flex:0 0 auto;padding:5px 10px;border-radius:999px;background:rgba(167,139,250,.16);border:1px solid rgba(167,139,250,.38);",
    "  color:#ddd6fe;font:700 10.5px/1 'Inter',sans-serif}",
    ".bgm-card p{margin:6px 0 0;font:500 12px/1.5 'Inter',sans-serif;color:rgba(244,246,255,.6)}",

    /* âm lượng */
    ".bgm-vol{display:flex;align-items:center;gap:10px;margin-top:16px}",
    ".bgm-vol button{flex:0 0 auto;width:30px;height:30px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#f4f6ff;font-size:14px;display:grid;place-items:center;cursor:pointer}",
    ".bgm-vol input[type=range]{flex:1 1 auto;min-width:0;height:22px;accent-color:#a78bfa;background:transparent;cursor:pointer}",
    ".bgm-pct{flex:0 0 42px;text-align:right;font:700 12px/1 'Inter',sans-serif;color:#a5f3fc}",
    ".bgm-quick{display:flex;margin-top:8px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.10)}",
    ".bgm-quick button{flex:1 1 0;padding:9px 4px;border:none;border-right:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);",
    "  color:rgba(244,246,255,.75);font:600 11px/1 'Inter',sans-serif;cursor:pointer}",
    ".bgm-quick button:last-child{border-right:none}",
    ".bgm-quick button.on{background:linear-gradient(135deg,rgba(167,139,250,.9),rgba(34,211,238,.9));color:#07111a}",

    /* tiến độ */
    ".bgm-prog{display:flex;align-items:center;gap:9px;margin-top:14px}",
    ".bgm-prog span{flex:0 0 38px;font:600 11px/1 'Inter',sans-serif;color:rgba(244,246,255,.55);font-variant-numeric:tabular-nums}",
    ".bgm-prog span:last-child{text-align:right}",
    ".bgm-prog input[type=range]{flex:1 1 auto;min-width:0;height:22px;accent-color:#22d3ee;background:transparent;cursor:pointer}",

    /* chế độ */
    ".bgm-mode{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;padding:11px 12px;",
    "  border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);color:#f4f6ff;",
    "  font:600 12.5px/1.3 'Inter',sans-serif;cursor:pointer;text-align:left}",
    ".bgm-mode b{flex:0 0 auto;padding:6px 11px;border-radius:999px;background:rgba(34,197,94,.16);border:1px solid rgba(34,197,94,.38);color:#86efac;font:800 10.5px/1 'Inter',sans-serif;letter-spacing:.03em}",
    ".bgm-mode.off b{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.16);color:rgba(244,246,255,.6)}",
    ".bgm-note{margin:7px 0 0;font:500 11.5px/1.5 'Inter',sans-serif;color:rgba(244,246,255,.55)}",

    /* điều khiển */
    ".bgm-ctl{display:grid;grid-template-columns:1fr 1.5fr 1fr 1fr;gap:8px;margin-top:14px}",
    ".bgm-ctl button{padding:12px 6px;border-radius:13px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);",
    "  color:#f4f6ff;font:700 11.5px/1 'Inter',sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .12s ease,background .18s ease}",
    ".bgm-ctl button:active{transform:scale(.96)}",
    ".bgm-ctl button.main{padding:13px 6px;color:#07111a;border-color:transparent;background:linear-gradient(135deg,#a78bfa,#22d3ee);font-size:12.5px}",
    ".bgm-ctl button.on{background:rgba(34,211,238,.16);border-color:rgba(34,211,238,.4);color:#a5f3fc}",

    /* playlist */
    ".bgm-list-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:20px 0 8px}",
    ".bgm-list-head span:first-child{font:800 11.5px/1.3 'Inter',sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#ddd6fe}",
    ".bgm-list-head span:last-child{font:600 10.5px/1.3 'Inter',sans-serif;color:rgba(244,246,255,.5);text-align:right}",
    ".bgm-list{display:flex;flex-direction:column;gap:8px;max-height:38vh;overflow-y:auto;padding-right:2px}",
    ".bgm-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.04);",
    "  border:1px solid rgba(255,255,255,.09);cursor:pointer;text-align:left;transition:background .18s ease,border-color .18s ease}",
    ".bgm-row:hover{background:rgba(255,255,255,.07)}",
    ".bgm-row.now{background:linear-gradient(135deg,rgba(167,139,250,.20),rgba(34,211,238,.12));border-color:rgba(167,139,250,.45)}",
    ".bgm-no{flex:0 0 26px;font:800 12px/1 'Inter',sans-serif;color:rgba(244,246,255,.45);font-variant-numeric:tabular-nums}",
    ".bgm-row.now .bgm-no{color:#ddd6fe}",
    ".bgm-info{flex:1 1 auto;min-width:0}",
    ".bgm-info b{display:block;font:700 12.8px/1.35 'Inter',sans-serif;color:#f4f6ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".bgm-info small{display:block;margin-top:2px;font:500 10.8px/1.35 'Inter',sans-serif;color:rgba(244,246,255,.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".bgm-play{flex:0 0 auto;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);",
    "  color:rgba(244,246,255,.8);font:700 10.5px/1 'Inter',sans-serif}",
    ".bgm-row.now .bgm-play{background:linear-gradient(135deg,#a78bfa,#22d3ee);border-color:transparent;color:#07111a}",

    ".bgm-foot{margin:14px 0 0;text-align:center;font:500 10.5px/1.5 'Inter',sans-serif;color:rgba(244,246,255,.42)}",

    /* mobile: chừa chỗ cho thanh tab dưới của web */
    ".bgm-grip{touch-action:none;cursor:grab}",
    ".bgm-grip::after{content:'vuốt xuống để đóng';position:absolute;left:50%;bottom:calc(100% + 5px);transform:translateX(-50%);font:600 9.5px/1 'Inter',sans-serif;letter-spacing:.05em;color:rgba(244,246,255,.34);white-space:nowrap;pointer-events:none}",
    "@media (max-width:900px){",
    "  .bgm-bar{bottom:calc(78px + env(safe-area-inset-bottom,0px));width:min(560px,calc(100vw - 88px));left:12px;transform:translate(0,140%)}",
    "  .bgm-bar.on{transform:translate(0,0)}",
    "  .bgm-dock{bottom:calc(86px + var(--bgm-lift) + env(safe-area-inset-bottom,0px))}",
    /* thu gọn để thấy được playlist mà đỡ phải cuộn */
    "  .bgm-sheet{max-height:88vh;padding:10px 14px calc(16px + env(safe-area-inset-bottom,0px))}",
    "  .bgm-grip{width:40px;margin-bottom:8px}",
    "  .bgm-hero{padding:8px 0 2px}",
    "  .bgm-vinyl{width:82px;height:82px;margin-bottom:8px}",
    "  .bgm-vinyl span{width:32px;height:32px;font-size:15px}",
    "  .bgm-hero h4{font-size:17px}",
    "  .bgm-hero p{margin-top:4px;font-size:11.8px}",
    "  .bgm-badge{margin-top:8px;padding:6px 12px;font-size:11px}",
    "  .bgm-card{margin-top:10px;padding:10px 12px}",
    "  .bgm-vol{margin-top:10px}",
    "  .bgm-prog{margin-top:10px}",
    "  .bgm-mode{margin-top:10px;padding:10px 12px}",
    "  .bgm-note{margin-top:5px;font-size:11px}",
    "  .bgm-ctl{margin-top:10px}",
    "  .bgm-ctl button{padding:11px 6px}",
    "  .bgm-list-head{margin:14px 0 6px}",
    "  .bgm-list{max-height:42vh;gap:7px}",
    "}",
    "@media (max-width:400px){.bgm-bar-btn{width:33px;height:33px}.bgm-bar-btn.main{width:39px;height:39px}.bgm-bar-art{width:34px;height:34px;flex-basis:34px}}",
    "html.bgm-bar-on #backToTop{bottom:calc(150px + env(safe-area-inset-bottom,0px))!important}",
    "html.bgm-bar-on .toast{bottom:calc(150px + env(safe-area-inset-bottom,0px))!important}",
    "@media (min-width:901px){html.bgm-bar-on #backToTop{/* desktop: thanh nhạc ở đáy */bottom:150px!important}html.bgm-bar-on .toast{bottom:118px!important}}",
    "@media (prefers-reduced-motion:reduce){.bgm-dock.playing .bgm-disc,.bgm-sheet.playing .bgm-vinyl,.bgm-bar.on .bgm-bar-art{animation:none!important}}"
  ].join("");
  document.head.appendChild(css);

  /* =========================================================
     5. DỰNG HTML
     ========================================================= */
  var dock = document.createElement("div");
  dock.className = "bgm-dock";
  dock.innerHTML =
    '<div class="bgm-disc" id="bgmDisc" tabindex="0" aria-label="Hộp nhạc — kéo để di chuyển, chạm để mở">' +
      '<span class="bgm-ico">🎵</span>' +
    '</div>' +
    '<div class="bgm-hint" id="bgmHint">Kéo mình đi chỗ khác được nha • chạm để mở</div>';

  var bar = document.createElement("div");
  bar.className = "bgm-bar";
  bar.innerHTML =
    '<i class="bgm-bar-prog" id="bgmBarProg"></i>' +
    '<span class="bgm-bar-art">🎵</span>' +
    '<span class="bgm-bar-txt" id="bgmBarTxt"><b id="bgmBarTitle">—</b><small id="bgmBarSub">Đang phát</small></span>' +
    '<button class="bgm-bar-btn" id="bgmBarPrev" aria-label="Bài trước">⏮</button>' +
    '<button class="bgm-bar-btn main" id="bgmBarPlay" aria-label="Phát / Tạm dừng">⏸</button>' +
    '<button class="bgm-bar-btn" id="bgmBarNext" aria-label="Bài tiếp">⏭</button>' +
    '<button class="bgm-bar-btn ghost" id="bgmBarClose" aria-label="Ẩn thanh nhạc">✕</button>';

  var scrim = document.createElement("div");
  scrim.className = "bgm-scrim";

  var sheet = document.createElement("div");
  sheet.className = "bgm-sheet";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-label", "Hộp nhạc TeaGhiu");
  sheet.innerHTML =
    '<div class="bgm-topbar">' +
      '<div class="bgm-grip" id="bgmGrip" title="Vuốt xuống hoặc chạm để đóng"></div>' +
      '<div class="bgm-head"><h3>🎧 Hộp nhạc TeaGhiu</h3><button class="bgm-x" id="bgmClose" aria-label="Đóng">✕</button></div>' +
    '</div>' +
    '<div class="bgm-hero">' +
      '<div class="bgm-vinyl"><span>♥</span></div>' +
      '<h4 id="bgmTitle">—</h4>' +
      '<p id="bgmSub">Đang ngân vang trong trẻo &amp; êm ái…</p>' +
      '<div class="bgm-badge" id="bgmBadge"><i class="bgm-dot"></i><span id="bgmBadgeTxt">Nhạc mặc định · Tự động phát</span></div>' +
    '</div>' +
    '<div class="bgm-card">' +
      '<div class="bgm-card-row"><b id="bgmCardName">Hộp nhạc TeaGhiu</b><span class="bgm-tag">Mặc định · Tự động phát</span></div>' +
      '<p id="bgmCardDesc">17 bài dạo êm — tự phát khi bạn ghé thăm, hết bài tự chuyển.</p>' +
    '</div>' +
    '<div class="bgm-vol">' +
      '<button id="bgmVolIcon" aria-label="Tắt/bật tiếng">🔊</button>' +
      '<input type="range" id="bgmVolume" min="0" max="1" step="0.05" aria-label="Âm lượng">' +
      '<span class="bgm-pct" id="bgmVolVal">40%</span>' +
    '</div>' +
    '<div class="bgm-quick" id="bgmQuick">' +
      '<button data-v="0">Tắt tiếng</button><button data-v="0.3">30%</button><button data-v="0.6">60%</button><button data-v="1">100%</button>' +
    '</div>' +
    '<div class="bgm-prog">' +
      '<span id="bgmNow">0:00</span>' +
      '<input type="range" id="bgmSeek" min="0" max="1000" step="1" value="0" aria-label="Tua bài">' +
      '<span id="bgmDur">0:00</span>' +
    '</div>' +
    '<button class="bgm-mode" id="bgmMode"><span>🔄 Chế độ: Tự chuyển bài</span><b id="bgmModeTag">TỰ CHUYỂN: BẬT</b></button>' +
    '<p class="bgm-note">Hết bài sẽ tự chuyển sang bài tiếp theo trong playlist. Tắt đi thì nhạc dừng ở cuối bài.</p>' +
    '<div class="bgm-ctl">' +
      '<button id="bgmPrev">⏮ Trước</button>' +
      '<button class="main" id="bgmPlay">⏸ Tạm dừng</button>' +
      '<button id="bgmRepeat">↻ Repeat</button>' +
      '<button id="bgmNext">Tiếp ⏭</button>' +
    '</div>' +
    '<div class="bgm-list-head"><span>Playlist dịu dàng (' + playlist.length + ' bài)</span><span>Chạm tên bài để nghe</span></div>' +
    '<div class="bgm-list" id="bgmList"></div>' +
    '<p class="bgm-foot">Hộp nhạc TeaGhiu v3 ♥ kéo đĩa để đổi chỗ · tay nắm trên cùng: vuốt xuống để đóng</p>';

  document.body.appendChild(dock);
  document.body.appendChild(bar);
  document.body.appendChild(scrim);
  document.body.appendChild(sheet);

  var $ = function (id) { return document.getElementById(id); };
  var disc = $("bgmDisc"), hint = $("bgmHint"), listEl = $("bgmList");

  /* =========================================================
     6. DANH SÁCH BÀI
     ========================================================= */
  function renderList() {
    listEl.innerHTML = playlist.map(function (t, i) {
      return '<button class="bgm-row' + (i === currentIndex ? " now" : "") + '" data-i="' + i + '">' +
        '<span class="bgm-no">' + (i < 9 ? "0" : "") + (i + 1) + '</span>' +
        '<span class="bgm-info"><b>' + t.title + '</b><small>Hộp nhạc TeaGhiu · ' + t.sub + '</small></span>' +
        '<span class="bgm-play">' + (i === currentIndex ? "♪ Đang phát" : "Phát") + '</span>' +
      '</button>';
    }).join("");
  }

  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* =========================================================
     7. CẬP NHẬT GIAO DIỆN
     ========================================================= */
  function updateUI() {
    var t = playlist[currentIndex];
    var playing = !audio.paused;

    /* panel */
    $("bgmTitle").textContent = t.title;
    $("bgmSub").textContent = playing ? "Đang ngân vang: " + t.sub : "Đang tạm dừng — chạm ▶ để nghe tiếp";
    $("bgmCardDesc").textContent = "Bài " + (currentIndex + 1) + "/" + playlist.length + " · hết bài " +
      (isAutoNext ? "tự chuyển bài tiếp theo." : "sẽ dừng lại (tự chuyển đang tắt).");
    sheet.classList.toggle("playing", playing);
    $("bgmPlay").textContent = playing ? "⏸ Tạm dừng" : "▶ Phát";
    $("bgmBadge").classList.toggle("paused", !playing);
    $("bgmBadgeTxt").textContent = playing
      ? "Đang phát · Tự động phát khi ghé thăm"
      : "Tạm dừng · chạm ▶ để tiếp tục";

    /* đĩa nổi */
    dock.classList.toggle("playing", playing);

    /* thanh now playing */
    $("bgmBarTitle").textContent = t.title;
    $("bgmBarSub").textContent = (playing ? "Đang phát" : "Tạm dừng") + " · bài " + (currentIndex + 1) + "/" + playlist.length;
    $("bgmBarPlay").textContent = playing ? "⏸" : "▶";

    /* nút lặp / ngẫu nhiên */
    $("bgmRepeat").classList.toggle("on", isRepeatOne);
    $("bgmMode").classList.toggle("off", !isAutoNext);
    $("bgmModeTag").textContent = "TỰ CHUYỂN: " + (isAutoNext ? "BẬT" : "TẮT");

    /* âm lượng */
    $("bgmVolume").value = audio.volume;
    $("bgmVolVal").textContent = Math.round(audio.volume * 100) + "%";
    var v = audio.muted ? 0 : audio.volume;
    $("bgmVolIcon").textContent = v === 0 ? "🔇" : (v < 0.5 ? "🔉" : "🔊");
    Array.prototype.forEach.call($("bgmQuick").children, function (b) {
      var bv = parseFloat(b.dataset.v);
      b.classList.toggle("on", Math.abs((audio.muted ? 0 : audio.volume) - bv) < 0.02);
    });

    /* danh sách */
    renderList();

    /* thanh now playing có hiện hay không */
    showBar(playing && !barHidden);
  }

  function showBar(on) {
    bar.classList.toggle("on", !!on);
    document.documentElement.classList.toggle("bgm-bar-on", !!on);
  }

  /* =========================================================
     8. MỞ / ĐÓNG PANEL
     ========================================================= */
  var lastScroll = 0;
  var openedAt = 0;      // thời điểm mở panel
  var closedAt = 0;      // thời điểm đóng panel

  /* Nuốt các cú "click ảo" mà điện thoại bắn ra ngay sau cú chạm
     (đây chính là thứ làm panel vừa mở đã tự đóng) */
  document.addEventListener("click", function (e) {
    if (openedAt && Date.now() - openedAt < 700) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);

  function openPanel() {
    if (sheet.classList.contains("on")) return;      // đang mở rồi thì thôi
    openedAt = Date.now();
    dock.classList.add("hide");      // đĩa tạm ẩn để không đè lên panel
    sheet.classList.add("on");
    scrim.classList.add("on");
    lastScroll = window.scrollY || 0;
    document.body.style.overflow = "hidden";
    lsSet("bgm_hint_seen", "true");
    hint.classList.remove("show");
  }
  function closePanel() {
    if (!sheet.classList.contains("on")) return;
    closedAt = Date.now();
    dock.classList.remove("hide");
    sheet.classList.remove("on");
    scrim.classList.remove("on");
    document.body.style.overflow = "";
  }
  $("bgmClose").addEventListener("click", closePanel);
  scrim.addEventListener("click", function () {
    if (Date.now() - openedAt < 700) return;   // bỏ qua cú click ảo ngay sau khi mở
    closePanel();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet.classList.contains("on")) closePanel();
  });
  $("bgmBarTxt").addEventListener("click", openPanel);

  /* ==== VUỐT XUỐNG ĐỂ ĐÓNG PANEL (kiểu bottom-sheet của điện thoại) ==== */
  var swY = null, swDy = 0;
  function swStart(e) {
    if (window.innerWidth > 900) return;
    swY = e.clientY; swDy = 0;
    sheet.style.transition = "none";
  }
  function swMove(e) {
    if (swY === null) return;
    swDy = Math.max(0, e.clientY - swY);
    sheet.style.transform = "translate(-50%," + swDy + "px)";
  }
  var swCanceled = false;
  function swEnd(ev) {
    if (swY === null) return;
    swY = null;
    sheet.style.transition = "";
    sheet.style.transform = "";
    if (ev && ev.type === "pointercancel") { swCanceled = true; swDy = 0; return; }
    if (swDy > 70) closePanel();              // vuốt xuống đủ xa → đóng
    else if (swDy < 8 && !swCanceled) closePanel();   // chỉ chạm nhẹ vào tay nắm → cũng đóng
    swDy = 0;
  }
  [document.getElementById("bgmGrip"), sheet.querySelector(".bgm-head")].forEach(function (el) {
    if (!el) return;
    el.addEventListener("pointerdown", function (e) {
      swCanceled = false;
      swStart(e);
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    }, { passive: true });
    el.addEventListener("pointermove", swMove, { passive: true });
    el.addEventListener("pointerup", swEnd);
    el.addEventListener("pointercancel", swEnd);
  });

  /* =========================================================
     9. KÉO ĐĨA (như nút Home ảo của iPhone)
     ========================================================= */
  var pos = null;
  try { pos = JSON.parse(localStorage.getItem("bgm_pos") || "null"); } catch (e) { pos = null; }

  function discSize() { return 56; }

  function clampY(y) {
    var pad = 8;
    var maxY = window.innerHeight - discSize() - pad;
    // Trên điện thoại: không cho đĩa chui xuống dưới thanh tab
    var tb = document.querySelector('.tabbar');
    if (tb && window.innerWidth <= 900) {
      var r = tb.getBoundingClientRect();
      if (r.height) maxY = Math.min(maxY, r.top - discSize() - pad);
    }
    return Math.max(pad, Math.min(maxY, y));
  }

  function applyPos(animate) {
    if (!pos) {   // chưa kéo bao giờ → dùng vị trí mặc định (góc phải, trên thanh nhạc)
      dock.style.left = "";
      dock.style.right = "";
      dock.style.top = "";
      return;
    }
    dock.style.transition = animate ? "left .25s ease, right .25s ease, top .25s ease" : "none";
    dock.style.top = clampY(pos.y) + "px";
    dock.style.bottom = "auto";
    if (pos.side === "left") { dock.style.left = "14px"; dock.style.right = "auto"; }
    else { dock.style.right = "14px"; dock.style.left = "auto"; }
    if (animate) setTimeout(function () { dock.style.transition = "none"; }, 300);
  }
  applyPos(false);

  var dragging = false, moved = false, startX = 0, startY = 0, baseX = 0, baseY = 0, pid = null;

  function pointDown(x, y) {
    if (Date.now() - closedAt < 350) return;   // vừa đóng panel, bỏ qua cú chạm kế tiếp
    dragging = true; moved = false; startX = x; startY = y;
    var r = dock.getBoundingClientRect();
    baseX = r.left; baseY = r.top;
    dock.style.transition = "none";
    dock.style.left = r.left + "px"; dock.style.right = "auto";
    dock.style.top = r.top + "px"; dock.style.bottom = "auto";
    if (!ls("bgm_hint_seen", "")) { hint.classList.add("show"); }
  }
  function pointMove(x, y) {
    if (!dragging) return;
    var dx = x - startX, dy = y - startY;
    if (!moved && Math.abs(dx) + Math.abs(dy) > 6) moved = true;
    if (!moved) return;
    var nx = Math.max(8, Math.min(window.innerWidth - discSize() - 8, baseX + dx));
    var ny = clampY(baseY + dy);
    dock.style.left = nx + "px";
    dock.style.top = ny + "px";
  }
  function pointUp() {
    if (!dragging) return;
    dragging = false;
    hint.classList.remove("show");
    if (!moved) { openPanel(); return; }
    var r = dock.getBoundingClientRect();
    var side = (r.left + r.width / 2) < window.innerWidth / 2 ? "left" : "right";
    pos = { side: side, y: clampY(r.top) };
    lsSet("bgm_pos", JSON.stringify(pos));
    applyPos(true);
  }

  if (window.PointerEvent) {
    disc.addEventListener("pointerdown", function (e) {
      pid = e.pointerId;
      try { disc.setPointerCapture(pid); } catch (err) {}
      pointDown(e.clientX, e.clientY);
      e.preventDefault();
    }, { passive: false });
    disc.addEventListener("pointermove", function (e) { pointMove(e.clientX, e.clientY); });
    disc.addEventListener("pointerup", function (e) {
      pointUp();
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    disc.addEventListener("pointercancel", function () { pointUp(); });
  } else {   // máy cũ không có PointerEvent
    disc.addEventListener("touchstart", function (e) {
      var t0 = e.touches[0]; pointDown(t0.clientX, t0.clientY);
    }, { passive: true });
    disc.addEventListener("touchmove", function (e) {
      var t0 = e.touches[0]; pointMove(t0.clientX, t0.clientY);
      if (moved) e.preventDefault();
    }, { passive: false });
    disc.addEventListener("touchend", pointUp);
  }
  disc.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPanel(); }
  });
  window.addEventListener("resize", function () { applyPos(false); });
  window.addEventListener("orientationchange", function () { setTimeout(function () { applyPos(false); }, 300); });

  /* =========================================================
     10. ĐIỀU KHIỂN
     ========================================================= */
  function togglePlay(forcePlay) {
    if (audio.paused || forcePlay === true) {
      barHidden = false; lsSet("bgm_bar_off", "false");   // bấm Phát là thanh nhạc hiện lại
      audio.play().catch(function () {});
    } else {
      audio.pause();
    }
  }
  function nextTrack(auto) {
    var n;
    if (isShuffle && playlist.length > 1) {
      do { n = Math.floor(Math.random() * playlist.length); } while (n === currentIndex);
    } else {
      n = (currentIndex + 1) % playlist.length;
    }
    loadTrack(n, true);
  }
  function prevTrack() {
    loadTrack((currentIndex - 1 + playlist.length) % playlist.length, true);
  }

  $("bgmPlay").addEventListener("click", function () { togglePlay(); });
  $("bgmPrev").addEventListener("click", prevTrack);
  $("bgmNext").addEventListener("click", function () { nextTrack(false); });
  $("bgmRepeat").addEventListener("click", function () {
    isRepeatOne = !isRepeatOne;
    lsSet("bgm_repeat", String(isRepeatOne));
    updateUI();
  });
  $("bgmMode").addEventListener("click", function () {
    isAutoNext = !isAutoNext;
    lsSet("bgm_auto", String(isAutoNext));
    updateUI();
  });

  $("bgmBarPlay").addEventListener("click", function () { togglePlay(); });
  $("bgmBarPrev").addEventListener("click", prevTrack);
  $("bgmBarNext").addEventListener("click", function () { nextTrack(false); });
  $("bgmBarClose").addEventListener("click", function () {
    barHidden = true; lsSet("bgm_bar_off", "true");
    showBar(false);
  });

  listEl.addEventListener("click", function (e) {
    var row = e.target.closest(".bgm-row");
    if (!row) return;
    loadTrack(parseInt(row.dataset.i, 10), true);
  });

  /* âm lượng */
  function setVolume(v, unmute) {
    v = Math.max(0, Math.min(1, v));
    audio.volume = v;
    lsSet("bgm_volume", String(v));
    if (unmute && audio.muted) { audio.muted = false; isMuted = false; lsSet("bgm_muted", "false"); }
    if (v === 0) { audio.muted = true; isMuted = true; lsSet("bgm_muted", "true"); }
    updateUI();
  }
  $("bgmVolume").addEventListener("input", function (e) { setVolume(parseFloat(e.target.value), true); });
  $("bgmVolIcon").addEventListener("click", function () {
    audio.muted = !audio.muted; isMuted = audio.muted; lsSet("bgm_muted", String(isMuted));
    updateUI();
  });
  $("bgmQuick").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-v]");
    if (!b) return;
    setVolume(parseFloat(b.dataset.v), true);
  });

  /* tiến độ + tua */
  var seek = $("bgmSeek");
  seek.addEventListener("input", function () { seeking = true; $("bgmNow").textContent = fmt(seek.value / 1000 * (audio.duration || 0)); });
  seek.addEventListener("change", function () {
    if (isFinite(audio.duration)) audio.currentTime = seek.value / 1000 * audio.duration;
    seeking = false;
  });
  audio.addEventListener("timeupdate", function () {
    if (!isFinite(audio.duration) || !audio.duration) return;
    var p = audio.currentTime / audio.duration * 100;
    var bp = document.getElementById("bgmBarProg");
    if (bp) bp.style.setProperty("--bgm-p", (audio.currentTime / audio.duration * 100).toFixed(2) + "%");
    document.documentElement.style.setProperty("--bgm-prog", p.toFixed(2) + "%");
    if (seeking) return;
    seek.value = String(Math.round(audio.currentTime / audio.duration * 1000));
    $("bgmNow").textContent = fmt(audio.currentTime);
  });
  audio.addEventListener("loadedmetadata", function () { $("bgmDur").textContent = fmt(audio.duration); });
  audio.addEventListener("ended", function () {
    if (isRepeatOne) { audio.currentTime = 0; audio.play().catch(function () {}); }
    else if (isAutoNext) { nextTrack(true); }
    else { audio.currentTime = 0; updateUI(); }
  });
  audio.addEventListener("play", function () { lsSet("bgm_playing", "true"); updateUI(); });
  audio.addEventListener("pause", function () { lsSet("bgm_playing", "false"); updateUI(); });
  audio.addEventListener("error", function () {
    $("bgmSub").textContent = "Không tải được file nhạc này — kiểm tra lại file .mp3 trong thư mục web nhé.";
  });
  audio.addEventListener("loadeddata", function () { updateUI(); });   // tải được bài mới → xoá dòng báo lỗi cũ
  audio.addEventListener("canplay", function () { updateUI(); });

  /* =========================================================
     11. KHỞI ĐỘNG
     ========================================================= */
    /* THANH NHẠC ANDROID / MÀN HÌNH KHÓA */
  if ("mediaSession" in navigator) {
    var media = navigator.mediaSession;
    var lastMediaPosition = 0;

    function syncMediaPosition() {
      if (!media.setPositionState) return;
      try {
        if (isFinite(audio.duration) && audio.duration > 0) {
          media.setPositionState({
            duration: audio.duration,
            playbackRate: audio.playbackRate || 1,
            position: Math.max(
              0, Math.min(audio.currentTime, audio.duration)
            )
          });
        } else {
          media.setPositionState();
        }
      } catch (e) {}
    }

    function syncMediaInfo() {
      var track = playlist[currentIndex];

      if ("MediaMetadata" in window) {
        try {
          media.metadata = new MediaMetadata({
            title: track.title,
            artist: track.sub || "TeaGhiu",
            album: "Hộp nhạc TeaGhiu",
            artwork: [
              {
                src: new URL("icon-192.png", location.href).href,
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: new URL("icon-512.png", location.href).href,
                sizes: "512x512",
                type: "image/png"
              }
            ]
          });
        } catch (e) {}
      }

      try {
        media.playbackState = audio.ended
          ? "none"
          : audio.paused ? "paused" : "playing";
      } catch (e) {}

      syncMediaPosition();
    }

    function mediaAction(name, handler) {
      try {
        media.setActionHandler(name, handler);
      } catch (e) {}
    }

    function mediaSeek(time) {
      if (!isFinite(audio.duration) || audio.duration <= 0) return;
      audio.currentTime = Math.max(
        0, Math.min(time, audio.duration)
      );
      syncMediaPosition();
    }

    mediaAction("play", function () {
      togglePlay(true);
    });
    mediaAction("pause", function () {
      audio.pause();
    });
    mediaAction("previoustrack", function () {
      prevTrack();
    });
    mediaAction("nexttrack", function () {
      nextTrack(false);
    });
    mediaAction("seekto", function (details) {
      if (typeof details.seekTime === "number") {
        mediaSeek(details.seekTime);
      }
    });
    mediaAction("seekbackward", function (details) {
      mediaSeek(audio.currentTime - (details.seekOffset || 10));
    });
    mediaAction("seekforward", function (details) {
      mediaSeek(audio.currentTime + (details.seekOffset || 10));
    });
    mediaAction("stop", function () {
      audio.pause();
      if (isFinite(audio.duration)) audio.currentTime = 0;
      syncMediaInfo();
    });

    ["play", "pause", "ended", "loadedmetadata", "emptied"]
      .forEach(function (eventName) {
        audio.addEventListener(eventName, syncMediaInfo);
      });

    ["seeked", "durationchange", "ratechange"]
      .forEach(function (eventName) {
        audio.addEventListener(eventName, syncMediaPosition);
      });

    audio.addEventListener("timeupdate", function () {
      var now = Date.now();
      if (now - lastMediaPosition >= 1000) {
        lastMediaPosition = now;
        syncMediaPosition();
      }
    });
  }
  
  loadTrack(currentIndex, false);
  updateUI();
  console.log("%c🎧 Hộp nhạc TeaGhiu v3 · 11/10/2026 · bản đã sửa lỗi bấm đĩa", "color:#a78bfa;font-weight:bold");

  /* tự phát lại nếu lần trước đang nghe (trình duyệt chỉ cho phép sau khi người dùng chạm) */
  function firstInteraction() {
    if (ls("bgm_playing", "false") === "true" && audio.paused) audio.play().catch(function () {});
    window.removeEventListener("pointerdown", firstInteraction);
    window.removeEventListener("touchstart", firstInteraction);
  }
  window.addEventListener("pointerdown", firstInteraction, { once: true });
  window.addEventListener("touchstart", firstInteraction, { once: true });

  if (!ls("bgm_hint_seen", "")) {
    setTimeout(function () { hint.classList.add("show"); }, 1200);
    setTimeout(function () { hint.classList.remove("show"); }, 5200);
  }
})();
