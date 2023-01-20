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
        code?: string[],
    },
    links: {
        github: string,
        live: string
    };
};

export const ImagePortal: React.FC<MyProps> = ({ images: { logo, desktop, mobile, code }, links: { github, live } }) => {

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(portalRef.current);
        const logoWrapper: HTMLElement[] = elementGetter('[class*="wrapper_logo"]');
        const logoImage: HTMLElement[] = elementGetter('[class*="image_logo"]');

        const imagesTL = gsap.timeline({ defaults: { transformOrigin: 'center' }, repeat: -1 });

        const logoSlideDuration = 3.5;

        imagesTL
            .fromTo(logoWrapper, { top: '50%', scale: 1.1 }, { delay: 5, ease: 'Expo.easeInOut', duration: logoSlideDuration, top: '-50%', scale: 1 })
            .to(logoImage, { scale: 1.2, delay: -logoSlideDuration, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'center bottom' })
            .to(logoWrapper, { top: '150%', scale: 1, duration: 0 })

        if (code !== undefined) {
            const codeScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_code"]');
            const staggerTime = 3.1;
            const duration = 3.5;
            imagesTL
                .to(codeScreenshots, { ease: 'none', duration: duration, delay: -2.2, stagger: staggerTime, top: '50%', scale: 1.1 })
                .to(codeScreenshots, { ease: 'none', duration: duration, delay: (codeScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-70%', scale: 1 })
        };

        if (desktop !== undefined) {
            const desktopScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_desktop"]');
            const staggerTime = 2.2;
            const duration = 3.4;
            imagesTL
                .to(desktopScreenshots, { ease: 'none', duration: duration, delay: -2.2, stagger: staggerTime, top: '50%', scale: 1.2 })
                .to(desktopScreenshots, { ease: 'none', duration: duration, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-40%', scale: 1 })
        };

        if (mobile !== undefined) {
            const mobileScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_mobile"]');
            const staggerTime = 3;
            const duration = 3;
            imagesTL
                .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -2.8, duration: duration, stagger: staggerTime, top: '50%', scale: 1 })
                .to(mobileScreenshots, { ease: 'none', duration: 2 * duration, delay: (mobileScreenshots.length - 1) * -staggerTime, stagger: staggerTime, left: '20%', })
                .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: duration, delay: (mobileScreenshots.length - 1) * -3, stagger: staggerTime, top: '-140%', scale: 1 })
        };

        const logoSlideInDelay = mobile === undefined ? -1.8 : -4;
        // Fix for weird GSAP delay desync when mobile screenshots are available
        const logoSlideDelayFix = mobile === undefined ? -logoSlideDuration : -4;

        imagesTL
            .to(logoWrapper, { delay: logoSlideInDelay, duration: logoSlideDuration, ease: 'Expo.easeInOut', top: '50%', scale: 1.1 })
            .to(logoImage, { delay: logoSlideDelayFix, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'right bottom', scale: 1 })
    }, []);

    const desktopScreenshots = desktop ? desktop.map((image, index) => (
        <img className={styles.screenshot_desktop} key={`desktop_${index}`}
            srcSet={`${image.small} 800w, ${image.medium} 1200w, ${image.big} 1600w`}
            sizes={'(min-width: 4000px) 1600px, (min-width: 2000px) 1200px, 800px'}
            src={image.full} alt={`project desktop screenshot ${index}`} />

        // <img className={styles.screenshot_desktop} key={`desktop_${index}`} src={image.full} alt={`project desktop screenshot ${index}`} />
    )) : null;
    const codeScreenshots = code ? code.map((image, index) => (
        <img className={styles.screenshot_code} key={`code_${index}`} src={image} alt={`project code screenshot ${index}`} />
    )) : null;
    const mobileScreenshots = mobile ? mobile.map((image, index) => (
        <img className={styles.screenshot_mobile} key={`mobile_${index}`} src={image} alt={`project mobile screenshot ${index}`} />
    )) : null;

    return (
        <div className={styles.image_portal} ref={portalRef}>

            <div className={styles.wrapper}>
                <div className={styles.wrapper_logo}>
                    <img className={styles.image_logo} src={logo} alt='project logo' />
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