import React from 'react';
import { Icon, Image, Statistic } from 'semantic-ui-react';

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

const Stats = () => (
  <Statistic.Group widths="four" style={styles.stats}>
    <Statistic style={styles.stat}>
      <Statistic.Value>
        8<Icon color="yellow" name="box" />
      </Statistic.Value>
      <Statistic.Label>Assets</Statistic.Label>
    </Statistic>

    <Statistic style={styles.stat}>
      <Statistic.Value>
        10
        <Icon color="olive" name="building" />
      </Statistic.Value>

      <Statistic.Label>Industries</Statistic.Label>
    </Statistic>

    <Statistic style={styles.stat}>
      <Statistic.Value>
        42
        <Icon color="teal" name="video" />
      </Statistic.Value>
      <Statistic.Label>Views</Statistic.Label>
    </Statistic>

    <Statistic style={styles.stat}>
      <Statistic.Value>
        3<Icon color="violet" name="user" />
      </Statistic.Value>
      <Statistic.Label>Contributors</Statistic.Label>
    </Statistic>
  </Statistic.Group>
);

export default Stats;
