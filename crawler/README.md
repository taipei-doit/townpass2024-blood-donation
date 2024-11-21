# 爬蟲資料說明
- 爬蟲的程式碼詳 ipynb 檔，執行上為單次性爬取，以 PPT 捐血版之活動文章為主，如網頁網址如下 (以近年 3-4個月為例)
    - https://www.ptt.cc/bbs/Lifeismoney/M.1725495478.A.D8F.html
    - https://www.ptt.cc/bbs/Lifeismoney/M.1724482650.A.EB1.html
    - https://www.ptt.cc/bbs/Lifeismoney/M.1721460420.A.CBD.html
    - https://www.ptt.cc/bbs/Lifeismoney/M.1717436215.A.65A.html

- 主要是以 re 正規表達式方式整理其較系統性的文字，並彙整為可直接使用的表格，欄位包含有：日期、星期、捐血地點、營業時間、優惠內容、圖片網址。另附上 google map api 的 geocoding 程式碼，將地址轉換為經緯度座標。
