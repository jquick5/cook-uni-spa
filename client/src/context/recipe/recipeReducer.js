import {
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  FILTER_RECIPES,
  LIKE_RECIPE,
  RECIPE_ERROR,
  GET_RECIPES,
  CLEAR_RECIPES,
  SET_USER_LIKED,
  VIEW_CURRENT,
} from '../types';

const exp = (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
        loading: false,
      };
    case LIKE_RECIPE:
      return {
        ...state,
        liked: [action.payload, ...state.liked],
        loading: false,
      };
    case SET_USER_LIKED:
      return {
        ...state,
        likedRecipes: [action.payload, ...state.liked],
        loading: false,
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe,
        ),
        loading: false,
      };
    case VIEW_CURRENT:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload,
        ),
        loading: false,
      };
    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: null,
        filtered: null,
        liked: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        liked: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_RECIPES:
      return {
        ...state,
        filtered: state.recipes.filter((recipe) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return recipe.meal.match(regex) || recipe.category.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default exp;
