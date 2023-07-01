import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

import { checkScreenOrientation } from '../utils/checkScreenOrientation';
import { checkProjectSize } from '../utils/checkProjectSize';
import { motionReducerSwitch } from '../utils/motionReducerSwitch';

type InfoRef = React.MutableRefObject<null | HTMLElement>;

export const useGsapProjectTriggers = (
  infoRef: InfoRef,
  index: number,
  numberOfProjects: number,
  currentProject: number,
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>,
) => {
  const infoTL: React.MutableRefObject<null | gsap.core.Timeline> = useRef(null);
  const elements = useRef<{ slidingText: null[] | HTMLElement[]; slidingCapsules: null[] | HTMLElement[] }>({
    slidingText: [],
    slidingCapsules: [],
  });

  const getTextAndCapsules = useCallback(() => {
    const elementGetter = gsap.utils.selector(infoRef.current);
    const slidingText: HTMLElement[] = elementGetter('[class*="slide_"]');
    const slidingCapsules: HTMLElement[] = elementGetter('[class*="capsule_"]');

    return { slidingText, slidingCapsules };
  }, [infoRef]);

  // Setup timeline and get objects for animations
  useEffect(() => {
    const isDesktop = checkScreenOrientation();
    const { sectionHeight, projectSize } = checkProjectSize();
    const { slidingText, slidingCapsules } = getTextAndCapsules();

    elements.current = { slidingText: slidingText, slidingCapsules: slidingCapsules };

    gsap.set([slidingCapsules], { yPercent: motionReducerSwitch('105'), opacity: 0 });

    if (isDesktop) {
      gsap.set([slidingText], { xPercent: motionReducerSwitch('105'), opacity: 0 });
    } else {
      gsap.set([slidingText], { yPercent: motionReducerSwitch('105'), opacity: 0 });
    }

    infoTL.current = gsap.timeline({
      defaults: { transformOrigin: 'center', ease: 'sine.inOut' },
    });

    // Create timeline detecting which project is active
    gsap.timeline({
      scrollTrigger: {
        trigger: '#app',
        onEnter: () => {
          setCurrentProject(index);
        },
        onEnterBack: () => {
          setCurrentProject(index);
        },
        onLeave: () => {
          setCurrentProject(index === numberOfProjects - 1 ? numberOfProjects - 1 : index + 1);
          if (index !== numberOfProjects - 1) {
            if (isDesktop) {
              infoTL
                .current!.to(slidingText, {
                  xPercent: motionReducerSwitch('-105'),
                  duration: 0.6,
                  stagger: motionReducerSwitch(0.15),
                  opacity: 0,
                })
                .to([...slidingCapsules].reverse(), {
                  delay: motionReducerSwitch(slidingText.length * -0.15 - 0.6, -0.6),
                  yPercent: motionReducerSwitch('105'),
                  duration: motionReducerSwitch(0.3, 0.6),
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                });
            } else {
              infoTL
                .current!.to([...slidingCapsules].reverse(), {
                  delay: 0,
                  yPercent: motionReducerSwitch('-105'),
                  duration: motionReducerSwitch(0.2, 0.5),
                  stagger: motionReducerSwitch(0.05),
                  opacity: 0,
                })
                .to([...slidingText].reverse(), {
                  delay: slidingCapsules.length * -0.05 + 0.2,
                  yPercent: motionReducerSwitch('-105'),
                  duration: 0.5,
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                });
            }
          }
        },
        onLeaveBack: () => {
          setCurrentProject(index === 0 ? 0 : index - 1);
          if (index !== 0) {
            if (isDesktop) {
              infoTL
                .current!.to(slidingText, {
                  xPercent: motionReducerSwitch('105'),
                  duration: 0.6,
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                })
                .to([...slidingCapsules].reverse(), {
                  delay: motionReducerSwitch(slidingText.length * -0.1 - 0.6, -0.6),
                  yPercent: motionReducerSwitch('105'),
                  duration: motionReducerSwitch(0.3, 0.6),
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                });
            } else {
              infoTL
                .current!.to([...slidingCapsules].reverse(), {
                  delay: 0,
                  yPercent: motionReducerSwitch('105'),
                  duration: 0.3,
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                })
                .to([...slidingText].reverse(), {
                  yPercent: motionReducerSwitch('105'),
                  duration: 0.5,
                  stagger: motionReducerSwitch(0.1),
                  opacity: 0,
                });
            }
          }
        },
        start: `${2 * sectionHeight + index * projectSize - 1}px ${sectionHeight}px`,
        end: `${2 * sectionHeight + index * projectSize + 1}px ${sectionHeight}px`,
        invalidateOnRefresh: true,
      },
    });
  }, [index, numberOfProjects, setCurrentProject, getTextAndCapsules]);

  // Delay info text animation when scrolling
  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    const isDesktop = checkScreenOrientation();
    const { slidingText, slidingCapsules } = elements.current;

    if (currentProject === index && slidingText.length > 0) {
      const duration = isDesktop ? 0.7 : 0.8;
      animationTimeout = setTimeout(() => {
        infoTL
          .current!.to(slidingText, {
            xPercent: '0',
            yPercent: '0',
            duration: duration,
            stagger: motionReducerSwitch(isDesktop ? 0.09 : 0.2),
            ease: 'sine.inOut',
            opacity: 1,
          })
          .to(slidingCapsules, {
            delay: motionReducerSwitch(-(duration - 0.6), -duration),
            yPercent: '0',
            duration: motionReducerSwitch(0.3, duration),
            stagger: motionReducerSwitch(0.1),
            opacity: 1,
            ease: 'sine.inOut',
          });
      }, 1300);
    }

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [currentProject, index]);
};
