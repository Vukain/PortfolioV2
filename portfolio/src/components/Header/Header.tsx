import bemCssModules from 'bem-css-modules';

import headerStyles from './Header.module.sass';

const Header: React.FC = (props) => {

    const style = bemCssModules(headerStyles);

    return (
        <div className={style()}>
            Hello
        </div>
    );
}

export default Header;