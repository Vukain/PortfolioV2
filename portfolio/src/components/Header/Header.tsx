import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

const Header: React.FC = (props) => {

    const crystalWrapper: React.MutableRefObject<null | SVGSVGElement> = useRef(null);

    const tl = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' } });

    const [tls1, tls2, tls3, tls4, tls5] = Array.from(Array(5), () => (gsap.timeline({ defaults: { ease: 'none', transformOrigin: 'center' }, repeat: -1 })))

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
                .to(lowerShard, { duration: .4, delay: -.2, yPercent: '25', rotateZ: '-3deg' })
                .to(lowerLeftShard, { duration: .4, delay: -.4, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' })
                .to(leftShard, { duration: .4, delay: -.4, yPercent: '-30', xPercent: '-95', rotateZ: '-18deg' })
                .to(tinyShard, { duration: .4, delay: -.4, xPercent: '-195', rotateZ: '-5deg' })
                .to(crystal, { ease: 'Expo.easeOut', duration: 1, delay: -.5, filter: 'grayscale(1)' })
                .to(crystal, { ease: 'bounce.out', duration: 2, delay: 1, filter: 'grayscale(0)' })
                .to(crystal, { duration: .1, filter: 'none' })

            tls1.delay(tl.duration() - .8)
                .to(mainShard, { duration: 2, xPercent: '-5', yPercent: '-4', rotateZ: '-2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '-6', rotateZ: '0deg' })
                .to(mainShard, { duration: 2, xPercent: '5', yPercent: '-2', rotateZ: '2deg' })
                .to(mainShard, { duration: 2, xPercent: '0', yPercent: '0', rotateZ: '0deg' })

            tls2.delay(tl.duration() - .4)
                .to(lowerShard, { duration: 2, yPercent: '35', rotateZ: '2deg' })
                .to(lowerShard, { duration: 2, yPercent: '40', rotateZ: '-4deg' })
                .to(lowerShard, { duration: 2, yPercent: '30', rotateZ: '3deg' })
                .to(lowerShard, { duration: 2, yPercent: '25', rotateZ: '-3deg' })

            tls3.delay(tl.duration() - .3)
                .to(leftShard, { duration: 2.4, yPercent: '-40', xPercent: '-125', rotateZ: '-26deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-45', xPercent: '-100', rotateZ: '-16deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-40', xPercent: '-84', rotateZ: '-6deg' })
                .to(leftShard, { duration: 2.4, yPercent: '-30', xPercent: '-95', rotateZ: '-18deg' })

            tls4.delay(tl.duration() - .5)
                .to(tinyShard, { duration: 1.2, xPercent: '-225', yPercent: '-30', rotateZ: '-5deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-175', yPercent: '-4', rotateZ: '0deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-155', yPercent: '40', rotateZ: '5deg' })
                .to(tinyShard, { duration: 1.4, xPercent: '-175', yPercent: '60', rotateZ: '5deg' })
                .to(tinyShard, { duration: 1.2, xPercent: '-195', yPercent: '0', rotateZ: '-5deg' })

            tls5.delay(tl.duration() - .5)
                .to(lowerLeftShard, { duration: 1.5, yPercent: '40', xPercent: '-45', rotateZ: '-6deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '50', xPercent: '-35', rotateZ: '-2deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '30', xPercent: '-22', rotateZ: '3deg' })
                .to(lowerLeftShard, { duration: 1.5, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' })
        };

    }, [tl, tls1, tls2, tls3, tls4, tls5])


    return (
        <header className={styles.header}>
            <Crystal className={styles.crystal} ref={crystalWrapper} />
        </header>
    );
}

export default Header;