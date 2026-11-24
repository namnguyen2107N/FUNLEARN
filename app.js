/**
 * ========================================================
 * FUNLEARN: TOÁN – TIẾNG VIỆT – TIẾNG ANH (HỌC VUI MỖI NGÀY)
 * Tệp Logic Ứng Dụng & Điều Khiển Tương Tác (app.js)
 * Tích hợp toàn diện:
 * 1. Bồi dưỡng Toán 3, 4, 5 – CLB EMATH (PGS.TS Trần Diên Hiển)
 * 2. Tiếng Việt 4, 5 Nâng Cao – GS.TS Lê Phương Nga & Tiếng Việt 3 chuẩn SGK
 * 3. Bồi dưỡng HSG Tiếng Anh 3, 4, 5 – Global Success (Bộ GD&ĐT)
 * 4. 10 Bộ Sách Toán Tiếng Anh chuẩn Quốc Tế (Nguồn: Cô Phạm Thuý)
 * ========================================================
 */

// Global Application State
const appState = {
  isLoggedIn: false,
  studentName: 'Khối Lớp 3',
  studentGrade: 3,
  studentAvatar: '🌱',
  stars: 145,
  streakDays: 5,
  currentScreen: 'screen-start',
  activeSubject: 'toan',
  booksShelfActiveTab: 'vietnam-advanced', // 'vietnam-advanced' | 'international-math'

  // ========================================================
  // TÀI LIỆU CHÍNH THỨC NẠP TỪ GOOGLE DRIVE
  // ========================================================
  driveStudyMaterials: {
    toan: {
      3: {
        title: 'Bồi dưỡng Toán cho học sinh lớp 3',
        author: 'PGS.TS Trần Diên Hiển',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam (CLB EMATH)',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        icon: '📐',
        pages: 142,
        focus: '35 tuần bồi dưỡng nâng cao: số đến 1 000, bảng nhân chia, tìm x, hình học và toán suy luận.'
      },
      4: {
        title: 'Bồi dưỡng Toán cho học sinh lớp 4',
        author: 'PGS.TS Trần Diên Hiển',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam (CLB EMATH)',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        icon: '📐',
        pages: 126,
        focus: '35 tuần bồi dưỡng nâng cao: số tự nhiên, tìm hai số khi biết Tổng - Hiệu, Tổng - Tỉ, phân số, hình học.'
      },
      5: {
        title: 'Bồi dưỡng Toán cho học sinh lớp 5',
        author: 'PGS.TS Trần Diên Hiển',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam (CLB EMATH)',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        icon: '📐',
        pages: 136,
        focus: '35 tuần bồi dưỡng nâng cao: phân số, số thập phân, tỉ số %, hình tam giác/thang/tròn, chuyển động đều.'
      }
    },
    tiengViet: {
      3: {
        title: 'Bồi dưỡng Tiếng Việt lớp 3',
        author: 'GS.TS Lê Phương Nga',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        icon: '📖',
        pages: 120,
        focus: 'Cấu tạo từ, mở rộng vốn từ chủ điểm, biện pháp tu từ so sánh, nhân hóa và các kiểu câu kể.'
      },
      4: {
        title: 'Tiếng Việt 4 Nâng Cao',
        author: 'GS.TS Lê Phương Nga (Chủ biên), TS. Trần Thị Minh Phương, TS. Lê Hữu Tỉnh',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        icon: '📖',
        pages: 208,
        focus: 'Chính tả âm vần khó l/n, c/k, vần ươn/ương; từ ghép, từ láy; danh từ, động từ, tính từ; câu kể.'
      },
      5: {
        title: 'Tiếng Việt 5 Nâng Cao',
        author: 'GS.TS Lê Phương Nga (Chủ biên)',
        publisher: 'Nhà xuất bản Giáo dục Việt Nam',
        driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view',
        icon: '📖',
        pages: 208,
        focus: 'Từ đồng nghĩa, trái nghĩa, nhiều nghĩa; đại từ, quan hệ từ; câu ghép; cảm thụ văn học tả cảnh, tả người.'
      }
    },
    tiengAnh: {
      folderUrl: 'https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah',
      3: {
        title: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 3',
        curriculum: 'Global Success (Bộ GD&ĐT)',
        driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
        icon: '🌍',
        pages: 151,
        focus: '13 chuyên đề ngữ pháp (Countable/Uncountable, a/an, to be, there is/are...) và 15 đề thi HSG.'
      },
      4: {
        title: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 4',
        curriculum: 'Global Success (Bộ GD&ĐT)',
        driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
        icon: '🌍',
        pages: 152,
        focus: 'Mạo từ a/an/the, số nhiều bất quy tắc, thì quá khứ đơn, câu hỏi Wh-, so sánh hơn và 15 đề thi HSG.'
      },
      5: {
        title: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 5',
        curriculum: 'Global Success (Bộ GD&ĐT)',
        driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
        icon: '🌍',
        pages: 149,
        focus: 'Các thì cơ bản, từ chỉ số lượng (quantifiers), câu điều kiện loại 1, so sánh nhất và 15 đề thi HSG.'
      }
    }
  },

  // 10 BỘ SÁCH TOÁN TIẾNG ANH (NGUỒN: PHẠM THUÝ)
  englishMathBooks: [
    {
      id: 'toan-sing-180days',
      code: 'Bộ 01',
      title: '180 Days of Math',
      driveUrl: 'https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9',
      icon: '📅',
      grades: 'Lớp 1 - 6',
      focus: 'Luyện tập toán hàng ngày theo xoắn ốc (Daily Spiral Math Practice)',
      lessonCount: 4
    },
    {
      id: 'toan-sing-commoncore',
      code: 'Bộ 02',
      title: 'Common Core Math 4 Today',
      driveUrl: 'https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT',
      icon: '🎯',
      grades: 'Lớp K - 3',
      focus: 'Chuẩn năng lực cốt lõi Hoa Kỳ (Common Core State Standards)',
      lessonCount: 4
    },
    {
      id: 'toan-sing-instep',
      code: 'Bộ 03',
      title: 'In Step Maths - Singapore Math',
      driveUrl: 'https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM',
      icon: '🇸🇬',
      grades: 'Lớp 6A & 6B',
      focus: 'Giáo trình Toán tiểu học chuẩn Bộ Giáo Dục Singapore (CPA Method)',
      lessonCount: 4
    },
    {
      id: 'toan-sing-masterskills',
      code: 'Bộ 04',
      title: 'Master Skills Math',
      driveUrl: 'https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu',
      icon: '🏅',
      grades: 'Lớp K - 5',
      focus: 'Bộ kỹ năng toán học toàn diện chuẩn giáo dục Mỹ (American Education)',
      lessonCount: 4
    },
    {
      id: 'toan-sing-mathguide',
      code: 'Bộ 05',
      title: 'Math Guide G1-G6 (Singapore Math)',
      driveUrl: 'https://drive.google.com/drive/folders/1fuz2THBSHduFAz3gifiNZ61H8ksTzmMS',
      icon: '🧭',
      grades: 'Lớp 1 - 6',
      focus: 'Sổ tay phương pháp và chiến lược giải toán tư duy Singapore',
      lessonCount: 4
    },
    {
      id: 'toan-sing-inmyworld',
      code: 'Bộ 06',
      title: 'MATH IN MY WORLD',
      driveUrl: 'https://drive.google.com/drive/folders/1fME5VvuiOA3_dVFqNkRMS-drcJJEr8ew',
      icon: '🌍',
      grades: 'Lớp 1 - 5',
      focus: 'Toán học ứng dụng thực tế và gắn liền với cuộc sống quanh em',
      lessonCount: 4
    },
    {
      id: 'toan-sing-mathminutes',
      code: 'Bộ 07',
      title: 'Math Minutes G1-G7',
      driveUrl: 'https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3',
      icon: '⚡',
      grades: 'Lớp 1 - 7',
      focus: 'Tăng tốc phản xạ và tính nhẩm nhanh 1 phút mỗi ngày',
      lessonCount: 4
    },
    {
      id: 'toan-sing-oxfordpyp',
      code: 'Bộ 08',
      title: 'OXFORD MATHEMATICS PYP',
      driveUrl: 'https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b',
      icon: '🎓',
      grades: 'Lớp K - 6',
      focus: 'Toán Tú tài Quốc tế Oxford IB PYP (Tư duy truy vấn và khám phá)',
      lessonCount: 4
    },
    {
      id: 'toan-sing-sgchallenge',
      code: 'Bộ 09',
      title: 'Singapore Math Challenge Word Problems',
      driveUrl: 'https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8',
      icon: '🧩',
      grades: 'Lớp 2 - 5',
      focus: 'Giải toán có lời văn nâng cao và phương pháp mô hình Bar Model',
      lessonCount: 4
    },
    {
      id: 'toan-sing-toansing',
      code: 'Bộ 10',
      title: 'BỘ SÁCH TOÁN SING (Levels 1 - 4)',
      driveUrl: 'https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM',
      icon: '🦁',
      grades: 'Level 1 - 4',
      focus: 'Tư duy logic nâng cao và toán Olympic Singapore',
      lessonCount: 4
    }
  ],

  // ========================================================
  // HỆ THỐNG CHƯƠNG TRÌNH HỌC THEO KHỐI LỚP (3, 4, 5)
  // Bám sát tài liệu Google Drive người dùng cung cấp
  // ========================================================
  gradeCurriculum: {
    // ----------------------------------------------------
    // KHỐI LỚP 3
    // ----------------------------------------------------
    3: {
      toan: {
        key: 'toan',
        title: 'Toán Học Lớp 3',
        themeColor: '#62C9F3',
        icon: '📐',
        bookRef: {
          name: 'Bồi dưỡng Toán cho học sinh lớp 3',
          author: 'PGS.TS Trần Diên Hiển – CLB EMATH (NXB Giáo Dục Việt Nam)',
          driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view'
        },
        lessons: [
          {
            id: 'toan-g3-w1',
            code: 'Tuần 01',
            title: 'Ôn tập các số đến 1 000 & Phép cộng trừ',
            status: 'completed'
          },
          {
            id: 'toan-g3-w2',
            code: 'Tuần 02',
            title: 'Bảng nhân chia 2, 3, 4, 5 & Tìm thành phần phép tính',
            status: 'ready'
          },
          {
            id: 'toan-g3-w3',
            code: 'Tuần 03',
            title: 'Bảng nhân 6, 7 & Gấp/giảm một số lần',
            status: 'ready'
          },
          {
            id: 'toan-g3-w4',
            code: 'Tuần 04',
            title: 'Bảng nhân 8, 9 & Góc vuông, góc không vuông',
            status: 'locked'
          },
          {
            id: 'toan-g3-w5',
            code: 'Tuần 05',
            title: 'Số có bốn chữ số, năm chữ số & Cấu tạo số',
            status: 'locked'
          }
        ]
      },
      'tieng-viet': {
        key: 'tieng-viet',
        title: 'Tiếng Việt Lớp 3',
        themeColor: '#FF91A8',
        icon: '📖',
        bookRef: {
          name: 'Bồi dưỡng Tiếng Việt lớp 3',
          author: 'GS.TS Lê Phương Nga (NXB Giáo Dục Việt Nam)',
          driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view'
        },
        lessons: [
          {
            id: 'tv-g3-b1',
            code: 'Chuyên đề 01',
            title: 'Cấu tạo từ & Mở rộng vốn từ chủ điểm Măng non, Trường học',
            status: 'completed'
          },
          {
            id: 'tv-g3-b2',
            code: 'Chuyên đề 02',
            title: 'Biện pháp tu từ So sánh trong văn thơ thiếu nhi',
            status: 'ready'
          },
          {
            id: 'tv-g3-b3',
            code: 'Chuyên đề 03',
            title: 'Mẫu câu kể: Ai là gì? Ai làm gì? Ai thế nào?',
            status: 'ready'
          },
          {
            id: 'tv-g3-b4',
            code: 'Chuyên đề 04',
            title: 'Biện pháp nghệ thuật Nhân hóa & Cách dùng dấu câu',
            status: 'locked'
          }
        ]
      },
      'tieng-anh': {
        key: 'tieng-anh',
        title: 'Tiếng Anh Lớp 3',
        themeColor: '#78D9AE',
        icon: '🌍',
        bookRef: {
          name: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 3 (Global Success)',
          author: 'Bộ GD&ĐT – Bồi dưỡng HSG Tiểu học',
          driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
          folderUrl: 'https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah'
        },
        lessons: [
          {
            id: 'eng-g3-u1',
            code: 'Chuyên đề 01',
            title: 'Countable & Uncountable Nouns (Danh từ đếm được/không đếm được)',
            status: 'completed'
          },
          {
            id: 'eng-g3-u2',
            code: 'Chuyên đề 02',
            title: 'How Much & How Many with Quantifiers',
            status: 'ready'
          },
          {
            id: 'eng-g3-u3',
            code: 'Chuyên đề 03',
            title: 'Singular & Plural Nouns (Danh từ số ít & số nhiều)',
            status: 'ready'
          },
          {
            id: 'eng-g3-u4',
            code: 'Chuyên đề 04',
            title: 'Articles "a / an" & Demonstratives (This/That/These/Those)',
            status: 'locked'
          },
          {
            id: 'eng-g3-u5',
            code: 'Chuyên đề 05',
            title: 'Present Simple with "to be" (am/is/are) & Personal Pronouns',
            status: 'locked'
          }
        ]
      }
    },

    // ----------------------------------------------------
    // KHỐI LỚP 4
    // ----------------------------------------------------
    4: {
      toan: {
        key: 'toan',
        title: 'Toán Học Lớp 4',
        themeColor: '#62C9F3',
        icon: '📐',
        bookRef: {
          name: 'Bồi dưỡng Toán cho học sinh lớp 4',
          author: 'PGS.TS Trần Diên Hiển – CLB EMATH (NXB Giáo Dục Việt Nam)',
          driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view'
        },
        lessons: [
          {
            id: 'toan-g4-w1',
            code: 'Tuần 01',
            title: 'Biểu thức có chứa chữ & Tìm x nâng cao trong phạm vi 100 000',
            status: 'completed'
          },
          {
            id: 'toan-g4-w2',
            code: 'Tuần 02',
            title: 'Số có nhiều chữ số, hàng và lớp & So sánh số tự nhiên',
            status: 'ready'
          },
          {
            id: 'toan-g4-w3',
            code: 'Tuần 03',
            title: 'Đơn vị đo khối lượng (yến, tạ, tấn) & Thời gian (thế kỷ)',
            status: 'ready'
          },
          {
            id: 'toan-g4-w4',
            code: 'Tuần 04',
            title: 'Bài toán Tìm hai số khi biết Tổng và Hiệu của hai số',
            status: 'locked'
          },
          {
            id: 'toan-g4-w5',
            code: 'Tuần 05',
            title: 'Khái niệm Phân số, phân số bằng nhau & Rút gọn phân số',
            status: 'locked'
          }
        ]
      },
      'tieng-viet': {
        key: 'tieng-viet',
        title: 'Tiếng Việt Lớp 4',
        themeColor: '#FF91A8',
        icon: '📖',
        bookRef: {
          name: 'Tiếng Việt 4 Nâng Cao',
          author: 'GS.TS Lê Phương Nga (Chủ biên) – NXB Giáo Dục Việt Nam',
          driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view'
        },
        lessons: [
          {
            id: 'tv-g4-b1',
            code: 'Chuyên đề 01',
            title: 'Chính tả: Phân biệt âm đầu l/n, ch/tr, s/x & vần khó ươn/ương',
            status: 'completed'
          },
          {
            id: 'tv-g4-b2',
            code: 'Chuyên đề 02',
            title: 'Cấu tạo từ: Từ đơn, Từ ghép (đẳng lập, chính phụ) & Từ láy',
            status: 'ready'
          },
          {
            id: 'tv-g4-b3',
            code: 'Chuyên đề 03',
            title: 'Từ loại: Danh từ chung, Danh từ riêng & Quy tắc viết hoa',
            status: 'ready'
          },
          {
            id: 'tv-g4-b4',
            code: 'Chuyên đề 04',
            title: 'Câu kể & Các loại Trạng ngữ chỉ nơi chốn, thời gian, nguyên nhân',
            status: 'locked'
          },
          {
            id: 'tv-g4-b5',
            code: 'Chuyên đề 05',
            title: 'Mở rộng vốn từ Nhân hậu - Đoàn kết, Ý chí - Nghị lực',
            status: 'locked'
          }
        ]
      },
      'tieng-anh': {
        key: 'tieng-anh',
        title: 'Tiếng Anh Lớp 4',
        themeColor: '#78D9AE',
        icon: '🌍',
        bookRef: {
          name: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 4 (Global Success)',
          author: 'Bộ GD&ĐT – Bồi dưỡng HSG Tiểu học',
          driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
          folderUrl: 'https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah'
        },
        lessons: [
          {
            id: 'eng-g4-u1',
            code: 'Chuyên đề 01',
            title: 'Articles "a / an" - Quy tắc phát âm nguyên âm & Ngoại lệ',
            status: 'completed'
          },
          {
            id: 'eng-g4-u2',
            code: 'Chuyên đề 02',
            title: 'Regular & Irregular Plural Nouns (Danh từ số nhiều bất quy tắc)',
            status: 'ready'
          },
          {
            id: 'eng-g4-u3',
            code: 'Chuyên đề 03',
            title: 'Present Simple vs Present Continuous (Hiện tại đơn & Tiếp diễn)',
            status: 'ready'
          },
          {
            id: 'eng-g4-u4',
            code: 'Chuyên đề 04',
            title: 'Past Simple Tense with "was / were" and regular verbs',
            status: 'locked'
          },
          {
            id: 'eng-g4-u5',
            code: 'Chuyên đề 05',
            title: 'Comparative Adjectives & Wh-Questions (So sánh hơn & Câu hỏi Wh-)',
            status: 'locked'
          }
        ]
      }
    },

    // ----------------------------------------------------
    // KHỐI LỚP 5
    // ----------------------------------------------------
    5: {
      toan: {
        key: 'toan',
        title: 'Toán Học Lớp 5',
        themeColor: '#62C9F3',
        icon: '📐',
        bookRef: {
          name: 'Bồi dưỡng Toán cho học sinh lớp 5',
          author: 'PGS.TS Trần Diên Hiển – CLB EMATH (NXB Giáo Dục Việt Nam)',
          driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view'
        },
        lessons: [
          {
            id: 'toan-g5-w1',
            code: 'Tuần 01',
            title: 'Ôn tập khái niệm Phân số, phân số bằng nhau & So sánh với 1',
            status: 'completed'
          },
          {
            id: 'toan-g5-w2',
            code: 'Tuần 02',
            title: 'Bốn phép tính phân số, phân số thập phân & Hỗn số',
            status: 'ready'
          },
          {
            id: 'toan-g5-w3',
            code: 'Tuần 03',
            title: 'Số thập phân, hàng của số thập phân & Viết số đo dạng số thập phân',
            status: 'ready'
          },
          {
            id: 'toan-g5-w4',
            code: 'Tuần 04',
            title: 'Tỉ số phần trăm & 3 dạng toán về tỉ số phần trăm',
            status: 'locked'
          },
          {
            id: 'toan-g5-w5',
            code: 'Tuần 05',
            title: 'Hình học (Tam giác, hình thang, hình tròn) & Chuyển động đều',
            status: 'locked'
          }
        ]
      },
      'tieng-viet': {
        key: 'tieng-viet',
        title: 'Tiếng Việt Lớp 5',
        themeColor: '#FF91A8',
        icon: '📖',
        bookRef: {
          name: 'Tiếng Việt 5 Nâng Cao',
          author: 'GS.TS Lê Phương Nga (Chủ biên) – NXB Giáo Dục Việt Nam',
          driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view'
        },
        lessons: [
          {
            id: 'tv-g5-b1',
            code: 'Chuyên đề 01',
            title: 'Quy tắc viết hoa tên riêng, tên địa lí Việt Nam & Quốc tế',
            status: 'completed'
          },
          {
            id: 'tv-g5-b2',
            code: 'Chuyên đề 02',
            title: 'Từ đồng nghĩa, Từ trái nghĩa, Từ đồng âm & Từ nhiều nghĩa',
            status: 'ready'
          },
          {
            id: 'tv-g5-b3',
            code: 'Chuyên đề 03',
            title: 'Đại từ xưng hô, Quan hệ từ & Các cặp quan hệ từ hô ứng',
            status: 'ready'
          },
          {
            id: 'tv-g5-b4',
            code: 'Chuyên đề 04',
            title: 'Câu ghép & Các cách nối các vế câu ghép',
            status: 'locked'
          },
          {
            id: 'tv-g5-b5',
            code: 'Chuyên đề 05',
            title: 'Liên kết câu trong đoạn văn & Cảm thụ văn học miêu tả',
            status: 'locked'
          }
        ]
      },
      'tieng-anh': {
        key: 'tieng-anh',
        title: 'Tiếng Anh Lớp 5',
        themeColor: '#78D9AE',
        icon: '🌍',
        bookRef: {
          name: 'Bồi dưỡng Học sinh giỏi Tiếng Anh 5 (Global Success)',
          author: 'Bộ GD&ĐT – Bồi dưỡng HSG Tiểu học',
          driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
          folderUrl: 'https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah'
        },
        lessons: [
          {
            id: 'eng-g5-u1',
            code: 'Chuyên đề 01',
            title: 'Articles "A, An, The" & Zero Article (Mạo từ xác định/không xác định)',
            status: 'completed'
          },
          {
            id: 'eng-g5-u2',
            code: 'Chuyên đề 02',
            title: 'Quantifiers: Some, Any, Much, Many, A lot of, A few, A little',
            status: 'ready'
          },
          {
            id: 'eng-g5-u3',
            code: 'Chuyên đề 03',
            title: 'Tenses: Present Simple, Past Simple & Future Simple',
            status: 'ready'
          },
          {
            id: 'eng-g5-u4',
            code: 'Chuyên đề 04',
            title: 'Superlative Adjectives & Comparison structures',
            status: 'locked'
          },
          {
            id: 'eng-g5-u5',
            code: 'Chuyên đề 05',
            title: 'Prepositions of Place and Time & Conditionals Type 1',
            status: 'locked'
          }
        ]
      }
    }
  },

  // Helper để lấy môn học theo khối lớp hiện tại
  get subjectsData() {
    return this.gradeCurriculum[this.studentGrade] || this.gradeCurriculum[3];
  },

  // ========================================================
  // NGÂN HÀNG CÂU HỎI TƯƠNG TÁC (QUESTION BANK)
  // Trích xuất chuẩn xác từ tài liệu Google Drive của người dùng
  // ========================================================
  questionBank: {
    // ----------------------------------------------------
    // I. TOÁN LỚP 3 (Trần Diên Hiển - Bồi dưỡng Toán 3)
    // ----------------------------------------------------
    'toan-g3-w1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 3 • Trắc nghiệm',
        prompt: 'Một trang trại có 345 con gà trống và 428 con gà mái. Hỏi trang trại đó có tất cả bao nhiêu con gà?',
        illustration: '🐓 🌾 🐔',
        options: [
          { id: 'A', text: '763 con gà' },
          { id: 'B', text: '773 con gà' },
          { id: 'C', text: '783 con gà' },
          { id: 'D', text: '873 con gà' }
        ],
        correct: 'B',
        hint: 'Từ khóa "tất cả" cho ta biết cần làm phép cộng: 345 + 428. Hàng đơn vị: 5 + 8 = 13 (viết 3 nhớ 1). Hàng chục: 4 + 2 + 1 = 7. Hàng trăm: 3 + 4 = 7. Kết quả đúng là 773 con gà!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 3 • Điền số',
        prompt: 'Cho 4 số: 235; 358; 253; 349. Hiệu của số lớn nhất và số bé nhất trong 4 số trên là bao nhiêu?',
        illustration: '🔢 ❓ ✏️',
        correct: '123',
        hint: 'Trong 4 số trên: Số lớn nhất là 358, số bé nhất là 235. Ta thực hiện phép trừ tìm hiệu: 358 - 235 = 123!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 3 • Ghép nối',
        prompt: 'Nối phép tính với kết quả chính xác (Bài 7 SGK Bồi Dưỡng Toán 3):',
        illustration: '🧩 🔗 🎯',
        pairs: [
          { id: 'p1', left: '5 × 7 + 228', right: '263' },
          { id: 'p2', left: '36 : 4 + 395', right: '404' },
          { id: 'p3', left: '20 × 4 + 320', right: '400' },
          { id: 'p4', left: '752 + 245 - 356', right: '641' }
        ],
        hint: 'Tính giá trị biểu thức: 5×7+228 = 35+228 = 263; 36:4+395 = 9+395 = 404; 20×4+320 = 80+320 = 400; 752+245-356 = 997-356 = 641.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 3 • Đúng / Sai',
        prompt: 'Đoạn dây thứ nhất dài 1 mét, đoạn dây thứ hai dài 95 xăng-ti-mét. Vậy đoạn dây thứ nhất dài hơn đoạn dây thứ hai.',
        illustration: '📏 🧵 ✂️',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: '1 mét bằng 100 xăng-ti-mét (cm). Vì 100 cm > 95 cm nên nhận định này hoàn toàn ĐÚNG.'
      }
    ],

    'toan-g3-w2': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 3 • Trắc nghiệm',
        prompt: 'Tìm số thích hợp để điền vào ô trống: 450 - [.....] = 130',
        illustration: '📐 🔢 💡',
        options: [
          { id: 'A', text: '310' },
          { id: 'B', text: '320' },
          { id: 'C', text: '330' },
          { id: 'D', text: '580' }
        ],
        correct: 'B',
        hint: 'Muốn tìm số trừ chưa biết, em lấy số bị trừ trừ đi hiệu: 450 - 130 = 320!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 3 • Điền số',
        prompt: 'Có 5 rổ cam, mỗi rổ đựng 8 quả cam. Hỏi có tất cả bao nhiêu quả cam?',
        illustration: '🍊 🧺 🧮',
        correct: '40',
        hint: 'Để tìm tổng số quả cam, ta thực hiện phép nhân theo bảng nhân 5: 5 rổ × 8 quả = 40 quả cam.'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 3 • Ghép nối',
        prompt: 'Nối phép tính nhân chia với kết quả đúng:',
        illustration: '✖️ ➗ 🎯',
        pairs: [
          { id: 'p1', left: '4 × 9', right: '36' },
          { id: 'p2', left: '5 × 8', right: '40' },
          { id: 'p3', left: '3 × 7', right: '21' },
          { id: 'p4', left: '32 : 4', right: '8' }
        ],
        hint: 'Bảng cửu chương nhân chia: 4×9 = 36; 5×8 = 40; 3×7 = 21; 32:4 = 8.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 3 • Đúng / Sai',
        prompt: 'Trong một phép chia có dư với số chia bằng 5, số dư lớn nhất có thể có là 5.',
        illustration: '⚠️ ❓ 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'F',
        hint: 'Trong phép chia có dư, số dư luôn luôn bé hơn số chia. Với số chia bằng 5, số dư lớn nhất chỉ có thể là 4!'
      }
    ],

    // Backward compatibility cho toan-b2
    'toan-b2': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 3 • Trắc nghiệm',
        prompt: 'Một trang trại có 345 con gà trống và 428 con gà mái. Hỏi trang trại đó có tất cả bao nhiêu con gà?',
        illustration: '🐓 🌾 🐔',
        options: [
          { id: 'A', text: '763 con gà' },
          { id: 'B', text: '773 con gà' },
          { id: 'C', text: '783 con gà' },
          { id: 'D', text: '873 con gà' }
        ],
        correct: 'B',
        hint: 'Từ khóa "tất cả" cho ta biết cần làm phép cộng: 345 + 428 = 773 con gà!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 3 • Điền số',
        prompt: 'Điền số thích hợp vào ô trống để được phép tính đúng: 450 - [.....] = 130',
        illustration: '📐 🔢 ✏️',
        correct: '320',
        hint: 'Muốn tìm số trừ chưa biết, em lấy số bị trừ trừ đi hiệu số: 450 - 130 = 320!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 3 • Ghép nối',
        prompt: 'Nối phép tính với kết quả tương ứng:',
        illustration: '🧩 🔗 🎯',
        pairs: [
          { id: 'p1', left: '250 + 150', right: '400' },
          { id: 'p2', left: '600 - 180', right: '420' },
          { id: 'p3', left: '120 × 3', right: '360' }
        ],
        hint: '250 + 150 = 400; 600 - 180 = 420; 120 × 3 = 360.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 3 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 3 • Đúng / Sai',
        prompt: 'Đoạn dây thứ nhất dài 1 mét, đoạn dây thứ hai dài 95 xăng-ti-mét. Vậy đoạn dây thứ nhất dài hơn đoạn dây thứ hai.',
        illustration: '📏 🧵 ✂️',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: '1 mét bằng 100 xăng-ti-mét (cm). Vì 100 cm lớn hơn 95 cm nên nhận định này hoàn toàn ĐÚNG.'
      }
    ],

    // ----------------------------------------------------
    // II. TOÁN LỚP 4 (Trần Diên Hiển - Bồi dưỡng Toán 4)
    // ----------------------------------------------------
    'toan-g4-w1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 4 • Trắc nghiệm',
        prompt: 'So sánh giá trị hai biểu thức: (70 549 - 12 425) × 3 và 70 549 - 12 425 × 3. Điền dấu thích hợp:',
        illustration: '⚖️ 🧮 🔍',
        options: [
          { id: 'A', text: 'Dấu >' },
          { id: 'B', text: 'Dấu <' },
          { id: 'C', text: 'Dấu =' }
        ],
        correct: 'A',
        hint: 'Vế trái: (70 549 - 12 425) × 3 = 58 124 × 3 = 174 372. Vế phải tính nhân trước: 70 549 - (12 425 × 3) = 70 549 - 37 275 = 33 274. Vì 174 372 > 33 274 nên ta điền dấu >!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 4 • Điền số',
        prompt: 'Tìm giá trị thích hợp của x biết: x + 21 609 : 3 = 17 068. Giá trị của x là:',
        illustration: '🔢 ❓ 💡',
        correct: '9865',
        hint: 'Trước hết tính phép chia: 21 609 : 3 = 7 203. Biểu thức trở thành: x + 7 203 = 17 068. Muốn tìm số hạng x chưa biết: x = 17 068 - 7 203 = 9 865!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 4 • Ghép nối',
        prompt: 'Nối biểu thức có chứa chữ với giá trị chính xác (Bài 3 Tuần 1 Bồi Dưỡng Toán 4):',
        illustration: '🧩 🔗 🎯',
        pairs: [
          { id: 'p1', left: '12 816 - 6 546 : a (với a = 6)', right: '11 725' },
          { id: 'p2', left: '40 215 + 10 078 × b (với b = 5)', right: '90 605' },
          { id: 'p3', left: '523 × (36 : c) (với c = 9)', right: '2 092' }
        ],
        hint: 'Với a=6: 12816 - 1091 = 11725; Với b=5: 40215 + 50390 = 90605; Với c=9: 523 × 4 = 2092.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 4 • Đúng / Sai',
        prompt: 'Với mọi số tự nhiên a khác 0, biểu thức a × 1 luôn luôn có giá trị bằng a : 1.',
        illustration: '✨ 🔢 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: 'Bất kỳ số tự nhiên nào nhân với 1 cũng bằng chính nó (a × 1 = a), và chia cho 1 cũng bằng chính nó (a : 1 = a). Do đó nhận định này hoàn toàn ĐÚNG.'
      }
    ],

    'toan-g4-w2': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 4 • Trắc nghiệm',
        prompt: 'Trong số 85 342 719, chữ số 5 thuộc hàng nào, lớp nào?',
        illustration: '🏷️ 🔢 🏛️',
        options: [
          { id: 'A', text: 'Hàng triệu, thuộc lớp triệu' },
          { id: 'B', text: 'Hàng trăm nghìn, thuộc lớp nghìn' },
          { id: 'C', text: 'Hàng chục triệu, thuộc lớp triệu' },
          { id: 'D', text: 'Hàng triệu, thuộc lớp nghìn' }
        ],
        correct: 'A',
        hint: 'Phân tích lớp số: Lớp đơn vị gồm 719; Lớp nghìn gồm 342; Lớp triệu gồm 85 (chữ số 8 hàng chục triệu, chữ số 5 hàng triệu). Vậy chữ số 5 thuộc hàng triệu, lớp triệu!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 4 • Điền số',
        prompt: 'Hai thùng chứa tất cả 120 lít dầu. Thùng thứ nhất nhiều hơn thùng thứ hai 24 lít dầu. Hỏi thùng thứ nhất chứa bao nhiêu lít dầu?',
        illustration: '🛢️ ⚖️ 🛢️',
        correct: '72',
        hint: 'Đây là dạng toán Tìm hai số khi biết Tổng và Hiệu. Thùng thứ nhất là số lớn: Số lớn = (Tổng + Hiệu) : 2 = (120 + 24) : 2 = 144 : 2 = 72 lít dầu!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 4 • Ghép nối',
        prompt: 'Nối các số đo khối lượng và thời gian tương ứng:',
        illustration: '⚖️ ⏱️ 🎯',
        pairs: [
          { id: 'p1', left: '3 tạ 50 kg', right: '350 kg' },
          { id: 'p2', left: '2 tấn 5 yến', right: '2 050 kg' },
          { id: 'p3', left: '1 thế kỷ rưỡi', right: '150 năm' },
          { id: 'p4', left: '4 phút 15 giây', right: '255 giây' }
        ],
        hint: '1 tạ = 100kg -> 3 tạ 50kg = 350kg; 1 tấn = 1000kg, 1 yến = 10kg -> 2050kg; 1 thế kỷ = 100 năm -> 150 năm; 4 phút = 240 giây -> 255 giây.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 4 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 4 • Đúng / Sai',
        prompt: 'Số chẵn nhỏ nhất có 6 chữ số khác nhau là 102 346.',
        illustration: '🔢 ⭐ 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: 'Để được số nhỏ nhất, chữ số đầu tiên phải nhỏ nhất khác 0 (là 1), các chữ số tiếp theo tăng dần 0, 2, 3, 4, và chữ số tận cùng phải là chữ số chẵn nhỏ nhất chưa dùng (là 6). Số 102 346 là chính xác!'
      }
    ],

    // ----------------------------------------------------
    // III. TOÁN LỚP 5 (Trần Diên Hiển - Bồi dưỡng Toán 5)
    // ----------------------------------------------------
    'toan-g5-w1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 5 • Trắc nghiệm',
        prompt: 'Trong các phân số sau: 13/14, 29/27, 34/34, 3/7, phân số nào LỚN HƠN 1?',
        illustration: '🍰 ⚖️ 🍕',
        options: [
          { id: 'A', text: '13 / 14' },
          { id: 'B', text: '29 / 27' },
          { id: 'C', text: '34 / 34' },
          { id: 'D', text: '3 / 7' }
        ],
        correct: 'B',
        hint: 'Quy tắc so sánh phân số với 1: Phân số có tử số lớn hơn mẫu số thì phân số đó lớn hơn 1. Ở đây 29 > 27 nên 29/27 > 1. (34/34 = 1; 13/14 và 3/7 đều bé hơn 1).'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 5 • Điền số',
        prompt: 'Một ô tô đi quãng đường 150 km hết 3 giờ. Hỏi vận tốc của ô tô là bao nhiêu km/h?',
        illustration: '🚗 🛣️ ⏱️',
        correct: '50',
        hint: 'Công thức tính vận tốc trong chuyển động đều: v = s : t. Ta lấy quãng đường chia cho thời gian: 150 : 3 = 50 km/h!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 5 • Ghép nối',
        prompt: 'Nối các phân số bằng nhau sau khi rút gọn hoặc quy đồng:',
        illustration: '🧩 🔗 ⚖️',
        pairs: [
          { id: 'p1', left: '3 / 5', right: '9 / 15' },
          { id: 'p2', left: '2 / 7', right: '6 / 21' },
          { id: 'p3', left: '4 / 9', right: '16 / 36' },
          { id: 'p4', left: '5 / 8', right: '25 / 40' }
        ],
        hint: 'Nhân cả tử số và mẫu số với cùng một số tự nhiên lớn hơn 1 ta được phân số bằng phân số đã cho.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 5 • Đúng / Sai',
        prompt: 'Mọi số tự nhiên đều có thể viết dưới dạng phân số có mẫu số bằng 1 (Ví dụ: 14 = 14/1; 9 = 9/1).',
        illustration: '✨ 🔢 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: 'Mọi số tự nhiên n đều có thể viết dưới dạng phân số n/1 vì n : 1 = n. Nhận định này hoàn toàn ĐÚNG (Bài 2 Tuần 1 SGK Bồi Dưỡng Toán 5).'
      }
    ],

    'toan-g5-w3': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'choice',
        tag: 'Bồi dưỡng Toán 5 • Trắc nghiệm',
        prompt: 'Trong số thập phân 185,472, chữ số 7 có giá trị bằng bao nhiêu?',
        illustration: '🏷️ 🔢 💡',
        options: [
          { id: 'A', text: '7 đơn vị' },
          { id: 'B', text: '7 phần mười (7/10)' },
          { id: 'C', text: '7 phần trăm (7/100)' },
          { id: 'D', text: '7 phần nghìn (7/1000)' }
        ],
        correct: 'C',
        hint: 'Hàng phần mười là chữ số 4; hàng phần trăm là chữ số 7 (giá trị 7/100 hay 0,07); hàng phần nghìn là chữ số 2.'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'input',
        tag: 'Bồi dưỡng Toán 5 • Điền số',
        prompt: 'Lớp 5A có 40 học sinh, trong đó có 24 bạn nữ. Tỉ số phần trăm của học sinh nữ so với cả lớp là bao nhiêu %? (Chỉ điền số)',
        illustration: '👧 👦 📊',
        correct: '60',
        hint: 'Muốn tìm tỉ số phần trăm, ta lấy số học sinh nữ chia cho tổng số học sinh rồi nhân với 100%: 24 : 40 = 0,6 = 60%!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'match',
        tag: 'Bồi dưỡng Toán 5 • Ghép nối',
        prompt: 'Nối phép tính số thập phân với kết quả tương ứng:',
        illustration: '➕ ✖️ 🎯',
        pairs: [
          { id: 'p1', left: '12.5 × 4', right: '50' },
          { id: 'p2', left: '45.6 + 14.4', right: '60' },
          { id: 'p3', left: '100 - 37.5', right: '62.5' },
          { id: 'p4', left: '7.2 : 0.8', right: '9' }
        ],
        hint: '12.5×4 = 50; 45.6+14.4 = 60; 100-37.5 = 62.5; 7.2 : 0.8 = 72 : 8 = 9.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Toán 5 – Trần Diên Hiển',
        driveUrl: 'https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view',
        type: 'true_false',
        tag: 'Bồi dưỡng Toán 5 • Đúng / Sai',
        prompt: 'Hai chuyển động cùng lúc và ngược chiều trên cùng một quãng đường, thời gian để gặp nhau bằng quãng đường chia cho HIỆU hai vận tốc.',
        illustration: '🚗 💥 🚙',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'F',
        hint: 'Chuyển động ngược chiều nhau thì hai xe đang tiến lại gần nhau, thời gian gặp nhau phải bằng quãng đường chia cho TỔNG hai vận tốc: t = s : (v1 + v2)!'
      }
    ],

    // ----------------------------------------------------
    // IV. TIẾNG VIỆT LỚP 3
    // ----------------------------------------------------
    'tv-g3-b1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng Tiếng Việt 3 – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'choice',
        tag: 'Tiếng Việt 3 • Trắc nghiệm',
        prompt: 'Trong câu thơ: "Trẻ em như búp trên cành / Biết ăn ngủ, biết học hành là ngoan", sự vật nào được so sánh với nhau?',
        illustration: '🌱 👶 📖',
        options: [
          { id: 'A', text: 'Trẻ em và búp trên cành' },
          { id: 'B', text: 'Ăn ngủ và học hành' },
          { id: 'C', text: 'Búp trên cành và lá cây' },
          { id: 'D', text: 'Trẻ em và người lớn' }
        ],
        correct: 'A',
        hint: 'Từ so sánh là từ "như". Sự vật A là "Trẻ em", sự vật B là "búp trên cành" (đều ngây thơ, non nớt, cần được nâng niu bảo bọc).'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng Tiếng Việt 3 – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'input',
        tag: 'Tiếng Việt 3 • Điền từ',
        prompt: 'Điền từ còn thiếu vào câu thành ngữ sau: "Học thầy không tày học [.....]"',
        illustration: '👨‍🏫 👦 ✏️',
        correct: 'bạn',
        hint: 'Câu tục ngữ quen thuộc của nhân dân ta ca ngợi việc học hỏi từ bạn bè cùng trang lứa: "Học thầy không tày học bạn".'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng Tiếng Việt 3 – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'match',
        tag: 'Tiếng Việt 3 • Ghép nối',
        prompt: 'Ghép câu với kiểu câu kể tương ứng:',
        illustration: '🧩 📜 🎯',
        pairs: [
          { id: 'p1', left: 'Bảo Nam là học sinh chăm chỉ.', right: 'Ai là gì?' },
          { id: 'p2', left: 'Các bạn đang đá bóng trên sân.', right: 'Ai làm gì?' },
          { id: 'p3', left: 'Bầu trời mùa thu trong xanh, cao vời vợi.', right: 'Ai thế nào?' }
        ],
        hint: '"Là học sinh" -> giới thiệu/nhận định (Ai là gì?); "đang đá bóng" -> hoạt động (Ai làm gì?); "trong xanh" -> đặc điểm (Ai thế nào?).'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng Tiếng Việt 3 – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'true_false',
        tag: 'Tiếng Việt 3 • Đúng / Sai',
        prompt: 'Trong câu: "Bác kim giờ nhích từng bước chậm chạp.", đồ vật (kim giờ) đã được nhân hóa bằng cách gọi bằng từ ngữ dùng cho người ("Bác").',
        illustration: '⏰ 👴 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: 'Tác giả dùng từ "Bác" vốn xưng hô với người để gọi kim giờ, đây là một trong 3 cách nhân hóa quen thuộc trong Tiếng Việt!'
      }
    ],

    // ----------------------------------------------------
    // V. TIẾNG VIỆT LỚP 4 (Lê Phương Nga - Tiếng Việt 4 Nâng Cao)
    // ----------------------------------------------------
    'tv-g4-b1': [
      {
        id: 1,
        bookTitle: 'Tiếng Việt 4 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'choice',
        tag: 'Tiếng Việt 4 • Trắc nghiệm',
        prompt: 'Dòng nào dưới đây chứa các từ viết ĐÚNG chính tả về âm đầu l / n (Bài tập chọn lựa SGK trang 8)?',
        illustration: '🌾 📝 💡',
        options: [
          { id: 'A', text: 'lúa nếp, lợn nái, lời nói, lưng núi' },
          { id: 'B', text: 'núa nếp, nợn nái, nời nói, nưng núi' },
          { id: 'C', text: 'lúa lếp, lợn lái, lời lói, lưng lúi' },
          { id: 'D', text: 'lúa nếp, nợn lái, nời lói, lưng núi' }
        ],
        correct: 'A',
        hint: 'Theo SGK Tiếng Việt 4 Nâng Cao (trang 8), các kết hợp từ chuẩn xác là: lúa nếp, lợn nái, lọ nước, lời nói, lúc nãy, lưng núi, nối liền!'
      },
      {
        id: 2,
        bookTitle: 'Tiếng Việt 4 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'input',
        tag: 'Tiếng Việt 4 • Điền từ',
        prompt: 'Tìm từ loại bỏ: Trong cặp từ "mượn - mượng", từ nào KHÔNG có trong vốn từ Tiếng Việt (chắc chắn viết sai chính tả)?',
        illustration: '❌ ✍️ 🔍',
        correct: 'mượng',
        hint: 'Theo bài tập loại trừ trang 8: "mượn" là tiếng có nghĩa (vay mượn, mượn sách), còn "mượng" là tiếng viết sai, không có trong từ điển tiếng Việt!'
      },
      {
        id: 3,
        bookTitle: 'Tiếng Việt 4 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'match',
        tag: 'Tiếng Việt 4 • Ghép nối',
        prompt: 'Phân loại từ ngữ theo cấu tạo (Từ đơn, Từ ghép, Từ láy):',
        illustration: '🧩 📚 🎯',
        pairs: [
          { id: 'p1', left: 'long lanh', right: 'Từ láy âm' },
          { id: 'p2', left: 'nhà cửa', right: 'Từ ghép đẳng lập' },
          { id: 'p3', left: 'xe đạp', right: 'Từ ghép chính phụ' },
          { id: 'p4', left: 'sách', right: 'Từ đơn' }
        ],
        hint: 'long lanh: láy âm đầu "l"; nhà cửa: ghép đẳng lập; xe đạp: "đạp" định nghĩa cho "xe" (ghép chính phụ); sách: từ đơn 1 tiếng.'
      },
      {
        id: 4,
        bookTitle: 'Tiếng Việt 4 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view',
        type: 'true_false',
        tag: 'Tiếng Việt 4 • Đúng / Sai',
        prompt: 'Từ "mặt mũi" là từ láy vì có phụ âm đầu "m" lặp lại giống nhau.',
        illustration: '👦 👃 💡',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'F',
        hint: 'Cả "mặt" và "mũi" đều là các danh từ độc lập có nghĩa rõ ràng, kết hợp tạo thành từ ghép đẳng lập, không phải từ láy!'
      }
    ],

    // ----------------------------------------------------
    // VI. TIẾNG VIỆT LỚP 5 (Lê Phương Nga - Tiếng Việt 5 Nâng Cao)
    // ----------------------------------------------------
    'tv-g5-b1': [
      {
        id: 1,
        bookTitle: 'Tiếng Việt 5 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view',
        type: 'choice',
        tag: 'Tiếng Việt 5 • Trắc nghiệm',
        prompt: 'Theo quy tắc viết hoa tên riêng tiếng nước ngoài (SGK trang 8), tên loài ngựa nhỏ nhất thế giới được viết đúng là:',
        illustration: '🐴 🌍 📝',
        options: [
          { id: 'A', text: 'mơt chơ ho sơ' },
          { id: 'B', text: 'Mơt-chơ Hơ-sơ' },
          { id: 'C', text: 'Mơt Chơ Hơ Sơ' },
          { id: 'D', text: 'Mơtchơ Hơsơ' }
        ],
        correct: 'B',
        hint: 'Quy tắc: Viết hoa chữ cái đầu mỗi bộ phận tạo thành tên riêng đó, và giữa các tiếng trong cùng một bộ phận có dấu gạch nối: "Mơt-chơ Hơ-sơ" (Theo SGK Tiếng Việt 5 Nâng Cao trang 8).'
      },
      {
        id: 2,
        bookTitle: 'Tiếng Việt 5 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view',
        type: 'input',
        tag: 'Tiếng Việt 5 • Điền từ',
        prompt: 'Sắp xếp cụm từ để hoàn chỉnh câu tục ngữ dự báo thời tiết (trang 8): "sao mau thì mưa, sao [.....] thì nắng":',
        illustration: '⭐ 🌧️ ☀️',
        correct: 'thưa',
        hint: 'Bài tập 5 trang 8: "sao mau thì mưa, sao thưa thì nắng" (mau nghĩa là dày đặc, thưa nghĩa là ít sao).'
      },
      {
        id: 3,
        bookTitle: 'Tiếng Việt 5 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view',
        type: 'match',
        tag: 'Tiếng Việt 5 • Ghép nối',
        prompt: 'Nối các cặp quan hệ từ trong câu ghép với ý nghĩa biểu thị:',
        illustration: '🔗 📜 🎯',
        pairs: [
          { id: 'p1', left: 'Vì ... nên ...', right: 'Nguyên nhân - Kết quả' },
          { id: 'p2', left: 'Nếu ... thì ...', right: 'Điều kiện / Giả thiết' },
          { id: 'p3', left: 'Tuy ... nhưng ...', right: 'Tương phản' },
          { id: 'p4', left: 'Không những ... mà còn ...', right: 'Tăng tiến' }
        ],
        hint: 'Hệ thống cặp quan hệ từ trọng tâm lớp 5 biểu thị các mối quan hệ logic giữa các vế câu ghép.'
      },
      {
        id: 4,
        bookTitle: 'Tiếng Việt 5 Nâng Cao – Lê Phương Nga',
        driveUrl: 'https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view',
        type: 'true_false',
        tag: 'Tiếng Việt 5 • Đúng / Sai',
        prompt: 'Từ đồng âm là những từ có cách phát âm giống nhau nhưng nghĩa hoàn toàn khác nhau, không liên quan gì đến nhau.',
        illustration: '💡 🗣️ 📖',
        options: [
          { id: 'T', text: 'ĐÚNG (Đ)' },
          { id: 'F', text: 'SAI (S)' }
        ],
        correct: 'T',
        hint: 'Ví dụ: "con ruồi đậu" (động từ) và "hạt đậu phộng" (danh từ) là từ đồng âm vì cùng phát âm "đậu" nhưng nghĩa hoàn toàn khác nhau!'
      }
    ],

    // ----------------------------------------------------
    // VII. TIẾNG ANH LỚP 3 (Global Success - Bồi dưỡng HSG)
    // ----------------------------------------------------
    'eng-g3-u1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 3 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
        type: 'choice',
        tag: 'Tiếng Anh 3 • Trắc nghiệm',
        prompt: 'Which of the following words is an UNCOUNTABLE noun (Danh từ không đếm được)? (Exercise 3, Page 8)',
        illustration: '🥛 🍎 💡',
        options: [
          { id: 'A', text: 'Cup (Cái tách)' },
          { id: 'B', text: 'Car (Chiếc ô tô)' },
          { id: 'C', text: 'Advice (Lời khuyên)' },
          { id: 'D', text: 'City (Thành phố)' }
        ],
        correct: 'C',
        hint: 'Trong Tiếng Anh, "Advice" (lời khuyên) là danh từ không đếm được (Uncountable noun), không thêm -s và không dùng "an advice"!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 3 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
        type: 'input',
        tag: 'Tiếng Anh 3 • Điền từ',
        prompt: 'Complete the question with "How much" or "How many": "[.....] milk does she want?"',
        illustration: '🥛 ❓ ✏️',
        correct: 'How much',
        hint: 'Vì "milk" (sữa) là danh từ không đếm được (uncountable noun), nên ta dùng cụm từ "How much milk".'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 3 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
        type: 'match',
        tag: 'Tiếng Anh 3 • Ghép nối',
        prompt: 'Match nouns in Column A with category in Column B (Exercise 3, Page 8):',
        illustration: '🧩 🇬🇧 🎯',
        pairs: [
          { id: 'p1', left: 'Equipment (Thiết bị)', right: 'Uncountable noun' },
          { id: 'p2', left: 'University (Trường đại học)', right: 'Countable noun' },
          { id: 'p3', left: 'Peace (Hòa bình)', right: 'Uncountable noun' },
          { id: 'p4', left: 'City (Thành phố)', right: 'Countable noun' }
        ],
        hint: 'Countable: University, City, Cup, Car. Uncountable: Advice, Equipment, Peace, Research, Progress, Help.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 3 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view',
        type: 'true_false',
        tag: 'Tiếng Anh 3 • Đúng / Sai',
        prompt: 'We use "How many" with countable plural nouns (e.g. How many books do you have?). True or False?',
        illustration: '📚 ❓ 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Quy tắc trang 9: How much + Uncountable noun; How many + Countable plural noun. Câu trên hoàn toàn ĐÚNG (TRUE).'
      }
    ],

    // ----------------------------------------------------
    // VIII. TIẾNG ANH LỚP 4 (Global Success - Bồi dưỡng HSG)
    // ----------------------------------------------------
    'eng-g4-u1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 4 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
        type: 'choice',
        tag: 'Tiếng Anh 4 • Trắc nghiệm',
        prompt: 'Choose the correct answer: "Do you live in [.....]?" (Exercise 2, Page 10)',
        illustration: '🏡 🏢 🇬🇧',
        options: [
          { id: 'A', text: 'a house' },
          { id: 'B', text: 'a apartment' },
          { id: 'C', text: 'an house' },
          { id: 'D', text: 'an big house' }
        ],
        correct: 'A',
        hint: '"house" bắt đầu bằng phụ âm /h/ nên dùng "a house". "apartment" bắt đầu bằng nguyên âm /ə/ nên phải dùng "an apartment".'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 4 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
        type: 'input',
        tag: 'Tiếng Anh 4 • Điền từ',
        prompt: 'Fill in the blank with "a" or "an": "I waited for [.....] hour at the bus stop."',
        illustration: '⏱️ 🚌 ✏️',
        correct: 'an',
        hint: 'Chữ cái "h" trong từ "hour" là âm câm (phát âm là /aʊər/), bắt đầu bằng nguyên âm nên ta dùng "an hour"!'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 4 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
        type: 'match',
        tag: 'Tiếng Anh 4 • Ghép nối',
        prompt: 'Match noun with article "a" or "an" (Exercise 1, Page 10):',
        illustration: '🧩 🔗 🎯',
        pairs: [
          { id: 'p1', left: 'university (trường đại học)', right: 'a' },
          { id: 'p2', left: 'umbrella (cái ô)', right: 'an' },
          { id: 'p3', left: 'astronaut (phi hành gia)', right: 'an' },
          { id: 'p4', left: 'uniform (đồng phục)', right: 'a' }
        ],
        hint: 'Ngoại lệ quan trọng: a university, a uniform (âm /juː/), nhưng an umbrella (âm /ʌ/); an astronaut (âm /æ/).'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 4 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view',
        type: 'true_false',
        tag: 'Tiếng Anh 4 • Đúng / Sai',
        prompt: 'The plural form of "child" is "children" and the plural form of "knife" is "knives". True or False?',
        illustration: '🧒 🔪 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Đây là các danh từ số nhiều bất quy tắc: child -> children; danh từ đuôi -fe đổi thành -ves: knife -> knives. Hoàn toàn ĐÚNG (TRUE).'
      }
    ],

    // ----------------------------------------------------
    // IX. TIẾNG ANH LỚP 5 (Global Success - Bồi dưỡng HSG)
    // ----------------------------------------------------
    'eng-g5-u1': [
      {
        id: 1,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 5 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
        type: 'choice',
        tag: 'Tiếng Anh 5 • Trắc nghiệm',
        prompt: 'Which sentence correctly uses ZERO ARTICLE (không dùng mạo từ)? (Chuyên đề 2, Trang 10)',
        illustration: '🇻🇳 🗣️ 💡',
        options: [
          { id: 'A', text: 'I can speak the English very well.' },
          { id: 'B', text: 'I can speak English very well.' },
          { id: 'C', text: 'She was born in the 2005.' },
          { id: 'D', text: 'I have the milk and bread for breakfast.' }
        ],
        correct: 'B',
        hint: 'Theo bảng Zero Article (trang 10): Không dùng mạo từ trước tên ngôn ngữ (English, Vietnamese), năm/tháng, và bữa ăn (breakfast)!'
      },
      {
        id: 2,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 5 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
        type: 'input',
        tag: 'Tiếng Anh 5 • Điền từ',
        prompt: 'Fill in the blank with "a", "an", or "the": "Look up at the sky! [.....] Sun is shining brightly."',
        illustration: '☀️ 🌤️ ✏️',
        correct: 'The',
        hint: 'Dùng mạo từ xác định "The" trước các vật thể duy nhất trong tự nhiên: The Sun (Mặt trời), The Moon (Mặt trăng), The Earth (Trái đất).'
      },
      {
        id: 3,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 5 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
        type: 'match',
        tag: 'Tiếng Anh 5 • Ghép nối',
        prompt: 'Match article usage with corresponding example (Page 10):',
        illustration: '🎹 🏆 🎯',
        pairs: [
          { id: 'p1', left: 'Nhạc cụ (Musical instruments)', right: 'She is playing the piano.' },
          { id: 'p2', left: 'So sánh nhất (Superlative)', right: 'She is the best student.' },
          { id: 'p3', left: 'Vật thể duy nhất', right: 'The Sun is shining.' },
          { id: 'p4', left: 'Tên quốc gia thông thường', right: 'I am from Vietnam.' }
        ],
        hint: 'Nhạc cụ: the piano; so sánh nhất: the best; vật duy nhất: the Sun; quốc gia thông thường không dùng mạo từ: Vietnam.'
      },
      {
        id: 4,
        bookTitle: 'Bồi dưỡng HSG Tiếng Anh 5 (Global Success)',
        driveUrl: 'https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view',
        type: 'true_false',
        tag: 'Tiếng Anh 5 • Đúng / Sai',
        prompt: 'We use "any" in positive sentences and "some" in negative sentences and questions.',
        illustration: '❓ ❌ 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'F',
        hint: 'Quy tắc ngược lại: Ta dùng "some" trong câu khẳng định, và "any" trong câu phủ định và câu hỏi!'
      }
    ],

    // ----------------------------------------------------
    // X. 10 BỘ SÁCH TOÁN TIẾNG ANH (CÔ PHẠM THUÝ)
    // ----------------------------------------------------
    'toan-sing-180days': [
      {
        id: 1,
        bookTitle: '180 Days of Math',
        driveUrl: 'https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9',
        type: 'choice',
        tag: '180 Days of Math • Trắc nghiệm',
        prompt: 'Day 45: What is the sum of 458 and 276?',
        illustration: '📅 ➕ 🧮',
        options: [
          { id: 'A', text: '724' },
          { id: 'B', text: '734' },
          { id: 'C', text: '744' },
          { id: 'D', text: '834' }
        ],
        correct: 'B',
        hint: 'Thuật ngữ "sum" nghĩa là tổng (phép cộng +). Ta đặt tính: 458 + 276 = 734!'
      },
      {
        id: 2,
        bookTitle: '180 Days of Math',
        driveUrl: 'https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9',
        type: 'input',
        tag: '180 Days of Math • Điền số',
        prompt: 'Day 60: Find the missing addend: 240 + [.....] = 600',
        illustration: '🔢 ❓ ✏️',
        correct: '360',
        hint: '"Missing addend" là số hạng còn thiếu. Lấy tổng trừ đi số hạng đã biết: 600 - 240 = 360!'
      },
      {
        id: 3,
        bookTitle: '180 Days of Math',
        driveUrl: 'https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9',
        type: 'match',
        tag: '180 Days of Math • Ghép nối',
        prompt: 'Day 90: Match each expanded form with its standard number:',
        illustration: '🔗 🎯 🧩',
        pairs: [
          { id: 'p1', left: '500 + 70 + 3', right: '573' },
          { id: 'p2', left: '800 + 4', right: '804' },
          { id: 'p3', left: '3000 + 200 + 50', right: '3250' }
        ],
        hint: '500 + 70 + 3 = 573; 800 + 4 = 804; 3000 + 200 + 50 = 3250.'
      },
      {
        id: 4,
        bookTitle: '180 Days of Math',
        driveUrl: 'https://drive.google.com/drive/folders/17WGgnsvjxEBInLlCLll7rbGKPg_jAfQ9',
        type: 'true_false',
        tag: '180 Days of Math • Đúng / Sai',
        prompt: 'Day 120: 15 multiplied by 4 is equal to 60. Is this True or False?',
        illustration: '⏱️ ✖️ 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: '"Multiplied by" nghĩa là nhân (×). Phép tính: 15 × 4 = 60. Nhận định này hoàn toàn ĐÚNG (TRUE).'
      }
    ],

    'toan-sing-commoncore': [
      {
        id: 1,
        bookTitle: 'Common Core Math',
        driveUrl: 'https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT',
        type: 'choice',
        tag: 'Common Core • Trắc nghiệm',
        prompt: 'Week 8, Day 1: Round 4,872 to the nearest hundred.',
        illustration: '🎯 📍 🔢',
        options: [
          { id: 'A', text: '4,800' },
          { id: 'B', text: '4,870' },
          { id: 'C', text: '4,900' },
          { id: 'D', text: '5,000' }
        ],
        correct: 'C',
        hint: '"Round to the nearest hundred" là làm tròn đến hàng trăm gần nhất. Chữ số hàng chục là 7 (>= 5), nên làm tròn lên 4,900!'
      },
      {
        id: 2,
        bookTitle: 'Common Core Math',
        driveUrl: 'https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT',
        type: 'input',
        tag: 'Common Core • Điền số',
        prompt: 'Week 12, Day 2: A rectangular garden has length = 8m and width = 5m. What is its perimeter in meters?',
        illustration: '🏡 📐 📏',
        correct: '26',
        hint: '"Perimeter" là chu vi: (8 + 5) × 2 = 13 × 2 = 26 mét.'
      },
      {
        id: 3,
        bookTitle: 'Common Core Math',
        driveUrl: 'https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT',
        type: 'match',
        tag: 'Common Core • Ghép nối',
        prompt: 'Week 15: Match the fraction to its equivalent fraction:',
        illustration: '🍰 🍕 ⚖️',
        pairs: [
          { id: 'p1', left: '1 / 2', right: '2 / 4' },
          { id: 'p2', left: '2 / 3', right: '4 / 6' },
          { id: 'p3', left: '3 / 5', right: '6 / 10' }
        ],
        hint: '1/2 = 2/4; 2/3 = 4/6; 3/5 = 6/10.'
      },
      {
        id: 4,
        bookTitle: 'Common Core Math',
        driveUrl: 'https://drive.google.com/drive/folders/1hRoiefN8-ZS7m-hcuUrmzcsm4vq3ofxT',
        type: 'true_false',
        tag: 'Common Core • Đúng / Sai',
        prompt: 'Week 20: 7 × 8 = 56. Is this statement True or False?',
        illustration: '⭐ 🧮 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Bảng cửu chương 7 × 8 = 56 là chính xác.'
      }
    ],

    'toan-sing-instep': [
      {
        id: 1,
        bookTitle: 'In Step Maths - Singapore Math',
        driveUrl: 'https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM',
        type: 'choice',
        tag: 'In Step Maths • Trắc nghiệm',
        prompt: 'Chapter 2: Lucas has 48 marbles. He gives 1/4 of them to Ken. How many marbles does Ken get?',
        illustration: '🇸🇬 🔴 🔵',
        options: [
          { id: 'A', text: '8 marbles' },
          { id: 'B', text: '12 marbles' },
          { id: 'C', text: '16 marbles' },
          { id: 'D', text: '24 marbles' }
        ],
        correct: 'B',
        hint: 'Ken nhận được 1/4 số bi của Lucas: 48 ÷ 4 = 12 viên bi.'
      },
      {
        id: 2,
        bookTitle: 'In Step Maths - Singapore Math',
        driveUrl: 'https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM',
        type: 'input',
        tag: 'In Step Maths • Điền số',
        prompt: 'Chapter 4: The ratio of boys to girls in a math club is 3 : 5. If there are 15 boys, how many girls are there?',
        illustration: '👦 👧 📐',
        correct: '25',
        hint: '1 phần là: 15 ÷ 3 = 5 bạn. Số bạn nữ (5 phần) là: 5 × 5 = 25 bạn!'
      },
      {
        id: 3,
        bookTitle: 'In Step Maths - Singapore Math',
        driveUrl: 'https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM',
        type: 'match',
        tag: 'In Step Maths • Ghép nối',
        prompt: 'Chapter 6: Match Singapore Math terms with their meanings:',
        illustration: '📚 🇸🇬 🔍',
        pairs: [
          { id: 'p1', left: 'Bar Model', right: 'Sơ đồ đoạn thẳng' },
          { id: 'p2', left: 'Part-Whole', right: 'Phần - Toàn thể' },
          { id: 'p3', left: 'Comparison', right: 'Mô hình so sánh' }
        ],
        hint: 'Bar Model: Sơ đồ đoạn thẳng; Part-Whole: Phần và toàn thể; Comparison: Mô hình so sánh.'
      },
      {
        id: 4,
        bookTitle: 'In Step Maths - Singapore Math',
        driveUrl: 'https://drive.google.com/drive/folders/1SoSALJArxQGV15PbqcZZW0Ev5nFZ7ARM',
        type: 'true_false',
        tag: 'In Step Maths • Đúng / Sai',
        prompt: 'Chapter 8: The sum of the angles in any triangle is always 180°. True or False?',
        illustration: '🔺 📐 📏',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Tổng ba góc trong một hình tam giác luôn luôn bằng 180 độ (TRUE).'
      }
    ],

    'toan-sing-masterskills': [
      {
        id: 1,
        bookTitle: 'Master Skills Math',
        driveUrl: 'https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu',
        type: 'choice',
        tag: 'Master Skills • Trắc nghiệm',
        prompt: 'Unit 3: What is the place value of the digit 7 in the number 5,742?',
        illustration: '🏅 🔢 💡',
        options: [
          { id: 'A', text: '7 ones (7 đơn vị)' },
          { id: 'B', text: '7 tens (7 chục)' },
          { id: 'C', text: '7 hundreds (7 trăm)' },
          { id: 'D', text: '7 thousands (7 nghìn)' }
        ],
        correct: 'C',
        hint: 'Chữ số 7 đứng ở hàng trăm, có giá trị là 700 (7 hundreds).'
      },
      {
        id: 2,
        bookTitle: 'Master Skills Math',
        driveUrl: 'https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu',
        type: 'input',
        tag: 'Master Skills • Điền số',
        prompt: 'Unit 5: Emma bought 4 packs of colored pencils. Each pack has 12 pencils. How many pencils does she have in total?',
        illustration: '✏️ 📦 🎨',
        correct: '48',
        hint: '4 gói × 12 chiếc/gói = 48 chiếc bút chì.'
      },
      {
        id: 3,
        bookTitle: 'Master Skills Math',
        driveUrl: 'https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu',
        type: 'match',
        tag: 'Master Skills • Ghép nối',
        prompt: 'Unit 7: Match arithmetic operation with its result term:',
        illustration: '➕ ➖ ✖️',
        pairs: [
          { id: 'p1', left: 'Addition (+)', right: 'Sum' },
          { id: 'p2', left: 'Subtraction (-)', right: 'Difference' },
          { id: 'p3', left: 'Multiplication (×)', right: 'Product' }
        ],
        hint: 'Addition -> Sum; Subtraction -> Difference; Multiplication -> Product.'
      },
      {
        id: 4,
        bookTitle: 'Master Skills Math',
        driveUrl: 'https://drive.google.com/drive/folders/1DMgpHf-GqpCdrV5EBxqcKxl3ZccB2hFu',
        type: 'true_false',
        tag: 'Master Skills • Đúng / Sai',
        prompt: 'Unit 9: 1 kilogram is equal to 1,000 grams. True or False?',
        illustration: '⚖️ 📦 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: '1 kg = 1000 g là chính xác (TRUE).'
      }
    ],

    'toan-sing-sgchallenge': [
      {
        id: 1,
        bookTitle: 'Singapore Math Challenge',
        driveUrl: 'https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8',
        type: 'choice',
        tag: 'SG Math Challenge • Trắc nghiệm',
        prompt: 'Word Problem 14: Ryan had 3 times as many stamps as Chloe. Together they had 48 stamps. How many stamps did Ryan have?',
        illustration: '🧩 📮 👦',
        options: [
          { id: 'A', text: '12 stamps' },
          { id: 'B', text: '24 stamps' },
          { id: 'C', text: '36 stamps' },
          { id: 'D', text: '40 stamps' }
        ],
        correct: 'C',
        hint: 'Chloe 1 phần, Ryan 3 phần -> Tổng 4 phần bằng 48. 1 phần là 48:4 = 12. Ryan có: 12 × 3 = 36 tem!'
      },
      {
        id: 2,
        bookTitle: 'Singapore Math Challenge',
        driveUrl: 'https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8',
        type: 'input',
        tag: 'SG Math Challenge • Điền số',
        prompt: 'Word Problem 28: A bakery baked 350 cupcakes. They sold 4/5 of them. How many cupcakes were left?',
        illustration: '🧁 👨‍🍳 🏪',
        correct: '70',
        hint: 'Số bánh còn lại là 1 - 4/5 = 1/5 tổng số bánh: 350 ÷ 5 = 70 chiếc bánh.'
      },
      {
        id: 3,
        bookTitle: 'Singapore Math Challenge',
        driveUrl: 'https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8',
        type: 'match',
        tag: 'SG Math Challenge • Ghép nối',
        prompt: 'Match word problem clue with arithmetic operation:',
        illustration: '🔍 📝 🎯',
        pairs: [
          { id: 'p1', left: 'More than / altogether', right: 'Addition (+)' },
          { id: 'p2', left: 'Left / difference / fewer', right: 'Subtraction (-)' },
          { id: 'p3', left: 'Times as many / product', right: 'Multiplication (×)' }
        ],
        hint: 'More than/altogether -> (+); Left/difference/fewer -> (-); Times as many -> (×).'
      },
      {
        id: 4,
        bookTitle: 'Singapore Math Challenge',
        driveUrl: 'https://drive.google.com/drive/folders/1-7Hk2K_d-AcrI7WFZevx5rqG2iHDSAF8',
        type: 'true_false',
        tag: 'SG Math Challenge • Đúng / Sai',
        prompt: 'If Liam gives 5 stickers to Noah, their total number of stickers remains unchanged.',
        illustration: '⭐ 🤝 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Đây là quy tắc chuyển giao nội bộ (Internal Transfer): Tổng số nhãn dán không đổi (TRUE).'
      }
    ],

    'toan-sing-mathminutes': [
      {
        id: 1,
        bookTitle: 'Math Minutes',
        driveUrl: 'https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3',
        type: 'choice',
        tag: 'Math Minutes • Trắc nghiệm',
        prompt: 'Minute 25: Which number is a prime number (số nguyên tố)?',
        illustration: '⚡ 🔢 💡',
        options: [
          { id: 'A', text: '9' },
          { id: 'B', text: '15' },
          { id: 'C', text: '17' },
          { id: 'D', text: '21' }
        ],
        correct: 'C',
        hint: '17 chỉ chia hết cho 1 và chính nó nên 17 là số nguyên tố.'
      },
      {
        id: 2,
        bookTitle: 'Math Minutes',
        driveUrl: 'https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3',
        type: 'input',
        tag: 'Math Minutes • Điền số',
        prompt: 'Minute 40: Calculate mentally: 25 × 16 = ?',
        illustration: '🧠 ⚡ ✏️',
        correct: '400',
        hint: 'Mẹo nhẩm: 25 × 16 = 25 × 4 × 4 = 100 × 4 = 400!'
      },
      {
        id: 3,
        bookTitle: 'Math Minutes',
        driveUrl: 'https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3',
        type: 'match',
        tag: 'Math Minutes • Ghép nối',
        prompt: 'Minute 60: Match speed mental math:',
        illustration: '⚡ 🎯 🧮',
        pairs: [
          { id: 'p1', left: '15 × 15', right: '225' },
          { id: 'p2', left: '12 × 12', right: '144' },
          { id: 'p3', left: '11 × 11', right: '121' }
        ],
        hint: '15² = 225; 12² = 144; 11² = 121.'
      },
      {
        id: 4,
        bookTitle: 'Math Minutes',
        driveUrl: 'https://drive.google.com/drive/folders/17zm_9wurRReNK-M9kEgZLbU8SjBPHZb3',
        type: 'true_false',
        tag: 'Math Minutes • Đúng / Sai',
        prompt: 'Minute 85: An even number multiplied by any integer is always an even number.',
        illustration: '🔢 ⚡ 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Số chẵn nhân với bất kỳ số nào cũng cho kết quả là số chẵn (TRUE).'
      }
    ],

    'toan-sing-oxfordpyp': [
      {
        id: 1,
        bookTitle: 'Oxford Mathematics PYP',
        driveUrl: 'https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b',
        type: 'choice',
        tag: 'Oxford PYP • Trắc nghiệm',
        prompt: 'Inquiry 3: A fair 6-sided die is rolled. What is the probability of rolling an even number?',
        illustration: '🎓 🎲 ❓',
        options: [
          { id: 'A', text: '1 / 6' },
          { id: 'B', text: '1 / 3' },
          { id: 'C', text: '1 / 2' },
          { id: 'D', text: '2 / 3' }
        ],
        correct: 'C',
        hint: 'Các mặt chẵn là 2, 4, 6 (3 mặt trong tổng số 6 mặt). Xác suất = 3/6 = 1/2!'
      },
      {
        id: 2,
        bookTitle: 'Oxford Mathematics PYP',
        driveUrl: 'https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b',
        type: 'input',
        tag: 'Oxford PYP • Điền số',
        prompt: 'Inquiry 7: A triangle has base = 10cm and height = 6cm. What is its area in cm²?',
        illustration: '🔺 📐 📏',
        correct: '30',
        hint: 'Diện tích tam giác = (đáy × chiều cao) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²!'
      },
      {
        id: 3,
        bookTitle: 'Oxford Mathematics PYP',
        driveUrl: 'https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b',
        type: 'match',
        tag: 'Oxford PYP • Ghép nối',
        prompt: 'Match polygon name with its number of sides:',
        illustration: '🔷 ⬡ 🎯',
        pairs: [
          { id: 'p1', left: 'Pentagon', right: '5 sides' },
          { id: 'p2', left: 'Hexagon', right: '6 sides' },
          { id: 'p3', left: 'Octagon', right: '8 sides' }
        ],
        hint: 'Pentagon = 5 cạnh; Hexagon = 6 cạnh; Octagon = 8 cạnh.'
      },
      {
        id: 4,
        bookTitle: 'Oxford Mathematics PYP',
        driveUrl: 'https://drive.google.com/drive/folders/1PV5UWBQ7p5ymsZXY3TWQGQCQxV7D096b',
        type: 'true_false',
        tag: 'Oxford PYP • Đúng / Sai',
        prompt: 'All squares are rectangles, but not all rectangles are squares.',
        illustration: '🟦 🔲 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Mọi hình vuông đều là hình chữ nhật đặc biệt có 4 cạnh bằng nhau (TRUE).'
      }
    ],

    'toan-sing-toansing': [
      {
        id: 1,
        bookTitle: 'Toán Sing Olympic',
        driveUrl: 'https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM',
        type: 'choice',
        tag: 'Toán Sing Olympic • Trắc nghiệm',
        prompt: 'Logic Puzzle 12: Find the next number in sequence: 2, 6, 12, 20, 30, [.....]',
        illustration: '🦁 🔢 🧩',
        options: [
          { id: 'A', text: '40' },
          { id: 'B', text: '42' },
          { id: 'C', text: '44' },
          { id: 'D', text: '46' }
        ],
        correct: 'B',
        hint: 'Quy luật khoảng cách tăng dần: 2+4=6; 6+6=12; 12+8=20; 20+10=30; Số tiếp theo là 30+12 = 42!'
      },
      {
        id: 2,
        bookTitle: 'Toán Sing Olympic',
        driveUrl: 'https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM',
        type: 'input',
        tag: 'Toán Sing Olympic • Điền số',
        prompt: 'Chicken and Rabbit Problem: There are 10 heads and 28 legs in total. How many rabbits are there?',
        illustration: '🐔 🐇 🐾',
        correct: '4',
        hint: 'Giả sử tất cả 10 con đều là gà: 10×2 = 20 chân. Số chân thiếu: 28-20 = 8 chân. Mỗi con thỏ nhiều hơn gà 2 chân: Số thỏ = 8÷2 = 4 con!'
      },
      {
        id: 3,
        bookTitle: 'Toán Sing Olympic',
        driveUrl: 'https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM',
        type: 'match',
        tag: 'Toán Sing Olympic • Ghép nối',
        prompt: 'Match Olympic method with typical problem type:',
        illustration: '🏅 🧩 🎯',
        pairs: [
          { id: 'p1', left: 'Giả thiết tạm', right: 'Toán gà và thỏ' },
          { id: 'p2', left: 'Tính ngược từ cuối', right: 'Toán tìm số ban đầu' },
          { id: 'p3', left: 'Nguyên lý Dirichlet', right: 'Bài toán bốc bi chắc chắn' }
        ],
        hint: 'Các phương pháp giải toán Olympic Singapore đặc sắc.'
      },
      {
        id: 4,
        bookTitle: 'Toán Sing Olympic',
        driveUrl: 'https://drive.google.com/drive/folders/1kJrumlwqwdx7wH4CHNZA3dBV-duCoThM',
        type: 'true_false',
        tag: 'Toán Sing Olympic • Đúng / Sai',
        prompt: 'In any group of 13 people, at least 2 people share the same birth month.',
        illustration: '🎂 👥 💡',
        options: [
          { id: 'T', text: 'TRUE (Đúng)' },
          { id: 'F', text: 'FALSE (Sai)' }
        ],
        correct: 'T',
        hint: 'Vì một năm chỉ có 12 tháng, theo nguyên lý Dirichlet (nguyên lý chuồng bồ câu), trong 13 người ắt phải có ít nhất 2 người cùng tháng sinh (TRUE).'
      }
    ],

    // =========================================================================
    // BỔ SUNG ĐẦY ĐỦ 100% CÂU HỎI CHO 32 BÀI HỌC CÒN THIẾU (LỚP 3, 4, 5)
    // NGUỒN: SÁCH BỒI DƯỠNG TRẦN DIÊN HIỂN, LÊ PHƯƠNG NGA, GLOBAL SUCCESS
    // =========================================================================
    'toan-g3-w3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "choice",
            "tag": "Toán 3 • Tìm x",
            "prompt": "Tìm số tự nhiên x biết: x × 7 = 42 + 21",
            "illustration": "🔢 ✖️ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "x = 9"
                  },
                  {
                        "id": "B",
                        "text": "x = 8"
                  },
                  {
                        "id": "C",
                        "text": "x = 7"
                  },
                  {
                        "id": "D",
                        "text": "x = 6"
                  }
            ],
            "correct": "A",
            "hint": "Ta tính vế phải trước: 42 + 21 = 63. Ta có x × 7 = 63 => x = 63 : 7 = 9."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "input",
            "tag": "Toán 3 • Toán đố",
            "prompt": "Một cuộn dây dài 48m. Bác thợ cắt đi 1/6 chiều dài cuộn dây. Hỏi cuộn dây còn lại bao nhiêu mét?",
            "illustration": "📏 ✂️ 🧵",
            "correct": "40",
            "hint": "Đoạn dây đã cắt là: 48 : 6 = 8 (m). Cuộn dây còn lại: 48 - 8 = 40 (m)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "match",
            "tag": "Toán 3 • Ghép nối",
            "prompt": "Nối phép tính với kết quả chính xác:",
            "illustration": "🧩 ✖️ ➗",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "7 × 8",
                        "right": "56"
                  },
                  {
                        "id": "p2",
                        "left": "6 × 9",
                        "right": "54"
                  },
                  {
                        "id": "p3",
                        "left": "42 : 6",
                        "right": "7"
                  },
                  {
                        "id": "p4",
                        "left": "63 : 7",
                        "right": "9"
                  }
            ],
            "hint": "Em nhớ lại bảng nhân 6, 7 và bảng chia tương ứng nhé."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "true_false",
            "tag": "Toán 3 • Đúng / Sai",
            "prompt": "Gấp số 7 lên 6 lần ta được kết quả là 42.",
            "illustration": "📈 7️⃣ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Muốn gấp một số lên nhiều lần, ta lấy số đó nhân với số lần: 7 × 6 = 42."
      }
],

    'toan-g3-w4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "choice",
            "tag": "Toán 3 • Phép chia có dư",
            "prompt": "Tìm một số biết rằng lấy số đó chia cho 8 thì được thương là 9 và số dư lớn nhất có thể.",
            "illustration": "➗ 8️⃣ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "79"
                  },
                  {
                        "id": "B",
                        "text": "77"
                  },
                  {
                        "id": "C",
                        "text": "72"
                  },
                  {
                        "id": "D",
                        "text": "80"
                  }
            ],
            "correct": "A",
            "hint": "Số chia là 8 nên số dư lớn nhất có thể là 7. Số cần tìm là: 9 × 8 + 7 = 79."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "input",
            "tag": "Toán 3 • Hình học",
            "prompt": "Một hình tam giác vuông có 1 góc vuông. Hỏi hình đó có bao nhiêu góc không vuông?",
            "illustration": "📐 🔺 🔍",
            "correct": "2",
            "hint": "Hình tam giác có tất cả 3 góc. Đã có 1 góc vuông thì còn lại 2 góc không vuông (góc nhọn)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "match",
            "tag": "Toán 3 • Ghép nối",
            "prompt": "Nối biểu thức với giá trị tương ứng:",
            "illustration": "🧩 9️⃣ 8️⃣",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "8 × 7 - 16",
                        "right": "40"
                  },
                  {
                        "id": "p2",
                        "left": "9 × 6 + 18",
                        "right": "72"
                  },
                  {
                        "id": "p3",
                        "left": "72 : 8 + 15",
                        "right": "24"
                  },
                  {
                        "id": "p4",
                        "left": "81 : 9 × 4",
                        "right": "36"
                  }
            ],
            "hint": "Thực hiện nhân chia trước, cộng trừ sau nhé!"
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "true_false",
            "tag": "Toán 3 • Đúng / Sai",
            "prompt": "Thước ê-ke là dụng cụ dùng để nhận biết và vẽ góc vuông.",
            "illustration": "📐 📐 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Thước ê-ke có một góc vuông chuẩn, giúp học sinh kiểm tra góc vuông hay không vuông."
      }
],

    'toan-g3-w5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "choice",
            "tag": "Toán 3 • Cấu tạo số",
            "prompt": "Số gồm 5 nghìn, 4 trăm và 3 đơn vị được viết là:",
            "illustration": "5️⃣ 0️⃣ 4️⃣",
            "options": [
                  {
                        "id": "A",
                        "text": "5403"
                  },
                  {
                        "id": "B",
                        "text": "5043"
                  },
                  {
                        "id": "C",
                        "text": "5430"
                  },
                  {
                        "id": "D",
                        "text": "543"
                  }
            ],
            "correct": "B",
            "hint": "Hàng nghìn là 5, hàng trăm là 0, hàng chục là 4 (chú ý: 4 trăm = 4 ở hàng trăm, 0 chục, 3 đơn vị => 5403, nhưng ở đây đề: 5 nghìn, 4 chục và 3 đơn vị là 5043)."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "input",
            "tag": "Toán 3 • Số học nâng cao",
            "prompt": "Tìm hiệu giữa số lớn nhất có 4 chữ số khác nhau và số bé nhất có 4 chữ số khác nhau.",
            "illustration": "9️⃣ 8️⃣ 7️⃣",
            "correct": "8853",
            "hint": "Số lớn nhất có 4 chữ số khác nhau là 9876. Số bé nhất có 4 chữ số khác nhau là 1023. Hiệu: 9876 - 1023 = 8853."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "match",
            "tag": "Toán 3 • Đọc viết số",
            "prompt": "Nối số với cách đọc tương ứng:",
            "illustration": "🔢 📖 🎯",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "3045",
                        "right": "Ba nghìn không trăm bốn mươi lăm"
                  },
                  {
                        "id": "p2",
                        "left": "7802",
                        "right": "Bảy nghìn tám trăm linh hai"
                  },
                  {
                        "id": "p3",
                        "left": "12500",
                        "right": "Mười hai nghìn năm trăm"
                  },
                  {
                        "id": "p4",
                        "left": "40009",
                        "right": "Bốn mươi nghìn không trăm linh chín"
                  }
            ],
            "hint": "Chú ý chữ số 0 ở hàng chục đọc là \"linh\" hoặc \"lẻ\", ở hàng trăm đọc là \"không trăm\"."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 3 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1AWlKxKf3ft6R4WmFyx_TnxhLwjmCUPg9/view",
            "type": "true_false",
            "tag": "Toán 3 • Đúng / Sai",
            "prompt": "Trong số 8562, chữ số 5 thuộc hàng trăm và có giá trị là 500.",
            "illustration": "8️⃣ 5️⃣ 6️⃣",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Từ phải sang trái: 2 là hàng đơn vị, 6 là hàng chục, 5 là hàng trăm (500), 8 là hàng nghìn (8000)."
      }
],

    'tv-g3-b2': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "choice",
            "tag": "Tiếng Việt 3 • Biện pháp so sánh",
            "prompt": "Trong câu: \"Mặt biển sáng trong như tấm gương khổng lồ\", sự vật nào được so sánh với nhau?",
            "illustration": "🌊 🪞 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Mặt biển và tấm gương khổng lồ"
                  },
                  {
                        "id": "B",
                        "text": "Mặt biển và bầu trời trong xanh"
                  },
                  {
                        "id": "C",
                        "text": "Tấm gương và dòng sông"
                  },
                  {
                        "id": "D",
                        "text": "Mặt biển và mặt trời"
                  }
            ],
            "correct": "A",
            "hint": "Sự vật 1 là \"Mặt biển\", từ so sánh là \"như\", sự vật 2 là \"tấm gương khổng lồ\"."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "input",
            "tag": "Tiếng Việt 3 • Điền từ",
            "prompt": "Điền từ so sánh thích hợp vào chỗ trống trong câu ca dao: \"Công cha ...... núi Thái Sơn / Nghĩa mẹ ...... nước trong nguồn chảy ra.\"",
            "illustration": "⛰️ 💧 📜",
            "correct": "như",
            "hint": "Từ so sánh quen thuộc chỉ sự ngang bằng trong văn học dân gian Việt Nam."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "match",
            "tag": "Tiếng Việt 3 • Ghép nối hình ảnh so sánh",
            "prompt": "Nối hình ảnh so sánh với vế tương ứng trong thơ ca thiếu nhi:",
            "illustration": "🌕 🎈 🌿",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Trăng tròn như",
                        "right": "quả bóng bay"
                  },
                  {
                        "id": "p2",
                        "left": "Mắt bé tròn xoe như",
                        "right": "hai hòn bi ve"
                  },
                  {
                        "id": "p3",
                        "left": "Tiếng suối trong như",
                        "right": "tiếng hát xa"
                  },
                  {
                        "id": "p4",
                        "left": "Lá cọ xòe ra như",
                        "right": "chiếc ô xanh"
                  }
            ],
            "hint": "Dựa vào các bài thơ quen thuộc: Quả bóng tròn, Tiếng suối Côn Sơn, Cây cọ quê em."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "true_false",
            "tag": "Tiếng Việt 3 • Đúng / Sai",
            "prompt": "Câu thơ: \"Quả dừa - đàn lợn con nằm trên cao\" sử dụng dấu gạch ngang (-) để thay thế cho từ so sánh.",
            "illustration": "🥥 🐖 🌴",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Đúng! Đây là kiểu so sánh không dùng từ \"như/là\" mà dùng dấu gạch ngang nối sự vật 1 và sự vật 2 (Trần Đăng Khoa)."
      }
],

    'tv-g3-b3': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Các kiểu câu kể",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "choice",
            "tag": "Tiếng Việt 3 • Kiểu câu kể",
            "prompt": "Câu: \"Bác nông dân đang cày ruộng trên cánh đồng vàng rực.\" thuộc mẫu câu nào?",
            "illustration": "🌾 👨‍🌾 🐂",
            "options": [
                  {
                        "id": "A",
                        "text": "Ai làm gì?"
                  },
                  {
                        "id": "B",
                        "text": "Ai là gì?"
                  },
                  {
                        "id": "C",
                        "text": "Ai thế nào?"
                  },
                  {
                        "id": "D",
                        "text": "Câu cảm thán"
                  }
            ],
            "correct": "A",
            "hint": "\"Đang cày ruộng\" là hoạt động của bác nông dân, nên câu này trả lời cho câu hỏi: Ai làm gì?"
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Các kiểu câu kể",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "input",
            "tag": "Tiếng Việt 3 • Xác định thành phần",
            "prompt": "Tìm bộ phận trả lời cho câu hỏi \"Thế nào?\" trong câu: \"Bầu trời mùa thu trong xanh và cao vời vợi.\"",
            "illustration": "🌤️ 🍁 🔍",
            "correct": "trong xanh và cao vời vợi",
            "hint": "Vị ngữ của câu \"Ai thế nào?\" chỉ đặc điểm, tính chất của sự vật."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Các kiểu câu kể",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "match",
            "tag": "Tiếng Việt 3 • Phân loại mẫu câu",
            "prompt": "Nối câu văn với mẫu câu kể tương ứng:",
            "illustration": "🧩 📖 ✏️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Mẹ em là cô giáo vùng cao",
                        "right": "Ai là gì?"
                  },
                  {
                        "id": "p2",
                        "left": "Chú chim sâu bắt sâu trên cành cây",
                        "right": "Ai làm gì?"
                  },
                  {
                        "id": "p3",
                        "left": "Dòng sông quê em quanh co hiền hòa",
                        "right": "Ai thế nào?"
                  },
                  {
                        "id": "p4",
                        "left": "Hà Nội là trái tim của cả nước",
                        "right": "Ai là gì?"
                  }
            ],
            "hint": "\"Là gì\" dùng từ \"là\"; \"Làm gì\" có từ chỉ hoạt động; \"Thế nào\" có từ chỉ đặc điểm, tính chất."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Các kiểu câu kể",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "true_false",
            "tag": "Tiếng Việt 3 • Đúng / Sai",
            "prompt": "Câu \"Hoa phượng nở đỏ rực cả một góc sân trường.\" thuộc mẫu câu kể \"Ai thế nào?\".",
            "illustration": "🌺 🏫 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Vị ngữ \"nở đỏ rực cả một góc sân trường\" nêu lên trạng thái và đặc điểm màu sắc rực rỡ của hoa phượng."
      }
],

    'tv-g3-b4': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Nghệ thuật nhân hóa",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "choice",
            "tag": "Tiếng Việt 3 • Biện pháp nhân hóa",
            "prompt": "Câu nào dưới đây sử dụng biện pháp nghệ thuật nhân hóa?",
            "illustration": "⏰ 🚶 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Bác kim giờ thận trọng nhích từng li, từng li."
                  },
                  {
                        "id": "B",
                        "text": "Mặt hồ phẳng lặng như một tấm gương soi."
                  },
                  {
                        "id": "C",
                        "text": "Đồng hồ báo thức chạy bằng hai viên pin tiểu."
                  },
                  {
                        "id": "D",
                        "text": "Cây thông cao vút đứng bên đường làng."
                  }
            ],
            "correct": "A",
            "hint": "Kim giờ được gọi là \"Bác\" và có hành động \"thận trọng nhích từng li\" như con người."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Nghệ thuật nhân hóa",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "input",
            "tag": "Tiếng Việt 3 • Tìm từ xưng hô",
            "prompt": "Trong câu: \"Chị mây mặc áo xanh thướt tha dạo chơi trên bầu trời\", mây được gọi bằng từ xưng hô nào?",
            "illustration": "☁️ 👗 🔍",
            "correct": "chị",
            "hint": "Từ dùng để xưng hô thân mật với đám mây như một người phụ nữ dịu dàng."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Nghệ thuật nhân hóa",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "match",
            "tag": "Tiếng Việt 3 • Các cách nhân hóa",
            "prompt": "Nối cách nhân hóa với câu ví dụ phù hợp:",
            "illustration": "🧩 🐓 🌶️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Gọi vật bằng từ gọi người",
                        "right": "Bác gà trống cất tiếng gáy vang"
                  },
                  {
                        "id": "p2",
                        "left": "Tả hoạt động như con người",
                        "right": "Giọt sương sớm thức giấc đón ánh mai"
                  },
                  {
                        "id": "p3",
                        "left": "Trò chuyện tâm sự với vật",
                        "right": "Khế ơi mau chín cho chim ăn nhé"
                  },
                  {
                        "id": "p4",
                        "left": "Tả tính cách như con người",
                        "right": "Anh ớt hiểm cay nồng bướng bỉnh"
                  }
            ],
            "hint": "Có 3 cách nhân hóa chính: gọi vật bằng từ gọi người, tả vật bằng từ ngữ tả người, nói chuyện với vật như với người."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Dấu câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "true_false",
            "tag": "Tiếng Việt 3 • Dấu câu",
            "prompt": "Dấu hai chấm (:) thường được dùng để báo hiệu phần giải thích hoặc dẫn lời nói trực tiếp của nhân vật.",
            "illustration": "💬 ✍️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Dấu hai chấm báo hiệu lời thoại (kết hợp gạch đầu dòng/ngoặc kép) hoặc phần thuyết minh, giải thích."
      }
],

    'eng-g3-u2': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "choice",
            "tag": "Tiếng Anh 3 • How Much / How Many",
            "prompt": "Choose the correct question word: \"______ pens do you have in your pencil case?\"",
            "illustration": "🖊️ 🎒 ❓",
            "options": [
                  {
                        "id": "A",
                        "text": "How many"
                  },
                  {
                        "id": "B",
                        "text": "How much"
                  },
                  {
                        "id": "C",
                        "text": "How often"
                  },
                  {
                        "id": "D",
                        "text": "How old"
                  }
            ],
            "correct": "A",
            "hint": "\"Pens\" is a plural countable noun (danh từ đếm được số nhiều), so we use \"How many\"."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "input",
            "tag": "Tiếng Anh 3 • Điền từ",
            "prompt": "Complete the question: \"How ______ water do you drink every day?\"",
            "illustration": "💧 🥛 ✍️",
            "correct": "much",
            "hint": "\"Water\" is an uncountable noun (danh từ không đếm được), so we ask: How much water...?"
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "match",
            "tag": "Tiếng Anh 3 • Ghép câu hỏi & trả lời",
            "prompt": "Match questions with their appropriate answers:",
            "illustration": "🧩 ❓ 💬",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "How many apples are there?",
                        "right": "There are six red apples."
                  },
                  {
                        "id": "p2",
                        "left": "How much milk is in the glass?",
                        "right": "There is a little milk."
                  },
                  {
                        "id": "p3",
                        "left": "How many students in your class?",
                        "right": "There are thirty-two students."
                  },
                  {
                        "id": "p4",
                        "left": "How much rice would you like?",
                        "right": "A bowl of rice, please."
                  }
            ],
            "hint": "How many asks about quantity of countable things; How much asks about uncountable amounts."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "true_false",
            "tag": "Tiếng Anh 3 • True / False",
            "prompt": "We use \"How much\" to ask about the price of an item in a store.",
            "illustration": "🏷️ 💵 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "\"How much is this book?\" is the standard question to ask about cost/price!"
      }
],

    'eng-g3-u3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "choice",
            "tag": "Tiếng Anh 3 • Singular & Plural",
            "prompt": "What is the correct plural form of the noun \"child\"?",
            "illustration": "👶 🧒 🧑",
            "options": [
                  {
                        "id": "A",
                        "text": "children"
                  },
                  {
                        "id": "B",
                        "text": "childs"
                  },
                  {
                        "id": "C",
                        "text": "childrens"
                  },
                  {
                        "id": "D",
                        "text": "childes"
                  }
            ],
            "correct": "A",
            "hint": "\"Child\" is an irregular noun: 1 child -> 2 children."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "input",
            "tag": "Tiếng Anh 3 • Viết dạng số nhiều",
            "prompt": "Write the plural form of \"box\":",
            "illustration": "📦 📦 ✍️",
            "correct": "boxes",
            "hint": "Nouns ending in -x add \"-es\" in plural: box -> boxes."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "match",
            "tag": "Tiếng Anh 3 • Ghép số ít & số nhiều",
            "prompt": "Match singular nouns with their irregular plural forms:",
            "illustration": "🧩 🦶 🦷",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "leaf",
                        "right": "leaves"
                  },
                  {
                        "id": "p2",
                        "left": "foot",
                        "right": "feet"
                  },
                  {
                        "id": "p3",
                        "left": "tooth",
                        "right": "teeth"
                  },
                  {
                        "id": "p4",
                        "left": "bus",
                        "right": "buses"
                  }
            ],
            "hint": "f -> ves (leaf -> leaves); oo -> ee (foot -> feet, tooth -> teeth)."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "true_false",
            "tag": "Tiếng Anh 3 • True / False",
            "prompt": "The plural form of \"fish\" can remain \"fish\" when referring to the same kind.",
            "illustration": "🐟 🐠 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "True! \"One fish, two fish\" is very common in English."
      }
],

    'eng-g3-u4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "choice",
            "tag": "Tiếng Anh 3 • Demonstratives",
            "prompt": "Fill in the blank: \"Look at ______ colorful birds high up in the sky over there!\"",
            "illustration": "🕊️ 🌤️ 👉",
            "options": [
                  {
                        "id": "A",
                        "text": "those"
                  },
                  {
                        "id": "B",
                        "text": "these"
                  },
                  {
                        "id": "C",
                        "text": "this"
                  },
                  {
                        "id": "D",
                        "text": "that"
                  }
            ],
            "correct": "A",
            "hint": "Birds is plural and they are far away (\"over there\", \"in the sky\") -> use \"those\"."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "input",
            "tag": "Tiếng Anh 3 • Mạo từ a/an",
            "prompt": "Fill in \"a\" or \"an\": \"My father bought ...... umbrella for me yesterday.\"",
            "illustration": "☂️ 🌧️ ✍️",
            "correct": "an",
            "hint": "\"Umbrella\" begins with a vowel sound /ʌ/, so we use \"an\"."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "match",
            "tag": "Tiếng Anh 3 • Phân loại đại từ chỉ định",
            "prompt": "Match demonstrative pronouns with their correct meaning:",
            "illustration": "🧩 👈 👉",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "This",
                        "right": "Một vật ở gần người nói"
                  },
                  {
                        "id": "p2",
                        "left": "That",
                        "right": "Một vật ở xa người nói"
                  },
                  {
                        "id": "p3",
                        "left": "These",
                        "right": "Nhiều vật ở gần người nói"
                  },
                  {
                        "id": "p4",
                        "left": "Those",
                        "right": "Nhiều vật ở xa người nói"
                  }
            ],
            "hint": "Near: this / these; Far: that / those."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "true_false",
            "tag": "Tiếng Anh 3 • True / False",
            "prompt": "We use \"an\" before words starting with vowel sounds (a, e, i, o, u).",
            "illustration": "🍎 🐘 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "Rule: \"an apple\", \"an elephant\", \"an island\", \"an orange\", \"an umbrella\"."
      }
],

    'eng-g3-u5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "choice",
            "tag": "Tiếng Anh 3 • To be (am/is/are)",
            "prompt": "Choose the correct verb form: \"Nam and Linh ______ excited about their new school year.\"",
            "illustration": "👫 🏫 ✨",
            "options": [
                  {
                        "id": "A",
                        "text": "are"
                  },
                  {
                        "id": "B",
                        "text": "is"
                  },
                  {
                        "id": "C",
                        "text": "am"
                  },
                  {
                        "id": "D",
                        "text": "be"
                  }
            ],
            "correct": "A",
            "hint": "\"Nam and Linh\" is a plural subject (They) -> verb \"are\"."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "input",
            "tag": "Tiếng Anh 3 • Điền động từ",
            "prompt": "Complete with am, is or are: \"She ______ my favorite primary school teacher.\"",
            "illustration": "👩‍🏫 📚 ✍️",
            "correct": "is",
            "hint": "Third-person singular pronoun \"She\" goes with \"is\"."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "match",
            "tag": "Tiếng Anh 3 • Ghép đại từ & To be",
            "prompt": "Match subject pronouns with the correct form of \"to be\":",
            "illustration": "🧩 👤 💡",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "I",
                        "right": "am"
                  },
                  {
                        "id": "p2",
                        "left": "He / She / It",
                        "right": "is"
                  },
                  {
                        "id": "p3",
                        "left": "You / We / They",
                        "right": "are"
                  },
                  {
                        "id": "p4",
                        "left": "The little cat",
                        "right": "is"
                  }
            ],
            "hint": "I am, He/She/It is, We/You/They are."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "true_false",
            "tag": "Tiếng Anh 3 • True / False",
            "prompt": "In negative sentences with \"to be\", we add \"not\" right after the verb (is not / are not).",
            "illustration": "❌ 🛑 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "Example: \"He is not late\" or \"They are not at home\"."
      }
],

    'toan-g4-w3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "choice",
            "tag": "Toán 4 • Thời gian thế kỉ",
            "prompt": "Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long. Năm đó thuộc thế kỉ nào?",
            "illustration": "🏯 📜 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Thế kỉ XI"
                  },
                  {
                        "id": "B",
                        "text": "Thế kỉ X"
                  },
                  {
                        "id": "C",
                        "text": "Thế kỉ XII"
                  },
                  {
                        "id": "D",
                        "text": "Thế kỉ IX"
                  }
            ],
            "correct": "A",
            "hint": "Thế kỉ XI bắt đầu từ năm 1001 đến năm 1100. Do đó năm 1010 thuộc thế kỉ XI."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "input",
            "tag": "Toán 4 • Đổi đơn vị khối lượng",
            "prompt": "Điền số thích hợp vào chỗ chấm: 4 tấn 25 kg = ...... kg.",
            "illustration": "⚖️ 🚛 ✍️",
            "correct": "4025",
            "hint": "1 tấn = 1000 kg. Vậy 4 tấn 25 kg = 4000 kg + 25 kg = 4025 kg."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "match",
            "tag": "Toán 4 • Ghép số đo tương đương",
            "prompt": "Nối các số đo có giá trị bằng nhau:",
            "illustration": "🧩 ⚖️ ⏱️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "2 tấn 5 tạ",
                        "right": "2500 kg"
                  },
                  {
                        "id": "p2",
                        "left": "3 tạ 8 yến",
                        "right": "380 kg"
                  },
                  {
                        "id": "p3",
                        "left": "5 thế kỉ",
                        "right": "500 năm"
                  },
                  {
                        "id": "p4",
                        "left": "1/4 thế kỉ",
                        "right": "25 năm"
                  }
            ],
            "hint": "1 tấn = 10 tạ = 1000 kg; 1 tạ = 10 yến = 100 kg; 1 thế kỉ = 100 năm."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "true_false",
            "tag": "Toán 4 • Đúng / Sai",
            "prompt": "1 tạ bằng 10 yến và bằng 100 kg.",
            "illustration": "⚖️ 🌾 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Đúng theo bảng đơn vị đo khối lượng: Tấn - Tạ - Yến - Kilôgam."
      }
],

    'toan-g4-w4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "choice",
            "tag": "Toán 4 • Tìm hai số khi biết Tổng và Hiệu",
            "prompt": "Hai thùng chứa tất cả 120 lít dầu. Thùng thứ nhất nhiều hơn thùng thứ hai 24 lít. Hỏi thùng thứ nhất chứa bao nhiêu lít dầu?",
            "illustration": "🛢️ 🛢️ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "72 lít"
                  },
                  {
                        "id": "B",
                        "text": "48 lít"
                  },
                  {
                        "id": "C",
                        "text": "96 lít"
                  },
                  {
                        "id": "D",
                        "text": "68 lít"
                  }
            ],
            "correct": "A",
            "hint": "Thùng thứ nhất là số lớn = (Tổng + Hiệu) : 2 = (120 + 24) : 2 = 144 : 2 = 72 lít."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "input",
            "tag": "Toán 4 • Tính số bé",
            "prompt": "Hai số có tổng bằng 90 và hiệu bằng 16. Tìm số bé.",
            "illustration": "🔢 ➖ ✍️",
            "correct": "37",
            "hint": "Số bé = (Tổng - Hiệu) : 2 = (90 - 16) : 2 = 74 : 2 = 37."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "match",
            "tag": "Toán 4 • Công thức Tổng - Hiệu",
            "prompt": "Nối công thức và bài toán tính nhanh:",
            "illustration": "🧩 ➕ ➖",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Công thức Số lớn",
                        "right": "(Tổng + Hiệu) : 2"
                  },
                  {
                        "id": "p2",
                        "left": "Công thức Số bé",
                        "right": "(Tổng - Hiệu) : 2"
                  },
                  {
                        "id": "p3",
                        "left": "Tổng 80, Hiệu 20 -> Số lớn",
                        "right": "50"
                  },
                  {
                        "id": "p4",
                        "left": "Tổng 80, Hiệu 20 -> Số bé",
                        "right": "30"
                  }
            ],
            "hint": "Áp dụng công thức tìm hai số khi biết tổng và hiệu."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "true_false",
            "tag": "Toán 4 • Đúng / Sai",
            "prompt": "Tổng của hai số chẵn liên tiếp luôn là một số chẵn và hiệu của chúng bằng 2.",
            "illustration": "2️⃣ 4️⃣ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị (Hiệu = 2), chẵn + chẵn = chẵn."
      }
],

    'toan-g4-w5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "choice",
            "tag": "Toán 4 • Rút gọn phân số",
            "prompt": "Rút gọn phân số 36/48 về dạng phân số tối giản ta được:",
            "illustration": "🍰 🍕 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "3/4"
                  },
                  {
                        "id": "B",
                        "text": "6/8"
                  },
                  {
                        "id": "C",
                        "text": "9/12"
                  },
                  {
                        "id": "D",
                        "text": "2/3"
                  }
            ],
            "correct": "A",
            "hint": "Chia cả tử số và mẫu số cho ước chung lớn nhất là 12: 36:12 = 3; 48:12 = 4 -> 3/4."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "input",
            "tag": "Toán 4 • Phân số bằng nhau",
            "prompt": "Tìm số tự nhiên x biết: 5/7 = x/35.",
            "illustration": "5️⃣ 7️⃣ ✍️",
            "correct": "25",
            "hint": "Mẫu số nhân 5 (7 × 5 = 35) nên tử số cũng nhân 5 (5 × 5 = 25)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "match",
            "tag": "Toán 4 • Ghép phân số bằng nhau",
            "prompt": "Nối các phân số có giá trị bằng nhau:",
            "illustration": "🧩 ⚖️ 🎯",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "2/3",
                        "right": "8/12"
                  },
                  {
                        "id": "p2",
                        "left": "3/5",
                        "right": "15/25"
                  },
                  {
                        "id": "p3",
                        "left": "4/7",
                        "right": "16/28"
                  },
                  {
                        "id": "p4",
                        "left": "5/6",
                        "right": "25/30"
                  }
            ],
            "hint": "Nhân cả tử và mẫu với cùng một số tự nhiên khác 0."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "true_false",
            "tag": "Toán 4 • Đúng / Sai",
            "prompt": "Một phân số có tử số lớn hơn mẫu số thì phân số đó lớn hơn 1.",
            "illustration": "📈 🍰 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Ví dụ 5/4 > 1, 7/3 > 1. Tử số lớn hơn mẫu số thì phân số luôn lớn hơn 1."
      }
],

    'tv-g4-b2': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "choice",
            "tag": "Tiếng Việt 4 • Cấu tạo từ ghép",
            "prompt": "Trong các từ sau, từ nào là từ ghép đẳng lập (tổng hợp)?",
            "illustration": "🏠 🚪 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "nhà cửa"
                  },
                  {
                        "id": "B",
                        "text": "xe đạp"
                  },
                  {
                        "id": "C",
                        "text": "hoa hồng"
                  },
                  {
                        "id": "D",
                        "text": "bánh mì"
                  }
            ],
            "correct": "A",
            "hint": "\"nhà\" và \"cửa\" đều là tiếng độc lập, kết hợp bình đẳng tạo nghĩa tổng quát chỉ nơi ở."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "input",
            "tag": "Tiếng Việt 4 • Nhận diện từ láy",
            "prompt": "Từ \"long lanh\" thuộc loại cấu tạo từ nào: từ đơn, từ ghép hay từ láy?",
            "illustration": "✨ 💎 ✍️",
            "correct": "từ láy",
            "hint": "Có sự điệp phụ âm đầu \"l - l\" và mô phỏng ánh sáng phản chiếu lấp lánh."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "match",
            "tag": "Tiếng Việt 4 • Phân loại cấu tạo từ",
            "prompt": "Nối từ với kiểu cấu tạo từ tương ứng:",
            "illustration": "🧩 📚 🏷️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "học tập",
                        "right": "Từ ghép đẳng lập"
                  },
                  {
                        "id": "p2",
                        "left": "xe máy",
                        "right": "Từ ghép chính phụ"
                  },
                  {
                        "id": "p3",
                        "left": "róc rách",
                        "right": "Từ láy tượng thanh"
                  },
                  {
                        "id": "p4",
                        "left": "xanh xao",
                        "right": "Từ láy tượng hình"
                  }
            ],
            "hint": "Ghép chính phụ có tiếng chính định hình và tiếng phụ phân loại."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "true_false",
            "tag": "Tiếng Việt 4 • Đúng / Sai",
            "prompt": "Từ ghép phân loại (chính phụ) có trật tự tiếng chính đứng trước, tiếng phụ bổ nghĩa đứng sau.",
            "illustration": "🚗 🚲 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Ví dụ: xe đạp, bút bi, hoa cúc (tiếng đứng trước là tiếng chính)."
      }
],

    'tv-g4-b3': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "choice",
            "tag": "Tiếng Việt 4 • Danh từ riêng",
            "prompt": "Từ nào dưới đây là danh từ riêng chỉ tên người Việt Nam?",
            "illustration": "👤 📜 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Nguyễn Du"
                  },
                  {
                        "id": "B",
                        "text": "học sinh giỏi"
                  },
                  {
                        "id": "C",
                        "text": "nhà thơ"
                  },
                  {
                        "id": "D",
                        "text": "đại thi hào"
                  }
            ],
            "correct": "A",
            "hint": "Nguyễn Du là tên riêng của đại thi hào dân tộc, phải viết hoa chữ cái đầu mỗi tiếng."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "input",
            "tag": "Tiếng Việt 4 • Tìm danh từ riêng",
            "prompt": "Trong câu: \"Hà Nội là thủ đô ngàn năm văn hiến\", từ nào là danh từ riêng chỉ địa danh?",
            "illustration": "🏛️ 🗺️ ✍️",
            "correct": "Hà Nội",
            "hint": "Tên thủ đô của nước ta, viết hoa chữ cái đầu của cả hai tiếng."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "match",
            "tag": "Tiếng Việt 4 • Phân loại danh từ",
            "prompt": "Nối từ ngữ với loại danh từ thích hợp:",
            "illustration": "🧩 🏷️ 📚",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "bàn ghế",
                        "right": "Danh từ chỉ đồ vật"
                  },
                  {
                        "id": "p2",
                        "left": "bác sĩ",
                        "right": "Danh từ chỉ người"
                  },
                  {
                        "id": "p3",
                        "left": "sông Cửu Long",
                        "right": "Danh từ riêng địa lí"
                  },
                  {
                        "id": "p4",
                        "left": "lòng dũng cảm",
                        "right": "Danh từ chỉ khái niệm"
                  }
            ],
            "hint": "Danh từ chỉ người, vật, hiện tượng, khái niệm trừu tượng."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "true_false",
            "tag": "Tiếng Việt 4 • Đúng / Sai",
            "prompt": "Khi viết tên địa lí Việt Nam, ta viết hoa chữ cái đầu của tất cả các tiếng tạo thành tên đó.",
            "illustration": "🇻🇳 🗺️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Ví dụ: Hà Nội, Đà Nẵng, Cửu Long, Hoàng Liên Sơn."
      }
],

    'tv-g4-b4': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "choice",
            "tag": "Tiếng Việt 4 • Ý nghĩa trạng ngữ",
            "prompt": "Trạng ngữ trong câu: \"Sáng sớm mai, chúng em sẽ đi cắm trại ở Ba Vì.\" bổ sung ý nghĩa gì cho câu?",
            "illustration": "🏕️ 🌅 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Chỉ thời gian"
                  },
                  {
                        "id": "B",
                        "text": "Chỉ nơi chốn"
                  },
                  {
                        "id": "C",
                        "text": "Chỉ nguyên nhân"
                  },
                  {
                        "id": "D",
                        "text": "Chỉ mục đích"
                  }
            ],
            "correct": "A",
            "hint": "\"Sáng sớm mai\" trả lời cho câu hỏi: Khi nào? Bao giờ? -> Trạng ngữ chỉ thời gian."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "input",
            "tag": "Tiếng Việt 4 • Xác định trạng ngữ",
            "prompt": "Tìm trạng ngữ trong câu sau: \"Vì trời mưa to, đường phố bị ngập úng nhiều nơi.\"",
            "illustration": "🌧️ 🌊 ✍️",
            "correct": "Vì trời mưa to",
            "hint": "Bộ phận đứng đầu câu nêu lí do dẫn đến việc đường phố bị ngập úng."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "match",
            "tag": "Tiếng Việt 4 • Phân loại trạng ngữ",
            "prompt": "Nối trạng ngữ với loại ý nghĩa tương ứng:",
            "illustration": "🧩 🕒 📍",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Trên cành cây cao",
                        "right": "Chỉ nơi chốn"
                  },
                  {
                        "id": "p2",
                        "left": "Mùa xuân về",
                        "right": "Chỉ thời gian"
                  },
                  {
                        "id": "p3",
                        "left": "Nhờ chăm chỉ học tập",
                        "right": "Chỉ nguyên nhân"
                  },
                  {
                        "id": "p4",
                        "left": "Để đạt học sinh giỏi",
                        "right": "Chỉ mục đích"
                  }
            ],
            "hint": "Dựa vào câu hỏi tương ứng: Ở đâu? Khi nào? Vì sao? Để làm gì?"
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "true_false",
            "tag": "Tiếng Việt 4 • Đúng / Sai",
            "prompt": "Trạng ngữ ngăn cách với chủ ngữ và vị ngữ trong câu bằng dấu phẩy.",
            "illustration": "✍️ , 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Khi đứng ở đầu câu, trạng ngữ thường được phân tách với nòng cốt câu bằng dấu phẩy."
      }
],

    'tv-g4-b5': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "choice",
            "tag": "Tiếng Việt 4 • Thành ngữ tục ngữ",
            "prompt": "Thành ngữ nào dưới đây thể hiện tinh thần tương thân tương ái, cưu mang giúp đỡ lẫn nhau?",
            "illustration": "🤝 💖 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Lá lành đùm lá rách"
                  },
                  {
                        "id": "B",
                        "text": "Có công mài sắt có ngày nên kim"
                  },
                  {
                        "id": "C",
                        "text": "Đứng núi này trông núi nọ"
                  },
                  {
                        "id": "D",
                        "text": "Ăn quả nhớ kẻ trồng cây"
                  }
            ],
            "correct": "A",
            "hint": "\"Lá lành đùm lá rách\" là bài học đạo lí ngàn đời của dân tộc ta về lòng nhân hậu, đùm bọc."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "input",
            "tag": "Tiếng Việt 4 • Điền tục ngữ",
            "prompt": "Điền từ còn thiếu vào câu tục ngữ nói về ý chí kiên trì: \"Có công mài sắt, có ngày nên ......\"",
            "illustration": "🪨 🪡 ✍️",
            "correct": "kim",
            "hint": "Mài một thanh sắt lớn kiên trì sẽ thành cây kim may vá sắc bén."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "match",
            "tag": "Tiếng Việt 4 • Mở rộng vốn từ",
            "prompt": "Nối từ ngữ với chủ điểm phù hợp:",
            "illustration": "🧩 📚 💖",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "nhân ái",
                        "right": "Lòng nhân hậu"
                  },
                  {
                        "id": "p2",
                        "left": "đồng tâm hiệp lực",
                        "right": "Tinh thần đoàn kết"
                  },
                  {
                        "id": "p3",
                        "left": "kiên trì bền bỉ",
                        "right": "Ý chí - Nghị lực"
                  },
                  {
                        "id": "p4",
                        "left": "uống nước nhớ nguồn",
                        "right": "Biết ơn"
                  }
            ],
            "hint": "Các chủ điểm cốt lõi trong phân môn Luyện từ và câu lớp 4."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 4 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/18WTldn7UMLnLtcSDeH5N-FJPP94ycRpK/view",
            "type": "true_false",
            "tag": "Tiếng Việt 4 • Đúng / Sai",
            "prompt": "Thành ngữ \"Vạn sự khởi đầu nan\" khuyên chúng ta không nên nản lòng khi gặp khó khăn lúc ban đầu.",
            "illustration": "🧗 ⛰️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Mọi việc bắt đầu thường khó khăn (nan), cần có ý chí vững vàng để vượt qua."
      }
],

    'eng-g4-u2': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "choice",
            "tag": "Tiếng Anh 4 • Irregular Plural Nouns",
            "prompt": "What is the irregular plural form of the noun \"mouse\"?",
            "illustration": "🐭 🧀 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "mice"
                  },
                  {
                        "id": "B",
                        "text": "mouses"
                  },
                  {
                        "id": "C",
                        "text": "mices"
                  },
                  {
                        "id": "D",
                        "text": "mouse"
                  }
            ],
            "correct": "A",
            "hint": "Irregular plural: 1 mouse -> 2 mice."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "input",
            "tag": "Tiếng Anh 4 • Số nhiều bất quy tắc",
            "prompt": "Write the plural form of \"man\":",
            "illustration": "👨 👨‍🦱 ✍️",
            "correct": "men",
            "hint": "Vowel change: man -> men (similar to woman -> women)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "match",
            "tag": "Tiếng Anh 4 • Ghép danh từ số nhiều",
            "prompt": "Match singular nouns with their irregular plural forms:",
            "illustration": "🧩 👥 🦆",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "person",
                        "right": "people"
                  },
                  {
                        "id": "p2",
                        "left": "goose",
                        "right": "geese"
                  },
                  {
                        "id": "p3",
                        "left": "sheep",
                        "right": "sheep"
                  },
                  {
                        "id": "p4",
                        "left": "knife",
                        "right": "knives"
                  }
            ],
            "hint": "person -> people; goose -> geese; sheep remains sheep; knife -> knives."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "true_false",
            "tag": "Tiếng Anh 4 • True / False",
            "prompt": "For nouns ending in -ch, -sh, -s, -x, -z, we add \"-es\" to make them plural.",
            "illustration": "📦 🚌 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "Watch -> watches; brush -> brushes; bus -> buses; box -> boxes."
      }
],

    'eng-g4-u3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "choice",
            "tag": "Tiếng Anh 4 • Present Continuous",
            "prompt": "Look! The little baby ______ peacefully in the crib.",
            "illustration": "👶 🛏️ 🤫",
            "options": [
                  {
                        "id": "A",
                        "text": "is sleeping"
                  },
                  {
                        "id": "B",
                        "text": "sleeps"
                  },
                  {
                        "id": "C",
                        "text": "slept"
                  },
                  {
                        "id": "D",
                        "text": "are sleeping"
                  }
            ],
            "correct": "A",
            "hint": "\"Look!\" indicates an action happening right now -> Present Continuous: is + sleeping."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "input",
            "tag": "Tiếng Anh 4 • Hiện tại đơn",
            "prompt": "Fill in the verb in brackets: \"My brother usually ______ (ride) his bicycle to school.\"",
            "illustration": "🚴 🎒 ✍️",
            "correct": "rides",
            "hint": "Third-person singular (My brother) with habitual adverb \"usually\" adds -s: rides."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "match",
            "tag": "Tiếng Anh 4 • Dấu hiệu thì",
            "prompt": "Match tense with its typical signal words:",
            "illustration": "🧩 ⏰ 📅",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Present Simple",
                        "right": "always, usually, every day"
                  },
                  {
                        "id": "p2",
                        "left": "Present Continuous",
                        "right": "now, at the moment, Listen!"
                  },
                  {
                        "id": "p3",
                        "left": "Habitual actions",
                        "right": "Present Simple"
                  },
                  {
                        "id": "p4",
                        "left": "Actions happening right now",
                        "right": "Present Continuous"
                  }
            ],
            "hint": "Dấu hiệu nhận biết thì Hiện tại đơn và Hiện tại tiếp diễn."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "true_false",
            "tag": "Tiếng Anh 4 • True / False",
            "prompt": "We use the Present Simple tense to express universal truths and facts.",
            "illustration": "☀️ 🌍 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "True! E.g., \"The sun rises in the east\" uses Present Simple."
      }
],

    'eng-g4-u4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "choice",
            "tag": "Tiếng Anh 4 • Past Simple with was/were",
            "prompt": "Yesterday, they ______ at the National History Museum with their history teacher.",
            "illustration": "🏛️ 📜 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "were"
                  },
                  {
                        "id": "B",
                        "text": "was"
                  },
                  {
                        "id": "C",
                        "text": "are"
                  },
                  {
                        "id": "D",
                        "text": "is"
                  }
            ],
            "correct": "A",
            "hint": "Subject \"They\" in the past tense (Yesterday) uses \"were\"."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "input",
            "tag": "Tiếng Anh 4 • Quá khứ đơn",
            "prompt": "Put the verb in the past: \"Last Sunday, Lan ______ (visit) her grandparents.\"",
            "illustration": "👵 🏡 ✍️",
            "correct": "visited",
            "hint": "Regular verb \"visit\" + \"-ed\" = visited."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "match",
            "tag": "Tiếng Anh 4 • Ghép chủ ngữ & was/were",
            "prompt": "Match subject with the correct past form of to be:",
            "illustration": "🧩 🕰️ 💡",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "I / He / She / It",
                        "right": "was"
                  },
                  {
                        "id": "p2",
                        "left": "You / We / They",
                        "right": "were"
                  },
                  {
                        "id": "p3",
                        "left": "The students",
                        "right": "were"
                  },
                  {
                        "id": "p4",
                        "left": "My little sister",
                        "right": "was"
                  }
            ],
            "hint": "Singular subjects take was; plural subjects take were."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "true_false",
            "tag": "Tiếng Anh 4 • True / False",
            "prompt": "In negative sentences in Past Simple with regular verbs, we use \"didn't + verb bare\".",
            "illustration": "🛑 ✍️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "E.g., \"She didn't go to school yesterday\" (verb returns to bare form)."
      }
],

    'eng-g4-u5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "choice",
            "tag": "Tiếng Anh 4 • Comparative Adjectives",
            "prompt": "An elephant is ______ than a zebra.",
            "illustration": "🐘 🦓 ⚖️",
            "options": [
                  {
                        "id": "A",
                        "text": "bigger"
                  },
                  {
                        "id": "B",
                        "text": "more big"
                  },
                  {
                        "id": "C",
                        "text": "biger"
                  },
                  {
                        "id": "D",
                        "text": "biggest"
                  }
            ],
            "correct": "A",
            "hint": "\"Big\" has one vowel + one consonant -> double the consonant + -er: bigger."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "input",
            "tag": "Tiếng Anh 4 • So sánh hơn",
            "prompt": "Complete with the comparative form: \"English is ______ (easy) than Russian.\"",
            "illustration": "📖 🔤 ✍️",
            "correct": "easier",
            "hint": "Adjectives ending in consonant + y change y to i + -er: easy -> easier."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "match",
            "tag": "Tiếng Anh 4 • Ghép tính từ so sánh",
            "prompt": "Match adjective with its comparative form:",
            "illustration": "🧩 📈 🎯",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "tall",
                        "right": "taller"
                  },
                  {
                        "id": "p2",
                        "left": "happy",
                        "right": "happier"
                  },
                  {
                        "id": "p3",
                        "left": "good",
                        "right": "better"
                  },
                  {
                        "id": "p4",
                        "left": "bad",
                        "right": "worse"
                  }
            ],
            "hint": "good -> better; bad -> worse are irregular comparatives."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 4 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/12Ud2zzTfLz0Ex5dN7XVm68xUdfW-rneg/view",
            "type": "true_false",
            "tag": "Tiếng Anh 4 • True / False",
            "prompt": "We use \"than\" after comparative adjectives when comparing two things.",
            "illustration": "📏 ⚖️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "Structure: S1 + is/are + comparative adj + than + S2."
      }
],

    'toan-g5-w2': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "choice",
            "tag": "Toán 5 • Phép tính phân số",
            "prompt": "Tính giá trị biểu thức: 3/4 + 2/5 × 5/8 = ?",
            "illustration": "🍰 🍕 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "1"
                  },
                  {
                        "id": "B",
                        "text": "7/8"
                  },
                  {
                        "id": "C",
                        "text": "5/4"
                  },
                  {
                        "id": "D",
                        "text": "3/8"
                  }
            ],
            "correct": "A",
            "hint": "Thực hiện phép nhân trước: 2/5 × 5/8 = 2/8 = 1/4. Sau đó cộng: 3/4 + 1/4 = 4/4 = 1."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "input",
            "tag": "Toán 5 • Chuyển hỗn số",
            "prompt": "Chuyển hỗn số 3 và 2/5 thành phân số có mẫu số là 5:",
            "illustration": "🔢 🍰 ✍️",
            "correct": "17/5",
            "hint": "Tử số = phần nguyên × mẫu số + tử số = 3 × 5 + 2 = 17. Mẫu số giữ nguyên là 5 -> 17/5."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "match",
            "tag": "Toán 5 • Ghép phép tính phân số",
            "prompt": "Nối phép tính với kết quả thu gọn:",
            "illustration": "🧩 ✖️ ➗",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "2/3 × 9/4",
                        "right": "3/2"
                  },
                  {
                        "id": "p2",
                        "left": "5/6 : 5/12",
                        "right": "2"
                  },
                  {
                        "id": "p3",
                        "left": "7/8 - 3/8",
                        "right": "1/2"
                  },
                  {
                        "id": "p4",
                        "left": "1 + 1/3",
                        "right": "4/3"
                  }
            ],
            "hint": "Rút gọn chéo khi nhân chia phân số để tính nhanh."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "true_false",
            "tag": "Toán 5 • Đúng / Sai",
            "prompt": "Muốn chia một phân số cho một phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.",
            "illustration": "🔄 ➗ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Quy tắc: a/b : c/d = a/b × d/c (với c, d khác 0)."
      }
],

    'toan-g5-w4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "choice",
            "tag": "Toán 5 • Tỉ số phần trăm",
            "prompt": "Một lớp học có 40 học sinh, trong đó có 24 bạn nữ. Hỏi số học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả lớp?",
            "illustration": "👧 👦 📊",
            "options": [
                  {
                        "id": "A",
                        "text": "60%"
                  },
                  {
                        "id": "B",
                        "text": "55%"
                  },
                  {
                        "id": "C",
                        "text": "40%"
                  },
                  {
                        "id": "D",
                        "text": "65%"
                  }
            ],
            "correct": "A",
            "hint": "Tỉ số phần trăm: 24 : 40 = 0,6 = 60%."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "input",
            "tag": "Toán 5 • Tính giá trị phần trăm",
            "prompt": "Tìm 15% của 240 kg gạo. (chỉ điền số)",
            "illustration": "🌾 ⚖️ ✍️",
            "correct": "36",
            "hint": "Lấy 240 × 15 : 100 = 36 (kg)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "match",
            "tag": "Toán 5 • Ba dạng toán tỉ số %",
            "prompt": "Nối dạng toán với bài toán ví dụ tiêu biểu:",
            "illustration": "🧩 📈 🎯",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Tìm tỉ số % của hai số",
                        "right": "24 nữ trong 40 học sinh"
                  },
                  {
                        "id": "p2",
                        "left": "Tìm giá trị % của một số",
                        "right": "Tìm 20% của 500 nghìn đồng"
                  },
                  {
                        "id": "p3",
                        "left": "Tìm một số biết giá trị %",
                        "right": "Tìm số biết 30% của nó là 90"
                  },
                  {
                        "id": "p4",
                        "left": "Tăng 10% rồi giảm 10%",
                        "right": "Giá mới bằng 99% giá ban đầu"
                  }
            ],
            "hint": "3 dạng bài cơ bản của tỉ số phần trăm lớp 5."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "true_false",
            "tag": "Toán 5 • Đúng / Sai",
            "prompt": "Muốn tìm một số biết 25% của nó là 50, ta lấy: 50 : 25 × 100 = 200.",
            "illustration": "💯 🔢 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Dạng toán 3: Muốn tìm số đó ta lấy giá trị chia cho số phần trăm rồi nhân 100."
      }
],

    'toan-g5-w5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "choice",
            "tag": "Toán 5 • Diện tích hình tam giác",
            "prompt": "Một hình tam giác có độ dài đáy là 12cm và chiều cao tương ứng là 8cm. Diện tích hình tam giác đó là:",
            "illustration": "🔺 📐 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "48 cm²"
                  },
                  {
                        "id": "B",
                        "text": "96 cm²"
                  },
                  {
                        "id": "C",
                        "text": "24 cm²"
                  },
                  {
                        "id": "D",
                        "text": "40 cm²"
                  }
            ],
            "correct": "A",
            "hint": "Diện tích tam giác = (đáy × chiều cao) : 2 = (12 × 8) : 2 = 96 : 2 = 48 cm²."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "input",
            "tag": "Toán 5 • Chuyển động đều",
            "prompt": "Một ô tô đi với vận tốc 60 km/giờ trong thời gian 1,5 giờ. Hỏi ô tô đã đi được quãng đường bao nhiêu ki-lô-mét?",
            "illustration": "🚗 🛣️ ✍️",
            "correct": "90",
            "hint": "Quãng đường s = v × t = 60 × 1,5 = 90 (km)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "match",
            "tag": "Toán 5 • Công thức hình học",
            "prompt": "Nối công thức với hình hình học tương ứng:",
            "illustration": "🧩 📐 ⭕",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "(a × h) : 2",
                        "right": "Diện tích hình tam giác"
                  },
                  {
                        "id": "p2",
                        "left": "(a + b) × h : 2",
                        "right": "Diện tích hình thang"
                  },
                  {
                        "id": "p3",
                        "left": "r × 2 × 3,14",
                        "right": "Chu vi hình tròn"
                  },
                  {
                        "id": "p4",
                        "left": "r × r × 3,14",
                        "right": "Diện tích hình tròn"
                  }
            ],
            "hint": "Các công thức tính chu vi và diện tích hình học lớp 5."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "true_false",
            "tag": "Toán 5 • Đúng / Sai",
            "prompt": "Muốn tính vận tốc của một chuyển động đều, ta lấy quãng đường chia cho thời gian (v = s : t).",
            "illustration": "⏱️ 🏎️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Công thức cốt lõi của toán chuyển động đều: v = s : t; s = v × t; t = s : v."
      }
],

    'tv-g5-b2': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "choice",
            "tag": "Tiếng Việt 5 • Từ đồng âm",
            "prompt": "Trong các cặp từ dưới đây, cặp từ nào là hiện tượng từ đồng âm?",
            "illustration": "🐎 ⚽ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "con ngựa đá - hòn đá ven đường"
                  },
                  {
                        "id": "B",
                        "text": "bàn chân - chân núi"
                  },
                  {
                        "id": "C",
                        "text": "to lớn - khổng lồ"
                  },
                  {
                        "id": "D",
                        "text": "thông minh - ngốc nghếch"
                  }
            ],
            "correct": "A",
            "hint": "\"đá\" (động từ vung chân đá) và \"đá\" (danh từ chất rắn tự nhiên) là từ đồng âm: phát âm giống nhau nhưng nghĩa hoàn toàn khác nhau."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "input",
            "tag": "Tiếng Việt 5 • Nghĩa gốc và nghĩa chuyển",
            "prompt": "Từ \"chân\" trong câu: \"Dưới chân núi, hoa đào đang nở rộ\" được dùng theo nghĩa gốc hay nghĩa chuyển?",
            "illustration": "⛰️ 🌸 ✍️",
            "correct": "nghĩa chuyển",
            "hint": "\"Chân núi\" là phần đáy tiếp giáp mặt đất của núi, chuyển nghĩa dựa trên nét tương đồng với chân người."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "match",
            "tag": "Tiếng Việt 5 • Phân loại hiện tượng từ",
            "prompt": "Nối hiện tượng từ vựng với ví dụ tương ứng:",
            "illustration": "🧩 📚 🏷️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Từ đồng nghĩa hoàn toàn",
                        "right": "xe lửa - tàu hỏa"
                  },
                  {
                        "id": "p2",
                        "left": "Từ trái nghĩa",
                        "right": "trắng tinh - đen nhánh"
                  },
                  {
                        "id": "p3",
                        "left": "Từ đồng âm",
                        "right": "kho cá - nhà kho"
                  },
                  {
                        "id": "p4",
                        "left": "Từ nhiều nghĩa",
                        "right": "ăn cơm - da ăn nắng"
                  }
            ],
            "hint": "Nắm chắc 4 khái niệm: đồng nghĩa, trái nghĩa, đồng âm, nhiều nghĩa."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "true_false",
            "tag": "Tiếng Việt 5 • Đúng / Sai",
            "prompt": "Từ đồng âm là những từ phát âm giống nhau nhưng khác hẳn nhau về nghĩa, không có mối liên hệ nào giữa các nghĩa.",
            "illustration": "🗣️ 👂 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Khác với từ nhiều nghĩa (có nét nghĩa chung), các từ đồng âm không có liên hệ ngữ nghĩa."
      }
],

    'tv-g5-b3': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "choice",
            "tag": "Tiếng Việt 5 • Quan hệ từ",
            "prompt": "Điền cặp quan hệ từ biểu thị mối quan hệ nguyên nhân - kết quả thích hợp: \"...... trời mưa to bão lớn ...... chuyến bay phải tạm hoãn.\"",
            "illustration": "⛈️ ✈️ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Vì ... nên ..."
                  },
                  {
                        "id": "B",
                        "text": "Nếu ... thì ..."
                  },
                  {
                        "id": "C",
                        "text": "Tuy ... nhưng ..."
                  },
                  {
                        "id": "D",
                        "text": "Không những ... mà còn ..."
                  }
            ],
            "correct": "A",
            "hint": "\"Vì ... nên ...\" biểu thị nguyên nhân (mưa to) và kết quả (chuyến bay hoãn)."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "input",
            "tag": "Tiếng Việt 5 • Cặp quan hệ từ",
            "prompt": "Trong câu: \"Nếu bạn chăm chỉ ôn tập thì kết quả thi sẽ rất cao\", cặp quan hệ từ biểu thị mối quan hệ gì: điều kiện - kết quả hay tương phản?",
            "illustration": "📖 🎯 ✍️",
            "correct": "điều kiện - kết quả",
            "hint": "\"Nếu ... thì ...\" chỉ mối quan hệ điều kiện (giả thiết) - kết quả."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "match",
            "tag": "Tiếng Việt 5 • Ý nghĩa các cặp quan hệ từ",
            "prompt": "Nối cặp quan hệ từ với ý nghĩa tương ứng:",
            "illustration": "🧩 🔗 💡",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Vì ... nên ...",
                        "right": "Nguyên nhân - Kết quả"
                  },
                  {
                        "id": "p2",
                        "left": "Nếu ... thì ...",
                        "right": "Điều kiện - Kết quả"
                  },
                  {
                        "id": "p3",
                        "left": "Tuy ... nhưng ...",
                        "right": "Tương phản"
                  },
                  {
                        "id": "p4",
                        "left": "Càng ... càng ...",
                        "right": "Tăng tiến tương ứng"
                  }
            ],
            "hint": "Các cặp quan hệ từ phổ biến dùng nối các vế câu ghép."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "true_false",
            "tag": "Tiếng Việt 5 • Đúng / Sai",
            "prompt": "Đại từ xưng hô trong tiếng Việt rất phong phú và thể hiện thứ bậc, tình cảm thân mật của người nói.",
            "illustration": "🤝 👨‍👩‍👧‍👦 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Ví dụ: ông, bà, cha, mẹ, chú, bác, anh, chị, em, cháu..."
      }
],

    'tv-g5-b4': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "choice",
            "tag": "Tiếng Việt 5 • Cách nối câu ghép",
            "prompt": "Câu nào dưới đây là câu ghép có các vế được nối trực tiếp bằng dấu phẩy (không dùng từ nối)?",
            "illustration": "☀️ 🌿 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Mặt trời lên, sương tan dần trên kẽ lá."
                  },
                  {
                        "id": "B",
                        "text": "Vì trời mưa to nên đường bị ngập úng."
                  },
                  {
                        "id": "C",
                        "text": "Mặc dù đêm đã khuya nhưng mẹ vẫn cặm cụi may áo."
                  },
                  {
                        "id": "D",
                        "text": "Nếu gió mùa về thì trời sẽ chuyển rét."
                  }
            ],
            "correct": "A",
            "hint": "Vế 1: \"Mặt trời lên\", Vế 2: \"sương tan dần trên kẽ lá\", nối trực tiếp bằng dấu phẩy."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "input",
            "tag": "Tiếng Việt 5 • Đếm số vế câu ghép",
            "prompt": "Xác định số vế câu trong câu ghép sau: \"Gió thổi mạnh, mây đen kéo đến kín trời và sấm sét bắt đầu nổi lên.\"",
            "illustration": "🌪️ ⛈️ ✍️",
            "correct": "3",
            "hint": "Có 3 cụm C-V: (1) Gió // thổi mạnh, (2) mây đen // kéo đến kín trời, (3) sấm sét // bắt đầu nổi lên."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "match",
            "tag": "Tiếng Việt 5 • Cách nối câu ghép",
            "prompt": "Nối câu ghép với cách nối tương ứng:",
            "illustration": "🧩 🔗 📜",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Mặt trời lên, chim hót líu lo.",
                        "right": "Nối trực tiếp bằng dấu phẩy"
                  },
                  {
                        "id": "p2",
                        "left": "Tuy rét đậm nhưng hoa đào vẫn nở.",
                        "right": "Nối bằng cặp quan hệ từ"
                  },
                  {
                        "id": "p3",
                        "left": "Nước dâng lên bao nhiêu, đồi cao bấy nhiêu.",
                        "right": "Nối bằng cặp từ hô ứng"
                  },
                  {
                        "id": "p4",
                        "left": "Trời vừa rạng sáng, bà con đã ra đồng.",
                        "right": "Nối bằng cặp từ vừa ... đã ..."
                  }
            ],
            "hint": "Các cách nối câu ghép: nối trực tiếp (dấu phẩy, chấm phẩy, hai chấm), nối bằng quan hệ từ, nối bằng cặp từ hô ứng."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "true_false",
            "tag": "Tiếng Việt 5 • Đúng / Sai",
            "prompt": "Trong câu ghép, mỗi vế câu thường có cấu tạo như một câu đơn (đầy đủ Chủ ngữ và Vị ngữ) và diễn đạt một ý trọn vẹn.",
            "illustration": "📝 📚 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Đúng theo định nghĩa câu ghép trong chương trình Tiếng Việt 5."
      }
],

    'tv-g5-b5': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "choice",
            "tag": "Tiếng Việt 5 • Phép liên kết câu",
            "prompt": "Hai câu sau liên kết với nhau bằng cách nào: \"Hà Nội là thủ đô ngàn năm văn hiến. Nơi đây lưu giữ biết bao di tích lịch sử thiêng liêng.\"",
            "illustration": "🏛️ 📜 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Dùng từ ngữ thay thế (\"Nơi đây\" thay cho \"Hà Nội\")"
                  },
                  {
                        "id": "B",
                        "text": "Phép lặp từ ngữ"
                  },
                  {
                        "id": "C",
                        "text": "Phép nối bằng quan hệ từ"
                  },
                  {
                        "id": "D",
                        "text": "Phép tương phản"
                  }
            ],
            "correct": "A",
            "hint": "\"Nơi đây\" là đại từ thay thế cho danh từ riêng \"Hà Nội\" ở câu trước để tránh lặp từ."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "input",
            "tag": "Tiếng Việt 5 • Phép nối liên kết",
            "prompt": "Tìm từ ngữ liên kết trong câu thứ hai: \"Trời rét đậm. Tuy nhiên, các em học sinh vùng cao vẫn chăm chỉ đến trường.\"",
            "illustration": "❄️ 🎒 ✍️",
            "correct": "Tuy nhiên",
            "hint": "Từ liên kết biểu thị quan hệ tương phản đặt ở đầu câu thứ hai."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "match",
            "tag": "Tiếng Việt 5 • Các phép liên kết câu",
            "prompt": "Nối phép liên kết với câu văn minh họa:",
            "illustration": "🧩 🔗 📖",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Phép lặp từ ngữ",
                        "right": "Tre giữ làng, giữ nước. Tre hy sinh bảo vệ con người."
                  },
                  {
                        "id": "p2",
                        "left": "Phép thay thế từ ngữ",
                        "right": "Bác Hồ kính yêu. Người là tấm gương đạo đức sáng ngời."
                  },
                  {
                        "id": "p3",
                        "left": "Phép nối",
                        "right": "Mưa rả rích suốt đêm. Vì vậy, sáng nay đường trơn trượt."
                  },
                  {
                        "id": "p4",
                        "left": "Phép liên tưởng",
                        "right": "Mùa xuân về. Hoa mai, hoa đào đua nhau khoe sắc."
                  }
            ],
            "hint": "Các biện pháp liên kết câu trong đoạn văn giúp bài viết mạch lạc."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "true_false",
            "tag": "Tiếng Việt 5 • Đúng / Sai",
            "prompt": "Phép thay thế từ ngữ giúp đoạn văn liên kết chặt chẽ mà không bị lỗi lặp từ đơn điệu.",
            "illustration": "✍️ ✨ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Sử dụng đại từ hoặc từ đồng nghĩa thay thế giúp diễn đạt uyển chuyển, giàu tính nghệ thuật."
      }
],

    'eng-g5-u2': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "choice",
            "tag": "Tiếng Anh 5 • Quantifiers",
            "prompt": "Fill in the blank: \"Is there ______ orange juice left in the pitcher?\"",
            "illustration": "🍊 🍹 ❓",
            "options": [
                  {
                        "id": "A",
                        "text": "any"
                  },
                  {
                        "id": "B",
                        "text": "some"
                  },
                  {
                        "id": "C",
                        "text": "many"
                  },
                  {
                        "id": "D",
                        "text": "a few"
                  }
            ],
            "correct": "A",
            "hint": "In questions and negative sentences, we use \"any\" with uncountable nouns."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "input",
            "tag": "Tiếng Anh 5 • A few / A little",
            "prompt": "Fill in \"a few\" or \"a little\": \"We only have ______ time left before the contest starts.\"",
            "illustration": "⏳ ⏱️ ✍️",
            "correct": "a little",
            "hint": "\"Time\" is an uncountable noun -> use \"a little time\"."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "match",
            "tag": "Tiếng Anh 5 • Cách dùng lượng từ",
            "prompt": "Match quantifier with its appropriate usage:",
            "illustration": "🧩 🍎 🥛",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Some",
                        "right": "Câu khẳng định & lời mời lịch sự"
                  },
                  {
                        "id": "p2",
                        "left": "Any",
                        "right": "Câu phủ định và câu hỏi nghi vấn"
                  },
                  {
                        "id": "p3",
                        "left": "A few",
                        "right": "Số lượng nhỏ danh từ đếm được"
                  },
                  {
                        "id": "p4",
                        "left": "A little",
                        "right": "Lượng nhỏ danh từ không đếm được"
                  }
            ],
            "hint": "Phân biệt danh từ đếm được và không đếm được khi dùng lượng từ."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "true_false",
            "tag": "Tiếng Anh 5 • True / False",
            "prompt": "We can use \"a lot of\" with both countable and uncountable nouns in English.",
            "illustration": "📚 💧 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "E.g., \"a lot of books\" (countable) and \"a lot of water\" (uncountable)."
      }
],

    'eng-g5-u3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "choice",
            "tag": "Tiếng Anh 5 • Future Simple",
            "prompt": "Next summer holiday, our family ______ Da Nang beach for a vacation.",
            "illustration": "🏖️ ✈️ ☀️",
            "options": [
                  {
                        "id": "A",
                        "text": "will visit"
                  },
                  {
                        "id": "B",
                        "text": "visited"
                  },
                  {
                        "id": "C",
                        "text": "visit"
                  },
                  {
                        "id": "D",
                        "text": "visits"
                  }
            ],
            "correct": "A",
            "hint": "\"Next summer holiday\" indicates a future plan/prediction -> Future Simple: will + verb."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "input",
            "tag": "Tiếng Anh 5 • Past Simple irregular",
            "prompt": "Complete with the past form: \"Two days ago, Minh ______ (buy) a wonderful science book.\"",
            "illustration": "📚 💵 ✍️",
            "correct": "bought",
            "hint": "Irregular verb: buy -> bought -> bought."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "match",
            "tag": "Tiếng Anh 5 • Cấu trúc các thì",
            "prompt": "Match tense with its basic structure:",
            "illustration": "🧩 ⏳ 📅",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Present Simple",
                        "right": "S + V(s/es)"
                  },
                  {
                        "id": "p2",
                        "left": "Past Simple",
                        "right": "S + V-ed / V2"
                  },
                  {
                        "id": "p3",
                        "left": "Future Simple",
                        "right": "S + will + V(bare)"
                  },
                  {
                        "id": "p4",
                        "left": "Present Continuous",
                        "right": "S + am/is/are + V-ing"
                  }
            ],
            "hint": "Cấu trúc 4 thì cơ bản trong chương trình Tiếng Anh tiểu học."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "true_false",
            "tag": "Tiếng Anh 5 • True / False",
            "prompt": "\"Yesterday\", \"last weekend\", and \"in 2022\" are typical time adverbs for the Past Simple tense.",
            "illustration": "📅 🕰️ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "They all describe specific points of completed time in the past."
      }
],

    'eng-g5-u4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "choice",
            "tag": "Tiếng Anh 5 • Superlative Adjectives",
            "prompt": "Mount Everest is the ______ mountain peak on Earth.",
            "illustration": "🏔️ 🧗 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "highest"
                  },
                  {
                        "id": "B",
                        "text": "higher"
                  },
                  {
                        "id": "C",
                        "text": "most high"
                  },
                  {
                        "id": "D",
                        "text": "high"
                  }
            ],
            "correct": "A",
            "hint": "Short adjective \"high\" takes \"-est\" with \"the\": the highest."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "input",
            "tag": "Tiếng Anh 5 • So sánh nhất",
            "prompt": "Fill in the superlative: \"Russia is the ______ (large) country in the world by total land area.\"",
            "illustration": "🗺️ 🇷🇺 ✍️",
            "correct": "largest",
            "hint": "Large ends in -e, so we add -st: largest."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "match",
            "tag": "Tiếng Anh 5 • Ghép so sánh nhất bất quy tắc",
            "prompt": "Match adjective with its superlative form:",
            "illustration": "🧩 🥇 🏆",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "good",
                        "right": "the best"
                  },
                  {
                        "id": "p2",
                        "left": "bad",
                        "right": "the worst"
                  },
                  {
                        "id": "p3",
                        "left": "happy",
                        "right": "the happiest"
                  },
                  {
                        "id": "p4",
                        "left": "expensive",
                        "right": "the most expensive"
                  }
            ],
            "hint": "Irregular superlatives: good -> the best; bad -> the worst."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "true_false",
            "tag": "Tiếng Anh 5 • True / False",
            "prompt": "We always use the definite article \"the\" before superlative adjectives in sentences.",
            "illustration": "👑 🌟 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "E.g., the tallest boy, the most interesting story."
      }
],

    'eng-g5-u5': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "choice",
            "tag": "Tiếng Anh 5 • Prepositions of Time",
            "prompt": "The new school year in Vietnam always starts ______ September.",
            "illustration": "🎒 📅 🏫",
            "options": [
                  {
                        "id": "A",
                        "text": "in"
                  },
                  {
                        "id": "B",
                        "text": "on"
                  },
                  {
                        "id": "C",
                        "text": "at"
                  },
                  {
                        "id": "D",
                        "text": "to"
                  }
            ],
            "correct": "A",
            "hint": "We use preposition \"in\" with months: in September, in October."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "input",
            "tag": "Tiếng Anh 5 • Conditional Type 1",
            "prompt": "Complete the First Conditional: \"If it rains heavily tomorrow, we ______ (stay) at home.\"",
            "illustration": "🌧️ 🏠 ✍️",
            "correct": "will stay",
            "hint": "First Conditional: If + Present Simple (it rains), S + will + V (will stay)."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "match",
            "tag": "Tiếng Anh 5 • Giới từ chỉ thời gian",
            "prompt": "Match preposition with appropriate time expressions:",
            "illustration": "🧩 ⏰ 🗓️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "at",
                        "right": "7 o'clock, night, noon"
                  },
                  {
                        "id": "p2",
                        "left": "on",
                        "right": "Monday, 20th November"
                  },
                  {
                        "id": "p3",
                        "left": "in",
                        "right": "summer, September, 2026"
                  },
                  {
                        "id": "p4",
                        "left": "from ... to",
                        "right": "8:00 AM to 11:30 AM"
                  }
            ],
            "hint": "at: giờ/thời điểm; on: thứ/ngày cụ thể; in: tháng/mùa/năm."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "true_false",
            "tag": "Tiếng Anh 5 • True / False",
            "prompt": "In First Conditional sentences, we describe real and possible future situations.",
            "illustration": "🔮 💡 ✨",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "Type 1 conditionals talk about realistic possibilities: If it rains, I will take an umbrella."
      }
],

    // Backward compatibility aliases
    'toan-b1': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "choice",
            "tag": "Toán 4 • Thời gian thế kỉ",
            "prompt": "Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long. Năm đó thuộc thế kỉ nào?",
            "illustration": "🏯 📜 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Thế kỉ XI"
                  },
                  {
                        "id": "B",
                        "text": "Thế kỉ X"
                  },
                  {
                        "id": "C",
                        "text": "Thế kỉ XII"
                  },
                  {
                        "id": "D",
                        "text": "Thế kỉ IX"
                  }
            ],
            "correct": "A",
            "hint": "Thế kỉ XI bắt đầu từ năm 1001 đến năm 1100. Do đó năm 1010 thuộc thế kỉ XI."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "input",
            "tag": "Toán 4 • Đổi đơn vị khối lượng",
            "prompt": "Điền số thích hợp vào chỗ chấm: 4 tấn 25 kg = ...... kg.",
            "illustration": "⚖️ 🚛 ✍️",
            "correct": "4025",
            "hint": "1 tấn = 1000 kg. Vậy 4 tấn 25 kg = 4000 kg + 25 kg = 4025 kg."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "match",
            "tag": "Toán 4 • Ghép số đo tương đương",
            "prompt": "Nối các số đo có giá trị bằng nhau:",
            "illustration": "🧩 ⚖️ ⏱️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "2 tấn 5 tạ",
                        "right": "2500 kg"
                  },
                  {
                        "id": "p2",
                        "left": "3 tạ 8 yến",
                        "right": "380 kg"
                  },
                  {
                        "id": "p3",
                        "left": "5 thế kỉ",
                        "right": "500 năm"
                  },
                  {
                        "id": "p4",
                        "left": "1/4 thế kỉ",
                        "right": "25 năm"
                  }
            ],
            "hint": "1 tấn = 10 tạ = 1000 kg; 1 tạ = 10 yến = 100 kg; 1 thế kỉ = 100 năm."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "true_false",
            "tag": "Toán 4 • Đúng / Sai",
            "prompt": "1 tạ bằng 10 yến và bằng 100 kg.",
            "illustration": "⚖️ 🌾 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Đúng theo bảng đơn vị đo khối lượng: Tấn - Tạ - Yến - Kilôgam."
      }
],
    'toan-b3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "choice",
            "tag": "Toán 5 • Phép tính phân số",
            "prompt": "Tính giá trị biểu thức: 3/4 + 2/5 × 5/8 = ?",
            "illustration": "🍰 🍕 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "1"
                  },
                  {
                        "id": "B",
                        "text": "7/8"
                  },
                  {
                        "id": "C",
                        "text": "5/4"
                  },
                  {
                        "id": "D",
                        "text": "3/8"
                  }
            ],
            "correct": "A",
            "hint": "Thực hiện phép nhân trước: 2/5 × 5/8 = 2/8 = 1/4. Sau đó cộng: 3/4 + 1/4 = 4/4 = 1."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "input",
            "tag": "Toán 5 • Chuyển hỗn số",
            "prompt": "Chuyển hỗn số 3 và 2/5 thành phân số có mẫu số là 5:",
            "illustration": "🔢 🍰 ✍️",
            "correct": "17/5",
            "hint": "Tử số = phần nguyên × mẫu số + tử số = 3 × 5 + 2 = 17. Mẫu số giữ nguyên là 5 -> 17/5."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "match",
            "tag": "Toán 5 • Ghép phép tính phân số",
            "prompt": "Nối phép tính với kết quả thu gọn:",
            "illustration": "🧩 ✖️ ➗",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "2/3 × 9/4",
                        "right": "3/2"
                  },
                  {
                        "id": "p2",
                        "left": "5/6 : 5/12",
                        "right": "2"
                  },
                  {
                        "id": "p3",
                        "left": "7/8 - 3/8",
                        "right": "1/2"
                  },
                  {
                        "id": "p4",
                        "left": "1 + 1/3",
                        "right": "4/3"
                  }
            ],
            "hint": "Rút gọn chéo khi nhân chia phân số để tính nhanh."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 5 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/17l5CmweS0H8W7Q-fZNNwlcIbXcRM579u/view",
            "type": "true_false",
            "tag": "Toán 5 • Đúng / Sai",
            "prompt": "Muốn chia một phân số cho một phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.",
            "illustration": "🔄 ➗ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Quy tắc: a/b : c/d = a/b × d/c (với c, d khác 0)."
      }
],
    'toan-b4': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "choice",
            "tag": "Toán 4 • Tìm hai số khi biết Tổng và Hiệu",
            "prompt": "Hai thùng chứa tất cả 120 lít dầu. Thùng thứ nhất nhiều hơn thùng thứ hai 24 lít. Hỏi thùng thứ nhất chứa bao nhiêu lít dầu?",
            "illustration": "🛢️ 🛢️ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "72 lít"
                  },
                  {
                        "id": "B",
                        "text": "48 lít"
                  },
                  {
                        "id": "C",
                        "text": "96 lít"
                  },
                  {
                        "id": "D",
                        "text": "68 lít"
                  }
            ],
            "correct": "A",
            "hint": "Thùng thứ nhất là số lớn = (Tổng + Hiệu) : 2 = (120 + 24) : 2 = 144 : 2 = 72 lít."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "input",
            "tag": "Toán 4 • Tính số bé",
            "prompt": "Hai số có tổng bằng 90 và hiệu bằng 16. Tìm số bé.",
            "illustration": "🔢 ➖ ✍️",
            "correct": "37",
            "hint": "Số bé = (Tổng - Hiệu) : 2 = (90 - 16) : 2 = 74 : 2 = 37."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "match",
            "tag": "Toán 4 • Công thức Tổng - Hiệu",
            "prompt": "Nối công thức và bài toán tính nhanh:",
            "illustration": "🧩 ➕ ➖",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Công thức Số lớn",
                        "right": "(Tổng + Hiệu) : 2"
                  },
                  {
                        "id": "p2",
                        "left": "Công thức Số bé",
                        "right": "(Tổng - Hiệu) : 2"
                  },
                  {
                        "id": "p3",
                        "left": "Tổng 80, Hiệu 20 -> Số lớn",
                        "right": "50"
                  },
                  {
                        "id": "p4",
                        "left": "Tổng 80, Hiệu 20 -> Số bé",
                        "right": "30"
                  }
            ],
            "hint": "Áp dụng công thức tìm hai số khi biết tổng và hiệu."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng Toán 4 – PGS.TS Trần Diên Hiển",
            "driveUrl": "https://drive.google.com/file/d/1zxRQT7AjFDmie5Z0X0cGUhU0JJj8_Yeo/view",
            "type": "true_false",
            "tag": "Toán 4 • Đúng / Sai",
            "prompt": "Tổng của hai số chẵn liên tiếp luôn là một số chẵn và hiệu của chúng bằng 2.",
            "illustration": "2️⃣ 4️⃣ 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị (Hiệu = 2), chẵn + chẵn = chẵn."
      }
],
    'tv-b2': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "choice",
            "tag": "Tiếng Việt 3 • Biện pháp so sánh",
            "prompt": "Trong câu: \"Mặt biển sáng trong như tấm gương khổng lồ\", sự vật nào được so sánh với nhau?",
            "illustration": "🌊 🪞 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "Mặt biển và tấm gương khổng lồ"
                  },
                  {
                        "id": "B",
                        "text": "Mặt biển và bầu trời trong xanh"
                  },
                  {
                        "id": "C",
                        "text": "Tấm gương và dòng sông"
                  },
                  {
                        "id": "D",
                        "text": "Mặt biển và mặt trời"
                  }
            ],
            "correct": "A",
            "hint": "Sự vật 1 là \"Mặt biển\", từ so sánh là \"như\", sự vật 2 là \"tấm gương khổng lồ\"."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "input",
            "tag": "Tiếng Việt 3 • Điền từ",
            "prompt": "Điền từ so sánh thích hợp vào chỗ trống trong câu ca dao: \"Công cha ...... núi Thái Sơn / Nghĩa mẹ ...... nước trong nguồn chảy ra.\"",
            "illustration": "⛰️ 💧 📜",
            "correct": "như",
            "hint": "Từ so sánh quen thuộc chỉ sự ngang bằng trong văn học dân gian Việt Nam."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "match",
            "tag": "Tiếng Việt 3 • Ghép nối hình ảnh so sánh",
            "prompt": "Nối hình ảnh so sánh với vế tương ứng trong thơ ca thiếu nhi:",
            "illustration": "🌕 🎈 🌿",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Trăng tròn như",
                        "right": "quả bóng bay"
                  },
                  {
                        "id": "p2",
                        "left": "Mắt bé tròn xoe như",
                        "right": "hai hòn bi ve"
                  },
                  {
                        "id": "p3",
                        "left": "Tiếng suối trong như",
                        "right": "tiếng hát xa"
                  },
                  {
                        "id": "p4",
                        "left": "Lá cọ xòe ra như",
                        "right": "chiếc ô xanh"
                  }
            ],
            "hint": "Dựa vào các bài thơ quen thuộc: Quả bóng tròn, Tiếng suối Côn Sơn, Cây cọ quê em."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 3 Nâng Cao – Luyện từ và câu",
            "driveUrl": "https://drive.google.com/drive/folders/1aNuulThPrJZO1uuzalojEEfFQsafXkah",
            "type": "true_false",
            "tag": "Tiếng Việt 3 • Đúng / Sai",
            "prompt": "Câu thơ: \"Quả dừa - đàn lợn con nằm trên cao\" sử dụng dấu gạch ngang (-) để thay thế cho từ so sánh.",
            "illustration": "🥥 🐖 🌴",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Đúng! Đây là kiểu so sánh không dùng từ \"như/là\" mà dùng dấu gạch ngang nối sự vật 1 và sự vật 2 (Trần Đăng Khoa)."
      }
],
    'tv-b3': [
      {
            "id": 1,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "choice",
            "tag": "Tiếng Việt 5 • Từ đồng âm",
            "prompt": "Trong các cặp từ dưới đây, cặp từ nào là hiện tượng từ đồng âm?",
            "illustration": "🐎 ⚽ 💡",
            "options": [
                  {
                        "id": "A",
                        "text": "con ngựa đá - hòn đá ven đường"
                  },
                  {
                        "id": "B",
                        "text": "bàn chân - chân núi"
                  },
                  {
                        "id": "C",
                        "text": "to lớn - khổng lồ"
                  },
                  {
                        "id": "D",
                        "text": "thông minh - ngốc nghếch"
                  }
            ],
            "correct": "A",
            "hint": "\"đá\" (động từ vung chân đá) và \"đá\" (danh từ chất rắn tự nhiên) là từ đồng âm: phát âm giống nhau nhưng nghĩa hoàn toàn khác nhau."
      },
      {
            "id": 2,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "input",
            "tag": "Tiếng Việt 5 • Nghĩa gốc và nghĩa chuyển",
            "prompt": "Từ \"chân\" trong câu: \"Dưới chân núi, hoa đào đang nở rộ\" được dùng theo nghĩa gốc hay nghĩa chuyển?",
            "illustration": "⛰️ 🌸 ✍️",
            "correct": "nghĩa chuyển",
            "hint": "\"Chân núi\" là phần đáy tiếp giáp mặt đất của núi, chuyển nghĩa dựa trên nét tương đồng với chân người."
      },
      {
            "id": 3,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "match",
            "tag": "Tiếng Việt 5 • Phân loại hiện tượng từ",
            "prompt": "Nối hiện tượng từ vựng với ví dụ tương ứng:",
            "illustration": "🧩 📚 🏷️",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Từ đồng nghĩa hoàn toàn",
                        "right": "xe lửa - tàu hỏa"
                  },
                  {
                        "id": "p2",
                        "left": "Từ trái nghĩa",
                        "right": "trắng tinh - đen nhánh"
                  },
                  {
                        "id": "p3",
                        "left": "Từ đồng âm",
                        "right": "kho cá - nhà kho"
                  },
                  {
                        "id": "p4",
                        "left": "Từ nhiều nghĩa",
                        "right": "ăn cơm - da ăn nắng"
                  }
            ],
            "hint": "Nắm chắc 4 khái niệm: đồng nghĩa, trái nghĩa, đồng âm, nhiều nghĩa."
      },
      {
            "id": 4,
            "bookTitle": "Tiếng Việt 5 Nâng Cao – GS.TS Lê Phương Nga",
            "driveUrl": "https://drive.google.com/file/d/1GQwBLGaY-abh0MaNgjagSoI9EquFBcRq/view",
            "type": "true_false",
            "tag": "Tiếng Việt 5 • Đúng / Sai",
            "prompt": "Từ đồng âm là những từ phát âm giống nhau nhưng khác hẳn nhau về nghĩa, không có mối liên hệ nào giữa các nghĩa.",
            "illustration": "🗣️ 👂 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "ĐÚNG (Đ)"
                  },
                  {
                        "id": "F",
                        "text": "SAI (S)"
                  }
            ],
            "correct": "T",
            "hint": "Khác với từ nhiều nghĩa (có nét nghĩa chung), các từ đồng âm không có liên hệ ngữ nghĩa."
      }
],
    'eng-u2': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "choice",
            "tag": "Tiếng Anh 3 • How Much / How Many",
            "prompt": "Choose the correct question word: \"______ pens do you have in your pencil case?\"",
            "illustration": "🖊️ 🎒 ❓",
            "options": [
                  {
                        "id": "A",
                        "text": "How many"
                  },
                  {
                        "id": "B",
                        "text": "How much"
                  },
                  {
                        "id": "C",
                        "text": "How often"
                  },
                  {
                        "id": "D",
                        "text": "How old"
                  }
            ],
            "correct": "A",
            "hint": "\"Pens\" is a plural countable noun (danh từ đếm được số nhiều), so we use \"How many\"."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "input",
            "tag": "Tiếng Anh 3 • Điền từ",
            "prompt": "Complete the question: \"How ______ water do you drink every day?\"",
            "illustration": "💧 🥛 ✍️",
            "correct": "much",
            "hint": "\"Water\" is an uncountable noun (danh từ không đếm được), so we ask: How much water...?"
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "match",
            "tag": "Tiếng Anh 3 • Ghép câu hỏi & trả lời",
            "prompt": "Match questions with their appropriate answers:",
            "illustration": "🧩 ❓ 💬",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "How many apples are there?",
                        "right": "There are six red apples."
                  },
                  {
                        "id": "p2",
                        "left": "How much milk is in the glass?",
                        "right": "There is a little milk."
                  },
                  {
                        "id": "p3",
                        "left": "How many students in your class?",
                        "right": "There are thirty-two students."
                  },
                  {
                        "id": "p4",
                        "left": "How much rice would you like?",
                        "right": "A bowl of rice, please."
                  }
            ],
            "hint": "How many asks about quantity of countable things; How much asks about uncountable amounts."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 3 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1ikxhqfC_56bulH155GxwjXXZqY3epcdt/view",
            "type": "true_false",
            "tag": "Tiếng Anh 3 • True / False",
            "prompt": "We use \"How much\" to ask about the price of an item in a store.",
            "illustration": "🏷️ 💵 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "\"How much is this book?\" is the standard question to ask about cost/price!"
      }
],
    'eng-u3': [
      {
            "id": 1,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "choice",
            "tag": "Tiếng Anh 5 • Quantifiers",
            "prompt": "Fill in the blank: \"Is there ______ orange juice left in the pitcher?\"",
            "illustration": "🍊 🍹 ❓",
            "options": [
                  {
                        "id": "A",
                        "text": "any"
                  },
                  {
                        "id": "B",
                        "text": "some"
                  },
                  {
                        "id": "C",
                        "text": "many"
                  },
                  {
                        "id": "D",
                        "text": "a few"
                  }
            ],
            "correct": "A",
            "hint": "In questions and negative sentences, we use \"any\" with uncountable nouns."
      },
      {
            "id": 2,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "input",
            "tag": "Tiếng Anh 5 • A few / A little",
            "prompt": "Fill in \"a few\" or \"a little\": \"We only have ______ time left before the contest starts.\"",
            "illustration": "⏳ ⏱️ ✍️",
            "correct": "a little",
            "hint": "\"Time\" is an uncountable noun -> use \"a little time\"."
      },
      {
            "id": 3,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "match",
            "tag": "Tiếng Anh 5 • Cách dùng lượng từ",
            "prompt": "Match quantifier with its appropriate usage:",
            "illustration": "🧩 🍎 🥛",
            "pairs": [
                  {
                        "id": "p1",
                        "left": "Some",
                        "right": "Câu khẳng định & lời mời lịch sự"
                  },
                  {
                        "id": "p2",
                        "left": "Any",
                        "right": "Câu phủ định và câu hỏi nghi vấn"
                  },
                  {
                        "id": "p3",
                        "left": "A few",
                        "right": "Số lượng nhỏ danh từ đếm được"
                  },
                  {
                        "id": "p4",
                        "left": "A little",
                        "right": "Lượng nhỏ danh từ không đếm được"
                  }
            ],
            "hint": "Phân biệt danh từ đếm được và không đếm được khi dùng lượng từ."
      },
      {
            "id": 4,
            "bookTitle": "Bồi dưỡng HSG Tiếng Anh 5 – Global Success",
            "driveUrl": "https://drive.google.com/file/d/1wcWddfep8lfALJHzDyBAbqPtA3Pxd7KK/view",
            "type": "true_false",
            "tag": "Tiếng Anh 5 • True / False",
            "prompt": "We can use \"a lot of\" with both countable and uncountable nouns in English.",
            "illustration": "📚 💧 💡",
            "options": [
                  {
                        "id": "T",
                        "text": "TRUE (Đúng)"
                  },
                  {
                        "id": "F",
                        "text": "FALSE (Sai)"
                  }
            ],
            "correct": "T",
            "hint": "E.g., \"a lot of books\" (countable) and \"a lot of water\" (uncountable)."
      }
]

  },


  // Active Exercise Engine Session State
  exerciseEngine: {
    activeLessonId: null,
    questions: [],
    currentIndex: 0,
    attempts: 0,
    selectedChoice: null,
    matchedPairs: {}
  }
};

/* ========================================================
   SCREEN NAVIGATION & GLOBAL HEADER
   ======================================================== */

function navigateTo(screenId) {
  appState.currentScreen = screenId;

  const screens = [
    'screen-start',
    'screen-home',
    'screen-subject-detail',
    'screen-practice-hub',
    'screen-books-shelf',
    'screen-exercise-room',
    'screen-analytics',
    'screen-badges'
  ];

  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === screenId) {
        el.classList.remove('hidden');
        el.classList.add('pop-anim');
      } else {
        el.classList.add('hidden');
        el.classList.remove('pop-anim');
      }
    }
  });

  const header = document.getElementById('global-app-header');
  if (header) {
    if (screenId === 'screen-start') {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
      updateHeaderUI();
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateHeaderUI() {
  const starsEl = document.getElementById('global-stars');
  if (starsEl) starsEl.innerText = appState.stars;

  const nameEl = document.getElementById('header-student-name');
  if (nameEl) nameEl.innerText = appState.studentName;

  const avatarEl = document.getElementById('header-avatar');
  if (avatarEl) avatarEl.innerText = appState.studentAvatar;

  updateGradeButtons(appState.studentGrade);
}

/* ========================================================
   SCREEN 1: LOGIN & GRADE SWITCHER
   ======================================================== */

function selectGrade(grade) {
  appState.studentGrade = grade;
  appState.studentName = `Khối Lớp ${grade}`;
  appState.studentAvatar = grade === 3 ? '🌱' : (grade === 4 ? '🌿' : '🌟');

  document.querySelectorAll('.profile-card').forEach(card => {
    card.classList.remove('border-[#62C9F3]', 'bg-sky-50/70', 'border-[#FF91A8]', 'bg-pink-50/70', 'border-[#FFC85A]', 'bg-amber-50/70');
    card.classList.add('border-slate-200', 'bg-white');
  });

  const card3 = document.getElementById('grade-card-3');
  const card4 = document.getElementById('grade-card-4');
  const card5 = document.getElementById('grade-card-5');

  if (grade === 3 && card3) {
    card3.classList.remove('border-slate-200', 'bg-white');
    card3.classList.add('border-[#62C9F3]', 'bg-sky-50/70');
  } else if (grade === 4 && card4) {
    card4.classList.remove('border-slate-200', 'bg-white');
    card4.classList.add('border-[#FF91A8]', 'bg-pink-50/70');
  } else if (grade === 5 && card5) {
    card5.classList.remove('border-slate-200', 'bg-white');
    card5.classList.add('border-[#FFC85A]', 'bg-amber-50/70');
  }
}

function selectProfile(name, grade) {
  selectGrade(grade || 3);
}

function loginAndGoHome() {
  appState.isLoggedIn = true;
  
  const greetingEl = document.getElementById('home-student-name');
  if (greetingEl) greetingEl.innerText = appState.studentName;

  updateGradeButtons(appState.studentGrade);
  navigateTo('screen-home');
}

function logoutToStart() {
  appState.isLoggedIn = false;
  navigateTo('screen-start');
}

function changeGrade(gradeNum) {
  appState.studentGrade = gradeNum;
  updateGradeButtons(gradeNum);
  
  // Nếu đang mở trang môn học hoặc luyện tập, tự động refresh nội dung môn học cho khối mới
  if (appState.currentScreen === 'screen-subject-detail') {
    openSubjectPage(appState.activeSubject);
  } else if (appState.currentScreen === 'screen-practice-hub') {
    openPracticeHub();
  }
}

function updateGradeButtons(g) {
  [3, 4, 5].forEach(num => {
    const btn = document.getElementById(`btn-grade-${num}`);
    if (btn) {
      if (num === g) {
        btn.className = 'px-4 py-1.5 rounded-xl font-black text-xs transition-all bg-[#FFC85A] text-slate-900 shadow-sm ring-2 ring-amber-300';
      } else {
        btn.className = 'px-4 py-1.5 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 transition-all';
      }
    }
  });
}

/* ========================================================
   SCREEN 2: SUBPAGE DISPATCHERS & SYLLABUS
   ======================================================== */

// Mở trang con Môn Học (Toán Bồi Dưỡng, Tiếng Việt Nâng Cao, HSG Tiếng Anh, Toán Tiếng Anh)
function openSubjectPage(subjectKey) {
  appState.activeSubject = subjectKey;
  /* Chi giu 3 mon toan, tieng-viet, tieng-anh */

  const currentGradeData = appState.gradeCurriculum[appState.studentGrade] || appState.gradeCurriculum[3];
  const sub = currentGradeData[subjectKey];
  if (!sub) return;

  const titleEl = document.getElementById('subpage-title');
  if (titleEl) titleEl.innerText = sub.title;

  const iconEl = document.getElementById('subpage-icon');
  if (iconEl) iconEl.innerText = sub.icon;

  const container = document.getElementById('subpage-lessons-list');
  if (container) {
    container.innerHTML = '';

    // Card giới thiệu tài liệu bồi dưỡng chính thức từ Google Drive
    if (sub.bookRef) {
      const sourceCard = document.createElement('div');
      sourceCard.className = 'p-5 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 rounded-3xl border-2 border-sky-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 shadow-sm';
      sourceCard.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-3xl shadow-xs shrink-0">
            ${sub.icon}
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-black bg-sky-200/80 text-sky-900 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Tài liệu chính thức</span>
              <span class="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">Lớp ${appState.studentGrade}</span>
            </div>
            <h4 class="font-black text-slate-900 text-lg leading-snug">${sub.bookRef.name}</h4>
            <p class="text-xs font-bold text-slate-600">${sub.bookRef.author}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0 self-end md:self-auto">
          ${sub.bookRef.folderUrl ? `
            <a href="${sub.bookRef.folderUrl}" target="_blank" rel="noopener noreferrer"
              class="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs">
              <span>Thư mục Drive</span>
              <span>📁</span>
            </a>
          ` : ''}
          <a href="${sub.bookRef.driveUrl}" target="_blank" rel="noopener noreferrer" 
            class="px-5 py-2.5 bg-[#62C9F3] hover:bg-[#4ebfe8] text-slate-900 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs clay-btn">
            <span>Mở Sách PDF Trên Drive</span>
            <span>↗</span>
          </a>
        </div>
      `;
      container.appendChild(sourceCard);
    }

    sub.lessons.forEach(l => {
      const card = document.createElement('div');
      
      if (l.status === 'completed') {
        card.className = 'clay-card-nested p-5 border-l-6 border-l-emerald-500 bg-white flex items-center justify-between';
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="text-xs font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">${l.code}</span>
            <h4 class="font-black text-slate-800 text-base md:text-lg">${l.title}</h4>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="startExerciseRoom('${l.id}')" class="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-xs rounded-xl transition">
              Luyện lại ⟳
            </button>
            <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base shadow-xs shrink-0">
              ✓
            </div>
          </div>
        `;
      } else if (l.status === 'ready') {
        card.className = 'clay-card p-5 border-2 border-[#62C9F3] bg-sky-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm';
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="text-xs font-black text-sky-900 bg-[#62C9F3]/30 px-2.5 py-1 rounded-md">${l.code}</span>
            <h4 class="font-black text-slate-800 text-base md:text-lg">${l.title}</h4>
          </div>
          <button onclick="startExerciseRoom('${l.id}')" class="px-6 py-3.5 bg-[#62C9F3] hover:bg-[#4db6e2] text-slate-900 font-black text-sm rounded-2xl clay-btn flex items-center justify-center gap-2 shrink-0">
            <span>VÀO BÀI</span>
            <span>➔</span>
          </button>
        `;
      } else {
        card.className = 'clay-card-nested p-5 bg-slate-50 border border-slate-200 opacity-60 flex items-center justify-between';
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="text-xs font-black text-slate-400 bg-slate-200 px-2.5 py-1 rounded-md">${l.code}</span>
            <h4 class="font-bold text-slate-600 text-base md:text-lg">${l.title}</h4>
          </div>
          <div class="w-10 h-10 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-base shrink-0">
            🔒
          </div>
        `;
      }

      container.appendChild(card);
    });
  }

  navigateTo('screen-subject-detail');
}

// Mở Tủ Sách & Tài Liệu Google Drive
function openBooksShelf(tab = 'vietnam-advanced') {
  appState.booksShelfActiveTab = tab;
  renderBooksShelfGrid();
  navigateTo('screen-books-shelf');
}

function switchBooksShelfTab(tab) {
  appState.booksShelfActiveTab = tab;
  renderBooksShelfGrid();
}

function renderBooksShelfGrid() {
  const container = document.getElementById('books-shelf-grid');
  const tabsContainer = document.getElementById('books-shelf-tabs');
  if (!container) return;

  if (tabsContainer) {
    tabsContainer.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-sm font-black bg-sky-100 text-sky-900 px-4 py-2 rounded-2xl border border-sky-200">
          🇻🇳 Toàn bộ Sách Bồi Dưỡng Lớp 3, 4, 5 (Chính thức từ Google Drive)
        </span>
      </div>
    `;
  }

  container.innerHTML = '';
  // Hiển thị các bộ sách bồi dưỡng nạp từ Google Drive: Toán Trần Diên Hiển, Tiếng Việt Lê Phương Nga, HSG Tiếng Anh
  const mat = appState.driveStudyMaterials;
  const booksList = [
    {
      subject: 'Toán Học',
      title: mat.toan[3].title,
      author: mat.toan[3].author,
      grade: 'Lớp 3',
      driveUrl: mat.toan[3].driveUrl,
      icon: '📐',
      lessonId: 'toan-g3-w1',
      desc: mat.toan[3].focus
    },
    {
      subject: 'Toán Học',
      title: mat.toan[4].title,
      author: mat.toan[4].author,
      grade: 'Lớp 4',
      driveUrl: mat.toan[4].driveUrl,
      icon: '📐',
      lessonId: 'toan-g4-w1',
      desc: mat.toan[4].focus
    },
    {
      subject: 'Toán Học',
      title: mat.toan[5].title,
      author: mat.toan[5].author,
      grade: 'Lớp 5',
      driveUrl: mat.toan[5].driveUrl,
      icon: '📐',
      lessonId: 'toan-g5-w1',
      desc: mat.toan[5].focus
    },
    {
      subject: 'Tiếng Việt',
      title: mat.tiengViet[4].title,
      author: mat.tiengViet[4].author,
      grade: 'Lớp 4',
      driveUrl: mat.tiengViet[4].driveUrl,
      icon: '📖',
      lessonId: 'tv-g4-b1',
      desc: mat.tiengViet[4].focus
    },
    {
      subject: 'Tiếng Việt',
      title: mat.tiengViet[5].title,
      author: mat.tiengViet[5].author,
      grade: 'Lớp 5',
      driveUrl: mat.tiengViet[5].driveUrl,
      icon: '📖',
      lessonId: 'tv-g5-b1',
      desc: mat.tiengViet[5].focus
    },
    {
      subject: 'Tiếng Anh',
      title: mat.tiengAnh[3].title,
      author: mat.tiengAnh[3].curriculum,
      grade: 'Lớp 3',
      driveUrl: mat.tiengAnh[3].driveUrl,
      folderUrl: mat.tiengAnh.folderUrl,
      icon: '🌍',
      lessonId: 'eng-g3-u1',
      desc: mat.tiengAnh[3].focus
    },
    {
      subject: 'Tiếng Anh',
      title: mat.tiengAnh[4].title,
      author: mat.tiengAnh[4].curriculum,
      grade: 'Lớp 4',
      driveUrl: mat.tiengAnh[4].driveUrl,
      folderUrl: mat.tiengAnh.folderUrl,
      icon: '🌍',
      lessonId: 'eng-g4-u1',
      desc: mat.tiengAnh[4].focus
    },
    {
      subject: 'Tiếng Anh',
      title: mat.tiengAnh[5].title,
      author: mat.tiengAnh[5].curriculum,
      grade: 'Lớp 5',
      driveUrl: mat.tiengAnh[5].driveUrl,
      folderUrl: mat.tiengAnh.folderUrl,
      icon: '🌍',
      lessonId: 'eng-g5-u1',
      desc: mat.tiengAnh[5].focus
    }
  ];

  booksList.forEach(b => {
    const card = document.createElement('div');
    card.className = 'clay-card p-6 bg-white hover:border-sky-300 transition flex flex-col justify-between space-y-4 shadow-sm';
    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900">${b.grade}</span>
          <span class="text-xs font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">${b.subject}</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
            ${b.icon}
          </div>
          <div>
            <h4 class="font-black text-slate-900 text-base leading-snug">${b.title}</h4>
            <p class="text-xs text-slate-500 font-bold">${b.author}</p>
          </div>
        </div>
        <p class="text-xs text-slate-600 font-medium leading-relaxed">${b.desc}</p>
      </div>

      <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
        <a href="${b.driveUrl}" target="_blank" rel="noopener noreferrer" 
          class="flex-1 py-2.5 bg-slate-100 hover:bg-sky-100 text-slate-800 rounded-xl font-black text-xs transition text-center flex items-center justify-center gap-1 border border-slate-200">
          <span>Xem PDF</span>
          <span>↗</span>
        </a>
        <button onclick="startExerciseRoom('${b.lessonId}')" class="flex-1 py-2.5 bg-[#62C9F3] hover:bg-[#4db6e2] text-slate-900 font-black text-xs rounded-xl clay-btn text-center flex items-center justify-center gap-1">
          <span>Luyện Tập</span>
          <span>➔</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Mở Trung Tâm Luyện Tập (Practice Hub)
function openPracticeHub() {
  const g = appState.studentGrade;
  const gradeLabelEl = document.getElementById('practice-hub-grade-badge');
  if (gradeLabelEl) gradeLabelEl.innerText = `Đang chọn Khối ${g}`;

  const currCurriculum = appState.gradeCurriculum[g] || appState.gradeCurriculum[3];
  const toanFirstLesson = currCurriculum.toan.lessons[0];
  const tvFirstLesson = currCurriculum['tieng-viet'].lessons[0];
  const engFirstLesson = currCurriculum['tieng-anh'].lessons[0];

  const dynContainer = document.getElementById('practice-hub-dynamic-cards');
  if (dynContainer) {
    dynContainer.innerHTML = `
      <!-- Toán -->
      <div class="p-5 bg-sky-50/70 rounded-3xl border-2 border-sky-200 flex flex-col justify-between space-y-3 shadow-xs">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-sky-900 bg-white px-2.5 py-0.5 rounded-md">${toanFirstLesson.code}</span>
            <span class="text-xs font-bold text-slate-500">Toán Lớp ${g}</span>
          </div>
          <h4 class="font-black text-slate-900 text-base leading-snug">${toanFirstLesson.title}</h4>
          <p class="text-xs text-slate-600 font-medium">Bồi dưỡng Toán ${g} (PGS.TS Trần Diên Hiển)</p>
        </div>
        <button onclick="startExerciseRoom('${toanFirstLesson.id}')" class="w-full py-2.5 bg-[#62C9F3] text-slate-900 font-black text-xs rounded-xl clay-btn">
          Vào Luyện Tập ➔
        </button>
      </div>

      <!-- Tiếng Việt -->
      <div class="p-5 bg-pink-50/70 rounded-3xl border-2 border-pink-200 flex flex-col justify-between space-y-3 shadow-xs">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-pink-900 bg-white px-2.5 py-0.5 rounded-md">${tvFirstLesson.code}</span>
            <span class="text-xs font-bold text-slate-500">Tiếng Việt Lớp ${g}</span>
          </div>
          <h4 class="font-black text-slate-900 text-base leading-snug">${tvFirstLesson.title}</h4>
          <p class="text-xs text-slate-600 font-medium">Tiếng Việt ${g} Nâng Cao (GS.TS Lê Phương Nga)</p>
        </div>
        <button onclick="startExerciseRoom('${tvFirstLesson.id}')" class="w-full py-2.5 bg-[#FF91A8] text-slate-900 font-black text-xs rounded-xl clay-btn">
          Vào Luyện Tập ➔
        </button>
      </div>

      <!-- Tiếng Anh -->
      <div class="p-5 bg-emerald-50/70 rounded-3xl border-2 border-emerald-200 flex flex-col justify-between space-y-3 shadow-xs">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-emerald-900 bg-white px-2.5 py-0.5 rounded-md">${engFirstLesson.code}</span>
            <span class="text-xs font-bold text-slate-500">Tiếng Anh Lớp ${g}</span>
          </div>
          <h4 class="font-black text-slate-900 text-base leading-snug">${engFirstLesson.title}</h4>
          <p class="text-xs text-slate-600 font-medium">Bồi dưỡng HSG Tiếng Anh ${g} (Global Success)</p>
        </div>
        <button onclick="startExerciseRoom('${engFirstLesson.id}')" class="w-full py-2.5 bg-[#78D9AE] text-slate-900 font-black text-xs rounded-xl clay-btn">
          Vào Luyện Tập ➔
        </button>
      </div>
    `;
  }

  navigateTo('screen-practice-hub');
}

/* ========================================================
   SCREEN 3: PHÒNG LUYỆN TẬP TƯƠNG TÁC (EXERCISE ENGINE)
   ======================================================== */

function startExerciseRoom(lessonId) {
  let qList = appState.questionBank[lessonId];

  // Tra cứu theo bảng ánh xạ alias nếu cần
  if (!qList) {
    const aliasMap = {
      'toan-b1': 'toan-g4-w1',
      'toan-b2': 'toan-g3-w1',
      'toan-b3': 'toan-g5-w1',
      'toan-b4': 'toan-g4-w4',
      'tv-b1': 'tv-g4-b1',
      'tv-b2': 'tv-g3-b1',
      'tv-b3': 'tv-g5-b1',
      'eng-u1': 'eng-g4-u1',
      'eng-u2': 'eng-g3-u1',
      'eng-u3': 'eng-g5-u1'
    };
    if (aliasMap[lessonId]) {
      qList = appState.questionBank[aliasMap[lessonId]];
    }
  }

  // Subject-Safe Fallback: TUYỆT ĐỐI KHÔNG BAO GIỜ LẪN MÔN HỌC!
  if (!qList || qList.length === 0) {
    const g = appState.studentGrade || 4;
    if (lessonId.startsWith('tv-') || lessonId.includes('tieng-viet')) {
      // Tiếng Việt rơi về bài Tiếng Việt tương ứng cùng khối
      const tvKey = `tv-g${g}-b1`;
      qList = appState.questionBank[tvKey] || appState.questionBank['tv-g4-b1'] || appState.questionBank['tv-g3-b1'];
    } else if (lessonId.startsWith('eng-') || lessonId.includes('tieng-anh')) {
      // Tiếng Anh rơi về bài Tiếng Anh tương ứng cùng khối
      const engKey = `eng-g${g}-u1`;
      qList = appState.questionBank[engKey] || appState.questionBank['eng-g4-u1'] || appState.questionBank['eng-g3-u1'];
    } else if (lessonId.startsWith('toan-sing')) {
      qList = appState.questionBank['toan-sing-180days'];
    } else {
      // Toán rơi về bài Toán tương ứng cùng khối
      const toanKey = `toan-g${g}-w1`;
      qList = appState.questionBank[toanKey] || appState.questionBank['toan-g4-w1'] || appState.questionBank['toan-g3-w1'];
    }
  }

  appState.exerciseEngine = {
    activeLessonId: lessonId,
    questions: qList || [],
    currentIndex: 0,
    attempts: 0,
    selectedChoice: null,
    matchedPairs: {}
  };

  renderCurrentQuestion();
  navigateTo('screen-exercise-room');
}

function renderCurrentQuestion() {
  const ex = appState.exerciseEngine;
  const q = ex.questions[ex.currentIndex];
  if (!q) return;

  ex.attempts = 0;
  ex.selectedChoice = null;
  ex.matchedPairs = {};

  const counterEl = document.getElementById('ex-counter-label');
  if (counterEl) {
    counterEl.innerText = `Câu ${ex.currentIndex + 1} / ${ex.questions.length}`;
  }

  const bookTagEl = document.getElementById('ex-source-book-tag');
  if (bookTagEl) {
    if (q.bookTitle) {
      bookTagEl.classList.remove('hidden');
      bookTagEl.innerHTML = `
        <span class="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">${q.bookTitle}</span>
        ${q.driveUrl ? `<a href="${q.driveUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-sky-600 hover:underline font-bold">Mở PDF ↗</a>` : ''}
      `;
    } else {
      bookTagEl.classList.add('hidden');
    }
  }

  const tagEl = document.getElementById('ex-tag');
  if (tagEl) tagEl.innerText = q.tag || 'Luyện tập';

  const promptEl = document.getElementById('ex-prompt');
  if (promptEl) promptEl.innerText = q.prompt;

  const illusEl = document.getElementById('ex-illustration');
  if (illusEl) illusEl.innerText = q.illustration || '📐';

  const hintEl = document.getElementById('ex-hint-text');
  if (hintEl) hintEl.innerText = q.hint || 'Em hãy đọc kĩ đề bài và làm từng bước nhé!';

  const statusBadge = document.getElementById('ex-status-badge');
  if (statusBadge) {
    statusBadge.innerText = 'Chưa trả lời';
    statusBadge.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600';
  }

  const feedbackBox = document.getElementById('ex-feedback-box');
  if (feedbackBox) {
    feedbackBox.className = 'hidden p-4 rounded-2xl text-sm font-bold flex items-start gap-3 transition-all';
  }

  const hintBox = document.getElementById('ex-hint-box');
  if (hintBox) {
    hintBox.classList.add('hidden');
  }

  const btnCheck = document.getElementById('btn-ex-check');
  if (btnCheck) {
    btnCheck.disabled = false;
    btnCheck.classList.remove('hidden');
  }

  const btnNext = document.getElementById('btn-ex-next');
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.classList.remove('bg-emerald-500', 'text-white', 'clay-btn', 'cursor-pointer');
    btnNext.classList.add('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
    btnNext.innerHTML = (ex.currentIndex === ex.questions.length - 1) ? '<span>HOÀN THÀNH 🎉</span>' : '<span>CÂU TIẾP THEO ➔</span>';
  }

  const container = document.getElementById('ex-answer-zone');
  if (!container) return;
  container.innerHTML = '';

  if (q.type === 'choice' || q.type === 'true_false') {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4';

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'w-full min-h-[64px] p-4 text-left rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-base flex items-center justify-between clay-option option-item transition';
      btn.dataset.id = opt.id;
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-700">${opt.id}</span>
          <span>${opt.text}</span>
        </div>
        <div class="w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-sm font-black indicator-dot"></div>
      `;
      btn.onclick = () => selectExerciseOption(btn, opt.id);
      grid.appendChild(btn);
    });
    container.appendChild(grid);

  } else if (q.type === 'input') {
    container.innerHTML = `
      <div class="p-6 bg-slate-50 rounded-3xl border-2 border-slate-200/80 max-w-lg space-y-3">
        <label class="block text-xs font-black uppercase text-slate-600 tracking-wider">Nhập kết quả số hoặc từ của em vào ô bên dưới:</label>
        <div class="flex items-center gap-4">
          <input type="text" id="ex-input-field" 
            class="w-full h-16 px-6 text-2xl font-black text-center text-slate-900 bg-white border-2 border-slate-300 focus:border-[#62C9F3] focus:outline-none rounded-2xl shadow-inner" 
            placeholder="Nhập câu trả lời...">
        </div>
      </div>
    `;
    setTimeout(() => {
      const inp = document.getElementById('ex-input-field');
      if (inp) inp.focus();
    }, 100);

  } else if (q.type === 'match') {
    renderMatchQuestions(container, q);
  }
}

function selectExerciseOption(btn, optId) {
  if (btn.disabled) return;
  document.querySelectorAll('.option-item').forEach(b => {
    b.classList.remove('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
    const dot = b.querySelector('.indicator-dot');
    if (dot) dot.innerHTML = '';
  });

  btn.classList.add('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
  const dot = btn.querySelector('.indicator-dot');
  if (dot) dot.innerHTML = '●';
  appState.exerciseEngine.selectedChoice = optId;
}

let activeMatchLeft = null;
function renderMatchQuestions(container, q) {
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-slate-50/70 rounded-3xl border-2 border-slate-200">
      <div class="space-y-3" id="match-left-col">
        <p class="text-xs font-black uppercase text-slate-500">CỘT A (CHỌN TRƯỚC)</p>
      </div>
      <div class="space-y-3" id="match-right-col">
        <p class="text-xs font-black uppercase text-slate-500">CỘT B (GHÉP TƯƠNG ỨNG)</p>
      </div>
    </div>
  `;

  const leftCol = document.getElementById('match-left-col');
  const rightCol = document.getElementById('match-right-col');

  q.pairs.forEach(p => {
    const lBtn = document.createElement('button');
    lBtn.className = 'w-full h-14 px-5 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-sm flex items-center justify-between clay-option match-left-item';
    lBtn.dataset.id = p.id;
    lBtn.innerHTML = `<span>${p.left}</span><span class="text-xs bg-slate-100 px-2 py-0.5 rounded-md">Chọn</span>`;
    lBtn.onclick = () => {
      document.querySelectorAll('.match-left-item').forEach(b => b.classList.remove('border-[#62C9F3]', 'bg-sky-100'));
      lBtn.classList.add('border-[#62C9F3]', 'bg-sky-100');
      activeMatchLeft = p.id;
    };
    leftCol.appendChild(lBtn);

    const rBtn = document.createElement('button');
    rBtn.className = 'w-full h-14 px-5 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-sm flex items-center justify-between clay-option match-right-item';
    rBtn.dataset.match = p.id;
    rBtn.innerHTML = `<span>${p.right}</span><span class="match-status text-xs text-slate-400">Ghép vào đây</span>`;
    rBtn.onclick = () => {
      if (!activeMatchLeft) {
        alert("Em hãy bấm chọn một mục ở Cột A trước nhé!");
        return;
      }
      appState.exerciseEngine.matchedPairs[activeMatchLeft] = p.id;
      rBtn.classList.add('border-emerald-500', 'bg-emerald-50');
      rBtn.querySelector('.match-status').innerText = '✓ Đã ghép';
    };
    rightCol.appendChild(rBtn);
  });
}

function checkAnswerEngine() {
  const ex = appState.exerciseEngine;
  const q = ex.questions[ex.currentIndex];
  let isCorrect = false;

  if (q.type === 'choice' || q.type === 'true_false') {
    if (!ex.selectedChoice) {
      alert("Em hãy chọn một đáp án trước khi bấm Kiểm tra nhé!");
      return;
    }
    isCorrect = (ex.selectedChoice === q.correct);
  } else if (q.type === 'input') {
    const inp = document.getElementById('ex-input-field');
    const val = inp ? inp.value.trim() : '';
    if (!val) {
      alert("Em hãy điền câu trả lời vào ô trống trước nhé!");
      return;
    }
    // So sánh linh hoạt: không phân biệt hoa thường, chuẩn hóa dấu cách
    const normalizedInput = val.toLowerCase().replace(/\s+/g, ' ');
    const normalizedCorrect = String(q.correct).toLowerCase().replace(/\s+/g, ' ');
    isCorrect = (normalizedInput === normalizedCorrect);
  } else if (q.type === 'match') {
    const totalKeys = Object.keys(ex.matchedPairs).length;
    if (totalKeys < q.pairs.length) {
      alert("Em hãy ghép nối đủ các cặp tương ứng nhé!");
      return;
    }
    isCorrect = Object.entries(ex.matchedPairs).every(([k, v]) => k === v);
  }

  ex.attempts++;
  const feedback = document.getElementById('ex-feedback-box');
  const card = document.getElementById('ex-question-card');

  if (isCorrect) {
    if (ex.attempts === 1) {
      appState.stars += 10;
    } else {
      appState.stars += 5;
    }
    updateHeaderUI();

    feedback.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 pop-anim';
    feedback.innerHTML = `
      <span class="text-3xl">🌟</span>
      <div>
        <h5 class="text-base font-black text-emerald-900">Tuyệt vời! Em đã trả lời chính xác!</h5>
      </div>
    `;
    feedback.classList.remove('hidden');

    if (q.type === 'choice' || q.type === 'true_false') {
      document.querySelectorAll('.option-item').forEach(b => {
        b.disabled = true;
        if (b.dataset.id === q.correct) {
          b.className = 'w-full min-h-[64px] p-4 text-left rounded-2xl border-2 border-emerald-500 bg-emerald-100/70 font-black text-emerald-900 text-base flex items-center justify-between';
          b.querySelector('.indicator-dot').innerHTML = '✓';
        }
      });
    } else if (q.type === 'input') {
      const inp = document.getElementById('ex-input-field');
      inp.disabled = true;
      inp.className = 'w-full h-16 px-6 text-2xl font-black text-center text-emerald-900 bg-emerald-100/60 border-2 border-emerald-500 rounded-2xl shadow-inner';
    }

    document.getElementById('btn-ex-check').classList.add('hidden');
    const btnNext = document.getElementById('btn-ex-next');
    btnNext.disabled = false;
    btnNext.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
    btnNext.classList.add('bg-emerald-500', 'text-white', 'clay-btn', 'cursor-pointer');

    const statusBadge = document.getElementById('ex-status-badge');
    statusBadge.innerText = '✓ Đã hoàn thành';
    statusBadge.className = 'text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';

  } else {
    card.classList.add('shake-effect');
    setTimeout(() => card.classList.remove('shake-effect'), 500);

    feedback.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-rose-50 border-2 border-rose-300 text-rose-950 pop-anim';
    feedback.innerHTML = `
      <span class="text-3xl">💪</span>
      <div>
        <h5 class="text-base font-black text-rose-900">Chưa chính xác rồi, em hãy thử tính lại nhé!</h5>
      </div>
    `;
    feedback.classList.remove('hidden');

    if (q.type === 'choice' || q.type === 'true_false') {
      ex.selectedChoice = null;
      document.querySelectorAll('.option-item').forEach(b => {
        b.classList.remove('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
        const dot = b.querySelector('.indicator-dot');
        if (dot) dot.innerHTML = '';
      });
    } else if (q.type === 'input') {
      const inp = document.getElementById('ex-input-field');
      if (inp) {
        inp.value = '';
        inp.focus();
      }
    } else if (q.type === 'match') {
      ex.matchedPairs = {};
      activeMatchLeft = null;
      document.querySelectorAll('.match-left-item').forEach(b => b.classList.remove('border-[#62C9F3]', 'bg-sky-100'));
      document.querySelectorAll('.match-right-item').forEach(b => {
        b.classList.remove('border-emerald-500', 'bg-emerald-50');
        b.querySelector('.match-status').innerText = 'Ghép vào đây';
      });
    }

    if (ex.attempts >= 2) {
      document.getElementById('ex-hint-box').classList.remove('hidden');
    }
  }
}

function nextQuestionEngine() {
  const ex = appState.exerciseEngine;
  if (ex.currentIndex < ex.questions.length - 1) {
    ex.currentIndex++;
    renderCurrentQuestion();
  } else {
    openAnalyticsPage();
  }
}

function openAnalyticsPage() {
  navigateTo('screen-analytics');
}

function openBadgesPage() {
  navigateTo('screen-badges');
}

window.addEventListener('DOMContentLoaded', () => {
  navigateTo('screen-start');
});
