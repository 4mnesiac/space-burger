import { Link } from 'react-router-dom';
import styles from './not-found-404.module.css'

const NotFound404 = () => {

    return (
        <section className={styles.wrapper}>
            <p className={styles.title}>404</p>
            <p className={styles.text}>Вернуться на <Link className={styles.link} to={{ pathname: '/' }}>Главную</Link></p>
        </section>
    );
}

export default NotFound404;