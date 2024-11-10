## 「城市通微服務」— 全方位捐血資訊整合與創新公益機制的微服務解決方案

## 專案簡介
團隊開發了一個公益導向的微服務，旨在促進捐血行為。系統整合了血液基金會網站、PTT 捐血版及各類優惠資訊，並提供捐血室、捐血車定位與優惠整合功能。用戶可新增捐血回報，並參與「周邊餐廳優惠」與「捐血聯誼活動」等創新機制，促進企業社會責任（CSR）及多方合作，提升公益效益。負責實現所有 App 功能，包括地理位置獲取、訊息推播及用戶互動，並利用 AI 創作可愛吉祥物「小血怪」以提升產品吸引力。

### 功能特色
1. 捐血查詢頁面
    * 顯示當前血庫狀況。
    * 提供捐血中心與捐血車的地圖定位，並顯示用戶當前所在位置。
2. 捐血場所資訊
    * 地點列表：顯示各捐血地點並提供詳細資訊，包括：
        * 距離用戶的距離。
        * 營業時間、聯絡電話及當前捐血活動。
3. 個人資訊與捐血紀錄
    * 個人檔案：顯示用戶下次可捐血日期，並記錄歷史捐血的時間和地點。
    * 遊戲化經驗值：根據用戶捐血次數累積經驗值，讓吉祥物「小血怪」成長。
        * 小血怪互動：用戶可餵食（捐血）或簡單互動（摸頭）增強使用者連結。
    * 成就徽章：用戶可根據捐血次數取得成就徽章，展示在個人檔案中。
4. 捐血優惠
    * 商家優惠：整合周邊商家優惠，可快速瀏覽參加優惠的商家地點。
5. 捐血聯誼活動
    * 透過整合區公所的單身聯誼活動，提供捐血者參加社交活動的機會。

## 產品展示
https://youtube.com/shorts/ZK284uzPn_4?si=V9eR5vjTyvf9TdRA

### 開發相關資訊
#### 地圖 API 設定
地圖功能使用 Mapbox API（透過建立一個 Mapbox 帳戶並按照[此指南](https://docs.mapbox.com/help/getting-started/access-tokens/)建立您自己的 Mapbox 金鑰），需要建立 `frontend/.env` 檔案並設定以下環境變數：
```typescript
NEXT_PUBLIC_MAPBOXACCESSTOKEN=your_mapbox_token_here
```
如此可用於`frontend/components/query/index.tsx` L44 中
```typescript
<Map
    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOXACCESSTOKEN}
    // ... other map properties
/>
```