import { useEffect, useContext } from "react";
import { gsap } from 'gsap';

import { AppContext } from "../store/AppContext";
import { checkMotionReduce } from "../utils/checkMotionReduce";
import { checkScreenOrientation } from "../utils/checkScreenOrientation";
import { checkProjectSize } from "../utils/checkProjectSize";

type SectionRef = React.MutableRefObject<null | HTMLElement>;

export const useGsapProjectsTriggers = (sectionRef: SectionRef) => {

    const { setCurrentSection } = useContext(AppContext);

    useEffect(() => {
        const motionNotReduced = !checkMotionReduce();

        const projectsSection = sectionRef.current;
        const elementGetter = gsap.utils.selector(projectsSection);
        const projects: HTMLElement[] = elementGetter('[class*="project_"]');

        const { sectionHeight, projectSize } = checkProjectSize()

        // Create timeline for sliding projects, must be separate from fading
        const slidingProjectsTL = gsap.timeline({
            scrollTrigger: {
                trigger: projectsSection,
                toggleActions: 'restart pause reverse pause',
                scrub: .5,
                pin: true,
                pinSpacing: true,
                start: '10px 10px',
                end: sectionHeight + (projects.length - 1) * projectSize,
                snap: 1 / (projects.length - 1),
                invalidateOnRefresh: true,
                onEnter: () => {
                    setTimeout(() => { setCurrentSection('projects'); }, 50)

                    window.history.pushState({}, '', '#projects');
                },
                onEnterBack: () => {
                    setTimeout(() => { setCurrentSection('projects'); }, 50)
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
                end: sectionHeight + (projects.length - 1) * projectSize,
                snap: 1 / (projects.length - 1)
            }
        });

        // Set correct animations for screen orientation
        if (checkScreenOrientation()) {
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

    }, [sectionRef, setCurrentSection])
};