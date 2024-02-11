import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement
import { productListReducer, productDetailsReducer } from './reducers/productsReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
// import { userRegisterReducer } from './reducers/registerReducers'; // Import new reducers
import { cartReducer } from './reducers/cartReducer';
import { userSendChangePasswordReducer, userConfirmChangePasswordReducer } from './reducers/userReducers';

// Define rootReducer using combineReducers
const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userSendChangePassword: userSendChangePasswordReducer, // Add new reducer
    userConfirmChangePassword: userConfirmChangePasswordReducer, // Add new reducer
});

// Retrieve cartItems and userInfo from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// Set initialState with data from localStorage
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

// Configure Redux store with rootReducer, initialState, and middleware
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Subscribe to store updates and update localStorage with cartItems
store.subscribe(() => {
    const { cart } = store.getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
});

export default store;
