import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';

import styles from './Project.module.sass';

type myProps = {
    data: Record<string, {
        title: string,
        description: string,
        image?: React.FC<{ className?: string, title?: string }>,
    }>
};

export const Project: React.FC<myProps> = ({ data }) => {

    const { language } = useContext(AppContext);

    const { title, description, image } = data[language];

    return (
        <article className={styles.project}>{title}</article>
    );
};