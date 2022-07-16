import React, { useRef, useEffect, forwardRef } from 'react';

import styles from './Projects.module.sass';

type MyProps = JSX.IntrinsicElements["div"] & { test?: string };

const Projects = forwardRef<HTMLDivElement, MyProps>(({ test }, ref) => {

    return (

        <section className={styles.projects} ref={ref}>
            <article className={styles.project}>Project 1</article>
            <article className={styles.project}>Project 2</article>
            <article className={styles.project}>Project 3</article>
            <article className={styles.project}>Project 4</article>
            <article className={styles.project}>Project 5</article>
        </section>
    );
})

export default Projects;