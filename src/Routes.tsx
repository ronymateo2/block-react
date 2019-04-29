import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import MyBag from "./components/MyBag";

const Routes: React.FC = () => {
  return (
    <HashRouter>
    <Switch>
        <Route exact path='/' component={ Main } />
        <Route exact path='/me/bag' component={ MyBag } />
    </Switch>
  </HashRouter>
  );
}

export default Routes;
