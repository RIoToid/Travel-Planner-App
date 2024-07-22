import '../Login/Login.css'

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {

  // schema is how the data should look like
  const schema = yup.object().shape({
    email: yup.string().email("This doesn't look like an email. sus").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").max(20).required("Password is required"),
    confirmedPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords don't match, you had one job").required()
  });

  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema) 
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", data);
      console.log("registration successful: ", response.data)
    }catch(error) {
      console.error("registration error, ", error)
    }

  }

  return (
    <div className="wrapper">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
        <div className="input-field">
        <input type="text" {...register("email")}/>
        <label>Enter your email</label>
        {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
      </div>
      <div className="input-field">
        <input type="text" {...register("username")} />
        <label>Enter your username</label>
        {errors.username && <span style={{color: "red"}}>{errors.username.message}</span>}
      </div>
      <div className="input-field">
        <input type="password" {...register("password")} />
        <label>Enter your password</label>
        {errors.password && <span style={{color: "red"}}>{errors.password.message}</span>}
      </div>
      <div className="input-field">
        <input type="password" {...register("confirmedPassword")} />
        <label>Confirm your password</label>
        {errors.confirmedPassword && <span style={{color: "red"}}>{errors.confirmedPassword.message}</span>}
      </div>
      <button type="submit">Register</button>
      <div className="register">
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </form>
  </div>
  );
};
export default Register;