/**
 * Created by vAhy_The on 23.06.17.
 */
import React, { PropTypes as T } from 'react';
import obrazek from "./img/dummy.jpg"

import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const UserPin = (props) => {
  const {
    moduleName = 'UserPin',
  } = props;

  return (
    <div className="UserPin">
      <div className="UserPin-pulse" />
      <div className="UserPin-range">23.7. ~ 30.12.</div>
      <img className="UserPin-img" src={obrazek} />
    </div>
  );
};

UserPin.propTypes = {
  moduleName: T.string,
};

export default UserPin;
