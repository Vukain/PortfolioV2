import { MouseEvent, useRef, useState, useContext, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { clsx } from 'clsx';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

import styles from './Contact.module.sass';

import { AppContext } from '../../store/AppContext';
import { Button } from '../../layout/Button/Button';
import { SectionName } from '../SectionName/SectionName';
import { ParallaxCrystal } from './ParallaxCrystal/ParallaxCrystal';

import { ReactComponent as Crystal } from '../../media/main_crystal.svg';

type Mutable<Type> = {
    -readonly [Key in keyof Type]: Type[Key];
};

export const Contact: React.FC = () => {

    const { language, setCurrentSection } = useContext(AppContext);

    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);
    const formRef: React.MutableRefObject<null | HTMLFormElement> = useRef(null);
    const initialCursorXPositionRef: React.MutableRefObject<number> = useRef(0);
    const initialCursorYPositionRef: React.MutableRefObject<number> = useRef(0);
    const errorTimeout: Mutable<React.RefObject<NodeJS.Timeout | null>> = useRef(null);

    // const nameInputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
    // const emailInputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
    // const messageInputRef: React.MutableRefObject<null | HTMLTextAreaElement> = useRef(null);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);
    const [exitCursorXPosition, setExitCursorXPosition] = useState(0);
    const [exitCursorYPosition, setExitCursorYPosition] = useState(0);
    const [formValidity, setFormValidity] = useState('invalid');
    const [showError, setShowError] = useState(false);

    const { inputValues, setInputValues, changeHandler } = useForm('user_name', 'user_email', 'message');
    const { user_name: name, user_email: email, message } = inputValues;

    useEffect(() => {
        const elementGetter = gsap.utils.selector(sectionRef.current);
        const wrappers: HTMLElement[] = elementGetter('[class*="t_wrapper_"]');
        wrappers.push(...elementGetter('[class*="n_wrapper_"]'));

        const isDesktop = window.matchMedia('(orientation: landscape)').matches;

        gsap.set(wrappers, { transform: `translate3d(0,${isDesktop ? 40 : 20}vh,0)`, scale: .7 });
        gsap.set(wrappers.slice(1), { transform: 'translate3d(0,4vh,0)', opacity: 0 })

        wrappers.forEach((element, index) => {
            gsap.to(element, {
                transform: 'translate3d(0,0vh,0)',
                opacity: 1,
                scale: 1,
                duration: index === 0 ? .8 : .4,
                delay: .2 * index,
                ease: 'Power1.easeOut',
                scrollTrigger: {
                    trigger: '#contact',
                    start: `60% bottom`
                }
            });
        });

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

    useEffect(() => {
        setFormValidity([name.status, email.status, message.status].every(val => val === 'valid') ? 'valid' : 'invalid');
    }, [name, email, message])

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

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setShowError(false);
        for (const key of Object.keys(inputValues)) {
            if (inputValues[key].status === 'untouched') {
                setInputValues(prevState => ({ ...prevState, [key]: { ...prevState[key], status: 'error' } }));
            };
        };

        if (formValidity === 'valid') {
            setFormValidity('sent');
            // emailjs.sendForm('service_5ln658l', 'template_c6tb0lf', formRef.current!, 'xxx')
            //     .then((result) => {
            //         console.log(result.text);
            //     }, (error) => {
            //         console.log(error.text);
            //     });
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

        // if ([nameValidity, emailValidity, messageValidity].every(val => val)) {
        //     console.log('yeyo')
        //     setMessageSent(true);
        // } else {
        //     console.log('nonmo')
        //     if (!nameValidity) {
        //         nameInputRef.current!.focus()
        //     } else if (!emailValidity) {
        //         emailInputRef.current!.focus()
        //     } else {
        //         messageInputRef.current!.focus()
        //     };
        // };
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
    const sent = formValidity === 'sent';

    const textName = isEnglish ? 'name' : 'imię';
    const textMessage = isEnglish ? 'message' : 'wiadomość';

    return (
        <section className={styles.contact} id="contact" onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>

            <SectionName>{isEnglish ? 'contact' : 'kontakt'}</SectionName>

            {crystalsMapped}

            <div className={styles.wrapper}>
                <div className={styles.form_card}>
                    <form className={styles.form} action="submit" ref={formRef}>
                        <div className={styles.wrapper_input}>
                            <input className={clsx(styles.input, styles[name.status], sent && styles.sent)} value={name.value} required onChange={changeHandler} aria-label={textName} type="text" placeholder={textName} name='user_name' />
                            <label className={styles.label}><span className={styles.text}>{textName}</span></label>
                            {showError && name.status === 'error' && <div className={styles.error_message}>{name.error[language]}</div>}
                        </div>
                        <div className={styles.wrapper_input}>
                            <input className={clsx(styles.input, styles[email.status], sent && styles.sent)} value={email.value} required onChange={changeHandler} aria-label="email" type="email" placeholder='email' name='user_email' />
                            <label className={styles.label}><span className={styles.text}>email</span></label>
                            {showError && email.status === 'error' && <div className={styles.error_message}>{email.error[language]}</div>}
                        </div>
                        <div className={styles.wrapper_textarea}>
                            <textarea className={clsx(styles.textarea, styles[message.status], sent && styles.sent)} value={message.value} required onChange={changeHandler} aria-label={textMessage} placeholder={textMessage} name='message' />
                            <label className={styles.label}><span className={styles.text}>{textMessage}</span></label>
                            {showError && message.status === 'error' && <div className={styles.error_message}>{message.error[language]}</div>}
                        </div>
                        <Button name={isEnglish ? 'send' : 'wyślij'} alternativeText={isEnglish ? 'sent' : 'wysłane'} clickHandler={submitHandler} status={formValidity} />
                    </form>
                </div>
            </div>

        </section>
    );
};