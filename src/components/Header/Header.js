import React, { useState, useEffect, memo } from 'react';

import styles from './Header.module.css';

import Menu from './../Menu/Menu';

const Header = (props) => {
    const [isMobile, setMobileState] = useState(false);

    useEffect(() => {
        const handleResize = () => setMobileState(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        window.dispatchEvent(new Event('resize'));
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderContainer}>
                {isMobile ? <h1>HN Story List</h1> : <h1>Hacker News Story List</h1>}
                
                <Menu
                    optionSelected={props.loadQuantityChanged}
                    postsCount={props.postsCount}
                />
            </div>
        </header>
    );
};

// Use memo to prevent unnecessary rerenders
export default memo(Header);