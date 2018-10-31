import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import AssetCard from './AssetCard';
import PropTypes from 'prop-types';

class AssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //componentDidMount = () => {}

  render() {
    let { assets } = this.props;

    return (
      <Grid>
        <Grid.Row>
          {assets.map(asset => (
            <AssetCard asset={asset} key={asset.scrmId} />
          ))}
        </Grid.Row>
      </Grid>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default AssetList;
