import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './SectionName.module.sass';

type Props = {
  children: string;
  lightBackground?: boolean;
  blurBackground?: boolean;
};

export const SectionName: React.FC<Props> = ({ lightBackground, blurBackground, children }) => {
  const [visible, setVisible] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    // Timeout to set triggers after pin-spacer initiates
    setTimeout(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: nameRef.current,
          onEnter: () => {
            setVisible(true);
          },
          onEnterBack: () => {
            setVisible(true);
          },
          start: `top 80%`,
          end: `bottom 80%`,
        },
      });
    }, 400);
  }, []);

  return (
    <div className={clsx(styles.wrapper, lightBackground && styles['wrapper--projects'])}>
      <h2
        className={clsx(
          styles.section_name,
          visible && styles['section_name--visible'],
          lightBackground && styles['section_name--light'],
          blurBackground && styles['section_name--blur'],
        )}
        ref={nameRef}
      >
        {children}
      </h2>
    </div>
  );
};
