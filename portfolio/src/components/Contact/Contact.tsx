import { MouseEvent, useRef, useState, useContext, useEffect } from 'react';
import { useValidate } from '../../hooks/useValidate';
import { clsx } from 'clsx';
import { gsap } from 'gsap';


import styles from './Contact.module.sass';

import { AppContext } from '../../store/AppContext';
import { Button } from '../../layout/Button/Button';
import { SectionName } from '../SectionName/SectionName';
import { ParallaxCrystal } from './ParallaxCrystal/ParallaxCrystal';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

export const Contact: React.FC = () => {

    const { language, setCurrentSection } = useContext(AppContext);

    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);
    const initialCursorXPositionRef: React.MutableRefObject<number> = useRef(0);
    const initialCursorYPositionRef: React.MutableRefObject<number> = useRef(0);
    const nameInputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
    const emailInputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
    const messageInputRef: React.MutableRefObject<null | HTMLTextAreaElement> = useRef(null);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);
    const [exitCursorXPosition, setExitCursorXPosition] = useState(0);
    const [exitCursorYPosition, setExitCursorYPosition] = useState(0);
    const [inputsValidity, setInputsValidity] = useState({ name: false, email: false, message: false });
    const [formTouched, setFormTouched] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const { validate } = useValidate();

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                onEnter: () => {
                    setTimeout(() => {
                        setCurrentSection('contact');
                        window.history.pushState({}, '', '#contact');
                    }, 50)
                },
                onEnterBack: () => {
                    setCurrentSection('contact');
                    window.history.pushState({}, '', '#contact');
                },
                start: '5% center',
                end: 'bottom center',
                // markers: true
            }
        });
    }, [setCurrentSection]);

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

    const onChangeHandler = () => {
        setFormTouched(false);
    };

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setFormTouched(true);

        const [name, email, message] = [
            { type: 'normal', value: nameInputRef.current!.value },
            { type: 'email', value: emailInputRef.current!.value },
            { type: 'normal', value: messageInputRef.current!.value }];

        const [nameValidity, emailValidity, messageValidity] = [validate(name), validate(email), validate(message)];
        setInputsValidity({ name: nameValidity, email: emailValidity, message: messageValidity });

        if ([nameValidity, emailValidity, messageValidity].every(val => val)) {
            console.log('yeyo')
            setMessageSent(true);
        } else {
            console.log('nonmo')
            if (!nameValidity) {
                nameInputRef.current!.focus()
            } else if (!emailValidity) {
                emailInputRef.current!.focus()
            } else {
                messageInputRef.current!.focus()
            };
        };
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

    const isEnglish = language === 'english';

    return (
        <section className={styles.contact} id="contact" onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>

            <SectionName>{isEnglish ? 'contact' : 'kontakt'}</SectionName>
            {crystalsMapped}
            <div className={styles.wrapper}>

                <div className={styles.form_card}>
                    <form className={styles.form} action="submit">
                        <input className={clsx(styles.input, formTouched ? (inputsValidity.name ? styles.valid : styles.invalid) : null)} onChange={onChangeHandler} aria-label={isEnglish ? 'name' : 'imię'} type="text" placeholder={isEnglish ? 'NAME' : 'IMIĘ'} name='name' ref={nameInputRef} />
                        <input className={clsx(styles.input, formTouched ? (inputsValidity.email ? styles.valid : styles.invalid) : null)} onChange={onChangeHandler} aria-label="email" type="email" placeholder='EMAIL' name='email' ref={emailInputRef} />
                        <textarea className={clsx(styles.text_area, formTouched ? (inputsValidity.message ? styles.valid : styles.invalid) : null)} onChange={onChangeHandler} aria-label={isEnglish ? 'message' : 'wiadomość'} placeholder={isEnglish ? 'MESSAGE' : 'WIADOMOŚĆ'} name='message' ref={messageInputRef} ></textarea>
                        <Button name={isEnglish ? 'send' : 'wyślij'} clickHandler={submitHandler} sent={messageSent} />
                    </form>
                </div>
            </div>

        </section>
    );
};