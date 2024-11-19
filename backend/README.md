# 捐血 API
此專案是一個基於 FastAPI 的後端服務，提供血庫庫存、捐血中心及相關興趣點（POI）資訊。服務連接到 PostgreSQL 資料庫，用於存儲與檢索數據。

# 功能特色
- 根據日期檢索每日血液庫存數據。
- 列出所有捐血中心，包括移動式捐血車與固定捐血站。
- 根據使用者提供的位置，查詢附近的捐血中心與 POI。

# 系統需求
- Python: 3.9+
- PostgreSQL: 15（使用 Docker 的 Alpine 映像）
- Docker: 用於本地執行 PostgreSQL

# API Schema
## 取得血庫資料
- Endpoint: `/api/bloodbank`
- Method: `GET`
- 查詢參數:
    - dt (str): 日期，格式為 YYYY-MM-DD。
- Response:
    ```json
    [
    {"blood_type": "A", "stock": "50"},
    {"blood_type": "B", "stock": "30"},
    {"blood_type": "O", "stock": "70"},
    {"blood_type": "AB", "stock": "20"}
    ]
    ```

## 列出所有捐血中心
- Endpoint: `/api/donationcenters`
- Method: `GET`
- Response:
    ```json
    [
    {
        "center_id": 1,
        "name": "台北捐血中心",
        "type": "center",
        "address": "台北市中正區某路123號",
        "latitude": 25.034,
        "longitude": 121.564,
        "open_hours": "09:00-18:00",
        "start_time": null,
        "end_time": null,
        "phone_number": "02-12345678",
        "gift_info": "精美小禮品",
        "note": "活動期間限定"
    },
    {
        "center_id": 2,
        "name": "移動捐血車",
        "type": "mobile",
        "address": "台北車站",
        "latitude": 25.047,
        "longitude": 121.517,
        "open_hours": null,
        "start_time": "2024-01-01",
        "end_time": "2024-01-15",
        "phone_number": null,
        "gift_info": null,
        "note": "移動捐血服務"
    }
    ]
    ```

## 查詢附近的捐血中心
- Endpoint: `/api/donationcenters/nearby`
- Method: `GET`
- 查詢參數:
    - lat (float): 使用者位置的緯度。
    - lng (float): 使用者位置的經度。
- Response:
    - 與 `/api/donationcenters` 回應結構相同，僅返回 1 公里內的捐血中心。

## 查詢附近的 POI
- Endpoint: `/api/poi/nearby`
- Method: `GET`
- 查詢參數:
    - lat (float): 使用者位置的緯度。
    - lng (float): 使用者位置的經度。
- Response:
    ```json
    [
    {
        "poi_id": 1,
        "poi_name": "大安森林公園",
        "poi_address": "台北市大安區",
        "poi_level": "公園",
        "latitude": 25.033,
        "longitude": 121.564,
        "info": "附近有捐血活動"
    }
    ]
    ```

---

# 本地環境設置

## 1. 啟動 PostgreSQL
使用 Docker 啟動 PostgreSQL 服務，執行以下命令啟動容器：
```
docker build -t postgres-bloodbank .
docker run -d -p 5432:5432 --name bloodbank-db postgres-bloodbank
```

## 2. 啟動應用程式
安裝所需的 Python 套件並啟動服務，確認應用程式運行在 `http://127.0.0.1:8000`

```
uvicorn main:app --reload
```

---

# 資料表結構說明

## 血庫數據 (blood_stock)
- 此資料表為模擬資料，未來須與血液基金會串接相關 API 拿到此份資料。

| 欄位名稱      | 資料型別 | 說明          |
|---------------|----------|---------------|
| `blood_type`  | String   | 血型，主鍵    |
| `stock`       | String   | 血量庫存      |
| `dt`          | Date     | 日期，主鍵    |

---

## 捐血中心 (blood_donation_centers)
- 整合 `捐血活動優惠_最新月份.csv` 與 `臺北市捐血中心固定捐血點_捐血室.csv` 的資料。

| 欄位名稱      | 資料型別 | 說明                     |
|---------------|----------|--------------------------|
| `center_id`   | Integer  | 捐血中心 ID，主鍵         |
| `name`        | String   | 捐血中心名稱             |
| `type`        | String   | 類型：固定中心或移動車    |
| `address`     | String   | 地址                     |
| `latitude`    | Float    | 緯度                     |
| `longitude`   | Float    | 經度                     |
| `open_hours`  | String   | 營業時間                 |
| `start_time`  | Date     | 活動起始日期（移動車專用）|
| `end_time`    | Date     | 活動結束日期（移動車專用）|
| `phone_number`| String   | 聯絡電話                 |
| `gift_info`   | String   | 禮品資訊                 |
| `note`        | String   | 備註                     |

---

## POI 資訊 (poi_info)
- 使用 `poi_clean_cht.csv` 此份資料。

| 欄位名稱       | 資料型別 | 說明                |
|----------------|----------|---------------------|
| `poi_id`       | Integer  | POI ID，主鍵        |
| `poi_name`     | String   | POI 名稱           |
| `poi_address`  | String   | POI 地址           |
| `poi_level_1`  | String   | POI 分類（第一層級）|
| `poi_level_2`  | String   | POI 分類（第二層級）|
| `latitude`     | Float    | 緯度               |
| `longitude`    | Float    | 經度               |
| `is_discount`  | Boolean  | 是否有優惠         |
| `info`         | String   | POI 詳細資訊       |
