import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "./home/Home";
import Details from "./details/Details";
import BookShow from "./bookshow/BookShow";

export default function Controller(props) {
  return (
    // <Fragment>
    //   <Header />
    //   <Home />
    //   <Details />
    // </Fragment>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={Details} exact />
        <Route path="/book-show/:id" component={BookShow} exact />
      </Switch>
    </BrowserRouter>
  );
}
