import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
})

//thunk (function that returns a function)
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(()=>{
        dispatch(addDishes(DISHES))
    }, 2000);
}
