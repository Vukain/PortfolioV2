import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './ImagePortal.module.sass';

type MyProps = {
    images: string
};

export const ImagePortal: React.FC<MyProps> = ({ images }) => {

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(portalRef.current);

        const mainImage: HTMLElement[] = elementGetter('[class*="main_wrapper_"]');
        const mobileImages: HTMLElement[] = elementGetter('[class*="mobile_"]');

        const tl = gsap.timeline({ defaults: { transformOrigin: 'center' }, repeat: -1 });

        tl
            .to(mainImage, { duration: 3, ease: 'Expo.easeInOut', top: '50%', scale: 1.1 })
            .to(mainImage, { delay: 1, ease: 'Expo.easeInOut', duration: 3, top: '-50%', scale: 1 })
            .to(mobileImages, { ease: 'Expo.easeIn', delay: -2, duration: 3, stagger: 3, top: '50%', scale: 1 })
            .to(mobileImages, { ease: 'none', duration: 6, delay: -6, stagger: 3, left: '20%', })
            .to(mobileImages, { ease: 'Expo.easeOut', duration: 3, delay: -6, stagger: 3, top: '-150%', scale: 1 })
    }, []);

    return (
        <div className={styles.image_portal} ref={portalRef}>
            <div className={styles.main_wrapper}>
                <img className={styles.main_image} src={images} />
            </div>

            <img className={styles.mobile} src={images} alt="" />
            <img className={styles.mobile} src={images} alt="" />
            <img className={styles.mobile} src={images} alt="" />
        </div>
    );
};