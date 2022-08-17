import styles from './ParallaxCrystal.module.sass';

type MyProps = {
    cursorXPosition: number,
    cursorYPosition: number,
    data: {
        speed: number,
        crystalImage: React.FC<{ className?: string }>
    };
};

export const ParallaxCrystal: React.FC<MyProps> = ({ data: { speed, crystalImage }, cursorXPosition, cursorYPosition }) => {

    const Image = crystalImage;

    return (
        <div className={styles.crystal_wrapper} style={{ transform: `translate(${speed * (window.innerWidth - cursorXPosition) / 100}px, ${speed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
            <Image className={styles.floating_crystal} />
        </div>
    );
};