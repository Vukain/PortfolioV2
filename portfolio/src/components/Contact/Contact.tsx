import styles from './Contact.module.sass';
import { MouseEvent, useRef, useState } from 'react';

import { ReactComponent as Crystal } from '../../media/phold_crystal.svg';

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
        if (sectionRef.current !== null) {
            setCursorXPosition(e.clientX - sectionRef.current?.getBoundingClientRect().left - initialCursorXPositionRef.current + exitCursorXPosition)
            setCursorYPosition(e.clientY - sectionRef.current?.getBoundingClientRect().top - initialCursorYPositionRef.current + exitCursorYPosition)
        };
    };

    const mouseEnterHandler = (e: MouseEvent): void => {
        // e.preventDefault();
        if (sectionRef.current !== null) {
            initialCursorXPositionRef.current = e.clientX - sectionRef.current.getBoundingClientRect().left
            initialCursorYPositionRef.current = e.clientY - sectionRef.current.getBoundingClientRect().top
        };
    };

    const mouseLeaveHandler = (e: MouseEvent): void => {
        // e.preventDefault();
        setExitCursorXPosition(cursorXPosition);
        setExitCursorYPosition(cursorYPosition);
    };

    return (
        <section className={styles.contact} onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${4 * (window.innerWidth - cursorXPosition) / 100}px, ${4 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${9 * (window.innerWidth - cursorXPosition) / 100}px, ${9 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${7 * (window.innerWidth - cursorXPosition) / 100}px, ${7 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${5 * (window.innerWidth - cursorXPosition) / 100}px, ${5 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.crystal_wrapper} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }}>
                <Crystal className={styles.floating_crystal} />
            </div>
            <div className={styles.form_card}></div>
        </section>
    );
}

export default Contact;