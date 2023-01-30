import { useEffect } from 'react';
import { gsap } from 'gsap';

import styles from './ProgressBar.module.sass';

export const ProgressBar: React.FC = () => {

    useEffect(() => {

        // Delay to get proper height due to gsap pin-spacer
        setTimeout(() => {
            const app: HTMLDivElement | null = document.querySelector('.App');
            if (app) {
                gsap.to('progress', {
                    value: 100,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: .2,
                        end: app.offsetHeight - window.innerHeight
                    }
                });
            };
        }, 200)
    });

    return (
        <progress className={styles.progress} max="100" value="0" aria-hidden='true' />
    );
};