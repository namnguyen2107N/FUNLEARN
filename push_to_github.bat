@echo off
chcp 65001 >nul
title FUNLEARN - Đẩy mã nguồn lên GitHub
echo ============================================================
echo   FUNLEARN - ĐANG ĐỒNG BỘ MÃ NGUỒN LÊN GITHUB
echo ============================================================
echo.
echo Đang đẩy nhánh main và master lên https://github.com/namnguyen2107N/Learnchill...
echo (Nếu trình duyệt bật lên cửa sổ GitHub, vui lòng nhấn "Authorize" để xác nhận)
echo.

git push -u origin main master

echo.
if %ERRORLEVEL% equ 0 (
    echo ============================================================
    echo [THÀNH CÔNG] Toàn bộ mã nguồn đã được cập nhật lên GitHub!
    echo ============================================================
) else (
    echo ============================================================
    echo [LƯU Ý] Quá trình đẩy mã nguồn chưa hoàn tất.
    echo Vui lòng đảm bảo bạn đã đăng nhập tài khoản GitHub có quyền truy cập repo này.
    echo ============================================================
)
echo.
pause
