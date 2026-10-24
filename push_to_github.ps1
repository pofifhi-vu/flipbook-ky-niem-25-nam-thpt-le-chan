# Upload script for PowerShell
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  UPLOAD KỶ YẾU 25 NĂM THPT LÊ CHÂN LÊN GITHUB" -ForegroundColor Yellow
Write-Host "  Repository: https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[LỖI] Máy tính chưa có Git. Tải và cài đặt tại: https://git-scm.com/download/win" -ForegroundColor Red
    Read-Host "Nhấn Enter để thoát..."
    exit
}

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git remote remove origin 2>$null
git remote add origin https://github.com/pofifhi-vu/flipbook-ky-niem-25-nam-thpt-le-chan.git

git add .
git commit -m "Cap nhat ky yeu 25 nam THPT Le Chan - 100% anh thuc te va cau hinh Cloudflare Pages"
git push -u origin main --force

Write-Host "========================================================" -ForegroundColor Green
Write-Host "  ĐÃ HOÀN TẤT UPLOAD LÊN GITHUB!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
