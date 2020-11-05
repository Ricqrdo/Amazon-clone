import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SingInScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const userSignIn = useSelector(state => state.userSignIn)
  const {userInfo, loading, error} = userSignIn

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signIn(email, password))
  }

  useEffect(()=>{
    if(userInfo){
      props.history.push(redirect)
    }
  }, [userInfo, redirect, props.history])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sing In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Enter email' 
            onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? {' '}
            <Link to='/register'>Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
