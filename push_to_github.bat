@echo off
chcp 65001 >nul
echo ========================================================
echo   UPLOAD KỶ YẾU 25 NĂM THPT LÊ CHÂN LÊN GITHUB
echo   Repository: https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan
echo ========================================================
echo.

:: Nạp đường dẫn Git phòng trường hợp biến môi trường chưa kịp cập nhật
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\bin;%PATH%"

where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] May tinh chua tim thay Git.
    echo Hay cai dat Git tai: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [1/4] Kiem tra repository...
if not exist ".git" (
    git init
    git branch -M main
)

echo [2/4] Cau hinh Remote GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan.git

echo [3/4] Kiem tra commit...
git add .
git commit -m "Cap nhat ky yeu 25 nam THPT Le Chan - 100% anh thuc te va cau hinh Cloudflare Pages" >nul 2>&1

echo [4/4] Dang day code len GitHub...
echo --------------------------------------------------------
echo Chu y: Neu co cua so nho hien len hoi dang nhap, ban hay
echo chon "Sign in with your browser" de xac nhan tai khoan nhe!
echo --------------------------------------------------------
git push -u origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   DA UPLOAD THANH CONG LEN GITHUB!
    echo   Xem ngay tai: https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan
    echo ========================================================
) else (
    echo ========================================================
    echo   CHUA PUSH DUOC. Hay kiem tra xem ban da dang nhap GitHub chua.
    echo ========================================================
)

echo.
pause
