import { useEffect, useRef, useContext, useState } from 'react';
import { clsx } from 'clsx';
import gsap from 'gsap';

import styles from './Skills.module.sass';

import SkillCard from './SkillCard/SkillCard';
import { AppContext } from '../../store/AppContext';

import { ReactComponent as FrontendIcon } from '../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../media/icons/tools.svg';
import { ReactComponent as CrystalMoving } from '../../media/crystal_scroll.svg';
import { ReactComponent as MotionPathDesktop } from '../../media/motion_path_desktop.svg';
import { ReactComponent as MotionPathMobile } from '../../media/motion_path_mobile.svg';

const Skills: React.FC = () => {

    const { setCurrentSection } = useContext(AppContext);

    const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);
    const frontendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const backendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const graphicsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const [activeCard, setActiveCard] = useState('');

    type CardData = Record<'frontend' | 'backend' | 'graphics', { category: string, skills: string[] }>;

    const cardData: CardData = {
        frontend: { category: 'frontend', skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
        backend: { category: 'backend', skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
        graphics: { category: 'graphics', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] }
    };

    const isDesktop = window.matchMedia('(orientation: landscape)').matches;

    useEffect(() => {
        const [crystal, frontendCard, backendCard, graphicsCard] = [crystalRef.current, frontendRef.current, backendRef.current, graphicsRef.current];

        if (crystal) {
            const elementGetter = gsap.utils.selector(crystal);

            const cardTriggerPosition = window.innerHeight / 2;
            const motionTrigger = `#motion_path_${isDesktop ? 'desktop' : 'mobile'}_svg__motion-path`;
            const motionStart = `top ${isDesktop ? cardTriggerPosition * 1.7 : cardTriggerPosition * 1.3}px`;
            //@ts-ignore
            const motionEnd = `+=${document.getElementById('skills').offsetHeight}px`;



            const [leftBottomShard, leftShard, rightBottomShard, topShard, rightShard, bottomShard] = ['left-bottom', 'left', 'right-bottom', 'top', 'right', 'bottom'].map((element) => (elementGetter(`[id="crystal_scroll_svg__${element}"]`)));

            const floatingCrystalTL = gsap.timeline({
                scrollTrigger: {
                    trigger: motionTrigger,
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    start: motionStart,
                    end: motionEnd,
                    // markers: true,
                }
            });

            floatingCrystalTL.to(crystal, {
                ease: "none",
                immediateRender: true,
                motionPath: {
                    path: motionTrigger,
                    align: motionTrigger,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: 90,
                }
            });

            // const floatingShardAuto = gsap.timeline({ defaults: { ease: 'none', transformOrigin: 'center' }, repeat: -1, yoyo: true });

            // floatingShardAuto.to(lowerShard, { duration: 1, yPercent: '+=35', rotateZ: '2deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=40', rotateZ: '-4deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=30', rotateZ: '3deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=25', rotateZ: '-3deg' })

            const [leftBottomShardTL, leftShardTL, topShardTL, rightShardTL, rightBottomShardTL, bottomShardTL] = Array.from(Array(6), (element, index) => (gsap.timeline({
                defaults: { ease: 'none', transformOrigin: 'center' },
                repeat: 4 + (isDesktop ? 1 : 2) * index,
                yoyo: true,
                scrollTrigger: {
                    trigger: motionTrigger,
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    start: motionStart,
                    end: motionEnd
                }
            })));

            leftBottomShardTL.to(leftBottomShard, {
                xPercent: -40,
                yPercent: 8,
                duration: .2,
            });

            leftShardTL.to(leftShard, {
                xPercent: -24,
                yPercent: -8,
                duration: .2
            });

            topShardTL.to(topShard, {
                xPercent: 0,
                yPercent: -30,
                duration: .2
            });

            rightShardTL.to(rightShard, {
                xPercent: 34,
                yPercent: -20,
                duration: .2
            });

            rightBottomShardTL.to(rightBottomShard, {
                xPercent: 17,
                yPercent: 3,
                duration: .2
            });

            bottomShardTL.to(bottomShard, {
                rotateZ: -6,
                xPercent: 5,
                yPercent: 24,
                duration: .2
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#skills',
                    onEnter: () => { setCurrentSection('skills') },
                    onEnterBack: () => { setCurrentSection('skills') },
                    start: 'top center',
                    end: 'bottom center'
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#skills',
                    onEnter: () => { setActiveCard('frontend') },
                    onEnterBack: () => { setActiveCard('frontend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `8% ${cardTriggerPosition}px`,
                    end: `29% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#skills',
                    onEnter: () => { setActiveCard('backend') },
                    onEnterBack: () => { setActiveCard('backend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `38% ${cardTriggerPosition}px`,
                    end: `58% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#skills',
                    onEnter: () => { setActiveCard('graphics') },
                    onEnterBack: () => { setActiveCard('graphics') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `68% ${cardTriggerPosition}px`,
                    end: `88% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            if (!isDesktop) {
                gsap.set([frontendCard, graphicsCard, backendCard], { xPercent: -100, opacity: 0 });
                gsap.set(backendCard, { xPercent: 100 });

                const cards = [frontendCard, backendCard, graphicsCard];
                cards.forEach((element) => {
                    gsap.to(element, {
                        xPercent: 0,
                        opacity: 1,
                        duration: .6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: "20% bottom"
                        }
                    });
                });
            } else {
                gsap.set([frontendCard, graphicsCard, backendCard], { yPercent: 60, opacity: 0, scale: .6 })
                const cards = [frontendCard, backendCard, graphicsCard];

                cards.forEach((element, index) => {
                    gsap.to(element, {
                        yPercent: 0,
                        opacity: 1,
                        scale: 1,
                        duration: .9,
                        delay: index * .3,
                        ease: 'back.out(1.0)',
                        scrollTrigger: {
                            trigger: '#skills',
                            start: "30% bottom"
                        }
                    });
                });
            };
        };
    }, [setCurrentSection])

    const svgPath = isDesktop ? <MotionPathDesktop className={styles.path_svg} preserveAspectRatio='none' /> : <MotionPathMobile className={styles.path_svg} preserveAspectRatio='none' />;

    return (
        <section className={styles.skills} id='skills'>
            <CrystalMoving className={styles.sliding_crystal} ref={crystalRef} />

            <SkillCard data={cardData['frontend']} activeCard={activeCard} ref={frontendRef}>
                <FrontendIcon className={clsx(styles.icon, styles.icon_frontend)} title="frontend icon" />
            </SkillCard>
            <SkillCard data={cardData['backend']} activeCard={activeCard} ref={backendRef}>
                <BackendIcon className={clsx(styles.icon, styles.icon_backend)} title="backend icon" />
            </SkillCard>
            <SkillCard data={cardData['graphics']} activeCard={activeCard} ref={graphicsRef}>
                <GraphicIcon className={clsx(styles.icon, styles.icon_graphics)} title="graphics icon" />
            </SkillCard>

            {svgPath}

        </section>
    );
}

export default Skills;