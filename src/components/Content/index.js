import React from 'react';
import { bm, be } from 'client-core/lib/utils/bliss';
import './index.sass';

const Content = (props) => {
  const {
    moduleName = 'Content',
    children,
  } = props;

  return (
  <div className={bm(moduleName)}>
    <div className={be(moduleName, 'inner')}>
      {children}
    </div>
  </div>
  );
};

export default Content;
