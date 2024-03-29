import React, { Component } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import CreateAsset from './components/CreateAsset';
import ScrollToTop from './components/ScrollToTop';
//import NavBar from './components/NavBar';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <Router>
        <ScrollToTop>
          {/* <NavBar /> */}
          <Switch className="App">
            <Route exact path='/' render={(props) => <Redirect to="/assets" {...props} />} />
            <Route path="/assets" render={(props) => <MainPage {...props} />} />
            {/*<Route path='/assets/:assetId' render={(props) => <AssetDetail {...props} />} />*/}
            <Route path="/create" render={(props) => <CreateAsset {...props} />} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
