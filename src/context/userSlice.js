import { createSlice } from '@reduxjs/toolkit';
import { initialStates } from './initalStates';
import { showMessage } from 'react-native-flash-message';
import { SliderComponent } from 'react-native';

export const userSlicer = createSlice({
  name: 'userSlice',
  initialState: initialStates,
  reducers: {
    loginAccount: (state, action) => {
      const { user } = action.payload;
      state.isLogin = true;
      state.user = user;
    },
    logOutAccount: state => {
      state.isLogin = false;
    },
    addFavorites: (state, action) => {
      const { food } = action.payload;
      const find = state.favoritesFood.find(item => item.id === food.id);
      if (!find) {
        const newList = [...state.favoritesFood, food];
        state.favoritesFood = newList;
        showMessage({
          message: 'added to favorites',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'available in favorites',
          type: 'warning',
        });
      }
    },
    removeFavorites: (state, action) => {
      const { id } = action.payload;
      const filterList = state.favoritesFood.filter(item => item.id !== id);
      state.favoritesFood = filterList;
    },
    addBasket: (state, action) => {
      const { product } = action.payload;
      // state.basketFood = basketFoods;
      // console.log('state', state);
      const find = state.basketFood.find(item => item.id === product.id);
      if (!find) {
        const newList = [...state.basketFood, product];
        state.basketFood = newList;
        showMessage({
          message: 'added to basket',
          type: 'success',
        });

      } else {
        showMessage({
          message: 'available in basket',
          type: 'warning',
        });
      }
    },
    removeBasket: (state, action) => {
      const { id } = action.payload;
      const filterList = state.basketFood.filter(item => item.id !== id);
      state.basketFood = filterList;
    },
    getBasket: (state, action) => {
      const { food } = action.payload;
      // state.basketFood = basketFoods;
      console.log('basketFood', state);
      const find = state.basketFood.find(item => item.user === food.user);
      if (!find) {
        //state.basketFood = find;
        showMessage({
          message: 'get basket success',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'nothing in basket',
          type: 'warning',
        });
      }
    },
    clearBasket: (state, action) => {
      const { user } = action.payload;
      // state.basketFood = basketFoods;
      console.log('clear', state);
      const newList = state.basketFood.filter(item => item.user === user.user);
      state.basketFood = newList;
      showMessage({
        message: 'get basket success',
        type: 'success',
      });
    },
  },
});

export const { loginAccount, logOutAccount, addFavorites, removeFavorites, addBasket, removeBasket, getBasket, clearBasket } =
  userSlicer.actions;

export default userSlicer.reducer;
