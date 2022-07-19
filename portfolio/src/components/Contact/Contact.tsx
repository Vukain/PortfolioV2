import styles from './Contact.module.sass';
import { MouseEvent, useRef, useState } from 'react';

import { ReactComponent as Crystal } from '../../media/phold_crystal.svg';

const Contact: React.FC = () => {

    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);


    const mouseMoveHandler = (e: MouseEvent): void => {

        e.preventDefault();

        if (sectionRef.current !== null) {
            setCursorXPosition(e.clientX - sectionRef.current.getBoundingClientRect().left)
            setCursorYPosition(e.clientY - sectionRef.current.getBoundingClientRect().top)
        } else {
            console.log('Ref is null!')
        };
    };

    return (
        <section className={styles.contact} onMouseMove={mouseMoveHandler} ref={sectionRef}>
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${4 * (window.innerWidth - cursorXPosition) / 100}px, ${4 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${9 * (window.innerWidth - cursorXPosition) / 100}px, ${9 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${7 * (window.innerWidth - cursorXPosition) / 100}px, ${7 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${5 * (window.innerWidth - cursorXPosition) / 100}px, ${5 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <Crystal className={styles.floating_crystal} style={{ transform: `translate(${2 * (window.innerWidth - cursorXPosition) / 100}px, ${2 * (window.innerHeight - cursorYPosition) / 100}px)` }} />
            <div className={styles.form_card}></div>
        </section>
    );
}

export default Contact;