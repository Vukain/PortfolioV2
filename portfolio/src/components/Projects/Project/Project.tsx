import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../store/AppContext';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './Project.module.sass';

import log from '../../../media/test-img.png';
import { ImagePortal } from './ImagePortal/ImagePortal';

type myProps = {
    data: {
        id: string,
        title: string,
        description: Record<string, string>,
        image?: React.FC<{ className?: string, title?: string }>,
        technologies: string[]
    },
    index: number
};

export const Project: React.FC<myProps> = ({ data: { id, title, description, technologies }, index }) => {

    const { language } = useContext(AppContext);

    const techCapsules = technologies.map((element, index) => (<div className={styles.capsule} key={element + index}>{element}</div>))

    const isDesktop = window.matchMedia('(orientation: landscape)').matches;
    const isEnglish = language === 'english';

    return (
        <article className={styles.project}>

            <ImagePortal images={log} />

            <article className={styles.info}>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    {isEnglish ? 'project' : 'projekt'}
                </div>
                <div className={clsx(styles.name, styles[`name--${id}`])}>
                    {title}
                </div>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    {isEnglish ? 'description' : 'deskrypcja'}
                </div>
                <div className={styles.description}>
                    {description[language]}
                </div>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    {isEnglish ? 'tech stack' : 'technologie'}
                </div>
                <div className={styles.capsules}>
                    {techCapsules}
                </div>

            </article>

        </article>
    );
};