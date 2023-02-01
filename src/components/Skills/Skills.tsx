import { useEffect, useRef, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';

import styles from './Skills.module.sass';

import { AppContext } from '../../store/AppContext';
import { SkillCard } from './SkillCard/SkillCard';
import { SectionName } from '../../layout/SectionName/SectionName';

import { ReactComponent as FrontendIcon } from '../../images/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../images/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../images/icons/tools.svg';
import { ReactComponent as CrystalMoving } from '../../images/crystal_scroll.svg';
import { ReactComponent as MotionPathDesktop } from '../../images/motion_path_desktop.svg';
import { ReactComponent as MotionPathMobile } from '../../images/motion_path_mobile.svg';

export const Skills: React.FC = () => {

    const { language, motionNotReduced, setCurrentSection } = useContext(AppContext);

    const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);
    const frontendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const backendRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const graphicsRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const [activeCard, setActiveCard] = useState('');
    const [float, setFloat] = useState(false);

    const isDesktop = window.matchMedia('(orientation: landscape)').matches;
    const isEnglish = language === 'english';

    // Setting up all GSAP timelines and animations
    useEffect(() => {
        const [crystal, frontendCard, backendCard, graphicsCard] = [crystalRef.current, frontendRef.current, backendRef.current, graphicsRef.current];

        if (crystal) {
            const elementGetter = gsap.utils.selector(crystal);

            const cardTriggerPosition = window.innerHeight / 2;
            const motionRoute = `#motion_path_${isDesktop ? 'desktop' : 'mobile'}_svg__motion-path`;
            const motionStart = `top ${isDesktop ? cardTriggerPosition * 1.5 : cardTriggerPosition * 1.4}px`;
            const motionEnd = `+=${(isDesktop ? 1.2 : 1) * document.getElementById('skills')!.offsetHeight}px`;

            const [leftBottomShard, leftShard, rightBottomShard, topShard, rightShard, bottomShard] = ['left-bottom', 'left', 'right-bottom', 'top', 'right', 'bottom'].map((element) => (elementGetter(`[id="crystal_scroll_svg__${element}"]`)));

            const inner = elementGetter('[id*="inner"]');

            gsap.set([inner, crystal], { autoAlpha: 0 })

            if (motionNotReduced) { }

            // Timelines for crystal shards scroll animation
            const [leftBottomShardTL, rightBottomShardTL, leftShardTL, topShardTL, rightShardTL, bottomShardTL] = Array.from(Array(6), (_, index) => (gsap.timeline({
                defaults: { ease: 'none', transformOrigin: 'center' },
                repeat: (isDesktop ? 2 : 4) + 2 * (index < 5 ? index : 2),
                yoyo: true,
                scrollTrigger: {
                    trigger: motionRoute,
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    start: motionStart,
                    end: motionEnd,
                    invalidateOnRefresh: true,
                    onLeave: () => {
                        // Condition to prevent visual Firefox bug and respect motion reduced settings
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1 && motionNotReduced) {
                            setFloat(true);
                        };
                    },
                    onEnterBack: () => { if (isDesktop) { setFloat(false) } }
                }
            })));

            const crystalShardsTL = [leftBottomShardTL, rightBottomShardTL, leftShardTL, topShardTL, rightShardTL, bottomShardTL];

            // Animation of crystal shards moving while scrolling
            const crystalFloater = () => {

                if (isDesktop) {
                    leftBottomShardTL
                        .fromTo(leftBottomShard, {
                            xPercent: -30,
                            yPercent: 30,
                            duration: .2
                        }, {
                            xPercent: -60,
                            yPercent: 40,
                            duration: .2
                        });

                    leftShardTL
                        .fromTo(leftShard, {
                            xPercent: -23,
                            yPercent: -4,
                            rotateZ: '4deg',
                            duration: .2
                        }, {
                            xPercent: -33,
                            yPercent: -12,
                            rotateZ: '4deg',
                            duration: .2
                        });

                    rightBottomShardTL
                        .fromTo(rightBottomShard, {
                            xPercent: 18,
                            yPercent: 18,
                            duration: .2
                        }, {
                            xPercent: 32,
                            yPercent: 32,
                            duration: .2
                        });

                    rightShardTL
                        .fromTo(rightShard, {
                            xPercent: 35,
                            yPercent: 4,
                            duration: .2
                        }, {
                            xPercent: 55,
                            yPercent: 12,
                            duration: .2
                        });

                    topShardTL
                        .fromTo(topShard, {
                            yPercent: -16,
                            duration: .2,
                        }, {
                            yPercent: -26,
                            duration: .2,
                        });

                    bottomShardTL
                        .fromTo(bottomShard, {
                            yPercent: 70,
                            duration: .2
                        }, {
                            xPercent: -25,
                            yPercent: 100,
                            duration: .2
                        });

                    if (window.location.href.includes('#contact')) {

                        for (const timeline of crystalShardsTL) {
                            timeline.progress(1, false);
                        };
                    };
                };
            };

            // Timeline for crystal dropping and breaking
            const breakCrystalTL = gsap.timeline({
                defaults: { ease: "sine.out" },
                scrollTrigger: {
                    trigger: '#skills',
                    start: `${isDesktop ? 15 : 10}% bottom`
                }
            });

            // Animation of crystal dropping and breaking
            breakCrystalTL.fromTo(crystal, { scale: 1.7 }, {
                scale: 1, autoAlpha: 1, duration: .3
            });

            if (isDesktop) {
                breakCrystalTL.to(inner, {
                    autoAlpha: 1,
                    duration: .1
                }).to(leftBottomShard, {
                    xPercent: -30,
                    yPercent: 30,
                    duration: .2,
                    delay: -.1
                }).to(leftShard, {
                    xPercent: -23,
                    yPercent: -4,
                    rotateZ: '4deg',
                    duration: .2,
                    delay: -.2
                }).to(rightBottomShard, {
                    xPercent: 18,
                    yPercent: 18,
                    duration: .2,
                    delay: -.2
                }).to(rightShard, {
                    xPercent: 35,
                    yPercent: 4,
                    duration: .2,
                    delay: -.2
                }).to(topShard, {
                    yPercent: -16,
                    duration: .2,
                    delay: -.2
                }).to(bottomShard, {
                    yPercent: 70,
                    duration: .2,
                    delay: -.2,
                    onComplete: crystalFloater
                });
            } else {
                breakCrystalTL.to(inner, {
                    autoAlpha: 1,
                    duration: .1
                }).to(leftBottomShard, {
                    xPercent: -60,
                    yPercent: 40,
                    duration: .2,
                    delay: -.1
                }).to(leftShard, {
                    xPercent: -33,
                    yPercent: -12,
                    rotateZ: '4deg',
                    duration: .2,
                    delay: -.2
                }).to(rightBottomShard, {
                    xPercent: 32,
                    yPercent: 32,
                    duration: .2,
                    delay: -.2
                }).to(rightShard, {
                    xPercent: 55,
                    yPercent: 12,
                    duration: .2,
                    delay: -.2
                }).to(topShard, {
                    yPercent: -26,
                    duration: .2,
                    delay: -.2
                }).to(bottomShard, {
                    xPercent: -25,
                    yPercent: 100,
                    duration: .2,
                    delay: -.2,
                    onComplete: () => {
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1 && motionNotReduced) {
                            setFloat(true);
                        };
                    }
                });
            };

            if (!motionNotReduced) {
                breakCrystalTL.progress(1, false);
            };

            // Setting up trigger and path for crystal move
            const floatingCrystalTL = gsap.timeline({
                scrollTrigger: {
                    trigger: motionRoute,
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    start: motionStart,
                    end: motionEnd,
                    invalidateOnRefresh: true,
                }
            });

            floatingCrystalTL.to(crystal, {
                ease: "none",
                immediateRender: true,
                motionPath: {
                    path: motionRoute,
                    align: motionRoute,
                    alignOrigin: [.5, .5],
                    autoRotate: 90,
                    start: isDesktop ? .05 : .085
                }
            });

            if (!motionNotReduced) {
                breakCrystalTL.progress(1, false);
                floatingCrystalTL.progress(1, false);
                floatingCrystalTL.kill()
                for (const timeline of crystalShardsTL) {
                    timeline.kill();
                };
            };

            // Unused automatic crystal floating, now floating is synced with scroll and then transitions into css floating animation
            // const floatingShardAuto = gsap.timeline({ defaults: { ease: 'none', transformOrigin: 'center' }, repeat: -1, yoyo: true });

            // floatingShardAuto.to(lowerShard, { duration: 1, yPercent: '+=35', rotateZ: '2deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=40', rotateZ: '-4deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=30', rotateZ: '3deg' })
            //   .to(lowerShard, { duration: 1, yPercent: '+=25', rotateZ: '-3deg' })

            // Setting active card for mobile animation
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#cards',
                    onEnter: () => { setActiveCard('frontend') },
                    onEnterBack: () => { setActiveCard('frontend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `-2% ${cardTriggerPosition}px`,
                    end: `21% ${cardTriggerPosition}px`
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '#cards',
                    onEnter: () => { setActiveCard('backend') },
                    onEnterBack: () => { setActiveCard('backend') },
                    onLeave: () => { setActiveCard('') },
                    onLeaveBack: () => { setActiveCard('') },
                    start: `33% ${cardTriggerPosition}px`,
                    end: `56% ${cardTriggerPosition}px`
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
                    end: `90% ${cardTriggerPosition}px`
                }
            });

            // Card reveal animations for mobile and desktop variant
            const cards = [frontendCard, backendCard, graphicsCard];
            if (motionNotReduced) {
                if (isDesktop) {
                    gsap.set(cards, { yPercent: 40, opacity: 0, scale: .7 });

                    cards.forEach((element, index) => {
                        gsap.to(element, {
                            yPercent: 0,
                            opacity: 1,
                            scale: 1,
                            duration: .9,
                            delay: .3,
                            ease: 'back.out(1.0)',
                            scrollTrigger: {
                                trigger: '#skills',
                                start: `${20 + index * 20}% bottom`
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
        };

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
                end: 'bottom center'
            }
        });
    }, [isDesktop, setCurrentSection])

    // Setting motion path according to screen aspect ratio
    const svgPath = isDesktop ? <MotionPathDesktop className={styles.path_svg} preserveAspectRatio='none' /> : <MotionPathMobile className={styles.path_svg} preserveAspectRatio='none' />;

    // Skill card data, had to replace record key type ('frontend' | 'backend' | 'graphics' => string) to get cards mapped properly
    type CardData = Record<string, {
        data: {
            category: string, display: string, skills: string[]
        },
        icon: React.FC<{ className?: string, title?: string }>,
        ref: React.MutableRefObject<null | HTMLDivElement>
    }>;

    const cardData: CardData = {
        frontend: {
            data: { category: 'frontend', display: 'frontend', skills: ['html', 'css / sass', 'bootstrap', 'javascript', 'typescript', 'react', 'next.js', 'redux'] },
            icon: FrontendIcon,
            ref: frontendRef
        },
        backend: {
            data: { category: 'backend', display: 'backend', skills: ['node.js', 'python', 'django', 'firebase', 'mongodb', 'sqlite'] },
            icon: BackendIcon,
            ref: backendRef
        },
        graphics: {
            data: { category: 'graphics', display: isEnglish ? 'graphics' : 'grafika', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] },
            icon: GraphicIcon,
            ref: graphicsRef
        }
    };

    // Setting up skill cards
    const cards = Object.keys(cardData).map((element, index) => {

        const Icon = cardData[element].icon;

        return (
            <SkillCard data={cardData[element].data} activeCard={activeCard} ref={cardData[element].ref} key={index + cardData[element].data.category}>
                <Icon className={clsx(styles.icon, styles[`icon_${element}`])} title={`${element} icon`} />
            </SkillCard>
        );
    });

    return (
        <section className={styles.skills} id='skills'>

            <SectionName>{isEnglish ? 'skills' : 'umiejętności'}</SectionName>

            <CrystalMoving className={clsx(styles.sliding_crystal, float && styles.floating)} ref={crystalRef} />

            {svgPath}

            <div className={styles.cards} id='cards'>
                {cards}
            </div>

        </section>
    );
};
