import { useEffect, useContext } from "react";
import { gsap } from 'gsap';

import { AppContext } from "../store/AppContext";
import { checkMotionReduce } from "../utils/checkMotionReduce";

type refProp = React.MutableRefObject<null | HTMLElement | SVGSVGElement>;

export const useGsapContactTriggers = (objectRef: refProp) => {

    const { setCurrentSection } = useContext(AppContext);

    useEffect(() => {
        const motionNotReduced = !checkMotionReduce();

        const elementGetter = gsap.utils.selector(objectRef.current);
        const wrappers: HTMLElement[] = elementGetter('[class*="t_wrapper_"]');
        wrappers.push(...elementGetter('[class*="n_wrapper_"]'));

        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        if (motionNotReduced) {
            gsap.set(wrappers, { translateY: `${isDesktop ? 40 : 20}vh`, scale: .7 });
            gsap.set(wrappers.slice(1), { translateY: `4vh`, opacity: 0 })

            // Initialize triggers for reveal
            wrappers.forEach((element, index) => {
                gsap.to(element, {
                    translateY: 0,
                    opacity: 1,
                    scale: 1,
                    duration: index === 0 ? .8 : .4,
                    delay: .2 * index,
                    ease: 'Power1.easeOut',
                    scrollTrigger: {
                        trigger: '#contact',
                        start: `${isDesktop ? 40 : 60}% bottom`
                    }
                });
            });
        };

        // Set as active section
        gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                onEnter: () => {
                    setCurrentSection('contact');
                    window.history.pushState({}, '', '#contact');
                },
                onEnterBack: () => {
                    setCurrentSection('contact');
                    window.history.pushState({}, '', '#contact');
                },
                start: 'top center',
                end: 'bottom center'
            }
        });
    }, [setCurrentSection]);
};