import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './MovingCrystal.module.sass';
import { checkMotionReduce } from '../../../utils/checkMotionReduce';
import { timelineKiller } from '../../../utils/timelineKiller';
import { ReactComponent as Crystal } from '../../../images/crystal_scroll.svg';
import { ReactComponent as MotionPathMobile } from '../../../images/motion_path_mobile.svg';

export const MovingCrystalMobile: React.FC = () => {
  const [float, setFloat] = useState(false);

  const timelinesRef: React.MutableRefObject<gsap.core.Timeline[] | undefined> = useRef();
  const crystalRef = useRef(null);

  useEffect(() => {
    const crystal = crystalRef.current;

    const motionReduced = checkMotionReduce();

    if (crystal) {
      const elementGetter = gsap.utils.selector(crystal);
      const inner = elementGetter('[id*="inner"]');

      const sectionHeight = document.getElementById('skills')!.offsetHeight;
      const cardTriggerPosition = window.innerHeight / 2;
      const motionRoute = `#motion_path_mobile_svg__motion-path`;
      const motionStart = `top ${cardTriggerPosition * 1.4}px`;
      const motionEnd = `+=${sectionHeight}px`;

      const [leftBottomShard, leftShard, rightBottomShard, topShard, rightShard, bottomShard] = [
        'left-bottom',
        'left',
        'right-bottom',
        'top',
        'right',
        'bottom',
      ].map((element) => elementGetter(`[id="crystal_scroll_svg__${element}"]`));

      gsap.set([inner, crystal], { autoAlpha: 0 });

      // Timelines for crystal shards scroll animation
      const [leftBottomShardTL, rightBottomShardTL, leftShardTL, topShardTL, rightShardTL, bottomShardTL] = Array.from(
        Array(6),
        (_, index) =>
          gsap.timeline({
            defaults: { ease: 'none', transformOrigin: 'center' },
            repeat: 4 + 2 * (index < 5 ? index : 2),
            yoyo: true,
            scrollTrigger: {
              trigger: motionRoute,
              toggleActions: 'restart pause reverse pause',
              scrub: 2,
              start: motionStart,
              end: motionEnd,
              invalidateOnRefresh: true,
            },
          }),
      );

      const crystalShardsTL = [
        leftBottomShardTL,
        rightBottomShardTL,
        leftShardTL,
        topShardTL,
        rightShardTL,
        bottomShardTL,
      ];

      // Timeline for crystal dropping and breaking
      const breakCrystalTL = gsap.timeline({
        defaults: { ease: 'sine.out' },
        scrollTrigger: {
          trigger: '#skills',
          start: `10% bottom`,
        },
      });

      // Animation of crystal dropping and breaking
      breakCrystalTL.fromTo(
        crystal,
        { scale: 1.7 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.3,
        },
      );

      breakCrystalTL
        .to(inner, {
          autoAlpha: 1,
          duration: 0.1,
        })
        .to(leftBottomShard, {
          xPercent: -60,
          yPercent: 40,
          duration: 0.2,
          delay: -0.1,
        })
        .to(leftShard, {
          xPercent: -33,
          yPercent: -12,
          rotateZ: '4deg',
          duration: 0.2,
          delay: -0.2,
        })
        .to(rightBottomShard, {
          xPercent: 32,
          yPercent: 32,
          duration: 0.2,
          delay: -0.2,
        })
        .to(rightShard, {
          xPercent: 55,
          yPercent: 12,
          duration: 0.2,
          delay: -0.2,
        })
        .to(topShard, {
          yPercent: -26,
          duration: 0.2,
          delay: -0.2,
        })
        .to(bottomShard, {
          xPercent: -25,
          yPercent: 100,
          duration: 0.2,
          delay: -0.2,
          onComplete: () => {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1 && !motionReduced) {
              setFloat(true);
            }
          },
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
        },
      });

      floatingCrystalTL.to(crystal, {
        ease: 'none',
        immediateRender: true,
        motionPath: {
          path: motionRoute,
          align: motionRoute,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0.085,
        },
      });

      if (motionReduced) {
        breakCrystalTL.progress(1, false);
        floatingCrystalTL.progress(1, false);
        floatingCrystalTL.kill();
        for (const timeline of crystalShardsTL) {
          timeline.kill();
        }
      }

      timelinesRef.current = [breakCrystalTL, floatingCrystalTL, ...crystalShardsTL];
    }

    return () => {
      timelineKiller(timelinesRef.current!);
    };
  }, []);

  return (
    <>
      <Crystal className={clsx(styles.sliding_crystal, float && styles.floating)} ref={crystalRef} />
      <MotionPathMobile className={styles.path_svg} preserveAspectRatio="none" />
    </>
  );
};
