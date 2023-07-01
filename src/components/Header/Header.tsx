import { useRef } from 'react';
import { clsx } from 'clsx';

import styles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../images/crystal_hero.svg';
import { useGsapHeaderTriggers } from '../../hooks/useGsapHeaderTriggers';
import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { SocialIcons } from '../';

export const Header: React.FC = () => {
  const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);

  const { language, languageSwitch } = useLanguageSwitch();

  useGsapHeaderTriggers(crystalRef);

  return (
    <header className={styles.header} id="header">
      <Crystal className={styles.crystal} ref={crystalRef} />

      <div className={styles.hello}>
        <div className={clsx(styles.overflow_wrapper, styles[`overflow_wrapper--${language}`])}>
          <p className={styles.line}>{languageSwitch('hi', 'cześć!')}</p>
        </div>
        <div className={clsx(styles.overflow_wrapper, styles[`overflow_wrapper--${language}`])}>
          <p className={styles.line}>{languageSwitch('i am', 'jestem')}</p>
        </div>
        <div className={clsx(styles.overflow_wrapper, styles[`overflow_wrapper--${language}`])}>
          <h1 className={styles.color} id="vukain">
            <span>v</span>
            <span>u</span>
            <span>k</span>
            <span>a</span>
            <span>i</span>
            <span>n</span>
          </h1>
        </div>
        <div className={styles.overflow_wrapper}>
          <p className={styles.line}>fullstack webdeveloper</p>
        </div>
      </div>

      <SocialIcons hero={true} />
    </header>
  );
};
