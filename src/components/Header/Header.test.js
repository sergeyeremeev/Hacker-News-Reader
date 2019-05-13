import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Header from './Header';
import Menu from './../Menu/Menu';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders title', () => {
    const header = shallow(<Header />);
    const title = <h1>Hacker News Story List</h1>;
    expect(header.contains(title)).toEqual(true);
});

it('renders menu', () => {
    const header = shallow(<Header />);
    expect(header.contains(<Menu />)).toEqual(true);
});
