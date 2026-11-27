# 🚀 FUNLEARN - Học vui mỗi ngày

> **Nền tảng học liệu tương tác liên môn Toán – Tiếng Việt – Tiếng Anh dành cho học sinh Tiểu học Lớp 3, 4, 5 (Bám sát Chương trình GDPT 2018 - Bộ SGK Kết nối tri thức với cuộc sống).**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Grade](https://img.shields.io/badge/Ti%E1%BB%83u%20H%E1%BB%8Dc-L%E1%BB%9Bp%203%20%7C%204%20%7C%205-blue)](#)
[![Subjects](https://img.shields.io/badge/M%C3%B4n%20H%E1%BB%8Dc-To%C3%A1n%20%E2%80%A2%20Ti%E1%BA%BFng%20Vi%E1%BB%87t%20%E2%80%A2%20Ti%E1%BA%BFng%20Anh-emerald)](#)
[![Architecture](https://img.shields.io/badge/Ki%E1%BA%BFn%20Tr%C3%BAc-Pure%20ES6%20Modules%20%2B%20Static%20JSON-orange)](#)
[![Accessibility](https://img.shields.io/badge/Tr%E1%BB%A3%20N%C4%83ng-CAST%20UDL%203.0%20%26%20WCAG%202.2%20AAA-purple)](#)

---

## 🌟 1. Giới thiệu tổng quan & Chuẩn Sư Phạm

**FUNLEARN** là nền tảng học liệu số tương tác cao, được thiết kế tối ưu cho tâm lý học tập và nhận thức trực quan của học sinh Tiểu học Việt Nam. Nền tảng tuân thủ nghiêm ngặt các nguyên lý EdTech hiện đại:

1. **Nguyên lý Mayer & Fiorella (Giảm tải nhận thức ngoại lai):**
   - Không chứa bất kỳ hiệu ứng chuyển động lặp vô hạn hay nhấp nháy nào xung quanh vùng đề bài trong lúc học sinh đang đọc.
   - Nhân vật đại diện Chú cú SVG (`mascot-owl`) tự động dừng mọi chuyển động (`animation: none !important`) khi học sinh bước vào **Phòng Luyện Tập**.
2. **Nguyên lý Nielsen Heuristics (Phản hồi & Không Soft-lock):**
   - Trạng thái hệ thống luôn hiển thị rõ ràng (khối lớp đang chọn, thanh tiến độ `Câu X / Y`, số sao tích lũy và chuỗi ngày chuyên cần).
   - Cơ chế thoát an toàn về trang chủ ở mọi màn hình.
   - **Quy trình phản hồi 3 tầng chống kẹt bài:**
     - *Sai lần 1:* Làm mờ đáp án sai, động viên nhẹ nhàng để học sinh tự chọn lại.
     - *Sai lần 2:* Mở khung **💡 Gợi ý & Định hướng phương pháp**, mascot nghiêng đầu bật đèn.
     - *Sai từ lần 3:* Mở hướng dẫn giải từng bước và tự động mở khóa nút **CÂU TIẾP THEO** để học sinh không bao giờ bị kẹt vĩnh viễn ở câu khó.
3. **Chuẩn Trợ năng CAST UDL 3.0 & WCAG 2.2 AAA:**
   - Touch Target tối thiểu **48px × 48px** với phản hồi xúc giác 3D Claymorphism.
   - Thanh công cụ trợ năng:
     - 🔊 **Text-to-Speech (TTS):** Đọc to đề bài với giọng đọc tự nhiên (tự chuyển `vi-VN` cho Toán/Tiếng Việt và `en-US` cho Tiếng Anh).
     - 🔍 **Cỡ chữ lớn (+15%):** Hỗ trợ học sinh khiếm thị nhẹ hoặc học trên màn hình nhỏ.
     - ⚡ **Giảm chuyển động (Reduced Motion):** Vô hiệu hóa hiệu ứng chuyển động cho học sinh nhạy cảm với tiền đình hoặc tôn trọng thiết lập của hệ điều hành.

---

## 💻 2. Cấu trúc thư mục mã nguồn

Dự án được tái cấu trúc sạch sẽ theo mô hình **Pure Static Web** (ES6 Modules, không cần cài đặt React, Vue, Next.js hay Webpack; chạy ngay lập tức trên GitHub Pages hoặc bất kỳ máy chủ tĩnh nào):

```text
FUNLEARN/
├── index.html                     # Khung ứng dụng SPA chuẩn ngữ nghĩa HTML5
├── assets/
│   └── css/
│       └── clay-motion.css        # Hệ thống nút 3D Claymorphism, 60fps GPU animation, dây nối Bezier & @media print
├── data/
│   ├── grade3.json                # Dữ liệu 16 bài học chuẩn Lớp 3 (Toán, Tiếng Việt, Tiếng Anh)
│   ├── grade4.json                # Dữ liệu 14 bài học chuẩn Lớp 4
│   └── grade5.json                # Dữ liệu 14 bài học chuẩn Lớp 5
├── js/
│   ├── store.js                   # Quản lý trạng thái tập trung (Single Source of Truth), localStorage & cache JSON
│   ├── quizEngine.js              # Chấm điểm 4 dạng bài, chuẩn hóa input & cơ chế phản hồi sư phạm 3 tầng
│   ├── renderer.js                # Render DOM an toàn (không innerHTML thô), Mascot SVG 3 mood, Canvas Confetti & Báo cáo
│   └── main.js                    # Khởi tạo ứng dụng, Event Delegation, Adult Gate & Parent Portal
└── README.md                      # Hướng dẫn kỹ thuật và hướng dẫn biên dịch Tailwind tĩnh
```

---

## 👨‍👩‍👧 3. Góc Phụ Huynh & Thầy Cô (Parent & Teacher Corner)

Được bố trí ở thanh điều hướng và chân trang, được bảo vệ bởi **Hộp thoại kiểm tra người lớn (Parental Gate)** bằng một phép toán ngẫu nhiên (ví dụ `7 × 8 = ?`) để tránh việc học sinh ấn nhầm.

### Các tính năng cốt lõi:
1. **Bảng tổng hợp tiến độ cá nhân hóa:**
   - Theo dõi từng khối lớp (Khối 3, Khối 4, Khối 5).
   - Thống kê tổng số câu đã làm, tỷ lệ trả lời đúng ngay lần đầu, số sao và chuỗi ngày học.
   - Bảng phân tích chi tiết từng môn: Toán Học, Tiếng Việt, Tiếng Anh.
   - Chẩn đoán năng lực: Danh sách các kỹ năng đã nắm vững và các kỹ năng cần ôn luyện thêm.
2. **In / Xuất Báo Cáo PDF Khổ A4:**
   - Bấm nút **In / Xuất PDF** để mở hộp thoại in của trình duyệt (`window.print()`).
   - Tích hợp sẵn CSS `@media print` giúp ẩn toàn bộ nút bấm, canvas, header và background đậm, trình bày phiếu đánh giá trang nhã, sắc nét trên khổ A4.
3. **Nhập Bộ Câu Hỏi JSON Tùy Chỉnh (Dành cho Giáo viên):**
   - Giáo viên có thể tải lên tệp `.json` hoặc dán mã JSON câu hỏi tự biên soạn.
   - Hệ thống tự động phân tích và lưu vào `localStorage`, ngay lập tức hiển thị bài tập vào danh mục luyện tập của khối lớp tương ứng.
4. **Đặt Lại Dữ Liệu:**
   - Nút đặt lại kèm hộp thoại xác nhận giúp học sinh làm lại từ đầu khi chuyển năm học hoặc ôn thi.

### Chuẩn Schema JSON để Giáo viên nhập câu hỏi:
```json
{
  "title": "Bài tập ôn tập cuối tuần môn Toán",
  "questions": [
    {
      "id": "q-custom-1",
      "type": "choice",
      "prompt": "Tính giá trị của biểu thức: 125 × 4 = ?",
      "options": [
        { "id": "A", "text": "480" },
        { "id": "B", "text": "500" },
        { "id": "C", "text": "520" },
        { "id": "D", "text": "600" }
      ],
      "answer": "B",
      "hint": "Em có thể tách: 100 × 4 = 400 và 25 × 4 = 100, sau đó lấy 400 + 100."
    },
    {
      "id": "q-custom-2",
      "type": "input",
      "prompt": "Điền số thích hợp vào chỗ chấm: Một hình vuông có cạnh 8 cm thì chu vi là ... cm.",
      "answer": "32",
      "hint": "Chu vi hình vuông bằng độ dài một cạnh nhân với 4: 8 × 4 = ?"
    }
  ]
}
```

---

## 🛠️ 4. Hướng dẫn Biên dịch Tailwind CSS tĩnh (Bỏ phụ thuộc CDN)

Hiện tại, trang web sử dụng link Tailwind CDN cho mục đích phát triển nhanh. Khi triển khai trong môi trường mạng nội bộ trường học (Intranet / Offline) hoặc tối ưu tốc độ tối đa cho môi trường sản xuất, bạn có thể biên dịch Tailwind CSS tĩnh theo các bước đơn giản sau:

### Cách 1: Sử dụng Tailwind CSS v4 Standalone CLI (Khuyên dùng)
```bash
# 1. Quét toàn bộ class trong HTML và JS rồi biên dịch ra file tĩnh tối ưu:
npx @tailwindcss/cli -i assets/css/clay-motion.css -o assets/css/tailwind.min.css --minify
```

### Cách 2: Sử dụng Tailwind CSS v3 CLI
```bash
# Cài đặt tailwindcss cục bộ (nếu cần):
npm install -D tailwindcss

# Tạo file cấu hình và quét:
npx tailwindcss -i assets/css/clay-motion.css -o assets/css/tailwind.min.css --minify
```

### Cách 3: Chuyển đổi mã nguồn `index.html` sang dùng CSS tĩnh
Mở `index.html`, thay thế dòng thẻ script:
```html
<!-- CŨ (CDN): -->
<script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>

<!-- MỚI (Tĩnh, siêu nhẹ, chạy hoàn toàn offline): -->
<link rel="stylesheet" href="assets/css/tailwind.min.css">
```

---

## 🚀 5. Triển khai lên GitHub Pages

1. Đưa toàn bộ thư mục `FUNLEARN` lên kho lưu trữ GitHub của bạn.
2. Vào **Settings** > **Pages** > Chọn Branch `main` (hoặc `master`), thư mục `/(root)`.
3. Bấm **Save**. Website sẽ hoạt động ngay lập tức tại địa chỉ:
   `https://<ten-tai-khoan>.github.io/<ten-repo>/`
*(Mọi đường dẫn gọi API tải JSON đều sử dụng đường dẫn tương đối `./data/grade*.json` nên website chạy hoàn hảo cả ở domain gốc lẫn subfolder).*

---

## 📄 Bản quyền & Đóng góp

- **Dự án:** FUNLEARN - Học vui mỗi ngày
- **Chương trình giáo dục:** Bám sát SGK Kết nối tri thức với cuộc sống (Bộ Giáo Dục & Đào Tạo Việt Nam)
- **Bản quyền:** Mã nguồn mở theo giấy phép MIT.
