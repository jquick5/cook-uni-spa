import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import RecipeContext from '../../context/recipe/recipeContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearRecipes } = recipeContext;

  const onLogout = () => {
    logout();
    clearRecipes();
  };

  const authLinks = (
    <Fragment>
      <li>
        Hello {user && user.firstName} {user && user.lastName}
      </li>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Don't have an account? Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-dark'>
      <h1 className='opacity'>
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'CookUni',
  icon: 'fas fa-utensils m-1',
};

export default Navbar;
