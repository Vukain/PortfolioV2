import { useRef, useState } from 'react';

import styles from './Projects.module.sass';

import { useLanguageSwitch } from '../../hooks/useLanguageSwitch';
import { useGsapProjectsTriggers } from '../../hooks/useGsapProjectsTriggers';
import { ColorEdge, Menu, Project, SectionName } from '../';
import { projectNames, projects } from '../../store/projectData';

export const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const projectsRef = useRef(null);

  const { languageSwitch } = useLanguageSwitch();

  useGsapProjectsTriggers(projectsRef);

  const mappedProjects = projects.map((data, index) => (
    <Project
      data={data}
      key={index + data.id}
      index={index}
      numberOfProjects={projects.length}
      currentProject={currentProject}
      setCurrentProject={setCurrentProject}
    />
  ));

  return (
    <>
      <ColorEdge direction="up" />
      <section className={styles.projects} ref={projectsRef} id="projects">
        <SectionName lightBackground={true}>{languageSwitch('projects', 'projekty')}</SectionName>

        <div className={styles.gallery} id="gallery">
          {mappedProjects}
        </div>

        <Menu names={projectNames} currentProject={currentProject} />
      </section>
      <ColorEdge direction="down" />
    </>
  );
};
