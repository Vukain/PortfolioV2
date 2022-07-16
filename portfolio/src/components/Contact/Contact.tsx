import styles from './Contact.module.sass';

import { ReactComponent as Crystal } from '../../media/phold_crystal.svg';

const Contact: React.FC = () => {
    return (
        <section className={styles.contact}>
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <Crystal className={styles.floating_crystal} />
            <div className={styles.form_card}></div>
        </section>
    );
}

export default Contact;