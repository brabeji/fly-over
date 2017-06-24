/**
 * Created by vAhy_The on 23.06.17.
 */
import React, { PropTypes as T } from 'react';

import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const PhotoButton = (props) => {
  const {
    moduleName = 'PhotoButton',
  } = props;

  return (
  <button className="PhotoButton">
    +
  </button>
  );
};

Logo.propTypes = {
  moduleName: T.string,
};

export default PhotoButton;
