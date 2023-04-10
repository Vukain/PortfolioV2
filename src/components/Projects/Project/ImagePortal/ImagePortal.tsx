import { useRef } from 'react';
import { clsx } from 'clsx';

import styles from './ImagePortal.module.sass';

import { ReactComponent as GithubIcon } from '../../../../images/icons/github-project.svg';
import { ReactComponent as LinkIcon } from '../../../../images/icons/link.svg';
import { useGsapImagePortalTriggers } from '../../../../hooks/useGsapImagePortalTriggers';

type Props = {
    images: {
        logoImage: { small: string, normal: string },
        desktopImages?: Array<{ small: string, medium: string, big: string, full: string }>,
        mobileImages?: string[],
        codeImages?: Array<{ small: string, medium: string, big: string, full: string }>,
    },
    links: {
        github: string,
        live: string
    },
    isActive: boolean;
};

export const ImagePortal: React.FC<Props> = ({ images: { logoImage, desktopImages, mobileImages, codeImages }, links: { github, live }, isActive }) => {

    const portalRef = useRef(null);

    useGsapImagePortalTriggers(portalRef, isActive, { desktopImages: Boolean(desktopImages), mobileImages: Boolean(mobileImages), codeImages: Boolean(codeImages) });

    const codeScreenshots = codeImages?.map((image, index) => (
        <img className={styles.screenshot_code} key={index + 'code'}
            srcSet={`${image.full} 600w, ${image.full} 800w, ${image.full} 1000w, ${image.full} 1100w`}
            sizes={'(orientation: portrait) 70vw, 40vw'}
            src={image.full} alt={`project code screenshot ${index + 1}`}
        />
    ));

    const desktopScreenshots = desktopImages?.map((image, index) => (
        <img className={styles.screenshot_desktop} key={index + 'desktop'}
            srcSet={`${image.small} 800w, ${image.medium} 1200w, ${image.big} 1600w, ${image.full} 1900w`}
            sizes={'(orientation: portrait) 60vw, 35vw'}
            src={image.full} alt={`project desktop screenshot ${index + 1}`}
        />
    ));

    const mobileScreenshots = mobileImages?.map((image, index) => (
        <img className={styles.screenshot_mobile} key={index + 'mobile'} src={image} alt={`project mobile screenshot ${index + 1}`} />
    ));

    const screenshots = [codeScreenshots, desktopScreenshots, mobileScreenshots].filter(element => element).map((element, index) =>
        <div key={index + 'screenshots'} className={styles.wrapper_screenshots}>
            {element}
        </div>)

    return (
        <div className={styles.image_portal} ref={portalRef}>

            <div className={styles.wrapper}>
                <div className={styles.wrapper_logos}>
                    <img className={styles.logo}
                        srcSet={`${logoImage.small} 800w, ${logoImage.normal} 1200w`}
                        sizes={'(orientation: portrait) 70vw, 45vw'}
                        src={logoImage.normal} alt='project logo' loading="lazy" />
                </div>
                {screenshots}
            </div>

            <a href={live} className={styles.hyperlink} target="_blank" rel="noopener noreferrer" aria-label='project live version' tabIndex={isActive ? 0 : -1}>
                <div className={clsx(styles.link, styles['link--left'])} data-text='live'>
                    <LinkIcon className={styles.icon} />
                </div>
            </a>

            <a href={github} className={styles.hyperlink} target="_blank" rel="noopener noreferrer" aria-label='project github link' tabIndex={isActive ? 0 : -1}>
                <div className={clsx(styles.link, styles['link--right'])} data-text='github'>
                    <GithubIcon className={styles.icon} />
                </div>
            </a>

        </div>
    );
};