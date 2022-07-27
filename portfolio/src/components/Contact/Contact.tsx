import styles from './Contact.module.sass';
import { MouseEvent, useRef, useState } from 'react';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

const Contact: React.FC = () => {

    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);

    const initialCursorXPositionRef = useRef(0);
    const initialCursorYPositionRef = useRef(0);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);
    const [exitCursorXPosition, setExitCursorXPosition] = useState(0);
    const [exitCursorYPosition, setExitCursorYPosition] = useState(0);


    const mouseMoveHandler = (e: MouseEvent): void => {
        // e.preventDefault();
        if (sectionRef.current) {
            setCursorXPosition(e.clientX - sectionRef.current?.getBoundingClientRect().left - initialCursorXPositionRef.current + exitCursorXPosition)
            setCursorYPosition(e.clientY - sectionRef.current?.getBoundingClientRect().top - initialCursorYPositionRef.current + exitCursorYPosition)
        };
    };

    const mouseEnterHandler = (e: MouseEvent): void => {
        // e.preventDefault();
        if (sectionRef.current) {
            initialCursorXPositionRef.current = e.clientX - sectionRef.current.getBoundingClientRect().left
            initialCursorYPositionRef.current = e.clientY - sectionRef.current.getBoundingClientRect().top
        };
    };

    const mouseLeaveHandler = (e: MouseEvent): void => {
        // e.preventDefault();
        setExitCursorXPosition(cursorXPosition);
        setExitCursorYPosition(cursorYPosition);
    };


    type Crystals = Array<{ crystalImage: React.FC<{ className?: string }>, speed: number }>;

    const crystals: Crystals = [
        { crystalImage: Crystal, speed: 2 }, { crystalImage: Crystal, speed: 4 }, { crystalImage: Crystal, speed: 2 },
        { crystalImage: Crystal, speed: 9 }, { crystalImage: Crystal, speed: 7 }, { crystalImage: Crystal, speed: 5 },
        { crystalImage: Crystal, speed: 2 }];

    const crystalsMapped = crystals.map(({ crystalImage, speed }, index) => {
        const Image = crystalImage;
        return (
            <div key={index} className={styles.crystal_wrapper} style={{ transform: `translate(${speed * (window.innerWidth - cursorXPosition) / 100}px, ${speed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Image className={styles.floating_crystal} />
            </div>
        );
    });

    return (
        <section className={styles.contact} onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>
            {crystalsMapped}
            <div className={styles.form_card}></div>
        </section>
    );
}

export default Contact;