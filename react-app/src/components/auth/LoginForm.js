import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import signIn from '../images/signIn.png'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    // .then(history.push('/home'))
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const signInDemo = async (e) => {
    e.preventDefault()
    setErrors([]);
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
    // .then(history.push("/home"));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="flexRow justCenter signInPad">
      <img src={signIn}></img>
      <form onSubmit={onLogin} className="flexCol signIn justCenter leftPad">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label className="font inputsPadding" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          className="signInInput"
          required
        />
        <label className="font inputsPadding" htmlFor="password">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          className="signInInput"
          required
        />
        <div className="flexRow paddingTop justCenter">
          <button className="loginButton marginRight" type="submit">
            Sign In
          </button>
          <button className="loginButton" onClick={signInDemo}>
            Demo
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
