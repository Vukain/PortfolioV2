import bemCssModules from 'bem-css-modules';

import skillsStyles from './Skills.module.sass';

import SkillCard from './SkillCard/SkillCard';

const Skills: React.FC = (props) => {

    const style = bemCssModules(skillsStyles);

    return (
        <section className={style()}>
            <SkillCard position='first' ></SkillCard>
            <SkillCard position='second' ></SkillCard>
            <SkillCard position='third' ></SkillCard>
        </section>
    );
}

export default Skills;