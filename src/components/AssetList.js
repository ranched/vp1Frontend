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
    var { assets, loading, topAssets } = this.props;
    if (topAssets) {
      return (
        <Card.Group itemsPerRow={4}>
          {assets.map(asset => (
            <AssetCard asset={asset} key={asset.scrm_id} loading={loading} />
          ))}
        </Card.Group>
      )
    } else {
      return (
        <Card.Group itemsPerRow={1} style={{ overflowY: "scroll", padding: "0px 10px 10px 20px", marginBottom: "50px" }}>
          {assets.map(asset => (
            <AssetCard asset={asset} key={asset.scrm_id} loading={loading} />
          ))}
        </Card.Group>
      )
    }
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default AssetList;
