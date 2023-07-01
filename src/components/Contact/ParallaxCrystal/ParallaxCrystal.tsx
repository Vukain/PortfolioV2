import { clsx } from 'clsx';

import styles from './ParallaxCrystal.module.sass';

type MyProps = {
  cursorXPosition: number;
  cursorYPosition: number;
  data: {
    name: string;
    moveSpeed: number;
    orbitRange: string;
    CrystalImage: React.FC<{ className?: string }>;
  };
};

export const ParallaxCrystal: React.FC<MyProps> = ({
  data: { name, moveSpeed, orbitRange, CrystalImage },
  cursorXPosition,
  cursorYPosition,
}) => {
  return (
    <div
      className={clsx(styles.crystal_wrapper, styles[`crystal_wrapper--${name}`])}
      style={{
        transform: `translate(${(moveSpeed * (window.innerWidth - cursorXPosition)) / 100}px, ${
          (moveSpeed * (window.innerHeight - cursorYPosition)) / 100
        }px)`,
      }}
    >
      <div className={clsx(styles.floating_crystal, styles[`floating_crystal--${orbitRange}`])}>
        <CrystalImage className={styles.crystal} />
      </div>
    </div>
  );
};
