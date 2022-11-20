import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './ImagePortal.module.sass';

type MyProps = {
    images: {
        logo: string,
        desktop?: string[],
        mobile?: string[],
        code?: string[]
    };
};

export const ImagePortal: React.FC<MyProps> = ({ images: { logo, desktop, mobile, code } }) => {

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(portalRef.current);

        const logoWrapper: HTMLElement[] = elementGetter('[class*="wrapper_logo"]');
        const logoImage: HTMLElement[] = elementGetter('[class*="image_logo"]');

        const imagesTL = gsap.timeline({ defaults: { transformOrigin: 'center' }, repeat: -1 });

        imagesTL
            .fromTo(logoWrapper, { top: '50%', scale: 1.1 }, { delay: 3, ease: 'Expo.easeInOut', duration: 3.5, top: '-50%', scale: 1 })
            .to(logoImage, { scale: 1.2, delay: -3.5, duration: 3.5, ease: 'Expo.easeInOut', transformOrigin: 'center bottom' })
            .to(logoWrapper, { top: '150%', scale: 1, duration: 0 })

        if (desktop !== undefined) {
            const desktopScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_desktop"]');
            const staggerTime = 2.2;
            imagesTL
                // .to(desktopScreenshots, { ease: 'Expo.easeIn', delay: -3.5, duration: 3, stagger: 3, top: '50%', scale: 1 })
                .to(desktopScreenshots, { ease: 'none', duration: 3.2, delay: -2, stagger: staggerTime, top: '50%', scale: 1.2 })
                .to(desktopScreenshots, { ease: 'none', duration: 3.2, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-30%', scale: 1 })
            // .to(desktopScreenshots, { ease: 'Expo.easeOut', duration: 3, delay: (desktopScreenshots.length - 1) * -3, stagger: 3, top: '-150%', scale: 1 })
        };

        if (mobile !== undefined) {
            const mobileScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_mobile"]');
            const staggerTime = 3;
            imagesTL
                .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -3, duration: 3, stagger: staggerTime, top: '50%', scale: 1 })
                .to(mobileScreenshots, { ease: 'none', duration: 6, delay: (mobileScreenshots.length - 1) * -staggerTime, stagger: staggerTime, left: '20%', })
                .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: 3, delay: (mobileScreenshots.length - 1) * -3, stagger: staggerTime, top: '-130%', scale: 1 })
        };

        if (code !== undefined) {
            const codeScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_code"]');
            const staggerTime = 2.2;
            imagesTL
                .to(codeScreenshots, { ease: 'none', duration: 3.2, delay: -2, stagger: staggerTime, top: '50%', scale: 1.2 })
                .to(codeScreenshots, { ease: 'none', duration: 3.2, delay: (codeScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, top: '-30%', scale: 1 })
        };

        const delay = code !== undefined ? -1.8 : -3;
        imagesTL
            .to(logoWrapper, { delay: delay, duration: 3, ease: 'Expo.easeInOut', top: '50%', scale: 1.1 })
            .to(logoImage, { delay: -3, duration: 3, ease: 'Expo.easeInOut', transformOrigin: 'right bottom', scale: 1 })
    }, []);

    const desktopScreenshots = desktop ? desktop.map((image, index) => (<img className={styles.screenshot_desktop} key={`desktop_${index}`} src={image} alt={`project desktop screenshot ${index}`} />)) : null;
    const mobileScreenshots = mobile ? mobile.map((image, index) => (<img className={styles.screenshot_mobile} key={`mobile_${index}`} src={image} alt={`project mobile screenshot ${index}`} />)) : null;
    const codeScreenshots = code ? code.map((image, index) => (<img className={styles.screenshot_code} key={`code_${index}`} src={image} alt={`project code screenshot ${index}`} />)) : null;

    return (
        <div className={styles.image_portal} ref={portalRef}>
            <div className={styles.wrapper_logo}>
                <img className={styles.image_logo} src={logo} alt='project logo' />
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
    );
};