/**
 * Created by vAhy_The on 23.06.17.
 */
import React, { PropTypes as T } from 'react';

import './index.scss';

const Planet = (props) => {
  const {
    moduleName = 'Planet',
  } = props;

  return (
    <div className="Planet">
      <div className="earth">
        <div className="earth--shadow"></div>
      </div>
      <div className="stars"></div>
    </div>
  );
};

Planet.propTypes = {
  moduleName: T.string,
};

export default Planet;
