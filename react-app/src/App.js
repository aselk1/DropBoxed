import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar";
import MenuBar from "./components/MenuBar";
import User from "./components/User";
import UsersList from "./components/UsersList";
import Home from './components/Home'
import Splash from "./components/SplashPage";
import Files from "./components/Files";
import Folders from "./components/Folders";
import { authenticate } from "./store/session";
import { ModalProvider } from "./context/Modal";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <BrowserRouter>
        <NavBar user={user} loaded={loaded} />
        <Switch>
          <Route path="/" exact={true}>
            {user != null ? <Redirect to="/home" /> : <Splash />}
          </Route>
          <ProtectedRoute path="/home" exact={true}>
            {user === null ? (
              <Redirect to="/" />
            ) : (
              <Home user={user} loaded={loaded} />
            )}
          </ProtectedRoute>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/files" exact={true}>
            <Files user={user} loaded={loaded} />
          </ProtectedRoute>
          <ProtectedRoute path="/folders" exact={true}>
            <Folders user={user} loaded={loaded} />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
