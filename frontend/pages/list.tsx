import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'; // 更新導入

import styles from '@/styles/Home.module.scss';
import { Donationcenters } from '@/components/content.d';



const testDonationCenters: Donationcenters[] = [
    {
        center_id: 1,
        name: "台北捐血中心大安號捐血車",
        type: "center",
        address: "台北市中正區123號",
        latitude: 25.032041, 
        longitude: 121.537335,
        open_hours: "09:00-17:00",
        start_time: "2023-01-01",
        end_time: "2023-12-31",
        phone_number: "02-1234-5678",
        info: "捐血禮品：水壺"
    },
    {
        center_id: 2,
        name: "移動捐血車",
        type: "mobile",
        address: "台北市信義區456號",
        latitude: 25.0330,
        longitude: 121.5645,
        open_hours: "10:00-18:00",
        start_time: "2023-01-01",
        end_time: "2023-12-31",
        phone_number: "02-8765-4321",
        info: "捐血禮品：手環"
    },
    {
        center_id: 3,
        name: "北區捐血中心",
        type: "center",
        address: "台北市北投區789號",
        latitude: 25.1350,
        longitude: 121.5000,
        open_hours: "08:00-16:00",
        start_time: "2023-01-01",
        end_time: "2023-12-31",
        phone_number: "02-2345-6789",
        info: "捐血禮品：紀念品"
    }
];

const getDistance = ({
    user,
    target
}: {
    user: [number, number]
    target: [number, number]
}) => {
    const toRad = (value: number) => (value * Math.PI) / 180; // 角度轉弧度
    const R = 6371; // 地球半徑（公里）

    const lat1 = toRad(user[0]);
    const lon1 = toRad(user[1]);
    const lat2 = toRad(target[0]);
    const lon2 = toRad(target[1]);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1); // 返回距離（公里）
}

const InfoPanel = () => {

    const router = useRouter();
    const userLocation: [number, number] = [121.535158, 25.021845];

    const [positions, setPositions] = useState<Donationcenters[]>([]);
    const [targetId, setTargetId] = useState<number | null>(null);
    
    const targetItem = useMemo(() => positions.find(i => i.center_id === targetId), [positions, targetId]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://a9e9-140-112-167-123.ngrok-free.app/api/donationcenters', {
                headers: { 
                    'ngrok-skip-browser-warning': 'true',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            const data = await response.json();
            setPositions(data);
        };
        // fetchData();
        setPositions(testDonationCenters);
    }, []);

    return (
        <div className={`${styles.listWrapper} ${targetId === null ? '' : styles.listWrapperDetail}`}>
            {targetId === null ? (
                <>
                    <div className={styles.titlePanel}>
                        <div className={styles.title}>
                            <span>捐血場所</span>
                            <div className={styles.sum}>{positions.length}筆結果</div>
                        </div>
                        <p>開放資料</p>
                    </div>
                    {positions.map(item => {
                        console.log(item);
                        return (
                            <div 
                                key={item.center_id} 
                                className={styles.listItemPanel}
                                onClick={() => {
                                    setTargetId(item.center_id);
                                }}
                            >
                                <p className={styles.listTitle}>{item.name}</p>
                                <div className={styles.listDes}>
                                    <img src="/image/icon-geo.svg" alt="" />
                                    <span>{item.address}</span>
                                </div>
                                <div className={styles.listDetail}>{`${getDistance({
                                    user: userLocation,
                                    target: [item.longitude, item.latitude]
                                })}公里`}</div>
                            </div>
                        )
                    })}
                    <div className={styles.returnToMap} onClick={() => router.push('/')}>
                        <img src="/image/icon-map.svg" alt="" />
                        <div>地圖</div>
                    </div>
                    <div className={styles.addButton}>
                        <div/>
                    </div>
                </>
            ): targetItem 
                ? (
                    <>
                        <div className={styles.detailTitlePanel}>
                            <p className={styles.listTitle}>
                                <img src="/image/down-icon.svg" alt="" onClick={() => {
                                    setTargetId(null);
                                }}/>
                                <span>{targetItem.name}</span>
                            </p>
                            <div className={styles.listDetail}>{`${getDistance({
                                user: userLocation,
                                target: [targetItem.longitude, targetItem.latitude]
                            })}公里`}</div>
                            <div className={styles.listDes}>
                                <img src="/image/icon-geo.svg" alt="" />
                                <span>{targetItem.address}</span>
                            </div>
                        </div>

                        <div className={styles.detailcontentPanel}>
                            服務資訊
                            <div>
                                <ul>
                                    <li>類型: {targetItem.type === 'center' ? '捐血中心' : '捐血車'}</li>
                                    <li>地址: {targetItem.address}</li>
                                    <li>營業時間: {targetItem.open_hours}</li>
                                    {targetItem.type === 'mobile' && <li>捐血車期間: {targetItem.start_time} - {targetItem.end_time}</li>}
                                    <li>聯絡電話: {targetItem.phone_number}</li>
                                    <li>{targetItem.info}</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )
                : <></>}
            
        </div>
    );
};

export default InfoPanel;
