import { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';

import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';
import { SectionName } from '../SectionName/SectionName';
import { Menu } from './Menu/Menu';

export const Projects: React.FC = () => {

    const { setCurrentSection } = useContext(AppContext);

    const projectsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const [projectSize, setProjectSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);

    // console.log('rerender')

    useEffect(() => {
        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        const projectsSection = projectsRef.current;
        const elementGetter = gsap.utils.selector(projectsSection);
        const projects: HTMLElement[] = elementGetter('[class*="project_"]');

        const height = document.getElementById('header')!.offsetHeight
        const size = isDesktop ? projects[0].offsetWidth : projects[0].offsetHeight;
        setSectionHeight(height);
        setProjectSize(size);

        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const slidingProjects = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: true,
                pin: true,
                pinSpacing: true,
                start: '10px 10px',
                end: height + (projects.length - 1) * size,
                snap: 1 / (projects.length - 1),
                // markers: true,
                onEnter: () => {
                    setCurrentSection('projects');
                    window.history.pushState({}, '', '#projects');
                },
                onEnterBack: () => {
                    setCurrentSection('projects');
                    window.history.pushState({}, '', '#projects');
                }
            }
        });

        if (isDesktop) {
            slidingProjects.to(projects.slice(1), {
                xPercent: -100,
                stagger: .5,
                ease: "none"
            });
        } else {
            slidingProjects.to(projects.slice(1), {
                yPercent: -100,
                stagger: .5,
                ease: "none"
            });
        };

        projects.forEach((_, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#app',
                    onEnter: () => {
                        setCurrentProject(index);
                    },
                    onEnterBack: () => {
                        setCurrentProject(index);
                    },
                    start: `${2 * height + (index - 1) * size}px ${height - 1}px)`,
                    end: `${2 * height + index * size}px ${height - 1}px`,
                    // markers: true
                }
            });
        });

    }, [setCurrentSection])

    const projectNames = ['Pizza Builder', 'Pizza VS', 'DNails', 'ATRO', 'Portfolio V1'];


    return (
        <section className={styles.projects} ref={projectsRef} id="projects">
            <SectionName lighter={true}>projekty</SectionName>

            <div className={styles.gallery}>
                <article className={styles.project}>Project 1</article>
                <article className={styles.project}>Project 2</article>
                <article className={styles.project}>Project 3</article>
                <article className={styles.project}>Project 4</article>
                <article className={styles.project}>Project 5</article>
            </div>

            <Menu names={projectNames} currentProject={currentProject} projectSize={projectSize} sectionHeight={sectionHeight} />

        </section>
    );
};