import React from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let submit=async(e)=>{
      e.preventDefault();  // Prevent form from reloading the page
      const userdata={
        email,
        password
      }
      console.log(userdata)
     let response= await fetch('http://localhost:3000/user/login',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body:JSON.stringify(userdata)
     })
     let data=await response.json();
    if(response.ok){
      localStorage.setItem("authtoken",data.token)
      window.location.href="/tracker"
    }
     console.log(data)
    }
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.subtitle}>Please log in to continue</p>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className={styles.input}
              onChange={(e)=>{setemail(e.target.value)}}

            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              onChange={(e)=>{setpassword(e.target.value)}}

            />
          </div>
          <button type="submit" className={styles.button} onClick={submit}>
            Login
          </button>
        </form>
        <p className={styles.footer}>
          Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
