import { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';

import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';
import { SectionName } from '../SectionName/SectionName';
import { ColorEdge } from '../../layout/ColorEdge/ColorEdge';
import { Menu } from './Menu/Menu';
import { Project } from './Project/Project';

export const Projects: React.FC = () => {

    const { language, setCurrentSection } = useContext(AppContext);

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

        const height = document.getElementById('projects')!.offsetTop;
        const size = isDesktop ? projects[0].offsetWidth : projects[0].offsetHeight;
        setSectionHeight(height);
        setProjectSize(size);

        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const slidingProjects = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: .5,
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

    const isEnglish = language === 'english';

    type ProjectData = {
        id: string, content: Record<'english' | 'polish', {
            title: string,
            description: string,
            image?: React.FC<{ className?: string, title?: string }>,
        }>
    };

    const projects: ProjectData[] = [
        { id: 'test1', content: { english: { title: 'project 1', description: 'test' }, polish: { title: 'projekt 1', description: 'test' } } },
        { id: 'test2', content: { english: { title: 'project 2', description: 'test' }, polish: { title: 'projekt 2', description: 'test' } } },
        { id: 'test3', content: { english: { title: 'project 3', description: 'test' }, polish: { title: 'projekt 3', description: 'test' } } },
        { id: 'test4', content: { english: { title: 'project 4', description: 'test' }, polish: { title: 'projekt 4', description: 'test' } } },
        { id: 'test5', content: { english: { title: 'project 5', description: 'test' }, polish: { title: 'projekt 5', description: 'test' } } },
    ];

    const mappedProjects = projects.map((data) => (<Project data={data} key={data.id} />))

    return (
        <>
            <ColorEdge direction='up' />
            <section className={styles.projects} ref={projectsRef} id="projects">
                <SectionName lighter={true}>{isEnglish ? 'projects' : 'projekty'}</SectionName>

                <div className={styles.gallery}>
                    {mappedProjects}
                </div>

                <Menu names={projectNames} currentProject={currentProject} projectSize={projectSize} sectionHeight={sectionHeight} />

            </section>
            <ColorEdge direction='down' />
        </>
    );
};