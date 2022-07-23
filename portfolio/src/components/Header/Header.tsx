import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../media/main_crystal3.svg';

const Header: React.FC = (props) => {

    const crystalWrapper: React.MutableRefObject<null> = useRef(null);
    const tl = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' } });
    const tl2 = gsap.timeline({ defaults: { ease: 'Expo.easeOut', transformOrigin: 'center' }, repeat: -1 });

    useEffect(() => {
        const crystal = crystalWrapper.current;
        //@ts-ignore
        const lowerShard = crystal.getElementById('main_crystal3_svg__lower');
        //@ts-ignore
        const lowerLeftShard = crystal.getElementById('main_crystal3_svg__lower-left');
        //@ts-ignore
        const leftShard = crystal.getElementById('main_crystal3_svg__middle-left');
        //@ts-ignore
        const tinyShard = crystal.getElementById('main_crystal3_svg__middle-tiny');
        //@ts-ignore
        const mainShard = crystal.getElementById('main_crystal3_svg__main');
        gsap.set(crystal, { autoAlpha: 0 });
        tl.fromTo(crystal, { scale: 3, filter: ' grayscale(0) blur(10px)' }, { ease: 'bounce.out', duration: 1.6, delay: .5, scale: 1, filter: 'grayscale(0) blur(0px)', autoAlpha: 1 })
            .to(lowerShard, { duration: .4, delay: -.1, yPercent: '25', rotateZ: '-3deg' })
            .to(lowerLeftShard, { duration: .4, delay: -.4, yPercent: '20', xPercent: '-30', rotateZ: '-5deg' })
            .to(leftShard, { duration: .4, delay: -.4, yPercent: '-28', xPercent: '-85', rotateZ: '5deg' })
            .to(tinyShard, { duration: .4, delay: -.4, xPercent: '-195', rotateZ: '-5deg' })
            .to(crystal, { ease: 'bounce.out', duration: 2, delay: -.4, filter: 'grayscale(1)' })
            .to(crystal, { ease: 'bounce.out', duration: 2, delay: 2, filter: 'grayscale(0)' })
            .to(crystal, { duration: .1, filter: 'none' })

        tl2.delay(tl.duration())
            .to(mainShard, { duration: 2, xPercent: '-5', yPercent: '-4', rotateZ: '-2deg' })
            .to(mainShard, { duration: 2, xPercent: '0', yPercent: '-4', rotateZ: '0deg' })
            .to(mainShard, { duration: 2, xPercent: '5', yPercent: '4', rotateZ: '2deg' })
            .to(mainShard, { duration: 2, xPercent: '0', yPercent: '0', rotateZ: '0deg' })
        // .to(extru, { duration: 1.4, ease: 'bounce.out', delay: -.6, filter: 'grayscale(1) blur(0px)' })
        // .to(extru, { duration: 0.9, filter: 'grayscale(0)' })
        // .to(extru, { duration: 0.4, filter: 'grayscale(.7)' })
        // .to(extru, { duration: 0.6, filter: 'grayscale(0)' })
        // .to(extru, { duration: 0.4, filter: 'grayscale(.3)' })
        // .to(extru, { duration: 0.9, scale: 1, filter: 'grayscale(0)' })
        // .to(extru, { duration: 0.7, scale: 1.2, filter: '' })

    }, [tl])


    return (
        <header className={styles.header}>
            <Crystal className={styles.crystal} ref={crystalWrapper} />
        </header>
    );
}

export default Header;