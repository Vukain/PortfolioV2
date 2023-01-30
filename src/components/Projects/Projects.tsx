import { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';

import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';
import { SectionName } from '../../layout/SectionName/SectionName';
import { ColorEdge } from '../../layout/ColorEdge/ColorEdge';
import { Menu } from './Menu/Menu';
import { Project } from './Project/Project';

import {
    pizzaBuilderLogo, pizzaBuilderMobileImage1, pizzaBuilderMobileImage2, pizzaBuilderMobileImage3,
    pizzaBuilderDesktopImage1Small, pizzaBuilderDesktopImage1Medium, pizzaBuilderDesktopImage1Big, pizzaBuilderDesktopImage1,
    pizzaBuilderDesktopImage2Small, pizzaBuilderDesktopImage2Medium, pizzaBuilderDesktopImage2Big, pizzaBuilderDesktopImage2,
    pizzaBuilderDesktopImage3Small, pizzaBuilderDesktopImage3Medium, pizzaBuilderDesktopImage3Big, pizzaBuilderDesktopImage3,
    pizzaVSLogo, pizzaVSMobileImage1, pizzaVSMobileImage2, pizzaVSMobileImage3,
    pizzaVSDesktopImage1Small, pizzaVSDesktopImage1Medium, pizzaVSDesktopImage1Big, pizzaVSDesktopImage1,
    pizzaVSDesktopImage2Small, pizzaVSDesktopImage2Medium, pizzaVSDesktopImage2Big, pizzaVSDesktopImage2,
    pizzaVSDesktopImage3Small, pizzaVSDesktopImage3Medium, pizzaVSDesktopImage3Big, pizzaVSDesktopImage3,
    dnailsLogo, dnailsMobileImage1, dnailsMobileImage2, dnailsMobileImage3, dnailsMobileImage4,
    dnailsDesktopImage1Small, dnailsDesktopImage1Medium, dnailsDesktopImage1Big, dnailsDesktopImage1,
    dnailsDesktopImage2Small, dnailsDesktopImage2Medium, dnailsDesktopImage2Big, dnailsDesktopImage2,
    dnailsDesktopImage3Small, dnailsDesktopImage3Medium, dnailsDesktopImage3Big, dnailsDesktopImage3,
    dnailsDesktopImage4Small, dnailsDesktopImage4Medium, dnailsDesktopImage4Big, dnailsDesktopImage4,
    atroLogo,
    atroCodeImage1Small, atroCodeImage1Medium, atroCodeImage1Big, atroCodeImage1,
    atroCodeImage2Small, atroCodeImage2Medium, atroCodeImage2Big, atroCodeImage2,
    atroCodeImage3Small, atroCodeImage3Medium, atroCodeImage3Big, atroCodeImage3,
    portfolioV1Logo, portfolioV1MobileImage1, portfolioV1MobileImage2, portfolioV1MobileImage3, portfolioV1MobileImage4,
    portfolioV1DesktopImage1Small, portfolioV1DesktopImage1Medium, portfolioV1DesktopImage1Big, portfolioV1DesktopImage1,
    portfolioV1DesktopImage2Small, portfolioV1DesktopImage2Medium, portfolioV1DesktopImage2Big, portfolioV1DesktopImage2,
    portfolioV1DesktopImage3Small, portfolioV1DesktopImage3Medium, portfolioV1DesktopImage3Big, portfolioV1DesktopImage3,
    portfolioV1DesktopImage4Small, portfolioV1DesktopImage4Medium, portfolioV1DesktopImage4Big, portfolioV1DesktopImage4
} from '../../media/project_images';

export const Projects: React.FC = () => {

    const { language, setCurrentSection, motionNotReduced } = useContext(AppContext);

    const projectsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const [projectSize, setProjectSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);

    const isEnglish = language === 'english';

    useEffect(() => {
        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        // Get elements
        const projectsSection = projectsRef.current;
        const elementGetter = gsap.utils.selector(projectsSection);
        const projects: HTMLElement[] = elementGetter('[class*="project_"]');
        // const projects = Array.prototype.slice.call(projectsRef.current?.querySelectorAll('[class*="project"]'));

        const height = document.getElementById('projects')!.offsetTop;
        const size = isDesktop ? projects[0].offsetWidth : projects[0].offsetHeight;
        setSectionHeight(height);
        setProjectSize(size);

        // Create timeline for sliding projects, must be separate from fading
        const slidingProjectsTL = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: .5,
                pin: true,
                pinSpacing: true,
                start: '10px 10px',
                end: height + (projects.length - 1) * size,
                snap: 1 / (projects.length - 1),
                invalidateOnRefresh: true,
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

        // Create timeline for projects fading and warping
        const fadingProjectsTL = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: .5,
                start: '10px 10px',
                invalidateOnRefresh: true,
                end: height + (projects.length - 1) * size,
                snap: 1 / (projects.length - 1)
            }
        });

        // Set correct animations for screen orientation
        if (isDesktop) {
            gsap.set(projects.slice(1), { scale: 1, xPercent: 120 })

            slidingProjectsTL.to(projects.slice(1), {
                xPercent: 0,
                rotateY: 0,
                stagger: .5,
                ease: "sine.inOut"
            });

            if (motionNotReduced) {
                fadingProjectsTL.to(projects.slice(0, projects.length - 1), {
                    rotateY: '20deg',
                    scale: .7,
                    stagger: .5,
                    ease: "sine.inOut",
                    opacity: 0
                });
            };

        } else {
            gsap.set(projects.slice(1), { scale: 1, yPercent: 120 })

            slidingProjectsTL.to(projects.slice(1), {
                yPercent: 0,
                rotateX: 0,
                stagger: .5,
                ease: 'sine.inOut'
            });

            if (motionNotReduced) {
                fadingProjectsTL.to(projects.slice(0, -1), {
                    // rotateX: '-20deg',
                    scale: .7,
                    stagger: .5,
                    ease: "sine.inOut",
                    opacity: 0
                });
            };
        };

    }, [setCurrentSection])

    // Project data with mapping
    const projectNames = ['Pizza Builder', 'Pizza VS', 'DNails', 'ATRO', 'Portfolio V1'];

    type ProjectData = {
        id: string,
        title: string,
        description: {
            polish: string,
            english: string,
        },
        technologies: string[],
        images: {
            logo: string,
            desktop?: Array<{ small: string, medium: string, big: string, full: string }>,
            mobile?: string[],
            code?: Array<{ small: string, medium: string, big: string, full: string }>
        },
        links: {
            github: string,
            live: string
        }
    };

    const projects: ProjectData[] = [
        {
            id: 'pizza_builder',
            title: 'Pizza Builder',
            description: {
                english: "Wanted to make a pizza, but it takes a lot of time and is a little bit messy? No worries, this app got what you need! FREE ingredients of various types and ZERO callories on top of that, woah!",
                polish: "Chcielibyście zrobić pizzę, ale to czasochłonne i powoduje niezły bałagan w kuchni? Bez obaw, ta apka jest tym czego potrzebujecie! Na dodatek DARMOWE składniki i ZERO kalorii!"
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
            images: {
                logo: pizzaBuilderLogo,
                desktop: [
                    { small: pizzaBuilderDesktopImage1Small, medium: pizzaBuilderDesktopImage1Medium, big: pizzaBuilderDesktopImage1Big, full: pizzaBuilderDesktopImage1 },
                    { small: pizzaBuilderDesktopImage2Small, medium: pizzaBuilderDesktopImage2Medium, big: pizzaBuilderDesktopImage2Big, full: pizzaBuilderDesktopImage2 },
                    { small: pizzaBuilderDesktopImage3Small, medium: pizzaBuilderDesktopImage3Medium, big: pizzaBuilderDesktopImage3Big, full: pizzaBuilderDesktopImage3 }
                ],
                mobile: [pizzaBuilderMobileImage1, pizzaBuilderMobileImage2, pizzaBuilderMobileImage3]
            },
            links: {
                github: 'https://github.com/Vukain/PizzaBuilder',
                live: 'https://vukain.github.io/PizzaBuilder/'
            }
        },
        {
            id: 'pizza_vs',
            title: 'Pizza VS',
            description: {
                english: "Have You ever wondered what's better to take while ordering pizzas? What will get you more food, what will yield better value? You didn't?! Ohh... but now you can check it anyway! App calculates order value and let's you choose the better option.",
                polish: "Zastanawialiście się kiedyś co lepiej wybrać podczas zamawiania pizzy? Którym wariantem się bardziej najecie, lub który ma lepszą wartość? Nie?! No cóż... teraz możecie to sprawdzić i tak! Apka oblicza opłacalność zamówienia i pozwala wybrać lepszą opcję."
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
            images: {
                logo: pizzaVSLogo,
                desktop: [
                    { small: pizzaVSDesktopImage1Small, medium: pizzaVSDesktopImage1Medium, big: pizzaVSDesktopImage1Big, full: pizzaVSDesktopImage1 },
                    { small: pizzaVSDesktopImage2Small, medium: pizzaVSDesktopImage2Medium, big: pizzaVSDesktopImage2Big, full: pizzaVSDesktopImage2 },
                    { small: pizzaVSDesktopImage3Small, medium: pizzaVSDesktopImage3Medium, big: pizzaVSDesktopImage3Big, full: pizzaVSDesktopImage3 }
                ],
                mobile: [pizzaVSMobileImage1, pizzaVSMobileImage2, pizzaVSMobileImage3]
            },
            links: {
                github: 'https://github.com/Vukain/PizzaVS',
                live: 'https://vukain.github.io/PizzaVS/'
            }
        },
        {
            id: 'dnails',
            title: 'DNAILS',
            description: {
                english: 'Site for beauty services with a little twist, an ability to paint nails with colors fetched from database. Includes a custom calendar with available visit dates and an ability to book your own.',
                polish: 'Strona dla branży beauty z małym twistem, czyli możliwością pomalowania paznokci przy pomocy kolorów pobranych z bazy danych. Posiada kalendarz ukazujący dostępne daty wizyt, wraz z możliwością rezerwacji własnej.'
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'firebase', 'canvas'],
            images: {
                logo: dnailsLogo,
                desktop: [
                    { small: dnailsDesktopImage1Small, medium: dnailsDesktopImage1Medium, big: dnailsDesktopImage1Big, full: dnailsDesktopImage1 },
                    { small: dnailsDesktopImage2Small, medium: dnailsDesktopImage2Medium, big: dnailsDesktopImage2Big, full: dnailsDesktopImage2 },
                    { small: dnailsDesktopImage3Small, medium: dnailsDesktopImage3Medium, big: dnailsDesktopImage3Big, full: dnailsDesktopImage3 },
                    { small: dnailsDesktopImage4Small, medium: dnailsDesktopImage4Medium, big: dnailsDesktopImage4Big, full: dnailsDesktopImage4 }
                ],
                mobile: [dnailsMobileImage1, dnailsMobileImage2, dnailsMobileImage3, dnailsMobileImage4]
            },
            links: {
                github: 'https://github.com/Vukain/DNails',
                live: 'https://vukain.github.io/DNails/'
            }
        },
        {
            id: 'atro',
            title: 'ATRO',
            description: {
                english: 'A homage to retro text based RPGs. Narration driven gameplay with several enemy types, hero classes, spells and item categories.',
                polish: 'Hołd dla tekstowych gier RPG w stylu retro. Rozgrywka oparta o narrację, posiada kilka typów przeciwników, klas bahaterów, oraz różnorakie czary i przedmioty.'
            },
            technologies: ['python', 'oop', 'colorama'],
            images: {
                logo: atroLogo,
                code: [
                    { small: atroCodeImage1Small, medium: atroCodeImage1Medium, big: atroCodeImage1Big, full: atroCodeImage1 },
                    { small: atroCodeImage2Small, medium: atroCodeImage2Medium, big: atroCodeImage2Big, full: atroCodeImage2 },
                    { small: atroCodeImage3Small, medium: atroCodeImage3Medium, big: atroCodeImage3Big, full: atroCodeImage3 }
                ]
            },
            links: {
                github: 'https://github.com/Vukain/ATRO',
                live: 'https://replit.com/@MichalPi/ATRO'
            }
        },
        {
            id: 'portfolio_v1',
            title: 'Portfolio V1',
            description: {
                english: 'First portfolio intended as an excercise and a playground. Features a light and dark mode. HTML paired with Sass, vanilla JavaScript used for scroll effects.',
                polish: 'Pierwsza strona portfolio stworzona jako ćwiczenie i dla testowania różnych pomysłów. Posiada tryb jasny i ciemny. HTML połączony z Sassem i czystym JavaScriptem użytym do efektów scrollowania.'
            },
            technologies: ['html', 'sass', 'javascript', 'illustrator'],
            images: {
                logo: portfolioV1Logo,
                desktop: [
                    { small: portfolioV1DesktopImage1Small, medium: portfolioV1DesktopImage1Medium, big: portfolioV1DesktopImage1Big, full: portfolioV1DesktopImage1 },
                    { small: portfolioV1DesktopImage2Small, medium: portfolioV1DesktopImage2Medium, big: portfolioV1DesktopImage2Big, full: portfolioV1DesktopImage2 },
                    { small: portfolioV1DesktopImage3Small, medium: portfolioV1DesktopImage3Medium, big: portfolioV1DesktopImage3Big, full: portfolioV1DesktopImage3 },
                    { small: portfolioV1DesktopImage4Small, medium: portfolioV1DesktopImage4Medium, big: portfolioV1DesktopImage4Big, full: portfolioV1DesktopImage4 }
                ],
                mobile: [portfolioV1MobileImage1, portfolioV1MobileImage2, portfolioV1MobileImage3, portfolioV1MobileImage4]
            },
            links: {
                github: 'https://github.com/Vukain/PortfolioV1B',
                live: 'https://vukain.github.io/PortfolioV1B/'
            }
        },
    ];

    const mappedProjects = projects.map((data, index) => (<Project data={data} key={index + data.id} index={index} numberOfProjects={projects.length} currentProject={currentProject} setCurrentProject={setCurrentProject} projectSize={projectSize} sectionHeight={sectionHeight} />))

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