import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import styles from './Navigation.module.css';

const navigation = (props) => {
    const toggleMobileNav = (e) => {
        e.preventDefault();
        props.toggleMobileNav();
    }

    const onAuthClickHandler = () => {
        if (props.isAuth) {
            props.authHandler();
        }
    }

    return (
        <div className={styles.mainNav}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>FunWithFlags</Navbar.Brand>

                    <Nav className={styles.navButtons}>
                        <NavLink
                            className={styles.navLink}
                            to="/"
                            exact
                            activeClassName={styles.activeNavLink}
                        >
                            Flagpedia
                        </NavLink>

                        <NavLink
                            className={styles.navLink}
                            to="/quiz"
                            activeClassName={styles.activeNavLink}
                        >
                            Flagquiz
                        </NavLink>

                        {props.isAuth ?
                            <NavLink
                                className={styles.navLink}
                                to="/user-info"
                                activeClassName={styles.activeNavLink}
                            >
                                User Info
                            </NavLink> : null
                        }

                        <NavLink
                            className={styles.navLink}
                            to="/auth"
                            activeClassName={styles.activeNavLink}
                            onClick={() => onAuthClickHandler()}
                        >
                            {props.isAuth ? 'Log Out' : 'Log in'}
                        </NavLink>

                    </Nav>

                    <NavLink
                        className={[styles.navLink, styles.mobileNavBtn].join(' ')}
                        activeClassName={styles.activeNavLink}
                        to=""
                        onClick={(e) => toggleMobileNav(e)}
                    >
                        <FontAwesomeIcon icon={faAlignJustify} size="2x" />
                    </NavLink>

                </Container>
            </Navbar>
        </div>
    )
}

export default navigation;