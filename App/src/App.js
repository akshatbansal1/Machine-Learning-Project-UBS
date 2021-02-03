import React, { Component } from 'react';
import './AppJ.css';
import Sidebar from './Sidebar';
import About from './About';
import Portfolio from './Portfolio';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import Dashboard from './Dashboard';
import CompanyList from './CompanyList';
import NewPortfolio from './NewPortfolio';
import Company from './Company';
import MyPortfolio from './MyPortfolio';

function App() {
  return (
    <Router>
    <div className="App">
      <div>
        <Sidebar />
      </div>
      <div>
      <Switch>
        <Route path='/' exact component = {Dashboard}/>
        <Route path='/companies' exact component = {CompanyList}/>
        <Route path='/newPortfolio' exact component = {NewPortfolio}/>
        <Route path="/about" component={About} />
        <Route path="/portfolio" exact component={MyPortfolio} />
        <Route path="/portfolio/:id" component={ItemDetail} />
        <Route path="/company/:id" component={Company} />
      </Switch>
      </div>
    </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>home page</h1>
  </div>
);

export default App;