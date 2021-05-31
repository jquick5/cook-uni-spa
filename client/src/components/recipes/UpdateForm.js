import React, { useState, useContext, useEffect } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import AlertContext from '../../context/alert/alertContext';
import moment from '../../../node_modules/moment/dist/moment';
import Modal from '../../modules/modals/components/Modal';
import ModalBody from '../../modules/modals/components/ModalBody';

const UpdateForm = (props) => {
  const recipeContext = useContext(RecipeContext);
  const alertContext = useContext(AlertContext);

  let { current, clearCurrent, updateRecipe, recipes } = recipeContext;
  const { setAlert } = alertContext;

  let recipeId = recipes.filter((recipe) => recipe._id === current);
  recipeId = recipeId[0]._id;

  useEffect(() => {
    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        meal: '',
        description: '',
        category: '',
        foodImageURL: '',
        prepMethod: '',
        ingredients: '',
        likesCounter: 0,
        date: moment().format('MMM Do YYYY'),
      });
    }
  }, [recipeContext, current]);

  const [recipe, setRecipe] = useState({
    meal: '',
    description: '',
    category: '',
    foodImageURL: '',
    prepMethod: '',
    ingredients: '',
    likesCounter: 0,
    date: moment().format('MMM Do YYYY'),
  });

  const { meal, description, category, foodImageURL, prepMethod, ingredients } =
    recipe;

  const onChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe, recipeId);
    props.close();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Modal className='container'>
      <ModalBody>
        <form
          style={{
            padding: '100px',
          }}
          className='card bg-dark'
          onSubmit={onSubmit}
        >
          <h2>
            Update Recipe
            <i
              onClick={props.close}
              className='far fa-window-close text-light'
              style={{ float: 'right' }}
            />
          </h2>

          <input
            type='text'
            placeholder='Meal Name...'
            name='meal'
            value={meal}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Meal Description'
            name='description'
            value={description}
            onChange={onChange}
          />
          <select value={category} name='category' onChange={onChange}>
            <option value=''>Select meal category</option>
            <option value='grain'>Grain</option>
            <option value='meat'>Meat</option>
            <option value='fish'>Fish</option>
            <option value='other'>Other</option>
          </select>

          <input
            type='text'
            placeholder='Add Image URL'
            name='foodImageURL'
            value={foodImageURL}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Type your recipe'
            name='prepMethod'
            value={prepMethod}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Add Ingredients'
            name='ingredients'
            value={ingredients}
            onChange={onChange}
          />
          <div>
            <input
              type='submit'
              value={'Update Recipe'}
              className='btn btn-primary btn-block'
            />
          </div>

          <div>
            <button className='btn-light btn-block' onClick={props.close}>
              Cancel
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateForm;
