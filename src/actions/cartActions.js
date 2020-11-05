import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const res = await axios.get(`http://localhost:4000/api/products/${productId}`)
  
  dispatch({type: CART_ADD_ITEM, payload: {
    name: res.data.name,
    image: res.data.image,
    price: res.data.price,
    countInStock: res.data.countInStock,
    product: res.data._id,
    qty,
  }})

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({type: CART_REMOVE_ITEM, payload: productId})

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}