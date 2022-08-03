import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Skills.module.sass';

import SkillCard from './SkillCard/SkillCard';

import { ReactComponent as FrontendIcon } from '../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../media/icons/tools.svg';

import { ReactComponent as CrystalMoving } from '../../media/crystal_scroll.svg';

// import { ReactComponent as MotionPath } from '../../media/mp.svg';

const Skills: React.FC = () => {

    const crystalRef: React.MutableRefObject<null | SVGSVGElement> = useRef(null);

    type CardData = Record<'frontend' | 'backend' | 'graphics', { category: string, skills: string[] }>;

    const cardData: CardData = {
        frontend: { category: 'frontend', skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
        backend: { category: 'backend', skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
        graphics: { category: 'graphics', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] }
    };

    useEffect(() => {
        const crystal = crystalRef.current;

        if (crystal) {
            const elementGetter = gsap.utils.selector(crystal);

            const [leftBottomShard, leftShard, rightBottomShard, topShard, rightShard, bottomShard] = ['left-bottom', 'left', 'right-bottom', 'top', 'right', 'bottom'].map((element) => (elementGetter(`[id="crystal_scroll_svg__${element}"]`)));

            const floatingCrystal = gsap.timeline({
                scrollTrigger: {
                    trigger: "#motionPath",
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    // markers: true,
                    start: 'top center',
                    end: '+=100%',
                    // pin: true,
                    // pinSpacing: false
                }
            });

            floatingCrystal.to(crystal, {
                ease: "none",
                immediateRender: true,
                motionPath: {
                    path: "#motionPath",
                    align: "#motionPath",
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
                repeat: 4 + 2 * index,
                yoyo: true,
                scrollTrigger: {
                    trigger: "#motionPath",
                    toggleActions: 'restart pause reverse pause',
                    scrub: 2,
                    start: 'top center',
                    end: '+=100%'
                }
            })));

            leftBottomShardTL.to(leftBottomShard, {
                // rotateZ: 180,
                xPercent: -40,
                yPercent: 8,
                duration: .2,
            })

            leftShardTL.to(leftShard, {
                // rotateZ: 180,
                xPercent: -15,
                yPercent: -8,
                duration: .2
            });

            topShardTL.to(topShard, {
                // rotateZ: 180,
                xPercent: 0,
                yPercent: -30,
                duration: .2
            });

            rightShardTL.to(rightShard, {
                // rotateZ: 180,
                xPercent: 34,
                yPercent: -20,
                duration: .2
            });

            rightBottomShardTL.to(rightBottomShard, {
                // rotateZ: 180,
                xPercent: 15,
                yPercent: 2,
                duration: .2
            });

            bottomShardTL.to(bottomShard, {

                rotateZ: -6,
                xPercent: 5,
                yPercent: 24,
                duration: 500
            });

        };
    }, [])

    return (
        <section className={styles.skills}>
            <CrystalMoving className={styles.sliding_crystal} ref={crystalRef} />
            <SkillCard data={cardData['frontend']}>
                <FrontendIcon className={styles.icon_frontend} title="frontend icon" />
            </SkillCard>
            <SkillCard data={cardData['backend']}>
                <BackendIcon className={styles.icon_backend} title="backend icon" />
            </SkillCard>
            <SkillCard data={cardData['graphics']}>
                <GraphicIcon className={styles.icon_graphics} title="graphics icon" />
            </SkillCard>

            <svg className={styles.path_svg} id="path-svg" width="400" height="400" version="1.1" viewBox="0 0 400 400" preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg">
                <path id="motionPath" d="M.001.5h400v400l-400-1" />
            </svg>

        </section>
    );
}

export default Skills;