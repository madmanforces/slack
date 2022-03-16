import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import loadable from '@loadable/component';


const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/channel" component={Workspace} />
    </Switch>
  );
}

export default App;
