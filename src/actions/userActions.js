import Axios from "axios"
import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT } from "../constants/userConstans"

export const signIn = (email, password) => async (dispatch) => {
  dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})

  try {
    const res = await Axios.post('https://amazon-api-clone.herokuapp.com/api/users/signin', {
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