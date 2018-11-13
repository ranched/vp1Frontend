import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react';
import AssetCard from './AssetCard';
import PropTypes from 'prop-types';

class AssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {

  }

  render() {
    var { assets, loading } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Card.Group>
            {assets.map(asset => (
              <AssetCard asset={asset} key={asset.scrm_id} loading={loading} />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default AssetList;
