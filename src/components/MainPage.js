import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Filters from './Filters';
import AssetList from './AssetList';
import Footer from './Footer';
import { sampleAssets, recents } from '../sample/assets';
import * as api from '../services/digitalAssets';

import PropTypes from 'prop-types';

const styles = {
  mainAssets: {
    margin: '50px',
    paddingLeft: "50px",
    paddingTop: "50px"
  }

};

/**
 * Check to see if any filters other than keywords are set
 * Parameters: filtersObj: {
  industries: [],
  cloudServices: [],
  pillars: [],
  hubsters: [],
  keywords: []
};
 * Returns: true if any keys other than 'keywords' has an array of length > 0
 */
const filtersSetTest = filtersObj => {
  let filtersCopy = JSON.parse(JSON.stringify(filtersObj)); //make a copy
  delete filtersCopy.keywords; //delete key
  // return whether if any filters are set or not 
  return Object.keys(filtersCopy).reduce((acc, cur) => {
    //if a filter array has any items return true
    return acc || filtersCopy[cur].length > 0;
  }, false);
}

const fetchSearchedAssets = queryTermsArray => {
  console.log(`in fetchSearchedAssets`)
  let queryStr = queryTermsArray.join(' ');
  return api.getSearchAssets(queryStr);
}

const sortAssetsByViewCount = assets => {
  return assets.sort((a, b) => b.view_count - a.view_count);
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
    this.filterAssets = this.filterAssets.bind(this);
  }

  fetchAllAssetsAndUpdateState = () => {
    return api.getAllAssets()
      .then(assets => {
        //assets = [...sampleAssets, ...assets];
        assets = sortAssetsByViewCount(assets);
        var filteredAssets = [...assets];
        this.setState({ assets, recents, filteredAssets });
      })
      .catch(error => console.log(error))
  }

  componentDidMount = () => {
    this.fetchAllAssetsAndUpdateState();

    /* var recentsHeight = document.getElementsByClassName('Top-Assets')[0].clientHeight;
    this.setState({ recentsHeight }); */
  }

  updateAssets = (filters) => {
    console.log(`updateAssets fired with ${JSON.stringify(filters)}`)
    if (!filters.keywords[0]) {
      console.log(`no keywords to filter by`)
      this.filterAssets(filters);
    } else {
      console.log(`fetching assets by keywords`)
      fetchSearchedAssets(filters.keywords)
        .then(assets => {
          this.setState({ assets });
          this.filterAssets(filters)
        })
    }
  }

  filterAssets = (filters) => {

    var { assets } = this.state;
    var filteredAssets = [...assets];

    // if any filters are set
    if (filtersSetTest(filters)) {
      //for each filter category
      Object.keys(filters).forEach(key => {
        var values = filters[key]; // filter values selected for [industries, cloudServices, pillars, hubsters]
        values.forEach(value => {
          filteredAssets = filteredAssets.filter(asset => { // each current asset
            if (asset[key]) {
              var assetValues = asset[key].map(element => element.value);
              return assetValues.includes(value);
            } else {
              console.log(asset);
              return false;
            }
          });
        });
      });
    }
    this.setState({ filteredAssets });
  }

  render() {
    var { assets, filteredAssets } = this.state;
    var isLoading = !assets;
    return (
      <div className="Main" style={styles.mainAssets}>
        <Filters update={this.updateAssets} />

        <Grid style={{ height: "1280px", paddingTop: "50px" }}>
          <Grid.Column width={12}>

            <Header as='h1' textAlign='center'>
              TOP ASSETS
              </Header>

            <Grid.Row>
              <AssetList
                assets={!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets}
                loading={isLoading} />
            </Grid.Row>

          </Grid.Column>

          <Grid.Column width={4} style={{ height: "100%" }}>

            <Header as='h1' textAlign='center'>
              RECENTLY ADDED
              </Header>


            <Segment.Group style={{ overflowY: "scroll", overflowX: "hidden", height: '100vh' }} >
              <AssetList assets={!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets} loading={isLoading} />
            </Segment.Group>

          </Grid.Column>

          <Footer />
        </Grid>
      </div>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default MainPage;
