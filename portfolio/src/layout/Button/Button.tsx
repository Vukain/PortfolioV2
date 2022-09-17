import { clsx } from 'clsx';

import styles from './Button.module.sass';

type MyProps = {
    name?: string,
    sent?: boolean,
    clickHandler?: (e: React.MouseEvent<HTMLElement>) => void
};

export const Button: React.FC<MyProps> = ({ name, sent, clickHandler }) => {

    return (
        <div className={styles.wrapper}>
            <button className={clsx(styles.button, sent && styles.sent)} onClick={clickHandler} data-test='test'>
                <span className={styles.text}>{name}</span>
            </button>
        </div>
    );
};