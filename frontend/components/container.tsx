import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

type ContainerProps = {
    children: React.ReactNode
}


const Container = ({ children }: ContainerProps) => {
    const router = useRouter()
    
    return (
        <>
            <Head>
                <title>捐血福報</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.container} id='container'>
                    <div className={styles.content}>{children}</div>
                </div>
            </main>
        </>
    )
}

export default Container;