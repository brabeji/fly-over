import React from 'react';
import { bm } from 'client-core/lib/utils/bliss';

import './index.sass';

const LoginButton = (props) => {
  const {
    moduleName = 'LoginButton',
    facebook,
    children,
  } = props;
  return (
  <div className="LoginButton-holder">
    <button
      className={bm(moduleName,
      {
        facebook,
      })}
    >
      <svg className="LoginButton-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="266.89" height="266.9" viewBox="0 0 266.89 266.9" enableBackground="new 0 0 266.893 266.895"><path
  fill="#FFFFFF" className="path1" d="M248.08 262.31c7.85 0 14.22-6.37 14.22-14.22V18.81c0-7.86-6.37-14.22-14.22-14.22H18.81c-7.86 0-14.22 6.37-14.22 14.22v229.27c0 7.86 6.37 14.23 14.22 14.23H248.08z"/><path
  fill="#3C5A99" className="path2"  d="M182.41 262.31v-99.8h33.5l5.02-38.9h-38.51V98.78c0-11.26 3.13-18.93 19.27-18.93l20.6-0.01V45.05c-3.56-0.47-15.79-1.53-30.01-1.53 -29.69 0-50.02 18.13-50.02 51.41v28.68h-33.58v38.9h33.59v99.8H182.41z"/></svg>
      {children}
    </button>
  </div>
  );
};

export default LoginButton;
