import React, { PropTypes as T } from 'react';

import './index.sass';

const SuccesCheck = (props) => {
  const {
  } = props;

  return (
      <svg className="SuccesCheck" xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square"><g stroke="#0DC20D" strokeWidth="3"><g transform="translate(3.000000, 3.000000)"><path d="M0.5 8.5L9.69 17.69M27.29 0.7L9.69 17.69" /></g></g></g></svg>
  );
};

SuccesCheck.propTypes = {
  moduleName: T.string,
};

export default SuccesCheck;
