@echo off
chcp 65001 >nul
echo ========================================================
echo   UPLOAD KỶ YẾU 25 NĂM THPT LÊ CHÂN LÊN GITHUB
echo   Repository: https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan
echo ========================================================
echo.

where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] May tinh cua ban chua cai dat Git hoac chua them Git vao bien moi truong PATH.
    echo Hay cai dat Git tai: https://git-scm.com/download/win
    echo Sau khi cai xong, hay chay lai file nay!
    echo.
    pause
    exit /b 1
)

echo [1/5] Khoi tao Git repository...
if not exist ".git" (
    git init
    git branch -M main
)

echo [2/5] Cau hinh Remote GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan.git

echo [3/5] Them tat ca tep tin vao Git...
git add .

echo [4/5] Tao Commit...
git commit -m "Cap nhat ky yeu 25 nam THPT Le Chan - 100% anh thuc te va cau hinh Cloudflare Pages"

echo [5/5] Dang day code len GitHub (origin main)...
echo (Neu co cua so yeu cau dang nhap GitHub, ban hay dang nhap bang trinh duyet nhe)
git push -u origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   DA UPLOAD THANH CONG LEN GITHUB!
    echo   Xem tai: https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan
    echo ========================================================
) else (
    echo ========================================================
    echo   CO LOI TRONG QUA TRINH PUSH.
    echo   Vui long kiem tra quyen truy cap tai khoan GitHub.
    echo ========================================================
)

echo.
pause
