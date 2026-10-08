// Tạo âm thanh click cơ học bằng Web Audio API
(function() {
  let audioCtx = null;

  function playClick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Tạo xung âm thanh click/tách
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle'; // âm thanh đanh, tự nhiên
      osc.frequency.setValueAtTime(800, audioCtx.currentTime); // tần số ban đầu
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04); // hạ nhanh tạo tiếng cạch

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
  }

  // Tự động gán âm thanh cho mọi nút bấm (button, a, role=button, nav-btn,...)
  document.addEventListener('pointerdown', function(e) {
    const target = e.target.closest('button, a, input[type="button"], input[type="submit"], [role="button"], .btn, .pill, .tab-btn');
    if (target) {
      playClick();
    }
  }, { passive: true });
})();