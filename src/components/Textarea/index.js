/**
 * Created by vAhy_The on 23.06.17.
 */
import React, { PropTypes as T } from 'react';

import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const Textarea = (props) => {
  const {
    moduleName = 'Textarea',
  } = props;

  return (
  <textarea>
    Hi come to my place
  </textarea>
  );
};

Logo.propTypes = {
  moduleName: T.string,
};

export default Logo;
