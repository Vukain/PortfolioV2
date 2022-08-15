import { useEffect } from 'react';
import gsap from 'gsap';

import styles from './ProgressBar.module.sass';

const ProgressBar: React.FC = () => {

    useEffect(() => {

        setTimeout(() => {
            const app: HTMLDivElement | null = document.querySelector('.App');

            if (app) {
                console.log(app.offsetHeight);
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
        <progress className={styles.progress} max="100" value="0">
        </progress>
    );
}

export default ProgressBar;