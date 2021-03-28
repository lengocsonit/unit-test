import { Redirect, Route, Switch } from 'react-router-dom';
import SignUpPage from '../components/SignUpPage/SignUpPage'

export const Path = {
    app: '/',
    signUp: '/',
};

const routes = (
    <Switch>
        <Route exact path={Path.signUp} component={SignUpPage} />
        <Redirect to={Path.app} />
    </Switch>
);

export default routes;