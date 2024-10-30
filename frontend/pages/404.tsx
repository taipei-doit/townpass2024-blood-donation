import Container from '../components/container';
import styles from '../styles/404.module.scss';
import { useRouter } from 'next/router';
// import  { Button }  from '@vpon/vpon-ui';
export default function Custom404() {
    const router = useRouter();
    return (
    <Container>
        <div className={styles.block}>
            <div className={styles.title}>404</div>
            <div className={styles.subtitle}>Oooops!</div>
            <div className={styles.subtitle}>Page Not Found</div>
            <div className={styles.button}>
                {/* <Button
                    label="Back to Home"
                    type="solid"
                    color='#ff8200'
                    size='large'
                    onButtonClick={() => router.push('/')}
                    // onButtonClick={() => router.push(router.query.lang ? { pathname: '/', query: { lang: router.query.lang }} : '/')}
                /> */}
            </div>
        </div>
    </Container>
)}