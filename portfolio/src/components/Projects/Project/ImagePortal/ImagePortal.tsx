import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './ImagePortal.module.sass';

import { ReactComponent as GithubIcon } from '../../../../media/icons/github-project.svg';
import { ReactComponent as LinkIcon } from '../../../../media/icons/link.svg';

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

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const imagesTL: React.MutableRefObject<null | gsap.core.Timeline> = useRef(null);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(portalRef.current);
        const logoWrapper: HTMLElement[] = elementGetter('[class*="wrapper_logo"]');
        const logoImage: HTMLElement[] = elementGetter('[class*="image_logo"]');

        // Used with ref for multiple useEffects
        imagesTL.current = gsap.timeline({ defaults: { transformOrigin: 'center' }, repeat: -1 });

        const logoSlideDuration = 3.5;

        imagesTL.current
            .fromTo(logoWrapper, { top: '50%', scale: 1.1 }, { delay: 5, ease: 'Expo.easeInOut', duration: logoSlideDuration, top: '-50%', scale: 1 })
            .to(logoImage, { scale: 1.2, delay: -logoSlideDuration, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'center bottom' })
            .to(logoWrapper, { top: '150%', scale: 1, duration: 0 })

        if (code !== undefined) {
            const codeScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_code"]');
            const staggerTime = 3.1;
            const duration = 3.5;
            imagesTL.current
                .to(codeScreenshots, { ease: 'none', duration: duration, delay: -2.2, stagger: staggerTime, top: '50%', scale: 1.1 })
                .to(codeScreenshots, { ease: 'none', duration: duration, delay: (codeScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-70%', scale: 1 })
        };

        if (desktop !== undefined) {
            const desktopScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_desktop"]');
            const staggerTime = 2.2;
            const duration = 3.4;
            imagesTL.current
                .to(desktopScreenshots, { ease: 'none', duration: duration, delay: -2.2, stagger: staggerTime, top: '50%', scale: 1.2 })
                .to(desktopScreenshots, { ease: 'none', duration: duration, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-40%', scale: 1 })
        };

        if (mobile !== undefined) {
            const mobileScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_mobile"]');
            const staggerTime = 3;
            const duration = 3;
            imagesTL.current
                .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -2.8, duration: duration, stagger: staggerTime, top: '50%', scale: 1 })
                .to(mobileScreenshots, { ease: 'none', duration: 2 * duration, delay: (mobileScreenshots.length - 1) * -staggerTime, stagger: staggerTime, left: '20%', })
                .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: duration, delay: (mobileScreenshots.length - 1) * -3, stagger: staggerTime, top: '-140%', scale: 1 })
        };

        const logoSlideInDelay = mobile === undefined ? -1.8 : -4;
        // Fix for weird GSAP delay desync when mobile screenshots are available
        const logoSlideDelayFix = mobile === undefined ? -logoSlideDuration : -4;

        imagesTL.current
            .to(logoWrapper, { delay: logoSlideInDelay, duration: logoSlideDuration, ease: 'Expo.easeInOut', top: '50%', scale: 1.1 })
            .to(logoImage, { delay: logoSlideDelayFix, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'right bottom', scale: 1 })
    }, []);

    useEffect(() => {
        if (isActive) {
            imagesTL.current!.progress(0, false)
        };
    },
        [isActive])

    const desktopScreenshots = desktop ? desktop.map((image, index) => (
        <img className={styles.screenshot_desktop} key={`desktop_${index}`}
            srcSet={`${image.small} 800w, ${image.medium} 1200w, ${image.big} 1600w, ${image.full} 1900w`}
            sizes={'(orientation: portrait) 60vw, 35vw'}
            src={image.full} alt={`project desktop screenshot ${index + 1}`}
        />
    )) : null;
    const codeScreenshots = code ? code.map((image, index) => (
        <img className={styles.screenshot_code} key={`code_${index}`}
            srcSet={`${image.full} 600w, ${image.full} 800w, ${image.full} 1000w, ${image.full} 1100w`}
            sizes={'(orientation: portrait) 70vw, 40vw'}
            src={image.full} alt={`project code screenshot ${index + 1}`}
        />
    )) : null;
    const mobileScreenshots = mobile ? mobile.map((image, index) => (
        <img className={styles.screenshot_mobile} key={`mobile_${index}`} src={image} alt={`project mobile screenshot ${index + 1}`} />
    )) : null;

    return (
        <div className={clsx(styles.image_portal, !isActive && styles['image_portal--hidden'])} ref={portalRef}>

            <div className={styles.wrapper}>
                <div className={styles.wrapper_logo}>
                    <img className={styles.image_logo} src={logo} alt='project logo' loading="lazy" />
                </div>
                <div className={styles.wrapper_screenshots}>
                    {codeScreenshots}
                </div>
                <div className={styles.wrapper_screenshots}>
                    {desktopScreenshots}
                </div>
                <div className={styles.wrapper_screenshots}>
                    {mobileScreenshots}
                </div>
            </div>

            <a href={live} target="_blank" rel="noopener noreferrer" aria-label='project live version'>
                <div className={clsx(styles.link, styles['link--left'])} data-text='live'>
                    <LinkIcon className={styles.icon} />
                </div>
            </a>

            <a href={github} target="_blank" rel="noopener noreferrer" aria-label='project github link'>
                <div className={clsx(styles.link, styles['link--right'])} data-text='github'>
                    <GithubIcon className={styles.icon} />
                </div>
            </a>

        </div>
    );
};