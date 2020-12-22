import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import { ViewDetailsScreen } from './screens/ViewDetails.screen';
import { HomeScreen } from './screens/Home.screen';
 


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/details/:hash" component={ViewDetailsScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
