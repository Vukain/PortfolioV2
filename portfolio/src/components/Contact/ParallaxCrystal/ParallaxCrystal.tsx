import { JsxElement } from 'typescript';
import styles from './ParallaxCrystal.module.sass';

type MyProps = {
    cursorXPosition: number,
    cursorYPosition: number,
    speed: number,
    Image: React.ReactNode,
};

const ParallaxCrystal: React.FC<MyProps> = ({ speed, cursorXPosition, cursorYPosition, Image }) => {

    return (
        <div className={styles.footer} style={{ transform: `translate(${speed * (window.innerWidth - cursorXPosition) / 100}px, ${speed * (window.innerHeight - cursorYPosition) / 100}px)` }}>
            {/* <Image /> */}
        </div>
    );
}

export default ParallaxCrystal;