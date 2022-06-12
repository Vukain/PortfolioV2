import bemCssModules from 'bem-css-modules';

import skillCardStyles from './SkillCard.module.sass';

interface MyProps {
    position: 'first' | 'second' | 'third',
};

const SkillCard: React.FC<MyProps> = (props: MyProps) => {

    const styles = bemCssModules(skillCardStyles);

    // const position: { [key: string]: boolean } = {};

    // position[props.position] = true;

    type Position = { first: boolean, second: boolean, third: boolean };

    const position: Position = { first: props.position === 'first', second: props.position === 'second', third: props.position === 'third' };

    return (
        <div className={styles()}>
            <div className={styles('side', { front: true, ...position })}></div>
            <div className={styles('side', { back: true, ...position })}></div>
        </div>
    );
};

export default SkillCard;