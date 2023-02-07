import { clsx } from 'clsx';

import styles from './ColorEdge.module.sass';

type MyProps = {
    direction: 'up' | 'down'
};

export const ColorEdge: React.FC<MyProps> = ({ direction }) => {

    return (
        <figure className={clsx(styles.edge, direction === 'down' && styles['edge--down'])}>
        </figure>
    );
};