import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';

import styles from './SectionName.module.sass';

type MyProps = {
    children: string
    lighter?: boolean
};

export const SectionName: React.FC<MyProps> = ({ lighter, children }) => {

    const [visible, setVisible] = useState(false);
    const nameRef = useRef(null);

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: nameRef.current,
                onEnter: () => { setVisible(true) },
                onEnterBack: () => { setVisible(true) },
                start: `top 80%`,
                end: `bottom 80%`,
            }
        });
    });

    return (
        <div className={clsx(styles.wrapper, lighter && styles['wrapper--projects'])}>
            <h2 className={clsx(styles.section_name, visible && styles['section_name--visible'], lighter && styles['section_name--lighter'])} ref={nameRef}>
                {children}
            </h2>
        </div>
    );
};