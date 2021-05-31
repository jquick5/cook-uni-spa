import React, { useContext, useRef, useEffect } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';

const RecipeFilter = () => {
  const recipeContext = useContext(RecipeContext);
  const text = useRef('');
  const { filterRecipes, clearFilter, filtered } = recipeContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterRecipes(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        className='bg-dark text-light'
        style={{ borderRadius: '10px', border: 'none' }}
        ref={text}
        type='text'
        placeholder='Filter Recipes...'
        onChange={onChange}
      />
    </form>
  );
};

export default RecipeFilter;
