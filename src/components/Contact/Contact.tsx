import { MouseEvent, useRef, useState, useContext, useEffect } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

import styles from './Contact.module.sass';

import { AppContext } from '../../store/AppContext';
import { Button, SectionName, ParallaxCrystal } from '../';
import { useForm } from '../../hooks/useForm';

import {
    HeroShardImg1, HeroShardImg2, HeroShardImg3, HeroShardImg4, HeroShardImg5, HeroShardImg6, HeroShardImg7,
    ScrollShardImg1, ScrollShardImg2, ScrollShardImg3, ScrollShardImg4, ScrollShardImg5, ScrollShardImg6, ScrollShardImg7,
    SpikedShardImg1, SpikedShardImg2, SpikedShardImg3, SpikedShardImg4
} from '../../images/parallax_shards';

// Could be used as Mutable<React.RefObject<T>> instead of React.MutableRefObject
// type Mutable<Type> = {
//     -readonly [Key in keyof Type]: Type[Key];
// };

export const Contact: React.FC = () => {

    const { language, setCurrentSection, motionNotReduced } = useContext(AppContext);

    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);
    const formRef: React.MutableRefObject<null | HTMLFormElement> = useRef(null);
    const initialCursorXPositionRef: React.MutableRefObject<number> = useRef(0);
    const initialCursorYPositionRef: React.MutableRefObject<number> = useRef(0);
    const errorTimeout: React.MutableRefObject<null | NodeJS.Timeout> = useRef(null);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);
    const [exitCursorXPosition, setExitCursorXPosition] = useState(0);
    const [exitCursorYPosition, setExitCursorYPosition] = useState(0);
    const [formValidity, setFormValidity] = useState('invalid');
    const [showError, setShowError] = useState(false);

    const isEnglish = language === 'english';
    const sent = formValidity === 'sent';

    // Create form with given fields
    const { inputValues, setInputValues, changeHandler } = useForm('user_name', 'user_email', 'message');
    // user_ used as required for emailjs compatibility
    const { user_name: name, user_email: email, message } = inputValues;

    useEffect(() => {

        // Grab all elements
        const elementGetter = gsap.utils.selector(sectionRef.current);
        const wrappers: HTMLElement[] = elementGetter('[class*="t_wrapper_"]');
        wrappers.push(...elementGetter('[class*="n_wrapper_"]'));

        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        if (motionNotReduced) {
            // Set initial properties
            gsap.set(wrappers, { translateY: `${isDesktop ? 40 : 20}vh`, scale: .7 });
            gsap.set(wrappers.slice(1), { translateY: `4vh`, opacity: 0 })

            // Initialize triggers for reveal
            wrappers.forEach((element, index) => {
                gsap.to(element, {
                    translateY: 0,
                    opacity: 1,
                    scale: 1,
                    duration: index === 0 ? .8 : .4,
                    delay: .2 * index,
                    ease: 'Power1.easeOut',
                    scrollTrigger: {
                        trigger: '#contact',
                        start: `${isDesktop ? 40 : 60}% bottom`
                    }
                });
            });
        };

        // Set as active section
        gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                onEnter: () => {
                    setCurrentSection('contact');
                    window.history.pushState({}, '', '#contact');
                },
                onEnterBack: () => {
                    setCurrentSection('contact');
                    window.history.pushState({}, '', '#contact');
                },
                start: 'top center',
                end: 'bottom center'
            }
        })
    }, [setCurrentSection]);

    useEffect(() => {
        // Changing form status
        setFormValidity([name.status, email.status, message.status].every(val => val === 'valid') ? 'valid' : 'invalid');
    }, [name, email, message])

    // Handlers for parallax shards move
    const mouseMoveHandler = (e: MouseEvent): void => {
        if (motionNotReduced && sectionRef.current) {
            setCursorXPosition(e.clientX - sectionRef.current?.getBoundingClientRect().left - initialCursorXPositionRef.current + exitCursorXPosition)
            setCursorYPosition(e.clientY - sectionRef.current?.getBoundingClientRect().top - initialCursorYPositionRef.current + exitCursorYPosition)
        };
    };

    const mouseEnterHandler = (e: MouseEvent): void => {
        if (motionNotReduced && sectionRef.current) {
            initialCursorXPositionRef.current = e.clientX - sectionRef.current.getBoundingClientRect().left
            initialCursorYPositionRef.current = e.clientY - sectionRef.current.getBoundingClientRect().top
        };
    };

    const mouseLeaveHandler = (e: MouseEvent): void => {
        if (motionNotReduced) {
            setExitCursorXPosition(cursorXPosition);
            setExitCursorYPosition(cursorYPosition);
        };
    };

    // Form submit and status changing
    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setShowError(false);
        for (const key of Object.keys(inputValues)) {
            if (inputValues[key].status === 'untouched') {
                setInputValues(prevState => ({ ...prevState, [key]: { ...prevState[key], status: 'error' } }));
            };
        };


        console.log(process.env.EMAIL_JS_TEMPLATE)
        if (formValidity === 'valid') {
            setFormValidity('sent');

            emailjs.sendForm(`${process.env.REACT_APP_EMAIL_JS_SERVICE}`, `${process.env.REACT_APP_EMAIL_JS_TEMPLATE}`, formRef.current!, `${process.env.REACT_APP_EMAIL_JS_KEY}`)
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        } else if (formValidity === 'invalid') {
            if (errorTimeout.current) {
                clearTimeout(errorTimeout.current);
            };
            setTimeout(() => {
                setShowError(true);
            }, 50);
            errorTimeout.current = setTimeout(() => {
                setShowError(false);
            }, 3000);
        };
    };

    type Crystals = Array<{
        name: string,
        crystalImage: React.FC,
        moveSpeed: number,
        orbitRange: string
    }>;

    const crystals: Crystals = [
        { name: 'spiked_1', crystalImage: SpikedShardImg1, moveSpeed: 4, orbitRange: 'small' }, { name: 'spiked_2', crystalImage: SpikedShardImg2, moveSpeed: 3, orbitRange: 'small' },
        { name: 'spiked_3', crystalImage: SpikedShardImg3, moveSpeed: 1, orbitRange: 'small' }, { name: 'spiked_4', crystalImage: SpikedShardImg4, moveSpeed: .5, orbitRange: 'small' },
        { name: 'hero_1', crystalImage: HeroShardImg1, moveSpeed: 4, orbitRange: 'small' }, { name: 'hero_2', crystalImage: HeroShardImg2, moveSpeed: 3, orbitRange: 'small' },
        { name: 'hero_3', crystalImage: HeroShardImg3, moveSpeed: 2, orbitRange: 'small' }, { name: 'hero_4', crystalImage: HeroShardImg4, moveSpeed: 2, orbitRange: 'small' },
        { name: 'hero_5', crystalImage: HeroShardImg5, moveSpeed: 1, orbitRange: 'small' }, { name: 'hero_6', crystalImage: HeroShardImg6, moveSpeed: 1, orbitRange: 'small' },
        { name: 'hero_7', crystalImage: HeroShardImg7, moveSpeed: 3.4, orbitRange: 'small' },
        { name: 'scroll_1', crystalImage: ScrollShardImg1, moveSpeed: 3, orbitRange: 'small' }, { name: 'scroll_2', crystalImage: ScrollShardImg2, moveSpeed: 1, orbitRange: 'small' },
        { name: 'scroll_3', crystalImage: ScrollShardImg3, moveSpeed: 1.5, orbitRange: 'small' }, { name: 'scroll_4', crystalImage: ScrollShardImg4, moveSpeed: 2, orbitRange: 'small' },
        { name: 'scroll_5', crystalImage: ScrollShardImg5, moveSpeed: 2, orbitRange: 'small' }, { name: 'scroll_6', crystalImage: ScrollShardImg6, moveSpeed: 2.4, orbitRange: 'small' },
        { name: 'scroll_7', crystalImage: ScrollShardImg7, moveSpeed: 1, orbitRange: 'small' },
    ];

    const crystalsMapped = crystals.map((data, index) => {
        return (
            <ParallaxCrystal key={index + data.name} data={data} cursorXPosition={cursorXPosition} cursorYPosition={cursorYPosition} />
        );
    });

    const textName = isEnglish ? 'name' : 'imię';
    const textMessage = isEnglish ? 'message' : 'wiadomość';

    return (
        <section className={styles.contact} id="contact" onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>

            <SectionName blurBackground={true}>{isEnglish ? 'contact' : 'kontakt'}</SectionName>

            {crystalsMapped}

            <div className={styles.wrapper}>
                <div className={styles.form_card}>
                    <form className={styles.form} action="submit" ref={formRef}>
                        <div className={styles.wrapper_input}>
                            <input className={clsx(styles.input, styles[name.status], sent && styles.sent)} value={name.value} required onChange={changeHandler} aria-label={textName} type="text" placeholder={textName} name='user_name' />
                            <label className={styles.label}><span className={styles.text}>{textName}</span></label>
                            <div className={styles.status_bar} />
                            {showError && name.status === 'error' && <div className={styles.error_message}>{name.error[language]}</div>}
                        </div>
                        <div className={styles.wrapper_input}>
                            <input className={clsx(styles.input, styles[email.status], sent && styles.sent)} value={email.value} required onChange={changeHandler} aria-label="email" type="email" placeholder='email' name='user_email' />
                            <label className={styles.label}><span className={styles.text}>email</span></label>
                            <div className={styles.status_bar} />
                            {showError && email.status === 'error' && <div className={styles.error_message}>{email.error[language]}</div>}
                        </div>
                        <div className={styles.wrapper_textarea}>

                            <textarea className={clsx(styles.textarea, styles[message.status], sent && styles.sent)} value={message.value} required onChange={changeHandler} aria-label={textMessage} placeholder={textMessage} name='message' />
                            <label className={styles.label}><span className={styles.text}>{textMessage}</span></label>
                            <div className={styles.status_bar} />
                            {showError && message.status === 'error' && <div className={styles.error_message}>{message.error[language]}</div>}
                        </div>
                        <Button name={isEnglish ? 'send' : 'wyślij'} alternativeText={isEnglish ? 'sent' : 'wysłane'} clickHandler={submitHandler} status={formValidity} />
                    </form>
                </div>
            </div>

        </section>
    );
};