import React, { Component, Fragment } from 'react';
import axios from './../../axios';
import { idbUpdateDatabase, idbReadData, idbClearDatabase } from './../../helpers/db';

import styles from './Reader.module.css';

import Header from './../../components/Header/Header';
import Story from './../../components/Story/Story';

class Reader extends Component {
    state = {
        stories: [],
        loadedPosts: 0,
        soriesIDs: [],
        isLoading: false,
        postsPerPage: 20,
        error: null
    }

    database = null;

    // Setup IndexedDB for offline usage
    idbSetupDatabase() {
        const request = window.indexedDB.open('storiesDB');

        request.onerror = () => {
            console.log('Error establishing a database connection');
        };
    
        request.onsuccess = (e) => {
            console.log('The database is opened successfully');
            this.database = e.target.result;
        };

        request.onupgradeneeded = (e) => {
            this.database = e.target.result;
    
            if (!this.database.objectStoreNames.contains('storiesIDs')) {
                this.database.createObjectStore('storiesIDs', { autoIncrement: true });
            }

            if (!this.database.objectStoreNames.contains('stories')) {
                this.database.createObjectStore('stories', { keyPath: e.target.result.id });
            }
        };
    }

    componentDidMount() {
        // Attach scroll handler
        window.addEventListener('scroll', this.scrollHandler);

        // Load list of most recent HN stories
        if (navigator.onLine) {
            this.idbSetupDatabase();

            axios.get('newstories.json')
                .then(response => {
                    idbUpdateDatabase('storiesIDs', 'put', 1, response.data, this.database);
                    // TODO: ideally, should not always get rid of the previously fetched stories
                    idbClearDatabase('stories', this.database);

                    this.setState({ storiesIDs: response.data }, () => {
                        // Fetch first chunk of stories immediately
                        this.fetchStories();
                    });
                })
                .catch(error => {
                    this.setState({ error: error.message });
                });

            return;
        }
        
        // Offline behavior
        idbReadData('storiesIDs', 1, 'storiesDB')
            .then(response => {
                this.setState({ storiesIDs: response }, () => {
                    // Fetch first chunk of stories immediately
                    this.fetchStories();
                });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    fetchStories = () => {
        this.setState({ isLoading: true }, () => {
            // Gather ids of posts that should be loaded
            const postsLoaded = this.state.stories.length;
            const { postsPerPage, storiesIDs } = this.state;
            let newPosts;

            if (postsLoaded + postsPerPage <= storiesIDs.length) {
                newPosts = storiesIDs.slice(postsLoaded, postsLoaded + postsPerPage);
            } else {
                newPosts = storiesIDs.slice(postsLoaded);
            }

            // Fetch posts and start inserting them into the DOM one by one
            for (let i = 0; i < newPosts.length; i++) {
                if (navigator.onLine) {
                    axios.get(`item/${newPosts[i]}.json`)
                    .then(response => {
                        let story = response.data;

                        // If no data is returned -> display an error to the user
                        if (!story) {
                            story = {
                                id: newPosts[i],
                                errorMessage: 'Data is Missing'
                            }
                        }

                        this.insertNewStory(story);
                        // TODO: not the most optimal way to fetch stories for offline usage
                        idbUpdateDatabase('stories', 'put', story.id, story, this.database);
                    })
                    .catch(error => {
                        // Display block with an error message on error
                        const story = {
                            id: newPosts[i],
                            errorMessage: error.message
                        }

                        this.insertNewStory(story);
                        idbUpdateDatabase('stories', 'put', story.id, story, this.database);
                    });
                } else {
                    // Offline behavior
                    idbReadData('stories', newPosts[i], 'storiesDB')
                        .then(response => {
                            let story = response;

                            // If no story in database, remove scroll handler
                            if (!story) {
                                window.removeEventListener('scroll', this.scrollHandler);
                                return;
                            }

                            this.insertNewStory(story);
                        })
                        .catch(error => {
                            // Display block with an error message on error
                            const story = {
                                id: newPosts[i],
                                errorMessage: error.message
                            }
    
                            this.insertNewStory(story);
                        });
                }
            }
        });
    }

    // Allow loading new page after the last post has been inserted into the DOM
    checkLastPostLoaded = (loadedPosts, postsPerPage, ) => {
        if (loadedPosts + postsPerPage === this.state.stories.length) {
            this.setState(prevState => {
                return {
                    loadedPosts: prevState.loadedPosts + prevState.postsPerPage,
                    isLoading: false
                };
            })
        }
    }

    // Insert a story into the DOM
    insertNewStory = (newStory) => {
        const { stories, storiesIDs, loadedPosts, postsPerPage } = this.state;
        const existingStories = [...stories];
        const storiesLen = existingStories.length;
        const newStoryPos = storiesIDs.indexOf(newStory.id);

        // Find where to insert loaded story by looping from the end of already loaded posts array
        for (let i = storiesLen - 1; i >= 0; i--) {
            const currentStoryPos = storiesIDs.indexOf(existingStories[i].id);
            if (currentStoryPos < newStoryPos) {
                existingStories.splice(i + 1, 0, newStory);
                this.setState({ stories: existingStories }, () => this.checkLastPostLoaded(loadedPosts, postsPerPage));
                return;
            }
        }

        // If stories array is empty, or the loop has reached the beginning of the array
        existingStories.splice(0, 0, newStory);
        this.setState({ stories: existingStories }, () => this.checkLastPostLoaded(loadedPosts, postsPerPage));
    }

    loadQuantityChangeHandler = (count) => {
        if (this.state.postsPerPage === count) {
            return;
        }

        this.setState({ postsPerPage: count });
    }

    scrollHandler = () => {
        const { isLoading, error, stories, storiesIDs } = this.state;
        if (isLoading || error || stories.length === storiesIDs.length) {
            return;
        }

        // Fetch more stories when reaching 200px from the bottom of the screen
        const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + 
            (document.documentElement && document.documentElement.scrollTop || 0);
        if (window.innerHeight + scrollTop >= document.documentElement.offsetHeight - 200) {
            this.fetchStories();
        }
    }

    render() {
        const renderedStories = this.state.stories.map(story => (
            <Story
                key={story.id}
                empty={story.noData}
                title={story.title}
                author={story.by}
                date={story.time}
                link={story.url}
            />
        ));

        let content = <div className={styles.StoriesContainer}>
            {renderedStories}
        </div>;

        // Display Error Message
        if (this.state.error) {
            content = <div className={styles.Error}>{this.state.error}</div>
        }

        return (
            <Fragment>
                <Header 
                    loadQuantityChanged={this.loadQuantityChangeHandler} 
                    postsCount={this.state.postsPerPage} 
                />
                {content}
            </Fragment>
        );
    }
}

export default Reader;