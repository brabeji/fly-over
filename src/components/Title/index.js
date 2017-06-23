import React from 'react';
import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const Title = (props) => {
  const {
    moduleName = 'Title',
    welcome,
    children,
  } = props;
  return (
  <h2
  className={bm(moduleName,
  {
    welcome,
  })}
  >
    {children}
  </h2>
  );
};

export default Title;
