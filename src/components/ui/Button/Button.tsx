import { clsx } from 'clsx';

import styles from './Button.module.sass';

type Props = {
  name?: string;
  alternativeText?: string;
  status: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Button: React.FC<Props> = ({ name, status, alternativeText, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button className={clsx(styles.button, styles[status])} onClick={onClick} data-alter={alternativeText}>
        <span className={styles.text}>{name}</span>
      </button>
    </div>
  );
};
