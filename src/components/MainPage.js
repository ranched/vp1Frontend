import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Stats from './Stats';
import Filters from './Filters';
import AssetList from './AssetList';
import Footer from './Footer';
import { sampleAssets, recents } from '../sample/assets';
import dropOptions from '../sample/dropOptions';
import * as api from '../services/digitalAssets';

import PropTypes from 'prop-types';

const styles = {
  mainAssets: {
    margin: '50px',
    paddingLeft: "50px",
    paddingTop: "50px"
  }

};

const capitalize = word => {
  if (word === "and") return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const format = value => {
  var text;
  var words = value.split('_');
  if (words.length === 1) { text = capitalize(words[0]); }
  else {
    words = words.map(word => capitalize(word));
    text = words.join(' ');
  }
  return { value, text }
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: null,
      filterOptions: {},
      filters: {},
      filteredAssets: null,
      recents: null,
      url: props.match.url,
      path: props.match.path
    };
  }

  componentWillMount = () => {
    /* Fetch data from API, including dropdown search values */
    var filterOptions = {
      industries: dropOptions.industries.map(industry => format(industry)),
      cloudServices: dropOptions.cloudServices.map(cloudService => format(cloudService)),
      pillars: dropOptions.pillars.map(pillar => format(pillar))
    }
    // If there are no keywords set...
    if (!this.state.filters.keywords) {
      api.getAllAssets()
        .then(assets => {
          assets = sampleAssets.concat(assets).sort((a, b) => b.view_count - a.view_count);
          var filteredAssets = assets;
          this.setState({ assets, recents, filteredAssets, filterOptions });
        })
        .catch(error => console.log(error))
    }

  }

  componentDidMount = () => {
    /* var recentsHeight = document.getElementsByClassName('Top-Assets')[0].clientHeight;
    this.setState({ recentsHeight }); */
  }

  filterAssets = (filters) => {
    var { assets } = this.state;
    var filteredAssets = assets;
    Object.keys(filters).forEach(key => {
      var values = filters[key]; // filter values selected for [industries, cloudServices, pillars, hubsters]
      values.forEach(value => {
        filteredAssets = filteredAssets.filter(asset => { // each current asset
          if (!asset[key]) console.log(asset);
          var assetValues = asset[key].map(element => element.value);
          return assetValues.includes(value);
        });
      });
    });
    this.setState({ filteredAssets });
  }

  render() {
    var { assets, filteredAssets, filterOptions } = this.state;
    var isLoading = !assets;
    return (
      <div className="Main" style={styles.mainAssets}>
        <Stats />
        <Filters options={filterOptions} update={this.filterAssets} />
        <Grid style={{ height: "1280px", paddingTop: "50px" }}>
          {/* <Grid.Row style={{height: "1250px"}}> */}
          <Grid.Column width={12}>
            <Header as='h1' textAlign='center'>
              TOP ASSETS
              </Header>
            <AssetList
              assets={!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets}
              loading={isLoading} />
          </Grid.Column>
          <Grid.Column width={4} style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}>
            <Header as='h1' textAlign='center'>
              RECENTLY ADDED
              </Header>
            <AssetList assets={!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets} loading={isLoading} />
          </Grid.Column>
          {/* </Grid.Row> */}
        </Grid>
        <Footer />
      </div>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default MainPage;
