import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import Login from '../pages/Login/index'
import SignUp from '../pages/SignUp/index'

const App = () => {
  return <Switch>
    <Redirect exact path="/" to="/login"/>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Switch>
};

export default App;
