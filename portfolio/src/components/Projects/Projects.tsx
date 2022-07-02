import React, { useRef, useEffect, forwardRef } from 'react';

import styles from './Projects.module.sass';

type MyProps = JSX.IntrinsicElements["div"] & { test?: string };

const Projects = forwardRef<HTMLDivElement, MyProps>((props, ref) => {

    return (

        <div className={styles.projects} ref={ref}>
            <div className={styles.project}>{props.test}</div>
            <div className={styles.project}></div>
            <div className={styles.project}></div>
        </div>
    );
})

export default Projects;