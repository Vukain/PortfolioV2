import { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';

import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';
import { SectionName } from '../SectionName/SectionName';
import { ColorEdge } from '../../layout/ColorEdge/ColorEdge';
import { Menu } from './Menu/Menu';
import { Project } from './Project/Project';

import pizzaBuilderLogo from '../../media/project_images/pizza_builder_logo.png';
import pizzaBuilderMobileImage1 from '../../media/project_images/pizza_builder_mobile_1.png';
import pizzaBuilderMobileImage2 from '../../media/project_images/pizza_builder_mobile_2.png';
import pizzaBuilderMobileImage3 from '../../media/project_images/pizza_builder_mobile_3.png';
import pizzaBuilderDesktopImage1 from '../../media/project_images/pizza_builder_desktop_1.png';
import pizzaBuilderDesktopImage2 from '../../media/project_images/pizza_builder_desktop_2.png';
import pizzaBuilderDesktopImage3 from '../../media/project_images/pizza_builder_desktop_3.png';

import pizzaVSLogo from '../../media/project_images/pizza_vs_logo.png';
import pizzaVSMobileImage1 from '../../media/project_images/pizza_vs_mobile_1.png';
import pizzaVSMobileImage2 from '../../media/project_images/pizza_vs_mobile_2.png';
import pizzaVSMobileImage3 from '../../media/project_images/pizza_vs_mobile_3.png';
import pizzaVSDesktopImage1 from '../../media/project_images/pizza_vs_desktop_1.png';
import pizzaVSDesktopImage2 from '../../media/project_images/pizza_vs_desktop_2.png';
import pizzaVSDesktopImage3 from '../../media/project_images/pizza_vs_desktop_3.png';

import dnailsLogo from '../../media/project_images/dnails_logo.png';
import dnailsMobileImage1 from '../../media/project_images/dnails_mobile_1.png';
import dnailsMobileImage2 from '../../media/project_images/dnails_mobile_2.png';
import dnailsMobileImage3 from '../../media/project_images/dnails_mobile_3.png';
import dnailsMobileImage4 from '../../media/project_images/dnails_mobile_4.png';
import dnailsDesktopImage1 from '../../media/project_images/dnails_desktop_1.png';
import dnailsDesktopImage2 from '../../media/project_images/dnails_desktop_2.png';
import dnailsDesktopImage3 from '../../media/project_images/dnails_desktop_3.png';
import dnailsDesktopImage4 from '../../media/project_images/dnails_desktop_4.png';

import atroLogo from '../../media/project_images/atro_logo.png';
import atroCodeImage1 from '../../media/project_images/atro_code_1.png';
import atroCodeImage2 from '../../media/project_images/atro_code_2.png';
import atroCodeImage3 from '../../media/project_images/atro_code_3.png';

import portfolioV1Logo from '../../media/project_images/portfolio_v1_logo.png';
import portfolioV1MobileImage1 from '../../media/project_images/portfolio_v1_mobile_1.png';
import portfolioV1MobileImage2 from '../../media/project_images/portfolio_v1_mobile_2.png';
import portfolioV1MobileImage3 from '../../media/project_images/portfolio_v1_mobile_3.png';
import portfolioV1MobileImage4 from '../../media/project_images/portfolio_v1_mobile_4.png';
import portfolioV1DesktopImage1 from '../../media/project_images/portfolio_v1_desktop_1.png';
import portfolioV1DesktopImage2 from '../../media/project_images/portfolio_v1_desktop_2.png';
import portfolioV1DesktopImage3 from '../../media/project_images/portfolio_v1_desktop_3.png';
import portfolioV1DesktopImage4 from '../../media/project_images/portfolio_v1_desktop_4.png';

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
        images: { logo: string, desktop?: string[], mobile?: string[], code?: string[] },
        links: { github: string, live: string }
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
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
            images: {
                logo: pizzaBuilderLogo,
                desktop: [pizzaBuilderDesktopImage1, pizzaBuilderDesktopImage2, pizzaBuilderDesktopImage3],
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
                desktop: [pizzaVSDesktopImage1, pizzaVSDesktopImage2, pizzaVSDesktopImage3],
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
                desktop: [dnailsDesktopImage1, dnailsDesktopImage2, dnailsDesktopImage3, dnailsDesktopImage4],
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
                english: 'A homage to retro text based RPGs. Narration driven gameplay with several enemy types, hero classes, spells and item types.',
                polish: 'Hołd dla tekstowych gier RPG w stylu retro. Rozgrywka oparta o narrację, posiada kilka typów przeciwników, klas bahaterów, oraz różnorakie czary i przedmioty.'
            },
            technologies: ['python', 'oop', 'colorama'],
            images: {
                logo: atroLogo,
                code: [atroCodeImage1, atroCodeImage2, atroCodeImage3]
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
                desktop: [portfolioV1DesktopImage1, portfolioV1DesktopImage2, portfolioV1DesktopImage3, portfolioV1DesktopImage4],
                mobile: [portfolioV1MobileImage1, portfolioV1MobileImage2, portfolioV1MobileImage3, portfolioV1MobileImage4]
            },
            links: {
                github: 'https://github.com/Vukain/PortfolioV1B',
                live: 'https://vukain.github.io/PortfolioV1B/'
            }
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