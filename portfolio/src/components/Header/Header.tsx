import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import styles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

const Header: React.FC = (props) => {

    const crystalWrapper: React.MutableRefObject<null> = useRef(null);
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)', transformOrigin: 'center' } });

    useEffect(() => {
        const extru = crystalWrapper.current;
        gsap.set(extru, { autoAlpha: 0 });
        tl.fromTo(extru, { scale: 3, filter: ' grayscale(0) blur(10px)' }, { ease: 'bounce.out', duration: 1.6, delay: .5, scale: 1, filter: 'grayscale(0) blur(0px)', autoAlpha: 1 })
            .to(extru, { duration: 1.4, ease: 'bounce.out', delay: -.6, filter: 'grayscale(1) blur(0px)' })
            .to(extru, { duration: 0.9, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.4, filter: 'grayscale(.7)' })
            .to(extru, { duration: 0.6, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.4, filter: 'grayscale(.3)' })
            .to(extru, { duration: 0.9, scale: 1, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.7, scale: 1.2, filter: '' })

    }, [tl])


    return (
        <header className={styles.header}>
            <Crystal className={styles.crystal} ref={crystalWrapper} />
        </header>
    );
}

export default Header;