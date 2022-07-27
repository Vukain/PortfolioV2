import React, { useRef, useEffect, forwardRef } from 'react';
import gsap from 'gsap';
import styles from './Projects.module.sass';

type MyProps = { test?: string };

// const Projects = forwardRef<HTMLDivElement, MyProps>(({ test }, ref) => {})

const Projects: React.FC<MyProps> = ({ test }) => {
    const projectsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(projectsRef.current);
        const projects: HTMLElement[] = elementGetter('[class*="project"]');

        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const slidingProjects = gsap.timeline({
            scrollTrigger: {
                trigger: projectsRef.current,
                toggleActions: 'restart pause reverse pause',
                scrub: true,

                // start: 'center center',
                pin: true,
                end: 4 * projects[0].offsetWidth,
                snap: 1 / 4,
                pinSpacing: true,
                // markers: true,
            }
        });

        slidingProjects.to(projects, {
            xPercent: -100 * (projects.length - 1),
            ease: "none",
        });


    }, [])

    return (
        <section className={styles.projects} ref={projectsRef}>
            <article className={styles.project}>Project 1</article>
            <article className={styles.project}>Project 2</article>
            <article className={styles.project}>Project 3</article>
            <article className={styles.project}>Project 4</article>
            <article className={styles.project}>Project 5</article>
        </section>
    );
}

export default Projects;