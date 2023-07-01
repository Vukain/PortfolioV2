import { useRef } from 'react';
import { clsx } from 'clsx';

import styles from './Project.module.sass';

import { ImagePortal } from '../../';
import { useLanguageSwitch } from '../../../hooks/useLanguageSwitch';
import { useGsapProjectTriggers } from '../../../hooks/useGsapProjectTriggers';

type Props = {
  data: {
    id: string;
    title: string;
    description: Record<string, string>;
    technologies: string[];
    images: {
      logoImage: { small: string; normal: string };
      desktopImages?: Array<{ small: string; medium: string; big: string; full: string }>;
      mobileImages?: string[];
      codeImages?: Array<{ small: string; medium: string; big: string; full: string }>;
    };
    links: { github: string; live: string };
  };
  index: number;
  numberOfProjects: number;
  currentProject: number;
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>;
};

export const Project: React.FC<Props> = ({
  data: { id, title, description, technologies, images, links },
  index,
  numberOfProjects,
  currentProject,
  setCurrentProject,
}) => {
  const infoRef = useRef(null);

  const { language, languageSwitch } = useLanguageSwitch();

  useGsapProjectTriggers(infoRef, index, numberOfProjects, currentProject, setCurrentProject);

  const techCapsules = technologies.map((element, index) => (
    <div className={styles.capsule} key={element + index}>
      {element}
    </div>
  ));

  return (
    <article className={styles.project} aria-hidden={currentProject !== index}>
      <ImagePortal images={images} links={links} isActive={currentProject === index} />

      <article className={styles.info} ref={infoRef}>
        <div className={clsx(styles.label, styles[`label--${language}`])}>
          <span className={styles.slide}>{languageSwitch('project', 'projekt')}</span>
        </div>
        <div className={clsx(styles.name, styles[`name--${id}`])}>
          <span className={styles.slide}>{title}</span>
        </div>

        <div className={clsx(styles.label, styles[`label--${language}`])}>
          <span className={styles.slide}>{languageSwitch('description', 'deskrypcja')}</span>
        </div>
        <div className={styles.description}>
          <span className={styles.slide}>{description[language]}</span>
        </div>

        <div className={clsx(styles.label, styles[`label--${language}`])}>
          <span className={styles.slide}>{languageSwitch('tech stack', 'technologie')}</span>
        </div>
        <div className={styles.capsules}>{techCapsules}</div>
      </article>
    </article>
  );
};
