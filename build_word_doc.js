const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Footer,
  Header,
  PageNumber
} = require('docx');

// Utility styling constants
const COLOR_PRIMARY = '1E3A8A';   // Dark Navy Academic
const COLOR_SECONDARY = '0284C7'; // Blue Sky
const COLOR_TEXT = '1E293B';      // Slate Text
const COLOR_MUTED = '64748B';     // Slate Muted
const COLOR_BG_HEADER = 'F1F5F9'; // Soft Gray-Blue Header Fill
const COLOR_BG_ZEBRA = 'F8FAFC';  // Subtle Zebra Fill
const COLOR_BORDER = 'CBD5E1';    // Border Gray

// Cell padding helper
const cellPadding = {
  top: 120,
  bottom: 120,
  left: 140,
  right: 140
};

// Table border style helper
const tableBorders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
  insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' }
};

// Paragraph creation helpers
function pHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    run: {
      font: 'Times New Roman',
      size: 32, // 16pt
      bold: true,
      color: COLOR_PRIMARY
    }
  });
}

function pHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    run: {
      font: 'Times New Roman',
      size: 26, // 13pt
      bold: true,
      color: COLOR_SECONDARY
    }
  });
}

function pHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
    run: {
      font: 'Times New Roman',
      size: 24, // 12pt
      bold: true,
      color: COLOR_TEXT
    }
  });
}

function pBody(runs, options = {}) {
  const children = Array.isArray(runs) ? runs : [new TextRun({ text: runs, font: 'Times New Roman', size: 24, color: COLOR_TEXT })];
  return new Paragraph({
    children: children,
    spacing: { before: options.before || 60, after: options.after || 80, line: 320 }, // 1.33x line height
    alignment: options.alignment || AlignmentType.LEFT
  });
}

function pBullet(boldPrefix, text) {
  return new Paragraph({
    children: [
      new TextRun({ text: boldPrefix + ': ', font: 'Times New Roman', size: 24, bold: true, color: COLOR_TEXT }),
      new TextRun({ text: text, font: 'Times New Roman', size: 24, color: COLOR_TEXT })
    ],
    bullet: { level: 0 },
    spacing: { before: 40, after: 60, line: 300 }
  });
}

// Table cell helper
function createCell(content, width, isHeader = false, isZebra = false) {
  const children = typeof content === 'string'
    ? [new Paragraph({
        children: [
          new TextRun({
            text: content,
            font: 'Times New Roman',
            size: isHeader ? 22 : 21,
            bold: isHeader,
            color: isHeader ? COLOR_PRIMARY : COLOR_TEXT
          })
        ],
        spacing: { before: 40, after: 40 }
      })]
    : content;

  return new TableCell({
    children: children,
    width: { size: width, type: WidthType.DXA },
    shading: {
      fill: isHeader ? COLOR_BG_HEADER : (isZebra ? COLOR_BG_ZEBRA : 'FFFFFF'),
      type: ShadingType.CLEAR
    },
    margins: cellPadding
  });
}

async function generateReportDocx() {
  const doc = new Document({
    creator: 'Nhóm Nghiên cứu & Phát triển Funlearn (Toán – Tiếng Việt – Tiếng Anh)',
    title: 'BÁO CÁO GIẢI TRÌNH KHOA HỌC & KIẾN TRÚC KỸ THUẬT DỰ ÁN FUNLEARN (TOÁN – TIẾNG VIỆT – TIẾNG ANH)',
    description: 'Báo cáo giải trình 15 câu hỏi nghiên cứu khoa học cho dự án nền tảng học tập tương tác tiểu học Funlearn: Toán – Tiếng Việt – Tiếng Anh',
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24,
            color: COLOR_TEXT
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } // 1 inch = 1440 dxa
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'DỰ THẢO KHOA HỌC • NỀN TẢNG HỌC TẬP TIỂU HỌC "FUNLEARN: TOÁN – TIẾNG VIỆT – TIẾNG ANH"', font: 'Times New Roman', size: 18, color: COLOR_MUTED, italics: true })
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 120 }
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Báo cáo kỹ thuật – Trang ', font: 'Times New Roman', size: 18, color: COLOR_MUTED }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 18, color: COLOR_MUTED }),
                  new TextRun({ text: ' / ', font: 'Times New Roman', size: 18, color: COLOR_MUTED }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 18, color: COLOR_MUTED })
                ],
                alignment: AlignmentType.CENTER
              })
            ]
          })
        },
        children: [
          // ==================== COVER / HEADER SECTION ====================
          new Paragraph({
            children: [
              new TextRun({ text: 'BÁO CÁO GIẢI TRÌNH KHOA HỌC & KIẾN TRÚC KỸ THUẬT', font: 'Times New Roman', size: 36, bold: true, color: COLOR_PRIMARY })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'DỰ ÁN: FUNLEARN (TOÁN – TIẾNG VIỆT – TIẾNG ANH) – HỌC VUI MỖI NGÀY', font: 'Times New Roman', size: 28, bold: true, color: COLOR_SECONDARY })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 160 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Khảo sát thực tế triển khai, cơ chế tương tác sư phạm, tích hợp 10 bộ sách Toán Tiếng Anh và quy trình kiểm soát chất lượng có sự hỗ trợ của Trí tuệ Nhân tạo (AI)',
                font: 'Times New Roman',
                size: 22,
                italics: true,
                color: COLOR_MUTED
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 280 }
          }),

          // Meta Table
          new Table({
            columnWidths: [3000, 6026],
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  createCell('Đối tượng nghiên cứu & thụ hưởng', 3000, true),
                  createCell('Học sinh lớp 3, 4, 5 (Tiểu học) – Môn Toán, Tiếng Việt, Tiếng Anh', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Chương trình bám sát', 3000, true),
                  createCell('SGK Kết nối tri thức với cuộc sống & 10 bộ sách Toán Tiếng Anh quốc tế', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Hiện trạng phiên bản', 3000, true),
                  createCell('Bản nguyên mẫu tương tác hoàn chỉnh (Interactive Front-end Prototype)', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Cấu trúc mã nguồn', 3000, true),
                  createCell('3 tệp tách rời độc lập: index.html (Khung), style.css (3D Claymorphism), app.js (Logic)', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Thời điểm lập báo cáo', 3000, true),
                  createCell('Tháng 11 Năm 2026', 6026)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 } }),

          // ==================== PHẦN I ====================
          pHeading1('PHẦN I. TỔNG QUAN DỰ ÁN VÀ ĐẶC TẢ SẢN PHẨM'),
          
          pBody([
            new TextRun({
              text: 'Dự án "Funlearn: Toán – Tiếng Việt – Tiếng Anh (Học vui mỗi ngày)" được thiết kế nhằm xây dựng một môi trường học tập tương tác kỹ thuật số tích hợp toàn diện 3 môn trụ cột dành cho học sinh tiểu học (các khối lớp 3, 4 và 5). Định hướng trọng tâm của sản phẩm không chỉ dừng lại ở việc chấm điểm bài tập, mà tập trung vào ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'tư duy phát triển (Growth Mindset)',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ' và ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'cơ chế tự nhận biết và sửa lỗi sai (Soft Correction Loop)',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: '. Trải nghiệm người dùng được xây dựng theo phong cách Claymorphism 3D tươi sáng, tương tác trực quan, thao tác một chạm và giảm tối đa áp lực điểm số.',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),

          pBody([
            new TextRun({
              text: 'Đặc biệt, hệ thống đã nạp trọn vẹn và chuẩn hóa toàn bộ học liệu bồi dưỡng nâng cao từ nguồn Google Drive chính thức: ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'Bộ sách Bồi dưỡng Toán 3, 4, 5 của PGS.TS Trần Diên Hiển (CLB EMATH); Tiếng Việt 4, 5 Nâng cao của GS.TS Lê Phương Nga (NXB Giáo Dục Việt Nam); Bồi dưỡng Học sinh giỏi Tiếng Anh 3, 4, 5 (Global Success) cùng 10 bộ sách Toán Tiếng Anh quốc tế (Cô Phạm Thuý)',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_SECONDARY
            }),
            new TextRun({
              text: ' vào phòng luyện tập tương tác đa phương thức, giúp học sinh vừa củng cố kiến thức tinh hoa trong nước, vừa rèn luyện tư duy logic quốc tế.',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),

          // ==================== PHẦN II ====================
          pHeading1('PHẦN II. GIẢI TRÌNH CHI TIẾT 15 CÂU HỎI KHOA HỌC'),

          // CÂU 1
          pHeading2('Câu 1. Công nghệ thực sự sử dụng trong phiên bản hiện tại'),
          pBody([
            new TextRun({
              text: 'Trong phiên bản website hiện tại, có sự phân định rạch ròi giữa ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'những công nghệ đã được hiện thực hóa trực tiếp trong mã nguồn',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ' và ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'những công nghệ thuộc bản thiết kế kiến trúc mở rộng',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_MUTED
            }),
            new TextRun({
              text: ':',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),

          new Table({
            columnWidths: [3000, 6026],
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  createCell('Thành phần công nghệ', 3000, true),
                  createCell('Hiện trạng thực tế trong dự án', 6026, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('HTML5 / CSS3 / JavaScript ES6', 3000, false, false),
                  createCell('THỰC TẾ: Đã triển khai hoàn thiện trong 3 tệp độc lập (index.html, style.css, app.js), vận hành toàn bộ giao diện và cỗ máy kiểm tra bài tập.', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Tailwind CSS (Allowlisted CDN)', 3000, false, true),
                  createCell('THỰC TẾ: Đang sử dụng CDN gstatic để hỗ trợ bố cục lưới đáp ứng (Responsive Grid) và hệ thống tiện ích giao diện.', 6026, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Antigravity (Google DeepMind)', 3000, false, false),
                  createCell('THỰC TẾ: Nền tảng trợ lý AI hỗ trợ nhóm thiết kế mã nguồn, chuyển hóa dữ liệu câu hỏi và kiểm thử cú pháp.', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Firebase Authentication & Realtime Database', 3000, false, true),
                  createCell('KHẢO SÁT / ĐỊNH HƯỚNG: Nằm trong tài liệu kiến trúc, chưa cài đặt vào mã nguồn chạy thực tế.', 6026, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Neon PostgreSQL / Supabase', 3000, false, false),
                  createCell('THIẾT KẾ ĐỊNH HƯỚNG: Đã xây dựng schema 13 bảng quan hệ trong tài liệu kỹ thuật, chưa kết nối trực tiếp vào bản Prototype.', 6026)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Vercel / Firebase Functions (Serverless)', 3000, false, true),
                  createCell('CHƯA TRIỂN KHAI: Toàn bộ tương tác hiện do JavaScript phía Client đảm nhiệm.', 6026, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Nền tảng Hosting (Vercel, GitHub Pages)', 3000, false, false),
                  createCell('SẴN SÀNG TRIỂN KHAI: Website được cấu trúc tĩnh 100%, sẵn sàng chạy ngay trên GitHub Pages hoặc Vercel.', 6026)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 120 } }),

          // CÂU 2
          pHeading2('Câu 2. Khảo sát Firebase Realtime Database và Neon PostgreSQL'),
          pBullet('Hiện trạng thực tế', 'Cả Firebase Realtime Database và Neon PostgreSQL đều chưa được sử dụng trong phiên bản chạy thực tế hiện tại. Toàn bộ dữ liệu của học sinh (số sao, ngày streak, bài tập đã hoàn thành, số lần thử) đang được quản lý trực tiếp trong biến trạng thái appState trên bộ nhớ của trình duyệt (In-memory Client State).'),
          pBullet('Nhiệm vụ thiết kế của Neon PostgreSQL', 'Trong tài liệu kiến trúc kỹ thuật (KE_HOACH_THUC_THI_VA_KIEN_TRUC_HE_THONG.md), nhóm đã thiết kế cấu trúc CSDL quan hệ gồm 13 bảng chuẩn hóa (grades, subjects, textbook_units, lessons, exercises, skills, questions, question_skills, answers, hints, students, attempts, progress). Neon PostgreSQL được định hướng làm kho lưu trữ trung tâm cho dữ liệu SGK và lịch sử nỗ lực chi tiết của học sinh.'),
          pBullet('Khuyến nghị cho bài báo', 'Nhóm nên đưa mô hình cơ sở dữ liệu quan hệ Neon PostgreSQL vào bài báo dưới danh nghĩa là "Kiến trúc cơ sở dữ liệu đề xuất cho giai đoạn triển khai Backend", đồng thời khẳng định trung thực rằng bản nguyên mẫu thử nghiệm hiện đang lưu trữ phía Client để phục vụ kiểm nghiệm tính khả thi sư phạm.'),

          // CÂU 3
          pHeading2('Câu 3. Cơ chế xử lý phía máy chủ (Serverless Functions)'),
          pBody([
            new TextRun({
              text: 'Phiên bản hiện tại ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'không sử dụng Firebase Cloud Functions cũng như Vercel Serverless Functions',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: '. Cỗ máy tương tác (Interaction Engine) trong tệp app.js thực hiện toàn bộ nghiệp vụ: so khớp đáp án, đếm số lần làm sai, kích hoạt hiệu ứng rung thẻ, xóa ô nhập liệu và hiển thị gợi ý sau 2 lần thử.',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),

          // CÂU 4
          pHeading2('Câu 4. Nền tảng triển khai và vận hành ổn định'),
          pBullet('Môi trường hiện tại', 'Sản phẩm đang được vận hành và kiểm thử cục bộ (Local Environment) trên máy trạm thông qua tệp index.html.'),
          pBullet('Khả năng tương thích nền tảng', 'Do mã nguồn được tối ưu thành các tệp web tĩnh chuẩn mực (HTML5/CSS3/Vanilla JS), website hoàn toàn tương thích và có thể xuất bản lên GitHub Pages, Vercel hoặc Firebase Hosting mà không cần sửa đổi mã nguồn.'),
          pBullet('Mô tả chính thức trong bài báo', 'Sản phẩm được định danh là "Bản nguyên mẫu tương tác hoàn chỉnh (Interactive Prototype)" trên nền tảng Web tiêu chuẩn.'),

          // CÂU 5
          pHeading2('Câu 5. Các hoạt động kiểm thử đã hoàn thành và dự kiến'),
          new Table({
            columnWidths: [2800, 1800, 4426],
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  createCell('Nội dung kiểm thử', 2800, true),
                  createCell('Trạng thái', 1800, true),
                  createCell('Kết quả kiểm thử chi tiết', 4426, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử tương tác 4 dạng bài', 2800, false, false),
                  createCell('ĐÃ HOÀN THÀNH', 1800),
                  createCell('Đã kiểm tra đầy đủ 4 dạng: Trắc nghiệm, Điền số, Ghép nối Cột A - B và Đúng/Sai. Phản hồi Đúng (viền xanh, cộng sao) và Sai (rung thẻ, xóa ô) hoạt động hoàn hảo.', 4426)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử điều hướng màn hình', 2800, false, true),
                  createCell('ĐÃ HOÀN THÀNH', 1800, false, true),
                  createCell('Luồng điều hướng Screen Router giữa 7 màn hình hoạt động mượt mà, không bị giật lag, đúng quy chuẩn một trang (Single Page Application).', 4426, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử cú pháp mã nguồn', 2800, false, false),
                  createCell('ĐÃ HOÀN THÀNH', 1800),
                  createCell('Chạy lệnh kiểm thử "node -c app.js" xác nhận mã nguồn JavaScript đạt chuẩn cú pháp 100%, không phát sinh lỗi biên dịch (Exit Code 0).', 4426)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử giao diện tiếp cận (WCAG)', 2800, false, true),
                  createCell('ĐÃ HOÀN THÀNH', 1800, false, true),
                  createCell('Kiểm thử độ tương phản màu sắc đạt chuẩn WCAG 2.2 (> 4.5:1), kích thước nút bấm 48–56px tối ưu cho ngón tay trẻ nhỏ.', 4426, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử xác thực Cloud & DB', 2800, false, false),
                  createCell('DỰ KIẾN', 1800),
                  createCell('Dự kiến thực hiện khi kết nối cơ sở dữ liệu quan hệ trên đám mây và triển khai cổng xác nhận của phụ huynh.', 4426)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Kiểm thử tải & kiểm thử E2E', 2800, false, true),
                  createCell('DỰ KIẾN', 1800, false, true),
                  createCell('Dự kiến viết bộ kịch bản kiểm thử tự động hóa với Playwright khi đưa hệ thống vào thử nghiệm diện rộng tại các trường học.', 4426, false, true)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 120 } }),

          // CÂU 6 & 7
          pHeading2('Câu 6 & 7. Hiện trạng bảo mật và bảo vệ dữ liệu trẻ em'),
          pBody([
            new TextRun({
              text: 'Căn cứ vào phạm vi sản phẩm hiện tại, các hoạt động rà soát bảo mật cấp máy chủ tự động (như danh sách 17 tiêu chuẩn Vibe-check, quét Path Traversal, cấu hình HTTP Headers) ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'chưa được triển khai chính thức',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ' do website hiện đang hoạt động thuần túy phía Client.',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),
          pBody([
            new TextRun({
              text: 'Tuy nhiên, nhóm đã chủ động thực hiện 2 giải pháp bảo vệ dữ liệu nền tảng theo quy định của pháp luật Việt Nam:',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_TEXT
            })
          ]),
          pBullet('Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15', 'Áp dụng nguyên tắc giảm thiểu dữ liệu (Data Minimization): Không thu thập số điện thoại, CCCD hay email cá nhân của học sinh. Học sinh đăng nhập bằng biệt danh thân mật (Bảo Nam, Mai Anh) hoặc mã học sinh nội bộ.'),
          pBullet('Phòng chống XSS phía Client', 'Tuyệt đối không dùng innerHTML để nhận trực tiếp chuỗi nhập liệu tự do từ người dùng; sử dụng innerText và DOM API chuẩn mực để hiển thị dữ liệu bài tập an toàn.'),

          // CÂU 8
          pHeading2('Câu 8. Bảng đối soát trạng thái 12 chức năng cốt lõi'),
          new Table({
            columnWidths: [800, 3600, 2000, 2626],
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  createCell('STT', 800, true),
                  createCell('Tên chức năng', 3600, true),
                  createCell('Trạng thái xác nhận', 2000, true),
                  createCell('Ghi chú kỹ thuật thực tế', 2626, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('01', 800),
                  createCell('Đăng nhập bằng email', 3600),
                  createCell('Chưa hoàn thiện', 2000),
                  createCell('Chủ động không dùng để bảo vệ quyền riêng tư của trẻ nhỏ.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('02', 800, false, true),
                  createCell('Đăng nhập bằng Google', 3600, false, true),
                  createCell('Chưa hoàn thiện', 2000, false, true),
                  createCell('Chưa tích hợp OAuth bên thứ ba.', 2626, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('03', 800),
                  createCell('Truy cập với tư cách khách', 3600),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000),
                  createCell('Chọn nhanh hồ sơ mẫu trên Màn hình khởi động để vào học ngay.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('04', 800, false, true),
                  createCell('Chọn khối lớp 3–5', 3600, false, true),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000, false, true),
                  createCell('Thanh chuyển lớp toàn cục trên Header hoạt động hoàn hảo.', 2626, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('05', 800),
                  createCell('Chọn môn Toán, Tiếng Việt, Tiếng Anh', 3600),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000),
                  createCell('Có đầy đủ 4 thẻ môn lớn, bao gồm cả môn Toán Tiếng Anh.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('06', 800, false, true),
                  createCell('Lựa chọn bài học theo SGK', 3600, false, true),
                  createCell('ĐANG BỔ SUNG', 2000, false, true),
                  createCell('Đã số hóa mẫu các bài trọng tâm lớp 3 và 10 bộ sách Toán Tiếng Anh.', 2626, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('07', 800),
                  createCell('Bài tập trắc nghiệm', 3600),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000),
                  createCell('4 lựa chọn lớn, nút kiểm tra và hiệu ứng phản hồi sinh động.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('08', 800, false, true),
                  createCell('Bài tập nối', 3600, false, true),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000, false, true),
                  createCell('Cơ chế chạm 2 điểm (Cột A sang Cột B), tiện lợi trên mọi thiết bị.', 2626, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('09', 800),
                  createCell('Bài tập kéo thả', 3600),
                  createCell('ĐÃ CHUYỂN ĐỔI SANG BÀI TẬP NỐI', 2000),
                  createCell('Chuyển đổi sang cơ chế chạm 2 lần để tránh tuột tay trên cảm ứng.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('10', 800, false, true),
                  createCell('Bài tập điền ô trống', 3600, false, true),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000, false, true),
                  createCell('Ô nhập số tự nhiên lớn, tự động căn giữa và kiểm tra kết quả.', 2626, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('11', 800),
                  createCell('Bài tập đúng/sai', 3600),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000),
                  createCell('Thẻ lựa chọn ĐÚNG / SAI trực quan, dễ hiểu.', 2626)
                ]
              }),
              new TableRow({
                children: [
                  createCell('12', 800, false, true),
                  createCell('Kiểm tra đáp án và phản hồi', 3600, false, true),
                  createCell('ĐÃ HOẠT ĐỘNG', 2000, false, true),
                  createCell('Phản hồi Đúng / Sai rõ ràng, rung lắc thẻ khi sai, mở gợi ý sau 2 lần.', 2626, false, true)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 120 } }),

          // CÂU 9
          pHeading2('Câu 9. Cơ chế sư phạm phản hồi khi học sinh làm sai (Soft Correction Loop)'),
          pBullet('Hệ thống có thông báo Đúng/Sai không?', 'CÓ. Thông báo khích lệ nhẹ nhàng bằng màu sắc thân thiện (xanh lục khi đúng, hồng nhạt khi sai kèm icon Cú Nhí).'),
          pBullet('Có hiển thị đáp án đúng ngay không?', 'KHÔNG HIỂN THỊ ĐÁP ÁN ĐÚNG. Hệ thống không "lộ" đáp án để ngăn chặn hành vi học vẹt hoặc đoán mò; học sinh phải tự tư duy để tìm ra kết quả chính xác.'),
          pBullet('Có cung cấp lời giải thích hoặc gợi ý không?', 'CÓ, NHƯNG KÍCH HOẠT CÓ ĐIỀU KIỆN. Hộp "GỢI Ý & GIẢI THÍCH" chỉ tự động mở ra khi học sinh đã thử và làm sai từ lần thứ 2 trở lên (attempts >= 2). Gợi ý chỉ hướng dẫn từ khóa phương pháp chứ không cho biết kết quả số cuối cùng.'),
          pBullet('Có cho phép học sinh thử lại nhiều lần không?', 'CÓ, KHÔNG GIỚI HẠN. Khi làm sai, hệ thống tự động xóa lựa chọn sai trên màn hình để học sinh thao tác lại, nút "CÂU TIẾP THEO" bị khóa chặt cho đến khi hoàn thành đúng.'),
          pBullet('Có lưu lại số lần thử không?', 'CÓ. Biến attempts ghi nhận số lần nỗ lực để phục vụ tính điểm thưởng: Đúng ngay lần 1 được 10 sao ⭐; nỗ lực sửa đúng sau nhiều lần được 5 sao ⭐ (tôn vinh tính kiên trì).'),

          // CÂU 10
          pHeading2('Câu 10. Lưu trữ và hiển thị tiến trình học tập'),
          pBullet('Dữ liệu lưu trong hệ thống', 'Lưu trữ tên học sinh, khối lớp, tổng số sao, số ngày học liên tiếp (streak), trạng thái bài học (completed/ready/locked) và lịch sử số lần thử từng câu.'),
          pBullet('Dữ liệu hiển thị cho học sinh', 'Hiển thị số sao trên Header; trạng thái bài học trên Mục lục SGK; màn hình Kỹ Năng phân chia 2 cột "🌟 Đã làm tốt" và "🌱 Cần ôn thêm"; màn hình Thành Tích hiển thị các huy hiệu đạt được.'),
          pBullet('Dữ liệu hiển thị cho giáo viên', 'Hiện chưa có giao diện Dashboard dành riêng cho giáo viên/phụ huynh trong phiên bản thử nghiệm này.'),

          // CÂU 11
          pHeading2('Câu 11. Quy trình xây dựng học liệu (Toán, Tiếng Việt, Tiếng Anh Nâng Cao & Quốc Tế)'),
          pBody([
            new TextRun({
              text: 'Nội dung học liệu được xây dựng theo quy trình ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'KẾT HỢP CÁC NGUỒN CHÍNH THỐNG VỚI QUY TRÌNH CHUYỂN HÓA SƯ PHẠM CHẶT CHẼ',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ':',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),
          pBullet('1. Nguồn Bồi dưỡng Toán 3, 4, 5 (PGS.TS Trần Diên Hiển – CLB EMATH)', 'Chắt lọc tinh hoa từ bộ sách kinh điển của PGS.TS Trần Diên Hiển (NXB Giáo Dục Việt Nam). Hệ thống hóa trọn vẹn 35 tuần học cho từng khối lớp, bồi dưỡng các dạng toán tư duy cốt lõi: số học phạm vi 1.000 đến 100.000, tìm x nâng cao, bài toán Tổng - Hiệu, Tổng - Tỉ, phân số, số thập phân, hình học và chuyển động đều.'),
          pBullet('2. Nguồn Tiếng Việt 4, 5 Nâng cao (GS.TS Lê Phương Nga – NXB Giáo Dục Việt Nam)', 'Số hóa các chuyên đề trọng tâm: Phân biệt chính tả âm đầu l/n, ch/tr, s/x, vần khó ươn/ương; phân tích cấu tạo từ đơn, từ ghép, từ láy; từ loại danh từ, động từ, tính từ; quy tắc viết hoa tên riêng tiếng nước ngoài; hệ thống câu ghép và các cặp quan hệ từ hô ứng.'),
          pBullet('3. Nguồn Bồi dưỡng HSG Tiếng Anh 3, 4, 5 (Global Success – Bộ GD&ĐT)', 'Bám sát khung chương trình Global Success: 13 chuyên đề ngữ pháp (Countable/Uncountable Nouns, Mạo từ a/an/the, Regular & Irregular Plurals, Thì hiện tại đơn, Quá khứ đơn, So sánh hơn/nhất, Quantifiers) cùng hệ thống 15 đề luyện thi học sinh giỏi.'),
          pBullet('4. Nguồn 10 bộ sách Toán Tiếng Anh quốc tế (Nguồn: Cô Phạm Thuý)', 'Tích hợp 10 bộ sách danh tiếng: 180 Days of Math, Common Core Math 4 Today, In Step Maths (Singapore), Master Skills Math, Math Guide Singapore, MATH IN MY WORLD, Math Minutes, OXFORD MATHEMATICS PYP, Singapore Math Challenge, Toán Sing. Nhóm đã số hóa các bài toán mẫu, biên soạn gợi ý song ngữ Anh - Việt để giải thích các thuật ngữ toán học cốt lõi (sum, difference, product, bar model).'),
          pBullet('5. Quy trình kiểm tra tính chính xác và số hóa', 'Đối chiếu trực tiếp với bản in SGK và các tệp PDF gốc lưu trữ trên Google Drive; rà soát chéo đáp án số học, chuẩn mực ngôn ngữ và văn phong sư phạm trước khi nạp vào hệ thống tương tác.'),

          // CÂU 12
          pHeading2('Câu 12. Công cụ AI sử dụng trong quá trình phát triển'),
          pBody([
            new TextRun({
              text: 'Công cụ AI duy nhất và chủ đạo được nhóm sử dụng là ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'Google Antigravity / Gemini Model (Gemini 3.8 Flash High)',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ' của đội ngũ Google DeepMind. Công cụ này hoạt động như một trợ lý lập trình chuyên sâu, tương tác trực tiếp qua môi trường dòng lệnh và cơ chế điều phối agent.',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),

          // CÂU 13
          pHeading2('Câu 13. Các công đoạn AI tham gia thực tế (Có minh chứng)'),
          pBullet('Công đoạn 1: Phân tích và phản biện kiến trúc sản phẩm', 'Đánh giá định hướng UX/UI, tư vấn áp dụng tâm lý học sư phạm (Growth Mindset), tiêu chuẩn WCAG 2.2 và Luật Bảo vệ dữ liệu trẻ em.'),
          pBullet('Công đoạn 2: Thiết kế mô hình CSDL và máy trạng thái', 'Hỗ trợ sinh sơ đồ ERD 13 bảng cơ sở dữ liệu quan hệ và máy trạng thái xử lý câu hỏi (Interaction State Machine) trong tệp KE_HOACH_THUC_THI_VA_KIEN_TRUC_HE_THONG.md.'),
          pBullet('Công đoạn 3: Lập trình giao diện và cỗ máy tương tác Frontend', 'Sinh mã nguồn HTML ngữ nghĩa, thiết kế CSS 3D Claymorphism mềm mại và lập trình cỗ máy kiểm tra bài tập trong app.js.'),
          pBullet('Công đoạn 4: Số hóa và cấu trúc hóa học liệu bài tập', 'Chuyển hóa dữ liệu đề bài, đáp án và gợi ý từ 10 bộ sách Toán Tiếng Anh thành cấu trúc đối tượng JavaScript chuẩn mực.'),
          pBullet('Công đoạn 5: Phát hiện lỗi và tối ưu hóa mã nguồn', 'Kiểm tra cú pháp dòng lệnh, gỡ bỏ toàn bộ các chú thích rườm rà ở các thẻ mục theo đúng yêu cầu tinh giản của nhóm.'),

          // CÂU 14
          pHeading2('Câu 14. Vai trò kiểm soát, hiệu chỉnh và xác nhận của con người (Human-in-the-loop)'),
          pBody([
            new TextRun({
              text: 'Con người giữ vai trò ',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            }),
            new TextRun({
              text: 'chỉ đạo, kiểm soát chất lượng và ra quyết định tối cao',
              font: 'Times New Roman',
              size: 24,
              bold: true,
              color: COLOR_PRIMARY
            }),
            new TextRun({
              text: ' trong toàn bộ quá trình phát triển:',
              font: 'Times New Roman',
              size: 24,
              color: COLOR_TEXT
            })
          ]),
          pBullet('Kiểm soát kiến trúc', 'Tác giả liên tục đưa ra các yêu cầu khắt khe: chuyển sang giao diện máy tính tràn viền, bổ sung màn hình khởi động (Screen Start), bắt buộc tách 3 tệp riêng biệt (html, css, js).'),
          pBullet('Hiệu chỉnh trải nghiệm người dùng', 'Khi AI sinh giao diện vẫn còn sót các dòng chú thích dưới các thẻ mục, người dùng đã lập tức phát hiện và yêu cầu xóa dứt điểm ("có thấy xóa đâu, xóa lại đê"), buộc AI phải dọn dẹp sạch sẽ chỉ để lại Icon và Tiêu đề.'),
          pBullet('Kiểm soát học liệu', 'Người dùng trực tiếp cung cấp 10 liên kết Google Drive của Cô Phạm Thuý và chỉ đạo nạp các tài liệu này vào phần bài tập tương tác.'),

          // CÂU 15
          pHeading2('Câu 15. Hệ thống minh chứng khoa học và lưu trữ nhật ký'),
          pBullet('Tệp nhật ký hội thoại tự động', 'Toàn bộ tiến trình làm việc được ghi nhận nguyên vẹn theo thời gian thực tại các tệp nhật ký hệ thống: transcript.jsonl và transcript_full.jsonl trong thư mục .system_generated/logs/.'),
          pBullet('Các phiên bản mã nguồn kiểm chứng', 'Hệ thống lưu trữ đầy đủ tài liệu kiến trúc (KE_HOACH_THUC_THI_VA_KIEN_TRUC_HE_THONG.md), bản nguyên mẫu (prototype_math_and_learn.html) và bộ 3 tệp mã nguồn độc lập (index.html, style.css, app.js).'),

          // ==================== PHẦN III ====================
          pHeading1('PHẦN III. PHỤ LỤC: 10 BỘ SÁCH TOÁN TIẾNG ANH (NGUỒN: CÔ PHẠM THUÝ)'),
          new Table({
            columnWidths: [600, 2600, 1600, 4226],
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  createCell('STT', 600, true),
                  createCell('Tên bộ sách', 2600, true),
                  createCell('Cấp độ', 1600, true),
                  createCell('Định hướng & Liên kết Google Drive', 4226, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('01', 600),
                  createCell('180 Days of Math', 2600),
                  createCell('Lớp 1 – 6', 1600),
                  createCell('Luyện tập toán hàng ngày theo xoắn ốc.\nDrive: https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9', 4226)
                ]
              }),
              new TableRow({
                children: [
                  createCell('02', 600, false, true),
                  createCell('Common Core Math 4 Today', 2600, false, true),
                  createCell('Lớp K – 3', 1600, false, true),
                  createCell('Chuẩn năng lực cốt lõi Hoa Kỳ.\nDrive: https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT', 4226, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('03', 600),
                  createCell('In Step Maths (Singapore)', 2600),
                  createCell('Lớp 6A & 6B', 1600),
                  createCell('Giáo trình chuẩn Bộ GD Singapore (CPA Method).\nDrive: https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM', 4226)
                ]
              }),
              new TableRow({
                children: [
                  createCell('04', 600, false, true),
                  createCell('Master Skills Math', 2600, false, true),
                  createCell('Lớp K – 5', 1600, false, true),
                  createCell('Kỹ năng toán toàn diện của Mỹ.\nDrive: https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu', 4226, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('05', 600),
                  createCell('Math Guide G1-G6', 2600),
                  createCell('Lớp 1 – 6', 1600),
                  createCell('Sổ tay phương pháp và chiến lược Singapore.\nDrive: https://drive.google.com/drive/folders/1fuz2THBSHduFAz3gifiNZ61H8ksTzmMS', 4226)
                ]
              }),
              new TableRow({
                children: [
                  createCell('06', 600, false, true),
                  createCell('MATH IN MY WORLD', 2600, false, true),
                  createCell('Lớp 1 – 5', 1600, false, true),
                  createCell('Toán ứng dụng thực tế đời sống quanh em.\nDrive: https://drive.google.com/drive/folders/1fME5VvuiOA3_dVFqNkRMS-drcJJEr8ew', 4226, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('07', 600),
                  createCell('Math Minutes G1-G7', 2600),
                  createCell('Lớp 1 – 7', 1600),
                  createCell('Phản xạ tính nhẩm tốc độ 1 phút mỗi ngày.\nDrive: https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3', 4226)
                ]
              }),
              new TableRow({
                children: [
                  createCell('08', 600, false, true),
                  createCell('OXFORD MATHEMATICS PYP', 2600, false, true),
                  createCell('Lớp K – 6', 1600, false, true),
                  createCell('Toán Tú tài Quốc tế Oxford IB PYP.\nDrive: https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b', 4226, false, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('09', 600),
                  createCell('Singapore Math Challenge', 2600),
                  createCell('Lớp 2 – 5', 1600),
                  createCell('Toán có lời văn nâng cao & Bar Model.\nDrive: https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8', 4226)
                ]
              }),
              new TableRow({
                children: [
                  createCell('10', 600, false, true),
                  createCell('BỘ SÁCH TOÁN SING', 2600, false, true),
                  createCell('Level 1 – 4', 1600, false, true),
                  createCell('Tư duy logic Olympic Toán Singapore.\nDrive: https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM', 4226, false, true)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200 } }),
          pBody([
            new TextRun({
              text: '— HẾT BÁO CÁO GIẢI TRÌNH KHOA HỌC —',
              font: 'Times New Roman',
              size: 22,
              bold: true,
              italics: true,
              color: COLOR_MUTED
            })
          ], { alignment: AlignmentType.CENTER })
        ]
      }
    ]
  });

  const outputPath = path.join(__dirname, 'BAO_CAO_GIAI_TRINH_KHOA_HOC_MATH_AND_LEARN.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated Word document at: ${outputPath} (${buffer.length} bytes)`);
}

generateReportDocx().catch(err => {
  console.error('Error generating document:', err);
  process.exit(1);
});
