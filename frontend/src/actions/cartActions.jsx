import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

// Action creator to add an item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });

        // Use setTimeout as a workaround to allow time for the state to update
        setTimeout(() => {
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }, 0);
    } catch (error) {
        console.error('Error adding to cart:', error.message);
    }
};

// Action creator to remove an item from the cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    // Use setTimeout as a workaround to allow time for the state to update
    setTimeout(() => {
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }, 0);
};

// Action creator to save shipping address
export const saveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));

    const { userLogin: { userInfo } } = getState();
    await axios.post('/api/save-shipping/', { ...data, user: userInfo._id });
};
