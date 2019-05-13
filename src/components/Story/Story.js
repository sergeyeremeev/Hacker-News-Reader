import React from 'react';

import styles from './Story.module.css';

const story = (props) => {
    // If there is a problem -> display error message
    if (props.errorMessage) {
        return (
            <div className={styles.Story}>
                <h2 className={styles.Empty}>{props.errorMessage}</h2>
            </div>
        );
    }

    const { date, title, link, author } = props;

    // Format date
    const dateNow = new Date();
    let storyDate = new Date(date * 1000);
    let formattedDate = `${storyDate.getDate()}/${(storyDate.getMonth() + 1)}/${storyDate.getFullYear()}`;

    // If the date is today -> display hours:minutes
    if (storyDate.setHours(0, 0, 0, 0) === dateNow.setHours(0, 0, 0, 0)) {
        storyDate = new Date(date * 1000);

        let hours = storyDate.getHours();
        hours = String(hours).length === 2 ? `${hours}` : `0${hours}`;

        let minutes = storyDate.getMinutes();
        minutes = String(minutes).length === 2 ? `${minutes}` : `0${minutes}`;

        formattedDate = `${hours}:${minutes}`
    }

    // Format title
    let storyTitle = <h2>{title}</h2>;
    if (link) {
        storyTitle = <h2><a href={link}>{title}</a></h2>;
    }

    return (
        <div className={styles.Story}>
            {storyTitle}
            <div className={styles.StoryMeta}>
                <div>By: <span>{author}</span></div>
                <div>Posted on: <span>{formattedDate}</span></div>
            </div>
        </div>
    );
}

export default story;