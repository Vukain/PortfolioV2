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
                    // document.body.style.overflow = "hidden";
                    // setTimeout(() => {
                    //     document.body.style.overflow = "scroll";
                    // }, 200);
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

        // projects.forEach((_, index) => {
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

        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '#app',
        //         onLeaveBack: () => {
        //             setCurrentProject(index === 0 ? 0 : index - 1);
        //         },
        //         onEnter: () => {
        //             setCurrentProject(index);
        //         },
        //         onEnterBack: () => {
        //             setCurrentProject(index);
        //         },
        //         onLeave: () => {
        //             setCurrentProject(index === projects.length - 1 ? projects.length - 1 : index + 1);
        //         },
        //         start: `${2 * height + (index) * size - 1}px ${height}px`,
        //         end: `${2 * height + index * size + 1}px ${height}px`,
        //         // markers: true
        //     }
        // });
        // });

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
                english: "Wanted to make a pizza, but it takes a lot of time and is a little bit messy? No worries, this app got what you need! FREE ingredients of various types and ZERO callories on top of that, woah!",
                polish: "Chcielibyście zrobić pizzę, ale to czasochłonne i powoduje niezły bałagan w kuchni? Bez obaw, ta apka jest tym czego potrzebujecie! DARMOWE składniki i ZERO kalorii na dodatek, wow!"
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator']
        },
        {
            id: 'pizza_vs',
            title: 'Pizza VS',
            description: {
                english: "Have You ever wondered what's better to take while ordering pizzas? What will get you more food, what will yield better value? You didn't?! Ohh... but now you can check it anyway! App calculates order value and let's you choose the better option.",
                polish: "Zastanawialiście się kiedyś co lepiej wybrać podczas zamawiania pizzy? Którym wariantem się bardziej najecie, lub który ma lepszą wartość? Nie?! No cóż... teraz możecie to sprawdzić i tak! Apka oblicza opłacalność zamówienia i pozwala wybrać lepszą opcję."
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator']
        },
        {
            id: 'dnails',
            title: 'DNAILS',
            description: {
                english: 'Site for beauty services with a little twist, an ability to paint nails with colors fetched from database. Includes a custom calendar with available visit dates and an ability to book your own.',
                polish: 'Strona dla branży beauty z małym twistem, czyli możliwością pomalowania paznokci przy pomocy kolorów pobranych z bazy danych. Posiada kalendarz ukazujący dostępne daty wizyt, wraz z możliwością rezerwacji własnej.'
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'firebase', 'canvas']
        },
        {
            id: 'atro',
            title: 'ATRO',
            description: {
                english: 'A homage to retro text based RPGs. Narration driven gameplay with several enemy types, hero classes, spells and item types.',
                polish: 'Hołd dla tekstowych gier RPG w stylu retro. Rozgrywka oparta o narrację, posiada kilka typów przeciwników, klas bahaterów, oraz różnorakie czary i przedmioty.'
            },
            technologies: ['python', 'oop', 'colorama']
        },
        {
            id: 'portfolio_v1',
            title: 'Portfolio V1',
            description: {
                english: 'First portfolio intended as an excercise and a playground. Features a light and dark mode. HTML paired with Sass, vanilla JavaScript used for scroll effects.',
                polish: 'Pierwsza strona portfolio stworzona jako ćwiczenie i dla testowania różnych pomysłów. Posiada tryb jasny i ciemny. HTML połączony z Sassem i czystym JavaScriptem użytym do efektów scrollowania.'
            },
            technologies: ['html', 'sass', 'javascript', 'illustrator']
        },
    ];

    const mappedProjects = projects.map((data, index) => (<Project data={data} key={data.id} index={index} numberOfProjects={projects.length} currentProject={currentProject} setCurrentProject={setCurrentProject} projectSize={projectSize} sectionHeight={sectionHeight} />))

    return (
        <>
            <ColorEdge direction='up' />
            <section className={styles.projects} ref={projectsRef} id="projects">
                <SectionName lighter={true}>{isEnglish ? 'projects' : 'projekty'}</SectionName>

                <div className={styles.gallery} id="gallery">
                    {mappedProjects}
                </div>

                <Menu names={projectNames} currentProject={currentProject} projectSize={projectSize} sectionHeight={sectionHeight} />

            </section>
            <ColorEdge direction='down' />
        </>
    );
};