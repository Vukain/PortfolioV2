import { projectImages } from '../images/project_images';

type ProjectData = {
    id: string,
    title: string,
    description: {
        polish: string,
        english: string,
    },
    technologies: string[],
    images: {
        logoImage: { small: string, normal: string },
        desktopImages?: Array<{ small: string, medium: string, big: string, full: string }>,
        mobileImages?: string[],
        codeImages?: Array<{ small: string, medium: string, big: string, full: string }>
    },
    links: {
        github: string,
        live: string
    }
};

export const projectNames = ['Pizza Builder', 'Pizza VS', 'DNails', 'ATRO', 'Portfolio V1'];

export const projects: ProjectData[] = [
    {
        id: 'pizza_builder',
        title: 'Pizza Builder',
        description: {
            english: "Wanted to make a pizza, but it takes a lot of time and is a little bit messy? No worries, this app got what you need! FREE ingredients of various types and ZERO callories on top of that, woah!",
            polish: "Chcielibyście zrobić pizzę, ale sporo z tym roboty, a dodatkowo ma tyle kalorii... Bez obaw, ta apka jest tym czego potrzebujecie! DARMOWE składniki i ZERO kalorii, czego chcieć więcej?"
        },
        technologies: ['html', 'sass', 'javascript', 'react', 'gsap', 'illustrator'],
        images: {
            logoImage: { small: projectImages.pizzaBuilderLogoSmall, normal: projectImages.pizzaBuilderLogo },
            desktopImages: [
                { small: projectImages.pizzaBuilderDesktopImage1Small, medium: projectImages.pizzaBuilderDesktopImage1Medium, big: projectImages.pizzaBuilderDesktopImage1Big, full: projectImages.pizzaBuilderDesktopImage1 },
                { small: projectImages.pizzaBuilderDesktopImage2Small, medium: projectImages.pizzaBuilderDesktopImage2Medium, big: projectImages.pizzaBuilderDesktopImage2Big, full: projectImages.pizzaBuilderDesktopImage2 },
                { small: projectImages.pizzaBuilderDesktopImage3Small, medium: projectImages.pizzaBuilderDesktopImage3Medium, big: projectImages.pizzaBuilderDesktopImage3Big, full: projectImages.pizzaBuilderDesktopImage3 }
            ],
            mobileImages: [projectImages.pizzaBuilderMobileImage1, projectImages.pizzaBuilderMobileImage2, projectImages.pizzaBuilderMobileImage3]
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
            logoImage: { small: projectImages.pizzaVSLogoSmall, normal: projectImages.pizzaVSLogo },
            desktopImages: [
                { small: projectImages.pizzaVSDesktopImage1Small, medium: projectImages.pizzaVSDesktopImage1Medium, big: projectImages.pizzaVSDesktopImage1Big, full: projectImages.pizzaVSDesktopImage1 },
                { small: projectImages.pizzaVSDesktopImage2Small, medium: projectImages.pizzaVSDesktopImage2Medium, big: projectImages.pizzaVSDesktopImage2Big, full: projectImages.pizzaVSDesktopImage2 },
                { small: projectImages.pizzaVSDesktopImage3Small, medium: projectImages.pizzaVSDesktopImage3Medium, big: projectImages.pizzaVSDesktopImage3Big, full: projectImages.pizzaVSDesktopImage3 }
            ],
            mobileImages: [projectImages.pizzaVSMobileImage1, projectImages.pizzaVSMobileImage2, projectImages.pizzaVSMobileImage3]
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
            logoImage: { small: projectImages.dnailsLogoSmall, normal: projectImages.dnailsLogo },
            desktopImages: [
                { small: projectImages.dnailsDesktopImage1Small, medium: projectImages.dnailsDesktopImage1Medium, big: projectImages.dnailsDesktopImage1Big, full: projectImages.dnailsDesktopImage1 },
                { small: projectImages.dnailsDesktopImage2Small, medium: projectImages.dnailsDesktopImage2Medium, big: projectImages.dnailsDesktopImage2Big, full: projectImages.dnailsDesktopImage2 },
                { small: projectImages.dnailsDesktopImage3Small, medium: projectImages.dnailsDesktopImage3Medium, big: projectImages.dnailsDesktopImage3Big, full: projectImages.dnailsDesktopImage3 },
                { small: projectImages.dnailsDesktopImage4Small, medium: projectImages.dnailsDesktopImage4Medium, big: projectImages.dnailsDesktopImage4Big, full: projectImages.dnailsDesktopImage4 }
            ],
            mobileImages: [projectImages.dnailsMobileImage1, projectImages.dnailsMobileImage2, projectImages.dnailsMobileImage3, projectImages.dnailsMobileImage4]
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
            logoImage: { small: projectImages.atroLogoSmall, normal: projectImages.atroLogo },
            codeImages: [
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
            logoImage: { small: projectImages.portfolioV1LogoSmall, normal: projectImages.portfolioV1Logo },
            desktopImages: [
                { small: projectImages.portfolioV1DesktopImage1Small, medium: projectImages.portfolioV1DesktopImage1Medium, big: projectImages.portfolioV1DesktopImage1Big, full: projectImages.portfolioV1DesktopImage1 },
                { small: projectImages.portfolioV1DesktopImage2Small, medium: projectImages.portfolioV1DesktopImage2Medium, big: projectImages.portfolioV1DesktopImage2Big, full: projectImages.portfolioV1DesktopImage2 },
                { small: projectImages.portfolioV1DesktopImage3Small, medium: projectImages.portfolioV1DesktopImage3Medium, big: projectImages.portfolioV1DesktopImage3Big, full: projectImages.portfolioV1DesktopImage3 },
                { small: projectImages.portfolioV1DesktopImage4Small, medium: projectImages.portfolioV1DesktopImage4Medium, big: projectImages.portfolioV1DesktopImage4Big, full: projectImages.portfolioV1DesktopImage4 }
            ],
            mobileImages: [projectImages.portfolioV1MobileImage1, projectImages.portfolioV1MobileImage2, projectImages.portfolioV1MobileImage3, projectImages.portfolioV1MobileImage4]
        },
        links: {
            github: 'https://github.com/Vukain/PortfolioV1B',
            live: 'https://vukain.github.io/PortfolioV1B/'
        }
    },
];
