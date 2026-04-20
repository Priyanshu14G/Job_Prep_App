import React from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
const Login = () => {

  const {handleLogin, loading} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({email, password});
    navigate("/");
  }

  if(loading) return (<main><h1>Loading...</h1></main>)
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>

          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className='button primary-button' type='submit'>Login</button>

        </form>

        <p>Don't have an account? <Link to="/register" className='link'>Register</Link> </p>

      </div>
    </main>
  )
}

export default Login