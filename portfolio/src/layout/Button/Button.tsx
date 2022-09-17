import { clsx } from 'clsx';

import styles from './Button.module.sass';

type MyProps = {
    name?: string,
    status: string,
    clickHandler?: (e: React.MouseEvent<HTMLElement>) => void
};

export const Button: React.FC<MyProps> = ({ name, status, clickHandler }) => {

    return (
        <div className={styles.wrapper}>
            <button className={clsx(styles.button, styles[status])} onClick={clickHandler} data-test='test' disabled={status !== 'valid'}>
                <span className={styles.text}>{name}</span>
            </button>
        </div>
    );
};