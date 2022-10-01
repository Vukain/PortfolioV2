import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../store/AppContext';
import { gsap } from 'gsap';
import { ReactFitty } from "react-fitty";

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

    return (
        <article className={styles.project}>
            <ImagePortal images={log} />
            {/* <div className={styles.project_name} id='test_sub'>{title}</div> */}
            <div className={styles.info}>
                <div className={styles.label}>
                    <ReactFitty>project</ReactFitty>
                </div>
                <div className={styles.name}>
                    <ReactFitty>{title}</ReactFitty>
                </div>
                <div className={styles.label}>
                    <ReactFitty>description</ReactFitty>
                </div>
                <div className={styles.description}>
                    {description[language]}
                </div>
                <div className={styles.label}>
                    <ReactFitty>tech stack</ReactFitty>
                </div>
                <div className={styles.capsules}>
                    {techCapsules}
                </div>
            </div>
        </article>
    );
};