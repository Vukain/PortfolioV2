import { useRef, useEffect } from 'react';
import bemCssModules from 'bem-css-modules';
import gsap from 'gsap';

import headerStyles from './Header.module.sass';

import { ReactComponent as Crystal } from '../../media/animation_test.svg';


const Header: React.FC = (props) => {

    const style = bemCssModules(headerStyles);

    const crystalWrapper = useRef(null);
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)', transformOrigin: 'center' } });


    useEffect(() => {
        // @ts-ignore
        const extru = crystalWrapper.current;
        gsap.set(extru, { autoAlpha: 0 });
        tl.fromTo(extru, { scale: 3, filter: 'grayscale(0) blur(10px)' }, { ease: 'bounce.out', duration: 1.6, delay: .5, scale: 1, filter: 'grayscale(1) blur(0px)', autoAlpha: 1 })
            .to(extru, { duration: 0.9, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.4, filter: 'grayscale(.8)' })
            .to(extru, { duration: 0.9, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.4, filter: 'grayscale(.3)' })
            .to(extru, { duration: 0.9, scale: 1, filter: 'grayscale(0)' })
            .to(extru, { duration: 0.7, scale: 1.2, filter: '' })

    }, [tl])


    return (
        <div className={style()}>
            <Crystal className={style('crystal')} ref={crystalWrapper} />
        </div>
    );
}

export default Header;