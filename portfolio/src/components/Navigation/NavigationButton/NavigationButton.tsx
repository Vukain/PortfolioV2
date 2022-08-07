import React, { ReactSVG, useContext } from 'react';

import { AppContext } from '../../../store/AppContext';

import styles from './NavigationButton.module.sass';

type MyProps = { id: string, name: string, navigationVisibility: boolean, navigationVisibilitySetter: React.Dispatch<React.SetStateAction<boolean>> };

const NavigationButton: React.FC<MyProps> = ({ id, name, navigationVisibility, navigationVisibilitySetter }) => {

    // const { sectionNames } = useContext(AppContext);
    const { navigateTo, setNavigateTo } = useContext(AppContext);
    // const { currentLevel } = useContext(AppContext);

    // const overalStyle = { upper_level: currentLevel === 1, hidden_burger: hiddenBurger };
    // overalStyle[position] = true;

    // const buttonStyle = { active: sectionNames[currentSection] === name, upper_level: currentLevel === 1 }
    // buttonStyle[position] = true;

    // const textStyle = {};
    // textStyle[position] = true;
    // textStyle['hidden'] = name === 'header' && currentLevel === 1;

    const onClickHandler = () => {
        if (window.matchMedia('(orientation: landscape)').matches) {
            setNavigateTo(name);
            navigationVisibilitySetter(true)
            setTimeout(() => {
                window.location.href = `#${id}`;
            }, 1100);
            setTimeout(() => {
                navigationVisibilitySetter(false);
            }, 1200)
        } else {
            window.location.href = `#${id}`;
            setTimeout(() => {
                navigationVisibilitySetter(false);
            }, 200)
        }
    };

    return (
        <button className={navigationVisibility ? styles.button : styles['button--hidden']} onClick={onClickHandler}>
            <span className={styles.text}>{name}</span>
        </button>
    );
};

export default NavigationButton;