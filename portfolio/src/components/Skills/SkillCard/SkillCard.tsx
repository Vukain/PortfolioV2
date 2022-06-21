import * as React from 'react';

import bemCssModules from 'bem-css-modules';

import skillCardStyles from './SkillCard.module.sass';

interface MyProps {
    data: { title: string, skills: string[] },
    children: JSX.Element
};

const SkillCard: React.FC<MyProps> = (props: MyProps) => {

    const styles = bemCssModules(skillCardStyles);

    const position: Record<MyProps['data']['title'], true> = { [props.data.title]: true };

    // const position: Partial<Record<MyProps['data']['title'], boolean>> = {};
    // position[props.data.title] = true;

    return (
        <div className={styles()}>

            <div className={styles('front', position)}>
                <h2 className={styles('title', position)}>{props.data.title}</h2>
            </div>

            <div className={styles('back', position)}>
                <div className={styles('skew_wrapper')}>
                    <h2 className={styles('title', { ...position, back: true })}>{props.data.title}</h2>
                    <ul className={styles('skills')}>
                        {props.data.skills.map((skill, idx) => <li className={styles('skill', position)} key={idx}>{skill}</li>)}
                    </ul>
                </div>
                <div className={styles('image')}>
                    {props.children}
                </div>
            </div>

        </div>
    );
};

export default SkillCard;