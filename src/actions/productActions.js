import axios from "axios"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstant"

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  })
  try {
    const res = await axios.get('https://amazon-api-clone.herokuapp.com/api/products')
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: res.data})
  } catch (err) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: err.message})
  }
}

export const detailsProducts = (productId) => async (dispatch) => {
  dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
  try {
    const res = await axios.get(`https://amazon-api-clone.herokuapp.com/api/products/${productId}`)
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: res.data})
  } catch (error) {
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ?
      error.response.data.message : error.message
    })
  }
}