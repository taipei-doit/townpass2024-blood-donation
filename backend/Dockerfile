# 使用官方的 PostgreSQL 基本映像檔
FROM postgres:15-alpine

# 設定環境變數
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# 複製初始化腳本到容器中
# 這些腳本會在容器啟動時執行
# COPY ./init-scripts /docker-entrypoint-initdb.d/

# 開放 Postgres 的預設埠 5432
EXPOSE 5432

# 設定指令來啟動 Postgres
CMD ["postgres"]
