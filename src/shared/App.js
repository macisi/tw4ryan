import { Switch, Route, Redirect } from 'react-router';
import NotFound from './NotFound';

import Dashboard from './container/dashboard';

const App = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/user" component={() => <div>user</div>} />
    <Redirect path="/handle_tumblr_callback" to="/" />
    <Route component={NotFound} />
  </Switch>
);

export default App;