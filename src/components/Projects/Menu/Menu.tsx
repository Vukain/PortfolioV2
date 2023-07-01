import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './Menu.module.sass';

import { checkProjectSize } from '../../../utils/checkProjectSize';

type Props = {
  names: string[];
  currentProject: number;
};

export const Menu: React.FC<Props> = ({ names, currentProject }) => {
  const [projectSize, setProjectSize] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const { sectionHeight, projectSize } = checkProjectSize();
    setSectionHeight(sectionHeight);
    setProjectSize(projectSize);
  }, []);

  const clickHandler = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();

    // Alternative scroll method without ability to adjust speed
    // window.scroll({
    //     top: sectionHeight + (index * projectSize),
    //     left: 0,
    //     behavior: 'smooth'
    // });

    // Fix for weird jump glitch when entering pinned state, small delay needed for fix to work as intended
    if (currentProject === 0) {
      window.scroll({
        top: sectionHeight + 1,
        left: 0,
        behavior: 'smooth',
      });
    } else if (currentProject === names.length - 1) {
      window.scroll({
        top: sectionHeight + 4 * projectSize - 1,
        left: 0,
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      gsap.to(window, {
        scrollTo: {
          y: sectionHeight + index * projectSize,
          autoKill: false,
        },
        ease: 'power2',
        duration: Math.max(0.3, Math.abs(currentProject - index)),
      });
    }, 50);
  };

  const projectLinks = names.map((element, index) => (
    <div className={styles.wrapper} key={index + element}>
      <button
        className={clsx(styles.button, currentProject === index && styles['button--active'])}
        onClick={(e) => {
          clickHandler(e, index);
        }}
      >
        <span className={styles.text}>{element}</span>
      </button>
    </div>
  ));

  return <div className={styles.menu}>{projectLinks}</div>;
};
