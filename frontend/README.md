## Development 
#### 部署流程
1. branch `dev`推上Github
2. 自動啟動對應的[Cloud Build觸發條件](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/2b2c1384-356c-4c95-87fc-e6f5472c2099?authuser=1&hl=zh-tw&project=app-wee-landing-prod)
    * Cloud Build觸發條件中有設定部署用的環境變數：`_NODE_ENV=development`
    * Cloud Build會讀取cloudbuild.yaml檔案，紀錄有對應的Dockerfile路徑(`docker/$_NODE_ENV/Dockerfile`)
    * Dockerfile中會複製一份`.env.development`，可在js中取得設定的環境變數
3. 在[Cloud Build版本紀錄](https://console.cloud.google.com/cloud-build/builds?authuser=1&hl=zh-tw&project=app-wee-landing-prod)查看部署進度，並在[Cloud run](https://console.cloud.google.com/run/detail/asia-east1/wee-openplatform-landing-page-dev/metrics?authuser=1&hl=zh-tw&project=app-wee-landing-prod)查看結果
4. [Development link](https://wee-openplatform-landing-page-dev-2qr3f7pfeq-de.a.run.app/)

#### Cloud Storage
[wee-landing-dev](https://console.cloud.google.com/storage/browser/wee-landing-dev;tab=objects?forceOnBucketsSortingFiltering=true&authuser=1&hl=zh-tw&project=app-wee-landing-prod&prefix=&forceOnObjectsSortingFiltering=false)

## Production 
#### 部署流程
1. branch `main`推上Github
2. 自動啟動對應的[Cloud Build觸發條件](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/ac411ed5-7a1a-49e0-8c93-c91054969069?authuser=1&hl=zh-tw&project=app-wee-landing-prod)
    * Cloud Build觸發條件中有設定部署用的環境變數：`_NODE_ENV=production`
    * Cloud Build會讀取cloudbuild.yaml檔案，紀錄有對應的Dockerfile路徑(`docker/$_NODE_ENV/Dockerfile`)
    * Dockerfile中會複製一份`.env.production`，可在js中取得設定的環境變數
4. 在[Cloud Build版本紀錄](https://console.cloud.google.com/cloud-build/builds?authuser=1&hl=zh-tw&project=app-wee-landing-prod)查看部署進度，並在[Cloud run](https://console.cloud.google.com/run/detail/asia-east1/wee-openplatform-landing-page-prod/metrics?authuser=1&hl=zh-tw&project=app-wee-landing-prod)查看結果
5. [Production link](https://wee.vpon.com/)

#### Cloud Storage
[wee-landing-prod](https://console.cloud.google.com/storage/browser/wee-landing-prod;tab=objects?forceOnBucketsSortingFiltering=true&authuser=1&hl=zh-tw&project=app-wee-landing-prod&prefix=&forceOnObjectsSortingFiltering=false)

*  設定CORS

`gcloud storage buckets update gs://wee-landing-prod --cors-file=cors_file.json`
```
[
    {
      "origin": ["{Production link}"],
      "method": ["GET"],
      "responseHeader": ["Content-Type"],
      "maxAgeSeconds": 3600
    }
]