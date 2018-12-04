import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Image } from 'semantic-ui-react';
//import { sampleAssets, assetsMap } from '../sample/assets';
import * as api from '../services/digitalAssets';

class AssetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: null
    };
  }

  componentDidMount = () => {
    var { match, location } = this.props;
    var scrm_id = match.params.assetId;
    if (location.state) this.setState({ asset: location.state.asset })
    else { this.getAsset(scrm_id).then(asset => this.setState({ asset })) }

  }

  getAsset = (scrm_id) => {
    return api.getAsset(scrm_id)
      .catch(error => console.log(error))
  }

  render() {
    var { asset } = this.state;
    if (!asset) { return <div /> }
    return (
      <Container className="Main">
        <Button as={Link} to="/assets">
          CLOSE
        </Button>
        <h1> Detail for SCRM Asset: {asset.scrm_id}</h1>
        <h2>Title: {asset.title}</h2><br />
        <h2>Date added: {new Date(asset.publish_date).toLocaleDateString()}</h2>
        <h2>Description: {asset.description}</h2>
        <h2>Views: {asset.view_count}</h2>
        <h2>Hubsters: {asset.hubsters.map(hubster => hubster.hubster_name).join(', ')}</h2><br />
        <h2>Industries: {asset.industries.map(industry => industry.text).join(', ')}</h2><br />
        <h2>Cloud Services: {asset.cloudServices.map(cloudService => cloudService.text).join(', ')}</h2><br />
        <h2>Pillars: {asset.pillars.map(pillar => pillar.text).join(', ')}</h2><br /><br />
        <h2>Notional Architecture:</h2><br />
        <Image src={asset.arch_diagram} /><br /><br />
        <h2>Video:</h2>
        <iframe id="kmsembed-0_fhworweh" title="oTubeLink" width="768" height="515" src={asset.otube_url} class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>
      </Container>
    )
  }
}

export default AssetDetail;
