import bemCssModules from 'bem-css-modules';

import skillsStyles from './Skills.module.sass';

import SkillCard from './SkillCard/SkillCard';

import { ReactComponent as FrontendIcon } from '../../media/icons/adjustments.svg';
import { ReactComponent as BackendIcon } from '../../media/icons/tools-2.svg';
import { ReactComponent as GraphicIcon } from '../../media/icons/tools.svg';

const Skills: React.FC = (props) => {

    const style = bemCssModules(skillsStyles);

    type CardData = Record<'frontend' | 'backend' | 'grafika', { title: string, skills: string[] }>;

    const cardData: CardData = {
        frontend: { title: 'frontend', skills: ['html', 'css', 'sass', 'bootstrap', 'javascript', 'typescript', 'react', 'redux'] },
        backend: { title: 'backend', skills: ['node.js', 'next.js', 'python', 'django', 'mongodb', 'sqlite'] },
        grafika: { title: 'grafika', skills: ['adobe photoshop', 'adobe illustrator', 'adobe xd', 'autocad'] }
    };

    return (
        <section className={style()}>
            <SkillCard data={cardData['frontend']}>
                <FrontendIcon className={style("icon", { frontend: true })} title="frontend icon" />
            </SkillCard>
            <SkillCard data={cardData['backend']}>
                <BackendIcon className={style("icon", { backend: true })} title="backend icon" />
            </SkillCard>
            <SkillCard data={cardData['grafika']}>
                <GraphicIcon className={style("icon", { grafika: true })} title="graphics icon" />
            </SkillCard>
        </section>
    );
}

export default Skills;