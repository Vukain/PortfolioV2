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
        images: {
            logo: string,
            desktop?: Array<{ small: string, medium: string, big: string, full: string }>,
            mobile?: string[],
            code?: Array<{ small: string, medium: string, big: string, full: string }>
        },
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
    const isDesktop = window.matchMedia('(orientation: landscape)').matches;

    useEffect(() => {


        const sectionHeight = document.getElementById('projects')!.offsetTop;
        const projectSize = isDesktop ? document.getElementById('gallery')!.offsetWidth : document.getElementById('gallery')!.offsetHeight;

        const elementGetter = gsap.utils.selector(infoRef.current);
        const slidingText: HTMLElement[] = elementGetter('[class*="slide_"]');
        const slidingCapsules: HTMLElement[] = elementGetter('[class*="capsule_"]');

        elements.current = { text: slidingText, capsules: slidingCapsules };

        infoTL.current = gsap.timeline({ defaults: { transformOrigin: 'center', ease: 'sine.inOut' } });

        gsap.set([slidingCapsules], { yPercent: '105', opacity: 0 });
        isDesktop ? gsap.set([slidingText], { xPercent: '105', opacity: 0 }) : gsap.set([slidingText], { yPercent: '105', opacity: 0 });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#app',
                onLeaveBack: () => {
                    setCurrentProject(index === 0 ? 0 : index - 1);
                    if (index !== 0) {
                        if (isDesktop) {
                            infoTL.current!
                                .to(slidingText, { xPercent: '105', duration: .6, stagger: .1, opacity: 0 })
                                .to(slidingText, { opacity: 0, duration: 0 })
                                .to([...slidingCapsules].reverse(), { delay: -1, yPercent: '105', duration: .3, stagger: .1, opacity: 0 });
                        } else {
                            infoTL.current!
                                .to([...slidingCapsules].reverse(), { delay: 0, yPercent: '105', duration: .3, stagger: .1, opacity: 0 })
                                .to([...slidingText].reverse(), { yPercent: '105', duration: .5, stagger: .1, opacity: 0 })
                                .to(slidingText, { opacity: 0, duration: 0 });
                        }
                    };
                },
                onEnter: () => {
                    if (currentProject !== index) {
                        setCurrentProject(index);
                    };
                },
                onEnterBack: () => {
                    if (currentProject !== index) {
                        setCurrentProject(index);
                    };
                },
                onLeave: () => {
                    setCurrentProject(index === numberOfProjects - 1 ? numberOfProjects - 1 : index + 1);
                    if (index !== numberOfProjects - 1) {
                        if (isDesktop) {
                            infoTL.current!
                                .to(slidingText, { xPercent: '-105', duration: .6, stagger: .1, opacity: 0 })
                                .to(slidingText, { opacity: 0, duration: 0 })
                                .to([...slidingCapsules].reverse(), { delay: -1, yPercent: '105', duration: .3, stagger: .1, opacity: 0 });
                        } else {
                            infoTL.current!
                                .to([...slidingCapsules].reverse(), { delay: 0, yPercent: '-105', duration: .2, stagger: .05, opacity: 0 })
                                .to([...slidingText].reverse(), { delay: slidingCapsules.length * -.05 + .2, yPercent: '-105', duration: .5, stagger: .1, opacity: 0 })
                                .to(slidingText, { opacity: 0, duration: 0 });
                        };
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
                    .to(text, { xPercent: '0', yPercent: '0', duration: isDesktop ? .7 : .8, stagger: isDesktop ? .1 : .2, ease: 'sine.inOut', opacity: 1 })
                    .to(capsules, { delay: isDesktop ? -.1 : -.2, yPercent: '0', duration: .3, stagger: .1, opacity: 1, ease: 'sine.inOut' })
            }, 1200);
        };

        return () => {
            clearTimeout(animationTimeout);
        };

    }, [currentProject, index])


    return (
        <article className={styles.project}>

            <ImagePortal images={images} links={links} isActive={currentProject === index} />

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