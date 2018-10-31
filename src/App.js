import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import CreateAsset from './components/CreateAsset';
import ScrollToTop from './components/ScrollToTop';

// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const styles = {
  app: {
    fontFamily: "'Roboto', sans-serif"
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount = () => {
  //   console.log(process.env);
  // }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Header />
          <div className="App" style={styles.app}>
            <Route
              exact={true}
              path="/"
              render={() => <Redirect to="/assets" />}
            />
            <Route path="/assets" component={MainPage} />
            <Route path="/create" component={CreateAsset} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
