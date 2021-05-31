import React, { useReducer } from 'react';
import RecipeContext from './recipeContext';

import recipeReducer from './recipeReducer';
import axios from 'axios';
import {
  GET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  CLEAR_RECIPES,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  FILTER_RECIPES,
  LIKE_RECIPE,
  SET_USER_LIKED,
  VIEW_CURRENT,
} from '../types';

const RecipeState = (props) => {
  const initialState = {
    recipes: null,
    current: null,
    filtered: null,
    liked: [],
    error: null,
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  //Get all Recipes
  const getRecipes = async () => {
    try {
      const res = await axios.get('api/recipes');
      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //Add Recipe
  const addRecipe = async (recipe) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/recipes', recipe, config);
      dispatch({
        type: ADD_RECIPE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //Delete Recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`api/recipes/${id}`);
      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //Clear Recipes
  const clearRecipes = () => {
    dispatch({ type: CLEAR_RECIPES });
  };

  //Update Recipe
  const updateRecipe = async (recipe, id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`api/recipes/${id}`, recipe, config);
      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Like Recipe
  const likeRecipe = async (recipe) => {
    const res = await axios.put(`api/recipes/${recipe._id}`, recipe);
    dispatch({ type: LIKE_RECIPE, payload: res.data });
  };

  //Set User Liked Recipes
  const setUserLiked = async (user, likedRecipes) => {
    const config = {
      headers: {
        //'x-auth-token': 'token',
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`api/users/${user}`, likedRecipes, config);

      dispatch({
        type: SET_USER_LIKED,
        payload: likedRecipes,
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Set Current Recipe
  const setCurrent = (recipe) => {
    dispatch({ type: SET_CURRENT, payload: recipe });
  };

  //viewCurrent
  const viewCurrent = async (id) => {
    const res = await axios.get(`api/recipes/?_id=${id}`);

    dispatch({ type: VIEW_CURRENT, payload: res.data });
  };

  // Clear Current Recipe
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter Recipes
  const filterRecipes = (text) => {
    dispatch({ type: FILTER_RECIPES, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        liked: state.liked,
        addRecipe,
        deleteRecipe,
        likeRecipe,
        setCurrent,
        clearCurrent,
        updateRecipe,
        filterRecipes,
        clearFilter,
        getRecipes,
        clearRecipes,
        setUserLiked,
        viewCurrent,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
