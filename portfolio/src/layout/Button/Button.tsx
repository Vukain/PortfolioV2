
import styles from './Button.module.sass';

type MyProps = {
    name?: string,
    clickHandler?: (e: React.MouseEvent<HTMLElement>) => void
};

export const Button: React.FC<MyProps> = ({ name, clickHandler }) => {

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={clickHandler}>
                <span className={styles.text}>{name}</span>
            </button>
        </div>
    );
};