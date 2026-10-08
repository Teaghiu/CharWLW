(function () {
  // =========================================================
  // DANH SÁCH 7 BÀI NHẠC
  // Đặt các file MP3 vào thư mục "music/" của web
  // =========================================================
  const playlist = [
    {
      title: "呓语 (Whisper)",
      src: "whisper.mp3"
    },
    {
      title: "你是不是也喜欢我 (Nữ sinh)",
      src: "xihuan-wo.mp3"
    },
    {
      title: "烟波辞 (Lovers in River Mist)",
      src: "river-mist.mp3"
    },
    {
      title: "七夕雨 (Qixi Festival Rain)",
      src: "qixi-rain.mp3"
    },
    {
      title: "Love Spanning Millennia",
      src: "millennia-dance.mp3"
    },
    {
      title: "Sword of Coming Safety",
      src: "sword-safety.mp3"
    },
    {
      title: "Moonlit Lanterns",
      src: "moonlit-lanterns.mp3"
    }
  ];

  // =========================================================
  // KHỞI TẠO AUDIO
  // =========================================================
  const audio = new Audio();
  audio.preload = "auto";

  // =========================================================
  // LẤY TRẠNG THÁI ĐÃ LƯU
  // =========================================================
  let currentIndex = parseInt(localStorage.getItem("bgm_idx")) || 0;

  let isRepeatOne =
    localStorage.getItem("bgm_repeat") === "true";

  let isShuffle =
    localStorage.getItem("bgm_shuffle") !== "false";

  // Âm lượng mặc định 40%
  let savedVolume = parseFloat(
    localStorage.getItem("bgm_volume")
  );

  if (isNaN(savedVolume)) {
    savedVolume = 0.4;
  }

  // Giới hạn âm lượng hợp lệ
  savedVolume = Math.max(0, Math.min(1, savedVolume));

  let isMuted =
    localStorage.getItem("bgm_muted") === "true";

  audio.volume = savedVolume;

  // Nếu đã mute từ trước
  audio.muted = isMuted;

  // =========================================================
  // HÀM LOAD BÀI
  // =========================================================
  function loadTrack(idx) {
    if (idx < 0 || idx >= playlist.length) {
      idx = 0;
    }

    currentIndex = idx;

    localStorage.setItem(
      "bgm_idx",
      currentIndex
    );

    audio.src = playlist[currentIndex].src;

    updateUI();
  }

  // =========================================================
  // SỰ KIỆN KHI BÀI HẾT
  // =========================================================
  audio.addEventListener("ended", function () {

    if (isRepeatOne) {

      audio.currentTime = 0;

      audio.play().catch(() => {});

    } else if (isShuffle) {

      let next;

      do {
        next = Math.floor(
          Math.random() * playlist.length
        );
      } while (
        playlist.length > 1 &&
        next === currentIndex
      );

      loadTrack(next);

      audio.play().catch(() => {});

    } else {

      loadTrack(
        (currentIndex + 1) % playlist.length
      );

      audio.play().catch(() => {});
    }
  });

  // =========================================================
  // CSS
  // =========================================================
  const style = document.createElement("style");

  style.textContent = `
    .bgm-widget {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 99999;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .bgm-toggle-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(22, 27, 34, 0.88);
      border: 1.5px solid rgba(255, 255, 255, 0.25);

      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      box-shadow: 0 4px 15px rgba(0,0,0,0.4);

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 22px;

      cursor: pointer;
      user-select: none;

      transition:
        transform 0.2s,
        border-color 0.2s;
    }

    .bgm-toggle-btn:active {
      transform: scale(0.92);
    }

    .bgm-toggle-btn.playing {
      border-color: #58a6ff;
      animation: bgm-spin 6s linear infinite;
    }

    @keyframes bgm-spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .bgm-panel {
      position: absolute;

      bottom: 60px;
      right: 0;

      width: 270px;

      background: rgba(13, 17, 23, 0.96);

      border:
        1px solid rgba(255, 255, 255, 0.15);

      border-radius: 14px;

      padding: 12px;

      box-shadow:
        0 8px 24px rgba(0,0,0,0.6);

      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);

      color: #e6edf3;

      display: none;
      flex-direction: column;

      gap: 10px;

      font-size: 13px;
    }

    .bgm-panel.active {
      display: flex;
    }

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

      gap: 4px;
    }

    .bgm-btn {
      background:
        rgba(255, 255, 255, 0.1);

      border: none;

      border-radius: 8px;

      color: #e6edf3;

      padding: 6px 10px;

      font-size: 13px;

      cursor: pointer;

      transition:
        background 0.15s,
        opacity 0.15s;
    }

    .bgm-btn:hover {
      background:
        rgba(255, 255, 255, 0.16);
    }

    .bgm-btn.active {
      background: #238636;
      color: #fff;
    }

    .bgm-btn:active {
      opacity: 0.7;
    }

    .bgm-list-select {
      background: #21262d;

      color: #c9d1d9;

      border:
        1px solid rgba(255,255,255,0.15);

      border-radius: 6px;

      padding: 6px;

      font-size: 12px;

      width: 100%;

      outline: none;
    }

    /* ================================
       KHU VỰC ÂM LƯỢNG
       ================================ */

    .bgm-volume-row {
      display: flex;

      align-items: center;

      gap: 8px;

      width: 100%;
    }

    .bgm-volume-icon {
      width: 24px;

      text-align: center;

      font-size: 16px;

      cursor: pointer;

      user-select: none;
    }

    .bgm-volume-slider {
      flex: 1;

      width: 100%;

      height: 4px;

      cursor: pointer;

      accent-color: #58a6ff;
    }

    .bgm-volume-value {
      width: 38px;

      text-align: right;

      font-size: 11px;

      color: #8b949e;

      user-select: none;
    }

    /* ================================
       MUTE BUTTON
       ================================ */

    .bgm-mute-btn {
      width: 100%;

      background:
        rgba(255,255,255,0.08);

      border:
        1px solid rgba(255,255,255,0.08);

      border-radius: 8px;

      color: #c9d1d9;

      padding: 6px 8px;

      font-size: 12px;

      cursor: pointer;

      transition:
        background 0.15s,
        color 0.15s;
    }

    .bgm-mute-btn:hover {
      background:
        rgba(255,255,255,0.13);
    }

    .bgm-mute-btn.muted {
      background:
        rgba(248,81,73,0.15);

      color: #ff7b72;

      border-color:
        rgba(248,81,73,0.25);
    }
  `;

  document.head.appendChild(style);

  // =========================================================
  // TẠO HTML PLAYER
  // =========================================================
  const container = document.createElement("div");

  container.className = "bgm-widget";

  container.innerHTML = `
    <div class="bgm-panel" id="bgmPanel">

      <div class="bgm-title" id="bgmTitle">
        Đang chuẩn bị...
      </div>

      <div class="bgm-controls">

        <button
          class="bgm-btn"
          id="bgmPrev"
          title="Bài trước"
        >
          ⏮
        </button>

        <button
          class="bgm-btn"
          id="bgmPlay"
          title="Phát / Tạm dừng"
        >
          ▶ Phát
        </button>

        <button
          class="bgm-btn"
          id="bgmNext"
          title="Bài tiếp"
        >
          ⏭
        </button>

        <button
          class="bgm-btn ${isRepeatOne ? "active" : ""}"
          id="bgmRepeat"
          title="Lặp lại 1 bài"
        >
          🔂
        </button>

        <button
          class="bgm-btn ${isShuffle ? "active" : ""}"
          id="bgmShuffle"
          title="Phát ngẫu nhiên"
        >
          🔀
        </button>

      </div>

      <!-- ÂM LƯỢNG -->
      <div class="bgm-volume-row">

        <span
          class="bgm-volume-icon"
          id="bgmVolumeIcon"
          title="Bấm để tắt tiếng"
        >
          🔊
        </span>

        <input
          type="range"
          class="bgm-volume-slider"
          id="bgmVolume"
          min="0"
          max="1"
          step="0.05"
          value="${savedVolume}"
          aria-label="Âm lượng"
        >

        <span
          class="bgm-volume-value"
          id="bgmVolumeValue"
        >
          ${Math.round(savedVolume * 100)}%
        </span>

      </div>

      <!-- NÚT MUTE -->
      <button
        class="bgm-mute-btn ${isMuted ? "muted" : ""}"
        id="bgmMute"
      >
        ${isMuted ? "🔇 Đã tắt tiếng" : "🔊 Tắt tiếng"}
      </button>

      <!-- DANH SÁCH BÀI -->
      <select
        class="bgm-list-select"
        id="bgmSelect"
      ></select>

    </div>

    <div
      class="bgm-toggle-btn"
      id="bgmToggleBtn"
      title="Bật/Tắt Menu Nhạc"
    >
      🎼
    </div>
  `;

  document.body.appendChild(container);

  // =========================================================
  // LẤY ELEMENT
  // =========================================================
  const toggleBtn =
    container.querySelector("#bgmToggleBtn");

  const panel =
    container.querySelector("#bgmPanel");

  const titleEl =
    container.querySelector("#bgmTitle");

  const playBtn =
    container.querySelector("#bgmPlay");

  const prevBtn =
    container.querySelector("#bgmPrev");

  const nextBtn =
    container.querySelector("#bgmNext");

  const repeatBtn =
    container.querySelector("#bgmRepeat");

  const shuffleBtn =
    container.querySelector("#bgmShuffle");

  const selectEl =
    container.querySelector("#bgmSelect");

  const volumeSlider =
    container.querySelector("#bgmVolume");

  const volumeIcon =
    container.querySelector("#bgmVolumeIcon");

  const volumeValue =
    container.querySelector("#bgmVolumeValue");

  const muteBtn =
    container.querySelector("#bgmMute");

  // =========================================================
  // ĐỔ DANH SÁCH NHẠC
  // =========================================================
  playlist.forEach((track, i) => {

    const opt =
      document.createElement("option");

    opt.value = i;

    opt.textContent =
      `${i + 1}. ${track.title}`;

    selectEl.appendChild(opt);
  });

  // =========================================================
  // CẬP NHẬT GIAO DIỆN
  // =========================================================
  function updateUI() {

    titleEl.textContent =
      playlist[currentIndex].title;

    selectEl.value =
      currentIndex;

    if (!audio.paused) {

      playBtn.textContent =
        "⏸ Tạm dừng";

      toggleBtn.classList.add("playing");

    } else {

      playBtn.textContent =
        "▶ Phát";

      toggleBtn.classList.remove("playing");
    }

    // Cập nhật volume
    volumeSlider.value =
      audio.volume;

    volumeValue.textContent =
      `${Math.round(audio.volume * 100)}%`;

    updateMuteUI();
  }

  // =========================================================
  // CẬP NHẬT MUTE UI
  // =========================================================
  function updateMuteUI() {

    if (audio.muted) {

      volumeIcon.textContent =
        "🔇";

      volumeIcon.title =
        "Bấm để bật tiếng";

      muteBtn.textContent =
        "🔇 Đã tắt tiếng";

      muteBtn.classList.add("muted");

    } else {

      if (audio.volume === 0) {

        volumeIcon.textContent =
          "🔇";

      } else if (audio.volume < 0.5) {

        volumeIcon.textContent =
          "🔉";

      } else {

        volumeIcon.textContent =
          "🔊";
      }

      volumeIcon.title =
        "Bấm để tắt tiếng";

      muteBtn.textContent =
        "🔊 Tắt tiếng";

      muteBtn.classList.remove("muted");
    }
  }

  // =========================================================
  // MỞ / ĐÓNG PANEL
  // =========================================================
  toggleBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    panel.classList.toggle("active");
  });

  // =========================================================
  // ĐÓNG KHI CLICK RA NGOÀI
  // =========================================================
  document.addEventListener("click", (e) => {

    if (!container.contains(e.target)) {

      panel.classList.remove("active");
    }
  });

  // =========================================================
  // PLAY / PAUSE
  // =========================================================
  playBtn.addEventListener("click", () => {

    if (audio.paused) {

      audio.play().catch(() => {});

    } else {

      audio.pause();
    }

    updateUI();
  });

  // =========================================================
  // PREVIOUS
  // =========================================================
  prevBtn.addEventListener("click", () => {

    const prev =
      (currentIndex - 1 + playlist.length) %
      playlist.length;

    loadTrack(prev);

    audio.play().catch(() => {});
  });

  // =========================================================
  // NEXT
  // =========================================================
  nextBtn.addEventListener("click", () => {

    let next;

    if (isShuffle) {

      do {

        next =
          Math.floor(
            Math.random() * playlist.length
          );

      } while (
        playlist.length > 1 &&
        next === currentIndex
      );

    } else {

      next =
        (currentIndex + 1) %
        playlist.length;
    }

    loadTrack(next);

    audio.play().catch(() => {});
  });

  // =========================================================
  // REPEAT ONE
  // =========================================================
  repeatBtn.addEventListener("click", () => {

    isRepeatOne = !isRepeatOne;

    localStorage.setItem(
      "bgm_repeat",
      isRepeatOne
    );

    repeatBtn.classList.toggle(
      "active",
      isRepeatOne
    );
  });

  // =========================================================
  // SHUFFLE
  // =========================================================
  shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    localStorage.setItem(
      "bgm_shuffle",
      isShuffle
    );

    shuffleBtn.classList.toggle(
      "active",
      isShuffle
    );
  });

  // =========================================================
  // CHỌN BÀI TỪ DROPDOWN
  // =========================================================
  selectEl.addEventListener("change", (e) => {

    loadTrack(
      parseInt(e.target.value)
    );

    audio.play().catch(() => {});
  });

  // =========================================================
  // VOLUME SLIDER
  // =========================================================
  volumeSlider.addEventListener("input", (e) => {

    const volume =
      parseFloat(e.target.value);

    audio.volume = volume;

    // Khi kéo volume lên > 0 thì tự bật tiếng
    if (volume > 0 && audio.muted) {

      audio.muted = false;

      isMuted = false;

      localStorage.setItem(
        "bgm_muted",
        "false"
      );
    }

    localStorage.setItem(
      "bgm_volume",
      volume
    );

    volumeValue.textContent =
      `${Math.round(volume * 100)}%`;

    updateMuteUI();
  });

  // =========================================================
  // NÚT MUTE NHANH
  // =========================================================
  muteBtn.addEventListener("click", () => {

    audio.muted =
      !audio.muted;

    isMuted =
      audio.muted;

    localStorage.setItem(
      "bgm_muted",
      isMuted
    );

    updateMuteUI();
  });

  // =========================================================
  // CLICK ICON VOLUME CŨNG MUTE
  // =========================================================
  volumeIcon.addEventListener("click", () => {

    audio.muted =
      !audio.muted;

    isMuted =
      audio.muted;

    localStorage.setItem(
      "bgm_muted",
      isMuted
    );

    updateMuteUI();
  });

  // =========================================================
  // SỰ KIỆN AUDIO
  // =========================================================
  audio.addEventListener(
    "play",
    updateUI
  );

  audio.addEventListener(
    "pause",
    updateUI
  );

  // =========================================================
  // LƯU TRẠNG THÁI PLAY
  // =========================================================
  audio.addEventListener("play", () => {

    localStorage.setItem(
      "bgm_playing",
      "true"
    );
  });

  audio.addEventListener("pause", () => {

    localStorage.setItem(
      "bgm_playing",
      "false"
    );
  });

  // =========================================================
  // TẢI BÀI HIỆN TẠI
  // =========================================================
  loadTrack(currentIndex);

  // =========================================================
  // AUTOPLAY SAU TƯƠNG TÁC ĐẦU TIÊN
  // =========================================================
  function firstInteraction() {

    const shouldPlay =
      localStorage.getItem("bgm_playing") === "true";

    if (
      shouldPlay &&
      audio.paused
    ) {

      audio.play().catch(() => {});
    }

    window.removeEventListener(
      "pointerdown",
      firstInteraction
    );
  }

  window.addEventListener(
    "pointerdown",
    firstInteraction,
    {
      once: true
    }
  );

  // =========================================================
  // CẬP NHẬT GIAO DIỆN BAN ĐẦU
  // =========================================================
  updateUI();

})();