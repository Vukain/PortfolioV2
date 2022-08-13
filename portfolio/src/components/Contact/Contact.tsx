import { MouseEvent, useRef, useState, useContext, useEffect } from 'react';
import gsap from 'gsap';

import styles from './Contact.module.sass';

import { AppContext } from '../../store/AppContext';

import ParallaxCrystal from './ParallaxCrystal/ParallaxCrystal';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

const Contact: React.FC = () => {

    const { setCurrentSection } = useContext(AppContext);

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

    type Crystals = Array<{ crystalImage: React.FC, speed: number }>;

    const crystals: Crystals = [
        { crystalImage: Crystal, speed: 2 }, { crystalImage: Crystal, speed: 4 }, { crystalImage: Crystal, speed: 2 },
        { crystalImage: Crystal, speed: 9 }, { crystalImage: Crystal, speed: 7 }, { crystalImage: Crystal, speed: 5 },
        { crystalImage: Crystal, speed: 2 }];

    const crystalsMapped = crystals.map((data, index) => {
        return (
            <ParallaxCrystal key={index} data={data} cursorXPosition={cursorXPosition} cursorYPosition={cursorYPosition} />
        );
    });

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                onEnter: () => { setCurrentSection('contact') },
                onEnterBack: () => { setCurrentSection('contact') },
                start: 'top center',
                end: 'bottom center'
            }
        });
    });

    return (
        <section className={styles.contact} id="contact" onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>
            {crystalsMapped}
            <div className={styles.form_card}></div>
        </section>
    );
}

export default Contact;