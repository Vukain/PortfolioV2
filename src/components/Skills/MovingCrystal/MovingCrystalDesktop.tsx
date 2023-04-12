import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './MovingCrystal.module.sass';

import { checkMotionReduce } from '../../../utils/checkMotionReduce';
import { timelineKiller } from '../../../utils/timelineKiller';
import { ReactComponent as Crystal } from '../../../images/crystal_scroll.svg';
import { ReactComponent as MotionPathDesktop } from '../../../images/motion_path_desktop.svg';

export const MovingCrystalDesktop: React.FC = () => {

    const [float, setFloat] = useState(false);

    const timelinesRef: React.MutableRefObject<gsap.core.Timeline[] | undefined> = useRef();
    const crystalRef = useRef(null);

    useEffect(() => {
        const crystal = crystalRef.current;

        const motionReduced = checkMotionReduce();

        if (crystal) {
            const elementGetter = gsap.utils.selector(crystal);

            const sectionHeight = document.getElementById('skills')!.offsetHeight;
            const cardTriggerPosition = window.innerHeight / 2;

            const motionRoute = `#motion_path_desktop_svg__motion-path`;
            const motionStart = `top ${cardTriggerPosition * 1.5}px`;
            const motionEnd = `+=${1.2 * sectionHeight}px`;

            const [leftBottomShard, leftShard, rightBottomShard, topShard, rightShard, bottomShard] = ['left-bottom', 'left', 'right-bottom', 'top', 'right', 'bottom'].map((element) => (elementGetter(`[id="crystal_scroll_svg__${element}"]`)));

            const inner = elementGetter('[id*="inner"]');

            gsap.set([inner, crystal], { autoAlpha: 0 })

            // Timelines for crystal shards scroll animation
            const [leftBottomShardTL, rightBottomShardTL, leftShardTL, topShardTL, rightShardTL, bottomShardTL] = Array.from(Array(6), (_, index) => (gsap.timeline({
                defaults: { ease: 'none', transformOrigin: 'center' },
                repeat: 2 + 2 * (index < 5 ? index : 2),
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
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1 && !motionReduced) {
                            setFloat(true);
                        };
                    },
                    onEnterBack: () => { setFloat(false) }
                }
            })));

            const crystalShardsTL = [leftBottomShardTL, rightBottomShardTL, leftShardTL, topShardTL, rightShardTL, bottomShardTL];

            // Animation of crystal shards moving while scrolling
            const crystalFloater = () => {
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

            // Timeline for crystal dropping and breaking
            const breakCrystalTL = gsap.timeline({
                defaults: { ease: "sine.out" },
                scrollTrigger: {
                    trigger: '#skills',
                    start: `15% bottom`
                }
            });

            // Animation of crystal dropping and breaking
            breakCrystalTL.fromTo(crystal, { scale: 1.7 }, {
                scale: 1, autoAlpha: 1, duration: .3
            });

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
                    start: .05
                }
            });

            if (motionReduced) {
                breakCrystalTL.progress(1, false);
                floatingCrystalTL.progress(1, false);
                floatingCrystalTL.kill()
                for (const timeline of crystalShardsTL) {
                    timeline.kill();
                };
            };

            timelinesRef.current = [breakCrystalTL, floatingCrystalTL, ...crystalShardsTL];
        };

        return () => {
            timelineKiller(timelinesRef.current!)
        };
    }, []);

    return (
        <>
            <Crystal className={clsx(styles.sliding_crystal, float && styles.floating)} ref={crystalRef} />
            <MotionPathDesktop className={styles.path_svg} preserveAspectRatio='none' />
        </>
    );
}

