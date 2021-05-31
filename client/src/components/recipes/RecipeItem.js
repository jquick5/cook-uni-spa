import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import RecipeDetails from './RecipeDetails';
import ModalService from '../../modules/modals/services/ModalService';
import AlertContext from '../../context/alert/alertContext';
import axios from 'axios';

const RecipeItem = ({ recipe }) => {
  const recipeContext = useContext(RecipeContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { likeRecipe, setCurrent, viewCurrent, setUserLiked } = recipeContext;

  const { user: _user } = authContext;
  const { _id: userId, _firstName, lastName, likedRecipes } = _user;

  let mealNames = [];

  let {
    _id,
    user,
    meal,
    description,
    category,
    foodImageURL,
    likesCounter,
    date,
  } = recipe;

  const onLike = () => {
    recipe.likesCounter++;
    if (!likedRecipes.includes(recipe.meal)) {
      mealNames.push(recipe.meal);
      likedRecipes.push(...mealNames);
      likeRecipe(recipe);
      setUserLiked(userId, _user);
      setAlert('You Loved this recipe', 'success');
    } else {
      setAlert('You already Loved this recipe', 'danger');
      return;
    }

    // let filteredMeals = mealNames.filter((rN, index) => {
    //   if (mealNames.length > 0) {
    //     return mealNames.indexOf(rN) !== index;
    //   }
    //   return mealNames;
    // });
  };

  const onView = () => {
    setCurrent(_id);
    viewCurrent(recipe);
    ModalService.open(RecipeDetails);
  };

  //date = moment().format('MMM Do YYYY');

  return (
    <div className='card bg-light'>
      <h3 className='text-left'>
        {meal}{' '}
        <i
          style={{ float: 'right' }}
          className='badge fas fa-heart badge-danger btn'
          onClick={onLike}
        >
          <span> {likesCounter}</span>
        </i>
      </h3>
      <ul style={{ textAlign: 'bottom' }} className='list'>
        {foodImageURL && (
          <li>
            <img
              style={{ objectFit: 'scale-down', maxHeight: '300px' }}
              src={foodImageURL}
              alt={meal}
            />
          </li>
        )}
        {description && <li>{description}</li>}
        {category && <li>{category}</li>}

        {date && (
          <li>
            Added with{' '}
            <i
              style={{ color: 'red' }}
              className='fas fa-heart'
              onClick={onLike}
            ></i>{' '}
            on {date}
          </li>
        )}
      </ul>
      <p className='text-center'>
        <button onClick={onView} className='btn btn-success btn-sm'>
          View Recipe
        </button>
        {/* <button
          className='btn btn-primary btn-sm'
          onClick={() => setCurrent(recipe)}
        >
          Update Recipe
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete Recipe
        </button> */}
      </p>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
