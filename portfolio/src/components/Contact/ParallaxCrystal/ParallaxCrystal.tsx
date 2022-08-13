import styles from './ParallaxCrystal.module.sass';

type MyProps = {
    cursorXPosition: number,
    cursorYPosition: number,
    speed: number,
    index: number,
    children: React.ReactNode,
};

const ParallaxCrystal: React.FC<MyProps> = ({ speed, cursorXPosition, cursorYPosition, index }, children) => {

    const Image = children;

    return (
        <div key={index} className={styles.crystal_wrapper} style={{ transform: `translate(${speed * (window.innerWidth - cursorXPosition) / 100}px, ${speed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
            <Image className={styles.floating_crystal} />
        </div>

    );
}

export default ParallaxCrystal;