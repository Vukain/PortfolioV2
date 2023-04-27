import { useEffect, useRef, useContext } from "react";
import { gsap } from 'gsap';

import { AppContext } from "../store/AppContext";
import { checkScreenOrientation } from "../utils/checkScreenOrientation";
import { checkMotionReduce } from "../utils/checkMotionReduce";

type PortalRef = React.MutableRefObject<null | HTMLElement>;
type AvailableImages = { desktopImages: boolean, mobileImages: boolean, codeImages: boolean }

export const useGsapImagePortalTriggers = (portalRef: PortalRef, isActive: boolean, { codeImages, desktopImages, mobileImages }: AvailableImages) => {

    const { currentSection } = useContext(AppContext);

    // Ref used to use timeline within several useEffects
    const imagesTL: React.MutableRefObject<null | gsap.core.Timeline> = useRef(null);

    // Setup timeline and get objects for animations
    useEffect(() => {
        const isDesktop = checkScreenOrientation();

        const elementGetter = gsap.utils.selector(portalRef.current);
        const logoWrapper: HTMLElement[] = elementGetter('[class*="wrapper_logos"]');
        const logoImage: HTMLElement[] = elementGetter('[class*="logo_"]');

        imagesTL.current = gsap.timeline({ defaults: { transformOrigin: 'center', ease: 'none' }, repeat: -1 });

        gsap.set(logoWrapper, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', scale: 1 })
        const logoSlideDuration = 3.5;
        const logoSlideInDelay = mobileImages ? -3.5 : -2;
        // Fix for weird GSAP delay desync when negative delay is longer than animation duration
        const logoSlideDelayFix = logoSlideInDelay < -logoSlideDuration ? logoSlideInDelay : -logoSlideDuration;

        // Logo slide up animation
        if ([codeImages, desktopImages, mobileImages].some(el => el)) {
            imagesTL.current
                .to(logoWrapper, { delay: 5, duration: logoSlideDuration, ease: 'Expo.easeInOut', translateY: isDesktop ? '-85vh' : '-40vh', scale: .85 })
                .to(logoImage, { delay: -logoSlideDuration, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'center bottom', scale: 1.25, })
                .to(logoWrapper, { translateY: isDesktop ? '85vh' : '40vh', duration: 0 })
        };

        // Animation for code screenshots
        if (codeImages) {
            const codeScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_code"]');
            const freezeTime = 1.5;
            const staggerTime = 1.3 + freezeTime;
            const duration = 1;

            gsap.set(codeScreenshots, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', translateY: isDesktop ? '85vh' : '40vh', scale: .9 })
            imagesTL.current
                .to(codeScreenshots, { ease: 'Sine.easeOut', duration: duration, delay: -2.1, stagger: staggerTime, translateY: '0vh', scale: 1 })
                .to(codeScreenshots, { ease: 'Sine.easeIn', duration: duration, delay: -(codeScreenshots.length - 1) * staggerTime + freezeTime, stagger: staggerTime, translateY: isDesktop ? '-85vh' : '-40vh', scale: .9 })
        };

        // Animation for desktop screenshots
        if (desktopImages) {
            const desktopScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_desktop"]');
            const staggerTime = 1.5;
            const duration = 2;

            gsap.set(desktopScreenshots, { top: '50%', yPercent: '-50', xPercent: '-50', translateY: isDesktop ? '65vh' : '30vh', scale: .9 })
            imagesTL.current
                .to(desktopScreenshots, { ease: 'Expo.easeIn', delay: -3.9, duration: duration * 1.1, stagger: staggerTime, translateY: isDesktop ? '23vh' : '11vh', scale: .95, })
                .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: '0vh', scale: 1, })
                .to(desktopScreenshots, { ease: 'none', duration: duration / 2, delay: -(desktopScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-23vh' : '-11vh', scale: .95, })
                .to(desktopScreenshots, { ease: 'Expo.easeOut', duration: duration * 1.1, delay: (desktopScreenshots.length - 1) * -1 * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-65vh' : '-30vh', scale: .9, })
        };

        // Animation for mobile screenshots
        if (mobileImages) {
            const mobileScreenshots: HTMLElement[] = elementGetter('[class*="screenshot_mobile"]');
            const duration = 2;
            const staggerTime = 1.6;

            gsap.set(mobileScreenshots, { top: '50%', left: '50%', yPercent: '-50', xPercent: '-50', scale: .8, translateX: isDesktop ? '12vw' : '24vw', translateY: isDesktop ? '65vh' : '30vh', })
            imagesTL.current
                .to(mobileScreenshots, { ease: 'Expo.easeIn', delay: -4.0, duration: duration, stagger: staggerTime, translateY: '0vh', scale: .95 })
                .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateX: '0vw', scale: 1 })
                .to(mobileScreenshots, { duration: duration * 0.7, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateX: isDesktop ? '-12vw' : '-24vw', scale: .95 })
                .to(mobileScreenshots, { ease: 'Expo.easeOut', duration: duration, delay: -(mobileScreenshots.length - 1) * staggerTime, stagger: staggerTime, translateY: isDesktop ? '-65vh' : '-30vh', scale: .8 })
        };

        // Logo slide to center animation
        if ([codeImages, desktopImages, mobileImages].some(el => el)) {
            imagesTL.current
                .to(logoWrapper, { delay: logoSlideInDelay, duration: logoSlideDuration, ease: 'Expo.easeInOut', translateY: '0vh', scale: 1 })
                .to(logoImage, { delay: logoSlideDelayFix, duration: logoSlideDuration, ease: 'Expo.easeInOut', transformOrigin: 'right bottom', scale: 1 })
        };
    }, []);

    // Reset animation progress when changing project and disable it when it becomes inactive
    useEffect(() => {
        const motionNotReduced = !checkMotionReduce();

        if (motionNotReduced && currentSection === 'projects') {
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
    },
        [isActive, currentSection]);
};