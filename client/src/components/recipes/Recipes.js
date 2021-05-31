import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

import RecipeItem from './RecipeItem';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';

const Recipe = () => {
  const recipeContext = useContext(RecipeContext);
  const authContext = useContext(AuthContext);

  const { recipes, filtered, getRecipes, loading } = recipeContext;

  useEffect(() => {
    authContext.loadUser();
    getRecipes();

    return function cleanup() {
      getRecipes();
    };

    //eslint-disable-next-line
  }, []);

  if (recipes !== null && recipes.length === 0 && !loading) {
    return (
      <Fragment>
        <h4 className='text-light large'>We currently have no recipes.</h4>{' '}
        <h2 className='text-light'>Please add a recipe...</h2>{' '}
        <img
          className='card bg-dark opacity'
          src='https://media.istockphoto.com/photos/begging-picture-id173619319?k=6&m=173619319&s=612x612&w=0&h=uVYY2_PIUaTBO-JnOEuV6HHDoW1IB7AgOgJcgzzgIu0='
          alt='Waiting for Recipes'
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        {recipes !== null && !loading ? (
          <TransitionGroup className='grid-2'>
            {filtered != null
              ? filtered.map((recipe) => (
                  <CSSTransition
                    key={recipe._id}
                    timeout={500}
                    classNames='item'
                  >
                    <RecipeItem recipe={recipe} />
                  </CSSTransition>
                ))
              : recipes.map((recipe) => (
                  <CSSTransition
                    key={recipe._id}
                    timeout={500}
                    classNames='item'
                  >
                    <RecipeItem recipe={recipe} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

export default Recipe;
