import React, { Component } from 'react';
import { Icon, Statistic } from 'semantic-ui-react';
import * as api from '../services/digitalAssets';

const styles = {
  stats: {
    maxWidth: '50%',
    margin: 'auto',
    height: '20vh'
  },
  stat: {
    margin: 'auto'
  }
};

const sumViews = (assetsArray) => {
  return assetsArray.reduce((acc, cur) => {
    return acc += cur.view_count;
  }, 0)
}

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetCount: 0,
      industryCount: 0,
      hubsterCount: 0,
      viewCount: 0

    }
  }

  componentWillMount = () => {
    /* Fetch data from APIs for counts*/
    let assets = api.getAllAssets();
    let industries = api.getAllIndustriesCount();
    let hubsters = api.getAllHubstersCount();

    Promise.all([assets, industries, hubsters])
      .then(values => {
        let [assets, hubsterCount, industryCount] = values;
        let viewCount = sumViews(assets);
        let assetCount = assets.length;
        this.setState({ assetCount, hubsterCount, industryCount, viewCount });
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div>

        <Statistic.Group widths="four" style={styles.stats}>
          <Statistic style={styles.stat}>
            <Statistic.Value>
              {this.state.assetCount}<Icon size='mini' color="yellow" name="box" />
            </Statistic.Value>
            <Statistic.Label>Assets</Statistic.Label>
          </Statistic>

          <Statistic style={styles.stat}>
            <Statistic.Value>
              {this.state.industryCount}
              <Icon size='mini' color="olive" name="building" />
            </Statistic.Value>
            <Statistic.Label>Industries</Statistic.Label>
          </Statistic>

          <Statistic style={styles.stat}>
            <Statistic.Value>
              {this.state.viewCount}
              <Icon size='mini' color="teal" name="video" />
            </Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
          </Statistic>

          <Statistic style={styles.stat}>
            <Statistic.Value>
              {this.state.hubsterCount}
              <Icon size='mini' color="violet" name="user" />
            </Statistic.Value>
            <Statistic.Label>Contributors</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    )
  }
};

export default Stats;
