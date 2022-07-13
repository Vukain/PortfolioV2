import styles from './SkillCard.module.sass';

import { ReactComponent as CardCrystal } from '../../../media/card_crystal.svg';

interface MyProps {
    data: { category: string, skills: string[] },
    children: JSX.Element
};

const SkillCard: React.FC<MyProps> = ({ data: { category, skills }, children }) => {

    return (
        <div className={styles.card}>

            <div className={styles[`frontside_${category}`]}>
                <CardCrystal className={styles.crystal} />
                <h2 className={styles[`title_${category}`]}>{category}</h2>
            </div>

            <div className={styles[`backside_${category}`]}>
                <div className={styles.skew_wrapper}>
                    <h2 className={`${styles[`title_${category}`]} ${styles.title_skewed}`}>{category}</h2>
                    <ul className={styles.skills}>
                        {skills.map((skill, idx) => <li className={styles[`skill_${category}`]} key={idx}>{skill}</li>)}
                    </ul>
                </div>
                <div className={styles.icon}>
                    {children}
                </div>
            </div>

        </div>
    );
};

export default SkillCard;