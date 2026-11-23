# 🚀 LearnChill – Học Vui Mỗi Ngày

> **Nền tảng học tập tương tác liên môn tích hợp Toán – Tiếng Việt – Tiếng Anh dành cho học sinh Tiểu học (Khối 3, 4, 5)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Grade](https://img.shields.io/badge/Ti%E1%BB%83u%20H%E1%BB%8Dc-L%E1%BB%9Bp%203%20%7C%204%20%7C%205-blue)](#)
[![Subjects](https://img.shields.io/badge/M%C3%B4n%20H%E1%BB%8Dc-To%C3%A1n%20%E2%80%A2%20Ti%E1%BA%BFng%20Vi%E1%BB%87t%20%E2%80%A2%20Ti%E1%BA%BFng%20Anh-emerald)](#)

---

## 🌟 Giới thiệu tổng quan

**LearnChill** là dự án nghiên cứu khoa học và phát triển phần mềm giáo dục (EdTech), ứng dụng phương pháp **Học tập xoắn ốc (Spiral Learning)** kết hợp mô hình tương tác phản hồi tức thì để giúp học sinh tiểu học tiếp thu kiến thức một cách nhẹ nhàng, thư thái và tự nhiên nhất.

Hệ thống được thiết kế theo phong cách giao diện **Claymorphism** thân thiện với trẻ em, tích hợp đầy đủ 44 chuyên đề bồi dưỡng và hơn 200 câu hỏi tương tác thuộc 3 môn học trụ cột:
1. **Toán Học**: Số học nâng cao, toán tư duy logic, phân số, hình học & chuyển động đều (Chuẩn sách *PGS.TS Trần Diên Hiển*).
2. **Tiếng Việt**: Chính tả phân biệt âm vần khó, cấu tạo từ (từ ghép, từ láy), từ loại, câu kể, câu ghép & cảm thụ văn học (Chuẩn sách *GS.TS Lê Phương Nga*).
3. **Tiếng Anh**: Ngữ pháp trọng tâm, mạo từ (*a/an/the*), danh từ số nhiều bất quy tắc, thì hiện tại/quá khứ/tương lai (Chuẩn sách *Global Success - Bộ GD&ĐT*).
4. **Toán Tiếng Anh Quốc Tế**: Tích hợp 10 bộ sách quốc tế danh tiếng (180 Days of Math, Common Core, In Step Maths, Singapore Math Challenge, Math Minutes, Oxford Mathematics PYP, Toán Sing Olympic).

---

## 💻 Cấu trúc thư mục dự án

```text
Learnchill/
├── index.html                 # Giao diện chính của ứng dụng LearnChill (Single-Page App)
├── style.css                  # Tùy biến Claymorphism UI & chuyển động mềm mại
├── app.js                     # Toàn bộ logic ứng dụng, ngân hàng câu hỏi 3 môn & engine tương tác
├── build_word_doc.js          # Công cụ tự động tạo báo cáo nghiên cứu khoa học chuẩn DOCX
├── check_lessons.js           # Kiểm thử tự động độ phủ bài học (100% 44 chuyên đề)
├── verify_subjects.js         # Kiểm thử tự động cách ly môn học (Không lẫn môn)
├── BAO_CAO_GIAI_TRINH...docx  # Báo cáo giải trình 15 câu hỏi nghiên cứu khoa học
├── KE_HOACH_THUC_THI...md     # Tài liệu kiến trúc hệ thống và lộ trình kỹ thuật
└── .gitignore                 # Cấu hình loại trừ file lớn & thư viện phụ thuộc
```

---

## 🚀 Hướng dẫn khởi chạy

Dự án được xây dựng dưới dạng **Pure Client-Side Web Application** (không phụ thuộc máy chủ phức tạp):

1. **Chạy trực tiếp**: Mở trực tiếp tệp `index.html` bằng bất kỳ trình duyệt web hiện đại nào (Google Chrome, Microsoft Edge, Safari, Firefox).
2. **Chạy qua Live Server**: Sử dụng tiện ích Live Server trong VS Code để trải nghiệm tải trang mượt mà nhất.
3. **Chạy kiểm thử tự động**:
   ```bash
   # Kiểm tra độ phủ câu hỏi của 44 bài học:
   node check_lessons.js

   # Kiểm tra cách ly môn học và logic an toàn:
   node verify_subjects.js
   ```

---

## 📚 Nguồn tài liệu chính thức tích hợp

- 🇻🇳 **Toán Học 3, 4, 5**: Bộ sách *Bồi dưỡng học sinh giỏi Toán* – PGS.TS Trần Diên Hiển (CLB EMATH / NXB Giáo Dục Việt Nam).
- 🇻🇳 **Tiếng Việt 4, 5**: Bộ sách *Tiếng Việt Nâng Cao* – GS.TS Lê Phương Nga (NXB Giáo Dục Việt Nam).
- 🇬🇧 **Tiếng Anh 3, 4, 5**: Chương trình *Global Success* – Bộ Giáo dục & Đào tạo.
- 🌍 **Toán Tiếng Anh Quốc Tế**: 10 bộ sách bồi dưỡng tư duy song ngữ (Nguồn tài liệu: Cô Phạm Thuý).

---

## 📄 Bản quyền & Tác giả

- **Dự án**: LearnChill (Học Vui Mỗi Ngày)
- **Tác giả**: Nhóm Nghiên cứu & Phát triển LearnChill
- **Năm phát triển**: 2026
