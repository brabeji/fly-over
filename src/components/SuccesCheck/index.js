import React, { PropTypes as T } from 'react';

import './index.sass';

const SuccesCheck = (props) => {
  const {
  } = props;

  return (
    <div className="SuccesCheck" />
    );
};

SuccesCheck.propTypes = {
  moduleName: T.string,
};

export default SuccesCheck;
