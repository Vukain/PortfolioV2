import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './Project.module.sass';

import { ImagePortal } from './ImagePortal/ImagePortal';

type myProps = {
    data: {
        id: string,
        title: string,
        description: Record<string, string>,
        image?: React.FC<{ className?: string, title?: string }>,
        technologies: string[],
        images: { logo: string, desktop?: string[], mobile?: string[], code?: string[] },
        links: { github: string, live: string }
    },
    index: number,
    numberOfProjects: number,
    currentProject: number,
    setCurrentProject: any,
    projectSize: number,
    sectionHeight: number
};

export const Project: React.FC<myProps> = ({ data: { id, title, description, technologies, images, links }, index, numberOfProjects, currentProject, setCurrentProject, projectSize, sectionHeight }) => {

    const { language } = useContext(AppContext);

    const infoRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const elements = useRef<{ text: null[] | HTMLElement[], capsules: null[] | HTMLElement[] }>({ text: [], capsules: [] });
    const infoTL: React.MutableRefObject<null | gsap.core.Timeline> = useRef(null);

    const techCapsules = technologies.map((element, index) => (<div className={styles.capsule} key={element + index}>{element}</div>))

    const isEnglish = language === 'english';

    useEffect(() => {
        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        const sectionHeight = document.getElementById('projects')!.offsetTop;
        const projectSize = isDesktop ? document.getElementById('gallery')!.offsetWidth : document.getElementById('gallery')!.offsetHeight;

        const elementGetter = gsap.utils.selector(infoRef.current);
        const slidingText: HTMLElement[] = elementGetter('[class*="slide_"]');
        const slidingCapsules: HTMLElement[] = elementGetter('[class*="capsule_"]');

        elements.current = { text: slidingText, capsules: slidingCapsules }

        infoTL.current = gsap.timeline({ defaults: { transformOrigin: 'center', ease: 'sine.inOut' } });

        gsap.set([slidingText, slidingCapsules], { yPercent: '105', opacity: 0 });

        // if (true) {
        //     gsap.timeline({
        //         scrollTrigger: {
        //             trigger: '#app',
        //             onLeaveBack: () => {
        //                 setCurrentProject(index === 0 ? 0 : index - 1);
        //                 // infoTL.to(slidingText, { yPercent: '110', duration: .2, stagger: .3 })
        //             },
        //             onEnter: () => {
        //                 setCurrentProject(index);
        //                 // infoTL.to(slidingText, { yPercent: '0', duration: 1.3, stagger: .2 })
        //             },
        //             onEnterBack: () => {
        //                 setCurrentProject(index);
        //                 // infoTL.to(slidingText, { yPercent: '0', duration: 1.3, stagger: .2 })
        //             },
        //             onLeave: () => {
        //                 setCurrentProject(index === numberOfProjects - 1 ? numberOfProjects - 1 : index + 1);
        //                 // infoTL.to(slidingText, { yPercent: '110', duration: .2, stagger: .3 })
        //             },
        //             start: `${sectionHeight + (index * projectSize)}px ${projectSize}px`,
        //             end: `${sectionHeight + (index + 1) * projectSize}px ${projectSize}px`,
        //             markers: true
        //         }
        //     });
        // }

        gsap.timeline({
            scrollTrigger: {
                trigger: '#app',
                onLeaveBack: () => {
                    setCurrentProject(index === 0 ? 0 : index - 1);
                    if (index !== 0) {
                        infoTL.current!
                            .to(slidingText, { yPercent: '105', duration: .3, stagger: .3, opacity: 0 })
                            .to(slidingText, { opacity: 0, duration: 0 })
                            .to(slidingCapsules, { yPercent: '105', duration: .2, stagger: .1, opacity: 0 });
                    };
                },
                onEnter: () => {
                    if (currentProject !== index) {
                        setCurrentProject(index);
                    };
                    // infoTL.to(slidingText, { yPercent: '0', duration: 1.3, stagger: .2 })
                },
                onEnterBack: () => {
                    if (currentProject !== index) {
                        setCurrentProject(index);
                    };
                    // infoTL.to(slidingText, { yPercent: '0', duration: 1.3, stagger: .2 })
                },
                onLeave: () => {
                    setCurrentProject(index === numberOfProjects - 1 ? numberOfProjects - 1 : index + 1);
                    if (index !== numberOfProjects - 1) {
                        infoTL.current!
                            .to(slidingText, { yPercent: '-105', duration: .3, stagger: .3, opacity: 0 })
                            .to(slidingText, { opacity: 0, duration: 0 })
                            .to(slidingCapsules, { yPercent: '-105', duration: .2, stagger: .1, opacity: 0 });
                    };
                },
                start: `${2 * sectionHeight + index * projectSize - 1}px ${sectionHeight}px`,
                end: `${2 * sectionHeight + index * projectSize + 1}px ${sectionHeight}px`,
                // markers: true
            }
        });
    }, [setCurrentProject, index, numberOfProjects])

    useEffect(() => {
        let animationTimeout: NodeJS.Timeout;

        const { text, capsules } = elements.current;

        if (currentProject === index && text.length > 0) {
            animationTimeout = setTimeout(() => {
                infoTL.current!
                    // .to([text], { opacity: 1, duration: 0 })
                    .to(text, { yPercent: '0', duration: .7, stagger: .2, ease: 'sine.inOut', opacity: 1 })
                    .to(capsules, { yPercent: '0', duration: .4, stagger: .1, opacity: 1, ease: 'sine.inOut' })
            }, 1200);
        };

        return () => {
            clearTimeout(animationTimeout);
        };

    }, [currentProject, index])


    return (
        <article className={styles.project}>

            <ImagePortal images={images} links={links} />

            <article className={styles.info} ref={infoRef}>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    <span className={styles.slide}>{isEnglish ? 'project' : 'projekt'}</span>
                </div>
                <div className={clsx(styles.name, styles[`name--${id}`])}>
                    <span className={styles.slide}>{title}</span>
                </div>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    <span className={styles.slide}>{isEnglish ? 'description' : 'deskrypcja'}</span>
                </div>
                <div className={styles.description}>
                    <span className={styles.slide}>{description[language]}</span>
                </div>

                <div className={clsx(styles.label, isEnglish && styles['label--english'])}>
                    <span className={styles.slide}>{isEnglish ? 'tech stack' : 'technologie'}</span>
                </div>
                <div className={styles.capsules}>
                    {techCapsules}
                </div>

            </article>

        </article>
    );
};