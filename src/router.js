import Home from './Pages/Home'
import Movie from "./Pages/Movie";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import GetMovieInfo from "./Components/DisplayBoxComponents";
import { Route, Switch } from "react-router-dom";
// import Register from '../RegisterComponents';
import Register from './Pages/Register';
import Login from './Pages/Login';
import DisplayTable from './Pages/DisplayTable';

const Routes = () => (
  <div className="mw-100">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movies" component={Movie} />
      <Route exact path="/movie/:id" component={GetMovieInfo} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/table" component={DisplayTable} />

      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
