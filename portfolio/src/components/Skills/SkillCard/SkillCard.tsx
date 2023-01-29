import { forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './SkillCard.module.sass';

import { ReactComponent as CardCrystal } from '../../../media/crystal_card.svg';

type MyProps = {
    data: { category: string, display: string, skills: string[] },
    children: JSX.Element,
    activeCard: string
};

export const SkillCard = forwardRef<HTMLDivElement, MyProps>(({ data: { category, display, skills }, activeCard, children }, ref) => {

    return (
        <article className={styles.card} ref={ref} tabIndex={0}>

            <div className={clsx(styles.frontside, styles[`frontside_${category}`])}>
                <CardCrystal className={styles.crystal} />
                <h2 className={clsx(styles.title, styles[`title_${category}`])}>{display}</h2>
            </div>

            <div className={clsx(styles.backside, styles[`backside_${category}`], activeCard === category && styles['backside--active'])}>
                <div className={styles.skew_wrapper}>
                    <h2 className={clsx(styles.title, styles[`title_${category}`], styles.title_skewed)}>{display}</h2>
                    <ul className={styles.skills}>
                        {skills.map((skill, idx) => <li className={styles[`skill_${category}`]} key={idx}>{skill}</li>)}
                    </ul>
                </div>
                <div className={styles.icon}>
                    {children}
                </div>
            </div>

        </article>
    );
});
