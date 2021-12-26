import { NavLink } from 'react-router-dom';
import styles from './mobileNavigation.module.css';

const mobileNavigation = props => {
    const onClickHandler = (isLogout) => {
        props.toggleMobileNav();
        if (isLogout) props.authHandler();
    }

    let mobileNav = (
        <div className={styles.mobileNav}>
            <h3>FunWithFlags</h3>
            {
                ["/", "/quiz", "/user-info","/auth"].map((pathname, index) => {
                    let navName = 'Flagpedia';
                    switch (pathname) {
                        case "/quiz": {
                            navName = 'Flagquiz'
                            break;
                        }
                        case "/user-info": {
                            navName = 'User Info'
                            break;
                        }
                        case "/auth": {
                            navName = props.isAuth ? 'Log Out' : 'Log in'
                            break;
                        }
                        default:
                            break;
                    }
                    if (pathname === "/user-info" && !props.isAuth) return null;
                    return (
                        <NavLink
                            to={pathname}
                            exact
                            activeClassName={styles.activeNavBtn}
                            key={index}
                            onClick={() => onClickHandler(props.isAuth && pathname === "/auth")}
                        >
                            <div className={styles.navBtn}>
                                {navName}
                            </div>
                        </NavLink>
                    )
                })
            }
        </div>
    )

    return props.show ? mobileNav : null;

}

export default mobileNavigation;

