import bemCssModules from 'bem-css-modules';

import skillCardStyles from './SkillCard.module.sass';

interface MyProps {
    position: 'first' | 'second' | 'third',
};

const SkillCard: React.FC<MyProps> = (props: MyProps) => {

    const styles = bemCssModules(skillCardStyles);

    const position: { [key: string]: boolean } = {};

    position[props.position] = true;

    // type Position = { first?: boolean, second?: boolean, third?: boolean };
    // const first: boolean = props.position === 'first';
    // const second: boolean = props.position === 'second';
    // const third: boolean = props.position === 'third';
    // const position: Position = { first, second, third };

    const titles = { first: 'frontend', second: 'backend', third: 'grafika' };

    // const titles: { [key: string]: string } = { first: 'frontend', second: 'backend', third: 'grafika' }
    // const titles: { first: string, second: string, third: string } = { first: 'frontend', second: 'backend', third: 'grafika' }

    return (
        <div className={styles()}>
            <div className={styles('front', position)}>
                <h2 className={styles('title', position)}>{titles[props.position]}</h2>
            </div>
            <div className={styles('back')}></div>
        </div>
    );
};

export default SkillCard;