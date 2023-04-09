import { useEffect, useContext } from "react";
import { gsap } from 'gsap';

import { AppContext } from "../store/AppContext";
import { checkMotionReduce } from "../utils/checkMotionReduce";

type refProp = React.MutableRefObject<null | HTMLElement | SVGSVGElement>;

export const useGsapHeaderTriggers = (objectRef: refProp) => {

    const { setCurrentSection } = useContext(AppContext);

    useEffect(() => {

        const crystal = objectRef.current;

        const motionReduced = checkMotionReduce();

        // Setup timelines for main crystal and all shards
        const crystalTL = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' } });
        const [mainShardTL, lowerShardTL, leftShardTL, tinyShardTL, lowerLeftShardTL] = Array.from(Array(5), () => (
            gsap.timeline({ defaults: { ease: 'none', transformOrigin: 'center' }, repeat: -1 }))
        );

        if (crystal) {

            // Get all shards
            const elementGetter = gsap.utils.selector(crystal);
            const [mainShard, lowerShard, lowerLeftShard, leftShard, tinyShard] = ['main', 'lower', 'lower-left', 'middle-left', 'middle-tiny',].map((element) => (
                elementGetter(`[id="crystal_hero_svg__${element}"]`))
            );

            // const shards = [mainShard, lowerShard, lowerLeftShard, leftShard, tinyShard];
            const shardTimelines = [mainShardTL, lowerShardTL, leftShardTL, tinyShardTL, lowerLeftShardTL];

            gsap.set(crystal, { scale: 3, opacity: 0 });

            // Crystal drop and shatter animation, with shard float
            crystalTL.to(crystal, { ease: 'bounce.out', duration: 1.6, scale: 1, opacity: 1, delay: 3.1 })
                .to(lowerShard, { duration: .4, delay: -.2, yPercent: '25', rotateZ: '-3deg' })
                .to(lowerLeftShard, { duration: .4, delay: -.4, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' })
                .to(leftShard, { duration: .4, delay: -.4, yPercent: '-30', xPercent: '-95', rotateZ: '-18deg' })
                .to(tinyShard, { duration: .4, delay: -.4, xPercent: '-195', rotateZ: '-5deg' })
                .to([crystal, '#vukain'], { ease: 'Expo.easeOut', duration: 1, delay: -.4, filter: 'grayscale(1)' })
                .to(['#vukain', crystal], { ease: 'bounce.out', duration: 3, delay: .4, filter: 'grayscale(0)' })


            const delay = crystalTL.duration()

            mainShardTL.delay(delay - 2.2)
                .to(mainShard, { duration: 2, xPercent: '-5', yPercent: '-4', rotateZ: '-2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '-6', rotateZ: '0deg' })
                .to(mainShard, { duration: 2, xPercent: '5', yPercent: '-2', rotateZ: '2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '0', rotateZ: '0deg' });

            lowerShardTL.delay(delay - 2.05)
                .to(lowerShard, { duration: 2, yPercent: '35', rotateZ: '2deg' })
                .to(lowerShard, { duration: 2, yPercent: '40', rotateZ: '-4deg' })
                .to(lowerShard, { duration: 2, yPercent: '30', rotateZ: '3deg' })
                .to(lowerShard, { duration: 2, yPercent: '25', rotateZ: '-3deg' });

            lowerLeftShardTL.delay(delay - 1.9)
                .to(lowerLeftShard, { duration: 1.5, yPercent: '40', xPercent: '-45', rotateZ: '-6deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '50', xPercent: '-35', rotateZ: '-2deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '30', xPercent: '-22', rotateZ: '3deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' });

            leftShardTL.delay(delay - 1.75)
                .to(leftShard, { duration: 2.4, yPercent: '-40', xPercent: '-125', rotateZ: '-26deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-45', xPercent: '-100', rotateZ: '-16deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-40', xPercent: '-84', rotateZ: '-6deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-30', xPercent: '-95', rotateZ: '-18deg' });

            tinyShardTL.delay(delay - 1.6)
                .to(tinyShard, { duration: 1.2, xPercent: '-225', yPercent: '-30', rotateZ: '-5deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-175', yPercent: '-4', rotateZ: '0deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-155', yPercent: '40', rotateZ: '5deg' })
                .to(tinyShard, { duration: 1.4, xPercent: '-175', yPercent: '60', rotateZ: '5deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-195', yPercent: '0', rotateZ: '-5deg' });

            // Skip and freeze animation if motion is reduced
            if (motionReduced) {
                for (const timeline of [crystalTL, ...shardTimelines]) {
                    timeline.progress(1, false);
                    timeline.kill();
                };
            };
        };

        // Set section as active
        gsap.timeline({
            scrollTrigger: {
                trigger: '#header',
                onEnter: () => {
                    setCurrentSection('header');
                },
                onEnterBack: () => {
                    setCurrentSection('header');
                    window.history.pushState({}, '', ' ');
                },
                onLeave: () => {
                    setCurrentSection('projects');
                },
                start: 'top center',
                end: 'bottom center'
            }
        });

    }, [objectRef, setCurrentSection]);
};