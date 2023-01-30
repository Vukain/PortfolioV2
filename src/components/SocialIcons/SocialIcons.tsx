import { clsx } from 'clsx';

import styles from './SocialIcons.module.sass';

import { ReactComponent as FacebookIcon } from '../../media/icons/facebook-with-circle.svg';
import { ReactComponent as GithubIcon } from '../../media/icons/github-with-circle.svg';
import { ReactComponent as LinkedIcon } from '../../media/icons/linkedin-with-circle.svg';

type MyProps = {
    hero?: boolean
};

export const SocialIcons: React.FC<MyProps> = ({ hero }) => {

    return (
        <div className={clsx(styles.icons, hero && styles[`icons--hero`])}>

            <a href='https://github.com/Vukain' className={styles.link} target='_blank' rel='noopener noreferrer' aria-label='github profile link' >
                <div className={clsx(styles.wrapper, hero && styles[`wrapper--hero`])} data-text='live'>
                    <GithubIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </div>
            </a>

            <a href='https://www.linkedin.com/in/michał-piechowiak-a6419124a/' className={styles.link} target='_blank' rel='noopener noreferrer' aria-label='linkedin profile link'>
                <div className={clsx(styles.wrapper, hero && styles[`wrapper--hero`])} data-text='live'>
                    <LinkedIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </div>
            </a>

            <a href='https://www.facebook.com/ochjejku' className={styles.link} target='_blank' rel='noopener noreferrer' aria-label='facebook profile link'>
                <div className={clsx(styles.wrapper, hero && styles[`wrapper--hero`])} data-text='live'>
                    <FacebookIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </div>
            </a>

        </div>
    );
};