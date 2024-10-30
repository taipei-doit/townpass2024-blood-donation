import React from 'react';
// mapbox用於react的套件
import Map, { useControl } from "react-map-gl";
import type { LayersList } from '@deck.gl/core/typed';

// deckgl套件
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import styles from '@/styles/Home.module.scss';
import BloodStockComponent from '@/components/bloodStock';
import InfoPanel from '@/components/infoPanel';
import { Donationcenters } from '@/components/content.d';

// 設定用於mapbox裡的deck.gl
function DeckGLOverlay(props: MapboxOverlayProps) {
    const deck = useControl(() => new MapboxOverlay(props));
    deck.setProps(props);
    return null;
}

const QueryComponent = ({
    layer,
    data
}: {
    layer: LayersList;
    data: Donationcenters[];
}) => {
    return (
        <>
            <BloodStockComponent />
            <div className={styles.mapWrapper}>
                <Map
                    // 設定這張地圖的視點中心
                    initialViewState={{
                        latitude: 25.021572,
                        longitude: 121.535340,
                        zoom: 12,
                    }}
                    // 地圖在網頁中的大小
                    style={{ width: "100vw", height: "100%" }}
                    // 地圖的style，可用mapbox預設style或在mapbox studio中自定義style後套用
                    // mapbox預設style可在這找到：https://docs.mapbox.com/api/maps/styles/
                    mapStyle="mapbox://styles/mapbox/light-v11"
                    // 放mapbox token
                    mapboxAccessToken={
                        process.env.NEXT_PUBLIC_MAPBOXACCESSTOKEN
                    }
                >
                    {/* 將deckgl套用在mapbox中，這邊可放入多個deckgl layer */}
                    <DeckGLOverlay layers={layer} />
                </Map>
            </div>
            <InfoPanel data={data} />
        </>
    );
};

export default QueryComponent;