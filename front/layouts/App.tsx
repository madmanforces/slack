import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import LogIn from '../pages/Login/index';
import SignUp from '@pages/SignUp';
import Workspace from './Workspace';


function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"/>
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace" component={Workspace} />
    </Switch>
  );
}

export default App;
