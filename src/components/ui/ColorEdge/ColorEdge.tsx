import { clsx } from 'clsx';

import styles from './ColorEdge.module.sass';

type Props = {
    direction: 'up' | 'down'
};

export const ColorEdge: React.FC<Props> = ({ direction }) => {

    return (
        <div className={clsx(styles.edge, direction === 'down' && styles['edge--down'])} />
    );
};