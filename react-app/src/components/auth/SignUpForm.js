import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import signIn from "../images/signIn.png";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      console.log(data);
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["password: Passwords do not match."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="flexRow justCenter signInPad">
      <img src={signIn}></img>
      <form onSubmit={onSignUp} className="flexCol signIn justCenter leftPad">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label className="font inputsPadding">User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          className="signInInput"
          required
        ></input>
        <label className="font inputsPadding">Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          className="signInInput"
          required
        ></input>
        <label className="font inputsPadding">Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          className="signInInput"
          required
        ></input>
        <label className="font inputsPadding">Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className="signInInput"
        ></input>
        <div className="flexRow paddingTop justCenter">
          <button className="loginButton marginRight" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
