import React, { useContext, useEffect } from 'react';
import Recipes from '../recipes/Recipes';
import RecipeForm from '../recipes/RecipeForm';
import RecipeFilter from '../recipes/RecipeFilter';
import AuthContext from '../../context/auth/authContext';
import ModalService from '../../modules/modals/services/ModalService';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const addModal = () => {
    ModalService.open(RecipeForm);
  };

  let choices = document.querySelectorAll('#radio');

  const showChoiceValue = () => {
    let result;
    choices.forEach((choice) => {
      if (choice.checked) {
        result = choice.value;
      }
    });
    console.log(result);
    return result;
  };

  document.addEventListener('click', showChoiceValue);

  return (
    <div>
      <button
        className='btn btn-dark'
        style={{ opacity: 0.9, borderRadius: '10px', marginBottom: '10px' }}
        onClick={addModal}
      >
        Add A Recipe
      </button>
      <div>
        <RecipeFilter />
      </div>
      <div>
        <Recipes />
      </div>
    </div>
  );
};

export default Home;
