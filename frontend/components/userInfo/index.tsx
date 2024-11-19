import React, { useMemo } from 'react';

import styles from '@/styles/Home.module.scss';

type UserInfo = { 
	"user_id": number // 1
	"donation_date": string // "2024-09-01", 
	"donation_lon": number;
	"donation_lat": number;
	"amount_ml": number // 500
	"blood_type": "A" | "B" | "O" | "AB"
}

const mockUserInfo: UserInfo = {
    "user_id": 1, // 假資料用的使用者ID
    "donation_date": "2024-09-01", // 假資料用的捐贈日期
    "donation_lon": 121.535340, // 假資料用的經度
    "donation_lat": 25.021572, // 假資料用的緯度
    "amount_ml": 500, // 假資料用的捐贈量
    "blood_type": "A" // 假資料用的血型
};

const isDonationRecent = (date: string): boolean => {
    const donationDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - donationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 60; // 超過60天為false，否則為true
};



// 使用範例
const donationRecent = isDonationRecent(mockUserInfo.donation_date); // 判斷捐贈是否在60天內

const UserComponent = () => {
    const donationDatePlus60Days = useMemo(() => {
        const date = new Date(mockUserInfo.donation_date);
        date.setDate(date.getDate() + 60); // 加60天
        return date;
    }, [mockUserInfo.donation_date]);

    const daysUntilDonationDate = Math.ceil((donationDatePlus60Days.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); // 距今幾天

    return (
        <div className={`${styles.listWrapperDetail} ${styles.bottom}`}>
            <div className={styles.userInfoContainer}>
                <div className={`${styles.bloodStockWrapper}  ${
                        donationRecent 
                            ? styles.highStock
                            : styles.lowStock
                    }`}>
                    <div className={`${styles.listMarker}`}/>
                </div>
                <div className={styles.userInfoTitleWrapper}>
                    <div className={styles.userInfoTitle}>{mockUserInfo.blood_type}型戰士</div>
                    <div className={styles.userInfoTime}>下次捐血時間：
                        <span className={daysUntilDonationDate>= 0 ? styles.green : styles.red}>{daysUntilDonationDate}{daysUntilDonationDate>= 0 ? '天後' : '天前'}</span>
                        <span className={styles.gray}>({donationDatePlus60Days.toLocaleDateString('zh-TW')})</span>
                    </div>
                </div>
            </div>
            <div className={styles.userInfoCardContainer}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <img className={`${styles.icon} ${styles.money}`} src="/image/dollar-sign.svg" alt="" />
                        <div>捐血優惠</div>
                    </div>
                    <div className={styles.info}>
                        <img className={`${styles.icon} ${styles.loader}`} src="/image/loader.svg" alt="" />
                        <div>剩餘5天</div>
                    </div>
                </div>
                <div className={`${styles.titleWrapper} ${styles.money}`}>
                    <div className={styles.detail}>
                        提供捐血者一週的進補優惠，包含飲食、旅遊及住宿等
                    </div>
                    <button className={styles.button}>立即使用</button>
                </div>
            </div>
            <div className={styles.userInfoCardContainer}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <img className={`${styles.icon} ${styles.money}`} src="/image/dollar-sign.svg" alt="" />
                        <div>捐血聯誼</div>
                    </div>
                    <div className={styles.info}>
                        <img className={`${styles.icon} ${styles.loader}`} src="/image/loader.svg" alt="" />
                        <div>開放報名中</div>
                    </div>
                </div>
                <div className={`${styles.titleWrapper} ${styles.money}`}>
                    <div className={styles.detail}>
                        捐一袋血，交一生友！讓有意捐血者參加免費聯誼活動
                    </div>
                    <button onClick={() => window.location.href = 'https://loveactually.gov.taipei/cp.aspx?n=06341CB5F8686DA2'} className={styles.button}>立即報名</button>
                </div>
            </div>
            <div className={styles.userInfoCardContainer}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <img className={`${styles.icon} ${styles.money}`} src="/image/award.svg" alt="" />
                        <div>捐血排名</div>
                    </div>
                    <div className={styles.numberContainer}><span>#520</span>/2356</div>
                </div>
            </div>
            <div className={styles.userInfoCardContainer}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <img className={`${styles.icon} ${styles.money}`} src="/image/droplet.svg" alt="" />
                        <div>捐血徽章</div>
                    </div>
                </div>
                <div className={styles.badgeContainer}>
                    <div>
                        <div className={`${styles.badge} ${styles.badge20}`}/>
                        <div className={styles.detail}>累計20次</div>
                    </div>
                    <div>
                        <div className={`${styles.badge} ${styles.badge50}`}/>
                        <div className={styles.detail}>累計50次</div>
                    </div>
                    <div className={styles.inactive}>
                        <div className={`${styles.badge} ${styles.badge100}`}/>
                        <div className={styles.detail}>累計100次</div>
                    </div>
                </div>
            </div>
            <div className={styles.userInfoCardContainer}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>
                        <img className={`${styles.icon} ${styles.money}`} src="/image/clock.svg" alt="" />
                        <div>捐血紀錄</div>
                    </div>
                </div>
                <div className={styles.donationRecordContainer}>
                    <div className={styles.yearRecord}>
                        <div className={styles.year}><div className={styles.yearpoint}/>2024</div>
                        <div className={styles.recordDetails}>
                            <div className={styles.yearline}/>
                            <div className={styles.record}>
                                <div className={styles.date}>07/28</div>
                                <div className={styles.description}>大安號捐血車 — 全血 250cc</div>
                            </div>
                            <div className={styles.record}>
                                <div className={styles.date}>05/01</div>
                                <div className={styles.description}>大安號捐血車 — 分離術 500cc</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.yearRecord}>
                        <div className={styles.year}><div className={styles.yearpoint}/>2023</div>
                        <div className={styles.recordDetails}>
                        <div className={styles.yearline}/>
                            <div className={styles.record}>
                                <div className={styles.date}>07/28</div>
                                <div className={styles.description}>大安號捐血車 — 全血 250cc</div>
                            </div>
                            <div className={styles.record}>
                                <div className={styles.date}>05/01</div>
                                <div className={styles.description}>大安號捐血車 — 分離術 500cc</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.yearRecord}>
                        <div className={styles.year}><div className={styles.yearpoint}/>2022</div>
                        <div className={styles.recordDetails}>
                            <div className={styles.yearline}/>
                            <div className={styles.record}>
                                <div className={styles.date}>07/28</div>
                                <div className={styles.description}>大安號捐血車 — 全血 250cc</div>
                            </div>
                            <div className={styles.record}>
                                <div className={styles.date}>05/01</div>
                                <div className={styles.description}>大安號捐血車 — 分離術 500cc</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComponent;