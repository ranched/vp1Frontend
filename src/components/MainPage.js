
import React, { Component } from 'react';
import { Grid, Header, Sidebar } from 'semantic-ui-react';
//import sizeMe from "react-sizeme";
import Filters from './Filters';
import AssetList from './AssetList';
import AssetDetail from './AssetDetail';
import Footer from './Footer';
import { sampleAssets, recents } from '../sample/assets';
import * as api from '../services/digitalAssets';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PropTypes from "prop-types";

const styles = {
  mainAssets: {
    marginTop: "80px"

    /* paddingLeft: "50px",
    paddingTop: "50px" */
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
};

const fetchSearchedAssets = queryTermsArray => {
  console.log(`in fetchSearchedAssets`);
  let queryStr = queryTermsArray.join(" ");
  return api.getSearchAssets(queryStr);
};

const sortAssetsByViewCount = assets => {
  return assets.sort((a, b) => b.view_count - a.view_count);
};

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
      path: props.match.path,
      width: null,
      widthSet: false
    };
    this.filterAssets = this.filterAssets.bind(this);
    this.updateAssets = this.updateAssets.bind(this);
  }

  fetchAllAssetsAndUpdateState = () => {
    return api
      .getAllAssets()
      .then(assets => {
        //assets = [...sampleAssets, ...assets];
        assets = sortAssetsByViewCount(assets);
        var filteredAssets = [...assets];
        this.setState({ assets, recents, filteredAssets });
      })
      .catch(error => console.log(error));
  };

  componentDidMount = () => {
    this.fetchAllAssetsAndUpdateState();
  };

  /* var recentsHeight = document.getElementsByClassName('Top-Assets')[0].clientHeight;
  this.setState({ recentsHeight }); */


  updateAssets = (filters) => {
    console.log(`updateAssets fired with ${JSON.stringify(filters)}`)

    if (!filters.keywords[0]) {
      console.log(`no keywords to filter by, setting to a space character`)
      filters.keywords[0] = ' '
    }
    console.log(`fetching assets by keywords`)
    fetchSearchedAssets(filters.keywords)
      .then(assets => {
        this.setState({ assets });
        this.filterAssets(filters)
      })
  }

  filterAssets = (filters) => {
    var { assets } = this.state;
    var filteredAssets = [...assets];

    // if any filters are set
    if (filtersSetTest(filters)) {
      ;
      //for each filter category
      Object.keys(filters).forEach(key => {
        var values = filters[key]; // filter values selected for [industries, cloudServices, pillars, hubsters]
        values.forEach(value => {
          filteredAssets = filteredAssets.filter(asset => {
            // each current asset
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
  };

  setWidth = width => {
    if (this.state.widthSet) return;
    this.setState({ width, widthSet: true });
    console.log("width set!!", width);
  };

  render() {
    var { assets, filteredAssets, width } = this.state;
    var isLoading = !assets;
    return (
      <div className="Main" style={styles.mainAssets}>
        <Sidebar.Pushable
          as={Grid}
          style={{ paddingTop: "75px", margin: "0px" }}
        >
          <Sidebar.Pusher
            className="topAssets" /*  style={{ padding: "0px" }} */
          >
            {/* <Filters update={this.updateAssets} />
            <Header
              as="h1"
              className="topHeader"
              style={{ textAlign: "center", paddingBottom: "50px" }}
            >
              TOP ASSETS
            </Header>
            <AssetList
              assets={
                !filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets
              }
              loading={isLoading}
              topAssets={true}
              cardWidth={width}
              setWidth={this.setWidth}
            /> */}
            <Router>
              <Switch>

                <Route exact path='/assets' render={
                  (props) => {
                    return [
                      <Filters key='filters' filter={this.filterAssets} update={this.updateAssets} />,
                      <Header as='h1' key='header' className="topHeader" style={{ textAlign: "center", paddingBottom: "50px" }}>TOP ASSETS</Header>,
                      <AssetList
                        key='assetList'
                        assets={!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets}
                        loading={isLoading}
                        topAssets={true}
                        cardWidth={width}
                        setWidth={this.setWidth}
                      />
                    ]
                  }
                }
                />
                <Route path={"/assets/:assetId"} render={props => <AssetDetail {...props} />} />
                <Route path='*' render={props => <p>404</p>} />
              </Switch>
            </Router>            <Footer />
          </Sidebar.Pusher>{" "}
        </Sidebar.Pushable>

        <Sidebar
          as={Grid}

          visible
          animation="overlay"
          direction="right"
          style={{
            backgroundColor: "#F7F7F7",
            justifyContent: "center",
            width: "300px"
          }}
        >
          <Grid.Row className="headerRow">
            <Grid.Column>
              <Header as="h1">RECENTLY ADDED</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="contentRow" verticalAlign="middle">
            <Grid.Column className="contentColumn">
              <AssetList
                assets={sampleAssets.slice(0, 6)
                  //!filteredAssets ? sampleAssets.slice(0, 6) : filteredAssets
                }
                loading={isLoading}
                topAssets={false}
                cardWidth={width}
                setWidth={this.setWidth}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="contentRow">
            <Grid.Column className="contentColumn">
              <Footer />
            </Grid.Column>
          </Grid.Row>
        </Sidebar>
      </div>
    );
  }
}

MainPage.propTypes = {
  assets: PropTypes.array,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default MainPage;
