import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 更新導入

import styles from '@/styles/Home.module.scss';
import { Donationcenters } from '@/components/content.d';


const InfoPanel = ({
    data
}: {
    data: Donationcenters[];
}) => {

    const router = useRouter();

    const [positions, setPositions] = useState<Donationcenters[]>([]);

    return (
        <div className={styles.infoPanelWrapper}>
            <div className={styles.titlePanel}>
                <div className={styles.title}>
                    <span>捐血場所</span>
                    <div className={styles.sum}>{data.length}筆結果</div>
                </div>
                {<div 
                    className={styles.action} 
                    onClick={() => router.push('/list')}
                >
                    展開列表
                </div>}
            </div>
        </div>
    );
};

export default InfoPanel;
