import styles from './SkillCard.module.sass';

import { ReactComponent as CardCrystal } from '../../../media/card_crystal.svg';

interface MyProps {
    data: { category: string, skills: string[] },
    children: JSX.Element
};

const SkillCard: React.FC<MyProps> = ({data, children}) => {

    // const position: Record<MyProps['data']['title'], true> = { [props.data.category]: true };
    // const position: Partial<Record<MyProps['data']['title'], boolean>> = {};
    // position[props.data.category] = true;

    return (
        <div className={styles.card}>

            <div className={styles[`frontside_${data.category}`]}>
                <CardCrystal className={styles.crystal} />
                <h2 className={styles[`title_${data.category}`]}>{data.category}</h2>
            </div>

            <div className={styles[`backside_${data.category}`]}>
                <div className={styles.skew_wrapper}>
                    <h2 className={`${styles[`title_${data.category}`]} ${styles.title_skewed}`}>{data.category}</h2>
                    <ul className={styles.skills}>
                        {data.skills.map((skill, idx) => <li className={styles[`skill_${data.category}`]} key={idx}>{skill}</li>)}
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