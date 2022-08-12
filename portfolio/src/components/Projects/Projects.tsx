import React, { useRef, useEffect, useContext, forwardRef } from 'react';

import gsap from 'gsap';
import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';

type MyProps = { test?: string };

// const Projects = forwardRef<HTMLDivElement, MyProps>(({ test }, ref) => {})

const Projects: React.FC<MyProps> = ({ test }) => {


    const { setCurrentSection } = useContext(AppContext);
    const projectsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {

        const projectsSection = projectsRef.current;
        const elementGetter = gsap.utils.selector(projectsSection);
        const projects: HTMLElement[] = elementGetter('[class*="project"]');

        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const slidingProjects = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: true,
                pin: true,
                pinSpacing: true,
                // start: 'center center',
                end: 4 * projects[0].offsetWidth,
                snap: 1 / 4,
                onEnter: () => { setCurrentSection('projects') },
                onEnterBack: () => { setCurrentSection('projects') }
            }
        });

        slidingProjects.to(projects, {
            xPercent: -100 * (projects.length - 1),
            ease: "none",
        });

    }, [])

    return (
        <section className={styles.projects} ref={projectsRef} id="projects">
            <article className={styles.project}>Project 1</article>
            <article className={styles.project}>Project 2</article>
            <article className={styles.project}>Project 3</article>
            <article className={styles.project}>Project 4</article>
            <article className={styles.project}>Project 5</article>
        </section>
    );
}

export default Projects;