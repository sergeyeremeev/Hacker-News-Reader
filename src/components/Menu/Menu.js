import React, { useState, useEffect } from 'react';

import styles from './Menu.module.css';

const Menu = (props) => {
    const [isMobile, setMobileState] = useState(false);

    useEffect(() => {
        const handleResize = () => setMobileState(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        window.dispatchEvent(new Event('resize'));
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const optionClickHandler = (e) => {
        const numPostsToLoad = Number(e.currentTarget.innerText);
        props.optionSelected(numPostsToLoad);
    }

    // Create 3 menu buttons to control amount of loaded posts
    const menuButtons = [10, 20, 30].map(el => {
        let classes = [styles.MenuButton];

        if (props.postsCount === el) {
            classes = [styles.MenuButton, styles.Active];
        }

        return (
            <button
                key={el}
                onClick={optionClickHandler}
                className={classes.join(' ')}
            >
                {el}
            </button>
        );
    });

    return (
        <div className={styles.Menu}>
            <span>{isMobile ? 'PPP:' : 'Posts per page:'}</span>
            {menuButtons}
        </div>
    );
}

export default Menu;