import React, { PropTypes as T } from 'react';

import './index.sass';
import Input from '/components/Input';

const FormDummy = (props) => {
  const {
  } = props;

  return (
    <div className="FormDummy">
      <Input empty placeholder="City"></Input>
      <Input empty placeholder="Date"></Input>
      <Input empty placeholder="From"></Input>
      <Input empty placeholder="Price per night"></Input>
      <Input empty placeholder="Message"></Input>
    </div>
    );
};

FormDummy.propTypes = {
  moduleName: T.string,
};

export default FormDummy;
