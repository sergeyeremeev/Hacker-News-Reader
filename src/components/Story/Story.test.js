import React from 'react';
import { shallow } from 'enzyme';
import Story from './Story';

it('renders title with a link', () => {
    const story = shallow(<Story title="Test Title" link="http://test.com" />);
    expect(story.contains(<h2><a href="http://test.com">Test Title</a></h2>)).toEqual(true);
});

it('renders author info', () => {
    const story = shallow(<Story author="Sergey Eremeev" />);
    expect(story.contains(<div>By: <span>Sergey Eremeev</span></div>)).toEqual(true);
});

it('renders post date', () => {
    const story = shallow(<Story date="1557747798" />);

    const dateNow = new Date();
    let storyDate = new Date(1557747798 * 1000);
    let formattedDate = `${storyDate.getDate()}/${(storyDate.getMonth() + 1)}/${storyDate.getFullYear()}`;

    // If the date is today -> display hours:minutes
    if (storyDate.setHours(0, 0, 0, 0) === dateNow.setHours(0, 0, 0, 0)) {
        storyDate = new Date(1557747798 * 1000);

        let hours = storyDate.getHours();
        hours = String(hours).length === 2 ? `${hours}` : `0${hours}`;

        let minutes = storyDate.getMinutes();
        minutes = String(minutes).length === 2 ? `${minutes}` : `0${minutes}`;

        formattedDate = `${hours}:${minutes}`
    }

    expect(story.contains(<div>Posted on: <span>{formattedDate}</span></div>)).toEqual(true);
});

it('has two digits for today posts\'s hours and minutes', () => {
    const dateNow = new Date();
    const story = shallow(<Story date={dateNow} />);

    let storyDate = new Date();
    let formattedDate = `${storyDate.getDate()}/${(storyDate.getMonth() + 1)}/${storyDate.getFullYear()}`;

    // If the date is today -> display hours:minutes
    if (storyDate.setHours(0, 0, 0, 0) === dateNow.setHours(0, 0, 0, 0)) {
        storyDate = new Date(1557747798 * 1000);

        let hours = storyDate.getHours();
        hours = String(hours).length === 2 ? `${hours}` : `0${hours}`;

        let minutes = storyDate.getMinutes();
        minutes = String(minutes).length === 2 ? `${minutes}` : `0${minutes}`;

        formattedDate = `${hours}:${minutes}`
    }

    expect(formattedDate.length).toEqual(5);
});
