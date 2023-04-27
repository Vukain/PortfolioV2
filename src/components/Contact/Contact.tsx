import { MouseEvent, useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import emailjs from '@emailjs/browser';

import styles from './Contact.module.sass';

import { checkMotionReduce } from '../../utils/checkMotionReduce';
import { useForm } from '../../hooks/useForm';
import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { useGsapContactTriggers } from '../../hooks/useGsapContactTriggers';
import { Button, SectionName, ParallaxCrystal } from '../';
import {
    HeroShardImg1, HeroShardImg2, HeroShardImg3, HeroShardImg4, HeroShardImg5, HeroShardImg6, HeroShardImg7,
    ScrollShardImg1, ScrollShardImg2, ScrollShardImg3, ScrollShardImg4, ScrollShardImg5, ScrollShardImg6, ScrollShardImg7,
    SpikedShardImg1, SpikedShardImg2, SpikedShardImg3, SpikedShardImg4
} from '../../images/parallax_shards';

type Crystals = Array<{
    name: string,
    CrystalImage: React.FC,
    moveSpeed: number,
    orbitRange: string
}>;

export const Contact: React.FC = () => {

    const initialCursorXPositionRef = useRef(0);
    const initialCursorYPositionRef = useRef(0);
    const formRef = useRef(null);
    const sectionRef: React.MutableRefObject<null | HTMLElement> = useRef(null);
    const errorTimeout: React.MutableRefObject<null | NodeJS.Timeout> = useRef(null);

    const [cursorXPosition, setCursorXPosition] = useState(0);
    const [cursorYPosition, setCursorYPosition] = useState(0);
    const [exitCursorXPosition, setExitCursorXPosition] = useState(0);
    const [exitCursorYPosition, setExitCursorYPosition] = useState(0);
    const [formValidity, setFormValidity] = useState('invalid');
    const [showError, setShowError] = useState(false);

    const { language, languageSwitch } = useLanguageSwitch();

    // Create form with given fields
    const { inputValues, setInputValues, changeHandler } = useForm('user_name', 'user_email', 'message');
    const { user_name: name, user_email: email, message } = inputValues;

    useGsapContactTriggers(sectionRef);

    useEffect(() => {
        setFormValidity([name.status, email.status, message.status].every(val => val === 'valid') ? 'valid' : 'invalid');
    }, [name, email, message])

    // Handlers for parallax shards move
    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!checkMotionReduce() && sectionRef.current) {
            setCursorXPosition(e.clientX - sectionRef.current.getBoundingClientRect().left - initialCursorXPositionRef.current + exitCursorXPosition)
            setCursorYPosition(e.clientY - sectionRef.current.getBoundingClientRect().top - initialCursorYPositionRef.current + exitCursorYPosition)
        };
    };

    const mouseEnterHandler = (e: MouseEvent): void => {
        if (!checkMotionReduce() && sectionRef.current) {
            initialCursorXPositionRef.current = e.clientX - sectionRef.current.getBoundingClientRect().left
            initialCursorYPositionRef.current = e.clientY - sectionRef.current.getBoundingClientRect().top
        };
    };

    const mouseLeaveHandler = (e: MouseEvent): void => {
        if (!checkMotionReduce()) {
            setExitCursorXPosition(cursorXPosition);
            setExitCursorYPosition(cursorYPosition);
        };
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

    const crystals: Crystals = [
        { name: 'spiked_1', CrystalImage: SpikedShardImg1, moveSpeed: 4, orbitRange: 'small' }, { name: 'spiked_2', CrystalImage: SpikedShardImg2, moveSpeed: 3, orbitRange: 'small' },
        { name: 'spiked_3', CrystalImage: SpikedShardImg3, moveSpeed: 1, orbitRange: 'small' }, { name: 'spiked_4', CrystalImage: SpikedShardImg4, moveSpeed: .5, orbitRange: 'small' },
        { name: 'hero_1', CrystalImage: HeroShardImg1, moveSpeed: 4, orbitRange: 'small' }, { name: 'hero_2', CrystalImage: HeroShardImg2, moveSpeed: 3, orbitRange: 'small' },
        { name: 'hero_3', CrystalImage: HeroShardImg3, moveSpeed: 2, orbitRange: 'small' }, { name: 'hero_4', CrystalImage: HeroShardImg4, moveSpeed: 2, orbitRange: 'small' },
        { name: 'hero_5', CrystalImage: HeroShardImg5, moveSpeed: 1, orbitRange: 'small' }, { name: 'hero_6', CrystalImage: HeroShardImg6, moveSpeed: 1, orbitRange: 'small' },
        { name: 'hero_7', CrystalImage: HeroShardImg7, moveSpeed: 3.4, orbitRange: 'small' },
        { name: 'scroll_1', CrystalImage: ScrollShardImg1, moveSpeed: 3, orbitRange: 'small' }, { name: 'scroll_2', CrystalImage: ScrollShardImg2, moveSpeed: 1, orbitRange: 'small' },
        { name: 'scroll_3', CrystalImage: ScrollShardImg3, moveSpeed: 1.5, orbitRange: 'small' }, { name: 'scroll_4', CrystalImage: ScrollShardImg4, moveSpeed: 2, orbitRange: 'small' },
        { name: 'scroll_5', CrystalImage: ScrollShardImg5, moveSpeed: 2, orbitRange: 'small' }, { name: 'scroll_6', CrystalImage: ScrollShardImg6, moveSpeed: 2.4, orbitRange: 'small' },
        { name: 'scroll_7', CrystalImage: ScrollShardImg7, moveSpeed: 1, orbitRange: 'small' },
    ];

    const crystalsMapped = crystals.map((data, index) => {
        return (
            <ParallaxCrystal key={index + data.name} data={data} cursorXPosition={cursorXPosition} cursorYPosition={cursorYPosition} />
        );
    });

    const sent = formValidity === 'sent';
    const textName = languageSwitch('name', 'imię');
    const textMessage = languageSwitch('message', 'wiadomość');

    return (
        <section className={styles.contact} id="contact" onMouseEnter={mouseEnterHandler} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler} ref={sectionRef}>

            <SectionName blurBackground={true}>{languageSwitch('contact', 'kontakt')}</SectionName>

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
                        <Button name={languageSwitch('send', 'wyślij')} alternativeText={languageSwitch('sent', 'wysłane')} onClick={submitHandler} status={formValidity} />
                    </form>
                </div>
            </div>

        </section>
    );
};