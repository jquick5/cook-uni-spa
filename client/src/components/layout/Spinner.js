import React, { Fragment } from 'react';
import loading from '../../images/loading.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img src={loading} alt='loading' />
    </Fragment>
  );
};

export default Spinner;
