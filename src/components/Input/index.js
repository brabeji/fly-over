import React from 'react';
import { bm, be } from 'client-core/lib/utils/bliss';
import { compose, pure } from 'recompose';

import './index.sass';

const Input = (props) => {
  const {
    input: {
      value,
      name,
      ...input
    },
    type,
    placeholder,
    readOnly,
    meta: {
      pristine,
      active,
      valid,
      error,
      submitFailed,
    },
    disabled,
    showCheckWhenValid,
    dark,
  } = props;

  const empty = !value;
  const finalError = error && submitFailed;

  return (
  <div
  className={
    bm(
    'Input',
    {
      readOnly,
      error: finalError,
      pristine,
      empty,
      active,
      filled: !!value,
      hasCheck: valid && showCheckWhenValid,
      dark,
    }
    )
  }
  >
    <label className={be('Input', 'label')} htmlFor={`${name}-id`}>
      <span className={be('Input', 'labelText')}>{placeholder}</span>
      <input
      {...input}
      value={value}
      name={name}
      type={type}
      className={be('Input', 'text')}
      readOnly={readOnly}
      disabled={disabled}
      id={`${name}-id`}
      />
    </label>
  </div>
  );
};

export default compose(
pure
)(Input);
