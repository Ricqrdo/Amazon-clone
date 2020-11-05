import axios from "axios"
import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstans"

export const signIn = (email, password) => async (dispatch) => {
  dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})

  try {
    const res = await axios.post('https://amazon-api-clone.herokuapp.com/api/users/signin', {
      email,
      password
    })
    dispatch({type: USER_SIGNIN_SUCCESS, payload: res.data})
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    })
  }
}

export const signOut = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  dispatch({type: USER_SIGNOUT})
}

export const register = (name, email, password) => async (dispatch) => {
  dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}})

  try {
    const res = await axios.post('https://amazon-api-clone.herokuapp.com/api/users/register', {
      name,
      email,
      password
    })
    dispatch({type: USER_REGISTER_SUCCESS, payload: res.data})
    dispatch({type: USER_SIGNIN_SUCCESS, payload: res.data})
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL, 
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
    })
  }
}