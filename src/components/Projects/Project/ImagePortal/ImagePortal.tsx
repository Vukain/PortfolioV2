import { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './ImagePortal.module.sass';

import { AppContext } from '../../../../store/AppContext';

import { ReactComponent as GithubIcon } from '../../../../images/icons/github-project.svg';
import { ReactComponent as LinkIcon } from '../../../../images/icons/link.svg';

type MyProps = {
    images: {
        logo: string,
        desktop?: Array<{ small: string, medium: string, big: string, full: string }>,
        mobile?: string[],
        code?: Array<{ small: string, medium: string, big: string, full: string }>,
    },
    links: {
        github: string,
        live: string
    },
    isActive: boolean;
};

export const ImagePortal: React.FC<MyProps> = ({ images: { logo, desktop, mobile, code }, links: { github, live }, isActive }) => {

    const { currentSection, motionNotReduced } = useContext(AppContext);

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    // Ref used to work within several useEffects
    const imagesTL: React.MutableRefObject<null | gsap.core.Timeline> = useRef(null);

    useEffect(() => {

        const isDesktop = window.matchMedia('(orientation: landscape) and (min-width: 600px)').matches;


        // Get all elements
        const elementGetter = gsap.utils.selector(portalRef.current);
        const logoWrapper: HTMLElement[] = elementGetter('[class*="wrapper_logos"]');
        const logoImage: HTMLElement[] = elementGetter('[class*="logo_"]');

        // Setup timeline and initial parameters
        imagesTL.current = gsap.timeline({ defaults: { transformOrigin: 'center', ease: 'none' }, repeat: -1 });

        gsap.set(logoWrapper, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', scale: 1 })
        const logoSlideDuration = 3.5;
        const logoSlideInDelay = mobile ? -3.5 : -2;
        // Fix for weird GSAP delay desync when negative delay is longer than animation duration
        const logoSlideDelayFix = logoSlideInDelay < -logoSlideDuration ? logoSlideInDelay : -logoSlideDuration;

        // Logo slide up animation
        if ([code, desktop, mobile].some(el => el)) {
            imagesTL.current
                .to(logoWrapper, { delay: 5, duration: logoSlideDuration, ease: 'Expo.easeInOut', translateY: isDesktop ? '-85vh' : '-40vh', scale: .85 })
                .to(logoImage, { delay: -logoSlideDuration, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'center bottom', scale: 1.25, })
                .to(logoWrapper, { translateY: isDesktop ? '85vh' : '40vh', duration: 0 })
        };

        // Animation for code screenshots
        if (code) {
            const codeScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_code"]');
            const freezeTime = 1.5;
            const staggerTime = 1.2 + freezeTime;
            const duration = 1;

            gsap.set(codeScreenshots, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', translateY: isDesktop ? '85vh' : '40vh', scale: .9 })
            imagesTL.current
                .to(codeScreenshots, { ease: 'Sine.easeOut', duration: duration, delay: -2.1, stagger: staggerTime, translateY: '0vh', scale: 1 })
                .to(codeScreenshots, { ease: 'Sine.easeIn', duration: duration, delay: -(codeScreenshots.length - 1) * staggerTime + freezeTime, stagger: staggerTime, translateY: isDesktop ? '-85vh' : '-40vh', scale: .9 })

            // gsap.set(codeScreenshots, { top: '170%', left: '50%', yPercent: '-50', xPercent: '-50', scale: .9 })
            // imagesTL.current
            //     .to(codeScreenshots, { ease: 'Sine.easeOut', duration: duration, delay: -2.1, stagger: staggerTime, top: '50%', scale: 1 })
            //     .to(codeScreenshots, { ease: 'Sine.easeIn', duration: duration, delay: -(codeScreenshots.length - 1) * staggerTime + freezeTime, stagger: staggerTime, top: '-70%', scale: .9 })
        };

        // Animation for desktop screenshots
        if (desktop) {
            const desktopScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_desktop"]');
            const staggerTime = 1.5;
            const duration = 2;

            gsap.set(desktopScreenshots, { top: '50%', yPercent: '-50', xPercent: '-50', translateY: isDesktop ? '65vh' : '30vh', scale: .9 })
            imagesTL.current
                .to(desktopScreenshots, { ease: 'Expo.easeIn', delay: -3.9, duration: duration * 1.1, stagger: staggerTime, translateY: isDesktop ? '23vh' : '11vh', scale: .95, })
                .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: '0vh', scale: 1, })
                .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-23vh' : '-11vh', scale: .95, })
                .to(desktopScreenshots, { ease: 'Expo.easeOut', duration: duration * 1.1, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-65vh' : '-30vh', scale: .9, })

            // gsap.set(desktopScreenshots, { top: '150%', yPercent: '-50', xPercent: '-50', scale: .9 })
            // imagesTL.current
            //     .to(desktopScreenshots, { ease: 'Expo.easeIn', delay: -3.9, duration: duration * 1.1, stagger: staggerTime, top: '80%', scale: .95, })
            //     .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, top: '50%', scale: 1, })
            //     .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, top: '20%', scale: .95, })
            //     .to(desktopScreenshots, { ease: 'Expo.easeOut', duration: duration * 1.1, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-50%', scale: .9, })
        };

        // Animation for mobile screenshots
        if (mobile) {
            const mobileScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_mobile"]');
            const duration = 2;
            const staggerTime = 1.6;

            gsap.set(mobileScreenshots, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', scale: .8, translateX: isDesktop ? '12vw' : '24vw', translateY: isDesktop ? '65vh' : '30vh', })
            imagesTL.current
                .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -4.0, duration: duration, stagger: staggerTime, translateY: '0vh', scale: .95 })
                .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateX: '0vw', scale: 1 })
                .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateX: isDesktop ? '-12vw' : '-24vw', scale: .95 })
                .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: duration, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-65vh' : '-30vh', scale: .8 })

            // gsap.set(mobileScreenshots, { top: '150%', left: '80%', yPercent: '-50', xPercent: '-50', scale: .8 })
            // imagesTL.current
            //     .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -4.0, duration: duration, stagger: staggerTime, top: '50%', scale: .95 })
            //     .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, left: '50%', scale: 1 })
            //     .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, left: '20%', scale: .95 })
            //     .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: duration, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, top: '-50%', scale: .8 })
        };

        // Logo slide to center animation
        if ([code, desktop, mobile].some(el => el)) {
            imagesTL.current
                .to(logoWrapper, { delay: logoSlideInDelay, duration: logoSlideDuration, ease: 'Expo.easeInOut', translateY: '0vh', scale: 1 })
                .to(logoImage, { delay: logoSlideDelayFix, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'right bottom', scale: 1 })
        };
    }, []);


    useEffect(() => {
        if (motionNotReduced && currentSection === 'projects') {
            // Reset animation progress when changing project and disable when it becomes inactive
            if (isActive) {
                imagesTL.current!.progress(0, false)
                imagesTL.current!.play(0)
            } else {
                setTimeout(() => {
                    imagesTL.current!.pause();
                }, 2500);

            };
        } else {
            imagesTL.current!.progress(0, false)
            imagesTL.current!.pause();
        };
        // imagesTL.current!.play(0)
    },
        [isActive, currentSection, motionNotReduced]);

    // Create project screenshots
    const codeScreenshots = code ? code.map((image, index) => (
        <img className={styles.screenshot_code} key={`code_${index}`}
            srcSet={`${image.full} 600w, ${image.full} 800w, ${image.full} 1000w, ${image.full} 1100w`}
            sizes={'(orientation: portrait) 70vw, 40vw'}
            src={image.full} alt={`project code screenshot ${index + 1}`}
        />
    )) : null;

    const desktopScreenshots = desktop ? desktop.map((image, index) => (
        <img className={styles.screenshot_desktop} key={`desktop_${index}`}
            srcSet={`${image.small} 800w, ${image.medium} 1200w, ${image.big} 1600w, ${image.full} 1900w`}
            sizes={'(orientation: portrait) 60vw, 35vw'}
            src={image.full} alt={`project desktop screenshot ${index + 1}`}
        />
    )) : null;

    const mobileScreenshots = mobile ? mobile.map((image, index) => (
        <img className={styles.screenshot_mobile} key={`mobile_${index}`} src={image} alt={`project mobile screenshot ${index + 1}`} />
    )) : null;

    return (
        <div className={styles.image_portal} ref={portalRef} onClick={() => { console.log(currentSection) }}>

            <div className={styles.wrapper}>
                <div className={styles.wrapper_logos}>
                    <img className={styles.logo} src={logo} alt='project logo' loading="lazy" />
                </div>
                <div className={styles.wrapper_screenshots}>
                    {desktopScreenshots}
                </div>
                <div className={styles.wrapper_screenshots}>
                    {mobileScreenshots}
                </div>
                <div className={styles.wrapper_screenshots}>
                    {codeScreenshots}
                </div>
            </div>

            <a href={live} className={styles.hyperlink} target="_blank" rel="noopener noreferrer" aria-label='project live version' tabIndex={isActive ? 0 : -1}>
                <div className={clsx(styles.link, styles['link--left'])} data-text='live'>
                    <LinkIcon className={styles.icon} />
                </div>
            </a>

            <a href={github} className={styles.hyperlink} target="_blank" rel="noopener noreferrer" aria-label='project github link' tabIndex={isActive ? 0 : -1}>
                <div className={clsx(styles.link, styles['link--right'])} data-text='github'>
                    <GithubIcon className={styles.icon} />
                </div>
            </a>

        </div>
    );
};