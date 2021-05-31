import React, { Fragment } from 'react';
import Login from '../auth/Login';
import { Link } from 'react-router-dom';
import Slider from '../slider/Slider';

const Landing = () => {
  return (
    <Fragment>
      <div style={{ zIndex: 100 }}>
        <div className='text-light'>
          <hr />
          <h1 className='text-center'>Cooking University</h1>
          <p className='x-large'>
            "They say food passes through the stomach...
          </p>
          <p style={{ marginLeft: '100px' }} className='x-large'>
            {' '}
            We say it passes through CookUni!"
          </p>
        </div>
        <div style={{ marginBottom: 0 }}>
          <Login />
        </div>
        <div>
          <h3 style={{ marginBottom: '20px' }} className='text-light'>
            Don't have an account? Register{' '}
            <Link
              className='text-light'
              style={{ textDecorationThickness: 'strong' }}
              to='/register'
            >
              Here
            </Link>
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
