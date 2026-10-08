(function () {
  // DANH SÁCH NHẠC CỦA BẠN (Thay đổi tên bài và link mp3 tại đây)
  const playlist = [
    { title: "Lofi Chill Beat 1", src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" },
    { title: "Peaceful Ambient", src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3" },
    { title: "Soft Piano & Rain", src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3" }
  ];

  // Khởi tạo Audio
  const audio = new Audio();
  audio.preload = "auto";

  let currentIndex = parseInt(localStorage.getItem('bgm_idx')) || 0;
  let isRepeatOne = localStorage.getItem('bgm_repeat') === 'true';
  let isShuffle = localStorage.getItem('bgm_shuffle') !== 'false'; // mặc định ngẫu nhiên

  function loadTrack(idx) {
    if (idx < 0 || idx >= playlist.length) idx = 0;
    currentIndex = idx;
    localStorage.setItem('bgm_idx', currentIndex);
    audio.src = playlist[currentIndex].src;
    updateUI();
  }

  // Khi hết bài
  audio.addEventListener('ended', function() {
    if (isRepeatOne) {
      audio.currentTime = 0;
      audio.play();
    } else if (isShuffle) {
      let next;
      do {
        next = Math.floor(Math.random() * playlist.length);
      } while (playlist.length > 1 && next === currentIndex);
      loadTrack(next);
      audio.play();
    } else {
      loadTrack((currentIndex + 1) % playlist.length);
      audio.play();
    }
  });

  // Tự tạo Giao diện (CSS + HTML) nhúng thẳng vào web
  const style = document.createElement('style');
  style.textContent = `
    .bgm-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .bgm-toggle-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(22, 27, 34, 0.85);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      cursor: pointer;
      user-select: none;
      transition: transform 0.2s, border-color 0.2s;
    }
    .bgm-toggle-btn:active { transform: scale(0.9); }
    .bgm-toggle-btn.playing {
      border-color: #58a6ff;
      animation: bgm-spin 6s linear infinite;
    }
    @keyframes bgm-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .bgm-panel {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 260px;
      background: rgba(13, 17, 23, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #e6edf3;
      display: none;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }
    .bgm-panel.active { display: flex; }
    .bgm-title {
      font-weight: 600;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #7ee787;
    }
    .bgm-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .bgm-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 8px;
      color: #e6edf3;
      padding: 6px 10px;
      font-size: 14px;
      cursor: pointer;
    }
    .bgm-btn.active {
      background: #238636;
      color: #fff;
    }
    .bgm-btn:active { opacity: 0.7; }
    .bgm-list-select {
      background: #21262d;
      color: #c9d1d9;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      padding: 6px;
      font-size: 12px;
      width: 100%;
      outline: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.className = 'bgm-widget';
  container.innerHTML = `
    <div class="bgm-panel" id="bgmPanel">
      <div class="bgm-title" id="bgmTitle">Đang tải...</div>
      <div class="bgm-controls">
        <button class="bgm-btn" id="bgmPrev">⏮</button>
        <button class="bgm-btn" id="bgmPlay">▶ Phát</button>
        <button class="bgm-btn" id="bgmNext">⏭</button>
        <button class="bgm-btn ${isRepeatOne ? 'active' : ''}" id="bgmRepeat" title="Lặp 1 bài">🔂</button>
        <button class="bgm-btn ${isShuffle ? 'active' : ''}" id="bgmShuffle" title="Ngẫu nhiên">🔀</button>
      </div>
      <select class="bgm-list-select" id="bgmSelect"></select>
    </div>
    <div class="bgm-toggle-btn" id="bgmToggleBtn" title="Bật/Tắt Menu Nhạc">🎼</div>
  `;
  document.body.appendChild(container);

  const toggleBtn = container.querySelector('#bgmToggleBtn');
  const panel = container.querySelector('#bgmPanel');
  const titleEl = container.querySelector('#bgmTitle');
  const playBtn = container.querySelector('#bgmPlay');
  const prevBtn = container.querySelector('#bgmPrev');
  const nextBtn = container.querySelector('#bgmNext');
  const repeatBtn = container.querySelector('#bgmRepeat');
  const shuffleBtn = container.querySelector('#bgmShuffle');
  const selectEl = container.querySelector('#bgmSelect');

  // Đổ danh sách vào select box
  playlist.forEach((track, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${i + 1}. ${track.title}`;
    selectEl.appendChild(opt);
  });

  function updateUI() {
    titleEl.textContent = playlist[currentIndex].title;
    selectEl.value = currentIndex;
    if (!audio.paused) {
      playBtn.textContent = '⏸ Tạm dừng';
      toggleBtn.classList.add('playing');
    } else {
      playBtn.textContent = '▶ Phát';
      toggleBtn.classList.remove('playing');
    }
  }

  // Sự kiện nút bấm
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('active');
  });

  // Đóng panel khi bấm ra ngoài
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      panel.classList.remove('active');
    }
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(()=>{});
    } else {
      audio.pause();
    }
    updateUI();
  });

  prevBtn.addEventListener('click', () => {
    let prev = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prev);
    audio.play();
  });

  nextBtn.addEventListener('click', () => {
    let next = isShuffle ? Math.floor(Math.random() * playlist.length) : (currentIndex + 1) % playlist.length;
    loadTrack(next);
    audio.play();
  });

  repeatBtn.addEventListener('click', () => {
    isRepeatOne = !isRepeatOne;
    localStorage.setItem('bgm_repeat', isRepeatOne);
    repeatBtn.classList.toggle('active', isRepeatOne);
  });

  shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    localStorage.setItem('bgm_shuffle', isShuffle);
    shuffleBtn.classList.toggle('active', isShuffle);
  });

  selectEl.addEventListener('change', (e) => {
    loadTrack(parseInt(e.target.value));
    audio.play();
  });

  audio.addEventListener('play', updateUI);
  audio.addEventListener('pause', updateUI);

  // Tải bài hiện tại
  loadTrack(currentIndex);

  // Trình duyệt chặn autoplay khi mới vào trang cho đến lần chạm đầu tiên
  function firstInteraction() {
    const shouldPlay = localStorage.getItem('bgm_playing') === 'true';
    if (shouldPlay && audio.paused) {
      audio.play().catch(()=>{});
    }
    window.removeEventListener('pointerdown', firstInteraction);
  }
  window.addEventListener('pointerdown', firstInteraction, { once: true });

  audio.addEventListener('play', () => localStorage.setItem('bgm_playing', 'true'));
  audio.addEventListener('pause', () => localStorage.setItem('bgm_playing', 'false'));
})();