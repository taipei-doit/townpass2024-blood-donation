import React from "react";
import styles from './Loading.module.scss';

const Loading = ({
    style
}:{
    style?:React.CSSProperties
}) => {

    return (
        <div 
            className={styles.loading} 
            style={style}
        />
    );
}

export default Loading;