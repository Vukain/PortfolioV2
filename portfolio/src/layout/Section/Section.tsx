import { forwardRef } from 'react';

import styles from './Section.module.sass';

type MyProps = {
    children: JSX.Element[],
    id: string
};

const SectionNames = forwardRef<HTMLDivElement, MyProps>(({ id, children }, ref) => {

    return (
        <section className={styles.section} ref={ref} id={id}>
            {children}
        </section>
    );

})

export default SectionNames;