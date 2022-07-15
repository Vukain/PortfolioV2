import styles from './Skills.module.sass';

import SkillCard from './SkillCard/SkillCard';

import { ReactComponent as FrontendIcon } from '../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../media/icons/tools.svg';

import { ReactComponent as MotionPath } from '../../media/mp.svg';

const Skills: React.FC = (props) => {


    type CardData = Record<'frontend' | 'backend' | 'graphics', { category: string, skills: string[] }>;

    const cardData: CardData = {
        frontend: { category: 'frontend', skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
        backend: { category: 'backend', skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
        graphics: { category: 'graphics', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] }
    };

    return (
        <section className={styles.skills}>
            <SkillCard data={cardData['frontend']}>
                <FrontendIcon className={styles.icon_frontend} title="frontend icon" />
            </SkillCard>
            <SkillCard data={cardData['backend']}>
                <BackendIcon className={styles.icon_backend} title="backend icon" />
            </SkillCard>
            <SkillCard data={cardData['graphics']}>
                <GraphicIcon className={styles.icon_graphics} title="graphics icon" />
            </SkillCard>

            <svg className={styles.path_svg} id="path-svg" width="400" height="400" version="1.1" viewBox="0 0 400 400" preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg">
                <path id="motionPath" d="M.001.5h400v400l-400-1" />
            </svg>

        </section>
    );
}

export default Skills;