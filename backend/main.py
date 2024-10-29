from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Date, Integer, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, date
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源
    allow_credentials=True,
    allow_methods=["*"],  # 允許所有方法
    allow_headers=["*"],  # 允許所有標頭
)


DATABASE_URL = "postgresql://myuser:mypassword@localhost:5432/mydatabase"  # 替換為你的 PostgreSQL 連接字串
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# 定義模型
class BloodStockData(Base):
    __tablename__ = "blood_stock"

    blood_type = Column(String, primary_key=True)
    stock = Column(String)
    dt = Column(Date, primary_key=True)

class DonationCenter(Base):
    __tablename__ = "blood_donation_centers"

    center_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)  # "center" or "mobile"
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    open_hours = Column(String)
    start_time = Column(Date, nullable=True)  # For mobile blood donation trucks
    end_time = Column(Date, nullable=True)  # For mobile blood donation trucks
    phone_number = Column(String)
    gift_info = Column(String)  # 捐血禮品
    note = Column(String)  # 捐血禮品

class PoiInfo(Base):
    __tablename__ = "poi_info"

    poi_id = Column(Integer, primary_key=True, index=True)
    poi_name = Column(String)
    poi_address = Column(String)
    poi_level_1 = Column(String)
    poi_level_2 = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    is_discount = Column(Boolean)
    info = Column(String)
    poi_level = Column(String)

Base.metadata.create_all(bind=engine)


# 定義回應模型
class BloodResponse(BaseModel):
    blood_type: str
    stock: str

    class Config:
        orm_mode = True

class DonationCenterResponse(BaseModel):
    center_id: int
    name: str
    type: Optional[str]  # "center" or "mobile", 可以是null
    address: str
    latitude: float
    longitude: float
    open_hours: Optional[str]  # 可以是null
    start_time: Optional[date]  # 可以是null
    end_time: Optional[date]  # 可以是null
    phone_number: Optional[str]  # 可以是null
    gift_info: Optional[str]  # 可以是null
    note: Optional[str]  # 可以是null

    class Config:
        orm_mode = True
        from_attributes = True  # 啟用從 ORM 對象建立 Pydantic 模型

class PoiResponse(BaseModel):
    poi_id: int
    poi_name: str
    poi_address: Optional[str]
    poi_level: str
    latitude: float
    longitude: float
    info: Optional[str]  # 可以是null

    class Config:
        orm_mode = True
        from_attributes = True  # 啟用從 ORM 對象建立 Pydantic 模型


@app.get("/api/bloodbank", response_model=List[BloodResponse])
async def get_blood_stock_data(dt: str):
    # 檢查日期格式
    try:
        query_date = datetime.strptime(dt, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    
    db = SessionLocal()
    try:
        # 查詢該日期的所有血型資料
        data = db.query(BloodStockData).filter(BloodStockData.dt == query_date).all()
        
        # 確保每天都有 A, B, O, AB 血型
        blood_types = ["A", "B", "O", "AB"]
        result = []
        data_dict = {d.blood_type: d.stock for d in data}

        # 檢查每個血型是否有資料，沒有的話添加預設值
        for blood_type in blood_types:
            stock = data_dict.get(blood_type, "無數據")  # 使用"無數據"作為預設值
            result.append({"blood_type": blood_type, "stock": stock})
        
        return result
    except SQLAlchemyError as e:
        print(f"Database error occurred: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred.")
    finally:
        db.close()


@app.get("/api/donationcenters", response_model=List[DonationCenterResponse])
async def get_all_donation_centers():
    db = SessionLocal()
    try:
        centers = db.query(DonationCenter).all()
        if not centers:
            raise HTTPException(status_code=404, detail="No donation centers found.")
        
        # 將 SQLAlchemy ORM 對象轉換為 Pydantic 模型
        return [DonationCenterResponse.from_orm(center) for center in centers]
    finally:
        db.close()

from math import radians, cos, sin, sqrt, atan2
from fastapi import Query
from datetime import date


# 計算兩個位置之間的距離 (Haversine Formula)
def calculate_distance(lat1, lng1, lat2, lng2):
    R = 6371.0  # 地球半徑 (km)

    dlat = radians(lat2 - lat1)
    dlng = radians(lng2 - lng1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlng / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


@app.get("/api/donationcenters/nearby", response_model=List[DonationCenterResponse])
async def get_nearby_donation_centers(lat: float = Query(...), lng: float = Query(...)):
    db = SessionLocal()
    try:
        centers = db.query(DonationCenter).all()  # 查詢所有捐血中心和捐血車
        current_date = date.today()  # 當前日期
        nearby_centers = []

        for center in centers:
            # 計算距離
            distance = calculate_distance(lat, lng, center.latitude, center.longitude)

            # 過濾距離在 1 公里內的捐血中心或捐血車
            if distance <= 1:
                if center.type == "mobile":
                    # 檢查是否在活動期間內
                    if center.start_time <= current_date <= center.end_time:
                        nearby_centers.append(center)
                else:
                    nearby_centers.append(center)

        # 返回符合條件的捐血中心列表
        return [DonationCenterResponse.from_orm(center) for center in nearby_centers]
    finally:
        db.close()


@app.get("/api/poi/nearby", response_model=List[PoiResponse])
async def get_nearby_poi(lat: float = Query(...), lng: float = Query(...)):
    db = SessionLocal()
    try:
        # 查詢資料庫中的所有 POI
        pois = db.query(PoiInfo).all()
        nearby_pois = []

        for poi in pois:
            # 計算距離
            distance = calculate_distance(lat, lng, poi.latitude, poi.longitude)

            # 只返回距離 1 公里內的 POI
            if distance <= 1:
                nearby_pois.append(poi)

        # 返回符合條件的 POI 列表
        return [PoiResponse.from_orm(poi) for poi in nearby_pois]
    finally:
        db.close()
