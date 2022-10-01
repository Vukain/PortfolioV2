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

    useEffect(() => {
        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        const projectsSection = projectsRef.current;
        const elementGetter = gsap.utils.selector(projectsSection);
        const projects: HTMLElement[] = elementGetter('[class*="project_"]');
        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const height = document.getElementById('projects')!.offsetTop;
        const size = isDesktop ? projects[0].offsetWidth : projects[0].offsetHeight;
        setSectionHeight(height);
        setProjectSize(size);

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
            // gsap.timeline({
            //     scrollTrigger: {
            //         trigger: '#app',
            //         onEnter: () => {
            //             setCurrentProject(index);
            //         },
            //         onEnterBack: () => {
            //             setCurrentProject(index);
            //         },
            //         start: `${2 * height + (index - 1) * size}px ${height - 1}px`,
            //         end: `${2 * height + index * size}px ${height - 1}px`,
            //         markers: true
            //     }
            // });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#app',
                    onLeaveBack: () => {
                        setCurrentProject(index === 0 ? 0 : index - 1);
                    },
                    onEnter: () => {
                        setCurrentProject(index);
                    },
                    onEnterBack: () => {
                        setCurrentProject(index);
                    },
                    onLeave: () => {
                        setCurrentProject(index === projects.length - 1 ? projects.length - 1 : index + 1);
                    },
                    start: `${2 * height + (index) * size - 1}px ${height}px`,
                    end: `${2 * height + index * size + 1}px ${height}px`,
                    // markers: true
                }
            });
        });

    }, [setCurrentSection])

    const projectNames = ['Pizza Builder', 'Pizza VS', 'DNails', 'ATRO', 'Portfolio V1'];

    const isEnglish = language === 'english';

    type ProjectData = {
        id: string,
        title: string,
        description: {
            polish: string,
            english: string,
        },
        technologies: string[],
        image?: React.FC<{ className?: string, title?: string }>
    };

    useEffect(() => { })

    const projects: ProjectData[] = [
        {
            id: 'pizza_builder',
            title: 'Pizza Builder',
            description: {
                english: "Two sibling projects with pizza as a focal point. The first one lets you build your own pizza, the latter compares value of different pizza orders.",
                polish: "Two sibling projects with pizza as a focal point. The first one lets you build your own pizza, the latter compares value of different pizza orders."
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator']
        },
        {
            id: 'pizza_vs',
            title: 'Pizza VS',
            description: {
                english: "Two sibling projects with pizza as a focal point. The first one lets you build your own pizza, the latter compares value of different pizza orders.",
                polish: "Two sibling projects with pizza as a focal point. The first one lets you build your own pizza, the latter compares value of different pizza orders."
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator']
        },
        {
            id: 'dnails',
            title: 'DNAILS',
            description: {
                english: 'Site for beauty services with a little twist - an ability to paint nails with colors fetched from database.',
                polish: 'Site for beauty services with a little twist - an ability to paint nails with colors fetched from database.'
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'firebase', 'canvas']
        },
        {
            id: 'atro',
            title: 'ATRO',
            description: {
                english: 'A homage to retro text based RPGs. Narration driven gameplay with several enemy types, hero classes, spells and item types.',
                polish: 'A homage to retro text based RPGs. Narration driven gameplay with several enemy types, hero classes, spells and item types.'
            },
            technologies: ['python', 'oop', 'colorama']
        },
        {
            id: 'portfolio_v1',
            title: 'Portfolio V1',
            description: {
                english: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                polish: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            },
            technologies: ['html', 'sass', 'javascript']
        },
    ];




    const mappedProjects = projects.map((data, index) => (<Project data={data} key={data.id} index={index} />))

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