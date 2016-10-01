import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Flipper.css';

const Flipper = ({
    children,
    className,
    isFlipped,
}) =>
    <div className={classNames('Flipper', className, { 'is-flipped': isFlipped })}>
        <div className="Flipper--content">
            {children}
        </div>
    </div>;

Flipper.propTypes = {
    className: PropTypes.string,
    isFlipped: PropTypes.bool.isRequired,
}

export default Flipper;
