import { useEffect, useRef, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';

import styles from './Skills.module.sass';

import { AppContext } from '../../store/AppContext';
import { SkillCard } from './SkillCard/SkillCard';
import { SectionName } from '../SectionName/SectionName';

import { ReactComponent as FrontendIcon } from '../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../media/icons/tools.svg';
import { ReactComponent as CrystalMoving } from '../../media/crystal_scroll.svg';
import { ReactComponent as MotionPathDesktop } from '../../media/motion_path_desktop.svg';
import { ReactComponent as MotionPathMobile } from '../../media/motion_path_mobile.svg';

export const Skills: React.FC = () => {

    const { setCurrentSection } = useContext(AppContext);

    const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);
    const frontendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const backendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const graphicsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const [activeCard, setActiveCard] = useState('');

    // Had to replace record key type ('frontend' | 'backend' | 'graphics' => string) to get cards mapped properly

    type CardData = Record<string, {
        data: { category: string, skills: string[] },
        icon: React.FC<{ className?: string, title?: string }>,
        ref: React.MutableRefObject<null | HTMLDivElement>
    }>;

    const cardData: CardData = {
        frontend: {
            data: { category: 'frontend', skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
            icon: FrontendIcon,
            ref: frontendRef
        },
        backend: {
            data: { category: 'backend', skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
            icon: BackendIcon,
            ref: backendRef
        },
        graphics: {
            data: { category: 'graphics', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] },
            icon: GraphicIcon,
            ref: graphicsRef
        }
    };

    const isDesktop = window.matchMedia('(orientation: landscape)').matches;

    useEffect(() => {
        const [crystal, frontendCard, backendCard, graphicsCard] = [crystalRef.current, frontendRef.current, backendRef.current, graphicsRef.current];

        if (crystal) {
            const elementGetter = gsap.utils.selector(crystal);

            const cardTriggerPosition = window.innerHeight / 2;
            const motionTrigger = `#motion_path_${isDesktop ? 'desktop' : 'mobile'}_svg__motion-path`;
            const motionStart = `top ${isDesktop ? cardTriggerPosition * 1.7 : cardTriggerPosition * 1.4}px`;
            const motionEnd = `+=${document.getElementById('skills')!.offsetHeight}px`;

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
                    alignOrigin: [.5, .5],
                    autoRotate: 90,
                    start: isDesktop ? .05 : .09
                }
            });

            // Unused automatic crystal floating

            // const floatingShardAuto = gsap.timeline({ defaults: { ease: 'none', transformOrigin: 'center' }, repeat: -1, yoyo: true });

            // floatingShardAuto.to(lowerShard, { duration: 1, yPercent: '+=35', rotateZ: '2deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=40', rotateZ: '-4deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=30', rotateZ: '3deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=25', rotateZ: '-3deg' })

            const [leftBottomShardTL, leftShardTL, topShardTL, rightShardTL, rightBottomShardTL, bottomShardTL] = Array.from(Array(6), (_, index) => (gsap.timeline({
                defaults: { ease: 'none', transformOrigin: 'center' },
                repeat: (isDesktop ? 2 : 4) + 2 * index,
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
                    trigger: '#cards',
                    onEnter: () => {
                        setCurrentSection('skills');
                        window.history.pushState({}, '', '#skills');
                    },
                    onEnterBack: () => {
                        setCurrentSection('skills');
                        window.history.pushState({}, '', '#skills');
                    },
                    start: 'top center',
                    end: 'bottom center'
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#cards',
                    onEnter: () => { setActiveCard('frontend') },
                    onEnterBack: () => { setActiveCard('frontend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `-2% ${cardTriggerPosition}px`,
                    end: `21% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#cards',
                    onEnter: () => { setActiveCard('backend') },
                    onEnterBack: () => { setActiveCard('backend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `32% ${cardTriggerPosition}px`,
                    end: `55% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#cards',
                    onEnter: () => { setActiveCard('graphics') },
                    onEnterBack: () => { setActiveCard('graphics') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `67% ${cardTriggerPosition}px`,
                    end: `90% ${cardTriggerPosition}px`,
                    // markers: true
                }
            });

            const cards = [frontendCard, backendCard, graphicsCard];

            if (isDesktop) {
                gsap.set(cards, { yPercent: 60, opacity: 0, scale: .7 });

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
            } else {
                gsap.set(cards, { xPercent: -100, opacity: 0, scale: .6 });
                gsap.set(backendCard, { xPercent: 100 });

                cards.forEach((element) => {
                    gsap.to(element, {
                        xPercent: 0,
                        opacity: 1,
                        scale: 1,
                        duration: .6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: "10% bottom"
                        }
                    });
                });
            };
        };
    }, [setCurrentSection, isDesktop])

    const svgPath = isDesktop ? <MotionPathDesktop className={styles.path_svg} preserveAspectRatio='none' /> : <MotionPathMobile className={styles.path_svg} preserveAspectRatio='none' />;

    const cards = Object.keys(cardData).map((element, index) => {

        const Icon = cardData[element].icon;

        return (
            <SkillCard data={cardData[element].data} activeCard={activeCard} ref={cardData[element].ref} key={index}>
                <Icon className={clsx(styles.icon, styles[`icon_${element}`])} title={`${element} icon`} />
            </SkillCard>
        );
    }
    );

    return (
        <section className={styles.skills} id='skills'>

            <SectionName>umiejętności</SectionName>

            <div className={styles.cards} id='cards'>
                <CrystalMoving className={styles.sliding_crystal} ref={crystalRef} />

                {cards}

                {svgPath}
            </div>

        </section>
    );
};
