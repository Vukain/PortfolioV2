import { forwardRef } from 'react';
import { clsx } from 'clsx';

import styles from './SkillCard.module.sass';

import { ReactComponent as CardCrystal } from '../../../media/card_crystal.svg';

interface MyProps {
    data: { category: string, skills: string[] },
    children: JSX.Element,
    activeCard: string
};

const SkillCard = forwardRef<HTMLDivElement, MyProps>(({ data: { category, skills }, activeCard, children }, ref) => {

    return (
        <article className={styles.card} ref={ref}>

            <div className={clsx(styles.frontside, styles[`frontside_${category}`])}>
                <CardCrystal className={styles.crystal} />
                <h2 className={clsx(styles.title, styles[`title_${category}`])}>{category === 'graphics' ? 'grafika' : category}</h2>
            </div>

            <div className={clsx(styles.backside, styles[`backside_${category}`], activeCard === category && styles['backside--active'])}>
                <div className={styles.skew_wrapper}>
                    <h2 className={clsx(styles.title, styles[`title_${category}`], styles.title_skewed)}>{category === 'graphics' ? 'grafika' : category}</h2>
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

export default SkillCard;