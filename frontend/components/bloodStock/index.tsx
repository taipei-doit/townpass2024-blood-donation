import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.scss';

const stockMapper: { [key: string]: string } = {
    '4日以下': '急缺',
    '7日以上': '正常',
    '4-7日': '偏低'
};

function BloodStockDisplay({ bloodStock }: { bloodStock: { blood_type: string; label: string; stock: string }[] }) {
    return (
        <div className={styles.list}>
            {bloodStock.map((item, index) => (
                <div key={item.blood_type} className={styles.listItem}>
                    <div className={styles.listLabelWrapper}>
                        <div className={styles.listLabel}>{item.label}</div>
                    </div>
                    <div className={`${styles.infoWrapper}  ${
                                item.stock === '4日以下' 
                                    ? styles.infoLowStock 
                                    : item.stock === '7日以上' 
                                        ? styles.infoHighStock 
                                        : styles.infoNormalStock 
                    }`}>
                        <div className={styles.des}>{item.stock}</div>
                        <div className={styles.status}>{stockMapper[item.stock]}</div>
                        <div className={`${styles.bloodStockWrapper}  ${
                                item.stock === '4日以下' 
                                    ? styles.lowStock 
                                    : item.stock === '7日以上' 
                                        ? styles.highStock 
                                        : styles.normalStock 
                            }`}>
                            <div className={`${styles.listMarker}`}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const BloodStockComponent = () => {
    const [bloodStock, setBloodStock] = useState<{ blood_type: string; label: string; stock: string }[]>([]);

    // 假設您會在某處獲取血庫庫存量資料並更新狀態

    useEffect(() => {
        setBloodStock([
            { blood_type: "A", label: "A型", stock: "4日以下" }, 
            { blood_type: "B", label: "B型", stock: "7日以上" },
            { blood_type: "O", label: "O型", stock: "4-7日" },
            { blood_type: "AB", label: "AB型", stock: "7日以上" }
        ]);
    }, []);
    
    // 

    return (
        <div>
            <BloodStockDisplay bloodStock={bloodStock} />
        </div>
    );
};

export default BloodStockComponent;
