import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <div className='app'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path='/' component={HomePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;