import { Switch, Route, Redirect } from 'react-router';
import NotFound from './NotFound';

const App = () => (
  <Switch>
    <Route exact path="/" component={() => <div>home111</div>} />
    <Route path="/user" component={() => <div>user</div>} />
    <Redirect path="/handle_tumblr_callback" to="/" />
    <Route component={NotFound} />
  </Switch>
);

export default App;