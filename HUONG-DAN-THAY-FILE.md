# 📦 HƯỚNG DẪN THAY FILE — bản cập nhật tách 2 trang

> Tải file **`cap-nhat-teaghiu.zip`** (hoặc tải từng file trong danh sách dưới) rồi **tải lên thay thế** đúng vào thư mục gốc của web (cùng chỗ với file `index.html` cũ).

## 1) Các file cần tải lên (thay / thêm mới)

| File | Thao tác | Là gì |
|---|---|---|
| `index.html` | **Thay** | TRANG 1 · **Select Character** — chỉ còn màn chọn nhân vật. Không có nút ⤴⤵, không có hộp nhạc, không có hòm thư/hộp cơm. Nút "🎲" góc phải thẻ để quay ngẫu nhiên. Nút **"Thư viện ⌄" → chuyển sang trang thư viện**. |
| `thu-vien.html` | **Thêm mới** | TRANG 2 · **Toàn bộ thư viện** — tìm kiếm/lọc/danh sách. Có **nút ☰ 3 gạch góc phải trên** chứa đủ 9 mục, **đã bỏ 5 link cuối trang**, giữ dòng hướng dẫn + credit. Hộp nhạc, hòm thư, hộp cơm vẫn ở đây. |
| `chars-data.js` | **Thêm mới — BẮT BUỘC** | Dữ liệu 130 nhân vật **tách từ khối `const chars = [...]` nằm trong index.html cũ**. Cả 2 trang cùng đọc file này → **thiếu file này = web không còn nhân vật nào (trang trắng)**. Không có "link ảnh" nào trong file — xem mục 2 bên dưới. |
| `sw.js` | **Thay** | PWA: cache thêm trang thư viện + dữ liệu chung. |
| `commands.html` | **Thay** | Sửa link "Thư viện" trỏ sang `thu-vien.html` (trang mới). |
| `isekai-guide.html` | **Thay** | Sửa link như trên. |
| `req.html` | **Thay** | Sửa link như trên. |
| `khu-rung.html` | **Thay** | Nút "Về thư viện" trong menu trỏ sang `thu-vien.html`. |

Các file khác (style.css, ảnh, nhạc, khu-rung…) **không cần đụng tới**.

## 2) Ảnh nhân vật nằm ở đâu? — KHÔNG ĐỔI GÌ CẢ

- Ảnh **không nằm trong `chars-data.js`** và cũng không nằm trong 2 trang HTML. Ảnh vẫn là thư mục **`chars/`** trên GitHub (`pic001.jpg`, `pic002.jpg`…) như bạn vẫn upload.
- Tên ảnh được nối **tự động theo số thứ tự dòng** trong mảng `chars` (giống hệt bản gốc):
  - Dòng 1 (Lâm Sơ Yến) → `chars/pic001.jpg` · dòng 2 (Miên Dư) → `chars/pic002.jpg` …
  - Nhân vật có nhiều ảnh: thêm `picXXX_2.jpg`, `picXXX_3.jpg`… vào `chars/` là khung lớn tự lướt được.
  - 10 nhân vật mới nhất dùng `pic121.png`→`pic130.png` — bảng chuyển đổi `PIC_FIX` (cùng quy ước tên ảnh) hiện nằm **trong `chars-data.js`**, mở lên là thấy, có chú thích tiếng Việt ngay đầu file.
- **Thêm nhân vật mới:** thêm 1 dòng ở **CUỐI** mảng trong `chars-data.js` + upload `chars/pic131.jpg`. ⚠️ Chèn dòng ở **giữa** mảng sẽ làm trượt ảnh các nhân vật phía sau (đặc tính của bản gốc, không phải lỗi mới).

## 2) Kiểm tra nhanh sau khi thay (trên điện thoại)

1. Mở web → splash → vào thẳng **Select Character**: không còn 2 nút ⤴⤵, không còn đĩa nhạc/hòm thư/hộp cơm. Vuốt lên/xuống vẫn đổi nhân vật.
2. Bấm **"Thư viện ⌄"** → chuyển sang trang **"Toàn bộ thư viện"** (URL đổi thành `thu-vien.html`).
3. Ở trang thư viện: **☰ góc phải trên** mở menu đủ 9 mục; **cuối trang không còn hàng link**.
4. Cuộn xuống → dải "🕊️ tên ⌃ chọn lại" hiện trên cùng; bấm vào là về màn Select (đúng nhân vật đang chọn dở).
5. Bật 🌙 ở thư viện → sang trang Select vẫn nền tối.
6. Ai đang cài PWA cũ: mở lại web 1–2 lần để cập nhật cache.

## 3) Link cũ vẫn hoạt động

- `index.html#library` → tự chuyển sang `thu-vien.html`
- `thu-vien.html#featured` → tự quay về `index.html`

## 4) Ghi chú kỹ thuật

- Hai trang dùng chung `chars-data.js` + phần JS lõi (Supabase, tag, khung nhân vật, ảnh) — đã test tự động 36/36 case (render, vuốt, khung lớn, tìm kiếm, menu ☰, chuyển tối, redirect link cũ) bằng mô phỏng trình duyệt.
- Khi muốn thêm/sửa nhân vật: mở `chars-data.js`, thêm 1 dòng theo mẫu `{ name:"...", tag:"...", summary:"...", link:"...", accent:"#mã_màu" },`.
- Ảnh nhân vật vẫn để trong thư mục `chars/` như cũ (pic001.jpg…).
