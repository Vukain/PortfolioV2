import React, { useRef, useEffect, forwardRef } from 'react';

import styles from './Projects.module.sass';

type MyProps = JSX.IntrinsicElements["div"] & { test?: string };

const Projects = forwardRef<HTMLDivElement, MyProps>(({ test }, ref) => {

    return (

        <div className={styles.projects} ref={ref}>
            <div className={styles.project}>Project 1</div>
            <div className={styles.project}>Project 2</div>
            <div className={styles.project}>Project 3</div>
            <div className={styles.project}>Project 4</div>
            <div className={styles.project}>Project 5</div>
        </div>
    );
})

export default Projects;