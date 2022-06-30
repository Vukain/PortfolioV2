import React, { useRef, useEffect, forwardRef } from 'react';
import bemCssModules from 'bem-css-modules';

import projectsStyles from './Projects.module.sass';

type MyProps = JSX.IntrinsicElements["div"] & { test?: string };

const Projects = forwardRef<HTMLDivElement, MyProps>((props, ref) => {

    const style = bemCssModules(projectsStyles);

    return (

        <div className={style()} ref={ref}>
            <div className={style('project', { first: true })}>{props.test}</div>
            <div className={style('project')}></div>
            <div className={style('project')}></div>
        </div>
    );
})

export default Projects;