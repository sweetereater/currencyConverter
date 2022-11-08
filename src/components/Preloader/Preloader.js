import preloader from '../../assets/images/preloader.gif';
import styles from './Preloader.module.css';

export const Preloader = () => {
    return (
        <img className={styles.preloaderImage} src={preloader} alt="preloader" />
    )
}