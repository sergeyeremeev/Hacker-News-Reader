import React from 'react';
import { shallow, mount } from 'enzyme';
import Menu from './Menu';
import styles from './Menu.module.css';

it('renders three buttons', () => {
    const menu = shallow(<Menu />);
    expect(menu.find(`.${styles.MenuButton}`).length).toEqual(3);
});
