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

            <div className={clsx(styles.link, hero && styles[`link--hero`])} data-text='live'>
                <a href='https://github.com/Vukain' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <GithubIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </a>
            </div>

            <div className={clsx(styles.link, hero && styles[`link--hero`])} data-text='live'>
                <a href='https://www.linkedin.com/in/michał-piechowiak-a6419124a/' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <LinkedIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </a>
            </div>

            <div className={clsx(styles.link, hero && styles[`link--hero`])} data-text='live'>
                <a href='https://www.facebook.com/ochjejku' target='_blank' rel='noopener noreferrer' aria-label=''>
                    <FacebookIcon className={clsx(styles.icon, hero && styles[`icon--hero`])} />
                </a>
            </div>

        </div>
    );
};