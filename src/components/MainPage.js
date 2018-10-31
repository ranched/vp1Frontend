import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Stats from './Stats';
import Filters from './Filters';
import AssetList from './AssetList';
import AssetDetail from './AssetDetail';
import { assets, recents } from '../sample/assets';
import { industries, tech, useCase } from '../sample/dropOptions';

import PropTypes from 'prop-types';

const styles = {
  mainAssets: {
    margin: '20px'
  }
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: assets,
      recents: assets,
      url: props.match.url,
      path: props.match.path
    };
  }
  //componentDidMount = () => {}

  render() {
    return (
      <div className="Main">
        <Stats />
        <Filters industries={industries} tech={tech} useCase={useCase} />
        <Grid style={styles.mainAssets}>
          <Grid.Column width={12}>
            <Route
              exact={true}
              path={'/assets'}
              render={() => <AssetList assets={assets} />}
            />
            <Route path={`/assets/:assetId`} component={AssetDetail} />
          </Grid.Column>
          <Grid.Column width={4}>
            <span>RECENTLY ADDED</span>
            <AssetList assets={recents} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default MainPage;
