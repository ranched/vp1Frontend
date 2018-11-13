import React, { Component } from 'react';
import { Card, Image, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    margin: '10px'
  }
};

class AssetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    //console.log(typeof this.props.asset.arch_diagram);
  }

  loadingCard = () => {
    return (
      <Card style={styles.card}>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length='very short' />
              <Placeholder.Line length='medium' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder.Line length='very short' />
        </Card.Content>
      </Card>
    )
  }

  render() {
    var { asset, loading } = this.props;
    if (loading) { return this.loadingCard() }
    var pathname = '/assets/'+asset.scrm_id;
    var state = { asset }
    return (
      <Card as={Link} style={styles.card} to={{pathname, state}}>
        <Image src={asset.arch_diagram} />
        <Card.Content>
          <Card.Header>{asset.title}</Card.Header>
          <Card.Meta>
            <span className="date">
              Added {new Date(asset.publish_date).toLocaleDateString()}
            </span>
          </Card.Meta>
          <Card.Description>{asset.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>{asset.view_count} Views</p>
        </Card.Content>
      </Card>
    );
  }
}

export default AssetCard;
