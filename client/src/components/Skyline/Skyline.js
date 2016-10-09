import React from 'react';
import classNames from 'classnames';
import skyline from './skyline.png';
import './Skyline.css';

const Skyline = ({ children, className }) =>
    <div className={classNames('Skyline', className)} style={{ backgroundImage: `url(${skyline})` }}>
        {children}
    </div>;

export default Skyline;
