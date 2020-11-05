import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const {userInfo, loading, error} = userRegister

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirm){
      alert("Password's dont match")
    } else {
      dispatch(register(name, email, password))
    }
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
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder='Enter name' 
            onChange={e=>setName(e.target.value)}/>
        </div>
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
            placeholder='Enter your password' 
            onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password</label>
          <input 
            name="confirm" 
            id="confirm" 
            type="password" 
            placeholder='Confirm your password' 
            onChange={e=>setConfirm(e.target.value)}/>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? {' '}
            <Link to={`/signin?=redirect=${redirect}`}>Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
