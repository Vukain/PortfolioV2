import bemCssModules from 'bem-css-modules';

import skillCardStyles from './SkillCard.module.sass';

import { ReactComponent as FrontendIcon } from '../../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../../media/icons/tools.svg';

interface MyProps {
    position: 'first' | 'second' | 'third',
};

const SkillCard: React.FC<MyProps> = (props: MyProps) => {

    const styles = bemCssModules(skillCardStyles);

    const position: { [key: string]: boolean } = {};
    position[props.position] = true;

    // const position: Record<MyProps['position'], boolean> = {};

    // type Position = { first?: boolean, second?: boolean, third?: boolean };
    // const first: boolean = props.position === 'first';
    // const second: boolean = props.position === 'second';
    // const third: boolean = props.position === 'third';
    // const position: Position = { first, second, third };

    // type CardData = { [key: string]: { title: string, icon: JSX.Element, skills: string[] } };
    type CardData = Record<MyProps['position'], { title: string, icon: JSX.Element, skills: string[] }>;

    const cardData: CardData = {
        first: { title: 'frontend', icon: <FrontendIcon className={styles('icon_image', position)} />, skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
        second: { title: 'backend', icon: <BackendIcon className={styles('icon_image', position)} />, skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
        third: { title: 'grafika', icon: <GraphicIcon className={styles('icon_image', position)} />, skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] }
    };

    return (
        <div className={styles()}>
            <div className={styles('front', position)}>
                <h2 className={styles('title', position)}>{cardData[props.position].title}</h2>
            </div>
            <div className={styles('back', position)}>
                <h2 className={styles('title', { ...position, back: true })}>{cardData[props.position].title}</h2>
                <ul className={styles('skills')}>
                    {cardData[props.position].skills.map(skill => <li className={styles('skill')}>{skill}</li>)}
                </ul>
                <div className={styles('icon')}>
                    {cardData[props.position].icon}
                </div>
            </div>
        </div>
    );
};

export default SkillCard;