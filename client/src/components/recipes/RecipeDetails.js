import React, { useContext } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import UpdateForm from './UpdateForm';
import ModalService from '../../modules/modals/services/ModalService';
import Modal from '../../modules/modals/components/Modal';
import ModalBody from '../../modules/modals/components/ModalBody';

const RecipeDetails = (props) => {
  const recipeContext = useContext(RecipeContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    deleteRecipe,
    likeRecipe,
    setCurrent,
    clearCurrent,
    recipes,
    current,
  } = recipeContext;

  const { user: _user } = authContext;
  const { likedRecipes } = _user;

  let recipeView = recipes.filter((recipe) => recipe._id === current);

  const onDelete = () => {
    deleteRecipe(current);
    clearCurrent();
    props.close();
  };

  const handleClick = () => {
    setCurrent(current);
    ModalService.open(UpdateForm);
  };

  //date = moment().format('MMM Do YYYY');

  return (
    <Modal>
      <ModalBody>
        <div className='card bg-light'>
          <h3 className='text-center'>
            {recipeView[0].meal}{' '}
            <i
              style={{ float: 'right' }}
              className='badge fas fa-heart badge-danger btn'
            >
              <span> {recipeView[0].likesCounter}</span>
            </i>
            <i
              onClick={props.close}
              className='far fa-window-close text-dark'
              style={{ float: 'left' }}
            />
          </h3>
          <ul style={{ textAlign: 'bottom' }} className='list'>
            {recipeView[0].foodImageURL && (
              <li>
                <img
                  style={{ objectFit: 'scale-down' }}
                  height='400px'
                  src={recipeView[0].foodImageURL}
                  alt='meal'
                />
              </li>
            )}
            {recipeView[0].ingredients && (
              <li>
                <strong>Ingredients: </strong> {recipeView[0].ingredients}
              </li>
            )}
            {recipeView[0].prepMethod && (
              <li>
                <strong>Recipe: </strong> {recipeView[0].prepMethod}
              </li>
            )}
          </ul>
          <p className='text-center'>
            {/* <button onClick={onView} className='btn btn-success btn-sm'>
              View Recipe
            </button> */}
            <button className='btn btn-primary btn-sm' onClick={handleClick}>
              Update Recipe
            </button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>
              Delete Recipe
            </button>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RecipeDetails;
