# 🛠️ LỆNH CHỈNH SỬA — TeaGhiu · Thư viện Character WLW

> **Gửi AI thực thi:** làm đúng và đủ theo tài liệu này. Các mục đánh dấu **[BẮT BUỘC]** phải hoàn thành 100%. Các mục đánh dấu **[KHUYẾN NGHỊ]** nên làm nhưng có thể bỏ nếu gây phá vỡ cấu trúc. Cuối tài liệu có **KIỂM KÊ TẤT CẢ CÁC MỤC (Phần D)** — đối chiếu từng dòng trước khi báo hoàn thành, **không được thiếu sót mục nào**.
>
> Website là HTML tĩnh (không có build tool). Sửa trực tiếp các file. Site chạy skin `body.sky` — đây là lý do nhiều khối (navbar, breadcrumb, profile-hero, tabbar) đang bị ẩn trên điện thoại.

---

## 0) BỐI CẢNH — 4 ẢNH THAM CHIẾU

| Ảnh | Nội dung | Yêu cầu rút ra |
|---|---|---|
| **Ảnh 1** (`Screenshot_...090146`) | Màn **Select Character**, 2 nút tròn ⤴ ⤵ bên phải thẻ bị gạch **X** | Xóa 2 nút lên/xuống đổi nhân vật; **hộp nhạc (đĩa CD nổi) không được hiện** ở màn này |
| **Ảnh 2** (`Screenshot_...090154`) | Khoanh nút **"Thư viện ⌄"** + chữ viết tay **"Chuyển trang"** | Bấm "Thư viện ⌄" phải **chuyển sang trang riêng** (không cuộn xuống trong cùng trang như hiện tại) |
| **Ảnh 3** (`Screenshot_...090230`) | Khoanh hàng link cuối trang: **Thư viện · Chọn nhân vật · Thư viện Lệnh · 💌 REQ · Google AI Studio** | **Bỏ các mục cuối trang** — gom hết vào menu ☰ |
| **Ảnh 4** (`Screenshot_...090501`) | Trang **"Toàn bộ thư viện"** + vẽ tay nút **☰ 3 gạch** góc phải trên | Thêm nút ☰ góc phải trên chứa **TOÀN BỘ** các mục điều hướng |

### Trạng thái code hiện tại (đã kiểm kê)
- `index.html` là **1 trang duy nhất** chứa: Màn 1 Splash → Màn 2 Select Character (`#featured`) → Thư viện (`#library`) → footer → khung lớn nhân vật (`#csSheet`).
- Skin `body.sky` đang ẩn: `.navbar`, `.breadcrumb`, `.profile-hero`, `.hs-peek`, `#heroTags`, `#heroWish` (style.css dòng ≈1170) và `.tabbar` (bị `forest-portal.js` chèn CSS `display:none!important`).
- Trên điện thoại hiện chỉ còn: footer cuối trang, dải `sel-strip` khi cuộn xuống, nút ↑ vàng, đĩa nhạc nổi — điều hướng rất kém → đây là lý do của yêu cầu ☰.
- Các file liên quan: `index.html`, `style.css`, `music-player-v4.js` (hộp nhạc), `forest-portal.js` (menu ☰ cũ trong navbar — bị ẩn trên sky), `greeting-mail.js` (hòm thư), `bento-lunch.js` (hộp cơm), `click-sound.js`, `sw.js` (PWA), `commands.html`, `isekai-guide.html`, `req.html`, `khu-rung.html`.

---

## 1) MỤC TIÊU (3 việc)

1. **[BẮT BUỘC]** Tách thành **2 trang riêng biệt**:
   - **TRANG 1 — `index.html` = "Select Character"** (màn chọn nhân vật, ảnh 1).
   - **TRANG 2 — `thu-vien.html` = "Toàn bộ thư viện"** (tìm kiếm/lọc/danh sách, ảnh 4) — file mới.
2. **[BẮT BUỘC]** TRANG 1: **không hiện** 2 nút ⤴⤵ (sel-aux) và **không hiện hộp nhạc**.
3. **[BẮT BUỘC]** TRANG 2: có **nút ☰ 3 gạch góc phải trên** chứa toàn bộ mục điều hướng; **xóa hàng link cuối trang**.

---

## 2) PHẦN A — TÁCH 2 TRANG RIÊNG BIỆT [BẮT BUỘC]

> **Cách làm an toàn nhất:** copy nguyên `index.html` → `thu-vien.html`, sau đó cắt ghép theo bảng A.1 ở cả 2 file (giữ nguyên `<head>`, `style.css`, font, nền bầu trời sky). Không viết lại CSS.

### A.1 Bảng phân chia từng khối

| Khối hiện tại (index.html) | Dòng ≈ | TRANG 1 (index) | TRANG 2 (thu-vien) |
|---|---|---|---|
| Màn 1 Splash `#splash` + nút "🌤️ GHÉ VÔ" + JS splash (sessionStorage `skySplash`) | 286–313, 1616–1630 | ✅ GIỮ | ❌ Không có |
| `.navbar` + `#themeToggle` | 307–325 | ✅ Giữ markup (vẫn ẩn trên sky), **sửa href theo A.3** | ✅ Giữ, sửa href theo A.3 |
| `.breadcrumb` | 327 | ❌ Bỏ | ✅ Giữ (đang ẩn trên sky, giữ nguyên) |
| `.profile-hero` (banner, avatar, stats, tag cloud, nút 🎲 Char ngẫu nhiên) | 337–380 | ❌ Chuyển đi | ✅ Giữ nguyên khối (vẫn ẩn trên sky như cũ) |
| **Màn 2 Select Character** `#featured` (sel-top + counter, sel-deck, thẻ, "💬 Hãy trò chuyện với họ", sel-foot: chấm + hint + nút "Thư viện ⌄", heroPeek) | 382–417 | ✅ GIỮ (trừ sel-aux — xem Phần B) | ❌ Không có |
| **Thư viện** `#library` (tiêu đề "Toàn bộ thư viện", ô tìm kiếm + 🔍 + 🌙 moon + gợi ý/lịch sử, chips lọc, toolbar: select nhóm + select sắp xếp + 🎲 Ngẫu nhiên + 🔄 Reset + 📋 Danh sách, result-meta + cloudStatus, 2 pagination, `#grid`, `#empty`) | 411–486 | ❌ Không có | ✅ GIỮ NGUYÊN khối |
| `.footer` — hàng `.footer-links` (5 link) | 490–495 | ❌ Bỏ cả footer | ❌ **XÓA** `.footer-links` (Phần C.3) — giữ 2 dòng còn lại |
| `.footer` — dòng "📖 Cách dùng nhanh…" + credit "Thư viện WLW by TeaGhiu ♥ · Đồng bộ bởi Supabase" | 496–499 | ❌ | ✅ GIỮ |
| `#backToTop` (nút ↑ vàng) | 506 | ❌ Không có (trang không cuộn) | ✅ GIỮ |
| `#toast` | 508 | ✅ Giữ | ✅ Giữ |
| `.cs-scrim` + `#csSheet` (khung lớn nhân vật, mở khi chạm thẻ) | 510–545 | ✅ GIỮ (chạm thẻ Select mở khung) | ✅ GIỮ (chạm thẻ trong grid mở khung) |
| Dải `#selStrip` ("🕊️ tên ⌃ chọn lại") | 1531 | ❌ Không có | ✅ GIỮ, **đổi hành vi** (A.3.2) |
| `.tabbar` (5 icon) | 1533–1541 | ❌ | ⚠️ Giữ trạng thái **BỊ ẨN** như hiện tại — khi bỏ `forest-portal.js` phải tự thêm CSS ẩn tabbar, không được để nó lộ lại (C.4). Có thể xóa markup cho gọn. |
| Mảng dữ liệu `const chars = [...]` | 549→ | Cần | Cần — **[KHUYẾN NGHỊ]** tách ra file chung `chars-data.js` include ở cả 2 trang để không nhân bản ~90KB dữ liệu |

### A.2 Trang 2 — `thu-vien.html`
- `<title>`: **"Toàn bộ thư viện — TeaGhiu"**; meta description riêng cho trang thư viện.
- Trang 2 **không có**: splash, khối Select `#featured`, hint "vuốt lên/xuống", nút "💬 Hãy trò chuyện với họ", sel-aux, footer trọn khối.
- Trang 2 **có**: mọi khối cột "TRANG 2" ở bảng A.1 + menu ☰ (Phần C) + hộp nhạc (B.2 giữ) + sel-strip + backToTop + csSheet.

### A.3 Điều hướng 2 chiều & đồng bộ trạng thái [BẮT BUỘC]
1. **Nút "Thư viện ⌄"** (`#selToLib`, HTML dòng 407, listener dòng 1601): đổi `$('#library').scrollIntoView(...)` → `location.href='thu-vien.html'` — **chuyển trang thật** (đúng chú thích "Chuyển trang" ở ảnh 2).
2. **Dải "⌃ chọn lại"** (`#selStrip`, listener dòng 1602, chỉ ở trang 2): đổi `window.scrollTo(top)` → `location.href='index.html'` (về màn Select).
   - **Đồng bộ tên nhân vật:** trang 1 lưu `localStorage.setItem('skyHeroIndex', heroIndex)` mỗi lần đổi nhân vật (trong `heroGo`/`swap`/`renderHero`); trang 2 đọc ra để strip hiển thị đúng tên đang chọn. Nếu chưa có key → **ẩn strip** ở trang 2.
3. **Sửa href trong `.navbar` ở cả 2 trang:** link "Thư viện" (`#/`) → `thu-vien.html`; link "Nhân vật" (`#featured`) → `index.html`. Các link ngoài (commands/isekai/req/aistudio) giữ nguyên.
4. **Redirect link hash cũ** (bookmark + các trang khác đang trỏ `index.html#...`):
   - `index.html`: nếu `location.hash === '#library'` → `location.replace('thu-vien.html')`.
   - `thu-vien.html`: nếu `location.hash === '#featured'` → `location.replace('index.html')`.
5. **Ban đêm/ban ngày:** script nhỏ trong `<head>` đọc `localStorage.skyNight` thêm class `night` phải có ở **cả 2 trang**; nút 🌙 `#skyMoon` (nằm trong ô tìm kiếm) chỉ ở trang 2 — listener phải theo trang 2.
6. **Splash** chỉ ở trang 1, cơ chế `sessionStorage 'skySplash'` giữ nguyên (quay lại trang 1 trong cùng phiên không hiện lại).

### A.4 Phân bổ JS & file giữa 2 trang [BẮT BUỘC — sai bảng này sẽ lỗi Console]

| File / khối JS (index.html) | Trang 1 | Trang 2 |
|---|---|---|
| Mảng `chars` + hàm parse tag | ✅ | ✅ |
| JS Select: `renderHero`/`heroGo`/`heroGoTo`/`selExtras`, vuốt dọc (pointerdown/move/up, swap), keydown mũi tên trên `#selDeck`, chạm `#heroStage` mở csSheet, vòng quay random, counter/peek/dots, splash | ✅ | ❌ |
| JS Library: fetch/đồng bộ Supabase (`cloudStatus`), lọc/sắp xếp, render grid + pagination, tìm kiếm + gợi ý + lịch sử, chips, toolbar, ❤️/📋/📌, thống kê `statTotal/statShown/statClicks` | ❌ | ✅ |
| JS chung sky: `onScroll` (biến `--p`, class `sel-mini`, hiện strip), `setNight` + `#skyMoon` | ❌ (trang 1 không cuộn) | ✅ |
| csSheet: markup + JS mở khung (`csOpenAs`, vuốt đóng, ảnh trượt) | ✅ | ✅ |
| `click-sound.js` | ✅ | ✅ |
| `music-player-v4.js` | ❌ **KHÔNG load** | ✅ load |
| `forest-portal.js` | ❌ | ❌ (thay bằng ☰ mới — Phần C) |
| `greeting-mail.js` (hòm thư) | ❌ KHÔNG load (B.3) | ✅ |
| `bento-lunch.js` (hộp cơm) | ❌ KHÔNG load (B.3) | ✅ |
| Đăng ký `sw.js` (PWA) | ✅ | ✅ |

> ⚠️ **Bẫy:** JS của trang nào chỉ được gọi tới phần tử của trang đó (`#selDeck`, `#heroStage`, `#heroNext`… không tồn tại ở trang 2; `#grid`, `#search`… không tồn tại ở trang 1). Tách script theo bảng hoặc bọc `if (el)` để không throw null.

### A.5 Cập nhật link từ các trang khác [KHUYẾN NGHỊ]

| Trang | Link hiện tại | Sửa thành |
|---|---|---|
| `commands.html` | nav + tab "Thư viện" → `index.html` (dòng 96, 889); breadcrumb "Trang chủ"; back-link "← Về Thư viện Character" (113); footer (199) | `thu-vien.html` |
| `commands.html` | nav + tab "Nhân vật" → `index.html#featured` (97, 890) | `index.html` |
| `isekai-guide.html` | nav "Thư viện" (299), breadcrumb (307), footer (607), tab (617–618) | `thu-vien.html` / `index.html` cùng quy tắc |
| `req.html` | navitem "Thư viện"/"Nhân vật" (343–344) | `thu-vien.html` / `index.html` |
| `khu-rung.html` | nút menu thư viện → `index.html` (dòng 415) | `thu-vien.html` |

---

## 3) PHẦN B — TRANG SELECT CHARACTER: ẨN NÚT LÊN/XUỐNG & HỘP NHẠC

### B.1 Xóa 2 nút ⤴ ⤵ (nút lên/xuống đổi nhân vật) [BẮT BUỘC — ảnh 1 gạch X]
- Xóa khối HTML `.sel-aux` (dòng 398–401) chứa `#heroNext` (⤴ Nhân vật kế tiếp) và `#heroPrev` (⤵ Nhân vật trước).
- Xóa 2 dòng JS gắn listener (≈1596–1598): `$('#heroNext').addEventListener(...)` và `$('#heroPrev').addEventListener(...)`.
- [Tùy chọn] Xóa CSS `.sel-aux`, `body.sky .sel-aux .hs-arrow`, `.hs-arrow` (style.css ≈202, 1230–1231, 552, 1364) — để lại cũng vô hại.
- **KHÔNG được mất kèm theo:** vuốt lên/xuống trên thẻ (pointer events + `swap`), phím mũi tên (keydown trên `#selDeck`), chữ gợi ý "⌄ vuốt lên/xuống để đổi nhân vật" (`#heroHint`), bộ đếm "3 / 130" (`#heroCounter`), chấm `#selDots`, nút "💬 Hãy trò chuyện với họ" (`#heroOpenBtn`).

### B.2 Hộp nhạc KHÔNG hiện ở trang Select [BẮT BUỘC]
- TRANG 1: **bỏ thẻ** `<script src="music-player-v4.js">` (dòng 1648). Đĩa nhạc `#bgmDisc`, panel playlist, thanh "Now playing" đều do file này tự chèn → bỏ script là biến mất sạch.
- TRANG 2 và các trang khác (commands, isekai-guide, khu-rung): **giữ hộp nhạc như hiện tại**.
- Không cần sửa nội dung file `music-player-v4.js`.

### B.3 Widget nổi khác ở trang 1 [BẮT BUỘC — đã xác nhận với chủ thư viện]
Để màn Select gọn đúng tinh thần ảnh 1, trang 1 **không load** `greeting-mail.js` (hòm thư lời chào) và `bento-lunch.js` (hộp cơm bí mật) — bỏ 2 thẻ script tương ứng. Hai widget này vẫn hoạt động bình thường ở trang 2. Kết quả: trang Select chỉ còn thẻ nhân vật + nút "💬 Hãy trò chuyện với họ" + nút "Thư viện ⌄".

---

## 4) PHẦN C — TRANG THƯ VIỆN: NÚT ☰ CHỨA TOÀN BỘ MỤC + BỎ MỤC CUỐI TRANG

### C.1 Nút ☰ 3 gạch [BẮT BUỘC — ảnh 4]
- **Vị trí:** cố định góc phải trên màn hình trang 2 — `position:fixed; top: calc(env(safe-area-inset-top,0px) + 8px); right:12px; z-index:100` (nằm trên sel-strip).
- **Dáng:** 3 gạch ngang ☰, ~42×42px, bo tròn, nền trắng mờ + blur (giống style nút ⤴ cũ: `rgba(255,255,255,.88)`), có bản tối cho class `night`; `aria-label="Mở menu điều hướng"`.
- Sel-strip thêm `padding-right:~64px` để tên nhân vật không chui dưới nút ☰.
- Chạm ☰ → mở **panel dropdown** từ góc phải trên (~260px, bo góc, đổ bóng, cuộn được nếu chật), khớp theme sáng/tối.
- Đóng panel: chạm ra ngoài, phím ESC, hoặc chọn xong 1 mục.

### C.2 TOÀN BỘ MỤC trong panel ☰ — ĐỦ 9 mục, không thiếu [BẮT BUỘC]

| # | Mục | Đích | Ghi chú |
|---|---|---|---|
| 1 | 🕊️ **Chọn nhân vật** | `index.html` | về màn Select |
| 2 | 🌤️ **Thư viện** | `thu-vien.html` | mục hiện tại (có thể đổi thành "về đầu trang") |
| 3 | 🪁 **Thư viện Lệnh** | `commands.html` | (tên khác: "Hỗ trợ lệnh") |
| 4 | 📖 **Cẩm nang Isekai** | `isekai-guide.html` | |
| 5 | 💌 **REQ** | `req.html` | |
| 6 | 🌲 **Cuốn sách khu rừng** | `khu-rung.html` | ưu tiên mở overlay iframe (tái dụng code `forest-portal.js` — giữ nhạc không bị tải lại); nếu phức tạp thì mở tab mới |
| 7 | 🎈 **Google AI Studio** | `https://aistudio.google.com/` | tab mới (`target="_blank"`) |
| 8 | ☀️/🌙 **Chuyển sáng ↔ tối** | toggle class `night` + lưu `skyNight` | trùng chức năng nút 🌙 trong ô tìm kiếm |
| 9 | 🎵 **Hộp nhạc** (tùy chọn) | mở/đóng `#bgmDisc` | chỉ cần ở trang 2 vì hộp nhạc vẫn ở đây |

> Mẹo: panel ☰ của `forest-portal.js` đã có sẵn khung mẫu (nút toggle, panel, clone link navbar, ESC/outside close, overlay khu rừng, mở nhạc, chuyển theme) — chỉ cần tách nút ra khỏi `.navbar` (navbar đang bị sky ẩn nên nút không thấy được) và thêm các mục còn thiếu theo bảng trên.

### C.3 Bỏ các mục cuối trang [BẮT BUỘC — ảnh 3]
- TRANG 2: **xóa khối `.footer-links`** (dòng 490–495) gồm đủ 5 link: `Thư viện` · `Chọn nhân vật` · `Thư viện Lệnh` · `💌 REQ` · `Google AI Studio`.
- **Giữ lại** 2 dòng còn lại của footer: "📖 Cách dùng nhanh…" và "Thư viện WLW by TeaGhiu ♥ · Đồng bộ bởi Supabase".
- TRANG 1: không có footer (theo A.1).
- Các mục vừa xóa **không bị mất** — đã chuyển hết vào ☰ (C.2).

### C.4 Navbar & tabbar [BẮT BUỘC giữ trạng thái]
- `.navbar`: giữ nguyên như hiện tại (ẩn trên skin sky, hiện ở desktop không-sky nếu có).
- `.tabbar`: phải **tiếp tục ẩn**. Lưu ý: CSS ẩn tabbar hiện nay do `forest-portal.js` chèn — khi bỏ script này ở trang 2, phải tự thêm CSS ẩn tabbar (một dòng `display:none!important`), nếu không tabbar sẽ **lộ lại ở màn hẹp** và trùng lặp với ☰.

---

## 5) PHẦN D — KIỂM KÊ 100% CÁC MỤC ĐỂ KHÔNG THIẾU SÓT

> AI thực thi: đối chiếu từng dòng dưới đây. Cột "Số phận" là trạng thái BẮT BUỘC sau khi sửa xong.

| # | Mục | Vị trí hiện tại | Số phận sau chỉnh sửa |
|---|---|---|---|
| 1 | Thư viện | navbar, footer, tabbar | ☰ mục #2 (trang 2); navbar href → `thu-vien.html`; footer/tabbar bỏ (đã ẩn) |
| 2 | Nhân vật / Chọn nhân vật | navbar, footer, tabbar | ☰ mục #1 → `index.html`; footer/tabbar bỏ |
| 3 | Hỗ trợ lệnh / Thư viện Lệnh | navbar, footer, tabbar | ☰ mục #3 → `commands.html` |
| 4 | 📖 Cẩm nang Isekai | navbar, tabbar | ☰ mục #4 → `isekai-guide.html` |
| 5 | 💌 REQ | navbar, footer | ☰ mục #5 → `req.html` |
| 6 | Google AI Studio / AI Studio ↗ | navbar, footer, tabbar | ☰ mục #7 (tab mới) |
| 7 | 🌲 Cuốn sách khu rừng | panel ☰ cũ của forest-portal | ☰ mục #6 |
| 8 | 🎵 Hộp nhạc (đĩa nổi `#bgmDisc` + mục trong panel cũ) | 4 trang | Trang 1: **bỏ script → biến mất**; trang 2 + các trang khác: giữ; ☰ mục #9 tùy chọn |
| 9 | ☀️/🌙 Chuyển sáng tối (`#themeToggle`, `#skyMoon`, mục panel cũ) | navbar (ẩn), ô tìm kiếm | ☰ mục #8 + `#skyMoon` giữ ở trang 2; cả 2 trang đọc `skyNight` |
| 10 | Dải `#selStrip` "🕊️ tên ⌃ chọn lại" | đỉnh trang khi cuộn | Chỉ ở trang 2; chạm → `index.html`; tên đồng bộ `skyHeroIndex`; thêm padding-right cho ☰ |
| 11 | Nút "Thư viện ⌄" (`#selToLib`) | sel-foot trang 1 | Chạm → chuyển trang `thu-vien.html` |
| 12 | Nút ⤴ `#heroNext` + ⤵ `#heroPrev` (`.sel-aux`) | sel-deck trang 1 | **XÓA** (HTML + 2 listener JS) |
| 13 | "💬 Hãy trò chuyện với họ" (`#heroOpenBtn`) | trang 1 | GIỮ |
| 14 | Chấm `#selDots` + hint "vuốt lên/xuống" + counter "3/130" | trang 1 | GIỮ (vuốt + phím mũi tên vẫn hoạt động) |
| 15 | Nút ↑ vàng `#backToTop` | nổi góc phải | Trang 2 GIỮ; trang 1 không có |
| 16 | 🎲 Char ngẫu nhiên (`#randomHeroBtn`) | profile-hero (ẩn trên sky) | Chuyển theo profile-hero sang trang 2 |
| 17 | 🎲 Ngẫu nhiên / 🔄 Reset / 📋 Danh sách + 2 ô select nhóm/sắp xếp | toolbar trang 2 | GIỮ nguyên |
| 18 | Chips: Tất cả · WLW · Hiện đại · Cổ trang · AOB · Khác · ❤️ Yêu thích · 📌 Đã ghim | trang 2 | GIỮ nguyên |
| 19 | Ô tìm kiếm + 🔍 + lịch sử + gợi ý + nút ✖ xóa | trang 2 | GIỮ nguyên |
| 20 | "Mở Character ↗" (thẻ grid + csSheet) | trang 2 | GIỮ nguyên |
| 21 | Khung lớn nhân vật `#csSheet` | cả 2 ngữ cảnh | Có ở CẢ HAI trang |
| 22 | Hòm thư lời chào (`greeting-mail.js`) | nổi phải, theo giờ | Trang 2 giữ; trang 1 **KHÔNG load** (BẮT BUỘC — B.3) |
| 23 | Hộp cơm bí mật (`bento-lunch.js`) | nổi phải, 11h–13h | Trang 2 giữ; trang 1 **KHÔNG load** (BẮT BUỘC — B.3) |
| 24 | Splash "🌤️ GHÉ VÔ" | đầu trang | Chỉ trang 1, 1 lần/phiên (`sessionStorage`) |
| 25 | Tabbar 5 icon (🌤️ Thư viện · 🕊️ Nhân vật · 🪁 Lệnh · 🧭 Cẩm nang · 🎈 AI Studio) | đáy màn, đang ẩn | Tiếp tục ẨN (tự thêm CSS sau khi bỏ forest-portal) hoặc xóa markup |
| 26 | Footer "📖 Cách dùng nhanh…" + credit "by TeaGhiu ♥ · Supabase" | cuối trang 2 | GIỮ ở trang 2; trang 1 không có footer |
| 27 | Footer `.footer-links` (5 link) | cuối trang | **XÓA** — nội dung chuyển vào ☰ |
| 28 | Thống kê "Nhân vật / Đang hiển thị / 🪽 Lần bước vô" (`statTotal/statShown/statClicks`) | profile-hero | Chuyển sang trang 2, logic Supabase không đổi |
| 29 | Tiến trình bầu trời `--p` + class `sel-mini` | sky-js | Giữ ở trang 2 (điều khiển strip + trời); trang 1 không cần |

---

## 6) PHẠM VI KHÔNG ĐỤNG TỚI

- Giao diện `commands.html`, `isekai-guide.html`, `req.html`, `khu-rung.html` giữ nguyên (trừ bảng A.5 đổi link).
- Logic dữ liệu: mảng `chars`, đồng bộ Supabase (`cloudStatus`, statClicks "Lần bước vô"), đếm ❤️/📋 — không đổi.
- Nội dung `music-player-v4.js` — chỉ thay đổi nơi include script.
- `sw.js`: chỉ thêm `'./thu-vien.html'` vào mảng `CORE` [KHUYẾN NGHỊ] để PWA mở được trang mới offline.
- `manifest.webmanifest`: giữ nguyên (start_url vẫn `index.html`).

---

## 7) TIÊU CHÍ NGHIỆM THU — test trên điện thoại (Android/Chrome)

1. Mở site → splash → vào thẳng màn **Select Character**: **không còn** 2 nút ⤴⤵; **không thấy** đĩa nhạc, hòm thư lời chào, hộp cơm bí mật nổi ở đâu cả; vuốt lên/xuống vẫn đổi nhân vật; counter "… / 130" chạy đúng.
2. Chạm thẻ Select → mở khung lớn nhân vật (`csSheet`) với "Mở Character ↗" hoạt động.
3. Bấm **"Thư viện ⌄"** → URL đổi sang `thu-vien.html`, thấy "Toàn bộ thư viện" + tìm kiếm + grid (chuyển trang thật, không cuộn trong cùng trang).
4. Trang thư viện: có **☰ góc phải trên**; panel mở ra **đủ 9 mục** theo C.2; từng mục dẫn đúng đích; ESC/chạm ngoài đóng panel.
5. Cuối trang thư viện: **không còn** hàng link `Thư viện · Chọn nhân vật · Thư viện Lệnh · 💌 REQ · Google AI Studio`; vẫn còn dòng hướng dẫn + credit.
6. Sel-strip hiện khi cuộn xuống, tên khớp nhân vật đang chọn ở trang 1; chạm strip → về màn Select.
7. Hộp nhạc vẫn chạy ở trang thư viện, biến mất khi sang trang Select.
8. Bật 🌙 ở thư viện → sang Select vẫn giữ nền tối (`skyNight`).
9. Link cũ `index.html#library` vẫn tới trang thư viện; `index.html#featured` vẫn tới màn Select.
10. Console **không có lỗi đỏ** trên cả 2 trang (đặc biệt lỗi null do thiếu phần tử của trang kia).
11. Khu rừng, Cẩm nang, REQ, commands mở được từ ☰.
12. PWA đã cài mở được cả 2 trang (sw.js cache `thu-vien.html`).

---

## 8) GHI CHÚ KỸ THUẬT

- Không có framework/build — sửa file tĩnh, test bằng cách mở `index.html` và `thu-vien.html` trên server tĩnh.
- Copy `index.html` → `thu-vien.html` rồi cắt theo bảng A.1 là cách an toàn nhất (giữ nguyên style, nền bầu trời, font).
- Giữ đúng thứ tự thẻ script: `click-sound.js` → `music-player-v4.js` (chỉ trang 2) → khối JS chính → phần sky-js tương ứng; `bento-lunch.js` phải đứng SAU dữ liệu `chars`.
- Sau khi bỏ `forest-portal.js` ở trang 2: tự thêm CSS ẩn `.tabbar` (vì CSS ẩn cũ do forest-portal chèn) — tránh tabbar lộ lại ở màn ≤900px.
- Panel ☰: tái dụng code `forest-portal.js` (toggle, panel, clone link, ESC/outside close, overlay khu rừng, mở nhạc, đổi theme) nhưng **đưa nút ra khỏi `.navbar`** vì navbar đang bị skin sky ẩn toàn bộ.
