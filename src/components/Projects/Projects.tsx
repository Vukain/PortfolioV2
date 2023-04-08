import { useRef, useEffect, useContext, useState } from 'react';
import { gsap } from 'gsap';

import styles from './Projects.module.sass';

import { AppContext } from '../../store/AppContext';
import { ColorEdge, Menu, Project, SectionName } from '../';

import { projectImages } from '../../images/project_images';
import { checkMotionReduce } from '../../utils/checkMotionReduce';

export const Projects: React.FC = () => {

    const { language, setCurrentSection } = useContext(AppContext);

    const projectsRef = useRef(null);

    const [projectSize, setProjectSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);

    const isEnglish = language === 'english';


    useEffect(() => {
        const isDesktop = window.matchMedia('(orientation: landscape)').matches;
        const motionNotReduced = !checkMotionReduce();

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
            gsap.set(projects.slice(1), { xPercent: 120 })

            slidingProjectsTL.to(projects.slice(1), {
                xPercent: 0,
                stagger: .5,
                ease: "sine.inOut"
            });

            fadingProjectsTL.to(projects.slice(0, -1), {
                rotateY: motionNotReduced ? '20deg' : 0,
                scale: motionNotReduced ? .7 : 1,
                ease: "sine.inOut",
                stagger: .5,
                autoAlpha: 0
            });

        } else {
            gsap.set(projects.slice(1), { yPercent: 120 })

            slidingProjectsTL.to(projects.slice(1), {
                yPercent: 0,
                stagger: .5,
                ease: 'sine.inOut'
            });

            fadingProjectsTL.to(projects.slice(0, -1), {
                scale: motionNotReduced ? .7 : 1,
                ease: "sine.inOut",
                stagger: .5,
                opacity: 0,
                autoAlpha: 0
            });
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
            logo: { small: string, normal: string },
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
                polish: "Chcielibyście zrobić pizzę, ale sporo z tym roboty, a dodatkowo ma tyle kalorii... Bez obaw, ta apka jest tym czego potrzebujecie! DARMOWE składniki i ZERO kalorii, czego chcieć więcej?"
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
            images: {
                logo: { small: projectImages.pizzaBuilderLogoSmall, normal: projectImages.pizzaBuilderLogo },
                desktop: [
                    { small: projectImages.pizzaBuilderDesktopImage1Small, medium: projectImages.pizzaBuilderDesktopImage1Medium, big: projectImages.pizzaBuilderDesktopImage1Big, full: projectImages.pizzaBuilderDesktopImage1 },
                    { small: projectImages.pizzaBuilderDesktopImage2Small, medium: projectImages.pizzaBuilderDesktopImage2Medium, big: projectImages.pizzaBuilderDesktopImage2Big, full: projectImages.pizzaBuilderDesktopImage2 },
                    { small: projectImages.pizzaBuilderDesktopImage3Small, medium: projectImages.pizzaBuilderDesktopImage3Medium, big: projectImages.pizzaBuilderDesktopImage3Big, full: projectImages.pizzaBuilderDesktopImage3 }
                ],
                mobile: [projectImages.pizzaBuilderMobileImage1, projectImages.pizzaBuilderMobileImage2, projectImages.pizzaBuilderMobileImage3]
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
                english: "Have you ever wondered what's better to take while ordering pizzas? What will get you more food, what will yield better value? You didn't?! Ohh... but now you can check it anyway! App calculates order value and let's you choose the better option.",
                polish: "Mieliście kiedyś dylematy podczas zamawiania pizzy? Którym wariantem się bardziej najecie, lub który ma lepszą wartość? Nie?! No cóż... teraz możecie to sprawdzić i tak! Apka oblicza opłacalność zamówienia i pozwala wybrać lepszą opcję."
            },
            technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
            images: {
                logo: { small: projectImages.pizzaVSLogoSmall, normal: projectImages.pizzaVSLogo },
                desktop: [
                    { small: projectImages.pizzaVSDesktopImage1Small, medium: projectImages.pizzaVSDesktopImage1Medium, big: projectImages.pizzaVSDesktopImage1Big, full: projectImages.pizzaVSDesktopImage1 },
                    { small: projectImages.pizzaVSDesktopImage2Small, medium: projectImages.pizzaVSDesktopImage2Medium, big: projectImages.pizzaVSDesktopImage2Big, full: projectImages.pizzaVSDesktopImage2 },
                    { small: projectImages.pizzaVSDesktopImage3Small, medium: projectImages.pizzaVSDesktopImage3Medium, big: projectImages.pizzaVSDesktopImage3Big, full: projectImages.pizzaVSDesktopImage3 }
                ],
                mobile: [projectImages.pizzaVSMobileImage1, projectImages.pizzaVSMobileImage2, projectImages.pizzaVSMobileImage3]
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
                logo: { small: projectImages.dnailsLogoSmall, normal: projectImages.dnailsLogo },
                desktop: [
                    { small: projectImages.dnailsDesktopImage1Small, medium: projectImages.dnailsDesktopImage1Medium, big: projectImages.dnailsDesktopImage1Big, full: projectImages.dnailsDesktopImage1 },
                    { small: projectImages.dnailsDesktopImage2Small, medium: projectImages.dnailsDesktopImage2Medium, big: projectImages.dnailsDesktopImage2Big, full: projectImages.dnailsDesktopImage2 },
                    { small: projectImages.dnailsDesktopImage3Small, medium: projectImages.dnailsDesktopImage3Medium, big: projectImages.dnailsDesktopImage3Big, full: projectImages.dnailsDesktopImage3 },
                    { small: projectImages.dnailsDesktopImage4Small, medium: projectImages.dnailsDesktopImage4Medium, big: projectImages.dnailsDesktopImage4Big, full: projectImages.dnailsDesktopImage4 }
                ],
                mobile: [projectImages.dnailsMobileImage1, projectImages.dnailsMobileImage2, projectImages.dnailsMobileImage3, projectImages.dnailsMobileImage4]
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
                logo: { small: projectImages.atroLogoSmall, normal: projectImages.atroLogo },
                code: [
                    { small: projectImages.atroCodeImage1Small, medium: projectImages.atroCodeImage1Medium, big: projectImages.atroCodeImage1Big, full: projectImages.atroCodeImage1 },
                    { small: projectImages.atroCodeImage2Small, medium: projectImages.atroCodeImage2Medium, big: projectImages.atroCodeImage2Big, full: projectImages.atroCodeImage2 },
                    { small: projectImages.atroCodeImage3Small, medium: projectImages.atroCodeImage3Medium, big: projectImages.atroCodeImage3Big, full: projectImages.atroCodeImage3 }
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
                polish: 'Pierwsze portfolio stworzone jako ćwiczenie i dla testowania różnych pomysłów. Posiada tryb jasny i ciemny. HTML połączony z Sassem i czystym JavaScriptem użytym do efektów scrollowania.'
            },
            technologies: ['html', 'sass', 'javascript', 'illustrator'],
            images: {
                logo: { small: projectImages.portfolioV1LogoSmall, normal: projectImages.portfolioV1Logo },
                desktop: [
                    { small: projectImages.portfolioV1DesktopImage1Small, medium: projectImages.portfolioV1DesktopImage1Medium, big: projectImages.portfolioV1DesktopImage1Big, full: projectImages.portfolioV1DesktopImage1 },
                    { small: projectImages.portfolioV1DesktopImage2Small, medium: projectImages.portfolioV1DesktopImage2Medium, big: projectImages.portfolioV1DesktopImage2Big, full: projectImages.portfolioV1DesktopImage2 },
                    { small: projectImages.portfolioV1DesktopImage3Small, medium: projectImages.portfolioV1DesktopImage3Medium, big: projectImages.portfolioV1DesktopImage3Big, full: projectImages.portfolioV1DesktopImage3 },
                    { small: projectImages.portfolioV1DesktopImage4Small, medium: projectImages.portfolioV1DesktopImage4Medium, big: projectImages.portfolioV1DesktopImage4Big, full: projectImages.portfolioV1DesktopImage4 }
                ],
                mobile: [projectImages.portfolioV1MobileImage1, projectImages.portfolioV1MobileImage2, projectImages.portfolioV1MobileImage3, projectImages.portfolioV1MobileImage4]
            },
            links: {
                github: 'https://github.com/Vukain/PortfolioV1B',
                live: 'https://vukain.github.io/PortfolioV1B/'
            }
        },
    ];

    const mappedProjects = projects.map((data, index) => (<Project data={data} key={index + data.id} index={index} numberOfProjects={projects.length} currentProject={currentProject} setCurrentProject={setCurrentProject} projectSize={projectSize} sectionHeight={sectionHeight} />));

    return (
        <>
            <ColorEdge direction='up' />
            <section className={styles.projects} ref={projectsRef} id="projects">
                <SectionName lightBackground={true}>{isEnglish ? 'projects' : 'projekty'}</SectionName>

                <div className={styles.gallery} id="gallery">
                    {mappedProjects}
                </div>

                <Menu names={projectNames} currentProject={currentProject} projectSize={projectSize} sectionHeight={sectionHeight} />

            </section>
            <ColorEdge direction='down' />
        </>
    );
};