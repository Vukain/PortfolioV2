import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './SectionName.module.sass';

export const SectionName: React.FC<{ children: string }> = ({ children }) => {

    const [visible, setVisible] = useState(false);
    const nameRef = useRef(null);


    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: nameRef.current,
                onEnter: () => { setVisible(true) },
                onEnterBack: () => { setVisible(true) },
                // onLeave: () => { setActiveCard('') },
                // onLeaveBack: () => { setActiveCard('') },
                start: `top 90%`,
                end: `bottom 90%`,
                // markers: true
            }
        });
    });

    return (
        <div className={styles.wrapper}>
            <h2 className={clsx(styles.section_name, visible && styles['section_name--visible'])} ref={nameRef}>
                {children}
            </h2>
        </div>
    );
};