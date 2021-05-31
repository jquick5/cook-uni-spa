import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <hr />
      <div style={{ opacity: 0.9 }} className='footer bg-dark'>
        <h3>
          Made with{' '}
          <i style={{ color: 'red' }} className='fas fa-heart text-danger'></i>{' '}
          by CookUni
          <p
            style={{ marginRight: '1rem', fontSize: '12pt' }}
            className='text-right'
          >
            <i className='far fa-copyright'>2021 CookUni</i>
            <br />
            Powered By WebByJay
          </p>
        </h3>
      </div>
    </Fragment>
  );
};

export default Footer;
