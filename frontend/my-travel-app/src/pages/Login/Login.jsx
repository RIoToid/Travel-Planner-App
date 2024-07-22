import './Login.css'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

const Login = () => {

  // schema is how the data should look like
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").max(20).required("Password is required")
  });

  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(schema) 
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/users/login", data);
      const {accessToken} = response.data;

      // store tokens somewhere: either localStorage or httpOnly cookie
      localStorage.setItem("accessToken", accessToken)
      console.log("login successful: ", response.data)
      console.log(localStorage.getItem("accessToken"));
      navigate("/");

    }catch(error) {
      console.error("login error, ", error)
    }

  }

  return (
    <div className="wrapper">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
        <div className="input-field">
        <input type="text" {...register("username")}/>
        <label>Enter your username</label>
        {errors.username && <span style={{color: "red"}}>{errors.username.message}</span>}
      </div>
      <div className="input-field">
        <input type="password" {...register("password")} />
        <label>Enter your password</label>
      </div>
      <div className="forget">
        <label htmlFor="remember">
          <input type="checkbox" id="remember"/>
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging In": "Log In"}</button>
      <div className="register">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </form>
  </div>
  );
};
export default Login;