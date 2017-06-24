import React from 'react';
import { bm, be } from 'client-core/lib/utils/bliss';
import { compose, pure } from 'recompose';

import './index.sass';

const Input = (props) => {
  const {
    type,
    placeholder,
    disabled,
    showCheckWhenValid,
    readOnly,
    pristine,
    empty,
    active,
    dark,
  } = props;

  return (
  <div
  className={
    bm(
    'Input',
    {
      readOnly,
      pristine,
      empty,
      active,
      dark,
    }
    )
  }
  >
    <label className={be('Input', 'label')} htmlFor={`${name}-id`}>
      <span className={be('Input', 'labelText')}>{placeholder}</span>
      <input
      className={be('Input', 'text')}
      />
    </label>
  </div>
  );
};

export default compose(
pure
)(Input);
