# Hacker News Story List

## Description
This app loads most recent Hacker News stories and displays them as soon as possible to the user. Infinite scroll ensures the best loading experience for the user and the top menu allows users to control how many stories should be loaded each time. Every loaded story gets saved into the indexedDB so that the user is able to browse through stories that have been already loaded even if there is no internet connection.

## Features
1) Infinite scroll with on demand stories loading;
2) Ability to control how many posts are loaded each time;
3) Offline browsing capabilities;
4) Fully responsive for best mobile experience;
5) Contains unit test following the best development practices;
6) This app uses both stateless and stateful components, hooks, lifecycle methods, conditional rendering and many other cool features;

## Improvements to be made
1) Better test coverage;
2) More optimized implementation of populating indexedDB with stories for offline browsing;

## How to run
1) git clone this repo;
2) npm install;
3) npm start;
4) open [http://localhost:3000](http://localhost:3000) in your browser if this didn't happen automatically;

## Live version
Visit [https://hn-reader-13.firebaseapp.com/](https://hn-reader-13.firebaseapp.com/) to view the live version of the app.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
