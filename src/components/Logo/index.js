/**
 * Created by vAhy_The on 23.06.17.
 */
import React, { PropTypes as T } from 'react';

import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const Logo = (props) => {
  const {
    moduleName = 'Logo',
  } = props;

  return (
  <h1 className="Logo">FlyOver</h1>
  );
};

Logo.propTypes = {
  moduleName: T.string,
};

export default Logo;
