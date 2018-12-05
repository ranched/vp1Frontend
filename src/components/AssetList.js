import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
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
      <Card.Group>
        {assets.map(asset => (
          <AssetCard asset={asset} key={asset.scrm_id} loading={loading} />
        ))}
      </Card.Group>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default AssetList;
