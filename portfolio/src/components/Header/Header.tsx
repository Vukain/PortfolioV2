import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

const Header: React.FC = (props) => {

    const crystalWrapper: React.MutableRefObject<null | SVGSVGElement> = useRef(null);

    const tl = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' } });
    const tl2 = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' }, repeat: -1 });
    const tl3 = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' }, repeat: -1 });

    useEffect(() => {
        const crystal = crystalWrapper.current;

        if (crystal) {
            const lowerShard = crystal.getElementById('main_crystal_svg__lower');
            const lowerLeftShard = crystal.getElementById('main_crystal_svg__lower-left');
            const leftShard = crystal.getElementById('main_crystal_svg__middle-left');
            const tinyShard = crystal.getElementById('main_crystal_svg__middle-tiny');
            const mainShard = crystal.getElementById('main_crystal_svg__main');

            gsap.set(crystal, { autoAlpha: 0 });

            tl.fromTo(crystal, { scale: 3, filter: ' grayscale(0) blur(10px)' }, { ease: 'bounce.out', duration: 1.6, delay: 1, scale: 1, filter: 'grayscale(0) blur(0px)', autoAlpha: 1 })
                .to(lowerShard, { duration: .4, delay: -.1, yPercent: '25', rotateZ: '-3deg' })
                .to(lowerLeftShard, { duration: .4, delay: -.4, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' })
                .to(leftShard, { duration: .4, delay: -.4, yPercent: '-30', xPercent: '-95', rotateZ: '-18deg' })
                .to(tinyShard, { duration: .4, delay: -.4, xPercent: '-195', rotateZ: '-5deg' })
                .to(crystal, { ease: 'Expo.easeOut', duration: 1, delay: -.5, filter: 'grayscale(1)' })
                .to(crystal, { ease: 'bounce.out', duration: 2, delay: 1, filter: 'grayscale(0)' })
                .to(crystal, { duration: .1, filter: 'none' })

            tl2.delay(tl.duration())
                .to(mainShard, { duration: 2, xPercent: '-5', yPercent: '-4', rotateZ: '-2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '-6', rotateZ: '0deg' })
                .to(mainShard, { duration: 2, xPercent: '5', yPercent: '-2', rotateZ: '2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '0', rotateZ: '0deg' })

            // tl3.delay(tl.duration())
            //     .to(lowerShard, { duration: 2, yPercent: '35', rotateZ: '2deg' })
            //     .to(lowerShard, { duration: 2, yPercent: '40', rotateZ: '-4deg' })
            //     .to(lowerShard, { duration: 2, yPercent: '30', rotateZ: '3deg' })
            //     .to(lowerShard, { duration: 2, yPercent: '25', rotateZ: '-3deg' })
        };

    }, [tl, tl2])


    return (
        <header className={styles.header}>
            <Crystal className={styles.crystal} ref={crystalWrapper} />
        </header>
    );
}

export default Header;