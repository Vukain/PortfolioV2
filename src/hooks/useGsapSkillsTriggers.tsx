import { useEffect, useContext } from 'react';
import { gsap } from 'gsap';

import { AppContext } from '../store/AppContext';
import { checkMotionReduce } from '../utils/checkMotionReduce';
import { checkScreenOrientation } from '../utils/checkScreenOrientation';

type CardRefs = {
  frontendRef: React.MutableRefObject<null | HTMLElement>;
  backendRef: React.MutableRefObject<null | HTMLElement>;
  graphicsRef: React.MutableRefObject<null | HTMLElement>;
};

export const useGsapSkillsTriggers = (
  { frontendRef, backendRef, graphicsRef }: CardRefs,
  setActiveCard: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { setCurrentSection } = useContext(AppContext);

  useEffect(() => {
    const motionNotReduced = !checkMotionReduce();
    const isDesktop = checkScreenOrientation();
    const cardTriggerPosition = window.innerHeight / 2;

    // Setting active card for mobile animation
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cards',
        onEnter: () => {
          setActiveCard('frontend');
        },
        onEnterBack: () => {
          setActiveCard('frontend');
        },
        onLeave: () => {
          setActiveCard('');
        },
        onLeaveBack: () => {
          setActiveCard('');
        },
        start: `-2% ${cardTriggerPosition}px`,
        end: `21% ${cardTriggerPosition}px`,
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#cards',
        onEnter: () => {
          setActiveCard('backend');
        },
        onEnterBack: () => {
          setActiveCard('backend');
        },
        onLeave: () => {
          setActiveCard('');
        },
        onLeaveBack: () => {
          setActiveCard('');
        },
        start: `33% ${cardTriggerPosition}px`,
        end: `56% ${cardTriggerPosition}px`,
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#cards',
        onEnter: () => {
          setActiveCard('graphics');
        },
        onEnterBack: () => {
          setActiveCard('graphics');
        },
        onLeave: () => {
          setActiveCard('');
        },
        onLeaveBack: () => {
          setActiveCard('');
        },
        start: `67% ${cardTriggerPosition}px`,
        end: `90% ${cardTriggerPosition}px`,
      },
    });

    // Card reveal animations for mobile and desktop variant
    const cards = [frontendRef.current, backendRef.current, graphicsRef.current];

    if (motionNotReduced) {
      if (isDesktop) {
        gsap.set(cards, { yPercent: 40, opacity: 0, scale: 0.7 });

        cards.forEach((element, index) => {
          gsap.to(element, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 0.3,
            ease: 'back.out(1.0)',
            scrollTrigger: {
              trigger: '#skills',
              start: `${20 + index * 20}% bottom`,
            },
          });
        });
      } else {
        gsap.set(cards, { xPercent: -100, opacity: 0, scale: 0.6 });
        gsap.set(backendRef.current, { xPercent: 100 });

        cards.forEach((element) => {
          gsap.to(element, {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: '10% bottom',
            },
          });
        });
      }
    }

    // Set as active section
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cards',
        onEnter: () => {
          setCurrentSection('skills');
          window.history.pushState({}, '', '#skills');
        },
        onEnterBack: () => {
          setCurrentSection('skills');
          window.history.pushState({}, '', '#skills');
        },
        onLeaveBack: () => {
          setCurrentSection('projects');
        },
        start: '2% center',
        end: 'bottom center',
      },
    });
  }, [frontendRef, backendRef, graphicsRef, setCurrentSection]);
};
