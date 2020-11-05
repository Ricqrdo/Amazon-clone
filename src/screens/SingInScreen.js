import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SingInScreen() {
  const [email, setEmail] = useState('')
  const [passoword, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
  }


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sing In</h1>
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
