import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

import styles from './Skills.module.sass';

import { SkillCard, SectionName } from '../';

import { checkScreenOrientation } from '../../utils/checkScreenOrientation';
import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { useGsapSkillsTriggers } from '../../hooks/useGsapSkillsTriggers';
import { MovingCrystalDesktop } from './MovingCrystal/MovingCrystalDesktop';
import { MovingCrystalMobile } from './MovingCrystal/MovingCrystalMobile';
import { ReactComponent as FrontendIcon } from '../../images/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../images/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../images/icons/tools.svg';

type CardData = Record<
  string,
  {
    data: {
      category: string;
      display: string;
      skills: string[];
    };
    icon: React.FC<{ className?: string; title?: string }>;
    ref: React.MutableRefObject<null | HTMLDivElement>;
  }
>;

export const Skills: React.FC = () => {
  const [activeCard, setActiveCard] = useState('');
  const [isDesktop, setIsDesktop] = useState(checkScreenOrientation());

  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const graphicsRef = useRef(null);

  const { languageSwitch } = useLanguageSwitch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsDesktop(checkScreenOrientation());
    });
  }, []);

  useGsapSkillsTriggers({ frontendRef, backendRef, graphicsRef }, setActiveCard);

  const cardData: CardData = {
    frontend: {
      data: {
        category: 'frontend',
        display: 'frontend',
        skills: ['html', 'css / sass', 'bootstrap', 'javascript', 'typescript', 'react / redux', 'next.js'],
      },
      icon: FrontendIcon,
      ref: frontendRef,
    },
    backend: {
      data: {
        category: 'backend',
        display: 'backend',
        skills: ['node.js', 'python', 'django', 'firebase', 'mongodb', 'sqlite'],
      },
      icon: BackendIcon,
      ref: backendRef,
    },
    graphics: {
      data: {
        category: 'graphics',
        display: languageSwitch('graphics', 'grafika'),
        skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'],
      },
      icon: GraphicIcon,
      ref: graphicsRef,
    },
  };

  const cards = Object.keys(cardData).map((element, index) => {
    const Icon = cardData[element].icon;

    return (
      <SkillCard
        data={cardData[element].data}
        activeCard={activeCard}
        ref={cardData[element].ref}
        key={index + cardData[element].data.category}
      >
        <Icon className={clsx(styles.icon, styles[`icon_${element}`])} title={`${element} icon`} />
      </SkillCard>
    );
  });

  return (
    <section className={styles.skills} id="skills">
      <SectionName>{languageSwitch('skills', 'umiejętności')}</SectionName>
      {isDesktop ? <MovingCrystalDesktop /> : <MovingCrystalMobile />}
      <div className={styles.cards} id="cards">
        {cards}
      </div>
    </section>
  );
};
