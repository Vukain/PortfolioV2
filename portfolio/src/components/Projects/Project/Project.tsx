import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../../store/AppContext';
import { gsap } from 'gsap';

import styles from './Project.module.sass';

import log from '../../../media/test-img.png';
import { ImagePortal } from './ImagePortal/ImagePortal';

type myProps = {
    data: {
        id: string,
        title: string,
        description: Record<string, string>
        image?: React.FC<{ className?: string, title?: string }>
    },
    index: number
};

export const Project: React.FC<myProps> = ({ data: { id, title, description }, index }) => {

    const portalRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const { language } = useContext(AppContext);

    useEffect(() => {
        const elementGetter = gsap.utils.selector(portalRef.current);

        const mainImage: HTMLElement[] = elementGetter('[class*="log_"]');

        const tl = gsap.timeline({ defaults: { ease: 'Expo.easeInOut', transformOrigin: 'center' }, repeat: -1 });

        tl.to(mainImage, { duration: 3, top: '50%', scale: 1.1 })
            // .to('#test_sub', { ease: 'none', duration: 8, left: '-150%' })
            .to(mainImage, { delay: 1, duration: 3, top: '-50%', scale: 1 })
    }, []);

    return (
        <article className={styles.project}>
            <ImagePortal images={log} />
            {/* <div className={styles.project_name} id='test_sub'>{title}</div> */}
        </article>
    );
};